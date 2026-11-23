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
 */
import type { ExamSlug } from "@/lib/exam/examContext";

export const PARTNER_NAME = "Defence Mania";

export type PartnerCourse = {
  /** URL-safe id: the tap link, the UTM campaign and the stored row (CHECKed in 0269). */
  id: string;
  examSlug: ExamSlug;
  title: string;
  /** One line under the title. */
  blurb: string;
  pricePaise: number;
  /** First class, YYYY-MM-DD (India). */
  startsOn: string;
  /** Last day the card shows (the exam day), YYYY-MM-DD (India); null = until removed by hand. */
  endsOn: string | null;
  /** The partner's course page. */
  url: string;
};

/** The exams that get a course shelf on /store, in shelf order. */
export const COURSE_EXAMS: readonly { slug: ExamSlug; label: string; short: string }[] = [
  { slug: "cds", label: "CDS", short: "CDS" },
  { slug: "afcat", label: "AFCAT", short: "AFCAT" },
];

export const PARTNER_COURSES: readonly PartnerCourse[] = [
  {
    id: "cds-sikandar-3",
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
    examSlug: "afcat",
    title: "AFCAT 1 2027 Crash Course",
    blurb: "Live classes, PDFs for Maths, English, General Awareness and Reasoning, and full mocks",
    pricePaise: 199900,
    startsOn: "2026-12-20",
    // AFCAT 1 2027 has no announced date yet: take the card down by hand after it.
    endsOn: null,
    url: "https://defencemania.classx.co.in/new-courses/193-afcat-1-2027-crash-course",
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

/** "Starts 5 Dec" before the first class; after it, the batch is running and recorded. */
export function courseStatusLine(course: Pick<PartnerCourse, "startsOn">, now: Date): string {
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

export type CourseShelf<C> = { key: string; slug: ExamSlug; label: string; short: string; courses: C[] };

/** One shelf per exam with a course still on sale, in COURSE_EXAMS order. */
export function courseShelves<C extends Pick<PartnerCourse, "examSlug" | "endsOn">>(
  courses: readonly C[],
  now: Date
): CourseShelf<C>[] {
  const onSale = coursesOnSale(courses, now);
  return COURSE_EXAMS.flatMap((e) => {
    const mine = onSale.filter((c) => c.examSlug === e.slug);
    return mine.length ? [{ key: `courses-${e.slug}`, slug: e.slug, label: e.label, short: e.short, courses: mine }] : [];
  });
}

/** Our own tap link for a course (counted, then sent on to the partner). */
export function tapHref(course: Pick<PartnerCourse, "id">): string {
  return `/api/partner-course/${course.id}`;
}

export function courseById(id: string): PartnerCourse | null {
  return PARTNER_COURSES.find((c) => c.id === id) ?? null;
}
