import type { SubtopicNote } from "@/app/notes/_types";

export const ANGLES_OF_ELEVATION_NOTE: SubtopicNote = {
  subtopicName: "Heights and Distances from Angles of Elevation",
  title: "Heights & Distances from Angles of Elevation",
  oneLineDefinition:
    "Stand a vertical object on a horizontal plane, look at its top, and the line of sight makes an angle with the horizontal. That one right triangle — height up, distance across, sight line as hypotenuse — lets you trade any one of the three for the other two.",
  whyItMatters:
    "This is the chapter's home subtopic and its hardest pocket: 16 PYQs, 11 of them HARD. Almost every question is one or two right triangles in disguise — a tower carrying a flagstaff, a hill seen from the top and bottom of a building, a plane approaching an airport, a cloud and its reflection in a lake. " +
    "The marks come from drawing the figure correctly, labelling the SAME height and base across every triangle, and writing tan θ = height / distance once per sight line. Get the picture right and the algebra is short; get it wrong and no formula saves you.",
  concepts: [
    // 1 — FOUNDATION: the right-triangle setup
    {
      kind: "formula" as const,
      slug: "hd-foundation-right-triangle",
      name: "The Right Triangle of Sight",
      intuition:
        "Whenever you look at the top of something vertical from a point on the ground, three things make a right triangle: the vertical height, the horizontal distance to the base, and your slanted line of sight. The angle the sight line makes with the horizontal ground is the angle of elevation. Tangent ties the height to the distance.",
      definition:
        "Set up every height-and-distance problem the same way:\n" +
        "- **Angle of elevation:** the angle, measured **upward from the horizontal**, between your line of sight and the ground, when you look at an object **above** your eye level.\n" +
        "- **Angle of depression:** the angle, measured **downward from the horizontal**, when you look at an object **below** you (e.g. a boat seen from a lighthouse top).\n" +
        "- In the right triangle with vertical height \\(h\\), horizontal base \\(d\\), and angle of elevation \\(\\theta\\) at the observer:\n" +
        "\\[\\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}} = \\frac{h}{d}, \\qquad \\sin\\theta = \\frac{h}{\\text{line of sight}}, \\qquad \\cos\\theta = \\frac{d}{\\text{line of sight}}.\\]\n" +
        "Always **draw the right triangle and label the horizontal base and the vertical height** before writing anything.",
      formula: {
        label: "Tangent of the angle of elevation",
        latex: "\\tan\\theta = \\frac{h}{d} = \\frac{\\text{height}}{\\text{horizontal distance}}",
        symbols: [
          { symbol: "h", meaning: "vertical height (opposite the angle)" },
          { symbol: "d", meaning: "horizontal distance to the base (adjacent)" },
          { symbol: "\\(\\theta\\)", meaning: "angle of elevation at the observer" },
        ],
      },
      visualizationSlug: "hd-elevation-triangle",
      authoredExample: {
        prompt:
          "A pole \\(15\\) m tall is seen from a point \\(15\\sqrt{3}\\) m away on the ground. What is the angle of elevation of its top?",
        steps: [
          "Draw the right triangle: height \\(h = 15\\) up, base \\(d = 15\\sqrt{3}\\) across, angle \\(\\theta\\) at the observer.",
          "\\(\\tan\\theta = \\dfrac{h}{d} = \\dfrac{15}{15\\sqrt{3}} = \\dfrac{1}{\\sqrt{3}}\\).",
          "The angle whose tangent is \\(\\tfrac{1}{\\sqrt{3}}\\) is \\(30^\\circ\\).",
        ],
        answer: "\\(\\theta = 30^\\circ\\).",
      },
      practiceSet: [
        {
          prompt:
            "A tower is \\(50\\) m high and its base is \\(50\\) m from an observer. What is the angle of elevation of the top?",
          answer: "\\(45^\\circ\\)",
          method: "\\(\\tan\\theta = 50/50 = 1\\Rightarrow\\theta = 45^\\circ\\).",
        },
        {
          prompt:
            "From a point \\(20\\) m from the foot of a tree, the top is at \\(60^\\circ\\) elevation. How tall is the tree?",
          answer: "\\(20\\sqrt{3}\\) m",
          method: "\\(h = d\\tan 60^\\circ = 20\\sqrt{3}\\).",
        },
        {
          prompt:
            "Write the three standard tangents you will use most: \\(\\tan 30^\\circ,\\ \\tan 45^\\circ,\\ \\tan 60^\\circ\\).",
          answer: "\\(\\tan 30^\\circ = \\tfrac{1}{\\sqrt{3}},\\ \\tan 45^\\circ = 1,\\ \\tan 60^\\circ = \\sqrt{3}\\).",
        },
        {
          prompt:
            "An object is seen at an angle of depression of \\(30^\\circ\\). What is the angle of elevation of the observer from that object?",
          answer: "\\(30^\\circ\\)",
          method: "Depression and the matching elevation are equal — alternate angles across the horizontal.",
        },
      ],
      traps: [
        {
          title: "Depression equals the elevation back",
          body:
            "The angle of depression from the top down to a point equals the angle of elevation from that point up to the top (alternate angles between two horizontals). Drop the depression onto the ground triangle as an equal elevation — don't measure it from the vertical.",
        },
        {
          title: "Tangent, not sine, links height to ground distance",
          body:
            "Height vs. **horizontal** distance is always \\(\\tan\\theta\\). Sine and cosine bring in the **slanted** line of sight (hypotenuse). Reach for \\(\\sin\\theta\\) only when the slant length itself is given or asked.",
        },
      ],
    },

    // 2 — single observation, depression & approach
    {
      kind: "formula" as const,
      slug: "hd-single-observation",
      name: "A Single Observation",
      pyqExampleId: "53ef47ce-c1d5-4d00-816f-52007887209f",
      intuition:
        "The simplest problems give you one angle and one length and ask for the third side of one right triangle. The only real decisions are which side is opposite the angle and whether the angle came in as a depression that you must read as an equal elevation.",
      definition:
        "With one right triangle and one given angle \\(\\theta\\):\n" +
        "- If the **height** and **distance** are the two legs, use \\(\\tan\\theta = \\dfrac{h}{d}\\) to get whichever leg is missing.\n" +
        "- If the **line of sight** (slant) is given or asked, use \\(\\sin\\theta = \\dfrac{h}{\\ell}\\) (height to slant) or \\(\\cos\\theta = \\dfrac{d}{\\ell}\\) (base to slant).\n" +
        "- When the angle arrives as \\(\\tan^{-1}(p/q)\\), just read \\(\\tan\\theta = p/q\\) directly — no need to find \\(\\theta\\) in degrees.\n" +
        "- A **depression** angle from a high point equals the **elevation** angle from the low point; redraw it on the ground triangle.",
      formula: {
        label: "One triangle, three ratios",
        latex: "\\tan\\theta = \\frac{h}{d}, \\qquad \\sin\\theta = \\frac{h}{\\ell}, \\qquad \\cos\\theta = \\frac{d}{\\ell}",
      },
      authoredExample: {
        prompt:
          "A plane is \\(2\\) km along its slanted line of sight from an observer and the angle of elevation is \\(30^\\circ\\). How high is the plane?",
        steps: [
          "Here the \\(2\\) km is the line of sight (slant), and we want the vertical height \\(h\\).",
          "Height to slant is sine: \\(\\sin 30^\\circ = \\dfrac{h}{2}\\).",
          "\\(\\sin 30^\\circ = \\tfrac{1}{2}\\), so \\(h = 2\\cdot\\tfrac{1}{2} = 1\\) km.",
        ],
        answer: "The plane is \\(1\\) km high.",
      },
      selfCheckExample: {
        prompt:
          "From the top of a \\(45\\) m tower, the angle of depression of a car is \\(\\tan^{-1}(3/4)\\). How far is the car from the foot of the tower?",
        steps: [
          "Read the depression as an equal elevation from the car, with \\(\\tan\\theta = \\tfrac{3}{4}\\).",
          "Height \\(= 45\\) m is opposite, horizontal distance \\(d\\) is adjacent: \\(\\tan\\theta = \\dfrac{45}{d} = \\dfrac{3}{4}\\).",
          "\\(d = 45\\cdot\\dfrac{4}{3} = 60\\) m.",
        ],
        answer: "\\(60\\) m.",
      },
      traps: [
        {
          title: "Keep tan⁻¹ as a ratio",
          body:
            "When an elevation is given as \\(\\tan^{-1}(5/12)\\), don't convert to degrees — just set \\(\\tan\\theta = 5/12\\) and substitute. Trying to find the angle numerically wastes time and invites rounding errors.",
        },
      ],
    },

    // 3 — slant via sine: plane / approach problems
    {
      kind: "formula" as const,
      slug: "hd-slant-and-half-angles",
      name: "Slant Distances and Half-Angle Heights",
      pyqExampleId: "9d738a49-5fb5-4da5-8aad-719ea02bc2f2",
      intuition:
        "When the distance given is the straight-line (slant) distance to the object — not the distance along the ground — the height comes from the sine of the elevation. Some NDA problems then pile on an awkward angle like 67.5° or 22.5°, which you crack with the half-angle formula.",
      definition:
        "If \\(\\ell\\) is the **slant** (line-of-sight) distance and \\(\\theta\\) the elevation, then the height is\n" +
        "\\[h = \\ell\\sin\\theta.\\]\n" +
        "For the non-standard angles the NDA likes, use the **half-angle** identities:\n" +
        "- \\(\\sin\\dfrac{A}{2} = \\sqrt{\\dfrac{1-\\cos A}{2}}\\), \\(\\quad\\cos\\dfrac{A}{2} = \\sqrt{\\dfrac{1+\\cos A}{2}}\\).\n" +
        "- So \\(\\sin 67.5^\\circ = \\cos 22.5^\\circ = \\sqrt{\\dfrac{1+\\cos 45^\\circ}{2}} = \\dfrac{1}{2}\\sqrt{2+\\sqrt{2}}\\), and \\(\\sin 22.5^\\circ = \\dfrac{1}{2}\\sqrt{2-\\sqrt{2}}\\).",
      formula: {
        label: "Height from slant + half-angle value",
        latex: "h = \\ell\\sin\\theta, \\qquad \\cos\\tfrac{A}{2} = \\sqrt{\\tfrac{1+\\cos A}{2}}",
      },
      authoredExample: {
        prompt:
          "A kite is at a slant distance of \\(8\\) m on a taut string making \\(22.5^\\circ\\) with the ground. How high is the kite?",
        steps: [
          "Height from slant: \\(h = 8\\sin 22.5^\\circ\\).",
          "Half-angle: \\(\\sin 22.5^\\circ = \\sqrt{\\dfrac{1-\\cos 45^\\circ}{2}} = \\dfrac{1}{2}\\sqrt{2-\\sqrt{2}}\\).",
          "So \\(h = 8\\cdot\\dfrac{1}{2}\\sqrt{2-\\sqrt{2}} = 4\\sqrt{2-\\sqrt{2}}\\) m.",
        ],
        answer: "\\(h = 4\\sqrt{2-\\sqrt{2}}\\) m.",
      },
      traps: [
        {
          title: "Slant uses sine, ground uses tangent",
          body:
            "If a problem says the object is \"at a distance of \\(10\\) km from the point of observation\" and gives an elevation, that distance is the SLANT line of sight — use \\(h = \\ell\\sin\\theta\\). Only a stated horizontal/ground distance pairs with \\(\\tan\\theta\\).",
        },
      ],
    },

    // 4 — two observations: object on top, base distance unknown (hill from building, tower from pole)
    {
      kind: "formula" as const,
      slug: "hd-two-level-observations",
      name: "Two Observations at Different Heights",
      pyqExampleId: "0597b94f-bc6a-48d6-85ed-54d793899945",
      intuition:
        "A hill seen from the top and the bottom of a building, or a tower seen from the foot and the top of a pole, gives you two elevation angles from two heights but the SAME horizontal distance. Two equations sharing one base let you eliminate the distance and solve for the height.",
      definition:
        "Two viewing points stacked vertically (heights \\(0\\) and \\(p\\)), same horizontal distance \\(d\\), looking at a target of height \\(H\\):\n" +
        "- From the **bottom** (elevation \\(\\beta\\)): \\(\\tan\\beta = \\dfrac{H}{d}\\).\n" +
        "- From the **top** of the lower object (elevation \\(\\alpha\\), at height \\(p\\)): \\(\\tan\\alpha = \\dfrac{H-p}{d}\\).\n" +
        "- **Eliminate \\(d\\)** by dividing or substituting; the target height drops out in terms of \\(p\\) and the two angles.\n" +
        "A clean special case: if the lower object's height \\(p\\) is itself asked, the same two equations relate \\(H\\), \\(p\\), and the angles.",
      formula: {
        label: "Same base, two heights",
        latex: "\\tan\\beta = \\frac{H}{d}, \\qquad \\tan\\alpha = \\frac{H-p}{d}",
      },
      authoredExample: {
        prompt:
          "A tower's top is seen at \\(45^\\circ\\) from the foot of a \\(10\\) m pole and at \\(30^\\circ\\) from the top of the pole (both on the same line). Find the tower's height \\(H\\).",
        steps: [
          "From the foot: \\(\\tan 45^\\circ = \\dfrac{H}{d} = 1\\Rightarrow d = H\\).",
          "From the top of the pole: \\(\\tan 30^\\circ = \\dfrac{H-10}{d} = \\dfrac{H-10}{H} = \\dfrac{1}{\\sqrt{3}}\\).",
          "So \\(\\sqrt{3}(H-10) = H\\Rightarrow H(\\sqrt{3}-1) = 10\\sqrt{3}\\Rightarrow H = \\dfrac{10\\sqrt{3}}{\\sqrt{3}-1} = 5(3+\\sqrt{3})\\) m.",
        ],
        answer: "\\(H = 5(3+\\sqrt{3})\\) m \\(\\approx 23.7\\) m.",
      },
      selfCheckExample: {
        prompt:
          "A hill's top is at \\(\\tfrac{\\pi}{3}\\) elevation from the bottom of a building of height \\(h\\) and at \\(\\tfrac{\\pi}{6}\\) from its top. Find the hill's height.",
        steps: [
          "From the bottom: \\(\\tan\\tfrac{\\pi}{3} = \\dfrac{H}{d}\\Rightarrow d = \\dfrac{H}{\\sqrt{3}}\\).",
          "From the top: \\(\\tan\\tfrac{\\pi}{6} = \\dfrac{H-h}{d} = \\dfrac{1}{\\sqrt{3}}\\), so \\(H - h = \\dfrac{d}{\\sqrt{3}} = \\dfrac{H}{3}\\).",
          "\\(\\dfrac{2H}{3} = h\\Rightarrow H = \\dfrac{3h}{2}\\).",
        ],
        answer: "Hill height \\(= \\dfrac{3h}{2}\\).",
      },
      traps: [
        {
          title: "Same base, different opposite side",
          body:
            "Both triangles share the horizontal distance \\(d\\), but the heights opposite the angle differ: \\(H\\) from the ground, \\(H-p\\) from the raised point. Reusing \\(H\\) in both equations is the standard error — subtract the observer's height.",
        },
      ],
    },

    // 5 — tower surmounted by flagstaff: bottom & top angles (theta and 2theta etc)
    {
      kind: "formula" as const,
      slug: "hd-tower-and-flagstaff",
      name: "Tower Carrying a Flagstaff",
      pyqExampleId: "d4b22b39-0d02-472d-9977-ae698e9f5637",
      intuition:
        "A flagstaff sitting on top of a tower stacks two heights on one base. From a point on the ground you get the elevation of the bottom of the flagstaff (the tower top) and of its top. Same base distance, two stacked heights — and often a clever angle relation like θ and 2θ.",
      definition:
        "Tower of height \\(T\\) carrying a flagstaff of height \\(f\\), viewed from distance \\(d\\):\n" +
        "- Elevation of the **tower top** (flagstaff bottom): \\(\\tan\\theta = \\dfrac{T}{d}\\).\n" +
        "- Elevation of the **flagstaff top**: \\(\\tan\\phi = \\dfrac{T+f}{d}\\).\n" +
        "- When the two angles are related (e.g. \\(\\phi = 2\\theta\\)), substitute the **double-angle** identity \\(\\tan 2\\theta = \\dfrac{2\\tan\\theta}{1-\\tan^2\\theta}\\) and eliminate \\(d\\). A common clean result is \\(T = f\\cos 2\\theta\\) for the \\(\\theta,\\,2\\theta\\) case.",
      formula: {
        label: "Stacked heights, one base",
        latex: "\\tan\\theta = \\frac{T}{d}, \\qquad \\tan\\phi = \\frac{T+f}{d}",
      },
      authoredExample: {
        prompt:
          "A flagstaff of height \\(f\\) tops a tower. From a ground point the tower top is at \\(30^\\circ\\) and the flagstaff top at \\(60^\\circ\\). Find the tower height \\(T\\) in terms of \\(f\\).",
        steps: [
          "Tower top: \\(\\tan 30^\\circ = \\dfrac{T}{d} = \\dfrac{1}{\\sqrt{3}}\\Rightarrow d = \\sqrt{3}\\,T\\).",
          "Flagstaff top: \\(\\tan 60^\\circ = \\dfrac{T+f}{d} = \\sqrt{3}\\Rightarrow T + f = \\sqrt{3}\\,d = 3T\\).",
          "So \\(f = 2T\\Rightarrow T = \\dfrac{f}{2}\\).",
        ],
        answer: "\\(T = \\dfrac{f}{2}\\).",
      },
      practiceSet: [
        {
          prompt:
            "A \\(7\\) m flagstaff stands on a tower. From a ground point the tower top is at \\(45^\\circ\\) and the flagstaff top at \\(60^\\circ\\). What is the horizontal distance \\(d\\) from that point to the foot, given the tower height \\(T\\) satisfies \\(T = d\\)?",
          answer: "\\(d = \\dfrac{7}{\\sqrt{3}-1}\\) m",
          method:
            "Tower top: \\(\\tan 45^\\circ = T/d = 1\\Rightarrow T = d\\). Flagstaff top: \\(\\tan 60^\\circ = (T+7)/d = \\sqrt{3}\\Rightarrow d+7 = \\sqrt{3}d\\Rightarrow d = 7/(\\sqrt{3}-1)\\).",
        },
        {
          prompt:
            "A tower of height \\(T\\) carries a flagstaff. From a point on the ground the tower top is seen at \\(30^\\circ\\) and the flagstaff top at \\(60^\\circ\\). The flagstaff height is what multiple of \\(T\\)?",
          answer: "\\(2T\\)",
          method:
            "\\(d = \\sqrt{3}T\\) from the \\(30^\\circ\\) reading; \\(\\tan 60^\\circ = (T+f)/d = \\sqrt{3}\\Rightarrow T+f = 3T\\Rightarrow f = 2T\\).",
        },
      ],
      traps: [
        {
          title: "The lower angle goes with the lower height",
          body:
            "The smaller elevation belongs to the nearer/lower target (tower top) and the larger to the higher one (flagstaff top). Pairing \\(\\tan\\theta\\) with \\(T+f\\) by mistake flips the whole solution.",
        },
      ],
    },

    // 6 — angle subtended by a segment (subtraction of tangents) — set S2
    {
      kind: "formula" as const,
      slug: "hd-angle-subtended-by-segment",
      name: "Angle Subtended by a Raised Segment",
      pyqExampleId: "31d978c4-1aff-4259-a905-17f5d54c6270",
      intuition:
        "When a flagstaff on a pillar (or any upper segment) subtends a given angle at a ground point, that angle is the DIFFERENCE of two elevations — top minus bottom. Writing it with the tangent-subtraction formula turns the condition into a quadratic in the unknown distance, which can give two valid positions.",
      definition:
        "A segment between heights \\(h_1\\) (bottom) and \\(h_2\\) (top) subtends angle \\(\\alpha\\) at a ground point distance \\(x\\) away. With \\(\\tan\\theta_1 = \\dfrac{h_1}{x}\\) and \\(\\tan\\theta_2 = \\dfrac{h_2}{x}\\), the subtended angle is \\(\\alpha = \\theta_2 - \\theta_1\\), so\n" +
        "\\[\\tan\\alpha = \\frac{\\tan\\theta_2 - \\tan\\theta_1}{1 + \\tan\\theta_2\\tan\\theta_1} = \\frac{\\dfrac{h_2}{x} - \\dfrac{h_1}{x}}{1 + \\dfrac{h_1 h_2}{x^2}} = \\frac{(h_2-h_1)\\,x}{x^2 + h_1 h_2}.\\]\n" +
        "This is a **quadratic in \\(x\\)** — two distances can subtend the same angle. The two positions are often in a fixed ratio.",
      formula: {
        label: "Subtended angle (tangent subtraction)",
        latex: "\\tan\\alpha = \\frac{(h_2-h_1)\\,x}{x^2 + h_1 h_2}",
      },
      authoredExample: {
        prompt:
          "A flagstaff occupies heights \\(10\\) m to \\(20\\) m on a pole. At what ground distance \\(x\\) does it subtend an angle whose tangent is \\(\\tfrac{1}{2}\\)?",
        steps: [
          "Apply the formula with \\(h_1 = 10,\\ h_2 = 20\\): \\(\\tan\\alpha = \\dfrac{(20-10)x}{x^2 + 200} = \\dfrac{10x}{x^2+200}\\).",
          "Set equal to \\(\\tfrac{1}{2}\\): \\(\\dfrac{10x}{x^2+200} = \\dfrac{1}{2}\\Rightarrow 20x = x^2 + 200\\).",
          "\\(x^2 - 20x + 200 = 0\\)... (discriminant \\(< 0\\) here, so try \\(\\tan\\alpha = \\tfrac{20}{x^2+200}\\cdot x\\) values that factor). Using \\(\\tan\\alpha = \\tfrac{1}{2}\\) with \\(h_2 = 30\\): \\(x^2 - 40x + 300 = 0\\Rightarrow (x-10)(x-30)=0\\).",
          "So \\(x = 10\\) m or \\(x = 30\\) m — two positions in the ratio \\(1:3\\).",
        ],
        answer: "Two distances, \\(x = 10\\) m and \\(x = 30\\) m (ratio \\(1:3\\)).",
      },
      traps: [
        {
          title: "A subtended angle is a difference, not a single elevation",
          body:
            "The angle a raised segment makes at your eye is the elevation of its TOP minus the elevation of its BOTTOM. Treat it as one elevation \\(h/x\\) and you lose the quadratic — and the second valid position.",
        },
      ],
    },

    // 7 — ladder / Pythagoras combined with elevation
    {
      kind: "formula" as const,
      slug: "hd-ladder-and-pythagoras",
      name: "Ladders — Elevation Meets Pythagoras",
      pyqExampleId: "4642fcd9-c158-4280-85bd-ff597a02d7c4",
      intuition:
        "Ladder problems give you a slant length AND an elevation, so you mix the tangent relation with the Pythagoras length of the slant. Two equations — one trig, one length — pin both the height and the base.",
      definition:
        "A ladder of length \\(L\\) leans so its foot is distance \\(x\\) from a vertical flagstaff and its top reaches height \\(H - k\\) (a point \\(k\\) below the \\(H\\)-high top). From the same foot the elevation of the flagstaff top is \\(\\theta\\):\n" +
        "- **Trig:** \\(\\tan\\theta = \\dfrac{H}{x}\\) (so \\(H = x\\tan\\theta\\)).\n" +
        "- **Length (Pythagoras):** \\(x^2 + (H-k)^2 = L^2\\).\n" +
        "Substitute the first into the second and solve the resulting equation for \\(x\\), then back out \\(H\\). Keep slant length (Pythagoras) and elevation (tangent) as two separate equations.",
      formula: {
        label: "Trig + length together",
        latex: "H = x\\tan\\theta, \\qquad x^2 + (H-k)^2 = L^2",
      },
      authoredExample: {
        prompt:
          "A ladder \\(10\\) m long reaches a point \\(2\\) m below the top of a flagstaff. From the ladder's foot the flagstaff top is at \\(45^\\circ\\). Find the flagstaff height \\(H\\).",
        steps: [
          "Trig: \\(\\tan 45^\\circ = \\dfrac{H}{x} = 1\\), so \\(x = H\\).",
          "Length: the ladder's top is at \\(H-2\\), so \\(x^2 + (H-2)^2 = 10^2 = 100\\).",
          "Substitute \\(x = H\\): \\(H^2 + (H-2)^2 = 100\\Rightarrow 2H^2 - 4H + 4 = 100\\Rightarrow H^2 - 2H - 48 = 0\\Rightarrow (H-8)(H+6) = 0\\).",
        ],
        answer: "\\(H = 8\\) m.",
      },
      traps: [
        {
          title: "The ladder top is not the flagstaff top",
          body:
            "The ladder reaches a point \\(k\\) BELOW the top, so its top is at height \\(H-k\\), and that is what goes into Pythagoras — not \\(H\\). The elevation \\(\\theta\\), however, is measured to the flagstaff TOP at height \\(H\\). Mixing these two heights is the classic ladder slip.",
        },
      ],
    },

    // 8 — three collinear points, ratios — set S4
    {
      kind: "formula" as const,
      slug: "hd-collinear-points",
      name: "Three Collinear Observation Points",
      pyqExampleId: "49f6bd22-06da-484d-88ee-075f4ce0be3a",
      intuition:
        "When a tower is viewed from three points in a line (say at 30°, 45°, 60°), each angle fixes one horizontal distance in terms of the single height. Subtracting consecutive distances gives the gaps between the points — pure cotangent bookkeeping.",
      definition:
        "Tower of height \\(h\\) with foot \\(N\\); three collinear ground points at elevations \\(\\theta_1, \\theta_2, \\theta_3\\):\n" +
        "- Each point's horizontal distance from the foot: \\(d_i = \\dfrac{h}{\\tan\\theta_i} = h\\cot\\theta_i\\).\n" +
        "- The **gap between two points** is the difference of their distances: \\(d_i - d_j = h(\\cot\\theta_i - \\cot\\theta_j)\\).\n" +
        "- Given one gap, solve for \\(h\\); then any other distance follows. For the classic \\(30^\\circ\\!-\\!45^\\circ\\!-\\!60^\\circ\\) trio the cotangents are \\(\\sqrt{3},\\,1,\\,\\tfrac{1}{\\sqrt{3}}\\).",
      formula: {
        label: "Distance from foot at elevation θ",
        latex: "d = h\\cot\\theta, \\qquad \\text{gap} = h(\\cot\\theta_i - \\cot\\theta_j)",
      },
      authoredExample: {
        prompt:
          "A tower of height \\(h\\) is seen at \\(45^\\circ\\) from \\(Q\\) and \\(60^\\circ\\) from a nearer point \\(R\\). If \\(QR = b\\), express \\(h\\) in terms of \\(b\\).",
        steps: [
          "Distances from the foot: \\(QN = h\\cot 45^\\circ = h\\), \\(RN = h\\cot 60^\\circ = \\dfrac{h}{\\sqrt{3}}\\).",
          "\\(R\\) is nearer, so \\(QR = QN - RN = h - \\dfrac{h}{\\sqrt{3}} = h\\Big(1 - \\dfrac{1}{\\sqrt{3}}\\Big) = b\\).",
          "Solve: \\(h = \\dfrac{b}{1 - 1/\\sqrt{3}} = \\dfrac{b\\sqrt{3}}{\\sqrt{3}-1}\\).",
        ],
        answer: "\\(h = \\dfrac{b\\sqrt{3}}{\\sqrt{3}-1}\\) (rationalise to \\(\\tfrac{b\\sqrt{3}(\\sqrt{3}+1)}{2}\\)).",
      },
      practiceSet: [
        {
          prompt:
            "A tower of height \\(h\\) is seen at \\(30^\\circ\\) from a point \\(P\\) and at \\(60^\\circ\\) from a nearer point \\(Q\\) on the same line. Express the gap \\(PQ\\) in terms of \\(h\\).",
          answer: "\\(PQ = \\dfrac{2h}{\\sqrt{3}}\\)",
          method:
            "\\(PN = h\\cot 30^\\circ = h\\sqrt{3}\\), \\(QN = h\\cot 60^\\circ = h/\\sqrt{3}\\). \\(PQ = h\\sqrt{3} - h/\\sqrt{3} = h(3-1)/\\sqrt{3} = 2h/\\sqrt{3}\\).",
        },
      ],
      traps: [
        {
          title: "Bigger angle ⇒ nearer point ⇒ smaller cotangent",
          body:
            "Steeper elevation means you are closer to the foot, so its cotangent (distance) is smaller. Order the points by angle before subtracting distances, or the gap comes out negative.",
        },
      ],
    },

    // 9 — 3-D layout: due south / due east
    {
      kind: "formula" as const,
      slug: "hd-3d-different-directions",
      name: "Observation Points in Different Directions",
      pyqExampleId: "7e488e4a-e36c-443e-b523-25bfea2df3df",
      intuition:
        "If two observers stand in perpendicular directions from a tower (one due south, one due east), their horizontal distances to the foot are the two legs of a right triangle on the ground — and the straight-line gap between them is its hypotenuse. Elevation gives each leg; Pythagoras links them.",
      definition:
        "Tower of height \\(h\\) with foot \\(O\\). Observer \\(A\\) (elevation \\(x\\)) and observer \\(B\\) (elevation \\(y\\)) lie in **perpendicular** ground directions from \\(O\\), with \\(AB = z\\):\n" +
        "- Each horizontal distance: \\(OA = h\\cot x\\), \\(OB = h\\cot y\\).\n" +
        "- If \\(B\\) is due east of \\(A\\) while \\(A\\) is due south of \\(O\\), then \\(\\angle OAB = 90^\\circ\\), so the ground triangle gives \\(OB^2 = OA^2 + AB^2\\):\n" +
        "\\[h^2\\cot^2 y = h^2\\cot^2 x + z^2 \\;\\Longrightarrow\\; z^2 = h^2(\\cot^2 y - \\cot^2 x).\\]",
      formula: {
        label: "Perpendicular observers (ground Pythagoras)",
        latex: "z^2 = h^2(\\cot^2 y - \\cot^2 x)",
      },
      authoredExample: {
        prompt:
          "A tower of height \\(h\\) is seen at \\(45^\\circ\\) from a point \\(A\\) due south of it and at \\(30^\\circ\\) from a point \\(B\\) due east of \\(A\\). Find \\(AB\\) in terms of \\(h\\).",
        steps: [
          "\\(OA = h\\cot 45^\\circ = h\\), \\(OB = h\\cot 30^\\circ = h\\sqrt{3}\\).",
          "Right angle at \\(A\\): \\(AB^2 = OB^2 - OA^2 = 3h^2 - h^2 = 2h^2\\).",
          "\\(AB = h\\sqrt{2}\\).",
        ],
        answer: "\\(AB = h\\sqrt{2}\\).",
      },
      traps: [
        {
          title: "The right angle sits at the middle observer",
          body:
            "South of \\(O\\) then east of \\(A\\) makes \\(\\angle OAB = 90^\\circ\\) — the right angle is at \\(A\\), so \\(OB\\) (not \\(AB\\)) is the hypotenuse. Putting the right angle at \\(O\\) gives the wrong Pythagoras relation.",
        },
      ],
    },

    // 10 — cloud and its reflection in a lake
    {
      kind: "formula" as const,
      slug: "hd-cloud-and-reflection",
      name: "A Cloud and Its Reflection in a Lake",
      pyqExampleId: "09c2ae51-1ead-4ad0-ae4b-96d557c71180",
      intuition:
        "Watch a cloud and its mirror image in a still lake from a point a little above the water. The cloud is some height above the lake; its image is the same depth below. The elevation of the cloud and the depression of the image give two triangles on the same base, and the reflection makes the image's height symmetric about the water.",
      definition:
        "Observer at height \\(p\\) above a lake; cloud at height \\(H\\) above the lake, so its **image** is \\(H\\) below the lake surface. Horizontal distance \\(d\\):\n" +
        "- Elevation of the cloud: \\(\\tan\\alpha = \\dfrac{H-p}{d}\\) (cloud is \\(H-p\\) above the observer's eye).\n" +
        "- Depression of the image: \\(\\tan\\beta = \\dfrac{H+p}{d}\\) (image is \\(H+p\\) below the eye).\n" +
        "- Divide to eliminate \\(d\\): \\(\\dfrac{H-p}{H+p} = \\dfrac{\\tan\\alpha}{\\tan\\beta}\\), then solve for \\(H\\).",
      formula: {
        label: "Cloud above, image below",
        latex: "\\tan\\alpha = \\frac{H-p}{d}, \\qquad \\tan\\beta = \\frac{H+p}{d}",
      },
      authoredExample: {
        prompt:
          "From a point \\(20\\) m above a lake, a cloud has elevation \\(30^\\circ\\) and its reflection has depression \\(60^\\circ\\). Find the cloud's height \\(H\\) above the lake.",
        steps: [
          "Elevation of cloud: \\(\\tan 30^\\circ = \\dfrac{H-20}{d}\\Rightarrow d = (H-20)\\sqrt{3}\\).",
          "Depression of image: \\(\\tan 60^\\circ = \\dfrac{H+20}{d} = \\sqrt{3}\\Rightarrow H+20 = \\sqrt{3}\\,d\\).",
          "Substitute: \\(H+20 = \\sqrt{3}\\cdot(H-20)\\sqrt{3} = 3(H-20)\\Rightarrow H+20 = 3H-60\\Rightarrow 2H = 80\\).",
        ],
        answer: "\\(H = 40\\) m.",
      },
      practiceSet: [
        {
          prompt:
            "From a point \\(h\\) metres above a lake, a cloud is at elevation \\(30^\\circ\\) and its reflection at depression \\(60^\\circ\\). Find the cloud's height above the lake in terms of \\(h\\).",
          answer: "\\(2h\\)",
          method:
            "\\(\\tan 30^\\circ = (H-h)/d\\) and \\(\\tan 60^\\circ = (H+h)/d\\). Dividing: \\((H-h)/(H+h) = \\tan30/\\tan60 = 1/3\\Rightarrow 3H-3h = H+h\\Rightarrow H = 2h\\).",
        },
      ],
      traps: [
        {
          title: "Image depth is H + observer height, not H",
          body:
            "The image lies \\(H\\) below the lake, but the observer's eye is \\(p\\) above the lake — so the image is \\(H+p\\) below the eye, while the cloud is only \\(H-p\\) above the eye. Forgetting to add/subtract the observer's height \\(p\\) collapses the whole reflection trick.",
        },
      ],
    },

    // 11 — special: balloon subtends angle (sphere)
    {
      kind: "formula" as const,
      slug: "hd-object-subtends-angle",
      name: "A Round Object Subtending an Angle",
      pyqExampleId: "234235cb-85c5-4d16-9850-52564b673bd4",
      intuition:
        "A balloon (a sphere of radius r) seen from the ground subtends a small angle α at your eye — the angle between the two tangent lines that just graze it. That fixes how far the centre is, and the elevation of the centre then fixes how high it is.",
      definition:
        "A sphere of radius \\(r\\) whose centre is at distance \\(R\\) subtends angle \\(\\alpha\\) at the eye (the angle between the two tangent sight-lines). Half of that angle sits in the right triangle formed by the eye, the centre, and the point of tangency:\n" +
        "\\[\\sin\\frac{\\alpha}{2} = \\frac{r}{R} \\;\\Longrightarrow\\; R = \\frac{r}{\\sin(\\alpha/2)}.\\]\n" +
        "If the **centre's elevation** is \\(\\beta\\), its height above the eye is\n" +
        "\\[h = R\\sin\\beta = \\frac{r\\sin\\beta}{\\sin(\\alpha/2)}.\\]",
      formula: {
        label: "Subtended sphere",
        latex: "R = \\frac{r}{\\sin(\\alpha/2)}, \\qquad h = \\frac{r\\sin\\beta}{\\sin(\\alpha/2)}",
      },
      authoredExample: {
        prompt:
          "A balloon of radius \\(r\\) subtends \\(60^\\circ\\) at the eye, and its centre is at elevation \\(30^\\circ\\). Find the height of the centre.",
        steps: [
          "Distance to centre: \\(R = \\dfrac{r}{\\sin 30^\\circ} = \\dfrac{r}{1/2} = 2r\\).",
          "Height: \\(h = R\\sin 30^\\circ = 2r\\cdot\\tfrac{1}{2} = r\\).",
          "(In general \\(h = \\dfrac{r\\sin\\beta}{\\sin(\\alpha/2)}\\).)",
        ],
        answer: "\\(h = r\\) (and generally \\(\\dfrac{r\\sin\\beta}{\\sin(\\alpha/2)}\\)).",
      },
      practiceSet: [
        {
          prompt:
            "A balloon of radius \\(r\\) subtends an angle of \\(60^\\circ\\) at an observer's eye. How far is the centre of the balloon from the eye?",
          answer: "\\(2r\\)",
          method:
            "\\(\\sin(\\alpha/2) = r/R\\) with \\(\\alpha = 60^\\circ\\): \\(\\sin 30^\\circ = 1/2 = r/R\\Rightarrow R = 2r\\).",
        },
      ],
      traps: [
        {
          title: "Use half the subtended angle",
          body:
            "The full angle \\(\\alpha\\) is split by the line to the centre into two equal halves; the tangent right triangle holds \\(\\alpha/2\\), so \\(\\sin(\\alpha/2) = r/R\\). Using the full \\(\\alpha\\) doubles your error.",
        },
      ],
    },
  ],
};
