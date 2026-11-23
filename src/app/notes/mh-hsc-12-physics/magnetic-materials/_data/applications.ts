import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MM_APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "Permanent Magnets, Electromagnets and Magnetic Shielding",
  title: "Permanent Magnets, Electromagnets and Magnetic Shielding",
  oneLineDefinition:
    "How soft and hard ferromagnetic materials are put to work: electromagnets, permanent magnets, the bar magnet in navigation, and shielding an instrument from a magnetic field.",
  whyItMatters:
    "4 questions. One was set in a board paper: which property of a bar magnet is used in navigation (2026). The textbook adds the property of soft iron that suits an electromagnet, one use of an electromagnet, and the field inside a hollow iron box.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpmm-electromagnets",
      name: "Electromagnets and permanent magnets",
      intuition:
        "An electromagnet is a magnet with an on-off switch: soft iron multiplies the field of a coil while the current flows and lets go when it stops. A permanent magnet is made from a hard material that, once magnetised, stays that way with no current at all.",
      definition:
        "- **Electromagnet:** a soft iron rod is placed in the core of a solenoid. Soft iron has a large permeability (over 1000) and keeps very little magnetization. With the current on, the field of the solenoid increases about a thousand times; with the current off, the field effectively becomes zero.\n" +
        "- Uses of electromagnets: electric bells, loudspeakers, circuit breakers, research laboratories, and giant electromagnets on cranes to lift heavy iron loads. Superconducting magnets give fields of a few tesla, used in NMR (Nuclear Magnetic Resonance) spectroscopy.\n" +
        "- **Permanent magnet:** a hard ferromagnetic rod is placed in the solenoid and the current is switched on. The rod is magnetised and stays magnetised after the current is switched off.\n" +
        "- **Navigation:** a small bar magnet suspended freely comes to rest along the geographic north-south direction. This directive property is used in navigation.",
      table: {
        columns: ["Point", "Electromagnet", "Permanent magnet"],
        rows: [
          { cells: ["Material of the rod", "Soft iron: large permeability, low retentivity", "Hard ferromagnetic material: high retentivity"] },
          { cells: ["How it is made", "Soft iron rod in a solenoid carrying a current", "Hard rod magnetised in a solenoid, then the current is switched off"] },
          { cells: ["When the current is switched off", "Its field effectively becomes zero", "It stays magnetised"] },
          {
            cells: ["Uses", "Electric bells, loudspeakers, circuit breakers, cranes lifting iron", "Bar magnets and compass needles; a freely suspended bar magnet points north-south, which is used in navigation"],
            pyqExampleId: "889a92e0-abb3-4eb7-970a-bfbb5372d73a",
            noteAmber: "Board 2026 asked which property of a bar magnet is used in navigation: its directive property, settling north-south when suspended freely.",
          },
        ],
      },
      practiceSet: [
        { prompt: "By roughly what factor does a soft iron core increase the field of a solenoid?", answer: "About a thousand times" },
        { prompt: "Why does an electromagnet lose its magnetism when the current is switched off?", answer: "Soft iron keeps very little magnetization (low retentivity)" },
        { prompt: "Name two uses of electromagnets.", answer: "Any two: electric bells, loudspeakers, circuit breakers, cranes lifting iron loads" },
        { prompt: "What kind of magnets give fields of a few tesla for NMR spectroscopy?", answer: "Superconducting magnets" },
      ],
      traps: [
        {
          title: "Giving only the high permeability",
          body: "Soft iron suits an electromagnet for two reasons: high permeability makes the field strong, and low retentivity lets it switch off. Name both.",
        },
        {
          title: "An application without how it works",
          body: "'Explain one application' needs the working: soft iron core, strong field while the current flows, load released when it stops. A bare name earns little.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpmm-shielding",
      name: "Magnetic shielding",
      intuition:
        "A soft ferromagnetic material soaks up field lines, which crowd into it rather than pass through the air around it. Wrap an instrument in a closed shell of such a material and the lines run round inside the shell's wall, leaving very few to cross the space inside.",
      definition:
        "- In a uniform field, a soft ferromagnetic material gathers a large number of field lines inside itself, leaving few outside.\n" +
        "- A closed shell of it, such as a spherical iron shell, lets very few lines pass through the space it encloses. Most lines crowd into the iron. This is **magnetic shielding**.\n" +
        "- An instrument to be protected is completely surrounded by a soft ferromagnetic material.\n" +
        "- The field inside is reduced, not removed: very few lines still pass.",
      table: {
        columns: ["Point", "Magnetic shielding"],
        rows: [
          { cells: ["Material used", "A soft ferromagnetic material, such as soft iron"] },
          { cells: ["Shape", "A closed structure, such as a spherical shell, round the instrument"] },
          {
            cells: ["Field inside the enclosed space", "Much less than outside, but not zero"],
            pyqExampleId: "62d71bd2-9940-4ddf-a81f-a3965cf3a98c",
            noteAmber: "Textbook MCQ: the earth's field inside a hollow iron box is less than that outside.",
          },
          { cells: ["Where it is used", "Space ships, and laboratory experiments that must be kept away from strong magnets"] },
          { cells: ["Other kinds of shielding", "Electrical shielding (insulated wires) and acoustic shielding (sound-proof studios)"] },
        ],
      },
      practiceSet: [
        { prompt: "What kind of material is used for magnetic shielding?", answer: "A soft ferromagnetic material" },
        { prompt: "Name one place where magnetic shielding is used.", answer: "Space ships, or laboratory experiments that must be protected from magnetic fields" },
        { prompt: "What is magnetic shielding?", answer: "Protecting a region from a magnetic field by enclosing it in a soft ferromagnetic shell, into which the field lines crowd" },
      ],
      traps: [
        {
          title: "Saying the field inside becomes zero",
          body: "A soft iron shell lets very few lines through, so the field inside is much reduced but not zero.",
        },
        {
          title: "Using a hard or a diamagnetic material",
          body: "Shielding works because a soft ferromagnetic material draws the lines into itself. A diamagnetic material pushes only a tiny share of lines away.",
        },
      ],
    },
  ],
};
