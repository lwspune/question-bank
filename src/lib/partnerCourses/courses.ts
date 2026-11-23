/**
 * Partner courses on the store (owner, 2026-11-17): a TRIAL that links online
 * courses of our offline partner Defence Mania from /store, to see whether
 * students tap them. Nothing is agreed with the partner yet (no commission,
 * no coupon), so the signals are our own tap count (partner_course_clicks,
 * migration 0269, via GET /api/partner-course/[id]) and the UTM tags we add.
 * Experiment `partner-courses` on /dashboard/growth. PURE.
 * Spec: tests/partner-courses.test.ts.
 *
 * Each pair on the partner's site was an older batch already running plus a
 * new one (read from the banner images, 2026-11-17): Sikandar 2.0 and the
 * AFCAT "Spartans" batch started 1 Nov; Sikandar 3.0 starts 5 Dec and the AFCAT
 * Crash Course 20 Dec. We link the new ones, so a student who buys now starts
 * with the batch. Classes are recorded, so a course stays worth buying until
 * its exam: `endsOn` is the exam day, and the card comes down after it.
 *
 * LWS Pune's SPI course joined on 2026-11-23 (owner): its page gives no start
 * date or contents, so the card says only what the banner shows. Its shelf is
 * first for SPI students AND Maharashtra SSC / CBSE Class 10 students (`alsoFor`),
 * since SPI is a Class 10 entrance and only 2 students had chosen SPI itself.
 * A course is never shelved on a `noPublicContent` exam: nobody can choose one,
 * so it would be first for no one (the owner's Navodaya course, dropped).
 */
import type { ExamSlug } from "@/lib/exam/examContext";

/** Who runs a course: their site (the only host its link may point at) and how the card names them. */
export const PROVIDERS = {
  "Defence Mania": { host: "defencemania.classx.co.in", from: "our partner Defence Mania" },
  "LWS Pune": { host: "online.lwspune.in", from: "LWS Pune" },
} as const;
export type Provider = keyof typeof PROVIDERS;

export type PartnerCourse = {
  /** URL-safe id: the tap link, the UTM campaign and the stored row (CHECKed in 0269). */
  id: string;
  provider: Provider;
  examSlug: ExamSlug;
  title: string;
  /** One line under the title. */
  blurb: string;
  pricePaise: number;
  /** First class, YYYY-MM-DD (India); null = the course page gives none. */
  startsOn: string | null;
  /** Last day the card shows (the exam day), YYYY-MM-DD (India); null = until removed by hand. */
  endsOn: string | null;
  /** The provider's course page. */
  url: string;
};

/** The line under a card: who runs the course, and that a tap leaves PYQ Vault. */
export function providerLine(provider: Provider): string {
  return `From ${PROVIDERS[provider].from}. Opens their site.`;
}

/**
 * The exams that get a course shelf on /store, in shelf order. `alsoFor` are
 * other exams whose students see that shelf first too.
 */
export const COURSE_EXAMS: readonly { slug: ExamSlug; label: string; short: string; alsoFor: readonly ExamSlug[] }[] = [
  { slug: "cds", label: "CDS", short: "CDS", alsoFor: [] },
  { slug: "afcat", label: "AFCAT", short: "AFCAT", alsoFor: [] },
  { slug: "spi", label: "SPI", short: "SPI", alsoFor: ["mh-ssc-10", "cbse-10"] },
];

export const PARTNER_COURSES: readonly PartnerCourse[] = [
  {
    id: "cds-sikandar-3",
    provider: "Defence Mania",
    examSlug: "cds",
    title: "CDS 1 2027 Sikandar 3.0",
    blurb: "Live and recorded classes for GK and English, PDFs, mocks and a test series",
    pricePaise: 199900,
    startsOn: "2026-12-05",
    // CDS 2027 (I), UPSC calendar (lib/exam/calendar.ts).
    endsOn: "2027-04-11",
    url: "https://defencemania.classx.co.in/new-courses/194-cds-1-2027-sikandar-30",
  },
  {
    id: "afcat-1-2027-crash",
    provider: "Defence Mania",
    examSlug: "afcat",
    title: "AFCAT 1 2027 Crash Course",
    blurb: "Live classes, PDFs for Maths, English, General Awareness and Reasoning, and full mocks",
    pricePaise: 199900,
    startsOn: "2026-12-20",
    // AFCAT 1 2027 has no announced date yet: take the card down by hand after it.
    endsOn: null,
    url: "https://defencemania.classx.co.in/new-courses/193-afcat-1-2027-crash-course",
  },
  {
    id: "spi-exam-lws",
    provider: "LWS Pune",
    examSlug: "spi",
    title: "SPI Exam: Complete Preparation",
    // Only what the page shows (banner): its description is about the exam, not the course.
    blurb: "Both papers: Mathematics, and the General Ability Test (English, Science, Social Studies, GK, Current Affairs, Reasoning)",
    pricePaise: 9900,
    startsOn: null,
    endsOn: null,
    url: "https://online.lwspune.in/new-courses/1-spi-exam",
  },
];

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** YYYY-MM-DD of `now` in India: the student's calendar day, not the server's. */
function indiaDay(now: Date): string {
  return new Date(now.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

/** Courses whose card still shows on `now`'s India date (through their last day). */
export function coursesOnSale<C extends Pick<PartnerCourse, "endsOn">>(courses: readonly C[], now: Date): C[] {
  const today = indiaDay(now);
  return courses.filter((c) => c.endsOn === null || today <= c.endsOn);
}

/**
 * "Starts 5 Dec" before the first class; after it, the batch is running and
 * recorded. Null when the course gives no start date: the card says nothing
 * rather than guess.
 */
export function courseStatusLine(course: Pick<PartnerCourse, "startsOn">, now: Date): string | null {
  if (course.startsOn === null) return null;
  if (indiaDay(now) >= course.startsOn) return "Batch running, classes recorded";
  const [, m, d] = course.startsOn.split("-").map(Number);
  return `Starts ${d} ${MONTHS[m - 1]}`;
}

/** The partner's page with our UTM tags, so their own stats can see whom we sent. */
export function outboundUrl(course: Pick<PartnerCourse, "id" | "url">): string {
  const u = new URL(course.url);
  u.searchParams.set("utm_source", "pyqvault");
  u.searchParams.set("utm_medium", "store");
  u.searchParams.set("utm_campaign", course.id);
  return u.toString();
}

export type CourseShelf<C> = {
  key: string;
  slug: ExamSlug;
  label: string;
  short: string;
  /** The exams whose students see this shelf first: its own, then `alsoFor`. */
  feedSlugs: ExamSlug[];
  courses: C[];
};

/** One shelf per exam with a course still on sale, in COURSE_EXAMS order. */
export function courseShelves<C extends Pick<PartnerCourse, "examSlug" | "endsOn">>(
  courses: readonly C[],
  now: Date
): CourseShelf<C>[] {
  const onSale = coursesOnSale(courses, now);
  return COURSE_EXAMS.flatMap((e) => {
    const mine = onSale.filter((c) => c.examSlug === e.slug);
    if (mine.length === 0) return [];
    return [
      {
        key: `courses-${e.slug}`,
        slug: e.slug,
        label: e.label,
        short: e.short,
        feedSlugs: [e.slug, ...e.alsoFor],
        courses: mine,
      },
    ];
  });
}

/** "CDS", "CDS and AFCAT", "CDS, AFCAT and SPI". */
export function joinNames(names: readonly string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** Our own tap link for a course (counted, then sent on to the partner). */
export function tapHref(course: Pick<PartnerCourse, "id">): string {
  return `/api/partner-course/${course.id}`;
}

export function courseById(id: string): PartnerCourse | null {
  return PARTNER_COURSES.find((c) => c.id === id) ?? null;
}
