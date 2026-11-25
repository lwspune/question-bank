import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_HA_POLYHALOGEN_NOTE: SubtopicNote = {
  subtopicName: "Polyhalogen Compounds",
  title: "Polyhalogen Compounds",
  oneLineDefinition:
    "Dichloromethane, chloroform, iodoform, carbon tetrachloride, freons and DDT: their uses, their harmful effects, and why chloroform is stored in closed dark bottles.",
  whyItMatters:
    "6 questions, five of them from board papers. Three are one-mark MCQs naming the poisonous gas formed when chloroform is oxidised in air and light (2023, 2024, 2026); 2023 also asked for the equation, and 2025 asked what kind of insecticide DDT is. Why chloroform is kept in dark bottles also comes as a reason on the reactions page (2023, 2024, 2026). The textbook asks the uses of freon 12, DDT, carbon tetrachloride and iodoform.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcha-chloroform",
      name: "Chloroform and iodoform",
      intuition:
        "Chloroform is a useful solvent, but in air and light it slowly turns into phosgene, a very poisonous gas. Keeping out the light (a dark bottle) and the air (a bottle filled to the top and closed) stops that. Iodoform was once an antiseptic, but the work was really done by the iodine it gave off.",
      definition:
        "- **Chloroform (trichloromethane):** a solvent for fats, alkaloids, iodine and other substances. Its major use today is in making the freon refrigerant **R-22**.\n" +
        "- It was once used as a general anaesthetic but has been replaced by safer anaesthetics such as ether. Inhaling its vapour depresses the central nervous system; chronic exposure can damage the liver (where it is metabolised to phosgene) and the kidneys.\n" +
        "- It is slowly **oxidised by air in the presence of light** to an extremely poisonous gas, **carbonyl chloride (phosgene)**.\n" +
        "- So it is stored in **closed, dark coloured bottles, completely filled** so that air is kept out.\n" +
        "- **Iodoform (triiodomethane):** used earlier as an antiseptic, but the antiseptic action is due to the free iodine it liberates. Because of its objectionable smell it has been replaced by other iodine formulations.",
      formula: {
        label: "Oxidation of chloroform in air and light",
        latex: "2\\text{CHCl}_3 + \\text{O}_2 \\xrightarrow{\\text{light}} 2\\text{COCl}_2 + 2\\text{HCl}",
        symbols: [
          { symbol: "\\(\\text{COCl}_2\\)", meaning: "carbonyl chloride (phosgene), a poisonous gas" },
        ],
      },
      authoredExample: {
        prompt: "Why is chloroform stored in closed, dark coloured bottles that are completely filled? Write the reaction this prevents.",
        steps: [
          "In air and light chloroform is slowly oxidised to phosgene, which is extremely poisonous.",
          "\\(2\\text{CHCl}_3 + \\text{O}_2 \\xrightarrow{\\text{light}} 2\\text{COCl}_2 + 2\\text{HCl}\\)",
          "The dark bottle keeps out the light; filling it completely and closing it keeps out the air.",
        ],
        answer: "To keep out light and air, which together oxidise chloroform to poisonous phosgene",
      },
      selfCheckExample: {
        prompt: "What is the major use of chloroform today?",
        steps: ["Chloroform is the starting material for a freon used as a refrigerant."],
        answer: "Making the freon refrigerant R-22",
      },
      practiceSet: [
        { prompt: "Give the chemical name and formula of phosgene.", answer: "Carbonyl chloride, COCl₂" },
        { prompt: "Why was chloroform replaced as an anaesthetic?", answer: "It depresses the central nervous system and is toxic; safer anaesthetics such as ether replaced it" },
        { prompt: "To what is the antiseptic action of iodoform due?", answer: "To the free iodine it liberates, not to iodoform itself" },
      ],
      pyqExampleId: "096bdd07-37b3-46f1-8309-c8c134dcf3c1",
      traps: [
        {
          title: "Half the storage reason",
          body: "\"Dark bottles to keep out light\" is half the answer. Oxidation needs both light and air, so also say the bottle is completely filled and closed to keep air out.",
        },
        {
          title: "Naming the wrong gas",
          body: "The poisonous gas is phosgene, carbonyl chloride (COCl₂). Mustard gas, tear gas and chlorine are the usual wrong options.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcha-polyhalo-uses",
      name: "Uses and harmful effects of polyhalogen compounds",
      intuition:
        "Compounds with several halogen atoms are stable and useful as solvents, refrigerants and insecticides. That same stability is the problem: they do not break down, so they reach the ozone layer or build up in living things.",
      definition:
        "- **Polyhalogen compounds** contain more than one halogen atom; many are used in industry and agriculture.\n" +
        "- **Freons** are the chlorofluorocarbons of methane and ethane: extremely stable, unreactive, non-toxic, non-corrosive and easily liquefied gases. Freon 12 is CCl₂F₂.\n" +
        "- Freons diffuse unchanged into the stratosphere, where they start radical chain reactions that upset the natural ozone balance.\n" +
        "- **DDT** (p,p'-dichlorodiphenyltrichloroethane) was the first chlorinated organic insecticide; it is not metabolised rapidly by animals and is stored in fatty tissue, where it builds up over time.",
      table: {
        columns: ["Compound", "Uses", "Harmful effects"],
        rows: [
          { cells: ["Dichloromethane (methylene chloride)", "Solvent, paint remover, aerosol propellant, process solvent for drugs, metal cleaning", "Harms the central nervous system; burns the skin and the cornea of the eye"] },
          { cells: ["Carbon tetrachloride", "Making refrigerants and aerosol propellants; feedstock for chlorofluorocarbons; solvent; once a spot remover and fire extinguisher", "Possible liver cancer; dizziness, nausea; depletes the ozone layer"] },
          { cells: ["Freons (freon 12, CCl₂F₂)", "Aerosol propellants, refrigeration, air conditioning", "Upset the ozone balance in the stratosphere"] },
          {
            cells: ["DDT", "Insecticide against the mosquito that spreads malaria and the lice that carry typhus", "Insects became resistant; highly toxic to fish; stored in fatty tissue and builds up; banned in the USA in 1973"],
            pyqExampleId: "cc02069b-b363-42f7-9388-843c85591b16",
            noteAmber: "The textbook exercise asks the uses of freon 12, DDT, carbon tetrachloride and iodoform.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Freons are non-toxic and unreactive. Why is their use being cut down?",
        steps: [
          "Being so stable, freons diffuse unchanged into the stratosphere.",
          "There they start radical chain reactions that upset the natural ozone balance.",
        ],
        answer: "They damage the ozone layer",
      },
      practiceSet: [
        { prompt: "Write the full name of DDT.", answer: "p,p'-Dichlorodiphenyltrichloroethane" },
        { prompt: "Name the polyhalogen compound that was once used in fire extinguishers.", answer: "Carbon tetrachloride, CCl₄" },
        { prompt: "Why does DDT build up in animals?", answer: "It is not metabolised rapidly and is stored in fatty tissue" },
      ],
      pyqExampleId: "3f72c024-218e-4f39-ae9a-a286bf2563a2",
      traps: [
        {
          title: "Calling DDT biodegradable",
          body: "DDT is chemically stable and fat-soluble: it stays in the environment and in fatty tissue. It is a non-biodegradable insecticide, not a fertiliser or a greenhouse gas.",
        },
        {
          title: "Non-toxic means harmless",
          body: "Freons are non-toxic to breathe, yet they harm the ozone layer. In a \"harmful effects\" answer, write the ozone effect.",
        },
      ],
    },
  ],
};
