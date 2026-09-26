import { describe, expect, it } from "vitest";
import {
  effectiveLang,
  optionVersions,
  parseLangPref,
  scriptLang,
  solutionVersions,
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

describe("translationsFromRows — solution", () => {
  it("carries the Marathi solution when the row has one", () => {
    expect(translationsFromRows([{ lang: "mr", text: "प्रश्न", context: null, solution: "टीप" }], [])).toEqual({
      mr: { text: "प्रश्न", context: null, solution: "टीप", options: {} },
    });
  });
});

describe("solutionVersions", () => {
  const q = { ...withMr, solution: "Because.", translations: { mr: { ...withMr.translations!.mr!, solution: "कारण." } } };

  it("English only", () => {
    expect(solutionVersions(q, "en")).toEqual([{ lang: "en", text: "Because." }]);
  });

  it("Marathi only", () => {
    expect(solutionVersions(q, "mr")).toEqual([{ lang: "mr", text: "कारण." }]);
  });

  it("both, Marathi first", () => {
    expect(solutionVersions(q, "both")).toEqual([
      { lang: "mr", text: "कारण." },
      { lang: "en", text: "Because." },
    ]);
  });

  it("falls back to the English solution when the Marathi one is missing", () => {
    expect(solutionVersions({ ...withMr, solution: "Because." }, "mr")).toEqual([{ lang: "en", text: "Because." }]);
    expect(solutionVersions({ ...withMr, solution: "Because." }, "both")).toEqual([{ lang: "en", text: "Because." }]);
  });

  it("is empty when there is no solution in any language", () => {
    expect(solutionVersions({ ...withMr, solution: null }, "both")).toEqual([]);
  });

  it("shows a Marathi-only solution even when English has none", () => {
    const mrOnly = { ...withMr, solution: null, translations: { mr: { ...withMr.translations!.mr!, solution: "कारण." } } };
    expect(solutionVersions(mrOnly, "en")).toEqual([{ lang: "mr", text: "कारण." }]);
  });
});

/**
 * MONOLINGUAL MARATHI. The MPSC Mains language papers print their Marathi
 * section in Marathi ONLY — there is no English to be canonical. Such a row
 * stores the Marathi as its canonical text with no translation, and every
 * language choice shows it. What must not happen is tagging it lang="en",
 * which makes a screen reader read Devanagari with an English voice.
 */
describe("monolingual Marathi rows", () => {
  const q = {
    text: "'सर्वांना समज दिली जाईल' या वाक्याचा प्रयोग ओळखा.",
    context: null,
    solution: null,
    options: [
      { label: "A" as const, text: "शक्यकर्मणी" },
      { label: "B" as const, text: "कर्मकर्तरी" },
      { label: "C" as const, text: "पुरुषकर्मणी" },
      { label: "D" as const, text: "भावकर्तरी" },
    ],
  };

  it("detects the script of a canonical text", () => {
    expect(scriptLang(q.text)).toBe("mr");
    expect(scriptLang("Choose the correct expression out of the alternatives :")).toBe("en");
    expect(scriptLang("\(x^2\) = 4")).toBe("en");
  });

  it("shows the Marathi text once, tagged mr, whatever was chosen", () => {
    for (const pref of ["en", "mr", "both"] as const) {
      expect(stemVersions(q, pref)).toEqual([{ lang: "mr", text: q.text, context: null }]);
      expect(optionVersions(q, q.options[1], pref)).toEqual([{ lang: "mr", text: "कर्मकर्तरी" }]);
    }
  });

  it("tags a Marathi-only solution mr", () => {
    expect(solutionVersions({ ...q, solution: "कर्मकर्तरी प्रयोग." }, "en")).toEqual([
      { lang: "mr", text: "कर्मकर्तरी प्रयोग." },
    ]);
  });

  it("leaves an English canonical row tagged en", () => {
    const en = { ...q, text: "Pick the synonym.", options: [{ label: "A" as const, text: "big" }] };
    expect(stemVersions(en, "mr")[0].lang).toBe("en");
  });
});
