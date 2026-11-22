/**
 * The exam calendar (public.exam_sittings, migration 0281): what the /blog
 * skill uses to record a sitting's date the day its notice comes out.
 *
 *   npm run calendar                                   # report: every exam's next sitting, or none
 *   npm run calendar -- --file=<sittings.json>         # dry run: insert / update / no change per row
 *   npm run calendar -- --file=<sittings.json> --apply # write
 *   add --target=test for the test project
 *
 * The file is a JSON array of sittings:
 *   [{ "exam": "ssc-cgl", "sitting": "2027", "label": "SSC CGL 2027 (Tier I)",
 *      "date": "2027-06-10", "official": true,
 *      "source": "SSC calendar 2027-28 (12 Nov 2026)", "sourceUrl": "https://ssc.gov.in/..." }]
 * Every row is checked (lib/exam/calendarWrite, the table's CHECKs plus the
 * registry) before anything is written; one bad row writes nothing. Rows are
 * upserted by (exam, sitting); nothing is ever deleted here (a passed sitting
 * stays as history, and the daily live test fails only when an exam's LATEST
 * sitting is stale). A countdown shows a change within a day (calendarQuery's
 * cache).
 */
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { EXAM_REGISTRY } from "../../src/lib/exam/examContext";
import { daysUntilIst, nextSitting, staleExams, type SittingEntry } from "../../src/lib/exam/calendar";
import { readExamCalendar } from "../../src/lib/exam/calendarRead";
import { checkSittingInput, planCalendarWrite, sittingToRow, isCourse } from "../../src/lib/exam/calendarWrite";

function flag(name: string): string | undefined {
  const hit = process.argv.slice(2).find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return undefined;
  return hit.includes("=") ? hit.slice(hit.indexOf("=") + 1) : "true";
}

const file = flag("file");
const apply = flag("apply") === "true";
const target = flag("target") ?? "prod";

if (!["prod", "test"].includes(target) || (apply && !file)) {
  console.error("usage: npm run calendar [-- --file=<sittings.json> [--apply]] [--target=test]");
  process.exit(1);
}

config({ path: target === "test" ? ".env.test.local" : ".env.local", override: true });

function report(rows: readonly SittingEntry[], now: Date) {
  console.log(`exam calendar on ${target}: ${rows.length} sittings`);
  const none: string[] = [];
  const upcoming: SittingEntry[] = [];
  for (const e of EXAM_REGISTRY) {
    if (isCourse(e)) continue;
    const next = nextSitting(e.slug, now, rows);
    if (next) upcoming.push(next);
    else none.push(e.site === "intl" ? `${e.slug} (intl)` : e.slug);
  }
  for (const next of upcoming.sort((a, b) => a.date.localeCompare(b.date) || a.exam.localeCompare(b.exam))) {
    const tag = next.official ? "official" : "EXPECTED";
    console.log(`  ${next.exam.padEnd(30)} ${next.date}  ${String(daysUntilIst(next.date, now)).padStart(4)} days  ${tag}  ${next.label}`);
  }
  console.log(`no upcoming sitting (${none.length}): ${none.join(", ")}`);
  const stale = staleExams(rows, now);
  if (stale.length) console.log(`STALE (latest sitting over the grace period, the daily test fails): ${stale.map((s) => s.exam).join(", ")}`);
}

async function main() {
  const url = target === "test" ? process.env.TEST_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = target === "test" ? process.env.TEST_SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error(`Supabase settings missing for ${target}.`);
  const db = createClient(url, key, { auth: { persistSession: false } });
  const now = new Date();
  const existing = await readExamCalendar(db);

  if (!file) {
    report(existing, now);
    return;
  }

  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    throw new Error(`Cannot read ${file}: ${(e as Error).message}`);
  }
  if (!Array.isArray(raw) || raw.length === 0) throw new Error(`${file} must be a non-empty JSON array of sittings.`);

  const checked = raw.map((r) => checkSittingInput(r));
  const errors = checked.flatMap((c) => (c.ok ? [] : c.errors));
  if (errors.length) {
    console.error(`${errors.length} problem(s), nothing written:`);
    for (const e of errors) console.error(`  - ${e}`);
    // exitCode, not exit(): exiting right after a fetch trips a libuv assertion on Windows.
    process.exitCode = 1;
    return;
  }
  const inputs = checked.map((c) => (c.ok ? c.value : null)).filter((v): v is SittingEntry => v !== null);
  const plan = planCalendarWrite(inputs, existing);

  for (const p of plan) {
    const head = `${p.action.padEnd(6)} ${p.entry.exam} ${p.entry.sitting}  ${p.entry.date}${p.entry.official ? "" : " (expected)"}`;
    console.log(p.changes.length ? `${head}\n         ${p.changes.join("\n         ")}` : head);
    if (p.warning) console.log(`  warning: ${p.warning}`);
    if (daysUntilIst(p.entry.date, now) < 0) console.log(`  note: ${p.entry.date} has passed; no countdown will use it`);
  }
  const writes = plan.filter((p) => p.action !== "same");
  console.log(`${writes.length} to write on ${target} (${plan.length - writes.length} unchanged)`);

  if (!apply) {
    console.log("dry run: nothing written. Add --apply to save.");
    return;
  }
  if (writes.length === 0) return;

  const stamp = now.toISOString();
  const { error } = await db
    .from("exam_sittings")
    .upsert(writes.map((p) => ({ ...sittingToRow(p.entry), updated_at: stamp })), { onConflict: "exam,sitting" });
  if (error) throw new Error(`write: ${error.message}`);
  console.log(`saved ${writes.length}. Countdowns show it within a day.`);
  report(await readExamCalendar(db), now);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exitCode = 1;
});
