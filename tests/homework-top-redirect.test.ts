import { describe, expect, it } from "vitest";
import nextConfig from "../next.config.mjs";

// Since 2026-11-24 a plan opens on its Top 10 PYQs, so the list's old
// address /homework/<plan>/top (shared, and indexed) lands on the plan itself.
// Each chapter's Top 10 keeps its address, /homework/<plan>/top/<chapter>.
describe("a plan's old Top 10 address", () => {
  it("redirects /homework/<plan>/top to the plan, permanently, and nothing deeper", async () => {
    const redirects = await (nextConfig as { redirects: () => Promise<{ source: string; destination: string; permanent: boolean }[]> }).redirects();
    const r = redirects.filter((x) => x.source.startsWith("/homework/"));
    expect(r).toEqual([{ source: "/homework/:planSlug/top", destination: "/homework/:planSlug", permanent: true }]);
  });
});
