/**
 * Pure helpers for reshape.ts, the /notes re-cut of one SSC CGL Tier I chapter.
 *
 * Two things SSC needs that SPI's re-cut does not:
 *  - a transcript block skipped at commit as a REPEAT has no bank row, but repeats.json names the
 *    row it repeats, so the block takes that row's target instead of a hand-written `extra`;
 *  - the catalog is copied from CDS and shared with Tier II, so a new teaching name is ADDED to it
 *    (catalog-authored.json, so the generator reproduces it, and catalog.json, so build.ts accepts
 *    it now) and no old name is ever removed: Tier II rows still use them.
 */

export type Chapter = { chapter: string; subtopics: string[] };
export type Catalog = Record<string, Chapter[]>;
export type Authored = { subjects: Record<string, Chapter[]>; rename: Record<string, string>; add: Record<string, Chapter[]> };
export type Repeat = { number: number; questionId: string; first: string };

/** shift id -> question number -> target, for repeat blocks whose kept row is in `targetOf`. */
export function repeatTargets(repeats: Record<string, Repeat[]>, targetOf: Map<string, string>): Map<string, Map<number, string>> {
  const out = new Map<string, Map<number, string>>();
  for (const [shift, list] of Object.entries(repeats)) {
    for (const r of list) {
      const to = targetOf.get(r.questionId);
      if (!to) continue;
      if (!out.has(shift)) out.set(shift, new Map());
      out.get(shift)!.set(r.number, to);
    }
  }
  return out;
}

/** Add the names a chapter's catalog entry lacks, to both files. Inputs are not changed. */
export function addCatalogSubtopics(catalog: Catalog, authored: Authored, subject: string, chapter: string, names: string[]) {
  const next: Catalog = structuredClone(catalog);
  const auth: Authored = structuredClone(authored);
  const entry = next[subject]?.find((c) => c.chapter === chapter);
  if (!entry) throw new Error(`the catalog has no ${subject} chapter "${chapter}"`);
  const added = names.filter((n, i) => !entry.subtopics.includes(n) && names.indexOf(n) === i);
  if (!added.length) return { catalog: next, authored: auth, added };
  entry.subtopics.push(...added);
  const list = (auth.add[subject] ??= []);
  const own = list.find((c) => c.chapter === chapter);
  if (own) own.subtopics.push(...added);
  else list.push({ chapter, subtopics: [...added] });
  return { catalog: next, authored: auth, added };
}

const q = (s: string) => JSON.stringify(s);
const chapterLine = (c: Chapter) => `      { "chapter": ${q(c.chapter)}, "subtopics": [${c.subtopics.map(q).join(", ")}] }`;
const subjectBlock = (m: Record<string, Chapter[]>) =>
  Object.entries(m).map(([s, cs]) => `    ${q(s)}: [\n${cs.map(chapterLine).join(",\n")}\n    ]`).join(",\n");

/** catalog-authored.json as written by hand: one chapter per line. */
export function formatAuthored(a: Authored & { _comment?: string }): string {
  const rename = Object.entries(a.rename).map(([k, v]) => `${q(k)}: ${q(v)}`).join(", ");
  return [
    "{",
    ...(a._comment !== undefined ? [`  "_comment": ${q(a._comment)},`] : []),
    `  "subjects": {\n${subjectBlock(a.subjects)}\n  },`,
    `  "rename": { ${rename} },`,
    `  "add": {\n${subjectBlock(a.add)}\n  }`,
    "}",
    "",
  ].join("\n");
}
