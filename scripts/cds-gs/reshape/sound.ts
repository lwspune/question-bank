/**
 * Reshape plan: CDS GK Physics "Sound" (18 q), for scripts/cds-gs/reshape.ts.
 *
 * Read all 18 stems AND solutions (2026-10-23). Two teaching pages, waves first. The first
 * teaches what a wave is (longitudinal and transverse, which includes the two general wave rows
 * moved in from the retired "Oscillations and Waves" chapter), v = f × wavelength, and the speed of
 * sound in different media. The second is what we hear and use: pitch and loudness, the octave,
 * echoes, and ultrasound and transducers. "Sound needs a medium" (17703d73) moves to the waves
 * page; the octave row (890cd502) is about pitch, so it moves to the second page.
 */
import type { ReshapePlan } from "../reshape";

const T = {
  waves: "Waves and the Speed of Sound",
  hearing: "Pitch, Echo and Uses of Sound",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Sound",
  order: [T.waves, T.hearing],
  whole: {
    "Wave Equation, Speed, and Frequency Bands": T.waves,
    "Foundations — Sound, Perception, and the Ear": T.hearing,
    "Sound Behaviours — Reflection, Echo, Reverberation, Beats": T.hearing,
    "Applications — SONAR, Transducers, Instruments": T.hearing,
  },
  byPrefix: {
    [T.waves]: ["17703d73"],
    [T.hearing]: ["890cd502"],
  },
  expected: { [T.waves]: 10, [T.hearing]: 8 },
  total: 18,
};

export default plan;
