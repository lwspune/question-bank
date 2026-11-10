import { describe, it, expect, vi, beforeEach } from "vitest";

// /browse is served on www and on intl.pyqvault.com. Its canonical must name
// the host it was served on: on 2026-11-10 intl's /browse pointed at
// www.pyqvault.com/browse, a page that does not show the intl exams.
const host = { value: "www.pyqvault.com" as string | null };
vi.mock("next/headers", () => ({
  headers: async () => new Headers(host.value ? { host: host.value } : {}),
  cookies: async () => ({ get: () => undefined, getAll: () => [] }),
}));

import { generateMetadata } from "@/app/browse/page";

describe("/browse canonical", () => {
  beforeEach(() => {
    host.value = "www.pyqvault.com";
  });

  it("is the intl /browse on the intl host", async () => {
    host.value = "intl.pyqvault.com";
    const meta = await generateMetadata();
    expect(meta.alternates?.canonical).toBe("https://intl.pyqvault.com/browse");
  });

  it("stays relative on www, and keeps the title", async () => {
    const meta = await generateMetadata();
    expect(meta.alternates?.canonical).toBe("/browse");
    expect(meta.title).toBe("Browse questions");
  });
});
