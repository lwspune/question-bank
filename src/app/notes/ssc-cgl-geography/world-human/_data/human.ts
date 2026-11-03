import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GWH_HUMAN_NOTE: SubtopicNote = {
  subtopicName: "Population and Settlements",
  title: "Population and Settlements",
  oneLineDefinition:
    "How population density is measured, what changes a population and draws people to a place, temporary settlements, and the stages of the demographic transition.",
  whyItMatters:
    "Eleven questions in the bank, and eight of them come from the 2025 shifts. Those papers asked the meaning of density measures and the stages of the demographic transition, often as assertion-reason questions, so learn each stage with its birth and death rates.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgwhhu-density",
      name: "Density and population change",
      intuition:
        "Population density sounds like one number, but it can be measured against total land or only farmed land. Population itself changes in only three ways. These short definitions carry most of the page.",
      definition:
        "Density:\n" +
        "- **Population density**: people per square kilometre of land.\n" +
        "- **Physiological density**: total population per unit of **net cultivated area**.\n" +
        "- **Agricultural density**: only the farming population per unit of net cultivable area.\n\n" +
        "Change:\n" +
        "- A population changes through **births, deaths and migration**, and nothing else. Employment may cause migration but is not itself a component.\n" +
        "- **Age-specific rates** measure births or deaths within one age group, because they vary strongly with age.\n" +
        "- **Minerals** draw people because mines and industries create **jobs**.\n" +
        "- **Temporary settlements** are built in forests, deserts and on mountains, by people who move to hunt, herd or gather.\n\n" +
        "After India, **Nepal** has the largest Hindu population.",
      table: {
        columns: ["Measure", "Population divided by"],
        rows: [
          { cells: ["Population density", "Total area"], pyqExampleId: "27e6cb0c-1114-42d3-9d77-4eb74bd75d93" },
          { cells: ["Physiological density", "Net cultivated area"], pyqExampleId: "078cdf67-ea29-424a-9722-758eb4d24ada" },
          { cells: ["Agricultural density", "Net cultivable area (farm population only)"] },
        ],
      },
      pyqExampleId: "d9301844-a98f-469c-9f97-2b91b1ec3e2c",
      selfCheckExample: {
        prompt: "A country has 50 million people and 10,000 sq km of cultivated land. What is its physiological density?",
        steps: ["Physiological density is total population divided by net cultivated area.", "50,000,000 divided by 10,000 is 5,000."],
        answer: "5,000 people per sq km of cultivated land.",
      },
      practiceSet: [
        { prompt: "What are the three components of population change?", answer: "Births, deaths and migration" },
        { prompt: "Which country has the largest Hindu population after India?", answer: "Nepal" },
        { prompt: "Why do minerals draw people to a region?", answer: "Mining and industry create jobs" },
      ],
      traps: [
        {
          title: "Employment is not a component",
          body: "Only **births, deaths and migration** change a population directly. **Employment** is the odd one out.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgwhhu-transition",
      name: "The demographic transition",
      intuition:
        "As a country develops, death rates fall first and birth rates fall later. The gap between the two falls is the population explosion. Learn the stages by what birth and death rates do in each.",
      definition:
        "The stages:\n" +
        "- **First stage**: high birth rate and high death rate, so **slow** growth.\n" +
        "- **Second stage**: better health care cuts the **death rate fast** while the **birth rate stays high**: a **population explosion**.\n" +
        "- **Third stage**: both rates are low, and growth slows. The transition is complete when fertility reaches the **replacement level**.\n\n" +
        "Limits of the theory: it does not take **migration** into account, and social and cultural factors can upset its predictions. Reproductive behaviour changes **slowly**, not at once, when health care improves.",
      table: {
        columns: ["Stage", "Births", "Deaths", "Growth"],
        rows: [
          { cells: ["First", "High", "High", "Slow"] },
          { cells: ["Second", "High", "Falling fast", "Explosive"], pyqExampleId: "96720936-fa38-47bc-b219-e1297a08a0e7" },
          { cells: ["Third", "Low", "Low", "Slow"], pyqExampleId: "9c015acd-16e3-4b0e-ae9a-b713cb16b736" },
        ],
      },
      pyqExampleId: "b28d8c8d-5419-40fb-9b1f-af5dec8af2d4",
      selfCheckExample: {
        prompt: "In which stage of the demographic transition does a population explosion happen, and why?",
        steps: ["It happens in the second stage.", "Death rates fall quickly with better health care while birth rates stay high."],
        answer: "The second stage: deaths fall but births stay high.",
      },
      practiceSet: [
        { prompt: "Is growth fast or slow in the first stage?", answer: "Slow, because high deaths offset high births" },
        { prompt: "Which factor does the demographic transition theory leave out?", answer: "Migration" },
        { prompt: "When is the transition complete?", answer: "When fertility reaches the replacement level" },
      ],
      traps: [
        {
          title: "High births and deaths give slow growth",
          body: "A statement that the first stage brings **high** growth is false: high deaths cancel high births, so growth is **slow**.",
        },
      ],
    },
  ],
};
