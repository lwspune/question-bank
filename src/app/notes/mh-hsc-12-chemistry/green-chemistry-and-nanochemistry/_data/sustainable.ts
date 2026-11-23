import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GN_SUSTAINABLE_NOTE: SubtopicNote = {
  subtopicName: "Sustainable Development",
  title: "Green Chemistry and Sustainable Development",
  oneLineDefinition:
    "What green chemistry is, who coined the idea, and how its twelve principles lead to development that meets today's needs without robbing future generations.",
  whyItMatters:
    "3 questions. One was set in board papers: explain the term sustainable development, paired with the term nanomaterial (2025). The textbook adds a question asking for the definitions of green chemistry and sustainable development together, and a one-mark choice that names sustainable development from its definition.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccgn-green-chemistry",
      name: "Green chemistry: the definition",
      intuition:
        "Chemistry has made our lives better, but factories, solvents and waste have also put our health and the environment under threat. Green chemistry asks the chemist to stop the harm at the design stage: plan the product and the process so that dangerous substances are never used or made, instead of cleaning up the mess afterwards.",
      definition:
        "- **Definition (learn it word for word):** Green chemistry is the use of chemistry for pollution prevention by environmentally conscious design of chemical products and processes that reduce or eliminate the use or generation of hazardous substances.\n" +
        "- **In simple words:** an approach to chemistry that aims to maximize efficiency and minimize hazardous effects on human health and the environment.\n" +
        "- **Why we need it:** a growing population and the industrial revolution have made energy crises and environmental pollution major global problems of the 21st century.\n" +
        "- The concept of green chemistry was **coined by Paul T. Anastas**, director of Yale University's Center for Green Chemistry and Green Engineering, known as the **father of green chemistry**. He also enunciated its **twelve principles**.",
      authoredExample: {
        prompt: "Why do we need green chemistry, and who is known as the father of green chemistry?",
        steps: [
          "Need: chemistry has improved the quality of our life, but our health and the global environment are now under threat.",
          "Population growth and the industrial revolution have made energy crises and environmental pollution major global problems of the 21st century.",
          "To reduce these problems and save natural resources, we apply the twelve principles of green chemistry wherever possible.",
          "Father of green chemistry: Paul T. Anastas, who coined the concept.",
        ],
        answer: "To reduce energy crises and pollution and save resources; Paul T. Anastas",
      },
      selfCheckExample: {
        prompt: "How many principles of green chemistry are there, and who enunciated them?",
        steps: ["The textbook lists twelve principles, enunciated by Paul Anastas."],
        answer: "Twelve, by Paul T. Anastas",
      },
      practiceSet: [
        { prompt: "Does green chemistry aim to clean up pollution after it is made, or to prevent it?", answer: "To prevent it, by the design of products and processes" },
        { prompt: "Name the university whose Center for Green Chemistry and Green Engineering is directed by Paul T. Anastas.", answer: "Yale University" },
        { prompt: "State the aim of green chemistry in one sentence.", answer: "To maximize efficiency and minimize hazardous effects on human health and the environment" },
      ],
      pyqExampleId: "a8a6d774-a221-440e-90e2-51d4b87e08bf",
      traps: [
        {
          title: "A definition without 'design'",
          body: "Writing 'green chemistry means reducing pollution' loses the mark. The key words are pollution prevention by environmentally conscious **design** of products and processes that reduce or eliminate hazardous substances.",
        },
        {
          title: "Mixing up the two founders",
          body: "Paul T. Anastas coined green chemistry. Nario Taniguchi defined the term nanotechnology (1974). Keep the two halves of the chapter apart.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgn-sustainable",
      name: "Sustainable development",
      intuition:
        "Think of the Earth's resources as a family's savings. Spending all of it now leaves nothing for the children. Sustainable development means using what we need today while leaving enough for the generations to come, and green chemistry is the tool chemists use to do it.",
      definition:
        "- **Definition:** Sustainable development is development that meets the needs of the present, without compromising the ability of future generations to meet their own needs.\n" +
        "- The idea has continued to grow into protecting the world's resources.\n" +
        "- **Link with green chemistry:** green chemistry plays an important role in sustainable development. We can achieve sustainable development by adopting the twelve principles of green chemistry.",
      authoredExample: {
        prompt: "How does green chemistry help to achieve sustainable development? Answer in three points.",
        steps: [
          "Sustainable development meets the needs of the present without compromising the ability of future generations to meet their own needs.",
          "Green chemistry prevents waste and pollution at the design stage, so the environment future generations inherit is not damaged.",
          "Its principles, such as the use of renewable feedstocks, save nonrenewable resources such as crude oil for the future.",
          "So adopting the twelve principles of green chemistry is the way to achieve sustainable development.",
        ],
        answer: "By adopting the twelve principles of green chemistry: preventing pollution and saving resources for future generations",
      },
      selfCheckExample: {
        prompt: "A country uses up all its crude oil in fifty years to grow fast. Is this sustainable development? Give a reason.",
        steps: [
          "It meets present needs, but it leaves no crude oil for future generations.",
          "So it compromises their ability to meet their own needs.",
        ],
        answer: "No: it compromises the ability of future generations to meet their needs",
      },
      practiceSet: [
        { prompt: "What does sustainable development protect for future generations?", answer: "The world's resources, so that they can meet their own needs" },
        { prompt: "How can sustainable development be achieved, according to the textbook?", answer: "By adopting the twelve principles of green chemistry" },
        { prompt: "Which principle of green chemistry directly saves nonrenewable resources for the future?", answer: "Use of renewable feedstocks" },
      ],
      pyqExampleId: "0b339364-5d1f-406c-85c0-59746ef9e711",
      traps: [
        {
          title: "Leaving out the future generations",
          body: "'Development that meets present needs' is only half the definition. The mark is for the second half: without compromising the ability of future generations to meet their own needs.",
        },
        {
          title: "Not linking it to green chemistry",
          body: "When a question pairs the two terms, end with the link: sustainable development is achieved by adopting the twelve principles of green chemistry.",
        },
      ],
    },
  ],
};
