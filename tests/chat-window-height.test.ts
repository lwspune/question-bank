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
const windowClass = widget.match(/role="dialog"[^]*?className="([^"]+)"/)?.[1] ?? "";

describe("V's window from sm up", () => {
  it("is found", () => {
    expect(windowClass).toContain("sm:w-[30rem]");
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
    expect(widget).not.toMatch(/open \? "hidden sm:flex"/);
    expect(widget).toMatch(/\$\{open \? "hidden" : "flex"\}/);
  });

  it("takes focus back after V closes, once it is shown again", () => {
    const close = widget.match(/function close\(\) \{([^]*?)\n {2}\}/)?.[1] ?? "";
    expect(close).not.toContain("launcherRef.current?.focus()");
    expect(widget).toMatch(/if \(!open && wasOpen\.current\) launcherRef\.current\?\.focus\(\)/);
  });
});
