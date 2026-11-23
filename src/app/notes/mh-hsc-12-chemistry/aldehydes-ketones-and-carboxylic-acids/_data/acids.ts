import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_AK_ACIDS_NOTE: SubtopicNote = {
  subtopicName: "Preparation of Carboxylic Acids",
  title: "Preparing Carboxylic Acids",
  oneLineDefinition:
    "Carboxylic acids by hydrolysis of nitriles, amides, acyl chlorides, anhydrides and esters, by oxidation of alkyl benzenes and alkenes, and from Grignard reagents with dry ice.",
  whyItMatters:
    "9 questions. Three were set in board papers: ethanoic acid from dry ice (2017), the structure of adipic acid together with the commercial preparation of glucose (2022), and cyclohexene to adipic acid (2025). The textbook adds the hydrolysis of nitriles in acid and in alkali, the oxidation of 1,2,3,4-tetrahydronaphthalene and a three-step Grignard conversion.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccak-acid-hydrolysis",
      name: "Hydrolysis of nitriles, amides, acyl chlorides, anhydrides and esters",
      intuition:
        "In each of these compounds the carbon is already at the level of an acid; it only carries N, Cl, an OCOR group or an OR group in place of OH. Water, helped by an acid or an alkali, swaps that group for OH.",
      definition:
        "- **Nitriles and amides:** a nitrile on acid hydrolysis gives an amide, and the amide on further hydrolysis gives the acid. Dilute H₂SO₄ or dilute HCl is used.\n" +
        "- **Acyl chlorides** with water give the acid and HCl; **anhydrides** with water give two molecules of acid: \\((\\text{CH}_3\\text{CO})_2\\text{O} + \\text{H}_2\\text{O} \\to 2\\,\\text{CH}_3\\text{COOH}\\).\n" +
        "- **Esters, acid hydrolysis:** dilute HCl or H₂SO₄ gives the acid and the alcohol.\n" +
        "- **Esters, alkaline hydrolysis:** dilute NaOH or KOH gives the soluble sodium or potassium salt and the alcohol; concentrated HCl then frees the acid. Sodium and potassium salts of higher fatty acids are soaps, so alkaline hydrolysis of esters is called saponification.",
      formula: {
        label: "Acid hydrolysis of a nitrile",
        latex: "\\text{R-C}\\equiv\\text{N} + 2\\,\\text{H}_2\\text{O} + \\text{HCl} \\to \\text{R-COOH} + \\text{NH}_4\\text{Cl}",
      },
      authoredExample: {
        prompt: "Write the reactions for the alkaline hydrolysis of ethyl ethanoate with dilute NaOH and the step that gives the free acid.",
        steps: [
          "Dilute NaOH breaks the ester into the sodium salt and the alcohol: \\(\\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{NaOH} \\to \\text{CH}_3\\text{COONa} + \\text{C}_2\\text{H}_5\\text{OH}\\).",
          "Acidifying the solution frees the acid: \\(\\text{CH}_3\\text{COONa} + \\text{HCl} \\to \\text{CH}_3\\text{COOH} + \\text{NaCl}\\).",
        ],
        answer: "Ethanoic acid (and ethanol)",
      },
      selfCheckExample: {
        prompt: "Write the products when ethanoyl chloride reacts with water.",
        steps: ["The Cl is replaced by OH: \\(\\text{CH}_3\\text{COCl} + \\text{H}_2\\text{O} \\to \\text{CH}_3\\text{COOH} + \\text{HCl}\\)."],
        answer: "Ethanoic acid and hydrogen chloride",
      },
      practiceSet: [
        { prompt: "Why is the alkaline hydrolysis of an ester called saponification?", answer: "Sodium and potassium salts of higher fatty acids are soaps" },
        { prompt: "What does acetic anhydride give with water?", answer: "Two molecules of acetic acid" },
        { prompt: "Which compound is formed first when a nitrile is hydrolysed by dilute acid?", answer: "The amide" },
      ],
      pyqExampleId: "508ce275-d6f3-4768-ab79-7cababe09550",
      traps: [
        {
          title: "Free acid from alkaline hydrolysis",
          body: "Dilute NaOH gives the salt, R-COONa, not the acid. The question is answered only when you add the acidification step.",
        },
        {
          title: "Chlorine that comes from nowhere",
          body: "In the nitrile equation \\(\\text{NH}_4\\text{Cl}\\) is a product, so HCl must appear on the left, as the book writes it. An equation with the acid only over the arrow is not balanced.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccak-acid-oxidation",
      name: "Oxidation of alkyl benzenes and alkenes",
      intuition:
        "Strong oxidising agents break carbon chains. On a benzene ring the whole side chain, however long, ends up as a single COOH on the ring, while the ring itself survives. Across a C=C bond the bond breaks, and in a ring that simply opens the ring.",
      definition:
        "- **Alkyl benzenes:** dilute HNO₃, alkaline or acidic KMnO₄ or chromic acid oxidise the whole alkyl chain, whatever its length, to one COOH group: the product is a benzoic acid. A tertiary alkyl group (no H on the carbon joined to the ring) is not oxidised.\n" +
        "- **Alkenes:** KMnO₄ in dilute H₂SO₄ breaks the C=C bond, and each doubly bonded carbon that carries a hydrogen becomes a COOH group.\n" +
        "- **Cyclic alkenes:** both carbons of the C=C are in the ring, so breaking the bond opens the ring into one chain with a COOH at each end. Cyclohexene gives adipic acid (hexanedioic acid), \\(\\text{HOOC(CH}_2)_4\\text{COOH}\\).",
      formula: {
        label: "Oxidation of an alkyl benzene",
        latex: "\\text{C}_6\\text{H}_5\\text{-R} \\xrightarrow[\\text{(ii) H}_3\\text{O}^+]{\\text{(i) alk. KMnO}_4,\\ \\Delta} \\text{C}_6\\text{H}_5\\text{-COOH}",
      },
      authoredExample: {
        prompt: "What is obtained when propylbenzene is oxidised with alkaline KMnO₄ and the mixture is then acidified?",
        steps: [
          "The entire propyl chain is oxidised to one COOH group; in the alkaline medium the potassium salt, \\(\\text{C}_6\\text{H}_5\\text{COOK}\\), forms first.",
          "Acidification frees the acid: \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{CH}_2\\text{CH}_3 \\xrightarrow{\\text{alk. KMnO}_4,\\ \\Delta} \\text{C}_6\\text{H}_5\\text{COOK} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{C}_6\\text{H}_5\\text{COOH}\\).",
        ],
        answer: "Benzoic acid",
      },
      selfCheckExample: {
        prompt: "Name the acid formed when but-2-ene, \\(\\text{CH}_3\\text{-CH=CH-CH}_3\\), is oxidised with KMnO₄ in dilute H₂SO₄.",
        steps: ["The C=C bond breaks and each CH carbon becomes COOH, giving two identical halves."],
        answer: "Ethanoic acid (two molecules)",
      },
      practiceSet: [
        { prompt: "Is tert-butylbenzene oxidised to benzoic acid by KMnO₄?", answer: "No: a tertiary alkyl group on benzene is not oxidised" },
        { prompt: "Write the IUPAC name of adipic acid.", answer: "Hexanedioic acid" },
        { prompt: "Name the product when 1,2-dimethylbenzene is oxidised with alkaline KMnO₄ and then acidified.", answer: "Phthalic acid (benzene-1,2-dicarboxylic acid)" },
      ],
      pyqExampleId: "cab0fb31-bdf6-4406-81b3-f0f322fb8e0d",
      traps: [
        {
          title: "Keeping part of the side chain",
          body: "Ethylbenzene gives benzoic acid, not phenylacetic acid. Every carbon of the side chain except the one joined to the ring is lost.",
        },
        {
          title: "Oxidising the ring",
          body: "The benzene ring survives the oxidation. Only the side chain changes, so the product always keeps the ring.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccak-acid-grignard",
      name: "From a Grignard reagent and dry ice",
      intuition:
        "In a Grignard reagent, R-MgX, the R group behaves as a carbanion. It attacks the carbon of carbon dioxide, and that carbon becomes the new COOH carbon. So the acid has one carbon more than the halide you started from.",
      definition:
        "- The Grignard reagent in dry ether is added to solid carbon dioxide (dry ice), giving a complex, \\(\\text{R-COOMgX}\\).\n" +
        "- Acid hydrolysis of the complex gives the carboxylic acid.\n" +
        "- The acid has one carbon atom more than the alkyl or aryl halide: the extra carbon comes from CO₂.\n" +
        "- From a halide it is three steps: \\(\\text{R-X} + \\text{Mg} \\xrightarrow{\\text{dry ether}} \\text{R-MgX}\\); then CO₂; then \\(\\text{H}_3\\text{O}^+\\).\n" +
        "- Dry ice serves as the reagent and, being very cold, also as the cooling agent.",
      formula: {
        label: "Grignard reagent with carbon dioxide",
        latex: "\\text{R-MgX} + \\text{CO}_2 \\xrightarrow{\\text{dry ether}} \\text{R-COOMgX} \\xrightarrow{\\text{H}_3\\text{O}^+} \\text{R-COOH} + \\text{Mg(X)OH}",
      },
      authoredExample: {
        prompt: "How is benzoic acid prepared from bromobenzene through a Grignard reagent? Write the reactions.",
        steps: [
          "Grignard reagent: \\(\\text{C}_6\\text{H}_5\\text{Br} + \\text{Mg} \\xrightarrow{\\text{dry ether}} \\text{C}_6\\text{H}_5\\text{MgBr}\\).",
          "Add to dry ice: \\(\\text{C}_6\\text{H}_5\\text{MgBr} + \\text{CO}_2 \\xrightarrow{\\text{dry ether}} \\text{C}_6\\text{H}_5\\text{COOMgBr}\\).",
          "Acid hydrolysis: \\(\\text{C}_6\\text{H}_5\\text{COOMgBr} + \\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+} \\text{C}_6\\text{H}_5\\text{COOH} + \\text{Mg(Br)OH}\\).",
        ],
        answer: "Benzoic acid, C₆H₅COOH",
      },
      selfCheckExample: {
        prompt: "Which Grignard reagent gives propanoic acid when added to dry ice and then hydrolysed?",
        steps: ["Propanoic acid has three carbons; one comes from CO₂, so R has two carbons."],
        answer: "Ethylmagnesium bromide, C₂H₅MgBr",
      },
      practiceSet: [
        { prompt: "How does the number of carbon atoms in the acid compare with the halide used?", answer: "The acid has one carbon atom more" },
        { prompt: "What must be added to the complex R-COOMgX to obtain the free acid?", answer: "Dilute acid (acid hydrolysis)" },
        { prompt: "Why is the Grignard reagent kept in dry ether?", answer: "Water decomposes a Grignard reagent" },
      ],
      pyqExampleId: "9cfad389-c662-4d52-855b-5dc67bd4dc47",
      traps: [
        {
          title: "Losing count of the carbons",
          body: "The new carbon comes from CO₂. \\(\\text{C}_2\\text{H}_5\\text{MgBr}\\) gives propanoic acid, with three carbons, not ethanoic acid.",
        },
        {
          title: "Adding the acid too early",
          body: "Acid or water goes in only after the CO₂ step. Any water before that destroys the Grignard reagent.",
        },
      ],
    },
  ],
};
