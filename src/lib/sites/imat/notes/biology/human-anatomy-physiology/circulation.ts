import type { SubtopicNote } from "@/app/notes/_types";

const O2 = "\\(\\mathrm{O_2}\\)";
const CO2 = "\\(\\mathrm{CO_2}\\)";

export const IMAT_BIO_HAP_CIRCULATION_NOTE: SubtopicNote = {
  subtopicName: "Heart and Circulation",
  title: "The Heart, the Cardiac Cycle and Blood Vessels",
  oneLineDefinition:
    "Two pumps side by side send blood through the lungs and round the body; valves open and close only because of pressure differences.",
  whyItMatters:
    "The cardiac cycle was a favourite of the Cambridge papers (2014, 2015, 2017, 2018, 2021, 2022), usually as which valve is open or which pressure is higher. They also asked which vessel carries the least carbon dioxide or urea (2012) and about the hole in the fetal heart (2020).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-hap-vessels",
      name: "Double circulation and the main blood vessels",
      intuition:
        "Blood passes through the heart twice on every full circuit: once to be pumped to the lungs and once to be pumped to the body. Each organ changes the blood that leaves it, so every named vessel has a known content: the lungs add oxygen, the kidneys remove urea, the gut adds digested food.",
      definition:
        "**Double circulation**:\n" +
        "- **Pulmonary circuit**: right ventricle, pulmonary artery, lungs, pulmonary veins, left atrium.\n" +
        "- **Systemic circuit**: left ventricle, aorta, body organs, venae cavae, right atrium.\n" +
        "- **Arteries** carry blood **away from** the heart; **veins** carry it **towards** the heart. This is about direction, not oxygen.\n" +
        "- Arteries: thick muscular and elastic walls, narrow lumen, high pressure, no valves along their length.\n" +
        "- Veins: thin walls, wide lumen, low pressure, **valves** to stop backflow; contracting skeletal muscles squeeze blood back to the heart.\n" +
        "- **Capillaries**: walls one endothelial cell thick, where exchange with the tissues happens.\n" +
        "- The **hepatic portal vein** takes blood from the gut to the liver before it reaches the heart.",
      table: {
        columns: ["Vessel", "From and to", "Oxygen content", "Notable feature"],
        rows: [
          { cells: ["Aorta", "Left ventricle to the body", "High", "Highest blood pressure"] },
          { cells: ["Pulmonary artery", "Right ventricle to the lungs", "Low", `The only artery with deoxygenated blood; high ${CO2}`] },
          { cells: ["Pulmonary vein", "Lungs to the left atrium", "High", `The only vein with oxygenated blood; lowest ${CO2}`] },
          { cells: ["Venae cavae", "Body to the right atrium", "Low", "Lowest blood pressure"] },
          { cells: ["Hepatic portal vein", "Gut to the liver", "Low", "Highest glucose and amino acids after a meal"] },
          { cells: ["Hepatic vein", "Liver to the vena cava", "Low", "Carries the urea the liver has just made"] },
          { cells: ["Renal artery", "Aorta to the kidney", "High", "Still carries urea to be removed"] },
          { cells: ["Renal vein", "Kidney to the vena cava", "Low", "Lowest urea concentration in the body"] },
        ],
      },
      selfCheckExample: {
        prompt: "Shortly after a meal rich in starch, which blood vessel carries blood with the highest glucose concentration?",
        options: ["Hepatic vein", "Renal vein", "Hepatic portal vein", "Pulmonary vein", "Aorta"],
        steps: [
          "Glucose absorbed in the small intestine enters capillaries that drain into the hepatic portal vein, before the liver has stored any of it as glycogen.",
          "The hepatic vein (A) carries blood after the liver has removed glucose. The other vessels carry mixed blood that has already been diluted round the body.",
        ],
        answer: "(C) Hepatic portal vein",
      },
      practiceSet: [
        { prompt: "Which artery carries deoxygenated blood?", answer: "The pulmonary artery" },
        { prompt: "Which vessel carries blood with the lowest urea concentration?", answer: "The renal vein" },
        { prompt: "Why do veins have valves but arteries do not?", answer: "Venous blood is at low pressure and could flow backwards; valves stop this" },
        { prompt: "Which chamber receives blood from the pulmonary veins?", answer: "The left atrium" },
      ],
      traps: [
        {
          title: "Artery does not mean oxygenated",
          body: `An artery is any vessel carrying blood away from the heart. The pulmonary artery carries blood low in ${O2} to the lungs, and the pulmonary vein carries blood rich in ${O2} back to the heart.`,
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-heart-control",
      name: "Heart structure, the pacemaker and the control of heart rate",
      intuition:
        "Heart muscle starts its own beat: it is myogenic, so a heart keeps beating even with its nerves cut. A small patch of tissue, the pacemaker, fires first, and a delay station makes sure the atria finish emptying before the ventricles squeeze. The brain only speeds the rhythm up or slows it down.",
      definition:
        "**Chambers**: two atria on top receive blood; two ventricles below pump it out. The **left ventricle** has the thickest wall because it pumps to the whole body.\n" +
        "- The **septum** separates the left and right sides.\n" +
        "- **Atrioventricular (AV) valves**: tricuspid on the right, bicuspid (mitral) on the left, held by tendinous cords.\n" +
        "- **Semilunar valves**: the pulmonary valve and the aortic valve, at the base of the two arteries.\n" +
        "- Heart rate is set by the **sinoatrial node** and changed by the **cardiovascular centre in the medulla oblongata**: sympathetic nerves speed it up, the parasympathetic **vagus nerve** slows it down. **Adrenaline** in the blood also speeds it up.\n" +
        "- **Fetal heart**: a hole in the wall between the atria (the **foramen ovale**) and a short vessel from the pulmonary artery to the aorta (the **ductus arteriosus**) let blood bypass the lungs, which do not work before birth. Both close soon after birth.",
      table: {
        columns: ["Structure", "Where", "Job"],
        rows: [
          { cells: ["Sinoatrial node (SAN)", "Wall of the right atrium", "Pacemaker: starts each wave of excitation, which spreads over both atria"] },
          { cells: ["Atrioventricular node (AVN)", "Between the atria and the ventricles", "Delays the wave by about 0.1 s so the atria empty first"] },
          { cells: ["Bundle of His and Purkinje fibres", "In the septum and the ventricle walls", "Carry the wave to the apex, so the ventricles contract from the bottom up"] },
          { cells: ["AV valves", "Between each atrium and ventricle", "Stop backflow into the atria when the ventricles contract"] },
          { cells: ["Semilunar valves", "At the base of the aorta and the pulmonary artery", "Stop backflow into the ventricles when they relax"] },
          { cells: ["Cardiovascular centre", "Medulla oblongata", "Adjusts heart rate through sympathetic and parasympathetic nerves"] },
        ],
      },
      selfCheckExample: {
        prompt: "In a heart transplant the nerves from the brain to the new heart are cut. What happens to the transplanted heart?",
        options: [
          "It keeps beating, because the sinoatrial node starts each beat",
          "It stops, because each beat needs an impulse from the brain",
          "Only the atria keep contracting",
          "The ventricles now contract before the atria",
          "It beats, but always at its maximum rate",
        ],
        steps: [
          "Cardiac muscle is myogenic: the sinoatrial node fires on its own, so the heart keeps beating without nerves.",
          "Option B is the usual misconception. The conduction pathway inside the heart is intact, so the order atria then ventricles is unchanged (C, D). Without the vagus nerve the rate sits at the node's own resting rate, not at a maximum (E).",
        ],
        answer: "(A) It keeps beating, because the sinoatrial node starts each beat",
      },
      practiceSet: [
        { prompt: "Why is the wall of the left ventricle thicker than the right?", answer: "It pumps blood round the whole body at a much higher pressure" },
        { prompt: "What is the purpose of the delay at the atrioventricular node?", answer: "The atria finish emptying before the ventricles contract" },
        { prompt: "Which nerve slows the heart?", answer: "The vagus nerve (parasympathetic)" },
        { prompt: "Which fetal structure lets blood pass from the right atrium straight to the left atrium?", answer: "The foramen ovale" },
      ],
      traps: [
        {
          title: "The brain changes the heart rate but does not start the beat",
          body: "Each beat starts at the sinoatrial node. The medulla only adjusts the rate through autonomic nerves. Pick the medulla oblongata, not the cerebrum or cerebellum, for the nervous control of heart rate.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-cardiac-cycle",
      name: "The cardiac cycle: pressure changes and valve positions",
      intuition:
        "Valves are passive flaps. A valve is pushed open when the pressure behind it is higher than the pressure in front, and slams shut when the pressure in front becomes higher. So if you know which chamber is squeezing, you can work out every valve.",
      definition:
        "One cycle takes about 0.8 s at 75 beats per minute. Left and right sides do the same thing at the same time.\n" +
        "- **Systole** means contraction; **diastole** means relaxation.\n" +
        "- **Valve rule**: a valve opens when the pressure upstream is higher than downstream, and closes when it is lower.\n" +
        "- Most ventricular filling (about 70%) is passive, before the atria contract.\n" +
        "- The atria fill while the ventricles are contracting, so when ventricular pressure is highest the atria are filling.\n" +
        "- First heart sound (lub): AV valves closing. Second heart sound (dub): semilunar valves closing.\n" +
        "- Peak pressure is about 120 mmHg in the left ventricle and about 25 mmHg in the right.",
      table: {
        columns: ["Phase", "Atria", "Ventricles", "AV valves", "Semilunar valves"],
        rows: [
          { cells: ["Atrial systole", "Contract: volume falls, pressure rises", "Relaxed, receiving the last blood", "Open", "Closed"] },
          { cells: ["Start of ventricular systole", "Relaxed, begin to fill", "Contract; pressure rises above the atria but not yet above the arteries", "Closed (first sound)", "Closed"] },
          { cells: ["Ventricular ejection", "Relaxed, filling", "Pressure above the aorta and pulmonary artery: blood leaves", "Closed", "Open"] },
          { cells: ["Start of ventricular diastole", "Relaxed, filling", "Relax; pressure falls below the arteries", "Closed", "Close (second sound)"] },
          { cells: ["Passive filling", "Relaxed; blood flows through", "Relaxed; pressure below the atria", "Open", "Closed"] },
        ],
      },
      selfCheckExample: {
        prompt: "At which moment in the cardiac cycle are all four valves of the heart closed?",
        options: [
          "During atrial systole",
          "While blood is being ejected into the aorta",
          "During passive filling of the ventricles",
          "Just after the ventricles start contracting, before any blood leaves them",
          "Throughout the whole of diastole",
        ],
        steps: [
          "When the ventricles start to contract, their pressure rises above the atria, so the AV valves shut. It is not yet above the arteries, so the semilunar valves are still shut. All four are closed.",
          "In A and C the AV valves are open. In B the semilunar valves are open. In most of diastole the AV valves are open (E).",
        ],
        answer: "(D) Just after the ventricles start contracting, before any blood leaves them",
      },
      practiceSet: [
        { prompt: "What makes the aortic valve close?", answer: "Pressure in the left ventricle falling below the pressure in the aorta" },
        { prompt: "When ventricular pressure is at its highest, are the atria filling or emptying?", answer: "Filling" },
        { prompt: "Which valves closing makes the first heart sound?", answer: "The atrioventricular valves" },
        { prompt: "During atrial systole, what happens to the volume and pressure in the atria?", answer: "Volume falls and pressure rises; the AV valves are open" },
      ],
      traps: [
        {
          title: "Valves follow pressure, not timing words",
          body: "Do not learn the cycle as a list of times. Compare the pressure on each side of a valve: higher upstream means open, higher downstream means closed. An option saying an AV valve is open while its ventricle contracts is always wrong.",
        },
        {
          title: "Left and right contract together",
          body: "Both atria contract together, then both ventricles. The right atrium does not contract at the same moment as the left ventricle, and one AV valve does not open as the other closes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-hap-cardiac-output",
      name: "Cardiac output, stroke volume and heart rate",
      intuition:
        "The volume of blood the heart pumps each minute is the volume per beat times the number of beats. A trained athlete has a bigger stroke volume, so at rest the same output needs fewer beats.",
      definition:
        "- **Stroke volume** (SV): the volume pumped by one ventricle in one beat, about 70 mL at rest.\n" +
        "- **Heart rate** (HR): beats per minute.\n" +
        "- **Cardiac output** (CO): the volume pumped by one ventricle per minute, about 5 L/min at rest and up to about 25 L/min in hard exercise.\n" +
        "- Stroke volume is the difference between the volume in the ventricle at the end of filling and at the end of contraction. The **ejection fraction** is the share of the filled volume that is pumped out, normally about 55% to 70%.",
      formula: {
        label: "Cardiac output",
        latex: "CO = SV \\times HR \\qquad SV = EDV - ESV",
        symbols: [
          { symbol: "\\(CO\\)", meaning: "cardiac output, in mL/min or L/min" },
          { symbol: "\\(SV\\)", meaning: "stroke volume, in mL per beat" },
          { symbol: "\\(HR\\)", meaning: "heart rate, in beats per minute" },
          { symbol: "\\(EDV, ESV\\)", meaning: "volume in the ventricle at the end of diastole and at the end of systole, in mL" },
        ],
      },
      authoredExample: {
        prompt:
          "A person's left ventricle holds 130 mL at the end of filling and 60 mL at the end of contraction. The heart rate is 70 beats per minute. Find the stroke volume, the cardiac output and the ejection fraction.",
        steps: [
          "\\(SV = 130 - 60 = 70\\ \\text{mL}\\).",
          "\\(CO = 70 \\times 70 = 4900\\ \\text{mL/min} = 4.9\\ \\text{L/min}\\).",
          "Ejection fraction \\(= 70 / 130 \\approx 0.54\\), so about 54% of the blood is pumped out each beat.",
        ],
        answer: "70 mL; 4.9 L/min; about 54%",
      },
      selfCheckExample: {
        prompt: "During a race an athlete's cardiac output is 20 L/min and the heart rate is 160 beats per minute. What is the stroke volume?",
        options: ["8 mL", "12.5 mL", "3200 mL", "0.125 mL", "125 mL"],
        steps: [
          "\\(SV = CO / HR = 20\\,000\\ \\text{mL/min} / 160 = 125\\ \\text{mL}\\).",
          "Option A divides the rate by the output. B and D slip a power of ten when converting litres to millilitres. C multiplies instead of dividing.",
        ],
        answer: "(E) 125 mL",
      },
      practiceSet: [
        { prompt: "Heart rate 60 per minute, stroke volume 80 mL. What is the cardiac output?", answer: "4.8 L/min", method: "\\(80 \\times 60 = 4800\\ \\text{mL/min}\\)" },
        { prompt: "Cardiac output 6.0 L/min with a stroke volume of 75 mL. What is the heart rate?", answer: "80 beats per minute", method: "\\(6000 / 75\\)" },
        { prompt: "A ventricle fills to 140 mL and empties to 56 mL. What is the ejection fraction?", answer: "60%", method: "\\((140 - 56)/140\\)" },
      ],
      traps: [
        {
          title: "Convert litres to millilitres before dividing",
          body: "Cardiac output is usually given in L/min and stroke volume in mL. Dividing litres by beats per minute gives litres per beat, so 20 L/min at 160 per minute is 0.125 L, which is 125 mL, not 0.125 mL.",
        },
      ],
    },
  ],
};
