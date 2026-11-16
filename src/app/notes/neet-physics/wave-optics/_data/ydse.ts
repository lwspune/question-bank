import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_WO_YDSE_NOTE: SubtopicNote = {
  subtopicName: "Young's Double Slit Experiment",
  title: "Young's Double Slit Experiment",
  oneLineDefinition:
    "Where the bright and dark fringes fall in Young's double slit experiment, the fringe width λD/d and the angular fringe width λ/d, and what changes the pattern: wavelength, slit gap, screen distance, a liquid and white light.",
  whyItMatters:
    "Four NEET questions from 2022 to 2024. Three use the fringe width: how many fringes fit in the same stretch of screen when the wavelength changes (NEET 2022), how the angular separation depends on the screen distance and the wavelength (NEET 2023), and the fringe separation from the slit gap, screen distance and wavelength (Re-NEET 2024). The fourth (NEET 2024) asked what the pattern looks like with white light.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphwo-fringe-width",
      name: "Fringe width and fringe positions",
      intuition:
        "Two slits a distance d apart act as two coherent sources, and a screen sits a distance D away. A point at height y above the centre is a little nearer one slit than the other, and that extra path grows steadily with y. Each time it grows by one wavelength the light goes from bright to dark and back to bright, so the fringes are evenly spaced stripes.",
      definition:
        "- For \\(D \\gg d\\), the path difference at height y on the screen is \\(\\Delta x = \\dfrac{yd}{D}\\).\n" +
        "- Bright fringes: \\(y_n = \\dfrac{n\\lambda D}{d}\\), \\(n = 0, 1, 2, \\dots\\) The centre (\\(n = 0\\)) is always bright.\n" +
        "- Dark fringes lie halfway between: \\(y = \\left(n + \\tfrac{1}{2}\\right)\\dfrac{\\lambda D}{d}\\). The first dark fringe is at \\(\\beta/2\\), the second at \\(3\\beta/2\\).\n" +
        "- **Fringe width** \\(\\beta = \\dfrac{\\lambda D}{d}\\), the same for bright and dark fringes.\n" +
        "- **Angular fringe width** \\(\\theta = \\dfrac{\\beta}{D} = \\dfrac{\\lambda}{d}\\). It does not depend on D.\n" +
        "- In a fixed stretch L of screen the number of fringes is \\(L/\\beta\\), so it goes as \\(1/\\lambda\\).",
      formula: {
        label: "Double slit",
        latex: "\\beta = \\frac{\\lambda D}{d}, \\qquad \\theta = \\frac{\\lambda}{d}, \\qquad y_n = \\frac{n\\lambda D}{d}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "distance between the slits" },
          { symbol: "\\(D\\)", meaning: "distance from the slits to the screen" },
          { symbol: "\\(\\beta\\)", meaning: "fringe width" },
        ],
      },
      authoredExample: {
        prompt:
          "In a double slit experiment the slits are 0.5 mm apart, the screen is 1.5 m away and the wavelength is 500 nm. Find the fringe width and the distance of the third dark fringe from the centre.",
        steps: [
          "\\(\\beta = \\dfrac{\\lambda D}{d} = \\dfrac{500 \\times 10^{-9} \\times 1.5}{0.5 \\times 10^{-3}} = 1.5 \\times 10^{-3}\\ \\text{m} = 1.5\\ \\text{mm}\\).",
          "The third dark fringe is at \\(\\left(2 + \\tfrac{1}{2}\\right)\\beta = 2.5\\beta\\).",
          "\\(2.5 \\times 1.5 = 3.75\\ \\text{mm}\\).",
        ],
        answer: "1.5 mm; 3.75 mm",
      },
      selfCheckExample: {
        prompt:
          "In a double slit experiment the slits are 1 mm apart and the screen is 1 m away. The fourth bright fringe is 2.4 mm from the central fringe. Find the wavelength.",
        steps: [
          "The fourth bright fringe is at \\(4\\beta\\), so \\(\\beta = \\dfrac{2.4}{4} = 0.6\\ \\text{mm}\\).",
          "\\(\\lambda = \\dfrac{\\beta d}{D} = \\dfrac{0.6 \\times 10^{-3} \\times 10^{-3}}{1} = 6 \\times 10^{-7}\\ \\text{m}\\).",
        ],
        answer: "600 nm",
      },
      practiceSet: [
        { prompt: "In a double slit experiment the slit gap is halved and the screen distance is doubled. By what factor does the fringe width change?", answer: "It becomes 4 times" },
        { prompt: "In terms of the fringe width β, how far is the second dark fringe from the central bright fringe?", answer: "1.5β" },
        { prompt: "Red light in a double slit experiment is replaced by blue light. Do the fringes get wider or narrower?", answer: "Narrower, since \\(\\beta \\propto \\lambda\\)" },
        { prompt: "Write the angular fringe width of a double slit pattern in terms of the wavelength and the slit gap.", answer: "\\(\\theta = \\lambda/d\\)" },
      ],
      pyqExampleId: "d1ba310b-c8a4-48a4-a00b-edb2f479d8ec",
      traps: [
        {
          title: "The fringe width falls as d rises",
          body: "\\(\\beta = \\lambda D/d\\): moving the slits further apart makes the fringes narrower, not wider.",
        },
        {
          title: "Angular width ignores the screen",
          body: "The angular fringe width \\(\\lambda/d\\) stays the same when the screen is moved. Only the fringe width on the screen, \\(\\lambda D/d\\), changes with D.",
        },
        {
          title: "Dark fringes are half a fringe short",
          body: "The nth dark fringe is at \\(\\left(n - \\tfrac{1}{2}\\right)\\beta\\) from the centre, not at \\(n\\beta\\). The first dark fringe is only \\(\\beta/2\\) away.",
        },
        {
          title: "A shorter wavelength fits more fringes",
          body: "In a fixed stretch of screen the number of fringes goes as \\(1/\\lambda\\). Lowering the wavelength gives more fringes, not fewer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nphwo-pattern",
      name: "What changes the fringe pattern",
      intuition:
        "Every change to the experiment works through β = λD/d, or through whether the two beams stay coherent. Ask which of λ, D and d the change touches, and in which direction.",
      definition:
        "- The fringe width \\(\\beta = \\lambda D/d\\) grows with the wavelength and the screen distance and falls with the slit gap.\n" +
        "- Brightness does not set the width: a brighter source gives brighter fringes of the same width.\n" +
        "- In white light each colour makes its own fringes of its own width. Only at the centre, where the path difference is zero for every colour, do they all agree.",
      table: {
        columns: ["Change", "Effect on the fringes"],
        rows: [
          { cells: ["Longer wavelength", "Wider fringes, since \\(\\beta \\propto \\lambda\\)"] },
          { cells: ["Slits moved closer together", "Wider fringes, since \\(\\beta \\propto 1/d\\)"] },
          { cells: ["Screen moved further away", "Wider fringes on the screen; the angular width \\(\\lambda/d\\) is unchanged"] },
          { cells: ["Whole set-up in a liquid of index \\(\\mu\\)", "The wavelength becomes \\(\\lambda/\\mu\\), so the fringes narrow to \\(\\beta/\\mu\\)"] },
          {
            cells: ["White light instead of one colour", "A white central fringe, a few coloured fringes on each side, then even light where the colours overlap"],
            noteAmber: "NEET 2024: asked what the pattern becomes when the source is replaced by white light.",
            pyqExampleId: "c72ae725-0359-4044-9583-bfaad1f780d5",
          },
          { cells: ["A brighter source", "Brighter fringes of the same width"] },
          { cells: ["Two separate lamps, one at each slit", "No steady fringes: the lamps are not coherent"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "The fringe width of a double slit pattern in air is 0.6 mm. The whole set-up is put under water of refractive index 4/3. What is the new fringe width?",
        steps: [
          "In water the wavelength becomes \\(\\lambda/\\mu\\), and \\(\\beta \\propto \\lambda\\).",
          "\\(\\beta' = \\dfrac{0.6}{4/3} = 0.6 \\times \\dfrac{3}{4} = 0.45\\ \\text{mm}\\).",
        ],
        answer: "0.45 mm",
      },
      practiceSet: [
        { prompt: "The source in a double slit experiment is made brighter, nothing else changed. What happens to the fringe width?", answer: "It stays the same" },
        { prompt: "The screen in a double slit experiment is moved further from the slits. What happens to the fringe width on the screen?", answer: "It increases, since \\(\\beta \\propto D\\)" },
        { prompt: "A double slit set-up is put in a liquid of refractive index μ. By what factor does the fringe width change?", answer: "It becomes \\(1/\\mu\\) times" },
        { prompt: "Each slit of a double slit experiment is lit by its own separate lamp. Why is no steady pattern seen?", answer: "The two lamps are not coherent" },
      ],
      pyqExampleId: "c72ae725-0359-4044-9583-bfaad1f780d5",
      traps: [
        {
          title: "Only the central fringe is white",
          body: "With white light the centre is white because the path difference there is zero for every colour. The fringes beside it are coloured, because each colour has its own fringe width.",
        },
        {
          title: "Divide by μ, do not multiply",
          body: "In a liquid the wavelength shrinks to \\(\\lambda/\\mu\\), so the fringe width becomes \\(\\beta/\\mu\\). The fringes get narrower, never wider.",
        },
      ],
    },
  ],
};
