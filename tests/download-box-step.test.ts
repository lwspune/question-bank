import { describe, it, expect } from "vitest";
import { EXPORT_CAP, downloadBoxStep, overCapCopy } from "@/lib/export/downloadBoxStep";
import { parseClientEvent } from "@/lib/activity/clientEvents";

/**
 * Clarity + signups, 2026-10-12: a signed-out visitor whose filters matched
 * more than 200 questions was asked to sign in, and only then told the paper
 * could not be made. The box now says so first, and never asks for a sign-in
 * or a payment for a paper it cannot make.
 */
const base = { canDownload: false, wantPass: false, count: 40, passOnSale: true };

describe("downloadBoxStep", () => {
  it("shows the download view to anyone who can download", () => {
    expect(downloadBoxStep({ ...base, canDownload: true })).toBe("download");
  });

  it("keeps the download view (with its own warning) over the cap when downloading is allowed", () => {
    expect(downloadBoxStep({ ...base, canDownload: true, count: 900 })).toBe("download");
  });

  it("says the selection is too big before asking a signed-out visitor to sign in", () => {
    expect(downloadBoxStep({ ...base, count: 201 })).toBe("over_cap");
  });

  it("does not ask for payment for a paper that cannot be made", () => {
    expect(downloadBoxStep({ ...base, count: 5000 })).toBe("over_cap");
  });

  it("offers sign-in or the pass at exactly the cap", () => {
    expect(downloadBoxStep({ ...base, count: EXPORT_CAP })).toBe("offer");
  });

  it("shows the offer when the student asked for the pass, whatever the count", () => {
    expect(downloadBoxStep({ ...base, canDownload: true, wantPass: true, count: 900 })).toBe("offer");
  });

  it("falls back to the no-pass note when nothing is on sale", () => {
    expect(downloadBoxStep({ ...base, passOnSale: false })).toBe("no_pass");
  });
});

describe("overCapCopy", () => {
  it("tells a filters visitor how many matched and what to do", () => {
    const c = overCapCopy("filters", 1234);
    expect(c.title).toBe("Too many questions for one paper");
    expect(c.body).toContain("1,234");
    expect(c.body).toContain("200");
    expect(c.body).toMatch(/chapter, subtopic or year/);
  });

  it("tells a cart visitor to remove some", () => {
    expect(overCapCopy("cart", 250).body).toMatch(/Remove some/);
  });

  it("uses no em or en dashes (house style)", () => {
    for (const mode of ["filters", "cart"] as const) {
      const c = overCapCopy(mode, 300);
      expect(`${c.title} ${c.body}`).not.toMatch(/[–—]/);
    }
  });
});

describe("download box views reach the activity log", () => {
  const now = new Date("2026-10-12T10:00:00Z");
  it.each(["download_box", "download_box_over_cap"])("accepts surface %s", (surface) => {
    const r = parseClientEvent({ kind: "surface_viewed", surface }, "u1", now);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.metadata).toEqual({ surface });
  });
});
