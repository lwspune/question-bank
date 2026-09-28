import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/thermal-properties-of-matter";

export const EXPANSION_NOTE: SubtopicNote = {
  subtopicName: "Thermal Expansion — Linear, Surface, Volumetric",
  title: "Temperature Scales and Thermal Expansion",
  oneLineDefinition:
    "A solid grows in every dimension when heated: its length by αLΔT, its area by 2αAΔT and its volume by 3αVΔT, where α is the coefficient of linear expansion; the Celsius, Fahrenheit and Kelvin scales are linear relabellings of one another.",
  whyItMatters:
    "19 PYQs, 2 of them HARD. Two convert between temperature scales. Eleven are linear expansion — the gap left between rails, a rod's α from its growth, and the favourite: two rods whose difference in length stays the same at every temperature. " +
    "Six are area and volume expansion, including a thermometer's mercury column. Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-th-temperature-scales",
      name: "Converting Between Temperature Scales",
      intuition:
        "Every temperature scale is a straight line through two fixed points. Celsius puts ice at 0 and steam at 100; Fahrenheit puts them at 32 and 212; Kelvin is Celsius shifted by 273. So C/5 = (F − 32)/9 and K = C + 273. A question that asks where two scales read the same number sets them equal and solves: C = F at −40, and a body reads the same number in Kelvin and Fahrenheit at about 574.",
      definition:
        "- \\(\\dfrac{C}{5} = \\dfrac{F - 32}{9}\\), \\(K = C + 273\\).\n" +
        "- 140 °F = 60 °C; C = F at −40; K = F at ≈ 574.",
      formula: {
        label: "Scale conversion",
        latex: "\\frac{C}{5} = \\frac{F - 32}{9} = \\frac{K - 273}{5}",
      },
      authoredExample: {
        prompt: "A room is at 25 °C. What is that in Fahrenheit and in kelvin?",
        steps: ["F = 9 × 25/5 + 32 = 77 °F.", "K = 25 + 273 = 298 K."],
        answer: "77 °F; 298 K",
      },
      selfCheckExample: {
        prompt: "At what temperature do the Celsius and Fahrenheit scales read the same number?",
        steps: ["Set C = F in C/5 = (C − 32)/9."],
        answer: "−40",
      },
      practiceSet: [
        { prompt: "A Fahrenheit thermometer reads 140 °F. Celsius?", answer: "60 °C" },
      ],
      pyqExampleId: "2ab98627-6ae0-427f-ac68-65b7357afc42",
      traps: [
        {
          title: "Forgetting the 32 in Fahrenheit",
          body:
            "Fahrenheit is not a scaled Celsius: it starts at 32. Subtract 32 before multiplying by 5/9, not after.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-th-linear-expansion",
      name: "Linear Expansion and Rods That Keep Their Difference",
      intuition:
        "A rod of length L heated through ΔT grows by ΔL = αLΔT. A rail laid with a gap needs that gap to equal the growth between the laying temperature and the hottest day. Two rods of different materials keep a constant difference in length only if they grow by the same amount, αₐLₐ = α_bL_b, so the longer rod must be made of the material that expands less. Once that ratio is fixed, the given difference fixes each length.",
      definition:
        "- \\(\\Delta L = \\alpha L \\Delta T\\); \\(\\alpha = \\dfrac{\\Delta L}{L\\,\\Delta T}\\) (2 m, 1.6 mm over 60 °C ⇒ \\(1.33\\times10^{-5}\\)/°C).\n" +
        "- Rail gap: 10 m, \\(\\alpha = 1.3\\times10^{-5}\\), 17 → 45 °C ⇒ 3.64 mm.\n" +
        "- **Constant difference**: \\(\\alpha_A L_A = \\alpha_B L_B\\), \\(\\dfrac{L_A}{L_B} = \\dfrac{\\alpha_B}{\\alpha_A}\\).\n" +
        "- Two rods joined, equal growth: \\(\\dfrac{L_1}{L_1 + L_2} = \\dfrac{\\alpha_2}{\\alpha_1 + \\alpha_2}\\).",
      formula: {
        label: "Linear expansion",
        latex: "\\Delta L = \\alpha L \\Delta T",
      },
      authoredExample: {
        prompt: "A 0.5 m brass rod (α = 2 × 10⁻⁵ /°C) is heated from 20 °C to 120 °C. Increase in length?",
        steps: ["ΔL = 2 × 10⁻⁵ × 0.5 × 100.", "ΔL = 1 × 10⁻³ m."],
        answer: "1 mm",
      },
      selfCheckExample: {
        prompt: "A 12 m steel rail (α = 1.2 × 10⁻⁵ /°C) is laid at 20 °C. Gap needed for 45 °C?",
        steps: ["12 × 1.2 × 10⁻⁵ × 25."],
        answer: "3.6 mm",
      },
      practiceSet: [
        { prompt: "Rods differ by 60 cm at all temperatures; α_A = 18 and α_B = 27 (× 10⁻⁶ /°C). Lengths?", answer: "180 cm and 120 cm" },
        { prompt: "L_A − L_B stays constant. L_A/L_B?", answer: "α_B/α_A" },
      ],
      pyqExampleId: "36e681b7-150b-4d89-8ed0-94358529433a",
      traps: [
        {
          title: "Pairing the longer rod with the larger α",
          body:
            "Equal growth needs αL equal, so the longer rod has the SMALLER coefficient: L_A/L_B = α_B/α_A, not α_A/α_B.",
        },
        {
          title: "Using the final length in ΔL = αLΔT",
          body:
            "L is the original length. For the small changes asked here the difference is negligible, but a question that gives length 'at 0 °C' means use that one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-th-area-volume-expansion",
      name: "Area and Volume Expansion",
      intuition:
        "Each dimension grows by the same fraction αΔT, so an area grows by twice that fraction and a volume by three times: β = 2α and γ = 3α. A percentage increase in volume over a temperature rise gives γ directly; divide by 3 for α. Two rods of the same material heated equally grow in volume in proportion to their volumes. A liquid-in-glass thermometer works because the liquid's volume grows by γVΔT and has nowhere to go but up a thin stem, so the column rises by that volume divided by the stem's cross-section.",
      definition:
        "- \\(\\Delta A = 2\\alpha A\\Delta T\\), \\(\\Delta V = 3\\alpha V\\Delta T\\) (β = 2α, γ = 3α).\n" +
        "- From a percentage: \\(\\gamma = \\dfrac{\\Delta V / V}{\\Delta T}\\) (0.225% over 30 °C ⇒ \\(\\alpha = 2.5\\times10^{-5}\\)).\n" +
        "- Cube of side 1 m, α = 18 × 10⁻⁶, 100 °C: \\(\\Delta V = 54\\times10^{-4}\\) m³.\n" +
        "- Thermometer column: \\(h = \\dfrac{\\gamma V \\Delta T}{A_{\\text{stem}}}\\).",
      formula: {
        label: "Area and volume",
        latex: "\\Delta A = 2\\alpha A\\,\\Delta T, \\qquad \\Delta V = 3\\alpha V\\,\\Delta T",
      },
      authoredExample: {
        prompt: "A steel plate 20 cm × 10 cm (α = 1.2 × 10⁻⁵ /°C) is heated by 50 °C. Increase in area?",
        steps: ["ΔA = 2 × 1.2 × 10⁻⁵ × 200 × 50.", "ΔA = 0.24 cm²."],
        answer: "0.24 cm²",
      },
      selfCheckExample: {
        prompt: "A block's volume grows by 0.6% when heated by 100 °C. Coefficient of linear expansion?",
        steps: ["γ = 0.006/100 = 6 × 10⁻⁵; divide by 3."],
        answer: "2 × 10⁻⁵ /°C",
      },
      practiceSet: [
        { prompt: "Brass rods: A has length l, radius 2r; B has length 2l, radius r. Ratio of volume increases?", answer: "2 : 1" },
      ],
      pyqExampleId: "c62d9569-1d3e-47fd-a441-26a70cc38315",
      traps: [
        {
          title: "Using α for a volume",
          body:
            "A volume grows by 3αVΔT. A percentage change in VOLUME gives γ; dividing by 3 gives α, and the options include γ itself.",
        },
      ],
    },
  ],
  related: [
    { label: "Calorimetry — heat and temperature change", href: `${BASE}/cetp-th-calorimetry` },
  ],
};
