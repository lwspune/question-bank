import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_AT_SPECTRA_NOTE: SubtopicNote = {
  subtopicName: "Atomic Spectra",
  title: "Atomic Spectra: Emission and Absorption Lines",
  oneLineDefinition:
    "Each element gives out and takes in light of certain wavelengths only, and the energies of the transitions behind those lines add up.",
  whyItMatters:
    "1 question, from a board paper: the relation between the wavelengths of three transitions among three energy levels (2024). Board 2022 asked the same relation from a figure of three levels; that question sits on the Bohr model page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpat-line-spectrum",
      name: "Emission and absorption line spectra",
      intuition:
        "Heat a gas or pass a current through it and it glows with a few sharp colours, not a rainbow. Shine white light through the same gas and those very colours go missing. Each line is one photon size, set by the gap between two energy levels of the atom.",
      definition:
        "- **Emission line spectrum:** an atomic gas or vapour excited at low pressure gives out only certain wavelengths: bright lines on a dark background. Each element has its own set, so the spectrum is a fingerprint of the gas.\n" +
        "- **Absorption spectrum:** white light passed through the gas shows dark lines at exactly the wavelengths of its emission lines.\n" +
        "- Each line is a photon of energy \\(h\\nu = \\dfrac{hc}{\\lambda}\\) equal to the gap between two energy levels.\n" +
        "- **Energies add, wavelengths do not.** For three levels with \\(E_A < E_B < E_C\\), the jump C to A releases as much energy as C to B and B to A together: \\(\\dfrac{1}{\\lambda_{CA}} = \\dfrac{1}{\\lambda_{CB}} + \\dfrac{1}{\\lambda_{BA}}\\). The direct jump gives the shortest wavelength of the three.",
      formula: {
        label: "Three levels: the reciprocals of the wavelengths add",
        latex: "\\frac{hc}{\\lambda_{CA}} = \\frac{hc}{\\lambda_{CB}} + \\frac{hc}{\\lambda_{BA}} \\quad\\Rightarrow\\quad \\frac{1}{\\lambda_{CA}} = \\frac{1}{\\lambda_{CB}} + \\frac{1}{\\lambda_{BA}}",
      },
      authoredExample: {
        prompt:
          "An atom has three energy levels P, Q and R in rising order of energy. The jump R to Q gives light of wavelength 600 nm and the jump Q to P gives 400 nm. Find the wavelength given out in the jump R to P.",
        steps: [
          "Given: \\(\\lambda_{RQ} = 600\\) nm, \\(\\lambda_{QP} = 400\\) nm.",
          "Energy is conserved: \\(E_R - E_P = (E_R - E_Q) + (E_Q - E_P)\\), so \\(\\dfrac{1}{\\lambda_{RP}} = \\dfrac{1}{600} + \\dfrac{1}{400}\\).",
          "\\(\\dfrac{1}{\\lambda_{RP}} = \\dfrac{2 + 3}{1200} = \\dfrac{5}{1200}\\) nm⁻¹.",
          "\\(\\lambda_{RP} = 240\\) nm.",
        ],
        answer: "240 nm",
      },
      selfCheckExample: {
        prompt: "When white light passes through a gas, where do the dark lines of its absorption spectrum appear?",
        steps: [
          "The gas can take in only photons whose energy matches a gap between its levels.",
          "Those are the same gaps that give its emission lines.",
        ],
        answer: "At exactly the wavelengths of the bright lines in the gas's emission spectrum",
      },
      practiceSet: [
        { prompt: "Why is the line spectrum of a gas called its fingerprint?", answer: "Each element gives its own set of wavelengths, so the lines identify the gas" },
        { prompt: "What does an emission line spectrum look like?", answer: "Bright lines on a dark background" },
        {
          prompt: "An atom moves from a lower energy level to a higher one. Does it give out a photon or take one in?",
          answer: "It takes one in, of energy equal to the gap between the two levels",
        },
      ],
      pyqExampleId: "2a0ba702-b087-4651-a31b-74eb9bab537c",
      traps: [
        {
          title: "Adding the wavelengths",
          body: "\\(\\lambda_{CA} = \\lambda_{CB} + \\lambda_{BA}\\) is wrong. The energies add, and energy goes as \\(1/\\lambda\\), so the reciprocals add. The direct jump must give the shortest wavelength.",
        },
        {
          title: "Absorption lines at new wavelengths",
          body: "A gas absorbs at the same wavelengths it emits. The dark lines are not a second, different set.",
        },
      ],
    },
  ],
};
