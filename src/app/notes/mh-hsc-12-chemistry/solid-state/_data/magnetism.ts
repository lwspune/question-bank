import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SS_MAGNETISM_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Properties of Solids",
  title: "Diamagnetic, Paramagnetic and Ferromagnetic Solids",
  oneLineDefinition:
    "Why a spinning unpaired electron makes a solid magnetic, and how diamagnetic, paramagnetic and ferromagnetic substances differ in their electrons, their response to a magnetic field and their examples.",
  whyItMatters:
    "2 questions, both from the textbook exercises: what paramagnetic substances are and what ferromagnetic substances are. The board has also asked you to define ferromagnetism (2026) and paramagnetic solids (2026) as the second part of questions filed under defects and the cubic system, so learn each definition with its examples.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccss-magnetic",
      name: "Three classes of magnetic solid",
      intuition:
        "A spinning electron is a tiny magnet. Two electrons paired in one orbital spin opposite ways and cancel, so a solid with all electrons paired shows no magnetism of its own. Unpaired electrons do not cancel: a few make the solid weakly attracted to a magnet, many make it strongly attracted and even able to stay magnetised.",
      definition:
        "- Electrons spin about their own axis and act like tiny magnets. An orbital with one electron has an unbalanced spin and shows magnetism; paired electrons balance and cancel.\n" +
        "- **Diamagnetic:** all electrons paired; weakly repelled by a magnetic field.\n" +
        "- **Paramagnetic:** unpaired electrons; weakly attracted by a magnetic field. They show magnetism only in an external field and lose it when the field is removed.\n" +
        "- **Ferromagnetic:** a large number of unpaired electrons; strongly attracted by a magnetic field. They can be permanently magnetised and retain magnetism after the field is removed.",
      table: {
        columns: ["Point", "Diamagnetic", "Paramagnetic", "Ferromagnetic"],
        rows: [
          { cells: ["Electrons", "All paired", "Unpaired electrons", "A large number of unpaired electrons"] },
          {
            cells: ["In a magnetic field", "Weakly repelled", "Weakly attracted", "Strongly attracted"],
            pyqExampleId: "6ecce54e-ee36-4ab6-b515-1ade93de7140",
            noteAmber: "The textbook asks what paramagnetic substances are, with examples; Board 2026 asked you to define paramagnetic solids.",
          },
          { cells: ["After the field is removed", "No magnetism", "Magnetism is lost", "Magnetism is retained; can be permanently magnetised"] },
          { cells: ["Examples", "N₂, F₂, NaCl, H₂O, benzene", "O₂, Cu²⁺, Fe³⁺, Cr³⁺", "Fe, Co, Ni, Gd, CrO₂"] },
        ],
      },
      practiceSet: [
        { prompt: "Is NaCl diamagnetic, paramagnetic or ferromagnetic?", answer: "Diamagnetic: all its electrons are paired" },
        { prompt: "Why is oxygen attracted by a magnetic field?", answer: "It has unpaired electrons, whose spin gives a magnetic moment" },
        { prompt: "Which class of substance can be made into a permanent magnet?", answer: "Ferromagnetic substances" },
      ],
      traps: [
        {
          title: "Paramagnetic and ferromagnetic as the same thing",
          body: "Both are attracted, but a paramagnetic solid is attracted weakly and loses its magnetism when the field is removed. A ferromagnetic solid is attracted strongly and keeps it.",
        },
        {
          title: "A definition with no example",
          body: "Board definitions of these classes are usually followed by 'give examples'. Learn two from each column of the table.",
        },
      ],
    },
  ],
};
