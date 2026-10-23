import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CI_POWER_NOTE: SubtopicNote = {
  subtopicName: "Intersecting Chords and Power of a Point",
  title: "Intersecting Chords and Power of a Point",
  oneLineDefinition:
    "Every line through a fixed point P that meets a circle cuts it into two pieces whose product is the same, whether P is inside the circle, outside it, or at the end of a tangent.",
  whyItMatters:
    "Eighteen questions in the bank, 11 EASY and 7 MODERATE. Each is one product equation. The marks are lost in choosing the pieces: inside the circle you multiply the two parts of a chord, outside you multiply the near length by the whole length from P.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscipw-inside",
      name: "Two chords crossing inside a circle",
      intuition:
        "When chords AB and CD cross at P, triangles PAC and PDB have equal angles (vertically opposite angles at P, and angles in the same segment), so their sides are in proportion. That proportion says the two products of pieces are equal.",
      definition:
        "- Chords AB and CD cross at P inside the circle. Then **\\(PA \\times PB = PC \\times PD\\)**.\n" +
        "- All four lengths are measured from P, the crossing point, to the circle.\n" +
        "- Given a whole chord, subtract to get the second piece first. After finding the missing piece, add to get a whole chord if that is asked.\n" +
        "- Pieces given as a ratio: write them as \\(2k\\) and \\(3k\\), use the product rule, and the ratio of whole chords follows.",
      formula: {
        label: "Intersecting chords",
        latex: "PA \\times PB = PC \\times PD",
        symbols: [{ symbol: "P", meaning: "the point where the two chords cross" }],
      },
      authoredExample: {
        prompt: "Chords AB and CD of a circle cross at P. AP = 15 cm, PB = 4 cm and CP = 6 cm. Find PD and CD.",
        steps: [
          "\\(15 \\times 4 = 6 \\times PD\\), so \\(PD = \\frac{60}{6} = 10\\) cm.",
          "\\(CD = CP + PD = 6 + 10 = 16\\) cm.",
        ],
        answer: "PD = 10 cm, CD = 16 cm",
      },
      selfCheckExample: {
        prompt: "Chords AB and CD of a circle cross at E. AE = 4 cm, AB = 13 cm and CE = 6 cm. Find CD.",
        steps: ["\\(EB = 13 - 4 = 9\\) cm.", "\\(4 \\times 9 = 6 \\times ED\\), so \\(ED = 6\\) cm and \\(CD = 12\\) cm."],
        answer: "12 cm",
      },
      practiceSet: [
        {
          prompt: "Two chords cross inside a circle. One is cut into pieces of 3 cm and 8 cm, and one piece of the other is 4 cm. Find its other piece.",
          answer: "6 cm",
        },
        {
          prompt: "Chords PQ and RS of a circle meet at X inside it. PX = RX = 5 cm and XQ = 7 cm. Find XS.",
          answer: "7 cm",
        },
        {
          prompt: "Chord AB = 20 cm of a circle is cut at P with AP = 4 cm. Chord CD passes through P with CP = 8 cm. Find PD.",
          answer: "8 cm",
          method: "\\(PB = 16\\) and \\(4 \\times 16 = 8 \\times PD\\).",
        },
        {
          prompt: "Chords AB and CD of a circle cross at E with AE : EB = 1 : 4 and CE = ED. If AB = 10 cm, find CD.",
          answer: "8 cm",
          method: "\\(AE = 2\\), \\(EB = 8\\), so \\(CE^2 = 16\\) and \\(CE = 4\\).",
        },
      ],
      pyqExampleId: "5aff4aaf-fa3d-4abc-9ac6-70a2abe96883",
      traps: [
        {
          title: "Multiplying a piece by the whole chord when the chords cross inside",
          body: "Inside the circle both factors are pieces measured from the crossing point. The whole chord enters only when you add the pieces at the end.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscipw-outside",
      name: "Secants and a tangent from an outside point",
      intuition:
        "From a point P outside, a line through the circle meets it twice: first at a near point A, then at a far point B. The product of PA and PB is the same for every such line, and for a tangent the two points become one, so the product is the tangent squared.",
      definition:
        "- Secants PAB and PCD from an outside point P: **\\(PA \\times PB = PC \\times PD\\)**, where each factor runs **from P**: to the near point and to the far point.\n" +
        "- The far length is the near length plus the chord: \\(PB = PA + AB\\).\n" +
        "- With a tangent PT from the same point: **\\(PT^2 = PA \\times PB\\)**.\n" +
        "- If the near piece \\(x\\) is unknown and the chord \\(c\\) is given, the rule gives \\(x(x + c) = t^2\\). Factorise and keep the positive root.\n" +
        "- If the radius is given too, check the chord is not longer than the diameter. A chord longer than the diameter means the printed data cannot exist.",
      formula: {
        label: "Secants and a tangent from P",
        latex: "PA \\times PB = PC \\times PD \\qquad PT^2 = PA \\times PB",
        symbols: [
          { symbol: "PA", meaning: "P to the near point of the secant" },
          { symbol: "PB", meaning: "P to the far point, that is PA plus the chord AB" },
          { symbol: "PT", meaning: "the tangent from P" },
        ],
      },
      authoredExample: {
        prompt:
          "From an outside point P, a secant meets a circle at A and B, with A nearer P. PA = 5 cm and AB = 15 cm. Find the length of the tangent from P.",
        steps: [
          "\\(PB = PA + AB = 5 + 15 = 20\\) cm.",
          "\\(PT^2 = PA \\times PB = 5 \\times 20 = 100\\), so \\(PT = 10\\) cm.",
        ],
        answer: "10 cm",
      },
      selfCheckExample: {
        prompt: "Secants PAB and PCD are drawn to a circle from an outside point P. PA = 4 cm, AB = 11 cm and PC = 5 cm. Find CD.",
        steps: [
          "\\(PB = 4 + 11 = 15\\) cm, so \\(PA \\times PB = 60\\).",
          "\\(5 \\times PD = 60\\) gives \\(PD = 12\\) cm, and \\(CD = PD - PC = 7\\) cm.",
        ],
        answer: "7 cm",
      },
      practiceSet: [
        {
          prompt: "The tangent from a point P to a circle is 8 cm, and a secant from P meets the circle first at a point 4 cm from P. How long is the secant from P to its far point?",
          answer: "16 cm",
        },
        {
          prompt: "From a point P, a secant cuts a circle at A and B with PA = 3 cm and PB = 12 cm. Find the tangent from P.",
          answer: "6 cm",
        },
        {
          prompt: "The tangent from a point P to a circle is 10 cm. A secant from P crosses the circle along a chord 15 cm long. How far is P from the nearer end of that chord?",
          answer: "5 cm",
          method: "\\(x(x + 15) = 100\\), so \\((x + 20)(x - 5) = 0\\).",
        },
      ],
      pyqExampleId: "860c8e76-a5db-442a-b162-92b87f071ec1",
      traps: [
        {
          title: "Using the chord instead of the whole secant",
          body: "Outside the circle the second factor is the full distance from P to the far point, the near length plus the chord, never the chord alone.",
        },
        {
          title: "Squaring the near length instead of the tangent",
          body: "The tangent squared equals near length times far length. The near length is not a tangent and is never squared on its own.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscipw-centre",
      name: "Power of a point from its distance to the centre",
      intuition:
        "The product \\(PA \\times PB\\) is the same for every line through P, so take the line through the centre. It meets the circle at distances \\(d - r\\) and \\(d + r\\) from P, and their product is \\(d^2 - r^2\\), which is also the tangent squared.",
      definition:
        "- **P outside** the circle, at distance \\(d\\) from the centre: \\(PA \\times PB = d^2 - r^2\\), the square of the tangent from P.\n" +
        "- **P inside**: \\(PA \\times PB = r^2 - d^2\\) for every chord through P.\n" +
        "- So a secant's two lengths and the distance to the centre give the radius at once, without drawing the tangent.",
      formula: {
        label: "Power of a point",
        latex: "PA \\times PB = d^2 - r^2 \\text{ (P outside)} \\qquad PA \\times PB = r^2 - d^2 \\text{ (P inside)}",
        symbols: [
          { symbol: "d", meaning: "the distance from P to the centre" },
          { symbol: "r", meaning: "the radius" },
        ],
      },
      authoredExample: {
        prompt:
          "A point P is 13 cm from the centre of a circle of radius 5 cm. A secant from P meets the circle at A and B with PA = 8 cm. Find PB and AB.",
        steps: [
          "\\(PA \\times PB = 13^2 - 5^2 = 144\\), so \\(PB = \\frac{144}{8} = 18\\) cm.",
          "\\(AB = 18 - 8 = 10\\) cm, a whole diameter: \\(PA = d - r\\), so this secant passes through the centre.",
        ],
        answer: "PB = 18 cm, AB = 10 cm",
      },
      selfCheckExample: {
        prompt:
          "A point P inside a circle of radius 10 cm is 6 cm from the centre. A chord through P is cut by P into two pieces, one of which is 4 cm. Find the other piece.",
        steps: ["\\(PA \\times PB = 10^2 - 6^2 = 64\\).", "The other piece is \\(\\frac{64}{4} = 16\\) cm."],
        answer: "16 cm",
      },
      practiceSet: [
        {
          prompt: "A point P is 10 cm from the centre of a circle of radius 6 cm. What is PA × PB for any secant PAB from P?",
          answer: "64 cm²",
        },
        {
          prompt: "A secant from a point P meets a circle at A and B with PA = 2 cm and PB = 8 cm. P is 5 cm from the centre. Find the radius.",
          answer: "3 cm",
          method: "\\(25 - r^2 = 16\\).",
        },
        {
          prompt: "A point P inside a circle of radius 13 cm is 5 cm from the centre. What is PA × PB for a chord AB through P?",
          answer: "144 cm²",
        },
      ],
      pyqExampleId: "7591d9e2-7c1b-4b70-864c-61b324306ff0",
      traps: [
        {
          title: "Using \\(r^2 - d^2\\) for an outside point",
          body: "For a point outside the circle d is larger than r, so the product is \\(d^2 - r^2\\). The order flips only for a point inside.",
        },
      ],
    },
  ],
};
