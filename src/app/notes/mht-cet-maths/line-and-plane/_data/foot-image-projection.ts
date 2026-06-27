import type { SubtopicNote } from "@/app/notes/_types";

export const FOOT_IMAGE_PROJECTION_NOTE: SubtopicNote = {
  subtopicName: "Foot of Perpendicular, Image, and Projection",
  title: "Foot of Perpendicular, Image, and Projection",
  oneLineDefinition:
    "One engine drives this whole subtopic: drop a perpendicular from a point to a line or a plane, locate its FOOT, and then either report the foot, double it across to get the mirror image (2F − P), or use a dot product to read off a projection length.",
  whyItMatters:
    "Every MHT-CET PYQ here reduces to the same first move — find the foot of the perpendicular by writing a parametric point and forcing perpendicularity. Once you have the foot, the question is just choosing what to do with it: report it (foot questions), reflect through it as 2F − P (mirror-image questions), or skip it entirely and dot-product (projection questions). " +
    "Across the 16 PYQs the mix runs MODERATE-to-HARD, and several appear two or three times across different papers (the (5,−1,4)/(4,−1,3)-on-x+y+z=7 projection alone shows up three times) — so the patterns are stable and high-yield. " +
    "Master the foot-finding routine first; image and projection are one extra line each on top of it.",
  concepts: [
    // ── CONCEPT 1 — FOUNDATION ENGINE: foot on a line ────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-foot-perpendicular-line",
      name: "Foot of the perpendicular from a point to a line",
      visualizationSlug: "lines-distance-point-line",
      intuition:
        "Walk along the line with a parameter \\(\\lambda\\): every point on it is \\(\\vec{a} + \\lambda\\vec{d}\\). The foot \\(F\\) is the one special point where the segment from your external point \\(P\\) meets the line at a right angle. So you have ONE unknown (\\(\\lambda\\)) and ONE condition (\\(\\overrightarrow{PF}\\cdot\\vec{d} = 0\\)) — solve, substitute, done.",
      definition:
        "Write the line as \\(\\vec{r} = \\vec{a} + \\lambda\\vec{d}\\) (or in symmetric form \\(\\frac{x-x_0}{a} = \\frac{y-y_0}{b} = \\frac{z-z_0}{c} = \\lambda\\)). Then:\n" +
        "- **Parametric foot:** the foot is \\(F = \\vec{a} + \\lambda\\vec{d}\\), a single point depending on \\(\\lambda\\).\n" +
        "- **Perpendicularity condition:** \\(\\overrightarrow{PF}\\cdot\\vec{d} = 0\\), where \\(\\overrightarrow{PF} = F - P\\). This is **one linear equation in \\(\\lambda\\)** — solve it.\n" +
        "- **Substitute back** the \\(\\lambda\\) you found into \\(F = \\vec{a} + \\lambda\\vec{d}\\) to get the coordinates.",
      formula: {
        label: "Foot on a line",
        latex:
          "F = \\vec{a} + \\lambda\\vec{d}, \\qquad \\overrightarrow{PF}\\cdot\\vec{d} = 0 \\;\\Rightarrow\\; \\lambda",
        symbols: [
          { symbol: "\\(\\vec{a}\\)", meaning: "a fixed point on the line" },
          { symbol: "\\(\\vec{d}\\)", meaning: "direction vector of the line" },
          { symbol: "\\(P\\)", meaning: "the external point" },
          { symbol: "\\(\\overrightarrow{PF}\\)", meaning: "\\(F - P\\), must be perpendicular to \\(\\vec{d}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the foot of the perpendicular from \\(P(1,0,2)\\) to the line \\(\\vec{r} = (2\\hat{i} + 3\\hat{k}) + \\lambda(\\hat{i} + 2\\hat{j} + 2\\hat{k})\\).",
        steps: [
          "General point on the line: \\(F = (2+\\lambda,\\; 2\\lambda,\\; 3+2\\lambda)\\).",
          "\\(\\overrightarrow{PF} = F - P = (1+\\lambda,\\; 2\\lambda,\\; 1+2\\lambda)\\).",
          "Set \\(\\overrightarrow{PF}\\cdot\\vec{d} = 0\\) with \\(\\vec{d} = (1,2,2)\\): \\((1+\\lambda) + 2(2\\lambda) + 2(1+2\\lambda) = 0\\Rightarrow 3 + 9\\lambda = 0\\Rightarrow \\lambda = -\\tfrac{1}{3}\\).",
          "Substitute: \\(F = \\left(2-\\tfrac{1}{3},\\; -\\tfrac{2}{3},\\; 3-\\tfrac{2}{3}\\right) = \\left(\\tfrac{5}{3},\\; -\\tfrac{2}{3},\\; \\tfrac{7}{3}\\right)\\).",
        ],
        answer: "\\(F = \\left(\\dfrac{5}{3},\\; -\\dfrac{2}{3},\\; \\dfrac{7}{3}\\right)\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the foot of the perpendicular from \\((1,2,3)\\) to the line \\(\\vec{r} = (6\\hat{i} + 7\\hat{j} + 7\\hat{k}) + \\lambda(3\\hat{i} + 2\\hat{j} - 2\\hat{k})\\).",
        steps: [
          "General point: \\(F = (6+3\\lambda,\\; 7+2\\lambda,\\; 7-2\\lambda)\\).",
          "\\(\\overrightarrow{PF} = (5+3\\lambda,\\; 5+2\\lambda,\\; 4-2\\lambda)\\).",
          "\\(\\overrightarrow{PF}\\cdot(3,2,-2) = 0\\): \\(3(5+3\\lambda) + 2(5+2\\lambda) - 2(4-2\\lambda) = 17 + 17\\lambda = 0\\Rightarrow \\lambda = -1\\).",
          "Substitute: \\(F = (6-3,\\; 7-2,\\; 7+2) = (3,5,9)\\).",
        ],
        answer: "\\((3,5,9)\\)",
      },
      practiceSet: [
        { prompt: "How many unknowns and conditions does foot-on-a-line have?", answer: "one unknown \\(\\lambda\\), one condition \\(\\overrightarrow{PF}\\cdot\\vec{d}=0\\)" },
        { prompt: "Line point \\((\\lambda,\\,2\\lambda,\\,0)\\), \\(\\vec{d}=(1,2,0)\\), \\(P=(0,0,0)\\). What is \\(\\lambda\\)?", answer: "\\(0\\)", method: "\\(\\overrightarrow{PF}\\cdot\\vec d = 5\\lambda = 0\\)" },
        { prompt: "What direction is \\(\\overrightarrow{PF}\\) perpendicular to at the foot?", answer: "the line's direction \\(\\vec{d}\\)" },
        { prompt: "After solving for \\(\\lambda\\), what is the last step?", answer: "substitute \\(\\lambda\\) back into \\(F = \\vec{a} + \\lambda\\vec{d}\\)" },
      ],
      pyqExampleId: "aa23ace4-3f07-46af-84c7-bac3fa1bd742",
      traps: [
        {
          title: "Perpendicularity is \\(\\overrightarrow{PF}\\cdot\\vec{d}=0\\), NOT \\(\\overrightarrow{PF} = \\vec{d}\\)",
          body:
            "You only need the dot product of the connecting segment with the line's direction to vanish — that gives one equation in one unknown. Do not try to force the whole vector \\(\\overrightarrow{PF}\\) to equal or be parallel to anything.",
        },
        {
          title: "Use the symmetric form's parameter consistently",
          body:
            "For \\(\\frac{x+3}{5} = \\frac{y+1}{2} = \\frac{z+4}{3} = \\lambda\\), the point is \\((5\\lambda-3,\\,2\\lambda-1,\\,3\\lambda-4)\\) — the fixed point comes from setting each numerator to 0, the multipliers \\((5,2,3)\\) are the direction. Mixing up which is which scrambles the sign of every coordinate (option B/C/D in these PYQs are exactly the sign-flipped traps).",
        },
        {
          title: "Don't forget to substitute back",
          body:
            "Finding \\(\\lambda\\) is the middle of the problem, not the end. The answer is the coordinate \\(\\vec{a} + \\lambda\\vec{d}\\); a half-finished solution that reports \\(\\lambda\\) itself is a guaranteed wrong option.",
        },
      ],
    },

    // ── CONCEPT 2 — foot on a plane ──────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-foot-perpendicular-plane",
      name: "Foot of the perpendicular from a point to a plane",
      visualizationSlug: "plane-with-normal",
      intuition:
        "Drop straight down from \\(P\\) onto the plane — you travel along the plane's NORMAL. So shoot a line out of \\(P\\) in the direction of the normal \\(\\vec{n}\\), march by a parameter \\(t\\), and stop the instant you hit the plane. The point where that line pierces the plane is the foot.",
      definition:
        "For a plane \\(ax + by + cz + d = 0\\) the normal is \\(\\vec{n} = (a,b,c)\\). From \\(P(x_1,y_1,z_1)\\):\n" +
        "- **Normal-parametric line:** \\((x,y,z) = (x_1 + at,\\; y_1 + bt,\\; z_1 + ct)\\).\n" +
        "- **Hit the plane:** substitute these into \\(ax + by + cz + d = 0\\) — one linear equation in \\(t\\). Solve for \\(t\\).\n" +
        "- **Foot:** put that \\(t\\) back into the parametric point.\n\n" +
        "Compactly, \\(t = -\\dfrac{ax_1 + by_1 + cz_1 + d}{a^2 + b^2 + c^2}\\), and \\(F = P + t\\,\\vec{n}\\).",
      formula: {
        label: "Foot on a plane",
        latex:
          "F = P + t\\,\\vec{n}, \\qquad t = -\\dfrac{ax_1 + by_1 + cz_1 + d}{a^2 + b^2 + c^2}",
        symbols: [
          { symbol: "\\(\\vec{n} = (a,b,c)\\)", meaning: "normal to the plane \\(ax+by+cz+d=0\\)" },
          { symbol: "\\(t\\)", meaning: "how far along the normal to reach the plane" },
          { symbol: "\\(F\\)", meaning: "foot of the perpendicular on the plane" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the foot of the perpendicular from \\(P(-1,1,2)\\) to the plane \\(2x - 3y + z - 11 = 0\\).",
        steps: [
          "Normal \\(\\vec{n} = (2,-3,1)\\). Line from \\(P\\): \\((x,y,z) = (-1+2t,\\; 1-3t,\\; 2+t)\\).",
          "Substitute into the plane: \\(2(-1+2t) - 3(1-3t) + (2+t) - 11 = 0\\).",
          "Simplify: \\(-2+4t - 3+9t + 2+t - 11 = 14t - 14 = 0\\Rightarrow t = 1\\).",
          "Foot: \\((-1+2,\\; 1-3,\\; 2+1) = (1,-2,3)\\).",
        ],
        answer: "\\(F = (1,-2,3)\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the foot of the perpendicular from \\(P(1,1,1)\\) to the plane \\(x + 2y + 2z - 9 = 0\\).",
        steps: [
          "Normal \\(\\vec{n} = (1,2,2)\\), \\(|\\vec{n}|^2 = 9\\). Line: \\((1+t,\\; 1+2t,\\; 1+2t)\\).",
          "Substitute: \\((1+t) + 2(1+2t) + 2(1+2t) - 9 = 9t - 4 = 0\\Rightarrow t = \\tfrac{4}{9}\\).",
          "Foot: \\(\\left(1+\\tfrac{4}{9},\\; 1+\\tfrac{8}{9},\\; 1+\\tfrac{8}{9}\\right) = \\left(\\tfrac{13}{9},\\; \\tfrac{17}{9},\\; \\tfrac{17}{9}\\right)\\).",
        ],
        answer: "\\(\\left(\\dfrac{13}{9},\\; \\dfrac{17}{9},\\; \\dfrac{17}{9}\\right)\\)",
      },
      practiceSet: [
        { prompt: "Which direction do you travel from \\(P\\) to reach the foot on a plane?", answer: "along the plane's normal \\(\\vec{n} = (a,b,c)\\)" },
        { prompt: "Plane \\(x+y+z=0\\), \\(P=(1,1,1)\\). Find \\(t\\).", answer: "\\(t = -1\\)", method: "\\(t = -\\frac{3}{3}\\)" },
        { prompt: "How do you find \\(t\\) once the normal line is written?", answer: "substitute the parametric point into the plane equation" },
        { prompt: "Foot formula in one line?", answer: "\\(F = P + t\\,\\vec{n}\\)" },
      ],
      pyqExampleId: "7bd47413-0b68-4188-8096-dc1a739ab265",
      traps: [
        {
          title: "Carry the constant \\(d\\) with its correct sign",
          body:
            "Write the plane as \\(ax+by+cz+d=0\\) first. For \\(2x-3y+z = 11\\) that is \\(d = -11\\), so \\(t = -\\frac{(\\cdots) - 11}{14}\\). Dropping the sign of \\(d\\) is the single most common foot-on-plane arithmetic slip.",
        },
        {
          title: "Divide by \\(a^2+b^2+c^2\\), not by \\(\\sqrt{a^2+b^2+c^2}\\)",
          body:
            "The parameter \\(t\\) uses \\(|\\vec{n}|^2\\) in the denominator (the distance formula's \\(\\sqrt{}\\) appears only for actual distances, not for \\(t\\)). For \\(\\vec{n} = (2,-3,1)\\) use \\(14\\), never \\(\\sqrt{14}\\).",
        },
      ],
    },

    // ── CONCEPT 3 — mirror image in a plane (foot then 2F − P) ───────────────
    {
      kind: "formula" as const,
      slug: "cetlp-mirror-image-plane",
      name: "Mirror image of a point in a plane",
      visualizationSlug: "inverse-reflection-line",
      intuition:
        "The plane is a mirror. The foot \\(F\\) is exactly halfway between \\(P\\) and its image \\(P'\\) — so once you have the foot, the image is just \\(P\\) reflected through \\(F\\): step the same distance past the mirror. Since \\(F\\) is the midpoint of \\(PP'\\), \\(P' = 2F - P\\).",
      definition:
        "Reflecting a point in a plane is **foot-on-a-plane plus one reflection step**:\n" +
        "- **Step 1 — find the foot** \\(F = P + t\\,\\vec{n}\\) using \\(t = -\\dfrac{ax_1+by_1+cz_1+d}{a^2+b^2+c^2}\\) (Concept 2).\n" +
        "- **Step 2 — reflect:** \\(F\\) is the midpoint of \\(P\\) and \\(P'\\), so \\(P' = 2F - P\\).\n\n" +
        "A useful shortcut: since \\(P' = 2F - P = P + 2t\\,\\vec{n}\\), the image is reached by going **twice as far** along the normal as the foot.",
      formula: {
        label: "Image in a plane",
        latex:
          "P' = 2F - P = P + 2t\\,\\vec{n}, \\qquad t = -\\dfrac{ax_1+by_1+cz_1+d}{a^2+b^2+c^2}",
        symbols: [
          { symbol: "\\(F\\)", meaning: "foot of perpendicular (midpoint of \\(PP'\\))" },
          { symbol: "\\(P'\\)", meaning: "mirror image of \\(P\\) in the plane" },
          { symbol: "\\(2t\\,\\vec{n}\\)", meaning: "twice the foot's displacement along the normal" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the mirror image of \\(P(2,4,-1)\\) in the plane \\(x - y + 2z - 2 = 0\\), and hence \\(a+b+c\\) where the image is \\((a,b,c)\\).",
        steps: [
          "Normal \\(\\vec{n} = (1,-1,2)\\), \\(|\\vec{n}|^2 = 6\\). Line: \\((2+t,\\; 4-t,\\; -1+2t)\\).",
          "Substitute into the plane: \\((2+t) - (4-t) + 2(-1+2t) - 2 = 6t - 6 = 0\\Rightarrow t = 1\\).",
          "Foot \\(F = (3,3,1)\\).",
          "Image \\(P' = 2F - P = (6-2,\\; 6-4,\\; 2-(-1)) = (4,2,3)\\). So \\(a+b+c = 9\\).",
        ],
        answer: "Image \\((4,2,3)\\), \\(a+b+c = 9\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the image of \\(R(2,1,6)\\) in the plane \\(x + y - 2z - 3 = 0\\).",
        steps: [
          "Normal \\(\\vec{n} = (1,1,-2)\\), \\(|\\vec{n}|^2 = 6\\). \\(t = -\\dfrac{2 + 1 - 12 - 3}{6} = -\\dfrac{-12}{6} = 2\\).",
          "Image \\(R' = R + 2t\\,\\vec{n} = (2,1,6) + 4(1,1,-2) = (6,5,-2)\\).",
        ],
        answer: "\\((6,5,-2)\\)",
      },
      practiceSet: [
        { prompt: "If \\(F\\) is the foot, the image is \\(P' = ?\\)", answer: "\\(2F - P\\)" },
        { prompt: "What point is \\(F\\) relative to \\(P\\) and \\(P'\\)?", answer: "the midpoint of \\(PP'\\)" },
        { prompt: "Foot is \\((3,3,1)\\), \\(P=(2,4,-1)\\). Image?", answer: "\\((4,2,3)\\)", method: "\\(2F - P\\)" },
        { prompt: "In terms of the normal step \\(t\\,\\vec{n}\\), the image is reached by going how far?", answer: "\\(2t\\,\\vec{n}\\) — twice the foot's displacement" },
      ],
      pyqExampleId: "7034b935-1277-4c42-b66e-ac89096b148d",
      traps: [
        {
          title: "Image is \\(2F - P\\), the foot is only halfway",
          body:
            "A very common error is to report the FOOT as the answer to an image question. The foot is the midpoint; you must step the same distance again: \\(P' = 2F - P\\). The foot's coordinates are usually one of the distractor options.",
        },
        {
          title: "\\(2F - P\\), not \\(F - 2P\\) or \\(2P - F\\)",
          body:
            "From midpoint \\(F = \\tfrac{P + P'}{2}\\) you solve \\(P' = 2F - P\\) — twice the foot minus the original point. Swapping the roles of \\(F\\) and \\(P\\) gives a reflection on the wrong side.",
        },
      ],
    },

    // ── CONCEPT 4 — mirror image in a line (incl. backward find a,b) ─────────
    {
      kind: "formula" as const,
      slug: "cetlp-mirror-image-line",
      name: "Mirror image of a point in a line",
      intuition:
        "Same midpoint idea as the plane case, but now the mirror is a LINE. First find the foot \\(F\\) on the line (Concept 1), then reflect: \\(P' = 2F - P\\). The HARD MHT-CET twist runs it backward — you're TOLD the image and asked for an unknown coordinate \\(a\\) or \\(b\\) — but the same relation \\(F = \\tfrac{P + P'}{2}\\) lying on the line is all you need.",
      definition:
        "To reflect \\(P\\) in a line \\(\\vec{r} = \\vec{a} + \\lambda\\vec{d}\\):\n" +
        "- **Step 1 — foot:** \\(F = \\vec{a} + \\lambda\\vec{d}\\) with \\(\\overrightarrow{PF}\\cdot\\vec{d} = 0\\) (Concept 1).\n" +
        "- **Step 2 — reflect:** \\(P' = 2F - P\\).\n\n" +
        "**Backward (\"find \\(a,b\\)\") variant:** you are given \\(P\\) and its image \\(P'\\) in terms of unknowns. Two facts pin the unknowns down:\n" +
        "- the **midpoint** \\(\\tfrac{P + P'}{2}\\) lies on the line (its coordinates satisfy the symmetric equation), and\n" +
        "- the **segment** \\(\\overrightarrow{PP'}\\) is perpendicular to \\(\\vec{d}\\) (i.e. \\(\\overrightarrow{PP'}\\cdot\\vec{d} = 0\\)).\n\n" +
        "Solve the resulting equations for the unknowns.",
      formula: {
        label: "Image in a line (forward and backward)",
        latex:
          "P' = 2F - P; \\qquad \\text{midpoint } \\tfrac{P+P'}{2} \\in \\text{line}, \\;\\; \\overrightarrow{PP'}\\cdot\\vec{d} = 0",
        symbols: [
          { symbol: "\\(F\\)", meaning: "foot of perpendicular on the line" },
          { symbol: "\\(P'\\)", meaning: "mirror image of \\(P\\) in the line" },
          { symbol: "\\(\\overrightarrow{PP'}\\)", meaning: "\\(P' - P\\), perpendicular to the line direction" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the mirror image of \\(P(0,0,0)\\) in the line \\(\\vec{r} = \\lambda(\\hat{i} + \\hat{j} + \\hat{k})\\).",
        steps: [
          "Foot: \\(F = (\\lambda,\\lambda,\\lambda)\\), \\(\\overrightarrow{PF} = (\\lambda,\\lambda,\\lambda)\\).",
          "But \\(P\\) is the origin and the line passes through the origin, so \\(\\overrightarrow{PF}\\cdot(1,1,1) = 3\\lambda = 0\\Rightarrow \\lambda = 0\\); foot \\(F = (0,0,0)\\).",
          "Image \\(P' = 2F - P = (0,0,0)\\) — the point is on the line, so it is its own image.",
        ],
        answer: "\\(P' = (0,0,0)\\) (the point lies on the line)",
      },
      selfCheckExample: {
        prompt:
          "If the mirror image of \\(P(a,6,9)\\) in the line \\(\\frac{x-3}{7} = \\frac{y-2}{5} = \\frac{z-1}{-9}\\) is \\((20,b,-a-9)\\), find \\(|a+b|\\).",
        steps: [
          "The midpoint \\(M = \\left(\\tfrac{a+20}{2},\\; \\tfrac{6+b}{2},\\; \\tfrac{9 + (-a-9)}{2}\\right) = \\left(\\tfrac{a+20}{2},\\; \\tfrac{6+b}{2},\\; -\\tfrac{a}{2}\\right)\\) lies on the line.",
          "Also \\(\\overrightarrow{PP'} = (20 - a,\\; b - 6,\\; -a - 18)\\) is perpendicular to \\((7,5,-9)\\): \\(7(20-a) + 5(b-6) - 9(-a-18) = 0\\).",
          "Imposing the midpoint-on-line equations together with the perpendicularity gives the linear system whose solution is \\(a = -56,\\; b = -32\\).",
          "\\(|a+b| = |-56 - 32| = 88\\).",
        ],
        answer: "\\(|a+b| = 88\\)",
      },
      practiceSet: [
        { prompt: "Image of \\(P\\) in a line, given foot \\(F\\)?", answer: "\\(2F - P\\)" },
        { prompt: "In the backward variant, the midpoint of \\(PP'\\) must satisfy what?", answer: "the line's (symmetric) equation — it lies on the line" },
        { prompt: "What is perpendicular to the line direction in the backward variant?", answer: "the segment \\(\\overrightarrow{PP'} = P' - P\\)" },
        { prompt: "A point that lies on the line is its own ____ in that line.", answer: "image" },
      ],
      pyqExampleId: "b2248104-045b-4e51-b9c5-c73203d384b1",
      traps: [
        {
          title: "Backward problems use TWO conditions, not one",
          body:
            "When the image is given and a coordinate is unknown, one equation (midpoint on line) is not enough if there are two unknowns. Add \\(\\overrightarrow{PP'}\\perp\\vec{d}\\) (or a second midpoint-ratio equation) to pin both \\(a\\) and \\(b\\).",
        },
        {
          title: "Reflect in the LINE, not the line's fixed point",
          body:
            "The mirror is the entire line, so the foot \\(F\\) is the nearest point on the line to \\(P\\) — found via perpendicularity — not the arbitrary point \\(\\vec{a}\\) printed in the equation. Reflecting through \\(\\vec{a}\\) gives the wrong image.",
        },
      ],
    },

    // ── CONCEPT 5 — image of a line in a plane (reflect point, keep dir) ─────
    {
      kind: "formula" as const,
      slug: "cetlp-image-of-line-in-plane",
      name: "Image of a line in a plane (and planes through an image)",
      intuition:
        "Reflecting a whole line in a plane sounds bigger than it is. A line is \"a point plus a direction.\" When the line is parallel to the plane (its direction is perpendicular to the normal), the reflection PRESERVES the direction — so you only have to reflect ONE point on the line and reattach the same direction.",
      definition:
        "To reflect a line \\(\\frac{x-x_0}{p} = \\frac{y-y_0}{q} = \\frac{z-z_0}{r}\\) in a plane with normal \\(\\vec{n}\\):\n" +
        "- **Check direction \\(\\perp\\) normal:** if \\(\\vec{d}\\cdot\\vec{n} = 0\\) the line is parallel to the plane and its **direction is unchanged** by the reflection.\n" +
        "- **Reflect one point:** take any point \\((x_0,y_0,z_0)\\) on the line and find its image \\(P'\\) using Concept 3 (\\(P' = 2F - P\\)).\n" +
        "- **Reassemble:** the image line is \\(\\dfrac{x - x_0'}{p} = \\dfrac{y - y_0'}{q} = \\dfrac{z - z_0'}{r}\\) — image point, **same** direction ratios \\((p,q,r)\\).\n\n" +
        "A close cousin asks for a **plane through an image point containing a given line**: reflect the point (Concept 3), then build the plane through that image point and the line.",
      formula: {
        label: "Image line — reflect point, preserve direction",
        latex:
          "\\vec{d}\\cdot\\vec{n} = 0 \\;\\Rightarrow\\; \\text{line} \\parallel \\text{plane}, \\quad \\text{image line} = \\{P',\\; \\vec{d}\\}",
        symbols: [
          { symbol: "\\(\\vec{d} = (p,q,r)\\)", meaning: "direction of the original line, preserved if \\(\\vec{d}\\cdot\\vec{n}=0\\)" },
          { symbol: "\\(P'\\)", meaning: "image of a point on the line (via \\(2F - P\\))" },
          { symbol: "\\(\\vec{n}\\)", meaning: "normal of the mirror plane" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the image of the line \\(\\frac{x-1}{3} = \\frac{y-3}{1} = \\frac{z-4}{-5}\\) in the plane \\(2x - y + z + 3 = 0\\).",
        steps: [
          "Check direction vs normal: \\(\\vec{d} = (3,1,-5)\\), \\(\\vec{n} = (2,-1,1)\\); \\(\\vec{d}\\cdot\\vec{n} = 6 - 1 - 5 = 0\\). Line is parallel to the plane → direction preserved.",
          "Reflect the point \\(P(1,3,4)\\): \\(t = -\\dfrac{2(1) - 3 + 4 + 3}{2^2 + (-1)^2 + 1^2} = -\\dfrac{6}{6} = -1\\). Foot \\(F = (1,3,4) + (-1)(2,-1,1) = (-1,4,3)\\).",
          "Image point \\(P' = 2F - P = (-2-1,\\; 8-3,\\; 6-4) = (-3,5,2)\\).",
          "Reassemble with the same direction \\((3,1,-5)\\): image line \\(\\dfrac{x+3}{3} = \\dfrac{y-5}{1} = \\dfrac{z-2}{-5}\\).",
        ],
        answer: "\\(\\dfrac{x+3}{3} = \\dfrac{y-5}{1} = \\dfrac{z-2}{-5}\\)",
      },
      selfCheckExample: {
        prompt:
          "Let \\(P\\) be the image of \\((3,1,7)\\) in the plane \\(x - y + z = 3\\). Find the equation of the plane through \\(P\\) containing the line \\(\\frac{x}{1} = \\frac{y}{2} = \\frac{z}{1}\\).",
        steps: [
          "Reflect \\((3,1,7)\\): \\(\\vec{n} = (1,-1,1)\\), \\(t = -\\dfrac{3 - 1 + 7 - 3}{3} = -2\\). Foot \\(M = (3,1,7) - 2(1,-1,1) = (1,3,5)\\); image \\(P = 2M - (3,1,7) = (-1,5,3)\\).",
          "The required plane contains the origin-line direction \\((1,2,1)\\) and passes through \\(P(-1,5,3)\\) and the origin (a point on the line).",
          "Its normal is \\((1,2,1)\\times(-1,5,3) = (6 - 5,\\; -1 - 3,\\; 5 + 2) = (1,-4,7)\\), so the plane is \\(x - 4y + 7z = 0\\) (passes through the origin).",
        ],
        answer: "\\(x - 4y + 7z = 0\\)",
      },
      practiceSet: [
        { prompt: "When is a line's direction unchanged by reflection in a plane?", answer: "when \\(\\vec{d}\\cdot\\vec{n} = 0\\) (line parallel to the plane)" },
        { prompt: "To reflect a whole parallel line, how many points must you reflect?", answer: "just one — direction is preserved" },
        { prompt: "Direction \\((3,1,-5)\\), normal \\((2,-1,1)\\): is the line parallel to the plane?", answer: "yes", method: "\\(6-1-5 = 0\\)" },
        { prompt: "Image line = image point plus what?", answer: "the same (preserved) direction ratios" },
      ],
      pyqExampleId: "48122707-82be-45ac-9d49-a799f7d20207",
      traps: [
        {
          title: "Preserve the direction ratios — don't negate them",
          body:
            "For a line parallel to the plane, the image line keeps the SAME \\((p,q,r)\\). Distractors flip the signs of the direction (and shift the image point) — only the point moves under reflection, the direction stays put. Verify \\(\\vec{d}\\cdot\\vec{n}=0\\) before relying on this.",
        },
        {
          title: "Reflect a point ON the line, then reattach the direction",
          body:
            "Don't try to reflect the direction vector through the plane separately. Reflect a concrete point (the numerators give you one), get \\(P' = 2F - P\\), and the image line is \\(P'\\) with the original direction.",
        },
      ],
    },

    // ── CONCEPT 6 — projection onto a line ───────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-projection-onto-line",
      name: "Projection of a segment onto a line",
      intuition:
        "Shine a light perpendicular to a line and measure the shadow a segment casts on it. That shadow length is the segment's component along the line's direction — a single dot product divided by the direction's length.",
      definition:
        "The **projection** (length of the shadow) of the segment \\(\\overrightarrow{AB}\\) onto a line with direction \\(\\vec{d}\\) is\n" +
        "\\[\\text{proj} = \\frac{|\\overrightarrow{AB}\\cdot\\vec{d}|}{|\\vec{d}|}.\\]\n" +
        "- Compute \\(\\overrightarrow{AB} = B - A\\).\n" +
        "- Dot it with the line's direction ratios \\(\\vec{d}\\).\n" +
        "- Divide by \\(|\\vec{d}| = \\sqrt{a^2+b^2+c^2}\\); take the absolute value (a length is non-negative).",
      formula: {
        label: "Projection onto a line",
        latex: "\\text{proj} = \\dfrac{|\\overrightarrow{AB}\\cdot\\vec{d}|}{|\\vec{d}|}",
        symbols: [
          { symbol: "\\(\\overrightarrow{AB}\\)", meaning: "\\(B - A\\), the segment vector" },
          { symbol: "\\(\\vec{d}\\)", meaning: "direction ratios of the line" },
          { symbol: "\\(|\\vec{d}|\\)", meaning: "\\(\\sqrt{a^2+b^2+c^2}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the projection of the segment joining \\(A(1,2,3)\\) and \\(B(4,4,9)\\) on the line with direction ratios \\((2,1,2)\\).",
        steps: [
          "\\(\\overrightarrow{AB} = (3,2,6)\\).",
          "Dot with \\(\\vec{d} = (2,1,2)\\): \\(3(2) + 2(1) + 6(2) = 6 + 2 + 12 = 20\\).",
          "\\(|\\vec{d}| = \\sqrt{4+1+4} = 3\\).",
          "Projection \\(= \\dfrac{|20|}{3} = \\dfrac{20}{3}\\).",
        ],
        answer: "\\(\\dfrac{20}{3}\\) units",
      },
      selfCheckExample: {
        prompt:
          "Find the projection of the segment joining \\((2,1,-3)\\) and \\((-1,0,2)\\) on the line with direction ratios \\((3,2,6)\\).",
        steps: [
          "\\(\\overrightarrow{AB} = (-1-2,\\; 0-1,\\; 2-(-3)) = (-3,-1,5)\\).",
          "Dot with \\((3,2,6)\\): \\((-3)(3) + (-1)(2) + (5)(6) = -9 - 2 + 30 = 19\\).",
          "\\(|\\vec{d}| = \\sqrt{9+4+36} = 7\\).",
          "Projection \\(= \\dfrac{|19|}{7} = \\dfrac{19}{7}\\).",
        ],
        answer: "\\(\\dfrac{19}{7}\\) units",
      },
      practiceSet: [
        { prompt: "Projection of \\(\\overrightarrow{AB}\\) on direction \\(\\vec{d}\\)?", answer: "\\(\\dfrac{|\\overrightarrow{AB}\\cdot\\vec{d}|}{|\\vec{d}|}\\)" },
        { prompt: "\\(\\overrightarrow{AB} = (1,2,2)\\), \\(\\vec{d} = (2,2,1)\\). Projection?", answer: "\\(\\dfrac{8}{3}\\)", method: "\\(\\frac{2+4+2}{3}\\)" },
        { prompt: "Why take absolute value?", answer: "a projection length cannot be negative" },
        { prompt: "Divide the dot product by \\(|\\vec{d}|\\) or \\(|\\vec{d}|^2\\)?", answer: "\\(|\\vec{d}|\\)" },
      ],
      pyqExampleId: "306c439b-6f2e-48c8-a214-a50c865a089c",
      traps: [
        {
          title: "Divide by \\(|\\vec{d}|\\), not \\(|\\vec{d}|^2\\)",
          body:
            "The projection LENGTH uses \\(|\\vec{d}|\\) (one power) in the denominator. Dividing by \\(|\\vec{d}|^2\\) gives the scalar multiplier for the projection VECTOR, not its length — a frequent mix-up with vector projection.",
        },
        {
          title: "\\(\\overrightarrow{AB} = B - A\\) — direction matters inside the dot product",
          body:
            "Get the head-minus-tail right. The magnitude is unaffected by swapping \\(A\\) and \\(B\\) (the absolute value cleans up the sign), but a component mistake in \\(B - A\\) changes the dot product itself.",
        },
      ],
    },

    // ── CONCEPT 7 — projection onto a plane ──────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-projection-onto-plane",
      name: "Projection of a segment onto a plane",
      visualizationSlug: "plane-with-normal",
      intuition:
        "Now the shadow falls on a PLANE (light shining straight down the normal). The segment splits into a part along the normal (lost in the shadow) and a part in the plane (the shadow itself). By Pythagoras, the in-plane shadow is the full length with the along-normal piece removed: \\(\\sqrt{|\\overrightarrow{AB}|^2 - (\\text{normal component})^2}\\).",
      definition:
        "The **projection of \\(\\overrightarrow{AB}\\) onto a plane** with unit normal \\(\\hat{n}\\) is the part of \\(\\overrightarrow{AB}\\) lying in the plane. Its length is\n" +
        "\\[\\text{proj}_{\\text{plane}} = \\sqrt{|\\overrightarrow{AB}|^2 - (\\overrightarrow{AB}\\cdot\\hat{n})^2}.\\]\n" +
        "- \\(|\\overrightarrow{AB}|^2\\) is the full squared length.\n" +
        "- \\(\\overrightarrow{AB}\\cdot\\hat{n} = \\dfrac{\\overrightarrow{AB}\\cdot\\vec{n}}{|\\vec{n}|}\\) is the component ALONG the normal (the bit that gets flattened away).\n" +
        "- Subtract its square and take the root — the in-plane shadow.",
      formula: {
        label: "Projection onto a plane",
        latex:
          "\\text{proj}_{\\text{plane}} = \\sqrt{|\\overrightarrow{AB}|^2 - \\left(\\dfrac{\\overrightarrow{AB}\\cdot\\vec{n}}{|\\vec{n}|}\\right)^2}",
        symbols: [
          { symbol: "\\(\\overrightarrow{AB}\\)", meaning: "the segment vector \\(B - A\\)" },
          { symbol: "\\(\\vec{n}\\)", meaning: "normal to the plane" },
          { symbol: "\\(\\dfrac{\\overrightarrow{AB}\\cdot\\vec{n}}{|\\vec{n}|}\\)", meaning: "the along-normal component (removed)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the length of the projection of the segment joining \\((5,-1,4)\\) and \\((4,-1,3)\\) on the plane \\(x + y + z = 7\\).",
        steps: [
          "\\(\\overrightarrow{AB} = (4-5,\\; -1+1,\\; 3-4) = (-1,0,-1)\\), so \\(|\\overrightarrow{AB}|^2 = 1 + 0 + 1 = 2\\).",
          "Normal \\(\\vec{n} = (1,1,1)\\), \\(|\\vec{n}| = \\sqrt{3}\\). Along-normal component: \\(\\dfrac{\\overrightarrow{AB}\\cdot\\vec{n}}{|\\vec{n}|} = \\dfrac{-1+0-1}{\\sqrt{3}} = \\dfrac{-2}{\\sqrt{3}}\\), squared \\(= \\dfrac{4}{3}\\).",
          "Projection \\(= \\sqrt{2 - \\dfrac{4}{3}} = \\sqrt{\\dfrac{2}{3}}\\).",
        ],
        answer: "\\(\\sqrt{\\dfrac{2}{3}}\\) units",
      },
      selfCheckExample: {
        prompt:
          "Find the projection of the segment joining \\((1,0,0)\\) and \\((1,1,1)\\) on the plane \\(z = 0\\).",
        steps: [
          "\\(\\overrightarrow{AB} = (0,1,1)\\), \\(|\\overrightarrow{AB}|^2 = 2\\).",
          "Normal of \\(z = 0\\) is \\(\\vec{n} = (0,0,1)\\), \\(|\\vec{n}| = 1\\). Along-normal component: \\(\\overrightarrow{AB}\\cdot\\hat{n} = 1\\), squared \\(= 1\\).",
          "Projection \\(= \\sqrt{2 - 1} = 1\\).",
        ],
        answer: "\\(1\\) unit",
      },
      practiceSet: [
        { prompt: "Projection of \\(\\overrightarrow{AB}\\) onto a plane (formula)?", answer: "\\(\\sqrt{|\\overrightarrow{AB}|^2 - (\\overrightarrow{AB}\\cdot\\hat{n})^2}\\)" },
        { prompt: "Which component of \\(\\overrightarrow{AB}\\) is removed when projecting onto a plane?", answer: "the component along the normal" },
        { prompt: "\\(|\\overrightarrow{AB}|^2 = 2\\), normal component squared \\(= \\tfrac{4}{3}\\). Projection?", answer: "\\(\\sqrt{\\tfrac{2}{3}}\\)" },
        { prompt: "For projection onto a LINE you keep \\(\\overrightarrow{AB}\\cdot\\vec d\\); onto a PLANE you remove what?", answer: "the normal-direction part, then Pythagoras" },
      ],
      pyqExampleId: "a23b3524-6500-4172-8031-dd0eec5dc4c8",
      traps: [
        {
          title: "Plane projection SUBTRACTS the normal part; line projection KEEPS the direction part",
          body:
            "Onto a line you want the component ALONG \\(\\vec{d}\\). Onto a plane you want what's LEFT after removing the component along \\(\\vec{n}\\). Using the line formula for a plane question (or vice-versa) is the headline trap — they are complementary pieces of the same vector.",
        },
        {
          title: "Use the UNIT normal inside the square",
          body:
            "The removed piece is \\((\\overrightarrow{AB}\\cdot\\hat{n})^2 = \\left(\\frac{\\overrightarrow{AB}\\cdot\\vec{n}}{|\\vec{n}|}\\right)^2\\). Forgetting to divide by \\(|\\vec{n}|\\) over-counts the normal component. For \\(\\vec{n}=(1,1,1)\\), divide the dot product by \\(\\sqrt{3}\\) before squaring.",
        },
        {
          title: "Answer is \\(\\sqrt{2/3}\\), not \\(2/3\\)",
          body:
            "Take the final square root. \\(\\sqrt{\\frac{2}{3}}\\) and \\(\\frac{2}{3}\\) are both offered as options in this PYQ — the un-rooted value is the classic distractor.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Lines and planes — chapter overview",
      href: "/notes/mht-cet-maths/line-and-plane",
    },
  ],
};
