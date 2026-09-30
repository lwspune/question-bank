import type { SubtopicNote } from "@/app/notes/_types";

export const PARAMS_BOND_NOTE: SubtopicNote = {
  subtopicName: "Bond Length, Bond Angle and Resonance",
  title: "Bond Length, Bond Angle and Resonance",
  oneLineDefinition:
    "Bond length shrinks as bond order rises, resonance averages the bond order over equivalent positions, and bond angles open or close with the repulsion between electron pairs.",
  whyItMatters:
    "Fifteen PYQs, all of them multiple choice, and five from 2026. Four test resonance: ozone, carbonate and the carbon-oxygen bonds of esters and ketones; five rank bond lengths or ask which species has unequal bonds; six compare bond angles. Three ideas cover the page.",
  concepts: [
    // C1 — resonance and fractional bond order
    {
      kind: "formula" as const,
      slug: "jcbond-resonance",
      name: "Resonance and fractional bond order",
      intuition:
        "Some species need more than one Lewis structure because the double bond could sit in several places. The real species is a single hybrid of all of them, not a mixture flipping between them. Every equivalent bond is the same length, with a bond order between single and double.",
      definition:
        "- Canonical forms are drawings only; they cannot be isolated and are not in equilibrium.\n" +
        "- The hybrid is more stable than any one canonical form.\n" +
        "- Bond order of each equivalent bond \\(= \\dfrac{\\text{total bonds between the central atom and those atoms}}{\\text{number of equivalent positions}}\\).\n" +
        "- \\(\\mathrm{O_3}\\): both O–O bonds 128 pm, between O=O (121 pm) and O–O (148 pm); bond order 1.5.\n" +
        "- \\(\\mathrm{CO_3^{2-}}\\) and \\(\\mathrm{NO_3^-}\\): three equal bonds of order \\(4/3\\). Carboxylate ions \\(\\mathrm{RCOO^-}\\): two equal C–O bonds of order 1.5.\n" +
        "- In an ester \\(\\mathrm{R{-}C(=O){-}O{-}R'}\\): C=O is shortest, the C(=O)–O bond is next (it shares some double-bond character), and O–R' is longest.",
      formula: {
        label: "Bond order in a resonance hybrid",
        latex: "\\text{bond order} = \\frac{\\text{total bonds to the equivalent atoms}}{\\text{number of equivalent atoms}}",
      },
      authoredExample: {
        prompt:
          "Nitrate \\(\\mathrm{NO_3^-}\\) has three canonical forms. Find the N–O bond order and say how the N–O bonds compare in length.",
        steps: [
          "Each canonical form has one N=O and two N–O bonds: \\(2 + 1 + 1 = 4\\) bonds to oxygen.",
          "They are shared equally over 3 positions: bond order \\(= 4/3 \\approx 1.33\\).",
          "All three bonds are the same, so all three are the same length, between an N–O single and an N=O double bond.",
        ],
        answer: "Bond order \\(4/3\\); three equal N–O bonds.",
      },
      selfCheckExample: {
        prompt: "Find the C–O bond order in the formate ion, \\(\\mathrm{HCOO^-}\\). Which is longer, a C–O bond in formate or the C=O bond in formaldehyde?",
        steps: [
          "Two canonical forms, each with one C=O and one C–O: 3 bonds over 2 positions.",
          "Bond order \\(= 3/2 = 1.5\\), lower than 2.",
        ],
        answer: "1.5; the formate C–O bond is longer.",
      },
      practiceSet: [
        { prompt: "What is the C–O bond order in \\(\\mathrm{CO_3^{2-}}\\)?", answer: "\\(4/3\\)" },
        { prompt: "Are the canonical forms of benzene in dynamic equilibrium?", answer: "No; benzene is one hybrid" },
        { prompt: "What is the O–O bond order in ozone?", answer: "1.5" },
        { prompt: "Which is longer, a C–O bond in \\(\\mathrm{CO_3^{2-}}\\) or a C=O bond in \\(\\mathrm{CO_2}\\)?", answer: "The C–O bond in carbonate" },
      ],
      pyqExampleId: "97d79d9a-dca3-4c3d-854b-eb74826e1de2", // 2025 — ozone's equal O–O bonds and what explains them
      traps: [
        {
          title: "The hybrid does not flip between forms",
          body: "Options such as 'the structures are in dynamic equilibrium' or 'each structure exists for an equal time' are always wrong. Resonance forms are not real species; there is one structure, the hybrid.",
        },
        {
          title: "Resonance, not repulsion, sets ozone's bond length",
          body: "Ozone's two O–O bonds are equal at 128 pm because the double bond is spread over both positions. A statement that lone-pair repulsion alone causes the intermediate length is false.",
        },
      ],
    },

    // C2 — bond length
    {
      kind: "reference" as const,
      slug: "jcbond-bond-length",
      name: "Bond length and what sets it",
      intuition:
        "More shared pairs pull two nuclei closer together, so a triple bond is shorter than a double, and a double shorter than a single. Bigger atoms have bigger radii, so their bonds are longer. A bond to hydrogen is short because hydrogen is so small.",
      definition:
        "- Bond length falls as bond order rises between the same two atoms.\n" +
        "- Bond length rises with atomic size.\n" +
        "- \\(\\mathrm{O_2^+ < O_2 < O_2^- < O_2^{2-}}\\) in length, because the bond order falls 2.5, 2, 1.5, 1.\n" +
        "- Isoelectronic species have the same bond order, as \\(\\mathrm{N_2}\\), CO and \\(\\mathrm{CN^-}\\) (all 3) do.\n" +
        "- In a trigonal bipyramid (\\(\\mathrm{PCl_5}\\)) the axial bonds are longer and weaker than the equatorial ones: they feel three bond pairs at 90°. \\(\\mathrm{SF_4}\\) also has two longer axial bonds. \\(\\mathrm{SiF_4}\\), \\(\\mathrm{BF_4^-}\\) and \\(\\mathrm{XeF_4}\\) have all bonds equal.",
      table: {
        columns: ["Bond", "Typical length (pm)", "Note"],
        rows: [
          { cells: ["C–H", "109", "Shortest here: hydrogen is tiny"] },
          { cells: ["C≡C", "120", "Triple bond"] },
          { cells: ["C=C", "134", "Double bond"] },
          { cells: ["C–C", "154", "Single bond"] },
          { cells: ["C≡N", "116", "Shorter than C=O despite N being larger than C"] },
          { cells: ["C=O", "122", "Carbonyl"] },
          { cells: ["C–O", "143", "Alcohols and ethers"] },
          { cells: ["O=O", "121", "In O₂"] },
          { cells: ["O–O", "148", "In H₂O₂"] },
          { cells: ["P–Cl in PCl₅", "219 axial, 204 equatorial", "Axial bonds are the longer, weaker pair"], noteAmber: "Calling the axial bonds of PCl₅ stronger is a standard wrong statement." },
        ],
        caption: "For the same pair of atoms: triple shorter than double, double shorter than single.",
      },
      selfCheckExample: {
        prompt: "Arrange the carbon-carbon bonds in ethane, ethene and ethyne in increasing length.",
        steps: [
          "Ethyne has C≡C (order 3), ethene C=C (order 2), ethane C–C (order 1).",
          "Higher order, shorter bond: 120, 134 and 154 pm.",
        ],
        answer: "Ethyne < ethene < ethane.",
      },
      practiceSet: [
        { prompt: "Which is longer, the bond in \\(\\mathrm{O_2^-}\\) or in \\(\\mathrm{O_2^+}\\)?", answer: "\\(\\mathrm{O_2^-}\\) (bond order 1.5 against 2.5)" },
        { prompt: "Which has the shorter bond, \\(\\mathrm{N_2}\\) or \\(\\mathrm{O_2}\\)?", answer: "\\(\\mathrm{N_2}\\)" },
        { prompt: "In \\(\\mathrm{PCl_5}\\), which bonds are longer?", answer: "The two axial bonds" },
        { prompt: "Does \\(\\mathrm{XeF_4}\\) have unequal Xe–F bonds?", answer: "No; square planar, all four equal" },
      ],
      pyqExampleId: "1c70e6f3-a1d1-453f-a56e-60ce4b7cbaff", // 2026 — order C–H, C–O, C=O, C≡N by length
      traps: [
        {
          title: "Bond length is not set by bond order alone",
          body: "C≡N (116 pm) is shorter than C=O (122 pm), and C–H (109 pm) is shorter than both, though it is a single bond. Compare orders only between the same two atoms; otherwise size matters too.",
        },
        {
          title: "See-saw and trigonal bipyramid give unequal bonds",
          body: "Four bonds do not mean four equal bonds. Tetrahedral \\(\\mathrm{SiF_4}\\) and square planar \\(\\mathrm{XeF_4}\\) have equal bonds, but see-saw \\(\\mathrm{SF_4}\\) has two long axial and two short equatorial bonds.",
        },
      ],
    },

    // C3 — bond angle
    {
      kind: "reference" as const,
      slug: "jcbond-bond-angle",
      name: "Bond angles and lone-pair repulsion",
      intuition:
        "Electron pairs push each other apart. A lone pair sits closer to the central atom than a bond pair and spreads wider, so it pushes harder and squeezes the bonds together. The more lone pairs on the centre, the smaller the bond angle.",
      definition:
        "- Repulsion order: lone pair–lone pair > lone pair–bond pair > bond pair–bond pair.\n" +
        "- \\(\\mathrm{CH_4}\\) 109.5°, \\(\\mathrm{NH_3}\\) 107°, \\(\\mathrm{H_2O}\\) 104.5°: 0, 1 and 2 lone pairs on an \\(sp^3\\) centre.\n" +
        "- An electronegative outer atom pulls the bond pairs away from the centre, so they repel less and the angle closes: \\(\\mathrm{OF_2}\\) (103°) < \\(\\mathrm{H_2O}\\) (104.5°) < \\(\\mathrm{Cl_2O}\\) (about 111°, the large Cl atoms also crowd each other).\n" +
        "- Down a group the angle closes: \\(\\mathrm{H_2O}\\) 104.5° > \\(\\mathrm{H_2S}\\) 92°; \\(\\mathrm{NH_3}\\) 107° > \\(\\mathrm{PH_3}\\) 93.5°.\n" +
        "- In \\(\\mathrm{OF_2}\\) oxygen is in the +2 oxidation state, because F is more electronegative.",
      table: {
        columns: ["Species", "Pairs on the centre", "Bond angle"],
        rows: [
          { cells: ["\\(\\mathrm{BF_3}\\)", "3 bond, 0 lone", "120°"] },
          { cells: ["\\(\\mathrm{SO_2}\\)", "2 bond (plus π), 1 lone", "about 119°"] },
          { cells: ["\\(\\mathrm{CH_4}\\)", "4 bond, 0 lone", "109.5°"] },
          { cells: ["\\(\\mathrm{NH_3}\\)", "3 bond, 1 lone", "107°"] },
          { cells: ["\\(\\mathrm{H_2O}\\)", "2 bond, 2 lone", "104.5°"] },
          { cells: ["\\(\\mathrm{NF_3}\\)", "3 bond, 1 lone", "102°"] },
          { cells: ["\\(\\mathrm{PF_3}\\)", "3 bond, 1 lone", "about 98°"] },
          { cells: ["\\(\\mathrm{ClF_3}\\)", "3 bond, 2 lone", "about 87.5° (axial F–Cl–equatorial F)"], noteAmber: "The two lone pairs bend the axial F atoms back below 90°." },
        ],
        caption: "More lone pairs on the centre, or more electronegative outer atoms, means a smaller angle.",
      },
      selfCheckExample: {
        prompt: "Arrange \\(\\mathrm{H_2O}\\), \\(\\mathrm{H_2S}\\) and \\(\\mathrm{OF_2}\\) in increasing bond angle.",
        steps: [
          "\\(\\mathrm{H_2S}\\): larger S, bond pairs far apart, about 92°.",
          "\\(\\mathrm{OF_2}\\): F pulls the bond pairs away from O, 103°.",
          "\\(\\mathrm{H_2O}\\): 104.5°.",
        ],
        answer: "\\(\\mathrm{H_2S < OF_2 < H_2O}\\).",
      },
      practiceSet: [
        { prompt: "Which has the larger bond angle, \\(\\mathrm{NH_3}\\) or \\(\\mathrm{NF_3}\\)?", answer: "\\(\\mathrm{NH_3}\\) (107° against 102°)" },
        { prompt: "Is the bond angle of \\(\\mathrm{SO_2}\\) smaller than that of \\(\\mathrm{H_2O}\\)?", answer: "No; about 119° against 104.5°" },
        { prompt: "Which repulsion is strongest: lp–lp, lp–bp or bp–bp?", answer: "lp–lp" },
        { prompt: "What is the oxidation state of O in \\(\\mathrm{OF_2}\\)?", answer: "+2" },
      ],
      pyqExampleId: "6ea6606a-7250-4afc-ae16-1d2cadf282c4", // 2024 — BF3, PF3, ClF3 in increasing bond angle
      traps: [
        {
          title: "Both SO₂ and H₂O are bent, at very different angles",
          body: "S in \\(\\mathrm{SO_2}\\) has three electron domains (\\(sp^2\\)) and one lone pair, so its angle is near 119°. O in water has four domains (\\(sp^3\\)) and two lone pairs, so 104.5°. Same shape, larger angle for \\(\\mathrm{SO_2}\\).",
        },
        {
          title: "Fluorine closes the angle; chlorine opens it",
          body: "\\(\\mathrm{OF_2}\\) (103°) is smaller than \\(\\mathrm{H_2O}\\), but \\(\\mathrm{Cl_2O}\\) (about 111°) is larger. Electronegative F draws the bond pairs outward; the big Cl atoms push each other apart.",
        },
      ],
    },
  ],
};
