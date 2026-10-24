import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EID_WORK_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Work and Money",
  title: "Idioms: Work and Money",
  oneLineDefinition:
    "Idioms about how work is done (hard, carelessly, from the start, without a plan) and about saving, sharing and the value of things.",
  whyItMatters:
    "Twenty-five questions in the bank, 10 from the 2023 shifts, 11 from the 2024 shifts and 4 from the 2025 shifts. A rainy day was asked three times and call it a day, cut corners and a dime a dozen twice each, so this list repeats more than most.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscidwo-work",
      name: "Work and effort",
      intuition:
        "Work idioms say how a job is done: with full effort (pull one's socks up, move heaven and earth), carelessly or cheaply (cut corners), without a plan (play it by ear), from the very start (start from scratch), or stopped (call it a day).",
      definition:
        "The groups:\n" +
        "- **Effort:** pull one's socks up (try harder), move heaven and earth (do everything possible), make a beeline for (go straight to).\n" +
        "- **Shortcuts and improvising:** cut corners (do a job cheaply or carelessly), play it by ear (act without a plan).\n" +
        "- **Starting and stopping:** start from scratch, call it a day (stop work).\n" +
        "- **Order and importance:** in apple-pie order (neat and tidy), have bigger fish to fry (have more important things to do).\n" +
        "- **Getting help:** pull a few strings (use influence).",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["Call it a day", "Stop working for now", "2023 (twice)"] },
          { cells: ["Cut corners", "Do something cheaply or carelessly", "2023, 2024"] },
          { cells: ["In apple-pie order", "In perfect order", "2023"] },
          { cells: ["Prime the pump", "Encourage something to start or grow", "2023"] },
          { cells: ["Have bigger fish to fry", "Have more important things to deal with", "2024"] },
          { cells: ["Start from scratch", "Begin again from the very beginning", "2024"] },
          { cells: ["Pull one's socks up", "Make more effort", "2024"] },
          { cells: ["Make a beeline for", "Go straight and quickly towards", "2024"] },
          { cells: ["Penelope's web", "A task that never ends", "2024"] },
          { cells: ["Not in my line", "Not in my area of skill", "2025"] },
          { cells: ["Pull a few strings", "Use one's influence to get something done", "2025"] },
        ],
      },
      pyqExampleId: "bcb788e2-c9b9-4164-ac48-ad7cadacc5fb",
      selfCheckExample: {
        prompt: "Choose the meaning of 'Call it a day'. (a) Name a holiday (b) Stop working for now (c) Work all night (d) Set a date",
        steps: ["The idiom is said when people decide they have done enough work.", "It means to stop working for now."],
        answer: "(b) Stop working for now",
      },
      practiceSet: [
        { prompt: "What does 'cut corners' mean?", answer: "Do something cheaply or carelessly" },
        { prompt: "What does 'have bigger fish to fry' mean?", answer: "Have more important things to deal with" },
        { prompt: "What does 'pull a few strings' mean?", answer: "Use one's influence to get something done" },
        { prompt: "What does 'Penelope's web' mean?", answer: "A task that never ends" },
      ],
      traps: [
        {
          title: "Reading 'cut corners' as saving time well",
          body: "To cut corners is to do a job badly or cheaply to save effort, usually with worse results.",
        },
        {
          title: "Reading 'pull your socks up' literally",
          body: "It means to make more effort to improve, not anything about clothes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscidwo-money",
      name: "Money, saving and value",
      intuition:
        "Money idioms answer one question: how much something is worth, or how money is kept. Something cheap and common is a dime a dozen; the biggest part is the lion's share; money kept aside is saved for a rainy day.",
      definition:
        "The groups:\n" +
        "- **Saving and need:** save for a rainy day, keep the wolf from the door (have just enough to live on).\n" +
        "- **Value:** a dime a dozen (common and of little value), the lion's share (the biggest part).\n" +
        "- **Pointless supply:** carry coals to Newcastle (bring something where there is plenty already).\n" +
        "- **Stealing:** a five-finger discount (stealing from a shop).",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["For a rainy day", "For a future time of need", "2023 (twice), 2024"] },
          { cells: ["Keep the wolf from the door", "Have just enough to live on", "2024"] },
          { cells: ["The lion's share", "The biggest part", "2024"] },
          { cells: ["A five-finger discount", "Stealing from a shop", "2024"] },
          { cells: ["Carry coals to Newcastle", "Supply something where it is already plentiful", "2025"] },
        ],
      },
      pyqExampleId: "7d0b69e0-a7ba-4006-b7e2-31a53dd6260e",
      selfCheckExample: {
        prompt: "Choose the meaning of 'The lion's share'. (a) A fair share (b) The biggest part (c) A small part (d) A brave act",
        steps: ["A lion takes the most of any kill.", "The lion's share is the biggest part."],
        answer: "(b) The biggest part",
      },
      practiceSet: [
        { prompt: "What does it mean to save 'for a rainy day'?", answer: "For a future time of need" },
        { prompt: "What does 'carry coals to Newcastle' mean?", answer: "Supply something where it is already plentiful" },
        { prompt: "What does 'keep the wolf from the door' mean?", answer: "Have just enough to live on" },
        { prompt: "What does 'a five-finger discount' mean?", answer: "Stealing from a shop" },
      ],
      traps: [
        {
          title: "Reading 'a rainy day' as weather",
          body: "A rainy day here is a future time of need, such as an illness or a loss of income.",
        },
      ],
    },
  ],
};
