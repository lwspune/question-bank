import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/oscillations";

export const SPRINGS_NOTE: SubtopicNote = {
  subtopicName: "Spring-Mass and Other SHM Systems",
  title: "Spring-Mass Systems, Spring Combinations and Other Oscillators",
  oneLineDefinition:
    "A mass m on a spring of constant k oscillates with T = 2π√(m/k), whether the spring is horizontal or vertical; springs combine like capacitors (parallel constants add, series reciprocals add), cutting a spring raises its constant, and any system with a restoring force proportional to displacement — a floating block, a liquid in a U-tube, a magnetic needle — has a period of the same form.",
  whyItMatters:
    "25 PYQs, 7 HARD. Twelve are one spring and a changing mass — the period with 4m, the mass that stretches T to 5T/4, the static stretch from the period, a smaller mass dropped on at the mean position; eight are springs combined or cut — two in parallel under a disc, springs in series and parallel on both sides of a block, a spring cut in two, and a stretched spring whirled in a circle; five are other oscillators — a ball in a bowl, a floating block, a liquid column, a magnetic needle. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-osc-spring-mass-period",
      name: "The Spring-Mass Period",
      intuition:
        "T = 2π√(m/k): the period grows as the square root of the mass. So 4m doubles T, and if adding m₀ stretches T to 5T/4, then (m + m₀)/m = 25/16 and m₀/m = 9/16. A hanging mass stretches the spring by x = mg/k at rest, so T = 2π√(x/g) — the period tells you the stretch without knowing m or k. A mass dropped gently onto an oscillating one at the mean position conserves momentum, and the new amplitude follows from Mω₁A₁ = (M + m)ω₂A₂.",
      definition:
        "- \\(T = 2\\pi\\sqrt{\\dfrac{m}{k}}\\), \\(T \\propto \\sqrt{m}\\): 4m ⇒ 2T.\n" +
        "- **Adding mass**: \\(\\dfrac{m + m_0}{m} = \\left(\\dfrac{T'}{T}\\right)^2\\) (T → 5T/4 ⇒ \\(\\tfrac{9}{16}\\); T → 4T/3 ⇒ \\(\\tfrac{7}{9}\\); 3 s → 5 s with 1 kg ⇒ m = 9/16 kg).\n" +
        "- **Static stretch** \\(x = \\dfrac{mg}{k} = \\dfrac{gT^2}{4\\pi^2}\\) (T = 6 s, g = π² ⇒ 9 m). A mass \\(M_1\\) that adds stretch x gives \\(k = \\dfrac{M_1g}{x}\\).\n" +
        "- **Mass dropped on at the mean position**: \\(\\dfrac{A_1}{A_2} = \\sqrt{\\dfrac{M + m}{M}}\\).\n" +
        "- Speed at displacement x: \\(\\sqrt{\\tfrac{k}{m}}\\sqrt{A^2 - x^2}\\).",
      formula: {
        label: "Spring-mass",
        latex: "T = 2\\pi\\sqrt{\\frac{m}{k}}",
      },
      authoredExample: {
        prompt: "A 0.5 kg mass on a spring has period 1 s. How much extra mass makes the period 1.5 s?",
        steps: ["(m + m₀)/m = 2.25, so m₀ = 1.25 × 0.5 = 0.625 kg."],
        answer: "0.625 kg",
      },
      selfCheckExample: {
        prompt: "A mass m on a spring has period 3 s; adding 0.6 kg raises it by 3 s. m?",
        steps: ["(6/3)² = 4 = (m + 0.6)/m."],
        answer: "0.2 kg",
      },
      practiceSet: [
        { prompt: "Period 2 s with mass m. With 4m?", answer: "4 s" },
        { prompt: "Masses 100 g, 300 g, 500 g hang on a spring. Removing 500 g, the period is 3 s. Removing 300 g too?", answer: "1.5 s" },
      ],
      pyqExampleId: "750e9a3f-0a69-4613-902a-4ea9523dd0d9",
      traps: [
        {
          title: "Scaling the period with the mass itself",
          body:
            "T grows as √m. Doubling the mass makes the period √2 times, not twice — the ratios in these questions are always squared.",
        },
        {
          title: "Putting g into a spring's period",
          body:
            "Hanging the spring vertically only moves the equilibrium point down by mg/k; the period is still 2π√(m/k). g enters only when the question gives you the static stretch instead of m and k.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-osc-spring-combinations",
      name: "Springs in Series, in Parallel, and Cut",
      intuition:
        "Two springs side by side both stretch the same amount, so their constants add: parallel k = k₁ + k₂. Two end to end share the force and add their stretches: series 1/k = 1/k₁ + 1/k₂. A block between two springs fixed to opposite walls is pushed by one and pulled by the other — also k₁ + k₂. A spring's constant is inversely proportional to its length, so cutting it into a piece of length l₁ gives k l/l₁, and half a spring is twice as stiff.",
      definition:
        "- **Parallel** (and a block between two walls): \\(k = k_1 + k_2\\). **Series**: \\(\\dfrac{1}{k} = \\dfrac{1}{k_1} + \\dfrac{1}{k_2}\\).\n" +
        "- **Cut spring**: \\(kl\\) constant; half ⇒ 2k, period ÷ √2. Cut into \\(l_1 = nl_2\\): \\(k_1 = \\dfrac{(n+1)k}{n}\\).\n" +
        "- Identical springs K: single \\(T_a\\), series \\(\\sqrt{2}T_a\\), parallel \\(\\tfrac{T_a}{\\sqrt{2}}\\) — so \\(T_b = 2T_c\\).\n" +
        "- Disc of 12 kg on two springs, T = 2 s, π² = 10 ⇒ each spring 60 N/m.\n" +
        "- **A spring whirled in a circle**: \\(kx = m\\omega^2(l + x)\\) ⇒ \\(\\dfrac{x}{l} = \\dfrac{m\\omega^2}{k - m\\omega^2}\\).",
      formula: {
        label: "Combining springs",
        latex: "k_{\\parallel} = k_1 + k_2, \\qquad \\frac{1}{k_{\\text{series}}} = \\frac{1}{k_1} + \\frac{1}{k_2}",
      },
      authoredExample: {
        prompt: "A block rests between a 3K spring on the left and two K springs in series on the right, all fixed to walls. Frequency, mass M?",
        steps: ["Right side: K/2. Both sides act: 3K + K/2 = 7K/2.", "f = (1/2π)√(7K/(2M))."],
        answer: "(1/2π)√(7K/2M)",
      },
      selfCheckExample: {
        prompt: "A spring is cut into two equal halves and the same mass hung from one half. T₂/T₁?",
        steps: ["Half the length, twice the constant."],
        answer: "1 : √2",
      },
      practiceSet: [
        { prompt: "Mass between two identical springs on opposite walls has frequency f. Remove one spring. New frequency?", answer: "f/√2" },
        { prompt: "Springs 2K, 2K in series on one side; K and 2K in parallel on the other. Frequency with mass M?", answer: "(1/2π)√(4K/M)" },
      ],
      pyqExampleId: "241c3e10-da44-47d9-ab99-25ea546542ba",
      traps: [
        {
          title: "Treating springs on opposite sides as series",
          body:
            "A block between two walls stretches one spring and compresses the other by the SAME x, so both forces act on it: the constants add, as in parallel.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-osc-other-shm-systems",
      name: "Other Oscillators: Bowls, Floating Blocks, Liquid Columns, Magnets",
      intuition:
        "Find the restoring force per unit displacement and the same T = 2π√(inertia/restoring constant) appears. A small ball in a smooth bowl of radius R behaves like a pendulum of length R (or R − r, measuring to the ball's centre). A floating block pushed down by x gets an extra upthrust Aρgx, so ω² = Aρg/m, and for a block floating with a height da immersed, T = 2π√(da/g). A liquid of mass M in a U-tube displaced by y has a level difference 2y, a restoring force 2Aydg, and T = 2π√(M/(2Adg)). A magnetic needle has T = 2π√(I/mB).",
      definition:
        "- **Bowl / watch glass** of radius R: \\(T = 2\\pi\\sqrt{\\dfrac{R}{g}}\\) (1.6 m ⇒ 0.8π s); a rolling ball of radius r: \\(\\propto \\sqrt{\\dfrac{R - r}{g}}\\).\n" +
        "- **Floating block**: \\(n = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{A\\rho g}{m}}\\); wood of relative density d with side a vertical: \\(T = 2\\pi\\sqrt{\\dfrac{ad}{g}}\\).\n" +
        "- **Liquid column** (U-tube), mass M: \\(T = 2\\pi\\sqrt{\\dfrac{M}{2Adg}}\\).\n" +
        "- **Magnetic needle**: \\(T = 2\\pi\\sqrt{\\dfrac{I}{mB}}\\).",
      formula: {
        label: "Liquid column and floating block",
        latex: "T_{\\text{column}} = 2\\pi\\sqrt{\\frac{M}{2Adg}}, \\qquad T_{\\text{block}} = 2\\pi\\sqrt{\\frac{ad}{g}}",
      },
      authoredExample: {
        prompt: "A cube of side 20 cm and relative density 0.6 floats in water. Period of small vertical oscillations (g = π²)?",
        steps: ["Immersed depth 0.6 × 0.2 = 0.12 m.", "T = 2π√(0.12/π²) = 2√0.12 ≈ 0.69 s."],
        answer: "≈ 0.69 s",
      },
      selfCheckExample: {
        prompt: "A needle with I = 9.6 × 10⁻⁵ kg m² and m = 6 × 10⁻² A m² oscillates in 0.01 T. Time for 10 oscillations (π = 3.14)?",
        steps: ["T = 2π√(9.6 × 10⁻⁵/(6 × 10⁻⁴)) = 2π × 0.4."],
        answer: "25.12 s",
      },
      practiceSet: [
        { prompt: "A small sphere in a watch glass of radius 1.6 m, g = 10. Period?", answer: "0.8π s" },
        { prompt: "Frequency of a floating block of mass m, area A, in liquid of density ρ?", answer: "(1/2π)√(Aρg/m)" },
      ],
      pyqExampleId: "8b7cb149-d395-4815-8a9a-7939a86a63be",
      traps: [
        {
          title: "Using Adg for a liquid column",
          body:
            "Displacing the liquid by y lowers one side by y and raises the other by y, a level difference of 2y. The restoring force is 2Aydg, which puts the 2 inside the square root.",
        },
      ],
    },
  ],
  related: [
    { label: "SHM Kinematics — the ω these systems set", href: `${BASE}/cetp-osc-kinematics` },
    { label: "Simple Pendulum", href: `${BASE}/cetp-osc-pendulum` },
  ],
};
