import type { SubtopicNote } from "@/app/notes/_types";

export const PREPARATION_NOTE: SubtopicNote = {
  subtopicName: "Preparation Methods of Aldehydes and Ketones",
  title: "Preparation of Aldehydes and Ketones",
  oneLineDefinition:
    "Aldehydes come from acid chlorides (Rosenmund, H₂/Pd–BaSO₄), from nitriles (Stephen, SnCl₂/HCl; or DIBAL-H) and from toluene (Etard, CrO₂Cl₂); ketones come from acid chlorides with dialkylcadmium, from nitriles with a Grignard reagent, and Grignard reagents themselves come from R–X and magnesium in dry ether.",
  whyItMatters:
    "30 PYQs, 2 HARD — the largest page in the chapter and pure name-to-reagent recall. Fourteen are the three aldehyde routes (Rosenmund's reagent, Stephen's product from benzonitrile or isopropyl cyanide, DIBAL-H keeping a C=C); twelve are the Grignard and cadmium routes (dimethylcadmium + acetyl chloride → propanone appears five times; benzonitrile + PhMgBr → benzophenone; which carbonyl gives a 2° alcohol); four are Etard and two reaction-figure rows. " +
    "Three cards.",
  concepts: [
    // 1 — aldehyde routes
    {
      kind: "formula" as const,
      slug: "cetald-rosenmund-stephen-and-dibal",
      name: "Rosenmund, Stephen and DIBAL-H: Three Ways to an Aldehyde",
      intuition:
        "Each route stops at the aldehyde by design. Rosenmund hydrogenates an acid chloride over palladium POISONED with BaSO₄ so the aldehyde is not reduced further. Stephen reduces a nitrile with SnCl₂/HCl to an imine salt that water hydrolyses to the aldehyde. DIBAL-H does the same job on a nitrile at low temperature and leaves a C=C untouched.",
      definition:
        "- **Rosenmund**: \\(\\text{RCOCl} \\xrightarrow{\\text{H}_2,\\ \\text{Pd-BaSO}_4} \\text{RCHO}\\). Benzoyl chloride → benzaldehyde. Reagent R = H₂/Pd–BaSO₄ (not DIBAL-H, not CO/HCl).\n" +
        "- **Stephen**: \\(\\text{RCN} \\xrightarrow{\\text{SnCl}_2/\\text{HCl}} \\text{RCH=NH·HCl} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{RCHO} + \\text{NH}_4\\text{Cl}\\). Benzonitrile → benzaldehyde; isopropyl cyanide → 2-methylpropanal.\n" +
        "- **DIBAL-H** \\(\\text{AlH(i-Bu)}_2\\): nitrile → aldehyde, C=C survives — pent-3-enenitrile → pent-3-enal; hex-3-enenitrile → hex-3-enal. Also ester → aldehyde.\n" +
        "- Gattermann–Koch: benzene + CO/HCl, AlCl₃ → benzaldehyde (NOT CrO₃/Ac₂O, which is the Etard-like oxidation of toluene).",
      formula: {
        label: "Three aldehyde routes",
        latex:
          "\\text{RCOCl} \\xrightarrow{\\text{H}_2/\\text{Pd-BaSO}_4} \\text{RCHO};\\quad \\text{RCN} \\xrightarrow{\\text{SnCl}_2/\\text{HCl};\\ \\text{H}_3\\text{O}^+} \\text{RCHO};\\quad \\text{RCN} \\xrightarrow{\\text{DIBAL-H};\\ \\text{H}_3\\text{O}^+} \\text{RCHO}",
      },
      authoredExample: {
        prompt: "Give the product of (i) propanoyl chloride under Rosenmund conditions and (ii) butanenitrile by the Stephen reaction.",
        steps: [
          "(i) Propanal. (ii) Butanal (butanenitrile has four carbons; the CN carbon becomes CHO).",
        ],
        answer: "Propanal; butanal",
      },
      selfCheckExample: {
        prompt: "Which substrate gives pent-3-enal with DIBAL-H then water: pentanenitrile, pent-3-enenitrile, pent-3-en-1-amine, pent-3-ynenitrile?",
        steps: [
          "Same skeleton, CN → CHO, C=C kept: pent-3-enenitrile.",
        ],
        answer: "Pent-3-enenitrile",
      },
      practiceSet: [
        { prompt: "Reagent for Rosenmund reduction?", answer: "H₂ / Pd–BaSO₄" },
        { prompt: "Benzonitrile + SnCl₂/HCl, then H₃O⁺ gives?", answer: "Benzaldehyde" },
        { prompt: "Isopropyl cyanide by the Stephen reaction gives?", answer: "2-Methylpropanal" },
        { prompt: "Reagent for aliphatic aldehyde from a nitrile?", answer: "SnCl₂, HCl" },
      ],
      pyqExampleId: "054b64e1-300a-49fb-9057-437c1686c396",
      traps: [
        {
          title: "Assigning DIBAL-H to Rosenmund",
          body:
            "DIBAL-H reduces NITRILES and esters; Rosenmund is hydrogen over poisoned palladium on an ACID CHLORIDE. Both give aldehydes, and the paper lists both reagents in one question.",
        },
      ],
    },

    // 2 — Grignard and cadmium
    {
      kind: "formula" as const,
      slug: "cetald-grignard-and-cadmium-routes",
      name: "Grignard and Dialkylcadmium: Ketones and Alcohols",
      intuition:
        "A Grignard reagent (R–MgX, from R–X and magnesium in DRY ether — water kills it) adds to any carbonyl: methanal gives a primary alcohol with one more carbon, other aldehydes a secondary alcohol, ketones a tertiary one; with a nitrile it gives a ketone after hydrolysis, and with dry ice an acid. Dialkylcadmium, made from the Grignard and CdCl₂, is too weak to attack ketones, so with an acid chloride it stops at the ketone.",
      definition:
        "- Grignard: **magnesium** metal + alkyl halide in **dry ether**. Not Zn, not Mg(OH)₂, not aqueous.\n" +
        "- \\(\\text{HCHO} + \\text{RMgX} \\to \\text{RCH}_2\\text{OH}\\) (1°, one carbon more); \\(\\text{CH}_3\\text{CHO} \\to\\) 2° alcohol; \\(\\text{CH}_3\\text{COCH}_3 \\to\\) 3° alcohol. Secondary alcohol from CH₃CHO, not from HCHO or a ketone.\n" +
        "- Nitrile: \\(\\text{C}_6\\text{H}_5\\text{CN} + \\text{C}_6\\text{H}_5\\text{MgBr} \\xrightarrow{\\text{H}_2\\text{O}} \\text{benzophenone}\\). Dry ice: \\(\\text{CH}_3\\text{MgBr} + \\text{CO}_2 \\to \\text{CH}_3\\text{COOMgBr} \\to\\) ethanoic acid.\n" +
        "- Cadmium: \\(2\\text{CH}_3\\text{MgBr} + \\text{CdCl}_2 \\to (\\text{CH}_3)_2\\text{Cd}\\) (A); \\((\\text{CH}_3)_2\\text{Cd} + 2\\text{CH}_3\\text{COCl} \\to 2\\text{CH}_3\\text{COCH}_3\\) (propanone) + CdCl₂. Substrate for propanone = **ethanoyl chloride**; benzoyl chloride + \\((\\text{CH}_3)_2\\text{Cd}\\) → **acetophenone** (benzophenone would need \\((\\text{C}_6\\text{H}_5)_2\\text{Cd}\\)).",
      formula: {
        label: "Cadmium route to ketones",
        latex:
          "\\text{R}_2\\text{Cd} + 2\\,\\text{R'COCl} \\to 2\\,\\text{R'COR} + \\text{CdCl}_2",
      },
      authoredExample: {
        prompt: "Plan butanone from an acid chloride and an organocadmium, and name the Grignard partner that turns propanenitrile into pentan-3-one.",
        steps: [
          "Diethylcadmium + acetyl chloride, or dimethylcadmium + propanoyl chloride, both give CH₃COC₂H₅. Propanenitrile + ethylmagnesium bromide, then water: pentan-3-one.",
        ],
        answer: "\\((\\text{C}_2\\text{H}_5)_2\\text{Cd} + \\text{CH}_3\\text{COCl}\\); \\(\\text{C}_2\\text{H}_5\\text{MgBr}\\)",
      },
      selfCheckExample: {
        prompt: "Which of HCHO, CH₃CHO, propanone and butanone gives a SECONDARY alcohol with a Grignard reagent?",
        steps: [
          "Only the aldehyde with one R group: ethanal.",
        ],
        answer: "\\(\\text{CH}_3\\text{CHO}\\)",
      },
      practiceSet: [
        { prompt: "Metal used to make a Grignard reagent?", answer: "Magnesium" },
        { prompt: "CH₃MgBr → (CdCl₂) A → (CH₃COCl) B: B?", answer: "Propanone" },
        { prompt: "Benzonitrile + C₆H₅MgBr, then hydrolysis gives?", answer: "Benzophenone" },
        { prompt: "Excess benzoyl chloride + dimethylcadmium gives?", answer: "Acetophenone" },
      ],
      pyqExampleId: "b53d7b8d-b642-44e1-8ee1-f89db3c9b473",
      traps: [
        {
          title: "Stopping at dimethylcadmium",
          body:
            "Dimethylcadmium is A, the intermediate. The question asks for B, after acetyl chloride — propanone. 'Dimethyl cadmium' is option (a) every time.",
        },
      ],
    },

    // 3 — Etard and figure rows
    {
      kind: "formula" as const,
      slug: "cetald-etard-and-side-chain-oxidation",
      name: "Etard Reaction and Hydrolysis Routes",
      intuition:
        "Toluene's methyl group is oxidised by chromyl chloride (CrO₂Cl₂) in CS₂ to a chromium complex — the Etard complex — which water hydrolyses to benzaldehyde. CrO₃ in acetic anhydride does the same via benzylidene diacetate. A gem-dihalide or the Etard complex both need only water for the final step to the carbonyl.",
      definition:
        "- **Etard**: toluene \\(\\xrightarrow{\\text{CrO}_2\\text{Cl}_2,\\ \\text{CS}_2}\\) chromium complex (A) \\(\\xrightarrow{\\text{H}_3\\text{O}^+}\\) benzaldehyde (B). Reagent = chromyl chloride.\n" +
        "- Toluene + \\(\\text{CrO}_3/(\\text{CH}_3\\text{CO})_2\\text{O}\\) → benzylidene diacetate → benzaldehyde on hydrolysis.\n" +
        "- Benzal chloride \\(\\text{C}_6\\text{H}_5\\text{CHCl}_2\\) + water (aq. KOH) → benzaldehyde; the reagent that finishes a gem-dihalide is **H₂O**.\n" +
        "- Alkaline KMnO₄ would take the side chain all the way to benzoic acid — not the aldehyde.",
      formula: {
        label: "Etard reaction",
        latex:
          "\\text{C}_6\\text{H}_5\\text{CH}_3 \\xrightarrow{\\text{CrO}_2\\text{Cl}_2/\\text{CS}_2} \\text{Etard complex} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{C}_6\\text{H}_5\\text{CHO}",
      },
      authoredExample: {
        prompt: "How would you get benzaldehyde from toluene without reaching benzoic acid, and what does the same toluene give with alkaline KMnO₄?",
        steps: [
          "Chromyl chloride in CS₂ then hydrolysis (Etard), or CrO₃ in acetic anhydride then hydrolysis. KMnO₄/OH⁻ gives benzoic acid.",
        ],
        answer: "Etard (CrO₂Cl₂); benzoic acid with KMnO₄",
      },
      selfCheckExample: {
        prompt: "Identify A and B: toluene → (CrO₂Cl₂/CS₂) A → (H₃O⁺) B.",
        steps: [
          "A is the chromium (Etard) complex; B is benzaldehyde.",
        ],
        answer: "A = Etard complex; B = benzaldehyde",
      },
      practiceSet: [
        { prompt: "Reagent in the Etard reaction?", answer: "Chromyl chloride (CrO₂Cl₂)" },
        { prompt: "Product B of toluene → (CrO₂Cl₂) A → (H₃O⁺) B?", answer: "Benzaldehyde" },
        { prompt: "Reagent that turns a gem-dihalide into the carbonyl compound?", answer: "Water (hydrolysis)" },
        { prompt: "Toluene with alkaline KMnO₄ gives?", answer: "Benzoic acid" },
      ],
      pyqExampleId: "f6d21a3e-657c-4d5c-843b-56dc7ca8b39a",
      traps: [
        {
          title: "Reading the Etard intermediate as benzal chloride",
          body:
            "Chromyl chloride does not chlorinate the side chain; A is a chromium complex. The paper offers benzal chloride as option (a) for A's product; the answer to 'B' is benzaldehyde either way.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Redox and Tests — Clemmensen and Wolff–Kishner, the reverse direction",
      href: "/notes/mht-cet-chemistry/aldehydes-ketones-and-carboxylic-acids/cetald-redox-and-tests",
    },
    {
      label: "Alcohols — Grignard reagents as a route to alcohols",
      href: "/notes/mht-cet-chemistry/alcohols-phenols-and-ethers/cetalc-reactions-of-alcohols",
    },
  ],
};
