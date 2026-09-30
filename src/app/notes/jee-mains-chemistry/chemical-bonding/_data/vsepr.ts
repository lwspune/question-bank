import type { SubtopicNote } from "@/app/notes/_types";

export const VSEPR_BOND_NOTE: SubtopicNote = {
  subtopicName: "VSEPR Theory and Lone Pairs",
  title: "VSEPR Theory and Lone Pairs",
  oneLineDefinition:
    "VSEPR theory counts the electron pairs on the central atom, bond pairs plus lone pairs, and places them as far apart as possible; lone pairs take the positions where they meet the fewest bond pairs at 90°.",
  whyItMatters:
    "Sixteen PYQs, eleven of them multiple choice, and two from 2026. Ten count the lone pairs on a central atom, most often xenon or a halogen; six ask where the lone pairs sit in a trigonal bipyramid or an octahedron and what shape results. Two ideas cover the page.",
  concepts: [
    // C1 — lone pairs on the central atom
    {
      kind: "formula" as const,
      slug: "jcbond-lone-pair-count",
      name: "Counting lone pairs on the central atom",
      intuition:
        "The central atom brings its valence electrons. Each bond to a hydrogen or halogen takes one of them; each double bond to an oxygen takes two; a negative charge adds one and a positive charge removes one. Whatever is left pairs up as lone pairs.",
      definition:
        "- Steric number (SN) = σ bonds + lone pairs on the central atom.\n" +
        "- Shortcut for centres bonded to H, halogens and O: \\(SN = \\tfrac{1}{2}(V + M - c + a)\\), where \\(V\\) is the central atom's valence electrons, \\(M\\) the number of H or halogen atoms bonded to it, \\(c\\) a positive charge, \\(a\\) a negative charge. Oxygen atoms add nothing.\n" +
        "- Lone pairs on the centre = SN − number of atoms bonded to it.\n" +
        "- Xenon (\\(V = 8\\)): \\(\\mathrm{XeF_2}\\) 3, \\(\\mathrm{XeF_4}\\) 2, \\(\\mathrm{XeF_6}\\) 1, \\(\\mathrm{XeO_3}\\) 1, \\(\\mathrm{XeOF_4}\\) 1, \\(\\mathrm{XeO_2F_2}\\) 1, \\(\\mathrm{XeO_3F_2}\\) 0.\n" +
        "- Halogen centres: \\(\\mathrm{IF_7}\\) 0, \\(\\mathrm{IF_5}\\) 1, \\(\\mathrm{BrF_3}\\) 2, \\(\\mathrm{ICl_4^-}\\) 2, \\(\\mathrm{I_3^-}\\) 3.",
      formula: {
        label: "Steric number and lone pairs",
        latex: "SN = \\tfrac{1}{2}(V + M - c + a) \\qquad \\text{lone pairs} = SN - (\\text{atoms bonded to the centre})",
      },
      authoredExample: {
        prompt:
          "Find the number of lone pairs on the central atom in \\(\\mathrm{IF_5}\\), \\(\\mathrm{SO_3^{2-}}\\) and \\(\\mathrm{ICl_2^-}\\).",
        steps: [
          "\\(\\mathrm{IF_5}\\): \\(SN = \\tfrac{1}{2}(7 + 5) = 6\\); 5 atoms bonded, so 1 lone pair.",
          "\\(\\mathrm{SO_3^{2-}}\\): \\(SN = \\tfrac{1}{2}(6 + 0 + 2) = 4\\); 3 atoms bonded, so 1 lone pair.",
          "\\(\\mathrm{ICl_2^-}\\): \\(SN = \\tfrac{1}{2}(7 + 2 + 1) = 5\\); 2 atoms bonded, so 3 lone pairs.",
        ],
        answer: "1, 1 and 3.",
      },
      selfCheckExample: {
        prompt: "Find the lone pairs on the central atom in \\(\\mathrm{SF_4}\\), \\(\\mathrm{BrO_3^-}\\) and \\(\\mathrm{IF_7}\\).",
        steps: [
          "\\(\\mathrm{SF_4}\\): \\(\\tfrac{1}{2}(6 + 4) = 5\\), minus 4 bonded atoms: 1.",
          "\\(\\mathrm{BrO_3^-}\\): \\(\\tfrac{1}{2}(7 + 1) = 4\\), minus 3 bonded atoms: 1.",
          "\\(\\mathrm{IF_7}\\): \\(\\tfrac{1}{2}(7 + 7) = 7\\), minus 7 bonded atoms: 0.",
        ],
        answer: "1, 1 and 0.",
      },
      practiceSet: [
        { prompt: "Lone pairs on Xe in \\(\\mathrm{XeF_2}\\)?", answer: "3" },
        { prompt: "Lone pairs on N in \\(\\mathrm{NH_4^+}\\)?", answer: "0" },
        { prompt: "Lone pairs on Cl in \\(\\mathrm{ClO_3^-}\\)?", answer: "1" },
        { prompt: "Bond pairs to lone pairs on Br in \\(\\mathrm{BrF_3}\\)?", answer: "3 : 2" },
      ],
      pyqExampleId: "2dc1f27a-5932-41da-ac4d-fe49228898da", // 2023 — how many xenon species carry exactly one lone pair on Xe
      traps: [
        {
          title: "A double bond to oxygen uses two electrons",
          body: "Xe in \\(\\mathrm{XeO_3}\\) uses 6 of its 8 electrons on three Xe=O bonds and keeps one lone pair. Counting each Xe=O as one electron leaves 5 electrons, which cannot pair: a sure sign of a slip.",
        },
        {
          title: "Know what the question calls a bond pair",
          body: "Some questions count π pairs as bond pairs. On that count \\(\\mathrm{SO_2}\\) has 4 bond pairs and 1 lone pair, not 2 and 1. Read the options: if no option fits the σ-only count, the π pairs are included.",
        },
      ],
    },

    // C2 — where the lone pairs go
    {
      kind: "reference" as const,
      slug: "jcbond-lp-position",
      name: "Where lone pairs sit: equatorial and trans",
      intuition:
        "In a trigonal bipyramid an axial position has three neighbours at 90°, but an equatorial one has only two. A lone pair repels more than a bond pair, so it takes the roomier equatorial site. In an octahedron all sites are alike, and two lone pairs keep as far apart as they can, opposite each other.",
      definition:
        "- Steric number 5 (trigonal bipyramid): lone pairs go equatorial, where each meets only two bond pairs at 90° instead of three.\n" +
        "- One lone pair gives a see-saw (\\(\\mathrm{SF_4}\\)); two give a T-shape (\\(\\mathrm{ClF_3}\\), \\(\\mathrm{BrF_3}\\)); three give a linear molecule (\\(\\mathrm{XeF_2}\\), \\(\\mathrm{I_3^-}\\)), 180°.\n" +
        "- Steric number 6 (octahedron): one lone pair gives a square pyramid (\\(\\mathrm{BrF_5}\\)); two lone pairs sit trans (180° apart) and give a square planar shape (\\(\\mathrm{XeF_4}\\), \\(\\mathrm{ICl_4^-}\\), \\(\\mathrm{BrF_4^-}\\)).\n" +
        "- In \\(\\mathrm{XeO_2F_2}\\) (SN 5, one lone pair) the lone pair and the two O atoms are equatorial and the two F atoms axial, so F–Xe–F is near 180° and O–Xe–O about 105°.",
      table: {
        columns: ["Species", "Bond pairs, lone pairs", "Lone pairs sit", "Shape"],
        rows: [
          { cells: ["\\(\\mathrm{SF_4}\\), \\(\\mathrm{SeF_4}\\)", "4, 1", "Equatorial", "See-saw"] },
          { cells: ["\\(\\mathrm{ClF_3}\\), \\(\\mathrm{BrF_3}\\)", "3, 2", "Both equatorial", "T-shaped (bent T), about 87.5°"] },
          { cells: ["\\(\\mathrm{XeF_2}\\), \\(\\mathrm{I_3^-}\\), \\(\\mathrm{ICl_2^-}\\)", "2, 3", "All three equatorial", "Linear, 180°"] },
          { cells: ["\\(\\mathrm{XeO_2F_2}\\)", "4, 1", "Equatorial, with the two O", "See-saw, F atoms axial"] },
          { cells: ["\\(\\mathrm{BrF_5}\\), \\(\\mathrm{IF_5}\\)", "5, 1", "Any one octahedral site", "Square pyramidal"] },
          { cells: ["\\(\\mathrm{XeF_4}\\), \\(\\mathrm{BrF_4^-}\\)", "4, 2", "Trans, opposite each other", "Square planar, 90°"] },
          { cells: ["\\(\\mathrm{BrF_2^+}\\)", "2, 2", "Two corners of a tetrahedron", "Bent"] },
        ],
        caption: "Five pairs: lone pairs equatorial. Six pairs: two lone pairs trans.",
      },
      selfCheckExample: {
        prompt: "\\(\\mathrm{ClF_3}\\) has three bond pairs and two lone pairs on Cl. Where do the lone pairs go, and what is the shape?",
        steps: [
          "Five pairs: trigonal bipyramidal arrangement.",
          "Both lone pairs take equatorial sites, each meeting only two bond pairs at 90°.",
          "The atoms left are two axial F and one equatorial F.",
        ],
        answer: "Both equatorial; the molecule is T-shaped.",
      },
      practiceSet: [
        { prompt: "What is the shape of \\(\\mathrm{I_3^-}\\)?", answer: "Linear, 180°" },
        { prompt: "What is the shape of \\(\\mathrm{BrF_4^-}\\)?", answer: "Square planar" },
        { prompt: "What is the shape of \\(\\mathrm{BrF_2^+}\\)?", answer: "Bent" },
        { prompt: "How many lp–bp repulsions at 90° does an axial lone pair meet in a trigonal bipyramid?", answer: "3" },
      ],
      pyqExampleId: "92e270c7-05c6-4f48-b890-b2414e53417e", // 2022 — position of SF4's lone pair and its 90° repulsions
      traps: [
        {
          title: "Lone pairs are never axial in a trigonal bipyramid",
          body: "An axial lone pair would meet three bond pairs at 90°. The stable structure puts every lone pair equatorial, so a statement that axial lone pairs minimise repulsion in \\(\\mathrm{ClF_3}\\) is false.",
        },
        {
          title: "Three lone pairs make a straight molecule",
          body: "\\(\\mathrm{XeF_2}\\) and \\(\\mathrm{I_3^-}\\) have five electron pairs, yet they are linear. The three lone pairs fill the equator and the two atoms sit on the axis, 180° apart.",
        },
      ],
    },
  ],
};
