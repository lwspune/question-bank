import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 13 Nuclei. Statements checked against the NCERT text
 * (definitions are the book's own wording); most-asked years from all 74 CBSE
 * board past-paper questions in the bank, 2022-2026. The current book keeps
 * radioactivity to the three kinds of decay (no decay law or half-life), and
 * no past-paper question in the bank asks about decay, so neither is here.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Nuclei",
  chapterSlug: "nuclei",
  source: "NCERT Physics Part II (CBSE Class 12), Chapter 13",
  keyPoints: [
    {
      term: "Atomic mass unit",
      text: "1 u is defined as 1/12th of the mass of the carbon (\\(^{12}\\text{C}\\)) atom: \\(1\\text{ u} = 1.6605 \\times 10^{-27}\\) kg, whose energy equivalent is 931.5 MeV.",
    },
    {
      term: "Composition of the nucleus",
      text: "Z = atomic number = number of protons; N = number of neutrons; A = Z + N = mass number; a proton or a neutron is a nucleon. Chadwick showed that the neutral radiation from beryllium bombarded with alpha particles was neutrons, not photons. A free neutron is unstable but stable inside the nucleus.",
    },
    {
      term: "Isotopes, isobars and isotones",
      text: "Isotopes: same Z, different N (\\(^{12}_6\\text{C}\\), \\(^{14}_6\\text{C}\\)); identical chemical behaviour. Isobars: same mass number A (\\(^3_1\\text{H}\\), \\(^3_2\\text{He}\\)). Isotones: same neutron number N but different Z (\\(^{198}_{80}\\text{Hg}\\), \\(^{197}_{79}\\text{Au}\\)).",
    },
    {
      term: "Size of the nucleus",
      text: "Found by scattering fast electrons (or alpha particles) from nuclei. A nucleus of mass number A has radius \\(R = R_0A^{1/3}\\) with \\(R_0 = 1.2\\) fm (1 fm = \\(10^{-15}\\) m), so its volume is proportional to A.",
    },
    {
      term: "Nuclear density",
      text: "The density of nucleus is a constant, independent of A, for all nuclei: nuclei are like a drop of liquid of constant density, about \\(2.3 \\times 10^{17}\\text{ kg m}^{-3}\\). It is huge compared with ordinary matter (water \\(10^3\\text{ kg m}^{-3}\\)) because most of the atom is empty.",
    },
    {
      term: "Mass defect",
      text: "The nuclear mass M is always less than the total mass of its protons and neutrons. The difference in mass of a nucleus and its constituents is called the mass defect: \\(\\Delta M = [Zm_p + (A - Z)m_n] - M\\).",
    },
    {
      term: "Binding energy",
      text: "If neutrons and protons are brought together to form a nucleus, an energy \\(E_b = \\Delta Mc^2\\) is released; the same energy must be supplied to separate the nucleus into its nucleons. Binding energy per nucleon \\(E_{bn} = \\frac{E_b}{A}\\) is the average energy per nucleon needed to separate a nucleus into its nucleons.",
    },
    {
      term: "Binding energy curve",
      text: "\\(E_{bn}\\) is practically constant, about 8 MeV, for 30 < A < 170, with a maximum of about 8.75 MeV at A = 56 and 7.6 MeV at A = 238. It is lower for light nuclei (A < 30) and heavy nuclei (A > 170). Peaks at \\(^4\\text{He}\\) and \\(^{16}\\text{O}\\) show these are especially stable.",
    },
    {
      term: "What the curve tells us",
      text: "The force is attractive and strong (a few MeV per nucleon). The flat middle shows the force is short-ranged: a nucleon feels only its neighbours (saturation). A nucleus of A = 240 breaking into two of A = 120 gets its nucleons more tightly bound, so energy is released.",
    },
    {
      term: "Nuclear force",
      text: "Much stronger than the Coulomb force, so it overcomes the repulsion between protons. Short range: falls rapidly to zero beyond a few femtometres. The same for neutron-neutron, proton-neutron and proton-proton: it does not depend on the electric charge. No simple mathematical form.",
    },
    {
      term: "Potential energy of two nucleons",
      text: "The potential energy is a minimum at a distance \\(r_0\\) of about 0.8 fm. The force is attractive for distances larger than 0.8 fm and strongly repulsive for smaller distances.",
    },
    {
      term: "Radioactivity",
      text: "An unstable nucleus undergoes a decay. Three types: alpha decay (a helium nucleus \\(^4_2\\text{He}\\) is emitted), beta decay (electrons or positrons), gamma decay (high energy photons).",
    },
    {
      term: "Fission",
      text: "A heavy nucleus hit by a neutron breaks into two intermediate mass fragments, releasing neutrons and about 200 MeV per fissioning nucleus: \\(^{235}_{92}\\text{U} + n \\to {}^{144}_{56}\\text{Ba} + {}^{89}_{36}\\text{Kr} + 3n\\). The energy appears as kinetic energy of the fragments and neutrons, then heat. Source of nuclear reactors; uncontrolled in an atom bomb.",
    },
    {
      term: "Fusion and energy in stars",
      text: "Two light nuclei fuse to form a larger, more tightly bound nucleus, releasing energy. They must overcome the coulomb barrier, so very high temperatures are needed (thermonuclear fusion). In the sun (core about \\(1.5 \\times 10^7\\) K) the proton-proton cycle makes four hydrogen atoms into one helium atom with a release of 26.7 MeV.",
    },
  ],
  formulas: [
    { label: "Nuclear radius", latex: "R = R_0A^{1/3} \\qquad R_0 = 1.2\\text{ fm} \\qquad \\frac{R_1}{R_2} = \\left(\\frac{A_1}{A_2}\\right)^{1/3}" },
    {
      label: "Nuclear density",
      latex: "\\rho = \\frac{Am}{\\frac{4}{3}\\pi R_0^3A} = \\frac{3m}{4\\pi R_0^3} \\approx 2.3 \\times 10^{17}\\text{ kg m}^{-3}",
      symbols: [{ symbol: "m", meaning: "mass of a nucleon, about 1 u" }],
    },
    { label: "Mass-energy relation", latex: "E = mc^2 \\qquad 1\\text{ u} = 1.6605 \\times 10^{-27}\\text{ kg} = 931.5\\text{ MeV}/c^2" },
    { label: "Mass defect", latex: "\\Delta M = [Zm_p + (A - Z)m_n] - M" },
    { label: "Binding energy", latex: "E_b = \\Delta Mc^2 = \\Delta M(\\text{in u}) \\times 931.5\\text{ MeV} \\qquad E_{bn} = \\frac{E_b}{A}" },
    {
      label: "Q value",
      latex: "Q = \\left(\\sum m_{initial} - \\sum m_{final}\\right)c^2 \\qquad Q > 0: \\text{ exothermic} \\qquad Q < 0: \\text{ endothermic}",
    },
    { label: "Energy from binding energies", latex: "Q = \\sum (A\\,E_{bn})_{products} - \\sum (A\\,E_{bn})_{reactants}" },
    { label: "Nuclei in a sample", latex: "N = \\frac{m}{M}N_A \\qquad \\text{energy} = N \\times \\text{energy per reaction}" },
  ],
  derivations: [
    {
      title: "Show that the density of nuclear matter is the same for all nuclei",
      steps: [
        "Radius \\(R = R_0A^{1/3}\\), so volume \\(V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi R_0^3A\\).",
        "Mass of the nucleus \\(\\approx Am\\), where m is the mass of a nucleon.",
        "\\(\\rho = \\frac{Am}{\\frac{4}{3}\\pi R_0^3A} = \\frac{3m}{4\\pi R_0^3}\\): A cancels, so the density is the same for all nuclei, about \\(2.3 \\times 10^{17}\\text{ kg m}^{-3}\\).",
      ],
    },
    {
      title: "Find the energy equivalent of one atomic mass unit in MeV",
      steps: [
        "\\(1\\text{ u} = 1.6605 \\times 10^{-27}\\) kg; \\(E = mc^2 = 1.6605 \\times 10^{-27} \\times (2.9979 \\times 10^8)^2 = 1.4924 \\times 10^{-10}\\) J.",
        "Divide by \\(1.602 \\times 10^{-19}\\) J per eV: \\(E = 0.9315 \\times 10^9\\) eV = 931.5 MeV.",
      ],
    },
    {
      title: "Calculate the mass defect and binding energy per nucleon of a nucleus from its mass",
      steps: [
        "Add the masses of the Z protons and (A - Z) neutrons (with atomic masses, use the hydrogen atom, 1.007825 u, for each proton).",
        "Subtract the nuclear (or atomic) mass M: this is \\(\\Delta M\\) in u.",
        "\\(E_b = \\Delta M \\times 931.5\\) MeV; \\(E_{bn} = \\frac{E_b}{A}\\). For \\(^4_2\\text{He}\\): \\(\\Delta M = 0.030377\\) u, \\(E_b = 28.3\\) MeV, \\(E_{bn} = 7.07\\) MeV.",
      ],
    },
    {
      title: "Explain the release of energy in fission and fusion using the binding energy per nucleon curve",
      steps: [
        "The greater the binding energy, the less the total mass; so when less tightly bound nuclei change into more tightly bound ones, energy is released.",
        "Fission: A = 240 (\\(E_{bn} \\approx 7.6\\) MeV) splits into two A = 120 nuclei (\\(\\approx 8.5\\) MeV). Gain 0.9 MeV per nucleon, total \\(240 \\times 0.9 = 216\\) MeV.",
        "Fusion: light nuclei (A < 30, low \\(E_{bn}\\)) combine into a nucleus with higher \\(E_{bn}\\), so energy is released.",
        "Nuclei near the peak (A about 56) gain nothing either way, so neither fission nor fusion of them releases energy.",
      ],
    },
    {
      title: "Find the Q value of a nuclear reaction and say whether it is exothermic or endothermic",
      steps: [
        "Check the reaction balances: A and Z are the same on both sides.",
        "\\(\\Delta m = \\sum m_{initial} - \\sum m_{final}\\) in u (atomic masses on both sides, so electrons cancel).",
        "\\(Q = \\Delta m \\times 931.5\\) MeV. Positive: energy released (exothermic); negative: energy absorbed (endothermic).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Binding energy per nucleon against mass number",
      labels: ["axes: mass number A, Ebn in MeV", "maximum about 8.75 MeV at A = 56", "flat about 8 MeV for 30 < A < 170", "lower for light and heavy nuclei, 7.6 MeV at A = 238", "peak at He-4"],
    },
    {
      title: "Potential energy of a pair of nucleons against their separation",
      labels: ["minimum at r0 about 0.8 fm", "steep rise below r0: strongly repulsive", "beyond r0: attractive, PE negative", "PE tends to zero beyond a few fm"],
    },
  ],
  mostAsked: [
    {
      topic: "Nuclear size and density: R = R0A^(1/3), ratio of radii, and prove that nuclear density is the same for all nuclei",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Potential energy of a pair of nucleons against separation: plot it, mark the attractive and repulsive regions, features of the nuclear force",
      marks: 3,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Binding energy per nucleon curve: draw it, its features, and how it explains the energy released in fission and fusion (with a numerical)",
      years: [2026, 2025, 2023],
    },
    {
      topic: "Mass defect and binding energy: definitions, and the binding energy (per nucleon) of a nucleus from given masses",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Q value or energy released in a nuclear reaction from the masses: exothermic or endothermic",
      marks: 3,
      years: [2026, 2025, 2024, 2022],
    },
    {
      topic: "Nuclear fission and fusion: differences, examples, energy in the sun and stars, energy from a given mass of fuel",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Isotopes, isobars and isotones: definitions and examples",
      marks: 1,
      years: [2026, 2025, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Ratios of radius and density",
      body: "Radius goes as the cube root: for A = 64 and 27, \\(\\frac{R_1}{R_2} = \\left(\\frac{64}{27}\\right)^{1/3} = \\frac{4}{3}\\). The ratio of nuclear densities is always 1 : 1, whatever the mass numbers.",
    },
    {
      title: "Energy is released, not absorbed, on binding",
      body: "The nucleus has less mass than its nucleons because energy \\(E_b\\) is released when they bind. To break it up, \\(E_b\\) must be supplied. A larger binding energy per nucleon (not a larger total) means a more stable nucleus.",
    },
    {
      title: "Atomic and nuclear masses",
      body: "Do not mix them. With atomic masses, take the hydrogen atom (1.007825 u) for each proton so the electron masses cancel. Convert with 931.5 MeV per u (or 931 MeV if the paper gives it).",
    },
    {
      title: "Energy from binding energies per nucleon",
      body: "Multiply each \\(E_{bn}\\) by its own A before subtracting: \\(110 \\times 8.5 + 130 \\times 8.4 - 240 \\times 7.6 = 203\\) MeV. Subtracting the \\(E_{bn}\\) values alone gives a meaningless number.",
    },
    {
      title: "Nuclear force is not always attractive",
      body: "It is attractive beyond about 0.8 fm and strongly repulsive closer than that. It is the strongest force, not a weak one, and it is the same for p-p, p-n and n-n pairs.",
    },
    {
      title: "Counting reactions in a fuel",
      body: "Each \\(^2_1\\text{H} + {}^2_1\\text{H}\\) reaction uses two deuterons: 2 g of deuterium has \\(6.0 \\times 10^{23}\\) nuclei, so \\(3.0 \\times 10^{23}\\) reactions. Then time = total energy (in J) divided by the power of the bulb.",
    },
  ],
};

export default sheet;
