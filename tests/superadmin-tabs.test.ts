import { describe, it, expect } from "vitest";
import {
  SUPERADMIN_TABS,
  DEFAULT_TAB_ID,
  countNew,
  nextTabIndex,
  type SuperadminTabId,
} from "@/lib/superadmin/tabs";

/**
 * Pure core behind the /superadmin tab strip.
 *
 * WHY THIS IS TESTED AND THE MARKUP IS NOT: /superadmin is an auth-gated `ƒ`
 * route, so `next build` never renders it (see CLAUDE.md's "build does NOT
 * exercise a DYNAMIC page" pitfall) — and the tab strip is additionally gated on
 * a CLICK, which is unverifiable here for the same reason a Radix portal is.
 * What CAN be proven headlessly is the model: the tab set, the default, the
 * unread counts the badges render, and the keyboard map. Layout is a browser
 * check, not a gate.
 */
describe("SUPERADMIN_TABS", () => {
  it("has a stable id set", () => {
    expect(SUPERADMIN_TABS.map((t) => t.id)).toEqual(["orgs", "teachers", "contact"]);
  });

  it("gives every tab a non-empty label", () => {
    for (const t of SUPERADMIN_TABS) expect(t.label.trim().length).toBeGreaterThan(0);
  });

  it("opens on Organisations", () => {
    // Deliberate: the console's identity is cross-org management, so it always
    // opens the same way rather than jumping to whichever queue has unread
    // items. The queues advertise themselves through count badges instead.
    expect(DEFAULT_TAB_ID).toBe("orgs");
    expect(SUPERADMIN_TABS[0].id).toBe(DEFAULT_TAB_ID);
  });

  it("only declares ids the union permits", () => {
    const ids: SuperadminTabId[] = ["orgs", "teachers", "contact"];
    for (const t of SUPERADMIN_TABS) expect(ids).toContain(t.id);
  });
});

describe("countNew", () => {
  it("counts only rows still awaiting triage", () => {
    expect(
      countNew([{ status: "new" }, { status: "read" }, { status: "new" }, { status: "spam" }])
    ).toBe(2);
  });

  it("is 0 for an empty queue", () => {
    expect(countNew([])).toBe(0);
  });

  it("is 0 when everything is triaged", () => {
    // The badge must DISAPPEAR here, not render "0 new" — that is the whole
    // point of a badge, and it is what tells you the queue is clear.
    expect(countNew([{ status: "replied" }, { status: "provisioned" }])).toBe(0);
  });

  it("works across both queues' status vocabularies", () => {
    // contact_messages: new|read|replied|spam. teacher_access_requests:
    // new|contacted|provisioned|declined. Only "new" is common, which is
    // exactly why the helper keys on it rather than on a per-queue list.
    expect(countNew([{ status: "new" }, { status: "contacted" }])).toBe(1);
    expect(countNew([{ status: "new" }, { status: "read" }])).toBe(1);
  });
});

describe("nextTabIndex", () => {
  const total = 3;

  it("moves right and wraps at the end", () => {
    expect(nextTabIndex(0, "ArrowRight", total)).toBe(1);
    expect(nextTabIndex(1, "ArrowRight", total)).toBe(2);
    expect(nextTabIndex(2, "ArrowRight", total)).toBe(0);
  });

  it("moves left and wraps at the start", () => {
    expect(nextTabIndex(2, "ArrowLeft", total)).toBe(1);
    expect(nextTabIndex(1, "ArrowLeft", total)).toBe(0);
    // The modulo trap: a naive (i - 1) % n gives -1 here.
    expect(nextTabIndex(0, "ArrowLeft", total)).toBe(2);
  });

  it("jumps to the ends", () => {
    expect(nextTabIndex(1, "Home", total)).toBe(0);
    expect(nextTabIndex(1, "End", total)).toBe(total - 1);
  });

  it("returns null for keys it does not own", () => {
    // null means "we did not handle this" — the caller must NOT preventDefault,
    // or Tab would stop moving focus out of the strip.
    expect(nextTabIndex(0, "ArrowDown", total)).toBeNull();
    expect(nextTabIndex(0, "Tab", total)).toBeNull();
    expect(nextTabIndex(0, "a", total)).toBeNull();
  });

  it("is safe on a degenerate strip", () => {
    expect(nextTabIndex(0, "ArrowRight", 1)).toBe(0);
    expect(nextTabIndex(0, "ArrowLeft", 1)).toBe(0);
    expect(nextTabIndex(0, "ArrowRight", 0)).toBeNull();
  });
});
