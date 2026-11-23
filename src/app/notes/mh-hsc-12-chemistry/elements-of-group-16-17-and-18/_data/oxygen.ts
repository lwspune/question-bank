import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GP_OXYGEN_NOTE: SubtopicNote = {
  subtopicName: "Oxygen and Compounds of Oxygen",
  title: "Dioxygen, Oxides and Ozone",
  oneLineDefinition:
    "How dioxygen is prepared and why it is paramagnetic, the four kinds of simple oxides, and the preparation, reactions, structure, uses and depletion of ozone.",
  whyItMatters:
    "13 questions. Five were set in board papers: the action of ozone on hydrogen peroxide (2018), why the bleaching by ozone is called a dry bleach (2023), the laboratory preparation of dioxygen from KClO₃ (2024), which gas depletes the ozone layer (2025), and why ozone is a good bleaching agent, with two uses of SO₂ (2026). The textbook adds the paramagnetism of dioxygen, the structure and uses of ozone, and its reactions with lead sulfide and nitric oxide.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccgp-dioxygen",
      name: "Dioxygen: preparation, properties and oxides",
      intuition:
        "Many compounds hold oxygen loosely and give it up when heated: chlorates, some metal oxides, hydrogen peroxide. A catalyst such as manganese dioxide makes this happen at a lower temperature without being used up. Dioxygen itself is a surprise: it has an even number of electrons, yet two of them stay unpaired, so a magnet attracts it.",
      definition:
        "- **Laboratory methods:** heating oxygen-containing salts (chlorates, nitrates, permanganates); thermal decomposition of metal oxides such as \\(2\\text{HgO} \\longrightarrow 2\\text{Hg} + \\text{O}_2\\) and \\(2\\text{PbO}_2 \\longrightarrow 2\\text{PbO} + \\text{O}_2\\); decomposition of hydrogen peroxide with manganese dioxide or finely divided metals.\n" +
        "- **Large scale:** electrolysis of water (oxygen at the anode), or liquefying air after removing carbon dioxide and water vapour and then fractionally distilling it.\n" +
        "- **Properties:** colourless, odourless gas; sparingly soluble (30.8 cm³ in 1000 cm³ of water at 293 K), enough for aquatic life; liquefies at 90 K, freezes at 55 K; three isotopes \\(^{16}\\text{O}\\), \\(^{17}\\text{O}\\), \\(^{18}\\text{O}\\); paramagnetic.\n" +
        "- **Paramagnetism:** in molecular orbital terms \\(\\text{O}_2\\) has one electron in each of \\(\\pi^*(2p_x)\\) and \\(\\pi^*(2p_y)\\), two unpaired electrons.\n" +
        "- **Reactions:** with almost all metals except Au and Pt (\\(2\\text{Ca} + \\text{O}_2 \\longrightarrow 2\\text{CaO}\\)), with non-metals (\\(\\text{P}_4 + 5\\text{O}_2 \\longrightarrow \\text{P}_4\\text{O}_{10}\\)), and with compounds (\\(\\text{CH}_4 + 2\\text{O}_2 \\longrightarrow \\text{CO}_2 + 2\\text{H}_2\\text{O}\\)).\n" +
        "- **Uses:** respiration; manufacture of steel; oxyacetylene flame for welding and cutting; cylinders in hospitals, high-altitude flying and mountaineering; burning rocket fuel such as hydrazine.\n" +
        "- **Simple oxides:** acidic (\\(\\text{SO}_2\\), \\(\\text{CO}_2\\); give acids with water), basic (\\(\\text{CaO}\\), \\(\\text{Na}_2\\text{O}\\); give bases), amphoteric (\\(\\text{Al}_2\\text{O}_3\\); reacts with both acid and base), neutral (\\(\\text{CO}\\), \\(\\text{NO}\\), \\(\\text{N}_2\\text{O}\\)).",
      formula: {
        label: "Decomposing a peroxide or oxide to dioxygen",
        latex: "2\\text{H}_2\\text{O}_2 \\xrightarrow{\\text{MnO}_2} 2\\text{H}_2\\text{O} + \\text{O}_2",
      },
      authoredExample: {
        prompt: "Write balanced equations for the preparation of dioxygen (a) by heating mercury(II) oxide and (b) by decomposing hydrogen peroxide with manganese dioxide.",
        steps: [
          "(a) Thermal decomposition of the oxide: \\(2\\text{HgO} \\xrightarrow{\\text{heat}} 2\\text{Hg} + \\text{O}_2\\). Check: 2 Hg and 2 O on each side.",
          "(b) \\(\\text{MnO}_2\\) is the catalyst, so it goes over the arrow: \\(2\\text{H}_2\\text{O}_2 \\xrightarrow{\\text{MnO}_2} 2\\text{H}_2\\text{O} + \\text{O}_2\\). Check: 4 H and 4 O on each side.",
        ],
        answer: "2HgO → 2Hg + O₂ on heating; 2H₂O₂ → 2H₂O + O₂ with MnO₂ as catalyst",
      },
      selfCheckExample: {
        prompt: "Write the balanced equation for the thermal decomposition of silver oxide.",
        steps: ["\\(2\\text{Ag}_2\\text{O} \\xrightarrow{\\text{heat}} 4\\text{Ag} + \\text{O}_2\\).", "Check: 4 Ag and 2 O on each side."],
        answer: "2Ag₂O → 4Ag + O₂",
      },
      practiceSet: [
        { prompt: "How many unpaired electrons does an O₂ molecule have, and in which orbitals?", answer: "Two, one in each of \\(\\pi^*(2p_x)\\) and \\(\\pi^*(2p_y)\\)" },
        { prompt: "Classify CO as an acidic, basic, amphoteric or neutral oxide.", answer: "Neutral" },
        { prompt: "Name two metals that dioxygen does not attack directly.", answer: "Gold and platinum" },
        { prompt: "How is dioxygen obtained from air on a large scale?", answer: "Air freed of carbon dioxide and water vapour is liquefied and fractionally distilled" },
      ],
      pyqExampleId: "9735d885-17b7-4754-b4a9-a6682a22b095",
      traps: [
        {
          title: "The catalyst goes over the arrow",
          body: "Manganese dioxide is not used up. Write it over the arrow with 'heat', not among the reactants.",
        },
        {
          title: "Even electrons, still paramagnetic",
          body: "\\(\\text{O}_2\\) has sixteen electrons, an even number, yet two are unpaired. Explain it with the molecular orbital configuration, not with the electron dot structure, which shows every electron paired.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgp-ozone-chemistry",
      name: "Ozone: preparation and reactions",
      intuition:
        "Ozone is oxygen with one atom too many. That extra atom breaks off easily as nascent oxygen, [O], which is far more reactive than O₂. So ozone oxidises, it bleaches, and it can even blow apart when concentrated. Only with peroxides, which hold spare oxygen themselves, does it act as a reducing agent.",
      definition:
        "- **Preparation:** a silent electric discharge through pure, dry oxygen in an ozoniser. \\(3\\text{O}_2 \\longrightarrow 2\\text{O}_3\\), \\(\\Delta H = +142\\) kJ/mol, endothermic. Only about 10 % is converted, so the product is called ozonised oxygen.\n" +
        "- **Physical properties:** pale blue gas, dark blue liquid, violet-black solid; characteristic smell; diamagnetic; above 100 ppm it causes nausea and headache.\n" +
        "- **Oxidising agent:** \\(\\text{O}_3 \\longrightarrow \\text{O}_2 + [\\text{O}]\\). It oxidises lead sulfide to lead sulfate (\\(\\text{PbS} + 4\\text{O}_3 \\longrightarrow \\text{PbSO}_4 + 4\\text{O}_2\\)), iodide to iodine and nitric oxide to nitrogen dioxide.\n" +
        "- **Bleaching:** coloured matter \\(+ [\\text{O}] \\longrightarrow\\) colourless matter. No moisture is needed, so it is called a **dry bleach**.\n" +
        "- **Reducing agent:** it reduces peroxides to oxides: \\(\\text{H}_2\\text{O}_2 + \\text{O}_3 \\longrightarrow \\text{H}_2\\text{O} + 2\\text{O}_2\\) and \\(\\text{BaO}_2 + \\text{O}_3 \\longrightarrow \\text{BaO} + 2\\text{O}_2\\).\n" +
        "- **Explosive when concentrated:** its decomposition to \\(\\text{O}_2\\) is exothermic (\\(\\Delta H\\) negative) with an increase in entropy (\\(\\Delta S\\) positive), so \\(\\Delta G\\) is large and negative.",
      formula: {
        label: "Ozone gives nascent oxygen",
        latex: "\\text{O}_3 \\longrightarrow \\text{O}_2 + [\\text{O}]",
      },
      authoredExample: {
        prompt: "What happens when ozone is passed through a solution of potassium iodide? Write the balanced equation and state the role of ozone.",
        steps: [
          "Ozone gives nascent oxygen, which oxidises iodide ions to iodine.",
          "\\(2\\text{KI} + \\text{H}_2\\text{O} + \\text{O}_3 \\longrightarrow 2\\text{KOH} + \\text{I}_2 + \\text{O}_2\\).",
          "Check: 2 K, 2 I, 2 H and 4 O on each side.",
          "Iodine is set free, so ozone has acted as an oxidising agent.",
        ],
        answer: "Iodine is liberated (2KI + H₂O + O₃ → 2KOH + I₂ + O₂); ozone is the oxidising agent",
      },
      selfCheckExample: {
        prompt: "Write the equation for the action of ozone on barium peroxide, and say whether ozone acts as an oxidising or a reducing agent.",
        steps: ["\\(\\text{BaO}_2 + \\text{O}_3 \\longrightarrow \\text{BaO} + 2\\text{O}_2\\).", "The peroxide loses oxygen and is reduced, so ozone is the reducing agent."],
        answer: "BaO₂ + O₃ → BaO + 2O₂; ozone is the reducing agent",
      },
      practiceSet: [
        { prompt: "What is ozonised oxygen?", answer: "Oxygen containing about 10 % ozone, as it leaves the ozoniser" },
        { prompt: "Is the conversion of oxygen into ozone exothermic or endothermic?", answer: "Endothermic, \\(\\Delta H = +142\\) kJ/mol" },
        { prompt: "Write the reaction of ozone with lead sulfide.", answer: "\\(\\text{PbS} + 4\\text{O}_3 \\longrightarrow \\text{PbSO}_4 + 4\\text{O}_2\\)" },
        { prompt: "Why can a high concentration of ozone explode?", answer: "Its decomposition releases heat and increases entropy, so \\(\\Delta G\\) is large and negative" },
      ],
      pyqExampleId: "2f9571cb-9a74-46f8-b538-19e3e36e7d92",
      traps: [
        {
          title: "Ozone as a reducing agent",
          body: "Ozone reduces only peroxides, such as hydrogen peroxide and barium peroxide. With everything else in this chapter it is an oxidising agent.",
        },
        {
          title: "Dry bleach against moist bleach",
          body: "Ozone bleaches without moisture. Chlorine bleaches only in the presence of moisture. Mixing the two reasons is a common slip.",
        },
        {
          title: "Name the nascent oxygen",
          body: "The bleaching and oxidising both come from nascent oxygen, [O]. An answer that says only 'ozone is reactive' gives no reason.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgp-ozone-layer",
      name: "Ozone: structure, uses and the ozone layer",
      intuition:
        "High in the atmosphere, ultraviolet light splits O₂ into atoms, and the atoms join O₂ to make O₃. This ozone layer absorbs harmful ultraviolet light, like an umbrella over the earth. Nitric oxide from jet exhausts and chlorofluorocarbons from aerosols destroy ozone faster than it forms, and the umbrella thins.",
      definition:
        "- **Formation:** \\(\\text{O}_2 \\xrightarrow{\\text{UV light}} \\text{O} + \\text{O}\\), then \\(\\text{O}_2 + \\text{O} \\longrightarrow \\text{O}_3\\).\n" +
        "- **Ozone depletion** is the thinning of the ozone layer. It is caused by nitric oxide from the exhausts of cars and supersonic jet aeroplanes, \\(\\text{NO} + \\text{O}_3 \\longrightarrow \\text{NO}_2 + \\text{O}_2\\), and by chlorofluorocarbons (freons) from aerosols and refrigerators. It is worst over the polar regions, especially Antarctica.\n" +
        "- More ultraviolet light then reaches the earth, raising skin cancer, eye cataracts and genetic and immune damage.\n" +
        "- **Structure:** angular; both O-O bonds are 128 pm and the bond angle is about 117°; a resonance hybrid of two canonical forms, which is why the two bonds are equal.",
      table: {
        columns: ["Topic", "What to write"],
        rows: [
          {
            cells: ["Depletion by nitrogen oxide", "\\(\\text{NO} + \\text{O}_3 \\longrightarrow \\text{NO}_2 + \\text{O}_2\\), from car and supersonic jet exhausts"],
            pyqExampleId: "778cca2a-752f-44c0-a123-22a0058db00c",
            noteAmber: "Board 2025 asked which oxide of nitrogen depletes the ozone layer.",
          },
          { cells: ["Depletion by CFCs", "Chlorofluorocarbons (freons) from aerosols and refrigerators escape into the atmosphere"] },
          {
            cells: ["Structure", "Angular; O-O bonds 128 pm each; angle about 117°; resonance hybrid of two forms"],
            pyqExampleId: "7345030d-c609-49d7-967b-29af396c79ab",
          },
          { cells: ["Uses: air and water", "Purifying air in crowded places such as cinema halls, tunnels and railways; sterilising drinking water"] },
          { cells: ["Uses: bleaching and industry", "Bleaching ivory, oils, starch, wax and silk; making synthetic camphor and potassium permanganate"] },
        ],
      },
      practiceSet: [
        { prompt: "Why are the two O-O bonds in ozone of equal length?", answer: "Ozone is a resonance hybrid of two canonical forms" },
        { prompt: "Over which region is ozone depletion most pronounced?", answer: "The polar regions, especially Antarctica" },
        { prompt: "Why is the ozone layer called the ozone umbrella?", answer: "It protects the earth's surface from harmful ultraviolet radiation" },
        { prompt: "Give the bond angle in the ozone molecule.", answer: "About 117°" },
      ],
      pyqExampleId: "778cca2a-752f-44c0-a123-22a0058db00c",
      traps: [
        {
          title: "Ozone is diamagnetic",
          body: "Unlike dioxygen, ozone has no unpaired electrons. Do not carry the paramagnetism of \\(\\text{O}_2\\) over to \\(\\text{O}_3\\).",
        },
        {
          title: "A structure answer needs its numbers",
          body: "Write 'angular, bond length 128 pm, bond angle about 117°, resonance hybrid'. 'Ozone is bent' alone earns one of the marks.",
        },
      ],
    },
  ],
};
