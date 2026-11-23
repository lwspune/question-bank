/**
 * Restore six PUBLIC MCQ options that were blank or a markup fragment (2026-11-19,
 * SUGGESTIONS.md ledger "SIX PUBLIC MCQs SHIP AN OPTION THAT IS A MARKUP FRAGMENT").
 * Every key was already right; only a distractor (and in two rows the stem it
 * leaked into) was broken.
 *
 *   npx tsx --env-file=<.env.local> scripts/reviews/repair-broken-options-2026-11-19.ts [--apply]
 *
 * Sources: the printed NDA 2024 (II) booklet (Q105, Q114); the JEE source .docx
 * (27 Jul 2022 Q125); the row's own working (NDA Mock 3 Q92); and, where the JEE
 * .docx itself is blank, the paper's published option set (29 Jul 2022 Q166: 1/6;
 * 3 Apr 2025 Q140: 1). The JEE and NDA-mock source files carry the same edits.
 * Options and stem are content_hash inputs: the hash is recomputed with the real
 * helper, collision-checked, and re-stamped in place, guarded on the old hash.
 */
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

const APPLY = process.argv.includes("--apply");

type Fix = { id: string; label: string; options: Record<string, string>; stem?: [string, string] };

const FIXES: Fix[] = [
  { id: "881fc463-5de9-4342-9e3f-f6bf2d1a972c", label: "JEE 29 Jul 2022 Q166", options: { C: String.raw`\(\frac{1}{6}\)` } },
  {
    id: "c7fe8b61-2781-4667-965c-0c1b135687e7",
    label: "JEE 27 Jul 2022 Q125",
    options: { A: String.raw`Both (a) and (R) are correct and \((R)\) is the correct explanation of \((A)\)` },
    stem: [" (a) Both (a) and (R) are correct and (R) is the correct explanation of", ""],
  },
  { id: "122be589-83aa-48e3-8014-d7f383fdeedb", label: "JEE 3 Apr 2025 Q140", options: { B: "1" } },
  {
    id: "00526aaf-b5d7-44db-bf65-830eaa8894ef",
    label: "NDA Maths Mock 3 Q92",
    options: { A: String.raw`\(A \cup P(A) = P(A)\)` },
    stem: ["Which one of the following is correct\n    (a) $A \\cup P(A) = P", "Which one of the following is correct?"],
  },
  { id: "707e673d-3165-44c5-b421-eabd1dd647d8", label: "NDA 2024 (II) Q105", options: { A: String.raw`\(\dfrac{1}{3}\)` } },
  { id: "de5122c4-6e6d-4810-be7b-ca540086ab49", label: "NDA 2024 (II) Q114", options: { C: String.raw`\(\dfrac{3}{5}\)` } },
];

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  let written = 0;
  for (const f of FIXES) {
    const { data: rows, error } = await db
      .from("questions")
      .select("id, org_id, exam_id, text, content_hash, options(id, label, text, is_correct, image_url)")
      .eq("id", f.id);
    if (error) throw new Error(error.message);
    if (rows.length !== 1) throw new Error(`${f.label}: ${rows.length} rows for ${f.id}`);
    const q = rows[0];
    const opts = [...(q.options as { id: string; label: string; text: string; is_correct: boolean; image_url: string | null }[])].sort((a, b) => a.label.localeCompare(b.label));
    const key = opts.filter((o) => o.is_correct).map((o) => o.label);
    if (key.length !== 1) throw new Error(`${f.label}: ${key.length} keys`);
    if (contentHash(q.text, opts.map((o) => o.text), key[0]) !== q.content_hash) throw new Error(`${f.label}: stored hash does not reproduce`);

    for (const label of Object.keys(f.options)) {
      const o = opts.find((x) => x.label === label)!;
      if (o.image_url || o.text.replace(/[\s$-]/g, "").length > 0) throw new Error(`${f.label}: option ${label} is not blank/fragment: "${o.text}"`);
      if (label === key[0]) throw new Error(`${f.label}: refusing to rewrite the keyed option`);
    }
    let text = q.text as string;
    if (f.stem) {
      if (text.split(f.stem[0]).length !== 2) throw new Error(`${f.label}: stem edit does not match exactly once`);
      text = text.replace(f.stem[0], f.stem[1]).trimEnd();
    }
    const newOpts = opts.map((o) => ({ ...o, text: f.options[o.label] ?? o.text }));
    if (new Set(newOpts.map((o) => o.text.trim())).size !== 4) throw new Error(`${f.label}: options not distinct`);
    const hash = contentHash(text, newOpts.map((o) => o.text), key[0]);
    const { data: clash } = await db.from("questions").select("id").eq("org_id", q.org_id).eq("exam_id", q.exam_id).eq("content_hash", hash).neq("id", q.id);
    if (clash?.length) throw new Error(`${f.label}: new hash collides with ${clash[0].id}`);
    console.log(`${f.label}: ${Object.entries(f.options).map(([l, t]) => `${l} = ${t}`).join("; ")}${f.stem ? "; stem cleaned" : ""}`);
    if (!APPLY) continue;

    for (const o of newOpts) {
      if (!(o.label in f.options)) continue;
      const { error: oe } = await db.from("options").update({ text: o.text }).eq("id", o.id);
      if (oe) throw new Error(`${f.label}: ${oe.message}`);
    }
    const { data: w, error: ue } = await db
      .from("questions").update({ text, content_hash: hash }).eq("id", q.id).eq("content_hash", q.content_hash).select("id");
    if (ue) throw new Error(ue.message);
    if (w?.length !== 1) throw new Error(`${f.label}: row changed under us (options already written; re-run)`);
    written++;
  }
  console.log(`${APPLY ? "APPLIED" : "DRY RUN"}: ${FIXES.length} rows${APPLY ? `, ${written} written` : ""}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
