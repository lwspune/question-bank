/**
 * GATE lane, step 5: a helper's blind draft + the main session's settlement -> the transcription
 * that commits, scripts/gate/data/<paper>.questions.json.
 *
 *   npx tsx scripts/gate/assemble.ts 2025-cs1
 *
 * Reads <ROOT>/blind/<paper>/derived.json (the draft) and data/<paper>.settle.json (optional:
 * the main session's edits, per question number, applied over the draft field by field). The
 * settlement file is the record of what a person changed and why (`why` is never shown to a
 * student); the draft is never edited in place. Drops the blind-only fields (answer,
 * confidence, notes, figure hints): the committed answer is always the organising IIT's key.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { UceedPaper, UceedQuestion } from "../uceed/lib";
import { DATA, ROOT } from "./config";
import { gateSitting } from "./lib";

type Draft = UceedQuestion & { context?: string | null; answer?: string; confidence?: string; notes?: string | null; figureFiles?: string[]; figureBox?: unknown };
type Settle = Record<string, Partial<UceedQuestion & { context: string | null }> & { why: string }>;

const paper = process.argv[2];
if (!paper) throw new Error("usage: assemble.ts <year>-cs<set>");
const { year } = gateSitting(paper);
const draft: { questions: Draft[] } = JSON.parse(readFileSync(join(ROOT, "blind", paper, "derived.json"), "utf8"));
const settleFile = join(DATA, `${paper}.settle.json`);
const settle: Settle = existsSync(settleFile) ? JSON.parse(readFileSync(settleFile, "utf8")) : {};

const questions = draft.questions
  .sort((a, b) => a.n - b.n)
  .map((d) => {
    const { answer: _a, confidence: _c, notes: _n, figureFiles: _f, figureBox: _b, ...q } = d;
    const s = settle[String(d.n)];
    if (!s) return q;
    // Figure hints are figures.py's business, never the transcription's.
    const { why: _why, figureFiles: _sf, figureBox: _sb, figureOptions: _so, ...edit } = s as typeof s & {
      figureFiles?: unknown;
      figureBox?: unknown;
      figureOptions?: unknown;
    };
    return { ...q, ...edit };
  });
const unknown = Object.keys(settle).filter((n) => !questions.some((q) => String(q.n) === n));
if (unknown.length) throw new Error(`settle.json names questions not in the draft: ${unknown.join(", ")}`);

const out: UceedPaper = { year, questions };
writeFileSync(join(DATA, `${paper}.questions.json`), JSON.stringify(out, null, 1) + "\n");
console.log(`${paper}: ${questions.length} questions -> data/${paper}.questions.json (${Object.keys(settle).length} settled by hand)`);
