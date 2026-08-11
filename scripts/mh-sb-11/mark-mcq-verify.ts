/**
 * Compute `matches_current` for a chapter's mcq-verify file (runbook step 4).
 *
 *   npx tsx scripts/mh-sb-11/mark-mcq-verify.ts <chapterId>          # report
 *   npx tsx scripts/mh-sb-11/mark-mcq-verify.ts <chapterId> --write  # patch the file
 *
 * The verifying agent re-derives BLIND (dump-mcq.ts omits is_correct), so it
 * cannot self-report whether it agrees with the committed key — and it must not,
 * or the check stops being independent. This does the diff here: read each row's
 * committed correct option, compare to the agent's derived_answer, and stamp
 * `matches_current`. apply-solutions.ts then flags every false LOUD for a manual
 * re-key (it never auto-re-keys — that needs a human adjudication).
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, requireChapter } from "./config";
import { recordMcqVerifyReviews } from "../../src/lib/reviews/emit";
import { formatRecordResult } from "../../src/lib/reviews/service";

type VerifyRow = {
  id: string;
  ref: string;
  derived_answer: string | null;
  solution?: string;
  matches_current?: boolean;
};

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const id = process.argv[2];
  const write = process.argv.includes("--write");
  requireChapter(id);

  const files = readdirSync(DATA).filter((f) => f.startsWith(`${id}.`) && f.endsWith(".mcq-verify.json"));
  if (!files.length) throw new Error(`no ${id}.*.mcq-verify.json in ${DATA}`);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let mismatches = 0;
  let nulls = 0;
  // Every row we stamp, so an agreeing derivation can be recorded as review
  // provenance (0074) rather than staying a console line.
  const verified: { id: string; ref: string; derived_answer: string | null; matches_current?: boolean }[] = [];
  for (const f of files) {
    const path = join(DATA, f);
    const rows: VerifyRow[] = JSON.parse(readFileSync(path, "utf8"));
    for (const r of rows) {
      const { data, error } = await db.from("options").select("label, is_correct").eq("question_id", r.id);
      if (error) throw error;
      const current = (data ?? []).find((o: any) => o.is_correct)?.label ?? null;
      if (!r.derived_answer) {
        nulls++;
        r.matches_current = false;
        console.log(`  ${r.ref}: verifier returned NULL (committed key ${current}) — needs manual adjudication`);
        continue;
      }
      r.matches_current = current === r.derived_answer;
      if (!r.matches_current) {
        mismatches++;
        console.log(`  ${r.ref}: MISMATCH — committed ${current}, verifier derived ${r.derived_answer}`);
      }
    }
    verified.push(...rows);
    if (write) {
      writeFileSync(path, JSON.stringify(rows, null, 2), "utf-8");
      console.log(`patched ${f} (${rows.length} rows)`);
    }
  }
  if (write) {
    // Only agreeing rows are recorded; a MISMATCH is a flag awaiting human
    // adjudication, not a verdict (same rule as the grounding HELD queue).
    const result = await recordMcqVerifyReviews(db, {
      pipeline: "mh-sb-11",
      artifactId: id,
      rows: verified,
    });
    console.log(formatRecordResult(result, "review provenance"));
  }

  console.log(
    `\n${mismatches} mismatch(es), ${nulls} null(s).` +
      (mismatches || nulls ? " Adjudicate each against the source BEFORE flipping PUBLIC." : " Independent derivation agrees with every committed key.")
  );
  if (!write) console.log("[report-only] pass --write to stamp matches_current.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
