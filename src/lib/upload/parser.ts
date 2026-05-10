import * as XLSX from "xlsx";

export type ParsedRow = {
  sourceRow: number;
  questionNumber?: string;
  subject: string;
  chapter: string;
  subtopic?: string;
  context?: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
  difficulty: string;
  solution?: string;
};

export type ParseResult = { rows: ParsedRow[] };

const REQUIRED_HEADERS = [
  "Subject",
  "Chapter",
  "Question",
  "OptionA",
  "OptionB",
  "OptionC",
  "OptionD",
  "Answer",
  "Difficulty Level",
];

export function parseXlsx(buffer: Buffer | ArrayBuffer | Uint8Array): ParseResult {
  const wb = XLSX.read(buffer, { type: "buffer" });
  const sheetName = wb.SheetNames[0];
  if (!sheetName) throw new Error("Workbook contains no sheets");
  const sheet = wb.Sheets[sheetName];

  const aoa = XLSX.utils.sheet_to_json<(string | number | undefined)[]>(sheet, {
    header: 1,
    defval: "",
    blankrows: false,
  });
  if (aoa.length === 0) throw new Error("Sheet is empty");

  const header = aoa[0].map((h) => String(h ?? "").trim());
  const missing = REQUIRED_HEADERS.filter((h) => !header.includes(h));
  if (missing.length > 0) {
    throw new Error(`Missing required header columns: ${missing.join(", ")}`);
  }

  const idx = (col: string) => header.indexOf(col);
  const cellOf = (r: (string | number | undefined)[], col: string): string => {
    const v = r[idx(col)];
    return v == null ? "" : String(v).trim();
  };
  const optionalOf = (
    r: (string | number | undefined)[],
    col: string
  ): string | undefined => {
    if (idx(col) === -1) return undefined;
    const v = cellOf(r, col);
    return v.length > 0 ? v : undefined;
  };

  const rows: ParsedRow[] = [];
  for (let i = 1; i < aoa.length; i++) {
    const r = aoa[i];
    rows.push({
      sourceRow: i + 1,
      questionNumber: optionalOf(r, "Q"),
      subject: cellOf(r, "Subject"),
      chapter: cellOf(r, "Chapter"),
      subtopic: optionalOf(r, "Subtopic"),
      context: optionalOf(r, "Question Context"),
      question: cellOf(r, "Question"),
      optionA: cellOf(r, "OptionA"),
      optionB: cellOf(r, "OptionB"),
      optionC: cellOf(r, "OptionC"),
      optionD: cellOf(r, "OptionD"),
      answer: cellOf(r, "Answer"),
      difficulty: cellOf(r, "Difficulty Level"),
      solution: optionalOf(r, "Solution"),
    });
  }

  return { rows };
}
