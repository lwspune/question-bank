/**
 * The class offer on /me (owner, 2026-11-22; migration 0282; widened
 * 2026-11-23, migration 0285). A card on Home asks a student ONCE about
 * offline classes in Pune for their main exam: the SPI crash course for a
 * Class 10 student, else that exam's course (NDA, MHT-CET, JEE, CDS, AFCAT,
 * 12th Board, SSC CGL). Yes · No · Know more. A Yes asks for the mobile and
 * city and becomes a /classes lead (the team calls back); No ends the offers
 * for good; Know more opens the exam's pattern-and-syllabus page and leaves
 * the card where it is.
 *
 * Since 2026-11-23 this card is where most students meet the classes: the
 * header's Classes button moved to the avatar menu.
 *
 * Pure: the loader, the card and POST /api/me/class-offer use these rules.
 * Spec: tests/me-class-offer.test.ts.
 */
import { validateClassInterest, type ClassInterestAnswer, type ClassInterestField } from "@/lib/classes/interest";

/**
 * The exams that mean a student is in Class 10 this year: SPI itself, and the
 * Class 10 boards. Stage "Class 9-10" alone is NOT enough (owner, 2026-11-22):
 * it includes Class 9 students, who do not sit SPI this year.
 */
export const CLASS_10_EXAMS = ["spi", "cbse-10", "mh-ssc-10", "icse-10", "up-board-10"] as const;

/** The /classes courses the card can ask about (the DB CHECK in 0285 mirrors it). */
export const CLASS_OFFER_SLUGS = ["spi", "nda", "mht-cet", "jee", "cds", "afcat", "board-12", "ssc-cgl"] as const;
export type ClassOffer = (typeof CLASS_OFFER_SLUGS)[number];

export const CLASS_OFFERS: readonly {
  offer: ClassOffer;
  /** The student exams that lead to this course. Each exam is in one entry only. */
  exams: readonly string[];
  /** The exam whose pattern-and-syllabus page Know more opens; unset = the student's own exam. */
  knowMoreExam?: string;
  title: string;
  question: string;
}[] = [
  {
    offer: "spi",
    exams: CLASS_10_EXAMS,
    knowMoreExam: "spi",
    title: "SPI crash course in Pune",
    question: "Are you looking for an SPI crash course? We run one offline in Pune.",
  },
  {
    offer: "nda",
    exams: ["nda"],
    title: "Offline NDA classes in Pune",
    question: "Are you looking for offline NDA classes? We run them in Pune.",
  },
  {
    offer: "mht-cet",
    exams: ["mht-cet"],
    title: "Offline MHT-CET classes in Pune",
    question: "Are you looking for offline MHT-CET classes? We run them in Pune.",
  },
  {
    offer: "jee",
    exams: ["jee-mains"],
    title: "Offline JEE classes in Pune",
    question: "Are you looking for offline JEE classes? We run them in Pune.",
  },
  {
    offer: "cds",
    exams: ["cds"],
    title: "Offline CDS classes in Pune",
    question: "Are you looking for offline CDS classes? We run them in Pune.",
  },
  {
    offer: "afcat",
    exams: ["afcat"],
    title: "Offline AFCAT classes in Pune",
    question: "Are you looking for offline AFCAT classes? We run them in Pune.",
  },
  {
    offer: "board-12",
    exams: ["cbse-12", "mh-hsc-12", "isc-12", "up-board-12"],
    title: "12th Board classes in Pune",
    question: "Are you looking for offline classes for your 12th Board exams? We run them in Pune.",
  },
  {
    offer: "ssc-cgl",
    exams: ["ssc-cgl", "ssc-cgl-tier-2"],
    title: "Offline SSC CGL classes in Pune",
    question: "Are you looking for offline SSC CGL classes? We run them in Pune.",
  },
];

export const isClassOffer = (v: unknown): v is ClassOffer =>
  typeof v === "string" && (CLASS_OFFER_SLUGS as readonly string[]).includes(v);

export function classOfferInfo(offer: ClassOffer) {
  return CLASS_OFFERS.find((o) => o.offer === offer)!;
}

/** The course an exam leads to, or null. */
export function offerForExam(examSlug: string): ClassOffer | null {
  return CLASS_OFFERS.find((o) => o.exams.includes(examSlug))?.offer ?? null;
}

/** The exam whose Know more page the card links, for this offer and student exam. */
export function knowMoreExamFor(offer: ClassOffer, examSlug: string): string {
  return classOfferInfo(offer).knowMoreExam ?? examSlug;
}

/**
 * The one card to show, or null. One offer per student, EVER (owner,
 * 2026-11-23): the main exam's course, else the first other exam that has
 * one. Never to a teacher; never once any offer was answered, Yes or No; never
 * to a student whose number is already with the team from /classes.
 */
export function pickClassOffer(input: {
  /** The exam in focus, else their first (lib/me/startNext startNextExam). */
  mainExam: string | null;
  targets: readonly string[];
  role: string | null;
  answered: ReadonlySet<ClassOffer>;
  hasLead: boolean;
}): { offer: ClassOffer; examSlug: string } | null {
  if (input.role === "teacher" || input.answered.size > 0 || input.hasLead) return null;
  const order = input.mainExam ? [input.mainExam, ...input.targets.filter((t) => t !== input.mainExam)] : input.targets;
  for (const examSlug of order) {
    const offer = offerForExam(examSlug);
    if (offer) return { offer, examSlug };
  }
  return null;
}

export type ClassOfferAction =
  | { offer: ClassOffer; action: "seen" | "more" | "no" }
  | { offer: ClassOffer; action: "yes"; lead: ClassInterestAnswer };

export type ClassOfferValidation =
  | { ok: true; value: ClassOfferAction }
  | { ok: false; field: ClassInterestField | null; error: string };

/**
 * What the card sent, checked. A Yes goes through the /classes rules
 * (validateClassInterest) for the offer's ONE course, whatever else the body
 * carries, so the card can never widen a lead.
 */
export function validateClassOfferAction(raw: unknown): ClassOfferValidation {
  if (!raw || typeof raw !== "object") return { ok: false, field: null, error: "Invalid answer." };
  const body = raw as Record<string, unknown>;
  if (!isClassOffer(body.offer)) return { ok: false, field: null, error: "Unknown offer." };
  const offer = body.offer;

  if (body.action === "seen" || body.action === "more" || body.action === "no") {
    return { ok: true, value: { offer, action: body.action } };
  }
  if (body.action !== "yes") return { ok: false, field: null, error: "Unknown action." };

  const v = validateClassInterest({
    courses: [offer],
    city: body.city,
    otherCity: body.otherCity,
    mobile: body.mobile,
    consent: body.consent,
  });
  if (!v.ok) return v;
  return { ok: true, value: { offer, action: "yes", lead: v.value } };
}
