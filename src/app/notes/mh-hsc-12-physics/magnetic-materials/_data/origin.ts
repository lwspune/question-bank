import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MM_ORIGIN_NOTE: SubtopicNote = {
  subtopicName: "Origin of Magnetism in Materials",
  title: "Origin of Magnetism: the Revolving Electron",
  oneLineDefinition:
    "Why atoms behave like tiny magnets: an electron going round its orbit is a current loop, which gives the orbital magnetic moment, the gyromagnetic ratio and the Bohr magneton.",
  whyItMatters:
    "7 questions. Four were set in board papers: derive the orbital magnetic moment of a revolving electron (2020 and 2026), write the formula for the Bohr magneton (2023), and pick the gyromagnetic ratio of the electron (2025). The textbook adds the moment and angular momentum of an electron in a given orbit, and the value of the gyromagnetic ratio.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmm-orbital-moment",
      name: "Orbital magnetic moment of a revolving electron",
      intuition:
        "An electron going round the nucleus is charge going round a closed path, and that is a current loop. A current loop is a magnet, so every orbiting electron is a tiny magnet. The electron also spins, which adds a spin magnetic moment. In a pair of electrons the moments cancel, so only atoms with unpaired electrons carry a net moment.",
      definition:
        "Board derivation, one step a line (textbook labelling):\n" +
        "- An electron of charge e moves with speed v in a circular orbit of radius r. It is equivalent to a tiny current loop.\n" +
        "- It covers \\(2\\pi r\\) in one period T, so \\(v = \\dfrac{2\\pi r}{T}\\).\n" +
        "- Current: \\(I = \\dfrac{e}{T} = \\dfrac{e\\omega}{2\\pi} = \\dfrac{ev}{2\\pi r}\\).\n" +
        "- Magnetic moment of a loop: \\(m_{orb} = IA = \\dfrac{ev}{2\\pi r} \\times \\pi r^2 = \\dfrac{1}{2}evr\\).\n" +
        "- Orbital angular momentum: \\(L = m_e vr\\), so \\(m_{orb} = \\left(\\dfrac{e}{2m_e}\\right)L\\).\n" +
        "- The electron is negative, so \\(\\vec{m}_{orb} = -\\dfrac{e}{2m_e}\\vec{L}\\): opposite to \\(\\vec{L}\\) and perpendicular to the plane of the orbit.\n" +
        "- The total moment of an atom is the vector sum of the orbital and spin moments. Paired electrons cancel; atoms with unpaired electrons have a net moment.",
      formula: {
        label: "Orbital magnetic moment",
        latex: "I = \\frac{ev}{2\\pi r}, \\qquad m_{orb} = \\frac{1}{2}evr = \\left(\\frac{e}{2m_e}\\right)L",
        symbols: [
          { symbol: "\\(e\\)", meaning: "charge of the electron" },
          { symbol: "\\(v\\)", meaning: "orbital speed" },
          { symbol: "\\(r\\)", meaning: "radius of the orbit" },
          { symbol: "\\(L\\)", meaning: "orbital angular momentum, \\(m_e vr\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "An electron revolves in a circular orbit of radius \\(1 \\times 10^{-10}\\) m with a speed of \\(1 \\times 10^{6}\\) m/s. Find the equivalent current and the orbital magnetic moment. (\\(e = 1.6 \\times 10^{-19}\\) C)",
        steps: [
          "Given: \\(r = 1 \\times 10^{-10}\\) m, \\(v = 1 \\times 10^{6}\\) m/s, \\(e = 1.6 \\times 10^{-19}\\) C.",
          "Current: \\(I = \\dfrac{ev}{2\\pi r} = \\dfrac{1.6 \\times 10^{-19} \\times 10^{6}}{2\\pi \\times 10^{-10}} = 2.55 \\times 10^{-4}\\) A.",
          "Moment: \\(m_{orb} = \\dfrac{1}{2}evr = 0.5 \\times 1.6 \\times 10^{-19} \\times 10^{6} \\times 10^{-10}\\).",
          "\\(m_{orb} = 8 \\times 10^{-24}\\) A m².",
        ],
        answer: "Current \\(2.55 \\times 10^{-4}\\) A; moment \\(8 \\times 10^{-24}\\) A m²",
      },
      selfCheckExample: {
        prompt:
          "An electron goes round an orbit of radius \\(5.3 \\times 10^{-11}\\) m at \\(6.6 \\times 10^{15}\\) revolutions per second. Find the current and the magnetic moment of the loop. (\\(e = 1.6 \\times 10^{-19}\\) C)",
        steps: [
          "\\(I = ef = 1.6 \\times 10^{-19} \\times 6.6 \\times 10^{15} = 1.06 \\times 10^{-3}\\) A.",
          "\\(m = I\\pi r^2 = 1.06 \\times 10^{-3} \\times 3.14 \\times (5.3 \\times 10^{-11})^2 = 9.3 \\times 10^{-24}\\) A m².",
        ],
        answer: "\\(1.06 \\times 10^{-3}\\) A; \\(9.3 \\times 10^{-24}\\) A m²",
      },
      practiceSet: [
        { prompt: "An electron goes round its orbit \\(10^{15}\\) times a second. What current does it make? (\\(e = 1.6 \\times 10^{-19}\\) C)", answer: "\\(1.6 \\times 10^{-4}\\) A" },
        { prompt: "How is the orbital magnetic moment of an electron directed compared with its orbital angular momentum?", answer: "Opposite to it, because the electron is negative" },
        { prompt: "Which two motions of an electron give an atom its magnetic moment?", answer: "Its orbital motion round the nucleus and its spin" },
        { prompt: "Why does an atom whose electrons are all paired have no net magnetic moment?", answer: "The moments of the two electrons of each pair cancel" },
      ],
      pyqExampleId: "a19b2071-0dee-4199-8546-b0fe933c90c3",
      traps: [
        {
          title: "Stopping at evr/2 when L is asked",
          body: "Many papers want the moment in terms of angular momentum too. Finish with \\(m_{orb} = (e/2m_e)L\\) and state that it is opposite to \\(\\vec{L}\\).",
        },
        {
          title: "Using the circumference for the area",
          body: "The moment is current times the AREA of the loop, \\(\\pi r^2\\), not the circumference \\(2\\pi r\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmm-gyromagnetic-bohr",
      name: "Gyromagnetic ratio and the Bohr magneton",
      intuition:
        "The ratio of an electron's magnetic moment to its angular momentum is the same for every orbit: it depends only on the electron's charge and mass. Bohr's rule lets the angular momentum take only whole-number steps of h/2π, so the orbital moment also comes in whole-number steps. The smallest step is the Bohr magneton, the natural unit for atomic magnets.",
      definition:
        "- **Gyromagnetic ratio:** \\(\\dfrac{m_{orb}}{L} = \\dfrac{e}{2m_e} = 8.8 \\times 10^{10}\\) C kg⁻¹ for an electron.\n" +
        "- Bohr's second postulate: \\(L = m_e vr = \\dfrac{nh}{2\\pi}\\), with \\(n = 1, 2, 3, \\dots\\)\n" +
        "- Substituting: \\(m_{orb} = \\dfrac{e}{2m_e} \\times \\dfrac{nh}{2\\pi} = \\dfrac{neh}{4\\pi m_e}\\).\n" +
        "- For \\(n = 1\\): \\(\\mu_B = \\dfrac{eh}{4\\pi m_e} = 9.274 \\times 10^{-24}\\) A m², the **Bohr magneton**.\n" +
        "- So the orbital moment in the \\(n^{th}\\) orbit is \\(n\\mu_B\\). Atomic moments are stated in Bohr magnetons (B.M.).",
      formula: {
        label: "Gyromagnetic ratio and Bohr magneton",
        latex: "\\frac{m_{orb}}{L} = \\frac{e}{2m_e}, \\qquad m_{orb} = \\frac{neh}{4\\pi m_e}, \\qquad \\mu_B = \\frac{eh}{4\\pi m_e}",
        symbols: [
          { symbol: "\\(h\\)", meaning: "Planck's constant" },
          { symbol: "\\(m_e\\)", meaning: "mass of the electron" },
          { symbol: "\\(n\\)", meaning: "number of the orbit" },
        ],
      },
      authoredExample: {
        prompt:
          "Calculate the value of the Bohr magneton. (\\(e = 1.6 \\times 10^{-19}\\) C, \\(h = 6.63 \\times 10^{-34}\\) J s, \\(m_e = 9.1 \\times 10^{-31}\\) kg)",
        steps: [
          "Formula: \\(\\mu_B = \\dfrac{eh}{4\\pi m_e}\\).",
          "Substitution: \\(\\mu_B = \\dfrac{1.6 \\times 10^{-19} \\times 6.63 \\times 10^{-34}}{4 \\times 3.14 \\times 9.1 \\times 10^{-31}} = \\dfrac{1.061 \\times 10^{-52}}{1.143 \\times 10^{-29}}\\).",
          "\\(\\mu_B = 9.28 \\times 10^{-24}\\) A m².",
        ],
        answer: "\\(9.28 \\times 10^{-24}\\) A m² (accepted value \\(9.274 \\times 10^{-24}\\) A m²)",
      },
      selfCheckExample: {
        prompt: "Find the orbital magnetic moment of an electron in the third Bohr orbit, in Bohr magnetons and in A m².",
        steps: ["\\(m_{orb} = n\\mu_B = 3\\mu_B\\).", "\\(3 \\times 9.274 \\times 10^{-24} = 2.78 \\times 10^{-23}\\) A m²."],
        answer: "3 B.M., that is \\(2.78 \\times 10^{-23}\\) A m²",
      },
      practiceSet: [
        { prompt: "What is the SI unit of the gyromagnetic ratio?", answer: "C kg⁻¹" },
        { prompt: "Does the gyromagnetic ratio of an electron change from one orbit to another?", answer: "No. It is \\(e/2m_e\\) for every orbit" },
        { prompt: "What is the orbital angular momentum of an electron in the second Bohr orbit?", answer: "\\(h/\\pi\\), which is \\(2.11 \\times 10^{-34}\\) J s" },
        { prompt: "What is the SI unit of the Bohr magneton?", answer: "A m²" },
      ],
      pyqExampleId: "4485fd99-7e5c-4bde-8215-05772470bb8f",
      traps: [
        {
          title: "Turning the ratio upside down",
          body: "The gyromagnetic ratio is \\(e/2m_e\\), moment divided by angular momentum. \\(2m_e/e\\) is a distractor the board has used.",
        },
        {
          title: "Leaving out n",
          body: "For the \\(n^{th}\\) orbit the moment is \\(neh/4\\pi m_e\\). The Bohr magneton itself is the \\(n = 1\\) value, so say so when you write it.",
        },
        {
          title: "Writing the unit of a moment as A/m²",
          body: "Every magnetic moment, the Bohr magneton included, is current times area: A m², ampere times square metre.",
        },
      ],
    },
  ],
};
