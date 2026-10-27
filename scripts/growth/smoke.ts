/**
 * Drive /dashboard/growth's OWN loader + the pure core against live data.
 *
 *   npm run growth:smoke
 *
 * The page is superadmin-gated and dynamic, so `next build` never renders it.
 * This runs the loader the page calls, every view and verdict, and THROWS on
 * an internal contradiction: a subset count larger than its superset is a
 * query bug that a type-check cannot see, because the numbers are all integers.
 *
 * It does NOT prove the page lays out. That is owed to a browser.
 */
import { join } from "node:path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(`INVARIANT VIOLATED — ${msg}`);
}

async function main() {
  const { createClient } = await import("@supabase/supabase-js");
  const { fetchGrowthSnapshot, GROWTH_WEEKS } = await import("@/lib/growth/query");
  const { EXPERIMENTS, READINGS, checkOn } = await import("@/lib/growth/registry");
  const s = await import("@/lib/growth/snapshot");

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const raw = await fetchGrowthSnapshot(db);
  const today = s.todayIst();

  assert(raw.weeks.length === GROWTH_WEEKS, `weeks: ${raw.weeks.length} rows, asked for ${GROWTH_WEEKS}`);
  assert(raw.signupWeeks.length === GROWTH_WEEKS, `signupWeeks: ${raw.signupWeeks.length} rows`);
  assert(raw.emailDays.length === 14, `emailDays: ${raw.emailDays.length} rows, expected 14`);
  for (const w of raw.weeks) assert(w.learnersTwoPlus <= w.learners, `week ${w.weekStart}: 2+ days > learners`);
  for (const w of raw.signupWeeks) {
    assert(w.signalled <= w.signups, `week ${w.weekStart}: signalled > signups`);
    assert(w.matured <= w.signups, `week ${w.weekStart}: matured > signups`);
    assert(w.returned7 <= w.matured, `week ${w.weekStart}: returned > matured`);
  }
  for (const a of raw.arms) {
    assert(a.matured <= a.onboarded, `${a.arm}: matured > onboarded`);
    assert(a.returned7 <= a.matured && a.twoPlus <= a.matured, `${a.arm}: returned/2+ > matured`);
    assert(a.firstPractice + a.firstMock <= a.onboarded, `${a.arm}: first acts > onboarded`);
  }
  assert(raw.chapterShare.signalled <= raw.chapterShare.signups, "chapter share: signalled > signups");
  assert(raw.chapterTests.length === GROWTH_WEEKS, `chapterTests: ${raw.chapterTests.length} rows`);
  for (const w of raw.chapterTests) {
    assert(w.chapterStudents <= w.chapterSittings && w.fullStudents <= w.fullSittings, `week ${w.weekStart}: students > sittings`);
    assert(w.chapterAnswered <= w.chapterQuestions && w.fullAnswered <= w.fullQuestions, `week ${w.weekStart}: answered > offered`);
    assert(w.anyStudents <= w.chapterStudents + w.fullStudents, `week ${w.weekStart}: any > chapter + full`);
    assert(w.anyStudents >= Math.max(w.chapterStudents, w.fullStudents), `week ${w.weekStart}: any < either`);
  }

  const north = s.viewNorthStar(raw.weeks, today);
  console.log(`today (IST) ${today}`);
  console.log("north star — weekly learners on 2+ study days:");
  for (const w of north.weeks) {
    console.log(`  ${w.weekStart}  ${String(w.twoPlus).padStart(3)} of ${String(w.learners).padStart(3)}${w.partial ? "  (so far)" : ""}${w.undercounted ? "  *undercounted" : ""}`);
  }
  console.log("signups by week (last 6):");
  for (const w of raw.signupWeeks.slice(-6).map(s.viewFunnelWeek)) {
    console.log(`  ${w.weekStart}  signups ${w.signups}  did something ${w.signalRate ?? "—"}%  back ≤7d ${w.returnRate ?? "—"}% (of ${w.matured})  paid ${w.paid}`);
  }
  for (const c of raw.signupCountries.countries) {
    assert(/^[A-Z]{2}$/.test(c.country), `signup country ${JSON.stringify(c.country)} is not a two-letter code`);
    assert(c.n > 0, `signup country ${c.country}: count ${c.n}`);
  }
  assert(raw.signupCountries.unrecorded >= 0, "signup countries: negative unrecorded");
  const countries = s.viewSignupCountries(raw.signupCountries);
  console.log(`signups by country since recording began (${countries.total}):`);
  for (const r of countries.rows) console.log(`  ${r.country}  ${r.name}  ${r.n} (${r.sharePct}%)`);
  console.log(`  not recorded  ${countries.unrecorded} (${countries.unrecordedPct ?? "—"}%)`);
  // The hand-read experiments have no query: print the readings the page lists.
  const handRead = (liveSince: string, metrics: (keyof typeof READINGS)[]) =>
    `judged by hand on ${checkOn(liveSince)} | ` +
    metrics
      .map((m) => {
        const last = READINGS[m].entries.at(-1);
        return `${READINGS[m].label}: ${last ? `${last.value} on ${last.on}` : "no reading yet"}`;
      })
      .join(" | ");

  for (const e of EXPERIMENTS) {
    let line: string;
    switch (e.readout) {
      case "onboarding-arms": {
        const v = s.onboardingVerdict(raw.arms, today, e.liveSince);
        line = `${v.status} — ${v.reason} | practice-first ${JSON.stringify(v.arms["practice-first"])} | control ${JSON.stringify(v.arms["mock-first"])}`;
        break;
      }
      case "chapter-share": {
        const v = s.chapterShareVerdict(raw.chapterShare.signups, today, e.liveSince);
        line = `${v.status} — ${v.reason} (${raw.chapterShare.signalled} did something)`;
        break;
      }
      case "chapter-tests": {
        const v = s.chapterTestsVerdict(raw.chapterTests, today, e.liveSince);
        line = `${v.status} — ${v.reason} | since launch ${JSON.stringify(v.since)} | last full week students ${v.lastFullWeekStudents}`;
        break;
      }
      case "indexing": {
        const v = s.indexingView(READINGS["google-indexed"].entries);
        line = `${v.status} — ${v.reason}`;
        break;
      }
      case "email-cap": {
        const v = s.emailCapVerdict(raw.emailDays, today, e.liveSince);
        line = `${v.status} — ${v.reason} busiest ${v.busiest?.day} ${v.busiest?.total}/${v.cap}`;
        break;
      }
      case "second-page":
        line = handRead(e.liveSince, ["hello-tap-rate", "card-tap-rate"]);
        break;
      case "resource-chips":
        line = handRead(e.liveSince, ["chip-tap-rate"]);
        break;
      case "box-buy":
        line = handRead(e.liveSince, ["box-sales-per-100"]);
        break;
      case "premium-limits":
        line = handRead(e.liveSince, ["limit-sales"]);
        break;
      case "performance-starter":
        line = handRead(e.liveSince, ["starter-start-rate"]);
        break;
      case "formula-pages":
        line = handRead(e.liveSince, ["formula-indexed", "formula-signups"]);
        break;
      case "specific-offer":
        line = handRead(e.liveSince, ["specific-offer-checkout"]);
        break;
      case "paper-pages":
        line = handRead(e.liveSince, ["paper-signups", "paper-chatgpt-named"]);
        break;
      case "notes-titles":
        line = handRead(e.liveSince, ["notes-signups", "notes-chatgpt-named"]);
        break;
      case "practice-tests":
        line = handRead(e.liveSince, ["practice-tests-started", "practice-tests-answered"]);
        break;
      case "mock-together":
        line = handRead(e.liveSince, ["mock-together-sends", "mock-together-starts", "mock-together-signups"]);
        break;
      case "practice-friends":
        line = handRead(e.liveSince, ["practice-friend-sends", "practice-friend-starts", "practice-friend-signups", "practice-friend-finished-taps"]);
        break;
      case "pyq-wording":
        line = handRead(e.liveSince, ["pyq-wording-impressions"]);
        break;
      case "imat":
        line = handRead(e.liveSince, ["imat-students", "imat-page-views", "imat-foreign-share"]);
        break;
      case "v-explain":
        line = handRead(e.liveSince, ["v-explain-students", "v-explain-similar-right"]);
        break;
      case "v-plan":
        line = handRead(e.liveSince, ["v-plan-students", "v-plan-days-done"]);
        break;
      case "v-progress":
        line = handRead(e.liveSince, ["v-progress-students", "v-progress-next-step"]);
        break;
      case "self-mark":
        line = handRead(e.liveSince, ["self-mark-tap-share", "self-mark-review-fixed"]);
        break;
      case "v-strategy":
        line = handRead(e.liveSince, ["v-strategy-answers", "v-strategy-no-data"]);
        break;
      case "v-finder":
        line = handRead(e.liveSince, ["v-false-not-found", "v-clarify-turns", "v-practice-after"]);
        break;
      case "ebook-store":
        // Live counts from the ebook tables, rendered on the page (lib/ebooks/readout).
        line = "live table on the page (ebook_purchases, ebook_print_interest, ebook_downloads)";
        break;
      case "learn":
        // Live counts from the Learn tables, rendered on the page (lib/learn/readout, migration 0193).
        line = "live counts on the page (learn_experiment_readout)";
        break;
      case "pass-price":
        line = handRead(e.liveSince, ["price-weekly-revenue", "price-checkout-paid"]);
        break;
      case "answer-limit":
        line = handRead(e.liveSince, ["answer-limit-students", "answer-limit-return"]);
        break;
      case "v-reveal":
        line = handRead(e.liveSince, ["v-follow-up"]);
        break;
      case "tutor-interest":
        // Live counts from tutor_interest, rendered on the page (lib/tutor/readout).
        line = "live table on the page (tutor_interest)";
        break;
      default: {
        // A new readout must be added here; this fails the typecheck until it is.
        const unhandled: never = e.readout;
        throw new Error(`unhandled readout ${String(unhandled)}`);
      }
    }
    console.log(`experiment ${e.id}: ${line}`);
  }
  console.log("OK — every invariant held.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
