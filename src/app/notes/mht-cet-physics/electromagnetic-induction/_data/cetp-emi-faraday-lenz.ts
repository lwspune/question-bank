import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/electromagnetic-induction";

export const FARADAY_LENZ_NOTE: SubtopicNote = {
  subtopicName: "Faraday's and Lenz's Laws — Induced EMF, Current, and Charge",
  title: "Faraday's Law, Lenz's Law and Induced Charge",
  oneLineDefinition:
    "Magnetic flux is B·A; whenever the flux through a circuit changes, an e.m.f. equal to the rate of change of flux linkage is induced (Faraday), in the direction that opposes the change (Lenz), and the charge that flows depends only on the total change in flux and the resistance, not on how fast it happened.",
  whyItMatters:
    "22 PYQs, none HARD. Fifteen are Faraday's law with numbers — flux given as a function of time, a coil pulled out of a field, a field cut to a quarter, the charge that flows; seven are Lenz's law — a magnet falling through a ring, a cut ring or a pipe, the direction of the current in a ring falling towards a wire, and why Lenz's law is energy conservation. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-emi-flux-faraday",
      name: "Flux, Faraday's Law and Induced Charge",
      intuition:
        "Flux counts the field lines through an area: φ = B·A = BA cos θ, so a field component lying IN the plane of a coil passes through nothing. Faraday's law says the e.m.f. equals the rate of change of flux linkage, e = N dφ/dt. If φ is given as a function of time, differentiate; if a coil is simply pulled out of a field in time t, the average e.m.f. is NBA/t. The current is e/R. And the CHARGE that flows is current × time = NΔφ/R — the time cancels, so a fast or a slow pull moves the same charge.",
      definition:
        "- **Flux** \\(\\phi = \\vec B \\cdot \\vec A\\): a square of side L in the x–y plane in \\(\\vec B = B_0(2\\hat i + 3\\hat j + 4\\hat k)\\) links only the \\(\\hat k\\) part, \\(4B_0L^2\\).\n" +
        "- **Faraday**: \\(e = -N\\dfrac{d\\phi}{dt}\\); average \\(e = \\dfrac{N\\,\\Delta\\phi}{t}\\). \\(\\phi = 50t^2 + 4\\) ⇒ \\(e = 100t\\).\n" +
        "- **Current** \\(I = \\dfrac{e}{R_{\\text{total}}}\\) (include any series resistance: coil R plus R/2 gives 3R/2).\n" +
        "- **Charge** \\(q = \\dfrac{N\\,\\Delta\\phi}{R}\\): depends on the total change of flux, not its rate.\n" +
        "- Field falling to 25% of B in time t: \\(e = \\dfrac{3BA}{4t}\\).",
      formula: {
        label: "Faraday's law and induced charge",
        latex: "e = -N\\frac{d\\phi}{dt}, \\qquad q = \\frac{N\\,\\Delta\\phi}{R}",
      },
      authoredExample: {
        prompt: "A 40-turn coil of area 50 cm² lies normal to a 0.05 T field and is pulled out in 0.02 s. Coil resistance 5 Ω. Average e.m.f. and charge that flows?",
        steps: [
          "NΔφ = 40 × 0.05 × 50 × 10⁻⁴ = 0.01 Wb.",
          "e = 0.01/0.02 = 0.5 V; q = 0.01/5 = 2 × 10⁻³ C.",
        ],
        answer: "0.5 V; 2 mC",
      },
      selfCheckExample: {
        prompt: "The flux through a loop of resistance 10 Ω is φ = 6t² + 7t + 1 mWb. The e.m.f. at t = 1 s?",
        steps: ["dφ/dt = 12t + 7 = 19 mWb/s."],
        answer: "19 mV",
      },
      practiceSet: [
        { prompt: "Flux falls from 4 × 10⁻⁴ Wb to 30% of that; the e.m.f. is 0.56 mV. Time taken?", answer: "0.5 s" },
        { prompt: "A 50-turn coil of area 100 cm² in 2 × 10⁻² T is removed in time t with average e.m.f. 0.1 V. t?", answer: "0.1 s" },
        { prompt: "Charge through a circuit of resistance R when its flux changes by Δφ?", answer: "Δφ/R" },
      ],
      pyqExampleId: "903810d8-d87e-4953-82f5-a3ae145180f7",
      traps: [
        {
          title: "Thinking a faster change moves more charge",
          body:
            "A faster change gives a bigger e.m.f. and current, but for less time. The charge q = NΔφ/R is the same however quickly the flux changes.",
        },
        {
          title: "Using the whole field for the flux",
          body:
            "Only the component of B perpendicular to the coil passes through it. For a square in the x–y plane, \\(B = B_0(2\\hat{i} + 3\\hat{j} + 4\\hat{k})\\) gives 4B₀L², not √29 B₀L².",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetp-emi-lenz",
      name: "Lenz's Law: the Induced Current Opposes the Change",
      intuition:
        "The induced current always pushes back against whatever changes the flux. A magnet falling through a closed ring is braked, so it falls with less than g; a hollow metal pipe does the same through eddy currents. A ring with a CUT carries no current, so the magnet falls freely at g. A ring falling towards a wire whose field points out of the page above it sees that outward flux grow, so its current makes an inward field — clockwise. And if the coil and magnet move together, nothing changes and nothing is induced. This opposition is why Lenz's law is the law of conservation of energy in disguise: you must do work to push against it.",
      definition:
        "- **Closed ring or metal pipe**, magnet dropped through: acceleration **less than g**. **Cut ring**: exactly **g** (e.m.f. but no current).\n" +
        "- **Coil and magnet moving together**: no relative motion, **zero** e.m.f.\n" +
        "- **Ring falling towards a straight current** (field out of the page above the wire): induced current **clockwise**.\n" +
        "- **North pole moving away** from a loop: the induced current tries to keep the flux, attracting the magnet back.\n" +
        "- Lenz's law is a statement of **conservation of energy**.",
      table: {
        columns: ["Situation", "Induced effect"],
        rows: [
          { cells: ["Magnet dropped through a closed ring or pipe", "falls with acceleration less than g"] },
          { cells: ["Magnet dropped through a cut ring", "falls with g — no current"], noteAmber: "An e.m.f. is still induced across the cut." },
          { cells: ["Coil and magnet moving together", "no e.m.f."] },
          { cells: ["Flux into a loop increasing", "current makes a field out of it"] },
          { cells: ["Flux into a loop decreasing", "current makes a field into it"] },
        ],
        caption: "The induced current opposes the CHANGE in flux, not the flux itself.",
      },
      selfCheckExample: {
        prompt: "A bar magnet is dropped through a copper ring held horizontally. Its acceleration while passing through?",
        steps: ["The induced current opposes the motion."],
        answer: "Less than g",
      },
      practiceSet: [
        { prompt: "The ring has a cut. The magnet's acceleration?", answer: "g" },
        { prompt: "Which law expresses conservation of energy: Kirchhoff's first, Lenz's, Ampere's, Gauss's?", answer: "Lenz's law" },
      ],
      pyqExampleId: "ac369739-24df-41a1-9d5e-827f783e33e2",
      traps: [
        {
          title: "Opposing the flux instead of its change",
          body:
            "When the flux is DECREASING, the induced current tries to keep it — its field points the SAME way as the original. It opposes the change, not the field.",
        },
      ],
    },
  ],
  related: [
    { label: "Motional e.m.f. — the same law for a moving conductor", href: `${BASE}/cetp-emi-motional` },
  ],
};
