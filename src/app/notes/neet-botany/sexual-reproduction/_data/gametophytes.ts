import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_SR_GAMETOPHYTES_NOTE: SubtopicNote = {
  subtopicName: "Pollen Grain and Embryo Sac",
  title: "Pollen Grain and Embryo Sac",
  oneLineDefinition:
    "The anther and the pollen grain it makes, then the ovule and the embryo sac inside it: the male and female gametophytes of a flowering plant, with the NCERT numbers and names.",
  whyItMatters:
    "Ten NEET questions: two EASY and eight MODERATE, from five of the eight papers. NEET 2025 asked three of them. The 8-nucleate, 7-celled embryo sac was asked twice, in NEET 2021 and NEET 2025, and most of the rest turn on one NCERT word: exine, tapetum, nucellus, synergid.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbosr-anther",
      name: "Anther and microsporogenesis",
      intuition:
        "A stamen is a stalk (the filament) carrying an anther. Cut the anther across and you see four pollen sacs, two in each lobe. Each sac has a wall of four layers around a mass of cells that will become pollen. NEET asks the numbers (lobes, theca, sacs), the job of each wall layer, and the order in which pollen forms.",
      definition:
        "The stamen and anther in NCERT:\n" +
        "- A stamen has a long slender stalk, the **filament**, and a terminal, generally **bilobed** structure, the **anther**. The far end of the filament is attached to the thalamus or the petal.\n" +
        "- A typical angiosperm anther is **bilobed**, and each lobe has **two theca**: the anther is **dithecous**. A groove runs lengthwise between the theca.\n" +
        "- The anther is a **four-sided** (tetragonal) structure with **four microsporangia** at the corners, **two in each lobe**. They develop further and become the **pollen sacs**.\n" +
        "- The microsporangium wall has **four layers**: **epidermis**, **endothecium**, **middle layers** and **tapetum**. The outer three protect the sporangium and help the anther burst open (dehisce) to release the pollen.\n" +
        "- The **tapetum** is the innermost layer. It **nourishes the developing pollen grains**. Its cells have **dense cytoplasm** and generally **more than one nucleus**.\n" +
        "- In a young anther the centre of each microsporangium is a group of compactly arranged, similar cells: the **sporogenous tissue**.\n" +
        "- **Microsporogenesis** is the making of microspores from a **pollen mother cell (PMC)** by **meiosis**. Each cell of the sporogenous tissue can act as a PMC. Its four microspores stay together as a **microspore tetrad**. As the anther matures and dries, the microspores separate and develop into **pollen grains**.",
      table: {
        columns: ["Stage", "What it is", "Division that makes the next stage"],
        rows: [
          { cells: ["Sporogenous tissue", "Compact, similar cells at the centre of a young microsporangium", "Each cell can act as a pollen mother cell"] },
          { cells: ["Pollen mother cell (PMC)", "A diploid cell of the sporogenous tissue", "Meiosis"] },
          { cells: ["Microspore tetrad", "Four haploid microspores held together in a cluster", "The microspores separate as the anther dries"] },
          { cells: ["Pollen grain", "A microspore that has matured; the male gametophyte", "Matures into a 2-celled grain with a vegetative cell and a generative cell"] },
        ],
        caption: "NEET 2026 asked these four stages in order.",
      },
      pyqExampleId: "a9808218-dc33-42cb-ab13-552617364ea1",
      selfCheckExample: {
        prompt: "Name the four wall layers of a microsporangium from outside to inside, and say which layer feeds the developing pollen.",
        steps: [
          "From outside: epidermis, then endothecium, then the middle layers.",
          "The innermost layer is the tapetum.",
          "The outer three protect the sporangium and help the anther burst open; the tapetum nourishes the developing pollen grains.",
        ],
        answer: "Epidermis, endothecium, middle layers, tapetum. The tapetum nourishes the developing pollen grains.",
      },
      practiceSet: [
        { prompt: "How many microsporangia does a typical angiosperm anther have?", answer: "Four, two in each lobe" },
        { prompt: "How many theca does each lobe of a typical angiosperm anther have?", answer: "Two (the anther is dithecous)" },
        { prompt: "What do the microsporangia of an anther become as they develop?", answer: "Pollen sacs" },
        { prompt: "Which kind of cell division turns a pollen mother cell into a microspore tetrad?", answer: "Meiosis" },
        { prompt: "Which wall layer of the microsporangium has cells with dense cytoplasm and usually more than one nucleus?", answer: "The tapetum" },
      ],
      traps: [
        {
          title: "Two theca per lobe, four sacs per anther",
          body: "A typical anther has **two lobes**, each with **two theca**, so it carries **four** microsporangia in all. Do not answer 4 for theca per lobe or 2 for sacs per anther.",
        },
        {
          title: "The tapetum feeds pollen grains",
          body: "NCERT says the tapetum **nourishes the developing pollen grains** and that its cells generally have **more than one nucleus**. It does not say the extra nuclei exist to feed pollen mother cells; NEET 2025 marked that reason false.",
        },
        {
          title: "Meiosis comes before the tetrad",
          body: "The order is **sporogenous tissue, pollen mother cell, microspore tetrad, pollen grain**. The tetrad is the product of meiosis, so it always follows the pollen mother cell.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbosr-pollen",
      name: "The pollen grain",
      intuition:
        "A pollen grain is the male gametophyte: a tiny plant body that will carry the male gametes to the egg. Its outer wall is one of the toughest things a living thing makes, which is why pollen lasts for thousands of years as fossils. Inside are just two cells, or three in some plants.",
      definition:
        "The pollen grain in NCERT:\n" +
        "- Pollen grains are the **male gametophytes**. They are generally spherical, about **25 to 50 micrometres** across.\n" +
        "- The wall has two layers. The hard outer **exine** is made of **sporopollenin**, one of the most resistant organic materials known: it stands high temperatures, strong acids and alkali, and **no enzyme that breaks it down is known**. So pollen is well preserved as **fossils**.\n" +
        "- The exine has gaps called **germ pores** where sporopollenin is absent.\n" +
        "- The inner **intine** is thin and continuous, made of **cellulose and pectin**.\n" +
        "- A mature pollen grain has two cells: a bigger **vegetative cell** with abundant food and a large, irregular nucleus, and a small, spindle-shaped **generative cell** floating in its cytoplasm.\n" +
        "- In **over 60%** of angiosperms pollen is shed at this **2-celled** stage. In the rest the generative cell divides by mitosis into **two male gametes** first, so the pollen is shed **3-celled**.\n" +
        "- Pollen of many plants causes allergies; *Parthenium* (carrot grass) came into India as a contaminant of imported wheat.\n" +
        "- Pollen can be stored for years in **liquid nitrogen at -196 °C**, in pollen banks.",
      table: {
        columns: ["Plants", "How long pollen stays viable after release"],
        rows: [
          { cells: ["Rice and wheat (cereals)", "About 30 minutes"] },
          {
            cells: ["Some members of Rosaceae, Leguminosae and Solanaceae", "Months"],
            noteAmber: "NEET 2021: Rosaceae and Leguminosae was the pair with months of viability; every option naming Poaceae was wrong.",
            pyqExampleId: "4ce2e80d-0616-450b-b938-24cccfc31056",
          },
          { cells: ["Any plant, stored in liquid nitrogen at -196 °C", "Years"] },
        ],
      },
      pyqExampleId: "cb1f44ff-e88f-452f-a703-49337b009da7",
      selfCheckExample: {
        prompt: "A pollen grain is shed with three cells instead of two. What has happened inside it before it was shed?",
        steps: [
          "A 2-celled pollen grain has a vegetative cell and a generative cell.",
          "The generative cell divides by mitosis into two male gametes.",
          "So the grain now has the vegetative cell and two male gametes.",
        ],
        answer: "Its generative cell has already divided by mitosis into two male gametes.",
      },
      practiceSet: [
        { prompt: "What are the gaps in the exine of a pollen grain, where sporopollenin is absent, called?", answer: "Germ pores" },
        { prompt: "What two substances make up the intine of a pollen grain?", answer: "Cellulose and pectin" },
        { prompt: "At what stage is pollen shed in over 60% of angiosperms?", answer: "The 2-celled stage" },
        { prompt: "Which of the two cells of a pollen grain is spindle-shaped and floats in the cytoplasm of the other?", answer: "The generative cell" },
        { prompt: "At what temperature are pollen grains stored for years in pollen banks?", answer: "-196 °C, in liquid nitrogen" },
      ],
      traps: [
        {
          title: "Sporopollenin is in the exine",
          body: "**Sporopollenin** is in the outer **exine**. The inner **intine** is cellulose and pectin. Fossil pollen survives because of the exine.",
        },
        {
          title: "Cereal pollen dies in about 30 minutes",
          body: "Rice and wheat pollen lose viability within about **30 minutes**. It is some members of **Rosaceae, Leguminosae and Solanaceae** whose pollen stays viable for **months**.",
        },
        {
          title: "The vegetative cell is the big one",
          body: "The **vegetative cell** is bigger and holds the food. The **generative cell** is small; it is the one that makes the two male gametes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbosr-ovule",
      name: "Ovule and megasporogenesis",
      intuition:
        "The ovule is the female sporangium. It hangs from the placenta on a stalk, is wrapped in one or two coats, and holds a food-rich mass of cells. One cell in that mass divides by meiosis, and only one of its four products survives to grow into the embryo sac.",
      definition:
        "The ovule in NCERT:\n" +
        "- The pistil has a **stigma**, a **style** and an **ovary**. Inside the ovary the **ovules** (megasporangia) arise from the **placenta**. An ovary may hold one ovule (wheat, paddy, mango) or many (papaya, water melon, orchids).\n" +
        "- **Funicle**: the stalk that attaches the ovule to the placenta. **Hilum**: the region where the body of the ovule fuses with the funicle.\n" +
        "- **Integuments**: one or two protective envelopes around the nucellus, open only at the tip, the **micropyle**. The basal end opposite the micropyle is the **chalaza**.\n" +
        "- **Nucellus**: the mass of cells inside the integuments. Its cells hold **abundant reserve food**. The embryo sac lies in the nucellus.\n" +
        "- **Megasporogenesis**: the ovule usually forms a single **megaspore mother cell (MMC)** in the micropylar region of the nucellus. It divides by **meiosis** into **four megaspores**. In most flowering plants **one** megaspore is functional and the other three degenerate. An embryo sac formed from a single megaspore is **monosporic**.\n" +
        "- The functional megaspore then goes through **three mitotic nuclear divisions** (2, then 4, then 8 nuclei) to form the embryo sac. These divisions are **free nuclear**: no cell walls form until the 8-nucleate stage.",
      table: {
        columns: ["Part of the ovule", "What it is or does"],
        rows: [
          { cells: ["Funicle", "The stalk joining the ovule to the placenta"] },
          { cells: ["Hilum", "The region where the body of the ovule fuses with the funicle"] },
          { cells: ["Integuments", "One or two protective envelopes around the nucellus"] },
          { cells: ["Micropyle", "The small opening at the tip of the integuments"] },
          { cells: ["Chalaza", "The basal end of the ovule, opposite the micropyle"] },
          {
            cells: ["Nucellus", "The mass of cells inside the integuments, with abundant reserve food"],
            noteAmber: "Re-NEET 2024: the nucellus was the part of the ovule that stores reserve food.",
            pyqExampleId: "127e5b18-8e63-4412-a81a-0562e04846dc",
          },
          { cells: ["Megaspore mother cell", "A large cell in the micropylar region of the nucellus that divides by meiosis"] },
        ],
      },
      pyqExampleId: "4b78ec27-1370-40e0-b00a-517d194a656d",
      selfCheckExample: {
        prompt: "In a flowering plant, a megaspore mother cell forms four megaspores. How many of them usually grow on, and what is this kind of embryo sac development called?",
        steps: [
          "The megaspore mother cell divides by meiosis into four megaspores.",
          "In most flowering plants one megaspore is functional and the other three degenerate.",
          "An embryo sac formed from a single megaspore is called monosporic.",
        ],
        answer: "Only one; the development is monosporic.",
      },
      practiceSet: [
        { prompt: "What is the stalk that attaches an ovule to the placenta called?", answer: "The funicle" },
        { prompt: "What is the basal end of an ovule, opposite the micropyle, called?", answer: "The chalaza" },
        { prompt: "Name two plants whose ovary holds a single ovule.", answer: "Any two of wheat, paddy and mango" },
        { prompt: "In which region of the nucellus does the megaspore mother cell form?", answer: "The micropylar region" },
        { prompt: "What are nuclear divisions not followed at once by cell wall formation called?", answer: "Free nuclear divisions" },
      ],
      traps: [
        {
          title: "Food is in the nucellus, not the integuments",
          body: "The **integuments** only protect. The **nucellus** inside them is the tissue with abundant **reserve food**, and the embryo sac lies within it.",
        },
        {
          title: "One meiosis, three mitoses",
          body: "From megaspore mother cell to mature embryo sac there is **one meiosis** (MMC to four megaspores) and then **three mitoses** of the functional megaspore nucleus (to 2, 4 and 8 nuclei).",
        },
        {
          title: "Hilum is not the micropyle",
          body: "The **hilum** is where the ovule body meets the funicle. The **micropyle** is the opening at the tip of the integuments.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbosr-embryo-sac",
      name: "The embryo sac",
      intuition:
        "The embryo sac is the female gametophyte. After its eight nuclei form, walls go up around six of them, and the last two share one big cell in the middle. So it has 8 nuclei but only 7 cells, and NEET asks this count again and again.",
      definition:
        "The mature embryo sac in NCERT:\n" +
        "- After the 8-nucleate stage, cell walls form. **Six** nuclei are organised into cells; the other two, the **polar nuclei**, lie below the egg apparatus in the large **central cell**.\n" +
        "- **Egg apparatus**: the three cells at the **micropylar end**: **two synergids** and **one egg cell**.\n" +
        "- **Antipodals**: the three cells at the **chalazal end**.\n" +
        "- The **synergids** have special cellular thickenings at the micropylar tip called the **filiform apparatus**, which guides the pollen tube into the synergid.\n" +
        "- So a typical angiosperm embryo sac at maturity is **8-nucleate and 7-celled**: 3 antipodals, 2 synergids, 1 egg and 1 central cell with 2 polar nuclei.\n" +
        "- Every cell of the embryo sac is **haploid**, since it comes from a haploid megaspore by mitosis.",
      table: {
        columns: ["Cells", "How many", "Where they sit"],
        rows: [
          {
            cells: ["Synergids", "2", "Micropylar end, in the egg apparatus"],
            noteAmber: "Re-NEET 2026: the synergids were the cells that guide the pollen tube.",
          },
          { cells: ["Egg cell", "1", "Micropylar end, in the egg apparatus"] },
          { cells: ["Central cell", "1, with 2 polar nuclei", "The middle, below the egg apparatus"] },
          { cells: ["Antipodals", "3", "Chalazal end"] },
          {
            cells: ["Total", "7 cells, 8 nuclei", "The whole embryo sac"],
            noteAmber: "NEET 2021: the mature embryo sac was 8-nucleate and 7-celled.",
            pyqExampleId: "23490e30-75e2-4ced-895b-1f6ceee7b3ae",
          },
        ],
      },
      pyqExampleId: "d14936cc-7487-414e-9635-084d526aa13e",
      selfCheckExample: {
        prompt: "Why is every cell of an angiosperm embryo sac haploid?",
        steps: [
          "The embryo sac grows from one functional megaspore.",
          "The megaspore is a product of meiosis of the megaspore mother cell, so it is haploid.",
          "All later nuclei of the embryo sac come from it by mitosis, which keeps the chromosome number the same.",
        ],
        answer: "It forms from a haploid megaspore by mitosis alone, so all its cells stay haploid.",
      },
      practiceSet: [
        { prompt: "How many antipodal cells does a typical angiosperm embryo sac have, and at which end?", answer: "Three, at the chalazal end" },
        { prompt: "What are the thickenings at the micropylar tip of the synergids called?", answer: "The filiform apparatus" },
        { prompt: "In which cell of the embryo sac do the two polar nuclei lie?", answer: "The large central cell" },
        { prompt: "Are the antipodal cells of an embryo sac haploid or diploid?", answer: "Haploid" },
      ],
      traps: [
        {
          title: "Polar nuclei are not in the egg apparatus",
          body: "The egg apparatus is **two synergids and one egg**. The **two polar nuclei** sit **below** it, in the **central cell**.",
        },
        {
          title: "8 nuclei, 7 cells",
          body: "The central cell holds **two** nuclei, so the embryo sac has **8 nuclei** in **7 cells**. Options that say 7-nucleate or 8-celled are wrong.",
        },
        {
          title: "Synergids guide the pollen tube",
          body: "The **filiform apparatus** of the **synergids** guides the pollen tube. Antipodals and the central cell do not.",
        },
      ],
    },
  ],
};
