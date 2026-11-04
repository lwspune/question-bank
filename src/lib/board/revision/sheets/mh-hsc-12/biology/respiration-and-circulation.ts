import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 8 Respiration and Circulation. Definitions checked
 * against the Balbharati text (wordings are the book's own, trimmed); most-asked
 * years from 21 of the 22 board past-paper questions in the bank, 2024-2026
 * (one 2024 question names "the above diagrams" with no figure, so it could not
 * be placed).
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Respiration and Circulation",
  chapterSlug: "respiration-and-circulation",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 8",
  keyPoints: [
    {
      term: "Features of a respiratory surface",
      text: "For efficient gaseous exchange it should have a **large surface area**, be **thin, highly vascular and permeable** to allow exchange of gases, and be **moist**.",
    },
    {
      term: "Respiratory organs in animals",
      text: "Protists, sponges, coelenterates: plasma membrane. Earthworm, frog: moist skin. Insects: tracheal tubes and spiracles. Spiders, scorpions: book lungs. Limulus: book gills. Tadpoles: external gills. Fish: internal gills. Reptiles, birds, mammals: lungs. Turtles underwater: cloaca.",
    },
    {
      term: "Nasal cavity",
      text: "Divided into right and left nasal chambers by a **mesethmoid cartilage**. Each has a vestibule (hair filter dust), a respiratory part or conditioner (warms and moistens air) and an olfactory part (smell).",
    },
    {
      term: "Respiratory disorders",
      text: "**Emphysema**: breakdown of alveoli, shortness of breath. **Asthma**: constriction of bronchioles, mucus build up, periodic wheezing. **Sinusitis**: inflammation of sinuses, mucous discharge. **Laryngitis**: inflammation of larynx, sore throat. **Silicosis, asbestosis**: occupational dust.",
    },
    {
      term: "Hematocrit and RBC counts",
      text: "**Hematocrit**: ratio of the volume of RBCs to total blood volume. RBCs live 120 days. More RBCs: **polycythemia**; fewer RBCs: **erythrocytopenia**; fewer RBCs or less haemoglobin: **anaemia**.",
    },
    {
      term: "WBC counts",
      text: "Normal 5000 to 11000 per mm³. Decrease below 4000: **leucopenia** (HIV, AIDS, TB). Temporary increase: **leucocytosis** (infection, pregnancy). Uncontrolled increase: **leukemia** (a blood cancer).",
    },
    {
      term: "Types of WBCs",
      text: "Granulocytes (72%): neutrophils (about 70%, phagocytic), eosinophils (antihistaminic), basophils (heparin, histamine, serotonin). Agranulocytes: **lymphocytes** (smallest), **monocytes** (largest, form macrophages).",
    },
    {
      term: "Platelets (thrombocytes)",
      text: "Cellular fragments formed from the large cells called **megakaryocytes** in bone marrow; no nucleus; 2.5 to 4.5 lakh per mm³. Fewer than normal: **thrombocytopenia** (internal bleeding). They help in blood clotting.",
    },
    {
      term: "Remnants of embryonic openings",
      text: "**Ligamentum arteriosum** joins the pulmonary trunk and aortic arch: the remnant of the ductus arteriosus. **Fossa ovalis** on the interauricular septum: the remnant of the foramen ovalis.",
    },
    {
      term: "Conducting system of the heart",
      text: "The heart is **myogenic**. SA node (right atrium) is the **pacemaker**; AV node is the pace setter; bundle of His divides into right and left bundles; Purkinje fibres spread the impulse so both ventricles contract together.",
    },
    {
      term: "Cardiac cycle",
      text: "Consecutive systole and diastole: one heartbeat, completed in **0.8 s** at 72 beats a minute. Atrial systole 0.1 s, ventricular systole 0.3 s, joint diastole 0.4 s. Lubb: AV valves close; dub: semilunar valves close.",
    },
    {
      term: "Stroke volume and cardiac output",
      text: "**Stroke volume**: blood pumped in one ventricular systole, about **70 ml**. **Cardiac output**: volume pumped per minute, about 5 litres.",
    },
    {
      term: "Electrocardiogram (ECG)",
      text: "Graphical recording of electrical variations at the body surface as impulses pass through the heart. **P-wave**: atrial depolarization. **QRS complex**: ventricular depolarization. **T-wave**: ventricular repolarization.",
    },
    {
      term: "Angina pectoris",
      text: "Pain in the chest from a reduction in blood supply to the cardiac muscles because of atherosclerosis or arteriosclerosis. Severe pain and heaviness in the chest, spreading to neck, lower jaw, left arm and shoulder; usually on exertion.",
    },
  ],
  formulas: [
    { label: "Cardiac output", latex: "\\text{CO} = \\text{SV} \\times \\text{HR} = 70 \\times 72 = 5040 \\text{ ml/min}" },
    { label: "Blood pressure", latex: "\\text{BP} = \\frac{\\text{SP}}{\\text{DP}} = \\frac{120}{80}\\ \\text{mmHg}" },
    { label: "Pulse pressure", latex: "\\text{SP} - \\text{DP} = 120 - 80 = 40\\ \\text{mmHg}" },
  ],
  derivations: [
    {
      title: "Differentiate between inspiration and expiration",
      steps: [
        "Inspiration is active: the diaphragm contracts and becomes flat (moves down); external intercostal muscles contract, ribs and sternum move up and out.",
        "Thoracic volume rises, pressure in the lungs falls below the atmosphere, so air rushes in.",
        "Expiration: the diaphragm relaxes and becomes dome shaped (moves up); intercostal muscles relax, rib cage moves in and down.",
        "Thoracic volume falls, pressure in the lungs rises, so air rushes out.",
      ],
    },
    {
      title: "Events of the cardiac cycle",
      steps: [
        "**Atrial systole** (0.1 s): the SA node fires, atria contract and pump blood into the ventricles; Eustachian and Thebesian valves stop backflow into veins.",
        "**Ventricular systole** (0.3 s): AV node, bundle of His and Purkinje fibres excite the ventricles; cuspid valves close (lubb); blood goes to the pulmonary trunk and aorta.",
        "**Ventricular diastole**: semilunar valves close (dub), preventing backflow into the ventricles.",
        "**Joint diastole** (0.4 s): all chambers relax and fill. Whole cycle 0.8 s.",
      ],
    },
    {
      title: "Valves of the human heart: location and function",
      steps: [
        "Tricuspid valve: right atrioventricular aperture. Bicuspid (mitral) valve: left atrioventricular aperture. Both stop backflow into the atria.",
        "Semilunar valves (three each): at the openings of the pulmonary trunk and aorta; stop backflow into the ventricles.",
        "Eustachian valve: opening of the inferior vena cava (postcaval). Thebesian valve: opening of the coronary sinus. Both in the right atrium.",
        "Chordae tendinae and papillary muscles hold the cuspid valves; valves keep blood flowing one way.",
      ],
    },
    {
      title: "Why breathing through the nose is better than through the mouth",
      steps: [
        "Hair in the vestibule filters the air and traps dust and suspended particles.",
        "The vascular respiratory part warms and moistens the inhaled air.",
        "The olfactory part detects smell; the mouth does none of this.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Normal ECG (Fig. 8.26)",
      labels: ["P wave", "QRS complex", "T wave", "P-R interval", "S-T segment", "R-R interval"],
    },
    {
      title: "Internal structure of human heart (Fig. 8.20)",
      labels: ["four chambers", "tricuspid and bicuspid valves", "pulmonary semilunar valve", "chordae tendinae, papillary muscles", "venae cavae, pulmonary veins", "interventricular septum"],
    },
    {
      title: "Breathing: inspiration and expiration (Fig. 8.5)",
      labels: ["rib cage up and forward / down and inward", "diaphragm contracts and moves down", "diaphragm relaxes and moves up", "air in and out"],
    },
    {
      title: "Human respiratory system (Fig. 8.3)",
      labels: ["nasal cavity, pharynx, larynx", "trachea", "right and left bronchi", "lungs and alveoli", "ribs", "diaphragm"],
    },
    {
      title: "Conducting system of human heart (Fig. 8.21)",
      labels: ["SA node", "AV node", "bundle of His", "right and left bundle branches", "Purkinje fibres"],
    },
  ],
  mostAsked: [
    { topic: "Blood: largest WBC, leucopenia and leucocytosis, platelets from megakaryocytes, hematocrit", years: [2026, 2025, 2024] },
    { topic: "Respiratory surfaces: their features, and the organ of each animal (match or identify)", years: [2026, 2024] },
    { topic: "Differentiate inspiration and expiration (diaphragm, intercostal muscles)", years: [2026, 2025, 2024] },
    { topic: "Cardiac cycle: events and durations, stroke volume, ECG with P wave and QRS complex", years: [2026, 2024] },
    { topic: "Heart valves: name, location and function; ligamentum arteriosum", years: [2026, 2025, 2024] },
    { topic: "Respiratory disorders from their symptoms (asthma, sinusitis, emphysema, laryngitis)", years: [2025, 2024] },
    { topic: "Nose: what divides the nasal cavity, why breathe through the nose", years: [2025, 2024] },
    { topic: "Write a note on angina pectoris", years: [2026] },
  ],
  mistakes: [
    {
      title: "Giving Limulus book lungs",
      body: "Limulus has **book gills**; spiders and scorpions have book lungs. A turtle under water breathes through its cloaca.",
    },
    {
      title: "Diaphragm the wrong way",
      body: "In inspiration the diaphragm contracts and flattens (moves down). In expiration it relaxes and becomes dome shaped (moves up).",
    },
    {
      title: "Stroke volume for cardiac output",
      body: "Blood pumped in one cardiac cycle is the stroke volume, about 70 ml. Cardiac output is per minute: 70 × 72 = 5040 ml.",
    },
    {
      title: "Largest and smallest WBC",
      body: "Monocytes are the largest WBCs, lymphocytes the smallest. Platelets are fragments of megakaryocytes, not cells.",
    },
    {
      title: "Leucopenia, leucocytosis, leukemia",
      body: "Leucopenia is a fall below normal; leucocytosis is a temporary rise; leukemia is an uncontrolled rise (a cancer).",
    },
    {
      title: "Wrong ECG waves",
      body: "P is atrial depolarization, QRS is ventricular depolarization, T is ventricular repolarization. Do not call T atrial.",
    },
  ],
};

export default sheet;
