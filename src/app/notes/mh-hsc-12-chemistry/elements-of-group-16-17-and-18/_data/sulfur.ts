import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GP_SULFUR_NOTE: SubtopicNote = {
  subtopicName: "Compounds of Sulfur",
  title: "Sulfur Dioxide and Sulfuric Acid",
  oneLineDefinition:
    "The preparation, properties, structure and uses of sulfur dioxide, the manufacture of sulfuric acid by the contact process, and the acidic, oxidising and dehydrating reactions of sulfuric acid.",
  whyItMatters:
    "12 questions. Three were set in board papers: the reactions of the lead chamber process for sulfuric acid (2019), the preparation of sulfur dioxide from sulfur with uses of sulfur (2022), and the formula of Epsom salt with uses of sulfuric acid (2026). The textbook adds the contact process, the laboratory preparation, properties and structure of SO₂, and the oxidising and dehydrating action of concentrated sulfuric acid.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccgp-so2",
      name: "Sulfur dioxide",
      intuition:
        "Sulfur in SO₂ is at +4, halfway between its −2 and its highest +6. So when it meets something eager for electrons, such as chlorine, iodine or permanganate, it gives up electrons and goes to +6: it is a reducing agent, as long as water is present. Its bent shape comes from the lone pair left on the sulfur.",
      definition:
        "- **Preparation:** burning sulfur in air; in the laboratory, from sodium sulfite and dilute sulfuric acid; industrially, by roasting sulfide ores such as \\(2\\text{ZnS} + 3\\text{O}_2 \\longrightarrow 2\\text{ZnO} + 2\\text{SO}_2\\).\n" +
        "- **Physical properties:** colourless gas with a pungent smell; poisonous; highly soluble in water, the solution being sulfurous acid; liquefies at room temperature under 2 atm and boils at 263 K.\n" +
        "- **Chemical properties:** with chlorine over charcoal it gives sulfuryl chloride, \\(\\text{SO}_2 + \\text{Cl}_2 \\xrightarrow{\\text{charcoal}} \\text{SO}_2\\text{Cl}_2\\); with oxygen over \\(\\text{V}_2\\text{O}_5\\) it gives \\(\\text{SO}_3\\); with sodium hydroxide, \\(2\\text{NaOH} + \\text{SO}_2 \\longrightarrow \\text{Na}_2\\text{SO}_3 + \\text{H}_2\\text{O}\\); with sodium sulfite solution, \\(\\text{Na}_2\\text{SO}_3 + \\text{H}_2\\text{O} + \\text{SO}_2 \\longrightarrow 2\\text{NaHSO}_3\\).\n" +
        "- **Reducing agent (when moist):** reduces ferric salts to ferrous, decolourises acidified potassium permanganate, and reduces halogens to halogen acids.\n" +
        "- **Structure:** angular, O-S-O angle 119.5°; the S=O double bond arises from \\(d\\pi-p\\pi\\) bonding; a resonance hybrid of two canonical forms.\n" +
        "- **Uses:** refining petroleum and sugar; bleaching wool and silk; as an anti-chlor and disinfectant; as a preservative; in making \\(\\text{H}_2\\text{SO}_4\\) and \\(\\text{NaHSO}_3\\); liquid \\(\\text{SO}_2\\) as a solvent.",
      formula: {
        label: "Laboratory preparation of sulfur dioxide",
        latex: "\\text{Na}_2\\text{SO}_3 + \\text{H}_2\\text{SO}_4 \\longrightarrow \\text{Na}_2\\text{SO}_4 + \\text{H}_2\\text{O} + \\text{SO}_2",
      },
      authoredExample: {
        prompt: "Show with a balanced equation that moist sulfur dioxide acts as a reducing agent towards iodine.",
        steps: [
          "Moist \\(\\text{SO}_2\\) reduces a halogen to its halogen acid and is itself oxidised to sulfuric acid.",
          "\\(\\text{I}_2 + \\text{SO}_2 + 2\\text{H}_2\\text{O} \\longrightarrow \\text{H}_2\\text{SO}_4 + 2\\text{HI}\\).",
          "Check: 2 I, 1 S, 4 H and 4 O on each side.",
          "Sulfur goes from \\(+4\\) to \\(+6\\) (oxidised) while iodine goes from 0 to \\(-1\\) (reduced), so \\(\\text{SO}_2\\) is the reducing agent.",
        ],
        answer: "I₂ + SO₂ + 2H₂O → H₂SO₄ + 2HI; SO₂ is oxidised, so it is the reducing agent",
      },
      selfCheckExample: {
        prompt: "What is formed when sulfur dioxide reacts with chlorine in the presence of charcoal?",
        steps: ["\\(\\text{SO}_2 + \\text{Cl}_2 \\xrightarrow{\\text{charcoal}} \\text{SO}_2\\text{Cl}_2\\).", "Charcoal is the catalyst."],
        answer: "Sulfuryl chloride, SO₂Cl₂",
      },
      practiceSet: [
        { prompt: "What is the O-S-O bond angle in sulfur dioxide?", answer: "119.5°" },
        { prompt: "What name is given to a solution of SO₂ in water?", answer: "Sulfurous acid" },
        { prompt: "Write the reaction of sulfur dioxide with sodium hydroxide solution.", answer: "\\(2\\text{NaOH} + \\text{SO}_2 \\longrightarrow \\text{Na}_2\\text{SO}_3 + \\text{H}_2\\text{O}\\)" },
        { prompt: "At what temperature does liquid SO₂ boil?", answer: "263 K" },
      ],
      pyqExampleId: "6cdc8536-6f04-4b18-893b-7487241d7485",
      traps: [
        {
          title: "Reducing only when moist",
          body: "Sulfur dioxide reduces ferric salts, permanganate and halogens in the presence of water. Leave water out of the equation and it does not balance.",
        },
        {
          title: "Uses of sulfur against uses of SO₂",
          body: "Board 2022 asked for uses of sulfur and 2026 for uses of \\(\\text{SO}_2\\). Read which one is named; the lists are different.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgp-contact-process",
      name: "Manufacture of sulfuric acid",
      intuition:
        "Sulfuric acid is made in three moves: burn sulfur to SO₂, push SO₂ up to SO₃ over a catalyst, and turn SO₃ into acid. The middle step is reversible and gives out heat, and three gas molecules become two, so a lower temperature and a higher pressure push it forward. The SO₃ is dissolved in sulfuric acid first, making oleum, which is then diluted.",
      definition:
        "- **Contact process, step 1:** burn sulfur or roast iron pyrites in air: \\(\\text{S} + \\text{O}_2 \\longrightarrow \\text{SO}_2\\) and \\(4\\text{FeS}_2 + 11\\text{O}_2 \\longrightarrow 2\\text{Fe}_2\\text{O}_3 + 8\\text{SO}_2\\).\n" +
        "- **Step 2:** catalytic oxidation, \\(2\\text{SO}_2 + \\text{O}_2 \\xrightarrow{\\text{V}_2\\text{O}_5} 2\\text{SO}_3\\). The reaction is exothermic and reversible and the volume decreases, so a low temperature (720 K) and a high pressure (2 bar) give the maximum yield.\n" +
        "- **Step 3:** \\(\\text{SO}_3\\) is absorbed in concentrated sulfuric acid to give oleum, \\(\\text{SO}_3 + \\text{H}_2\\text{SO}_4 \\longrightarrow \\text{H}_2\\text{S}_2\\text{O}_7\\); oleum is diluted with water, \\(\\text{H}_2\\text{S}_2\\text{O}_7 + \\text{H}_2\\text{O} \\longrightarrow 2\\text{H}_2\\text{SO}_4\\). The acid is 96 to 98 % pure.\n" +
        "- **Lead chamber process:** board 2019 asked its reactions, but the present textbook teaches only the contact process, so give it less time. Its idea: nitric oxide is oxidised by air, \\(2\\text{NO} + \\text{O}_2 \\longrightarrow 2\\text{NO}_2\\), and nitrogen dioxide oxidises sulfur dioxide in the presence of water, \\(\\text{SO}_2 + \\text{NO}_2 + \\text{H}_2\\text{O} \\longrightarrow \\text{H}_2\\text{SO}_4 + \\text{NO}\\), the nitric oxide being used again.",
      formula: {
        label: "The key step of the contact process",
        latex: "2\\text{SO}_2 + \\text{O}_2 \\xrightarrow{\\text{V}_2\\text{O}_5,\\ 720\\ \\text{K},\\ 2\\ \\text{bar}} 2\\text{SO}_3",
      },
      authoredExample: {
        prompt: "Explain why a low temperature and a high pressure favour the oxidation of SO₂ to SO₃ in the contact process.",
        steps: [
          "Reaction: \\(2\\text{SO}_2 + \\text{O}_2 \\xrightarrow{\\text{V}_2\\text{O}_5} 2\\text{SO}_3\\), reversible.",
          "It is exothermic, so by Le Chatelier's principle a lower temperature shifts the equilibrium forward; 720 K is used.",
          "Three molecules of gas give two, so the volume decreases; a higher pressure shifts the equilibrium forward; 2 bar is used.",
          "\\(\\text{V}_2\\text{O}_5\\) is the catalyst that makes the reaction fast enough at this temperature.",
        ],
        answer: "Exothermic, so low temperature (720 K); fewer gas molecules, so high pressure (2 bar); V₂O₅ as catalyst",
      },
      selfCheckExample: {
        prompt: "What is oleum, and how is it turned into sulfuric acid?",
        steps: ["\\(\\text{SO}_3 + \\text{H}_2\\text{SO}_4 \\longrightarrow \\text{H}_2\\text{S}_2\\text{O}_7\\) (oleum).", "\\(\\text{H}_2\\text{S}_2\\text{O}_7 + \\text{H}_2\\text{O} \\longrightarrow 2\\text{H}_2\\text{SO}_4\\)."],
        answer: "Oleum is H₂S₂O₇, pyrosulfuric acid; diluting it with water gives sulfuric acid",
      },
      practiceSet: [
        { prompt: "Name the catalyst used in the contact process.", answer: "Vanadium pentoxide, \\(\\text{V}_2\\text{O}_5\\)" },
        { prompt: "Write the equation for roasting iron pyrites.", answer: "\\(4\\text{FeS}_2 + 11\\text{O}_2 \\longrightarrow 2\\text{Fe}_2\\text{O}_3 + 8\\text{SO}_2\\)" },
        { prompt: "How pure is the sulfuric acid made by the contact process?", answer: "96 to 98 % pure" },
      ],
      pyqExampleId: "c5ad8bb5-79e8-4367-8d22-7f5cb2f1eefe",
      traps: [
        {
          title: "Le Chatelier needs both reasons",
          body: "Low temperature because the reaction is exothermic; high pressure because the number of gas molecules falls. Give both reasons, not just the conditions.",
        },
        {
          title: "Catalyst over the arrow",
          body: "Write \\(\\text{V}_2\\text{O}_5\\) over the arrow of the second step. An equation without its catalyst loses the condition mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgp-h2so4-reactions",
      name: "Reactions of sulfuric acid",
      intuition:
        "Sulfuric acid wears three hats. In water it is a strong acid. Hot and concentrated, its sulfur at +6 pulls electrons from copper, carbon or even sulfur and drops to SO₂. And it grabs water so fiercely that it pulls the hydrogen and oxygen out of sugar as water, leaving black carbon.",
      definition:
        "- **Acid:** it ionises in two steps, \\(\\text{H}_2\\text{SO}_4 + \\text{H}_2\\text{O} \\longrightarrow \\text{H}_3\\text{O}^+ + \\text{HSO}_4^-\\) with \\(K_a > 10\\), then \\(\\text{HSO}_4^-\\) with \\(K_a = 1.2 \\times 10^{-2}\\). It is a strong acid.\n" +
        "- **Oxidising agent (hot, concentrated):** it oxidises metals and non-metals and is reduced to \\(\\text{SO}_2\\): \\(\\text{Cu} + 2\\text{H}_2\\text{SO}_4 \\longrightarrow \\text{CuSO}_4 + \\text{SO}_2 + 2\\text{H}_2\\text{O}\\); \\(\\text{C} + 2\\text{H}_2\\text{SO}_4 \\longrightarrow \\text{CO}_2 + 2\\text{SO}_2 + 2\\text{H}_2\\text{O}\\). It also oxidises HBr to bromine and HI to iodine. Dilute cold acid behaves like HCl and attacks only metals above hydrogen.\n" +
        "- **Dehydrating agent:** \\(\\text{C}_{12}\\text{H}_{22}\\text{O}_{11} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4} 12\\text{C} + 11\\text{H}_2\\text{O}\\). The carbon left is sugar charcoal; the process is charring.\n" +
        "- **With salts of more volatile acids:** it sets the volatile acid free: \\(\\text{NaCl} + \\text{H}_2\\text{SO}_4 \\longrightarrow \\text{NaHSO}_4 + \\text{HCl}\\).",
      formula: {
        label: "Concentrated sulfuric acid as an oxidising agent",
        latex: "\\text{H}_2\\text{SO}_4\\ (\\text{S} = +6) \\longrightarrow \\text{SO}_2\\ (\\text{S} = +4)",
      },
      authoredExample: {
        prompt: "What is the action of concentrated sulfuric acid on (a) potassium nitrate and (b) calcium fluoride? Write balanced equations.",
        steps: [
          "Concentrated sulfuric acid decomposes the salts of more volatile acids and sets those acids free.",
          "(a) \\(\\text{KNO}_3 + \\text{H}_2\\text{SO}_4 \\longrightarrow \\text{KHSO}_4 + \\text{HNO}_3\\): nitric acid is set free.",
          "(b) \\(\\text{CaF}_2 + \\text{H}_2\\text{SO}_4 \\longrightarrow \\text{CaSO}_4 + 2\\text{HF}\\): hydrogen fluoride is set free.",
          "Check (b): 1 Ca, 2 F, 2 H, 1 S and 4 O on each side.",
        ],
        answer: "Nitric acid from KNO₃ and hydrogen fluoride from CaF₂",
      },
      selfCheckExample: {
        prompt: "What does dilute, cold sulfuric acid do to iron? Write the ionic equation.",
        steps: ["Dilute acid at room temperature behaves like HCl and attacks a metal above hydrogen, giving hydrogen gas.", "\\(\\text{Fe} + 2\\text{H}^+ \\longrightarrow \\text{Fe}^{2+} + \\text{H}_2\\)."],
        answer: "Iron dissolves and hydrogen is given off: Fe + 2H⁺ → Fe²⁺ + H₂",
      },
      practiceSet: [
        { prompt: "What name is given to the carbon left when concentrated sulfuric acid acts on sugar?", answer: "Sugar charcoal" },
        { prompt: "Can sulfuric acid act as a reducing agent?", answer: "No. Its sulfur is already at +6, its highest state" },
        { prompt: "Which metals does dilute, cold sulfuric acid attack?", answer: "Only metals above hydrogen in the e.m.f. series" },
        { prompt: "Give the first acid dissociation constant of sulfuric acid.", answer: "\\(K_a > 10\\)" },
      ],
      pyqExampleId: "c3fbeaa6-9b15-4294-b0b5-537aa5fba821",
      traps: [
        {
          title: "Hydrogen from copper",
          body: "Copper does not give hydrogen with sulfuric acid. Hot, concentrated acid oxidises it and gives \\(\\text{SO}_2\\); dilute acid does not attack it at all.",
        },
        {
          title: "Concentration and temperature matter",
          body: "The oxidising reactions need hot, concentrated acid. Write '(conc.)' with the formula, or the reaction is wrong as stated.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgp-h2so4-uses",
      name: "Physical properties and uses of sulfuric acid",
      intuition:
        "Sulfuric acid is the workhorse of the chemical industry: fertilisers, paints, batteries and metal cleaning all use it. It is also dangerous to handle, because mixing it with water releases a great deal of heat.",
      definition:
        "- **Physical properties:** colourless, dense, oily liquid; density 1.84 g/cm³ at 298 K; freezes at 283 K and boils at 611 K; highly corrosive, causing severe burns.\n" +
        "- **Dilution:** it dissolves in water with a large release of heat, so the concentrated acid is added slowly **to water**, with constant stirring, the beaker kept in a water bath.\n" +
        "- **Epsom salt**, a sulfate ore of magnesium, is \\(\\text{MgSO}_4 \\cdot 7\\text{H}_2\\text{O}\\); gypsum is \\(\\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O}\\).",
      table: {
        columns: ["Use", "Example"],
        rows: [
          {
            cells: ["Manufacture of fertilisers", "Ammonium sulfate and superphosphate"],
            pyqExampleId: "a75cded2-5ab6-4f31-be87-6d72f41786cb",
            noteAmber: "Board 2026 asked two uses of sulfuric acid, with the formula of Epsom salt.",
          },
          { cells: ["Pigments, paints and dyes", "Dyestuff intermediates"] },
          { cells: ["Petroleum refining and detergents", "Used in both industries"] },
          { cells: ["Metallurgy", "Cleaning metals before electroplating and galvanising"] },
          { cells: ["Storage batteries", "Used in storage batteries"] },
          { cells: ["Laboratory", "A common laboratory reagent; making nitrocellulose products"] },
        ],
      },
      practiceSet: [
        { prompt: "Why must concentrated sulfuric acid be added to water, and not water to the acid?", answer: "Dissolving releases a large amount of heat; adding the acid slowly to water with stirring keeps it under control" },
        { prompt: "Give the density of sulfuric acid at 298 K.", answer: "1.84 g/cm³" },
        { prompt: "Name two fertilisers made with the help of sulfuric acid.", answer: "Ammonium sulfate and superphosphate" },
      ],
      pyqExampleId: "a75cded2-5ab6-4f31-be87-6d72f41786cb",
      traps: [
        {
          title: "Vague uses",
          body: "'Used in industry' earns nothing. Name the product or the process: fertilisers such as ammonium sulfate, storage batteries, petroleum refining.",
        },
        {
          title: "Water into acid",
          body: "Pouring water into the concentrated acid releases so much heat at once that the mixture can spurt. Always add the acid to water.",
        },
      ],
    },
  ],
};
