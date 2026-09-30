import type { SubtopicNote } from "@/app/notes/_types";

export const SHAPES_BOND_NOTE: SubtopicNote = {
  subtopicName: "Shapes of Molecules and Ions",
  title: "Shapes of Molecules and Ions",
  oneLineDefinition:
    "The shape of a molecule is named from its atoms only: fix the arrangement from the total electron pairs, then remove the lone pairs, so AX₃E is pyramidal and AX₂E₂ is bent.",
  whyItMatters:
    "Twenty-seven PYQs, nineteen of them multiple choice, and four from 2026. Seventeen match molecules and ions to their shapes or ask which species share a shape; ten count how many species in a list are linear, bent, pyramidal, square planar or some other shape. Two ideas cover the page.",
  concepts: [
    // C1 — the AXnEm table
    {
      kind: "reference" as const,
      slug: "jcbond-shape-match",
      name: "Shapes from the AXE formula",
      intuition:
        "Write the central atom as A, its bonded atoms as X and its lone pairs as E. The total X + E fixes how the pairs are arranged in space. The shape you name is what the atoms alone trace out, so the same arrangement gives different shapes as lone pairs replace atoms.",
      definition:
        "- Find X (atoms bonded to the centre) and E (lone pairs on it); a double bond still counts as one X.\n" +
        "- X + E = 2, 3, 4, 5, 6 gives a linear, trigonal planar, tetrahedral, trigonal bipyramidal or octahedral arrangement of pairs.\n" +
        "- Isostructural species share a shape, whatever their formulas: \\(\\mathrm{SO_4^{2-}}\\) and \\(\\mathrm{CrO_4^{2-}}\\) (tetrahedral); \\(\\mathrm{SiCl_4}\\) and \\(\\mathrm{TiCl_4}\\); \\(\\mathrm{SF_4}\\), \\(\\mathrm{IF_4^+}\\) and \\(\\mathrm{XeO_2F_2}\\) (see-saw).\n" +
        "- \\(\\mathrm{CH_4}\\), \\(\\mathrm{NH_4^+}\\) and \\(\\mathrm{BH_4^-}\\) are isoelectronic (10 electrons) and all tetrahedral.\n" +
        "- Four-coordinate complexes: \\(\\mathrm{[PtCl_4]^{2-}}\\), \\(\\mathrm{[Ni(CN)_4]^{2-}}\\) and \\(\\mathrm{[Cu(NH_3)_4]^{2+}}\\) are square planar; \\(\\mathrm{[NiCl_4]^{2-}}\\), \\(\\mathrm{[FeCl_4]^{2-}}\\) and \\(\\mathrm{Ni(CO)_4}\\) are tetrahedral.\n" +
        "- Aluminium dissolves in NaOH as the tetrahedral \\(\\mathrm{[Al(OH)_4]^-}\\) ion.",
      table: {
        columns: ["Type", "Pairs (X + E)", "Shape", "Examples"],
        rows: [
          { cells: ["AX₂", "2", "Linear", "\\(\\mathrm{BeCl_2}\\), \\(\\mathrm{CO_2}\\), \\(\\mathrm{NO_2^+}\\), \\(\\mathrm{N_3^-}\\), \\(\\mathrm{HC{\\equiv}C^-}\\)"] },
          { cells: ["AX₃", "3", "Trigonal planar", "\\(\\mathrm{BF_3}\\), \\(\\mathrm{SO_3}\\), \\(\\mathrm{NO_3^-}\\), \\(\\mathrm{CO_3^{2-}}\\)"] },
          { cells: ["AX₂E", "3", "Bent", "\\(\\mathrm{SO_2}\\), \\(\\mathrm{O_3}\\), \\(\\mathrm{NO_2^-}\\)"] },
          { cells: ["AX₄", "4", "Tetrahedral", "\\(\\mathrm{CH_4}\\), \\(\\mathrm{NH_4^+}\\), \\(\\mathrm{SO_4^{2-}}\\), \\(\\mathrm{SO_2Cl_2}\\)"] },
          { cells: ["AX₃E", "4", "Trigonal pyramidal", "\\(\\mathrm{NH_3}\\), \\(\\mathrm{H_3O^+}\\), \\(\\mathrm{SO_3^{2-}}\\), \\(\\mathrm{ClO_3^-}\\), \\(\\mathrm{BrO_3^-}\\), \\(\\mathrm{XeO_3}\\)"] },
          { cells: ["AX₂E₂", "4", "Bent", "\\(\\mathrm{H_2O}\\), \\(\\mathrm{OF_2}\\), \\(\\mathrm{ClO_2^-}\\), \\(\\mathrm{BrF_2^+}\\)"] },
          { cells: ["AX₅", "5", "Trigonal bipyramidal", "\\(\\mathrm{PCl_5}\\), \\(\\mathrm{PF_5}\\), \\(\\mathrm{Fe(CO)_5}\\)"] },
          { cells: ["AX₄E", "5", "See-saw", "\\(\\mathrm{SF_4}\\), \\(\\mathrm{SeF_4}\\), \\(\\mathrm{IF_4^+}\\), \\(\\mathrm{XeO_2F_2}\\)"] },
          { cells: ["AX₃E₂", "5", "T-shaped", "\\(\\mathrm{ClF_3}\\), \\(\\mathrm{BrF_3}\\), \\(\\mathrm{IF_3}\\)"] },
          { cells: ["AX₂E₃", "5", "Linear", "\\(\\mathrm{XeF_2}\\), \\(\\mathrm{I_3^-}\\), \\(\\mathrm{IBr_2^-}\\)"] },
          { cells: ["AX₆", "6", "Octahedral", "\\(\\mathrm{SF_6}\\), \\(\\mathrm{[CrF_6]^{3-}}\\)"] },
          { cells: ["AX₅E", "6", "Square pyramidal", "\\(\\mathrm{BrF_5}\\), \\(\\mathrm{IF_5}\\), \\(\\mathrm{XeOF_4}\\)"] },
          { cells: ["AX₄E₂", "6", "Square planar", "\\(\\mathrm{XeF_4}\\), \\(\\mathrm{ICl_4^-}\\), \\(\\mathrm{BrF_4^-}\\)"] },
          { cells: ["AX₇", "7", "Pentagonal bipyramidal", "\\(\\mathrm{IF_7}\\)"] },
          { cells: ["AX₆E", "7", "Distorted octahedral", "\\(\\mathrm{XeF_6}\\)"] },
        ],
        caption: "Same total of pairs, same arrangement; the lone pairs decide the name of the shape.",
      },
      selfCheckExample: {
        prompt: "Give the shapes of \\(\\mathrm{ICl_4^-}\\), \\(\\mathrm{BrF_3}\\), \\(\\mathrm{SO_3^{2-}}\\) and \\(\\mathrm{IF_7}\\).",
        steps: [
          "\\(\\mathrm{ICl_4^-}\\): AX₄E₂, square planar.",
          "\\(\\mathrm{BrF_3}\\): AX₃E₂, T-shaped.",
          "\\(\\mathrm{SO_3^{2-}}\\): AX₃E, pyramidal.",
          "\\(\\mathrm{IF_7}\\): AX₇, pentagonal bipyramidal.",
        ],
        answer: "Square planar, T-shaped, pyramidal, pentagonal bipyramidal.",
      },
      practiceSet: [
        { prompt: "Shape of \\(\\mathrm{H_3O^+}\\)?", answer: "Trigonal pyramidal" },
        { prompt: "Shape of \\(\\mathrm{ClO_2^-}\\)?", answer: "Bent" },
        { prompt: "Are \\(\\mathrm{SO_4^{2-}}\\) and \\(\\mathrm{CrO_4^{2-}}\\) isostructural?", answer: "Yes, both tetrahedral" },
        { prompt: "Name two square pyramidal molecules.", answer: "\\(\\mathrm{BrF_5}\\) and \\(\\mathrm{IF_5}\\) (also \\(\\mathrm{XeOF_4}\\))" },
      ],
      pyqExampleId: "2cc165c1-fb86-4aee-b699-1c0ed2b7df0f", // 2026 — match xenon species to molecules of the same shape
      traps: [
        {
          title: "Name the shape from the atoms, not the pairs",
          body: "\\(\\mathrm{NH_3}\\) has a tetrahedral arrangement of pairs, but its shape is trigonal pyramidal. \\(\\mathrm{XeF_4}\\) has an octahedral arrangement, but it is square planar. Options often offer the arrangement as a decoy.",
        },
        {
          title: "Same formula type, different shape",
          body: "\\(\\mathrm{SF_4}\\) (see-saw) and \\(\\mathrm{XeF_4}\\) (square planar) are both AF₄, and \\(\\mathrm{PCl_5}\\) (trigonal bipyramidal) and \\(\\mathrm{BrF_5}\\) (square pyramidal) are both AX₅ formulas. Count the lone pairs before naming the shape.",
        },
      ],
    },

    // C2 — counting species of one shape in a list
    {
      kind: "formula" as const,
      slug: "jcbond-shape-count",
      name: "Counting species of one shape in a list",
      intuition:
        "A list question is the AXE table used many times. Work through the list one species at a time, write X and E for each, and tick only those that match. Do not guess from the formula: the charge and the lone pairs change everything.",
      definition:
        "- For each species: count the atoms bonded to the centre (X), find the lone pairs (E) from the steric number, name the shape.\n" +
        "- Linear: AX₂ (\\(\\mathrm{BeCl_2}\\), \\(\\mathrm{CO_2}\\), \\(\\mathrm{C_3O_2}\\), \\(\\mathrm{N_3^-}\\), \\(\\mathrm{NO_2^+}\\)) or AX₂E₃ (\\(\\mathrm{XeF_2}\\), \\(\\mathrm{I_3^-}\\)). Not linear: \\(\\mathrm{I_3^+}\\) (AX₂E₂), \\(\\mathrm{BCl_2^-}\\) (AX₂E), \\(\\mathrm{SO_2}\\), \\(\\mathrm{O_3}\\), \\(\\mathrm{NO_2}\\), \\(\\mathrm{F_2O}\\).\n" +
        "- Planar species: any three-atom species, AX₃, AX₃E₂ (T-shaped) and AX₄E₂ (square planar). Pyramidal, tetrahedral, see-saw and bigger shapes are non-planar. \\(\\mathrm{H_2O_2}\\) is not planar: its two O–H bonds lie in different planes.\n" +
        "- Trigonal bipyramidal needs AX₅ with no lone pair: \\(\\mathrm{PF_5}\\), \\(\\mathrm{PCl_5}\\), \\(\\mathrm{Fe(CO)_5}\\), not \\(\\mathrm{BrF_5}\\).",
      authoredExample: {
        prompt:
          "How many of these are pyramidal: \\(\\mathrm{NH_3}\\), \\(\\mathrm{BF_3}\\), \\(\\mathrm{SO_3^{2-}}\\), \\(\\mathrm{ClO_3^-}\\), \\(\\mathrm{NO_3^-}\\), \\(\\mathrm{PCl_3}\\), \\(\\mathrm{XeO_3}\\), \\(\\mathrm{SO_3}\\)?",
        steps: [
          "Pyramidal means AX₃E: three atoms and one lone pair on the centre.",
          "\\(\\mathrm{NH_3}\\), \\(\\mathrm{PCl_3}\\): one lone pair each. \\(\\mathrm{SO_3^{2-}}\\): \\(\\tfrac{1}{2}(6 + 2) = 4\\), one lone pair. \\(\\mathrm{ClO_3^-}\\): \\(\\tfrac{1}{2}(7 + 1) = 4\\), one lone pair. \\(\\mathrm{XeO_3}\\): \\(\\tfrac{1}{2}(8) = 4\\), one lone pair.",
          "\\(\\mathrm{BF_3}\\), \\(\\mathrm{NO_3^-}\\) and \\(\\mathrm{SO_3}\\) have no lone pair on the centre: trigonal planar.",
        ],
        answer: "5: \\(\\mathrm{NH_3}\\), \\(\\mathrm{SO_3^{2-}}\\), \\(\\mathrm{ClO_3^-}\\), \\(\\mathrm{PCl_3}\\) and \\(\\mathrm{XeO_3}\\).",
      },
      selfCheckExample: {
        prompt:
          "How many of these are square planar: \\(\\mathrm{XeF_4}\\), \\(\\mathrm{SF_4}\\), \\(\\mathrm{[PtCl_4]^{2-}}\\), \\(\\mathrm{BF_4^-}\\), \\(\\mathrm{ICl_4^-}\\), \\(\\mathrm{[NiCl_4]^{2-}}\\)?",
        steps: [
          "\\(\\mathrm{XeF_4}\\) and \\(\\mathrm{ICl_4^-}\\): AX₄E₂, square planar.",
          "\\(\\mathrm{[PtCl_4]^{2-}}\\): \\(dsp^2\\), square planar.",
          "\\(\\mathrm{SF_4}\\) is see-saw; \\(\\mathrm{BF_4^-}\\) and \\(\\mathrm{[NiCl_4]^{2-}}\\) are tetrahedral.",
        ],
        answer: "3.",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{I_3^+}\\) linear?", answer: "No; AX₂E₂, bent" },
        { prompt: "Is \\(\\mathrm{NO_2^+}\\) linear?", answer: "Yes" },
        { prompt: "Is \\(\\mathrm{[Al(OH)_4]^-}\\) planar?", answer: "No; tetrahedral" },
        { prompt: "How many of \\(\\mathrm{O_3}\\), \\(\\mathrm{N_3^-}\\), \\(\\mathrm{NO_2^-}\\) are bent?", answer: "2: \\(\\mathrm{O_3}\\) and \\(\\mathrm{NO_2^-}\\)" },
      ],
      pyqExampleId: "6a29137b-7248-4252-855e-b7987f104442", // 2025 — how many of ten species are linear
      traps: [
        {
          title: "Charge changes the shape",
          body: "\\(\\mathrm{I_3^-}\\) is linear (three lone pairs) but \\(\\mathrm{I_3^+}\\) is bent (two lone pairs). \\(\\mathrm{NO_2^+}\\) is linear but \\(\\mathrm{NO_2^-}\\) is bent. Always put the charge into the steric number.",
        },
        {
          title: "Two nickel complexes, two shapes",
          body: "Strong-field \\(\\mathrm{CN^-}\\) pairs up nickel's d electrons, so \\(\\mathrm{[Ni(CN)_4]^{2-}}\\) is \\(dsp^2\\) and square planar. Weak-field \\(\\mathrm{Cl^-}\\) does not, so \\(\\mathrm{[NiCl_4]^{2-}}\\) is \\(sp^3\\) and tetrahedral.",
        },
      ],
    },
  ],
};
