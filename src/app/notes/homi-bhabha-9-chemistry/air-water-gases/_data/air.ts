import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AW_AIR_NOTE: SubtopicNote = {
  subtopicName: "Air and Water",
  title: "Air and Water",
  oneLineDefinition:
    "Air is mostly nitrogen and oxygen with a little argon and carbon dioxide, and its gases boil at different temperatures; water splits on electrolysis into twice as much hydrogen as oxygen, and sea water is mostly dissolved common salt.",
  whyItMatters:
    "Four questions in the bank, one EASY, two MODERATE and one HARD: how the atmosphere protects the Earth, the gases of air in order of boiling point, the volumes of gas from the electrolysis of water, and which element sea water holds least of. Each is a fact to know, not a sum.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9awai-atmosphere",
      name: "The atmosphere and the gases of air",
      intuition:
        "The air around the Earth is a thin blanket of gases. It keeps the days from getting too hot and the nights too cold, and the ozone in it stops most of the Sun's harmful ultraviolet rays. Its gases can be cooled until they turn liquid, and because each one boils at its own temperature they can be separated again.",
      definition:
        "- Dry air is about **78% nitrogen**, **21% oxygen**, **0.93% argon** and about **0.04% carbon dioxide**, with water vapour that changes from day to day.\n" +
        "- The atmosphere is a **protective blanket**: its gases, especially the **ozone layer**, absorb most of the Sun's harmful radiation such as **ultraviolet rays**, and it keeps the Earth's temperature moderate.\n" +
        "- Air we breathe **out** has about **4% carbon dioxide**, far more than the 0.04% in the air we breathe in.\n" +
        "- Liquid air is separated by **fractional distillation**: the gas with the **lowest boiling point (nitrogen)** boils off first.\n" +
        "- Carbon dioxide does not form a liquid at normal pressure: solid carbon dioxide turns straight into gas at \\(-78.5\\) °C.",
      table: {
        columns: ["Gas", "Share of dry air", "Boiling point"],
        rows: [
          { cells: ["Nitrogen", "About 78%", "−196 °C (lowest)"] },
          { cells: ["Argon", "About 0.93%", "−186 °C"] },
          { cells: ["Oxygen", "About 21%", "−183 °C"] },
          {
            cells: ["Carbon dioxide", "About 0.04%", "Turns to gas at −78.5 °C (highest)"],
            noteAmber: "Solid carbon dioxide (dry ice) goes straight to gas at normal pressure.",
          },
        ],
        caption: "Boiling points from highest to lowest: carbon dioxide, oxygen, argon, nitrogen.",
      },
      selfCheckExample: {
        prompt: "Liquid air is slowly warmed. Which of nitrogen and oxygen boils off first, and why?",
        steps: ["Nitrogen boils at −196 °C and oxygen at −183 °C.", "The lower boiling point is reached first."],
        answer: "Nitrogen, because its boiling point is lower",
      },
      practiceSet: [
        { prompt: "Which gas makes up about 78% of dry air?", answer: "Nitrogen" },
        { prompt: "Which layer of the atmosphere absorbs most of the ultraviolet rays of the Sun?", answer: "The ozone layer" },
        { prompt: "About what percentage of the air we breathe out is carbon dioxide?", answer: "About 4%" },
        { prompt: "Which noble gas is the third most plentiful gas in dry air?", answer: "Argon, about 0.93%" },
      ],
      pyqExampleId: "fccd6612-996a-4894-8d5b-87ecc2ce2e4a",
      traps: [
        {
          title: "Putting oxygen first in the air",
          body: "Nitrogen, not oxygen, is the main gas of air: about 78% against oxygen's 21%.",
        },
        {
          title: "Mixing up inhaled and exhaled carbon dioxide",
          body: "About 0.04% of the air we breathe in is carbon dioxide; the air we breathe out has about 4%.",
        },
        {
          title: "Thinking the gas that boils first has the highest boiling point",
          body: "When liquid air warms, the gas with the lowest boiling point, nitrogen, boils off first.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9awai-water",
      name: "Electrolysis of water and sea water",
      intuition:
        "Pass electricity through water with a little acid in it and the water breaks into its two elements. Each water molecule has two hydrogen atoms for one oxygen atom, so twice as much hydrogen gas comes out as oxygen. Sea water is salty because rivers have carried dissolved salts into it for ages, and most of that salt is sodium chloride.",
      definition:
        "- In the **electrolysis of water**, **hydrogen** collects at the **cathode** (negative) and **oxygen** at the **anode** (positive).\n" +
        "- By **volume**, hydrogen : oxygen = **2 : 1**, matching the formula \\(\\mathrm{H_2O}\\).\n" +
        "- A few drops of **acid** are added because pure water conducts electricity very poorly.\n" +
        "- Sea water holds about **3.5%** dissolved salts, mostly **sodium chloride**. Of its elements, **chlorine** is the most plentiful, then **sodium**, then **magnesium**; **potassium** is much scarcer.",
      table: {
        columns: ["Element in sea water", "About how much in 1 kg of sea water", "Mainly as"],
        rows: [
          { cells: ["Chlorine", "19 g", "Chloride of sodium and magnesium"] },
          { cells: ["Sodium", "11 g", "Sodium chloride"] },
          { cells: ["Magnesium", "1.3 g", "Magnesium chloride and sulphate"] },
          { cells: ["Potassium", "0.4 g", "Potassium chloride"] },
        ],
        caption: "Chlorine and sodium together are most of the dissolved matter in sea water.",
      },
      selfCheckExample: {
        prompt: "In the electrolysis of water, 30 mL of gas collects at the cathode. How much gas collects at the anode at the same time, and which gas is it?",
        steps: ["Hydrogen collects at the cathode and oxygen at the anode.", "Oxygen is half the volume of hydrogen: \\(\\frac{30}{2} = 15\\) mL."],
        answer: "15 mL of oxygen",
      },
      practiceSet: [
        { prompt: "At which electrode does hydrogen collect in the electrolysis of water?", answer: "At the cathode (negative electrode)" },
        { prompt: "Why are a few drops of acid added to water before electrolysis?", answer: "Pure water conducts electricity very poorly; the acid helps it conduct" },
        { prompt: "Which salt makes up most of the dissolved salts in sea water?", answer: "Sodium chloride" },
        { prompt: "Which element is the most plentiful in the salts of sea water?", answer: "Chlorine" },
      ],
      pyqExampleId: "9ff12b83-9266-4594-935f-7b5ce568e874",
      traps: [
        {
          title: "Getting the gas volumes the wrong way round",
          body: "Hydrogen is twice the volume of oxygen. The anode gives oxygen, which is half the volume of the hydrogen at the cathode.",
        },
        {
          title: "Thinking sodium is the main element in sea salt",
          body: "By mass there is more chlorine than sodium in sea water: about 19 g against 11 g in every kilogram.",
        },
      ],
    },
  ],
};
