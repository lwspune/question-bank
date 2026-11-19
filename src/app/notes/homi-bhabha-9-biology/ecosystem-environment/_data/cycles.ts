import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_EE_CYCLES_NOTE: SubtopicNote = {
  subtopicName: "Nitrogen, Carbon and Oxygen Cycles",
  title: "Nitrogen, Carbon and Oxygen Cycles",
  oneLineDefinition:
    "Bacteria move nitrogen between the air, the soil and living things, while photosynthesis and respiration move carbon and oxygen; these gaseous cycles turn faster than the sedimentary ones locked in rocks.",
  whyItMatters:
    "Nine questions in the bank, four EASY, four MODERATE and one HARD. Four are on the nitrogen cycle (nitrification is asked twice, which stages need bacteria, and true or false statements about the cycles). Five are on carbon and oxygen: what releases carbon dioxide, which processes cycle carbon through living things, where carbon dioxide is stored, where oxygen is found, and filling in the respiration equation.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9eecy-nitrogen",
      name: "The nitrogen cycle",
      intuition:
        "Air is mostly nitrogen, yet plants starve for it, because they cannot use nitrogen gas. Bacteria do the work: some fix the gas into compounds, some turn the waste of dead bodies into ammonia and then into nitrates, which plants drink up through their roots. Other bacteria send nitrogen back to the air.",
      definition:
        "- Air is about **78% nitrogen**. Every living thing needs nitrogen for its proteins, so **all organisms take part** in the nitrogen cycle.\n" +
        "- Plants take nitrogen from the soil as **nitrates** and make proteins; animals get it by eating plants.\n" +
        "- **Nitrification** is a two-step change: **Nitrosomonas** turns ammonia into **nitrite**, and **Nitrobacter** turns nitrite into **nitrate**.\n" +
        "- **Gaseous cycles** (nitrogen, carbon, oxygen) are fast. **Sedimentary cycles** (such as phosphorus and sulphur), whose element is stored in rocks, are **slower**.\n" +
        "- Nutrients move in a **cycle**; energy flows only one way.",
      table: {
        columns: ["Step", "What happens", "Done by"],
        rows: [
          { cells: ["Nitrogen fixation", "Nitrogen gas of the air is turned into nitrogen compounds", "Rhizobium in the root nodules of legumes, Azotobacter, blue-green algae, lightning"] },
          { cells: ["Ammonification", "Proteins in dead bodies and wastes are turned into ammonia", "Decomposer bacteria and fungi"] },
          { cells: ["Nitrification", "Ammonia is turned into nitrite, then nitrite into nitrate", "Nitrosomonas, then Nitrobacter"] },
          { cells: ["Assimilation", "Plants absorb nitrates and make proteins", "Green plants"] },
          { cells: ["Denitrification", "Nitrates are turned back into nitrogen gas", "Denitrifying bacteria"] },
        ],
        caption: "Every step except assimilation (and fixation by lightning) needs bacteria or fungi.",
      },
      selfCheckExample: {
        prompt: "Which bacteria, living in the root nodules of pea and gram plants, fix nitrogen from the air?",
        steps: ["Pea and gram are legumes, and the nitrogen-fixing bacteria in their root nodules are Rhizobium."],
        answer: "Rhizobium",
      },
      practiceSet: [
        { prompt: "What is the change of nitrates back into nitrogen gas called?", answer: "Denitrification" },
        { prompt: "Which bacterium changes nitrite into nitrate?", answer: "Nitrobacter" },
        { prompt: "About what percentage of the air is nitrogen?", answer: "About 78%" },
        { prompt: "Which is faster, the nitrogen cycle or the phosphorus cycle?", answer: "The nitrogen cycle: gaseous cycles are faster than sedimentary cycles" },
      ],
      pyqExampleId: "0d82376d-4772-4df4-be99-4aa7485d2d5d",
      traps: [
        {
          title: "Mixing up nitrification and nitrogen fixation",
          body: "Nitrogen fixation turns nitrogen gas into compounds. Nitrification turns ammonia into nitrite and then nitrate.",
        },
        {
          title: "Thinking ammonification makes nitrate",
          body: "Ammonification makes ammonia from dead matter and wastes. Nitrate is made later, by nitrification.",
        },
        {
          title: "Thinking sedimentary cycles are faster",
          body: "Elements stored in rocks are released very slowly, so sedimentary cycles are slower than gaseous ones.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9eecy-carbon",
      name: "The carbon and oxygen cycles",
      intuition:
        "Plants pull carbon dioxide out of the air and build it into sugar, giving out oxygen. Every living thing then burns that sugar in respiration, using oxygen and giving the carbon dioxide back. The two processes are the same reaction run in opposite directions, and between them carbon and oxygen keep going round.",
      definition:
        "- **Photosynthesis** takes carbon dioxide **in** and gives out oxygen. It needs **sunlight** and **chlorophyll** and happens in green leaves.\n" +
        "- **Respiration** uses oxygen and gives carbon dioxide **out**, with energy. It happens in the **mitochondria** of every living cell, day and night.\n" +
        "- Carbon dioxide is also released by **burning fuels**, **forest fires**, **volcanoes** and the **decay** of dead matter.\n" +
        "- The largest stores of carbon dioxide are the **oceans** (dissolved) and **rocks** such as limestone (as carbonates).\n" +
        "- Oxygen is found in all three spheres: the **atmosphere** (oxygen gas, about 21% of air), the **hydrosphere** (in water and dissolved in it) and the **lithosphere** (in oxides, silicates and carbonates of rocks).",
      formula: {
        label: "Photosynthesis and respiration",
        latex:
          "\\mathrm{6CO_2 + 6H_2O \\xrightarrow{\\text{sunlight, chlorophyll}} C_6H_{12}O_6 + 6O_2} \\qquad \\mathrm{C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O} + \\text{energy}",
        symbols: [
          { symbol: "CO₂", meaning: "carbon dioxide" },
          { symbol: "H₂O", meaning: "water" },
          { symbol: "C₆H₁₂O₆", meaning: "glucose" },
          { symbol: "O₂", meaning: "oxygen" },
        ],
      },
      authoredExample: {
        prompt: "Balance the equation of photosynthesis: \\(\\mathrm{CO_2 + H_2O \\rightarrow C_6H_{12}O_6 + O_2}\\).",
        steps: [
          "Glucose has 6 carbon atoms, so take 6 \\(\\mathrm{CO_2}\\).",
          "Glucose has 12 hydrogen atoms, so take 6 \\(\\mathrm{H_2O}\\).",
          "Oxygen on the left: \\(6 \\times 2 + 6 = 18\\) atoms. Glucose holds 6, so 12 are left, which is 6 \\(\\mathrm{O_2}\\).",
        ],
        answer: "\\(\\mathrm{6CO_2 + 6H_2O \\rightarrow C_6H_{12}O_6 + 6O_2}\\)",
      },
      selfCheckExample: {
        prompt: "Name two natural processes that add carbon dioxide to the air and one that removes it.",
        steps: ["Respiration and volcanoes give out carbon dioxide.", "Photosynthesis takes it in."],
        answer: "Adds: respiration, volcanoes (also decay, forest fires). Removes: photosynthesis.",
      },
      practiceSet: [
        { prompt: "In which three spheres of the Earth is oxygen found?", answer: "The atmosphere, the hydrosphere and the lithosphere" },
        { prompt: "What are the two largest stores of carbon dioxide on Earth?", answer: "The oceans and rocks" },
        { prompt: "Which gas do green plants give out during photosynthesis?", answer: "Oxygen" },
        { prompt: "In what form is carbon held in limestone rock?", answer: "As carbonate (calcium carbonate)" },
      ],
      pyqExampleId: "2effe6a3-45e1-4515-815b-a7553552e034",
      traps: [
        {
          title: "Thinking photosynthesis releases carbon dioxide",
          body: "Photosynthesis takes carbon dioxide in and gives out oxygen. Respiration, burning, forest fires and volcanoes release it.",
        },
        {
          title: "Giving respiration sunlight and chlorophyll",
          body: "Sunlight and chlorophyll belong to photosynthesis. Respiration happens in the mitochondria, day and night, in every cell.",
        },
        {
          title: "Thinking plants do not respire",
          body: "Plants respire all the time, like animals. In daylight their photosynthesis is simply faster than their respiration.",
        },
      ],
    },
  ],
};
