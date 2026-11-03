import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 7 Wave Optics. Statements checked against the
 * Balbharati text (law wordings are the book's own); most-asked years from 40
 * of the 41 board past-paper questions in the bank, 2016-2026 (a 2017 Doppler
 * "red shift" question is left out: the current book does not teach it).
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Wave Optics",
  chapterSlug: "wave-optics",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 7",
  keyPoints: [
    {
      term: "Wavefront",
      text: "The locus of all points having the same phase at a given instant of time. A point source gives spherical wavefronts; a very distant source gives plane wavefronts. A ray is perpendicular to the wavefront.",
    },
    {
      term: "Huygens' principle",
      text: "Each point on a wavefront acts as a secondary source of light, emitting secondary wavelets in all directions with the speed of light in the medium. The new wavefront is the envelope of the secondary wavelets in the forward direction; backward wavelets are ineffective.",
    },
    {
      term: "Light in a medium",
      text: "The frequency of a wave does not change from one medium to another. The speed and wavelength change: \\(v = \\frac{c}{n}\\) and \\(\\lambda = \\frac{\\lambda_0}{n}\\).",
    },
    {
      term: "Polarization and Malus' law",
      text: "Only transverse waves can be polarized. A polarizer passes only the electric field along its polarizing axis, so unpolarized light emerges plane polarized with half its intensity. **Malus' law**: polarized light of intensity \\(I_1\\) through a second polarizer at angle \\(\\theta\\) gives \\(I_1\\cos^2\\theta\\).",
    },
    {
      term: "Brewster's law",
      text: "At one angle of incidence, the Brewster's angle \\(\\theta_B\\), the reflected light is completely plane polarized and the reflected and refracted rays are perpendicular to each other: \\(\\tan\\theta_B = \\frac{n_2}{n_1}\\). It works only for non-metallic surfaces.",
    },
    {
      term: "Methods of polarization",
      text: "By a polarizer (polaroid), by reflection at the Brewster's angle, and by scattering: sunlight scattered by air molecules is partially polarized.",
    },
    {
      term: "Interference",
      text: "When two waves overlap, the resultant intensity is non-uniform: larger at some places (crest on crest, constructive) and smaller at others (crest on trough, destructive). This is interference.",
    },
    {
      term: "Coherent sources",
      text: "Two sources which emit waves of the same frequency having a constant phase difference, independent of time. They are obtained from a single source: two slits (Young), Lloyd's mirror or a Fresnel biprism.",
    },
    {
      term: "Constructive and destructive interference",
      text: "**Bright**: path difference \\(n\\lambda\\) (phase difference \\(2n\\pi\\)). **Dark**: path difference \\((n - \\frac{1}{2})\\lambda\\), a half-integral multiple of \\(\\lambda\\) (phase difference \\((2n - 1)\\pi\\)).",
    },
    {
      term: "Conditions for a steady interference pattern",
      text: "1. Coherent sources (essential). 2. Monochromatic light. 3. Equal amplitudes, so dark fringes are fully dark. 4. Slit separation small compared with the distance to the screen. 5. Narrow slits. 6. The same state of polarization.",
    },
    {
      term: "Fresnel biprism",
      text: "A prism with a vertex angle of nearly 180°: two thin prisms joined at their bases, edge parallel to the slit. Its two halves form two virtual images S1 and S2 of the slit, which act as coherent sources; fringes form in the region where the two beams overlap.",
    },
    {
      term: "Diffraction and its two types",
      text: "Light bends around the edges of obstacles into the region of the geometrical shadow. **Fraunhofer**: source, slit and screen effectively far apart; plane wavefront; lenses used. **Fresnel**: distances smaller; cylindrical or spherical wavefront; no lens needed.",
    },
    {
      term: "Interference and diffraction patterns compared",
      text: "Interference: many fringes (30 to 40) of equal width and nearly equal brightness. Single slit diffraction: fewer fringes (20 to 30); the central bright fringe is the brightest and twice as wide as the others, and the intensity falls off on both sides.",
    },
    {
      term: "Resolving power",
      text: "The limit of resolution is the minimum angle between two objects that an instrument can show as separate. Its reciprocal is the resolving power. **Rayleigh's criterion**: two objects are just resolved when the first dark ring of one falls on the centre of the other's pattern.",
    },
  ],
  formulas: [
    { label: "Refraction", latex: "n = \\frac{c}{v} \\qquad \\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2} = \\frac{n_2}{n_1} \\qquad \\lambda = \\frac{\\lambda_0}{n}" },
    { label: "Polarizers (Malus' law)", latex: "I_1 = \\frac{I_0}{2} \\qquad I_2 = I_1\\cos^2\\theta" },
    { label: "Brewster's law", latex: "\\tan\\theta_B = \\frac{n_2}{n_1} \\qquad \\theta_B + \\theta_r = 90^\\circ" },
    { label: "Path and phase difference", latex: "\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta l \\qquad \\Delta l = \\frac{yd}{D}" },
    { label: "Bright and dark fringes", latex: "y_n = \\frac{n\\lambda D}{d} \\text{ (bright)} \\qquad y_n = \\left(n - \\frac{1}{2}\\right)\\frac{\\lambda D}{d} \\text{ (dark)}" },
    { label: "Fringe width", latex: "W = \\frac{\\lambda D}{d}" },
    {
      label: "Intensity and amplitude",
      latex: "I \\propto a^2 \\qquad \\frac{I_{max}}{I_{min}} = \\left(\\frac{a_1 + a_2}{a_1 - a_2}\\right)^2",
    },
    {
      label: "Single slit diffraction",
      latex: "a\\sin\\theta = n\\lambda \\text{ (dark)} \\qquad a\\sin\\theta = \\left(n + \\frac{1}{2}\\right)\\lambda \\text{ (bright)} \\qquad W_{central} = \\frac{2\\lambda D}{a}",
    },
    { label: "Telescope", latex: "\\theta = \\frac{1.22\\lambda}{D} \\qquad RP = \\frac{D}{1.22\\lambda}" },
    { label: "Microscope", latex: "d_{min} = \\frac{1.22\\lambda}{2n\\sin\\alpha} \\qquad RP = \\frac{2n\\sin\\alpha}{1.22\\lambda}" },
  ],
  derivations: [
    {
      title: "Laws of reflection using Huygens' principle",
      steps: [
        "Plane wavefront AB meets the mirror MN at A at \\(t = 0\\), at angle of incidence \\(i\\); B reaches C after time \\(T\\), so \\(BC = vT\\).",
        "In the same time the wavelet from A grows to radius \\(AE = vT\\). The tangent CE is the reflected wavefront.",
        "Triangles ABC and AEC: right angled at B and E, AC common, \\(BC = AE\\). So they are congruent and \\(\\angle BAC = \\angle ECA\\).",
        "Hence angle of incidence = angle of reflection; incident ray, reflected ray and normal lie in one plane.",
      ],
    },
    {
      title: "Laws of refraction using Huygens' principle",
      steps: [
        "Wavefront AB meets the boundary MN at A at \\(t = 0\\); B reaches C after time \\(T\\) in medium 1: \\(BC = v_1T\\).",
        "In medium 2 the wavelet from A grows to \\(AE = v_2T\\). The tangent CE is the refracted wavefront.",
        "\\(\\sin i = \\frac{BC}{AC}\\) and \\(\\sin r = \\frac{AE}{AC}\\), so \\(\\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2}\\).",
        "With \\(v = \\frac{c}{n}\\): \\(\\frac{\\sin i}{\\sin r} = \\frac{n_2}{n_1}\\), or \\(n_1\\sin i = n_2\\sin r\\) (Snell's law).",
      ],
    },
    {
      title: "State Brewster's law and derive the formula for Brewster's angle",
      steps: [
        "At the Brewster's angle the reflected ray is completely plane polarized and perpendicular to the refracted ray.",
        "So \\(\\theta_B + \\theta_r = 90^\\circ\\), i.e. \\(\\theta_r = 90^\\circ - \\theta_B\\).",
        "Snell's law: \\(n_1\\sin\\theta_B = n_2\\sin(90^\\circ - \\theta_B) = n_2\\cos\\theta_B\\).",
        "Hence \\(\\tan\\theta_B = \\frac{n_2}{n_1}\\); from air, \\(\\tan\\theta_B = n\\).",
      ],
    },
    {
      title: "Malus' law",
      steps: [
        "After the first polarizer, unpolarized light of intensity \\(I_0\\) is plane polarized with amplitude \\(E_{10}\\) and intensity \\(I_1 = \\frac{I_0}{2}\\).",
        "The axis of the second polarizer makes angle \\(\\theta\\) with the first: only the component \\(E_{10}\\cos\\theta\\) passes.",
        "Intensity \\(\\propto\\) amplitude squared, so \\(I_2 = I_1\\cos^2\\theta\\). Parallel axes: no change; crossed axes: no light.",
      ],
    },
    {
      title: "Fringe width in Young's double slit experiment",
      steps: [
        "Slits S1, S2 a distance \\(d\\) apart, screen at distance \\(D\\); point P at distance \\(y\\) from the centre O′.",
        "\\((S_2P)^2 - (S_1P)^2 = 2yd\\). As \\(D \\gg d\\), \\(S_2P + S_1P \\approx 2D\\), so path difference \\(S_2P - S_1P = \\frac{yd}{D}\\).",
        "Bright fringe: \\(\\frac{yd}{D} = n\\lambda\\), so \\(y_n = \\frac{n\\lambda D}{d}\\). Dark fringe: \\(y_n = \\left(n - \\frac{1}{2}\\right)\\frac{\\lambda D}{d}\\).",
        "Fringe width \\(W = y_{n+1} - y_n = \\frac{\\lambda D}{d}\\): bright and dark fringes are equally spaced and of equal width.",
      ],
    },
    {
      title: "Positions of minima in single slit (Fraunhofer) diffraction",
      steps: [
        "Plane wavefront on a slit of width \\(a\\); the path difference between the extreme rays at angle \\(\\theta\\) is \\(a\\sin\\theta\\).",
        "Divide the slit into two halves: if \\(a\\sin\\theta = \\lambda\\), each point of one half has a partner in the other with path difference \\(\\frac{\\lambda}{2}\\): first dark fringe.",
        "In general, minima: \\(a\\sin\\theta = n\\lambda\\); maxima about midway: \\(a\\sin\\theta = \\left(n + \\frac{1}{2}\\right)\\lambda\\).",
        "Central maximum width \\(= \\frac{2\\lambda D}{a}\\), twice that of the other bright fringes.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Construction of a spherical wavefront (Huygens)",
      labels: ["point source O", "wavefront at t = 0", "secondary wavelets of radius vT", "new wavefront as their forward envelope"],
    },
    {
      title: "Reflection of a plane wavefront at a plane surface",
      labels: ["incident wavefront AB, reflected wavefront CE", "mirror MN and normal AP", "angles i and r", "BC = AE = vT"],
    },
    {
      title: "Refraction of a plane wavefront",
      labels: ["incident wavefront AB in medium 1", "refracted wavefront CE in medium 2", "BC = v1T, AE = v2T", "angles i and r with the normal"],
    },
    {
      title: "Polarization by reflection (Brewster's angle)",
      labels: ["unpolarized incident ray", "reflected ray polarized perpendicular to the plane (dots)", "refracted ray partially polarized", "90° between reflected and refracted rays"],
    },
    {
      title: "Geometry of Young's double slit experiment",
      labels: ["slits S1, S2 with separation d", "screen at distance D", "central bright fringe O′", "point P at distance y, paths S1P and S2P"],
    },
    {
      title: "Fresnel biprism",
      labels: ["slit S and the biprism", "virtual sources S1 and S2", "overlapping (shaded) region of interference", "screen or eyepiece"],
    },
  ],
  mostAsked: [
    { topic: "Brewster's law and polarization: derive Brewster's angle, methods of polarization, or a numerical", years: [2026, 2025, 2024, 2019, 2018, 2016] },
    { topic: "Young's double slit experiment: derive the fringe width, or a numerical on fringe width, intensity or amplitude", years: [2026, 2024, 2022, 2019, 2018] },
    { topic: "Biprism experiment: virtual sources and region of interference, or a fringe numerical", years: [2026, 2024, 2023, 2018, 2017, 2016] },
    { topic: "Huygens' principle: wavefront, and the laws of reflection and refraction", years: [2026, 2024, 2023, 2022, 2019] },
    { topic: "Diffraction: single slit, its two types, and how it differs from interference", years: [2025, 2020, 2017, 2016] },
    { topic: "Speed, wavelength and frequency of light in a medium", years: [2023, 2022, 2018, 2016] },
    { topic: "Interference: conditions for a steady pattern; constructive and destructive interference", years: [2026, 2025, 2018] },
    { topic: "Limit of resolution of a telescope: a numerical", years: [2026, 2024] },
  ],
  mistakes: [
    {
      title: "Leaving wavelengths in ångström",
      body: "1 Å \\(= 10^{-10}\\) m and 1 nm \\(= 10^{-9}\\) m. Put \\(\\lambda\\), \\(d\\), \\(D\\) and the telescope aperture in metres; the limit of resolution comes out in radians.",
    },
    {
      title: "Miscounting fringes",
      body: "If 10 fringes span 2 cm, \\(W = \\frac{2}{10}\\) cm. The n-th dark band is at \\(\\left(n - \\frac{1}{2}\\right)W\\) from the centre, so the 10th dark band is at \\(9.5W\\), not \\(10W\\).",
    },
    {
      title: "Using sine instead of tangent in Brewster's law",
      body: "\\(\\tan\\theta_B = n\\), so a glass of \\(n = 1.732\\) has \\(\\theta_B = 60^\\circ\\). At this angle the reflected and refracted rays are at 90°.",
    },
    {
      title: "Applying \\(\\cos^2\\theta\\) to unpolarized light",
      body: "Unpolarized light through one polarizer always drops to half its intensity, whatever the angle. Malus' law applies only to light that is already polarized.",
    },
    {
      title: "Treating slit width ratio as amplitude ratio",
      body: "Intensity is proportional to slit width, and amplitude to the square root of intensity. Widths 25 : 1 give amplitudes 5 : 1.",
    },
    {
      title: "Saying frequency changes in a medium",
      body: "Frequency stays the same; speed and wavelength fall by the factor \\(n\\). Longer wavelength (red instead of blue) makes diffraction bands wider.",
    },
  ],
};

export default sheet;
