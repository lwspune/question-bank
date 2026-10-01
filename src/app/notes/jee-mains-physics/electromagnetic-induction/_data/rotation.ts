import type { SubtopicNote } from "@/app/notes/_types";

export const ROTATION_EMI_NOTE: SubtopicNote = {
  subtopicName: "Rotating Coils, Rods and Discs",
  title: "Rotating Coils, Rods and Discs",
  oneLineDefinition:
    "A coil spinning in a field has an emf NBAω sin ωt, largest when its plane lies along the field; a rod turning about one end sweeps out area and develops ½Bωl², and a disc does the same between its axle and its rim.",
  whyItMatters:
    "Fifteen PYQs, five of them multiple choice, and three from 2026. Seven are a coil spinning in a field, the AC generator, and ask for its peak or instantaneous emf; eight are a rod, disc, fan blade or pendulum wire turning about one end. Of the ten that want a number, six start by turning revolutions per minute or per second into radians per second.",
  concepts: [
    // C1 — the AC generator
    {
      kind: "formula" as const,
      slug: "jpemi-generator",
      name: "Emf of a coil rotating in a magnetic field",
      intuition:
        "As a coil turns at ω about an axis perpendicular to the field, the angle between its normal and the field is ωt, so its flux is NBA cos ωt. The emf is the rate of change of that, NBAω sin ωt. The flux changes fastest when it is passing through zero, so the emf is largest when the coil's plane lies along the field, and zero when the plane faces the field.",
      definition:
        "- \\(\\Phi = NBA\\cos\\omega t\\), \\(\\varepsilon = NBA\\omega\\sin\\omega t\\), peak \\(\\varepsilon_0 = NBA\\omega\\).\n" +
        "- \\(\\omega = 2\\pi f\\); from revolutions per minute, \\(\\omega = 2\\pi \\times \\text{rpm}/60\\). Half a revolution per second is \\(\\pi\\ \\text{rad/s}\\).\n" +
        "- Plane perpendicular to B: flux is greatest, emf zero. Plane parallel to B: flux zero, emf greatest.\n" +
        "- Plane at angle \\(\\alpha\\) to B: the normal is at \\(90^{\\circ} - \\alpha\\), so \\(\\varepsilon = \\varepsilon_0\\cos\\alpha\\).\n" +
        "- A circular coil of radius r: \\(A = \\pi r^{2}\\). The rms value of the emf is \\(\\varepsilon_0/\\sqrt 2\\).",
      formula: {
        label: "AC generator",
        latex: "\\varepsilon = NBA\\omega\\sin\\omega t \\qquad \\varepsilon_0 = NBA\\omega",
      },
      authoredExample: {
        prompt:
          "A coil of 50 turns and area \\(0.04\\ \\text{m}^{2}\\) rotates at 600 rpm about an axis perpendicular to a field of \\(0.5\\ \\text{T}\\). Find the peak emf, and the emf at the instant the plane of the coil makes \\(30^{\\circ}\\) with the field.",
        steps: [
          "\\(\\omega = 2\\pi \\times 600/60 = 20\\pi\\ \\text{rad/s}\\).",
          "\\(\\varepsilon_0 = NBA\\omega = 50 \\times 0.5 \\times 0.04 \\times 20\\pi = 20\\pi \\approx 62.8\\ \\text{V}\\).",
          "Plane at \\(30^{\\circ}\\) to B means the normal is at \\(60^{\\circ}\\): \\(\\varepsilon = \\varepsilon_0\\sin 60^{\\circ} = \\varepsilon_0\\cos 30^{\\circ} = 10\\sqrt3\\,\\pi \\approx 54.4\\ \\text{V}\\).",
        ],
        answer: "\\(20\\pi \\approx 62.8\\ \\text{V}\\); \\(10\\sqrt3\\,\\pi \\approx 54.4\\ \\text{V}\\)",
      },
      selfCheckExample: {
        prompt:
          "A circular coil of 100 turns and radius \\(5\\ \\text{cm}\\) rotates about a diameter at 2 revolutions per second, in a field of \\(0.1\\ \\text{T}\\) perpendicular to the axis. Find the peak emf.",
        steps: [
          "\\(\\omega = 2\\pi \\times 2 = 4\\pi\\ \\text{rad/s}\\); \\(A = \\pi(0.05)^{2} = 2.5\\pi \\times 10^{-3}\\ \\text{m}^{2}\\).",
          "\\(\\varepsilon_0 = 100 \\times 0.1 \\times 2.5\\pi \\times 10^{-3} \\times 4\\pi = 0.1\\pi^{2}\\).",
        ],
        answer: "\\(0.1\\pi^{2} \\approx 0.99\\ \\text{V}\\)",
      },
      practiceSet: [
        { prompt: "Convert 300 rpm to rad/s.", answer: "\\(10\\pi\\ \\text{rad/s}\\)" },
        { prompt: "A generator coil's plane is perpendicular to the field at some instant. What are its flux and emf then?", answer: "Flux NBA (greatest); emf zero" },
        { prompt: "A generator gives \\(\\varepsilon = 100\\sin(100\\pi t)\\ \\text{V}\\). Find the emf at \\(t = 1/600\\ \\text{s}\\).", answer: "\\(50\\ \\text{V}\\)", method: "\\(100\\pi/600 = \\pi/6\\)." },
        { prompt: "A generator's speed of rotation is doubled. By what factor does its peak emf change?", answer: "2 times" },
      ],
      pyqExampleId: "8fad6c0b-e9cd-452b-88b5-b0bcb3bec65e", // 1 Feb 2024: 200-turn coil at half a revolution per second
      traps: [
        {
          title: "Leaving rpm unconverted",
          body: "NBAω needs ω in rad/s. Multiply rpm by 2π/60, and revolutions per second by 2π. Using the raw rpm gives an answer about ten times too big.",
        },
        {
          title: "Zero flux does not mean zero emf",
          body: "When the plane lies along the field, no lines pass through the coil, but the flux is changing fastest. That is the instant of PEAK emf.",
        },
        {
          title: "Angle with the plane versus angle with the normal",
          body: "With the normal at angle θ to B, the emf is ε₀ sin θ. With the plane at angle α to B, it is ε₀ cos α. Check which angle the question gives.",
        },
      ],
    },

    // C2 — rod or disc rotating about one end
    {
      kind: "formula" as const,
      slug: "jpemi-rotating-rod",
      name: "Emf of a rod or disc rotating about one end",
      intuition:
        "A rod turning about one end moves faster the farther out you go: a piece at distance r moves at ωr. Each piece adds B·ωr·dr, and summing from the pivot to the tip gives ½Bωl². Equivalently, the rod sweeps out ½l² of area per radian. A disc is a crowd of such rods side by side, all in parallel, so the emf between axle and rim is the same ½BωR².",
      definition:
        "- Rod about one end, plane of rotation perpendicular to B: \\(\\varepsilon = \\tfrac12 B\\omega l^{2}\\).\n" +
        "- Disc of radius R about its axis along B: \\(\\varepsilon = \\tfrac12 B\\omega R^{2}\\) between axle and rim.\n" +
        "- Pivot inside the rod: each part gives its own emf from the pivot outwards, with the same sign at both ends, so they partly cancel. For parts \\(l_1\\) and \\(l_2\\): \\(\\Delta V_{\\text{ends}} = \\tfrac12 B\\omega(l_1^{2} - l_2^{2})\\).\n" +
        "- Field that varies along the rod: \\(\\varepsilon = \\displaystyle\\int_0^{l} B(r)\\,\\omega r\\,dr\\).\n" +
        "- Earth's field: a horizontal ceiling fan cuts \\(B_V\\); a rod turning in a vertical plane cuts the horizontal component perpendicular to that plane. Fan blades are in parallel between hub and tips, so the emf is that of ONE blade.\n" +
        "- A pendulum's wire is a rod pivoted at the suspension; its greatest ω comes from energy conservation.",
      formula: {
        label: "Rotating rod or disc",
        latex: "\\varepsilon = \\frac12 B\\omega l^{2}",
      },
      authoredExample: {
        prompt:
          "A rod \\(1.5\\ \\text{m}\\) long turns at \\(4\\ \\text{rad/s}\\) about one end, in a plane perpendicular to a field of \\(0.5\\ \\text{T}\\). Find the emf between its ends.",
        steps: [
          "A piece at distance r moves at \\(\\omega r\\), so \\(\\varepsilon = \\displaystyle\\int_0^{l} B\\omega r\\,dr = \\tfrac12 B\\omega l^{2}\\).",
          "\\(\\varepsilon = \\tfrac12 \\times 0.5 \\times 4 \\times (1.5)^{2} = 2.25\\ \\text{V}\\).",
        ],
        answer: "\\(2.25\\ \\text{V}\\)",
      },
      selfCheckExample: {
        prompt:
          "A copper disc of radius \\(10\\ \\text{cm}\\) spins at 1200 rpm with its axis along a field of \\(0.25\\ \\text{T}\\). Find the potential difference between the axle and the rim.",
        steps: [
          "\\(\\omega = 2\\pi \\times 1200/60 = 40\\pi\\ \\text{rad/s}\\).",
          "\\(\\varepsilon = \\tfrac12 \\times 0.25 \\times 40\\pi \\times (0.1)^{2} = 0.05\\pi\\).",
        ],
        answer: "\\(0.05\\pi \\approx 0.157\\ \\text{V}\\)",
      },
      practiceSet: [
        { prompt: "A rod 3 m long turns at \\(2\\ \\text{rad/s}\\) about a point 1 m from one end, in a plane perpendicular to a field of \\(0.4\\ \\text{T}\\). Potential difference between its ends?", answer: "\\(1.2\\ \\text{V}\\)", method: "\\(\\tfrac12 \\times 0.4 \\times 2 \\times (2^{2} - 1^{2})\\)." },
        { prompt: "A ceiling fan blade \\(0.5\\ \\text{m}\\) long turns at 600 rpm where \\(B_V = 3 \\times 10^{-5}\\ \\text{T}\\). Emf between hub and tip?", answer: "\\(7.5\\pi \\times 10^{-5}\\ \\text{V} \\approx 0.24\\ \\text{mV}\\)" },
        { prompt: "A rod of length L turns at ω about one end in a field that grows outwards as \\(B = kr\\). Emf?", answer: "\\(k\\omega L^{3}/3\\)", method: "\\(\\int_0^{L} kr \\cdot \\omega r\\,dr\\)." },
        { prompt: "A fan has 4 identical blades. How does the emf between hub and tips compare with that of one blade?", answer: "The same", method: "The blades are in parallel." },
      ],
      pyqExampleId: "d815fbe2-b54e-4289-bd61-8617c5d96d95", // 15 Apr 2023: rod on a ring at 210 rpm
      traps: [
        {
          title: "Forgetting the half",
          body: "The pieces of a rotating rod move at speeds from zero to ωl, so the average speed is ωl/2. The emf is ½Bωl², not Bωl².",
        },
        {
          title: "Adding the emfs of fan blades",
          body: "Every blade runs from the hub to a tip, so the blades are connected in parallel. The emf between hub and tips is that of one blade, whatever the number of blades.",
        },
        {
          title: "Total field for a horizontal fan",
          body: "A ceiling fan turns in a horizontal plane, so only the vertical component B sin δ is perpendicular to that plane.",
        },
      ],
    },
  ],
};
