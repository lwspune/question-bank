import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_HU_HEART_NOTE: SubtopicNote = {
  subtopicName: "Heart and Circulation",
  title: "Heart and Circulation",
  oneLineDefinition:
    "The four chambers of the heart, the double circulation through the lungs and the body, the main blood vessels, and what blood pressure and the pulse measure.",
  whyItMatters:
    "Seven CDS questions from 2021 (II) to 2026 (I). Four are about blood pressure and the pulse, two of them in 2025 (I); three trace the path of blood between the heart and the lungs.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbihu-double",
      name: "Double circulation and the blood vessels",
      intuition:
        "The heart is two pumps side by side. The right side takes used, oxygen-poor blood from the body and sends it to the lungs. The lungs fill it with oxygen and send it back to the left side, which pumps it out to the whole body. So blood passes through the heart twice in one round: that is double circulation. Arteries carry blood away from the heart, veins bring it back, and capillaries join the two.",
      definition:
        "The heart and the path of blood:\n" +
        "- Four chambers: two **atria** (receive blood) above, two **ventricles** (pump blood) below. The left ventricle has the thickest wall, since it pumps to the whole body.\n" +
        "- **Right side, oxygen-poor**: body → **vena cava** → right atrium → right ventricle → **pulmonary artery** → lungs.\n" +
        "- **Left side, oxygen-rich**: lungs → **pulmonary vein** → **left atrium** → left ventricle → **aorta** → body.\n" +
        "- **Arteries** carry blood **away** from the heart (thick, elastic walls). **Veins** bring it **back** (thinner walls, valves). **Capillaries** are the thin vessels that connect arteries to veins, where exchange with the tissues happens.\n" +
        "- The **coronary arteries** supply the heart muscle itself.\n" +
        "- The pulmonary artery is the one artery with oxygen-poor blood, and the pulmonary vein the one vein with oxygen-rich blood.",
      table: {
        columns: ["Vessel", "Carries blood from", "To"],
        rows: [
          { cells: ["Pulmonary artery", "Right ventricle", "Lungs (oxygen-poor blood)"] },
          {
            cells: ["Pulmonary vein", "Lungs", "Left atrium (oxygen-rich blood)"],
            noteAmber: "Asked twice, CDS 2021 (II) and 2026 (I): oxygen-rich blood from the lungs enters the left atrium first.",
            pyqExampleId: "962ecf1e-2368-4885-a450-cdd2ced6e3df",
          },
          { cells: ["Aorta", "Left ventricle", "The whole body"] },
          { cells: ["Vena cava", "The whole body", "Right atrium"] },
          { cells: ["Coronary artery", "Aorta", "The heart muscle"] },
          { cells: ["Capillaries", "Arteries", "Veins"] },
        ],
      },
      pyqExampleId: "6b357d5b-f185-4148-80c8-caedca915546",
      selfCheckExample: {
        prompt: "A baby is born with a hole in the wall between the two ventricles. Why does the baby tire easily and look bluish?",
        steps: [
          "Normally the left side holds only oxygen-rich blood and the right side only oxygen-poor blood.",
          "Through the hole the two kinds of blood mix, so the blood the left ventricle pumps to the body carries less oxygen.",
        ],
        answer: "Oxygen-rich and oxygen-poor blood mix, so the body gets less oxygen than it needs.",
      },
      practiceSet: [
        { prompt: "Which chamber of the heart pumps blood to the whole body?", answer: "The left ventricle" },
        { prompt: "Which vessel brings oxygen-poor blood from the body back to the heart?", answer: "The vena cava" },
        { prompt: "How many chambers does the human heart have?", answer: "Four" },
        { prompt: "Which kind of blood vessel has valves to stop blood flowing backwards?", answer: "Veins" },
      ],
      traps: [
        {
          title: "Artery means away, not oxygen-rich",
          body: "An **artery** carries blood **away** from the heart, a **vein** towards it. So the **pulmonary artery** carries oxygen-poor blood and the **pulmonary vein** oxygen-rich blood.",
        },
        {
          title: "Left is oxygen-rich",
          body: "Oxygen-rich blood arrives on the **left** side (left atrium) from the lungs and leaves from the left ventricle to the body. Options that put oxygen-poor blood on the left, or send oxygen-rich blood out from the right, are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbihu-pressure",
      name: "Blood pressure and the pulse",
      intuition:
        "Each time the ventricles squeeze, they push a surge of blood into the arteries and the pressure inside rises; as they relax and refill, it falls. Blood pressure is written as these two numbers, the high one over the low one. The surge also stretches the elastic wall of the aorta and the big arteries, which then spring back. You feel that stretch and recoil as the pulse.",
      definition:
        "Blood pressure:\n" +
        "- Written as **systolic / diastolic**; normal is about **120/80 mm Hg**.\n" +
        "- **Systolic** (the higher number): pressure while the **ventricles contract**.\n" +
        "- **Diastolic** (the lower number): pressure while the **ventricles relax**.\n" +
        "- Measured with a **sphygmomanometer**. Pressure that stays high is **hypertension**.\n\n" +
        "The pulse:\n" +
        "- The rhythmic **expansion and recoil** of the **aorta and the main arteries** after each heartbeat, felt where an artery lies close to the skin, as at the wrist.\n" +
        "- The resting pulse of an adult is about **72 beats a minute**, the same as the heart rate.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          {
            cells: ["Systolic pressure", "About 120 mm Hg, while the ventricles contract"],
            noteAmber: "CDS 2025 (I): the normal systolic pressure is 120 mm Hg.",
            pyqExampleId: "de56d38e-9971-42d8-8b87-3b1ac179b48d",
          },
          { cells: ["Diastolic pressure", "About 80 mm Hg, while the ventricles relax"] },
          {
            cells: ["Sphygmomanometer", "The instrument that measures blood pressure"],
            noteAmber: "CDS 2025 (I): blood pressure is measured manually with a sphygmomanometer.",
            pyqExampleId: "7f66e919-8542-4431-8be8-9c97c36e05dd",
          },
          {
            cells: ["Pulse", "Stretch and recoil of the aorta and main arteries"],
            noteAmber: "CDS 2024 (I): the pulse comes from the aorta and main arteries, not the heart chambers or valves.",
            pyqExampleId: "802db9d7-24cf-445d-a077-c4ce44233075",
          },
          { cells: ["Resting pulse rate", "About 72 per minute"] },
        ],
      },
      pyqExampleId: "6ae33010-0564-4189-b6ee-dc6c4333fbf0",
      selfCheckExample: {
        prompt: "Why can you feel a pulse in an artery at the wrist but not in the veins on the back of your hand?",
        steps: [
          "Each heartbeat sends a surge of pressure into the arteries, whose elastic walls stretch and spring back.",
          "By the time blood reaches the veins it has passed through the capillaries, and its pressure is low and steady.",
        ],
        answer: "Only arteries carry the pressure surge of each beat; blood in the veins flows smoothly at low pressure.",
      },
      practiceSet: [
        { prompt: "What is the normal resting pulse rate of an adult, roughly?", answer: "About 72 per minute" },
        { prompt: "What is blood pressure that stays too high called?", answer: "Hypertension" },
        { prompt: "At which part of the arm is the pulse most often felt?", answer: "At the wrist" },
        { prompt: "Which instrument measures blood pressure?", answer: "A sphygmomanometer" },
      ],
      traps: [
        {
          title: "Both numbers are about the ventricles",
          body: "120 is the pressure while the **ventricles contract** and 80 while they **relax**. Options about the atria (auricles) contracting, or with the order reversed, are wrong.",
        },
        {
          title: "The pulse is in the arteries",
          body: "The pulse is the **aorta and arteries** stretching and recoiling. It is not the heart's chambers, the heart valves or the valves in veins.",
        },
      ],
    },
  ],
};
