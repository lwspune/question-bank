/**
 * Fingerprint the published mock snapshots, per exam family.
 *
 *   npx tsx scripts/mocks/fingerprint.ts
 *
 * The acceptance criterion for any change to the shared build path is that the
 * ALREADY-SHIPPED mocks come back byte-identical. Baselines captured before the
 * CDS work live in scripts/mocks/baseline/pre-cds-fingerprints.md; this prints
 * the current values in the same shape so the two can be diffed.
 *
 * A matching fingerprint alone is NOT proof the build ran — it is also what you
 * get if nothing was written. Pair it with the `newest write` column, which is
 * the witness that the rows were genuinely re-derived.
 *
 * Read-only.
 */
import { join } from "node:path";
import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const md5 = (s: string) => createHash("md5").update(s).digest("hex");

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await db
    .from("mock_tests")
    .select(
      "slug, paper_code, title, duration_secs, marking, sections, questions, total_questions, total_marks, status, updated_at"
    )
    .order("slug");
  if (error) throw new Error(`mock_tests: ${error.message}`);

  const byFamily = new Map<string, { repr: string[]; newest: string }>();
  for (const m of (data ?? []) as Record<string, unknown>[]) {
    const slug = m.slug as string;
    const fam = slug.split("-")[0];
    const repr =
      [
        slug,
        m.paper_code,
        m.title,
        m.duration_secs,
        JSON.stringify(m.marking),
        JSON.stringify(m.sections),
        m.total_questions,
        m.total_marks,
        m.status,
        md5(JSON.stringify(m.questions)),
      ].join("~");
    const cur = byFamily.get(fam) ?? { repr: [], newest: "" };
    cur.repr.push(repr);
    const u = String(m.updated_at ?? "");
    if (u > cur.newest) cur.newest = u;
    byFamily.set(fam, cur);
  }

  console.log("family  rows  fingerprint                        newest write");
  for (const [fam, v] of [...byFamily.entries()].sort()) {
    // Sorted so the fingerprint cannot depend on row arrival order.
    const fp = md5(v.repr.sort().join("|"));
    console.log(`${fam.padEnd(7)} ${String(v.repr.length).padStart(4)}  ${fp}  ${v.newest}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
