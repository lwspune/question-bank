import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_LM_CIRCULAR_NOTE: SubtopicNote = {
  subtopicName: "Circular Motion",
  title: "Circular Motion",
  oneLineDefinition:
    "A body moving in a circle needs a net force toward the centre, mv²/r, supplied by a real force such as tension, friction or the normal reaction of a banked road.",
  whyItMatters:
    "Three NEET questions, all from 2024 or later. Two whirl a bob on a string in a horizontal circle and link the tension to the rotation speed (NEET 2024 and Re-NEET 2024), and one finds the banking angle at which a car's tyres wear least (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphlm-centripetal",
      name: "Centripetal force",
      intuition:
        "Even at a steady speed, a body going round a circle keeps changing direction, so it is accelerating toward the centre. Some real force must pull it inward: the string for a whirled stone, friction for a car on a level turn. Centripetal force is not a new kind of force, it is the job one of these forces does.",
      definition:
        "- Acceleration toward the centre: \\(a_c = \\dfrac{v^{2}}{r} = \\omega^{2}r\\).\n" +
        "- The net force toward the centre must be \\(F_c = \\dfrac{mv^{2}}{r} = m\\omega^{2}r\\).\n" +
        "- A bob whirled on a string in a horizontal circle: \\(T = m\\omega^{2}r\\). At a fixed radius \\(T \\propto \\omega^{2}\\), so \\(\\omega \\propto \\sqrt{T}\\).\n" +
        "- \\(\\omega = 2\\pi n\\), with n in revolutions per second (rpm divided by 60).\n" +
        "- The breaking tension sets the largest speed: \\(v_{\\max} = \\sqrt{\\dfrac{T_{\\max}\\,r}{m}}\\).\n" +
        "- If the string breaks, the body flies off along the tangent.",
      formula: {
        label: "Centripetal force",
        latex: "F_c = \\frac{mv^{2}}{r} = m\\omega^{2}r, \\qquad \\omega = 2\\pi n",
        symbols: [
          { symbol: "\\(\\omega\\)", meaning: "angular speed in rad/s" },
          { symbol: "\\(n\\)", meaning: "revolutions per second" },
        ],
      },
      authoredExample: {
        prompt:
          "A 0.5 kg stone on a 1 m string goes round a horizontal circle at 2 revolutions per second. Find the tension in the string.",
        steps: [
          "\\(\\omega = 2\\pi n = 2\\pi \\times 2 = 4\\pi\\) rad/s.",
          "\\(T = m\\omega^{2}r = 0.5 \\times 16\\pi^{2} \\times 1 = 8\\pi^{2} \\approx 79\\) N.",
        ],
        answer: "\\(8\\pi^{2}\\) N, about 79 N",
      },
      selfCheckExample: {
        prompt:
          "A string 1 m long breaks at 90 N. It whirls a 0.1 kg mass in a horizontal circle on a smooth table. What is the largest speed the mass can have?",
        steps: [
          "\\(T_{\\max} = \\dfrac{mv_{\\max}^{2}}{r}\\), so \\(v_{\\max} = \\sqrt{\\dfrac{T_{\\max}r}{m}}\\).",
          "\\(v_{\\max} = \\sqrt{\\dfrac{90 \\times 1}{0.1}} = \\sqrt{900} = 30\\) m/s.",
        ],
        answer: "30 m/s",
      },
      practiceSet: [
        { prompt: "Two equal masses go round circles of radius r and 2r at the same speed. What is the ratio of their centripetal forces?", answer: "2 : 1" },
        { prompt: "In which direction does a whirled stone fly off when its string breaks?", answer: "Along the tangent to the circle" },
        { prompt: "Convert 60 rpm to an angular speed in rad/s.", answer: "\\(2\\pi\\) rad/s" },
        { prompt: "What force supplies the centripetal force for a car taking a turn on a level road?", answer: "Friction between the tyres and the road" },
      ],
      pyqExampleId: "4475be09-abd5-44aa-96a0-ae40d97570c4",
      traps: [
        {
          title: "Tension goes as ω squared",
          body: "At a fixed radius \\(T \\propto \\omega^{2}\\). Doubling the rotation speed makes the tension four times; four times the tension only doubles the rotation speed.",
        },
        {
          title: "Centripetal force is not an extra force",
          body: "Do not draw \\(mv^{2}/r\\) as one more force on the body. It is the net of the real forces (tension, friction, normal reaction) toward the centre.",
        },
        {
          title: "Change rpm to rad/s before using numbers",
          body: "In \\(T = m\\omega^{2}r\\) with actual values, \\(\\omega\\) must be in rad/s: \\(\\omega = 2\\pi \\times \\dfrac{\\text{rpm}}{60}\\). Only a ratio of two speeds can stay in rpm.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphlm-banking",
      name: "Level and banked roads",
      intuition:
        "On a level road only friction can turn a car, so there is a top speed beyond which the car skids. Tilting the road helps: the road's push on the car now leans toward the centre and supplies part of the turning force. At one particular speed it supplies all of it, so the tyres need no sideways grip and wear the least.",
      definition:
        "- **Level road:** friction gives the centripetal force, \\(\\dfrac{mv^{2}}{r} \\le \\mu_s mg\\), so \\(v_{\\max} = \\sqrt{\\mu_s r g}\\), whatever the car's mass.\n" +
        "- **Banked road** at angle θ: the normal reaction's horizontal part points to the centre.\n" +
        "- **Optimum speed:** with no friction needed, \\(\\tan\\theta = \\dfrac{v_o^{2}}{rg}\\), that is \\(v_o = \\sqrt{rg\\tan\\theta}\\). At this speed tyre wear is least.\n" +
        "- With friction, the largest safe speed on a banked road is \\(v_{\\max} = \\sqrt{rg\\,\\dfrac{\\mu_s + \\tan\\theta}{1 - \\mu_s\\tan\\theta}}\\).",
      formula: {
        label: "Roads",
        latex: "v_{\\max} = \\sqrt{\\mu_s r g}, \\qquad \\tan\\theta = \\frac{v_o^{2}}{rg}, \\qquad v_{\\max} = \\sqrt{rg\\,\\frac{\\mu_s + \\tan\\theta}{1 - \\mu_s \\tan\\theta}}",
        symbols: [
          { symbol: "\\(v_o\\)", meaning: "optimum speed, needing no friction" },
          { symbol: "\\(\\theta\\)", meaning: "banking angle" },
        ],
      },
      authoredExample: {
        prompt:
          "A level circular road has radius 100 m, and \\(\\mu_s = 0.4\\) between the tyres and the road. What is the largest speed at which a car can take the turn (g = 10 m/s²)?",
        steps: [
          "\\(v_{\\max} = \\sqrt{\\mu_s r g} = \\sqrt{0.4 \\times 100 \\times 10}\\).",
          "\\(v_{\\max} = \\sqrt{400} = 20\\) m/s, which is 72 km/h.",
        ],
        answer: "20 m/s",
      },
      selfCheckExample: {
        prompt:
          "A road of radius 30 m is banked at 45°, with \\(\\mu_s = 0.5\\). What is the largest safe speed (g = 10 m/s²)?",
        steps: [
          "\\(\\tan 45^\\circ = 1\\), so \\(\\dfrac{\\mu_s + \\tan\\theta}{1 - \\mu_s\\tan\\theta} = \\dfrac{1.5}{0.5} = 3\\).",
          "\\(v_{\\max}^{2} = 30 \\times 10 \\times 3 = 900\\), so \\(v_{\\max} = 30\\) m/s.",
        ],
        answer: "30 m/s",
      },
      practiceSet: [
        { prompt: "Does the largest safe speed on a level turn depend on the mass of the car?", answer: "No" },
        { prompt: "How much friction is needed when a car takes a banked turn at its optimum speed?", answer: "None" },
        { prompt: "The coefficient of friction on a level turn is doubled. By what factor does the largest safe speed change?", answer: "\\(\\sqrt{2}\\) times" },
        { prompt: "On a banked road at the optimum speed, which force supplies the centripetal force?", answer: "The horizontal part of the normal reaction" },
      ],
      pyqExampleId: "259e5bfd-04eb-4470-9a00-3f737c4d3ed0",
      traps: [
        {
          title: "Least tyre wear means no friction",
          body: "The speed at which tyres wear least is the optimum speed, where the road's normal reaction alone turns the car and no friction is needed. Use \\(\\tan\\theta = v^{2}/(rg)\\) with no \\(\\mu\\) in it.",
        },
        {
          title: "The speed is squared",
          body: "In \\(\\tan\\theta = v^{2}/(rg)\\) the speed is squared. Twice the speed needs four times the value of \\(\\tan\\theta\\), not twice.",
        },
        {
          title: "The level-road limit has no mass in it",
          body: "\\(v_{\\max} = \\sqrt{\\mu_s r g}\\) for a heavy truck and a light car alike. Only the grip and the radius set it.",
        },
      ],
    },
  ],
};
