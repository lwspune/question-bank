import type { SubtopicNote } from "@/app/notes/_types";

export const MOTIONAL_EMI_NOTE: SubtopicNote = {
  subtopicName: "Motional EMF: Rods, Rails and Moving Loops",
  title: "Motional EMF: Rods, Rails and Moving Loops",
  oneLineDefinition:
    "A conductor of length l moving at v across a field B develops an emf Blv; on rails the current it drives feels a force B²l²v/R that opposes the motion, and a loop crossing the edge of a field has an emf only while its flux is changing.",
  whyItMatters:
    "Nineteen PYQs, twelve of them multiple choice, and three from 2026. Eight are a single rod, wire or wing cutting the field, often the earth's; six put a rod on rails or pull a loop out of a field and ask for the force, the work or a terminal speed; five follow a loop across the edge of a field or through a field that changes along its path. Ten of them come with a figure.",
  concepts: [
    // C1 — Blv and the earth's field
    {
      kind: "formula" as const,
      slug: "jpemi-moving-rod",
      name: "Motional emf of a moving rod",
      intuition:
        "Charges inside a moving conductor are carried across the field, so each feels a magnetic force qvB along the conductor. They pile up at one end until an electric field stops them, and that leaves an emf Blv between the ends. Only the parts that are mutually perpendicular count: the length across the motion, and the field component across both. In the earth's field, decide which component, horizontal or vertical, the rod actually cuts.",
      definition:
        "- \\(\\varepsilon = Blv\\) when B, l and v are mutually perpendicular; in general \\(\\varepsilon = (\\vec v \\times \\vec B)\\cdot \\vec l\\). A rod moving along its own length, or along B, has no emf.\n" +
        "- Earth's field with total B and dip \\(\\delta\\): \\(B_H = B\\cos\\delta\\), \\(B_V = B\\sin\\delta\\), so \\(B_V = B_H\\tan\\delta\\).\n" +
        "- A horizontal rod moving horizontally (aircraft wings, a rod lying N–S moving east) cuts \\(B_V\\).\n" +
        "- A horizontal E–W wire falling, or a vertical rod moving east or west, cuts \\(B_H\\). A wire falling from rest through h has \\(v = \\sqrt{2gh}\\).\n" +
        "- Rails meeting at a vertex at angle \\(\\alpha\\), bar moving away at constant v: the length between the rails is \\(2vt\\tan(\\alpha/2)\\) for a symmetric V starting at the vertex. Put that length into Blv before deciding how the emf grows with time.\n" +
        "- A block with no circuit still develops a potential difference \\(vBd\\) across the faces separated along \\(\\vec v \\times \\vec B\\).\n" +
        "- Convert km/h with \\(\\times 5/18\\); 1 gauss is \\(10^{-4}\\ \\text{T}\\).",
      formula: {
        label: "Motional emf",
        latex: "\\varepsilon = Blv \\qquad B_V = B\\sin\\delta,\\ B_H = B\\cos\\delta",
      },
      authoredExample: {
        prompt:
          "A horizontal rod 2 m long lies along the north–south line and moves east at \\(15\\ \\text{m/s}\\). The earth's total field there is \\(5 \\times 10^{-5}\\ \\text{T}\\) and the angle of dip is \\(37^{\\circ}\\). Find the emf across the rod. (Take \\(\\sin 37^{\\circ} = 0.6\\).)",
        steps: [
          "The rod points N–S and moves E, so the field component across both is the vertical one.",
          "\\(B_V = 5 \\times 10^{-5} \\times 0.6 = 3 \\times 10^{-5}\\ \\text{T}\\).",
          "\\(\\varepsilon = B_V l v = 3 \\times 10^{-5} \\times 2 \\times 15 = 9 \\times 10^{-4}\\ \\text{V}\\).",
        ],
        answer: "\\(0.9\\ \\text{mV}\\)",
      },
      selfCheckExample: {
        prompt:
          "A horizontal wire 3 m long, lying east–west, is dropped from rest where the horizontal component of the earth's field is \\(4 \\times 10^{-5}\\ \\text{T}\\). Find the emf across it after it has fallen \\(5\\ \\text{m}\\). (Take \\(g = 10\\ \\text{m/s}^{2}\\).)",
        steps: [
          "Speed after falling 5 m: \\(v = \\sqrt{2 \\times 10 \\times 5} = 10\\ \\text{m/s}\\).",
          "An E–W wire falling vertically cuts the horizontal (north) component.",
          "\\(\\varepsilon = 4 \\times 10^{-5} \\times 3 \\times 10 = 1.2 \\times 10^{-3}\\ \\text{V}\\).",
        ],
        answer: "\\(1.2\\ \\text{mV}\\)",
      },
      practiceSet: [
        { prompt: "A rod \\(50\\ \\text{cm}\\) long moves at \\(4\\ \\text{m/s}\\) perpendicular to itself and to a field of \\(0.3\\ \\text{T}\\). Emf?", answer: "\\(0.6\\ \\text{V}\\)" },
        { prompt: "An aircraft with a 20 m wing span flies level at \\(360\\ \\text{km/h}\\) where \\(B_V = 4 \\times 10^{-5}\\ \\text{T}\\). Emf between the wing tips?", answer: "\\(80\\ \\text{mV}\\)", method: "360 km/h is 100 m/s." },
        { prompt: "A metal block moves at \\(3\\ \\text{m/s}\\) through a field of \\(0.2\\ \\text{T}\\) perpendicular to its velocity. Its faces along \\(\\vec v \\times \\vec B\\) are \\(10\\ \\text{cm}\\) apart. Potential difference between them?", answer: "\\(60\\ \\text{mV}\\)" },
        { prompt: "A straight rod moves along its own length through a uniform field. Emf across it?", answer: "Zero" },
      ],
      pyqExampleId: "f44b4d67-7153-4176-9b16-d26b5a71e54a", // 2021 Paper 26: aeroplane wings, total field and dip given
      traps: [
        {
          title: "Using the total field instead of the cut component",
          body: "Aircraft wings and a horizontal rod moving horizontally cut only the vertical component, B sin δ. A falling horizontal wire cuts only the horizontal component, B cos δ.",
        },
        {
          title: "Sine and cosine of the dip swapped",
          body: "The dip is the angle the field makes with the HORIZONTAL. So the horizontal component is B cos δ and the vertical one is B sin δ.",
        },
        {
          title: "Leaving the speed in km/h or the field in gauss",
          body: "Blv gives volts only with tesla, metres and metres per second. 180 km/h is 50 m/s, and 0.5 gauss is 5 × 10⁻⁵ T.",
        },
      ],
    },

    // C2 — rod on rails: current, force, work
    {
      kind: "formula" as const,
      slug: "jpemi-rails-force",
      name: "Force, power and terminal speed for a rod on rails",
      intuition:
        "Once the moving rod closes a circuit, its emf drives a current, and that current in the field feels a force BIl that points against the motion. To keep the speed constant, something must push with exactly that force, and all the work it does turns into heat in the resistance. A rod falling on vertical rails speeds up until this magnetic drag equals its weight.",
      definition:
        "- Current \\(I = \\dfrac{Blv}{R}\\), where l is the length BETWEEN the rails and R the whole circuit's resistance.\n" +
        "- Retarding force \\(F = BIl = \\dfrac{B^{2}l^{2}v}{R}\\); the force to keep a constant speed is equal to it.\n" +
        "- Power \\(P = Fv = \\dfrac{B^{2}l^{2}v^{2}}{R} = I^{2}R\\): the work done becomes heat.\n" +
        "- Falling rod of mass m on smooth vertical rails: terminal speed when \\(mg = \\dfrac{B^{2}l^{2}v_t}{R}\\), so \\(v_t = \\dfrac{mgR}{B^{2}l^{2}}\\).\n" +
        "- Pulling a square loop of side a out of a field slowly and uniformly in time t: \\(v = a/t\\), and the work is \\(\\dfrac{(Bav)^{2}}{R}\\,t\\), the same as F × a. With N turns the emf is N times larger and the work \\(N^{2}\\) times.\n" +
        "- A network on the rails: reduce it to one resistance, then add the rod's own resistance.",
      formula: {
        label: "Rod on rails",
        latex: "I = \\frac{Blv}{R} \\qquad F = \\frac{B^{2}l^{2}v}{R} \\qquad v_t = \\frac{mgR}{B^{2}l^{2}}",
      },
      authoredExample: {
        prompt:
          "A rod slides on rails \\(0.5\\ \\text{m}\\) apart at a steady \\(2\\ \\text{m/s}\\), across a field of \\(0.4\\ \\text{T}\\). The total resistance of the circuit is \\(0.2\\ \\Omega\\). Find the current, the force needed to keep the speed and the power supplied.",
        steps: [
          "\\(\\varepsilon = Blv = 0.4 \\times 0.5 \\times 2 = 0.4\\ \\text{V}\\), so \\(I = 0.4/0.2 = 2\\ \\text{A}\\).",
          "\\(F = BIl = 0.4 \\times 2 \\times 0.5 = 0.4\\ \\text{N}\\).",
          "\\(P = Fv = 0.8\\ \\text{W}\\); check: \\(I^{2}R = 4 \\times 0.2 = 0.8\\ \\text{W}\\).",
        ],
        answer: "\\(2\\ \\text{A}\\), \\(0.4\\ \\text{N}\\), \\(0.8\\ \\text{W}\\)",
      },
      selfCheckExample: {
        prompt:
          "A rod of mass \\(20\\ \\text{g}\\) slides down smooth vertical rails \\(50\\ \\text{cm}\\) apart. A horizontal field of \\(0.4\\ \\text{T}\\) is perpendicular to the plane of the rails, and the circuit's resistance is \\(2\\ \\Omega\\). Find the terminal speed. (Take \\(g = 10\\ \\text{m/s}^{2}\\).)",
        steps: [
          "At terminal speed the magnetic drag equals the weight: \\(v_t = \\dfrac{mgR}{B^{2}l^{2}}\\).",
          "\\(mgR = 0.02 \\times 10 \\times 2 = 0.4\\); \\(B^{2}l^{2} = 0.16 \\times 0.25 = 0.04\\).",
          "\\(v_t = 0.4/0.04\\).",
        ],
        answer: "\\(10\\ \\text{m/s}\\)",
      },
      practiceSet: [
        { prompt: "A rod on rails \\(1\\ \\text{m}\\) apart moves at \\(2\\ \\text{m/s}\\) in a field of \\(0.5\\ \\text{T}\\); the circuit's resistance is \\(5\\ \\Omega\\). Force needed to keep it moving?", answer: "\\(0.1\\ \\text{N}\\)" },
        { prompt: "The speed of a rod on rails is doubled. By what factors do the needed force and the power change?", answer: "Force doubles; power becomes 4 times" },
        { prompt: "A square loop of side \\(10\\ \\text{cm}\\) and resistance \\(0.5\\ \\Omega\\) is pulled slowly and uniformly out of a field of \\(2\\ \\text{T}\\) in \\(0.5\\ \\text{s}\\). Work done?", answer: "\\(1.6 \\times 10^{-3}\\ \\text{J}\\)", method: "\\(v = 0.2\\ \\text{m/s}\\), \\(\\varepsilon = 0.04\\ \\text{V}\\), \\(W = \\varepsilon^{2}t/R\\)." },
        { prompt: "A single-turn loop pulled out of a field needs work W. A 3-turn loop of the same size and the same total resistance is pulled out the same way. Work?", answer: "\\(9W\\)" },
      ],
      pyqExampleId: "a0c60426-9225-4ef8-814f-2c951b9de15e", // 29 Jan 2023: work to pull a square loop out of a field
      traps: [
        {
          title: "Using the rod's length instead of the rail gap",
          body: "Only the part of the rod between the rails carries current. A rod longer than the gap still has l equal to the gap in Blv and in BIl.",
        },
        {
          title: "Forgetting that the force goes as v",
          body: "The magnetic drag B²l²v/R grows with speed. That is why a falling rod reaches a terminal speed instead of accelerating at g for ever.",
        },
        {
          title: "Work done is not the stored energy",
          body: "Pulling a loop out at constant speed stores nothing. All the work appears as heat, I²R t, in the loop's resistance.",
        },
      ],
    },

    // C3 — loop crossing a boundary; non-uniform field
    {
      kind: "formula" as const,
      slug: "jpemi-loop-boundary",
      name: "Loop crossing a field boundary or a non-uniform field",
      intuition:
        "A moving loop has an emf only while the flux through it is changing. Entering a field, one side cuts the field and the emf is Blv; once the loop is fully inside a uniform field, both sides cut it equally and the emfs cancel. In a field that changes from place to place, the two sides sit in different fields, so the net emf is the difference between them.",
      definition:
        "- Partly inside a uniform field: \\(\\varepsilon = Blv\\), with l the side lying across the boundary. Constant at constant speed.\n" +
        "- Fully inside, or fully outside: \\(\\varepsilon = 0\\). Track the front and back edges with \\(x = vt\\).\n" +
        "- A ring crossing a straight boundary: the effective length is the chord on the boundary. When the centre is on the boundary, the chord is the diameter, so \\(\\varepsilon = B(2r)v\\).\n" +
        "- Field varying along x: \\(\\varepsilon = (B_{\\text{front}} - B_{\\text{back}})\\,lv\\), with l the side across the motion. For \\(B = kx\\) and a loop of length a along x, \\(\\varepsilon = kalv\\).\n" +
        "- If the field also changes in time, add \\(A\\,\\dfrac{\\partial B}{\\partial t}\\) to the motional part.",
      formula: {
        label: "Loop in a non-uniform field",
        latex: "\\varepsilon = (B_{\\text{front}} - B_{\\text{back}})\\,lv",
      },
      authoredExample: {
        prompt:
          "A square loop of side \\(10\\ \\text{cm}\\) moves at \\(2\\ \\text{cm/s}\\) into a region \\(30\\ \\text{cm}\\) wide with a uniform field of \\(0.5\\ \\text{T}\\). Its front edge enters at \\(t = 0\\). Find the emf at \\(t = 3\\ \\text{s}\\), \\(8\\ \\text{s}\\) and \\(18\\ \\text{s}\\).",
        steps: [
          "At 3 s the front edge is 6 cm in and the back edge outside: partly in, so \\(\\varepsilon = Blv = 0.5 \\times 0.1 \\times 0.02 = 1\\ \\text{mV}\\).",
          "At 8 s the front edge is at 16 cm and the back edge at 6 cm: fully inside, so \\(\\varepsilon = 0\\).",
          "At 18 s the front edge is at 36 cm, past the far side, and the back edge at 26 cm: leaving, so \\(\\varepsilon = 1\\ \\text{mV}\\) again (current in the opposite sense).",
        ],
        answer: "\\(1\\ \\text{mV}\\), zero, \\(1\\ \\text{mV}\\)",
      },
      selfCheckExample: {
        prompt:
          "A field along z grows along x as \\(B = kx\\) with \\(k = 2\\ \\text{T/m}\\). A rectangular loop with sides \\(0.2\\ \\text{m}\\) along x and \\(0.1\\ \\text{m}\\) along y moves along x at \\(3\\ \\text{m/s}\\). Find the emf in it.",
        steps: [
          "The two sides along y sit 0.2 m apart, so their fields differ by \\(k \\times 0.2 = 0.4\\ \\text{T}\\).",
          "\\(\\varepsilon = (B_{\\text{front}} - B_{\\text{back}})\\,lv = 0.4 \\times 0.1 \\times 3\\).",
        ],
        answer: "\\(0.12\\ \\text{V}\\)",
      },
      practiceSet: [
        { prompt: "A ring of radius \\(0.5\\ \\text{m}\\) moves at \\(2\\ \\text{m/s}\\) into a field of \\(0.4\\ \\text{T}\\) with a straight edge. Emf at the moment its centre is on the edge?", answer: "\\(0.8\\ \\text{V}\\)", method: "Chord = diameter = 1 m." },
        { prompt: "A loop moves at constant speed while staying entirely inside a uniform, steady field. Emf?", answer: "Zero" },
        { prompt: "A rectangular loop with a \\(4\\ \\text{cm}\\) side across the boundary leaves a \\(0.5\\ \\text{T}\\) field at \\(5\\ \\text{cm/s}\\). Emf while it is partly out?", answer: "\\(1\\ \\text{mV}\\)" },
        { prompt: "A loop of area \\(0.04\\ \\text{m}^{2}\\) sits still in a uniform field \\(B = (0.2 + 0.5t)\\ \\text{T}\\) along its normal. Emf?", answer: "\\(0.02\\ \\text{V}\\)" },
      ],
      pyqExampleId: "659c42c3-749d-466b-9be5-d892bd4aa833", // 2021 Paper 6: square loop moving in B = B₀x/a
      traps: [
        {
          title: "An emf while the loop is fully inside",
          body: "Inside a uniform field the flux through a moving loop is constant, so the emf is zero, however fast it moves. The emf appears only while an edge is crossing the boundary.",
        },
        {
          title: "Adding the two sides in a non-uniform field",
          body: "The front and back sides drive current in opposite senses round the loop. Their emfs subtract; the net is the field difference times lv.",
        },
        {
          title: "Using the arc for a ring at an edge",
          body: "For a ring crossing a straight boundary, the effective length is the straight chord along the boundary, not the arc of the ring inside the field.",
        },
      ],
    },
  ],
};
