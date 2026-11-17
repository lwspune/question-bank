/**
 * Keep every catalog name an SSC transcript still uses (2026-11-17, SUGGESTIONS.md
 * 2026-10-23). seed-catalog.ts COPIES the CDS subjects' current chapter and
 * subtopic names; when a CDS notes pass re-cuts them, SSC rows filed under the old
 * names are not moved, so a regenerated catalog would make the next build.ts of
 * those shifts reject them. This carries such a name over from the catalog being
 * replaced, under the subject it already sat in, and names each one it kept.
 */
export type CatalogChapter = { chapter: string; subtopics: string[] };
export type Catalog = Record<string, CatalogChapter[]>;

/** `used` holds "chapter\u0000subtopic" keys read from the transcripts. */
export function carryUsedNames(next: Catalog, previous: Catalog, used: ReadonlySet<string>): { catalog: Catalog; carried: string[] } {
  const catalog: Catalog = Object.fromEntries(
    Object.entries(next).map(([s, cs]) => [s, cs.map((c) => ({ chapter: c.chapter, subtopics: [...c.subtopics] }))])
  );
  const has = (chapter: string, subtopic: string) =>
    Object.values(catalog).some((cs) => cs.some((c) => c.chapter === chapter && c.subtopics.includes(subtopic)));
  const carried: string[] = [];
  for (const [subject, chapters] of Object.entries(previous)) {
    for (const c of chapters) {
      for (const s of c.subtopics) {
        if (!used.has(`${c.chapter}\u0000${s}`) || has(c.chapter, s)) continue;
        const list = (catalog[subject] ??= []);
        const hit = list.find((x) => x.chapter === c.chapter);
        if (hit) hit.subtopics.push(s);
        else list.push({ chapter: c.chapter, subtopics: [s] });
        carried.push(`${subject} / ${c.chapter} / ${s}`);
      }
    }
  }
  return { catalog, carried };
}
