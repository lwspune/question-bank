/** Display helpers for the score calculator's result (pure; client and server). */
import { SITE_URL } from "@/lib/brand";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export interface SittingInfo {
  /** ISO date, e.g. "2027-01-22". */
  date: string;
  shift: number;
  region: string;
  keyStatus: string;
}

export function sittingLabel(s: SittingInfo): string {
  const [y, m, d] = s.date.split("-").map(Number);
  const base = `${d} ${MONTHS[m - 1]} ${y}, Shift ${s.shift}`;
  return s.region === "outside" ? `${base} (centre outside India)` : base;
}

/** 201 -> "201", 144.5 -> "144.5", 98.25 -> "98.25". */
export function formatMarks(n: number): string {
  return String(Math.round(n * 100) / 100);
}

export function scoreShareText(p: { title: string; total: number; max: number; keyStatus: string; slug: string }): string {
  const url = `${SITE_URL}/score-calculator/${p.slug}?utm_source=share&utm_medium=score&utm_campaign=score-calc`;
  const key = p.keyStatus === "final" ? "final" : "provisional";
  return `I scored ${formatMarks(p.total)}/${formatMarks(p.max)} in ${p.title} on NTA's ${key} key. Check yours in 10 seconds: ${url}`;
}
