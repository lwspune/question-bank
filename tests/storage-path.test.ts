import { describe, expect, it } from "vitest";
import { publicImageUrl, storagePathOf } from "@/lib/storage/imageUrl";

// 608 question pictures and 82 solution pictures are stored as their full
// public URL rather than a bucket path. The download helper passes the value
// to storage.download(), which wants a path, so every Word and PDF export left
// those pictures out without an error.
describe("storagePathOf", () => {
  it("passes a bucket path through unchanged", () => {
    expect(storagePathOf("org-1/abc.png")).toBe("org-1/abc.png");
  });

  it("takes the path out of our own public URL", () => {
    expect(
      storagePathOf(
        "https://wunvtnqlzjrkvolslbnm.supabase.co/storage/v1/object/public/question-images/logic-12-pyq/paper-mar-2024-q-15.png"
      )
    ).toBe("logic-12-pyq/paper-mar-2024-q-15.png");
  });

  it("decodes an encoded path segment", () => {
    expect(
      storagePathOf("https://x.supabase.co/storage/v1/object/public/question-images/a%20b/c.png")
    ).toBe("a b/c.png");
  });

  it("refuses a URL that is not in our bucket", () => {
    expect(storagePathOf("https://example.com/question-images/c.png")).toBeNull();
    expect(
      storagePathOf("https://x.supabase.co/storage/v1/object/public/other-bucket/c.png")
    ).toBeNull();
  });
});

// The same 608 + 82 pictures were BROKEN on the site too: every page builds
// its picture link with publicImageUrl, which put the storage prefix in front
// of an address that already had one (46 broken figures on one live /board
// chapter, 2026-10-09).
describe("publicImageUrl", () => {
  const SUPA = "https://wunvtnqlzjrkvolslbnm.supabase.co";
  const FULL = `${SUPA}/storage/v1/object/public/question-images/cbse-12-pyq/bbe7f05a0320.png`;

  it("builds the public address of a bucket path", () => {
    expect(publicImageUrl(SUPA, "cbse-12-pyq/bbe7f05a0320.png")).toBe(FULL);
  });

  it("does not prefix a stored value that is already our full address", () => {
    expect(publicImageUrl(SUPA, FULL)).toBe(FULL);
  });

  it("tolerates a trailing slash on the project address", () => {
    expect(publicImageUrl(`${SUPA}/`, FULL)).toBe(FULL);
  });

  it("leaves an address outside our bucket as it is, rather than doubling it", () => {
    expect(publicImageUrl(SUPA, "https://example.com/a.png")).toBe("https://example.com/a.png");
  });
});
