import type { SubtopicNote } from "@/app/notes/_types";

export const REACTANCE_NOTE: SubtopicNote = {
  subtopicName: "Reactance — Inductive, Capacitive, and Single-Element Circuits",
  title: "Reactance and Single-Element AC Circuits",
  oneLineDefinition:
    "An inductor opposes a.c. with reactance X_L = ωL, which grows with frequency; a capacitor with X_C = 1/ωC, which shrinks with it — and in each the current is a quarter-cycle out of step with the voltage.",
  whyItMatters:
    "23 PYQs, none HARD — reliable marks. Three shapes: how a reactance changes when the frequency, L or C changes, the current and its phase in a circuit of one element, " +
    "and a bulb in series with a coil or capacitor that brightens or dims.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-reactance-scaling",
      name: "How Reactance Depends on Frequency, L and C",
      intuition:
        "A coil fights a changing current, so the faster the change the more it resists: X_L = ωL rises with frequency and is zero for steady d.c. A capacitor passes change easily, so X_C = 1/ωC falls with frequency and is infinite for d.c.",
      definition:
        "- \\(X_L = \\omega L = 2\\pi fL\\): directly proportional to \\(f\\) and \\(L\\). \\(L \\times 3\\), \\(f \\times 2\\) ⇒ \\(X_L \\times 6\\).\n" +
        "- \\(X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi fC}\\): \\(f\\) and \\(C\\) both doubled ⇒ \\(\\dfrac{X_C}{4}\\).\n" +
        "- For d.c. (\\(f = 0\\)): \\(X_L = 0\\), so \\(\\dfrac{X_{\\text{ac}}}{X_{\\text{dc}}} = \\infty\\).\n" +
        "- \\(X_L = X_C\\) at \\(\\omega\\); at \\(2\\omega\\), \\(X_C : X_L = 1 : 4\\).\n" +
        "- Inductors combine like resistors: series add, parallel as reciprocals.",
      formula: {
        label: "Reactances",
        latex: "X_L = \\omega L, \\qquad X_C = \\frac{1}{\\omega C}",
      },
      authoredExample: {
        prompt: "Reactance of a 0.1 H inductor and of a \\(100\\,\\mu\\)F capacitor at 50 Hz?",
        steps: ["\\(X_L = 2\\pi \\times 50 \\times 0.1 \\approx 31.4\\,\\Omega\\).", "\\(X_C = \\dfrac{1}{314 \\times 10^{-4}} \\approx 31.8\\,\\Omega\\)."],
        answer: "≈ 31.4 Ω; ≈ 31.8 Ω",
      },
      selfCheckExample: {
        prompt: "The frequency is doubled and the capacitance halved. New capacitive reactance?",
        steps: ["\\(X_C \\propto \\dfrac{1}{fC}\\): \\(2 \\times \\dfrac{1}{2} = 1\\)."],
        answer: "Unchanged",
      },
      practiceSet: [
        { prompt: "\\(X_C = 5\\,\\Omega\\) at 50 Hz. At 100 Hz?", answer: "\\(2.5\\,\\Omega\\)" },
        { prompt: "\\(L\\) and \\(f\\) both tripled. New \\(X_L\\)?", answer: "9 times" },
        { prompt: "Reactance of an inductor to d.c.?", answer: "Zero" },
      ],
      pyqExampleId: "155ec015-0af6-47d0-b3ee-5d6bb579e9a8",
      traps: [
        {
          title: "Treating X_C like X_L",
          body:
            "\\(X_C\\) goes DOWN as frequency or capacitance goes up. Doubling both divides it by 4; the options offer \\(4X\\) for the student who multiplied.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-single-element",
      name: "Current and Phase With a Single L or C",
      intuition:
        "In a pure inductor the current lags the voltage by 90°; in a pure capacitor it leads by 90° — remember CIVIL: in a C, I leads V; V leads I in an L. The size of the current is just V over the reactance.",
      definition:
        "- Pure \\(L\\): \\(I = \\dfrac{V}{X_L}\\), current LAGS the voltage by \\(\\dfrac{\\pi}{2}\\).\n" +
        "- Pure \\(C\\): \\(I = \\dfrac{V}{X_C} = V\\omega C\\), current LEADS by \\(\\dfrac{\\pi}{2}\\): \\(E = E_0\\sin\\omega t \\Rightarrow I = E_0\\omega C\\sin\\left(\\omega t + \\dfrac{\\pi}{2}\\right)\\).\n" +
        "- Pure \\(R\\): in phase. So in a series LCR, current and voltage are out of phase in \\(L\\) and in \\(C\\), in phase in \\(R\\).\n" +
        "- An a.c. ammeter reads r.m.s.: \\(V_0 = 200\\sqrt{2}\\), \\(\\omega = 100\\), \\(C = 1\\,\\mu\\)F ⇒ \\(X_C = 10^4\\,\\Omega\\), \\(I = 20\\) mA.",
      formula: {
        label: "CIVIL",
        latex: "\\text{C: } I \\text{ leads } V \\text{ by } 90^\\circ; \\qquad \\text{L: } V \\text{ leads } I \\text{ by } 90^\\circ",
      },
      authoredExample: {
        prompt: "A \\(10\\,\\mu\\)F capacitor is connected to 220 V, 50 Hz. R.m.s. current?",
        steps: ["\\(X_C = \\dfrac{1}{2\\pi \\times 50 \\times 10^{-5}} \\approx 318\\,\\Omega\\).", "\\(I = \\dfrac{220}{318} \\approx 0.69\\) A."],
        answer: "≈ 0.69 A",
      },
      selfCheckExample: {
        prompt: "A pure inductor is connected to an a.c. source. Does the current lead or lag the voltage, and by how much?",
        steps: ["Inductor: V leads I."],
        answer: "Lags by \\(\\dfrac{\\pi}{2}\\)",
      },
      practiceSet: [
        { prompt: "\\(e = 220\\sin 50t\\) across \\(50\\,\\mu\\)F. Peak current?", answer: "0.55 A" },
        { prompt: "A 42 mH coil on 200 V, 50 Hz (π = 22/7). R.m.s. current?", answer: "≈ 15.2 A" },
      ],
      pyqExampleId: "f976a87a-2449-44fd-b905-461ec5392e34",
      traps: [
        {
          title: "Swapping lead and lag",
          body:
            "Every phase question offers both. CIVIL settles it: Capacitor — I before V; inducto-L — V before I.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-bulb-brightness",
      name: "A Bulb in Series With a Coil or a Capacitor",
      intuition:
        "The bulb glows with the current, and the current falls as the reactance rises. So ask one question of every change: does it raise or lower the reactance?",
      definition:
        "- With a coil: an iron core raises \\(L\\), so \\(X_L\\) rises and the bulb DIMS; fewer turns or lower frequency brighten it.\n" +
        "- With a capacitor: a larger \\(C\\) or higher frequency lowers \\(X_C\\) and BRIGHTENS it; a smaller \\(C\\) or lower frequency dims it.\n" +
        "- Adding a capacitor to a coil circuit partly cancels \\(X_L\\) and can raise the current.",
      formula: {
        label: "Current falls as reactance rises",
        latex: "I = \\frac{V}{\\sqrt{R^2 + X^2}}",
      },
      authoredExample: {
        prompt: "A bulb in series with a coil glows on an a.c. supply. An iron rod is pushed into the coil. What happens?",
        steps: ["Iron raises \\(L\\), so \\(X_L = \\omega L\\) rises and the current falls."],
        answer: "The bulb dims",
      },
      selfCheckExample: {
        prompt: "A bulb in series with a capacitor. The supply frequency is raised. Brightness?",
        steps: ["\\(X_C = \\dfrac{1}{\\omega C}\\) falls, current rises."],
        answer: "Increases",
      },
      practiceSet: [
        { prompt: "Bulb with a capacitor: capacitance reduced. Brightness?", answer: "Reduced" },
      ],
      pyqExampleId: "44845777-ba8f-4f4a-ac9e-267c00fe32dc",
      traps: [
        {
          title: "Reversing the capacitor's rule",
          body:
            "For a coil, more L or more frequency means dimmer; for a capacitor, more C or more frequency means BRIGHTER. The two rules run in opposite directions.",
        },
      ],
    },
  ],
  related: [
    { label: "Series LCR — Impedance and Phase", href: "/notes/mht-cet-physics/ac-circuits/cetp-lcr-impedance" },
    { label: "AC Basics — peak and r.m.s. values", href: "/notes/mht-cet-physics/ac-circuits/cetp-ac-basics" },
  ],
};
