import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PG_GROWTH_NOTE: SubtopicNote = {
  subtopicName: "Growth and Differentiation",
  title: "Growth and Differentiation",
  oneLineDefinition:
    "What plant growth is, its three phases, how arithmetic and geometric growth rates are worked out, how cells differentiate, dedifferentiate and redifferentiate, and why plants show plasticity.",
  whyItMatters:
    "Nine NEET questions: two EASY and seven MODERATE. Plasticity was asked three times (NEET 2021, NEET 2022 and NEET 2026) and dedifferentiation twice (NEET 2023 and NEET 2024). Both 2026 papers asked about growth itself: NEET 2026 on the phase of elongation and Re-NEET 2026 a sum on arithmetic growth.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbopg-phases",
      name: "Growth and its three phases",
      intuition:
        "Growth is an increase in size that cannot be undone. A plant keeps growing all its life because it has meristems: groups of cells that never stop dividing. A new cell made at the root or shoot tip passes through three stages as the tip grows away from it: it divides, then it gets longer, then it matures into its final form.",
      definition:
        "Growth in NCERT:\n" +
        "- Growth is an **irreversible permanent increase in size** of an organ, its parts or even of an individual cell. It goes with metabolic processes that use energy.\n" +
        "- Plant growth is **indeterminate**: plants keep the ability to grow throughout life because of **meristems**. This is the **open form of growth**.\n" +
        "- **Root and shoot apical meristems** give **primary growth** (the plant gets longer). **Lateral meristems**, the **vascular cambium** and **cork cambium**, appear later and give **secondary growth** (the girth of the organ increases).\n" +
        "- Growth is **measurable**: by fresh weight, dry weight, length, area, volume or cell number. A single **maize root apical meristem** can make more than **17,500 new cells an hour**; cells in a **watermelon** may grow up to **3,50,000 times** in size. Growth of a **pollen tube** is measured by its length; of a **dorsiventral leaf** by its surface area.\n" +
        "- Growth needs **water**, **oxygen** and **nutrients**, an **optimum temperature**, and is also affected by light and gravity.",
      table: {
        columns: ["Phase", "Where the cells are", "What the cells are like"],
        rows: [
          {
            cells: ["Meristematic", "At the root apex and the shoot apex, dividing all the time", "Rich in protoplasm, with **large conspicuous nuclei**; thin, cellulosic primary walls with many plasmodesmata"],
          },
          {
            cells: ["Elongation", "Just next to the meristematic zone, away from the tip", "**Increased vacuolation**, **cell enlargement** and **new cell wall deposition**"],
            noteAmber: "NEET 2026: a large conspicuous nucleus is NOT a feature of the phase of elongation; it marks the meristematic phase.",
            pyqExampleId: "7aba1c23-e030-4977-bfd2-51fa8a51974d",
          },
          {
            cells: ["Maturation", "Further away from the tip, behind the phase of elongation", "Cells reach their **maximal size** in wall thickening and changes in the protoplasm"],
          },
        ],
      },
      pyqExampleId: "7aba1c23-e030-4977-bfd2-51fa8a51974d",
      selfCheckExample: {
        prompt: "A cell lies far behind the root tip. It has reached its maximum size, its wall is thickened and its protoplasm has changed for its final job. Which phase of growth is this cell in, and which phase did it pass through just before?",
        steps: [
          "A cell that has reached its maximal size with wall thickening is in the phase of maturation.",
          "Before maturing, a cell lengthens and gets vacuolated in the phase of elongation.",
        ],
        answer: "The phase of maturation; just before it, the phase of elongation.",
      },
      practiceSet: [
        { prompt: "Which meristems give a plant secondary growth?", answer: "The lateral meristems: the vascular cambium and the cork cambium" },
        { prompt: "Why is plant growth called an open form of growth?", answer: "Because meristems let the plant keep growing throughout its life" },
        { prompt: "How is the growth of a pollen tube measured?", answer: "By the increase in its length" },
        { prompt: "How many new cells an hour can a single maize root apical meristem make?", answer: "More than 17,500" },
        { prompt: "Name three things NCERT says are needed for growth.", answer: "Any three of water, oxygen, nutrients and an optimum temperature" },
      ],
      traps: [
        {
          title: "Large nuclei belong to dividing cells",
          body: "**Large conspicuous nuclei** and dense protoplasm mark the **meristematic** phase. Cells in the **phase of elongation** are known by **vacuolation**, **enlargement** and **new wall deposition**.",
        },
        {
          title: "Growth is irreversible",
          body: "A cell that swells with water and shrinks again has not grown. Growth is an **irreversible permanent** increase in size.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbopg-growth-rate",
      name: "Arithmetic and geometric growth",
      visualizationSlug: "neet-growth-curves",
      intuition:
        "Growth rate is how much growth happens in a unit of time. If only one of the two daughter cells keeps dividing, the plant adds the same amount every day, and a graph of length against time is a straight line. If both daughter cells keep dividing, growth is slow at first, then shoots up, then slows down when food runs short: an S shaped curve.",
      definition:
        "Growth rates in NCERT:\n" +
        "- **Arithmetic growth**: after mitosis **only one daughter cell** keeps dividing; the other differentiates and matures. Example: a **root elongating at a constant rate**. Length against time gives a **linear curve**.\n" +
        "- **Geometric growth**: **both daughter cells** keep dividing. Growth is slow at first (**lag phase**), then rapid at an exponential rate (**log** or **exponential phase**). When nutrients run short it slows to a **stationary phase**. The curve is **sigmoid** (S shaped), typical of cells, tissues and organs growing in nature.\n" +
        "- Geometric growth: \\(W_1 = W_0\\,e^{rt}\\). Here \\(W_1\\) is the final size (weight, height, number), \\(W_0\\) the initial size, \\(r\\) the growth rate, \\(t\\) the time and \\(e\\) the base of natural logarithms.\n" +
        "- \\(r\\) is the **relative growth rate**, a measure of the plant's ability to make new plant material, called the **efficiency index**. So \\(W_1\\) depends on \\(W_0\\).\n" +
        "- **Absolute growth rate**: the total growth per unit time. **Relative growth rate**: the growth per unit time expressed on a common basis, such as per unit of the starting size.",
      formula: {
        label: "Arithmetic growth",
        latex: "L_t = L_0 + rt",
        symbols: [
          { symbol: "\\(L_t\\)", meaning: "length at time t" },
          { symbol: "\\(L_0\\)", meaning: "length at time zero" },
          { symbol: "\\(r\\)", meaning: "growth rate, the elongation per unit time" },
          { symbol: "\\(t\\)", meaning: "time of growth" },
        ],
      },
      authoredExample: {
        prompt: "A stem grows arithmetically from 15 cm to 55 cm in 8 days. Find its growth rate, and its length after 12 days from the start.",
        steps: [
          "Use \\(L_t = L_0 + rt\\): \\(55 = 15 + r \\times 8\\).",
          "So \\(8r = 40\\) and \\(r = 5\\) cm per day.",
          "After 12 days: \\(L_t = 15 + 5 \\times 12 = 15 + 60 = 75\\) cm.",
        ],
        answer: "5 cm per day; 75 cm after 12 days.",
      },
      pyqExampleId: "6047856c-3bd3-4fc6-aac4-4b791677e72c",
      selfCheckExample: {
        prompt: "Leaf A grows from 5 cm² to 10 cm² and leaf B grows from 50 cm² to 55 cm² in the same time. Compare their absolute and relative growth.",
        steps: [
          "Absolute growth: each leaf added 5 cm², so the absolute growth is the same.",
          "Relative growth of A: 5 on a start of 5, which is 100 percent.",
          "Relative growth of B: 5 on a start of 50, which is 10 percent.",
        ],
        answer: "Equal absolute growth (5 cm² each), but leaf A has the higher relative growth rate (100 percent against 10 percent).",
      },
      practiceSet: [
        { prompt: "A root is 10 cm long and grows arithmetically at 2 cm a day. After how many days will it be 30 cm long?", answer: "10 days: \\(30 = 10 + 2t\\), so \\(t = 10\\)" },
        { prompt: "In arithmetic growth, how many of the two daughter cells keep dividing after mitosis?", answer: "Only one; the other differentiates and matures" },
        { prompt: "What is the shape of the graph of length against time in arithmetic growth?", answer: "A straight line (linear curve)" },
        { prompt: "Which phase of a sigmoid growth curve comes right after the lag phase?", answer: "The log (exponential) phase" },
        { prompt: "What does NCERT call r in \\(W_1 = W_0\\,e^{rt}\\)?", answer: "The relative growth rate, also called the efficiency index" },
      ],
      traps: [
        {
          title: "Add the growth to the starting length",
          body: "In \\(L_t = L_0 + rt\\) the growth \\(rt\\) is **added to** \\(L_0\\). Writing \\(rt\\) alone as the final length forgets where the stem began.",
        },
        {
          title: "Linear is arithmetic, sigmoid is geometric",
          body: "A **straight line** of growth against time means **arithmetic** growth. The **S shaped** curve with lag, log and stationary phases is **geometric** growth.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopg-differentiation",
      name: "Differentiation, dedifferentiation and redifferentiation",
      intuition:
        "A new cell from a meristem matures into a cell with one job, such as a xylem vessel: that is differentiation, and such a cell usually stops dividing. Some living mature cells can start dividing again: that is dedifferentiation. The new dividing cells then mature into cells with jobs once more: that is redifferentiation. Think of it as specialise, go back, specialise again.",
      definition:
        "What NCERT says:\n" +
        "- **Differentiation**: cells from the root and shoot apical meristems and the cambium mature to do specific jobs. A **tracheary element** loses its protoplasm and builds a very strong, elastic, **lignocellulosic secondary wall** to carry water.\n" +
        "- **Dedifferentiation**: living differentiated cells, which had lost the capacity to divide, **regain** it.\n" +
        "- **Redifferentiation**: the cells these new meristems make lose the capacity to divide again and mature to do specific jobs.\n" +
        "- Differentiation in plants is **open**: cells from the same meristem end up different, and the final form depends on where the cell sits. Cells away from the root apical meristem become **root cap** cells; those pushed to the periphery become **epidermis**.\n" +
        "- **Totipotency** is the capacity to generate a **whole plant from any cell** (or explant). It is the basis of **plant tissue culture**.\n" +
        "- In tissue culture: **micropropagation** gives many plants genetically identical to the original, called **somaclones**; **meristem culture** (apical and axillary meristems) gives **virus free plants**; **protoplast fusion** of two plants (somatic hybridisation) gave the **pomato**, a hybrid of tomato and potato.",
      table: {
        columns: ["Process", "What happens", "NCERT example"],
        rows: [
          { cells: ["Differentiation", "Meristem cells mature into cells that do a specific job", "Tracheary elements lose protoplasm and form lignocellulosic secondary walls"] },
          {
            cells: ["Dedifferentiation", "Mature living cells regain the power to divide", "Interfascicular cambium and cork cambium formed from fully differentiated parenchyma cells"],
            noteAmber: "NEET 2024: interfascicular cambium from parenchyma is dedifferentiation, not redifferentiation.",
            pyqExampleId: "8313375a-74b8-4c07-a964-a3232280a9bb",
          },
          {
            cells: ["Callus formation", "Leaf mesophyll cells put in a culture medium start dividing and form a callus", "An example of dedifferentiation in tissue culture"],
            noteAmber: "NEET 2023: mesophyll cells forming a callus is dedifferentiation.",
            pyqExampleId: "8aa65c1f-3b71-4c92-b7ca-728096e5d14d",
          },
          { cells: ["Redifferentiation", "Cells cut off by the new meristems stop dividing again and mature", "Secondary xylem, secondary phloem and cork made by the two cambia"] },
          {
            cells: ["Totipotency", "Any plant cell can give rise to a whole plant", "The basis of plant tissue culture"],
            noteAmber: "NEET 2024: the capacity to generate a whole plant from any cell is totipotency.",
            pyqExampleId: "621ca59e-5f59-4395-8b8a-a931aac83c75",
          },
        ],
      },
      pyqExampleId: "8313375a-74b8-4c07-a964-a3232280a9bb",
      selfCheckExample: {
        prompt: "In a woody stem, the cork cambium has cut off cells that stop dividing and become cork. Which process made these cork cells, and which process made the cork cambium itself?",
        steps: [
          "The cork cambium arose from mature parenchyma cells that started dividing again: dedifferentiation.",
          "The cells it cuts off lose the power to divide and mature into cork: redifferentiation.",
        ],
        answer: "The cork cells come from redifferentiation; the cork cambium came from dedifferentiation.",
      },
      practiceSet: [
        { prompt: "What does a tracheary element lose as it differentiates?", answer: "Its protoplasm" },
        { prompt: "Which tissue culture method gives virus free plants?", answer: "Meristem culture" },
        { prompt: "What are the genetically identical plants made by micropropagation called?", answer: "Somaclones" },
        { prompt: "Which hybrid plant was made by fusing protoplasts of tomato and potato?", answer: "The pomato" },
        { prompt: "Root cells pushed to the periphery mature into which tissue?", answer: "The epidermis" },
      ],
      traps: [
        {
          title: "A new cambium is dedifferentiation",
          body: "Mature parenchyma turning into **interfascicular cambium** or **cork cambium** is **dedifferentiation**: the cells regain the power to divide. **Redifferentiation** is what the cambium's products do later, when they mature into xylem, phloem or cork.",
        },
        {
          title: "Somaclones come from micropropagation",
          body: "**Somaclones** are the identical plants of **micropropagation**. **Pomato** comes from **protoplast fusion**, and **virus free** plants from **meristem culture**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbopg-plasticity",
      name: "Development and plasticity",
      intuition:
        "Development is everything a plant goes through, from a germinating seed to old age. The same plant can make different kinds of leaves at different stages of life, or in different surroundings. This ability to follow different paths and build different structures is plasticity. Heterophylly, different leaf shapes on one plant, is the NCERT example.",
      definition:
        "What NCERT says:\n" +
        "- **Development** is the sum of all the changes a plant goes through in its life cycle, from **germination of the seed** to **senescence**. Development = growth + differentiation.\n" +
        "- **Plasticity**: plants follow different pathways in response to the **environment** or to **phases of life** to form different kinds of structures.\n" +
        "- **Heterophylly** (leaves of different shapes on one plant) is the example. In **cotton**, **coriander** and **larkspur** the leaves of the **juvenile** plant differ in shape from those of the **mature** plant.\n" +
        "- In **buttercup**, leaves formed in **air** and leaves formed in **water** differ in shape: heterophyllous development due to the **environment**.\n" +
        "- Development is controlled by **intrinsic** factors (genetic factors inside the cell, and chemicals between cells such as plant growth regulators) and **extrinsic** factors (light, temperature, water, oxygen, nutrition).",
      table: {
        columns: ["Plant", "What differs", "What causes it"],
        rows: [
          { cells: ["Cotton", "Leaves of the juvenile plant differ in shape from mature leaves", "Phase of life"] },
          { cells: ["Coriander", "Leaves of the juvenile plant differ in shape from mature leaves", "Phase of life"] },
          { cells: ["Larkspur", "Leaves of the juvenile plant differ in shape from mature leaves", "Phase of life"] },
          {
            cells: ["Buttercup", "Leaves formed in air differ in shape from leaves formed in water", "Environment"],
            noteAmber: "NEET 2026: heterophyllous development in response to the environment is plasticity.",
            pyqExampleId: "168daf9f-27c9-4f6f-9068-18c9bda9451e",
          },
        ],
      },
      pyqExampleId: "6ded87da-c228-4f43-8fb2-7efbf46d2794",
      selfCheckExample: {
        prompt: "A larkspur seedling has leaves of one shape and the same plant, when mature, has leaves of another shape. What is this kind of leaf variation called, what drives it here, and which ability of plants does it show?",
        steps: [
          "Leaves of different shapes on one plant is heterophylly.",
          "In larkspur the young and mature leaves differ, so the cause is the phase of life.",
          "Following different pathways to form different structures is plasticity.",
        ],
        answer: "Heterophylly, driven by the phase of life; it shows plasticity.",
      },
      practiceSet: [
        { prompt: "Between which two events does NCERT say plant development runs?", answer: "From germination of the seed to senescence" },
        { prompt: "In which plant do leaves formed in air and in water differ in shape?", answer: "Buttercup" },
        { prompt: "Development is the sum of which two processes?", answer: "Growth and differentiation" },
        { prompt: "Name two extrinsic factors that control plant development.", answer: "Any two of light, temperature, water, oxygen and nutrition" },
      ],
      traps: [
        {
          title: "Maize is not an NCERT plasticity example",
          body: "NCERT names **cotton**, **coriander**, **larkspur** and **buttercup** for heterophylly. A list that adds **maize** puts in a plant NCERT never uses for plasticity.",
        },
        {
          title: "Plasticity, not elasticity",
          body: "The ability to form different structures in response to environment or phase of life is **plasticity**. Elasticity and flexibility are not the NCERT term, and dedifferentiation is a different process.",
        },
      ],
    },
  ],
};
