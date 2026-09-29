import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CI_POWER_NOTE: SubtopicNote = {
  subtopicName: "Intersecting Chords and Power of a Point",
  title: "Intersecting Chords and Power of a Point",
  oneLineDefinition:
    "Through a fixed point, every line that meets the circle cuts off two segments with the same product.",
  whyItMatters:
    "Five PYQs, two of them HARD. One product answers them all: for chords crossing inside, AP × PB = CP × PD; for a secant and a tangent from outside, PA × PB = PT². The product also equals r² − d² inside and d² − r² outside.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsci-power",
      name: "Chords, secants and the tangent from one point",
      intuition:
        "Measure along any line through \\(P\\) to the two points where it meets the circle, and multiply. The answer depends only on how far \\(P\\) is from the centre, so every line through \\(P\\) gives the same product.",
      definition:
        "- Chords \\(AB\\) and \\(CD\\) crossing at \\(P\\) inside: \\(AP \\cdot PB = CP \\cdot PD = r^2 - OP^2\\).\n" +
        "- Secants \\(PAB\\) and \\(PCD\\) from \\(P\\) outside: \\(PA \\cdot PB = PC \\cdot PD\\).\n" +
        "- Secant and tangent from \\(P\\): \\(PA \\cdot PB = PT^2 = OP^2 - r^2\\).\n" +
        "- \\(PB\\) is the WHOLE secant from \\(P\\); the chord inside the circle is \\(AB = PB - PA\\).",
      formula: {
        label: "Tangent and secant",
        latex: "PT^2 = PA \\cdot PB",
      },
      authoredExample: {
        prompt: "Chords \\(AB\\) and \\(CD\\) cross at \\(P\\), with \\(AP = 4\\), \\(PB = 6\\) and \\(CP = 3\\) cm. Find \\(PD\\).",
        steps: ["\\(4 \\times 6 = 3 \\times PD\\)."],
        answer: "\\(8\\) cm.",
      },
      selfCheckExample: {
        prompt: "A point is \\(6\\) cm from the centre of a circle of radius \\(10\\) cm. A chord through it has one part \\(4\\) cm long. Find the other part.",
        steps: ["The product is \\(10^2 - 6^2 = 64\\).", "\\(64 \\div 4\\)."],
        answer: "\\(16\\) cm.",
      },
      practiceSet: [
        { prompt: "\\(PT = 6\\), \\(PA = 4\\). \\(PB\\)?", answer: "\\(9\\)" },
        { prompt: "Radius \\(13\\), point \\(5\\) from the centre. Product of the chord parts?", answer: "\\(144\\)" },
        { prompt: "\\(PA = 3\\), \\(AB = 9\\). Tangent from \\(P\\)?", answer: "\\(6\\)" },
        { prompt: "\\(OP = 17\\), \\(r = 8\\). \\(PA \\cdot PB\\) for any secant?", answer: "\\(225\\)" },
      ],
      pyqExampleId: "2e842463-4a0f-4981-a255-d6b63bd9af19", // 2021 (I) — PA = 9, tangent PT = 12, find AB
      traps: [
        {
          title: "The whole secant, then subtract",
          body:
            "In \\(PT^2 = PA \\cdot PB\\), \\(PB\\) runs from \\(P\\) to the FAR point. The chord asked for is \\(PB - PA\\); stopping at \\(PB\\) picks the distractor.",
        },
        {
          title: "Given the product, the statements are not needed",
          body:
            "If \\(AP \\cdot PB\\) is already given, \\(CP \\cdot PD\\) equals it by the theorem. In a data-sufficiency item, that means NEITHER statement is required.",
        },
      ],
    },
  ],
};
