import type { SubtopicNote } from "@/app/notes/_types";

export const RELATIONS_NOTE: SubtopicNote = {
  subtopicName: "Relations — Properties, Cartesian Product, and Counting",
  title: "Relations and the Cartesian Product",
  oneLineDefinition:
    "A relation from A to B is any subset of the Cartesian product A × B; the NDA mostly asks whether a given relation is reflexive, symmetric, transitive, or an equivalence relation.",
  whyItMatters:
    "19 PYQs, and one skill dominates: given a relation defined by a rule (an equation, an inequality, a function), decide which of reflexive / symmetric / transitive it satisfies. " +
    "The reliable method is to factor or simplify the rule first, then test each property with a witness or a counterexample. The rest is Cartesian-product counting (domain, range, number of pairs).",
  concepts: [
    // 1 — cartesian product and relations (grid diagram)
    {
      kind: "formula" as const,
      slug: "cartesian-product-and-relations",
      name: "Cartesian product, domain and range",
      intuition:
        "The Cartesian product \\(A\\times B\\) is the set of all ordered pairs \\((a,b)\\) with \\(a\\in A, b\\in B\\) — picture a grid of points. A relation is just a chosen subset of that grid; its domain is the first-coordinates used, its range the second-coordinates.",
      definition:
        "The product and the counts:\n" +
        "- \\(A\\times B = \\{(a,b): a\\in A, b\\in B\\}\\); \\(|A\\times B| = |A|\\cdot|B|\\). So \\(|A\\times A| = 16 \\Rightarrow |A| = 4\\).\n" +
        "- A **relation** from A to B is any subset of \\(A\\times B\\); the number of relations is \\(2^{|A||B|}\\).\n" +
        "- **Domain** = set of first coordinates that occur; **range** = set of second coordinates; **codomain** = B (range may be smaller).\n" +
        "- Useful identity: \\((A\\times B)\\cap(B\\times A) = (A\\cap B)\\times(A\\cap B)\\).",
      formula: {
        label: "Cartesian product and relation counts",
        latex: "|A \\times B| = |A|\\,|B| \\qquad \\text{number of relations} = 2^{|A||B|} \\qquad (A \\times B) \\cap (B \\times A) = (A \\cap B) \\times (A \\cap B)",
      },
      visualizationSlug: "sets-cartesian-grid",
      authoredExample: {
        prompt:
          "Sets A and B have exactly 10 elements in common. How many ordered pairs are in both \\(A\\times B\\) and \\(B\\times A\\)?",
        steps: [
          "A pair \\((x,y)\\) is in \\(A\\times B\\) and \\(B\\times A\\) iff \\(x,y\\) are each in both A and B.",
          "So \\((A\\times B)\\cap(B\\times A) = (A\\cap B)\\times(A\\cap B)\\).",
          "\\(|A\\cap B| = 10 \\Rightarrow |(A\\cap B)\\times(A\\cap B)| = 10^2 = 100\\).",
        ],
        answer: "100.",
      },
      selfCheckExample: {
        prompt:
          "Let \\(A=\\{1,2,\\dots,20\\}\\) and \\(R=\\{(x,y): 4x-3y=1,\\ x,y\\in A\\}\\). Find the range of R.",
        steps: [
          "Solve \\(4x - 3y = 1\\): \\(y = (4x-1)/3\\), which is an integer when \\(x\\equiv 1 \\pmod 3\\).",
          "\\(x = 1,4,7,10,13,16,19\\) give \\(y = 1,5,9,13,17,21,25\\).",
          "Keep only \\(y\\in A\\) (i.e. \\(y\\le 20\\)): \\(y = 1,5,9,13,17\\).",
        ],
        answer: "Range \\(= \\{1,5,9,13,17\\}\\).",
      },
      practiceSet: [
        { prompt: "If \\(|A\\times A| = 49\\), find \\(|A|\\).", answer: "7" },
        { prompt: "How many relations are there from a 3-set to a 2-set?", answer: "\\(2^{6} = 64\\)", method: "\\(2^{|A||B|}\\)" },
        { prompt: "\\((A\\times B)\\cap(B\\times A) = ?\\)", answer: "\\((A\\cap B)\\times(A\\cap B)\\)" },
      ],
      pyqExampleId: "cf148543-b859-43ff-af62-a47547ad26cc", // (A×B)∩(B×A) = 100
      traps: [
        {
          title: "Range can be smaller than the codomain",
          body:
            "When a relation is defined by a rule, only some target values are actually hit. The codomain might be all of \\(\\{1,\\dots,20\\}\\) while the range is just \\(\\{1,5,9,13,17\\}\\). 'Range = codomain' is usually FALSE.",
        },
      ],
    },

    // 2 — relation properties (REFERENCE + digraph diagram)
    {
      kind: "reference" as const,
      slug: "relation-properties",
      name: "Reflexive, symmetric, transitive, equivalence",
      intuition:
        "Three properties classify a relation. Reflexive: every element relates to itself. Symmetric: if a relates to b then b relates to a. Transitive: if a→b and b→c then a→c. A relation with all three is an equivalence relation. Picture the relation as arrows on a set of dots.",
      definition:
        "The properties (R on a set A):\n" +
        "- **Reflexive**: \\((a,a)\\in R\\) for **every** \\(a\\in A\\). Missing even one self-pair breaks it.\n" +
        "- **Symmetric**: \\((a,b)\\in R \\Rightarrow (b,a)\\in R\\).\n" +
        "- **Transitive**: \\((a,b),(b,c)\\in R \\Rightarrow (a,c)\\in R\\).\n" +
        "- **Equivalence**: reflexive AND symmetric AND transitive.\n" +
        "- **Antisymmetric**: \\((a,b),(b,a)\\in R \\Rightarrow a=b\\) (e.g. \\(\\le\\)).",
      visualizationSlug: "sets-relation-digraph",
      table: {
        columns: ["Property", "Test", "Fails when"],
        rows: [
          {
            cells: ["Reflexive", "Is \\((a,a)\\in R\\) for every a?", "One element lacks its self-loop (e.g. \\((4,4)\\notin R\\))"],
          },
          { cells: ["Symmetric", "Does \\((a,b)\\in R\\) force \\((b,a)\\in R\\)?", "Some arrow has no reverse"] },
          { cells: ["Transitive", "Do \\((a,b),(b,c)\\) force \\((a,c)\\)?", "A 2-step path with no direct shortcut"] },
          {
            cells: ["Equivalence", "All three hold", "Any one of R / S / T fails"],
            noteAmber: "A strict inequality \\(<\\) is transitive ONLY — not reflexive, not symmetric.",
          },
        ],
        caption: "Test each property separately; one counterexample kills it.",
      },
      selfCheckExample: {
        prompt:
          "On \\(X=\\{1,2,3\\}\\), \\(R=\\{(1,2),(2,3),(1,3)\\}\\). Which of reflexive / symmetric / transitive hold?",
        steps: [
          "Reflexive: no self-pairs \\((1,1),(2,2),(3,3)\\) at all — NOT reflexive.",
          "Symmetric: \\((1,2)\\in R\\) but \\((2,1)\\notin R\\) — NOT symmetric.",
          "Transitive: the only two-step chain is \\((1,2),(2,3)\\), and its shortcut \\((1,3)\\) IS present — transitive.",
        ],
        answer: "Transitive only (not reflexive, not symmetric).",
      },
      practiceSet: [
        { prompt: "Is \\(<\\) on \\(\\mathbb{N}\\) reflexive?", answer: "No", method: "\\(x<x\\) is never true" },
        { prompt: "Is \\(<\\) transitive?", answer: "Yes" },
        { prompt: "An equivalence relation must be which three?", answer: "Reflexive, symmetric, transitive" },
        { prompt: "If \\((1,2)\\in R\\) but \\((2,1)\\notin R\\), which property fails?", answer: "Symmetric" },
      ],
      pyqExampleId: "4596b605-cdb6-4386-9f98-c56ff58b9be7", // listed-pairs R/S/T
      traps: [
        {
          title: "Reflexive means EVERY element, not just some",
          body:
            "A relation listing \\((1,1),(2,2),(3,3)\\) on the set \\(\\{1,2,3,4\\}\\) is NOT reflexive — \\((4,4)\\) is missing. Reflexivity is an 'all elements' condition; one missing self-pair breaks it.",
        },
      ],
    },

    // 3 — testing relations defined by a rule (formula) — signature genre
    {
      kind: "formula" as const,
      slug: "testing-relations-by-rule",
      name: "Testing a relation defined by a rule",
      intuition:
        "When a relation is given by an equation or inequality, don't test it blindly — simplify the rule first. Factor the equation, or read off what the inequality really means, so the relation becomes a clear condition like 'x = y or x = 4y'. Then check each property with a concrete witness or counterexample.",
      definition:
        "The method:\n" +
        "1. **Simplify the rule.** Factor: \\(x^2 - 5xy + 4y^2 = (x-y)(x-4y) = 0\\) means \\(x=y\\) or \\(x=4y\\). For inequalities, translate: \\(\\log_a x > \\log_a y\\) with \\(a<1\\) means \\(x<y\\).\n" +
        "2. **Reflexive?** Put \\(y=x\\) and check the rule holds for all x.\n" +
        "3. **Symmetric?** Find one \\((a,b)\\in R\\) with \\((b,a)\\notin R\\) to disprove.\n" +
        "4. **Transitive?** Chain two related pairs and test the shortcut.\n" +
        "A handy special case: \\(|x+y|<2\\) on \\((-1,1)\\) holds for ALL pairs (since \\(|x+y|\\le|x|+|y|<2\\)), so the relation is everything — automatically an equivalence relation.",
      authoredExample: {
        prompt:
          "On \\(\\mathbb{N}\\), \\(xRy\\) iff \\(x^2 - 4xy + 3y^2 = 0\\). Is R reflexive? Symmetric?",
        steps: [
          "Factor: \\(x^2 - 4xy + 3y^2 = (x-y)(x-3y) = 0\\), so \\(xRy\\) iff \\(x=y\\) or \\(x=3y\\).",
          "Reflexive: \\(x=x\\) always satisfies \\(x=y\\), so yes for every x.",
          "Symmetric: \\(3R1\\) holds (\\(3=3\\cdot1\\)); check \\(1R3\\): need \\(1=3\\) or \\(1=9\\) — false. Not symmetric.",
        ],
        answer: "Reflexive yes; symmetric no.",
      },
      selfCheckExample: {
        prompt:
          "On \\(\\mathbb{N}\\), \\(xRy\\) iff \\(x = y^3\\). Is R symmetric or transitive?",
        steps: [
          "Symmetric: \\((8,2)\\in R\\) since \\(8=2^3\\); need \\((2,8)\\): \\(2 = 8^3?\\) No. Not symmetric.",
          "Transitive: \\(x=y^3\\) and \\(y=z^3\\) give \\(x = (z^3)^3 = z^9\\); need \\(x=z^3\\), which fails in general. Not transitive.",
          "So R has neither property.",
        ],
        answer: "Neither symmetric nor transitive.",
      },
      practiceSet: [
        { prompt: "Factor \\(x^2 - 5xy + 4y^2\\).", answer: "\\((x-y)(x-4y)\\)" },
        { prompt: "\\(\\log_a x > \\log_a y\\) with \\(0<a<1\\) means?", answer: "\\(x < y\\)", method: "log with base < 1 is decreasing" },
        { prompt: "Is the strict relation \\(x<y\\) reflexive?", answer: "No" },
        { prompt: "To disprove symmetry you need?", answer: "One pair \\((a,b)\\in R\\) with \\((b,a)\\notin R\\)" },
      ],
      pyqExampleId: "3fd9aa88-763f-4835-a146-4cb28272308d", // x²−5xy+4y²=0 factor + test
      traps: [
        {
          title: "Factor before you test",
          body:
            "A relation like \\(x^2 - 5xy + 4y^2 = 0\\) looks intimidating until you factor it to \\((x-y)(x-4y)=0\\), i.e. \\(x=y\\) or \\(x=4y\\). Skipping the factoring step is where the time and the errors go.",
        },
      ],
    },

    // 4 — operations on relations + special relations
    {
      kind: "formula" as const,
      slug: "operations-and-special-relations",
      name: "Inverse relations and combining relations",
      intuition:
        "Two more recurring facts: the inverse relation \\(R^{-1}\\) (all pairs reversed) keeps whatever properties R had, and combining relations with intersection or union preserves certain properties. Plus: every function is a relation, but not every relation is a function.",
      definition:
        "The preservation rules:\n" +
        "- \\(R^{-1} = \\{(b,a):(a,b)\\in R\\}\\) is **reflexive / symmetric / transitive whenever R is** — all three properties survive inversion.\n" +
        "- If P and Q are both reflexive, \\(P\\cap Q\\) is reflexive; if both symmetric, \\(P\\cup Q\\) is symmetric; if both transitive, \\(P\\cap Q\\) is transitive.\n" +
        "- **Function vs relation**: every function is a relation (a special subset of \\(A\\times B\\) with exactly one output per input), but most relations are not functions.\n" +
        "- An **equivalence relation** partitions the set (e.g. 'lives in the same city as' on people).",
      authoredExample: {
        prompt:
          "If a relation R on a set A is transitive, must its inverse \\(R^{-1}\\) also be transitive?",
        steps: [
          "Suppose \\((a,b)\\) and \\((b,c)\\) are in \\(R^{-1}\\).",
          "By definition of inverse, \\((b,a)\\) and \\((c,b)\\) are in R.",
          "R is transitive and \\((c,b),(b,a)\\in R\\) give \\((c,a)\\in R\\), so \\((a,c)\\in R^{-1}\\).",
          "That is exactly transitivity of \\(R^{-1}\\).",
        ],
        answer: "Yes — transitivity (like reflexivity and symmetry) is preserved under inversion.",
      },
      selfCheckExample: {
        prompt:
          "P and Q are both reflexive relations on A. Is \\(P\\cap Q\\) reflexive?",
        steps: [
          "Reflexive means \\((a,a)\\) is in the relation for every a.",
          "If \\((a,a)\\in P\\) and \\((a,a)\\in Q\\), then \\((a,a)\\in P\\cap Q\\).",
          "This holds for every a, so \\(P\\cap Q\\) is reflexive.",
        ],
        answer: "Yes, \\(P\\cap Q\\) is reflexive.",
      },
      practiceSet: [
        { prompt: "If R is symmetric, is \\(R^{-1}\\) symmetric?", answer: "Yes" },
        { prompt: "Is every relation a function?", answer: "No", method: "a function needs exactly one output per input" },
        { prompt: "'Same age as' on a set of people is what kind of relation?", answer: "Equivalence relation" },
      ],
      pyqExampleId: "8f40915b-47a1-4380-b5c7-48efce8973c5", // R⁻¹ preserves R/S/T
      traps: [
        {
          title: "Every function is a relation, not the reverse",
          body:
            "All functions are relations, but a relation that sends one input to two outputs (or misses an input) is not a function. The statement 'all relations are functions' is FALSE; 'all functions are relations' is true.",
        },
      ],
    },
  ],
};
