import type { SubtopicNote } from "@/app/notes/_types";

export const VALENCY_FORMULA_NOTE: SubtopicNote = {
  subtopicName: "Valency, Oxidation States and Molecular Formula",
  title: "Valency, Oxidation States and Molecular Formula",
  oneLineDefinition:
    "Valency is an element's combining capacity — the number of bonds it forms; the oxidation state is the charge it would carry if every bond were ionic; and crossing valencies turns the two into the formula of a compound.",
  whyItMatters:
    "4 PYQs, all short recall or one-line work. The bank asks for the valency of an element from its group, the oxidation state of a metal in an oxide, and the molecular formula of a compound from the valencies of its ions. " +
    "Nail the group→valency rule and the cross-over method for writing formulae, and these are one-step answers.",
  concepts: [
    // valency and group (formula variant)
    {
      kind: "formula" as const,
      slug: "valency-from-group",
      name: "Valency — combining capacity from the outer shell",
      intuition:
        "Valency is how many bonds an atom forms — how many electrons it loses, gains or shares to reach a full outer shell. The number of electrons in the outermost shell fixes it, so elements in the same group share a valency. " +
        "The bank gives you an element (or its group) and asks for its valency, or asks which anion carries a particular charge.",
      definition:
        "Valency rules the bank tests:\n" +
        "- **Valency = electrons lost, gained or shared** to complete the octet. It is decided by the **number of outer-shell electrons**.\n" +
        "- Same group → **same valency**. Group 1 (Na) → 1; Group 2 (Mg) → 2; Group 13 (Al) → 3; Group 14 (C, Si) → 4; Group 15 (N, P) → **3**; Group 16 (O, S) → 2; Group 17 (Cl) → 1.\n" +
        "- **Nitrogen** has 5 outer electrons and needs 3 more → **valency 3**; the **nitride ion is N³⁻** (a −3 anion).\n" +
        "- For non-metals near the right, valency = **8 − (group number's outer electrons)** for the anion charge (O gains 2 → O²⁻; N gains 3 → N³⁻).",
      formula: {
        label: "Common valencies",
        latex: "\\text{Na}=1 \\quad \\text{Mg}=2 \\quad \\text{Al}=3 \\quad \\text{C}=4 \\quad \\text{N}=3 \\quad \\text{O}=2 \\quad \\text{Cl}=1",
      },
      pyqExampleId: "d2191517-bf2b-4531-9fd5-a6f886a73d2d", // which has valency of 3 — Nitrogen
      authoredExample: {
        prompt: "Which one of these has a valency of 3: sodium, magnesium, nitrogen or oxygen?",
        steps: [
          "Sodium (Group 1) has valency 1; magnesium (Group 2) has valency 2.",
          "Oxygen (Group 16) gains 2 electrons → valency 2.",
          "Nitrogen has 5 outer electrons and needs 3 to complete its octet → valency 3.",
        ],
        answer: "Nitrogen — it forms three bonds (valency 3), as in NH₃ and the nitride ion N³⁻.",
      },
      selfCheckExample: {
        prompt: "Which anion has a valency (charge) of −3: chloride, oxide, nitride or sulphide?",
        steps: [
          "Chloride is Cl⁻ (−1); oxide is O²⁻ (−2); sulphide is S²⁻ (−2).",
          "Nitrogen (Group 15) gains 3 electrons to complete its octet.",
          "So the nitride ion is N³⁻ — a −3 anion.",
        ],
        answer: "Nitride (N³⁻) — it carries a −3 charge.",
      },
      practiceSet: [
        { prompt: "What is the valency of nitrogen?", answer: "3", method: "5 outer electrons, needs 3 more" },
        { prompt: "Which anion carries a −3 charge: chloride, oxide or nitride?", answer: "Nitride (N³⁻)" },
        { prompt: "What is the valency of magnesium?", answer: "2", method: "Group 2 → loses 2 electrons" },
        { prompt: "On what does the valency of an element depend?", answer: "The number of electrons in its outermost shell" },
        { prompt: "What is the valency of aluminium?", answer: "3", method: "Group 13 → loses 3 electrons" },
      ],
      traps: [
        {
          title: "Nitrogen's valency is 3, and nitride is N³⁻",
          body:
            "Nitrogen has 5 outer electrons but a valency of **3** (it needs 3 to reach 8), and the **nitride** ion is **N³⁻**. Don't read 'valency 5' off the group number — count the electrons needed to complete the octet.",
        },
      ],
    },

    // oxidation state (formula variant)
    {
      kind: "formula" as const,
      slug: "oxidation-state",
      name: "Oxidation state — the charge if every bond were ionic",
      intuition:
        "The oxidation state is the charge an atom would carry if all its bonds were fully ionic. You find it by fixing the elements you know (oxygen is usually −2, hydrogen +1) and letting the molecule's total charge force the unknown. " +
        "The bank gives a compound and asks for the oxidation state of one element in it.",
      definition:
        "Rules for assigning oxidation states:\n" +
        "- The oxidation states in a **neutral compound add up to 0**; in an ion they add up to the **ion's charge**.\n" +
        "- **Oxygen is −2** (except in peroxides); **hydrogen is +1** (except in metal hydrides).\n" +
        "- A free element has oxidation state **0**.\n" +
        "- Example — in **V₂O₅**: let vanadium be x. Then 2x + 5(−2) = 0 → 2x = 10 → x = **+5**.",
      formula: {
        label: "Sum rule for oxidation states",
        latex: "\\sum (\\text{oxidation states}) = \\text{net charge}",
        symbols: [
          { symbol: "O", meaning: "usually −2" },
          { symbol: "H", meaning: "usually +1" },
        ],
      },
      pyqExampleId: "539affd1-478e-4763-a44b-b6bde88be9e2", // oxidation state of V in V2O5 = +5
      authoredExample: {
        prompt: "What is the oxidation state of vanadium in V₂O₅?",
        steps: [
          "Oxygen is −2, and there are 5 oxygens: total from oxygen = 5 × (−2) = −10.",
          "The compound is neutral, so the two vanadium atoms must total +10.",
          "Each vanadium = +10 / 2 = +5.",
        ],
        answer: "+5.",
      },
      selfCheckExample: {
        prompt: "What is the oxidation state of sulphur in sulphuric acid, H₂SO₄?",
        steps: [
          "Hydrogen is +1 (two of them → +2); oxygen is −2 (four of them → −8).",
          "Let sulphur be x. The molecule is neutral: (+2) + x + (−8) = 0.",
          "So x − 6 = 0 → x = +6.",
        ],
        answer: "+6.",
      },
      practiceSet: [
        { prompt: "Oxidation state of vanadium in V₂O₅?", answer: "+5", method: "2x − 10 = 0" },
        { prompt: "Usual oxidation state of oxygen in a compound?", answer: "−2" },
        { prompt: "Oxidation state of a free element (e.g. O₂, Na metal)?", answer: "0" },
        { prompt: "Oxidation state of manganese in KMnO₄?", answer: "+7", method: "+1 + x + 4(−2) = 0" },
      ],
      traps: [
        {
          title: "Let the known atoms force the unknown",
          body:
            "Always fix oxygen at −2 and hydrogen at +1, then set the oxidation states to sum to the net charge and solve for the metal. For V₂O₅ the answer is **+5**, not +10 — the +10 is split between the **two** vanadium atoms.",
        },
      ],
    },

    // writing molecular formula from valencies (formula variant)
    {
      kind: "formula" as const,
      slug: "molecular-formula-crossover",
      name: "Writing a molecular formula by crossing valencies",
      intuition:
        "To write a compound's formula, put the two ions side by side and 'cross over' their valencies — each ion's charge becomes the other's subscript. Polyatomic ions (like ammonium NH₄⁺ or carbonate CO₃²⁻) keep their bracket. " +
        "The bank gives you two ions with their valencies and asks for the correct formula.",
      definition:
        "The cross-over method:\n" +
        "- Write the cation (positive ion) first, then the anion. Write each ion's **valency** above it.\n" +
        "- **Cross the valencies** to become subscripts: a +1 cation with a −2 anion gives the cation a subscript of 2.\n" +
        "- A **polyatomic ion** taking a subscript > 1 is wrapped in **brackets**: e.g. ammonium NH₄⁺ becomes (NH₄)₂ when two are needed.\n" +
        "- Example — ammonium ion NH₄⁺ (valency +1) with carbonate CO₃²⁻ (valency −2): cross over → **(NH₄)₂CO₃**, ammonium carbonate.",
      formula: {
        label: "Cross-over rule",
        latex: "A^{+m}\\,B^{-n} \\;\\longrightarrow\\; A_{n}B_{m}",
        symbols: [
          { symbol: "m", meaning: "valency (charge) of the cation A" },
          { symbol: "n", meaning: "valency (charge) of the anion B" },
        ],
      },
      pyqExampleId: "e8956430-385c-433b-ba64-60a97ac1e353", // ammonium carbonate formula
      authoredExample: {
        prompt:
          "Write the molecular formula of ammonium carbonate, given the ammonium ion is +1 and the carbonate ion is −2.",
        steps: [
          "Cation = NH₄⁺ (valency 1); anion = CO₃²⁻ (valency 2).",
          "Cross the valencies: the +1 cation takes subscript 2; the −2 anion takes subscript 1.",
          "Two ammonium ions need brackets: (NH₄)₂; carbonate stays CO₃.",
        ],
        answer: "(NH₄)₂CO₃.",
      },
      selfCheckExample: {
        prompt: "Write the formula of aluminium oxide, given aluminium is +3 and oxide is −2.",
        steps: [
          "Cation = Al³⁺ (valency 3); anion = O²⁻ (valency 2).",
          "Cross the valencies: aluminium takes subscript 2, oxygen takes subscript 3.",
          "No polyatomic ions, so no brackets are needed.",
        ],
        answer: "Al₂O₃.",
      },
      practiceSet: [
        { prompt: "Formula of ammonium carbonate (NH₄⁺ and CO₃²⁻)?", answer: "(NH₄)₂CO₃" },
        { prompt: "Formula of calcium chloride (Ca²⁺ and Cl⁻)?", answer: "CaCl₂", method: "cross +2 and −1" },
        { prompt: "Formula of aluminium oxide (Al³⁺ and O²⁻)?", answer: "Al₂O₃" },
        { prompt: "When does a polyatomic ion need brackets in a formula?", answer: "When its subscript is greater than 1", method: "e.g. (NH₄)₂CO₃" },
      ],
      traps: [
        {
          title: "Bracket a polyatomic ion before adding a subscript",
          body:
            "Two ammonium ions are written **(NH₄)₂**, not NH₄₂ or N₂H₈. Wrap the whole polyatomic ion in brackets, then apply the subscript — otherwise the formula is misread.",
        },
      ],
    },
  ],
};
