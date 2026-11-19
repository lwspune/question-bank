import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_HB_BLOOD_NOTE: SubtopicNote = {
  subtopicName: "Blood and Circulation",
  title: "Blood and Circulation",
  oneLineDefinition:
    "Blood is plasma carrying red cells, white cells and platelets; the four-chambered heart pumps it to the lungs and the body, and its pressure is read as systolic over diastolic.",
  whyItMatters:
    "Nine questions in the bank, two EASY, six MODERATE and one HARD. Six are about the parts of blood: which cell clots blood, the RBC count, the life of blood cells, the jobs of plasma and the shapes of white cells. Three are about the heart: labelling its parts, blood pressure values, and the animal with the highest blood pressure.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9hbbl-components",
      name: "Plasma, blood cells and platelets",
      intuition:
        "Leave blood in a tube with a chemical that stops clotting, and it settles into two layers: a pale yellow liquid on top, the plasma, and a red layer of cells below. Each part has one main job: red cells carry oxygen, white cells fight germs, platelets close a wound.",
      definition:
        "- Blood is **plasma** (the liquid part, about 55%) and **blood cells** (about 45%).\n" +
        "- Plasma is about 90% water with **proteins**, **inorganic ions**, food, wastes and hormones. **Albumin** keeps the water balance, **fibrinogen** and **prothrombin** help clotting, and inorganic ions such as **sodium, potassium and calcium** control the working of muscles and nerves.\n" +
        "- **Red blood cells (erythrocytes)** are small, round, biconcave and have **no nucleus**. They carry oxygen using **haemoglobin**, are made in the **red bone marrow** and live about **100 to 127 days**.\n" +
        "- **White blood cells (leucocytes)** have a nucleus and fight germs. Five kinds: **neutrophils** (nucleus with three or more lobes, the most common), **eosinophils** (two-lobed nucleus), **basophils**, **monocytes** (large, kidney-shaped nucleus) and **lymphocytes** (one large round nucleus).\n" +
        "- **Platelets (thrombocytes)** are tiny cell pieces that start **blood clotting** at a wound.",
      table: {
        columns: ["Part of blood", "Number in 1 mm³ of blood", "Main job"],
        rows: [
          { cells: ["Red blood cells (erythrocytes)", "50 to 60 lakh", "Carry oxygen with haemoglobin"] },
          { cells: ["White blood cells (leucocytes)", "5000 to 10 000", "Fight germs"] },
          { cells: ["Platelets (thrombocytes)", "2.5 to 4 lakh", "Start blood clotting"] },
        ],
        caption: "Red cells far outnumber platelets, and platelets far outnumber white cells.",
      },
      selfCheckExample: {
        prompt: "Which white blood cell is the most common, and how can you spot it under a microscope?",
        steps: ["Of the five kinds of white cells, neutrophils are the most common.", "Its nucleus is split into three or more lobes."],
        answer: "The neutrophil: its nucleus has three or more lobes",
      },
      practiceSet: [
        { prompt: "Which plasma protein keeps the balance of water in blood?", answer: "Albumin" },
        { prompt: "Which pigment in red blood cells carries oxygen?", answer: "Haemoglobin" },
        { prompt: "Which substances in plasma control the working of muscles and nerves?", answer: "Inorganic ions such as sodium, potassium and calcium" },
        { prompt: "Which white blood cell has a large, kidney-shaped nucleus?", answer: "The monocyte" },
      ],
      pyqExampleId: "f3cf68c8-febc-4203-b5be-5a43494eb597",
      traps: [
        {
          title: "Giving red blood cells a nucleus",
          body: "Human red blood cells have no nucleus, which leaves more room for haemoglobin. White blood cells do have a nucleus.",
        },
        {
          title: "Mixing up the counts",
          body: "Red cells are 50 to 60 lakh in each cubic millimetre, platelets 2.5 to 4 lakh, and white cells only 5000 to 10 000.",
        },
        {
          title: "Making leucocytes clot blood",
          body: "Leucocytes are white cells and fight germs. Thrombocytes, the platelets, clot blood.",
        },
        {
          title: "Calling albumin a clotting protein",
          body: "Fibrinogen and prothrombin help blood clot. Albumin keeps the water balance of blood.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9hbbl-heart",
      name: "The heart and blood pressure",
      intuition:
        "The heart is two pumps side by side. The right side takes used, oxygen-poor blood from the body and sends it to the lungs. The left side takes fresh, oxygen-rich blood from the lungs and pushes it to the whole body, so its wall is the thickest. Each push raises the pressure in the arteries.",
      definition:
        "- The heart has **four chambers**: two **atria** on top that receive blood and two **ventricles** below that pump it out.\n" +
        "- The **tricuspid valve** lies between the right atrium and right ventricle; the **bicuspid (mitral) valve** between the left atrium and left ventricle. **Semilunar valves** guard the openings of the pulmonary artery and the aorta.\n" +
        "- The **pulmonary artery** is an artery that carries deoxygenated blood (to the lungs); the **pulmonary veins** bring oxygenated blood back.\n" +
        "- The **aorta (systemic aorta)** leaves the left ventricle and carries blood to the whole body.\n" +
        "- **Blood pressure** is written as **systolic over diastolic**: systolic while the ventricles contract, diastolic while they relax. School books give a healthy value of about **120/80 to 139/89 mm Hg** and call **160/100 mm Hg or more** high blood pressure. It is measured with a **sphygmomanometer**.\n" +
        "- The **giraffe** has the highest blood pressure of land animals, about twice ours, to push blood up its long neck to the brain.",
      table: {
        columns: ["Chamber", "Takes blood from or sends it to", "Kind of blood"],
        rows: [
          { cells: ["Right atrium", "Receives blood from the body through the superior and inferior vena cava", "Deoxygenated"] },
          { cells: ["Right ventricle", "Pumps blood to the lungs through the pulmonary artery", "Deoxygenated"] },
          { cells: ["Left atrium", "Receives blood from the lungs through the pulmonary veins", "Oxygenated"] },
          { cells: ["Left ventricle", "Pumps blood to the whole body through the aorta", "Oxygenated"], noteAmber: "The thickest wall of the heart." },
        ],
        caption: "Right side: oxygen-poor blood. Left side: oxygen-rich blood.",
      },
      selfCheckExample: {
        prompt: "Trace oxygen-poor blood from the body until it leaves the heart for the lungs.",
        steps: [
          "It enters the right atrium through the venae cavae.",
          "It passes the tricuspid valve into the right ventricle.",
          "The right ventricle pumps it into the pulmonary artery.",
        ],
        answer: "Venae cavae, right atrium, tricuspid valve, right ventricle, pulmonary artery",
      },
      practiceSet: [
        { prompt: "Which valve lies between the left atrium and the left ventricle?", answer: "The bicuspid (mitral) valve" },
        { prompt: "Which chamber of the heart has the thickest wall, and why?", answer: "The left ventricle, because it pumps blood to the whole body" },
        { prompt: "Which instrument is used to measure blood pressure?", answer: "A sphygmomanometer" },
        { prompt: "Why does a giraffe need a very high blood pressure?", answer: "To push blood up its long neck to the brain" },
      ],
      pyqExampleId: "5b2a6012-e640-45d6-baeb-2f474b900059",
      traps: [
        {
          title: "Thinking every artery carries oxygenated blood",
          body: "The pulmonary artery carries deoxygenated blood to the lungs, and the pulmonary veins carry oxygenated blood back to the heart.",
        },
        {
          title: "Swapping systolic and diastolic",
          body: "Systolic pressure is recorded while the heart contracts and is the higher number. Diastolic is recorded while it relaxes and is the lower number.",
        },
        {
          title: "Putting the tricuspid valve on the left",
          body: "The tricuspid valve is on the right side, between the right atrium and right ventricle. The left side has the bicuspid valve.",
        },
      ],
    },
  ],
};
