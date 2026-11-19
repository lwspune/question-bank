import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SD_SCIENTISTS_NOTE: SubtopicNote = {
  subtopicName: "Scientists and Their Work",
  title: "Scientists and Their Work",
  oneLineDefinition:
    "Who discovered or invented what: the pioneers of the cell, microbes and medical scanning, the founders of modern chemistry, and the people behind the mobile phone and India's monsoon forecasts.",
  whyItMatters:
    "The busiest page of the chapter: eight questions, one EASY, five MODERATE and two HARD. Each names a scientist or a discovery and asks you to match the two: protoplasm, typhus, the MRI scanner, biotechnology, urea, modern chemistry, the cell phone and the monsoon model. A table of names and works is the whole method.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9sdsc-life",
      name: "Discoveries in cells, microbes and medicine",
      intuition:
        "Biology changed each time someone saw something new. A better lens showed the cell, then the nucleus, then the tiny living things in a drop of water. Later scientists found the germs behind diseases, sometimes catching them during the work, and built machines that look inside the body without cutting it open.",
      definition:
        "- **Robert Hooke** saw and named the **cell** in a thin slice of cork (1665).\n" +
        "- **Zacharias Janssen** made the first **compound microscope**; **Antonie van Leeuwenhoek** was the first to see **bacteria and protozoa**.\n" +
        "- **Robert Brown** discovered the **nucleus**; **Purkinje** gave the word **protoplasm** to the living matter of the cell.\n" +
        "- **Rudolf Virchow**: every cell comes from an existing cell.\n" +
        "- **Alexander Fleming** discovered **penicillin**; **Edward Jenner** made the first **smallpox vaccine**; **Louis Pasteur** made the **rabies vaccine**.\n" +
        "- **Ida Bengtson**, an American bacteriologist, caught **typhus** while researching it.\n" +
        "- **Karl Ereky** first used the word **biotechnology** (1919): the father of biotechnology.\n" +
        "- **Raymond Damadian**: **MRI** scanner. **Godfrey Hounsfield**: **CT** scanner. **Wilhelm Röntgen**: **X-rays**.",
      table: {
        columns: ["Scientist", "Known for"],
        rows: [
          { cells: ["Robert Hooke", "Named the cell"] },
          { cells: ["Antonie van Leeuwenhoek", "First saw bacteria and protozoa"] },
          { cells: ["Zacharias Janssen", "First compound microscope"] },
          { cells: ["Robert Brown", "Discovered the nucleus"] },
          { cells: ["Purkinje", "Coined the word protoplasm"] },
          { cells: ["Alexander Fleming", "Penicillin"] },
          { cells: ["Edward Jenner", "Smallpox vaccine"] },
          { cells: ["Ida Bengtson", "Caught typhus during her research on it"] },
          { cells: ["Karl Ereky", "Father of biotechnology"] },
          { cells: ["Raymond Damadian", "MRI scanner"] },
          { cells: ["Godfrey Hounsfield", "CT scanner"] },
        ],
        caption: "Leeuwenhoek did not invent the microscope; he made fine lenses and was first to see microbes.",
      },
      selfCheckExample: {
        prompt: "Find the correct pair: (a) Robert Brown: penicillin (b) Robert Hooke: named the cell (c) Fleming: nucleus (d) Jenner: protoplasm.",
        steps: ["Brown found the nucleus, Fleming penicillin, Jenner the smallpox vaccine.", "Hooke named the cell after looking at cork."],
        answer: "(b) Robert Hooke: named the cell",
      },
      practiceSet: [
        { prompt: "Who discovered penicillin?", answer: "Alexander Fleming" },
        { prompt: "Who invented the CT scanner?", answer: "Godfrey Hounsfield" },
        { prompt: "Who discovered the nucleus of the cell?", answer: "Robert Brown" },
        { prompt: "Who was the first to see bacteria and protozoa?", answer: "Antonie van Leeuwenhoek" },
      ],
      pyqExampleId: "a9c8adc3-d288-4010-b8b2-3e79b9519b10",
      traps: [
        {
          title: "Crediting Leeuwenhoek with the first microscope",
          body: "Janssen made the first compound microscope. Leeuwenhoek is famous for being first to see bacteria and protozoa.",
        },
        {
          title: "Giving Robert Brown the cell",
          body: "Robert Hooke named the cell. Robert Brown discovered the nucleus inside it.",
        },
        {
          title: "Mixing up the MRI and CT scanners",
          body: "Raymond Damadian built the MRI scanner, which uses a magnet and radio waves. Godfrey Hounsfield built the CT scanner, which uses X-rays.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9sdsc-physical",
      name: "Chemistry, technology and the monsoon",
      intuition:
        "Chemistry became a science when people began to weigh things carefully before and after a reaction. Later it crossed an old wall: chemists showed that a substance made by living bodies could be made in a flask. The same habit of careful measurement gave us the mobile phone and better guesses about the monsoon rains.",
      definition:
        "- **Antoine Lavoisier**: the **father of modern chemistry**. He gave the **law of conservation of mass** and named oxygen and hydrogen.\n" +
        "- **John Dalton**: the **atomic theory**. **Robert Boyle**: Boyle's law of gases. **Amedeo Avogadro**: Avogadro's law. **Joseph Proust**: the law of constant proportions.\n" +
        "- **Friedrich Wöhler** (1828) made **urea** by heating **ammonium cyanate**: the first organic compound made from an inorganic one.\n" +
        "- **Alessandro Volta** discovered **methane** (1776 to 1778) and made the first electric battery.\n" +
        "- **Kroto, Curl and Smalley** discovered **fullerene**, \\(\\mathrm{C_{60}}\\).\n" +
        "- **Martin Cooper** of Motorola made the first handheld **mobile phone** call (1973): the father of the cell phone.\n" +
        "- **Monsoon forecasting**: **H. F. Blanford** made the first monsoon forecasts for India, **Sir Gilbert Walker** built forecasts on weather patterns across the oceans, and **Dr. Vasant Gowariker** made a monsoon prediction model used in India.",
      table: {
        columns: ["Scientist", "Known for"],
        rows: [
          { cells: ["Antoine Lavoisier", "Father of modern chemistry; conservation of mass"] },
          { cells: ["John Dalton", "Atomic theory"] },
          { cells: ["Joseph Proust", "Law of constant proportions"] },
          { cells: ["Friedrich Wöhler", "Made urea from ammonium cyanate"] },
          { cells: ["Alessandro Volta", "Discovered methane; first electric battery"] },
          { cells: ["Kroto, Curl and Smalley", "Fullerene, C₆₀"] },
          { cells: ["Martin Cooper", "Father of the cell phone"] },
          { cells: ["Blanford, Walker, Gowariker", "Monsoon forecasting"] },
        ],
        caption: "Har Gobind Khorana worked on the genetic code, not on the monsoon.",
      },
      selfCheckExample: {
        prompt: "Which scientist showed that an organic compound can be made in a laboratory, and from what did he make it?",
        steps: ["Urea is made in living bodies, so it was thought to need a 'life force'.", "Wöhler made it by heating ammonium cyanate, an inorganic compound."],
        answer: "Friedrich Wöhler, from ammonium cyanate (he made urea)",
      },
      practiceSet: [
        { prompt: "Who gave the atomic theory?", answer: "John Dalton" },
        { prompt: "Which law did Antoine Lavoisier give?", answer: "The law of conservation of mass" },
        { prompt: "Who made the first handheld mobile phone call, in 1973?", answer: "Martin Cooper" },
        { prompt: "Who discovered methane gas?", answer: "Alessandro Volta" },
      ],
      pyqExampleId: "a0567eb1-2c89-4ac8-862d-d0e7a66d212c",
      traps: [
        {
          title: "Giving Wöhler the law of constant proportions",
          body: "Wöhler made urea from ammonium cyanate. The law of constant proportions is Proust's.",
        },
        {
          title: "Calling Dalton the father of modern chemistry",
          body: "Dalton gave the atomic theory. The father of modern chemistry is Lavoisier.",
        },
        {
          title: "Putting Khorana among the weather scientists",
          body: "Har Gobind Khorana won a Nobel Prize for work on the genetic code. Blanford, Walker and Gowariker worked on the monsoon.",
        },
      ],
    },
  ],
};
