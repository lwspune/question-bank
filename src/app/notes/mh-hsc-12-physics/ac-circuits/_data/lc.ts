import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AC_LC_NOTE: SubtopicNote = {
  subtopicName: "LC Oscillations",
  title: "LC Oscillations",
  oneLineDefinition:
    "How a charged capacitor and an inductor pass energy back and forth, setting up electrical oscillations at the natural frequency 1/(2π√LC).",
  whyItMatters:
    "4 questions, all from the textbook (the board's parallel LC frequency question of 2020 is on the Resonance page): the energy sums (the largest current when a charged capacitor discharges through a coil, and the inductance that gives a set current), the capacitance needed for a set frequency, and the reactance of an LC circuit at its natural frequency.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpac-lc-energy",
      name: "Energy in LC oscillations",
      intuition:
        "Charge a capacitor and join it across a coil. The capacitor drives a current through the coil, and its electric energy turns into magnetic energy. When the capacitor is empty the current is at its largest, and the coil's collapsing field keeps it going until the capacitor is charged the other way round. Then it all runs back. The energy swings between the two like a pendulum between height and speed.",
      definition:
        "- A fully charged capacitor stores \\(U_E = \\dfrac{q_0^2}{2C}\\); the inductor then stores nothing.\n" +
        "- As the capacitor discharges through the inductor, the current builds a magnetic field storing \\(U_B = \\dfrac{1}{2}LI^2\\).\n" +
        "- When the capacitor is fully discharged, all the energy is magnetic and the current is maximum, \\(I_0\\). The decreasing flux then keeps the current flowing (Lenz's law) and charges the capacitor with opposite polarity.\n" +
        "- The energy surges back and forth between the electric field of the capacitor and the magnetic field of the inductor. These are **LC oscillations**.\n" +
        "- With no loss of energy the amplitude stays constant (**undamped**). In practice they are **damped**: the coil's resistance turns energy into heat, and energy is also radiated away as electromagnetic waves.",
      formula: {
        label: "Energy is conserved",
        latex: "\\frac{q_0^2}{2C} = \\frac{1}{2}CV^2 = \\frac{1}{2}L I_0^2",
      },
      authoredExample: {
        prompt:
          "A 2 μF capacitor is charged to 50 V and then connected across a pure inductor. Find the total energy of the oscillations, and the energy stored in the inductor at the instant the charge on the capacitor has fallen to half its maximum value.",
        steps: [
          "Given: \\(C = 2 \\times 10^{-6}\\) F, \\(V = 50\\) V.",
          "Total energy: \\(U = \\dfrac{1}{2}CV^2 = \\dfrac{1}{2} \\times 2 \\times 10^{-6} \\times 50^2 = 2.5 \\times 10^{-3}\\) J.",
          "At charge \\(q_0/2\\): \\(U_E = \\dfrac{(q_0/2)^2}{2C} = \\dfrac{1}{4} \\cdot \\dfrac{q_0^2}{2C} = \\dfrac{2.5 \\times 10^{-3}}{4} = 6.25 \\times 10^{-4}\\) J.",
          "Energy in the inductor: \\(U_B = U - U_E = 2.5 \\times 10^{-3} - 6.25 \\times 10^{-4} = 1.875 \\times 10^{-3}\\) J.",
        ],
        answer: "Total 2.5 × 10⁻³ J; inductor 1.875 × 10⁻³ J",
      },
      selfCheckExample: {
        prompt: "In LC oscillations the largest current through a 0.05 H inductor is 2 A. Find the total energy of the oscillations.",
        steps: ["All the energy is magnetic when the current is largest.", "\\(U = \\dfrac{1}{2}LI_0^2 = \\dfrac{1}{2} \\times 0.05 \\times 2^2 = 0.1\\) J."],
        answer: "0.1 J",
      },
      practiceSet: [
        { prompt: "Give two reasons why LC oscillations die out.", answer: "The coil's resistance turns energy into heat, and energy is radiated as electromagnetic waves" },
        { prompt: "Where is all the energy of an LC circuit at the instant the capacitor is fully discharged?", answer: "In the magnetic field of the inductor" },
        { prompt: "What are undamped oscillations?", answer: "Oscillations whose amplitude stays constant because no energy is lost" },
      ],
      pyqExampleId: "a1c464e6-3238-4d9d-a747-b399a63dd866",
      traps: [
        {
          title: "Half the charge is not half the energy",
          body: "The capacitor's energy goes as \\(q^2\\). At half the charge it holds one quarter of the energy, and the other three quarters are in the inductor.",
        },
        {
          title: "Leaving out one reason for damping",
          body: "The board's 'why are LC oscillations damped' has two parts: resistance (heat) and radiation of electromagnetic waves. Even with zero resistance the energy would not stay constant.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpac-lc-frequency",
      name: "Natural frequency of an LC circuit",
      intuition:
        "Like a swing, an LC circuit has one frequency of its own. A big inductance makes the current slow to change, and a big capacitance takes longer to fill, so increasing either lowers the frequency. Because of the square root, you must make L or C four times bigger to halve the frequency.",
      definition:
        "- The frequency of LC oscillations (the natural frequency) is the frequency at which \\(X_L = X_C\\), \\(\\omega L = \\dfrac{1}{\\omega C}\\).\n" +
        "- So \\(\\omega = \\dfrac{1}{\\sqrt{LC}}\\) and \\(f = \\dfrac{1}{2\\pi\\sqrt{LC}}\\), the same as the resonant frequency of an LCR circuit built from the same L and C.\n" +
        "- At this frequency the reactances of L and C are equal and opposite, so the net reactance \\(X_L - X_C\\) of a series LC circuit is zero.\n" +
        "- To find C for a given f and L: \\(C = \\dfrac{1}{4\\pi^2 f^2 L}\\).",
      formula: {
        label: "Natural frequency",
        latex: "f = \\frac{1}{2\\pi\\sqrt{LC}}, \\qquad C = \\frac{1}{4\\pi^2 f^2 L}",
      },
      authoredExample: {
        prompt:
          "A 0.5 H coil and a capacitor oscillate at 50 Hz. Find the capacitance. What will the frequency be if the capacitance is made four times as large? (\\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(L = 0.5\\) H, \\(f = 50\\) Hz.",
          "\\(C = \\dfrac{1}{4\\pi^2 f^2 L} = \\dfrac{1}{4 \\times (3.142)^2 \\times 50^2 \\times 0.5}\\).",
          "\\(C = \\dfrac{1}{49\\,360} = 2.026 \\times 10^{-5}\\) F \\(= 20.26\\ \\mu\\)F.",
          "Since \\(f \\propto \\dfrac{1}{\\sqrt{C}}\\), four times the capacitance gives \\(f' = \\dfrac{50}{\\sqrt{4}} = 25\\) Hz.",
        ],
        answer: "20.26 μF; the frequency falls to 25 Hz",
      },
      selfCheckExample: {
        prompt: "Both the inductance and the capacitance of an LC circuit are doubled. By what factor does its natural frequency change?",
        steps: ["\\(f \\propto \\dfrac{1}{\\sqrt{LC}}\\), and LC becomes 4 times as large.", "So f becomes \\(\\dfrac{1}{\\sqrt{4}} = \\dfrac{1}{2}\\) of its value."],
        answer: "It is halved",
      },
      practiceSet: [
        { prompt: "The inductance of an LC circuit is made 9 times as large. What happens to its natural frequency?", answer: "It becomes one third" },
        { prompt: "An LC circuit has L = 1 H and C = 1 μF. Find its natural angular frequency.", answer: "\\(\\omega = 1/\\sqrt{LC} = 1000\\) rad/s" },
        { prompt: "Write the condition that fixes the natural frequency of an LC circuit.", answer: "\\(X_L = X_C\\), that is \\(\\omega L = 1/(\\omega C)\\)" },
      ],
      pyqExampleId: "846a5484-b0af-4bbc-ad30-549c7a667db4",
      traps: [
        {
          title: "Forgetting the square root",
          body: "\\(f = 1/(2\\pi\\sqrt{LC})\\). Leaving out the root makes the answer wrong by a large factor; with L and C in \\(\\mu\\) units it is usually wrong by a power of ten too.",
        },
        {
          title: "Squaring only part of the formula",
          body: "When you solve for C, square every factor: \\(f^2 = \\dfrac{1}{4\\pi^2 LC}\\). Squaring f but keeping \\(2\\pi\\) unsquared gives a C that is wrong by a factor of \\(2\\pi\\).",
        },
      ],
    },
  ],
};
