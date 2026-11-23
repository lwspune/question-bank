import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { articleIndexNowUrls, shouldNotifyIndexNow } from "@/lib/blog/indexnow";
import { INDEXNOW_KEY, isValidIndexNowKey } from "@/lib/seo/indexnow";

describe("articleIndexNowUrls", () => {
  it("sends a blog post, the blog list and its exam's page", () => {
    expect(articleIndexNowUrls({ kind: "news", slug: "jee-main-2027-exam-dates", examSlug: "jee-mains" })).toEqual([
      "https://www.pyqvault.com/blog/jee-main-2027-exam-dates",
      "https://www.pyqvault.com/blog",
      "https://www.pyqvault.com/exams/jee-mains",
    ]);
  });

  it("sends a syllabus page and its exam's page, not the blog list", () => {
    expect(articleIndexNowUrls({ kind: "evergreen", slug: "nda-exam-pattern-syllabus", examSlug: "nda" })).toEqual([
      "https://www.pyqvault.com/exams/nda/syllabus",
      "https://www.pyqvault.com/nda",
    ]);
  });

  it("leaves out the exam page when an article has no exam", () => {
    expect(articleIndexNowUrls({ kind: "data", slug: "a-general-post", examSlug: null })).toEqual([
      "https://www.pyqvault.com/blog/a-general-post",
      "https://www.pyqvault.com/blog",
    ]);
  });
});

describe("shouldNotifyIndexNow", () => {
  it("sends only when a page goes live or changes on the site", () => {
    expect(shouldNotifyIndexNow("publish")).toBe(true);
    expect(shouldNotifyIndexNow("apply_changes")).toBe(true);
    expect(shouldNotifyIndexNow("unpublish")).toBe(false);
    expect(shouldNotifyIndexNow("discard_changes")).toBe(false);
  });
});

describe("INDEXNOW_KEY", () => {
  it("is valid and matches the public key file IndexNow checks", () => {
    expect(isValidIndexNowKey(INDEXNOW_KEY)).toBe(true);
    const file = join(process.cwd(), "public", `${INDEXNOW_KEY}.txt`);
    expect(existsSync(file)).toBe(true);
    expect(readFileSync(file, "utf8").trim()).toBe(INDEXNOW_KEY);
  });
});
