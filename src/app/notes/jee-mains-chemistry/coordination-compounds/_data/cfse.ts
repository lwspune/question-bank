import type { SubtopicNote } from "@/app/notes/_types";

export const CFSE_COORD_NOTE: SubtopicNote = {
  subtopicName: "High and Low Spin Configurations and CFSE",
  title: "High and Low Spin Configurations and CFSE",
  oneLineDefinition:
    "Electrons fill t₂g before eg, and pair up in t₂g only when the splitting beats the pairing energy; the resulting configuration fixes the unpaired electrons and the crystal field stabilisation energy, −0.4Δₒ for each t₂g electron and +0.6Δₒ for each eg electron.",
  whyItMatters:
    "Thirty-four PYQs, twenty-five of them multiple choice, and eight from 2026. Fifteen write the t₂g/eg configuration of a complex and count its unpaired electrons or its electrons in one set; five do the same for a tetrahedral complex; fourteen compute or compare crystal field stabilisation energies.",
  concepts: [
    // C1 — high spin vs low spin configurations
    {
      kind: "formula" as const,
      slug: "jccoord-spin-state",
      name: "High-spin and low-spin octahedral configurations",
      intuition:
        "The first three electrons go one each into the three t₂g orbitals. The fourth has a choice: pair up in t₂g, paying the pairing energy P, or climb to eg, paying \\(\\Delta_o\\). It takes the cheaper route. A strong-field ligand makes \\(\\Delta_o > P\\), so electrons pair in t₂g (low spin); a weak-field ligand makes \\(\\Delta_o < P\\), so they spread out (high spin).",
      definition:
        "- \\(\\Delta_o > P\\): low spin. \\(\\Delta_o < P\\): high spin.\n" +
        "- d¹, d², d³, d⁸, d⁹, d¹⁰ have only one octahedral configuration. The choice exists only for d⁴ to d⁷.\n" +
        "- High spin: d⁴ \\(t_{2g}^3e_g^1\\) (4 unpaired), d⁵ \\(t_{2g}^3e_g^2\\) (5), d⁶ \\(t_{2g}^4e_g^2\\) (4), d⁷ \\(t_{2g}^5e_g^2\\) (3).\n" +
        "- Low spin: d⁴ \\(t_{2g}^4\\) (2 unpaired), d⁵ \\(t_{2g}^5\\) (1), d⁶ \\(t_{2g}^6\\) (0), d⁷ \\(t_{2g}^6e_g^1\\) (1).\n" +
        "- Cobalt(II) with ammonia and air is oxidised to diamagnetic \\(\\mathrm{[Co(NH_3)_6]^{3+}}\\), \\(t_{2g}^6\\).\n" +
        "- Jahn–Teller: d⁹ Cu²⁺ has an unevenly filled eg set and distorts; the distortion is largest when the ligand set itself is uneven, as in trans-\\(\\mathrm{[Cu(en)_2Cl_2]}\\).",
      formula: {
        label: "Spin state criterion",
        latex: "\\Delta_o > P \\Rightarrow \\text{low spin } (t_{2g} \\text{ filled first}) \\qquad \\Delta_o < P \\Rightarrow \\text{high spin}",
      },
      authoredExample: {
        prompt: "Write the high-spin and the low-spin octahedral configurations of Co²⁺ and give the unpaired electrons in each.",
        steps: [
          "Co²⁺ is 3d⁷.",
          "High spin: three electrons singly in t₂g, two singly in eg, then two more pair in t₂g: \\(t_{2g}^5e_g^2\\), 3 unpaired.",
          "Low spin: six electrons fill t₂g completely, the seventh goes to eg: \\(t_{2g}^6e_g^1\\), 1 unpaired.",
        ],
        answer: "High spin \\(t_{2g}^5e_g^2\\), 3 unpaired; low spin \\(t_{2g}^6e_g^1\\), 1 unpaired.",
      },
      selfCheckExample: {
        prompt: "Write the configurations of \\(\\mathrm{[Mn(H_2O)_6]^{2+}}\\) and \\(\\mathrm{[Mn(CN)_6]^{4-}}\\) and count their unpaired electrons.",
        steps: [
          "Both contain Mn²⁺, 3d⁵.",
          "Water is weak field: high spin, \\(t_{2g}^3e_g^2\\), 5 unpaired.",
          "Cyanide is strong field: low spin, \\(t_{2g}^5\\), 1 unpaired.",
        ],
        answer: "\\(t_{2g}^3e_g^2\\) with 5 unpaired; \\(t_{2g}^5\\) with 1 unpaired.",
      },
      practiceSet: [
        { prompt: "Write the low-spin configuration of a d⁴ octahedral ion.", answer: "\\(t_{2g}^4e_g^0\\), 2 unpaired" },
        { prompt: "Which d counts have only one octahedral configuration?", answer: "d¹, d², d³, d⁸, d⁹, d¹⁰" },
        { prompt: "How many electrons are in the eg set of \\(\\mathrm{[Co(NH_3)_6]^{3+}}\\)?", answer: "0" },
        { prompt: "Does \\(t_{2g}^4e_g^2\\) belong to a strong- or a weak-field d⁶ complex?", answer: "Weak field (high spin)" },
      ],
      pyqExampleId: "fa54b6f0-513d-47bd-b909-600af972a122", // 2026 — unpaired electrons of low-spin Mn3+, Cr3+, Fe3+, Co3+
      traps: [
        {
          title: "t₂g³eg¹ is the weak-field configuration",
          body: "Putting the fourth electron in eg means the pairing energy was larger than \\(\\Delta_o\\): a weak-field ligand and a high-spin complex. The strong-field d⁴ configuration is \\(t_{2g}^4\\).",
        },
        {
          title: "Pairs and unpaired electrons are different counts",
          body: "Low-spin \\(\\mathrm{[Fe(CN)_6]^{4-}}\\) has six t₂g electrons: 3 PAIRS and 0 unpaired. Read whether the question wants electrons, pairs or unpaired electrons.",
        },
      ],
    },

    // C2 — tetrahedral configurations
    {
      kind: "reference" as const,
      slug: "jccoord-tetrahedral",
      name: "Tetrahedral configurations and their CFSE",
      intuition:
        "In a tetrahedron the lower set is e (two orbitals) and the upper set is t₂ (three). The gap is only 4/9 of the octahedral one, too small to force pairing, so every tetrahedral complex is high spin. Fill e singly, then t₂ singly, then pair e, then pair t₂.",
      definition:
        "- Order of filling: e¹, e², then t₂¹ to t₂³, then e³, e⁴, then t₂⁴ to t₂⁶.\n" +
        "- CFSE \\(= (-0.6\\,n_e + 0.4\\,n_{t_2})\\Delta_t\\).\n" +
        "- Examples: d⁰ \\(\\mathrm{TiCl_4}\\), \\(\\mathrm{[MnO_4]^-}\\); d¹ \\(\\mathrm{[MnO_4]^{2-}}\\); d² \\(\\mathrm{[FeO_4]^{2-}}\\); d⁵ \\(\\mathrm{[FeCl_4]^-}\\), \\(\\mathrm{[MnBr_4]^{2-}}\\); d⁶ \\(\\mathrm{[FeCl_4]^{2-}}\\); d⁷ \\(\\mathrm{[CoCl_4]^{2-}}\\); d⁸ \\(\\mathrm{[NiCl_4]^{2-}}\\), \\(\\mathrm{[Ni(PPh_3)_2Cl_2]}\\); d¹⁰ \\(\\mathrm{Ni(CO)_4}\\).\n" +
        "- A tetrahedral CFSE is in \\(\\Delta_t\\), not \\(\\Delta_o\\): d⁸ gives \\(-0.8\\Delta_t\\).",
      table: {
        columns: ["d count", "Configuration", "Unpaired electrons", "CFSE"],
        rows: [
          { cells: ["d⁰", "\\(e^0t_2^0\\)", "0", "0"] },
          { cells: ["d¹", "\\(e^1t_2^0\\)", "1", "\\(-0.6\\Delta_t\\)"] },
          { cells: ["d²", "\\(e^2t_2^0\\)", "2", "\\(-1.2\\Delta_t\\)"] },
          { cells: ["d³", "\\(e^2t_2^1\\)", "3", "\\(-0.8\\Delta_t\\)"] },
          { cells: ["d⁴", "\\(e^2t_2^2\\)", "4", "\\(-0.4\\Delta_t\\)"] },
          { cells: ["d⁵", "\\(e^2t_2^3\\)", "5", "0"] },
          { cells: ["d⁶", "\\(e^3t_2^3\\)", "4", "\\(-0.6\\Delta_t\\)"] },
          { cells: ["d⁷", "\\(e^4t_2^3\\)", "3", "\\(-1.2\\Delta_t\\)"] },
          { cells: ["d⁸", "\\(e^4t_2^4\\)", "2", "\\(-0.8\\Delta_t\\)"] },
          { cells: ["d¹⁰", "\\(e^4t_2^6\\)", "0", "0"] },
        ],
        caption: "Tetrahedral complexes are always high spin, so each d count has exactly one row.",
      },
      selfCheckExample: {
        prompt: "Write the configuration of \\(\\mathrm{[NiCl_4]^{2-}}\\) as \\(e^m t_2^n\\), and give its unpaired electrons and its CFSE.",
        steps: [
          "Ni²⁺ is d⁸; the complex is tetrahedral, so it is high spin.",
          "Fill: e takes 4 (two pairs), t₂ takes 4 (one pair and two singles): \\(e^4t_2^4\\).",
          "Unpaired: 2. CFSE \\(= (-0.6 \\times 4 + 0.4 \\times 4)\\Delta_t = -0.8\\Delta_t\\).",
        ],
        answer: "\\(e^4t_2^4\\); 2 unpaired; CFSE \\(-0.8\\Delta_t\\).",
      },
      practiceSet: [
        { prompt: "How many electrons are in the t₂ set of \\(\\mathrm{[FeO_4]^{2-}}\\)?", answer: "0 (Fe(VI), d², \\(e^2\\))" },
        { prompt: "What is the CFSE of a tetrahedral d⁵ ion?", answer: "0" },
        { prompt: "Write the configuration of \\(\\mathrm{[FeCl_4]^-}\\).", answer: "\\(e^2t_2^3\\)" },
        { prompt: "Why are tetrahedral complexes almost never low spin?", answer: "\\(\\Delta_t\\) is only 4/9 of \\(\\Delta_o\\), smaller than the pairing energy" },
      ],
      pyqExampleId: "fd0e83e7-7f61-4e46-9346-d02f179ac8c9", // 2023 — e^m t2^n of [CoCl4]2- plus unpaired electrons
      traps: [
        {
          title: "In a tetrahedron, e is filled first",
          body: "The lower set is e, not t₂. Writing a tetrahedral d⁷ ion as \\(t_2^4e^3\\) copies the octahedral order and gets the configuration and the CFSE wrong. It is \\(e^4t_2^3\\), CFSE \\(-1.2\\Delta_t\\).",
        },
        {
          title: "A tetrahedral CFSE is measured in Δt",
          body: "Paramagnetic \\(\\mathrm{[Ni(PPh_3)_2Cl_2]}\\) is tetrahedral, so its CFSE is \\(-0.8\\Delta_t\\), not \\(-0.8\\Delta_o\\). A statement giving it in \\(\\Delta_o\\) is incorrect.",
        },
      ],
    },

    // C3 — CFSE
    {
      kind: "formula" as const,
      slug: "jccoord-cfse",
      name: "Crystal field stabilisation energy of octahedral complexes",
      intuition:
        "Each electron in a lower t₂g orbital saves \\(0.4\\Delta_o\\); each in an upper eg orbital costs \\(0.6\\Delta_o\\). Add them up and you have the crystal field stabilisation energy. It is largest for low-spin d⁶, where six electrons all sit low, and zero for high-spin d⁵ and for d¹⁰, where the gains and costs cancel.",
      definition:
        "- \\(\\text{CFSE} = (-0.4\\,n_{t_{2g}} + 0.6\\,n_{e_g})\\Delta_o\\), plus \\(mP\\) for each extra pair forced by low spin if the question asks for it.\n" +
        "- High spin: d¹ −0.4, d² −0.8, d³ −1.2, d⁴ −0.6, d⁵ 0, d⁶ −0.4, d⁷ −0.8, d⁸ −1.2, d⁹ −0.6, d¹⁰ 0 (in \\(\\Delta_o\\)).\n" +
        "- Low spin: d⁴ −1.6, d⁵ −2.0, d⁶ −2.4, d⁷ −1.8.\n" +
        "- To compare real complexes, the CFSE also scales with \\(\\Delta_o\\): stronger ligand, higher metal charge and chelation all raise it. \\(\\mathrm{[Co(en)_3]^{3+} > [Co(NH_3)_6]^{3+}}\\).\n" +
        "- Working backwards: CFSE \\(-0.8\\Delta_o\\) with 3 unpaired electrons is high-spin d⁷ (\\(t_{2g}^5e_g^2\\)), as in Co²⁺.",
      formula: {
        label: "Octahedral CFSE",
        latex: "\\text{CFSE} = \\left(-0.4\\,n_{t_{2g}} + 0.6\\,n_{e_g}\\right)\\Delta_o",
      },
      authoredExample: {
        prompt: "Find the CFSE, in units of \\(\\Delta_o\\), of \\(\\mathrm{[V(H_2O)_6]^{3+}}\\) and of low-spin \\(\\mathrm{[Mn(CN)_6]^{3-}}\\), ignoring pairing energy.",
        steps: [
          "V³⁺ is d²: \\(t_{2g}^2\\). CFSE \\(= 2(-0.4)\\Delta_o = -0.8\\Delta_o\\).",
          "Mn³⁺ is d⁴; cyanide gives low spin, \\(t_{2g}^4\\). CFSE \\(= 4(-0.4)\\Delta_o = -1.6\\Delta_o\\).",
        ],
        answer: "\\(-0.8\\Delta_o\\) and \\(-1.6\\Delta_o\\).",
      },
      selfCheckExample: {
        prompt: "Arrange \\(\\mathrm{[Cr(H_2O)_6]^{2+}}\\), \\(\\mathrm{[Ni(H_2O)_6]^{2+}}\\) and \\(\\mathrm{[Fe(CN)_6]^{4-}}\\) by increasing magnitude of CFSE in \\(\\Delta_o\\) units.",
        steps: [
          "\\(\\mathrm{[Cr(H_2O)_6]^{2+}}\\): d⁴ high spin, \\(t_{2g}^3e_g^1\\): \\(-1.2 + 0.6 = -0.6\\Delta_o\\).",
          "\\(\\mathrm{[Ni(H_2O)_6]^{2+}}\\): d⁸, \\(t_{2g}^6e_g^2\\): \\(-2.4 + 1.2 = -1.2\\Delta_o\\).",
          "\\(\\mathrm{[Fe(CN)_6]^{4-}}\\): d⁶ low spin, \\(t_{2g}^6\\): \\(-2.4\\Delta_o\\).",
        ],
        answer: "\\(\\mathrm{[Cr(H_2O)_6]^{2+} < [Ni(H_2O)_6]^{2+} < [Fe(CN)_6]^{4-}}\\)",
      },
      practiceSet: [
        { prompt: "What is the CFSE of a d¹⁰ octahedral ion?", answer: "0" },
        { prompt: "What is the CFSE of low-spin d⁶ in \\(\\Delta_o\\) units, ignoring P?", answer: "\\(-2.4\\Delta_o\\)" },
        { prompt: "Which high-spin d count besides d¹⁰ has zero CFSE?", answer: "d⁵" },
        { prompt: "What is the CFSE of \\(\\mathrm{[Ti(H_2O)_6]^{3+}}\\)?", answer: "\\(-0.4\\Delta_o\\)" },
      ],
      pyqExampleId: "1f3b3b0a-2838-4386-ad9a-9f8384c02fbc", // 2025 — configuration with the highest CFSE
      traps: [
        {
          title: "CFSE is not the splitting energy",
          body: "For \\(\\mathrm{[Ti(H_2O)_6]^{3+}}\\) (d¹) the CFSE is \\(-0.4\\Delta_o\\), so \\(\\Delta_o\\) is 2.5 times the CFSE magnitude. The light absorbed matches \\(\\Delta_o\\), not the CFSE.",
        },
        {
          title: "Zero CFSE means high-spin d⁵ or d¹⁰",
          body: "A complex with 'CFSE = 0' and a moment near 5.9 BM has five unpaired electrons: high-spin d⁵, such as Mn²⁺ or Fe³⁺ with a weak ligand like SCN⁻. The splitting itself is not zero.",
        },
        {
          title: "Rules of thumb can clash with the numbers",
          body: "A 2021 key ordered CFSE as \\(\\mathrm{[Co(H_2O)_6]^{2+} < [CoF_6]^{3-} < [Co(NH_3)_6]^{3+} < [Co(en)_3]^{3+}}\\), putting the +2 ion lowest by charge. In \\(\\Delta_o\\) units the Co²⁺ aqua ion is \\(-0.8\\Delta_o\\) and \\(\\mathrm{[CoF_6]^{3-}}\\) only \\(-0.4\\Delta_o\\). Use the charge rule when comparing the SAME configuration.",
        },
      ],
    },
  ],
};
