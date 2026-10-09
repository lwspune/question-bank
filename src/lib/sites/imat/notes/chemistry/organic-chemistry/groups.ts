import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ORG_GROUPS_NOTE: SubtopicNote = {
  subtopicName: "Functional Groups",
  title: "Functional Groups: Recognise, Name and Find Them in Biomolecules",
  oneLineDefinition:
    "A functional group is the small reactive part of a molecule (an OH, a C=O, an NH₂) that decides its family, its name ending and most of its chemistry.",
  whyItMatters:
    "This is the most tested page of the chapter. The ministry papers asked which group is in paracetamol, which molecule has no C=O, what family pentanones belong to, and two questions on amino acids and glycogen; the older papers asked for every group in a drawn vitamin or in a condensed formula.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-org-group-table",
      name: "The main functional groups and their families",
      intuition:
        "The carbon and hydrogen skeleton is mostly unreactive; the chemistry happens at the oxygen, nitrogen or halogen atoms. So organic chemists sort molecules by these groups. Learn each group by its atoms and by what they are bonded to, because two groups can share the same atoms in a different arrangement.",
      definition:
        "A **functional group** is an atom or group of atoms that gives a family its typical reactions.\n" +
        "- The **carbonyl group** C=O is in aldehydes, ketones, carboxylic acids, esters and amides. It is NOT in alcohols, ethers or amines.\n" +
        "- R stands for any carbon chain.\n" +
        "- Common names still used in IMAT: formaldehyde (methanal), acetaldehyde (ethanal), acetone (propanone), acetic acid (ethanoic acid), methyl acetate (methyl ethanoate), dimethyl ether (methoxymethane).",
      table: {
        columns: ["Family", "Group", "Name ending", "Example"],
        rows: [
          { cells: ["Haloalkane", "C-X, where X is F, Cl, Br or I", "prefix chloro-, bromo-", "Chloroethane \\(\\mathrm{CH_3CH_2Cl}\\)"] },
          { cells: ["Alcohol", "\\(\\mathrm{-OH}\\) on a saturated carbon", "-ol", "Ethanol \\(\\mathrm{CH_3CH_2OH}\\)"] },
          { cells: ["Ether", "C-O-C, no C=O", "alkoxy- prefix, or 'dimethyl ether' style", "Methoxymethane \\(\\mathrm{CH_3OCH_3}\\)"] },
          { cells: ["Aldehyde", "\\(\\mathrm{-CHO}\\): C=O at the end of a chain", "-al", "Ethanal \\(\\mathrm{CH_3CHO}\\)"] },
          { cells: ["Ketone", "C=O between two carbons", "-one", "Propanone \\(\\mathrm{CH_3COCH_3}\\)"] },
          { cells: ["Carboxylic acid", "\\(\\mathrm{-COOH}\\)", "-oic acid", "Ethanoic acid \\(\\mathrm{CH_3COOH}\\)"] },
          { cells: ["Ester", "\\(\\mathrm{-COO-}\\) between two carbons", "alkyl ...-oate", "Methyl ethanoate \\(\\mathrm{CH_3COOCH_3}\\)"] },
          { cells: ["Amine", "N bonded to C and H, no C=O next to it", "-amine", "Ethylamine \\(\\mathrm{CH_3CH_2NH_2}\\)"] },
          { cells: ["Amide", "\\(\\mathrm{-CONH_2}\\): C=O bonded to N", "-amide", "Ethanamide \\(\\mathrm{CH_3CONH_2}\\)"] },
          { cells: ["Nitrile", "\\(\\mathrm{-C{\\equiv}N}\\)", "-nitrile", "Ethanenitrile \\(\\mathrm{CH_3CN}\\)"] },
          { cells: ["Thiol", "\\(\\mathrm{-SH}\\)", "-thiol", "Ethanethiol \\(\\mathrm{CH_3CH_2SH}\\)"] },
        ],
        caption: "An OH on a benzene ring is a **phenol**, a separate family that is more acidic than an alcohol.",
      },
      selfCheckExample: {
        prompt: "Butanal and butanone are both present in a mixture. Which group do the two molecules have in common?",
        options: [
          "A C=O (carbonyl) group",
          "An \\(\\mathrm{-OH}\\) group",
          "A \\(\\mathrm{-COOH}\\) group",
          "A C-O-C link",
          "A C=C double bond",
        ],
        steps: [
          "The ending -al means an aldehyde and -one means a ketone. Both are C=O groups; they differ only in where the C=O sits.",
          "B would be an alcohol (-ol), C an acid, D an ether. The -an- in both names means no C=C.",
        ],
        answer: "(A) A C=O (carbonyl) group",
      },
      practiceSet: [
        { prompt: "Which family has the name ending -one?", answer: "Ketones", method: "Pentan-2-one and pentan-3-one are both ketones" },
        { prompt: "Name the family of \\(\\mathrm{CH_3CH_2COOCH_3}\\).", answer: "Ester (methyl propanoate)", method: "COO between two carbons" },
        { prompt: "Which contains a C=O: diethyl ether or ethyl ethanoate?", answer: "Ethyl ethanoate", method: "Esters contain C=O; ethers never do" },
        { prompt: "What is acetone called in IUPAC naming, and what family is it?", answer: "Propanone, a ketone", method: "\\(\\mathrm{CH_3COCH_3}\\)" },
      ],
      traps: [
        {
          title: "Amine or amide: look for the C=O next to the nitrogen",
          body: "Both contain nitrogen. If the N is bonded directly to a C=O carbon, the group is an amide (as in paracetamol and in proteins); otherwise it is an amine. An amide is not an amine plus a ketone.",
        },
        {
          title: "Ethers have no C=O at all",
          body: "An ether is just C-O-C. Aldehydes, ketones, acids, esters and amides all contain C=O, whatever their common names (acetaldehyde, acetone, acetic acid, methyl acetate). In a list asking which molecule lacks C=O, the ether or the alcohol is the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-org-spot-groups",
      name: "Finding every functional group in a larger molecule",
      intuition:
        "Large drug and vitamin molecules look complicated, but each group is decided by a single atom and its neighbours. Visit every O and every N in turn and ask what is joined to it. Then visit every C=O and ask what is on either side.",
      definition:
        "Work through the molecule atom by atom:\n" +
        "- **C=O**: look at its two other neighbours. H and C: **aldehyde**. Two C: **ketone**. OH: **carboxylic acid**. O-C: **ester**. N: **amide**.\n" +
        "- **O with only single bonds**: if it is bonded to a C=O carbon, it is part of an acid or ester (above). Otherwise, bonded to H and C, it is an **alcohol**; bonded to two C, an **ether**.\n" +
        "- **N**: next to a C=O carbon, **amide**; otherwise **amine**.\n" +
        "- Also look for C=C (**alkene**), a benzene ring (**arene**), halogens and SH (**thiol**).\n" +
        "- Do not count an OH or O twice: the OH inside COOH belongs to the acid, the O-C inside COO belongs to the ester.",
      authoredExample: {
        prompt: "List the functional groups in \\(\\mathrm{CH_3COOCH_2CH_2CH(OH)CHO}\\).",
        steps: [
          "\\(\\mathrm{CH_3COO{-}CH_2}\\): a C=O whose carbon is also bonded to an O that leads to another carbon. That is an **ester**.",
          "\\(\\mathrm{CH(OH)}\\): an OH on a saturated carbon, not next to any C=O. That is an **alcohol**.",
          "\\(\\mathrm{CHO}\\) at the end: a C=O carbon bonded to H. That is an **aldehyde**.",
          "No N, no C=C. Groups: ester, alcohol and aldehyde.",
        ],
        answer: "Ester, alcohol, aldehyde",
      },
      selfCheckExample: {
        prompt:
          "Which functional groups are present in \\(\\mathrm{H_2NCH_2CH_2COCH_2OCH_3}\\)? 1. amine 2. amide 3. ketone 4. ether 5. ester",
        options: [
          "2, 3 and 4 only",
          "1 and 5 only",
          "2 and 5 only",
          "1, 3 and 4 only",
          "1, 3 and 5 only",
        ],
        steps: [
          "The N is bonded to \\(\\mathrm{CH_2}\\), not to a C=O: amine (1), not amide.",
          "The CO is between two \\(\\mathrm{CH_2}\\) groups: ketone (3).",
          "The O in \\(\\mathrm{CH_2OCH_3}\\) joins two carbons, and neither of them is the C=O carbon: ether (4), not ester.",
          "Options with 2 or 5 fall for the nearby C=O: an amide or ester needs the N or O bonded directly to the C=O carbon.",
        ],
        answer: "(D) 1, 3 and 4 only",
      },
      practiceSet: [
        { prompt: "Which groups are in lactic acid, \\(\\mathrm{CH_3CH(OH)COOH}\\)?", answer: "Alcohol and carboxylic acid", method: "One OH on a saturated carbon, one COOH" },
        { prompt: "Which group is in \\(\\mathrm{CH_3CONHCH_3}\\)?", answer: "Amide", method: "N bonded directly to the C=O carbon" },
        { prompt: "Which groups are in \\(\\mathrm{HOCH_2CH_2NH_2}\\)?", answer: "Alcohol and amine", method: "No C=O anywhere" },
        { prompt: "Which groups are in \\(\\mathrm{OHCCH_2COCH_3}\\)?", answer: "Aldehyde and ketone", method: "OHC- at one end is a CHO written backwards" },
      ],
      traps: [
        {
          title: "The OH of a COOH group is not an alcohol",
          body: "In a carboxylic acid the OH is on the C=O carbon, and together they make one group. Listing 'alcohol' as well is double counting. An alcohol needs an OH on a carbon with no C=O.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-org-group-naming",
      name: "Naming compounds that contain a functional group",
      intuition:
        "The main chain must contain the carbon of the functional group, and the group gets the lowest possible number because it matters most. Its family ending replaces the final -e of the alkane name.",
      definition:
        "- Choose the longest chain that **contains the functional group carbon**.\n" +
        "- Number from the end that gives the **functional group the lowest number**, then the branches.\n" +
        "- Endings: alcohol propan-2-ol, ketone butan-2-one, aldehyde butanal, acid butanoic acid, amine propan-1-amine. Aldehydes and acids need no number: their carbon is always carbon 1.\n" +
        "- **Esters** are named from the alcohol part first, then the acid part with -oate: \\(\\mathrm{CH_3COOCH_2CH_3}\\) is ethyl ethanoate.\n" +
        "- With two groups, the higher one gets the ending (acid > ester > amide > nitrile > aldehyde > ketone > alcohol > amine) and the other becomes a prefix: hydroxy-, oxo-, amino-.",
      formula: {
        label: "Name with a functional group",
        latex: "\\text{branches} + \\text{stem} + \\text{locant} + \\text{group ending}",
        symbols: [
          { symbol: "example", meaning: "4-methylpentan-2-ol" },
          { symbol: "locant", meaning: "the carbon of the group; omitted for aldehydes and acids" },
        ],
      },
      authoredExample: {
        prompt: "Name \\(\\mathrm{CH_3CH(CH_3)CH_2CH(OH)CH_3}\\).",
        steps: [
          "Longest chain containing the C-OH carbon: 5 carbons, so pentanol.",
          "Number from the right so the OH is on carbon 2 (from the left it would be carbon 4).",
          "The methyl branch is then on carbon 4.",
          "Name: 4-methylpentan-2-ol (\\(\\mathrm{C_6H_{14}O}\\)).",
        ],
        answer: "4-methylpentan-2-ol",
      },
      selfCheckExample: {
        prompt: "What is the IUPAC name of \\(\\mathrm{CH_3CH_2COCH_2CH_2CH_3}\\)?",
        options: [
          "Hexan-4-one",
          "Hexan-3-one",
          "Hexanal",
          "Hexan-3-ol",
          "Pentan-3-one",
        ],
        steps: [
          "Six carbons with a C=O between two carbons: a hexanone.",
          "From the left the C=O is carbon 3; from the right it is carbon 4. Use the lower number: hexan-3-one.",
          "A numbers from the wrong end. C would need the C=O at the end of the chain. D is an alcohol. E miscounts the chain.",
        ],
        answer: "(B) Hexan-3-one",
      },
      practiceSet: [
        { prompt: "Write the condensed formula of butanal.", answer: "\\(\\mathrm{CH_3CH_2CH_2CHO}\\)", method: "4 carbons, CHO at carbon 1" },
        { prompt: "Name \\(\\mathrm{CH_3CH_2CH_2COOH}\\).", answer: "Butanoic acid", method: "4 carbons including the COOH carbon" },
        { prompt: "Name \\(\\mathrm{CH_3COOCH_2CH_3}\\).", answer: "Ethyl ethanoate", method: "Alcohol part (ethyl) first, acid part (ethanoate) second" },
        { prompt: "Is pentan-3-one an aldehyde or a ketone?", answer: "A ketone", method: "The -one ending; an aldehyde would end in -al" },
      ],
      traps: [
        {
          title: "Esters are named alcohol part first",
          body: "In \\(\\mathrm{CH_3COOCH_2CH_3}\\) the acid part is \\(\\mathrm{CH_3COO}\\) (ethanoate) and the alcohol part is \\(\\mathrm{CH_2CH_3}\\) (ethyl). The name is ethyl ethanoate. Reading the formula left to right and naming the first part first gives the wrong ester.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-org-biomolecules",
      name: "Functional groups in biological molecules",
      intuition:
        "The big molecules of life are built from small units joined by the same groups you have just learned. Amino acids join through amide links, sugars through C-O-C links, and fats through ester links. Knowing the group tells you how the molecule is made and how it is broken down.",
      definition:
        "- **Amino acids** carry an amine group and a carboxylic acid group on the same carbon. In water they exist as **zwitterions** (\\(\\mathrm{NH_3^+}\\) and \\(\\mathrm{COO^-}\\)), so they dissolve well in water, poorly in hexane, and act as both acids and bases.\n" +
        "- Proteins are chains of amino acids joined by **peptide bonds**, which are amide groups.\n" +
        "- **Carbohydrates** contain only C, H and O. Glucose \\(\\mathrm{C_6H_{12}O_6}\\) has five OH groups and an aldehyde group (in its open form); fructose has a ketone group instead.\n" +
        "- **Polysaccharides** are long chains of sugar units. A **homopolysaccharide** uses one kind of unit (starch, glycogen and cellulose are all made of glucose only).\n" +
        "- **Triglycerides** (fats and oils) are triesters of glycerol with three fatty acids.",
      table: {
        columns: ["Molecule", "Made from", "Linking group", "Key fact"],
        rows: [
          { cells: ["Protein (polypeptide)", "Amino acids", "Peptide bond (amide)", "Every amino acid has NH₂ and COOH; cysteine also has a thiol SH"] },
          { cells: ["Starch", "Glucose", "Glycosidic link (C-O-C)", "Energy store in plants"] },
          { cells: ["Glycogen", "Glucose", "Glycosidic link (C-O-C)", "Energy store in animals (liver and muscle), not in plants"] },
          { cells: ["Disaccharide (sucrose, lactose)", "Two monosaccharides", "One glycosidic link", "Sucrose is glucose + fructose"] },
          { cells: ["Triglyceride (fat, oil)", "Glycerol and three fatty acids", "Three ester groups", "Insoluble in water; soluble in non-polar solvents"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which functional group joins the amino acids in a protein chain?",
        options: ["Ester", "Ether", "Amine", "Ketone", "Amide"],
        steps: [
          "The COOH of one amino acid reacts with the \\(\\mathrm{NH_2}\\) of the next. The new link is C=O bonded to N: an amide, called a peptide bond.",
          "Amine is the tempting wrong answer: the free \\(\\mathrm{NH_2}\\) is an amine, but once it is bonded to the C=O it becomes part of an amide. Esters link fats, and C-O-C links join sugars.",
        ],
        answer: "(E) Amide",
      },
      practiceSet: [
        { prompt: "Where is glycogen stored?", answer: "In animal cells, mainly liver and muscle", method: "Plants store starch instead" },
        { prompt: "Which functional groups are in open-chain glucose?", answer: "Alcohol (five OH) and aldehyde", method: "\\(\\mathrm{C_6H_{12}O_6}\\), an aldose" },
        { prompt: "Is starch a homopolysaccharide or a heteropolysaccharide?", answer: "Homopolysaccharide", method: "Made of glucose units only" },
        { prompt: "Which two groups does every amino acid contain?", answer: "An amine group and a carboxylic acid group", method: "Both on the same (alpha) carbon" },
      ],
      traps: [
        {
          title: "Glycogen is a homopolysaccharide stored by animals, not plants",
          body: "Glycogen is a branched chain of glucose units only, so it is a homopolysaccharide, not a heteropolysaccharide and not a disaccharide. Animals store glycogen; plants store starch.",
        },
        {
          title: "Amino acids are water-soluble ions, not oily molecules",
          body: "Because each amino acid carries both an acidic and a basic group, it exists as a zwitterion in water. That makes it dissolve well in water and badly in hexane, and gives it both acid and base behaviour.",
        },
      ],
    },
  ],
};
