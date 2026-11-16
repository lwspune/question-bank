import { EVIDENCE, GATE_VERDICTS, type EvidenceId, type Gate } from "@/lib/games/model";

/** Small pieces of /dashboard/games. Server components. */

// Text colours as on /dashboard/world-exams: the 700 shade in light mode and
// 400 in dark mode both pass WCAG AA on a card.
const GATE_TONE: Record<Gate["verdict"], string> = {
  passes: "border-emerald-600/40 text-emerald-700 dark:text-emerald-400",
  caution: "border-amber-600/40 text-amber-700 dark:text-amber-400",
  fails: "border-red-600/40 text-red-700 dark:text-red-400",
};

const EVIDENCE_TONE: Record<EvidenceId, string> = {
  strong: "border-emerald-600/40 text-emerald-700 dark:text-emerald-400",
  some: "border-sky-600/40 text-sky-700 dark:text-sky-400",
  weak: "border-amber-600/40 text-amber-700 dark:text-amber-400",
  none: "border-border text-muted-foreground",
};

export const badge = "inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium";

export function GateBadge({ gate }: { gate: Gate }) {
  const label = GATE_VERDICTS.find((g) => g.id === gate.verdict)?.label ?? gate.verdict;
  return (
    <span className={`${badge} ${GATE_TONE[gate.verdict]}`}>
      {label}
      {gate.reasons.length > 0 && `: ${gate.reasons.join(", ")}`}
    </span>
  );
}

export function EvidenceBadge({ evidence }: { evidence: EvidenceId }) {
  const label = EVIDENCE.find((e) => e.id === evidence)?.label ?? evidence;
  return <span className={`${badge} ${EVIDENCE_TONE[evidence]}`}>Evidence: {label}</span>;
}
