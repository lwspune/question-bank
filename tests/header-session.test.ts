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
};
const teacher: HeaderSession = {
  email: "teacher@example.com",
  role: "TEACHER",
  orgName: "LWS Pune",
  isStaff: true,
  isSuperadmin: false,
};
const student: HeaderSession = {
  email: "student@example.com",
  role: null,
  orgName: null,
  isStaff: false,
  isSuperadmin: false,
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
