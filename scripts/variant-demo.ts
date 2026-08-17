/**
 * SPIKE / THROWAWAY — paper variants (Set A/B) proof-of-concept.
 *
 * Builds a real 25-question NDA Maths paper from the live bank in two variants
 * plus the canonical nda-tracker tagged sheet, using the SHIPPED builders
 * (buildQuestionPaper / buildAnswerKey / buildTagRows) with options permuted
 * before they reach the builder — exactly what the product change would do
 * internally. No product file is modified.
 *
 * Run: npx tsx scripts/variant-demo.ts
 * Out: generated-papers/variant-demo/
 */
import { join } from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import { queryQuestionsByIds, type QuestionRow } from "../src/lib/questions/query";
import { buildQuestionPaper, buildAnswerKey } from "../src/lib/export/docxBuilder";
import { buildTagRows, tagRowsToAoa } from "../src/lib/export/tagsSheet";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

// ── The two option-safety rules ────────────────────────────────
// PIN: self-contained + positional ("None of the above"). Stays where it is;
//      the other positions shuffle around it. Meaning is preserved.
const PIN_RE = /\b(all|none)\s+of\s+(the\s+)?(above|these|following)\b/i;
// EXCLUDE: references another OPTION by parenthesised letter ("Both (A) and (C)").
//      Shuffling would repoint the reference, so the whole question stays fixed.
//      NOTE: bare "A and B only" is NOT this — in NDA papers A/B/C there are
//      STATEMENT labels defined in the stem, which shuffling does not touch.
const OPTION_REF_RE = /\b(both|only|and|or)\s*\(\s*[a-d]\s*\)/i;

const LABELS = ["A", "B", "C", "D"] as const;
type VariantLabel = "A" | "B" | "C" | "D";

/** Deterministic Fisher-Yates seeded from sha256(seed) — no Math.random. */
function seededOrder(seed: string, items: number[]): number[] {
  const out = [...items];
  let bytes = createHash("sha256").update(seed).digest();
  let bi = 0;
  const next = () => {
    if (bi >= bytes.length) { bytes = createHash("sha256").update(bytes).digest(); bi = 0; }
    return bytes[bi++];
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = next() % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

type Verdict = { mode: "shuffled" | "pinned" | "excluded"; note: string };

function applyVariant(q: QuestionRow, label: VariantLabel): { q: QuestionRow; verdict: Verdict } {
  const opts = [...q.options].sort((a, b) => a.label.localeCompare(b.label));
  const base = { ...q, options: opts };
  if (label === "A") return { q: base, verdict: { mode: "shuffled", note: "identity (canonical)" } };

  if (opts.some((o) => OPTION_REF_RE.test(o.text ?? ""))) {
    return { q: base, verdict: { mode: "excluded", note: "option references another option by letter" } };
  }

  const pinned = new Set(opts.map((o, i) => (PIN_RE.test(o.text ?? "") ? i : -1)).filter((i) => i >= 0));
  const free = opts.map((_, i) => i).filter((i) => !pinned.has(i));
  const shuffled = seededOrder(`${q.id}|${label}`, free);

  const sourceFor: number[] = [];
  let k = 0;
  for (let i = 0; i < opts.length; i++) sourceFor[i] = pinned.has(i) ? i : shuffled[k++];

  const options = sourceFor.map((src, i) => ({ ...opts[src], label: LABELS[i] }));
  return {
    q: { ...q, options },
    verdict: pinned.size
      ? { mode: "pinned", note: `pinned ${[...pinned].map((i) => LABELS[i]).join(",")} ("${opts[[...pinned][0]].text}")` }
      : { mode: "shuffled", note: "" },
  };
}

const IDS = [
  "771d677e-1b0f-4f27-ac56-c30f03b13e41", // "None of the above" → PIN demo
  "21054ccd-9ef0-44c3-b1fd-5f5030722493", // "Both A and B are null matrices" → A/B are MATRICES, safe
  "51893d4a-03e1-4125-8ac5-28b63f815359", // "A and B only" → statement labels, safe
  "5c62111a-5b45-4b42-a863-121a30157fe8",
  "5cfcaaf8-fb68-4f55-b6c4-97f259d6365b",
  "7f617a37-dd60-4a33-971d-5ab3931fc0e4",
  "0022099b-9399-4c08-ab2d-ae8a377a9c5d", "018b0cb6-7902-487c-afda-c697c548ae9b",
  "018d6a2d-bf6f-452c-bc9b-201e3629d94c", "02adb29f-e764-4688-a0fe-2a53f6ed9ba3",
  "04473168-1f59-494a-b8f8-5d42cc633f16", "05630201-75ea-494a-8f24-f693334484f5",
  "07f23f35-1362-4e09-8f37-119677bf123e", "097e9b0f-fea6-439d-ae70-2ab5ee1594a3",
  "0b464bdf-ecab-427b-b86d-e23725d05182", "0d866fc3-662f-41ff-a8b4-f6a9089544e8",
  "0e739a8f-d821-4a34-8e28-6a011eeb1584", "12445ecd-4d68-4347-88e9-0fbc530795c8",
  "1320aa34-ccf4-412d-bf4e-cb681cc1d498", "13717c35-3372-413e-8ce6-0ca5e3502c22",
  "13739208-9703-4455-9ef9-d543cbdd3ffc", "18f89674-848b-4bae-903d-a5a7a870544f",
  "1a3ad549-c690-435f-b841-e66f03f06394", "1adf2a40-730c-4d87-b7c6-76388b47e9e5",
  "1c765021-28f3-46f7-835b-3992e3d9e65e",
];

const TITLE = "LWS Pune — NDA Mathematics — Matrices & Determinants";

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const fetched = await queryQuestionsByIds(db, IDS);
  // queryQuestionsByIds does not guarantee input order — restore it.
  const byId = new Map(fetched.map((q) => [q.id, q]));
  const questions = IDS.map((id) => byId.get(id)).filter(Boolean) as QuestionRow[];
  console.log(`fetched ${questions.length}/${IDS.length} questions\n`);

  const outDir = join(process.cwd(), "generated-papers", "variant-demo");
  mkdirSync(outDir, { recursive: true });

  const variants: VariantLabel[] = ["A", "B"];
  const keyGrid: Record<string, string[]> = {};

  for (const v of variants) {
    const applied = questions.map((q) => applyVariant(q, v));
    const qs = applied.map((a) => a.q);
    keyGrid[v] = qs.map((q) => q.options.find((o) => o.isCorrect)?.label ?? "?");

    const paper = await buildQuestionPaper({ title: `${TITLE}  —  SET ${v}`, questions: qs });
    writeFileSync(join(outDir, `Paper_SET_${v}.docx`), paper);
    const key = await buildAnswerKey({
      title: `${TITLE}  —  SET ${v}`, questions: qs, includeSolutions: true,
    });
    writeFileSync(join(outDir, `AnswerKey_SET_${v}.docx`), key);

    if (v === "B") {
      console.log("Q   canonical→SetB   mode       note");
      applied.forEach((a, i) => {
        const canon = questions[i].options.find((o) => o.isCorrect)!;
        const now = a.q.options.find((o) => o.isCorrect)!;
        const flag = a.verdict.mode === "shuffled" ? "" : "  ←";
        console.log(
          `${String(i + 1).padStart(2)}  ${canon.label} → ${now.label}          ` +
          `${a.verdict.mode.padEnd(9)}  ${a.verdict.note}${flag}`
        );
        // CORRECTNESS ASSERTION: the correct option's TEXT must be unchanged.
        if (canon.text !== now.text) throw new Error(`Q${i + 1}: correct option TEXT changed!`);
      });
    }
  }

  // ── Canonical tagged sheet (variant-independent, shipped builder verbatim) ──
  const rows = buildTagRows(questions);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(tagRowsToAoa(rows)), "Tags");
  XLSX.writeFile(wb, join(outDir, "Tags_CANONICAL.xlsx"));

  console.log("\nMaster key grid");
  console.log("Q :  " + keyGrid.A.map((_, i) => String(i + 1).padStart(2)).join(" "));
  for (const v of variants) console.log(`${v} :  ` + keyGrid[v].map((l) => l.padStart(2)).join(" "));
  const moved = keyGrid.A.filter((l, i) => l !== keyGrid.B[i]).length;
  console.log(`\nanswer letter moved on ${moved}/${questions.length} questions`);
  console.log(`\nwrote → ${outDir}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
