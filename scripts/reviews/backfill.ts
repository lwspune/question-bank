/**
 * Backfill review provenance from the committed review artifacts.
 *
 *   npm run reviews:backfill              # DRY RUN — writes nothing
 *   npm run reviews:backfill -- --apply
 *   npm run reviews:backfill -- --pipeline=ncert
 *
 * Reads every `<id>.crosscheck.json` / `<id>.mcq-verify.json` under each
 * pipeline's `data` dir — the only MACHINE-READABLE record of review work done
 * before migration 0074 — and turns each row into a `question_reviews` row
 * stamped `source='backfilled'`.
 *
 * WHY ONLY THESE FILES, and never the Decisions log: a committed artifact is
 * evidence — a ref, a verdict, a derivation, written by the pass that did the
 * work. Prose re-read by an LLM is a plausible reconstruction, and the entire
 * point of this table is that a reconstruction and a record stop looking alike.
 *
 * THE FINGERPRINT CAVEAT. A backfilled row stamps the question's CURRENT
 * content_hash, because the hash as it stood at review time is unrecoverable
 * (`last_edited_at` is NULL across all 833 rows and the scripts update questions
 * without setting it, so it proves nothing). So for a backfilled row the
 * fingerprint means "as at backfill": drift AFTER this run is detected normally,
 * drift BEFORE it is undetectable by construction. The alternative — a sentinel
 * that reads stale forever — would make the report's stale section useless on
 * day one.
 *
 * ANYTHING AMBIGUOUS IS ESCALATED, NOT GUESSED. A row whose artifact verdict
 * does not map deterministically (OUR-ANSWER-WRONG), or whose blind derivation
 * disagrees with the live key, must appear in backfill-overrides.json with an
 * adjudication citing the Decisions log. An unresolved one is an ERROR that
 * blocks the write, not a row quietly dropped.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  ARTIFACT_METHOD,
  artifactRunLabel,
  overrideKey,
  resolveCrosscheckVerdict,
  resolveMcqVerdict,
  findVerdictConflicts,
  type ArtifactKind,
} from "../../src/lib/reviews/artifacts";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";
import { isReviewVerdict } from "../../src/lib/reviews/types";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const SCRIPTS = join(process.cwd(), "scripts");
const OVERRIDES_PATH = join(SCRIPTS, "reviews", "backfill-overrides.json");
const PAGE = 1000;
/**
 * Chunk size for `.in("id", [...])` — PostgREST puts the list in the URL, so a
 * few hundred uuids is the practical ceiling regardless of the 1000-row page cap.
 */
const IN_CHUNK = 200;

/**
 * artifact id -> questions.source_file, for the ref-based (crosscheck) files.
 * Both pipelines derive it from the id exactly as their own config.ts does.
 */
const SSC_SUBJECT: Record<string, string> = {
  alg: "Algebra",
  geo: "Geometry",
  sci1: "Science_I",
  sci2: "Science_II",
};

function sourceFileFor(pipeline: string, artifactId: string): string | null {
  if (pipeline === "mh-ssc-10") {
    const m = /^([a-z0-9]+)-(\d{4})$/.exec(artifactId);
    const subject = m ? SSC_SUBJECT[m[1]] : undefined;
    return m && subject ? `MH_SSC_10_${subject}_${m[2]}.pdf` : null;
  }
  if (pipeline === "ncert") {
    return `NCERT_12_Maths__${artifactId.charAt(0).toUpperCase()}${artifactId.slice(1)}.pdf`;
  }
  return null;
}

type ArtifactRow = {
  ref?: string;
  id?: string;
  verdict?: string;
  derived_answer?: string;
  note?: string;
  why?: string;
  myDerivation?: string;
};

type Artifact = {
  pipeline: string;
  artifactId: string;
  kind: ArtifactKind;
  file: string;
  rows: ArtifactRow[];
};

function loadArtifacts(pipelineFilter: string | null): Artifact[] {
  const out: Artifact[] = [];
  for (const pipeline of readdirSync(SCRIPTS)) {
    if (pipelineFilter && pipeline !== pipelineFilter) continue;
    const dataDir = join(SCRIPTS, pipeline, "data");
    if (!existsSync(dataDir)) continue;
    for (const file of readdirSync(dataDir)) {
      if (!file.endsWith(".json")) continue;
      const isCross = file.includes("crosscheck");
      const isMcq = file.includes("mcq-verify");
      if (!isCross && !isMcq) continue;
      const rows = JSON.parse(readFileSync(join(dataDir, file), "utf8")) as ArtifactRow[];
      if (!Array.isArray(rows)) continue;
      out.push({
        pipeline,
        artifactId: file.split(".")[0],
        kind: isCross ? "crosscheck" : "mcq-verify",
        file,
        rows,
      });
    }
  }
  return out;
}

type Override = { verdict: string; note: string; artifactVerdict?: string };

function loadOverrides(): Map<string, Override> {
  const raw = JSON.parse(readFileSync(OVERRIDES_PATH, "utf8")) as {
    overrides: Record<string, Override>;
  };
  // `_`-prefixed keys are documentation blocks, not adjudications.
  return new Map(Object.entries(raw.overrides ?? {}).filter(([key]) => !key.startsWith("_")));
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const pipelineFilter = args.find((a) => a.startsWith("--pipeline="))?.split("=")[1] ?? null;

  const db: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const artifacts = loadArtifacts(pipelineFilter);
  const overrides = loadOverrides();
  const usedOverrides = new Set<string>();

  console.log(`\nartifacts: ${artifacts.length} files, ${artifacts.reduce((n, a) => n + a.rows.length, 0)} rows\n`);

  // ---- resolve refs -> question ids (ref-based artifacts) ----
  const neededSourceFiles = new Set<string>();
  const errors: string[] = [];
  for (const a of artifacts) {
    if (a.kind !== "crosscheck") continue;
    const sf = sourceFileFor(a.pipeline, a.artifactId);
    if (!sf) errors.push(`${a.pipeline}/${a.file}: no source_file mapping for id "${a.artifactId}"`);
    else neededSourceFiles.add(sf);
  }

  const byRef = new Map<string, { id: string; content_hash: string }>();
  for (const sf of neededSourceFiles) {
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await db
        .from("questions")
        .select("id, question_number, content_hash")
        .eq("source_file", sf)
        .range(from, from + PAGE - 1);
      if (error) throw error;
      for (const q of data ?? []) {
        byRef.set(`${sf}||${q.question_number}`, {
          id: q.id as string,
          content_hash: q.content_hash as string,
        });
      }
      if ((data ?? []).length < PAGE) break;
    }
  }

  // ---- resolve direct ids (mcq-verify) + their live key ----
  const directIds = artifacts
    .filter((a) => a.kind === "mcq-verify")
    .flatMap((a) => a.rows.map((r) => r.id))
    .filter((id): id is string => typeof id === "string");

  const liveById = new Map<string, { content_hash: string; correct: string | null }>();
  for (let i = 0; i < directIds.length; i += IN_CHUNK) {
    const { data, error } = await db
      .from("questions")
      .select("id, content_hash, options(label, is_correct)")
      .in("id", directIds.slice(i, i + IN_CHUNK));
    if (error) throw error;
    for (const q of data ?? []) {
      const opts = (q.options ?? []) as { label: string; is_correct: boolean }[];
      liveById.set(q.id as string, {
        content_hash: q.content_hash as string,
        correct: opts.find((o) => o.is_correct)?.label ?? null,
      });
    }
  }

  // ---- build review inputs ----
  const inputs: ReviewInput[] = [];
  const perFile: string[] = [];
  const unresolved: string[] = [];
  // Parallel record of (question, run, verdict, ref) so an intra-run verdict
  // disagreement can be caught BEFORE the dedupe constraint silently picks one.
  const conflictProbe: { questionId: string; runLabel: string; verdict: string; ref: string }[] = [];

  for (const a of artifacts) {
    const runLabel = artifactRunLabel(a.pipeline, a.artifactId, a.kind);
    const method = ARTIFACT_METHOD[a.kind];
    const sf = a.kind === "crosscheck" ? sourceFileFor(a.pipeline, a.artifactId) : null;
    let built = 0;

    for (const row of a.rows) {
      const ref = row.ref ?? row.id ?? "(no ref)";
      const key = overrideKey(a.pipeline, a.artifactId, ref);

      // 1. resolve the question
      let questionId: string | null = null;
      let hash: string | null = null;
      let liveCorrect: string | null = null;
      if (a.kind === "crosscheck") {
        const hit = sf ? byRef.get(`${sf}||${row.ref}`) : undefined;
        if (hit) ({ id: questionId, content_hash: hash } = hit);
      } else if (row.id) {
        const hit = liveById.get(row.id);
        if (hit) {
          questionId = row.id;
          hash = hit.content_hash;
          liveCorrect = hit.correct;
        }
      }
      if (!questionId || !hash) {
        unresolved.push(`${a.pipeline}/${a.artifactId} ref="${ref}"`);
        continue;
      }

      // 2. resolve the verdict — override first, then the deterministic map
      const override = overrides.get(key);
      let verdict: string | null = null;
      let note: string;
      if (override) {
        usedOverrides.add(key);
        if (!isReviewVerdict(override.verdict)) {
          errors.push(`override ${key}: unknown verdict "${override.verdict}"`);
          continue;
        }
        verdict = override.verdict;
        note = override.note;
      } else {
        const resolution =
          a.kind === "crosscheck"
            ? resolveCrosscheckVerdict(row.verdict ?? "")
            : resolveMcqVerdict({ derivedAnswer: row.derived_answer, liveCorrectLabel: liveCorrect });
        if (resolution.kind === "verdict") {
          verdict = resolution.verdict;
          const detail = (row.note ?? row.why ?? row.myDerivation ?? "").trim();
          note =
            `[Backfilled from ${a.pipeline}/${a.file}] artifact verdict: ` +
            `${row.verdict ?? `derived ${row.derived_answer}`}` +
            (detail ? ` — ${detail}` : "");
        } else if (resolution.kind === "needs_override") {
          errors.push(
            `NEEDS ADJUDICATION: ${key} (${resolution.reason ?? row.verdict}) — ` +
              `add it to scripts/reviews/backfill-overrides.json`
          );
          continue;
        } else {
          errors.push(`UNKNOWN VERDICT "${resolution.raw}" at ${key}`);
          continue;
        }
      }

      inputs.push({
        questionId,
        reviewedContentHash: hash,
        method,
        verdict: verdict!,
        runLabel,
        source: "backfilled",
        note: note.slice(0, 2000),
      });
      conflictProbe.push({ questionId, runLabel, verdict: verdict!, ref });
      built++;
    }
    perFile.push(`  ${`${a.pipeline}/${a.file}`.padEnd(56)} ${String(built).padStart(4)}/${String(a.rows.length).padStart(4)}`);
  }

  console.log(perFile.join("\n"));

  // stale override entries must fail loudly rather than rot
  for (const key of overrides.keys()) {
    if (!usedOverrides.has(key)) errors.push(`STALE OVERRIDE (matched nothing): ${key}`);
  }

  // Two artifact rows describing one question in one run with DIFFERENT verdicts
  // would collapse under the dedupe constraint, letting file order decide. That
  // is a disagreement to adjudicate, never to resolve by accident.
  for (const c of findVerdictConflicts(conflictProbe)) {
    errors.push(
      `VERDICT CONFLICT within ${c.runLabel}: ref "${c.ref}" resolves to ` +
        `${c.verdicts.join(" vs ")} — adjudicate it in backfill-overrides.json`
    );
  }

  const byVerdict = new Map<string, number>();
  for (const i of inputs) byVerdict.set(i.verdict as string, (byVerdict.get(i.verdict as string) ?? 0) + 1);

  console.log(`\n--- SUMMARY ---`);
  console.log(`  rows to write : ${inputs.length}`);
  console.log(`  distinct qs   : ${new Set(inputs.map((i) => i.questionId)).size}`);
  for (const [v, n] of [...byVerdict.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`    ${String(n).padStart(4)}  ${v}`);
  }
  console.log(`  overrides used: ${usedOverrides.size}/${overrides.size}`);
  if (unresolved.length) {
    console.log(`\n  ⚠ UNRESOLVED (${unresolved.length}):`);
    for (const u of unresolved.slice(0, 20)) console.log(`      ${u}`);
  }

  if (errors.length) {
    console.log(`\n✖ ${errors.length} BLOCKING ERROR(S) — nothing written:\n`);
    for (const e of errors) console.log(`   ${e}`);
    process.exit(1);
  }

  if (!apply) {
    console.log(`\n(dry run — nothing written. re-run with --apply)\n`);
    return;
  }

  const result = await recordReviews(db, inputs);
  console.log(`\n${formatRecordResult(result, "backfill")}\n`);
  if (result.error) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
