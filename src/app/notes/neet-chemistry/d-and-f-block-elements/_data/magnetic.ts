import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_DF_MAGNETIC_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Moment and Colour",
  title: "Magnetic Moment and Colour",
  oneLineDefinition:
    "Count the d electrons of a transition metal ion and how many are unpaired; that number decides whether the ion is paramagnetic, whether it is coloured, and its spin-only magnetic moment μ = √(n(n+2)) BM.",
  whyItMatters:
    "Four NEET questions from 2024 to 2026, all of them counting unpaired electrons. Two pick the ions, or pairs of ions, with the same spin-only moment (NEET 2024 and Re-NEET 2024), one works out the moment of Ti²⁺ (NEET 2026), and one compares the unpaired electrons in Cr²⁺ and Nd³⁺ alongside a statement on ferromagnetism (2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchdf-unpaired",
      name: "Unpaired d electrons, magnetism and colour",
      intuition:
        "Everything on this page starts from one count. Write the ion's d electrons, remembering that the 4s electrons leave first. Fill the five d orbitals one electron each before any pairs up. Unpaired electrons make the ion paramagnetic. A partly filled d subshell also lets an electron jump from a lower d orbital to a higher one by absorbing visible light, so the ion looks coloured: we see the colour that is not absorbed.",
      definition:
        "- d electrons of a 3d ion = group number minus the charge. \\(\\text{Fe}^{2+}\\): \\(8 - 2 = 6\\), so \\(3d^6\\). The 4s electrons are lost first.\n" +
        "- In a free ion, \\(d^1\\) to \\(d^5\\) have 1 to 5 unpaired electrons; \\(d^6\\), \\(d^7\\), \\(d^8\\), \\(d^9\\) have 4, 3, 2, 1; \\(d^0\\) and \\(d^{10}\\) have none.\n" +
        "- At least one unpaired electron: **paramagnetic** (attracted by a magnetic field). None: **diamagnetic** (repelled). Substances attracted very strongly are **ferromagnetic**; ferromagnetism is an extreme form of paramagnetism.\n" +
        "- **Colour** comes from a d-d transition, which needs a partly filled d subshell. \\(d^0\\) ions (\\(\\text{Sc}^{3+}\\), \\(\\text{Ti}^{4+}\\)) and \\(d^{10}\\) ions (\\(\\text{Cu}^+\\), \\(\\text{Zn}^{2+}\\)) are colourless.",
      table: {
        columns: ["Ion", "d electrons", "Unpaired electrons", "Colour in water"],
        rows: [
          { cells: ["\\(\\text{Sc}^{3+}\\)", "\\(3d^0\\)", "0", "Colourless"] },
          { cells: ["\\(\\text{Ti}^{3+}\\)", "\\(3d^1\\)", "1", "Purple"] },
          { cells: ["\\(\\text{V}^{3+}\\)", "\\(3d^2\\)", "2", "Green"] },
          { cells: ["\\(\\text{Cr}^{3+}\\)", "\\(3d^3\\)", "3", "Violet"] },
          { cells: ["\\(\\text{Mn}^{3+}\\)", "\\(3d^4\\)", "4", "Violet"] },
          { cells: ["\\(\\text{Mn}^{2+}\\)", "\\(3d^5\\)", "5", "Pink"] },
          { cells: ["\\(\\text{Fe}^{2+}\\)", "\\(3d^6\\)", "4", "Green"], noteAmber: "NEET 2024 and Re-NEET 2024: Cr²⁺ and Fe²⁺ both have 4 unpaired electrons, so the same spin-only moment." },
          { cells: ["\\(\\text{Ni}^{2+}\\)", "\\(3d^8\\)", "2", "Green"] },
          { cells: ["\\(\\text{Cu}^{2+}\\)", "\\(3d^9\\)", "1", "Blue"] },
          { cells: ["\\(\\text{Zn}^{2+}\\)", "\\(3d^{10}\\)", "0", "Colourless"] },
        ],
      },
      pyqExampleId: "802f64bf-66c0-438c-bb6a-ef8de8c836cd",
      selfCheckExample: {
        prompt: "How many unpaired electrons does \\(\\text{Co}^{2+}\\) (Co is in group 9) have, and is the ion coloured?",
        steps: [
          "d electrons: \\(9 - 2 = 7\\), so \\(\\text{Co}^{2+}\\) is \\(3d^7\\).",
          "Five electrons go one into each d orbital; the other two pair up with two of them. That leaves 3 unpaired.",
          "The d subshell is partly filled, so a d-d transition is possible and the ion is coloured (pink in water).",
        ],
        answer: "3 unpaired electrons; coloured",
      },
      practiceSet: [
        { prompt: "How many unpaired electrons does \\(\\text{Mn}^{2+}\\) have?", answer: "5 (\\(3d^5\\))" },
        { prompt: "Which of \\(\\text{Sc}^{3+}\\), \\(\\text{Ti}^{3+}\\) and \\(\\text{Zn}^{2+}\\) is coloured in water?", answer: "\\(\\text{Ti}^{3+}\\) (\\(3d^1\\))" },
        { prompt: "Is \\(\\text{Cu}^+\\) paramagnetic or diamagnetic?", answer: "Diamagnetic (\\(3d^{10}\\), no unpaired electron)" },
        { prompt: "How many unpaired electrons does \\(\\text{Ni}^{2+}\\) have?", answer: "2 (\\(3d^8\\))" },
      ],
      traps: [
        {
          title: "The 4s electrons leave first",
          body: "\\(\\text{Fe}^{2+}\\) is \\(3d^6\\), not \\(3d^4 4s^2\\). When a 3d metal forms an ion, it loses its 4s electrons before any 3d electron.",
        },
        {
          title: "Six d electrons give four unpaired, not six",
          body: "Five d orbitals hold one electron each first; the sixth must pair. So \\(d^6\\) has 4 unpaired electrons and \\(d^7\\) has 3.",
        },
        {
          title: "Colourless does not mean no d electrons",
          body: "\\(\\text{Zn}^{2+}\\) and \\(\\text{Cu}^+\\) have ten d electrons each and are colourless, because a full subshell allows no d-d transition. Colour needs a partly filled d subshell.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchdf-spin-only",
      name: "The spin-only magnetic moment",
      intuition:
        "Each unpaired electron adds to the ion's magnetic moment. Once you know the number of unpaired electrons n, one formula gives the moment in Bohr magnetons. It is the same formula used for complexes in Coordination Compounds.",
      definition:
        "- n = 1, 2, 3, 4, 5 give 1.73, 2.83, 3.87, 4.90 and 5.92 BM.\n" +
        "- The same n always gives the same moment, whatever the metal or the charge: \\(\\text{Ti}^{3+}\\) and \\(\\text{Cu}^{2+}\\) (n = 1), \\(\\text{V}^{3+}\\) and \\(\\text{Ni}^{2+}\\) (n = 2), \\(\\text{Cr}^{2+}\\) and \\(\\text{Fe}^{2+}\\) (n = 4).\n" +
        "- To go backwards from a moment, square it: \\(\\mu^2 = n(n+2)\\), then find the whole number n.",
      formula: {
        label: "Spin-only magnetic moment",
        latex: "\\mu = \\sqrt{n(n+2)}\\ \\text{BM}",
        symbols: [
          { symbol: "\\(\\mu\\)", meaning: "spin-only magnetic moment in Bohr magnetons (BM)" },
          { symbol: "\\(n\\)", meaning: "number of unpaired electrons" },
        ],
      },
      authoredExample: {
        prompt: "Find the spin-only magnetic moment of \\(\\text{Fe}^{3+}\\) (Z = 26).",
        steps: [
          "Fe is \\([\\text{Ar}]3d^6 4s^2\\). \\(\\text{Fe}^{3+}\\) loses the two 4s electrons and one 3d electron: \\(3d^5\\).",
          "Five d electrons in five d orbitals: \\(n = 5\\).",
          "\\(\\mu = \\sqrt{5 \\times 7} = \\sqrt{35} = 5.92\\) BM.",
        ],
        answer: "5.92 BM",
      },
      selfCheckExample: {
        prompt: "A 3d metal ion has a spin-only magnetic moment of 4.90 BM. How many unpaired electrons does it have?",
        steps: [
          "\\(\\mu^2 = 4.90^2 = 24.0\\), so \\(n(n+2) = 24\\).",
          "\\(n = 4\\) gives \\(4 \\times 6 = 24\\).",
        ],
        answer: "4",
      },
      practiceSet: [
        { prompt: "Find the spin-only magnetic moment of \\(\\text{Cr}^{3+}\\) (Z = 24).", answer: "\\(3d^3\\), n = 3: \\(\\sqrt{15} = 3.87\\) BM" },
        { prompt: "Find the spin-only magnetic moment of \\(\\text{Cu}^{2+}\\) (Z = 29).", answer: "\\(3d^9\\), n = 1: \\(\\sqrt{3} = 1.73\\) BM" },
        { prompt: "What is the spin-only magnetic moment of \\(\\text{Zn}^{2+}\\)?", answer: "0 BM (\\(3d^{10}\\), no unpaired electron)" },
        { prompt: "Which has the larger spin-only magnetic moment, \\(\\text{Mn}^{2+}\\) or \\(\\text{Fe}^{2+}\\)?", answer: "\\(\\text{Mn}^{2+}\\): 5.92 BM against 4.90 BM" },
      ],
      pyqExampleId: "28284ac8-be90-44e5-92da-59a71f4f6eac",
      traps: [
        {
          title: "The formula is n(n+2), not n(n+1)",
          body: "For three unpaired electrons \\(\\mu = \\sqrt{3 \\times 5} = \\sqrt{15} = 3.87\\) BM. Using \\(\\sqrt{3 \\times 4}\\) gives 3.46, a value that matches no ion.",
        },
        {
          title: "Equal unpaired electrons, equal moments",
          body: "\\(\\text{Cr}^{2+}\\) (\\(d^4\\)) and \\(\\text{Fe}^{2+}\\) (\\(d^6\\)) have different d counts but the same 4 unpaired electrons, so both have 4.90 BM. Compare n, not the number of d electrons.",
        },
      ],
    },
  ],
};
