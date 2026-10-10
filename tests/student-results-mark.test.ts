import { describe, it, expect } from "vitest";
import { validateStaffMark } from "@/lib/results/mark";

const USER = "22222222-2222-4222-8222-222222222222";
const ANN = "33333333-3333-4333-8333-333333333333";

describe("validateStaffMark: 'Mark result' on a student's page", () => {
  it("accepts an existing result, a name and the consent tick", () => {
    expect(validateStaffMark({ userId: USER, announcementId: ANN, displayName: " Arnav  Singha ", consent: true })).toEqual({
      ok: true,
      value: { userId: USER, target: { kind: "existing", id: ANN }, displayName: "Arnav Singha" },
    });
  });

  it("accepts a new result: exam, sitting and stage", () => {
    const r = validateStaffMark({
      userId: USER,
      newResult: { examSlug: "cds", sitting: " CDS 2 2026 ", stage: "written" },
      displayName: "Asha Rao",
      consent: true,
    });
    expect(r).toEqual({
      ok: true,
      value: { userId: USER, target: { kind: "new", examSlug: "cds", sitting: "CDS 2 2026", stage: "written" }, displayName: "Asha Rao" },
    });
  });

  it("refuses without the consent tick", () => {
    expect(validateStaffMark({ userId: USER, announcementId: ANN, displayName: "Asha Rao", consent: false }).ok).toBe(false);
  });

  it("refuses a handle as the name", () => {
    expect(validateStaffMark({ userId: USER, announcementId: ANN, displayName: "Panda_74", consent: true }).ok).toBe(false);
  });

  it("refuses a new result with an unknown exam, a bad stage or no sitting", () => {
    const base = { userId: USER, displayName: "Asha Rao", consent: true };
    expect(validateStaffMark({ ...base, newResult: { examSlug: "nope", sitting: "X 2026", stage: "written" } }).ok).toBe(false);
    expect(validateStaffMark({ ...base, newResult: { examSlug: "nda", sitting: "NDA 2 2026", stage: "interview" } }).ok).toBe(false);
    expect(validateStaffMark({ ...base, newResult: { examSlug: "nda", sitting: "  ", stage: "written" } }).ok).toBe(false);
  });

  it("refuses a malformed student or result id, or neither result given", () => {
    expect(validateStaffMark({ userId: "x", announcementId: ANN, displayName: "Asha Rao", consent: true }).ok).toBe(false);
    expect(validateStaffMark({ userId: USER, announcementId: "x", displayName: "Asha Rao", consent: true }).ok).toBe(false);
    expect(validateStaffMark({ userId: USER, displayName: "Asha Rao", consent: true }).ok).toBe(false);
  });
});
