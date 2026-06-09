import type { SubtopicNote } from "@/app/notes/_types";

export const SHADOWS_AND_SPECIAL_NOTE: SubtopicNote = {
  subtopicName: "Shadows, Leaning Structures, and Special Geometry",
  title: "Shadows, Leaning Structures & Special Geometry",
  oneLineDefinition:
    "When the sun's elevation changes, a tower's shadow stretches or shrinks; when a tower leans, its top no longer sits over its foot; and a few questions hide a chord or arc of a circle. All three are still right-triangle reasoning, just with one extra twist.",
  whyItMatters:
    "A smaller but punishing subtopic: 8 PYQs, 6 of them HARD. The shadow problems test whether you can read the sun's elevation as the angle in the height-over-shadow triangle. The leaning-tower set is the chapter's hardest cluster — a structure tilted off the vertical needs two elevation readings to separate its true height from its lean. A couple of questions are really circle geometry (chord length, arc length) wearing a height-and-distance label. Recognise which is which and each becomes routine.",
  concepts: [
    // 1 — shadows & sun elevation
    {
      kind: "formula" as const,
      slug: "hd-shadows-and-sun",
      name: "Shadows and the Sun's Elevation",
      pyqExampleId: "3bb47103-ed02-43ba-a8ef-6d0869a04bcd",
      intuition:
        "The sun's rays hit the ground at the angle of elevation of the sun, and a vertical tower casts a shadow exactly as long as the base of that right triangle. A lower sun (smaller elevation) casts a longer shadow. The height stays fixed, so two sun positions give two shadow lengths from the same height.",
      definition:
        "A vertical tower of height \\(h\\) with the sun at elevation \\(\\theta\\) casts a horizontal shadow of length \\(s\\), where the sun's elevation IS the angle in the height-over-shadow triangle:\n" +
        "\\[\\tan\\theta = \\frac{h}{s} \\;\\Longrightarrow\\; s = \\frac{h}{\\tan\\theta} = h\\cot\\theta.\\]\n" +
        "- A **lower sun** (smaller \\(\\theta\\)) gives a **longer** shadow.\n" +
        "- When the elevation changes from \\(\\theta_1\\) to \\(\\theta_2\\), the shadow changes by \\(\\;s_2 - s_1 = h(\\cot\\theta_2 - \\cot\\theta_1)\\) — set this equal to the given lengthening to find \\(h\\) or the angle.",
      formula: {
        label: "Shadow of a vertical object",
        latex: "s = h\\cot\\theta, \\qquad \\Delta s = h(\\cot\\theta_2 - \\cot\\theta_1)",
      },
      visualizationSlug: "hd-shadow-sun",
      authoredExample: {
        prompt:
          "A tower of height \\(20\\sqrt{3}\\) m casts a shadow that grows by \\(x\\) m when the sun's elevation drops from \\(60^\\circ\\) to \\(30^\\circ\\). Find \\(x\\).",
        steps: [
          "Shadow at \\(60^\\circ\\): \\(s_1 = h\\cot 60^\\circ = 20\\sqrt{3}\\cdot\\dfrac{1}{\\sqrt{3}} = 20\\) m.",
          "Shadow at \\(30^\\circ\\): \\(s_2 = h\\cot 30^\\circ = 20\\sqrt{3}\\cdot\\sqrt{3} = 60\\) m.",
          "Lengthening: \\(x = s_2 - s_1 = 60 - 20 = 40\\) m.",
        ],
        answer: "\\(x = 40\\) m.",
      },
      selfCheckExample: {
        prompt:
          "A \\(6\\) m flagstaff on top of a tower casts a ground shadow of \\(2\\sqrt{3}\\) m (the flagstaff's own shadow). What angle does the sun make with the ground?",
        steps: [
          "The flagstaff and its shadow form the height-over-shadow triangle: \\(\\tan\\theta = \\dfrac{6}{2\\sqrt{3}}\\).",
          "Simplify: \\(\\dfrac{6}{2\\sqrt{3}} = \\dfrac{3}{\\sqrt{3}} = \\sqrt{3}\\).",
          "\\(\\tan\\theta = \\sqrt{3}\\Rightarrow \\theta = 60^\\circ\\).",
        ],
        answer: "\\(60^\\circ\\).",
      },
      traps: [
        {
          title: "Lower sun, longer shadow",
          body:
            "Because \\(s = h\\cot\\theta\\) and cotangent decreases as the angle grows, the shadow is LONGER when the elevation is SMALLER. If your lengthening \\(s_2 - s_1\\) comes out negative, you have the two angles swapped.",
        },
      ],
    },

    // 2 — sun elevation change, find the new angle (inequality)
    {
      kind: "formula" as const,
      slug: "hd-shadow-find-angle",
      name: "Finding the New Sun Angle from a Shadow Change",
      pyqExampleId: "b419b5f1-4f2e-42be-a69d-0019fc7466bb",
      intuition:
        "Sometimes the height is tied to the shadow change itself, and the question asks which range the new elevation falls in. You compute the new tangent, then compare it against the standard tangents 1/√3, 1, √3 to box the angle between two known values.",
      definition:
        "When the height is given in terms of the shadow lengthening \\(x\\) (e.g. \\(h = \\sqrt{3}\\,x\\)) and the sun drops from \\(\\theta_1\\) to \\(\\theta\\):\n" +
        "- First shadow: \\(s_1 = h\\cot\\theta_1\\). New shadow: \\(s = s_1 + x\\).\n" +
        "- New tangent: \\(\\tan\\theta = \\dfrac{h}{s_1 + x}\\).\n" +
        "- **Bracket the angle** by comparing \\(\\tan\\theta\\) with the reference values \\(\\tan 30^\\circ = \\tfrac{1}{\\sqrt{3}} \\approx 0.577\\), \\(\\tan 45^\\circ = 1\\), \\(\\tan 60^\\circ = \\sqrt{3} \\approx 1.732\\).",
      formula: {
        label: "New tangent, then bracket",
        latex: "\\tan\\theta = \\frac{h}{s_1 + x}",
      },
      authoredExample: {
        prompt:
          "A tower's shadow grows by \\(x\\) when the sun drops from \\(60^\\circ\\) to \\(\\theta\\). If the height is \\(\\sqrt{3}\\,x\\), in which range does \\(\\theta\\) lie?",
        steps: [
          "At \\(60^\\circ\\): \\(s_1 = h\\cot 60^\\circ = \\dfrac{\\sqrt{3}x}{\\sqrt{3}} = x\\).",
          "New shadow: \\(s = s_1 + x = 2x\\), so \\(\\tan\\theta = \\dfrac{h}{2x} = \\dfrac{\\sqrt{3}x}{2x} = \\dfrac{\\sqrt{3}}{2} \\approx 0.866\\).",
          "Since \\(\\tan 30^\\circ \\approx 0.577 < 0.866 < 1 = \\tan 45^\\circ\\), we get \\(30^\\circ < \\theta < 45^\\circ\\).",
        ],
        answer: "\\(30^\\circ < \\theta < 45^\\circ\\) (about \\(40.9^\\circ\\)).",
      },
      traps: [
        {
          title: "The new shadow is old + increase, not just the increase",
          body:
            "The lengthening \\(x\\) adds to the original shadow \\(s_1\\); the new shadow is \\(s_1 + x\\). Dividing the height by \\(x\\) alone (instead of \\(s_1 + x\\)) over-estimates the tangent and lands you in the wrong angle band.",
        },
      ],
    },

    // 3 — leaning tower (set S16)
    {
      kind: "formula" as const,
      slug: "hd-leaning-tower",
      name: "Leaning Towers — Separating Height from Lean",
      pyqExampleId: "40bda187-8620-4c3c-87bd-a6503dc360b8",
      intuition:
        "A tower tilted off the vertical has its top NOT over its foot — there is a horizontal lean as well as a vertical height. One elevation reading can't separate the two unknowns, so you take two readings from points on opposite sides and solve the pair.",
      definition:
        "A leaning tower has vertical height \\(h\\) and its top is shifted a horizontal distance \\(\\delta\\) from the foot. Reading the top's elevation from two ground points \\(P\\) (distance \\(p\\)) and \\(Q\\) (distance \\(q\\)) on the same line:\n" +
        "- \\(\\tan(\\text{angle at }P) = \\dfrac{h}{p - \\delta}\\), \\(\\quad\\tan(\\text{angle at }Q) = \\dfrac{h}{q - \\delta}\\).\n" +
        "- Two equations, two unknowns \\((h, \\delta)\\) — solve them together. With the classic \\(15^\\circ\\) and \\(75^\\circ\\) pair, \\(\\tan 15^\\circ = 2-\\sqrt{3}\\) and \\(\\tan 75^\\circ = 2+\\sqrt{3}\\) give a clean answer like \\(h = \\dfrac{x-y}{2\\sqrt{3}}\\).\n" +
        "- The tower's **inclination** \\(\\theta\\) to the horizontal satisfies \\(\\cot\\theta = \\dfrac{\\delta}{h}\\), and its actual **length** along the slant is \\(\\dfrac{h}{\\sin\\theta}\\).",
      formula: {
        label: "Two readings on a leaning tower",
        latex: "\\tan\\alpha = \\frac{h}{p-\\delta}, \\qquad \\tan\\beta = \\frac{h}{q-\\delta}",
      },
      authoredExample: {
        prompt:
          "A tower leans so its top is shifted \\(\\delta\\) horizontally from its foot, height \\(h\\). From \\(P\\) (distance \\(x\\)) the top's elevation is \\(15^\\circ\\); from \\(Q\\) (distance \\(y\\), nearer, same side) it is \\(75^\\circ\\). Find \\(h\\).",
        steps: [
          "From \\(P\\): \\(\\tan 15^\\circ = \\dfrac{h}{x-\\delta} = 2-\\sqrt{3}\\). From \\(Q\\): \\(\\tan 75^\\circ = \\dfrac{h}{y-\\delta} = 2+\\sqrt{3}\\).",
          "So \\(x - \\delta = \\dfrac{h}{2-\\sqrt{3}} = h(2+\\sqrt{3})\\) and \\(y - \\delta = \\dfrac{h}{2+\\sqrt{3}} = h(2-\\sqrt{3})\\).",
          "Subtract: \\((x-\\delta)-(y-\\delta) = x - y = h[(2+\\sqrt{3})-(2-\\sqrt{3})] = 2\\sqrt{3}\\,h\\Rightarrow h = \\dfrac{x-y}{2\\sqrt{3}}\\).",
        ],
        answer: "\\(h = \\dfrac{x-y}{2\\sqrt{3}}\\).",
      },
      traps: [
        {
          title: "A leaning tower has two unknowns",
          body:
            "Vertical height \\(h\\) AND horizontal lean \\(\\delta\\) are both unknown, so a single elevation reading is not enough — you must use both observation points. Treating the leaning tower like a vertical one (assuming \\(\\delta = 0\\)) is the trap the whole set is built around.",
        },
      ],
    },

    // 4 — chord length of a circle (half-angle)
    {
      kind: "formula" as const,
      slug: "hd-chord-length",
      name: "Chord Length of a Circle",
      pyqExampleId: "157c9f67-acc2-469c-9fed-28a19c6588d6",
      intuition:
        "A chord that subtends an angle at the centre of a circle splits into two right triangles by the radius that bisects it. Half the chord is the opposite side of half the central angle, so the whole chord is twice the radius times the sine of the half-angle.",
      definition:
        "A chord of a circle of radius \\(r\\) subtending a central angle \\(\\theta\\) has length\n" +
        "\\[\\text{chord} = 2r\\sin\\frac{\\theta}{2}.\\]\n" +
        "The radius to the chord's midpoint is perpendicular and bisects both the chord and the angle, giving the right triangle with half-chord \\(= r\\sin(\\theta/2)\\). For the NDA's odd angles use the half-angle value, e.g. \\(\\sin 22.5^\\circ = \\dfrac{1}{2}\\sqrt{2-\\sqrt{2}}\\).",
      formula: {
        label: "Chord subtending central angle θ",
        latex: "\\text{chord} = 2r\\sin\\frac{\\theta}{2}",
      },
      authoredExample: {
        prompt:
          "Find the length of a chord of a unit circle (\\(r = 1\\)) that subtends \\(45^\\circ\\) at the centre.",
        steps: [
          "Chord \\(= 2r\\sin(\\theta/2) = 2\\sin 22.5^\\circ\\).",
          "Half-angle: \\(\\sin 22.5^\\circ = \\sqrt{\\dfrac{1-\\cos 45^\\circ}{2}} = \\dfrac{1}{2}\\sqrt{2-\\sqrt{2}}\\).",
          "Chord \\(= 2\\cdot\\dfrac{1}{2}\\sqrt{2-\\sqrt{2}} = \\sqrt{2-\\sqrt{2}}\\).",
        ],
        answer: "\\(\\sqrt{2-\\sqrt{2}}\\) units.",
      },
      traps: [
        {
          title: "Half the angle, not the whole angle",
          body:
            "The chord formula uses \\(\\sin(\\theta/2)\\), because the perpendicular radius bisects the central angle. Writing \\(2r\\sin\\theta\\) is the standard slip — and it gives a length that can wrongly exceed the diameter.",
        },
      ],
    },

    // 5 — arc length (equilateral chord recognition)
    {
      kind: "formula" as const,
      slug: "hd-arc-length",
      name: "Arc Length and the Equilateral-Chord Clue",
      pyqExampleId: "da828b60-a9e3-4ddd-afb2-5f5b6fa7067f",
      intuition:
        "Arc length is just radius times the central angle in radians. The hidden step is finding the angle: when a chord equals the radius, the chord and the two radii form an equilateral triangle, so the central angle is 60°.",
      definition:
        "For a circle of radius \\(r\\), an arc subtending a central angle \\(\\theta\\) (in **radians**) has length\n" +
        "\\[\\text{arc} = r\\theta.\\]\n" +
        "- A useful recognition: a chord of length **equal to the radius** makes an **equilateral** triangle with the two radii, so it subtends \\(60^\\circ = \\dfrac{\\pi}{3}\\) at the centre.\n" +
        "- Convert any degree angle to radians before multiplying; use \\(\\pi \\approx \\dfrac{22}{7}\\) when the options are fractions.",
      formula: {
        label: "Arc length",
        latex: "\\text{arc} = r\\theta \\quad (\\theta \\text{ in radians})",
      },
      authoredExample: {
        prompt:
          "A circle has diameter \\(44\\) cm and a chord of length \\(22\\) cm. Find the length of the minor arc cut off by the chord. (\\(\\pi \\approx \\tfrac{22}{7}\\).)",
        steps: [
          "Radius \\(r = 22\\) cm, and the chord is \\(22\\) cm \\(= r\\), so the chord and two radii form an equilateral triangle: central angle \\(= 60^\\circ = \\dfrac{\\pi}{3}\\).",
          "Arc \\(= r\\theta = 22\\cdot\\dfrac{\\pi}{3} = \\dfrac{22\\pi}{3}\\).",
          "With \\(\\pi \\approx \\dfrac{22}{7}\\): arc \\(= \\dfrac{22\\cdot 22}{3\\cdot 7} = \\dfrac{484}{21}\\) cm.",
        ],
        answer: "\\(\\dfrac{484}{21}\\) cm \\(\\approx 23.0\\) cm.",
      },
      traps: [
        {
          title: "Angle must be in radians for r·θ",
          body:
            "Arc length \\(= r\\theta\\) only when \\(\\theta\\) is in radians. Plugging in \\(60\\) (degrees) instead of \\(\\pi/3\\) gives an answer nearly \\(57\\times\\) too big. Convert first.",
        },
      ],
    },
  ],
};
