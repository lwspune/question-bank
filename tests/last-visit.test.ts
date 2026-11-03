import { describe, expect, it } from "vitest";
import { parseLastVisit, serializeLastVisit } from "@/lib/visits/lastVisit";

const NOW = Date.parse("2026-11-02T10:00:00Z");

describe("last visit (the homepage's 'continue' card)", () => {
  const visit = { href: "/notes/mht-cet-maths/differentiation/logarithmic", title: "Logarithmic Differentiation", kind: "notes" as const };

  it("reads back what was written", () => {
    expect(parseLastVisit(serializeLastVisit(visit, NOW), NOW)).toEqual({ ...visit, at: NOW });
  });

  it("refuses anything that is not a path on this site", () => {
    for (const href of ["https://evil.example", "//evil.example/x", "javascript:alert(1)", "notes/x"]) {
      expect(parseLastVisit(serializeLastVisit({ ...visit, href }, NOW), NOW)).toBeNull();
    }
  });

  it("forgets a visit older than 60 days, and junk", () => {
    const old = NOW - 61 * 86_400_000;
    expect(parseLastVisit(serializeLastVisit(visit, old), NOW)).toBeNull();
    expect(parseLastVisit("not json", NOW)).toBeNull();
    expect(parseLastVisit(null, NOW)).toBeNull();
    expect(parseLastVisit(JSON.stringify({ ...visit, at: NOW, title: "" }), NOW)).toBeNull();
  });
});
