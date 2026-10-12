import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { headerSignInHref, signInHref } from "@/components/reveal/signInHref";

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

/**
 * The header's Sign in (and the report dialogs') went to bare /login, so a
 * student who signed in from a chapter landed on /me and had to find the
 * chapter again (Clarity, 2026-10-12). From the home page and the sign-in
 * pages themselves, /me is still the right landing.
 */
describe("headerSignInHref", () => {
  it("returns the visitor to the page they were reading", () => {
    expect(headerSignInHref("/questions/cbse-12/chemistry/biomolecules", "")).toBe(
      "/login?next=%2Fquestions%2Fcbse-12%2Fchemistry%2Fbiomolecules",
    );
  });

  it("keeps the /browse filters", () => {
    expect(headerSignInHref("/browse", "examId=abc&kind=pyq")).toBe(
      "/login?next=%2Fbrowse%3FexamId%3Dabc%26kind%3Dpyq",
    );
  });

  it("sends the home page to plain /login, so sign-in lands on /me", () => {
    expect(headerSignInHref("/", "")).toBe("/login");
    expect(headerSignInHref("/", "utm_source=chatgpt.com")).toBe("/login");
  });

  it("never points back at a sign-in page", () => {
    for (const p of ["/login", "/signup", "/welcome", "/login/", "/welcome"]) {
      expect(headerSignInHref(p, "next=%2Fme")).toBe("/login");
    }
  });

  it("falls back to plain /login when the path is unknown", () => {
    expect(headerSignInHref(null, "")).toBe("/login");
  });
});

describe("no sign-in link drops the visitor's place", () => {
  const root = process.cwd();
  const FILES = [
    "src/components/header/HeaderBar.tsx",
    "src/app/browse/ReportQuestionDialog.tsx",
    "src/app/notes/_components/ReportConceptDialog.tsx",
    "src/app/notes/_components/NotesPaywall.tsx",
  ];

  it.each(FILES)("%s links to sign-in through SignInLink, not bare /login", (f) => {
    const src = readFileSync(join(root, f), "utf8");
    expect(src).not.toMatch(/href=["{`]+\/login["}`]/);
    expect(src).toMatch(/<SignInLink\b/);
  });
});
