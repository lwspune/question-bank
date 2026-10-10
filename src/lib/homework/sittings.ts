/**
 * Sitting labels for homework plans (2026-10-10). A CBSE plan counts repeats
 * across YEARS ("2024"); a Maharashtra plan across PAPERS ("Feb 2024" and
 * "Jul 2024" are two papers), so labels must sort by date, not as text.
 * Pure; spec tests/homework-sitting-order.test.ts.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dateKey(label: string): number {
  const year = /^(\d{4})$/.exec(label);
  if (year) return Number(year[1]) * 12;
  const paper = /^([A-Z][a-z]{2}) (\d{4})$/.exec(label);
  const month = paper ? MONTHS.indexOf(paper[1]) : -1;
  if (!paper || month < 0) throw new Error(`cannot date sitting "${label}"`);
  return Number(paper[2]) * 12 + month;
}

export function compareSittings(a: string, b: string): number {
  return dateKey(a) - dateKey(b);
}

/**
 * A Maharashtra paper's label from a row's year and month. The 2019 rows of the
 * chapter-wise compilation carry no month on some chapters; that source holds
 * one 2019 paper, March, so they are filed there. Any other missing month is an
 * error, never a guess.
 */
export function mhSittingLabel(year: number, month: string | null): string {
  if (!month) {
    if (year === 2019) return "Mar 2019";
    throw new Error(`no month on a ${year} row`);
  }
  const m = MONTHS.find((x) => month.startsWith(x));
  if (!m) throw new Error(`unknown month "${month}" on a ${year} row`);
  return `${m} ${year}`;
}
