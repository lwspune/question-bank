import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 12 Atoms. Statements checked against the NCERT text
 * (definitions are the book's own wording); most-asked years from all 101 CBSE
 * board past-paper questions in the bank, 2022-2026. The current book no
 * longer names the hydrogen spectral series or gives the Rydberg formula, and
 * gives no speed or period formula for an orbit; all are still asked (2025,
 * 2026), so they are here.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Atoms",
  chapterSlug: "atoms",
  source: "NCERT Physics Part II (CBSE Class 12), Chapter 12",
  keyPoints: [
    {
      term: "Geiger-Marsden experiment",
      text: "A beam of 5.5 MeV alpha particles from a \\(^{214}_{83}\\text{Bi}\\) source, collimated by lead bricks, falls on a thin gold foil (\\(2.1 \\times 10^{-7}\\) m). A rotatable detector (zinc sulphide screen and microscope) counts the scintillations at each angle of scattering.",
    },
    {
      term: "Observations",
      text: "Many alpha particles pass through the foil undeflected. Only about 0.14% scatter by more than 1°, and about 1 in 8000 deflect by more than 90°. To deflect an alpha particle backwards it must experience a large repulsive force.",
    },
    {
      term: "Rutherford's nuclear model",
      text: "The entire positive charge and most of the mass of the atom are concentrated in the nucleus, with the electrons some distance away, moving in orbits like planets round the sun. Nucleus about \\(10^{-15}\\) to \\(10^{-14}\\) m, atom about \\(10^{-10}\\) m: most of an atom is empty space.",
    },
    {
      term: "Impact parameter",
      text: "The perpendicular distance of the initial velocity vector of the alpha particle from the centre of the nucleus. Small impact parameter: large scattering; head-on collision: impact parameter minimum, the particle rebounds (\\(\\theta \\approx \\pi\\)). Large impact parameter: nearly undeviated (\\(\\theta \\approx 0\\)).",
    },
    {
      term: "Distance of closest approach",
      text: "The centre-to-centre distance between the alpha particle and the nucleus when the alpha particle momentarily stops and reverses. Its kinetic energy then equals the electric potential energy: \\(K = \\frac{1}{4\\pi\\varepsilon_0}\\frac{(2e)(Ze)}{d}\\). It gives an upper limit to the size of the nucleus.",
    },
    {
      term: "Electron orbits",
      text: "The electrostatic force of attraction between the electron and the nucleus provides the centripetal force. The total energy of the electron is negative: the electron is bound to the nucleus. If E were positive, it would not follow a closed orbit.",
    },
    {
      term: "Difficulties of Rutherford's model",
      text: "An accelerated charge radiates, so a revolving electron would lose energy, spiral inward and fall into the nucleus: the atom cannot be stable. Its frequency would change continuously, giving a continuous spectrum, in contradiction to the line spectrum actually observed.",
    },
    {
      term: "Bohr's first postulate",
      text: "An electron in an atom could revolve in certain stable orbits without the emission of radiant energy. Each atom has certain definite stable states, each with a definite total energy: the stationary states of the atom.",
    },
    {
      term: "Bohr's second postulate",
      text: "The electron revolves around the nucleus only in those orbits for which the angular momentum is some integral multiple of \\(\\frac{h}{2\\pi}\\): \\(L = \\frac{nh}{2\\pi}\\). This quantisation condition fixes the allowed radii and energies.",
    },
    {
      term: "Bohr's third postulate",
      text: "An electron might make a transition from one of its non-radiating orbits to another of lower energy. A photon is then emitted having energy equal to the energy difference between the initial and final states: \\(h\\nu = E_i - E_f\\). An atom absorbs radiation of the same frequencies it emits.",
    },
    {
      term: "Energy levels",
      text: "Ground state \\(n = 1\\): \\(E_1 = -13.6\\) eV, so the ionisation energy of hydrogen is 13.6 eV. \\(E_2 = -3.40\\) eV, \\(E_3 = -1.51\\) eV (excitation energies 10.2 eV and 12.09 eV). \\(n = \\infty\\) has 0 eV. The levels come closer and closer together as n increases.",
    },
    {
      term: "Line spectra and spectral series",
      text: "An excited gas emits an emission line spectrum: bright lines on a dark background, a fingerprint of the gas; white light through it gives dark absorption lines at the same wavelengths. Hydrogen: Lyman (to n = 1, ultraviolet), Balmer (to n = 2, visible), Paschen (to n = 3), Brackett (n = 4), Pfund (n = 5), all infrared.",
    },
    {
      term: "de Broglie's explanation",
      text: "The electron in its orbit is a particle wave; only resonant standing waves persist, so the circumference holds a whole number of wavelengths: \\(2\\pi r_n = n\\lambda\\). With \\(\\lambda = \\frac{h}{mv_n}\\) this gives \\(mv_nr_n = \\frac{nh}{2\\pi}\\), Bohr's second postulate.",
    },
    {
      term: "Limitations of Bohr's model",
      text: "It applies only to hydrogenic (one-electron) atoms and cannot be extended even to helium, as it leaves out the forces between electrons. It cannot explain the relative intensities of the frequencies in the spectrum.",
    },
  ],
  formulas: [
    { label: "Closest approach", latex: "d = \\frac{1}{4\\pi\\varepsilon_0}\\frac{2Ze^2}{K} \\qquad d \\propto \\frac{qZ}{K}" },
    { label: "Orbit condition", latex: "\\frac{1}{4\\pi\\varepsilon_0}\\frac{e^2}{r^2} = \\frac{mv^2}{r} \\qquad mvr = \\frac{nh}{2\\pi}" },
    {
      label: "Energies in an orbit",
      latex: "K = \\frac{e^2}{8\\pi\\varepsilon_0 r} \\qquad U = -\\frac{e^2}{4\\pi\\varepsilon_0 r} \\qquad E = -\\frac{e^2}{8\\pi\\varepsilon_0 r} \\qquad K = -E, \\ U = 2E",
    },
    { label: "Radius of nth orbit", latex: "r_n = \\frac{n^2h^2\\varepsilon_0}{\\pi me^2} = n^2a_0 \\qquad a_0 = 0.53\\text{ \\AA}" },
    { label: "Speed in nth orbit", latex: "v_n = \\frac{e^2}{2\\varepsilon_0 nh} = \\frac{2.2 \\times 10^6}{n}\\text{ m s}^{-1}" },
    { label: "Energy of nth orbit", latex: "E_n = -\\frac{me^4}{8n^2\\varepsilon_0^2h^2} = -\\frac{13.6}{n^2}\\text{ eV}" },
    { label: "Dependence on n", latex: "r \\propto n^2 \\quad v \\propto \\frac{1}{n} \\quad E \\propto \\frac{1}{n^2} \\quad L \\propto n \\quad T \\propto n^3 \\quad \\lambda_{dB} \\propto n" },
    { label: "Hydrogen-like ion (charge Ze)", latex: "r_n = \\frac{0.53\\,n^2}{Z}\\text{ \\AA} \\qquad E_n = -\\frac{13.6\\,Z^2}{n^2}\\text{ eV}" },
    { label: "Photon emitted", latex: "h\\nu = E_i - E_f \\qquad \\lambda(\\text{nm}) \\approx \\frac{1240}{\\Delta E(\\text{eV})}" },
    {
      label: "Rydberg formula",
      latex: "\\frac{1}{\\lambda} = R\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right) \\qquad R = 1.097 \\times 10^7\\text{ m}^{-1}",
    },
    { label: "Lines from level n", latex: "N = \\frac{n(n - 1)}{2}" },
    { label: "Standing wave condition", latex: "2\\pi r_n = n\\lambda" },
  ],
  derivations: [
    {
      title: "Using Bohr's postulates, derive the radius of the nth orbit of the hydrogen atom and show that r is proportional to n squared",
      steps: [
        "Electrostatic force gives the centripetal force: \\(\\frac{1}{4\\pi\\varepsilon_0}\\frac{e^2}{r^2} = \\frac{mv^2}{r}\\), so \\(mv^2 r = \\frac{e^2}{4\\pi\\varepsilon_0}\\).",
        "Second postulate: \\(mvr = \\frac{nh}{2\\pi}\\), so \\(v = \\frac{nh}{2\\pi mr}\\).",
        "Substitute: \\(r_n = \\frac{n^2h^2\\varepsilon_0}{\\pi me^2}\\), so \\(r_n \\propto n^2\\) and \\(r_n = n^2a_0\\) with \\(a_0 = 0.53\\) Å.",
        "Back-substituting, \\(v_n = \\frac{e^2}{2\\varepsilon_0 nh}\\), so \\(v_n \\propto \\frac{1}{n}\\).",
      ],
    },
    {
      title: "Derive the total energy of the electron in the nth orbit of the hydrogen atom and give the meaning of its negative sign",
      steps: [
        "\\(K = \\frac{1}{2}mv^2 = \\frac{e^2}{8\\pi\\varepsilon_0 r}\\) (from the force equation) and \\(U = -\\frac{e^2}{4\\pi\\varepsilon_0 r}\\).",
        "\\(E = K + U = -\\frac{e^2}{8\\pi\\varepsilon_0 r}\\).",
        "Put \\(r_n = \\frac{n^2h^2\\varepsilon_0}{\\pi me^2}\\): \\(E_n = -\\frac{me^4}{8n^2\\varepsilon_0^2h^2} = -\\frac{13.6}{n^2}\\) eV, so \\(E \\propto \\frac{1}{n^2}\\).",
        "Negative sign: the electron is bound to the nucleus; energy must be supplied to remove it to infinity.",
      ],
    },
    {
      title: "Show that the period of revolution is proportional to n cubed and that the energy levels come closer together as n increases",
      steps: [
        "\\(T = \\frac{2\\pi r_n}{v_n}\\) with \\(r_n \\propto n^2\\) and \\(v_n \\propto \\frac{1}{n}\\): \\(T \\propto n^3\\) (frequency of revolution \\(\\propto \\frac{1}{n^3}\\)).",
        "\\(E_{n+1} - E_n = 13.6\\left(\\frac{1}{n^2} - \\frac{1}{(n+1)^2}\\right) = 13.6\\frac{2n + 1}{n^2(n + 1)^2}\\) eV.",
        "For large n this is about \\(\\frac{2 \\times 13.6}{n^3}\\) eV, which falls as n grows: the levels crowd together. Orbit spacing \\(r_{n+1} - r_n = (2n + 1)a_0\\) grows: orbits are not equally spaced.",
      ],
    },
    {
      title: "Explain Bohr's second postulate of quantisation using de Broglie's hypothesis",
      steps: [
        "The orbiting electron is a particle wave; like waves on a string, only standing waves under resonant conditions survive.",
        "For a standing wave the circumference holds a whole number of wavelengths: \\(2\\pi r_n = n\\lambda\\), \\(n = 1, 2, 3, \\ldots\\)",
        "With \\(\\lambda = \\frac{h}{mv_n}\\): \\(2\\pi r_n = \\frac{nh}{mv_n}\\), so \\(mv_nr_n = \\frac{nh}{2\\pi}\\), the quantum condition of Bohr.",
      ],
    },
    {
      title: "Obtain the distance of closest approach of an alpha particle of kinetic energy K to a nucleus of charge Ze",
      steps: [
        "Mechanical energy is conserved; at the stopping point all of K has become electric potential energy.",
        "\\(K = \\frac{1}{4\\pi\\varepsilon_0}\\frac{(2e)(Ze)}{d}\\), so \\(d = \\frac{1}{4\\pi\\varepsilon_0}\\frac{2Ze^2}{K}\\).",
        "For 7.7 MeV on gold (Z = 79), \\(d \\approx 3.0 \\times 10^{-14}\\) m = 30 fm, so the gold nucleus is smaller than this.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Schematic arrangement of the Geiger-Marsden experiment",
      labels: ["Bi-214 source in lead bricks, collimated beam", "thin gold foil", "rotatable ZnS screen and microscope", "scattering angle θ, vacuum chamber"],
    },
    {
      title: "Number of scattered alpha particles against scattering angle",
      labels: ["N on a log scale, θ from 0° to 180°", "very large N at small angles", "N falls steeply, very few beyond 90°"],
    },
    {
      title: "Trajectories of alpha particles near a nucleus",
      labels: ["impact parameter b", "scattering angle θ", "small b: large deflection, head-on rebounds", "large b: nearly undeviated"],
    },
    {
      title: "Energy level diagram of the hydrogen atom with spectral series",
      labels: ["n = 1 at -13.6 eV, n = 2 at -3.40 eV", "n = 3 at -1.51 eV, n = 4 at -0.85 eV", "n = ∞ at 0 eV, continuum above", "Lyman, Balmer, Paschen transitions"],
    },
    {
      title: "Standing de Broglie wave on a circular orbit",
      labels: ["circular orbit of radius rn", "four wavelengths fit the circumference (n = 4)"],
    },
  ],
  mostAsked: [
    {
      topic: "Bohr's postulates: state them, derive the radius, speed or energy of the nth orbit, and how r, v, E, L and T vary with n",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Hydrogen spectrum: wavelength or frequency of a transition, the series and their regions, number of lines, ratio of longest and shortest wavelengths",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Bohr model numericals: kinetic, potential and total energy, angular momentum, radius or de Broglie wavelength in a given orbit",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Geiger-Marsden experiment: graph of N against θ, conclusions about the nucleus, impact parameter, limitations of Rutherford's model",
      marks: 3,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Distance of closest approach: definition, and numericals for an alpha particle, proton or deuteron",
      years: [2026, 2025, 2024, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Signs of the energies",
      body: "In any orbit \\(K = -E\\) and \\(U = 2E\\). For \\(E = -3.4\\) eV: \\(K = +3.4\\) eV and \\(U = -6.8\\) eV, so \\(\\frac{U}{K} = -2\\). Potential energy is negative, never positive.",
    },
    {
      title: "Counting excited states",
      body: "First excited state is n = 2, second excited n = 3, third excited n = 4. From n = 4 the number of lines is \\(\\frac{4 \\times 3}{2} = 6\\); the shortest wavelength is for \\(4 \\to 1\\), the longest for \\(4 \\to 3\\).",
    },
    {
      title: "Angular momentum from the energy",
      body: "First find n from \\(E_n = -\\frac{13.6}{n^2}\\): \\(-3.4\\) eV gives n = 2, so \\(L = \\frac{2h}{2\\pi} = \\frac{h}{\\pi}\\) and \\(r = 4a_0 = 2.12\\) Å. Going to the ground state, the radius changes by \\(3a_0 = 1.59\\) Å.",
    },
    {
      title: "Series ratios",
      body: "Lyman: \\(\\frac{\\lambda_{max}}{\\lambda_{min}} = \\frac{4}{3}\\). Balmer: \\(\\frac{\\lambda_{max}}{\\lambda_{min}} = \\frac{9}{5}\\), so \\(\\frac{\\nu_{max}}{\\nu_{min}} = \\frac{9}{5}\\). The longest wavelength is the smallest energy gap, the series limit (\\(n_i = \\infty\\)) the shortest.",
    },
    {
      title: "Closest approach with different particles",
      body: "\\(d \\propto \\frac{q}{K}\\). Doubling K halves d. Accelerated through the same V, \\(K = qV\\), so d is the same for an alpha particle and a deuteron. At equal speed \\(K \\propto m\\), so \\(d \\propto \\frac{q}{m}\\): a proton stops twice as far from the nucleus as an alpha particle.",
    },
    {
      title: "Impact parameter and angle",
      body: "Head-on collision (\\(\\theta = 180^\\circ\\)): impact parameter is zero (minimum), not maximum. Very large impact parameter: \\(\\theta \\approx 0\\).",
    },
  ],
};

export default sheet;
