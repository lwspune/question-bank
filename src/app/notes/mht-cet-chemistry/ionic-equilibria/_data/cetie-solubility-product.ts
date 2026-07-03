import type { SubtopicNote } from "@/app/notes/_types";

export const KSP_NOTE: SubtopicNote = {
  subtopicName: "Solubility Product (Ksp)",
  title: "Solubility Product (Ksp)",
  oneLineDefinition:
    "For a sparingly soluble salt, the solubility product Ksp is the product of the molar concentrations of its ions, each raised to the power of its coefficient; it links directly to the salt's solubility S through a fixed stoichiometry factor.",
  whyItMatters:
    "This is the single biggest subtopic in MHT-CET Ionic Equilibria (30 PYQs) and almost every question is one of two mechanical steps: get S from Ksp, or get Ksp from S. The whole battle is picking the right relation for the salt type — S squared for AB, 4S cubed for AB2 or A2B, and 108S to the fifth for A2B3. " +
    "Learn the stoichiometry factors cold, remember to take the correct root (square, cube, or fifth), and this becomes a guaranteed-scoring block.",
  concepts: [
    // Concept 1 — Ksp definition and the general ionic expression
    {
      kind: "formula" as const,
      slug: "cetie-ksp-expression",
      name: "Solubility product expression",
      intuition:
        "When a sparingly soluble salt sits in its saturated solution, a tiny amount dissolves into ions and the rest stays solid. The solubility product is just the equilibrium constant for that dissolving — the product of the ion concentrations, each raised to how many of that ion appear in the formula. " +
        "The solid itself never enters the expression, only the dissolved ions do.",
      definition:
        "Solubility product for a salt \\(A_x B_y\\):\n" +
        "- The salt dissolves as \\(A_x B_y \\rightleftharpoons x\\,A^{y+} + y\\,B^{x-}\\).\n" +
        "- Its **solubility product** is \\(K_{sp} = [A^{y+}]^x\\,[B^{x-}]^y\\) — each ion concentration raised to its **coefficient**.\n" +
        "- The undissolved **solid does not appear** (its activity is 1); only the ions count.\n" +
        "- \\(K_{sp}\\) is a constant at a given temperature — it does not change when you add a common ion, only the individual concentrations adjust.",
      formula: {
        label: "General solubility product",
        latex: "K_{sp} = [A^{y+}]^x\\,[B^{x-}]^y \\qquad (A_x B_y \\rightleftharpoons x\\,A^{y+} + y\\,B^{x-})",
        symbols: [
          { symbol: "K_{sp}", meaning: "solubility product (constant at a given temperature)" },
          { symbol: "[A^{y+}]", meaning: "molar concentration of the cation" },
          { symbol: "[B^{x-}]", meaning: "molar concentration of the anion" },
          { symbol: "x, y", meaning: "number of cations and anions in the formula (their exponents)" },
        ],
      },
      pyqExampleId: "428ff877-b6e3-45be-be39-480ca610f7bd", // Ag2CrO4 expression -> 4S^3
      authoredExample: {
        prompt:
          "Write the solubility product expression for aluminium hydroxide, Al(OH)3.",
        steps: [
          "The salt dissolves as \\(\\text{Al(OH)}_3 \\rightleftharpoons \\text{Al}^{3+} + 3\\,\\text{OH}^-\\).",
          "Raise each ion concentration to its coefficient: \\(\\text{Al}^{3+}\\) to the power 1, \\(\\text{OH}^-\\) to the power 3.",
        ],
        answer: "\\(K_{sp} = [\\text{Al}^{3+}][\\text{OH}^-]^3\\).",
      },
      selfCheckExample: {
        prompt:
          "Write the solubility product expression for calcium phosphate, \\(\\text{Ca}_3(\\text{PO}_4)_2\\).",
        steps: [
          "It dissolves as \\(\\text{Ca}_3(\\text{PO}_4)_2 \\rightleftharpoons 3\\,\\text{Ca}^{2+} + 2\\,\\text{PO}_4^{3-}\\).",
          "Raise each ion to its coefficient (3 for calcium, 2 for phosphate).",
        ],
        answer: "\\(K_{sp} = [\\text{Ca}^{2+}]^3[\\text{PO}_4^{3-}]^2\\).",
      },
      practiceSet: [
        { prompt: "Write the Ksp expression for AgCl.", answer: "\\(K_{sp} = [\\text{Ag}^+][\\text{Cl}^-]\\)" },
        { prompt: "Write the Ksp expression for \\(\\text{PbI}_2\\).", answer: "\\(K_{sp} = [\\text{Pb}^{2+}][\\text{I}^-]^2\\)" },
        { prompt: "Does the undissolved solid appear in the Ksp expression?", answer: "No — only the dissolved ions appear" },
        { prompt: "Write the Ksp expression for \\(\\text{Ag}_2\\text{CrO}_4\\).", answer: "\\(K_{sp} = [\\text{Ag}^+]^2[\\text{CrO}_4^{2-}]\\)" },
      ],
      traps: [
        {
          title: "Raise each ion to its own coefficient",
          body:
            "For \\(\\text{Ag}_2\\text{CrO}_4 \\rightleftharpoons 2\\text{Ag}^+ + \\text{CrO}_4^{2-}\\), the silver-ion concentration is **squared**: \\(K_{sp} = [\\text{Ag}^+]^2[\\text{CrO}_4^{2-}]\\). Dropping the exponent (writing \\([\\text{Ag}^+][\\text{CrO}_4^{2-}]\\)) is the most common slip.",
        },
        {
          title: "The solid is left out",
          body:
            "The solubility product involves **only the aqueous ions**. The concentration of the pure solid salt is taken as constant (activity 1) and never appears in \\(K_{sp}\\).",
        },
      ],
    },

    // Concept 2 — Ksp-solubility relation by salt type (REFERENCE TABLE)
    {
      kind: "reference" as const,
      slug: "cetie-ksp-solubility-relation",
      name: "Ksp in terms of solubility, by salt type",
      intuition:
        "If the molar solubility is S, then each ion's concentration is S times its coefficient. Feed those into the Ksp expression and you get a single tidy formula per salt type. " +
        "Memorising the four common shapes — S squared, 4S cubed, 27S to the fourth, 108S to the fifth — lets you write down the answer without re-deriving it each time.",
      definition:
        "If the molar solubility of the salt is \\(S\\), the ion concentrations follow the stoichiometry and \\(K_{sp}\\) reduces to a power of \\(S\\):\n" +
        "- **AB** (like AgCl, AgBr, CaCO3): \\(K_{sp} = S^2\\).\n" +
        "- **AB2 or A2B** (like PbI2, PbCl2, Ag2CrO4): \\(K_{sp} = 4S^3\\).\n" +
        "- **AB3 or A3B** (like AlCl3-type, FeCl3-type): \\(K_{sp} = 27S^4\\).\n" +
        "- **A2B3 or A3B2** (like Ca3(PO4)2, Al2(SO4)3): \\(K_{sp} = 108\\,S^5\\).\n" +
        "The numerical factor is just the product of each coefficient raised to itself: e.g. \\(2^2 = 4\\), \\(3^3 = 27\\), \\(3^3 \\times 2^2 = 108\\).",
      table: {
        columns: ["Salt type", "Dissociation", "Ksp in terms of S", "Example salt"],
        rows: [
          {
            cells: [
              "AB (1:1)",
              "\\(AB \\rightleftharpoons A^+ + B^-\\)",
              "\\(K_{sp} = S^2\\)",
              "AgCl, AgBr, CaCO3, NiS",
            ],
            noteAmber: "Most common type in the bank. Recover S by a single square root: \\(S = \\sqrt{K_{sp}}\\).",
          },
          {
            cells: [
              "AB2 or A2B (1:2)",
              "\\(AB_2 \\rightleftharpoons A^{2+} + 2B^-\\)",
              "\\(K_{sp} = 4S^3\\)",
              "PbI2, PbCl2, Ag2CrO4, Ba(OH)2",
            ],
            noteAmber: "Recover S by \\(S = \\sqrt[3]{K_{sp}/4}\\) — divide by 4 first, then take the cube root.",
          },
          {
            cells: [
              "AB3 or A3B (1:3)",
              "\\(AB_3 \\rightleftharpoons A^{3+} + 3B^-\\)",
              "\\(K_{sp} = 27S^4\\)",
              "Fe(OH)3-type, AlCl3-type",
            ],
            noteAmber: "Recover S by \\(S = \\left(\\dfrac{K_{sp}}{27}\\right)^{1/4}\\).",
          },
          {
            cells: [
              "A2B3 or A3B2 (2:3)",
              "\\(A_2B_3 \\rightleftharpoons 2A^{3+} + 3B^{2-}\\)",
              "\\(K_{sp} = 108\\,S^5\\)",
              "Ca3(PO4)2, Al2(SO4)3",
            ],
            noteAmber: "Factor is \\(2^2 \\times 3^3 = 4 \\times 27 = 108\\). Recover S by \\(S = \\left(\\dfrac{K_{sp}}{108}\\right)^{1/5}\\).",
          },
        ],
        caption:
          "The numerical factor is the product of each coefficient raised to its own power; the exponent on S is the total number of ions produced.",
      },
      pyqExampleId: "a321ef25-f2ba-400e-8f71-5018521c6e6b", // Ca3(PO4)2 solubility S -> Ksp = 108 S^5
      selfCheckExample: {
        prompt:
          "Which equation represents the relation between solubility S and solubility product for the salt \\(\\text{B}_3\\text{A}_2\\)?",
        steps: [
          "It dissolves as \\(\\text{B}_3\\text{A}_2 \\rightleftharpoons 3\\text{B}^{2+} + 2\\text{A}^{3-}\\), so \\([\\text{B}^{2+}] = 3S\\), \\([\\text{A}^{3-}] = 2S\\).",
          "\\(K_{sp} = (3S)^3(2S)^2 = 27S^3 \\times 4S^2 = 108\\,S^5\\).",
          "Rearrange for S: \\(S = \\left(\\dfrac{K_{sp}}{108}\\right)^{1/5}\\).",
        ],
        answer: "\\(S = \\left(\\dfrac{K_{sp}}{108}\\right)^{1/5}\\).",
      },
      practiceSet: [
        { prompt: "Ksp in terms of S for an AB salt like AgCl?", answer: "\\(K_{sp} = S^2\\)" },
        { prompt: "Ksp in terms of S for \\(\\text{PbI}_2\\)?", answer: "\\(K_{sp} = 4S^3\\)" },
        { prompt: "Ksp in terms of S for \\(\\text{Ca}_3(\\text{PO}_4)_2\\)?", answer: "\\(K_{sp} = 108\\,S^5\\)" },
        { prompt: "Ksp in terms of S for a \\(BA_3\\) salt?", answer: "\\(K_{sp} = 27S^4\\)", method: "\\(S(3S)^3 = 27S^4\\)" },
      ],
      traps: [
        {
          title: "AB2 is 4S cubed, not S squared",
          body:
            "For \\(AB_2 \\rightleftharpoons A^{2+} + 2B^-\\), \\([B^-] = 2S\\), so \\(K_{sp} = (S)(2S)^2 = 4S^3\\). Treating it as \\(S^2\\) (the AB formula) is the classic mistake — the coefficient 2 both squares AND multiplies in the factor 4.",
        },
        {
          title: "Match the root to the exponent on S",
          body:
            "From \\(K_{sp} = 4S^3\\) you take a **cube** root (after dividing by 4); from \\(K_{sp} = 108S^5\\) a **fifth** root. Taking a square root out of habit gives a wildly wrong S.",
        },
      ],
    },

    // Concept 3 — Solubility of a 1:1 (AB) salt from Ksp and back
    {
      kind: "formula" as const,
      slug: "cetie-ksp-ab-solubility",
      name: "Solubility of a 1:1 (AB) salt: Ksp = S squared",
      intuition:
        "For a simple 1:1 salt each formula unit gives one cation and one anion, so both ion concentrations equal the solubility S. The solubility product is then just S times S. " +
        "To go from Ksp to solubility you take a single square root; to go the other way you square the solubility.",
      definition:
        "For a binary (1:1) salt \\(AB \\rightleftharpoons A^+ + B^-\\):\n" +
        "- Both ions have concentration equal to the solubility: \\([A^+] = [B^-] = S\\).\n" +
        "- Therefore \\(K_{sp} = S \\times S = S^2\\).\n" +
        "- **From Ksp to solubility:** \\(S = \\sqrt{K_{sp}}\\).\n" +
        "- **From solubility to Ksp:** \\(K_{sp} = S^2\\).\n" +
        "Handy squares: \\(\\sqrt{4.9\\times 10^{-13}} = 7.0\\times 10^{-7}\\), \\(\\sqrt{6.4\\times 10^{-5}} = 8.0\\times 10^{-3}\\), \\(\\sqrt{1.6\\times 10^{-10}} = 1.26\\times 10^{-5}\\).",
      formula: {
        label: "AB salt: solubility and solubility product",
        latex: "K_{sp} = S^2 \\qquad\\Longleftrightarrow\\qquad S = \\sqrt{K_{sp}}",
        symbols: [
          { symbol: "S", meaning: "molar solubility (mol dm^-3), equals each ion concentration" },
          { symbol: "K_{sp}", meaning: "solubility product of the 1:1 salt" },
        ],
      },
      pyqExampleId: "d35f5a66-1a57-4d5c-bfd0-f39f10255ea3", // AX Ksp 4.9e-13 -> S = 7.0e-7
      authoredExample: {
        prompt:
          "The solubility product of AgCl is \\(1.21 \\times 10^{-10}\\). Calculate its solubility in mol dm\\(^{-3}\\).",
        steps: [
          "\\(\\text{AgCl} \\rightleftharpoons \\text{Ag}^+ + \\text{Cl}^-\\), a 1:1 salt, so \\(K_{sp} = S^2\\).",
          "\\(S = \\sqrt{K_{sp}} = \\sqrt{1.21 \\times 10^{-10}} = \\sqrt{12.1 \\times 10^{-11}}\\).",
          "\\(\\sqrt{1.21} = 1.1\\) and \\(\\sqrt{10^{-10}} = 10^{-5}\\).",
        ],
        answer: "\\(S = 1.1 \\times 10^{-5}\\ \\text{mol dm}^{-3}\\).",
      },
      selfCheckExample: {
        prompt:
          "The solubility of a sparingly soluble 1:1 salt BA is \\(2.0 \\times 10^{-5}\\ \\text{mol dm}^{-3}\\). Calculate its solubility product.",
        steps: [
          "\\(BA \\rightleftharpoons B^+ + A^-\\), so \\(K_{sp} = S^2\\).",
          "\\(K_{sp} = (2.0 \\times 10^{-5})^2 = 4.0 \\times 10^{-10}\\).",
        ],
        answer: "\\(K_{sp} = 4.0 \\times 10^{-10}\\).",
      },
      practiceSet: [
        { prompt: "\\(K_{sp}\\) of a 1:1 salt is \\(4.9 \\times 10^{-9}\\). Its solubility?", answer: "\\(7.0 \\times 10^{-5}\\ \\text{mol dm}^{-3}\\)", method: "\\(S = \\sqrt{4.9\\times10^{-9}}\\)" },
        { prompt: "Solubility of an AB salt is \\(7 \\times 10^{-5}\\). Its Ksp?", answer: "\\(4.9 \\times 10^{-9}\\)", method: "\\(K_{sp} = S^2\\)" },
        { prompt: "\\(K_{sp}\\) of NiS is \\(4.9 \\times 10^{-5}\\). Solubility?", answer: "\\(7.0 \\times 10^{-3}\\ \\text{mol dm}^{-3}\\)" },
        { prompt: "\\(K_{sp}\\) of AgBr is \\(6.4 \\times 10^{-13}\\). Solubility?", answer: "\\(8.0 \\times 10^{-7}\\ \\text{mol L}^{-1}\\)", method: "\\(\\sqrt{6.4\\times10^{-13}}\\)" },
      ],
      traps: [
        {
          title: "Take the square root — do not report Ksp as the solubility",
          body:
            "For AgBr with \\(K_{sp} = 4.9 \\times 10^{-13}\\), the solubility is \\(\\sqrt{K_{sp}} = 7.0 \\times 10^{-7}\\), NOT \\(4.9 \\times 10^{-13}\\). The distractor equal to \\(K_{sp}\\) itself is always offered — remember to root it.",
        },
        {
          title: "Handle the power correctly under the root",
          body:
            "Rewrite the mantissa so the exponent is even: \\(\\sqrt{4.9 \\times 10^{-13}} = \\sqrt{49 \\times 10^{-14}} = 7 \\times 10^{-7}\\). Splitting \\(10^{-13}\\) as \\(49 \\times 10^{-14}\\) keeps the arithmetic clean.",
        },
      ],
    },

    // Concept 4 — Solubility of higher-valent salts (AB2, A2B, A2B3) from Ksp and back
    {
      kind: "formula" as const,
      slug: "cetie-ksp-higher-valent-solubility",
      name: "Solubility of AB2, A2B and A2B3 salts",
      intuition:
        "When one formula unit releases more than one of an ion, that ion's concentration is a multiple of S, and the Ksp picks up a numerical factor plus a higher power of S. The recipe is always the same: substitute the ion concentrations (S, 2S, 3S ...) into the Ksp expression and simplify. " +
        "Going backwards, divide out the factor first, then take the matching root.",
      definition:
        "Substitute the ion concentrations into \\(K_{sp}\\) and simplify:\n" +
        "- **AB2 / A2B:** \\([A^{2+}] = S\\), \\([B^-] = 2S\\), so \\(K_{sp} = (S)(2S)^2 = 4S^3\\), giving \\(S = \\sqrt[3]{K_{sp}/4}\\).\n" +
        "- **A2B3:** \\([A^{3+}] = 2S\\), \\([B^{2-}] = 3S\\), so \\(K_{sp} = (2S)^2(3S)^3 = 108\\,S^5\\), giving \\(S = \\left(K_{sp}/108\\right)^{1/5}\\).\n" +
        "- The cube-root trick: write \\(K_{sp}/4\\) as (a number) \\(\\times 10^{-(\\text{multiple of }3)}\\) so both parts have exact roots, e.g. \\(27 \\times 10^{-9} \\Rightarrow 3 \\times 10^{-3}\\).",
      formula: {
        label: "AB2 / A2B salt: solubility and solubility product",
        latex: "K_{sp} = 4S^3 \\qquad\\Longleftrightarrow\\qquad S = \\sqrt[3]{\\dfrac{K_{sp}}{4}}",
        symbols: [
          { symbol: "S", meaning: "molar solubility (mol dm^-3)" },
          { symbol: "K_{sp}", meaning: "solubility product of the AB2 / A2B salt" },
          { symbol: "4", meaning: "the factor 2^2 from the doubly-produced ion (2S)^2" },
        ],
      },
      pyqExampleId: "7086edba-eb73-4f90-9c01-52246d485489", // PbI2 Ksp 1.08e-7 -> S = 3.0e-3
      authoredExample: {
        prompt:
          "The solubility product of \\(\\text{PbCl}_2\\) is \\(3.2 \\times 10^{-5}\\). Calculate its solubility in mol dm\\(^{-3}\\).",
        steps: [
          "\\(\\text{PbCl}_2 \\rightleftharpoons \\text{Pb}^{2+} + 2\\text{Cl}^-\\), so \\(K_{sp} = (S)(2S)^2 = 4S^3\\).",
          "\\(S^3 = \\dfrac{K_{sp}}{4} = \\dfrac{3.2 \\times 10^{-5}}{4} = 8 \\times 10^{-6}\\).",
          "\\(S = \\sqrt[3]{8 \\times 10^{-6}} = \\sqrt[3]{8}\\times\\sqrt[3]{10^{-6}} = 2 \\times 10^{-2}\\).",
        ],
        answer: "\\(S = 2 \\times 10^{-2}\\ \\text{mol dm}^{-3}\\).",
      },
      selfCheckExample: {
        prompt:
          "The solubility of the salt \\(B_2A\\) has \\(K_{sp} = 3.2 \\times 10^{-11}\\). Find its solubility in mol dm\\(^{-3}\\).",
        steps: [
          "\\(B_2A \\rightleftharpoons 2B^+ + A^{2-}\\), so \\(K_{sp} = (2S)^2(S) = 4S^3\\).",
          "\\(S^3 = \\dfrac{3.2 \\times 10^{-11}}{4} = 8 \\times 10^{-12}\\).",
          "\\(S = \\sqrt[3]{8 \\times 10^{-12}} = 2 \\times 10^{-4}\\).",
        ],
        answer: "\\(S = 2.0 \\times 10^{-4}\\ \\text{mol dm}^{-3}\\).",
      },
      practiceSet: [
        { prompt: "Solubility of \\(AX_2\\) is \\(1 \\times 10^{-4}\\). Its Ksp?", answer: "\\(4 \\times 10^{-12}\\)", method: "\\(K_{sp} = 4S^3 = 4(10^{-4})^3\\)" },
        { prompt: "Solubility of \\(BA_2\\) is \\(4 \\times 10^{-4}\\). Its Ksp?", answer: "\\(2.56 \\times 10^{-10}\\)", method: "\\(4 \\times 64 \\times 10^{-12}\\)" },
        { prompt: "\\(K_{sp}\\) of \\(AB_2\\) is \\(2.56 \\times 10^{-10}\\). Solubility?", answer: "\\(4 \\times 10^{-4}\\ \\text{mol dm}^{-3}\\)", method: "\\(\\sqrt[3]{64\\times10^{-12}}\\)" },
        { prompt: "Solubility of \\(A_2B_3\\) is \\(1 \\times 10^{-3}\\). Its Ksp?", answer: "\\(1.08 \\times 10^{-13}\\)", method: "\\(108 S^5 = 108 \\times 10^{-15}\\)" },
      ],
      traps: [
        {
          title: "Divide by the factor BEFORE taking the root",
          body:
            "For \\(K_{sp} = 4S^3\\), first isolate \\(S^3 = K_{sp}/4\\), THEN cube-root. Cube-rooting \\(K_{sp}\\) directly (forgetting the 4) gives an answer too large by \\(\\sqrt[3]{4} \\approx 1.59\\).",
        },
        {
          title: "Group the power of ten into a multiple of the root",
          body:
            "To cube-root \\(1.08 \\times 10^{-7} / 4 = 2.7 \\times 10^{-8}\\), rewrite it as \\(27 \\times 10^{-9}\\); then \\(\\sqrt[3]{27} = 3\\) and \\(\\sqrt[3]{10^{-9}} = 10^{-3}\\), giving \\(3 \\times 10^{-3}\\). Choosing a clean exponent makes the root exact.",
        },
      ],
    },

    // Concept 5 — Ksp from pH and from mass solubility (conversions)
    {
      kind: "formula" as const,
      slug: "cetie-ksp-conversions",
      name: "Ksp from pH and from mass solubility",
      intuition:
        "Sometimes the solubility is handed to you indirectly — through the pH of a saturated hydroxide solution, or as grams per litre instead of moles per litre. The trick is to convert to the ion concentrations (or to molar solubility) first, then apply the ordinary Ksp relation. " +
        "For a hydroxide, the pH gives you the hydroxide-ion concentration directly; for a mass solubility, divide by the molar mass.",
      definition:
        "Two common indirect routes:\n" +
        "- **From pH (for a hydroxide):** \\(\\text{pOH} = 14 - \\text{pH}\\), then \\([\\text{OH}^-] = 10^{-\\text{pOH}}\\). For \\(M(\\text{OH})_2 \\rightleftharpoons M^{2+} + 2\\text{OH}^-\\), the metal ion is \\([M^{2+}] = \\tfrac{1}{2}[\\text{OH}^-]\\), and \\(K_{sp} = [M^{2+}][\\text{OH}^-]^2\\).\n" +
        "- **From mass solubility:** molar solubility \\(S = \\dfrac{\\text{mass solubility (g dm}^{-3})}{\\text{molar mass (g mol}^{-1})}\\); then apply the usual \\(K_{sp}\\)-vs-\\(S\\) relation for the salt type.\n" +
        "- Both routes end in the same Ksp formulas — only the way you obtain the concentrations changes.",
      formula: {
        label: "Molar solubility from mass solubility",
        latex: "S = \\dfrac{m}{M} \\qquad\\text{and}\\qquad [\\text{OH}^-] = 10^{-\\text{pOH}},\\ \\ \\text{pOH} = 14 - \\text{pH}",
        symbols: [
          { symbol: "S", meaning: "molar solubility (mol dm^-3)" },
          { symbol: "m", meaning: "mass solubility (g dm^-3)" },
          { symbol: "M", meaning: "molar mass of the salt (g mol^-1)" },
          { symbol: "[\\text{OH}^-]", meaning: "hydroxide-ion concentration from the pH" },
        ],
      },
      pyqExampleId: "327a0991-a47d-4b78-b413-afb58242f2e7", // Ba(OH)2 pH 12 -> Ksp = 5e-7
      authoredExample: {
        prompt:
          "A saturated solution of \\(\\text{Ba(OH)}_2\\) has pH 12. Calculate its \\(K_{sp}\\).",
        steps: [
          "\\(\\text{pOH} = 14 - 12 = 2\\), so \\([\\text{OH}^-] = 10^{-2}\\ \\text{M}\\).",
          "\\(\\text{Ba(OH)}_2 \\rightleftharpoons \\text{Ba}^{2+} + 2\\text{OH}^-\\), so \\([\\text{Ba}^{2+}] = \\tfrac{1}{2}[\\text{OH}^-] = 5 \\times 10^{-3}\\ \\text{M}\\).",
          "\\(K_{sp} = [\\text{Ba}^{2+}][\\text{OH}^-]^2 = (5 \\times 10^{-3})(10^{-2})^2\\).",
          "\\(= 5 \\times 10^{-3} \\times 10^{-4} = 5 \\times 10^{-7}\\).",
        ],
        answer: "\\(K_{sp} = 5 \\times 10^{-7}\\).",
      },
      selfCheckExample: {
        prompt:
          "A binary (1:1) sparingly soluble salt has a solubility of \\(1.12 \\times 10^{-4}\\ \\text{g dm}^{-3}\\). Its molar mass is 112 g mol\\(^{-1}\\). Calculate its solubility product.",
        steps: [
          "Molar solubility: \\(S = \\dfrac{m}{M} = \\dfrac{1.12 \\times 10^{-4}}{112} = 1.0 \\times 10^{-6}\\ \\text{mol dm}^{-3}\\).",
          "For a 1:1 salt, \\(K_{sp} = S^2\\).",
          "\\(K_{sp} = (1.0 \\times 10^{-6})^2 = 1 \\times 10^{-12}\\).",
        ],
        answer: "\\(K_{sp} = 1 \\times 10^{-12}\\).",
      },
      practiceSet: [
        { prompt: "A saturated hydroxide solution has pH 12. What is \\([\\text{OH}^-]\\)?", answer: "\\(1 \\times 10^{-2}\\ \\text{M}\\)", method: "pOH = 2" },
        { prompt: "For \\(\\text{Ba(OH)}_2\\) with \\([\\text{OH}^-] = 10^{-2}\\), what is \\([\\text{Ba}^{2+}]\\)?", answer: "\\(5 \\times 10^{-3}\\ \\text{M}\\)", method: "half of \\([\\text{OH}^-]\\)" },
        { prompt: "Mass solubility \\(2.24 \\times 10^{-4}\\ \\text{g dm}^{-3}\\), molar mass 112. Molar solubility?", answer: "\\(2.0 \\times 10^{-6}\\ \\text{mol dm}^{-3}\\)", method: "\\(m/M\\)" },
      ],
      traps: [
        {
          title: "Metal-ion concentration is HALF the hydroxide in M(OH)2",
          body:
            "For \\(\\text{Ba(OH)}_2 \\rightleftharpoons \\text{Ba}^{2+} + 2\\text{OH}^-\\), two hydroxides come from each barium, so \\([\\text{Ba}^{2+}] = \\tfrac{1}{2}[\\text{OH}^-]\\). Using \\([\\text{Ba}^{2+}] = [\\text{OH}^-]\\) doubles the answer.",
        },
        {
          title: "Convert grams to moles before using Ksp",
          body:
            "\\(K_{sp}\\) relations use **molar** solubility. Plugging a mass solubility (g dm\\(^{-3}\\)) straight into \\(K_{sp} = S^2\\) is wrong — divide by the molar mass first to get S in mol dm\\(^{-3}\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Ionic Equilibria (chapter overview)",
      href: "/notes/mht-cet-chemistry/ionic-equilibria",
    },
  ],
};
