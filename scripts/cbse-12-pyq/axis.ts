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
import { SUBJECTS, subjectFromArg, EXAM_ID_CBSE_12, type SubjectSpec } from "./config";

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
  console.log(
    `Use these names CHARACTER FOR CHARACTER. Chapters are validated and an unknown`
  );
  console.log(`one is REFUSED; subtopics AUTO-CREATE, so a near-miss there does not error —`);
  console.log(`it silently splits a subtopic in two, each holding half the questions.\n`);
  for (const ch of declared) {
    const subs = axis.get(ch);
    if (!subs) {
      console.log(`- **${ch}** — NOT YET IN THE DB; it and its subtopics are created on first commit.`);
      continue;
    }
    console.log(`- **${ch}**`);
    for (const s of subs) console.log(`    - ${s}`);
  }
  console.log(
    `\nIf a question genuinely fits NONE of its chapter's subtopics, file it on the` +
      `\nclosest one and FLAG it in your report with the name you would have wanted.` +
      `\nDo NOT invent a subtopic: it would be created silently on commit. A gap is a` +
      `\nfinding worth having — Chemistry surfaced four real ones this way.`
  );

  console.log(
    `\n(${live.length} chapters live, ${[...axis.values()].reduce((n, v) => n + v.length, 0)} subtopics)`
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
