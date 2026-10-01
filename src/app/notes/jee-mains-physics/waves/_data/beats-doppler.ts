import type { SubtopicNote } from "@/app/notes/_types";

export const BEATS_DOPPLER_WAVE_NOTE: SubtopicNote = {
  subtopicName: "Beats and the Doppler Effect",
  title: "Beats and the Doppler Effect",
  oneLineDefinition:
    "Two close frequencies give beats at their difference |f₁ − f₂|; relative motion of source and observer shifts the heard frequency to f(v ± vₒ)/(v ∓ vₛ).",
  whyItMatters:
    "Twenty-one PYQs, ten of them asking for a number, and one from 2026. Eight are beats: tuning forks loaded with wax or filed, two pipes or two wavelengths sounding together, a retuned sonometer. Nine are Doppler shifts from moving sources and observers, two of them for light from a receding galaxy. Four are echoes from a wall or a hill. The formulas are short; the marks go on the signs and on which frequency reaches whom.",
  concepts: [
    // C1 — beats
    {
      kind: "formula" as const,
      slug: "jpwave-beats",
      name: "Beat frequency of two close frequencies",
      intuition:
        "Two notes of nearly equal frequency drift in and out of step. Each time they come back into step the sound swells, so loudness rises and falls at the difference of the two frequencies. The beat count tells you how far apart they are, but not which is higher; a small change to one fork settles that.",
      definition:
        "- Beat frequency \\(= |f_1 - f_2|\\). \"n beats in t seconds\" is \\(n/t\\) beats per second.\n" +
        "- Loading a fork with wax **lowers** its frequency; filing its prongs **raises** it.\n" +
        "- Decide the sign by testing both values: if changing fork A moves it towards the other fork, the beats fall; away, they rise.\n" +
        "- \\(x = a\\cos\\Delta t\\,\\cos\\bar{\\omega}t\\) is the sum of two waves at \\(\\bar{\\omega} \\pm \\Delta\\). The beat frequency is \\(\\dfrac{2\\Delta}{2\\pi} = \\dfrac{\\Delta}{\\pi}\\) Hz.\n" +
        "- Beats from two pipes, two strings or two wavelengths: write each frequency from its own formula, then subtract.\n" +
        "- A row of forks each n beats above the one before: the kth fork is \\(f_1 + (k - 1)n\\).",
      formula: {
        label: "Beats",
        latex: "f_{\\text{beat}} = |f_1 - f_2| \\qquad f_{\\text{beat}} = v\\left|\\frac{1}{\\lambda_1} - \\frac{1}{\\lambda_2}\\right|",
      },
      authoredExample: {
        prompt:
          "Fork P gives 6 beats per second with a 256 Hz fork. When P is filed, the beats rise to 8 per second. Find the frequency of P before filing.",
        steps: [
          "\\(|f_P - 256| = 6\\), so \\(f_P = 262\\ \\text{Hz}\\) or \\(250\\ \\text{Hz}\\).",
          "Filing raises \\(f_P\\). From 250 Hz it would move towards 256 Hz and the beats would fall.",
          "The beats rose, so \\(f_P = 262\\ \\text{Hz}\\) (264 Hz after filing).",
        ],
        answer: "262 Hz",
      },
      selfCheckExample: {
        prompt:
          "Two pipes open at both ends, 1.00 m and 1.02 m long, sound their fundamentals together and give 3 beats per second. Find the speed of sound.",
        steps: [
          "\\(f = \\dfrac{v}{2L}\\): \\(\\dfrac{v}{2}\\left(\\dfrac{1}{1.00} - \\dfrac{1}{1.02}\\right) = 3\\).",
          "\\(\\dfrac{1}{1.00} - \\dfrac{1}{1.02} = \\dfrac{0.02}{1.02}\\), so \\(v = \\dfrac{6 \\times 1.02}{0.02} = 306\\ \\text{m/s}\\).",
        ],
        answer: "\\(306\\ \\text{m/s}\\)",
      },
      practiceSet: [
        { prompt: "Forks of 512 Hz and 508 Hz sound together. Beats per second?", answer: "4" },
        { prompt: "\\(x = a\\cos(2t)\\cos(100t)\\), t in s. The beat frequency?", answer: "\\(2/\\pi \\approx 0.64\\) Hz", method: "Components at 102 and 98 rad/s" },
        { prompt: "Wax is put on one prong of a fork. Its frequency rises or falls?", answer: "Falls" },
        { prompt: "Ten forks in a row, each 3 beats per second above the one before; the last is 1.5 times the first. The last fork's frequency?", answer: "81 Hz", method: "\\(f + 27 = 1.5f\\)" },
      ],
      pyqExampleId: "e85b1bf9-05b5-4696-b543-9ebdda2c0299", // 28 Jan 2026 S2: fork A loaded with wax, beats fall
      traps: [
        {
          title: "Beats in a time are not beats per second",
          body: "Ten beats in 2 s is a beat frequency of 5 Hz. Using 10 as the frequency difference doubles every answer that follows.",
        },
        {
          title: "Test both candidate frequencies",
          body: "A beat count gives two possible frequencies, one above and one below. Only the change after loading or filing tells which one is right; never take the higher one by default.",
        },
        {
          title: "The envelope frequency is half the beat frequency",
          body: "In a cos(Δt) cos(ω̄t) the envelope cos(Δt) has frequency Δ/2π, but the loudness peaks twice in each of its cycles. The beat frequency is Δ/π.",
        },
      ],
    },

    // C2 — Doppler effect for moving source and observer
    {
      kind: "formula" as const,
      slug: "jpwave-doppler",
      name: "Doppler effect for a moving source and observer",
      intuition:
        "A source moving towards you squeezes the waves together, and you moving towards the source meet the waves more often. Either way the pitch rises; moving apart, it falls. Only motion along the line joining them counts, and if both move together with no relative motion, nothing changes.",
      definition:
        "- \\(f' = f\\,\\dfrac{v \\pm v_o}{v \\mp v_s}\\). Choose each sign so that motion **towards** the other raises f′: + on top for an observer moving towards the source, − below for a source moving towards the observer.\n" +
        "- Source and observer moving together at the same velocity: \\(f' = f\\). A passenger on the train hears the train's own whistle at its true frequency.\n" +
        "- One car chasing another: the observer moves towards the source (+ on top) and the source moves away from the observer (+ below).\n" +
        "- Approach and recession at speed u: \\(\\dfrac{f_{\\text{app}}}{f_{\\text{rec}}} = \\dfrac{v + u}{v - u}\\).\n" +
        "- Light from a receding galaxy (\\(v \\ll c\\)): \\(\\dfrac{\\Delta\\lambda}{\\lambda} = \\dfrac{v}{c}\\), a red shift.",
      formula: {
        label: "Doppler effect",
        latex: "f' = f\\,\\frac{v \\pm v_o}{v \\mp v_s} \\qquad \\frac{\\Delta\\lambda}{\\lambda} = \\frac{v}{c}",
      },
      authoredExample: {
        prompt:
          "An ambulance with a 500 Hz siren moves at \\(30\\ \\text{m/s}\\) towards a cyclist who rides towards it at \\(10\\ \\text{m/s}\\). Sound travels at \\(340\\ \\text{m/s}\\). What does the cyclist hear before and after they pass?",
        steps: [
          "Approaching: both move towards each other, \\(f' = 500 \\times \\dfrac{340 + 10}{340 - 30} = 500 \\times \\dfrac{350}{310} \\approx 564.5\\ \\text{Hz}\\).",
          "After passing: both move apart, \\(f' = 500 \\times \\dfrac{340 - 10}{340 + 30} = 500 \\times \\dfrac{330}{370} \\approx 445.9\\ \\text{Hz}\\).",
        ],
        answer: "About 564.5 Hz, then about 445.9 Hz",
      },
      selfCheckExample: {
        prompt:
          "A whistle is heard at 550 Hz as a train approaches and at 450 Hz as it recedes. Sound travels at \\(330\\ \\text{m/s}\\). Find the train's speed and the whistle's true frequency.",
        steps: [
          "\\(\\dfrac{550}{450} = \\dfrac{330 + u}{330 - u}\\): \\(11(330 - u) = 9(330 + u)\\), so \\(20u = 660\\) and \\(u = 33\\ \\text{m/s}\\).",
          "\\(550 = f \\times \\dfrac{330}{330 - 33}\\), so \\(f = 550 \\times 0.9 = 495\\ \\text{Hz}\\).",
        ],
        answer: "\\(33\\ \\text{m/s}\\) and 495 Hz",
      },
      practiceSet: [
        { prompt: "A passenger sits in a train whose whistle sounds at 400 Hz. What does the passenger hear?", answer: "400 Hz" },
        { prompt: "An observer moves towards a stationary source at one tenth of the speed of sound. The heard frequency changes by?", answer: "+10%" },
        { prompt: "A spectral line of 600 nm from a galaxy is observed at 601.2 nm. The galaxy's speed?", answer: "\\(6 \\times 10^{5}\\ \\text{m/s}\\), receding" },
        { prompt: "A 450 Hz source moves at \\(40\\ \\text{m/s}\\) towards a listener at rest; \\(v = 340\\ \\text{m/s}\\). The heard frequency?", answer: "510 Hz" },
      ],
      pyqExampleId: "b4b6005c-6dc8-493d-a3f4-ae32b245554a", // 11 Apr 2023: car Q chases car P, frequency heard in Q
      traps: [
        {
          title: "Set each sign by 'towards raises'",
          body: "Do not memorise one sign pattern. For the observer term, motion towards the source adds to v on top; for the source term, motion towards the observer subtracts from v below. Check that the answer rises when they close in.",
        },
        {
          title: "A chase is not an approach",
          body: "When the observer follows the source in the same direction, the observer moves towards the source but the source moves away from the observer. Both signs are +, and the two effects partly cancel.",
        },
      ],
    },

    // C3 — echo from a wall or hill
    {
      kind: "formula" as const,
      slug: "jpwave-doppler-echo",
      name: "Doppler effect for an echo from a wall",
      intuition:
        "An echo gets two shifts. First the wall is a stationary observer hearing the moving source. Then the wall re-sends that frequency as a stationary source, heard by the moving driver. Approaching the wall, both shifts raise the pitch, so the echo is well above the horn.",
      definition:
        "- Step 1, wall as observer: \\(f_1 = f\\,\\dfrac{v}{v - u}\\) for a source approaching at u.\n" +
        "- Step 2, wall as source, driver as observer approaching at u: \\(f_2 = f_1\\,\\dfrac{v + u}{v}\\).\n" +
        "- Together: \\(f_{\\text{echo}} = f\\,\\dfrac{v + u}{v - u}\\). The change \\(f_{\\text{echo}} - f = f\\,\\dfrac{2u}{v - u}\\).\n" +
        "- The driver hears the horn itself at f (moving with it), so the beats between horn and echo are \\(f_{\\text{echo}} - f\\).\n" +
        "- A listener between a source behind and a wall ahead hears the direct sound lowered and the reflected sound raised; the beats are their difference.",
      formula: {
        label: "Echo from a wall",
        latex: "f_{\\text{echo}} = f\\,\\frac{v + u}{v - u}",
      },
      authoredExample: {
        prompt:
          "A bat flies at \\(10\\ \\text{m/s}\\) towards a wall, sending out 40 kHz. Sound travels at \\(340\\ \\text{m/s}\\). What frequency does the bat hear in the echo?",
        steps: [
          "The wall receives \\(f_1 = 40 \\times \\dfrac{340}{330}\\ \\text{kHz}\\).",
          "The bat flies into the reflected sound: \\(f_2 = f_1 \\times \\dfrac{350}{340} = 40 \\times \\dfrac{350}{330}\\).",
          "\\(f_2 \\approx 42.4\\ \\text{kHz}\\).",
        ],
        answer: "About 42.4 kHz",
      },
      selfCheckExample: {
        prompt:
          "A train moves at \\(20\\ \\text{m/s}\\) towards a cliff, blowing a 600 Hz whistle. Sound travels at \\(340\\ \\text{m/s}\\). Find the echo frequency the driver hears and the beats between it and the whistle.",
        steps: [
          "\\(f_{\\text{echo}} = 600 \\times \\dfrac{360}{320} = 675\\ \\text{Hz}\\).",
          "The driver hears the whistle itself at 600 Hz, so there are \\(675 - 600 = 75\\) beats per second.",
        ],
        answer: "675 Hz and 75 beats per second",
      },
      practiceSet: [
        { prompt: "A car's echo from a wall is 1.2 times its horn frequency. The car's speed, as a fraction of the speed of sound v?", answer: "\\(v/11\\)" },
        { prompt: "A car at \\(20\\ \\text{m/s}\\) sounds a 480 Hz horn approaching a wall; \\(v = 340\\ \\text{m/s}\\). The echo the driver hears?", answer: "540 Hz" },
        { prompt: "A cyclist rides at \\(10\\ \\text{m/s}\\) towards a wall, away from a 510 Hz source at rest behind him; \\(v = 340\\ \\text{m/s}\\). Beats heard?", answer: "30 per second", method: "Direct 495 Hz, reflected 525 Hz" },
        { prompt: "A source and a wall are both at rest. Does the echo change frequency?", answer: "No" },
      ],
      pyqExampleId: "339e589c-b76a-4ae7-8ec4-eecf4be0dcae", // 6 Apr 2023: car approaching a wall, change in frequency on reflection
      traps: [
        {
          title: "An echo is shifted twice",
          body: "Applying the Doppler formula once, for the source only, misses the second shift as the driver moves into the reflected sound. The echo heard by an approaching driver is f(v + u)/(v − u).",
        },
        {
          title: "The driver hears his own horn unshifted",
          body: "The driver moves with the horn, so the direct sound reaches him at its true frequency. A beat or a 'change' between horn and echo is measured from f, not from a shifted value.",
        },
      ],
    },
  ],
};
