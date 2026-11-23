import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_HD_POLYHALOGEN_NOTE: SubtopicNote = {
  subtopicName: "Uses and Environmental Effects of Polyhalogen Compounds",
  title: "Polyhalogen Compounds: Uses and Environmental Effects",
  oneLineDefinition:
    "Dichloromethane, chloroform, carbon tetrachloride, iodoform, freons and DDT: what each is used for and the harm each can do.",
  whyItMatters:
    "4 questions. Three were set in board papers: the source of dichlorocarbene (2026), the name of the gamma isomer of BHC (2025) and the insecticide used instead of DDT (2024). The textbook adds the dichlorocarbene MCQ. Board papers also ask the full name and structure of DDT and the use and effect of CFCs inside longer questions on other pages.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscchd-chloromethanes",
      name: "Dichloromethane, chloroform, carbon tetrachloride and iodoform",
      intuition:
        "These small polyhalogen compounds are useful liquids and solids, mostly as solvents, but each has a cost to health. Learn them as pairs: one use, one harm.",
      definition:
        "- **Dichloromethane (methylene chloride), \\(\\text{CH}_2\\text{Cl}_2\\):** a colourless volatile liquid with a moderately sweet aroma.\n" +
        "- **Chloroform (trichloromethane), \\(\\text{CHCl}_3\\):** a colourless liquid with a peculiar sweet smell. In air and light it forms the poisonous compound **phosgene**, so it is stored in dark coloured, air tight bottles.\n" +
        "- **Carbon tetrachloride (tetrachloromethane), \\(\\text{CCl}_4\\):** a colourless liquid with a sweet smell.\n" +
        "- **Iodoform (triiodomethane), \\(\\text{CHI}_3\\):** a yellow crystalline substance with a disagreeable smell.",
      table: {
        columns: ["Compound", "Uses", "Harmful effects"],
        rows: [
          { cells: ["\\(\\text{CH}_2\\text{Cl}_2\\)", "Solvent; propellant in aerosols", "Dizziness, fatigue, nausea, headaches, numbness; damages the cornea if it touches the eyes"] },
          {
            cells: ["\\(\\text{CHCl}_3\\)", "Makes the refrigerant R-22; solvent for extracting gums, fats and resins; source of dichlorocarbene", "Depresses the central nervous system; fatigue, dizziness, headache; long exposure may affect the liver"],
            pyqExampleId: "62b0292e-fb54-4ba2-8016-c01ae58f85b2",
            noteAmber: "Board 2026 asked for the source of dichlorocarbene: chloroform.",
          },
          { cells: ["\\(\\text{CCl}_4\\)", "Solvent for oils, fats and resins; source of chlorine; cleaning agent", "Highly toxic to the liver; affects the nervous system; suspected carcinogen; a greenhouse gas"] },
          { cells: ["\\(\\text{CHI}_3\\)", "Healing agent and antiseptic for dressing wounds (limited use)", "Irritates skin and eyes; breathing difficulty, dizziness, nausea"] },
        ],
      },
      practiceSet: [
        { prompt: "Why is chloroform stored in dark coloured, air tight bottles?", answer: "In air and light it forms the poisonous compound phosgene" },
        { prompt: "Which polyhalogen compound is used as an antiseptic in dressing wounds?", answer: "Iodoform, CHI₃" },
        { prompt: "Which of the chloromethanes is named in the textbook as a greenhouse gas?", answer: "Carbon tetrachloride, CCl₄" },
        { prompt: "Name the refrigerant prepared from chloroform.", answer: "Chlorodifluoromethane, R-22" },
      ],
      pyqExampleId: "62b0292e-fb54-4ba2-8016-c01ae58f85b2",
      traps: [
        {
          title: "Dichlorocarbene comes from chloroform",
          body: "Carbon tetrachloride has no hydrogen, and dichloromethane has only two chlorines. The textbook names chloroform as the source of dichlorocarbene.",
        },
        {
          title: "Name the poison: phosgene",
          body: "The reason for storing chloroform in dark bottles needs the word phosgene. 'It decomposes' alone is not enough.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscchd-freons-ddt",
      name: "Freons and DDT",
      intuition:
        "Freons and DDT were both prized because they are so stable. That same stability is the trouble: freons survive long enough to reach the stratosphere and destroy ozone, and DDT survives in soil and in body fat, building up in the food chain.",
      definition:
        "- **Freons** are chlorofluorocarbons (CFCs), compounds of chlorine and fluorine: **Freon-12** is dichlorodifluoromethane, \\(\\text{CCl}_2\\text{F}_2\\); others are chlorodifluoromethane (R-22) and trichlorofluoromethane (R-11).\n" +
        "- **Ozone depletion:** UV radiation breaks a C-Cl bond in the upper atmosphere, \\(\\text{CFCl}_3 \\xrightarrow{\\text{UV}} \\text{CFCl}_2 + \\text{Cl}\\). Then \\(\\text{O}_3 + \\text{Cl} \\longrightarrow \\text{O}_2 + \\text{ClO}\\) and \\(\\text{ClO} + \\text{O} \\longrightarrow \\text{O}_2 + \\text{Cl}\\). The chlorine atom is set free again, so one atom can destroy up to 100,000 ozone molecules.\n" +
        "- **DDT** is dichlorodiphenyltrichloroethane: a colourless, tasteless, odourless crystalline insecticide. Its insecticidal action was found by Paul Muller in 1939 (Nobel Prize, 1948).\n" +
        "- **BHC:** the board has asked (2024, 2025) about the insecticide used in place of DDT, the gamma isomer of benzene hexachloride, called **gammexane** or **lindane**. The present textbook does not cover BHC, so give these two names and move on.",
      table: {
        columns: ["Compound", "Uses", "Harmful effects"],
        rows: [
          { cells: ["Freons (CFCs)", "Refrigerants in fridges and air conditioning; propellants in aerosols; solvents; blowing agents for foams and packing materials", "Deplete ozone in the stratosphere; heavy inhalation causes breathing problems, organ damage, loss of consciousness"] },
          { cells: ["DDT", "Kills houseflies, mosquitoes and body lice; used to control malaria and typhus", "Persistent organic pollutant; accumulates in fatty tissues and in the ecosystem; high doses cause vomiting and tremors; banned"] },
          {
            cells: ["BHC, gamma isomer", "Insecticide used instead of DDT", "Gammexane, also called lindane (not in the present textbook)"],
            pyqExampleId: "4d414952-b0be-43f6-acb1-842921c784ae",
            noteAmber: "Board 2024 asked which insecticide is used instead of DDT.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Write the chemical name of Freon-12.", answer: "Dichlorodifluoromethane, CCl₂F₂" },
        { prompt: "Write the full name of DDT.", answer: "Dichlorodiphenyltrichloroethane" },
        { prompt: "Name two uses of freons.", answer: "Any two: refrigerants, aerosol propellants, solvents, blowing agents for foams" },
        { prompt: "Why was the use of DDT banned?", answer: "It is a persistent pollutant that accumulates in fatty tissues and in the ecosystem" },
      ],
      pyqExampleId: "9396887a-db70-474c-9705-352214b98527",
      traps: [
        {
          title: "Write the ozone equations, not just 'depletes ozone'",
          body: "For the environmental effect of CFCs, show the chlorine atom set free by UV and the two steps that destroy ozone and regenerate it. One line of words earns one mark at most.",
        },
        {
          title: "DDT is not a freon",
          body: "DDT is a chlorinated insecticide with two benzene rings; freons are small chlorofluoro methanes used as refrigerants. Keep their uses apart.",
        },
      ],
    },
  ],
};
