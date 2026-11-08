/**
 * What a homework plan page reads (2026-11-08). Its side menu and pass offer
 * need each plan's slug, exam and subject, nothing more, but it called
 * listPublishedPlans, which then read every item of all 31 plans (39,685 rows,
 * each with its chapter) on every render: 21% of all database reads in the
 * 36 hours measured. It reads getPlanLinks (one small row per plan) instead,
 * and its own plan once per render, not once for the metadata and again for
 * the page. Source scan: the repo has no way to render a page in a test.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const page = readFileSync(join(process.cwd(), "src/app/homework/[planSlug]/page.tsx"), "utf8");

describe("the homework plan page", () => {
  it("never lists the plans with their counts", () => {
    expect(page).not.toMatch(/listPublishedPlans/);
  });

  it("reads its own plan through one per-render cache", () => {
    expect(page).toMatch(/import \{ cache \} from "react"/);
    expect(page.match(/getPlanBySlug\(/g)).toHaveLength(1);
  });
});
