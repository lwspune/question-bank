import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_SA_PARTICLES_NOTE: SubtopicNote = {
  subtopicName: "Subatomic Particles and Light",
  title: "Subatomic Particles and Light",
  oneLineDefinition:
    "The electron, proton and neutron, atomic number and mass number, isotopes, isobars and isoelectronic species, then light as a wave (c = νλ) and as photons (E = hν), with blackbody radiation and the photoelectric effect.",
  whyItMatters:
    "Four NEET questions from 2021 to 2026. One picks the correct statements about the fundamental particles, nucleons, isotopes and Dalton's atom (2023), one picks the pair of ions that is not isoelectronic (2021), one finds the wavelength of a radio station from its frequency (2021), and one counts the photons a bulb gives out each second (2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchsa-particles",
      name: "Subatomic particles, isotopes and isoelectronic species",
      intuition:
        "Dalton thought the atom could not be broken. Experiments then found three smaller particles inside it: the negative electron, and the positive proton and neutral neutron packed into a tiny nucleus. The number of protons fixes which element it is. The number of electrons fixes how it reacts.",
      definition:
        "- **Dalton's atomic theory** regarded the atom as the ultimate particle of matter.\n" +
        "- An atom has three **fundamental particles**: electrons, protons and neutrons. Protons and neutrons sit in the nucleus and together are called **nucleons**.\n" +
        "- **Thomson's model**: a sphere of positive charge with electrons embedded in it. **Rutherford's model**: almost all the mass and all the positive charge in a tiny nucleus, with electrons moving around it.\n" +
        "- **Atomic number** Z = number of protons = number of electrons in a neutral atom. **Mass number** A = protons + neutrons. Neutrons = A − Z.\n" +
        "- **Isotopes** have the same Z but different A. They have the same chemical properties, because chemistry is decided by the electrons. **Isobars** have the same A but different Z.\n" +
        "- In an ion, electrons = Z − charge: a positive ion has lost electrons, a negative ion has gained them. **Isoelectronic species** have the same number of electrons.",
      table: {
        columns: ["Item", "What it is", "Value or example"],
        rows: [
          { cells: ["Electron", "Negative particle outside the nucleus", "Charge \\(-1.602 \\times 10^{-19}\\) C, mass \\(9.109 \\times 10^{-31}\\) kg"] },
          { cells: ["Proton", "Positive particle in the nucleus", "Charge \\(+1.602 \\times 10^{-19}\\) C, mass \\(1.673 \\times 10^{-27}\\) kg"] },
          { cells: ["Neutron", "Neutral particle in the nucleus", "Charge 0, mass \\(1.675 \\times 10^{-27}\\) kg"] },
          { cells: ["Nucleons", "Protons and neutrons together", "Their number is the mass number A"], pyqExampleId: "cbc6b43e-bdac-43a5-89be-ba858059a0ae", noteAmber: "NEET 2023: nucleons are protons and neutrons, not protons and electrons." },
          { cells: ["Isotopes", "Same Z, different A", "\\({}^{1}_{1}\\text{H}\\), \\({}^{2}_{1}\\text{H}\\), \\({}^{3}_{1}\\text{H}\\)"] },
          { cells: ["Isobars", "Same A, different Z", "\\({}^{14}_{6}\\text{C}\\) and \\({}^{14}_{7}\\text{N}\\)"] },
          { cells: ["Isoelectronic species", "Same number of electrons", "\\(\\text{O}^{2-}\\), \\(\\text{F}^{-}\\), \\(\\text{Na}^{+}\\), \\(\\text{Mg}^{2+}\\): 10 each"], pyqExampleId: "4788dfab-2f2e-46be-9aa3-d82f8f0ca84e", noteAmber: "NEET 2021: Fe²⁺ (24 electrons) and Mn²⁺ (23) are not isoelectronic." },
        ],
      },
      pyqExampleId: "cbc6b43e-bdac-43a5-89be-ba858059a0ae",
      selfCheckExample: {
        prompt: "How many protons, neutrons and electrons are there in \\({}^{35}_{17}\\text{Cl}^{-}\\)?",
        steps: [
          "Protons = Z = 17. Neutrons = A − Z = 35 − 17 = 18.",
          "The ion has a charge of −1, so it has gained one electron: 17 + 1 = 18.",
        ],
        answer: "17 protons, 18 neutrons, 18 electrons",
      },
      practiceSet: [
        { prompt: "How many neutrons are there in \\({}^{80}_{35}\\text{Br}\\)?", answer: "45" },
        { prompt: "Which of \\(\\text{Na}^{+}\\), \\(\\text{K}^{+}\\) and \\(\\text{Cl}^{-}\\) is isoelectronic with neon (Z = 10)?", answer: "\\(\\text{Na}^{+}\\) (10 electrons)" },
        { prompt: "A species has 18 electrons, 16 protons and 16 neutrons. Write its symbol.", answer: "\\({}^{32}_{16}\\text{S}^{2-}\\)" },
        { prompt: "Why do the isotopes of an element have the same chemical properties?", answer: "They have the same number of electrons, and electrons decide chemical behaviour" },
      ],
      traps: [
        {
          title: "Nucleons means protons and neutrons",
          body: "Nucleons are the particles in the nucleus: protons and neutrons. Electrons are outside the nucleus and are never counted as nucleons.",
        },
        {
          title: "Count electrons from Z and the charge",
          body: "A positive ion has fewer electrons than its protons, a negative ion more. \\(\\text{O}^{2-}\\) has 8 + 2 = 10 electrons and \\(\\text{Mg}^{2+}\\) has 12 − 2 = 10. Never use the mass number to count electrons.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchsa-wave",
      name: "Wavelength, frequency and wavenumber",
      intuition:
        "Light, radio waves and X-rays are all electromagnetic radiation, and in a vacuum all of them travel at the same speed c. So a wave with a shorter wavelength must vibrate more often: frequency and wavelength are tied together by c. Wavenumber is simply the number of waves in one unit of length.",
      definition:
        "- \\(c = \\nu\\lambda\\), with \\(c = 3.0 \\times 10^{8}\\ \\text{m s}^{-1}\\) in a vacuum. Frequency \\(\\nu\\) is in hertz (\\(\\text{s}^{-1}\\)).\n" +
        "- **Wavenumber** \\(\\bar{\\nu} = \\dfrac{1}{\\lambda}\\), in \\(\\text{m}^{-1}\\) or \\(\\text{cm}^{-1}\\).\n" +
        "- In order of rising frequency (falling wavelength): radio waves, microwaves, infrared, visible, ultraviolet, X-rays, γ-rays.\n" +
        "- Visible light runs from about 400 nm (violet) to 750 nm (red).\n" +
        "- Units: 1 kHz = \\(10^{3}\\) Hz, 1 MHz = \\(10^{6}\\) Hz, 1 nm = \\(10^{-9}\\) m.",
      formula: {
        label: "Speed, frequency and wavelength",
        latex: "c = \\nu\\lambda, \\qquad \\bar{\\nu} = \\frac{1}{\\lambda}",
        symbols: [
          { symbol: "\\(c\\)", meaning: "speed of light, 3.0 × 10⁸ m per s" },
          { symbol: "\\(\\nu\\)", meaning: "frequency, in hertz" },
          { symbol: "\\(\\lambda\\)", meaning: "wavelength" },
          { symbol: "\\(\\bar{\\nu}\\)", meaning: "wavenumber, waves per unit length" },
        ],
      },
      authoredExample: {
        prompt: "Yellow light has a wavelength of 580 nm. Find its frequency and its wavenumber.",
        steps: [
          "\\(\\lambda = 580\\ \\text{nm} = 5.80 \\times 10^{-7}\\) m.",
          "\\(\\nu = \\dfrac{c}{\\lambda} = \\dfrac{3.0 \\times 10^{8}}{5.80 \\times 10^{-7}} = 5.17 \\times 10^{14}\\) Hz.",
          "\\(\\bar{\\nu} = \\dfrac{1}{\\lambda} = \\dfrac{1}{5.80 \\times 10^{-7}\\ \\text{m}} = 1.72 \\times 10^{6}\\ \\text{m}^{-1}\\).",
        ],
        answer: "\\(5.17 \\times 10^{14}\\) Hz and \\(1.72 \\times 10^{6}\\ \\text{m}^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "A radiation has a wavenumber of \\(2.0 \\times 10^{4}\\ \\text{cm}^{-1}\\). Find its wavelength in nm.",
        steps: [
          "\\(\\lambda = \\dfrac{1}{\\bar{\\nu}} = \\dfrac{1}{2.0 \\times 10^{4}}\\) cm \\(= 5.0 \\times 10^{-5}\\) cm.",
          "\\(5.0 \\times 10^{-5}\\) cm \\(= 5.0 \\times 10^{-7}\\) m = 500 nm.",
        ],
        answer: "500 nm",
      },
      practiceSet: [
        { prompt: "Find the wavenumber, in \\(\\text{m}^{-1}\\), of light of wavelength 400 nm.", answer: "\\(2.5 \\times 10^{6}\\ \\text{m}^{-1}\\)" },
        { prompt: "Radiation A has a wavelength of 300 nm and radiation B of 600 nm. Which has the higher frequency, and by what factor?", answer: "A, twice that of B" },
        { prompt: "Arrange X-rays, radio waves and visible light in order of increasing frequency.", answer: "Radio waves < visible light < X-rays" },
        { prompt: "What is the speed of every electromagnetic radiation in a vacuum?", answer: "\\(3.0 \\times 10^{8}\\ \\text{m s}^{-1}\\)" },
      ],
      pyqExampleId: "0941912f-18f1-43fb-a08c-29a262b63771",
      traps: [
        {
          title: "Convert to hertz and metres first",
          body: "A frequency in kHz must be multiplied by \\(10^{3}\\) and a wavelength in nm by \\(10^{-9}\\) before using \\(c = \\nu\\lambda\\). A missed power of ten gives an option that is 1000 times off.",
        },
        {
          title: "Wavenumber units",
          body: "\\(1\\ \\text{cm}^{-1} = 100\\ \\text{m}^{-1}\\). Wavenumber is the reciprocal of wavelength, so a longer wavelength has a smaller wavenumber.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchsa-photon",
      name: "Planck's quantum, photons and the photoelectric effect",
      intuition:
        "Two experiments could not be explained if light were only a wave: the colours a hot body gives out, and electrons knocked out of a metal by light. Planck's answer was that energy comes in small packets, called quanta. A packet of light is a photon, and its energy depends only on its frequency.",
      definition:
        "- **Planck's quantum theory**: energy is given out or taken in only in packets. One quantum of light (a **photon**) has \\(E = h\\nu = \\dfrac{hc}{\\lambda}\\), with \\(h = 6.626 \\times 10^{-34}\\) J s.\n" +
        "- N photons carry \\(Nh\\nu\\). Photons given out per second = power (J per s) ÷ energy of one photon.\n" +
        "- **Blackbody radiation**: as the temperature rises, the maximum of the intensity against wavelength curve shifts to shorter wavelength. An iron rod heated in a furnace glows dull red, then brighter red, then white and finally blue.\n" +
        "- **Photoelectric effect**: electrons leave the metal as soon as light strikes it. Each metal has a **threshold frequency** \\(\\nu_0\\); below it no electron comes out, however bright the light. Brighter light ejects more electrons, while a higher frequency gives each electron more kinetic energy.\n" +
        "- \\(h\\nu = h\\nu_0 + \\dfrac{1}{2}m_e v^{2}\\). The **work function** is \\(W_0 = h\\nu_0\\).",
      formula: {
        label: "Photon energy and the photoelectric equation",
        latex: "E = h\\nu = \\frac{hc}{\\lambda}, \\qquad h\\nu = h\\nu_0 + \\frac{1}{2}m_e v^{2}",
        symbols: [
          { symbol: "\\(h\\)", meaning: "Planck's constant, 6.626 × 10⁻³⁴ J s" },
          { symbol: "\\(\\nu_0\\)", meaning: "threshold frequency of the metal" },
          { symbol: "\\(\\frac{1}{2}m_e v^{2}\\)", meaning: "kinetic energy of the ejected electron" },
        ],
      },
      authoredExample: {
        prompt: "Find the energy of one mole of photons of frequency \\(5 \\times 10^{14}\\) Hz.",
        steps: [
          "One photon: \\(E = h\\nu = 6.626 \\times 10^{-34} \\times 5 \\times 10^{14} = 3.313 \\times 10^{-19}\\) J.",
          "One mole is \\(6.022 \\times 10^{23}\\) photons: \\(3.313 \\times 10^{-19} \\times 6.022 \\times 10^{23} = 1.995 \\times 10^{5}\\) J.",
        ],
        answer: "\\(1.995 \\times 10^{5}\\) J, about 199.5 kJ",
      },
      selfCheckExample: {
        prompt: "A metal has a threshold frequency of \\(5.0 \\times 10^{14}\\) Hz. Light of frequency \\(1.0 \\times 10^{15}\\) Hz falls on it. Find the kinetic energy of the ejected electrons, taking \\(h = 6.6 \\times 10^{-34}\\) J s.",
        steps: [
          "\\(\\dfrac{1}{2}m_e v^{2} = h(\\nu - \\nu_0) = 6.6 \\times 10^{-34} \\times (10 - 5) \\times 10^{14}\\).",
          "\\(= 6.6 \\times 10^{-34} \\times 5 \\times 10^{14} = 3.3 \\times 10^{-19}\\) J.",
        ],
        answer: "\\(3.3 \\times 10^{-19}\\) J",
      },
      practiceSet: [
        { prompt: "Find the energy of a photon of wavelength 300 nm, taking \\(h = 6.6 \\times 10^{-34}\\) J s and \\(c = 3 \\times 10^{8}\\ \\text{m s}^{-1}\\).", answer: "\\(6.6 \\times 10^{-19}\\) J" },
        { prompt: "Light above the threshold frequency falls on a metal and its intensity is doubled. What happens to the number of electrons ejected and to their kinetic energy?", answer: "More electrons are ejected; their kinetic energy does not change" },
        { prompt: "Light below the threshold frequency falls on a metal for a long time. Are electrons ejected?", answer: "No" },
        { prompt: "As a blackbody is heated, does the peak of its radiation move to shorter or longer wavelength?", answer: "Shorter wavelength" },
      ],
      pyqExampleId: "c69a14e1-2a5f-4f20-869d-e5f0c4f723fc",
      traps: [
        {
          title: "Use only the energy that becomes light",
          body: "When a lamp turns only part of its power into light, multiply the power by that fraction first. Dividing the full power by the photon energy counts photons that were never made.",
        },
        {
          title: "Brightness changes the number, not the speed",
          body: "In the photoelectric effect a brighter light ejects more electrons. The kinetic energy of each electron rises only with the frequency of the light.",
        },
      ],
    },
  ],
};
