import type { SubtopicNote } from "@/app/notes/_types";

export const AM_COMM_NOTE: SubtopicNote = {
  subtopicName: "Modulation Index, Sidebands and Bandwidth",
  title: "Modulation Index, Sidebands and Bandwidth",
  oneLineDefinition:
    "In amplitude modulation the carrier's amplitude follows the message; the modulation index μ = Aₘ/A_c fixes the largest and smallest amplitudes, and the wave carries f_c and f_c ± fₘ, a bandwidth of 2fₘ.",
  whyItMatters:
    "Twenty-nine PYQs, six of them asking for a number: nine from 2021, ten from 2022 and ten from 2023. Six are about the modulation index itself, eleven read the largest and smallest amplitudes of the modulated wave, and twelve ask which frequencies the wave carries, its bandwidth, or how many stations fit in a band. This is the largest page of the chapter, and the work is short arithmetic once the two formulas are fixed.",
  concepts: [
    // C1 — what AM is and the modulation index
    {
      kind: "formula" as const,
      slug: "jpcomm-mod-index",
      name: "Amplitude modulation and the modulation index",
      intuition:
        "In amplitude modulation the carrier keeps its frequency, but its amplitude rises and falls with the message. The modulation index says how deep that rise and fall is, as a fraction of the carrier's amplitude. If the message is bigger than the carrier, the amplitude would have to go below zero, and the shape of the message is lost.",
      definition:
        "- Carrier \\(c(t) = A_c \\sin \\omega_c t\\); message \\(m(t) = A_m \\sin \\omega_m t\\).\n" +
        "- AM wave: \\(c_m(t) = (A_c + A_m \\sin \\omega_m t) \\sin \\omega_c t\\). The amplitude of the **carrier** changes with the message; its frequency does not.\n" +
        "- Modulation index \\(\\mu = \\dfrac{A_m}{A_c}\\), often given as a percentage.\n" +
        "- \\(\\mu \\le 1\\) is needed to avoid distortion. With \\(\\mu > 1\\) (over-modulation) the envelope no longer follows the message.\n" +
        "- From a graph of the message, \\(A_m\\) is half its peak-to-peak swing: a square wave between +a and −a has \\(A_m = a\\).",
      formula: {
        label: "Modulation index",
        latex: "\\mu = \\frac{A_m}{A_c}, \\qquad \\mu \\le 1",
      },
      authoredExample: {
        prompt:
          "A message of amplitude 3 V modulates a carrier of amplitude 12 V. Find the modulation index. What message amplitude would give \\(\\mu = 0.75\\) with the same carrier?",
        steps: [
          "\\(\\mu = \\dfrac{A_m}{A_c} = \\dfrac{3}{12} = 0.25\\), that is \\(25\\%\\).",
          "For \\(\\mu = 0.75\\): \\(A_m = \\mu A_c = 0.75 \\times 12 = 9\\) V.",
        ],
        answer: "\\(\\mu = 0.25\\) (25%); a 9 V message gives 0.75.",
      },
      selfCheckExample: {
        prompt:
          "A message of amplitude 6 V is used to modulate a carrier of amplitude 4 V. Find \\(\\mu\\). Will the message be received without distortion?",
        steps: [
          "\\(\\mu = \\dfrac{6}{4} = 1.5\\).",
          "\\(\\mu > 1\\): this is over-modulation, so the envelope does not follow the message.",
          "The carrier amplitude must be at least 6 V to bring \\(\\mu\\) down to 1.",
        ],
        answer: "\\(\\mu = 1.5\\); no, the signal is distorted.",
      },
      practiceSet: [
        { prompt: "Carrier \\(10\\sin(2\\pi \\times 10^{6} t)\\) V, message \\(4\\sin(2\\pi \\times 10^{3} t)\\) V. Modulation index?", answer: "0.4" },
        { prompt: "A square-wave message swings between +3 V and −3 V. The carrier is \\(4\\sin(\\omega_c t)\\) V. Modulation index?", answer: "0.75" },
        { prompt: "The message amplitude is doubled and the carrier amplitude is halved. How does \\(\\mu\\) change?", answer: "It becomes 4 times as large" },
        { prompt: "Which quantity of the carrier changes in amplitude modulation?", answer: "Its amplitude; the frequency stays the same" },
      ],
      pyqExampleId: "22240c27-11b0-40e4-8019-305668bee532", // 2023: same message on carriers Y and 2Y, ratio of indices
      traps: [
        {
          title: "Message over carrier, not the other way",
          body: "\\(\\mu = A_m/A_c\\). Writing \\(A_c/A_m\\) gives a value above 1 for any normal AM wave, which should itself be a warning.",
        },
        {
          title: "Read the amplitude, not the swing",
          body: "A message drawn between +a and −a has amplitude a, not 2a. Taking the full swing doubles \\(\\mu\\).",
        },
        {
          title: "It is the carrier whose amplitude changes",
          body: "Statements say the amplitude of the 'modulating' or 'modulated' signal is varied. In AM it is the amplitude of the carrier that is varied, in step with the message.",
        },
      ],
    },

    // C2 — maximum and minimum amplitudes
    {
      kind: "formula" as const,
      slug: "jpcomm-envelope",
      name: "Maximum and minimum amplitude of an AM wave",
      intuition:
        "The amplitude of an AM wave swings between the carrier plus the message and the carrier minus the message. So the largest and smallest amplitudes hold both pieces of information: their average is the carrier, and half their difference is the message. Divide one by the other and you have the modulation index.",
      definition:
        "- \\(A_{\\max} = A_c + A_m\\) and \\(A_{\\min} = A_c - A_m\\).\n" +
        "- So \\(A_c = \\dfrac{A_{\\max} + A_{\\min}}{2}\\) and \\(A_m = \\dfrac{A_{\\max} - A_{\\min}}{2}\\).\n" +
        "- \\(\\mu = \\dfrac{A_{\\max} - A_{\\min}}{A_{\\max} + A_{\\min}}\\). Peak-to-peak values are both doubled, so they give the same \\(\\mu\\).\n" +
        "- In terms of \\(\\mu\\): \\(A_{\\max} = A_c(1 + \\mu)\\), \\(A_{\\min} = A_c(1 - \\mu)\\), and \\(\\dfrac{A_{\\max}}{A_{\\min}} = \\dfrac{1 + \\mu}{1 - \\mu}\\).\n" +
        "- Each side band has amplitude \\(\\dfrac{\\mu A_c}{2} = \\dfrac{A_m}{2}\\).",
      formula: {
        label: "Modulation index from the envelope",
        latex: "\\mu = \\frac{A_{\\max} - A_{\\min}}{A_{\\max} + A_{\\min}}, \\qquad A_{\\text{side band}} = \\frac{\\mu A_c}{2} = \\frac{A_m}{2}",
      },
      authoredExample: {
        prompt:
          "An AM wave has a largest amplitude of 10 V and a smallest amplitude of 4 V. Find the carrier amplitude, the message amplitude, the modulation index and the amplitude of each side band.",
        steps: [
          "\\(A_c = \\dfrac{10 + 4}{2} = 7\\) V and \\(A_m = \\dfrac{10 - 4}{2} = 3\\) V.",
          "\\(\\mu = \\dfrac{A_m}{A_c} = \\dfrac{3}{7} \\approx 0.43\\). The envelope formula gives the same: \\(\\dfrac{6}{14}\\).",
          "Each side band: \\(\\dfrac{A_m}{2} = 1.5\\) V.",
        ],
        answer: "\\(A_c = 7\\) V, \\(A_m = 3\\) V, \\(\\mu = 3/7 \\approx 0.43\\), side bands 1.5 V each.",
      },
      selfCheckExample: {
        prompt:
          "A carrier of amplitude 20 V is modulated with \\(\\mu = 0.5\\). Find the largest and smallest amplitudes of the AM wave and their ratio.",
        steps: [
          "\\(A_m = \\mu A_c = 10\\) V.",
          "\\(A_{\\max} = 20 + 10 = 30\\) V and \\(A_{\\min} = 20 - 10 = 10\\) V.",
          "Ratio: \\(30 : 10 = 3 : 1\\). Check: \\(\\dfrac{1 + 0.5}{1 - 0.5} = 3\\).",
        ],
        answer: "30 V and 10 V, in the ratio 3 : 1.",
      },
      practiceSet: [
        { prompt: "An AM wave swings between amplitudes of 11 V and 5 V. Modulation index?", answer: "0.375" },
        { prompt: "An AM wave has largest and smallest amplitudes of 50 V and 30 V. Amplitude of each side band?", answer: "5 V" },
        { prompt: "Peak-to-peak voltages of an AM wave are 20 mV at most and 12 mV at least. Modulation index?", answer: "0.25" },
        { prompt: "A 10 V carrier is modulated with \\(\\mu = 0.2\\). Largest and smallest amplitudes?", answer: "12 V and 8 V" },
      ],
      pyqExampleId: "8fb23b8f-3f04-4058-ad31-482364048654", // 2023: minimum 3 V at 60% modulation, find the maximum
      traps: [
        {
          title: "μ is not the ratio of the largest to the smallest",
          body: "\\(\\mu = (A_{\\max} - A_{\\min})/(A_{\\max} + A_{\\min})\\). Dividing \\(A_{\\max}\\) by \\(A_{\\min}\\) gives \\((1 + \\mu)/(1 - \\mu)\\), a different number that the options also carry.",
        },
        {
          title: "A side band carries half the message amplitude",
          body: "Each side band has amplitude \\(\\mu A_c/2 = A_m/2\\). Using \\(\\mu A_c\\) gives twice the right value.",
        },
        {
          title: "Check which ratio is asked",
          body: "Questions ask for maximum to minimum or minimum to maximum, and as a ratio like 50 : x. Write both amplitudes first, then set them in the order the stem gives.",
        },
      ],
    },

    // C3 — frequencies present, bandwidth, stations in a band
    {
      kind: "formula" as const,
      slug: "jpcomm-sidebands",
      name: "Side-band frequencies and the bandwidth of an AM wave",
      intuition:
        "Multiply out the AM wave and it splits into three plain sine waves: the carrier itself and two waves just above and just below it, at the carrier frequency plus and minus the message frequency. The message frequency on its own is not in the wave. The band from the lower side band to the upper one is 2fₘ wide, and that is the space each station needs.",
      definition:
        "- Expanding with \\(\\sin a \\sin b = \\tfrac{1}{2}[\\cos(a - b) - \\cos(a + b)]\\): \\(c_m(t) = A_c \\sin \\omega_c t + \\dfrac{\\mu A_c}{2}\\cos(\\omega_c - \\omega_m)t - \\dfrac{\\mu A_c}{2}\\cos(\\omega_c + \\omega_m)t\\).\n" +
        "- Frequencies present: \\(f_c\\), \\(f_c - f_m\\) (lower side band) and \\(f_c + f_m\\) (upper side band).\n" +
        "- Bandwidth \\(= (f_c + f_m) - (f_c - f_m) = 2f_m\\). Find f from \\(\\omega\\) first: \\(f = \\omega/2\\pi\\).\n" +
        "- Stations that fit in a band without overlapping: \\(N = \\dfrac{\\text{band}}{2f_m}\\), rounded down.\n" +
        "- A square-law modulator gives \\(f_m\\), \\(2f_m\\), \\(f_c\\), \\(2f_c\\) and \\(f_c \\pm f_m\\); a band-pass filter keeps only \\(f_c\\) and \\(f_c \\pm f_m\\), so the output bandwidth is again \\(2f_m\\). At the receiver a rectifier and an envelope detector recover the message.\n" +
        "- Frequency modulation, for contrast: the deviation ratio is \\(\\Delta f/f_m\\), and by Carson's rule the bandwidth is \\(2(\\Delta f + f_m)\\).",
      formula: {
        label: "Side bands and bandwidth",
        latex: "f_{\\text{LSB}} = f_c - f_m, \\quad f_{\\text{USB}} = f_c + f_m, \\qquad \\text{BW} = 2f_m",
      },
      authoredExample: {
        prompt:
          "The carrier \\(12\\sin(1.6\\pi \\times 10^{6} t)\\) V is amplitude modulated by \\(4\\sin(8\\pi \\times 10^{3} t)\\) V. Which frequencies does the AM wave contain? Find its bandwidth and the amplitude of each side band.",
        steps: [
          "\\(f_c = \\dfrac{1.6\\pi \\times 10^{6}}{2\\pi} = 8 \\times 10^{5}\\) Hz \\(= 800\\) kHz; \\(f_m = \\dfrac{8\\pi \\times 10^{3}}{2\\pi} = 4\\) kHz.",
          "Frequencies: 800 kHz, \\(800 - 4 = 796\\) kHz and \\(800 + 4 = 804\\) kHz. The 4 kHz itself is not present.",
          "Bandwidth: \\(2f_m = 8\\) kHz.",
          "\\(\\mu = 4/12 = 1/3\\), so each side band has amplitude \\(\\dfrac{\\mu A_c}{2} = \\dfrac{4}{2} = 2\\) V.",
        ],
        answer: "796, 800 and 804 kHz; bandwidth 8 kHz; side bands 2 V each.",
      },
      selfCheckExample: {
        prompt:
          "A band 100 kHz wide is set aside for AM broadcasting. The highest audio frequency any station sends is 4 kHz. How many stations can share the band without overlapping?",
        steps: [
          "Each station needs \\(2f_m = 8\\) kHz.",
          "\\(N = \\dfrac{100}{8} = 12.5\\); a station cannot be split, so round down.",
        ],
        answer: "12 stations",
      },
      practiceSet: [
        { prompt: "A 2.5 kHz tone modulates a 1 MHz carrier. Side-band frequencies and bandwidth?", answer: "997.5 kHz and 1002.5 kHz; bandwidth 5 kHz" },
        { prompt: "Message \\(m(t) = 2\\sin(3\\pi \\times 10^{4} t)\\). Bandwidth of the AM wave?", answer: "30 kHz" },
        { prompt: "A 600 kHz carrier and an 8 kHz message pass through a square-law device and a band-pass filter. Which frequencies come out?", answer: "592, 600 and 608 kHz" },
        { prompt: "An FM signal has a deviation of 50 kHz and a 10 kHz message. Bandwidth by Carson's rule?", answer: "120 kHz" },
      ],
      pyqExampleId: "6838ab2d-68b2-48d8-a919-f04a12581904", // 2023: 15 sin(1000πt) modulated by 10 sin(4πt), frequencies present
      traps: [
        {
          title: "Convert ω to f first",
          body: "In \\(\\sin(\\omega t)\\) the number in front of t is \\(\\omega = 2\\pi f\\). Reading it as f makes every frequency, and the bandwidth, \\(2\\pi\\) times too large.",
        },
        {
          title: "The message frequency is not in the AM wave",
          body: "An AM wave contains \\(f_c\\) and \\(f_c \\pm f_m\\) only. Listing \\(f_m\\) on its own among the frequencies present is wrong.",
        },
        {
          title: "Bandwidth is twice the message frequency",
          body: "The bandwidth is \\(2f_m\\), set by the message alone. The carrier frequency does not enter it, and \\(f_m\\) alone is half the answer.",
        },
        {
          title: "Each station needs 2fₘ, not fₘ",
          body: "Dividing the band by \\(f_m\\) counts twice as many stations as can really fit. Divide by \\(2f_m\\) and round down.",
        },
      ],
    },
  ],
};
