/**
 * Offline classes in Pune: the interest form at /classes (owner, 2026-11-16;
 * migration 0265). It replaced the 1:1 tutoring check (/tutor, 0190), because
 * online tutoring is hard to build and the owner's own classes are in Pune.
 *
 * A visitor picks one or more courses, Pune or another city, and leaves a
 * mobile (plus an optional name) with consent to be called; the team calls
 * them back. Signed-out visitors may answer too (a parent may have no account).
 *
 * Pure: the route, the form and the superadmin list all use these rules, and
 * they mirror the table's CHECKs so a bad answer is refused here with a clear
 * message, not by the database. Spec: tests/class-interest.test.ts.
 */
import { normalizeMobile } from "@/lib/profile/mobile";
import { csvCell, csvMobile } from "@/lib/students/roster";

/**
 * The courses the owner offers, in the order they are shown (the defence exams
 * together; CDS and AFCAT added 2026-11-16, SPI 2026-11-18). Mirrored by the
 * table's CHECK (0265, widened by 0272).
 */
export const CLASS_COURSES = [
  { slug: "nda", label: "NDA" },
  { slug: "cds", label: "CDS" },
  { slug: "afcat", label: "AFCAT" },
  { slug: "spi", label: "SPI" },
  { slug: "mht-cet", label: "MHT-CET" },
  { slug: "jee", label: "JEE" },
  { slug: "board-10", label: "10th Board" },
  { slug: "board-12", label: "12th Board" },
  { slug: "ssc-cgl", label: "SSC CGL" },
] as const;

export type ClassCourse = (typeof CLASS_COURSES)[number]["slug"];

const COURSE_ORDER: readonly string[] = CLASS_COURSES.map((c) => c.slug);
const COURSE_LABEL = new Map<string, string>(CLASS_COURSES.map((c) => [c.slug, c.label]));

export const courseLabel = (slug: string): string => COURSE_LABEL.get(slug) ?? slug;

/** The city the classes are in, offered first. */
export const PUNE = "Pune";

/** student_profiles.city's cap (migration 0049), kept for a lead's city and name too. */
export const CLASS_TEXT_MAX = 80;

export type ClassInterestAnswer = {
  courses: ClassCourse[];
  city: string;
  isPune: boolean;
  /** Canonical 91XXXXXXXXXX. */
  mobile: string;
  name: string | null;
};

export type ClassInterestField = "courses" | "city" | "mobile" | "consent" | "name";

export type ClassInterestValidation =
  | { ok: true; value: ClassInterestAnswer }
  | { ok: false; field: ClassInterestField | null; error: string };

const tidy = (s: string) => s.trim().replace(/\s+/g, " ");

/**
 * The form's answer, checked. `city` is "pune" or "other"; under Other the
 * typed `otherCity` is used, and typing Pune there still counts as Pune.
 */
export function validateClassInterest(raw: unknown): ClassInterestValidation {
  if (!raw || typeof raw !== "object") return { ok: false, field: null, error: "Invalid answer." };
  const body = raw as Record<string, unknown>;

  if (!Array.isArray(body.courses) || body.courses.length === 0) {
    return { ok: false, field: "courses", error: "Choose at least one course." };
  }
  if (!body.courses.every((c) => typeof c === "string" && COURSE_ORDER.includes(c))) {
    return { ok: false, field: "courses", error: "Choose from the courses listed." };
  }
  const courses = COURSE_ORDER.filter((c) => (body.courses as string[]).includes(c)) as ClassCourse[];

  let city: string;
  if (body.city === "pune") {
    city = PUNE;
  } else if (body.city === "other") {
    const typed = typeof body.otherCity === "string" ? tidy(body.otherCity) : "";
    if (!typed) return { ok: false, field: "city", error: "Type your city." };
    if (typed.length > CLASS_TEXT_MAX) return { ok: false, field: "city", error: "That city name is too long." };
    city = typed.toLowerCase() === "pune" ? PUNE : typed;
  } else {
    return { ok: false, field: "city", error: "Choose Pune or Other." };
  }

  const mobile = normalizeMobile(typeof body.mobile === "string" ? body.mobile : null);
  if (!mobile) return { ok: false, field: "mobile", error: "Enter a valid 10-digit mobile number." };

  if (body.consent !== true) {
    return { ok: false, field: "consent", error: "Please tick the box so our team may call you." };
  }

  let name: string | null = null;
  if (body.name !== undefined && body.name !== null) {
    if (typeof body.name !== "string") return { ok: false, field: "name", error: "Invalid name." };
    const n = tidy(body.name);
    if (n.length > CLASS_TEXT_MAX) return { ok: false, field: "name", error: "That name is too long." };
    name = n || null;
  }

  return { ok: true, value: { courses, city, isPune: city === PUNE, mobile, name } };
}

/** One lead, as the team's list reads it. */
export type ClassLead = {
  id: string;
  name: string | null;
  email: string | null;
  courses: string[];
  city: string;
  isPune: boolean;
  mobile: string;
  fromSection: string | null;
  calledAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/** Pune first (the classes are there), then the newest first. */
export function sortClassLeads(rows: readonly ClassLead[]): ClassLead[] {
  return [...rows].sort((a, b) => {
    if (a.isPune !== b.isPune) return a.isPune ? -1 : 1;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export type ClassLeadsSummary = {
  total: number;
  pune: number;
  notCalled: number;
  /** Leads per course (a lead counts once under each course it picked), most first. */
  byCourse: { course: string; label: string; leads: number; pune: number }[];
};

export function summariseClassLeads(rows: readonly ClassLead[]): ClassLeadsSummary {
  const byCourse = new Map<string, { leads: number; pune: number }>();
  for (const r of rows) {
    for (const c of r.courses) {
      const t = byCourse.get(c) ?? { leads: 0, pune: 0 };
      t.leads++;
      if (r.isPune) t.pune++;
      byCourse.set(c, t);
    }
  }
  return {
    total: rows.length,
    pune: rows.filter((r) => r.isPune).length,
    notCalled: rows.filter((r) => !r.calledAt).length,
    byCourse: Array.from(byCourse, ([course, t]) => ({ course, label: courseLabel(course), ...t })).sort(
      (a, b) => b.leads - a.leads || COURSE_ORDER.indexOf(a.course) - COURSE_ORDER.indexOf(b.course)
    ),
  };
}

const CSV_HEADER = ["name", "mobile", "city", "courses", "called", "asked_on", "email", "from"] as const;

/** The rows AS GIVEN (pass them sorted, so the file matches the screen). Mobile and formula guard as in the roster CSV. */
export function toClassLeadsCsv(rows: readonly ClassLead[]): string {
  const lines = rows.map((r) =>
    [
      r.name ?? "",
      csvMobile(r.mobile),
      r.city,
      r.courses.map(courseLabel).join(" | "),
      r.calledAt ? r.calledAt.slice(0, 10) : "",
      r.createdAt.slice(0, 10),
      r.email ?? "",
      r.fromSection ?? "",
    ]
      .map(csvCell)
      .join(",")
  );
  return [CSV_HEADER.join(","), ...lines].join("\n");
}
