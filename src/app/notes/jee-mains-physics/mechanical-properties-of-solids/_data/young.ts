import type { SubtopicNote } from "@/app/notes/_types";

export const YOUNG_SOLID_NOTE: SubtopicNote = {
  subtopicName: "Stress, Strain and Young's Modulus",
  title: "Stress, Strain and Young's Modulus",
  oneLineDefinition:
    "A wire under a tension F stretches by ΔL = FL/(AY): stress F/A divided by strain ΔL/L is Young's modulus Y, a number fixed by the material and not by the size of the wire.",
  whyItMatters:
    "Twenty-seven PYQs, eight of them asking for a number, and four from 2026. Nine compute a stress, a strain or an extension, nine compare two wires by ratio, and nine read Young's modulus off a graph or ask what it depends on. Most of the arithmetic is unit work: a diameter turned into an area, and mm² or cm² turned into m².",
  concepts: [
    // C1 — stress, strain, extension
    {
      kind: "formula" as const,
      slug: "jpsolid-stress-strain",
      name: "Stress, strain and the extension of a wire",
      intuition:
        "Stress is the force on each square metre of the cross-section, and strain is the stretch on each metre of length. Within the elastic limit the two are proportional, and the constant is Young's modulus. So a wire stretches more when it is longer, thinner or pulled harder, and less when its material is stiffer.",
      definition:
        "- Stress \\(= F/A\\), longitudinal strain \\(= \\Delta L/L\\), and \\(Y = \\dfrac{F/A}{\\Delta L/L}\\), so \\(\\Delta L = \\dfrac{FL}{AY}\\).\n" +
        "- Area from the radius or the diameter: \\(A = \\pi r^{2} = \\pi d^{2}/4\\). Units: \\(1\\ \\text{mm}^{2} = 10^{-6}\\ \\text{m}^{2}\\), \\(1\\ \\text{cm}^{2} = 10^{-4}\\ \\text{m}^{2}\\).\n" +
        "- A hollow column of radii r and R has \\(A = \\pi(R^{2} - r^{2})\\). A load shared equally by n columns puts \\(Mg/n\\) on each.\n" +
        "- A wire pulled at both ends by F carries a tension F, not 2F.\n" +
        "- A load m on a planet with gravity g′ pulls with mg′, so the same wire and load stretch in proportion to g′.\n" +
        "- Error in Y from \\(Y = \\dfrac{mgL}{\\pi r^{2}\\,\\Delta L}\\): \\(\\dfrac{\\delta Y}{Y} = \\dfrac{\\delta m}{m} + \\dfrac{\\delta L}{L} + 2\\dfrac{\\delta r}{r} + \\dfrac{\\delta(\\Delta L)}{\\Delta L}\\). The radius counts twice.",
      formula: {
        label: "Young's modulus",
        latex: "Y = \\frac{F/A}{\\Delta L/L} \\qquad \\Delta L = \\frac{FL}{AY}",
      },
      authoredExample: {
        prompt:
          "A steel wire 2.5 m long with a cross-section of \\(1.5\\ \\text{mm}^{2}\\) carries a 12 kg load. \\(Y = 2 \\times 10^{11}\\ \\text{N/m}^{2}\\), \\(g = 10\\ \\text{m/s}^{2}\\). Find the stress, the strain and the extension.",
        steps: [
          "\\(F = 12 \\times 10 = 120\\ \\text{N}\\) and \\(A = 1.5 \\times 10^{-6}\\ \\text{m}^{2}\\), so stress \\(= \\dfrac{120}{1.5 \\times 10^{-6}} = 8 \\times 10^{7}\\ \\text{N/m}^{2}\\).",
          "Strain \\(= \\dfrac{8 \\times 10^{7}}{2 \\times 10^{11}} = 4 \\times 10^{-4}\\).",
          "\\(\\Delta L = 4 \\times 10^{-4} \\times 2.5 = 10^{-3}\\ \\text{m}\\).",
        ],
        answer: "\\(8 \\times 10^{7}\\ \\text{N/m}^{2}\\), \\(4 \\times 10^{-4}\\), 1 mm",
      },
      selfCheckExample: {
        prompt:
          "Two students pull the ends of a wire 1.5 m long, area \\(1\\ \\text{mm}^{2}\\), each with 300 N. \\(Y = 1.5 \\times 10^{11}\\ \\text{N/m}^{2}\\). How much does the wire stretch?",
        steps: [
          "The tension is 300 N: the second student plays the part of a wall.",
          "\\(\\Delta L = \\dfrac{300 \\times 1.5}{10^{-6} \\times 1.5 \\times 10^{11}} = \\dfrac{450}{1.5 \\times 10^{5}} = 3 \\times 10^{-3}\\ \\text{m}\\).",
        ],
        answer: "3 mm",
      },
      practiceSet: [
        { prompt: "A 31.4 kg mass hangs from a wire of radius 1 mm \\((g = 10,\\ \\pi = 3.14)\\). Stress in the wire?", answer: "\\(10^{8}\\ \\text{N/m}^{2}\\)", method: "\\(314 / (3.14 \\times 10^{-6})\\)." },
        { prompt: "A wire stretches 0.6 mm under a load on Earth. The same wire and load on a planet where g is one-third of Earth's?", answer: "0.2 mm" },
        { prompt: "In finding Y, the radius has a 0.5% error and everything else is exact. Error in Y?", answer: "1%" },
        { prompt: "A \\(2 \\times 10^{4}\\) kg platform rests equally on four hollow columns of radii 0.1 m and 0.2 m \\((g = 10)\\). Compressive stress in each?", answer: "About \\(5.3 \\times 10^{5}\\ \\text{N/m}^{2}\\)", method: "\\(5 \\times 10^{4}\\ \\text{N}\\) over \\(\\pi(0.2^{2} - 0.1^{2}) = 0.03\\pi\\ \\text{m}^{2}\\)." },
      ],
      pyqExampleId: "3f5b7828-b48c-4988-8772-4a52c1c56568", // 9 Apr 2024: two people pull a wire with 200 N each
      traps: [
        {
          title: "Pulled from both ends is not twice the tension",
          body: "Two people pulling the ends with F each give a tension F, the same as a wall at one end and one person pulling with F. Using 2F doubles the answer.",
        },
        {
          title: "A diameter put in as a radius",
          body: "A = πd²/4. Putting the diameter into πr² makes the area four times too large and the extension four times too small.",
        },
        {
          title: "Squared units",
          body: "1 mm² is 10⁻⁶ m² and 1 cm² is 10⁻⁴ m². Converting only the length (10⁻³, 10⁻²) is the commonest slip.",
        },
      ],
    },

    // C2 — ratios between two wires
    {
      kind: "formula" as const,
      slug: "jpsolid-extension-ratios",
      name: "Comparing two wires by ratio",
      intuition:
        "When a question compares two wires, write ΔL = FL/(AY) as a ratio. Whatever the wires share cancels, and only the factors that differ remain. The area depends on the square of the diameter, so a diameter ratio enters squared.",
      definition:
        "- \\(\\Delta L \\propto \\dfrac{FL}{d^{2}Y}\\): take each factor's ratio, square the diameter (or radius) ratio, and multiply.\n" +
        "- Same load and the same extension: \\(Y \\propto L/A\\).\n" +
        "- Same material and the same volume: \\(L \\propto 1/A\\), so \\(\\Delta L \\propto F/A^{2}\\).\n" +
        "- Same material, same length and the same stress: the same strain, so the same extension.",
      formula: {
        label: "Two wires",
        latex: "\\frac{\\Delta L_1}{\\Delta L_2} = \\frac{F_1}{F_2}\\cdot\\frac{L_1}{L_2}\\cdot\\left(\\frac{d_2}{d_1}\\right)^{2}\\cdot\\frac{Y_2}{Y_1}",
      },
      authoredExample: {
        prompt:
          "Wire A is twice as long as wire B and has half its diameter. They are of the same material and carry the same load. Find the ratio of their extensions.",
        steps: [
          "Same F and Y, so \\(\\Delta L \\propto L/d^{2}\\).",
          "Length ratio \\(L_A/L_B = 2\\); area ratio \\((d_B/d_A)^{2} = 4\\).",
          "\\(\\dfrac{\\Delta L_A}{\\Delta L_B} = 2 \\times 4 = 8\\).",
        ],
        answer: "8 : 1",
      },
      selfCheckExample: {
        prompt:
          "Wire A is 4 m long with area \\(2\\ \\text{mm}^{2}\\); wire B is 3 m long with area \\(1\\ \\text{mm}^{2}\\). Under the same load they stretch by the same amount. Find \\(Y_A : Y_B\\).",
        steps: [
          "Same F and ΔL, so \\(Y \\propto L/A\\).",
          "\\(\\dfrac{Y_A}{Y_B} = \\dfrac{4/2}{3/1} = \\dfrac{2}{3}\\).",
        ],
        answer: "2 : 3",
      },
      practiceSet: [
        { prompt: "Same material; wire 2 has three times the length, three times the radius and three times the load of wire 1. Its extension?", answer: "The same as wire 1", method: "\\(3 \\times 3 / 3^{2} = 1\\)." },
        { prompt: "Same material and volume, areas in the ratio 2 : 1, same force. Ratio of extensions?", answer: "1 : 4" },
        { prompt: "The load and the radius are both doubled, length unchanged. The extension becomes?", answer: "Half", method: "\\(2/2^{2}\\)." },
        { prompt: "Same length and area, Young's moduli in the ratio 2 : 5, same load. Ratio of extensions?", answer: "5 : 2" },
      ],
      pyqExampleId: "41d1f123-a197-4c19-8c3b-ae9af2e8a0e6", // 7 Apr 2025: lengths 1 : 3, diameters 2 : 1, same force
      traps: [
        {
          title: "Forgetting to square the diameter",
          body: "A diameter ratio of 2 is an area ratio of 4. Using 2 leaves the answer off by a factor of 2.",
        },
        {
          title: "Same volume moves the length too",
          body: "If a wire of fixed volume is made four times thicker in area, it becomes four times shorter. Both changes go into ΔL ∝ FL/A.",
        },
      ],
    },

    // C3 — what Y depends on, and graphs
    {
      kind: "reference" as const,
      slug: "jpsolid-material-graphs",
      name: "What Young's modulus depends on, and reading it off a graph",
      intuition:
        "Young's modulus belongs to the material, not to the wire. A longer or thinner wire stretches more under a load, but its Y is the same. To read Y off a graph, first write the slope from ΔL = FL/(AY), then decide whether Y sits on top of that slope or below it.",
      definition:
        "- Y depends only on the material and its temperature. Changing L or A changes the extension under a load, not Y.\n" +
        "- Heating loosens the bonds between atoms, so Y falls as the temperature rises.\n" +
        "- In physics, more elastic means a larger Y: steel is more elastic than rubber. Steel's large Y and high elastic limit are why it is used for buildings and bridges.\n" +
        "- A graph's slope is a ratio of its axes. Write that ratio with ΔL = FL/(AY), then put in the numbers.",
      table: {
        columns: ["Graph (y against x)", "Slope", "What it gives"],
        rows: [
          { cells: ["Stress against strain", "\\(Y\\)", "The steepest line has the largest Y"] },
          { cells: ["Strain against stress", "\\(1/Y\\)", "The shallowest line has the largest Y"], noteAmber: "The axes are swapped from the usual plot, so the order reverses." },
          { cells: ["Load against extension", "\\(AY/L\\)", "\\(Y = \\text{slope} \\times L/A\\)"] },
          { cells: ["Extension against load", "\\(L/(AY)\\)", "\\(Y = L/(A \\times \\text{slope})\\)"], noteAmber: "A line at 45° has slope 1 only in the units printed on the axes." },
          { cells: ["Extension/load against length", "\\(1/(AY)\\)", "\\(Y = 1/(A \\times \\text{slope})\\)"] },
          { cells: ["Y against the length or radius of the wire", "Zero, a flat line", "Y does not depend on the wire's size"] },
        ],
        caption: "Write the slope from \\(\\Delta L = FL/(AY)\\) before reading any number off the axes.",
      },
      selfCheckExample: {
        prompt:
          "An extension–load line for a wire 2 m long with cross-section \\(1\\ \\text{mm}^{2}\\) rises by 0.5 mm for every 50 N. Find Y.",
        steps: [
          "Slope \\(= \\dfrac{0.5 \\times 10^{-3}}{50} = 10^{-5}\\ \\text{m/N}\\), and this slope is \\(L/(AY)\\).",
          "\\(Y = \\dfrac{L}{A \\times \\text{slope}} = \\dfrac{2}{10^{-6} \\times 10^{-5}} = 2 \\times 10^{11}\\ \\text{N/m}^{2}\\).",
        ],
        answer: "\\(2 \\times 10^{11}\\ \\text{N/m}^{2}\\)",
      },
      practiceSet: [
        { prompt: "The radius and the length of a wire are both tripled. Its Young's modulus?", answer: "Unchanged" },
        { prompt: "Strain (y) against stress (x) is plotted for four materials. Which line belongs to the largest Y?", answer: "The shallowest one" },
        { prompt: "Slope of the load–extension line of a 1 m wire, area \\(10^{-6}\\ \\text{m}^{2}\\), \\(Y = 10^{11}\\ \\text{N/m}^{2}\\)?", answer: "\\(10^{5}\\ \\text{N/m}\\)" },
        { prompt: "Stress against strain lines for steel and copper: which is steeper?", answer: "Steel, since its Y is larger" },
      ],
      pyqExampleId: "afc33018-7c50-47ef-966d-4870baea1bfe", // 5 Apr 2026 Shift 1: radius and length doubled
      traps: [
        {
          title: "Reading a strain–stress slope as Y",
          body: "With strain on the y-axis the slope is 1/Y. The steepest line there is the softest material, not the stiffest.",
        },
        {
          title: "Thinking a thicker wire has a larger Y",
          body: "A thicker wire stretches less under the same load because its stiffness AY/L is larger. Its Y, a property of the material, is unchanged.",
        },
      ],
    },
  ],
};
