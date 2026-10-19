/**
 * Why a row goes in front of a triage agent (candidates.ts). Over-reporting is
 * fine, since the agent rules on every candidate; a miss is silent, so widen
 * on evidence (tests/solution-figures-signals.test.ts).
 *
 *   asks      the stem asks for a drawing: draw / sketch / plot / construct, or
 *             "prepare / show ... graph / diagram / chart" (Geography's data
 *             questions, missed until 2026-10-19)
 *   worded    the solution draws a figure in words ("Ray diagram: draw a ...")
 *   explains  an explain/derive stem whose solution names a set-up
 *   dangling  the solution cites a figure the row does not carry, by the same
 *             rule `audit:figures` uses (`solutionCitesFigure`)
 */
import { solutionCitesFigure } from "../lib/figureRefs";

const ASKS = /\b(draw|sketch|plot|construct)\b|\b(prepare|show|represent)\b[^.]{0,60}\b(graph|diagram|chart)\b/i;
const ASKS_NOT = /draws? (from|a current|current|conclusions?)|current (will|does|would)[^.]{0,40}\bdraw/i;
const WORDED = /((ray|phasor|band|energy[- ]band|circuit|labelled|neat|vector|free[- ]body|wavefront|field[- ]line|block|apparatus)\s*)?diagram\s*:\**\s*(draw|show|a labelled|a neat|the|two|an?)\b|to draw the [a-z ]*diagram|labels to be shown|figure\s*:\s*a labelled/i;
const EXPLAINS = /\b(explain|describe|derive|obtain|prove|show that|deduce|with the help of|working|principle|construction)\b/i;
const FIGVOCAB = /\*\*circuit\.?\*\*|\*the circuit\.?\*|circuit diagram|ray diagram|phasor diagram|to draw (it|the)|the diagram|labelled diagram|\blet [^.]{0,40}\b(in|be|along) [A-Z]{2}\b|points? [A-Z] and [A-Z]\b|jockey|wavefront|field lines|apparatus|set-?up|arrangement|cross[- ]section|as shown/;

export type Signal = "asks" | "worded" | "explains" | "dangling";

export function candidateSignals(r: { text: string; solution: string | null; image_url: string | null }): Signal[] {
  const sol = r.solution ?? "";
  const out: Signal[] = [];
  if (ASKS.test(r.text) && !ASKS_NOT.test(r.text)) out.push("asks");
  if (WORDED.test(sol)) out.push("worded");
  if (EXPLAINS.test(r.text) && FIGVOCAB.test(sol)) out.push("explains");
  if (solutionCitesFigure(sol) && !r.image_url) out.push("dangling");
  return out;
}
