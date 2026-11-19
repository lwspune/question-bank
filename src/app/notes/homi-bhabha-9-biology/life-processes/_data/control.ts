import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_LP_CONTROL_NOTE: SubtopicNote = {
  subtopicName: "Control and Coordination",
  title: "Control and Coordination",
  oneLineDefinition:
    "Endocrine glands send hormones through the blood: the pancreas's islets control blood sugar, and the hypothalamus, pituitary, thyroid, parathyroid and others each have their own job; reflexes and plant tropic movements are quick responses to a stimulus.",
  whyItMatters:
    "The busiest page of the chapter: eleven questions, five EASY, five MODERATE and one HARD. Four are about the pancreas's islets (insulin, somatostatin, where the islets are, the odd hormone out), five match other glands to their hormones, jobs and places, and two ask about a natural reflex and the movements roots do not show.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9lpco-pancreas",
      name: "The pancreas and blood sugar",
      intuition:
        "The pancreas does two jobs. Most of it makes digestive juice. Scattered inside it are tiny islands of cells, the islets of Langerhans, that pour hormones straight into the blood to keep blood sugar steady: one hormone brings it down after a meal, another brings it up when you are hungry.",
      definition:
        "- The **pancreas** lies **behind the stomach**. It is both an **exocrine** gland (pancreatic juice through a duct) and an **endocrine** gland (hormones into the blood).\n" +
        "- Its hormone-making cells form the **islets of Langerhans**: **alpha, beta, delta and PP cells**.\n" +
        "- **Insulin** (beta cells) **lowers** blood sugar by **enabling cells to absorb glucose**. Too little insulin causes **diabetes**.\n" +
        "- **Glucagon** (alpha cells) **raises** blood sugar.\n" +
        "- **Somatostatin** (delta cells) controls the release of insulin and glucagon.",
      table: {
        columns: ["Cells of the islets", "Hormone", "Job"],
        rows: [
          { cells: ["Alpha cells", "Glucagon", "Raises blood sugar"] },
          { cells: ["Beta cells", "Insulin", "Lowers blood sugar: lets cells absorb glucose"] },
          { cells: ["Delta cells", "Somatostatin", "Controls the release of insulin and glucagon"] },
        ],
        caption: "Alpha, beta, delta: glucagon, insulin, somatostatin.",
      },
      selfCheckExample: {
        prompt: "A man's pancreas makes too little insulin. What happens to the sugar in his blood, and what is the disease called?",
        steps: ["Without enough insulin, cells cannot take in glucose.", "So glucose stays in the blood and its level rises."],
        answer: "His blood sugar rises: diabetes",
      },
      practiceSet: [
        { prompt: "Which cells of the islets of Langerhans secrete insulin?", answer: "Beta cells" },
        { prompt: "What does glucagon do to the level of sugar in blood?", answer: "It raises it" },
        { prompt: "Where in the body does the pancreas lie?", answer: "Behind the stomach" },
        { prompt: "Why is the pancreas called both an exocrine and an endocrine gland?", answer: "It sends pancreatic juice through a duct and also releases hormones straight into the blood" },
      ],
      pyqExampleId: "d6174300-8e05-4d91-a5af-f3c8e3e0ed7c",
      traps: [
        {
          title: "Thinking insulin raises blood sugar",
          body: "Insulin lowers blood sugar by letting cells absorb glucose. Glucagon is the one that raises it.",
        },
        {
          title: "Giving insulin to the alpha cells",
          body: "Beta cells make insulin, alpha cells make glucagon and delta cells make somatostatin.",
        },
        {
          title: "Thinking insulin is stored in the gall bladder",
          body: "The gall bladder stores bile. Insulin goes straight from the pancreas into the blood.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9lpco-glands",
      name: "Endocrine glands, their places and their hormones",
      intuition:
        "Endocrine glands have no ducts: they drop their hormones straight into the blood, which carries them everywhere. Think of the hypothalamus as the boss, the pituitary as its manager that gives orders to the other glands, and each other gland as a worker with one main job.",
      definition:
        "- The **hypothalamus** at the base of the brain **controls the pituitary**. The **pituitary** controls the other glands, so it is called the **master gland**; it makes growth hormone and **prolactin**.\n" +
        "- The **thyroid** lies in the neck, on the **front and sides of the trachea**. It makes **thyroxine** (controls metabolism) and **calcitonin** (controls the **calcium** in blood).\n" +
        "- The **parathyroids** behind the thyroid make **parathormone**, which controls **calcium and phosphorus** in the blood and bones.\n" +
        "- The **thymus**, in the chest above the heart, makes **thymosin** for immunity in children.\n" +
        "- The **adrenal glands** sit on the **top (the anterior end) of each kidney** and make **adrenaline**, the emergency hormone.\n" +
        "- The **ovaries** make **estrogen** and **progesterone**; the **testes** make **testosterone**.",
      table: {
        columns: ["Gland", "Where it is", "Hormone"],
        rows: [
          { cells: ["Hypothalamus", "Base of the brain", "Hormones that control the pituitary"] },
          { cells: ["Pituitary", "Below the brain", "Growth hormone, prolactin, hormones that control other glands"] },
          { cells: ["Thyroid", "Neck, front and sides of the trachea", "Thyroxine, calcitonin"] },
          { cells: ["Parathyroid", "Behind the thyroid", "Parathormone"] },
          { cells: ["Thymus", "Chest, above the heart", "Thymosin"] },
          { cells: ["Adrenal", "On top of (the anterior end of) each kidney", "Adrenaline"] },
          { cells: ["Pancreas (islets)", "Behind the stomach", "Insulin, glucagon, somatostatin"] },
          { cells: ["Ovary", "Lower abdomen of a female", "Estrogen, progesterone"] },
        ],
        caption: "Calcium: calcitonin from the thyroid and parathormone from the parathyroid.",
      },
      selfCheckExample: {
        prompt: "Which gland sits on top of each kidney, and which hormone does it release in an emergency?",
        steps: ["The adrenal glands sit on the front end of the kidneys.", "Their emergency hormone is adrenaline."],
        answer: "The adrenal gland; adrenaline",
      },
      practiceSet: [
        { prompt: "Which gland is called the master gland?", answer: "The pituitary" },
        { prompt: "Which hormone of the thyroid controls the rate of metabolism?", answer: "Thyroxine" },
        { prompt: "Which gland controls the levels of calcium and phosphorus in the blood and bones?", answer: "The parathyroid" },
        { prompt: "Which gland in the chest helps to build immunity in children?", answer: "The thymus" },
      ],
      pyqExampleId: "5fe2928a-2444-4844-9a92-8dc63a920d72",
      traps: [
        {
          title: "Giving calcitonin to the thymus",
          body: "Calcitonin comes from the thyroid. The thymus makes thymosin.",
        },
        {
          title: "Giving prolactin to the parathyroid",
          body: "Prolactin is a pituitary hormone. The parathyroid makes parathormone.",
        },
        {
          title: "Making the thyroid control blood sugar",
          body: "Blood sugar is controlled by the pancreas. The thyroid controls metabolism and, through calcitonin, the calcium in blood.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9lpco-reflexes",
      name: "Reflexes and plant movements",
      intuition:
        "Touch a hot pan and your hand jumps back before you even think: that is a reflex, run by the spinal cord. Plants have no nerves, yet they respond too, only slowly, by growing: a shoot bends towards a window, a root grows down and towards water.",
      definition:
        "- A **reflex action** is a quick, automatic response to a stimulus, mostly controlled by the **spinal cord**.\n" +
        "- A **natural (unconditioned) reflex** is inborn: blinking at a sudden glare, sneezing, pulling the hand from a hot object.\n" +
        "- A **conditioned reflex** is learned by experience: the mouth watering at the thought or smell of a favourite food.\n" +
        "- Swimming and dancing are **learned voluntary actions**, not reflexes.\n" +
        "- **Tropic movements** in plants are growth towards or away from a stimulus. **Shoots** grow towards light (**phototropism**). **Roots** grow towards gravity (**gravitropism**) and towards water (**hydrotropism**), and away from light.\n" +
        "- Tendrils coil around a support they touch (**thigmotropism**).",
      table: {
        columns: ["Response", "Stimulus", "Example"],
        rows: [
          { cells: ["Phototropism", "Light", "A shoot bending towards a window"] },
          { cells: ["Gravitropism", "Gravity", "A root growing downwards"] },
          { cells: ["Hydrotropism", "Water", "A root growing towards moist soil"] },
          { cells: ["Thigmotropism", "Touch of a support", "A tendril coiling around a stick"] },
          { cells: ["Natural reflex", "A sudden stimulus", "Blinking at a glare, sneezing"] },
          { cells: ["Conditioned reflex", "A learned signal", "Mouth watering at the thought of food"] },
        ],
        caption: "Roots: towards gravity and water. Shoots: towards light.",
      },
      selfCheckExample: {
        prompt: "A dog's mouth waters whenever it hears the bell that is rung at its feeding time. Is this a natural or a conditioned reflex?",
        steps: ["No dog is born responding to a bell.", "It learned to link the bell with food."],
        answer: "A conditioned reflex",
      },
      practiceSet: [
        { prompt: "Which part of the nervous system controls most reflex actions?", answer: "The spinal cord" },
        { prompt: "What is the bending of a shoot towards light called?", answer: "Phototropism" },
        { prompt: "How does a pea tendril respond when it touches a stick?", answer: "It coils around the stick (thigmotropism)" },
        { prompt: "Give one example of a natural reflex in humans.", answer: "Blinking at a sudden glare, sneezing, or pulling the hand away from a hot object" },
      ],
      pyqExampleId: "e5f610fd-6f22-40af-8e8c-68820e6a8a54",
      traps: [
        {
          title: "Thinking roots bend towards light",
          body: "Roots grow towards gravity and water and away from light. It is the shoot that bends towards light.",
        },
        {
          title: "Calling a learned skill a reflex",
          body: "Swimming and dancing are learned voluntary actions. A reflex is quick and automatic.",
        },
        {
          title: "Calling a conditioned reflex natural",
          body: "The mouth watering at the thought of food is learned from experience, so it is a conditioned reflex.",
        },
      ],
    },
  ],
};
