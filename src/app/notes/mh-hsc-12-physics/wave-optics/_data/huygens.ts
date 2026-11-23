import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_WO_HUYGENS_NOTE: SubtopicNote = {
  subtopicName: "Nature of Light and Huygens' Principle",
  title: "Nature of Light, Wavefronts and Huygens' Principle",
  oneLineDefinition:
    "Light as a transverse electromagnetic wave, primary and secondary sources, what a wavefront is and its three shapes, and how Huygens' principle finds the next wavefront from the present one.",
  whyItMatters:
    "5 questions. Three were set in board papers: a multiple choice question on the red shift (2017), the construction of a spherical wavefront by Huygens' principle (2024) and the definition of a wavefront (2026). The textbook adds primary and secondary sources, and how a wavefront is related to rays.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpwo-wavefront",
      name: "Sources of light and wavefronts",
      intuition:
        "Drop a stone in still water and ripples spread out in circles. Every point on one circle moves up and down in step with every other point on it. Light spreading from a source is the same in three dimensions: join all the points that are in the same phase at one instant and you get a surface, the wavefront. The rays are just arrows drawn at right angles to it, showing which way the wave is moving.",
      definition:
        "- **Nature of light:** Newton took light to be a stream of particles (corpuscles); Huygens took it to be a wave. Interference, diffraction and polarization can be explained only by the wave theory. Today light is known to have a **dual nature**: it can behave as a wave or as particles (photons).\n" +
        "- Light is an **electromagnetic wave**. It is **transverse**: the electric and magnetic fields are perpendicular to each other and to the direction of propagation. It needs no material medium. In a medium of refractive index n its speed is \\(v = c/n\\).\n" +
        "- **Wavefront:** the locus of all points having the same phase at a given instant of time.\n" +
        "- A **ray** shows the direction of propagation and is always **perpendicular** to the wavefront.\n" +
        "- A point source gives **spherical** wavefronts, a linear source gives **cylindrical** wavefronts, and far from the source a small part of a spherical wavefront is a **plane** wavefront with parallel rays.",
      table: {
        columns: ["Term", "Meaning", "Example or shape"],
        rows: [
          {
            cells: ["Wavefront", "Locus of all points having the same phase at a given instant", "Rays are normal to it"],
            pyqExampleId: "6dff5f2c-e648-41c1-8fe2-e1fe2d17bd67",
            noteAmber: "Board 2026 asked you to define a wavefront, for one mark.",
          },
          { cells: ["Spherical wavefront", "Wavefront from a point source", "Concentric spheres; rays diverge as radii"] },
          { cells: ["Cylindrical wavefront", "Wavefront from a linear source", "Coaxial cylinders round the line source"] },
          { cells: ["Plane wavefront", "A small part of a spherical wavefront far from the source", "Parallel planes; rays parallel to each other"] },
          { cells: ["Primary source", "Emits light of its own: high temperature, an electric current, or a chemical or nuclear reaction", "The Sun, stars, a flame, a tube light, firecrackers"] },
          { cells: ["Secondary source", "Gives no light of its own; reflects or scatters light received from another source", "The Moon, the planets, people, plants"] },
        ],
      },
      practiceSet: [
        { prompt: "Light from a distant star reaches the Earth. What is the shape of its wavefront here?", answer: "Plane, with parallel rays" },
        { prompt: "A long narrow tube light acts as a linear source. What shape are the wavefronts near it?", answer: "Cylindrical" },
        { prompt: "What is the angle between a ray of light and the wavefront it crosses?", answer: "90°: a ray is always normal to the wavefront" },
        { prompt: "Is the Moon a primary or a secondary source of light?", answer: "Secondary. It only reflects sunlight" },
      ],
      traps: [
        {
          title: "Leaving 'same phase' out of the definition",
          body: "A wavefront is the locus of points having the **same phase at a given instant**. 'A surface where the wave is' gets no mark; the two key words are phase and instant.",
        },
        {
          title: "Calling a ray parallel to the wavefront",
          body: "Rays are perpendicular to wavefronts. For a plane wavefront the rays are parallel to each other, not to the wavefront.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpwo-huygens-principle",
      name: "Huygens' principle and the construction of a wavefront",
      intuition:
        "Huygens gave a rule to find where a wavefront will be a little later. Treat every point on the present wavefront as a tiny new source. Each sends out a small spherical wavelet at the speed of light in that medium. After a time t every wavelet has a radius vt. The surface that touches all of them on the forward side is the new wavefront. In a uniform medium a plane wavefront stays plane and a spherical one stays spherical, only bigger.",
      definition:
        "- **Huygens' principle:** each point on a wavefront acts as a secondary source of light, emitting secondary waves called **wavelets** in all directions, which travel with the speed of light in the medium. The new wavefront is the **envelope** of the secondary wavelets travelling in the **forward** direction. The wavelets travelling backward are ineffective.\n" +
        "- **Construction:** to find the wavefront at time T from a wavefront AB at t = 0, take three steps.\n" +
        "- Take points 1, 2, 3, ... on AB. Each is a secondary source.\n" +
        "- With each point as centre, draw a hemisphere of radius \\(vT\\) on the forward side.\n" +
        "- Draw the common tangent A'B' to all the hemispheres. This is the new wavefront at time T.\n" +
        "- For a plane wavefront A'B' is a plane parallel to AB, a distance \\(vT\\) ahead. For a spherical wavefront from a point source O, A'B' is a sphere centred on O with radius larger by \\(vT\\).",
      formula: {
        label: "Radius of a secondary wavelet",
        latex: "r = vT, \\qquad v = \\frac{c}{n}",
        symbols: [
          { symbol: "\\(r\\)", meaning: "radius of each wavelet after time T" },
          { symbol: "\\(v\\)", meaning: "speed of light in the medium" },
          { symbol: "\\(n\\)", meaning: "refractive index of the medium" },
        ],
      },
      authoredExample: {
        prompt:
          "A plane wavefront travels through glass in which the speed of light is \\(2 \\times 10^{8}\\) m/s. Using Huygens' construction, find how far ahead of the old wavefront the new wavefront lies after \\(5 \\times 10^{-10}\\) s, and state its shape.",
        steps: [
          "Given: \\(v = 2 \\times 10^{8}\\) m/s, \\(T = 5 \\times 10^{-10}\\) s.",
          "Formula: each wavelet has radius \\(r = vT\\).",
          "Substitution: \\(r = (2 \\times 10^{8})(5 \\times 10^{-10}) = 0.1\\) m.",
          "The envelope of equal hemispheres drawn from a plane is a plane parallel to the old one.",
        ],
        answer: "0.1 m (10 cm) ahead; the new wavefront is a plane parallel to the old one",
      },
      selfCheckExample: {
        prompt:
          "A point source in air sends out a spherical wavefront which, at some instant, has a radius of 30 cm. Taking \\(c = 3 \\times 10^{8}\\) m/s, what is its radius 1 ns later?",
        steps: ["Each wavelet grows by \\(cT = (3 \\times 10^{8})(10^{-9}) = 0.3\\) m = 30 cm.", "New radius \\(= 30 + 30 = 60\\) cm."],
        answer: "60 cm",
      },
      practiceSet: [
        { prompt: "In Huygens' construction, why is no backward wavefront drawn?", answer: "By Huygens' principle the wavelets travelling backward are ineffective" },
        { prompt: "Light travels through water of refractive index 4/3. At what speed do Huygens' wavelets spread there? (c = 3 × 10⁸ m/s)", answer: "\\(2.25 \\times 10^{8}\\) m/s" },
        { prompt: "What surface gives the new wavefront in Huygens' construction?", answer: "The envelope (common tangent) of the forward secondary wavelets" },
      ],
      pyqExampleId: "83b963d9-bd8a-4d1d-a6df-98acfc486b6d",
      traps: [
        {
          title: "Drawing full circles round each point",
          body: "Draw only the forward hemispheres and only the forward envelope. A diagram showing a backward wavefront loses the diagram mark.",
        },
        {
          title: "Using c for the wavelet speed in a medium",
          body: "The wavelets travel with the speed of light **in that medium**, \\(v = c/n\\). Using c inside glass or water gives the wrong radius.",
        },
        {
          title: "An unlabelled construction",
          body: "Label the old wavefront, the secondary sources, the wavelets of radius \\(vT\\) and the new wavefront. The board gives the diagram marks for these labels.",
        },
      ],
    },
  ],
};
