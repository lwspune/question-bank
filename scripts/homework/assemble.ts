/**
 * Assemble a homework plan file from a chapter-by-chapter repeat review.
 *
 *   npx tsx scripts/homework/assemble.ts <reviewDir> <out.json> --slug=<slug> --exam="<exam>" --subject="<subject>" --title="<title>" [--exclude-chapter="<name>" ...]
 *
 * --exclude-chapter leaves a chapter out of the plan (one off the syllabus, such
 * as CBSE's "Surface Chemistry [Outdated]"). Its rows are listed in the file's
 * `excluded`, so the builder knows they were left out on purpose.
 * --exclude-id="<id>:<reason>" leaves out one question that cannot be set as it
 * stands (e.g. its printed content was a drawing the bank does not hold). The
 * reason is kept in the file's `excludedQuestions`.
 *
 * <reviewDir> holds what scripts/homework/prep-cbse.ts wrote (slots.json: every
 * question, a case study as one slot with its parts) and the reviewers' output
 * in out/<chapter>.json (see scripts/homework/REVIEW_BRIEF.md). Sittings are
 * YEARS (owner, 2026-10-09: CBSE counts repeats across years, since the bank
 * keeps one row for a question several sets of one year shared). A year in a
 * repeat group is starred when every member from that year had its numbers
 * changed.
 *
 * Refuses, writing nothing, when a review names an id that is not a slot, puts
 * a slot in two repeat groups (across chapters too), or a group spans one year.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Slot = { id: string; rows: string[]; year: string; chapter: string };
type Review = {
  chapter: string;
  repeats: { label: string; members: { id: string; changed: boolean }[] }[];
  types: { label: string; members: string[] }[];
};

const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);

function main() {
  const [dir, out] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const slug = arg("slug"), examName = arg("exam"), subjectName = arg("subject"), title = arg("title");
  if (!dir || !out || !slug || !examName || !subjectName || !title) {
    throw new Error('usage: assemble.ts <reviewDir> <out.json> --slug=.. --exam=".." --subject=".." --title=".."');
  }
  const excludeChapters = new Set(
    process.argv.filter((a) => a.startsWith("--exclude-chapter=")).map((a) => a.slice("--exclude-chapter=".length))
  );
  const allSlots: Slot[] = JSON.parse(readFileSync(join(dir, "slots.json"), "utf8"));
  for (const c of excludeChapters) {
    if (!allSlots.some((s) => s.chapter === c)) throw new Error(`no chapter named "${c}" to exclude`);
  }
  const excludeIds = new Map(
    process.argv
      .filter((a) => a.startsWith("--exclude-id="))
      .map((a) => a.slice("--exclude-id=".length))
      .map((v) => [v.slice(0, v.indexOf(":")), v.slice(v.indexOf(":") + 1).trim()] as [string, string])
  );
  for (const [id, why] of excludeIds) {
    if (!allSlots.some((s) => s.id === id)) throw new Error(`no question ${id} to exclude`);
    if (!why) throw new Error(`--exclude-id=${id} needs a reason after a colon`);
  }
  const dropped = (s: Slot) => excludeChapters.has(s.chapter) || excludeIds.has(s.id);
  const slots = allSlots.filter((s) => !dropped(s));
  const excluded = allSlots.filter(dropped).flatMap((s) => s.rows);
  const byId = new Map(slots.map((s) => [s.id, s]));
  const sittings = [...new Set(slots.map((s) => s.year))].sort();
  const errors: string[] = [];
  const inRepeat = new Map<string, string>();
  const inType = new Map<string, string>();
  const groups: object[] = [];
  const files = readdirSync(join(dir, "out")).filter((f) => f.endsWith(".json")).sort();
  // A review of an excluded chapter is ignored, not merged.

  for (const f of files) {
    const r: Review = JSON.parse(readFileSync(join(dir, "out", f), "utf8"));
    if (excludeChapters.has(r.chapter)) continue;
    // A left-out question leaves its groups; a group still needs two years.
    for (const g of r.repeats) g.members = g.members.filter((m) => !excludeIds.has(m.id));
    for (const g of r.types) g.members = g.members.filter((id) => !excludeIds.has(id));
    r.repeats = r.repeats.filter((g) => g.members.length > 1);
    r.types = r.types.filter((g) => g.members.length > 1);
    for (const g of r.repeats) {
      const ids = g.members.map((m) => m.id);
      const years = new Map<string, boolean>(); // year -> every member of that year changed
      for (const m of g.members) {
        const s = byId.get(m.id);
        if (!s) { errors.push(`${f} "${g.label}": ${m.id} is not a slot`); continue; }
        if (inRepeat.has(m.id)) errors.push(`${f} "${g.label}": ${m.id} is also in ${inRepeat.get(m.id)}`);
        inRepeat.set(m.id, `${f} "${g.label}"`);
        years.set(s.year, (years.get(s.year) ?? true) && m.changed);
      }
      if (years.size < 2) errors.push(`${f} "${g.label}": spans ${years.size} year(s)`);
      const list = [...years.keys()].sort().map((y) => (years.get(y) ? `${y}*` : y));
      groups.push({ tier: "repeat", label: g.label, sittings: list, questionIds: ids });
    }
    for (const g of r.types) {
      const years = new Set<string>();
      for (const id of g.members) {
        const s = byId.get(id);
        if (!s) { errors.push(`${f} type "${g.label}": ${id} is not a slot`); continue; }
        if (inType.has(id)) errors.push(`${f} type "${g.label}": ${id} is also in ${inType.get(id)}`);
        inType.set(id, `${f} "${g.label}"`);
        years.add(s.year);
      }
      if (years.size < 2) errors.push(`${f} type "${g.label}": spans ${years.size} year(s)`);
      groups.push({ tier: "type", label: g.label, sittings: [...years].sort(), questionIds: g.members });
    }
  }
  if (errors.length) {
    console.error(`REFUSED: ${errors.length} problem(s)\n  ${errors.slice(0, 40).join("\n  ")}`);
    process.exit(1);
  }

  const plan = {
    slug,
    examName,
    subjectName,
    title,
    summary: `${examName} ${subjectName} board questions, ${sittings[0]} to ${sittings[sittings.length - 1]}, five a day. Questions the board asked again in another year come first, highest count first, then the question types it keeps asking, then every other question. A case study counts as one question.`,
    perDay: 5,
    note: "Repeats are counted across years: the bank keeps one row for a question that several sets of one year shared. Groups were found by a chapter-by-chapter reading (scripts/homework/REVIEW_BRIEF.md) and checked.",
    sittings,
    ...(excluded.length
      ? {
          excludedChapters: [...excludeChapters],
          excludedQuestions: [...excludeIds].map(([id, reason]) => ({ id, reason })),
          excluded,
        }
      : {}),
    questions: slots.map((s) => ({ id: s.id, sitting: s.year, ...(s.rows.length > 1 ? { rows: s.rows } : {}) })),
    groups,
  };
  writeFileSync(out, JSON.stringify(plan, null, 1) + "\n");
  const repeats = groups.filter((g) => (g as { tier: string }).tier === "repeat").length;
  console.log(`${files.length} chapter reviews -> ${slots.length} questions, ${repeats} repeat groups, ${groups.length - repeats} type groups -> ${out}`);
}

main();
