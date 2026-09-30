import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/hydrocarbons";

export const OXIDATION_HC_NOTE: SubtopicNote = {
  subtopicName: "Halogen Addition, Oxidation and Ozonolysis of Alkenes",
  title: "Halogen Addition, Oxidation and Ozonolysis of Alkenes",
  oneLineDefinition:
    "Bromine adds anti across a C=C through a bromonium ion; cold dilute KMnO₄ turns it into a diol while hot acidic KMnO₄ cuts it; ozonolysis cuts it into two carbonyl compounds whose structures reveal where the double bond was.",
  whyItMatters:
    "Twenty-six PYQs, twenty-two of them multiple choice, and four from 2026. Five are about adding a halogen, the stereochemistry of bromine addition, bromine water or substitution at the allylic carbon. Seven use KMnO₄, cold for a diol or hot for cleavage. Fourteen are ozonolysis: predict the carbonyl products, or work back from them to the alkene. Four of the twenty-six ask for a number.",
  concepts: [
    // C1 — halogen addition and allylic substitution
    {
      kind: "reference" as const,
      slug: "jchc-halogen-addition",
      name: "Adding halogens across C=C, and allylic substitution",
      intuition:
        "Br₂ attacks a C=C to form a three-membered bromonium ion. The second nucleophile must come from the opposite face, so the two new groups end up anti (trans). If water is the solvent, water is that second nucleophile, and it attacks the more substituted carbon because that carbon carries more of the positive charge. In light or at high temperature, with little halogen, the halogen does not add at all: a radical takes the allylic H instead, because the allylic radical is stabilised by resonance.",
      definition:
        "- \\(\\mathrm{Br_2}\\) in \\(\\mathrm{CCl_4}\\): anti addition. trans-But-2-ene gives meso-2,3-dibromobutane; cis-but-2-ene gives the racemic (±) pair. The red-brown colour disappears (test for C=C).\n" +
        "- Bromine water: a bromohydrin, OH on the more substituted carbon (Markovnikov), Br on the other.\n" +
        "- \\(\\mathrm{Cl_2}\\) or \\(\\mathrm{Br_2}\\) in light or at high temperature, or NBS: substitution at the allylic (or benzylic) C–H.",
      table: {
        columns: ["Reagent and conditions", "Type of reaction", "Product from cyclohexene", "Stereochemistry"],
        rows: [
          { cells: ["\\(\\mathrm{Br_2}\\) in \\(\\mathrm{CCl_4}\\), dark", "Electrophilic addition", "1,2-Dibromocyclohexane", "trans (anti addition)"] },
          { cells: ["\\(\\mathrm{Br_2}\\) in water", "Addition of Br and OH", "2-Bromocyclohexan-1-ol", "trans (anti addition)"] },
          { cells: ["\\(\\mathrm{Cl_2}\\) in \\(\\mathrm{CCl_4}\\), dark", "Electrophilic addition", "1,2-Dichlorocyclohexane", "trans (anti addition)"] },
          { cells: ["\\(\\mathrm{Cl_2}\\), light or 500 °C (low concentration)", "Radical allylic substitution", "3-Chlorocyclohexene", "C=C kept; racemic at C-3"] },
          { cells: ["NBS, light or peroxide", "Radical allylic substitution", "3-Bromocyclohexene", "C=C kept; racemic at C-3"] },
        ],
        caption: "The same halogen adds in the dark and substitutes at the allylic carbon in light: the conditions decide.",
      },
      selfCheckExample: {
        prompt: "What does cis-but-2-ene give with \\(\\mathrm{Br_2}\\) in \\(\\mathrm{CCl_4}\\)?",
        steps: [
          "Anti addition to a cis alkene puts the two Br on opposite faces.",
          "The product has two stereocentres and no mirror plane; attack at either carbon of the bromonium ion gives the two enantiomers equally.",
        ],
        answer: "Racemic (±)-2,3-dibromobutane",
      },
      practiceSet: [
        { prompt: "Product of 2-methylpropene with bromine water?", answer: "1-Bromo-2-methylpropan-2-ol" },
        { prompt: "What does trans-but-2-ene give with Br₂?", answer: "meso-2,3-Dibromobutane" },
        { prompt: "Which reagent brominates toluene at the CH₃ group?", answer: "Br₂ in light (or NBS), giving benzyl bromide" },
        { prompt: "Why does bromine water lose its colour with an alkene?", answer: "Br₂ adds across the C=C" },
      ],
      pyqExampleId: "2a6a4296-6153-4399-bec7-fb0c90db6b91", // 2021 — bromine water and propene, assertion–reason
      traps: [
        {
          title: "Anti addition to trans gives meso",
          body: "It is easy to swap these. trans-But-2-ene + Br₂ gives the optically inactive meso compound; cis-but-2-ene gives the racemic pair.",
        },
        {
          title: "Light turns addition into substitution",
          body: "Cl₂ in CCl₄ in the dark adds across cyclohexene. Cl₂ in light (or at high temperature) replaces an allylic H and keeps the C=C. Read the conditions before choosing.",
        },
      ],
    },

    // C2 — KMnO4
    {
      kind: "formula" as const,
      slug: "jchc-kmno4-oxidation",
      name: "KMnO₄: cold gives a diol, hot cuts the C=C",
      intuition:
        "Cold, dilute, alkaline KMnO₄ (Baeyer's reagent) adds two OH groups to the same face of the C=C, and its purple colour disappears. Hot acidic KMnO₄ goes further and breaks the C=C. Each doubly bonded carbon becomes a C=O, and any H left on it is oxidised too: a =CH₂ end becomes CO₂, a =CHR end becomes an acid RCOOH, and a =CR₂ end stays as a ketone.",
      definition:
        "- **Cold, dilute, alkaline KMnO₄**: syn-diol. Ethene gives ethane-1,2-diol; cyclohexene gives cis-cyclohexane-1,2-diol.\n" +
        "- **Hot acidic (or hot alkaline, then acid) KMnO₄**: cleavage. \\(\\mathrm{=CH_2 \\rightarrow CO_2}\\) (effervescence), \\(\\mathrm{=CHR \\rightarrow RCOOH}\\), \\(\\mathrm{=CR_2 \\rightarrow R_2C{=}O}\\).\n" +
        "- A ring alkene gives ONE open-chain product with a group at each end: cyclohexene gives hexanedioic (adipic) acid.",
      formula: {
        label: "Hot KMnO₄ cleavage",
        latex: "\\mathrm{R_2C{=}CHR' \\xrightarrow{KMnO_4/H^+,\\ \\Delta} R_2C{=}O + R'COOH},\\qquad \\mathrm{{=}CH_2 \\rightarrow CO_2 + H_2O}",
      },
      authoredExample: {
        prompt: "What does 2-methylpent-2-ene give with hot acidic KMnO₄?",
        steps: [
          "Split \\(\\mathrm{(CH_3)_2C{=}CH{-}CH_2CH_3}\\) at the C=C.",
          "The left carbon carries two methyls and no H: it becomes the ketone \\(\\mathrm{(CH_3)_2C{=}O}\\).",
          "The right carbon carries one H and an ethyl group: it becomes \\(\\mathrm{CH_3CH_2COOH}\\).",
        ],
        answer: "Propanone and propanoic acid",
      },
      selfCheckExample: {
        prompt: "What does hex-3-ene give with hot acidic KMnO₄?",
        steps: [
          "\\(\\mathrm{CH_3CH_2CH{=}CHCH_2CH_3}\\) is symmetrical; each doubly bonded carbon has one H and one ethyl group.",
          "Each half becomes \\(\\mathrm{CH_3CH_2COOH}\\).",
        ],
        answer: "Two moles of propanoic acid",
      },
      practiceSet: [
        { prompt: "What does pent-1-ene give with hot acidic KMnO₄?", answer: "Butanoic acid and CO₂" },
        { prompt: "What does cyclohexene give with cold dilute alkaline KMnO₄?", answer: "cis-Cyclohexane-1,2-diol" },
        { prompt: "Which C₄H₈ alkene gives only one product, ethanoic acid, on hot KMnO₄ cleavage?", answer: "But-2-ene" },
        { prompt: "What does 2,3-dimethylbut-2-ene give with hot acidic KMnO₄?", answer: "Two moles of propanone" },
      ],
      pyqExampleId: "4afdb4c4-eb78-4c4e-a711-299b9a7f4a06", // 2022 — C4H8 isomer giving CO2 + ketone
      traps: [
        {
          title: "=CH₂ gives CO₂, not methanal, with hot KMnO₄",
          body: "Hot KMnO₄ oxidises everything it can. A terminal =CH₂ becomes CO₂ (seen as effervescence), and an aldehyde fragment becomes the acid. Only ozonolysis with Zn/H₂O stops at HCHO and aldehydes.",
        },
        {
          title: "Baeyer's reagent gives a diol, not cleavage",
          body: "Cold, dilute, alkaline KMnO₄ keeps both carbons joined and adds two OH groups on the same face. A ring alkene gives a cis-1,2-diol.",
        },
      ],
    },

    // C3 — ozonolysis
    {
      kind: "formula" as const,
      slug: "jchc-ozonolysis",
      name: "Ozonolysis: predicting products and working back to the alkene",
      intuition:
        "Ozonolysis cuts every C=C and puts =O on each of its carbons, keeping any H that was there. So the products are aldehydes and ketones, and nothing else in the molecule changes. To work backwards, take the two carbonyl carbons, delete the two oxygens and join the carbons by a double bond. If the only product is one molecule with two C=O groups, the alkene was a ring.",
      definition:
        "- Reagents: O₃, then Zn/H₂O (reductive work-up). =CH₂ gives HCHO; =CHR gives RCHO; =CR₂ gives R₂C=O.\n" +
        "- With water alone (no Zn), H₂O₂ formed in the reaction oxidises the aldehydes to acids.\n" +
        "- One mole of O₃ per C=C. A cycloalkene gives one dicarbonyl chain; a diene gives three fragments (or two if it is cyclic).\n" +
        "- Moles of H₂ taken up on hydrogenation = number of C=C (and each C≡C takes two).",
      formula: {
        label: "Reductive ozonolysis",
        latex: "\\mathrm{R_2C{=}CHR' \\xrightarrow{(i)\\ O_3\\quad (ii)\\ Zn/H_2O} R_2C{=}O + R'CHO}",
      },
      authoredExample: {
        prompt: "What does 1-methylcyclopentene give on ozonolysis followed by Zn/H₂O?",
        steps: [
          "The ring carbons are C-1 (bearing CH₃) and C-2 to C-5. The C=C is between C-1 and C-2.",
          "Cutting it keeps the ring atoms in one chain: C-1 becomes a ketone carbon (it has CH₃ and C-5), C-2 becomes a CHO (it had one H).",
          "The chain is \\(\\mathrm{CH_3{-}CO{-}CH_2{-}CH_2{-}CH_2{-}CHO}\\): six carbons, CHO at C-1 and C=O at C-5.",
        ],
        answer: "5-Oxohexanal, one product",
      },
      selfCheckExample: {
        prompt: "Which alkene gives propanone and propanal on ozonolysis (Zn/H₂O)?",
        steps: [
          "Remove the oxygens from \\(\\mathrm{(CH_3)_2C{=}O}\\) and \\(\\mathrm{CH_3CH_2CH{=}O}\\) and join the two carbons.",
          "That gives \\(\\mathrm{(CH_3)_2C{=}CH{-}CH_2CH_3}\\).",
        ],
        answer: "2-Methylpent-2-ene",
      },
      practiceSet: [
        { prompt: "What does propene give on ozonolysis with Zn/H₂O?", answer: "Ethanal and methanal" },
        { prompt: "What does cyclohexene give on ozonolysis with Zn/H₂O?", answer: "Hexanedial (one product)" },
        { prompt: "0.01 mol of an open-chain hydrocarbon with no C≡C takes up 448 mL of H₂ at STP. How many C=C does it have?", answer: "2 (0.02 mol H₂ per 0.01 mol)" },
        { prompt: "What does but-2-ene give on ozonolysis with water alone (no Zn)?", answer: "Ethanoic acid" },
      ],
      pyqExampleId: "d81e8c05-92bb-45d1-99f9-a6f814ea2320", // 2023 — C6H8 diene giving two moles of malondialdehyde
      traps: [
        {
          title: "A ring alkene gives one product, not two",
          body: "The ring atoms stay joined through the rest of the ring, so cleaving a ring C=C opens the ring into one chain with a carbonyl at each end. Do not split it into two molecules.",
        },
        {
          title: "Zn decides aldehyde or acid",
          body: "O₃ then Zn/H₂O gives aldehydes. O₃ then H₂O alone (or H₂O₂) gives carboxylic acids from the same carbons. Ketone fragments are the same either way.",
        },
        {
          title: "cis and trans isomers give the same products",
          body: "Ozonolysis destroys the C=C, so the geometry is lost. cis- and trans-but-2-ene both give two moles of ethanal.",
        },
      ],
    },
  ],
  related: [
    { label: "Alkene Stability and Addition of HX and Water", href: `${BASE}/jch-hc-addition` },
    { label: "Alkynes: Preparation, Acidity, Reduction and Addition — ozonolysis of C≡C", href: `${BASE}/jch-hc-alkynes` },
  ],
};
