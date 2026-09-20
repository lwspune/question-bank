import type { SubtopicNote } from "@/app/notes/_types";

export const SWITCHING_CIRCUITS_NOTE: SubtopicNote = {
  subtopicName: "Switching Circuits",
  title: "Switching Circuits",
  oneLineDefinition:
    "A circuit of switches is a logical statement in disguise: switches in series are AND, switches in parallel are OR, and the lamp glowing is the statement being true.",
  whyItMatters:
    "This is the smallest subtopic in the chapter at 12 PYQs and by a wide margin the hardest — 67% of them are HARD, against 14% for Negation — " +
    "so it is where the chapter's difficulty actually lives, and it is worth knowing that before you budget your time. " +
    "The good news is that nothing here is new. Once a circuit is translated into symbols, every question is answered by the algebra you already have, " +
    "and the whole subtopic rests on two rules that take a minute to learn.",
  concepts: [
    // 1 — the translation rule + diagram 1
    {
      kind: "formula" as const,
      slug: "mlog-series-parallel-translation",
      name: "Series is And, Parallel is Or",
      intuition:
        "Current has to get from one end to the other. If the switches sit one after another, every one of them must be closed for current to pass — that is AND. " +
        "If they sit on separate branches, any one of them closed is enough — that is OR.",
      definition:
        "Let \\(p\\) be the statement 'switch \\(S_1\\) is closed', and so on. Then:\n" +
        "- Switches in **series** give \\(p \\wedge q\\) — the lamp glows only when both are closed.\n" +
        "- Switches in **parallel** give \\(p \\vee q\\) — the lamp glows when at least one is closed.\n" +
        "- A switch written \\(S_1'\\) is the **negation** \\(\\sim p\\): it is closed exactly when \\(S_1\\) is open.\n" +
        "'The lamp glows' is the statement being **true**; the circuit's truth table is the statement's truth table.",
      formula: {
        label: "The translation rule",
        latex:
          "\\text{series} \\;\\longrightarrow\\; p \\wedge q \\qquad \\text{parallel} \\;\\longrightarrow\\; p \\vee q \\qquad S_1' \\;\\longrightarrow\\; \\sim p",
        symbols: [
          { symbol: "p", meaning: "the switch \\(S_1\\) is closed" },
          { symbol: "\\(S_1'\\)", meaning: "the complementary switch — closed exactly when \\(S_1\\) is open" },
        ],
      },
      visualizationSlug: "logic-switch-series-parallel",
      authoredExample: {
        prompt:
          "A circuit has \\(S_1\\) in series with a parallel pair \\(S_2\\) and \\(S_3\\). Write its symbolic form, and say when the lamp glows.",
        steps: [
          "Name the statements: \\(p\\), \\(q\\), \\(r\\) for \\(S_1\\), \\(S_2\\), \\(S_3\\) being closed.",
          "The parallel pair is an OR: \\(q \\vee r\\).",
          "That block sits in series with \\(S_1\\), and series is an AND: \\(p \\wedge (q \\vee r)\\).",
          "So the lamp glows when \\(S_1\\) is closed AND at least one of \\(S_2\\), \\(S_3\\) is closed.",
        ],
        answer: "\\(p \\wedge (q \\vee r)\\)",
      },
      selfCheckExample: {
        prompt:
          "Write the symbolic form of a circuit whose upper branch is \\(S_1\\) alone and whose lower branch is \\(S_2\\) in series with \\(S_3\\), the two branches being in parallel.",
        steps: [
          "Work out each branch on its own first.",
          "Upper branch: just \\(p\\).",
          "Lower branch: two in series, so \\(q \\wedge r\\).",
          "The branches are in parallel, so join them with OR.",
        ],
        answer: "\\(p \\vee (q \\wedge r)\\)",
      },
      practiceSet: [
        {
          prompt: "Two switches in series — which connective?",
          answer: "AND",
          method: "Both must be closed for current to pass.",
        },
        {
          prompt: "Two switches in parallel — which connective?",
          answer: "OR",
          method: "Either branch carries the current.",
        },
        {
          prompt: "What does \\(S_2'\\) represent?",
          answer: "\\(\\sim q\\)",
          method: "The complementary switch, closed when \\(S_2\\) is open.",
        },
        {
          prompt: "Three switches all in series?",
          answer: "\\(p \\wedge q \\wedge r\\)",
          method: "Every one must be closed.",
        },
      ],
      pyqExampleId: "ca818506-f982-4cce-a97a-55865e068ae5",
      traps: [
        {
          title: "Reading a branch before finishing it",
          body:
            "A branch often contains its own series run before rejoining the parallel node. " +
            "Resolve each branch completely into a single expression FIRST, then join the branches — reading left to right across the whole picture mixes the levels up.",
        },
      ],
    },

    // 2 — reading a printed circuit
    {
      kind: "formula" as const,
      slug: "mlog-writing-the-symbolic-form",
      name: "Writing the Symbolic Form of a Printed Circuit",
      intuition:
        "Reading a circuit is a bracketing exercise. Find the points where the wire splits and rejoins: everything between a split and its rejoin is one parallel block, " +
        "and blocks strung end to end are a series run.",
      definition:
        "A reliable procedure for any printed circuit:\n" +
        "- Find every **split-and-rejoin** pair. Each becomes a bracket joined by \\(\\vee\\).\n" +
        "- Inside a branch, switches met one after another are joined by \\(\\wedge\\).\n" +
        "- Work **innermost block first**, replacing each finished block by a single symbol before moving out.\n" +
        "- Mind the primes: \\(S_1\\) and \\(S_1'\\) are the same switch, so they are \\(p\\) and \\(\\sim p\\), never two different letters.",
      authoredExample: {
        prompt:
          "A circuit has two parallel branches. The upper is \\(S_1\\) in series with \\(S_2'\\); the lower is \\(S_1'\\) in series with \\(S_2\\). Write its symbolic form and simplify in words what it says.",
        steps: [
          "Upper branch, series: \\(p \\wedge \\sim q\\). Note \\(S_2'\\) is \\(\\sim q\\), the same letter negated.",
          "Lower branch, series: \\(\\sim p \\wedge q\\).",
          "The branches are in parallel, so join with OR: \\((p \\wedge \\sim q) \\vee (\\sim p \\wedge q)\\).",
          "That expression is the negation of a biconditional, so it says exactly one of the two switches is closed.",
        ],
        answer:
          "\\((p \\wedge \\sim q) \\vee (\\sim p \\wedge q)\\) — the lamp glows when exactly one of \\(S_1\\), \\(S_2\\) is closed.",
      },
      selfCheckExample: {
        prompt:
          "A circuit has three parallel branches, each a series pair: \\(S_1\\) with \\(S_2'\\); \\(S_1'\\) with \\(S_2\\); and \\(S_1'\\) with \\(S_2'\\). Write and simplify its symbolic form.",
        steps: [
          "Branch by branch: \\(p \\wedge \\sim q\\), then \\(\\sim p \\wedge q\\), then \\(\\sim p \\wedge \\sim q\\).",
          "Three parallel branches join with OR: \\((p \\wedge \\sim q) \\vee (\\sim p \\wedge q) \\vee (\\sim p \\wedge \\sim q)\\).",
          "Factor \\(\\sim p\\) from the last two: \\(\\sim p \\wedge (q \\vee \\sim q) \\equiv \\;\\sim p \\wedge T \\equiv \\;\\sim p\\).",
          "So the expression is \\((p \\wedge \\sim q) \\vee \\sim p\\). Distribute: \\((p \\vee \\sim p) \\wedge (\\sim q \\vee \\sim p) \\equiv \\;\\sim p \\vee \\sim q\\).",
        ],
        answer:
          "\\(\\sim p \\vee \\sim q\\), which by De Morgan is \\(\\sim(p \\wedge q)\\) — the lamp glows unless both are closed.",
      },
      practiceSet: [
        {
          prompt: "Branch is \\(S_1\\) then \\(S_2\\) in series. Symbolic form?",
          answer: "\\(p \\wedge q\\)",
          method: "Series is AND.",
        },
        {
          prompt: "Two branches \\(p\\) and \\(q \\wedge r\\) in parallel?",
          answer: "\\(p \\vee (q \\wedge r)\\)",
          method: "Resolve each branch, then join with OR.",
        },
        {
          prompt: "How do you symbolise \\(S_1\\) and \\(S_1'\\) appearing in one circuit?",
          answer: "\\(p\\) and \\(\\sim p\\).",
          method: "Same switch, so the same letter negated.",
        },
        {
          prompt: "A single switch \\(S_3\\) with nothing else?",
          answer: "\\(r\\)",
          method: "One switch is one statement.",
        },
      ],
      pyqExampleId: "cb9c144d-56f4-4ad9-b5af-4618b5e56aa0",
      traps: [
        {
          title: "Giving a primed switch its own letter",
          body:
            "\\(S_1'\\) is not a third switch. It is \\(\\sim p\\), and treating it as a new letter destroys every simplification — " +
            "the whole point of these circuits is that \\(p\\) meeting \\(\\sim p\\) collapses a branch.",
        },
      ],
    },

    // 3 — simplifying + diagram 2
    {
      kind: "formula" as const,
      slug: "mlog-simplifying-a-circuit",
      name: "Simplifying a Circuit and Redrawing It",
      intuition:
        "Simplifying a circuit means using fewer switches for the same behaviour — which is an algebra problem, not a drawing problem. " +
        "Translate to symbols, simplify with the laws, then draw the circuit the simplified expression describes.",
      definition:
        "The procedure is always the same three steps:\n" +
        "- **Translate** the printed circuit into a statement pattern.\n" +
        "- **Simplify** with the algebra of statements — complement, absorption and distribution do most of the work here.\n" +
        "- **Redraw** the result, reading \\(\\wedge\\) back as series and \\(\\vee\\) back as parallel.\n" +
        "A branch simplifying to \\(T\\) is a permanently closed path (the lamp always glows); a branch simplifying to \\(F\\) is a dead branch that can be deleted.",
      visualizationSlug: "logic-circuit-simplification",
      authoredExample: {
        prompt:
          "A circuit has two parallel branches: the upper is \\(S_1\\) in series with \\(S_2\\); the lower is \\(S_1\\) in series with \\(S_3\\). Simplify it and say how many switches the simpler circuit needs.",
        steps: [
          "Translate: upper is \\(p \\wedge q\\), lower is \\(p \\wedge r\\), in parallel so \\((p \\wedge q) \\vee (p \\wedge r)\\).",
          "Both terms contain \\(p\\). Factor it out by the distributive law: \\(p \\wedge (q \\vee r)\\).",
          "Redraw: \\(S_1\\) in series with a parallel pair \\(S_2\\), \\(S_3\\).",
          "The original used four switches (\\(S_1\\) twice); the simplified circuit uses three.",
        ],
        answer:
          "\\(p \\wedge (q \\vee r)\\) — three switches instead of four.",
      },
      selfCheckExample: {
        prompt:
          "Simplify the circuit \\([q \\wedge (\\sim q \\vee r)] \\wedge [\\sim p \\vee (p \\wedge \\sim r)]\\), then join it in parallel with \\(p \\wedge r\\).",
        steps: [
          "First bracket: \\(q \\wedge (\\sim q \\vee r) \\equiv (q \\wedge \\sim q) \\vee (q \\wedge r) \\equiv F \\vee (q \\wedge r) \\equiv q \\wedge r\\).",
          "Second bracket: \\(\\sim p \\vee (p \\wedge \\sim r) \\equiv (\\sim p \\vee p) \\wedge (\\sim p \\vee \\sim r) \\equiv T \\wedge (\\sim p \\vee \\sim r) \\equiv \\;\\sim p \\vee \\sim r\\).",
          "Combine them: \\((q \\wedge r) \\wedge (\\sim p \\vee \\sim r)\\). Distributing, \\(q \\wedge r \\wedge \\sim r \\equiv F\\), so only \\(q \\wedge r \\wedge \\sim p\\) survives.",
          "Now join with \\(p \\wedge r\\) in parallel: \\((q \\wedge r \\wedge \\sim p) \\vee (p \\wedge r) \\equiv r \\wedge [(q \\wedge \\sim p) \\vee p]\\).",
          "The inner bracket distributes to \\((q \\vee p) \\wedge (\\sim p \\vee p) \\equiv (p \\vee q) \\wedge T \\equiv p \\vee q\\).",
        ],
        answer:
          "\\(r \\wedge (p \\vee q)\\) — draw it as \\(S_1\\) and \\(S_2\\) in parallel, that block in series with \\(S_3\\).",
      },
      practiceSet: [
        {
          prompt: "Simplify \\((p \\wedge q) \\vee (p \\wedge r)\\).",
          answer: "\\(p \\wedge (q \\vee r)\\)",
          method: "Factor the repeated switch out.",
        },
        {
          prompt: "What circuit does \\(p \\wedge \\sim p\\) describe?",
          answer: "One that never glows.",
          method: "It simplifies to F — a dead branch.",
        },
        {
          prompt: "What circuit does \\(p \\vee \\sim p\\) describe?",
          answer: "One that always glows.",
          method: "It simplifies to T — a permanently closed path.",
        },
        {
          prompt: "Simplify \\(p \\vee (p \\wedge q)\\).",
          answer: "\\(p\\)",
          method: "Absorption — the second branch is redundant.",
        },
      ],
      pyqExampleId: "739e2718-d2e8-4069-a7a1-7dee74f58191",
      traps: [
        {
          title: "Trying to simplify by staring at the picture",
          body:
            "Redrawing a circuit by eye, without writing the expression down, is where these questions are lost. " +
            "The simplification is algebraic; the drawing is only the last step, and it follows mechanically from the simplified expression.",
        },
        {
          title: "Deleting a repeated switch instead of factoring it",
          body:
            "In \\((p \\wedge q) \\vee (p \\wedge r)\\), \\(S_1\\) genuinely appears on both branches and both copies matter. " +
            "Factoring gives \\(p \\wedge (q \\vee r)\\), which is a different arrangement — not the result of rubbing one copy out.",
        },
      ],
    },

    // 4 — equivalence between circuits
    {
      kind: "formula" as const,
      slug: "mlog-equivalent-circuits",
      name: "Deciding Whether Two Circuits Are Equivalent",
      intuition:
        "Two circuits are equivalent when they are closed in exactly the same cases — which is just logical equivalence wearing a different costume. " +
        "Translate both, simplify both, and compare; if the simplified expressions match, the circuits match.",
      definition:
        "To test a pair of circuits:\n" +
        "- Translate each into a statement pattern.\n" +
        "- Simplify both as far as they go.\n" +
        "- They are **equivalent** exactly when the simplified patterns are logically equivalent.\n" +
        "To show two circuits are **not** equivalent, give one assignment of open and closed switches where one lamp glows and the other does not — a single case is enough. " +
        "The recurring exam pair is \\((p \\wedge q) \\vee (p \\wedge r)\\) with \\(p \\wedge (q \\vee r)\\).",
      authoredExample: {
        prompt:
          "Five circuits are printed: (i) \\((p \\wedge q) \\vee (p \\wedge r)\\), (ii) \\(p \\vee (q \\wedge r)\\), (iii) \\(p \\wedge (q \\vee r)\\), (iv) \\(p \\wedge q \\wedge r\\), (v) \\((p \\wedge q) \\vee r\\). Which pair is equivalent?",
        steps: [
          "Simplify (i) by factoring \\(p\\): \\((p \\wedge q) \\vee (p \\wedge r) \\equiv p \\wedge (q \\vee r)\\).",
          "That is exactly (iii), so (i) and (iii) are equivalent.",
          "Check the others are not. Take \\(p = F,\\; q = T,\\; r = T\\): (ii) gives \\(F \\vee T = T\\) while (iii) gives \\(F \\wedge T = F\\), so (ii) differs.",
          "Take \\(p = T,\\; q = T,\\; r = F\\): (iv) gives \\(F\\) while (iii) gives \\(T\\); and (v) gives \\(T \\vee F = T\\) but at \\(p = F,\\; r = T\\), (v) is \\(T\\) while (iii) is \\(F\\).",
        ],
        answer: "(i) and (iii) — by the distributive law.",
      },
      selfCheckExample: {
        prompt:
          "Are \\(p \\vee (q \\wedge r)\\) and \\((p \\wedge q) \\vee r\\) equivalent? Justify with a single case.",
        steps: [
          "To disprove equivalence, one assignment is enough — no table needed.",
          "Try \\(p = F,\\; q = F,\\; r = T\\).",
          "First circuit: \\(F \\vee (F \\wedge T) = F \\vee F = F\\) — the lamp is off.",
          "Second circuit: \\((F \\wedge F) \\vee T = F \\vee T = T\\) — the lamp is on.",
        ],
        answer:
          "Not equivalent: with only \\(S_3\\) closed, the second circuit glows and the first does not.",
      },
      practiceSet: [
        {
          prompt: "Is \\((p \\wedge q) \\vee (p \\wedge r) \\equiv p \\wedge (q \\vee r)\\)?",
          answer: "Yes.",
          method: "Distributive law.",
        },
        {
          prompt: "Is \\(p \\vee (q \\wedge r) \\equiv p \\wedge (q \\vee r)\\)?",
          answer: "No.",
          method: "Take \\(p = T,\\; q = F,\\; r = F\\): the first is T, the second F.",
        },
        {
          prompt: "How many cases disprove equivalence?",
          answer: "One.",
          method: "A single differing assignment is a counterexample.",
        },
        {
          prompt: "Is \\(p \\wedge (p \\vee q) \\equiv p\\)?",
          answer: "Yes.",
          method: "Absorption.",
        },
      ],
      pyqExampleId: "b436d804-a560-40d2-adde-2b2beb938a2d",
      traps: [
        {
          title: "Matching circuits by how they look",
          body:
            "Two circuits drawn with the same number of switches in a similar arrangement can behave differently, " +
            "and two that look nothing alike can be equivalent. The pictures are not the evidence — the simplified expressions are.",
        },
      ],
    },
  ],
  related: [
    { label: "Previous: Logical equivalence and algebra of statements", href: "/notes/mht-cet-maths/mathematical-logic/logical-equivalence-algebra" },
    { label: "Mathematical Logic playbook", href: "/guide/mht-cet-maths/playbooks/mathematical-logic" },
  ],
};
