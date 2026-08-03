/**
 * Move the 37 classifiable questions out of the "Organic Reaction Mechanisms"
 * catch-all into the chapter their own solution names.
 *
 * WHY THE CATCH-ALL EXISTS: these stems carry no topic signal — "the major
 * product of the following reaction is:" with the chemistry in an attached
 * image. The classification agents had nothing to go on and correctly reached
 * for a bucket rather than guessing. The SOLUTION text is the signal, and every
 * ruling below was read from it.
 *
 * WHY BOTH SIDES ARE WRITTEN: scripts/jee/papers/*.json is the source of record.
 * A DB-only fix is silently reverted the next time commit.ts re-ingests from
 * those files, so the paper file is updated first and the DB is brought to match.
 *
 * 10 questions deliberately stay behind: 4 Match-Lists and 2 three-chapter
 * sequences that span by construction, and 4 whose stored solution is too thin
 * to classify on (one is literally "(a)"). Filing those under a chapter inferred
 * from a fragment would be worse than an honest catch-all.
 *
 *   npx tsx scripts/jee/reclassify-orm.ts           # dry run
 *   npx tsx scripts/jee/reclassify-orm.ts --apply
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const FROM_CHAPTER = "Organic Reaction Mechanisms";

/** `<sourceFile>#<questionNumber>` -> [chapter, subtopic, evidence from the solution]. */
const MOVES: Record<string, [string, string, string]> = {
  // ---- Amines ----
  "JEE_2021_Paper1.docx#45": ["Amines", "Diazonium Salts", "aniline + NaNO2/HCl -> benzenediazonium; KCN displaces N2"],
  "JEE_2021_Paper5.docx#37": ["Amines", "Diazonium Salts", "aniline diazotised at 273-278 K"],
  "JEE_2021_Paper8.docx#46": ["Amines", "Diazonium Salts", "arenediazonium + ethanol, reductive deamination"],
  "JEE_2021_Paper9.docx#31": ["Amines", "Diazonium Salts", "diazotisation then para azo coupling"],
  "JEE_2021_Paper10.docx#41": ["Amines", "Aromatic Amines and EAS", "nitration of aniline; anilinium vs -NH2 directing"],
  "JEE_2021_Paper12.docx#35": ["Amines", "Preparation of Amines", "Hofmann bromamide degradation of benzamide"],
  "JEE_2021_Paper11.docx#37": ["Amines", "Separation of Amines", "carbylamine test, 1° amine + CHCl3/KOH"],
  "JEE_2026_Apr02_S1.docx#42": ["Amines", "Separation of Amines", "carbylamine test distinguishes 1° from 2°"],
  "JEE_2026_Jan23_S1.docx#43": ["Amines", "Separation of Amines", "carbylamine test gives cyclohexyl isocyanide"],

  // ---- Aldehydes, Ketones and Carboxylic Acids ----
  "JEE_2021_Paper10.docx#44": ["Aldehydes, Ketones and Carboxylic Acids", "Reactions and Products", "cyclopentanone aldol condensation"],
  "JEE_2021_Paper12.docx#38": ["Aldehydes, Ketones and Carboxylic Acids", "Reactions and Products", "intramolecular aldol via enolate"],
  "JEE_2021_Paper7.docx#33": ["Aldehydes, Ketones and Carboxylic Acids", "Reactions and Products", "glycol protects the ketone as a cyclic acetal"],
  "JEE_2021_Paper18.docx#35": ["Aldehydes, Ketones and Carboxylic Acids", "Carboxylic Acid Reactions", "SOCl2/MeOH esterifies the -COOH"],
  "JEE_2021_Paper9.docx#37": ["Aldehydes, Ketones and Carboxylic Acids", "Carboxylic Acid Reactions", "nitrile hydrolysis via the amide to the acid"],
  "JEE_2021_Paper4.docx#43": ["Aldehydes, Ketones and Carboxylic Acids", "Preparation of Aldehydes", "hydroformylation (oxo process) of 1-butene"],
  "JEE_2026_Apr08_S2.docx#47": ["Aldehydes, Ketones and Carboxylic Acids", "Preparation of Aldehydes", "Gattermann-Koch formylation to benzaldehyde"],
  "JEE_2021_Paper6.docx#50": ["Aldehydes, Ketones and Carboxylic Acids", "Preparation of Carbonyl Compounds", "PhMgBr + nitrile -> ketimine -> ketone"],
  "JEE_2021_Paper5.docx#34": ["Aldehydes, Ketones and Carboxylic Acids", "Reduction Reactions", "DIBAL reduces the cyclic ester"],

  // ---- Hydrocarbons ----
  "JEE_2021_Paper4.docx#38": ["Hydrocarbons", "Addition Reactions of Alkenes", "Markovnikov protonation of the terminal alkene"],
  "JEE_2021_Paper11.docx#40": ["Hydrocarbons", "Addition Reactions of Alkenes", "cold KMnO4 syn-hydroxylation of cyclohexene"],
  "JEE_2021_Paper18.docx#36": ["Hydrocarbons", "Addition Reactions of Alkenes", "isoprene conjugated diene, 1,4-HBr addition"],
  "JEE_2021_Paper6.docx#32": ["Hydrocarbons", "Reactions of Aromatic Hydrocarbons", "side-chain oxidation -CH3 -> -COOH"],
  "JEE_2021_Paper9.docx#45": ["Hydrocarbons", "Reactions of Aromatic Hydrocarbons", "alkaline KMnO4 benzylic oxidation"],
  "JEE_2026_Apr02_S2.docx#43": ["Hydrocarbons", "Reactions of Aromatic Hydrocarbons", "Br2/AlBr3 on 4-nitroethylbenzene, directing effects"],
  "JEE_2021_Paper6.docx#35": ["Hydrocarbons", "Alkanes", "Cl2/uv free-radical allylic substitution"],
  "JEE_2026_Jan28_S2.docx#33": ["Hydrocarbons", "Alkanes", "Br2/light allylic bromination, tertiary allylic C-H"],

  // ---- Alcohols, Phenols and Ethers ----
  "JEE_2021_Paper1.docx#40": ["Alcohols, Phenols and Ethers", "Chemical Reactions of Alcohols and Acidity", "-OH protonated, 1,2-hydride shift to tertiary cation"],
  "JEE_2021_Paper5.docx#41": ["Alcohols, Phenols and Ethers", "Chemical Reactions of Alcohols and Acidity", "H3PO4 dehydration of 1-methylcyclohexanol, Saytzeff"],
  "JEE_2026_Apr06_S1.docx#42": ["Alcohols, Phenols and Ethers", "Chemical Reactions of Alcohols and Acidity", "Cu/573 K dehydrogenation of tert-butyl alcohol"],
  "JEE_2021_Paper18.docx#39": ["Alcohols, Phenols and Ethers", "Phenols", "phenol -> 2,4,6-tribromophenol vs para in CS2"],
  "JEE_2026_Jan28_S2.docx#31": ["Alcohols, Phenols and Ethers", "Classification of Alcohols and Phenols", "which routes yield an alcohol rather than aldehyde/acid"],

  // ---- Haloalkanes and Haloarenes ----
  "JEE_2021_Paper3.docx#48": ["Haloalkanes and Haloarenes", "Preparation of Alkyl Halides", "Markovnikov HCl addition then Finkelstein with NaI"],
  "JEE_2026_Apr04_S1.docx#40": ["Haloalkanes and Haloarenes", "Preparation of Alkyl Halides", "Finkelstein reaction, NaI in dry acetone"],
  "JEE_2026_Jan21_S1.docx#29": ["Haloalkanes and Haloarenes", "Classification, Nomenclature and Physical Properties", "optically active C4H9Cl must be 2-chlorobutane"],
  // Subtopic APPROXIMATE: Grignard formation is neither substitution nor
  // preparation of a halide, and this chapter has no organometallic subtopic.
  // The CHAPTER is right, which is what the move is for.
  "JEE_2021_Paper1.docx#35": ["Haloalkanes and Haloarenes", "Nucleophilic Substitution", "Mg inserts into both C-Br bonds, di-Grignard"],

  // ---- Organic basics / Biomolecules ----
  "JEE_2021_Paper11.docx#35": ["Organic Chemistry - Some Basic Principles and Techniques", "Electronic Effects and Reaction Intermediates", "carbocation resonance stabilisation, allylic/benzylic"],
  "JEE_2026_Apr06_S2.docx#44": ["Biomolecules", "Carbohydrates", "glucose + HI -> n-hexane, chain-length proof"],
};

type Paper = { sourceFile?: string; classification?: Record<string, { chapter: string; subtopic: string }> };

async function main() {
  const apply = process.argv.includes("--apply");
  const dir = join(process.cwd(), "scripts", "jee", "papers");

  // ---- 1. paper JSONs: the source of record ----
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
  const seen = new Set<string>();
  let jsonEdits = 0;
  const edited: { file: string; body: string }[] = [];

  for (const f of files) {
    const path = join(dir, f);
    const body = readFileSync(path, "utf8");
    const paper = JSON.parse(body) as Paper;
    if (!paper.sourceFile || !paper.classification) continue;
    let touched = false;
    for (const [qn, cls] of Object.entries(paper.classification)) {
      const key = `${paper.sourceFile}#${qn}`;
      const move = MOVES[key];
      if (!move) continue;
      if (cls.chapter === move[0] && cls.subtopic === move[1]) {
        seen.add(key); // already moved by an earlier run
        continue;
      }
      if (cls.chapter !== FROM_CHAPTER) continue;
      seen.add(key);
      cls.chapter = move[0];
      cls.subtopic = move[1];
      touched = true;
      jsonEdits++;
    }
    // Re-serialise with the file's own trailing-newline convention.
    if (touched) edited.push({ file: path, body: JSON.stringify(paper, null, 2) + (body.endsWith("\n") ? "\n" : "") });
  }

  const missing = Object.keys(MOVES).filter((k) => !seen.has(k));
  if (missing.length) {
    console.error(`REFUSING — ${missing.length} mapping key(s) match no paper entry still in ${FROM_CHAPTER}:`);
    for (const m of missing) console.error("  " + m);
    process.exitCode = 1;
    return;
  }
  console.log(`paper JSONs: ${jsonEdits} classification entries in ${edited.length} file(s)`);

  // ---- 2. the DB, brought to match ----
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: chapters, error: chErr } = await db
    .from("chapters")
    .select("id,name,subject_id,subjects!inner(name,exams!inner(name))");
  if (chErr) throw new Error(chErr.message);
  const jeeChem = (chapters ?? []).filter((c: Record<string, unknown>) => {
    const s = c.subjects as { name: string; exams: { name: string } };
    return s?.name === "Chemistry" && /JEE/i.test(s?.exams?.name ?? "");
  }) as unknown as { id: string; name: string; subject_id: string }[];
  const chapterId = new Map(jeeChem.map((c) => [c.name, c.id]));

  const { data: subs, error: sErr } = await db
    .from("subtopics")
    .select("id,name,chapter_id")
    .in("chapter_id", jeeChem.map((c) => c.id));
  if (sErr) throw new Error(sErr.message);
  const subId = new Map((subs ?? []).map((s) => [`${s.chapter_id}|${s.name}`, s.id]));

  const targets: { key: string; chapterId: string; subtopicId: string }[] = [];
  const badTarget: string[] = [];
  for (const [key, [ch, st]] of Object.entries(MOVES)) {
    const cid = chapterId.get(ch);
    const sid = cid ? subId.get(`${cid}|${st}`) : undefined;
    if (!cid || !sid) badTarget.push(`${key} -> ${ch} / ${st}`);
    else targets.push({ key, chapterId: cid, subtopicId: sid });
  }
  if (badTarget.length) {
    console.error(`\nREFUSING — ${badTarget.length} target chapter/subtopic do(es) not exist:`);
    for (const b of badTarget) console.error("  " + b);
    process.exitCode = 1;
    return;
  }
  console.log(`DB targets: all ${targets.length} chapter/subtopic pairs exist (nothing auto-created)`);

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }

  for (const { file, body } of edited) writeFileSync(file, body, "utf8");
  console.log(`wrote ${edited.length} paper file(s)`);

  // Resolve ids ONCE for the whole set, then update by primary key.
  const wanted = new Set(targets.map((t) => t.key));
  const idOf = new Map<string, string>();
  for (const cid of jeeChem.map((c) => c.id)) {
    const { data, error } = await db
      .from("questions")
      .select("id,source_file,question_number")
      .eq("chapter_id", cid);
    if (error) throw new Error(`resolve ids: ${error.message}`);
    for (const r of data ?? []) {
      const k = `${r.source_file}#${r.question_number}`;
      if (wanted.has(k)) idOf.set(k, r.id as string);
    }
  }
  const unresolved = targets.filter((t) => !idOf.has(t.key));
  if (unresolved.length) {
    console.error(`REFUSING — ${unresolved.length} question(s) not found in the JEE Chemistry chapters.`);
    for (const u of unresolved.slice(0, 8)) console.error("  " + u.key);
    process.exitCode = 1;
    return;
  }

  let moved = 0, already = 0;
  for (const t of targets) {
    const id = idOf.get(t.key)!;
    const { data, error } = await db
      .from("questions")
      .update({ chapter_id: t.chapterId, subtopic_id: t.subtopicId })
      .eq("id", id)
      .neq("chapter_id", t.chapterId)
      .select("id");
    if (error) throw new Error(`${t.key}: ${error.message}`);
    if ((data ?? []).length) moved++;
    else already++;
  }
  console.log(`DB: ${moved} moved, ${already} already in place`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
