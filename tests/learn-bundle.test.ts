import { describe, expect, it } from "vitest";
import { readBundle } from "@/lib/learn/bundle";

const COMMIT = "afca8bf2917528e395a46c9a76cbeba04b592d1d";

function chapter(slug: string, codes: string[], opts: { verified?: boolean; translations?: unknown[] } = {}) {
  return {
    slug,
    title: slug,
    concepts: codes.map((code) => ({
      code,
      items: [{ code: `${code}-Q1`, verified: opts.verified ?? true }],
      translations: opts.translations ?? [],
    })),
  };
}

function fixture() {
  const manifest = {
    source: "concept-ladder",
    commit: COMMIT,
    dirty: false,
    exportedAt: "2026-10-27T14:48:11.262Z",
    verified: true,
    courses: [{ slug: "mh-hsc-12-maths", chapters: 1 }],
    chapters: ["matrices"],
  };
  const bundle = {
    courses: [
      {
        slug: "mh-hsc-12-maths",
        title: "Maharashtra Board",
        exam: "mh-hsc-12",
        subject: "maths",
        standard: 12,
        chapters: [{ slug: "matrices", title: "Matrices", standard: 12, pyqvault: null, parts: [{ chapter: "matrices", concepts: ["C01", "C02"] }] }],
      },
    ],
    chapters: [chapter("matrices", ["C01", "C02", "C03"])],
  };
  return { manifest, bundle };
}

describe("readBundle", () => {
  it("accepts a well-formed bundle and returns its parts", () => {
    const { manifest, bundle } = fixture();
    const out = readBundle(manifest, bundle);
    expect(out.commit).toBe(COMMIT);
    expect(out.exportedAt).toBe("2026-10-27T14:48:11.262Z");
    expect(out.courses.map((c) => c.slug)).toEqual(["mh-hsc-12-maths"]);
    expect(out.chapters.map((c) => c.slug)).toEqual(["matrices"]);
    expect(out.warnings).toEqual([]);
  });

  it("refuses a bundle not from Concept Ladder, unverified, or from a dirty tree", () => {
    for (const patch of [{ source: "elsewhere" }, { verified: false }, { dirty: true }, { commit: "abc" }, { exportedAt: "soon" }]) {
      const { manifest, bundle } = fixture();
      expect(() => readBundle({ ...manifest, ...patch }, bundle)).toThrow();
    }
  });

  it("refuses an exam PYQ Vault does not have, or a slug that is not <exam>-<subject>", () => {
    const a = fixture();
    a.bundle.courses[0].exam = "no-such-exam";
    expect(() => readBundle(a.manifest, a.bundle)).toThrow(/no-such-exam/);
    const b = fixture();
    b.bundle.courses[0].slug = "something-else";
    expect(() => readBundle(b.manifest, b.bundle)).toThrow(/something-else/);
  });

  it("refuses a course part whose chapter or concept is not in the bundle", () => {
    const a = fixture();
    a.bundle.courses[0].chapters[0].parts[0].chapter = "vectors";
    expect(() => readBundle(a.manifest, a.bundle)).toThrow(/vectors/);
    const b = fixture();
    b.bundle.courses[0].chapters[0].parts[0].concepts.push("C99");
    expect(() => readBundle(b.manifest, b.bundle)).toThrow(/C99/);
  });

  it("refuses unverified items", () => {
    const { manifest, bundle } = fixture();
    bundle.chapters = [chapter("matrices", ["C01", "C02"], { verified: false })];
    expect(() => readBundle(manifest, bundle)).toThrow(/unverified/);
  });

  it("refuses a manifest whose chapter list disagrees with the bundle", () => {
    const { manifest, bundle } = fixture();
    expect(() => readBundle({ ...manifest, chapters: ["matrices", "vectors"] }, bundle)).toThrow(/manifest/);
  });

  it("drops translations, which are not imported yet, and says so", () => {
    const { manifest, bundle } = fixture();
    bundle.chapters = [chapter("matrices", ["C01", "C02"], { translations: [{ lang: "hi" }] })];
    const out = readBundle(manifest, bundle);
    expect(out.chapters[0].concepts.every((c) => (c as { translations: unknown[] }).translations.length === 0)).toBe(true);
    expect(out.warnings).toEqual(["matrices: 2 concept translation(s) not imported"]);
  });
});
