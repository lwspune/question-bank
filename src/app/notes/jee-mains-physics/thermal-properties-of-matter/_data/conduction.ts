import type { SubtopicNote } from "@/app/notes/_types";

export const CONDUCTION_TH_NOTE: SubtopicNote = {
  subtopicName: "Heat Conduction",
  title: "Heat Conduction",
  oneLineDefinition:
    "In the steady state a slab carries a heat current H = KAΔT/L, so it behaves like a resistor of thermal resistance L/(KA): resistances add in series, conductances add in parallel, and the heat flowing into any junction flows out of it.",
  whyItMatters:
    "Thirteen PYQs, five of them asking for a number, and one from 2026. Seven join two rods or slabs end to end and ask for the junction temperature or the equivalent conductivity; six send heat through parallel paths, a junction of three rods, the walls of a box or a spherical shell. Treat each one as a circuit: temperature difference for voltage, heat current for current.",
  concepts: [
    // C1 — series
    {
      kind: "formula" as const,
      slug: "jpthermal-series",
      name: "Slabs and rods in series: thermal resistance and junction temperature",
      intuition:
        "Heat flowing steadily through two slabs in a row has nowhere else to go, so the same heat current passes through both. Each slab resists the flow with R = L/(KA), just as a resistor resists current. The resistances add, and the temperature falls across each slab in proportion to its resistance. A poor conductor, or a thick or thin one, takes the larger share of the drop.",
      definition:
        "- Heat current: \\(H = \\dfrac{KA\\Delta T}{L} = \\dfrac{\\Delta T}{R}\\), with \\(R = \\dfrac{L}{KA}\\).\n" +
        "- For a rod of radius r: \\(R = \\dfrac{L}{K\\pi r^{2}}\\), so \\(R \\propto L/(Kr^{2})\\).\n" +
        "- Series: \\(R = R_1 + R_2\\); the same H flows through each part.\n" +
        "- Temperature drop across each part \\(\\propto\\) its R. Junction: \\(\\theta = \\dfrac{\\theta_1R_2 + \\theta_2R_1}{R_1 + R_2}\\).\n" +
        "- Equivalent conductivity (same area): \\(K_{eq} = \\dfrac{L_1 + L_2}{L_1/K_1 + L_2/K_2}\\); for equal lengths \\(K_{eq} = \\dfrac{2K_1K_2}{K_1 + K_2}\\).\n" +
        "- Unknown conductivity from a measured junction temperature: write \\(H_1 = H_2\\) and solve.",
      formula: {
        label: "Conduction in series",
        latex:
          "H = \\frac{KA\\Delta T}{L} \\qquad R = \\frac{L}{KA} \\qquad \\theta = \\frac{\\theta_1R_2 + \\theta_2R_1}{R_1 + R_2} \\qquad K_{eq} = \\frac{L_1 + L_2}{L_1/K_1 + L_2/K_2}",
      },
      authoredExample: {
        prompt:
          "Two slabs of the same area are pressed together. Slab 1 is 2 cm thick with \\(K_1 = 40\\ \\text{W m}^{-1}\\text{K}^{-1}\\); slab 2 is 3 cm thick with \\(K_2 = 20\\ \\text{W m}^{-1}\\text{K}^{-1}\\). The outer faces are at \\(100^{\\circ}C\\) (slab 1) and \\(20^{\\circ}C\\) (slab 2). Find the temperature of the interface and the equivalent conductivity.",
        steps: [
          "Per unit area, \\(R_1 \\propto \\dfrac{2}{40} = 0.05\\) and \\(R_2 \\propto \\dfrac{3}{20} = 0.15\\), so \\(R_2 = 3R_1\\).",
          "The 80-degree drop splits 1 : 3, so 20 degrees fall across slab 1: \\(\\theta = 100 - 20 = 80^{\\circ}C\\).",
          "Check: \\(\\theta = \\dfrac{100(3) + 20(1)}{4} = 80^{\\circ}C\\).",
          "\\(K_{eq} = \\dfrac{2 + 3}{2/40 + 3/20} = \\dfrac{5}{0.2} = 25\\ \\text{W m}^{-1}\\text{K}^{-1}\\).",
        ],
        answer: "\\(80^{\\circ}C\\); \\(K_{eq} = 25\\ \\text{W m}^{-1}\\text{K}^{-1}\\)",
      },
      selfCheckExample: {
        prompt:
          "Two rods of the same length and area, with conductivities K and 3K, are joined end to end. The free end of the K rod is at \\(100^{\\circ}C\\) and the free end of the 3K rod at \\(0^{\\circ}C\\). Find the junction temperature and the equivalent conductivity.",
        steps: [
          "Same heat current: \\(K(100 - \\theta) = 3K(\\theta - 0)\\).",
          "\\(100 - \\theta = 3\\theta\\), so \\(\\theta = 25^{\\circ}C\\). The poorer conductor takes the larger drop.",
          "\\(K_{eq} = \\dfrac{2K(3K)}{K + 3K} = 1.5K\\).",
        ],
        answer: "\\(25^{\\circ}C\\); \\(1.5K\\)",
      },
      practiceSet: [
        { prompt: "Rod A has twice the radius of rod B; their lengths and materials are the same. Ratio of thermal resistances \\(R_A : R_B\\)?", answer: "1 : 4" },
        { prompt: "A copper rod 0.5 m long, area \\(10^{-4}\\ \\text{m}^{2}\\), K = 400 W m⁻¹ K⁻¹, has its ends at \\(100^{\\circ}C\\) and \\(0^{\\circ}C\\). Heat current?", answer: "8 W" },
        { prompt: "Two slabs in series have thermal resistances 2 K/W and 6 K/W, with outer faces at \\(90^{\\circ}C\\) and \\(10^{\\circ}C\\). Heat current?", answer: "10 W" },
        { prompt: "In the same pair, what is the temperature of the interface?", answer: "\\(70^{\\circ}C\\)", method: "Drop across the 2 K/W slab: \\(10 \\times 2 = 20\\) degrees." },
      ],
      pyqExampleId: "bb683112-432d-47ef-89bc-5ea4e2e28922", // 7 Apr 2025: rods with ratios of length, radius and conductivity
      traps: [
        {
          title: "Adding conductivities in series",
          body: "In series it is the RESISTANCES L/(KA) that add. Averaging or adding the conductivities gives an equivalent conductivity that is too large.",
        },
        {
          title: "Forgetting that the area goes as r²",
          body: "For rods, R = L/(Kπr²). Doubling the radius cuts the resistance to a quarter, not a half. Using a diameter for the radius makes the same slip.",
        },
      ],
    },

    // C2 — parallel paths, junctions, boxes and shells
    {
      kind: "formula" as const,
      slug: "jpthermal-networks",
      name: "Parallel paths, junctions, box walls and spherical shells",
      intuition:
        "When heat has two side-by-side paths, each carries its own current and the totals add, so conductances KA/L add. When three or more rods meet at a point, nothing piles up there in the steady state: the heat flowing in equals the heat flowing out. For a box, the walls are all in parallel, so use the total area of all the faces. A spherical shell is a stack of thin shells in series whose area grows with radius.",
      definition:
        "- Parallel: \\(\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}\\); conductances \\(KA/L\\) add, and so do the heat currents.\n" +
        "- Junction rule: \\(\\displaystyle\\sum \\frac{\\theta_i - \\theta}{R_i} = 0\\) over all rods meeting at the junction.\n" +
        "- A network: reduce series and parallel pieces step by step, as with resistors.\n" +
        "- Box: \\(H = \\dfrac{KA_{total}\\Delta T}{d}\\) with \\(A_{total} = 2(lb + bh + hl)\\) and d the wall thickness; ice melts at \\(\\dfrac{dm}{dt} = \\dfrac{H}{L_f}\\).\n" +
        "- Spherical shell: \\(R = \\dfrac{r_2 - r_1}{4\\pi Kr_1r_2}\\), so \\(H = \\dfrac{4\\pi Kr_1r_2\\,\\Delta\\theta}{r_2 - r_1}\\).\n" +
        "- Turning a temperature difference into electrical energy needs a material that holds the difference (heat leaks through slowly) while letting charge flow easily.",
      formula: {
        label: "Parallel paths, junctions and shells",
        latex:
          "\\frac{1}{R} = \\frac{1}{R_1} + \\frac{1}{R_2} \\qquad \\sum \\frac{\\theta_i - \\theta}{R_i} = 0 \\qquad \\frac{dm}{dt} = \\frac{H}{L_f} \\qquad R_{shell} = \\frac{r_2 - r_1}{4\\pi Kr_1r_2}",
      },
      authoredExample: {
        prompt:
          "Two rods, each 0.5 m long with area \\(2 \\times 10^{-4}\\ \\text{m}^{2}\\), connect the same two reservoirs at \\(120^{\\circ}C\\) and \\(20^{\\circ}C\\). Their conductivities are 100 and 300 W m⁻¹ K⁻¹. Find the total heat current and the share carried by each rod.",
        steps: [
          "Each rod has the full 100-degree difference across it.",
          "Rod 1: \\(H_1 = \\dfrac{100 \\times 2 \\times 10^{-4} \\times 100}{0.5} = 4\\ \\text{W}\\).",
          "Rod 2: \\(H_2 = \\dfrac{300 \\times 2 \\times 10^{-4} \\times 100}{0.5} = 12\\ \\text{W}\\).",
          "Total \\(H = 16\\ \\text{W}\\): in parallel the currents, and the conductances, add.",
        ],
        answer: "16 W, split 4 W and 12 W",
      },
      selfCheckExample: {
        prompt:
          "Three rods, each of thermal resistance 4 K/W, meet at a junction J. Their free ends are held at \\(100^{\\circ}C\\), \\(40^{\\circ}C\\) and \\(10^{\\circ}C\\). Find the temperature of J and the heat current into the \\(10^{\\circ}C\\) end.",
        steps: [
          "Heat in equals heat out at J: \\(\\dfrac{100 - \\theta}{4} + \\dfrac{40 - \\theta}{4} + \\dfrac{10 - \\theta}{4} = 0\\).",
          "\\(150 = 3\\theta\\), so \\(\\theta = 50^{\\circ}C\\).",
          "Current toward the cold end: \\(\\dfrac{50 - 10}{4} = 10\\ \\text{W}\\).",
        ],
        answer: "\\(50^{\\circ}C\\); 10 W",
      },
      practiceSet: [
        { prompt: "A closed box measures 3 m × 2 m × 1 m. What is the total area of its walls?", answer: "\\(22\\ \\text{m}^{2}\\)" },
        { prompt: "An ice box has walls of total area \\(2\\ \\text{m}^{2}\\), 2 cm thick, K = 0.04 W m⁻¹ K⁻¹, with the room 30 K warmer than the ice. Heat current in?", answer: "120 W" },
        { prompt: "Two slabs of resistance 6 K/W and 3 K/W are placed side by side between the same two faces. Combined resistance?", answer: "2 K/W" },
        { prompt: "Thermal resistance of a spherical shell of inner radius a, outer radius 2a and conductivity K?", answer: "\\(\\dfrac{1}{8\\pi Ka}\\)", method: "\\(\\dfrac{2a - a}{4\\pi K(a)(2a)}\\)." },
      ],
      pyqExampleId: "61da5425-efcf-42d2-b8e3-f2fa8473d1db", // 26 Jul 2022: ice in an insulated box, rate of melting
      traps: [
        {
          title: "Using one face of a box",
          body: "Heat enters through every wall, so the area is the total of all six faces, 2(lb + bh + hl). Using one face, or forgetting the factor 2, gives a melting rate several times too small.",
        },
        {
          title: "Treating a spherical shell as a flat slab",
          body: "The area of a shell grows as r², so L/(KA) with one area is wrong. The resistance is (r₂ − r₁)/(4πK r₁r₂).",
        },
        {
          title: "Losing the sign at a junction",
          body: "Write every rod's current as flowing INTO the junction, (θᵢ − θ)/Rᵢ, and set the sum to zero. Mixing in- and out-directions doubles one term or cancels another.",
        },
      ],
    },
  ],
};
