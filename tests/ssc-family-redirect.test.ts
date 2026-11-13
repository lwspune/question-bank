import { describe, expect, it } from "vitest";
import nextConfig from "../next.config.mjs";
import { getMockFamily } from "@/lib/mocks/mocksNav";

// The SSC CGL mock family page lived at /mock/exam/ssc-cgl-tiers from 2026-10-18. When CHSL
// joined (2026-11-13) the family became "SSC" and its page /mock/exam/ssc, so the old URL
// (shared, and in the sitemap) must land on the new one rather than 404.
describe("SSC mock family URL", () => {
  it("redirects the old /mock/exam/ssc-cgl-tiers page to the SSC family page, permanently", async () => {
    const redirects = await (nextConfig as { redirects: () => Promise<{ source: string; destination: string; permanent: boolean }[]> }).redirects();
    const r = redirects.find((x) => x.source === "/mock/exam/ssc-cgl-tiers");
    expect(r).toEqual({ source: "/mock/exam/ssc-cgl-tiers", destination: "/mock/exam/ssc", permanent: true });
    expect(getMockFamily("ssc")).not.toBeNull();
  });
});
