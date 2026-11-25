import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_AM_DIAZONIUM_NOTE: SubtopicNote = {
  subtopicName: "Chemical Reactions of Diazonium Salts",
  title: "Diazonium Salts: Preparation and Reactions",
  oneLineDefinition:
    "Diazotisation of aniline at 273 to 278 K, why arenediazonium salts are more stable than alkyl ones, replacement of the diazonium group (Sandmeyer, Gatterman, KI, HBF₄, H₃PO₂, water) and coupling to azo dyes.",
  whyItMatters:
    "27 questions, twenty-six of them from board papers, twelve in 2026 alone. The board asks which reagent turns benzenediazonium chloride into benzene, phenol or benzonitrile (MCQs in 2023, 2025 and 2026), names Sandmeyer's and Gatterman's reactions (2024), sets the stability of aromatic and aliphatic diazonium salts as assertion-reason (twice in 2024, three times in 2026) and asks for the coupling product with phenol or aniline (2023, 2024 and 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcam-diazotisation",
      name: "Diazotisation and the stability of diazonium salts",
      intuition:
        "Nitrous acid turns the -NH₂ of a primary amine into -N₂⁺. On an alkyl group this ion falls apart at once, losing N₂ gas. On a benzene ring the positive charge is spread over the ring by resonance, so the ion lasts for a while in cold solution, long enough to be used.",
      definition:
        "- Diazonium salts have the formula **R-N₂⁺X⁻**, where R is an aryl group and X⁻ is Cl⁻, Br⁻, HSO₄⁻, BF₄⁻ and so on. The -N₂⁺ group is the **diazonium group**. C₆H₅N₂⁺Cl⁻ is benzenediazonium chloride.\n" +
        "- **Diazotisation:** a primary aromatic amine with **nitrous acid at 273 to 278 K**. The nitrous acid is made in the mixture from **NaNO₂ and HCl**.\n" +
        "- The salt is not stored; it is used **immediately** after it is made.\n" +
        "- Primary **aliphatic** amines give highly unstable alkyldiazonium salts. Primary **aromatic** amines give arenediazonium salts that are stable for a short time in solution at 273 to 278 K. This stability is explained by **resonance**.\n" +
        "- Benzenediazonium chloride is a colourless crystalline solid, readily soluble in water and stable in the cold; it reacts with water when warmed and decomposes easily when dry. **Benzenediazonium fluoroborate** is insoluble in water and stable at room temperature.",
      formula: {
        label: "Diazotisation of aniline",
        latex: "\\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{NaNO}_2 + 2\\text{HCl} \\xrightarrow{\\text{273-278 K}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{NaCl} + 2\\text{H}_2\\text{O}",
      },
      authoredExample: {
        prompt: "Write the equation for the diazotisation of 4-methylaniline. Why is the mixture kept cold?",
        steps: [
          "\\(\\text{4-CH}_3\\text{C}_6\\text{H}_4\\text{NH}_2 + \\text{NaNO}_2 + 2\\text{HCl} \\xrightarrow{\\text{273-278 K}} \\text{4-CH}_3\\text{C}_6\\text{H}_4\\text{N}_2^+\\text{Cl}^- + \\text{NaCl} + 2\\text{H}_2\\text{O}\\)",
          "The product is 4-methylbenzenediazonium chloride.",
          "The salt is stable only in the cold; if the solution warms (to about 283 K) it reacts with water and gives the phenol instead.",
        ],
        answer: "4-Methylbenzenediazonium chloride; the cold keeps the salt from being hydrolysed to 4-methylphenol",
      },
      selfCheckExample: {
        prompt: "Ethanamine and aniline are each treated with NaNO₂ and HCl in the cold. Which gives a diazonium salt that can be used, and what does the other give?",
        steps: [
          "Aniline is a primary aromatic amine: its diazonium ion is stabilised by resonance with the ring and survives in the cold.",
          "Ethanamine is a primary aliphatic amine: its diazonium salt is unstable and loses nitrogen at once.",
        ],
        answer: "Aniline gives benzenediazonium chloride; ethanamine gives ethanol and nitrogen gas",
      },
      practiceSet: [
        { prompt: "Why is benzenediazonium chloride used as soon as it is made?", answer: "It is unstable: it reacts with water when warmed and decomposes easily when dry" },
        { prompt: "Which diazonium salt is insoluble in water and stable at room temperature?", answer: "Benzenediazonium fluoroborate" },
        { prompt: "Name the salt C₆H₅N₂⁺HSO₄⁻.", answer: "Benzenediazonium hydrogensulphate" },
      ],
      pyqExampleId: "5f84ef7a-7bce-4e87-8cd3-4e154c1b8875",
      traps: [
        {
          title: "Putting the resonance in the wrong salt",
          body: "Resonance stabilises the aromatic diazonium ion, whose positive charge spreads into the ring. An aliphatic diazonium ion has no ring and shows no such resonance. \"Diazonium salts of aliphatic amines show resonance\" is a false Reason, (C).",
        },
        {
          title: "Leaving out the temperature",
          body: "Write 273 to 278 K (or 0 to 5 °C) over the diazotisation arrow. Without it, the next step on the paper could just as well be phenol.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcam-replacement",
      name: "Replacing the diazonium group",
      intuition:
        "The diazonium group is a very good leaving group because it leaves as nitrogen gas, which escapes. So many groups can push it out: a halide or cyanide with copper, iodide on its own, water, or a reducing agent that puts hydrogen in its place. Learn the reagent for each product.",
      definition:
        "- **Sandmeyer reaction:** Cl⁻, Br⁻ and CN⁻ replace the diazonium group in the presence of **Cu(I) ion** (CuCl, CuBr, CuCN).\n" +
        "- **Gatterman reaction:** chlorine or bromine are put on with the **halogen acid and copper powder**. The yield of the Sandmeyer reaction is better.\n" +
        "- **Iodide:** shaking the diazonium salt solution with **potassium iodide** gives iodobenzene; iodine is not easily put on a ring directly.\n" +
        "- **Fluoride:** with **fluoroboric acid** the diazonium fluoroborate precipitates; heating it gives the aryl fluoride.\n" +
        "- **Hydrogen:** mild reducing agents, **hypophosphorous acid** (phosphinic acid) or **ethanol**, reduce the salt to the arene and are themselves oxidised to phosphorous acid and ethanal.\n" +
        "- **Hydroxyl:** if the solution is allowed to warm to **283 K**, the salt is hydrolysed to phenol.\n" +
        "- **Nitro group:** the fluoroborate heated with aqueous **NaNO₂ in the presence of copper** gives the nitro compound.\n" +
        "- In every one of these, N₂ escapes as a gas.",
      table: {
        columns: ["Product from C₆H₅N₂⁺Cl⁻", "Reagent or condition", "Name"],
        rows: [
          { cells: ["Chlorobenzene", "CuCl with HCl", "Sandmeyer reaction"] },
          { cells: ["Bromobenzene", "CuBr with HBr", "Sandmeyer reaction"] },
          {
            cells: ["Benzonitrile", "CuCN with KCN", "Sandmeyer reaction"],
            pyqExampleId: "e2476e09-67f1-4b2b-920b-08856eebfc28",
            noteAmber: "Board 2024 asked the name of this reaction; 2025 asked for its reagent, CuCN.",
          },
          {
            cells: ["Chlorobenzene or bromobenzene", "HCl or HBr with copper powder", "Gatterman reaction"],
            pyqExampleId: "191c6b54-8243-457b-9dbe-a1e2e4e3cd68",
            noteAmber: "Board 2024 asked the name of this reaction.",
          },
          { cells: ["Iodobenzene", "KI solution", "Replacement by iodide"] },
          { cells: ["Fluorobenzene", "HBF₄, then heat the fluoroborate", "Replacement by fluoride"] },
          {
            cells: ["Benzene", "H₃PO₂ and water, or ethanol", "Replacement by hydrogen"],
            pyqExampleId: "ec2c4531-71af-40a1-9ff3-64cc61243b8c",
            noteAmber: "Board 2025 and 2026 asked which reagent gives benzene: ethanol, not water.",
          },
          {
            cells: ["Phenol", "Warm the solution (283 K) with water", "Replacement by hydroxyl"],
            pyqExampleId: "b5a7a46a-5948-4195-96ef-e41446588b21",
            noteAmber: "Board 2023 asked for the product of hydrolysis.",
          },
          { cells: ["Nitrobenzene", "HBF₄, then NaNO₂ and copper with heat", "Replacement by nitro group"] },
        ],
      },
      selfCheckExample: {
        prompt: "How will you obtain fluorobenzene from aniline?",
        steps: [
          "Diazotise: \\(\\text{C}_6\\text{H}_5\\text{NH}_2 \\xrightarrow[\\text{cold}]{\\text{NaNO}_2 + \\text{HCl}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^-\\)",
          "Add fluoroboric acid: \\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- \\xrightarrow{\\text{HBF}_4} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{BF}_4^-\\) precipitates.",
          "Heat it: \\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{BF}_4^- \\xrightarrow{\\Delta} \\text{C}_6\\text{H}_5\\text{F} + \\text{BF}_3 + \\text{N}_2\\)",
        ],
        answer: "Diazotisation, then HBF₄, then heating the fluoroborate gives fluorobenzene",
      },
      practiceSet: [
        { prompt: "Which gives the better yield, the Sandmeyer or the Gatterman reaction?", answer: "The Sandmeyer reaction" },
        { prompt: "Complete: C₆H₅N₂⁺Cl⁻ + KI →", answer: "C₆H₅I + KCl + N₂ (iodobenzene)" },
        { prompt: "What is ethanol oxidised to when it reduces a diazonium salt to benzene?", answer: "Ethanal" },
      ],
      pyqExampleId: "9a83d897-084e-4e9c-bc43-e58cdec96952",
      traps: [
        {
          title: "Sandmeyer and Gatterman swapped",
          body: "Sandmeyer uses a copper(I) salt (CuCl, CuBr, CuCN). Gatterman uses copper powder with the halogen acid. The product can be the same; the copper decides the name.",
        },
        {
          title: "Water or ethanol",
          body: "Warm water gives phenol. Ethanol or H₃PO₂ gives benzene. Both are \"simple\" reagents, so read the one over the arrow carefully.",
        },
        {
          title: "Dropping the nitrogen",
          body: "Every replacement gives off N₂. Write it in the equation; a missing product costs the equation mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcam-coupling",
      name: "Coupling reactions and azo dyes",
      intuition:
        "Here the nitrogen is not lost. The diazonium ion is a weak electrophile, so it can attack only a strongly activated ring such as phenol or aniline, at the para position. The product keeps an -N=N- bridge between two rings; the long conjugated system makes it coloured, so these compounds are dyes.",
      definition:
        "- Reactions with **retention** of the diazo group are coupling reactions.\n" +
        "- Benzenediazonium chloride couples with **phenol** at its para position (in alkaline medium) to give **p-hydroxyazobenzene**, an orange dye.\n" +
        "- With **aniline** (in acid medium) it gives **p-aminoazobenzene**, a yellow dye.\n" +
        "- Coupling is an **electrophilic substitution** reaction.\n" +
        "- The azo products have an **extended conjugated system**, both rings joined through -N=N-. They are often coloured and used as dyes.",
      formula: {
        label: "Coupling with phenol",
        latex: "\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{C}_6\\text{H}_5\\text{OH} \\xrightarrow{\\text{OH}^-} \\text{C}_6\\text{H}_5\\text{-N=N-C}_6\\text{H}_4\\text{-OH (p)} + \\text{HCl}",
      },
      authoredExample: {
        prompt: "Write the equation for the coupling of benzenediazonium chloride with aniline. Name the product.",
        steps: [
          "Aniline's ring is strongly activated by -NH₂, so the diazonium ion attacks the position para to it.",
          "\\(\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^- + \\text{C}_6\\text{H}_5\\text{NH}_2 \\xrightarrow{\\text{H}^+} \\text{C}_6\\text{H}_5\\text{-N=N-C}_6\\text{H}_4\\text{-NH}_2\\ (p) + \\text{HCl}\\)",
          "The -N=N- group is kept: no nitrogen is lost.",
        ],
        answer: "p-Aminoazobenzene, a yellow dye",
      },
      selfCheckExample: {
        prompt: "Is a coupling reaction a nucleophilic or an electrophilic substitution? Which species is the electrophile?",
        steps: [
          "The ring of phenol or aniline is rich in electrons and is attacked.",
          "The attacking species is the positive diazonium ion.",
        ],
        answer: "Electrophilic substitution; the diazonium ion, Ar-N₂⁺, is the electrophile",
      },
      practiceSet: [
        { prompt: "Why are azo compounds coloured?", answer: "They have an extended conjugated system: two rings joined through -N=N-" },
        { prompt: "At which position of phenol does the diazonium ion couple?", answer: "The para position" },
        { prompt: "Is the diazo group lost or kept in a coupling reaction?", answer: "Kept: the product contains -N=N-" },
      ],
      pyqExampleId: "1993b8c1-a818-4e85-998a-b18666eddad8",
      traps: [
        {
          title: "Writing a replacement product",
          body: "Phenol with a diazonium salt in alkali does not give a replacement product such as benzene or chlorobenzene. The -N=N- stays and joins the rings: p-hydroxyazobenzene.",
        },
        {
          title: "Calling it diazotisation",
          body: "Diazotisation makes the diazonium salt from the amine. Coupling is the next step, the diazonium salt attacking phenol or aniline.",
        },
      ],
    },
  ],
};
