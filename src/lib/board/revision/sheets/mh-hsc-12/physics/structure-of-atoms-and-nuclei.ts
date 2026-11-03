import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 15 Structure of Atoms and Nuclei. Statements checked
 * against the Balbharati text (Bohr's postulates in the book's own wording);
 * most-asked years from the 34 board past-paper questions in the bank,
 * 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Structure of Atoms and Nuclei",
  chapterSlug: "structure-of-atoms-and-nuclei",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 15",
  keyPoints: [
    {
      term: "Geiger-Marsden experiment",
      text: "Alpha particles fired at a thin gold foil: most passed straight through, a few were scattered, and about one in 8000 was deflected through more than 90°. Thomson's plum-pudding model could not explain this.",
    },
    {
      term: "Rutherford's model",
      text: "The entire positive charge and most (99.9%) of the mass of an atom is concentrated in a tiny central nucleus, and the electrons revolve around it in circular orbits. It could not explain the stability of atoms or line spectra.",
    },
    {
      term: "Bohr's first postulate",
      text: "The electrons revolve around the nucleus in circular orbits; the electrostatic attraction of the nucleus provides the centripetal force.",
    },
    {
      term: "Bohr's second postulate",
      text: "The angular momentum of the electron in an allowed orbit is an integral multiple of \\(\\frac{h}{2\\pi}\\): \\(mv_nr_n = \\frac{nh}{2\\pi}\\). In these stable orbits the electron does not emit radiation.",
    },
    {
      term: "Bohr's third postulate",
      text: "An electron can make a transition from one orbit to another orbit of lower energy, emitting a photon of energy equal to the difference in its energies in the two orbits: \\(h\\nu = E_m - E_n\\).",
    },
    {
      term: "Ionization energy",
      text: "The minimum energy needed to set free an electron in the ground state of an atom. For hydrogen it is 13.6 eV, which is also the binding energy of the hydrogen atom (ground state energy \\(-13.6\\) eV).",
    },
    {
      term: "Hydrogen spectral series",
      text: "Lyman (\\(n = 1\\), ultraviolet), Balmer (\\(n = 2\\), visible), Paschen (\\(n = 3\\)), Brackett (\\(n = 4\\)) and Pfund (\\(n = 5\\)) in the infrared. In each series the lines crowd together towards a limiting (shortest) wavelength.",
    },
    {
      term: "De Broglie and Bohr's orbits",
      text: "An allowed orbit holds a whole number of electron waves, \\(2\\pi r_n = n\\lambda_n\\). With \\(\\lambda = \\frac{h}{p}\\) this gives \\(L = \\frac{nh}{2\\pi}\\), the theoretical basis for the second postulate.",
    },
    {
      term: "Isotopes",
      text: "Nuclei with the same number of protons but different number of neutrons, e.g. hydrogen, deuterium and tritium. They have the same chemical properties.",
    },
    {
      term: "Mass defect and binding energy",
      text: "The mass of a nucleus is smaller than the total mass of its nucleons; the difference \\(\\Delta M\\) is the mass defect. The binding energy \\(E_B = \\Delta M c^2\\) must be supplied to separate the nucleons. \\(E_B/A\\) peaks near A = 56 (most stable nuclei).",
    },
    {
      term: "Nuclear force",
      text: "The strong force between protons and neutrons that holds the nucleus together. It is mostly attractive, much stronger than the electrostatic force and of very short range.",
    },
    {
      term: "Alpha, beta and gamma decay",
      text: "Alpha: a helium nucleus leaves (A falls by 4, Z by 2). Beta minus: a neutron becomes a proton with an electron and an antineutrino (Z up by 1, A same). Gamma: a high energy photon, no change in Z or A.",
    },
    {
      term: "Beta plus decay",
      text: "A proton gets converted to a neutron by emitting a **positron** and a **neutrino**. The positron is the antiparticle of the electron: same properties, positive charge. Z falls by 1, A is unchanged.",
    },
    {
      term: "Half-life and activity",
      text: "Half-life: the time for the number of parent radioactive nuclei to reduce to half its value. Activity is the number of decays per unit time, SI unit becquerel: 1 Bq = one decay per second (1 Ci = \\(3.7 \\times 10^{10}\\) Bq).",
    },
  ],
  formulas: [
    { label: "Angular momentum (Bohr)", latex: "L = mv_nr_n = \\frac{nh}{2\\pi}" },
    { label: "Radius of nth orbit", latex: "r_n = \\frac{\\varepsilon_0 n^2 h^2}{\\pi m Z e^2} \\qquad r_n = a_0 n^2,\\ a_0 = 0.053\\ \\text{nm}" },
    { label: "Speed in nth orbit", latex: "v_n = \\frac{Ze^2}{2\\varepsilon_0 n h} \\qquad v_n \\propto \\frac{1}{n}" },
    { label: "Energy in nth orbit", latex: "E_n = -\\frac{mZ^2e^4}{8\\varepsilon_0^2 h^2 n^2} = -\\frac{13.6\\,Z^2}{n^2}\\ \\text{eV}" },
    { label: "Kinetic and potential energy", latex: "KE = -E_n \\qquad PE = 2E_n" },
    { label: "Period and frequency of revolution", latex: "T = \\frac{2\\pi r_n}{v_n} \\qquad f = \\frac{v_n}{2\\pi r_n}" },
    { label: "Spectral lines (Rydberg)", latex: "\\frac{1}{\\lambda} = R_H\\left(\\frac{1}{n^2} - \\frac{1}{m^2}\\right) \\qquad R_H = \\frac{me^4}{8\\varepsilon_0^2 h^3 c} = 1.097 \\times 10^7\\ \\text{m}^{-1}" },
    { label: "Mass defect and binding energy", latex: "\\Delta M = Zm_p + Nm_n - M \\qquad E_B = \\Delta M c^2 \\qquad 1\\ \\text{u} = 931.5\\ \\text{MeV}/c^2" },
    { label: "Decay law and activity", latex: "N = N_0 e^{-\\lambda t} \\qquad A = -\\frac{dN}{dt} = \\lambda N = A_0 e^{-\\lambda t}" },
    { label: "Half-life and average life", latex: "T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda} \\qquad \\tau = \\frac{1}{\\lambda} \\qquad T_{1/2} = 0.693\\,\\tau" },
  ],
  derivations: [
    {
      title: "Derive an expression for the radius of the nth Bohr orbit of the electron in the hydrogen atom",
      steps: [
        "Centripetal force = electrostatic attraction: \\(\\frac{mv_n^2}{r_n} = \\frac{Ze^2}{4\\pi\\varepsilon_0 r_n^2}\\).",
        "Second postulate: \\(mv_nr_n = \\frac{nh}{2\\pi}\\), so \\(v_n = \\frac{nh}{2\\pi m r_n}\\).",
        "Substitute and simplify: \\(r_n = \\frac{\\varepsilon_0 n^2 h^2}{\\pi m Z e^2}\\), so \\(r_n \\propto n^2\\).",
        "For hydrogen (\\(Z = 1\\)), \\(n = 1\\): \\(r_1 = a_0 = 0.053\\) nm, the Bohr radius; \\(r_n = a_0 n^2\\).",
      ],
    },
    {
      title: "Obtain the energy of the electron in the nth Bohr orbit",
      steps: [
        "From the force equation, \\(KE = \\frac{1}{2}mv_n^2 = \\frac{Ze^2}{8\\pi\\varepsilon_0 r_n}\\).",
        "Potential energy \\(PE = -\\frac{Ze^2}{4\\pi\\varepsilon_0 r_n}\\), so \\(E_n = KE + PE = -\\frac{Ze^2}{8\\pi\\varepsilon_0 r_n}\\).",
        "Put \\(r_n\\): \\(E_n = -\\frac{mZ^2e^4}{8\\varepsilon_0^2 h^2 n^2}\\), i.e. \\(-\\frac{13.6}{n^2}\\) eV for hydrogen. Negative: the electron is bound.",
      ],
    },
    {
      title: "Using the expression for the energy of the electron, obtain Bohr's formula for hydrogen spectral lines",
      steps: [
        "Third postulate: a jump from orbit \\(m\\) to orbit \\(n\\) (\\(m > n\\)) emits a photon \\(h\\nu = E_m - E_n\\).",
        "\\(E_m - E_n = \\frac{me^4}{8\\varepsilon_0^2 h^2}\\left(\\frac{1}{n^2} - \\frac{1}{m^2}\\right)\\) for \\(Z = 1\\).",
        "With \\(\\nu = \\frac{c}{\\lambda}\\): \\(\\frac{1}{\\lambda} = \\frac{me^4}{8\\varepsilon_0^2 h^3 c}\\left(\\frac{1}{n^2} - \\frac{1}{m^2}\\right) = R_H\\left(\\frac{1}{n^2} - \\frac{1}{m^2}\\right)\\).",
        "\\(n = 1, 2, 3, 4, 5\\) give the Lyman, Balmer, Paschen, Brackett and Pfund series; \\(m\\) runs over integers greater than \\(n\\).",
      ],
    },
    {
      title: "State the law of radioactive decay and derive \\(N = N_0 e^{-\\lambda t}\\)",
      steps: [
        "The number of nuclei decaying in time \\(dt\\) is proportional to \\(N\\) and to \\(dt\\): \\(dN = -\\lambda N\\,dt\\) (\\(\\lambda\\): decay constant; minus because \\(N\\) falls).",
        "Rearrange and integrate from \\(N_0\\) at \\(t = 0\\) to \\(N\\) at \\(t\\): \\(\\int \\frac{dN}{N} = -\\lambda\\int dt\\), so \\(\\ln\\frac{N}{N_0} = -\\lambda t\\).",
        "\\(N = N_0 e^{-\\lambda t}\\): an exponential fall (draw N against t).",
        "Activity \\(A = \\lambda N\\); put \\(N = \\frac{N_0}{2}\\) to get \\(T_{1/2} = \\frac{0.693}{\\lambda}\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Energy level diagram of the hydrogen atom", labels: ["levels n = 1 to 5 with energies (-13.6, -3.4, -1.51 eV ...)", "Lyman to n = 1", "Balmer to n = 2", "Paschen to n = 3", "Brackett to n = 4", "ionization at 0 eV"] },
    { title: "Geiger-Marsden experiment", labels: ["alpha source and collimator", "thin gold foil", "surrounding scintillation screen", "movable microscope", "scattering angle θ"] },
    { title: "Radioactive decay curve", labels: ["N against t", "N0 at t = 0", "N0/2 at one half-life", "N0/4 at two half-lives"] },
    { title: "Binding energy per nucleon against mass number", labels: ["peak near A = 56", "slow fall for heavy nuclei", "low values for light nuclei"] },
  ],
  mostAsked: [
    { topic: "Wavelength of a line or series limit in the hydrogen spectrum, or the region of a series", years: [2026, 2025, 2024, 2022, 2020] },
    { topic: "Speed, period, frequency of revolution or angular momentum of the orbiting electron", years: [2025, 2024, 2022, 2018, 2017] },
    { topic: "Law of radioactive decay: derive \\(N = N_0e^{-\\lambda t}\\), activity and its unit, half-life or decay constant", years: [2025, 2023, 2019, 2016] },
    { topic: "Bohr's postulates, or the change in angular momentum in a jump", years: [2024, 2023, 2022, 2020] },
    { topic: "Bohr's formula for spectral lines from the energy expression, with the energy level diagram", years: [2024, 2019, 2018, 2017] },
    { topic: "Radius of the nth Bohr orbit: derive or compare", years: [2026, 2023, 2022] },
    { topic: "Energy of the electron in an orbit (total, kinetic, potential) or binding energy of the hydrogen atom", years: [2026, 2024, 2020] },
    { topic: "Nucleus: isotopes, mass defect, beta plus decay, Geiger-Marsden experiment", years: [2026, 2024, 2016] },
  ],
  mistakes: [
    {
      title: "Getting the series limits the wrong way round",
      body: "Shortest wavelength (series limit): \\(m = \\infty\\). Longest wavelength (first line): \\(m = n + 1\\). Lyman: \\(n = 1\\); Balmer: \\(n = 2\\); Paschen: \\(n = 3\\).",
    },
    {
      title: "Scaling energy and radius the same way",
      body: "\\(r_n \\propto n^2\\) but \\(E_n \\propto \\frac{1}{n^2}\\) and \\(v_n \\propto \\frac{1}{n}\\). From \\(E_2 = -3.4\\) eV, \\(E_3 = -3.4 \\times \\frac{4}{9} = -1.51\\) eV.",
    },
    {
      title: "Signs of the energies",
      body: "Total energy is negative and \\(KE = -E_n\\) is positive; \\(PE = 2E_n\\) is negative. For \\(E_3 = -1.51\\) eV: KE = 1.51 eV, PE = \\(-3.02\\) eV.",
    },
    {
      title: "Change in angular momentum from 3 to 1",
      body: "\\(\\Delta L = (3 - 1)\\frac{h}{2\\pi} = \\frac{h}{\\pi}\\), not \\(\\frac{3h}{2\\pi}\\).",
    },
    {
      title: "Mixing half-life, average life and decay constant",
      body: "\\(T_{1/2} = \\frac{0.693}{\\lambda}\\) and \\(\\tau = \\frac{1}{\\lambda}\\). Keep \\(\\lambda\\) and the time in the same unit (per hour with hours).",
    },
  ],
};

export default sheet;
