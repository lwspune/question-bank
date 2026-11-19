/**
 * Move 27 voided / dropped MCQs to the cancelled shape of migration 0119
 * (2026-11-19, SUGGESTIONS.md ledger: "NEET still carries the pre-0119 workaround"
 * and "an MCQ with four options and zero marked correct"; owner: all 26 + IPMAT).
 *
 *   npx tsx --env-file=<.env.local> scripts/reviews/cancel-voided-2026-11-19.ts [--apply]
 *
 * - 23 CBSE 10/12 board MCQs the marking scheme voided ("award the mark to every
 *   student"). Already keyless; they gain the notice. Hash unchanged.
 * - IPMAT Indore 2024 Q7, which the source marks dropped: the count is 2,901, inside
 *   no printed range (two independent counts). Keyless already; gains the notice
 *   and its first solution. Hash unchanged.
 * - NEET 2022 Q93 + Q128 and Re-NEET 2026 Q26 (NTA dropped / bonus), stored with a
 *   PLACEHOLDER key A. The key is cleared FIRST (0119's trigger refuses a notice on
 *   a keyed row), the hash recomputed as the upload path does for a cancelled row
 *   (answer "CANCELLED"), and the "[... Kept PRIVATE.]" bracket dropped from the
 *   solution because the notice now says it.
 * All four rows that sit in a mock are already grace there, so no score moves.
 * Every write is guarded on the state read; a re-run is a no-op.
 */
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

const APPLY = process.argv.includes("--apply");

const CBSE_NOTE = "Voided by CBSE: the marking scheme gives the mark to every student who attempted it.";
const CBSE_IDS = [
  "34972ccf-620f-4440-b954-47570cc709c7", "f7b55570-4690-4bef-aeb2-f9949470fe4a",
  "b35c35fe-3813-49b2-ae9f-9d87930351b3", "f7c7b3e6-ad0a-4e3c-aee2-833fa2b8bce2", "57a647ae-5485-4ae3-8865-c5f41901c14d",
  "234a8720-c255-4842-8d2b-809eb194de07", "15793a3b-a179-43b6-b860-78e8bb6f5306", "4eb98515-1b35-401f-9b59-03d75e3ddcfb",
  "5e0b338d-d26b-4481-889e-92b969756fb3", "a706c981-0400-40f7-a7a5-15e2b5b51acb", "e520f820-7420-4ed5-8d23-192ada960bd3",
  "b070d0ba-1d59-4d18-bd62-9037b7adcd18", "48375d95-1a01-4dad-b632-bc3b5e97b1ba", "4f441c4a-a1f9-4c77-a1a6-b0bcd4186a7c",
  "848cd4c0-9183-459e-843e-b93c08a193be", "17c930de-6b44-4044-b01f-d6d0fb0ac657", "9dc1bcc9-5138-43a4-8be8-ac5176c74978",
  "08571f89-607b-495f-a2ec-8c252ce78488", "77c7a87b-d484-4673-91d3-ce6b9898705b", "7158a38a-a58a-4a8c-bd9a-2f55169223b0",
  "06e6a35c-5d98-4c89-9519-74930dd08748", "20c3e5f9-4080-4efd-8ea2-b06fd5d114ac", "b7fdbd94-dc66-4175-af13-7cec69bc2de5",
];

type Target = { id: string; note: string; placeholderKey?: string; solution?: string };

const TARGETS: Target[] = [
  ...CBSE_IDS.map((id) => ({ id, note: CBSE_NOTE })),
  {
    id: "572591d0-f580-41e4-aef4-7f9d4e723744",
    note: "Dropped from IPMAT Indore 2024 scoring: no option is correct (the count is 2,901). In PYQ Vault mocks it is awarded to every candidate.",
    solution:
      "Let \\(m\\) be the most balloons any boy gets. Every girl must then get at least \\(m\\), and everyone gets at least 1.\n\n" +
      "- \\(m = 1\\): each boy gets 1, leaving 17 for the 5 girls with at least 1 each: \\(\\binom{16}{4} = 1820\\) ways.\n" +
      "- \\(m = 2\\): the boys get 4, 5 or 6 in all (3, 3 and 1 ways), and each girl gets at least 2 from what is left: \\(3\\binom{10}{4} + 3\\binom{9}{4} + \\binom{8}{4} = 630 + 378 + 70 = 1078\\) ways.\n" +
      "- \\(m = 3\\): the boys get at least 5 and the girls at least 15, so the boys get exactly 3, 1, 1 (3 ways) and each girl exactly 3: 3 ways.\n" +
      "- \\(m \\ge 4\\) needs at least \\(4 + 1 + 1 + 5 \\times 4 = 26 > 20\\) balloons.\n\n" +
      "So \\(n = 1820 + 1078 + 3 = 2901\\), which lies in none of the four printed ranges.",
  },
  {
    id: "3fb985a4-5f11-4ae1-b6ee-b48aef13e3d7",
    note: "Dropped by NTA: the paper prints E° of the cell as 10.5 V, which gives about 10.41 V, and no option matches.",
    placeholderKey: "A",
  },
  {
    id: "99dc8e34-2c27-489e-8f18-f49ca0cbfc90",
    note: "Dropped by NTA: all five statements are correct, and no option lists all five.",
    placeholderKey: "A",
  },
  {
    id: "7b653f8a-90ef-4064-85b1-f228318e448e",
    note: "Bonus by NTA: the reading works out to 1.06 cm, which no option shows, so every candidate got the marks.",
    placeholderKey: "A",
  },
];

const LEADING_BRACKET = /^\[[^\]]*(?:Kept PRIVATE|graded as grace)[^\]]*\]\s*/;

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  let done = 0;
  for (const t of TARGETS) {
    const { data: q, error } = await db
      .from("questions")
      .select("id, org_id, exam_id, text, solution, content_hash, cancelled_note, question_format, options(label, text, is_correct)")
      .eq("id", t.id)
      .single();
    if (error) throw new Error(`${t.id}: ${error.message}`);
    if (q.cancelled_note) { console.log(`${t.id.slice(0, 8)} already cancelled`); continue; }
    if (q.question_format !== "mcq") throw new Error(`${t.id}: not an MCQ`);
    const opts = [...(q.options as { label: string; text: string; is_correct: boolean }[])].sort((a, b) => a.label.localeCompare(b.label));
    const keys = opts.filter((o) => o.is_correct).map((o) => o.label);
    const expected = t.placeholderKey ? [t.placeholderKey] : [];
    if (keys.join() !== expected.join()) throw new Error(`${t.id}: key [${keys}] is not the expected [${expected}]`);

    const update: Record<string, unknown> = { cancelled_note: t.note };
    if (t.solution) {
      if ((q.solution ?? "").trim()) throw new Error(`${t.id}: already has a solution`);
      update.solution = t.solution;
    }
    if (t.placeholderKey) {
      if (contentHash(q.text, opts.map((o) => o.text), t.placeholderKey) !== q.content_hash) {
        throw new Error(`${t.id}: stored content_hash does not reproduce`);
      }
      const hash = contentHash(q.text, opts.map((o) => o.text), "CANCELLED");
      const { data: clash } = await db
        .from("questions").select("id").eq("org_id", q.org_id).eq("exam_id", q.exam_id).eq("content_hash", hash).neq("id", q.id);
      if (clash?.length) throw new Error(`${t.id}: new hash collides with ${clash[0].id}`);
      update.content_hash = hash;
      const sol = String(q.solution ?? "");
      if (!LEADING_BRACKET.test(sol)) throw new Error(`${t.id}: expected a leading "[... Kept PRIVATE / graded as grace]" bracket`);
      update.solution = sol.replace(LEADING_BRACKET, "");
    }
    console.log(`${t.id.slice(0, 8)}  ${t.placeholderKey ? `clear key ${t.placeholderKey}, rehash, ` : ""}notice "${t.note.slice(0, 50)}..."`);
    if (!APPLY) continue;

    if (t.placeholderKey) {
      const { error: ke } = await db.from("options").update({ is_correct: false }).eq("question_id", t.id).eq("label", t.placeholderKey);
      if (ke) throw new Error(`${t.id}: ${ke.message}`);
    }
    const { data: w, error: ue } = await db
      .from("questions")
      .update(update)
      .eq("id", t.id)
      .eq("content_hash", q.content_hash)
      .is("cancelled_note", null)
      .select("id");
    if (ue) throw new Error(`${t.id}: ${ue.message}`);
    if (w?.length !== 1) throw new Error(`${t.id}: row changed under us (key may already be cleared; re-run)`);
    done++;
  }
  console.log(`${APPLY ? "APPLIED" : "DRY RUN"}: ${TARGETS.length} targets${APPLY ? `, ${done} cancelled` : ""}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
