import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_M3_SPHERES_NOTE: SubtopicNote = {
  subtopicName: "Spheres, Hemispheres and Shells",
  title: "Spheres, Hemispheres and Shells",
  oneLineDefinition:
    "A sphere is fixed by its radius alone: find r from what the stem gives, then use the volume or surface asked for; a shell is one sphere minus another, and cutting a sphere adds flat faces.",
  whyItMatters:
    "7 questions in the Tier II bank, 6 EASY and 1 MODERATE. Four are straight formula work; the others are a metal shell, a sphere carved from a cube and a sphere cut into eight pieces.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2m3sp-formulas",
      name: "Sphere and hemisphere formulas",
      intuition:
        "Every sphere question is one step of working back to the radius, then one formula forward. A hemisphere is half a sphere, plus a flat circle when it is solid.",
      definition:
        "- Sphere: volume \\(\\frac{4}{3}\\pi r^3\\), surface \\(4\\pi r^2\\).\n" +
        "- Hemisphere: volume \\(\\frac{2}{3}\\pi r^3\\), curved surface \\(2\\pi r^2\\), total surface of a solid one \\(3\\pi r^2\\).\n" +
        "- A bowl (hollow hemisphere) has no flat face; a solid hemisphere adds \\(\\pi r^2\\).\n" +
        "- **Shortcut:** a sphere's volume \\(=\\) surface \\(\\times r \\div 3\\).",
      formula: {
        label: "Sphere and hemisphere",
        latex: "V = \\tfrac{4}{3}\\pi r^3, \\; S = 4\\pi r^2; \\quad \\text{hemisphere: } V = \\tfrac{2}{3}\\pi r^3, \\; \\text{TSA} = 3\\pi r^2",
      },
      authoredExample: {
        prompt: "A sphere has a surface area of 616 cm². Find its volume. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "\\(4 \\times \\frac{22}{7} r^2 = 616\\), so \\(r^2 = 49\\) and \\(r = 7\\).",
          "Volume \\(= \\frac{4}{3} \\times \\frac{22}{7} \\times 343 = \\frac{4312}{3} = 1437\\frac{1}{3}\\ \\text{cm}^3\\).",
          "Check with the shortcut: \\(616 \\times 7 \\div 3 = 1437\\frac{1}{3}\\).",
        ],
        answer: "\\(1437\\frac{1}{3}\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A solid hemisphere has a total surface area of 462 cm². Find its volume. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: ["\\(3\\pi r^2 = 462\\), so \\(\\pi r^2 = 154\\) and \\(r = 7\\).", "Volume \\(= \\frac{2}{3} \\times \\frac{22}{7} \\times 343 = 718\\frac{2}{3}\\ \\text{cm}^3\\)."],
        answer: "\\(718\\frac{2}{3}\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "Find the curved surface of a hemisphere of radius 14 cm. (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(1232\\ \\text{cm}^2\\)" },
        { prompt: "A sphere's volume is \\(36\\pi\\) cm³. Find its radius.", answer: "3 cm" },
        { prompt: "A solid hemisphere's curved surface is 50 cm². Find its total surface.", answer: "\\(75\\ \\text{cm}^2\\)" },
      ],
      pyqExampleId: "3f468bd8-2983-4686-ad98-7331a87fc205",
      traps: [
        {
          title: "Leaving out the flat face of a solid hemisphere",
          body: "A solid hemisphere has a curved surface \\(2\\pi r^2\\) AND a flat circle \\(\\pi r^2\\): \\(3\\pi r^2\\) in all. Only a hollow bowl stops at \\(2\\pi r^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2m3sp-shells",
      name: "Shells, pieces and a sphere inside a cube",
      intuition:
        "A shell is a big sphere with a smaller one taken out. A sphere cut into pieces keeps its curved surface but gains new flat faces. The biggest sphere that fits in a cube touches all six faces, so its diameter is the cube's edge.",
      definition:
        "- Shell volume \\(= \\frac{4}{3}\\pi(R^3 - r^3)\\); thickness \\(= R - r\\); mass \\(=\\) volume \\(\\times\\) density.\n" +
        "- Cut in half: two new circles of \\(\\pi r^2\\). Cut into eight by three cuts at right angles: each piece has \\(\\frac{1}{8}\\) of \\(4\\pi r^2\\) plus three quarter-circles.\n" +
        "- Largest sphere in a cube of edge \\(a\\): \\(r = \\frac{a}{2}\\), volume \\(\\frac{\\pi a^3}{6}\\).\n" +
        "- Largest cube in a sphere of radius \\(r\\): the cube's long diagonal is \\(2r\\).",
      formula: {
        label: "Shell",
        latex: "V_{\\text{shell}} = \\tfrac{4}{3}\\pi\\left(R^3 - r^3\\right)",
      },
      authoredExample: {
        prompt: "A sphere of radius 10 cm is cut into two halves. Find the total surface area of the two halves.",
        steps: ["The curved surface stays \\(4\\pi \\times 100 = 400\\pi\\).", "The cut adds two circles of \\(100\\pi\\): total \\(600\\pi\\ \\text{cm}^2\\)."],
        answer: "\\(600\\pi\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "A hollow metal sphere has outer radius 5 cm and inner radius 4 cm. Find the volume of metal.",
        steps: ["Metal \\(= \\frac{4}{3}\\pi(125 - 64) = \\frac{244}{3}\\pi\\).", "That is \\(81\\frac{1}{3}\\pi\\ \\text{cm}^3\\)."],
        answer: "\\(81\\frac{1}{3}\\pi\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "Find the volume of the largest sphere that fits in a cube of edge 14 cm. (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(1437\\frac{1}{3}\\ \\text{cm}^3\\)" },
        { prompt: "A cube fits exactly inside a sphere of radius \\(3\\sqrt{3}\\) cm. Find the cube's edge.", answer: "6 cm", method: "\\(a\\sqrt{3} = 6\\sqrt{3}\\)" },
        { prompt: "A shell has outer radius 3 cm and is 1 cm thick. Find the volume of metal.", answer: "\\(\\frac{76}{3}\\pi\\ \\text{cm}^3\\)" },
      ],
      pyqExampleId: "03a848e1-f0b5-4a78-9a1c-93817c705785",
      traps: [
        {
          title: "Forgetting the faces a cut makes",
          body: "Cutting a sphere keeps its curved surface but adds flat faces. Each half of a sphere has \\(2\\pi r^2 + \\pi r^2\\), not \\(2\\pi r^2\\) alone.",
        },
      ],
    },
  ],
};
