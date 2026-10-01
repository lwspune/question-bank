import type { SubtopicNote } from "@/app/notes/_types";

export const DYNAMICS_PLANE_NOTE: SubtopicNote = {
  subtopicName: "Dynamics of Circular Motion: Roads, Strings and Vertical Circles",
  title: "Dynamics of Circular Motion: Roads, Strings and Vertical Circles",
  oneLineDefinition:
    "Circular motion needs a net force mv²/r towards the centre, and some real force has to supply it: friction on a level road, the slope of a banked road, the tension in a string, the pull of a spring or the push of a wall; in a vertical circle gravity joins in and the speed changes from top to bottom.",
  whyItMatters:
    "Thirty-two PYQs, twenty-seven of them multiple choice, and three from 2026: the largest page in the chapter. Nine are about roads, turntables and rotor drums, where friction or banking supplies the force. Thirteen use a string, a spring or a wall in a horizontal circle, including the conical pendulum. Ten are vertical circles, loops and smooth surfaces, where energy conservation and the centripetal equation are used together. The first step is always the same: name the force that points at the centre.",
  concepts: [
    // C1 — friction and banking
    {
      kind: "formula" as const,
      slug: "jpplane-friction-banking",
      name: "Friction and banking on a curve",
      intuition:
        "On a level road the only sideways force on a car is friction, so friction has to supply mv²/r, and it cannot give more than μmg. That caps the speed at √(μrg), whatever the mass. Banking the road tilts the normal force so that part of it points at the centre; at one speed this alone is enough and no friction is needed. Friction then lets the car go somewhat faster or slower than that speed.",
      definition:
        "- Level road or turntable: \\(\\mu mg \\ge \\dfrac{mv^{2}}{r}\\), so \\(v_{\\max} = \\sqrt{\\mu rg}\\) and \\(\\omega_{\\max} = \\sqrt{\\mu g/r}\\); mass cancels.\n" +
        "- Banked at θ, no friction needed: \\(\\tan\\theta = \\dfrac{v^{2}}{rg}\\).\n" +
        "- Railway track, rail gap l: outer rail raised by \\(h \\approx l\\tan\\theta = \\dfrac{lv^{2}}{rg}\\).\n" +
        "- Banked with friction: \\(v_{\\max}^{2} = rg\\,\\dfrac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}\\), \\(v_{\\min}^{2} = rg\\,\\dfrac{\\tan\\theta - \\mu}{1 + \\mu\\tan\\theta}\\).\n" +
        "- Rotor drum: the wall's normal force \\(N = m\\omega^{2}R\\) supplies the centripetal force and friction \\(\\mu N\\) holds the weight, so \\(\\omega_{\\min} = \\sqrt{\\dfrac{g}{\\mu R}}\\).\n" +
        "- A downward aerodynamic force \\(F_L\\) adds to the normal force: \\(\\mu(mg + F_L) = \\dfrac{mv^{2}}{R}\\).",
      formula: {
        label: "Roads and turntables",
        latex:
          "v_{\\max} = \\sqrt{\\mu rg} \\qquad \\tan\\theta = \\frac{v^{2}}{rg} \\qquad v_{\\max}^{2} = rg\\,\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}",
      },
      authoredExample: {
        prompt:
          "A level curve has radius 80 m and \\(\\mu = 0.5\\) \\((g = 10\\ \\text{m/s}^{2})\\). (a) Find the greatest safe speed. (b) If the curve is instead banked at \\(37^{\\circ}\\) \\((\\tan 37^{\\circ} = 0.75)\\) with a smooth surface, at what speed can it be taken?",
        steps: [
          "(a) \\(v_{\\max} = \\sqrt{0.5 \\times 80 \\times 10} = \\sqrt{400} = 20\\ \\text{m/s}\\).",
          "(b) \\(v^{2} = rg\\tan\\theta = 80 \\times 10 \\times 0.75 = 600\\).",
          "\\(v = 10\\sqrt{6} \\approx 24.5\\ \\text{m/s}\\).",
        ],
        answer: "(a) 20 m/s; (b) \\(10\\sqrt{6} \\approx 24.5\\ \\text{m/s}\\)",
      },
      selfCheckExample: {
        prompt:
          "Rails 1 m apart run round a curve of radius 500 m. By how much must the outer rail be raised for trains at 20 m/s? \\((g = 10\\ \\text{m/s}^{2})\\)",
        steps: [
          "\\(\\tan\\theta = \\dfrac{v^{2}}{rg} = \\dfrac{400}{5000} = 0.08\\).",
          "\\(h \\approx l\\tan\\theta = 1 \\times 0.08 = 0.08\\ \\text{m}\\).",
        ],
        answer: "8 cm",
      },
      practiceSet: [
        { prompt: "A coin sits 10 cm from the centre of a turntable, \\(\\mu = 0.4\\) \\((g = 10)\\). Greatest angular speed without slipping?", answer: "\\(2\\sqrt{10}\\) rad/s" },
        { prompt: "Rotor drum of radius 2 m, \\(\\mu = 0.5\\) \\((g = 10)\\). Least angular speed to hold a rider?", answer: "\\(\\sqrt{10}\\) rad/s" },
        { prompt: "The radius of a level curve is made four times, μ unchanged. Greatest safe speed?", answer: "Doubled" },
      ],
      pyqExampleId: "6c619cb1-6c30-4de0-8c94-80f8c9b4c3bb", // 6 Apr 2024: banked road with friction, greatest speed
      traps: [
        {
          title: "Putting the mass into the safe speed",
          body: "v_max = √(μrg) has no mass in it: a heavier car needs more force but also gets more friction. A changed mass alone changes nothing.",
        },
        {
          title: "Friction with the wrong sign on a banked road",
          body: "At the greatest speed the car tends to slide outwards, so friction acts down the slope: (tan θ + μ)/(1 − μ tan θ). At the least speed it acts up the slope and both signs flip.",
        },
      ],
    },

    // C2 — strings, springs, walls, conical pendulum
    {
      kind: "formula" as const,
      slug: "jpplane-tension-spring",
      name: "String, spring and wall in a horizontal circle",
      intuition:
        "For a stone whirled on a string on a smooth table, the tension is the centripetal force. Replace the string with a spring and the circle grows, because the spring must stretch to pull; the radius is the natural length plus the stretch. Hang the string from a point instead and it tilts: its vertical part holds up the weight and its horizontal part turns the bob, which is the conical pendulum.",
      definition:
        "- String on a smooth table: \\(T = \\dfrac{mv^{2}}{L} = m\\omega^{2}L\\); the string breaks when this exceeds its limit.\n" +
        "- Spring of natural length \\(l_0\\): \\(kx = m\\omega^{2}(l_0 + x)\\), so \\(x = \\dfrac{m\\omega^{2}l_0}{k - m\\omega^{2}}\\).\n" +
        "- Conical pendulum, string L at θ to the vertical: \\(T\\cos\\theta = mg\\), \\(T\\sin\\theta = m\\omega^{2}L\\sin\\theta\\), so \\(T = m\\omega^{2}L\\), \\(\\tan\\theta = \\dfrac{v^{2}}{rg}\\) and \\(\\omega^{2} = \\dfrac{g}{L\\cos\\theta}\\).\n" +
        "- A bob hung in a car turning on a curve takes the same tilt: \\(\\tan\\theta = v^{2}/rg\\).\n" +
        "- A wall or groove pushing inwards: \\(N = \\dfrac{mv^{2}}{r}\\), so \\(N \\propto v^{2}\\).\n" +
        "- A liquid of mass M filling a tube of length L rotated about one end presses on the far end with \\(F = \\dfrac{M\\omega^{2}L}{2}\\) (its centre of mass is at L/2).",
      formula: {
        label: "Horizontal circles",
        latex:
          "T = m\\omega^{2}L \\qquad kx = m\\omega^{2}(l_0 + x) \\qquad \\tan\\theta = \\frac{v^{2}}{rg}\\ (\\text{conical pendulum})",
      },
      authoredExample: {
        prompt:
          "A 0.5 kg block on a smooth table is tied to a spring of force constant 20 N/m and natural length 30 cm, whose other end is fixed. The block goes round the fixed end at 4 rad/s. Find the stretch, the radius and the spring force.",
        steps: [
          "\\(m\\omega^{2} = 0.5 \\times 16 = 8\\ \\text{N/m}\\).",
          "\\(20x = 8(0.3 + x)\\) gives \\(12x = 2.4\\), so \\(x = 0.2\\ \\text{m}\\) and the radius is 0.5 m.",
          "Spring force \\(= 20 \\times 0.2 = 4\\ \\text{N}\\). Check: \\(m\\omega^{2}r = 8 \\times 0.5 = 4\\ \\text{N}\\).",
        ],
        answer: "Stretch 20 cm, radius 50 cm, force 4 N",
      },
      selfCheckExample: {
        prompt:
          "A 0.2 kg bob on a 1 m string moves as a conical pendulum with the string at \\(60^{\\circ}\\) to the vertical \\((g = 10\\ \\text{m/s}^{2})\\). Find the tension and the angular speed.",
        steps: [
          "\\(T\\cos 60^{\\circ} = mg\\) gives \\(T = 2mg = 4\\ \\text{N}\\).",
          "\\(T = m\\omega^{2}L\\): \\(4 = 0.2\\,\\omega^{2}(1)\\), so \\(\\omega^{2} = 20\\) and \\(\\omega = 2\\sqrt{5}\\ \\text{rad/s}\\). Check: \\(g/(L\\cos\\theta) = 20\\).",
        ],
        answer: "4 N, \\(2\\sqrt{5}\\) rad/s",
      },
      practiceSet: [
        { prompt: "A string 1 m long breaks at 50 N. Greatest speed of a 0.5 kg stone whirled on a smooth table?", answer: "10 m/s" },
        { prompt: "A bob hangs in a car going round a curve of radius \\(10\\sqrt{3}\\) m at 10 m/s \\((g = 10)\\). Angle of the string with the vertical?", answer: "\\(30^{\\circ}\\)" },
        { prompt: "A tube 2 m long holds 0.5 kg of liquid and turns about one end at 2 rad/s. Force on the far end?", answer: "2 N" },
      ],
      pyqExampleId: "3f6297d2-16a3-4d49-8388-1c8ab70943ae", // 6 Apr 2023: block on a spring moving in a circle
      traps: [
        {
          title: "Using the natural length as the radius",
          body: "A spring stretches to provide the pull, so the radius is l₀ + x. Writing kx = mω²l₀ drops the stretch from the radius and gives the wrong extension.",
        },
        {
          title: "Radius or string length in a conical pendulum",
          body: "The bob moves on a circle of radius L sin θ, but the tension comes out as mω²L, with the full string length. Mixing the two gives a tension too small by sin θ.",
        },
      ],
    },

    // C3 — vertical circle
    {
      kind: "formula" as const,
      slug: "jpplane-vertical-circle",
      name: "Motion in a vertical circle",
      intuition:
        "In a vertical circle the speed is not constant: the body slows as it climbs and speeds up as it falls, so energy conservation links the speeds at different points. At each point the centripetal equation then gives the tension or the normal force. At the bottom the string must hold the weight as well as turn the body; at the top gravity helps, so the tension is least there and the string goes slack first.",
      definition:
        "- Bottom: \\(T_b = \\dfrac{mv_b^{2}}{r} + mg\\). Top: \\(T_t = \\dfrac{mv_t^{2}}{r} - mg\\). At angle θ from the bottom: \\(T = \\dfrac{mv^{2}}{r} + mg\\cos\\theta\\).\n" +
        "- Energy: \\(v^{2} = v_b^{2} - 2gr(1 - \\cos\\theta)\\); \\(v_b^{2} = v_t^{2} + 4gr\\); \\(T_b - T_t = 6mg\\).\n" +
        "- Just completing the circle on a string: \\(T_t = 0\\), so \\(v_t = \\sqrt{gr}\\) and \\(v_b = \\sqrt{5gr}\\).\n" +
        "- Slack above the centre, string at φ above the horizontal: \\(T = 0\\) when \\(mg\\sin\\varphi = \\dfrac{mv^{2}}{r}\\).\n" +
        "- Loop of radius R after a smooth slope from height h: \\(mgh = mg(2R) + \\tfrac{1}{2}mv_t^{2}\\) and \\(N_t + mg = \\dfrac{mv_t^{2}}{R}\\); the least height is \\(\\dfrac{5R}{2}\\).\n" +
        "- Sliding from the top of a smooth hemisphere: it leaves the surface where \\(\\cos\\theta = \\dfrac{2}{3}\\), at height \\(\\dfrac{2R}{3}\\) above the centre.",
      formula: {
        label: "Vertical circle on a string",
        latex:
          "T_b = \\frac{mv_b^{2}}{r} + mg,\\ T_t = \\frac{mv_t^{2}}{r} - mg \\qquad v_b^{2} = v_t^{2} + 4gr \\qquad v_b \\ge \\sqrt{5gr}",
      },
      authoredExample: {
        prompt:
          "A 0.2 kg ball on a 1 m string moves in a vertical circle with a speed of 8 m/s at the bottom \\((g = 10\\ \\text{m/s}^{2})\\). Find the tension at the bottom and at the top, and check that it completes the circle.",
        steps: [
          "Bottom: \\(T_b = \\dfrac{0.2 \\times 64}{1} + 2 = 14.8\\ \\text{N}\\).",
          "Top: \\(v_t^{2} = 64 - 4(10)(1) = 24\\), so \\(T_t = 0.2 \\times 24 - 2 = 2.8\\ \\text{N}\\).",
          "\\(T_t > 0\\) (equivalently \\(v_t^{2} = 24 > gr = 10\\)), so it completes the circle. Check: \\(T_b - T_t = 12\\ \\text{N} = 6mg\\).",
        ],
        answer: "14.8 N at the bottom, 2.8 N at the top; it completes the circle",
      },
      selfCheckExample: {
        prompt:
          "A 0.5 kg stone on a 0.8 m string has a speed of 6 m/s at the bottom of a vertical circle. Find the tension when the string is horizontal \\((g = 10\\ \\text{m/s}^{2})\\).",
        steps: [
          "It has risen 0.8 m: \\(v^{2} = 36 - 2(10)(0.8) = 20\\).",
          "With the string horizontal, gravity has no component along it: \\(T = \\dfrac{mv^{2}}{r} = \\dfrac{0.5 \\times 20}{0.8} = 12.5\\ \\text{N}\\).",
        ],
        answer: "12.5 N",
      },
      practiceSet: [
        { prompt: "Least speed at the bottom to complete a vertical circle of radius 2.5 m on a string \\((g = 10)\\)?", answer: "\\(5\\sqrt{5}\\) m/s" },
        { prompt: "Least release height on a smooth slope for a ball to go round a loop of radius 0.4 m?", answer: "1 m" },
        { prompt: "A block slides from the top of a smooth hemisphere of radius 6 m. Height above the centre where it leaves the surface?", answer: "4 m" },
        { prompt: "A 1 kg ball goes round a vertical circle on a string \\((g = 10)\\). Tension at the bottom minus tension at the top?", answer: "60 N" },
      ],
      pyqExampleId: "64c062f6-a078-4b5b-965f-82f58cbf1052", // 29 Jan 2025: kinetic energy at the bottom against the top
      traps: [
        {
          title: "Zero speed at the top",
          body: "On a string, 'just completes the circle' means the tension is zero at the top, which needs a speed of √(gr) there. At zero speed the string would have gone slack well before the top.",
        },
        {
          title: "Change in velocity as a change in speed",
          body: "Between the bottom and the point where the string is horizontal, the velocity turns through 90°. The change in velocity is √(v₁² + v₂²), not the difference of the speeds.",
        },
      ],
    },
  ],
};
