/**
 * ENEM lane configuration (scripts/enem/). The exam is on intl.pyqvault.com
 * (EXAM_REGISTRY slug `enem`, site "intl", passScope "free").
 */
import { SUBJECT_NAMES } from "./lib";

/** The `exams.name`; must match EXAM_REGISTRY's examName and the mock blueprint. */
export const EXAM_NAME = "ENEM";

/**
 * Free on intl (owner, 2026-11-15): migration 0210's 'free' pass scope, so no
 * pass wall and no limit hangs on it. sitePassScopes("intl") leaves 'free' out,
 * so a free exam never lifts IMAT's limits.
 */
export const PASS_SCOPE = "free" as const;

/** The four bank subjects, in the order the seed creates them. */
export const SUBJECTS: readonly string[] = [
  SUBJECT_NAMES.matematica,
  SUBJECT_NAMES.fisica,
  SUBJECT_NAMES.quimica,
  SUBJECT_NAMES.biologia,
];

/** LWS Pune, the org that owns the bank (same as every other pipeline here). */
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
/** The superadmin account the bank's ingests are recorded against. */
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

/** The years reviewed and committed (owner, 2026-11-15: five years to gauge interest). */
export const YEARS: readonly number[] = [2021, 2022, 2023, 2024, 2025];

/** Every Day 2 from 2021 to 2025 was sat in November (28, 20, 12, 10 and 16 Nov). */
export const PYQ_MONTH = "November";
