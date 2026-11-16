import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_HA_SUBSTITUTION_NOTE: SubtopicNote = {
  subtopicName: "Nucleophilic Substitution",
  title: "Nucleophilic Substitution",
  oneLineDefinition:
    "How a nucleophile replaces the halogen of a haloalkane in one step (SN2) or two steps through a carbocation (SN1), which halides react fastest by each path, which nucleophile gives which product, and what happens to optical activity: inversion or racemisation.",
  whyItMatters:
    "Four NEET questions from 2022 to 2026: three MODERATE and one HARD. One asks which halide reacts fastest by SN1, decided by the most stable carbocation (2024), one asks why an alkyl iodide reacts faster than an alkyl chloride by SN2 (2025), and one asks for the wrong statement about chirality, enantiomers and racemic mixtures (2022). The HARD one judges drawn products of adding Br₂ to trans-but-2-ene and alkaline KMnO₄ to cis-but-2-ene, which turn on whether each product is optically active or not (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchha-sn2",
      name: "SN2 reactions and the products of substitution",
      intuition:
        "The carbon that holds the halogen is slightly positive, so an electron-rich nucleophile attacks it. In an SN2 reaction this happens in one step: the nucleophile comes in from the side opposite the halogen, and the new bond forms as the old one breaks. Bulky groups around that carbon get in the way, so the least crowded halides react fastest.",
      definition:
        "- A **nucleophile** is an electron-rich species. It attacks the carbon that holds the halogen, and the halogen leaves as a halide ion.\n" +
        "- **SN2** (substitution, nucleophilic, bimolecular) happens in **one step**. The rate depends on both the haloalkane and the nucleophile: it is second order.\n" +
        "- The nucleophile attacks from the side **opposite** the halogen, so the configuration of the carbon is **inverted**.\n" +
        "- **SN2 reactivity:** \\(\\text{CH}_3\\text{X}\\) > 1° > 2° > 3°, because bulky groups block the nucleophile.\n" +
        "- For the same alkyl group, in both SN1 and SN2: **R-I > R-Br > R-Cl > R-F**. Iodide is the best leaving group.\n" +
        "- Products: \\(\\text{OH}^-\\) gives an alcohol, \\(\\text{R'O}^-\\) an ether, \\(\\text{NH}_3\\) an amine, KCN a nitrile (alkyl cyanide), AgCN an isocyanide, \\(\\text{KNO}_2\\) an alkyl nitrite, \\(\\text{AgNO}_2\\) a nitroalkane, and a silver carboxylate an ester.\n" +
        "- Cyanide and nitrite are **ambident** nucleophiles: they can attack through two different atoms. KCN is ionic and attacks through carbon; AgCN is mainly covalent and attacks through nitrogen.",
      formula: {
        label: "Rate law for SN2",
        latex: "\\text{Rate} = k\\,[\\text{RX}]\\,[\\text{Nu}^-]",
        symbols: [
          { symbol: "\\([\\text{RX}]\\)", meaning: "concentration of the haloalkane" },
          { symbol: "\\([\\text{Nu}^-]\\)", meaning: "concentration of the nucleophile" },
        ],
      },
      authoredExample: {
        prompt: "Arrange CH₃Br, CH₃CH₂Br, (CH₃)₂CHBr and (CH₃)₃CBr in decreasing order of SN2 reactivity.",
        steps: [
          "In SN2 the nucleophile must reach the carbon that holds Br from the back.",
          "\\(\\text{CH}_3\\text{Br}\\) has only hydrogens on that carbon, \\(\\text{CH}_3\\text{CH}_2\\text{Br}\\) has one alkyl group, \\((\\text{CH}_3)_2\\text{CHBr}\\) two and \\((\\text{CH}_3)_3\\text{CBr}\\) three.",
          "More alkyl groups crowd the back of the carbon more, so the reaction gets slower.",
        ],
        answer: "CH₃Br > CH₃CH₂Br > (CH₃)₂CHBr > (CH₃)₃CBr",
      },
      selfCheckExample: {
        prompt: "Bromoethane is treated once with KCN and once with AgCN. Name the two products.",
        steps: [
          "KCN is ionic, so the free cyanide ion attacks through carbon: \\(\\text{CH}_3\\text{CH}_2\\text{CN}\\).",
          "AgCN is mainly covalent, so the nitrogen attacks: \\(\\text{CH}_3\\text{CH}_2\\text{NC}\\).",
        ],
        answer: "Ethyl cyanide (propanenitrile) with KCN; ethyl isocyanide with AgCN",
      },
      practiceSet: [
        { prompt: "In an SN2 reaction both the haloalkane and the OH⁻ concentration are doubled. By what factor does the rate change?", answer: "By 4, since \\(\\text{rate} = k[\\text{RX}][\\text{OH}^-]\\) and \\(2 \\times 2 = 4\\)" },
        { prompt: "What product does bromoethane give with AgNO₂, and what with KNO₂?", answer: "Nitroethane with \\(\\text{AgNO}_2\\); ethyl nitrite with \\(\\text{KNO}_2\\)" },
        { prompt: "What happens to the configuration of the carbon that holds the halogen in an SN2 reaction?", answer: "It is inverted" },
        { prompt: "What does chloroethane give with sodium ethoxide, C₂H₅ONa?", answer: "Ethoxyethane (diethyl ether), \\(\\text{C}_2\\text{H}_5\\text{OC}_2\\text{H}_5\\)" },
      ],
      pyqExampleId: "5be81cf5-cc37-4f06-ba7d-1fb4656f8b4d",
      traps: [
        {
          title: "KCN and AgCN give different products",
          body: "KCN gives an alkyl cyanide (R-CN), because the ion attacks through carbon. AgCN gives an alkyl isocyanide (R-NC), because its nitrogen attacks. In the same way \\(\\text{KNO}_2\\) gives a nitrite and \\(\\text{AgNO}_2\\) a nitroalkane.",
        },
        {
          title: "SN2 is slowest for tertiary halides",
          body: "In SN2 the nucleophile attacks the crowded carbon directly, so the order is \\(\\text{CH}_3\\text{X}\\) > 1° > 2° > 3°. This is the reverse of the SN1 order.",
        },
        {
          title: "The strongest C-X bond reacts slowest",
          body: "The C-F bond is the strongest and the C-I bond the weakest, so for the same alkyl group the reactivity is R-I > R-Br > R-Cl > R-F.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchha-sn1",
      name: "SN1 reactions and carbocation stability",
      intuition:
        "In an SN1 reaction the halogen leaves first, on its own, and the carbon is left as a positive ion, a carbocation. Only then does the nucleophile join it. The slow step is the first one, so whatever makes the carbocation more stable makes the whole reaction faster, and the nucleophile does not change the rate at all.",
      definition:
        "- **SN1** (substitution, nucleophilic, unimolecular) happens in **two steps**. Step 1, slow: the C-X bond breaks to give a **carbocation** and a halide ion. Step 2, fast: the nucleophile attacks the carbocation.\n" +
        "- The rate depends only on the haloalkane: it is **first order**.\n" +
        "- SN1 reactions are usually carried out in **polar protic solvents** such as water, alcohol or acetic acid.\n" +
        "- SN1 reactivity follows carbocation stability: **3° > 2° > 1°**. 2-Bromo-2-methylpropane reacts with \\(\\text{OH}^-\\) by SN1.\n" +
        "- **Allylic and benzylic halides** react fast by SN1, because their carbocations are stabilised by resonance.",
      formula: {
        label: "Rate law for SN1",
        latex: "\\text{Rate} = k\\,[\\text{RX}]",
        symbols: [
          { symbol: "\\([\\text{RX}]\\)", meaning: "concentration of the haloalkane; the nucleophile does not appear" },
        ],
      },
      authoredExample: {
        prompt: "Arrange 1-bromopropane, 2-bromopropane and 2-bromo-2-methylpropane in decreasing order of SN1 reactivity.",
        steps: [
          "The slow step forms the carbocation, so the halide that gives the most stable carbocation reacts fastest.",
          "2-Bromo-2-methylpropane gives a tertiary carbocation, \\((\\text{CH}_3)_3\\text{C}^+\\).",
          "2-Bromopropane gives a secondary carbocation and 1-bromopropane a primary one.",
          "Carbocation stability is 3° > 2° > 1°.",
        ],
        answer: "2-Bromo-2-methylpropane > 2-bromopropane > 1-bromopropane",
      },
      selfCheckExample: {
        prompt: "In the SN1 hydrolysis of 2-bromo-2-methylpropane, the OH⁻ concentration is doubled and the haloalkane concentration kept the same. What happens to the rate?",
        steps: [
          "For SN1, \\(\\text{rate} = k[\\text{RX}]\\).",
          "\\([\\text{OH}^-]\\) does not appear in the rate law, so changing it has no effect.",
        ],
        answer: "The rate stays the same",
      },
      practiceSet: [
        { prompt: "In which step of an SN1 reaction is the carbocation formed: the slow step or the fast step?", answer: "The first, slow step" },
        { prompt: "In what kind of solvent are SN1 reactions usually carried out?", answer: "A polar protic solvent, such as water, alcohol or acetic acid" },
        { prompt: "For the same alkyl group, arrange the iodide, bromide and chloride by SN1 reactivity.", answer: "R-I > R-Br > R-Cl: the weaker the C-X bond, the faster the halide ion leaves" },
        { prompt: "Is the SN1 reactivity order of 1°, 2° and 3° alkyl halides the same as the SN2 order, or the reverse?", answer: "The reverse: 3° > 2° > 1° for SN1, and 1° > 2° > 3° for SN2" },
      ],
      pyqExampleId: "e78d6b85-e70a-4c65-a8e1-d2f1b6b1a4f7",
      traps: [
        {
          title: "The nucleophile does not set the SN1 rate",
          body: "Only the slow first step, the loss of the halide ion, decides the rate. So the SN1 rate depends on the haloalkane alone, \\(\\text{rate} = k[\\text{RX}]\\).",
        },
        {
          title: "Some primary halides react fast by SN1",
          body: "Benzyl chloride and allyl chloride are primary, yet they react quickly by SN1, because the benzylic and allylic carbocations are stabilised by resonance.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchha-stereo",
      name: "Optical activity, chirality and the stereochemistry of substitution",
      intuition:
        "Your two hands are mirror images, but you cannot lay one exactly on top of the other. A carbon joined to four different groups is the same: its molecule and its mirror image are two different compounds. They behave alike in almost every way, except that they turn plane polarised light in opposite directions. Which one an SN1 or SN2 reaction gives depends on the side the nucleophile comes from.",
      definition:
        "- **Plane polarised light** vibrates in one plane only. A compound that rotates this plane is **optically active**; the rotation is measured with a polarimeter.\n" +
        "- **Dextrorotatory**, (+): rotates the plane to the right (clockwise). **Laevorotatory**, (−): rotates it to the left.\n" +
        "- A molecule that cannot be superimposed on its mirror image is **chiral**. A carbon joined to **four different groups** is an asymmetric (chiral) carbon.\n" +
        "- **Enantiomers** are stereoisomers that are **non-superimposable mirror images**. They have the same physical properties, except that they rotate plane polarised light by the same amount in opposite directions.\n" +
        "- A **racemic mixture** has equal amounts of the two enantiomers and shows **zero optical rotation**, because the rotation of one cancels the other. It is written (±) or dl. Turning one enantiomer into a racemic mixture is **racemisation**.\n" +
        "- **SN2** on a chiral haloalkane gives **inversion** of configuration: (−)-2-bromooctane with \\(\\text{OH}^-\\) gives (+)-octan-2-ol.\n" +
        "- **SN1** on a chiral haloalkane gives **racemisation**: the carbocation is flat, so the nucleophile can attack from either face.",
      table: {
        columns: ["Term", "Meaning", "Example"],
        rows: [
          { cells: ["Chiral carbon", "Carbon joined to four different groups", "C-2 of butan-2-ol, \\(\\text{CH}_3\\text{CH(OH)CH}_2\\text{CH}_3\\)"] },
          { cells: ["Enantiomers", "Non-superimposable mirror images", "(+)-Butan-2-ol and (−)-butan-2-ol"], pyqExampleId: "d2067d1f-f953-4ccc-b45a-2e6564d37018", noteAmber: "NEET 2022: the incorrect statement called enantiomers superimposable mirror images." },
          { cells: ["Racemic mixture", "Equal amounts of two enantiomers; zero rotation", "(±)-Butan-2-ol"] },
          { cells: ["Inversion", "Product has the opposite configuration to the reactant", "SN2: (−)-2-bromooctane gives (+)-octan-2-ol"] },
          { cells: ["Racemisation", "One enantiomer turns into a racemic mixture", "SN1 on an optically active haloalkane"] },
        ],
        caption: "SN2 inverts the configuration; SN1 gives a racemic mixture.",
      },
      pyqExampleId: "d2067d1f-f953-4ccc-b45a-2e6564d37018",
      selfCheckExample: {
        prompt: "Which of these is chiral: 2-chloropropane, CH₃CHClCH₃, or 2-chlorobutane, CH₃CHClCH₂CH₃? Give the reason.",
        steps: [
          "In 2-chloropropane, C-2 carries H, Cl and two \\(\\text{CH}_3\\) groups. Two groups are the same, so it is not a chiral carbon.",
          "In 2-chlorobutane, C-2 carries H, Cl, \\(\\text{CH}_3\\) and \\(\\text{C}_2\\text{H}_5\\): four different groups.",
        ],
        answer: "2-Chlorobutane is chiral; 2-chloropropane is not",
      },
      practiceSet: [
        { prompt: "What is a compound called that rotates plane polarised light to the right, and what sign does it carry?", answer: "Dextrorotatory, shown by (+)" },
        { prompt: "How many chiral carbon atoms are there in 2-bromo-4-chloropentane, CH₃CHBrCH₂CHClCH₃?", answer: "Two: C-2 and C-4 each carry four different groups" },
        { prompt: "Do the two enantiomers of butan-2-ol have the same boiling point?", answer: "Yes. Enantiomers have the same physical properties except the direction in which they rotate plane polarised light" },
        { prompt: "Which instrument measures the angle through which a compound rotates plane polarised light?", answer: "A polarimeter" },
      ],
      traps: [
        {
          title: "Four different groups, not just four groups",
          body: "Every saturated carbon has four groups. It is chiral only when all four are different. A carbon with two identical groups, such as two \\(\\text{CH}_3\\) groups, is not chiral.",
        },
        {
          title: "Inversion with SN2, racemisation with SN1",
          body: "SN2 attack from the back inverts the configuration. SN1 goes through a flat carbocation that can be attacked from either face, so an optically active haloalkane gives a racemic mixture.",
        },
        {
          title: "Enantiomers rotate light equally, in opposite directions",
          body: "The two enantiomers rotate plane polarised light by the same angle, one to the right and one to the left. That is why an equal mixture of them shows no rotation.",
        },
      ],
    },
  ],
};
