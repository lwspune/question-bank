import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/alkenes";

export const ALKENE_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Reactions of Alkenes, Addition, Oxidation and Ozonolysis",
  title: "Reactions of Alkenes: Addition and Its Direction, KMnO₄ Oxidation, and Ozonolysis",
  oneLineDefinition:
    "An alkene adds reagents across its double bond — HX with Markovnikov's rule, HBr with peroxide the other way round, water through hydroboration the other way too — and is oxidised by KMnO₄ to a diol (cold, dilute, alkaline) or cleaved to acids (hot, acidic), or cleaved by ozone to aldehydes and ketones.",
  whyItMatters:
    "19 PYQs — half the chapter — none HARD. Seven are additions and their direction, nine are KMnO₄ (and one Wacker) oxidations, three are ozonolysis. " +
    "Three cards; the conditions decide the product every time.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetalk-addition",
      name: "Addition to Alkenes: Markovnikov, Peroxide Effect and Hydroboration",
      intuition:
        "An acid HX adds so that H goes to the double-bonded carbon that already has more H — Markovnikov — because that leaves the more stable carbocation. With HBr AND a peroxide the mechanism turns radical and Br lands on the less substituted carbon (anti-Markovnikov). Hydroboration–oxidation also puts the OH on the less substituted carbon, giving a primary alcohol from a terminal alkene.",
      definition:
        "- **HX (no peroxide)**: **Markovnikov** — X on the more substituted carbon. Propene + HBr → **2-bromopropane**; 2-methylbut-2-ene + HCl → **2-chloro-2-methylbutane**.\n" +
        "- **HBr + peroxide**: **anti-Markovnikov** (only HBr) — 2-methylbut-2-ene → **2-bromo-3-methylbutane**.\n" +
        "- **Br₂**: adds across the C=C — 2-methylbut-2-ene → **2,3-dibromo-2-methylbutane**.\n" +
        "- **Br₂ at high temperature**: substitution at the ALLYLIC carbon — propene → CH₂=CH–CH₂Br (allyl bromide).\n" +
        "- **Hydroboration–oxidation** (B₂H₆, then H₂O₂/OH⁻): anti-Markovnikov **alcohol** — propene → **propan-1-ol**; but-1-ene → **butan-1-ol**.",
      formula: {
        label: "Markovnikov's rule",
        latex: "\\mathrm{CH_3CH{=}CH_2 + HBr \\rightarrow CH_3CHBrCH_3}\\quad(\\text{with peroxide: } \\mathrm{CH_3CH_2CH_2Br})",
      },
      authoredExample: {
        prompt: "2-Methylbut-2-ene reacts with HBr in the presence of peroxide. Major product?",
        steps: [
          "(CH₃)₂C=CH–CH₃: C2 carries two methyls, C3 one.",
          "With peroxide the addition is anti-Markovnikov: Br goes to the LESS substituted carbon, C3.",
          "Product: (CH₃)₂CH–CHBr–CH₃, numbered from the Br end.",
        ],
        answer: "2-Bromo-3-methylbutane",
      },
      selfCheckExample: {
        prompt: "Propene is hydroborated and then oxidised with alkaline H₂O₂. Product?",
        steps: ["Hydroboration–oxidation adds H and OH anti-Markovnikov: OH on the terminal carbon."],
        answer: "Propan-1-ol",
      },
      practiceSet: [
        { prompt: "Major product of 2-methylbut-2-ene + HCl?", answer: "2-Chloro-2-methylbutane" },
        { prompt: "Propene + HBr (Markovnikov)?", answer: "2-Bromopropane" },
        { prompt: "Propene + Br₂ at high temperature?", answer: "Allyl bromide, CH₂=CH–CH₂Br (3-bromoprop-1-ene)" },
      ],
      pyqExampleId: "cadc91b7-3d14-4b07-84ac-3c89f8a40524",
      traps: [
        {
          title: "Applying the peroxide effect to HCl",
          body: "Only HBr reverses with peroxide. 2-Methylbut-2-ene + HCl gives the Markovnikov product, 2-chloro-2-methylbutane, peroxide or not.",
        },
        {
          title: "'3-Bromopropane' is the paper's name for allyl bromide",
          body: "The 2024 paper prints '3-Bromopropane' as the answer for propene + Br₂ at high temperature. It means CH₂=CH–CH₂Br (3-bromoprop-1-ene): allylic substitution, not addition — pick it over 1,2-dibromopropane.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetalk-kmno4-oxidation",
      name: "Oxidation by KMnO₄: Glycols or Cleavage",
      intuition:
        "Cold, dilute, alkaline KMnO₄ (Baeyer's reagent) only adds two OH groups across the double bond — a glycol. Hot KMnO₄ in dilute H₂SO₄ breaks the C=C completely: a =CH– end becomes –COOH, a =CH₂ end becomes CO₂, and a =CR₂ end becomes a ketone. A ring alkene opens into a chain with two acids — cyclohexene gives adipic acid.",
      definition:
        "- **Cold, dilute, alkaline KMnO₄**: **glycol** (vicinal diol) — Baeyer's test.\n" +
        "- **KMnO₄ / dil. H₂SO₄ (hot)**: **cleavage** — =CH–R → R–COOH; =CH₂ → CO₂; =CR₂ → ketone.\n" +
        "- Prop-1-ene → **ethanoic acid** (+ CO₂); phenylethene → **benzoic acid**; **cyclohexene → adipic acid** (hexanedioic acid).\n" +
        "- **Wacker process**: ethene + O₂ with Pd catalyst → **acetaldehyde**.",
      formula: {
        label: "Ring cleavage",
        latex: "\\text{cyclohexene} \\xrightarrow{\\mathrm{KMnO_4/H^+},\\ \\Delta} \\mathrm{HOOC(CH_2)_4COOH}",
      },
      authoredExample: {
        prompt: "Which alkene gives adipic acid with KMnO₄ in dilute H₂SO₄: hex-1-ene, hex-2-ene, hex-3-ene, cyclohexene?",
        steps: [
          "Adipic acid is HOOC–(CH₂)₄–COOH: six carbons with an acid at EACH end.",
          "Cleaving a chain alkene gives two separate molecules; only a ring alkene stays in one piece and gets an acid at both ends.",
        ],
        answer: "Cyclohexene",
      },
      selfCheckExample: {
        prompt: "Alkenes with cold, dilute alkaline KMnO₄ give: alkanol, glycol, glycerol, alkanoic acid?",
        steps: ["Cold dilute alkaline conditions add two OH — no cleavage."],
        answer: "Glycol",
      },
      practiceSet: [
        { prompt: "Prop-1-ene with acidic KMnO₄ gives?", answer: "Ethanoic acid (and CO₂)" },
        { prompt: "Phenylethene with KMnO₄/dil. H₂SO₄ gives?", answer: "Benzoic acid" },
        { prompt: "Ethene + O₂ with Pd/Al₂O₃ gives?", answer: "Acetaldehyde (Wacker)" },
      ],
      pyqExampleId: "a8229c86-b273-444a-b89d-758807f58b32",
      traps: [
        {
          title: "Stopping at cyclohexanol or cyclohexanone",
          body: "Hot acidic KMnO₄ does not stop inside the ring — it cleaves the C=C and opens it. Cyclohexanol and cyclohexanone are offered to catch a student who forgets that.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetalk-ozonolysis",
      name: "Ozonolysis",
      intuition:
        "Ozone cuts the double bond, and with Zn/H₂O workup each half becomes a carbonyl: put =O where the double bond was. A =CH₂ end gives methanal, a =CH–R end an aldehyde, a =CR₂ end a ketone. A symmetrical alkene gives two molecules of the same product.",
      definition:
        "- **Rule**: replace C=C with two C=O.\n" +
        "- Propene → **methanal + ethanal**; but-2-ene → **2 ethanal** (acetaldehyde); 2-methylpropene → acetone + methanal.\n" +
        "- Products are **aldehydes and/or ketones** (not alcohols or acids) with reductive workup.",
      formula: {
        label: "Ozonolysis",
        latex: "\\mathrm{R_2C{=}CR'_2 \\xrightarrow{O_3,\\ Zn/H_2O} R_2C{=}O + O{=}CR'_2}",
      },
      authoredExample: {
        prompt: "Products of ozonolysis of propene?",
        steps: [
          "CH₃–CH=CH₂: cut the double bond and put =O on each carbon.",
          "CH₃–CH=O and O=CH₂.",
        ],
        answer: "Ethanal and methanal",
      },
      selfCheckExample: {
        prompt: "Product of ozonolysis of but-2-ene?",
        steps: ["CH₃CH=CHCH₃ is symmetrical: both halves are CH₃CHO."],
        answer: "Acetaldehyde (two molecules)",
      },
      practiceSet: [
        { prompt: "One product class of ozonolysis: alcohol, acid, aldehyde, ester?", answer: "Aldehyde" },
      ],
      pyqExampleId: "4e6b801f-de22-4006-96e6-e209ca823c59",
    },
  ],
  related: [
    { label: "Structure and stability — what makes a carbocation 'more stable'", href: `${BASE}/cetalk-structure` },
  ],
};
