/**
 * The class offer on /me (owner, 2026-11-22; migration 0282). A card on Home
 * asks Class 10 students "Looking for an SPI crash course in Pune?" and NDA
 * students "Looking for offline NDA classes in Pune?", with Yes · No · Know
 * more. A Yes asks for the mobile and city and becomes a /classes lead (the
 * team calls back); No hides the card for good; Know more opens the exam's
 * pattern-and-syllabus page and leaves the card where it is.
 *
 * Pure: the loader, the card and POST /api/me/class-offer use these rules.
 * Spec: tests/me-class-offer.test.ts.
 */
import { validateClassInterest, type ClassInterestAnswer, type ClassInterestField } from "@/lib/classes/interest";

export type ClassOffer = "spi" | "nda";

/**
 * The exams that mean a student is in Class 10 this year: SPI itself, and the
 * Class 10 boards. Stage "Class 9-10" alone is NOT enough (owner, 2026-11-22):
 * it includes Class 9 students, who do not sit SPI this year.
 */
export const CLASS_10_EXAMS = ["spi", "cbse-10", "mh-ssc-10", "icse-10", "up-board-10"] as const;

/** Each offer, in the order a student who fits both is asked (SPI is the nearer exam). */
export const CLASS_OFFERS: readonly {
  offer: ClassOffer;
  /** The exam whose pattern-and-syllabus page Know more opens. */
  examSlug: string;
  title: string;
  question: string;
  /** The exam's name on the Know more button. */
  examLabel: string;
}[] = [
  {
    offer: "spi",
    examSlug: "spi",
    title: "SPI crash course in Pune",
    question: "Are you looking for an SPI crash course? We run one offline in Pune.",
    examLabel: "SPI",
  },
  {
    offer: "nda",
    examSlug: "nda",
    title: "Offline NDA classes in Pune",
    question: "Are you looking for offline NDA classes? We run them in Pune.",
    examLabel: "NDA",
  },
];

const OFFER_SLUGS: readonly string[] = CLASS_OFFERS.map((o) => o.offer);

export const isClassOffer = (v: unknown): v is ClassOffer => typeof v === "string" && OFFER_SLUGS.includes(v);

export function classOfferInfo(offer: ClassOffer) {
  return CLASS_OFFERS.find((o) => o.offer === offer)!;
}

/** The offers a student's exams fit, in asking order. */
export function offersFor(targets: readonly string[]): ClassOffer[] {
  const out: ClassOffer[] = [];
  if (targets.some((t) => (CLASS_10_EXAMS as readonly string[]).includes(t))) out.push("spi");
  if (targets.includes("nda")) out.push("nda");
  return out;
}

/**
 * The one card to show, or null. Never to a teacher; never again once the
 * student answered it; never for a course they already asked about on
 * /classes (their number is already with the team).
 */
export function pickClassOffer(input: {
  targets: readonly string[];
  role: string | null;
  answered: ReadonlySet<ClassOffer>;
  leadCourses: readonly string[];
}): ClassOffer | null {
  if (input.role === "teacher") return null;
  for (const o of offersFor(input.targets)) {
    if (!input.answered.has(o) && !input.leadCourses.includes(o)) return o;
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
