import type { SubtopicNote } from "@/app/notes/_types";

export const RC_LR_CE_NOTE: SubtopicNote = {
  subtopicName: "Capacitors and Inductors in DC Circuits",
  title: "Capacitors and Inductors in DC Circuits",
  oneLineDefinition:
    "In a DC circuit a capacitor ends up blocking current and an inductor ends up as a plain wire; just after a switch closes it is the other way round, and in between both change exponentially with time constant RC or L/R.",
  whyItMatters:
    "Twenty-nine PYQs, seventeen of them multiple choice, and six from 2026; twenty-four come with a figure. Fourteen ask for a capacitor's charge, voltage or energy in steady state. Eight ask for the current just after a switch closes or long after, mostly with inductors. Seven use the time constant of an RC or LR circuit, including one that compares a capacitor's discharge with radioactive decay.",
  concepts: [
    // C1 — capacitor in steady state
    {
      kind: "formula" as const,
      slug: "jpce-capacitor-steady",
      name: "Capacitors in steady state",
      intuition:
        "Once a capacitor is fully charged, no more charge flows onto it, so its branch carries no current. Any resistor in series with it then has no current and no voltage across it. Solve the rest of the circuit as if that branch were missing, and read the capacitor's voltage as the potential difference between the two points it is joined to.",
      definition:
        "- In steady DC, the capacitor branch carries no current. Remove it to solve the rest of the circuit.\n" +
        "- A resistor in series with the capacitor drops no voltage, so it does not affect \\(V_C\\).\n" +
        "- \\(V_C\\) = the potential difference between the capacitor's two nodes. Then \\(Q = CV_C\\) and \\(U = \\tfrac{1}{2}CV_C^{2}\\).\n" +
        "- A capacitor joining the midpoints of two dividers: \\(V_C\\) is the difference of the two divider outputs.\n" +
        "- Capacitors in series in one branch carry the same charge and share \\(V_C\\) in the ratio of \\(1/C\\).",
      formula: {
        label: "Steady state",
        latex: "I_{\\text{C branch}} = 0, \\qquad Q = CV_C, \\qquad U = \\tfrac{1}{2}CV_C^{2}",
      },
      authoredExample: {
        prompt:
          "A 12 V battery drives a 2 Ω and a 4 Ω resistor in series. A 5 μF capacitor in series with a 10 Ω resistor is connected across the 4 Ω resistor. Find the capacitor's charge and energy in steady state.",
        steps: [
          "The capacitor branch carries nothing, so \\(I = 12/6 = 2\\) A through the two resistors.",
          "The 10 Ω has no current, so the capacitor has the full voltage of the 4 Ω: \\(2 \\times 4 = 8\\) V.",
          "\\(Q = 5 \\times 8 = 40\\ \\mu\\text{C}\\); \\(U = \\tfrac{1}{2} \\times 5 \\times 10^{-6} \\times 64 = 160\\ \\mu\\text{J}\\).",
        ],
        answer: "40 μC and 160 μJ",
      },
      selfCheckExample: {
        prompt:
          "Two branches are across a 10 V battery: one has 3 Ω above 2 Ω, the other 1 Ω above 4 Ω. A 2 μF capacitor joins the two midpoints. Find its charge in steady state.",
        steps: [
          "Measured from the negative terminal, the first midpoint is at \\(10 \\times \\tfrac{2}{5} = 4\\) V.",
          "The second midpoint is at \\(10 \\times \\tfrac{4}{5} = 8\\) V.",
          "\\(V_C = 4\\) V, so \\(Q = 2 \\times 4 = 8\\ \\mu\\text{C}\\).",
        ],
        answer: "8 μC",
      },
      practiceSet: [
        { prompt: "A 6 μF capacitor charges from a 9 V battery through 100 Ω. Charge in steady state?", answer: "54 μC" },
        { prompt: "Energy stored in a 4 μF capacitor at 10 V?", answer: "200 μJ" },
        { prompt: "Current in steady state through a 3 Ω resistor in series with a capacitor?", answer: "Zero" },
        { prompt: "A 6 V cell with r = 1 Ω drives a 5 Ω resistor, with a 3 μF capacitor across the 5 Ω. Charge in steady state?", answer: "15 μC" },
      ],
      pyqExampleId: "1d51cdb0-a58d-4886-bc40-3ee475b6431f", // 2025: 8 μF across the 10 Ω of a 10 Ω + 15 Ω series pair on 5 V
      traps: [
        {
          title: "The series resistor drops nothing",
          body: "With no current in the capacitor branch, a resistor in that branch has no voltage across it. Subtracting an IR drop there gives a wrong capacitor voltage.",
        },
        {
          title: "Leave the capacitor branch out of the equivalent resistance",
          body: "In steady state a capacitor branch is an open circuit. Including its resistor in the equivalent resistance changes the current everywhere else.",
        },
        {
          title: "The capacitor voltage is a difference of potentials",
          body: "Find the potential at each plate's node from the rest of the circuit and subtract. Do not assume the capacitor has the battery's full emf.",
        },
      ],
    },

    // C2 — the switching moments
    {
      kind: "formula" as const,
      slug: "jpce-switching",
      name: "Just after switching and long after",
      intuition:
        "An inductor resists any sudden change in its current, and a capacitor resists any sudden change in its voltage. So just after a switch closes, an inductor that carried no current still carries none, as if its branch were cut, and an uncharged capacitor still has no voltage, as if it were a plain wire. Long after, nothing is changing: the inductor is just a wire and the capacitor blocks current.",
      definition:
        "- Just after closing (\\(t = 0^{+}\\)): an inductor with no current is an open circuit; an uncharged capacitor is a short circuit.\n" +
        "- Long after (\\(t \\to \\infty\\)): an ideal inductor is a plain wire (or its own resistance if it has one); a capacitor is an open circuit.\n" +
        "- The current in an inductor and the voltage on a capacitor never jump; use their values just before the switch moved.\n" +
        "- Just after closing, an ideal inductor in series with R has the whole emf across it; the current then grows.",
      formula: {
        label: "The two moments",
        latex: "t = 0^{+}: \\ L \\to \\text{open},\\ C \\to \\text{wire}; \\qquad t \\to \\infty: \\ L \\to \\text{wire},\\ C \\to \\text{open}",
      },
      authoredExample: {
        prompt:
          "A 10 V battery feeds a 5 Ω resistor in series with two parallel branches: a plain 5 Ω, and an ideal inductor in series with another 5 Ω. Find the battery current just after the switch closes and long after.",
        steps: [
          "\\(t = 0^{+}\\): the inductor branch is open. Total \\(5 + 5 = 10\\ \\Omega\\), so \\(I = 1\\) A.",
          "\\(t \\to \\infty\\): the inductor is a wire, so its branch is just 5 Ω. The branches give \\(5 \\parallel 5 = 2.5\\ \\Omega\\).",
          "Total \\(7.5\\ \\Omega\\), so \\(I = 10/7.5 = 4/3\\) A.",
        ],
        answer: "1 A at first, 4/3 A long after",
      },
      selfCheckExample: {
        prompt:
          "A 12 V battery feeds a 4 Ω resistor in series with two parallel branches: a plain 3 Ω, and an uncharged capacitor in series with 6 Ω. Find the battery current just after the switch closes and long after.",
        steps: [
          "\\(t = 0^{+}\\): the capacitor is a wire, so the branches are 3 Ω and 6 Ω: \\(3 \\parallel 6 = 2\\ \\Omega\\). Total 6 Ω, so \\(I = 2\\) A.",
          "\\(t \\to \\infty\\): the capacitor branch is open. Total \\(4 + 3 = 7\\ \\Omega\\), so \\(I = 12/7\\) A.",
        ],
        answer: "2 A at first, 12/7 A long after",
      },
      practiceSet: [
        { prompt: "An ideal inductor in series with 6 Ω across 12 V. Current just after closing and long after?", answer: "0 and 2 A" },
        { prompt: "An uncharged capacitor in series with 4 Ω across 8 V. Current just after closing and long after?", answer: "2 A and 0" },
        { prompt: "Two 10 Ω resistors in parallel across 10 V, one of them in series with an ideal inductor. Battery current at first and long after?", answer: "1 A and 2 A" },
        { prompt: "An ideal inductor in series with R across an emf E. Voltage across the inductor just after closing?", answer: "E" },
      ],
      pyqExampleId: "02f9d834-47f1-42cd-aded-881402b60821", // 2023: three 12 Ω and two 5 mH inductors on 12 V, current long after closing
      traps: [
        {
          title: "Which element is the wire, and when",
          body: "At the first instant the capacitor is the wire and the inductor is the gap; long after it is the reverse. Swapping them gives the other moment's answer, which is usually an option.",
        },
        {
          title: "A real inductor keeps its resistance",
          body: "Long after switching, an inductor with its own resistance acts as that resistor, not as a plain wire.",
        },
        {
          title: "Nothing jumps",
          body: "An inductor's current and a capacitor's voltage just after a switch equal their values just before it. Use that, not the steady-state rule, for the first instant.",
        },
      ],
    },

    // C3 — the time constant
    {
      kind: "formula" as const,
      slug: "jpce-time-constant",
      name: "Charging, discharging and the time constant",
      intuition:
        "Between the first instant and the steady state, the change is exponential. In each time constant the remaining gap shrinks by the same factor e. For a capacitor the time constant is RC; for an inductor it is L/R. Energy goes as the square of charge or current, so it decays twice as fast.",
      definition:
        "- RC charging: \\(q = Q_0\\left(1 - e^{-t/RC}\\right)\\), and the same for \\(V_C\\). Discharging: \\(q = q_0e^{-t/RC}\\).\n" +
        "- Time to fall to \\(1/n\\) of the start: \\(t = \\tau\\ln n\\). Charge halves at \\(\\tau\\ln 2\\); energy halves at \\(\\tfrac{1}{2}\\tau\\ln 2\\).\n" +
        "- The field between the plates is \\(V/d\\), so it falls exactly like the charge.\n" +
        "- LR growth: \\(i = \\dfrac{E}{R}\\left(1 - e^{-t/\\tau}\\right)\\) with \\(\\tau = L/R\\); the inductor's voltage is \\(E - iR\\). Decay: \\(i = i_0e^{-t/\\tau}\\).\n" +
        "- After one time constant a charging capacitor or growing current is at \\(1 - 1/e \\approx 63\\%\\) of its final value; a decaying one is at \\(1/e \\approx 37\\%\\).\n" +
        "- A square-wave input across RC gives alternate exponential rises and falls at the capacitor.",
      formula: {
        label: "Exponential change",
        latex: "q = q_0e^{-t/RC}, \\qquad i = \\frac{E}{R}\\left(1 - e^{-tR/L}\\right), \\qquad t_{1/n} = \\tau\\ln n",
      },
      authoredExample: {
        prompt:
          "A 2 μF capacitor discharges through a 5 kΩ resistor. Find the time constant, the time for the charge to fall to a quarter, and the time for the energy to fall to a quarter.",
        steps: [
          "\\(\\tau = RC = 5 \\times 10^{3} \\times 2 \\times 10^{-6} = 10\\) ms.",
          "Charge to a quarter: \\(t = \\tau\\ln 4 = 10 \\times 1.386 \\approx 13.9\\) ms.",
          "Energy to a quarter means charge to a half: \\(t = \\tau\\ln 2 \\approx 6.9\\) ms.",
        ],
        answer: "10 ms; about 13.9 ms; about 6.9 ms",
      },
      selfCheckExample: {
        prompt:
          "A coil of inductance 2 H and resistance 10 Ω is connected to a 5 V battery. Find the time constant, the final current, and the time for the current to reach half its final value.",
        steps: [
          "\\(\\tau = L/R = 2/10 = 0.2\\) s. Final current \\(= 5/10 = 0.5\\) A.",
          "Half of final: \\(1 - e^{-t/\\tau} = \\tfrac{1}{2}\\), so \\(t = \\tau\\ln 2 = 0.2 \\times 0.693 \\approx 0.14\\) s.",
        ],
        answer: "0.2 s; 0.5 A; about 0.14 s",
      },
      practiceSet: [
        { prompt: "RC = 4 s. Fraction of the charge left after 4 s of discharge?", answer: "\\(1/e \\approx 0.37\\)" },
        { prompt: "Time constant of 10 μF with 20 kΩ?", answer: "0.2 s" },
        { prompt: "Time constant of 50 mH with 10 Ω?", answer: "5 ms" },
        { prompt: "A charging capacitor after one time constant: what fraction of its final voltage?", answer: "\\(1 - 1/e \\approx 0.63\\)" },
      ],
      pyqExampleId: "cb56b2d9-59ae-4b91-a401-7ab98bfe74aa", // 2024: field between plates of 1.5 μF falls to a third in 6.6 μs
      traps: [
        {
          title: "Energy decays twice as fast",
          body: "Energy goes as q², so it falls as e^(−2t/RC). The energy halves in half the time the charge takes to halve.",
        },
        {
          title: "Growth uses 1 − e^(−t/τ)",
          body: "For charging or growing current, set 1 − e^(−t/τ) equal to the fraction asked, not e^(−t/τ). The two give different times except at one half.",
        },
        {
          title: "ln, not log₁₀",
          body: "The time is τ ln n with the natural logarithm. A value printed as log 3 = 1.1 is really ln 3: log₁₀ 3 is only about 0.48.",
        },
      ],
    },
  ],
};
