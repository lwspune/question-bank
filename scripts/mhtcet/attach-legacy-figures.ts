/**
 * Attach switching-circuit figures to the LEGACY Mathematical Logic rows.
 *
 *   npx tsx scripts/mhtcet/attach-legacy-figures.ts          # dry run (default)
 *   npx tsx scripts/mhtcet/attach-legacy-figures.ts --apply  # upload + attach
 *
 * WHY THIS EXISTS RATHER THAN attach-images.ts
 * --------------------------------------------
 * attach-images.ts drives off shifts/<shiftId>.json — the committed audit trail of
 * a fully DERIVED 150-question shift — and finds rows by (source_file, question_number).
 * These five rows predate that pipeline: they were seeded from the per-shift
 * `*_QuestionBank.xlsx`, which is NOT an independent source (it is the bank's own
 * ingestion input, carrying the same garbled options). Writing partial shift JSONs
 * for them would put fabricated "curated" records into that audit trail claiming a
 * derivation that never happened, so targets are listed HERE, keyed by question id,
 * with the picture each one is getting spelled out.
 *
 * The figures come from the WORD originals under C:/tmp/PYQPs/MHT-CET/, extracted by
 * scripts/mhtcet/extract.ts into out/media/<shiftId>/media/ (gitignored; re-run extract
 * to regenerate). Multi-circuit stems are composited first — see figures/build-logic-composites.py.
 *
 * IMAGE -> OPTION ORDER is positional: pandoc emits a question's images in document
 * order, so [stem, A, B, C, D] (5 refs) or [A, B, C, D] (4 refs). That convention is
 * not assumed — it is confirmed by three of these five rows independently, whose
 * STORED answer key matches the circuit the convention lands on (Q136 -> C, Q147 -> C,
 * Q138 -> A). The fourth row disagrees, which is why it carries a `fix` block below.
 *
 * Idempotent: a target whose image_url is already set is skipped, so a re-run is safe.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { uploadImage, type AllowedMime } from "../../src/lib/storage/images";

type Label = "A" | "B" | "C" | "D";

type Target = {
  questionId: string;
  /** Provenance: which printed paper + question number this picture comes from. */
  source: string;
  /** Absolute-ish path under out/media, or a composite under out/media/legacy-composites. */
  stem?: string;
  options?: Partial<Record<Label, string>>;
  /**
   * Set only where reading the printed paper showed the STORED row to be wrong.
   * Applied in the same run as the figures, because attaching pictures to options
   * whose text contradicts them would leave the question worse than untouched.
   */
  fix?: {
    reason: string;
    optionText?: Partial<Record<Label, string>>;
    correctLabel?: Label;
    solution?: string;
  };
};

const MEDIA = join(__dirname, "out", "media");
const media = (shift: string, file: string) => join(MEDIA, shift, "media", file);
const composite = (file: string) => join(MEDIA, "legacy-composites", file);

const TARGETS: Target[] = [
  {
    // Stem prints five circuits (i)-(v); options are TEXT ("(i) and (iii)"), so the
    // five crops are composited into one stem picture rather than attached per option.
    questionId: "b436d804-a560-40d2-adde-2b2beb938a2d",
    source: "2023 2 May Shift 2, Q150",
    stem: composite("2023-may-02-s2-q150-stem.png"),
  },
  {
    questionId: "739e2718-d2e8-4069-a7a1-7dee74f58191",
    source: "2023 3 May Shift 2, Q136",
    stem: media("2023-may-03-s2", "image16.png"),
    options: {
      A: media("2023-may-03-s2", "image17.png"),
      B: media("2023-may-03-s2", "image18.png"),
      C: media("2023-may-03-s2", "image19.png"),
      D: media("2023-may-03-s2", "image20.png"),
    },
  },
  {
    // Four refs, no stem picture: the stem carries the logical statement as text.
    // NOTE its pyq_note says "3rd May 2nd Shift" but the circuit question is in
    // SHIFT 1 (Shift 2's Q147 is a line-and-plane problem). source_file agrees with
    // Shift 1, so the row is filed correctly and only the note is wrong.
    questionId: "95815d68-48d9-46bc-be0b-0a18a7747739",
    source: "2023 3 May Shift 1, Q147",
    options: {
      A: media("2023-may-03-s1", "image18.png"),
      B: media("2023-may-03-s1", "image19.png"),
      C: media("2023-may-03-s1", "image20.png"),
      D: media("2023-may-03-s1", "image21.png"),
    },
  },
  {
    questionId: "5826a024-6b02-43e1-b50e-6584a836537c",
    source: "2024 10 May Shift 1, Q144",
    stem: media("2024-may-10-s1", "image26.png"),
    options: {
      A: media("2024-may-10-s1", "image27.png"),
      B: media("2024-may-10-s1", "image28.png"),
      C: media("2024-may-10-s1", "image29.png"),
      D: media("2024-may-10-s1", "image30.png"),
    },
    fix: {
      reason:
        "The stored options (p=>q, q=>p, p, q) do not appear on the printed paper at all — " +
        "its four options are single-switch circuits: (A) S1' (B) S3 (C) S2 (D) S1. The stem " +
        "circuit is (p or ~q or ~r) and (p or (q and r)) = p or [~(q and r) and (q and r)] = p, " +
        "so the answer is the S1 circuit = (D). The stored key C was right about the ANSWER " +
        "TEXT ('p') but wrong about which printed option holds it.",
      optionText: { A: "Circuit (a)", B: "Circuit (b)", C: "Circuit (c)", D: "Circuit (d)" },
      correctLabel: "D",
      solution:
        "The circuit is two blocks in series. The first block is three switches in parallel, " +
        "\\(S_{1}\\), \\(S_{2}'\\), \\(S_{3}'\\), giving \\(p\\vee\\sim q\\vee\\sim r\\). The second " +
        "block is \\(S_{1}\\) in parallel with \\(S_{2}\\) and \\(S_{3}\\) in series, giving " +
        "\\(p\\vee(q\\wedge r)\\). So the circuit is \\((p\\vee\\sim q\\vee\\sim r)\\wedge(p\\vee(q\\wedge r))\\). " +
        "Since \\((p\\vee A)\\wedge(p\\vee B)\\equiv p\\vee(A\\wedge B)\\) with \\(A=\\sim q\\vee\\sim r=\\sim(q\\wedge r)\\) " +
        "and \\(B=q\\wedge r\\), the bracket is \\(\\sim(q\\wedge r)\\wedge(q\\wedge r)\\equiv F\\). " +
        "The whole circuit is therefore \\(p\\vee F\\equiv p\\), i.e. the circuit carrying " +
        "\\(S_{1}\\) alone — option (D).",
    },
  },
  {
    questionId: "ad37aefa-d09e-469a-bfd6-4bec6c92685f",
    source: "2024 13 May Shift 1, Q138",
    stem: media("2024-may-13-s1", "image10.png"),
    options: {
      A: media("2024-may-13-s1", "image11.png"),
      B: media("2024-may-13-s1", "image12.png"),
      C: media("2024-may-13-s1", "image13.png"),
      D: media("2024-may-13-s1", "image14.png"),
    },
  },
];

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function mimeOf(path: string): AllowedMime | null {
  const ext = path.toLowerCase().split(".").pop();
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  return null;
}

/** Fail before touching the DB if any picture is missing, so a run is all-or-nothing. */
function preflight(): string[] {
  const missing: string[] = [];
  for (const t of TARGETS) {
    for (const p of [t.stem, ...Object.values(t.options ?? {})]) {
      if (p && !existsSync(p)) missing.push(p);
    }
  }
  return missing;
}

async function upload(client: SupabaseClient, path: string): Promise<string> {
  const mime = mimeOf(path);
  if (!mime) throw new Error(`unsupported image type: ${path}`);
  return uploadImage(client, ORG_ID, readFileSync(path), mime);
}

const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f"; // LWS Pune

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();

  const missing = preflight();
  if (missing.length) {
    console.error(`${missing.length} source image(s) not on disk:`);
    for (const m of missing) console.error(`  ${m}`);
    console.error(
      "\nRe-extract the shift(s) with scripts/mhtcet/extract.ts, then re-run " +
        "figures/build-logic-composites.py for the composites."
    );
    process.exit(1);
  }

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  let stems = 0;
  let opts = 0;
  let fixes = 0;

  for (const t of TARGETS) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, image_url, text, solution, options(id, label, text, is_correct, image_url)")
      .eq("id", t.questionId)
      .single();
    if (error || !q) {
      console.error(`  ${t.source}: row not found (${error?.message ?? "no row"}) — skipping`);
      continue;
    }
    console.log(`\n${t.source}  [${t.questionId}]`);
    console.log(`  ${String(q.text).replace(/\s+/g, " ").slice(0, 80)}`);

    const options = q.options as {
      id: string;
      label: string;
      text: string;
      is_correct: boolean;
      image_url: string | null;
    }[];

    if (t.stem) {
      if (q.image_url) {
        console.log("  stem: already attached — skip");
      } else if (!apply) {
        console.log(`  stem: would attach ${t.stem.split(/[\\/]/).pop()}`);
        stems++;
      } else {
        const path = await upload(client, t.stem);
        const { error: e } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
        if (e) throw new Error(`${t.source} stem: ${e.message}`);
        console.log("  stem: attached");
        stems++;
      }
    }

    for (const [label, file] of Object.entries(t.options ?? {}) as [Label, string][]) {
      const opt = options.find((o) => o.label === label);
      if (!opt) {
        console.warn(`  option ${label}: no such option row — skipping`);
        continue;
      }
      if (opt.image_url) {
        console.log(`  option ${label}: already attached — skip`);
        continue;
      }
      if (!apply) {
        console.log(`  option ${label}: would attach ${file.split(/[\\/]/).pop()}`);
        opts++;
        continue;
      }
      const path = await upload(client, file);
      const { error: e } = await client.from("options").update({ image_url: path }).eq("id", opt.id);
      if (e) throw new Error(`${t.source} option ${label}: ${e.message}`);
      console.log(`  option ${label}: attached`);
      opts++;
    }

    if (t.fix) {
      const keyedNow = options.find((o) => o.is_correct)?.label ?? "(none)";
      // Already-applied detection, so a re-run reports "skip" rather than claiming a
      // write it did not make — the updates below are no-ops once satisfied, and a
      // log line saying "applied" for a no-op is a false record of what happened.
      const textDone = Object.entries(t.fix.optionText ?? {}).every(
        ([label, text]) => options.find((o) => o.label === label)?.text === text
      );
      const keyDone = !t.fix.correctLabel || keyedNow === t.fix.correctLabel;
      const solutionDone = !t.fix.solution || q.solution === t.fix.solution;
      if (textDone && keyDone && solutionDone) {
        console.log("  fix: already applied — skip");
      } else if (!apply) {
        console.log(`  FIX — ${t.fix.reason}`);
        console.log(`    key: ${keyedNow} -> ${t.fix.correctLabel ?? keyedNow}`);
        fixes++;
      } else {
        console.log(`  FIX — ${t.fix.reason}`);
        console.log(`    key: ${keyedNow} -> ${t.fix.correctLabel ?? keyedNow}`);
        for (const [label, text] of Object.entries(t.fix.optionText ?? {}) as [Label, string][]) {
          const opt = options.find((o) => o.label === label);
          if (opt && opt.text !== text) {
            const { error: e } = await client.from("options").update({ text }).eq("id", opt.id);
            if (e) throw new Error(`${t.source} option ${label} text: ${e.message}`);
          }
        }
        if (t.fix.correctLabel) {
          for (const o of options) {
            const shouldBe = o.label === t.fix.correctLabel;
            if (o.is_correct !== shouldBe) {
              const { error: e } = await client
                .from("options")
                .update({ is_correct: shouldBe })
                .eq("id", o.id);
              if (e) throw new Error(`${t.source} option ${o.label} is_correct: ${e.message}`);
            }
          }
        }
        if (t.fix.solution) {
          const { error: e } = await client
            .from("questions")
            .update({ solution: t.fix.solution })
            .eq("id", q.id);
          if (e) throw new Error(`${t.source} solution: ${e.message}`);
        }
        console.log("    fix: applied");
        fixes++;
      }
    }
  }

  const verb = apply ? "attached" : "would attach";
  console.log(
    `\n=== ${verb} ${stems} stem figure(s) + ${opts} option figure(s); ` +
      `${fixes} content fix(es) ${apply ? "applied" : "pending"} ===`
  );
  if (!apply) console.log("dry run — pass --apply to write.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
