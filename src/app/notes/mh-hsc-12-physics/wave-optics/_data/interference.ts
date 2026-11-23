import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_WO_INTERFERENCE_NOTE: SubtopicNote = {
  subtopicName: "Interference and Young's Double Slit Experiment",
  title: "Interference, Young's Double Slit and the Biprism",
  oneLineDefinition:
    "Coherent sources and the conditions for a steady pattern, Young's double slit experiment with the positions of bright and dark fringes and the fringe width, the Fresnel biprism, the intensities of the fringes and optical path.",
  whyItMatters:
    "34 questions, the biggest page of the chapter, and sixteen of them from board papers from 2016 to 2026. The board asks you to derive the fringe width (2024, 2026), state the conditions for a steady pattern (2025, 2026) and for bright and dark bands (2018), solve biprism problems (2016, 2017, 2018, 2023, 2024) and draw its ray diagram (2026), find fringe width or slit separation (2019, 2022), and work with intensity and amplitude ratios (2022, 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpwo-coherent-conditions",
      name: "Coherent sources and conditions for a good pattern",
      intuition:
        "Light from two bulbs overlaps everywhere in a room, yet you never see fringes. The two bulbs emit independently, so the phase relation between their waves keeps changing and any pattern moves about too fast to see. For a steady pattern the two sources must keep a fixed phase difference, and the only practical way is to split the light of ONE source into two: two slits, a mirror and its image, or the two halves of a biprism.",
      definition:
        "- **Interference:** when two waves overlap, the resultant displacement is the sum of the separate displacements, so the intensity is large at some places and small at others.\n" +
        "- **Coherent sources** emit waves of the same frequency with a constant phase difference, independent of time. Two independent primary sources cannot be coherent.\n" +
        "- **Methods:** Young's double slit (two slits lit by one source); **Lloyd's mirror** (a source and its virtual image in a plane mirror lit at grazing incidence); **Fresnel biprism** (two virtual images of one slit).\n" +
        "- **Thin films:** the colours of soap bubbles and oil films on water come from interference between light reflected from the upper and lower surfaces of the film.\n" +
        "- 'Give reasons' questions want the reason beside every condition, as in the table.",
      table: {
        columns: ["Condition for a steady, clear pattern", "Reason"],
        rows: [
          {
            cells: ["The two sources must be coherent", "Otherwise the phase difference changes, the maxima and minima keep moving and no steady pattern forms"],
            pyqExampleId: "913ec424-e326-4e48-923a-9741fca4d3ca",
            noteAmber: "Board 2026 asked what interference is and any four of these conditions; 2025 asked the four conditions again.",
          },
          { cells: ["The light must be monochromatic", "Fringe positions and width depend on wavelength, so white light gives coloured, overlapping bands"] },
          { cells: ["The two waves must have the same amplitude", "Only then is the intensity at the dark fringes zero, giving the best contrast"] },
          { cells: ["The slit separation d must be small compared with the screen distance D", "The fringe width \\(\\lambda D/d\\) is then large enough to measure"] },
          { cells: ["The slits must be narrow", "Broad slits make waves from one slit interfere among themselves and blur the pattern"] },
          { cells: ["The two waves must be in the same state of polarization", "Needed only when polarized light is used"] },
        ],
      },
      practiceSet: [
        { prompt: "Why do two separate sodium lamps placed side by side not give an interference pattern?", answer: "They are independent sources, so they are not coherent: their phase difference keeps changing" },
        { prompt: "Name two laboratory methods, other than two slits, for obtaining coherent sources.", answer: "Lloyd's mirror and the Fresnel biprism" },
        { prompt: "Why does a thin film of oil on water show colours in white light?", answer: "Light reflected from the upper and lower surfaces of the film interferes; different colours are reinforced at different thicknesses and angles" },
      ],
      traps: [
        {
          title: "Conditions without reasons",
          body: "The textbook question says 'give reasons'. A bare list of four conditions scores half. Write one line of reason beside each.",
        },
        {
          title: "Calling two lamps of one colour coherent",
          body: "Same colour is not enough. Coherent sources need a CONSTANT phase difference, which only sources derived from one original source have.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpwo-ydse",
      name: "Young's double slit: fringe positions and fringe width",
      intuition:
        "Each point on the screen is a little farther from one slit than from the other. Where that extra distance is a whole number of wavelengths the two waves arrive crest on crest and the point is bright; where it is a half number, crest meets trough and the point is dark. Moving along the screen, the extra distance grows steadily, so the bright and dark bands come at equal steps: the fringe width.",
      definition:
        "- Slits \\(S_1\\), \\(S_2\\) are a distance d apart, the screen is at distance D (with \\(D \\gg d\\)), O' is the point on the screen equidistant from both slits, and P is at height y above O'.\n" +
        "- From the two right-angled triangles: \\((S_2P)^2 - (S_1P)^2 = 2yd\\).\n" +
        "- Since \\(S_2P + S_1P \\approx 2D\\), the path difference is \\(\\Delta l = S_2P - S_1P = \\dfrac{yd}{D}\\).\n" +
        "- **Bright fringe:** \\(\\Delta l = n\\lambda\\), so \\(y_n = \\dfrac{n\\lambda D}{d}\\), \\(n = 0, \\pm 1, \\pm 2, \\dots\\). The central fringe (\\(n = 0\\)) at O' is bright.\n" +
        "- **Dark fringe:** \\(\\Delta l = (n - \\tfrac{1}{2})\\lambda\\), so \\(y_n = (n - \\tfrac{1}{2})\\dfrac{\\lambda D}{d}\\), \\(n = \\pm 1, \\pm 2, \\dots\\).\n" +
        "- **Fringe width** W is the distance between two successive bright, or two successive dark, fringes: \\(W = y_{n+1} - y_n = \\dfrac{\\lambda D}{d}\\). Bright and dark fringes are equally spaced and of equal width.\n" +
        "- Phase difference \\(\\phi = \\dfrac{2\\pi}{\\lambda}\\Delta l\\): bright for \\(\\phi = 2n\\pi\\), dark for an odd multiple of \\(\\pi\\).",
      formula: {
        label: "Young's double slit",
        latex: "\\Delta l = \\frac{yd}{D}, \\qquad y_n^{\\text{bright}} = \\frac{n\\lambda D}{d}, \\qquad y_n^{\\text{dark}} = \\left(n - \\tfrac{1}{2}\\right)\\frac{\\lambda D}{d}, \\qquad W = \\frac{\\lambda D}{d}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "separation of the two slits" },
          { symbol: "\\(D\\)", meaning: "distance from the slits to the screen" },
          { symbol: "\\(W\\)", meaning: "fringe width" },
        ],
      },
      authoredExample: {
        prompt:
          "In Young's experiment the slits are 0.2 mm apart, the screen is 1.2 m away and the wavelength is 5000 Å. Find the fringe width and the distance of the third dark fringe from the central bright fringe.",
        steps: [
          "Given: \\(d = 0.2\\) mm \\(= 2 \\times 10^{-4}\\) m, \\(D = 1.2\\) m, \\(\\lambda = 5000\\) Å \\(= 5 \\times 10^{-7}\\) m.",
          "Formula: \\(W = \\dfrac{\\lambda D}{d}\\).",
          "Substitution: \\(W = \\dfrac{(5 \\times 10^{-7})(1.2)}{2 \\times 10^{-4}} = 3 \\times 10^{-3}\\) m = 3 mm.",
          "Third dark fringe: \\(y_3 = (3 - \\tfrac{1}{2})W = 2.5 \\times 3 = 7.5\\) mm.",
        ],
        answer: "W = 3 mm; third dark fringe at 7.5 mm from the centre",
      },
      selfCheckExample: {
        prompt:
          "In a double slit experiment the fifth bright fringe is 6 mm from the central bright fringe. Find the fringe width and the distance of the second dark fringe from the centre.",
        steps: ["\\(y_5 = 5W = 6\\) mm, so \\(W = 1.2\\) mm.", "Second dark fringe: \\((2 - \\tfrac{1}{2})W = 1.5 \\times 1.2 = 1.8\\) mm."],
        answer: "W = 1.2 mm; 1.8 mm",
      },
      practiceSet: [
        { prompt: "What is the path difference at the centre of the fourth bright fringe, in terms of λ?", answer: "\\(4\\lambda\\)" },
        { prompt: "What phase difference corresponds to a path difference of λ/2?", answer: "\\(\\pi\\) radian" },
        { prompt: "In Young's experiment the slit separation is doubled, everything else unchanged. What happens to the fringe width?", answer: "It is halved, since \\(W \\propto 1/d\\)" },
        { prompt: "Is the fringe at the centre of the screen bright or dark? Why?", answer: "Bright: it is equidistant from both slits, so the path difference is zero" },
      ],
      pyqExampleId: "5ffa1b9f-307c-4334-b46e-dc01218d2366",
      traps: [
        {
          title: "Calling the central fringe the first bright fringe",
          body: "The central fringe is the ZEROTH bright fringe (n = 0). The nth bright fringe is n fringe widths from it.",
        },
        {
          title: "Using nλD/d for a dark fringe",
          body: "nλD/d gives a BRIGHT fringe in double slit interference. The nth dark fringe is at \\((n - \\tfrac{1}{2})\\lambda D/d\\).",
        },
        {
          title: "Not defining fringe width",
          body: "In a derivation, write the definition (distance between two successive bright or dark fringes) before subtracting \\(y_{n+1} - y_n\\). The definition carries its own mark.",
        },
        {
          title: "Mixing millimetres and metres",
          body: "Put d in metres before dividing. A slit separation left in mm makes the fringe width a thousand times too small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpwo-biprism",
      name: "Fresnel biprism",
      intuition:
        "A biprism is a very flat prism, two thin prisms joined base to base. Each half bends the light from a single slit a little towards its base, so the eye beyond sees two images of the slit, side by side and very close. These two virtual images come from one slit, so they are coherent, and in the overlap region they make Young's fringes. Everything about Young's experiment carries over, with the virtual images as the two slits.",
      definition:
        "- A biprism has a vertex angle of nearly 180°: two prisms of very small refracting angle (30' to 1°) joined at their bases. Its refracting edge is kept parallel to the slit.\n" +
        "- The two halves form two **virtual images** \\(S_1\\), \\(S_2\\) of the slit, a distance d apart. These are the coherent sources; fringes form in the region where the two refracted beams overlap.\n" +
        "- The virtual images lie in the plane of the slit, so D is measured from the **slit** to the eyepiece (or screen).\n" +
        "- \\(W = \\dfrac{\\lambda D}{d}\\), so \\(\\lambda = \\dfrac{Wd}{D}\\). The nth bright band is at nW and the nth dark band at \\((n - \\tfrac{1}{2})W\\) from the central bright band.\n" +
        "- d cannot be measured directly (the sources are virtual). A convex lens between the biprism and the eyepiece forms a real magnified image of \\(S_1S_2\\) on the eyepiece; if the images are \\(d_1\\) apart with object distance u and image distance v, then \\(d = d_1 u/v\\).\n" +
        "- Each half of a biprism of small angle A deviates the light by \\(\\delta = (\\mu - 1)A\\), so with the slit a distance \\(x_1\\) from the biprism, \\(d = 2\\delta x_1\\) (Solved Example 7.5).",
      formula: {
        label: "Wavelength by the biprism",
        latex: "\\lambda = \\frac{Wd}{D}, \\qquad d = \\frac{d_1 u}{v}",
        symbols: [
          { symbol: "\\(D\\)", meaning: "distance from the slit to the eyepiece" },
          { symbol: "\\(d_1\\)", meaning: "separation of the magnified images formed by the lens" },
          { symbol: "\\(u, v\\)", meaning: "object and image distances of the lens" },
        ],
      },
      authoredExample: {
        prompt:
          "In a biprism experiment the eyepiece is 1 m from the slit. Ten fringe widths together measure 5 mm, and the two virtual sources are found to be 1.2 mm apart. Find the wavelength of the light.",
        steps: [
          "Given: \\(D = 1\\) m, \\(10W = 5\\) mm so \\(W = 0.5\\) mm \\(= 5 \\times 10^{-4}\\) m, \\(d = 1.2\\) mm \\(= 1.2 \\times 10^{-3}\\) m.",
          "Formula: \\(\\lambda = \\dfrac{Wd}{D}\\).",
          "Substitution: \\(\\lambda = \\dfrac{(5 \\times 10^{-4})(1.2 \\times 10^{-3})}{1} = 6 \\times 10^{-7}\\) m.",
        ],
        answer: "λ = 6 × 10⁻⁷ m = 6000 Å",
      },
      selfCheckExample: {
        prompt:
          "In a biprism experiment the slit is 100 cm from the eyepiece. A convex lens placed 75 cm from the eyepiece forms images of the two virtual sources 4.5 mm apart on the eyepiece. Find the separation of the virtual sources.",
        steps: ["Image distance \\(v = 75\\) cm, object distance \\(u = 100 - 75 = 25\\) cm.", "\\(d = d_1 \\dfrac{u}{v} = 4.5 \\times \\dfrac{25}{75} = 1.5\\) mm."],
        answer: "1.5 mm",
      },
      practiceSet: [
        { prompt: "Why are the two virtual images formed by a biprism coherent?", answer: "Both are images of the same slit, so their light comes from one source" },
        { prompt: "In a biprism experiment red light is replaced by blue light. Do the bands become wider or narrower?", answer: "Narrower, since \\(W \\propto \\lambda\\) and blue has the shorter wavelength" },
        { prompt: "Why can the separation of the two sources in a biprism experiment not be measured directly?", answer: "They are virtual images, so there is nothing at their position to measure" },
      ],
      pyqExampleId: "d72eeaf7-3bc4-41f6-839c-0201e4880af0",
      traps: [
        {
          title: "Measuring D from the biprism",
          body: "The virtual sources lie in the plane of the slit, so D runs from the slit to the eyepiece. Add the slit to biprism distance if the question gives it separately.",
        },
        {
          title: "Putting the dark band at nW",
          body: "In a biprism, as in Young's experiment, the nth DARK band is at \\((n - \\tfrac{1}{2})W\\) from the centre. nW is the nth bright band.",
        },
        {
          title: "Turning the magnification upside down",
          body: "The lens forms a magnified image, so \\(d_1 > d\\). Divide by the magnification v/u: \\(d = d_1 u/v\\). If your d came out larger than \\(d_1\\), you multiplied.",
        },
        {
          title: "No ray diagram",
          body: "The board asks for the ray diagram showing the slit, the biprism, the virtual sources \\(S_1\\), \\(S_2\\) and the shaded region of interference. Leaving out the shading or the virtual sources costs marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpwo-intensity-optical-path",
      name: "Intensity of fringes and optical path",
      intuition:
        "Where the two waves meet in step their amplitudes add, and where they meet out of step they subtract. If the two amplitudes are equal the dark fringes are perfectly dark; if not, a little light is left and the contrast drops. Separately, light in glass is slower, so it piles up more phase per centimetre than in air. A plate in one beam adds extra phase and slides the whole pattern sideways.",
      definition:
        "- With equal amplitudes, the intensity at a bright fringe is four times that of either wave, \\(4I_0\\), and zero at a dark fringe.\n" +
        "- With amplitudes \\(a_1\\) and \\(a_2\\): \\(I_{max} \\propto (a_1 + a_2)^2\\) and \\(I_{min} \\propto (a_1 - a_2)^2\\). Since \\(I \\propto a^2\\), the amplitude ratio is the square root of the intensity ratio.\n" +
        "- **Optical path:** a distance x in a medium of refractive index n changes the phase as much as a distance nx in vacuum. So optical path = n × actual path. It is the distance light would travel in vacuum in the same time.\n" +
        "- A plate of thickness t and refractive index n in front of one slit adds an extra optical path \\((n - 1)t\\). The central bright fringe moves to the point where the optical paths are equal, \\(\\dfrac{yd}{D} = (n - 1)t\\), and the whole pattern shifts with it.",
      formula: {
        label: "Intensity ratio and optical path",
        latex: "\\frac{I_{max}}{I_{min}} = \\left(\\frac{a_1 + a_2}{a_1 - a_2}\\right)^2 = \\left(\\frac{\\sqrt{I_1} + \\sqrt{I_2}}{\\sqrt{I_1} - \\sqrt{I_2}}\\right)^2, \\qquad \\text{optical path} = nx",
        symbols: [
          { symbol: "\\(a_1, a_2\\)", meaning: "amplitudes of the two waves" },
          { symbol: "\\(I_1, I_2\\)", meaning: "intensities of the two waves" },
        ],
      },
      authoredExample: {
        prompt:
          "Two coherent sources have intensities in the ratio 4 : 1. Find the ratio of the maximum to the minimum intensity in their interference pattern.",
        steps: [
          "Given: \\(I_1 : I_2 = 4 : 1\\).",
          "Amplitude ratio: \\(\\dfrac{a_1}{a_2} = \\sqrt{\\dfrac{4}{1}} = 2\\).",
          "Formula: \\(\\dfrac{I_{max}}{I_{min}} = \\left(\\dfrac{a_1 + a_2}{a_1 - a_2}\\right)^2\\).",
          "Substitution: \\(\\left(\\dfrac{2 + 1}{2 - 1}\\right)^2 = 9\\).",
        ],
        answer: "I max : I min = 9 : 1",
      },
      selfCheckExample: {
        prompt:
          "A glass plate of refractive index 1.5 and thickness 6 μm is placed in front of one slit in Young's experiment, with light of wavelength 6000 Å. By how many fringes does the pattern shift?",
        steps: ["Extra optical path \\((n - 1)t = 0.5 \\times 6 \\times 10^{-6} = 3 \\times 10^{-6}\\) m.", "Number of fringes \\(= \\dfrac{3 \\times 10^{-6}}{6 \\times 10^{-7}} = 5\\)."],
        answer: "5 fringes",
      },
      practiceSet: [
        { prompt: "Light travels 2 cm through glass of refractive index 1.5. What is its optical path?", answer: "3 cm" },
        { prompt: "Two interfering waves have equal amplitudes. What is the intensity at the centre of a dark fringe?", answer: "Zero" },
        { prompt: "A glass sheet of uniform thickness covers BOTH slits equally. Does the pattern shift?", answer: "No. Both beams gain the same extra optical path, so the path difference is unchanged" },
      ],
      pyqExampleId: "03424dde-01f5-4dca-aa38-2e9ac97ad13a",
      traps: [
        {
          title: "Using the intensity ratio as the amplitude ratio",
          body: "Take the square root first. An intensity ratio of 4 : 1 means amplitudes 2 : 1, and only amplitudes go into \\((a_1 + a_2)/(a_1 - a_2)\\).",
        },
        {
          title: "Writing the optical path as x/n",
          body: "Optical path is n times the actual path, so it is LONGER than the actual path in any medium.",
        },
        {
          title: "Saying a plate changes the fringe width",
          body: "A plate in front of one slit shifts the whole pattern in one direction. The fringe width \\(\\lambda D/d\\) does not change, because neither \\(D\\) nor \\(d\\) changes.",
        },
      ],
    },
  ],
};
