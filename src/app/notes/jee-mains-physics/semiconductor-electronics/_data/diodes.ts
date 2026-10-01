import type { SubtopicNote } from "@/app/notes/_types";

export const DIODES_SEMI_NOTE: SubtopicNote = {
  subtopicName: "Diode Circuits and Rectifiers",
  title: "Diode Circuits and Rectifiers",
  oneLineDefinition:
    "Decide first which way each diode is biased; then a conducting diode is a wire (or a fixed small drop) and a blocking one is a break, and the rest is an ordinary circuit.",
  whyItMatters:
    "Twenty-two PYQs, seventeen of them multiple choice, and four from 2026. Ten are resistor networks with ideal diodes, or diodes with a stated forward resistance, where the answer turns on which diodes conduct. Six give each diode a fixed voltage drop, including LEDs. Six are about rectifiers, filters and the output waveform. Nearly every one comes with a circuit figure, and the first step is always the same: read the battery's polarity and each diode's direction.",
  concepts: [
    // C1 — ideal diodes in networks
    {
      kind: "formula" as const,
      slug: "jpsemi-diode-networks",
      name: "Ideal diodes in resistor networks",
      intuition:
        "An ideal diode is a one-way switch. Pointing from higher potential to lower, it is closed and acts as a plain wire. Pointing the other way, it is open, and its whole branch carries no current. So a diode network is solved in two passes: first decide each diode's state from the battery, then redraw the circuit without the open branches and solve it with series and parallel rules.",
      definition:
        "- **Ideal diode:** forward biased, zero resistance; reverse biased, infinite resistance (an open branch).\n" +
        "- A battery's **long plate** is its positive terminal. Mark the higher-potential end before looking at any diode.\n" +
        "- A diode conducts when its arrow points from the higher potential towards the lower one.\n" +
        "- Delete every branch that holds a reverse-biased diode, then combine the rest.\n" +
        "- A diode with a **forward resistance** \\(r_f\\) adds \\(r_f\\) in series in its own branch.\n" +
        "- A conducting ideal diode connected straight across a resistor shorts that resistor.\n" +
        "- Two diodes in parallel facing opposite ways (antiparallel): one of them always conducts, whichever way the current goes.",
      formula: {
        label: "A diode as a switch",
        latex: "\\text{forward: } R_D = r_f\\ \\ (0 \\text{ if ideal}), \\qquad \\text{reverse: } R_D \\to \\infty",
      },
      authoredExample: {
        prompt:
          "A 12 V battery drives three branches in parallel: a 4 Ω resistor with a diode whose arrow points from the positive side to the negative side, a 12 Ω resistor with a diode pointing the opposite way, and a plain 6 Ω resistor. The diodes are ideal. Find the current from the battery.",
        steps: [
          "The 4 Ω branch's diode points from high to low potential: it conducts, a wire.",
          "The 12 Ω branch's diode points the other way: it blocks, so that branch is open.",
          "Remaining: 4 Ω in parallel with 6 Ω, \\(R = \\dfrac{4 \\times 6}{4 + 6} = 2.4\\ \\Omega\\).",
          "\\(I = \\dfrac{12}{2.4} = 5\\) A.",
        ],
        answer: "5 A",
      },
      selfCheckExample: {
        prompt:
          "Two branches in parallel each hold a 40 Ω resistor and a diode, both diodes pointing the same way, each with forward resistance 10 Ω and infinite reverse resistance. A 20 Ω resistor is in series with the pair, and a 9 V battery forward biases both diodes. Find the battery current. What is it if the battery is reversed?",
        steps: [
          "Each conducting branch: \\(40 + 10 = 50\\ \\Omega\\). Two in parallel: \\(25\\ \\Omega\\).",
          "Total \\(25 + 20 = 45\\ \\Omega\\), so \\(I = \\dfrac{9}{45} = 0.2\\) A.",
          "Reversed, both diodes block and no current flows.",
        ],
        answer: "0.2 A; zero when reversed.",
      },
      practiceSet: [
        { prompt: "A diode with forward resistance 20 Ω and an 80 Ω resistor are in series across 5 V, forward biased. Current?", answer: "50 mA" },
        { prompt: "A conducting ideal diode is connected directly across a 30 Ω resistor. Resistance of the pair?", answer: "Zero (the resistor is shorted)" },
        { prompt: "Two ideal diodes face opposite ways in parallel, each with its own 100 Ω resistor, across a 3 V battery. Current from the battery?", answer: "30 mA, whichever way the battery is connected" },
        { prompt: "Which plate of a battery symbol is the positive terminal?", answer: "The long plate" },
      ],
      pyqExampleId: "6357d2d4-35c3-4456-afeb-c1aaeea874de", // 2024: −6 V to −8 V, 15 ∥ 10 Ω = 6 Ω
      traps: [
        {
          title: "A blocked branch is gone, resistor and all",
          body: "A reverse-biased ideal diode carries no current, so the resistor in series with it carries none either. Leaving that resistor in the parallel combination gives a wrong, smaller resistance.",
        },
        {
          title: "Read the battery before the diodes",
          body: "The long plate is positive. Reading the battery the wrong way round flips every diode's state at once and gives an answer that is usually among the options.",
        },
        {
          title: "Forward resistance goes in series",
          body: "When a diode has a forward resistance r_f, add it to the resistor in its own branch before combining branches. It is not a separate parallel path.",
        },
      ],
    },

    // C2 — fixed forward drops
    {
      kind: "formula" as const,
      slug: "jpsemi-diode-drops",
      name: "Diodes with a fixed forward voltage drop",
      intuition:
        "A real diode needs a small voltage across it before it conducts, and once it conducts that voltage hardly changes. So treat a conducting diode as a small fixed battery opposing the current: subtract its drop from the supply, and divide what is left by the resistance. Below its cut-in voltage it does not conduct at all.",
      definition:
        "- Usual drops: about 0.7 V for silicon and 0.3 V for germanium, unless the question states a cut-in value.\n" +
        "- In a series loop: \\(I = \\dfrac{V - \\sum V_D}{\\sum R}\\). The drops of all conducting diodes are subtracted.\n" +
        "- If the supply is below the cut-in voltage, the diode is off and the current is zero.\n" +
        "- Identical diodes in parallel share the current equally.\n" +
        "- An LED also has a fixed drop. From its power rating at a given current, \\(V_{\\text{LED}} = P/I\\); the series resistor is then \\(R_S = (V - V_{\\text{LED}})/I\\).\n" +
        "- An LED in series with a Zener diode lights only when the supply exceeds \\(V_{\\text{LED}} + V_Z\\).",
      formula: {
        label: "Current with fixed diode drops",
        latex: "I = \\frac{V - \\sum V_D}{\\sum R}, \\qquad V_{\\text{LED}} = \\frac{P}{I}, \\qquad R_S = \\frac{V - V_{\\text{LED}}}{I}",
      },
      authoredExample: {
        prompt:
          "A 9 V supply drives a silicon diode (drop 0.7 V), a red LED (drop 2.0 V) and a 630 Ω resistor, all in series and forward biased. Find the current and the voltage across the resistor.",
        steps: [
          "Total drop across the diodes: \\(0.7 + 2.0 = 2.7\\) V.",
          "Voltage left for the resistor: \\(9 - 2.7 = 6.3\\) V.",
          "\\(I = \\dfrac{6.3}{630} = 0.01\\) A \\(= 10\\) mA.",
        ],
        answer: "10 mA; 6.3 V across the resistor.",
      },
      selfCheckExample: {
        prompt:
          "An LED is rated 6 mW and must carry 3 mA. It is run from a 5 V supply through a series resistor. Find the voltage across the LED and the resistor needed.",
        steps: [
          "\\(V_{\\text{LED}} = \\dfrac{P}{I} = \\dfrac{6 \\times 10^{-3}}{3 \\times 10^{-3}} = 2\\) V.",
          "\\(R_S = \\dfrac{5 - 2}{3 \\times 10^{-3}} = 1000\\ \\Omega\\).",
        ],
        answer: "2 V; 1 kΩ.",
      },
      practiceSet: [
        { prompt: "Two identical silicon diodes in parallel carry 24 mA in total. Current in each?", answer: "12 mA" },
        { prompt: "A germanium diode (0.3 V) and a 1 kΩ resistor are in series across 3.3 V, forward biased. Current?", answer: "3 mA" },
        { prompt: "A diode with cut-in voltage 0.6 V and a 100 Ω resistor are in series across 0.5 V. Current?", answer: "Zero: the diode does not conduct" },
        { prompt: "A 2 V LED is in series with a 5 V Zener diode. Least supply voltage for the LED to light?", answer: "Just over 7 V" },
      ],
      pyqExampleId: "01f4e2e1-3f59-47a2-a679-48a313541876", // 2024: Ge + Si in series, 15 V, 8.75 V across R_L
      traps: [
        {
          title: "Subtract every conducting diode's drop",
          body: "Two diodes in series take two drops out of the supply. Subtracting only one, or none, gives a current that is too large.",
        },
        {
          title: "Germanium and silicon differ",
          body: "Silicon drops about 0.7 V and germanium about 0.3 V. A circuit with one of each loses 1.0 V, not 1.4 V or 0.6 V.",
        },
        {
          title: "Below cut-in there is no current",
          body: "A drop is not a resistance. If the supply is smaller than the cut-in voltage, the diode is off and the current is zero, not a small value from Ohm's law.",
        },
      ],
    },

    // C3 — rectifiers, filters and clipping
    {
      kind: "formula" as const,
      slug: "jpsemi-rectifiers",
      name: "Rectifiers, filters and clipping",
      intuition:
        "A rectifier uses a diode's one-way action on alternating voltage. One diode passes only one half of each cycle (half-wave); two or four diodes arranged right pass both halves the same way round (full-wave). The output is still bumpy, so a filter smooths it. A diode in series with a cell lets through only the part of the wave that rises above the cell's voltage.",
      definition:
        "- **Half-wave:** one diode; one pulse per cycle, so the output repeats at the input frequency \\(f\\).\n" +
        "- **Full-wave** (centre-tap with two diodes, or a bridge of four): two pulses per cycle, ripple frequency \\(2f\\). In a bridge, two diodes conduct at a time, so the peak output is \\(V_m - 2V_D\\).\n" +
        "- The direction of the diode sets the sign: reversing it passes the negative half-cycles instead.\n" +
        "- **Filters:** a capacitor **across** the load, or an inductor **in series** with it, smooths the pulsating output.\n" +
        "- The full chain: a transformer steps the ac voltage up or down, the rectifier turns ac into pulsating dc, the filter smooths it, and a stabilizer (such as a Zener regulator) holds it constant.\n" +
        "- **Clipping:** an ideal diode in series with a cell of emf \\(E\\) conducts only while the input exceeds \\(E\\); the output then follows \\(V_{in} - E\\). Two diodes facing opposite ways across the output limit it to between \\(-V_D\\) and \\(+V_D\\).",
      formula: {
        label: "Output frequency and peak",
        latex: "f_{\\text{out}} = f\\ (\\text{half-wave}), \\quad 2f\\ (\\text{full-wave}); \\qquad V_{\\text{peak}} = V_m - V_D\\ \\text{per conducting diode}",
      },
      authoredExample: {
        prompt:
          "A bridge rectifier made of silicon diodes (0.7 V each) is fed with an ac voltage of peak 12 V at 50 Hz. Find the peak output voltage and the ripple frequency.",
        steps: [
          "In a bridge, two diodes conduct in each half-cycle, so two drops are lost: \\(12 - 2 \\times 0.7 = 10.6\\) V.",
          "Both half-cycles give a pulse, so there are two pulses per cycle: ripple frequency \\(2 \\times 50 = 100\\) Hz.",
        ],
        answer: "10.6 V peak; 100 Hz.",
      },
      selfCheckExample: {
        prompt:
          "An input \\(8\\sin\\omega t\\) volts is applied to an ideal diode in series with a 2 V cell (opposing conduction) and a resistor R. Describe the voltage across R.",
        steps: [
          "The diode conducts only while \\(8\\sin\\omega t > 2\\), that is while \\(\\sin\\omega t > \\tfrac{1}{4}\\).",
          "Then the voltage across R is \\(8\\sin\\omega t - 2\\), with a peak of \\(8 - 2 = 6\\) V.",
          "For the rest of the cycle, including the whole negative half, it is zero.",
        ],
        answer: "Positive pulses of peak 6 V, only while the input is above 2 V; zero otherwise.",
      },
      practiceSet: [
        { prompt: "60 Hz mains is fed to a full-wave rectifier. Ripple frequency of the output?", answer: "120 Hz" },
        { prompt: "Where is a filter capacitor connected in a rectifier?", answer: "Across the load, in parallel with it" },
        { prompt: "A half-wave rectifier with one silicon diode is fed with 20 V peak. Peak output?", answer: "19.3 V" },
        { prompt: "Two silicon diodes face opposite ways across a circuit's output. Range of the output voltage?", answer: "From −0.7 V to +0.7 V" },
      ],
      pyqExampleId: "601a3483-7640-4c0c-8964-e0316ec6a75e", // 2021: capacitor across, inductor in series, both smooth the output
      traps: [
        {
          title: "Capacitor across, inductor in series",
          body: "Both smooth the output, but in different places. A capacitor goes in parallel with the load; an inductor goes in series with it. A capacitor in series would block the dc altogether.",
        },
        {
          title: "Full-wave doubles the frequency",
          body: "A full-wave rectifier gives two pulses per input cycle, so its ripple is at 2f, 100 Hz on 50 Hz mains. The half-wave output repeats at f.",
        },
        {
          title: "A reversed diode passes the other half",
          body: "Turning the diode round in a half-wave rectifier gives negative half-sines across the load, not positive ones. Check the diode's direction before choosing a waveform.",
        },
      ],
    },
  ],
};
