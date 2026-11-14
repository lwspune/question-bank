import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PG_PROMOTERS_NOTE: SubtopicNote = {
  subtopicName: "Auxins, Gibberellins and Cytokinins",
  title: "Auxins, Gibberellins and Cytokinins",
  oneLineDefinition:
    "What plant growth regulators are, how each was discovered, and what the three growth promoters (auxins, gibberellins and cytokinins) do in the plant and on the farm.",
  whyItMatters:
    "Ten NEET questions: four EASY and six MODERATE, from 2021 to 2026. Auxin as a weedkiller (2,4-D, weed-free lawns) is the favourite: NEET 2021, NEET 2024 and Re-NEET 2026 asked it, and NEET 2026 matched 2,4-D to herbicide. Gibberellin uses were asked three times (NEET 2023, NEET 2024, Re-NEET 2026), always as a named crop and the effect on it.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbopg-discovery",
      name: "What PGRs are and how they were found",
      intuition:
        "Plant growth regulators (PGRs) are small, simple chemicals that a plant makes to control its own growth. Some speed growth up, one mostly slows it down. Each was found by someone who noticed a strange effect: a shoot bending to light, rice seedlings growing too tall, a callus that would only grow with an extra ingredient. NEET asks who found what, and from where.",
      definition:
        "PGRs in NCERT:\n" +
        "- PGRs are **small, simple molecules** of diverse chemical nature: **indole compounds** (indole-3-acetic acid, IAA), **adenine derivatives** (N⁶-furfurylamino purine, kinetin), **derivatives of carotenoids** (abscisic acid, ABA), **terpenes** (gibberellic acid, GA₃) and **gases** (ethylene, C₂H₄).\n" +
        "- **Plant growth promoters**: auxins, gibberellins and cytokinins. **Plant growth inhibitor**: abscisic acid. **Ethylene** can fit either group, but it is largely an inhibitor.\n" +
        "- **All GAs are acidic.** **Zeatin**, a natural cytokinin, was isolated from **corn kernels and coconut milk**.\n" +
        "- In most situations **ABA** acts as an **antagonist to GAs**.",
      table: {
        columns: ["PGR", "Who found it", "How"],
        rows: [
          { cells: ["Auxin", "Charles Darwin and his son Francis Darwin; isolated by F.W. Went", "Coleoptiles of canary grass bent towards one-sided light (phototropism); the tip sent the signal. Went isolated auxin from coleoptile tips of oat seedlings"] },
          { cells: ["Gibberellin", "E. Kurosawa", "Bakanae (foolish seedling) disease of rice, caused by the fungus *Gibberella fujikuroi*: sterile fungal filtrates made healthy rice seedlings show the symptoms"] },
          {
            cells: ["Cytokinin", "F. Skoog and co-workers; Skoog and Miller crystallised kinetin", "Callus from internodal segments of tobacco stem grew only if, besides auxin, the medium had extract of vascular tissue, yeast extract, coconut milk or DNA"],
            noteAmber: "Re-NEET 2024: abscisic acid was NOT one of the extras that made the tobacco callus grow.",
            pyqExampleId: "a36baffa-db12-4c7b-9f1c-061e0e7b4311",
          },
          { cells: ["Abscisic acid", "Three independent groups in the mid-1960s", "Inhibitor-B, abscission II and dormin were purified separately and proved to be the same chemical, ABA"] },
          { cells: ["Ethylene", "Cousins", "A volatile substance from ripened oranges hastened the ripening of stored unripe bananas; it was later identified as ethylene"] },
        ],
      },
      pyqExampleId: "a36baffa-db12-4c7b-9f1c-061e0e7b4311",
      selfCheckExample: {
        prompt: "A rice field has seedlings that grow abnormally tall and weak. Name this disease, the organism that causes it and the PGR that was discovered from it.",
        steps: [
          "Abnormally tall rice seedlings is the bakanae, or foolish seedling, disease.",
          "It is caused by the fungus *Gibberella fujikuroi*.",
          "Kurosawa showed the fungal filtrate caused it; the active substance is gibberellic acid.",
        ],
        answer: "Bakanae disease, caused by *Gibberella fujikuroi*; it led to the discovery of gibberellin.",
      },
      practiceSet: [
        { prompt: "Which PGR is a derivative of carotenoids?", answer: "Abscisic acid" },
        { prompt: "Which group of chemicals do gibberellins belong to?", answer: "Terpenes" },
        { prompt: "Which plant did the Darwins use to show bending towards light?", answer: "Canary grass" },
        { prompt: "From which source did Went isolate auxin?", answer: "The coleoptile tips of oat seedlings" },
        { prompt: "Which fruit gave off the gas that ripened stored bananas in Cousins' work?", answer: "Ripened oranges" },
      ],
      traps: [
        {
          title: "ABA, not auxin, opposes gibberellins",
          body: "NCERT says **ABA** acts as an **antagonist to GAs**. A statement that calls **auxins** the antagonists of GAs is false.",
        },
        {
          title: "Kinetin is not found in plants",
          body: "**Kinetin** came from **autoclaved herring sperm DNA** and does not occur naturally in plants. The natural cytokinin is **zeatin**, from corn kernels and coconut milk.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopg-auxin",
      name: "Auxins",
      intuition:
        "Auxin (from the Greek auxein, to grow) is made at the growing tips of stems and roots and moves to where it acts. It keeps side buds asleep while the top bud grows, it helps cuttings root, and in large doses some synthetic auxins kill broad-leaved weeds while sparing grasses. That last use is the one NEET keeps asking.",
      definition:
        "Auxins in NCERT:\n" +
        "- First isolated from **human urine**. The term is used for **IAA** and other natural and synthetic compounds with similar effects.\n" +
        "- **Natural** (isolated from plants): **IAA** and **IBA** (indole butyric acid). **Synthetic**: **NAA** (naphthalene acetic acid) and **2,4-D** (2,4-dichlorophenoxyacetic acid).\n" +
        "- Produced by the **growing apices of stems and roots**, from where they migrate to the regions of their action.\n" +
        "- **Apical dominance**: the growing apical bud inhibits the growth of the lateral (axillary) buds. Removing the shoot tip (**decapitation**) usually makes the lateral buds grow, which is used in **tea plantations** and **hedge making**.\n" +
        "- Auxins also control **xylem differentiation** and help in **cell division**.",
      table: {
        columns: ["Use", "What auxin does"],
        rows: [
          { cells: ["Rooting", "Helps initiate rooting in stem cuttings, used in plant propagation"] },
          { cells: ["Flowering", "Promotes flowering, for example in pineapples"] },
          { cells: ["Leaf and fruit drop", "Prevents early drop of fruits and leaves, but promotes abscission of older mature leaves and fruits"] },
          { cells: ["Parthenocarpy", "Induces seedless fruit, for example in tomatoes"] },
          {
            cells: ["Herbicide", "2,4-D kills dicotyledonous (broad-leaved) weeds"],
            noteAmber: "NEET 2021 and Re-NEET 2026: the PGR used to kill weeds is 2,4-D.",
            pyqExampleId: "ae0e5bfa-4589-4bf4-8f4e-9903b73922f8",
          },
          { cells: ["Weed-free lawns", "2,4-D does not affect mature monocotyledonous plants, so gardeners use it on lawns without harming the grass"] },
        ],
      },
      pyqExampleId: "a2269e0c-3481-424b-aaf0-9dd321d1ac0f",
      selfCheckExample: {
        prompt: "A gardener cuts off the tips of the shoots of a hedge. A few weeks later the hedge is much bushier. Explain why, naming the PGR involved.",
        steps: [
          "Auxin from the growing apical bud inhibits the lateral buds below it: apical dominance.",
          "Cutting off the tip (decapitation) removes that inhibition.",
          "The lateral buds now grow into branches, so the hedge becomes dense.",
        ],
        answer: "Removing the tips ends the apical dominance caused by auxin, so the lateral buds grow out into branches.",
      },
      practiceSet: [
        { prompt: "Name the two natural auxins NCERT lists.", answer: "IAA and IBA" },
        { prompt: "Is NAA a natural or a synthetic auxin?", answer: "Synthetic" },
        { prompt: "Which PGR helps stem cuttings form roots?", answer: "Auxin" },
        { prompt: "In which fruit does NCERT say auxins induce parthenocarpy?", answer: "Tomato" },
        { prompt: "Where in the plant are auxins produced?", answer: "At the growing apices of stems and roots" },
      ],
      traps: [
        {
          title: "IBA is natural; NAA and 2,4-D are synthetic",
          body: "**IAA** and **IBA** are isolated from plants. **NAA** and **2,4-D** are made in the laboratory. Calling IBA synthetic is the usual slip.",
        },
        {
          title: "Auxin promotes apical dominance; cytokinin overcomes it",
          body: "**Auxin** from the shoot tip **keeps lateral buds from growing**. **Cytokinins** help **overcome** apical dominance. Apical dominance never promotes the growth of lateral buds.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopg-gibberellin",
      name: "Gibberellins",
      intuition:
        "Gibberellins make stems and stalks grow longer. That one effect explains most of their farm uses: longer grape stalks, longer sugarcane, rosette plants that suddenly shoot up before flowering. NEET names a crop and asks which PGR is sprayed on it, so learn each crop with its effect.",
      definition:
        "Gibberellins in NCERT:\n" +
        "- More than **100 gibberellins** are known, from organisms as different as **fungi** and **higher plants**: GA₁, GA₂, GA₃ and so on. **GA₃** was one of the first found and is the most studied.\n" +
        "- **All GAs are acidic.**\n" +
        "- They cause an **increase in the length of the axis**.\n" +
        "- **Bolting** is internode elongation just before flowering, in **beet**, **cabbages** and many plants with a **rosette** habit. GAs promote it.",
      table: {
        columns: ["Use", "What gibberellin does"],
        rows: [
          { cells: ["Grapes", "Increases the length of grape stalks"] },
          { cells: ["Apple", "Makes the fruit elongate and improves its shape"] },
          { cells: ["Fruit on the tree", "Delays senescence, so fruit can be left on the tree longer to extend the market period"] },
          { cells: ["Brewing", "GA₃ speeds up the malting process"] },
          {
            cells: ["Sugarcane", "Increases the length of the stem, which stores sugar, raising the yield by as much as 20 tonnes per acre"],
            noteAmber: "NEET 2024: gibberellin is sprayed on sugarcane to lengthen the stem.",
            pyqExampleId: "510a95ed-7cbc-48f2-a2b6-452dab9daa72",
          },
          {
            cells: ["Juvenile conifers", "Hastens the maturity period, leading to early seed production"],
            noteAmber: "NEET 2023: gibberellic acid on juvenile conifers gives early seed.",
            pyqExampleId: "f0e1e93f-27f1-48f0-b160-05be0966bd3e",
          },
          {
            cells: ["Beet and cabbage", "Promotes bolting: internode elongation just before flowering"],
            noteAmber: "Re-NEET 2026: the PGR for internode elongation before flowering in cabbage is gibberellin.",
            pyqExampleId: "4e15e5a4-d988-45f5-95f6-075ecc80408a",
          },
        ],
      },
      pyqExampleId: "510a95ed-7cbc-48f2-a2b6-452dab9daa72",
      selfCheckExample: {
        prompt: "A brewery wants barley to complete malting faster, and an apple grower wants longer, better shaped fruit. Which one PGR serves both, and what is the general effect behind both uses?",
        steps: [
          "GA₃ is used to speed up malting in the brewing industry.",
          "Gibberellins make apples elongate and improve their shape.",
          "Both come from the same PGR: gibberellin.",
        ],
        answer: "Gibberellin (GA₃ for malting); it promotes growth and elongation.",
      },
      practiceSet: [
        { prompt: "About how many gibberellins have been reported?", answer: "More than 100" },
        { prompt: "Which gibberellin is the most studied?", answer: "GA₃" },
        { prompt: "What is bolting?", answer: "Internode elongation just before flowering, as in beet and cabbage" },
        { prompt: "Which PGR is used to increase the length of grape stalks?", answer: "Gibberellin" },
        { prompt: "How does gibberellin help extend the market period of fruits?", answer: "It delays senescence, so fruit can stay longer on the tree" },
      ],
      traps: [
        {
          title: "Bolting is gibberellin's job",
          body: "Sudden internode elongation before flowering in **cabbage** and **beet** is **bolting**, promoted by **gibberellin**. Ethephon, ABA and IBA do not cause it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopg-cytokinin",
      name: "Cytokinins",
      intuition:
        "Cytokinins are named for cytokinesis: they push cells to divide. They are made where cells divide fast, such as root tips, young buds and young fruits. They also keep leaves green for longer by drawing nutrients into them, which is the effect NEET asks most.",
      definition:
        "Cytokinins in NCERT:\n" +
        "- They have specific effects on **cytokinesis** (cell division).\n" +
        "- First found as **kinetin**, a modified form of **adenine** (a purine), from **autoclaved herring sperm DNA**. Kinetin does **not** occur naturally in plants.\n" +
        "- A natural cytokinin, **zeatin**, was isolated from **corn kernels** and **coconut milk**.\n" +
        "- Natural cytokinins are made where rapid cell division occurs: **root apices**, **developing shoot buds**, **young fruits**.",
      table: {
        columns: ["Effect", "What cytokinin does"],
        rows: [
          { cells: ["New organs", "Helps produce new leaves, chloroplasts in leaves, lateral shoot growth and adventitious shoot formation"] },
          { cells: ["Apical dominance", "Helps overcome apical dominance, so lateral buds grow"] },
          {
            cells: ["Leaf senescence", "Promotes nutrient mobilisation, which helps delay leaf senescence"],
            noteAmber: "NEET 2025: the PGR that promotes nutrient mobilisation and delays leaf senescence is cytokinin.",
            pyqExampleId: "3211d484-dd94-4c74-818f-efe81cbfbedf",
          },
        ],
      },
      pyqExampleId: "3211d484-dd94-4c74-818f-efe81cbfbedf",
      selfCheckExample: {
        prompt: "A plant scientist wants a cultured shoot to form many side shoots instead of one tall shoot. Which PGR should be added, and which two of its effects help?",
        steps: [
          "Cytokinins help overcome apical dominance, so lateral buds are no longer held back.",
          "They also promote lateral shoot growth and adventitious shoot formation.",
        ],
        answer: "A cytokinin: it overcomes apical dominance and promotes lateral and adventitious shoots.",
      },
      practiceSet: [
        { prompt: "From what source was kinetin first obtained?", answer: "Autoclaved herring sperm DNA" },
        { prompt: "Kinetin is a modified form of which base?", answer: "Adenine, a purine" },
        { prompt: "Name three places in a plant where natural cytokinins are made.", answer: "Root apices, developing shoot buds and young fruits" },
        { prompt: "Which natural cytokinin was isolated from corn kernels?", answer: "Zeatin" },
      ],
      traps: [
        {
          title: "Nutrient mobilisation means cytokinin",
          body: "Delaying **leaf senescence** by **nutrient mobilisation** is the job of **cytokinin**. Gibberellin delays the senescence of **fruits** on the tree; ethylene and ABA promote senescence.",
        },
      ],
    },
  ],
};
