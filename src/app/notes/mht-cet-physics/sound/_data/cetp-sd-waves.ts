import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/sound";

export const WAVES_NOTE: SubtopicNote = {
  subtopicName: "Sound Wave Properties, Speed, and Intensity",
  title: "Sound Waves: Speed, Energy and Loudness",
  oneLineDefinition:
    "Sound is a mechanical wave that needs a medium, travels at v = fλ, carries energy proportional to the square of its amplitude times the square of its frequency, and is measured in decibels, where every 10 dB is ten times the intensity.",
  whyItMatters:
    "6 PYQs, one HARD: the distance a sound travels in a number of vibrations, how many times more intense one decibel level is than another, the amplitude that keeps energy equal at a lower frequency, the speed of sound in a gas mixture, and which statements and instruments fit. One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-sd-sound-waves",
      name: "Speed, Energy and Decibels",
      intuition:
        "Each vibration sends the wave one wavelength further, so n vibrations cover nλ = nv/f. A wave's energy goes as A²f², so at a third of the frequency the amplitude must be three times larger to carry the same energy. Loudness in decibels is 10 log(I/I₀): a 30 dB difference is 10³ = 1000 times the intensity. Sound cannot cross a vacuum. In a gas its speed is √(γRT/M); for a mixture, average the molar mass and the specific heats by moles first.",
      definition:
        "- \\(v = f\\lambda\\); n vibrations cover \\(n\\lambda\\) (480 Hz at 320 m/s, 180 vibrations ⇒ 120 m).\n" +
        "- Energy \\(\\propto A^2 f^2\\): equal energy at f/3 ⇒ 3A.\n" +
        "- \\(L = 10\\log\\dfrac{I}{I_0}\\) dB: ΔL of 10n dB ⇒ \\(10^n\\) times the intensity.\n" +
        "- \\(v = \\sqrt{\\dfrac{\\gamma RT}{M}}\\); mixture: mole-weighted M and \\(C_v\\) (1 mol He + 2 mol O₂ at 27 °C ⇒ 401 m/s).\n" +
        "- Sound needs a medium; percussion instruments are struck (a clarinet is blown).",
      formula: {
        label: "Wave speed and loudness",
        latex: "v = f\\lambda, \\qquad L = 10\\log_{10}\\frac{I}{I_0}",
      },
      authoredExample: {
        prompt: "A 500 Hz sound travels at 340 m/s. Its wavelength, and the distance covered in 100 vibrations?",
        steps: ["λ = 340/500 = 0.68 m.", "100λ = 68 m."],
        answer: "0.68 m; 68 m",
      },
      selfCheckExample: {
        prompt: "How many times more intense is a 70 dB sound than a 50 dB one?",
        steps: ["20 dB ⇒ 10²."],
        answer: "100",
      },
      practiceSet: [
        { prompt: "Which is NOT true: sound travels through a vacuum, or sound is a form of energy?", answer: "Sound travels through a vacuum" },
      ],
      pyqExampleId: "deeb8a73-e773-4cbd-bd26-f7796c6c79eb",
      traps: [
        {
          title: "Treating decibels as linear",
          body:
            "60 dB is not twice as intense as 30 dB. Each 10 dB multiplies the intensity by 10, so 30 dB more is 1000 times.",
        },
        {
          title: "Holding amplitude fixed when frequency changes",
          body:
            "Energy goes as A²f². To keep it equal at a third of the frequency, the amplitude must triple.",
        },
      ],
    },
  ],
  related: [
    { label: "Organ Pipes and Resonance", href: `${BASE}/cetp-sd-pipes` },
  ],
};
