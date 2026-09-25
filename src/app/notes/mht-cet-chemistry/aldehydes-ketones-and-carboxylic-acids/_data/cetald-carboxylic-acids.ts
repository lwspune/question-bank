import type { SubtopicNote } from "@/app/notes/_types";

export const CARBOXYLIC_ACIDS_NOTE: SubtopicNote = {
  subtopicName: "Carboxylic Acids, Properties, Reactions and Derivatives",
  title: "Carboxylic Acids: Properties, Reactions and Derivatives",
  oneLineDefinition:
    "Carboxylic acids boil highest of all comparable compounds because they hydrogen-bond as dimers; they are made from Grignard reagents and CO₂ or by oxidative cleavage, converted to acid chlorides by PCl₅ or SOCl₂, and their derivatives — chlorides, anhydrides, esters — hydrolyse back to the acid.",
  whyItMatters:
    "21 PYQs, none HARD. Nine are properties and preparation — the boiling-point orders (acid > alcohol > amine; formic lowest, valeric highest of the C1–C5 acids), Grignard + dry ice giving the acid with one extra carbon, cyclohexene to adipic acid; twelve are the derivatives — acid chloride or anhydride plus water, PCl₅ by its by-products, ester hydrolysis then acidification, aspirin from salicylic acid, paracetamol's amide link, diborane reducing COOH. " +
    "Two cards.",
  concepts: [
    // 1 — properties and preparation
    {
      kind: "formula" as const,
      slug: "cetald-acid-properties-and-preparation",
      name: "Boiling Points of Acids, and Making Them",
      intuition:
        "Two acid molecules pair up through two hydrogen bonds into a dimer, so acids boil above alcohols of the same size, which boil above amines. Within the acids boiling point rises with molar mass. To MAKE an acid: a Grignard reagent attacks dry ice and the work-up gives an acid one carbon longer than R; hot acidic KMnO₄ cleaves a C=C, so cyclohexene opens to adipic acid; nitriles hydrolyse; aldehydes and primary alcohols oxidise.",
      definition:
        "- Boiling point: **carboxylic acid > alcohol > amine** (ethanoic acid > propan-1-ol > propanone); formic < acetic < butyric < valeric.\n" +
        "- \\(\\text{RMgX} + \\text{CO}_2 \\to \\text{RCOOMgX} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{RCOOH}\\): CH₃MgBr → ethanoic acid; C₂H₅MgBr → propanoic acid; \\((\\text{CH}_3)_2\\text{CHMgBr}\\) → 2-methylpropanoic acid.\n" +
        "- Cyclohexene \\(\\xrightarrow{\\text{KMnO}_4/\\text{H}_2\\text{SO}_4}\\) **adipic acid** (the ring opens to HOOC(CH₂)₄COOH); hex-3-ene would give two propanoic acids.\n" +
        "- R–CN + H₃O⁺, Δ → RCOOH; RCHO + [O] → RCOOH; toluene + KMnO₄ → benzoic acid.",
      formula: {
        label: "Grignard to acid",
        latex:
          "\\text{R-MgX} \\xrightarrow{\\text{(i) CO}_2\\text{ (dry ice); (ii) H}_3\\text{O}^+} \\text{R-COOH} \\quad (\\text{one carbon more than R})",
      },
      authoredExample: {
        prompt: "Which Grignard reagent gives butanoic acid with dry ice, and what does hex-3-ene give with hot acidic KMnO₄?",
        steps: [
          "Propylmagnesium bromide (three carbons + CO₂). Hex-3-ene cleaves symmetrically to two molecules of propanoic acid.",
        ],
        answer: "\\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{MgBr}\\); 2 propanoic acid",
      },
      selfCheckExample: {
        prompt: "Rank propanone, ethanoic acid and propan-1-ol by boiling point.",
        steps: [
          "Dimeric acid first, then the alcohol, then the ketone.",
        ],
        answer: "Ethanoic acid > propan-1-ol > propanone",
      },
      practiceSet: [
        { prompt: "Lowest b.p.: butyric, valeric, acetic, formic acid?", answer: "Formic acid" },
        { prompt: "\\((\\text{CH}_3)_2\\text{CHMgBr}\\) + CO₂, then dil. HCl gives?", answer: "2-Methylpropanoic acid" },
        { prompt: "Alkene giving adipic acid with KMnO₄/H₂SO₄?", answer: "Cyclohexene" },
        { prompt: "Decreasing b.p.: acids, alcohols, amines — order?", answer: "Carboxylic acids > alcohols > amines" },
      ],
      pyqExampleId: "1b4e61db-d7a7-44d1-afd6-20e7f05fbd46",
      traps: [
        {
          title: "Forgetting the carbon that CO₂ brings",
          body:
            "Ethyl-MgBr does not give ethanoic acid. The CO₂ carbon becomes the COOH: ethyl → propanoic acid, isopropyl → 2-methylpropanoic acid.",
        },
      ],
    },

    // 2 — derivatives
    {
      kind: "formula" as const,
      slug: "cetald-acid-derivatives",
      name: "Acid Chlorides, Anhydrides, Esters and Amides",
      intuition:
        "Every derivative is the acid with OH replaced — by Cl, by another acyl-O, by OR, by NH₂ — and water puts the OH back. PCl₅ makes the chloride and announces itself by its by-products POCl₃ + HCl (SOCl₂ gives SO₂ + HCl). Ester hydrolysis in base gives the acid's SALT; acid then frees the acid. Acetic anhydride acetylates salicylic acid to aspirin; paracetamol is the amide on the list.",
      definition:
        "- \\(\\text{RCOOH} + \\text{PCl}_5 \\to \\text{RCOCl} + \\text{POCl}_3 + \\text{HCl}\\) (by-products name the reagent); \\(+ \\text{SOCl}_2 \\to \\text{RCOCl} + \\text{SO}_2 + \\text{HCl}\\).\n" +
        "- Hydrolysis: \\(\\text{RCOCl} + \\text{H}_2\\text{O} \\to \\text{RCOOH}\\) (ethanoyl chloride → ethanoic acid; benzoyl chloride → benzoic acid); \\((\\text{CH}_3\\text{CO})_2\\text{O} + \\text{H}_2\\text{O} \\to 2\\text{CH}_3\\text{COOH}\\). Ethanoic acid + water alone: no change.\n" +
        "- Ester: methyl propanoate \\(\\xrightarrow{\\text{dil. NaOH}}\\) sodium propanoate (A) \\(\\xrightarrow{\\text{conc. HCl}}\\) **propanoic acid** \\(\\text{C}_2\\text{H}_5\\text{COOH}\\) (B).\n" +
        "- Salicylic acid + acetic anhydride (H⁺) → **aspirin** + acetic acid (ester link). **Paracetamol** carries the amide link; aspirin, methyl salicylate are esters; curcumin has neither.\n" +
        "- Diborane \\(\\text{B}_2\\text{H}_6\\) reduces **COOH** (to CH₂OH) but not esters, nitro groups or halides.",
      formula: {
        label: "Derivative ↔ acid",
        latex:
          "\\text{RCOOH} \\xrightarrow{\\text{PCl}_5} \\text{RCOCl} \\xrightarrow{\\text{H}_2\\text{O}} \\text{RCOOH};\\qquad \\text{RCOOR'} \\xrightarrow{\\text{NaOH}} \\text{RCOONa} \\xrightarrow{\\text{HCl}} \\text{RCOOH}",
      },
      authoredExample: {
        prompt: "Identify A and B: ethyl ethanoate → (dil. NaOH) A → (conc. HCl) B, and name the reagent whose by-products with benzoic acid are SO₂ and HCl.",
        steps: [
          "A = sodium ethanoate (+ ethanol); B = ethanoic acid. Thionyl chloride gives SO₂ + HCl.",
        ],
        answer: "Sodium ethanoate; ethanoic acid; \\(\\text{SOCl}_2\\)",
      },
      selfCheckExample: {
        prompt: "Which of aspirin, methyl salicylate, curcumin and paracetamol contains an amide linkage, and which acid is acetylated to make aspirin?",
        steps: [
          "Paracetamol (N-acetyl-p-aminophenol); salicylic acid.",
        ],
        answer: "Paracetamol; salicylic acid",
      },
      practiceSet: [
        { prompt: "Benzoic acid + reagent → benzoyl chloride + POCl₃ + HCl: reagent?", answer: "\\(\\text{PCl}_5\\)" },
        { prompt: "Ethanoyl chloride + water gives?", answer: "Ethanoic acid" },
        { prompt: "A + acetic anhydride → aspirin + acetic acid: A?", answer: "Salicylic acid" },
        { prompt: "Group reduced by diborane: COOR, COOH, NO₂ or X?", answer: "COOH" },
      ],
      pyqExampleId: "eebe4107-b9bc-4bff-8f05-1a5c1a435696",
      traps: [
        {
          title: "Stopping at the sodium salt",
          body:
            "Base hydrolysis of an ester gives the carboxylate; the question then adds concentrated HCl, which protonates it. The answer is the ACID, not sodium propanoate — offered as option (a).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Nomenclature — the named acids",
      href: "/notes/mht-cet-chemistry/aldehydes-ketones-and-carboxylic-acids/cetald-nomenclature",
    },
    {
      label: "Alcohols — esterification from the alcohol's side",
      href: "/notes/mht-cet-chemistry/alcohols-phenols-and-ethers/cetalc-reactions-of-alcohols",
    },
  ],
};
