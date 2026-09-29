import type { SubtopicNote } from "@/app/notes/_types";

export const RELATION_TYPES_FN_NOTE: SubtopicNote = {
  subtopicName: "Reflexive, Symmetric, Transitive and Equivalence",
  title: "Reflexive, Symmetric, Transitive and Equivalence Relations",
  oneLineDefinition:
    "Deciding whether a relation is reflexive, symmetric or transitive, proving each property in general or breaking it with one counterexample, and recognising equivalence relations and their classes.",
  whyItMatters:
    "Twenty-five PYQs, and most ask the same thing: which of the three properties hold. Proving a property needs a general argument; breaking one needs a single counterexample, and choosing a good one is the skill. Two ideas cover the page.",
  concepts: [
    // C1 — testing the three properties
    {
      kind: "formula" as const,
      slug: "jfn-rst-test",
      name: "Testing reflexive, symmetric and transitive",
      intuition:
        "Reflexive: every element relates to itself. Symmetric: whenever \\(aRb\\), also \\(bRa\\). Transitive: whenever \\(aRb\\) and \\(bRc\\), also \\(aRc\\). To show a property holds, argue for all elements; to show it fails, one counterexample is enough. Good counterexamples use 0, a repeated element, or a short chain of three numbers that crosses a boundary.",
      definition:
        "- **Reflexive:** \\(aRa\\) for every \\(a\\).\n" +
        "- **Symmetric:** \\(aRb\\Rightarrow bRa\\).\n" +
        "- **Transitive:** \\(aRb\\) and \\(bRc\\Rightarrow aRc\\).\n" +
        "- A property with no pair to test holds by default: the empty relation is symmetric and transitive.",
      formula: {
        label: "Transitivity",
        latex: "aRb\\ \\text{and}\\ bRc\\ \\Rightarrow\\ aRc",
      },
      authoredExample: {
        prompt: "On \\(\\mathbb R\\), \\(aRb\\) if \\(|a-b|\\le2\\). Which properties hold?",
        steps: [
          "Reflexive: \\(|a-a|=0\\). Symmetric: \\(|a-b|=|b-a|\\).",
          "Not transitive: \\(0R2\\) and \\(2R4\\), but \\(|0-4|=4\\).",
        ],
        answer: "Reflexive and symmetric, not transitive.",
      },
      selfCheckExample: {
        prompt: "On \\(\\mathbb N\\), \\(aRb\\) if \\(a\\) divides \\(b\\). Which properties hold?",
        steps: [
          "Reflexive: \\(a\\mid a\\). Transitive: \\(a\\mid b\\), \\(b\\mid c\\Rightarrow a\\mid c\\).",
          "Not symmetric: \\(1\\mid2\\) but \\(2\\nmid1\\).",
        ],
        answer: "Reflexive and transitive, not symmetric.",
      },
      practiceSet: [
        { prompt: "\\(a<b\\) on \\(\\mathbb R\\): reflexive?", answer: "No" },
        { prompt: "\\(R=\\{(1,2),(2,1)\\}\\) on \\(\\{1,2\\}\\): transitive?", answer: "No: \\((1,1)\\) is missing" },
        { prompt: "\\(ab>0\\) on \\(\\mathbb R-\\{0\\}\\): an equivalence?", answer: "Yes: same sign" },
        { prompt: "The empty relation on a non-empty set?", answer: "Symmetric and transitive, not reflexive" },
      ],
      pyqExampleId: "96f18056-1a4e-47ab-b5de-36fe5b46db79", // 2023 — x + y = 7 on {1,...,7}
      traps: [
        {
          title: "A chain back to the start",
          body: "Transitivity applies to \\(aRb\\) and \\(bRa\\) too: together they force \\(aRa\\). A symmetric relation missing \\((a,a)\\) for such an \\(a\\) is not transitive.",
        },
      ],
    },

    // C2 — equivalence relations and classes
    {
      kind: "formula" as const,
      slug: "jfn-equivalence",
      name: "Equivalence relations and their classes",
      intuition:
        "An equivalence relation has all three properties. Its usual shape is '\\(aRb\\) when \\(g(a)=g(b)\\)' for some function \\(g\\), and every relation of that shape is an equivalence. Rewrite the condition into that shape: '\\(2a+3b\\) is a multiple of 5' is the same as '\\(a\\) and \\(b\\) leave the same remainder on division by 5'. The classes split the set into disjoint pieces, one for each value of \\(g\\).",
      definition:
        "- **Equivalence:** reflexive, symmetric and transitive.\n" +
        "- \\(aRb\\iff g(a)=g(b)\\) is always an equivalence (\\(\\iff\\) reads 'if and only if').\n" +
        "- **Class of \\(a\\):** all \\(b\\) with \\(bRa\\). Classes are disjoint and cover the set.\n" +
        "- Classes of sizes \\(k_1,k_2,\\dots\\) give a relation with \\(k_1^2+k_2^2+\\dots\\) pairs.",
      formula: {
        label: "The usual shape",
        latex: "aRb\\iff g(a)=g(b)",
      },
      authoredExample: {
        prompt: "On \\(\\mathbb Z\\), \\(aRb\\) if 3 divides \\(a-b\\). Is it an equivalence, and what are its classes?",
        steps: [
          "It is \\(g(a)=g(b)\\) with \\(g\\) the remainder on division by 3.",
        ],
        answer: "Yes; three classes: remainders 0, 1 and 2.",
      },
      selfCheckExample: {
        prompt: "On \\(\\mathbb N\\times\\mathbb N\\), \\((a,b)R(c,d)\\) if \\(a+d=b+c\\). Is it an equivalence?",
        steps: [
          "Rewrite: \\(a-b=c-d\\), the shape \\(g(a,b)=g(c,d)\\).",
        ],
        answer: "Yes; the class of \\((3,1)\\) is every \\((c,d)\\) with \\(c-d=2\\).",
      },
      practiceSet: [
        { prompt: "\\(a+b\\) even on \\(\\mathbb Z\\): the classes?", answer: "The even and the odd integers" },
        { prompt: "Classes of sizes 3 and 2: pairs in the relation?", answer: "\\(13\\)" },
        { prompt: "\\(|a|=|b|\\): class of \\(-4\\)?", answer: "\\(\\{-4,4\\}\\)" },
        { prompt: "\\(3a+4b\\) a multiple of 7 on \\(\\mathbb Z\\): an equivalence?", answer: "Yes: \\(3a+4b=3(a-b)+7b\\)" },
      ],
      pyqExampleId: "c45550b8-35dc-46b8-a9da-77362176d21c", // 2023 — 2a + 3b a multiple of 5 on N
      traps: [
        {
          title: "Reflexive and symmetric is not enough",
          body: "Many relations here are reflexive and symmetric but fail transitivity, for example \\(|a-b|\\le1\\). Test a chain that crosses the limit before calling it an equivalence.",
        },
      ],
    },
  ],
};
