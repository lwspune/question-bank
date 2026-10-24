import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EID_TROUBLE_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Trouble and Success",
  title: "Idioms: Trouble and Success",
  oneLineDefinition:
    "Idioms for difficulty, danger and ruin, and for luck, success, courage and starting again: the largest group of idioms SSC asks.",
  whyItMatters:
    "Seventy questions in the bank, 31 from the 2023 shifts, 18 from the 2024 shifts and 21 from the 2025 shifts, more than a third of the chapter. A blessing in disguise, bite the bullet and a hard nut to crack were each asked more than once, and the 2025 shifts added older idioms from history and literature.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscidtr-trouble",
      name: "Trouble, danger and ruin",
      intuition:
        "These idioms all describe a bad situation, but they differ in how bad and why: being in trouble (in a soup, up the creek), in danger (on thin ice, the sword of Damocles), ruined (cook someone's goose, go to the dogs), or facing the result of one's own act (face the music, hoist with one's own petard).",
      definition:
        "The groups:\n" +
        "- **In trouble:** in a soup, up the creek, get into a scrape, back against the wall.\n" +
        "- **Danger and threat:** treading on thin ice, the sword of Damocles (a constant threat), the writing on the wall (a warning of doom).\n" +
        "- **Ruin and decline:** cook someone's goose, go to the dogs, jump the shark (begin to decline after a peak), dead as a doornail.\n" +
        "- **Paying for one's acts:** face the music, eat humble pie, eat crow, hoist with one's own petard.\n" +
        "- **Hard problems and no choice:** a hard nut to crack, Hobson's choice (no real choice), scrape the barrel.",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["In a soup", "In trouble", "2023"] },
          { cells: ["Treading on thin ice", "In a risky position", "2023"] },
          { cells: ["A hard nut to crack", "A problem that is difficult to solve", "2023 (twice)"] },
          { cells: ["Face the music", "Bear the bad results of one's actions", "2023"] },
          { cells: ["Stir up a hornets' nest", "Provoke trouble", "2023"] },
          { cells: ["A storm in a teacup", "A big fuss about a small matter", "2023"] },
          { cells: ["Go to the dogs", "Become worse", "2023"] },
          { cells: ["The tip of the iceberg", "A small visible part of a much bigger problem", "2023, 2024"] },
          { cells: ["Cook someone's goose", "Ruin someone's plans", "2024, 2025"] },
          { cells: ["Hobson's choice", "No real choice at all", "2025"] },
          { cells: ["Hoist with one's own petard", "Harmed by one's own scheme", "2025"] },
          { cells: ["The writing on the wall", "A clear sign of coming trouble", "2025"] },
          { cells: ["A flash in the pan", "A sudden success that does not last", "2025"] },
        ],
      },
      pyqExampleId: "4a254ff6-6a15-4a51-b6b4-7b31ec57274f",
      selfCheckExample: {
        prompt: "Choose the meaning of 'A storm in a teacup'. (a) A sudden heavy rain (b) A big fuss about a small matter (c) A broken cup (d) A serious crisis",
        steps: ["A teacup is tiny, so a storm in one is small however loud it seems.", "It means a big fuss about a small matter."],
        answer: "(b) A big fuss about a small matter",
      },
      practiceSet: [
        { prompt: "What does 'in a soup' mean?", answer: "In trouble" },
        { prompt: "What does 'Hobson's choice' mean?", answer: "No real choice at all" },
        { prompt: "What does 'face the music' mean?", answer: "Bear the bad results of one's own actions" },
        { prompt: "What does 'a flash in the pan' mean?", answer: "A sudden success that does not last" },
      ],
      traps: [
        {
          title: "Reading 'a flash in the pan' as a success",
          body: "The flash is bright but brief: the idiom means a success that quickly fades, not a lasting one.",
        },
        {
          title: "Mixing up 'tip of the iceberg' and 'storm in a teacup'",
          body:
            "The tip of the iceberg is a small sign of a big problem; a storm in a teacup is a big fuss about a small problem. They point in opposite directions.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscidtr-success",
      name: "Luck, success, courage and starting over",
      intuition:
        "These idioms describe the good side: lucky turns (a blessing in disguise, hit the jackpot), winning (win one's laurels, break one's duck), courage (bite the bullet, take the bull by the horns) and starting again (back to the drawing board).",
      definition:
        "The groups:\n" +
        "- **Lucky turns:** a blessing in disguise (bad at first, good later), hit the jackpot, break a leg (good luck).\n" +
        "- **Success:** win one's laurels, break one's duck (a first success), rise to the occasion.\n" +
        "- **Courage and effort:** bite the bullet, take the bull by the horns, move heaven and earth, tooth and nail.\n" +
        "- **Narrow escapes:** by the skin of one's teeth.\n" +
        "- **Starting over and advantages:** back to the drawing board, an ace up one's sleeve, steal a march on, two strings to one's bow.",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["A blessing in disguise", "Something that seems bad but turns out well", "2023 (twice), 2024 (twice)"] },
          { cells: ["Hit the jackpot", "Have a big success", "2023"] },
          { cells: ["By the skin of one's teeth", "Only just, by a very narrow margin", "2023, 2025"] },
          { cells: ["Take the bull by the horns", "Deal with a difficulty directly and boldly", "2023"] },
          { cells: ["Bite the bullet", "Face something unpleasant with courage", "2024 (three times)"] },
          { cells: ["Break a leg", "Good luck (said before a performance)", "2024 (three times)"] },
          { cells: ["Back to the drawing board", "Start again after a failure", "2023, 2025"] },
          { cells: ["An ace up one's sleeve", "A hidden advantage kept for later", "2023"] },
          { cells: ["Break one's duck", "Achieve a first success after failures", "2025"] },
          { cells: ["Steal a march on", "Gain an advantage by acting first", "2025"] },
          { cells: ["Tooth and nail", "With all one's strength", "2025"] },
          { cells: ["Throw one's hat into the ring", "Announce that one will compete", "2025"] },
        ],
      },
      pyqExampleId: "cf532834-3767-4f92-82ee-f3b498bcad90",
      selfCheckExample: {
        prompt: "Choose the meaning of 'Bite the bullet'. (a) Get injured (b) Face something unpleasant with courage (c) Speak angrily (d) Give up",
        steps: ["The idiom comes from facing pain without crying out.", "It means to face something unpleasant bravely."],
        answer: "(b) Face something unpleasant with courage",
      },
      practiceSet: [
        { prompt: "What does 'a blessing in disguise' mean?", answer: "Something that seems bad but turns out well" },
        { prompt: "What does 'by the skin of one's teeth' mean?", answer: "Only just, by a very narrow margin" },
        { prompt: "What does 'steal a march on' mean?", answer: "Gain an advantage by acting first" },
        { prompt: "What does 'throw one's hat into the ring' mean?", answer: "Announce that one will compete" },
      ],
      traps: [
        {
          title: "Taking 'break a leg' as a curse",
          body: "In English it is a way of wishing a performer good luck, the opposite of what the words say.",
        },
        {
          title: "Reading 'back to the drawing board' as finishing",
          body: "It means starting again from the beginning after a plan has failed, not completing a design.",
        },
      ],
    },
  ],
};
