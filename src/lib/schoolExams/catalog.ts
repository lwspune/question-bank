/**
 * The exams a school child can sit, for /school-exams (owner, 2026-11-27):
 * admission tests, government scholarships and science or maths competitions
 * by recognised bodies, all-India plus Maharashtra. No other states (owner's
 * choice). Private bodies only in the last group, kind "other" (owner,
 * 2026-11-28: the Maharashtra Talent Search, which Pune parents ask about),
 * each still read on its runner's own site.
 *
 * Every fact here was read on the conducting body's own site or notice
 * (`sourceUrl`) on `checkedOn`. Anything that could not be confirmed there was
 * left out rather than guessed: EMRS, the Vidyaniketan entrance, Ganit
 * Pravinya and the drawing grade exams were all searched for on 2026-11-27
 * and are NOT here for that reason. (Navodaya's Class 11 entry is sat in
 * Class 10 on vacant seats; not added.)
 *
 * `sitInClasses` is the class the child is in WHEN they sit the test (a Class 5
 * child sits AISSEE for Class 6), because that is the class a parent picks.
 * `registrySlug` marks an exam the question bank carries; the page links it
 * only when it has public questions (select.ts ourExamLink).
 *
 * Re-check every entry yearly, and whenever a notice changes a date or a rule:
 * dates move every year, so `when` names the year it describes.
 */
import type { ExamSlug } from "@/lib/exam/examContext";

/** "other": a well-known exam run by a private institute (shown last, with a note saying so). */
export type SchoolExamKind = "admission" | "scholarship" | "competition" | "other";

export type SchoolExam = {
  id: string;
  name: string;
  kind: SchoolExamKind;
  /** Who runs it. */
  body: string;
  /** What it gets the child, in one or two sentences. */
  forWhat: string;
  whoCanSit: string;
  when: string;
  /** "india": open across India. "maharashtra": a Maharashtra exam. */
  region: "india" | "maharashtra";
  sitInClasses: readonly number[];
  officialUrl: string;
  /** The notice or page the facts above were read from. */
  sourceUrl: string;
  checkedOn: string;
  registrySlug?: ExamSlug;
};

const CHECKED = "2026-11-27";

const AISSEE_SITE = "https://exams.nta.nic.in/sainik-school-society/";
const AISSEE_BULLETIN =
  "https://cdnbbsr.s3waas.gov.in/s388a839f2f6f1427879fc33ee4acf4f66/uploads/2025/10/20251010937989896.pdf";
const RMS_SITE = "https://www.rashtriyamilitaryschools.edu.in/";
const MSCE_SITE = "https://mscepune.in/";
const MSTA_EXAMS = "https://msta.in/homi-bhabha-exams/";

export const SCHOOL_EXAMS: readonly SchoolExam[] = [
  // ---- Admission tests -------------------------------------------------------
  {
    id: "aissee-6",
    name: "AISSEE, Class 6 entry (Sainik Schools)",
    kind: "admission",
    body: "National Testing Agency (NTA), for the Sainik Schools Society",
    forWhat: "Admission to Class 6 in a Sainik School, a boarding school that prepares children for a career in the armed forces.",
    whoCanSit: "Boys and girls aged 10 to 12 on 31 March of the year they join, so the test is sat in Class 5.",
    when: "Applications for the 2027 test opened in November 2026. The test has been held in January.",
    region: "india",
    sitInClasses: [5],
    officialUrl: AISSEE_SITE,
    sourceUrl: AISSEE_BULLETIN,
    checkedOn: CHECKED,
    registrySlug: "aissee-6",
  },
  {
    id: "aissee-9",
    name: "AISSEE, Class 9 entry (Sainik Schools)",
    kind: "admission",
    body: "National Testing Agency (NTA), for the Sainik Schools Society",
    forWhat: "Admission to Class 9 in a Sainik School.",
    whoCanSit: "Boys and girls aged 13 to 15 on 31 March of the year they join, who will have passed Class 8 by then, so the test is sat in Class 8.",
    when: "Applications for the 2027 test opened in November 2026. The test has been held in January.",
    region: "india",
    sitInClasses: [8],
    officialUrl: AISSEE_SITE,
    sourceUrl: AISSEE_BULLETIN,
    checkedOn: CHECKED,
    registrySlug: "aissee-9",
  },
  {
    id: "jnvst-6",
    name: "Navodaya (JNVST), Class 6 entry",
    kind: "admission",
    body: "Navodaya Vidyalaya Samiti",
    forWhat: "Admission to Class 6 in your district's Jawahar Navodaya Vidyalaya, a free government boarding school.",
    whoCanSit: "Children studying in Class 5 in a recognised school in the district where they live. For 2027 entry: born between 1 May 2015 and 31 July 2017. Seats are split between children from rural and urban schools.",
    when: "The test for 2027 entry is on 28 November 2026. Applications closed on 31 July 2026.",
    region: "india",
    sitInClasses: [5],
    officialUrl: "https://navodaya.gov.in/",
    sourceUrl: "https://cbseitms.rcil.gov.in/nvs/assets/pdf/Final_Prospectus_2027.pdf",
    checkedOn: CHECKED,
  },
  {
    // Added at the owner's request (2026-11-27). Only the facts that hold each year:
    // Navodaya's admissions page lists the Class IX Lateral Entry Selection Test
    // prospectus (2025-26) and its answer key for the test of 8 February 2025.
    // The 2027-28 notice was not posted when checked, so no date of birth here.
    id: "jnvst-9",
    name: "Navodaya (JNVST), Class 9 lateral entry",
    kind: "admission",
    body: "Navodaya Vidyalaya Samiti",
    forWhat: "Admission to Class 9 in a Jawahar Navodaya Vidyalaya, on the seats left vacant.",
    whoCanSit: "Students in Class 8. The date-of-birth window and other rules are in each year's prospectus.",
    when: "The test has been held in early February (8 February 2025), with applications closing around November. The notice for 2027-28 entry is not out yet.",
    region: "india",
    sitInClasses: [8],
    officialUrl: "https://navodaya.gov.in/",
    sourceUrl: "https://navodaya.gov.in/nvs/en/Admission-JNVST/Admission-Notifications/",
    checkedOn: CHECKED,
  },
  {
    id: "rms-cet-6",
    name: "RMS CET, Class 6 entry (Rashtriya Military Schools)",
    kind: "admission",
    body: "Rashtriya Military Schools",
    forWhat: "Admission to Class 6 in a Rashtriya Military School, for boys and girls.",
    whoCanSit: "Children finishing Class 5 (the Class 5 marksheet is needed at admission). Check the age limits in the year's notice.",
    when: "The written test (CET) has been held in December, followed by an interview.",
    region: "india",
    sitInClasses: [5],
    officialUrl: RMS_SITE,
    sourceUrl: RMS_SITE,
    checkedOn: CHECKED,
    registrySlug: "rms-cet-6",
  },
  {
    id: "rms-cet-9",
    name: "RMS CET, Class 9 entry (Rashtriya Military Schools)",
    kind: "admission",
    body: "Rashtriya Military Schools",
    forWhat: "Admission to Class 9 in a Rashtriya Military School, for boys and girls.",
    whoCanSit: "Children finishing Class 8 (the Class 8 marksheet is needed at admission). Check the age limits in the year's notice.",
    when: "The written test (CET) has been held in December, followed by an interview.",
    region: "india",
    sitInClasses: [8],
    officialUrl: RMS_SITE,
    sourceUrl: RMS_SITE,
    checkedOn: CHECKED,
    registrySlug: "rms-cet-9",
  },
  {
    id: "rimc",
    name: "RIMC, Class 8 entry (Rashtriya Indian Military College, Dehradun)",
    kind: "admission",
    body: "Rashtriya Indian Military College, Dehradun",
    forWhat: "Admission to Class 8 at the Rashtriya Indian Military College, Dehradun, for boys and girls.",
    whoCanSit: "Children aged 11½ to 13 who will be in or have passed Class 7 when they join. The test comes about six months before joining, so it is sat in Class 6 or Class 7.",
    when: "Twice a year, in June and December. From the December 2026 test, NTA runs it; before that, MSCE ran it for students in Maharashtra.",
    region: "india",
    sitInClasses: [6, 7],
    officialUrl: "https://www.rimc.gov.in/",
    sourceUrl: "https://mscepune.in/gcc/path/RIMC%20EXAM%20PRESS%20NOTE%20DEC%202026.pdf",
    checkedOn: CHECKED,
    registrySlug: "rimc",
  },
  {
    id: "spi",
    name: "SPI entrance (Services Preparatory Institute)",
    kind: "admission",
    body: "Services Preparatory Institute, Chhatrapati Sambhajinagar (Government of Maharashtra)",
    forWhat: "Admission to Class 11 at SPI, which prepares students for the NDA. Girls apply to the girls' institute in Nashik.",
    whoCanSit: "Class 10 students taking the board exam in 2027, with a Maharashtra domicile (or from Bidar, Belagavi or Karwar district in Karnataka), born between 1 July 2010 and 1 July 2013.",
    when: "The written test for 2027 entry is on 4 April 2027, followed by an interview.",
    region: "maharashtra",
    sitInClasses: [10],
    officialUrl: "https://spicsn.com/",
    sourceUrl: "https://spicsn.com/wp-content/uploads/2026/10/Advt-2027-SPI.pdf",
    checkedOn: CHECKED,
    registrySlug: "spi",
  },

  // ---- Scholarships ----------------------------------------------------------
  {
    id: "nmms",
    name: "NMMS (National Means-cum-Merit Scholarship)",
    kind: "scholarship",
    body: "Ministry of Education scheme. In Maharashtra the exam is run by MSCE, Pune.",
    forWhat: "₹12,000 a year (₹1,000 a month) from Class 9 until Class 12, for able students from families with a low income.",
    whoCanSit: "Class 8 students in government, aided or local-body schools, with a family income under ₹3.5 lakh a year and at least 55% in Class 7 (50% for SC and ST students). Not open to students of unaided schools, Kendriya Vidyalayas, Navodaya, Sainik Schools or government hostels.",
    when: "In Maharashtra, the 2026-27 exam is on 20 December 2026. Other states set their own date.",
    region: "india",
    sitInClasses: [8],
    officialUrl: MSCE_SITE,
    sourceUrl: "https://mscenmms.s3.ap-south-1.amazonaws.com/Information/Notification-Note-2026-27.pdf",
    checkedOn: CHECKED,
  },
  {
    id: "mh-scholarship-4",
    name: "Maharashtra Scholarship exam, Class 4",
    kind: "scholarship",
    body: "Maharashtra State Council of Examination (MSCE), Pune",
    forWhat: "A state merit scholarship. It used to be sat in Class 5; from 2026 it is sat in Class 4.",
    whoCanSit: "Students in Class 4 in Maharashtra.",
    when: "The first Class 4 exam was held in April 2026.",
    region: "maharashtra",
    sitInClasses: [4],
    officialUrl: MSCE_SITE,
    sourceUrl: "https://2026-2.puppssmsce.in/",
    checkedOn: CHECKED,
    registrySlug: "mh-scholarship-4",
  },
  {
    id: "mh-scholarship-7",
    name: "Maharashtra Scholarship exam, Class 7",
    kind: "scholarship",
    body: "Maharashtra State Council of Examination (MSCE), Pune",
    forWhat: "A state merit scholarship. It used to be sat in Class 8; from 2026 it is sat in Class 7.",
    whoCanSit: "Students in Class 7 in Maharashtra.",
    when: "The first Class 7 exam was held in April 2026.",
    region: "maharashtra",
    sitInClasses: [7],
    officialUrl: MSCE_SITE,
    sourceUrl: "https://2026-2.puppssmsce.in/",
    checkedOn: CHECKED,
    registrySlug: "mh-scholarship-7",
  },

  // ---- Competitions ----------------------------------------------------------
  {
    id: "ioqm",
    name: "IOQM (Maths Olympiad, first round)",
    kind: "competition",
    body: "Mathematics Teachers' Association (India), with HBCSE",
    forWhat: "The first round of India's Mathematical Olympiad. Top scorers go on to the Regional Mathematical Olympiad (RMO), then the national olympiad (INMO).",
    whoCanSit: "Students in Class 8 to Class 12. For 2026: born between 1 August 2007 and 31 July 2014.",
    when: "The 2026 round was on 6 September 2026: offline, on an OMR sheet, with no negative marking.",
    region: "india",
    sitInClasses: [8, 9, 10],
    officialUrl: "https://ioqm.mtai.org.in/",
    sourceUrl: "https://ioqm.mtai.org.in/documents/elcrIOQM.pdf",
    checkedOn: CHECKED,
  },
  {
    id: "nsejs",
    name: "NSEJS (Junior Science Olympiad, first round)",
    kind: "competition",
    body: "Indian Association of Physics Teachers (IAPT), with HBCSE",
    forWhat: "The first round of the Junior Science Olympiad (science up to Class 10 level). Top scorers go on to the national round at HBCSE, Mumbai.",
    whoCanSit: "It goes by date of birth, not class. For 2026: born between 1 January 2012 and 31 December 2013, and not yet past the Class 10 board exam. That is usually a Class 8 or Class 9 student.",
    when: "Late November: the 2026 round was on 22 November 2026.",
    region: "india",
    sitInClasses: [8, 9],
    officialUrl: "https://www.iapt.org.in/",
    sourceUrl: "https://iapt.org.in/wp-content/uploads/NSE-2026-Student-Brochure.pdf",
    checkedOn: CHECKED,
  },
  {
    id: "vvm",
    name: "Vidyarthi Vigyan Manthan (VVM)",
    kind: "competition",
    body: "Vidyarthi Vigyan Manthan",
    forWhat: "A national science talent search, from a school round up to a national camp.",
    whoCanSit: "Students in Class 6 to Class 11.",
    when: "The first round is online in November, a state round follows in December and January, then a national round.",
    region: "india",
    sitInClasses: [6, 7, 8, 9, 10],
    officialUrl: "https://vvm.org.in/",
    sourceUrl: "https://vvm.org.in/about-us",
    checkedOn: CHECKED,
  },
  {
    id: "inspire-manak",
    name: "INSPIRE-MANAK (science idea award)",
    kind: "competition",
    body: "Department of Science and Technology, Government of India",
    forWhat: "Students send in an original idea or innovation. Selected ideas go on to district, state and national exhibitions.",
    whoCanSit: "Students in Class 6 to Class 12. The school sends the ideas, up to five per school.",
    when: "Schools send their ideas by mid-September (15 September in 2026).",
    region: "india",
    sitInClasses: [6, 7, 8, 9, 10],
    officialUrl: "https://inspireawards-dst.gov.in/",
    sourceUrl: "https://inspireawards-dst.gov.in/download/updates/CBSE_Circular_INSPIRE-MANAK_2026-27.pdf",
    checkedOn: CHECKED,
  },
  {
    id: "ncsc",
    name: "National Children's Science Congress",
    kind: "competition",
    body: "Department of Science and Technology, run in each state",
    forWhat: "Children work on a small research project about a local problem, in a team with a guide teacher, and present it at district, state and national level.",
    whoCanSit: "Children aged 10 to 17, in school or not, in two groups: 10 to 14 and 14 to 17.",
    when: "Projects run through the school year, from district to state to the national congress.",
    region: "india",
    sitInClasses: [5, 6, 7, 8, 9, 10],
    officialUrl: "https://www.ncsc.co.in/",
    sourceUrl: "https://www.ncsc.co.in/eligibility",
    checkedOn: CHECKED,
  },
  {
    id: "homi-bhabha-6",
    name: "Homi Bhabha Balvaidnyanik Competition, Class 6",
    kind: "competition",
    body: "Greater Bombay Science Teachers' Association (GBSTA)",
    forWhat: "A science competition in four rounds (a written test, a practical, and two interviews), with medals and scholarships for the top students.",
    whoCanSit: "Students in Class 6 of any board, in English or Marathi medium. Students from outside Maharashtra can take part.",
    when: "The written round is in November: 28 November 2026 this year. The later rounds run until March.",
    region: "maharashtra",
    sitInClasses: [6],
    officialUrl: MSTA_EXAMS,
    sourceUrl: "https://msta.in/schedule-2025-2026/",
    checkedOn: CHECKED,
    registrySlug: "homi-bhabha-6",
  },
  {
    id: "homi-bhabha-9",
    name: "Homi Bhabha Balvaidnyanik Competition, Class 9",
    kind: "competition",
    body: "Greater Bombay Science Teachers' Association (GBSTA)",
    forWhat: "A science competition in four rounds (a written test, a practical, and two interviews), with medals and scholarships for the top students.",
    whoCanSit: "Students in Class 9 of any board, in English or Marathi medium. Students from outside Maharashtra can take part.",
    when: "The written round is in November: 28 November 2026 this year. The later rounds run until March.",
    region: "maharashtra",
    sitInClasses: [9],
    officialUrl: MSTA_EXAMS,
    sourceUrl: "https://msta.in/schedule-2025-2026/",
    checkedOn: CHECKED,
    registrySlug: "homi-bhabha-9",
  },

  // ---- Other well-known exams (private institutes) ---------------------------
  {
    id: "mts",
    name: "Maharashtra Talent Search Exam (MTS)",
    kind: "other",
    body: "Centre for Talent Search and Excellence, Modern Education Society's Nowrosjee Wadia College, Pune (held since 1992)",
    forWhat: "A talent search on the whole year's school syllabus, with cash prizes for state and district merit lists (separate urban and rural lists).",
    whoCanSit: "Students in Class 8, 9 or 10 at a government-recognised school, on the syllabus of the class they are in. In English, Marathi, Hindi or Urdu medium. Class 10 also has an interview.",
    when: "Forms close in February (21 February in 2026) and the test is in April: 25 April 2026 last time. The 2027 dates are not out yet.",
    region: "maharashtra",
    sitInClasses: [8, 9, 10],
    officialUrl: "https://www.mtsexam.org/",
    sourceUrl: "https://www.mtsexam.org/Eligibility.aspx",
    checkedOn: "2026-11-28",
  },
];

/** NTSE is what parents ask about most, and it is not held: say so, with the source. */
export const NTSE_NOTE = {
  text: "NTSE (National Talent Search Exam) is not on this list: NCERT has not held it since the 2021-22 round.",
  sourceUrl: "https://ncert.nic.in/",
} as const;
