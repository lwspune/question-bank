import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SW_STRINGS_NOTE: SubtopicNote = {
  subtopicName: "Vibrations of a Stretched String and Sonometer",
  title: "Vibrations of a Stretched String and the Sonometer",
  oneLineDefinition:
    "Stationary waves on a string fixed at both ends: the speed of a transverse wave, the fundamental and its harmonics, the three laws of vibrating strings, their verification with a sonometer, and finding a wire's tension or linear density.",
  whyItMatters:
    "22 questions, the largest page in this chapter. Eight were set in board papers: show that a stretched string gives all harmonics (2024), the speed of a transverse wave from its second overtone and what that speed depends on (2017), the tension of a wire in unison with a fork (2019, 2020), and the laws of vibrating strings applied to a load immersed in water (2016), a 21% rise in tension and a guitar string pressed down (2026). The textbook adds the statement and verification of the laws, linear density, two wires in unison and a string with one free end.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpsw-string-modes",
      name: "Modes of a string fixed at both ends",
      intuition:
        "Pluck a stretched string and waves run to both ends and reflect. Both ends are fixed, so both are nodes, and the string can only hold a whole number of loops. One loop is the fundamental, two loops the first overtone, and so on. Every whole number of loops is allowed, so every harmonic is present.",
      definition:
        "- Speed of a transverse wave on a string: \\(v = \\sqrt{\\dfrac{T}{m}}\\), where T is the tension and m the mass per unit length (linear density).\n" +
        "- Both ends are nodes. **Fundamental:** one loop, \\(l = \\dfrac{\\lambda}{2}\\), so \\(n = \\dfrac{v}{2l} = \\dfrac{1}{2l}\\sqrt{\\dfrac{T}{m}}\\).\n" +
        "- **First overtone:** two loops, \\(l = \\lambda_1\\), \\(n_1 = 2n\\). **Second overtone:** three loops, \\(l = \\dfrac{3\\lambda_2}{2}\\), \\(n_2 = 3n\\).\n" +
        "- With p loops, \\(l = \\dfrac{p\\lambda}{2}\\) and the frequency is \\(pn\\). The frequencies are in the ratio \\(1 : 2 : 3 : \\dots\\), so all harmonics are present.\n" +
        "- A string fixed at one end with the vibrations imposed at its free end has a node at the fixed end and an antinode at the free end (textbook Ex. Q.19), so each complete loop adds \\(\\dfrac{\\lambda}{2}\\) and the free end adds a further \\(\\dfrac{\\lambda}{4}\\).",
      formula: {
        label: "Stretched string",
        latex: "v = \\sqrt{\\frac{T}{m}}, \\qquad n = \\frac{1}{2l}\\sqrt{\\frac{T}{m}}, \\qquad n_p = p\\,n \\ (p \\text{ loops})",
      },
      authoredExample: {
        prompt:
          "A string 0.6 m long, fixed at both ends, has a linear density of 0.01 kg/m and is under a tension of 36 N. Find the speed of transverse waves on it, its fundamental frequency and its second overtone.",
        steps: [
          "Given: \\(l = 0.6\\) m, \\(m = 0.01\\) kg/m, \\(T = 36\\) N.",
          "\\(v = \\sqrt{\\dfrac{T}{m}} = \\sqrt{\\dfrac{36}{0.01}} = \\sqrt{3600} = 60\\) m/s.",
          "\\(n = \\dfrac{v}{2l} = \\dfrac{60}{2 \\times 0.6} = 50\\) Hz.",
          "Second overtone = third harmonic: \\(3n = 150\\) Hz.",
        ],
        answer: "60 m/s; 50 Hz; 150 Hz",
      },
      selfCheckExample: {
        prompt: "A string fixed at both ends vibrates in three loops at 240 Hz. Find its fundamental frequency.",
        steps: ["Three loops is the third harmonic, \\(3n\\).", "\\(n = \\dfrac{240}{3} = 80\\) Hz."],
        answer: "80 Hz",
      },
      practiceSet: [
        { prompt: "For a string of fixed linear density, the speed of a transverse wave is proportional to what power of the tension?", answer: "The square root, \\(v \\propto \\sqrt{T}\\)" },
        { prompt: "A string 1 m long, fixed at both ends, vibrates in its fundamental mode at 100 Hz. Find the speed of the waves on it.", answer: "\\(\\lambda = 2\\) m, so 200 m/s" },
        { prompt: "A string's fundamental frequency is 220 Hz. Find its first overtone.", answer: "440 Hz" },
      ],
      pyqExampleId: "391f8e1c-4469-4203-a3a0-6ee7c4777443",
      traps: [
        {
          title: "Second overtone taken as the second harmonic",
          body: "For a string, the p-th overtone is the (p + 1)-th harmonic. The second overtone has three loops and frequency 3n.",
        },
        {
          title: "Taking the string's length as one wavelength",
          body: "In the fundamental the string holds one loop, half a wavelength: \\(\\lambda = 2l\\), not \\(l\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsw-string-laws",
      name: "Laws of vibrating strings and the sonometer",
      intuition:
        "The formula \\(n = \\dfrac{1}{2l}\\sqrt{\\dfrac{T}{m}}\\) holds three laws in one line. A shorter string, a tighter string or a lighter string vibrates faster. Each law is true only while the other two quantities are kept fixed, and the sonometer is the instrument that lets you change one at a time.",
      definition:
        "- **Law of length:** \\(n \\propto \\dfrac{1}{l}\\), when T and m are constant.\n" +
        "- **Law of tension:** \\(n \\propto \\sqrt{T}\\), when l and m are constant.\n" +
        "- **Law of linear density:** \\(n \\propto \\dfrac{1}{\\sqrt{m}}\\), when T and l are constant.\n" +
        "- **Sonometer:** a hollow wooden box with a wire fixed at one end, passing over a pulley at the other, where a hanger with weights sets the tension. Two movable bridges set the vibrating length. A small paper rider placed midway between the bridges is thrown off when the wire is in resonance with a tuning fork held on the box.\n" +
        "- **Verifying the law of length:** keep T fixed, find the resonating length for forks of different frequencies; \\(n_1l_1 = n_2l_2 = \\dots\\) is constant.\n" +
        "- **Verifying the law of tension:** keep l and the wire fixed, change T for forks of different frequencies; \\(\\dfrac{n}{\\sqrt{T}}\\) is constant.\n" +
        "- **Verifying the law of linear density:** two wires under the same tension, the same fork; \\(l_1\\sqrt{m_1} = l_2\\sqrt{m_2}\\), and since \\(n \\propto \\dfrac{1}{l}\\), \\(n \\propto \\dfrac{1}{\\sqrt{m}}\\).",
      formula: {
        label: "Laws of vibrating strings",
        latex: "n \\propto \\frac{1}{l}, \\qquad n \\propto \\sqrt{T}, \\qquad n \\propto \\frac{1}{\\sqrt{m}}",
      },
      authoredExample: {
        prompt:
          "A sonometer wire with a vibrating length of 75 cm is in unison with a tuning fork of 256 Hz. To what length must it be changed to be in unison with a fork of 320 Hz, the tension staying the same?",
        steps: [
          "Given: \\(l_1 = 75\\) cm, \\(n_1 = 256\\) Hz, \\(n_2 = 320\\) Hz, T and m unchanged.",
          "Law of length: \\(n_1l_1 = n_2l_2\\).",
          "\\(l_2 = \\dfrac{256 \\times 75}{320} = \\dfrac{19200}{320} = 60\\) cm.",
        ],
        answer: "60 cm",
      },
      selfCheckExample: {
        prompt: "Two wires of the same material and the same length are under equal tension. One has twice the diameter of the other. Find the ratio of the frequency of the thinner wire to that of the thicker one.",
        steps: [
          "Linear density goes as the cross section, so \\(m \\propto d^2\\): the thicker wire has 4 times the linear density.",
          "\\(n \\propto \\dfrac{1}{\\sqrt{m}}\\), so the thinner wire's frequency is \\(\\sqrt{4} = 2\\) times the thicker one's.",
        ],
        answer: "2 : 1",
      },
      practiceSet: [
        { prompt: "State the law of length for a vibrating string.", answer: "The fundamental frequency is inversely proportional to the vibrating length, when tension and linear density are constant" },
        { prompt: "What is the paper rider on a sonometer wire used for?", answer: "It is thrown off when the wire is in resonance with the tuning fork" },
        { prompt: "The vibrating length of a sonometer wire is halved, the tension unchanged. What happens to its frequency?", answer: "It doubles" },
      ],
      pyqExampleId: "527ec640-31f1-42e6-ba62-9a6067c9d488",
      traps: [
        {
          title: "A law without its condition",
          body: "'Frequency is inversely proportional to length' loses a mark. Add 'when the tension and linear density are constant'; each law needs the other two quantities fixed.",
        },
        {
          title: "Forgetting the square root",
          body: "Four times the tension gives twice the frequency, not four times. Frequency follows \\(\\sqrt{T}\\) and \\(\\dfrac{1}{\\sqrt{m}}\\).",
        },
        {
          title: "Stopping at the vibrating length",
          body: "The law of length gives the length left free to vibrate. When a question asks where to press a string, finish by saying where the point is, measured from an end of the string.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsw-tension-density",
      name: "Finding the tension or the linear density",
      intuition:
        "Square both sides of \\(n = \\dfrac{1}{2l}\\sqrt{\\dfrac{T}{m}}\\) and the square root disappears. Then any one of n, l, T and m can be found from the other three. Most mistakes here are units: grams, centimetres and a load in kilograms all have to be turned into SI first.",
      definition:
        "- From \\(n = \\dfrac{1}{2l}\\sqrt{\\dfrac{T}{m}}\\): \\(T = 4l^2n^2m\\) and \\(m = \\dfrac{T}{4l^2n^2}\\).\n" +
        "- Linear density \\(m = \\dfrac{\\text{mass of the wire}}{\\text{length of the wire}}\\), in kg/m.\n" +
        "- A load of M kg on the hanger gives a tension \\(T = Mg\\) newtons.\n" +
        "- 'In unison with a fork' means the wire vibrates in its fundamental mode at the fork's frequency.",
      formula: {
        label: "Tension and linear density",
        latex: "T = 4\\,l^2 n^2 m, \\qquad m = \\frac{T}{4\\,l^2 n^2}",
      },
      authoredExample: {
        prompt:
          "A sonometer wire 40 cm long is stretched by a load of 4 kg and vibrates in its fundamental mode at 175 Hz. Find its linear density. (g = 9.8 m/s²)",
        steps: [
          "Given: \\(l = 0.4\\) m, \\(n = 175\\) Hz, \\(T = 4 \\times 9.8 = 39.2\\) N.",
          "Formula: \\(m = \\dfrac{T}{4l^2n^2}\\).",
          "\\(m = \\dfrac{39.2}{4 \\times 0.16 \\times 30625} = \\dfrac{39.2}{19600} = 2.0 \\times 10^{-3}\\) kg/m.",
        ],
        answer: "2.0 × 10⁻³ kg/m",
      },
      selfCheckExample: {
        prompt: "A wire 1.5 m long has a mass of 6 g. Find its linear density in SI units.",
        steps: ["\\(m = \\dfrac{6 \\times 10^{-3}\\ \\text{kg}}{1.5\\ \\text{m}} = 4 \\times 10^{-3}\\) kg/m."],
        answer: "4 × 10⁻³ kg/m",
      },
      practiceSet: [
        { prompt: "A load of 2 kg hangs from a sonometer wire. Find the tension in it. (g = 9.8 m/s²)", answer: "19.6 N" },
        { prompt: "Write the linear density m of a wire in terms of its fundamental frequency n, vibrating length l and tension T.", answer: "\\(m = \\dfrac{T}{4l^2n^2}\\)" },
        { prompt: "A wire of linear density 0.01 kg/m is under a tension of 100 N. Find the speed of transverse waves on it.", answer: "100 m/s" },
      ],
      pyqExampleId: "2268c93d-0395-4f28-88e6-645e6802bd43",
      traps: [
        {
          title: "Grams and centimetres left in",
          body: "Turn a mass in grams into kilograms and a length in centimetres into metres before substituting, or the tension comes out wrong by a large power of ten.",
        },
        {
          title: "Using the load in kilograms as the tension",
          body: "A 5 kg load gives a tension of \\(5 \\times 9.8 = 49\\) N, not 5 N. Tension is a force, in newtons.",
        },
      ],
    },
  ],
};
