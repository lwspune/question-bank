import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AT_MODELS_NOTE: SubtopicNote = {
  subtopicName: "Atomic Models and Subatomic Particles",
  title: "Atomic Models and Subatomic Particles",
  oneLineDefinition:
    "Dalton, Thomson, Rutherford and Bohr each improved the picture of the atom, ending with a tiny positive nucleus of protons and neutrons and electrons in fixed shells; protons and neutrons are themselves made of quarks.",
  whyItMatters:
    "Seven questions in the bank, two EASY, four MODERATE and one HARD. Three are about the models of the atom (what Rutherford saw, Bohr's fixed orbits, which metal foil can be used), and four about the particles: what a quark is, which family protons belong to, how many electrons would make up a body, and why a neon sign glows.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9atmo-models",
      name: "Models of the atom from Dalton to Bohr",
      intuition:
        "Rutherford fired alpha particles at a very thin gold foil. Nearly all of them went straight through, as if the foil were empty. A few bent away, and a very few bounced back, as if they had hit something tiny, heavy and positive. That tiny thing is the nucleus, and the rest of the atom is mostly empty space.",
      definition:
        "- **Rutherford's observations**: **most** alpha particles passed **straight through** the gold foil; **some** were turned through **small** angles; **a few** through **large** angles; **very few** (about 1 in 20,000) **bounced back**.\n" +
        "- **Rutherford's conclusions**: the atom is mostly **empty space**; its positive charge and nearly all its mass sit in a tiny **nucleus**; electrons move around the nucleus.\n" +
        "- Gold was chosen because it is the **most malleable** metal and can be beaten into an extremely thin foil. Aluminium is also highly malleable, and its thin foil **can also** be used.\n" +
        "- **Bohr**: electrons move only in certain **fixed orbits (shells)** with fixed energy. An electron **cannot stay between** two orbits; it jumps from one to another by taking in or giving out energy.",
      table: {
        columns: ["Scientist", "Model or discovery", "Main idea"],
        rows: [
          { cells: ["John Dalton", "Atomic theory", "Atoms are tiny, solid and cannot be divided"] },
          { cells: ["J. J. Thomson", "Discovered the electron; plum pudding model", "A sphere of positive charge with electrons stuck in it"] },
          { cells: ["Ernest Rutherford", "Gold foil experiment; nuclear model", "A tiny, dense, positive nucleus; the atom is mostly empty space"] },
          { cells: ["Niels Bohr", "Bohr model", "Electrons move only in fixed orbits and cannot stay between them"] },
          { cells: ["James Chadwick", "Discovered the neutron", "The nucleus also holds neutral particles"] },
        ],
        caption: "Each model kept what the earlier one got right and fixed what it got wrong.",
      },
      selfCheckExample: {
        prompt: "In Rutherford's experiment, what did the few alpha particles that bounced straight back tell him about the atom?",
        steps: ["Only something small, heavy and positive could turn a fast alpha particle right round.", "Because so few bounced back, that part must be very small."],
        answer: "That the atom has a tiny, dense, positively charged nucleus at its centre",
      },
      practiceSet: [
        { prompt: "In Rutherford's experiment, what did most of the alpha particles do?", answer: "They passed straight through the gold foil" },
        { prompt: "Which scientist said that electrons move only in fixed orbits?", answer: "Niels Bohr" },
        { prompt: "Why was gold used for the foil in Rutherford's experiment?", answer: "Gold is the most malleable metal, so it can be made into an extremely thin foil" },
        { prompt: "Who discovered the neutron?", answer: "James Chadwick" },
      ],
      pyqExampleId: "cc273fff-f92d-452b-a85f-15092577efde",
      traps: [
        {
          title: "Thinking most alpha particles bounced back",
          body: "Most went straight through. Only very few, about 1 in 20,000, bounced back. That is why the nucleus must be tiny.",
        },
        {
          title: "Thinking only gold foil works",
          body: "Gold was chosen for being the most malleable metal, but thin aluminium foil can also be used to scatter alpha particles.",
        },
        {
          title: "Giving Rutherford the fixed orbits",
          body: "Rutherford found the nucleus. The idea that electrons stay in fixed orbits and cannot be between them is Bohr's.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9atmo-particles",
      name: "Protons, neutrons, electrons and quarks",
      intuition:
        "The atom is built from three particles. Protons and neutrons are heavy and sit in the nucleus; electrons are about 1836 times lighter and move around it. Protons and neutrons are not the smallest pieces: each is made of three quarks. Electrons are not made of anything smaller.",
      definition:
        "- **Proton**: charge +1, mass about \\(1.67 \\times 10^{-24}\\) g, in the nucleus.\n" +
        "- **Neutron**: no charge, mass almost the same as a proton, in the nucleus.\n" +
        "- **Electron**: charge −1, mass about \\(9.1 \\times 10^{-28}\\) g (about 1836 times lighter than a proton), around the nucleus.\n" +
        "- **Quarks** are **fundamental constituents of matter**. Protons and neutrons are each made of three quarks; particles made of quarks are called **hadrons**. The electron is not made of quarks: it belongs to another family, the **leptons**.\n" +
        "- **Discharge tubes** (neon signs, fluorescent tubes) hold a gas at **low pressure**. A high voltage makes it conduct, and the moving **charged particles** (electrons and ions) make the gas glow.\n" +
        "- To count particles in a mass, divide the total mass by the mass of one particle, in the same unit.",
      formula: {
        label: "Number of particles in a mass",
        latex: "N = \\frac{M}{m}",
        symbols: [
          { symbol: "N", meaning: "number of particles" },
          { symbol: "M", meaning: "total mass" },
          { symbol: "m", meaning: "mass of one particle, in the same unit as M" },
        ],
      },
      authoredExample: {
        prompt: "Suppose a speck of dust of mass 9.1 mg were made only of electrons. The mass of one electron is \\(9.1 \\times 10^{-28}\\) g. How many electrons would it contain?",
        steps: [
          "Change to grams: 9.1 mg \\(= 9.1 \\times 10^{-3}\\) g.",
          "\\(N = \\frac{9.1 \\times 10^{-3}}{9.1 \\times 10^{-28}} = 10^{-3 + 28} = 10^{25}\\).",
        ],
        answer: "\\(10^{25}\\) electrons",
      },
      selfCheckExample: {
        prompt: "What is the total mass of \\(10^{20}\\) electrons, if one electron has a mass of \\(9.1 \\times 10^{-28}\\) g?",
        steps: ["Total mass \\(= 10^{20} \\times 9.1 \\times 10^{-28} = 9.1 \\times 10^{-8}\\) g."],
        answer: "\\(9.1 \\times 10^{-8}\\) g",
      },
      practiceSet: [
        { prompt: "Which two particles of the atom are made of quarks?", answer: "Protons and neutrons" },
        { prompt: "What is the charge on a neutron?", answer: "It has no charge" },
        { prompt: "What makes the gas in a neon sign glow?", answer: "Charged particles (electrons and ions) moving through the gas at low pressure" },
        { prompt: "Roughly how many times heavier is a proton than an electron?", answer: "About 1836 times" },
      ],
      pyqExampleId: "65a6b4db-1438-4c19-95aa-8a6d03bfb096",
      traps: [
        {
          title: "Calling the electron a hadron",
          body: "Hadrons are made of quarks, like the proton and the neutron. The electron is a lepton: it is not made of quarks.",
        },
        {
          title: "Dividing kilograms by grams",
          body: "Put the total mass and the mass of one particle in the same unit before dividing: 1 kg is 1000 g.",
        },
        {
          title: "Thinking a discharge tube glows because the gas is hot",
          body: "The gas is at low pressure and not strongly heated. It glows because charged particles move through it.",
        },
      ],
    },
  ],
};
