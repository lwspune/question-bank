import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_SO_YOUNG_NOTE: SubtopicNote = {
  subtopicName: "Stress, Strain and Young's Modulus",
  title: "Stress, Strain and Young's Modulus",
  oneLineDefinition:
    "Stress as restoring force per unit area and strain as a fractional change, Hooke's law and Young's modulus (ΔL = FL/AY), the elastic limit, and the stress in a rod that is heated but not allowed to expand.",
  whyItMatters:
    "Three NEET questions, from 2023 and 2024. NEET 2023 asks for the stress in a wire holding a block. NEET 2024 asked twice: the largest stretch of a steel wire from its elastic limit and Young's modulus, and the force in a heated bar that is not allowed to expand.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphso-stress-strain",
      name: "Stress, strain and Hooke's law",
      intuition:
        "Pull on a wire and it stretches a little. Inside it, the particles pull back, and that restoring force spread over the cross-section is the stress. How much the wire has stretched compared with its length is the strain. For small stretches the two are in proportion: double the stress and the strain doubles. That is Hooke's law.",
      definition:
        "- **Stress** = restoring force per unit area, \\(\\dfrac{F}{A}\\). Unit N m⁻², called the pascal (Pa).\n" +
        "- **Longitudinal strain** \\(= \\dfrac{\\Delta L}{L}\\). Stretching gives tensile stress, squeezing gives compressive stress.\n" +
        "- **Shearing strain** \\(= \\dfrac{\\Delta x}{L} = \\tan\\theta\\), when a force acts along a face and the opposite face is held.\n" +
        "- **Volume strain** \\(= \\dfrac{\\Delta V}{V}\\), when a body is pressed equally from all sides (hydraulic stress).\n" +
        "- Strain is a ratio of two lengths or two volumes, so it has no unit.\n" +
        "- **Hooke's law**: for small deformations, stress is proportional to strain.",
      formula: {
        label: "Stress and strain",
        latex: "\\text{stress} = \\frac{F}{A}, \\qquad \\text{longitudinal strain} = \\frac{\\Delta L}{L}, \\qquad \\text{stress} \\propto \\text{strain}",
        symbols: [
          { symbol: "\\(F\\)", meaning: "force acting on the cross-section" },
          { symbol: "\\(A\\)", meaning: "area of cross-section" },
          { symbol: "\\(\\Delta L\\)", meaning: "change in length" },
        ],
      },
      authoredExample: {
        prompt:
          "A concrete column with a cross-section of 0.5 m² and a height of 4 m supports a load of \\(5 \\times 10^{5}\\) N, and its height shrinks by 0.2 mm. Find the compressive stress and the strain.",
        steps: [
          "Stress \\(= \\dfrac{F}{A} = \\dfrac{5 \\times 10^{5}}{0.5} = 1 \\times 10^{6}\\ \\text{N m}^{-2}\\).",
          "Strain \\(= \\dfrac{\\Delta L}{L} = \\dfrac{0.2 \\times 10^{-3}}{4} = 5 \\times 10^{-5}\\), with no unit.",
        ],
        answer: "\\(1 \\times 10^{6}\\ \\text{N m}^{-2}\\) and \\(5 \\times 10^{-5}\\)",
      },
      selfCheckExample: {
        prompt:
          "The bottom face of a cube of side 10 cm is fixed. A force along the top face moves it sideways by 0.02 mm. What is the shearing strain?",
        steps: [
          "Shearing strain \\(= \\dfrac{\\Delta x}{L}\\), with \\(\\Delta x = 0.02\\) mm \\(= 2 \\times 10^{-5}\\) m and \\(L = 0.1\\) m.",
          "Strain \\(= \\dfrac{2 \\times 10^{-5}}{0.1} = 2 \\times 10^{-4}\\).",
        ],
        answer: "\\(2 \\times 10^{-4}\\)",
      },
      practiceSet: [
        { prompt: "What is the SI unit of stress?", answer: "N m⁻², the pascal" },
        { prompt: "What is the unit of strain?", answer: "It has none: it is a ratio" },
        { prompt: "A wire 3 m long stretches by 1.5 mm. What is its longitudinal strain?", answer: "\\(5 \\times 10^{-4}\\)" },
        { prompt: "A body is pressed equally from all sides by a liquid. Which kind of strain does it get?", answer: "Volume strain" },
      ],
      pyqExampleId: "987f48eb-0361-4786-95c6-ea2377e45303",
      traps: [
        {
          title: "Stress uses the area of cross-section",
          body: "Divide the force by the area it acts across, the cross-section of the wire, not by the outer surface area of the wire.",
        },
        {
          title: "Strain has no unit",
          body: "Strain is a change in length divided by a length, so the units cancel. Stress has the unit of pressure, N m⁻²; the two are not the same kind of quantity.",
        },
        {
          title: "A light wire holding a load has the same stress all along it",
          body: "Every cross-section of a light wire holding a block of weight W carries the same tension W, so the stress is \\(\\dfrac{W}{A}\\) at every point, not half of it in the middle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphso-young",
      name: "Young's modulus and the elastic limit",
      intuition:
        "Young's modulus measures how hard a material is to stretch. A large Y means a big stress gives only a small strain, as in steel. It belongs to the material, so a long thin wire and a short thick one of the same steel have the same Y even though they stretch by different amounts. Hooke's law only holds up to the elastic limit; pull harder and the wire no longer returns to its length.",
      definition:
        "- **Young's modulus**: \\(Y = \\dfrac{\\text{stress}}{\\text{strain}} = \\dfrac{FL}{A\\Delta L}\\). Unit N m⁻². For steel, about \\(2 \\times 10^{11}\\ \\text{N m}^{-2}\\).\n" +
        "- Extension of a wire: \\(\\Delta L = \\dfrac{FL}{AY}\\). For one material and one load, \\(\\Delta L \\propto \\dfrac{L}{d^{2}}\\), since \\(A = \\dfrac{\\pi d^{2}}{4}\\).\n" +
        "- Y depends only on the material, not on the length or thickness of the wire. A perfectly rigid body would have an infinite Y.\n" +
        "- **Elastic limit**: the largest stress after which the wire still returns to its original length. The greatest stretch within it is \\(\\Delta L_{max} = \\dfrac{\\sigma_{limit}L}{Y}\\).\n" +
        "- Energy stored in a stretched wire: \\(U = \\dfrac{1}{2}F\\Delta L\\), that is \\(\\dfrac{1}{2} \\times \\text{stress} \\times \\text{strain}\\) per unit volume.",
      formula: {
        label: "Young's modulus",
        latex: "Y = \\frac{FL}{A\\Delta L}, \\qquad \\Delta L = \\frac{FL}{AY}, \\qquad U = \\frac{1}{2}F\\Delta L",
        symbols: [
          { symbol: "\\(Y\\)", meaning: "Young's modulus of the material" },
          { symbol: "\\(L\\)", meaning: "original length of the wire" },
          { symbol: "\\(\\Delta L\\)", meaning: "extension" },
        ],
      },
      authoredExample: {
        prompt:
          "A steel wire 2 m long with a cross-section of 1 mm² holds a load of 200 N. Find its extension. (\\(Y = 2 \\times 10^{11}\\ \\text{N m}^{-2}\\))",
        steps: [
          "\\(A = 1\\ \\text{mm}^{2} = 1 \\times 10^{-6}\\ \\text{m}^{2}\\).",
          "\\(\\Delta L = \\dfrac{FL}{AY} = \\dfrac{200 \\times 2}{1 \\times 10^{-6} \\times 2 \\times 10^{11}} = \\dfrac{400}{2 \\times 10^{5}}\\).",
          "\\(\\Delta L = 2 \\times 10^{-3}\\) m \\(= 2\\) mm.",
        ],
        answer: "2 mm",
      },
      selfCheckExample: {
        prompt:
          "Wires A and B are of the same material and carry the same load. B is twice as long as A and has twice its diameter. What is the ratio of their extensions, A to B?",
        steps: [
          "Same material and load, so \\(\\Delta L \\propto \\dfrac{L}{d^{2}}\\).",
          "A: \\(\\dfrac{1}{1^{2}} = 1\\). B: \\(\\dfrac{2}{2^{2}} = \\dfrac{1}{2}\\).",
          "Ratio A : B \\(= 1 : \\dfrac{1}{2} = 2 : 1\\).",
        ],
        answer: "2 : 1",
      },
      practiceSet: [
        { prompt: "A wire's length and radius are both halved. What happens to the Young's modulus of its material?", answer: "It stays the same" },
        { prompt: "What would be the Young's modulus of a perfectly rigid body?", answer: "Infinite" },
        { prompt: "What force stretches a wire of cross-section 1 mm² by 0.1% of its length, if \\(Y = 2 \\times 10^{11}\\ \\text{N m}^{-2}\\)?", answer: "200 N" },
        { prompt: "A wire is stretched by 2 mm by a force that rises slowly from zero to 100 N. How much energy is stored in it?", answer: "0.1 J" },
      ],
      pyqExampleId: "0132730b-0f07-4e75-9db5-74e9df8ec978",
      traps: [
        {
          title: "Y belongs to the material, not the wire",
          body: "Cutting a wire shorter or using a thinner one changes how much it stretches, but not its Young's modulus. Only a change of material changes Y.",
        },
        {
          title: "Extension goes as one over the diameter squared",
          body: "\\(\\Delta L = \\dfrac{FL}{AY}\\) and the area grows as \\(d^{2}\\). A wire of three times the diameter stretches one ninth as much, not one third.",
        },
        {
          title: "The stored energy has a half in it",
          body: "The force rises from zero to F as the wire stretches, so the work done is \\(\\dfrac{1}{2}F\\Delta L\\), not \\(F\\Delta L\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphso-thermal-stress",
      name: "Thermal stress",
      intuition:
        "A heated rod wants to grow by LαΔT. If its ends are held so it cannot grow, the supports squeeze it back by exactly that much. The rod then carries the stress that would cause a strain of αΔT. The length cancels out, so a long rod and a short one of the same material feel the same stress.",
      definition:
        "- Strain prevented in a clamped rod: \\(\\alpha\\Delta T\\).\n" +
        "- **Thermal stress** \\(= Y\\alpha\\Delta T\\). Force on the supports: \\(F = YA\\alpha\\Delta T\\).\n" +
        "- Heating a clamped rod gives a compressive stress; cooling it gives a tensile stress.\n" +
        "- The stress does not depend on the length of the rod.",
      formula: {
        label: "Thermal stress",
        latex: "\\text{stress} = Y\\alpha\\Delta T, \\qquad F = YA\\alpha\\Delta T",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "coefficient of linear expansion" },
          { symbol: "\\(\\Delta T\\)", meaning: "change in temperature" },
        ],
      },
      authoredExample: {
        prompt:
          "A brass rod is clamped between two rigid walls. By how much must its temperature rise for the thermal stress to reach \\(3.6 \\times 10^{7}\\ \\text{N m}^{-2}\\)? (\\(Y = 1 \\times 10^{11}\\ \\text{N m}^{-2}\\), \\(\\alpha = 1.8 \\times 10^{-5}\\ \\text{K}^{-1}\\))",
        steps: [
          "Thermal stress \\(= Y\\alpha\\Delta T\\), so \\(\\Delta T = \\dfrac{\\text{stress}}{Y\\alpha}\\).",
          "\\(Y\\alpha = 1 \\times 10^{11} \\times 1.8 \\times 10^{-5} = 1.8 \\times 10^{6}\\).",
          "\\(\\Delta T = \\dfrac{3.6 \\times 10^{7}}{1.8 \\times 10^{6}} = 20\\) K.",
        ],
        answer: "20 K",
      },
      selfCheckExample: {
        prompt:
          "Two rods of the same metal and the same cross-section, one 1 m long and one 2 m long, are each clamped at both ends and heated by the same amount. How do the forces on their supports compare?",
        steps: [
          "\\(F = YA\\alpha\\Delta T\\). Y, A, \\(\\alpha\\) and \\(\\Delta T\\) are the same for both.",
          "The length does not appear, so the forces are equal.",
        ],
        answer: "They are equal",
      },
      practiceSet: [
        { prompt: "A rod clamped at both ends is cooled. Is the stress in it tensile or compressive?", answer: "Tensile" },
        { prompt: "A clamped rod is replaced by one of the same metal with twice the cross-section and heated equally. What happens to the thermal stress and to the force?", answer: "The stress is the same; the force doubles" },
        { prompt: "What strain is prevented when a clamped rod with expansion coefficient α is heated by ΔT?", answer: "\\(\\alpha\\Delta T\\)" },
        { prompt: "On which of these does the thermal stress in a clamped rod not depend: its length, its α or its Y?", answer: "Its length" },
      ],
      pyqExampleId: "c451403d-7c4e-48a5-a588-d0abd1822246",
      traps: [
        {
          title: "Length cancels in thermal stress",
          body: "The prevented stretch is \\(L\\alpha\\Delta T\\) and the strain divides it by L, so the stress \\(Y\\alpha\\Delta T\\) does not depend on the length.",
        },
        {
          title: "Force needs the area",
          body: "\\(Y\\alpha\\Delta T\\) is a stress. To get the force on the supports multiply by the area of cross-section: \\(F = YA\\alpha\\Delta T\\).",
        },
        {
          title: "Heating squeezes, cooling pulls",
          body: "A clamped rod that is heated is pushed back by its supports, so it is under compression. A clamped rod that is cooled is held stretched, so it is under tension.",
        },
      ],
    },
  ],
};
