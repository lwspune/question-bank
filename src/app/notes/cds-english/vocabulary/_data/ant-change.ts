import type { SubtopicNote } from "@/app/notes/_types";

const COLUMNS = ["Word", "Meaning", "Opposite", "Other options", "Sitting"];

export const CDSEN_ANT_CHANGE_NOTE: SubtopicNote = {
  subtopicName: "Antonyms: Time, Change and Action",
  title: "Antonyms: words for time, change and action",
  oneLineDefinition:
    "Words for being active or still, lasting or passing, starting or stopping, joining or separating, with the opposites CDS has asked for.",
  whyItMatters:
    "These are direction words: they say which way something moves, not whether it is good or bad. " +
    "The options usually hold three words moving the same way as the tested word and one moving against it. Picture the movement, and the odd one out shows itself.",
  concepts: [
    // C1 — active and idle, alive and dead
    {
      kind: "reference" as const,
      slug: "cdsenant-active",
      name: "Active and idle, alive and dead",
      intuition:
        "Moving against still, alive against dead, strong against open to harm. Science words help here: inertia is a body's resistance to moving, and a dormant volcano is one that is sleeping.",
      definition:
        "- **Still:** inert, inertia, dormant (sleeping), latent, quiescent, sluggish, torpor.\n" +
        "- **Moving:** lively, active, activity.\n" +
        "- **Life and decline:** decay and deceased (rotting, dead) against survival and alive.\n" +
        "- **Strength:** invincible (cannot be beaten) against vulnerable (open to harm); vulnerable against resilient (recovers quickly).",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["inert", "without movement or energy", "lively", "quiescent, dormant, apathetic (synonyms)", "2019 (I)"], pyqExampleId: "f9b95a21-b751-407b-af48-70a98a1fadfc" },
          { cells: ["inertia", "unwillingness to move or change", "activity", "sluggishness, indolence, torpor (synonyms)", "2020 (I)"], pyqExampleId: "a00f53a8-b013-40ff-abd0-fa65b05d8aa0" },
          { cells: ["dormant", "inactive, as if asleep", "active", "latent, inert, sluggish (synonyms)", "2022 (I)"], pyqExampleId: "c8c2aaa4-a282-477d-b7f7-15fe34b97fdd" },
          { cells: ["decay", "rotting, slow decline", "survival", "waste away, decomposition, spoil (synonyms)", "2020 (I)"], noteAmber: "The fullest opposite would be growth or flourishing; of these options only survival runs against decline.", pyqExampleId: "3623d698-3bd0-4612-b9ee-158fbaa3d1b5" },
          { cells: ["deceased", "dead", "alive", "dead (synonym), injured, survived", "2021 (I)"], pyqExampleId: "c66abfe9-4537-40d4-a5df-b7f3b478acdd" },
          { cells: ["invincible", "impossible to defeat", "vulnerable", "impregnable, unbeatable, insurmountable (synonyms)", "2023 (II)"], pyqExampleId: "a6c5c624-aa58-4872-aedd-ab64c2594223" },
          { cells: ["vulnerable", "open to harm or pressure", "resilient", "weak, unguarded, exposed (synonyms)", "2018 (I)"], pyqExampleId: "ee9271c5-b935-4b2a-837f-9b3209086e85" },
        ],
        caption: "Vulnerable appears on both sides: it was the answer for invincible and the word tested against resilient.",
      },
      pyqExampleId: "c8c2aaa4-a282-477d-b7f7-15fe34b97fdd",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. After lunch the class felt \\(\\underline{\\text{lethargic}}\\). (a) sluggish (b) listless (c) energetic (d) drowsy",
        steps: [
          "Meaning: 'lethargic' means slow and without energy.",
          "Sluggish, listless and drowsy mean the same: strike them.",
          "Energetic (full of energy) is the opposite.",
        ],
        answer: "(c) energetic",
      },
      practiceSet: [
        { prompt: "Opposite of 'inert'?", answer: "lively" },
        { prompt: "Opposite of the noun 'inertia'?", answer: "activity", method: "A noun for a noun." },
        { prompt: "Opposite of 'invincible'?", answer: "vulnerable" },
        { prompt: "Opposite of 'deceased'?", answer: "alive" },
      ],
      traps: [
        {
          title: "Hidden is not the same as active",
          body:
            "'Latent' means present but not yet showing, like a talent no one has seen. It is close to 'dormant', not its opposite. Strike it with the other still words.",
        },
      ],
    },

    // C2 — lasting and passing
    {
      kind: "reference" as const,
      slug: "cdsenant-time",
      name: "Lasting and passing",
      intuition:
        "Does it go on and on, or does it come and go? Does it stay in one place, or keep moving? Is it old or new? Each pair here is a line through time.",
      definition:
        "- **Goes on:** incessant (never stopping), perpetual (never ending), ceaseless, continual, eternal.\n" +
        "- **Comes and goes:** sporadic (now and then), transitory (short-lived), intermittent.\n" +
        "- **Old against new:** archaic, antiquated, outmoded against modern.\n" +
        "- **Moving against staying:** itinerant, nomadic, roving against settled.",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["incessant", "never stopping", "sporadic", "persistent, continual, ceaseless (synonyms)", "2019 (II)"], pyqExampleId: "66c59eaf-adc0-49a5-b805-553ecee5f97a" },
          { cells: ["perpetual", "never ending", "transitory", "eternal, continuous, unceasing (synonyms)", "2026 (I)"], pyqExampleId: "0ae25864-52e7-4d7c-9a6c-9bd5c67916df" },
          { cells: ["archaic", "very old, out of date", "modern", "antiquated, outmoded, beyond the times (synonyms)", "2020 (II)"], pyqExampleId: "6869d2ab-a98c-46fb-9c67-d17d47bcc7ee" },
          { cells: ["itinerant", "travelling from place to place", "settled", "vagrant, roving, nomadic (synonyms)", "2023 (I)"], pyqExampleId: "d9c622be-788d-4a78-a84f-7d94cdde2d70" },
        ],
        caption: "Continual, ceaseless, continuous and unceasing were all offered as synonyms to strike.",
      },
      pyqExampleId: "66c59eaf-adc0-49a5-b805-553ecee5f97a",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The village has a \\(\\underline{\\text{permanent}}\\) water supply. (a) lasting (b) enduring (c) temporary (d) stable",
        steps: [
          "Meaning: 'permanent' means lasting for ever.",
          "Lasting, enduring and stable point the same way: strike them.",
          "Temporary (for a short time) is the opposite.",
        ],
        answer: "(c) temporary",
      },
      practiceSet: [
        { prompt: "Opposite of 'perpetual'?", answer: "transitory" },
        { prompt: "Opposite of 'archaic'?", answer: "modern" },
        { prompt: "Opposite of 'itinerant'?", answer: "settled" },
      ],
      traps: [
        {
          title: "Continual and continuous are on the same side",
          body:
            "'Continual' (happening again and again) and 'continuous' (without a break) differ slightly, but both mean 'going on'. For a never-ending word, both are synonyms. The opposite is a 'now and then' word such as 'sporadic' or a 'short-lived' word such as 'transitory'.",
        },
      ],
    },

    // C3 — starting, growing, stopping
    {
      kind: "reference" as const,
      slug: "cdsenant-growth",
      name: "Starting, growing, stopping",
      intuition:
        "Helping something begin and grow, against holding it back or ending it. The tested words are usually verbs, so the answer is a verb in the same tense.",
      definition:
        "- **Start and help grow:** usher in (bring in), originate (begin), foster and cultivate (encourage growth), perpetuate (keep going), support.\n" +
        "- **Hold back or end:** obstruct, suppress, constrain and restrict (hold back), culminate (reach the end), cease (stop).",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["ushered in", "started, brought in", "obstructed", "led, conducted, directed", "2023 (II)"], pyqExampleId: "9cff9f27-c49a-4476-8441-3512d322a261" },
          { cells: ["fostered", "encouraged the growth of", "suppressed", "cultivated, endorsed, incubated (synonyms)", "2023 (II)"], pyqExampleId: "143b9ebd-3d52-497e-b49c-b327bde61f40" },
          { cells: ["constrain", "restrict, hold back", "support", "restrict (synonym), oblige, pressure", "2019 (II)"], pyqExampleId: "b9a060e4-b4b5-43d0-9c8e-7e1e2ab9b52b" },
          { cells: ["originates", "begins, starts from", "culminates", "emanates, initiates, inaugurates (the 'beginning' idea)", "2021 (II)"], pyqExampleId: "43ecdc7c-2d7f-4af1-8463-6e2f1ecb7ecd" },
          { cells: ["perpetuate", "keep going, make last", "cease", "conserve, sustain, maintain (synonyms)", "2023 (I)"], pyqExampleId: "2f14908f-f3d1-4485-b6ca-89e4e5bbe84f" },
        ],
        caption: "Culminate is the opposite of originate in the sense of a beginning and an end, not of good and bad.",
      },
      pyqExampleId: "143b9ebd-3d52-497e-b49c-b327bde61f40",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The new law will \\(\\underline{\\text{hinder}}\\) trade between the states. (a) obstruct (b) hamper (c) promote (d) impede",
        steps: [
          "Meaning: 'hinder' means to hold back.",
          "Obstruct, hamper and impede mean the same: strike them.",
          "Promote (help to grow) is the opposite.",
        ],
        answer: "(c) promote",
      },
      practiceSet: [
        { prompt: "Opposite of 'originates'?", answer: "culminates" },
        { prompt: "Opposite of 'perpetuate'?", answer: "cease" },
        { prompt: "Opposite of 'constrain'? (a) oblige (b) pressure (c) restrict (d) support", answer: "(d) support", method: "Restrict is a synonym." },
        { prompt: "Opposite of 'ushered in'?", answer: "obstructed" },
      ],
      traps: [
        {
          title: "Every 'beginning' word is on the same side",
          body:
            "For 'originates', the options 'emanates', 'initiates' and 'inaugurates' all speak of starting. They are the lookalikes. Only 'culminates' (reaches its end) points the other way.",
        },
      ],
    },

    // C4 — mixing and spreading
    {
      kind: "reference" as const,
      slug: "cdsenant-mixing",
      name: "Mixing and spreading",
      intuition:
        "Putting things together against pulling them apart, and spreading something out against gathering it in. Think of a kitchen: you whisk eggs and milk together, or you separate the yolk from the white.",
      definition:
        "- **Together:** blend, fusion, mingle, coalesce, amalgamate, join, bond.\n" +
        "- **Apart:** separate, separation.\n" +
        "- **Spread out:** diffuse, scatter, disperse, strew.\n" +
        "- **Gather in:** concentrate.",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["blend", "mix together", "separate", "mingle, coalesce, amalgamate (synonyms)", "2023 (I)"], pyqExampleId: "e4b0c2da-95d3-40ca-8375-e6f3c1c1c543" },
          { cells: ["fusion", "joining into one", "separation", "joining, bonding, blending (synonyms)", "2023 (I)"], pyqExampleId: "d0021256-98d5-4a9d-9da0-5177cfe14ab8" },
          { cells: ["diffuse", "spread out, scatter", "concentrate", "scatter, disperse, strew (synonyms)", "2020 (II)"], noteAmber: "The sentence really wants defuse (calm tension); the word tested is diffuse, spread out, whose opposite is concentrate.", pyqExampleId: "015d878d-ad56-41de-b241-1f164ea74e66" },
        ],
        caption: "The verb takes 'separate' and the noun takes 'separation': match the form.",
      },
      pyqExampleId: "e4b0c2da-95d3-40ca-8375-e6f3c1c1c543",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The two companies decided to \\(\\underline{\\text{merge}}\\). (a) unite (b) combine (c) split (d) consolidate",
        steps: [
          "Meaning: 'merge' means to join into one.",
          "Unite, combine and consolidate mean the same: strike them.",
          "Split (break into parts) is the opposite.",
        ],
        answer: "(c) split",
      },
      practiceSet: [
        { prompt: "Opposite of the noun 'fusion'?", answer: "separation" },
        { prompt: "Opposite of 'diffuse' (spread out)?", answer: "concentrate" },
        { prompt: "Opposite of 'disperse' (a crowd)?", answer: "gather (or assemble)" },
      ],
      traps: [
        {
          title: "Diffuse is not defuse",
          body:
            "'Defuse' means to calm a tense situation (or remove a bomb's fuse). 'Diffuse' means to spread out. Writers often confuse them, but the tested word is the one printed. Its opposite is 'concentrate', not an 'excite' word.",
        },
      ],
    },
  ],
};
