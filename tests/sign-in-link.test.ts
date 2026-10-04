import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { signInHref } from "@/components/reveal/signInHref";

describe("signInHref", () => {
  it("returns the visitor to the exact page, query included", () => {
    expect(signInHref("/browse", "exam=nda&subject=Maths")).toBe(
      "/login?next=%2Fbrowse%3Fexam%3Dnda%26subject%3DMaths",
    );
  });

  it("drops an empty query", () => {
    expect(signInHref("/questions/nda/maths/sets", "")).toBe(
      "/login?next=%2Fquestions%2Fnda%2Fmaths%2Fsets",
    );
  });

  it("falls back to /browse when the path is unknown", () => {
    expect(signInHref(null, "")).toBe("/login?next=%2Fbrowse");
  });
});

/**
 * `useSearchParams()` bails its nearest Suspense boundary out of static
 * rendering. A question card sits inside the list, so one call in a card
 * once sent every /questions and /board list to the browser as an empty
 * shell (BAILOUT_TO_CLIENT_SIDE_RENDERING in the HTML). The only callers
 * allowed are those that keep the call behind their OWN small boundary.
 */
const ALLOWED = new Set([
  "src/components/reveal/SignInLink.tsx",
  "src/components/NavigationProgress.tsx",
  // A page of its own, behind its own boundary, never inside a list.
  "src/app/login/page.tsx",
]);

const IMPORTS = /import\s*\{[^}]*\buseSearchParams\b[^}]*\}\s*from\s*"next\/navigation"/;

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(name)) out.push(p);
  }
  return out;
}

describe("useSearchParams stays behind its own Suspense boundary", () => {
  const root = process.cwd();
  const files = walk(join(root, "src")).map((f) => relative(root, f).replace(/\\/g, "/"));

  it("is called only by the allowed files", () => {
    const callers = files.filter((f) =>
      IMPORTS.test(readFileSync(join(root, f), "utf8")),
    );
    expect(callers.filter((f) => !ALLOWED.has(f))).toEqual([]);
  });

  it("SignInLink wraps the call in Suspense with a path-only fallback", () => {
    const src = readFileSync(join(root, "src/components/reveal/SignInLink.tsx"), "utf8");
    expect(src).toMatch(/<Suspense fallback=/);
  });
});
