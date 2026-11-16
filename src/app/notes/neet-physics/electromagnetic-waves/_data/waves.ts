import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_EM_WAVES_NOTE: SubtopicNote = {
  subtopicName: "Displacement Current and EM Waves",
  title: "Displacement Current and EM Waves",
  oneLineDefinition:
    "Displacement current in a charging capacitor, the electric and magnetic fields of a plane wave, the speed of light in vacuum and in a medium, and the energy and momentum a wave carries.",
  whyItMatters:
    "Eleven NEET questions from 2021 to 2026. Three are on displacement current (a capacitor on an ac source in 2021, the gap of a charging capacitor in 2024, the magnetic field it makes in 2025), three on the wave's fields (directions of E and B in 2021, B from E in 2023 and 2025), three on the speed in a medium (2022, Re-NEET 2024 and Re-NEET 2026) and two on energy and sources (a transmitter's energy in 2022, which property is false in 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphem-displacement",
      name: "Displacement current",
      intuition:
        "While a capacitor charges, current flows in the wires but no charge crosses the gap between the plates. Yet the electric field in the gap is growing. Maxwell saw that a changing electric field makes a magnetic field just as a current does, so he counted it as a current of its own: the displacement current. It closes the gap, so the current is the same all the way round the circuit.",
      definition:
        "- Plain Ampere's law fails for a charging capacitor: a surface pierced by the wire sees a current, a surface through the gap sees none.\n" +
        "- Maxwell added the **displacement current** \\(i_d = \\varepsilon_0 \\dfrac{d\\Phi_E}{dt}\\), where \\(\\Phi_E\\) is the electric flux.\n" +
        "- **Ampere-Maxwell law**: \\(\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 \\left(i_c + \\varepsilon_0 \\dfrac{d\\Phi_E}{dt}\\right)\\).\n" +
        "- Between the plates \\(\\Phi_E = EA = \\dfrac{q}{\\varepsilon_0}\\), so \\(i_d = \\dfrac{dq}{dt} = C\\dfrac{dV}{dt}\\): equal to the conduction current in the wires and in the same direction.\n" +
        "- Inside a conductor only conduction current flows; in the gap only displacement current flows.\n" +
        "- Between circular plates of radius R, the magnetic field is zero on the axis, grows in proportion to r up to the rim, and falls as 1/r outside, like the field of a thick wire.\n" +
        "- A steady field gives no displacement current: once the capacitor is fully charged, \\(i_d = 0\\).",
      formula: {
        label: "Displacement current",
        latex: "i_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt} = C\\frac{dV}{dt}, \\qquad \\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 (i_c + i_d)",
        symbols: [
          { symbol: "\\(\\Phi_E\\)", meaning: "electric flux through the surface" },
          { symbol: "\\(i_c\\)", meaning: "conduction current" },
          { symbol: "\\(i_d\\)", meaning: "displacement current" },
        ],
      },
      authoredExample: {
        prompt:
          "The voltage across a 2 µF capacitor rises steadily at 1000 V/s. Find the displacement current between its plates.",
        steps: [
          "\\(i_d = C\\dfrac{dV}{dt}\\).",
          "\\(i_d = 2 \\times 10^{-6} \\times 1000 = 2 \\times 10^{-3}\\) A.",
        ],
        answer: "2 mA",
      },
      selfCheckExample: {
        prompt:
          "The field between two parallel plates of area 0.1 m² is rising at \\(10^{10}\\) V/(m s). Find the displacement current between them. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^{2}\\,\\text{N}^{-1}\\text{m}^{-2}\\))",
        steps: [
          "\\(\\Phi_E = EA\\), so \\(i_d = \\varepsilon_0 A \\dfrac{dE}{dt}\\).",
          "\\(i_d = 8.85 \\times 10^{-12} \\times 0.1 \\times 10^{10} = 8.85 \\times 10^{-3}\\) A.",
        ],
        answer: "About 8.85 mA",
      },
      practiceSet: [
        { prompt: "Write the displacement current in terms of the rate of change of electric flux.", answer: "\\(i_d = \\varepsilon_0 \\dfrac{d\\Phi_E}{dt}\\)" },
        { prompt: "The voltage across a 5 µF capacitor rises steadily at 200 V/s. Find the displacement current between its plates.", answer: "1 mA" },
        { prompt: "A capacitor is fully charged and no current flows any more. What is the displacement current between its plates?", answer: "Zero" },
        { prompt: "A copper wire carries a steady current. Which current flows inside it: conduction or displacement?", answer: "Conduction current only" },
      ],
      pyqExampleId: "8b043d89-534c-4864-bc0c-e98f93d426b0",
      traps: [
        {
          title: "No charge crosses the gap",
          body: "Displacement current is not a flow of charge. It is a changing electric field, and it counts as a current only because it makes a magnetic field like one.",
        },
        {
          title: "A steady field gives nothing",
          body: "Displacement current needs the electric flux to change. Between the plates of a fully charged capacitor the field is steady, so \\(i_d = 0\\).",
        },
        {
          title: "The field is zero on the axis",
          body: "Between circular plates the magnetic field grows from zero at the centre to its largest value at the rim, then falls outside. It is not the same everywhere between the plates.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphem-fields",
      name: "Electric and magnetic fields of a plane wave",
      intuition:
        "In an electromagnetic wave an oscillating electric field and an oscillating magnetic field keep each other going. Both stand at right angles to each other and to the direction the wave moves, so the wave is transverse. They rise and fall together, and the electric field is always c times the magnetic field.",
      definition:
        "- A plane wave along z: \\(E_x = E_0 \\sin(kz - \\omega t)\\) and \\(B_y = B_0 \\sin(kz - \\omega t)\\).\n" +
        "- E, B and the direction of travel are all at right angles. The wave travels along \\(\\vec{E} \\times \\vec{B}\\).\n" +
        "- E and B are in phase: they peak together and pass through zero together.\n" +
        "- Amplitudes: \\(E_0 = cB_0\\), and at every instant \\(E = cB\\).\n" +
        "- Speed from the wave: \\(c = \\dfrac{\\omega}{k} = f\\lambda\\).\n" +
        "- A wave with \\((kx - \\omega t)\\) travels along \\(+x\\); a wave with \\((kx + \\omega t)\\) travels along \\(-x\\).",
      formula: {
        label: "Plane wave fields",
        latex: "E_0 = cB_0, \\qquad c = \\frac{\\omega}{k} = f\\lambda, \\qquad \\text{travel along } \\vec{E} \\times \\vec{B}",
        symbols: [
          { symbol: "\\(E_0\\)", meaning: "amplitude of the electric field" },
          { symbol: "\\(B_0\\)", meaning: "amplitude of the magnetic field" },
          { symbol: "\\(k\\)", meaning: "wave number, 2π divided by the wavelength" },
        ],
      },
      authoredExample: {
        prompt:
          "The electric field of a plane wave in vacuum has an amplitude of 30 V/m. What is the amplitude of its magnetic field?",
        steps: [
          "\\(B_0 = \\dfrac{E_0}{c}\\).",
          "\\(B_0 = \\dfrac{30}{3 \\times 10^{8}} = 10^{-7}\\) T.",
        ],
        answer: "\\(10^{-7}\\) T",
      },
      selfCheckExample: {
        prompt:
          "A plane wave travels along +z, and its electric field points along +y at some instant. Along which direction does its magnetic field point at that instant?",
        steps: [
          "The travel direction is \\(\\vec{E} \\times \\vec{B}\\), so we need \\(\\hat{j} \\times \\vec{B}\\) along \\(\\hat{k}\\).",
          "\\(\\hat{j} \\times \\hat{i} = -\\hat{k}\\), so \\(\\hat{j} \\times (-\\hat{i}) = +\\hat{k}\\).",
        ],
        answer: "Along \\(-x\\)",
      },
      practiceSet: [
        { prompt: "The magnetic field of a plane wave in vacuum has an amplitude of \\(2 \\times 10^{-8}\\) T. Find the amplitude of its electric field.", answer: "6 V/m" },
        { prompt: "In a plane wave E points along +x and B along +y. Along which direction does the wave travel?", answer: "Along \\(+z\\)" },
        { prompt: "A wave has \\(\\omega = 6 \\times 10^{8}\\) rad/s and \\(k = 2\\) rad/m. Find its speed.", answer: "\\(3 \\times 10^{8}\\) m/s" },
        { prompt: "In an electromagnetic wave, are the electric and magnetic fields in phase or 90° out of phase?", answer: "In phase" },
      ],
      pyqExampleId: "3967d3d5-e6a8-40cb-bee3-d665ee5ec83f",
      traps: [
        {
          title: "Divide by c, do not multiply",
          body: "\\(B_0 = E_0/c\\), so the magnetic field amplitude is tiny: 48 V/m gives \\(1.6 \\times 10^{-7}\\) T. Multiplying by c gives an absurd value.",
        },
        {
          title: "B keeps the phase of E",
          body: "If E is a cosine of \\((5x + \\omega t)\\), B is the same cosine of the same angle. Changing cos to sin or changing the angle is wrong.",
        },
        {
          title: "The order of the cross product matters",
          body: "The wave travels along \\(\\vec{E} \\times \\vec{B}\\). Using \\(\\vec{B} \\times \\vec{E}\\) reverses the direction. If E and B are parallel, the cross product is zero and no wave travels.",
        },
        {
          title: "A plus sign means travel along minus",
          body: "A wave written with \\((kx + \\omega t)\\) moves along \\(-x\\), so its B must make \\(\\vec{E} \\times \\vec{B}\\) point along \\(-x\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphem-medium",
      name: "Speed of electromagnetic waves in vacuum and in a medium",
      intuition:
        "Maxwell found that the speed of his waves came out of two constants of electricity and magnetism, and the number matched the speed of light. So light is an electromagnetic wave. In a material the permittivity and permeability are larger, so the wave slows down. The source fixes the frequency, so a slower wave has a shorter wavelength.",
      definition:
        "- In vacuum: \\(c = \\dfrac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = 3 \\times 10^{8}\\) m/s.\n" +
        "- In a medium: \\(v = \\dfrac{1}{\\sqrt{\\mu \\varepsilon}} = \\dfrac{c}{\\sqrt{\\mu_r \\varepsilon_r}}\\). For most media \\(\\mu_r \\approx 1\\).\n" +
        "- So \\(\\dfrac{c}{v} = \\sqrt{\\mu_r \\varepsilon_r}\\), the refractive index of the medium.\n" +
        "- The frequency does not change in a medium; the wavelength becomes \\(\\lambda_m = \\dfrac{v}{f}\\).\n" +
        "- Field ratio in a medium: \\(\\dfrac{E}{B} = v\\). With \\(H = \\dfrac{B}{\\mu}\\), \\(\\dfrac{E}{H} = \\mu v = \\sqrt{\\dfrac{\\mu}{\\varepsilon}}\\). In vacuum this is \\(\\sqrt{\\mu_0/\\varepsilon_0} = 120\\pi \\approx 377\\ \\Omega\\).",
      formula: {
        label: "Wave speed",
        latex: "c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}, \\qquad v = \\frac{c}{\\sqrt{\\mu_r \\varepsilon_r}}, \\qquad \\frac{E}{H} = \\sqrt{\\frac{\\mu}{\\varepsilon}}",
        symbols: [
          { symbol: "\\(\\varepsilon_r\\)", meaning: "relative permittivity (dielectric constant)" },
          { symbol: "\\(\\mu_r\\)", meaning: "relative permeability" },
          { symbol: "\\(H\\)", meaning: "magnetic intensity, B divided by μ" },
        ],
      },
      authoredExample: {
        prompt:
          "A non-magnetic medium has a dielectric constant of 4. Find the speed of light in it and its refractive index.",
        steps: [
          "Non-magnetic: \\(\\mu_r = 1\\), so \\(v = \\dfrac{c}{\\sqrt{4}} = \\dfrac{3 \\times 10^{8}}{2} = 1.5 \\times 10^{8}\\) m/s.",
          "Refractive index \\(= \\sqrt{\\mu_r \\varepsilon_r} = \\sqrt{4} = 2\\).",
        ],
        answer: "\\(1.5 \\times 10^{8}\\) m/s; refractive index 2",
      },
      selfCheckExample: {
        prompt:
          "A 5 MHz wave enters a non-magnetic medium of dielectric constant 2.25. Find its speed and its wavelength inside.",
        steps: [
          "\\(v = \\dfrac{3 \\times 10^{8}}{\\sqrt{2.25}} = \\dfrac{3 \\times 10^{8}}{1.5} = 2 \\times 10^{8}\\) m/s.",
          "The frequency stays 5 MHz, so \\(\\lambda = \\dfrac{2 \\times 10^{8}}{5 \\times 10^{6}} = 40\\) m.",
        ],
        answer: "\\(2 \\times 10^{8}\\) m/s and 40 m",
      },
      practiceSet: [
        { prompt: "Write the speed of light in vacuum in terms of \\(\\mu_0\\) and \\(\\varepsilon_0\\).", answer: "\\(c = 1/\\sqrt{\\mu_0 \\varepsilon_0}\\)" },
        { prompt: "Does the frequency of an electromagnetic wave change when it passes from air into glass?", answer: "No; only its speed and wavelength change" },
        { prompt: "A non-magnetic medium has a dielectric constant of 1.69. Find its refractive index.", answer: "1.3" },
        { prompt: "Light of wavelength 600 nm in vacuum enters a medium of refractive index 1.5. What is its wavelength inside?", answer: "400 nm" },
      ],
      pyqExampleId: "f41c2b1d-d4ba-4d5b-a913-c13047dc9375",
      traps: [
        {
          title: "The frequency stays the same",
          body: "In a medium the speed and the wavelength both fall by the same factor. The frequency is set by the source and does not change.",
        },
        {
          title: "Take the square root",
          body: "\\(v = c/\\sqrt{\\mu_r \\varepsilon_r}\\). A dielectric constant of 9 slows light three times, not nine times.",
        },
        {
          title: "E over B is a speed, E over H is in ohms",
          body: "\\(E/B = v\\), in m/s. \\(E/H = \\sqrt{\\mu/\\varepsilon}\\), in ohms: about 377 Ω in vacuum, and smaller when \\(\\varepsilon_r\\) is larger than \\(\\mu_r\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphem-energy",
      name: "Sources, energy and momentum of electromagnetic waves",
      intuition:
        "A charge at rest makes only an electric field, and a charge moving at a steady speed adds only a steady magnetic field. To send out a wave the charge must accelerate, as electrons do when they oscillate in an aerial. The wave then carries energy and momentum away from it, through empty space, with no medium needed.",
      definition:
        "- **Source**: an accelerated charge radiates electromagnetic waves. A charge oscillating at frequency f radiates waves of the same frequency f.\n" +
        "- Electromagnetic waves need no material medium: they travel through vacuum.\n" +
        "- Energy density: \\(u_E = \\tfrac{1}{2}\\varepsilon_0 E^{2}\\) and \\(u_B = \\dfrac{B^{2}}{2\\mu_0}\\). Since \\(B = E/c\\), the two are equal, and the total is \\(u = \\varepsilon_0 E^{2}\\).\n" +
        "- Averaged over a cycle, \\(E^{2}\\) is half of \\(E_0^{2}\\), so the average total energy density is \\(\\tfrac{1}{2}\\varepsilon_0 E_0^{2}\\).\n" +
        "- Momentum: energy U fully absorbed by a surface delivers momentum \\(p = \\dfrac{U}{c}\\). This push is called radiation pressure.\n" +
        "- Energy sent out by a source of power P in time t: \\(U = Pt\\).",
      formula: {
        label: "Energy and momentum",
        latex: "u_E = \\frac{1}{2}\\varepsilon_0 E^{2} = u_B = \\frac{B^{2}}{2\\mu_0}, \\qquad p = \\frac{U}{c}",
        symbols: [
          { symbol: "\\(u_E\\)", meaning: "energy per unit volume in the electric field" },
          { symbol: "\\(u_B\\)", meaning: "energy per unit volume in the magnetic field" },
          { symbol: "\\(p\\)", meaning: "momentum delivered" },
        ],
      },
      authoredExample: {
        prompt:
          "At some point in a wave in vacuum the electric field is 10 V/m. Find the electric, magnetic and total energy densities there. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^{2}\\,\\text{N}^{-1}\\text{m}^{-2}\\))",
        steps: [
          "\\(u_E = \\tfrac{1}{2} \\times 8.85 \\times 10^{-12} \\times 10^{2} = 4.425 \\times 10^{-10}\\ \\text{J/m}^{3}\\).",
          "In a wave \\(u_B = u_E\\), so \\(u_B = 4.425 \\times 10^{-10}\\ \\text{J/m}^{3}\\) too.",
          "Total \\(u = 8.85 \\times 10^{-10}\\ \\text{J/m}^{3}\\).",
        ],
        answer: "\\(4.4 \\times 10^{-10}\\), \\(4.4 \\times 10^{-10}\\) and \\(8.85 \\times 10^{-10}\\ \\text{J/m}^{3}\\)",
      },
      selfCheckExample: {
        prompt:
          "A pulse of light carrying 6 J of energy falls on a black surface and is fully absorbed. How much momentum does it deliver?",
        steps: [
          "\\(p = \\dfrac{U}{c}\\).",
          "\\(p = \\dfrac{6}{3 \\times 10^{8}} = 2 \\times 10^{-8}\\) kg m/s.",
        ],
        answer: "\\(2 \\times 10^{-8}\\) kg m/s",
      },
      practiceSet: [
        { prompt: "How much energy does a 50 W source radiate in 2 minutes?", answer: "6000 J" },
        { prompt: "A charge oscillates at \\(10^{6}\\) Hz. What is the frequency of the electromagnetic wave it radiates?", answer: "\\(10^{6}\\) Hz" },
        { prompt: "Do electromagnetic waves need a material medium to travel?", answer: "No; they travel through vacuum" },
        { prompt: "Write the energy density of a magnetic field B in vacuum.", answer: "\\(B^{2}/2\\mu_0\\)" },
      ],
      pyqExampleId: "420c8b7c-936d-4318-a592-196679b11ad8",
      traps: [
        {
          title: "Steady motion does not radiate",
          body: "Only an accelerated charge sends out electromagnetic waves. A charge moving at constant velocity makes a steady magnetic field and no wave.",
        },
        {
          title: "The two shares are equal",
          body: "In a wave the electric and magnetic energy densities are equal, so the total is \\(\\varepsilon_0 E^{2}\\), twice the electric share.",
        },
        {
          title: "Use watts and seconds",
          body: "Energy is power times time in SI units. A 100 kW transmitter running for 1 hour sends out \\(10^{5} \\times 3600 = 3.6 \\times 10^{8}\\) J.",
        },
      ],
    },
  ],
};
