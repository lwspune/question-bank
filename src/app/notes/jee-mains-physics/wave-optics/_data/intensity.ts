import type { SubtopicNote } from "@/app/notes/_types";

export const INTENSITY_WO_NOTE: SubtopicNote = {
  subtopicName: "Double Slit Intensity and Slab Shifts",
  title: "Double Slit Intensity and Slab Shifts",
  oneLineDefinition:
    "The brightness at any point on a double-slit screen is I_max cos²(φ/2), with the phase φ found from the path difference; a thin sheet over one slit adds (μ − 1)t to that path and slides the whole pattern towards the covered slit.",
  whyItMatters:
    "Twenty PYQs, nine of them multiple choice, and eight from 2026, more than any other page in the chapter. Five work out the path difference from the geometry, most of them at the point straight opposite one slit. Eight turn a path or phase difference into an intensity. Seven put a thin sheet over one slit and ask how far, or by how many fringes, the pattern moves.",
  concepts: [
    // C1 — path difference from the geometry
    {
      kind: "formula" as const,
      slug: "jpwo-path-geometry",
      name: "Path difference from the geometry",
      intuition:
        "Every intensity question starts with the path difference. For a point a height y up a distant screen, the two paths differ by yd/D. The point straight opposite one slit is a favourite, because there y is exactly d/2. When the screen is close, or the source is not on the centre line, write each path out in full instead.",
      definition:
        "- Far screen (D much larger than d and y): \\(\\Delta x = \\dfrac{yd}{D}\\).\n" +
        "- Straight opposite one slit: \\(y = \\dfrac{d}{2}\\), so \\(\\Delta x = \\dfrac{d^{2}}{2D}\\).\n" +
        "- The first dark fringe falls opposite a slit when \\(\\dfrac{d^{2}}{2D} = \\dfrac{\\lambda}{2}\\), that is \\(\\lambda = \\dfrac{d^{2}}{D}\\).\n" +
        "- Otherwise write each path with Pythagoras. A point P a distance D straight ahead of one slit is \\(\\sqrt{D^{2} + d^{2}}\\) from the other, so \\(\\Delta x = \\sqrt{D^{2} + d^{2}} - D \\approx \\dfrac{d^{2}}{2D}\\).\n" +
        "- If the source is off the centre line, the paths from the source to the two slits differ too; add that difference to the one after the slits.",
      formula: {
        label: "Path difference",
        latex: "\\Delta x = \\frac{yd}{D}, \\qquad \\Delta x_{\\text{opposite a slit}} = \\frac{d^{2}}{2D}, \\qquad \\sqrt{D^{2} + d^{2}} - D \\approx \\frac{d^{2}}{2D}",
      },
      authoredExample: {
        prompt:
          "Slits 0.8 mm apart are lit with light of 400 nm, and the screen is 1.6 m away. What is seen on the screen straight opposite one of the slits?",
        steps: [
          "Opposite a slit, \\(y = 0.4\\) mm.",
          "\\(\\Delta x = \\dfrac{yd}{D} = \\dfrac{0.4 \\times 10^{-3} \\times 0.8 \\times 10^{-3}}{1.6} = 2 \\times 10^{-7}\\) m = 200 nm.",
          "That is exactly \\(\\lambda/2\\), so the waves arrive half a wave apart and cancel.",
        ],
        answer: "A dark fringe (the first one).",
      },
      selfCheckExample: {
        prompt:
          "Slits 1.2 mm apart, screen 1.2 m away, light of 480 nm. Find the intensity straight opposite one slit as a fraction of the maximum.",
        steps: [
          "\\(\\Delta x = \\dfrac{d^{2}}{2D} = \\dfrac{(1.2 \\times 10^{-3})^{2}}{2.4} = 6 \\times 10^{-7}\\) m = 1.25\\(\\lambda\\).",
          "\\(\\phi = 2\\pi \\times 1.25 = 2.5\\pi\\), so \\(I = I_{\\max}\\cos^{2}(1.25\\pi) = \\dfrac{I_{\\max}}{2}\\).",
        ],
        answer: "Half the maximum.",
      },
      practiceSet: [
        { prompt: "d = 2 mm, D = 2 m. Path difference straight opposite a slit?", answer: "1 μm" },
        { prompt: "d = 1 mm, D = 1 m. Wavelength for which the first dark fringe falls opposite a slit?", answer: "1000 nm" },
        { prompt: "d = 1 mm, D = 1 m, λ = 500 nm. Path difference at y = 0.25 mm, as a fraction of λ?", answer: "λ/2 (dark)" },
        { prompt: "Exact path difference to a point 4 m straight ahead of one slit, the other slit 3 m to the side?", answer: "1 m (5 m − 4 m)" },
      ],
      pyqExampleId: "bdee5630-8cf6-4446-a12e-5eca3a7b7afd", // 2026: d = 5λ, D = 10d, opposite a slit → I₀/2
      traps: [
        {
          title: "Opposite a slit is y = d/2",
          body: "The centre of the screen is midway between the slits, so a slit is d/2 from it, not d. Using y = d doubles the path difference.",
        },
        {
          title: "yd/D needs a far screen",
          body: "When the screen is only a few slit gaps away, or a figure sets the point beside one slit, write each path with Pythagoras and subtract.",
        },
        {
          title: "Know which I₀ the question means",
          body: "Some stems call the maximum intensity I₀, others call the intensity of one slit I₀, which makes the maximum 4I₀. Read the definition before you answer.",
        },
      ],
    },

    // C2 — intensity from phase
    {
      kind: "formula" as const,
      slug: "jpwo-phase-intensity",
      name: "Intensity from path and phase",
      intuition:
        "With two equal slits, the brightness rises and falls smoothly as cos² of half the phase difference. At the centre the waves are in step and the screen is four times as bright as one slit alone. Half a wave of path later it is dark. Everything in between follows one formula.",
      definition:
        "- Phase from path: \\(\\phi = \\dfrac{2\\pi}{\\lambda}\\Delta x\\).\n" +
        "- Equal slits, each giving \\(I_{0}\\) alone: \\(I = 4I_{0}\\cos^{2}\\dfrac{\\phi}{2} = I_{\\max}\\cos^{2}\\dfrac{\\phi}{2}\\), with \\(I_{\\max} = 4I_{0}\\).\n" +
        "- Equivalently \\(I = I_{\\max}\\cos^{2}\\dfrac{\\pi\\,\\Delta x}{\\lambda}\\).\n" +
        "- Two landmarks: \\(\\Delta x = \\lambda/4\\) gives \\(I_{\\max}/2\\); \\(\\Delta x = \\lambda/2\\) gives zero.\n" +
        "- To find where a given intensity first appears: solve for the smallest \\(\\phi\\), turn it into \\(\\Delta x\\), then \\(y = \\Delta x\\,\\dfrac{D}{d}\\).",
      formula: {
        label: "Double-slit intensity",
        latex: "I = 4I_{0}\\cos^{2}\\frac{\\phi}{2} = I_{\\max}\\cos^{2}\\frac{\\pi\\,\\Delta x}{\\lambda}, \\qquad \\phi = \\frac{2\\pi}{\\lambda}\\Delta x",
      },
      authoredExample: {
        prompt:
          "Light of 640 nm falls on slits 0.3 mm apart, with the screen 1.5 m away. How far from the central maximum does the intensity first fall to half the maximum?",
        steps: [
          "\\(\\cos^{2}\\dfrac{\\phi}{2} = \\dfrac{1}{2}\\), so the smallest \\(\\phi\\) is \\(\\dfrac{\\pi}{2}\\).",
          "\\(\\Delta x = \\dfrac{\\lambda}{2\\pi}\\phi = \\dfrac{\\lambda}{4} = 160\\) nm.",
          "\\(y = \\Delta x\\,\\dfrac{D}{d} = \\dfrac{160 \\times 10^{-9} \\times 1.5}{0.3 \\times 10^{-3}} = 8 \\times 10^{-4}\\) m. Check: \\(\\beta = 3.2\\) mm and \\(\\beta/4 = 0.8\\) mm.",
        ],
        answer: "0.8 mm",
      },
      selfCheckExample: {
        prompt:
          "Each slit alone gives 5 W/m² on the screen. Find the intensity where the path difference is \\(\\lambda/8\\).",
        steps: [
          "\\(\\phi = \\dfrac{2\\pi}{\\lambda} \\cdot \\dfrac{\\lambda}{8} = \\dfrac{\\pi}{4}\\).",
          "\\(I = 4I_{0}\\cos^{2}\\dfrac{\\pi}{8} = 2I_{0}\\left(1 + \\cos\\dfrac{\\pi}{4}\\right) = 10 \\times 1.707 \\approx 17.1\\) W/m².",
        ],
        answer: "About 17.1 W/m²",
      },
      practiceSet: [
        { prompt: "Each slit alone gives \\(I_{0}\\). Intensity at the central maximum?", answer: "\\(4I_{0}\\)" },
        { prompt: "Phase difference \\(\\pi\\). Intensity?", answer: "Zero" },
        { prompt: "Phase difference \\(2\\pi/3\\). Intensity as a fraction of \\(I_{\\max}\\)?", answer: "1/4" },
        { prompt: "Path difference λ. Intensity as a fraction of \\(I_{\\max}\\)?", answer: "1 (a bright fringe)" },
      ],
      pyqExampleId: "1c4cb0c4-d7a8-4c3d-8480-237f414b44ed", // 2024: I = Imax/4, 600 nm, d = 1 mm, D = 1 m → 200 μm
      traps: [
        {
          title: "Half the phase inside the cosine",
          body: "I = I_max cos²(φ/2), not cos²φ. With the full phase, λ/4 would give zero instead of half.",
        },
        {
          title: "I₀ for one slit means I_max = 4I₀",
          body: "If I₀ is the intensity of one slit alone, the formula is 4I₀cos²(φ/2). Writing I₀cos²(φ/2) gives answers four times too small.",
        },
        {
          title: "Path is not phase",
          body: "A path of λ/3 is a phase of 2π/3. Put the path straight into the cosine and the answer is wrong by a factor of 2π/λ.",
        },
      ],
    },

    // C3 — slab shifts
    {
      kind: "formula" as const,
      slug: "jpwo-slab",
      name: "A thin sheet over one slit",
      intuition:
        "A glass sheet over one slit makes that path longer by (μ − 1)t. The central bright fringe is wherever the two optical paths are equal, so it moves towards the covered slit, where the geometric path is shorter and makes up the difference. The whole pattern slides over; the fringes keep their width.",
      definition:
        "- Extra optical path: \\((\\mu - 1)t\\). Number of fringes shifted: \\(N = \\dfrac{(\\mu - 1)t}{\\lambda}\\).\n" +
        "- Distance shifted: \\(\\Delta y = N\\beta = \\dfrac{(\\mu - 1)tD}{d}\\), towards the covered slit.\n" +
        "- Two sheets of equal thickness, one on each slit: net extra path \\((\\mu_{2} - \\mu_{1})t\\), shift towards the slit with the larger μ.\n" +
        "- The fringe width does not change.\n" +
        "- The point where the centre used to be is bright again only if \\((\\mu - 1)t\\) is a whole number of wavelengths.",
      formula: {
        label: "Sheet shift",
        latex: "\\Delta y = \\frac{(\\mu - 1)tD}{d} = \\frac{(\\mu - 1)t}{\\lambda}\\,\\beta",
      },
      authoredExample: {
        prompt:
          "A mica sheet (μ = 1.6) 5 μm thick covers one slit. λ = 600 nm, d = 0.5 mm and D = 1 m. By how many fringes, and how far, does the central maximum move?",
        steps: [
          "Extra path: \\((1.6 - 1) \\times 5 = 3\\) μm.",
          "Fringes: \\(N = \\dfrac{3 \\times 10^{-6}}{600 \\times 10^{-9}} = 5\\).",
          "\\(\\beta = \\dfrac{600 \\times 10^{-9} \\times 1}{0.5 \\times 10^{-3}} = 1.2\\) mm, so \\(\\Delta y = 5 \\times 1.2 = 6\\) mm, towards the covered slit.",
        ],
        answer: "5 fringes, 6 mm towards the covered slit.",
      },
      selfCheckExample: {
        prompt:
          "Sheets 12 μm thick with μ = 1.45 and μ = 1.55 cover the two slits. λ = 600 nm. By how many fringes does the central maximum move, and which way?",
        steps: [
          "Net extra path: \\((1.55 - 1.45) \\times 12 = 1.2\\) μm.",
          "\\(N = \\dfrac{1.2 \\times 10^{-6}}{600 \\times 10^{-9}} = 2\\), towards the slit with μ = 1.55.",
        ],
        answer: "2 fringes, towards the μ = 1.55 sheet.",
      },
      practiceSet: [
        { prompt: "Glass μ = 1.5, λ = 600 nm. Thickness that shifts the pattern by exactly one fringe?", answer: "1.2 μm" },
        { prompt: "A sheet of μ = 1.55 shifts the pattern by 2 fringes with λ = 550 nm. Thickness?", answer: "2 μm" },
        { prompt: "μ = 1.5, t = 4 μm, D = 1 m, d = 1 mm. Shift of the central maximum?", answer: "2 mm" },
        { prompt: "Does the fringe width change when a sheet is added?", answer: "No" },
      ],
      pyqExampleId: "dd67fb4e-099b-43dc-8794-a6664bbe47ca", // 2026: d = 0.1 cm, D = 50 cm, n = 1.5, shift 0.2 cm → t = 8 × 10⁻⁴ cm
      traps: [
        {
          title: "Towards the covered slit",
          body: "The sheet lengthens that path, so the equal-path point moves to the side where the geometric path is shorter: the covered side.",
        },
        {
          title: "Use μ − 1, not μ",
          body: "The sheet replaces the same thickness of air, so it adds (μ − 1)t. Using μt gives a shift about three times too large for glass.",
        },
        {
          title: "The fringes do not narrow",
          body: "The sheet only moves the pattern. β = λD/d is unchanged, so an option that changes the fringe width is wrong.",
        },
      ],
    },
  ],
};
