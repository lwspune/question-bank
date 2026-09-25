import type { SubtopicNote } from "@/app/notes/_types";

export const BONDING_AND_STABILITY_NOTE: SubtopicNote = {
  subtopicName: "Bonding Theories, EAN, Crystal Field, Hybridization and Magnetism",
  title: "Bonding in Complexes: Hybridisation, Magnetism, EAN and Stability",
  oneLineDefinition:
    "Valence bond theory reads a complex's geometry and hybridisation from the metal's d-electron count and the ligand's field strength — a strong-field ligand pairs the d electrons and gives an inner-orbital, low-spin complex — the unpaired electrons left over fix the spin-only magnetic moment, the effective atomic number counts the electrons around the metal after the ligands donate, and the stability of complexes with one ligand follows the metal's charge and the Irving–Williams order.",
  whyItMatters:
    "21 PYQs, none HARD. Six are hybridisation and geometry — dsp² square planar [Ni(CN)₄]²⁻, asked four times, and d²sp³ [Co(NH₃)₆]³⁺, twice; five are unpaired electrons and the magnetic moment — zero in [Co(NH₃)₆]³⁺, four in [CoF₆]³⁻, 1.73 BM for one electron; five compute an EAN; five are stability orders. " +
    "Four cards.",
  concepts: [
    // 1 — hybridisation and geometry
    {
      kind: "formula" as const,
      slug: "cetcc-hybridisation-and-geometry",
      name: "Hybridisation and Geometry from d Electrons and Field Strength",
      intuition:
        "Four steps. (1) Find the metal's oxidation state and its d-electron count: Ni²⁺ is 3d⁸, Co³⁺ is 3d⁶, Fe²⁺ is 3d⁶, Zn²⁺ is 3d¹⁰. (2) Decide whether the ligand is strong field (CN⁻, CO, en, NH₃ with Co³⁺) or weak (halides, H₂O). A strong-field ligand pairs up the d electrons and frees inner 3d orbitals. (3) Count the orbitals needed — one per ligand. (4) Name them. [Ni(CN)₄]²⁻: pairing the eight d electrons frees one 3d orbital, so 3d + 4s + two 4p gives dsp², square planar. [Co(NH₃)₆]³⁺: pairing the six electrons into three orbitals frees two 3d, giving d²sp³, an inner-orbital octahedron. [CoF₆]³⁻: F⁻ does not pair, so the outer 4d is used — sp³d², outer-orbital.",
      definition:
        "- **Coordination number 4**: \\(dsp^2\\) square planar (d⁸ with strong field: \\([\\text{Ni(CN)}_4]^{2-}\\), all Pt(II) complexes such as cisplatin); \\(sp^3\\) tetrahedral (\\([\\text{NiCl}_4]^{2-}\\), \\(\\text{Ni(CO)}_4\\), \\([\\text{Zn(NH}_3)_4]^{2+}\\)); \\([\\text{Cu(NH}_3)_4]^{2+}\\) is square planar.\n" +
        "- **Coordination number 6**: \\(d^2sp^3\\) inner-orbital, low spin (\\([\\text{Co(NH}_3)_6]^{3+}\\), \\([\\text{Fe(CN)}_6]^{4-}\\), \\([\\text{Fe(CN)}_6]^{3-}\\)); \\(sp^3d^2\\) outer-orbital, high spin (\\([\\text{CoF}_6]^{3-}\\), \\([\\text{FeF}_6]^{3-}\\)).\n" +
        "- **Coordination number 2**: \\(sp\\) linear (\\([\\text{Ag(NH}_3)_2]^+\\), \\([\\text{Ag(CN)}_2]^-\\)).\n" +
        "- Crystal field view of the same fact: in an octahedron the d orbitals split into \\(t_{2g}\\) (lower) and \\(e_g\\) (upper); a strong-field ligand makes the gap larger than the pairing energy, so \\([\\text{Co(NH}_3)_6]^{3+}\\) is \\(t_{2g}^6e_g^0\\).",
      formula: {
        label: "Hybridisation by coordination number",
        latex:
          "\\text{CN } 2: sp;\\quad \\text{CN } 4: sp^3 \\text{ (tetrahedral)},\\ dsp^2 \\text{ (square planar)};\\quad \\text{CN } 6: d^2sp^3 \\text{ (inner)},\\ sp^3d^2 \\text{ (outer)}",
      },
      authoredExample: {
        prompt: "Predict the hybridisation and geometry of [Fe(CN)₆]³⁻.",
        steps: [
          "Fe³⁺ is 3d⁵. CN⁻ is strong field: the five electrons pair into three 3d orbitals (one unpaired left), freeing two 3d.",
          "Six ligands use 2 × 3d + 4s + 3 × 4p.",
        ],
        answer: "d²sp³, octahedral, inner-orbital",
      },
      selfCheckExample: {
        prompt: "Which coordination entity is square planar: [Co(NH₃)₅H₂O]I₃, [Co(NH₃)₅CO₃]Cl, [Ni(CN)₄]²⁻, [Co(NH₃)₃(NO₂)₃]?",
        steps: [
          "The three cobalt complexes are six-coordinate octahedra. Ni²⁺ d⁸ with strong-field CN⁻ is dsp².",
        ],
        answer: "[Ni(CN)₄]²⁻",
      },
      practiceSet: [
        { prompt: "Hybridisation of [Ni(CN)₄]²⁻?", answer: "dsp²" },
        { prompt: "Hybridisation of hexaamminecobalt(III)?", answer: "d²sp³" },
        { prompt: "Hybridisation of [CoF₆]³⁻?", answer: "sp³d² (outer orbital)" },
        { prompt: "Geometry of [Zn(NH₃)₄]²⁺?", answer: "Tetrahedral (sp³)" },
      ],
      pyqExampleId: "247e97b7-ce98-4dbd-a807-7fe48e9599ae",
      traps: [
        {
          title: "Calling every four-coordinate complex tetrahedral",
          body:
            "Four ligands can be tetrahedral (sp³) OR square planar (dsp²). A d⁸ ion with a strong-field ligand — [Ni(CN)₄]²⁻, every Pt(II) complex — is square planar.",
        },
      ],
    },

    // 2 — unpaired electrons and magnetic moment
    {
      kind: "formula" as const,
      slug: "cetcc-unpaired-electrons-and-magnetism",
      name: "Unpaired Electrons and the Spin-Only Magnetic Moment",
      intuition:
        "The same Co³⁺ ion (3d⁶, four unpaired as a free ion) is diamagnetic in [Co(NH₃)₆]³⁺ and strongly paramagnetic in [CoF₆]³⁻. NH₃ pairs all six electrons into t₂g — zero unpaired, low spin, diamagnetic. F⁻ is weak, so the electrons spread over all five d orbitals as in the free ion — four unpaired, high spin. Once n is known, the spin-only moment is √(n(n+2)) Bohr magnetons: one unpaired electron gives √3 = 1.73 BM.",
      definition:
        "- **Low spin** (strong field): \\([\\text{Co(NH}_3)_6]^{3+}\\) 0 unpaired, diamagnetic; \\([\\text{Fe(CN)}_6]^{4-}\\) 0; \\([\\text{Fe(CN)}_6]^{3-}\\) 1; \\([\\text{Ni(CN)}_4]^{2-}\\) 0.\n" +
        "- **High spin** (weak field): \\([\\text{CoF}_6]^{3-}\\) 4 unpaired; \\([\\text{FeF}_6]^{3-}\\) 5; \\([\\text{NiCl}_4]^{2-}\\) 2.\n" +
        "- Free \\(\\text{Co}^{3+}\\) (before hybridisation) has **4** unpaired electrons; in \\([\\text{Co(NH}_3)_6]^{3+}\\) all are paired, so it is diamagnetic and **not** high spin.\n" +
        "- Spin-only moments: n = 1 → 1.73 BM; 2 → 2.83; 3 → 3.87; 4 → 4.90; 5 → 5.92.",
      formula: {
        label: "Spin-only magnetic moment",
        latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
      },
      authoredExample: {
        prompt: "Find the spin-only magnetic moment of [FeF₆]³⁻.",
        steps: [
          "Fe³⁺ is 3d⁵; F⁻ is weak field, so all five electrons stay unpaired.",
          "μ = √(5 × 7) = √35 ≈ 5.92 BM.",
        ],
        answer: "5.92 BM",
      },
      selfCheckExample: {
        prompt: "How many unpaired electrons are there in [CoF₆]³⁻?",
        steps: [
          "Co³⁺ d⁶ with weak-field F⁻: high spin, t₂g⁴e_g², four unpaired.",
        ],
        answer: "4",
      },
      practiceSet: [
        { prompt: "Unpaired electrons in [Co(NH₃)₆]³⁺?", answer: "Zero" },
        { prompt: "Spin-only moment for one unpaired electron?", answer: "1.73 BM" },
        { prompt: "Which is NOT correct about [Co(NH₃)₆]³⁺: all electrons paired, diamagnetic, high spin?", answer: "High spin — it is low spin" },
      ],
      pyqExampleId: "65fdb1b0-7b47-4169-b9a8-fe0d0ef437d9",
      traps: [
        {
          title: "Using the free-ion count for a strong-field complex",
          body:
            "Co³⁺ has four unpaired electrons only before the ligands arrive. With NH₃ or CN⁻ they pair — [Co(NH₃)₆]³⁺ has zero. Decide the ligand's field strength before counting.",
        },
      ],
    },

    // 3 — EAN
    {
      kind: "formula" as const,
      slug: "cetcc-effective-atomic-number",
      name: "Effective Atomic Number (EAN)",
      intuition:
        "Count the electrons around the metal in the complex: start from its atomic number, take away the electrons it lost to reach its oxidation state, and add two for every donor atom. Many stable complexes land on 36, krypton's count: [Fe(CN)₆]⁴⁻ is 26 − 2 + 12, [Co(NH₃)₆]³⁺ is 27 − 3 + 12, [Zn(NH₃)₄]²⁺ is 30 − 2 + 8. Not every complex does — [Cu(NH₃)₄]²⁺ is 29 − 2 + 8 = 35 — so compute, do not assume 36.",
      definition:
        "- \\(\\text{EAN} = Z - \\text{oxidation state} + 2 \\times \\text{coordination number}\\).\n" +
        "- 36: \\([\\text{Fe(CN)}_6]^{4-}\\) (Z 26), \\([\\text{Co(NH}_3)_6]^{3+}\\) (Z 27), \\([\\text{Zn(NH}_3)_4]^{2+}\\) (Z 30), \\(\\text{Ni(CO)}_4\\) (Z 28), \\(\\text{Cr(CO)}_6\\) (Z 24).\n" +
        "- Not 36: \\([\\text{Cu(NH}_3)_4]^{2+}\\) **35**; \\([\\text{Fe(CN)}_6]^{3-}\\) 35; \\([\\text{Ag(NH}_3)_2]^+\\) 50.",
      formula: {
        label: "EAN",
        latex: "\\text{EAN} = Z - x + 2\\,\\text{CN}",
      },
      authoredExample: {
        prompt: "Calculate the EAN of Ni in Ni(CO)₄ and of Pt in [PtCl₆]²⁻ (Z: Ni 28, Pt 78).",
        steps: [
          "Ni(CO)₄: 28 − 0 + 2 × 4 = 36.",
          "[PtCl₆]²⁻: Pt is +4, so 78 − 4 + 2 × 6 = 86.",
        ],
        answer: "36; 86",
      },
      selfCheckExample: {
        prompt: "What is the EAN of iron in Fe(CO)₅ (Z = 26)?",
        steps: [
          "26 − 0 + 2 × 5 = 36.",
        ],
        answer: "36",
      },
      practiceSet: [
        { prompt: "EAN of Cu in [Cu(NH₃)₄]²⁺ (Z = 29)?", answer: "35" },
        { prompt: "EAN of Zn in [Zn(NH₃)₄]²⁺?", answer: "36" },
        { prompt: "EAN of the metal in hexacyanoferrate(II)?", answer: "36" },
      ],
      pyqExampleId: "fd443733-4819-4aeb-8f71-736d652e62b8",
      traps: [
        {
          title: "Adding one electron per ligand, or per bidentate ligand",
          body:
            "Each donor atom gives a PAIR, so add 2 × coordination number. With en or oxalate count donor atoms, not ligands: [Co(en)₃]³⁺ is 27 − 3 + 12 = 36.",
        },
      ],
    },

    // 4 — stability
    {
      kind: "formula" as const,
      slug: "cetcc-stability-order",
      name: "Stability of Complexes: Metal Charge and the Irving–Williams Order",
      intuition:
        "Stability is about how tightly the metal holds its ligands. Two rules cover the paper. First, with the same ligand, the divalent first-row ions follow the Irving–Williams order Mn²⁺ < Fe²⁺ < Co²⁺ < Ni²⁺ < Cu²⁺, and the textbook adds Cd²⁺ at the bottom: Cu²⁺ > Ni²⁺ > Co²⁺ > Fe²⁺ > Mn²⁺ > Cd²⁺. Second, a higher charge on the metal holds ligands more firmly, so a Co³⁺ complex outranks a Cu²⁺ one, which outranks an Ag⁺ one. Chelating ligands (en, oxalate, EDTA) also give more stable complexes than the same number of monodentate ones.",
      definition:
        "- **Same ligand, divalent ions**: \\(\\text{Cu}^{2+} > \\text{Ni}^{2+} > \\text{Co}^{2+} > \\text{Fe}^{2+} > \\text{Mn}^{2+} > \\text{Cd}^{2+}\\). Most stable \\(\\text{Cu}^{2+}\\); least stable \\(\\text{Cd}^{2+}\\).\n" +
        "- **Higher metal charge → more stable**: \\([\\text{Co(NH}_3)_6]^{3+} > [\\text{Cu(CN)}_4]^{2-} > [\\text{Ag(CN)}_2]^-\\) (Co³⁺ > Cu²⁺ > Ag⁺), the paper's keyed order.\n" +
        "- **Chelate effect**: \\([\\text{Ni(en)}_3]^{2+}\\) is more stable than \\([\\text{Ni(NH}_3)_6]^{2+}\\).\n" +
        "- Stability is measured by the overall formation constant \\(\\beta\\); a larger \\(\\beta\\) means a more stable complex.",
      formula: {
        label: "Irving–Williams order (same ligand)",
        latex:
          "\\text{Cu}^{2+} > \\text{Ni}^{2+} > \\text{Co}^{2+} > \\text{Fe}^{2+} > \\text{Mn}^{2+} > \\text{Cd}^{2+}",
      },
      authoredExample: {
        prompt: "Arrange the complexes of Ni²⁺, Mn²⁺ and Cu²⁺ with ethylenediamine in decreasing stability.",
        steps: [
          "Same ligand, so the Irving–Williams order decides: Cu²⁺ > Ni²⁺ > Mn²⁺.",
        ],
        answer: "Cu²⁺ > Ni²⁺ > Mn²⁺",
      },
      selfCheckExample: {
        prompt: "Which cation forms the least stable complex with a given ligand: Co²⁺, Fe²⁺, Cd²⁺, Cu²⁺?",
        steps: [
          "Cd²⁺ sits at the bottom of the textbook order.",
        ],
        answer: "Cd²⁺",
      },
      practiceSet: [
        { prompt: "Most stable complex with the same ligand: Cu²⁺, Co²⁺, Mn²⁺, Fe²⁺?", answer: "Cu²⁺" },
        { prompt: "Decreasing stability: Co²⁺, Fe²⁺, Mn²⁺?", answer: "Co²⁺ > Fe²⁺ > Mn²⁺" },
        { prompt: "Decreasing stability: Cu²⁺, Mn²⁺, Cd²⁺?", answer: "Cu²⁺ > Mn²⁺ > Cd²⁺" },
      ],
      pyqExampleId: "139fd0f3-d777-48d7-bf4f-189fcb61c05c",
      traps: [
        {
          title: "Ranking by atomic number",
          body:
            "Stability rises from Mn²⁺ to Cu²⁺ but it is not 'heavier is more stable': Cd²⁺ is heavier than all of them and forms the least stable complexes.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Ligands — the spectrochemical series that decides spin",
      href: "/notes/mht-cet-chemistry/coordination-compounds/cetcc-ligands",
    },
    {
      label: "Nomenclature — oxidation state and coordination number",
      href: "/notes/mht-cet-chemistry/coordination-compounds/cetcc-nomenclature",
    },
  ],
};
