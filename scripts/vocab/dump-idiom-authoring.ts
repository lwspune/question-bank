/**
 * Emit one authoring worksheet per Part 4 practice-set chapter.
 *
 *   npx tsx scripts/vocab/dump-idiom-authoring.ts <chapter-slug>
 *   npx tsx scripts/vocab/dump-idiom-authoring.ts --all
 *
 * THE DECK'S OWN MEANING IS DELIBERATELY NOT PRINTED HERE, and that is the
 * whole design of this file. Both source decks gloss every idiom they teach;
 * pasting those glosses would reproduce a named commercial product's authored
 * content, which is the same call already made for the Shaktiman and Trishul
 * vocabulary decks. The decks are used as a LIST OF IDIOMS and nothing else.
 *
 * The cost is real and is why the brief insists on it: an author meeting an
 * idiom it cannot define confidently must REPORT it rather than guess, because
 * there is no key here to catch a wrong meaning. In the bank lane the exam
 * publishes the definition; in this lane nothing does.
 *
 * A worksheet lists ONLY idioms still to author, so re-running it after a batch
 * lands gives the remainder rather than the whole chapter again.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { CADET_VOCAB, chapterFor } from "../../src/lib/vocab/registry";

const DATA = join(__dirname, "data");
const OUT = join(__dirname, "out");

type CoachingIdiom = { idiom: string; decks: string[]; pages: number[] };

const roster = JSON.parse(
  readFileSync(join(DATA, "idiom-coaching.json"), "utf8")
) as CoachingIdiom[];

// Already authored, in any chapter file — the same shape `commit-idioms` reads.
const done = new Set<string>();
for (const f of readdirSync(DATA).filter((f) => /^idioms-.+\.json$/.test(f))) {
  for (const a of JSON.parse(readFileSync(join(DATA, f), "utf8")) as { idiom: string }[]) {
    done.add(a.idiom.toLowerCase());
  }
}

const wanted = process.argv.includes("--all")
  ? CADET_VOCAB.chapters.filter((c) => c.part === "idiom" && c.section === "practice-set")
  : CADET_VOCAB.chapters.filter((c) => c.slug === process.argv[2]);
if (!wanted.length) throw new Error(`no such chapter: ${process.argv[2] ?? "(none given)"}`);

for (const chapter of wanted) {
  const mine = roster
    .filter((r) => {
      const ch = chapterFor(CADET_VOCAB, "idiom", r.idiom, "practice-set", null);
      return ch?.slug === chapter.slug && !done.has(r.idiom.toLowerCase());
    })
    .sort((a, b) => a.idiom.localeCompare(b.idiom));

  /**
   * A worksheet past ~170 entries is split into numbered PARTS, and the split
   * is made HERE rather than by telling two agents to divide one list between
   * them. An instruction to "take the first half" produces a gap or an overlap
   * sooner or later; slicing the sorted list cannot. The chapter is unaffected
   * -- this is a unit of WORK, not a unit of the book.
   */
  const CHUNK = 170;
  const parts: CoachingIdiom[][] = [];
  for (let i = 0; i < Math.max(mine.length, 1); i += CHUNK) parts.push(mine.slice(i, i + CHUNK));

  parts.forEach((slice, pi) => {
  const suffix = parts.length > 1 ? `-${pi + 1}` : "";
  const lines: string[] = [];
  lines.push(`# ${chapter.label} — Idioms and Phrases · Practice Material`);
  lines.push(`${slice.length} idioms to author\n`);
  lines.push(`Every entry below is taught by a commercial NDA/CDS prep deck and has`);
  lines.push(`NEVER been printed by a question. There is no key, so the meaning is`);
  lines.push(`yours to write — and nothing downstream can catch a wrong one.\n`);

  for (const r of slice) {
    lines.push(`## ${r.idiom}`);
    lines.push(
      `- [coaching] ${r.decks.join(" + ")} deck${r.decks.length > 1 ? "s" : ""}` +
        ` — no question has keyed it`
    );
    lines.push("");
  }

  const f = join(OUT, `${chapter.slug}${suffix}.md`);
  writeFileSync(f, lines.join("\n"), "utf8");
  console.log(`wrote ${chapter.slug}${suffix}.md  (${slice.length} idioms)`);
  });
}
