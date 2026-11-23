import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_RD_ROLLING_NOTE: SubtopicNote = {
  subtopicName: "Rolling Motion",
  title: "Rolling Motion",
  oneLineDefinition:
    "A body rolling without slipping both moves forward and spins, so its kinetic energy has two parts, and the share in each decides how fast it rolls down an incline.",
  whyItMatters:
    "6 questions. Twice the board asked about rolling: derive the total kinetic energy of a rolling body (2016) and find it for a solid sphere (2017). The textbook adds the split between translational and rotational energy, rolling down an incline and naming the shape of a body from its speed.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscprd-rolling-ke",
      name: "Kinetic energy of a rolling body",
      intuition:
        "A rolling wheel does two things at once: its centre moves forward, and it spins about that centre. So it carries two kinetic energies. How much goes into the spin depends only on the shape, through the number K²/R².",
      definition:
        "- Rolling without slipping: the point of contact is at rest at each instant, so \\(\\omega = \\dfrac{v}{R}\\), where v is the speed of the centre of mass.\n" +
        "- Translational kinetic energy: \\(\\tfrac{1}{2}Mv^2\\).\n" +
        "- Rotational kinetic energy: \\(\\tfrac{1}{2}I\\omega^2 = \\tfrac{1}{2}MK^2\\dfrac{v^2}{R^2}\\).\n" +
        "- Total: \\(E = \\tfrac{1}{2}Mv^2 + \\tfrac{1}{2}Mv^2\\dfrac{K^2}{R^2} = \\tfrac{1}{2}Mv^2\\left(1 + \\dfrac{K^2}{R^2}\\right)\\).\n" +
        "- Values of \\(\\dfrac{K^2}{R^2}\\): ring or thin walled hollow cylinder 1; disc or solid cylinder \\(\\tfrac{1}{2}\\); solid sphere \\(\\tfrac{2}{5}\\); hollow sphere \\(\\tfrac{2}{3}\\).\n" +
        "- Rotational : translational : total \\(= \\dfrac{K^2}{R^2} : 1 : \\left(1 + \\dfrac{K^2}{R^2}\\right)\\).",
      formula: {
        label: "Total kinetic energy of a rolling body",
        latex: "E = \\tfrac{1}{2}Mv^2\\left(1 + \\frac{K^2}{R^2}\\right)",
      },
      authoredExample: {
        prompt:
          "A uniform disc of mass 2 kg rolls without slipping along a floor at 3 m/s. Find its translational, rotational and total kinetic energy.",
        steps: [
          "Given: \\(M = 2\\) kg, \\(v = 3\\) m/s; for a disc \\(\\dfrac{K^2}{R^2} = \\dfrac{1}{2}\\).",
          "Formula: translational \\(\\tfrac{1}{2}Mv^2\\); rotational \\(\\tfrac{1}{2}Mv^2\\dfrac{K^2}{R^2}\\).",
          "Substitution: translational \\(= \\tfrac{1}{2} \\times 2 \\times 9 = 9\\) J; rotational \\(= 9 \\times \\tfrac{1}{2} = 4.5\\) J.",
          "Total \\(= 9 + 4.5 = 13.5\\) J.",
        ],
        answer: "9 J, 4.5 J and 13.5 J",
      },
      selfCheckExample: {
        prompt: "For a solid sphere rolling without slipping, what fraction of its total kinetic energy is rotational?",
        steps: ["\\(\\dfrac{K^2/R^2}{1 + K^2/R^2} = \\dfrac{2/5}{7/5}\\)."],
        answer: "2/7",
      },
      practiceSet: [
        { prompt: "A ring of mass 0.5 kg rolls without slipping at 2 m/s. Find its total kinetic energy.", answer: "2 J" },
        { prompt: "For a rolling disc, what is the ratio of rotational to translational kinetic energy?", answer: "1 : 2" },
        { prompt: "For a body rolling without slipping, what is the speed of the point in contact with the ground?", answer: "Zero at that instant" },
      ],
      pyqExampleId: "697d288d-6506-43f9-a048-132749532185",
      traps: [
        {
          title: "Leaving out the rotational part",
          body: "A rolling body's kinetic energy is more than \\(\\tfrac{1}{2}Mv^2\\). For a ring it is twice that.",
        },
        {
          title: "The wrong sphere",
          body: "A solid sphere has \\(\\dfrac{K^2}{R^2} = \\dfrac{2}{5}\\); \\(\\dfrac{2}{3}\\) is a hollow sphere. Read which one the question means.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-rolling-incline",
      name: "Rolling down an incline",
      intuition:
        "Rolling down a slope, a body turns its lost height into kinetic energy, but part of that energy goes into spinning. The more a shape puts into spin, the slower it rolls. So in a race down a slope a solid sphere beats a disc, and a disc beats a ring.",
      definition:
        "- Without slipping, friction does no work, so mechanical energy is conserved: \\(Mgh = \\tfrac{1}{2}Mv^2\\left(1 + \\dfrac{K^2}{R^2}\\right)\\).\n" +
        "- Speed after falling a height h: \\(v = \\sqrt{\\dfrac{2gh}{1 + K^2/R^2}}\\).\n" +
        "- With \\(h = s\\sin\\theta\\) and \\(v^2 = 2as\\): \\(a = \\dfrac{g\\sin\\theta}{1 + K^2/R^2}\\).\n" +
        "- Neither depends on the mass or the radius, only on the shape. Order of arrival from the same height: solid sphere, then disc (or solid cylinder), then hollow sphere, then ring.",
      formula: {
        label: "Rolling down an incline",
        latex: "a = \\frac{g\\sin\\theta}{1 + K^2/R^2}, \\qquad v = \\sqrt{\\frac{2gh}{1 + K^2/R^2}}",
      },
      authoredExample: {
        prompt:
          "A solid cylinder rolls without slipping from rest down an incline, falling through a vertical height of 1.5 m. Find its speed at the bottom. (g = 10 m/s²)",
        steps: [
          "Given: \\(h = 1.5\\) m, \\(g = 10\\) m/s²; for a solid cylinder \\(\\dfrac{K^2}{R^2} = \\dfrac{1}{2}\\).",
          "Formula: \\(v = \\sqrt{\\dfrac{2gh}{1 + K^2/R^2}}\\).",
          "Substitution: \\(v = \\sqrt{\\dfrac{2 \\times 10 \\times 1.5}{1.5}} = \\sqrt{20} = 4.47\\) m/s.",
        ],
        answer: "4.47 m/s",
      },
      selfCheckExample: {
        prompt: "A ring rolls without slipping down a plane inclined at 30°. Find its acceleration. (g = 10 m/s²)",
        steps: ["For a ring \\(\\dfrac{K^2}{R^2} = 1\\).", "\\(a = \\dfrac{10 \\times 0.5}{1 + 1} = 2.5\\) m/s²."],
        answer: "2.5 m/s²",
      },
      practiceSet: [
        { prompt: "A solid sphere, a disc and a ring are released together from rest at the top of an incline and roll without slipping. Which reaches the bottom first?", answer: "The solid sphere" },
        { prompt: "Does the speed of a rolling body at the foot of an incline depend on its mass?", answer: "No" },
        { prompt: "Find the acceleration of a solid sphere rolling without slipping down an incline of 30°. (g = 10 m/s²)", answer: "\\(\\dfrac{5}{1.4} = 3.57\\) m/s²" },
      ],
      pyqExampleId: "470e8db8-0812-4949-b507-1cd8077b45e9",
      traps: [
        {
          title: "Using g sin θ",
          body: "\\(a = g\\sin\\theta\\) is for a body sliding down a frictionless slope. A rolling body has the smaller value \\(\\dfrac{g\\sin\\theta}{1 + K^2/R^2}\\).",
        },
        {
          title: "Length in place of height",
          body: "h in the energy equation is the vertical height fallen. For a distance s along the incline, \\(h = s\\sin\\theta\\).",
        },
      ],
    },
  ],
};
