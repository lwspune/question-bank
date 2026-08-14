/**
 * Re-point authored bank-spine rulings at the refs a fresh spine ingest produced.
 *
 * `syllabus_concepts.section_no` on a bank spine is POSITIONAL (JEE-001, JEE-002,
 * ...) and numbered across all three exams at once, so growing ONE exam's corpus
 * shifts the refs of the other two. The rulings in
 * scripts/syllabus/data/<subject>-<exam>-rulings.json record the ref they were
 * authored against, so after a re-ingest every one of them may point somewhere
 * else — silently and plausibly, which is the whole hazard.
 *
 * This maps old ref -> new ref through the pair that DOES survive a renumber:
 * (chapter, subtopic). That pair is unique within an exam by construction — the
 * spine is built from a GROUP BY (exam, chapter, subtopic) — whereas the subtopic
 * name alone is not: Chemistry has six names living in two chapters each
 * ("Isomerism" in both Coordination Compounds and Organic Chemistry), so matching
 * on the name the ruling file happens to carry would land on the wrong row.
 *
 * It REFUSES on any problem rather than renumbering the rows it understood. A
 * partial renumber is the worst outcome available: it leaves some rulings correct
 * and some pointing at a different subtopic, with nothing to distinguish them.
 */

/** One row of a bank spine, as stored. */
export type SpineRow = { sectionNo: string; chapter: string; subtopic: string };

/** One authored ruling, as recorded in its data file. */
export type RulingRef = { sectionNo: string; subtopic: string };

export type RenumberResult =
  | { ok: true; mapping: Map<string, string> }
  | { ok: false; problems: string[] };

/**
 * @param oldSpine the spine the rulings were authored against
 * @param newSpine the spine after re-ingest
 * @param rulings  the refs to re-point
 */
export function renumberRulings(
  oldSpine: SpineRow[],
  newSpine: SpineRow[],
  rulings: RulingRef[],
): RenumberResult {
  const oldByRef = new Map(oldSpine.map((r) => [r.sectionNo, r]));

  // Array-valued so an ambiguous key is DETECTED rather than resolved by
  // insertion order. It should be impossible given the spine's group-by, but a
  // silent wrong answer here is exactly what this function exists to prevent.
  const newByPair = new Map<string, string[]>();
  for (const r of newSpine) {
    const key = pairKey(r.chapter, r.subtopic);
    newByPair.set(key, [...(newByPair.get(key) ?? []), r.sectionNo]);
  }

  const mapping = new Map<string, string>();
  const problems: string[] = [];

  for (const ruling of rulings) {
    const old = oldByRef.get(ruling.sectionNo);
    if (!old) {
      problems.push(`${ruling.sectionNo}: not in the old spine — ref cannot be resolved`);
      continue;
    }
    // Cheap corroboration that the file and the snapshot describe the same row.
    // If these disagree the file was authored against some third state, and
    // every other mapping it produces is suspect too.
    if (old.subtopic !== ruling.subtopic) {
      problems.push(
        `${ruling.sectionNo}: file says "${ruling.subtopic}", old spine says "${old.subtopic}"`,
      );
      continue;
    }

    const hits = newByPair.get(pairKey(old.chapter, old.subtopic)) ?? [];
    if (hits.length === 0) {
      problems.push(
        `${ruling.sectionNo}: "${old.subtopic}" (${old.chapter}) is no longer in the bank`,
      );
      continue;
    }
    if (hits.length > 1) {
      problems.push(
        `${ruling.sectionNo}: "${old.subtopic}" (${old.chapter}) matches ${hits.length} new rows`,
      );
      continue;
    }
    mapping.set(ruling.sectionNo, hits[0]);
  }

  return problems.length > 0 ? { ok: false, problems } : { ok: true, mapping };
}

function pairKey(chapter: string, subtopic: string): string {
  // Tab: both halves are free text that routinely contains "|", "-" and ":"
  // (e.g. "Organic Chemistry - Some Basic Principles and Techniques"), and a
  // delimiter that can occur inside a half cannot be split back apart.
  return `${chapter}\t${subtopic}`;
}
