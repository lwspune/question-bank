import type { SubtopicNote } from "@/app/notes/_types";

export const HYBRID_BOND_NOTE: SubtopicNote = {
  subtopicName: "Hybridisation and Sigma and Pi Bonds",
  title: "Hybridisation and Sigma and Pi Bonds",
  oneLineDefinition:
    "Every bonded pair of atoms shares one σ bond and any extra bonds are π; the central atom mixes one hybrid orbital for each σ bond and lone pair, so the steric number names the hybridisation.",
  whyItMatters:
    "Twenty-seven PYQs, nineteen of them multiple choice, and two from 2026. Eight count σ and π bonds, name the hybridisation of each carbon in a chain or test how orbitals overlap; eleven name or count the hybridisation of a central atom; eight match hybridisations to shapes, complexes such as [PtCl₄]²⁻ included. Three ideas cover the page.",
  concepts: [
    // C1 — counting sigma and pi bonds
    {
      kind: "formula" as const,
      slug: "jcbond-sigma-pi",
      name: "Counting σ and π bonds",
      intuition:
        "Two atoms joined by any bond share exactly one σ bond, formed by head-on overlap along the line between them. Extra bonds come from sideways overlap of p orbitals: one π bond in a double bond, two in a triple bond. So σ bonds count the connections and π bonds count the extra lines.",
      definition:
        "- σ bonds = number of bonded pairs of atoms. In an open chain this is (number of atoms − 1); each ring adds one.\n" +
        "- π bonds: 1 per double bond, 2 per triple bond.\n" +
        "- Write out every hydrogen before counting; the name fixes the structure.\n" +
        "- Carbon hybridisation: four σ bonds → \\(sp^3\\); one double bond → \\(sp^2\\); a triple bond or two double bonds → \\(sp\\). In allene \\(\\mathrm{CH_2{=}C{=}CH_2}\\) the middle carbon is \\(sp\\).\n" +
        "- Overlap can be positive (in phase, bonding), negative (out of phase) or zero (orbitals whose orientation makes them cancel, as s with a \\(p_x\\) approaching along z).",
      formula: {
        label: "Counting bonds in an open chain",
        latex: "n_\\sigma = N_{\\text{atoms}} - 1 \\ (+1 \\text{ per ring}) \\qquad n_\\pi = n_{\\text{double}} + 2\\,n_{\\text{triple}}",
      },
      authoredExample: {
        prompt:
          "Count the σ and π bonds in but-1-en-3-yne, \\(\\mathrm{CH_2{=}CH{-}C{\\equiv}CH}\\), and give the hybridisation of each carbon.",
        steps: [
          "Formula \\(\\mathrm{C_4H_4}\\): 8 atoms in an open chain, so \\(8 - 1 = 7\\) σ bonds.",
          "One double bond and one triple bond: \\(1 + 2 = 3\\) π bonds.",
          "C1 and C2 each have one double bond: \\(sp^2\\). C3 and C4 share the triple bond: \\(sp\\).",
        ],
        answer: "7 σ and 3 π (10 bonds in all); \\(sp^2, sp^2, sp, sp\\).",
      },
      selfCheckExample: {
        prompt: "Count the σ and π bonds in acrylonitrile, \\(\\mathrm{CH_2{=}CH{-}C{\\equiv}N}\\).",
        steps: [
          "Formula \\(\\mathrm{C_3H_3N}\\): 7 atoms, so 6 σ bonds.",
          "One C=C and one C≡N: \\(1 + 2 = 3\\) π bonds.",
        ],
        answer: "6 σ and 3 π.",
      },
      practiceSet: [
        { prompt: "σ and π bonds in benzene?", answer: "12 σ and 3 π" },
        { prompt: "σ and π bonds in ethyne?", answer: "3 σ and 2 π" },
        { prompt: "σ and π bonds in \\(\\mathrm{CO_2}\\)?", answer: "2 σ and 2 π" },
        { prompt: "Hybridisation of the middle carbon of allene?", answer: "\\(sp\\)" },
      ],
      pyqExampleId: "046c101e-e2fd-4b7f-ad89-011a655a49a7", // 2025 — sum of σ and π bonds in a dienyne
      traps: [
        {
          title: "Every C–H bond is a σ bond",
          body: "The hydrogens are easy to forget because the name does not list them. Draw the full structure: in a six-carbon chain the C–H bonds are often more than half of the σ total.",
        },
        {
          title: "Give σ and π in the order asked",
          body: "Options often list the same pair twice, as '13 and 3' and '3 and 13'. The question says which comes first; match that order.",
        },
      ],
    },

    // C2 — hybridisation from the steric number
    {
      kind: "formula" as const,
      slug: "jcbond-hybrid-count",
      name: "Hybridisation from the steric number",
      intuition:
        "The central atom needs one hybrid orbital for each σ bond and each lone pair. π bonds use leftover p orbitals, so they do not count. So the steric number tells you how many orbitals were mixed, and that names the hybridisation.",
      definition:
        "- Steric number = σ bonds + lone pairs on the central atom (or \\(\\tfrac{1}{2}(V + M - c + a)\\), as on the VSEPR page).\n" +
        "- 2 → \\(sp\\); 3 → \\(sp^2\\); 4 → \\(sp^3\\); 5 → \\(sp^3d\\); 6 → \\(sp^3d^2\\); 7 → \\(sp^3d^3\\).\n" +
        "- Double bonds count once: \\(\\mathrm{SO_2}\\) (2 σ + 1 lone pair) is \\(sp^2\\); \\(\\mathrm{XeOF_4}\\) (5 σ + 1 lone pair) is \\(sp^3d^2\\).\n" +
        "- In a network solid count the real neighbours: Si in \\(\\mathrm{SiO_2}\\) bonds to four O, so it is \\(sp^3\\).\n" +
        "- Nitrogen species: \\(\\mathrm{NO_2^-}\\) \\(sp^2\\), \\(\\mathrm{NO_2^+}\\) \\(sp\\), \\(\\mathrm{N_3^-}\\) (central N) \\(sp\\), \\(\\mathrm{NH_4^+}\\) \\(sp^3\\).",
      formula: {
        label: "Steric number to hybridisation",
        latex: "SN = n_\\sigma + n_{\\text{lp}}: \\ 2 \\to sp,\\ 3 \\to sp^2,\\ 4 \\to sp^3,\\ 5 \\to sp^3d,\\ 6 \\to sp^3d^2,\\ 7 \\to sp^3d^3",
      },
      authoredExample: {
        prompt:
          "How many of these have an \\(sp^3\\) central atom: \\(\\mathrm{H_2O}\\), \\(\\mathrm{BF_3}\\), \\(\\mathrm{NH_4^+}\\), \\(\\mathrm{SO_4^{2-}}\\), \\(\\mathrm{CO_2}\\), \\(\\mathrm{PCl_3}\\), \\(\\mathrm{SO_3}\\)?",
        steps: [
          "\\(\\mathrm{H_2O}\\): 2 σ + 2 lone pairs = 4, \\(sp^3\\). \\(\\mathrm{NH_4^+}\\): 4 σ, \\(sp^3\\). \\(\\mathrm{SO_4^{2-}}\\): 4 σ, \\(sp^3\\). \\(\\mathrm{PCl_3}\\): 3 σ + 1 lone pair, \\(sp^3\\).",
          "\\(\\mathrm{BF_3}\\) and \\(\\mathrm{SO_3}\\): 3 σ, no lone pair, \\(sp^2\\).",
          "\\(\\mathrm{CO_2}\\): 2 σ, \\(sp\\).",
        ],
        answer: "4.",
      },
      selfCheckExample: {
        prompt: "Give the hybridisation of the central atom in \\(\\mathrm{SO_2}\\), \\(\\mathrm{SiO_2}\\), \\(\\mathrm{XeO_3}\\) and \\(\\mathrm{IF_7}\\).",
        steps: [
          "\\(\\mathrm{SO_2}\\): 2 σ + 1 lone pair = 3, \\(sp^2\\).",
          "\\(\\mathrm{SiO_2}\\): Si has 4 σ bonds in the network, \\(sp^3\\).",
          "\\(\\mathrm{XeO_3}\\): 3 σ + 1 lone pair = 4, \\(sp^3\\).",
          "\\(\\mathrm{IF_7}\\): 7 σ, \\(sp^3d^3\\).",
        ],
        answer: "\\(sp^2\\), \\(sp^3\\), \\(sp^3\\), \\(sp^3d^3\\).",
      },
      practiceSet: [
        { prompt: "Hybridisation of P in \\(\\mathrm{PF_5}\\)?", answer: "\\(sp^3d\\)" },
        { prompt: "Hybridisation of Cl in \\(\\mathrm{ClF_3}\\)?", answer: "\\(sp^3d\\)" },
        { prompt: "Hybridisation of I in \\(\\mathrm{ICl_4^-}\\)?", answer: "\\(sp^3d^2\\)" },
        { prompt: "Hybridisation of N in \\(\\mathrm{NO_2^+}\\)?", answer: "\\(sp\\)" },
      ],
      pyqExampleId: "a494bcbc-768d-4984-bc2f-0f210fba6faf", // 2026 — how many of ten species are sp3d
      traps: [
        {
          title: "π bonds do not add hybrid orbitals",
          body: "\\(\\mathrm{SO_3}\\) has three S=O double bonds but only three σ bonds, so it is \\(sp^2\\), not \\(sp^3d^2\\). Count σ bonds and lone pairs only.",
        },
        {
          title: "Five atoms around the centre can still be sp³d²",
          body: "\\(\\mathrm{BrF_5}\\) has five bonds and one lone pair, a steric number of 6: \\(sp^3d^2\\), not \\(sp^3d\\). Only lone-pair-free \\(\\mathrm{PF_5}\\) and \\(\\mathrm{PCl_5}\\) are \\(sp^3d\\) with five bonds.",
        },
      ],
    },

    // C3 — hybridisation, orientation and complexes
    {
      kind: "reference" as const,
      slug: "jcbond-hybrid-match",
      name: "Hybridisation, orientation and complexes",
      intuition:
        "Each hybridisation points its orbitals in a fixed pattern, so it fixes the arrangement of pairs. Transition-metal complexes add two more patterns: inner d orbitals can join in (d²sp³, dsp²) when strong ligands pair up the metal's electrons.",
      definition:
        "- Main-group hybridisations use the outer d orbitals: \\(sp^3d\\), \\(sp^3d^2\\), \\(sp^3d^3\\).\n" +
        "- Complexes with strong-field ligands (\\(\\mathrm{CN^-}\\), \\(\\mathrm{NH_3}\\) on \\(\\mathrm{Co^{3+}}\\)) pair the d electrons and use inner (n−1)d orbitals: \\(d^2sp^3\\) octahedral, \\(dsp^2\\) square planar.\n" +
        "- Weak-field ligands (\\(\\mathrm{F^-}\\), \\(\\mathrm{Cl^-}\\)) leave the d electrons unpaired: \\(sp^3\\) tetrahedral or \\(sp^3d^2\\) octahedral (outer orbital).\n" +
        "- \\(\\mathrm{Ni(CO)_4}\\): Ni(0) is \\(3d^{10}\\), so it uses 4s and 4p: \\(sp^3\\), tetrahedral.",
      table: {
        columns: ["Hybridisation", "Orientation", "Main-group examples", "Complex examples"],
        rows: [
          { cells: ["\\(sp\\)", "Linear, 180°", "\\(\\mathrm{BeCl_2}\\), \\(\\mathrm{CO_2}\\), \\(\\mathrm{NO_2^+}\\)", "\\(\\mathrm{[Ag(NH_3)_2]^+}\\)"] },
          { cells: ["\\(sp^2\\)", "Trigonal planar, 120°", "\\(\\mathrm{BF_3}\\), \\(\\mathrm{SO_2}\\), \\(\\mathrm{NO_2^-}\\)", "Rare in complexes"] },
          { cells: ["\\(sp^3\\)", "Tetrahedral, 109.5°", "\\(\\mathrm{CH_4}\\), \\(\\mathrm{NH_4^+}\\), \\(\\mathrm{XeO_3}\\)", "\\(\\mathrm{Ni(CO)_4}\\), \\(\\mathrm{[NiCl_4]^{2-}}\\)"] },
          { cells: ["\\(dsp^2\\)", "Square planar, 90°", "None", "\\(\\mathrm{[PtCl_4]^{2-}}\\), \\(\\mathrm{[Ni(CN)_4]^{2-}}\\)"] },
          { cells: ["\\(sp^3d\\)", "Trigonal bipyramidal", "\\(\\mathrm{PCl_5}\\), \\(\\mathrm{SF_4}\\), \\(\\mathrm{ClF_3}\\), \\(\\mathrm{XeF_2}\\)", "\\(\\mathrm{Fe(CO)_5}\\) is often written \\(dsp^3\\)"] },
          { cells: ["\\(sp^3d^2\\)", "Octahedral, 90°", "\\(\\mathrm{SF_6}\\), \\(\\mathrm{BrF_5}\\), \\(\\mathrm{XeF_4}\\)", "\\(\\mathrm{[CoF_6]^{3-}}\\) (outer orbital)"] },
          { cells: ["\\(d^2sp^3\\)", "Octahedral, 90°", "None", "\\(\\mathrm{[Co(NH_3)_6]^{3+}}\\), \\(\\mathrm{[Fe(CN)_6]^{3-}}\\) (inner orbital)"], noteAmber: "[Co(NH₃)₆]³⁺ is d²sp³, not sp³d²: a stated match of it with SF₆ is false." },
          { cells: ["\\(sp^3d^3\\)", "Pentagonal bipyramidal", "\\(\\mathrm{IF_7}\\), \\(\\mathrm{XeF_6}\\) (distorted)", "None"] },
        ],
        caption: "The hybridisation fixes the arrangement of pairs; the shape then depends on how many are lone pairs.",
      },
      selfCheckExample: {
        prompt: "Give the hybridisation of cobalt in \\(\\mathrm{[Co(NH_3)_6]^{3+}}\\) and in \\(\\mathrm{[CoF_6]^{3-}}\\).",
        steps: [
          "Both are \\(\\mathrm{Co^{3+}}\\), \\(3d^6\\), with six ligands.",
          "\\(\\mathrm{NH_3}\\) pairs the six d electrons into three orbitals, freeing two 3d orbitals: \\(d^2sp^3\\).",
          "\\(\\mathrm{F^-}\\) does not pair them, so the outer 4d orbitals are used: \\(sp^3d^2\\).",
        ],
        answer: "\\(d^2sp^3\\) and \\(sp^3d^2\\); both octahedral.",
      },
      practiceSet: [
        { prompt: "Orientation of \\(dsp^2\\) orbitals?", answer: "Square planar" },
        { prompt: "Orientation of \\(sp^3d\\) orbitals?", answer: "Trigonal bipyramidal" },
        { prompt: "Hybridisation of Pt in \\(\\mathrm{[PtCl_4]^{2-}}\\)?", answer: "\\(dsp^2\\)" },
        { prompt: "Hybridisation of Ni in \\(\\mathrm{Ni(CO)_4}\\)?", answer: "\\(sp^3\\)" },
      ],
      pyqExampleId: "5645eb91-f36d-4b9f-b4ff-3e501459259d", // 2025 — match PF5, SF6, Ni(CO)4 and [PtCl4]2- to hybridisations
      traps: [
        {
          title: "sp³d with a lone pair gives unequal bonds",
          body: "Of \\(\\mathrm{PF_5}\\), \\(\\mathrm{XeF_4}\\), \\(\\mathrm{SF_4}\\) and \\(\\mathrm{XeF_2}\\), only \\(\\mathrm{SF_4}\\) is \\(sp^3d\\), carries a lone pair and has two bond lengths. \\(\\mathrm{XeF_2}\\) is \\(sp^3d\\) with lone pairs, but its two bonds are equal.",
        },
        {
          title: "Square planar means dsp², not sp³",
          body: "Four ligands do not always mean tetrahedral. \\(\\mathrm{[PtCl_4]^{2-}}\\) uses one inner d orbital and is square planar; \\(\\mathrm{[NiCl_4]^{2-}}\\) is \\(sp^3\\) and tetrahedral.",
        },
      ],
    },
  ],
};
