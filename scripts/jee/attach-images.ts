/**
 * Phase 3b — upload + attach figures for one JEE paper.
 *
 *   npx tsx scripts/jee/attach-images.ts <paperId>          # dry-run (plan only)
 *   npx tsx scripts/jee/attach-images.ts <paperId> --apply  # upload + set image_url
 *
 * Mapping:
 *   stem-figure (1 image)      -> questions.image_url
 *   option-image (5 images)    -> img[0] = question figure, img[1..4] = options A,B,C,D
 *   option-image (4 images)    -> img[0..3] = options A,B,C,D (no question figure)
 *
 * Idempotent: skips any slot whose image_url is already set. Rows are scoped by
 * source_file so question numbers can't collide across papers.
 */
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { basename, join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import type { AllowedMime } from "../../src/lib/storage/images";
import { ORG_ID, EXAM_ID, loadPaper, recordsPath, mediaDir, requirePaperId } from "./config";

type Rec = {
  questionNumber: number;
  status: string;
  imageRefs: string[];
  options: { label: string; text: string }[] | null;
};

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function mimeOf(path: string): AllowedMime | null {
  const ext = path.toLowerCase().split(".").pop();
  if (ext === "png") return "image/png";
  if (ext === "jpeg" || ext === "jpg") return "image/jpeg";
  return null;
}

function resolveImage(ref: string, fallbackDir: string): string | null {
  if (existsSync(ref)) return ref;
  const fb = join(fallbackDir, basename(ref));
  return existsSync(fb) ? fb : null;
}

/**
 * Stack multiple STEM figures into one composite PNG and return its path.
 *
 * A question has a single `questions.image_url`, but an organic stem often
 * prints two or three structures ("the condensation between <A> and <B> gives
 * <C>"). Keeping only the first shipped a question that cannot be answered from
 * what is on screen — 130 rows / 351 dropped figures in the JEE Chemistry
 * corpus. Option pictures are NOT composited: they map onto their own
 * `options.image_url` and must stay separate.
 *
 * Returns null when compositing is impossible, so the caller can fall back to
 * the previous first-figure-only behaviour rather than attaching nothing.
 */
function composeStemFigures(
  refs: string[],
  fallbackDir: string,
  paperId: string,
  qn: number,
): string | null {
  const resolved = refs.map((r) => resolveImage(r, fallbackDir)).filter((p): p is string => Boolean(p));
  if (resolved.length !== refs.length) {
    console.warn(`  Q${qn}: ${refs.length - resolved.length} stem figure(s) missing on disk — not compositing`);
    return null;
  }
  const out = join(mediaDir(paperId), `composite_q${qn}.png`);
  const res = spawnSync("python", [join("scripts/jee/compose_figures.py"), out, ...resolved], {
    encoding: "utf8",
  });
  if (res.status !== 0) {
    console.warn(`  Q${qn}: compositing failed (${(res.stderr || "").trim()}) — falling back to first figure`);
    return null;
  }
  return existsSync(out) ? out : null;
}

/**
 * [questionImage | null, {label->image}] for a record. Branches on whether the
 * options carry TEXT (not on status): options-with-text means every image is a
 * stem/question figure (incl. a match-list rendered as an image); blank options
 * mean the choices themselves are pictures.
 */
function planFor(
  rec: Rec,
  ctx: { fallbackDir: string; paperId: string },
): { qImage: string | null; optImages: Record<string, string> } {
  const refs = rec.imageRefs;
  const stem = (rs: string[]) =>
    rs.length > 1
      ? composeStemFigures(rs, ctx.fallbackDir, ctx.paperId, rec.questionNumber) ?? rs[0]
      : rs[0] ?? null;
  if (rec.options === null) {
    return { qImage: stem(refs), optImages: {} };
  }
  // Map images onto the WORDLESS options specifically. The old test was
  // all-or-nothing — any option with text meant "stem figure only" — so a MIXED
  // row (three structure pictures plus a worded "Both (a) and (c)") got NO option
  // images at all and shipped with blank, unusable choices, one of them the key.
  const wordless = rec.options
    .filter((o) => o.text.trim() === "")
    .map((o) => o.label)
    .sort();
  if (wordless.length === 0) {
    return { qImage: stem(refs), optImages: {} };
  }
  // The four option pictures are always the LAST four images: any figure that
  // belongs to the stem is emitted before them. So 4 refs = options only,
  // 5 = one stem figure + options, 6 = two stem figures (e.g. a logic circuit
  // AND its input waveforms) + options, and so on. Keying off the tail rather
  // than an exact count is what makes 6+ work; previously anything but 4 or 5
  // threw and the row silently ended up with NO option images at all.
  if (refs.length < wordless.length) {
    throw new Error(
      `Q${rec.questionNumber}: ${wordless.length} wordless option(s) but only ${refs.length} image(s) — cannot map choices`,
    );
  }
  const optRefs = refs.slice(-wordless.length);
  const stemRefs = refs.slice(0, -wordless.length);
  return {
    qImage: stem(stemRefs),
    optImages: Object.fromEntries(wordless.map((l, i) => [l, optRefs[i]])),
  };
}

async function uploadRef(client: SupabaseClient, ref: string, fallbackDir: string): Promise<string> {
  const file = resolveImage(ref, fallbackDir);
  if (!file) throw new Error(`image not found on disk: ${ref}`);
  const mime = mimeOf(file);
  if (!mime) throw new Error(`unsupported image type: ${file}`);
  return uploadImage(client, ORG_ID, readFileSync(file), mime);
}

async function main() {
  const apply = process.argv.includes("--apply");
  const paperId = requirePaperId(process.argv, 2, "attach-images.ts <paperId> [--apply]");
  loadEnv();
  const paper = loadPaper(paperId);
  const { sourceFile } = paper;
  const fallbackDir = join(mediaDir(paperId), "media");
  const records: Rec[] = JSON.parse(readFileSync(recordsPath(paperId), "utf8"));

  // Bind figures the extractor orphaned (see PaperData.extraImages). Appended,
  // so a question that already has refs keeps its own order and the recovered
  // file lands last — which matters because planFor reads OPTION pictures off
  // the tail. Only ever add an orphan to a question whose figure it genuinely
  // is; a wrong binding is worse than a missing one.
  for (const [qn, names] of Object.entries(paper.extraImages ?? {})) {
    const rec = records.find((r) => r.questionNumber === Number(qn));
    if (!rec) throw new Error(`extraImages: Q${qn} not found in ${paperId} records`);
    for (const name of names) {
      const path = join(fallbackDir, name);
      if (!existsSync(path)) throw new Error(`extraImages: Q${qn} -> ${name} not on disk`);
      if (!rec.imageRefs.includes(path)) rec.imageRefs.push(path);
    }
    console.log(`  Q${qn}: bound ${names.length} orphaned figure(s): ${names.join(", ")}`);
  }

  // Any image-bearing non-numerical record; the per-question DB lookup below
  // skips ones that weren't committed (e.g. an un-resolved needs_review row).
  const imgRecs = records.filter((r) => r.status !== "skipped_numerical" && r.imageRefs.length > 0);

  // Records whose image layout planFor can't resolve (e.g. an unusual count like a
  // 2-scheme + 4-option question) are skipped with a warning and handled by a
  // dedicated one-off (composite the stem schemes + attach options manually).
  const skip = new Set<number>();
  console.log(`${imgRecs.length} image-bearing questions.`);
  for (const r of imgRecs) {
    let plan: ReturnType<typeof planFor>;
    try {
      plan = planFor(r, { fallbackDir, paperId });
    } catch (e) {
      skip.add(r.questionNumber);
      console.warn(`  ${(e as Error).message} — SKIPPING (handle manually)`);
      continue;
    }
    console.log(`Q${r.questionNumber} [${r.status}] qImage=${plan.qImage ? "yes" : "-"} optImages=[${Object.keys(plan.optImages).join("")}]`);
  }
  if (!apply) {
    console.log("\n[dry-run] pass --apply to upload + attach.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let qSet = 0;
  let optSet = 0;
  for (const r of imgRecs) {
    if (skip.has(r.questionNumber)) continue;
    const plan = planFor(r, { fallbackDir, paperId });
    const { data: q } = await client
      .from("questions")
      .select("id, image_url, options(id, label, image_url)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", sourceFile)
      .eq("question_number", String(r.questionNumber))
      .single();
    if (!q) {
      console.warn(`  Q${r.questionNumber}: question row not found — skipping`);
      continue;
    }

    if (plan.qImage && !q.image_url) {
      const path = await uploadRef(client, plan.qImage, fallbackDir);
      const { error } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
      if (error) throw new Error(`Q${r.questionNumber} question image_url: ${error.message}`);
      qSet++;
    }

    for (const [label, ref] of Object.entries(plan.optImages)) {
      const opt = (q.options as { id: string; label: string; image_url: string | null }[]).find((o) => o.label === label);
      if (!opt || opt.image_url) continue;
      const path = await uploadRef(client, ref, fallbackDir);
      const { error } = await client.from("options").update({ image_url: path }).eq("id", opt.id);
      if (error) throw new Error(`Q${r.questionNumber} opt ${label} image_url: ${error.message}`);
      optSet++;
    }
    console.log(`  Q${r.questionNumber}: done`);
  }
  console.log(`\nattached: ${qSet} question figures + ${optSet} option images.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
