/**
 * Remove the HEADLESS remnant of a figure description from an image-bearing
 * question's stem.
 *
 *   npx tsx scripts/foundation/strip-figure-prose.ts <ws>:<qnum>[,<qnum>] [...]
 *   npx tsx scripts/foundation/strip-figure-prose.ts electricity-1:43,69 --apply
 *
 * THE DEFECT. When a figure was attached, the parenthetical prose that had been
 * standing in for it was stripped from the stem — but only its FRONT. What
 * survives is a fragment that starts mid-sentence and still carries the closing
 * bracket of a parenthesis whose opening is gone:
 *
 *   "Six equal resistances are connected between points P, Q and R as shown in
 *    the figure. The net resistance will be maximum between:
 *
 *    , Q (bottom left) and R (bottom right). The side P-Q is a single resistor
 *    ... All six resistors have the same value.)"
 *
 * A student reads a question that trails off into a sentence beginning with a
 * comma. Measured on the two GAT mocks: 3 of the 9 image-bearing questions.
 *
 * WHY REMOVE RATHER THAN REPAIR. The figure is attached and correct, so the
 * prose is redundant by construction — the same judgement `paper-text.ts` makes
 * with its P5 rule. Every one of these three stems reads completely without it.
 *
 * WHY IN-PLACE. `content_hash` covers the stem, so a delete-and-re-commit mints
 * a fresh uuid and orphans the row's `paper_questions` memberships. The hash is
 * therefore recomputed with the REAL helper and re-stamped, exactly as
 * scripts/bank-paper/repair-paper-text.ts does.
 *
 * Refuses to touch a row whose stored hash does not recompute from its current
 * text, or whose new hash would collide with another row in the same exam.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { EXAM_ID, ORG_ID, WORKSHEETS, requireWorksheet } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** Paragraph separator, as a constant so a shell-authored edit cannot eat it. */
const PARA = "\n\n";

/** Count ( and ) outside math zones — `\(` `\)` are KaTeX delimiters. */
function orphanClose(s: string): number {
  const bare = s.replace(/\\\(|\\\)/g, "  ");
  let depth = 0, worst = 0;
  for (const ch of bare) {
    if (ch === "(") depth++;
    else if (ch === ")") { depth--; if (depth < worst) worst = depth; }
  }
  return -worst;
}

/** The stem with its headless figure-prose tail removed, or null if none. */
export function stripTail(text: string): string | null {
  if (orphanClose(text) === 0) return null;
  const parts = text.split("\n\n");
  if (parts.length < 2) return null;
  const head = parts.slice(0, -1).join("\n\n").trimEnd();
  const tail = parts[parts.length - 1];
  // Only strip when the DAMAGE is confined to the tail and the head survives as
  // a complete question. Anything else is a different defect and needs a human.
  if (orphanClose(tail) === 0) return null;
  if (orphanClose(head) !== 0) return null;
  if (!/[.?:]$/.test(head)) return null;
  return head;
}

/**
 * The stem with a COMPLETE parenthetical figure description removed.
 *
 * A SECOND, DISTINCT DEFECT from the headless tail above. `stripTail` keys on an
 * ORPHAN close-paren, so it correctly refuses these: the parenthesis is intact,
 * a whole paragraph of it, describing a figure that IS attached —
 *
 *   "(The figure is a section of an ovary ... P and Q are developing follicles,
 *    T is the released ovum, R is the corpus luteum ...)"
 *
 * That is not untidiness. On the five NDA GAT Mock 3 figures it gives the answer
 * away: the question asks which statement about the labelled structures is
 * correct, and the parenthetical names every label. Another states that ∠e is
 * marked inside the prism, which is the mis-marking under test. Removing it is
 * the same judgement `paper-text.ts` P5 makes — the figure is the evidence, the
 * prose is a redundant stand-in — with the difference that here it also leaks.
 *
 * ONLY safe once the figure is verified present and legible; the caller owns
 * that, exactly as the P5 rule is non-blocking because a description is
 * sometimes the only thing making a question answerable.
 */
export function stripParenthetical(text: string): string | null {
  const paras = text.split("\n\n");
  if (paras.length < 2) return null;
  const idx = paras.findIndex((p) => {
    const t = p.trim();
    return (
      t.startsWith("(") && t.endsWith(")") && orphanClose(t) === 0 &&
      /\b(figure|graph|diagram|image|picture)\b/i.test(t)
    );
  });
  if (idx === -1) return null;
  const rest = paras.filter((_, i) => i !== idx).join("\n\n").trim();
  // The remainder must still stand alone as a complete question.
  if (!rest || orphanClose(rest) !== 0 || !/[.?:_]$/.test(rest.trimEnd())) return null;
  return rest;
}

type Row = { id: string; text: string; content_hash: string; question_number: string | null };

async function main() {
  const apply = process.argv.includes("--apply");
  const specs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (!specs.length) throw new Error("usage: strip-figure-prose.ts <ws>:<qnum>[,<qnum>] [...] [--apply]");

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const planned: { row: Row; next: string; newHash: string; where: string }[] = [];
  const problems: string[] = [];

  for (const spec of specs) {
    const [id, list] = spec.split(":");
    const ws = requireWorksheet(id);
    for (const qnum of (list ?? "").split(",").filter(Boolean)) {
      const { data, error } = await db
        .from("questions")
        .select("id, text, content_hash, question_number, options(label, text, is_correct)")
        .eq("exam_id", EXAM_ID).eq("source_file", ws.sourceFile).eq("question_number", qnum)
        .maybeSingle();
      if (error) throw new Error(`${id} Q${qnum}: ${error.message}`);
      if (!data) { problems.push(`${id} Q${qnum}: no such row`); continue; }

      const row = data as unknown as Row & { options: { label: string; text: string; is_correct: boolean }[] };
      // Headless tail first; then the complete-parenthetical case.
      const next = stripTail(row.text) ?? stripParenthetical(row.text);
      if (!next) { console.log(`ok    ${id} Q${qnum}: nothing to strip`); continue; }

      const optTexts = row.options.map((o) => o.text);
      // `answer` is the LABEL, not the option text — contentHash uppercases it,
      // which only makes sense for "A".."D". Passing the text makes every hash
      // fail to recompute and the guard (correctly) refuses the whole batch.
      const answer = row.options.find((o) => o.is_correct)?.label ?? "";
      const recomputed = contentHash(row.text, optTexts, answer);
      if (recomputed !== row.content_hash) {
        problems.push(`${id} Q${qnum}: stored content_hash does not recompute — refusing to touch it`);
        continue;
      }
      const newHash = contentHash(next, optTexts, answer);
      const { data: clash } = await db.from("questions").select("id")
        .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID).eq("content_hash", newHash).neq("id", row.id).limit(1);
      if (clash?.length) { problems.push(`${id} Q${qnum}: new hash collides with ${clash[0].id}`); continue; }

      planned.push({ row, next, newHash, where: `${id} Q${qnum}` });
    }
  }

  for (const p of planned) {
    console.log(`\n${p.where}   -${p.row.text.length - p.next.length} chars   ${p.row.content_hash.slice(0, 8)} -> ${p.newHash.slice(0, 8)}`);
    // The removed text is a SUFFIX for stripTail but can sit MID-STEM for
    // stripParenthetical, so report whichever paragraph actually went.
    const removed = p.row.text.startsWith(p.next)
      ? p.row.text.slice(p.next.length)
      : p.row.text.split(PARA).find((q) => !p.next.includes(q.trim())) ?? "(mid-stem)";
    console.log(`  REMOVED: ${JSON.stringify(removed.trim().slice(0, 150))}`);
    console.log(`  KEEPS  : ${JSON.stringify(p.next)}`);
  }
  if (problems.length) {
    console.log(`\n${problems.length} problem(s):`);
    for (const x of problems) console.log(`  ${x}`);
  }
  if (!apply) { console.log(`\n[dry run] pass --apply to write.`); return; }

  for (const p of planned) {
    const { error } = await db.from("questions")
      .update({ text: p.next, content_hash: p.newHash }).eq("id", p.row.id);
    if (error) throw new Error(`${p.where}: ${error.message}`);
    console.log(`applied ${p.where}`);
  }
  console.log(`\n${planned.length} stem(s) repaired.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
