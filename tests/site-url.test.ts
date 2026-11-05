/**
 * The site's address is written once: SITE_URL in src/lib/brand.ts (TECH_DEBT_SPEC.md 3.5).
 *
 * WHY: on 2026-11-05 the literal "https://www.pyqvault.com" was defined as a constant in 15 files
 * (CLAUDE.md said 4) and written into 2 more. A domain change, or a page that should point at the
 * intl site instead, had to be found by grep. Code comments may still mention it.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { SITE_URL } from "@/lib/brand";
import { WWW_ORIGIN } from "@/lib/sites/intl";

function files(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? files(p) : /\.(ts|tsx)$/.test(e.name) ? [p] : [];
  });
}

/** Lines outside comments that write the address out. */
function literalUses(src: string): string[] {
  return src
    .split("\n")
    .filter((l) => l.includes("https://www.pyqvault.com"))
    .filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l));
}

describe("SITE_URL", () => {
  it("is the www origin, with no trailing slash", () => {
    expect(SITE_URL).toBe("https://www.pyqvault.com");
    expect(WWW_ORIGIN).toBe(SITE_URL);
  });

  it("is the only place src/ writes the address", () => {
    const brand = path.join(process.cwd(), "src", "lib", "brand.ts");
    const offenders = files(path.join(process.cwd(), "src"))
      .filter((f) => f !== brand)
      .flatMap((f) => literalUses(fs.readFileSync(f, "utf8")).map((l) => `${path.relative(process.cwd(), f)}: ${l.trim()}`));
    expect(offenders).toEqual([]);
  });
});
