import type { SubtopicNote } from "@/app/notes/_types";

export const SPEEDS_KTG_NOTE: SubtopicNote = {
  subtopicName: "Molecular Speeds and Mean Free Path",
  title: "Molecular Speeds and Mean Free Path",
  oneLineDefinition:
    "Molecular speeds grow as √(T/M): the rms, average and most probable speeds are fixed multiples of √(RT/M), and the mean free path, the average distance between collisions, is 1/(√2 π d² n).",
  whyItMatters:
    "Thirty PYQs, all multiple choice, and three from 2026. Fourteen scale the rms speed with temperature or molar mass, six compare the three kinds of molecular speed or work one out from a molecule's mass, and ten use the mean free path or the collision frequency. Every ratio here needs kelvin temperatures, and every one has a square root that is easy to drop.",
  concepts: [
    // C1 — rms scaling
    {
      kind: "formula" as const,
      slug: "jpktg-rms-scaling",
      name: "The rms speed scales as √(T/M)",
      intuition:
        "Since ½m⟨v²⟩ = (3/2)kT, the rms speed is √(3kT/m) = √(3RT/M). Heat a gas to four times its kelvin temperature and its molecules go twice as fast; make them sixteen times heavier and they go four times slower. Two gases have equal rms speeds exactly when T/M is the same for both.",
      definition:
        "- \\(v_{rms} = \\sqrt{\\dfrac{3RT}{M}} = \\sqrt{\\dfrac{3kT}{m}} = \\sqrt{\\dfrac{3P}{\\rho}}\\), with M in kg/mol.\n" +
        "- Ratio form: \\(\\dfrac{v_2}{v_1} = \\sqrt{\\dfrac{T_2}{T_1}\\cdot\\dfrac{M_1}{M_2}}\\).\n" +
        "- Same T: the lighter gas is faster. Same \\(v_{rms}\\): \\(T/M\\) is the same.\n" +
        "- A diatomic molecule that splits into atoms halves M, which has the same effect on \\(v_{rms}\\) as doubling T.\n" +
        "- Vapour density is proportional to M, so at one temperature \\(v_{rms} \\propto 1/\\sqrt{\\text{vapour density}}\\).\n" +
        "- \\(\\overline{v^{2}} = \\dfrac{3RT}{M}\\) is proportional to T: plotted against kelvin temperature it is a straight line through the origin.",
      formula: {
        label: "rms speed",
        latex: "v_{rms} = \\sqrt{\\frac{3RT}{M}} \\qquad \\frac{v_2}{v_1} = \\sqrt{\\frac{T_2M_1}{T_1M_2}}",
      },
      authoredExample: {
        prompt:
          "Nitrogen (M = 28 g/mol) is at 77 °C. At what temperature does helium (M = 4 g/mol) have the same rms speed? Find that speed. \\((R = 8.31)\\)",
        steps: [
          "Equal speeds need equal \\(T/M\\): \\(\\dfrac{350}{28} = \\dfrac{T}{4}\\), so \\(T = 50\\ \\text{K} = -223\\ ^{\\circ}\\text{C}\\).",
          "\\(v_{rms} = \\sqrt{\\dfrac{3 \\times 8.31 \\times 350}{0.028}} = \\sqrt{311\\,625} \\approx 558\\ \\text{m/s}\\).",
        ],
        answer: "50 K (−223 °C); about 558 m/s",
      },
      selfCheckExample: {
        prompt:
          "At 300 K the rms speed of the molecules of a gas is 480 m/s. At what temperature is it 720 m/s?",
        steps: [
          "Speed ratio \\(720/480 = 1.5\\), so the temperature ratio is \\(1.5^{2} = 2.25\\).",
          "\\(T = 2.25 \\times 300 = 675\\ \\text{K}\\).",
        ],
        answer: "675 K",
      },
      practiceSet: [
        { prompt: "A gas is heated from 250 K to 2250 K. What happens to its rms speed?", answer: "It triples" },
        { prompt: "Ratio of the rms speeds of hydrogen (M = 2) and helium (M = 4) at one temperature?", answer: "\\(\\sqrt{2} : 1\\)" },
        { prompt: "Nitrogen molecules split into atoms and, at the same time, the kelvin temperature halves. What happens to the rms speed?", answer: "It does not change", method: "T/M stays the same." },
        { prompt: "A gas is at 27 °C. At what temperature is its rms speed halved?", answer: "75 K, that is −198 °C" },
      ],
      pyqExampleId: "fd6323d4-349b-4d7f-b1f7-ca4ec424a933", // 21 Jan 2026 Shift 2: O2 at 47 °C vs H2
      traps: [
        {
          title: "Speed goes as √T, not T",
          body: "Four times the kelvin temperature gives twice the speed, not four times. The same square root applies to the molar mass.",
        },
        {
          title: "Celsius in the ratio",
          body: "Equal T/M must use kelvin. With nitrogen at 77 °C, 77/28 would put helium at 11 °C instead of the true 50 K.",
        },
      ],
    },

    // C2 — three speeds
    {
      kind: "formula" as const,
      slug: "jpktg-speed-types",
      name: "The rms, average and most probable speeds",
      intuition:
        "Molecular speeds are spread out (the Maxwell distribution), so there are three useful averages. The most probable speed sits at the peak of the curve, the average speed is a little higher, and the rms speed, which weights fast molecules more because it squares the speeds, is higher still. All three are fixed multiples of √(RT/M), so their ratios are the same for every gas at every temperature.",
      definition:
        "- Most probable: \\(v_p = \\sqrt{\\dfrac{2RT}{M}} \\approx 1.41\\sqrt{\\dfrac{RT}{M}}\\).\n" +
        "- Average: \\(\\bar{v} = \\sqrt{\\dfrac{8RT}{\\pi M}} \\approx 1.60\\sqrt{\\dfrac{RT}{M}}\\).\n" +
        "- Root mean square: \\(v_{rms} = \\sqrt{\\dfrac{3RT}{M}} \\approx 1.73\\sqrt{\\dfrac{RT}{M}}\\).\n" +
        "- \\(v_p : \\bar{v} : v_{rms} = \\sqrt{2} : \\sqrt{8/\\pi} : \\sqrt{3}\\). Divide any two; T and M cancel.\n" +
        "- With the mass of one molecule: \\(v_{rms} = \\sqrt{\\dfrac{3kT}{m}}\\).\n" +
        "- Brownian particles also carry \\(\\tfrac{3}{2}kT\\) on average, so \\(v_{rms} = \\sqrt{3kT/m}\\) holds for a smoke particle too; it is tiny because m is huge.",
      formula: {
        label: "Three molecular speeds",
        latex: "v_p = \\sqrt{\\frac{2RT}{M}} \\qquad \\bar{v} = \\sqrt{\\frac{8RT}{\\pi M}} \\qquad v_{rms} = \\sqrt{\\frac{3RT}{M}}",
      },
      authoredExample: {
        prompt:
          "Find the most probable, average and rms speeds of helium molecules (M = 4 g/mol) at 400 K. \\((R = 8.3)\\)",
        steps: [
          "\\(\\sqrt{\\dfrac{RT}{M}} = \\sqrt{\\dfrac{8.3 \\times 400}{0.004}} = \\sqrt{830\\,000} \\approx 911\\ \\text{m/s}\\).",
          "\\(v_p = 1.414 \\times 911 \\approx 1288\\ \\text{m/s}\\).",
          "\\(\\bar{v} = 1.596 \\times 911 \\approx 1454\\ \\text{m/s}\\).",
          "\\(v_{rms} = 1.732 \\times 911 \\approx 1578\\ \\text{m/s}\\).",
        ],
        answer: "About 1288, 1454 and 1578 m/s",
      },
      selfCheckExample: {
        prompt:
          "A gas molecule has mass \\(5.0 \\times 10^{-26}\\ \\text{kg}\\). Find its rms speed at 300 K. \\((k = 1.38 \\times 10^{-23}\\ \\text{J/K})\\)",
        steps: [
          "\\(v_{rms} = \\sqrt{\\dfrac{3kT}{m}} = \\sqrt{\\dfrac{3 \\times 1.38 \\times 10^{-23} \\times 300}{5.0 \\times 10^{-26}}}\\).",
          "\\(= \\sqrt{\\dfrac{1.242 \\times 10^{-20}}{5.0 \\times 10^{-26}}} = \\sqrt{2.484 \\times 10^{5}} \\approx 498\\ \\text{m/s}\\).",
        ],
        answer: "About 498 m/s",
      },
      practiceSet: [
        { prompt: "Put \\(v_p\\), \\(\\bar{v}\\) and \\(v_{rms}\\) in increasing order.", answer: "\\(v_p < \\bar{v} < v_{rms}\\)" },
        { prompt: "Ratio \\(\\bar{v}/v_p\\) for any gas?", answer: "\\(2/\\sqrt{\\pi} \\approx 1.13\\)" },
        { prompt: "Which speed sits at the peak of the Maxwell distribution?", answer: "The most probable speed, \\(\\sqrt{2RT/M}\\)" },
        { prompt: "A dust grain of mass \\(10^{-15}\\ \\text{kg}\\) in air at 300 K: rms speed \\((k = 1.38 \\times 10^{-23})\\)?", answer: "About 3.5 mm/s" },
      ],
      pyqExampleId: "822b02c9-f909-49cc-ab8b-634f9a9b3939", // 25 Jun 2022: v_rms in terms of v_p for oxygen
      traps: [
        {
          title: "Using the rms speed when the average speed is asked",
          body: "\"Average speed\" is √(8RT/πM); \"rms speed\" is √(3RT/M). They differ by about 8%, enough to land on a wrong option.",
        },
        {
          title: "Molar mass in grams",
          body: "With R = 8.31 J mol⁻¹ K⁻¹, M must be in kg/mol: 32 g/mol is 0.032 kg/mol. Grams make every speed about 32 times too small.",
        },
      ],
    },

    // C3 — mean free path
    {
      kind: "formula" as const,
      slug: "jpktg-mean-free-path",
      name: "Mean free path and collision frequency",
      intuition:
        "Picture a molecule of diameter d moving along: it hits every molecule whose centre comes within d of its path, so it sweeps out a tube of cross-section πd². The more molecules per cubic metre and the bigger they are, the sooner it hits one. Allowing for the motion of the others adds a factor √2. Divide the average speed by the mean free path and you get the number of collisions per second.",
      definition:
        "- \\(\\lambda = \\dfrac{1}{\\sqrt{2}\\,\\pi d^{2}n}\\), n = molecules per m³. With \\(P = nkT\\): \\(\\lambda = \\dfrac{kT}{\\sqrt{2}\\,\\pi d^{2}P}\\).\n" +
        "- \\(\\lambda \\propto \\dfrac{1}{d^{2}}\\) and \\(\\propto \\dfrac{1}{n}\\). At constant pressure \\(\\lambda \\propto T\\); in a sealed rigid vessel n is fixed, so \\(\\lambda\\) does not change on heating.\n" +
        "- Collision frequency \\(Z = \\dfrac{\\bar{v}}{\\lambda} = \\sqrt{2}\\,\\pi d^{2}n\\bar{v}\\); mean time between collisions \\(\\tau = 1/Z\\).\n" +
        "- Sealed vessel heated: n fixed, so \\(Z \\propto \\bar{v} \\propto \\sqrt{T}\\).\n" +
        "- Two gases at the same T and n: \\(Z \\propto \\dfrac{d^{2}}{\\sqrt{m}}\\).",
      formula: {
        label: "Mean free path",
        latex: "\\lambda = \\frac{1}{\\sqrt{2}\\,\\pi d^{2}n} = \\frac{kT}{\\sqrt{2}\\,\\pi d^{2}P} \\qquad Z = \\frac{\\bar{v}}{\\lambda}",
      },
      authoredExample: {
        prompt:
          "Molecules of diameter \\(2 \\times 10^{-10}\\ \\text{m}\\) are in a gas at 300 K and \\(1.0 \\times 10^{5}\\ \\text{Pa}\\), with an average speed of 700 m/s. Find the mean free path and the collision frequency. \\((k = 1.38 \\times 10^{-23}\\ \\text{J/K})\\)",
        steps: [
          "\\(\\lambda = \\dfrac{1.38 \\times 10^{-23} \\times 300}{1.414 \\times 3.14 \\times (2 \\times 10^{-10})^{2} \\times 10^{5}} = \\dfrac{4.14 \\times 10^{-21}}{1.78 \\times 10^{-14}}\\).",
          "\\(\\lambda \\approx 2.3 \\times 10^{-7}\\ \\text{m}\\).",
          "\\(Z = \\dfrac{700}{2.33 \\times 10^{-7}} \\approx 3.0 \\times 10^{9}\\ \\text{s}^{-1}\\).",
        ],
        answer: "\\(\\lambda \\approx 2.3 \\times 10^{-7}\\ \\text{m}\\); \\(Z \\approx 3.0 \\times 10^{9}\\) per second",
      },
      selfCheckExample: {
        prompt:
          "At constant pressure a gas is heated from 300 K to 450 K. By what factors do the mean free path and the collision frequency change?",
        steps: [
          "At constant P, \\(\\lambda \\propto T\\): factor \\(450/300 = 1.5\\).",
          "\\(Z = \\bar{v}/\\lambda \\propto \\sqrt{T}/T = 1/\\sqrt{T}\\): factor \\(\\sqrt{300/450} \\approx 0.82\\).",
        ],
        answer: "\\(\\lambda\\) × 1.5; Z × about 0.82",
      },
      practiceSet: [
        { prompt: "The molecular diameter doubles, everything else fixed. Mean free path?", answer: "Quartered" },
        { prompt: "The number of molecules per m³ is tripled at fixed temperature. Collision frequency?", answer: "Tripled" },
        { prompt: "A sealed rigid vessel is heated from 300 K to 1200 K. Mean free path and collision frequency?", answer: "\\(\\lambda\\) unchanged; Z doubles" },
        { prompt: "\\(\\lambda = 4 \\times 10^{-8}\\ \\text{m}\\), \\(\\bar{v} = 500\\ \\text{m/s}\\). Mean time between collisions?", answer: "\\(8 \\times 10^{-11}\\ \\text{s}\\)" },
      ],
      pyqExampleId: "a518bce5-3731-4207-8bb9-912cf265bd4a", // 28 Jan 2026 Shift 2: d = 5e-10 m at 41 °C
      traps: [
        {
          title: "1/d instead of 1/d²",
          body: "The mean free path goes as 1/d²: the target is an area, πd². Halving the diameter makes the path four times longer, not twice.",
        },
        {
          title: "Heating at constant pressure versus in a sealed vessel",
          body: "At constant pressure the gas spreads out and λ grows with T. In a sealed rigid vessel the molecules per cubic metre do not change, so λ stays the same and only the speed, and with it Z, goes up.",
        },
      ],
    },
  ],
};
