/**
 * NDA Biology · Human Physiology · trap MCQs ("spot the common mistake").
 * Harvest leaves these as topic seeds with empty `correct`; each is authored as a
 * full MCQ where the documented misconception (trap_hints) is the tempting wrong
 * option. theme=trap (assembled into Common-Traps quizzes, separate from recall).
 *   npm run quiz:verify nda-biology__human-physiology-traps
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const t = (atomKey: string, stem: string, correct: string, distractors: string[]): VerifiedEntry => ({
  atomKey, stem, correct, distractors, theme: "trap",
});

export const VERIFIED: VerifiedEntry[] = [
  t("airway-gas-exchange:trap:0", "Which of these structures does NOT take part in breathing?",
    "Bowman's capsule", ["Bronchi", "Trachea", "Diaphragm"]),
  t("arteries-veins:trap:0", "Which statement is FALSE?",
    "The pulmonary artery always carries oxygenated blood",
    ["Arteries carry blood away from the heart", "The pulmonary vein carries oxygenated blood", "Most arteries carry oxygenated blood"]),
  t("balanced-diet-macronutrients:trap:0", "Which is the MOST complete list of a balanced diet's components?",
    "Carbohydrates, proteins, fats, vitamins, minerals, fibre and water",
    ["Carbohydrates, proteins, fats, vitamins and minerals only", "Carbohydrates, proteins and fats only", "Proteins, vitamins and water only"]),
  t("blood-lymph-clotting:trap:0", "Which soluble plasma protein is converted into insoluble fibrin during clotting?",
    "Fibrinogen", ["Fibrin", "A macrophage", "A pathogen"]),
  t("connective-tissue-family:trap:0", "Which statement is correct?",
    "A tendon joins muscle to bone", ["A tendon joins bone to bone", "A ligament joins muscle to bone", "A ligament joins muscle to muscle"]),
  t("connective-tissue-family:trap:1", "Cartilage is found in all of these EXCEPT:",
    "Urinary bladder", ["Nose", "Ear pinna", "Larynx"]),
  t("digestive-enzymes:trap:0", "Which statement is FALSE?",
    "Pepsin works best in an alkaline medium",
    ["Pepsin works best in an acidic medium", "Trypsin works best in an alkaline medium", "Both pepsin and trypsin digest protein"]),
  t("digestive-enzymes:trap:1", "Which pair correctly describes fat digestion?",
    "Bile emulsifies; lipase digests", ["Bile digests; lipase emulsifies", "Amylase emulsifies; bile digests", "Pepsin emulsifies; bile digests"]),
  t("digestive-glands-secretions:trap:0", "Which is NOT a function of the pancreas?",
    "Storing bile", ["Secreting lipase", "Secreting amylase", "Secreting alkaline juice"]),
  t("epithelium-and-skin:trap:0", "Which statement about melanin is TRUE?",
    "It absorbs ultraviolet radiation", ["It absorbs infrared radiation", "It absorbs X-rays", "It blocks all visible light"]),
  t("four-tissue-types:trap:0", "Why is blood classified as a connective tissue?",
    "Its cells are suspended in a non-living matrix (plasma)",
    ["Because it carries electrical signals", "Because it can contract", "Because it lines body cavities"]),
  t("heart-chambers-valves:trap:0", "Which statement is correct?",
    "The tricuspid valve is on the right side of the heart",
    ["The tricuspid valve is on the left side", "The bicuspid valve is on the right side", "Semilunar valves separate the auricles from the ventricles"]),
  t("hormones-gland-function:trap:0", "Which hormone–gland pair is correct?",
    "Insulin – pancreas", ["Insulin – thyroid", "Thyroxine – adrenal gland", "Adrenaline – thyroid"]),
  t("immune-cells-antibodies:trap:0", "During an infection, antibodies are produced mainly by which cell?",
    "Lymphocytes (B-cells)", ["Neutrophils", "Red blood cells", "Platelets"]),
  t("lung-volumes:trap:0", "A student thinks residual volume is the smallest because it can't be exhaled. Which volume is actually the SMALLEST?",
    "Tidal volume", ["Residual volume", "Expiratory reserve volume", "Inspiratory reserve volume"]),
  t("nephron-filtration:trap:0", "Which structure FILTERS the blood, rather than carrying urine away?",
    "Bowman's capsule", ["Ureter", "Collecting duct", "Urethra"]),
  t("nerve-impulse:trap:0", "Which is the COMPLETE answer for the ions involved in a nerve impulse?",
    "Sodium and potassium", ["Sodium only", "Potassium only", "Calcium and sodium"]),
  t("reflex-arc-brain:trap:0", "Which pathway correctly describes a spinal reflex?",
    "Receptor → sensory neuron → spinal cord → motor neuron → effector",
    ["Receptor → sensory neuron → brain → motor neuron → effector", "Receptor → motor neuron → spinal cord → sensory neuron → effector", "Effector → sensory neuron → brain → motor neuron → receptor"]),
  t("reproductive-hormones:trap:0", "The menstrual cycle is controlled by which TWO glands together?",
    "Ovary and pituitary", ["Ovary and adrenal gland", "Ovary and lacrimal gland", "Pituitary and prostate gland"]),
  t("the-eye:trap:0", "Which statement is correct?",
    "Light enters through the cornea and the image forms on the retina",
    ["Light enters through the retina and the image forms on the cornea", "The cornea is the light-sensitive part of the eye", "The retina is transparent and has no blood vessels"]),
  t("the-eye:trap:1", "Which statement about photoreceptors is correct?",
    "Cones give colour vision; rods work in dim light",
    ["Rods give colour vision; cones work in dim light", "Both rods and cones give colour vision", "Cones work only in the dark"]),
  t("vitamins-deficiency-sources:trap:0", "Which of these is a DEFICIENCY disease?",
    "Scurvy", ["Rabies", "Hepatitis", "Malaria"]),
  t("vitamins-deficiency-sources:trap:1", "Vitamin B1 is also known as?",
    "Thiamin", ["Riboflavin", "Retinol", "Tocopherol"]),
];
