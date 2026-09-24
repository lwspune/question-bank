import type { SubtopicNote } from "@/app/notes/_types";

export const DEFECTS_AND_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Crystal Defects, Magnetic Properties and Semiconductors",
  title: "Crystal Defects, Magnetic Properties and Semiconductors",
  oneLineDefinition:
    "Real crystals carry point defects — missing ions (Schottky), displaced ions (Frenkel), foreign atoms in place of or between the host atoms — and their electrical and magnetic behaviour follows from the band gap and from unpaired electrons.",
  whyItMatters:
    "15 PYQs, all EASY or MODERATE, all recall. Name the defect from its description or from an alloy (brass, stainless steel), pick the dopant that makes Si or Ge n-type or p-type, spot the ferromagnetic substance in a list, read a conductor off a band-gap table. " +
    "Three short tables cover the lot.",
  concepts: [
    // 1 — point defects
    {
      kind: "reference" as const,
      slug: "cetss-point-defects",
      name: "Point Defects: Schottky, Frenkel, Impurity and Non-Stoichiometric",
      intuition:
        "A defect is a break in the pattern at one lattice site. Either something is MISSING (vacancy; Schottky when a cation and an anion go together), DISPLACED to a hole (Frenkel), or FOREIGN — a different atom substituting for a host atom or squeezed between them. When the cation:anion ratio itself departs from the formula, the defect is non-stoichiometric.",
      definition:
        "- **Vacancy**: a lattice site empty. **Self-interstitial**: a host atom in an interstitial site.\n" +
        "- **Schottky**: equal numbers of cations and anions missing; neutrality kept, density FALLS. Ions of similar size, high coordination — NaCl, KCl, CsCl, AgBr.\n" +
        "- **Frenkel** (dislocation defect): a smaller ion (usually the cation) leaves its site for an interstitial one; density UNCHANGED. Large size difference, low coordination — ZnS, AgCl, AgBr, AgI.\n" +
        "- **Substitutional impurity**: a foreign atom of similar size replaces a host atom — brass (Zn for Cu), solid solutions of Cd in Ag. **Interstitial impurity**: a small foreign atom in a void — stainless steel (C between Fe atoms).\n" +
        "- **Non-stoichiometric**: cation:anion ratio differs from the formula — metal excess (F-centres colour NaCl yellow; ZnO turns yellow on heating) or metal deficiency (\\(\\text{Fe}_{0.95}\\text{O}\\), \\(\\text{Ni}_{0.97}\\text{O}\\)).",
      table: {
        columns: ["Defect", "What happens", "Effect on density", "Examples"],
        rows: [
          { cells: ["Schottky", "Equal numbers of cations and anions missing", "Decreases", "NaCl, KCl, CsCl, AgBr"] },
          { cells: ["Frenkel", "Ion leaves its site for an interstitial position", "Unchanged", "ZnS, AgCl, AgBr, AgI"], noteAmber: "AgBr shows BOTH Schottky and Frenkel." },
          { cells: ["Substitutional impurity", "Foreign atom replaces a host atom", "Depends", "Brass (Zn in Cu), Cd²⁺ in AgCl"] },
          { cells: ["Interstitial impurity", "Small foreign atom in a void", "Increases", "Stainless steel (C in Fe)"], noteAmber: "Brass is SUBSTITUTIONAL, steel is INTERSTITIAL — size decides." },
          { cells: ["Non-stoichiometric", "Cation:anion ratio ≠ formula", "Varies", "\(\text{Fe}_{0.95}\text{O}\) (deficiency), NaCl with F-centres (excess)"] },
        ],
        caption: "Missing → Schottky, displaced → Frenkel, foreign → impurity, wrong ratio → non-stoichiometric.",
      },
      selfCheckExample: {
        prompt: "Identify the defect: (i) in AgCl a silver ion sits in an interstitial void; (ii) a KCl crystal has equal numbers of K⁺ and Cl⁻ vacancies; (iii) carbon atoms occupy voids between iron atoms.",
        steps: [
          "(i) Displaced ion, density unchanged: Frenkel.",
          "(ii) Paired vacancies, neutrality kept: Schottky.",
          "(iii) A small foreign atom in a void: interstitial impurity (stainless steel).",
        ],
        answer: "Frenkel; Schottky; interstitial impurity",
      },
      practiceSet: [
        { prompt: "Defect in brass?", answer: "Substitutional impurity" },
        { prompt: "Defect in stainless steel?", answer: "Interstitial impurity" },
        { prompt: "Which defect lowers the density?", answer: "Schottky" },
        { prompt: "Cation:anion ratio different from the formula is called?", answer: "Non-stoichiometric defect" },
      ],
      pyqExampleId: "2fd03a0a-cd8a-4e2f-84fb-997ee9d0dc25",
      traps: [
        {
          title: "Calling every missing-ion picture Frenkel",
          body:
            "Frenkel needs the ion to REAPPEAR in an interstitial site. If the ions are simply gone in equal numbers, it is Schottky. Read for the words 'interstitial position'.",
        },
      ],
    },

    // 2 — semiconductors and band gap
    {
      kind: "formula" as const,
      slug: "cetss-semiconductors-and-dopants",
      name: "Band Gap, n-Type and p-Type Doping",
      intuition:
        "Conductivity is set by the gap between the filled valence band and the empty conduction band: no gap — conductor; small gap — semiconductor; large gap — insulator. Doping silicon or germanium (Group 14) with a Group 15 atom adds a spare electron (n-type); with a Group 13 atom it leaves a hole (p-type).",
      definition:
        "- Band gap: conductor \\(E_g \\approx 0\\) (metals); semiconductor small (Si 1.12 eV, Ge 0.67 eV); insulator large (diamond 5.47 eV).\n" +
        "- **n-type**: Si or Ge doped with **P, As, Sb** (Group 15, five valence electrons) — the extra electron carries current.\n" +
        "- **p-type**: Si or Ge doped with **B, Al, Ga, In** (Group 13, three valence electrons) — the electron hole carries current.\n" +
        "- Semiconductor conductivity RISES with temperature (more electrons cross the gap); a metal's falls.\n" +
        "- Caesium, with the lowest work function, is used in photoelectric cells.",
      formula: {
        label: "Dopant rule",
        latex:
          "\\text{Group 15 (P, As, Sb)} \\to n\\text{-type};\\qquad \\text{Group 13 (B, Al, Ga, In)} \\to p\\text{-type}",
      },
      authoredExample: {
        prompt: "Four solids have band gaps 5.47 eV, 0.0 eV, 1.12 eV and 0.67 eV. Classify each.",
        steps: [
          "0.0 eV: conductor. 0.67 eV and 1.12 eV: semiconductors (Ge and Si). 5.47 eV: insulator (diamond).",
        ],
        answer: "Conductor: 0.0 eV; semiconductors: 0.67 and 1.12 eV; insulator: 5.47 eV",
      },
      selfCheckExample: {
        prompt: "Which of As, B, In, Ga makes germanium n-type, and which of Ga, Sb, As, P makes silicon p-type?",
        steps: [
          "n-type needs Group 15: As.",
          "p-type needs Group 13: Ga.",
        ],
        answer: "As; Ga",
      },
      practiceSet: [
        { prompt: "Si doped with P gives?", answer: "n-type semiconductor" },
        { prompt: "Ge doped with B gives?", answer: "p-type semiconductor" },
        { prompt: "Element used in photoelectric cells?", answer: "Caesium" },
        { prompt: "A solid with band gap 0.0 eV is a?", answer: "Conductor" },
      ],
      pyqExampleId: "e76571f8-2594-4d01-8ec0-20024a4d7d9c",
      traps: [
        {
          title: "Confusing 'n' with 'negative charge on the dopant'",
          body:
            "n-type means the CARRIER is a negative electron, supplied by a Group 15 donor. The dopant itself is neutral. p-type means positive holes from a Group 13 acceptor. In, Ga, B and Al are always p-type.",
        },
      ],
    },

    // 3 — magnetic properties and nanoscale melting
    {
      kind: "reference" as const,
      slug: "cetss-magnetic-properties",
      name: "Diamagnetic, Paramagnetic, Ferromagnetic",
      intuition:
        "Unpaired electrons are tiny magnets. None — diamagnetic, weakly repelled by a field. A few, randomly oriented — paramagnetic, weakly attracted. Many, spontaneously aligned in domains — ferromagnetic, strongly attracted and able to stay magnetised. Of the exam's usual list (NaCl, H₂O, C₆H₆, O₂, CrO₂), only CrO₂ is ferromagnetic.",
      definition:
        "- **Diamagnetic**: all electrons paired; repelled weakly. NaCl, \\(\\text{H}_2\\text{O}\\), benzene, \\(\\text{N}_2\\), Zn, TiO\\(_2\\).\n" +
        "- **Paramagnetic**: unpaired electrons, moments random; attracted weakly, magnetism lost when the field is removed. \\(\\text{O}_2\\), \\(\\text{Cu}^{2+}\\), \\(\\text{Fe}^{3+}\\), NO.\n" +
        "- **Ferromagnetic**: unpaired electrons aligned parallel in domains; strongly attracted, permanent magnets. Fe, Co, Ni, Gd, \\(\\text{CrO}_2\\) (magnetic tapes).\n" +
        "- Antiferromagnetic (opposed, equal — MnO) and ferrimagnetic (opposed, unequal — \\(\\text{Fe}_3\\text{O}_4\\)) complete the list.\n" +
        "- Nanoscale: melting point falls as a particle gets smaller — bulk Na 371 K, a \\(10^4\\)-atom cluster ~303 K, a \\(10^3\\)-atom cluster ~288 K.",
      table: {
        columns: ["Behaviour", "Electrons", "In a field", "Examples"],
        rows: [
          { cells: ["Diamagnetic", "All paired", "Weakly repelled", "NaCl, H₂O, C₆H₆, N₂"] },
          { cells: ["Paramagnetic", "Unpaired, random", "Weakly attracted, temporary", "O₂, Cu²⁺, Fe³⁺, NO"], noteAmber: "O₂ is paramagnetic, never ferromagnetic." },
          { cells: ["Ferromagnetic", "Unpaired, aligned in domains", "Strongly attracted, permanent", "Fe, Co, Ni, Gd, CrO₂"], noteAmber: "CrO₂ is the one ferromagnetic COMPOUND the paper lists." },
          { cells: ["Antiferromagnetic", "Aligned opposite, equal", "Net zero", "MnO"] },
          { cells: ["Ferrimagnetic", "Aligned opposite, unequal", "Weakly attracted", "Fe₃O₄, ferrites"] },
        ],
        caption: "Count unpaired electrons, then ask whether they line up.",
      },
      selfCheckExample: {
        prompt: "Pick the ferromagnetic substance: NaCl, H₂O, O₂, CrO₂. Then order bulk sodium, a 10⁴-atom cluster and a 10³-atom cluster by melting point.",
        steps: [
          "NaCl and water are diamagnetic, O₂ paramagnetic; CrO₂ is ferromagnetic.",
          "Smaller particle, lower melting point: bulk > 10⁴ cluster > 10³ cluster.",
        ],
        answer: "CrO₂; bulk Na > 10⁴-atom cluster > 10³-atom cluster",
      },
      practiceSet: [
        { prompt: "Ferromagnetic among NaCl, C₆H₆, CrO₂, H₂O?", answer: "CrO₂" },
        { prompt: "Magnetic behaviour of O₂?", answer: "Paramagnetic" },
        { prompt: "A substance with all electrons paired is?", answer: "Diamagnetic" },
        { prompt: "Does a smaller sodium cluster melt higher or lower than bulk sodium?", answer: "Lower" },
      ],
      pyqExampleId: "bdb7c97c-c255-49d7-9bbb-095d246d8290",
      traps: [
        {
          title: "Picking O₂ because it is magnetic",
          body:
            "O₂ has two unpaired electrons and is attracted to a magnet — but weakly and only while the field is on. That is paramagnetism. Ferromagnetic needs domains: Fe, Co, Ni, CrO₂.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Types of Solids — the classes these defects live in",
      href: "/notes/mht-cet-chemistry/solid-state/cetss-types-and-crystal-systems",
    },
    {
      label: "Density — why a Schottky defect lowers it",
      href: "/notes/mht-cet-chemistry/solid-state/cetss-density",
    },
  ],
};
