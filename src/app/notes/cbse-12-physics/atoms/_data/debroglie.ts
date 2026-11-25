import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_AT_DEBROGLIE_NOTE: SubtopicNote = {
  subtopicName: "de Broglie's Explanation of Bohr's Postulate",
  title: "de Broglie's Explanation of Bohr's Second Postulate",
  oneLineDefinition:
    "An allowed Bohr orbit holds a whole number of electron wavelengths round its circumference, which is the quantisation of angular momentum; and where Bohr's model stops working.",
  whyItMatters:
    "1 question, from a board paper: the ratio of the de Broglie wavelengths of the electron in two Bohr orbits (2026). The same standing-wave idea is the best answer to 'why is angular momentum quantised', which the board asks with Bohr's second postulate.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpat-standing-wave",
      name: "Standing electron waves on a Bohr orbit",
      intuition:
        "A plucked string keeps only the waves that fit a whole number of times along it; the rest cancel themselves out. De Broglie said the electron in its orbit is a wave too, and only a wave that closes on itself after one trip round can last. That picks out the allowed orbits.",
      definition:
        "- The electron has a de Broglie wavelength \\(\\lambda = \\dfrac{h}{mv}\\) (for speeds much less than that of light).\n" +
        "- **Step 1:** a standing wave forms on the nth orbit only if its circumference holds a whole number of wavelengths: \\(2\\pi r_n = n\\lambda\\), n = 1, 2, 3, ...\n" +
        "- **Step 2:** put \\(\\lambda = \\dfrac{h}{mv_n}\\): \\(2\\pi r_n = \\dfrac{nh}{mv_n}\\).\n" +
        "- **Step 3:** \\(mv_nr_n = \\dfrac{nh}{2\\pi}\\), which is Bohr's second postulate. So the quantised orbits come from the wave nature of the electron.\n" +
        "- In the nth orbit \\(\\lambda_n = \\dfrac{2\\pi r_n}{n}\\), and since \\(r_n \\propto n^2\\), \\(\\lambda_n \\propto n\\).\n" +
        "- **Limits of Bohr's model:** it works only for hydrogenic atoms (one electron, such as H, He⁺, Li²⁺); it cannot be extended even to helium, because it leaves out the forces between electrons. It cannot explain the relative intensities of the spectral lines.",
      formula: {
        label: "de Broglie's condition for an allowed orbit",
        latex: "2\\pi r_n = n\\lambda = n\\,\\frac{h}{mv_n} \\quad\\Rightarrow\\quad mv_nr_n = \\frac{nh}{2\\pi}",
      },
      authoredExample: {
        prompt: "The radius of the n = 2 orbit of hydrogen is \\(2.12 \\times 10^{-10}\\) m. Find the de Broglie wavelength of the electron in this orbit.",
        steps: [
          "Given: \\(r_2 = 2.12 \\times 10^{-10}\\) m, n = 2.",
          "Formula: \\(2\\pi r_n = n\\lambda\\), so \\(\\lambda = \\dfrac{2\\pi r_2}{2} = \\pi r_2\\).",
          "\\(\\lambda = 3.14 \\times 2.12 \\times 10^{-10} = 6.66 \\times 10^{-10}\\) m.",
        ],
        answer: "\\(\\lambda = 6.66 \\times 10^{-10}\\) m",
      },
      selfCheckExample: {
        prompt: "How many de Broglie wavelengths of the electron fit round the circumference of the fourth Bohr orbit?",
        steps: ["\\(2\\pi r_n = n\\lambda\\).", "For n = 4 the circumference holds 4 wavelengths."],
        answer: "4",
      },
      practiceSet: [
        { prompt: "Which of Bohr's postulates did de Broglie's hypothesis explain?", answer: "The second: the quantisation of angular momentum" },
        { prompt: "Give two limitations of Bohr's model.", answer: "It applies only to one-electron atoms, and it cannot explain the relative intensities of spectral lines" },
        { prompt: "Why can Bohr's model not be used for the helium atom?", answer: "Helium has two electrons, and the model leaves out the force between electrons" },
      ],
      pyqExampleId: "d42dca73-b979-485c-ab8c-68064bf110d4",
      traps: [
        {
          title: "Photon wavelength in place of electron wavelength",
          body: "\\(2\\pi r_n = n\\lambda\\) is about the electron's own de Broglie wave in one orbit. The wavelength of light from a jump between two orbits comes from \\(h\\nu = E_i - E_f\\), and behaves quite differently.",
        },
        {
          title: "Taking the electron's wavelength to grow as \\(n^2\\)",
          body: "The radius goes as \\(n^2\\), but the circumference holds n wavelengths, so each wavelength goes as n only.",
        },
      ],
    },
  ],
};
