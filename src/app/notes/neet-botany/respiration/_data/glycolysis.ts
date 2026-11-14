import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_RS_GLYCOLYSIS_NOTE: SubtopicNote = {
  subtopicName: "Glycolysis and Fermentation",
  title: "Glycolysis and Fermentation",
  oneLineDefinition:
    "What respiration is and how plants exchange gases, the ten steps of glycolysis that split glucose into two pyruvic acid, how to count its ATP and NADH, and what fermentation does with pyruvic acid when there is no oxygen.",
  whyItMatters:
    "Five NEET questions from 2022 to 2026: two in NEET 2022, one in NEET 2023, one in Re-NEET 2024 and one in Re-NEET 2026. Two of the five are counts (net ATP of glycolysis, and pyruvic acid from 206 glucose), so learn the numbers of glycolysis as well as its steps.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbors-basics",
      name: "What respiration is",
      intuition:
        "Food holds energy in the bonds between its carbon atoms. Respiration breaks those bonds by oxidation, a little at a time, and stores the energy that comes out in ATP. Plants do this in every living cell, day and night. They have no lungs, yet they manage, because each part looks after its own gas needs and no living cell is far from air.",
      definition:
        "NCERT's key lines:\n" +
        "- **Respiration** is the breaking of the **C-C bonds** of complex compounds through **oxidation** within the cells, releasing a lot of energy.\n" +
        "- The compounds oxidised are **respiratory substrates**. Usually these are **carbohydrates**; proteins, fats and even organic acids can be used in some plants under certain conditions.\n" +
        "- The energy is not released in one burst. It comes out in many small steps and is used to make **ATP**, the **energy currency** of the cell. Not all of the energy is trapped in ATP.\n" +
        "- Complete oxidation of glucose: \\(\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\rightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{energy}\\).\n" +
        "- **Glycolysis** happens in the **cytoplasm** of all living organisms. What happens to its product, **pyruvic acid**, depends on the cell: **lactic acid fermentation**, **alcoholic fermentation** or **aerobic respiration**.",
      table: {
        columns: ["Point", "What NCERT says"],
        rows: [
          { cells: ["Organs for gas exchange", "Plants have no special respiratory organs; they use **stomata** and **lenticels**"] },
          { cells: ["Reason 1", "Each plant part takes care of its own gas exchange; there is very little transport of gases from one part to another"] },
          { cells: ["Reason 2", "Roots, stems and leaves respire at rates far lower than animals; large volumes of gas move only during photosynthesis, in the leaves"] },
          { cells: ["Reason 3", "Gases do not have to diffuse far: almost every living cell is close to the surface of the plant"] },
          { cells: ["Inside a stem", "Living cells lie in thin layers beneath the bark, which has openings called **lenticels**; the cells deep inside are dead and only give support"] },
          { cells: ["Air spaces", "Loosely packed **parenchyma** cells in leaves, stems and roots form a connected network of air spaces"] },
          {
            cells: ["Where respiration happens", "Glycolysis in the **cytoplasm**; the rest of aerobic respiration in the **mitochondria**"],
            noteAmber: "Re-NEET 2024: the statement that the entire cellular respiration takes place in mitochondria was the false one.",
            pyqExampleId: "2c5cf194-25dc-45a3-978d-420dff6cc9ae",
          },
          { cells: ["Fate of pyruvic acid", "Lactic acid fermentation, alcoholic fermentation, or aerobic respiration (Krebs cycle) when oxygen is available"] },
        ],
      },
      pyqExampleId: "2c5cf194-25dc-45a3-978d-420dff6cc9ae",
      selfCheckExample: {
        prompt: "A tree trunk is thick and woody, yet its living cells still get the oxygen they need without any lungs. How?",
        steps: [
          "In a stem the living cells lie in thin layers just beneath the bark.",
          "The bark has openings called lenticels, and the cells deep inside the trunk are dead, so they need no oxygen.",
        ],
        answer: "Its living cells sit in thin layers under the bark, which has lenticels; the inner cells are dead.",
      },
      practiceSet: [
        { prompt: "What does NCERT call the compounds that are oxidised during respiration?", answer: "Respiratory substrates" },
        { prompt: "Which molecule does NCERT call the energy currency of the cell?", answer: "ATP" },
        { prompt: "Through which two openings do plants exchange gases?", answer: "Stomata and lenticels" },
        { prompt: "How many molecules of oxygen are used in the complete oxidation of one glucose molecule?", answer: "6" },
        { prompt: "Which kind of bond does respiration break to release energy from food?", answer: "C-C bonds (carbon to carbon)" },
      ],
      traps: [
        {
          title: "Not all of respiration happens in mitochondria",
          body: "**Glycolysis** happens in the **cytoplasm**. Only the steps after pyruvic acid (Krebs cycle and electron transport) happen in the mitochondria.",
        },
        {
          title: "Plants breathe without lungs",
          body: "Plants have **no special respiratory organs**, but they still exchange gases, through **stomata** and **lenticels**. Each part handles its own needs.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbors-glycolysis-steps",
      name: "The steps of glycolysis",
      intuition:
        "Glycolysis means splitting sugar. First the cell spends energy: it adds two phosphate groups to the sugar, using two ATP. Then the six-carbon sugar splits into two three-carbon pieces. Each piece is oxidised once, which makes NADH, and gives up its two phosphates to make ATP. Each three-carbon piece ends as pyruvic acid.",
      definition:
        "Glycolysis as NCERT tells it:\n" +
        "- The scheme was given by **Gustav Embden, Otto Meyerhof and J. Parnas**, so it is also called the **EMP pathway**.\n" +
        "- In **anaerobic organisms** it is the **only** process in respiration.\n" +
        "- In plants the glucose comes from **sucrose** (the end product of photosynthesis) or from stored carbohydrates. **Invertase** splits sucrose into glucose and fructose, and both enter glycolysis.\n" +
        "- Glucose and fructose are phosphorylated to **glucose-6-phosphate** by **hexokinase**.\n" +
        "- There are **ten reactions**, each controlled by a different enzyme.\n" +
        "- **ATP is used at two steps** and **made at two steps**; **NADH + H⁺** is made at **one** step.\n" +
        "- **Pyruvic acid** is the **key product** of glycolysis.",
      table: {
        columns: ["Step", "What happens", "ATP or NADH"],
        rows: [
          {
            cells: ["Glucose to glucose-6-phosphate", "Phosphorylation by hexokinase", "1 ATP used"],
            noteAmber: "NEET 2023: an assertion that ATP is used at two steps, with the reason naming these two steps, was true and correctly explained.",
            pyqExampleId: "0341593a-15a0-4a8e-846e-09a9eb9d00a1",
          },
          { cells: ["Glucose-6-phosphate to fructose-6-phosphate", "The sugar is isomerised", "None"] },
          { cells: ["Fructose-6-phosphate to fructose-1,6-bisphosphate", "A second phosphate is added", "1 ATP used"] },
          { cells: ["Fructose-1,6-bisphosphate splits", "Into dihydroxyacetone phosphate (DHAP) and 3-phosphoglyceraldehyde (PGAL)", "None"] },
          { cells: ["PGAL to 1,3-bisphosphoglycerate (BPGA)", "PGAL is oxidised and takes up inorganic phosphate; two hydrogen atoms go to NAD⁺", "NADH + H⁺ made"] },
          { cells: ["BPGA to 3-phosphoglyceric acid (PGA)", "An energy-yielding step", "ATP made"] },
          { cells: ["PGA to phosphoenolpyruvate (PEP)", "Through 2-phosphoglycerate", "None"] },
          { cells: ["PEP to pyruvic acid", "The last step", "ATP made"] },
        ],
        caption: "From PGAL onwards every step happens twice for each glucose, because one glucose gives two three-carbon molecules.",
      },
      pyqExampleId: "0341593a-15a0-4a8e-846e-09a9eb9d00a1",
      selfCheckExample: {
        prompt: "In glycolysis, at which single step is NAD⁺ reduced to NADH + H⁺?",
        steps: [
          "NADH forms where a molecule is oxidised and its hydrogen atoms go to NAD⁺.",
          "In glycolysis this happens once: when 3-phosphoglyceraldehyde (PGAL) is oxidised.",
        ],
        answer: "When PGAL (3-phosphoglyceraldehyde) is converted to 1,3-bisphosphoglycerate (BPGA).",
      },
      practiceSet: [
        { prompt: "Which three scientists gave the scheme of glycolysis?", answer: "Gustav Embden, Otto Meyerhof and J. Parnas (the EMP pathway)" },
        { prompt: "Which enzyme splits sucrose into glucose and fructose?", answer: "Invertase" },
        { prompt: "Which enzyme phosphorylates glucose to glucose-6-phosphate?", answer: "Hexokinase" },
        { prompt: "In which step of glycolysis does phosphoenolpyruvate give rise to an ATP?", answer: "When PEP is converted to pyruvic acid" },
        { prompt: "Into which two three-carbon compounds does fructose-1,6-bisphosphate split?", answer: "Dihydroxyacetone phosphate (DHAP) and 3-phosphoglyceraldehyde (PGAL)" },
        { prompt: "What does NCERT call the key product of glycolysis?", answer: "Pyruvic acid" },
      ],
      traps: [
        {
          title: "PEP is not the end product",
          body: "**Phosphoenolpyruvate** is the second-to-last compound. The **key product** of glycolysis is **pyruvic acid**.",
        },
        {
          title: "The second ATP is spent on fructose, not glucose",
          body: "The first ATP is spent making **glucose-6-phosphate**; the second is spent turning **fructose-6-phosphate** into **fructose-1,6-bisphosphate**. The isomerisation between them uses no ATP.",
        },
        {
          title: "NADH comes from PGAL, not from PEP",
          body: "The only NADH of glycolysis is made when **PGAL** becomes **BPGA**. The two ATP-making steps are BPGA to PGA and PEP to pyruvic acid.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbors-glycolysis-count",
      name: "Counting the products of glycolysis",
      intuition:
        "Glycolysis has a fixed balance for every glucose. It spends 2 ATP, makes 4 ATP, makes 2 NADH and ends with 2 pyruvic acid. So any count is just this balance multiplied by the number of glucose molecules. Always ask whether the question wants ATP made (gross) or ATP gained (net).",
      definition:
        "For **one glucose** going through glycolysis:\n" +
        "- **2 pyruvic acid** are made (one glucose splits into two three-carbon molecules).\n" +
        "- **4 ATP** are made directly; **2 ATP** are used, so the **net gain is 2 ATP**.\n" +
        "- **2 NADH + H⁺** are made.\n" +
        "- For **n** glucose molecules, multiply each number by **n**.",
      formula: {
        label: "Glycolysis per glucose",
        latex: "\\text{Net ATP} = 4-2 = 2,\\qquad \\text{pyruvic acid} = 2 \\times n",
        symbols: [
          { symbol: "4", meaning: "ATP made directly per glucose" },
          { symbol: "2", meaning: "ATP used per glucose" },
          { symbol: "\\(n\\)", meaning: "the number of glucose molecules" },
        ],
      },
      authoredExample: {
        prompt: "50 molecules of glucose go through glycolysis. How many molecules of pyruvic acid, net ATP and NADH + H⁺ are formed?",
        steps: [
          "Each glucose gives 2 pyruvic acid: \\(50 \\times 2 = 100\\).",
          "Each glucose gives a net 2 ATP: \\(50 \\times 2 = 100\\).",
          "Each glucose gives 2 NADH + H⁺: \\(50 \\times 2 = 100\\).",
        ],
        answer: "100 pyruvic acid, 100 ATP (net) and 100 NADH + H⁺.",
      },
      pyqExampleId: "3f50c95d-ff25-495a-91c3-7683973dd876",
      selfCheckExample: {
        prompt: "25 glucose molecules go through glycolysis. How many ATP molecules are made directly (gross), and how many are gained (net)?",
        steps: [
          "Each glucose makes 4 ATP directly: \\(25 \\times 4 = 100\\).",
          "Each glucose uses 2 ATP, so the net gain is 2 per glucose: \\(25 \\times 2 = 50\\).",
        ],
        answer: "100 ATP made directly, 50 ATP net.",
      },
      practiceSet: [
        { prompt: "How many ATP molecules are made directly in glycolysis from one glucose molecule?", answer: "4" },
        { prompt: "How many ATP molecules are used up in glycolysis of one glucose molecule?", answer: "2" },
        { prompt: "How many molecules of NADH + H⁺ does glycolysis of one glucose produce?", answer: "2" },
        { prompt: "What is the net gain of ATP when 30 glucose molecules go through glycolysis?", answer: "60", method: "\\(30 \\times 2\\)" },
        { prompt: "How many molecules of NADH + H⁺ are formed when 12 glucose molecules go through glycolysis?", answer: "24", method: "\\(12 \\times 2\\)" },
      ],
      traps: [
        {
          title: "Gross 4, net 2",
          body: "Glycolysis **makes 4 ATP** but **uses 2**, so the **net gain is 2 ATP** per glucose. Read whether the question asks for ATP made or ATP gained.",
        },
        {
          title: "Pyruvic acid doubles, it does not halve",
          body: "One glucose gives **two** pyruvic acid, so the pyruvic acid count is **twice** the glucose count, never half.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbors-fermentation",
      name: "Fermentation",
      intuition:
        "Without oxygen a cell cannot finish oxidising pyruvic acid. It still has to free its NAD⁺, or glycolysis would stop. So it hands the hydrogen of NADH back to pyruvic acid. Yeast turns pyruvic acid into alcohol and carbon dioxide; some bacteria and tired muscles turn it into lactic acid. Very little energy comes out.",
      definition:
        "NCERT on fermentation:\n" +
        "- It happens under **anaerobic** conditions in many **prokaryotes** and **unicellular eukaryotes**. It is an **incomplete oxidation** of glucose.\n" +
        "- In **yeast**, pyruvic acid becomes **CO₂ and ethanol**, by the enzymes **pyruvic acid decarboxylase** and **alcohol dehydrogenase**.\n" +
        "- Some **bacteria** make **lactic acid**. In **muscles** during exercise, when oxygen is not enough, pyruvic acid is reduced to **lactic acid** by **lactate dehydrogenase**.\n" +
        "- In both, the reducing agent is **NADH + H⁺**, which is **reoxidised to NAD⁺**.\n" +
        "- **Less than seven per cent** of the energy in glucose is released, and not all of it is trapped in ATP. The net gain is **2 ATP** per glucose.\n" +
        "- The process is hazardous: it makes acid or alcohol. **Yeasts poison themselves to death** when alcohol reaches about **13 per cent**.",
      table: {
        columns: ["Point", "Alcoholic fermentation", "Lactic acid fermentation"],
        rows: [
          { cells: ["Who does it", "Yeast", "Some bacteria; muscle cells short of oxygen"] },
          { cells: ["Pyruvic acid becomes", "Ethanol and CO₂", "Lactic acid (no CO₂)"] },
          { cells: ["Enzymes", "Pyruvic acid decarboxylase and alcohol dehydrogenase", "Lactate dehydrogenase"] },
          { cells: ["NADH + H⁺", "Reoxidised to NAD⁺", "Reoxidised to NAD⁺"] },
          {
            cells: ["Energy released", "Less than 7% of the energy in glucose", "Less than 7% of the energy in glucose"],
            noteAmber: "NEET 2022 asked how much of the energy in glucose lactic acid fermentation releases.",
            pyqExampleId: "25dc202b-2c74-4746-99c2-d66bc08098de",
          },
          { cells: ["Net ATP per glucose", "2", "2"] },
        ],
        caption: "NCERT compares the two ways of using pyruvic acid: fermentation breaks glucose only partly and gains 2 ATP; aerobic respiration breaks it fully to CO₂ and water and gains many more. In fermentation NADH is oxidised to NAD⁺ slowly; in aerobic respiration, very vigorously.",
      },
      pyqExampleId: "25dc202b-2c74-4746-99c2-d66bc08098de",
      selfCheckExample: {
        prompt: "A sprinter's leg muscles run short of oxygen. What does pyruvic acid turn into, which enzyme does it, and why does the cell bother?",
        steps: [
          "Without enough oxygen, muscle cells reduce pyruvic acid to lactic acid.",
          "The enzyme is lactate dehydrogenase, and NADH + H⁺ is the reducing agent.",
          "That reoxidises NADH to NAD⁺, which glycolysis needs to keep going.",
        ],
        answer: "Lactic acid, made by lactate dehydrogenase; it frees NAD⁺ so glycolysis can continue.",
      },
      practiceSet: [
        { prompt: "Which two enzymes turn pyruvic acid into ethanol and CO₂ in yeast?", answer: "Pyruvic acid decarboxylase and alcohol dehydrogenase" },
        { prompt: "Which kind of fermentation releases carbon dioxide?", answer: "Alcoholic (ethanol) fermentation" },
        { prompt: "At about what alcohol concentration do yeasts poison themselves to death?", answer: "About 13 per cent" },
        { prompt: "What is the net gain of ATP when one glucose is fermented?", answer: "2 ATP" },
        { prompt: "Which coenzyme is regenerated when NADH + H⁺ is reoxidised during fermentation?", answer: "NAD⁺" },
      ],
      traps: [
        {
          title: "Lactic acid fermentation gives no CO₂",
          body: "Only **alcoholic** fermentation releases **CO₂** (with ethanol). **Lactic acid** fermentation turns pyruvic acid into lactic acid alone.",
        },
        {
          title: "Under 7%, not about 10%",
          body: "Fermentation releases **less than seven per cent** of the energy in glucose, and not all of that is trapped in ATP.",
        },
        {
          title: "Muscles use lactate dehydrogenase",
          body: "Muscle cells short of oxygen make **lactic acid** by **lactate dehydrogenase**. **Alcohol dehydrogenase** and **pyruvic acid decarboxylase** belong to yeast.",
        },
      ],
    },
  ],
};
