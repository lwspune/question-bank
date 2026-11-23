/**
 * GATE lane constants. README.md has the method; lib.ts the pure core.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { GATE_CS_SUBJECTS } from "../../src/lib/mocks/blueprints";

export { ORG_ID, CREATED_BY } from "../practice/config";

/** The exams.name of the row every GATE CS question hangs off. */
export const EXAM_NAME = "GATE CS";

/** Sources, pages, figures and blind-solve scratch live outside the repo (nothing there is committed). */
export const ROOT = "C:\\tmp\\PYQPs\\GATE\\CS";
export const DATA = join(__dirname, "data");

/** A question's figure: figures/<paper>/Q<nn>.png, or .jpg when the PNG was over storage's 1 MB. */
export const figurePath = (paper: string, n: number) => {
  const stem = join(ROOT, "figures", paper, `Q${String(n).padStart(2, "0")}`);
  return existsSync(`${stem}.jpg`) ? `${stem}.jpg` : `${stem}.png`;
};

/**
 * Chapters per subject: the official syllabus's own items (GATE 2026 CS syllabus, IIT Guwahati;
 * General Aptitude from the GA syllabus), grouped as GATE preparation groups them. A
 * transcription naming any other chapter is refused (planGatePaper), so helpers cannot
 * invent near-duplicates ("Graphs" vs "Graph Theory"). Subtopics stay free text, settled
 * by the main session.
 */
export const CATALOG: Record<(typeof GATE_CS_SUBJECTS)[number], string[]> = {
  "General Aptitude": ["Verbal Aptitude", "Quantitative Aptitude", "Analytical Aptitude", "Spatial Aptitude"],
  "Engineering Mathematics": [
    "Mathematical Logic",
    "Sets, Relations, Functions and Groups",
    "Graph Theory",
    "Combinatorics",
    "Linear Algebra",
    "Calculus",
    "Probability and Statistics",
  ],
  "Digital Logic": [
    "Boolean Algebra and Minimization",
    "Combinational Circuits",
    "Sequential Circuits",
    "Number Representations and Computer Arithmetic",
  ],
  "Computer Organization and Architecture": [
    "Machine Instructions and Addressing Modes",
    "ALU, Data Path and Control Unit",
    "Instruction Pipelining",
    "Memory Hierarchy and Cache",
    "I/O Interface, Interrupts and DMA",
  ],
  "Programming and Data Structures": [
    "Programming in C",
    "Recursion",
    "Arrays, Stacks, Queues and Linked Lists",
    "Trees, Binary Search Trees and Heaps",
    "Graphs",
  ],
  Algorithms: [
    "Searching, Sorting and Hashing",
    "Asymptotic Complexity",
    "Greedy Algorithms",
    "Dynamic Programming",
    "Divide and Conquer",
    "Graph Traversals, Spanning Trees and Shortest Paths",
  ],
  "Theory of Computation": [
    "Regular Expressions and Finite Automata",
    "Context-free Grammars and Pushdown Automata",
    "Regular and Context-free Languages",
    "Turing Machines and Undecidability",
  ],
  "Compiler Design": [
    "Lexical Analysis",
    "Parsing",
    "Syntax-directed Translation",
    "Runtime Environments",
    "Intermediate Code Generation",
    "Code Optimisation and Data Flow Analysis",
  ],
  "Operating System": [
    "System Calls, Processes and Threads",
    "Concurrency and Synchronization",
    "Deadlock",
    "CPU and I/O Scheduling",
    "Memory Management and Virtual Memory",
    "File Systems",
  ],
  Databases: [
    "ER Model",
    "Relational Algebra, Tuple Calculus and SQL",
    "Integrity Constraints and Normal Forms",
    "File Organization and Indexing",
    "Transactions and Concurrency Control",
  ],
  "Computer Networks": [
    "Layering, OSI and TCP/IP",
    "Switching",
    "Data Link Layer and MAC",
    "Routing",
    "IP Addressing, Fragmentation and Support Protocols",
    "Transport Layer, TCP and UDP",
    "Application Layer Protocols",
  ],
};

/** Each Wave 1 sitting's organising institute (the credit on every row, and the key's authority). */
export const ORGANISER: Record<number, string> = {
  2024: "IISc Bengaluru",
  2025: "IIT Roorkee",
  2026: "IIT Guwahati",
};
