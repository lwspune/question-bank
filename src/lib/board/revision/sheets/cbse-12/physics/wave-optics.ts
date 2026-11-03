import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 10 Wave Optics. Statements checked against the NCERT
 * text (definitions are the book's own wording); most-asked years from all 128
 * CBSE board past-paper questions in the bank, 2022-2026. The current book
 * states the single slit results without the half-slit argument, and gives no
 * list of interference-diffraction differences; both are still asked.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Wave Optics",
  chapterSlug: "wave-optics",
  source: "NCERT Physics Part II (CBSE Class 12), Chapter 10",
  keyPoints: [
    {
      term: "Wavefront",
      text: "A locus of points which oscillate in phase; a wavefront is a surface of constant phase. A point source gives spherical wavefronts; at a large distance a small part is a plane wavefront. A ray is perpendicular to the wavefront and shows the direction of energy flow.",
    },
    {
      term: "Huygens principle",
      text: "Each point of the wavefront is the source of a secondary disturbance; the secondary wavelets spread out in all directions with the speed of the wave. The common tangent (forward envelope) of the wavelets is the new wavefront.",
    },
    {
      term: "Absence of the backwave",
      text: "Huygens argued that the amplitude of the secondary wavelets is maximum in the forward direction and zero in the backward direction. With this adhoc assumption he explained why there is no backwave.",
    },
    {
      term: "Refraction in the wave picture",
      text: "If the ray bends towards the normal, the speed in the second medium is less: \\(\\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2}\\). This is opposite to the corpuscular model; experiments proved the wave theory right. In a denser medium wavelength and speed decrease but frequency stays the same.",
    },
    {
      term: "Wavefronts through optical devices",
      text: "A plane wave through a thin prism comes out a tilted plane wave; through a convex lens it becomes a spherical wave converging to the focus; after reflection from a concave mirror it becomes a spherical wave converging to the focus.",
    },
    {
      term: "Coherent sources",
      text: "Two sources are coherent when the phase difference between the waves they produce at a point does not change with time; then the pattern is stable. Two independent sources (two sodium lamps) are incoherent: light from an ordinary source undergoes abrupt phase changes in about \\(10^{-10}\\) s, so the intensities just add and no fringes are seen.",
    },
    {
      term: "Constructive and destructive interference",
      text: "Path difference \\(n\\lambda\\) (phase difference \\(2n\\pi\\)): constructive, intensity \\(4I_0\\). Path difference \\((n + \\frac{1}{2})\\lambda\\) (phase difference \\((2n + 1)\\pi\\)): destructive, intensity zero.",
    },
    {
      term: "Young's experiment",
      text: "Young locked the phases: \\(S_1\\) and \\(S_2\\) are lit by one source S, so any abrupt phase change in S shows equally in both and they act as coherent sources. Bright and dark fringes are equally spaced. Interference is a proof of the wave nature of light.",
    },
    {
      term: "Energy in interference",
      text: "In interference and diffraction, light energy is redistributed. If it reduces in one region, producing a dark fringe, it increases in another region, producing a bright fringe. There is no gain or loss of energy.",
    },
    {
      term: "Diffraction",
      text: "Light bends around obstacles into the region of the geometrical shadow, giving alternate dark and bright regions. It is shown by all waves. The wavelength of light is much smaller than everyday obstacles, so its diffraction is rarely noticed; sound has a long wavelength, so we hear a person around a corner.",
    },
    {
      term: "Single slit pattern",
      text: "A broad central bright region at \\(\\theta = 0\\); on both sides alternate dark and bright regions, the intensity becoming weaker away from the centre. Minima at \\(\\theta \\approx \\frac{n\\lambda}{a}\\); secondary maxima at \\(\\theta \\approx (n + \\frac{1}{2})\\frac{\\lambda}{a}\\), weaker as n increases.",
    },
    {
      term: "Interference and diffraction compared",
      text: "Interference: superposition of waves from two coherent sources; fringes of equal width and equal intensity. Diffraction: from many points of one wavefront; central maximum twice as wide as the others, intensity falling away. A double slit pattern is the double slit interference inside the single slit diffraction of each slit.",
    },
    {
      term: "Polarisation",
      text: "Natural light is unpolarised. A polaroid transmits only the component of \\(\\vec{E}\\) along its pass-axis, giving plane polarised light of half the intensity. Through a second polaroid at angle \\(\\theta\\): \\(I = I_0\\cos^2\\theta\\) (Malus' law). Polarisation is special to transverse waves.",
    },
  ],
  formulas: [
    { label: "Refraction (wave theory)", latex: "\\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2} = \\frac{n_2}{n_1} \\qquad n = \\frac{c}{v} \\qquad \\frac{\\lambda_2}{\\lambda_1} = \\frac{v_2}{v_1} \\qquad \\nu \\text{ unchanged}" },
    { label: "Phase and path difference", latex: "\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta x" },
    { label: "Resultant intensity (equal waves)", latex: "I = 4I_0\\cos^2\\frac{\\phi}{2} \\qquad I_{max} = 4I_0 \\qquad I_{min} = 0" },
    {
      label: "Unequal waves",
      latex: "I = I_1 + I_2 + 2\\sqrt{I_1I_2}\\cos\\phi \\qquad \\frac{I_{max}}{I_{min}} = \\left(\\frac{\\sqrt{I_1} + \\sqrt{I_2}}{\\sqrt{I_1} - \\sqrt{I_2}}\\right)^2",
    },
    { label: "Incoherent sources", latex: "I = I_1 + I_2 \\qquad \\langle I \\rangle = 2I_0 \\text{ (equal sources)}" },
    { label: "Fringe positions", latex: "x_n = \\frac{n\\lambda D}{d} \\text{ (bright)} \\qquad x_n = \\left(n + \\frac{1}{2}\\right)\\frac{\\lambda D}{d} \\text{ (dark)}" },
    { label: "Fringe width", latex: "\\beta = \\frac{\\lambda D}{d} \\qquad \\theta = \\frac{\\lambda}{d} \\text{ (angular)} \\qquad \\beta_{medium} = \\frac{\\beta}{n}" },
    { label: "Single slit", latex: "\\theta_{min} = \\frac{n\\lambda}{a} \\qquad \\theta_{max} \\approx \\left(n + \\frac{1}{2}\\right)\\frac{\\lambda}{a} \\qquad \\text{central width} = \\frac{2\\lambda D}{a}" },
    { label: "Malus' law", latex: "I = I_0\\cos^2\\theta" },
  ],
  derivations: [
    {
      title: "Verify the laws of reflection using Huygens principle",
      steps: [
        "Plane wavefront AB meets mirror MN at A at angle of incidence i; B reaches C in time t, so \\(BC = vt\\).",
        "Draw a wavelet of radius \\(AE = vt\\) from A; the tangent plane CE from C is the reflected wavefront.",
        "Triangles EAC and BAC are right angled (at E and B), share AC and have \\(AE = BC\\): they are congruent.",
        "So the angles i and r are equal: angle of incidence = angle of reflection.",
      ],
    },
    {
      title: "Verify Snell's law of refraction using Huygens principle",
      steps: [
        "Plane wavefront AB meets the surface PP′ at A at angle i; B reaches C in time \\(\\tau\\): \\(BC = v_1\\tau\\).",
        "From A draw a wavelet of radius \\(AE = v_2\\tau\\) in medium 2; the tangent plane CE is the refracted wavefront.",
        "\\(\\sin i = \\frac{BC}{AC} = \\frac{v_1\\tau}{AC}\\) and \\(\\sin r = \\frac{AE}{AC} = \\frac{v_2\\tau}{AC}\\), so \\(\\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2}\\).",
        "With \\(n = \\frac{c}{v}\\): \\(n_1\\sin i = n_2\\sin r\\). Also \\(BC = \\lambda_1\\), \\(AE = \\lambda_2\\), so \\(\\frac{\\lambda_1}{\\lambda_2} = \\frac{v_1}{v_2}\\) and the frequency is unchanged.",
      ],
    },
    {
      title: "Resultant intensity of two coherent waves with phase difference φ",
      steps: [
        "\\(y_1 = a\\cos\\omega t\\), \\(y_2 = a\\cos(\\omega t + \\phi)\\).",
        "\\(y = y_1 + y_2 = 2a\\cos\\frac{\\phi}{2}\\cos\\left(\\omega t + \\frac{\\phi}{2}\\right)\\): amplitude \\(2a\\cos\\frac{\\phi}{2}\\).",
        "Intensity \\(\\propto\\) amplitude squared: \\(I = 4I_0\\cos^2\\frac{\\phi}{2}\\), where \\(I_0 \\propto a^2\\).",
        "Maximum \\(4I_0\\) for \\(\\phi = 0, \\pm 2\\pi, \\ldots\\); zero for \\(\\phi = \\pm\\pi, \\pm 3\\pi, \\ldots\\). Incoherent sources: \\(\\langle\\cos^2\\rangle = \\frac{1}{2}\\), so \\(I = 2I_0\\).",
      ],
    },
    {
      title: "Positions of bright and dark fringes and the fringe width in Young's double slit experiment",
      steps: [
        "Slits \\(S_1\\), \\(S_2\\) a distance d apart, screen at distance D; point P at distance x from the centre O.",
        "\\((S_2P)^2 - (S_1P)^2 = 2xd\\); since \\(D \\gg d\\), \\(S_2P + S_1P \\approx 2D\\), so path difference \\(S_2P - S_1P = \\frac{xd}{D}\\).",
        "Bright: \\(\\frac{xd}{D} = n\\lambda\\), \\(x_n = \\frac{n\\lambda D}{d}\\). Dark: \\(\\frac{xd}{D} = (n + \\frac{1}{2})\\lambda\\), \\(x_n = (n + \\frac{1}{2})\\frac{\\lambda D}{d}\\).",
        "Fringe width \\(\\beta = x_{n+1} - x_n = \\frac{\\lambda D}{d}\\), the same for bright and dark fringes; angular width \\(\\frac{\\lambda}{d}\\).",
      ],
    },
    {
      title: "Single slit diffraction: explain the minima and maxima and why the maxima get weaker",
      steps: [
        "Parallel light falls normally on a slit LN of width a; all points of the wavefront in the slit are secondary sources in phase. At angle \\(\\theta\\) the path difference between the edges is \\(a\\sin\\theta \\approx a\\theta\\).",
        "Centre (\\(\\theta = 0\\)): all parts arrive in phase: central maximum.",
        "If \\(a\\theta = \\lambda\\), split the slit into halves: each point of one half has a partner in the other \\(\\frac{\\lambda}{2}\\) out of step, so they cancel. In general minima at \\(\\theta = \\frac{n\\lambda}{a}\\).",
        "At \\(\\theta = \\frac{3\\lambda}{2a}\\) divide into thirds: two cancel, one third adds, a maximum; at \\((n + \\frac{1}{2})\\frac{\\lambda}{a}\\) only \\(\\frac{1}{2n + 1}\\) of the slit contributes, so the maxima weaken.",
        "Central maximum lies between \\(\\theta = \\pm\\frac{\\lambda}{a}\\): angular width \\(\\frac{2\\lambda}{a}\\), linear width \\(\\frac{2\\lambda D}{a}\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Huygens construction for a spherical wavefront",
      labels: ["point source O", "wavefront F1F2 at t = 0", "secondary wavelets of radius vt", "new wavefront G1G2, no backwave D1D2"],
    },
    {
      title: "Refraction of a plane wave at a plane surface",
      labels: ["incident wavefront AB in medium 1", "refracted wavefront CE in medium 2", "BC = v1τ, AE = v2τ", "angles i and r, surface PP′"],
    },
    {
      title: "Reflection of a plane wave by a plane surface",
      labels: ["incident wavefront AB", "reflected wavefront CE", "mirror MN, angles i and r", "BC = AE = vt"],
    },
    {
      title: "Plane wave through a thin prism, a convex lens, and on a concave mirror",
      labels: ["incident plane wavefront", "emergent tilted plane wavefront (prism)", "converging spherical wavefront (lens)", "reflected wave converging to the focus"],
    },
    {
      title: "Young's double slit arrangement and intensity graph",
      labels: ["source S, slits S1 and S2, separation d", "screen GG′ at distance D", "point P at distance x", "equal-width fringes, intensity 4I0 to 0"],
    },
    {
      title: "Single slit diffraction: geometry and intensity distribution",
      labels: ["slit LN of width a, midpoint M", "angle θ, point P on the screen", "broad central maximum", "weaker secondary maxima, minima at nλ/a"],
    },
  ],
  mostAsked: [
    { topic: "Young's double slit experiment: fringe width and fringe positions, angular width, effect of changes (screen, slits, medium), two wavelengths", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Coherent sources and intensity in interference: conditions for a sustained pattern, resultant intensity for a phase or path difference", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Single slit diffraction: positions of minima and maxima, width of the central maximum, or a numerical", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Huygens principle: wavefront, and reflection or refraction of a plane wave (verify the laws)", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Light entering a medium: speed, wavelength and frequency", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Differences between an interference pattern and a single slit diffraction pattern", marks: 2, years: [2025, 2024, 2023, 2022] },
  ],
  mistakes: [
    {
      title: "Fringe width in a liquid",
      body: "In a medium of refractive index n the wavelength becomes \\(\\frac{\\lambda}{n}\\), so \\(\\beta\\) becomes \\(\\frac{\\beta}{n}\\): narrower, not wider. Moving the screen changes \\(\\beta\\) but not the angular width \\(\\frac{\\lambda}{d}\\).",
    },
    {
      title: "Using the path difference as a phase",
      body: "Convert first: \\(\\phi = \\frac{2\\pi}{\\lambda}\\Delta x\\). Path \\(\\frac{\\lambda}{4}\\): \\(\\phi = \\frac{\\pi}{2}\\), \\(I = 2I_0\\). Path \\(\\frac{\\lambda}{3}\\): \\(\\phi = \\frac{2\\pi}{3}\\), \\(I = I_0\\). The 4 in \\(4I_0\\cos^2\\frac{\\phi}{2}\\) is needed.",
    },
    {
      title: "Counting dark fringes",
      body: "The first dark fringe is at \\(\\frac{\\beta}{2}\\), so the n-th dark fringe is at \\((n - \\frac{1}{2})\\beta\\). The 4th bright fringe and the 2nd dark fringe on the same side are \\(4\\beta - 1.5\\beta = 2.5\\beta\\) apart.",
    },
    {
      title: "Two wavelengths",
      body: "Bright fringes coincide where \\(n_1\\lambda_1 = n_2\\lambda_2\\): for 600 nm and 480 nm, \\(4 \\times 600 = 5 \\times 480\\), so the least distance is \\(\\frac{4 \\times 600\\text{ nm} \\times D}{d}\\).",
    },
    {
      title: "Single slit central maximum",
      body: "Its width is \\(\\frac{2\\lambda D}{a}\\), twice the other maxima. Halving the slit width doubles it; a longer wavelength (red, orange) widens it. Do not use the double slit formula with d replaced by a.",
    },
    {
      title: "Ratio of intensities from ratio of maxima",
      body: "\\(\\frac{I_{max}}{I_{min}} = \\frac{25}{9}\\) gives \\(\\frac{a_1 + a_2}{a_1 - a_2} = \\frac{5}{3}\\), so \\(\\frac{a_1}{a_2} = 4\\) and \\(\\frac{I_1}{I_2} = 16\\). Take the square root first, then solve for the amplitudes.",
    },
  ],
};

export default sheet;
