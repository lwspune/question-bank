import { describe, expect, it } from "vitest";
import {
  parseFeedRequest,
  formatCursor,
  secretMatches,
  toFeedLead,
  MAX_LIMIT,
  DEFAULT_LIMIT,
} from "@/lib/leads/defenceFeed";

const ID = "11111111-1111-4111-8111-111111111111";
const AT = "2026-07-15T16:16:12.104123+00:00";

function params(q: string) {
  return new URLSearchParams(q);
}

describe("parseFeedRequest", () => {
  it("reads source, cursor and limit", () => {
    expect(parseFeedRequest(params(`source=account&after=${encodeURIComponent(formatCursor(AT, ID))}&limit=50`))).toEqual({
      ok: true,
      source: "account",
      after: { at: AT, id: ID },
      limit: 50,
    });
  });

  it("starts from the beginning when there is no cursor, with the default page size", () => {
    expect(parseFeedRequest(params("source=quiz"))).toEqual({ ok: true, source: "quiz", after: null, limit: DEFAULT_LIMIT });
  });

  it("refuses an unknown or missing source", () => {
    expect(parseFeedRequest(params("source=email")).ok).toBe(false);
    expect(parseFeedRequest(params("")).ok).toBe(false);
  });

  it("refuses a cursor that is not <timestamp>~<uuid>", () => {
    expect(parseFeedRequest(params("source=account&after=yesterday")).ok).toBe(false);
    expect(parseFeedRequest(params(`source=account&after=${encodeURIComponent(`${AT}~not-a-uuid`)}`)).ok).toBe(false);
    expect(parseFeedRequest(params(`source=account&after=${encodeURIComponent(`not a time~${ID}`)}`)).ok).toBe(false);
  });

  it("refuses a limit outside 1..MAX_LIMIT rather than quietly changing it", () => {
    expect(parseFeedRequest(params("source=account&limit=0")).ok).toBe(false);
    expect(parseFeedRequest(params(`source=account&limit=${MAX_LIMIT + 1}`)).ok).toBe(false);
    expect(parseFeedRequest(params("source=account&limit=ten")).ok).toBe(false);
    expect(parseFeedRequest(params(`source=account&limit=${MAX_LIMIT}`)).ok).toBe(true);
  });
});

describe("secretMatches", () => {
  it("accepts the configured secret as a Bearer token", () => {
    expect(secretMatches("Bearer s3cret-value-long-enough", "s3cret-value-long-enough")).toBe(true);
  });

  it("refuses a wrong, missing or differently sized token", () => {
    expect(secretMatches("Bearer wrong", "s3cret-value-long-enough")).toBe(false);
    expect(secretMatches(null, "s3cret-value-long-enough")).toBe(false);
    expect(secretMatches("s3cret-value-long-enough", "s3cret-value-long-enough")).toBe(false);
  });

  it("fails closed when the server has no secret configured", () => {
    expect(secretMatches("Bearer ", "")).toBe(false);
    expect(secretMatches("Bearer anything", undefined)).toBe(false);
  });
});

describe("toFeedLead", () => {
  it("keeps only the fields a lead needs, and gives its cursor", () => {
    expect(
      toFeedLead({
        id: ID,
        changed_at: AT,
        lead_at: "2026-07-01T10:00:00+00:00",
        name: "  Test Student ",
        mobile: "919000000001",
        exams: ["nda", "cds"],
        stage: "class-12",
        city: " Pune ",
      })
    ).toEqual({
      cursor: formatCursor(AT, ID),
      leadAt: "2026-07-01T10:00:00+00:00",
      name: "Test Student",
      mobile: "919000000001",
      exams: ["nda", "cds"],
      stage: "class-12",
      city: "Pune",
    });
  });

  it("turns blank names and cities into null", () => {
    const lead = toFeedLead({ id: ID, changed_at: AT, lead_at: AT, name: " ", mobile: "919000000001", exams: ["afcat"], stage: null, city: "" });
    expect(lead.name).toBeNull();
    expect(lead.city).toBeNull();
  });
});
