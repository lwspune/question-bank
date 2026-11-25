import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_WO_INTERFERENCE_NOTE: SubtopicNote = {
  subtopicName: "Interference and Young's Experiment",
  title: "Interference of Light and Young's Double-Slit Experiment",
  oneLineDefinition:
    "Coherent sources, the superposition of two waves and the resultant intensity I = 4I₀cos²(φ/2), the positions and width of Young's double-slit fringes, and how the pattern changes with the screen, the slits, the colour and the medium.",
  whyItMatters:
    "76 questions, seventy-two of them from board papers, so this is the page the board asks most. It asks you to say what coherent sources are and why two lamps give no fringes (2022, 2024, 2025, 2026), derive the resultant intensity of two waves or use I = 4I₀cos²(φ/2) at a given path difference (every year from 2022 to 2026, eight times in 2025 alone), find a fringe width, the position of a bright or dark fringe or the point where the bright fringes of two wavelengths first coincide (every year), and say how the pattern changes when the screen, the slits, the colour or the medium is changed (every year).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpwo-coherent",
      name: "Coherent sources and a sustained interference pattern",
      intuition:
        "Two needles dipping up and down together in water send out two sets of ripples. Where crest meets crest the water swings hard; where crest meets trough it stays still. The pattern stays in place only if the two needles keep the same rhythm. Two ordinary lamps never keep the same rhythm, so their light simply adds up. Young got round this by lighting two pinholes from one single source.",
      definition:
        "- **Superposition:** at any point, the resultant displacement is the vector sum of the displacements produced by each wave.\n" +
        "- **Coherent sources** send out waves of the same frequency, and the phase difference between the waves at any point does not change with time.\n" +
        "- With coherent sources the maxima and minima stay in the same places: a **sustained** (stable) interference pattern.\n" +
        "- If the phase difference changes rapidly, the maxima and minima move too fast to follow. The eye sees a time average: intensity \\(2I_0\\) everywhere, and no fringes. The intensities simply add (incoherent addition).\n" +
        "- An ordinary source such as a sodium lamp changes its phase abruptly and at random, many millions of times a second. So two independent sources are never coherent.\n" +
        "- Young lit two close pinholes \\(S_1\\) and \\(S_2\\) from a single pinhole S. Any sudden phase change at S reaches both, so \\(S_1\\) and \\(S_2\\) are locked in phase: they are coherent.\n" +
        "- In interference, energy is only moved around: less reaches the dark fringes and more reaches the bright ones. There is no gain or loss of energy.",
      table: {
        columns: ["What the board asks", "Answer to write"],
        rows: [
          {
            cells: ["Conditions for a sustained interference pattern", "The sources must be coherent: the same frequency (so the same wavelength) and a constant phase difference. Equal amplitudes make the dark fringes completely dark."],
          },
          {
            cells: ["Two independent sodium lamps light two pinholes. Are fringes seen?", "No. The lamps are not coherent: their phase difference changes at random, so the intensities just add."],
            noteAmber: "Board 2024 and 2025 asked whether two independent sodium lamps can act as coherent sources.",
          },
          { cells: ["Which pairs of waves such as y = a sin ωt and y = a sin 2ωt can interfere?", "Only waves with the same ω (the same frequency) and a constant phase difference between them."] },
          { cells: ["What does the experiment show about light?", "That light is a wave: light added to light can give darkness at the dark fringes."] },
          { cells: ["Which kinds of wave show interference?", "All of them: transverse and longitudinal, mechanical and electromagnetic. Interference needs only superposition."] },
          { cells: ["Is energy destroyed at a dark fringe?", "No. The energy missing at the dark fringes appears at the bright fringes; the total is conserved."] },
        ],
      },
      practiceSet: [
        { prompt: "Two waves are \\(y_1 = a \\sin 3\\omega t\\) and \\(y_2 = a \\cos 3\\omega t\\). Can they give a sustained interference pattern?", answer: "Yes: the same frequency and a constant phase difference of \\(\\pi/2\\)" },
        { prompt: "Two incoherent sources each give intensity \\(I_0\\) on a screen. What intensity is seen?", answer: "\\(2I_0\\) everywhere, with no fringes" },
        { prompt: "Why are the two slits in Young's experiment coherent sources?", answer: "Both are lit by the same source, so any change of phase reaches both together" },
      ],
      pyqExampleId: "6b3554ea-88aa-4cb4-9197-a9e816ac39d8",
      traps: [
        {
          title: "Giving equal amplitude as the condition for coherence",
          body: "Coherence means the same frequency and a constant phase difference. Equal amplitudes are not needed for fringes; they only make the minima completely dark.",
        },
        {
          title: "Saying energy is not conserved in interference",
          body: "Energy is redistributed, not created or destroyed. In an assertion that dark and bright fringes come from energy not being conserved, the assertion is true and the reason is false.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpwo-intensity",
      name: "Resultant intensity of two coherent waves",
      intuition:
        "Waves add their displacements, not their brightness. Two waves in step add up to twice the amplitude, and since intensity goes as amplitude squared, that is four times as bright. Two waves exactly out of step cancel to nothing. In between, the brightness follows the square of a cosine of half the phase difference.",
      definition:
        "- Two coherent waves of amplitude a reach a point with a phase difference \\(\\phi\\): \\(y_1 = a \\cos \\omega t\\), \\(y_2 = a \\cos(\\omega t + \\phi)\\).\n" +
        "- Add them: \\(y = a[\\cos \\omega t + \\cos(\\omega t + \\phi)] = 2a \\cos\\dfrac{\\phi}{2} \\cos\\left(\\omega t + \\dfrac{\\phi}{2}\\right)\\).\n" +
        "- The resultant amplitude is \\(2a \\cos(\\phi/2)\\). Intensity is proportional to amplitude squared, so \\(I = 4I_0 \\cos^2(\\phi/2)\\), where \\(I_0 \\propto a^2\\) is the intensity of each wave alone.\n" +
        "- Phase difference from path difference: \\(\\phi = \\dfrac{2\\pi}{\\lambda} \\Delta x\\).\n" +
        "- **Maxima:** \\(\\phi = 0, \\pm 2\\pi, \\pm 4\\pi, \\ldots\\) (path difference \\(n\\lambda\\)), intensity \\(4I_0\\). **Minima:** \\(\\phi = \\pm \\pi, \\pm 3\\pi, \\ldots\\) (path difference \\((n + \\tfrac{1}{2})\\lambda\\)), intensity zero.\n" +
        "- The average over the screen is \\(2I_0\\): what the dark fringes lose, the bright ones gain.\n" +
        "- If the question gives the intensity of the **central maximum** as \\(I_{\\max}\\), write \\(I = I_{\\max} \\cos^2(\\phi/2)\\).\n" +
        "- **Unequal waves** (asked in 2023 and 2025; the present NCERT book works only with equal waves): amplitudes add at a maximum and subtract at a minimum, so \\(\\dfrac{I_{\\max}}{I_{\\min}} = \\dfrac{(a_1 + a_2)^2}{(a_1 - a_2)^2} = \\dfrac{(\\sqrt{I_1} + \\sqrt{I_2})^2}{(\\sqrt{I_1} - \\sqrt{I_2})^2}\\).",
      formula: {
        label: "Two equal coherent waves",
        latex: "I = 4I_0\\cos^2\\frac{\\phi}{2}, \\qquad \\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta x",
        symbols: [
          { symbol: "\\(I_0\\)", meaning: "intensity of each wave alone" },
          { symbol: "\\(\\phi\\)", meaning: "phase difference at the point" },
          { symbol: "\\(\\Delta x\\)", meaning: "path difference at the point" },
        ],
      },
      authoredExample: {
        prompt: "Two coherent waves, each of intensity \\(I_0\\), meet at a point where their path difference is \\(3\\lambda/4\\). Find the intensity there.",
        steps: [
          "Given: \\(\\Delta x = \\dfrac{3\\lambda}{4}\\).",
          "Phase difference: \\(\\phi = \\dfrac{2\\pi}{\\lambda} \\times \\dfrac{3\\lambda}{4} = \\dfrac{3\\pi}{2}\\).",
          "Formula: \\(I = 4I_0 \\cos^2\\dfrac{\\phi}{2} = 4I_0 \\cos^2\\dfrac{3\\pi}{4}\\).",
          "\\(\\cos\\dfrac{3\\pi}{4} = -\\dfrac{1}{\\sqrt{2}}\\), so \\(\\cos^2\\dfrac{3\\pi}{4} = \\dfrac{1}{2}\\) and \\(I = 4I_0 \\times \\dfrac{1}{2} = 2I_0\\).",
        ],
        answer: "2I₀",
      },
      selfCheckExample: {
        prompt: "Two coherent beams of intensities 9I and I superpose. Find the ratio of the maximum to the minimum intensity.",
        steps: [
          "\\(\\sqrt{I_1} = 3\\sqrt{I}\\) and \\(\\sqrt{I_2} = \\sqrt{I}\\).",
          "\\(\\dfrac{I_{\\max}}{I_{\\min}} = \\dfrac{(3 + 1)^2}{(3 - 1)^2} = \\dfrac{16}{4} = 4\\).",
        ],
        answer: "4 : 1",
      },
      practiceSet: [
        { prompt: "Two coherent waves, each of intensity \\(I_0\\), meet in phase. What is the resultant intensity?", answer: "\\(4I_0\\)" },
        { prompt: "What phase difference corresponds to a path difference of \\(\\lambda/2\\)?", answer: "\\(\\pi\\)" },
        { prompt: "The maximum and minimum intensities in a pattern are in the ratio 49 : 1. Find the ratio of the amplitudes of the two waves.", answer: "\\((a_1 + a_2)/(a_1 - a_2) = 7\\), so \\(a_1 : a_2 = 4 : 3\\)" },
      ],
      pyqExampleId: "6feb1df1-d0b2-40d0-ab0f-847c5714f2fb",
      traps: [
        {
          title: "Using cos²φ instead of cos²(φ/2)",
          body: "The formula has half the phase difference. For \\(\\phi = 2\\pi/3\\) the angle inside the cosine is \\(\\pi/3\\), not \\(2\\pi/3\\).",
        },
        {
          title: "Taking 2I₀ as the intensity at a maximum",
          body: "At a maximum the amplitudes add, so the intensity is \\(4I_0\\), four times one wave. \\(2I_0\\) is the average over the screen.",
        },
        {
          title: "Using an intensity ratio where an amplitude ratio is needed",
          body: "Given \\(I_{\\max} : I_{\\min}\\), take the square root first to get \\((a_1 + a_2) : (a_1 - a_2)\\), then solve for the amplitudes. Square again at the end if the intensities are asked.",
        },
        {
          title: "Reading I₀ wrongly",
          body: "Check what \\(I_0\\) means in the question. If it is each wave's intensity, use \\(I = 4I_0 \\cos^2(\\phi/2)\\); if it is the central maximum, use \\(I = I_0 \\cos^2(\\phi/2)\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpwo-fringe-width",
      name: "Fringe positions, fringe width and angular width",
      intuition:
        "Move a point P up the screen from the centre and the path from the far slit grows longer than the path from the near slit. Each time this extra path grows by one more wavelength, P reaches another bright fringe. Because the extra path grows evenly with distance, the fringes are evenly spaced.",
      definition:
        "- Slits \\(S_1\\) and \\(S_2\\) are a distance d apart and the screen is at a distance D, with \\(D \\gg d\\). P is a point on the screen at a distance x from the centre O.\n" +
        "- Path difference at P: \\(S_2P - S_1P = \\dfrac{xd}{D}\\). (Outline: \\((S_2P)^2 - (S_1P)^2 = 2xd\\), and \\(S_2P + S_1P \\approx 2D\\).)\n" +
        "- **Bright fringes** where \\(\\dfrac{xd}{D} = n\\lambda\\): \\(x_n = \\dfrac{n\\lambda D}{d}\\), n = 0, ±1, ±2, ... The central fringe is n = 0.\n" +
        "- **Dark fringes** where \\(\\dfrac{xd}{D} = (n + \\tfrac{1}{2})\\lambda\\): \\(x_n = (n + \\tfrac{1}{2})\\dfrac{\\lambda D}{d}\\). The first dark fringe is at \\(\\dfrac{\\lambda D}{2d}\\).\n" +
        "- **Fringe width**, the distance between two successive bright (or dark) fringes: \\(\\beta = \\dfrac{\\lambda D}{d}\\). Bright and dark fringes are equally spaced.\n" +
        "- **Angular width** of a fringe: \\(\\theta = \\dfrac{\\beta}{D} = \\dfrac{\\lambda}{d}\\), which does not depend on D.\n" +
        "- **Two wavelengths:** bright fringes first coincide where \\(n_1 \\lambda_1 = n_2 \\lambda_2\\) with the smallest whole numbers; then \\(x = \\dfrac{n_1 \\lambda_1 D}{d}\\).\n" +
        "- The board asked for the derivation of the fringe width in 2022. The present NCERT book gives the condition \\(xd/D = n\\lambda\\) and the fringe positions but not the geometry of the path difference, so learn the two-line outline above.",
      formula: {
        label: "Fringe positions and widths",
        latex: "x_n = \\frac{n\\lambda D}{d}, \\qquad \\beta = \\frac{\\lambda D}{d}, \\qquad \\theta = \\frac{\\lambda}{d}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "distance between the two slits" },
          { symbol: "\\(D\\)", meaning: "distance from the slits to the screen" },
          { symbol: "\\(\\beta\\)", meaning: "fringe width" },
        ],
      },
      authoredExample: {
        prompt:
          "In a Young's double-slit experiment, light of wavelength 550 nm falls on slits 0.5 mm apart, and the screen is 1.5 m away. Find the fringe width and the distance of the second dark fringe from the central maximum.",
        steps: [
          "Given: \\(\\lambda = 550 \\times 10^{-9}\\) m, \\(d = 0.5 \\times 10^{-3}\\) m, \\(D = 1.5\\) m.",
          "Formula: \\(\\beta = \\dfrac{\\lambda D}{d} = \\dfrac{550 \\times 10^{-9} \\times 1.5}{0.5 \\times 10^{-3}} = 1.65 \\times 10^{-3}\\) m \\(= 1.65\\) mm.",
          "Second dark fringe: n = 1 in \\(x = (n + \\tfrac{1}{2})\\beta\\), so \\(x = 1.5 \\times 1.65 = 2.475\\) mm.",
        ],
        answer: "β = 1.65 mm; second dark fringe at about 2.48 mm",
      },
      selfCheckExample: {
        prompt:
          "Light of wavelengths 480 nm and 640 nm falls on two slits 0.8 mm apart, with the screen 1 m away. How far from the centre do their bright fringes first coincide?",
        steps: [
          "\\(n_1 \\times 480 = n_2 \\times 640\\), so \\(n_1 / n_2 = 4/3\\): the 4th fringe of 480 nm meets the 3rd of 640 nm.",
          "\\(x = \\dfrac{4 \\times 480 \\times 10^{-9} \\times 1}{0.8 \\times 10^{-3}} = 2.4 \\times 10^{-3}\\) m.",
        ],
        answer: "2.4 mm",
      },
      practiceSet: [
        { prompt: "The fourth bright fringe is 3.6 mm from the central maximum. Find the fringe width.", answer: "0.9 mm" },
        { prompt: "Find the angular width of a fringe for light of 700 nm and slits 0.35 mm apart.", answer: "\\(2 \\times 10^{-3}\\) rad" },
        { prompt: "At a point on the screen the path difference is \\(5\\lambda/2\\). Is the fringe there bright or dark?", answer: "Dark: it is an odd multiple of \\(\\lambda/2\\)" },
      ],
      pyqExampleId: "af1866d4-93bd-4d84-b32d-ad7ca2622b06",
      traps: [
        {
          title: "Mixing millimetres, centimetres and metres",
          body: "Most fringe questions give d in mm, D in m or cm and \\(\\lambda\\) in nm. Change all three to metres before you substitute, and give the answer with its unit.",
        },
        {
          title: "Putting the first dark fringe at λD/d",
          body: "\\(\\lambda D/d\\) is the first bright fringe. The dark fringes sit half way between: the first at \\(\\lambda D/2d\\), the third at \\(5\\lambda D/2d\\).",
        },
        {
          title: "Counting the central fringe as the first bright fringe",
          body: "The central maximum is n = 0. The 'fourth bright fringe' is n = 4, at \\(4\\beta\\) from the centre.",
        },
        {
          title: "Bringing D into the angular width",
          body: "The angular width \\(\\lambda/d\\) has no D in it. Moving the screen changes the fringe width on the screen, not the angle each fringe makes at the slits.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpwo-fringe-changes",
      name: "How the fringe pattern changes",
      intuition:
        "Nearly every 'what happens if' question is answered by two formulas: the fringe width \\(\\beta = \\lambda D/d\\) on the screen and the angular width \\(\\lambda/d\\) at the slits. Find which of \\(\\lambda\\), D or d the change touches, and read off the result. Then give the reason, because each part carries a mark for it.",
      definition:
        "- Use \\(\\beta = \\dfrac{\\lambda D}{d}\\) for the fringe width and \\(\\theta = \\dfrac{\\lambda}{d}\\) for the angular width.\n" +
        "- In a medium of refractive index n the wavelength becomes \\(\\lambda/n\\), so the fringe width becomes \\(\\beta/n\\).\n" +
        "- An extra phase difference of \\(\\pi\\) between the slits makes the total phase difference at the centre \\(\\pi\\): the centre turns dark.\n" +
        "- Three changes in the table were asked from older parts of the syllabus that the present NCERT book does not teach: moving the source slit (2022, 2024), white light (2023), and a transparent sheet placed in one beam (2025). Learn the short answers and spend less time on them.",
      table: {
        columns: ["Change made", "Effect on the fringes", "Reason"],
        rows: [
          {
            cells: ["Screen moved away from the slits", "Fringe width increases; the angular width stays the same; the fringes get fainter", "\\(\\beta \\propto D\\), but \\(\\lambda/d\\) has no D"],
            noteAmber: "Board 2022 and 2023 asked what happens to the angular separation of the fringes when the screen is moved.",
          },
          { cells: ["Slit separation d increased", "Fringe width and angular width both decrease", "\\(\\beta \\propto 1/d\\)"] },
          { cells: ["Slits brought very close together", "Fringes too wide to see: the screen looks evenly lit", "\\(\\beta\\) becomes very large as d becomes small"] },
          { cells: ["Slits moved far apart", "Fringes too fine to see separately", "\\(\\beta\\) becomes very small"] },
          { cells: ["Red light replaced by green or blue", "Fringe width decreases", "\\(\\beta \\propto \\lambda\\), and green and blue have shorter wavelengths"] },
          { cells: ["Whole apparatus put in a liquid of refractive index n", "Fringe width becomes \\(\\beta/n\\); the pattern is compressed; the central fringe stays at the centre", "Wavelength becomes \\(\\lambda/n\\); d and D do not change"] },
          { cells: ["Waves leave the slits with a phase difference of \\(\\pi\\)", "The centre becomes dark; bright and dark fringes swap places; the width is unchanged", "Total phase difference at the centre is \\(\\pi\\)"] },
          { cells: ["One slit closed", "The interference fringes vanish; the diffraction pattern of the open slit is seen", "Only one wave reaches the screen"] },
          { cells: ["Source slit moved closer to the two slits", "Fringe width unchanged; fringes less sharp, and they vanish when the source is too close", "Each part of a wide source gives its own pattern, and the patterns shift against each other"] },
          { cells: ["Thin transparent sheet of thickness t and refractive index n put in front of one slit", "The whole pattern shifts towards the covered slit; the fringe width is unchanged", "The sheet adds a phase of \\(2\\pi(n - 1)t/\\lambda\\) to one beam"] },
          { cells: ["Monochromatic light replaced by white light", "Central fringe white; a few coloured fringes on each side, then even illumination", "Each colour has its own fringe width, so only the centre is bright for all of them"] },
          { cells: ["Shape of the fringes when D is much larger than d", "Nearly straight lines, parallel to the slits", "The screen catches only a small, nearly straight part of each curve"] },
        ],
      },
      practiceSet: [
        { prompt: "The fringe width in air is 0.6 mm. What is it when the whole set-up is put in water of refractive index 4/3?", answer: "0.45 mm" },
        { prompt: "What happens to the angular width of the fringes if the screen is moved closer to the slits?", answer: "Nothing: \\(\\lambda/d\\) does not depend on D" },
        { prompt: "The 8th bright fringe in air falls at a point P. Which bright fringe falls at P when the apparatus is in a liquid of refractive index 1.5?", answer: "The 12th" },
      ],
      pyqExampleId: "4fab9f8d-54d0-4a6b-ada0-5984bf17e76f",
      traps: [
        {
          title: "Multiplying by n in a liquid",
          body: "In a liquid the wavelength is shorter, so the fringes crowd together: the fringe width is \\(\\beta/n\\), not \\(n\\beta\\).",
        },
        {
          title: "Saying 'increases' with no reason",
          body: "'Justify your answer' questions give a mark for the reason. Write the formula, say which quantity changed, and only then the effect.",
        },
        {
          title: "Changing the fringe width when the source slit moves",
          body: "The fringe width depends on \\(\\lambda\\), D and d only. Moving the source slit changes how sharp the fringes are, not how far apart they are.",
        },
      ],
    },
  ],
};
