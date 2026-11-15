/**
 * "Are you a teacher or a student?" (migration 0258): the pure rules behind the
 * one-line question in the download boxes. Asked once per account, never to
 * staff, never signed out; the answer is one of two values and nothing else.
 */
import { describe, it, expect } from "vitest";
import {
  USER_ROLES,
  isUserRole,
  parseRoleAnswer,
  shouldAskRole,
  roleQuestionShownEvent,
} from "@/lib/profile/userRole";

describe("isUserRole", () => {
  it("accepts teacher and student only", () => {
    expect(USER_ROLES).toEqual(["teacher", "student"]);
    expect(isUserRole("teacher")).toBe(true);
    expect(isUserRole("student")).toBe(true);
    for (const v of ["Teacher", "parent", "", null, undefined, 1, {}]) expect(isUserRole(v)).toBe(false);
  });
});

describe("parseRoleAnswer", () => {
  it("returns the role and the box that asked", () => {
    expect(parseRoleAnswer({ role: "teacher", box: "browse" })).toEqual({ ok: true, role: "teacher", box: "browse" });
    expect(parseRoleAnswer({ role: "student", box: "homework" })).toEqual({ ok: true, role: "student", box: "homework" });
  });

  it("refuses an unknown role or box", () => {
    expect(parseRoleAnswer({ role: "parent", box: "browse" }).ok).toBe(false);
    expect(parseRoleAnswer({ role: "teacher", box: "elsewhere" }).ok).toBe(false);
    expect(parseRoleAnswer({ role: "teacher" }).ok).toBe(false);
    expect(parseRoleAnswer(null).ok).toBe(false);
    expect(parseRoleAnswer("teacher").ok).toBe(false);
  });
});

describe("shouldAskRole", () => {
  it("asks a signed-in student who has not answered", () => {
    expect(shouldAskRole({ signedIn: true, isStaff: false, role: null })).toBe(true);
  });

  it("never asks someone signed out, staff, or anyone who has answered", () => {
    expect(shouldAskRole({ signedIn: false, isStaff: false, role: null })).toBe(false);
    expect(shouldAskRole({ signedIn: true, isStaff: true, role: null })).toBe(false);
    expect(shouldAskRole({ signedIn: true, isStaff: false, role: "teacher" })).toBe(false);
    expect(shouldAskRole({ signedIn: true, isStaff: false, role: "student" })).toBe(false);
  });
});

describe("roleQuestionShownEvent", () => {
  const now = new Date("2026-11-15T06:00:00Z");

  it("records the question seen, naming its box", () => {
    expect(roleQuestionShownEvent("u1", "mock", now)).toEqual({
      kind: "surface_viewed",
      metadata: { surface: "role_question", box: "mock" },
      dedupeKey: "view:role_question:mock:u1:2026-11-15",
    });
  });

  it("counts once per box per student per IST day", () => {
    const a = roleQuestionShownEvent("u1", "browse", now).dedupeKey;
    expect(roleQuestionShownEvent("u1", "browse", new Date("2026-11-15T17:00:00Z")).dedupeKey).toBe(a);
    // 18:30 UTC is midnight IST: the next day counts again.
    expect(roleQuestionShownEvent("u1", "browse", new Date("2026-11-15T18:31:00Z")).dedupeKey).not.toBe(a);
    expect(roleQuestionShownEvent("u1", "homework", now).dedupeKey).not.toBe(a);
    expect(roleQuestionShownEvent("u2", "browse", now).dedupeKey).not.toBe(a);
  });
});
