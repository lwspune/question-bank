import type { SubtopicNote } from "@/app/notes/_types";

export const ROLLING_NOTE: SubtopicNote = {
  subtopicName: "Rotational Kinetic Energy and Rolling Motion",
  title: "Rotational Kinetic Energy and Rolling Motion",
  oneLineDefinition:
    "A spinning body stores ½Iω²; a rolling one stores that plus ½mv², tied together by v = Rω, so the factor 1 + k²/R² decides how fast each shape rolls, how far it climbs and how its energy splits.",
  whyItMatters:
    "24 PYQs, two HARD. Three shapes: rotational kinetic energy and what a swinging or falling rod turns it into, the split of a rolling body's energy between translation and rotation, " +
    "and the race down an incline — acceleration, speed at the bottom, distance up a ramp. One number, k²/R², carries all three.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-rotational-ke",
      name: "Rotational Kinetic Energy, and Rods That Swing or Fall",
      intuition:
        "½Iω² is the rotational twin of ½mv². A rod pivoted at one end trades that energy with the height of its centre of mass — which sits at its middle, so it rises or falls only half the rod's length.",
      definition:
        "- \\(K_{\\text{rot}} = \\dfrac{1}{2}I\\omega^2\\); \\(\\omega\\) up 20% ⇒ \\(K\\) up 44%.\n" +
        "- Sphere and cylinder of equal M, R, the cylinder at twice the angular speed: \\(\\dfrac{K_s}{K_c} = \\dfrac{\\frac{2}{5}}{\\frac{1}{2} \\times 4} = \\dfrac{1}{5}\\).\n" +
        "- Rod pivoted at an end with max angular speed \\(\\omega\\): \\(\\dfrac{1}{2}\\cdot\\dfrac{ML^2}{3}\\omega^2 = Mgh \\Rightarrow h = \\dfrac{L^2\\omega^2}{6g}\\).\n" +
        "- Rod standing on its hinged end, falling flat: \\(mg\\dfrac{L}{2} = \\dfrac{1}{2}\\cdot\\dfrac{mL^2}{3}\\omega^2 \\Rightarrow \\omega = \\sqrt{\\dfrac{3g}{L}}\\).",
      formula: {
        label: "Rotational kinetic energy",
        latex: "K_{\\text{rot}} = \\tfrac{1}{2}I\\omega^2",
      },
      authoredExample: {
        prompt: "A flywheel of I = 4 kg m² turns at 10 rad/s. Its kinetic energy? By what percentage does it rise if ω rises 10%?",
        steps: ["\\(K = \\dfrac{1}{2} \\times 4 \\times 100 = 200\\) J.", "\\(1.1^2 = 1.21\\): up 21%."],
        answer: "200 J; 21%",
      },
      selfCheckExample: {
        prompt: "A 1.2 m rod stands on its hinged lower end and falls to the ground. Its angular speed on landing? (g = 10)",
        steps: ["\\(\\omega = \\sqrt{\\dfrac{3g}{L}} = \\sqrt{\\dfrac{30}{1.2}} = 5\\) rad/s."],
        answer: "5 rad/s",
      },
      practiceSet: [
        { prompt: "A rod pivoted at an end passes the vertical at ω. Its kinetic energy then?", answer: "\\(\\dfrac{mL^2\\omega^2}{6}\\)" },
        { prompt: "Sphere at ω/2, cylinder at ω, same M and R. Ratio K_sphere : K_cylinder?", answer: "1 : 5" },
      ],
      pyqExampleId: "b0d335b2-6912-4848-aac1-a36d365b10c8",
      traps: [
        {
          title: "Raising the centre of mass by the whole length",
          body:
            "A rod's weight acts at its middle, so falling from upright lowers it by \\(\\frac{L}{2}\\), not \\(L\\). Using \\(L\\) gives \\(\\sqrt{6g/L}\\), a printed distractor.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-rolling-energy",
      name: "How a Rolling Body's Energy Splits",
      intuition:
        "A body rolling without slipping moves and spins at once, with v = Rω. Its total energy is ½mv²(1 + k²/R²). A ring puts as much into spinning as into moving; a solid sphere puts only 2 parts in 7 into spinning.",
      definition:
        "- \\(K = \\dfrac{1}{2}mv^2\\left(1 + \\dfrac{k^2}{R^2}\\right)\\); \\(\\dfrac{k^2}{R^2}\\): ring 1, disc/cylinder \\(\\dfrac{1}{2}\\), solid sphere \\(\\dfrac{2}{5}\\), shell \\(\\dfrac{2}{3}\\).\n" +
        "- Rotational share \\(= \\dfrac{k^2/R^2}{1 + k^2/R^2}\\): ring \\(\\dfrac{1}{2}\\), disc \\(\\dfrac{1}{3}\\), sphere \\(\\dfrac{2}{7}\\) — so total : rotational = \\(\\dfrac{7}{2}\\) for a sphere.\n" +
        "- Ring and disc of equal mass at the same speed: \\(K_{\\text{disc}} = \\dfrac{3}{4}K_{\\text{ring}}\\).\n" +
        "- A string unwinding from a wheel: the falling mass's lost energy feeds both its own motion and the wheel's spin.",
      formula: {
        label: "Rolling energy",
        latex: "K = \\tfrac{1}{2}mv^2\\left(1 + \\frac{k^2}{R^2}\\right)",
      },
      authoredExample: {
        prompt: "A 3 kg disc rolls at 2 m/s. Its total kinetic energy, and how much of it is rotational?",
        steps: ["\\(K = \\dfrac{1}{2} \\times 3 \\times 4 \\times \\dfrac{3}{2} = 9\\) J.", "Rotational share \\(\\dfrac{1}{3}\\): 3 J."],
        answer: "9 J; 3 J",
      },
      selfCheckExample: {
        prompt: "What fraction of a rolling ring's kinetic energy is rotational?",
        steps: ["\\(\\dfrac{k^2}{R^2} = 1\\): \\(\\dfrac{1}{1 + 1}\\)."],
        answer: "Half",
      },
      practiceSet: [
        { prompt: "A cylinder rolls down a height h. Its rotational KE at the bottom?", answer: "\\(\\dfrac{mgh}{3}\\)" },
        { prompt: "Rolling solid sphere: total KE over rotational KE?", answer: "\\(\\dfrac{7}{2}\\)" },
      ],
      pyqExampleId: "b48425b7-7a6b-4f04-8bb3-01f1378d4677",
      traps: [
        {
          title: "Forgetting the rotational part",
          body:
            "A rolling body at speed v has MORE than \\(\\frac{1}{2}mv^2\\). Setting \\(mgh = \\frac{1}{2}mv^2\\) for a rolling body is the sliding answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-rolling-incline",
      name: "Rolling Down (and Up) an Incline",
      intuition:
        "Rolling down a slope, some of the lost height goes into spin, so a rolling body is slower than a sliding one — and the more of its mass is at the rim, the slower. The solid sphere always wins the race, then the disc, then the ring.",
      definition:
        "- \\(a = \\dfrac{g\\sin\\theta}{1 + k^2/R^2}\\): solid sphere \\(\\dfrac{5}{7}g\\sin\\theta\\), disc \\(\\dfrac{2}{3}g\\sin\\theta\\), ring \\(\\dfrac{1}{2}g\\sin\\theta\\). On 30°, a sphere: \\(\\dfrac{5g}{14}\\).\n" +
        "- \\(v = \\sqrt{\\dfrac{2gh}{1 + k^2/R^2}}\\): sphere \\(\\sqrt{\\dfrac{10gh}{7}}\\), disc \\(\\sqrt{\\dfrac{4gh}{3}}\\), ring \\(\\sqrt{gh}\\).\n" +
        "- Compared with sliding (\\(V = \\sqrt{2gh}\\)): disc \\(V\\sqrt{\\dfrac{2}{3}}\\), ring \\(\\dfrac{V}{\\sqrt{2}}\\).\n" +
        "- Rolling UP a ramp from speed \\(v\\): \\(\\dfrac{1}{2}mv^2\\left(1 + \\dfrac{k^2}{R^2}\\right) = mgs\\sin\\theta\\).\n" +
        "- Cylinder to sphere acceleration ratio: \\(\\dfrac{2/3}{5/7} = \\dfrac{14}{15}\\).",
      formula: {
        label: "Rolling on an incline",
        latex: "a = \\frac{g\\sin\\theta}{1 + k^2/R^2}, \\qquad v = \\sqrt{\\frac{2gh}{1 + k^2/R^2}}",
      },
      authoredExample: {
        prompt: "A ring rolls from rest down a 30° incline of height 1.8 m. Its acceleration and speed at the bottom? (g = 10)",
        steps: [
          "\\(a = \\dfrac{10 \\times 0.5}{2} = 2.5\\) m/s².",
          "\\(v = \\sqrt{\\dfrac{2 \\times 10 \\times 1.8}{2}} = \\sqrt{18} \\approx 4.2\\) m/s.",
        ],
        answer: "2.5 m/s²; about 4.2 m/s",
      },
      selfCheckExample: {
        prompt: "A solid disc and a solid sphere roll down the same incline from rest. Which reaches the bottom first?",
        steps: ["The sphere has the smaller \\(\\dfrac{k^2}{R^2}\\) (2/5 against 1/2), so the larger acceleration."],
        answer: "The sphere",
      },
      practiceSet: [
        { prompt: "Acceleration of a disc rolling down a 30° incline?", answer: "\\(\\dfrac{g}{3}\\)" },
        { prompt: "A body slides down a smooth incline to reach speed V. A ring rolling down it reaches?", answer: "\\(\\dfrac{V}{\\sqrt{2}}\\)" },
        { prompt: "Speed of a solid sphere at the bottom of height h, rolling?", answer: "\\(\\sqrt{\\dfrac{10gh}{7}}\\)" },
      ],
      pyqExampleId: "6fee93c1-79fd-4bc4-8379-2b704f332ab0",
      traps: [
        {
          title: "Using sin θ twice, or not at all",
          body:
            "\\(a\\) carries \\(\\sin\\theta\\); \\(v\\) at the bottom depends only on the height \\(h\\). '30°, solid sphere' is \\(\\frac{5g}{14}\\), and \\(\\frac{5g}{7}\\) is what you get by forgetting the \\(\\sin 30^\\circ\\).",
        },
      ],
    },
  ],
  related: [
    { label: "Torque, Angular Momentum and Its Conservation", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-angular-momentum" },
    { label: "Moment of Inertia — the k²/R² values used here", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-moment-of-inertia" },
  ],
};
