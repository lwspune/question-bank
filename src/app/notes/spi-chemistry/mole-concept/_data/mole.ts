import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_MO_MOLE_NOTE: SubtopicNote = {
  subtopicName: "The Mole and Avogadro's Number",
  title: "The Mole and Avogadro's Number",
  oneLineDefinition:
    "A mole is 6.022 × 10²³ particles, the number in one gram molecular mass of a substance, and it lets you count atoms, molecules and even electrons by weighing.",
  whyItMatters:
    "Three questions in the bank, one EASY, one MODERATE and one HARD: how many molecules are in one gram molecular mass, which flask holds more oxygen atoms, and which metals need the same charge to deposit one mole. Each is a count of particles, so the skill is multiplying by the right number per molecule or per ion.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spimomo-avogadro",
      name: "Moles, Avogadro's number and counting atoms",
      intuition:
        "A dozen means 12 of anything; a mole means 6.022 × 10²³ of anything. Chemists use it because one mole of a substance weighs, in grams, the same number as its molecular mass. So you can count particles on a balance.",
      definition:
        "- **1 mole** of any substance contains **6.022 × 10²³** particles. This is **Avogadro's number**, \\(N_A\\).\n" +
        "- The **gram molecular mass** (molecular mass written in grams) of a substance is **one mole** of it, so it holds \\(N_A\\) **molecules**. Likewise one gram atomic mass holds \\(N_A\\) atoms.\n" +
        "- **Moles** \\(=\\) mass in grams \\(\\div\\) molar mass. **Particles** \\(=\\) moles \\(\\times N_A\\).\n" +
        "- To count **atoms**, multiply the moles of molecules by the number of atoms in each molecule: 1 mole of \\(\\text{O}_2\\) has 2 moles of oxygen atoms, 1 mole of \\(\\text{O}_3\\) has 3.\n" +
        "- Atomic masses used here: H 1, C 12, N 14, O 16.",
      formula: {
        label: "Moles and particles",
        latex: "n = \\frac{m}{M} \\qquad N = n \\times N_A \\qquad N_A = 6.022 \\times 10^{23}",
        symbols: [
          { symbol: "n", meaning: "number of moles" },
          { symbol: "m", meaning: "mass in grams" },
          { symbol: "M", meaning: "molar mass in grams per mole" },
          { symbol: "N", meaning: "number of particles" },
        ],
      },
      authoredExample: {
        prompt: "How many molecules are there in 36 g of water? (H = 1, O = 16)",
        steps: [
          "Molar mass of \\(\\text{H}_2\\text{O} = 2 + 16 = 18\\) g.",
          "Moles \\(= \\frac{36}{18} = 2\\).",
          "Molecules \\(= 2 \\times 6.022 \\times 10^{23} = 1.2044 \\times 10^{24}\\).",
        ],
        answer: "\\(1.2044 \\times 10^{24}\\) molecules",
      },
      selfCheckExample: {
        prompt: "How many moles of oxygen atoms are there in 2 moles of carbon dioxide?",
        steps: ["Each \\(\\text{CO}_2\\) molecule has 2 oxygen atoms.", "\\(2 \\times 2 = 4\\) moles of oxygen atoms."],
        answer: "4 moles",
      },
      practiceSet: [
        { prompt: "How many moles are there in 88 g of carbon dioxide? (C = 12, O = 16)", answer: "\\(\\frac{88}{44} = 2\\) moles" },
        { prompt: "How many molecules are there in 0.25 mole of a gas?", answer: "\\(0.25 \\times 6.022 \\times 10^{23} = 1.5055 \\times 10^{23}\\)" },
        { prompt: "What is the mass of 3 moles of ammonia, \\(\\text{NH}_3\\)? (N = 14, H = 1)", answer: "\\(3 \\times 17 = 51\\) g" },
        { prompt: "Which holds more oxygen atoms: 1 mole of \\(\\text{O}_2\\) or 1 mole of \\(\\text{O}_3\\)?", answer: "1 mole of \\(\\text{O}_3\\) (3 moles of atoms against 2)" },
      ],
      pyqExampleId: "bc5b8193-443d-48d4-8c4c-9c5ca6170f81",
      traps: [
        {
          title: "Counting molecules when atoms are asked",
          body:
            "Moles of molecules and moles of atoms differ for any element that is not monoatomic. Multiply by the atoms in each molecule before comparing.",
        },
        {
          title: "Dividing by Avogadro's number",
          body: "Particles \\(=\\) moles \\(\\times N_A\\). One mole holds \\(N_A\\) particles itself, \\(6.022 \\times 10^{23}\\), not \\(\\frac{1}{N_A}\\). Dividing by \\(N_A\\) gives a tiny fraction that cannot be a count.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spimomo-faraday",
      name: "Charge needed to deposit one mole of a metal",
      intuition:
        "To turn a metal ion back into a metal atom in electrolysis, you must hand it back the electrons it lost. An ion with a charge of 2+ needs two electrons per atom, so a mole of such ions needs two moles of electrons.",
      definition:
        "- One mole of electrons carries a charge of about **96,500 coulombs**. This amount of charge is called **one faraday** (1 F).\n" +
        "- To deposit one mole of a metal from ions of charge \\(n+\\), you need \\(n\\) moles of electrons, so **n faradays**.\n" +
        "- So metals need the **same charge per mole** only if their ions carry the **same charge**.",
      formula: {
        label: "Charge to deposit one mole of metal",
        latex: "Q = n \\times 96500\\ \\text{C} \\quad \\text{for ions of charge } n+",
      },
      authoredExample: {
        prompt: "How much charge is needed to deposit one mole of aluminium from \\(\\text{Al}^{3+}\\) ions?",
        steps: [
          "Each \\(\\text{Al}^{3+}\\) ion needs 3 electrons, so one mole needs 3 moles of electrons.",
          "\\(Q = 3 \\times 96500 = 289500\\) C, that is 3 faradays.",
        ],
        answer: "3 F, or 289,500 C",
      },
      selfCheckExample: {
        prompt: "How much charge deposits half a mole of copper from \\(\\text{Cu}^{2+}\\) ions?",
        steps: ["One mole would need 2 F.", "Half a mole needs 1 F, which is 96,500 C."],
        answer: "1 F, or 96,500 C",
      },
      practiceSet: [
        { prompt: "How many faradays deposit one mole of silver from \\(\\text{Ag}^{+}\\) ions?", answer: "1 F" },
        { prompt: "Which needs more charge per mole of metal deposited: sodium from \\(\\text{Na}^{+}\\) or calcium from \\(\\text{Ca}^{2+}\\)?", answer: "Calcium (2 F against 1 F)" },
        { prompt: "About how many coulombs make one faraday?", answer: "96,500 C" },
      ],
      pyqExampleId: "51dac406-6db5-4d1c-8eea-912bb1bb014c",
      traps: [
        {
          title: "Thinking every metal needs one faraday per mole",
          body: "One faraday deposits one mole only for a 1+ ion such as \\(\\text{Ag}^{+}\\). A 3+ ion such as \\(\\text{Al}^{3+}\\) needs 3 F per mole.",
        },
        {
          title: "Grouping metals by their mass instead of their charge",
          body: "The charge needed per mole depends only on the charge of the ion, not on how heavy the metal is. Group the metals by ion charge.",
        },
      ],
    },
  ],
};
