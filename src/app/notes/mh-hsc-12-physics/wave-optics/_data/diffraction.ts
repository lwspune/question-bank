import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_WO_DIFFRACTION_NOTE: SubtopicNote = {
  subtopicName: "Diffraction at a Single Slit",
  title: "Diffraction of Light and the Single Slit",
  oneLineDefinition:
    "What diffraction is, Fresnel and Fraunhofer diffraction, how a single slit pattern differs from a double slit pattern, and the conditions for its dark and bright fringes.",
  whyItMatters:
    "11 questions, five of them from board papers. The board asks you to define diffraction and explain its two types (2016), distinguish interference from diffraction (2017, 2025), say what happens to the bands when blue light is replaced by red (2020) and find the slit width to wavelength ratio for a given first minimum (2025). The textbook adds the derivation of the fringe conditions and slit width problems.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpwo-fresnel-fraunhofer",
      name: "Diffraction: Fresnel and Fraunhofer",
      intuition:
        "Light is expected to cast sharp shadows, yet at the edge of a narrow slit or a thin wire it spreads into the shadow region. Every point of the wavefront at the edge acts as a new source and sends wavelets sideways, as Huygens' principle says. The effect is easy to see only when the opening is about as small as the wavelength, which is why we hear sound round a wall but do not see light round it.",
      definition:
        "- **Diffraction:** the bending of light around the edges of an obstacle in its path, so that it enters the region where a shadow is expected from geometrical optics. It is common to all waves.\n" +
        "- Diffraction of sound is easier to observe because the wavelength of sound is much larger.\n" +
        "- The two types of diffraction are named by the distances in the set-up, as in the table.",
      table: {
        columns: ["Point", "Fresnel diffraction", "Fraunhofer diffraction"],
        rows: [
          {
            cells: ["Distances of source and screen from the obstacle", "Much smaller", "Very large"],
            pyqExampleId: "3cea5077-65d5-4f1d-b5cc-07f04a8e94fe",
            noteAmber: "Board 2016 asked what diffraction is and to explain its two types.",
          },
          { cells: ["Incident wavefront", "Cylindrical or spherical, depending on the source", "Plane"] },
          { cells: ["Lenses", "None needed", "Source at the focus of a convex lens; a second convex lens focuses the pattern on the screen"] },
        ],
      },
      practiceSet: [
        { prompt: "Why is diffraction of sound easier to notice than diffraction of light?", answer: "The wavelength of sound is much larger, comparable to doorways and walls" },
        { prompt: "In which type of diffraction is the wavefront falling on the slit plane?", answer: "Fraunhofer diffraction" },
      ],
      traps: [
        {
          title: "Defining diffraction as 'light bends'",
          body: "Say where it bends and into what: around the edges of an obstacle, into the region of the geometrical shadow. One vague line does not earn the definition mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpwo-interference-vs-diffraction",
      name: "Interference and diffraction compared",
      intuition:
        "Both patterns come from waves adding up. In interference the waves come from two separate coherent sources, so all the fringes look alike. In diffraction the waves come from many points of the same slit, so the middle band is the brightest and twice as wide as the rest.",
      definition:
        "- A 'distinguish between' answer needs matching points on BOTH sides. Four points earn two marks.\n" +
        "- Watch the reversal: \\(n\\lambda\\) between the rays means a **bright** fringe in double slit interference but a **dark** fringe in single slit diffraction.",
      table: {
        columns: ["Point", "Double slit interference", "Single slit diffraction"],
        rows: [
          {
            cells: ["Waves that superpose", "From two coherent sources (the two slits)", "Secondary wavelets from different points of the same slit"],
            pyqExampleId: "944e81c3-dd3e-43db-95b3-8808973a180d",
            noteAmber: "Board 2017 asked you to distinguish interference from diffraction.",
          },
          {
            cells: ["Fringe width", "All fringes equal, \\(W = \\lambda D/d\\)", "Central bright fringe twice as wide as the others, \\(W = \\lambda D/a\\) for the rest"],
            pyqExampleId: "ab75ffd4-bc36-4d42-8f1d-984b0e76d885",
            noteAmber: "Board 2025 asked the same distinction with a numerical.",
          },
          { cells: ["Brightness of bright fringes", "Nearly the same", "The central fringe is the brightest"] },
          { cells: ["Fringes usually seen", "About 30 to 40", "About 20 to 30"] },
          { cells: ["Path difference \\(n\\lambda\\) gives", "A bright fringe", "A dark fringe"] },
        ],
      },
      practiceSet: [
        { prompt: "In which pattern is the central bright fringe twice as wide as the other bright fringes?", answer: "Single slit diffraction" },
        { prompt: "Which pattern has all its bright fringes of nearly the same brightness?", answer: "Double slit interference" },
      ],
      traps: [
        {
          title: "Writing one side only",
          body: "'Interference has equal fringes' is half a point. Pair it: 'equal fringes in interference; central fringe twice as wide in diffraction'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpwo-single-slit",
      name: "Fringes of a single slit",
      intuition:
        "Rays leaving the slit straight ahead all arrive in step, so the centre is bright. Tilt to an angle where the extreme rays differ by one whole wavelength, and split the slit into two halves: every point in the top half has a partner in the bottom half exactly half a wavelength behind it, so they cancel in pairs and that direction is dark. The bright bands sit roughly midway between the dark ones.",
      definition:
        "- A plane wavefront falls on a slit AB of width a, centre O. Each thin element of the slit is a secondary source; a lens focuses the light on a screen at distance D.\n" +
        "- Rays parallel to the axis meet at the centre \\(P_0\\) in phase: the **central maximum**.\n" +
        "- At angle \\(\\theta\\) the path difference between the extreme rays is \\(\\text{BC} = a\\sin\\theta\\). If it equals \\(\\lambda\\), pair each point of the upper half with the point a/2 below it: each pair differs by \\(\\lambda/2\\) and cancels, so the point is dark.\n" +
        "- **Dark fringes:** \\(a\\sin\\theta = n\\lambda\\), \\(n = \\pm 1, \\pm 2, \\dots\\). **Bright fringes** (midway): \\(a\\sin\\theta = (n + \\tfrac{1}{2})\\lambda\\).\n" +
        "- For small angles \\(\\sin\\theta \\approx y/D\\): nth dark fringe at \\(y = n\\lambda D/a\\), nth bright fringe at \\((n + \\tfrac{1}{2})\\lambda D/a\\). Spacing \\(W = \\lambda D/a\\).\n" +
        "- **Central bright fringe** lies between the first dark fringes on either side: width \\(2\\lambda D/a\\), twice the others.",
      formula: {
        label: "Single slit diffraction",
        latex: "a\\sin\\theta = n\\lambda \\ (\\text{dark}), \\qquad a\\sin\\theta = \\left(n + \\tfrac{1}{2}\\right)\\lambda \\ (\\text{bright}), \\qquad W_{central} = \\frac{2\\lambda D}{a}",
        symbols: [
          { symbol: "\\(a\\)", meaning: "width of the slit" },
          { symbol: "\\(\\theta\\)", meaning: "angle of the fringe from the central direction" },
          { symbol: "\\(D\\)", meaning: "distance from the slit to the screen" },
        ],
      },
      authoredExample: {
        prompt:
          "Light of wavelength 6000 Å falls on a slit 0.3 mm wide, and the pattern is seen on a screen 1.5 m away. Find the distance of the first dark fringe from the centre and the width of the central bright fringe.",
        steps: [
          "Given: \\(\\lambda = 6 \\times 10^{-7}\\) m, \\(a = 3 \\times 10^{-4}\\) m, \\(D = 1.5\\) m.",
          "Formula: first dark fringe at \\(y_1 = \\dfrac{\\lambda D}{a}\\).",
          "Substitution: \\(y_1 = \\dfrac{(6 \\times 10^{-7})(1.5)}{3 \\times 10^{-4}} = 3 \\times 10^{-3}\\) m = 3 mm.",
          "Central bright fringe: \\(2y_1 = 6\\) mm.",
        ],
        answer: "First dark fringe at 3 mm; central bright fringe 6 mm wide",
      },
      selfCheckExample: {
        prompt:
          "In single slit diffraction the first dark fringe is 2 mm from the centre on a screen 1 m from a slit 0.25 mm wide. Find the wavelength.",
        steps: ["\\(\\lambda = \\dfrac{ya}{D} = \\dfrac{(2 \\times 10^{-3})(2.5 \\times 10^{-4})}{1}\\).", "\\(\\lambda = 5 \\times 10^{-7}\\) m = 5000 Å."],
        answer: "5000 Å",
      },
      practiceSet: [
        { prompt: "The slit is made narrower. Does the central bright fringe become wider or narrower?", answer: "Wider, since its width is \\(2\\lambda D/a\\)" },
        { prompt: "How far is the second bright fringe from the centre, in terms of \\(W = \\lambda D/a\\)?", answer: "\\(2.5W\\)" },
        { prompt: "For a single slit, does \\(a\\sin\\theta = \\lambda\\) give a bright or a dark fringe?", answer: "Dark (the first minimum)" },
      ],
      pyqExampleId: "15e90890-abde-422d-b9de-70862ff087ad",
      traps: [
        {
          title: "Borrowing the double slit condition",
          body: "In a single slit \\(a\\sin\\theta = n\\lambda\\) is DARK. Treating it as bright halves the wavelength you find.",
        },
        {
          title: "Taking the central maximum as λD/a wide",
          body: "The central bright fringe stretches from the first dark fringe on one side to the first on the other: \\(2\\lambda D/a\\).",
        },
        {
          title: "Using sin θ ≈ θ at a large angle",
          body: "The small angle shortcut is for points near the centre of the screen. When the angle itself is given and is large, use its sine.",
        },
      ],
    },
  ],
};
