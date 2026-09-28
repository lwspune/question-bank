import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/electromagnetic-induction";

export const SELF_INDUCTANCE_NOTE: SubtopicNote = {
  subtopicName: "Self-Inductance, Energy Stored, and LR Circuit",
  title: "Self-Inductance, the Energy an Inductor Stores, and Inductors Together",
  oneLineDefinition:
    "A coil's own current links flux through it, Nφ = LI; the constant L is its self-inductance, it opposes any change in that current with an e.m.f. L dI/dt, it is set by the coil's geometry (for a solenoid μ₀N²A/l), and it stores energy ½LI² in its magnetic field.",
  whyItMatters:
    "43 PYQs, 4 HARD — the largest page in the chapter. Fourteen are the definition — L from flux and current, the slope of a φ–I graph (asked six times), the unit, e = L dI/dt, and a voltage across an inductor in a circuit; seventeen are how a solenoid's L depends on turns, length, area and core, including the length of wire needed to make one; twelve are energy ½LI² and inductors in series and parallel. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-emi-self-inductance-definition",
      name: "What Self-Inductance Is",
      intuition:
        "A current through a coil links flux Nφ with it, and the flux is proportional to the current: Nφ = LI. So on a graph of φ against I each coil is a straight line whose SLOPE is its inductance — steepest line, largest L. Change the current and the linked flux changes, inducing e = −L dI/dt, which fights the change; a plot of e against dI/dt is therefore a straight line through the origin with slope −L. Its unit is V·s/A, the henry. Because the stored energy is ½LI², L is numerically twice the work done in setting up the flux for a unit current.",
      definition:
        "- \\(N\\phi = LI\\) ⇒ \\(L = \\dfrac{N\\phi}{I}\\); on a \\(\\phi\\)–\\(I\\) graph L is the **slope**.\n" +
        "- \\(e = -L\\dfrac{dI}{dt}\\): current reversed from 5 A to −5 A in 0.5 s with e = 2 V ⇒ L = 0.1 H.\n" +
        "- **Unit**: \\(\\dfrac{\\text{V} \\cdot \\text{s}}{\\text{A}}\\) = henry.\n" +
        "- L is **twice the work** done establishing the flux for unit current (from \\(W = \\tfrac{1}{2}LI^2\\)).\n" +
        "- **In a circuit**, going along the current: a resistor drops IR, an inductor drops \\(L\\dfrac{dI}{dt}\\) (negative when the current is falling), a cell drops or gains its e.m.f.",
      formula: {
        label: "Self-inductance",
        latex: "N\\phi = LI, \\qquad e = -L\\frac{dI}{dt}",
      },
      authoredExample: {
        prompt: "A 200-turn coil carries 2 A and each turn links 5 × 10⁻⁴ Wb. Its self-inductance, and the e.m.f. if the current falls to zero in 0.01 s?",
        steps: ["L = Nφ/I = 200 × 5 × 10⁻⁴/2 = 0.05 H.", "e = L ΔI/Δt = 0.05 × 2/0.01 = 10 V."],
        answer: "0.05 H; 10 V",
      },
      selfCheckExample: {
        prompt: "A 1500-turn solenoid carries 35 A and each turn links 2.8 × 10⁻² Wb. L?",
        steps: ["L = Nφ/I = 42/35."],
        answer: "1.2 H",
      },
      practiceSet: [
        { prompt: "On a φ–I graph for four inductors, which has the largest L?", answer: "The steepest line" },
        { prompt: "100 turns, 1 A, 2.5 × 10⁻⁵ Wb per turn. L in mH?", answer: "2.5 mH" },
        { prompt: "SI unit of self-inductance?", answer: "V·s/A (henry)" },
      ],
      pyqExampleId: "8ec9aafa-53ab-41b3-960b-2973677c0976",
      traps: [
        {
          title: "Forgetting the N in Nφ = LI",
          body:
            "The flux 'per turn' must be multiplied by the number of turns. 1500 × 2.8 × 10⁻²/35 is 1.2 H; leaving out N gives 0.8 mH.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-emi-solenoid-inductance",
      name: "Self-Inductance of a Solenoid",
      intuition:
        "Inside a long solenoid B = μ₀NI/l, so each turn links μ₀NIA/l and all N turns link μ₀N²IA/l: L = μ₀μᵣN²A/l. It depends on the coil, never on the current. Written with turns per unit length n = N/l it is μ₀n²Al, the form to use when n is held fixed. So L goes as N², as A (r²), as 1/l for fixed N, and up by the core's μᵣ. Scale every linear dimension by k at fixed n and L grows k³.",
      definition:
        "- \\(L = \\dfrac{\\mu_0\\mu_r N^2 A}{l} = \\mu_0\\mu_r n^2 A l\\); per unit length \\(\\mu_0 n^2 \\dfrac{\\pi d^2}{4} = \\mu_0\\pi\\left(\\dfrac{nd}{2}\\right)^2\\).\n" +
        "- **Turns**: N × 2 ⇒ L × 4; N × 3 ⇒ L × 9; 600 → 500 turns ⇒ L × 25/36.\n" +
        "- **Size** at fixed n: all lengths × 2 ⇒ L × 8; × 3 ⇒ × 27. Equal N, lengths and radii both 1 : 3 ⇒ L 1 : 3.\n" +
        "- **Core**: μᵣ = 1000 with turns cut to a tenth ⇒ L × 10.\n" +
        "- L rises if l **decreases** or A **increases**; the **current** does not change it.\n" +
        "- **Wire needed** for a solenoid of length l and inductance L: \\(\\sqrt{\\dfrac{4\\pi lL}{\\mu_0}}\\) (1 m, 1 mH ⇒ 100 m).",
      formula: {
        label: "Solenoid",
        latex: "L = \\frac{\\mu_0 \\mu_r N^2 A}{l} = \\mu_0\\mu_r n^2 A l",
      },
      authoredExample: {
        prompt: "A coil of 0.2 H has its turns halved and an iron core of μᵣ = 400 inserted. New L?",
        steps: ["L × μᵣ × (1/2)² = 0.2 × 400 × 0.25 = 20 H."],
        answer: "20 H",
      },
      selfCheckExample: {
        prompt: "All linear dimensions of a core are doubled with the same turns per unit length. L becomes?",
        steps: ["L = μ₀n²Al: A × 4, l × 2."],
        answer: "8 times",
      },
      practiceSet: [
        { prompt: "Turns tripled, same length. L?", answer: "9 times" },
        { prompt: "Air-cored 0.1 H; iron core μᵣ = 1000; turns reduced to a tenth. New L?", answer: "1 H" },
        { prompt: "Wire length for a 1 m solenoid of 1 mH?", answer: "0.10 km" },
      ],
      pyqExampleId: "8f11b826-830a-49b9-ac17-0a6f449d04af",
      traps: [
        {
          title: "Holding N fixed when the question holds n fixed",
          body:
            "'Turns per unit length stays the same' means n is fixed, so L = μ₀n²Al grows with BOTH A and l. With N fixed, L = μ₀N²A/l falls as l grows.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-emi-inductor-energy-combos",
      name: "Energy in an Inductor, and Inductors in Series and Parallel",
      intuition:
        "Building up current I in an inductor stores energy ½LI² in its field; halve the current and the energy falls to a quarter. Inductors combine like resistors: in series they add, in parallel their reciprocals add. So a coil cut in two and the halves put in parallel gives L/4. When a circuit carrying current through an inductor is broken, that stored energy must go somewhere — a capacitor across the switch soaks it up if ½CV² ≥ ½LI².",
      definition:
        "- \\(U = \\tfrac{1}{2}LI^2\\); also \\(U = \\tfrac{1}{2}N\\phi I\\) when given flux and turns.\n" +
        "- **Series** \\(L = L_1 + L_2 + \\dots\\); **parallel** \\(\\dfrac{1}{L} = \\dfrac{1}{L_1} + \\dfrac{1}{L_2} + \\dots\\).\n" +
        "- A coil cut into halves in parallel: \\(\\dfrac{L}{4}\\). Three equal in series: \\(U = \\tfrac{3}{2}LI^2\\).\n" +
        "- Same e.m.f. and resistance ⇒ same current, so energies go as L (10 H : 10 mH = 1000 : 1).\n" +
        "- **Spark suppression**: \\(C \\ge \\dfrac{LI^2}{V^2}\\) (1 H, 1 A, 500 V ⇒ 4 μF).",
      formula: {
        label: "Stored energy",
        latex: "U = \\tfrac{1}{2}LI^2",
      },
      authoredExample: {
        prompt: "Two 40 mH inductors in parallel carry 3 A in total. Energy stored?",
        steps: ["L = 20 mH.", "U = ½ × 0.02 × 9 = 0.09 J."],
        answer: "0.09 J",
      },
      selfCheckExample: {
        prompt: "A 100 mH coil carries 1 A. Energy in its field?",
        steps: ["½ × 0.1 × 1²."],
        answer: "0.05 J",
      },
      practiceSet: [
        { prompt: "Two 60 mH inductors in parallel carry 2.2 A. Energy?", answer: "0.0726 J" },
        { prompt: "Current in an LR circuit halved. Stored energy?", answer: "A quarter" },
        { prompt: "4 A through 400 turns linking 3 × 10⁻³ Wb each. Energy?", answer: "2.4 J" },
      ],
      pyqExampleId: "ac906157-9f03-415a-9439-0fc0a8aea63a",
      traps: [
        {
          title: "Halving the energy when the current halves",
          body:
            "Energy goes as I². Half the current stores a quarter of the energy, not half.",
        },
      ],
    },
  ],
  related: [
    { label: "Mutual Inductance — flux linked into ANOTHER coil", href: `${BASE}/cetp-emi-mutual` },
    { label: "AC Circuits — inductive reactance", href: "/notes/mht-cet-physics/ac-circuits" },
  ],
};
