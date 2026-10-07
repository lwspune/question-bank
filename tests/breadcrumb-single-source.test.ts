import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * One breadcrumb for the whole site.
 *
 * Until 2026-10-07 the guide/notes/mock shell drew one breadcrumb and seven
 * other pages hand-rolled their own, in six different styles (grey slashes, a
 * house labelled "Board", an arrow, the word "Home"). Restyling the shell's
 * Home button then left those seven behind. The breadcrumb now lives in
 * src/components/nav/Breadcrumbs.tsx; any other file that renders a
 * breadcrumb <nav> is a copy that will drift, so this source scan fails on it.
 */
const SRC = join(process.cwd(), "src");
const OWNER = "src/components/nav/Breadcrumbs.tsx";

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".tsx")) out.push(p);
  }
  return out;
}

describe("breadcrumbs come from one component", () => {
  it("no file but the shared component renders a breadcrumb nav", () => {
    const copies = walk(SRC)
      .map((p) => relative(process.cwd(), p).replace(/\\/g, "/"))
      .filter((p) => p !== OWNER)
      .filter((p) => /aria-label=["{]?["']?Breadcrumb["']/.test(readFileSync(p, "utf8")));
    expect(copies).toEqual([]);
  });

  it("the shared component exists and renders the Home button", () => {
    const src = readFileSync(join(process.cwd(), OWNER), "utf8");
    expect(src).toMatch(/aria-label="Breadcrumb"/);
    expect(src).toMatch(/href="\/"/);
  });
});
