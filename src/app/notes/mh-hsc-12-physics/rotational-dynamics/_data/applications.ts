import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_RD_APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "Applications of Uniform Circular Motion",
  title: "Level Roads, Well of Death, Banked Roads and the Conical Pendulum",
  oneLineDefinition:
    "Which real force supplies the centripetal force on a level road, in a well of death, on a banked road and in a conical pendulum, and the speed limits that follow.",
  whyItMatters:
    "25 questions. Twelve were set in board papers from 2016 to 2026, four of them in 2026 alone. The board asks you to derive the maximum speed on a level road (2024, and twice in 2026), derive the minimum speed in a well of death (2024) and state the formula for the angle of banking (2025). It also sets numericals on a banking angle (2017, 2024), a coefficient of friction (2016, 2018), the minimum speed in a well (2026) and the period of a conical pendulum (2026), and asked in 2023 whether a vehicle can turn safely on a road with no friction.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscprd-level-road",
      name: "A vehicle on a level road",
      intuition:
        "On a flat road, the only thing that can pull a car towards the centre of a turn is friction between the tyres and the road. Friction has an upper limit, so there is a top speed: go faster and the car skids outwards. A coin on a turning turntable is the same problem.",
      definition:
        "- Forces on the vehicle: weight \\(mg\\) down, normal reaction \\(N\\) up, static friction \\(f_s\\) towards the centre.\n" +
        "- No vertical motion, so \\(N = mg\\).\n" +
        "- Friction supplies the centripetal force: \\(f_s = \\dfrac{mv^2}{r}\\).\n" +
        "- Friction cannot exceed its limiting value \\(\\mu_s N = \\mu_s mg\\), so \\(\\dfrac{mv^2}{r} \\le \\mu_s mg\\).\n" +
        "- At the limit, \\(v_{max} = \\sqrt{\\mu_s r g}\\). The mass cancels, so the safe speed does not depend on the mass of the vehicle.\n" +
        "- A two wheeler rider on such a road leans inwards at an angle \\(\\theta\\) to the vertical with \\(\\tan\\theta = \\dfrac{v^2}{rg}\\), so that the resultant of the normal reaction and friction passes through the centre of mass.",
      formula: {
        label: "Maximum safe speed on a level road",
        latex: "v_{max} = \\sqrt{\\mu_s r g}",
        symbols: [
          { symbol: "\\(\\mu_s\\)", meaning: "coefficient of static friction between tyres and road" },
          { symbol: "\\(r\\)", meaning: "radius of the turn" },
        ],
      },
      authoredExample: {
        prompt:
          "A car takes a turn of radius 50 m on a level road. The coefficient of static friction between the tyres and the road is 0.5. Find the maximum speed at which it can take the turn safely. (g = 9.8 m/s²)",
        steps: [
          "Given: \\(r = 50\\) m, \\(\\mu_s = 0.5\\), \\(g = 9.8\\) m/s².",
          "Formula: \\(v_{max} = \\sqrt{\\mu_s r g}\\).",
          "Substitution: \\(v_{max} = \\sqrt{0.5 \\times 50 \\times 9.8} = \\sqrt{245} = 15.65\\) m/s.",
          "In km/h: \\(15.65 \\times 3.6 = 56.3\\) km/h.",
        ],
        answer: "15.65 m/s (about 56.3 km/h)",
      },
      selfCheckExample: {
        prompt:
          "A coin placed 10 cm from the centre of a turntable just begins to slip when the table turns at 1 rev/s. Find the coefficient of static friction. (Take g = π² m/s²)",
        steps: [
          "At slipping, \\(mr\\omega^2 = \\mu_s mg\\), so \\(\\mu_s = \\dfrac{r\\omega^2}{g}\\).",
          "\\(\\omega = 2\\pi \\times 1 = 2\\pi\\) rad/s, so \\(\\mu_s = \\dfrac{0.1 \\times 4\\pi^2}{\\pi^2} = 0.4\\).",
        ],
        answer: "0.4",
      },
      practiceSet: [
        { prompt: "Does the maximum safe speed on a level road depend on the mass of the vehicle?", answer: "No" },
        { prompt: "On a level road with a coefficient of static friction of 0.4, what is the largest safe speed for a turn of radius 40 m? (g = 10 m/s²)", answer: "\\(\\sqrt{160} = 12.65\\) m/s" },
        { prompt: "A cyclist takes a turn of radius 10 m at 10 m/s on a level road. At what angle to the vertical must she lean? (g = 10 m/s²)", answer: "45°, since \\(\\tan\\theta = 1\\)" },
      ],
      pyqExampleId: "1523224d-492d-4032-8671-37b828a48fd0",
      traps: [
        {
          title: "Skipping the inequality",
          body: "Friction can be less than \\(\\mu_s N\\). Write \\(\\dfrac{mv^2}{r} \\le \\mu_s mg\\) first, then say the maximum speed is reached when friction is at its limit. That line is what makes it a derivation.",
        },
        {
          title: "Using the turntable's radius",
          body: "For a coin on a turntable, r is the coin's distance from the axis. The size of the turntable plays no part.",
        },
        {
          title: "Speed left in km/h",
          body: "Convert to m/s before substituting: multiply km/h by \\(\\dfrac{5}{18}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-well-of-death",
      name: "The well of death",
      intuition:
        "The rider runs round the inside of a vertical wall. The wall pushes inwards, and that normal reaction is the centripetal force. Friction from the wall acts upwards and holds up the weight. Ride faster and the wall pushes harder, so more friction is available. Below a certain speed there is not enough, and the rider slides down.",
      definition:
        "- The normal reaction is horizontal, towards the axis, and supplies the centripetal force: \\(N = \\dfrac{mv^2}{r}\\).\n" +
        "- Static friction is vertical, upwards, and balances the weight: \\(f_s = mg\\).\n" +
        "- Since \\(f_s \\le \\mu_s N\\): \\(mg \\le \\mu_s\\dfrac{mv^2}{r}\\).\n" +
        "- So \\(v_{min} = \\sqrt{\\dfrac{rg}{\\mu_s}}\\), independent of the mass. The minimum frequency is \\(n_{min} = \\dfrac{v_{min}}{2\\pi r}\\).\n" +
        "- Above this speed the friction actually acting is still \\(mg\\); only the limiting friction \\(\\mu_s N\\) grows.",
      formula: {
        label: "Minimum speed in a well of death",
        latex: "v_{min} = \\sqrt{\\frac{rg}{\\mu_s}}",
      },
      authoredExample: {
        prompt:
          "A motorcyclist rides horizontal circles at 12 m/s inside a vertical cylindrical well of radius 7.2 m. Find the least coefficient of static friction between the tyres and the wall that keeps the rider from sliding down. (g = 10 m/s²)",
        steps: [
          "Given: \\(v = 12\\) m/s, \\(r = 7.2\\) m, \\(g = 10\\) m/s².",
          "Formula: from \\(v_{min} = \\sqrt{\\dfrac{rg}{\\mu_s}}\\), \\(\\mu_s = \\dfrac{rg}{v^2}\\).",
          "Substitution: \\(\\mu_s = \\dfrac{7.2 \\times 10}{12^2} = \\dfrac{72}{144} = 0.5\\).",
        ],
        answer: "0.5",
      },
      selfCheckExample: {
        prompt:
          "A rider in a well of death doubles her speed. By what factor does the normal reaction of the wall change, and what happens to the friction actually acting on her?",
        steps: [
          "\\(N = \\dfrac{mv^2}{r}\\), so doubling v makes N four times as large.",
          "The friction acting still only has to hold up the weight, so it stays equal to \\(mg\\).",
        ],
        answer: "Normal reaction becomes 4 times; friction stays equal to mg",
      },
      practiceSet: [
        { prompt: "In a well of death, which force supplies the centripetal force?", answer: "The normal reaction of the wall" },
        { prompt: "In a well of death, which force holds the rider up against gravity?", answer: "Static friction, acting upwards" },
        { prompt: "Does the minimum speed in a well of death depend on the mass of the rider?", answer: "No" },
      ],
      pyqExampleId: "6cda5733-e28c-46ab-a4b4-35f21d9f5471",
      traps: [
        {
          title: "Swapping the roles of N and friction",
          body: "In the well, the normal reaction is the centripetal force and friction balances the weight. On a level road it is the other way round. Draw the forces before writing equations.",
        },
        {
          title: "Thinking friction grows with speed",
          body: "Above the minimum speed the friction acting stays equal to \\(mg\\). Only the largest friction possible, \\(\\mu_s N\\), increases with speed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-banking",
      name: "Banked roads",
      intuition:
        "Tilt the road so its outer edge is higher than its inner edge. Now the normal reaction leans towards the centre of the turn, and its horizontal part supplies the centripetal force. At one speed, the optimum speed, no friction is needed at all. Friction then widens the range of safe speeds on both sides.",
      definition:
        "- **Why roads are banked:** on a level road the turn depends on friction alone, which is limited and falls sharply on a wet or oily road. Banking lets the normal reaction do the job.\n" +
        "- Without friction: \\(N\\cos\\theta = mg\\) and \\(N\\sin\\theta = \\dfrac{mv^2}{r}\\).\n" +
        "- Dividing: \\(\\tan\\theta = \\dfrac{v^2}{rg}\\). The angle of banking does not depend on the mass of the vehicle.\n" +
        "- At the optimum (safest) speed \\(v = \\sqrt{rg\\tan\\theta}\\) no friction is needed. On a frictionless banked road this is the only safe speed.\n" +
        "- With friction \\(\\mu_s\\): \\(v_{max} = \\sqrt{rg\\left(\\dfrac{\\tan\\theta + \\mu_s}{1 - \\mu_s\\tan\\theta}\\right)}\\) and \\(v_{min} = \\sqrt{rg\\left(\\dfrac{\\tan\\theta - \\mu_s}{1 + \\mu_s\\tan\\theta}\\right)}\\).\n" +
        "- If \\(\\mu_s \\ge \\tan\\theta\\) there is no lower speed limit. If \\(\\mu_s\\tan\\theta \\ge 1\\) there is no upper limit as far as skidding goes.\n" +
        "- For a road of width w, the outer edge is higher than the inner edge by \\(w\\sin\\theta\\).",
      formula: {
        label: "Angle of banking",
        latex: "\\tan\\theta = \\frac{v^2}{rg}",
      },
      authoredExample: {
        prompt:
          "A curve of radius 50 m is banked so that \\(\\tan\\theta = 0.2\\). Find the optimum speed. If the coefficient of static friction is 0.3, find the maximum safe speed, and say whether there is a lower limit. (g = 10 m/s²)",
        steps: [
          "Given: \\(r = 50\\) m, \\(\\tan\\theta = 0.2\\), \\(\\mu_s = 0.3\\), \\(g = 10\\) m/s².",
          "Optimum speed: \\(v = \\sqrt{rg\\tan\\theta} = \\sqrt{50 \\times 10 \\times 0.2} = \\sqrt{100} = 10\\) m/s.",
          "Maximum speed: \\(v_{max} = \\sqrt{rg\\left(\\dfrac{\\tan\\theta + \\mu_s}{1 - \\mu_s\\tan\\theta}\\right)} = \\sqrt{500 \\times \\dfrac{0.5}{0.94}} = \\sqrt{265.96} = 16.31\\) m/s.",
          "Lower limit: \\(\\mu_s = 0.3\\) is more than \\(\\tan\\theta = 0.2\\), so \\(\\tan\\theta - \\mu_s\\) is negative and there is no lower speed limit.",
        ],
        answer: "Optimum 10 m/s; maximum 16.31 m/s; no lower limit",
      },
      selfCheckExample: {
        prompt:
          "A road of radius 40 m is banked at 45°. At what speed can a car take the curve with no help from friction? (g = 10 m/s²)",
        steps: ["\\(v = \\sqrt{rg\\tan\\theta} = \\sqrt{40 \\times 10 \\times 1} = \\sqrt{400}\\)."],
        answer: "20 m/s",
      },
      practiceSet: [
        { prompt: "Does the angle of banking of a road depend on the mass of the vehicle?", answer: "No" },
        { prompt: "A road 8 m wide is banked at 30°. How much higher is its outer edge than its inner edge?", answer: "\\(8 \\sin 30^\\circ = 4\\) m" },
        { prompt: "On a banked road, which part of the normal reaction supplies the centripetal force?", answer: "Its horizontal component, \\(N\\sin\\theta\\)" },
        { prompt: "Can a vehicle take a frictionless banked curve safely?", answer: "Yes, but only at the optimum speed \\(\\sqrt{rg\\tan\\theta}\\)" },
      ],
      pyqExampleId: "a3efd778-1596-4452-ba19-902bee577f20",
      traps: [
        {
          title: "Swapping sin and cos",
          body: "\\(N\\cos\\theta\\) balances the weight and \\(N\\sin\\theta\\) supplies the centripetal force. Dividing gives \\(\\tan\\theta = \\dfrac{v^2}{rg}\\), not \\(\\cot\\theta\\).",
        },
        {
          title: "Friction at the optimum speed",
          body: "At \\(v = \\sqrt{rg\\tan\\theta}\\) no friction acts. Above that speed friction acts down the slope; below it, up the slope.",
        },
        {
          title: "Stopping at tan θ",
          body: "The question asks for an angle. Finish with \\(\\theta = \\tan^{-1}(\\dots)\\) in degrees.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscprd-conical-pendulum",
      name: "The conical pendulum",
      intuition:
        "Whirl a bob on a string so that it goes round a horizontal circle: the string sweeps out a cone. The vertical part of the tension holds up the weight and the horizontal part pulls the bob towards the centre. Spin it faster and the cone opens wider.",
      definition:
        "- A string of length L makes a semi-vertical angle \\(\\theta\\); the bob moves on a circle of radius \\(r = L\\sin\\theta\\).\n" +
        "- With tension \\(T\\): \\(T\\cos\\theta = mg\\) and \\(T\\sin\\theta = mr\\omega^2\\).\n" +
        "- Dividing: \\(\\tan\\theta = \\dfrac{r\\omega^2}{g} = \\dfrac{v^2}{rg}\\).\n" +
        "- Putting \\(r = L\\sin\\theta\\): \\(\\omega^2 = \\dfrac{g}{L\\cos\\theta}\\), so the period is \\(2\\pi\\sqrt{\\dfrac{L\\cos\\theta}{g}}\\) and the frequency \\(n = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{g}{L\\cos\\theta}}\\).\n" +
        "- The period depends on L, \\(\\theta\\) and g, but not on the mass of the bob. \\(L\\cos\\theta\\) is the height of the point of suspension above the plane of the circle.\n" +
        "- A ball rolling round inside a funnel and the riders of a merry-go-round on hanging rods follow the same force balance.",
      formula: {
        label: "Period of a conical pendulum",
        latex: "\\text{Period} = 2\\pi\\sqrt{\\frac{L\\cos\\theta}{g}}",
      },
      authoredExample: {
        prompt:
          "A conical pendulum has a string 1 m long that makes an angle of 60° with the vertical. Find its period. (g = 9.8 m/s²)",
        steps: [
          "Given: \\(L = 1\\) m, \\(\\theta = 60^\\circ\\), so \\(L\\cos\\theta = 0.5\\) m.",
          "Formula: Period \\(= 2\\pi\\sqrt{\\dfrac{L\\cos\\theta}{g}}\\).",
          "Substitution: Period \\(= 2\\pi\\sqrt{\\dfrac{0.5}{9.8}} = 2\\pi \\times 0.2259 = 1.419\\) s.",
        ],
        answer: "1.42 s",
      },
      selfCheckExample: {
        prompt:
          "A bob on a string 50 cm long moves as a conical pendulum with the string at 37° to the vertical. Find the radius of its circle and its speed. (sin 37° = 0.6, tan 37° = 0.75, g = 10 m/s²)",
        steps: [
          "\\(r = L\\sin\\theta = 0.5 \\times 0.6 = 0.3\\) m.",
          "\\(v^2 = rg\\tan\\theta = 0.3 \\times 10 \\times 0.75 = 2.25\\), so \\(v = 1.5\\) m/s.",
        ],
        answer: "Radius 0.3 m; speed 1.5 m/s",
      },
      practiceSet: [
        { prompt: "Does the period of a conical pendulum depend on the mass of the bob?", answer: "No" },
        { prompt: "A conical pendulum is spun faster. Does its semi-vertical angle increase or decrease?", answer: "It increases" },
        { prompt: "In a conical pendulum, which part of the tension supplies the centripetal force?", answer: "The horizontal component, \\(T\\sin\\theta\\)" },
      ],
      pyqExampleId: "5c3bac95-e120-4ccc-b83e-dbbe02cae9a0",
      traps: [
        {
          title: "Taking the string as the radius",
          body: "The radius of the circle is \\(L\\sin\\theta\\). The string length L is the slant side of the cone.",
        },
        {
          title: "sin θ in the period",
          body: "The period has \\(L\\cos\\theta\\), the vertical height of the cone, not \\(L\\sin\\theta\\).",
        },
      ],
    },
  ],
};
