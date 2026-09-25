import type { SubtopicNote } from "@/app/notes/_types";

export const NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature and Classification of Aldehydes, Ketones and Carboxylic Acids",
  title: "Nomenclature and Classification of Aldehydes, Ketones and Carboxylic Acids",
  oneLineDefinition:
    "Aldehydes (CₙH₂ₙO, R–CHO) and ketones (R–CO–R') are named -al and -one; carboxylic acids are -oic acids and carry the highest IUPAC priority, so in a polyfunctional compound COOH is the parent, then CHO, then OH — and the common acids are learnt by the number of COOH groups they carry.",
  whyItMatters:
    "24 PYQs, none HARD — recall with one rule. Eight ask which named acid is mono-, di- or tricarboxylic (citric is the only tricarboxylic; valeric and caproic are mono; malonic, succinic, glutaric, adipic, phthalic are di); eight are an IUPAC name from a drawn benzene ring carrying COOH, CHO, OH or CH₃; eight are the general formula, which ketone is simple, which aldehyde smells of butter, which boils highest. " +
    "Three cards.",
  concepts: [
    // 1 — named acids (reference)
    {
      kind: "reference" as const,
      slug: "cetald-named-carboxylic-acids",
      name: "The Named Acids: Mono-, Di- and Tricarboxylic",
      intuition:
        "Count the COOH groups behind the common name. The straight-chain monoacids run formic, acetic, propionic, butyric, valeric, caproic (C1–C6). The diacids run oxalic, malonic, succinic, glutaric, adipic (C2–C6), plus phthalic on a benzene ring. Citric acid is the one tricarboxylic acid the paper uses. Salicylic, o-toluic and benzoic are monoacids on a ring.",
      definition:
        "- **Monocarboxylic**: formic (methanoic), acetic, propionic, butyric, valeric (pentanoic), caproic (hexanoic); acrylic acid = **prop-2-enoic acid**; benzoic, salicylic (2-hydroxybenzoic), o-toluic (2-methylbenzoic).\n" +
        "- **Dicarboxylic**: oxalic (ethanedioic), malonic (propanedioic), succinic (butanedioic), glutaric (pentanedioic), adipic (hexanedioic); phthalic (benzene-1,2-dicarboxylic).\n" +
        "- **Tricarboxylic**: citric acid (2-hydroxypropane-1,2,3-tricarboxylic).\n" +
        "- Pairs the paper keys: butyric + caproic (both mono); catechol-style traps: malonic + propionic (di + mono), valeric + succinic (mono + di).",
      table: {
        columns: ["Common name", "IUPAC name", "COOH groups"],
        rows: [
          { cells: ["Formic / acetic / propionic", "Methanoic / ethanoic / propanoic", "1"] },
          { cells: ["Butyric / valeric / caproic", "Butanoic / pentanoic / hexanoic", "1"], noteAmber: "Valeric and caproic are MONO — the planted 'dicarboxylic' options." },
          { cells: ["Oxalic / malonic / succinic", "Ethanedioic / propanedioic / butanedioic", "2"] },
          { cells: ["Glutaric / adipic", "Pentanedioic / hexanedioic", "2"] },
          { cells: ["Phthalic", "Benzene-1,2-dicarboxylic", "2"], noteAmber: "The one aromatic acid on the list that is NOT mono." },
          { cells: ["Citric", "2-Hydroxypropane-1,2,3-tricarboxylic", "3"], noteAmber: "The only tricarboxylic acid asked." },
          { cells: ["Benzoic / salicylic / o-toluic", "Benzoic / 2-hydroxybenzoic / 2-methylbenzoic", "1"] },
        ],
        caption: "C1–C6 mono: F-A-P-B-V-C; C2–C6 di: O-M-S-G-A.",
      },
      selfCheckExample: {
        prompt: "Which is NOT a dicarboxylic acid: adipic, glutaric, valeric, malonic? Which is NOT a monocarboxylic acid: phthalic, salicylic, o-toluic, benzoic?",
        steps: [
          "Valeric (pentanoic) has one COOH. Phthalic has two.",
        ],
        answer: "Valeric acid; phthalic acid",
      },
      practiceSet: [
        { prompt: "Tricarboxylic acid among propionic, oxalic, malonic, citric?", answer: "Citric acid" },
        { prompt: "Pair of monocarboxylic acids: butyric + caproic or malonic + propionic?", answer: "Butyric and caproic" },
        { prompt: "NOT dicarboxylic: malonic, caproic, glutaric, succinic?", answer: "Caproic acid" },
        { prompt: "IUPAC name of acrylic acid?", answer: "Prop-2-enoic acid" },
      ],
      pyqExampleId: "226f67ab-e765-4add-95f0-3027f31bf7db",
      traps: [
        {
          title: "Hearing 'valeric' and 'glutaric' as the same kind of name",
          body:
            "The -ic ending says nothing about the count. Valeric (C5) and caproic (C6) are straight-chain MONOacids; glutaric (C5) and adipic (C6) are the DIacids of the same length.",
        },
      ],
    },

    // 2 — formula, ketone classes, physical facts
    {
      kind: "formula" as const,
      slug: "cetald-formula-ketone-classes-and-properties",
      name: "General Formula, Simple Ketones, and the Physical Facts",
      intuition:
        "An aldehyde or ketone has one C=O and no ring, so its formula is CₙH₂ₙO; an acid carries a second oxygen, CₙH₂ₙO₂. A ketone is 'simple' when both groups on the carbonyl are the same (benzophenone), 'mixed' otherwise (acetophenone, butanone). Boiling points climb with chain length: hexanal above pentanal above propanal.",
      definition:
        "- Aldehydes and ketones: \\(\\text{C}_n\\text{H}_{2n}\\text{O}\\). Carboxylic acids: \\(\\text{C}_n\\text{H}_{2n}\\text{O}_2\\).\n" +
        "- **Simple (symmetrical) ketone**: \\(\\text{C}_6\\text{H}_5\\text{COC}_6\\text{H}_5\\) benzophenone, propanone, pentan-3-one. **Mixed**: acetophenone \\(\\text{C}_6\\text{H}_5\\text{COCH}_3\\), butanone, pentan-2-one.\n" +
        "- Identify the ketone among ethyl ethanoate (ester), acetophenone, N-methylphthalimide (imide), methyl salicylate (ester): **acetophenone**.\n" +
        "- Odours and uses: **butyraldehyde** — buttery, margarine flavouring; benzaldehyde — almonds; cinnamaldehyde — cinnamon; vanillin — vanilla.\n" +
        "- Boiling point rises with molar mass: ethanal < propanal < butanal < valeraldehyde < hexanal. Carbonyls boil above alkanes and ethers, below alcohols and acids.",
      formula: {
        label: "General formulas",
        latex:
          "\\text{aldehyde / ketone: } \\text{C}_n\\text{H}_{2n}\\text{O};\\qquad \\text{acid: } \\text{C}_n\\text{H}_{2n}\\text{O}_2",
      },
      authoredExample: {
        prompt: "Classify pentan-3-one, pentan-2-one and 4-methylpentan-2-one as simple or mixed ketones, and give the formula of the first.",
        steps: [
          "Pentan-3-one has two ethyls: simple. The other two have unequal groups: mixed. C₅H₁₀O.",
        ],
        answer: "Simple; mixed; mixed. \\(\\text{C}_5\\text{H}_{10}\\text{O}\\)",
      },
      selfCheckExample: {
        prompt: "Which has the highest boiling point: acetaldehyde, propionaldehyde, butyraldehyde, valeraldehyde?",
        steps: [
          "The heaviest — valeraldehyde (pentanal).",
        ],
        answer: "Valeraldehyde",
      },
      practiceSet: [
        { prompt: "General formula of aldehydes?", answer: "\\(\\text{C}_n\\text{H}_{2n}\\text{O}\\)" },
        { prompt: "Simple ketone: acetophenone, butanone, benzophenone, pentan-2-one?", answer: "Benzophenone" },
        { prompt: "Aldehyde with a buttery odour used in margarine?", answer: "Butyraldehyde" },
        { prompt: "Highest b.p.: propanal, ethanal, pentanal, hexanal?", answer: "Hexanal" },
      ],
      pyqExampleId: "97ad4e4b-cb3a-47c6-b0b8-bd6ae6dc0311",
      traps: [
        {
          title: "Calling acetophenone a simple ketone",
          body:
            "Phenyl and methyl are different groups — acetophenone is mixed. The simple one on the list is always benzophenone.",
        },
      ],
    },

    // 3 — IUPAC priority and drawn names
    {
      kind: "formula" as const,
      slug: "cetald-iupac-priority-and-drawn-names",
      name: "IUPAC Priority: COOH Beats CHO Beats OH",
      intuition:
        "Pick the highest-ranking group as the parent and turn the rest into prefixes: COOH → benzoic acid with 'formyl' and 'hydroxy' prefixes; CHO → benzaldehyde with 'hydroxy'; C=O → -one with 'hydroxy' or 'chloro'. Then number from the parent group for the lowest locant set, breaking ties alphabetically.",
      definition:
        "- Priority: \\(-\\text{COOH} > -\\text{CHO} > \\text{>C=O} > -\\text{OH} > -\\text{NH}_2 > \\text{C≡C}\\). Among CHO, OH, NH₂ and C≡C the principal group is **CHO**.\n" +
        "- Ring with CHO, OH, CH₃ all meta: **3-hydroxy-5-methylbenzaldehyde** (not 3-formyl-5-methylphenol).\n" +
        "- Ring with COOH, OH at 3, CH₃ at 4: **3-hydroxy-4-methylbenzoic acid**. COOH with ethyl and OH at 3,5: **3-ethyl-5-hydroxybenzoic acid** (alphabetical tie-break). COOH, CH₃ ortho, CHO: **5-formyl-2-methylbenzoic acid**.\n" +
        "- Cyclohexanone with Cl next to C=O and CH₃ two carbons on: **2-chloro-4-methylcyclohexanone** (C=O is C1, substituents alphabetical).\n" +
        "- \\(\\text{CH}_3\\text{CH(OH)COCH}_2\\text{CH}_3\\): ketone outranks OH → **2-hydroxypentan-3-one**, formula C₅H₁₀O₂, OH on an sp³ carbon.",
      formula: {
        label: "Priority and prefixes",
        latex:
          "\\text{COOH (parent)} \\to \\text{CHO as 'formyl'};\\quad \\text{CHO (parent)} \\to \\text{OH as 'hydroxy'};\\quad \\text{C=O (parent)} \\to \\text{OH as 'hydroxy'}",
      },
      authoredExample: {
        prompt: "Name \\(\\text{OHC-CH}_2\\text{-CH(OH)-CH}_3\\) and a benzene ring carrying COOH at C1 and CHO at C4.",
        steps: [
          "Aldehyde outranks alcohol: 3-hydroxybutanal. Acid outranks aldehyde: 4-formylbenzoic acid.",
        ],
        answer: "3-Hydroxybutanal; 4-formylbenzoic acid",
      },
      selfCheckExample: {
        prompt: "A ring carries CHO, OH and CH₃ all meta to each other. Why is the name 3-hydroxy-5-methylbenzaldehyde and not 3-formyl-5-methylphenol?",
        steps: [
          "CHO outranks OH, so the parent is benzaldehyde and OH becomes the prefix hydroxy.",
        ],
        answer: "The aldehyde is the principal group",
      },
      practiceSet: [
        { prompt: "Principal group among CHO, OH, NH₂, C≡C?", answer: "CHO" },
        { prompt: "Ring with COOH, OH at 3, CH₃ at 4: name?", answer: "3-Hydroxy-4-methylbenzoic acid" },
        { prompt: "Cyclohexanone, Cl at C2, CH₃ at C4: name?", answer: "2-Chloro-4-methylcyclohexanone" },
        { prompt: "\\(\\text{CH}_3\\text{CH(OH)COCH}_2\\text{CH}_3\\): name?", answer: "2-Hydroxypentan-3-one" },
      ],
      pyqExampleId: "8ccbd94f-b596-4981-8a0d-f511f1f6c800",
      traps: [
        {
          title: "Naming the compound as a phenol because the OH is on the ring",
          body:
            "Ring OH is a phenol only when nothing outranks it. With CHO or COOH present the OH is a hydroxy prefix; 'formyl-phenol' and 'carboxy-phenol' names are the planted options.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Basic Principles — the full priority order",
      href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/cetbp-nomenclature-and-functional-groups",
    },
    {
      label: "Carboxylic Acids — the acids named here, reacting",
      href: "/notes/mht-cet-chemistry/aldehydes-ketones-and-carboxylic-acids/cetald-carboxylic-acids",
    },
  ],
};
