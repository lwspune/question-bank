import type { SubtopicNote } from "@/app/notes/_types";

export const CARBOHYDRATES_NOTE: SubtopicNote = {
  subtopicName: "Carbohydrates, Classification, Structure and Reactions",
  title: "Carbohydrates: Classification, Structure and Reactions",
  oneLineDefinition:
    "Carbohydrates are polyhydroxy aldehydes or ketones (or what hydrolyses to them), classed by the number of sugar units; glucose is an aldohexose with four chiral carbons that closes into a six-membered pyranose ring between C-1 and C-5, fructose a ketohexose that closes into a five-membered furanose ring, and the reactions of the open-chain form prove each part of the structure.",
  whyItMatters:
    "21 PYQs, one HARD. Fourteen are classification and structure — laevulose, aldohexose, the anomeric carbon, which carbons close the ring, hemiacetal versus hemiketal, the specific rotations, how many OH groups ribose has, which named sugar is a di-, tri- or tetrasaccharide; seven are the structure-proving reactions — bromine water for the aldehyde, acetic anhydride for the five OH, HI for the straight chain, saccharic acid, sorbitol, and the acetylation mass gain that fixes the number of OH groups. " +
    "Two cards.",
  concepts: [
    // 1 — classification and structure
    {
      kind: "formula" as const,
      slug: "cetbio-classification-and-glucose-structure",
      name: "Classification, and the Structures of Glucose and Fructose",
      intuition:
        "Classify by units first: one sugar unit is a monosaccharide, two a disaccharide, three or four an oligosaccharide, many a polysaccharide. Then by the carbonyl: an aldose has –CHO, a ketose has C=O, and the carbon count gives triose, tetrose, pentose, hexose. Glucose is the aldohexose; fructose (laevulose, laevorotatory) is the ketohexose with the same formula. In water the open chain closes: the C-5 OH of glucose adds across the C-1 aldehyde to give a HEMIACETAL, a six-membered pyranose ring, and C-1 becomes a new stereocentre — the anomeric carbon — so there are two forms, alpha and beta. Fructose closes C-5 OH onto its C-2 ketone: a HEMIKETAL, a five-membered furanose ring.",
      definition:
        "- **By units**: mono (glucose, fructose, galactose, ribose); di (sucrose, maltose, lactose); tri (**raffinose** = galactose + glucose + fructose); tetra (**stachyose** = two galactose + glucose + fructose); poly (starch, glycogen, cellulose).\n" +
        "- **By carbonyl and carbons**: glucose = aldohexose, \\(\\text{C}_6\\text{H}_{12}\\text{O}_6\\), **4 chiral carbons** (C-2 to C-5); fructose (laevulose) = ketohexose, same formula; threose = aldotetrose, **2 chiral** carbons; ribose = aldopentose, \\(\\text{C}_5\\text{H}_{10}\\text{O}_5\\), **4 OH** groups; glucose has **5 OH** (one primary, at C-6).\n" +
        "- **Ring closure**: glucose C-1 (aldehyde) + C-5 OH → six-membered **pyranose**, a **hemiacetal**; C-1 is the **anomeric** carbon; alpha and beta anomers differ only there. Fructose C-2 (ketone) + C-5 OH → five-membered **furanose**, a **hemiketal**.\n" +
        "- **Reducing or not**: a free hemiacetal/hemiketal OH makes the sugar reducing (all monosaccharides, maltose, lactose). Sucrose is **non-reducing** — both anomeric carbons are tied in the glycosidic bond.\n" +
        "- **Specific rotation**: glucose **+52.7°** (equilibrium), fructose **−92.4°**, sucrose +66.5°; hydrolysed sucrose (invert sugar) is laevorotatory, about −20°.",
      formula: {
        label: "Glucose and fructose rings",
        latex:
          "\\text{Glucose: C-1 (CHO)} + \\text{C-5 OH} \\to \\text{pyranose (hemiacetal)};\\quad \\text{Fructose: C-2 (C=O)} + \\text{C-5 OH} \\to \\text{furanose (hemiketal)}",
      },
      authoredExample: {
        prompt: "Erythrose is an aldotetrose. Give its molecular formula, the number of chiral carbons, the number of OH groups, and say which carbon becomes anomeric if it were to form a ring.",
        steps: [
          "Four carbons, general formula \\(\\text{C}_n\\text{H}_{2n}\\text{O}_n\\): \\(\\text{C}_4\\text{H}_8\\text{O}_4\\).",
          "Chiral carbons are the CHOH carbons between the CHO and the terminal CH₂OH: C-2 and C-3 — two.",
          "OH groups: three (C-2, C-3, C-4). The aldehyde carbon, C-1, would be the anomeric carbon.",
        ],
        answer: "\\(\\text{C}_4\\text{H}_8\\text{O}_4\\); 2 chiral carbons; 3 OH; C-1",
      },
      selfCheckExample: {
        prompt: "Which statement about fructose is NOT correct: it is a ketohexose; it is a reducing sugar; it is laevorotatory; its ring structure is a hemiacetal?",
        steps: [
          "A ketone closing onto an OH gives a hemiKETAL. The other three are true.",
        ],
        answer: "Its ring structure is a hemiacetal",
      },
      practiceSet: [
        { prompt: "Molecular formula of laevulose?", answer: "\\(\\text{C}_6\\text{H}_{12}\\text{O}_6\\) (fructose)" },
        { prompt: "Which carbons close the glucose ring?", answer: "C-1 and C-5" },
        { prompt: "Specific rotation of fructose?", answer: "−92.4°" },
        { prompt: "The tetrasaccharide among glycogen, cellulose, ribose, stachyose?", answer: "Stachyose" },
      ],
      pyqExampleId: "95ad37d5-6476-4fea-88c1-96f63d711058",
      traps: [
        {
          title: "Hemiacetal for fructose, three chiral carbons for glucose",
          body:
            "Glucose (aldehyde) gives a hemiACETAL and has FOUR chiral carbons; fructose (ketone) gives a hemiKETAL. Both wrong versions are offered as options in the same question.",
        },
      ],
    },

    // 2 — reactions of glucose
    {
      kind: "formula" as const,
      slug: "cetbio-glucose-reactions-and-structure-proof",
      name: "Reactions of Glucose: What Each One Proves",
      intuition:
        "Each reaction of the open-chain form is evidence for one feature. Bromine water, a mild oxidant, touches only the aldehyde: gluconic acid, so glucose has –CHO. Nitric acid oxidises both ends: saccharic acid, so there is a primary alcohol too. Five acetyl groups go on with acetic anhydride, so there are five OH. Prolonged HI reduces everything to n-hexane, so the six carbons are in a straight chain. Hydroxylamine gives an oxime and HCN a cyanohydrin (a carbonyl), and NaBH₄ reduces the aldehyde to sorbitol. What the open chain CANNOT explain is the existence of alpha and beta forms and mutarotation — those need the ring.",
      definition:
        "- \\(\\text{Br}_2\\) water → **gluconic acid** (aldehyde → COOH): proves **–CHO**. Test for the aldehyde group; Tollens/Fehling only show a reducing sugar.\n" +
        "- conc. \\(\\text{HNO}_3\\) → **saccharic acid** (glucaric acid): **two COOH, four OH** — proves the primary alcohol at C-6 as well.\n" +
        "- \\((\\text{CH}_3\\text{CO})_2\\text{O}\\) → glucose **pentaacetate**: **five OH** groups. Each OH acetylated adds **42 u** (\\(\\text{OH} \\to \\text{OCOCH}_3\\)); a gain of 84 u means 2 OH → an aldotriose (glyceraldehyde).\n" +
        "- HI, long heating → **n-hexane**: six carbons in a straight chain.\n" +
        "- \\(\\text{NH}_2\\text{OH}\\) → oxime; HCN → cyanohydrin; \\(\\text{NaBH}_4\\) → **sorbitol** (–CHO → –CH₂OH).\n" +
        "- NOT explained by the open chain: alpha/beta anomers, mutarotation, no Schiff's test, no \\(\\text{NaHSO}_3\\) adduct, pentaacetate not reacting with \\(\\text{NH}_2\\text{OH}\\).",
      formula: {
        label: "Mild and strong oxidation",
        latex:
          "\\text{Glucose} \\xrightarrow{\\text{Br}_2/\\text{H}_2\\text{O}} \\text{gluconic acid (1 COOH)};\\quad \\text{Glucose} \\xrightarrow{\\text{conc. HNO}_3} \\text{saccharic acid (2 COOH)}",
      },
      authoredExample: {
        prompt: "A monosaccharide gains 126 u on complete acetylation. How many OH groups does it have, and is it a ketotetrose or an aldotetrose?",
        steps: [
          "126 / 42 = 3 OH groups.",
          "A tetrose has four carbons; with one carbonyl, three carbons carry OH — either an aldotetrose (CHO + 3 OH) or a ketotetrose (C=O + 3 OH). Both have 3 OH, so the mass gain alone cannot separate them.",
        ],
        answer: "3 OH; either — an aldotetrose and a ketotetrose both gain 126 u",
      },
      selfCheckExample: {
        prompt: "Glucose → (Br₂ water) A; glucose → (NaBH₄) B. Name A and B.",
        steps: [
          "Mild oxidation of the aldehyde: gluconic acid. Reduction of the aldehyde: sorbitol.",
        ],
        answer: "A = gluconic acid, B = sorbitol",
      },
      practiceSet: [
        { prompt: "Reagent that confirms five OH groups in glucose?", answer: "Acetic anhydride (pentaacetate)" },
        { prompt: "Glucose heated with HI for a long time gives?", answer: "n-Hexane" },
        { prompt: "Saccharic acid: how many COOH and OH?", answer: "2 COOH, 4 OH" },
        { prompt: "Mass gain per OH on acetylation?", answer: "42 u" },
      ],
      pyqExampleId: "0a863299-2a4d-4625-9d3b-f482969ca902",
      traps: [
        {
          title: "Counting the carbonyl carbon as an OH",
          body:
            "An aldotriose has 3 carbons but only 2 OH — the CHO carbon carries none. 84 u is 2 × 42, so the answer is the aldotriose, not the tetrose.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Glycosidic Linkages — how the monosaccharides join",
      href: "/notes/mht-cet-chemistry/biomolecules/cetbio-glycosidic-linkages",
    },
    {
      label: "Aldehydes and Ketones — the carbonyl tests behind the glucose reactions",
      href: "/notes/mht-cet-chemistry/aldehydes-ketones-and-carboxylic-acids/cetald-redox-and-tests",
    },
  ],
};
