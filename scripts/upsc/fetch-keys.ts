/**
 * Download official UPSC answer keys into the source tree.
 *
 *   npx tsx scripts/upsc/fetch-keys.ts            # report what is present / missing
 *   npx tsx scripts/upsc/fetch-keys.ts --apply    # download the missing ones
 *
 * Writes to KEY_ROOT (alongside the booklets, NOT into the repo — these are
 * 0.1-15 MB scans and they are re-downloadable).
 *
 * WHY A COMMITTED SCRIPT FOR A FEW DOWNLOADS: every answer in this corpus was
 * DERIVED because no key was thought to exist. These files change that, so where
 * each one came from is provenance, not convenience — and the fetch has a trap
 * that silently produces a plausible-looking wrong file.
 *
 * THE TRAP, and it cost real time. Requesting a key from the BARE host —
 *
 *     https://upsc.gov.in/sites/default/files/AnsKey-CSP-2023-Paper-I-090524.pdf
 *
 * returns **HTTP 200 with content-type text/html**: the site's own answer-keys
 * page, not the PDF. Nothing about it reads as a failure. The file is 97 KB, the
 * status is 200, and PyMuPDF will happily "open" it and report a page count,
 * because it parses HTML too. The same URL on **www.upsc.gov.in**, with a browser
 * User-Agent and a Referer, returns `application/pdf`.
 *
 * So this verifies the `%PDF` magic bytes on every download and DELETES anything
 * that fails, rather than trusting a 200.
 *
 * FILENAMES ARE NOT DERIVABLE. Each key's URL ends in its PUBLICATION date
 * (`…-Paper-I-090524.pdf` was published 09/05/2024, about a year after the exam),
 * and the stem drifts too: `AnsKey-CSP-2023-Paper-I`, `AnsKey-CSP-20-Paper-I`,
 * `Anskey-CSP-21-GS-I`. They cannot be constructed — each URL has to be found
 * once and recorded here. The Answer Keys index is JS-rendered, so a plain fetch
 * of it returns nothing useful (verified again 2026-08-29: it and
 * `/answer-keys/archives` both answer 200 with ~27 KB and zero PDF links, as does
 * the 2026 provisional-key page under `/whats-new/`); the URLs below came from
 * search-engine hits on the files themselves.
 *
 * HOW BADLY THE STEM DRIFTS, measured while going 8 → 16 keys on 2026-08-29:
 *   2024  `AnsKey-CivilServicesPExam-2024-GeneralStudies-I-210525.pdf`
 *         — abandons "CSP" entirely. Six guesses built on the 2023 pattern 404'd.
 *   2019  `AnsKeyCSP-19-GS_I.pdf`   — no hyphen after AnsKey, UNDERSCORE before I.
 *   2017  `Anskey-CSP-17-GS-I.pdf` and `ANskey-CSP-17-GS-II.pdf`
 *         — the TWO PAPERS OF ONE SITTING capitalise the stem differently.
 *
 * SIBLING SYMMETRY IS A SHORTCUT WORTH TRYING FIRST, AND IT IS NOT A RULE. A
 * sitting's two papers are published together and share a date, so swapping the
 * Paper-I/II token in a known URL often gives the other: it found 2018-p2,
 * 2021-p2 and 2019-p2 (3 for 3 on those), then FAILED on 2017 for the
 * capitalisation reason above. Probe before recording — a wrong guess is safe,
 * because the bare host answers 404 with HTML and the magic-byte check deletes it.
 *
 * 2016 IS OUT OF SCOPE — a decision (2026-08-29), not a backlog item. Its key
 * URL could not be found: systematic probing of the era's own pattern (2015 is
 * `CSP_15_GS_I_AKy.pdf`, confirmed live) produced only 404s across
 * `CSP_16_GS_I_AKy`, `CSP_16_GS_Paper_I_AKy`, `CSP-16-GS-I-AKy`,
 * `CSP_2016_GS_I_AKy` and the AnsKey-era forms; the index is JS-rendered, so
 * locating it needs a browser.
 *
 * Both 2016 booklets ARE on disk and would ingest fine — which is the trap.
 * Doing so would put ~180 answers into this corpus on an unscored blind pass,
 * and this corpus's whole value is that its answers are measured against ground
 * truth. At the ~5-per-100 rate measured here that is ~9 confidently-wrong
 * answers with no way to find them. **Do not ingest 2016 without a key.**
 *
 * 2026 IS INGESTED ON A PROVISIONAL KEY (decision 2026-08-29). It was released
 * 2026-05-27, three days after the exam, with an objection window that closed
 * 2026-05-31 — a first for UPSC, and a DIFFERENT KIND OF EVIDENCE from every
 * other key here, all of which are final and post-cycle. The condition attached
 * to that decision is that the difference travels with the ROW: `PROVISIONAL_KEYS`
 * below drives a `pyq_note` clause stamped by `commit.ts` on every 2026 row.
 * When the final key appears, swap the URL, re-run keycheck, drop the paper from
 * that set, and treat any answer that moves as a real correction.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { KEY_ROOT, PAPERS, keyPath } from "./config";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
const REFERER = "https://www.upsc.gov.in/examinations/answer-key";

/**
 * paperId -> the key's filename on upsc.gov.in.
 *
 * Recorded, never constructed — see the header. A paper absent from this map has
 * no located key yet; that is a gap in what we have FOUND, not evidence that UPSC
 * published none. Keys are known to exist for every sitting 2016-2025 (2025's was
 * published 2026-05-13), and from the 2026 cycle onward UPSC publishes a
 * PROVISIONAL key shortly after the exam rather than after the full cycle.
 */
export const KEY_URLS: Record<string, string> = {
  "2023-p1": "AnsKey-CSP-2023-Paper-I-090524.pdf",
  "2023-p2": "AnsKey-CSP-2023-Paper-II-090524.pdf",
  "2022-p1": "AnsKey-CSP-2022-Paper-I-040723.pdf",
  "2022-p2": "AnsKey-CSP-2022-Paper-II-040723.pdf",
  "2021-p1": "Anskey-CSP-21-GS-I-300522.pdf",
  "2020-p1": "AnsKey-CSP-20-Paper-I-091121.pdf",
  "2020-p2": "AnsKey-CSP-20-Paper-II-091121.pdf",
  "2018-p1": "AnsKey-CSP-18-Paper-I.pdf",
  // Both found by SIBLING SYMMETRY, then verified: a sitting's two papers are
  // published together and share a date, so swapping the Paper-I/II token in a
  // known URL gives the other. Confirmed against upsc.gov.in (application/pdf,
  // %PDF magic) before being recorded here; two deliberately-wrong variants
  // 404'd with HTML, so the probe discriminates rather than accepting anything.
  "2018-p2": "AnsKey-CSP-18-Paper-II.pdf",
  "2021-p2": "Anskey-CSP-21-GS-II-300522.pdf",

  // 2024 BROKE THE STEM ENTIRELY: "CivilServicesPExam" where every prior year
  // used "CSP". Six guesses built on the 2023 pattern all 404'd before a search
  // turned up the real name — which is the header's point about filenames not
  // being constructible, in its most extreme form so far.
  "2024-p1": "AnsKey-CivilServicesPExam-2024-GeneralStudies-I-210525.pdf",
  "2024-p2": "AnsKey-CivilServicesPExam-2024-GeneralStudies-II-210525.pdf",

  // 2019 drops the hyphen after AnsKey and separates the paper with an
  // UNDERSCORE; 2017 capitalises it "ANskey". Sibling symmetry gave 2019-p2 but
  // FAILED for 2017-p1, so it is a shortcut worth trying, never a rule.
  "2019-p1": "AnsKeyCSP-19-GS_I.pdf",
  "2019-p2": "AnsKeyCSP-19-GS_II.pdf",
  // 2017 is the sharpest case against constructing these: its TWO PAPERS OF ONE
  // SITTING capitalise the stem DIFFERENTLY - "Anskey" for I, "ANskey" for II.
  // That is why sibling symmetry found 2019-p2 and 2021-p2 but not this one.
  "2017-p1": "Anskey-CSP-17-GS-I.pdf",
  "2017-p2": "ANskey-CSP-17-GS-II.pdf",

  // 2026 IS A PROVISIONAL KEY AND A DIFFERENT KIND OF EVIDENCE. See the header,
  // and `PROVISIONAL_KEYS` below - nothing may commit against one of these
  // without recording that fact in the row's own provenance.
  //
  // The separator after "ProvAnsKey" is an EN DASH (U+2013), not a hyphen, and
  // it is written as an escape here so the source stays ASCII and the oddity
  // cannot be silently "tidied" into a hyphen by an editor or a copy-paste. It
  // is load-bearing: the hyphen form answers 404 with HTML. Both were probed.
  //
  // CORROBORATED ON A SECOND HOST, which is worth more than the magic-byte check
  // for a key this corpus is going to rest 180 answers on. UPSC also serves it
  // from the QPRep portal under a completely different filename —
  //   https://upsconline.nic.in/ngrp/assets/PDF/Prov.%20Ans%20Key.%20%E2%80%93%20(GS-I)%20CS%20(P)%20Exam,%202026.pdf
  // — and that download is BYTE-IDENTICAL to this one (sha256
  // 3fa5d8e6d18a92b20dde87c87f18269981898da6687884cc7143fb47ad3740c1). Two
  // independent UPSC hosts serving the same bytes is real provenance; a 200 with
  // %PDF magic on one host is only evidence that a PDF came back.
  "2026-p1": "ProvAnsKey–GS-I-CSP-Exam-2026-270526.pdf",
  "2026-p2": "ProvAnsKey–GS-II-CSP-Exam-2026-270526.pdf",
};

// PROVISIONAL_KEYS lives in config.ts, NOT here. This file calls main() at module
// level, so importing a constant out of it would RUN THE DOWNLOADER as a side
// effect — which is exactly what happened when it was first put here: `keycheck
// 2024-p1` started printing the key-fetch report. Shared constants belong in the
// side-effect-free module.

/**
 * Keys obtained from a MIRROR rather than upsc.gov.in, because the official URL
 * could not be located (the Answer Keys index is JS-rendered).
 *
 * Verified as genuine before use, and that check is the point of recording them
 * separately: each is 4 pages, one per series A/B/C/D, and page 0 reads
 * "CS(P)-2025 / Series A / Paper ONE / GS-I / Total Questions 100 / Dropped 0" —
 * the same layout as the keys fetched from UPSC directly. A mirror is not
 * self-evidently authentic; matching the official format is what makes it usable.
 */
export const MIRROR_URLS: Record<string, string> = {
  "2025-p1":
    "https://www.insightsonindia.com/wp-content/uploads/2026/05/UPSC-CSE-2025-GS-1-OFFCIAL-ANSWER-KEY.pdf",
  "2025-p2":
    "https://www.insightsonindia.com/wp-content/uploads/2026/05/UPSC-CSE-2025-CSAT-Official-Answer-Key.pdf",
};

function download(remote: string, dest: string): { ok: boolean; note: string } {
  // encodeURI, because the 2026 provisional keys carry an EN DASH in the
  // filename and the bare character does not survive the request. Every other
  // filename here is plain ASCII that encodeURI leaves byte-identical, so this
  // is a no-op for them — verified against the 16 pre-2026 entries.
  const url = `https://www.upsc.gov.in/sites/default/files/${encodeURI(remote)}`;
  try {
    execFileSync(
      "curl",
      ["-sS", "-L", "--max-time", "180", "-A", UA, "-H", `Referer: ${REFERER}`, url, "-o", dest],
      { stdio: "pipe" }
    );
  } catch (e) {
    return { ok: false, note: `curl failed: ${(e as Error).message}` };
  }
  if (!existsSync(dest)) return { ok: false, note: "no file written" };

  // Verify the MAGIC BYTES, not the HTTP status. The bare host answers 200 with
  // an HTML page for a missing/blocked file, and that is indistinguishable from
  // success by every other signal.
  const head = readFileSync(dest).subarray(0, 4).toString("latin1");
  if (head !== "%PDF") {
    const size = statSync(dest).size;
    unlinkSync(dest);
    return { ok: false, note: `not a PDF (first bytes ${JSON.stringify(head)}, ${size} bytes) — deleted` };
  }
  return { ok: true, note: `${(statSync(dest).size / 1024 / 1024).toFixed(1)} MB` };
}

function main() {
  const apply = process.argv.includes("--apply");
  mkdirSync(KEY_ROOT, { recursive: true });

  const withUrl = Object.keys(KEY_URLS).sort();
  const noUrl = Object.keys(PAPERS).filter((id) => !KEY_URLS[id]).sort();

  console.log(`key root: ${KEY_ROOT}\n`);
  let have = 0;
  for (const id of withUrl) {
    const dest = keyPath(id);
    if (existsSync(dest)) {
      console.log(`  have    ${id}  ${(statSync(dest).size / 1024 / 1024).toFixed(1)} MB`);
      have += 1;
      continue;
    }
    if (!apply) {
      console.log(`  MISSING ${id}  <- ${KEY_URLS[id]}`);
      continue;
    }
    const r = download(KEY_URLS[id], dest);
    console.log(`  ${r.ok ? "got    " : "FAILED "} ${id}  ${r.note}`);
    if (r.ok) have += 1;
  }

  console.log(`\n${have}/${Object.keys(PAPERS).length} papers have an official key on disk.`);
  console.log(`no URL located yet (${noUrl.length}): ${noUrl.join(", ")}`);
  console.log(
    `\nTo add one: open ${REFERER} in a BROWSER (the list is JS-rendered, so a plain\n` +
      `fetch returns nothing), copy the CSP link, and add its filename to KEY_URLS.`
  );
  if (!apply && withUrl.some((id) => !existsSync(keyPath(id)))) {
    console.log(`\n[dry-run] pass --apply to download the missing ones.`);
  }
}

main();
