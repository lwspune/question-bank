import { describe, it, expect } from "vitest";
import type { ExamSlug } from "@/lib/exam/examContext";
import {
  checkQuestion,
  pendingChecks,
  suggestDisplayName,
  validateResultAnswer,
  type OpenAnnouncement,
} from "@/lib/results/check";

const ann = (id: string, examSlug: ExamSlug, over: Partial<OpenAnnouncement> = {}): OpenAnnouncement => ({
  id,
  examSlug,
  examName: examSlug.toUpperCase(),
  sitting: "NDA 2 2026",
  stage: "written",
  announcedOn: "2026-10-10",
  askUntil: "2026-10-31",
  ...over,
});

describe("pendingChecks: which results a student is asked about", () => {
  const today = "2026-10-12";

  it("asks about an open result of an exam the student chose", () => {
    expect(pendingChecks([ann("a", "nda")], ["nda"], new Set(), today).map((a) => a.id)).toEqual(["a"]);
  });

  it("does not ask about an exam the student did not choose", () => {
    expect(pendingChecks([ann("a", "nda")], ["cds"], new Set(), today)).toEqual([]);
  });

  it("does not ask twice, whatever the answer was (dismissing counts)", () => {
    expect(pendingChecks([ann("a", "nda")], ["nda"], new Set(["a"]), today)).toEqual([]);
  });

  it("asks only inside the window, both ends included", () => {
    const a = ann("a", "nda");
    expect(pendingChecks([a], ["nda"], new Set(), "2026-10-09")).toEqual([]);
    expect(pendingChecks([a], ["nda"], new Set(), "2026-10-10")).toHaveLength(1);
    expect(pendingChecks([a], ["nda"], new Set(), "2026-10-31")).toHaveLength(1);
    expect(pendingChecks([a], ["nda"], new Set(), "2026-11-01")).toEqual([]);
  });

  it("puts the newest announcement first", () => {
    const older = ann("old", "nda", { announcedOn: "2026-10-01" });
    const newer = ann("new", "cds", { announcedOn: "2026-10-11" });
    expect(pendingChecks([older, newer], ["nda", "cds"], new Set(), today).map((a) => a.id)).toEqual(["new", "old"]);
  });
});

describe("validateResultAnswer: what the route accepts", () => {
  const base = { announcementId: "11111111-1111-4111-8111-111111111111" };

  it("accepts each plain answer", () => {
    for (const outcome of ["cleared", "not_cleared", "did_not_appear", "dismissed"]) {
      const r = validateResultAnswer({ ...base, outcome });
      expect(r.ok).toBe(true);
    }
  });

  it("accepts a cleared student who agrees to be shown, tidying the name", () => {
    const r = validateResultAnswer({ ...base, outcome: "cleared", showPublicly: true, displayName: "  Ratnesh   Garg " });
    expect(r).toEqual({
      ok: true,
      value: { announcementId: base.announcementId, outcome: "cleared", showPublicly: true, displayName: "Ratnesh Garg" },
    });
  });

  it("refuses a shown name the database would refuse", () => {
    for (const displayName of ["Panda_74", "a@b", "R", "Batch 2"]) {
      const r = validateResultAnswer({ ...base, outcome: "cleared", showPublicly: true, displayName });
      expect(r.ok).toBe(false);
    }
  });

  it("never shows a student who did not clear", () => {
    const r = validateResultAnswer({ ...base, outcome: "not_cleared", showPublicly: true, displayName: "Asha Rao" });
    expect(r.ok).toBe(false);
  });

  it("drops a name the student did not agree to show", () => {
    const r = validateResultAnswer({ ...base, outcome: "cleared", showPublicly: false, displayName: "Asha Rao" });
    expect(r).toEqual({
      ok: true,
      value: { announcementId: base.announcementId, outcome: "cleared", showPublicly: false, displayName: null },
    });
  });

  it("refuses an unknown answer or a malformed id", () => {
    expect(validateResultAnswer({ ...base, outcome: "maybe" }).ok).toBe(false);
    expect(validateResultAnswer({ announcementId: "x", outcome: "cleared" }).ok).toBe(false);
    expect(validateResultAnswer(null).ok).toBe(false);
  });
});

describe("suggestDisplayName: the name filled in for the student", () => {
  it("uses a real-looking account name, tidied", () => {
    expect(suggestDisplayName({ full_name: "  Aayush  Shankar " })).toBe("Aayush Shankar");
  });

  it("leaves it blank for a handle, so the student types their name", () => {
    expect(suggestDisplayName({ full_name: "Panda_74" })).toBe("");
    expect(suggestDisplayName({ name: "ssgoalpara9" })).toBe("");
    expect(suggestDisplayName(null)).toBe("");
  });
});

describe("checkQuestion: the card's question, per stage", () => {
  it("asks each stage in its own words", () => {
    expect(checkQuestion(ann("a", "nda"))).toBe("Did you clear the NDA 2 2026 written exam?");
    expect(checkQuestion(ann("a", "nda", { stage: "ssb" }))).toBe("Were you recommended at the NDA 2 2026 SSB?");
    expect(checkQuestion(ann("a", "nda", { stage: "final" }))).toBe("Did you make the NDA 2 2026 final merit list?");
  });
});
