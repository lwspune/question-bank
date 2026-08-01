/**
 * Promote agent `taxonomyGap` proposals into the real `subtopic` slot, and
 * surface everything that needs a human decision, for one paper's agent output.
 *
 *   npx tsx scripts/jee/promote-gaps.ts <paperId> [--subject=Chemistry] [--apply]
 *
 * Dry-run by default. Reads out/<paperId>_sol_<tag>.json.
 *
 * Why a script: the taxonomy is being grown by the agents themselves (the
 * deliberate choice was auto-create now, reshape at the end), so a proposal has
 * to land in `subtopic` before commit or the row files under the poor fallback
 * fit instead. Doing that by hand per paper is where a typo becomes a permanent
 * near-duplicate subtopic.
 *
 * It never touches `answer`. A disagreement with the source key is REPORTED for
 * adjudication and must be applied deliberately via `answerOverrides` — an agent
 * flag is a hypothesis, not a verdict.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { requirePaperId } from "./config";
import { parseSubjectArg } from "./lib";

type Sol = {
  chapter: string;
  subtopic: string;
  answer?: string;
  taxonomyGap?: string;
  flag?: string;
  stemIssue?: string;
  skip?: boolean;
};

/**
 * Return an agent's `taxonomyGap` iff it is a usable subtopic NAME, else null.
 *
 * A well-behaved agent writes a bare name ("Nernst Equation and Cell EMF").
 * Others write prose and bury the name in quotes ("Chapter X has no subtopic
 * for ... Proposed: 'Enthalpy Changes, Hess's Law and Bond Enthalpy'.").
 *
 * We deliberately do NOT try to dig the name out of prose. The obvious approach
 * — take the quoted span — silently mangles any name containing an apostrophe:
 * "Hess's Law" ends the match early and yields "s Law and Bond Enthalpy", which
 * would then be created as a real subtopic and be indistinguishable from an
 * intentional one. Refusing costs a one-line manual fix; guessing costs
 * permanent taxonomy damage.
 */
export function parseGap(gap: string): { chapter?: string; subtopic: string } | null {
  const usable = (s: string) =>
    s.length > 0 &&
    s.length <= 70 &&
    !/\.\s/.test(s) && // sentence punctuation ⇒ prose
    !/\bproposed\b/i.test(s) &&
    !/\bno subtopic\b/i.test(s);

  const raw = gap.trim();
  if (usable(raw)) return { subtopic: raw };

  // Agents commonly write "[Chapter ::] Name - why it is needed".
  // Split on " :: " FIRST: several chapter names contain " - " themselves
  // ("Organic Chemistry - Some Basic Principles and Techniques"), so cutting on
  // the hyphen first would truncate mid-chapter and yield a bogus name.
  const parts = raw.split(" :: ");
  let s = parts[parts.length - 1].trim();
  // A named chapter is DELIBERATE — the agent is saying the topic belongs
  // elsewhere than the placeholder it was forced to use. Dropping it files the
  // new subtopic under the wrong chapter (this put "Electronic Effects and
  // Reaction Intermediates" under Hydrocarbons instead of Organic Basics).
  const chapter = parts.length > 1 ? parts[parts.length - 2].trim() : undefined;

  // Then drop the trailing justification at the first " - ".
  const dash = s.indexOf(" - ");
  if (dash > 0) s = s.slice(0, dash).trim();
  if (usable(s)) return { chapter, subtopic: s };

  // Last resort: drop a trailing parenthetical gloss, which is commentary
  // rather than part of the name.
  const paren = s.replace(/\s*\([^()]*\)\s*$/, "").trim();
  return usable(paren) ? { chapter, subtopic: paren } : null;
}

/** Back-compat shim: the name alone. */
export function subtopicNameFrom(gap: string): string | null {
  return parseGap(gap)?.subtopic ?? null;
}

function main() {
  const paperId = requirePaperId(process.argv, 2, "promote-gaps.ts <paperId> [--subject=X] [--apply]");
  const apply = process.argv.includes("--apply");
  const subject = parseSubjectArg(process.argv) ?? "Chemistry";
  const tag = subject.toLowerCase().slice(0, 4);
  const path = join("scripts/jee/out", `${paperId}_sol_${tag}.json`);
  if (!existsSync(path)) throw new Error(`no agent output at ${path}`);

  const sols: Record<string, Sol> = JSON.parse(readFileSync(path, "utf8"));
  const promoted: string[] = [];
  const disagreements: string[] = [];
  const stemIssues: string[] = [];
  const skips: string[] = [];

  const rejected: string[] = [];
  const moved: string[] = [];
  for (const [qn, s] of Object.entries(sols)) {
    if (s.taxonomyGap && s.taxonomyGap !== s.subtopic) {
      const parsed = parseGap(s.taxonomyGap);
      const name = parsed?.subtopic ?? null;
      // If the agent named a DIFFERENT chapter, honour it — it is saying the
      // topic belongs elsewhere than the placeholder it was forced to use.
      if (parsed?.chapter && parsed.chapter !== s.chapter) {
        moved.push(`Q${qn}  chapter  ${s.chapter}  ->  ${parsed.chapter}`);
        s.chapter = parsed.chapter;
      }
      if (!name) {
        // Some agents write PROSE here ("Chapter X has no subtopic for ...
        // Proposed: '...'"). Promoting that verbatim would create a subtopic
        // whose NAME is a whole sentence — permanent taxonomy damage that no
        // later reshape can tell from a real name. Refuse and report instead.
        rejected.push(`Q${qn}  unusable taxonomyGap: ${s.taxonomyGap.slice(0, 100)}`);
        continue;
      }
      promoted.push(`Q${qn}  ${s.chapter}  ::  ${s.subtopic}  ->  ${name}`);
      s.subtopic = name;
    }
    if (s.flag) disagreements.push(`Q${qn} [answer=${s.answer}] ${s.flag}`);
    if (s.stemIssue) stemIssues.push(`Q${qn}: ${s.stemIssue}`);
    if (s.skip) skips.push(`Q${qn}`);
  }

  console.log(`${paperId} [${subject}]: ${Object.keys(sols).length} rows`);
  console.log(`\n  taxonomy gaps promoted: ${promoted.length}`);
  promoted.forEach((p) => console.log(`    ${p}`));
  if (moved.length) {
    console.log(`
  chapter corrections (agent named a different chapter): ${moved.length}`);
    moved.forEach((m) => console.log(`    ${m}`));
  }
  if (rejected.length) {
    console.log(`\n  !! REJECTED taxonomyGap (not a usable name — fix by hand): ${rejected.length}`);
    rejected.forEach((r) => console.log(`    ${r}`));
  }
  console.log(`\n  FLAGS needing adjudication: ${disagreements.length}`);
  disagreements.forEach((d) => console.log(`    ${d}`));
  if (stemIssues.length) {
    console.log(`\n  stem issues: ${stemIssues.length}`);
    stemIssues.forEach((s) => console.log(`    ${s}`));
  }
  if (skips.length) console.log(`\n  SKIP requested: ${skips.join(", ")}`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write the promoted subtopics.");
    return;
  }
  writeFileSync(path, JSON.stringify(sols, null, 2) + "\n");
  console.log(`\nwrote ${path}`);
}

// Guarded so the pure helper above can be imported (and unit-tested) without
// firing the CLI — same pattern as audit-keys.ts.
if (require.main === module) main();
