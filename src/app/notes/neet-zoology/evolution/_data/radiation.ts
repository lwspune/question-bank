import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_EV_RADIATION_NOTE: SubtopicNote = {
  subtopicName: "Adaptive Radiation and Darwinism",
  title: "Adaptive Radiation and Darwinism",
  oneLineDefinition:
    "Darwin's theory of natural selection, Lamarck's older idea, Darwin's finches, and the Australian marsupials with their placental look-alikes.",
  whyItMatters:
    "Four NEET questions from 2023 to 2026, all on adaptive radiation: two on the Australian marsupials and their placental look-alikes, one on Darwin's finches and one asking what kind of evolution the look-alikes show. Learn NCERT's seven placental and marsupial pairs by name.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoev-darwin",
      name: "Darwin's theory and Darwin's finches",
      intuition:
        "Darwin sailed around the world and kept noticing the same pattern: living things vary, more are born than can survive, and the ones that happen to suit their surroundings leave more young. Over many generations, one stock branches into many. On the Galapagos Islands he saw this branching in small birds: one seed-eating finch had given rise to many finches with different beaks.",
      definition:
        "Darwin's theory in NCERT:\n" +
        "- **Charles Darwin** made a sea voyage around the world on the sail ship **H.M.S. Beagle**. He concluded that living forms share similarities with each other and with life forms that lived millions of years ago, many of which no longer exist.\n" +
        "- **Alfred Wallace**, a naturalist who worked in the **Malay Archipelago**, reached similar conclusions at about the same time.\n" +
        "- **Fitness**, in the end, means only **reproductive fitness**: those better fit in an environment leave more progeny, so they are selected by nature.\n" +
        "- The two key concepts of Darwin's theory are **branching descent** and **natural selection**.\n" +
        "- Before Darwin, the French naturalist **Lamarck** said evolution was driven by the **use and disuse of organs**. His example: giraffes stretching for leaves on tall trees grew longer necks and passed this acquired character on. Nobody believes this conjecture any more.\n\n" +
        "**Adaptive radiation** is the evolution of different species in a given geographical area, starting from a point and radiating to other areas (habitats). Darwin's own example was his **finches** on the **Galapagos Islands**: from the original **seed-eating** finch, many other forms with **altered beaks** arose, letting them become **insectivorous** and **vegetarian** finches.",
      table: {
        columns: ["Idea", "Who", "What NCERT says"],
        rows: [
          { cells: ["Voyage on H.M.S. Beagle", "Charles Darwin", "Living forms share similarities with each other and with forms of millions of years ago"] },
          { cells: ["The same conclusion, independently", "Alfred Wallace", "Worked in the Malay Archipelago"] },
          { cells: ["Fitness", "Darwin", "Reproductive fitness: leaving more progeny"] },
          { cells: ["Key concepts of the theory", "Darwin", "Branching descent and natural selection"] },
          { cells: ["Use and disuse of organs", "Lamarck", "Giraffe necks; no longer believed"] },
          { cells: ["Darwin's finches", "Galapagos Islands", "Seed-eaters gave rise to insectivorous and vegetarian finches with altered beaks"] },
        ],
      },
      pyqExampleId: "1314c40d-804f-49b1-ad26-4b1ed970c36b",
      selfCheckExample: {
        prompt: "In Darwin's theory, an animal that lives long but leaves no offspring: is it fit or unfit, and why?",
        steps: [
          "NCERT says fitness ultimately means only reproductive fitness.",
          "An animal that leaves no progeny passes nothing on, however long it lives.",
        ],
        answer: "Unfit: fitness is measured by the progeny left.",
      },
      practiceSet: [
        { prompt: "On which ship did Charles Darwin make his voyage around the world?", answer: "H.M.S. Beagle" },
        { prompt: "Which naturalist, working in the Malay Archipelago, reached conclusions like Darwin's?", answer: "Alfred Wallace" },
        { prompt: "What are the two key concepts of Darwin's theory of evolution?", answer: "Branching descent and natural selection" },
        { prompt: "Who said evolution was driven by the use and disuse of organs?", answer: "Lamarck" },
        { prompt: "On which islands did Darwin study his finches?", answer: "The Galapagos Islands" },
      ],
      traps: [
        {
          title: "Darwin's finches are adaptive radiation",
          body: "**Darwin's finches** show **adaptive radiation**: one seed-eating stock radiated into finches with different beaks. They are not an example of convergent evolution, artificial selection or genetic drift.",
        },
        {
          title: "The giraffe neck is Lamarck's idea, not Darwin's",
          body: "Giraffes stretching their necks and passing the longer neck on is **Lamarck's use and disuse** idea, which is no longer believed. Darwin's mechanism is **natural selection**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoev-marsupials",
      name: "Australian marsupials and convergent evolution",
      intuition:
        "Australia was cut off from the other continents, and its pouched mammals radiated into every kind of life: burrowers, ant-eaters, gliders, hunters. Elsewhere, placental mammals radiated into the same kinds of life. So each Australian marsupial has a placental look-alike, not because they are close relatives but because they live the same way.",
      definition:
        "Australian marsupials in NCERT:\n" +
        "- A number of **marsupials**, each different from the other, evolved from **one ancestral stock**, all within the **Australian island continent**. This is adaptive radiation.\n" +
        "- When **more than one adaptive radiation** appears to have occurred in an isolated geographical area (representing different habitats), it can be called **convergent evolution**.\n" +
        "- **Placental mammals** in Australia also show adaptive radiation into varieties, each **similar to a corresponding marsupial**, for example the placental wolf and the **Tasmanian wolf**.\n" +
        "- The pouched mammals of Australia survived, thanks to **continental drift**, because there was no competition from any other mammal.",
      table: {
        columns: ["Placental mammal", "Its Australian marsupial look-alike"],
        rows: [
          { cells: ["Mole", "Marsupial mole"] },
          {
            cells: ["Anteater", "Numbat (anteater)"],
            noteAmber: "NEET 2023: numbat, spotted cuscus and flying phalanger was the set of Australian marsupials; bobcat, mole, flying squirrel, lemur, anteater and wolf are placental.",
            pyqExampleId: "5d68638f-a4e3-419e-8f8c-75a649f77c7a",
          },
          { cells: ["Mouse", "Marsupial mouse"] },
          { cells: ["Lemur", "Spotted cuscus"] },
          { cells: ["Flying squirrel", "Flying phalanger"] },
          { cells: ["Bobcat", "Tasmanian tiger cat"] },
          {
            cells: ["Wolf", "Tasmanian wolf"],
            noteAmber: "Re-NEET 2026: adaptive radiation in placental mammals and Australian marsupials, giving look-alikes in distant species, is convergent evolution.",
            pyqExampleId: "2689565d-1d20-4136-8824-177ec1f78408",
          },
        ],
      },
      pyqExampleId: "757a6901-07e2-4d17-9154-a65b166dc65d",
      selfCheckExample: {
        prompt: "Which Australian marsupial is the look-alike of the placental mole, and which is the look-alike of the placental wolf?",
        steps: [
          "NCERT pairs each placental mammal with the marsupial that lives the same way.",
          "The burrowing mole matches the marsupial mole; the hunting wolf matches the Tasmanian wolf.",
        ],
        answer: "The marsupial mole and the Tasmanian wolf.",
      },
      practiceSet: [
        { prompt: "Is the spotted cuscus a placental mammal or an Australian marsupial?", answer: "An Australian marsupial" },
        { prompt: "Is the bobcat a placental mammal or an Australian marsupial?", answer: "A placental mammal" },
        { prompt: "What is it called when more than one adaptive radiation occurs in an isolated geographical area?", answer: "Convergent evolution" },
        { prompt: "Why did the pouched mammals of Australia survive, according to NCERT?", answer: "Continental drift left them without competition from other mammals" },
        { prompt: "Which placental mammal matches the marsupial mouse?", answer: "The mouse" },
      ],
      traps: [
        {
          title: "The bobcat is placental",
          body: "The **bobcat** is a **placental** mammal; its marsupial look-alike is the **Tasmanian tiger cat**. A set of Australian marsupials that includes a bobcat is wrong.",
        },
        {
          title: "The placental and marsupial look-alikes are convergent",
          body: "Each marsupial group radiated from **one stock** (adaptive radiation), but the **similarity between a placental mammal and its marsupial look-alike** is **convergent evolution**, not divergent evolution.",
        },
      ],
    },
  ],
};
