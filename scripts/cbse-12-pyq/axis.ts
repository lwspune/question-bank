/**
 * Print the LIVE chapter → subtopic axis for a subject, ready to paste into a
 * transcription agent's prompt.
 *
 *   npx tsx scripts/cbse-12-pyq/axis.ts --subject=physics
 *   npx tsx scripts/cbse-12-pyq/axis.ts --subject=chemistry --check
 *
 * WHY THIS IS GENERATED AND NOT WRITTEN DOWN.
 *
 * Agents were being given the CHAPTER list verbatim (it is in the addendum) and
 * nothing at all about subtopics — so they guessed, and found out through
 * validate.ts failures. That is backwards twice over: it wastes a round trip,
 * and it pushes a taxonomy decision onto whoever is least equipped to make it.
 *
 * The obvious fix — paste the axis into the addendum too — is the one thing
 * NOT to do. validate.ts already says it in its own header: "The subtopic check
 * runs against the LIVE DB, because a hand-copied list is exactly what goes
 * stale." A markdown copy would drift the moment a subtopic is added, and drift
 * SILENTLY, because nothing diffs prose against the database.
 *
 * ⚠ NOTHING AT COMMIT TIME CATCHES A BAD NAME — not for chapters, and not for
 * subtopics. `commit.ts` says so in its own header: it "does not re-check
 * chapter/subtopic names, and a bad chapter name AUTO-CREATES a duplicate
 * chapter rather than failing". The only guard is `validate.ts`, and only for
 * CHAPTERS (against config), and only if someone runs it. A near-miss on a
 * SUBTOPIC is checked by nothing at all: it silently forks the axis, leaving
 * "Bohr Model of the Hydrogen Atom" beside "Bohr's Model of the Hydrogen Atom",
 * each holding half the questions and each rendering as its own /browse filter.
 * (SCIENCE_ADDENDUM.md asserted the opposite until 2026-09-10 — that commit.ts
 * refuses an unknown chapter — which promised a guard that does not exist.)
 *
 * ⚠ AND A MISSING SUBTOPIC IS A FINDING, NOT A BLOCKER. Chemistry accumulated
 * four genuine gaps across 1,024 rows (Amines has no `Physical Properties`;
 * Coordination Compounds none for the chelate effect; nothing anywhere for
 * chirality). Every one was FILED on the closest fit and FLAGGED, and no agent
 * invented a name. That is the wanted behaviour and this script says so.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { SUBJECTS, subjectFromArg, EXAM_ID_CBSE_12, declaredSubtopics, type SubjectSpec } from "./config";

type Row = { name: string; chapters: { name: string } };

async function axisFor(subject: SubjectSpec): Promise<Map<string, string[]>> {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data, error } = await client
    .from("subtopics")
    .select("name, chapters!inner(name, subjects!inner(name, exam_id))")
    .eq("chapters.subjects.exam_id", EXAM_ID_CBSE_12)
    .eq("chapters.subjects.name", subject.subjectName);
  if (error) throw new Error(`subtopic load failed: ${error.message}`);

  const axis = new Map<string, string[]>();
  for (const r of data as unknown as Row[]) {
    const ch = r.chapters.name;
    if (!axis.has(ch)) axis.set(ch, []);
    axis.get(ch)!.push(r.name);
  }
  for (const list of axis.values()) list.sort((a, b) => a.localeCompare(b));
  return axis;
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const argv = process.argv.slice(2);
  const check = argv.includes("--check");
  const subject = subjectFromArg(argv.find((a) => a.startsWith("--subject="))?.split("=")[1]);
  const axis = await axisFor(subject);

  // A chapter DECLARED in config but absent from the DB is legitimate — it is
  // auto-created by the first paper that uses it (that is how
  // "Surface Chemistry [Outdated]" is meant to arrive). Reported, never fatal.
  const declared = subject.chapters;
  const live = [...axis.keys()];
  const pending = declared.filter((c) => !axis.has(c));
  // The reverse IS worth alarming on: a chapter live in the DB that config does
  // not know about means an earlier run auto-created something off-list.
  const stray = live.filter((c) => !declared.includes(c));

  console.log(`\n### ${subject.subjectName} — chapters and their subtopics (LIVE, ${new Date().toISOString().slice(0, 10)})\n`);
  console.log(`Use these names CHARACTER FOR CHARACTER.`);
  console.log(`NOTHING at commit time catches a typo: commit.ts AUTO-CREATES on a mismatch,`);
  console.log(`validate.ts checks chapters only, and a subtopic near-miss is checked by`);
  console.log(`nothing at all — it silently splits a subtopic in two, each holding half the`);
  console.log(`questions and each rendering as its own /browse filter.\n`);
  console.log(`THE GRAIN IS ONE SUBTOPIC PER **TOP-LEVEL** NCERT SECTION, DELIBERATELY.`);
  console.log(`So a question on an NCERT SUB-section belongs on its PARENT, and that is a`);
  console.log(`correct filing, NOT a gap. Verified 2026-09-12 against the NCERT spine after`);
  console.log(`five separate agents reported the same five "missing" subtopics: "Order of a`);
  console.log(`Reaction" is §3.2.3 under "Factors Influencing Rate of a Reaction" (§3.2);`);
  console.log(`"Optical Isomerism" is §5.4.2 under "Isomerism in Coordination Compounds"`);
  console.log(`(§5.4); Chemical Kinetics carries exactly NCERT's §3.1–§3.5 and Coordination`);
  console.log(`Compounds exactly its §5.1–§5.7. Report a gap only when NO top-level section`);
  console.log(`of that chapter covers the question.\n`);
  // ⚠ LIVE ∪ DECLARED, and printing only the live half was a real defect.
  //
  // A subtopic reaches the DB only once a question is filed on it, so a name the
  // NCERT ingest authored but no textbook exercise used is absent from a live
  // query while being exactly the right answer. Printing only the live half told
  // the Physics pilot that Wave Optics has no `Diffraction` — a subtopic that
  // has existed in config all along — so it filed three diffraction questions
  // under Interference and reported a taxonomy gap that does not exist. CBSE
  // sets diffraction every year, so that would have repeated on all 78 papers.
  const declaredSubs = declaredSubtopics(subject);
  // ⚠ COUNT WHAT IS PRINTED, NOT WHAT IS LIVE. The footer used to report
  // `axis.values()` — the LIVE map alone — while the listing above also prints
  // declared-but-empty subtopics. So Physics printed 72 bullets under a footer
  // that said 71, and a reader checking the two against each other found a
  // discrepancy with nothing to explain it. These counters are incremented at
  // the point of printing, which is the only way the two cannot drift.
  let chaptersPrinted = 0;
  let subsLivePrinted = 0;
  let subsDeclaredOnlyPrinted = 0;
  for (const ch of declared) {
    chaptersPrinted++;
    const liveSubs = axis.get(ch);
    if (!liveSubs) {
      console.log(`- **${ch}** — NOT YET IN THE DB; it and its subtopics are created on first commit.`);
      for (const s of declaredSubs.get(ch) ?? []) {
        console.log(`    - ${s}   (declared)`);
        subsDeclaredOnlyPrinted++;
      }
      continue;
    }
    const dec = declaredSubs.get(ch) ?? [];
    const unused = dec.filter((s) => !liveSubs.includes(s)).sort((a, b) => a.localeCompare(b));
    console.log(`- **${ch}**`);
    for (const s of liveSubs) {
      console.log(`    - ${s}`);
      subsLivePrinted++;
    }
    // Marked, not hidden: they are equally valid to file on, and saying so is
    // what stops an agent inventing a near-duplicate of a name that exists.
    for (const s of unused) {
      console.log(`    - ${s}   ← declared, no rows yet — USE IT if it fits`);
      subsDeclaredOnlyPrinted++;
    }
  }
  console.log(
    `\nIf a question genuinely fits NONE of its chapter's subtopics, file it on the` +
      `\nclosest one and FLAG it in your report with the name you would have wanted.` +
      `\nDo NOT invent a subtopic: it would be created silently on commit. A gap is a` +
      `\nfinding worth having — Chemistry surfaced four real ones this way.`
  );

  const subsPrinted = subsLivePrinted + subsDeclaredOnlyPrinted;
  console.log(
    `\n(${chaptersPrinted} chapters printed, ${subsPrinted} subtopics printed` +
      (subsDeclaredOnlyPrinted
        ? ` — ${subsLivePrinted} live, ${subsDeclaredOnlyPrinted} declared with no rows yet)`
        : `, all live)`)
  );
  if (pending.length) console.log(`pending (declared, not yet live): ${pending.join(", ")}`);
  if (stray.length) {
    console.log(`\n⚠ ${stray.length} chapter(s) LIVE but not declared in config.ts — an earlier`);
    console.log(`   run auto-created something off-list: ${stray.join(", ")}`);
  }
  if (check && stray.length) process.exit(1);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
