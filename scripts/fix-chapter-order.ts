/**
 * Put board subjects' chapters in textbook order (owner OK: seven on 2026-10-26,
 * four more, CBSE 11 and MH Class 11 Physics and Chemistry, on 2026-10-27).
 * Re-running is safe: a subject already in order moves nothing.
 *
 *   npx tsx scripts/fix-chapter-order.ts            # dry run: old -> new per chapter
 *   npx tsx scripts/fix-chapter-order.ts --apply    # writes; saves the old values first
 *
 * These subjects carried the order their chapters were loaded in
 * (`chapters.order_index`), which /board, the /browse chapter list, V's board
 * practice tests and the Repeated PYQs books all read as the textbook's. Only
 * that one number per chapter changes. The old values go to
 * backups/chapter-order-<timestamp>.json, with the SQL that restores them.
 *
 * Where each order comes from:
 * - CBSE (NCERT): the books' solved examples are numbered by chapter
 *   ("Eg 7.1" is chapter 7); each subject read 1..N with no gap or repeat.
 * - Maharashtra HSC 12 and Class 11 (Balbharati): the chapter PDFs in
 *   scripts/stateboard/config.ts and scripts/mh-sb-11/config.ts are named by
 *   their book number ("01. Rotational Dynamics.pdf").
 * Retired "[Outdated]" chapters stay after the book's (lib/chapterOrder).
 */
import { join } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { planChapterOrder, type ChapterRow } from "./lib/chapterOrder";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const ORDERS: { exam: string; subject: string; chapters: string[] }[] = [
  {
    exam: "CBSE Class 11",
    subject: "Physics",
    chapters: [
      "Units and Measurement",
      "Motion in a Straight Line",
      "Motion in a Plane",
      "Laws of Motion",
      "Work, Energy and Power",
      "System of Particles and Rotational Motion",
      "Gravitation",
      "Mechanical Properties of Solids",
      "Mechanical Properties of Fluids",
      "Thermal Properties of Matter",
      "Thermodynamics",
      "Kinetic Theory",
      "Oscillations",
      "Waves",
    ],
  },
  {
    exam: "CBSE Class 11",
    subject: "Chemistry",
    chapters: [
      "Some Basic Concepts of Chemistry",
      "Structure of Atom",
      "Classification of Elements and Periodicity in Properties",
      "Chemical Bonding and Molecular Structure",
      "Thermodynamics",
      "Equilibrium",
      "Redox Reactions",
      "Organic Chemistry – Some Basic Principles and Techniques",
      "Hydrocarbons",
    ],
  },
  {
    exam: "Maharashtra State Board Class 11",
    subject: "Physics",
    chapters: [
      "Units and Measurements",
      "Mathematical Methods",
      "Motion in a Plane",
      "Laws of Motion",
      "Gravitation",
      "Mechanical Properties of Solids",
      "Thermal Properties of Matter",
      "Sound",
      "Optics",
      "Electrostatics",
      "Electric Current Through Conductors",
      "Magnetism",
      "Electromagnetic Waves and Communication System",
      "Semiconductors",
    ],
  },
  {
    exam: "Maharashtra State Board Class 11",
    subject: "Chemistry",
    chapters: [
      "Some Basic Concepts of Chemistry",
      "Introduction to Analytical Chemistry",
      "Some Analytical Techniques",
      "Structure of Atom",
      "Chemical Bonding",
      "Redox Reactions",
      "Modern Periodic Table",
      "Elements of Group 1 and 2",
      "Elements of Group 13, 14 and 15",
      "States of Matter",
      "Adsorption and Colloids",
      "Chemical Equilibrium",
      "Nuclear Chemistry and Radioactivity",
      "Basic Principles of Organic Chemistry",
      "Hydrocarbons",
      "Chemistry in Everyday Life",
    ],
  },
  {
    exam: "CBSE Class 12",
    subject: "Physics",
    chapters: [
      "Electric Charges and Fields",
      "Electrostatic Potential and Capacitance",
      "Current Electricity",
      "Moving Charges and Magnetism",
      "Magnetism and Matter",
      "Electromagnetic Induction",
      "Alternating Current",
      "Electromagnetic Waves",
      "Ray Optics and Optical Instruments",
      "Wave Optics",
      "Dual Nature of Radiation and Matter",
      "Atoms",
      "Nuclei",
      "Semiconductor Electronics: Materials, Devices and Simple Circuits",
    ],
  },
  {
    exam: "CBSE Class 12",
    subject: "Chemistry",
    chapters: [
      "Solutions",
      "Electrochemistry",
      "Chemical Kinetics",
      "The d-and f-Block Elements",
      "Coordination Compounds",
      "Haloalkanes and Haloarenes",
      "Alcohols, Phenols and Ethers",
      "Aldehydes, Ketones and Carboxylic Acids",
      "Amines",
      "Biomolecules",
    ],
  },
  {
    exam: "CBSE Class 10",
    subject: "Mathematics",
    chapters: [
      "Real Numbers",
      "Polynomials",
      "Pair of Linear Equations in Two Variables",
      "Quadratic Equations",
      "Arithmetic Progressions",
      "Triangles",
      "Coordinate Geometry",
      "Introduction to Trigonometry",
      "Some Applications of Trigonometry",
      "Circles",
      "Areas Related to Circles",
      "Surface Areas and Volumes",
      "Statistics",
      "Probability",
    ],
  },
  {
    exam: "CBSE Class 10",
    subject: "Science",
    chapters: [
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Metals and Non-metals",
      "Carbon and its Compounds",
      "Life Processes",
      "Control and Coordination",
      "How do Organisms Reproduce?",
      "Heredity",
      "Light — Reflection and Refraction",
      "The Human Eye and the Colourful World",
      "Electricity",
      "Magnetic Effects of Electric Current",
      "Our Environment",
    ],
  },
  {
    exam: "Maharashtra HSC Class 12",
    subject: "Physics",
    chapters: [
      "Rotational Dynamics",
      "Mechanical Properties of Fluids",
      "Kinetic Theory of Gases and Radiation",
      "Thermodynamics",
      "Oscillations",
      "Superposition of Waves",
      "Wave Optics",
      "Electrostatics",
      "Current Electricity",
      "Magnetic Fields due to Electric Current",
      "Magnetic Materials",
      "Electromagnetic Induction",
      "AC Circuits",
      "Dual Nature of Radiation and Matter",
      "Structure of Atoms and Nuclei",
      "Semiconductor Devices",
    ],
  },
  {
    exam: "Maharashtra HSC Class 12",
    subject: "Chemistry",
    chapters: [
      "Solid State",
      "Solutions",
      "Ionic Equilibria",
      "Chemical Thermodynamics",
      "Electrochemistry",
      "Chemical Kinetics",
      "Elements of Groups 16, 17 and 18",
      "Transition and Inner Transition Elements",
      "Coordination Compounds",
      "Halogen Derivatives",
      "Alcohols, Phenols and Ethers",
      "Aldehydes, Ketones and Carboxylic Acids",
      "Amines",
      "Biomolecules",
      "Introduction to Polymer Chemistry",
      "Green Chemistry and Nanochemistry",
    ],
  },
  {
    exam: "Maharashtra HSC Class 12",
    subject: "Geography",
    chapters: [
      "Population: Part 1",
      "Population: Part 2",
      "Human Settlements and Land Use",
      "Primary Economic Activities",
      "Secondary Economic Activities",
      "Tertiary Economic Activities",
      "Region and Regional Development",
      "Geography: Nature and Scope",
    ],
  },
];

const APPLY = process.argv.includes("--apply");

async function main() {
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const allMoves: (ChapterRow & { to: number; subject: string })[] = [];
  for (const o of ORDERS) {
    const { data: exam } = await admin.from("exams").select("id").eq("name", o.exam).single();
    const { data: subject } = await admin.from("subjects").select("id").eq("exam_id", exam!.id).eq("name", o.subject).single();
    const { data: chapters, error } = await admin.from("chapters").select("id, name, order_index").eq("subject_id", subject!.id);
    if (error) throw new Error(`${o.exam} ${o.subject}: ${error.message}`);
    // Throws before anything is written if the order and the subject disagree.
    const plan = planChapterOrder(chapters as ChapterRow[], o.chapters);
    console.log(`\n${o.exam} · ${o.subject}  (${plan.filter((m) => m.from !== m.to).length} of ${plan.length} move)`);
    for (const m of plan) console.log(`  ${String(m.from).padStart(2)} -> ${String(m.to).padStart(2)}  ${m.name}`);
    allMoves.push(...plan.map((m) => ({ id: m.id, name: m.name, order_index: m.from, to: m.to, subject: `${o.exam} ${o.subject}` })));
  }

  const changed = allMoves.filter((m) => m.order_index !== m.to);
  console.log(`\n${changed.length} of ${allMoves.length} chapters change.`);
  if (!APPLY) return console.log("DRY RUN: nothing written. Re-run with --apply.");

  mkdirSync(join(process.cwd(), "backups"), { recursive: true });
  const file = join(process.cwd(), "backups", `chapter-order-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  const restore = changed.map((m) => `update chapters set order_index = ${m.order_index} where id = '${m.id}';`).join("\n");
  writeFileSync(file, JSON.stringify({ moves: changed, restoreSql: restore }, null, 2));
  console.log(`old values saved: ${file}`);
  for (const m of changed) {
    const { error } = await admin.from("chapters").update({ order_index: m.to }).eq("id", m.id).eq("order_index", m.order_index);
    if (error) throw new Error(`${m.subject} / ${m.name}: ${error.message}`);
  }
  console.log(`APPLIED: ${changed.length} chapters reordered.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
