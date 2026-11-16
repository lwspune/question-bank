import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_FL_SURFACE_NOTE: SubtopicNote = {
  subtopicName: "Surface Tension and Capillarity",
  title: "Surface Tension and Capillarity",
  oneLineDefinition:
    "Surface tension as a force per unit length and an energy per unit area, the extra pressure inside drops and bubbles, and how the angle of contact decides whether a liquid rises or falls in a narrow tube.",
  whyItMatters:
    "Four NEET questions, one each year from 2022 to 2025. One asks what happens to the pressure inside a soap bubble as it grows (2022), one the energy needed to blow a soap bubble (2023), one the extra force to lift a flat disc off a water surface (2024), and one, the hardest in the chapter, the equation for the curved surface of a liquid where it meets a wall (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphfl-tension",
      name: "Surface tension and surface energy",
      intuition:
        "A molecule deep inside a liquid is pulled equally on all sides by its neighbours. A molecule at the surface has neighbours only below and beside it, so it has extra energy. The liquid therefore keeps its surface as small as it can, as if it were a stretched skin. Making more surface needs work, and that work per unit area is the surface tension.",
      definition:
        "- **Surface tension** S is the force per unit length along a line in the surface, and also the surface energy per unit area: \\(S = \\dfrac{F}{l} = \\dfrac{W}{\\Delta A}\\). SI unit N/m (same as J/m²).\n" +
        "- A soap film has **two** surfaces. Stretching it by an area \\(\\Delta A\\) needs \\(W = 2S\\Delta A\\); a slider of length l holding a film needs a force \\(2Sl\\).\n" +
        "- A drop of radius r has one surface: surface energy \\(4\\pi r^{2}S\\). A soap bubble has two: blowing it needs \\(8\\pi r^{2}S\\).\n" +
        "- A thin flat disc lying on water touches it along its rim, so lifting it needs an extra force \\(S \\times 2\\pi r\\).\n" +
        "- Surface tension falls as the temperature rises. Soaps and detergents lower the surface tension of water.\n" +
        "- Small drops are nearly round: for them surface tension beats gravity, and a sphere has the least surface for a given volume.",
      formula: {
        label: "Surface tension",
        latex: "S = \\frac{F}{l} = \\frac{W}{\\Delta A}, \\qquad W_{\\text{film}} = 2S\\Delta A, \\qquad W_{\\text{bubble}} = 8\\pi r^{2} S",
        symbols: [
          { symbol: "\\(S\\)", meaning: "surface tension of the liquid" },
          { symbol: "\\(\\Delta A\\)", meaning: "area added to each surface" },
        ],
      },
      authoredExample: {
        prompt:
          "A soap film is held on a wire frame by a sliding wire 10 cm long. The wire is pulled out by 2 cm. The surface tension of the soap solution is 0.04 N/m. How much work is done?",
        steps: [
          "Area added to each face: \\(0.1 \\times 0.02 = 2 \\times 10^{-3}\\ \\text{m}^{2}\\).",
          "The film has two faces: \\(W = 2S\\Delta A = 2 \\times 0.04 \\times 2 \\times 10^{-3} = 1.6 \\times 10^{-4}\\) J.",
        ],
        answer: "\\(1.6 \\times 10^{-4}\\) J",
      },
      selfCheckExample: {
        prompt:
          "Find the surface energy of a water drop of radius 1 mm. (Surface tension of water = 0.07 N/m)",
        steps: [
          "A drop has a single surface of area \\(4\\pi r^{2}\\).",
          "\\(E = 4\\pi r^{2} S = 4\\pi \\times 10^{-6} \\times 0.07 \\approx 8.8 \\times 10^{-7}\\) J.",
        ],
        answer: "\\(8.8 \\times 10^{-7}\\) J",
      },
      practiceSet: [
        { prompt: "Write the SI unit of surface tension in two equivalent ways.", answer: "N/m or J/m²" },
        { prompt: "Does adding a detergent raise or lower the surface tension of water?", answer: "It lowers it" },
        { prompt: "A sliding wire 5 cm long holds a soap film of surface tension 0.03 N/m. What force holds the wire still?", answer: "\\(3 \\times 10^{-3}\\) N" },
        { prompt: "Why are very small drops of a liquid nearly spherical?", answer: "Surface tension outweighs gravity, and a sphere has the least surface area for its volume" },
      ],
      pyqExampleId: "0c5019bf-ed97-4c2f-9b6d-117a4f02f26c",
      traps: [
        {
          title: "A soap film or bubble has two surfaces",
          body: "A soap bubble has an inner and an outer surface, so the work to blow it is \\(2 \\times 4\\pi r^{2} S = 8\\pi r^{2}S\\). A liquid drop has only one surface, \\(4\\pi r^{2}S\\).",
        },
        {
          title: "Heat and soap both lower surface tension",
          body: "Surface tension falls as a liquid is warmed, and detergents reduce it further. A statement that soapy or hot water has the higher surface tension is false.",
        },
        {
          title: "Count the lines of contact",
          body: "The surface-tension force is S times the length of the line where the liquid touches the object. A flat disc touches water along one rim, length \\(2\\pi r\\); a film pulls on both its faces.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphfl-excess",
      name: "Excess pressure in drops and bubbles",
      intuition:
        "A curved liquid surface squeezes what is inside it, like a stretched balloon. So the pressure inside a drop or a bubble is more than outside. A tightly curved, small surface squeezes harder than a gently curved, big one. That is why the excess pressure goes as \\(1/r\\), and why the pressure inside a bubble falls as it grows.",
      definition:
        "- Liquid drop of radius r: \\(P_{in} - P_{out} = \\dfrac{2S}{r}\\).\n" +
        "- Air bubble inside a liquid (one surface): \\(\\dfrac{2S}{r}\\).\n" +
        "- Soap bubble in air (two surfaces): \\(\\dfrac{4S}{r}\\).\n" +
        "- In every case the excess pressure goes as \\(\\dfrac{1}{r}\\): the smaller the bubble, the larger the pressure inside.",
      formula: {
        label: "Excess pressure",
        latex: "\\Delta P_{\\text{drop}} = \\frac{2S}{r}, \\qquad \\Delta P_{\\text{soap bubble}} = \\frac{4S}{r}",
      },
      authoredExample: {
        prompt:
          "A soap bubble of radius 1 cm is blown from a solution of surface tension 0.025 N/m. Find the excess pressure inside it. What would it be for a drop of the same liquid and radius?",
        steps: [
          "Soap bubble, two surfaces: \\(\\Delta P = \\dfrac{4S}{r} = \\dfrac{4 \\times 0.025}{0.01} = 10\\) Pa.",
          "Drop, one surface: \\(\\Delta P = \\dfrac{2S}{r} = 5\\) Pa.",
        ],
        answer: "10 Pa for the bubble, 5 Pa for the drop",
      },
      selfCheckExample: {
        prompt:
          "Two soap bubbles have radii 2 cm and 4 cm. Find the ratio of their excess pressures and the ratio of their volumes.",
        steps: [
          "\\(\\Delta P \\propto \\dfrac{1}{r}\\): \\(\\dfrac{\\Delta P_1}{\\Delta P_2} = \\dfrac{4}{2} = 2 : 1\\).",
          "\\(V \\propto r^{3}\\): \\(\\dfrac{V_1}{V_2} = \\left(\\dfrac{2}{4}\\right)^{3} = 1 : 8\\).",
        ],
        answer: "Pressures 2 : 1; volumes 1 : 8",
      },
      practiceSet: [
        { prompt: "Find the excess pressure inside an air bubble of radius 0.1 mm just under the surface of water (surface tension 0.07 N/m).", answer: "1400 Pa" },
        { prompt: "Find the excess pressure inside a mercury drop of radius 2 mm (surface tension 0.5 N/m).", answer: "500 Pa" },
        { prompt: "The excess pressure in one soap bubble is three times that in another. Ratio of their radii?", answer: "1 : 3" },
        { prompt: "Is the excess pressure inside an air bubble in water \\(2S/r\\) or \\(4S/r\\), and why?", answer: "\\(2S/r\\): it has only one surface" },
      ],
      pyqExampleId: "f33d45b9-11af-4397-97a0-39b5818ef693",
      traps: [
        {
          title: "Bubble in air or bubble in water",
          body: "A soap bubble in air has two surfaces, so its excess pressure is \\(4S/r\\). An air bubble inside a liquid has one surface, so it is \\(2S/r\\), the same as a drop.",
        },
        {
          title: "A bigger bubble has less pressure inside",
          body: "Excess pressure goes as \\(1/r\\). As a bubble grows its inside pressure falls; the smaller of two bubbles has the higher pressure.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphfl-capillary",
      name: "Angle of contact and capillary rise",
      intuition:
        "Where a liquid meets a solid, two pulls compete: the liquid's molecules pull on each other, and the solid pulls on the liquid. If the solid wins, the liquid spreads, curves up the wall and climbs a narrow tube. Water on clean glass does this. If the liquid's own pull wins, as for mercury on glass, it curves down and sinks in the tube. The angle at which the surface meets the wall tells you which happened.",
      definition:
        "- **Angle of contact** \\(\\theta\\): the angle, inside the liquid, between the solid and the liquid surface where they meet. It depends on the pair of materials. It decides how well a liquid wets a surface.\n" +
        "- Acute \\(\\theta\\) (water on glass): concave surface, the liquid rises in a tube. Obtuse \\(\\theta\\) (mercury on glass): convex surface, the liquid falls. \\(\\theta = 90^{\\circ}\\): flat surface, no rise or fall.\n" +
        "- **Capillary rise** in a tube of radius r: \\(h = \\dfrac{2S\\cos\\theta}{\\rho g r}\\). So \\(h \\propto \\dfrac{1}{r}\\), and h falls in warm water because S falls.\n" +
        "- The rise happens because just under a curved surface the pressure is less than outside. In the same way, wherever a liquid surface stands a height y above the flat level, the liquid just under it is below the outside pressure by \\(\\rho g y\\), and the curve of the surface supplies that difference through surface tension. For a surface curved in one direction only, with a gentle slope, this reads \\(S\\dfrac{d^{2}y}{dx^{2}} = \\rho g y\\): the higher the surface stands, the more sharply it curves.",
      formula: {
        label: "Capillary rise",
        latex: "h = \\frac{2S\\cos\\theta}{\\rho g r}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle of contact" },
          { symbol: "\\(r\\)", meaning: "radius of the tube" },
          { symbol: "\\(\\rho\\)", meaning: "density of the liquid" },
        ],
      },
      authoredExample: {
        prompt:
          "Water rises in a clean glass tube of radius 0.5 mm. Find the height it rises to. (S = 0.07 N/m, \\(\\theta = 0^{\\circ}\\), \\(\\rho = 1000\\ \\text{kg m}^{-3}\\), g = 10 m/s²)",
        steps: [
          "\\(h = \\dfrac{2S\\cos\\theta}{\\rho g r} = \\dfrac{2 \\times 0.07 \\times 1}{1000 \\times 10 \\times 5 \\times 10^{-4}}\\).",
          "\\(h = \\dfrac{0.14}{5} = 0.028\\) m, that is 2.8 cm.",
        ],
        answer: "2.8 cm",
      },
      selfCheckExample: {
        prompt:
          "A glass tube is dipped in mercury, whose angle of contact with glass is about 140°. Does the mercury rise or fall in the tube, and what shape is its surface?",
        steps: [
          "140° is obtuse, so \\(\\cos\\theta\\) is negative and h is negative.",
          "The mercury falls below the outside level, and its surface in the tube is convex.",
        ],
        answer: "It falls; the surface is convex",
      },
      practiceSet: [
        { prompt: "A liquid meets a tube wall at an angle of contact of 90°. How high does it rise in the tube?", answer: "It neither rises nor falls" },
        { prompt: "The radius of a capillary tube is made one third. What happens to the height water rises to?", answer: "It becomes 3 times" },
        { prompt: "Does water rise higher in a capillary tube when it is cold or when it is hot?", answer: "When it is cold: surface tension falls on heating" },
        { prompt: "On what does the wettability of a surface by a liquid mainly depend?", answer: "The angle of contact between them" },
      ],
      pyqExampleId: "aa1589b2-cc36-413f-a404-e3747c87e1ed",
      traps: [
        {
          title: "A thinner tube gives a higher rise",
          body: "Capillary rise goes as \\(1/r\\). Halving the radius doubles the height; it does not halve it.",
        },
        {
          title: "Mercury goes down, not up",
          body: "For an obtuse angle of contact \\(\\cos\\theta\\) is negative, so the liquid is depressed. Mercury in glass stands lower inside the tube than outside, with a convex surface.",
        },
        {
          title: "No rise at 90 degrees",
          body: "A liquid that neither rises nor falls has an angle of contact of 90°, not 0°. At 0° the liquid wets the glass fully and rises the most.",
        },
      ],
    },
  ],
};
