/**
 * GET /api/notes/subtopic (2026-11-15): one notes subtopic's teaching content,
 * for the stuck offer's "Teach me the idea" panel. It reads the notes modules
 * on the server (never the database), so it runs without a test project.
 */
import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/notes/subtopic/route";

async function get(query: string) {
  const res = await GET(new NextRequest(`http://localhost:3000/api/notes/subtopic${query}`));
  const json = (await res.json()) as Record<string, unknown>;
  return { status: res.status, json, cache: res.headers.get("cache-control") };
}

describe("GET /api/notes/subtopic", () => {
  it("returns a real subtopic's title, definition, concepts and full-page link", async () => {
    const r = await get("?route=nda-maths&chapter=statistics&subtopic=central-tendency");
    expect(r.status).toBe(200);
    expect(r.json.href).toBe("/notes/nda-maths/statistics/central-tendency");
    expect(typeof r.json.title).toBe("string");
    expect(typeof r.json.oneLineDefinition).toBe("string");
    const concepts = r.json.concepts as { slug: string; name: string }[];
    expect(concepts.length).toBeGreaterThan(0);
    expect(concepts.every((c) => typeof c.slug === "string" && typeof c.name === "string")).toBe(true);
    expect(r.cache).toContain("s-maxage=86400");
  });

  it("puts a named concept first", async () => {
    const first = await get("?route=nda-maths&chapter=statistics&subtopic=central-tendency");
    const concepts = first.json.concepts as { slug: string }[];
    const last = concepts[concepts.length - 1].slug;
    const r = await get(`?route=nda-maths&chapter=statistics&subtopic=central-tendency&concept=${last}`);
    expect((r.json.concepts as { slug: string }[])[0].slug).toBe(last);
  });

  it("is a 404 for a chapter or subtopic that has no notes", async () => {
    expect((await get("?route=nda-maths&chapter=statistics&subtopic=no-such-subtopic")).status).toBe(404);
    expect((await get("?route=nda-maths&chapter=no-such-chapter&subtopic=central-tendency")).status).toBe(404);
  });

  it("is a 400 for a malformed request", async () => {
    expect((await get("?route=nda-maths&chapter=statistics")).status).toBe(400);
    expect((await get("?route=NDA Maths&chapter=statistics&subtopic=x")).status).toBe(400);
    expect((await get("?route=nda-maths&chapter=statistics&subtopic=central-tendency&concept=Bad Slug")).status).toBe(400);
  });
});
