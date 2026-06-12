import type { SubtopicNote } from "@/app/notes/_types";

export const REPRO_ANIMAL_HUMAN_NOTE: SubtopicNote = {
  subtopicName: "Animal and Human Reproduction",
  title: "Animal and Human Reproduction — Cycles and Contraception",
  oneLineDefinition:
    "Non-primate female mammals run an oestrus cycle while primates (including humans) run a menstrual cycle; oral contraceptive pills prevent pregnancy by using hormones to inhibit ovulation (the release of the egg).",
  whyItMatters:
    "Two recent MODERATE PYQs (2022, 2026) on applied human/animal reproduction. " +
    "Both reward understanding a mechanism rather than a single fact: how a contraceptive pill actually works (it stops ovulation, it does not kill anything), and the oestrus-vs-menstrual distinction that separates primates from other mammals.",
  concepts: [
    // oral contraceptive pills — 81ebd1fb
    {
      kind: "formula" as const,
      slug: "repro-oral-contraceptive-pills",
      name: "How oral contraceptive pills work — inhibiting ovulation",
      intuition:
        "An oral contraceptive pill does not attack the egg, sperm, or zygote. It works one step earlier: it carries hormones (oestrogen/progesterone-like) that trick the body into NOT releasing an egg in the first place. No ovulation means no egg for sperm to meet, so no fertilisation. " +
        "The mechanism is prevention by suppression, not destruction.",
      definition:
        "Oral contraceptive pills prevent pregnancy by **inhibiting ovulation — the release of the egg from the ovary**.\n" +
        "- The pills contain hormones that **suppress FSH and LH** (the pituitary hormones that normally trigger the egg's release).\n" +
        "- Without the LH surge there is **no ovulation**, so no egg is available for fertilisation.\n" +
        "- They do NOT 'kill' the egg, sperm, or zygote — they act before any of those would meet.",
      authoredExample: {
        prompt:
          "A student claims oral contraceptive pills work by killing the sperm. Explain the actual mechanism.",
        steps: [
          "The pills contain hormones that suppress the pituitary hormones FSH and LH.",
          "Without the LH surge, the ovary does not release an egg — ovulation is inhibited.",
          "With no egg released, there is nothing for sperm to fertilise.",
          "So they prevent pregnancy by stopping ovulation, not by killing sperm.",
        ],
        answer: "Oral contraceptive pills inhibit ovulation (the release of the egg) — they do not kill the egg, sperm, or zygote.",
      },
      practiceSet: [
        {
          prompt: "What is the mechanism of action of oral contraceptive pills?",
          answer: "They inhibit ovulation (release of the egg)",
        },
        {
          prompt: "Which pituitary hormones do contraceptive pills suppress?",
          answer: "FSH and LH",
        },
        {
          prompt: "Do contraceptive pills kill the sperm or egg?",
          answer: "No",
          method: "they prevent the egg from being released in the first place",
        },
      ],
      pyqExampleId: "81ebd1fb-ce41-4175-8d3b-ee4768ec333b",
      traps: [
        {
          title: "They inhibit ovulation — they don't 'kill' anything",
          body:
            "Distractors say the pill kills the egg, sperm, or zygote. All wrong — the pill's hormones **prevent the egg from being released** (inhibit ovulation), acting before fertilisation could ever happen.",
        },
      ],
    },

    // oestrus cycle not in monkeys — d27cb02c
    {
      kind: "formula" as const,
      slug: "repro-oestrus-vs-menstrual-cycle",
      name: "Oestrus cycle vs menstrual cycle — primates are different",
      intuition:
        "Female mammals cycle their fertility, but in two different styles. Non-primate mammals (cows, rats, tigers, dogs) have an **oestrus cycle** — they come into 'heat' at fertile times and reabsorb the uterine lining if there is no pregnancy. Primates (monkeys, apes, humans) instead have a **menstrual cycle** — the lining is shed as menstrual bleeding. " +
        "So if a question asks where the oestrus cycle is NOT seen, the answer is the primate.",
      definition:
        "Two patterns of the female reproductive cycle in mammals:\n" +
        "- **Oestrus cycle** — seen in **non-primate mammals** (cows, rats, tigers, dogs). The female is sexually receptive only during 'heat' (oestrus); if no pregnancy, the uterine lining is reabsorbed (no bleeding).\n" +
        "- **Menstrual cycle** — seen in **primates** (monkeys, apes, humans). If no pregnancy, the uterine lining is shed as menstrual flow.\n" +
        "So among a list of animals, the one with NO oestrus cycle is the **primate** (e.g. the monkey).",
      authoredExample: {
        prompt:
          "Among cow, monkey, rat, and tiger, which does NOT show an oestrus cycle, and what cycle does it have instead?",
        steps: [
          "Cow, rat, and tiger are non-primate mammals — all show an oestrus cycle.",
          "The monkey is a primate.",
          "Primates have a menstrual cycle, not an oestrus cycle.",
          "So the monkey is the one without an oestrus cycle.",
        ],
        answer: "The monkey — being a primate, it has a menstrual cycle, not an oestrus cycle.",
      },
      practiceSet: [
        {
          prompt: "Which group of mammals has a menstrual cycle instead of an oestrus cycle?",
          answer: "Primates (monkeys, apes, humans)",
        },
        {
          prompt: "Do cows, rats, and tigers show an oestrus or a menstrual cycle?",
          answer: "Oestrus cycle",
          method: "they are non-primate mammals",
        },
        {
          prompt: "In the oestrus cycle, what happens to the uterine lining if there is no pregnancy?",
          answer: "It is reabsorbed (no bleeding)",
          method: "unlike the menstrual cycle, where it is shed",
        },
      ],
      pyqExampleId: "d27cb02c-4b06-4e96-9b04-d78860718875",
      traps: [
        {
          title: "Primates have the MENSTRUAL cycle, not oestrus",
          body:
            "If asked which animal lacks an oestrus cycle, pick the **primate** (monkey). Non-primate mammals (cow, rat, tiger, dog) all have oestrus cycles; primates replace it with the menstrual cycle.",
        },
      ],
    },
  ],
};
