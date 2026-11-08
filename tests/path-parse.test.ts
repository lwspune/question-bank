/**
 * POST /api/path's body (MENTOR_SPEC.md Phase 1): start (board + stream),
 * stop, or "Not taught yet" on a chapter. Everything else is refused before
 * any database work. Pure.
 */
import { describe, it, expect } from "vitest";
import { parseChapterParam, parsePathAction } from "@/lib/path/parse";
import { revealCountWithout } from "@/lib/path/exemptions";

const CHAPTER = "0b6f3c1e-2a4d-4c8e-9f10-1a2b3c4d5e6f";

describe("parsePathAction", () => {
  it("reads a start with a board and a stream", () => {
    expect(parsePathAction({ action: "start", exam: "cbse-12", stream: "pcb" })).toEqual({
      ok: true,
      value: { action: "start", exam: "cbse-12", stream: "pcb" },
    });
  });
  it("reads a stop and a defer", () => {
    expect(parsePathAction({ action: "stop" })).toEqual({ ok: true, value: { action: "stop" } });
    expect(parsePathAction({ action: "defer", chapterId: CHAPTER })).toEqual({
      ok: true,
      value: { action: "defer", chapterId: CHAPTER },
    });
  });
  it("refuses another board, another stream, a bad chapter id and junk", () => {
    expect(parsePathAction({ action: "start", exam: "nda", stream: "pcm" }).ok).toBe(false);
    expect(parsePathAction({ action: "start", exam: "cbse-12", stream: "commerce" }).ok).toBe(false);
    expect(parsePathAction({ action: "defer", chapterId: "not-a-uuid" }).ok).toBe(false);
    expect(parsePathAction({ action: "delete-everything" }).ok).toBe(false);
    expect(parsePathAction(null).ok).toBe(false);
    expect(parsePathAction("start").ok).toBe(false);
  });
});

describe("revealCountWithout: the day's counted answers leave out today's path questions", () => {
  it("drops exempt ids from the counted list", () => {
    expect(revealCountWithout(["a", "p1", "b"], ["p1", "p2"])).toEqual(["a", "b"]);
    expect(revealCountWithout(["a"], [])).toEqual(["a"]);
  });
});

describe("parseChapterParam: the /board line asks about one chapter", () => {
  it("takes a chapter id", () => {
    expect(parseChapterParam("c0ffee00-1b2c-4d3e-9f00-112233445566")).toBe("c0ffee00-1b2c-4d3e-9f00-112233445566");
  });
  it("refuses anything else before any database work", () => {
    for (const bad of [null, "", "atoms", "c0ffee00-1b2c-4d3e-9f00-112233445566x", "1 or 1=1"]) expect(parseChapterParam(bad)).toBeNull();
  });
});
