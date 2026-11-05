/**
 * Sitting labels for homework plans (2026-10-10). A CBSE plan counts repeats
 * across YEARS ("2024"); a Maharashtra plan across PAPERS ("Feb 2024" and
 * "Jul 2024" are two papers), so labels must sort by date, not as text. An
 * NDA plan counts across papers too, named as students know them ("NDA 1 2024").
 * Pure; spec tests/homework-sitting-order.test.ts.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * NDA and CDS sit twice a year; the bank files paper 1 under April and paper 2
 * under September, for both exams.
 */
const NDA_MONTH: Record<string, number> = { "1": 3, "2": 8 };

/**
 * A sortable date for a label, at shift precision: ((month index) x 32 + day) x 3
 * + shift. A year, an NDA paper or a month paper sits at day 0, shift 0 of its
 * month, so those exams keep their order; an MHT-CET shift sorts by its date
 * and shift (2026-11-04).
 */
function dateKey(label: string): number {
  const at = (year: number, month: number, day = 0, shift = 0) => ((year * 12 + month) * 32 + day) * 3 + shift;
  const year = /^(\d{4})$/.exec(label);
  if (year) return at(Number(year[1]), 0);
  const nda = /^(?:NDA|CDS) (\d) (\d{4})$/.exec(label);
  if (nda) {
    if (!(nda[1] in NDA_MONTH)) throw new Error(`cannot date sitting "${label}"`);
    return at(Number(nda[2]), NDA_MONTH[nda[1]]);
  }
  const cet = /^(?:(\d{1,2}) )?([A-Z][a-z]{2}) (\d{4}) S([12])$/.exec(label);
  if (cet && MONTHS.includes(cet[2])) {
    return at(Number(cet[3]), MONTHS.indexOf(cet[2]), cet[1] ? Number(cet[1]) : 0, Number(cet[4]));
  }
  const paper = /^([A-Z][a-z]{2}) (\d{4})$/.exec(label);
  const month = paper ? MONTHS.indexOf(paper[1]) : -1;
  if (!paper || month < 0) throw new Error(`cannot date sitting "${label}"`);
  return at(Number(paper[2]), month);
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

/**
 * A CDS paper's label (2026-11-05), "CDS 1 2024": the bank files CDS 1 under
 * April and CDS 2 under September, like NDA. Any other month is an error.
 */
export function cdsSittingLabel(year: number, month: string | null): string {
  if (!month) throw new Error(`no month on a ${year} CDS row`);
  if (month.startsWith("Apr")) return `CDS 1 ${year}`;
  if (month.startsWith("Sep")) return `CDS 2 ${year}`;
  throw new Error(`unknown CDS month "${month}" on a ${year} row`);
}

/**
 * An MHT-CET paper's label (2026-11-04): one shift, "10 May 2023 S1", from a
 * row's year, month and note. The notes vary by year ("10th May Shift 1",
 * "19 April Shift II"); 2021 and 2022 held one paper each and their notes carry
 * no day ("May Shift 1", "Shift 1"), so they are "May 2021 S1". Anything else
 * is an error, never a guess.
 */
export function cetSittingLabel(year: number, month: string | null, note: string | null): string {
  if (!month) throw new Error(`no month on a ${year} MHT-CET row`);
  const found = /^(?:(\d{1,2})(?:st|nd|rd|th)?\s+)?(?:([A-Za-z]+)\s+)?Shift\s+(1|2|I|II)$/.exec((note ?? "").trim());
  if (!found) throw new Error(`cannot read the shift in "${note}" on a ${year} MHT-CET row`);
  // The note records the sitting, so a month it names wins: six 2025 rows say
  // "19 April Shift II" with month May.
  const fromNote = found[2] ? MONTHS.find((x) => found[2].startsWith(x)) : undefined;
  const m = fromNote ?? MONTHS.find((x) => month.startsWith(x));
  if (!m) throw new Error(`unknown month "${month}" on a ${year} MHT-CET row`);
  const shift = found[3] === "1" || found[3] === "I" ? 1 : 2;
  return `${found[1] ? `${Number(found[1])} ` : ""}${m} ${year} S${shift}`;
}
