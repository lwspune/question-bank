import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_CE_DRIFT_NOTE: SubtopicNote = {
  subtopicName: "Current, Drift and Resistivity",
  title: "Current, Drift and Resistivity",
  oneLineDefinition:
    "Current as a slow drift of free electrons, the link I = neAv between current and drift speed, resistivity and conductivity, and how resistance changes with temperature.",
  whyItMatters:
    "Seven NEET questions from 2021 to 2026. Two test the drift formulas (a match of four relations in 2021, a thinner wire carrying more current in Re-NEET 2024), two use resistivity (current density from a field in 2022, a colour code in 2023) and three use temperature: metals against semiconductors, a coefficient from two readings, and two resistors whose changes cancel.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphce-drift",
      name: "Current, drift velocity and current density",
      intuition:
        "Free electrons in a metal rush about at high speed in random directions, so on their own they carry no net charge anywhere. A field E gives each one a small push opposite to E between collisions. The result is a slow average drift, the drift velocity, laid on top of the random motion. The current through a wire is just how much charge this drift carries across a section each second.",
      definition:
        "- Current: \\(I = \\dfrac{\\Delta Q}{\\Delta t}\\). Current density: \\(J = \\dfrac{I}{A}\\), a vector along E.\n" +
        "- Drift velocity: \\(v_d = \\dfrac{eE\\tau}{m}\\), where \\(\\tau\\) is the relaxation time, the average time between collisions.\n" +
        "- Current and drift: \\(I = neAv_d\\), so \\(J = nev_d\\). Here n is the number of free electrons per unit volume.\n" +
        "- **Mobility** is drift speed per unit field: \\(\\mu = \\dfrac{v_d}{E} = \\dfrac{e\\tau}{m}\\).\n" +
        "- For one material n is fixed, so \\(I \\propto Av_d\\), and for a round wire \\(A \\propto d^{2}\\).",
      formula: {
        label: "Current and drift",
        latex: "I = neAv_d, \\qquad v_d = \\frac{eE\\tau}{m}, \\qquad J = nev_d = \\sigma E",
        symbols: [
          { symbol: "\\(n\\)", meaning: "free electrons per unit volume" },
          { symbol: "\\(\\tau\\)", meaning: "relaxation time" },
          { symbol: "\\(v_d\\)", meaning: "drift velocity" },
        ],
      },
      authoredExample: {
        prompt:
          "A wire carries a current I with drift velocity v. A second wire of the same material has twice the radius and carries 2I. What is its drift velocity?",
        steps: [
          "Same material, so n is the same: \\(v_d = \\dfrac{I}{neA}\\), that is \\(v_d \\propto \\dfrac{I}{r^{2}}\\).",
          "\\(\\dfrac{v'}{v} = \\dfrac{2I}{I} \\times \\dfrac{r^{2}}{(2r)^{2}} = 2 \\times \\dfrac{1}{4} = \\dfrac{1}{2}\\).",
        ],
        answer: "v/2",
      },
      selfCheckExample: {
        prompt:
          "The relaxation time of electrons in a metal halves when it is heated, with n unchanged. For the same field, what happens to the drift velocity?",
        steps: [
          "\\(v_d = \\dfrac{eE\\tau}{m}\\), so with E fixed \\(v_d \\propto \\tau\\).",
          "Halving \\(\\tau\\) halves the drift velocity.",
        ],
        answer: "It halves",
      },
      practiceSet: [
        { prompt: "Write the current density J in terms of n, e and the drift velocity.", answer: "\\(J = nev_d\\)" },
        { prompt: "What is the mobility of a charge carrier in terms of its drift velocity and the field?", answer: "\\(\\mu = v_d/E\\)" },
        { prompt: "A wire's current is doubled with nothing else changed. What happens to the drift velocity?", answer: "It doubles" },
        { prompt: "Two wires of one metal carry equal currents; one has half the diameter. Ratio of drift velocities, thin to thick?", answer: "4 : 1" },
      ],
      pyqExampleId: "d4134608-cdae-444a-ac8f-bf8d83819b89",
      traps: [
        {
          title: "Area goes as the diameter squared",
          body: "Halving a wire's diameter cuts its area to a quarter, so for the same current the drift velocity becomes four times, not two times.",
        },
        {
          title: "Drift is slow, the signal is not",
          body: "Drift velocity is only about a millimetre per second. A bulb lights at once because the field sets up along the whole wire almost instantly, not because electrons race from the switch.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphce-resistivity",
      name: "Resistance, resistivity and conductivity",
      intuition:
        "Resistance depends on the shape of a wire: longer means more resistance, thicker means less. Resistivity is the part that belongs to the material alone. A metal has a low resistivity because it has many free electrons and they travel a fair time between collisions. Conductivity is just the reverse of resistivity.",
      definition:
        "- \\(R = \\dfrac{\\rho L}{A}\\). Resistivity \\(\\rho\\) depends on the material and the temperature, not the size.\n" +
        "- From the drift picture: \\(\\rho = \\dfrac{m}{ne^{2}\\tau}\\). Conductivity \\(\\sigma = \\dfrac{1}{\\rho}\\).\n" +
        "- Ohm's law in point form: \\(J = \\sigma E\\), so \\(\\rho = \\dfrac{E}{J}\\).\n" +
        "- A wire stretched to n times its length keeps its volume, so its area falls to \\(\\dfrac{1}{n}\\) and \\(R' = n^{2}R\\).\n" +
        "- Carbon resistor colour code: the first two bands are digits, the third is the power of ten, the fourth the tolerance (gold 5%, silver 10%). Digits: black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, grey 8, white 9.",
      formula: {
        label: "Resistance",
        latex: "R = \\frac{\\rho L}{A}, \\qquad \\rho = \\frac{m}{ne^{2}\\tau} = \\frac{E}{J}, \\qquad R_{\\text{stretched}} = n^{2}R",
      },
      authoredExample: {
        prompt:
          "A wire of length 2 m and cross-section \\(10^{-6}\\ \\text{m}^{2}\\) has resistance 4 Ω. What is the current density in it when the field inside is 2 V/m?",
        steps: [
          "\\(\\rho = \\dfrac{RA}{L} = \\dfrac{4 \\times 10^{-6}}{2} = 2 \\times 10^{-6}\\ \\Omega\\,\\text{m}\\).",
          "\\(J = \\dfrac{E}{\\rho} = \\dfrac{2}{2 \\times 10^{-6}} = 10^{6}\\ \\text{A/m}^{2}\\).",
        ],
        answer: "\\(10^{6}\\ \\text{A/m}^{2}\\)",
      },
      selfCheckExample: {
        prompt: "A carbon resistor has the bands yellow, violet, red, gold. What are its resistance and tolerance?",
        steps: [
          "Yellow 4, violet 7: the digits are 47.",
          "Red is the multiplier \\(10^{2}\\): \\(47 \\times 100 = 4700\\ \\Omega\\).",
          "Gold means 5%.",
        ],
        answer: "4.7 kΩ ± 5%",
      },
      practiceSet: [
        { prompt: "A wire is stretched to twice its length. By what factor does its resistance change?", answer: "4 times" },
        { prompt: "Does the resistivity of a copper wire change if it is cut in half?", answer: "No; only its resistance halves" },
        { prompt: "Which colour band means the multiplier 10³?", answer: "Orange" },
        { prompt: "Write resistivity in terms of the field E and the current density J.", answer: "\\(\\rho = E/J\\)" },
      ],
      pyqExampleId: "000b3748-a1b6-4e16-98eb-099bb64c264e",
      traps: [
        {
          title: "Resistivity belongs to the material",
          body: "Cutting, stretching or bending a wire changes its resistance, never its resistivity. Only a change of material or temperature changes ρ.",
        },
        {
          title: "Stretching scales by n squared",
          body: "Stretching to n times the length also shrinks the area by n, because the volume stays the same. The resistance becomes \\(n^{2}R\\), not \\(nR\\).",
        },
        {
          title: "The third band is a multiplier",
          body: "In the colour code the third band is the number of zeros, not a third digit. 22000 Ω is red, red, orange.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphce-temperature",
      name: "Temperature dependence of resistance",
      intuition:
        "Heat a metal and its ions vibrate more, so electrons collide more often. The relaxation time falls and the resistance rises. A semiconductor behaves the other way: heat frees many more charge carriers, and that gain beats the extra collisions, so its resistance falls.",
      definition:
        "- Metals: \\(R_T = R_0\\left[1 + \\alpha(T - T_0)\\right]\\), with \\(\\alpha\\) positive. Then \\(\\alpha = \\dfrac{R_T - R_0}{R_0(T - T_0)}\\).\n" +
        "- Semiconductors and insulators: resistance falls as temperature rises (negative coefficient).\n" +
        "- Alloys such as nichrome and manganin: a very small \\(\\alpha\\), so their resistance hardly changes. They are used in standard resistors.\n" +
        "- Two resistors with equal and opposite small changes: in series the total stays the same to first order, in parallel the product \\(R_0^{2}(1 - \\alpha^{2}\\Delta T^{2})\\) shrinks.",
      formula: {
        label: "Temperature coefficient",
        latex: "R_T = R_0\\left[1 + \\alpha (T - T_0)\\right], \\qquad \\alpha = \\frac{R_T - R_0}{R_0 (T - T_0)}",
      },
      authoredExample: {
        prompt:
          "A copper coil has resistance 10 Ω at 0 °C and 12 Ω at 50 °C. Find its temperature coefficient of resistance.",
        steps: [
          "\\(\\alpha = \\dfrac{12 - 10}{10 \\times 50}\\).",
          "\\(\\alpha = \\dfrac{2}{500} = 4 \\times 10^{-3}\\ ^{\\circ}\\text{C}^{-1}\\).",
        ],
        answer: "\\(4 \\times 10^{-3}\\ ^{\\circ}\\text{C}^{-1}\\)",
      },
      selfCheckExample: {
        prompt:
          "A thermistor (a semiconductor) and a copper wire are both warmed. Which one's resistance falls, and why?",
        steps: [
          "In copper the number of free electrons is fixed; more collisions raise the resistance.",
          "In a semiconductor heating frees many more carriers, which outweighs the extra collisions.",
        ],
        answer: "The thermistor's: heating increases its number of charge carriers",
      },
      practiceSet: [
        { prompt: "Is the temperature coefficient of resistance of a metal positive or negative?", answer: "Positive" },
        { prompt: "Why is manganin used for standard resistors?", answer: "Its resistance changes very little with temperature" },
        { prompt: "A wire's resistance doubles between 0 °C and 100 °C. Find α.", answer: "\\(10^{-2}\\ ^{\\circ}\\text{C}^{-1}\\)" },
        { prompt: "What happens to the relaxation time of electrons in a metal as it is heated?", answer: "It decreases" },
      ],
      pyqExampleId: "0a3ed7e0-950a-4ae9-ad75-adb1e1a9ba1c",
      traps: [
        {
          title: "Divide by R at the reference temperature",
          body: "In \\(\\alpha = \\dfrac{R_T - R_0}{R_0\\,\\Delta T}\\) the denominator uses the resistance at the reference temperature, not the final one.",
        },
        {
          title: "Semiconductors go the other way",
          body: "Resistance rises with temperature for metals but falls for semiconductors. A statement that it rises or falls for both is false.",
        },
      ],
    },
  ],
};
