import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_FLO_LIGHT_NOTE: SubtopicNote = {
  subtopicName: "Mirrors, Lenses and Refraction",
  title: "Mirrors, Lenses and Refraction",
  oneLineDefinition:
    "Concave mirrors, ray diagrams and lens power, what stays the same when light is refracted, the eye's near point and pupil, diffraction, gamma rays and the secondary rainbow.",
  whyItMatters:
    "Eleven questions in the bank: one from the 2023 shifts and five each from the 2024 and 2025 shifts, ten of them EASY. Each asks one fact from school optics, so the two tables here cover them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscfloli-mirrors",
      name: "Mirrors and lenses",
      intuition:
        "Concave mirrors and convex lenses bring light together; that is why they focus sunlight. Two rays are enough to find any image.",
      definition:
        "Mirrors:\n" +
        "- A **concave** mirror converges light, so **solar furnaces** and cookers use it. A convex mirror spreads light.\n" +
        "- **Two rays** are the least needed to locate an image.\n\n" +
        "Lenses:\n" +
        "- **Power** P = 1/f, f in metres; unit **dioptre**.\n" +
        "- An object **at the focus** of a convex lens gives an image **at infinity** on the other side.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["Solar furnace mirror", "Concave"], pyqExampleId: "d2640dfd-40cd-4d24-8711-6fa9bc79751a" },
          { cells: ["Rays to find an image", "Two"], pyqExampleId: "d68acc6c-f735-4d94-b1a4-3d264cb695d8" },
          { cells: ["Object at focus of convex lens", "Image at infinity"], pyqExampleId: "85bae9b5-de75-49b2-a3f5-7ec1d20eeb78" },
        ],
      },
      pyqExampleId: "38bf7f9a-1912-4304-9842-a2fae0144870",
      selfCheckExample: {
        prompt: "A convex lens has focal length 50 cm. What is its power?",
        steps: ["Convert f to metres: 0.5 m.", "P = 1 / 0.5 = 2 dioptres."],
        answer: "+2 D.",
      },
      practiceSet: [
        { prompt: "Which mirror spreads light out?", answer: "Convex" },
        { prompt: "What is the unit of lens power?", answer: "Dioptre" },
        { prompt: "Where is the image when an object sits at the focus of a convex lens?", answer: "At infinity" },
      ],
      traps: [
        {
          title: "Biconvex is a lens",
          body: "In a question about **mirrors**, **biconvex** is a decoy: it describes a lens.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscfloli-refraction",
      name: "Refraction, the eye and light's behaviour",
      intuition:
        "Light slows when it enters glass or water, but its frequency is set by the source and does not change. Its wavelength shortens instead.",
      definition:
        "Refraction:\n" +
        "- **Frequency stays the same**; speed and wavelength fall.\n" +
        "- **Snell (Snellius)** stated the law of refraction (1621).\n\n" +
        "The eye:\n" +
        "- The **least distance of distinct vision** is about **25 cm**.\n" +
        "- The **iris** controls the pupil: in bright light it contracts it, so in a dim room you see little until the pupil widens.\n\n" +
        "Other behaviour:\n" +
        "- **Diffraction**: light bends round a very small obstacle or gap.\n" +
        "- **Gamma rays** have the shortest wavelengths (below 10^-3 nm).\n" +
        "- A **secondary rainbow** has its colours **reversed**.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["Law of refraction", "Snellius"], pyqExampleId: "618f9895-5b14-49fc-8fe2-27e3bbc3f9db" },
          { cells: ["Near point of the eye", "25 cm"], pyqExampleId: "4576680d-1ece-49dc-be96-71a1fb9a9afd" },
          { cells: ["Pupil size controlled by", "The iris"], pyqExampleId: "e243e2ab-b9b8-4373-beb7-2bcca103e60d" },
          { cells: ["Bending round small obstacles", "Diffraction"], pyqExampleId: "23cfe3ed-34d9-4828-be55-1c21434e4efd" },
          { cells: ["Shortest wavelength", "Gamma rays"], pyqExampleId: "b9d6cee7-108c-45f1-9632-e98c2a4d9fda" },
          { cells: ["Secondary rainbow", "Colours reversed"], pyqExampleId: "736c0ec7-0d03-456c-a6c4-1a67de8ddbfe" },
        ],
      },
      pyqExampleId: "f5c7e861-3e55-489e-9dad-bb1e55a88a83",
      selfCheckExample: {
        prompt: "Light passes from air into glass and slows down. What happens to its wavelength?",
        steps: ["Speed = frequency x wavelength, and frequency does not change.", "So a lower speed means a shorter wavelength."],
        answer: "It gets shorter.",
      },
      practiceSet: [
        { prompt: "What is the far point of a normal eye?", answer: "Infinity" },
        { prompt: "Which part of the eye changes the pupil's size?", answer: "The iris" },
        { prompt: "Which radiation comes from radioactive decay and has the shortest wavelength?", answer: "Gamma rays" },
      ],
      traps: [
        {
          title: "The iris, not the cornea",
          body: "The **iris** widens and narrows the pupil. Options give the job to the cornea or the vitreous humour.",
        },
      ],
    },
  ],
};
