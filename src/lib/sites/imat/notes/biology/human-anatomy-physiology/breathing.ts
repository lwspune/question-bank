import type { SubtopicNote } from "@/app/notes/_types";

const O2 = "\\(\\mathrm{O_2}\\)";
const CO2 = "\\(\\mathrm{CO_2}\\)";
const HCO3 = "\\(\\mathrm{HCO_3^-}\\)";
const H = "\\(\\mathrm{H^+}\\)";

export const IMAT_BIO_HAP_BREATHING_NOTE: SubtopicNote = {
  subtopicName: "Breathing and Gas Exchange",
  title: "Airways, Breathing and Gas Transport",
  oneLineDefinition:
    "Muscles change the volume of the chest so air flows in and out, gases cross the thin alveolar wall, and haemoglobin loads oxygen in the lungs and unloads it where tissues are active.",
  whyItMatters:
    "The 2026 paper asked the site of gas exchange and what the epiglottis is made of, and 2025 asked the effect of the Bohr effect on haemoglobin. Earlier papers asked which events happen during inhalation (2011) and how haemoglobin and myoglobin carry oxygen (2019).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-hap-airways",
      name: "The airway from the nose to the alveoli",
      intuition:
        "The upper airways clean, warm and moisten the air and are held open by cartilage. Only at the very end, in the alveoli, is the wall thin enough for gases to cross. Everything before that is just a pipe.",
      definition:
        "Air passes: nasal cavity, pharynx, larynx, trachea, two bronchi, many bronchioles, alveoli.\n" +
        "- The **alveoli** are the site of gas exchange. They suit it because they have a huge total surface (about 70 m²), a wall of flat squamous cells one cell thick lying against capillary endothelium (a diffusion path under 1 µm), and steep concentration gradients kept by breathing and by blood flow.\n" +
        "- **Surfactant**, made by alveolar cells, lowers surface tension so the alveoli do not collapse when you breathe out.\n" +
        "- The **epiglottis** is a flap of elastic **cartilage** that covers the larynx during swallowing, so food goes down the oesophagus.\n" +
        "- Smooth muscle in the bronchioles can narrow them; in asthma it contracts too strongly.",
      table: {
        columns: ["Structure", "Tissues", "Job"],
        rows: [
          { cells: ["Nasal cavity", "Ciliated epithelium, mucus, many blood vessels", "Filters, warms and moistens air"] },
          { cells: ["Epiglottis", "Elastic cartilage", "Closes the larynx when swallowing"] },
          { cells: ["Trachea", "C-shaped cartilage rings, ciliated epithelium with goblet cells, smooth muscle", "Kept open by cartilage; mucus and cilia remove dirt"] },
          { cells: ["Bronchi", "Cartilage plates, ciliated epithelium", "Carry air into each lung"] },
          { cells: ["Bronchioles", "Smooth muscle and elastic fibres, no cartilage", "Branch through the lung; adjust airflow"] },
          { cells: ["Alveoli", "Squamous epithelium, elastic fibres, surfactant", "Gas exchange with the capillaries"] },
        ],
      },
      selfCheckExample: {
        prompt: "Smoking damages the cilia lining a person's bronchi. Which result is most likely?",
        options: [
          "Mucus and trapped particles build up in the airways",
          "Gas exchange stops in the bronchi",
          "The trachea collapses",
          "The alveoli stop making surfactant",
          "The epiglottis no longer closes",
        ],
        steps: [
          "Cilia sweep mucus, with its trapped dust and microbes, up to the throat. Without them mucus collects, causing coughing and infections.",
          "No gas exchange happens in the bronchi anyway (B). Cartilage, not cilia, keeps the trachea open (C). Surfactant and the epiglottis do not depend on cilia (D, E).",
        ],
        answer: "(A) Mucus and trapped particles build up in the airways",
      },
      practiceSet: [
        { prompt: "Why are the cartilage rings of the trachea C-shaped rather than complete?", answer: "The gap at the back lets the oesophagus expand when food is swallowed" },
        { prompt: "What does surfactant do?", answer: "Lowers surface tension so the alveoli do not collapse" },
        { prompt: "Which airways have no cartilage?", answer: "The bronchioles" },
        { prompt: "How many cell layers must oxygen cross to go from an alveolus into the blood?", answer: "Two: the alveolar wall and the capillary wall" },
      ],
      traps: [
        {
          title: "Gas exchange happens only in the alveoli",
          body: "The trachea, bronchi and bronchioles only conduct air. The diaphragm is a muscle that moves air. Neither the trachea nor the diaphragm exchanges gases.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-ventilation",
      name: "Inhaling and exhaling: volume and pressure changes",
      intuition:
        "Lungs have no muscle of their own. The chest wall and diaphragm make the chest bigger, which lowers the pressure inside, and air flows in from outside. Making the chest smaller raises the pressure and pushes air out.",
      definition:
        "Gas pressure falls as volume rises (Boyle's law). Air always flows from higher to lower pressure.\n" +
        "- The lungs are wrapped in two **pleural membranes** with a thin fluid between them, so the lungs follow the chest wall.\n" +
        "- If air gets into the pleural space (a **pneumothorax**), the lung on that side collapses, because nothing holds it against the chest wall.\n" +
        "- Quiet exhalation is **passive**: the muscles relax and the stretched elastic fibres recoil. Forced exhalation uses the internal intercostal and abdominal muscles.\n" +
        `- The breathing rate is set by the **medulla oblongata**, mainly in response to blood ${CO2} (sensed through its effect on pH).`,
      table: {
        columns: ["Feature", "Inhalation", "Quiet exhalation"],
        rows: [
          { cells: ["Diaphragm", "Contracts, flattens and moves down", "Relaxes and domes upward"] },
          { cells: ["External intercostal muscles", "Contract: ribs move up and out", "Relax: ribs move down and in"] },
          { cells: ["Volume of the thorax", "Increases", "Decreases"] },
          { cells: ["Pressure in the lungs", "Falls below atmospheric pressure", "Rises above atmospheric pressure"] },
          { cells: ["Air flow", "Into the lungs", "Out of the lungs"] },
        ],
      },
      selfCheckExample: {
        prompt: "A stab wound lets air into the pleural space around the left lung. What happens to the left lung?",
        options: [
          "It inflates more, because extra air has entered the chest",
          "It keeps working normally, because the diaphragm still contracts",
          "Its alveoli fill with blood",
          "It collapses, because it is no longer held against the chest wall",
          "Its rate of gas exchange increases",
        ],
        steps: [
          "The thin fluid layer between the pleural membranes keeps the lung stuck to the chest wall. Once air enters, the elastic lung recoils and collapses.",
          "The air is outside the lung, not inside it (A). Contracting the diaphragm no longer pulls on that lung (B). Nothing here adds blood or speeds exchange (C, E).",
        ],
        answer: "(D) It collapses, because it is no longer held against the chest wall",
      },
      practiceSet: [
        { prompt: "During inhalation, is the pressure inside the lungs above or below atmospheric pressure?", answer: "Below" },
        { prompt: "What drives quiet exhalation?", answer: "Elastic recoil of the lungs and chest as the muscles relax" },
        { prompt: "Which change in the blood most strongly increases the breathing rate?", answer: "A rise in carbon dioxide (lower pH)" },
      ],
      traps: [
        {
          title: "The diaphragm moves down when you breathe in",
          body: "Contraction flattens the dome and pulls it down, which increases the volume of the thorax and lowers the pressure inside. Options pairing inhalation with a rising diaphragm, a falling thorax volume or a rising lung pressure are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-hap-minute-ventilation",
      name: "Minute ventilation and dead space",
      intuition:
        "The air you move each minute is the size of each breath times the number of breaths. But the last part of each breath stays in the trachea and bronchi, where no exchange happens, so only the rest reaches the alveoli.",
      definition:
        "- **Tidal volume**: the volume of one normal breath, about 500 mL at rest.\n" +
        "- **Minute ventilation**: the volume breathed in per minute.\n" +
        "- **Dead space**: the volume of the conducting airways, about 150 mL in an adult. This air does not take part in gas exchange.\n" +
        "- **Alveolar ventilation**: the fresh air reaching the alveoli each minute. Slow deep breathing gives more alveolar ventilation than fast shallow breathing with the same minute ventilation.\n" +
        "- **Vital capacity** is the largest volume that can be breathed out after the deepest breath in; some air (the residual volume) always stays in the lungs.",
      formula: {
        label: "Ventilation",
        latex: "V_E = V_T \\times f \\qquad V_A = (V_T - V_D) \\times f",
        symbols: [
          { symbol: "\\(V_E\\)", meaning: "minute ventilation, in mL/min" },
          { symbol: "\\(V_T\\)", meaning: "tidal volume, in mL" },
          { symbol: "\\(f\\)", meaning: "breathing rate, in breaths per minute" },
          { symbol: "\\(V_D\\)", meaning: "dead space volume, in mL" },
          { symbol: "\\(V_A\\)", meaning: "alveolar ventilation, in mL/min" },
        ],
      },
      authoredExample: {
        prompt:
          "At rest a person breathes 12 times a minute with a tidal volume of 500 mL. The dead space is 150 mL. Find the minute ventilation and the alveolar ventilation.",
        steps: [
          "\\(V_E = 500 \\times 12 = 6000\\ \\text{mL/min} = 6.0\\ \\text{L/min}\\).",
          "Air reaching the alveoli per breath: \\(500 - 150 = 350\\ \\text{mL}\\).",
          "\\(V_A = 350 \\times 12 = 4200\\ \\text{mL/min} = 4.2\\ \\text{L/min}\\).",
        ],
        answer: "6.0 L/min; 4.2 L/min",
      },
      selfCheckExample: {
        prompt: "An anxious patient takes 20 breaths a minute of 400 mL each. The dead space is 150 mL. What is the alveolar ventilation?",
        options: ["8.0 L/min", "5.0 L/min", "3.0 L/min", "11.0 L/min", "0.25 L/min"],
        steps: [
          "Fresh air reaching the alveoli per breath: \\(400 - 150 = 250\\ \\text{mL}\\).",
          "\\(V_A = 250 \\times 20 = 5000\\ \\text{mL/min} = 5.0\\ \\text{L/min}\\).",
          "Option A is the minute ventilation, ignoring dead space. C is the dead space ventilation. D adds the dead space instead of subtracting it. E is the volume of one breath, not a rate.",
        ],
        answer: "(B) 5.0 L/min",
      },
      practiceSet: [
        { prompt: "Tidal volume 600 mL, rate 15 per minute. What is the minute ventilation?", answer: "9.0 L/min", method: "\\(600 \\times 15 = 9000\\ \\text{mL/min}\\)" },
        { prompt: "Minute ventilation 7.2 L/min at 12 breaths per minute. What is the tidal volume?", answer: "600 mL", method: "\\(7200 / 12\\)" },
        { prompt: "With a dead space of 150 mL, which gives more alveolar ventilation: 20 breaths of 300 mL, or 10 breaths of 600 mL?", answer: "10 breaths of 600 mL (4.5 L/min against 3.0 L/min)", method: "\\((600-150) \\times 10\\) against \\((300-150) \\times 20\\)" },
      ],
      traps: [
        {
          title: "Fast shallow breathing wastes air",
          body: "The dead space is filled on every breath whatever its size. Halving the breath and doubling the rate keeps the minute ventilation the same but sends much less fresh air to the alveoli.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hap-gas-transport",
      name: "Carrying oxygen and carbon dioxide: haemoglobin and the Bohr effect",
      intuition:
        "Haemoglobin must grab oxygen in the lungs and let it go in the tissues. Its grip depends on conditions: where carbon dioxide, acid and heat are high (an active muscle), it loosens its grip and releases more oxygen, exactly where it is needed.",
      definition:
        `**Haemoglobin** has four polypeptide chains, each with a haem group containing iron (Fe²⁺), so one molecule carries up to four ${O2}.\n` +
        "- Binding is **cooperative**: once one oxygen binds, the next binds more easily. This gives an S-shaped (sigmoid) **oxygen dissociation curve** of % saturation against partial pressure of oxygen.\n" +
        `- **Bohr effect**: more ${CO2}, more ${H} (lower pH) and higher temperature lower haemoglobin's affinity for ${O2}. The curve shifts to the right and more ${O2} is released in active tissues; fewer haemoglobin molecules stay oxygenated.\n` +
        `- ${CO2} transport: about 70% as hydrogencarbonate ions ${HCO3} in the plasma (made inside red cells by **carbonic anhydrase**), about 20% bound to haemoglobin as carbaminohaemoglobin, and about 10% dissolved.\n` +
        "- Muscles respiring aerobically release carbon dioxide; lactate builds up only when they respire anaerobically.",
      table: {
        columns: ["Situation", "Effect on affinity for oxygen", "Result"],
        rows: [
          { cells: ["Lungs: high partial pressure of oxygen", "Haemoglobin loads oxygen", "Blood leaves about 97% saturated"] },
          { cells: ["Active muscle: high carbon dioxide, low pH, warm", "Affinity falls; curve shifts right (Bohr effect)", "More oxygen unloaded to the muscle"] },
          { cells: ["Fetal haemoglobin", "Higher affinity; curve lies to the left", "Takes oxygen from the mother's blood in the placenta"] },
          { cells: ["Myoglobin in muscle", "Much higher affinity; far to the left", "Stores oxygen and releases it only when oxygen is very low"] },
          { cells: ["Carbon monoxide", "Binds haem about 200 times more strongly than oxygen", "Less oxygen carried; can be fatal"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "An oxygen dissociation curve for haemoglobin is measured at a higher temperature and a lower pH than normal. Compared with the normal curve, it is:",
        options: [
          "shifted to the left, with haemoglobin more saturated at each partial pressure",
          "unchanged, because only the partial pressure of oxygen affects saturation",
          "a straight line instead of an S shape",
          "shifted to the right, with haemoglobin more saturated at each partial pressure",
          "shifted to the right, with haemoglobin less saturated at each partial pressure",
        ],
        steps: [
          "Heat and acid lower the affinity for oxygen (the Bohr effect). Lower affinity means less saturation at the same partial pressure: the curve moves right.",
          "A is the effect of the opposite conditions. D pairs the right direction with the wrong saturation. Cooperative binding still gives an S shape (C).",
        ],
        answer: "(E) shifted to the right, with haemoglobin less saturated at each partial pressure",
      },
      practiceSet: [
        { prompt: "How many oxygen molecules can one haemoglobin molecule carry?", answer: "Four" },
        { prompt: "Which enzyme in red cells speeds up the reaction of carbon dioxide with water?", answer: "Carbonic anhydrase" },
        { prompt: "In which form is most carbon dioxide carried in the blood?", answer: "As hydrogencarbonate ions in the plasma" },
        { prompt: "At a low partial pressure of oxygen, which is more saturated: myoglobin or haemoglobin?", answer: "Myoglobin" },
      ],
      traps: [
        {
          title: "High carbon dioxide lowers affinity, it does not raise it",
          body: "In the Bohr effect carbon dioxide and acid make haemoglobin release oxygen. More oxygen (a higher partial pressure) makes haemoglobin load, not release. Most carbon dioxide travels as hydrogencarbonate, not as carbaminohaemoglobin.",
        },
      ],
    },
  ],
};
