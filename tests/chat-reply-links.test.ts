/**
 * Links in V's AI replies (2026-10-15). A path becomes tappable only when V
 * was GIVEN it (a page in its facts or a chapter its search returned), so a
 * made-up address is never a link.
 */
import { describe, it, expect } from "vitest";
import { pathsInReply, allowedReplyLinks, splitReplyLinks } from "@/lib/chat/replyLinks";

describe("pathsInReply", () => {
  it("finds site paths written in the reply", () => {
    expect(pathsInReply("Try /pricing or /questions/cbse-12/physics/atoms.")).toEqual([
      "/pricing",
      "/questions/cbse-12/physics/atoms",
    ]);
  });

  it("does not read a fraction or a class number as a path", () => {
    expect(pathsInReply("x/sin x, 11th/12th and 1/2 marks")).toEqual([]);
  });

  it("finds a path inside brackets", () => {
    expect(pathsInReply("the notes (/notes) are free")).toEqual(["/notes"]);
  });
});

describe("allowedReplyLinks", () => {
  it("keeps only the paths V was given", () => {
    const allowed = new Set(["/pricing", "/questions/neet/physics/atoms"]);
    const reply = "See /pricing, /questions/neet/physics/atoms and /made-up/page.";
    expect(allowedReplyLinks(reply, allowed)).toEqual(["/pricing", "/questions/neet/physics/atoms"]);
  });

  it("lists a path once even when the reply repeats it", () => {
    expect(allowedReplyLinks("/pricing and /pricing", new Set(["/pricing"]))).toEqual(["/pricing"]);
  });
});

describe("splitReplyLinks", () => {
  it("splits the reply into text and the given links", () => {
    expect(splitReplyLinks("Buy it at /pricing today.", ["/pricing"])).toEqual([
      { kind: "text", text: "Buy it at " },
      { kind: "link", href: "/pricing" },
      { kind: "text", text: " today." },
    ]);
  });

  it("leaves a path that is not in the list as plain text", () => {
    expect(splitReplyLinks("Go to /made-up now", [])).toEqual([{ kind: "text", text: "Go to /made-up now" }]);
  });

  it("does not link the start of a longer path", () => {
    expect(splitReplyLinks("see /notes/nda", ["/notes"])).toEqual([{ kind: "text", text: "see /notes/nda" }]);
  });
});
