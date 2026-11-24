/**
 * V's window on laptops and tablets (owner, 2026-11-21). From `sm` up it was a
 * floating box capped at 40rem, or the screen minus 7rem, with the round
 * launcher under it; on a 1536 x 730 laptop the "Your day" card's buttons
 * fell below the fold. It now runs the full height of the screen (1rem from
 * the top and the bottom, no cap: owner chose full height everywhere, smart
 * boards included), and the launcher hides while V is open, since the X in
 * V's header closes it. Phones keep their full-screen window.
 *
 * Source scans (no jsdom here).
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const widget = readFileSync(join(process.cwd(), "src/components/chat/ChatWidget.tsx"), "utf8");
// The window's class is shared with the frame drawn while it loads (PAGE_WEIGHT_SPEC.md item 2).
const styles = readFileSync(join(process.cwd(), "src/components/chat/chatStyles.ts"), "utf8");
const windowClass = styles.match(/export const V_WINDOW =\s*"([^"]+)"/)?.[1] ?? "";
// The round button is drawn by VLauncher, for the window and the launcher alike.
const launcher = readFileSync(join(process.cwd(), "src/components/chat/VLauncher.tsx"), "utf8");

describe("V's window from sm up", () => {
  it("is found", () => {
    expect(windowClass).toContain("sm:w-[30rem]");
    expect(widget).toMatch(/role="dialog"[^]*?className=\{V_WINDOW\}/);
  });

  it("runs from 1rem below the top to 1rem above the bottom", () => {
    expect(windowClass).toMatch(/\bsm:fixed\b/);
    expect(windowClass).toMatch(/\bsm:top-4\b/);
    expect(windowClass).toMatch(/\bsm:right-4\b/);
    expect(windowClass).toMatch(/\bsm:bottom-\[max\(1rem,env\(safe-area-inset-bottom\)\)\]/);
  });

  it("has no height cap", () => {
    expect(windowClass).not.toMatch(/sm:h-\[40rem\]/);
    expect(windowClass).not.toMatch(/sm:max-h-/);
    expect(windowClass).not.toMatch(/\bsm:static\b/);
  });

  it("keeps the phone's full-screen window", () => {
    expect(windowClass).toMatch(/^fixed inset-0 /);
    expect(windowClass).toContain("h-[100dvh]");
  });
});

describe("the launcher while V is open", () => {
  it("hides at every width (the X in V's header closes V)", () => {
    expect(launcher).not.toMatch(/open \? "hidden sm:flex"/);
    expect(launcher).toMatch(/\$\{open \? "hidden" : "flex"\}/);
  });

  it("takes focus back after V closes, once it is shown again", () => {
    const close = widget.match(/function close\(\) \{([^]*?)\n {2}\}/)?.[1] ?? "";
    expect(close).not.toContain("launcherRef.current?.focus()");
    expect(widget).toMatch(/if \(!open && wasOpen\.current\) launcherRef\.current\?\.focus\(\)/);
  });
});
