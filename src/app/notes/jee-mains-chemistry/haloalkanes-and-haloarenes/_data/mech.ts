import type { SubtopicNote } from "@/app/notes/_types";

export const MECH_HALO_NOTE: SubtopicNote = {
  subtopicName: "SN1 and SN2: Mechanism, Kinetics and Stereochemistry",
  title: "SN1 and SN2: Mechanism, Kinetics and Stereochemistry",
  oneLineDefinition:
    "SN2 is one step, second order and inverts the carbon; SN1 ionises first to a planar carbocation, is first order in the halide alone, racemises a stereocentre and can rearrange.",
  whyItMatters:
    "Fourteen PYQs, one numerical, three from 2026. Seven ask which mechanism a reaction follows and what that means for its rate law, its solvent or a rearranged product; seven ask for the stereochemical result, whether inversion, racemisation or retention, or count how many optically active products form.",
  concepts: [
    // C1 — SN1 against SN2
    {
      kind: "reference" as const,
      slug: "jchalo-sn-mechanism",
      name: "SN1 and SN2 compared: steps, rate law and conditions",
      intuition:
        "In SN2 the nucleophile attacks the carbon from the side opposite the halogen while the halogen leaves, all in one step, so the rate depends on both. In SN1 the halogen leaves first, slowly, to give a carbocation; the nucleophile then adds fast, so the rate depends on the halide alone. Which path runs is set by the substrate, the nucleophile and the solvent together.",
      definition:
        "- **SN2**: rate = \\(k[\\mathrm{RX}][\\mathrm{Nu^-}]\\). Favoured by a strong nucleophile at high concentration, an uncrowded carbon (\\(\\mathrm{CH_3}\\), 1°, unhindered 2°) and a polar aprotic solvent (acetone, DMSO, DMF).\n" +
        "- **SN1**: rate = \\(k[\\mathrm{RX}]\\). Favoured by a halide that gives a stable cation (3°, benzylic, allylic), a weak nucleophile (often the solvent itself, as in solvolysis) and a polar protic solvent (water, alcohols).\n" +
        "- A graph of SN1 rate against \\(\\mathrm{[RX]}\\) is a straight line through the origin; against \\(\\mathrm{[Nu^-]}\\) it is flat.\n" +
        "- A carbocation can rearrange by a 1,2-hydride or 1,2-methyl shift to a more stable cation before the nucleophile adds. SN2 never rearranges.\n" +
        "- **Solvent polarity** (Hughes–Ingold): if charge is created on going to the transition state, as in \\(\\mathrm{R_3N + RCl}\\), a more polar solvent speeds the reaction. If charge is spread out, as in \\(\\mathrm{HO^- + RCl}\\), a less polar solvent speeds it.",
      table: {
        columns: ["Feature", "SN1", "SN2"],
        rows: [
          { cells: ["Steps", "Two: slow ionisation, then fast attack", "One, concerted"] },
          { cells: ["Rate law", "rate = \\(k[\\mathrm{RX}]\\), first order", "rate = \\(k[\\mathrm{RX}][\\mathrm{Nu^-}]\\), second order"] },
          { cells: ["Intermediate", "Planar carbocation", "None; a five-coordinate transition state"] },
          { cells: ["Stereochemistry at a chiral carbon", "Racemisation (mostly)", "Inversion (Walden inversion)"] },
          { cells: ["Substrate order", "3° > 2° > 1° > \\(\\mathrm{CH_3X}\\)", "\\(\\mathrm{CH_3X}\\) > 1° > 2° > 3°"] },
          { cells: ["Nucleophile", "Weak, often the solvent", "Strong, at high concentration"] },
          { cells: ["Best solvent", "Polar protic: water, alcohols", "Polar aprotic: acetone, DMSO, DMF"] },
          { cells: ["Rearrangement", "Possible, by a hydride or methyl shift", "Never"] },
          { cells: ["Leaving group", "I > Br > Cl > F", "I > Br > Cl > F"] },
        ],
        caption: "A secondary halide can go either way; the nucleophile and the solvent decide.",
      },
      selfCheckExample: {
        prompt: "2-Bromo-2-methylpropane is hydrolysed in aqueous acetone. The concentration of \\(\\mathrm{OH^-}\\) is doubled while the halide is kept the same. How does the rate change, and why?",
        steps: [
          "A tertiary halide in a polar protic medium reacts by SN1.",
          "The slow step is ionisation of the halide, which does not involve \\(\\mathrm{OH^-}\\): rate = \\(k[\\mathrm{RX}]\\).",
        ],
        answer: "The rate does not change: the reaction is first order in the halide and zero order in \\(\\mathrm{OH^-}\\).",
      },
      practiceSet: [
        { prompt: "Write the rate law for \\(\\mathrm{CH_3Br + OH^- \\to CH_3OH + Br^-}\\).", answer: "rate = \\(k[\\mathrm{CH_3Br}][\\mathrm{OH^-}]\\)" },
        { prompt: "Which solvent favours SN2: water or acetone?", answer: "Acetone (polar aprotic)" },
        { prompt: "Can the product of an SN2 reaction have a rearranged carbon skeleton?", answer: "No; there is no carbocation" },
        { prompt: "Does \\(\\mathrm{R_3N + CH_3I}\\) go faster in a more polar or a less polar solvent?", answer: "More polar: charge is created in the transition state" },
      ],
      pyqExampleId: "81b59401-33c0-426b-a9ec-58e5fdd91ceb", // 2024 — when a secondary halide follows SN2 and when SN1
      traps: [
        {
          title: "A secondary halide does not have one fixed mechanism",
          body: "A strong nucleophile at high concentration in an aprotic solvent pushes a secondary halide towards SN2; a weak nucleophile such as the solvent pushes it towards SN1. Read the conditions before choosing.",
        },
        {
          title: "Adding more nucleophile does not speed SN1",
          body: "The slow step of SN1 is ionisation of the halide, so rate = \\(k[\\mathrm{RX}]\\). Doubling the nucleophile leaves the rate unchanged.",
        },
        {
          title: "Polar solvents do not speed every substitution",
          body: "A polar solvent helps when the transition state carries more charge than the reactants. For \\(\\mathrm{HO^-}\\) attacking a neutral halide the charge is spread out in the transition state, so a less polar solvent is faster.",
        },
      ],
    },

    // C2 — stereochemistry
    {
      kind: "formula" as const,
      slug: "jchalo-sn-stereo",
      name: "Stereochemistry of substitution: inversion, racemisation and retention",
      intuition:
        "Backside attack in SN2 turns the carbon inside out, like an umbrella in the wind, so the product has the opposite arrangement. In SN1 the carbocation is flat and the nucleophile can add to either face, so a single enantiomer gives a nearly racemic product. A step that does not break any bond to the stereocentre leaves its arrangement unchanged.",
      definition:
        "- **SN2**: inversion of configuration (Walden inversion). It is stereospecific: one enantiomer gives one enantiomer.\n" +
        "- **SN1**: mostly racemisation, so an optically active halide gives a product with little or no optical rotation.\n" +
        "- **Retention**: converting an alcohol to its tosylate (TsCl, pyridine) breaks O–H, not C–O, so the carbon keeps its arrangement. An SN2 on the tosylate then inverts it: one inversion overall.\n" +
        "- Inversion describes the 3-D arrangement. The R/S label changes only if the new group takes the priority rank the leaving group held, so assign priorities again after substituting.\n" +
        "- To count optically active products, write every product and look for a carbon with four different groups.",
      authoredExample: {
        prompt: "(R)-2-Bromobutane reacts with NaCN in DMSO. Name the product and give its configuration.",
        steps: [
          "A secondary halide with a strong nucleophile in a polar aprotic solvent: SN2, so the carbon is inverted.",
          "The product is \\(\\mathrm{CH_3CH_2CH(CH_3)CN}\\), 2-methylbutanenitrile.",
          "Priorities before: Br > \\(\\mathrm{C_2H_5}\\) > \\(\\mathrm{CH_3}\\) > H. After: CN (carbon bearing N, N, N) > \\(\\mathrm{C_2H_5}\\) (carbon bearing C, H, H) > \\(\\mathrm{CH_3}\\) > H.",
          "CN takes the top rank that Br held, and the arrangement is inverted, so the label changes from R to S.",
        ],
        answer: "(S)-2-Methylbutanenitrile",
      },
      selfCheckExample: {
        prompt: "Optically active (S)-3-bromo-3-methylhexane is warmed in water. Is the alcohol obtained optically active?",
        steps: [
          "A tertiary halide in water reacts by SN1 through a planar carbocation.",
          "Water adds to both faces about equally, giving (R)- and (S)-3-methylhexan-3-ol in nearly equal amounts.",
        ],
        answer: "No: the product is (almost) racemic, so it shows little or no optical rotation.",
      },
      practiceSet: [
        { prompt: "Every structural isomer of \\(\\mathrm{C_4H_9Br}\\) is treated with aqueous KOH, with no rearrangement. How many of the alcohols formed are chiral?", answer: "1 (butan-2-ol)", method: "The four isomers give butan-1-ol, butan-2-ol, 2-methylpropan-1-ol and 2-methylpropan-2-ol." },
        { prompt: "(R)-2-Chlorobutane reacts with \\(\\mathrm{CH_3S^-}\\) by SN2. What is the configuration of the product?", answer: "S", method: "S takes chlorine's top priority rank and the carbon is inverted." },
        { prompt: "What is the configuration of the tosylate made from (R)-butan-2-ol with TsCl and pyridine?", answer: "R (retention)" },
        { prompt: "Is SN2 stereospecific?", answer: "Yes: each enantiomer gives a single enantiomer of product" },
      ],
      pyqExampleId: "bbb3c77f-78b0-4e84-a094-db2fb455cfff", // 2024 — racemisation in SN1, inversion in SN2
      traps: [
        {
          title: "Inversion does not always change R to S",
          body: "Inversion is a change in the 3-D arrangement. The R/S letter changes only when the incoming group has the priority rank of the leaving group. Assign the priorities of the product again before writing the label.",
        },
        {
          title: "Tosylation keeps the configuration",
          body: "TsCl reacts at the O–H bond, so the stereocentre is untouched. The inversion comes only in the next step, when a nucleophile displaces the tosylate.",
        },
      ],
    },
  ],
};
