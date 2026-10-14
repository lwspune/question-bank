/**
 * CBSE Class 10 PYQ answers corrected in place (2026-10-15, the owner's decision).
 *
 *   npx tsx scripts/reviews/apply-cbse10-key-fixes-2026-10-15.ts            # dry run
 *   npx tsx scripts/reviews/apply-cbse10-key-fixes-2026-10-15.ts --apply
 *
 * 2025 31/2/3 Q19 (Assertion-Reason, wire coiled): key C -> B. The Reason,
 *   "resistance is directly proportional to resistivity", is true (R = rho l / A
 *   for a wire of given dimensions); it does not explain why coiling leaves the
 *   resistance unchanged. CBSE's scheme keys the Reason false.
 * 2025 31/4/3 Q20 (Assertion-Reason, dispersion): key B -> A. NCERT 10.4
 *   explains dispersion in the Reason's own words (red bends least, violet most,
 *   so the colours emerge along different paths). CBSE keys B.
 * 2024 30/4/2 Q31 (salary A.P., subjective): the solution now leads with the
 *   literal reading, "after 4 years of service" = four increments (a + 4d),
 *   giving Rs 13,000, and notes the scheme's a + 3d reading (Rs 13,500).
 *
 * Not changed: 2025 31/3/2 Q15 has two right options (area of cross-section
 * and direction of current); the bank holds one key, so CBSE's (C) stays and
 * the solution already says (A) is equally correct.
 *
 * SAFETY: asserts the live hash and key, and that the hash reproduces, before
 * writing; ids are kept. The source files (questions.json, topaper.json,
 * sidecars) are updated to match in the same commit, so a re-commit or
 * re-apply cannot bring the old key back.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const DATA = join(process.cwd(), "scripts/cbse-12-pyq/data");

type Fix = { paper: string; ref: string; hash: string; from?: string; to?: string };
const FIXES: Fix[] = [
  { paper: "2025-31-2-3", ref: "Q19", hash: "19fa8daadc7a9935c1e37cc16b782f2f6c1e8e29e2f890a3086681832fa40597", from: "C", to: "B" },
  { paper: "2025-31-4-3", ref: "Q20", hash: "4b676069c7bb13ce8598f37319bfcd324c592fff943cbfd9bf869ad4b7f7ecff", from: "B", to: "A" },
  { paper: "2024-30-4-2", ref: "Q31", hash: "a775df96ad8a6df3e79358178e704a02e62e98b8e58f1cd237b32f6d3df83215" },
];

/** The reviewed solution, read from the paper's sidecar so the DB and the source cannot differ. */
function sidecarSolution(paper: string, ref: string): string {
  const raw = readFileSync(join(DATA, `_sol_${paper}.txt`), "utf8").replace(/\r\n/g, "\n");
  const m = raw.split(/^===(\S+)===\n/m);
  for (let i = 1; i < m.length; i += 2) if (m[i] === ref) return m[i + 1].trim();
  throw new Error(`${paper} ${ref}: no sidecar block`);
}

const fail = (msg: string): never => {
  console.error("REFUSING: " + msg);
  process.exit(1);
};

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const plan: { id: string; fix: Fix; solution: string; hashAfter: string }[] = [];
  for (const fix of FIXES) {
    const { data, error } = await db
      .from("questions")
      .select("id, text, content_hash, question_format, options(label, text, is_correct)")
      .eq("content_hash", fix.hash);
    if (error) throw error;
    if (!data || data.length !== 1) fail(`${fix.paper} ${fix.ref}: hash resolves to ${data?.length ?? 0} rows`);
    const row = data![0] as {
      id: string; text: string; content_hash: string;
      options: { label: string; text: string; is_correct: boolean }[];
    };
    const solution = sidecarSolution(fix.paper, fix.ref);
    let hashAfter = row.content_hash;
    if (fix.from) {
      const opts = [...row.options].sort((a, b) => a.label.localeCompare(b.label));
      const key = opts.filter((o) => o.is_correct).map((o) => o.label);
      if (key.length !== 1 || key[0] !== fix.from) fail(`${fix.paper} ${fix.ref}: key is [${key}], reviewed ${fix.from}`);
      const texts = opts.map((o) => o.text);
      if (contentHash(row.text, texts, fix.from) !== row.content_hash) fail(`${fix.paper} ${fix.ref}: hash not reproducible`);
      hashAfter = contentHash(row.text, texts, fix.to!);
      const { data: clash } = await db.from("questions").select("id").eq("content_hash", hashAfter);
      if ((clash ?? []).length > 0) fail(`${fix.paper} ${fix.ref}: new hash collides`);
      if (!new RegExp(`option \\(${fix.to}\\)[^]*$`).test(solution) || /option \([A-D]\)/.test(solution.split(`option (${fix.to})`).pop()!))
        fail(`${fix.paper} ${fix.ref}: sidecar solution does not end on option (${fix.to})`);
    }
    plan.push({ id: row.id, fix, solution, hashAfter });
    console.log(
      `${fix.paper} ${fix.ref} ${row.id.slice(0, 8)}: ` +
        (fix.from ? `key ${fix.from} -> ${fix.to}, hash ${fix.hash.slice(0, 12)} -> ${hashAfter.slice(0, 12)}, ` : "") +
        `solution ${solution.length} chars`
    );
  }
  if (!APPLY) {
    console.log("DRY RUN. Re-run with --apply to write.");
    return;
  }
  for (const p of plan) {
    if (p.fix.from) {
      for (const label of [p.fix.from, p.fix.to!]) {
        const { error } = await db.from("options").update({ is_correct: label === p.fix.to }).eq("question_id", p.id).eq("label", label);
        if (error) throw error;
      }
    }
    const { error } = await db.from("questions").update({ content_hash: p.hashAfter, solution: p.solution }).eq("id", p.id);
    if (error) throw error;
    console.log(`written ${p.fix.paper} ${p.fix.ref}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
