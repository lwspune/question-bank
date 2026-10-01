import { describe, it, expect } from "vitest";
import {
  CHAPTER_SHARE_CAMPAIGN,
  buildChapterShareText,
  buildChapterShareUrl,
} from "@/lib/share/chapterShare";

const PATH = "/questions/mht-cet/physics/circular-motion";

const CET = {
  path: PATH,
  chapterName: "Circular Motion",
  examDisplay: "MHT-CET",
  questionCount: 87,
  practiceOnly: false,
};

describe("buildChapterShareUrl", () => {
  it("points at the chapter's public page on the canonical host, tagged for attribution", () => {
    const u = new URL(buildChapterShareUrl(PATH, "whatsapp"));
    expect(u.origin).toBe("https://www.pyqvault.com");
    expect(u.pathname).toBe(PATH);
    expect(u.searchParams.get("utm_source")).toBe("whatsapp");
    expect(u.searchParams.get("utm_medium")).toBe("share");
    expect(u.searchParams.get("utm_campaign")).toBe(CHAPTER_SHARE_CAMPAIGN);
  });

  it("names the OS share sheet 'share', never a guessed app", () => {
    const u = new URL(buildChapterShareUrl(PATH, "share"));
    expect(u.searchParams.get("utm_source")).toBe("share");
  });

  it("refuses anything that is not a /questions chapter page", () => {
    expect(() => buildChapterShareUrl("/browse?examId=x", "copy")).toThrow();
    expect(() => buildChapterShareUrl("https://evil.example/questions/a/b/c", "copy")).toThrow();
    expect(() => buildChapterShareUrl("/questions/a/b", "copy")).toThrow();
  });
});

describe("buildChapterShareText", () => {
  it("states the chapter, the count and the exam, and ends on the link", () => {
    const text = buildChapterShareText({ ...CET, channel: "whatsapp" });
    expect(text.startsWith(
      "Circular Motion: 87 MHT-CET past questions with answers, free on PYQ Vault."
    )).toBe(true);
    const lastLine = text.trim().split("\n").at(-1)!;
    expect(lastLine).toBe(buildChapterShareUrl(PATH, "whatsapp"));
  });

  it("says 'practice questions' for an exam with no past papers", () => {
    const text = buildChapterShareText({
      ...CET,
      examDisplay: "CBSE Class 11",
      practiceOnly: true,
      channel: "whatsapp",
    });
    expect(text).toContain("87 CBSE Class 11 practice questions");
    expect(text).not.toContain("past questions");
  });

  it("formats large counts the Indian way", () => {
    const text = buildChapterShareText({ ...CET, questionCount: 1234, channel: "copy" });
    expect(text).toContain("1,234 MHT-CET");
  });

  it("carries the tag of the channel it is sent through", () => {
    const text = buildChapterShareText({ ...CET, channel: "share" });
    expect(text).toContain("utm_source=share");
  });
});
