import type { SubtopicNote } from "@/app/notes/_types";

export const CIRCULAR_DYNAMICS_NOTE: SubtopicNote = {
  subtopicName: "Dynamics of Circular Motion — Banking, Conical Pendulum, Vertical Circle",
  title: "Dynamics of Circular Motion — Banking, Conical Pendulum and the Vertical Circle",
  oneLineDefinition:
    "Something must supply the centripetal force mv²/r — a string, a spring, friction, the normal reaction of a banked road or a funnel — and resolving that force into vertical and horizontal parts answers every question here.",
  whyItMatters:
    "17 PYQs, three HARD. Three shapes: what the centripetal force is and how it scales, a force at an angle (banked road, conical pendulum, a bob hanging in a turning car), " +
    "and the vertical circle, where speed and tension change from top to bottom.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-centripetal-force",
      name: "The Centripetal Force and What Supplies It",
      intuition:
        "Centripetal force is not a new force; it is the job some real force is doing — the tension in a string, a spring's pull, the weight of a hanging mass fed through a hole. Write that force equal to mv²/r and solve.",
      definition:
        "- \\(F = \\dfrac{mv^2}{r} = m\\omega^2 r\\). Scaling: \\(m, v, r\\) each up 20% ⇒ \\(F \\times \\dfrac{1.2 \\times 1.44}{1.2} = 1.44F\\).\n" +
        "- Same force, same radius, masses \\(m\\) and \\(3m\\): speeds in ratio \\(\\sqrt{3} : 1\\).\n" +
        "- Spring of natural length \\(L\\): \\(kx = m\\omega^2(L + x)\\).\n" +
        "- Mass \\(m\\) circling on a table, string through a hole to a hanging \\(M\\): \\(Mg = m\\omega^2 L\\), \\(f = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{Mg}{mL}}\\).\n" +
        "- String of length \\(l\\) swept round a vertical axis (conical pendulum): the tension alone gives \\(T = ml\\omega^2\\), whatever the angle.",
      formula: {
        label: "Centripetal force",
        latex: "F = \\frac{mv^2}{r} = m\\omega^2 r",
      },
      authoredExample: {
        prompt: "A 0.5 kg mass moves at 4 m/s on a 2 m circle. Centripetal force? If the mass is doubled, the speed halved and the radius halved, what is it then?",
        steps: [
          "\\(F = \\dfrac{0.5 \\times 16}{2} = 4\\) N.",
          "\\(F' = F \\times \\dfrac{2 \\times \\frac{1}{4}}{\\frac{1}{2}} = F\\) — still 4 N.",
        ],
        answer: "4 N; unchanged",
      },
      selfCheckExample: {
        prompt: "A 0.2 kg ball on a 0.5 m string is swung round in a horizontal circle (ignore gravity) with tension 10 N. Angular velocity?",
        steps: ["\\(T = m\\omega^2 l \\Rightarrow \\omega = \\sqrt{\\dfrac{10}{0.2 \\times 0.5}} = 10\\) rad/s."],
        answer: "10 rad/s",
      },
      practiceSet: [
        { prompt: "Same centripetal force and radius; masses m and 3m. Speed of m in terms of the heavier one's?", answer: "\\(\\sqrt{3}\\) times" },
        { prompt: "m, v and r each rise 20%. Change in the force needed?", answer: "+44%" },
        { prompt: "Tension in a conical pendulum's string of length L at angular frequency ω?", answer: "\\(mL\\omega^2\\)" },
      ],
      pyqExampleId: "7b85f7ca-81a4-4b93-8645-3861142cc580",
      traps: [
        {
          title: "Adding percentages",
          body:
            "Scaling is multiplicative: \\(1.2 \\times 1.2^2 \\div 1.2 = 1.44\\), a 44% rise. Adding the three 20%s is how 12% and 14% get into the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-banking-conical",
      name: "Forces at an Angle: Banked Roads, Conical Pendulums and Funnels",
      intuition:
        "Whenever a single force is tilted — the normal reaction of a banked road, the string of a conical pendulum, a funnel wall — its vertical part holds the weight and its horizontal part turns the body. Divide one by the other and tan θ = v²/rg falls out every time.",
      definition:
        "- Banked road with no friction needed: \\(\\tan\\theta = \\dfrac{v^2}{rg}\\). Outer edge raised \\(h\\) over width \\(b\\): \\(h = \\dfrac{v^2b}{rg}\\).\n" +
        "- Same banking and friction: \\(v_{\\max} \\propto \\sqrt{r}\\); 20% more speed needs 44% more radius.\n" +
        "- Bob hanging in a car rounding a curve: string at \\(\\tan^{-1}\\dfrac{v^2}{rg}\\) to the vertical.\n" +
        "- Conical pendulum of length \\(l\\) at angle \\(\\theta\\): \\(\\omega = \\sqrt{\\dfrac{g}{l\\cos\\theta}}\\).\n" +
        "- Smooth funnel: the circle of speed \\(V\\) sits a height \\(h = \\dfrac{V^2}{g}\\) above the vertex.\n" +
        "- Humped (convex) road: \\(N = mg - \\dfrac{mv^2}{r}\\); dipped (concave): \\(N = mg + \\dfrac{mv^2}{r}\\), the largest.",
      formula: {
        label: "A tilted force turning a body",
        latex: "\\tan\\theta = \\frac{v^2}{rg}",
      },
      authoredExample: {
        prompt: "A road of radius 50 m is to be banked for 10 m/s. Banking angle, and how high the outer edge of an 8 m wide road must be?",
        steps: ["\\(\\tan\\theta = \\dfrac{100}{50 \\times 10} = 0.2\\).", "\\(h = b\\tan\\theta = 8 \\times 0.2 = 1.6\\) m."],
        answer: "\\(\\tan^{-1}0.2\\); 1.6 m",
      },
      selfCheckExample: {
        prompt: "To raise a banked road's safe speed by 10% without changing the angle, by what percentage must the radius grow?",
        steps: ["\\(r \\propto v^2\\): \\(1.1^2 = 1.21\\)."],
        answer: "21%",
      },
      practiceSet: [
        { prompt: "Conical pendulum, l = 1 m, string at 60° to the vertical (g = 10). ω?", answer: "\\(\\sqrt{20} \\approx 4.5\\) rad/s" },
        { prompt: "On which road is the normal reaction largest: flat, convex or concave?", answer: "Concave" },
        { prompt: "Particle circling inside a smooth funnel at speed V: height above the vertex?", answer: "\\(\\dfrac{V^2}{g}\\)" },
      ],
      pyqExampleId: "10f6557e-79da-418b-a749-9a14d3fbab76",
      traps: [
        {
          title: "Asking for the new radius, answering the increase",
          body:
            "'The increase in the radius of curvature' for 20% more speed on a 20 m curve is 8.8 m; the new radius, 28.8 m, sits beside it in the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-vertical-circle",
      name: "The Vertical Circle",
      intuition:
        "In a vertical circle gravity helps at the top and fights at the bottom, so the tension is least at the top and greatest at the bottom, and energy conservation links the speeds: v²(bottom) = v²(top) + 4gr. To just complete the loop the string must just stay taut at the top.",
      definition:
        "- Top: \\(T_{\\text{top}} = \\dfrac{mv_t^2}{r} - mg\\); bottom: \\(T_{\\text{bot}} = \\dfrac{mv_b^2}{r} + mg\\); \\(v_b^2 = v_t^2 + 4gr\\).\n" +
        "- So \\(T_{\\text{bot}} - T_{\\text{top}} = 6mg\\), always.\n" +
        "- Just completing the loop: \\(v_t = \\sqrt{gr}\\), \\(v_b = \\sqrt{5gr}\\), and the apparent weight at the bottom is \\(6mg\\).\n" +
        "- A thread that bears \\(T_{\\max}\\): the stone's speed is limited at the BOTTOM, \\(T_{\\max} = mg + m\\omega^2 r\\).\n" +
        "- With gravity the only force doing work, the total mechanical energy is the same at every point.",
      formula: {
        label: "Vertical circle",
        latex: "T_{\\text{bottom}} - T_{\\text{top}} = 6mg, \\qquad v_{\\text{top,min}} = \\sqrt{gr}, \\quad v_{\\text{bottom,min}} = \\sqrt{5gr}",
      },
      authoredExample: {
        prompt: "A stone on a 0.4 m string is whirled in a vertical circle. Least speeds at the top and at the bottom for it to complete the circle? (g = 10)",
        steps: ["\\(v_t = \\sqrt{gr} = \\sqrt{4} = 2\\) m/s.", "\\(v_b = \\sqrt{5gr} = \\sqrt{20} \\approx 4.47\\) m/s."],
        answer: "2 m/s; about 4.5 m/s",
      },
      selfCheckExample: {
        prompt: "A 0.5 kg stone moves in a vertical circle. By how much does the tension at the bottom exceed that at the top? (g = 10)",
        steps: ["Always \\(6mg = 6 \\times 0.5 \\times 10\\)."],
        answer: "30 N",
      },
      practiceSet: [
        { prompt: "Apparent weight at the lowest point for a body just completing the loop?", answer: "6mg" },
        { prompt: "Is total mechanical energy conserved round a vertical circle under gravity?", answer: "Yes" },
        { prompt: "\\(T_{\\max} : T_{\\min} = 3\\) on a string of length L. \\(v_{\\text{top}}^2\\)?", answer: "4gL" },
      ],
      pyqExampleId: "32f29b3f-157d-43dd-aab9-b79b11b333e7",
      traps: [
        {
          title: "Taking the bottom tension as 5mg",
          body:
            "At the bottom \\(T = mg + \\frac{mv^2}{r}\\) and \\(v^2 = 5gr\\) when just looping, so \\(T = 6mg\\). The \\(5mg\\) forgets the weight.",
        },
      ],
    },
  ],
  related: [
    { label: "Kinematics of Circular Motion — ω, v and a_c", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-circular-kinematics" },
    { label: "Moment of Inertia — when the body itself turns", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-moment-of-inertia" },
  ],
};
