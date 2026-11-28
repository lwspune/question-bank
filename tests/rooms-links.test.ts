/**
 * Circle messages: web links in a TEAM message become tappable (students
 * cannot post links at all, lib/rooms/text). splitLinks cuts a body into text
 * and link pieces; the window renders the pieces as React nodes, never HTML.
 * linkOpensHere: our own pages open in the same tab, any other site in a new one.
 */
import { describe, it, expect } from "vitest";
import { splitLinks, linkOpensHere } from "@/lib/rooms/links";

describe("splitLinks", () => {
  it("returns one text piece when there is no link", () => {
    expect(splitLinks("Write every step.")).toEqual([{ kind: "text", text: "Write every step." }]);
  });

  it("finds each link and keeps the text around it", () => {
    expect(splitLinks("Notes: https://www.pyqvault.com/notes/cbse-12-maths\nPapers: https://www.pyqvault.com/question-papers/cbse-12")).toEqual([
      { kind: "text", text: "Notes: " },
      { kind: "link", href: "https://www.pyqvault.com/notes/cbse-12-maths", text: "https://www.pyqvault.com/notes/cbse-12-maths" },
      { kind: "text", text: "\nPapers: " },
      { kind: "link", href: "https://www.pyqvault.com/question-papers/cbse-12", text: "https://www.pyqvault.com/question-papers/cbse-12" },
    ]);
  });

  it("leaves sentence punctuation and a closing bracket out of the link", () => {
    expect(splitLinks("See https://www.pyqvault.com/mock.")).toEqual([
      { kind: "text", text: "See " },
      { kind: "link", href: "https://www.pyqvault.com/mock", text: "https://www.pyqvault.com/mock" },
      { kind: "text", text: "." },
    ]);
    expect(splitLinks("(https://example.org/a?b=1),")[1]).toEqual({ kind: "link", href: "https://example.org/a?b=1", text: "https://example.org/a?b=1" });
  });

  it("only links http and https", () => {
    expect(splitLinks("javascript:alert(1) and ftp://x.org").every((p) => p.kind === "text")).toBe(true);
  });
});

describe("linkOpensHere", () => {
  it("opens our own site in the same tab and others in a new one", () => {
    expect(linkOpensHere("https://www.pyqvault.com/notes")).toBe(true);
    expect(linkOpensHere("https://pyqvault.com/notes")).toBe(true);
    expect(linkOpensHere("https://intl.pyqvault.com/imat")).toBe(true);
    expect(linkOpensHere("https://upsc.gov.in/notice")).toBe(false);
    expect(linkOpensHere("https://pyqvault.com.evil.org/")).toBe(false);
  });
});
