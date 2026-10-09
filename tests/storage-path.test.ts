import { describe, expect, it } from "vitest";
import { storagePathOf } from "@/lib/storage/imageUrl";

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
