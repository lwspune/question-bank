import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_SO_COCKROACH_NOTE: SubtopicNote = {
  subtopicName: "Earthworm and Cockroach",
  title: "Earthworm and Cockroach",
  oneLineDefinition:
    "The outer features of the earthworm, and the body plan and organ systems of the cockroach: segments, wings, mouth parts, gut, excretion, nerves and the sex organs.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2024, none since Re-NEET 2024. Seven are on the cockroach, three of them from 2024; the earthworm was asked once, in NEET 2021. Most of them ask where a part sits: which segment, which joint of the gut, or which sex has it.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoso-earthworm",
      name: "Earthworm: the outer body",
      intuition:
        "The earthworm is a long, ringed worm that lives in moist soil. Its body is a chain of similar segments. At the front, a small lobe hangs over the mouth and pushes into soil cracks. Around the middle, a thick glandular band marks the segments used in reproduction, and the openings of the sex organs sit on fixed segments.",
      definition:
        "NCERT's earthworm (*Pheretima*) is a **reddish brown** terrestrial invertebrate living in the **upper layer of moist soil**.\n" +
        "- The body has about **100 to 120 segments (metameres)**. A dark **mid-dorsal line** (the dorsal blood vessel) runs along the back; the ventral side carries the **genital openings**.\n" +
        "- The anterior end has the **mouth** and the **prostomium**, a lobe that **covers the mouth**, works as a **wedge to force open cracks** in the soil, and is **sensory**.\n" +
        "- The **first body segment** is the **peristomium** (buccal segment), which contains the mouth.\n" +
        "- In a mature worm, segments **14 to 16** carry a dark band of glandular tissue, the **clitellum**, which divides the body into **preclitellar, clitellar and postclitellar** regions.\n" +
        "- **Four pairs of spermathecal apertures** lie ventro-laterally in the intersegmental grooves of segments **5 to 9**. A **single female genital pore** is in the mid-ventral line of segment **14**; a **pair of male genital pores** is on segment **18**.\n" +
        "- Every segment, except the **first, the last and the clitellum**, has a ring of **S-shaped setae** in epidermal pits; they help in **locomotion**.",
      table: {
        columns: ["Feature", "Where", "Note"],
        rows: [
          {
            cells: ["Prostomium", "Anterior end, over the mouth", "Covers the mouth, wedges open soil cracks, sensory"],
          },
          { cells: ["Peristomium", "Segment 1", "The first segment; contains the mouth"] },
          { cells: ["Spermathecal apertures", "Grooves of segments 5 to 9", "Four pairs"] },
          { cells: ["Clitellum", "Segments 14 to 16", "Glandular band of a mature worm"] },
          { cells: ["Female genital pore", "Segment 14", "Single, mid-ventral"] },
          { cells: ["Male genital pores", "Segment 18", "One pair"] },
          { cells: ["Setae", "Every segment except the first, the last and the clitellum", "S-shaped; for locomotion"] },
        ],
      },
      pyqExampleId: "43822bea-cc57-4490-b390-cd54e9e016a4",
      selfCheckExample: {
        prompt: "Into which three regions does the clitellum divide the body of a mature earthworm?",
        steps: [
          "The clitellum covers segments 14 to 16.",
          "The segments in front of it, the clitellum itself and the segments behind it give three regions.",
        ],
        answer: "Preclitellar, clitellar and postclitellar.",
      },
      practiceSet: [
        { prompt: "Which segments of a mature earthworm are covered by the clitellum?", answer: "Segments 14 to 16" },
        { prompt: "On which segment of the earthworm is the single female genital pore?", answer: "Segment 14" },
        { prompt: "On which segment of the earthworm is the pair of male genital pores?", answer: "Segment 18" },
        { prompt: "Which segments of the earthworm have no setae?", answer: "The first segment, the last segment and the clitellum" },
      ],
      traps: [
        {
          title: "The prostomium is not a segment",
          body: "The **prostomium** is a lobe over the mouth. The **first segment** of the earthworm is the **peristomium**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoso-cockroach-body",
      name: "Cockroach: head, thorax and abdomen",
      intuition:
        "A cockroach is built in three parts. The head carries the eyes, feelers and chewing mouth parts. The thorax carries all six legs and both pairs of wings. The abdomen has ten segments, and its last few look different in males and females, which is where most questions come from.",
      definition:
        "NCERT's cockroach is *Periplaneta americana*: brown or black, **34 to 53 mm** long; in **males the wings extend beyond the tip of the abdomen**.\n" +
        "- The body has a hard brown **chitinous exoskeleton** of plates called **sclerites** (**tergites** on the back, **sternites** below) joined by a thin flexible **arthrodial membrane**.\n" +
        "- **Head:** triangular, formed by the **fusion of six segments**, very mobile because of a flexible neck. It has a pair of **compound eyes** and a pair of thread-like **antennae** with sensory receptors.\n" +
        "- **Mouth parts** (biting and chewing): **labrum** (upper lip), a pair of **mandibles**, a pair of **maxillae** and the **labium** (lower lip). A flexible lobe acting as the tongue, the **hypopharynx**, lies within the cavity enclosed by the mouth parts.\n" +
        "- **Thorax:** **prothorax, mesothorax and metathorax**; the head joins the thorax by a short extension of the prothorax, the neck. Each thoracic segment has a pair of **walking legs**.\n" +
        "- **Wings:** the first pair arises from the **mesothorax**, the second from the **metathorax**. The forewings, called **tegmina**, are opaque, dark and leathery and cover the hind wings at rest. The **hind wings** are transparent and membranous and are used in **flight**.\n" +
        "- **Abdomen:** **10 segments** in both sexes. In **females**, the boat-shaped **7th sternum** together with the **8th and 9th sterna** forms a brood or **genital pouch**, holding the female gonopore, the spermathecal pores and the collateral glands. In **males**, the genital pouch lies at the hind end, bounded above by the **9th and 10th terga** and below by the **9th sternum**.\n" +
        "- **Anal styles:** a pair of short, thread-like styles in **males only**. **Anal cerci:** a pair of jointed filaments on the **10th segment** in **both sexes**.",
      table: {
        columns: ["Part", "Where", "Which sex"],
        rows: [
          { cells: ["Compound eyes and antennae", "Head", "Both"] },
          { cells: ["Hypopharynx (tongue)", "Within the cavity enclosed by the mouth parts", "Both"] },
          { cells: ["Hind wings (membranous, used in flight)", "Metathorax", "Both"] },
          { cells: ["Genital pouch from 7th to 9th sterna", "Abdomen", "Female"] },
          {
            cells: ["Anal styles", "Hind end of the abdomen", "Male only"],
            noteAmber: "NEET 2023: anal styles were the feature found in the male but not the female.",
            pyqExampleId: "a71cef3b-244f-49c2-9bea-f36a1bea8fd8",
          },
          {
            cells: ["Anal cerci", "10th abdominal segment", "Both"],
            noteAmber: "NEET 2024: the anal cerci are on the 10th segment in both sexes.",
            pyqExampleId: "9b142047-a115-4b2f-a2f2-7a3d298e10bd",
          },
        ],
      },
      pyqExampleId: "5e0a10d2-b285-4bfa-96a8-e81d2e2bb1d3",
      selfCheckExample: {
        prompt: "In a male cockroach, which plates bound the genital pouch from above and which plate bounds it from below?",
        steps: [
          "The male genital pouch lies at the hind end of the abdomen.",
          "NCERT says it is bounded dorsally by the 9th and 10th terga and ventrally by the 9th sternum.",
        ],
        answer: "Above by the 9th and 10th terga; below by the 9th sternum.",
      },
      practiceSet: [
        { prompt: "How many segments fuse to form the head of a cockroach?", answer: "Six" },
        { prompt: "What are the hardened plates of the cockroach exoskeleton called on the back and on the underside?", answer: "Tergites on the back and sternites on the underside" },
        { prompt: "Name the four kinds of mouth parts of the cockroach, apart from the hypopharynx.", answer: "Labrum, a pair of mandibles, a pair of maxillae and the labium" },
        { prompt: "How many segments make up the abdomen of a cockroach?", answer: "Ten, in both sexes" },
        { prompt: "Which pair of wings does a cockroach use in flight?", answer: "The hind wings, which are transparent and membranous" },
      ],
      traps: [
        {
          title: "No wings arise from the prothorax",
          body: "The **tegmina** (forewings) arise from the **mesothorax** and the **hind wings** from the **metathorax**. The prothorax bears legs only.",
        },
        {
          title: "Anal styles are male, anal cerci are both",
          body: "**Anal styles** are present in **males only**. **Anal cerci** are on the **10th segment** of **both sexes**, so they cannot tell the sexes apart.",
        },
        {
          title: "The female genital pouch uses three sterna",
          body: "In females the boat-shaped **7th sternum** joins the **8th and 9th sterna** to form the genital pouch.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoso-cockroach-systems",
      name: "Cockroach: organ systems",
      intuition:
        "Inside, the cockroach's gut runs in three parts, with a storage bag and a grinding mill in front. Two rings of tubules mark the joints of the gut: one ring pours in digestive juice, the other pulls out waste. Blood flows in open spaces, air enters through holes along the sides, and the sex organs sit in fixed abdominal segments.",
      definition:
        "Digestive system: the alimentary canal has a **foregut, midgut and hindgut**.\n" +
        "- Mouth, pharynx, oesophagus, then the **crop**, a sac used for **storing food**, then the **gizzard (proventriculus)**, with thick circular muscles and a cuticle forming **six chitinous teeth**, which **grinds** the food. The whole foregut is lined by cuticle.\n" +
        "- A ring of **6 to 8 blind tubules**, the **hepatic or gastric caeca**, lies at the junction of the **foregut and midgut** and secretes digestive juice.\n" +
        "- A ring of **100 to 150 yellow, thin Malpighian tubules** lies at the junction of the **midgut and hindgut**; they remove excretory products from the haemolymph.\n" +
        "- The hindgut is broader than the midgut and has the **ileum, colon and rectum**; the rectum opens through the anus.\n\n" +
        "Other systems:\n" +
        "- **Circulation:** **open** type. Blood vessels are poorly developed and open into the **haemocoel**; the blood (**haemolymph**) is colourless plasma with haemocytes. The heart is an elongated muscular tube along the mid-dorsal line of the thorax and abdomen, made of funnel-shaped chambers with **ostia** on either side.\n" +
        "- **Respiration:** a network of **tracheae** opening through **10 pairs of spiracles** on the sides of the body. Gas exchange happens at the **tracheoles** by diffusion.\n" +
        "- **Excretion:** by **Malpighian tubules**, which turn nitrogenous waste into **uric acid** (so the cockroach is **uricotelic**). The **fat body, nephrocytes and urecose glands** also help.\n" +
        "- **Nervous system:** fused, segmentally arranged **ganglia** on the ventral side, **3 in the thorax and 6 in the abdomen**. The brain is the **supra-oesophageal ganglion**. Since most of the nervous system lies along the belly side, a cockroach can live for about **a week** after its head is cut off.\n" +
        "- **Compound eyes:** each has about **2000 hexagonal ommatidia**, giving **mosaic vision**: more sensitivity but less resolution, common at night.\n" +
        "- **Male:** a pair of **testes** in segments **4 to 6**; a **mushroom-shaped gland** in segments **6 and 7** is an accessory gland; sperms are glued into bundles called **spermatophores**. The phallic gland is also a male structure.\n" +
        "- **Female:** two large **ovaries** in segments **2 to 6**, each of **eight ovarioles**; a pair of **spermathecae** in segment **6**; **collateral glands** open into the genital pouch. Fertilised eggs are packed in **oothecae**; a female makes about **9 to 10 oothecae**, each with **14 to 16 eggs**.\n" +
        "- **Development** is **paurometabolous**: through **nymphs** that look like adults and moult about **13 times**; only the adult has wings.",
      table: {
        columns: ["Structure", "Where", "Job"],
        rows: [
          { cells: ["Crop", "Foregut, after the oesophagus", "Stores food"] },
          { cells: ["Gizzard (proventriculus)", "Foregut, after the crop", "Grinds food with six chitinous teeth"] },
          {
            cells: ["Gastric (hepatic) caeca", "Ring of 6 to 8 at the foregut and midgut junction", "Secrete digestive juice"],
            noteAmber: "NEET 2021: a ring of gastric caeca at the midgut and hindgut junction was the incorrect statement.",
            pyqExampleId: "79eaaca9-46dd-4485-a66a-957fc4c54abb",
          },
          { cells: ["Malpighian tubules", "Ring of 100 to 150 at the midgut and hindgut junction", "Remove excretory products; uric acid"] },
          {
            cells: ["Fat body, nephrocytes, urecose glands", "Body cavity", "Help in excretion"],
            noteAmber: "NEET 2023: excretion is by urecose glands, nephrocytes and the fat body, not the phallic or collateral glands.",
            pyqExampleId: "11154cfc-59ed-41e7-b5f2-4db89042068e",
          },
          { cells: ["Mushroom-shaped gland", "Segments 6 and 7, male", "Accessory reproductive gland"] },
          {
            cells: ["Spermathecae and collateral glands", "Segment 6 and the genital pouch, female", "Female reproductive structures"],
            noteAmber: "Re-NEET 2024: of collateral gland, mushroom gland, spermatheca, anal style and phallic gland, only the collateral gland and spermatheca are in the female.",
            pyqExampleId: "71499ebf-b7a7-4282-9335-8acd23f978ef",
          },
        ],
      },
      pyqExampleId: "8b1a7c67-655e-4660-a314-bf460afb40c7",
      selfCheckExample: {
        prompt: "A cockroach can stay alive for about a week after its head is cut off. Explain why.",
        steps: [
          "The head holds only a small part of the nervous system, the supra-oesophageal ganglion.",
          "The rest of the ganglia lie along the ventral (belly) side of the body, 3 in the thorax and 6 in the abdomen, so they keep working.",
        ],
        answer: "Most of its nervous system lies along the ventral side, not in the head.",
      },
      practiceSet: [
        { prompt: "How many pairs of spiracles does a cockroach have?", answer: "Ten pairs" },
        { prompt: "How many ganglia of the cockroach nerve cord lie in the thorax, and how many in the abdomen?", answer: "Three in the thorax and six in the abdomen" },
        { prompt: "About how many ommatidia make up one compound eye of a cockroach?", answer: "About 2000" },
        { prompt: "On average, how many oothecae does a female cockroach produce, and how many eggs does each hold?", answer: "About 9 to 10 oothecae, each with 14 to 16 eggs" },
        { prompt: "What type of development does the cockroach show?", answer: "Paurometabolous, through nymphs" },
      ],
      traps: [
        {
          title: "Caeca at the front joint, Malpighian tubules at the back joint",
          body: "The **gastric caeca** sit at the **foregut and midgut** junction; the **Malpighian tubules** sit at the **midgut and hindgut** junction.",
        },
        {
          title: "Crop stores, gizzard grinds",
          body: "The **crop** is the food store. The **gizzard**, with its six chitinous teeth, does the **grinding**.",
        },
        {
          title: "Reproductive glands are not excretory",
          body: "The **phallic gland** (male) and **collateral glands** (female) belong to the reproductive system. Excretion is by Malpighian tubules, the fat body, nephrocytes and urecose glands.",
        },
        {
          title: "The cockroach is uricotelic",
          body: "The cockroach excretes **uric acid**. The frog, in contrast, excretes **urea**.",
        },
      ],
    },
  ],
};
