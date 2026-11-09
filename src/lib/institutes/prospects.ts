/**
 * Institute prospects (migration 0246): coaching classes near FC Road, taken
 * from Google Maps, that the owner calls or visits to sell PYQ Vault to.
 * Superadmin only (/dashboard/institutes).
 *
 * Pure: the import script maps Google places to rows with toProspectRows, and
 * the page filters and counts with filterProspects / tallyStatuses. The kind
 * (Entrance / Board / Other) is a GUESS from the name, the Maps category and
 * the search that found the place; the owner corrects a wrong one by marking
 * it Not a fit. Size comes from the Google review count and is not stored, so
 * a re-import moves it with the count.
 */

export const PROSPECT_STATUSES = ["new", "contacted", "interested", "demo", "won", "lost", "not_fit"] as const;
export type ProspectStatus = (typeof PROSPECT_STATUSES)[number];

export const STATUS_LABELS: Record<ProspectStatus, string> = {
  new: "New",
  contacted: "Contacted",
  interested: "Interested",
  demo: "Demo done",
  won: "Won",
  lost: "Lost",
  not_fit: "Not a fit",
};

export const PROSPECT_KINDS = ["entrance", "board", "other"] as const;
export type ProspectKind = (typeof PROSPECT_KINDS)[number];

export const KIND_LABELS: Record<ProspectKind, string> = {
  entrance: "JEE / NEET / CET",
  board: "Board tuition",
  other: "Other",
};

export type SizeBand = "small" | "medium" | "large";
export const SIZE_LABELS: Record<SizeBand, string> = { small: "Small", medium: "Medium", large: "Large" };

/** Longest note the owner can keep on a row; mirrors the DB CHECK. */
export const MAX_NOTE = 1000;

export type LatLng = { lat: number; lng: number };

/** The fields we read from one item of Apify's Google Maps scraper output. */
export type MapsPlace = {
  placeId?: string | null;
  title?: string | null;
  categoryName?: string | null;
  address?: string | null;
  neighborhood?: string | null;
  phone?: string | null;
  website?: string | null;
  url?: string | null;
  totalScore?: number | null;
  reviewsCount?: number | null;
  location?: LatLng | null;
  permanentlyClosed?: boolean | null;
  temporarilyClosed?: boolean | null;
  searchString?: string | null;
};

/** What the import writes. Never the owner's fields, so a re-import keeps them. */
export type ProspectImportRow = {
  place_id: string;
  name: string;
  category: string | null;
  address: string | null;
  neighborhood: string | null;
  phone: string | null;
  website: string | null;
  maps_url: string | null;
  lat: number;
  lng: number;
  distance_km: number;
  rating: number | null;
  reviews: number;
  kind: ProspectKind;
  searches: string[];
  area: string;
};

export type ProspectView = ProspectImportRow & {
  id: string;
  status: ProspectStatus;
  note: string | null;
  follow_up: string | null;
  updated_at: string;
};

/** Great-circle distance in km. */
export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Under 50 Google reviews is small, 50 to 300 medium, over 300 large. */
export function sizeBand(reviews: number): SizeBand {
  if (reviews < 50) return "small";
  if (reviews <= 300) return "medium";
  return "large";
}

// Not our audience: commerce, banking, civil services, law, defence, study abroad.
// Whole words only, so "CS" never matches inside "Physics".
const OTHER_RE =
  /\b(ca|cs|cma|acca|cfa|commerce|banking|bank|upsc|mpsc|ias|civil services|clat|ailet|law|mba|cat|gmat|gre|ielts|toefl|nda|cds|afcat|ssb|defen[cs]e)\b/i;
const COLLEGE_CATEGORY_RE = /\b(college|university|school)\b/i;
const ENTRANCE_RE = /\b(jee|neet|cet|iit)\b/i;
const ENTRANCE_SEARCH_RE = /\b(jee|neet|cet|iit)\b|science coaching/i;

/** Entrance (JEE/NEET/CET), Board tuition, or Other. Other wins over the rest. */
export function classifyKind(input: { name: string; category: string | null; searches: string[] }): ProspectKind {
  const text = `${input.name} ${input.category ?? ""}`;
  if (OTHER_RE.test(text) || COLLEGE_CATEGORY_RE.test(input.category ?? "")) return "other";
  if (ENTRANCE_RE.test(text) || input.searches.some((s) => ENTRANCE_SEARCH_RE.test(s))) return "entrance";
  return "board";
}

const blank = (v: string | null | undefined): string | null => {
  const t = (v ?? "").trim();
  return t ? t : null;
};

/**
 * Google places → one row per place inside the radius. Closed places and
 * places without an id, name or location are dropped; the searches that found
 * a place are merged.
 */
export function toProspectRows(
  places: MapsPlace[],
  opts: { center: LatLng; radiusKm: number; area: string }
): ProspectImportRow[] {
  const byId = new Map<string, { place: MapsPlace; searches: Set<string> }>();
  for (const p of places) {
    const id = blank(p.placeId);
    if (!id || !blank(p.title) || !p.location) continue;
    if (p.permanentlyClosed || p.temporarilyClosed) continue;
    const seen = byId.get(id);
    const search = blank(p.searchString);
    if (seen) {
      if (search) seen.searches.add(search);
      continue;
    }
    byId.set(id, { place: p, searches: new Set(search ? [search] : []) });
  }

  const rows: ProspectImportRow[] = [];
  for (const [placeId, { place, searches }] of byId) {
    const loc = place.location!;
    const km = distanceKm(opts.center, loc);
    if (km > opts.radiusKm) continue;
    const name = blank(place.title)!;
    const category = blank(place.categoryName);
    const searchList = [...searches].sort();
    rows.push({
      place_id: placeId,
      name,
      category,
      address: blank(place.address),
      neighborhood: blank(place.neighborhood),
      phone: blank(place.phone),
      website: blank(place.website),
      maps_url: blank(place.url),
      lat: loc.lat,
      lng: loc.lng,
      distance_km: Math.round(km * 100) / 100,
      rating: typeof place.totalScore === "number" ? place.totalScore : null,
      reviews: typeof place.reviewsCount === "number" && place.reviewsCount > 0 ? Math.floor(place.reviewsCount) : 0,
      kind: classifyKind({ name, category, searches: searchList }),
      searches: searchList,
      area: opts.area,
    });
  }
  return rows;
}

/**
 * Google formats an Indian mobile as "+91 95038 54178" (5 + 5) and a landline
 * as "+91 80 4275 4961". Only the first can take a WhatsApp message.
 */
export function isMobileFormatted(phone: string | null | undefined): boolean {
  return /^\+91 [6-9]\d{4} \d{5}$/.test((phone ?? "").trim());
}

export function prospectWhatsappHref(phone: string | null | undefined): string | null {
  if (!isMobileFormatted(phone)) return null;
  return `https://wa.me/${phone!.replace(/\D/g, "")}`;
}

export function callHref(phone: string | null | undefined): string | null {
  const dial = (phone ?? "").replace(/[^\d+]/g, "");
  return dial ? `tel:${dial}` : null;
}

export type ProspectEdit = { status: ProspectStatus; note: string | null; follow_up: string | null };

function isRealDate(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const d = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === iso;
}

/** What the owner may save on a row: a known status, a note, a follow-up date. */
export function validateProspectEdit(input: {
  status: string;
  note?: string | null;
  followUp?: string | null;
}): { ok: true; value: ProspectEdit } | { ok: false; error: string } {
  if (!(PROSPECT_STATUSES as readonly string[]).includes(input.status)) return { ok: false, error: "Pick a status." };
  const note = blank(input.note);
  if (note && note.length > MAX_NOTE) return { ok: false, error: `Keep the note under ${MAX_NOTE} characters.` };
  const followUp = blank(input.followUp);
  if (followUp && !isRealDate(followUp)) return { ok: false, error: "Pick a real follow-up date." };
  return { ok: true, value: { status: input.status as ProspectStatus, note, follow_up: followUp } };
}

export type ProspectFilter = {
  /** "ours" = Entrance + Board. */
  kind: ProspectKind | "ours" | "all";
  /** "active" = everything except Lost and Not a fit. */
  status: ProspectStatus | "active" | "all";
  size: SizeBand | "all";
  noWebsite: boolean;
  sort: "small-first" | "distance" | "reviews";
};

export const DEFAULT_FILTER: ProspectFilter = {
  kind: "ours",
  status: "active",
  size: "all",
  noWebsite: false,
  sort: "small-first",
};

const SIZE_ORDER: Record<SizeBand, number> = { small: 0, medium: 1, large: 2 };

export function filterProspects(rows: ProspectView[], f: ProspectFilter): ProspectView[] {
  const kept = rows.filter((r) => {
    if (f.kind === "ours" ? r.kind === "other" : f.kind !== "all" && r.kind !== f.kind) return false;
    if (f.status === "active" ? r.status === "lost" || r.status === "not_fit" : f.status !== "all" && r.status !== f.status)
      return false;
    if (f.size !== "all" && sizeBand(r.reviews) !== f.size) return false;
    if (f.noWebsite && r.website) return false;
    return true;
  });
  const byDistance = (a: ProspectView, b: ProspectView) => a.distance_km - b.distance_km;
  if (f.sort === "distance") return kept.sort(byDistance);
  if (f.sort === "reviews") return kept.sort((a, b) => b.reviews - a.reviews || byDistance(a, b));
  return kept.sort((a, b) => SIZE_ORDER[sizeBand(a.reviews)] - SIZE_ORDER[sizeBand(b.reviews)] || byDistance(a, b));
}

export function tallyStatuses(rows: Pick<ProspectView, "status">[]): Record<ProspectStatus, number> {
  const out = Object.fromEntries(PROSPECT_STATUSES.map((s) => [s, 0])) as Record<ProspectStatus, number>;
  for (const r of rows) out[r.status] += 1;
  return out;
}
