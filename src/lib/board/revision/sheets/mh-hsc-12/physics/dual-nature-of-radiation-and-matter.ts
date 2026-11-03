import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 14 Dual Nature of Radiation and Matter. Statements
 * checked against the Balbharati text; most-asked years from the 30 board
 * past-paper questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Dual Nature of Radiation and Matter",
  chapterSlug: "dual-nature-of-radiation-and-matter",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 14",
  keyPoints: [
    {
      term: "Photoelectric effect",
      text: "The emission of electrons from a metal surface when radiation of appropriate frequency is incident on it. Zinc, cadmium and magnesium need ultraviolet; for alkali metals even visible radiation is enough.",
    },
    {
      term: "Work function",
      text: "The minimum amount of energy required to be provided to an electron to pull it out of the metal from the surface, \\(\\phi_0\\). It depends on the metal and the nature of its surface; usually given in eV.",
    },
    {
      term: "Threshold frequency",
      text: "The minimum frequency \\(\\nu_0 = \\frac{\\phi_0}{h}\\) of incident radiation below which no electron is emitted, however intense the light. It is the same for a given metal and differs from metal to metal.",
    },
    {
      term: "Stopping potential",
      text: "The negative (retarding) collector potential \\(V_0\\) at which the photocurrent just becomes zero: \\(KE_{max} = eV_0\\). It depends on the frequency and the emitter metal, not on the intensity.",
    },
    {
      term: "Saturation current",
      text: "As the accelerating potential rises the photocurrent rises, then stays constant: the saturation current. It is proportional to the intensity; it does not change with frequency.",
    },
    {
      term: "Observations (summary)",
      text: "Emission is instantaneous (no time lag). No emission below \\(\\nu_0\\). Photocurrent \\(\\propto\\) intensity. \\(KE_{max}\\) and \\(V_0\\) rise linearly with frequency and do not depend on intensity.",
    },
    {
      term: "Failure of wave theory",
      text: "Most of these observations could not be explained by the wave theory: it predicts a time lag, emission at any frequency if the light is intense enough, and a kinetic energy that grows with intensity.",
    },
    {
      term: "Photon",
      text: "Einstein: light behaves as if its energy is released or absorbed in quanta called photons, each of energy \\(E = h\\nu\\) (Einstein's relation) and momentum \\(p = \\frac{E}{c} = \\frac{h}{\\lambda}\\). A photon gives all its energy to one electron.",
    },
    {
      term: "Einstein's photoelectric equation",
      text: "\\(KE_{max} = h\\nu - \\phi_0\\): photon energy = work function + maximum kinetic energy. \\(KE_{max}\\) depends on the emitter material and varies linearly with frequency; it is independent of intensity.",
    },
    {
      term: "Photo cell",
      text: "A device that makes use of the photoelectric effect and converts light energy into electrical energy. Used in control systems, light meters of cameras and to switch street lights on or off.",
    },
    {
      term: "De Broglie hypothesis",
      text: "A moving material particle has a wave associated with it (a matter wave) of wavelength \\(\\lambda = \\frac{h}{p} = \\frac{h}{mv}\\). Greater the momentum, shorter the wavelength.",
    },
    {
      term: "Davisson and Germer experiment",
      text: "Electrons accelerated through 54 V and scattered from a nickel crystal gave a peak at 50°. The measured wavelength agreed with de Broglie's, confirming the wave nature of electrons.",
    },
    {
      term: "Wave-particle duality",
      text: "Radiation shows wave nature (interference, diffraction) and particle nature (photoelectric effect, black body radiation). Matter too behaves as a wave under certain circumstances.",
    },
  ],
  formulas: [
    { label: "Photon energy", latex: "E = h\\nu = \\frac{hc}{\\lambda}" },
    { label: "Photon momentum", latex: "p = \\frac{E}{c} = \\frac{h}{\\lambda}" },
    { label: "Number of photons per second", latex: "n = \\frac{P}{h\\nu} = \\frac{P\\lambda}{hc}" },
    { label: "Threshold frequency and wavelength", latex: "\\nu_0 = \\frac{\\phi_0}{h} \\qquad \\lambda_0 = \\frac{hc}{\\phi_0}" },
    { label: "Einstein's photoelectric equation", latex: "KE_{max} = h\\nu - \\phi_0 = h(\\nu - \\nu_0)" },
    { label: "Stopping potential", latex: "eV_0 = KE_{max} \\qquad V_0 = \\frac{h}{e}\\nu - \\frac{\\phi_0}{e}" },
    { label: "De Broglie wavelength", latex: "\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mK}}" },
    { label: "Charged particle through p.d. V", latex: "\\lambda = \\frac{h}{\\sqrt{2mqV}}" },
    { label: "Electron through V volts", latex: "\\lambda = \\frac{1.228}{\\sqrt{V}}\\ \\text{nm}" },
    { label: "Handy conversion", latex: "1\\ \\text{eV} = 1.6 \\times 10^{-19}\\ \\text{J} \\qquad h = 6.63 \\times 10^{-34}\\ \\text{J s}" },
  ],
  derivations: [
    {
      title: "Explain the photoelectric effect using Einstein's photon theory, and obtain the photoelectric equation",
      steps: [
        "A photon of energy \\(h\\nu\\) collides with one electron and gives it all its energy; the photon no longer exists.",
        "The electron escapes only if \\(h\\nu \\ge \\phi_0\\), so a threshold frequency \\(\\nu_0 = \\frac{\\phi_0}{h}\\) is needed.",
        "The rest of the energy is kinetic: \\(KE_{max} = h\\nu - \\phi_0\\).",
        "With \\(KE_{max} = eV_0\\): \\(V_0 = \\frac{h}{e}\\nu - \\frac{\\phi_0}{e}\\), a straight line of slope \\(\\frac{h}{e}\\), the same for all metals.",
        "Intensity sets the number of photons, hence the number of electrons (current), not their energy. One photon, one electron: no time lag.",
      ],
    },
    {
      title: "Obtain an expression for the de Broglie wavelength of an electron accelerated from rest through a potential difference V",
      steps: [
        "De Broglie: \\(\\lambda = \\frac{h}{p} = \\frac{h}{mv}\\).",
        "Work done by the field on charge \\(q\\): \\(qV = \\frac{1}{2}mv^2 = \\frac{p^2}{2m}\\), so \\(p = \\sqrt{2mqV}\\).",
        "\\(\\lambda = \\frac{h}{\\sqrt{2mqV}}\\).",
        "For an electron, putting \\(h\\), \\(m\\) and \\(e\\): \\(\\lambda = \\frac{1.228}{\\sqrt{V}}\\) nm (V in volts, speed well below c).",
      ],
    },
    {
      title: "Describe the experimental set-up to study the photoelectric effect and its characteristics",
      steps: [
        "Evacuated glass tube with a quartz window; photosensitive emitter plate E and collector C; variable voltage source and ammeter.",
        "Light on E ejects photoelectrons, which reach C and give a photocurrent.",
        "Current against potential: rises to a saturation value (higher for higher intensity) and falls to zero at the stopping potential \\(-V_0\\).",
        "Changing frequency at fixed intensity: same saturation current, different \\(V_0\\). \\(V_0\\) against \\(\\nu\\) is a straight line cutting the axis at \\(\\nu_0\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Experimental set-up for the photoelectric effect", labels: ["evacuated glass tube", "quartz window", "emitter E and collector C", "incident light", "variable voltage source", "ammeter"] },
    { title: "Photo cell", labels: ["semi-cylindrical photosensitive cathode E", "wire loop anode C", "evacuated glass or quartz bulb", "battery B", "microammeter A", "incident light"] },
    { title: "Photocurrent against collector potential", labels: ["saturation current", "different intensities", "stopping potential -V0", "accelerating and retarding potential"] },
    { title: "Stopping potential against frequency", labels: ["straight lines for different metals", "same slope h/e", "threshold frequency on the frequency axis"] },
    { title: "Davisson and Germer experiment", labels: ["electron gun", "nickel crystal", "detector at angle θ", "evacuated chamber"] },
  ],
  mostAsked: [
    { topic: "Einstein's photoelectric equation: state it, or a numerical on threshold frequency, kinetic energy or stopping potential", years: [2025, 2024, 2023, 2020, 2018, 2017, 2016] },
    { topic: "De Broglie wavelength: derive it for a particle accelerated through V, or a numerical or comparison", years: [2026, 2025, 2024, 2023, 2022, 2019, 2018] },
    { topic: "Define work function, threshold frequency or stopping potential; which metals and which light give the effect", years: [2026, 2025, 2022, 2020, 2019] },
    { topic: "Photoelectric experiment or photo cell: labelled diagram and characteristics", years: [2026, 2024, 2023] },
    { topic: "Photon: energy, momentum or number of photons", years: [2026, 2025, 2018, 2016] },
  ],
  mistakes: [
    {
      title: "Thinking brighter light gives faster electrons",
      body: "Intensity changes only the number of photoelectrons (the current). \\(KE_{max}\\) and \\(V_0\\) depend on frequency alone.",
    },
    {
      title: "Doubling the frequency doubles the kinetic energy",
      body: "\\(KE_{max} = h\\nu - \\phi_0\\), so doubling \\(\\nu\\) makes it \\(2h\\nu - \\phi_0\\): more than double, not exactly double.",
    },
    {
      title: "Mixing eV and joules",
      body: "Work functions come in eV. Convert with \\(1\\ \\text{eV} = 1.6 \\times 10^{-19}\\) J before using \\(h\\nu\\) in joules, or work wholly in eV. A KE of 2 eV means a stopping potential of 2 V.",
    },
    {
      title: "Using \\(\\lambda = \\frac{h}{mv}\\) for a photon",
      body: "A photon has no rest mass: use \\(p = \\frac{h}{\\lambda} = \\frac{E}{c}\\). The 1.228/√V nm shortcut is for electrons only.",
    },
    {
      title: "Same kinetic energy, same wavelength",
      body: "\\(\\lambda = \\frac{h}{\\sqrt{2mK}}\\): for the same K, the lightest particle (the electron) has the longest wavelength.",
    },
  ],
};

export default sheet;
