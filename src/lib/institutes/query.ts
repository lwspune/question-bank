import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { readAllPages } from "@/lib/supabase/readAllPages";
import {
  PROSPECT_KINDS,
  PROSPECT_STATUSES,
  type ProspectKind,
  type ProspectStatus,
  type ProspectView,
} from "./prospects";

const COLUMNS =
  "id, place_id, name, category, address, neighborhood, phone, website, maps_url, lat, lng, distance_km, rating, reviews, kind, searches, area, status, note, follow_up, updated_at";

/**
 * Every institute prospect (migration 0246), read with the service role. Paged,
 * because PostgREST stops at 1,000 rows without an error and a wider area
 * would pass that.
 */
export async function loadProspects(admin: SupabaseClient): Promise<ProspectView[]> {
  const rows = await readAllPages<Record<string, unknown>>((from, to) =>
    admin.from("institute_prospects").select(COLUMNS).order("place_id").range(from, to)
  );
  return rows.map(toView);
}

const str = (v: unknown): string | null => (typeof v === "string" ? v : null);

function toView(r: Record<string, unknown>): ProspectView {
  const kind = str(r.kind);
  const status = str(r.status);
  return {
    id: String(r.id),
    place_id: String(r.place_id),
    name: String(r.name),
    category: str(r.category),
    address: str(r.address),
    neighborhood: str(r.neighborhood),
    phone: str(r.phone),
    website: str(r.website),
    maps_url: str(r.maps_url),
    lat: Number(r.lat),
    lng: Number(r.lng),
    // numeric columns can arrive as strings from PostgREST
    distance_km: Number(r.distance_km),
    rating: r.rating == null ? null : Number(r.rating),
    reviews: Number(r.reviews ?? 0),
    kind: isKind(kind) ? kind : "other",
    searches: Array.isArray(r.searches) ? r.searches.map(String) : [],
    area: String(r.area),
    status: isStatus(status) ? status : "new",
    note: str(r.note),
    follow_up: str(r.follow_up),
    updated_at: String(r.updated_at),
  };
}

const isKind = (v: string | null): v is ProspectKind => !!v && (PROSPECT_KINDS as readonly string[]).includes(v);
const isStatus = (v: string | null): v is ProspectStatus => !!v && (PROSPECT_STATUSES as readonly string[]).includes(v);
