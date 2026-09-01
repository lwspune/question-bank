/**
 * Strip directions that the ingest copied into every stem of a set, where the
 * set already carries them as `context`.
 *
 *   npx tsx scripts/practice-paper/fix-duplicated-directions.ts            # dry run
 *   npx tsx scripts/practice-paper/fix-duplicated-directions.ts --apply
 *
 * THE DEFECT, as printed. NDA GAT Mock 5 Q41-50 rendered as:
 *
 *   Common context for questions 41-50: Choose among the following that best
 *   expresses the meaning of the given word.
 *   41. Choose among the following that best expresses the meaning of the given
 *       word:HOSTILE
 *   42. Choose among the following that best expresses the meaning of the given
 *       word:ABATE
 *
 * — the instruction eleven times on one page: once as the block heading and once
 * inside each of the ten questions.
 *
 * THE SOURCE IS NOT AT FAULT — verified. GAT MOCK TEST-3 (22-3-26).docx prints
 * it once, as a directions line, and each item is just the word:
 *
 *   SYNONYMS :-Directions (16-25): Choose among the following that best
 *   expresses the meaning of the given word.
 *   Q16. ABATE(a) Increase (b) Lessen (c) Provoke (d) Maintain
 *
 * So the ingest stored the directions correctly as `context` AND ALSO pasted them
 * at the head of every stem. The repair removes the paste; the context stays.
 *
 * ⚠ NOT A GENERAL RULE — "the stem repeats its context" is NOT by itself a
 * defect, and a scan that treated it as one would break good questions. Of 29
 * bank-wide rows whose stem opens with its own context, only these 10 are wrong.
 * The rest are set sub-items that legitimately restate a shared lead-in and then
 * complete it DIFFERENTLY per item — "In how many ways can the letters of the
 * word PERMUTATIONS be arranged if the vowels are all together?" vs "... if the
 * words start with P and end with S?" — which is what lets each row stand alone
 * on /browse. The discriminator is what is LEFT after the repeat: a real question
 * (keep) versus a bare token (strip). Hence an explicit set allow-list here
 * rather than a pattern sweep.
 *
 * `content_hash` COVERS THE STEM, so this is not hash-neutral like a context or
 * set_id repair. The hash is recomputed with the real helper and re-stamped
 * IN PLACE — never delete-and-re-commit, which would mint a fresh uuid and
 * orphan the row's `paper_questions` membership (these 10 are in Mock 5). Same
 * approach as scripts/foundation/strip-figure-prose.ts.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

/** Set -> the exact prefix to remove from each of its stems. */
const TARGETS: { setId: string; prefix: string; why: string }[] = [
  {
    setId: "0e8abffc-350b-5c87-9bfa-8b89cb16f662:S3",
    prefix: "Choose among the following that best expresses the meaning of the given word:",
    why: "NDA GAT Weekly Mock T3, SYNONYMS block (source Q16-25). Source prints the instruction once; each item is the bare word.",
  },
];

/** A stem must still say something after the strip, and must not become a sentence-less blank. */
const MIN_REMAINDER = 2;

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(url!, key!, { auth: { persistSession: false } });

  const planned: { id: string; qn: string | null; before: string; after: string; hash: string; newHash: string }[] = [];
  let alreadyDone = 0;

  for (const t of TARGETS) {
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, org_id, exam_id, text, context, content_hash, options(label, text, is_correct)")
      .eq("set_id", t.setId);
    if (error) throw new Error(`${t.setId}: ${error.message}`);
    const rows = (data ?? []) as any[];
    if (!rows.length) throw new Error(`${t.setId}: no rows — refusing`);

    for (const r of rows) {
      const text = String(r.text);
      if (!text.startsWith(t.prefix)) {
        // Already stripped, or a stem this target was not derived against.
        if (!text.includes(t.prefix)) { alreadyDone++; continue; }
        throw new Error(`${r.id}: prefix present but not at the start — refusing`);
      }
      const after = text.slice(t.prefix.length).replace(/^[\s:.–—-]+/, "").trim();
      if (after.length < MIN_REMAINDER) {
        throw new Error(`${r.id}: stripping would leave ${JSON.stringify(after)} — refusing`);
      }
      // The context must actually carry the directions, or the strip loses them.
      const ctx = String(r.context ?? "");
      if (!ctx.trim()) throw new Error(`${r.id}: no context to carry the directions — refusing`);

      const opts = [...r.options].sort((a: any, b: any) => a.label.localeCompare(b.label));
      const answer = opts.find((o: any) => o.is_correct)?.label ?? "";
      const recomputed = contentHash(text, opts.map((o: any) => o.text), answer);
      if (recomputed !== r.content_hash) {
        throw new Error(`${r.id}: stored content_hash does not recompute — refusing`);
      }
      const newHash = contentHash(after, opts.map((o: any) => o.text), answer);
      const { data: clash } = await db
        .from("questions").select("id")
        .eq("org_id", r.org_id).eq("exam_id", r.exam_id).eq("content_hash", newHash).neq("id", r.id).limit(1);
      if (clash?.length) throw new Error(`${r.id}: new hash collides with ${clash[0].id} — refusing`);

      planned.push({ id: r.id, qn: r.question_number, before: text, after, hash: r.content_hash, newHash });
    }
  }

  console.log(`already stripped: ${alreadyDone}`);
  console.log(`to strip: ${planned.length}\n`);
  for (const p of planned) {
    console.log(`  Q${String(p.qn).padStart(3)}  ${JSON.stringify(p.before.slice(0, 84))}`);
    console.log(`      ->  ${JSON.stringify(p.after)}   hash ${p.hash.slice(0, 8)}… -> ${p.newHash.slice(0, 8)}…`);
  }

  if (!apply) { console.log(`\n[dry run] pass --apply to write.`); return; }

  for (const p of planned) {
    const { error } = await db.from("questions").update({ text: p.after, content_hash: p.newHash }).eq("id", p.id);
    if (error) throw new Error(`${p.id}: ${error.message}`);
  }
  console.log(`\n${planned.length} stem(s) stripped.`);

  // Verify against the database, and confirm each row is still in its paper.
  const ids = planned.map((p) => p.id);
  const { data: after } = await db.from("questions").select("id, text, content_hash").in("id", ids);
  let wrong = 0;
  for (const q of after ?? []) {
    const p = planned.find((x) => x.id === q.id)!;
    if (q.text !== p.after || q.content_hash !== p.newHash) wrong++;
  }
  const { data: pqs } = await db.from("paper_questions").select("question_id").in("question_id", ids);
  console.log(`verified: ${wrong} row(s) wrong (expected 0); still in a paper: ${(pqs ?? []).length} of ${ids.length}`);
  if (wrong) process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
