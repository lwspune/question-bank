import { describe, expect, it } from "vitest";
import { panelBox } from "@/lib/chat/panelBox";

/**
 * V's panel on a phone is `fixed inset-0`, sized to the LAYOUT viewport. When
 * the iOS keyboard opens, only the VISUAL viewport shrinks and Safari pans it,
 * so the panel's bottom (the typing box) slid away and the page behind showed
 * between the panel and the keyboard (owner screenshot, 2026-10-18).
 * panelBox pins the panel to the visual viewport instead.
 */
describe("panelBox", () => {
  it("pins the panel to the visible area above the keyboard on a phone", () => {
    expect(panelBox({ offsetTop: 120.4, height: 401.6 }, true)).toEqual({ top: 120, height: 402, bottom: "auto" });
  });

  it("leaves the stylesheet in charge on a wider screen, where the panel floats", () => {
    expect(panelBox({ offsetTop: 0, height: 900 }, false)).toBeNull();
  });

  it("leaves the stylesheet in charge where the browser has no visualViewport", () => {
    expect(panelBox(null, true)).toBeNull();
  });
});
