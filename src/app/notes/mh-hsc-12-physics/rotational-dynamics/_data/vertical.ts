import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_RD_VERTICAL_NOTE: SubtopicNote = {
  subtopicName: "Vertical Circular Motion",
  title: "Vertical Circular Motion",
  oneLineDefinition:
    "A body whirled in a vertical circle: the least speeds at the top, the midway point and the bottom, the tension at each point, and how its energy is shared on the way round.",
  whyItMatters:
    "9 questions, five of them from board papers from 2018 to 2023. The board asks you to derive the speeds at the lowest, midway and highest points for a body that just completes the circle (2023), give the energy at different points (2018, 2019), find the difference in tension between the horizontal and the top positions (2022) and find the least speed of a motorcyclist at the top of a spherical cage (2020). The textbook adds the sphere of death and the difference between the extreme tensions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscprd-critical-speeds",
      name: "Least speeds at the top, middle and bottom",
      intuition:
        "At the top, gravity alone can bend the path into the circle if the body moves just fast enough; any slower and the string goes slack and the body falls. On the way down the body gains speed from the height it loses, so the least speeds at the midway point and the bottom follow from energy conservation.",
      definition:
        "- Points: A the lowest, B the midway point (string horizontal), C the highest. Speeds \\(v_L\\), \\(v_M\\), \\(v_H\\).\n" +
        "- At the top C, tension and weight both point to the centre: \\(T_H + mg = \\dfrac{mv_H^2}{r}\\).\n" +
        "- The string just stays taut when \\(T_H = 0\\), so the least speed at the top is \\(v_H = \\sqrt{rg}\\).\n" +
        "- From C down to A the body falls \\(2r\\): \\(\\tfrac{1}{2}mv_L^2 = \\tfrac{1}{2}mv_H^2 + mg(2r)\\), so \\(v_L = \\sqrt{5rg}\\).\n" +
        "- B is a height r above A: \\(v_M^2 = v_L^2 - 2gr = 3gr\\), so \\(v_M = \\sqrt{3rg}\\).\n" +
        "- Ratio \\(v_L : v_M : v_H = \\sqrt{5} : \\sqrt{3} : 1\\).\n" +
        "- With a rigid rod in place of a string, the speed at the top can be zero, because a rod can push. The least speed at the bottom is then \\(\\sqrt{4rg}\\).",
      formula: {
        label: "Least speeds in a vertical circle",
        latex: "v_H = \\sqrt{rg}, \\qquad v_M = \\sqrt{3rg}, \\qquad v_L = \\sqrt{5rg}",
      },
      authoredExample: {
        prompt:
          "A stone tied to a string 0.9 m long is whirled in a vertical circle. Find the least speeds it must have at the top and at the bottom to complete the circle. (g = 10 m/s²)",
        steps: [
          "Given: \\(r = 0.9\\) m, \\(g = 10\\) m/s².",
          "Formula: \\(v_H = \\sqrt{rg}\\), \\(v_L = \\sqrt{5rg}\\).",
          "Substitution: \\(v_H = \\sqrt{0.9 \\times 10} = \\sqrt{9} = 3\\) m/s.",
          "\\(v_L = \\sqrt{5 \\times 0.9 \\times 10} = \\sqrt{45} = 6.71\\) m/s.",
        ],
        answer: "3 m/s at the top; 6.71 m/s at the bottom",
      },
      selfCheckExample: {
        prompt:
          "A ball on a string 2.5 m long just completes a vertical circle with the least possible speed. Find its speed when the string is horizontal. (g = 10 m/s²)",
        steps: ["\\(v_M = \\sqrt{3rg} = \\sqrt{3 \\times 2.5 \\times 10} = \\sqrt{75}\\)."],
        answer: "8.66 m/s",
      },
      practiceSet: [
        { prompt: "What is the tension in the string at the top when the body has the least possible speed there?", answer: "Zero" },
        { prompt: "Find the least speed at the top of a vertical circle of radius 1.6 m. (g = 10 m/s²)", answer: "4 m/s" },
        { prompt: "Can a stone on a string have zero speed at the top of a vertical circle and still go round?", answer: "No. The string goes slack and the stone falls. A rigid rod would allow it" },
      ],
      pyqExampleId: "ce5d4776-e830-4873-b65e-cae797e852b7",
      traps: [
        {
          title: "Starting at the wrong point",
          body: "Begin at the top with \\(T_H = 0\\), then use energy to come down. The bottom speed \\(\\sqrt{5rg}\\) does not come from setting the tension at the bottom to zero.",
        },
        {
          title: "Heights of the points",
          body: "The top is 2r above the bottom and the midway point is r above it. Using r for the fall from top to bottom gives \\(\\sqrt{3rg}\\) at the bottom, which is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-vertical-tension",
      name: "Tension at different points",
      intuition:
        "At the bottom the string must hold up the weight and also pull the body inwards, so the tension is largest there. At the top the weight already pulls inwards, so the string has the least to do.",
      definition:
        "- Bottom: \\(T_L - mg = \\dfrac{mv_L^2}{r}\\), so \\(T_L = \\dfrac{mv_L^2}{r} + mg\\).\n" +
        "- Top: \\(T_H + mg = \\dfrac{mv_H^2}{r}\\), so \\(T_H = \\dfrac{mv_H^2}{r} - mg\\).\n" +
        "- Midway (string horizontal): the weight is along the tangent, so \\(T_M = \\dfrac{mv_M^2}{r}\\).\n" +
        "- With \\(v_L^2 - v_H^2 = 4gr\\): \\(T_L - T_H = 6mg\\). With \\(v_M^2 - v_H^2 = 2gr\\): \\(T_M - T_H = 3mg\\).\n" +
        "- These differences hold at any speed: they depend only on the weight of the body.\n" +
        "- In a sphere of death or a giant wheel the normal reaction plays the part of tension, and \\(N_L - N_H = 6mg\\).",
      formula: {
        label: "Differences in tension",
        latex: "T_L - T_H = 6mg, \\qquad T_M - T_H = 3mg",
      },
      authoredExample: {
        prompt:
          "A ball of mass 0.5 kg on a string 1 m long moves in a vertical circle with a speed of 8 m/s at the bottom. Find the tension at the bottom and at the top. (g = 10 m/s²)",
        steps: [
          "Given: \\(m = 0.5\\) kg, \\(r = 1\\) m, \\(v_L = 8\\) m/s, \\(g = 10\\) m/s².",
          "Formula: \\(T_L = \\dfrac{mv_L^2}{r} + mg\\); \\(v_H^2 = v_L^2 - 4gr\\); \\(T_H = \\dfrac{mv_H^2}{r} - mg\\).",
          "Bottom: \\(T_L = \\dfrac{0.5 \\times 64}{1} + 5 = 32 + 5 = 37\\) N.",
          "Top: \\(v_H^2 = 64 - 40 = 24\\), so \\(T_H = 0.5 \\times 24 - 5 = 12 - 5 = 7\\) N.",
          "Check: \\(T_L - T_H = 30\\) N \\(= 6mg\\).",
        ],
        answer: "37 N at the bottom; 7 N at the top",
      },
      selfCheckExample: {
        prompt:
          "A body of mass 2 kg moves on a string in a vertical circle. By how much does the tension at the lowest point exceed the tension at the highest point? (g = 10 m/s²)",
        steps: ["\\(T_L - T_H = 6mg = 6 \\times 2 \\times 10\\)."],
        answer: "120 N",
      },
      practiceSet: [
        { prompt: "Where in a vertical circle is the tension in the string greatest?", answer: "At the lowest point" },
        { prompt: "When the string is horizontal, which force alone supplies the centripetal force?", answer: "The tension" },
        { prompt: "Does the difference between the tensions at the lowest and highest points depend on the speed?", answer: "No. It is 6mg at any speed" },
      ],
      pyqExampleId: "a88bed01-f73c-427c-9672-bd8caf3033d6",
      traps: [
        {
          title: "The sign of mg at the top and bottom",
          body: "At the top the weight points to the centre, so \\(T_H = \\dfrac{mv^2}{r} - mg\\). At the bottom it points away, so \\(T_L = \\dfrac{mv^2}{r} + mg\\).",
        },
        {
          title: "Adding the weight at the midway point",
          body: "With the string horizontal, the weight acts along the tangent and has no part along the string. There \\(T_M = \\dfrac{mv_M^2}{r}\\) alone.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscprd-vertical-energy",
      name: "Energy at different points",
      intuition:
        "The tension always pulls at right angles to the motion, so it does no work. Only gravity does, and so the total mechanical energy stays the same all the way round. What the body loses in kinetic energy going up, it gains in potential energy.",
      definition:
        "- Take the lowest point as the zero of potential energy. Heights: lowest point 0, midway point r, highest point 2r.\n" +
        "- For a body that just completes the circle, \\(v_L^2 = 5gr\\), \\(v_M^2 = 3gr\\), \\(v_H^2 = gr\\). The table gives the energies that follow.\n" +
        "- The total is \\(\\tfrac{5}{2}mgr\\) at every point.",
      table: {
        columns: ["Position", "Kinetic energy", "Potential energy", "Total energy"],
        rows: [
          {
            cells: ["Lowest point", "\\(\\tfrac{5}{2}mgr\\)", "Zero", "\\(\\tfrac{5}{2}mgr\\)"],
            pyqExampleId: "8610b738-211a-4ac7-bece-0e3307abb0bc",
            noteAmber: "Board 2019 asked for the energy at each position, and Board 2018 for the potential energy at the top.",
          },
          { cells: ["Midway point", "\\(\\tfrac{3}{2}mgr\\)", "\\(mgr\\)", "\\(\\tfrac{5}{2}mgr\\)"] },
          { cells: ["Highest point", "\\(\\tfrac{1}{2}mgr\\)", "\\(2mgr\\)", "\\(\\tfrac{5}{2}mgr\\)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A ball of mass 0.1 kg just completes a vertical circle of radius 0.8 m. Find its kinetic energy at the midway point. (g = 10 m/s²)",
        steps: ["Kinetic energy at the midway point \\(= \\tfrac{3}{2}mgr = 1.5 \\times 0.1 \\times 10 \\times 0.8\\)."],
        answer: "1.2 J",
      },
      practiceSet: [
        { prompt: "Why does the tension do no work on a body moving in a vertical circle?", answer: "It is always perpendicular to the velocity" },
        { prompt: "A stone of mass 0.2 kg just completes a vertical circle of radius 1 m. Find its total energy, taking the lowest point as the zero level. (g = 10 m/s²)", answer: "5 J" },
        { prompt: "At which point of a vertical circle is the kinetic energy least?", answer: "At the highest point" },
      ],
      traps: [
        {
          title: "Thinking the total changes",
          body: "Kinetic and potential energy trade places as the body goes round, but their sum stays the same. A table whose totals differ has an arithmetic slip.",
        },
      ],
    },
  ],
};
