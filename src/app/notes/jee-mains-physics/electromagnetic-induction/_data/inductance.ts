import type { SubtopicNote } from "@/app/notes/_types";

export const INDUCTANCE_EMI_NOTE: SubtopicNote = {
  subtopicName: "Self and Mutual Inductance, Energy and LR Circuits",
  title: "Self and Mutual Inductance, Energy and LR Circuits",
  oneLineDefinition:
    "A coil opposes a change in its own current with an emf −L dI/dt and induces −M dI/dt in a neighbour; it stores energy ½LI², and in an LR circuit the current grows or decays with time constant L/R.",
  whyItMatters:
    "Twenty-six PYQs, fourteen of them multiple choice, and four from 2026. Seven are self-inductance: L from a back emf, from a solenoid's shape, or from what L depends on; nine are mutual inductance, seven of them a small loop at the centre of a large one; ten are about the energy an inductor stores and how the current grows in an LR circuit.",
  concepts: [
    // C1 — self-inductance
    {
      kind: "formula" as const,
      slug: "jpemi-self",
      name: "Self-inductance and the back emf",
      intuition:
        "A coil's own current makes a flux through it, LI. If the current changes, that flux changes, and the coil induces an emf that fights the change: it pushes back when the current rises and keeps it going when it falls. L plays the part of mass for current, an inertia that resists any change. It depends only on the coil's shape and the material inside it.",
      definition:
        "- \\(N\\Phi = LI\\) and \\(\\varepsilon = -L\\,\\dfrac{dI}{dt}\\). For a size, \\(|\\varepsilon| = L\\,|\\Delta I|/\\Delta t\\).\n" +
        "- \\(\\Delta I\\) across zero: from \\(-2\\ \\text{A}\\) to \\(+3\\ \\text{A}\\) is a change of 5 A, not 1 A.\n" +
        "- Switching off a steady current \\(I_0 = E/R\\) in time \\(\\Delta t\\): average emf \\(L I_0/\\Delta t\\), often far above the battery's emf.\n" +
        "- Long solenoid of length l, N turns, \\(n = N/l\\), area A: \\(L = \\mu_0 n^{2}Al = \\mu_0 N^{2}A/l\\). Filled with a material: \\(\\mu_0 \\to \\mu_r\\mu_0\\).\n" +
        "- L depends on geometry and on the permeability of the core, not on the current. Doubling N at fixed length makes L four times larger.\n" +
        "- Work is done against the back emf while a current is built up; that work is the stored energy.",
      formula: {
        label: "Self-inductance",
        latex: "\\varepsilon = -L\\frac{dI}{dt} \\qquad L = \\mu_0 n^{2}Al",
      },
      authoredExample: {
        prompt:
          "A solenoid \\(50\\ \\text{cm}\\) long has 2000 turns and a cross-section of \\(4\\ \\text{cm}^{2}\\). Find its inductance, and the emf when its current rises steadily from \\(1\\ \\text{A}\\) to \\(3\\ \\text{A}\\) in \\(0.1\\ \\text{s}\\).",
        steps: [
          "\\(L = \\dfrac{\\mu_0 N^{2}A}{l} = \\dfrac{4\\pi \\times 10^{-7} \\times (2000)^{2} \\times 4 \\times 10^{-4}}{0.5} = 4\\pi \\times 10^{-7} \\times 3200 \\approx 4.02 \\times 10^{-3}\\ \\text{H}\\).",
          "\\(\\dfrac{dI}{dt} = \\dfrac{3 - 1}{0.1} = 20\\ \\text{A/s}\\).",
          "\\(|\\varepsilon| = L\\,\\dfrac{dI}{dt} \\approx 4.02 \\times 10^{-3} \\times 20 \\approx 8.0 \\times 10^{-2}\\ \\text{V}\\).",
        ],
        answer: "\\(L \\approx 4.0\\ \\text{mH}\\); \\(\\varepsilon \\approx 80\\ \\text{mV}\\)",
      },
      selfCheckExample: {
        prompt:
          "The current in a coil changes from \\(+3\\ \\text{A}\\) to \\(-1\\ \\text{A}\\) in \\(0.1\\ \\text{s}\\), and an emf of \\(0.8\\ \\text{V}\\) is induced. Find the self-inductance.",
        steps: [
          "\\(|\\Delta I| = 3 - (-1) = 4\\ \\text{A}\\), so \\(|dI/dt| = 40\\ \\text{A/s}\\).",
          "\\(L = 0.8/40\\).",
        ],
        answer: "\\(20\\ \\text{mH}\\)",
      },
      practiceSet: [
        { prompt: "The current in a \\(25\\ \\text{mH}\\) coil is \\(I = (4t + 2)\\ \\text{A}\\). Emf across it?", answer: "\\(0.1\\ \\text{V}\\)" },
        { prompt: "A \\(2\\ \\text{H}\\) coil carries \\(3\\ \\text{A}\\). The circuit is broken and the current falls to zero in \\(10\\ \\text{ms}\\). Average emf?", answer: "\\(600\\ \\text{V}\\)" },
        { prompt: "A solenoid's turns are doubled, its length and area unchanged. Factor by which L changes?", answer: "4 times" },
        { prompt: "An iron core of relative permeability 400 is slid into an air-cored solenoid. Factor by which L changes?", answer: "400 times" },
      ],
      pyqExampleId: "35d0ea49-819f-46b8-afa7-9b885488bd6f", // 15 Apr 2023: switch opened in 1 ms, emf 20 V
      traps: [
        {
          title: "Change of current across zero",
          body: "A current that goes from −2 A to +2 A changes by 4 A. Taking the difference of the sizes, zero, or forgetting the sign gives the wrong rate.",
        },
        {
          title: "Using the battery emf as the induced emf",
          body: "When a switch opens, the back emf is L × (steady current)/(switching time). It is usually many times the battery's emf; the battery only fixes the current, E/R.",
        },
        {
          title: "Thinking L depends on the current",
          body: "L = NΦ/I is a ratio fixed by the coil's turns, size and core. A larger current gives a larger flux but the same L.",
        },
      ],
    },

    // C2 — mutual inductance
    {
      kind: "formula" as const,
      slug: "jpemi-mutual",
      name: "Mutual inductance of two coils",
      intuition:
        "A current in one coil sends flux through a second, and the flux is proportional to the current: Φ₂ = MI₁. Change I₁ and the second coil gets an emf −M dI₁/dt. M is the same whichever coil carries the current, so always work out the flux through the coil where the field is easiest to know. For a small loop at the centre of a big one, the big loop's field is nearly uniform over the small loop.",
      definition:
        "- \\(N_2\\Phi_2 = MI_1\\); \\(\\varepsilon_2 = -M\\,\\dfrac{dI_1}{dt}\\). With currents in both: \\(\\varepsilon_1 = -L_1\\dfrac{dI_1}{dt} - M\\dfrac{dI_2}{dt}\\).\n" +
        "- Small loop of area a at the centre of a large coplanar loop: \\(M = \\dfrac{B_{\\text{centre}}}{I} \\times a\\).\n" +
        "- Field at the centre of a circle of radius b: \\(\\dfrac{\\mu_0 I}{2b}\\). At the centre of a square of side s: four sides, each \\(\\dfrac{\\mu_0 I}{4\\pi(s/2)}\\cdot 2\\sin 45^{\\circ}\\), total \\(\\dfrac{2\\sqrt2\\,\\mu_0 I}{\\pi s}\\).\n" +
        "- Coil of \\(N_2\\) turns wound on a long solenoid (n turns per metre, area A): \\(M = \\mu_0 n N_2 A\\).\n" +
        "- Coils in series: \\(L = L_1 + L_2 + 2M\\) when their fluxes aid, \\(L_1 + L_2 - 2M\\) when they oppose. Always \\(M \\le \\sqrt{L_1L_2}\\).",
      formula: {
        label: "Mutual inductance",
        latex: "\\varepsilon_2 = -M\\frac{dI_1}{dt} \\qquad M = \\frac{B_{\\text{centre}}}{I}\\,a_{\\text{small}}",
      },
      authoredExample: {
        prompt:
          "A short coil of 50 turns is wound over the middle of a long solenoid with 2000 turns per metre and a cross-section of \\(6\\ \\text{cm}^{2}\\). Find their mutual inductance, and the emf in the coil when the solenoid's current changes at \\(5\\ \\text{A/s}\\).",
        steps: [
          "Inside the solenoid \\(B = \\mu_0 nI\\), and all of it passes through the coil's 50 turns.",
          "\\(M = \\mu_0 nN_2A = 4\\pi \\times 10^{-7} \\times 2000 \\times 50 \\times 6 \\times 10^{-4} = 240\\pi \\times 10^{-7} \\approx 7.5 \\times 10^{-5}\\ \\text{H}\\).",
          "\\(|\\varepsilon| = M\\,\\dfrac{dI}{dt} \\approx 7.54 \\times 10^{-5} \\times 5 \\approx 3.8 \\times 10^{-4}\\ \\text{V}\\).",
        ],
        answer: "\\(M \\approx 75\\ \\mu\\text{H}\\); \\(\\varepsilon \\approx 0.38\\ \\text{mV}\\)",
      },
      selfCheckExample: {
        prompt:
          "A small loop of radius \\(2\\ \\text{cm}\\) lies at the centre of a coplanar loop of radius \\(40\\ \\text{cm}\\). Find their mutual inductance.",
        steps: [
          "Pass current I through the big loop: \\(B = \\dfrac{\\mu_0 I}{2 \\times 0.4}\\) at its centre.",
          "Flux through the small loop: \\(B \\times \\pi(0.02)^{2}\\), so \\(M = \\dfrac{\\mu_0 \\pi (0.02)^{2}}{0.8} = \\dfrac{4\\pi \\times 10^{-7} \\times \\pi \\times 4 \\times 10^{-4}}{0.8}\\).",
          "\\(M = 2\\pi^{2} \\times 10^{-10}\\ \\text{H}\\).",
        ],
        answer: "\\(2\\pi^{2} \\times 10^{-10} \\approx 2.0 \\times 10^{-9}\\ \\text{H}\\)",
      },
      practiceSet: [
        { prompt: "Two coils have \\(M = 0.01\\ \\text{H}\\). The current in the first rises at \\(200\\ \\text{A/s}\\). Emf in the second?", answer: "\\(2\\ \\text{V}\\)" },
        { prompt: "Two coils have \\(M = 5\\ \\text{mH}\\), and the current in the first is \\(4\\sin(100t)\\ \\text{A}\\). Largest emf in the second?", answer: "\\(2\\ \\text{V}\\)" },
        { prompt: "Coils of \\(3\\ \\text{mH}\\) and \\(5\\ \\text{mH}\\) with \\(M = 1\\ \\text{mH}\\) are joined in series. Total inductance if their fluxes aid, and if they oppose?", answer: "\\(10\\ \\text{mH}\\) and \\(6\\ \\text{mH}\\)" },
        { prompt: "Field at the centre of a square loop of side s carrying current I?", answer: "\\(\\dfrac{2\\sqrt2\\,\\mu_0 I}{\\pi s}\\)" },
      ],
      pyqExampleId: "7be54ccd-d283-4a19-a6c8-32547906646c", // 2 Apr 2026 S2: small circle inside a large square
      traps: [
        {
          title: "Working out the flux through the wrong loop",
          body: "M is the same both ways, but only the big loop's field is known simply over the other loop. Pass the current through the big loop and find the flux through the small one.",
        },
        {
          title: "Field at a square's centre",
          body: "Each side is a finite wire at distance s/2, giving μ₀I(2 sin 45°)/(4π · s/2). Four sides make 2√2μ₀I/(πs). Using the formula for an infinite wire overcounts.",
        },
        {
          title: "Sign of 2M in series",
          body: "Coils wound the same way, carrying current the same way round, add 2M. Coils wound in opposite senses subtract 2M. The winding, often shown only in the figure, decides.",
        },
      ],
    },

    // C3 — energy and LR circuits
    {
      kind: "formula" as const,
      slug: "jpemi-energy-lr",
      name: "Energy stored in an inductor and current growth in an LR circuit",
      intuition:
        "Building up a current against the back emf takes work, and that work is stored in the magnetic field: ½LI². It depends only on the final current, not on how it got there. In an LR circuit the inductor stops the current jumping: it grows towards E/R and gets about 63% of the way in one time constant, L/R. Kirchhoff's loop law still holds, with L dI/dt as one more voltage drop.",
      definition:
        "- \\(U = \\tfrac12 LI^{2}\\); energy per unit volume \\(u = \\dfrac{B^{2}}{2\\mu}\\), with \\(\\mu = \\mu_r\\mu_0\\) in a filled solenoid.\n" +
        "- Growth: \\(I = I_0(1 - e^{-t/\\tau})\\), \\(I_0 = E/R\\), \\(\\tau = L/R\\). Decay after the battery is removed: \\(I = I_0e^{-t/\\tau}\\).\n" +
        "- Energy goes as \\(I^{2}\\): a fraction f of the final energy needs \\(I = \\sqrt f\\,I_0\\).\n" +
        "- Loop law: \\(E - L\\dfrac{dI}{dt} - IR = 0\\). If the current is falling, dI/dt is negative and the inductor adds to the battery.\n" +
        "- Rate of storing energy \\(\\dfrac{dU}{dt} = LI\\dfrac{dI}{dt} = I(E - IR)\\).\n" +
        "- Equal inductors in parallel share a current equally; find each one's current before adding energies.",
      formula: {
        label: "Inductor energy and LR growth",
        latex: "U = \\frac12 LI^{2} \\qquad I = \\frac{E}{R}\\left(1 - e^{-tR/L}\\right) \\qquad \\tau = \\frac{L}{R}",
      },
      authoredExample: {
        prompt:
          "A coil with \\(L = 0.5\\ \\text{H}\\) and \\(R = 5\\ \\Omega\\) is connected to a \\(20\\ \\text{V}\\) battery. Find the time constant, the final current and the final stored energy. How long does the current take to reach 75% of its final value?",
        steps: [
          "\\(\\tau = L/R = 0.1\\ \\text{s}\\); \\(I_0 = E/R = 4\\ \\text{A}\\); \\(U = \\tfrac12 \\times 0.5 \\times 16 = 4\\ \\text{J}\\).",
          "\\(1 - e^{-t/\\tau} = 0.75\\) gives \\(e^{-t/\\tau} = 0.25\\), so \\(t = \\tau\\ln 4\\).",
          "\\(t = 0.1 \\times 1.386 \\approx 0.139\\ \\text{s}\\). The energy then is \\((0.75)^{2} \\times 4 = 2.25\\ \\text{J}\\).",
        ],
        answer: "\\(0.1\\ \\text{s}\\), \\(4\\ \\text{A}\\), \\(4\\ \\text{J}\\); about \\(0.14\\ \\text{s}\\)",
      },
      selfCheckExample: {
        prompt:
          "A coil of inductance \\(2\\ \\text{H}\\) and resistance \\(10\\ \\Omega\\) is connected to a \\(50\\ \\text{V}\\) battery. At the instant the current is \\(3\\ \\text{A}\\), find dI/dt and the rate at which energy is being stored in the field.",
        steps: [
          "Loop law: \\(50 - 2\\,\\dfrac{dI}{dt} - 3 \\times 10 = 0\\), so \\(\\dfrac{dI}{dt} = 10\\ \\text{A/s}\\).",
          "\\(\\dfrac{dU}{dt} = LI\\dfrac{dI}{dt} = 2 \\times 3 \\times 10 = 60\\ \\text{W}\\); check: \\(I(E - IR) = 3 \\times 20 = 60\\ \\text{W}\\).",
        ],
        answer: "\\(10\\ \\text{A/s}\\); \\(60\\ \\text{W}\\)",
      },
      practiceSet: [
        { prompt: "Energy stored in a \\(40\\ \\text{mH}\\) inductor carrying \\(5\\ \\text{A}\\)?", answer: "\\(0.5\\ \\text{J}\\)" },
        { prompt: "Magnetic energy density in air where \\(B = 0.1\\ \\text{T}\\)?", answer: "\\(\\approx 4.0 \\times 10^{3}\\ \\text{J/m}^{3}\\)", method: "\\(B^{2}/2\\mu_0 = 0.01/(8\\pi \\times 10^{-7})\\)." },
        { prompt: "A \\(0.2\\ \\text{H}\\), \\(4\\ \\Omega\\) coil carrying \\(3\\ \\text{A}\\) is suddenly shorted (battery removed). Current after \\(0.05\\ \\text{s}\\)?", answer: "\\(3/e \\approx 1.1\\ \\text{A}\\)", method: "\\(\\tau = 0.05\\ \\text{s}\\)." },
        { prompt: "Two identical inductors L in parallel carry a total current I. Total stored energy?", answer: "\\(LI^{2}/4\\)", method: "Each carries I/2: \\(2 \\times \\tfrac12 L(I/2)^{2}\\)." },
      ],
      pyqExampleId: "b5af792e-4f6b-4b0c-8ef7-439caaedfb21", // 2021 Paper 18: L from stored energy, R from power, then τ
      traps: [
        {
          title: "Time constant upside down",
          body: "The time constant is L/R. A bigger inductance makes the current slower to grow; a bigger resistance makes it settle faster, to a smaller value.",
        },
        {
          title: "Energy fraction taken as current fraction",
          body: "Stored energy goes as I². Half the final energy needs I = I₀/√2, and half the final current stores only a quarter of the final energy.",
        },
        {
          title: "Sign of dI/dt for a falling current",
          body: "When the current is decreasing, L dI/dt is negative in E − L dI/dt − IR = 0, so the inductor's emf adds to the battery's and the current can exceed E/R for a moment.",
        },
        {
          title: "Using μ₀ in a filled solenoid",
          body: "With a core of relative permeability μr, the energy density is B²/(2μrμ₀). For the same B, a filled solenoid stores less energy per unit volume than an air-cored one.",
        },
      ],
    },
  ],
};
