import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_WO_HUYGENS_NOTE: SubtopicNote = {
  subtopicName: "Huygens Principle",
  title: "Wavefronts and Huygens Principle",
  oneLineDefinition:
    "What a wavefront is, the shapes it takes for a point source, a distant source and a lens, how it differs from a ray, and Huygens' principle for finding where a wavefront will be a moment later.",
  whyItMatters:
    "11 questions, eight of them from board papers. The board asks you to state Huygens' principle and say how Huygens explained the absence of the backwave (2023, 2026), state it and prove the law of reflection with a diagram (2023, 2024), pick the amplitude of the secondary wavelets in the forward and backward directions (2023), judge an assertion on the phase of points on a wavefront (2023), tell a wavefront from a ray (2024) and draw a plane wavefront refracted by a convex lens (2025). The textbook adds the shape of the wavefront from a point source, from a distant star and from a lens with a point source at its focus.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpwo-wavefront",
      name: "Wavefronts, their shapes and rays",
      intuition:
        "Drop a stone into a still pond and rings spread out. Every point on one ring started moving at the same moment, so all of them rise and fall together. A ring like that is a wavefront. For light the rings become surfaces, and the shape of the surface depends on where the light comes from.",
      definition:
        "- A **wavefront** is the locus of points that oscillate in the same phase: a surface of constant phase.\n" +
        "- All points on a wavefront are at the same distance from the source, so the phase difference between any two of them is zero.\n" +
        "- The speed with which the wavefront moves outwards is the speed of the wave. The energy travels in a direction perpendicular to the wavefront.\n" +
        "- A **ray** is a line drawn perpendicular to the wavefronts, in the direction in which the energy travels. A wavefront is a surface; a ray is a line.\n" +
        "- A point source gives **spherical** wavefronts. Far from the source, a small part of a sphere is nearly flat, so the wave becomes a **plane** wave.",
      table: {
        columns: ["Where the light comes from", "Shape of the wavefront"],
        rows: [
          { cells: ["Light spreading out from a point source", "Spherical, growing outwards from the source"] },
          { cells: ["A distant star, the part that reaches the Earth", "Plane, because a small part of a very large sphere is nearly flat"] },
          { cells: ["A point source placed at the focus of a convex lens, after the lens", "Plane: the rays come out parallel"] },
          {
            cells: ["A plane wave after passing through a convex lens", "Spherical, converging to the focus F"],
            noteAmber: "Board 2025 asked you to draw the incident and refracted wavefronts for a convex lens.",
          },
        ],
      },
      practiceSet: [
        { prompt: "What angle does a ray make with the wavefront it crosses?", answer: "90°: a ray is always perpendicular to the wavefront" },
        { prompt: "Light from a lamp 2 km away falls on a lens 3 cm across. What shape is the wavefront that reaches the lens?", answer: "Very nearly plane" },
        { prompt: "In which direction does a light wave carry its energy?", answer: "Perpendicular to the wavefront, along the ray" },
      ],
      pyqExampleId: "38c96d1c-4258-4329-ab3d-1d958b7e5cf8",
      traps: [
        {
          title: "Defining a wavefront as a set of rays",
          body: "A wavefront is a surface on which every point has the same phase. Rays are the lines drawn perpendicular to it. Asked for the difference, give both definitions, not one.",
        },
        {
          title: "Drawing the wavefront after a convex lens as a straight line",
          body: "A plane wave that has passed through a convex lens comes out spherical. Draw arcs whose centre is the focus F, so that they close in on F.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpwo-huygens-principle",
      name: "Huygens' principle and the backwave",
      intuition:
        "Huygens' principle is a drawing rule. If you know where a wavefront is now, treat every point on it as a tiny new source. After a time t each tiny source has sent out a small sphere of radius vt. Draw the surface that touches all these spheres in front, and that is the wavefront at the later time.",
      definition:
        "- **Huygens' principle:** each point of a wavefront is the source of a secondary disturbance, and the wavelets from these points spread out in all directions with the speed of the wave.\n" +
        "- The **common tangent** to all the secondary wavelets (their forward envelope) gives the new position of the wavefront at a later time.\n" +
        "- To find the wavefront after a time t, draw spheres of radius \\(vt\\) from points on the present wavefront and draw their common tangent.\n" +
        "- **The backwave:** the spheres also have a common tangent behind, which would mean a wave travelling backwards. No such wave is seen.\n" +
        "- Huygens argued that the amplitude of the secondary wavelets is maximum in the forward direction and zero in the backward direction. This was an ad hoc assumption; the absence of the backwave is properly justified by a fuller wave theory.",
      formula: {
        label: "Radius of each secondary wavelet after a time t",
        latex: "r = vt",
        symbols: [
          { symbol: "\\(v\\)", meaning: "speed of the wave in the medium" },
          { symbol: "\\(t\\)", meaning: "time after the present wavefront" },
        ],
      },
      authoredExample: {
        prompt:
          "A plane wavefront travels through water, in which light moves at \\(2.25 \\times 10^{8}\\) m/s. Use Huygens' construction to find where the wavefront is 4 ns later, and its shape.",
        steps: [
          "Given: \\(v = 2.25 \\times 10^{8}\\) m/s, \\(t = 4\\) ns \\(= 4 \\times 10^{-9}\\) s.",
          "Each point of the wavefront sends out a wavelet of radius \\(r = vt\\).",
          "\\(r = 2.25 \\times 10^{8} \\times 4 \\times 10^{-9} = 0.9\\) m.",
          "The common tangent to wavelets of equal radius drawn from a plane is a plane parallel to the first, 0.9 m ahead of it.",
        ],
        answer: "A plane wavefront 0.9 m ahead of the first",
      },
      selfCheckExample: {
        prompt: "A spherical wavefront of radius 2 m spreads out from a point source in air, where light travels at \\(3 \\times 10^{8}\\) m/s. What is its radius 10 ns later?",
        steps: ["Each wavelet has radius \\(vt = 3 \\times 10^{8} \\times 10^{-8} = 3\\) m.", "The new wavefront is a sphere of radius \\(2 + 3 = 5\\) m about the same centre."],
        answer: "5 m",
      },
      practiceSet: [
        { prompt: "With what speed do Huygens' secondary wavelets spread out?", answer: "With the speed of the wave in that medium" },
        { prompt: "A plane wavefront travels for 5 ns in glass, where light moves at \\(2 \\times 10^{8}\\) m/s. How far does it move forward?", answer: "1 m" },
        { prompt: "A plane wavefront moves through a uniform medium. What shape is it a moment later?", answer: "Still plane" },
      ],
      pyqExampleId: "908ad2fd-ce93-4794-b2b3-5941d4f5d101",
      traps: [
        {
          title: "Stating the principle without the tangent",
          body: "The statement has two parts: every point is a source of secondary wavelets, and the common tangent to the wavelets is the new wavefront. Leaving out the tangent loses half the mark.",
        },
        {
          title: "Saying interference removes the backwave",
          body: "Huygens did not explain the backwave by interference. He assumed that the amplitude of the wavelets is maximum forwards and zero backwards. Write that it was an assumption.",
        },
      ],
    },
  ],
};
