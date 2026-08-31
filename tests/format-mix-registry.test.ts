/**
 * PROD-CONTRACT: `EXAM_REGISTRY.mixedFormats` vs the live bank.
 *
 * The `/browse` format control is rendered from a hand-declared registry flag
 * rather than a live count, because the live count cannot be served: grouping
 * (exam, kind, format) over the bank is a 49,372-row seq scan (~4.4s) against
 * the anon role's 3s statement_timeout, and it timed out intermittently in a
 * production build. See src/lib/questions/formatMix.ts for the full measurement.
 *
 * A hand-declared fact needs a standing probe or it rots — the same bargain
 * `src/lib/relevance/config.ts` makes for the syllabus-fit reviewed scope. This
 * is that probe. It runs as service_role (no statement_timeout), so the query
 * that is too slow to serve is perfectly affordable once per gate run.
 *
 * It fails in BOTH directions on purpose:
 *   - flag missing → a new board/JEE-style ingest landed and the control is
 *     silently absent on an exam that now needs it.
 *   - flag stale   → an exam's non-MCQ rows were withdrawn and the control is
 *     now inert noise.
 *
 * Neither failure can strand a viewer (shouldShowFormatFilter pins the control
 * on whenever the filter is active), so this is a correctness gate, not a
 * safety one — which is why it is a test rather than a runtime guard.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { retryOnStatementTimeout } from "./helpers/retryTimeout";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("EXAM_REGISTRY.mixedFormats vs the live bank", () => {
  let client: SupabaseClient;
  /** exam name → the distinct PUBLIC question_formats it actually holds. */
  const actual = new Map<string, Set<string>>();

  beforeAll(async () => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    // Both beforeAll reads are retried on 57014 — a host memory stall
    // cancels healthy queries; see tests/helpers/retryTimeout.ts.
    const { data: exams, error: examErr } = await retryOnStatementTimeout(() =>
      client.from("exams").select("id, name")
    );
    expect(examErr).toBeNull();
    const nameById = new Map(
      (exams ?? []).map((e) => [e.id as string, e.name as string])
    );

    // The same aggregate the runtime cannot afford — fine here, and grouped in
    // SQL rather than derived from a row payload (the PostgREST 1000-row
    // truncation trap has bitten this codebase five times).
    // 4 attempts x 5s-spread backoff (~60s of patience, inside the 90s hook
    // budget): this is the one deliberately-heavy scan in the suite, and on
    // first contact a stall outlasted the default 3-attempt/30s window.
    const { data, error } = await retryOnStatementTimeout(
      () => client.rpc("get_format_mix"),
      4,
      5000
    );
    expect(error).toBeNull();
    type Row = { exam_id: string; question_format: string; q_count: number };
    for (const row of (data ?? []) as Row[]) {
      if (row.q_count <= 0) continue;
      const name = nameById.get(row.exam_id);
      if (!name) continue;
      const set = actual.get(name) ?? new Set<string>();
      set.add(row.question_format);
      actual.set(name, set);
    }
    expect(actual.size).toBeGreaterThan(0);
  });

  it("every registry exam declares mixedFormats iff its corpus is mixed", () => {
    const wrong: string[] = [];
    for (const exam of EXAM_REGISTRY) {
      // An exam with no PUBLIC rows (CDS is entirely PRIVATE) has nothing to
      // filter; absent-and-unflagged is the correct state, so skip it rather
      // than demand a flag it cannot earn.
      const formats = actual.get(exam.examName);
      if (!formats || formats.size === 0) {
        if (exam.mixedFormats) {
          wrong.push(
            `${exam.slug}: flagged mixedFormats but has no PUBLIC questions`
          );
        }
        continue;
      }
      const isMixed = formats.size > 1;
      if (isMixed !== (exam.mixedFormats === true)) {
        wrong.push(
          `${exam.slug}: registry says ${exam.mixedFormats === true} but the bank holds ` +
            `${[...formats].sort().join(" + ")} — ` +
            (isMixed
              ? "add `mixedFormats: true`"
              : "remove `mixedFormats`")
        );
      }
    }
    expect(wrong, wrong.join("\n")).toEqual([]);
  });

  it("anon cannot execute get_format_mix (migration 0079)", async () => {
    // Left executable by anon it is a 3-second scan any anonymous caller can
    // trigger at will and which cannot succeed inside their statement_timeout.
    // The grant, not RLS, is the boundary here — so assert the grant.
    const anon = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    const { error } = await anon.rpc("get_format_mix");
    expect(error).not.toBeNull();
    // PostgREST reports a revoked function as absent from its schema cache
    // (PGRST202) or as a permission denial (42501) depending on version.
    // Either is the contract; a 57014 timeout would mean it still ran.
    expect(["PGRST202", "42501"]).toContain(error!.code);
  });
});
