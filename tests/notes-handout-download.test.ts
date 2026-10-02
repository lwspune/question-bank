import { describe, it, expect } from "vitest";
import {
  handoutDownloadHref,
  shouldAutoPrint,
  withoutPrintParam,
} from "@/lib/notes/handoutDownload";

// "Download as PDF" used to open the handout page and leave the visitor to find
// a second button; Clarity (2026-10-01) recorded one tapping the page's text,
// then Save as PDF, three times over. The link now asks the handout to open
// the save screen itself.
describe("handoutDownloadHref", () => {
  it("adds the print flag", () => {
    expect(handoutDownloadHref("/notes/print/nda-geography/climatology")).toBe(
      "/notes/print/nda-geography/climatology?print=1"
    );
  });

  it("keeps an existing query", () => {
    expect(handoutDownloadHref("/notes/print/x/y?from=z")).toBe("/notes/print/x/y?from=z&print=1");
  });
});

describe("shouldAutoPrint", () => {
  it("prints only when the link asked for it", () => {
    expect(shouldAutoPrint("?print=1")).toBe(true);
    expect(shouldAutoPrint("?from=z&print=1")).toBe(true);
  });

  // A desktop visitor who opens the handout to read it must not get a print
  // dialog thrown at them.
  it("does not print on a plain visit", () => {
    expect(shouldAutoPrint("")).toBe(false);
    expect(shouldAutoPrint("?print=0")).toBe(false);
    expect(shouldAutoPrint("?printable=1")).toBe(false);
  });
});

describe("withoutPrintParam", () => {
  // Dropped after printing so a reload or a Back does not reopen the dialog.
  it("removes only the print flag", () => {
    expect(withoutPrintParam("/notes/print/x/y?print=1")).toBe("/notes/print/x/y");
    expect(withoutPrintParam("/notes/print/x/y?from=z&print=1")).toBe("/notes/print/x/y?from=z");
    expect(withoutPrintParam("/notes/print/x/y")).toBe("/notes/print/x/y");
  });
});
