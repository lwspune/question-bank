import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EI_MOTIONAL_NOTE: SubtopicNote = {
  subtopicName: "Motional Electromotive Force",
  title: "Motional EMF: a Rod Moving in a Magnetic Field",
  oneLineDefinition:
    "The emf Blv across a conductor moving through a magnetic field, explained by the change of flux and by the Lorentz force, the emf of a rod rotating about one end, and the force and power needed to keep a sliding rod moving.",
  whyItMatters:
    "12 questions, seven of them from board papers. The board asks what the emf of a moving arm does not depend on (2023), the emf across a rod moving in the earth's field (2025), the derivation of the emf of a rod rotating about one end (2025), the emf of a rod rotating with one end on a ring (2026), the direction of the force on a second rod (2026), and the current and power needed to move a sliding arm (2023). The textbook adds a falling wire, a loop leaving a field and the spokes of a wheel.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpei-motional-emf",
      name: "Motional emf of a moving rod",
      intuition:
        "A rod sliding across a magnetic field sweeps out area, so the flux through the circuit it is part of keeps changing. You can see the same emf another way: the free charges in the rod move with it, and the magnetic force qvB pushes them along the rod, piling positive charge at one end.",
      definition:
        "- A rod PQ of length l slides with speed v on a rectangular frame, at right angles to a uniform field B. With x the length of the frame enclosed, the flux is \\(\\Phi_B = Blx\\), so \\(|\\varepsilon| = Bl\\dfrac{dx}{dt} = Blv\\). This is the **motional emf**.\n" +
        "- **Lorentz-force view:** a charge q in the rod feels a force qvB along the rod. The work done in moving it the length l is qvBl, and emf is work per unit charge, so \\(\\varepsilon = Blv\\).\n" +
        "- Use only the field component at right angles to both the rod and its velocity. A vertical rod moving horizontally cuts the earth's horizontal component; a horizontal rod lying north to south and moving east cuts the vertical component.\n" +
        "- The emf depends on B, l and v, not on the resistance. The resistance only sets the current, \\(I = Blv/R\\).\n" +
        "- Direction: use Lenz's law on the circuit, or \\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\) on a positive charge in the rod. The end the positive charges are pushed to is at the higher potential.",
      formula: {
        label: "Motional emf",
        latex: "\\varepsilon = Blv",
        symbols: [
          { symbol: "\\(l\\)", meaning: "length of the rod" },
          { symbol: "\\(v\\)", meaning: "speed of the rod, at right angles to the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A metal rod 2 m long lies horizontal, pointing north to south, and is moved east at 12 m/s at a place where the vertical component of the earth's magnetic field is \\(0.5 \\times 10^{-4}\\) T. Find the emf across its ends.",
        steps: [
          "Given: \\(l = 2\\) m, \\(v = 12\\ \\text{m s}^{-1}\\), \\(B_V = 0.5 \\times 10^{-4}\\) T.",
          "The rod points north to south and moves east, so the field component at right angles to both is the vertical one.",
          "Formula: \\(\\varepsilon = B_V l v\\).",
          "Substitution: \\(\\varepsilon = 0.5 \\times 10^{-4} \\times 2 \\times 12 = 1.2 \\times 10^{-3}\\) V.",
        ],
        answer: "\\(1.2 \\times 10^{-3}\\) V (1.2 mV)",
      },
      selfCheckExample: {
        prompt:
          "A rod of length 25 cm slides at 4 m/s on two parallel rails, at right angles to a uniform field of 0.6 T. The circuit resistance is 3 Ω. Find the emf and the current.",
        steps: ["\\(\\varepsilon = Blv = 0.6 \\times 0.25 \\times 4 = 0.6\\) V.", "\\(I = \\dfrac{0.6}{3} = 0.2\\) A."],
        answer: "0.6 V; 0.2 A",
      },
      practiceSet: [
        { prompt: "On which three quantities does the motional emf of a rod depend?", answer: "The field B, the length l and the speed v" },
        { prompt: "A rod of length 0.3 m moves at 2 m/s parallel to a uniform magnetic field. What emf is induced?", answer: "Zero: moving along the field, the rod cuts no field lines" },
        { prompt: "Why does doubling the resistance of a sliding rod not change its emf?", answer: "The emf depends only on B, l and v; resistance changes only the current" },
      ],
      pyqExampleId: "04659a57-6e4f-455d-afa7-3f06a40e8d68",
      traps: [
        {
          title: "The wrong component of the earth's field",
          body: "Pick the component at right angles to both the rod and its velocity. For a vertical rod moving horizontally that is the horizontal component; the vertical component runs along the rod and gives nothing.",
        },
        {
          title: "Leaving gauss as tesla",
          body: "1 G is \\(10^{-4}\\) T. Using gauss as if it were tesla makes the emf ten thousand times too large.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-rotating-rod",
      name: "Emf of a rod rotating about one end",
      intuition:
        "A rod turning about one end does not move at one speed: the pivot is still and the far end is fastest. Each small piece gives its own small emf, and the pieces are in series along the rod, so they add. The average speed is half the speed of the tip, which is where the half in the answer comes from.",
      definition:
        "- **Derivation** (rod of length R turning about one end with angular speed \\(\\omega\\), field B parallel to the axis):\n" +
        "- A piece of length dr at distance r from the axis moves with speed \\(v = \\omega r\\), at right angles to B.\n" +
        "- Its emf is \\(d\\varepsilon = Bv\\,dr = B\\omega r\\,dr\\).\n" +
        "- The pieces are in series, so \\(\\varepsilon = \\displaystyle\\int_0^R B\\omega r\\,dr = \\dfrac{1}{2}B\\omega R^2\\).\n" +
        "- Convert the speed first: \\(\\omega = 2\\pi\\nu\\), with \\(\\nu\\) in revolutions per second. 60 rpm is 1 rev/s, so \\(\\omega = 2\\pi\\) rad/s.\n" +
        "- A wheel with many metal spokes gives the same emf between the axle and the rim as one spoke, because the spokes are in parallel.\n" +
        "- A rod turning about its **centre** gives \\(\\frac{1}{2}B\\omega(l/2)^2\\) between the centre and either end (Board 2024 asked this), and zero between its two ends.",
      formula: {
        label: "Rod rotating about one end",
        latex: "\\varepsilon = \\frac{1}{2}B\\omega R^2",
      },
      authoredExample: {
        prompt:
          "A copper rod 0.8 m long turns at 30 rev/s about an axis through one end, perpendicular to the rod, in a uniform field of 0.25 T parallel to the axis. Find the emf between its ends.",
        steps: [
          "Given: \\(R = 0.8\\) m, \\(\\nu = 30\\) rev/s, \\(B = 0.25\\) T.",
          "Angular speed: \\(\\omega = 2\\pi\\nu = 2\\pi \\times 30 = 188.5\\ \\text{rad s}^{-1}\\).",
          "Formula: \\(\\varepsilon = \\dfrac{1}{2}B\\omega R^2\\).",
          "Substitution: \\(\\varepsilon = \\dfrac{1}{2} \\times 0.25 \\times 188.5 \\times (0.8)^2 = 15.1\\) V.",
        ],
        answer: "About 15.1 V",
      },
      selfCheckExample: {
        prompt: "A rod 40 cm long, pivoted at one end, rotates at 90 rpm in a plane perpendicular to a uniform field of 0.5 T. Find the emf between its ends.",
        steps: [
          "90 rpm is 1.5 rev/s, so \\(\\omega = 2\\pi \\times 1.5 = 3\\pi = 9.42\\ \\text{rad s}^{-1}\\).",
          "\\(\\varepsilon = \\tfrac{1}{2} \\times 0.5 \\times 9.42 \\times (0.4)^2 = 0.38\\) V.",
        ],
        answer: "About 0.38 V",
      },
      practiceSet: [
        { prompt: "Where does the half in the emf of a rotating rod come from?", answer: "The speed rises from zero at the pivot to ωR at the tip, so the average speed is half the tip speed" },
        { prompt: "Convert 300 rpm into rad/s.", answer: "\\(10\\pi \\approx 31.4\\) rad/s" },
        { prompt: "A wheel has 8 metal spokes. How does the emf between axle and rim compare with that of one spoke?", answer: "It is the same; the spokes are in parallel" },
      ],
      pyqExampleId: "505b165d-f1b8-4686-ba91-edd6fdb8e5f2",
      traps: [
        {
          title: "Using the tip speed for the whole rod",
          body: "Writing \\(BRv\\) with \\(v = \\omega R\\) gives \\(B\\omega R^2\\), twice the right answer. The pieces near the pivot move slowly: integrate, or use the half.",
        },
        {
          title: "Taking rpm as rad/s",
          body: "Divide rpm by 60 to get revolutions per second, then multiply by \\(2\\pi\\). 60 rpm is \\(2\\pi\\) rad/s, not 60.",
        },
        {
          title: "Adding the spokes",
          body: "More spokes do not give more emf. They are in parallel between the axle and the rim, so the emf is that of one spoke.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-motional-power",
      name: "Force and power needed to move a sliding rod",
      intuition:
        "Once current flows in the sliding rod, the field pushes on that current, and by Lenz's law the push is backwards. To keep the rod at a steady speed you must push forwards with an equal force. The work you do is exactly the heat produced in the resistance.",
      definition:
        "- Board 2023 asked this twice (the current and the power for a sliding arm). The present NCERT book does not cover the force and power on a moving rod, so give it less time, but learn these lines.\n" +
        "- Current: \\(I = \\dfrac{Blv}{R}\\).\n" +
        "- Opposing force on the rod: \\(F = BIl = \\dfrac{B^2l^2v}{R}\\). You must apply an equal force to keep v steady.\n" +
        "- Power you supply: \\(P = Fv = \\dfrac{B^2l^2v^2}{R}\\).\n" +
        "- Heat produced: \\(I^2R = \\dfrac{B^2l^2v^2}{R}\\), the same, as conservation of energy requires.\n" +
        "- Direction of the current: apply Lenz's law to the circuit. If the rod moves so that the enclosed area grows, the current opposes the increase in flux.",
      formula: {
        label: "Power to move a sliding rod",
        latex: "F = \\frac{B^2 l^2 v}{R}, \\qquad P = \\frac{B^2 l^2 v^2}{R}",
      },
      authoredExample: {
        prompt:
          "A rod of length 20 cm and resistance 0.5 Ω slides at 2 m/s on a frame of negligible resistance, at right angles to a uniform field of 0.3 T. Find the current, the force needed to keep it moving and the power supplied.",
        steps: [
          "Given: \\(l = 0.20\\) m, \\(R = 0.5\\ \\Omega\\), \\(v = 2\\ \\text{m s}^{-1}\\), \\(B = 0.3\\) T.",
          "Emf: \\(\\varepsilon = Blv = 0.3 \\times 0.20 \\times 2 = 0.12\\) V. Current: \\(I = \\dfrac{0.12}{0.5} = 0.24\\) A.",
          "Force: \\(F = BIl = 0.3 \\times 0.24 \\times 0.20 = 1.44 \\times 10^{-2}\\) N.",
          "Power: \\(P = Fv = 1.44 \\times 10^{-2} \\times 2 = 2.88 \\times 10^{-2}\\) W. Check: \\(I^2R = (0.24)^2 \\times 0.5 = 2.88 \\times 10^{-2}\\) W.",
        ],
        answer: "0.24 A; \\(1.44 \\times 10^{-2}\\) N; \\(2.88 \\times 10^{-2}\\) W",
      },
      selfCheckExample: {
        prompt: "A rod on a frame is pushed at twice its earlier steady speed, with everything else the same. By what factor does the power needed change?",
        steps: ["\\(P = \\dfrac{B^2l^2v^2}{R}\\), so P is proportional to \\(v^2\\).", "Doubling v multiplies P by 4."],
        answer: "Four times as large",
      },
      practiceSet: [
        { prompt: "Where does the work done in pulling a rod along a frame at steady speed go?", answer: "It becomes heat in the resistance of the circuit" },
        { prompt: "The frame is broken so no current can flow. With no friction, what force keeps the rod moving at steady speed?", answer: "None. With no current there is no magnetic force on the rod" },
      ],
      pyqExampleId: "6d971be3-b4ac-4292-859d-db01cea14d00",
      traps: [
        {
          title: "Squaring only one quantity",
          body: "The power has \\(B^2\\), \\(l^2\\) and \\(v^2\\) over R. Doubling the speed doubles the emf, the current and the force, so it quadruples the power.",
        },
        {
          title: "A direction with no reason",
          body: "When asked for the direction of the current, give the reason: the area and the flux are increasing, so by Lenz's law the current opposes that increase. Mark the direction on the figure as well.",
        },
      ],
    },
  ],
};
