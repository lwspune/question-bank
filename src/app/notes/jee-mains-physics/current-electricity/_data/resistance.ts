import type { SubtopicNote } from "@/app/notes/_types";

export const RESISTANCE_CE_NOTE: SubtopicNote = {
  subtopicName: "Resistance, Resistivity and Temperature",
  title: "Resistance, Resistivity and Temperature",
  oneLineDefinition:
    "A conductor's resistance is R = ρl/A: the resistivity ρ belongs to the material and its temperature, while the length and area belong to the shape, so stretching changes R but never ρ.",
  whyItMatters:
    "Thirty-five PYQs, twenty-three of them multiple choice, and none yet from 2026. Twelve use R = ρl/A directly: hollow tubes, blocks, wires found from their mass and density, bundles of wires in parallel, and a colour-coded resistor. Eleven stretch, melt or redraw a wire, where the volume stays fixed and the resistance goes as the square of the length. Twelve are about temperature: α from two readings, the temperature of a hot element, and why standard resistors are made of alloys.",
  concepts: [
    // C1 — R = ρl/A
    {
      kind: "formula" as const,
      slug: "jpce-resistivity",
      name: "Resistivity and the shape of a conductor",
      intuition:
        "A longer conductor gives the charge more distance to push through, so R grows with length. A wider one gives it more lanes side by side, so R falls with area. What is left over, ρ, depends only on the material and its temperature. Cutting, bending or stretching a wire changes l and A, never ρ.",
      definition:
        "- \\(R = \\dfrac{\\rho l}{A}\\). Conductivity \\(\\sigma = 1/\\rho\\). The unit of \\(\\rho\\) is Ω m.\n" +
        "- l is the length along the current and A the area across it. For a block, check which pair of faces the current enters and leaves by.\n" +
        "- Hollow cylinder of inner radius \\(r_1\\) and outer radius \\(r_2\\): \\(A = \\pi(r_2^{2} - r_1^{2})\\). Halve the diameters first.\n" +
        "- Given mass m and density d instead of the area: the volume is \\(Al = m/d\\), so \\(R = \\dfrac{\\rho l^{2}}{m/d}\\).\n" +
        "- Wires of the same size in series or parallel: add the resistances as usual, then convert back to an effective \\(\\rho\\) or \\(\\sigma\\) if asked.\n" +
        "- Measuring \\(\\rho = \\dfrac{\\pi d^{2}V}{4Il}\\): \\(\\dfrac{\\Delta\\rho}{\\rho} = 2\\dfrac{\\Delta d}{d} + \\dfrac{\\Delta V}{V} + \\dfrac{\\Delta I}{I} + \\dfrac{\\Delta l}{l}\\).\n" +
        "- **Colour code** (read from the end where the bands are bunched): black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, grey 8, white 9. The first two bands are digits, the third is the power of ten, the fourth the tolerance: gold ±5%, silver ±10%, no band ±20%. Gold as a multiplier means × 0.1.",
      formula: {
        label: "Resistance from shape",
        latex: "R = \\frac{\\rho l}{A}, \\qquad A_{\\text{hollow}} = \\pi\\left(r_2^{2} - r_1^{2}\\right), \\qquad \\sigma = \\frac{1}{\\rho}",
      },
      authoredExample: {
        prompt:
          "A hollow tube is 6.28 m long, with inner diameter 2 mm and outer diameter 6 mm. Its resistivity is \\(3 \\times 10^{-8}\\ \\Omega\\,\\text{m}\\). Find its resistance along its length.",
        steps: [
          "Radii: \\(r_1 = 1\\) mm, \\(r_2 = 3\\) mm.",
          "\\(A = \\pi(3^{2} - 1^{2}) \\times 10^{-6} = 8\\pi \\times 10^{-6}\\ \\text{m}^{2}\\).",
          "\\(R = \\dfrac{3 \\times 10^{-8} \\times 6.28}{8\\pi \\times 10^{-6}}\\). Since \\(6.28 = 2\\pi\\), \\(R = \\dfrac{6 \\times 10^{-8}}{8 \\times 10^{-6}} = 7.5 \\times 10^{-3}\\ \\Omega\\).",
        ],
        answer: "\\(7.5 \\times 10^{-3}\\ \\Omega\\)",
      },
      selfCheckExample: {
        prompt:
          "A wire has mass 4.5 g, density \\(9 \\times 10^{3}\\ \\text{kg/m}^{3}\\) and resistivity \\(2 \\times 10^{-8}\\ \\Omega\\,\\text{m}\\). Its resistance is 4 Ω. Find its length.",
        steps: [
          "Volume \\(= m/d = \\dfrac{4.5 \\times 10^{-3}}{9 \\times 10^{3}} = 5 \\times 10^{-7}\\ \\text{m}^{3}\\).",
          "\\(R = \\dfrac{\\rho l}{A} = \\dfrac{\\rho l^{2}}{\\text{volume}}\\), so \\(l^{2} = \\dfrac{4 \\times 5 \\times 10^{-7}}{2 \\times 10^{-8}} = 100\\).",
          "\\(l = 10\\) m.",
        ],
        answer: "10 m",
      },
      practiceSet: [
        { prompt: "A carbon resistor has bands yellow, violet, orange, gold. Its value?", answer: "47 kΩ ± 5%" },
        { prompt: "A block 2 cm × 2 cm × 50 cm has \\(\\rho = 4 \\times 10^{-6}\\ \\Omega\\,\\text{m}\\). Resistance between its two square ends?", answer: "\\(5 \\times 10^{-3}\\ \\Omega\\)" },
        { prompt: "\\(\\rho = 2.5 \\times 10^{-8}\\ \\Omega\\,\\text{m}\\). Conductivity?", answer: "\\(4 \\times 10^{7}\\) S/m" },
        { prompt: "In \\(\\rho = \\pi d^{2}V/(4Il)\\), d has a 1% error, V 1%, I 0.5% and l 0.5%. Error in ρ?", answer: "4%" },
      ],
      pyqExampleId: "e6fb0576-231c-4bf7-be62-539f57ca9885", // 2023: hollow cylinder, 3.14 m, diameters 4 mm and 8 mm
      traps: [
        {
          title: "Radius, not diameter",
          body: "Questions give diameters. The area uses radii, so halve them first; using the diameter makes the area four times too large.",
        },
        {
          title: "Resistivity does not change with shape",
          body: "Doubling the length doubles R but leaves ρ alone. ρ changes only with the material and the temperature.",
        },
        {
          title: "Which faces?",
          body: "For a block, the current's length is the distance between the two faces it enters and leaves by, and A is the area of those faces. Swapping the two gives an answer off by a large factor.",
        },
      ],
    },

    // C2 — stretching and redrawing
    {
      kind: "formula" as const,
      slug: "jpce-stretching",
      name: "Stretching, melting and redrawing a wire",
      intuition:
        "When a wire is stretched, its volume stays the same: it gets longer and thinner at once. Both changes raise R, so R grows as the square of the length. A thinner radius hurts twice over in the same way: R goes as one over the fourth power of the radius.",
      definition:
        "- Constant volume: \\(Al\\) is fixed, so \\(R = \\dfrac{\\rho l^{2}}{\\text{volume}} \\propto l^{2}\\).\n" +
        "- Length becomes n times: \\(R' = n^{2}R\\). Radius becomes \\(r/k\\): area falls by \\(k^{2}\\), length grows by \\(k^{2}\\), so \\(R' = k^{4}R\\).\n" +
        "- Melted and redrawn to \\(1/n\\) of the length: \\(R' = R/n^{2}\\).\n" +
        "- Small stretches: \\(\\dfrac{\\Delta R}{R} \\approx 2\\dfrac{\\Delta l}{l}\\). For larger ones use the square exactly: a 10% stretch gives \\(1.1^{2} = 1.21\\), a 21% rise.\n" +
        "- If length and area change independently (not at constant volume), use \\(R' = R\\dfrac{l'/l}{A'/A}\\).\n" +
        "- Two wires of the same material and the same mass: \\(R \\propto 1/r^{4}\\).\n" +
        "- Wording: \"increased BY twice its length\" means the new length is 3l; \"increased TO twice\" means 2l.",
      formula: {
        label: "Constant-volume stretching",
        latex: "R' = n^{2}R \\ (\\text{length} \\times n), \\qquad R \\propto \\frac{1}{r^{4}}, \\qquad \\frac{\\Delta R}{R} \\approx 2\\frac{\\Delta l}{l}",
      },
      authoredExample: {
        prompt:
          "A 6 Ω wire is stretched so its length rises by 10%. Find the new resistance and the percentage rise. Compare with the small-change estimate.",
        steps: [
          "New length \\(= 1.1l\\), so \\(R' = 1.1^{2} \\times 6 = 1.21 \\times 6 = 7.26\\ \\Omega\\).",
          "Rise \\(= 21\\%\\).",
          "The estimate \\(2 \\times 10\\% = 20\\%\\) is close but not exact, because the change is not small.",
        ],
        answer: "7.26 Ω, a 21% rise (the estimate gives 20%)",
      },
      selfCheckExample: {
        prompt:
          "Two wires of the same material have the same mass. Their radii are 1 mm and 3 mm. The thicker wire has resistance 0.5 Ω. Find the resistance of the thinner one.",
        steps: [
          "Same mass and material means the same volume, so \\(R \\propto 1/r^{4}\\).",
          "\\(R_{\\text{thin}} = 0.5 \\times 3^{4} = 0.5 \\times 81 = 40.5\\ \\Omega\\).",
        ],
        answer: "40.5 Ω",
      },
      practiceSet: [
        { prompt: "A wire is stretched to 4 times its length. New resistance?", answer: "16R" },
        { prompt: "A wire is stretched so its length rises by 0.2%. Change in resistance?", answer: "About +0.4%" },
        { prompt: "Length rises by 50% and area falls by 25% (not at constant volume). Change in resistance?", answer: "It doubles: +100%" },
        { prompt: "A 12 Ω wire is melted and drawn into a wire of half the length. New resistance?", answer: "3 Ω" },
      ],
      pyqExampleId: "82df97ec-3510-4fd3-a971-b9fb80e2c184", // 2023: copper wire stretched by 20%, % rise in R
      traps: [
        {
          title: "R goes as n², not n",
          body: "Stretching to n times the length also thins the wire n times in area. Scaling R by n alone is the most common wrong option.",
        },
        {
          title: "2Δl/l is only for small changes",
          body: "For a 0.5% stretch, 2Δl/l is fine. For 20% or more, square the factor exactly; the estimate misses by several per cent.",
        },
        {
          title: "\"By twice\" is three times",
          body: "A length increased by twice its value is 3l, not 2l. Read the wording before squaring.",
        },
      ],
    },

    // C3 — temperature
    {
      kind: "formula" as const,
      slug: "jpce-temperature",
      name: "Resistance and temperature",
      intuition:
        "Heating a metal makes its ions vibrate more, so electrons collide more often and resistance rises. For a metal the rise is close to a straight line in temperature, set by the coefficient α. Semiconductors go the other way: heat frees more carriers, so their resistance falls and α is negative. Alloys such as manganin and constantan barely change at all, which is why standard resistors are made from them.",
      definition:
        "- \\(R_T = R_0(1 + \\alpha\\,\\Delta T)\\), with \\(R_0\\) usually the resistance at 0 °C. A change of 1 °C equals a change of 1 K.\n" +
        "- \\(\\alpha\\) from two readings with \\(R_0\\) at 0 °C: \\(R_1 = R_0(1 + \\alpha t_1)\\), \\(R_2 = R_0(1 + \\alpha t_2)\\), so \\(\\alpha = \\dfrac{R_2 - R_1}{R_1t_2 - R_2t_1}\\). If neither reading is at 0 °C, say which temperature is the reference; the answer depends on it.\n" +
        "- Platinum thermometer: \\(t = \\dfrac{R_t - R_0}{R_{100} - R_0} \\times 100\\) °C.\n" +
        "- At a fixed voltage the current falls as R rises: \\(I_0R_0 = I_TR_T\\).\n" +
        "- Metals: \\(\\alpha > 0\\). Semiconductors: \\(\\alpha < 0\\). Manganin and constantan: high \\(\\rho\\), very small \\(\\alpha\\), so they are used for standard resistors.\n" +
        "- Convert to kelvin only at the end, by adding 273.",
      formula: {
        label: "Temperature dependence",
        latex: "R_T = R_0\\left(1 + \\alpha\\,\\Delta T\\right), \\qquad t = \\frac{R_t - R_0}{R_{100} - R_0} \\times 100\\ ^{\\circ}\\text{C}",
      },
      authoredExample: {
        prompt:
          "A wire has resistance 20 Ω at 0 °C and 20.8 Ω at 100 °C. At what temperature is its resistance 21.4 Ω? Give the answer in kelvin too.",
        steps: [
          "\\(\\alpha = \\dfrac{0.8}{20 \\times 100} = 4 \\times 10^{-4}\\ ^{\\circ}\\text{C}^{-1}\\).",
          "\\(21.4 = 20(1 + 4 \\times 10^{-4}\\,t)\\), so \\(4 \\times 10^{-4}\\,t = 0.07\\) and \\(t = 175\\) °C.",
          "In kelvin: \\(175 + 273 = 448\\) K.",
        ],
        answer: "175 °C, that is 448 K",
      },
      selfCheckExample: {
        prompt:
          "A heating element has resistance 40 Ω at 20 °C and \\(\\alpha = 5 \\times 10^{-4}\\ ^{\\circ}\\text{C}^{-1}\\). On a 220 V supply, its current settles at 5 A. Taking 20 °C as the reference, find its working temperature.",
        steps: [
          "Hot resistance: \\(R = 220/5 = 44\\ \\Omega\\).",
          "\\(44 = 40(1 + 5 \\times 10^{-4}\\,\\Delta T)\\), so \\(5 \\times 10^{-4}\\,\\Delta T = 0.1\\) and \\(\\Delta T = 200\\) °C.",
          "Working temperature \\(= 20 + 200 = 220\\) °C.",
        ],
        answer: "220 °C",
      },
      practiceSet: [
        { prompt: "\\(R_0 = 5\\ \\Omega\\), \\(\\alpha = 4 \\times 10^{-3}\\ ^{\\circ}\\text{C}^{-1}\\). Resistance at 50 °C?", answer: "6 Ω" },
        { prompt: "A platinum thermometer reads 4 Ω at 0 °C, 5 Ω at 100 °C and 5.6 Ω in a bath. Bath temperature?", answer: "160 °C" },
        { prompt: "Which has a negative temperature coefficient: copper, manganin or silicon?", answer: "Silicon" },
        { prompt: "At a fixed voltage a conductor carries 4 A at 0 °C and 3.2 A at 100 °C. Find α.", answer: "\\(2.5 \\times 10^{-3}\\ ^{\\circ}\\text{C}^{-1}\\)" },
      ],
      pyqExampleId: "dae01efc-a851-4e40-92e6-074145f1bfc1", // 2024: 10 Ω, 10.2 Ω and 10.95 Ω at 0 °C, 100 °C and t; t in kelvin
      traps: [
        {
          title: "Know the reference temperature",
          body: "α is defined with R₀ at 0 °C. If the readings are at 10 °C and 30 °C, taking the 10 °C value as R₀ gives a slightly different α, and the options are often built on one choice or the other.",
        },
        {
          title: "Kelvin at the end",
          body: "A temperature change is the same in °C and K, so work in °C and add 273 only when the answer is asked in kelvin.",
        },
        {
          title: "A hotter wire draws less current",
          body: "At a fixed voltage, a rise in R means a fall in current. Treating the current as fixed and the voltage as changing inverts the ratio.",
        },
      ],
    },
  ],
};
