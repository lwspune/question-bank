/**
 * CDS Elementary Mathematics -> "Number System": re-cut 12 CLASSIFICATION
 * subtopics into 12 TEACHING subtopics, so /notes can author 1:1 against
 * coherent units.
 *
 *   npx tsx scripts/cds-maths/reshape-number-system.ts            # dry run
 *   npx tsx scripts/cds-maths/reshape-number-system.ts --apply    # write
 *
 * WHY THIS EXISTS. catalog.json was seeded from three other banks' taxonomies to
 * CLASSIFY a paper, never to SEQUENCE teaching. That is why the names are
 * technique-canonical (good) but the cut is wrong for notes: the largest
 * subtopic, "Divisibility and Remainders" (71 q, a third of the chapter),
 * bundles four unrelated technique families -- divisibility rules, remainders by
 * congruence, divisibility by factorisation, and remainder recipes that are
 * really HCF/LCM -- while two subtopics hold ONE question each and one of those
 * is mislabelled ("Trailing Zeros" holds a question solved by parity; the real
 * trailing-zeros cluster sits under Prime Numbers). Established by reading all
 * 218 stems AND solutions, not the names.
 *
 * THREE SIDES, because a DB-only reshape would be silently undone. lib.ts
 * already documents the trap: subtopic is SOFT-validated and AUTO-CREATED, so
 * after a cleanup pass an unlisted subtopic "splits one chapter's corpus across
 * two subtopics with no error anywhere."
 *   1. the bank        -- create targets, reparent 218 rows, drop empty sources
 *   2. catalog.json    -- the pipeline's controlled vocabulary
 *   3. <paper>.questions.json x20 -- what commit.ts actually reads
 *
 * The 50 `b*.json` BAND files are deliberately NOT rewritten. They are
 * transcription evidence -- what a pass recorded at the time -- and editing them
 * to match a later taxonomy decision would falsify that record. A re-merge does
 * carry band subtopics through, so the protection is placed instead where it
 * belongs: `strictSubtopics` turns merge.ts's soft warning into an ERROR, so a
 * stale band name fails loudly at merge rather than re-fragmenting the bank.
 *
 * IDEMPOTENT. A row already sitting in its target is accepted; anything in
 * neither its source nor its target is a refusal, not a repair.
 */
import { join } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { PAPERS, dataPath } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const CATALOG = join(process.cwd(), "scripts/cds-maths/catalog.json");
const CHAPTER = "Number System";

const T = {
  found: "Division, Parity and Consecutive Integers",
  place: "Place Value and Digit Problems",
  rules: "Divisibility Rules and Missing Digits",
  unit: "Unit Digit and Cyclicity",
  primes: "Prime Numbers and Primality",
  factors: "Factors, Divisor Counting and Trailing Zeros",
  laws: "HCF and LCM Laws and Fractions",
  apps: "HCF and LCM Applications and Remainder Recipes",
  cong: "Remainders by Congruence and Cyclicity",
  fact: "Divisibility by Factorisation",
  squares: "Perfect Squares, Cubes and Difference of Squares",
  ratio: "Rational and Irrational Numbers",
} as const;

/** Teaching order. Also the new catalog.json list for this chapter. */
const TEACHING_ORDER: string[] = [
  T.found, T.place, T.rules, T.unit, T.primes, T.factors,
  T.laws, T.apps, T.cong, T.fact, T.squares, T.ratio,
];

/** Source subtopics that move wholesale -- no per-row judgement. */
const WHOLE: Record<string, string> = {
  "Digits and Place Value": T.place,
  "Unit Digit and Powers": T.unit,
  "Rational and Irrational Numbers": T.ratio,
  "Parity of Integers": T.found,
  "Ordering and Comparison of Integers": T.found,
  "Consecutive Integers and their Products": T.found,
  "Perfect Squares and Cubes": T.squares,
  "Difference of Squares and Factor Pairs": T.squares,
  "Trailing Zeros and Factors of Ten": T.factors,
};

/** The three technique-mixing subtopics, assigned per row. */
const SPLIT_SOURCES = [
  "Divisibility and Remainders",
  "Prime Numbers and Factorisation",
  "Factors, Multiples, HCF and LCM",
];

const BY_PREFIX: Record<string, string> = {};
function put(target: string, prefixes: string[]) {
  for (const p of prefixes) {
    if (BY_PREFIX[p]) throw new Error(`prefix ${p} assigned twice`);
    BY_PREFIX[p] = target;
  }
}

// ---- "Divisibility and Remainders" (71) -> SEVEN destinations ----
put(T.cong, [
  "7816cc52", "87d0be07", "ca0ac877", "24af4de6", "dc0971c4", "c33df10e", "e45d77d9",
  "b42a682f", "25a4d9e5", "e725de06", "4ed7158f", "f6d88109", "340b7f86", "79efec6d",
  "6ebf16cc", "da3b1069", "41833184", "e6e3e710", "9f99dd41", "752074f6", "45631257",
  "8d659d0f", "1d03d9eb", "3fe791ac", "87ae1c6e", "220221c4",
]);
put(T.fact, [
  "89543641", "1a16a65f", "e56cae63", "c3d85830", "786228f9", "7917120d", "66f84c30",
  "ae842fca", "1479cdc5", "332003d5", "dc27a9b6", "cde1cf78", "027223d8", "7429272c",
  "0942dc22", "99e6dd13",
]);
put(T.rules, [
  "f807f33e", "46898044", "ba1d1307", "0e1f1ac3", "5ff665df", "4c17bfed", "3fd0b391",
  "b2cdee20", "04b208cf",
]);
put(T.apps, ["d7bc1fb3", "804788a3", "a6c6acda", "e1b0bedf", "3b79f0b9", "85fe8014", "e22f4c7d"]);
put(T.found, ["913730b4", "57ee2f23", "6dc40831", "38982266", "8ab6516b", "4a188dfd", "de087bc6"]);
put(T.factors, ["53486f96", "4df342b6", "9083a1fc"]);
put(T.place, ["8dfb21d6", "ce8eca96"]);
put(T.laws, ["da99021b"]);

// ---- "Prime Numbers and Factorisation" (36) -> THREE destinations ----
put(T.primes, [
  "1d5a7302", "c0cd5de3", "9f7fb1d1", "1a7568e7", "8055f82b", "29bcdccb", "0b1f17b8",
  "b8f35f2a", "262ecee6", "8ba3c305", "014ad867", "8b57a328", "e76d669f", "85225565",
  "189e1ae7", "8403820d", "10dcf016", "6fffddaa", "80bf8bcf", "d6f65cf7", "29d48dc0",
  "568158a6",
]);
put(T.factors, [
  "9c23190c", "e9aad018", "b021bb52", "8df1ab56", "8e2c1eb8", "db1db4e5", "9edd697d",
  "6a3b23c6", "a7d454bb", "9e6a33da", "66ef3ff9", "10675be7", "3f451b4f",
]);
put(T.laws, ["75181a6c"]);

// ---- "Factors, Multiples, HCF and LCM" (43) -> THREE destinations ----
put(T.laws, [
  "e6fd1df9", "a9ffe28d", "f1f1e850", "36c715f8", "cd4be0e3", "ccf1d36a", "e453e6b3",
  "ebccb857", "579d99f3", "d6cc1271", "811d71e4", "e93311ed", "8eff95d8", "c4494e31",
  "65ab9911", "5a18853d", "235f8f91", "36415d04", "962892b9", "38656146", "f1d66927",
  "d156389a", "c0112a10", "a2469f8d", "92d9a06c", "f13f9fec", "09800e2e",
]);
put(T.apps, [
  "25f6969f", "0b79a604", "597ea94f", "f583cb25", "95db8e93", "e6246195", "a45ff5d5",
  "e37faeec", "2b544c6f", "67343f90", "777b5874", "6203c570", "bea82625",
]);
put(T.factors, ["3e76e6d8", "21cc0e3d", "2c42ddfd"]);

/** The reviewed plan. Any disagreement is a refusal. */
const EXPECTED: Record<string, number> = {
  [T.found]: 17, [T.place]: 26, [T.rules]: 9, [T.unit]: 13, [T.primes]: 22,
  [T.factors]: 20, [T.laws]: 29, [T.apps]: 20, [T.cong]: 26, [T.fact]: 16,
  [T.squares]: 14, [T.ratio]: 6,
};

const TOTAL = 218;

function die(msg: string, detail: string[] = []): never {
  console.log(`\nREFUSING: ${msg}`);
  detail.slice(0, 40).forEach((d) => console.log("  " + d));
  if (detail.length > 40) console.log(`  ... and ${detail.length - 40} more`);
  process.exit(1);
}

async function resolveChapter(db: SupabaseClient): Promise<string> {
  const { data, error } = await db
    .from("chapters")
    .select("id, name, subjects!inner(name, exams!inner(name))")
    .eq("name", CHAPTER);
  if (error) throw error;
  const hits = (data ?? []).filter(
    (c: any) => c.subjects?.exams?.name === "CDS" && c.subjects?.name === "Mathematics"
  );
  if (hits.length !== 1) die(`expected exactly 1 CDS Mathematics "${CHAPTER}" chapter, found ${hits.length}`);
  return (hits[0] as any).id;
}

async function main() {
  console.log(APPLY ? "=== APPLY ===\n" : "=== DRY RUN (pass --apply to write) ===\n");

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const chapterId = await resolveChapter(db);

  // ---------- read every row of the chapter, ANY visibility ----------
  // Any-visibility because a source subtopic is only safe to DROP when nothing
  // at all still points at it, not merely nothing PUBLIC.
  const { data: rows, error } = await db
    .from("questions")
    .select("id, visibility, source_file, source_row, subtopic_id, subtopics!inner(name)")
    .eq("chapter_id", chapterId);
  if (error) throw error;
  const all = (rows ?? []) as any[];
  const pub = all.filter((r) => r.visibility === "PUBLIC");
  console.log(`chapter rows: ${all.length} (${pub.length} PUBLIC)`);
  if (pub.length !== TOTAL) die(`expected ${TOTAL} PUBLIC rows, got ${pub.length}`);

  // ---------- resolve each row to a target ----------
  const problems: string[] = [];
  const counts: Record<string, number> = {};
  const usedPrefix = new Set<string>();
  const moves: { id: string; from: string; to: string }[] = [];
  const settled: string[] = [];
  const byKey = new Map<string, string>(); // "<paper>#<number>" -> target

  const fileToPaper = new Map<string, string>();
  for (const [pid, p] of Object.entries(PAPERS)) fileToPaper.set(p.sourceFile, pid);

  for (const r of pub) {
    const from = r.subtopics.name as string;
    let to: string | undefined;

    if (WHOLE[from]) to = WHOLE[from];
    else if (SPLIT_SOURCES.includes(from)) {
      const hits = Object.keys(BY_PREFIX).filter((p) => (r.id as string).startsWith(p));
      if (hits.length === 0) { problems.push(`UNASSIGNED ${r.id} (${from})`); continue; }
      if (hits.length > 1) { problems.push(`AMBIGUOUS ${r.id} matches ${hits.join(", ")}`); continue; }
      to = BY_PREFIX[hits[0]];
      usedPrefix.add(hits[0]);
    } else if (TEACHING_ORDER.includes(from)) {
      // Already migrated. Accept only if it is where the plan puts it.
      to = from;
      settled.push(r.id);
    } else {
      problems.push(`UNKNOWN SUBTOPIC "${from}" (${r.id})`);
      continue;
    }

    counts[to!] = (counts[to!] ?? 0) + 1;
    if (from !== to) moves.push({ id: r.id, from, to });

    const pid = r.source_file ? fileToPaper.get(r.source_file) : undefined;
    if (pid && r.source_row != null) byKey.set(`${pid}#${r.source_row}`, to!);
  }

  for (const p of Object.keys(BY_PREFIX)) {
    if (!usedPrefix.has(p) && settled.length === 0) problems.push(`PREFIX MATCHED NOTHING: ${p}`);
  }
  if (problems.length) die(`${problems.length} row(s) could not be resolved`, problems);

  console.log("\nTARGET TEACHING SUBTOPIC".padEnd(52) + " got   exp");
  let drift = 0;
  for (const name of TEACHING_ORDER) {
    const got = counts[name] ?? 0;
    const exp = EXPECTED[name];
    if (got !== exp) drift++;
    console.log(name.padEnd(52) + String(got).padStart(4) + String(exp).padStart(6) + (got !== exp ? "  <-- DRIFT" : ""));
  }
  if (drift) die(`${drift} target count(s) disagree with the reviewed plan`);
  console.log("-".repeat(62));
  console.log(`rows to move: ${moves.length}   already settled: ${settled.length}`);

  // ---------- 1. the bank ----------
  const existing = new Map<string, string>();
  {
    const { data: subs, error: se } = await db
      .from("subtopics").select("id, name").eq("chapter_id", chapterId);
    if (se) throw se;
    for (const s of (subs ?? []) as any[]) existing.set(s.name, s.id);
  }
  const toCreate = TEACHING_ORDER.filter((n) => !existing.has(n));
  const retired = [...existing.keys()].filter((n) => !TEACHING_ORDER.includes(n));
  console.log(`\n[1/3] bank: create ${toCreate.length} subtopic(s), reparent ${moves.length} row(s), drop ${retired.length} source(s)`);
  toCreate.forEach((n) => console.log(`        + ${n}`));
  retired.forEach((n) => console.log(`        - ${n}`));

  if (APPLY) {
    // Create targets BEFORE any reparent: subtopic_id is ON DELETE SET NULL, so
    // dropping a source first would silently orphan rows rather than error.
    for (const name of toCreate) {
      const { data, error: ie } = await db
        .from("subtopics")
        .insert({ chapter_id: chapterId, name, order_index: TEACHING_ORDER.indexOf(name) + 1 })
        .select("id, name")
        .single();
      if (ie) throw ie;
      existing.set((data as any).name, (data as any).id);
    }
    // Order EVERY teaching subtopic, not just the newly created ones. A name
    // that survived the re-cut ("Rational and Irrational Numbers") is skipped by
    // the create step above and would otherwise keep order_index NULL, which
    // sorts it away from its siblings in the /browse filter rail. notes:order
    // would eventually set it, but only once this chapter's notes ship.
    for (const [i, name] of TEACHING_ORDER.entries()) {
      const sid = existing.get(name);
      if (!sid) continue;
      const { error: oe } = await db
        .from("subtopics").update({ order_index: i + 1 }).eq("id", sid);
      if (oe) throw oe;
    }
    // Reparent, grouped by target, chunked well under the ~200-id URL limit on .in()
    const byTarget = new Map<string, string[]>();
    for (const m of moves) {
      if (!byTarget.has(m.to)) byTarget.set(m.to, []);
      byTarget.get(m.to)!.push(m.id);
    }
    let moved = 0;
    for (const [target, ids] of byTarget) {
      const sid = existing.get(target);
      if (!sid) throw new Error(`target subtopic missing after create: ${target}`);
      for (let i = 0; i < ids.length; i += 150) {
        const chunk = ids.slice(i, i + 150);
        const { error: ue } = await db.from("questions").update({ subtopic_id: sid }).in("id", chunk);
        if (ue) throw ue;
        moved += chunk.length;
      }
    }
    console.log(`        reparented ${moved} row(s)`);

    // Drop a source ONLY when nothing at all still points at it.
    for (const name of retired) {
      const sid = existing.get(name)!;
      const { count, error: ce2 } = await db
        .from("questions").select("id", { count: "exact", head: true }).eq("subtopic_id", sid);
      if (ce2) throw ce2;
      if ((count ?? 0) > 0) die(`source subtopic "${name}" still has ${count} question(s) -- not dropping`);
      const { error: de } = await db.from("subtopics").delete().eq("id", sid);
      if (de) throw de;
    }
    console.log(`        dropped ${retired.length} empty source subtopic(s)`);
  }

  // ---------- 2. catalog.json ----------
  const catRaw = readFileSync(CATALOG, "utf8");
  const cat = JSON.parse(catRaw) as Record<string, string[]>;
  const catOld = cat[CHAPTER] ?? [];
  const catSame = JSON.stringify(catOld) === JSON.stringify(TEACHING_ORDER);
  console.log(`\n[2/3] catalog.json: ${catSame ? "already current" : `${catOld.length} -> ${TEACHING_ORDER.length} entries`}`);
  if (APPLY && !catSame) {
    cat[CHAPTER] = TEACHING_ORDER;
    const crlf = catRaw.includes("\r\n");
    const tnl = /\n$/.test(catRaw);
    let out = JSON.stringify(cat, null, 2);
    if (tnl) out += "\n";
    if (crlf) out = out.replace(/\n/g, "\r\n");
    writeFileSync(CATALOG, out, "utf8");
    console.log("        written");
  }

  // ---------- 3. <paper>.questions.json ----------
  // Line endings and trailing-newline state are PRESERVED per file. Verified
  // byte-exact across all 20 on an unmodified round-trip, so the diff is only
  // the subtopic strings. (The b*.json bands are compact on disk and are left
  // alone -- see the header.)
  let filesTouched = 0;
  let rowsTouched = 0;
  const fileProblems: string[] = [];
  for (const pid of Object.keys(PAPERS)) {
    const path = dataPath(pid, "questions");
    const raw = readFileSync(path, "utf8");
    const list = JSON.parse(raw) as any[];
    let n = 0;
    for (const q of list) {
      if (q?.chapter !== CHAPTER) continue;
      const to = byKey.get(`${pid}#${Number(q.number)}`);
      if (!to) { fileProblems.push(`NO DB ROW ${pid} Q${q.number} subtopic="${q.subtopic}"`); continue; }
      if (q.subtopic !== to) { q.subtopic = to; n++; }
    }
    if (n === 0) continue;
    filesTouched++;
    rowsTouched += n;
    if (APPLY) {
      const crlf = raw.includes("\r\n");
      const tnl = /\n$/.test(raw);
      let out = JSON.stringify(list, null, 2);
      if (tnl) out += "\n";
      if (crlf) out = out.replace(/\n/g, "\r\n");
      writeFileSync(path, out, "utf8");
    }
  }
  if (fileProblems.length) die(`${fileProblems.length} data row(s) do not join to the bank`, fileProblems);
  console.log(`\n[3/3] questions.json: ${rowsTouched} row(s) across ${filesTouched} file(s)${APPLY ? " written" : ""}`);

  console.log(
    APPLY
      ? "\nDONE. Next: flip strictSubtopics on at merge.ts + commit.ts, then npm run notes:order."
      : "\nDRY RUN COMPLETE. Nothing written."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
