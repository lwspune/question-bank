import type { SubtopicNote } from "@/app/notes/_types";

export const CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Classification of Alcohols and Phenols",
  title: "Classification of Alcohols and Phenols",
  oneLineDefinition:
    "An alcohol is classed by the carbon that carries OH — primary, secondary or tertiary, and allylic (next to C=C), benzylic (on a ring carbon) or vinylic (on the C=C itself) — and by how many OH groups it has: monohydric, dihydric, trihydric; a phenol has OH directly on the benzene ring.",
  whyItMatters:
    "22 PYQs, 1 HARD — the paper's favourite way into this chapter. Thirteen ask which drawn or named alcohol is primary, secondary or tertiary allylic, secondary benzylic, or vinylic; seven ask which named phenol or polyol is dihydric, trihydric, isomeric with catechol, or not phenolic at all; two are the formula and the anti-Markovnikov preparation of a named alcohol. " +
    "Three cards.",
  concepts: [
    // 1 — allylic, benzylic, vinylic
    {
      kind: "formula" as const,
      slug: "cetalc-allylic-benzylic-vinylic",
      name: "Allylic, Benzylic and Vinylic Alcohols, and 1°/2°/3°",
      intuition:
        "Two labels stack on the OH carbon. First, how many carbons it carries: one — primary, two — secondary, three — tertiary. Second, what sits next to it: a C=C one bond away — allylic; a benzene ring directly attached — benzylic; OH on the double-bond carbon itself — vinylic (an enol). So but-3-en-2-ol is a SECONDARY ALLYLIC alcohol and 2-methylbut-3-en-2-ol a tertiary allylic one.",
      definition:
        "- **Primary allylic**: \\(\\text{CH}_2\\text{=CH-CH}_2\\text{OH}\\) (prop-2-en-1-ol, allyl alcohol); \\(\\text{CH}_3\\text{CH=CH-CH}_2\\text{OH}\\) (but-2-en-1-ol, crotyl alcohol).\n" +
        "- **Secondary allylic**: \\(\\text{CH}_2\\text{=CH-CH(OH)-CH}_3\\) (but-3-en-2-ol); \\(\\text{CH}_3\\text{CH=CH-CH(OH)CH}_3\\).\n" +
        "- **Tertiary allylic**: \\(\\text{CH}_2\\text{=CH-C(CH}_3)_2\\text{OH}\\) (2-methylbut-3-en-2-ol).\n" +
        "- **Vinylic**: OH on the sp² carbon — but-2-en-2-ol. **Benzylic**: \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{OH}\\) (1°), \\(\\text{C}_6\\text{H}_5\\text{CH(OH)CH}_3\\) (2°), \\(\\text{C}_6\\text{H}_5\\text{C(OH)(CH}_3)_2\\) (3°).\n" +
        "- NOT allylic: but-3-en-1-ol and pent-3-en-1-ol (OH two carbons from the C=C); NOT benzylic: 2-phenylethanol.",
      formula: {
        label: "Two labels on the OH carbon",
        latex:
          "\\text{degree: } 1^\\circ/2^\\circ/3^\\circ \\text{ by carbons attached};\\quad \\text{allylic: C=C next door};\\ \\text{benzylic: ring next door};\\ \\text{vinylic: OH on C=C}",
      },
      authoredExample: {
        prompt: "Classify pent-1-en-3-ol, 1-phenylpropan-1-ol and 2-methylprop-1-en-1-ol.",
        steps: [
          "Pent-1-en-3-ol: OH on C3 bearing H, vinyl and ethyl — secondary allylic. 1-Phenylpropan-1-ol: OH on the ring-attached carbon with an ethyl — secondary benzylic. 2-Methylprop-1-en-1-ol: OH on the double-bond carbon — vinylic.",
        ],
        answer: "Secondary allylic; secondary benzylic; vinylic",
      },
      selfCheckExample: {
        prompt: "Which is a tertiary allylic alcohol: prop-2-en-1-ol, but-3-en-2-ol, 2-methylprop-2-en-1-ol, 2-methylbut-3-en-2-ol?",
        steps: [
          "Only the last has OH on a carbon with three carbon groups next to a C=C.",
        ],
        answer: "2-Methylbut-3-en-2-ol",
      },
      practiceSet: [
        { prompt: "Crotyl alcohol is which class?", answer: "Allylic (primary)" },
        { prompt: "Vinylic among prop-2-en-1-ol, but-2-en-2-ol, but-3-en-2-ol?", answer: "But-2-en-2-ol" },
        { prompt: "Secondary benzylic alcohol: PhCH₂OH or PhCH(OH)CH₃?", answer: "PhCH(OH)CH₃" },
        { prompt: "Allylic: but-1-en-1-ol, but-3-en-1-ol, but-2-en-1-ol?", answer: "But-2-en-1-ol" },
      ],
      pyqExampleId: "3c4fa3b6-197f-42ef-b68b-f8b1ddabc9f6",
      traps: [
        {
          title: "Calling but-3-en-1-ol allylic",
          body:
            "Count the bonds: OH carbon → CH₂ → CH=. Two carbons away is homoallylic, not allylic. Allylic means the OH carbon is bonded directly to a double-bond carbon.",
        },
      ],
    },

    // 2 — hydric classes and named phenols
    {
      kind: "reference" as const,
      slug: "cetalc-hydric-classes-and-named-phenols",
      name: "Monohydric, Dihydric, Trihydric: the Named Diols and Phenols",
      intuition:
        "Count the OH groups. Ethylene glycol and the three benzenediols are dihydric; glycerol and the two benzenetriols are trihydric; crotyl alcohol, with one OH, is monohydric even though it is an alkene. Among the benzenediols, catechol (1,2), resorcinol (1,3) and quinol (1,4) are isomers of one another.",
      definition:
        "- **Dihydric**: ethylene glycol \\(\\text{HOCH}_2\\text{CH}_2\\text{OH}\\); catechol, resorcinol, quinol (hydroquinone) — benzene-1,2-, 1,3-, 1,4-diol.\n" +
        "- **Trihydric**: glycerol (propane-1,2,3-triol, drawn as three carbons each with OH and NO double bond); pyrogallol (1,2,3) and phloroglucinol (1,3,5).\n" +
        "- Phloroglucinol is the planted 'dihydric' option — it has three OH. Crotonyl alcohol is the planted 'dihydric' among glycol, resorcinol, quinol — it has one.\n" +
        "- Phenolic OH = OH directly on a benzene ring: curcumin, eugenol, gallic acid have it; **ascorbic acid** does not (enediol on a furanone ring).",
      table: {
        columns: ["Compound", "OH count", "Class", "Note"],
        rows: [
          { cells: ["Crotonyl (crotyl) alcohol", "1", "Monohydric, allylic", "Not dihydric despite the C=C"] },
          { cells: ["Ethylene glycol", "2", "Dihydric alcohol", "Intramolecular H-bond"] },
          { cells: ["Catechol / resorcinol / quinol", "2", "Dihydric phenols", "1,2 / 1,3 / 1,4 — isomers of each other"], noteAmber: "Resorcinol is the isomer of catechol the paper keys." },
          { cells: ["Glycerol (propylene glycerol)", "3", "Trihydric alcohol", "Propane-1,2,3-triol"] },
          { cells: ["Pyrogallol / phloroglucinol", "3", "Trihydric phenols", "1,2,3 / 1,3,5"], noteAmber: "Phloroglucinol is NOT dihydric." },
          { cells: ["Ascorbic acid", "—", "Not a phenol", "No OH on a benzene ring"] },
        ],
        caption: "Dihydric means two OH; the benzenediols are each other's isomers.",
      },
      selfCheckExample: {
        prompt: "Which pair are both dihydric phenols: resorcinol and pyrogallol, quinol and phloroglucinol, catechol and quinol?",
        steps: [
          "Pyrogallol and phloroglucinol are trihydric; catechol and quinol both carry two OH.",
        ],
        answer: "Catechol and quinol",
      },
      practiceSet: [
        { prompt: "NOT dihydric: catechol, resorcinol, phloroglucinol, hydroquinone?", answer: "Phloroglucinol" },
        { prompt: "Isomer of catechol?", answer: "Resorcinol (or quinol)" },
        { prompt: "A trihydric alcohol?", answer: "Glycerol" },
        { prompt: "No phenolic OH: curcumin, eugenol, gallic acid, ascorbic acid?", answer: "Ascorbic acid" },
      ],
      pyqExampleId: "88779427-f18f-4d48-911f-0b9a93cf3d35",
      traps: [
        {
          title: "Reading '-ol' endings as OH counts",
          body:
            "Phloroglucinol ends like a diol but has three OH groups; pyrogallol too. Count from the structure or the IUPAC name (benzene-1,3,5-triol), never from the common name.",
        },
      ],
    },

    // 3 — formula and preparation
    {
      kind: "formula" as const,
      slug: "cetalc-formula-and-preparation-of-alcohols",
      name: "Molecular Formula and the Preparations of Alcohols",
      intuition:
        "A saturated acyclic alcohol is \(\text{C}_n\text{H}_{2n+2}\text{O}\) — a ring or a C=C costs two hydrogens. Alcohols come from alkenes by acid-catalysed hydration (Markovnikov, OH on the more substituted carbon) or by hydroboration–oxidation (anti-Markovnikov, OH on the terminal carbon), from carbonyls by reduction or Grignard, and from halides by aqueous alkali.",
      definition:
        "- \\(\\text{C}_5\\text{H}_{12}\\text{O}\\) is pentan-3-ol (or any saturated pentanol); cyclopentanol is \\(\\text{C}_5\\text{H}_{10}\\text{O}\\), cyclopent-3-en-1-ol \\(\\text{C}_5\\text{H}_8\\text{O}\\).\n" +
        "- **Hydroboration–oxidation** (\\(\\text{B}_2\\text{H}_6\\), then \\(\\text{H}_2\\text{O}_2/\\text{OH}^-\\)): anti-Markovnikov — but-1-ene → **butan-1-ol**.\n" +
        "- **Acid hydration** (\\(\\text{H}_2\\text{SO}_4\\), then water): Markovnikov — propene → propan-2-ol; but-1-ene → butan-2-ol.\n" +
        "- Aldehyde + \\(\\text{LiAlH}_4\\)/\\(\\text{NaBH}_4\\) → 1° alcohol; ketone → 2° alcohol. Grignard on methanal → 1°, on other aldehydes → 2°, on ketones → 3°.\n" +
        "- R–X + aqueous KOH → R–OH.",
      formula: {
        label: "The two hydrations",
        latex:
          "\\text{RCH=CH}_2 \\xrightarrow{\\text{B}_2\\text{H}_6;\\ \\text{H}_2\\text{O}_2/\\text{OH}^-} \\text{RCH}_2\\text{CH}_2\\text{OH};\\qquad \\text{RCH=CH}_2 \\xrightarrow{\\text{H}_2\\text{SO}_4;\\ \\text{H}_2\\text{O}} \\text{RCH(OH)CH}_3",
      },
      authoredExample: {
        prompt: "Give the product of propene by (i) hydroboration–oxidation and (ii) acid-catalysed hydration.",
        steps: [
          "(i) Anti-Markovnikov: propan-1-ol. (ii) Markovnikov: propan-2-ol.",
        ],
        answer: "Propan-1-ol; propan-2-ol",
      },
      selfCheckExample: {
        prompt: "Which has the formula \\(\\text{C}_4\\text{H}_{10}\\text{O}\\): cyclobutanol, butan-2-ol, but-3-en-1-ol?",
        steps: [
          "Saturated acyclic C₄ alcohol: \\(\\text{C}_4\\text{H}_{10}\\text{O}\\) — butan-2-ol. The ring and the alkene each drop two H.",
        ],
        answer: "Butan-2-ol",
      },
      practiceSet: [
        { prompt: "Hydroboration–oxidation of but-1-ene gives?", answer: "Butan-1-ol" },
        { prompt: "Formula of a saturated acyclic pentanol?", answer: "\\(\\text{C}_5\\text{H}_{12}\\text{O}\\)" },
        { prompt: "Acid hydration of propene gives?", answer: "Propan-2-ol" },
        { prompt: "Grignard on methanal gives which class of alcohol?", answer: "Primary" },
      ],
      pyqExampleId: "1288a043-4110-4c2f-bbbe-d0030d34b19c",
      traps: [
        {
          title: "Putting the OH on the wrong carbon in hydroboration",
          body:
            "Hydroboration is the ANTI-Markovnikov route: boron, then OH, goes to the less substituted carbon. But-1-ene gives butan-1-ol, not butan-2-ol — the acid route gives that.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Nomenclature — the names these classes are asked in",
      href: "/notes/mht-cet-chemistry/alcohols-phenols-and-ethers/cetalc-nomenclature",
    },
    {
      label: "Halogen Derivatives — allylic and benzylic halides, the same labels",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-classification-and-properties",
    },
  ],
};
