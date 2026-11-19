import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SU_COSMETICS_NOTE: SubtopicNote = {
  subtopicName: "Soaps, Cosmetics and Food Additives",
  title: "Soaps, Cosmetics and Food Additives",
  oneLineDefinition:
    "Hard water holds calcium and magnesium salts that spoil the lather of soap and is softened by washing soda or a zeolite bed; cosmetics and food colours each rely on a few named chemicals, some natural and some harmful.",
  whyItMatters:
    "The busiest page of the chapter: eleven questions, one EASY, six MODERATE and four HARD. Four are about hard water and soap (softening chemicals, the permutit tank, shikakai, soap bubbles in humid air), four about cosmetics (sunscreen, toothpaste fluoride, deodorants, henna) and three about food colours and flavours.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9suco-water",
      name: "Hard water, softening and soap",
      intuition:
        "Wash your hands with soap in well water and the soap makes a sticky scum instead of lather. The water is hard: it carries dissolved calcium and magnesium salts. Softening means removing those salts, either by making them settle out as solid carbonates or by swapping them for sodium in a zeolite bed.",
      definition:
        "- **Hard water** contains dissolved salts of **calcium and magnesium**. It does not lather easily with soap.\n" +
        "- **Temporary hardness** (from bicarbonates) is removed by **boiling** or by adding **slaked lime**. **Permanent hardness** (from chlorides and sulphates) is removed by **washing soda (soda ash)**.\n" +
        "- Washing soda turns the calcium and magnesium salts into **insoluble carbonates** (such as calcium carbonate) that settle. **Borax** and **ammonia** are also used with it to soften water.\n" +
        "- **Permutit method**: hard water flows up through a bed of **zeolite** (permutit), which takes the calcium and magnesium and gives sodium in their place. Soft water is drawn off. The zeolite is renewed with **sodium chloride** solution.\n" +
        "- **Soap** is the sodium salt of fatty acids made from oils or fats with caustic soda. **Shikakai** and **soapnut** clean because they contain **saponin**. A soap bubble lasts longer in **humid** air, where its water film dries slowly.",
      table: {
        columns: ["Method", "Removes", "How it works"],
        rows: [
          { cells: ["Boiling", "Temporary hardness", "Bicarbonates break down to insoluble carbonates that settle"] },
          { cells: ["Adding slaked lime", "Temporary hardness", "Calcium bicarbonate turns into calcium carbonate, which settles"] },
          { cells: ["Adding washing soda (soda ash)", "Permanent and temporary hardness", "Calcium and magnesium salts become insoluble carbonates"] },
          { cells: ["Permutit (zeolite)", "Permanent and temporary hardness", "Zeolite swaps calcium and magnesium for sodium; renewed with salt solution"] },
        ],
        caption: "Calcium carbonate is what settles out of hard water; it is never added to soften it.",
      },
      selfCheckExample: {
        prompt: "In a permutit water softener, what is the zeolite bed renewed with once it stops softening water, and why?",
        steps: ["The zeolite has given up its sodium and taken in calcium and magnesium.", "Strong sodium chloride solution puts sodium back into it."],
        answer: "Sodium chloride (common salt) solution, which restores the sodium in the zeolite",
      },
      practiceSet: [
        { prompt: "Which two metals' salts make water hard?", answer: "Calcium and magnesium" },
        { prompt: "Which kind of hardness of water can be removed simply by boiling?", answer: "Temporary hardness" },
        { prompt: "Which natural substance in shikakai and soapnut makes them clean like soap?", answer: "Saponin" },
        { prompt: "Will soap bubbles last longer in dry desert air or in humid coastal air?", answer: "In humid coastal air, because the bubble's water film dries more slowly" },
      ],
      pyqExampleId: "68daa512-ca3b-47f3-9d02-d9affdac34f6",
      traps: [
        {
          title: "Adding calcium carbonate to soften water",
          body: "Calcium carbonate is the insoluble solid that settles out when hard water is softened. Adding it would not remove any hardness.",
        },
        {
          title: "Thinking boiling removes all hardness",
          body: "Boiling removes only temporary hardness. Chlorides and sulphates of calcium and magnesium stay dissolved and need washing soda or a zeolite.",
        },
        {
          title: "Expecting bubbles to last in dry air",
          body: "Dry, hot air makes the thin water film of a bubble evaporate quickly, so bubbles burst sooner there.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9suco-cosmetics",
      name: "Chemicals in cosmetics",
      intuition:
        "Each cosmetic works because of one or two chemicals. A sunscreen carries white powders that bounce sunlight's ultraviolet rays away; a toothpaste carries fluoride that hardens the enamel. Knowing the working chemical of each product answers most of these questions.",
      definition:
        "- **Sunscreen**: **zinc oxide** and **titanium dioxide** reflect and absorb the harmful **ultraviolet** rays of sunlight.\n" +
        "- **Toothpaste**: a **fluoride** makes tooth enamel stronger and helps it **resist decay**. A mild **abrasive** powder removes dirt and polishes the teeth.\n" +
        "- **Deodorants** fight body odour. Antiperspirants among them also reduce sweating with **aluminium compounds** (such as aluminium chlorohydrate). **Parabens** and **triclosan** in some products raise health concerns.\n" +
        "- **Henna** (mehendi) leaves are a **natural, safe** colour for hair and skin.",
      table: {
        columns: ["Product", "Working substance", "What it does"],
        rows: [
          { cells: ["Sunscreen lotion", "Zinc oxide and titanium dioxide", "Reflect and absorb ultraviolet rays"] },
          { cells: ["Toothpaste", "A fluoride", "Strengthens enamel and resists decay"] },
          { cells: ["Toothpaste", "Mild abrasive powder", "Removes dirt and polishes"] },
          { cells: ["Antiperspirant deodorant", "Aluminium compounds", "Reduce sweating"] },
          { cells: ["Natural hair colour", "Henna leaves", "Colour hair safely"] },
        ],
        caption: "In toothpaste the fluoride protects; the abrasive cleans.",
      },
      selfCheckExample: {
        prompt: "In a toothpaste, which ingredient polishes the teeth and which one protects them from decay?",
        steps: ["Polishing and removing dirt is the job of the mild abrasive powder.", "The fluoride strengthens the enamel."],
        answer: "The abrasive polishes; the fluoride protects against decay.",
      },
      practiceSet: [
        { prompt: "Which harmful rays of sunlight does a sunscreen block?", answer: "Ultraviolet rays" },
        { prompt: "Name the two oxides used in sunscreen lotions.", answer: "Zinc oxide and titanium dioxide" },
        { prompt: "Is colouring hair with henna leaves harmful to health?", answer: "No: henna is a natural, safe colour" },
        { prompt: "Which kind of compounds in antiperspirants reduce sweating?", answer: "Aluminium compounds" },
      ],
      pyqExampleId: "6beed0da-a636-45f1-a816-17b0d6d048a8",
      traps: [
        {
          title: "Giving the fluoride the job of cleaning",
          body: "Fluoride strengthens enamel against decay. Dirt is removed and teeth are polished by the abrasive powder.",
        },
        {
          title: "Putting magnesium oxide or oil in sunscreen",
          body: "The two sunscreen oxides are zinc oxide and titanium dioxide.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9suco-food",
      name: "Food colours and flavours",
      intuition:
        "Beetroot is red, carrots are orange and jamun is purple because of natural colouring substances. Factories also make synthetic dyes. The papers ask which colours are natural, which harmful metals can hide in cheap colours, and what gives smoked food its flavour.",
      definition:
        "- **Natural colours**: **betanin** (beetroot, red), **anthocyanin** (purple and red fruits and flowers), **beta-carotene** (carrot, orange), **curcumin** (turmeric, yellow), **chlorophyll** (green leaves).\n" +
        "- **Synthetic colours** are made in factories: **indigo carmine** (blue), **tartrazine** (yellow).\n" +
        "- Cheap or impure food colours can contain toxic heavy metals, **lead** and **mercury**, which build up in the body.\n" +
        "- Food cooked over burning wood picks up flavour from the smoke: the wood's **lignin** breaks down and gives **isoeugenol**, which tastes of **clove**. **Diacetyl** gives a buttery flavour.",
      table: {
        columns: ["Colouring substance", "Colour", "Natural or synthetic"],
        rows: [
          { cells: ["Betanin (beetroot)", "Red", "Natural"] },
          { cells: ["Anthocyanin (jamun, grapes, red cabbage)", "Purple to red", "Natural"] },
          { cells: ["Beta-carotene (carrot)", "Orange", "Natural"] },
          { cells: ["Curcumin (turmeric)", "Yellow", "Natural"] },
          { cells: ["Chlorophyll (leaves)", "Green", "Natural"] },
          { cells: ["Indigo carmine", "Blue", "Synthetic"] },
          { cells: ["Tartrazine", "Yellow", "Synthetic"] },
        ],
        caption: "If the name points to a plant, the colour is natural.",
      },
      selfCheckExample: {
        prompt: "Which of these food colours are natural: curcumin, tartrazine, chlorophyll?",
        steps: ["Curcumin comes from turmeric and chlorophyll from green leaves.", "Tartrazine is made in factories."],
        answer: "Curcumin and chlorophyll",
      },
      practiceSet: [
        { prompt: "Which natural colour gives beetroot its red colour?", answer: "Betanin" },
        { prompt: "Is indigo carmine a natural or a synthetic food colour?", answer: "Synthetic" },
        { prompt: "Name two toxic heavy metals that can be present in cheap food colours.", answer: "Lead and mercury" },
        { prompt: "Which substance from burning wood gives food a clove-like flavour?", answer: "Isoeugenol" },
      ],
      pyqExampleId: "48ad8dfe-86fb-481c-b05b-82d9ee1f9033",
      traps: [
        {
          title: "Counting indigo carmine as natural",
          body: "Its name sounds like the plant indigo, but the food colour indigo carmine is synthetic.",
        },
        {
          title: "Naming lignin as the flavour",
          body: "Lignin is the part of the wood that breaks down in the fire. The clove-like flavour comes from isoeugenol, one of its products.",
        },
      ],
    },
  ],
};
