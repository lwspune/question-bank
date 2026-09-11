/**
 * Ingest an nda-tracker item-statistics export into `question_item_stats`.
 *
 *   npx tsx scripts/itemstats/ingest-tracker.ts --file=../nda-tracker/item-stats.json
 *   npx tsx scripts/itemstats/ingest-tracker.ts --file=... --apply
 *
 * Produced by `node item_stats.js --out=...` in the tracker repo. A FILE, not an
 * endpoint: the tracker sits at 12/12 Vercel Hobby functions, so the contract is
 * a JSON handoff (ITEM_STATS.md).
 *
 * REFUSES A POOLED EXPORT. The payload must declare
 * `grain: "question-per-exam-record"`. That is the load-bearing half of the
 * contract — one row per (question, sitting) — because a pooled figure cannot be
 * un-pooled when a sitting turns out to be bad, an institute leaves, or a key
 * is found wrong. Accepting a pooled file silently would destroy exactly the
 * property the table exists for.
 *
 * `measured_content_hash` is read from the bank AT INGEST TIME, not supplied by
 * the tracker, which cannot know it. That makes it "the question as it was when
 * we recorded this", which is the best available approximation and the same one
 * the vault rollup makes. Any later edit correctly makes the row stale.
 *
 * An id that resolves to no bank row is REPORTED, never dropped silently: a stem
 * repair here is a delete-and-re-commit (content_hash covers the stem), which
 * mints a fresh uuid, so a tracker exam can hold a dead id through nobody's
 * error.
 */
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { chunk, IN_CHUNK } from "./db";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const EXPECTED_GRAIN = "question-per-exam-record";

type ExportRow = {
  questionId: string;
  examId: string;
  examName: string | null;
  subject: string | null;
  cohort: string | null;
  seen: number;
  attempted: number;
  correct: number;
  choiceCounts: Record<string, number>;
  discTopCorrect: number | null;
  discTopN: number | null;
  discBottomCorrect: number | null;
  discBottomN: number | null;
  keyAtMeasurement: "A" | "B" | "C" | "D" | null;
  verdictMismatch?: number | null;
  measuredAt: string | null;
};

function flag(name: string): string | null {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const file = flag("file");
  if (!file) throw new Error("pass --file=<path to the tracker export>");

  const payload = JSON.parse(readFileSync(file, "utf8")) as {
    generatedAt?: string;
    source?: string;
    grain?: string;
    rows?: ExportRow[];
    conflicts?: { questionId: string }[];
  };

  if (payload.grain !== EXPECTED_GRAIN) {
    throw new Error(
      `refusing this export: grain is ${JSON.stringify(payload.grain)}, expected ${JSON.stringify(EXPECTED_GRAIN)}.\n` +
        "A pooled export cannot be un-pooled. See ITEM_STATS.md decision 6."
    );
  }
  const rows = payload.rows ?? [];
  if (rows.length === 0) throw new Error("export carries no rows");

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Whose cohort this is. Resolved from `tracker_sync_targets` — the table that
  // already says which org has a tracker — rather than defaulted, because a
  // wrong org would file one institute's students under another.
  const orgName = flag("org");
  const { data: targets } = await db
    .from("tracker_sync_targets")
    .select("org_id, organizations(name)");
  const rowsT = (targets ?? []) as unknown as {
    org_id: string;
    organizations: { name: string } | { name: string }[] | null;
  }[];
  const named = rowsT.map((t) => ({
    org_id: t.org_id,
    name: Array.isArray(t.organizations)
      ? (t.organizations[0]?.name ?? "")
      : (t.organizations?.name ?? ""),
  }));
  const matches = orgName ? named.filter((t) => t.name === orgName) : named;
  if (matches.length !== 1) {
    throw new Error(
      `need exactly one org, got ${matches.length}` +
        (named.length ? ` (${named.map((t) => t.name).join(", ")})` : "") +
        ". Pass --org=<name>."
    );
  }
  const orgId = matches[0].org_id;

  // The live hash per question. Also tells us which ids no longer resolve.
  const ids = [...new Set(rows.map((r) => r.questionId))];
  const hashById = new Map<string, string>();
  for (const part of chunk(ids, IN_CHUNK)) {
    const { data, error } = await db
      .from("questions")
      .select("id, content_hash")
      .in("id", part);
    if (error) throw new Error(`hash read failed: ${JSON.stringify(error)}`);
    for (const q of (data ?? []) as { id: string; content_hash: string }[]) {
      hashById.set(q.id, q.content_hash);
    }
  }
  const missing = ids.filter((id) => !hashById.has(id));

  const toWrite = rows
    .filter((r) => hashById.has(r.questionId))
    .map((r) => {
      const counts: Record<string, number> = {};
      for (const label of ["A", "B", "C", "D"]) {
        const n = Number(r.choiceCounts?.[label] ?? 0);
        if (n > 0) counts[label] = n;
      }
      return {
        question_id: r.questionId,
        source: "tracker" as const,
        source_ref: r.examId,
        org_id: orgId,
        cohort_label: r.cohort,
        seen: r.seen,
        attempted: r.attempted,
        correct: r.correct,
        // The export gives seen and attempted; the column pair must satisfy
        // `seen = attempted + skipped`, which the DB asserts.
        skipped: r.seen - r.attempted,
        choice_counts: counts,
        disc_top_correct: r.discTopCorrect,
        disc_top_n: r.discTopN,
        disc_bottom_correct: r.discBottomCorrect,
        disc_bottom_n: r.discBottomN,
        key_at_measurement: r.keyAtMeasurement,
        // An export that does not carry the field has NOT measured it; `?? null`
        // rather than `?? 0`, which would claim "compared, none found".
        verdict_mismatch: r.verdictMismatch ?? null,
        measured_content_hash: hashById.get(r.questionId)!,
        measured_at: r.measuredAt
          ? new Date(`${r.measuredAt}T00:00:00Z`).toISOString()
          : (payload.generatedAt ?? new Date().toISOString()),
      };
    });

  console.log(
    [
      `export generated   ${payload.generatedAt ?? "?"} (${payload.source ?? "?"})`,
      `rows in file       ${rows.length}`,
      `distinct questions ${ids.length}`,
      `  resolve in bank  ${ids.length - missing.length}`,
      `  MISSING          ${missing.length}${missing.length ? "  (repaired stems mint a new uuid — or another org's PRIVATE rows)" : ""}`,
      `org                ${matches[0].name}`,
      `rows to write      ${toWrite.length}`,
      `key conflicts      ${(payload.conflicts ?? []).length}`,
    ].join("\n")
  );
  for (const id of missing.slice(0, 10)) console.log(`  missing: ${id}`);

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }

  for (const batch of chunk(toWrite, 500)) {
    const { error } = await db
      .from("question_item_stats")
      .upsert(batch, { onConflict: "question_id,source,source_ref" });
    if (error) throw new Error(`upsert failed: ${JSON.stringify(error)}`);
  }
  console.log(`\nwrote ${toWrite.length} rows.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
