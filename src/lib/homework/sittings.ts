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
 * A sortable date for a label, at shift precision: ((month index) x 32 + day) x 5
 * + shift. A year, an NDA paper or a month paper sits at day 0, shift 0 of its
 * month, so those exams keep their order; an MHT-CET shift sorts by its date
 * and shift (2026-11-04).
 */
function dateKey(label: string): number {
  // Five shift slots a day (0 for a whole-day paper, then S1-S4): SSC CGL holds
  // up to four shifts a day (2026-11-06); three slots put its Shift 3 on the next day.
  const at = (year: number, month: number, day = 0, shift = 0) => ((year * 12 + month) * 32 + day) * 5 + shift;
  const year = /^(\d{4})$/.exec(label);
  if (year) return at(Number(year[1]), 0);
  const nda = /^(?:NDA|CDS) (\d) (\d{4})$/.exec(label);
  if (nda) {
    if (!(nda[1] in NDA_MONTH)) throw new Error(`cannot date sitting "${label}"`);
    return at(Number(nda[2]), NDA_MONTH[nda[1]]);
  }
  const tier2 = /^(\d{1,2}) ([A-Z][a-z]{2}) (\d{4}) Tier II$/.exec(label);
  if (tier2 && MONTHS.includes(tier2[2])) return at(Number(tier2[3]), MONTHS.indexOf(tier2[2]), Number(tier2[1]));
  const cet = /^(?:(\d{1,2}) )?([A-Z][a-z]{2}) (\d{4}) S([1-4])$/.exec(label);
  if (cet && MONTHS.includes(cet[2])) {
    return at(Number(cet[3]), MONTHS.indexOf(cet[2]), cet[1] ? Number(cet[1]) : 0, Number(cet[4]));
  }
  // JEE Mains (2026-11-06): a 2021 paper has no date, so it sorts in its year by
  // its number; a 2022-2025 day holds both shifts, so it sits at shift 0.
  const jee2021 = /^(\d{4}) Paper (\d{1,2})$/.exec(label);
  if (jee2021) return at(Number(jee2021[1]), 0, Number(jee2021[2]));
  const day = /^(\d{1,2}) ([A-Z][a-z]{2}) (\d{4})$/.exec(label);
  if (day && MONTHS.includes(day[2])) return at(Number(day[3]), MONTHS.indexOf(day[2]), Number(day[1]));
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

/**
 * An SSC CGL paper's label (2026-11-06): one shift, "14 Jul 2023 S3", read from
 * the note the ingestion wrote ("Tier I, 14 Jul 2023, Shift 3"). SSC holds up
 * to four shifts a day. Anything else is an error, never a guess.
 */
export function sscSittingLabel(note: string | null): string {
  if (!note) throw new Error("no note on an SSC CGL row");
  const found = /^Tier I, (\d{1,2}) ([A-Z][a-z]+) (\d{4}), Shift (\d)$/.exec(note.trim());
  const m = found ? MONTHS.find((x) => found[2].startsWith(x)) : undefined;
  if (!found || !m || !/^[1-4]$/.test(found[4])) throw new Error(`cannot read the SSC shift in "${note}"`);
  return `${Number(found[1])} ${m} ${found[3]} S${found[4]}`;
}

/**
 * An SSC CGL Tier II paper's label (2026-11-06): one paper a day, "18 Jan 2025 Tier II",
 * read from the note the ingestion wrote ("Tier II (CGL 2024), 18 Jan 2025"). The date is
 * the day it was sat, not the CGL cycle. Anything else is an error, never a guess.
 */
export function sscTier2SittingLabel(note: string | null): string {
  if (!note) throw new Error("no note on an SSC CGL Tier II row");
  const found = /^Tier II \(CGL \d{4}\), (\d{1,2}) ([A-Z][a-z]+) (\d{4})$/.exec(note.trim());
  const m = found ? MONTHS.find((x) => found[2].startsWith(x)) : undefined;
  if (!found || !m) throw new Error(`cannot read the SSC Tier II paper in "${note}"`);
  return `${Number(found[1])} ${m} ${found[3]} Tier II`;
}

/**
 * A JEE Mains sitting's label (2026-11-06), from a row's year and note. The bank
 * stores 2026 per shift ("2 Apr 2026 Shift 1" -> "2 Apr 2026 S1"), 2022-2025 one
 * file per DAY with both shifts together ("14 June 2022", "JEE Mains 2022 - 25 June"
 * -> "14 Jun 2022"), and 2021 as numbered papers with no date ("Paper 7",
 * "2021 Compilation Paper 13" -> "2021 Paper 13"). Anything else is an error,
 * never a guess (the year-only Allen reprints of 2012-2020 among them).
 */
export function jeeSittingLabel(year: number, note: string | null): string {
  if (!note) throw new Error(`no note on a ${year} JEE Mains row`);
  const n = note.trim();
  const monthOf = (word: string) => MONTHS.find((x) => word.startsWith(x));
  const shift = /^(\d{1,2}) ([A-Za-z]+) (\d{4}) Shift ([12])$/.exec(n);
  const day = /^(\d{1,2}) ([A-Za-z]+) (\d{4})$/.exec(n) ?? (() => {
    const m = /^JEE Mains (\d{4}) \S+ (\d{1,2}) ([A-Za-z]+)$/.exec(n);
    return m ? [m[0], m[2], m[3], m[1]] : null;
  })();
  const paper = /^(?:(\d{4}) )?(?:Compilation )?Paper (\d{1,2})$/.exec(n);
  if (shift || day) {
    const [, d, mon, y] = (shift ?? day)!;
    const m = monthOf(mon);
    if (!m || Number(y) !== year) throw new Error(`cannot read the JEE sitting in "${note}" on a ${year} row`);
    return `${Number(d)} ${m} ${y}${shift ? ` S${shift[4]}` : ""}`;
  }
  if (paper && year === 2021 && (!paper[1] || Number(paper[1]) === year)) return `${year} Paper ${Number(paper[2])}`;
  throw new Error(`cannot read the JEE sitting in "${note}" on a ${year} row`);
}

/**
 * A row's sitting label for the exam its plan belongs to (2026-11-06): the one
 * dispatch prep.ts and the new-question tool (homework:new) share, so a new
 * paper is labelled exactly as the plan's existing sittings are. A board or
 * CBSE plan counts YEARS; every other exam counts papers or shifts.
 */
export function sittingFor(
  examName: string,
  r: { pyq_year: number; pyq_month: string | null; pyq_note: string | null }
): string {
  if (examName.startsWith("Maharashtra")) return mhSittingLabel(r.pyq_year, r.pyq_month);
  if (examName === "NDA") return ndaSittingLabel(r.pyq_year, r.pyq_month);
  if (examName === "CDS") return cdsSittingLabel(r.pyq_year, r.pyq_month);
  if (examName === "MHT-CET") return cetSittingLabel(r.pyq_year, r.pyq_month, r.pyq_note);
  if (examName === "SSC CGL") return sscSittingLabel(r.pyq_note);
  if (examName === "SSC CGL Tier II") return sscTier2SittingLabel(r.pyq_note);
  if (examName === "JEE Mains") return jeeSittingLabel(r.pyq_year, r.pyq_note);
  return String(r.pyq_year);
}
