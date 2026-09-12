/**
 * Find words this book already holds, in disguise.
 *
 *   npx tsx scripts/vocab/check-duplicates.ts <file.json> [<file.json> ...]
 *
 * WHY THIS EXISTS, and why `commit-entries`' own cluster cross-check is not
 * enough: that check compares an entry against the PAPER'S OWN key for the same
 * word. It has nothing to say about a word the book already holds under another
 * spelling or another inflection, and across five batches every agent that went
 * looking found one it had missed -- `fanatic` beside a shipped `fanatical`,
 * `skeptical` beside a shipped `sceptical`, `confidant` beside `confidants`.
 *
 * FOUR CLASSES, in escalating subtlety. Each was discovered by shipping the one
 * above it and finding the next slip through:
 *
 *   1. EXACT            -- the DB's own key catches this one.
 *   2. PREFIX           -- `evade` / `evasive`.
 *   3. SPELLING VARIANT -- `patronizing` / `patronising`, `candour` / `candor`.
 *                          PREFIX-BLIND: the two diverge mid-word.
 *   4. SAME-LEMMA       -- `perturbing` / `perturbed`, `shabby` / `shabbily`.
 *                          ALSO prefix-blind: they diverge at the suffix.
 *
 * IT REPORTS, IT NEVER DROPS. `vacant` and `vacation` share five letters and
 * are unrelated; `official` and `officious` are a homonym PAIR whose whole point
 * is that they look alike. No rule separates a real inflection from a
 * coincidence, so a human reads the list. Exit code is always 0 -- this is
 * triage, not a gate.
 *
 * A HOMONYM-SET MEMBER IS LABELLED `KEEP` AND NEVER RECOMMENDED FOR DROPPING.
 * `loath` beside `loathe`, `imitated` beside `intimated` look exactly like the
 * duplicates above and are the opposite: the source teaches the contrast
 * between those exact forms, so removing either destroys the lesson. Silence
 * would not do here -- the pair must still be SEEN, or a later reader deletes
 * one by hand -- so it is printed with its reason attached.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";

const DATA = join(__dirname, "data");
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (!files.length) throw new Error("usage: check-duplicates.ts <file.json> [...]");

/** Fold the spellings English splits on, so a variant pair collapses to one key. */
const variantKey = (w: string) =>
  w.toLowerCase()
    .replace(/([a-z])ize\b/g, "$1ise").replace(/([a-z])izing\b/g, "$1ising")
    .replace(/([a-z])ized\b/g, "$1ised").replace(/([a-z])ization\b/g, "$1isation")
    .replace(/([a-z])yze\b/g, "$1yse")
    .replace(/our\b/g, "or").replace(/re\b/g, "er")
    .replace(/ae|oe/g, "e")
    // `sceptical` / `skeptical`. MISSED ON THE FIRST RUN and found only because
    // an agent reported the pair by hand -- the British form was live in Part 2
    // with a real NDA 2024 citation. The two spellings diverge at the SECOND
    // letter, so prefix, lemma and every other rule here are blind to it.
    .replace(/^sk/, "sc")
    .replace(/ll/g, "l");

/**
 * Crude lemma. Deliberately crude: it over-groups, and over-grouping produces a
 * false positive a human dismisses in a second, while under-grouping ships a
 * duplicate nobody ever sees again.
 */
const stem = (w: string) =>
  w.toLowerCase()
    .replace(/ies$/, "y")
    .replace(/(ing|edly|ed|es|s|ly|ness|ity|ment|ance|ence|ation|tion|able|ible|ful|ous|al|ic|ism|ist)$/, "")
    .replace(/(.)\1$/, "$1");

type Authored = { word: string };
type Row = { word: string; part: string; chapter_slug: string };

(async () => {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const live: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries").select("word,part,chapter_slug")
      .eq("book_slug", "cadet-vocab").order("word").range(from, from + 999);
    if (error) throw new Error(error.message);
    live.push(...(data ?? []));
    if ((data ?? []).length < 1000) break;
  }

  const hPath = join(DATA, "homonym-sets.json");
  const partners: Record<string, string[]> = existsSync(hPath)
    ? JSON.parse(readFileSync(hPath, "utf8"))
    : {};

  // Pending words are compared against the live book AND against each other:
  // two chapters authored in parallel cannot see one another's files.
  const pending: { word: string; file: string }[] = [];
  for (const f of files) {
    const rows = JSON.parse(readFileSync(join(DATA, f), "utf8")) as Authored[];
    for (const r of rows) pending.push({ word: r.word.toLowerCase(), file: f });
  }

  const haystack = [
    ...live.map((r) => ({ word: r.word.toLowerCase(), where: `${r.part}/${r.chapter_slug}` })),
    ...pending.map((p) => ({ word: p.word, where: `PENDING ${p.file}` })),
  ];
  const byVariant = new Map<string, typeof haystack>();
  const byStem = new Map<string, typeof haystack>();
  for (const h of haystack) {
    for (const [m, k] of [[byVariant, variantKey(h.word)], [byStem, stem(h.word)]] as const) {
      if (k.length >= 4) m.set(k, [...(m.get(k) ?? []), h]);
    }
  }

  let flagged = 0, kept = 0;
  for (const p of pending) {
    const hits = new Map<string, string>();
    const add = (h: { word: string; where: string }, why: string) => {
      if (h.word === p.word && h.where === `PENDING ${p.file}`) return; // itself
      if (h.word === p.word) { hits.set(`${h.word}|${h.where}`, "EXACT"); return; }
      hits.set(`${h.word}|${h.where}`, why);
    };
    for (const h of byVariant.get(variantKey(p.word)) ?? []) add(h, "spelling-variant");
    for (const h of byStem.get(stem(p.word)) ?? []) add(h, "same-lemma");
    for (const h of haystack) {
      if (h.word === p.word) continue;
      const [a, b] = [p.word, h.word].sort((x, y) => x.length - y.length);
      if (a.length >= 4 && b.startsWith(a)) add(h, "prefix");
    }
    if (!hits.size) continue;
    const isHomonym = !!partners[p.word]?.length;
    if (isHomonym) kept++; else flagged++;
    const tag = isHomonym ? "KEEP" : "READ";
    console.log(
      `${tag}  ${p.word.padEnd(18)} (${p.file})` +
        (isHomonym ? `  [homonym set: ${partners[p.word].join(", ")}]` : "")
    );
    for (const [k, why] of hits) {
      const [w, where] = k.split("|");
      console.log(`        ${why.padEnd(17)} ${w.padEnd(18)} ${where}`);
    }
  }
  console.log(
    `\n${flagged} word(s) to READ, ${kept} kept by the homonym rule. ` +
      `Neither is a failure; both need a human.`
  );
})();
