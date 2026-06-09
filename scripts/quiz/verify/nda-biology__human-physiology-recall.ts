/**
 * NDA Biology · Human Physiology · practiceSet + selfCheck recall MCQs.
 * The harvest's candidate distractors are cross-category sibling answers (often
 * absurd), so every distractor here is hand-authored: plausible same-category
 * wrong answers. theme=fact (HP is a recall chapter). Skipped: the pure yes/no
 * practiceSet items (airway:1, balanced-diet:2, blood-lymph:3, connective:3,
 * immune:1, the-eye:3) — they don't make fair 4-option MCQs; left parked.
 *   npm run quiz:verify nda-biology__human-physiology-recall
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const e = (atomKey: string, distractors: string[]): VerifiedEntry => ({ atomKey, distractors, theme: "fact" });

export const VERIFIED: VerifiedEntry[] = [
  // airway-gas-exchange
  e("airway-gas-exchange:practiceSet:0", ["Bronchi", "Trachea", "Bronchioles"]),
  e("airway-gas-exchange:practiceSet:2", ["Thick muscular wall", "Cartilage rings", "Ciliated columnar lining"]),
  e("airway-gas-exchange:selfCheck:0", ["Alveoli of humans", "Skin of an earthworm", "All three exchange gas"]),
  // arteries-veins
  e("arteries-veins:practiceSet:0", ["Arteries", "Capillaries", "Both equally"]),
  e("arteries-veins:practiceSet:1", ["Towards", "Both directions", "Neither"]),
  e("arteries-veins:practiceSet:2", ["Aorta", "Carotid artery", "Renal artery"]),
  e("arteries-veins:selfCheck:0", ["(a) is wrong", "(c) is wrong", "All three are correct"]),
  // balanced-diet-macronutrients
  e("balanced-diet-macronutrients:practiceSet:0", ["Five", "Six", "Three"]),
  e("balanced-diet-macronutrients:practiceSet:1", ["Pulses and grains", "Milk and dairy", "Nuts and oils"]),
  e("balanced-diet-macronutrients:selfCheck:0", ["True — all proteins act as enzymes", "False — not all enzymes are proteins", "True — but only in animals"]),
  // blood-lymph-clotting
  e("blood-lymph-clotting:practiceSet:0", ["Red blood cells", "Platelets", "White blood cells"]),
  e("blood-lymph-clotting:practiceSet:1", ["Thrombin", "Albumin", "Globulin"]),
  e("blood-lymph-clotting:practiceSet:2", ["Vitamin C", "Vitamin D", "Vitamin B12"]),
  e("blood-lymph-clotting:selfCheck:0", ["Resembles serum; it lacks platelets", "Resembles whole blood; it lacks WBCs", "Resembles plasma; it lacks proteins only"]),
  // connective-tissue-family
  e("connective-tissue-family:practiceSet:0", ["Bone to bone", "Muscle to muscle", "Skin to muscle"]),
  e("connective-tissue-family:practiceSet:1", ["Muscle to bone", "Muscle to muscle", "Bone to skin"]),
  e("connective-tissue-family:practiceSet:2", ["Heart, liver, kidney", "Skin, hair, nails", "Brain, spinal cord, nerves"]),
  e("connective-tissue-family:selfCheck:0", ["Bone-to-bone = tendon; muscle-to-bone = ligament", "Both are ligaments", "Both are tendons"]),
  // digestive-enzymes
  e("digestive-enzymes:practiceSet:0", ["Trypsin", "Amylase", "Lipase"]),
  e("digestive-enzymes:practiceSet:1", ["About 7 (neutral)", "About 8.5 (alkaline)", "About 5 (mildly acidic)"]),
  e("digestive-enzymes:practiceSet:2", ["Pepsin", "Lipase", "Trypsin"]),
  e("digestive-enzymes:practiceSet:3", ["HCl + pepsin", "Amylase + maltase", "Trypsin + bile"]),
  e("digestive-enzymes:selfCheck:0", ["Amylase digests fat; HCl acts first", "Pepsin digests fat; bile acts first", "Lipase digests fat; pepsin acts first"]),
  // digestive-glands-secretions
  e("digestive-glands-secretions:practiceSet:0", ["Bile + lipase", "Pancreatic juice + amylase", "Mucus + trypsin"]),
  e("digestive-glands-secretions:practiceSet:1", ["Gastric juice", "Bile salts alone", "Saliva"]),
  e("digestive-glands-secretions:practiceSet:2", ["Pepsin, renin, HCl", "Amylase, maltase, sucrase", "Trypsin, bile, mucus"]),
  e("digestive-glands-secretions:practiceSet:3", ["Pancreas", "Gallbladder", "Stomach"]),
  e("digestive-glands-secretions:selfCheck:0", ["Bile, from the liver", "Gastric juice, from the stomach", "Saliva, from the salivary glands"]),
  // epithelium-and-skin
  e("epithelium-and-skin:practiceSet:0", ["Columnar epithelium", "Cuboidal epithelium", "Ciliated epithelium"]),
  e("epithelium-and-skin:practiceSet:1", ["Infrared", "X-rays", "Visible light"]),
  e("epithelium-and-skin:practiceSet:2", ["Blood, bone, muscle", "Teeth, nails, sclera", "Liver, kidney, lung"]),
  e("epithelium-and-skin:selfCheck:0", ["Columnar lines it; melanin protects against UV", "Squamous lines it; haemoglobin protects", "Ciliated lines it; keratin protects"]),
  // four-tissue-types
  e("four-tissue-types:practiceSet:0", ["Epithelial tissue", "Muscle tissue", "Nervous tissue"]),
  e("four-tissue-types:practiceSet:1", ["Connective tissue", "Epithelial tissue", "Nervous tissue"]),
  e("four-tissue-types:practiceSet:2", ["Connective tissue", "Muscle tissue", "Nervous tissue"]),
  e("four-tissue-types:practiceSet:3", ["Muscle tissue", "Epithelial tissue", "Connective tissue"]),
  e("four-tissue-types:selfCheck:0", ["(a) epithelial, (b) connective, (c) muscle, (d) nervous", "(a) connective, (b) muscle, (c) epithelial, (d) nervous", "(a) muscle, (b) epithelial, (c) connective, (d) nervous"]),
  // heart-chambers-valves
  e("heart-chambers-valves:practiceSet:0", ["Right auricle (right atrium)", "Left ventricle", "Right ventricle"]),
  e("heart-chambers-valves:practiceSet:1", ["Bicuspid (mitral) valve", "Pulmonary semilunar valve", "Aortic semilunar valve"]),
  e("heart-chambers-valves:practiceSet:2", ["Tricuspid valve", "Bicuspid valve", "Mitral valve"]),
  e("heart-chambers-valves:practiceSet:3", ["Right", "Both sides", "Centre"]),
  e("heart-chambers-valves:selfCheck:0", ["Tricuspid valve", "Bicuspid valve", "Aortic semilunar valve"]),
  // hormones-gland-function
  e("hormones-gland-function:practiceSet:0", ["Insulin", "Adrenaline", "Estrogen"]),
  e("hormones-gland-function:practiceSet:1", ["Thyroid", "Adrenal gland", "Pituitary"]),
  e("hormones-gland-function:practiceSet:2", ["Testosterone", "Progesterone", "Thyroxine"]),
  e("hormones-gland-function:practiceSet:3", ["Insulin", "Adrenaline", "Estrogen"]),
  e("hormones-gland-function:selfCheck:0", ["Thyroxine, from the thyroid", "Insulin, from the pancreas", "Estrogen, from the ovary"]),
  // immune-cells-antibodies
  e("immune-cells-antibodies:practiceSet:0", ["Neutrophils", "Monocytes", "Eosinophils"]),
  e("immune-cells-antibodies:practiceSet:2", ["T-lymphocytes", "Natural killer cells", "Macrophages"]),
  e("immune-cells-antibodies:selfCheck:0", ["Neutrophils produce them; RBCs do not", "Platelets produce them; RBCs do not", "RBCs produce them; lymphocytes do not"]),
  // lung-volumes
  e("lung-volumes:practiceSet:0", ["Vital capacity", "Residual volume", "Inspiratory reserve volume"]),
  e("lung-volumes:practiceSet:1", ["Vital capacity", "Inspiratory reserve volume", "Expiratory reserve volume"]),
  e("lung-volumes:practiceSet:2", ["TV + IRV + ERV + RV (total lung capacity)", "Only the tidal volume", "IRV + ERV only"]),
  // minerals-and-metabolism
  e("minerals-and-metabolism:practiceSet:0", ["Iron", "Calcium", "Sodium"]),
  e("minerals-and-metabolism:practiceSet:1", ["Carbohydrates", "Dietary fats", "Vitamin C"]),
  e("minerals-and-metabolism:practiceSet:2", ["Goitre", "Rickets", "Scurvy"]),
  // nephron-filtration
  e("nephron-filtration:practiceSet:0", ["Loop of Henle", "Collecting duct", "Distal tubule"]),
  e("nephron-filtration:practiceSet:1", ["Pepsin", "Amylase", "Trypsin"]),
  e("nephron-filtration:practiceSet:2", ["Blood sugar", "Heart rate", "Urine output"]),
  e("nephron-filtration:selfCheck:0", ["Pepsin; it lowers blood pressure", "Renin; it lowers blood sugar", "Amylase; it raises urine output"]),
  // nerve-impulse
  e("nerve-impulse:practiceSet:0", ["Calcium and chloride", "Sodium and calcium", "Potassium and magnesium"]),
  e("nerve-impulse:practiceSet:1", ["Potassium (K⁺)", "Calcium (Ca²⁺)", "Chloride (Cl⁻)"]),
  e("nerve-impulse:practiceSet:2", ["Sodium (Na⁺)", "Calcium (Ca²⁺)", "Chloride (Cl⁻)"]),
  e("nerve-impulse:selfCheck:0", ["Lithium", "Rubidium", "Caesium"]),
  // reflex-arc-brain
  e("reflex-arc-brain:practiceSet:0", ["Receptor → motor neuron → spinal cord → sensory neuron → effector", "Effector → motor neuron → brain → sensory neuron → receptor", "Receptor → sensory neuron → brain → motor neuron → effector"]),
  e("reflex-arc-brain:practiceSet:1", ["Brain (cerebrum)", "Cerebellum", "Midbrain"]),
  e("reflex-arc-brain:practiceSet:2", ["Cerebrum", "Cerebellum", "Midbrain"]),
  e("reflex-arc-brain:selfCheck:0", ["Cerebrum", "Cerebellum", "Forebrain (hypothalamus)"]),
  // reproductive-hormones
  e("reproductive-hormones:practiceSet:0", ["Ovary and thyroid", "Pituitary and adrenal", "Ovary and uterus"]),
  e("reproductive-hormones:practiceSet:1", ["Estrogen and progesterone", "Oxytocin and prolactin", "FSH and TSH"]),
  e("reproductive-hormones:practiceSet:2", ["Estrogen", "Luteinising hormone (LH)", "FSH"]),
  // ruminant-stomach
  e("ruminant-stomach:practiceSet:0", ["One", "Two", "Three"]),
  e("ruminant-stomach:practiceSet:1", ["Rumen, omasum, reticulum, abomasum", "Abomasum, omasum, reticulum, rumen", "Reticulum, rumen, abomasum, omasum"]),
  e("ruminant-stomach:practiceSet:2", ["Rumen", "Reticulum", "Omasum"]),
  // spermatogenesis
  e("spermatogenesis:practiceSet:0", ["Secondary spermatocyte", "Spermatogonium", "Spermatid"]),
  e("spermatogenesis:practiceSet:1", ["By meiosis", "By binary fission", "By budding"]),
  e("spermatogenesis:practiceSet:2", ["Secrete testosterone", "Produce sperm directly", "Store mature sperm"]),
  // the-eye
  e("the-eye:practiceSet:0", ["Retina", "Sclera", "Optic nerve"]),
  e("the-eye:practiceSet:1", ["Cornea", "Lens", "Iris"]),
  e("the-eye:practiceSet:2", ["Rods", "Ganglion cells", "Bipolar cells"]),
  e("the-eye:selfCheck:0", ["Light enters through the retina; rods give colour vision", "Light enters through the pupil; cones give colour vision", "Light enters through the cornea; rods give colour vision"]),
  // vitamins-deficiency-sources
  e("vitamins-deficiency-sources:practiceSet:0", ["Rickets", "Beri-beri", "Night blindness"]),
  e("vitamins-deficiency-sources:practiceSet:1", ["Scurvy", "Anaemia", "Goitre"]),
  e("vitamins-deficiency-sources:practiceSet:2", ["Vitamin C", "Vitamin A", "Vitamin E"]),
  e("vitamins-deficiency-sources:practiceSet:3", ["Riboflavin", "Niacin", "Pyridoxine"]),
  e("vitamins-deficiency-sources:practiceSet:4", ["Vitamin C", "Vitamin D", "Vitamin B12"]),
  e("vitamins-deficiency-sources:selfCheck:0", ["Vitamin D deficiency; the disease is rickets", "Vitamin K deficiency; the disease is haemophilia", "Vitamin B1 deficiency; the disease is beri-beri"]),
];
