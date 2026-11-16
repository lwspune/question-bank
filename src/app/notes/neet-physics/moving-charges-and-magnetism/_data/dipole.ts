import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_MC_DIPOLE_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Moment and the Galvanometer",
  title: "Magnetic Moment and the Galvanometer",
  oneLineDefinition:
    "The magnetic moment m = NIA of a current loop, the torque it feels in a field, and how a moving coil galvanometer works and is turned into an ammeter or a voltmeter.",
  whyItMatters:
    "Four NEET questions from 2021 to 2026. Three ask for magnetic moments: one wire wound as a triangle and as a square (2021), two coils with radii in the ratio 1 : 2 (2025) and a coil whose current is found from its centre field (2026). One finds the shunt that turns a galvanometer into a 10 A ammeter (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphmc-moment",
      name: "Magnetic moment of a current loop and the torque on it",
      intuition:
        "A loop of current behaves like a small bar magnet. How strong a magnet it is depends on the current, the area it wraps round and the number of turns: that product is its magnetic moment. In a uniform field the loop feels no net force, only a turning effect that tries to line its moment up with the field.",
      definition:
        "- Magnetic moment: \\(\\vec{m} = NI\\vec{A}\\), of size \\(m = NIA\\). Its direction is along the normal to the loop, given by the right-hand rule. Unit: A m².\n" +
        "- Torque in a uniform field: \\(\\vec{\\tau} = \\vec{m} \\times \\vec{B}\\), of size \\(\\tau = mB\\sin\\theta\\), where \\(\\theta\\) is the angle between \\(\\vec{m}\\) (the normal) and \\(\\vec{B}\\).\n" +
        "- The net force on a current loop in a uniform field is zero.\n" +
        "- A wire of fixed length L wound into a shape of perimeter p makes \\(N = \\dfrac{L}{p}\\) turns.\n" +
        "- Areas: circle \\(\\pi r^{2}\\), square \\(a^{2}\\), equilateral triangle \\(\\dfrac{\\sqrt{3}}{4}a^{2}\\).",
      formula: {
        label: "Magnetic moment and torque",
        latex: "m = NIA, \\qquad \\vec{\\tau} = \\vec{m} \\times \\vec{B}, \\qquad \\tau = mB\\sin\\theta",
        symbols: [
          { symbol: "\\(N\\)", meaning: "number of turns" },
          { symbol: "\\(A\\)", meaning: "area of one turn" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the moment (the normal to the loop) and the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A circular coil of 50 turns and radius 4 cm carries 0.5 A. Find its magnetic moment, and the torque on it when its moment makes 30° with a 0.2 T field.",
        steps: [
          "\\(m = NI\\pi r^{2} = 50 \\times 0.5 \\times \\pi \\times (0.04)^{2} = 0.04\\pi \\approx 0.126\\) A m².",
          "\\(\\tau = mB\\sin 30^{\\circ} = 0.04\\pi \\times 0.2 \\times 0.5 = 0.004\\pi \\approx 1.26 \\times 10^{-2}\\) N m.",
        ],
        answer: "m ≈ 0.126 A m², τ ≈ \\(1.26 \\times 10^{-2}\\) N m",
      },
      selfCheckExample: {
        prompt:
          "A rectangular loop 10 cm by 5 cm carries 2 A in a uniform 0.5 T field, with the plane of the loop parallel to the field. Find the torque on it.",
        steps: [
          "\\(m = IA = 2 \\times (0.1 \\times 0.05) = 0.01\\) A m².",
          "The plane is parallel to B, so the normal is at 90° to B: \\(\\tau = mB = 0.01 \\times 0.5\\).",
        ],
        answer: "\\(5 \\times 10^{-3}\\) N m",
      },
      practiceSet: [
        { prompt: "Write the magnetic moment of a coil of N turns, each of area A, carrying current I.", answer: "\\(m = NIA\\)" },
        { prompt: "What is the net force on a current loop placed in a uniform magnetic field?", answer: "Zero" },
        { prompt: "At what angle between a loop's magnetic moment and the field is the torque on it zero?", answer: "0° (or 180°)" },
        { prompt: "The current in a circular loop is halved and its radius is doubled. By what factor does its magnetic moment change?", answer: "It doubles" },
      ],
      pyqExampleId: "a8b230e3-6b43-4ea6-806f-1a34819bde97",
      traps: [
        {
          title: "Measure θ from the normal, not the plane",
          body: "In \\(\\tau = mB\\sin\\theta\\), \\(\\theta\\) is the angle between the field and the normal to the loop. A loop whose plane is parallel to the field has \\(\\theta = 90^{\\circ}\\) and the largest torque.",
        },
        {
          title: "The same wire makes more turns of a smaller shape",
          body: "Winding a fixed length of wire into a smaller shape gives more turns, so N changes along with A. Work out \\(N = \\dfrac{L}{p}\\) before using \\(m = NIA\\).",
        },
        {
          title: "Moment goes as the area",
          body: "For the same current and turns, the moment of a circular coil goes as \\(r^{2}\\). Radii in the ratio 1 : 3 give moments in the ratio 1 : 9.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphmc-galvanometer",
      name: "Moving coil galvanometer, ammeter and voltmeter",
      intuition:
        "A galvanometer is a coil hung in a magnetic field. A current makes the coil turn until a spring's twist balances the magnetic torque, so the turn tells you the current. It is very sensitive: a few milliamperes give a full swing. To measure larger currents you send most of the current round it through a small resistance; to measure voltages you put a large resistance in series with it.",
      definition:
        "- The magnetic torque \\(NIAB\\) is balanced by the spring's torque \\(k\\phi\\): \\(\\phi = \\dfrac{NAB}{k}\\,I\\). A radial field (from a soft iron core and curved pole pieces) keeps the torque at \\(NIAB\\) for every deflection.\n" +
        "- **Current sensitivity** \\(\\dfrac{\\phi}{I} = \\dfrac{NAB}{k}\\). **Voltage sensitivity** \\(\\dfrac{\\phi}{V} = \\dfrac{NAB}{kG}\\), where G is the coil's resistance.\n" +
        "- Doubling the turns doubles the current sensitivity but also doubles G, so the voltage sensitivity stays the same.\n" +
        "- **Ammeter:** a small shunt S in **parallel**: \\(S = \\dfrac{I_g G}{I - I_g}\\). An ammeter has a low resistance and goes in series.\n" +
        "- **Voltmeter:** a large resistance R in **series**: \\(R = \\dfrac{V}{I_g} - G\\). A voltmeter has a high resistance and goes in parallel.",
      formula: {
        label: "Galvanometer conversions",
        latex: "\\phi = \\frac{NAB}{k}\\,I, \\qquad S = \\frac{I_g G}{I - I_g}, \\qquad R = \\frac{V}{I_g} - G",
        symbols: [
          { symbol: "\\(I_g\\)", meaning: "current for full-scale deflection" },
          { symbol: "\\(G\\)", meaning: "resistance of the galvanometer coil" },
          { symbol: "\\(k\\)", meaning: "torsion constant of the spring" },
        ],
      },
      authoredExample: {
        prompt:
          "A galvanometer of resistance 50 Ω gives full-scale deflection at 2 mA. What resistance, and connected how, turns it into a voltmeter reading up to 10 V?",
        steps: [
          "At full scale the whole meter carries \\(I_g = 2 \\times 10^{-3}\\) A across 10 V.",
          "\\(R = \\dfrac{V}{I_g} - G = \\dfrac{10}{2 \\times 10^{-3}} - 50 = 5000 - 50\\).",
        ],
        answer: "4950 Ω in series",
      },
      selfCheckExample: {
        prompt:
          "The number of turns on a galvanometer's coil is doubled, with everything else unchanged. What happens to its current sensitivity and its voltage sensitivity?",
        steps: [
          "Current sensitivity \\(\\dfrac{NAB}{k}\\) doubles with N.",
          "The longer coil also has twice the resistance G, so \\(\\dfrac{NAB}{kG}\\) is unchanged.",
        ],
        answer: "Current sensitivity doubles; voltage sensitivity stays the same",
      },
      practiceSet: [
        { prompt: "How is a shunt connected to a galvanometer to make an ammeter?", answer: "In parallel" },
        { prompt: "Should a voltmeter have a high or a low resistance?", answer: "High" },
        { prompt: "Write the current sensitivity of a moving coil galvanometer.", answer: "\\(\\dfrac{NAB}{k}\\)" },
        { prompt: "Why are the pole pieces of a moving coil galvanometer curved, with a soft iron core inside the coil?", answer: "To make the field radial, so the torque is NIAB at every deflection" },
      ],
      pyqExampleId: "140fb30f-422d-473c-80fb-e6c59ac1fd5c",
      traps: [
        {
          title: "The shunt carries I minus the galvanometer current",
          body: "The shunt and the galvanometer share the same voltage: \\(I_g G = (I - I_g)S\\). When \\(I_g\\) is tiny, \\(I - I_g \\approx I\\).",
        },
        {
          title: "Subtract G for a voltmeter",
          body: "The series resistance is \\(\\dfrac{V}{I_g} - G\\), not \\(\\dfrac{V}{I_g}\\): the galvanometer's own resistance is part of the voltmeter.",
        },
        {
          title: "More turns, same voltage sensitivity",
          body: "Adding turns raises the current sensitivity, but the coil's resistance rises in the same ratio, so the voltage sensitivity does not change.",
        },
      ],
    },
  ],
};
