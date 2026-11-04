/**
 * Sitting labels for homework plans (2026-10-10). A CBSE plan counts repeats
 * across YEARS ("2024"); a Maharashtra plan across PAPERS ("Feb 2024" and
 * "Jul 2024" are two papers), so labels must sort by date, not as text. An
 * NDA plan counts across papers too, named as students know them ("NDA 1 2024").
 * Pure; spec tests/homework-sitting-order.test.ts.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** NDA sits twice a year: NDA 1 in April, NDA 2 in September. */
const NDA_MONTH: Record<string, number> = { "1": 3, "2": 8 };

function dateKey(label: string): number {
  const year = /^(\d{4})$/.exec(label);
  if (year) return Number(year[1]) * 12;
  const nda = /^NDA (\d) (\d{4})$/.exec(label);
  if (nda) {
    if (!(nda[1] in NDA_MONTH)) throw new Error(`cannot date sitting "${label}"`);
    return Number(nda[2]) * 12 + NDA_MONTH[nda[1]];
  }
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

/**
 * An NDA paper's label from a row's year and month: the bank files NDA 1 under
 * April and NDA 2 under September. Any other month is an error, never a guess.
 */
export function ndaSittingLabel(year: number, month: string | null): string {
  if (!month) throw new Error(`no month on a ${year} NDA row`);
  if (month.startsWith("Apr")) return `NDA 1 ${year}`;
  if (month.startsWith("Sep")) return `NDA 2 ${year}`;
  throw new Error(`unknown NDA month "${month}" on a ${year} row`);
}
