import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MT_CORROSION_NOTE: SubtopicNote = {
  subtopicName: "Corrosion and Alloys",
  title: "Corrosion and Alloys",
  oneLineDefinition:
    "Corrosion is a metal being slowly eaten away by air and moisture, as iron rusts; it is prevented by painting, galvanising, tinning, anodising and alloying, and alloys such as steel, amalgams and carat gold improve on pure metals.",
  whyItMatters:
    "Six questions in the bank, three EASY, two MODERATE and one HARD. Three are about rusting and its prevention, naming galvanisation and the other methods; three are about alloys: what carbon gives stainless steel, which pair is not an amalgam, and the percentage of gold in 23 carat gold.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mtco-corrosion",
      name: "Rusting and the prevention of corrosion",
      intuition:
        "An iron gate left in the rain grows a reddish brown, flaky coat: rust. Iron needs both oxygen and water to rust, so every way of preventing it puts a barrier between the iron and the moist air, or mixes the iron with metals that resist corrosion.",
      definition:
        "- **Corrosion**: a metal slowly eaten away by air, moisture or chemicals. **Rusting** of iron needs **both oxygen (air) and water**.\n" +
        "- **Rust** is reddish brown hydrated iron oxide. Copper gets a **green** coat in moist air; silver turns **black** with the sulphur compounds in air.\n" +
        "- **Prevention**: painting, oiling and greasing; **galvanising** (a coat of **zinc** on iron); **tinning** (a coat of **tin**); electroplating (such as chromium plating); **anodising** (a thick protective oxide layer on **aluminium**); and **alloying** (such as stainless steel).\n" +
        "- **Vulcanisation** is not a way to protect metals: it is the hardening of rubber with sulphur.",
      table: {
        columns: ["Method", "What is done", "Example"],
        rows: [
          { cells: ["Painting, oiling, greasing", "A layer keeps air and water away", "Iron gates, machine parts"] },
          { cells: ["Galvanising", "Iron is coated with zinc", "Iron water pipes, roofing sheets"] },
          { cells: ["Tinning", "Iron or copper is coated with tin", "Food cans, brass and copper vessels"] },
          { cells: ["Electroplating", "A thin layer of another metal by electricity", "Chromium-plated taps and bicycle parts"] },
          { cells: ["Anodising", "A thick oxide layer is built on aluminium", "Aluminium pressure cookers and window frames"] },
          { cells: ["Alloying", "Iron is mixed with chromium and nickel", "Stainless steel utensils"] },
        ],
        caption: "Galvanising uses zinc; tinning uses tin; anodising is done on aluminium.",
      },
      selfCheckExample: {
        prompt: "Iron nails are placed in boiled water with a layer of oil on top. Will they rust? Why?",
        steps: ["Boiling removes the dissolved air, and the oil stops fresh air from dissolving.", "Rusting needs both air and water."],
        answer: "No: without air (oxygen) the iron cannot rust.",
      },
      practiceSet: [
        { prompt: "What colour coat forms on a copper vessel left in moist air?", answer: "Green" },
        { prompt: "What is the coating of iron with tin called?", answer: "Tinning" },
        { prompt: "Which two things must both be present for iron to rust?", answer: "Air (oxygen) and water (moisture)" },
        { prompt: "Why does silver jewellery turn black over time?", answer: "Silver reacts with sulphur compounds in the air" },
      ],
      pyqExampleId: "bec306be-10e2-4e2e-bbce-9bf172b8369a",
      traps: [
        {
          title: "Confusing galvanisation with vulcanisation",
          body: "Galvanisation coats iron with zinc. Vulcanisation hardens rubber with sulphur and has nothing to do with metals.",
        },
        {
          title: "Thinking iron rusts in dry air",
          body: "Rusting needs both oxygen and moisture. Iron kept in dry air, or in water with no air, does not rust.",
        },
        {
          title: "Anodising iron",
          body: "Anodising builds a protective oxide layer on aluminium. Iron is protected by galvanising, tinning, painting or alloying.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9mtco-alloys",
      name: "Alloys, amalgams and the purity of gold",
      intuition:
        "Pure metals are often too soft, or rust too easily. Melt them together with another metal or with carbon and the mixture can be harder and longer lasting. Pure gold is so soft that jewellery is made with a little copper or silver in it, and its purity is told in carats out of 24.",
      definition:
        "- An **alloy** is a homogeneous mixture of a metal with other metals, or with a non-metal such as carbon.\n" +
        "- **Stainless steel**: iron with chromium, nickel and a little carbon. **Carbon** makes it **hard and strong**; **chromium and nickel** make it rust-resistant and shiny.\n" +
        "- **Brass**: copper and zinc. **Bronze**: copper and tin. **Solder**: lead and tin (low melting point). **Duralumin**: aluminium with copper, magnesium and manganese (light and strong, for aircraft).\n" +
        "- An **amalgam** is an alloy of **mercury** with another metal: sodium, potassium, gold and silver form amalgams. **Iron and platinum do not**, which is why mercury is stored in iron bottles.\n" +
        "- **Pure gold is 24 carat.** An n carat gold has n parts gold in 24 parts.",
      formula: {
        label: "Purity of gold",
        latex: "\\text{percentage of gold} = \\frac{\\text{carat}}{24} \\times 100",
        symbols: [{ symbol: "carat", meaning: "parts of gold in 24 parts of the alloy; 24 carat is pure gold" }],
      },
      authoredExample: {
        prompt: "A gold ring is marked 18 carat. What percentage of it is gold?",
        steps: ["Percentage of gold \\(= \\frac{18}{24} \\times 100\\).", "\\(\\frac{18}{24} = 0.75\\), so the ring is 75% gold."],
        answer: "75%",
      },
      selfCheckExample: {
        prompt: "A chain is made of 12 carat gold. What percentage of it is gold?",
        steps: ["\\(\\frac{12}{24} \\times 100 = 50\\)."],
        answer: "50%",
      },
      practiceSet: [
        { prompt: "How many grams of gold are there in a 40 g ornament of 21 carat gold?", answer: "\\(\\frac{21}{24} \\times 40 = 35\\) g" },
        { prompt: "Which metals give stainless steel its resistance to rusting?", answer: "Chromium and nickel" },
        { prompt: "Name the two metals in brass.", answer: "Copper and zinc" },
        { prompt: "Which of these does not form an amalgam with mercury: iron or silver?", answer: "Iron" },
      ],
      pyqExampleId: "cdfa6a74-57fb-41cb-b976-3627aa3a9580",
      traps: [
        {
          title: "Reading the carat as a percentage",
          body: "Carats are counted out of 24. 18 carat is \\(\\frac{18}{24}\\), that is 75% gold, not 18%.",
        },
        {
          title: "Thinking carbon makes steel rust-proof",
          body: "Carbon makes steel hard. The rust resistance of stainless steel comes from chromium and nickel.",
        },
        {
          title: "Thinking mercury forms an amalgam with every metal",
          body: "Iron and platinum do not form amalgams with mercury. Sodium, potassium, gold and silver do.",
        },
      ],
    },
  ],
};
