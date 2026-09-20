import { describe, it, expect } from "vitest";
import {
  TRACKED_NOTATION,
  boldDefinitionTerms,
  conceptBody,
  declaredTerms,
  findArcBreaks,
  isActionName,
  type ArcConcept,
} from "@/lib/notes/arcOrder";

// Pure core behind `npm run notes:arc` — the teaching-ARC probe.
//
// The defect class it exists for was found by hand on MHT-CET Mathematical
// Logic (2026-09-20): the chapter asserted "six movements, each resting on the
// one before" while using `\equiv` 40 times, "tautology" 3 times and
// "contingency" once BEFORE the concepts that define them. Every existing gate
// was green — notes:lint, notes:latex, typecheck, build — because none of them
// reads the chapter in ORDER. This does.
//
// Two classes, each with its own false-positive guard (mirroring the
// scripts/lib/textProbes.ts convention):
//   NOTATION_BEFORE_GLOSS — a tracked math symbol is USED before any concept
//     glosses it (symbols legend) or names it in prose.
//   TERM_BEFORE_CONCEPT   — a distinctive word from a LATER concept's name
//     appears in an EARLIER concept's body.

function concept(
  subtopicSlug: string,
  conceptSlug: string,
  conceptName: string,
  body: string,
  glosses: string[] = [],
  boldTerms: string[] = []
): ArcConcept {
  return {
    subtopicSlug,
    subtopicTitle: subtopicSlug,
    conceptSlug,
    conceptName,
    body,
    glosses,
    boldTerms,
  };
}

describe("declaredTerms", () => {
  it("keeps distinctive long tokens from a concept name", () => {
    expect(declaredTerms("Tautology, Contradiction and Contingency", "Mathematical Logic")).toEqual([
      "tautology",
      "contradiction",
      "contingency",
    ]);
  });

  it("drops stopwords and short tokens — 'and', 'the', 'of', 'a' are not concepts", () => {
    expect(declaredTerms("The Dual of a Statement Pattern", "Mathematical Logic")).toEqual([
      "statement",
      "pattern",
    ]);
  });

  it("drops tokens that repeat the CHAPTER name — those are ambient, not introduced", () => {
    // "logic" is the chapter's own subject matter; every concept may say it.
    expect(declaredTerms("Logic Gates and Switching", "Mathematical Logic")).toEqual([
      "gates",
      "switching",
    ]);
  });

  it("is case- and punctuation-insensitive", () => {
    expect(declaredTerms("De MORGAN's Theorem!", "Anything")).toEqual(["morgan", "theorem"]);
  });

  it("drops generic editorial nouns that recur across concept names", () => {
    // "laws", "rules", "forms", "values" head half the concept names in the
    // corpus. Flagging them would bury the real findings, so they are
    // stopwords by deliberate choice — a false NEGATIVE is the cheap error.
    expect(declaredTerms("De Morgan Laws for And and Or", "Anything")).toEqual(["morgan"]);
    // "values" and "rules" are stopwords; "component" and "truth" survive.
    expect(declaredTerms("Truth Values of Component Statements", "Anything")).toEqual([
      "truth",
      "component",
      "statements",
    ]);
    // ...and the action-name guard beats everything: a gerund head declares
    // nothing at all, however many distinctive nouns follow it.
    expect(declaredTerms("Finding Truth Values of Component Statements", "Anything")).toEqual([]);
  });
});

describe("conceptBody", () => {
  it("concatenates every prose slot so a term is found wherever it is rendered", () => {
    const body = conceptBody({
      intuition: "alpha",
      definition: "beta",
      authoredExample: { prompt: "gamma", steps: ["delta"], answer: "epsilon" },
      selfCheckExample: { prompt: "zeta", steps: ["eta"], answer: "theta" },
      practiceSet: [{ prompt: "iota", answer: "kappa", method: "lambda" }],
      traps: [{ title: "mu", body: "nu" }],
    });
    for (const t of [
      "alpha",
      "beta",
      "gamma",
      "delta",
      "epsilon",
      "zeta",
      "eta",
      "theta",
      "iota",
      "kappa",
      "lambda",
      "mu",
      "nu",
    ]) {
      expect(body).toContain(t);
    }
  });

  it("includes reference-variant table cells, captions and row notes", () => {
    const body = conceptBody({
      intuition: "i",
      definition: "d",
      table: {
        columns: ["Form", "Symbolic"],
        rows: [{ cells: ["Contrapositive", "x"], noteAmber: "amberfact" }],
        caption: "capfact",
      },
    });
    expect(body).toContain("Contrapositive");
    expect(body).toContain("amberfact");
    expect(body).toContain("capfact");
  });
});

describe("findArcBreaks — NOTATION_BEFORE_GLOSS", () => {
  it("flags a symbol used before any concept glosses it", () => {
    const concepts = [
      concept("s1", "c1", "Opening", "We may write \\(p \\equiv q\\) freely."),
      concept("s2", "c2", "What Equivalence Means", "Two patterns are logically equivalent when..."),
    ];
    const found = findArcBreaks(concepts, "Chapter");
    const notation = found.filter((f) => f.kind === "NOTATION_BEFORE_GLOSS");
    expect(notation).toHaveLength(1);
    expect(notation[0].token).toBe("\\equiv");
    expect(notation[0].at.conceptSlug).toBe("c1");
    expect(notation[0].introducedAt.conceptSlug).toBe("c2");
  });

  it("does NOT flag a symbol glossed in the same concept that uses it", () => {
    const concepts = [
      concept(
        "s1",
        "c1",
        "Opening",
        "We may write \\(p \\equiv q\\).",
        ["\\(\\equiv\\)"] // symbols legend entry in this very concept
      ),
    ];
    expect(findArcBreaks(concepts, "Chapter")).toEqual([]);
  });

  it("does NOT flag a symbol glossed by an EARLIER concept — that is correct order", () => {
    const concepts = [
      concept("s1", "c1", "Equivalence", "A is logically equivalent to B."),
      concept("s2", "c2", "Later", "So \\(p \\equiv q\\)."),
    ];
    expect(findArcBreaks(concepts, "Chapter").filter((f) => f.kind === "NOTATION_BEFORE_GLOSS")).toEqual(
      []
    );
  });

  it("reports the symbol ONCE, at its earliest use, not once per later use", () => {
    const concepts = [
      concept("s1", "c1", "A", "\\(p \\equiv q\\)"),
      concept("s1", "c2", "B", "\\(r \\equiv s\\)"),
      concept("s2", "c3", "Equivalence Defined", "logically equivalent means..."),
    ];
    const notation = findArcBreaks(concepts, "Chapter").filter(
      (f) => f.kind === "NOTATION_BEFORE_GLOSS"
    );
    expect(notation).toHaveLength(1);
    expect(notation[0].at.conceptSlug).toBe("c1");
  });

  it("stays silent when a tracked symbol is never used at all", () => {
    const concepts = [concept("s1", "c1", "A", "no math here")];
    expect(findArcBreaks(concepts, "Chapter")).toEqual([]);
  });

  it("stays silent when a symbol is used but NEVER glossed — that is a different defect", () => {
    // Nothing introduces it, so there is no "before" to measure against. A
    // missing gloss is a coverage question for notes-lint, not an ORDER break;
    // reporting it here would be an unfalsifiable finding.
    const concepts = [concept("s1", "c1", "A", "\\(p \\equiv q\\)")];
    expect(findArcBreaks(concepts, "Chapter")).toEqual([]);
  });
});

describe("findArcBreaks — TERM_BEFORE_CONCEPT", () => {
  it("flags a later concept's distinctive term used in an earlier concept's body", () => {
    const concepts = [
      concept("s1", "c1", "Building the Table", "The last column is a contingency."),
      concept("s2", "c2", "Tautology, Contradiction and Contingency", "A contingency is mixed."),
    ];
    const terms = findArcBreaks(concepts, "Chapter").filter((f) => f.kind === "TERM_BEFORE_CONCEPT");
    expect(terms).toHaveLength(1);
    expect(terms[0].token).toBe("contingency");
    expect(terms[0].at.conceptSlug).toBe("c1");
    expect(terms[0].introducedAt.conceptSlug).toBe("c2");
  });

  it("carries an excerpt so the finding can be judged without opening the file", () => {
    const concepts = [
      concept("s1", "c1", "Building the Table", "The last column is a contingency, mixed T and F."),
      concept("s2", "c2", "Contingency Explained", "..."),
    ];
    const [finding] = findArcBreaks(concepts, "Chapter").filter(
      (f) => f.kind === "TERM_BEFORE_CONCEPT"
    );
    expect(finding.excerpt).toContain("contingency");
  });

  it("does NOT flag a term an EARLIER concept already declared — earliest declaration wins", () => {
    // "Negation" is declared by c1; c3 also uses the word in its name. A use in
    // c2 is legitimate, because c1 already introduced it.
    const concepts = [
      concept("s1", "c1", "Negation Basics", "..."),
      concept("s1", "c2", "Middle", "apply the negation rule"),
      concept("s2", "c3", "Negation of a Conditional", "..."),
    ];
    expect(findArcBreaks(concepts, "Chapter").filter((f) => f.kind === "TERM_BEFORE_CONCEPT")).toEqual(
      []
    );
  });

  it("does NOT flag a term that is part of the chapter's own name", () => {
    const concepts = [
      concept("s1", "c1", "Opening", "a statement pattern in logic"),
      concept("s2", "c2", "Logic Patterns", "..."),
    ];
    expect(findArcBreaks(concepts, "Mathematical Logic Patterns").filter(
      (f) => f.kind === "TERM_BEFORE_CONCEPT"
    )).toEqual([]);
  });

  it("matches whole words only — 'contingent' does not trip 'contingency'", () => {
    const concepts = [
      concept("s1", "c1", "Opening", "a contingent claim"),
      concept("s2", "c2", "Contingency", "..."),
    ];
    expect(findArcBreaks(concepts, "Chapter").filter((f) => f.kind === "TERM_BEFORE_CONCEPT")).toEqual(
      []
    );
  });

  it("reports each term once, at its earliest offending concept", () => {
    const concepts = [
      concept("s1", "c1", "A", "tautology here"),
      concept("s1", "c2", "B", "tautology again"),
      concept("s2", "c3", "Tautology Defined", "..."),
    ];
    const terms = findArcBreaks(concepts, "Chapter").filter((f) => f.kind === "TERM_BEFORE_CONCEPT");
    expect(terms).toHaveLength(1);
    expect(terms[0].at.conceptSlug).toBe("c1");
  });
});

// The two guards below were added AFTER the first real corpus run, which
// returned 31 findings on one chapter — mostly noise. They are what took it to
// 12. Locked here so a later "simplification" cannot quietly restore the noise.

describe("findArcBreaks — precision guards found on the real corpus", () => {
  it("an ACTION-named concept declares nothing, so ordinary English is not retro-flagged", () => {
    // "Deciding Whether Two Circuits Are Equivalent" teaches a move, not a
    // word. Without this guard it declared "deciding" and "whether", and
    // flagged every earlier block that used them.
    expect(isActionName("Deciding Whether Two Circuits Are Equivalent")).toBe(true);
    expect(isActionName("Building the Full Truth Table")).toBe(true);
    expect(isActionName("The Dual of a Statement Pattern")).toBe(false);
    expect(isActionName("Tautology, Contradiction and Contingency")).toBe(false);

    const concepts = [
      concept("s1", "c1", "Statements and Truth Values", "a request makes no claim, whether or not"),
      concept("s2", "c2", "Deciding Whether Two Circuits Are Equivalent", "..."),
    ];
    expect(findArcBreaks(concepts, "Chapter")).toEqual([]);
  });

  it("a term used throughout the chapter is ambient vocabulary, not an introduction", () => {
    // "equivalent" appeared in a third of the corpus chapter's concepts. A word
    // that common is not something one block introduces.
    const bodies = Array.from({ length: 9 }, (_, i) =>
      concept("s1", `c${i}`, `Filler ${i}`, "these patterns are equivalent")
    );
    const concepts = [...bodies, concept("s2", "last", "Equivalent Circuits", "...")];
    expect(findArcBreaks(concepts, "Chapter").filter((f) => f.kind === "TERM_BEFORE_CONCEPT")).toEqual(
      []
    );
  });
});

describe("boldDefinitionTerms", () => {
  it("treats a **bold** key term in a definition as a declaration", () => {
    // "The Three Relatives of a Conditional" introduces Converse, Inverse and
    // Contrapositive without any of them appearing in its NAME.
    expect(
      boldDefinitionTerms(
        "- **Converse** \\(q \\to p\\)\n- **Inverse** negate only.\n- **Contrapositive** swap and negate.",
        "Mathematical Logic"
      )
    ).toEqual(["converse", "inverse", "contrapositive"]);
  });

  it("returns nothing when the definition bolds no terms", () => {
    expect(boldDefinitionTerms("plain prose with no bold", "Chapter")).toEqual([]);
  });

  it("applies the same term filters as a concept name — stopwords and short tokens go", () => {
    expect(boldDefinitionTerms("**the** **and** **of** **Contingency**", "Chapter")).toEqual([
      "contingency",
    ]);
  });
});

describe("TRACKED_NOTATION", () => {
  it("gives every symbol at least one English name, so a gloss can be detected in prose", () => {
    for (const n of TRACKED_NOTATION) {
      expect(n.names.length).toBeGreaterThan(0);
      expect(n.latex.length).toBeGreaterThan(0);
    }
  });
});
