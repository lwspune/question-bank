import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_M3_SCALING_NOTE: SubtopicNote = {
  subtopicName: "Scaling and Comparing Solids",
  title: "Scaling and Comparing Solids",
  oneLineDefinition:
    "Areas change with the square of a length and volumes with its cube, so a change in radius or height becomes a product of factors, and two solids compare by ratios with every constant cancelled.",
  whyItMatters:
    "8 questions in the Tier II bank, 7 EASY and 1 MODERATE. None needs a full volume worked out: each is a factor or a ratio, which is why they are among the fastest marks in the chapter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2m3sc-factors",
      name: "Scale factors for area and volume",
      intuition:
        "Double a sphere's radius and its surface becomes 4 times as big and its volume 8 times. Every percentage change in a solid works the same way: turn each change into a factor and multiply.",
      definition:
        "- Sphere: surface goes with \\(r^2\\), volume with \\(r^3\\).\n" +
        "- Cylinder and cone: volume goes with \\(r^2 h\\); a cylinder's curved surface goes with \\(rh\\).\n" +
        "- Write each change as a factor (10% more is 1.1), raise or multiply as the formula says, then subtract 1 for the percentage.\n" +
        "- A length changed by \\(a\\%\\) changes an area by \\(2a + \\frac{a^2}{100}\\) per cent, the successive-change rule with itself.",
      formula: {
        label: "Changes in a solid",
        latex: "\\frac{V_2}{V_1} = \\left(\\frac{r_2}{r_1}\\right)^2 \\frac{h_2}{h_1}, \\quad \\frac{S_2}{S_1} = \\left(\\frac{r_2}{r_1}\\right)^2",
      },
      authoredExample: {
        prompt: "A cylinder's radius is increased by 10% and its height is reduced by 20%. Find the percentage change in its volume.",
        steps: ["Volume factor \\(= 1.1^2 \\times 0.8 = 1.21 \\times 0.8 = 0.968\\).", "The volume falls by 3.2%."],
        answer: "A fall of 3.2%",
      },
      selfCheckExample: {
        prompt: "A sphere's radius grows from 5 cm to 6 cm. By what percentage does its volume grow?",
        steps: ["Radius factor \\(= 1.2\\); volume factor \\(= 1.2^3 = 1.728\\).", "The volume grows by 72.8%."],
        answer: "72.8%",
      },
      practiceSet: [
        { prompt: "A sphere's radius is doubled. By what factor does its surface area grow?", answer: "4" },
        { prompt: "A cone's radius is doubled while its height is halved. By what factor does its volume change?", answer: "It doubles", method: "\\(4 \\times \\frac{1}{2}\\)" },
        { prompt: "A sphere's radius is cut by 10%. By what percentage does its surface area fall?", answer: "19%", method: "\\(0.9^2 = 0.81\\)" },
      ],
      pyqExampleId: "6207757f-f9fd-41b2-86d0-27e6d2984bc5",
      traps: [
        {
          title: "Giving the volume the radius's percentage",
          body: "A sphere whose radius grows by 10% grows by 33.1% in volume (\\(1.1^3 = 1.331\\)) and by 21% in surface, not by 10%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2m3sc-ratios",
      name: "Ratios of two solids",
      intuition:
        "To compare two solids of the same shape, write each formula as a ratio. The constants (\\(\\pi\\), \\(\\frac{1}{3}\\), \\(\\frac{4}{3}\\)) cancel, and only the ratios of radii and heights are left.",
      definition:
        "- Two cylinders, or two cones: \\(V_1 : V_2 = r_1^2 h_1 : r_2^2 h_2\\).\n" +
        "- Two spheres: \\(V_1 : V_2 = r_1^3 : r_2^3\\) and \\(S_1 : S_2 = r_1^2 : r_2^2\\).\n" +
        "- Given a ratio of surfaces, take the square root to get the radii; given volumes, the cube root.\n" +
        "- Given the sum and difference of two radii (or of their squares), find each radius first.",
      formula: {
        label: "Two cylinders or cones",
        latex: "\\frac{V_1}{V_2} = \\frac{r_1^2 h_1}{r_2^2 h_2}",
      },
      authoredExample: {
        prompt: "Two cones have radii in the ratio 2 : 3 and heights in the ratio 9 : 4. Find the ratio of their volumes.",
        steps: ["\\(V_1 : V_2 = 4 \\times 9 : 9 \\times 4 = 36 : 36\\).", "The volumes are equal."],
        answer: "1 : 1",
      },
      selfCheckExample: {
        prompt: "Two spheres have surface areas in the ratio 9 : 25. Find the ratio of their volumes.",
        steps: ["Radii are \\(\\sqrt{9} : \\sqrt{25} = 3 : 5\\).", "Volumes are \\(27 : 125\\)."],
        answer: "27 : 125",
      },
      practiceSet: [
        { prompt: "Two cylinders have equal volumes and radii in the ratio 2 : 1. Find the ratio of their heights.", answer: "1 : 4" },
        { prompt: "The radii of two spheres add to 10 cm and differ by 2 cm. Find the ratio of their surface areas.", answer: "9 : 4", method: "Radii 6 and 4." },
        { prompt: "Two cylinders have heights in the ratio 3 : 5 and volumes in the ratio 12 : 5. Find the ratio of their radii.", answer: "2 : 1" },
      ],
      pyqExampleId: "9409c615-e1b0-45c2-ae06-0ddbbed697b2",
      traps: [
        {
          title: "Reading a surface ratio as a volume ratio",
          body: "Surfaces in the ratio 9 : 25 mean radii 3 : 5 and volumes 27 : 125. The surface ratio is never the volume ratio unless the solids are equal.",
        },
      ],
    },
  ],
};
