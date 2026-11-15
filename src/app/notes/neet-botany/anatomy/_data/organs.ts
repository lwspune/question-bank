import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_AN_ORGANS_NOTE: SubtopicNote = {
  subtopicName: "Tissue Systems, Root, Stem and Leaf",
  title: "Tissue Systems, Root, Stem and Leaf",
  oneLineDefinition:
    "The epidermal, ground and vascular tissue systems, the kinds of vascular bundle, and how the dicot and monocot root, stem and leaf differ in a cross-section.",
  whyItMatters:
    "Seven NEET questions from 2022 to 2026, six of them from 2024 or later. Bulliform cells were asked twice (NEET 2024 and NEET 2026); the others asked about guard cell walls, the monocot stem, the dicot leaf and a match on endodermis, conjunctive tissue and subsidiary cells.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nboan-tissue-systems",
      name: "Epidermal, ground and vascular tissue systems",
      intuition:
        "Tissues work in three big teams. The epidermal system is the skin: the epidermis, its pores and its hairs. The vascular system is the plumbing: xylem and phloem in bundles. The ground system is everything else in between. Many questions simply ask which named cell belongs where.",
      definition:
        "Epidermal tissue system (epidermal cells, stomata, hairs):\n" +
        "- The **epidermis** is the outermost layer, usually **single-layered**, of elongated, compactly arranged parenchyma cells with little cytoplasm and a large vacuole.\n" +
        "- A waxy **cuticle** outside it prevents water loss. The cuticle is **absent in roots**.\n" +
        "- **Stomata** regulate transpiration and gas exchange. Each has two **bean-shaped guard cells** around the pore (**dumb-bell shaped in grasses**). The **outer walls** of guard cells (away from the pore) are **thin**; the **inner walls** (towards the pore) are **highly thickened**. Guard cells have **chloroplasts**.\n" +
        "- **Subsidiary cells** are epidermal cells near the guard cells that are specialised in shape and size. Pore, guard cells and subsidiary cells together form the **stomatal apparatus**.\n" +
        "- **Root hairs** are **unicellular** outgrowths of epidermal cells that absorb water and minerals. On the stem the hairs are **trichomes**: usually **multicellular**, branched or unbranched, soft or stiff, sometimes secretory; they help prevent water loss.\n\n" +
        "Ground tissue system:\n" +
        "- **All tissues except the epidermis and vascular bundles**: parenchyma, collenchyma and sclerenchyma. Parenchyma lies in the **cortex, pericycle, pith and medullary rays**. In leaves the ground tissue is the **mesophyll**, thin-walled cells with chloroplasts.\n" +
        "- The **endodermis** is the innermost layer of the cortex. In the root its walls carry **Casparian strips** of waxy, water-impermeable **suberin**; in the dicot stem its cells are rich in starch, so it is called the **starch sheath**.\n" +
        "- **Conjunctive tissue** is the parenchyma lying **between the xylem and the phloem** of a root.\n\n" +
        "Vascular tissue system (xylem and phloem in vascular bundles):\n" +
        "- **Open:** cambium between xylem and phloem, so secondary tissue can form (dicot stems). **Closed:** no cambium (monocots).\n" +
        "- **Radial:** xylem and phloem on **different radii**, alternating (roots). **Conjoint:** xylem and phloem on the **same radius** (stems and leaves), usually with the phloem on the **outer side** of the xylem.",
      table: {
        columns: ["Term", "What it is", "Where"],
        rows: [
          { cells: ["Cuticle", "Waxy layer that prevents water loss", "Outside the epidermis; absent in roots"] },
          {
            cells: ["Guard cells", "Pair of cells around the stomatal pore, with chloroplasts; thin outer walls, highly thickened inner walls", "Bean-shaped in most plants; dumb-bell shaped in grasses"],
            noteAmber: "NEET 2024: the guard cell is the cell with thin outer walls and highly thickened inner walls.",
          },
          { cells: ["Subsidiary cells", "Epidermal cells specialised in shape and size", "Next to the guard cells, in the stomatal apparatus"] },
          { cells: ["Trichomes", "Epidermal hairs, usually multicellular, sometimes secretory", "On the stem and shoot"] },
          { cells: ["Casparian strips", "Suberin deposits on the tangential and radial walls of endodermal cells", "Root endodermis"] },
          { cells: ["Starch sheath", "Endodermis whose cells are rich in starch grains", "Dicot stem"] },
          { cells: ["Conjunctive tissue", "Parenchyma between the xylem and the phloem", "Root"] },
          { cells: ["Mesophyll", "Thin-walled ground tissue with chloroplasts", "Leaf"] },
        ],
      },
      pyqExampleId: "c401fa62-7b45-45a5-918f-3bf10847dac4",
      selfCheckExample: {
        prompt: "A peel of a leaf shows stomata whose guard cells are shaped like dumb-bells. From what kind of plant is the leaf likely to be?",
        steps: [
          "In most plants guard cells are bean-shaped.",
          "Dumb-bell shaped guard cells are the mark of grasses.",
        ],
        answer: "A grass.",
      },
      practiceSet: [
        { prompt: "Name the three tissue systems of a flowering plant.", answer: "Epidermal, ground (fundamental) and vascular (conducting)" },
        { prompt: "What does the cuticle do, and in which organ is it absent?", answer: "It prevents water loss; it is absent in roots" },
        { prompt: "Are root hairs unicellular or multicellular?", answer: "Unicellular: each is an elongation of one epidermal cell" },
        { prompt: "What is a vascular bundle with cambium between its xylem and phloem called?", answer: "An open vascular bundle" },
        { prompt: "In a conjoint vascular bundle, where does the phloem usually lie?", answer: "On the outer side of the xylem" },
      ],
      traps: [
        {
          title: "Guard cell walls: thin outside, thick inside",
          body: "The wall **away from the pore** (outer) is **thin**; the wall **towards the pore** (inner) is **highly thickened**. The reversed pairing is false.",
        },
        {
          title: "Radial in roots, conjoint in stems and leaves",
          body: "**Radial** bundles (xylem and phloem on different radii) are the **root** pattern. **Conjoint** bundles are found in **stems and leaves**.",
        },
        {
          title: "Casparian strips are suberin in the endodermis",
          body: "Casparian strips are **suberin** on the walls of **endodermal** cells. The **starch sheath** is the starch-rich endodermis of the stem, a different label for a different organ.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboan-root-stem",
      name: "Dicot and monocot root and stem",
      intuition:
        "Read a cross-section from outside to centre: epidermis, cortex, endodermis, pericycle, vascular bundles, pith. Then look for the clues that tell the four organs apart: how many xylem patches, whether the bundles form a ring or lie scattered, what the hypodermis is made of, and how big the pith is.",
      definition:
        "Dicot root (sunflower):\n" +
        "- Epidermis with many **unicellular root hairs**. Cortex of thin-walled parenchyma with intercellular spaces.\n" +
        "- **Endodermis:** a single layer of **barrel-shaped** cells with no intercellular spaces, with **Casparian strips** of suberin on the tangential and radial walls.\n" +
        "- **Pericycle:** a few layers of thick-walled parenchyma; **lateral roots** and the **vascular cambium** (during secondary growth) start here.\n" +
        "- **Two to four** xylem and phloem patches, with **conjunctive tissue** between them; pith small or inconspicuous. Pericycle, vascular bundles and pith make the **stele**.\n\n" +
        "Monocot root: the same layers, but usually **more than six (polyarch)** xylem bundles, a **large, well-developed pith**, and **no secondary growth**.\n\n" +
        "Dicot stem:\n" +
        "- Epidermis with a thin cuticle, maybe trichomes and a few stomata.\n" +
        "- Cortex in three parts: a **collenchymatous hypodermis** (strength to the young stem), rounded thin-walled parenchyma, and the **endodermis (starch sheath)**.\n" +
        "- **Pericycle** inside the endodermis, above the phloem, as **semi-lunar patches of sclerenchyma**. **Medullary rays** of radially placed parenchyma lie between the bundles.\n" +
        "- Bundles in a **ring**, each **conjoint, open, with endarch protoxylem**; a large parenchymatous **pith** in the centre.\n\n" +
        "Monocot stem:\n" +
        "- **Sclerenchymatous hypodermis**; many **scattered** bundles, each in a **sclerenchymatous bundle sheath**, in a large parenchymatous ground tissue.\n" +
        "- Bundles **conjoint and closed**; peripheral bundles smaller than central ones; **phloem parenchyma absent**; **water-containing cavities** in the bundles.",
      table: {
        columns: ["Feature", "Dicot root", "Monocot root", "Dicot stem", "Monocot stem"],
        rows: [
          { cells: ["Xylem bundles", "Two to four patches, radial", "More than six (polyarch), radial", "Conjoint and open, in a ring", "Conjoint and closed, scattered"] },
          { cells: ["Protoxylem", "Exarch", "Exarch", "Endarch", "Endarch, as in stems generally"] },
          { cells: ["Outer cortex", "Thin-walled parenchyma", "Thin-walled parenchyma", "Collenchymatous hypodermis", "Sclerenchymatous hypodermis"] },
          { cells: ["Pith", "Small or inconspicuous", "Large and well developed", "Large, of rounded parenchyma", "A large, conspicuous parenchymatous ground tissue"] },
          { cells: ["Secondary growth", "Yes", "No", "Yes", "No"] },
        ],
      },
      pyqExampleId: "407a36b5-c3eb-4f36-9533-3cff799a49a3",
      selfCheckExample: {
        prompt: "A root cross-section shows eight radially arranged xylem bundles and a large, well-developed pith. Is it a dicot or a monocot root?",
        steps: [
          "A dicot root usually has only two to four xylem patches and a small pith.",
          "More than six xylem bundles (polyarch) with a large pith is the monocot root.",
        ],
        answer: "A monocot root.",
      },
      practiceSet: [
        { prompt: "In a dicot root, in which layer do lateral roots start?", answer: "The pericycle" },
        { prompt: "Which tissues together make the stele of a dicot root?", answer: "All tissues inside the endodermis: the pericycle, vascular bundles and pith" },
        { prompt: "What arrangement of vascular bundles is characteristic of a dicot stem?", answer: "A ring" },
        { prompt: "In a dicot stem, in what form does the pericycle lie above the phloem?", answer: "As semi-lunar patches of sclerenchyma" },
        { prompt: "What shape are the endodermal cells of a dicot root, and do they have intercellular spaces?", answer: "Barrel-shaped, with no intercellular spaces" },
      ],
      traps: [
        {
          title: "Hypodermis: collenchyma in dicots, sclerenchyma in monocots",
          body: "The **dicot stem** hypodermis is **collenchymatous**; the **monocot stem** hypodermis is **sclerenchymatous**. A parenchymatous hypodermis is wrong for both.",
        },
        {
          title: "Polyarch means monocot root",
          body: "**More than six** xylem bundles (polyarch) marks a **monocot root**; a **dicot root** has **two to four** patches.",
        },
        {
          title: "Monocot roots and stems do not thicken",
          body: "Monocots have **closed** bundles and **no secondary growth**. A cambium ring forms only in the **dicot** root and stem.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nboan-leaf",
      name: "Dicot and monocot leaf",
      intuition:
        "A dicot leaf lies flat with one face to the sun, so its two faces differ: the upper side packs photosynthetic cells in tall columns and keeps few stomata. A grass leaf stands more upright and its two faces are alike. Grasses also carry special water-filled cells that let the leaf roll up in a drought.",
      definition:
        "Dicot (dorsiventral) leaf:\n" +
        "- **Epidermis** on the upper (**adaxial**) and lower (**abaxial**) surface, with a conspicuous cuticle. The **abaxial epidermis generally bears more stomata**; the adaxial may even lack them.\n" +
        "- The tissue between the two epidermises is the **mesophyll**, parenchyma with chloroplasts that does photosynthesis. The **palisade parenchyma** is **adaxial**, of elongated cells arranged **vertically and parallel** to each other. The **spongy parenchyma**, of oval or round, loosely arranged cells with large spaces and air cavities, lies below it and reaches the lower epidermis.\n" +
        "- Vascular bundles in the veins and midrib vary in size with the veins (**reticulate venation**) and are surrounded by thick-walled **bundle sheath cells**.\n\n" +
        "Monocot (isobilateral) leaf:\n" +
        "- **Stomata on both surfaces**; the mesophyll is **not differentiated** into palisade and spongy parenchyma.\n" +
        "- In **grasses**, some **adaxial epidermal cells along the veins** become large, empty, colourless **bulliform cells**. When turgid, the leaf surface is exposed; when **flaccid in water stress**, they make the leaf **curl inwards to minimise water loss**.\n" +
        "- **Parallel venation** shows as vascular bundles of **near similar size** (except in the main veins).",
      table: {
        columns: ["Feature", "Dicot (dorsiventral) leaf", "Monocot (isobilateral) leaf"],
        rows: [
          { cells: ["Stomata", "More on the abaxial (lower) epidermis; the adaxial may have none", "On both surfaces"] },
          { cells: ["Mesophyll", "Palisade (adaxial, elongated, vertical, parallel) over spongy (loose, with air spaces)", "Not differentiated into palisade and spongy"] },
          {
            cells: ["Bulliform cells", "None", "In grasses: large, empty, colourless adaxial cells along the veins; curl the leaf inwards in water stress"],
            noteAmber: "NEET 2024 and NEET 2026: bulliform cells curl the leaf inwards to minimise water loss.",
            pyqExampleId: "b5c3744b-7b6b-4e6b-a21e-eedf80dff3cd",
          },
          { cells: ["Venation", "Reticulate; bundle size varies with the vein", "Parallel; bundles of near similar size except the main veins"] },
        ],
      },
      pyqExampleId: "bf31f1f3-5ff9-4625-ace1-a6d3b4fdb042",
      selfCheckExample: {
        prompt: "A leaf section shows stomata on both surfaces and a mesophyll with no separate palisade layer. Is it a dorsiventral or an isobilateral leaf?",
        steps: [
          "A dorsiventral (dicot) leaf has palisade over spongy parenchyma and most stomata on the lower side.",
          "Stomata on both surfaces with an undifferentiated mesophyll is the isobilateral (monocot) leaf.",
        ],
        answer: "An isobilateral (monocot) leaf.",
      },
      practiceSet: [
        { prompt: "What is the tissue between the upper and lower epidermis of a leaf called?", answer: "The mesophyll" },
        { prompt: "Describe the spongy parenchyma of a dicot leaf.", answer: "Oval or round, loosely arranged cells with large spaces and air cavities, lying below the palisade and reaching the lower epidermis" },
        { prompt: "What surrounds each vascular bundle in a dicot leaf?", answer: "A layer of thick-walled bundle sheath cells" },
        { prompt: "Why are the vascular bundles of a monocot leaf of nearly the same size?", answer: "Because of its parallel venation" },
        { prompt: "From which epidermis, upper or lower, do the bulliform cells of a grass leaf arise?", answer: "The upper (adaxial) epidermis, along the veins" },
      ],
      traps: [
        {
          title: "Bulliform cells are not bundle sheath cells",
          body: "The large, empty, colourless cells along grass veins are **bulliform cells**, part of the **adaxial epidermis**. **Bundle sheath cells** are the thick-walled layer around each vascular bundle.",
        },
        {
          title: "Bulliform cells curl the leaf when they go flaccid",
          body: "The leaf **curls inwards** when bulliform cells are **flaccid** in water stress, to cut water loss. They do not store sugar or protect against salt.",
        },
        {
          title: "Fewer stomata on the upper side of a dicot leaf",
          body: "In a **dicot** leaf the **abaxial (lower)** epidermis has **more** stomata. Only the **monocot** leaf has stomata on both surfaces.",
        },
      ],
    },
  ],
};
