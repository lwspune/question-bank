import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GN_ROLE_NOTE: SubtopicNote = {
  subtopicName: "The Role of Green Chemistry",
  title: "The Role of Green Chemistry",
  oneLineDefinition:
    "What green chemistry does for industry and the planet: cleaner technology, pollution prevention, protection of the ozone layer and control of global warming.",
  whyItMatters:
    "2 questions. One was set in board papers: define green chemistry (2026). The textbook asks you to explain the role of green chemistry, a longer answer built from the five points below.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccgn-role",
      name: "The role of green chemistry",
      intuition:
        "The Earth can absorb some waste and pollution on its own. Trouble starts only when we make more than it can handle. Green chemistry keeps us below that limit by changing how chemicals are designed and made, so less harm is done in the first place.",
      definition:
        "- **Green chemistry** is the use of chemistry for pollution prevention by environmentally conscious design of chemical products and processes that reduce or eliminate the use or generation of hazardous substances.\n" +
        "- For 'explain the role', write each point below as one sentence, in your own order. Four or five points make a full answer.",
      table: {
        columns: ["Role", "What the textbook says"],
        rows: [
          {
            cells: ["Defining it first", "Begin a role answer with the definition: pollution prevention by environmentally conscious design of products and processes."],
            pyqExampleId: "837c82c6-4acc-464d-912a-044bc96cf503",
            noteAmber: "Board 2026 asked for the definition alone, as a short answer.",
          },
          { cells: ["Staying within the Earth's capacity", "The Earth has a natural capacity to deal with much of society's waste and pollution; only when it is exceeded do we become unsustainable."] },
          { cells: ["Cleaner technology", "It promotes innovative chemical technologies that reduce or eliminate hazardous substances in the design, manufacture and use of chemical products."] },
          { cells: ["Pollution prevention", "It reduces capital expenditure, prevents pollution, and promotes pollution prevention and industrial ecology in the manufacture of chemicals."] },
          { cells: ["A new way of looking at chemicals", "It looks afresh at chemicals and their manufacture so as to minimize any negative environmental effects."] },
          {
            cells: ["Protecting the global environment", "It helps protect the ozone layer in the stratosphere, essential for life on the earth, and helps control the greenhouse effect (global warming)."],
            pyqExampleId: "ebd7263f-396f-4928-90eb-1a7830194f32",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Name two global environmental problems that green chemistry helps to control, according to the textbook.",
        steps: ["The textbook names the loss of ozone in the stratosphere and the greenhouse effect."],
        answer: "Depletion of the ozone layer and global warming (the greenhouse effect)",
      },
      practiceSet: [
        { prompt: "When, according to the green chemistry approach, does society become unsustainable?", answer: "When the Earth's natural capacity for dealing with waste and pollution is exceeded" },
        { prompt: "Give one economic benefit of green chemistry named in the textbook.", answer: "It helps to reduce capital expenditure" },
        { prompt: "Why is the ozone layer in the stratosphere important?", answer: "It is essential for the survival of life on the earth" },
      ],
      pyqExampleId: "837c82c6-4acc-464d-912a-044bc96cf503",
      traps: [
        {
          title: "Role is not the list of principles",
          body: "Writing out the twelve principles does not answer 'explain the role'. The role is what green chemistry achieves: cleaner technology, pollution prevention, ozone protection and control of global warming.",
        },
        {
          title: "A definition with no hazardous substances",
          body: "A definition that stops at 'environmentally friendly chemistry' loses the mark. Name what it reduces or eliminates: the use or generation of hazardous substances.",
        },
      ],
    },
  ],
};
