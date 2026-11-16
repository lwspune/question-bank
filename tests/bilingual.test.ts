import { describe, expect, it } from "vitest";
import {
  altLangOf,
  cancelledLine,
  defaultLangFor,
  effectiveLang,
  hasTranslation,
  isLangChecked,
  langLabel,
  switchLangs,
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

  it("prints an option once when both languages read the same (a number, a formula)", () => {
    const same: Bilingual = {
      ...withMr,
      options: [{ label: "A", text: "\\(x^2 = 4x\\)" }],
      translations: { mr: { text: "प्रश्न", context: null, options: { A: "\\(x^2 = 4x\\)" } } },
    };
    expect(optionVersions(same, same.options[0], "both")).toEqual([{ lang: "en", text: "\\(x^2 = 4x\\)" }]);
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

/**
 * HINDI (SSC CGL, 2026-10-20). SSC prints every non-English question in
 * English and Hindi. Hindi is stored exactly like Marathi (a translation of
 * the canonical English row, lang 'hi'); a question carries at most one
 * second language, and the switch's middle button means "the other print",
 * so a stored preference of "mr" still picks the Hindi on an SSC page and a
 * stored "hi" still picks the Marathi on an MPSC page.
 */
describe("Hindi translations", () => {
  const withHi: Bilingual = {
    text: "A is the wife of B. How is D related to C?",
    context: null,
    options: [
      { label: "A", text: "Granddaughter" },
      { label: "B", text: "Daughter" },
    ],
    translations: {
      hi: { text: "A, B की पत्नी है। D का C से क्या संबंध है?", context: null, options: { A: "पोती", B: "पुत्री" } },
    },
  };

  it("parses a stored hi preference", () => {
    expect(parseLangPref("hi")).toBe("hi");
  });

  it("names the question's second language", () => {
    expect(altLangOf(withHi)).toBe("hi");
    expect(altLangOf(withMr)).toBe("mr");
    expect(altLangOf(englishOnly)).toBeNull();
    expect(hasTranslation(withHi)).toBe(true);
    expect(hasTranslation(englishOnly)).toBe(false);
  });

  it("treats either translated preference as 'the other print'", () => {
    expect(effectiveLang("hi", withHi)).toBe("hi");
    expect(effectiveLang("mr", withHi)).toBe("hi");
    expect(effectiveLang("hi", withMr)).toBe("mr");
    expect(effectiveLang("hi", englishOnly)).toBe("en");
  });

  it("shows the Hindi stem, tagged hi, and puts it first for both", () => {
    expect(stemVersions(withHi, "hi")).toEqual([{ lang: "hi", text: withHi.translations!.hi!.text, context: null }]);
    expect(stemVersions(withHi, "mr")[0].lang).toBe("hi");
    expect(stemVersions(withHi, "both").map((v) => v.lang)).toEqual(["hi", "en"]);
    expect(stemVersions(withHi, "en")).toEqual([{ lang: "en", text: withHi.text, context: null }]);
  });

  it("returns options in Hindi", () => {
    expect(optionVersions(withHi, withHi.options[0], "both")).toEqual([
      { lang: "hi", text: "पोती" },
      { lang: "en", text: "Granddaughter" },
    ]);
  });

  it("falls back to the English solution when there is no Hindi one", () => {
    expect(solutionVersions({ ...withHi, solution: "Because." }, "hi")).toEqual([{ lang: "en", text: "Because." }]);
  });

  it("assembles a Hindi translation from embedded rows", () => {
    expect(
      translationsFromRows(
        [{ lang: "hi", text: "प्रश्न", context: null }],
        [{ label: "A", option_translations: [{ lang: "hi", text: "एक" }] }]
      )
    ).toEqual({ hi: { text: "प्रश्न", context: null, options: { A: "एक" } } });
  });

  it("labels the switch in the exam's own script", () => {
    expect(switchLangs("hi")).toEqual(["en", "hi", "both"]);
    expect(switchLangs("mr")).toEqual(["en", "mr", "both"]);
    expect(langLabel("hi", "hi")).toBe("हिन्दी");
    expect(langLabel("both", "hi")).toBe("Both / दोनों");
    expect(langLabel("both", "mr")).toBe("Both / दोन्ही");
    expect(langLabel("mr", "mr")).toBe("मराठी");
  });

  it("defaults SSC (Hindi) readers to English and MPSC (Marathi) readers to both (owner, 2026-10-20)", () => {
    expect(defaultLangFor("hi")).toBe("en");
    expect(defaultLangFor("mr")).toBe("both");
    expect(defaultLangFor(null)).toBe("both");
  });

  it("marks the middle button checked for either translated preference", () => {
    expect(isLangChecked("hi", "mr", "hi")).toBe(true);
    expect(isLangChecked("hi", "hi", "hi")).toBe(true);
    expect(isLangChecked("en", "mr", "hi")).toBe(false);
    expect(isLangChecked("both", "both", "hi")).toBe(true);
  });
});

describe("cancelledLine", () => {
  it("says the question was cancelled in Marathi for a Marathi print", () => {
    expect(cancelledLine("mr")).toEqual({
      lang: "mr",
      text: "हा प्रश्न आयोगाने अंतिम उत्तरतालिकेत रद्द केला आहे; कोणताही पर्याय बरोबर नाही.",
    });
  });

  it("says it in Hindi for a Hindi print (RAS, SSC)", () => {
    const line = cancelledLine("hi");
    expect(line?.lang).toBe("hi");
    expect(line?.text).toMatch(/रद्द/);
    expect(line?.text).not.toMatch(/आयोगाने/); // not the Marathi sentence
  });

  it("adds no second line to an English-only question (CAPF, UPSC)", () => {
    expect(cancelledLine(null)).toBeNull();
  });
});
