import type { SubtopicNote } from "@/app/notes/_types";

export const CYCLIC_BIO_NOTE: SubtopicNote = {
  subtopicName: "Cyclic Structures, D/L Configuration and Anomers",
  title: "Cyclic Structures, D/L Configuration and Anomers",
  oneLineDefinition:
    "A sugar is D or L by the OH on its last stereocentre in the Fischer projection, not by its sign of rotation; glucose closes into a six-membered ring and fructose into a five-membered one, and the new stereocentre at the carbonyl carbon gives the α and β anomers.",
  whyItMatters:
    "Thirteen PYQs, all multiple choice, three from 2026. Seven ask for a D or L structure from a Fischer projection, often after the chain is lengthened with HCN or oxidised to a tartaric acid. Six are about the ring forms: the properties of the two anomers, anomers against epimers, and turning an open chain into its pyranose or furanose ring. Most of them show the structures as drawings.",
  concepts: [
    // C1 — D/L from the Fischer projection
    {
      kind: "formula" as const,
      slug: "jcbio-fischer-dl",
      name: "D/L configuration from the Fischer projection",
      intuition:
        "D and L compare a sugar with glyceraldehyde. Draw the chain with the carbonyl at the top and look only at the last stereocentre, the one just above the terminal CH₂OH. OH on the right means D, on the left means L. The letter says nothing about the sign of rotation: D-glucose is (+) and D-fructose is (−). The mirror image of a D-sugar is its L form, with every OH moved to the other side.",
      definition:
        "- Put C-1 at the top. The reference carbon is the highest-numbered stereocentre: C-5 in glucose and fructose, C-4 in a pentose, C-3 in a tetrose. The bottom \\(\\mathrm{CH_2OH}\\) carbon is not a stereocentre.\n" +
        "- (+) and (−) are measured; D and L are structural. They are independent.\n" +
        "- An **L-sugar** is the mirror image of the D-sugar: **every** OH flips, not only the reference one.\n" +
        "- A Fischer projection may be turned through 180° in the plane without changing the compound. Turning it through 90°, or swapping two groups on one carbon, gives the other configuration.\n" +
        "- An open-chain aldose with \\(n\\) carbons has \\(n-2\\) stereocentres; a ketose has \\(n-3\\). Half of the \\(2^k\\) stereoisomers are D and half L.\n" +
        "- D-glucose and D-fructose have the same configuration at C-3, C-4 and C-5.\n" +
        "- Tetroses and tartaric acid: in **D-erythrose** both OH are on the right, and nitric acid gives **meso-tartaric acid** (optically inactive). In **D-threose** the C-2 OH is on the left, and nitric acid gives an optically active tartaric acid.\n" +
        "- **Kiliani chain-lengthening**: HCN adds to the CHO and makes a new stereocentre, so one aldose gives two products that differ only at the new carbon. Hydrolysis turns the CN into COOH.",
      formula: {
        label: "Stereocentres and stereoisomers of an open-chain sugar",
        latex:
          "k_{\\text{aldose}} = n - 2 \\qquad k_{\\text{ketose}} = n - 3 \\qquad N_{\\text{stereoisomers}} = 2^{k}, \\text{ half of them D}",
      },
      authoredExample: {
        prompt:
          "How many stereoisomers does an open-chain aldopentose have, and how many of them are D-sugars? Draw L-ribose from D-ribose, in which every OH is on the right.",
        steps: [
          "An aldopentose has 5 carbons; C-1 (CHO) and C-5 (\\(\\mathrm{CH_2OH}\\)) are not stereocentres, so \\(k = 5 - 2 = 3\\).",
          "Stereoisomers: \\(2^3 = 8\\). Half have the C-4 OH on the right, so 4 are D.",
          "L-ribose is the mirror image: the OH at C-2, C-3 and C-4 all move to the left.",
        ],
        answer: "8 stereoisomers, 4 of them D; L-ribose has all three OH groups on the left.",
      },
      selfCheckExample: {
        prompt:
          "An aldopentose in Fischer projection has CHO at the top, the C-2 OH on the left, the C-3 OH on the right and the C-4 OH on the left. Is it D or L? D-xylose has its OH groups right, left, right. Name the sugar.",
        steps: [
          "The reference carbon of a pentose is C-4. Its OH is on the left, so the sugar is L.",
          "Flip every OH: right, left, right. That is D-xylose.",
          "So the sugar is the mirror image of D-xylose.",
        ],
        answer: "L; it is L-xylose.",
      },
      practiceSet: [
        { prompt: "How many stereocentres does open-chain D-glucose have?", answer: "4 (C-2 to C-5)" },
        { prompt: "Which carbon decides whether fructose is D or L?", answer: "C-5" },
        { prompt: "What does nitric acid give from D-erythrose?", answer: "meso-Tartaric acid, optically inactive" },
        { prompt: "Is D-fructose dextrorotatory or laevorotatory?", answer: "Laevorotatory" },
      ],
      pyqExampleId: "f6d0c790-66bb-414d-8e4b-663fa4818c77", // 2023 — Kiliani on D-glyceraldehyde then HNO3: one meso, one active
      traps: [
        {
          title: "D and L are not the sign of rotation",
          body: "D-glucose is dextrorotatory and D-fructose is laevorotatory. D or L comes from the position of the last stereocentre's OH; + or − comes from a polarimeter.",
        },
        {
          title: "The terminal CH₂OH carbon is not a stereocentre",
          body: "The reference is the last CHOH above the CH₂OH, not the CH₂OH itself. Counting the bottom carbon as a stereocentre turns a tetrose into a pentose and misreads the drawing.",
        },
        {
          title: "L-glucose flips every OH",
          body: "L-glucose is the mirror image of D-glucose, so its OH groups at C-2, C-3, C-4 and C-5 are all on the opposite side. Flipping only the C-5 OH gives a different sugar, L-idose.",
        },
      ],
    },

    // C2 — ring forms, anomers and epimers
    {
      kind: "reference" as const,
      slug: "jcbio-anomers-haworth",
      name: "Cyclic structures, anomers and epimers of glucose and fructose",
      intuition:
        "The OH on C-5 of glucose adds to its own CHO group and closes a six-membered ring, a cyclic hemiacetal. That makes C-1 a new stereocentre, so there are two rings, α and β, called anomers. Fructose closes the same way, C-5 OH onto the C-2 ketone, but its ring has five members. The open-chain aldehyde is only a small share of glucose at equilibrium, which is why some aldehyde tests fail.",
      definition:
        "- The open chain cannot explain these facts (NCERT): glucose gives no Schiff's test and no hydrogensulphite adduct with \\(\\mathrm{NaHSO_3}\\), and its pentaacetate does not react with hydroxylamine, so no free CHO is present.\n" +
        "- Glucose exists in two crystalline forms: **α** (m.p. 419 K), crystallised from a concentrated solution at 303 K, and **β** (m.p. 423 K), crystallised from a hot saturated solution at 371 K.\n" +
        "- Their specific rotations are about +111° (α) and +19° (β); in water either changes to the equilibrium value +52.5° (mutarotation). These rotation values are standard data, not printed in the NCERT text.\n" +
        "- A six-membered ring (five C and one O) is a **pyranose**; a five-membered ring (four C and one O) is a **furanose**. Glucose is a pyranose, fructose a furanose.\n" +
        "- **Haworth projection** of a D-sugar: the \\(\\mathrm{CH_2OH}\\) sits above the ring; a group on the right in the Fischer projection goes below the ring, a group on the left goes above. In α-D-glucopyranose the C-1 OH is below the ring, on the side opposite the \\(\\mathrm{CH_2OH}\\); in β it is above.",
      table: {
        columns: ["Pair", "Relationship", "Where they differ"],
        rows: [
          { cells: ["α-D-glucose and β-D-glucose", "Anomers", "Configuration at C-1 only"] },
          { cells: ["D-glucose and D-galactose", "Epimers", "Configuration at C-4 only"] },
          { cells: ["D-glucose and D-mannose", "Epimers", "Configuration at C-2 only"] },
          { cells: ["D-glucose and D-fructose", "Functional isomers, both C₆H₁₂O₆", "Aldehyde at C-1 against ketone at C-2"] },
          { cells: ["D-glucose and L-glucose", "Enantiomers", "Every stereocentre inverted"] },
          { cells: ["Glucose and ribose", "Called homologous in some papers", "Ribose has one CHOH unit fewer, C₅ against C₆"], noteAmber: "They differ by CH₂O, not by CH₂, so this is a paper's label, not a true homologous series." },
        ],
        caption: "Anomers differ at the anomeric carbon; epimers differ at any one other stereocentre.",
      },
      selfCheckExample: {
        prompt: "Glucose pentaacetate does not react with hydroxylamine. What does that show about the structure of glucose?",
        steps: [
          "Hydroxylamine reacts with a free carbonyl group to give an oxime.",
          "In the pentaacetate every OH, including the one on C-1, is acetylated, so the ring cannot open back to a CHO.",
          "So in glucose the C-1 aldehyde is tied up in a ring as a hemiacetal, and only a small open-chain share carries a free CHO.",
        ],
        answer: "Glucose has a cyclic hemiacetal structure; the C-1 carbonyl is not free.",
      },
      practiceSet: [
        { prompt: "What is the ring size of glucose in its cyclic form?", answer: "Six-membered (pyranose)" },
        { prompt: "Which carbon is the anomeric carbon of fructose?", answer: "C-2" },
        { prompt: "At which carbon do D-glucose and D-galactose differ?", answer: "C-4" },
        { prompt: "In the Haworth projection of a D-sugar, where does an OH that was on the right in the Fischer projection go?", answer: "Below the ring" },
      ],
      pyqExampleId: "0cc4f5e8-08b1-4bc8-b6c1-a71c8f1286c0", // 2026 — anomers: C-1, melting points, rotations, crystallisation temperatures
      traps: [
        {
          title: "The α anomer has the lower melting point and the higher rotation",
          body: "α-D-Glucose melts at 419 K and rotates about +111°; β-D-glucose melts at 423 K and rotates about +19°. A statement that swaps either pair is false.",
        },
        {
          title: "Fructose forms a five-membered ring",
          body: "The C-5 OH of fructose adds to the C-2 ketone, so the ring holds four carbons and one oxygen: a furanose. In sucrose the fructose unit is β-D-fructofuranose.",
        },
        {
          title: "Anomers and epimers are different pairs",
          body: "α- and β-glucose differ at C-1, the anomeric carbon, so they are anomers. Glucose and galactose differ at C-4, so they are epimers, not anomers.",
        },
      ],
    },
  ],
};
