import type { SubtopicNote } from "@/app/notes/_types";

export const DEPTH_GRAV_NOTE: SubtopicNote = {
  subtopicName: "Acceleration due to Gravity: Depth and Rotation",
  title: "Acceleration due to Gravity: Depth and Rotation",
  oneLineDefinition:
    "Below the surface g falls in a straight line, g(1 − d/R), to zero at the centre; the earth's spin lowers g by ω²R cos²λ, most at the equator and not at all at the poles.",
  whyItMatters:
    "Seventeen PYQs, fifteen of them multiple choice, and one from 2026. Six use g inside the earth, seven compare a point below the surface with a point above it, and four are about the earth's spin. Five of the seventeen are statement or assertion questions, so the qualitative facts here are worth as much as the formulas.",
  concepts: [
    // C1 — g at a depth
    {
      kind: "formula" as const,
      slug: "jpgrav-g-depth",
      name: "g at a depth below the surface",
      intuition:
        "Below the surface, the shell of earth above you pulls equally in all directions and cancels. Only the sphere beneath you, of radius \\(R - d\\), still pulls. For a uniform earth its mass shrinks as the cube of its radius, so g falls in direct proportion to the distance from the centre.",
      definition:
        "- \\(g_d = g\\left(1 - \\dfrac{d}{R}\\right) = \\dfrac{GMr}{R^{3}}\\), where \\(r = R - d\\).\n" +
        "- At the centre \\(g = 0\\): a body there has mass but no weight.\n" +
        "- Depth \\(R/2 \\to g/2\\); depth \\(R/4 \\to 3g/4\\).\n" +
        "- The g–r graph rises in a straight line from zero at the centre to its maximum at the surface, then falls as \\(1/r^{2}\\) outside.\n" +
        "- The formula assumes uniform density; JEE questions say so or take it for granted.",
      formula: {
        label: "g at depth d",
        latex: "g_d = g\\left(1 - \\frac{d}{R}\\right)",
      },
      authoredExample: {
        prompt:
          "At what depth below the surface is g reduced by 20%? Take R = 6400 km.",
        steps: [
          "\\(g_d = 0.8g\\), so \\(1 - \\dfrac{d}{R} = 0.8\\).",
          "\\(d = 0.2R = 0.2 \\times 6400\\) km.",
        ],
        answer: "1280 km",
      },
      selfCheckExample: {
        prompt:
          "A body weighs 480 N on the surface. What does it weigh at a depth of three quarters of the earth's radius?",
        steps: [
          "\\(\\dfrac{g_d}{g} = 1 - \\dfrac{3}{4} = \\dfrac{1}{4}\\).",
          "\\(\\dfrac{1}{4} \\times 480 = 120\\).",
        ],
        answer: "120 N",
      },
      practiceSet: [
        { prompt: "Weight of a body at the earth's centre?", answer: "Zero" },
        { prompt: "g at a depth of half the earth's radius?", answer: "\\(\\dfrac{g}{2}\\)" },
        { prompt: "At what depth is g equal to \\(0.9g\\)?", answer: "\\(\\dfrac{R}{10}\\)" },
        { prompt: "Where is g largest along a line from the centre outwards?", answer: "At the surface" },
      ],
      pyqExampleId: "1a0a477d-ae7a-4467-bb8f-36f5c5ab70cf", // 6 Apr 2024: 300 N body at depth R/4 → 225 N
      traps: [
        {
          title: "Depth is linear, height is inverse square",
          body: "Going down, g falls in proportion to d/R. Going up, it falls as 1/(1 + h/R)². Using the height formula below the surface, or the depth formula above it, gives a wrong option every time.",
        },
        {
          title: "g is largest at the surface",
          body: "g rises from zero at the centre to its peak at the surface and falls on both sides of it. A graph that keeps rising inside and outside, or that is flat inside, is wrong.",
        },
      ],
    },

    // C2 — comparing a depth with a height
    {
      kind: "formula" as const,
      slug: "jpgrav-height-vs-depth",
      name: "Comparing g at a depth with g at a height",
      intuition:
        "Both going down and going up reduce g, but at different rates. For small distances, g falls twice as fast going up, so a height h matches a depth 2h. For large distances the approximations break down: set the two exact formulas equal and solve.",
      definition:
        "- Small distances: \\(g_h \\approx g(1 - 2h/R)\\) and \\(g_d = g(1 - d/R)\\), so equal g needs \\(d = 2h\\).\n" +
        "- Large distances: solve \\(1 - \\dfrac{d}{R} = \\dfrac{1}{(1 + h/R)^{2}}\\) exactly.\n" +
        "- The same distance x below and above: \\(\\dfrac{g_d}{g_h} = (1 - x/R)(1 + x/R)^{2}\\).\n" +
        "- Equal weight at the same distance above and below: \\((1 - x)(1 + x)^{2} = 1\\) with \\(x = h/R\\), giving \\(x^{2} + x - 1 = 0\\).\n" +
        "- Moving from a small depth d to the same small height d changes g by about \\(\\dfrac{d}{R}\\) of its value.",
      formula: {
        label: "Equal g below and above",
        latex: "1 - \\frac{d}{R} = \\frac{1}{(1 + h/R)^{2}} \\quad\\Rightarrow\\quad d \\approx 2h\\ \\ (h \\ll R)",
      },
      authoredExample: {
        prompt:
          "At what height above the surface is g the same as at a depth of half the earth's radius? Take R = 6400 km.",
        steps: [
          "At depth \\(R/2\\), \\(g_d = \\dfrac{g}{2}\\). This is not a small distance, so solve exactly.",
          "\\(\\dfrac{g}{(1 + h/R)^{2}} = \\dfrac{g}{2}\\) gives \\(1 + \\dfrac{h}{R} = \\sqrt{2}\\).",
          "\\(h = (\\sqrt{2} - 1)R = 0.414 \\times 6400 \\approx 2650\\) km.",
          "The small-distance rule would have given \\(h = d/2 = 1600\\) km, far off.",
        ],
        answer: "\\((\\sqrt{2} - 1)R \\approx 2650\\) km",
      },
      selfCheckExample: {
        prompt:
          "Find the ratio of g at a depth \\(R/2\\) to g at a height \\(R/2\\).",
        steps: [
          "\\(g_d = g\\left(1 - \\tfrac{1}{2}\\right) = \\dfrac{g}{2}\\).",
          "\\(g_h = \\dfrac{g}{(3/2)^{2}} = \\dfrac{4g}{9}\\).",
          "\\(\\dfrac{g_d}{g_h} = \\dfrac{1/2}{4/9} = \\dfrac{9}{8}\\).",
        ],
        answer: "\\(9 : 8\\)",
      },
      practiceSet: [
        { prompt: "g at a height of 5 km equals g at what depth?", answer: "10 km" },
        { prompt: "A body moves from 8 km below the surface to 8 km above it. Change in g? (R = 6400 km)", answer: "A fall of 0.125%" },
        { prompt: "At \\(d = h = 0.1R\\), which is larger, \\(g_d\\) or \\(g_h\\)?", answer: "\\(g_d\\) (\\(0.9g\\) against \\(0.83g\\))" },
        { prompt: "True or false: g decreases whether you go up or down from the surface.", answer: "True" },
      ],
      pyqExampleId: "8c82dbeb-ee77-48e5-a5c2-da149852d99d", // 29 Jan 2024: same weight above and below → (√5 − 1)R/2
      traps: [
        {
          title: "d = 2h is only for small distances",
          body: "The rule comes from the approximation 1 − 2h/R. For a depth of R/2 the matching height is (√2 − 1)R, not R/4. If the distance is a sizeable fraction of R, solve the exact equation.",
        },
        {
          title: "Both directions reduce g",
          body: "A statement that g increases as you go down is false: g is largest at the surface. Going up and going down both lower it.",
        },
      ],
    },

    // C3 — rotation of the earth
    {
      kind: "formula" as const,
      slug: "jpgrav-rotation",
      name: "Effect of the earth's spin on g",
      intuition:
        "A body on the spinning earth moves in a circle about the axis. Part of gravity is used up to supply that circular motion, so the scale reads less. The circle is largest at the equator and shrinks to a point at the poles, so the effect is greatest at the equator and absent at the poles.",
      definition:
        "- At latitude \\(\\lambda\\): \\(g' = g - \\omega^{2}R\\cos^{2}\\lambda\\).\n" +
        "- Poles (\\(\\lambda = 90^{\\circ}\\)): \\(g' = g\\). Equator (\\(\\lambda = 0\\)): \\(g' = g - \\omega^{2}R\\), the least value.\n" +
        "- For the earth, \\(\\omega = 7.27 \\times 10^{-5}\\) rad/s and \\(\\omega^{2}R \\approx 0.034\\ \\text{m/s}^{2}\\).\n" +
        "- Bodies at the equator float when \\(\\omega^{2}R = g\\): \\(\\omega = \\sqrt{g/R}\\) and the day lasts \\(T = 2\\pi\\sqrt{R/g}\\).\n" +
        "- The effective g points exactly at the centre only at the poles and the equator.\n" +
        "- g also differs from place to place because the earth is not a perfect sphere: it is flattened at the poles, which also makes g larger there.",
      formula: {
        label: "Effective g at latitude λ",
        latex: "g' = g - \\omega^{2}R\\cos^{2}\\lambda",
      },
      authoredExample: {
        prompt:
          "A body reads 80 N on a spring balance at the North Pole. What does the same balance read at the equator? Take \\(g = 9.8\\ \\text{m/s}^{2}\\), \\(\\omega = 7.27 \\times 10^{-5}\\) rad/s and \\(R = 6.4 \\times 10^{6}\\) m.",
        steps: [
          "At the pole there is no correction, so \\(mg = 80\\) N.",
          "\\(\\omega^{2}R = (7.27 \\times 10^{-5})^{2} \\times 6.4 \\times 10^{6} = 0.0338\\ \\text{m/s}^{2}\\).",
          "At the equator the reading is \\(80\\left(1 - \\dfrac{0.0338}{9.8}\\right) = 80(1 - 0.00345)\\).",
          "\\(80 - 0.28 = 79.72\\) N.",
        ],
        answer: "About 79.7 N",
      },
      selfCheckExample: {
        prompt:
          "By how much is g at the equator less than g at the poles because of the spin alone? Take \\(\\omega = 7.3 \\times 10^{-5}\\) rad/s and \\(R = 6.4 \\times 10^{6}\\) m.",
        steps: [
          "The difference is \\(\\omega^{2}R\\cos^{2}0^{\\circ} - 0 = \\omega^{2}R\\).",
          "\\((7.3 \\times 10^{-5})^{2} \\times 6.4 \\times 10^{6} = 5.33 \\times 10^{-9} \\times 6.4 \\times 10^{6}\\).",
        ],
        answer: "About \\(0.034\\ \\text{m/s}^{2}\\)",
      },
      practiceSet: [
        { prompt: "Reduction of g due to the spin at latitude 60°?", answer: "\\(\\dfrac{\\omega^{2}R}{4}\\)" },
        { prompt: "Change in g at the poles if the earth spins faster?", answer: "None" },
        { prompt: "If the earth stopped spinning, what would happen to g at the equator?", answer: "It would rise by \\(\\omega^{2}R\\)" },
        { prompt: "Spin rate at which bodies at the equator float?", answer: "\\(\\omega = \\sqrt{g/R}\\)" },
      ],
      pyqExampleId: "8938b001-9b9b-4a55-ad68-2436fa2d2183", // 2021: spin fast enough to float at the equator → day of 84 min
      traps: [
        {
          title: "No effect at the poles, most at the equator",
          body: "Statements that reverse this are a regular trap. At the poles the body sits on the axis and does not go round a circle, so rotation changes nothing there.",
        },
        {
          title: "The floating day equals a grazing orbit's period",
          body: "T = 2π√(R/g) is about 84 minutes, the same as a satellite skimming the surface. Both come from setting ω²R equal to g.",
        },
      ],
    },
  ],
};
