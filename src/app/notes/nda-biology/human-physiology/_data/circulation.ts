import type { SubtopicNote } from "@/app/notes/_types";

export const CIRCULATION_NOTE: SubtopicNote = {
  subtopicName: "Circulatory and Lymphatic System",
  title: "Circulation — Heart, Vessels and Blood",
  oneLineDefinition:
    "The heart pumps blood through arteries and veins in a double circuit; blood is a connective tissue, lymph resembles plasma, and clotting seals wounds with fibrin.",
  whyItMatters:
    "6 PYQs. The heart's four chambers and valves, the artery-vs-vein contrast, and the clotting proteins are all recall staples. " +
    "The one fact the bank traps most often: the pulmonary artery carries DEOXYGENATED blood — the exception to 'arteries carry oxygenated blood'.",
  concepts: [
    // heart chambers & valves (FORMULA + diagram)
    {
      kind: "formula" as const,
      slug: "heart-chambers-valves",
      name: "Heart chambers, valves, and blood flow",
      intuition:
        "The human heart has four chambers — two upper auricles (atria) that receive blood and two lower ventricles that pump it out. " +
        "Valves between and out of the chambers keep blood moving one way only. " +
        "The single most-tested route: oxygenated blood from the lungs returns to the LEFT auricle.",
      definition:
        "Four chambers and their valves:\n" +
        "- **Right auricle → right ventricle**: guarded by the **tricuspid valve**.\n" +
        "- **Left auricle → left ventricle**: guarded by the **bicuspid (mitral) valve**.\n" +
        "- **Ventricle → artery** (pulmonary or aorta): guarded by **semilunar valves**.\n" +
        "- **Oxygenated** blood from the lungs enters the **left auricle** (via pulmonary veins); **deoxygenated** blood from the body enters the right auricle.",
      visualizationSlug: "hp-heart-chambers",
      authoredExample: {
        prompt:
          "Trace a drop of oxygenated blood from the lungs to the moment it is pumped towards the body. Which chambers and valve does it pass?",
        steps: [
          "Oxygenated blood leaves the lungs through the pulmonary veins.",
          "It enters the **left auricle** (left atrium).",
          "It passes through the **bicuspid (mitral) valve** into the left ventricle.",
          "The left ventricle pumps it through the **aortic semilunar valve** into the aorta, to the body.",
        ],
        answer: "Left auricle → bicuspid valve → left ventricle → aortic semilunar valve → aorta.",
      },
      selfCheckExample: {
        prompt:
          "Which valve guards the opening between the right ventricle and the pulmonary artery?",
        steps: [
          "Blood leaving a ventricle into an artery passes a semilunar valve.",
          "The right ventricle pumps into the pulmonary artery.",
          "So the valve is the pulmonary semilunar valve — not bicuspid/mitral (left side) or tricuspid (right atrium-ventricle).",
        ],
        answer: "The (pulmonary) semilunar valve.",
      },
      practiceSet: [
        { prompt: "Which chamber receives oxygenated blood from the lungs?", answer: "Left auricle (left atrium)" },
        { prompt: "Which valve is between the right auricle and right ventricle?", answer: "Tricuspid valve" },
        { prompt: "Which valve guards a ventricle-to-artery opening?", answer: "Semilunar valve" },
        { prompt: "Bicuspid (mitral) valve is on which side?", answer: "Left", method: "between left auricle and left ventricle" },
      ],
      pyqExampleId: "81dce6e2-cddc-4559-874f-7878e3c721d9", // semilunar valve
      traps: [
        {
          title: "Bicuspid = left, tricuspid = right",
          body:
            "The **tricuspid** valve is on the **right** (right auricle → right ventricle); the **bicuspid / mitral** is on the **left**. Memory hook: 'LAB' — Left Atrium = Bicuspid. Semilunar valves guard the artery exits.",
        },
      ],
    },

    // arteries vs veins (REFERENCE)
    {
      kind: "reference" as const,
      slug: "arteries-veins",
      name: "Arteries vs veins",
      intuition:
        "Arteries carry blood AWAY from the heart, veins carry it TOWARDS the heart. Arteries have thick elastic walls (they take the pump's pressure) and no valves; veins have thinner walls and valves to stop backflow. " +
        "The crucial exception: the pulmonary vessels reverse the usual oxygen rule.",
      definition:
        "The contrast and its famous exception:\n" +
        "- **Arteries**: carry blood **away** from the heart; thick, elastic walls; **no valves**; usually oxygenated.\n" +
        "- **Veins**: carry blood **towards** the heart; thinner walls; **have valves**; usually deoxygenated.\n" +
        "- **Exception**: the **pulmonary artery carries DEOXYGENATED blood** (heart → lungs) and the **pulmonary vein carries OXYGENATED blood** (lungs → heart).",
      table: {
        columns: ["Feature", "Artery", "Vein"],
        rows: [
          { cells: ["Direction", "Away from heart", "Towards heart"] },
          { cells: ["Wall", "Thick, elastic", "Thinner"] },
          { cells: ["Valves", "Absent", "Present"] },
          {
            cells: ["Usual blood", "Oxygenated", "Deoxygenated"],
            noteAmber: "EXCEPTION: pulmonary artery = deoxygenated; pulmonary vein = oxygenated.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which statement is wrong: (a) arteries carry blood away from the heart, (b) the pulmonary artery always carries oxygenated blood, (c) arteries have no valves?",
        steps: [
          "Arteries do carry blood away — (a) is correct.",
          "Arteries lack valves — (c) is correct.",
          "The pulmonary artery carries DEOXYGENATED blood to the lungs — so (b) is the wrong statement.",
        ],
        answer: "(b) is wrong — the pulmonary artery carries deoxygenated blood.",
      },
      practiceSet: [
        { prompt: "Which vessels have valves — arteries or veins?", answer: "Veins" },
        { prompt: "Do arteries carry blood towards or away from the heart?", answer: "Away" },
        { prompt: "Which artery carries deoxygenated blood?", answer: "Pulmonary artery" },
      ],
      pyqExampleId: "5572b40c-cdb0-457c-a8b0-da75faf40a07", // arteries/veins NOT correct
      traps: [
        {
          title: "'Arteries carry oxygenated blood' is only USUALLY true",
          body:
            "The **pulmonary artery** carries deoxygenated blood (to the lungs) and the **pulmonary vein** carries oxygenated blood (back to the heart). Any option claiming pulmonary arteries 'always' carry oxygenated blood is the wrong statement.",
        },
      ],
    },

    // blood, lymph & clotting (FORMULA)
    {
      kind: "formula" as const,
      slug: "blood-lymph-clotting",
      name: "Blood, lymph, and clotting",
      intuition:
        "Blood is a connective tissue — plasma carrying red cells, white cells and platelets. When some plasma leaks out into the tissue spaces it becomes lymph. " +
        "When a vessel is cut, a cascade converts the soluble protein fibrinogen into the insoluble mesh fibrin, which traps cells and seals the wound.",
      definition:
        "The facts the bank tests:\n" +
        "- **Plasma** — the fluid part of blood (~55%); carries cells, proteins, nutrients.\n" +
        "- **Lymph** — tissue fluid that **resembles plasma** but lacks red blood cells and has fewer proteins.\n" +
        "- **Clotting** — **fibrinogen** (soluble) is converted by thrombin into **fibrin** (insoluble mesh). **Vitamin K** and calcium are required.",
      authoredExample: {
        prompt:
          "A cut starts to bleed, then a clot forms. Which plasma protein turns into the mesh that traps the blood cells, and which vitamin is required for the process?",
        steps: [
          "Platelets gather at the wound and trigger the clotting cascade.",
          "The soluble plasma protein **fibrinogen** is converted into insoluble **fibrin** threads.",
          "Fibrin forms a mesh that traps blood cells, forming the clot.",
          "Vitamin K is needed to make the clotting factors (e.g. prothrombin) that drive this.",
        ],
        answer: "Fibrinogen → fibrin forms the mesh; Vitamin K is required.",
      },
      selfCheckExample: {
        prompt:
          "Lymph is found in the spaces between cells. Which fluid of the blood does it most resemble, and what is it missing?",
        steps: [
          "Lymph is formed from plasma that leaks out of blood capillaries into tissue spaces.",
          "So it resembles **plasma**.",
          "It lacks red blood cells and has fewer proteins than plasma.",
        ],
        answer: "Lymph resembles plasma; it lacks red blood cells (and has fewer proteins).",
      },
      practiceSet: [
        { prompt: "Lymph most resembles which part of blood?", answer: "Plasma" },
        { prompt: "Which soluble protein becomes fibrin during clotting?", answer: "Fibrinogen" },
        { prompt: "Which vitamin is needed for blood clotting?", answer: "Vitamin K" },
        { prompt: "Is blood a connective tissue?", answer: "Yes", method: "cells suspended in a fluid matrix (plasma)" },
      ],
      pyqExampleId: "5aa068ad-a5e5-4f30-aceb-b2e04e11cf1e", // fibrinogen
      traps: [
        {
          title: "Fibrinogen vs fibrin",
          body:
            "**Fibrinogen** is the soluble plasma protein; **fibrin** is the insoluble mesh it becomes. The clotting-protein question's answer is **fibrinogen** — distractors offer non-proteins (pathogen) or cells (macrophage, phagocyte).",
        },
      ],
    },
  ],
};
