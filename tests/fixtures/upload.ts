/**
 * Builds .xlsx test fixtures in memory (no disk I/O) so tests stay self-contained.
 */
import * as XLSX from "xlsx";

export const HEADER = [
  "Q",
  "Subject",
  "Course",
  "Chapter",
  "Subtopic",
  "Question Context",
  "Question",
  "OptionA",
  "OptionB",
  "OptionC",
  "OptionD",
  "Answer",
  "Solution",
  "Difficulty Level",
];

type Row = (string | number | undefined)[];

export const GOOD_ROWS: Row[] = [
  [
    1,
    "Physics",
    "MHT-CET",
    "Optics (Ray)",
    "Lens Formula and Magnification",
    "",
    "A convex lens of focal length 1/3 m forms a real image. Find the object distance.",
    "0.5 m",
    "0.166 m",
    "0.33 m",
    "1 m",
    "A",
    "Apply 1/v - 1/u = 1/f",
    "Moderate",
  ],
  [
    2,
    "Physics",
    "MHT-CET",
    "Superposition of Waves",
    "Resonance and Tuning Forks",
    "",
    "The frequency of a tuning fork is 256 Hz. It will resonate with another fork of frequency",
    "256 Hz",
    "512 Hz",
    "754 Hz",
    "768 Hz",
    "C",
    "Resonance occurs at integer ratios.",
    "Easy",
  ],
  [
    3,
    "Chemistry",
    "MHT-CET",
    "Chemical Thermodynamics",
    "Enthalpy",
    "",
    "What is the standard enthalpy of formation of water?",
    "-285.8 kJ/mol",
    "-241.8 kJ/mol",
    "0 kJ/mol",
    "+285.8 kJ/mol",
    "A",
    "Liquid water at standard conditions.",
    "Hard",
  ],
  [
    4,
    "Maths",
    "MHT-CET",
    "Differentiation",
    "Chain Rule",
    "",
    "d/dx of sin(2x) is",
    "cos(2x)",
    "2 cos(2x)",
    "-cos(2x)",
    "-2 cos(2x)",
    "B",
    "Chain rule.",
    "Easy",
  ],
  [
    5,
    "Maths",
    "MHT-CET",
    "Differentiation",
    "Chain Rule",
    "",
    "d/dx of cos(3x) is",
    "sin(3x)",
    "-sin(3x)",
    "3 sin(3x)",
    "-3 sin(3x)",
    "D",
    "Chain rule on cosine flips sign.",
    "Easy",
  ],
];

export function goodXlsxBuffer(): Buffer {
  return buildXlsxBuffer(HEADER, GOOD_ROWS);
}

export function malformedHeaderXlsxBuffer(): Buffer {
  // Header missing the "Answer" column entirely.
  const malformedHeader = HEADER.filter((h) => h !== "Answer");
  const rows = GOOD_ROWS.map((r) => r.filter((_, i) => HEADER[i] !== "Answer"));
  return buildXlsxBuffer(malformedHeader, rows);
}

export function customXlsxBuffer(rows: Row[]): Buffer {
  return buildXlsxBuffer(HEADER, rows);
}

function buildXlsxBuffer(header: string[], rows: Row[]): Buffer {
  const aoa: (string | number | undefined)[][] = [header, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
}
