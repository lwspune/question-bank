/**
 * A fixed exam calendar for tests: the 15 sittings the code calendar held on
 * 2026-11-22, when the calendar moved to the exam_sittings table (migration
 * 0281). Tests pass it in, so they never depend on what the live table says.
 */
import type { SittingEntry } from "@/lib/exam/calendar";

const PATTERN = "expected from the usual pattern; not yet announced";
const UPSC = "https://www.upsc.gov.in/uploads/2026/06/Calendar-Year-2027-Engl-200526.pdf";
const NTA = "https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610241890224107.pdf";

export const TEST_CALENDAR: readonly SittingEntry[] = [
  { exam: "jee-mains", sitting: "2027-Jan", label: "JEE Main 2027 (January)", date: "2027-01-20", official: true, source: "NTA bulletin", sourceUrl: NTA },
  { exam: "mh-hsc-12", sitting: "2027", label: "HSC boards 2027", date: "2027-02-11", official: false, source: PATTERN, sourceUrl: null },
  { exam: "cbse-10", sitting: "2027", label: "CBSE Class 10 boards 2027", date: "2027-02-15", official: false, source: PATTERN, sourceUrl: null },
  { exam: "cbse-12", sitting: "2027", label: "CBSE Class 12 boards 2027", date: "2027-02-15", official: false, source: PATTERN, sourceUrl: null },
  { exam: "mh-ssc-10", sitting: "2027", label: "SSC boards 2027", date: "2027-03-01", official: false, source: PATTERN, sourceUrl: null },
  { exam: "jee-mains", sitting: "2027-Apr", label: "JEE Main 2027 (April)", date: "2027-04-02", official: true, source: "NTA bulletin", sourceUrl: NTA },
  { exam: "nda", sitting: "2027-I", label: "NDA 2027 (I)", date: "2027-04-11", official: true, source: "UPSC calendar 2027", sourceUrl: UPSC },
  { exam: "cds", sitting: "2027-I", label: "CDS 2027 (I)", date: "2027-04-11", official: true, source: "UPSC calendar 2027", sourceUrl: UPSC },
  { exam: "mht-cet", sitting: "2027", label: "MHT-CET 2027", date: "2027-04-16", official: true, source: "CET Cell press note", sourceUrl: "https://cetcell.mahacet.org/x.pdf" },
  { exam: "neet", sitting: "2027", label: "NEET 2027", date: "2027-05-02", official: false, source: PATTERN, sourceUrl: null },
  { exam: "ipmat-indore", sitting: "2027", label: "IPMAT Indore 2027", date: "2027-05-09", official: false, source: PATTERN, sourceUrl: null },
  { exam: "ipmat-rohtak", sitting: "2027", label: "IPMAT Rohtak 2027", date: "2027-05-09", official: false, source: PATTERN, sourceUrl: null },
  { exam: "jipmat", sitting: "2027", label: "JIPMAT 2027", date: "2027-05-09", official: false, source: PATTERN, sourceUrl: null },
  { exam: "nda", sitting: "2027-II", label: "NDA 2027 (II)", date: "2027-09-19", official: true, source: "UPSC calendar 2027", sourceUrl: UPSC },
  { exam: "cds", sitting: "2027-II", label: "CDS 2027 (II)", date: "2027-09-19", official: true, source: "UPSC calendar 2027", sourceUrl: UPSC },
];
