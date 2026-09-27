import type { SubtopicNote } from "@/app/notes/_types";

export const YDSE_FRINGES_NOTE: SubtopicNote = {
  subtopicName: "Young's Double Slit — Fringe Width, Positions and Shifts",
  title: "Young's Double Slit: Fringe Width, Fringe Positions and Shifts",
  oneLineDefinition:
    "In Young's experiment the bright fringes sit at y = nλD/d and the dark ones halfway between, so the fringe width is β = λD/d; a thin sheet over one slit shifts the whole pattern towards that slit by (μ − 1)tD/d.",
  whyItMatters:
    "39 PYQs, eight HARD — the largest page in the chapter. Three shapes: how the fringe width responds to λ, D, d or a medium, where a given bright or dark fringe lies (and when fringes of two wavelengths coincide, or a dark fringe falls opposite a slit), " +
    "and the shift a transparent sheet causes.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-fringe-width",
      name: "Fringe Width",
      intuition:
        "Fringes are spaced by the distance over which the path difference grows by one wavelength. A longer wavelength or a farther screen spreads them out; wider-set slits crowd them in. In water the wavelength shrinks by μ, and so does the fringe width.",
      definition:
        "- \\(\\beta = \\dfrac{\\lambda D}{d}\\); angular fringe width \\(\\dfrac{\\lambda}{d}\\).\n" +
        "- \\(d \\times 10\\), \\(D \\times \\dfrac{1}{2}\\) ⇒ \\(\\beta \\times \\dfrac{1}{20}\\). Same \\(\\beta\\) with \\(d\\) doubled needs \\(D\\) doubled.\n" +
        "- In a medium: \\(\\beta' = \\dfrac{\\beta}{\\mu}\\). Violet (short \\(\\lambda\\)) in place of sodium light: narrower fringes.\n" +
        "- Fixed region of screen: number of fringes \\(\\propto \\dfrac{1}{\\lambda}\\) (18 at 600 nm ⇒ 27 at 400 nm).\n" +
        "- \\(\\beta\\) against \\(D\\) is a straight line of slope \\(\\dfrac{\\lambda}{d}\\), so \\(\\lambda = \\text{slope} \\times d\\).",
      formula: {
        label: "Fringe width",
        latex: "\\beta = \\frac{\\lambda D}{d}",
      },
      authoredExample: {
        prompt: "\\(\\lambda = 500\\) nm, \\(D = 1\\) m, \\(d = 0.5\\) mm. Fringe width in air, and with the whole apparatus in water (\\(\\mu = \\frac{4}{3}\\))?",
        steps: ["\\(\\beta = \\dfrac{5 \\times 10^{-7} \\times 1}{5 \\times 10^{-4}} = 1\\) mm.", "In water: \\(\\dfrac{1}{4/3} = 0.75\\) mm."],
        answer: "1 mm; 0.75 mm",
      },
      selfCheckExample: {
        prompt: "The slit separation is tripled and the screen distance doubled. New fringe width?",
        steps: ["\\(\\beta \\propto \\dfrac{D}{d}\\): \\(\\dfrac{2}{3}\\)."],
        answer: "\\(\\dfrac{2}{3}\\beta\\)",
      },
      practiceSet: [
        { prompt: "Which makes fringes closer: blue light instead of green, or moving the screen away?", answer: "Blue light" },
        { prompt: "Biprism setups with equal fringe widths and slit separations 2 : 3. Ratio of screen distances?", answer: "2 : 3" },
        { prompt: "Wavelength 500 nm replaced by 640 nm. Fringe width changes by?", answer: "+28%" },
      ],
      pyqExampleId: "3b3bdff8-06a0-416f-b481-1cd6f8cfcfab",
      traps: [
        {
          title: "Multiplying the medium's μ",
          body:
            "In water the WAVELENGTH is divided by μ, so the fringe width is divided by μ too. Multiplying gives wider fringes, the wrong way round.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-fringe-positions",
      name: "Positions of Bright and Dark Fringes",
      intuition:
        "Count from the central bright fringe: the nth bright fringe is n fringe widths out, the nth dark fringe (n − ½). For two points on opposite sides, add the distances; on the same side, subtract. A point opposite one slit is d/2 from the centre, which fixes which fringe can sit there.",
      definition:
        "- Bright: \\(y_n = \\dfrac{n\\lambda D}{d} = n\\beta\\). Dark: \\(y_n = \\dfrac{(2n - 1)\\lambda D}{2d} = \\left(n - \\dfrac{1}{2}\\right)\\beta\\).\n" +
        "- 13th bright and 4th dark on the same side: \\(13\\beta - 3.5\\beta = 9.5\\beta\\). 6th dark and 4th bright on opposite sides: \\(5.5\\beta + 4\\beta = 9.5\\beta\\).\n" +
        "- Coincidence: \\(n\\)th bright of \\(\\lambda_1\\) on \\(m\\)th dark of \\(\\lambda_2\\): \\(n\\lambda_1 = \\left(m - \\dfrac{1}{2}\\right)\\lambda_2\\).\n" +
        "- Dark fringe opposite a slit (\\(y = \\dfrac{d}{2}\\)): \\(\\lambda = \\dfrac{d^2}{(2n - 1)D}\\) — first dark \\(\\dfrac{d^2}{D}\\), second \\(\\dfrac{d^2}{3D}\\), third \\(\\dfrac{d^2}{5D}\\).",
      formula: {
        label: "Fringe positions",
        latex: "y_{\\text{bright}} = n\\beta, \\qquad y_{\\text{dark}} = \\left(n - \\tfrac{1}{2}\\right)\\beta",
      },
      authoredExample: {
        prompt: "The fringe width is 0.4 mm. How far apart are the 5th bright and the 3rd dark fringe on the same side?",
        steps: ["5th bright: \\(5 \\times 0.4 = 2.0\\) mm; 3rd dark: \\(2.5 \\times 0.4 = 1.0\\) mm.", "Separation: 1.0 mm."],
        answer: "1.0 mm",
      },
      selfCheckExample: {
        prompt: "The 4th bright fringe of \\(\\lambda_1\\) coincides with the 5th dark fringe of \\(\\lambda_2\\). \\(\\dfrac{\\lambda_1}{\\lambda_2}\\)?",
        steps: ["\\(4\\lambda_1 = 4.5\\lambda_2\\)."],
        answer: "\\(\\dfrac{9}{8}\\)",
      },
      practiceSet: [
        { prompt: "First dark fringe directly opposite one slit. \\(\\lambda\\)?", answer: "\\(\\dfrac{d^2}{D}\\)" },
        { prompt: "Ratio of distances of the nth bright and mth dark fringe from the centre?", answer: "\\(n : \\left(m - \\frac{1}{2}\\right)\\)" },
      ],
      pyqExampleId: "f99c5672-8f90-4a87-863b-422420e8fda6",
      traps: [
        {
          title: "Placing the nth dark fringe at nβ",
          body:
            "The first dark fringe is only HALF a fringe width out. The 4th dark is at \\(3.5\\beta\\), not \\(4\\beta\\) — and the difference is always one of the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-sheet-shift",
      name: "A Transparent Sheet Over One Slit",
      intuition:
        "A sheet of thickness t and index μ makes light through it travel (μ − 1)t of extra optical path. The point of zero path difference — the central bright fringe — moves towards the covered slit until the geometry makes up that extra path. The fringe width does not change.",
      definition:
        "- Extra optical path \\((\\mu - 1)t\\); shift \\(= \\dfrac{(\\mu - 1)tD}{d}\\), i.e. \\(\\dfrac{(\\mu - 1)t}{\\lambda}\\) fringes.\n" +
        "- The pattern shifts TOWARDS the covered slit; fringe width and number are unchanged.\n" +
        "- Same thickness, different sheets: shift \\(\\propto (\\mu - 1)\\).",
      formula: {
        label: "Fringe shift",
        latex: "\\Delta y = \\frac{(\\mu - 1)tD}{d}, \\qquad N = \\frac{(\\mu - 1)t}{\\lambda}",
      },
      authoredExample: {
        prompt: "A sheet 5 μm thick with \\(\\mu = 1.6\\) covers one slit; \\(\\lambda = 600\\) nm. By how many fringes does the pattern shift?",
        steps: ["\\(N = \\dfrac{0.6 \\times 5 \\times 10^{-6}}{6 \\times 10^{-7}} = 5\\)."],
        answer: "5 fringes",
      },
      selfCheckExample: {
        prompt: "A plate of \\(\\mu = 1.5\\) shifts the fringes by y. Another of the same thickness with \\(\\mu = 1.75\\)?",
        steps: ["\\(\\dfrac{0.75}{0.5} = 1.5\\)."],
        answer: "1.5y",
      },
      practiceSet: [
        { prompt: "Which way does the central maximum move when one slit is covered by glass?", answer: "Towards the covered slit" },
        { prompt: "A film of thickness t and index n in a ray's path changes its optical path by?", answer: "Increases it by (n − 1)t" },
      ],
      pyqExampleId: "a878f350-2a01-4ab2-b748-966e4386ae85",
      traps: [
        {
          title: "Using μt instead of (μ − 1)t",
          body:
            "The sheet REPLACES a thickness t of air, so the extra path is \\((\\mu - 1)t\\). Using \\(\\mu t\\) makes the shift about three times too big.",
        },
      ],
    },
  ],
  related: [
    { label: "Interference Intensity and Coherent Sources", href: "/notes/mht-cet-physics/wave-optics/cetp-interference-intensity" },
    { label: "Single Slit Diffraction", href: "/notes/mht-cet-physics/wave-optics/cetp-diffraction" },
  ],
};
