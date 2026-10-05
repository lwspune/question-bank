/**
 * The dash-tell probe: em dashes in the text a VISITOR reads, per source file.
 *
 * Why the em dash at all: on 2026-09-16 a user said the site "looks like
 * written by AI", and the bank holds its own human baseline. Printed exam
 * stems (UPSC/NTA/Balbharati, professionally edited) run 0.11 em dashes per
 * 1,000 words; our /notes prose ran 16.6 and /guide 24.0. Our readers type on
 * phone keyboards that have no em dash, so a mark they never produce reads as
 * machine-made. The dash is a symptom of a rhythm ("noun phrase, dash, list
 * of three"), which is why a spaced en dash or a spaced "--" is counted too:
 * swapping the mark keeps the rhythm and fixes nothing.
 *
 * Reads with the TypeScript PARSER (createSourceFile, no program), so comments
 * are never counted and a whole-src scan takes ~2-3 s. What is NOT visible
 * text is skipped by name: imports, technical JSX attributes and object keys,
 * console calls, string literal types.
 *
 * Consumers: scripts/audit-voice.ts (the report) and
 * tests/voice-ratchet.test.ts (no file may gain a dash). Spec:
 * tests/voice-probe.test.ts.
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

/** Em dash anywhere; en dash or double hyphen only when spaced like a dash. */
const DASH_TELL = /—| – | -- /g;

const WORD = /[A-Za-z][A-Za-z'’-]*/g;

/** A string that is ONLY a dash is an empty-cell placeholder, not prose. */
const PLACEHOLDER = /^\s*[—–]\s*$/;

/** JSX attributes that carry code, not words. Anything starting `data-` too. */
const SKIP_ATTRS = new Set([
  "className", "class", "href", "key", "id", "src", "type", "name", "role", "rel", "target",
  "variant", "size", "as", "htmlFor", "method", "action", "d", "viewBox", "fill", "stroke",
  "transform", "points", "prefetch", "mode", "align", "side", "inputMode", "autoComplete",
  "pattern", "strokeLinecap", "strokeLinejoin", "fontFamily", "dominantBaseline", "textAnchor",
]);

/** Object keys whose values are identifiers, paths or math, never prose. */
const SKIP_KEYS = new Set([
  "slug", "href", "id", "latex", "className", "route", "subjectRoute", "chapterSlug",
  "examSlug", "pyqExampleId", "questionId", "icon", "key", "path", "url", "src", "pattern",
]);

export type VisibleString = { text: string; line: number; jsxText?: true };
export type DashHit = { line: number; text: string };
export type FileScan = { dashes: number; words: number; hits: DashHit[] };
export type BaselineChange = { file: string; was: number; now: number };

export function countDashTells(text: string): number {
  return (text.match(DASH_TELL) ?? []).length;
}

export function countWords(text: string): number {
  return (text.match(WORD) ?? []).length;
}

function nameText(name: ts.Node): string {
  return name.getText().replace(/^["']|["']$/g, "");
}

/** Every string a visitor could read, in source order, with its 1-based line. */
export function extractVisibleStrings(source: string, fileName: string): VisibleString[] {
  const kind = fileName.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, kind);
  const out: VisibleString[] = [];
  const lineOf = (n: ts.Node) => sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;

  const visit = (n: ts.Node): void => {
    if (ts.isImportDeclaration(n) || ts.isExportDeclaration(n) || ts.isLiteralTypeNode(n)) return;
    if (ts.isJsxAttribute(n)) {
      const attr = nameText(n.name);
      if (SKIP_ATTRS.has(attr) || attr.startsWith("data-")) return;
    }
    if (ts.isPropertyAssignment(n)) {
      if (SKIP_KEYS.has(nameText(n.name))) return;
      visit(n.initializer); // the key itself is never read
      return;
    }
    if (ts.isCallExpression(n)) {
      const callee = n.expression.getText(sf);
      if (callee.startsWith("console.") || callee === "require" || n.expression.kind === ts.SyntaxKind.ImportKeyword) return;
    }
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      out.push({ text: n.text, line: lineOf(n) });
    } else if (ts.isTemplateExpression(n)) {
      out.push({ text: n.head.text, line: lineOf(n.head) });
      for (const span of n.templateSpans) {
        visit(span.expression);
        out.push({ text: span.literal.text, line: lineOf(span.literal) });
      }
      return;
    } else if (ts.isJsxText(n)) {
      if (n.text.trim()) out.push({ text: n.text, line: lineOf(n), jsxText: true });
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return out;
}

export function scanSource(source: string, fileName: string): FileScan {
  const scan: FileScan = { dashes: 0, words: 0, hits: [] };
  for (const s of extractVisibleStrings(source, fileName)) {
    scan.words += countWords(s.text);
    // A lone dash VALUE is a placeholder; a lone dash in JSX text sits
    // between two rendered values and is read as a separator.
    if (!s.jsxText && PLACEHOLDER.test(s.text)) continue;
    const n = countDashTells(s.text);
    if (n) {
      scan.dashes += n;
      scan.hits.push({ line: s.line, text: s.text });
    }
  }
  return scan;
}

/**
 * Both directions fail the ratchet: a rise is new AI rhythm, and a drop left
 * unrecorded would let a later edit add dashes back up to the old count.
 */
export function compareToBaseline(
  current: Record<string, number>,
  baseline: Record<string, number>
): { increased: BaselineChange[]; decreased: BaselineChange[] } {
  const increased: BaselineChange[] = [];
  const decreased: BaselineChange[] = [];
  const files = [...new Set([...Object.keys(current), ...Object.keys(baseline)])].sort();
  for (const file of files) {
    const was = baseline[file] ?? 0;
    const now = current[file] ?? 0;
    if (now > was) increased.push({ file, was, now });
    else if (now < was) decreased.push({ file, was, now });
  }
  return { increased, decreased };
}

/** Repo-relative, forward-slash paths of every .ts/.tsx under `dir`, minus generated files. */
export function listSourceFiles(repoRoot: string, dir = "src"): string[] {
  const out: string[] = [];
  const walk = (rel: string) => {
    for (const entry of fs.readdirSync(path.join(repoRoot, rel), { withFileTypes: true })) {
      const child = `${rel}/${entry.name}`;
      if (entry.isDirectory()) walk(child);
      else if (/\.tsx?$/.test(entry.name) && !/\.(generated|d)\.ts$/.test(entry.name)) out.push(child);
    }
  };
  walk(dir);
  return out.sort();
}

export function scanTree(repoRoot: string, dir = "src"): Record<string, FileScan> {
  const out: Record<string, FileScan> = {};
  for (const file of listSourceFiles(repoRoot, dir)) {
    out[file] = scanSource(fs.readFileSync(path.join(repoRoot, file), "utf8"), file);
  }
  return out;
}

/** The ratchet's shape: file → dash count, files with none left out. */
export function toBaseline(scans: Record<string, FileScan>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [file, s] of Object.entries(scans)) if (s.dashes) out[file] = s.dashes;
  return out;
}
