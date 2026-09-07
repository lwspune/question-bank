/**
 * MHT-CET sitting IDENTITY — which real paper each `questions.source_file`
 * came from. Pure data; no I/O, no DB.
 *
 * WHY THIS LIVES IN src/ AND NOT scripts/. It began in
 * `scripts/mocks/mhtcetSittings.ts`, built for the mock builder. The MHT-CET
 * Maths book needs the same answer at REQUEST time to order and label a
 * chapter, and `src/` cannot import from `scripts/` — that directory reaches
 * for `node:fs`. Copying 42 rows into a second table is the option this repo
 * has already watched rot ("a copied 19-row table drifts silently"), so the
 * identity moved here and the mock builder re-exports it. What stayed behind is
 * `hold`, which is mock-only reconstruction state, and the guard that the 13
 * April-2025 entries still agree with `scripts/mhtcet/config.ts`.
 *
 * WHY source_file AND NOT year+month: `pyq_month` cannot separate these
 * sittings — 17 of the 45 labels share (2023, "May") and 12 share (2024, "May"),
 * so year+month collapses 45 papers into 6 buckets. It is not merely useless but
 * ACTIVELY WRONG in one case: `MHT_CET_2025_PCM.xlsx` is stamped May and is a
 * second upload of 19 April Shift II.
 *
 * WHY NOT A FILENAME REGEX (the CDS rule): there is no convention to match.
 * The 45 labels follow at least eight — `MHT_CET_3rdMay2023_S1_QB.xlsx`,
 * `MHT_CET_10thMay2023_Shift1.xlsx`, `MHT_CET_2025_Apr_19_S1.docx`,
 * `MHT_CET_2022_Analysis.xlsx`, and `MHT_CET_14tthMay2024_Shift2.xlsx`, which
 * carries a typo. A registry is the only thing that reads them all.
 *
 * LABELS ARE NOT TAKEN FROM `pyq_note`. That is free text typed into the
 * uploaded spreadsheet and at least one is provably wrong:
 * `MHT_CET_3rdMay2023_S1_QB.xlsx` stores "3rd May 2nd Shift" while a separate
 * file legitimately claims that sitting. Settled 2026-09-01 against the local
 * source booklets — stems unique to that file appear only in
 * "3 may shift 1 (ques).docx" — so the FILENAME is right and the note is a typo.
 *
 * MERGED SITTINGS: the bank has 45 labels but only 42 real sittings. Three
 * papers were uploaded twice and, the two uploads having been typed
 * independently, `content_hash` deduped only the rows whose typing matched — so
 * each is SPLIT across two labels, neither reconstructing alone while the union
 * is exactly 150 (and exactly 50 within Maths, re-verified 2026-09-06).
 * `mergeWith` names the second label. THIS IS LOAD-BEARING FOR THE BOOK, not a
 * convenience: 90 of the 121 repeated-stem groups in MHT-CET Maths resolve to
 * ONE sitting through it, so a book counting rows rather than sittings would
 * print "asked twice" on 90 questions that were asked once.
 */

/** One real sitting, and the `source_file` label(s) that carry it. */
export type MhtCetSittingIdentity = {
  /** Registry key AND slug stem — "2023-may-16-s2", or a bare year when the
   *  source carries no date. Sorts chronologically within a year. */
  key: string;
  /** `questions.source_file` for this sitting. */
  sourceFile: string;
  /** A SECOND `source_file` holding the SAME paper — a duplicate upload. */
  mergeWith?: string;
  year: number;
  /** Human sitting label; null where no date is established (2021, 2022). */
  label: string | null;
};

/**
 * Every MHT-CET sitting, newest first.
 *
 * Ordering is `year desc, key desc`, which IS chronological-descending because
 * every key embeds a zero-padded date and each year uses a single month.
 */
const SITTINGS: MhtCetSittingIdentity[] = [
  { key: "2025-apr-26-s2", sourceFile: "MHT_CET_2025_Apr_26_S2.docx", year: 2025, label: "26 April Shift II" },
  { key: "2025-apr-26-s1", sourceFile: "MHT_CET_2025_Apr_26_S1.docx", year: 2025, label: "26 April Shift I" },
  { key: "2025-apr-25-s2", sourceFile: "MHT_CET_2025_Apr_25_S2.docx", year: 2025, label: "25 April Shift II" },
  { key: "2025-apr-25-s1", sourceFile: "MHT_CET_2025_Apr_25_S1.docx", year: 2025, label: "25 April Shift I" },
  { key: "2025-apr-23-s1", sourceFile: "MHT_CET_2025_Apr_23_S1.docx", year: 2025, label: "23 April Shift I" },
  { key: "2025-apr-22-s2", sourceFile: "MHT_CET_2025_Apr_22_S2.docx", year: 2025, label: "22 April Shift II" },
  { key: "2025-apr-22-s1", sourceFile: "MHT_CET_2025_Apr_22_S1.docx", year: 2025, label: "22 April Shift I" },
  { key: "2025-apr-21-s2", sourceFile: "MHT_CET_2025_Apr_21_S2.docx", year: 2025, label: "21 April Shift II" },
  { key: "2025-apr-21-s1", sourceFile: "MHT_CET_2025_Apr_21_S1.docx", year: 2025, label: "21 April Shift I" },
  { key: "2025-apr-20-s2", sourceFile: "MHT_CET_2025_Apr_20_S2.docx", year: 2025, label: "20 April Shift II" },
  { key: "2025-apr-20-s1", sourceFile: "MHT_CET_2025_Apr_20_S1.docx", year: 2025, label: "20 April Shift I" },
  { key: "2025-apr-19-s2", sourceFile: "MHT_CET_2025_Apr_19_S2.docx", mergeWith: "MHT_CET_2025_PCM.xlsx", year: 2025, label: "19 April Shift II" },
  { key: "2025-apr-19-s1", sourceFile: "MHT_CET_2025_Apr_19_S1.docx", year: 2025, label: "19 April Shift I" },
  { key: "2024-may-14-s2", sourceFile: "MHT_CET_14tthMay2024_Shift2.xlsx", year: 2024, label: "14 May Shift 2" },
  { key: "2024-may-14-s1", sourceFile: "MHT_CET_14thMay2024_Shift1_QuestionBank.xlsx", year: 2024, label: "14 May Shift 1" },
  { key: "2024-may-13-s2", sourceFile: "MHT_CET_13thMay2024_Shift2_Question_Bank.xlsx", year: 2024, label: "13 May Shift 2" },
  { key: "2024-may-12-s2", sourceFile: "MHT_CET_12thMay2024_Shift2_QuestionBank.xlsx", mergeWith: "MHT_CET_13thMay2024_Shift1_QuestionBank.xlsx", year: 2024, label: "12 May Shift 2" },
  { key: "2024-may-12-s1", sourceFile: "MHT_CET_12thMay2024_Shift1.xlsx", year: 2024, label: "12 May Shift 1" },
  { key: "2024-may-11-s2", sourceFile: "MHT_CET_11thMay2024_Shift2_QuestionBank.xlsx", year: 2024, label: "11 May Shift 2" },
  { key: "2024-may-11-s1", sourceFile: "MHT_CET_11thMay2024_Shift1_QuestionBank.xlsx", year: 2024, label: "11 May Shift 1" },
  { key: "2024-may-10-s2", sourceFile: "MHT_CET_10thMay2024_Shift2_QuestionBank.xlsx", year: 2024, label: "10 May Shift 2" },
  { key: "2024-may-10-s1", sourceFile: "MHT_CET_10thMay2024_Shift1_QuestionBank.xlsx", year: 2024, label: "10 May Shift 1" },
  { key: "2024-may-09-s2", sourceFile: "MHT_CET_9thMay2024_Shift2_QuestionBank.xlsx", year: 2024, label: "9 May Shift 2" },
  { key: "2024-may-09-s1", sourceFile: "MHT_CET_9thMay2024_Shift1_QuestionBank.xlsx", year: 2024, label: "9 May Shift 1" },
  { key: "2023-may-16-s2", sourceFile: "MHT_CET_16thMay2023_Shift2_QuestionBank.xlsx", mergeWith: "MHT_CET_2023_Analysis.xlsx", year: 2023, label: "16 May Shift 2" },
  { key: "2023-may-16-s1", sourceFile: "MHT_CET_16thMay2023_Shift1_QuestionBank.xlsx", year: 2023, label: "16 May Shift 1" },
  { key: "2023-may-15-s2", sourceFile: "MHT_CET_15thMay2023_Shift2_QuestionBank.xlsx", year: 2023, label: "15 May Shift 2" },
  { key: "2023-may-15-s1", sourceFile: "MHT_CET_15thMay2023_Shift1_QuestionBank.xlsx", year: 2023, label: "15 May Shift 1" },
  { key: "2023-may-11-s2", sourceFile: "MHT_CET_11thMay2023_Shift2_QuestionBank.xlsx", year: 2023, label: "11 May Shift 2" },
  { key: "2023-may-11-s1", sourceFile: "MHT_CET_11thMay2023_Shift1_QuestionBank.xlsx", year: 2023, label: "11 May Shift 1" },
  { key: "2023-may-10-s2", sourceFile: "MHT_CET_10thMay2023_Shift2_QuestionBank.xlsx", year: 2023, label: "10 May Shift 2" },
  { key: "2023-may-10-s1", sourceFile: "MHT_CET_10thMay2023_Shift1.xlsx", year: 2023, label: "10 May Shift 1" },
  { key: "2023-may-09-s2", sourceFile: "MHT_CET_9thMay2023_Shift2.xlsx", year: 2023, label: "9 May Shift 2" },
  { key: "2023-may-09-s1", sourceFile: "MHT_CET_9thMay2023_Shift1_QuestionBank.xlsx", year: 2023, label: "9 May Shift 1" },
  { key: "2023-may-04-s2", sourceFile: "MHT_CET_4thMay2023_Shift2.xlsx", year: 2023, label: "4 May Shift 2" },
  { key: "2023-may-04-s1", sourceFile: "MHT_CET_4thMay2023_Shift1_QuestionBank.xlsx", year: 2023, label: "4 May Shift 1" },
  { key: "2023-may-03-s2", sourceFile: "MHT_CET_3rdMay2023_Shift2_QuestionBank.xlsx", year: 2023, label: "3 May Shift 2" },
  { key: "2023-may-03-s1", sourceFile: "MHT_CET_3rdMay2023_S1_QB.xlsx", year: 2023, label: "3 May Shift 1" },
  { key: "2023-may-02-s2", sourceFile: "MHT_CET_2ndMay2023_Shift2.xlsx", year: 2023, label: "2 May Shift 2" },
  { key: "2023-may-02-s1", sourceFile: "MHT_CET_2ndMay2023_Shift1_QuestionBank.xlsx", year: 2023, label: "2 May Shift 1" },
  { key: "2022", sourceFile: "MHT_CET_2022_Analysis.xlsx", year: 2022, label: null },
  { key: "2021", sourceFile: "MHT_CET_2021_Question_Bank.xlsx", year: 2021, label: null },];

/**
 * Every sitting, newest first, with the registry's own consistency enforced.
 *
 * Refuses a duplicate key or source file outright: two sittings on one key
 * derive one mock slug, and `slugToUuid` would make the second upsert silently
 * overwrite the first. A merged label must not ALSO be a sitting of its own, or
 * the same paper ships twice — once whole and once as the fragment it was split
 * into.
 */
export function deriveMhtCetSittingIdentities(): MhtCetSittingIdentity[] {
  const byKey = new Map<string, string>();
  const byFile = new Map<string, string>();

  for (const s of SITTINGS) {
    const prevKey = byKey.get(s.key);
    if (prevKey) {
      throw new Error(
        `MHT-CET sittings "${prevKey}" and "${s.sourceFile}" share the key ` +
          `"${s.key}" — one paper cannot be two sittings`
      );
    }
    byKey.set(s.key, s.sourceFile);

    const prevFile = byFile.get(s.sourceFile);
    if (prevFile) {
      throw new Error(
        `MHT-CET source file "${s.sourceFile}" is claimed by both "${prevFile}" ` +
          `and "${s.key}" — one paper cannot be two sittings`
      );
    }
    byFile.set(s.sourceFile, s.key);

    if (s.mergeWith) {
      const prevMerge = byFile.get(s.mergeWith);
      if (prevMerge) {
        throw new Error(
          `MHT-CET sitting "${s.key}" merges "${s.mergeWith}", but that file is ` +
            `already claimed by "${prevMerge}" — one paper cannot be two sittings`
        );
      }
      byFile.set(s.mergeWith, s.key);
    }

    // A key that disagrees with its own year would sort into the wrong decade
    // of the book and name the wrong paper.
    if (!s.key.startsWith(String(s.year))) {
      throw new Error(
        `MHT-CET sitting "${s.key}" disagrees with its own year ${s.year}`
      );
    }
  }

  return [...SITTINGS].sort((a, b) => b.year - a.year || b.key.localeCompare(a.key));
}

/**
 * Every `source_file` label -> the real sitting it belongs to, INCLUDING the
 * three duplicate-upload labels, which resolve to the paper they duplicate.
 *
 * That collapse is the point. Two labels for one paper must answer the same
 * question about which sitting a row came from, or the book both mis-orders it
 * and over-counts how often it was asked.
 */
export function mhtCetSittingBySourceFile(): Map<string, MhtCetSittingIdentity> {
  const map = new Map<string, MhtCetSittingIdentity>();
  for (const s of deriveMhtCetSittingIdentities()) {
    map.set(s.sourceFile, s);
    if (s.mergeWith) map.set(s.mergeWith, s);
  }
  return map;
}

/**
 * Sitting key -> a 1-based CHRONOLOGICALLY ASCENDING ordinal (oldest = 1).
 *
 * Derived by reversing the display order rather than parsed out of the key, so
 * the two can never disagree: whatever order the registry renders in is the
 * order the book prints in.
 */
export function mhtCetSittingOrdinals(): Map<string, number> {
  const newestFirst = deriveMhtCetSittingIdentities();
  const map = new Map<string, number>();
  newestFirst.forEach((s, i) => map.set(s.key, newestFirst.length - i));
  return map;
}
