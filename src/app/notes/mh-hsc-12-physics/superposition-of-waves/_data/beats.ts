import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SW_BEATS_NOTE: SubtopicNote = {
  subtopicName: "Beats",
  title: "Beats",
  oneLineDefinition:
    "The regular rise and fall of loudness when two notes of slightly different frequencies sound together: why the beat frequency equals the difference of the two frequencies, beats from two wavelengths in air, and beats from a series of tuning forks or a retuned sonometer wire.",
  whyItMatters:
    "13 questions. Eight were set in board papers: prove that the beat frequency equals the difference of the two frequencies (2022), the time between two loudest sounds (2020), the speed of sound from two wavelengths and the beats they give (2017, 2018), the difference in wavelength of two notes (2023, 2024, 2025), and a sonometer wire put out of unison by lengthening it (2019). The textbook adds a series of tuning forks, two open pipes that beat and a wire whose tension is reduced.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpsw-beat-frequency",
      name: "Beat frequency",
      intuition:
        "Sound two notes whose frequencies are close, say 256 Hz and 260 Hz. They start in step and add to a loud sound, slowly drift out of step until they nearly cancel, then come back into step. The loudness rises and falls regularly: this waxing and waning is called beats. The faster the two notes drift apart, the more beats per second.",
      definition:
        "- **Beats:** the periodic rise and fall in the intensity of sound when two notes of slightly different frequencies are sounded together. One rise and one fall make one beat.\n" +
        "- Derivation outline: take \\(y_1 = a\\sin 2\\pi n_1t\\) and \\(y_2 = a\\sin 2\\pi n_2t\\), with \\(n_1 > n_2\\) and the same amplitude.\n" +
        "- By superposition and \\(\\sin C + \\sin D\\): \\(y = 2a\\cos 2\\pi\\left(\\dfrac{n_1 - n_2}{2}\\right)t\\,\\sin 2\\pi\\left(\\dfrac{n_1 + n_2}{2}\\right)t\\).\n" +
        "- The resultant has frequency \\(\\dfrac{n_1 + n_2}{2}\\) and an amplitude \\(A = 2a\\cos \\pi(n_1 - n_2)t\\) that changes with time.\n" +
        "- **Maxima** (\\(|A| = 2a\\)) at \\(t = 0, \\dfrac{1}{n_1 - n_2}, \\dfrac{2}{n_1 - n_2}, \\dots\\) **Minima** (\\(A = 0\\)) at \\(t = \\dfrac{1}{2(n_1 - n_2)}, \\dfrac{3}{2(n_1 - n_2)}, \\dots\\)\n" +
        "- The time between two maxima is \\(\\dfrac{1}{n_1 - n_2}\\), so the number of beats per second is \\(N = n_1 - n_2\\).",
      formula: {
        label: "Beats",
        latex: "N = n_1 - n_2, \\qquad \\text{time between two maxima} = \\frac{1}{n_1 - n_2}",
      },
      authoredExample: {
        prompt:
          "Two tuning forks of frequencies 256 Hz and 262 Hz are sounded together. Find the number of beats heard per second, the time between two successive loudest sounds, and the time from a loudest sound to the next silence.",
        steps: [
          "Given: \\(n_1 = 262\\) Hz, \\(n_2 = 256\\) Hz.",
          "Beat frequency: \\(N = n_1 - n_2 = 6\\) beats per second.",
          "Time between two maxima: \\(\\dfrac{1}{N} = \\dfrac{1}{6}\\) s \\(\\approx 0.167\\) s.",
          "A minimum comes halfway between two maxima: \\(\\dfrac{1}{2N} = \\dfrac{1}{12}\\) s \\(\\approx 0.083\\) s.",
        ],
        answer: "6 beats per second; 1/6 s; 1/12 s",
      },
      selfCheckExample: {
        prompt: "A tuning fork of unknown frequency gives 5 beats per second with a fork of 300 Hz. What can its frequency be?",
        steps: ["The difference of the two frequencies is 5 Hz.", "The unknown fork is 5 Hz above or below 300 Hz."],
        answer: "295 Hz or 305 Hz",
      },
      practiceSet: [
        { prompt: "Define beats.", answer: "The periodic rise and fall in loudness when two notes of slightly different frequencies sound together" },
        { prompt: "Two notes give 3 beats per second. Find the time between two successive maxima of loudness.", answer: "1/3 s" },
        { prompt: "Two forks of 380 Hz and 384 Hz sound together. At what frequency is the resultant note heard?", answer: "382 Hz, the average of the two" },
      ],
      pyqExampleId: "ba6235e8-bf15-4a13-904c-748152027cf5",
      traps: [
        {
          title: "Halving the beat frequency",
          body: "The amplitude carries \\(\\dfrac{n_1 - n_2}{2}\\), but the loudness peaks twice in each cycle of that cosine. So the beats per second are \\(n_1 - n_2\\), not half of it.",
        },
        {
          title: "Only one answer for an unknown fork",
          body: "A beat frequency tells you the difference, not which note is higher. Give both possible frequencies unless the question says which is higher.",
        },
        {
          title: "Stopping the proof at the equation",
          body: "Writing \\(y\\) is not the proof. Find the times of the maxima, show they are \\(\\dfrac{1}{n_1 - n_2}\\) apart, and only then conclude \\(N = n_1 - n_2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsw-beats-wavelength",
      name: "Beats from wavelengths and the speed of sound",
      intuition:
        "In the same air, all notes travel at the same speed, so frequency and wavelength are tied by \\(n = \\dfrac{v}{\\lambda}\\). A shorter wavelength means a higher frequency. Write each frequency as v over its wavelength, subtract, and set the difference equal to the beats.",
      definition:
        "- For each note in the same medium, \\(n = \\dfrac{v}{\\lambda}\\).\n" +
        "- Two wavelengths \\(\\lambda_1 < \\lambda_2\\) giving N beats: \\(v\\left(\\dfrac{1}{\\lambda_1} - \\dfrac{1}{\\lambda_2}\\right) = N\\), which gives v.\n" +
        "- Two known frequencies \\(n_1 < n_2\\) and a speed v: \\(\\lambda_1 - \\lambda_2 = v\\left(\\dfrac{1}{n_1} - \\dfrac{1}{n_2}\\right)\\).\n" +
        "- Two open pipes of lengths \\(l_1 < l_2\\): \\(n = \\dfrac{v}{2l}\\) for each, so \\(v\\left(\\dfrac{1}{2l_1} - \\dfrac{1}{2l_2}\\right) = N\\) (end corrections neglected).",
      formula: {
        label: "Beats from wavelengths",
        latex: "N = v\\left(\\frac{1}{\\lambda_1} - \\frac{1}{\\lambda_2}\\right), \\quad \\lambda_1 < \\lambda_2",
      },
      authoredExample: {
        prompt:
          "Two sound waves of wavelengths 1.00 m and 1.02 m in air produce 6 beats per second. Find the speed of sound in air and the frequencies of the two notes.",
        steps: [
          "Given: \\(\\lambda_1 = 1.00\\) m, \\(\\lambda_2 = 1.02\\) m, \\(N = 6\\) per second.",
          "Formula: \\(v\\left(\\dfrac{1}{\\lambda_1} - \\dfrac{1}{\\lambda_2}\\right) = N\\), so \\(v \\times \\dfrac{1.02 - 1.00}{1.00 \\times 1.02} = 6\\).",
          "\\(v = \\dfrac{6 \\times 1.02}{0.02} = 306\\) m/s.",
          "\\(n_1 = \\dfrac{306}{1.00} = 306\\) Hz; \\(n_2 = \\dfrac{306}{1.02} = 300\\) Hz. Check: \\(306 - 300 = 6\\).",
        ],
        answer: "v = 306 m/s; frequencies 306 Hz and 300 Hz",
      },
      selfCheckExample: {
        prompt: "Two pipes open at both ends, 40 cm and 41 cm long, sounded together give 10 beats per second. Find the speed of sound, neglecting end corrections.",
        steps: [
          "\\(n = \\dfrac{v}{2l}\\): \\(\\dfrac{v}{0.80} - \\dfrac{v}{0.82} = 10\\).",
          "\\(v \\times \\dfrac{0.02}{0.80 \\times 0.82} = 10\\), so \\(v = \\dfrac{10 \\times 0.656}{0.02} = 328\\) m/s.",
        ],
        answer: "328 m/s",
      },
      practiceSet: [
        { prompt: "In the same air, which note has the longer wavelength: 400 Hz or 440 Hz?", answer: "400 Hz" },
        { prompt: "Sound travels at 330 m/s. A note has a wavelength of 0.66 m. Find its frequency.", answer: "500 Hz" },
        { prompt: "Two notes of wavelengths \\(\\lambda_1 < \\lambda_2\\) travel at speed v. Write the number of beats they give per second.", answer: "\\(v\\left(\\dfrac{1}{\\lambda_1} - \\dfrac{1}{\\lambda_2}\\right)\\)" },
      ],
      pyqExampleId: "f062c7a2-c246-45f6-bd28-51948bf19d3d",
      traps: [
        {
          title: "Subtracting wavelengths to get beats",
          body: "Beats are a difference of frequencies. Turn each wavelength into a frequency, \\(\\dfrac{v}{\\lambda}\\), before you subtract.",
        },
        {
          title: "Subtracting the wrong way round",
          body: "The shorter wavelength has the higher frequency. Put \\(\\dfrac{1}{\\lambda_1}\\) of the shorter wavelength first so the beat frequency comes out positive.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsw-beats-series",
      name: "A series of tuning forks and a retuned wire",
      intuition:
        "If each fork in a row gives the same number of beats with the next, the frequencies go up (or down) in equal steps, like the terms of an arithmetic progression. And if a sonometer wire in unison with a fork is lengthened or slackened, its frequency drops by a small amount, which you hear as beats.",
      definition:
        "- N forks in increasing order, each giving x beats per second with the next: \\(n_p = n_1 + (p - 1)x\\), so the last fork is \\(n_N = n_1 + (N - 1)x\\). For decreasing order, subtract instead.\n" +
        "- Combine this with the extra fact given (for example, the last fork has twice the frequency of the first) and solve for \\(n_1\\).\n" +
        "- A wire in unison with a fork has the fork's frequency. After a change, find the new frequency from the laws of strings (\\(n \\propto \\dfrac{1}{l}\\), \\(n \\propto \\sqrt{T}\\)); the beats per second are the difference.\n" +
        "- If asked for the beats in a given time, multiply the beat frequency by that time.",
      formula: {
        label: "Series of forks",
        latex: "n_N = n_1 + (N - 1)\\,x",
      },
      authoredExample: {
        prompt:
          "Ten tuning forks are arranged in increasing order of frequency, each giving 3 beats per second with the next. The last fork has a frequency 1.5 times that of the first. Find the frequencies of the first and the last fork.",
        steps: [
          "Given: \\(N = 10\\), \\(x = 3\\) beats per second, \\(n_{10} = 1.5\\,n_1\\).",
          "Formula: \\(n_{10} = n_1 + (10 - 1) \\times 3 = n_1 + 27\\).",
          "\\(1.5\\,n_1 = n_1 + 27\\), so \\(0.5\\,n_1 = 27\\) and \\(n_1 = 54\\) Hz.",
          "\\(n_{10} = 1.5 \\times 54 = 81\\) Hz. Check: \\(54 + 27 = 81\\).",
        ],
        answer: "First fork 54 Hz; last fork 81 Hz",
      },
      selfCheckExample: {
        prompt: "In a series of tuning forks, each gives 4 beats per second with the next. By how much do the frequencies of the 1st and the 21st forks differ?",
        steps: ["From the 1st to the 21st fork there are 20 steps.", "\\(20 \\times 4 = 80\\) Hz."],
        answer: "80 Hz",
      },
      practiceSet: [
        { prompt: "A wire and a 512 Hz fork give 4 beats per second. What can the frequency of the wire be?", answer: "508 Hz or 516 Hz" },
        { prompt: "The tension in a sonometer wire in unison with a fork is reduced. Does the wire's frequency rise or fall?", answer: "It falls, since \\(n \\propto \\sqrt{T}\\)" },
        { prompt: "Twelve forks are in increasing order, each giving 2 beats per second with the next. The first is 100 Hz. Find the last.", answer: "122 Hz" },
      ],
      pyqExampleId: "dbaafe6a-5261-4626-b799-562e44a4965b",
      traps: [
        {
          title: "Counting forks instead of gaps",
          body: "N forks have \\(N - 1\\) gaps between them. Ten forks give nine steps of x, not ten.",
        },
        {
          title: "Beats in more than one second",
          body: "The beat frequency is per second. If the question asks for the beats heard in 2 s, multiply by 2.",
        },
      ],
    },
  ],
};
