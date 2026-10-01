/**
 * The trends pages, registered as REPORTS.
 *
 * WHY. Each `/guide/<subject>/trends` page is original analysis of the bank —
 * a chapter × paper matrix nobody else publishes — but it was framed as a
 * guide sub-page: an assertion for a title, no visible date, no "data
 * through", and no index that lists it as a report. That is the difference
 * between a page a student reads and a page another site, or an AI search
 * engine, CITES. This registry gives each one a headline that states its
 * claim with a number, the sitting its data runs through, and (via
 * `reportUpdatedIso`) the committed content date; `ReportProvenance` renders
 * those on the page and `/guide/reports` lists them.
 *
 * The routes are asserted against the filesystem in BOTH directions by
 * tests/trends-reports.test.ts. The paper and question counts are NOT here —
 * each page already computes or states its own, and a second copy would only
 * drift; the page passes them to the provenance block itself.
 */
import { CONTENT_DATES } from "@/lib/seo/contentDates.generated";
import type { ContentDateMap } from "@/lib/seo/lastmod";

export type TrendsReport = {
  route: string;
  exam: string;
  subject: string;
  /** The finding, with its number — what the H1 says and what gets quoted. */
  claim: string;
  /** The last sitting the data includes, as a student would name it. */
  dataThrough: string;
};

export const TRENDS_REPORTS: readonly TrendsReport[] = [
  {
    route: "/guide/nda-maths/trends",
    exam: "NDA",
    subject: "Mathematics",
    claim: "NDA Maths, 2017 to 2026: how 15 principles shifted across 2,280 questions",
    dataThrough: "NDA I 2026",
  },
  {
    route: "/guide/nda-english/trends",
    exam: "NDA",
    subject: "English",
    claim: "NDA English, 2017 to 2026: the chapter mix of 900 GAT questions, year by year",
    dataThrough: "NDA I 2026",
  },
  {
    route: "/guide/nda-physics/trends",
    exam: "NDA",
    subject: "Physics",
    claim: "NDA Physics, 2017 to 2026: 449 questions, and a paper about 22 times harder per question since 2021",
    dataThrough: "NDA I 2026",
  },
  {
    route: "/guide/nda-chemistry/trends",
    exam: "NDA",
    subject: "Chemistry",
    claim: "NDA Chemistry, 2017 to 2026: 262 questions and a paper that did not harden",
    dataThrough: "NDA I 2026",
  },
  {
    route: "/guide/nda-biology/trends",
    exam: "NDA",
    subject: "Biology",
    claim: "NDA Biology, 2017 to 2026: 190 questions, only 4 of them HARD",
    dataThrough: "NDA I 2026",
  },
  {
    route: "/guide/nda-geography/trends",
    exam: "NDA",
    subject: "Geography",
    claim: "NDA Geography, 2017 to 2026: 345 questions, with HARD swinging between 6% and 42%",
    dataThrough: "NDA I 2026",
  },
  {
    route: "/guide/nda-history/trends",
    exam: "NDA",
    subject: "History",
    claim: "NDA History, 2017 to 2026: 260 questions and a chapter mix that moved to Ancient India",
    dataThrough: "NDA I 2026",
  },
  {
    route: "/guide/nda-polity/trends",
    exam: "NDA",
    subject: "Polity",
    claim: "NDA Polity, 2017 to 2026: 90 questions, the smallest and noisiest GAT section",
    dataThrough: "NDA I 2026",
  },
  {
    route: "/guide/mht-cet-maths/trends",
    exam: "MHT-CET",
    subject: "Mathematics",
    claim: "MHT-CET Maths, 42 shifts from 2021 to 2025: what the 2025 syllabus change moved",
    dataThrough: "MHT-CET 2025",
  },
  {
    route: "/guide/mht-cet-physics/trends",
    exam: "MHT-CET",
    subject: "Physics",
    claim: "MHT-CET Physics, 2021 to 2025: what the 2025 paper moved, shift by shift",
    dataThrough: "MHT-CET 2025",
  },
  {
    route: "/guide/mht-cet-chemistry/trends",
    exam: "MHT-CET",
    subject: "Chemistry",
    claim: "MHT-CET Chemistry, 2021 to 2025: what the 2025 paper moved, shift by shift",
    dataThrough: "MHT-CET 2025",
  },
  {
    route: "/guide/cds-maths/trends",
    exam: "CDS",
    subject: "Mathematics",
    claim: "CDS Maths, 2016 to 2026: 2,096 questions, and Trigonometry up from 9 to 13 a paper",
    dataThrough: "CDS II 2026",
  },
  {
    route: "/guide/jee-mains-maths/trends",
    exam: "JEE Mains",
    subject: "Mathematics",
    claim: "JEE Mains Maths, 2021 to 2026: 3,556 questions, and Conic Sections up to one in eight",
    dataThrough: "JEE Main 2026, 8 April Shift 2",
  },
  {
    route: "/guide/jee-mains-chemistry/trends",
    exam: "JEE Mains",
    subject: "Chemistry",
    claim: "JEE Mains Chemistry, 2021 to 2026: 3,455 questions, and physical chemistry up from 6 to 9 a paper",
    dataThrough: "JEE Main 2026, 8 April Shift 2",
  },
  {
    route: "/guide/jee-mains-physics/trends",
    exam: "JEE Mains",
    subject: "Physics",
    claim: "JEE Mains Physics, 2021 to 2026: 3,482 questions, and Ray Optics up from about one question a paper to two",
    dataThrough: "JEE Main 2026, 8 April Shift 2",
  },
];

export function trendsReportFor(route: string): TrendsReport | null {
  return TRENDS_REPORTS.find((r) => r.route === route) ?? null;
}

/**
 * When the report's guide subtree last changed, from the committed content
 * dates (the same source the sitemap's <lastmod> uses). Null when nothing is
 * recorded — the page then prints no date rather than the build date.
 */
export function reportUpdatedIso(
  route: string,
  dates: ContentDateMap = CONTENT_DATES
): string | null {
  // Same segment-wise ancestor walk as contentDateFor, but returning the
  // stored string itself (it carries the IST offset the generator wrote).
  const segments = route.split("/");
  for (let i = segments.length; i > 1; i--) {
    const hit = dates[segments.slice(0, i).join("/")];
    if (hit) return hit;
  }
  return null;
}
