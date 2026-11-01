import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CAT_ATOMS_NOTE: SubtopicNote = {
  subtopicName: "Atoms and Elements",
  title: "Atoms and Elements",
  oneLineDefinition:
    "Element symbols and names from Latin, the heavy elements named after scientists, Dalton's atomic theory, Rutherford's gold foil, and chlorine's two isotopes.",
  whyItMatters:
    "Nine questions in the bank: seven from the 2023 shifts and two from the 2024 shifts. Each asks one name, number or year, so learn the two short tables.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssccatat-elements",
      name: "Element names and symbols",
      intuition:
        "Some symbols come from Latin names, and the heavy man-made elements are named after scientists. SSC asks the symbol, the atomic number or the use.",
      definition:
        "Latin roots:\n" +
        "- **Au**: **gold** (aurum). **Ag**: silver (argentum). Al is aluminium, Ar argon.\n" +
        "- **Calcium** is from **calx**, lime.\n\n" +
        "Heavy elements:\n" +
        "- **Mendelevium**, **101**, an actinide made in **1955**, named after Mendeleev.\n" +
        "- **Nobelium** 102; **seaborgium** **106**, after Glenn Seaborg.\n" +
        "- **Plutonium**, found by **Seaborg** in **1940**: plutonium-238 **heats and powers satellites**.",
      table: {
        columns: ["Element", "Fact"],
        rows: [
          { cells: ["Mendelevium", "Atomic number 101"], pyqExampleId: "4644be1d-9673-4d63-bfb5-e9599f8c8895" },
          { cells: ["Seaborgium", "Atomic number 106"], pyqExampleId: "d15f42fc-a274-44c8-97c0-5c88dd8ef9e9" },
          { cells: ["Plutonium", "Powers satellites"], pyqExampleId: "e8dab459-d86b-4169-8c6d-f17d4cc06013" },
          { cells: ["Calcium", "From Latin calx"], pyqExampleId: "da5b1108-4528-495d-8c24-1928f574224d" },
        ],
      },
      pyqExampleId: "3007d80b-487a-4af6-899f-7a9e5eec6b30",
      selfCheckExample: {
        prompt: "Which element has the symbol Ag, and what Latin word does it come from?",
        steps: ["Ag is silver.", "It comes from the Latin argentum."],
        answer: "Silver, from argentum.",
      },
      practiceSet: [
        { prompt: "Who is mendelevium named after?", answer: "Dmitri Mendeleev" },
        { prompt: "What is the atomic number of nobelium?", answer: "102" },
        { prompt: "Who discovered plutonium?", answer: "Glenn T. Seaborg" },
      ],
      traps: [
        {
          title: "Au is gold, Ag is silver",
          body: "**Au** (aurum) is **gold**; **Ag** (argentum) is **silver**. Options offer aluminium and argon for Au as well.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssccatat-models",
      name: "Atomic theory and isotopes",
      intuition:
        "Dalton said each element has its own kind of atom. Later experiments looked inside the atom, and isotopes showed that one element's atoms can differ in mass.",
      definition:
        "The steps:\n" +
        "- **John Dalton** (**1808**): each element is made of its own **unique atoms**, which differ in mass; compounds form when atoms combine in simple ratios.\n" +
        "- **Thomson** found the electron (1897); **Bohr** gave his model in 1913.\n" +
        "- **Rutherford** fired alpha particles at gold foil about **1,000 atoms** thick.\n\n" +
        "Isotopes: **chlorine** has two, **Cl-35** (about 75.77%) and **Cl-37** (about 24.23%), so its average atomic mass is about **35.5**.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["Atoms differ by mass", "Dalton"], pyqExampleId: "b148cfb5-4ea5-4eb8-981a-c8299e96c809" },
          { cells: ["Gold foil thickness", "About 1,000 atoms"], pyqExampleId: "72946ef4-80cb-4060-b573-d4843441cc1b" },
          { cells: ["Isotopes 35 and 37", "Chlorine"], pyqExampleId: "eebe9f14-a0c5-4a46-b10f-2c8463ac8bab" },
        ],
      },
      pyqExampleId: "50e3278f-13c1-467e-a826-a6c44ecb526f",
      selfCheckExample: {
        prompt: "Chlorine is about 75% Cl-35 and 25% Cl-37. Estimate its average atomic mass.",
        steps: ["Average = 35 x 0.75 + 37 x 0.25.", "26.25 + 9.25 = 35.5."],
        answer: "About 35.5.",
      },
      practiceSet: [
        { prompt: "In which year did Dalton publish his atomic theory?", answer: "1808" },
        { prompt: "What did Rutherford fire at the gold foil?", answer: "Alpha particles" },
        { prompt: "Who discovered the electron?", answer: "J. J. Thomson" },
      ],
      traps: [
        {
          title: "Dalton, not Avogadro",
          body: "Unique atoms differing in mass is **Dalton's** theory. Avogadro gave the molecular hypothesis; Lavoisier, conservation of mass.",
        },
      ],
    },
  ],
};
