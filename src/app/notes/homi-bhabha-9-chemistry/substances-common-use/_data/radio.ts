import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SU_RADIO_NOTE: SubtopicNote = {
  subtopicName: "Radioactivity and Its Uses",
  title: "Radioactivity and Its Uses",
  oneLineDefinition:
    "A radioactive nucleus gives out alpha, beta or gamma radiation and changes its mass number and atomic number by fixed amounts; radioactive isotopes are used in medicine, industry, farming and reactors, and are dangerous when released.",
  whyItMatters:
    "The most asked idea of the chapter: nine questions, one EASY, six MODERATE and two HARD. Five pair a radioactive isotope with its use (cobalt-60, phosphorus-32, arsenic-74, iridium-192, krypton-85), two are about alpha, beta and gamma rays (one is a decay sum), and two about reactors: India's first reactor and the isotopes released at Chernobyl.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9sura-decay",
      name: "Alpha, beta and gamma radiation and decay sums",
      intuition:
        "An unstable nucleus calms down by throwing something out. An alpha particle is a small lump of 2 protons and 2 neutrons, so the nucleus loses 4 from its mass number and 2 from its atomic number. In beta decay a neutron turns into a proton and throws out an electron, so the mass stays the same but the atomic number goes up by 1. Gamma rays are pure energy and change neither number.",
      definition:
        "- **Alpha (α)**: a helium nucleus, charge +2. **Mass number falls by 4, atomic number falls by 2.** Lowest penetrating power, highest ionising power.\n" +
        "- **Beta (β)**: an electron from the nucleus, charge −1. **Mass number stays the same, atomic number rises by 1.**\n" +
        "- **Gamma (γ)**: an electromagnetic wave with no charge, travelling at the **speed of light**. It changes neither number. **Very high** penetrating power, **very low** ionising power.\n" +
        "- Uses: gamma rays in **radiotherapy** of cancer; alpha particles in **smoke detectors**.\n" +
        "- For a chain of decays, do all the alphas first, then all the betas.",
      formula: {
        label: "Radioactive decay",
        latex: "{}^{A}_{Z}\\mathrm{X} \\xrightarrow{\\alpha} {}^{A-4}_{Z-2}\\mathrm{Y} \\qquad {}^{A}_{Z}\\mathrm{X} \\xrightarrow{\\beta} {}^{A}_{Z+1}\\mathrm{Y}",
        symbols: [
          { symbol: "A", meaning: "mass number (protons + neutrons)" },
          { symbol: "Z", meaning: "atomic number (protons)" },
        ],
      },
      authoredExample: {
        prompt: "Uranium-238 (atomic number 92) gives out one alpha particle and then two beta particles. Find the mass number and atomic number of the final nucleus.",
        steps: [
          "One alpha: mass number \\(238 - 4 = 234\\), atomic number \\(92 - 2 = 90\\).",
          "Two betas: mass number stays 234, atomic number \\(90 + 2 = 92\\).",
        ],
        answer: "Mass number 234, atomic number 92",
      },
      selfCheckExample: {
        prompt: "Radium-226 (atomic number 88) gives out one alpha particle. What are the mass number and atomic number of the new nucleus?",
        steps: ["Mass number \\(226 - 4 = 222\\); atomic number \\(88 - 2 = 86\\)."],
        answer: "Mass number 222, atomic number 86",
      },
      practiceSet: [
        { prompt: "Thorium-232 (atomic number 90) gives out two alpha particles. What are the new mass number and atomic number?", answer: "Mass number 224, atomic number 86" },
        { prompt: "How does the mass number of a nucleus change when it gives out one beta particle?", answer: "It does not change; only the atomic number rises by 1" },
        { prompt: "Which of alpha, beta and gamma radiation has the highest penetrating power?", answer: "Gamma" },
        { prompt: "Which radiation is used in smoke detectors?", answer: "Alpha particles" },
      ],
      pyqExampleId: "fa660498-75ca-445f-b75d-cd1ebe675106",
      traps: [
        {
          title: "Lowering the atomic number in beta decay",
          body: "In beta decay a neutron becomes a proton, so the atomic number goes UP by 1 and the mass number stays the same.",
        },
        {
          title: "Taking 2 off the mass number for an alpha",
          body: "An alpha particle takes away 4 from the mass number and 2 from the atomic number.",
        },
        {
          title: "Using gamma rays in smoke detectors",
          body: "Smoke detectors use alpha particles. Gamma rays are used to treat cancer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9sura-reactors",
      name: "Nuclear reactors in India and the Chernobyl accident",
      intuition:
        "A nuclear reactor splits heavy atoms such as uranium-235 to release energy. India built its first research reactor at Trombay in Mumbai. When a reactor goes wrong, as at Chernobyl, the radioactive products of fission escape into the air.",
      definition:
        "- **Apsara**, at **Trombay (Mumbai)**, started in **1956**. It was the **first nuclear reactor in India and in Asia**.\n" +
        "- Later research reactors at Trombay: **Cirus**, **Zerlina**, **Purnima** and **Dhruva**.\n" +
        "- In a reactor, **uranium-235** is the usual fuel.\n" +
        "- The **Chernobyl** accident (**1986**) released fission products: **iodine-131**, **caesium-137**, **strontium-90**, and **plutonium** from the fuel.",
      table: {
        columns: ["Reactor", "Place", "Year it started"],
        rows: [
          { cells: ["Apsara", "Trombay, Mumbai", "1956"], noteAmber: "The first reactor in India and in Asia." },
          { cells: ["Cirus", "Trombay, Mumbai", "1960"] },
          { cells: ["Zerlina", "Trombay, Mumbai", "1961"] },
          { cells: ["Purnima", "Trombay, Mumbai", "1972"] },
          { cells: ["Dhruva", "Trombay, Mumbai", "1985"] },
        ],
        caption: "All five are research reactors of the Bhabha Atomic Research Centre.",
      },
      selfCheckExample: {
        prompt: "Name two radioactive isotopes released into the air by the Chernobyl accident.",
        steps: ["The reactor's fission products escaped in the accident."],
        answer: "Any two of iodine-131, caesium-137, strontium-90 and plutonium",
      },
      practiceSet: [
        { prompt: "In which year did India's first nuclear reactor start working?", answer: "1956" },
        { prompt: "Where is the Apsara reactor?", answer: "At Trombay, Mumbai" },
        { prompt: "Which isotope of uranium is the usual fuel in a nuclear reactor?", answer: "Uranium-235" },
        { prompt: "In which year did the Chernobyl accident happen?", answer: "1986" },
      ],
      pyqExampleId: "6ba322e4-dcb7-4a78-8b80-b7ca4f5e07e7",
      traps: [
        {
          title: "Naming Cirus as the first reactor",
          body: "Apsara (1956) came first. Cirus started four years later, in 1960.",
        },
        {
          title: "Expecting medical isotopes from Chernobyl",
          body: "Chernobyl released fission products such as iodine-131, caesium-137 and strontium-90, not isotopes made for medicine like cobalt-60 or phosphorus-32.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9sura-uses",
      name: "Radioactive isotopes and their uses",
      intuition:
        "Each useful radioactive isotope has one job it is known for. Doctors use some to find or treat disease, engineers use one to look for cracks inside metal, and farmers use gamma rays to keep food fresh. Learn the isotope and its job as a pair.",
      definition:
        "- **Medicine**: cobalt-60 (cancer treatment), iodine-131 (thyroid), phosphorus-32 (polycythemia, a disease with too many red blood cells), arsenic-74 (detecting small tumours), radium-223 (cancer that has spread to bone).\n" +
        "- **Industry**: iridium-192 in **radiography cameras** that find cracks in welds; krypton-85 in **HID lamps**.\n" +
        "- **Food and farming**: the gamma rays of cobalt-60 kill microbes so food keeps longer and stop onions and potatoes from sprouting.\n" +
        "- **Dating**: carbon-14 tells the age of old wood and bones.",
      table: {
        columns: ["Isotope", "Use"],
        rows: [
          { cells: ["Cobalt-60", "Treating cancer (including brain tumours), preserving food, stopping sprouting of onions and potatoes"] },
          { cells: ["Iodine-131", "Treating thyroid disorders such as hyperthyroidism"] },
          { cells: ["Phosphorus-32", "Treating polycythemia"] },
          { cells: ["Arsenic-74", "Detecting small tumours"], noteAmber: "Cobalt-60 treats tumours; arsenic-74 finds them." },
          { cells: ["Radium-223", "Treating cancer that has spread to bone"] },
          { cells: ["Iridium-192", "Radiography cameras to find cracks in metal"] },
          { cells: ["Krypton-85", "High intensity discharge (HID) lamps"] },
          { cells: ["Carbon-14", "Finding the age of old wood and bones"] },
        ],
        caption: "An analogy question pairs one isotope with its use and asks for another pair.",
      },
      selfCheckExample: {
        prompt: "Which radioactive isotope is used to treat disorders of the thyroid gland?",
        steps: ["The thyroid takes up iodine, so a radioactive iodine isotope reaches it directly."],
        answer: "Iodine-131",
      },
      practiceSet: [
        { prompt: "Which isotope is used to treat polycythemia?", answer: "Phosphorus-32" },
        { prompt: "Name three uses of cobalt-60.", answer: "Treating cancer, preserving food, and stopping onions and potatoes from sprouting" },
        { prompt: "Which isotope is used to detect small tumours in the body?", answer: "Arsenic-74" },
        { prompt: "Which radioactive isotope is used to find the age of old bones?", answer: "Carbon-14" },
      ],
      pyqExampleId: "6a75feb4-e206-4ce4-ac3e-8ffae83052b2",
      traps: [
        {
          title: "Using cobalt-60 to detect tumours",
          body: "Cobalt-60 is used to treat cancer. Small tumours are detected with arsenic-74.",
        },
        {
          title: "Giving krypton-82 to HID lamps",
          body: "HID lamps use krypton-85.",
        },
        {
          title: "Using iodine-131 for polycythemia",
          body: "Iodine-131 is for the thyroid. Polycythemia is treated with phosphorus-32.",
        },
      ],
    },
  ],
};
