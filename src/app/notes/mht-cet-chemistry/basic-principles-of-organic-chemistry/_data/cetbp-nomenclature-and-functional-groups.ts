import type { SubtopicNote } from "@/app/notes/_types";

export const NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "IUPAC Nomenclature, Functional Groups and Homologous Series",
  title: "IUPAC Nomenclature, Functional Groups and Homologous Series",
  oneLineDefinition:
    "An IUPAC name is built from the longest chain containing the principal functional group, numbered to give that group the lowest locant; which group is principal follows a fixed priority order, and a homologous series steps by one CH₂ (14 g mol⁻¹) at a time.",
  whyItMatters:
    "17 PYQs, 2 HARD — the biggest of the three pages. Five ask the priority order of functional groups (which is principal, which is lowest), five ask which heterocycle carries N, O or S, two ask the 14 g mol⁻¹ step of a homologous series, and four are a name or a bond-line formula from a drawn structure. " +
    "Two tables and one naming routine.",
  concepts: [
    // 1 — homologous series and named compounds
    {
      kind: "formula" as const,
      slug: "cetbp-homologous-series",
      name: "Homologous Series: One CH₂ at a Time",
      intuition:
        "Members of a homologous series share a functional group and a general formula and differ by a CH₂ unit — 12 + 2 = 14 g mol⁻¹ between neighbours. Alkanes are \(\text{C}_n\text{H}_{2n+2}\): undecane is \(\text{C}_{11}\text{H}_{24}\), dodecane \(\text{C}_{12}\text{H}_{26}\). The chapter also names a few real compounds by their functional groups; aspirin is an ester of salicylic acid, not an amide.",
      definition:
        "- Homologues: same functional group, same general formula, successive members differ by \\(-\\text{CH}_2-\\) = **14 g mol⁻¹**; physical properties grade smoothly, chemical properties are alike.\n" +
        "- Alkanes \\(\\text{C}_n\\text{H}_{2n+2}\\), alkenes \\(\\text{C}_n\\text{H}_{2n}\\), alkynes \\(\\text{C}_n\\text{H}_{2n-2}\\), alcohols \\(\\text{C}_n\\text{H}_{2n+1}\\text{OH}\\).\n" +
        "- Aspirin (acetylsalicylic acid): made from salicylic acid, carries an **ester** and a carboxylic acid — NO amide linkage; fewer side effects than salicylic acid but still irritates the stomach.\n" +
        "- Counting atoms from a formula: \\(\\text{HO(CH}_2)_3\\text{CH(CH}_3)\\text{CH(CH}_3)_2\\) has 8 carbons; but-2-ene \\(\\text{C}_4\\text{H}_8\\) has 8 H per molecule, so n mol carries 8n mol of H.",
      formula: {
        label: "Homologous step",
        latex:
          "M(\\text{C}_{n+1}\\text{H}_{2n+4}) - M(\\text{C}_n\\text{H}_{2n+2}) = 14\\ \\text{g mol}^{-1}",
      },
      authoredExample: {
        prompt: "Give the molecular formulas of the third and fourth alkanes and the difference between their molar masses.",
        steps: [
          "Propane \\(\\text{C}_3\\text{H}_8\\) (44), butane \\(\\text{C}_4\\text{H}_{10}\\) (58); difference 14.",
        ],
        answer: "\\(\\text{C}_3\\text{H}_8\\), \\(\\text{C}_4\\text{H}_{10}\\); 14 g mol⁻¹",
      },
      selfCheckExample: {
        prompt: "How many moles of hydrogen atoms are in 0.5 mol of propene?",
        steps: [
          "Propene is \\(\\text{C}_3\\text{H}_6\\): \\(0.5 \\times 6 = 3\\) mol H.",
        ],
        answer: "\\(3\\) mol",
      },
      practiceSet: [
        { prompt: "Molar-mass difference between successive homologues?", answer: "14 g mol⁻¹" },
        { prompt: "Undecane and dodecane differ by?", answer: "14 g mol⁻¹" },
        { prompt: "Which linkage does aspirin NOT contain: ester or amide?", answer: "Amide" },
        { prompt: "Moles of H in n mol of but-2-ene?", answer: "8n" },
      ],
      pyqExampleId: "9df4073f-8254-4340-b47f-9e35af02b854",
      traps: [
        {
          title: "Taking the difference as 12 or 2",
          body:
            "A CH₂ unit is one carbon AND two hydrogens: 12 + 2 = 14. Both 12 and 2 are offered.",
        },
      ],
    },

    // 2 — heterocycles
    {
      kind: "reference" as const,
      slug: "cetbp-heterocycles",
      name: "Heterocyclic Compounds by Heteroatom",
      intuition:
        "A heterocycle is a ring with an atom other than carbon in it. The exam's set is small: three five-membered aromatics — pyrrole (N), furan (O), thiophene (S) — and three six-membered rings — pyridine (N, aromatic), piperidine (N, saturated), pyran (O). Every question is 'which one has N / O / S' or 'which one has no N'.",
      definition:
        "- Five-membered aromatic: **pyrrole** (N), **furan** (O), **thiophene** (S).\n" +
        "- Six-membered: **pyridine** (N, aromatic), **piperidine** (N, fully saturated), **pyran** (O).\n" +
        "- Nitrogen-free among the exam's list: furan, thiophene, pyran. Nitromethane is not a ring at all.",
      table: {
        columns: ["Compound", "Ring size", "Heteroatom", "Aromatic?"],
        rows: [
          { cells: ["Pyrrole", "5", "N", "Yes"] },
          { cells: ["Furan", "5", "O", "Yes"] },
          { cells: ["Thiophene", "5", "S", "Yes"], noteAmber: "The only sulphur ring in the list." },
          { cells: ["Pyridine", "6", "N", "Yes"] },
          { cells: ["Piperidine", "6", "N", "No — saturated"], noteAmber: "Piperidine has N, not S; it is the reduced form of pyridine." },
          { cells: ["Pyran", "6", "O", "No"], noteAmber: "Pyran contains NO nitrogen." },
        ],
        caption: "Pyr- names carry nitrogen except pyran; fur- is oxygen; thio- is sulphur.",
      },
      selfCheckExample: {
        prompt: "Which of pyrrole, piperidine, pyridine and pyran contains no nitrogen, and which of furan, pyridine, thiophene, piperidine contains oxygen?",
        steps: [
          "Pyran is the oxygen six-ring — no nitrogen.",
          "Furan is the oxygen five-ring.",
        ],
        answer: "Pyran; furan",
      },
      practiceSet: [
        { prompt: "Heteroatom of thiophene?", answer: "S" },
        { prompt: "Heteroatom of pyrrole?", answer: "N" },
        { prompt: "Which contains O: furan, pyridine, thiophene, piperidine?", answer: "Furan" },
        { prompt: "Which has no N: thiophene, pyridine, pyrrole, piperidine?", answer: "Thiophene" },
      ],
      pyqExampleId: "515f5809-11c7-49ca-8657-f55b359186b3",
      traps: [
        {
          title: "Reading 'pyran' as a nitrogen ring",
          body:
            "Pyrrole, pyridine and piperidine all carry N, so the prefix feels like nitrogen — but pyran is the OXYGEN six-ring. It is the planted answer in every 'no nitrogen' question.",
        },
      ],
    },

    // 3 — priority order
    {
      kind: "reference" as const,
      slug: "cetbp-functional-group-priority",
      name: "Priority Order of Functional Groups",
      intuition:
        "When a molecule has several functional groups, one becomes the suffix (principal group) and the rest become prefixes. The order runs from carboxylic acid down through its derivatives to nitrile, aldehyde, ketone, alcohol, amine — and the double and triple bonds are never principal over any of these.",
      definition:
        "- Decreasing priority: \\(-\\text{COOH} > -\\text{SO}_3\\text{H} > -\\text{COOR} > -\\text{COCl} > -\\text{CONH}_2 > -\\text{CN} > -\\text{CHO} > \\text{>C=O} > -\\text{OH} > -\\text{NH}_2 > \\text{C=C} > \\text{C≡C}\\).\n" +
        "- Among \\(-\\text{CONH}_2\\), \\(-\\text{CN}\\), \\(-\\text{OH}\\), \\(-\\text{C≡C}-\\): the amide is principal. Among \\(-\\text{COCl}\\), \\(-\\text{SO}_3\\text{H}\\), \\(-\\text{CHO}\\), \\(-\\text{OH}\\): the sulphonic acid.\n" +
        "- Among \\(-\\text{COOR}\\), \\(-\\text{COCl}\\), \\(\\text{>C=O}\\), \\(-\\text{CONH}_2\\): the ketone is LOWEST.\n" +
        "- Groups that are only ever prefixes: halo, nitro, alkoxy, alkyl.",
      table: {
        columns: ["Rank", "Group", "Suffix"],
        rows: [
          { cells: ["1", "−COOH", "-oic acid"] },
          { cells: ["2", "−SO₃H", "-sulphonic acid"], noteAmber: "Above esters and acid chlorides — the 2025 paper keys it over −COCl." },
          { cells: ["3", "−COOR", "-oate"] },
          { cells: ["4", "−COCl", "-oyl chloride"] },
          { cells: ["5", "−CONH₂", "-amide"] },
          { cells: ["6", "−CN", "-nitrile"] },
          { cells: ["7", "−CHO", "-al"] },
          { cells: ["8", ">C=O", "-one"], noteAmber: "Lowest of the carbonyl family." },
          { cells: ["9", "−OH", "-ol"] },
          { cells: ["10", "−NH₂", "-amine"] },
          { cells: ["11", "C=C, C≡C", "-ene, -yne"], noteAmber: "Never principal over a heteroatom group." },
        ],
        caption: "Acid first, then its derivatives in the order ester, chloride, amide, then nitrile, aldehyde, ketone, alcohol, amine.",
      },
      selfCheckExample: {
        prompt: "Which is principal in a molecule carrying −CHO, −OH and −CN, and what is the correct order of −COOH, −CHO, −OH, −NH₂?",
        steps: [
          "Nitrile outranks aldehyde and alcohol: −CN is principal.",
          "\\(-\\text{COOH} > -\\text{CHO} > -\\text{OH} > -\\text{NH}_2\\).",
        ],
        answer: "−CN; −COOH > −CHO > −OH > −NH₂",
      },
      practiceSet: [
        { prompt: "Principal group among −CONH₂, −CN, −OH, −C≡C−?", answer: "−CONH₂" },
        { prompt: "Lowest among −COOR, −COCl, >C=O, −CONH₂?", answer: ">C=O" },
        { prompt: "Highest among −COCl, −SO₃H, −CHO, −OH?", answer: "−SO₃H" },
        { prompt: "Does −CHO outrank −COOH?", answer: "No" },
      ],
      pyqExampleId: "39970f04-1734-4bf7-8399-21ecccf3e531",
      traps: [
        {
          title: "Putting the acid chloride above the ester",
          body:
            "The derivative order is ester, THEN acid chloride, then amide: −COOR > −COCl > −CONH₂. The reversed pair is offered as an option.",
        },
      ],
    },

    // 4 — IUPAC naming and bond-line formulas
    {
      kind: "formula" as const,
      slug: "cetbp-iupac-naming-and-bond-line",
      name: "Naming From a Structure, and Reading Bond-Line Formulas",
      intuition:
        "Find the longest chain that contains the principal group or the double bond; number from the end that gives the principal group, then the multiple bond, then the substituents the lowest locants; list substituents alphabetically. In a bond-line drawing every vertex and line-end is a carbon with enough hydrogens to make four bonds.",
      definition:
        "- Routine: longest chain containing the principal group → number for lowest locants (principal group first, then C=C/C≡C, then the substituent set) → prefixes alphabetically (iodo before methyl).\n" +
        "- \\(\\text{CH}_3\\text{CH}_2\\text{-C(CH}_3)\\text{=C(Br)-CH}_2\\text{CH}_3\\): hex-3-ene with Br on C3 and methyl on C4 → **3-bromo-4-methylhex-3-ene**.\n" +
        "- \\(\\text{CH}_3\\text{CH}_2\\text{-CH(CH}_3)\\text{-C(CH}_3)\\text{=CH-CH(I)-CH}_3\\): seven-carbon chain through the double bond, numbered from the iodine end → **2-iodo-4,5-dimethylhept-3-ene**.\n" +
        "- Bond-line: neopentane \\(\\text{C(CH}_3)_4\\) is four lines from one point; 2-methylbutane is a zigzag with one branch; pentane a plain zigzag.\n" +
        "- \\(\\text{HO(CH}_2)_3\\text{CH(CH}_3)\\text{CH(CH}_3)_2\\) = 4,5-dimethylhexan-1-ol: OH at a line-end, then three vertices, then two branched vertices.",
      formula: {
        label: "Naming order",
        latex:
          "\\text{locants: principal group} \\to \\text{C=C / C≡C} \\to \\text{substituents (lowest set)};\\quad \\text{prefixes alphabetical}",
      },
      authoredExample: {
        prompt: "Name \\(\\text{CH}_3\\text{-CH(Cl)-CH=CH-CH(CH}_3)\\text{-CH}_3\\).",
        steps: [
          "Six carbons through the double bond. Numbering from the chlorine end: C=C at 3, Cl at 2, methyl at 5 → locant set {2,3,5}; from the other end {2,3,5} as well, so the first point of difference rule falls to alphabetical order: chloro gets the lower number.",
        ],
        answer: "2-chloro-5-methylhex-3-ene",
      },
      selfCheckExample: {
        prompt: "Draw or describe the bond-line formula of 2,3-dimethylbutane and count its carbons.",
        steps: [
          "A two-carbon central line with two branches at each end — six carbons, four of them methyl.",
        ],
        answer: "Two central carbons each carrying two methyls; C₆H₁₄",
      },
      practiceSet: [
        { prompt: "IUPAC name of \\(\\text{CH}_3\\text{CH}_2\\text{C(CH}_3)\\text{=C(Br)CH}_2\\text{CH}_3\\)?", answer: "3-Bromo-4-methylhex-3-ene" },
        { prompt: "Bond-line formula of neopentane looks like?", answer: "Four lines from one point" },
        { prompt: "Which prefix comes first: iodo or methyl?", answer: "Iodo (alphabetical)" },
        { prompt: "Structural formula of 4,5-dimethylhexan-1-ol?", answer: "\\(\\text{HO(CH}_2)_3\\text{CH(CH}_3)\\text{CH(CH}_3)_2\\)" },
      ],
      pyqExampleId: "4d873848-ce07-426c-8a96-4c6a9063293d",
      traps: [
        {
          title: "Numbering from the substituent-rich end",
          body:
            "The double bond outranks bromo and methyl for the lowest locant; only when the C=C locant ties do the substituents decide. 4-bromo-3-methylhex-3-ene is the planted misnumbering.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Isomerism — same formula, different name",
      href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/cetbp-isomerism",
    },
    {
      label: "Electronic Effects — what the functional groups do to the chain",
      href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/cetbp-electronic-effects",
    },
  ],
};
