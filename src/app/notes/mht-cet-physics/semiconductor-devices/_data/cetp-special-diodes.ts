import type { SubtopicNote } from "@/app/notes/_types";

export const SPECIAL_DIODES_NOTE: SubtopicNote = {
  subtopicName: "Special Diodes — Zener, LED, Photodiode",
  title: "Special-Purpose Diodes: Zener, LED, Photodiode and Solar Cell",
  oneLineDefinition:
    "A Zener diode holds a fixed voltage in reverse breakdown and so regulates; an LED emits light in forward bias; a photodiode senses light in reverse bias; and a solar cell turns light into electrical energy with no bias at all.",
  whyItMatters:
    "14 PYQs, none HARD. Two shapes: the Zener regulator — current through the Zener, or the series resistor its power rating allows — " +
    "and matching each device to its bias and its job.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-zener",
      name: "The Zener Regulator",
      intuition:
        "In reverse breakdown a Zener's voltage stays fixed while its current changes, so a load in parallel with it sees a steady voltage. The series resistor drops whatever is left of the supply; the Zener takes whatever current the load does not.",
      definition:
        "- Operating region: the reverse breakdown part of the I–V curve.\n" +
        "- Load voltage \\(= V_Z\\). Series current \\(I_s = \\dfrac{V_{\\text{in}} - V_Z}{R_s}\\); load current \\(I_L = \\dfrac{V_Z}{R_L}\\); Zener current \\(I_Z = I_s - I_L\\).\n" +
        "- Power rating: \\(I_{Z,\\max} = \\dfrac{P}{V_Z}\\), so the least series resistance is \\(R_s = \\dfrac{V_{\\text{in}} - V_Z}{I_{Z,\\max}}\\).",
      formula: {
        label: "Zener current",
        latex: "I_Z = \\frac{V_{\\text{in}} - V_Z}{R_s} - \\frac{V_Z}{R_L}",
      },
      authoredExample: {
        prompt: "An 18 V supply feeds a 12 V Zener through \\(200\\,\\Omega\\); the load is \\(2\\,\\text{k}\\Omega\\). Current in the Zener?",
        steps: ["\\(I_s = \\dfrac{6}{200} = 30\\) mA; \\(I_L = \\dfrac{12}{2000} = 6\\) mA.", "\\(I_Z = 24\\) mA."],
        answer: "24 mA",
      },
      selfCheckExample: {
        prompt: "A 6 V Zener rated 1.2 W is run from a 10 V supply. Least series resistance?",
        steps: ["\\(I_{\\max} = \\dfrac{1.2}{6} = 0.2\\) A; \\(R_s = \\dfrac{4}{0.2} = 20\\,\\Omega\\)."],
        answer: "\\(20\\,\\Omega\\)",
      },
      practiceSet: [
        { prompt: "Which part of a Zener's I–V curve is used for regulation?", answer: "The reverse breakdown region" },
        { prompt: "12 V in, 5 V Zener of 2.0 W. Least series resistance?", answer: "\\(17.5\\,\\Omega\\)" },
      ],
      pyqExampleId: "7121560d-e0fd-44a8-abd5-6cf04dc3c3d2",
      traps: [
        {
          title: "Giving the Zener the whole series current",
          body:
            "The series current splits: the load takes \\(\\frac{V_Z}{R_L}\\) and only the rest flows in the Zener. 20 mA through the resistor with 15 mA in the load leaves 5 mA, not 20.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-optoelectronic",
      name: "LED, Photodiode and Solar Cell",
      intuition:
        "Light and a junction trade energy across the band gap. Forward-bias a junction and recombining carriers can give out photons — an LED. Shine photons on a reverse-biased junction and the extra carriers change a tiny current — a photodiode. Let the light drive current with no battery at all — a solar cell.",
      definition:
        "- LED: always FORWARD biased; brightness set by the current; energy-efficient, long-lived, colours do not fade.\n" +
        "- Photodiode: REVERSE biased; the reverse current depends on the minority carriers that light creates, so it rises with intensity.\n" +
        "- Solar cell: light into electrical energy (not the reverse); best band gap about 1.0–1.8 eV.\n" +
        "- A diode cannot AMPLIFY a signal — that takes a transistor.\n" +
        "- Photon energy and band gap: \\(E_g = \\dfrac{hc}{\\lambda}\\), \\(\\lambda\\) (nm) \\(\\approx \\dfrac{1240}{E_g\\,(\\text{eV})}\\).",
      formula: {
        label: "Band gap and wavelength",
        latex: "E_g = \\frac{hc}{\\lambda}, \\qquad \\lambda\\,(\\text{nm}) \\approx \\frac{1240}{E_g\\,(\\text{eV})}",
      },
      authoredExample: {
        prompt: "An LED has a band gap of 1.8 eV. Roughly what wavelength does it emit?",
        steps: ["\\(\\lambda \\approx \\dfrac{1240}{1.8} \\approx 690\\) nm — red."],
        answer: "≈ 690 nm",
      },
      selfCheckExample: {
        prompt: "Which bias does a photodiode need to measure light intensity, and which does an LED need to emit light?",
        steps: ["Photodiode reverse; LED forward."],
        answer: "Reverse; forward",
      },
      practiceSet: [
        { prompt: "What does a solar cell convert?", answer: "Light into electrical energy" },
        { prompt: "Can a p-n junction diode amplify an a.c. signal?", answer: "No" },
        { prompt: "Is 'the brightness of an LED cannot be controlled' true?", answer: "No — it is set by the current" },
      ],
      pyqExampleId: "4cf501b8-ca95-454d-97de-8481468e2935",
      traps: [
        {
          title: "Detecting light in forward bias",
          body:
            "In forward bias the large diffusion current hides the small change that light makes; a photodiode must be REVERSE biased, where the whole current is the light-made minority carriers.",
        },
      ],
    },
  ],
  related: [
    { label: "Diode Circuits and Rectifiers", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-diode-circuits" },
    { label: "Energy Bands and Doping", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-band-theory" },
  ],
};
