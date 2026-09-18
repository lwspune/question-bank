import { describe, it, expect } from "vitest";
import {
  buildMockShareUrl,
  buildMockShareText,
  buildWhatsappHref,
  SHARE_CAMPAIGN,
  SHARE_CHANNELS,
  type ShareChannel,
} from "@/lib/mocks/share";

const BASE = {
  slug: "nda-2026-i-maths",
  title: "NDA 2026 Paper I — Mathematics",
  score: 186,
  maxScore: 300,
};

describe("buildMockShareUrl", () => {
  it("points at the mock's PUBLIC page on the canonical host", () => {
    const u = new URL(buildMockShareUrl(BASE.slug, "whatsapp"));
    // Not the result page: that route is per-attempt, auth-gated and noindex,
    // so a shared link must land on something the recipient can actually open.
    expect(u.origin).toBe("https://www.pyqvault.com");
    expect(u.pathname).toBe("/mock/nda-2026-i-maths");
  });

  it("carries the utm triple that migration 0106 already parses", () => {
    const u = new URL(buildMockShareUrl(BASE.slug, "whatsapp"));
    expect(u.searchParams.get("utm_source")).toBe("whatsapp");
    expect(u.searchParams.get("utm_medium")).toBe("share");
    expect(u.searchParams.get("utm_campaign")).toBe(SHARE_CAMPAIGN);
  });

  it("names the channel honestly — the native sheet does not claim WhatsApp", () => {
    // navigator.share() hands off to an OS chooser and never tells us which app
    // was picked. Labelling that 'whatsapp' would manufacture attribution we do
    // not have, so it stays the generic 'share' (cf. the 0107 rule: an unknown
    // surface is rejected, never defaulted).
    expect(new URL(buildMockShareUrl(BASE.slug, "share")).searchParams.get("utm_source")).toBe("share");
    expect(new URL(buildMockShareUrl(BASE.slug, "copy")).searchParams.get("utm_source")).toBe("copy");
  });

  it("keeps every channel on one campaign so the rollup still aggregates", () => {
    const campaigns = SHARE_CHANNELS.map(
      (c: ShareChannel) => new URL(buildMockShareUrl(BASE.slug, c)).searchParams.get("utm_campaign")
    );
    expect(new Set(campaigns)).toEqual(new Set([SHARE_CAMPAIGN]));
  });

  it("percent-encodes a slug rather than emitting a broken URL", () => {
    const u = new URL(buildMockShareUrl("a b/c?d", "share"));
    expect(u.pathname).toBe("/mock/a%20b%2Fc%3Fd");
  });
});

describe("buildMockShareText — score is OPT-IN", () => {
  it("leads with the TEST and states no score by default", () => {
    const t = buildMockShareText({ ...BASE, includeScore: false });
    expect(t).toContain(BASE.title);
    // The whole point of the default: a student who scored badly still shares.
    expect(t).not.toContain("186");
    expect(t).not.toContain("/300");
  });

  it("states the score only when the student opts in", () => {
    const t = buildMockShareText({ ...BASE, includeScore: true });
    expect(t).toContain("186");
    expect(t).toContain("300");
    expect(t).toContain(BASE.title);
  });

  it("always ends with the shareable link", () => {
    for (const includeScore of [true, false]) {
      const t = buildMockShareText({ ...BASE, includeScore });
      expect(t).toContain(buildMockShareUrl(BASE.slug, "whatsapp"));
    }
  });

  it("uses the channel it is given for the embedded link", () => {
    const t = buildMockShareText({ ...BASE, includeScore: false, channel: "share" });
    expect(t).toContain(buildMockShareUrl(BASE.slug, "share"));
    expect(t).not.toContain("utm_source=whatsapp");
  });

  it("says nothing about a score when the paper is unmarked", () => {
    // maxScore 0 would make any percentage a division by zero. Suppress the
    // claim rather than print '0/0' or NaN into a group chat.
    const t = buildMockShareText({ ...BASE, score: 0, maxScore: 0, includeScore: true });
    expect(t).not.toContain("0/0");
    expect(t).not.toContain("NaN");
    expect(t).toContain(BASE.title);
  });

  it("survives a title carrying characters that break naive templating", () => {
    const t = buildMockShareText({ ...BASE, title: "CDS 2025 — Maths & English (100%)", includeScore: false });
    expect(t).toContain("CDS 2025 — Maths & English (100%)");
  });
});

describe("buildWhatsappHref", () => {
  it("encodes the message into wa.me with no recipient", () => {
    // No phone number: wa.me/?text= opens WhatsApp's own contact/group chooser,
    // which is the only flow that can reach a 200-person aspirant group.
    const href = buildWhatsappHref("hello & goodbye\nline two #1");
    expect(href.startsWith("https://wa.me/?text=")).toBe(true);
    const text = new URL(href).searchParams.get("text");
    expect(text).toBe("hello & goodbye\nline two #1");
  });

  it("round-trips a real share message without losing the url", () => {
    const msg = buildMockShareText({ ...BASE, includeScore: true });
    const text = new URL(buildWhatsappHref(msg)).searchParams.get("text");
    expect(text).toBe(msg);
    expect(text).toContain("utm_campaign=" + SHARE_CAMPAIGN);
  });
});
