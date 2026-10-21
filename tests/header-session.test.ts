/**
 * Spec for the AppHeader session shape and the brand-link destination.
 *
 * AppHeader renders on EVERY page and used to resolve the viewer three times
 * per request — getSessionMember() + getSessionUser() + getSessionSuperadmin(),
 * each with its own Supabase client and its own auth.getUser(). Combined with
 * the same triple on /browse, a single anon page view was paying for six
 * session resolutions.
 *
 * The header's branching is subtle enough to pin down: a signed-in user with no
 * org row is a self-serve STUDENT (account menu, no org chip, brand link goes to
 * /me), an ADMIN lands on /dashboard, and a TEACHER lands on /browse where they
 * actually work. Getting this wrong sends people to a page they can't use.
 */
import { describe, it, expect } from "vitest";
import { resolveHomeHref, type HeaderSession } from "@/lib/header-session";

const admin: HeaderSession = {
  email: "admin@example.com",
  role: "ADMIN",
  orgName: "LWS Pune",
  isStaff: true,
  isSuperadmin: false,
  hasPass: false,
  stage: null,
  targetExams: [],
};
const teacher: HeaderSession = {
  email: "teacher@example.com",
  role: "TEACHER",
  orgName: "LWS Pune",
  isStaff: true,
  isSuperadmin: false,
  hasPass: false,
  stage: null,
  targetExams: [],
};
const student: HeaderSession = {
  email: "student@example.com",
  role: null,
  orgName: null,
  isStaff: false,
  isSuperadmin: false,
  hasPass: false,
  stage: null,
  targetExams: [],
};

describe("resolveHomeHref", () => {
  it("sends anon visitors to the bank", () => {
    expect(resolveHomeHref(null)).toBe("/browse");
  });

  it("sends an ADMIN to their dashboard", () => {
    expect(resolveHomeHref(admin)).toBe("/dashboard");
  });

  it("sends a TEACHER to the bank, NOT the dashboard", () => {
    // Teachers build papers; the dashboard is org-management they mostly can't use.
    expect(resolveHomeHref(teacher)).toBe("/browse");
  });

  it("sends a self-serve student to their account home", () => {
    expect(resolveHomeHref(student)).toBe("/me");
  });

  it("treats a superadmin who is also an org ADMIN as an ADMIN", () => {
    // The live operator holds both identities; the dashboard is their home.
    expect(resolveHomeHref({ ...admin, isSuperadmin: true })).toBe("/dashboard");
  });

  it("sends a superadmin with NO org row to /me, like any org-less account", () => {
    expect(resolveHomeHref({ ...student, isSuperadmin: true })).toBe("/me");
  });
});

import { profileFieldsFromRow } from "@/lib/header-session";

// EXAM_TIER_SPEC.md §3.5 — stage + target exams ride on the header payload.
// A missing or malformed profile row must yield the empty defaults, never throw:
// the header renders on every page.
describe("profileFieldsFromRow", () => {
  it("defaults to null / [] with no row", () => {
    expect(profileFieldsFromRow(null)).toEqual({ stage: null, targetExams: [] });
    expect(profileFieldsFromRow(undefined)).toEqual({ stage: null, targetExams: [] });
  });

  it("sanitises an unknown stage and unknown exam slugs away", () => {
    expect(
      profileFieldsFromRow({ stage: "phd", target_exams: ["nda", "bogus", "nda", 3] })
    ).toEqual({ stage: null, targetExams: ["nda"] });
  });

  it("carries a valid row through in stored order", () => {
    expect(
      profileFieldsFromRow({ stage: "class-12", target_exams: ["cds", "nda"] })
    ).toEqual({ stage: "class-12", targetExams: ["cds", "nda"] });
  });

  it("leaves resolveHomeHref unchanged for a student carrying profile fields", () => {
    expect(resolveHomeHref({ ...student, stage: "class-11", targetExams: ["nda"] })).toBe(
      "/me"
    );
  });
});

import { hasPassFromEntitlements } from "@/lib/header-session";
import type { Entitlement } from "@/lib/entitlements/access";

// The header's diamond (2026-10-21): shown to an account holding the Premium
// Pass. It must agree with the paywall, so it reads the same rule — an active
// grant covering the mocks scope — rather than any check of its own.
describe("hasPassFromEntitlements", () => {
  const now = Date.parse("2026-10-21T12:00:00Z");
  const grant = (over: Partial<Entitlement>): Entitlement => ({
    id: "e1",
    userId: "u1",
    scope: "mocks",
    source: "razorpay",
    status: "active",
    grantedAt: "2026-10-01T00:00:00Z",
    expiresAt: "2027-04-01T00:00:00Z",
    providerRef: null,
    note: null,
    grantedBy: null,
    ...over,
  });

  it("is false with no grants", () => {
    expect(hasPassFromEntitlements([], now)).toBe(false);
  });
  it("is true for an active Premium Pass", () => {
    expect(hasPassFromEntitlements([grant({})], now)).toBe(true);
  });
  it("counts a comp grant: the gate is source-agnostic", () => {
    expect(hasPassFromEntitlements([grant({ source: "comp" })], now)).toBe(true);
  });
  it("counts the retired Teacher Pass and the full-premium scope, which both cover mocks", () => {
    expect(hasPassFromEntitlements([grant({ scope: "teacher" })], now)).toBe(true);
    expect(hasPassFromEntitlements([grant({ scope: "all" })], now)).toBe(true);
  });
  it("is false once the pass has expired", () => {
    expect(hasPassFromEntitlements([grant({ expiresAt: "2026-10-20T00:00:00Z" })], now)).toBe(false);
  });
  it("is false for a revoked (refunded) pass", () => {
    expect(hasPassFromEntitlements([grant({ status: "revoked" })], now)).toBe(false);
  });
  it("is false for a grant of some other scope", () => {
    expect(hasPassFromEntitlements([grant({ scope: "notes:nda-maths/lines" })], now)).toBe(false);
  });
});
