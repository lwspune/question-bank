/**
 * The institute prospect list (migration 0246): coaching classes near FC Road,
 * taken from Google Maps, that the owner calls to sell PYQ Vault to.
 *
 * The rules under test: one row per Google place, closed or out-of-range places
 * dropped, the Entrance / Board / Other guess, the size band (small classes
 * first, owner 2026-11-09: they have no question bank of their own), which
 * phone numbers get a WhatsApp button, and what an edit may carry.
 */
import { describe, it, expect } from "vitest";
import {
  callHref,
  classifyKind,
  DEFAULT_FILTER,
  distanceKm,
  filterProspects,
  isMobileFormatted,
  MAX_NOTE,
  prospectWhatsappHref,
  sizeBand,
  tallyStatuses,
  toProspectRows,
  validateProspectEdit,
  type MapsPlace,
  type ProspectView,
} from "@/lib/institutes/prospects";

const FC = { lat: 18.5225, lng: 73.8412 };

function place(over: Partial<MapsPlace> = {}): MapsPlace {
  return {
    placeId: "p1",
    title: "Godbole Classes",
    categoryName: "Coaching center",
    address: "FC Road, Pune",
    neighborhood: "Shivajinagar",
    phone: "+91 95038 54178",
    website: null,
    url: "https://www.google.com/maps/search/?api=1&query=x&query_place_id=p1",
    totalScore: 4.6,
    reviewsCount: 29,
    location: { lat: 18.523, lng: 73.842 },
    searchString: "tuition classes",
    ...over,
  };
}

function view(over: Partial<ProspectView> = {}): ProspectView {
  return {
    id: "id-" + (over.place_id ?? "p"),
    place_id: "p",
    name: "X Classes",
    category: "Coaching center",
    address: null,
    neighborhood: null,
    phone: null,
    website: null,
    maps_url: null,
    lat: 18.52,
    lng: 73.84,
    distance_km: 1,
    rating: 4.5,
    reviews: 10,
    kind: "board",
    searches: ["tuition classes"],
    area: "FC Road",
    status: "new",
    note: null,
    follow_up: null,
    updated_at: "2026-11-09T00:00:00Z",
    ...over,
  };
}

describe("distanceKm", () => {
  it("is zero at the same point and about 1.1 km for 0.01 degrees of latitude", () => {
    expect(distanceKm(FC, FC)).toBe(0);
    expect(distanceKm(FC, { lat: FC.lat + 0.01, lng: FC.lng })).toBeCloseTo(1.11, 2);
  });
});

describe("sizeBand", () => {
  it("splits on Google review counts: under 50 small, 50 to 300 medium, over 300 large", () => {
    expect(sizeBand(0)).toBe("small");
    expect(sizeBand(49)).toBe("small");
    expect(sizeBand(50)).toBe("medium");
    expect(sizeBand(300)).toBe("medium");
    expect(sizeBand(301)).toBe("large");
  });
});

describe("classifyKind", () => {
  it("calls a JEE/NEET/CET name or an entrance search Entrance", () => {
    expect(classifyKind({ name: "Bakliwal Tutorials | JEE Main", category: "Coaching center", searches: ["tuition classes"] })).toBe("entrance");
    expect(classifyKind({ name: "Deshpande Tutorials", category: "Coaching center", searches: ["NEET coaching classes"] })).toBe("entrance");
    expect(classifyKind({ name: "Prime Classes", category: "Coaching center", searches: ["science coaching classes 11th 12th"] })).toBe("entrance");
  });

  it("calls a tuition-search find with no entrance signal Board", () => {
    expect(classifyKind({ name: "Godbole Classes", category: "Coaching center", searches: ["tuition classes", "maths tuition"] })).toBe("board");
  });

  it("calls CA, banking, UPSC/MPSC, CLAT, defence and colleges Other, whatever search found them", () => {
    for (const name of [
      "Swapnil Patni - Best CA Classes in Pune",
      "Winner Institute | Banking Classes in Pune",
      "H.V Desai Competitive Exams Centre UPSC MPSC",
      "LegalEdge Coaching Center [CLAT,AILET & MH CET]",
      "Cavalier India Pune [SPI I NDA I CDS I AFCAT I SSB]",
      "Alaknanda Commerce Academy",
    ]) {
      expect(classifyKind({ name, category: "Coaching center", searches: ["JEE coaching classes"] }), name).toBe("other");
    }
    expect(classifyKind({ name: "Abasaheb Garware College", category: "College", searches: ["HSC science classes"] })).toBe("other");
  });

  it("does not read CS inside a word, or CA inside a name, as commerce", () => {
    expect(classifyKind({ name: "Physics Classes", category: "Coaching center", searches: ["tuition classes"] })).toBe("board");
    expect(classifyKind({ name: "Academy of Science", category: "Coaching center", searches: ["tuition classes"] })).toBe("board");
  });
});

describe("toProspectRows", () => {
  const opts = { center: FC, radiusKm: 3, area: "FC Road" };

  it("maps a Google place to a row", () => {
    const [row] = toProspectRows([place()], opts);
    expect(row).toMatchObject({
      place_id: "p1",
      name: "Godbole Classes",
      category: "Coaching center",
      neighborhood: "Shivajinagar",
      phone: "+91 95038 54178",
      website: null,
      rating: 4.6,
      reviews: 29,
      kind: "board",
      searches: ["tuition classes"],
      area: "FC Road",
    });
    expect(row.distance_km).toBeCloseTo(0.11, 1);
  });

  it("keeps one row per place and merges the searches that found it", () => {
    const rows = toProspectRows(
      [place({ searchString: "tuition classes" }), place({ searchString: "JEE coaching classes" }), place({ searchString: "tuition classes" })],
      opts
    );
    expect(rows).toHaveLength(1);
    expect(rows[0].searches).toEqual(["JEE coaching classes", "tuition classes"]);
    expect(rows[0].kind).toBe("entrance");
  });

  it("drops closed places, places outside the radius, and places with no id, name or location", () => {
    const rows = toProspectRows(
      [
        place({ placeId: "closed", permanentlyClosed: true }),
        place({ placeId: "shut", temporarilyClosed: true }),
        place({ placeId: "far", location: { lat: FC.lat + 0.05, lng: FC.lng } }),
        place({ placeId: undefined }),
        place({ placeId: "noname", title: "  " }),
        place({ placeId: "noloc", location: undefined }),
        place({ placeId: "ok" }),
      ],
      opts
    );
    expect(rows.map((r) => r.place_id)).toEqual(["ok"]);
  });

  it("stores a missing rating or review count as null and 0, and trims blanks to null", () => {
    const [row] = toProspectRows([place({ totalScore: undefined, reviewsCount: undefined, website: "  ", phone: "" })], opts);
    expect(row.rating).toBeNull();
    expect(row.reviews).toBe(0);
    expect(row.website).toBeNull();
    expect(row.phone).toBeNull();
  });

  it("never carries the owner's fields, so a re-import cannot overwrite them", () => {
    const [row] = toProspectRows([place()], opts);
    for (const key of ["status", "note", "follow_up", "id"]) expect(row).not.toHaveProperty(key);
  });
});

describe("phone links", () => {
  it("treats Google's 5+5 grouping after +91 as a mobile, and a landline as not", () => {
    expect(isMobileFormatted("+91 95038 54178")).toBe(true);
    expect(isMobileFormatted("+91 80 4275 4961")).toBe(false);
    expect(isMobileFormatted("+91 20 2553 1234")).toBe(false);
    expect(isMobileFormatted("+91 55038 54178")).toBe(false);
    expect(isMobileFormatted(null)).toBe(false);
  });

  it("offers WhatsApp only for a mobile", () => {
    expect(prospectWhatsappHref("+91 95038 54178")).toBe("https://wa.me/919503854178");
    expect(prospectWhatsappHref("+91 80 4275 4961")).toBeNull();
    expect(prospectWhatsappHref(null)).toBeNull();
  });

  it("offers a call for any number", () => {
    expect(callHref("+91 80 4275 4961")).toBe("tel:+918042754961");
    expect(callHref("+91 95038 54178")).toBe("tel:+919503854178");
    expect(callHref("")).toBeNull();
    expect(callHref(null)).toBeNull();
  });
});

describe("validateProspectEdit", () => {
  it("accepts a status, a trimmed note and a follow-up date", () => {
    expect(validateProspectEdit({ status: "contacted", note: "  Call back Monday ", followUp: "2026-11-16" })).toEqual({
      ok: true,
      value: { status: "contacted", note: "Call back Monday", follow_up: "2026-11-16" },
    });
  });

  it("stores an empty note and no date as null", () => {
    expect(validateProspectEdit({ status: "new", note: "   ", followUp: "" })).toEqual({
      ok: true,
      value: { status: "new", note: null, follow_up: null },
    });
  });

  it("refuses an unknown status, a note over the limit, or a date that is not a date", () => {
    expect(validateProspectEdit({ status: "maybe" }).ok).toBe(false);
    expect(validateProspectEdit({ status: "new", note: "x".repeat(MAX_NOTE + 1) }).ok).toBe(false);
    expect(validateProspectEdit({ status: "new", followUp: "16/11/2026" }).ok).toBe(false);
    expect(validateProspectEdit({ status: "new", followUp: "2026-02-30" }).ok).toBe(false);
  });
});

describe("filterProspects", () => {
  const rows = [
    view({ place_id: "big-near", reviews: 900, distance_km: 0.5, kind: "entrance", website: "https://a" }),
    view({ place_id: "small-far", reviews: 10, distance_km: 2.5, kind: "board" }),
    view({ place_id: "small-near", reviews: 20, distance_km: 0.4, kind: "entrance" }),
    view({ place_id: "mid", reviews: 120, distance_km: 1, kind: "board", website: "https://b" }),
    view({ place_id: "ca", reviews: 5, distance_km: 0.1, kind: "other" }),
    view({ place_id: "lost", reviews: 5, distance_km: 0.2, kind: "board", status: "lost" }),
    view({ place_id: "unfit", reviews: 5, distance_km: 0.2, kind: "board", status: "not_fit" }),
  ];
  const ids = (r: ProspectView[]) => r.map((x) => x.place_id);

  it("by default shows our audience, hides Lost and Not a fit, small classes first then nearest", () => {
    expect(ids(filterProspects(rows, DEFAULT_FILTER))).toEqual(["small-near", "small-far", "mid", "big-near"]);
  });

  it("filters by kind, status, size and no website", () => {
    expect(ids(filterProspects(rows, { ...DEFAULT_FILTER, kind: "other" }))).toEqual(["ca"]);
    expect(ids(filterProspects(rows, { ...DEFAULT_FILTER, status: "lost" }))).toEqual(["lost"]);
    expect(ids(filterProspects(rows, { ...DEFAULT_FILTER, size: "large" }))).toEqual(["big-near"]);
    expect(ids(filterProspects(rows, { ...DEFAULT_FILTER, noWebsite: true }))).toEqual(["small-near", "small-far"]);
    expect(filterProspects(rows, { ...DEFAULT_FILTER, kind: "all", status: "all" })).toHaveLength(7);
  });

  it("sorts by distance or by reviews when asked", () => {
    expect(ids(filterProspects(rows, { ...DEFAULT_FILTER, sort: "distance" }))).toEqual(["small-near", "big-near", "mid", "small-far"]);
    expect(ids(filterProspects(rows, { ...DEFAULT_FILTER, sort: "reviews" }))).toEqual(["big-near", "mid", "small-near", "small-far"]);
  });

  it("does not reorder the array it was given", () => {
    const before = ids(rows);
    filterProspects(rows, DEFAULT_FILTER);
    expect(ids(rows)).toEqual(before);
  });
});

describe("tallyStatuses", () => {
  it("counts every status, zero included", () => {
    const t = tallyStatuses([view({ status: "new" }), view({ status: "new" }), view({ status: "won" })]);
    expect(t).toEqual({ new: 2, contacted: 0, interested: 0, demo: 0, won: 1, lost: 0, not_fit: 0 });
  });
});
