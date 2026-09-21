/**
 * The /mock catalogue's card list must stay SERVER-rendered, and the attempt
 * badge on it must stay client-only.
 *
 * WHY THIS IS A CORRECTNESS RULE. /mock/exam/<exam>/<type> is one of 18
 * prerendered, `revalidate = 3600`, indexable, sitemapped pages — the markup a
 * crawler reads is the .html on disk. Two changes would silently destroy that,
 * and neither one fails a build:
 *
 *  1. A SERVER-SIDE session read in the card list (getSessionUser, a cookie
 *     read, or createSupabaseServerClient — which reads cookies internally) to
 *     personalise a card would mark the route dynamic and delete its
 *     prerendered HTML. CLAUDE.md records this as "shell component de-caches
 *     site": the route table still prints the SSG marker while every prerender
 *     bails, so the build output looks correct throughout and the only honest
 *     probe is counting .html files.
 *
 *  2. Personalisation reaching the SERVER render at all would bake one
 *     student's attempt history into a file served to everyone.
 *
 * So the split is load-bearing: MockCatalogueList renders the crawlable markup
 * and knows nothing about the viewer, and OwnAttempts.tsx is the only client
 * code, fetching own-row data after hydration. This test pins the split rather
 * than trusting a comment, because the failure is invisible in CI.
 *
 * It is a source-text check because there is no other way to reach the property
 * from here: the repo has no jsdom/Playwright, and `next build` cannot render
 * either component (one is a client island, the pages are auth-agnostic).
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");

const LIST = ["src", "app", "mock", "_components", "MockCatalogueList.tsx"];
const ISLAND = ["src", "app", "mock", "_components", "OwnAttempts.tsx"];
const FETCHER = ["src", "app", "mock", "_components", "ownAttemptsClient.ts"];

/** Anything that turns a route dynamic by reading the request. */
const REQUEST_READS = [
  "cookies(",
  "headers(",
  "getSessionUser",
  "getSessionMember",
  "createSupabaseServerClient",
  "auth.getUser(",
];

describe("the mock card list stays crawlable", () => {
  it("is a server component", () => {
    // Not a style point: "use client" here would move every title, link and
    // stat out of the server render's own tree and into the client bundle,
    // and would let a future edit reach for a hook that de-caches the page.
    expect(read(...LIST)).not.toContain('"use client"');
  });

  it("never reads the request, so the pages stay prerendered", () => {
    const src = read(...LIST);
    for (const call of REQUEST_READS) {
      expect(src, `${call} would make every mock list page dynamic`).not.toContain(call);
    }
  });

  it("still renders the cards this rule protects", () => {
    // Guards against the assertions above going vacuously true if the file
    // stops rendering the list at all.
    const src = read(...LIST);
    expect(src).toContain("<Link");
    expect(src).toContain("m.title");
    expect(src).toContain("MockAttemptBadge");
  });
});

describe("the attempt badge stays client-only", () => {
  it("declares itself a client component", () => {
    expect(read(...ISLAND)).toContain('"use client"');
    expect(read(...FETCHER)).toContain('"use client"');
  });

  it("renders nothing before its data arrives, so no per-user text is prerendered", () => {
    // The badge derives entirely from state that starts empty, and
    // attemptBadge(undefined) is null (see mock-attempted.test.ts). Both halves
    // are needed: an initial value read from anywhere else could be rendered
    // into the prerendered HTML and served to every visitor.
    const src = read(...ISLAND);
    expect(src).toContain("useState");
    expect(src).toContain("if (!badge) return null;");
  });

  it("reads attempts through the BROWSER client, never the server one", () => {
    const src = read(...FETCHER);
    expect(src).toContain("createSupabaseBrowserClient");
    expect(src).not.toContain("createSupabaseServerClient");
    expect(src).not.toContain("createSupabaseAdminClient");
  });

  it("caps the read, because PostgREST truncates at 1000 rows in silence", () => {
    // The cap that has produced wrong answers in this codebase five times. An
    // explicit limit also documents that the row count was measured.
    expect(read(...FETCHER)).toMatch(/\.limit\(\d+\)/);
  });
});
