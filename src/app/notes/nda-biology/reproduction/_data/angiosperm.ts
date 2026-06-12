import type { SubtopicNote } from "@/app/notes/_types";

export const REPRO_ANGIOSPERM_NOTE: SubtopicNote = {
  subtopicName: "Angiosperm Reproduction — Pollination and Fertilization",
  title: "Angiosperm Reproduction — Flower to Seed",
  oneLineDefinition:
    "In flowering plants a pollen grain lands on the stigma, grows a tube down the style into the ovary, and delivers two male gametes — one fertilises the egg (→ diploid zygote → embryo → seed) and the other fuses with the polar nuclei (→ triploid endosperm), while the ovary itself becomes the fruit.",
  whyItMatters:
    "This is the heaviest subtopic of the chapter — 7 PYQs across 2020–2023, mostly EASY/MODERATE. " +
    "Two shapes dominate: getting a SEQUENCE in order (pollen-tube pathway; egg → zygote → embryo → seed) and the PLOIDY of double fertilisation (the 2n + n = 3n endosperm trick). " +
    "Learn the flower-part-to-product table (ovary → fruit, ovule → seed) and the double-fertilisation diagram and most of these are free marks.",
  concepts: [
    // Foundation + spatial diagram — flower structure (covers 2c5f4335 unisexual/papaya)
    {
      kind: "formula" as const,
      slug: "repro-flower-structure-and-types",
      name: "Flower structure and bisexual vs unisexual flowers",
      visualizationSlug: "repro-flower-structure",
      intuition:
        "A flower is the plant's reproductive organ. The male part is the **stamen** (anther + filament), which makes pollen. The female part is the **carpel / pistil** (the gynoecium), made of stigma + style + ovary. " +
        "If a flower has BOTH male and female parts it is bisexual; if it has only one it is unisexual. Knowing which named plants are unisexual is a recall favourite.",
      definition:
        "The reproductive parts of a flower:\n" +
        "- **Stamen** (male) = **anther** (makes pollen) + **filament** (stalk). All the stamens together = the androecium.\n" +
        "- **Carpel / pistil** (female) = **stigma** (catches pollen) + **style** (the tube) + **ovary** (holds ovules). All the carpels together = the gynoecium.\n" +
        "Flower types by sex:\n" +
        "- **Bisexual (perfect)** flower — has both stamen and carpel. Examples: **hibiscus, mustard, sunflower**.\n" +
        "- **Unisexual (imperfect)** flower — has only stamen OR only carpel. Example: **papaya** (which is dioecious — male and female flowers on separate plants).",
      authoredExample: {
        prompt:
          "From maize, hibiscus, and papaya, which plant bears unisexual flowers, and which floral part — male or female — catches the pollen?",
        steps: [
          "A unisexual flower has only one sex. Hibiscus is bisexual; among these, papaya bears unisexual flowers.",
          "Pollen is caught by the stigma — the top of the female carpel.",
          "(Maize is also unisexual, but among the given recall options papaya is the standard answer.)",
        ],
        answer:
          "Papaya bears unisexual flowers; the stigma (female part) catches the pollen.",
      },
      practiceSet: [
        {
          prompt: "Name the male part of a flower and what it makes.",
          answer: "Stamen (anther + filament); the anther makes pollen",
        },
        {
          prompt: "What three parts make up the carpel / pistil?",
          answer: "Stigma, style, ovary",
        },
        {
          prompt: "Give one plant with unisexual flowers.",
          answer: "Papaya",
          method: "dioecious — male and female flowers on separate plants",
        },
        {
          prompt: "Are hibiscus, mustard, and sunflower flowers bisexual or unisexual?",
          answer: "Bisexual",
        },
      ],
      pyqExampleId: "2c5f4335-3671-49f3-a127-ee8dff68838b",
      traps: [
        {
          title: "Papaya is unisexual; hibiscus / mustard / sunflower are bisexual",
          body:
            "The bank pairs papaya (unisexual) against three common bisexual flowers. Remember **papaya = unisexual (dioecious)**; the showy garden flowers (hibiscus, mustard, sunflower) carry both sexes.",
        },
      ],
    },

    // pollen-tube pathway — d68b4640
    {
      kind: "formula" as const,
      slug: "repro-pollen-tube-pathway",
      name: "The pollen-tube pathway — stigma, style, ovary",
      intuition:
        "After pollination the pollen grain does not just sit on the stigma — it grows a tube that tunnels down to reach the ovule. The route is top-to-bottom through the female carpel: it lands on the **stigma**, grows down the **style**, and enters the **ovary** where the ovule waits. " +
        "Get the order right — stigma, style, ovary — and the sequence questions answer themselves.",
      definition:
        "The journey of the germinating pollen tube through the gynoecium, in order:\n" +
        "1. **Stigma** — the sticky top surface where pollen lands and germinates.\n" +
        "2. **Style** — the slender tube the pollen tube grows down through.\n" +
        "3. **Ovary** — the swollen base holding the ovule(s), where the male gametes are delivered.\n" +
        "Note: **pistil / gynoecium** is the WHOLE female structure (stigma + style + ovary together) — it is not a separate fourth step, so a sequence that lists 'pistil' as a step alongside stigma/style/ovary is wrong.",
      authoredExample: {
        prompt:
          "Put these flower parts in the order a pollen tube passes through them on its way to the ovule: ovary, stigma, style.",
        steps: [
          "Pollen first lands on the sticky stigma at the top.",
          "It then grows a tube down through the style.",
          "The tube enters the ovary, where the ovule (and egg) wait.",
        ],
        answer: "Stigma → style → ovary.",
      },
      practiceSet: [
        {
          prompt: "Give the pollen-tube pathway in order.",
          answer: "Stigma → style → ovary",
        },
        {
          prompt: "Where does a pollen grain first land and germinate?",
          answer: "Stigma",
        },
        {
          prompt: "Is 'pistil' a separate step in the pollen-tube pathway?",
          answer: "No",
          method: "pistil = the whole carpel (stigma + style + ovary together)",
        },
      ],
      pyqExampleId: "d68b4640-f8f4-48ad-8d61-27b0154694e9",
      traps: [
        {
          title: "Stigma comes first — not style, not pistil",
          body:
            "Distractors begin with 'Style' or 'Pistil'. Pollen always lands on the **stigma** first. And 'pistil' is the whole female organ, not a stop on the route — any option listing pistil as a step is a trap.",
        },
      ],
    },

    // double fertilization — ce9f727f — spatial diagram (2n + n = 3n)
    {
      kind: "formula" as const,
      slug: "repro-double-fertilisation",
      name: "Double fertilisation and the 2n + n = 3n endosperm",
      visualizationSlug: "repro-double-fertilisation",
      intuition:
        "Angiosperms do something unique: each pollen grain delivers TWO male gametes, and BOTH fuse. One fuses with the egg to make the zygote (which becomes the embryo). The other fuses with the two polar nuclei (the diploid secondary nucleus) to make the food-storing endosperm. " +
        "Two fusions = 'double fertilisation'. The ploidy is the trick: egg (n) + sperm (n) = **2n zygote**; secondary nucleus (2n) + sperm (n) = **3n endosperm**.",
      definition:
        "**Double fertilisation** — the defining feature of angiosperm sexual reproduction. One pollen tube delivers **two male gametes**, both of which fuse:\n" +
        "- **Syngamy:** one male gamete (n) + the **egg cell** (n) → **diploid (2n) zygote** → embryo → new plant.\n" +
        "- **Triple fusion:** the other male gamete (n) + the **diploid secondary nucleus** (2n, formed from the two polar nuclei) → **triploid (3n) endosperm**, the nutritive tissue that feeds the embryo.\n" +
        "Because two distinct fusion events occur, it is called double fertilisation. The 3n endosperm is the giveaway number the bank tests.",
      authoredExample: {
        prompt:
          "A pollen grain releases two male gametes inside the embryo sac. State what each gamete fuses with and the ploidy (n / 2n / 3n) of each product.",
        steps: [
          "First gamete (n) fuses with the egg (n): n + n = 2n → the zygote.",
          "Second gamete (n) fuses with the secondary nucleus (2n, from two polar nuclei): n + 2n = 3n → the endosperm.",
          "Two fusions in one event = double fertilisation.",
        ],
        answer:
          "Gamete 1 + egg → 2n zygote; gamete 2 + diploid secondary nucleus → 3n (triploid) endosperm.",
      },
      practiceSet: [
        {
          prompt: "In double fertilisation, what do the two male gametes fuse with?",
          answer: "One fuses with the egg; the other with the diploid secondary nucleus (polar nuclei)",
        },
        {
          prompt: "What is the ploidy of the endosperm?",
          answer: "Triploid (3n)",
          method: "male gamete (n) + secondary nucleus (2n)",
        },
        {
          prompt: "What is the ploidy of the zygote?",
          answer: "Diploid (2n)",
          method: "egg (n) + male gamete (n)",
        },
        {
          prompt: "Why is it called 'double' fertilisation?",
          answer: "Both male gametes fuse — two fusion events (syngamy + triple fusion)",
        },
      ],
      pyqExampleId: "ce9f727f-62a6-42b5-bf3a-835e4859ac6e",
      traps: [
        {
          title: "Both gametes fuse — the second does NOT degenerate",
          body:
            "A distractor says one gamete fuses with the egg and 'the other eventually degenerates'. Wrong — that is the rule in animals, not angiosperms. In angiosperms BOTH gametes fuse: one with the egg, one with the secondary nucleus to make the 3n endosperm.",
        },
        {
          title: "Endosperm is 3n, zygote is 2n — don't swap them",
          body:
            "Egg + sperm = 2n zygote. Secondary nucleus (already 2n) + sperm = 3n endosperm. The triploid number belongs to the **endosperm**, the tissue that feeds the embryo.",
        },
      ],
    },

    // post-fertilisation fates — eedfb923 (ovary→fruit, ovule→seed)
    {
      kind: "reference" as const,
      slug: "repro-post-fertilisation-fates",
      name: "What each flower part becomes after fertilisation",
      intuition:
        "After fertilisation the flower transforms into fruit and seed, and the NDA tests exactly which part becomes which. The two facts that carry the marks: the **ovary becomes the fruit** and the **ovule becomes the seed**. " +
        "Inside the seed, the zygote becomes the embryo. Memorise the table and the 'ovary and ovule respectively' questions are automatic.",
      definition:
        "The fate of each floral part after fertilisation. The two highest-yield rows are **ovary → fruit** and **ovule → seed** — the bank asks them as 'fruit and seed are produced by ___, respectively'.",
      table: {
        columns: ["Flower part (before)", "Becomes (after fertilisation)", "Ploidy / note"],
        rows: [
          {
            cells: ["**Ovary**", "**Fruit**", "The whole ovary wall ripens into the fruit"],
            pyqExampleId: "eedfb923-0eb9-467e-a199-f31a620974cb",
          },
          {
            cells: ["**Ovule**", "**Seed**", "Each fertilised ovule becomes one seed"],
            noteAmber: "Ovary → fruit and ovule → seed are the two facts the bank tests most.",
          },
          { cells: ["**Zygote** (2n)", "**Embryo**", "The embryo lies inside the seed"] },
          { cells: ["**Secondary nucleus** (2n)", "**Endosperm** (3n)", "Nutritive tissue feeding the embryo"] },
          { cells: ["**Egg cell** (n)", "**Zygote** (2n)", "After fusing with a male gamete"] },
        ],
        caption:
          "Remember the pairing 'ovAry → fruit, ovUle → seed'. Mixing them up is the single commonest error.",
      },
      selfCheckExample: {
        prompt:
          "After fertilisation in a flowering plant, the fruit and the seed are produced respectively by which two structures?",
        steps: [
          "The fruit develops from the ovary (its wall ripens).",
          "The seed develops from the ovule.",
          "So fruit ← ovary and seed ← ovule, in that order.",
        ],
        answer: "Fruit from the ovary; seed from the ovule (ovary and ovule, respectively).",
      },
      practiceSet: [
        { prompt: "The ovary develops into the ___.", answer: "Fruit" },
        { prompt: "The ovule develops into the ___.", answer: "Seed" },
        { prompt: "The zygote develops into the ___.", answer: "Embryo", method: "inside the seed" },
        { prompt: "The fruit and seed are produced by which two parts, respectively?", answer: "Ovary and ovule" },
      ],
      traps: [
        {
          title: "Ovary → fruit, ovule → seed — never the reverse",
          body:
            "The trap option swaps them ('ovule and ovary, respectively') or claims 'no ovule required'. Both are wrong: the **ovary becomes the fruit** and the **ovule becomes the seed**. Both are needed.",
        },
      ],
    },

    // sequence egg→zygote→embryo→seed — d9d791ae + full mapping a49e6f01
    {
      kind: "formula" as const,
      slug: "repro-fertilisation-to-seed-sequence",
      name: "The fertilisation-to-seed sequence: egg → zygote → embryo → seed",
      intuition:
        "Sexual reproduction in angiosperms runs as a fixed chain. The egg is fertilised to become the zygote; the zygote divides to form the embryo; the embryo matures inside the seed. In parallel, the ovule becomes the seed and the ovary becomes the fruit. " +
        "Most 'correct sequence' questions just want this chain in the right order — never an out-of-order option like 'embryo before zygote'.",
      definition:
        "The correct sequence of events after fertilisation, and the parallel part-to-product mappings:\n" +
        "- **Egg → zygote** (fertilisation: egg fuses with a male gamete).\n" +
        "- **Zygote → embryo** (the zygote divides and develops).\n" +
        "- **Embryo → seed** (the embryo matures within the seed).\n" +
        "Run in parallel: **ovule → seed**, and **ovary → fruit**. A correct combination keeps every arrow pointing the natural way (egg before zygote before embryo); reversed arrows like 'zygote → egg' or 'embryo → egg' are the wrong options.",
      authoredExample: {
        prompt:
          "A student writes four 'becomes' arrows for an angiosperm: (i) egg → zygote, (ii) zygote → embryo, (iii) ovule → seed, (iv) ovary → egg. Three are correct and one is wrong — find and fix the wrong one.",
        steps: [
          "(i) egg → zygote is correct (fertilisation).",
          "(ii) zygote → embryo is correct (the zygote develops).",
          "(iii) ovule → seed is correct.",
          "(iv) ovary → egg is WRONG — the ovary becomes the FRUIT, not the egg. The egg is inside the ovule, made before fertilisation.",
        ],
        answer: "The wrong arrow is (iv): it should read ovary → fruit, not ovary → egg.",
      },
      practiceSet: [
        {
          prompt: "Give the sequence from egg to seed in an angiosperm.",
          answer: "Egg → zygote → embryo → seed",
        },
        {
          prompt: "The egg is fertilised to form the ___.",
          answer: "Zygote",
        },
        {
          prompt: "The zygote develops into the ___, which matures within the seed.",
          answer: "Embryo",
        },
        {
          prompt: "While the embryo forms the seed, the ovary forms the ___.",
          answer: "Fruit",
        },
      ],
      pyqExampleId: "d9d791ae-ac6c-47f3-b05e-5b09ab1f5719",
      traps: [
        {
          title: "Arrows point forward — embryo never comes before zygote",
          body:
            "Wrong options reverse a step ('egg → embryo → zygote' or 'embryo → egg'). The chain is strictly **egg → zygote → embryo → seed**. Check each arrow points to the LATER stage, not an earlier one.",
        },
      ],
    },

    // misfiled human-reproductive-anatomy question 1f453564 (cervix not male)
    {
      kind: "reference" as const,
      slug: "repro-male-reproductive-parts",
      name: "Parts of the human male reproductive system",
      intuition:
        "One bank question in this subtopic crosses over into human reproduction: it asks which structure is NOT part of the male reproductive system. The trap is the **cervix** — it belongs to the FEMALE system (the neck of the uterus). The genuine male parts are the testes, vas deferens, seminal vesicle, prostate, and the urethra. " +
        "Learn the short male list and you can spot the female intruder instantly.",
      definition:
        "Components of the human **male** reproductive system, and the female part the bank slips in as a distractor:\n" +
        "- **Testes** — produce sperm and testosterone.\n" +
        "- **Vas deferens** — the duct that carries sperm from the testis.\n" +
        "- **Seminal vesicle** — a gland adding fluid to semen.\n" +
        "- **Prostate gland** — adds further fluid to semen.\n" +
        "- **Urethra** — the shared duct that carries semen (and urine) out.\n" +
        "**Cervix is NOT male** — it is the lower neck of the **uterus** in the female system.",
      table: {
        columns: ["Structure", "System", "Role"],
        rows: [
          { cells: ["**Testis**", "Male", "Makes sperm and testosterone"] },
          { cells: ["**Vas deferens**", "Male", "Carries sperm from the testis"] },
          { cells: ["**Seminal vesicle**", "Male", "Gland; adds fluid to semen"] },
          { cells: ["**Urethra**", "Male", "Carries semen (and urine) out"] },
          {
            cells: ["**Cervix**", "Female", "Neck of the uterus — NOT a male part"],
            noteAmber: "NDA 2020 — cervix is the odd one out: it belongs to the female reproductive system.",
            pyqExampleId: "1f453564-6989-4ab0-9f13-b477e465bcf9",
          },
        ],
        caption:
          "The male duct chain: testis → vas deferens → (seminal vesicle + prostate add fluid) → urethra. The cervix is female.",
      },
      selfCheckExample: {
        prompt:
          "From cervix, urethra, seminal vesicle, and vas deferens, which one is NOT part of the human male reproductive system?",
        steps: [
          "Urethra, seminal vesicle, and vas deferens are all male reproductive structures.",
          "The cervix is the neck of the uterus — part of the female system.",
          "So the odd one out is the cervix.",
        ],
        answer: "Cervix — it is a female structure (the neck of the uterus).",
      },
      practiceSet: [
        { prompt: "Is the cervix a male or female reproductive part?", answer: "Female", method: "neck of the uterus" },
        { prompt: "Which duct carries sperm from the testis?", answer: "Vas deferens" },
        { prompt: "Name the shared male duct that carries both semen and urine.", answer: "Urethra" },
        { prompt: "Which gland adds fluid to semen — seminal vesicle or cervix?", answer: "Seminal vesicle" },
      ],
      traps: [
        {
          title: "Cervix is female — the classic 'odd one out'",
          body:
            "When asked which is NOT a male part, the answer is the **cervix** (a female structure). Urethra, seminal vesicle, and vas deferens are all genuine male reproductive components.",
        },
      ],
    },
  ],
};
