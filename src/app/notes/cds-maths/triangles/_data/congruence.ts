import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TG_CONGRUENCE_NOTE: SubtopicNote = {
  subtopicName: "Congruence and Similarity",
  title: "Congruence and Similarity",
  oneLineDefinition:
    "Congruent triangles match in every side and angle; similar triangles match in angles, so every length of one is the same multiple of the matching length of the other.",
  whyItMatters:
    "Thirteen PYQs. The congruence questions test which rule applies and why equal angles alone are not enough. The similarity questions turn on one pattern — a shared angle plus one more equal angle — and on reading the vertex order in a statement like △ABR ∼ △PQR. Two recent items ask where two crossing lines meet between two poles, which has a one-line answer.",
  concepts: [
    // C1 — congruence rules
    {
      kind: "formula" as const,
      slug: "cdstg-congruence-rules",
      name: "The congruence rules",
      intuition:
        "Three pieces of a triangle fix the whole triangle only if they are the right three. Three sides do; two sides with the angle between them do; two angles with a side do. Three angles never do, because they fix the shape but not the size.",
      definition:
        "Two triangles are congruent by:\n" +
        "- **SSS** — three sides equal;\n" +
        "- **SAS** — two sides and the angle **between** them;\n" +
        "- **ASA / AAS** — two angles and any matching side;\n" +
        "- **RHS** — right angle, hypotenuse and one other side.\n" +
        "**AAA** gives only similarity. **SSA** (the angle not between the sides) is not a rule, except for the right-angled case RHS.",
      formula: {
        label: "Rules that fix a triangle",
        latex: "\\text{SSS},\\ \\text{SAS},\\ \\text{ASA},\\ \\text{AAS},\\ \\text{RHS} \\qquad (\\text{not AAA, not SSA})",
      },
      authoredExample: {
        prompt: "In quadrilateral \\(ABCD\\), \\(AB = AD\\) and \\(CB = CD\\). Show that \\(AC\\) bisects \\(\\angle A\\).",
        steps: [
          "Triangles \\(ABC\\) and \\(ADC\\) have \\(AB = AD\\), \\(CB = CD\\) and the common side \\(AC\\).",
          "So they are congruent by SSS.",
          "Matching angles are equal: \\(\\angle BAC = \\angle DAC\\), so \\(AC\\) bisects \\(\\angle A\\).",
        ],
        answer: "Congruent by SSS, hence \\(\\angle BAC = \\angle DAC\\).",
      },
      selfCheckExample: {
        prompt: "Two triangles have two sides equal and an equal angle that is NOT between those sides. Must they be congruent?",
        steps: [
          "That is SSA, which is not a congruence rule.",
          "With the angle fixed and one side fixed, the other side can often swing to two positions, giving two different triangles.",
        ],
        answer: "No, not in general.",
      },
      practiceSet: [
        { prompt: "Three equal angles give?", answer: "Similar, not necessarily congruent" },
        { prompt: "Right triangles with equal hypotenuse and one equal leg?", answer: "Congruent by RHS" },
        { prompt: "Two angles and a side not between them?", answer: "Congruent by AAS" },
        { prompt: "Similar triangles with equal areas?", answer: "Congruent" },
      ],
      pyqExampleId: "4743d28f-deb5-4c51-8aed-e466de081fa3", // 2017 (I) — ADM ≅ BCM by ASA
      traps: [
        {
          title: "The angle must be the included one",
          body:
            "SAS needs the angle between the two named sides. A statement listing 'two sides and an angle' without saying which angle is not a valid rule.",
        },
      ],
    },

    // C2 — similarity
    {
      kind: "formula" as const,
      slug: "cdstg-similarity",
      name: "Similar triangles and the shared-angle pattern",
      intuition:
        "Two equal angles force the third to be equal as well, so two angles are enough for similarity. Then one triangle is a scaled copy of the other: every side, perimeter, altitude and median grows by the same factor.",
      definition:
        "- **AA:** two pairs of equal angles make triangles similar.\n" +
        "- If the scale factor is \\(k\\), every corresponding length (side, perimeter, altitude, median, bisector) is in the ratio \\(k\\).\n" +
        "- **Shared angle:** if \\(D\\) is on \\(BC\\) and \\(\\angle ADC = \\angle BAC\\), then triangles \\(ADC\\) and \\(BAC\\) share \\(\\angle C\\), so they are similar and \\(\\dfrac{DC}{AC} = \\dfrac{AC}{BC}\\), i.e. \\(AC^2 = DC\\cdot BC\\).\n" +
        "- In a statement like \\(\\triangle ABR \\sim \\triangle PQR\\), the vertices match in the order written: \\(A\\) with \\(P\\), \\(B\\) with \\(Q\\), \\(R\\) with \\(R\\).",
      formula: {
        label: "Shared-angle similarity",
        latex: "\\angle ADC = \\angle BAC \\;\\Rightarrow\\; AC^2 = DC \\cdot BC",
      },
      authoredExample: {
        prompt: "\\(D\\) is on \\(BC\\) with \\(\\angle CAD = \\angle B\\). If \\(BC = 16\\) and \\(CD = 4\\), find \\(CA\\).",
        steps: [
          "Triangles \\(CAD\\) and \\(CBA\\) share \\(\\angle C\\), and \\(\\angle CAD = \\angle CBA\\), so they are similar.",
          "Matching sides: \\(\\dfrac{CA}{CB} = \\dfrac{CD}{CA}\\), so \\(CA^2 = CD\\cdot CB = 4\\times 16 = 64\\).",
        ],
        answer: "\\(CA = 8\\).",
      },
      selfCheckExample: {
        prompt: "Two similar triangles have perimeters \\(36\\) and \\(24\\). A side of the larger is \\(9\\). Find the matching side of the smaller.",
        steps: ["The scale factor is \\(\\dfrac{24}{36} = \\dfrac23\\), so the side is \\(9\\times\\dfrac23\\)."],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "Sides in the ratio \\(3 : 5\\). Ratio of perimeters?", answer: "\\(3 : 5\\)" },
        { prompt: "\\(\\triangle ABC \\sim \\triangle PQR\\), \\(AB = 4\\), \\(PQ = 6\\), \\(BC = 5\\). Find \\(QR\\).", answer: "\\(7.5\\)" },
        { prompt: "Scale factor \\(2\\); an altitude of the smaller is \\(3\\). The matching altitude of the larger?", answer: "\\(6\\)" },
        { prompt: "Sides in the ratio \\(2 : 7\\). Ratio of corresponding medians?", answer: "\\(2 : 7\\)" },
      ],
      pyqExampleId: "bea06596-16db-4489-90d2-361f00e9f07e", // 2017 (I) — ∠ADC = ∠BAC, AC² = DC·BC
      traps: [
        {
          title: "Match vertices by the statement, not by the letters' positions",
          body:
            "In \\(\\triangle ABR \\sim \\triangle PQR\\), \\(BR\\) matches \\(QR\\) and \\(AR\\) matches \\(PR\\). Write the three pairs out before dividing, or the scale factor gets applied to the wrong side.",
        },
      ],
    },

    // C3 — crossing lines between two poles
    {
      kind: "formula" as const,
      slug: "cdstg-crossing-poles",
      name: "Crossing lines between two poles",
      intuition:
        "Join the top of each pole to the foot of the other. The two lines cross at a height that depends only on the two pole heights, not on how far apart the poles stand — move them apart and the crossing point moves, but its height does not.",
      definition:
        "Poles of heights \\(a\\) and \\(b\\) stand a distance \\(d\\) apart; the crossing point is at height \\(h\\) and at distance \\(x\\) from the foot of the first pole.\n" +
        "- Similar triangles with the second pole: \\(\\dfrac hb = \\dfrac xd\\).\n" +
        "- Similar triangles with the first pole: \\(\\dfrac ha = \\dfrac{d - x}{d}\\).\n" +
        "- Adding: \\(\\dfrac ha + \\dfrac hb = 1\\), so \\(h = \\dfrac{ab}{a + b}\\), and \\(d\\) has cancelled.",
      formula: {
        label: "Height of the crossing point",
        latex: "h = \\dfrac{ab}{a + b}",
      },
      authoredExample: {
        prompt: "Poles of heights \\(6\\) m and \\(12\\) m stand \\(20\\) m apart. Lines join the top of each to the foot of the other. How high above the ground do they cross?",
        steps: [
          "\\(h = \\dfrac{6\\times 12}{6 + 12} = \\dfrac{72}{18}\\).",
          "The \\(20\\) m is not needed.",
        ],
        answer: "\\(4\\) m.",
      },
      selfCheckExample: {
        prompt: "Poles of \\(20\\) m and \\(30\\) m. Height of the crossing point?",
        steps: ["\\(\\dfrac{20\\times 30}{50} = 12\\)."],
        answer: "\\(12\\) m.",
      },
      practiceSet: [
        { prompt: "Poles \\(4\\) and \\(4\\). Crossing height?", answer: "\\(2\\)" },
        { prompt: "Poles \\(3\\) and \\(6\\). Crossing height?", answer: "\\(2\\)" },
        { prompt: "Poles \\(10\\) and \\(40\\). Crossing height?", answer: "\\(8\\)" },
        { prompt: "Does the distance between the poles change the height?", answer: "No" },
      ],
      pyqExampleId: "5a19e35d-f9cb-4497-9220-47bb900f1df0", // 2025 (II) — poles 10 m and 15 m
      traps: [
        {
          title: "Not the average",
          body:
            "Poles of \\(12\\) and \\(24\\) give \\(8\\), not \\(18\\) (the average) and not anything that uses the distance between them. The crossing height is always less than the shorter pole.",
        },
      ],
    },
  ],
};
