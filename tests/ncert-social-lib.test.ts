/**
 * Pure core for the NCERT Class 10 SOCIAL SCIENCE lane.
 *
 * Four books, and the reason this file exists is that they agree on almost
 * nothing:
 *
 *  1. **Four question-block conventions.** History opens its questions with
 *     "Write in brief" and "Discuss" and has no Exercises heading at all;
 *     Geography prints EXERCISES five times on one line; Polity prints
 *     "Exercises"; Economics prints EXERCISES and ALSO carries an in-text
 *     "LET'S WORK THESE OUT" lane, the way Science carries QUESTIONS boxes.
 *  2. **Three of the four books do not number their sections.** Measured:
 *     Geography, Polity and Economics have none. Only History does. So the
 *     Science lane's `deriveAnchors`, which mints an anchor from any dotted
 *     number at a line start, produces *phantom* anchors here — Polity's prose
 *     alone yields "43.63" and "8.03", and Economics "50.2". That is the
 *     fail-OPEN direction: a phantom anchor lets an invented citation resolve.
 *     Anchors here are therefore the chapter's own HEADING TEXT.
 *  3. **There is no answer key. Anywhere.** Science had jesc1an.pdf; no
 *     equivalent file exists for any of these four books. Grounding is not one
 *     check among several here — it is the only one.
 */
import { describe, it, expect } from "vitest";
import {
  blockOpener,
  ssExerciseRef,
  briefRef,
  discussRef,
  letsWorkRef,
  normaliseHeading,
  headingAnchors,
  parseSocialCitations,
  stitchSmallCaps,
  figureTableAnchors,
  type HeadingLine,
} from "../scripts/ncert/socialLib";
import { groundingViolations, parseCitations } from "../scripts/ncert/scienceLib";

describe("blockOpener", () => {
  // Real lines from the four books, which is the point — this is the one
  // structural fact that differs per book and it was measured, not assumed.
  it("finds Geography's EXERCISES, printed five times on one line", () => {
    const line = "EXERCISES  EXERCISES  EXERCISES  EXERCISES  EXERCISES";
    expect(blockOpener("geography").test(line)).toBe(true);
  });

  it("finds Polity's title-case Exercises", () => {
    expect(blockOpener("polity").test("Exercises")).toBe(true);
  });

  it("finds Economics' EXERCISES", () => {
    expect(blockOpener("economics").test("EXERCISES")).toBe(true);
  });

  it("finds BOTH of History's headings, which are not 'Exercises' at all", () => {
    // History Ch.1 p27 prints "Write in brief" and "Discuss" as two separate
    // numbered blocks. A splitter looking for EXERCISES finds nothing and
    // would report the chapter as having no questions.
    expect(blockOpener("history").test("Write in brief")).toBe(true);
    expect(blockOpener("history").test("Discuss")).toBe(true);
    expect(blockOpener("history").test("EXERCISES")).toBe(false);
  });

  it("does not fire on the word 'exercise' in prose", () => {
    // Every one of these books uses the word in body text; Polity Ch.1 alone
    // has it on three pages before the question block.
    expect(blockOpener("polity").test("citizens exercise their right to vote")).toBe(false);
    expect(blockOpener("geography").test("we must exercise restraint")).toBe(false);
  });

  it("is global-flag free so .test() is not stateful", () => {
    const re = blockOpener("geography");
    expect(re.test("EXERCISES")).toBe(true);
    expect(re.test("EXERCISES")).toBe(true);
  });
});

describe("refs", () => {
  it("builds an exercise ref per chapter, with an optional sub-part", () => {
    expect(ssExerciseRef(2, 3)).toBe("Ex 2 Q3");
    expect(ssExerciseRef(2, 3, "i")).toBe("Ex 2 Q3 (i)");
  });

  it("gives History's two blocks DIFFERENT prefixes", () => {
    // Both blocks number from 1, so a single "Ex 1 Q1" would collide and one
    // of the two questions would be lost at merge.
    expect(briefRef(1, 1)).toBe("WB 1 Q1");
    expect(discussRef(1, 1)).toBe("DS 1 Q1");
    expect(briefRef(1, 1)).not.toBe(discussRef(1, 1));
  });

  it("bands an Economics in-text box to its chapter and box number", () => {
    expect(letsWorkRef(3, 2, 1)).toBe("LW 3.2 Q1");
  });

  it("keeps a one-digit box from prefixing a two-digit one", () => {
    // The Science lesson: "IT 11.1 Q" is a prefix of "IT 11.10 Q", so a
    // refPrefixes match would swallow a neighbouring box's rows.
    expect(letsWorkRef(1, 10, 1).startsWith(letsWorkRef(1, 1, 1).slice(0, 7))).toBe(false);
  });
});

describe("normaliseHeading", () => {
  it("collapses case, spacing and trailing punctuation", () => {
    expect(normaliseHeading("  Land  Utilisation  ")).toBe("land utilisation");
    expect(normaliseHeading("SOIL AS A RESOURCE")).toBe("soil as a resource");
    expect(normaliseHeading("Why Non-cooperation?")).toBe("why non cooperation");
  });

  it("survives the broken kerning the text layer emits", () => {
    // Polity's running head comes out of PyMuPDF as "De moc ra tic  Polit ics".
    // It must normalise to ONE stable key or the running-head rule cannot
    // recognise it as the same string page after page.
    expect(normaliseHeading("De moc ra tic  Polit ics")).toBe(
      normaliseHeading("De moc ra tic Polit ics")
    );
  });

  it("treats the curly and straight apostrophe as the same character", () => {
    expect(normaliseHeading("LET’S WORK THESE OUT")).toBe(normaliseHeading("LET'S WORK THESE OUT"));
  });
});

describe("headingAnchors", () => {
  const body = 10;
  const L = (text: string, size: number, page: number): HeadingLine => ({ text, size, page });
  const B = (text: string, size: number, page: number): HeadingLine =>
    ({ text, size, page, bold: true });

  // Geography Ch.4 measured: body is 10.5pt Bookman-Light and the section
  // heading "Major Crops" is 10.5pt Bookman-Demi — SAME SIZE, heavier face.
  // A size-only rule found 5 anchors in a chapter with far more sections, and
  // under-detection here is not harmless: it rejects CORRECT citations.
  it("keeps a BOLD line at body size — size alone misses Geography's sections", () => {
    expect(headingAnchors([B("Major Crops", 10, 3)], body)).toEqual(["major crops"]);
  });

  it("does not treat an ordinary body line at body size as a heading", () => {
    expect(headingAnchors([L("Major crops grown across India", 10, 3)], body)).toEqual([]);
  });

  it("rejects a bold line set SMALLER than the body", () => {
    // Geography sets its marginal prompts bold at 9.5pt against a 10.5pt body
    // ("Can you name some such types of farmings?"). Those are captions, not
    // sections, and admitting them would let an answer ground itself in a
    // question rather than in the prose that answers it.
    expect(headingAnchors([B("Can you name some such types of farmings", 9, 3)], body)).toEqual([]);
  });

  it("keeps a line set larger than the body text", () => {
    const lines = [L("Land Utilisation", 14, 3), L("ordinary body prose here", 10, 3)];
    expect(headingAnchors(lines, body)).toEqual(["land utilisation"]);
  });

  it("DROPS a running head, which is the whole difficulty", () => {
    // "CONTEMPORARY INDIA - II" is set large and appears on every page. Font
    // size alone cannot tell it from a real heading; REPETITION can, and that
    // is why the rule counts distinct pages rather than trusting size.
    const lines = [
      L("CONTEMPORARY INDIA - II", 12, 1),
      L("CONTEMPORARY INDIA - II", 12, 2),
      L("CONTEMPORARY INDIA - II", 12, 3),
      L("Land Utilisation", 12, 3),
    ];
    expect(headingAnchors(lines, body)).toEqual(["land utilisation"]);
  });

  it("keeps a heading that legitimately recurs on two pages", () => {
    // A long section can straddle a page break and carry its heading twice.
    // The cut is at THREE pages so that a two-page section is not lost.
    const lines = [L("Water Resources", 13, 4), L("Water Resources", 13, 5)];
    expect(headingAnchors(lines, body)).toEqual(["water resources"]);
  });

  it("rejects a fragment too short to be a heading", () => {
    const lines = [L("A", 16, 1), L("12", 16, 1), L("Agriculture", 16, 1)];
    expect(headingAnchors(lines, body)).toEqual(["agriculture"]);
  });

  it("rejects a long line even when it is set large", () => {
    const long = "This is a pull quote set in a display face that runs on well past any plausible heading length";
    expect(headingAnchors([L(long, 15, 2)], body)).toEqual([]);
  });

  it("returns first-appearance order, de-duplicated", () => {
    const lines = [L("Agriculture", 14, 1), L("Soil", 14, 2), L("Agriculture", 14, 1)];
    expect(headingAnchors(lines, body)).toEqual(["agriculture", "soil"]);
  });

  it("returns [] when nothing outranks the body, so the gate fails CLOSED", () => {
    // groundingViolations treats an empty anchor list as a violation for every
    // row. A chapter whose headings could not be read must not pass silently.
    expect(headingAnchors([L("body text", 10, 1)], body)).toEqual([]);
  });
});

describe("figureTableAnchors", () => {
  // Caught by the pilot chapter, not by design: parseSocialCitations ACCEPTS
  // "Fig. 1.4" but headingAnchors only ever emits headings, so every figure
  // citation was guaranteed to fail the gate. Figures and tables are real
  // citable content — Geography Ch.1 has 11 figure references and Economics
  // Ch.1 has seven tables — so the anchor set has to carry them too.
  it("collects figure and table references, normalised", () => {
    const t = "as shown in Fig. 1.4 and Figure 1.9, and Table 1.2 gives";
    expect(figureTableAnchors(t, 1)).toEqual(["fig. 1.4", "fig. 1.9", "table 1.2"]);
  });

  it("filters to THIS chapter, so a cross-reference cannot ground an answer", () => {
    // The books cross-reference each other's chapters freely. An anchor list
    // admitting "Fig. 3.2" would let a Chapter 1 answer ground itself in
    // Chapter 3 — the same failure the Science lane's chapter filter prevents.
    expect(figureTableAnchors("see Fig. 1.4 and also Fig. 3.2", 1)).toEqual(["fig. 1.4"]);
  });

  it("returns [] when the chapter references no figures", () => {
    expect(figureTableAnchors("plain prose with no references", 1)).toEqual([]);
  });
});

describe("parseSocialCitations", () => {
  it("reads a heading citation", () => {
    expect(parseSocialCitations("§ Land Utilisation — the chapter's own figures")).toEqual([
      "land utilisation",
    ]);
  });

  it("reads figure and table citations, normalising the spelling", () => {
    expect(parseSocialCitations("Fig. 1.3 and Figure 1.3 and Table 1.2")).toEqual([
      "fig. 1.3",
      "table 1.2",
    ]);
  });

  it("reads several citations in one sentence, in order, de-duplicated", () => {
    const s = "§ Soil as a Resource; Fig. 1.9; and again § Soil as a Resource";
    expect(parseSocialCitations(s)).toEqual(["soil as a resource", "fig. 1.9"]);
  });

  it("does NOT guess where an unseparated citation ends — it fails closed", () => {
    // "§ Soil as a Resource with Fig. 1.9" is genuinely ambiguous: "with Fig"
    // could be part of a heading's name. Rather than guess a split, the parser
    // takes the run as one token, which resolves against nothing and so gets
    // REPORTED. The author then adds the separator. Guessing would be the
    // fail-open direction — it would manufacture a resolving citation out of
    // prose that never named a real heading.
    // The run-on even swallows the "Fig" of the figure reference, so BOTH
    // citations are lost rather than one being silently accepted. Nothing here
    // resolves, the row is reported, and the author separates them.
    const s = "§ Soil as a Resource with Fig. 1.9";
    expect(parseSocialCitations(s)).toEqual(["soil as a resource with fig"]);
    expect(parseSocialCitations(s)).not.toContain("soil as a resource");
    expect(parseSocialCitations(s)).not.toContain("fig. 1.9");
  });

  it("stops a heading citation at the em dash, not at the end of the sentence", () => {
    // Authors write "§ Heading — explanation". Swallowing the explanation would
    // make the citation unresolvable and the gate would reject a correct row.
    expect(parseSocialCitations("§ Water Resources — which states that dams are multi-purpose")).toEqual(
      ["water resources"]
    );
  });

  it("finds nothing in prose that cites nothing", () => {
    expect(parseSocialCitations("The chapter says so somewhere.")).toEqual([]);
  });
});

describe("groundingViolations with the social citation parser", () => {
  const anchors = ["land utilisation", "soil as a resource", "fig. 1.9"];

  it("passes a row whose heading citation resolves", () => {
    const rows = [{ ref: "Ex 1 Q1", groundedIn: "§ Land Utilisation — the land-use table" }];
    expect(groundingViolations(rows, anchors, parseSocialCitations)).toEqual([]);
  });

  it("catches a heading the chapter does not have", () => {
    const rows = [{ ref: "Ex 1 Q2", groundedIn: "§ Coastal Erosion — invented" }];
    const v = groundingViolations(rows, anchors, parseSocialCitations);
    expect(v).toHaveLength(1);
    expect(v[0].reason).toContain("coastal erosion");
  });

  it("fails CLOSED on an empty anchor list", () => {
    const rows = [{ ref: "Ex 1 Q1", groundedIn: "§ Land Utilisation" }];
    expect(groundingViolations(rows, [], parseSocialCitations)).toHaveLength(1);
  });

  it("catches a row with no citation at all", () => {
    const rows = [{ ref: "Ex 1 Q3", groundedIn: "the chapter says so" }];
    expect(groundingViolations(rows, anchors, parseSocialCitations)[0].reason).toContain("no citation");
  });

  it("leaves the DEFAULT parser untouched when none is passed", () => {
    // The Science lane calls this with two arguments and must behave exactly as
    // before. Science anchors are dotted numbers, which the social parser would
    // not recognise at all — so if the default had changed, this row would fail.
    const rows = [{ ref: "IT 2.1 Q1", groundedIn: "§2.1.1 Acids and Bases in the Laboratory" }];
    expect(groundingViolations(rows, ["2.1.1"])).toEqual([]);
    expect(parseCitations("§2.1.1 Acids")).toEqual(["2.1.1"]);
  });
});

describe("stitchSmallCaps — the small-caps heading defect", () => {
  // MEASURED, not hypothetical. Geography sets its section heads in SMALL CAPS:
  // 12pt capitals, 8.4pt letters, against a 10.5pt body. PyMuPDF decomposes one
  // such visual line into a dozen OVERLAPPING two-span windows, all at the same
  // y. `headingAnchors` then saw "WATER", "ATER S", "S", "SCARCITY" as four
  // separate headings, and the single common words among them ("water",
  // "river", "multi") are near-free to match. That turned the gate almost
  // vacuous on two of the seven Geography chapters: 10 of 61 authored rows
  // resolved ONLY onto such a fragment.
  const frag = (text: string, x0: number, x1: number, size = 12, bold = true) => ({
    text, x0, x1, size, bold,
  });

  it("rebuilds one heading from PyMuPDF's overlapping small-caps windows", () => {
    // The real p.0 y=485 band of "03. Water Resources.pdf", abridged.
    const raw = [
      { page: 0, y: 485.4, frags: [frag("W", 306.2, 313.9), frag("ATER", 313.9, 337.5, 8.4)] },
      { page: 0, y: 485.4, frags: [frag("ATER", 313.9, 337.5, 8.4), frag(" S", 337.5, 348.3)] },
      { page: 0, y: 485.1, frags: [frag(" S", 337.5, 348.3)] },
      { page: 0, y: 485.3, frags: [frag(" S", 337.5, 348.3), frag("CARCITY", 348.3, 393.0, 8.4)] },
      // The word space between CARCITY and AND is its own 12pt span on the page.
      { page: 0, y: 485.4, frags: [
        frag("CARCITY", 348.3, 393.0, 8.4), frag(" ", 393.0, 396.5), frag("AND", 396.5, 420.2, 8.4),
      ] },
    ];
    expect(stitchSmallCaps(raw).map((l) => l.text)).toEqual(["WATER SCARCITY AND"]);
  });

  // The three facts below are measured off "03. Water Resources.pdf" p.2, the
  // MULTI-PURPOSE RIVER PROJECTS heading. They are the reason the first version
  // of this stitcher emitted "m ultiulti purposepurpose r r r iveriver".
  it("dedupes a repeated span despite sub-point x jitter", () => {
    // PyMuPDF reports the SAME span as x0 318.126 / 317.874 / 318.000 across
    // the windows it appears in. Keyed at one decimal that is three keys, so
    // the letters were concatenated once per window.
    const raw = [
      { page: 2, y: 503.204, frags: [frag("M", 306.18, 317.208), frag("ULTI", 318.126, 340.928, 8.4)] },
      { page: 2, y: 505.875, frags: [frag("ULTI", 317.874, 340.675, 8.4)] },
      { page: 2, y: 505.624, frags: [frag("ULTI", 318.126, 340.928, 8.4)] },
      { page: 2, y: 503.206, frags: [frag("ULTI", 318.0, 340.802, 8.4), frag("-", 341.94, 346.728)] },
    ];
    expect(stitchSmallCaps(raw).map((l) => l.text)).toEqual(["MULTI-"]);
  });

  it("treats a 2.7pt y spread as ONE visual line", () => {
    // Those same windows range y 503.204 to 505.875. A 1pt tolerance split them
    // into two bands and emitted the heading twice.
    const raw = [
      { page: 2, y: 503.204, frags: [frag("M", 306.18, 317.208)] },
      { page: 2, y: 505.875, frags: [frag("ULTI", 317.874, 340.675, 8.4)] },
    ];
    expect(stitchSmallCaps(raw)).toHaveLength(1);
  });

  it("does not mistake the small-caps letter gap for a word space", () => {
    // 'M' ends at 317.208 and 'ULTI' starts at 318.126 — a 0.92pt gap inside
    // one word. A real word space at 12pt is about 3pt.
    const raw = [
      { page: 2, y: 503.2, frags: [frag("M", 306.18, 317.208), frag("ULTI", 318.126, 340.928, 8.4)] },
    ];
    expect(stitchSmallCaps(raw)[0].text).toBe("MULTI");
  });

  it("still inserts a space at a real word gap", () => {
    const raw = [
      { page: 0, y: 10, frags: [frag("Soil", 100, 130), frag("Erosion", 137, 190)] },
    ];
    expect(stitchSmallCaps(raw)[0].text).toBe("Soil Erosion");
  });

  it("dedupes spans that STRADDLE a rounding boundary", () => {
    // Real numbers from the WATER SCARCITY heading: 'AND' is reported at x0
    // 396.4803 and 396.6063. Rounded to the nearest point those are 396 and
    // 397 — two keys, so the word was emitted twice ("andand"). Any rounding
    // rule has a boundary that some span will straddle; OVERLAP has none.
    const raw = [
      { page: 0, y: 485.4, frags: [frag("AND", 396.4803, 415.2015, 8.4)] },
      { page: 0, y: 485.4, frags: [frag("AND", 396.6063, 415.3275, 8.4)] },
    ];
    expect(stitchSmallCaps(raw).map((l) => l.text)).toEqual(["AND"]);
  });

  it("keeps a word that genuinely repeats later on the same line", () => {
    // The dedupe must not collapse a real repetition. These two do not overlap.
    const raw = [
      { page: 0, y: 20, frags: [frag("Water", 100, 140), frag("and", 143, 160), frag("Water", 163, 203)] },
    ];
    expect(stitchSmallCaps(raw)[0].text).toBe("Water and Water");
  });

  it("dedupes two readings of one span that differ only by a leading space", () => {
    // Real: the MULTI-PURPOSE RIVER PROJECTS heading yields both " ROJECTS"
    // (455.52-503.89) and "ROJECTS" (456.72-503.76). They overlap by 99%, but
    // an exact text comparison called them different spans and emitted
    // "p rojectsrojects".
    const raw = [
      { page: 2, y: 504, frags: [frag(" P", 439.26, 455.34), frag(" ROJECTS", 455.52, 503.89, 8.4)] },
      { page: 2, y: 504, frags: [frag("ROJECTS", 456.72, 503.76, 8.4)] },
    ];
    expect(stitchSmallCaps(raw).map((l) => l.text)).toEqual(["PROJECTS"]);
  });

  it("keeps the largest span size, so the heading still clears the body", () => {
    const raw = [{ page: 0, y: 485.4, frags: [frag("W", 306, 314), frag("ATER", 314, 337, 8.4)] }];
    expect(stitchSmallCaps(raw)[0].size).toBe(12);
  });

  it("does NOT merge two columns that happen to share a y", () => {
    // The whole hazard of stitching by y. A left-column heading and a
    // right-column heading on the same line must stay two anchors, or the gate
    // grows a compound heading that exists nowhere on the page.
    const raw = [
      { page: 3, y: 120.0, frags: [frag("Roadways", 100, 160)] },
      { page: 3, y: 120.0, frags: [frag("Railways", 320, 380)] },
    ];
    expect(stitchSmallCaps(raw).map((l) => l.text)).toEqual(["Roadways", "Railways"]);
  });

  it("does not merge across pages, nor across different lines of one page", () => {
    const raw = [
      { page: 0, y: 100.0, frags: [frag("Water", 100, 140)] },
      { page: 1, y: 100.0, frags: [frag("Scarcity", 100, 140)] },
      { page: 0, y: 300.0, frags: [frag("Causes", 100, 140)] },
    ];
    expect(stitchSmallCaps(raw).map((l) => l.text).sort()).toEqual(["Causes", "Scarcity", "Water"]);
  });

  it("is bold only when every fragment of the stitched line is bold", () => {
    const raw = [
      { page: 0, y: 10, frags: [frag("Soil", 100, 130, 12, true), frag(" as", 130, 150, 12, false)] },
    ];
    expect(stitchSmallCaps(raw)[0].bold).toBe(false);
  });

  it("leaves an ordinary single-span line exactly as it was", () => {
    const raw = [{ page: 2, y: 55.5, frags: [frag("Multi-purpose River Projects", 90, 300)] }];
    expect(stitchSmallCaps(raw)).toEqual([
      { text: "Multi-purpose River Projects", size: 12, page: 2, bold: true },
    ]);
  });
});
