/**
 * Emit the authoring inputs for the Part 1 fill words — one brief per class
 * rung, plus the list of words already taken.
 *
 *   npx tsx scripts/vocab/plan-fill-roster.ts [--target=130]
 *
 * ═══ WHY A BRIEF AND NOT A WORKSHEET ═══
 *
 * Every other chapter of this book is authored from `dump-authoring.ts`, which
 * hands over a worksheet of words the CORPUS already contains. A fill word is
 * not in the corpus — that is what makes it a fill word — so there is nothing
 * to dump. The author picks the words as well as defining them, which is a
 * materially weaker claim and is why `school_source` records it per row.
 *
 * ═══ THE LEVEL ANCHOR IS THE RUNG'S OWN WORDS ═══
 *
 * "Class 9 vocabulary" has no offline authority we can consult. What we do have
 * is the words CBSE itself put at that rung, and at the two either side. The
 * brief prints all of them: the ask is "words of this difficulty", which an
 * author can judge against a hundred real examples far better than against an
 * adjective like "moderate".
 *
 * ═══ THE TAKEN LIST IS A FILE, NOT A PROMPT ═══
 *
 * 3,700 words will not survive being pasted into a prompt and read carefully.
 * `out/_taken-words.txt` is written instead so an author can grep it, and
 * `build-fill-roster.ts` re-checks every proposal mechanically afterwards —
 * because an instruction to check is not a check.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB } from "../../src/lib/vocab/registry";

const OUT = join(__dirname, "out");
const arg = (n: string, d: number) =>
  Number(process.argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d);
const TARGET = arg("target", 130);

(async () => {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const rows: { word: string; meaning: string; part: string; school_class: number | null }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries")
      .select("word,meaning,part,school_class")
      .eq("book_slug", CADET_VOCAB.slug)
      .order("word")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? []));
    if ((data ?? []).length < 1000) break;
  }

  mkdirSync(OUT, { recursive: true });
  writeFileSync(
    join(OUT, "_taken-words.txt"),
    rows.map((r) => r.word).sort().join("\n") + "\n"
  );
  console.log(`taken list: ${rows.length} words -> out/_taken-words.txt`);

  const rungs = CADET_VOCAB.chapters.filter((c) => c.part === "school");
  const atRung = (c: number) =>
    rows.filter((r) => r.part === "school" && r.school_class === c).sort((a, b) =>
      a.word.localeCompare(b.word)
    );

  for (const ch of rungs) {
    const cls = ch.schoolClass!;
    const have = atRung(cls);
    const need = Math.max(0, TARGET - have.length);
    if (!need) {
      console.log(`  Class ${cls}: full (${have.length}) — no brief`);
      continue;
    }
    const below = cls > 5 ? atRung(cls - 1) : [];
    const above = cls < 12 ? atRung(cls + 1) : [];

    const list = (xs: typeof have) =>
      xs.length
        ? xs.map((r) => `- **${r.word}** — ${r.meaning}`).join("\n")
        : "_(none — this rung is one of the thin ones)_";

    const md = `# Fill roster — Class ${cls}

Author **${need}** new entries for the Class ${cls} rung of Part 1.

Read \`scripts/vocab/FILL_BRIEF.md\` first. It is the contract; this file is
only the data for your rung.

## Write to

\`scripts/vocab/data/fill-class-${cls}.json\`

## The level you are matching

These are the words CBSE itself places at Class ${cls}. **Match their
difficulty** — not the hardest of them, the middle.

${list(have)}

${
  below.length
    ? `### Class ${cls - 1} (just below — do not go this easy)\n\n${list(below.slice(0, 40))}\n`
    : ""
}${
      above.length
        ? `### Class ${cls + 1} (just above — do not go this hard)\n\n${list(above.slice(0, 40))}\n`
        : ""
    }
## Words already in the book — do not propose any of these

\`scripts/vocab/out/_taken-words.txt\` (${rows.length} words, one per line).
Grep it for every word you propose. A collision is REFUSED at commit, so a
proposal that ignores this file simply wastes the run.
`;
    writeFileSync(join(OUT, `fill-class-${cls}.md`), md);
    console.log(
      `  Class ${String(cls).padStart(2)}: have ${String(have.length).padStart(3)}, ` +
        `author ${String(need).padStart(3)} -> out/fill-class-${cls}.md`
    );
  }
})();
