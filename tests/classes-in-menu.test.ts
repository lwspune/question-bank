/**
 * Offline classes moved from the header to the avatar menu (owner,
 * 2026-11-23): "move classes to avatar then. We need signed up account".
 *
 * - The header has no Classes button (its slot goes to the Visuals gallery).
 * - The avatar menu, which only signed-in visitors have, links /classes for
 *   STUDENTS (not teachers or staff, like the /me class card), and the tap is
 *   still counted as classes_link_click.
 * - /classes asks a signed-out visitor to sign in instead of showing the form;
 *   the route refuses them too (tests/class-interest-route.test.ts).
 *
 * The menu is behind a tap and the form behind a browser check, so neither
 * renders headless here: this pins them in source.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const src = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

describe("Classes is in the avatar menu, not the header", () => {
  it("the header has no Classes button", () => {
    const header = src("src/components/header/HeaderBar.tsx");
    expect(header).not.toMatch(/ClassesLink/);
    expect(header).not.toMatch(/["`]\/classes/);
  });

  it("the avatar menu links /classes for students only, and counts the tap", () => {
    const menu = src("src/components/UserMenu.tsx");
    const block = menu.match(/\{role === null && !isStaff && \(\s*<Link[\s\S]*?href="\/classes\?from=menu"[\s\S]*?<\/Link>\s*\)\}/);
    expect(block, "a students-only Link to /classes?from=menu").not.toBeNull();
    expect(block![0]).toMatch(/trackFunnel\("classes_link_click", \{ from: "menu" \}\)/);
    expect(block![0]).toMatch(/Offline classes/);
  });
});

describe("/classes needs an account", () => {
  const form = src("src/app/classes/ClassInterestForm.tsx");

  it("offers sign-in and sign-up that come back to /classes", () => {
    expect(form).toMatch(/\/login\?next=\/classes/);
    expect(form).toMatch(/\/signup\?next=\/classes/);
  });

  it("shows the form only once the visitor is known to be signed in", () => {
    expect(form).toMatch(/viewer === "signedOut"/);
    expect(form).toMatch(/viewer === "checking"/);
  });
});
