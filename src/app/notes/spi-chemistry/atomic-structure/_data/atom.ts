import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_AT_ATOM_NOTE: SubtopicNote = {
  subtopicName: "Structure of the Atom",
  title: "Structure of the Atom",
  oneLineDefinition:
    "An atom is a tiny positive nucleus of protons and neutrons, with electrons moving around it in fixed shells.",
  whyItMatters:
    "Five questions in the bank, two EASY and three MODERATE: who found the nucleus, which way an electron moves when it gains energy, protons and neutrons from atomic and mass numbers, isobars, and the ion an element forms. Each one rests on a fact you can learn on this page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiatam-models",
      name: "The particles of the atom and the models that found them",
      intuition:
        "The atom was opened up one discovery at a time. First the electron, then the proton, then Rutherford's surprise that the atom is mostly empty with a tiny heavy centre, and then Bohr's idea that electrons sit in fixed shells. Learn who found what, and what each experiment showed.",
      definition:
        "- **Thomson** found the **electron** (negative) in cathode rays and pictured the atom as a positive ball with electrons stuck in it, like a Christmas pudding.\n" +
        "- **Rutherford** fired alpha particles at thin gold foil. Most went straight through, a few were turned aside and very few bounced back. So the atom is **mostly empty space** with a tiny, heavy, positive **nucleus**.\n" +
        "- **Bohr** said electrons move only in fixed orbits (shells K, L, M, N from the nucleus outwards) and do not lose energy while they stay in one.\n" +
        "- Moving to a shell **farther** from the nucleus, an electron **gains** energy. Moving **closer**, it **loses** energy.",
      table: {
        columns: ["Discovery or model", "Scientist", "What it showed"],
        rows: [
          { cells: ["Electron", "J.J. Thomson", "Cathode rays carry negative particles"] },
          { cells: ["Proton", "E. Goldstein", "Canal rays carry positive particles"] },
          { cells: ["Neutron", "James Chadwick", "A particle with no charge and a mass close to a proton's"] },
          {
            cells: ["Nucleus", "Ernest Rutherford", "Alpha-particle scattering from gold foil: a tiny, dense, positive centre"],
            noteAmber: "The scattering experiment found the nucleus, not the proton or the neutron.",
          },
          { cells: ["Fixed orbits", "Niels Bohr", "Electrons move in shells K, L, M, N without losing energy"] },
        ],
        caption: "Energy rises with distance from the nucleus: K is the lowest shell.",
      },
      selfCheckExample: {
        prompt: "An electron moves from the M shell to the K shell. Does it gain or lose energy?",
        steps: [
          "The K shell is closer to the nucleus than the M shell.",
          "Moving closer to the nucleus, an electron gives out energy.",
        ],
        answer: "It loses energy.",
      },
      practiceSet: [
        { prompt: "Who discovered the neutron?", answer: "James Chadwick" },
        { prompt: "What charge does a neutron carry?", answer: "No charge" },
        {
          prompt: "In Rutherford's gold foil experiment, most alpha particles passed straight through. What did this show?",
          answer: "Most of the atom is empty space",
        },
        { prompt: "Name the first four electron shells, starting nearest the nucleus.", answer: "K, L, M, N" },
        {
          prompt: "An electron jumps from the K shell to the L shell. Does it absorb or give out energy?",
          answer: "It absorbs energy (it moves away from the nucleus)",
        },
      ],
      pyqExampleId: "a717d7d1-5892-41dc-9f44-e00bb848a2b2",
      traps: [
        {
          title: "Crediting Rutherford with the proton",
          body:
            "Rutherford's gold foil experiment showed the nucleus. The electron was found by Thomson, the proton by Goldstein in canal rays and the neutron by Chadwick.",
        },
        {
          title: "Getting the energy direction backwards",
          body:
            "An electron needs energy to move away from the nucleus and gives energy out when it falls closer. If an electron loses energy going from one orbit to another, the second orbit is the nearer one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiatam-numbers",
      name: "Atomic number, mass number, isotopes and isobars",
      intuition:
        "Two numbers describe every atom. The atomic number counts its protons and decides which element it is. The mass number counts protons and neutrons together. Subtract and you have the neutrons.",
      definition:
        "- **Atomic number** \\(Z\\) = number of protons = number of electrons in a neutral atom.\n" +
        "- **Mass number** \\(A\\) = protons + neutrons.\n" +
        "- Written as \\(^{A}_{Z}\\mathrm{X}\\): the mass number on top, the atomic number below.\n" +
        "- **Isotopes**: same atomic number, different mass numbers (\\(^{12}_{6}\\mathrm{C}\\), \\(^{14}_{6}\\mathrm{C}\\)). Same electrons, so the **same chemical properties**.\n" +
        "- **Isobars**: same mass number, different atomic numbers. Different elements, so **different chemical properties**.",
      formula: {
        label: "Mass number and neutrons",
        latex: "A = Z + N \\qquad N = A - Z",
        symbols: [
          { symbol: "A", meaning: "mass number (protons + neutrons)" },
          { symbol: "Z", meaning: "atomic number (protons)" },
          { symbol: "N", meaning: "number of neutrons" },
        ],
      },
      authoredExample: {
        prompt: "A phosphorus atom is written \\(^{31}_{15}\\mathrm{P}\\). Find its protons, electrons and neutrons.",
        steps: [
          "The lower number is the atomic number: 15 protons.",
          "A neutral atom has as many electrons as protons: 15 electrons.",
          "Neutrons \\(= A - Z = 31 - 15 = 16\\).",
        ],
        answer: "15 protons, 15 electrons, 16 neutrons.",
      },
      selfCheckExample: {
        prompt: "Carbon has the atoms \\(^{12}_{6}\\mathrm{C}\\) and \\(^{14}_{6}\\mathrm{C}\\). How many neutrons does each have, and what are such atoms called?",
        steps: [
          "\\(12 - 6 = 6\\) neutrons and \\(14 - 6 = 8\\) neutrons.",
          "Same atomic number, different mass numbers: isotopes.",
        ],
        answer: "6 and 8 neutrons. They are isotopes.",
      },
      practiceSet: [
        { prompt: "An atom has 11 protons and 12 neutrons. What is its mass number?", answer: "23" },
        { prompt: "An atom has mass number 27 and 14 neutrons. What is its atomic number?", answer: "13" },
        {
          prompt: "Two atoms have the same mass number but different atomic numbers. What are they called?",
          answer: "Isobars",
        },
        { prompt: "Do two isotopes of an element have the same chemical properties?", answer: "Yes, because they have the same number of electrons" },
        { prompt: "How many electrons are in a neutral atom of atomic number 8?", answer: "8" },
      ],
      pyqExampleId: "1ce628f5-7674-45c3-b3f9-811030d4b764",
      traps: [
        {
          title: "Taking the mass number as the neutron count",
          body:
            "The mass number counts protons and neutrons together. The neutrons are the mass number minus the atomic number, so \\(^{31}_{15}\\mathrm{P}\\) has 16 neutrons, not 31.",
        },
        {
          title: "Thinking a heavier atom always has the larger atomic number",
          body:
            "Order by atomic number and order by mass number can differ. Cobalt (atomic number 27, mass number 59) comes before nickel (atomic number 28, mass number 58).",
        },
        {
          title: "Giving isobars the same chemistry",
          body:
            "Isobars share only the mass number. Their atomic numbers differ, so they are different elements with different chemical properties. It is isotopes that share chemistry.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiatam-electrons",
      name: "Electron shells, valence electrons and ions",
      intuition:
        "Electrons fill the shells from the inside out. The electrons in the outermost shell, the valence electrons, decide how an atom reacts: it loses or gains electrons to end up with a full outer shell, like a noble gas.",
      definition:
        "- Shell \\(n\\) holds at most \\(2n^2\\) electrons: K 2, L 8, M 18. For the first 20 elements the outer shell takes no more than 8.\n" +
        "- Fill in order: 2 in K, then 8 in L, then M. Sodium (11) is 2, 8, 1.\n" +
        "- **Valency**: with 1 to 4 valence electrons it is that number; with 5 to 7 it is 8 minus that number. A full shell (2 for helium, 8 for the rest) means valency 0.\n" +
        "- **Metals** lose their valence electrons and form **positive ions**: 2 lost gives a dipositive ion such as \\(\\mathrm{Ca^{2+}}\\).\n" +
        "- **Non-metals** gain electrons and form **negative ions**: \\(\\mathrm{O^{2-}}\\), \\(\\mathrm{Cl^{-}}\\).",
      formula: {
        label: "Shell capacity and valency",
        latex: "\\text{electrons in shell } n \\le 2n^2 \\qquad \\text{valency} = 8 - \\text{valence electrons (5 to 7 valence electrons)}",
      },
      authoredExample: {
        prompt: "Aluminium has atomic number 13. Write its electronic configuration and the ion it forms.",
        steps: [
          "Fill the shells: K takes 2, L takes 8, which leaves \\(13 - 10 = 3\\) for M.",
          "Configuration: 2, 8, 3. There are 3 valence electrons.",
          "A metal loses its valence electrons: it loses 3 and becomes \\(\\mathrm{Al^{3+}}\\).",
        ],
        answer: "2, 8, 3, forming \\(\\mathrm{Al^{3+}}\\).",
      },
      selfCheckExample: {
        prompt: "Sulphur has atomic number 16. Write its configuration, its valency and the ion it forms.",
        steps: [
          "2, 8, 6: six valence electrons.",
          "Six is 5 to 7, so valency \\(= 8 - 6 = 2\\).",
          "It gains 2 electrons: \\(\\mathrm{S^{2-}}\\).",
        ],
        answer: "2, 8, 6; valency 2; \\(\\mathrm{S^{2-}}\\).",
      },
      practiceSet: [
        { prompt: "What is the largest number of electrons the L shell can hold?", answer: "8" },
        { prompt: "Write the electronic configuration of sodium, atomic number 11.", answer: "2, 8, 1" },
        { prompt: "Chlorine is 2, 8, 7. What ion does it form?", answer: "\\(\\mathrm{Cl^{-}}\\) (it gains one electron)" },
        { prompt: "Nitrogen has atomic number 7. What is its valency?", answer: "3 (it is 2, 5, so 8 minus 5)" },
        { prompt: "Which noble gas has the configuration 2, 8?", answer: "Neon" },
      ],
      pyqExampleId: "a2219817-4cf8-4422-a69c-f4f35baee3e3",
      traps: [
        {
          title: "Taking valency as the valence electrons every time",
          body:
            "Chlorine has 7 valence electrons but valency 1: it is easier to gain 1 electron than to lose 7. With 5 or more valence electrons, valency is 8 minus that number.",
        },
        {
          title: "Overfilling the M shell",
          body:
            "Potassium (19) is 2, 8, 8, 1, not 2, 8, 9. For the first 20 elements the outer shell holds at most 8, and the next electron starts the N shell.",
        },
      ],
    },
  ],
};
