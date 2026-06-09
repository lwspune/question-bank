import type { SubtopicNote } from "@/app/notes/_types";

export const INSCRIBED_TANGENTS_SEGMENTS_NOTE: SubtopicNote = {
  subtopicName: "Inscribed Geometry, Tangents, and Segments",
  title: "Inscribed Geometry, Tangents & Segments",
  oneLineDefinition:
    "The geometry that lives ON the circle: the angle a chord subtends from the circumference, circles that touch the axes, inscribed squares, the tangent–normal relationship, and the areas of the two segments a chord cuts off.",
  whyItMatters:
    "A small but HARD-leaning pocket (7 PYQs, 4 HARD, in two passage sets plus singles). The marks come from a handful of named facts — the angle in a semicircle is a right angle, the inscribed angle is half the central angle, a tangent is perpendicular to the radius at the point of contact, and the segment-area split — applied to a circle you've already put in centre–radius form. " +
    "Knowing which fact a question is fishing for is most of the battle.",
  concepts: [
    // 1 — angle in a semicircle / inscribed-angle theorem  (SET S6: 66c9659e ∠BAC, cfe3cb7b coords of A)  HARD
    {
      kind: "formula" as const,
      slug: "circ-inscribed-angle",
      name: "Inscribed Angle and the Angle in a Semicircle",
      pyqExampleId: "66c9659e-14d2-4460-a3ac-fea33384d0e1",
      intuition:
        "Stand anywhere on a circle and look at a fixed chord: the angle you see is always the same, and it is exactly half the angle the chord makes at the centre. The special case — a diameter — is seen as a perfect right angle from every point on the circle.",
      definition:
        "Two linked facts about angles a chord subtends:\n" +
        "- **Inscribed-angle theorem:** the angle a chord \\(BC\\) subtends at a point \\(A\\) on the circle is **half** the angle it subtends at the centre: \\(\\angle BAC = \\tfrac12\\angle BOC\\).\n" +
        "- **Angle in a semicircle:** if \\(BC\\) is a **diameter**, \\(\\angle BAC = 90^\\circ\\) for every \\(A\\) on the circle.\n" +
        "- The inscribed point \\(A\\) can sit on **either arc**: on the major arc the angle is \\(\\tfrac12\\angle BOC\\); on the minor arc it is the **supplement**, \\(180^\\circ-\\tfrac12\\angle BOC\\). So a single chord can give an angle AND its supplement — both are valid.",
      formula: {
        label: "Inscribed angle",
        latex: "\\angle BAC = \\tfrac12\\,\\angle BOC",
        symbols: [
          { symbol: "O", meaning: "centre" },
          { symbol: "A", meaning: "point on the circle" },
        ],
      },
      visualizationSlug: "circ-inscribed-angle",
      authoredExample: {
        prompt:
          "\\(B=(3,0)\\) and \\(C=(0,3)\\) lie on a circle centred at the origin \\(O\\). If \\(A\\) is another point on the circle, what is \\(\\angle BAC\\)?",
        steps: [
          "At the centre: \\(\\vec{OB}=(3,0)\\), \\(\\vec{OC}=(0,3)\\) are perpendicular, so \\(\\angle BOC=90^\\circ\\).",
          "Inscribed angle is half the central angle: \\(\\angle BAC=\\tfrac12(90^\\circ)=45^\\circ\\) when \\(A\\) is on the major arc.",
          "If \\(A\\) is on the minor arc, \\(\\angle BAC=180^\\circ-45^\\circ=135^\\circ\\).",
        ],
        answer: "\\(45^\\circ\\) (major arc) or \\(135^\\circ\\) (minor arc).",
      },
      traps: [
        {
          title: "Don't forget the supplementary (obtuse) case",
          body:
            "The inscribed angle depends on which arc \\(A\\) is on: \\(\\tfrac12\\angle BOC\\) on the major arc, its supplement on the minor arc. NDA answer keys frequently list BOTH \\(\\pi/4\\) and \\(3\\pi/4\\). Quoting only the acute value loses the obtuse option.",
        },
        {
          title: "A is not pinned to one coordinate",
          body:
            "If a question asks for \"the coordinates of \\(A\\)\" with only \\(B,C\\) given, there are infinitely many valid points on the arc — the answer is a locus, not a single point. Watch for the choice that says \"cannot be uniquely determined\".",
        },
      ],
    },

    // 2 — circle touching both axes, PQ between contact points (c621a004 MODERATE)
    {
      kind: "formula" as const,
      slug: "circ-contact-points-on-axes",
      name: "Points Where a Circle Touches the Axes",
      pyqExampleId: "c621a004-fe3a-4d98-b597-4ccf335ac54d",
      intuition:
        "When a circle touches both axes, the points of contact sit directly below and beside the centre. The contact point on the x-axis shares the centre's x-coordinate; the one on the y-axis shares its y-coordinate — so the chord joining them is easy to measure.",
      definition:
        "A circle with centre \\((k,k)\\) and radius \\(|k|\\) (so it **touches both axes**) meets:\n" +
        "- the **x-axis** at \\(P=(k,0)\\) — directly below the centre;\n" +
        "- the **y-axis** at \\(Q=(0,k)\\) — directly beside the centre.\n" +
        "- The distance between the two contact points is \\(PQ=\\sqrt{k^2+k^2}=\\sqrt2\\,|k|\\). More generally, the contact point on an axis drops the perpendicular from the centre onto that axis.",
      formula: {
        label: "Contact points and PQ",
        latex: "P=(k,0),\\;\\; Q=(0,k),\\;\\; PQ=\\sqrt2\\,|k|",
      },
      authoredExample: {
        prompt:
          "The circle \\(x^2+y^2-6x-6y+9=0\\) touches both axes at \\(P\\) and \\(Q\\). Find \\(PQ\\).",
        steps: [
          "Complete the square: \\((x-3)^2+(y-3)^2=9\\), centre \\((3,3)\\), radius \\(3\\) — touches both axes.",
          "Contact points \\(P=(3,0)\\), \\(Q=(0,3)\\).",
          "\\(PQ=\\sqrt{3^2+3^2}=3\\sqrt2\\).",
        ],
        answer: "\\(PQ=3\\sqrt2\\).",
      },
      traps: [
        {
          title: "The contact point shares ONE coordinate with the centre",
          body:
            "On the x-axis the contact point is \\((k,0)\\) — same x as the centre, y zero — because the radius to the contact point is vertical. Reading it as \\((0,k)\\) or \\((k,k)\\) is the usual mix-up.",
        },
      ],
    },

    // 3 — inscribed square (a8f8ef73 MODERATE)
    {
      kind: "formula" as const,
      slug: "circ-inscribed-square",
      name: "A Square Inscribed in a Circle",
      pyqExampleId: "a8f8ef73-61c2-448c-bdff-4acb473763da",
      intuition:
        "A square inscribed in a circle has its four corners on the circle and its diagonal equal to the diameter. If its sides are parallel to the axes, each vertex sits at the centre offset by r/√2 in both x and y — the corners of a tilted-by-45° box of half-side r/√2.",
      definition:
        "For a **square inscribed** in a circle of centre \\((h,k)\\), radius \\(r\\), with **sides parallel to the axes**:\n" +
        "- The diagonal of the square is the **diameter** \\(=2r\\); the half-diagonal to each vertex is \\(r\\).\n" +
        "- Each **vertex** is at \\(\\left(h\\pm\\tfrac{r}{\\sqrt2},\\,k\\pm\\tfrac{r}{\\sqrt2}\\right)\\) — the centre offset by \\(\\tfrac{r}{\\sqrt2}\\) in each direction (since the side is \\(r\\sqrt2\\) and the half-side is \\(\\tfrac{r}{\\sqrt2}\\)).\n" +
        "- The square's **side** is \\(r\\sqrt2\\) and its **area** is \\(2r^2\\).",
      formula: {
        label: "Inscribed-square vertices",
        latex: "\\left(h\\pm\\tfrac{r}{\\sqrt2},\\; k\\pm\\tfrac{r}{\\sqrt2}\\right)",
      },
      authoredExample: {
        prompt:
          "A square with sides parallel to the axes is inscribed in \\(x^2+y^2=4\\). Give one vertex.",
        steps: [
          "Centre \\((0,0)\\), radius \\(r=2\\).",
          "Vertices are at \\(\\left(\\pm\\tfrac{2}{\\sqrt2},\\pm\\tfrac{2}{\\sqrt2}\\right)=(\\pm\\sqrt2,\\pm\\sqrt2)\\).",
        ],
        answer: "\\((\\sqrt2,\\sqrt2)\\) (and its sign variants).",
      },
      traps: [
        {
          title: "Inscribed vs circumscribed — offset is r/√2, not r",
          body:
            "An INSCRIBED square (corners on the circle) has vertices offset \\(r/\\sqrt2\\) from the centre. A CIRCUMSCRIBED square (sides tangent to the circle) has vertices offset \\(r\\). Mixing the two gives \\((h\\pm r,k\\pm r)\\) — the wrong, larger square.",
        },
      ],
    },

    // 4 — tangent & normal (278343c8 HARD)
    {
      kind: "formula" as const,
      slug: "circ-tangent-normal",
      name: "Tangent and Normal at a Point of Contact",
      pyqExampleId: "278343c8-3bcb-49cf-833f-2e94ab729cd0",
      intuition:
        "At any point of a circle the tangent is perpendicular to the radius, so the normal (perpendicular to the tangent) points straight along the radius — through the centre. Extending the normal across the circle therefore lands you at the diametrically opposite point.",
      definition:
        "At a point of contact on a circle:\n" +
        "- The **tangent** is **perpendicular to the radius** drawn to that point.\n" +
        "- The **normal** (perpendicular to the tangent) is the **radius produced** — it passes through the **centre**.\n" +
        "- Following the normal across the circle reaches the **diametrically opposite point**: from contact point \\(T\\) and centre \\(C\\), the far point is \\(2C-T\\).\n" +
        "- If the **y-axis touches** \\(x^2+y^2+2gx+2fy+c=0\\), the contact point is \\((0,-f)\\); the other end of that diameter is \\((-2g,-f)\\) (the normal is horizontal, through the centre \\((-g,-f)\\)).",
      formula: {
        label: "Opposite end of the diameter",
        latex: "T'=2C-T\\quad(C=\\text{centre},\\;T=\\text{contact point})",
      },
      authoredExample: {
        prompt:
          "The x-axis touches the circle \\(x^2+y^2-6x-4y+9=0\\). Find the point diametrically opposite the point of contact.",
        steps: [
          "Centre \\((3,2)\\), radius \\(\\sqrt{9+4-9}=2\\). It touches the x-axis (centre height \\(2=\\) radius) at \\(T=(3,0)\\).",
          "The normal is the vertical diameter \\(x=3\\); the opposite end is \\(T'=2C-T=(6-3,\\,4-0)=(3,4)\\).",
        ],
        answer: "\\((3,4)\\).",
      },
      traps: [
        {
          title: "The normal goes through the centre — that's the whole trick",
          body:
            "The normal at a circle's point is the radius line, so it always passes through the centre. The far intersection with the circle is the diametrically opposite point, \\(2C-T\\). Trying to solve the normal–circle intersection from scratch wastes time and invites sign errors.",
        },
      ],
    },

    // 5 — SET S15: segment areas (be93cd2a minor, a2159f45 major)  HARD/MODERATE
    {
      kind: "formula" as const,
      slug: "circ-segment-areas",
      name: "Areas of the Minor and Major Segments",
      pyqExampleId: "be93cd2a-ef53-4f6c-85b5-452dd4543a2b",
      intuition:
        "A chord splits a disc into two segments. The smaller one (minor) is a circular sector minus the triangle the chord cuts off; the larger one (major) is the rest of the disc. Find the central angle the chord subtends, compute the sector and triangle, and the two segments follow.",
      definition:
        "A chord subtending a central angle \\(\\theta\\) (in radians) in a circle of radius \\(a\\) splits the disc into two **segments**:\n" +
        "- **Minor segment** \\(=\\) sector \\(-\\) triangle \\(=\\dfrac{a^2}{2}(\\theta-\\sin\\theta)\\).\n" +
        "- **Major segment** \\(=\\) whole disc \\(-\\) minor segment \\(=\\pi a^2-\\dfrac{a^2}{2}(\\theta-\\sin\\theta)\\).\n" +
        "- Find \\(\\theta\\) from the perpendicular distance \\(d\\) from the centre to the chord: \\(\\cos\\tfrac\\theta2=\\dfrac{d}{a}\\). For a chord at distance \\(\\dfrac{a}{\\sqrt2}\\), \\(\\tfrac\\theta2=45^\\circ\\), so \\(\\theta=90^\\circ=\\tfrac\\pi2\\).",
      formula: {
        label: "Minor segment area",
        latex: "A_{\\text{minor}} = \\tfrac{a^2}{2}\\,(\\theta - \\sin\\theta)",
        symbols: [
          { symbol: "a", meaning: "radius" },
          { symbol: "\\theta", meaning: "central angle (radians)" },
        ],
      },
      authoredExample: {
        prompt:
          "A chord of a circle of radius \\(a\\) subtends a right angle at the centre. Find the minor and major segment areas.",
        steps: [
          "\\(\\theta=\\tfrac\\pi2\\), \\(\\sin\\theta=1\\). Minor segment \\(=\\tfrac{a^2}{2}\\left(\\tfrac\\pi2-1\\right)=\\tfrac{(\\pi-2)a^2}{4}\\).",
          "Whole disc \\(=\\pi a^2\\), so major segment \\(=\\pi a^2-\\tfrac{(\\pi-2)a^2}{4}=\\tfrac{(3\\pi+2)a^2}{4}\\).",
        ],
        answer: "Minor \\(=\\tfrac{(\\pi-2)a^2}{4}\\); major \\(=\\tfrac{(3\\pi+2)a^2}{4}\\).",
      },
      traps: [
        {
          title: "Segment = sector − triangle (not sector alone)",
          body:
            "The minor SEGMENT is the sector with the triangle cut off: \\(\\tfrac{a^2}{2}(\\theta-\\sin\\theta)\\). Forgetting the \\(-\\sin\\theta\\) term reports the SECTOR area instead — a different region. The major segment is then the whole disc minus the minor segment, not 'the big sector'.",
        },
      ],
    },
  ],
};
