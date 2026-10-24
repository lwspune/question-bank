import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EID_SPEECH_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Speech and Opinion",
  title: "Idioms: Speech and Opinion",
  oneLineDefinition:
    "Idioms about how people speak (frankly, boastfully, evasively, revealing secrets) and about judging and deciding (doubting, discouraging, sitting on the fence, getting it right).",
  whyItMatters:
    "Thirty-four questions in the bank, 11 from the 2023 shifts, 12 from the 2024 shifts and 11 from the 2025 shifts. Gift of the gab and throw cold water on were each asked twice, and most of the rest turn on whether the speaker is open or hiding something.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscidsp-speaking",
      name: "Ways of speaking",
      intuition:
        "These idioms describe how someone speaks: frankly (call a spade a spade, speak one's mind), boastfully (blow one's own trumpet), evasively (beat about the bush), revealing a secret (spill the beans), confessing (make a clean breast of it) or exaggerating (draw the long bow).",
      definition:
        "The groups:\n" +
        "- **Frank and true:** call a spade a spade, speak one's mind, straight from the horse's mouth (from the person who knows), chapter and verse (exact details).\n" +
        "- **Telling and confessing:** spill the beans (reveal a secret), bring to light (make known), make a clean breast of it (confess fully).\n" +
        "- **Avoiding or overdoing:** beat about the bush (avoid the point), blow something out of proportion, draw the long bow (exaggerate), harp on the same string (repeat one point).\n" +
        "- **Boasting and talent:** blow one's own trumpet (boast), the gift of the gab (a talent for speaking).",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["Speak one's mind", "Say frankly what one thinks", "2023"] },
          { cells: ["Blow one's own trumpet", "Boast about oneself", "2023"] },
          { cells: ["The gift of the gab", "A talent for speaking easily", "2023, 2024"] },
          { cells: ["Beat about the bush", "Avoid coming to the point", "2023"] },
          { cells: ["Spill the beans", "Reveal a secret", "2024"] },
          { cells: ["Bring to light", "Make known, disclose", "2024"] },
          { cells: ["Call a spade a spade", "Speak plainly and truthfully", "2024"] },
          { cells: ["Straight from the horse's mouth", "From the person directly involved", "2024"] },
          { cells: ["Chapter and verse", "With exact references and detail", "2025"] },
          { cells: ["Draw the long bow", "Exaggerate", "2025"] },
          { cells: ["Harp on the same string", "Keep repeating one point", "2025"] },
        ],
      },
      pyqExampleId: "285b17a2-6e6b-4963-abf9-3ca25c3b6dae",
      selfCheckExample: {
        prompt: "Choose the meaning of 'Spill the beans'. (a) Make a mess (b) Reveal a secret (c) Cook carelessly (d) Waste money",
        steps: ["The idiom is about letting out what was kept in.", "It means to reveal a secret."],
        answer: "(b) Reveal a secret",
      },
      practiceSet: [
        { prompt: "What does 'call a spade a spade' mean?", answer: "Speak plainly and truthfully" },
        { prompt: "What does 'beat about the bush' mean?", answer: "Avoid coming to the point" },
        { prompt: "What does 'draw the long bow' mean?", answer: "Exaggerate" },
        { prompt: "What does 'the gift of the gab' mean?", answer: "A talent for speaking easily" },
      ],
      traps: [
        {
          title: "Reading 'beat about the bush' as working hard",
          body: "It means to avoid saying something directly, talking around the point instead.",
        },
        {
          title: "Taking 'blow one's own trumpet' as music",
          body: "It means to boast about one's own achievements.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscidsp-opinion",
      name: "Judging, doubting and deciding",
      intuition:
        "These idioms describe how someone judges an idea: with doubt (take it with a grain of salt), discouragingly (throw cold water on), without deciding (sit on the fence), changing their mind (blow hot and cold), or getting it exactly right (hit the nail on the head).",
      definition:
        "The groups:\n" +
        "- **Doubt and suspicion:** take it with a grain of salt, no smoke without fire (rumours usually have some truth).\n" +
        "- **Discouraging:** throw (or pour) cold water on, turn a deaf ear to (refuse to listen).\n" +
        "- **Undecided or changeable:** sit on the fence, blow hot and cold, at cross purposes (misunderstanding each other).\n" +
        "- **Right or wrong:** hit the nail on the head (exactly right), beside the mark (off the point).\n" +
        "- **Seeing more:** read between the lines (find a hidden meaning), know which way the wind blows (sense how things are going).",
      table: {
        columns: ["Idiom", "Meaning", "Asked in"],
        rows: [
          { cells: ["Take it with a grain of salt", "Not believe something fully", "2023"] },
          { cells: ["Throw cold water on", "Discourage, criticise a plan", "2023, 2025"] },
          { cells: ["No smoke without fire", "A rumour usually has some truth in it", "2023"] },
          { cells: ["At cross purposes", "Misunderstanding each other", "2023"] },
          { cells: ["Read between the lines", "Find a meaning that is not stated", "2024"] },
          { cells: ["Hit the nail on the head", "Say exactly the right thing", "2024"] },
          { cells: ["Beside the mark", "Off the point", "2024"] },
          { cells: ["Turn a deaf ear to", "Refuse to listen to", "2024"] },
          { cells: ["Blow hot and cold", "Keep changing one's mind", "2025"] },
          { cells: ["Know which way the wind blows", "Sense how things are going", "2025"] },
        ],
      },
      pyqExampleId: "28cb8a28-c008-4e44-8956-99be1a5a1c5d",
      selfCheckExample: {
        prompt: "Choose the meaning of 'Hit the nail on the head'. (a) Make a mistake (b) Say exactly the right thing (c) Work with tools (d) Hurt someone",
        steps: ["Hitting a nail squarely drives it in perfectly.", "The idiom means saying something exactly right."],
        answer: "(b) Say exactly the right thing",
      },
      practiceSet: [
        { prompt: "What does 'take it with a grain of salt' mean?", answer: "Not believe something fully" },
        { prompt: "What does 'blow hot and cold' mean?", answer: "Keep changing one's mind" },
        { prompt: "What does 'turn a deaf ear to' mean?", answer: "Refuse to listen to" },
        { prompt: "What does 'read between the lines' mean?", answer: "Find a meaning that is not stated" },
      ],
      traps: [
        {
          title: "Reading 'throw cold water on' as calming down",
          body: "It means to discourage or criticise a plan someone is excited about, not to calm a person.",
        },
        {
          title: "Mixing up 'sit on the fence' and 'blow hot and cold'",
          body: "Sitting on the fence is not deciding at all; blowing hot and cold is deciding and then changing again and again.",
        },
      ],
    },
  ],
};
