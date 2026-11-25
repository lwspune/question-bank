import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EI_FARADAY_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Flux and Faraday's Law",
  title: "Magnetic Flux and Faraday's Law of Induction",
  oneLineDefinition:
    "Magnetic flux through a surface, Faraday's law that a changing flux induces an emf, the ways of changing the flux, and the charge that flows round the circuit.",
  whyItMatters:
    "32 questions, twenty-eight of them from board papers. The board asks you to state Faraday's law and describe two ways of producing an induced emf (2026), find the emf or current when the field or flux changes with time (2023, 2024, 2025, 2026), find the flux from a field written in unit vectors (2024, 2026), find the emf when a loop shrinks or is turned (2024, 2026), prove that the induced charge depends only on the change in flux (2024) and find the charge from a graph of current (2026). The textbook adds Faraday's experiments and loops in the earth's field.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpei-flux",
      name: "Magnetic flux",
      intuition:
        "Magnetic flux counts how much magnetic field passes through a surface. Hold a loop face-on to the field and the most field lines pass through it; turn it edge-on and none do. So the flux depends on three things: the field, the area and the angle between them.",
      definition:
        "- **Magnetic flux** through a plane area A in a uniform field B: \\(\\Phi_B = \\vec{B} \\cdot \\vec{A} = BA\\cos\\theta\\), where \\(\\theta\\) is the angle between \\(\\vec{B}\\) and the area vector \\(\\vec{A}\\).\n" +
        "- The area vector is **normal** (at right angles) to the plane of the loop. If the plane makes an angle \\(\\alpha\\) with the field, then \\(\\theta = 90^\\circ - \\alpha\\) and \\(\\Phi_B = BA\\sin\\alpha\\).\n" +
        "- For a field that varies over a surface, add \\(\\vec{B} \\cdot d\\vec{A}\\) over all the small pieces of the surface.\n" +
        "- Flux is a **scalar**. Its SI unit is the **weber** (Wb), equal to T m².\n" +
        "- **Field and flux differ:** the field \\(\\vec{B}\\) is a vector at a point, measured in tesla; the flux is a scalar for a whole surface, measured in weber.\n" +
        "- With a field written in unit vectors, take the dot product with the area vector: only the component of \\(\\vec{B}\\) along the normal counts.",
      formula: {
        label: "Magnetic flux",
        latex: "\\Phi_B = \\vec{B} \\cdot \\vec{A} = BA\\cos\\theta",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the field and the normal to the loop" },
          { symbol: "\\(\\vec{A}\\)", meaning: "area vector, normal to the plane of the loop" },
        ],
      },
      authoredExample: {
        prompt:
          "A rectangular coil 20 cm by 15 cm lies in the x-y plane in a uniform field \\(\\vec{B} = (0.2\\hat{i} + 0.7\\hat{k})\\) T. Find the magnetic flux through it.",
        steps: [
          "Given: area \\(A = 0.20 \\times 0.15 = 0.03\\ \\text{m}^2\\). The coil lies in the x-y plane, so its area vector is \\(\\vec{A} = 0.03\\,\\hat{k}\\ \\text{m}^2\\).",
          "Formula: \\(\\Phi_B = \\vec{B} \\cdot \\vec{A}\\).",
          "Substitution: \\(\\Phi_B = (0.2\\hat{i} + 0.7\\hat{k}) \\cdot (0.03\\,\\hat{k}) = 0.7 \\times 0.03\\). The \\(\\hat{i}\\) part lies in the plane of the coil and gives nothing.",
          "Answer: \\(\\Phi_B = 2.1 \\times 10^{-2}\\) Wb.",
        ],
        answer: "\\(2.1 \\times 10^{-2}\\) Wb",
      },
      selfCheckExample: {
        prompt:
          "A circular loop of area 0.05 m² is held in a uniform field of 0.2 T so that its plane makes an angle of 30° with the field. Find the flux through it.",
        steps: [
          "The angle between the field and the normal is \\(90^\\circ - 30^\\circ = 60^\\circ\\).",
          "\\(\\Phi = BA\\cos 60^\\circ = 0.2 \\times 0.05 \\times \\tfrac{1}{2} = 5 \\times 10^{-3}\\) Wb.",
        ],
        answer: "\\(5 \\times 10^{-3}\\) Wb",
      },
      practiceSet: [
        { prompt: "What is the SI unit of magnetic flux?", answer: "The weber (Wb), equal to T m²" },
        { prompt: "A loop lies with its plane parallel to a uniform magnetic field. What is the flux through it?", answer: "Zero, because the field is at 90° to the area vector" },
        { prompt: "Is magnetic flux a scalar or a vector?", answer: "A scalar" },
        { prompt: "A coil of area 0.02 m² is held with its plane perpendicular to a field of 0.3 T. Find the flux through it.", answer: "\\(6 \\times 10^{-3}\\) Wb" },
      ],
      pyqExampleId: "9afed222-28f3-49e0-b61a-fc07fdf2b97c",
      traps: [
        {
          title: "Measuring the angle from the plane",
          body: "The \\(\\theta\\) in \\(BA\\cos\\theta\\) is the angle between the field and the NORMAL to the loop. If the question gives the angle between the field and the plane of the loop, the flux is \\(BA\\sin\\) of that angle. Board 2025 set exactly this as an MCQ.",
        },
        {
          title: "Leaving the area in cm²",
          body: "1 cm² is \\(10^{-4}\\ \\text{m}^2\\), not \\(10^{-2}\\). A loop 4 cm by 6 cm has an area of \\(2.4 \\times 10^{-3}\\ \\text{m}^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-faraday-law",
      name: "Faraday's law of electromagnetic induction",
      intuition:
        "An emf appears in a coil only while the flux through it is changing. A huge steady flux gives nothing; a small flux that changes quickly gives a large emf. Faraday found this with magnets and coils: move the magnet and the galvanometer needle kicks, hold it still and the needle returns to zero.",
      definition:
        "- **Statement:** the magnitude of the induced emf in a circuit is equal to the time rate of change of magnetic flux through the circuit.\n" +
        "- \\(\\varepsilon = -\\dfrac{d\\Phi_B}{dt}\\); for a closely wound coil of N turns, \\(\\varepsilon = -N\\dfrac{d\\Phi_B}{dt}\\). The minus sign gives the direction of the emf (Lenz's law, on the next page).\n" +
        "- **Faraday's experiments:** a magnet moved towards or away from a coil; a current-carrying coil moved towards or away from a second coil; a current switched on or off in a nearby coil. Each time the galvanometer deflects only while the flux is changing.\n" +
        "- **Two methods of producing an induced emf:** change the magnetic field through a fixed coil (move a magnet, or change the current in a nearby coil); or move, shrink or rotate the coil in a steady field, which changes its area or its angle.\n" +
        "- When only B changes: \\(|\\varepsilon| = NA\\dfrac{dB}{dt}\\). When the flux or field is given as a function of time, differentiate first, then put in the value of t.\n" +
        "- The induced current in a circuit of resistance R is \\(I = |\\varepsilon|/R\\). More turns give a larger emf.\n" +
        "- The rate of change of flux is an emf, so its dimensions are those of potential, \\([\\text{M L}^2\\text{T}^{-3}\\text{A}^{-1}]\\).",
      formula: {
        label: "Faraday's law",
        latex: "\\varepsilon = -N\\,\\frac{d\\Phi_B}{dt}",
      },
      authoredExample: {
        prompt:
          "A coil of 50 turns, each of area 0.02 m², lies with its plane perpendicular to a magnetic field that varies as \\(B = (3t^2 + 7)\\) T, with t in seconds. The coil has a resistance of 8 Ω. Find the induced emf and current at t = 2 s.",
        steps: [
          "Given: \\(N = 50\\), \\(A = 0.02\\ \\text{m}^2\\), \\(R = 8\\ \\Omega\\). The area and the angle are fixed, so only B changes.",
          "Formula: \\(|\\varepsilon| = NA\\dfrac{dB}{dt}\\).",
          "\\(\\dfrac{dB}{dt} = 6t\\), so at t = 2 s, \\(\\dfrac{dB}{dt} = 12\\ \\text{T s}^{-1}\\).",
          "Substitution: \\(|\\varepsilon| = 50 \\times 0.02 \\times 12 = 12\\) V.",
          "Current: \\(I = \\dfrac{12}{8} = 1.5\\) A.",
        ],
        answer: "emf 12 V; current 1.5 A",
      },
      selfCheckExample: {
        prompt: "The flux through a coil changes with time as \\(\\Phi = (2t^3 + t)\\) Wb, with t in seconds. Find the induced emf at t = 1 s.",
        steps: ["\\(\\dfrac{d\\Phi}{dt} = 6t^2 + 1\\).", "At t = 1 s: \\(6 + 1 = 7\\), so \\(|\\varepsilon| = 7\\) V."],
        answer: "7 V",
      },
      practiceSet: [
        { prompt: "The flux through a coil stays at 2 Wb for a whole minute. What emf is induced in that time?", answer: "Zero, because the flux is not changing" },
        { prompt: "What does the minus sign in Faraday's law tell you?", answer: "The direction of the induced emf: it opposes the change in flux (Lenz's law)" },
        { prompt: "The flux through each turn of a 300-turn coil changes by 0.01 Wb in 0.1 s. Find the average emf.", answer: "30 V" },
        { prompt: "Give two ways of producing an induced emf in a coil.", answer: "Change the magnetic field through it (move a magnet or change a nearby current), or move or rotate the coil in a steady field" },
      ],
      pyqExampleId: "09ae0b09-51d2-4d5d-b205-94af3ccc7ead",
      traps: [
        {
          title: "Putting in t before differentiating",
          body: "Find \\(dB/dt\\) or \\(d\\Phi/dt\\) as an expression first, then substitute the time. Putting t in first turns the flux into a number, and the derivative of a number is zero.",
        },
        {
          title: "Large flux means large emf",
          body: "The emf depends on how fast the flux changes, not on how much flux there is. A strong steady field induces nothing. Board 2026 set this as an assertion-reason item in which both statements were false.",
        },
        {
          title: "The law without its key words",
          body: "Say 'the time rate of change of magnetic flux through the circuit'. 'The emf equals the change in flux' leaves out the time and loses the mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-area-angle",
      name: "Changing the area or the angle of a loop",
      intuition:
        "The flux \\(BA\\cos\\theta\\) also changes when the field stays fixed. Shrink or stretch the loop and its area changes; turn it and the angle changes; slide it out of a field region and the area inside the field changes. Each of these induces an emf. When the change takes a time \\(\\Delta t\\), the average emf is the change in flux divided by \\(\\Delta t\\).",
      definition:
        "- Average emf: \\(\\varepsilon_{av} = N\\dfrac{|\\Phi_f - \\Phi_i|}{\\Delta t}\\).\n" +
        "- **Area changing** in a steady field, loop face-on: \\(|\\varepsilon| = B\\dfrac{dA}{dt}\\). For a circle of radius r, \\(\\dfrac{dA}{dt} = 2\\pi r\\dfrac{dr}{dt}\\).\n" +
        "- **Angle changing:** the flux goes from \\(BA\\cos\\theta_1\\) to \\(BA\\cos\\theta_2\\). Turning a face-on coil through 90° takes its flux from BA to zero; turning it through 180° takes it from BA to \\(-BA\\), a change of 2BA.\n" +
        "- **Loop moving through a field region:** the flux is B times the part of the loop's area inside the field. An emf exists only while that part is growing or shrinking.\n" +
        "- The earth's field also passes through a loop, but it is steady, so it adds no emf to a loop that does not move or turn.",
      formula: {
        label: "Average emf",
        latex: "\\varepsilon_{av} = N\\,\\frac{|\\Phi_f - \\Phi_i|}{\\Delta t}, \\qquad \\Phi = BA\\cos\\theta",
      },
      authoredExample: {
        prompt:
          "A circular coil of 100 turns and area 0.04 m² lies with its plane perpendicular to a uniform field of 0.25 T. It is turned through 180° in 0.2 s. Find the average emf induced.",
        steps: [
          "Given: \\(N = 100\\), \\(A = 0.04\\ \\text{m}^2\\), \\(B = 0.25\\) T, \\(\\Delta t = 0.2\\) s.",
          "Initial flux through one turn: \\(\\Phi_i = BA\\cos 0^\\circ = 0.25 \\times 0.04 = 0.01\\) Wb.",
          "Final flux: \\(\\Phi_f = BA\\cos 180^\\circ = -0.01\\) Wb, so \\(|\\Phi_f - \\Phi_i| = 0.02\\) Wb.",
          "\\(\\varepsilon_{av} = N\\dfrac{|\\Delta\\Phi|}{\\Delta t} = \\dfrac{100 \\times 0.02}{0.2} = 10\\) V.",
        ],
        answer: "10 V",
      },
      selfCheckExample: {
        prompt:
          "A square loop of side 20 cm lies face-on in a uniform field of 0.3 T. In 0.5 s it is squeezed into a shape of area 0.02 m², still face-on. Find the average emf.",
        steps: [
          "Area falls from \\(0.04\\ \\text{m}^2\\) to \\(0.02\\ \\text{m}^2\\), a change of \\(0.02\\ \\text{m}^2\\).",
          "\\(\\varepsilon_{av} = \\dfrac{B\\,\\Delta A}{\\Delta t} = \\dfrac{0.3 \\times 0.02}{0.5} = 0.012\\) V.",
        ],
        answer: "0.012 V (12 mV)",
      },
      practiceSet: [
        { prompt: "A coil lying face-on to a field is turned through 90°. What is its final flux?", answer: "Zero" },
        { prompt: "A coil with flux BA through it is turned through 180°. What is the change in flux?", answer: "2BA" },
        { prompt: "A loop moves at steady speed while wholly inside a uniform field. Is an emf induced?", answer: "No. The flux through it does not change" },
      ],
      pyqExampleId: "b699d413-2a0b-4ff0-9a98-246ebb51e064",
      traps: [
        {
          title: "Taking the change as BA for a half turn",
          body: "Turning a coil through 180° reverses its flux, so the change is 2BA, not BA. This doubles the emf.",
        },
        {
          title: "Using the whole loop when part of it is outside",
          body: "Only the part of the loop inside the field carries flux. While a loop enters or leaves a field region, use B times the area that is inside.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-induced-charge",
      name: "Induced charge depends only on the change in flux",
      intuition:
        "Change the flux quickly and you get a large current for a short time; change it slowly and you get a small current for a long time. The charge that flows, current times time, comes out the same. It depends only on how much the flux changed and on the resistance.",
      definition:
        "- **To show** that the induced charge depends only on the change in flux:\n" +
        "- Faraday's law: \\(|\\varepsilon| = N\\dfrac{\\Delta\\Phi}{\\Delta t}\\).\n" +
        "- Ohm's law: \\(I = \\dfrac{|\\varepsilon|}{R} = \\dfrac{N}{R}\\dfrac{\\Delta\\Phi}{\\Delta t}\\).\n" +
        "- Charge: \\(\\Delta q = I\\,\\Delta t = \\dfrac{N}{R}\\dfrac{\\Delta\\Phi}{\\Delta t}\\,\\Delta t\\).\n" +
        "- So \\(\\Delta q = \\dfrac{N\\,\\Delta\\Phi}{R}\\). The time \\(\\Delta t\\) cancels, so the charge does not depend on how fast the flux changed.\n" +
        "- From a graph of induced current against time, the charge is the **area** under the graph; then \\(\\Delta\\Phi = qR/N\\).",
      formula: {
        label: "Induced charge",
        latex: "q = \\frac{N\\,\\Delta\\Phi}{R}",
      },
      authoredExample: {
        prompt:
          "A coil of 50 turns, each of area 0.02 m², and total resistance 5 Ω lies face-on in a uniform field of 0.4 T. It is pulled quickly out of the field. Find the charge that flows round the coil.",
        steps: [
          "Given: \\(N = 50\\), \\(A = 0.02\\ \\text{m}^2\\), \\(R = 5\\ \\Omega\\), \\(B = 0.4\\) T.",
          "Change in flux through one turn: \\(\\Delta\\Phi = BA - 0 = 0.4 \\times 0.02 = 8 \\times 10^{-3}\\) Wb.",
          "Formula: \\(q = \\dfrac{N\\,\\Delta\\Phi}{R}\\).",
          "Substitution: \\(q = \\dfrac{50 \\times 8 \\times 10^{-3}}{5} = 0.08\\) C. The speed of pulling does not matter.",
        ],
        answer: "0.08 C",
      },
      selfCheckExample: {
        prompt:
          "The induced current in a loop of resistance 2 Ω falls steadily from 0.4 A to zero in 0.5 s. Find the charge that flows and the change in flux through the loop.",
        steps: [
          "The current graph is a triangle: \\(q = \\tfrac{1}{2} \\times 0.5 \\times 0.4 = 0.1\\) C.",
          "\\(\\Delta\\Phi = qR = 0.1 \\times 2 = 0.2\\) Wb.",
        ],
        answer: "0.1 C; 0.2 Wb",
      },
      practiceSet: [
        { prompt: "Does the charge induced in a coil depend on how quickly the flux changes?", answer: "No. It depends only on the change in flux, the turns and the resistance" },
        { prompt: "The flux through a single loop of resistance 4 Ω changes by 0.02 Wb. Find the charge that flows.", answer: "\\(5 \\times 10^{-3}\\) C" },
        { prompt: "What does the area under a graph of induced current against time give?", answer: "The charge that flowed" },
      ],
      pyqExampleId: "44ac4757-45d3-49a0-bda0-71573be98dd1",
      traps: [
        {
          title: "Peak current times time",
          body: "When the current falls steadily to zero, the graph is a triangle and the charge is half the peak current times the time. The full product doubles the answer.",
        },
        {
          title: "Leaving out N",
          body: "For a coil the charge is \\(N\\Delta\\Phi/R\\). Using the flux of one turn alone gives an answer N times too small.",
        },
      ],
    },
  ],
};
