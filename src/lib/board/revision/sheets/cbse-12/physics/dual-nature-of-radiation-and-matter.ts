import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 11 Dual Nature of Radiation and Matter. Statements
 * checked against the NCERT text (definitions are the book's own wording);
 * most-asked years from all 151 CBSE board past-paper questions in the bank,
 * 2022-2026. The current book gives the de Broglie relation but not the
 * accelerated-particle form or the 1.227/√V nm value for an electron, and says
 * nothing of the force of light on a reflecting surface; all are still asked.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Dual Nature of Radiation and Matter",
  chapterSlug: "dual-nature-of-radiation-and-matter",
  source: "NCERT Physics Part II (CBSE Class 12), Chapter 11",
  keyPoints: [
    {
      term: "Work function",
      text: "The minimum energy required by an electron to escape from the metal surface is called the work function of the metal, \\(\\phi_0\\), usually in eV (\\(1\\text{ eV} = 1.602 \\times 10^{-19}\\) J). It depends on the properties of the metal and the nature of its surface.",
    },
    {
      term: "Electron emission",
      text: "The energy can be given by heating (thermionic emission), by a very strong electric field, about \\(10^8\\text{ V m}^{-1}\\) (field emission), or by light of suitable frequency (photoelectric emission). Electrons emitted by light are called photoelectrons.",
    },
    {
      term: "Photosensitive metals",
      text: "Zinc, cadmium and magnesium respond only to ultraviolet light. Alkali metals such as lithium, sodium, potassium, caesium and rubidium are sensitive even to visible light.",
    },
    {
      term: "Effect of intensity",
      text: "At fixed frequency the photocurrent increases linearly with intensity: the number of photoelectrons emitted per second is directly proportional to the intensity. Saturation current rises with intensity, but the stopping potential stays the same.",
    },
    {
      term: "Saturation current and stopping potential",
      text: "Saturation current: the maximum photocurrent, when all the emitted photoelectrons reach the collector plate. Stopping potential \\(V_0\\): the minimum negative (retarding) potential given to the plate A for which the photocurrent stops or becomes zero; \\(K_{max} = eV_0\\).",
    },
    {
      term: "Effect of frequency",
      text: "At the same intensity, higher frequency gives a larger stopping potential but the same saturation current. \\(V_0\\) varies linearly with frequency, and below a cut-off frequency there is no emission.",
    },
    {
      term: "Threshold frequency",
      text: "For a given photosensitive material there is a minimum cut-off frequency \\(\\nu_0\\), called the threshold frequency, below which no emission of photoelectrons takes place, no matter how intense the incident light is. It is different for different metals.",
    },
    {
      term: "Instantaneous emission",
      text: "Above the threshold frequency, emission starts without any apparent time lag (about \\(10^{-9}\\) s or less), even if the incident radiation is very dim.",
    },
    {
      term: "Why the wave theory fails",
      text: "On the wave picture, \\(K_{max}\\) should increase with intensity, a threshold frequency should not exist, and an electron would take hours to collect enough energy. All three contradict observation.",
    },
    {
      term: "Einstein's explanation",
      text: "Radiation energy is built up of discrete quanta, each of energy \\(h\\nu\\). One electron absorbs one quantum; if it exceeds \\(\\phi_0\\) the electron comes out with \\(K_{max} = h\\nu - \\phi_0\\). Intensity fixes the number of photons, so it changes the current, not \\(K_{max}\\). More tightly bound electrons emerge with less energy.",
    },
    {
      term: "Millikan's verification",
      text: "The \\(V_0\\) versus \\(\\nu\\) graph is a straight line of slope \\(\\frac{h}{e}\\), the same for every metal. Millikan measured the slope for sodium, found h, and in 1916 proved Einstein's equation instead of disproving it.",
    },
    {
      term: "Photon",
      text: "Each photon has energy \\(E = h\\nu\\), momentum \\(p = \\frac{h\\nu}{c} = \\frac{h}{\\lambda}\\) and speed c. Photon energy is independent of intensity; more intensity means more photons per second. Photons are electrically neutral and not deflected by electric and magnetic fields; their number may not be conserved in a collision.",
    },
    {
      term: "de Broglie hypothesis",
      text: "Moving particles of matter should display wave-like properties: \\(\\lambda = \\frac{h}{p} = \\frac{h}{mv}\\). The dual aspect of matter is evident in this relation: \\(\\lambda\\) is the attribute of a wave, p of a particle, and h relates the two. These waves are called matter waves or de Broglie waves.",
    },
    {
      term: "Size of matter waves",
      text: "\\(\\lambda\\) is smaller for a heavier or faster particle and is independent of the charge and nature of the particle. For a ball it is about \\(10^{-34}\\) m, beyond measurement; for an electron it is comparable with X-ray wavelengths.",
    },
  ],
  formulas: [
    { label: "Einstein's photoelectric equation", latex: "K_{max} = \\frac{1}{2}mv_{max}^2 = eV_0 = h\\nu - \\phi_0 = h(\\nu - \\nu_0)" },
    { label: "Threshold", latex: "\\nu_0 = \\frac{\\phi_0}{h} \\qquad \\lambda_0 = \\frac{hc}{\\phi_0}" },
    {
      label: "Stopping potential graph",
      latex: "V_0 = \\frac{h}{e}\\nu - \\frac{\\phi_0}{e} \\qquad \\text{slope} = \\frac{h}{e} \\qquad \\nu\\text{-intercept} = \\nu_0",
    },
    { label: "Photon energy", latex: "E = h\\nu = \\frac{hc}{\\lambda} \\qquad E(\\text{eV}) \\approx \\frac{1240}{\\lambda(\\text{nm})}" },
    { label: "Photon momentum", latex: "p = \\frac{h\\nu}{c} = \\frac{h}{\\lambda} = \\frac{E}{c}" },
    { label: "Photons per second", latex: "N = \\frac{P}{E} = \\frac{P\\lambda}{hc}" },
    {
      label: "Light on a surface",
      latex: "\\Delta p = \\frac{h}{\\lambda} \\text{ (absorbed)} \\qquad \\Delta p = \\frac{2h}{\\lambda} \\text{ (reflected)} \\qquad F = \\frac{2P}{c} \\text{ (reflected)}",
    },
    { label: "de Broglie wavelength", latex: "\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mK}}" },
    { label: "Charged particle through V", latex: "\\lambda = \\frac{h}{\\sqrt{2mqV}} \\qquad \\lambda_{electron} = \\frac{1.227}{\\sqrt{V}}\\text{ nm}" },
    {
      label: "Proton and alpha particle",
      latex: "\\text{same } K: \\frac{\\lambda_p}{\\lambda_\\alpha} = \\sqrt{\\frac{m_\\alpha}{m_p}} = 2 \\qquad \\text{same } V: \\frac{\\lambda_p}{\\lambda_\\alpha} = \\sqrt{\\frac{m_\\alpha q_\\alpha}{m_p q_p}} = 2\\sqrt{2}",
    },
  ],
  derivations: [
    {
      title: "Explain the observations of photoelectric effect using Einstein's photoelectric equation",
      steps: [
        "One quantum \\(h\\nu\\) is absorbed by one electron; part \\(\\phi_0\\) frees it, the rest is kinetic energy: \\(K_{max} = h\\nu - \\phi_0\\).",
        "\\(K_{max}\\) depends linearly on \\(\\nu\\) and not on intensity, because intensity is only the number of quanta per unit area per unit time.",
        "\\(K_{max}\\) cannot be negative, so emission needs \\(h\\nu > \\phi_0\\): threshold \\(\\nu_0 = \\frac{\\phi_0}{h}\\), however intense the light.",
        "More quanta, more electrons emitted: photocurrent \\(\\propto\\) intensity (for \\(\\nu > \\nu_0\\)).",
        "Absorption of a quantum is a single elementary process, so emission is instantaneous even for dim light.",
      ],
    },
    {
      title: "Show how h and the work function are found from the stopping potential versus frequency graph",
      steps: [
        "With \\(K_{max} = eV_0\\): \\(eV_0 = h\\nu - \\phi_0\\), so \\(V_0 = \\frac{h}{e}\\nu - \\frac{\\phi_0}{e}\\).",
        "This is a straight line \\(y = mx + c\\): slope \\(\\frac{h}{e}\\), the same for all metals, so lines for two metals are parallel.",
        "\\(h = e \\times \\text{slope}\\). The \\(\\nu\\)-intercept is \\(\\nu_0\\), so \\(\\phi_0 = h\\nu_0\\); extended back, the \\(V_0\\)-intercept is \\(-\\frac{\\phi_0}{e}\\).",
      ],
    },
    {
      title: "Obtain the de Broglie wavelength of a particle of mass m and charge q accelerated through a potential difference V",
      steps: [
        "Kinetic energy gained \\(K = qV\\), and \\(K = \\frac{p^2}{2m}\\), so \\(p = \\sqrt{2mK} = \\sqrt{2mqV}\\).",
        "\\(\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mqV}}\\), so \\(\\lambda \\propto \\frac{1}{\\sqrt{V}}\\) and the \\(\\lambda\\) versus \\(\\frac{1}{\\sqrt{V}}\\) graph is a straight line of slope \\(\\frac{h}{\\sqrt{2mq}}\\).",
        "For an electron, \\(\\lambda = \\frac{6.63 \\times 10^{-34}}{\\sqrt{2 \\times 9.11 \\times 10^{-31} \\times 1.6 \\times 10^{-19} V}} = \\frac{1.227}{\\sqrt{V}}\\) nm.",
      ],
    },
    {
      title: "Show that the wavelength of electromagnetic radiation equals the de Broglie wavelength of its quantum (photon)",
      steps: [
        "A photon has energy \\(E = h\\nu\\) and momentum \\(p = \\frac{h\\nu}{c}\\).",
        "Its de Broglie wavelength is \\(\\lambda = \\frac{h}{p} = \\frac{h}{h\\nu / c} = \\frac{c}{\\nu}\\), which is the wavelength of the radiation.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Experimental arrangement for the study of photoelectric effect",
      labels: ["evacuated glass/quartz tube", "emitter plate C, collector plate A", "source S, quartz window W", "battery with commutator, voltmeter, microammeter"],
    },
    {
      title: "Photocurrent versus intensity of light",
      labels: ["straight line through the origin", "axes: intensity, photocurrent"],
    },
    {
      title: "Photocurrent versus collector plate potential for different intensities",
      labels: ["saturation currents for I3 > I2 > I1", "one stopping potential, -V0, for all", "retarding potential on the left, accelerating on the right"],
    },
    {
      title: "Photocurrent versus collector plate potential for different frequencies",
      labels: ["one saturation current for all", "stopping potentials V03 > V02 > V01", "frequencies ν3 > ν2 > ν1"],
    },
    {
      title: "Stopping potential versus frequency for a photosensitive material",
      labels: ["straight line, slope h/e", "intercept ν0 on the frequency axis", "parallel lines for two metals", "no line below ν0"],
    },
  ],
  mostAsked: [
    {
      topic: "de Broglie wavelength: matter waves, a particle accelerated through V, and ratios for an electron, proton, deuteron or alpha particle",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Einstein's equation numericals: work function, threshold frequency or wavelength, stopping potential, maximum kinetic energy or speed, whether emission occurs",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Effect of intensity and frequency on photocurrent, stopping potential and maximum kinetic energy; what the wave theory cannot explain",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Photon energy and momentum, photons per second from a source's power, momentum given to a surface",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Stopping potential versus frequency graph: slope h/e, intercepts, work function and Planck's constant",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Plot photocurrent against collector plate potential or intensity, and read frequency or intensity from the curves",
      years: [2025, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Intensity or frequency",
      body: "Intensity changes only the photocurrent (saturation current). Frequency changes \\(K_{max}\\) and \\(V_0\\). The threshold frequency and work function belong to the metal: raising the frequency of the light does not change them.",
    },
    {
      title: "Stopping potential and energy in eV",
      body: "A stopping potential of 2.5 V (written -2.5 V) means \\(K_{max} = 2.5\\) eV, not 2.5 J. Convert to joules (\\(\\times 1.6 \\times 10^{-19}\\)) only for a speed: \\(v_{max} = \\sqrt{\\frac{2K_{max}}{m}}\\).",
    },
    {
      title: "Which ratio for which condition",
      body: "Same speed: \\(\\lambda \\propto \\frac{1}{m}\\). Same momentum: same \\(\\lambda\\) (a body splitting at rest gives ratio 1). Same K: \\(\\lambda \\propto \\frac{1}{\\sqrt{m}}\\). Same V: \\(\\lambda \\propto \\frac{1}{\\sqrt{mq}}\\). On a \\(\\lambda\\) versus \\(\\frac{1}{\\sqrt{V}}\\) graph the heavier particle has the smaller slope.",
    },
    {
      title: "Colour and number of photons",
      body: "Blue (violet) photons carry more energy than red. Beams of equal intensity: the red beam carries more photons per second. Doubling \\(\\lambda\\) halves both the frequency and the wave number.",
    },
    {
      title: "Reflecting surface",
      body: "A reflected photon reverses, so the momentum given is \\(\\frac{2h}{\\lambda}\\), and the force of a beam of power P is \\(\\frac{2P}{c}\\), twice that for an absorbing surface.",
    },
  ],
};

export default sheet;
