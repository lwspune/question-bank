import type { SubtopicNote } from "@/app/notes/_types";

export const INCLINE_ROT_NOTE: SubtopicNote = {
  subtopicName: "Rolling on Inclines: Acceleration, Speed and Friction",
  title: "Rolling on Inclines: Acceleration, Speed and Friction",
  oneLineDefinition:
    "A body rolling down a slope accelerates at g sin θ/(1 + k²/R²) and reaches the bottom with v² = 2gh/(1 + k²/R²); static friction supplies the spin and does no work.",
  whyItMatters:
    "Twenty-two PYQs, nine of them asking for a number, and two from 2026. Thirteen use energy: the speed at the foot of a slope, the height a rolling body climbs, a race between shapes. Nine use forces: the acceleration down a slope, the friction rolling needs, a force applied at the top of a ball.",
  concepts: [
    // C1 — energy on a slope
    {
      kind: "formula" as const,
      slug: "jprot-incline-energy",
      name: "Speed and height of a body rolling on a slope",
      intuition:
        "Rolling without slipping wastes no energy: the contact point does not slide, so friction does no work. The height lost becomes ½mv²(1 + k²/R²). A shape with more of its mass far out (larger k²/R²) puts more energy into spin, so it is slower at the bottom. The mass and the radius cancel.",
      definition:
        "- Down a height h from rest: \\(mgh = \\tfrac{1}{2}mv^{2}\\left(1 + \\dfrac{k^{2}}{R^{2}}\\right)\\), so \\(v = \\sqrt{\\dfrac{2gh}{1 + k^{2}/R^{2}}}\\).\n" +
        "- Race from rest down one slope: solid sphere first, then disc and solid cylinder (together), then hollow sphere, then ring, whatever their masses and radii.\n" +
        "- Rolling UP a rough slope from speed v: \\(h = \\dfrac{v^{2}}{2g}\\left(1 + \\dfrac{k^{2}}{R^{2}}\\right)\\). Distance along the slope \\(= h/\\sin\\theta\\).\n" +
        "- Up a SMOOTH slope there is no friction to stop the spin: only \\(\\tfrac{1}{2}mv^{2}\\) turns into height, \\(h = v^{2}/2g\\), and the body keeps spinning at the top.\n" +
        "- A cylinder unwinding from strings (a yo-yo) obeys the same energy equation: \\(mgh = \\tfrac{1}{2}mv^{2} + \\tfrac{1}{2}\\left(\\tfrac{1}{2}mR^{2}\\right)\\dfrac{v^{2}}{R^{2}} = \\tfrac{3}{4}mv^{2}\\).\n" +
        "- Connected bodies (a wheel pulling a block over a pulley): count every body's kinetic energy.",
      formula: {
        label: "Speed at the foot of a slope, and height climbed",
        latex: "v = \\sqrt{\\frac{2gh}{1 + k^{2}/R^{2}}} \\qquad h_{\\max} = \\frac{v^{2}}{2g}\\left(1 + \\frac{k^{2}}{R^{2}}\\right)",
      },
      authoredExample: {
        prompt:
          "A solid sphere rolls without slipping down a slope from rest, losing 1.4 m of height. Find its speed at the bottom (g = 10 m/s²).",
        steps: [
          "For a solid sphere \\(1 + k^{2}/R^{2} = \\tfrac{7}{5}\\).",
          "\\(v^{2} = \\dfrac{2 \\times 10 \\times 1.4}{7/5} = \\dfrac{28 \\times 5}{7} = 20\\).",
          "\\(v = \\sqrt{20} = 2\\sqrt{5} \\approx 4.47\\) m/s; sliding without friction it would reach \\(\\sqrt{28} \\approx 5.29\\) m/s.",
        ],
        answer: "\\(2\\sqrt{5} \\approx 4.47\\) m/s",
      },
      selfCheckExample: {
        prompt:
          "A thin hollow sphere rolling at 6 m/s reaches the foot of a rough slope and rolls up it without slipping. How high does it rise (g = 10 m/s²)?",
        steps: [
          "\\(1 + k^{2}/R^{2} = 1 + \\tfrac{2}{3} = \\tfrac{5}{3}\\).",
          "\\(h = \\dfrac{36}{20} \\times \\dfrac{5}{3} = 3\\) m.",
        ],
        answer: "3 m",
      },
      practiceSet: [
        { prompt: "A ring and a disc roll from rest down the same height. Ratio of their speeds at the bottom, ring : disc?", answer: "\\(\\sqrt{3}/2\\)", method: "\\(\\sqrt{\\dfrac{3/2}{2}}\\)" },
        { prompt: "A disc rolling at speed v runs onto a frictionless slope. How high does it rise?", answer: "\\(v^{2}/2g\\); its spin stays unchanged" },
        { prompt: "Ring, solid sphere, disc and hollow sphere race down one slope from rest. Order of arrival?", answer: "Solid sphere, disc, hollow sphere, ring" },
        { prompt: "A solid cylinder unwinds from two strings and falls 0.6 m from rest (g = 10). Its speed?", answer: "\\(2\\sqrt{2}\\) m/s" },
      ],
      pyqExampleId: "11f8494d-624d-45f0-a031-3bd458eeaba3", // 2022: solid cylinder vs solid sphere, ratio of speeds at the bottom
      traps: [
        {
          title: "The slope's length is not the height",
          body: "The energy equation needs the vertical drop h. A slope of length l at angle θ drops h = l sin θ; using l gives too large a speed.",
        },
        {
          title: "A smooth slope does not stop the spin",
          body: "Without friction nothing can slow the rotation, so only the translational energy ½mv² becomes height. Using the rolling formula on a smooth slope overstates the height.",
        },
        {
          title: "Mass and radius do not decide the race",
          body: "Two solid spheres of different sizes reach the bottom together. Only the shape, through k²/R², changes the speed.",
        },
      ],
    },

    // C2 — forces and friction
    {
      kind: "formula" as const,
      slug: "jprot-incline-force",
      name: "Acceleration and friction of a rolling body",
      intuition:
        "Gravity's pull along the slope must both speed up the centre and spin the body up. Static friction at the contact point does the spinning: it acts up the slope, reducing the acceleration below g sin θ. The more of the mass that sits far out, the more friction is needed and the smaller the acceleration.",
      definition:
        "- Down a slope: \\(mg\\sin\\theta - f = ma\\), \\(fR = I\\dfrac{a}{R}\\), so \\(a = \\dfrac{g\\sin\\theta}{1 + k^{2}/R^{2}}\\) and \\(f = \\dfrac{mg\\sin\\theta\\,(k^{2}/R^{2})}{1 + k^{2}/R^{2}}\\).\n" +
        "- It rolls without slipping only if \\(\\mu \\ge \\dfrac{\\tan\\theta\\,(k^{2}/R^{2})}{1 + k^{2}/R^{2}}\\). Otherwise it slips and kinetic friction acts.\n" +
        "- Time down a slope of length l: \\(t = \\sqrt{2l/a} \\propto \\sqrt{1 + k^{2}/R^{2}}\\). A disc takes \\(\\sqrt{3/2}\\) times as long rolling as sliding on a smooth slope.\n" +
        "- A force F along the top of a body on rough level ground: \\(F + f = ma\\) and \\((F - f)R = I\\dfrac{a}{R}\\), so \\(a = \\dfrac{2F}{m(1 + k^{2}/R^{2})}\\) and \\(f = F\\dfrac{1 - k^{2}/R^{2}}{1 + k^{2}/R^{2}}\\), acting FORWARD. A solid sphere: \\(a = \\dfrac{10F}{7m}\\).",
      formula: {
        label: "Acceleration and friction when rolling down a slope",
        latex: "a = \\frac{g\\sin\\theta}{1 + k^{2}/R^{2}} \\qquad f = \\frac{mg\\sin\\theta\\,(k^{2}/R^{2})}{1 + k^{2}/R^{2}}",
      },
      authoredExample: {
        prompt:
          "A solid cylinder rolls without slipping down a 30° slope (g = 10 m/s²). Find its acceleration and the least coefficient of friction that lets it roll.",
        steps: [
          "\\(k^{2}/R^{2} = \\tfrac{1}{2}\\): \\(a = \\dfrac{10 \\times 0.5}{3/2} = \\dfrac{10}{3} \\approx 3.33\\) m/s².",
          "\\(f = \\dfrac{mg\\sin\\theta \\times \\frac{1}{2}}{3/2} = \\tfrac{1}{3}mg\\sin\\theta\\).",
          "Need \\(f \\le \\mu mg\\cos\\theta\\): \\(\\mu \\ge \\tfrac{1}{3}\\tan 30^{\\circ} = \\dfrac{1}{3\\sqrt{3}} \\approx 0.19\\).",
        ],
        answer: "\\(\\tfrac{10}{3}\\) m/s²; \\(\\mu \\ge 1/(3\\sqrt{3}) \\approx 0.19\\)",
      },
      selfCheckExample: {
        prompt:
          "A horizontal force of 12 N acts along the top of a 4 kg ring resting on rough level ground, and the ring rolls without slipping. Find its acceleration and the friction on it.",
        steps: [
          "For a ring \\(k^{2}/R^{2} = 1\\): \\(a = \\dfrac{2F}{m(1 + 1)} = \\dfrac{F}{m} = 3\\) m/s².",
          "\\(f = F\\dfrac{1 - 1}{1 + 1} = 0\\): the force at the top alone gives exactly the right spin.",
        ],
        answer: "3 m/s²; zero friction",
      },
      practiceSet: [
        { prompt: "Acceleration of a solid sphere rolling down a slope of angle θ?", answer: "\\(\\tfrac{5}{7}g\\sin\\theta\\)" },
        { prompt: "A disc goes down a slope: time rolling over time sliding on a smooth slope?", answer: "\\(\\sqrt{3/2}\\)" },
        { prompt: "A force F acts along the top of a solid sphere of mass m on rough ground. Its acceleration?", answer: "\\(\\dfrac{10F}{7m}\\)" },
        { prompt: "Friction on a ring of mass m rolling down a 30° slope?", answer: "\\(mg/4\\)", method: "\\(f = \\tfrac{1}{2}mg\\sin 30^{\\circ}\\)" },
      ],
      pyqExampleId: "003f95fe-e25b-48ec-bd09-da2d3b5e7625", // 2026: force at the top of a solid sphere and of a shell, ratio of accelerations
      traps: [
        {
          title: "A rolling body does not accelerate at g sin θ",
          body: "g sin θ is the frictionless sliding value. Rolling divides it by 1 + k²/R²: a solid sphere gets 5/7 of it, a ring only half.",
        },
        {
          title: "Friction pushes forward when the force is at the top",
          body: "A force at the top tends to spin the body faster than v = ωR allows, so friction acts forward, adding to F. Taking it backward gives an acceleration below F/m for a sphere, which is wrong.",
        },
        {
          title: "Needed friction is not μN",
          body: "Static friction takes whatever value rolling needs, up to μN. Put f = μmg cos θ only when asking for the least μ, or when the body slips.",
        },
      ],
    },
  ],
};
