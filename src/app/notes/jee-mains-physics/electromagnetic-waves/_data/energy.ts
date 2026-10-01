import type { SubtopicNote } from "@/app/notes/_types";

export const ENERGY_EMW_NOTE: SubtopicNote = {
  subtopicName: "Energy, Intensity and Radiation Pressure",
  title: "Energy, Intensity and Radiation Pressure",
  oneLineDefinition:
    "A wave stores equal energy in its electric and magnetic fields, carries it at c as an intensity ½cε₀E₀², and pushes on a surface with a pressure I/c, or 2I/c when it is reflected.",
  whyItMatters:
    "Thirty PYQs, six of them asking for a number, and four from 2026. Ten are about energy density: the two fields' shares, the average over a cycle, the energy held in a volume. Thirteen find an intensity, or a peak field from an intensity, often for a lamp that radiates only part of its power. Seven are about the momentum of light and the pressure it puts on an absorbing or a reflecting surface.",
  concepts: [
    // C1 — energy density
    {
      kind: "formula" as const,
      slug: "jpemw-energy-density",
      name: "Energy density of an electromagnetic wave",
      intuition:
        "Energy is stored in both fields of the wave, and because B = E/c the two shares come out exactly equal at every instant. The energy density goes as E², so it is never negative and pulses at twice the frequency of the field. Averaged over a cycle, sin² is one half.",
      definition:
        "- Electric share \\(u_E = \\tfrac{1}{2}\\varepsilon_0E^{2}\\); magnetic share \\(u_B = \\dfrac{B^{2}}{2\\mu_0}\\). With \\(B = E/c\\) and \\(c^{2} = 1/(\\mu_0\\varepsilon_0)\\) they are equal at every instant.\n" +
        "- Total at an instant: \\(u = u_E + u_B = \\varepsilon_0E^{2}\\).\n" +
        "- Average over a cycle: \\(\\langle u\\rangle = \\tfrac{1}{2}\\varepsilon_0E_0^{2} = \\dfrac{B_0^{2}}{2\\mu_0}\\). Each field's average share is \\(\\tfrac{1}{4}\\varepsilon_0E_0^{2}\\), half of the total.\n" +
        "- Energy held in a volume V: \\(U = \\langle u\\rangle V\\). Holding the same energy in a smaller volume needs a larger field, since \\(E_0^{2}\\) scales as \\(1/V\\).\n" +
        "- The energy density oscillates at \\(2\\omega\\), because \\(\\sin^{2}\\omega t = \\tfrac{1}{2}(1 - \\cos 2\\omega t)\\).\n" +
        "- The frequency of the wave does not enter \\(\\langle u\\rangle\\).",
      formula: {
        label: "Energy density",
        latex:
          "u_E = \\tfrac{1}{2}\\varepsilon_0E^{2} = u_B = \\frac{B^{2}}{2\\mu_0}, \\qquad \\langle u\\rangle = \\tfrac{1}{2}\\varepsilon_0E_0^{2} = \\frac{B_0^{2}}{2\\mu_0}",
      },
      authoredExample: {
        prompt:
          "A wave in vacuum has an electric amplitude of 120 V/m. Find the average energy density, the average electric share, and the energy held in a volume of \\(2 \\times 10^{-3}\\) m³. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) F/m)",
        steps: [
          "\\(\\langle u\\rangle = \\tfrac{1}{2}\\varepsilon_0E_0^{2} = 0.5 \\times 8.85 \\times 10^{-12} \\times 14400 \\approx 6.37 \\times 10^{-8}\\) J/m³.",
          "The electric share is half of this: about \\(3.19 \\times 10^{-8}\\) J/m³. The magnetic share is the same.",
          "Energy in the volume: \\(6.37 \\times 10^{-8} \\times 2 \\times 10^{-3} \\approx 1.27 \\times 10^{-10}\\) J.",
        ],
        answer: "\\(6.37 \\times 10^{-8}\\) J/m³; \\(3.19 \\times 10^{-8}\\) J/m³; \\(1.27 \\times 10^{-10}\\) J.",
      },
      selfCheckExample: {
        prompt:
          "The magnetic field of a wave has an amplitude of \\(2 \\times 10^{-7}\\) T. Find the average energy density of the wave. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)",
        steps: [
          "\\(\\langle u\\rangle = \\dfrac{B_0^{2}}{2\\mu_0}\\); this already counts both fields.",
          "\\(\\dfrac{4 \\times 10^{-14}}{2 \\times 4\\pi \\times 10^{-7}} = \\dfrac{4 \\times 10^{-14}}{2.51 \\times 10^{-6}} \\approx 1.59 \\times 10^{-8}\\) J/m³.",
        ],
        answer: "About \\(1.59 \\times 10^{-8}\\) J/m³.",
      },
      practiceSet: [
        { prompt: "The electric amplitude of a wave is doubled. By what factor does its average energy density change?", answer: "It becomes 4 times as large." },
        { prompt: "The electric field of a wave oscillates at \\(3 \\times 10^{9}\\) Hz. At what frequency does its energy density oscillate?", answer: "\\(6 \\times 10^{9}\\) Hz" },
        { prompt: "A wave in vacuum has an average energy density of \\(4.425 \\times 10^{-9}\\) J/m³. Find its electric amplitude. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) F/m)", answer: "about 31.6 V/m", method: "\\(E_0^{2} = 2\\langle u\\rangle/\\varepsilon_0 = 1000\\)." },
        { prompt: "The same wave energy must fit into three times the volume. By what factor must the electric amplitude change?", answer: "It is divided by \\(\\sqrt{3}\\)." },
      ],
      pyqExampleId: "aa9c460b-bbc5-4df7-bc54-5c260f21ad59", // 2024: amplitude 50 V/m at 5 × 10¹⁰ Hz, total average energy density
      traps: [
        {
          title: "½ε₀E₀² is the total average, not the electric share",
          body: "Averaged over a cycle, the whole wave holds ½ε₀E₀². The electric field's share is half of that, ¼ε₀E₀², and the magnetic field holds the other quarter.",
        },
        {
          title: "Do not add the magnetic term again",
          body: "½ε₀E₀² already includes both fields. Adding B₀²/2μ₀ on top of it doubles the answer, and that doubled value is usually one of the options.",
        },
        {
          title: "The magnetic share is B²/2μ₀, not μ₀B²/2",
          body: "The permeability goes in the denominator of the magnetic energy density, just as the permittivity goes in the numerator of the electric one. Check with B = E/c: B²/2μ₀ becomes ½ε₀E².",
        },
        {
          title: "The frequency does not change the average energy",
          body: "The average energy density depends only on the amplitude. A frequency given in the question is there to tempt a calculation that is not needed.",
        },
      ],
    },

    // C2 — intensity
    {
      kind: "formula" as const,
      slug: "jpemw-intensity",
      name: "Intensity of an electromagnetic wave",
      intuition:
        "Intensity is the energy crossing one square metre each second. The energy density moves along at c, so the intensity is simply the average energy density times c. For a lamp, the power it actually radiates spreads over a sphere, so the intensity falls as 1/r².",
      definition:
        "- \\(I = \\langle u\\rangle c = \\tfrac{1}{2}c\\varepsilon_0E_0^{2} = \\dfrac{cB_0^{2}}{2\\mu_0}\\). In terms of 377 Ω: \\(I = \\dfrac{E_0^{2}}{2 \\times 377}\\).\n" +
        "- The other way round: \\(E_0 = \\sqrt{\\dfrac{2I}{c\\varepsilon_0}}\\) and \\(B_0 = E_0/c\\).\n" +
        "- A point source of power P that radiates a fraction \\(\\eta\\) of it as waves: \\(I = \\dfrac{\\eta P}{4\\pi r^{2}}\\). Every point at the same distance gets the same intensity, whatever its direction.\n" +
        "- Unit W/m², dimensions \\(MT^{-3}\\).\n" +
        "- With rms fields: \\(I = c\\varepsilon_0E_{rms}^{2}\\), since \\(E_{rms} = E_0/\\sqrt{2}\\).",
      formula: {
        label: "Intensity",
        latex:
          "I = \\tfrac{1}{2}c\\varepsilon_0E_0^{2} = \\frac{cB_0^{2}}{2\\mu_0}, \\qquad I = \\frac{\\eta P}{4\\pi r^{2}}",
      },
      authoredExample: {
        prompt:
          "A 125 W lamp radiates 4% of its power as light, equally in all directions. Find the intensity and the peak electric and magnetic fields 2 m away. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) F/m, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Radiated power: \\(0.04 \\times 125 = 5\\) W.",
          "\\(I = \\dfrac{5}{4\\pi \\times 2^{2}} = \\dfrac{5}{16\\pi} \\approx 0.0995\\) W/m².",
          "\\(E_0 = \\sqrt{\\dfrac{2I}{c\\varepsilon_0}} = \\sqrt{\\dfrac{0.199}{2.655 \\times 10^{-3}}} = \\sqrt{74.9} \\approx 8.66\\) V/m.",
          "\\(B_0 = E_0/c \\approx 2.89 \\times 10^{-8}\\) T.",
        ],
        answer: "About 0.0995 W/m²; \\(E_0 \\approx 8.66\\) V/m; \\(B_0 \\approx 2.89 \\times 10^{-8}\\) T.",
      },
      selfCheckExample: {
        prompt:
          "A laser beam has an intensity of \\(2.5 \\times 10^{3}\\) W/m². Find the amplitude of its electric field. (\\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) F/m, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "\\(c\\varepsilon_0 = 3 \\times 10^{8} \\times 8.85 \\times 10^{-12} = 2.655 \\times 10^{-3}\\).",
          "\\(E_0 = \\sqrt{\\dfrac{2 \\times 2500}{2.655 \\times 10^{-3}}} = \\sqrt{1.88 \\times 10^{6}} \\approx 1.37 \\times 10^{3}\\) V/m.",
        ],
        answer: "About 1370 V/m.",
      },
      practiceSet: [
        { prompt: "Taking \\(\\sqrt{\\mu_0/\\varepsilon_0} = 377\\ \\Omega\\), find the intensity of a wave whose electric amplitude is 754 V/m.", answer: "754 W/m²", method: "\\(I = E_0^{2}/(2 \\times 377)\\)." },
        { prompt: "The intensity from a point source is 8 W/m² at 2 m. Find it at 4 m.", answer: "2 W/m²" },
        { prompt: "Write the dimensions of intensity.", answer: "\\(MT^{-3}\\)" },
        { prompt: "The magnetic amplitude of a wave is \\(10^{-6}\\) T. Find its intensity. (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A, \\(c = 3 \\times 10^{8}\\) m/s)", answer: "about 119 W/m²", method: "\\(I = cB_0^{2}/(2\\mu_0)\\)." },
      ],
      pyqExampleId: "8cecfe64-ec42-4bd6-959d-d9deb22ea3f1", // 2024: E_y amplitude 200 V/m, intensity
      traps: [
        {
          title: "Only the radiated power counts",
          body: "A bulb rated at some wattage with a stated efficiency radiates only that fraction as light. Divide the radiated power, not the rated power, by 4πr².",
        },
        {
          title: "Intensity depends on distance, not direction",
          body: "A point source spreads its power evenly over a sphere. Moving a detector around the sphere at the same distance leaves the intensity unchanged.",
        },
        {
          title: "The ½ goes with the peak field",
          body: "I = ½cε₀E₀² uses the amplitude E₀. With the rms field the ½ is already inside, and I = cε₀E_rms². Using the ½ with an rms value halves the answer.",
        },
        {
          title: "The field goes as the square root of the intensity",
          body: "Doubling the intensity raises the peak field by √2, not by 2. Doubling the field makes the intensity four times as large.",
        },
      ],
    },

    // C3 — momentum and radiation pressure
    {
      kind: "formula" as const,
      slug: "jpemw-pressure",
      name: "Momentum and radiation pressure of light",
      intuition:
        "Light carries momentum as well as energy: energy U comes with momentum U/c. A surface that absorbs the light takes that momentum; a mirror sends it back and so takes twice as much. Momentum delivered per second is a force, and force per area is the radiation pressure.",
      definition:
        "- Momentum carried by energy U: \\(p = U/c\\). Light has momentum even though a photon has zero rest mass.\n" +
        "- At normal incidence: a perfect absorber feels a pressure \\(I/c\\); a perfect reflector feels \\(2I/c\\).\n" +
        "- Force on the surface = pressure × area: \\(F = IA/c\\) for an absorber. The force is steady while the light falls, so the exposure time does not enter it.\n" +
        "- Momentum (or energy) delivered in a time t is the force (or power) times t.\n" +
        "- For a point source, first find I at the surface from \\(I = P/(4\\pi r^{2})\\).\n" +
        "- On a curved surface around the source, the sideways pushes cancel; what remains is the pressure acting over the area the surface presents to the light, its flat projection.",
      formula: {
        label: "Radiation pressure",
        latex:
          "p = \\frac{U}{c}, \\qquad P_{\\text{absorbed}} = \\frac{I}{c}, \\qquad P_{\\text{reflected}} = \\frac{2I}{c}, \\qquad F = P_{\\text{rad}}A",
      },
      authoredExample: {
        prompt:
          "Light of intensity 1.2 kW/m² falls normally on a sheet of area 0.5 m² for 10 minutes. Find the force on the sheet and the momentum it receives if it (a) absorbs all of the light and (b) reflects all of it. (\\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "(a) \\(F = \\dfrac{IA}{c} = \\dfrac{1200 \\times 0.5}{3 \\times 10^{8}} = 2 \\times 10^{-6}\\) N. Momentum in 600 s: \\(2 \\times 10^{-6} \\times 600 = 1.2 \\times 10^{-3}\\) kg m/s.",
          "(b) A reflector takes twice the momentum: \\(F = 4 \\times 10^{-6}\\) N and \\(2.4 \\times 10^{-3}\\) kg m/s.",
        ],
        answer: "(a) \\(2 \\times 10^{-6}\\) N, \\(1.2 \\times 10^{-3}\\) kg m/s; (b) \\(4 \\times 10^{-6}\\) N, \\(2.4 \\times 10^{-3}\\) kg m/s.",
      },
      selfCheckExample: {
        prompt:
          "A 90 W point source radiates equally in all directions. Find the radiation pressure on a perfectly absorbing surface 1 m away that faces the source. (\\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "\\(I = \\dfrac{90}{4\\pi \\times 1^{2}} \\approx 7.16\\) W/m².",
          "Absorber: pressure \\(= I/c = 7.16/(3 \\times 10^{8}) \\approx 2.39 \\times 10^{-8}\\) Pa.",
        ],
        answer: "About \\(2.39 \\times 10^{-8}\\) Pa.",
      },
      practiceSet: [
        { prompt: "How much momentum does 9 J of light carry? (\\(c = 3 \\times 10^{8}\\) m/s)", answer: "\\(3 \\times 10^{-8}\\) kg m/s" },
        { prompt: "Light of intensity 900 W/m² falls normally on a perfect mirror. Find the radiation pressure. (\\(c = 3 \\times 10^{8}\\) m/s)", answer: "\\(6 \\times 10^{-6}\\) Pa" },
        { prompt: "A perfectly absorbing plate of area 2 m² feels a force of \\(4 \\times 10^{-6}\\) N from light falling normally on it. Find the intensity. (\\(c = 3 \\times 10^{8}\\) m/s)", answer: "600 W/m²", method: "\\(I = Fc/A\\)." },
        { prompt: "A perfect mirror of area 0.2 m² faces sunlight of intensity 1.0 kW/m². Find the force on it. (\\(c = 3 \\times 10^{8}\\) m/s)", answer: "about \\(1.33 \\times 10^{-6}\\) N" },
      ],
      pyqExampleId: "a2d67511-3646-4c1a-8a59-b5f7adef1e46", // 2025: 450 W source, reflecting surface 2 m away
      traps: [
        {
          title: "A reflector feels twice the push",
          body: "Reflected light reverses its momentum, so a mirror receives 2U/c and feels a pressure 2I/c. Using I/c for a reflecting surface halves the answer.",
        },
        {
          title: "The exposure time does not change the force",
          body: "While light falls on a surface, the force on it is steady: pressure times area. A time given in the question matters only for the total momentum or energy delivered.",
        },
        {
          title: "Zero rest mass does not mean zero momentum",
          body: "A photon has no rest mass, but light still carries momentum U/c. That momentum is what produces radiation pressure.",
        },
        {
          title: "Use the area the light sees",
          body: "For a curved surface wrapped around a source, the sideways pushes cancel. The net force is the pressure times the flat area the surface presents to the light, not its full curved area.",
        },
      ],
    },
  ],
};
