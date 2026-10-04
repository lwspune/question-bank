import { describe, it, expect } from "vitest";
import { pickTodayAction, greetingFor } from "@/lib/me/today";

/**
 * /me showed three full-width blue buttons before any progress (choose exam,
 * continue, fix mistakes). The "Today" card leads with ONE action, in this
 * order: a mock left open > mistakes to fix > the topic being read > a mock.
 * Whatever reading was in progress and is not the lead stays as a quiet link.
 */
const cont = { title: "Dot Product and Angle", chapter: "Vectors", href: "/notes/nda-maths/vectors/dot-product-angle" };
const resume = { title: "NDA 2026 (II) Paper I", href: "/mock/x/attempt/1" };

describe("pickTodayAction", () => {
  it("an open mock comes first", () => {
    const a = pickTodayAction({ resume, due: 62, cont, mockHref: "/mock" });
    expect(a).toMatchObject({ kind: "resume", cta: "Resume", href: resume.href, title: resume.title });
    expect(a.secondary).toEqual({ label: "Dot Product and Angle", href: cont.href });
  });

  it("then mistakes to fix, with the count in the title", () => {
    const a = pickTodayAction({ due: 62, cont, mockHref: "/mock" });
    expect(a).toMatchObject({ kind: "drill", title: "Fix 62 mistakes", href: "/drill" });
    expect(a.secondary?.href).toBe(cont.href);
  });

  it("says 'mistake' for one", () => {
    expect(pickTodayAction({ due: 1, mockHref: "/mock" }).title).toBe("Fix 1 mistake");
  });

  it("then the topic being read, with no duplicate link", () => {
    const a = pickTodayAction({ due: 0, cont, mockHref: "/mock" });
    expect(a).toMatchObject({ kind: "continue", title: cont.title, subtitle: "Vectors", href: cont.href });
    expect(a.secondary).toBeUndefined();
  });

  it("otherwise a timed mock for the student's exam", () => {
    expect(pickTodayAction({ due: null, mockHref: "/mock/exam/nda" })).toMatchObject({
      kind: "mock",
      href: "/mock/exam/nda",
    });
  });

  it("an unknown due count (still loading) never claims mistakes", () => {
    expect(pickTodayAction({ due: null, cont, mockHref: "/mock" }).kind).toBe("continue");
  });
});

describe("greetingFor (IST hour)", () => {
  it.each([
    [6, "Good morning"],
    [11, "Good morning"],
    [12, "Good afternoon"],
    [16, "Good afternoon"],
    [17, "Good evening"],
    [23, "Good evening"],
    [2, "Good evening"],
  ])("%i:00 → %s", (h, g) => {
    expect(greetingFor(h)).toBe(g);
  });
});
