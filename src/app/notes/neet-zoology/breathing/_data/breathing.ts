import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BR_BREATHING_NOTE: SubtopicNote = {
  subtopicName: "Respiratory Organs and Breathing",
  title: "Respiratory Organs and Breathing",
  oneLineDefinition:
    "How different animals take in oxygen, the parts of the human respiratory system, the five steps of respiration, how we breathe in and out, and the lung volumes and capacities with their NCERT values.",
  whyItMatters:
    "Eight NEET questions from 2022 to 2026, four of them in the 2026 papers (three in NEET 2026, one in Re-NEET 2026). Respiratory volumes and capacities were asked four times: NEET 2023, NEET 2024, Re-NEET 2024 and NEET 2026.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzobr-animals",
      name: "Respiratory organs in different animals",
      intuition:
        "A tiny or thin animal can let oxygen soak in through its whole body. Bigger animals need a special surface for it. Which surface an animal uses depends on where it lives and how its body is organised: tubes in insects, gills in water, lungs on land.",
      definition:
        "Mechanisms of breathing vary among animal groups, mainly with their **habitat** and **level of organisation**:\n" +
        "- **Lower invertebrates** like **sponges, coelenterates and flatworms** exchange O₂ with CO₂ by **simple diffusion over their entire body surface**.\n" +
        "- **Earthworms** use their **moist cuticle**.\n" +
        "- **Insects** have a network of tubes, the **tracheal tubes**, to carry air within the body.\n" +
        "- **Most aquatic arthropods and molluscs** use special vascularised structures called **gills**: this is **branchial respiration**.\n" +
        "- **Terrestrial forms** use vascularised bags called **lungs**: this is **pulmonary respiration**.\n" +
        "- Among vertebrates, **fishes use gills**, while **reptiles, birds and mammals respire through lungs**.\n" +
        "- **Amphibians like frogs** can also respire through their **moist skin**: this is **cutaneous respiration**.",
      table: {
        columns: ["Animals", "Respiratory surface or organ"],
        rows: [
          {
            cells: ["Sponges, coelenterates, flatworms", "Simple diffusion over the entire body surface"],
            noteAmber: "Re-NEET 2026: sponges exchange O₂ with CO₂ by simple diffusion over their entire body surface.",
          },
          { cells: ["Earthworms", "Moist cuticle"] },
          { cells: ["Insects", "A network of tracheal tubes"] },
          {
            cells: ["Most aquatic arthropods and molluscs", "Gills (branchial respiration)"],
            noteAmber: "NEET 2026: molluscs were matched with branchial respiration and reptiles with pulmonary respiration only.",
            pyqExampleId: "3444144e-23d0-4c39-bb6c-fe5ca8ca4649",
          },
          { cells: ["Terrestrial forms", "Lungs (pulmonary respiration)"] },
          { cells: ["Fishes", "Gills"] },
          { cells: ["Reptiles, birds and mammals", "Lungs"] },
          { cells: ["Amphibians such as frogs", "Lungs, and the moist skin as well (cutaneous respiration)"] },
        ],
      },
      pyqExampleId: "799c1edb-525a-4104-bc10-4af87990a402",
      selfCheckExample: {
        prompt: "An earthworm and a cockroach both live on land. Which respiratory structure does each of them use?",
        steps: [
          "NCERT says earthworms exchange gases through their moist cuticle.",
          "A cockroach is an insect, and insects have a network of tracheal tubes.",
        ],
        answer: "The earthworm uses its moist cuticle; the cockroach uses tracheal tubes.",
      },
      practiceSet: [
        { prompt: "Which structures do most aquatic arthropods and molluscs use to exchange gases, and what is this kind of respiration called?", answer: "Gills; branchial respiration" },
        { prompt: "Which three vertebrate groups does NCERT say respire through lungs?", answer: "Reptiles, birds and mammals" },
        { prompt: "Besides its lungs, through what can a frog respire, and what is this called?", answer: "Its moist skin; cutaneous respiration" },
        { prompt: "What is respiration through lungs called?", answer: "Pulmonary respiration" },
      ],
      traps: [
        {
          title: "Earthworms use the cuticle, insects use tracheae",
          body: "**Earthworms** exchange gases through their **moist cuticle**. **Tracheal tubes** belong to **insects**. Swapping the two is a common wrong match.",
        },
        {
          title: "Gills are branchial, lungs are pulmonary",
          body: "Respiration by **gills** is **branchial**; by **lungs** it is **pulmonary**; through the **skin** it is **cutaneous**.",
        },
        {
          title: "Coelenterates have no respiratory organ",
          body: "**Sponges, coelenterates and flatworms** all exchange gases by **simple diffusion over the entire body surface**, not through gills or a cuticle.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobr-human-system",
      name: "The human respiratory system and how we breathe",
      visualizationSlug: "hp-alveolus-gas-exchange",
      intuition:
        "Think of the airway as a long, cleaning corridor that ends in millions of tiny balloons. The corridor only carries the air and gets it ready: it cleans it, wets it and warms it. The real swap of oxygen and carbon dioxide happens only in the tiny balloons, the alveoli.",
      definition:
        "The path of air:\n" +
        "- A pair of **external nostrils** opens above the upper lip and leads through the **nasal passage** to the **nasal chamber**, then to the **pharynx**, a common passage for food and air.\n" +
        "- The pharynx opens through the **larynx** into the **trachea**. The **larynx** is a cartilaginous box, the **sound box**, which helps in sound production.\n" +
        "- During swallowing, the **glottis** is covered by the **epiglottis**, a thin elastic cartilaginous flap, so food does not enter the larynx.\n" +
        "- The **trachea** is a straight tube up to the mid-thoracic cavity. It divides at the level of the **5th thoracic vertebra** into the right and left **primary bronchi**, which branch into secondary and tertiary bronchi and bronchioles, ending in very thin **terminal bronchioles**.\n" +
        "- The trachea, the primary, secondary and tertiary bronchi and the initial bronchioles are supported by **incomplete cartilaginous rings**.\n" +
        "- Each terminal bronchiole gives rise to many very thin, irregular-walled, vascularised bag-like **alveoli**. Bronchi, bronchioles and alveoli together make the **lungs**.\n" +
        "- The two lungs are covered by a double-layered **pleura** with **pleural fluid** between the layers, which **reduces friction** on the lung surface.\n\n" +
        "Two parts:\n" +
        "- **Conducting part:** from the **external nostrils up to the terminal bronchioles**. It carries air to the alveoli, **clears it of foreign particles, humidifies it and brings it to body temperature**.\n" +
        "- **Respiratory or exchange part:** the **alveoli and their ducts**. This is the site of actual **diffusion of O₂ and CO₂** between blood and air.\n" +
        "- The lungs sit in the **thoracic chamber**, an air-tight chamber formed by the vertebral column (dorsally), the sternum (ventrally), the ribs (laterally) and the dome-shaped **diaphragm** (below).\n\n" +
        "The five steps of respiration, in order:\n" +
        "- (i) **Breathing or pulmonary ventilation**: air is drawn in and CO₂-rich alveolar air is released out.\n" +
        "- (ii) **Diffusion of gases across the alveolar membrane**.\n" +
        "- (iii) **Transport of gases by the blood**.\n" +
        "- (iv) **Diffusion of O₂ and CO₂ between blood and tissues**.\n" +
        "- (v) **Utilisation of O₂ by the cells** for catabolic reactions and release of CO₂ (cellular respiration).\n\n" +
        "Breathing in and out:\n" +
        "- **Inspiration** happens when the pressure inside the lungs is **less than the atmospheric pressure**. The **diaphragm contracts**, increasing the chest volume front to back, and the **external intercostal muscles contract**, lifting the ribs and sternum. The lung volume rises and the pressure inside falls.\n" +
        "- **Expiration** happens when the pressure inside the lungs is **higher than the atmospheric pressure**. The diaphragm and intercostal muscles **relax**, the chest volume falls and air is pushed out. Abdominal muscles can add strength to both.\n" +
        "- A healthy human breathes **12 to 16 times a minute**. A **spirometer** estimates the volume of air involved in breathing.",
      table: {
        columns: ["Part or event", "What NCERT says"],
        rows: [
          { cells: ["Larynx", "A cartilaginous box, the sound box, that helps in sound production"] },
          { cells: ["Epiglottis", "A thin elastic cartilaginous flap that covers the glottis during swallowing"] },
          { cells: ["Trachea", "A straight tube that divides at the level of the 5th thoracic vertebra into the right and left primary bronchi"] },
          { cells: ["Cartilage support", "Incomplete rings around the trachea, the primary, secondary and tertiary bronchi and the initial bronchioles"] },
          { cells: ["Pleura", "A double layer around each lung, with pleural fluid between that reduces friction"] },
          {
            cells: ["Conducting part", "Nostrils to terminal bronchioles: carries air, clears foreign particles, humidifies it, brings it to body temperature"],
            noteAmber: "NEET 2022: providing a surface for diffusion of O₂ and CO₂ is not a job of the conducting part.",
          },
          { cells: ["Exchange part", "Alveoli and their ducts: the site of actual diffusion of O₂ and CO₂"] },
          {
            cells: ["Steps of respiration", "Breathing, diffusion across the alveolar membrane, transport by blood, diffusion between blood and tissues, cellular respiration"],
            noteAmber: "NEET 2026: these five steps were asked as an ordering question.",
            pyqExampleId: "482a7e79-4a89-45bb-9500-71cf70cb303a",
          },
          { cells: ["Inspiration", "Diaphragm and external intercostal muscles contract; pressure in the lungs falls below atmospheric"] },
          { cells: ["Expiration", "Diaphragm and intercostal muscles relax; pressure in the lungs rises above atmospheric"] },
        ],
      },
      pyqExampleId: "3bdf7343-cc0c-4c7b-85e2-caf599948b0c",
      selfCheckExample: {
        prompt: "Air passes from a terminal bronchiole into an alveolus. Which part of the respiratory system is each of them in?",
        steps: [
          "The conducting part runs from the external nostrils up to the terminal bronchioles.",
          "The exchange part is made of the alveoli and their ducts.",
        ],
        answer: "The terminal bronchiole is in the conducting part; the alveolus is in the exchange part.",
      },
      practiceSet: [
        { prompt: "At the level of which vertebra does the trachea divide into the right and left primary bronchi?", answer: "The 5th thoracic vertebra" },
        { prompt: "What covers the glottis during swallowing, and what is it made of?", answer: "The epiglottis, a thin elastic cartilaginous flap" },
        { prompt: "What does the pleural fluid between the two layers of the pleura do?", answer: "It reduces friction on the lung surface" },
        { prompt: "Which two sets of muscles contract during normal inspiration?", answer: "The diaphragm and the external intercostal muscles" },
        { prompt: "How many times a minute does a healthy human breathe?", answer: "12 to 16 times" },
      ],
      traps: [
        {
          title: "The conducting part does not exchange gases",
          body: "The **conducting part** cleans, humidifies and warms the air. **Diffusion of O₂ and CO₂** happens only in the **exchange part**, the alveoli and their ducts.",
        },
        {
          title: "Terminal bronchioles are still conducting",
          body: "The conducting part runs **up to the terminal bronchioles**. The exchange part starts at the **alveoli and their ducts**.",
        },
        {
          title: "Cellular respiration is the last step",
          body: "The order is breathing, diffusion across the alveolar membrane, transport by blood, diffusion between blood and tissues, and only then **utilisation of O₂ by the cells**.",
        },
        {
          title: "Inspiration needs lower pressure inside",
          body: "Air flows in only when the pressure **inside the lungs is less than atmospheric**. Contraction of the diaphragm and external intercostal muscles makes that happen.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobr-volumes",
      name: "Respiratory volumes",
      visualizationSlug: "hp-lung-volumes",
      intuition:
        "A normal breath uses only a small part of the lungs. You can force in a lot more air, and force out some more. Even after the hardest breath out, some air always stays behind. These four amounts are the respiratory volumes.",
      definition:
        "- **Tidal volume (TV):** the volume of air inspired or expired during a **normal respiration**. About **500 mL**, so a healthy man can inspire or expire about **6000 to 8000 mL of air per minute**.\n" +
        "- **Inspiratory reserve volume (IRV):** the additional air a person can inspire by a **forcible inspiration**. On average **2500 to 3000 mL**.\n" +
        "- **Expiratory reserve volume (ERV):** the additional air a person can expire by a **forcible expiration**. On average **1000 to 1100 mL**.\n" +
        "- **Residual volume (RV):** the air **remaining in the lungs even after a forcible expiration**. On average **1100 to 1200 mL**.\n" +
        "- These volumes are measured with a **spirometer**, which helps in the clinical assessment of lung function.",
      table: {
        columns: ["Volume", "What it is", "Average value"],
        rows: [
          { cells: ["Tidal volume (TV)", "Air inspired or expired in a normal breath", "About 500 mL"] },
          { cells: ["Inspiratory reserve volume (IRV)", "Extra air inspired by a forcible inspiration", "2500 to 3000 mL"] },
          { cells: ["Expiratory reserve volume (ERV)", "Extra air expired by a forcible expiration", "1000 to 1100 mL"] },
          {
            cells: ["Residual volume (RV)", "Air left in the lungs even after a forcible expiration", "1100 to 1200 mL"],
            noteAmber: "Re-NEET 2024: residual volume was matched with the air remaining in the lungs after forcible expiration.",
            pyqExampleId: "b6bbc7b2-63b1-4c92-ba2b-d30db73cf723",
          },
        ],
      },
      pyqExampleId: "0d518072-7b10-47c2-bb23-846a1a61d1ac",
      selfCheckExample: {
        prompt: "A person at rest breathes 14 times a minute, each breath being a normal tidal volume. About how much air do they breathe in each minute?",
        steps: [
          "A normal tidal volume is about 500 mL.",
          "\\(14 \\times 500 = 7000\\) mL, which sits inside NCERT's range of 6000 to 8000 mL per minute.",
        ],
        answer: "About 7000 mL a minute.",
      },
      practiceSet: [
        { prompt: "What instrument estimates the volume of air involved in breathing?", answer: "A spirometer" },
        { prompt: "Which is larger on average, the inspiratory reserve volume or the expiratory reserve volume?", answer: "The inspiratory reserve volume (2500 to 3000 mL against 1000 to 1100 mL)" },
        { prompt: "About how much air can a healthy man inspire or expire in a minute?", answer: "About 6000 to 8000 mL" },
        { prompt: "What is the additional volume of air a person can expire by a forcible expiration called?", answer: "The expiratory reserve volume" },
      ],
      traps: [
        {
          title: "ERV and RV are close but not the same",
          body: "**ERV is 1000 to 1100 mL** and **RV is 1100 to 1200 mL**. ERV can be forced out; RV stays in the lungs even after a forcible expiration.",
        },
        {
          title: "IRV is the largest single volume",
          body: "The **inspiratory reserve volume (2500 to 3000 mL)** is far bigger than the tidal volume (about 500 mL) or the expiratory reserve volume.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nzobr-capacities",
      name: "Pulmonary capacities",
      intuition:
        "A capacity is just two or more volumes added together. Ask yourself which breaths are included. Breathing in from a normal breath out adds TV and IRV. Breathing out from a normal breath in adds TV and ERV. The biggest breath you can move adds all three, and only the total lung capacity adds the air that never leaves.",
      definition:
        "Pulmonary capacities are sums of the respiratory volumes:\n" +
        "- **Inspiratory capacity (IC) = TV + IRV:** the total air a person can inspire after a normal expiration.\n" +
        "- **Expiratory capacity (EC) = TV + ERV:** the total air a person can expire after a normal inspiration.\n" +
        "- **Functional residual capacity (FRC) = ERV + RV:** the air that remains in the lungs after a normal expiration.\n" +
        "- **Vital capacity (VC) = ERV + TV + IRV:** the **maximum** volume of air a person can breathe in after a forced expiration, or breathe out after a forced inspiration.\n" +
        "- **Total lung capacity (TLC) = RV + ERV + TV + IRV**, which is also **VC + RV**: the total air the lungs can hold at the end of a forced inspiration.",
      formula: {
        label: "Vital capacity",
        latex: "\\text{VC} = \\text{IRV} + \\text{TV} + \\text{ERV}",
        symbols: [
          { symbol: "\\(\\text{VC}\\)", meaning: "vital capacity, the most air a person can breathe in after a forced expiration" },
          { symbol: "\\(\\text{IRV}\\)", meaning: "inspiratory reserve volume" },
          { symbol: "\\(\\text{TV}\\)", meaning: "tidal volume" },
          { symbol: "\\(\\text{ERV}\\)", meaning: "expiratory reserve volume" },
        ],
      },
      authoredExample: {
        prompt: "A person has TV 500 mL, IRV 3000 mL, ERV 1100 mL and RV 1200 mL. Find the inspiratory capacity, expiratory capacity, functional residual capacity, vital capacity and total lung capacity.",
        steps: [
          "IC = TV + IRV = \\(500 + 3000 = 3500\\) mL.",
          "EC = TV + ERV = \\(500 + 1100 = 1600\\) mL.",
          "FRC = ERV + RV = \\(1100 + 1200 = 2300\\) mL.",
          "VC = ERV + TV + IRV = \\(1100 + 500 + 3000 = 4600\\) mL.",
          "TLC = VC + RV = \\(4600 + 1200 = 5800\\) mL.",
        ],
        answer: "IC 3500 mL, EC 1600 mL, FRC 2300 mL, VC 4600 mL, TLC 5800 mL.",
      },
      pyqExampleId: "98007bf5-07c0-41f9-9784-48052b57b313",
      selfCheckExample: {
        prompt: "A person's total lung capacity is 5500 mL and the residual volume is 1100 mL. What is the vital capacity?",
        steps: [
          "TLC = VC + RV, so VC = TLC minus RV.",
          "\\(5500 - 1100 = 4400\\) mL.",
        ],
        answer: "4400 mL.",
      },
      practiceSet: [
        { prompt: "Which pulmonary capacity is the sum of the tidal volume and the inspiratory reserve volume?", answer: "The inspiratory capacity" },
        { prompt: "Which two respiratory volumes add up to the functional residual capacity?", answer: "The expiratory reserve volume and the residual volume" },
        { prompt: "With a tidal volume of 500 mL and an inspiratory reserve volume of 2500 mL, what is the inspiratory capacity?", answer: "3000 mL" },
        { prompt: "Which respiratory volume is part of the total lung capacity but not of the vital capacity?", answer: "The residual volume" },
      ],
      traps: [
        {
          title: "Vital capacity leaves out residual volume",
          body: "**VC = IRV + TV + ERV.** The residual volume can never be breathed out, so it is not part of vital capacity; adding it gives the **total lung capacity**. NEET 2023 asked exactly this sum.",
        },
        {
          title: "Expiratory capacity has no residual volume",
          body: "**EC = TV + ERV.** It is the **functional residual capacity** that adds the residual volume: **FRC = ERV + RV**.",
        },
        {
          title: "Functional residual capacity has no tidal volume",
          body: "**FRC = ERV + RV**, the air left after a normal breath out. The tidal volume has already left, so it is not part of FRC.",
        },
      ],
    },
  ],
};
