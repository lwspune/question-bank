import type { SubtopicNote } from "@/app/notes/_types";

export const BEATS_NOTE: SubtopicNote = {
  subtopicName: "Beats and Sonometer",
  title: "Beats, and Tuning a Sonometer",
  oneLineDefinition:
    "Two sounds of slightly different frequency drift in and out of step, so their loudness swells and fades |f₁ − f₂| times a second; with a sonometer, whose frequency goes as 1/length, beats pin down a tuning fork's frequency.",
  whyItMatters:
    "22 PYQs, nine HARD — the densest-HARD page in the chapter, all of them sonometer or pipe puzzles. Two shapes: beat frequency and its timing (maxima, minima, loudness ratio), " +
    "and a fork compared with a sonometer at two lengths — solving two equations with f × l constant.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-beat-frequency",
      name: "Beat Frequency, Timing and Loudness",
      intuition:
        "Two tones a few hertz apart come back into step that many times each second. Loud moments (waxing) are 1/Δf apart, and the quiet moment falls halfway between. The loudest sound has amplitude a₁ + a₂, the quietest a₁ − a₂.",
      definition:
        "- Beats per second \\(= |f_1 - f_2|\\); from \\(\\sin\\omega t\\) forms, \\(\\dfrac{\\Delta\\omega}{2\\pi}\\).\n" +
        "- Time between maxima \\(= \\dfrac{1}{\\Delta f}\\); maximum to next minimum \\(= \\dfrac{1}{2\\Delta f}\\).\n" +
        "- Waxing : waning intensity \\(= \\left(\\dfrac{a_1 + a_2}{a_1 - a_2}\\right)^2\\) (4 and 3 ⇒ 49 : 1).\n" +
        "- Which way? If raising the tension on string Y cuts the beats with X, Y was BELOW X.\n" +
        "- Two open pipes of lengths \\(l\\) and \\(l + l_1\\): beats \\(\\dfrac{v}{2}\\left(\\dfrac{1}{l} - \\dfrac{1}{l + l_1}\\right) \\approx \\dfrac{vl_1}{2l^2}\\).",
      formula: {
        label: "Beats",
        latex: "f_{\\text{beat}} = |f_1 - f_2|, \\qquad T_{\\text{beat}} = \\frac{1}{|f_1 - f_2|}",
      },
      authoredExample: {
        prompt: "Forks of 512 Hz and 516 Hz sound together. Beats per second, time between maxima, and from a maximum to the next minimum?",
        steps: ["4 beats/s.", "\\(\\dfrac{1}{4} = 0.25\\) s between maxima; \\(0.125\\) s to the next minimum."],
        answer: "4; 0.25 s; 0.125 s",
      },
      selfCheckExample: {
        prompt: "String X is at 300 Hz and gives 6 beats with Y. Tightening Y drops the beats to 4. Y's original frequency?",
        steps: ["Y is 294 or 306 Hz; tightening raises it, and only 294 → 296 gets closer to 300."],
        answer: "294 Hz",
      },
      practiceSet: [
        { prompt: "\\(y_1 = 0.25\\sin 316t\\), \\(y_2 = 0.25\\sin 310t\\). Beats per second?", answer: "\\(\\dfrac{3}{\\pi}\\)" },
        { prompt: "Forks A and B are 1.4% above and 2.6% below C, and give 10 beats. C?", answer: "250 Hz" },
      ],
      pyqExampleId: "53335e07-6251-4e53-9c4d-61972ebc60bd",
      traps: [
        {
          title: "Reading ω as the frequency",
          body:
            "In \\(\\sin 316t\\), 316 is ω, not f. The beat frequency is \\(\\frac{316 - 310}{2\\pi} = \\frac{3}{\\pi}\\), not 6.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-sonometer-beats",
      name: "A Tuning Fork Against a Sonometer",
      intuition:
        "A sonometer's frequency goes as 1/length, so f × l is fixed. If the same number of beats is heard at two lengths, the fork's frequency lies between the wire's two frequencies — above one by the beat count and below the other by the same count.",
      definition:
        "- Same wire, same tension: \\(f_1l_1 = f_2l_2\\); the shorter length gives the higher frequency.\n" +
        "- Two forks in unison with lengths \\(l_1, l_2\\) and giving \\(b\\) beats: \\(f_1l_1 = f_2l_2\\), \\(|f_1 - f_2| = b\\).\n" +
        "- Same beats at \\(l\\) and \\(l - \\Delta l\\): \\((f - b)l = (f + b)(l - \\Delta l)\\).\n" +
        "- Hanging weight of specific gravity \\(d\\) immersed: \\(\\dfrac{n}{n - x} = \\sqrt{\\dfrac{d}{d - 1}}\\).\n" +
        "- Two wires at equal frequency: \\(\\dfrac{1}{d}\\sqrt{\\dfrac{T}{\\rho}}\\) must match, so \\(T \\times 2\\), \\(d \\times 2\\) needs \\(\\rho \\div 2\\).",
      formula: {
        label: "Sonometer",
        latex: "f \\propto \\frac{1}{l}\\;\\Rightarrow\\; f_1l_1 = f_2l_2",
      },
      authoredExample: {
        prompt: "A fork gives 5 beats with 60 cm of a sonometer wire, and still 5 beats when the wire is shortened to 59 cm. The fork's frequency?",
        steps: ["At 60 cm the wire is 5 Hz below the fork; at 59 cm, 5 Hz above.", "\\((n - 5) \\times 60 = (n + 5) \\times 59 \\Rightarrow n = 595\\) Hz."],
        answer: "595 Hz",
      },
      selfCheckExample: {
        prompt: "Two forks are in unison with 1.00 m and 0.98 m of the same wire and give 3 beats. Their frequencies?",
        steps: ["\\(f_1 = 0.98f_2\\) and \\(f_2 - f_1 = 3\\) ⇒ \\(0.02f_2 = 3\\)."],
        answer: "147 Hz and 150 Hz",
      },
      practiceSet: [
        { prompt: "Forks in unison with 23 cm and 24 cm; 4 beats. Frequencies?", answer: "96 Hz and 92 Hz" },
        { prompt: "49 cm in unison with a fork; at 48 cm, 6 beats. Fork frequency?", answer: "288 Hz" },
      ],
      pyqExampleId: "de4a1df5-0b08-4a53-bbf8-c072aea34c61",
      traps: [
        {
          title: "Pairing the higher frequency with the longer length",
          body:
            "A SHORTER wire vibrates faster. Solve \\(f_1l_1 = f_2l_2\\) with the larger f on the smaller l, or the two frequencies come out swapped.",
        },
      ],
    },
  ],
  related: [
    { label: "Stationary Waves and Strings", href: "/notes/mht-cet-physics/superposition-of-waves/cetp-stationary-waves" },
    { label: "Superposition of Two Waves", href: "/notes/mht-cet-physics/superposition-of-waves/cetp-superposition" },
  ],
};
