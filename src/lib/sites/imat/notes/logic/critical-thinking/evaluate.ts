import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_CRT_EVALUATE_NOTE: SubtopicNote = {
  subtopicName: "Strengthening and Weakening",
  title: "Strengthening and Weakening an Argument",
  oneLineDefinition:
    "Take each option as true and ask whether it makes the step from reasons to conclusion more or less believable.",
  whyItMatters:
    "Weaken questions were asked 12 times (2011 to 2019) and strengthen questions 10 times (2012 to 2023), including one of the two ministry questions in 2023. Both use the same stem, 'which one of the following, if true', and the same method run in opposite directions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-crt-weaken",
      name: "Weakening an argument: attack the link, not the facts",
      intuition:
        "The words 'if true' tell you to accept every option as a fact. So you cannot weaken an argument by doubting its premises. You weaken it by showing that the premises, even if true, do not lead to the conclusion: there is another explanation, the comparison is unfair, or the plan will not achieve its aim.",
      definition:
        "Question form: 'Which one of the following, if true, would most weaken the argument?'\n" +
        "- Treat every option as **true**. Ask: does it make the **conclusion** less likely to follow from the premises?\n" +
        "- **Alternative explanation**: something else could have produced the evidence.\n" +
        "- **Unfair comparison**: the case in the evidence is not like the case in the conclusion.\n" +
        "- **Plan fails**: an obstacle or side effect stops the proposal achieving its own aim.\n" +
        "- **Assumption false**: the option denies a gap the argument needs to close.\n" +
        "- Ignore options that are **irrelevant** (on the topic but not on the claim) and options that in fact **strengthen**.",
      authoredExample: {
        prompt:
          "'Three months ago a café replaced its menu with cheaper, healthier dishes. Since then its takings have risen by 15%. The owner concludes that customers prefer the new menu, and she plans to make the same change at her second café.' Which weakens the owner's conclusion most: (a) the new dishes take a little longer to prepare; (b) a large office opened next door three months ago, bringing many new lunchtime customers; (c) several regular customers said they liked the new dishes?",
        steps: [
          "Conclusion: customers prefer the new menu. Evidence: takings rose after the change.",
          "Gap: the argument assumes the menu caused the rise. Look for anything else that changed at the same time.",
          "(b) gives exactly that: a new source of customers arriving at the same moment. The rise may have nothing to do with the menu. This weakens most.",
          "(a) is about the kitchen, not about what customers prefer. (c) supports the owner, so it strengthens.",
        ],
        answer: "(b) The new office next door offers another explanation for the rise in takings.",
      },
      selfCheckExample: {
        prompt:
          "A company that makes an app for learning Spanish reports that 85% of users who completed its full course went on to pass a recognised beginners' exam. The national pass rate for that exam is 60%. The company therefore claims that its app teaches Spanish better than other ways of learning.\n\nWhich one of the following, if true, would most weaken the company's claim?",
        options: [
          "The app costs less than most evening classes in Spanish.",
          "Most people who start the course give up, and those who finish it were already doing well at the start.",
          "The beginners' exam has been set in the same format for ten years.",
          "Many users of the app say they enjoy using it every day.",
          "The national pass rate includes many candidates who studied with the app.",
        ],
        steps: [
          "The comparison sets course finishers against all exam candidates. B shows that the finishers are a selected group of strong learners. Their high pass rate may reflect who they are, not what the app did. This weakens the claim most.",
          "A and C are about cost and the exam format, not about how well the app teaches. D is about enjoyment, not results.",
          "E, if anything, strengthens: if app users are inside the 60%, people who learned in other ways did even worse.",
        ],
        answer: "(B) Most people who start the course give up, and those who finish it were already doing well at the start.",
      },
      practiceSet: [
        {
          prompt:
            "'Umbrella sales rose after the shop moved them next to the door, so the new position caused the rise.' Suggest a fact that would weaken this.",
          answer: "It rained far more than usual in the weeks after the move.",
          method: "An alternative explanation for the evidence",
        },
        {
          prompt: "In a weaken question, can you reject an option because you think it is untrue?",
          answer: "No. Every option is to be treated as true.",
        },
        {
          prompt:
            "'Crime in our town fell after cameras were installed, so cameras reduce crime.' Which weakens more: (a) the cameras were expensive; (b) crime fell by the same amount in nearby towns with no cameras?",
          answer: "(b)",
          method: "It shows the fall happened without cameras too",
        },
      ],
      traps: [
        {
          title: "Cost is rarely the weakener",
          body: "If the conclusion is that a plan would work, an option saying the plan is expensive does not weaken it: an expensive plan can still work. Only options that bear on the conclusion itself count. Check what exactly the conclusion claims before judging an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-crt-strengthen",
      name: "Strengthening an argument: close the gap",
      intuition:
        "Strengthening is weakening in reverse. Find the gap between the evidence and the conclusion, then pick the option that closes it. The strongest option usually rules out the alternative explanation you would have used to weaken the argument.",
      definition:
        "Question form: 'Which one of the following, if true, would most strengthen the argument?'\n" +
        "- **Rule out an alternative**: show that nothing else could explain the evidence.\n" +
        "- **Show the comparison is fair**: the groups compared were alike in every other way.\n" +
        "- **Supply the missing link**: state the assumption the argument depends on.\n" +
        "- **Add direct evidence** for the conclusion, not just for the topic.\n" +
        "- Wrong options: one that repeats a premise (adds nothing), one about the topic but not the claim, one that supports a different conclusion.",
      authoredExample: {
        prompt:
          "'On hot afternoons, the top floors of buildings with plant-covered roofs were about 3 °C cooler than the top floors of buildings with ordinary roofs. The city council argues that requiring green roofs on all new buildings would reduce the energy used for air conditioning.' Which strengthens most: (a) green roofs provide a home for insects and birds; (b) the buildings compared were similar in age, size and insulation; (c) green roofs can be fitted to most flat roofs?",
        steps: [
          "Conclusion: green roofs would reduce air conditioning energy. Evidence: green-roofed buildings had cooler top floors.",
          "Weak point: the green-roofed buildings may have been cooler for another reason, such as being newer or better insulated.",
          "(b) rules that out: the buildings were alike apart from the roof. Now the roof is the likeliest cause, so this strengthens most.",
          "(a) is a separate benefit, not evidence about cooling or energy. (c) shows the plan is possible, which helps a little, but says nothing about whether it saves energy.",
        ],
        answer: "(b) The comparison was fair, so the cooler floors are best explained by the roofs.",
      },
      selfCheckExample: {
        prompt:
          "After a hospital placed hand gel dispensers beside every bed, the number of patients who caught an infection on its wards fell by a quarter over the following year. The hospital's managers concluded that the dispensers had reduced infections.\n\nWhich one of the following, if true, would most strengthen the managers' conclusion?",
        options: [
          "Hand gel is cheaper to supply than soap and paper towels.",
          "The hospital changed to a stronger floor cleaner in the same month the dispensers were installed.",
          "Patients said they liked seeing staff clean their hands at the bedside.",
          "Staff cleaned their hands far more often after the dispensers arrived, and no other ward routine changed that year.",
          "Infections caught in hospital are a serious risk for patients after surgery.",
        ],
        steps: [
          "D supplies the link (staff did use the gel more) and rules out other changes. Both close the gap between 'dispensers installed' and 'infections fell'.",
          "B is a weakener: the new floor cleaner is another possible cause of the fall.",
          "A is about cost, C about patients' feelings and E about how serious infections are. None bears on whether the dispensers caused the fall.",
        ],
        answer: "(D) Staff cleaned their hands far more often after the dispensers arrived, and no other ward routine changed that year.",
      },
      practiceSet: [
        {
          prompt:
            "'Employees took fewer sick days after the company gym opened, so the gym improved their health.' Which strengthens more: (a) the gym is popular with staff; (b) gym users took fewer sick days than non-users who had been equally healthy before it opened?",
          answer: "(b)",
          method: "It compares like with like and links the gym to the fall",
        },
        {
          prompt: "Does an option that repeats one of the passage's premises strengthen the argument?",
          answer: "No. It adds nothing new.",
        },
        {
          prompt:
            "'Free swimming lessons for children would mean more children can swim.' What fact would strengthen this?",
          answer: "Many families do not take lessons only because of the cost.",
          method: "It supplies the missing link: cost is the barrier",
        },
      ],
      traps: [
        {
          title: "On the topic is not the same as relevant",
          body: "An option can be about the same subject as the passage and still say nothing about whether the premises lead to the conclusion. Ask of each option: does it make this exact conclusion more likely? A second benefit of the plan, or a fact about how serious the problem is, does not.",
        },
      ],
    },
  ],
};
