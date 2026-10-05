import { describe, it, expect } from "vitest";
import { parseTitleKeys, titlesForKeys, MAX_TITLE_KEYS } from "@/lib/notes/titleLookup";

/**
 * The /notes "Your notes" strip (a browser island) named topics by
 * prettifying slugs ("Jch Sbc Mole"). It now asks /api/notes/titles for the
 * real names of the few topics it shows; the server reads the notes registry.
 * Input is a list of "subjectRoute/chapterSlug/subtopicSlug" keys.
 */
describe("parseTitleKeys", () => {
  it("keeps well-formed keys, drops the rest, and de-duplicates", () => {
    expect(
      parseTitleKeys([
        "nda-maths/vectors/dot-product-angle",
        "nda-maths/vectors/dot-product-angle",
        "../etc/passwd",
        "nda-maths/vectors",
        "NDA/Vectors/Dot",
        "",
      ])
    ).toEqual(["nda-maths/vectors/dot-product-angle"]);
  });

  it("caps the number of keys", () => {
    const many = Array.from({ length: MAX_TITLE_KEYS + 10 }, (_, i) => `a/b/c-${i}`);
    expect(parseTitleKeys(many)).toHaveLength(MAX_TITLE_KEYS);
  });
});

describe("titlesForKeys", () => {
  it("returns the registry's names, keyed by the request key", () => {
    expect(titlesForKeys(["nda-maths/vectors/dot-product-angle"])).toEqual({
      "nda-maths/vectors/dot-product-angle": { topic: "Dot Product and Angle", chapter: "Vectors" },
    });
  });

  it("omits a topic the registry does not have, so the client keeps its fallback", () => {
    expect(titlesForKeys(["nda-maths/vectors/no-such-topic"])).toEqual({});
  });
});
