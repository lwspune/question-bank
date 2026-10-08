import type { SubtopicNote } from "@/app/notes/_types";

const CA = "\\(\\mathrm{Ca^{2+}}\\)";

export const IMAT_BIO_HAP_TISSUES_NOTE: SubtopicNote = {
  subtopicName: "Tissues and Homeostasis",
  title: "Tissues, Bone and Homeostasis",
  oneLineDefinition:
    "Similar cells form tissues, tissues form organs, and the body keeps its internal conditions steady by negative feedback.",
  whyItMatters:
    "The papers ask which structures are tissues and which are organs (2018, 2019), which conditions homeostasis controls (2012, 2023), why sweating cools (2011), and the jobs of bone cells, tendons and cartilage (2015, 2025, 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-hap-tissue-types",
      name: "The four basic tissue types and how they build organs",
      intuition:
        "A single cell cannot do every job well, so cells specialise and work in groups. A group of similar cells doing one job is a tissue. Several tissues working together make an organ, and organs working together make an organ system.",
      definition:
        "**Levels of organisation**: cell, then **tissue**, then **organ**, then **organ system**.\n" +
        "- A **tissue** is a group of similar cells (with the material between them) that carry out one function. Blood, cartilage, bone and endothelium are tissues.\n" +
        "- An **organ** is made of two or more tissues. The trachea, the stomach and the skin are organs.\n" +
        "- There are four basic tissue types: **epithelial**, **connective**, **muscle** and **nervous**.\n" +
        "- **Endothelium** is the single layer of flat (squamous) cells lining every blood vessel and the heart.",
      table: {
        columns: ["Tissue", "Kind", "Where found", "Job"],
        rows: [
          { cells: ["Epithelial", "Squamous: flat cells, one layer thick", "Alveoli, capillary walls (endothelium), Bowman's capsule", "Short path for diffusion and filtration"] },
          { cells: ["Epithelial", "Ciliated columnar, with mucus-making goblet cells", "Trachea, bronchi, oviducts", "Moves mucus, or an egg, along the tube"] },
          { cells: ["Epithelial", "Cuboidal", "Kidney tubules, glands", "Secretion and absorption"] },
          { cells: ["Epithelial", "Stratified squamous: many layers", "Epidermis of the skin, mouth, oesophagus", "Resists wear and drying"] },
          { cells: ["Connective", "Cartilage, bone, blood, fat, tendons, ligaments", "Throughout the body", "Support, joining, transport, storage"] },
          { cells: ["Muscle", "Skeletal, cardiac, smooth", "Attached to bones; heart wall; walls of gut and blood vessels", "Contraction"] },
          { cells: ["Nervous", "Neurones and supporting glial cells", "Brain, spinal cord, nerves", "Carries electrical signals"] },
        ],
        caption: "Blood is a connective tissue: its cells sit in a liquid matrix, the plasma.",
      },
      selfCheckExample: {
        prompt: "Which one of the following is an organ rather than a tissue?",
        options: ["Cartilage", "Blood", "Endothelium", "Stomach", "Smooth muscle"],
        steps: [
          "An organ is built from several tissues. The stomach wall has epithelium, smooth muscle, connective tissue and nerves, so it is an organ.",
          "Cartilage and blood are connective tissues. Endothelium is an epithelial tissue. Smooth muscle is a muscle tissue.",
        ],
        answer: "(D) Stomach",
      },
      practiceSet: [
        { prompt: "Which of the four tissue types does blood belong to?", answer: "Connective tissue" },
        { prompt: "Which kind of epithelium lines the alveoli?", answer: "Squamous epithelium, one cell thick" },
        { prompt: "Name two different tissues in the wall of the trachea.", answer: "Ciliated epithelium and cartilage (smooth muscle is also present)" },
        { prompt: "Is the skin a tissue or an organ?", answer: "An organ: it contains epithelium, connective tissue, blood vessels and nerves" },
      ],
      traps: [
        {
          title: "Skin is an organ, endothelium is a tissue",
          body: "Options often mix the two levels. Skin contains several tissues, so it is an organ. Endothelium, cartilage and blood are each a single tissue, even though blood flows.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-bone-joints",
      name: "Bone cells, cartilage and the structures of a joint",
      intuition:
        "Bone is living tissue that is built, kept and broken down all the time. One kind of cell builds it, another lives inside it, and a third dissolves it. This turnover lets bone repair itself and lets the blood borrow calcium when it needs it.",
      definition:
        "**Bone** is a connective tissue: a matrix of **collagen** (gives flexibility) hardened by **calcium phosphate** (gives strength), with living cells inside.\n" +
        "- **Red bone marrow** makes all the blood cells.\n" +
        `- **Parathyroid hormone** raises blood ${CA} (it increases bone breakdown); **calcitonin** from the thyroid lowers it. **Vitamin D** helps the gut absorb calcium.\n` +
        "- **Cartilage** is firm but flexible and has **no blood vessels**, so it heals slowly. It covers joint surfaces and forms the epiglottis, the rings of the trachea, the outer ear and the end of the nose.\n" +
        "- **Joints**: fibrous (fixed, the skull sutures), cartilaginous (slightly movable, between vertebrae) and **synovial** (freely movable: the knee is a hinge joint, the hip and shoulder are ball-and-socket joints).\n" +
        "- Muscles work in **antagonistic pairs**: the biceps bends the elbow, the triceps straightens it.",
      table: {
        columns: ["Structure", "What it is", "Job"],
        rows: [
          { cells: ["Osteoblast", "Bone-building cell", "Secretes collagen and lays down calcium phosphate to make new matrix"] },
          { cells: ["Osteocyte", "Former osteoblast trapped in the hard matrix", "Maintains the bone around it and senses mechanical load"] },
          { cells: ["Osteoclast", "Large cell with many nuclei", "Dissolves (resorbs) bone matrix, releasing calcium into the blood"] },
          { cells: ["Cartilage", "Chondrocytes in a collagen matrix, no blood supply", "Smooth, shock-absorbing joint surfaces; flexible support"] },
          { cells: ["Tendon", "Tough, hardly stretchy bundle of collagen", "Joins a muscle to a bone, so the muscle can pull it"] },
          { cells: ["Ligament", "Collagen with some elastic fibres", "Joins bone to bone and holds a joint together"] },
          { cells: ["Synovial membrane and fluid", "Lining of a movable joint capsule", "Fluid lubricates the joint and feeds the cartilage"] },
        ],
        caption: "Memory aid: osteo**b**lasts **b**uild, osteo**c**lasts **c**ut away.",
      },
      selfCheckExample: {
        prompt: "A drug for weak bones works by blocking osteoclasts. Which effect would you expect?",
        options: [
          "Bone is broken down faster",
          "Less calcium is released from bone into the blood",
          "Osteoblasts can no longer make collagen",
          "Muscles can no longer pull on the bones",
          "Red bone marrow stops making red blood cells",
        ],
        steps: [
          "Osteoclasts dissolve bone and release its calcium. Blocking them slows this, so less calcium leaves the bone.",
          "Option A is the opposite effect. Osteoblasts (C) are a different cell and are not blocked. Pulling on bones (D) depends on tendons, and blood cell production (E) on marrow stem cells.",
        ],
        answer: "(B) Less calcium is released from bone into the blood",
      },
      practiceSet: [
        { prompt: "Which cell lays down new bone matrix?", answer: "The osteoblast" },
        { prompt: "What joins one bone to another bone?", answer: "A ligament" },
        { prompt: "What kind of joint is the hip?", answer: "A synovial ball-and-socket joint" },
        { prompt: "Name two places where cartilage is found apart from joints.", answer: "Any two of: epiglottis, rings of the trachea, outer ear, nose, between vertebrae" },
      ],
      traps: [
        {
          title: "Tendons join muscle to bone, ligaments join bone to bone",
          body: "The two are often swapped in the options. A tendon transmits the pull of a muscle to a bone. A ligament holds two bones together at a joint. Neither carries nerve impulses or stores energy for the muscle.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-feedback",
      name: "Homeostasis and negative feedback loops",
      intuition:
        "Cells work only within narrow conditions: enzymes need the right temperature and pH, and water must not rush in or out of cells. So the body measures key values and corrects any change, like a thermostat. Most of these loops undo the change; a few deliberately make it bigger.",
      definition:
        "**Homeostasis** keeps the internal environment (the tissue fluid around cells) within narrow limits.\n" +
        "- A control loop has a **receptor** (detects the change), a **control centre** (compares it with the set point) and an **effector** (a muscle or gland that responds).\n" +
        "- **Negative feedback**: the response **reverses** the change. Almost all homeostasis works this way.\n" +
        "- **Positive feedback**: the response **increases** the change until an end point is reached. Examples: oxytocin and contractions in labour, blood clotting, the LH surge before ovulation, sodium entry during an action potential.\n" +
        "- Values held by homeostasis: blood glucose, core temperature, blood water content, blood pH and carbon dioxide, blood pressure, ion concentrations. Body mass is not held at a set point by such a loop; it changes over weeks with diet and growth.\n" +
        "- Blood glucose control does not need the brain: the islet cells of the pancreas both detect the change and respond to it.",
      table: {
        columns: ["Controlled value", "Receptor", "Control centre", "Effectors"],
        rows: [
          { cells: ["Core temperature", "Thermoreceptors in the skin and hypothalamus", "Hypothalamus", "Sweat glands, skin arterioles, skeletal muscle"] },
          { cells: ["Blood glucose", "Alpha and beta cells of the pancreatic islets", "The pancreas itself", "Liver, muscle and fat cells"] },
          { cells: ["Blood water content", "Osmoreceptors in the hypothalamus", "Hypothalamus, via ADH from the posterior pituitary", "Collecting ducts of the kidney"] },
          { cells: ["Blood carbon dioxide and pH", "Chemoreceptors in the medulla, aorta and carotid arteries", "Medulla oblongata", "Diaphragm and intercostal muscles"] },
          { cells: ["Blood pressure", "Baroreceptors in the aorta and carotid arteries", "Medulla oblongata", "Heart and arterioles"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following is an example of positive feedback?",
        options: [
          "Sweating when the body temperature rises",
          "Insulin release after a meal rich in sugar",
          "Uterine contractions that cause more oxytocin release, which causes stronger contractions",
          "ADH release when the blood becomes too concentrated",
          "Faster breathing when blood carbon dioxide rises",
        ],
        steps: [
          "In positive feedback the response makes the original change bigger. Contractions trigger oxytocin, which strengthens the contractions: the change grows until the baby is born.",
          "Every other option is negative feedback: sweating lowers temperature, insulin lowers glucose, ADH dilutes the blood, faster breathing removes carbon dioxide.",
        ],
        answer: "(C) Uterine contractions that cause more oxytocin release, which causes stronger contractions",
      },
      practiceSet: [
        { prompt: "Which part of the brain is the control centre for body temperature?", answer: "The hypothalamus" },
        { prompt: "In negative feedback, what does the response do to the original change?", answer: "It reverses it, back towards the set point" },
        { prompt: "Which organ both detects a rise in blood glucose and releases the hormone that lowers it?", answer: "The pancreas" },
        { prompt: "Give one example of positive feedback outside childbirth.", answer: "Blood clotting, the LH surge, or sodium entry during an action potential" },
      ],
      traps: [
        {
          title: "Positive feedback does not mean good feedback",
          body: "Positive and negative describe the direction of the response, not whether it helps. Negative feedback opposes the change and keeps things stable; positive feedback amplifies it and is used only when a process must be driven to completion.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-temperature",
      name: "Temperature control: responses to heat and to cold",
      intuition:
        "The body makes heat all the time by respiration and loses it at the skin. To cool down it sends more warm blood to the skin and lets sweat evaporate. To warm up it keeps blood away from the skin and makes extra heat by shivering.",
      definition:
        "Core temperature is held near **37 °C** by the **hypothalamus**.\n" +
        "- Heat is lost by radiation, conduction, convection and **evaporation** of sweat.\n" +
        "- Sweat cools because water has a high **latent heat of vaporisation**: each gram that evaporates takes about 2.4 kJ of heat from the skin. Its high specific heat capacity is a different property: it stops body temperature changing quickly.\n" +
        "- In humid air sweat evaporates slowly, so it cools poorly.\n" +
        "- The **arterioles** supplying skin capillaries widen or narrow; the capillaries themselves do not move.",
      table: {
        columns: ["Effector", "Response when too hot", "Response when too cold"],
        rows: [
          { cells: ["Skin arterioles", "Vasodilation: more blood flows near the surface and loses heat", "Vasoconstriction: less blood flows near the surface"] },
          { cells: ["Sweat glands", "Secrete sweat, which evaporates and removes heat", "Little or no sweat"] },
          { cells: ["Skeletal muscle", "No shivering", "Shivering: rapid contractions release heat from respiration"] },
          { cells: ["Hair erector muscles", "Relax, hairs lie flat", "Contract, hairs stand up and trap air (a small effect in humans)"] },
          { cells: ["Metabolic rate", "Not raised", "Raised by thyroxine and adrenaline"] },
        ],
      },
      selfCheckExample: {
        prompt: "On a hot, humid day a runner sweats a lot but still overheats. What is the best explanation?",
        options: [
          "Water has a high specific heat capacity, so sweat absorbs little heat",
          "Skin arterioles constrict in humid air",
          "Sweat contains salts that stop it from evaporating",
          "Humid air conducts heat into the body",
          "Sweat evaporates slowly into air that is already moist, so less heat is removed",
        ],
        steps: [
          "Sweat removes heat only when it evaporates, taking its latent heat of vaporisation from the skin. Moist air slows evaporation, so cooling fails even with plenty of sweat.",
          "Option A names the wrong property. In heat the arterioles dilate, not constrict (B). Salts do not stop evaporation (C).",
        ],
        answer: "(E) Sweat evaporates slowly into air that is already moist, so less heat is removed",
      },
      practiceSet: [
        { prompt: "What happens to the skin arterioles in the cold?", answer: "They constrict (vasoconstriction)" },
        { prompt: "Which property of water makes sweating an effective way to lose heat?", answer: "Its high latent heat of vaporisation" },
        { prompt: "How does shivering warm the body?", answer: "Muscle contractions increase respiration, which releases heat" },
      ],
      traps: [
        {
          title: "Capillaries do not move towards the skin",
          body: "Flushed skin is caused by arterioles widening so more blood flows through the capillaries already there. Options saying the capillaries move closer to the surface are wrong.",
        },
      ],
    },
  ],
};
