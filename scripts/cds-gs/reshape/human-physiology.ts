/**
 * Reshape plan: CDS GK Biology "Human Physiology" (47 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 47 stems AND solutions (2026-10-23). Six teaching pages, by organ system, tissues
 * first because every organ is built from them. Then digestion with the deficiency diseases
 * (one page: what we eat and what goes wrong when part of it is missing); blood, with the one
 * breathing row (altitude sickness is a question about haemoglobin and oxygen) and the one
 * vaccination row; the heart and circulation; excretion, which also holds the two male
 * reproductive organ rows filed in the same catalogue subtopic (refile candidates for the
 * Reproduction chapter); and nerves, senses and hormones.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  tissues: "Tissues and Muscles",
  digestion: "Digestion and Nutrition",
  blood: "Blood and Breathing",
  heart: "Heart and Circulation",
  excretion: "Excretion and Reproductive Organs",
  control: "Nerves, Senses and Hormones",
} as const;

const plan: ReshapePlan = {
  subject: "Biology",
  chapter: "Human Physiology",
  order: [T.tissues, T.digestion, T.blood, T.heart, T.excretion, T.control],
  whole: {
    "Connective and Epithelial Tissues": T.tissues,
    "Muscle Tissue": T.tissues,
    "Digestive System and Enzymes": T.digestion,
    "Nutrition, Vitamins and Minerals": T.digestion,
    "Respiratory System": T.blood,
    "Immune System — Antibody Production": T.blood,
    "Circulatory and Lymphatic System": T.heart,
    "Excretory and Reproductive Anatomy": T.excretion,
    "Nervous System and Sense Organs": T.control,
    "Endocrine System and Hormones": T.control,
  },
  byPrefix: {
    [T.blood]: ["4bc033e2", "eee07303", "f0b7dda1", "a5891143", "45b9059e"],
  },
  expected: {
    [T.tissues]: 6,
    [T.digestion]: 14,
    [T.blood]: 7,
    [T.heart]: 7,
    [T.excretion]: 6,
    [T.control]: 7,
  },
  total: 47,
};

export default plan;
