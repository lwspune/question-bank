import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CE_STATIC_NOTE: SubtopicNote = {
  subtopicName: "Static Electricity",
  title: "Static Electricity",
  oneLineDefinition:
    "Rubbing two suitable insulators moves electrons from one to the other, leaving equal and opposite charges at rest on them; like charges repel, unlike charges attract, and a charged body pulls a neutral one by induction.",
  whyItMatters:
    "Seven questions in the bank, two EASY and five MODERATE. Three ask what rubbing does (which charges form, what an atom becomes when it gains or loses electrons, what the air does to the charge), two explain lightning, one explains why a trickle of water bends towards a charged comb, and one asks what the force between two charges depends on.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9cest-charging",
      name: "Charging by rubbing",
      intuition:
        "Every object is full of tiny negative electrons and positive charges that balance each other. Rub a plastic comb in dry hair and some electrons are wiped off the hair onto the comb. Now the comb has extra electrons (negative) and the hair is short of them (positive). Nothing new was made: electrons only changed places.",
      definition:
        "- Rubbing two suitable substances moves **electrons** from one to the other. Only electrons move; the positive charges stay in place.\n" +
        "- The body that **gains** electrons becomes **negative**; the body that **loses** them becomes **positive**. So the two bodies get **unlike** charges of equal size.\n" +
        "- Charge is **never created or destroyed**, only **transferred** from one body to another.\n" +
        "- The same rule holds for an atom: an atom that gains electrons becomes negative, one that gives away electrons becomes positive.\n" +
        "- Charge that stays at rest on a body is **static electricity**. It builds up on **insulators** (plastic, glass, wool, silk, dry hair), which do not let it flow away.\n" +
        "- Static charge does **not last long**: it slowly leaks away, and faster in **moist air**, so these experiments work best on a dry day.",
      table: {
        columns: ["Rubbed together", "Becomes negative (gains electrons)", "Becomes positive (loses electrons)"],
        rows: [
          { cells: ["Plastic comb and dry hair", "Comb", "Hair"] },
          { cells: ["Glass rod and silk cloth", "Silk", "Glass rod"] },
          { cells: ["Ebonite rod and woollen cloth", "Ebonite rod", "Wool"] },
          { cells: ["Balloon and dry hair", "Balloon", "Hair"] },
        ],
        caption: "In every pair, one body gains exactly the electrons the other loses.",
      },
      selfCheckExample: {
        prompt: "A glass rod rubbed with a silk cloth becomes positively charged. What has moved, and in which direction?",
        steps: [
          "Only electrons move when two bodies are rubbed.",
          "The glass rod is positive, so it has lost electrons; the silk has gained them.",
        ],
        answer: "Electrons have moved from the glass rod to the silk cloth.",
      },
      practiceSet: [
        { prompt: "An atom loses two electrons. What kind of charge does it now carry?", answer: "A positive charge" },
        { prompt: "Why do experiments on charging by rubbing work poorly on a humid day?", answer: "The moisture in the air lets the charge leak away quickly" },
        { prompt: "When a plastic comb is rubbed in dry hair, what charge does the hair get?", answer: "A positive charge, because it loses electrons to the comb" },
        { prompt: "Is electric charge created when two objects are rubbed together?", answer: "No: charge is only transferred from one object to the other" },
      ],
      pyqExampleId: "f334e5e5-6569-42b9-9f49-47ddd2ba21e2",
      traps: [
        {
          title: "Thinking positive charges move",
          body: "When two bodies are rubbed, only electrons move. A body becomes positive because it has lost electrons, not because it has gained positive charge.",
        },
        {
          title: "Gaining electrons makes a body positive",
          body: "It is the other way round. Electrons are negative, so a body or atom that gains them becomes negative and one that loses them becomes positive.",
        },
        {
          title: "Saying the air has no effect on static charge",
          body: "Moist air helps the charge leak away. That is why a rubbed comb picks up paper well on a dry winter day and poorly in the rainy season.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9cest-induction",
      name: "Attraction, repulsion, induction and lightning",
      intuition:
        "Bring a charged comb near a bit of paper. The comb pushes the paper's own charges about: the opposite kind gathers on the near side and the same kind is pushed to the far side. The near side is closer, so its pull wins and the paper jumps up. A thundercloud does the same to the ground below it, on a giant scale.",
      definition:
        "- **Like** charges **repel**; **unlike** charges **attract**.\n" +
        "- **Induction**: a charged body brought near a neutral body makes the **opposite** charge gather on the **near** side and the same charge on the far side. So a charged body **attracts a neutral** one.\n" +
        "- A charged comb bends a thin stream of water towards it in this way: the charge like the comb's is pushed away and the opposite charge is pulled to the near side.\n" +
        "- The force between two charges is **larger when the charges are larger** and **smaller when they are farther apart**: doubling the distance makes it one quarter. It does **not** depend on their **mass**.\n" +
        "- **Lightning**: clouds become charged by **friction** with the air (static electricity). A charged cloud **induces** the opposite charge on the ground or on another cloud, and when the **unlike charges attract** strongly enough, the charge jumps across as a huge spark.\n" +
        "- A **lightning conductor** (a metal rod on a tall building, joined to the earth) carries this charge safely into the ground.",
      table: {
        columns: ["Situation", "What happens", "Why"],
        rows: [
          { cells: ["Two bodies with like charges", "They repel", "Like charges repel"] },
          { cells: ["Two bodies with unlike charges", "They attract", "Unlike charges attract"] },
          { cells: ["Charged comb near bits of paper", "The paper is attracted", "Induction puts the opposite charge on the near side"] },
          { cells: ["Charged cloud above the ground", "Lightning strikes", "Induced unlike charge on the ground pulls the cloud's charge across"] },
          { cells: ["Distance between two charges doubled", "The force becomes one quarter", "The force falls as the square of the distance grows"] },
        ],
        caption: "Only repulsion proves that both bodies are charged: attraction can also mean one body is neutral.",
      },
      selfCheckExample: {
        prompt: "A positively charged glass rod is brought near small bits of paper that carry no charge. Why do the bits jump towards the rod?",
        steps: [
          "The rod induces negative charge on the near side of each bit and positive charge on the far side.",
          "The near, opposite charge is closer to the rod, so its attraction is stronger than the repulsion of the far side.",
        ],
        answer: "Induction gives each bit an opposite charge on its near side, and unlike charges attract.",
      },
      practiceSet: [
        { prompt: "Two charged balls hung by threads push each other apart. What can you say about their charges?", answer: "They carry the same kind of charge" },
        { prompt: "The distance between two charged particles is doubled. What happens to the force between them?", answer: "It becomes one quarter of what it was" },
        { prompt: "What is it called when a charged body makes the opposite charge appear on the near side of a neutral body?", answer: "Induction (electrostatic induction)" },
        { prompt: "What does a lightning conductor on a tall building do?", answer: "It carries the charge from lightning safely into the earth" },
      ],
      pyqExampleId: "072fbff3-0d50-4681-a482-9591cae5bde8",
      traps: [
        {
          title: "Taking attraction as proof that both bodies are charged",
          body: "A charged body attracts a neutral one too, by induction. Only repulsion shows for certain that both bodies are charged.",
        },
        {
          title: "Making the force between charges depend on mass",
          body: "The electric force depends on the size of the charges and the distance between them. The mass of the particles does not come into it.",
        },
        {
          title: "Explaining lightning by like charges repelling",
          body: "Lightning comes from unlike charges attracting: the cloud's charge induces the opposite charge below it, and the charge jumps across.",
        },
      ],
    },
  ],
};
