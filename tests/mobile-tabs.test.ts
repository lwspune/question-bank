import { describe, expect, it } from "vitest";
import {
  MAX_MOBILE_TABS,
  MOBILE_TAB_IDS,
  MOCK_TAB_HREF,
  isMobileTabActive,
  resolveMobileTabs,
} from "@/lib/nav/mobileTabs";
import { resolveExamNav, type ExamIdMap } from "@/lib/exam/examNav";
import { EXAM_REGISTRY, getActiveTab } from "@/lib/exam/examContext";

const EXAM_IDS: ExamIdMap = Object.fromEntries(
  EXAM_REGISTRY.map((e, i) => [e.slug, `00000000-0000-4000-8000-${String(i).padStart(12, "0")}`])
);

describe("mobile tab bar — shape", () => {
  it("is exactly five tabs, in reading order", () => {
    const tabs = resolveMobileTabs(resolveExamNav(null, EXAM_IDS));
    expect(tabs.map((t) => t.id)).toEqual(["bank", "guides", "notes", "mock", "board"]);
    expect(tabs).toHaveLength(MAX_MOBILE_TABS);
  });

  it("never exceeds five — iOS and Material both cap a bottom nav there", () => {
    for (const slug of [null, ...EXAM_REGISTRY.map((e) => e.slug)]) {
      const tabs = resolveMobileTabs(resolveExamNav(slug, EXAM_IDS));
      expect(tabs.length).toBeLessThanOrEqual(MAX_MOBILE_TABS);
    }
  });

  it("never carries the staff-only surfaces — Papers and Books live in the account menu", () => {
    for (const slug of [null, ...EXAM_REGISTRY.map((e) => e.slug)]) {
      const ids = resolveMobileTabs(resolveExamNav(slug, EXAM_IDS)).map((t) => t.id);
      expect(ids).not.toContain("papers");
      expect(ids).not.toContain("books");
    }
  });

  it("takes no session argument, so the bar cannot grow by role", () => {
    // The 10-tap-target row this replaces was caused by a nav whose SHAPE moved
    // with permissions. A single parameter is what makes that impossible here:
    // if someone adds a session/role argument, this fails and they have to
    // re-read the reasoning above rather than discover it in production.
    expect(resolveMobileTabs).toHaveLength(1);
  });

  it("labels every tab", () => {
    const tabs = resolveMobileTabs(resolveExamNav("nda", EXAM_IDS));
    for (const tab of tabs) {
      expect(tab.label.trim()).not.toBe("");
    }
    expect(tabs.map((t) => t.label)).toEqual(["Bank", "Guides", "Notes", "Mocks", "Board"]);
  });

  it("exports its id list in the same order it renders", () => {
    const tabs = resolveMobileTabs(resolveExamNav(null, EXAM_IDS));
    expect([...MOBILE_TAB_IDS]).toEqual(tabs.map((t) => t.id));
  });
});

describe("mobile tab bar — hrefs mirror the desktop nav", () => {
  // The two navs never render at once, but they must agree about where a tab
  // goes. Deriving both from resolveExamNav is what keeps them from drifting.
  it("matches resolveExamNav for every registered exam and for no choice", () => {
    for (const slug of [null, ...EXAM_REGISTRY.map((e) => e.slug)]) {
      const nav = resolveExamNav(slug, EXAM_IDS);
      const byId = Object.fromEntries(
        resolveMobileTabs(nav).map((t) => [t.id, t.href])
      );
      expect(byId.bank).toBe(nav.bankHref);
      expect(byId.guides).toBe(nav.guidesHref);
      expect(byId.notes).toBe(nav.notesHref);
      expect(byId.board).toBe(nav.boardHref);
      expect(byId.mock).toBe(MOCK_TAB_HREF);
    }
  });

  it("routes Mocks to the cross-exam catalogue", () => {
    expect(MOCK_TAB_HREF).toBe("/mock");
  });

  it("personalises Bank for a chosen exam but never Notes", () => {
    const nav = resolveExamNav("nda", EXAM_IDS);
    const byId = Object.fromEntries(
      resolveMobileTabs(nav).map((t) => [t.id, t.href])
    );
    expect(byId.bank).toContain("examId=");
    expect(byId.notes).toBe("/notes");
  });
});

describe("mobile tab bar — active state", () => {
  it("lights exactly one tab for a primary route", () => {
    const cases: Array<[string, string]> = [
      ["/browse", "bank"],
      ["/guide/nda-maths", "guides"],
      ["/notes/nda-physics/sound", "notes"],
      ["/mock/nda-2024-apr-maths", "mock"],
      ["/board/mh-sb-9", "board"],
    ];
    for (const [path, expected] of cases) {
      const active = getActiveTab(path);
      const lit = MOBILE_TAB_IDS.filter((id) => isMobileTabActive(id, active));
      expect(lit).toEqual([expected]);
    }
  });

  it("lights nothing on a route the bar does not own", () => {
    // /dashboard, /account and the question landing pages own no tab today.
    for (const path of ["/dashboard", "/account", "/questions/nda/maths/vectors"]) {
      const active = getActiveTab(path);
      expect(MOBILE_TAB_IDS.some((id) => isMobileTabActive(id, active))).toBe(false);
    }
  });

  it("lights nothing for the staff surfaces, which have no tab in this bar", () => {
    for (const path of ["/dashboard/papers", "/books"]) {
      const active = getActiveTab(path);
      expect(MOBILE_TAB_IDS.some((id) => isMobileTabActive(id, active))).toBe(false);
    }
  });

  it("does not match a route that merely shares a prefix", () => {
    expect(isMobileTabActive("bank", getActiveTab("/browser-other"))).toBe(false);
  });
});
