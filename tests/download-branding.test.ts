/**
 * Which pieces of PYQ Vault branding a download carries (owner, 2026-10-07).
 *
 * Whether a download is branded at all is decided by resolveExportAccess (pass
 * and free downloads yes, institute staff never). The owner's three switches
 * at /dashboard/pricing then turn each piece on or off: the watermark, the site
 * address in the footer, and the "PYQ Vault" name line above the title. A
 * piece prints only when the download is branded AND its switch is on, so no
 * switch can ever brand a staff paper.
 */
import { describe, it, expect } from "vitest";
import { brandingParts, ALL_BRANDING, parseBrandingSwitches } from "@/lib/export/branding";

describe("brandingParts", () => {
  it("prints every piece on a branded download when no switch is given (today's behaviour)", () => {
    expect(brandingParts(true)).toEqual(ALL_BRANDING);
    expect(ALL_BRANDING).toEqual({ watermark: true, siteUrl: true, nameLine: true });
  });

  it("prints nothing on an unbranded download, whatever the switches say", () => {
    expect(brandingParts(false, { watermark: true, siteUrl: true, nameLine: true })).toEqual({
      watermark: false,
      siteUrl: false,
      nameLine: false,
    });
    expect(brandingParts(undefined)).toEqual({ watermark: false, siteUrl: false, nameLine: false });
  });

  it("turns each piece off on its own", () => {
    expect(brandingParts(true, { watermark: false })).toEqual({ watermark: false, siteUrl: true, nameLine: true });
    expect(brandingParts(true, { siteUrl: false })).toEqual({ watermark: true, siteUrl: false, nameLine: true });
    expect(brandingParts(true, { nameLine: false })).toEqual({ watermark: true, siteUrl: true, nameLine: false });
  });

  it("can turn all three off", () => {
    expect(brandingParts(true, { watermark: false, siteUrl: false, nameLine: false })).toEqual({
      watermark: false,
      siteUrl: false,
      nameLine: false,
    });
  });
});

describe("parseBrandingSwitches (the /dashboard/pricing save)", () => {
  it("accepts three true/false switches", () => {
    expect(parseBrandingSwitches({ watermark: false, siteUrl: true, nameLine: false })).toEqual({
      ok: true,
      parts: { watermark: false, siteUrl: true, nameLine: false },
    });
  });

  it("refuses a missing or non-boolean switch rather than guessing", () => {
    expect(parseBrandingSwitches({ watermark: true, siteUrl: true }).ok).toBe(false);
    expect(parseBrandingSwitches({ watermark: "no", siteUrl: true, nameLine: true }).ok).toBe(false);
    expect(parseBrandingSwitches(null).ok).toBe(false);
  });
});
