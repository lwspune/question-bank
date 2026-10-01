import type { SubtopicNote } from "@/app/notes/_types";

export const MODULI_SOLID_NOTE: SubtopicNote = {
  subtopicName: "Bulk Modulus, Shear Modulus and Poisson's Ratio",
  title: "Bulk Modulus, Shear Modulus and Poisson's Ratio",
  oneLineDefinition:
    "The bulk modulus B = ΔP/(ΔV/V) measures resistance to squeezing from all sides, the shear modulus η = (F/A)/θ resistance to a change of shape, and Poisson's ratio the thinning of a stretched wire; Y = 2η(1 + σ) = 3B(1 − 2σ) ties them together.",
  whyItMatters:
    "Nineteen PYQs, nine of them asking for a number, and two from 2026. Seven use the bulk modulus directly, five take a body down into the sea, and seven deal with shear, Poisson's ratio or the relations between the moduli. Percentages and the face a shear force acts on are where the marks go.",
  concepts: [
    // C1 — bulk modulus
    {
      kind: "formula" as const,
      slug: "jpsolid-bulk-modulus",
      name: "Bulk modulus and the change in volume",
      intuition:
        "Squeeze a body equally from all sides and its volume shrinks. The bulk modulus is the extra pressure needed for each unit of fractional loss of volume, so a large B means the body is hard to compress. Its reciprocal is the compressibility. The mass does not change, so a smaller volume means a larger density.",
      definition:
        "- \\(B = -\\dfrac{\\Delta P}{\\Delta V/V}\\). The minus sign makes B positive, since the volume falls as the pressure rises.\n" +
        "- \\(\\dfrac{\\Delta V}{V} = \\dfrac{\\Delta P}{B}\\) and \\(\\Delta V = \\dfrac{\\Delta P\\,V}{B}\\). Compressibility \\(= 1/B\\).\n" +
        "- Rise in density: \\(\\Delta\\rho = \\dfrac{\\rho\\,\\Delta P}{B}\\).\n" +
        "- A gas with \\(P = aV^{-n}\\): \\(B = -V\\dfrac{dP}{dV} = nP\\). An ideal gas at constant temperature \\((n = 1)\\) has \\(B = P\\).\n" +
        "- Two materials under the same pressure: \\(B \\propto \\dfrac{1}{\\Delta V/V}\\).",
      formula: {
        label: "Bulk modulus",
        latex: "B = -\\frac{\\Delta P}{\\Delta V / V} \\qquad \\Delta V = \\frac{\\Delta P\\,V}{B} \\qquad \\Delta\\rho = \\frac{\\rho\\,\\Delta P}{B}",
      },
      authoredExample: {
        prompt:
          "A steel sphere of volume 2 litres is put under an extra pressure of \\(8 \\times 10^{7}\\ \\text{Pa}\\). The bulk modulus of steel is \\(1.6 \\times 10^{11}\\ \\text{N/m}^{2}\\). By how much does its volume fall?",
        steps: [
          "\\(\\dfrac{\\Delta V}{V} = \\dfrac{8 \\times 10^{7}}{1.6 \\times 10^{11}} = 5 \\times 10^{-4}\\).",
          "\\(V = 2 \\times 10^{-3}\\ \\text{m}^{3}\\), so \\(\\Delta V = 5 \\times 10^{-4} \\times 2 \\times 10^{-3} = 10^{-6}\\ \\text{m}^{3}\\).",
        ],
        answer: "\\(10^{-6}\\ \\text{m}^{3}\\), that is \\(1\\ \\text{cm}^{3}\\)",
      },
      selfCheckExample: {
        prompt:
          "The bulk modulus of water is \\(2.2 \\times 10^{9}\\ \\text{N/m}^{2}\\). What extra pressure reduces the volume of a water sample by 0.5%?",
        steps: [
          "\\(\\dfrac{\\Delta V}{V} = 0.5\\% = 5 \\times 10^{-3}\\).",
          "\\(\\Delta P = B\\,\\dfrac{\\Delta V}{V} = 2.2 \\times 10^{9} \\times 5 \\times 10^{-3} = 1.1 \\times 10^{7}\\ \\text{Pa}\\).",
        ],
        answer: "\\(1.1 \\times 10^{7}\\ \\text{Pa}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\rho = 1000\\ \\text{kg/m}^{3}\\), \\(\\Delta P = 2 \\times 10^{7}\\ \\text{Pa}\\), \\(B = 2 \\times 10^{9}\\ \\text{N/m}^{2}\\). Rise in density?", answer: "\\(10\\ \\text{kg/m}^{3}\\)" },
        { prompt: "A gas obeys \\(P = aV^{-2}\\). Its bulk modulus?", answer: "2P" },
        { prompt: "Under the same pressure, liquid X compresses by 0.02% and liquid Y by 0.05%. \\(B_X : B_Y\\)?", answer: "5 : 2" },
        { prompt: "Bulk modulus of an ideal gas kept at constant temperature?", answer: "Its pressure P" },
      ],
      pyqExampleId: "5bb902f4-5dae-4c8f-9651-e1500203892e", // 28 Jan 2025: copper cube under hydraulic pressure, answer in mm³
      traps: [
        {
          title: "A percentage is not a fraction",
          body: "A 0.2% fall in volume is ΔV/V = 2 × 10⁻³, not 0.2. Divide by 100 before using the formula.",
        },
        {
          title: "Volume units",
          body: "1 litre is 10⁻³ m³, and 1 m³ is 10⁶ cm³ or 10⁹ mm³. An answer asked in mm³ needs the cube of the length conversion.",
        },
      ],
    },

    // C2 — bulk modulus at a depth
    {
      kind: "formula" as const,
      slug: "jpsolid-bulk-depth",
      name: "Compression at a depth in water",
      intuition:
        "Under water the extra pressure on a body is ρgh, the weight of the water column above it. Put that pressure into the bulk modulus and the fractional loss of volume follows; turn it round to find the depth that causes a given loss.",
      definition:
        "- \\(\\Delta P = \\rho g h\\). Atmospheric pressure acts at the surface as well, so it adds nothing to the change.\n" +
        "- \\(\\dfrac{\\Delta V}{V} = \\dfrac{\\rho g h}{B}\\) and \\(h = \\dfrac{B}{\\rho g}\\cdot\\dfrac{\\Delta V}{V}\\).\n" +
        "- Hydraulic stress divided by hydraulic strain is the bulk modulus: \\(B = \\dfrac{\\rho g h}{\\Delta V/V}\\).\n" +
        "- Use the B of the body being squeezed: the ball's B for a ball taken down, water's B for the water at the bottom of a sea.",
      formula: {
        label: "At a depth h",
        latex: "\\frac{\\Delta V}{V} = \\frac{\\rho g h}{B} \\qquad h = \\frac{B}{\\rho g}\\cdot\\frac{\\Delta V}{V}",
      },
      authoredExample: {
        prompt:
          "To what depth in water must a rubber ball \\((B = 5 \\times 10^{8}\\ \\text{N/m}^{2})\\) be taken so that it loses 0.1% of its volume? \\((\\rho = 1000\\ \\text{kg/m}^{3},\\ g = 10\\ \\text{m/s}^{2})\\)",
        steps: [
          "\\(\\dfrac{\\Delta V}{V} = 10^{-3}\\).",
          "\\(h = \\dfrac{B}{\\rho g}\\cdot\\dfrac{\\Delta V}{V} = \\dfrac{5 \\times 10^{8} \\times 10^{-3}}{1000 \\times 10} = \\dfrac{5 \\times 10^{5}}{10^{4}} = 50\\ \\text{m}\\).",
        ],
        answer: "50 m",
      },
      selfCheckExample: {
        prompt:
          "Find the fractional compression of water at the bottom of a sea 3 km deep. \\((B = 2 \\times 10^{9}\\ \\text{N/m}^{2},\\ \\rho = 1000\\ \\text{kg/m}^{3},\\ g = 10)\\)",
        steps: [
          "\\(\\Delta P = 1000 \\times 10 \\times 3000 = 3 \\times 10^{7}\\ \\text{Pa}\\).",
          "\\(\\dfrac{\\Delta V}{V} = \\dfrac{3 \\times 10^{7}}{2 \\times 10^{9}} = 1.5 \\times 10^{-2}\\).",
        ],
        answer: "\\(1.5 \\times 10^{-2}\\), that is 1.5%",
      },
      practiceSet: [
        { prompt: "Extra pressure at a depth of 1 km in water \\((g = 10)\\)?", answer: "\\(10^{7}\\ \\text{Pa}\\)" },
        { prompt: "A body 500 m down in water loses 0.25% of its volume \\((g = 10)\\). Its bulk modulus?", answer: "\\(2 \\times 10^{9}\\ \\text{N/m}^{2}\\)", method: "\\(5 \\times 10^{6} / (2.5 \\times 10^{-3})\\)." },
        { prompt: "The depth is doubled. The fractional compression?", answer: "Doubles" },
        { prompt: "Hydraulic stress divided by hydraulic strain is which modulus?", answer: "The bulk modulus" },
      ],
      pyqExampleId: "384c55b5-a84c-46fc-a02d-ca04e6dbcc76", // 31 Jan 2024: depth for a rubber ball to lose 0.02% of its volume
      traps: [
        {
          title: "The wrong body's bulk modulus",
          body: "A rubber ball taken down is squeezed by the water, but it is the ball that shrinks, so its own B goes in the formula.",
        },
        {
          title: "Adding atmospheric pressure",
          body: "The ball already felt atmospheric pressure at the surface. Only the extra pressure ρgh changes its volume.",
        },
      ],
    },

    // C3 — shear modulus, Poisson's ratio, relations
    {
      kind: "formula" as const,
      slug: "jpsolid-shear-poisson",
      name: "Shear modulus, Poisson's ratio and the relations between the moduli",
      intuition:
        "A shearing force acts along a face, not across it, and changes the body's shape rather than its volume. The top slides by x over the height h, so the shear strain is the angle θ = x/h. Separately, a stretched wire also gets thinner: Poisson's ratio compares that sideways strain with the lengthwise one.",
      definition:
        "- Shear: \\(\\eta = \\dfrac{F/A}{\\theta}\\) with \\(\\theta = \\dfrac{x}{h}\\), so \\(x = \\dfrac{Fh}{A\\eta}\\). A is the face the force acts on; h is the distance from that face to the fixed one.\n" +
        "- A square slab of side l and thickness d sheared on its narrow face: \\(A = ld\\), \\(h = l\\), so \\(\\theta = \\dfrac{F}{\\eta l d}\\).\n" +
        "- A cylinder of radius r sheared at its top: \\(\\theta = \\dfrac{F}{\\pi r^{2}\\eta}\\).\n" +
        "- Poisson's ratio \\(\\sigma = \\dfrac{\\text{lateral strain}}{\\text{longitudinal strain}}\\), taken as a positive number.\n" +
        "- \\(Y = 2\\eta(1 + \\sigma) = 3B(1 - 2\\sigma)\\). Removing σ gives \\(\\dfrac{9}{Y} = \\dfrac{1}{B} + \\dfrac{3}{\\eta}\\); removing Y gives \\(\\sigma = \\dfrac{3B - 2\\eta}{6B + 2\\eta}\\).\n" +
        "- Kinds of stress: a normal force on one pair of faces (tensile or compressive) goes with Y, a tangential force with η, and an equal pressure on every face with B. The restoring force per unit area is the stress.",
      formula: {
        label: "Shear and the relations",
        latex: "\\eta = \\frac{F/A}{x/h} \\qquad Y = 2\\eta(1 + \\sigma) = 3B(1 - 2\\sigma)",
      },
      authoredExample: {
        prompt:
          "A cube of jelly of side 10 cm has a modulus of rigidity of \\(2 \\times 10^{4}\\ \\text{N/m}^{2}\\). Its bottom is held fixed and a force of 6 N acts along its top face. How far does the top move?",
        steps: [
          "The force acts on the top face: \\(A = (0.1)^{2} = 10^{-2}\\ \\text{m}^{2}\\), and \\(h = 0.1\\ \\text{m}\\).",
          "\\(x = \\dfrac{Fh}{A\\eta} = \\dfrac{6 \\times 0.1}{10^{-2} \\times 2 \\times 10^{4}} = \\dfrac{0.6}{200} = 3 \\times 10^{-3}\\ \\text{m}\\).",
        ],
        answer: "3 mm",
      },
      selfCheckExample: {
        prompt:
          "For a metal, \\(Y = 2.4 \\times 10^{11}\\ \\text{N/m}^{2}\\) and \\(\\eta = 1 \\times 10^{11}\\ \\text{N/m}^{2}\\). Find Poisson's ratio and the bulk modulus.",
        steps: [
          "\\(1 + \\sigma = \\dfrac{Y}{2\\eta} = 1.2\\), so \\(\\sigma = 0.2\\).",
          "\\(B = \\dfrac{Y}{3(1 - 2\\sigma)} = \\dfrac{2.4 \\times 10^{11}}{3 \\times 0.6} \\approx 1.33 \\times 10^{11}\\ \\text{N/m}^{2}\\).",
          "Check: \\(\\dfrac{9}{2.4} = 3.75\\) and \\(\\dfrac{1}{1.33} + \\dfrac{3}{1} = 0.75 + 3 = 3.75\\).",
        ],
        answer: "\\(\\sigma = 0.2\\), \\(B \\approx 1.33 \\times 10^{11}\\ \\text{N/m}^{2}\\)",
      },
      practiceSet: [
        { prompt: "A wire's lateral strain is \\(5 \\times 10^{-4}\\) while its longitudinal strain is \\(2 \\times 10^{-3}\\). Poisson's ratio?", answer: "0.25" },
        { prompt: "A rod of radius 1 cm \\((\\eta = 10^{10}\\ \\text{N/m}^{2})\\) takes a shear force of \\(3.14 \\times 10^{3}\\) N at its top. Angle turned by its axis?", answer: "\\(10^{-3}\\) rad", method: "\\(\\theta = F/(\\pi r^{2}\\eta)\\)." },
        { prompt: "An equal pressure acts on every face of a body. Which modulus measures its response?", answer: "The bulk modulus" },
        { prompt: "\\(B = 2 \\times 10^{11}\\ \\text{N/m}^{2}\\) and \\(\\sigma = 0.25\\). Find Y.", answer: "\\(3 \\times 10^{11}\\ \\text{N/m}^{2}\\)", method: "\\(3B(1 - 2\\sigma) = 3 \\times 2 \\times 10^{11} \\times 0.5\\)." },
      ],
      pyqExampleId: "4fc2c3a4-70c5-4fd8-aa41-d70908972a74", // 5 Apr 2026 Shift 1: 10 N on the top face of a 5 cm cube
      traps: [
        {
          title: "The area of the wrong face",
          body: "A is the face the force acts on. A slab pushed on its narrow face has A = side × thickness, and the height is the side, not the thickness.",
        },
        {
          title: "Shear strain is an angle",
          body: "The strain is θ = x/h in radians, not the displacement x. Find θ first, then multiply by h if the question asks how far the top moves.",
        },
      ],
    },
  ],
};
