import type { SubtopicNote } from "@/app/notes/_types";

export const MAGNETIC_COORD_NOTE: SubtopicNote = {
  subtopicName: "Spin-Only Magnetic Moment",
  title: "Spin-Only Magnetic Moment",
  oneLineDefinition:
    "The spin-only magnetic moment √(n(n+2)) BM depends only on the number of unpaired electrons n, so every question here is a count of unpaired electrons: oxidation state, d count, then high or low spin.",
  whyItMatters:
    "Thirty-five PYQs, twenty-three of them multiple choice, and five from 2026. Nineteen compute a spin-only moment or work back from a moment to the ion; eleven put complexes in order of moment or unpaired electrons; five count how many species in a list are paramagnetic. Twelve of the thirty-five ask for a number.",
  concepts: [
    // C1 — spin-only formula
    {
      kind: "formula" as const,
      slug: "jccoord-spin-only",
      name: "Spin-only magnetic moment from unpaired electrons",
      intuition:
        "Each unpaired electron is a tiny magnet; paired electrons cancel. The spin-only formula turns the number of unpaired electrons n into a moment in Bohr magnetons. Learn the five values and the question becomes: how many unpaired electrons? Run it backwards too: a measured moment gives n, n gives the d count, and the d count gives the ion.",
      definition:
        "- \\(\\mu = \\sqrt{n(n+2)}\\) BM: n = 1 → 1.73, 2 → 2.83, 3 → 3.87, 4 → 4.90, 5 → 5.92.\n" +
        "- A moment close to one of these (for example 6.06 BM or 3.95 BM) is read as the nearest n (5 or 3).\n" +
        "- Steps: oxidation state → d count → strong or weak field → configuration → n → \\(\\mu\\).\n" +
        "- n = 0 means diamagnetic: d⁰ (\\(\\mathrm{V_2O_5}\\), \\(\\mathrm{TiCl_4}\\)), d¹⁰ (Cu⁺, Zn²⁺, Ni(CO)₄), low-spin d⁶, square planar d⁸.\n" +
        "- Cu²⁺ in any complex (Fehling's solution, \\(\\mathrm{[Cu(NH_3)_4]^{2+}}\\)) has 1 unpaired electron: 1.73 BM.",
      formula: {
        label: "Spin-only magnetic moment",
        latex: "\\mu_{\\text{spin-only}} = \\sqrt{n(n+2)}\\ \\text{BM}",
      },
      authoredExample: {
        prompt: "Find the spin-only magnetic moment of \\(\\mathrm{[V(H_2O)_6]^{3+}}\\).",
        steps: [
          "\\(x + 0 = +3\\): vanadium is +3. V is in group 5, so V³⁺ is d².",
          "d² has only one octahedral configuration, \\(t_{2g}^2\\): n = 2.",
          "\\(\\mu = \\sqrt{2 \\times 4} = \\sqrt{8} = 2.83\\) BM.",
        ],
        answer: "2.83 BM",
      },
      selfCheckExample: {
        prompt: "An octahedral cobalt complex with a weak-field ligand has a spin-only moment of 4.90 BM. What is the oxidation state of cobalt?",
        steps: [
          "\\(\\sqrt{n(n+2)} = 4.90\\) gives \\(n(n+2) = 24\\), so n = 4.",
          "High-spin configurations with 4 unpaired electrons are d⁴ and d⁶. Cobalt (group 9) is d⁶ as Co³⁺.",
          "Co²⁺ would be d⁷ with 3 unpaired (3.87 BM), so it does not fit.",
        ],
        answer: "+3 (high-spin d⁶, as in \\(\\mathrm{[CoF_6]^{3-}}\\))",
      },
      practiceSet: [
        { prompt: "What is the spin-only moment for 5 unpaired electrons?", answer: "5.92 BM" },
        { prompt: "A complex has \\(\\mu = 2.83\\) BM. How many unpaired electrons does it have?", answer: "2" },
        { prompt: "What is the spin-only moment of \\(\\mathrm{[Ti(H_2O)_6]^{3+}}\\)?", answer: "1.73 BM" },
        { prompt: "What is the spin-only moment of \\(\\mathrm{[Zn(NH_3)_4]^{2+}}\\)?", answer: "0 (diamagnetic)" },
      ],
      pyqExampleId: "71ea2ad7-d1c7-41af-b379-0ea185d64c20", // 2025 — spin-only moments of K3[Fe(OH)6] and K4[Fe(OH)6]
      traps: [
        {
          title: "Copper(I) is diamagnetic",
          body: "CuI and \\(\\mathrm{K_3[Cu(CN)_4]}\\) contain Cu⁺, which is d¹⁰, so their moment is 0, not 1.73 BM. Only copper(II) has one unpaired electron.",
        },
        {
          title: "Watch the units the answer is asked in",
          body: "2.83 BM written in units of \\(10^{-1}\\) BM is 28. Writing 3 (rounded BM) or 283 in that blank loses the mark.",
        },
        {
          title: "The same oxidation state does not explain different moments",
          body: "Fe is +3 in both \\(\\mathrm{[Fe(CN)_6]^{3-}}\\) (1.73 BM) and \\(\\mathrm{[Fe(H_2O)_6]^{3+}}\\) (5.92 BM). The difference comes from the ligand's field strength, so a reason that cites the common oxidation state is true but not the explanation.",
        },
      ],
    },

    // C2 — ordering moments: the high-spin aqua ladder
    {
      kind: "reference" as const,
      slug: "jccoord-mu-order",
      name: "Unpaired electrons and moments of high-spin aqua ions",
      intuition:
        "Most ordering questions use water or a halide, so the ions are high spin. Then the number of unpaired electrons rises from d¹ to d⁵ and falls again to d¹⁰. Know this ladder and any order of moments is a lookup; a cyanide complex drops to its low-spin count.",
      definition:
        "- High spin (weak field): n rises 1, 2, 3, 4, 5 from d¹ to d⁵ and falls 4, 3, 2, 1, 0 from d⁶ to d¹⁰.\n" +
        "- Low spin with CN⁻: d⁴ 2, d⁵ 1, d⁶ 0, d⁷ 1 unpaired.\n" +
        "- Tetrahedral complexes are high spin: \\(\\mathrm{[MnBr_4]^{2-}}\\) 5, \\(\\mathrm{[CoCl_4]^{2-}}\\) 3, \\(\\mathrm{[NiCl_4]^{2-}}\\) 2.\n" +
        "- The largest moment in a list usually belongs to a d⁵ ion with a weak ligand (Mn²⁺, Fe³⁺).",
      table: {
        columns: ["Aqua ion (high spin)", "d count", "Unpaired electrons", "Spin-only moment (BM)"],
        rows: [
          { cells: ["\\(\\mathrm{Ti^{3+}}\\)", "d¹", "1", "1.73"] },
          { cells: ["\\(\\mathrm{V^{3+}}\\)", "d²", "2", "2.83"] },
          { cells: ["\\(\\mathrm{V^{2+}}\\), \\(\\mathrm{Cr^{3+}}\\)", "d³", "3", "3.87"] },
          { cells: ["\\(\\mathrm{Cr^{2+}}\\), \\(\\mathrm{Mn^{3+}}\\)", "d⁴", "4", "4.90"] },
          { cells: ["\\(\\mathrm{Mn^{2+}}\\), \\(\\mathrm{Fe^{3+}}\\)", "d⁵", "5", "5.92"], noteAmber: "The maximum: a d⁵ ion with a weak-field ligand." },
          { cells: ["\\(\\mathrm{Fe^{2+}}\\), \\(\\mathrm{Co^{3+}}\\) (with F⁻)", "d⁶", "4", "4.90"] },
          { cells: ["\\(\\mathrm{Co^{2+}}\\)", "d⁷", "3", "3.87"] },
          { cells: ["\\(\\mathrm{Ni^{2+}}\\)", "d⁸", "2", "2.83"] },
          { cells: ["\\(\\mathrm{Cu^{2+}}\\)", "d⁹", "1", "1.73"] },
          { cells: ["\\(\\mathrm{Zn^{2+}}\\)", "d¹⁰", "0", "0"] },
        ],
        caption: "Cr³⁺ is 3.87 BM with every ligand, because d³ has only one octahedral configuration.",
      },
      selfCheckExample: {
        prompt: "Which of these has the largest spin-only moment: \\(\\mathrm{[Ti(H_2O)_6]^{3+}}\\), \\(\\mathrm{[Mn(H_2O)_6]^{3+}}\\), \\(\\mathrm{[Ni(H_2O)_6]^{2+}}\\) or \\(\\mathrm{[Co(NH_3)_6]^{3+}}\\)?",
        steps: [
          "Unpaired electrons: Ti³⁺ d¹ 1; Mn³⁺ d⁴ high spin 4; Ni²⁺ d⁸ 2; \\(\\mathrm{[Co(NH_3)_6]^{3+}}\\) low-spin d⁶ 0.",
          "The largest n gives the largest moment.",
        ],
        answer: "\\(\\mathrm{[Mn(H_2O)_6]^{3+}}\\), 4.90 BM",
      },
      practiceSet: [
        { prompt: "How many unpaired electrons does \\(\\mathrm{[Co(H_2O)_6]^{2+}}\\) have?", answer: "3" },
        { prompt: "Which aqua ion is least paramagnetic among Cr²⁺, Mn²⁺, Fe²⁺ and Co²⁺?", answer: "Co²⁺ (3 unpaired)" },
        { prompt: "What is the spin-only moment of \\(\\mathrm{[Cr(CN)_6]^{3-}}\\)?", answer: "3.87 BM" },
        { prompt: "How many unpaired electrons does \\(\\mathrm{[Fe(CN)_6]^{3-}}\\) have?", answer: "1" },
      ],
      pyqExampleId: "c7de63f7-27bc-4d43-b2d8-053ff210eeea", // 2024 — order of moments of [FeF6]3-, [V(H2O)6]2+, [Fe(H2O)6]2+
      traps: [
        {
          title: "Fe²⁺ and Fe³⁺ aqua ions differ by one unpaired electron",
          body: "High-spin Fe³⁺ (d⁵) has 5 unpaired electrons and Fe²⁺ (d⁶) has 4. The extra electron in d⁶ pairs up, so adding an electron here LOWERS the moment.",
        },
        {
          title: "Change of ligand can reverse an order",
          body: "\\(\\mathrm{[FeF_6]^{3-}}\\) (5 unpaired) is above \\(\\mathrm{[CoF_6]^{3-}}\\) (4), but \\(\\mathrm{[Fe(CN)_6]^{3-}}\\) (1) is below \\(\\mathrm{[Mn(CN)_6]^{3-}}\\) (2). Decide the spin state for each complex before ordering.",
        },
      ],
    },

    // C3 — counting paramagnetic species
    {
      kind: "formula" as const,
      slug: "jccoord-para-count",
      name: "Counting paramagnetic species in a list",
      intuition:
        "A species is paramagnetic if it has at least one unpaired electron. For a list, go through each species in turn: oxidation state, d count, spin state, n. Mark it paramagnetic if n > 0. The traps are the diamagnetic ones that look paramagnetic: low-spin d⁶, square planar d⁸, d⁰ and d¹⁰.",
      definition:
        "- Paramagnetic: n ≥ 1. Diamagnetic: n = 0.\n" +
        "- Always diamagnetic: d⁰ (\\(\\mathrm{V_2O_5}\\), \\(\\mathrm{[MnO_4]^-}\\)), d¹⁰, low-spin d⁶ (\\(\\mathrm{[Fe(CN)_6]^{4-}}\\), \\(\\mathrm{[Co(NH_3)_6]^{3+}}\\), \\(\\mathrm{[Co(C_2O_4)_3]^{3-}}\\)), square planar d⁸ (\\(\\mathrm{[Ni(CN)_4]^{2-}}\\), Pt(II)).\n" +
        "- Always paramagnetic: any odd number of d electrons, since odd electrons cannot all pair.\n" +
        "- The answer is a number of SPECIES, not of electrons: count each paramagnetic entry once, however many unpaired electrons it has.",
      formula: {
        label: "Paramagnetic test",
        latex: "n \\geq 1 \\Rightarrow \\text{paramagnetic} \\qquad n = 0 \\Rightarrow \\text{diamagnetic}",
      },
      authoredExample: {
        prompt:
          "How many of these are paramagnetic: \\(\\mathrm{[Fe(CN)_6]^{4-}}\\), \\(\\mathrm{[Cr(CN)_6]^{3-}}\\), \\(\\mathrm{[Zn(NH_3)_4]^{2+}}\\), \\(\\mathrm{[CuCl_4]^{2-}}\\), \\(\\mathrm{[Co(NH_3)_6]^{3+}}\\), \\(\\mathrm{[MnCl_4]^{2-}}\\)?",
        steps: [
          "\\(\\mathrm{[Fe(CN)_6]^{4-}}\\): Fe²⁺ d⁶ low spin, n = 0.",
          "\\(\\mathrm{[Cr(CN)_6]^{3-}}\\): Cr³⁺ d³, n = 3.",
          "\\(\\mathrm{[Zn(NH_3)_4]^{2+}}\\): d¹⁰, n = 0.",
          "\\(\\mathrm{[CuCl_4]^{2-}}\\): Cu²⁺ d⁹, n = 1.",
          "\\(\\mathrm{[Co(NH_3)_6]^{3+}}\\): Co³⁺ d⁶ low spin, n = 0.",
          "\\(\\mathrm{[MnCl_4]^{2-}}\\): Mn²⁺ d⁵ tetrahedral, n = 5.",
        ],
        answer: "3 (the Cr, Cu and Mn complexes).",
      },
      selfCheckExample: {
        prompt:
          "How many of these have an even, non-zero number of unpaired electrons: \\(\\mathrm{[Cr(H_2O)_6]^{3+}}\\), \\(\\mathrm{[Fe(H_2O)_6]^{2+}}\\), \\(\\mathrm{[Ni(NH_3)_6]^{2+}}\\), \\(\\mathrm{[Mn(CN)_6]^{3-}}\\)?",
        steps: [
          "Cr³⁺ d³: 3 (odd).",
          "Fe²⁺ d⁶ high spin: 4 (even).",
          "Ni²⁺ d⁸: 2 (even).",
          "Mn³⁺ d⁴ low spin: 2 (even).",
        ],
        answer: "3",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{[Ti(CN)_6]^{3-}}\\) paramagnetic?", answer: "Yes; Ti³⁺ is d¹" },
        { prompt: "Is \\(\\mathrm{V_2O_5}\\) paramagnetic?", answer: "No; V⁵⁺ is d⁰" },
        { prompt: "Is \\(\\mathrm{[Co(C_2O_4)_3]^{3-}}\\) paramagnetic?", answer: "No; low-spin d⁶" },
        { prompt: "Can a species with an odd number of d electrons be diamagnetic?", answer: "No" },
      ],
      pyqExampleId: "faf1b202-f97b-4f76-b45b-104f4c42194a", // 2026 — paramagnetic count and order of unpaired electrons
      traps: [
        {
          title: "Low-spin d⁶ is diamagnetic",
          body: "\\(\\mathrm{[Fe(CN)_6]^{4-}}\\), \\(\\mathrm{[Co(NH_3)_6]^{3+}}\\) and \\(\\mathrm{[Co(C_2O_4)_3]^{3-}}\\) have all six electrons paired in t₂g. Counting them as paramagnetic because 'iron and cobalt are magnetic' is the commonest slip in these lists.",
        },
        {
          title: "Ferricyanide has one unpaired electron",
          body: "\\(\\mathrm{[Fe(CN)_6]^{3-}}\\) is low-spin d⁵, \\(t_{2g}^5\\): one unpaired electron, so it is paramagnetic, while ferrocyanide is not.",
        },
      ],
    },
  ],
};
