import { describe, expect, it } from "vitest";
import {
  effectiveLang,
  optionVersions,
  parseLangPref,
  stemVersions,
  translationsFromRows,
  type Bilingual,
} from "../src/lib/i18n/bilingual";

const withMr: Bilingual = {
  text: "Who wrote it ?",
  context: "Passage",
  options: [
    { label: "A", text: "One" },
    { label: "B", text: "Two" },
  ],
  translations: {
    mr: { text: "कोणी लिहिले ?", context: "उतारा", options: { A: "एक", B: "दोन" } },
  },
};
const englishOnly: Bilingual = { text: "Only English", context: null, options: [{ label: "A", text: "x" }] };

describe("parseLangPref", () => {
  it("accepts the three stored values and nothing else", () => {
    expect(parseLangPref("en")).toBe("en");
    expect(parseLangPref("mr")).toBe("mr");
    expect(parseLangPref("both")).toBe("both");
    expect(parseLangPref("fr")).toBeNull();
    expect(parseLangPref(null)).toBeNull();
  });
});

describe("effectiveLang", () => {
  it("honours the preference when Marathi exists", () => {
    expect(effectiveLang("mr", withMr)).toBe("mr");
    expect(effectiveLang("both", withMr)).toBe("both");
  });

  it("falls back to English for a question that has no Marathi, whatever the preference", () => {
    expect(effectiveLang("mr", englishOnly)).toBe("en");
    expect(effectiveLang("both", englishOnly)).toBe("en");
  });
});

describe("stemVersions", () => {
  it("English only", () => {
    expect(stemVersions(withMr, "en")).toEqual([{ lang: "en", text: "Who wrote it ?", context: "Passage" }]);
  });

  it("Marathi only", () => {
    expect(stemVersions(withMr, "mr")).toEqual([{ lang: "mr", text: "कोणी लिहिले ?", context: "उतारा" }]);
  });

  it("both, Marathi first — the order the booklet prints", () => {
    expect(stemVersions(withMr, "both").map((v) => v.lang)).toEqual(["mr", "en"]);
  });

  it("never shows an empty Marathi block for an English-only question", () => {
    expect(stemVersions(englishOnly, "mr")).toEqual([{ lang: "en", text: "Only English", context: null }]);
  });
});

describe("optionVersions", () => {
  it("returns the option in each chosen language, Marathi first", () => {
    expect(optionVersions(withMr, withMr.options[1], "both")).toEqual([
      { lang: "mr", text: "दोन" },
      { lang: "en", text: "Two" },
    ]);
  });

  it("falls back to English for an option with no Marathi text", () => {
    const partial: Bilingual = { ...withMr, translations: { mr: { text: "x", context: null, options: {} } } };
    expect(optionVersions(partial, partial.options[0], "mr")).toEqual([{ lang: "en", text: "One" }]);
  });
});

describe("translationsFromRows", () => {
  it("assembles the Marathi translation from embedded rows", () => {
    expect(
      translationsFromRows(
        [{ lang: "mr", text: "प्रश्न", context: null }],
        [
          { label: "A", option_translations: [{ lang: "mr", text: "एक" }] },
          { label: "B", option_translations: [] },
        ]
      )
    ).toEqual({ mr: { text: "प्रश्न", context: null, options: { A: "एक" } } });
  });

  it("is undefined for a question with no translation, so English rows carry nothing", () => {
    expect(translationsFromRows([], [{ label: "A", option_translations: [] }])).toBeUndefined();
    expect(translationsFromRows(null, null)).toBeUndefined();
  });
});
