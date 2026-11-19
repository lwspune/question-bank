import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SD_AWARDS_NOTE: SubtopicNote = {
  subtopicName: "Science Awards",
  title: "Science Awards",
  oneLineDefinition:
    "The Nobel Prize is given in physics, chemistry, physiology or medicine, literature, peace and economics, and India's Shanti Swarup Bhatnagar Prize honours young Indian scientists in seven fields.",
  whyItMatters:
    "Four questions in the bank, one EASY, one MODERATE and two HARD: the subject in which no Nobel Prize is given, the Indian-origin scientist who won the Nobel Prize in Chemistry, and two that name a winner of the Shanti Swarup Bhatnagar Prize. The prize subjects and the Indian science laureates are the steady part; a winners list changes every year.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9sdaw-nobel",
      name: "The Nobel Prize and Indian science laureates",
      intuition:
        "Alfred Nobel, who invented dynamite, left his fortune for prizes to people who did the most good for humankind. The science prizes go to just three subjects. Four scientists of Indian birth or origin have won them, and each one is asked about by subject.",
      definition:
        "- Nobel Prizes are given in **Physics, Chemistry, Physiology or Medicine, Literature and Peace**; a prize in **Economics** was added later. There is **no prize named Biology** (or Mathematics).\n" +
        "- **C. V. Raman**: **Physics**, 1930, for the Raman effect (scattering of light).\n" +
        "- **Har Gobind Khorana**: **Physiology or Medicine**, 1968, for work on the genetic code.\n" +
        "- **S. Chandrasekhar**: **Physics**, 1983, for work on the life of stars.\n" +
        "- **Venkatraman Ramakrishnan**: **Chemistry**, 2009, for work on the ribosome.",
      table: {
        columns: ["Laureate", "Nobel Prize in", "Year", "For"],
        rows: [
          { cells: ["C. V. Raman", "Physics", "1930", "The Raman effect"] },
          { cells: ["Har Gobind Khorana", "Physiology or Medicine", "1968", "The genetic code"] },
          { cells: ["S. Chandrasekhar", "Physics", "1983", "The life of stars"] },
          { cells: ["Venkatraman Ramakrishnan", "Chemistry", "2009", "The structure of the ribosome"] },
        ],
        caption: "Raman and Chandrasekhar won in Physics; only Ramakrishnan won in Chemistry.",
      },
      selfCheckExample: {
        prompt: "Which Indian scientist won the Nobel Prize in Physics in 1930, and for what?",
        steps: ["The first Indian science Nobel was for the scattering of light."],
        answer: "C. V. Raman, for the Raman effect",
      },
      practiceSet: [
        { prompt: "In which subject did Har Gobind Khorana win the Nobel Prize?", answer: "Physiology or Medicine" },
        { prompt: "Name the Nobel Prize subject that was added after the first five.", answer: "Economics" },
        { prompt: "For work on what did S. Chandrasekhar win the Nobel Prize in Physics?", answer: "The life of stars" },
        { prompt: "Who left his fortune to found the Nobel Prizes?", answer: "Alfred Nobel, the inventor of dynamite" },
      ],
      pyqExampleId: "2dd18481-f035-4f4e-be2e-9d083080cfbb",
      traps: [
        {
          title: "Calling Raman a chemistry laureate",
          body: "C. V. Raman won the Nobel Prize in Physics. The Indian-origin winner in Chemistry is Venkatraman Ramakrishnan.",
        },
        {
          title: "Thinking there is a Nobel Prize in Biology",
          body: "Biology is honoured through the prize in Physiology or Medicine. No prize carries the name Biology.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9sdaw-bhatnagar",
      name: "The Shanti Swarup Bhatnagar Prize",
      intuition:
        "India's best-known science prize for young researchers is named after the chemist who set up the country's chain of national laboratories. It is given every year in seven fields, often to two people in the same field, so a question naming one winner may have a second correct name.",
      definition:
        "- Given by the **CSIR** (Council of Scientific and Industrial Research).\n" +
        "- Named after **Shanti Swarup Bhatnagar**, the **first Director-General of CSIR**.\n" +
        "- For Indian scientists **up to the age of 45**.\n" +
        "- **Seven fields**: (1) biological, (2) chemical, (3) earth, atmosphere, ocean and planetary, (4) engineering, (5) mathematical, (6) medical and (7) physical sciences.\n" +
        "- A field may have two winners in a year. In **2021**, the physical sciences prize went to the astronomer **Dr. Kanak Saha** of **IUCAA, Pune**.",
      table: {
        columns: ["Fact", "Detail"],
        rows: [
          { cells: ["Given by", "CSIR"] },
          { cells: ["Named after", "Shanti Swarup Bhatnagar, first Director-General of CSIR"] },
          { cells: ["Age limit", "Up to 45 years"] },
          { cells: ["Fields", "Biological, chemical, earth and planetary, engineering, mathematical, medical, physical sciences"] },
        ],
        caption: "Earth, atmosphere, ocean and planetary sciences count as one field.",
      },
      selfCheckExample: {
        prompt: "Which council gives the Shanti Swarup Bhatnagar Prize, and what was Bhatnagar's post in it?",
        steps: ["The prize is given by the Council of Scientific and Industrial Research.", "Bhatnagar was its first Director-General."],
        answer: "CSIR; he was its first Director-General",
      },
      practiceSet: [
        { prompt: "Up to what age can a scientist receive the Shanti Swarup Bhatnagar Prize?", answer: "45 years" },
        { prompt: "In how many fields is the Shanti Swarup Bhatnagar Prize given?", answer: "Seven" },
        { prompt: "What is the full form of CSIR?", answer: "Council of Scientific and Industrial Research" },
        { prompt: "Can two scientists share the Shanti Swarup Bhatnagar Prize in the same field in one year?", answer: "Yes: a field often has two winners in a year" },
      ],
      pyqExampleId: "c05906ba-7ac8-455b-a262-e7c74d5f1e99",
      traps: [
        {
          title: "Thinking the prize goes to one person per field",
          body: "A field often has two winners in the same year, so read every option before choosing.",
        },
        {
          title: "Taking it for a lifetime award",
          body: "The Shanti Swarup Bhatnagar Prize is for scientists up to the age of 45, for work done early in their careers.",
        },
      ],
    },
  ],
};
