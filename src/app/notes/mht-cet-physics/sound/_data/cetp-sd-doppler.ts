import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/sound";

export const DOPPLER_NOTE: SubtopicNote = {
  subtopicName: "Doppler Effect — Moving Source and Observer",
  title: "The Doppler Effect",
  oneLineDefinition:
    "A listener hears f(v ± v_o)/(v ∓ v_s): approach raises the pitch and recession lowers it, the observer's speed adds to or subtracts from the numerator and the source's from the denominator, so the same speed shifts the pitch more when the source moves.",
  whyItMatters:
    "19 PYQs, 3 of them HARD. Fourteen apply the formula once — observer or source moving, the ratio of approaching and receding pitches, the speed that halves or triples the pitch. " +
    "Five combine two steps: a whistle heard before and after it passes, a siren echoed from a wall back to the driver, a car accelerating away from a siren. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-sd-doppler-formula",
      name: "The Doppler Formula",
      intuition:
        "Write f′ = f(v + v_o)/(v − v_s) with both speeds positive when they bring source and observer closer; flip a sign for each one moving apart. An observer approaching at v/5 hears 6/5 of the pitch, 20% more. A source approaching at v/10 gives 10/9. The same speed does more when the source moves, because it squeezes the waves: at 50 m/s with v = 330, a moving source gives 330/280 = 1.18f, a moving observer 380/330 = 1.15f. A source receding at v halves the pitch; an observer must approach at 2v to triple it. Frequency rises, so the wavelength the observer measures falls.",
      definition:
        "- \\(f' = f\\,\\dfrac{v \\pm v_o}{v \\mp v_s}\\): upper signs when approaching.\n" +
        "- Observer toward at \\(\\tfrac{v}{5}\\) ⇒ +20%; source toward at \\(\\tfrac{v}{10}\\) ⇒ \\(\\tfrac{10}{9}f\\); both toward at \\(\\tfrac{v}{10}\\) ⇒ \\(\\tfrac{11}{9}f \\approx 1.22f\\).\n" +
        "- Observer toward and away at \\(V_1\\), ratio 2 ⇒ \\(V = 3V_1\\).\n" +
        "- Half the pitch: source receding at v. Triple the pitch: observer approaching at 2v.\n" +
        "- Same speed: moving source shifts more than moving observer.",
      formula: {
        label: "Doppler effect",
        latex: "f' = f\\,\\frac{v \\pm v_o}{v \\mp v_s}",
      },
      authoredExample: {
        prompt: "A source approaches a stationary listener at v/3 while the listener moves away at v/5. Apparent frequency?",
        steps: ["Numerator v − v/5 = 4v/5; denominator v − v/3 = 2v/3.", "f′ = f × (4/5)/(2/3) = 6f/5."],
        answer: "6f/5",
      },
      selfCheckExample: {
        prompt: "A source approaches a stationary observer at one fifth of the speed of sound. Apparent frequency?",
        steps: ["v/(v − v/5)."],
        answer: "5f/4",
      },
      practiceSet: [
        { prompt: "Source and observer move toward each other. What they hear?", answer: "Higher frequency, shorter wavelength" },
        { prompt: "Observer to the source at 50 m/s, or source to the observer at 50 m/s (v = 330)? Which is higher?", answer: "Source moving" },
      ],
      pyqExampleId: "20660e8a-a8c5-40eb-ace8-65b651a31686",
      traps: [
        {
          title: "Treating moving source and moving observer alike",
          body:
            "The observer's speed sits in the numerator, the source's in the denominator. At 50 m/s the moving source gives 330/280; the moving observer only 380/330.",
        },
        {
          title: "Getting the sign for recession",
          body:
            "Moving apart LOWERS the pitch: observer v − v_o on top, source v + v_s underneath.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-sd-doppler-two-step",
      name: "Passing Sources, Echoes and Changing Speeds",
      intuition:
        "A source that passes a listener gives v/(v − v_s) before and v/(v + v_s) after: the ratio (v + v_s)/(v − v_s) fixes its speed. A driver approaching a wall is a moving source for the wall, which then re-emits as a stationary source to the driver now moving as an observer: n(v + V₁)/(v − V₁). A vehicle accelerating away from a siren hears f(v − v_o)/v; once that ratio fixes v_o, the distance is v_o²/2a.",
      definition:
        "- Passing source: before/after = \\(\\dfrac{v + v_s}{v - v_s}\\) (11 : 9 ⇒ \\(v_s = v/10\\)); a train at 20 m/s, 510 Hz, v = 320 ⇒ 544 and 480 Hz.\n" +
        "- Pitch drops 30% as it recedes: \\(\\dfrac{v}{v + v_s} = 0.7\\).\n" +
        "- Echo from a wall to a driver at \\(V_1\\): \\(n\\,\\dfrac{v + V_1}{v - V_1}\\).\n" +
        "- Accelerating away: \\(\\dfrac{f'}{f} = \\dfrac{v - v_o}{v}\\), then \\(s = \\dfrac{v_o^2}{2a}\\) (94% at 330 m/s, 2 m/s² ⇒ 98 m).",
      formula: {
        label: "Echo from a wall",
        latex: "n' = n\\,\\frac{v + V_1}{v - V_1}",
      },
      authoredExample: {
        prompt: "A car at 20 m/s sounds a 500 Hz horn while approaching a wall (v = 340 m/s). Frequency of the echo heard by the driver?",
        steps: ["n′ = 500 × (340 + 20)/(340 − 20).", "n′ = 500 × 360/320 = 562.5 Hz."],
        answer: "562.5 Hz",
      },
      selfCheckExample: {
        prompt: "Same car at v/10 toward the wall. Echo frequency in terms of n?",
        steps: ["(1.1)/(0.9)."],
        answer: "11n/9",
      },
      practiceSet: [
        { prompt: "A whistle's pitch drops to 70% as the engine recedes (v = 350 m/s). Engine speed?", answer: "150 m/s" },
      ],
      pyqExampleId: "3902be19-ece2-4e45-b0b3-007e8f711cc6",
      traps: [
        {
          title: "Using the source formula twice for an echo",
          body:
            "The wall receives as a stationary observer and re-sends as a stationary source; the driver is a source on the way out and an OBSERVER on the way back. The two steps use different places in the formula.",
        },
        {
          title: "Using one Doppler factor for before and after a pass",
          body:
            "Approaching, the source term is v − v_s; receding, v + v_s. The before-to-after ratio is (v + v_s)/(v − v_s), not the square of either factor.",
        },
      ],
    },
  ],
  related: [
    { label: "Organ Pipes and Resonance", href: `${BASE}/cetp-sd-pipes` },
    { label: "Atoms — the Doppler shift of spectral lines", href: "/notes/mht-cet-physics/structure-of-atoms-and-nuclei/cetp-an-spectrum" },
  ],
};
