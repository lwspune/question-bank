import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 8 Electromagnetic Waves. Statements checked against the
 * NCERT text (definitions are the book's own wording); most-asked years from
 * all 87 CBSE board past-paper questions in the bank, 2022-2026. Intensity and
 * radiation pressure (asked in 2025) are not in the current book.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Electromagnetic Waves",
  chapterSlug: "electromagnetic-waves",
  source: "NCERT Physics Part I (CBSE Class 12), Chapter 8",
  keyPoints: [
    {
      term: "Displacement current",
      text: "Maxwell found Ampere's law inconsistent for a charging capacitor and added a current due to a changing electric field: \\(i_d = \\varepsilon_0\\frac{d\\Phi_E}{dt}\\). It is called displacement current or Maxwell's displacement current. The current due to flowing charges is conduction current.",
    },
    {
      term: "Ampere-Maxwell law",
      text: "The total current through any surface bounded by the loop is the sum of the conduction and displacement currents. Outside the capacitor plates there is only conduction current (\\(i_d = 0\\)); between the plates only displacement current (\\(i_c = 0\\), \\(i_d = i\\)). So the current is continuous.",
    },
    {
      term: "Properties of displacement current",
      text: "In all respects it has the same physical effects as the conduction current: it is a source of magnetic field. It is zero for a steady electric field. With it, the laws are more symmetrical: a changing magnetic field gives an electric field and a changing electric field gives a magnetic field.",
    },
    {
      term: "Sources of em waves",
      text: "Neither stationary charges nor charges in uniform motion radiate. Accelerated charges radiate electromagnetic waves. A charge oscillating with some frequency makes oscillating electric and magnetic fields that regenerate each other; the wave has the same frequency as the charge.",
    },
    {
      term: "Nature of em waves",
      text: "The electric and magnetic fields are perpendicular to each other and to the direction of propagation (transverse waves), and oscillate in phase: \\(E_x = E_0\\sin(kz - \\omega t)\\), \\(B_y = B_0\\sin(kz - \\omega t)\\). The wave travels along \\(\\vec{E}\\times\\vec{B}\\).",
    },
    {
      term: "No medium needed",
      text: "Em waves are self-sustaining oscillations of electric and magnetic fields in free space, or vacuum: no material medium is involved in the vibrations.",
    },
    {
      term: "Speed of em waves",
      text: "In vacuum \\(c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}} = 3 \\times 10^8\\) m/s, the same for all wavelengths; \\(\\omega = ck\\) and \\(\\frac{E_0}{B_0} = c\\). In a medium \\(v = \\frac{1}{\\sqrt{\\mu\\varepsilon}}\\): the velocity of light depends on electric and magnetic properties of the medium. The frequency does not change; the wavelength does.",
    },
    {
      term: "Energy carried",
      text: "Em waves carry energy from one place to another (light carries energy from the Sun to the Earth). The average energy densities of the E and B fields are equal. Intensity \\(\\propto E_0^2\\), so n times the amplitude gives \\(n^2\\) times the intensity.",
    },
    {
      term: "History",
      text: "Hertz (1887) first produced and detected em waves of wavelength a few metres. J.C. Bose produced waves of 25 mm to 5 mm. Marconi transmitted em waves over many kilometres.",
    },
    {
      term: "Electromagnetic spectrum",
      text: "The classification of em waves according to frequency. There is no sharp division between one kind of wave and the next. In order of increasing wavelength: gamma rays, X-rays, ultraviolet, visible, infrared, microwaves, radio waves. All travel through vacuum with the same speed, so they differ in their mode of interaction with matter.",
    },
    {
      term: "Radio waves and microwaves",
      text: "Radio: produced by accelerated charges in conducting wires; radio and TV (FM 88 to 108 MHz). Microwaves: produced by klystrons, magnetrons and Gunn diodes; radar (short wavelength), speed guns, microwave ovens (frequency matched to water molecules, so food must contain water).",
    },
    {
      term: "Infrared: heat waves",
      text: "Produced by hot bodies and molecules. Called heat waves because water molecules readily absorb them and heat up. Uses: physical therapy, Earth's warmth (greenhouse effect), detectors in Earth satellites, LEDs in remote switches of TV sets.",
    },
    {
      term: "Ultraviolet",
      text: "Produced by special lamps and very hot bodies; the Sun is an important source, most of it absorbed by the ozone layer. Absorbed by ordinary glass, so welders wear glass goggles. Uses: LASIK eye surgery, killing germs in water purifiers.",
    },
    {
      term: "X-rays and gamma rays",
      text: "X-rays: produced by bombarding a metal target with high energy electrons; a diagnostic tool in medicine (bone fractures) and a treatment for some cancers; they damage living tissue. Gamma rays: from nuclear reactions and radioactive nuclei; used in medicine to destroy cancer cells.",
    },
  ],
  formulas: [
    { label: "Displacement current", latex: "i_d = \\varepsilon_0\\frac{d\\Phi_E}{dt} \\qquad \\Phi_E = EA = \\frac{Q}{\\varepsilon_0}" },
    { label: "Ampere-Maxwell law", latex: "\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 i_c + \\mu_0\\varepsilon_0\\frac{d\\Phi_E}{dt}" },
    { label: "Plane em wave along z", latex: "E_x = E_0\\sin(kz - \\omega t) \\qquad B_y = B_0\\sin(kz - \\omega t)" },
    { label: "Wave relations", latex: "k = \\frac{2\\pi}{\\lambda} \\qquad \\omega = 2\\pi\\nu \\qquad c = \\frac{\\omega}{k} = \\nu\\lambda" },
    { label: "Speed in vacuum and in a medium", latex: "c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}} \\qquad v = \\frac{1}{\\sqrt{\\mu\\varepsilon}} = \\frac{c}{\\sqrt{\\mu_r\\varepsilon_r}}" },
    { label: "Ratio of field amplitudes", latex: "\\frac{E_0}{B_0} = c \\text{ (vacuum)} \\qquad \\frac{E_0}{B_0} = v \\text{ (medium)}" },
    { label: "Energy densities", latex: "\\frac{1}{2}\\varepsilon_0E^2 = \\frac{B^2}{2\\mu_0} \\qquad I \\propto E_0^2" },
    {
      label: "Wavelength ranges, long waves (Table 8.1)",
      latex: "\\text{Radio} > 0.1\\text{ m} \\quad \\text{Microwave } 0.1\\text{ m to } 1\\text{ mm} \\quad \\text{Infrared } 1\\text{ mm to } 700\\text{ nm}",
    },
    {
      label: "Wavelength ranges, short waves (Table 8.1)",
      latex: "\\text{Visible } 700 \\text{ to } 400\\text{ nm} \\quad \\text{UV } 400\\text{ nm to } 1\\text{ nm} \\quad \\text{X-rays } 1\\text{ nm to } 10^{-3}\\text{ nm} \\quad \\gamma < 10^{-3}\\text{ nm}",
    },
  ],
  derivations: [
    {
      title: "Displacement current in a charging capacitor; continuity of current (Ampere-Maxwell law)",
      steps: [
        "Ampere's law round a loop near the wire gives \\(B \\neq 0\\) for a flat surface (current i passes), but \\(B = 0\\) for a pot-shaped surface between the plates (no current): a contradiction.",
        "Between the plates \\(E = \\frac{Q}{\\varepsilon_0A}\\), so the electric flux is \\(\\Phi_E = EA = \\frac{Q}{\\varepsilon_0}\\).",
        "\\(\\frac{d\\Phi_E}{dt} = \\frac{1}{\\varepsilon_0}\\frac{dQ}{dt}\\), so \\(\\varepsilon_0\\frac{d\\Phi_E}{dt} = i\\). This is the displacement current \\(i_d\\).",
        "Ampere-Maxwell law: \\(\\oint\\vec{B}\\cdot d\\vec{l} = \\mu_0(i_c + i_d)\\). Outside \\(i_c = i\\), inside \\(i_d = i\\): the same total current for every surface, so the current is continuous.",
      ],
    },
    {
      title: "How an accelerated (oscillating) charge produces an em wave",
      steps: [
        "An oscillating charge is an accelerated charge; it produces an oscillating electric field in space.",
        "The changing electric field produces an oscillating magnetic field (displacement current), which in turn produces an oscillating electric field (Faraday's law).",
        "The fields regenerate each other and travel as a wave, perpendicular to each other and to the direction of travel, with the frequency of the charge; the energy comes from the source.",
      ],
    },
    {
      title: "Show that 1/√(μ0ε0) gives the speed of an em wave in free space",
      steps: [
        "\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m A\\(^{-1}\\), \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) C\\(^2\\) N\\(^{-1}\\) m\\(^{-2}\\).",
        "\\(\\mu_0\\varepsilon_0 = 1.11 \\times 10^{-17}\\) s\\(^2\\) m\\(^{-2}\\), so \\(\\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}} = 3.0 \\times 10^8\\) m s\\(^{-1}\\), the measured speed of light: light is an em wave.",
        "Dimensions of \\((\\mu\\varepsilon)^{-1}\\) are \\([\\mathrm{M^0L^2T^{-2}}]\\), those of speed squared.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Plane em wave propagating along the z-axis",
      labels: ["E along x, varying as a sine wave", "B along y, in phase with E", "direction of propagation z", "wavelength λ marked"],
    },
    {
      title: "Charging capacitor and Ampere's loop",
      labels: ["loop of radius r round the wire, point P", "flat surface the current crosses", "pot-shaped surface between the plates", "uniform E between the plates"],
    },
    {
      title: "Electromagnetic spectrum",
      labels: ["gamma, X, UV, visible, IR, micro, radio", "wavelength increasing, frequency decreasing", "visible 400 nm to 700 nm", "no sharp boundaries"],
    },
  ],
  mostAsked: [
    { topic: "Electromagnetic spectrum: name the wave used for a given purpose (radar, water purifier, bone X-ray, LASIK, TV remote) and its wavelength or frequency range", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Fields in an em wave: E and B perpendicular and in phase, ratio of amplitudes equal to c, direction of propagation, or a numerical on the wave equation", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "One band in detail: what X-rays, microwaves, infrared or ultraviolet are, how they are produced, and their uses", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Displacement current: definition, how it differs from conduction current, and continuity of current while a capacitor charges", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "How em waves are produced and their characteristics; speed in vacuum and in a medium", years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Order of the spectrum by wavelength, frequency or photon energy", marks: 1, years: [2025, 2024, 2023, 2022] },
  ],
  mistakes: [
    {
      title: "Using c for the field ratio in a medium",
      body: "\\(\\frac{E_0}{B_0} = c\\) only in vacuum. In glass of \\(n = 1.5\\) it is \\(v = 2 \\times 10^8\\) m/s. With \\(\\varepsilon_r = \\frac{3}{2}\\) and \\(\\mu_r = \\frac{8}{3}\\), \\(n = \\sqrt{4} = 2\\): the wavelength halves, the frequency stays.",
    },
    {
      title: "Saying E and B differ in phase by \\(\\frac{\\pi}{2}\\)",
      body: "In an em wave E and B are in phase (phase difference zero) and perpendicular to each other. Only a travelling form such as \\(\\sin(kz - \\omega t)\\) is a wave; \\(B_0\\sin kz\\) alone is not.",
    },
    {
      title: "Wrong direction of B",
      body: "The wave travels along \\(\\vec{E}\\times\\vec{B}\\). Wave along +x with E along +y: B is along +z. Find the third direction with this cross product, not by guessing.",
    },
    {
      title: "Reading speed from the wave equation",
      body: "In \\(B = B_0\\sin(\\omega t - kx)\\), speed \\(= \\frac{\\omega}{k}\\), \\(\\lambda = \\frac{2\\pi}{k}\\) and \\(\\nu = \\frac{\\omega}{2\\pi}\\). Do not divide the numbers the other way round.",
    },
    {
      title: "Swapping IR and UV uses",
      body: "UV: water purifiers, LASIK, stopped by welders' glass goggles, absorbed by ozone. IR: heat waves, physiotherapy, TV remotes, Earth's warmth. Microwaves: radar. X-rays: bone fractures. Gamma: destroy cancer cells.",
    },
    {
      title: "Displacement current in a steady state",
      body: "It exists only while E changes. A fully charged capacitor on dc has \\(i_d = 0\\); a conductor with a constant field has no displacement current.",
    },
  ],
};

export default sheet;
