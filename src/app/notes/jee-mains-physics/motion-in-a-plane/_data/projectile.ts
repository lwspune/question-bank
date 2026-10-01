import type { SubtopicNote } from "@/app/notes/_types";

export const PROJECTILE_PLANE_NOTE: SubtopicNote = {
  subtopicName: "Projectile: Time of Flight, Maximum Height and Range",
  title: "Projectile: Time of Flight, Maximum Height and Range",
  oneLineDefinition:
    "A projectile launched from level ground at speed u and angle θ stays in the air for 2u sin θ/g, rises to u² sin²θ/2g and lands u² sin 2θ/g away; the range is greatest at 45°, and angles θ and 90° − θ give the same range.",
  whyItMatters:
    "Twenty-seven PYQs, twenty-two of them multiple choice, and three from 2026. Fourteen use the three formulas directly, most often as a ratio between two launches; seven ask for the greatest range or for the angle at which the range is a set multiple of the height; six are about two launches at complementary angles. Mass never appears in any of the formulas, so a question that changes the mass and nothing else changes no answer.",
  concepts: [
    // C1 — T, H, R
    {
      kind: "formula" as const,
      slug: "jpplane-rht",
      name: "Time of flight, maximum height and range",
      intuition:
        "Split the launch velocity in two. The horizontal part u cos θ never changes, because nothing acts sideways. The vertical part u sin θ is thrown straight up against g. So the time in the air comes from the vertical part alone, the height from the vertical part alone, and the range is the horizontal speed times the time in the air.",
      definition:
        "- \\(T = \\dfrac{2u\\sin\\theta}{g}\\); time to the top \\(T/2\\).\n" +
        "- \\(H = \\dfrac{u^{2}\\sin^{2}\\theta}{2g}\\).\n" +
        "- \\(R = u\\cos\\theta \\cdot T = \\dfrac{u^{2}\\sin 2\\theta}{g}\\).\n" +
        "- At a fixed speed: \\(T \\propto \\sin\\theta\\), \\(H \\propto \\sin^{2}\\theta\\), \\(R \\propto \\sin 2\\theta\\). At a fixed angle, each of H and R goes as \\(u^{2}\\) and T as u.\n" +
        "- Same time of flight means the same vertical component \\(u\\sin\\theta\\), and so the same height, whatever the masses.\n" +
        "- Angles \\(45^{\\circ} \\pm \\alpha\\) at the same speed: times compare as \\(\\sin(45^{\\circ} + \\alpha) : \\sin(45^{\\circ} - \\alpha)\\) and heights as the squares; expand with \\(\\sin(45^{\\circ} \\pm \\alpha) = \\dfrac{\\cos\\alpha \\pm \\sin\\alpha}{\\sqrt{2}}\\), and use \\((\\cos\\alpha \\pm \\sin\\alpha)^{2} = 1 \\pm \\sin 2\\alpha\\) for the squares.\n" +
        "- The angle measured from the VERTICAL is \\(90^{\\circ} - \\theta\\): then \\(H = \\dfrac{u^{2}\\cos^{2}\\phi}{2g}\\).",
      formula: {
        label: "Projectile on level ground",
        latex:
          "T = \\frac{2u\\sin\\theta}{g} \\qquad H = \\frac{u^{2}\\sin^{2}\\theta}{2g} \\qquad R = \\frac{u^{2}\\sin 2\\theta}{g}",
      },
      authoredExample: {
        prompt:
          "A ball is kicked at 20 m/s at \\(37^{\\circ}\\) to the ground \\((\\sin 37^{\\circ} = 0.6,\\ \\cos 37^{\\circ} = 0.8,\\ g = 10\\ \\text{m/s}^{2})\\). Find its time of flight, greatest height and range.",
        steps: [
          "\\(u_x = 16\\ \\text{m/s}\\), \\(u_y = 12\\ \\text{m/s}\\).",
          "\\(T = \\dfrac{2(12)}{10} = 2.4\\ \\text{s}\\); \\(H = \\dfrac{12^{2}}{20} = 7.2\\ \\text{m}\\).",
          "\\(R = 16 \\times 2.4 = 38.4\\ \\text{m}\\). Check: \\(\\dfrac{400 \\times 2(0.6)(0.8)}{10} = 38.4\\).",
        ],
        answer: "2.4 s, 7.2 m, 38.4 m",
      },
      selfCheckExample: {
        prompt:
          "Two balls are thrown at the same angle, one at 10 m/s and one at 30 m/s. Find the ratios of their times of flight, greatest heights and ranges.",
        steps: [
          "At a fixed angle \\(T \\propto u\\): \\(1 : 3\\).",
          "\\(H \\propto u^{2}\\) and \\(R \\propto u^{2}\\): each \\(1 : 9\\).",
        ],
        answer: "T 1 : 3, H 1 : 9, R 1 : 9",
      },
      practiceSet: [
        { prompt: "Thrown at 30 m/s at \\(30^{\\circ}\\) \\((g = 10)\\). Time to reach the top?", answer: "1.5 s" },
        { prompt: "Thrown at 40 m/s at \\(53^{\\circ}\\) \\((\\sin 53^{\\circ} = 0.8,\\ g = 10)\\). Greatest height?", answer: "51.2 m" },
        { prompt: "Same speed, angles \\(22.5^{\\circ}\\) and \\(45^{\\circ}\\). Ratio of ranges?", answer: "\\(1 : \\sqrt{2}\\)" },
        { prompt: "A 1 kg and a 5 kg ball are thrown with the same velocity. Ratio of ranges?", answer: "1 : 1" },
      ],
      pyqExampleId: "cf3ab143-ba0e-4324-ba10-10d67d3e5b09", // 4 Apr 2026 Shift 1: ranges at 15° and 30°
      traps: [
        {
          title: "sin 2θ in the range, sin²θ in the height",
          body: "R = u² sin 2θ/g and H = u² sin²θ/2g. Swapping them is the commonest slip; check with 90°, where the range must be zero and the height u²/2g.",
        },
        {
          title: "Time of flight does not use sin 2θ",
          body: "T = 2u sin θ/g comes from the vertical motion alone. Ranges compare as sin 2θ, but times compare as sin θ and heights as sin²θ.",
        },
      ],
    },

    // C2 — maximum range and R = nH
    {
      kind: "formula" as const,
      slug: "jpplane-max-range",
      name: "Maximum range and the range-height relation",
      intuition:
        "sin 2θ cannot exceed 1, so the range at a given speed is largest when 2θ = 90°, that is at 45°. Thrown straight up, the same ball rises u²/2g: exactly half the greatest range. Dividing the range by the height cancels the speed and leaves only the angle, which is why 'range equals n times height' fixes θ.",
      definition:
        "- \\(R_{\\max} = \\dfrac{u^{2}}{g}\\) at \\(\\theta = 45^{\\circ}\\) (on level ground).\n" +
        "- Greatest height thrown vertically \\(= \\dfrac{u^{2}}{2g} = \\dfrac{R_{\\max}}{2}\\).\n" +
        "- \\(\\dfrac{R}{H} = \\dfrac{4}{\\tan\\theta}\\), so \\(R = nH\\) gives \\(\\tan\\theta = \\dfrac{4}{n}\\). For \\(\\tan\\theta = 4/n\\), \\(\\sin 2\\theta = \\dfrac{8n}{n^{2} + 16}\\).\n" +
        "- Time to the top t and range R: \\(u\\sin\\theta = gt\\) and \\(R = 2u\\cos\\theta \\cdot t\\), so \\(\\cot\\theta = \\dfrac{R}{2gt^{2}}\\).",
      formula: {
        label: "Greatest range; range against height",
        latex: "R_{\\max} = \\frac{u^{2}}{g}\\ (45^{\\circ}) \\qquad \\frac{R}{H} = \\frac{4}{\\tan\\theta}",
      },
      authoredExample: {
        prompt:
          "A ball is thrown at 20 m/s so that its range is twice its greatest height \\((g = 10\\ \\text{m/s}^{2})\\). Find the angle of projection, the range and the height.",
        steps: [
          "\\(R = 2H\\) gives \\(\\tan\\theta = \\dfrac{4}{2} = 2\\), so \\(\\sin\\theta = \\dfrac{2}{\\sqrt{5}}\\), \\(\\cos\\theta = \\dfrac{1}{\\sqrt{5}}\\), \\(\\sin 2\\theta = \\dfrac{4}{5}\\).",
          "\\(R = \\dfrac{400 \\times 0.8}{10} = 32\\ \\text{m}\\).",
          "\\(H = \\dfrac{400 \\times 0.8}{20} = 16\\ \\text{m}\\), and indeed \\(R = 2H\\).",
        ],
        answer: "\\(\\theta = \\tan^{-1}2\\); R = 32 m, H = 16 m",
      },
      selfCheckExample: {
        prompt:
          "A cricketer can throw a ball at most 80 m along level ground. How high can he throw it straight up with the same effort?",
        steps: [
          "Greatest range \\(u^{2}/g = 80\\ \\text{m}\\).",
          "Straight up: \\(u^{2}/2g = 40\\ \\text{m}\\).",
        ],
        answer: "40 m",
      },
      practiceSet: [
        { prompt: "Greatest range of a ball thrown at 30 m/s \\((g = 10)\\)?", answer: "90 m" },
        { prompt: "At what angle is the range four times the greatest height?", answer: "\\(45^{\\circ}\\)" },
        { prompt: "At what angle is the range \\(4\\sqrt{3}\\) times the greatest height?", answer: "\\(30^{\\circ}\\)" },
      ],
      pyqExampleId: "7111ca02-ca18-4f08-91ac-d892f2684076", // 3 Apr 2025: range three times the height
      traps: [
        {
          title: "Greatest height equal to greatest range",
          body: "The greatest height (thrown straight up) is u²/2g; the greatest range (at 45°) is u²/g. The range is twice the height, not equal to it.",
        },
        {
          title: "45° is only for level ground",
          body: "Range is largest at 45° only when the ball lands at its launch height. Thrown from a tower or onto a slope, the best angle is different.",
        },
      ],
    },

    // C3 — complementary angles
    {
      kind: "formula" as const,
      slug: "jpplane-complementary",
      name: "Complementary angles give the same range",
      intuition:
        "sin 2θ = sin(180° − 2θ), so a launch at θ and a launch at 90° − θ, at the same speed, land at the same point. The steeper one goes higher and stays up longer; the flatter one is quicker and lower. Because sin(90° − θ) = cos θ, the two heights and the two times of flight combine into neat products that give the range directly.",
      definition:
        "- Same speed, angles θ and \\(90^{\\circ} - \\theta\\): equal ranges, unequal heights and times.\n" +
        "- \\(H_1 = \\dfrac{u^{2}\\sin^{2}\\theta}{2g}\\), \\(H_2 = \\dfrac{u^{2}\\cos^{2}\\theta}{2g}\\): so \\(H_1 + H_2 = \\dfrac{u^{2}}{2g}\\) and \\(R = 4\\sqrt{H_1H_2}\\).\n" +
        "- \\(T_1 = \\dfrac{2u\\sin\\theta}{g}\\), \\(T_2 = \\dfrac{2u\\cos\\theta}{g}\\): so \\(T_1T_2 = \\dfrac{2R}{g}\\).\n" +
        "- For any range below the greatest, exactly two angles reach it, and they add to \\(90^{\\circ}\\).",
      formula: {
        label: "Two angles, one range",
        latex: "R = 4\\sqrt{H_1H_2} \\qquad T_1T_2 = \\frac{2R}{g} \\qquad H_1 + H_2 = \\frac{u^{2}}{2g}",
      },
      authoredExample: {
        prompt:
          "Two balls are thrown at 30 m/s and land at the same point; one is thrown at \\(37^{\\circ}\\) \\((\\sin 37^{\\circ} = 0.6,\\ g = 10\\ \\text{m/s}^{2})\\). Find the other angle, the two greatest heights and the range.",
        steps: [
          "The other angle is \\(90^{\\circ} - 37^{\\circ} = 53^{\\circ}\\).",
          "\\(H_1 = \\dfrac{900 \\times 0.36}{20} = 16.2\\ \\text{m}\\); \\(H_2 = \\dfrac{900 \\times 0.64}{20} = 28.8\\ \\text{m}\\). Their sum is 45 m \\(= u^{2}/2g\\).",
          "\\(R = 4\\sqrt{16.2 \\times 28.8} = 4 \\times 21.6 = 86.4\\ \\text{m}\\). Check: \\(\\dfrac{900 \\times 0.96}{10} = 86.4\\).",
        ],
        answer: "\\(53^{\\circ}\\); 16.2 m and 28.8 m; 86.4 m",
      },
      selfCheckExample: {
        prompt:
          "Two bodies thrown with the same speed land at the same point. Their times of flight are 2 s and 4 s. Find the range \\((g = 10\\ \\text{m/s}^{2})\\).",
        steps: [
          "\\(T_1T_2 = \\dfrac{2R}{g}\\), so \\(R = \\dfrac{gT_1T_2}{2}\\).",
          "\\(R = \\dfrac{10 \\times 8}{2} = 40\\ \\text{m}\\).",
        ],
        answer: "40 m",
      },
      practiceSet: [
        { prompt: "Greatest heights 9 m and 16 m for two launches with the same speed and the same range. The range?", answer: "48 m" },
        { prompt: "Same speed, angles \\(35^{\\circ}\\) and \\(55^{\\circ}\\). Which goes farther, and which higher?", answer: "Equal ranges; the \\(55^{\\circ}\\) launch goes higher" },
        { prompt: "Two complementary launches at 20 m/s \\((g = 10)\\). Sum of their greatest heights?", answer: "20 m" },
      ],
      pyqExampleId: "80711be2-2013-4973-9848-cbbc9590cbde", // 8 Apr 2026 Shift 2: equal ranges from two times of flight
      traps: [
        {
          title: "Equal range does not mean equal height",
          body: "θ and 90° − θ land together, but the steeper launch rises higher and stays up longer. Only the range is shared.",
        },
        {
          title: "Adding the angles to 180°",
          body: "The two angles that give one range add to 90°, not 180°. It is the doubled angles, 2θ and 180° − 2θ, that add to 180°.",
        },
      ],
    },
  ],
};
