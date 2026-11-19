/**
 * Reshape plan: Homi Bhabha Std IX "Sound" (28 q, every one of the eight papers), for
 * scripts/homi-bhabha/reshape.ts. The model chapter of the Homi Bhabha notes (2026-11-19).
 *
 * Read all 28 stems and solutions. The ingest filed them under six subtopics; cut here by what a
 * question asks: what sound is and how the voice and instruments make it, the wave relations
 * (v = fλ, T = 1/f) with pitch and loudness read off a wave, the speed of sound by medium and in
 * gases, and echoes with the hearing ranges. Never featured (each carries a notice): cf808878
 * (two figures fit), 83159597 (the stem's S is the options' R), cc684dc0 (the order depends on
 * which speed table is used).
 */
import type { ReshapePlan } from "../../reshape";

const T = {
  nature: "Nature of Sound and the Voice",
  waves: "Frequency, Pitch and Loudness",
  speed: "Speed of Sound",
  echo: "Echo, Ultrasound and Infrasound",
} as const;

const plan: ReshapePlan = {
  subject: "Physics",
  chapter: "Sound",
  order: [T.nature, T.waves, T.speed, T.echo],
  byPrefix: {
    [T.nature]: ["b19827bd", "347e5534", "065b8e2b", "68ee2af1", "8f81fb76"],
    [T.waves]: ["0a43a3c5", "3b80e765", "afc68566", "c3d4a385", "a5b84c8c", "3cfb892f"],
    [T.speed]: ["58741fe0", "df98c24f", "21b60e4a", "cc684dc0", "83159597", "ac15d705", "80e7f9de", "cb613fda", "3903c3ef"],
    [T.echo]: ["651830c2", "539a687c", "b3dd4766", "cf808878", "d484c3e1", "2751b522", "7687c4c8", "1a23067f"],
  },
  expected: { [T.nature]: 5, [T.waves]: 6, [T.speed]: 9, [T.echo]: 8 },
  total: 28,
};

export default plan;
