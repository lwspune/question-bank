import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_KT_WIEN_NOTE: SubtopicNote = {
  subtopicName: "Spectral Distribution and Wien's Displacement Law",
  title: "Spectral Distribution of Blackbody Radiation and Wien's Law",
  oneLineDefinition:
    "How the energy radiated by a blackbody is spread over wavelengths at different temperatures, and Wien's displacement law, λmax T = b, which places the peak.",
  whyItMatters:
    "8 questions. Three were set in board papers: the wavelength of maximum emission at 427 °C (2017), explain the energy distribution spectrum of blackbody radiation (2020), and λmax for the Sun at 5800 K (2026). The textbook adds stating the Stefan-Boltzmann and Wien's laws, temperatures from peaks in the visible, microwave and radio regions, and the curve for the Earth at 280 K.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpkt-spectral-curve",
      name: "Spectral distribution of blackbody radiation",
      intuition:
        "A hot body does not radiate all wavelengths equally. Plot the energy given out at each wavelength and you get a hump: little at very short wavelengths, a peak, then a long tail. Heat the body and the whole hump grows taller and its peak slides towards shorter wavelengths. That is why a heated iron rod glows red, then orange, then white.",
      definition:
        "- The graph plots \\(R_\\lambda\\), the energy emitted per unit area per unit time per unit range of wavelength, against the wavelength λ, for a blackbody kept at different constant temperatures.\n" +
        "- In the board answer, draw three labelled curves for \\(T_3 > T_2 > T_1\\), with the peaks marked and shifting to the left as T rises.\n" +
        "- The distribution depends only on the temperature of the blackbody, not on what it is made of.",
      table: {
        columns: ["Feature of the curves", "What it shows"],
        rows: [
          {
            cells: ["Energy is not spread evenly over the wavelengths", "Each curve rises from zero, reaches a peak at λmax and then falls"],
            pyqExampleId: "38888f58-2f85-43c7-bfa6-0c8bfb4c6837",
            noteAmber: "Board 2020 asked you to explain the energy distribution spectrum of blackbody radiation.",
          },
          { cells: ["λmax", "The wavelength of maximum intensity, not the longest wavelength emitted"] },
          { cells: ["Area under a curve", "The total energy emitted per unit area per unit time, \\(\\sigma T^4\\)"] },
          { cells: ["Peak shifts to shorter wavelengths as T rises", "Wien's displacement law, λmax T = constant"] },
          { cells: ["A hotter curve lies above a cooler one at every wavelength", "The curves never cross; total emission rises steeply with T"] },
          { cells: ["At about 300 K almost all the energy is in the infrared", "Bodies at room temperature do not glow"] },
        ],
      },
      selfCheckExample: {
        prompt: "Curves are drawn for a blackbody at 1000 K and at 2000 K. Which curve has its peak at the shorter wavelength, and which has the larger area under it?",
        steps: ["The peak moves to shorter wavelengths as T rises.", "The area, the total emission, grows with T."],
        answer: "The 2000 K curve, for both",
      },
      practiceSet: [
        { prompt: "What does the area under a spectral distribution curve represent?", answer: "The total energy emitted per unit area per unit time at that temperature" },
        { prompt: "Can two spectral distribution curves for different temperatures cross?", answer: "No. The hotter curve lies above at every wavelength" },
        { prompt: "Why does a body at room temperature not glow?", answer: "Almost all its radiation is in the infrared" },
      ],
      traps: [
        {
          title: "Calling λmax the largest wavelength",
          body: "λmax is where the emission is greatest. The body also emits longer wavelengths, in the tail of the curve.",
        },
        {
          title: "Explaining without the graph",
          body: "The question 'explain the spectral distribution' expects the labelled graph with at least two temperatures. Points without the graph lose marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-wien-law",
      name: "Wien's displacement law",
      intuition:
        "The peak of a blackbody's radiation curve moves to shorter wavelengths as the body gets hotter, in exact inverse proportion: double the absolute temperature and the peak wavelength halves. Astronomers use it backwards, reading a star's temperature from the colour where its light is brightest.",
      definition:
        "- **Wien's displacement law:** the wavelength \\(\\lambda_{max}\\) at which the emissive power of a blackbody is maximum is inversely proportional to its absolute temperature: \\(\\lambda_{max}T = b\\).\n" +
        "- Wien's constant \\(b = 2.897 \\times 10^{-3}\\) m K.\n" +
        "- **Stefan-Boltzmann law** (often asked with it): the emissive power of a perfect blackbody is directly proportional to the fourth power of its absolute temperature, \\(R = \\sigma T^4\\).\n" +
        "- Put T in kelvin and λ in metres.",
      formula: {
        label: "Wien's displacement law",
        latex: "\\lambda_{max}\\,T = b = 2.897 \\times 10^{-3}\\ \\text{m K}",
        symbols: [
          { symbol: "\\(\\lambda_{max}\\)", meaning: "wavelength of maximum emission" },
          { symbol: "\\(b\\)", meaning: "Wien's constant" },
        ],
      },
      authoredExample: {
        prompt: "The radiation from a star is most intense at a wavelength of 400 nm. Treating the star as a blackbody, find its surface temperature. (b = 2.897 × 10⁻³ m K)",
        steps: [
          "Given: \\(\\lambda_{max} = 400\\) nm \\(= 4 \\times 10^{-7}\\) m, \\(b = 2.897 \\times 10^{-3}\\) m K.",
          "Formula: \\(T = \\dfrac{b}{\\lambda_{max}}\\).",
          "Substitution: \\(T = \\dfrac{2.897 \\times 10^{-3}}{4 \\times 10^{-7}}\\).",
          "\\(T = 7243\\) K.",
        ],
        answer: "About 7243 K",
      },
      selfCheckExample: {
        prompt: "The wavelength of maximum emission of blackbody P is three times that of blackbody Q. Compare their absolute temperatures.",
        steps: ["\\(\\lambda_{max} \\propto \\dfrac{1}{T}\\).", "\\(\\dfrac{T_P}{T_Q} = \\dfrac{\\lambda_Q}{\\lambda_P} = \\dfrac{1}{3}\\)."],
        answer: "\\(T_P : T_Q = 1 : 3\\)",
      },
      practiceSet: [
        { prompt: "State Wien's displacement law.", answer: "The wavelength of maximum emission of a blackbody is inversely proportional to its absolute temperature" },
        { prompt: "What is the SI unit of Wien's constant?", answer: "m K (metre kelvin)" },
        { prompt: "As a body is heated, does its λmax move towards the red end or the violet end?", answer: "Towards the violet end (shorter wavelengths)" },
      ],
      pyqExampleId: "bf83a744-c0a7-49be-a967-fa8ae37d2410",
      traps: [
        {
          title: "Celsius in Wien's law",
          body: "\\(\\lambda_{max}T = b\\) needs the absolute temperature. A body at 727 °C is at 1000 K; dividing b by 727 gives a wrong wavelength.",
        },
        {
          title: "Nanometres left as they are",
          body: "b is in m K, so λ must be in metres. 500 nm is \\(5 \\times 10^{-7}\\) m.",
        },
      ],
    },
  ],
};
