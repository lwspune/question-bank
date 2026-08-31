/**
 * NDA Mathematics PYQ-MASTER SOURCING INVENTORY.
 *
 *   npx tsx scripts/syllabus/nda-maths-pool.ts
 *
 * For each of NDA Maths' 31 chapters, how deep is the drawable pool across every
 * Maths corpus in the bank? Built to plan a PYQ master book, so the numbers must
 * be USABLE counts, not coverage verdicts.
 *
 * WHY A HAND MAPPING. Exact chapter-name matching hits 3-18 of 31 depending on
 * exam; aggressive normalisation reaches only 4-24. Every exam carries its own
 * taxonomy at its own grain — NDA splits Maths into 31 chapters where CBSE
 * Class 12 uses 13 — so the crosswalk is authored, not inferred.
 *
 * EACH SOURCE CHAPTER MAPS TO EXACTLY ONE NDA CHAPTER. That is deliberate: a
 * many-to-many mapping double-counts. CBSE's single "Integrals" (314 q) covers
 * both NDA Definite and Indefinite Integration, and counting it under both would
 * advertise 628 questions that are really 314 rows you can only use once. Where
 * the single assignment is a judgement call it is marked SPLIT in the notes.
 *
 * The Class 11 / Class 12 split is why CBSE Class 12 alone appears to cover only
 * 4 of 31 NDA chapters: Sets, Complex Numbers, Quadratics, Sequences, Binomial
 * Theorem, Straight Lines, Circles, Conics, Statistics, PnC and Trigonometry are
 * all Class 11. NCERT and State Board columns therefore COMBINE both years.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** source exam -> its chapter -> the NDA chapter it feeds. */
const MAP: Record<string, Record<string, string>> = {
  "JEE Mains": {
    "Three Dimensional Geometry": "3D Geometry",
    "Application of Derivatives": "Application of Derivatives",
    "Application of Integrals": "Applications of Integration",
    "Binomial Theorem": "Binomial Theorem",
    "Complex Numbers": "Complex Numbers",
    "Conic Sections": "Conics",
    "Definite Integration": "Definite Integration",
    "Differential Equations": "Differential Equations",
    "Differentiation": "Differentiation",
    "Relations and Functions": "Functions",
    "Height & Distance": "Height & Distance",
    "Indefinite Integration": "Indefinite Integration",
    "Inverse Trigonometric Functions": "Inverse Trigonometry",
    "Limits and Continuity": "Limits & Continuity",
    "Straight Lines": "Lines",
    "Matrices": "Matrices & Determinants",
    "Determinants": "Matrices & Determinants",
    "Permutations and Combinations": "Permutation & Combination",
    "Probability": "Probability",
    "Properties of Triangle": "Properties of Triangle",
    "Quadratic Equations": "Quadratic Equations",
    "Sequences and Series": "Sequence & Series",
    "Statistics": "Statistics",
    "Trigonometric Equations": "Trigonometric Equations",
    "Trigonometric Identities": "Trigonometric Identities",
    "Vector Algebra": "Vectors",
    // "Mathematical Reasoning" — no NDA Maths chapter; reported as unmapped.
  },
  "MHT-CET": {
    "Line and Plane": "3D Geometry",
    "Applications of Derivative": "Application of Derivatives",
    "Applications of Definite Integral": "Applications of Integration",
    "Binomial Distribution": "Binomial Distribution",
    "Circle": "Circles",
    "Complex Numbers": "Complex Numbers",
    "Conic Sections": "Conics",
    "Definite Integration": "Definite Integration",
    "Differential Equations": "Differential Equations",
    "Differentiation": "Differentiation",
    "Indefinite Integration": "Indefinite Integration",
    "Inverse Trigonometric Functions": "Inverse Trigonometry",
    "Limits": "Limits & Continuity",
    "Straight Line": "Lines",
    "Pair of Straight Lines": "Lines",
    "Determinants and Matrices": "Matrices & Determinants",
    "Permutations and Combinations": "Permutation & Combination",
    "Probability Distribution": "Probability",
    "Quadratic Equations": "Quadratic Equations",
    "Sequences and Series": "Sequence & Series",
    "Sets, Relations and Functions": "Sets & Relations",
    "Measures of Dispersion": "Statistics",
    "Trigonometry - II": "Trigonometric Equations",
    "Trigonometry - I": "Trigonometric Identities",
    "Vectors": "Vectors",
    // "Linear Programming", "Mathematical Logic" — no NDA Maths chapter.
  },
  "CBSE Class 12": {
    "Three Dimensional Geometry": "3D Geometry",
    "Application of Derivatives": "Application of Derivatives",
    "Application of Integrals": "Applications of Integration",
    "Differential Equations": "Differential Equations",
    "Continuity and Differentiability": "Differentiation",   // SPLIT with Limits & Continuity
    "Relations and Functions": "Functions",
    "Integrals": "Indefinite Integration",                    // SPLIT with Definite Integration
    "Inverse Trigonometric Functions": "Inverse Trigonometry",
    "Matrices": "Matrices & Determinants",
    "Determinants": "Matrices & Determinants",
    "Probability": "Probability",
    "Vector Algebra": "Vectors",
    // "Linear Programming" — no NDA Maths chapter.
  },
  "CBSE Class 11": {
    "Binomial Theorem": "Binomial Theorem",
    // NCERT titles this chapter "Complex Numbers and Quadratic Equations" and
    // then teaches NO quadratics (a rationalisation gap recorded in CLAUDE.md),
    // so all 39 q are complex numbers.
    "Complex Numbers and Quadratic Equations": "Complex Numbers",
    "Conic Sections": "Conics",                               // SPLIT with Circles
    "Relations and Functions": "Functions",
    "Limits and Derivatives": "Limits & Continuity",
    "Linear Inequalities": "Linear Inequalities",
    "Straight Lines": "Lines",
    "Permutations and Combinations": "Permutation & Combination",
    "Probability": "Probability",
    "Sequences and Series": "Sequence & Series",
    "Sets": "Sets & Relations",
    "Statistics": "Statistics",
    "Trigonometric Functions": "Trigonometric Identities",    // SPLIT with Trigonometric Equations
    "Introduction to Three Dimensional Geometry": "3D Geometry",
  },
  "Maharashtra HSC Class 12": {
    "Line and Planes": "3D Geometry",
    "Application of Derivatives": "Application of Derivatives",
    "Application of Definite Integration": "Applications of Integration",
    "Binomial Distribution": "Binomial Distribution",
    "Definite Integration": "Definite Integration",
    "Differential Equations": "Differential Equations",
    "Differentiation": "Differentiation",
    "Indefinite Integration": "Indefinite Integration",
    "Pair of Straight Lines": "Lines",
    "Matrices": "Matrices & Determinants",
    "Probability Distributions": "Probability",
    "Trigonometric Functions": "Inverse Trigonometry",
    "Vectors": "Vectors",
    // "Linear Programming", "Mathematical Logic" — no NDA Maths chapter.
  },
  "Maharashtra State Board Class 11": {
    "Binomial Theorem": "Binomial Theorem",
    "Circle": "Circles",
    "Complex Numbers": "Complex Numbers",
    "Conic Sections": "Conics",
    "Continuity": "Limits & Continuity",
    "Limits": "Limits & Continuity",
    "Differentiation": "Differentiation",
    "Functions": "Functions",
    "Determinants and Matrices": "Matrices & Determinants",
    "Straight Line": "Lines",
    "Permutations and Combination": "Permutation & Combination",
    "Probability": "Probability",
    "Sequences and Series": "Sequence & Series",
    "Sets and Relations": "Sets & Relations",
    "Measures of Dispersion": "Statistics",
    "Trigonometry - II": "Trigonometric Equations",
    "Trigonometry - I": "Trigonometric Identities",
    "Angle and its Measurement": "Trigonometric Identities",
  },
  "Maharashtra State Board Class 9": {
    "Sets": "Sets & Relations",
    "Statistics": "Statistics",
    "Co-ordinate Geometry": "Lines",
    // Polynomials / Real Numbers / Ratio & Proportion / Financial Planning /
    // geometry chapters have no NDA Maths chapter — reported as unmapped.
  },
  "Worksheets - 11th+12th": {
    "3D Geometry": "3D Geometry",
    "Applications of Derivatives": "Application of Derivatives",
    "Derivatives": "Differentiation",
    "Binary Numbers": "Binary Numbers",
    "Binomial Theorem": "Binomial Theorem",
    "Circles": "Circles",
    "Complex Numbers": "Complex Numbers",
    "Conics": "Conics",
    "Definite Integration": "Definite Integration",
    "Differential Equations": "Differential Equations",
    "Functions": "Functions",
    "Height and Distance": "Height & Distance",
    "Indefinite Integration": "Indefinite Integration",
    "Inequalities": "Linear Inequalities",
    "Inverse Trigonometry": "Inverse Trigonometry",
    "Limits": "Limits & Continuity",
    "Logarithms": "Logarithms",
    "Matrices and Determinants": "Matrices & Determinants",
    "Permutations and Combinations": "Permutation & Combination",
    "Probability": "Probability",
    "Properties of Triangle": "Properties of Triangle",
    "Quadratic Equations": "Quadratic Equations",
    "Sequence and Series": "Sequence & Series",
    "Sets and Relations": "Sets & Relations",
    "Statistics": "Statistics",
    "Straight Lines": "Lines",
    "Trigonometric Identities": "Trigonometric Identities",
    "Vectors": "Vectors",
    "Angle and Measurement": "Trigonometric Identities",
  },
};

/** Column grouping for the rendered table. */
const COLS: { key: string; exams: string[]; kind?: "pyq" | "practice" }[] = [
  { key: "NDA PYQ", exams: ["NDA"], kind: "pyq" },
  { key: "NDA prac", exams: ["NDA"], kind: "practice" },
  { key: "JEE PYQ", exams: ["JEE Mains"], kind: "pyq" },
  { key: "CET PYQ", exams: ["MHT-CET"], kind: "pyq" },
  { key: "CBSE PYQ", exams: ["CBSE Class 12"], kind: "pyq" },
  { key: "NCERT bk", exams: ["CBSE Class 11", "CBSE Class 12"], kind: "practice" },
  { key: "HSC PYQ", exams: ["Maharashtra HSC Class 12"], kind: "pyq" },
  { key: "SB bk", exams: ["Maharashtra HSC Class 12", "Maharashtra State Board Class 11", "Maharashtra State Board Class 9"], kind: "practice" },
  { key: "Wksht", exams: ["Worksheets - 11th+12th"] },
];

async function main() {
  const c = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: exams } = await c.from("exams").select("id, name");
  const en = new Map((exams ?? []).map((e) => [e.id as string, e.name as string]));
  const { data: subs } = await c.from("subjects").select("id, exam_id").in("name", ["Mathematics", "Maths"]);
  const se = new Map((subs ?? []).map((s) => [s.id as string, en.get(s.exam_id as string) ?? "?"]));
  const ids = (subs ?? []).map((s) => s.id as string);
  const { data: chs } = await c.from("chapters").select("id, name, subject_id").in("subject_id", ids);
  const chMeta = new Map((chs ?? []).map((x) => [x.id as string, {
    name: x.name as string, exam: se.get(x.subject_id as string) ?? "?",
  }]));

  // counts[exam][chapter][kind]
  const counts = new Map<string, Map<string, { pyq: number; practice: number; mcq: number }>>();
  for (let from = 0; ; from += 500) {
    const { data, error } = await c.from("questions")
      .select("chapter_id, question_kind, question_format")
      .in("subject_id", ids).eq("visibility", "PUBLIC").order("id").range(from, from + 499);
    if (error) {
      if (/statement timeout|57014/i.test(error.message)) { from -= 500; continue; }
      throw new Error(error.message);
    }
    for (const r of data ?? []) {
      const m = chMeta.get(r.chapter_id as string);
      if (!m) continue;
      if (!counts.has(m.exam)) counts.set(m.exam, new Map());
      const e = counts.get(m.exam)!;
      if (!e.has(m.name)) e.set(m.name, { pyq: 0, practice: 0, mcq: 0 });
      const cell = e.get(m.name)!;
      if (r.question_kind === "pyq") cell.pyq++; else cell.practice++;
      if (r.question_format !== "subjective" && r.question_format !== "numeric") cell.mcq++;
    }
    if (!data || data.length < 500) break;
  }

  const ndaChapters = [...(counts.get("NDA")?.keys() ?? [])].sort();

  // Fold every source chapter into its NDA chapter.
  const pool = new Map<string, Map<string, { pyq: number; practice: number; mcq: number }>>();
  const unmapped: string[] = [];
  for (const [exam, chapters] of counts) {
    for (const [chapter, cell] of chapters) {
      const target = exam === "NDA" ? chapter : MAP[exam]?.[chapter];
      if (!target) { unmapped.push(`${exam} / ${chapter} (${cell.pyq + cell.practice} q)`); continue; }
      if (!pool.has(target)) pool.set(target, new Map());
      const t = pool.get(target)!;
      if (!t.has(exam)) t.set(exam, { pyq: 0, practice: 0, mcq: 0 });
      const acc = t.get(exam)!;
      acc.pyq += cell.pyq; acc.practice += cell.practice; acc.mcq += cell.mcq;
    }
  }

  const val = (chapter: string, col: typeof COLS[number]): number => {
    let n = 0;
    for (const ex of col.exams) {
      const cell = pool.get(chapter)?.get(ex);
      if (!cell) continue;
      n += col.kind === "pyq" ? cell.pyq : col.kind === "practice" ? cell.practice : cell.pyq + cell.practice;
    }
    return n;
  };

  // ---- render markdown ----
  const head = ["NDA chapter", ...COLS.map((x) => x.key), "TOTAL"];
  console.log(`| ${head.join(" | ")} |`);
  console.log(`|${head.map((_, i) => (i === 0 ? "---" : "---:")).join("|")}|`);

  const totals = new Array(COLS.length).fill(0);
  let grand = 0;
  const rows = ndaChapters.map((ch) => {
    const vals = COLS.map((col) => val(ch, col));
    const tot = vals.reduce((a, b) => a + b, 0);
    vals.forEach((v, i) => (totals[i] += v));
    grand += tot;
    return { ch, vals, tot };
  });
  rows.sort((a, b) => b.tot - a.tot);
  for (const r of rows) {
    console.log(`| ${r.ch} | ${r.vals.map((v) => (v === 0 ? "—" : String(v))).join(" | ")} | **${r.tot}** |`);
  }
  console.log(`| **TOTAL** | ${totals.map((t) => `**${t}**`).join(" | ")} | **${grand}** |`);

  console.log(`\nUNMAPPED source chapters (no NDA Maths home) — ${unmapped.length}:`);
  for (const u of unmapped.sort()) console.log(`  ${u}`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
