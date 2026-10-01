import type { SubtopicNote } from "@/app/notes/_types";

export const MAXWELL_EMW_NOTE: SubtopicNote = {
  subtopicName: "Displacement Current, Maxwell's Equations and Wave Speed",
  title: "Displacement Current, Maxwell's Equations and Wave Speed",
  oneLineDefinition:
    "A changing electric field acts like a current, and with it Maxwell's four equations predict waves that travel at 1/√(με): c in vacuum, c/n in a medium.",
  whyItMatters:
    "Twenty-eight PYQs, seven of them asking for a number, and six from 2026. Seven are about the displacement current between capacitor plates. Six match Maxwell's four equations to their names or ask what can produce a changing field. Fifteen find the speed of the wave in a medium, from its relative permittivity and permeability or from the phase of the field. That last group is nearly always one line: read v from the phase, then n = c/v.",
  concepts: [
    // C1 — displacement current
    {
      kind: "formula" as const,
      slug: "jpemw-displacement",
      name: "Displacement current in a capacitor",
      intuition:
        "While a capacitor charges, current flows in the wires but no charge crosses the gap. Ampere's law would then give a magnetic field around the wire and none around the gap. Maxwell fixed this by counting a changing electric flux as a current, the displacement current. Between the plates it is exactly equal to the current in the leads.",
      definition:
        "- Displacement current: \\(i_d = \\varepsilon_0\\,\\dfrac{d\\Phi_E}{dt}\\). It has the dimensions of current.\n" +
        "- Between capacitor plates \\(\\Phi_E = EA = q/\\varepsilon_0\\), so \\(i_d = \\dfrac{dq}{dt} = C\\dfrac{dV}{dt}\\), equal to the conduction current in the leads at every instant. With an AC supply the rms values are equal too.\n" +
        "- For a parallel-plate capacitor \\(C = \\varepsilon_0A/d\\), so \\(i_d = \\dfrac{\\varepsilon_0A}{d}\\dfrac{dV}{dt} = \\varepsilon_0A\\dfrac{dE}{dt}\\).\n" +
        "- The field between the plates is uniform, so a surface of area \\(A_0\\) inside the gap, parallel to the plates, carries \\(i_d\\,A_0/A\\).\n" +
        "- On an AC supply the current is \\(I_{rms} = V_{rms}/X_C = V_{rms}\\,\\omega C\\).\n" +
        "- In a conducting medium with \\(E = E_0\\sin\\omega t\\): \\(j_c = \\sigma E\\) and \\(j_d = \\varepsilon_0\\,\\partial E/\\partial t\\), so the ratio of their peaks is \\(\\sigma/(\\varepsilon_0\\omega)\\).",
      formula: {
        label: "Displacement current",
        latex:
          "i_d = \\varepsilon_0\\frac{d\\Phi_E}{dt} = C\\frac{dV}{dt}, \\qquad \\frac{(j_c)_0}{(j_d)_0} = \\frac{\\sigma}{\\varepsilon_0\\omega}",
      },
      authoredExample: {
        prompt:
          "An air capacitor has plates of area 0.02 m² that are 1 mm apart. The voltage across it rises at \\(5 \\times 10^{5}\\) V/s. Find (a) its capacitance, (b) the displacement current between the plates, and (c) the displacement current through a 50 cm² surface inside the gap, parallel to the plates. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) F/m)",
        steps: [
          "(a) \\(C = \\dfrac{\\varepsilon_0A}{d} = \\dfrac{8.85 \\times 10^{-12} \\times 0.02}{10^{-3}} = 1.77 \\times 10^{-10}\\) F, or 177 pF.",
          "(b) \\(i_d = C\\dfrac{dV}{dt} = 1.77 \\times 10^{-10} \\times 5 \\times 10^{5} = 8.85 \\times 10^{-5}\\) A, or 88.5 µA.",
          "(c) 50 cm² is \\(5 \\times 10^{-3}\\) m², a quarter of the plate area. The field is uniform, so the surface carries a quarter: \\(88.5/4 \\approx 22.1\\) µA.",
        ],
        answer: "(a) 177 pF; (b) 88.5 µA; (c) about 22.1 µA.",
      },
      selfCheckExample: {
        prompt:
          "An electromagnetic wave of frequency 50 MHz travels through a medium of conductivity 0.5 S/m. Find the ratio of the peak conduction current density to the peak displacement current density. (Take \\(1/(4\\pi\\varepsilon_0) = 9 \\times 10^{9}\\) in SI units)",
        steps: [
          "The ratio is \\(\\dfrac{\\sigma}{\\varepsilon_0\\omega}\\), with \\(\\omega = 2\\pi f\\) and \\(1/\\varepsilon_0 = 4\\pi \\times 9 \\times 10^{9}\\).",
          "\\(\\dfrac{\\sigma \\times 4\\pi \\times 9 \\times 10^{9}}{2\\pi f} = \\dfrac{0.5 \\times 18 \\times 10^{9}}{5 \\times 10^{7}} = 180\\).",
        ],
        answer: "180",
      },
      practiceSet: [
        { prompt: "A displacement current of 2 mA flows between the plates of a 4 µF capacitor. At what rate is the voltage across it changing?", answer: "500 V/s", method: "\\(dV/dt = i_d/C\\)." },
        { prompt: "A 5 µF capacitor is connected to a 100 V (rms), 50 Hz supply. Find the rms displacement current between its plates.", answer: "about 0.157 A", method: "Equal to the conduction current, \\(V_{rms}\\,\\omega C\\)." },
        { prompt: "The electric field between the plates of an air capacitor of plate area 0.01 m² rises at \\(10^{12}\\) V m⁻¹ s⁻¹. Find the displacement current. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) F/m)", answer: "88.5 mA", method: "\\(i_d = \\varepsilon_0A\\,dE/dt\\)." },
        { prompt: "A displacement current of 3 A flows uniformly between capacitor plates of area 60 cm². How much of it passes through a 20 cm² surface inside the gap, parallel to the plates?", answer: "1 A" },
      ],
      pyqExampleId: "61ed883b-8126-4635-876f-225f3c342077", // 2024: 200 pF on 230 V AC at 300 rad/s, both currents 13.8 µA
      traps: [
        {
          title: "The displacement current equals the conduction current",
          body: "Between the plates of a capacitor the displacement current is exactly the current flowing in the leads, at every instant and in rms value. An option that makes one of them ten times the other is wrong.",
        },
        {
          title: "A surface that covers part of the gap takes its share",
          body: "The field between the plates is uniform, so a surface of area A₀ inside the gap carries only the fraction A₀/A of the displacement current, not all of it.",
        },
        {
          title: "Use ω, not f, in σ/ε₀ω",
          body: "The displacement current density peaks at ε₀ωE₀, with ω = 2πf. Writing f in place of ω makes the ratio of conduction to displacement current 2π times too small.",
        },
      ],
    },

    // C2 — Maxwell's four equations
    {
      kind: "reference" as const,
      slug: "jpemw-maxwell-eqs",
      name: "Maxwell's four equations and their names",
      intuition:
        "Two of the equations are about the flux through a closed surface: they say where field lines start and end. The other two are about the circulation around a loop: they say that a changing field of one kind makes a field of the other kind. Together they predict electromagnetic waves.",
      definition:
        "- Gauss's law for electricity: \\(\\oint \\vec E\\cdot d\\vec A = q/\\varepsilon_0\\). Charges are the sources of E.\n" +
        "- Gauss's law for magnetism: \\(\\oint \\vec B\\cdot d\\vec A = 0\\). There are no isolated magnetic poles.\n" +
        "- Faraday's law: \\(\\oint \\vec E\\cdot d\\vec l = -\\,d\\Phi_B/dt\\). A changing magnetic flux makes an electric field around a loop.\n" +
        "- Ampere-Maxwell law: \\(\\oint \\vec B\\cdot d\\vec l = \\mu_0\\left(i_c + \\varepsilon_0\\,d\\Phi_E/dt\\right)\\). Plain Ampere's law, \\(\\oint \\vec B\\cdot d\\vec l = \\mu_0 I\\), holds only for steady currents.\n" +
        "- A changing magnetic field comes from a changing current or an accelerated charge. A permanent magnet, a steady current and an electric field that changes at a steady rate all give a magnetic field that does not change in time.\n" +
        "- Electromagnetic waves are produced by accelerated charges. A charge at rest or moving at constant velocity does not radiate.",
      table: {
        columns: ["Law", "Equation", "What it says"],
        rows: [
          { cells: ["Gauss's law for electricity", "\\(\\oint \\vec E\\cdot d\\vec A = q/\\varepsilon_0\\)", "The electric flux out of a closed surface is the enclosed charge divided by ε₀."] },
          { cells: ["Gauss's law for magnetism", "\\(\\oint \\vec B\\cdot d\\vec A = 0\\)", "Magnetic field lines close on themselves; there are no magnetic monopoles."] },
          { cells: ["Faraday's law of induction", "\\(\\oint \\vec E\\cdot d\\vec l = -\\dfrac{d\\Phi_B}{dt}\\)", "A changing magnetic flux induces an electric field around a loop."] },
          { cells: ["Ampere-Maxwell law", "\\(\\oint \\vec B\\cdot d\\vec l = \\mu_0 i_c + \\mu_0\\varepsilon_0\\dfrac{d\\Phi_E}{dt}\\)", "A conduction current and a changing electric flux both produce a magnetic field."] },
          { cells: ["Ampere's circuital law", "\\(\\oint \\vec B\\cdot d\\vec l = \\mu_0 I\\)", "The steady-current special case, with no changing electric flux."], noteAmber: "Without the displacement term it fails across the gap of a charging capacitor." },
        ],
        caption: "A closed-surface integral (dA) means a Gauss law; a loop integral (dl) means Faraday or Ampere-Maxwell.",
      },
      selfCheckExample: {
        prompt:
          "A loop encloses no conduction current, but the electric flux through it rises at a steady \\(2 \\times 10^{6}\\) V m s⁻¹. Find \\(\\oint \\vec B\\cdot d\\vec l\\) around the loop. (\\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Ampere-Maxwell with \\(i_c = 0\\): \\(\\oint \\vec B\\cdot d\\vec l = \\mu_0\\varepsilon_0\\,\\dfrac{d\\Phi_E}{dt}\\).",
          "\\(\\mu_0\\varepsilon_0 = 1/c^{2} = 1/(9 \\times 10^{16})\\), so the integral is \\(\\dfrac{2 \\times 10^{6}}{9 \\times 10^{16}} \\approx 2.2 \\times 10^{-11}\\) T m.",
        ],
        answer: "About \\(2.2 \\times 10^{-11}\\) T m.",
      },
      practiceSet: [
        { prompt: "Which of Maxwell's equations says that magnetic field lines have no beginning or end?", answer: "Gauss's law for magnetism, \\(\\oint \\vec B\\cdot d\\vec A = 0\\)" },
        { prompt: "Name the law \\(\\oint \\vec E\\cdot d\\vec l = -\\,d\\Phi_B/dt\\).", answer: "Faraday's law of electromagnetic induction" },
        { prompt: "Which term did Maxwell add to Ampere's circuital law?", answer: "\\(\\mu_0\\varepsilon_0\\,d\\Phi_E/dt\\), the displacement current term" },
        { prompt: "Does a charge moving at constant velocity emit electromagnetic waves?", answer: "No; only an accelerated charge radiates." },
      ],
      pyqExampleId: "fa039fa8-9c79-4887-9df2-635dc50f452a", // 2023: match the four laws to their equations
      traps: [
        {
          title: "Plain Ampere's law is the steady-current law",
          body: "The circulation of B equals μ₀I only for steady currents. The law that holds when fields change in time carries the extra term μ₀ε₀ dΦ_E/dt.",
        },
        {
          title: "Read the integral before the symbols",
          body: "In a match list, a closed-surface integral of E or B is one of the two Gauss laws, and a loop integral is Faraday's law or the Ampere-Maxwell law. Sorting by dA or dl first leaves only two choices to make.",
        },
        {
          title: "A steady source gives a steady field",
          body: "A permanent magnet, a direct current and an electric field that grows at a constant rate all produce a magnetic field that does not change with time. A changing magnetic field needs a changing current or an accelerating charge.",
        },
      ],
    },

    // C3 — wave speed in vacuum and in a medium
    {
      kind: "formula" as const,
      slug: "jpemw-wave-speed",
      name: "Speed of electromagnetic waves in vacuum and in a medium",
      intuition:
        "Maxwell's equations give a wave whose speed depends only on the permeability and permittivity of what it travels through. In vacuum that speed is c. In a medium it drops by √(μᵣεᵣ), which is the refractive index. A question often hides the speed in the phase of the field: v is the ratio of the number in front of t to the number in front of x.",
      definition:
        "- Vacuum: \\(c = 1/\\sqrt{\\mu_0\\varepsilon_0} = 3 \\times 10^{8}\\) m/s.\n" +
        "- Medium: \\(v = 1/\\sqrt{\\mu\\varepsilon} = c/\\sqrt{\\mu_r\\varepsilon_r}\\), and the refractive index is \\(n = c/v = \\sqrt{\\mu_r\\varepsilon_r}\\).\n" +
        "- Non-magnetic medium (\\(\\mu_r = 1\\)): the dielectric constant is \\(\\varepsilon_r = n^{2}\\).\n" +
        "- From the phase: for \\(E_0\\sin(kx - \\omega t)\\) or \\(E_0\\cos(\\omega t - kx)\\), \\(v = \\omega/k\\), \\(\\lambda = 2\\pi/k\\) and \\(f = \\omega/2\\pi\\). In vacuum or air, \\(\\lambda = c/f\\).\n" +
        "- From the amplitudes: \\(v = E_0/B_0\\) in any medium.\n" +
        "- In a medium the ratio of E to the magnetic intensity H is \\(\\sqrt{\\mu/\\varepsilon}\\), which is 377 Ω in vacuum.\n" +
        "- The frequency does not change when a wave enters a medium; the speed and the wavelength both fall by the factor n.",
      formula: {
        label: "Wave speed",
        latex:
          "c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}}, \\qquad v = \\frac{c}{\\sqrt{\\mu_r\\varepsilon_r}} = \\frac{\\omega}{k}, \\qquad n = \\sqrt{\\mu_r\\varepsilon_r}",
      },
      authoredExample: {
        prompt:
          "In a non-magnetic medium the electric field of a wave is \\(E = 30\\sin(2.5 \\times 10^{7}x - 3 \\times 10^{15}t)\\) V/m. Find the speed of the wave, the refractive index, the dielectric constant, and the wavelength in the medium and in vacuum. (\\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Speed from the phase: \\(v = \\dfrac{\\omega}{k} = \\dfrac{3 \\times 10^{15}}{2.5 \\times 10^{7}} = 1.2 \\times 10^{8}\\) m/s.",
          "\\(n = c/v = 3/1.2 = 2.5\\). With \\(\\mu_r = 1\\), \\(\\varepsilon_r = n^{2} = 6.25\\).",
          "In the medium \\(\\lambda = 2\\pi/k = 2\\pi/(2.5 \\times 10^{7}) \\approx 2.51 \\times 10^{-7}\\) m.",
          "The frequency is unchanged, so in vacuum \\(\\lambda\\) is n times longer: \\(2.5 \\times 2.51 \\times 10^{-7} \\approx 6.28 \\times 10^{-7}\\) m, about 628 nm.",
        ],
        answer: "\\(v = 1.2 \\times 10^{8}\\) m/s, \\(n = 2.5\\), \\(\\varepsilon_r = 6.25\\); about 251 nm in the medium and 628 nm in vacuum.",
      },
      selfCheckExample: {
        prompt:
          "A medium has relative permittivity 8 and relative permeability 2. Find its refractive index and the speed of electromagnetic waves in it. (\\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "\\(n = \\sqrt{\\mu_r\\varepsilon_r} = \\sqrt{2 \\times 8} = 4\\).",
          "\\(v = c/n = 3 \\times 10^{8}/4 = 7.5 \\times 10^{7}\\) m/s.",
        ],
        answer: "\\(n = 4\\); \\(v = 7.5 \\times 10^{7}\\) m/s.",
      },
      practiceSet: [
        { prompt: "Electromagnetic waves travel at \\(2.4 \\times 10^{8}\\) m/s in a non-magnetic medium. Find its dielectric constant. (\\(c = 3 \\times 10^{8}\\) m/s)", answer: "about 1.56", method: "\\(n = 1.25\\), \\(\\varepsilon_r = n^{2}\\)." },
        { prompt: "Find the wavelength in air of a 75 MHz electromagnetic wave.", answer: "4 m" },
        { prompt: "A wave in a medium has \\(E = E_0\\sin(5 \\times 10^{6}x - 1.25 \\times 10^{15}t)\\). Find its speed.", answer: "\\(2.5 \\times 10^{8}\\) m/s" },
        { prompt: "In a medium a wave has \\(E_0 = 12\\) V/m and \\(B_0 = 6 \\times 10^{-8}\\) T. Find its speed.", answer: "\\(2 \\times 10^{8}\\) m/s", method: "\\(v = E_0/B_0\\)." },
      ],
      pyqExampleId: "a2de21c6-1242-414f-a5e5-54d5091f2395", // 2021: dielectric constant read from the phase of E
      traps: [
        {
          title: "Take the speed from the phase, not c",
          body: "When ω/k in the phase is not 3 × 10⁸ m/s, the wave is in a medium. Use v = ω/k for the refractive index and for E₀ = vB₀; using c there gives a wrong amplitude.",
        },
        {
          title: "A magnetic medium needs μᵣ too",
          body: "The refractive index is √(μᵣεᵣ). If the permeability is given as a multiple of μ₀, it goes under the root with the dielectric constant. Dropping it leaves √εᵣ only.",
        },
        {
          title: "Square the index, do not double it",
          body: "For a non-magnetic medium the dielectric constant is n². A wave that travels at half of c has n = 2 and a dielectric constant of 4, not 2.",
        },
        {
          title: "The frequency stays the same in a medium",
          body: "Entering a medium changes the speed and the wavelength by the same factor n. The frequency is fixed by the source and does not change.",
        },
      ],
    },
  ],
};
