/** KaTeX-validate the extracted MCQ math the same way the app splits it. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";

type Rec = {
  questionNumber: number;
  subject: string;
  status: string;
  stem: string;
  options: { label: string; text: string }[] | null;
};

const records: Rec[] = JSON.parse(readFileSync(join(__dirname, "out", "paper1.records.json"), "utf8"));
const mcq = records.filter((r) => r.status === "ok" || r.status === "image_options");

const bad: { q: number; where: string; math: string; err: string }[] = [];
for (const r of mcq) {
  const fields: [string, string][] = [["stem", r.stem]];
  (r.options ?? []).forEach((o) => fields.push([`opt ${o.label}`, o.text]));
  for (const [where, text] of fields) {
    for (const seg of parseLatex(text)) {
      if (seg.type === "text") continue;
      try {
        katex.renderToString(seg.content, { throwOnError: true, strict: false });
      } catch (e) {
        bad.push({ q: r.questionNumber, where, math: seg.content.slice(0, 60), err: String((e as Error).message).replace(/\s+/g, " ").slice(0, 70) });
      }
    }
  }
}

const distinct = new Set(bad.map((b) => b.q));
console.log(`MCQ checked: ${mcq.length} | broken math segments: ${bad.length} | affected questions: ${distinct.size}`);
for (const b of bad) console.log(`Q${b.q} [${b.where}] ${JSON.stringify(b.math)} => ${b.err}`);
