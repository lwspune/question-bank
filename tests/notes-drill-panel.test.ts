/**
 * The notes drill panel (2026-11-15): a notes page's "Drill N more on <concept>"
 * and "Drill all N questions" open the questions in a panel on the same page.
 * These are the pure rules: what the panel asks GET /api/notes/drill for, and
 * what the route accepts.
 */
import { describe, it, expect } from "vitest";
import {
  DRILL_PAGE_SIZE,
  drillRequestQuery,
  parseDrillRequest,
  drillHasMore,
  type DrillSource,
} from "@/lib/notes/drillPanel";

const id = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const SUB = "11111111-2222-4333-8444-555555555555";

describe("drillRequestQuery", () => {
  it("asks for one page of a concept's ids, never the whole list", () => {
    const ids = Array.from({ length: 45 }, (_, i) => id(i));
    const source: DrillSource = { kind: "ids", ids };
    const p1 = new URLSearchParams(drillRequestQuery(source, 1));
    expect(p1.get("ids")!.split(",")).toEqual(ids.slice(0, DRILL_PAGE_SIZE));
    const p3 = new URLSearchParams(drillRequestQuery(source, 3));
    expect(p3.get("ids")!.split(",")).toEqual(ids.slice(40, 45));
  });

  it("asks for a topic by its id, its kind and the page", () => {
    const q = new URLSearchParams(drillRequestQuery({ kind: "subtopic", subtopicId: SUB, all: false }, 2));
    expect(Object.fromEntries(q)).toEqual({ subtopic: SUB, kind: "pyq", page: "2" });
    const all = new URLSearchParams(drillRequestQuery({ kind: "subtopic", subtopicId: SUB, all: true }, 1));
    expect(all.get("kind")).toBe("all");
  });
});

describe("parseDrillRequest", () => {
  const parse = (q: string) => parseDrillRequest(new URLSearchParams(q));

  it("accepts up to one page of ids, in the order given", () => {
    expect(parse(`ids=${id(2)},${id(1)}`)).toEqual({ ok: true, mode: "ids", ids: [id(2), id(1)] });
  });

  it("refuses more ids than a page, a malformed id, or none", () => {
    const many = Array.from({ length: DRILL_PAGE_SIZE + 1 }, (_, i) => id(i)).join(",");
    expect(parse(`ids=${many}`).ok).toBe(false);
    expect(parse(`ids=${id(1)},nope`).ok).toBe(false);
    expect(parse("ids=").ok).toBe(false);
    expect(parse("").ok).toBe(false);
  });

  it("accepts a topic with a kind and page, page 1 by default", () => {
    expect(parse(`subtopic=${SUB}&kind=all&page=3`)).toEqual({
      ok: true,
      mode: "subtopic",
      subtopicId: SUB,
      kind: "all",
      page: 3,
    });
    expect(parse(`subtopic=${SUB}&kind=pyq`)).toMatchObject({ ok: true, kind: "pyq", page: 1 });
  });

  it("refuses a bad topic id, an unknown kind, or a page out of range", () => {
    expect(parse("subtopic=x&kind=pyq").ok).toBe(false);
    expect(parse(`subtopic=${SUB}&kind=practice`).ok).toBe(false);
    expect(parse(`subtopic=${SUB}&kind=pyq&page=0`).ok).toBe(false);
    expect(parse(`subtopic=${SUB}&kind=pyq&page=abc`).ok).toBe(false);
    expect(parse(`subtopic=${SUB}&kind=pyq&page=101`).ok).toBe(false);
  });

  it("refuses ids and a topic together", () => {
    expect(parse(`ids=${id(1)}&subtopic=${SUB}&kind=pyq`).ok).toBe(false);
  });
});

describe("drillHasMore", () => {
  it("is true until every question the link counted is on screen", () => {
    expect(drillHasMore(20, 45)).toBe(true);
    expect(drillHasMore(45, 45)).toBe(false);
    // A question made private since the page was built: the page comes back short.
    expect(drillHasMore(19, 20, 19)).toBe(false);
  });
});
