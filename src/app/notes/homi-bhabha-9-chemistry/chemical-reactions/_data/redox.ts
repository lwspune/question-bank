import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CR_REDOX_NOTE: SubtopicNote = {
  subtopicName: "Oxidation, Reduction and Catalysts",
  title: "Oxidation, Reduction and Catalysts",
  oneLineDefinition:
    "Oxidation is gain of oxygen or loss of hydrogen, reduction the reverse, and the two always happen together in a redox reaction; a catalyst changes the speed of a reaction without being used up.",
  whyItMatters:
    "Eight questions in the bank, two EASY, four MODERATE and two HARD. Three ask what oxidation and reduction are, including why old book pages turn yellow and which reaction is not an oxidation; three ask which substance is oxidised or reduced, or which is the oxidising or reducing agent; two are about catalysts.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9crre-oxidation",
      name: "Oxidation and reduction",
      intuition:
        "Oxidation began as the name for anything joining with oxygen, like iron rusting or coal burning. Taking hydrogen away has the same effect, so it counts as oxidation too. Reduction is the opposite: losing oxygen or gaining hydrogen. When one substance takes oxygen from another, one is oxidised and the other reduced at the same moment.",
      definition:
        "- **Oxidation**: **gain of oxygen** or **loss of hydrogen** (in higher classes, also loss of electrons).\n" +
        "- **Reduction**: **loss of oxygen** or **gain of hydrogen** (also gain of electrons).\n" +
        "- **Redox reaction**: oxidation and reduction happen **together**.\n" +
        "- **Everyday oxidation**: rusting of iron, burning of fuels, oils and fats in food turning stale and smelly (**rancidity**), cut fruit turning brown, and the **pages of old books turning yellow** as the paper reacts slowly with air.\n" +
        "- A substance that only **breaks up**, such as ozone splitting into oxygen, is decomposed, not oxidised.",
      table: {
        columns: ["What happens to the substance", "Oxidation", "Reduction"],
        rows: [
          { cells: ["Oxygen", "Gained", "Lost"] },
          { cells: ["Hydrogen", "Lost", "Gained"] },
          { cells: ["Electrons", "Lost", "Gained"] },
          { cells: ["Example", "\\(\\mathrm{2Cu + O_2 \\rightarrow 2CuO}\\): copper is oxidised", "\\(\\mathrm{CuO + C \\rightarrow Cu + CO}\\): copper oxide is reduced"] },
        ],
        caption: "Each row of reduction is the exact reverse of oxidation.",
      },
      selfCheckExample: {
        prompt: "In the reaction \\(\\mathrm{2Mg + O_2 \\rightarrow 2MgO}\\), is magnesium oxidised or reduced?",
        steps: ["Magnesium gains oxygen to become magnesium oxide.", "Gain of oxygen is oxidation."],
        answer: "Oxidised",
      },
      practiceSet: [
        { prompt: "What is the spoiling of oils and fats in food by oxidation called?", answer: "Rancidity" },
        { prompt: "Is the addition of hydrogen to a substance oxidation or reduction?", answer: "Reduction" },
        { prompt: "A copper wire heated in air turns black. Is the copper oxidised or reduced?", answer: "Oxidised: it combines with oxygen to form black copper oxide" },
        { prompt: "What do we call a reaction in which oxidation and reduction take place together?", answer: "A redox reaction" },
      ],
      pyqExampleId: "093e4126-ee1f-44c7-9621-f41b318af6e1",
      traps: [
        {
          title: "Calling gain of hydrogen oxidation",
          body: "Gaining hydrogen is reduction. Oxidation is gaining oxygen or losing hydrogen.",
        },
        {
          title: "Calling every reaction with oxygen in it an oxidation",
          body: "When ozone breaks into oxygen, nothing gains oxygen or loses hydrogen: it is a decomposition.",
        },
        {
          title: "Calling the yellowing of old paper a decomposition",
          body: "Old pages turn yellow because the paper reacts slowly with the oxygen of the air: it is oxidation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9crre-agents",
      name: "Oxidising and reducing agents",
      intuition:
        "Think of the agent as the giver or taker. The substance that hands over its oxygen makes the other one oxidised, so it is the oxidising agent, and it is itself reduced. The substance that takes the oxygen is the reducing agent, and it is itself oxidised. The agent always undergoes the opposite change to its name.",
      definition:
        "- **Oxidising agent**: gives oxygen or removes hydrogen. It is itself **reduced**.\n" +
        "- **Reducing agent**: removes oxygen or gives hydrogen. It is itself **oxidised**.\n" +
        "- **Method**: for each reactant, see whether it gains or loses oxygen or hydrogen. The one oxidised is the reducing agent; the one reduced is the oxidising agent.\n" +
        "- Common reducing agents: **hydrogen, carbon (coke), carbon monoxide** and reactive metals such as magnesium. Common oxidising agents: **oxygen** and metal oxides that give up oxygen.",
      authoredExample: {
        prompt: "In \\(\\mathrm{ZnO + C \\rightarrow Zn + CO}\\), name the substance oxidised, the substance reduced, the oxidising agent and the reducing agent.",
        steps: [
          "Carbon gains oxygen to become CO, so carbon is oxidised.",
          "Zinc oxide loses oxygen to become zinc, so zinc oxide is reduced.",
          "Zinc oxide gives the oxygen, so it is the oxidising agent.",
          "Carbon takes the oxygen, so it is the reducing agent.",
        ],
        answer: "Carbon is oxidised and is the reducing agent; zinc oxide is reduced and is the oxidising agent.",
      },
      selfCheckExample: {
        prompt: "In \\(\\mathrm{H_2S + Cl_2 \\rightarrow 2HCl + S}\\), which substance is oxidised and which is reduced?",
        steps: [
          "Hydrogen sulphide loses hydrogen and becomes sulphur: oxidation.",
          "Chlorine gains hydrogen and becomes HCl: reduction.",
        ],
        answer: "\\(\\mathrm{H_2S}\\) is oxidised and \\(\\mathrm{Cl_2}\\) is reduced.",
      },
      practiceSet: [
        { prompt: "In \\(\\mathrm{Fe_2O_3 + 3CO \\rightarrow 2Fe + 3CO_2}\\), which substance is the reducing agent?", answer: "Carbon monoxide, CO: it takes oxygen and is oxidised" },
        { prompt: "Is an oxidising agent itself oxidised or reduced in a reaction?", answer: "Reduced" },
        { prompt: "In \\(\\mathrm{2PbO + C \\rightarrow 2Pb + CO_2}\\), which substance is reduced?", answer: "Lead oxide, PbO" },
        { prompt: "Name a substance often used as a reducing agent to get a metal from its oxide.", answer: "Carbon (coke), hydrogen or carbon monoxide" },
      ],
      pyqExampleId: "8a088f1f-f975-4ab1-b600-3d8a2dd16f0f",
      traps: [
        {
          title: "Thinking the oxidising agent is the substance oxidised",
          body: "It is the reverse: the oxidising agent causes oxidation in the other substance and is itself reduced.",
        },
        {
          title: "Looking for only one change in a redox reaction",
          body: "If one substance is oxidised, another must be reduced in the same reaction. A correct answer names both.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9crre-catalyst",
      name: "Catalysts and the rate of reaction",
      intuition:
        "A catalyst is like a shortcut over a hill: the reactants reach the same place, only sooner. It joins in along the way but comes out unchanged at the end, so a small amount can be used again and again. It cannot make a reaction happen that would not happen at all.",
      definition:
        "- A **catalyst** changes the **rate** of a reaction (usually speeds it up) and is itself **unchanged** in mass and chemical nature at the end.\n" +
        "- It **cannot start** a reaction that would not take place on its own, and it does **not change** how much product forms (the equilibrium).\n" +
        "- Catalysts are often **specific**: one catalyst works for one reaction.\n" +
        "- **Enzymes** are the catalysts of living things.\n" +
        "- The rate of a reaction also rises with **temperature**, with **concentration**, and with **surface area** (a powder reacts faster than a lump).",
      table: {
        columns: ["Catalyst", "Reaction it speeds up"],
        rows: [
          { cells: ["Iron", "Making ammonia from nitrogen and hydrogen (Haber process)"] },
          { cells: ["Nickel (Raney nickel)", "Adding hydrogen to vegetable oils to make vanaspati ghee"] },
          { cells: ["Manganese dioxide", "Releasing oxygen from potassium chlorate or hydrogen peroxide"] },
          { cells: ["Vanadium pentoxide", "Making sulphuric acid (contact process)"] },
          { cells: ["Enzymes", "Digestion and other reactions in living things"] },
        ],
        caption: "An odd-one-out on catalysts hides one substance that is not used as a catalyst.",
      },
      selfCheckExample: {
        prompt: "A little manganese dioxide is mixed with hydrogen peroxide, and oxygen bubbles off quickly. What is the mass of manganese dioxide left when the reaction is over?",
        steps: ["Manganese dioxide is a catalyst here.", "A catalyst is not used up."],
        answer: "The same mass as was added",
      },
      practiceSet: [
        { prompt: "What are the catalysts in living things called?", answer: "Enzymes" },
        { prompt: "Can a catalyst start a reaction that would not take place at all?", answer: "No: it only changes the rate of a reaction that can already take place" },
        { prompt: "Why does powdered chalk react faster with dilute acid than a lump of chalk of the same mass?", answer: "The powder has a much larger surface area in contact with the acid" },
        { prompt: "Does a catalyst change the amount of product formed in a reaction?", answer: "No: it changes only how fast the product forms" },
      ],
      pyqExampleId: "b1d47701-8afe-4d41-bbd4-cd235196c560",
      traps: [
        {
          title: "Saying a catalyst starts a reaction",
          body: "A catalyst only speeds up or slows down a reaction that can already happen. It cannot begin one that would not occur.",
        },
        {
          title: "Thinking a catalyst is used up",
          body: "At the end of the reaction the catalyst has the same mass and chemical nature as at the start.",
        },
      ],
    },
  ],
};
