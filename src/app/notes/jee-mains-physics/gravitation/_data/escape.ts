import type { SubtopicNote } from "@/app/notes/_types";

export const ESCAPE_GRAV_NOTE: SubtopicNote = {
  subtopicName: "Escape Velocity and Energy Conservation",
  title: "Escape Velocity and Energy Conservation",
  oneLineDefinition:
    "Escape velocity is √(2GM/R) = √(2gR), independent of the body's mass and direction; any launch or fall over a large distance is solved with KE − GMm/r conserved.",
  whyItMatters:
    "Twenty-three PYQs, twenty-two of them multiple choice, and two from 2026. Twelve scale the escape velocity from one planet to another; eleven use conservation of energy for a launch, a fall or an escape from a height. Four are statement or assertion questions. Whenever g would change over the distance travelled, energy conservation, not the constant-g equations, gives the answer.",
  concepts: [
    // C1 — escape velocity and its scaling
    {
      kind: "formula" as const,
      slug: "jpgrav-escape-scaling",
      name: "Escape velocity and how it scales between planets",
      intuition:
        "To escape, a body must climb from \\(-GMm/R\\) to zero energy, so its kinetic energy must be at least \\(GMm/R\\). The mass m cancels, and energy does not care about direction. What is left depends only on the planet: its mass and radius, or its density and radius.",
      definition:
        "- \\(v_e = \\sqrt{\\dfrac{2GM}{R}} = \\sqrt{2gR} = R\\sqrt{\\dfrac{8\\pi G\\rho}{3}}\\); 11.2 km/s for the earth.\n" +
        "- It does not depend on the mass of the body or on the angle of projection.\n" +
        "- Mass and radius given: \\(v_e \\propto \\sqrt{M/R}\\). Two planets with the same \\(M/R\\) have the same \\(v_e\\).\n" +
        "- Density and radius given: \\(v_e \\propto R\\sqrt{\\rho}\\).\n" +
        "- g and radius given: \\(v_e \\propto \\sqrt{gR}\\).\n" +
        "- Near the surface \\(v_e = \\sqrt{2}\\,v_o\\), where \\(v_o = \\sqrt{gR}\\) is the speed of a grazing orbit.\n" +
        "- The moon keeps no atmosphere because its \\(v_e\\) (about 2.4 km/s) is small enough for gas molecules to reach.",
      formula: {
        label: "Escape velocity",
        latex: "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} = R\\sqrt{\\frac{8\\pi G\\rho}{3}}",
      },
      authoredExample: {
        prompt:
          "A planet has 50 times the earth's mass and twice its radius. The escape velocity from the earth is 11.2 km/s. Find it for the planet.",
        steps: [
          "Mass and radius are given, so \\(v_e \\propto \\sqrt{M/R}\\).",
          "\\(\\dfrac{v_p}{v_e} = \\sqrt{\\dfrac{50}{2}} = 5\\).",
          "\\(v_p = 5 \\times 11.2\\).",
        ],
        answer: "56 km/s",
      },
      selfCheckExample: {
        prompt:
          "A planet has twice the earth's radius and half its density. Find its escape velocity, taking the earth's as 11.2 km/s.",
        steps: [
          "Density is given, so \\(v_e \\propto R\\sqrt{\\rho}\\).",
          "\\(\\dfrac{v_p}{v_e} = 2 \\times \\sqrt{\\tfrac{1}{2}} = \\sqrt{2}\\).",
          "\\(v_p = 11.2\\sqrt{2}\\).",
        ],
        answer: "About 15.8 km/s",
      },
      practiceSet: [
        { prompt: "\\(v_e\\) from \\(\\sqrt{2gR}\\) with \\(g = 10\\ \\text{m/s}^{2}\\) and \\(R = 6.4 \\times 10^{6}\\) m?", answer: "About 11.3 km/s" },
        { prompt: "A planet has the earth's density and three times its radius. Its \\(v_e\\)?", answer: "\\(3 \\times 11.2 = 33.6\\) km/s" },
        { prompt: "The mass of the projectile is doubled. Effect on \\(v_e\\)?", answer: "None" },
        { prompt: "Ratio of escape speed to grazing-orbit speed at the surface?", answer: "\\(\\sqrt{2}\\)" },
      ],
      pyqExampleId: "b564ca08-fdee-4c79-86d8-a63a95ea7f84", // 22 Jan 2026 S1: density and radius both 10% → 100√10 m/s
      traps: [
        {
          title: "Equal escape velocity needs equal M/R",
          body: "Two planets of different mass can have the same escape velocity only if M/R is the same. Equal MR, or equal M/R², does not do it.",
        },
        {
          title: "With density given, v_e grows with R, not √R",
          body: "v_e = R√(8πGρ/3). Doubling the radius at the same density doubles v_e. Writing √(M/R) and forgetting that M grows as R³ gives √2 instead.",
        },
        {
          title: "Direction does not matter",
          body: "A body thrown sideways, at 45° or straight up needs the same speed to escape. Escape is an energy condition, and kinetic energy has no direction.",
        },
      ],
    },

    // C2 — energy conservation with variable g
    {
      kind: "formula" as const,
      slug: "jpgrav-energy-conservation",
      name: "Energy conservation for launches and falls",
      intuition:
        "When a body travels a distance comparable to R, g changes along the way, so \\(v^{2} = u^{2} + 2gh\\) is wrong. Use energy instead: kinetic energy plus \\(-GMm/r\\) stays constant. Write it at the start and at the end, with r always measured from the centre.",
      definition:
        "- \\(\\tfrac{1}{2}mv_1^{2} - \\dfrac{GMm}{r_1} = \\tfrac{1}{2}mv_2^{2} - \\dfrac{GMm}{r_2}\\). Use \\(GM = gR^{2}\\).\n" +
        "- Energy needed to escape from the surface: \\(\\dfrac{GMm}{R} = mgR\\).\n" +
        "- Escape from a point at distance r from the centre: \\(v = \\sqrt{2GM/r}\\).\n" +
        "- Launched with \\(\\lambda v_e\\): the body rises to \\(r_{\\max} = \\dfrac{R}{1 - \\lambda^{2}}\\) from the centre.\n" +
        "- Falling from rest at distance r: \\(v^{2} = 2GM\\left(\\dfrac{1}{R} - \\dfrac{1}{r}\\right)\\). From infinity this is \\(v_e\\).\n" +
        "- From a grazing orbit, the extra speed to escape is \\((\\sqrt{2} - 1)\\sqrt{gR}\\).\n" +
        "- Between two bodies, a launch only has to reach the neutral point, where the two pulls balance; after that the other body pulls it in.",
      formula: {
        label: "Mechanical energy is conserved",
        latex: "\\tfrac{1}{2}mv_1^{2} - \\frac{GMm}{r_1} = \\tfrac{1}{2}mv_2^{2} - \\frac{GMm}{r_2} \\qquad r_{\\max} = \\frac{R}{1 - \\lambda^{2}}",
      },
      authoredExample: {
        prompt:
          "A body is released from rest at a height 2R above the earth's surface. Find its speed when it reaches the surface. Take \\(g = 10\\ \\text{m/s}^{2}\\) and \\(R = 6.4 \\times 10^{6}\\) m; ignore air.",
        steps: [
          "Start: \\(r_1 = 3R\\) from the centre, at rest. End: \\(r_2 = R\\).",
          "\\(\\tfrac{1}{2}v^{2} = GM\\left(\\dfrac{1}{R} - \\dfrac{1}{3R}\\right) = \\dfrac{2GM}{3R} = \\dfrac{2gR}{3}\\).",
          "\\(v = \\sqrt{\\dfrac{4gR}{3}} = \\sqrt{\\dfrac{4 \\times 10 \\times 6.4 \\times 10^{6}}{3}} = \\sqrt{8.53 \\times 10^{7}}\\).",
          "Constant g would give \\(\\sqrt{2g \\cdot 2R} = \\sqrt{4gR}\\), too large by \\(\\sqrt{3}\\).",
        ],
        answer: "\\(\\sqrt{4gR/3} \\approx 9.2\\) km/s",
      },
      selfCheckExample: {
        prompt:
          "A body is fired straight up from the surface at half the escape velocity. How high above the surface does it rise?",
        steps: [
          "\\(\\lambda = \\tfrac{1}{2}\\), so \\(r_{\\max} = \\dfrac{R}{1 - 1/4} = \\dfrac{4R}{3}\\).",
          "Height above the surface \\(= \\dfrac{4R}{3} - R\\).",
        ],
        answer: "\\(\\dfrac{R}{3}\\)",
      },
      practiceSet: [
        { prompt: "Least energy needed to send m from the surface to infinity?", answer: "\\(mgR\\)" },
        { prompt: "Speed at the surface of a body that falls from rest at infinity?", answer: "\\(\\sqrt{2gR}\\), the escape velocity" },
        { prompt: "Escape speed from a point at height R above the surface?", answer: "\\(\\sqrt{gR}\\)" },
        { prompt: "Extra speed a grazing satellite needs to escape?", answer: "\\((\\sqrt{2} - 1)\\sqrt{gR}\\)" },
      ],
      pyqExampleId: "84fc27ab-32e0-4032-98a5-deb6d808747e", // 26 Jul 2022: launched at v_e/3 → rises 800 km
      traps: [
        {
          title: "A fall from height R gives √(gR), not √(2gR)",
          body: "v² = 2gh assumes g stays the same over the whole fall. Over a distance R it does not; energy conservation gives v² = gR.",
        },
        {
          title: "Escape energy is mgR, not ½mgR",
          body: "The body must climb from −GMm/R to zero, which is GMm/R = mgR. Half of it, ½mgR, is the kinetic energy of a grazing orbit, a different quantity.",
        },
        {
          title: "r is from the centre",
          body: "In GMm/r, a point 3R above the surface has r = 4R. Using the height in place of r is the usual slip.",
        },
      ],
    },
  ],
};
