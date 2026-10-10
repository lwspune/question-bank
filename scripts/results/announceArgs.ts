/**
 * Flags for `npm run results:announce` (pure, tested in
 * tests/results-announce-args.test.ts).
 */
import { getExamBySlug, type ExamSlug } from "../../src/lib/exam/examContext";
import type { ResultStage } from "../../src/lib/results/summary";

export type AnnounceArgs = {
  examSlug: ExamSlug;
  sitting: string;
  stage: ResultStage;
  announcedOn: string;
  askUntil: string;
  apply: boolean;
};

const STAGES: readonly ResultStage[] = ["written", "ssb", "final"];
const DATE = /^\d{4}-\d{2}-\d{2}$/;

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function parseAnnounceArgs(argv: readonly string[], todayIso: string): { ok: true; value: AnnounceArgs } | { ok: false; error: string } {
  const flag = (name: string) => argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
  const exam = getExamBySlug(flag("exam") ?? "");
  if (!exam) return { ok: false, error: "--exam=<slug> must be an exam on the site (e.g. nda, cds, mht-cet)." };
  const sitting = (flag("sitting") ?? "").trim();
  if (sitting.length < 1 || sitting.length > 40) return { ok: false, error: '--sitting="NDA 2 2026" is required (40 characters at most).' };
  const stage = flag("stage") as ResultStage | undefined;
  if (!stage || !STAGES.includes(stage)) return { ok: false, error: "--stage= must be written, ssb or final." };
  const announcedOn = flag("announced") ?? todayIso;
  if (!DATE.test(announcedOn)) return { ok: false, error: "--announced= must be YYYY-MM-DD." };
  const days = Number(flag("ask-days") ?? 21);
  if (!Number.isInteger(days) || days < 1 || days > 90) return { ok: false, error: "--ask-days= must be 1 to 90." };
  return {
    ok: true,
    value: { examSlug: exam.slug, sitting, stage, announcedOn, askUntil: addDays(announcedOn, days), apply: argv.includes("--apply") },
  };
}
