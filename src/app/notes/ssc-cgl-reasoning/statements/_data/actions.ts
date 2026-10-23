import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RST_ACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Cause, Effect and Courses of Action",
  title: "Cause, Effect and Courses of Action",
  oneLineDefinition:
    "Decide which of two events caused the other, which courses of action sensibly address a problem, or what a responsible person should do in a given situation.",
  whyItMatters:
    "Eighteen questions in the bank, all from the 2025 shifts, and 17 of them EASY. Eight are \"what should you do\" situations, seven ask for courses of action and three for cause and effect, and in all of them the answer is the practical, fair and lawful step.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrstca-cause",
      name: "Which event caused the other",
      intuition:
        "Two statements describe two events. Ask which one would explain the other: the cause comes first and the effect follows from it. A surge in break-ins leads a shop to fit locks, not the other way round.",
      definition:
        "- **Cause:** the event that makes the other happen. **Effect:** the event that follows from it.\n" +
        "- Test both directions: \"Did II happen because of I?\" and \"Did I happen because of II?\" Usually only one sounds sensible.\n" +
        "- A step taken in response (a training programme, a new rule) is usually the effect of the problem that prompted it.\n" +
        "- Two events can also be effects of one common cause, or unrelated; some options offer these.\n" +
        "- **Fast route:** find the statement that describes a response or a result. It is usually the effect.",
      authoredExample: {
        prompt: "Statements: I. The river flooded the village. II. It rained heavily for three days. Which is the cause and which the effect?",
        steps: ["Heavy rain for three days can make a river flood; a flood cannot cause the rain.", "So II is the cause and I is the effect."],
        answer: "II is the cause and I is the effect",
      },
      selfCheckExample: {
        prompt: "Statements: I. Many shops closed early. II. The city declared a sudden public holiday. Which is the cause and which the effect?",
        steps: ["A holiday gives shops a reason to close early; shops closing do not declare holidays.", "So II is the cause and I is the effect."],
        answer: "II is the cause and I is the effect",
      },
      practiceSet: [
        { prompt: "Which comes first in time, a cause or its effect?", answer: "The cause" },
        { prompt: "Statements: I. A company hired more security guards. II. Thefts at its warehouse rose. Which is the cause?", answer: "II, the rise in thefts" },
        { prompt: "Statements: I. Sales of ice cream rose. II. Sales of sunscreen rose. How are they related?", answer: "Both are effects of a common cause, such as hot weather." },
        { prompt: "Is a step taken in response to a problem usually the cause or the effect?", answer: "The effect" },
      ],
      pyqExampleId: "cf90ac5d-7082-4cd8-8489-c3ee676d708c",
      traps: [
        {
          title: "Taking the order of the statements for cause and effect",
          body:
            "Statement I is not always the cause. Read both events and decide which explains the other, whatever order they are printed in.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrstca-action",
      name: "Courses of action for a problem",
      intuition:
        "A course of action follows if it is practical and deals with the problem directly. Extreme steps that stop the activity altogether, punish everyone, or do not touch the cause of the problem do not follow.",
      definition:
        "- **Follows:** practical, within reach of the people concerned, and aimed at the problem or its cause.\n" +
        "- **Does not follow:** extreme (shut it down, ban it completely), unrelated to the problem, or impossible to carry out.\n" +
        "- Two actions can both follow when each tackles the problem from a different side (enforcement and awareness).\n" +
        "- **Fast route:** strike any action that ends the activity instead of fixing it, then check that each remaining action really reduces the problem.",
      authoredExample: {
        prompt:
          "Problem: Patients wait for hours at a government hospital. Actions: 1. Open more registration counters. 2. Close the hospital. Which actions follow?",
        steps: [
          "1: more counters serve patients faster. It follows.",
          "2: closing the hospital ends the service instead of fixing the wait. It does not follow.",
        ],
        answer: "Only 1",
      },
      selfCheckExample: {
        prompt:
          "Problem: A town's water supply is cut often in summer. Actions: 1. Repair the leaking pipes. 2. Ask people to use water carefully. Which actions follow?",
        steps: ["1: fixing leaks saves water and improves supply. It follows.", "2: careful use stretches the supply further. It follows too."],
        answer: "Both 1 and 2",
      },
      practiceSet: [
        { prompt: "Problem: students arrive late. Is \"Close the school\" a sound course of action?", answer: "No: it is extreme and ends the activity." },
        { prompt: "Can two different actions both follow?", answer: "Yes, if each tackles the problem in a practical way." },
        { prompt: "Problem: a road has frequent accidents. Does \"Put up speed limit signs and enforce them\" follow?", answer: "Yes" },
        { prompt: "An action has nothing to do with the problem's cause. Does it follow?", answer: "No" },
      ],
      pyqExampleId: "dc863d6b-c7c4-469f-a616-6dca604d2b1e",
      traps: [
        {
          title: "Choosing the strongest action",
          body:
            "Banning online classes would end distraction in them, but it also ends the classes. The right course fixes the problem and keeps the useful activity going.",
        },
        {
          title: "Rejecting a sensible action because another is better",
          body:
            "Each action is judged on its own. If both are practical and both help, both follow, even if one helps more.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrstca-situation",
      name: "What should you do",
      intuition:
        "These questions put you in a role (an officer, a doctor, a team lead) and ask for the best response. The right answer is the one a responsible, fair person in that role would choose: deal with the problem, through proper channels, without harming anyone.",
      definition:
        "- **Choose:** the option that solves the problem, follows the rules of your role, and treats people fairly.\n" +
        "- **Avoid:** doing nothing, passing the problem on, punishing without reason, quitting, or breaking a rule to save time.\n" +
        "- When someone needs help (a citizen, a patient, a junior), the right answer helps them and keeps to the rules.\n" +
        "- When you see wrongdoing, report it through the proper channel, with evidence.\n" +
        "- **Fast route:** strike the options that ignore the problem or make it worse; the one left is usually the answer.",
      authoredExample: {
        prompt:
          "You are a shopkeeper, and a customer pays you 100 rupees too much by mistake and walks away. What should you do?",
        steps: [
          "Keeping the money is dishonest; waiting for the customer to notice does nothing.",
          "The responsible step is to call the customer back and return the extra amount.",
        ],
        answer: "Call the customer back and return the extra money",
      },
      selfCheckExample: {
        prompt:
          "As a member of a team, you notice a mistake in a colleague's report just before it is sent to a client. What should you do?",
        steps: [
          "Staying silent lets the mistake reach the client; blaming the colleague in public helps no one.",
          "Point out the mistake to the colleague at once so that it can be corrected before the report goes.",
        ],
        answer: "Tell the colleague at once so the report can be corrected",
      },
      practiceSet: [
        { prompt: "As an officer, you find a rule being broken in your office. Should you ignore it?", answer: "No: report it through the proper channel." },
        { prompt: "You are given a task you do not know how to do. What is the best first step?", answer: "Ask for guidance from someone who knows." },
        { prompt: "Which kind of option should you strike first in a \"what should you do\" question?", answer: "One that ignores the problem or makes it worse." },
        { prompt: "A citizen does not understand a form at your counter. Should you send them away?", answer: "No: help them fill it in correctly." },
      ],
      pyqExampleId: "207a6c7f-8939-4632-9f39-765b49cc6fe3",
      traps: [
        {
          title: "Picking the quick step over the right one",
          body:
            "Turning away a complaint that arrives as the counter closes is quick, but the responsible step is to take it down or tell the person when to come back. The answer is the responsible step, not the fastest.",
        },
        {
          title: "Choosing an extreme reaction",
          body:
            "Resigning, punishing a whole team or going straight to the media are rarely the best first steps. Look for the measured action that deals with the problem through proper channels.",
        },
      ],
    },
  ],
};
