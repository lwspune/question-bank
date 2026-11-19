import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_EX_ORGANS_NOTE: SubtopicNote = {
  subtopicName: "Wastes and Excretory Organs",
  title: "Wastes and Excretory Organs",
  oneLineDefinition:
    "Ammonia, urea and uric acid and the animals that excrete each, the excretory structures of invertebrates, and the human kidney and its nephrons.",
  whyItMatters:
    "Four NEET questions from 2022 to 2024, none since 2024: a pellet or paste waste (NEET 2022), a match of animals with their excretory structures and an assertion on the two kinds of nephron (both NEET 2023), and a statement on juxta medullary nephrons (NEET 2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoex-wastes",
      name: "Ammonia, urea and uric acid",
      intuition:
        "Breaking down proteins leaves ammonia, which is poisonous. An animal in water can wash it away at once, because water is all around it. An animal on land cannot spare that much water, so it turns ammonia into something safer: urea, or uric acid, which needs almost no water at all.",
      definition:
        "Animals give out nitrogenous waste in three main forms:\n" +
        "- **Ammonia** is the **most toxic** and needs **large amounts of water** to remove.\n" +
        "- **Uric acid** is the **least toxic** and can be removed with a **minimum loss of water**.\n" +
        "- **Urea** lies between the two.\n\n" +
        "Ammonia is readily soluble. As ammonium ions it leaves by **diffusion across body surfaces**, or through the **gill surfaces** in fish. **Kidneys do not play any significant role** in its removal.\n\n" +
        "In ureotelic animals the ammonia made by metabolism is **converted into urea in the liver**, released into the blood, then filtered and excreted by the kidneys. Some urea may be **retained in the kidney matrix** of some animals to keep a desired osmolarity.\n\n" +
        "Moving to land meant making the less toxic wastes, urea and uric acid, to conserve water.",
      table: {
        columns: ["Mode", "Waste and how it leaves", "Animals NCERT names"],
        rows: [
          { cells: ["Ammonotelism", "Ammonia, as ammonium ions, by diffusion through the body surface or the gills", "Many bony fishes, aquatic amphibians, aquatic insects"] },
          { cells: ["Ureotelism", "Urea, made from ammonia in the liver and excreted by the kidneys", "Mammals, many terrestrial amphibians, marine fishes"] },
          { cells: ["Uricotelism", "Uric acid, as a pellet or paste, with a minimum loss of water", "Reptiles, birds, land snails, insects"] },
        ],
      },
      pyqExampleId: "cd7f828c-3a3c-4509-8e3b-df2a1917e788",
      selfCheckExample: {
        prompt: "Why do land snails and reptiles excrete uric acid rather than ammonia?",
        steps: [
          "Ammonia is the most toxic waste and needs large amounts of water to remove.",
          "Uric acid is the least toxic and can be removed with a minimum loss of water, which suits life on land.",
        ],
        answer: "Uric acid saves water: it is the least toxic waste and leaves with very little water.",
      },
      practiceSet: [
        { prompt: "Which nitrogenous waste is the most toxic and needs the most water for its removal?", answer: "Ammonia" },
        { prompt: "In which organ is ammonia converted into urea in ureotelic animals?", answer: "The liver" },
        { prompt: "By NCERT's list, are marine fishes mainly ammonotelic or ureotelic?", answer: "Ureotelic" },
        { prompt: "Through which surfaces does a bony fish lose ammonia?", answer: "The gill surfaces, by diffusion as ammonium ions" },
        { prompt: "Are aquatic amphibians ammonotelic, ureotelic or uricotelic?", answer: "Ammonotelic" },
      ],
      traps: [
        {
          title: "Kidneys do not remove ammonia",
          body: "In ammonotelic animals ammonia leaves by **diffusion across the body surface or the gills**. NCERT says the **kidneys play no significant role** in removing it.",
        },
        {
          title: "Not every fish is ammonotelic",
          body: "**Many bony fishes** are ammonotelic, but NCERT lists **marine fishes** among the **ureotelic** animals, with mammals and many terrestrial amphibians.",
        },
        {
          title: "Aquatic insects differ from other insects",
          body: "Insects as a group are **uricotelic**, but NCERT names **aquatic insects** as **ammonotelic**. Read which insect a statement is about.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoex-organs",
      name: "Excretory structures across the animal kingdom",
      intuition:
        "Most invertebrates use simple tubes to collect waste and spare water. Vertebrates use a far more complex set of tubes packed into kidneys. Learn each tube by its name and the animals that carry it.",
      definition:
        "Most invertebrates have **simple tubular** excretory structures; vertebrates have **complex tubular organs called kidneys**.\n" +
        "- **Protonephridia (flame cells):** Platyhelminthes (flatworms, e.g. *Planaria*), rotifers, some annelids and the cephalochordate *Amphioxus*. They mainly do **ionic and fluid volume regulation**, that is osmoregulation.\n" +
        "- **Nephridia:** earthworms and other annelids. They remove nitrogenous wastes and keep the fluid and ionic balance.\n" +
        "- **Malpighian tubules:** most insects, including cockroaches. They remove nitrogenous wastes and help in osmoregulation.\n" +
        "- **Antennal glands (green glands):** crustaceans such as prawns.\n\n" +
        "The NEET 2023 match also used two pairs from outside this list: *Paramoecium* with its **contractile vacuole**, and the cockroach (*Periplaneta*) with **urecose glands**, which help the Malpighian tubules in excretion.",
      table: {
        columns: ["Structure", "Found in", "Main job"],
        rows: [
          { cells: ["Protonephridia (flame cells)", "Flatworms such as Planaria, rotifers, some annelids, Amphioxus", "Ionic and fluid volume regulation (osmoregulation)"] },
          { cells: ["Nephridia", "Earthworms and other annelids", "Remove nitrogenous wastes; keep fluid and ionic balance"] },
          { cells: ["Malpighian tubules", "Most insects, including cockroaches", "Remove nitrogenous wastes; osmoregulation"] },
          { cells: ["Antennal glands (green glands)", "Crustaceans such as prawns", "Excretion"] },
          { cells: ["Kidneys", "Vertebrates", "Complex tubular organs for excretion"] },
        ],
      },
      pyqExampleId: "985c7b0b-fbd8-4927-b26d-cb5693afba3d",
      selfCheckExample: {
        prompt: "Name the excretory structure of Amphioxus and of a prawn.",
        steps: [
          "Amphioxus is the one chordate NCERT lists with protonephridia (flame cells).",
          "Crustaceans such as prawns excrete through antennal glands, also called green glands.",
        ],
        answer: "Amphioxus: protonephridia (flame cells). Prawn: antennal (green) glands.",
      },
      practiceSet: [
        { prompt: "What are the excretory structures of most insects called?", answer: "Malpighian tubules" },
        { prompt: "What is the other name of the antennal glands of crustaceans?", answer: "Green glands" },
        { prompt: "What is the main job of protonephridia?", answer: "Ionic and fluid volume regulation, that is osmoregulation" },
        { prompt: "Which cephalochordate has protonephridia?", answer: "Amphioxus" },
        { prompt: "What are the complex tubular excretory organs of vertebrates called?", answer: "Kidneys" },
      ],
      traps: [
        {
          title: "A chordate with flame cells",
          body: "Protonephridia are not only in flatworms: NCERT also lists **rotifers, some annelids and the cephalochordate *Amphioxus***.",
        },
        {
          title: "Protonephridia mainly osmoregulate",
          body: "NCERT says protonephridia are **primarily concerned with ionic and fluid volume regulation** (osmoregulation), not mainly with removing nitrogenous waste.",
        },
        {
          title: "Nephridia belong to annelids",
          body: "**Nephridia** are the excretory tubes of **earthworms and other annelids**. Insects such as the cockroach use **Malpighian tubules**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoex-kidney",
      name: "The human excretory system and the kidney",
      intuition:
        "Picture a bean the size of a fist, tucked against the back wall of the abdomen. A dent on its inner side lets tubes and vessels in. Inside, a pale outer zone wraps darker cones that point into a funnel, and the funnel drains into the ureter.",
      definition:
        "The human excretory system is **a pair of kidneys, one pair of ureters, a urinary bladder and a urethra**.\n\n" +
        "The kidneys are **reddish brown, bean shaped** and lie **between the levels of the last thoracic and the third lumbar vertebra**, close to the dorsal inner wall of the abdominal cavity.\n\n" +
        "Inside a kidney:\n" +
        "- The **hilum** is a notch on the inner concave surface; the ureter, blood vessels and nerves enter through it.\n" +
        "- Inner to the hilum is the broad, funnel shaped **renal pelvis**, with projections called **calyces**.\n" +
        "- A tough **capsule** covers the kidney. Inside are an outer **cortex** and an inner **medulla**.\n" +
        "- The medulla is divided into a few conical **medullary pyramids** that project into the calyces.\n" +
        "- The cortex extends between the pyramids as **renal columns, the columns of Bertini**.\n\n" +
        "Each kidney has **nearly one million nephrons**, the functional units of the kidney.",
      table: {
        columns: ["Feature", "NCERT fact"],
        rows: [
          { cells: ["Length of an adult kidney", "10 to 12 cm"] },
          { cells: ["Width", "5 to 7 cm"] },
          { cells: ["Thickness", "2 to 3 cm"] },
          { cells: ["Average weight", "120 to 170 g"] },
          { cells: ["Position", "Between the last thoracic and the third lumbar vertebra"] },
          { cells: ["Columns of Bertini", "Cortex extending between the medullary pyramids"] },
          { cells: ["Nephrons in each kidney", "Nearly one million"] },
        ],
      },
      pyqExampleId: "dcb2a568-4708-4fe6-aa47-ba080b85a7f6",
      selfCheckExample: {
        prompt: "Inside a kidney, what are the medullary pyramids and the columns of Bertini?",
        steps: [
          "The medulla is divided into a few conical masses, the medullary pyramids, which project into the calyces.",
          "The cortex reaches in between these pyramids as renal columns, called the columns of Bertini.",
        ],
        answer: "Pyramids are conical masses of the medulla; the columns of Bertini are cortex lying between them.",
      },
      practiceSet: [
        { prompt: "What is the average weight of an adult human kidney?", answer: "120 to 170 g" },
        { prompt: "What enters the kidney through the hilum?", answer: "The ureter, blood vessels and nerves" },
        { prompt: "What are the projections of the renal pelvis called?", answer: "Calyces" },
        { prompt: "Between which vertebrae do the human kidneys lie?", answer: "Between the last thoracic and the third lumbar vertebra" },
        { prompt: "About how many nephrons does each human kidney have?", answer: "Nearly one million" },
      ],
      traps: [
        {
          title: "The columns of Bertini are cortex",
          body: "The tissue between the medullary pyramids is **cortex**, the **columns of Bertini**. It is not the renal pelvis, which is the funnel shaped space inside the hilum.",
        },
        {
          title: "The hilum is on the concave side",
          body: "The **hilum** sits at the centre of the kidney's **inner concave surface**; the ureter, blood vessels and nerves pass through it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoex-nephron",
      name: "Parts of a nephron and its two kinds",
      visualizationSlug: "hp-nephron-schematic",
      intuition:
        "A nephron is a long, folded tube with a filter at its start. Blood is pressed through a knot of capillaries into a cup, and the fluid then travels a coiled tube, a hairpin loop and another coiled tube before it drains into a collecting duct. Most nephrons dip their loop only a little into the medulla; a few plunge deep.",
      definition:
        "Each nephron has two parts, the **glomerulus** and the **renal tubule**.\n" +
        "- The **glomerulus** is a tuft of capillaries formed by the **afferent arteriole**, a fine branch of the renal artery. The **efferent arteriole** carries blood away from it.\n" +
        "- The renal tubule begins with the double walled, cup like **Bowman's capsule**, which encloses the glomerulus. Glomerulus plus Bowman's capsule is the **Malpighian body or renal corpuscle**.\n" +
        "- The tubule then runs as the highly coiled **PCT**, the hairpin shaped **Henle's loop** (descending and ascending limbs) and the highly coiled **DCT**.\n" +
        "- The DCTs of many nephrons open into a straight **collecting duct**. Collecting ducts converge and open into the renal pelvis through the medullary pyramids in the calyces.\n\n" +
        "The Malpighian corpuscle, PCT and DCT lie in the **cortex**; the loop of Henle dips into the **medulla**.\n\n" +
        "The efferent arteriole forms a fine network around the tubule, the **peritubular capillaries**. A minute vessel of this network runs parallel to Henle's loop as the U shaped **vasa recta**.",
      table: {
        columns: ["Feature", "Cortical nephron", "Juxta medullary nephron"],
        rows: [
          { cells: ["Loop of Henle", "Too short, extends only very little into the medulla", "Very long, runs deep into the medulla"] },
          { cells: ["How common", "The majority of nephrons", "Only some nephrons"] },
          { cells: ["Vasa recta", "Absent or highly reduced", "Present, running parallel to the long loop"] },
        ],
      },
      pyqExampleId: "199dec40-02a4-4161-9a78-e31149e5b8e3",
      selfCheckExample: {
        prompt: "List the parts a drop of filtrate passes through, from Bowman's capsule to the renal pelvis.",
        steps: [
          "It starts in Bowman's capsule, then runs through the PCT.",
          "Next come the descending and ascending limbs of Henle's loop, then the DCT.",
          "The DCT opens into a collecting duct, which opens into the renal pelvis through a medullary pyramid.",
        ],
        answer: "Bowman's capsule, PCT, Henle's loop, DCT, collecting duct, renal pelvis.",
      },
      practiceSet: [
        { prompt: "What is the Malpighian body (renal corpuscle) made of?", answer: "The glomerulus and Bowman's capsule" },
        { prompt: "Which vessel brings blood into the glomerulus?", answer: "The afferent arteriole, a fine branch of the renal artery" },
        { prompt: "What is the U shaped vessel running parallel to Henle's loop called?", answer: "The vasa recta" },
        { prompt: "Which three parts of a nephron lie in the cortex?", answer: "The Malpighian corpuscle, the PCT and the DCT" },
        { prompt: "What network does the efferent arteriole form around the renal tubule?", answer: "The peritubular capillaries" },
      ],
      traps: [
        {
          title: "The long loop belongs to the juxta medullary nephron",
          body: "**Juxta medullary** nephrons have the **very long** loop that runs deep into the medulla; **cortical** nephrons have the **short** loop. A statement that swaps them is false.",
        },
        {
          title: "Most nephrons are cortical",
          body: "In the **majority** of nephrons the loop is short: these are **cortical** nephrons. Juxta medullary nephrons are only **some** of them.",
        },
        {
          title: "Vasa recta is reduced in cortical nephrons",
          body: "The **vasa recta** is **absent or highly reduced in cortical nephrons**. It runs beside the long loop of juxta medullary nephrons.",
        },
      ],
    },
  ],
};
