/**
 * Which pieces of PYQ Vault branding a download carries.
 *
 * Whether a download is branded at all is resolveExportAccess's call (pass and
 * free downloads yes, institute staff never). The owner's three switches at
 * /dashboard/pricing (paywall_settings, migration 0138, 2026-10-07) then turn
 * each piece on or off. A piece prints only when the download is branded AND
 * its switch is on, so no switch can ever brand a staff paper. A switch left
 * out counts as on: every caller that predates the switches keeps today's
 * full branding.
 */
export type BrandingParts = {
  /** The light diagonal "PYQ Vault" picture behind every page. */
  watermark: boolean;
  /** "www.pyqvault.com" in every page's footer. */
  siteUrl: boolean;
  /** The "PYQ Vault" line above the title (PDF only; Word has none). */
  nameLine: boolean;
};

export const ALL_BRANDING: BrandingParts = { watermark: true, siteUrl: true, nameLine: true };

export function brandingParts(branded: boolean | undefined, parts?: Partial<BrandingParts>): BrandingParts {
  if (!branded) return { watermark: false, siteUrl: false, nameLine: false };
  return {
    watermark: parts?.watermark ?? true,
    siteUrl: parts?.siteUrl ?? true,
    nameLine: parts?.nameLine ?? true,
  };
}

/** The /dashboard/pricing save: all three switches, each true or false. */
export function parseBrandingSwitches(
  input: unknown
): { ok: true; parts: BrandingParts } | { ok: false; message: string } {
  const o = (input ?? {}) as Record<string, unknown>;
  const keys = ["watermark", "siteUrl", "nameLine"] as const;
  if (input === null || typeof input !== "object" || keys.some((k) => typeof o[k] !== "boolean")) {
    return { ok: false, message: "Send watermark, siteUrl and nameLine, each true or false." };
  }
  return { ok: true, parts: { watermark: o.watermark as boolean, siteUrl: o.siteUrl as boolean, nameLine: o.nameLine as boolean } };
}
