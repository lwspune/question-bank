import type { SubtopicNote } from "@/app/notes/_types";

export const LOADED_SOLID_NOTE: SubtopicNote = {
  subtopicName: "Loaded Wires, Combinations and Breaking Stress",
  title: "Loaded Wires, Combinations and Breaking Stress",
  oneLineDefinition:
    "Before using ΔL = TL/(AY), find the tension each wire really carries: the same in wires joined end to end, everything below it in a hanging stack, and the result of a force balance when the load accelerates, swings or hangs by its own weight.",
  whyItMatters:
    "Nineteen PYQs, nine of them asking for a number, and five from 2026. Seven join wires end to end or stack loads, six find the load at which a wire breaks, and six take the tension from mechanics first: a wire's own weight, a sagging wire, a circle or blocks on a pulley. The elasticity is one line; the marks go on the tension.",
  concepts: [
    // C1 — series wires and stacked loads
    {
      kind: "formula" as const,
      slug: "jpsolid-wire-combinations",
      name: "Wires in series and stacked loads",
      intuition:
        "Follow the tension. Wires joined end to end carry the same tension, and their extensions add. In a hanging stack, each wire holds everything below it: the top wire carries every block, the lower one only what hangs from it. Once each tension is known, every wire is a separate ΔL = TL/(AY).",
      definition:
        "- End to end (series): the same tension T in both, and \\(\\Delta L = T\\left(\\dfrac{L_1}{A_1Y_1} + \\dfrac{L_2}{A_2Y_2}\\right)\\).\n" +
        "- Two wires of equal length and area joined end to end: \\(Y_{eq} = \\dfrac{2Y_1Y_2}{Y_1 + Y_2}\\).\n" +
        "- Equal areas in series with equal extensions: \\(L \\propto Y\\).\n" +
        "- Stacked loads: the tension in a wire is the weight of everything hanging below it.\n" +
        "- Then strain \\(\\propto T/A\\) and extension \\(\\propto TL/(AY)\\), wire by wire.",
      formula: {
        label: "Series wires",
        latex: "\\Delta L = T\\left(\\frac{L_1}{A_1Y_1} + \\frac{L_2}{A_2Y_2}\\right) \\qquad Y_{eq} = \\frac{2Y_1Y_2}{Y_1 + Y_2}",
      },
      authoredExample: {
        prompt:
          "A wire 1.5 m long hangs from the ceiling and holds a 4 kg block. A second wire, 1 m long, of the same material and cross-section, hangs from that block and holds a 2 kg block. The wires are light. Find the ratio of the upper wire's extension to the lower wire's.",
        steps: [
          "The upper wire holds both blocks: \\(T_{up} = 6g\\). The lower wire holds only the 2 kg block: \\(T_{low} = 2g\\).",
          "Same A and Y, so \\(\\Delta L \\propto TL\\).",
          "\\(\\dfrac{\\Delta L_{up}}{\\Delta L_{low}} = \\dfrac{6g \\times 1.5}{2g \\times 1} = 4.5\\).",
        ],
        answer: "9 : 2",
      },
      selfCheckExample: {
        prompt:
          "A steel wire 2 m long \\((Y = 2 \\times 10^{11}\\ \\text{N/m}^{2})\\) and a copper wire 1 m long \\((Y = 1 \\times 10^{11}\\ \\text{N/m}^{2})\\), both of area \\(1\\ \\text{mm}^{2}\\), are joined end to end and stretched by 100 N. Find the total extension.",
        steps: [
          "Steel: \\(\\dfrac{100 \\times 2}{10^{-6} \\times 2 \\times 10^{11}} = 10^{-3}\\ \\text{m}\\).",
          "Copper: \\(\\dfrac{100 \\times 1}{10^{-6} \\times 10^{11}} = 10^{-3}\\ \\text{m}\\).",
          "The extensions add: \\(2 \\times 10^{-3}\\ \\text{m}\\).",
        ],
        answer: "2 mm",
      },
      practiceSet: [
        { prompt: "Two wires of equal length and area, \\(Y_1 = 1 \\times 10^{11}\\) and \\(Y_2 = 3 \\times 10^{11}\\ \\text{N/m}^{2}\\), are joined end to end. Equivalent Y?", answer: "\\(1.5 \\times 10^{11}\\ \\text{N/m}^{2}\\)" },
        { prompt: "Wires A and B of equal area, joined end to end, stretch equally. \\(Y_A/Y_B = 3/2\\) and \\(L_A = 1.5\\) m. Find \\(L_B\\).", answer: "1 m", method: "\\(L \\propto Y\\)." },
        { prompt: "An upper wire holds a 3 kg block, and an identical lower wire hangs from it holding 1 kg. Ratio of their strains, upper to lower?", answer: "4 : 1" },
        { prompt: "Two wires of one material but different areas are joined end to end and stretched. Which has the larger strain?", answer: "The thinner one: same tension, smaller area" },
      ],
      pyqExampleId: "5753a07d-4eb5-4ad0-9f43-6dc5d845b2c7", // 4 Apr 2026 Shift 2: blocks M and 2M on strings A and B
      traps: [
        {
          title: "The upper wire carries more than its own block",
          body: "It holds every block and wire below it. Giving it only the block attached to it is the commonest wrong option.",
        },
        {
          title: "Series wires share tension, not strain",
          body: "Joined end to end, the wires have the same tension. Their strains and extensions differ unless their areas, lengths and moduli match.",
        },
      ],
    },

    // C2 — breaking stress
    {
      kind: "formula" as const,
      slug: "jpsolid-breaking-stress",
      name: "Breaking stress: the largest load a wire can hold",
      intuition:
        "A wire breaks when its stress reaches the breaking stress, so the largest tension it can carry is the breaking stress times its area. The breaking stress belongs to the material: a thicker wire holds more only because it has more area. With several wires, test each one; the first to reach its limit sets the answer.",
      definition:
        "- \\(T_{max} = \\sigma_b A\\), where \\(\\sigma_b\\) is the breaking stress of the material.\n" +
        "- Capacity grows with area: to lift a load W₂ instead of W₁, \\(A_2 = A_1 W_2/W_1\\).\n" +
        "- A load accelerating upward: \\(T - mg = ma\\), so \\(a_{max} = \\dfrac{\\sigma_b A}{m} - g\\).\n" +
        "- Stacked wires: write each wire's tension in terms of the unknown load, apply each wire's own limit, and keep the smallest answer.\n" +
        "- Two masses over a light pulley: \\(T = \\dfrac{2m_1m_2g}{m_1 + m_2}\\). A mass whirled in a horizontal circle on a wire (gravity ignored): \\(T = mv^{2}/l\\), so \\(v_{max} = \\sqrt{\\sigma_b A l/m}\\).",
      formula: {
        label: "Breaking load",
        latex: "T_{max} = \\sigma_b A \\qquad a_{max} = \\frac{\\sigma_b A}{m} - g",
      },
      authoredExample: {
        prompt:
          "An upper wire of area \\(2\\ \\text{mm}^{2}\\) holds a 10 kg block. A lower wire of area \\(1\\ \\text{mm}^{2}\\) hangs from the block and holds a light pan. Both wires break at \\(5 \\times 10^{8}\\ \\text{N/m}^{2}\\) \\((g = 10)\\). What is the largest mass that can go in the pan?",
        steps: [
          "Upper wire: \\(T_{max} = 5 \\times 10^{8} \\times 2 \\times 10^{-6} = 1000\\ \\text{N}\\). It holds \\((10 + M)g\\), so \\(M \\le 90\\ \\text{kg}\\).",
          "Lower wire: \\(T_{max} = 5 \\times 10^{8} \\times 10^{-6} = 500\\ \\text{N}\\). It holds Mg, so \\(M \\le 50\\ \\text{kg}\\).",
          "The lower wire breaks first, so it sets the limit.",
        ],
        answer: "50 kg",
      },
      selfCheckExample: {
        prompt:
          "A 500 kg lift hangs from a cable of area \\(1\\ \\text{cm}^{2}\\) with breaking stress \\(8 \\times 10^{7}\\ \\text{N/m}^{2}\\) \\((g = 10)\\). What is the largest upward acceleration it can have?",
        steps: [
          "\\(T_{max} = 8 \\times 10^{7} \\times 10^{-4} = 8000\\ \\text{N}\\).",
          "\\(a_{max} = \\dfrac{8000}{500} - 10 = 6\\ \\text{m/s}^{2}\\).",
        ],
        answer: "\\(6\\ \\text{m/s}^{2}\\)",
      },
      practiceSet: [
        { prompt: "A crane rope of area \\(2\\ \\text{cm}^{2}\\) lifts at most 8 tonnes. Area needed to lift 20 tonnes?", answer: "\\(5\\ \\text{cm}^{2}\\)" },
        { prompt: "A 2 kg block is whirled in a horizontal circle on a wire 0.5 m long, area \\(10^{-6}\\ \\text{m}^{2}\\), breaking stress \\(4 \\times 10^{8}\\ \\text{N/m}^{2}\\). Largest speed (ignore gravity)?", answer: "\\(10\\ \\text{m/s}\\)", method: "\\(T_{max} = 400\\ \\text{N} = mv^{2}/l\\)." },
        { prompt: "Masses of 2 kg and 6 kg hang over a light pulley on a wire \\((g = 10)\\). Tension in the wire?", answer: "30 N" },
        { prompt: "A wire of area \\(0.5\\ \\text{mm}^{2}\\) has breaking stress \\(6 \\times 10^{8}\\ \\text{N/m}^{2}\\). Largest tension?", answer: "300 N" },
      ],
      pyqExampleId: "5240db0e-c82b-4e7f-bc89-24e5d4ce0f8f", // 6 Apr 2026 Shift 1: 1600 kg lift on an iron wire
      traps: [
        {
          title: "Testing only the upper wire",
          body: "The upper wire carries more, but it is often thicker. Test every wire against its own limit; the thinner lower wire often breaks first.",
        },
        {
          title: "An accelerating lift needs more than mg",
          body: "Going up with acceleration a, the tension is m(g + a). Setting σ_b A = ma forgets the weight.",
        },
      ],
    },

    // C3 — tension found from mechanics
    {
      kind: "formula" as const,
      slug: "jpsolid-tension-from-mechanics",
      name: "Tension from mechanics: own weight, sag, circles and pulleys",
      intuition:
        "Here the tension is not a hanging weight you can read off. Find it first with mechanics, then use ΔL = TL/(AY). A wire hanging under its own weight has zero tension at the bottom and its full weight at the top, so its stretch uses the average, half the weight.",
      definition:
        "- Own weight: \\(\\Delta L = \\dfrac{MgL}{2AY}\\). The largest stress is at the top, \\(\\rho g L\\), so the longest wire that can hang without breaking is \\(L_{max} = \\dfrac{\\sigma_b}{\\rho g}\\), whatever its area.\n" +
        "- A wire held between two supports, with a mass m at its middle sagging by a small angle θ: \\(2T\\theta = mg\\), and the strain is \\(\\theta^{2}/2\\).\n" +
        "- Vertical circle, at the lowest point: \\(T = mg + mv^{2}/r\\).\n" +
        "- Blocks on a smooth table pulled by a hanging block: find the common acceleration, then each wire's tension from the blocks it pulls.",
      formula: {
        label: "Tensions to use",
        latex: "\\Delta L_{own} = \\frac{MgL}{2AY} \\qquad L_{max} = \\frac{\\sigma_b}{\\rho g} \\qquad 2T\\theta = mg",
      },
      authoredExample: {
        prompt:
          "A uniform rod of mass 50 kg, length 2 m and cross-section \\(1\\ \\text{cm}^{2}\\) hangs from one end. \\(Y = 10^{11}\\ \\text{N/m}^{2}\\), \\(g = 10\\ \\text{m/s}^{2}\\). How much does it stretch under its own weight?",
        steps: [
          "The tension rises from 0 at the bottom to Mg at the top, so the stretch uses Mg/2.",
          "\\(\\Delta L = \\dfrac{MgL}{2AY} = \\dfrac{500 \\times 2}{2 \\times 10^{-4} \\times 10^{11}} = \\dfrac{1000}{2 \\times 10^{7}} = 5 \\times 10^{-5}\\ \\text{m}\\).",
        ],
        answer: "\\(5 \\times 10^{-5}\\ \\text{m}\\) (50 μm)",
      },
      selfCheckExample: {
        prompt:
          "A wire has density \\(8000\\ \\text{kg/m}^{3}\\) and breaking stress \\(4 \\times 10^{8}\\ \\text{N/m}^{2}\\) \\((g = 10)\\). What is the longest length that can hang under its own weight?",
        steps: [
          "The stress at the top is \\(\\rho g L\\); it must not exceed \\(\\sigma_b\\).",
          "\\(L_{max} = \\dfrac{4 \\times 10^{8}}{8000 \\times 10} = 5000\\ \\text{m}\\).",
        ],
        answer: "5000 m",
      },
      practiceSet: [
        { prompt: "A 1 kg mass on a string 1 m long moves in a vertical circle at \\(4\\ \\text{m/s}\\) at the bottom \\((g = 10)\\). Tension there?", answer: "26 N" },
        { prompt: "A 1 kg mass hangs at the middle of a horizontal wire, which then makes 0.01 rad with the horizontal at each support \\((g = 10)\\). Tension?", answer: "500 N", method: "\\(T = mg/(2\\theta)\\)." },
        { prompt: "A 4 kg block on a smooth table is pulled by a wire over a pulley by a hanging 1 kg block \\((g = 10)\\). Tension in the wire?", answer: "8 N", method: "\\(a = 10/5 = 2\\ \\text{m/s}^{2}\\), \\(T = 4 \\times 2\\)." },
        { prompt: "The area of a hanging wire is doubled. The longest length it can hang?", answer: "Unchanged" },
      ],
      pyqExampleId: "44f28b54-f264-4fde-ab3f-5022c1ff4bc0", // 26 Jul 2022: 20 kg rod stretching under its own weight
      traps: [
        {
          title: "The full weight for an own-weight stretch",
          body: "Only the top of the rod carries the full weight; the bottom carries none. The stretch uses Mg/2, so the full weight doubles the answer.",
        },
        {
          title: "Leaving out mg at the bottom of a vertical circle",
          body: "At the lowest point the string supports the weight and supplies the centripetal force: T = mg + mv²/r, not mv²/r.",
        },
      ],
    },
  ],
};
