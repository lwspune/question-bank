/**
 * Replace a shipped SSC CGL question's pictures in place (a better crop, a chart redrawn from its
 * printed numbers): the row keeps its id and takes the new pictures and the content_hash a fresh
 * commit of them would give (liveFigures.ts).
 *
 *   npx tsx scripts/ssc-cgl/refigure.ts <shiftId> <n> --from=<dir>            # dry run: the checks
 *   npx tsx scripts/ssc-cgl/refigure.ts <shiftId> <n> --from=<dir> --apply
 *
 * <dir> holds the replacements under the figure's own names, qNNN.png (stem) and qNNN-A.png ..
 * qNNN-D.png; a picture not in <dir> stays as it is. The live content_hash must be the one the
 * CURRENT pictures give (else the row moved on since commit, and nothing is written) and the new
 * hash must be free in the exam. Then the changed pictures are uploaded, the row and its options
 * updated, and the files copied into figures/<shift>/. Old paths are logged to refigure-log.json.
 */
import { createClient } from "@supabase/supabase-js";
import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { uploadImage } from "../../src/lib/storage/images";
import { ORG_ID, requireExamId, requireShift, tierOf } from "./config";
import { figureRow, rowHash } from "./liveFigures";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const LOG = join(__dirname, "refigure-log.json");

async function main() {
  const [shiftArg, nArg] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const shift = requireShift(shiftArg);
  const n = Number(nArg);
  const from = process.argv.find((a) => a.startsWith("--from="))?.split("=")[1];
  const apply = process.argv.includes("--apply");
  if (!n || !from) throw new Error("usage: refigure.ts <shiftId> <n> --from=<dir> [--apply]");

  const row = figureRow(shift.id, n);
  if (!row) throw new Error(`${shift.id} Q${n}: rows.json has no figure row for it`);
  // Slots by lower-cased name: a few shifts name their files Q001-A.png.
  const slots = new Map<string, { file: string; label: "stem" | "A" | "B" | "C" | "D" }>();
  if (row.figures.stem) slots.set(basename(row.figures.stem).toLowerCase(), { file: row.figures.stem, label: "stem" });
  row.figures.options?.forEach((f, i) => slots.set(basename(f).toLowerCase(), { file: f, label: "ABCD"[i] as "A" }));

  const replace = new Map<string, Buffer>();
  const changed: { file: string; src: string; label: string; png: Buffer }[] = [];
  for (const name of readdirSync(from)) {
    const slot = slots.get(name.toLowerCase());
    if (!slot) throw new Error(`${name} is not one of this question's pictures (${[...slots.keys()].join(", ")})`);
    const png = readFileSync(join(from, name));
    if (png.equals(readFileSync(slot.file))) continue;
    replace.set(slot.file, png);
    changed.push({ ...slot, src: join(from, name), png });
  }
  if (!changed.length) return console.log("nothing to change: every picture in --from matches the current one");

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const examId = requireExamId(tierOf(shift.id));
  const { data: q, error } = await db
    .from("questions")
    .select("id, image_url, content_hash, options(id, label, image_url)")
    .eq("exam_id", examId)
    .eq("source_file", shift.sourceFile)
    .eq("question_number", String(n))
    .single();
  if (error || !q) throw new Error(`${shift.id} Q${n}: no live row (${error?.message})`);
  const oldHash = rowHash(row);
  const newHash = rowHash(row, replace);
  if (q.content_hash !== oldHash) throw new Error(`${shift.id} Q${n}: the live content_hash is not the one its current pictures give`);
  const { data: twin } = await db.from("questions").select("id").eq("exam_id", examId).eq("content_hash", newHash).neq("id", q.id).limit(1);
  if (twin?.length) throw new Error(`${shift.id} Q${n}: the new hash is already held by ${twin[0].id}`);
  const options = (q.options ?? []) as { id: string; label: string; image_url: string | null }[];
  console.log(`${shift.id} Q${n}: ${changed.map((c) => c.label).join(", ")} ${apply ? "" : "would be "}replaced; content_hash ${oldHash.slice(0, 12)} -> ${newHash.slice(0, 12)}`);
  if (!apply) return;

  const entry = { id: q.id, shift: shift.id, n, oldHash, newHash, pictures: [] as { label: string; old: string | null; new: string }[], at: new Date().toISOString() };
  const paths = new Map<string, string>();
  for (const c of changed) paths.set(c.label, await uploadImage(db, ORG_ID, c.png, "image/png"));
  const log = existsSync(LOG) ? JSON.parse(readFileSync(LOG, "utf8")) : [];
  log.push(entry);
  const save = () => writeFileSync(LOG, JSON.stringify(log, null, 1));
  // The question first, guarded on its hash: a row that moved since the check is left alone.
  const stem = paths.get("stem");
  const { error: e, count } = await db
    .from("questions")
    .update({ content_hash: newHash, ...(stem ? { image_url: stem } : {}) }, { count: "exact" })
    .eq("id", q.id)
    .eq("content_hash", oldHash);
  if (e || count !== 1) throw new Error(`${shift.id} Q${n}: update failed (${e?.message ?? `${count} rows`})`);
  if (stem) entry.pictures.push({ label: "stem", old: q.image_url, new: stem });
  save();
  for (const [label, path] of paths) {
    if (label === "stem") continue;
    const opt = options.find((o) => o.label === label);
    if (!opt) throw new Error(`${shift.id} Q${n} has no option ${label}`);
    const { error: oe } = await db.from("options").update({ image_url: path }).eq("id", opt.id);
    if (oe) throw new Error(`${shift.id} Q${n} option ${label}: ${oe.message} (question already updated; see ${LOG})`);
    entry.pictures.push({ label, old: opt.image_url, new: path });
    save();
  }
  for (const c of changed) copyFileSync(c.src, c.file);
  console.log(`done: ${changed.length} picture(s) replaced, logged to ${LOG}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
