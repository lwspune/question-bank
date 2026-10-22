import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SV_SPHERE_NOTE: SubtopicNote = {
  subtopicName: "Sphere and Hemisphere",
  title: "Sphere and Hemisphere",
  oneLineDefinition:
    "Surface and volume of a sphere and a hemisphere, solid or hollow, and how both change when the radius changes.",
  whyItMatters:
    "The formulas are short, so the marks go on two things: a solid hemisphere's total surface is 3πr², because the flat face counts, and a ratio of radii must be squared for surface and cubed for volume. With π as 22/7 the fractions get ugly, so keep π until the last line.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "afsv-sphere-formulas",
      name: "Sphere and hemisphere formulas",
      intuition:
        "A sphere's surface is exactly four circles of its own radius, and its volume is two thirds of the cylinder that just holds it. Halve both for a hemisphere, then remember the flat circle on top when the whole surface is asked.",
      definition:
        "Working back: from a surface, divide by \\(4\\pi\\) and take the square root; from a volume, multiply by \\(\\tfrac{3}{4\\pi}\\) and take the cube root. With \\(\\pi = \\tfrac{22}{7}\\), radii such as 3.5, 7, 10.5 and 14 give whole numbers. Halve a diameter before you start.",
      table: {
        columns: ["Solid", "Curved surface", "Total surface", "Volume"],
        rows: [
          { cells: ["Sphere of radius r", "\\(4\\pi r^2\\)", "\\(4\\pi r^2\\)", "\\(\\tfrac43 \\pi r^3\\)"] },
          { cells: ["Solid hemisphere of radius r", "\\(2\\pi r^2\\)", "\\(3\\pi r^2\\)", "\\(\\tfrac23 \\pi r^3\\)"] },
          { cells: ["Hollow sphere, radii R outside and r inside", "\\(4\\pi R^2\\) outside", "\\(4\\pi (R^2 + r^2)\\)", "\\(\\tfrac43 \\pi (R^3 - r^3)\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "A sphere has surface 1,386 cm². Find its radius and volume. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "\\(4 \\times \\tfrac{22}{7} r^2 = 1386\\), so \\(r^2 = 110.25\\) and \\(r = 10.5\\).",
          "\\(V = \\tfrac43 \\times \\tfrac{22}{7} \\times 1157.625 = 4851\\).",
        ],
        answer: "10.5 cm; 4,851 cm³.",
      },
      practiceSet: [
        { prompt: "Find the volume of a sphere of radius 3 cm in terms of \\(\\pi\\).", answer: "\\(36\\pi\\) cm³" },
        { prompt: "Find the surface of a sphere 28 cm across. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "2,464 cm²" },
        { prompt: "A sphere holds \\(288\\pi\\) cm³. Find its radius.", answer: "6 cm", method: "\\(r^3 = 216\\)." },
      ],
      pyqExampleId: "76816de8-13e3-4905-872f-1a11dedef9e7",
      traps: [
        {
          title: "Four πr², not four thirds",
          body: "The surface is \\(4\\pi r^2\\); the \\(\\tfrac43\\) belongs to the volume. Mixing them is the commonest slip on this page.",
        },
        {
          title: "Halve the diameter",
          body: "A ball 14 cm across has radius 7 cm. Putting 14 into \\(4\\pi r^2\\) gives a surface four times too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-hemisphere",
      name: "Hemispheres: curved or total surface, solid or hollow",
      intuition:
        "Half a sphere has half its curved surface, \\(2\\pi r^2\\). A solid hemisphere also has a flat circular face, \\(\\pi r^2\\), so its whole surface is \\(3\\pi r^2\\). A bowl is a hollow hemisphere: its metal is the outer half-ball less the inner one.",
      definition:
        "- **Curved surface** \\(2\\pi r^2\\) (a dome, a bowl's outside); **total surface** of a solid hemisphere \\(3\\pi r^2\\).\n" +
        "- **Volume** \\(\\tfrac23 \\pi r^3\\).\n" +
        "- A **hollow hemisphere** of outer radius \\(R\\) and inner radius \\(r\\) holds metal \\(\\tfrac23 \\pi (R^3 - r^3)\\). Its thickness is \\(R - r\\).\n" +
        "- Weight = volume × the mass of one cm³.",
      formula: {
        label: "Hemisphere of radius r",
        latex: "\\text{CSA} = 2\\pi r^2,\\quad \\text{TSA} = 3\\pi r^2,\\quad V = \\tfrac23 \\pi r^3",
      },
      authoredExample: {
        prompt: "A solid hemisphere has radius 7 cm. Find its curved surface, total surface and volume. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "Curved: \\(2 \\times \\tfrac{22}{7} \\times 49 = 308\\) cm².",
          "Total: \\(3 \\times \\tfrac{22}{7} \\times 49 = 462\\) cm².",
          "Volume: \\(\\tfrac23 \\times \\tfrac{22}{7} \\times 343 = \\tfrac{2156}{3}\\) cm³.",
        ],
        answer: "308 cm², 462 cm², \\(\\tfrac{2156}{3}\\) cm³.",
      },
      selfCheckExample: {
        prompt: "A hemispherical bowl has inner radius 3 cm and outer radius 6 cm. Find the volume of its material in terms of \\(\\pi\\).",
        steps: [
          "\\(6^3 - 3^3 = 216 - 27 = 189\\).",
          "\\(\\tfrac23 \\pi \\times 189 = 126\\pi\\).",
        ],
        answer: "\\(126\\pi\\) cm³.",
      },
      practiceSet: [
        { prompt: "Find the total surface of a solid hemisphere of radius 14 cm. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "1,848 cm²" },
        { prompt: "Find the curved surface of a hemispherical dome 21 m across. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "693 m²" },
        { prompt: "A hemisphere holds \\(18\\pi\\) cm³. Find its radius.", answer: "3 cm" },
      ],
      pyqExampleId: "5410234b-eb95-4722-9a68-c6da0f10dc26",
      traps: [
        {
          title: "A solid hemisphere's total surface counts the flat face",
          body: "For radius 7 cm the curved surface is 308 cm² but the total is 462 cm². Read whether the stem says curved or total.",
        },
        {
          title: "R³ − r³ is not (R − r)³",
          body: "A bowl with radii 6 and 3 holds \\(\\tfrac23 \\pi \\times 189\\) of metal. Cubing the thickness, \\(3^3 = 27\\), gives far too little.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-sphere-ratios",
      name: "Changing the radius of a sphere",
      intuition:
        "All spheres are the same shape. Radii in the ratio k give surfaces in k² and volumes in k³, so any one ratio gives the other two.",
      definition:
        "- Radii (or diameters) \\(k\\): surfaces \\(k^2\\), volumes \\(k^3\\).\n" +
        "- From surfaces, take square roots to get the radii; from volumes, cube roots.\n" +
        "- A radius up by \\(r\\%\\) multiplies the surface by \\(\\left(1 + \\tfrac{r}{100}\\right)^2\\) and the volume by \\(\\left(1 + \\tfrac{r}{100}\\right)^3\\).",
      formula: {
        label: "Two spheres",
        latex: "\\dfrac{S_1}{S_2} = \\left(\\dfrac{r_1}{r_2}\\right)^2,\\quad \\dfrac{V_1}{V_2} = \\left(\\dfrac{r_1}{r_2}\\right)^3",
      },
      authoredExample: {
        prompt: "Two spheres have volumes in the ratio \\(27 : 64\\). Find the ratio of their surfaces.",
        steps: [
          "Radii: \\(\\sqrt[3]{27} : \\sqrt[3]{64} = 3 : 4\\).",
          "Surfaces: \\(3^2 : 4^2 = 9 : 16\\).",
        ],
        answer: "\\(9 : 16\\).",
      },
      selfCheckExample: {
        prompt: "The radius of a sphere grows by 50%. By what percent do its surface and its volume grow?",
        steps: [
          "Surface: \\(1.5^2 = 2.25\\), up 125%.",
          "Volume: \\(1.5^3 = 3.375\\), up 237.5%.",
        ],
        answer: "Surface 125%, volume 237.5%.",
      },
      practiceSet: [
        { prompt: "A sphere's radius is made 4 times as long. How many times as much does it hold?", answer: "64 times" },
        { prompt: "Two spheres have radii in the ratio \\(1 : 3\\). Find the ratio of their surfaces.", answer: "\\(1 : 9\\)" },
        { prompt: "Two spheres have surfaces in the ratio \\(9 : 49\\). Find the ratio of their volumes.", answer: "\\(27 : 343\\)" },
      ],
      pyqExampleId: "66e5c0f6-e95d-4f4f-9ae7-9f6f99520a35",
      traps: [
        {
          title: "Becomes 27 times means up by 26 times",
          body: "Tripling the radius makes the volume 27 times as large, which is an increase of 2,600%. Read whether the stem asks what it becomes or how much it grows.",
        },
        {
          title: "Square for surface, cube for volume",
          body: "Spheres with surfaces \\(1 : 100\\) have radii \\(1 : 10\\) and volumes \\(1 : 1000\\). Cubing the surface ratio, or squaring the volume ratio, is a different question.",
        },
      ],
    },
  ],
};
