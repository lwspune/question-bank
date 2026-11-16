import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_SE_DEVICES_NOTE: SubtopicNote = {
  subtopicName: "Rectifiers and Special Diodes",
  title: "Rectifiers and Special Diodes",
  oneLineDefinition:
    "How one or two diodes turn ac into dc, how a capacitor smooths the output, the Zener diode as a voltage regulator, and the LED, photodiode and solar cell.",
  whyItMatters:
    "Eight NEET questions from 2022 to 2026, five of them from 2024 or later. Four are about rectifiers: the output frequency of a half-wave rectifier, the part that removes the ripple, which diode conducts at a given instant, and the voltage across a diode. Two are about the Zener diode (one of them also about photovoltaic devices) and two about the solar cell and its I-V curve.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphse-rectifier",
      name: "Half-wave and full-wave rectifiers",
      intuition:
        "A diode lets current through one way only, so it can turn alternating current into current that flows one way. With one diode, only one half of each cycle gets through: a half-wave rectifier. With two diodes and a centre-tapped transformer, one diode conducts in each half, and both halves push current the same way through the load: a full-wave rectifier. The output still rises and falls, so a capacitor across the load is used to smooth it.",
      definition:
        "- **Half-wave:** one diode. The load gets a pulse in one half cycle and nothing in the other. The output pulses at the **same frequency** as the input.\n" +
        "- **Full-wave:** a centre-tapped transformer and two diodes. One diode conducts in the positive half, the other in the negative half, and the current through the load is in the same direction both times. The output pulses at **twice** the input frequency.\n" +
        "- **Filter:** a capacitor across the load removes the ac ripple. It charges to the peak voltage and discharges slowly through the load, so the output is nearly steady dc.\n" +
        "- For \\(V = V_m\\sin\\omega t\\), the period is \\(T = \\dfrac{2\\pi}{\\omega}\\). The positive half cycle runs from 0 to \\(T/2\\), the negative half from \\(T/2\\) to T.\n" +
        "- Peak and rms: \\(V_m = \\sqrt{2}\\,V_{\\text{rms}}\\).\n" +
        "- In a half-wave rectifier the input voltage appears across the diode in the half cycle when it is reverse biased; while it conducts, an ideal diode has no voltage across it.",
      formula: {
        label: "Rectifier output",
        latex: "f_{\\text{half-wave}} = f, \\qquad f_{\\text{full-wave}} = 2f, \\qquad T = \\frac{2\\pi}{\\omega}, \\qquad V_m = \\sqrt{2}\\,V_{\\text{rms}}",
        symbols: [
          { symbol: "\\(f\\)", meaning: "frequency of the ac input" },
          { symbol: "\\(V_m\\)", meaning: "peak voltage" },
        ],
      },
      authoredExample: {
        prompt:
          "The input to a full-wave rectifier is \\(V = 200\\sin(100\\pi t)\\) volt. What is the frequency of the output, and is the input in its positive or negative half cycle at t = 4 ms?",
        steps: [
          "\\(\\omega = 100\\pi\\), so \\(f = \\dfrac{\\omega}{2\\pi} = 50\\) Hz. A full-wave output pulses at \\(2f = 100\\) Hz.",
          "\\(T = \\dfrac{1}{50}\\) s \\(= 20\\) ms, so the positive half cycle runs from 0 to 10 ms.",
          "4 ms lies inside it: the input is in its positive half cycle.",
        ],
        answer: "100 Hz; the positive half cycle",
      },
      selfCheckExample: {
        prompt:
          "A 230 V (rms) ac supply charges a capacitor through a single diode, with no load across the capacitor. To what voltage does the capacitor charge?",
        steps: [
          "With nothing to discharge it, the capacitor charges to the peak of the supply.",
          "\\(V_m = \\sqrt{2} \\times 230 \\approx 325\\) V.",
        ],
        answer: "About 325 V",
      },
      practiceSet: [
        { prompt: "How many diodes does a centre-tapped full-wave rectifier use?", answer: "Two" },
        { prompt: "Which component, joined across the load, removes the ac ripple from a rectifier's output?", answer: "A capacitor (the filter)" },
        { prompt: "The input to a rectifier is \\(V = 50\\sin(100\\pi t)\\) volt. What is its period?", answer: "20 ms" },
        { prompt: "In a full-wave rectifier, does the current through the load reverse direction in the second half cycle?", answer: "No, it flows the same way in both halves" },
      ],
      pyqExampleId: "9d46adb7-d4c8-49a9-9797-8fc295c2a183",
      traps: [
        {
          title: "Only full-wave doubles the frequency",
          body: "A half-wave rectifier gives one pulse per cycle, so its output frequency equals the input frequency, not half of it. A full-wave rectifier gives two pulses per cycle, so twice the input frequency.",
        },
        {
          title: "Find the half cycle from the period",
          body: "To say which diode conducts at an instant t, work out \\(T = 2\\pi/\\omega\\) first and compare t with \\(T/2\\). With \\(\\omega = 100\\pi\\), T is 20 ms, so the negative half runs from 10 ms to 20 ms.",
        },
        {
          title: "A filter charges to the peak, not the rms",
          body: "A capacitor on a 220 V (rms) supply charges to about 311 V, the peak value \\(\\sqrt{2} \\times 220\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphse-zener",
      name: "The Zener diode as a voltage regulator",
      intuition:
        "A Zener diode is heavily doped on both sides, so its depletion layer is thin and the field across it is strong. In reverse bias it breaks down at a fixed voltage \\(V_Z\\), and after that the current through it can change a lot while the voltage across it stays at \\(V_Z\\). Put it in reverse bias across a load, with a resistor in series with the supply, and the load always gets \\(V_Z\\): the resistor takes up whatever voltage is extra.",
      definition:
        "- Both the p and n sides are **heavily doped**. A Zener is used in **reverse bias**, in the breakdown region.\n" +
        "- **Regulator:** supply \\(V_{in}\\), then a series resistor \\(R_S\\), then the Zener (reverse biased) in parallel with the load \\(R_L\\). The load voltage is \\(V_Z\\).\n" +
        "- Current in the series resistor: \\(I_S = \\dfrac{V_{in} - V_Z}{R_S}\\). Load current: \\(I_L = \\dfrac{V_Z}{R_L}\\). Zener current: \\(I_Z = I_S - I_L\\).\n" +
        "- If the input rises, the extra voltage drops across \\(R_S\\) and the Zener current rises; the output stays at \\(V_Z\\).\n" +
        "- Forward biased, a Zener behaves like an ordinary diode.",
      formula: {
        label: "Zener regulator",
        latex: "V_L = V_Z, \\qquad I_S = \\frac{V_{in} - V_Z}{R_S}, \\qquad I_Z = I_S - \\frac{V_Z}{R_L}",
        symbols: [
          { symbol: "\\(V_Z\\)", meaning: "Zener (breakdown) voltage" },
          { symbol: "\\(R_S\\)", meaning: "series resistor" },
          { symbol: "\\(R_L\\)", meaning: "load resistor" },
        ],
      },
      authoredExample: {
        prompt:
          "A 6 V Zener regulator has a 100 Ω series resistor and a 600 Ω load, and runs on a 10 V supply. Find the current through the Zener.",
        steps: [
          "\\(I_S = \\dfrac{10 - 6}{100} = 0.04\\) A \\(= 40\\) mA.",
          "\\(I_L = \\dfrac{6}{600} = 0.01\\) A \\(= 10\\) mA.",
          "\\(I_Z = I_S - I_L = 40 - 10 = 30\\) mA.",
        ],
        answer: "30 mA",
      },
      selfCheckExample: {
        prompt:
          "A 5 V Zener diode is reverse biased in series with a resistor across a 12 V supply, with no load. What is the voltage across the resistor?",
        steps: [
          "In breakdown the Zener holds 5 V across itself.",
          "The resistor takes the rest: \\(12 - 5 = 7\\) V.",
        ],
        answer: "7 V",
      },
      practiceSet: [
        { prompt: "How are the p and n sides of a Zener diode doped?", answer: "Both heavily" },
        { prompt: "A 9 V Zener regulator drives a 900 Ω load. What is the load current?", answer: "10 mA" },
        { prompt: "The supply to a 6 V Zener regulator rises from 10 V to 12 V. What is the voltage across the load now?", answer: "Still 6 V" },
        { prompt: "A 4 V Zener regulator has a 200 Ω series resistor on a 10 V supply. What is the current in the series resistor?", answer: "30 mA" },
      ],
      pyqExampleId: "2ddd4f2a-bf8e-4375-9d11-86ff09e2d424",
      traps: [
        {
          title: "The Zener takes what the load does not",
          body: "The current in the series resistor splits between the Zener and the load. The Zener current is \\(I_S - I_L\\), not \\(I_S\\).",
        },
        {
          title: "A change in supply lands on the resistor",
          body: "When the supply voltage changes, the voltage across the series resistor changes and the load voltage stays at \\(V_Z\\). Only the currents change.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nphse-optoelectronic",
      name: "LED, photodiode and solar cell",
      intuition:
        "These junction diodes work with light. In an LED, forward bias pushes electrons and holes together; when they recombine, the energy comes out as light. In a photodiode and a solar cell it goes the other way: light falling on the junction makes electron-hole pairs. Which bias each device needs follows from what it is for.",
      definition:
        "- Photon energy and wavelength: \\(E\\,(\\text{eV}) = \\dfrac{1240}{\\lambda\\,(\\text{nm})}\\).\n" +
        "- **LED:** heavily doped and forward biased. The light has a photon energy close to the band gap; visible light (about 1.8 eV to 3 eV) needs a gap of at least about 1.8 eV. Compared with a filament bulb, an LED works at low voltage and low power, needs no warm-up time, switches on and off fast, and has a long life.\n" +
        "- **Photodiode:** reverse biased. Light with photon energy above the band gap makes electron-hole pairs. The reverse current is small, so this changes it by a large fraction, which is why a photodiode measures light intensity in reverse bias.\n" +
        "- **Solar cell:** no external bias. Light makes an emf (photovoltaic action), and the cell drives current through a load. Its I-V curve is drawn in the fourth quadrant. Semiconductors with a band gap near 1.5 eV, such as Si and GaAs, are the best materials.",
      table: {
        columns: ["Device", "Bias in use", "What it does", "Key fact"],
        rows: [
          { cells: ["Zener diode", "reverse, at breakdown", "holds the voltage across it constant", "both sides heavily doped"] },
          { cells: ["LED", "forward", "gives out light when electrons and holes recombine", "photon energy close to the band gap"] },
          { cells: ["Photodiode", "reverse", "light makes electron-hole pairs and raises the reverse current", "used to measure light intensity"] },
          {
            cells: ["Solar cell", "no external bias", "turns light into electricity", "I-V curve in the fourth quadrant; band gap near 1.5 eV"],
            pyqExampleId: "41f16730-f276-4e34-8608-50593a3a31eb",
            noteAmber: "Re-NEET 2024: an I-V curve lying in the fourth quadrant was to be named, and it was the solar cell's.",
          },
        ],
        caption: "The LED is the only one used in forward bias; the Zener and the photodiode work in reverse, and the solar cell needs no battery at all.",
      },
      selfCheckExample: {
        prompt: "An LED gives out light of wavelength 620 nm. Roughly what is the band gap of its semiconductor?",
        steps: [
          "\\(E_g \\approx \\dfrac{1240}{\\lambda\\,(\\text{nm})} = \\dfrac{1240}{620}\\).",
          "\\(E_g \\approx 2.0\\) eV.",
        ],
        answer: "About 2.0 eV",
      },
      practiceSet: [
        { prompt: "Which of these works with no external bias: an LED, a photodiode or a solar cell?", answer: "The solar cell" },
        { prompt: "In which bias is a photodiode used to measure light intensity?", answer: "Reverse bias" },
        { prompt: "Give two advantages of an LED over a filament bulb.", answer: "Any two of: low power, long life, no warm-up time, fast switching" },
        { prompt: "A photodiode's material has a band gap of 2.48 eV. What is the longest wavelength it can detect?", answer: "500 nm" },
      ],
      pyqExampleId: "f10b9392-a1fc-4020-9f1d-2733795897f0",
      traps: [
        {
          title: "A photodiode works in reverse bias",
          body: "In forward bias a photodiode carries a large majority current that light hardly changes. In reverse bias the current is tiny, so the extra carriers made by light change it by a large fraction.",
        },
        {
          title: "Use 1240 with energies in eV",
          body: "λ in nm is 1240 divided by the energy in eV. Putting an energy in joules into 1240 gives nonsense; with joules, use \\(\\lambda = hc/E\\).",
        },
      ],
    },
  ],
};
