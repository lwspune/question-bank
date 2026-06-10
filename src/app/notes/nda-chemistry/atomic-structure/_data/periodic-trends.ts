import type { SubtopicNote } from "@/app/notes/_types";

export const PERIODIC_TRENDS_NOTE: SubtopicNote = {
  subtopicName: "Periodic Trends, Valency and Atomicity",
  title: "Periodic Trends, Valency and Atomicity",
  oneLineDefinition:
    "Elements in the same group share a valency and react in patterned ways; the number of atoms in a free element's molecule is its atomicity, and properties like reactivity and oxidising power trend smoothly across the table.",
  whyItMatters:
    "The largest subtopic — 12 PYQs. It clusters into four ideas: valency (group → valency, ordering valencies), atomicity (mono/di/poly-atomic elements), periodic trends (halogen oxidising power, metal reactivity with water), and noble gases (inertness + uses). " +
    "Each is recall or one-line reasoning; learn the four group facts and the answers fall out.",
  concepts: [
    // valency (FORMULA)
    {
      kind: "formula" as const,
      slug: "valency-and-groups",
      name: "Valency, groups and the most fundamental property",
      intuition:
        "Valency is the combining capacity of an element — the number of electrons in its outermost shell decides it. Elements in the same group have the same valency, so they form analogous compounds. " +
        "And the single most fundamental property of an element is its atomic number, because that is what defines the element.",
      definition:
        "The valency facts the bank tests:\n" +
        "- **Valency depends on the number of electrons in the outermost (valence) shell.**\n" +
        "- Same group → **same valency** (Mg, Ca, Ba are all Group 2 → valency 2).\n" +
        "- Standard valencies: noble gases (Ne) = **0**; Group 2 (Mg) = **2**; Group 15 (N) = **3**; Group 14 (Si) = **4**. Ordering them: Ne < Mg < N < Si.\n" +
        "- A compound's formula reveals valency: XCl₂ means X has valency **2**, so X is a Group-2 metal (same group as Mg).\n" +
        "- The **atomic number** is the most fundamental characteristic of an element.",
      formula: {
        label: "Standard valencies by group",
        latex: "\\text{Ne}=0 \\quad \\text{Mg}=2 \\quad \\text{N}=3 \\quad \\text{Si}=4",
      },
      pyqExampleId: "5202ef1f-276e-44e2-9f99-0a27097e2be5", // valency order Ne<Mg<N<Si
      authoredExample: {
        prompt: "Arrange Ne, Si, N and Mg in increasing order of valency.",
        steps: [
          "Ne is a noble gas → valency 0.",
          "Mg is Group 2 → valency 2; N is Group 15 → valency 3; Si is Group 14 → valency 4.",
          "Order by value: 0 < 2 < 3 < 4 → Ne < Mg < N < Si.",
        ],
        answer: "Ne < Mg < N < Si.",
      },
      selfCheckExample: {
        prompt: "Element X forms a chloride XCl₂, a high-melting-point solid. Which element is in the same group as X: Na, Al, Mg or K?",
        steps: [
          "XCl₂ shows X combines with two chlorines → valency 2.",
          "A high-melting ionic solid points to a Group-2 metal.",
          "Magnesium is the Group-2 element among the options.",
        ],
        answer: "Mg — X is a Group-2 metal, the same group as magnesium.",
      },
      practiceSet: [
        { prompt: "On what does the valency of an element depend?", answer: "The number of electrons in its outermost shell" },
        { prompt: "Which set of elements has the same valency: (Na, Mg, Al) or (Mg, Ca, Ba)?", answer: "Mg, Ca, Ba", method: "all Group 2 → valency 2" },
        { prompt: "What is the most fundamental characteristic of an element?", answer: "Its atomic number" },
        { prompt: "An element forms XCl₂. What is its valency?", answer: "2" },
      ],
      traps: [
        {
          title: "Same group = same valency",
          body:
            "Mg, Ca and Ba are all Group 2, so they share valency 2 and form MgCl₂, CaCl₂, BaCl₂. A set like (Na, Mg, Al) spans three groups and three valencies — not the answer.",
        },
      ],
    },

    // atomicity (REFERENCE)
    {
      kind: "reference" as const,
      slug: "atomicity-of-elements",
      name: "Atomicity — atoms per molecule of a free element",
      intuition:
        "Atomicity is how many atoms make up one molecule of an element in its free state. Noble gases travel alone (monatomic), most gases pair up (diatomic), and a few elements clump (phosphorus P₄, sulphur S₈). " +
        "The bank asks you to match elements to their atomicity or to spot the polyatomic one.",
      definition:
        "The atomicities the bank tests:\n" +
        "- **Monatomic (1)** — noble gases: He, Ne, Ar, Kr, Xe, Rn.\n" +
        "- **Diatomic (2)** — H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂.\n" +
        "- **Tetra-atomic (4)** — phosphorus P₄.\n" +
        "- **Octa-atomic (8)** — sulphur S₈.\n" +
        "Polyatomic means more than two atoms per molecule — phosphorus (P₄) and sulphur (S₈) are the classic polyatomic elements.",
      table: {
        columns: ["Element", "Molecule", "Atomicity"],
        rows: [
          { cells: ["Neon", "Ne", "1 (monatomic)"] },
          { cells: ["Nitrogen", "N₂", "2 (diatomic)"] },
          { cells: ["Chlorine", "Cl₂", "2 (diatomic)"] },
          { cells: ["Iodine", "I₂", "2 (diatomic)"] },
          {
            cells: ["Phosphorus", "P₄", "4 (tetra-atomic, polyatomic)"],
            noteAmber: "NDA 2024 — phosphorus is the polyatomic element (P₄), unlike diatomic Cl₂ or metallic Al.",
          },
          { cells: ["Sulphur", "S₈", "8 (octa-atomic, polyatomic)"] },
        ],
        caption: "Noble gases = 1; common gases = 2; phosphorus = 4; sulphur = 8.",
      },
      pyqExampleId: "e7d6e46e-ea1e-461b-926f-7ddaee0b4f78", // atomicity match P4/N2/Ne/S8
      selfCheckExample: {
        prompt: "Which one of these is a polyatomic element: phosphorus, sulphur (gaseous diatomic), chlorine or aluminium?",
        steps: [
          "Chlorine is diatomic (Cl₂); aluminium is a metal (treated as monatomic in this sense).",
          "Phosphorus exists as P₄ — four atoms per molecule.",
          "P₄ has more than two atoms, so phosphorus is polyatomic.",
        ],
        answer: "Phosphorus — it exists as P₄ (tetra-atomic, hence polyatomic).",
      },
      practiceSet: [
        { prompt: "What is the atomicity of phosphorus (P₄)?", answer: "4 (tetra-atomic)" },
        { prompt: "What is the atomicity of neon?", answer: "1 (monatomic)" },
        { prompt: "What is the atomicity of sulphur (S₈)?", answer: "8 (octa-atomic)" },
        { prompt: "Which is NOT monatomic: helium, neon, argon or iodine?", answer: "Iodine", method: "iodine is diatomic I₂; noble gases are monatomic" },
      ],
      traps: [
        {
          title: "Phosphorus is P₄, sulphur is S₈",
          body:
            "The two polyatomic elements the bank loves are phosphorus (**P₄**, atomicity 4) and sulphur (**S₈**, atomicity 8). Don't call them diatomic.",
        },
        {
          title: "Iodine is diatomic, not monatomic",
          body:
            "Only the noble gases (He, Ne, Ar…) are monatomic. Iodine is I₂ (diatomic), so in a 'which is NOT monatomic' question, iodine is the answer.",
        },
      ],
    },

    // periodic trends: reactivity & oxidising power (REFERENCE)
    {
      kind: "reference" as const,
      slug: "reactivity-and-oxidising-trends",
      name: "Reactivity and oxidising-power trends",
      intuition:
        "Properties change smoothly along a group. For the halogens, oxidising power falls down the group (fluorine is the strongest). For the alkali metals, reactivity with water rises down the group (lithium is the least reactive). " +
        "The bank asks you to order them or pick the extreme.",
      definition:
        "The two trends the bank tests:\n" +
        "- **Halogen oxidising power** decreases down the group: F > Cl > Br > I. So increasing order = **I < Br < Cl < F**.\n" +
        "- **Alkali-metal reactivity with water** increases down the group (Li < Na < K < Rb < Cs). So **lithium is the least reactive** of the alkali metals with water.\n" +
        "Reason: reactivity of metals rises and oxidising power of non-metals falls as atoms get larger down a group.",
      table: {
        columns: ["Trend", "Direction down the group", "Extreme the bank asks for"],
        rows: [
          {
            cells: ["Halogen oxidising power", "Decreases (F strongest, I weakest)", "Increasing order: I < Br < Cl < F"],
            noteAmber: "NDA 2023 — increasing oxidising order of halogens is I, Br, Cl, F.",
          },
          {
            cells: ["Alkali-metal reactivity with water", "Increases (Li least, Cs most)", "Lithium is least reactive with water"],
            noteAmber: "NDA 2017 — among alkali metals, lithium is the least reactive with water.",
          },
        ],
      },
      pyqExampleId: "3386dc9a-6cb6-486c-ba27-9e0abd5e9a88", // halogen oxidising order
      selfCheckExample: {
        prompt: "Arrange the halogens F, Cl, Br, I in increasing order of oxidising nature.",
        steps: [
          "Oxidising power of halogens decreases down the group: F > Cl > Br > I.",
          "Increasing order is the reverse of that.",
          "So I < Br < Cl < F.",
        ],
        answer: "I, Br, Cl, F (increasing oxidising power).",
      },
      practiceSet: [
        { prompt: "Which halogen is the strongest oxidising agent?", answer: "Fluorine" },
        { prompt: "Among Li, Na, K, which alkali metal is least reactive with water?", answer: "Lithium" },
        { prompt: "Arrange halogens in increasing oxidising power.", answer: "I < Br < Cl < F" },
      ],
      traps: [
        {
          title: "Oxidising power falls down the group, reactivity rises",
          body:
            "For **halogens** (non-metals), oxidising power **decreases** down the group (F is best). For **alkali metals**, reactivity with water **increases** down the group (Li is least, Cs most). Don't mix the two directions.",
        },
      ],
    },

    // noble gases (REFERENCE)
    {
      kind: "reference" as const,
      slug: "noble-gases",
      name: "Noble gases — inertness and uses",
      intuition:
        "Noble gases (Group 18) have full outer shells, so they are chemically inert and travel as single atoms. Each has a signature use the bank tests — argon shields tungsten filaments, neon glows in advertising signs, xenon flashes in cameras. " +
        "Radon, the heaviest, is also an inert gas (and radioactive).",
      definition:
        "Noble-gas facts and uses:\n" +
        "- The noble gases (He, Ne, Ar, Kr, Xe, **Rn**) are **inert** (chemically unreactive) and **monatomic**.\n" +
        "- **Radon** is an inert (noble) gas — and radioactive.\n" +
        "- **Argon** — filled into bulbs so the **tungsten filament lasts longer**.\n" +
        "- **Neon** — **advertising / neon signs** (red glow).\n" +
        "- **Krypton** — **airport landing lights and lighthouses**.\n" +
        "- **Xenon** — **photographer's flash guns**.",
      table: {
        columns: ["Noble gas", "Signature use"],
        rows: [
          { cells: ["Argon", "Fills bulbs so the tungsten filament lasts longer"] },
          { cells: ["Neon", "Advertising / neon signs"] },
          { cells: ["Krypton", "Airport landing lights and lighthouses"] },
          { cells: ["Xenon", "Photographer's flash gun"] },
          {
            cells: ["Radon", "An inert (noble) gas; also radioactive"],
            noteAmber: "NDA 2017 — radon is an inert gas (Group 18).",
          },
        ],
      },
      pyqExampleId: "483f8c00-29bc-4229-80d0-0edbfbdb5a8e", // noble gas uses match
      selfCheckExample: {
        prompt: "Match each noble gas to its use: Argon, Neon, Krypton, Xenon — with tungsten-filament bulbs, advertising signs, airport landing lights, and a photographer's flash.",
        steps: [
          "Argon is inert and cheap → fills bulbs to protect the tungsten filament.",
          "Neon glows red → advertising / neon signs.",
          "Krypton → airport landing lights and lighthouses; Xenon → photographer's flash.",
        ],
        answer: "Argon → tungsten bulbs; Neon → advertising signs; Krypton → airport lights; Xenon → flash gun.",
      },
      practiceSet: [
        { prompt: "Which noble gas is used in advertising (neon) signs?", answer: "Neon" },
        { prompt: "Which noble gas fills bulbs to make the tungsten filament last longer?", answer: "Argon" },
        { prompt: "Which noble gas is used in a photographer's flash gun?", answer: "Xenon" },
        { prompt: "Is radon an inert gas or a reactive metal?", answer: "An inert gas", method: "Group 18, also radioactive" },
      ],
      traps: [
        {
          title: "Argon protects the filament; neon makes the glow",
          body:
            "Argon fills the bulb (inert, prevents the tungsten filament burning out); **neon** is the one used in glowing advertising signs. The bank swaps these in match-the-list questions.",
        },
      ],
    },
  ],
};
