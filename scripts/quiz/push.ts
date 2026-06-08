/**
 * Push a harvested quiz into nda-tracker as a DRAFT (via POST /api/quiz-import).
 *
 * Run: `npm run quiz:push`
 *
 * Requires two env vars (in .env.local — gitignored):
 *   NDA_TRACKER_IMPORT_URL = https://<nda-tracker-host>/api/quiz-import
 *   QUIZ_IMPORT_SECRET     = <same shared secret set in nda-tracker's env>
 *
 * The quiz always lands as a draft — open nda-tracker, set the batch + close time,
 * and publish by hand. Re-running updates the same draft (stable quiz id).
 *
 * Target a specific daily-quiz module:
 *   npm run quiz:push -- daily/nda-prob-classical-2
 * With no arg it pushes the original hand-authored Classical Probability quiz.
 */
import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { buildImportPayload, type DraftQuiz } from "../../src/lib/quiz/quizPayload";
import { CLASSICAL_PROBABILITY_QUIZ } from "./classicalProbabilityQuiz";

/** Load the quiz to push: a daily/<slug> module (default or named `quiz`
 *  export) when a target arg is given, else the original classical quiz. */
async function loadQuiz(target: string | undefined): Promise<DraftQuiz> {
  if (!target) return CLASSICAL_PROBABILITY_QUIZ;
  const mod = await import(`./${target.replace(/\.ts$/, "")}`);
  const quiz = mod.default ?? mod.quiz;
  if (!quiz || !quiz.id || !Array.isArray(quiz.questions)) {
    throw new Error(`"${target}" must default-export a DraftQuiz (or export \`quiz\`)`);
  }
  return quiz as DraftQuiz;
}

function loadEnvLocal() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const dotenv = require("dotenv");
    dotenv.config({ path: local, override: true });
  }
}

async function main() {
  loadEnvLocal();
  const url = process.env.NDA_TRACKER_IMPORT_URL;
  const secret = process.env.QUIZ_IMPORT_SECRET;
  if (!url || !secret) {
    console.error("✗ Missing NDA_TRACKER_IMPORT_URL or QUIZ_IMPORT_SECRET in .env.local");
    process.exit(1);
  }

  const quiz = await loadQuiz(process.argv[2]);
  const payload = buildImportPayload(quiz);
  console.log(`→ Pushing "${payload.title}" (${payload.questions.length} questions) to ${url}`);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error(`✗ Import failed (HTTP ${res.status}): ${text}`);
    process.exit(1);
  }
  console.log(`✓ Imported as draft: ${text}`);
  console.log("  Open nda-tracker → Daily Quiz, set the batch + close time, and publish.");
}

main().catch((e) => {
  console.error("✗", e instanceof Error ? e.message : e);
  process.exit(1);
});
