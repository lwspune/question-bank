import type { ChapterNote } from "@/app/notes/_types";

export const OSCILLATIONS_CHAPTER: ChapterNote = {
  chapterName: "Oscillations and Waves",
  title: "Oscillations and Waves — NDA Physics",
  intro:
    "An oscillation is any to-and-fro motion that repeats in equal intervals of time, and a wave is a disturbance that carries energy through space without carrying matter with it. " +
    "The NDA tests this chapter in two tightly linked movements. " +
    "(1) Simple harmonic motion and general waves — what makes a motion simple-harmonic (a restoring force proportional to displacement and directed back to the mean position), the meaning of period, amplitude, frequency and phase, and the shared properties of waves of every kind (sound, water, light): all carry energy, exert pressure and reflect, but only electromagnetic waves can travel through a vacuum. " +
    "(2) The simple pendulum — the bank's workhorse, governed by the single formula T = 2π√(L/g): its period grows with the square root of length, is completely independent of the bob's mass, slows where gravity is weaker, and stays amplitude-independent only while the swing is small. " +
    "Almost every mark here is won by knowing one formula and one idea — period depends on length and gravity, never on mass — and by remembering that a wave needs a medium unless it is light. Drill the period law, watch what each problem changes, and walk out with the marks.",
  subtopicOrder: ["osc-shm-and-waves", "osc-simple-pendulum"],
};
