import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PG_ETHYLENE_NOTE: SubtopicNote = {
  subtopicName: "Ethylene, Abscisic Acid and Photoperiodism",
  title: "Ethylene, Abscisic Acid and Photoperiodism",
  oneLineDefinition:
    "Ethylene, the gaseous PGR of ripening and senescence; abscisic acid, the stress hormone that closes stomata and keeps seeds dormant; and how day length and cold control flowering.",
  whyItMatters:
    "Six NEET questions: three EASY and three MODERATE. Ethylene was asked on its own three times (twice in NEET 2022, once in NEET 2023), and its effect on female flowers in cucumber came up twice (NEET 2022 and Re-NEET 2024). ABA came in two match-the-columns questions (Re-NEET 2024 and NEET 2026). Photoperiodism was asked once, in NEET 2021, and not since.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbopg-ethylene",
      name: "Ethylene",
      intuition:
        "Ethylene is a gas. It is made in large amounts by ripening fruits and by tissues that are ageing, and it speeds up both: fruits ripen, leaves and flowers age and fall. It also has a long list of separate effects, from rice stems racing up through flood water to more female flowers in cucumber. NEET picks one item from this list each time, so learn the list.",
      definition:
        "Ethylene in NCERT:\n" +
        "- A **simple gaseous PGR**, C₂H₄. It is made in large amounts by tissues undergoing **senescence** and by **ripening fruits**.\n" +
        "- It is highly effective in **fruit ripening**: it raises the **rate of respiration** during ripening. This rise is called the **respiratory climactic**.\n" +
        "- The compound most used as a source of ethylene is **ethephon**. In water it is readily absorbed and transported in the plant, and it **releases ethylene slowly**.\n" +
        "- Ethephon **hastens fruit ripening** in **tomatoes** and **apples** and **accelerates abscission** in flowers and fruits (thinning of **cotton**, **cherry** and **walnut**).",
      table: {
        columns: ["Effect", "What ethylene does"],
        rows: [
          { cells: ["Dicot seedlings", "Causes horizontal growth of seedlings, swelling of the axis and apical hook formation"] },
          { cells: ["Senescence and abscission", "Promotes senescence and abscission of plant organs, especially leaves and flowers"] },
          { cells: ["Dormancy", "Breaks seed and bud dormancy; starts germination in peanut seeds and sprouting of potato tubers"] },
          {
            cells: ["Deep water rice", "Promotes rapid internode and petiole elongation, so the leaves and upper shoot stay above water"],
            noteAmber: "NEET 2023: the PGR that elongates internodes and petioles in deep water rice is ethylene.",
            pyqExampleId: "7c886be6-0b26-45ec-9863-f99d7057f279",
          },
          {
            cells: ["Roots", "Promotes root growth and root hair formation, giving a larger absorption surface"],
            noteAmber: "NEET 2022: the gaseous PGR promotes root growth and root hair formation.",
            pyqExampleId: "21d3a852-a29f-403f-8db0-31de068e331a",
          },
          { cells: ["Pineapple and mango", "Initiates flowering and synchronises fruit set in pineapple; induces flowering in mango"] },
          {
            cells: ["Cucumber", "Promotes female flowers, so the yield increases"],
            noteAmber: "NEET 2022 and Re-NEET 2024: ethylene promotes female flowers in cucumber.",
            pyqExampleId: "d8d5bbfe-820e-4a75-b09c-366008534496",
          },
        ],
      },
      pyqExampleId: "7c886be6-0b26-45ec-9863-f99d7057f279",
      selfCheckExample: {
        prompt: "A trader wants a crate of unripe tomatoes to ripen quickly and evenly. Which compound can be sprayed, how does it work, and what happens to the respiration of the fruit?",
        steps: [
          "Ethephon is the compound most used as a source of ethylene.",
          "Absorbed in water, it releases ethylene slowly inside the fruit.",
          "Ethylene hastens ripening and raises the rate of respiration: the respiratory climactic.",
        ],
        answer: "Ethephon; it slowly releases ethylene, which hastens ripening and causes a rise in respiration rate (respiratory climactic).",
      },
      practiceSet: [
        { prompt: "What is the rise in respiration rate during fruit ripening called?", answer: "The respiratory climactic" },
        { prompt: "Which PGR breaks dormancy and starts sprouting of potato tubers?", answer: "Ethylene" },
        { prompt: "Name the three crops NCERT gives for thinning by ethephon.", answer: "Cotton, cherry and walnut" },
        { prompt: "Which PGR induces flowering in mango?", answer: "Ethylene" },
        { prompt: "Which tissues make ethylene in large amounts?", answer: "Tissues undergoing senescence and ripening fruits" },
      ],
      traps: [
        {
          title: "Female flowers, not male",
          body: "Ethylene promotes **female** flowers in **cucumber**, which raises the yield. A statement that it promotes **male** flowers is false.",
        },
        {
          title: "Ethylene, not gibberellin, in deep water rice",
          body: "Internode elongation in **deep water rice** is an **ethylene** effect. Internode elongation before flowering in cabbage (bolting) is the **gibberellin** effect.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopg-aba",
      name: "Abscisic acid",
      intuition:
        "Abscisic acid (ABA) is the brake. It slows growth and metabolism, stops seeds germinating, and shuts stomata when water is short. Because it helps the plant get through bad times, it is called the stress hormone. It keeps seeds dormant, which lets them survive drying out.",
      definition:
        "ABA in NCERT:\n" +
        "- It regulates **abscission** and **dormancy**.\n" +
        "- It acts as a **general plant growth inhibitor** and an **inhibitor of plant metabolism**.\n" +
        "- In most situations ABA acts as an **antagonist to GAs**.\n" +
        "- Because it raises tolerance to many kinds of stress, it is also called the **stress hormone**.",
      table: {
        columns: ["Effect", "What ABA does"],
        rows: [
          { cells: ["Seed germination", "Inhibits seed germination"] },
          {
            cells: ["Stomata", "Stimulates the closure of stomata"],
            noteAmber: "NEET 2026: ABA was matched to stimulation of stomatal closure.",
            pyqExampleId: "a188f927-f109-4bdb-8009-5e13daf1a94c",
          },
          { cells: ["Stress", "Increases the tolerance of plants to various kinds of stresses"] },
          { cells: ["Seeds", "Plays an important role in seed development, maturation and dormancy"] },
          {
            cells: ["Desiccation", "By inducing dormancy, helps seeds withstand desiccation and other conditions bad for growth"],
            noteAmber: "Re-NEET 2024: ABA was matched to helping seeds withstand desiccation.",
            pyqExampleId: "d5cc039b-e5ba-4080-ad0c-a1891800423e",
          },
        ],
      },
      pyqExampleId: "a188f927-f109-4bdb-8009-5e13daf1a94c",
      selfCheckExample: {
        prompt: "During a drought, a plant shuts its stomata and its seeds stay dormant instead of germinating. Which PGR is behind both, and what name does NCERT give it for this role?",
        steps: [
          "ABA stimulates the closure of stomata.",
          "ABA inhibits seed germination and keeps seeds dormant.",
          "Because it raises tolerance to stress, it is called the stress hormone.",
        ],
        answer: "Abscisic acid, the stress hormone.",
      },
      practiceSet: [
        { prompt: "Which two processes does ABA regulate, as its name suggests?", answer: "Abscission and dormancy" },
        { prompt: "To which PGR does ABA act as an antagonist in most situations?", answer: "Gibberellins (GAs)" },
        { prompt: "Is ABA a growth promoter or a growth inhibitor?", answer: "A general growth inhibitor" },
        { prompt: "What effect does ABA have on seed germination?", answer: "It inhibits it" },
      ],
      traps: [
        {
          title: "ABA closes stomata",
          body: "**ABA** stimulates stomatal **closure**. A statement that ABA opens stomata is false.",
        },
        {
          title: "ABA is not a growth promoter",
          body: "**ABA** is a **growth inhibitor**. The promoters are auxins, gibberellins and cytokinins. Parthenocarpy is induced by **auxins**, not ABA.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopg-photoperiodism",
      name: "Photoperiodism and vernalisation",
      intuition:
        "Many plants flower only in the right season. Two signals tell them when: the length of the day and night, and a spell of cold. The response to day length is photoperiodism; the need for cold is vernalisation. The shoot tip turns into a flower, but it is the leaf that senses the day length.",
      definition:
        "What NCERT says:\n" +
        "- **Photoperiodism**: the response of plants to the periods of day and night.\n" +
        "- **Long day plants** need light for a period **longer** than a critical duration before they flower; **short day plants** need light for a period **shorter** than it. **Day-neutral plants** show no link between day length and flowering.\n" +
        "- The length of the **dark period** matters just as much as the light period.\n" +
        "- Shoot apices become flowering apices, but cannot perceive the photoperiod themselves. The **site of perception is the leaf**. A hormonal substance is thought to move from the leaves to the shoot apices to start flowering when the plant gets its inductive photoperiod.\n" +
        "- **Vernalisation**: some plants depend on exposure to **low temperature** to flower. It prevents precocious (too early) reproductive development late in the growing season, so the plant has enough time to reach maturity.",
      table: {
        columns: ["Term", "NCERT fact"],
        rows: [
          {
            cells: ["Site of perception of photoperiod", "The leaves"],
            noteAmber: "NEET 2021: the site of perception of light in photoperiodism is the leaf, not the shoot apex.",
            pyqExampleId: "f2b12403-dac7-48b9-b4bc-6749433096f3",
          },
          { cells: ["Long day plant", "Flowers when light lasts longer than a critical duration"] },
          { cells: ["Short day plant", "Flowers when light lasts less than the critical duration"] },
          { cells: ["Day-neutral plant", "No link between the duration of light and flowering"] },
          { cells: ["Vernalisation in cereals", "Wheat, barley and rye have winter and spring varieties; winter varieties are sown in autumn, pass the winter as seedlings and flower after the cold"] },
          { cells: ["Vernalisation in biennials", "Sugarbeet, cabbage and carrot flower after being given low temperature"] },
        ],
      },
      pyqExampleId: "f2b12403-dac7-48b9-b4bc-6749433096f3",
      selfCheckExample: {
        prompt: "A farmer sows a winter variety of wheat in spring instead of autumn. It grows but fails to flower that season. Name the phenomenon behind this and explain why.",
        steps: [
          "Winter varieties need a spell of low temperature before they flower.",
          "Sown in spring, the seedlings never pass through the winter cold.",
          "The dependence on low temperature for flowering is vernalisation.",
        ],
        answer: "Vernalisation: the winter wheat never got the cold it needs, so it does not flower that season.",
      },
      practiceSet: [
        { prompt: "What is the response of plants to the periods of day and night called?", answer: "Photoperiodism" },
        { prompt: "What are plants called that flower only when the light period is shorter than a critical duration?", answer: "Short day plants" },
        { prompt: "Name two biennial plants that NCERT says flower after low temperature.", answer: "Any two of sugarbeet, cabbage and carrot" },
        { prompt: "Is only the light period important for flowering, or the dark period too?", answer: "The dark period is equally important" },
      ],
      traps: [
        {
          title: "Leaves sense day length, not the shoot apex",
          body: "The **shoot apex** turns into a flowering apex but cannot perceive the photoperiod. The **leaf** does, and a hormonal signal travels from it to the apex.",
        },
      ],
    },
  ],
};
