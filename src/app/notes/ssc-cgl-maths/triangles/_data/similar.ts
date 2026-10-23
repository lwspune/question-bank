import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TR_SIMILAR_NOTE: SubtopicNote = {
  subtopicName: "Similar Triangles",
  title: "Similar Triangles",
  oneLineDefinition:
    "Similar triangles have the same angles and their sides in one ratio k: every length scales by k and every area by k².",
  whyItMatters:
    "Twenty-two questions in the bank, 18 EASY and 4 MODERATE. Every one is the same two moves: find the scale factor k from one pair of matching lengths, then multiply a length by k or an area by k². Fifteen are about areas, and the most common wrong option is the answer you get by forgetting to square.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctrsm-ratio",
      name: "Similar triangles and the scale factor for lengths",
      intuition:
        "A photo enlarged on a copier keeps every angle and stretches every length by the same amount. Two similar triangles are one triangle and its enlargement, so a single ratio describes the whole change.",
      definition:
        "- **Similar** (written ∼) means the same angles, with every side multiplied by one number \\(k\\), the **scale factor**. Same shape, any size; \\(k = 1\\) is congruence.\n" +
        "- **Tests:** AA (two pairs of equal angles are enough, the third follows), SSS (all three sides in one ratio), SAS (two sides in one ratio and the angle **between** them equal).\n" +
        "- The letters pair in order, as for congruence: \\(\\triangle ABC \\sim \\triangle PQR\\) gives \\(\\frac{AB}{PQ} = \\frac{BC}{QR} = \\frac{CA}{RP} = k\\).\n" +
        "- **Every length scales by \\(k\\):** sides, perimeters, altitudes and medians.\n" +
        "- **A line parallel to one side** cuts off a similar triangle: DE ∥ BC with D on AB and E on AC gives \\(\\triangle ADE \\sim \\triangle ABC\\), since the angles at D and B, and at E and C, are corresponding angles.\n" +
        "- **The shared-angle pattern:** D on BC with \\(\\angle ADC = \\angle BAC\\). Triangles ADC and BAC share \\(\\angle C\\), so they are similar by AA, and \\(\\frac{AC}{BC} = \\frac{DC}{AC}\\), that is \\(AC^2 = BC \\times DC\\).\n" +
        "- **Fast route:** find \\(k\\) once, from the one pair where both lengths are known, then multiply.",
      formula: {
        label: "Scale factor of similar triangles",
        latex: "k = \\frac{AB}{PQ} = \\frac{BC}{QR} = \\frac{CA}{RP} = \\frac{\\text{perimeter of } ABC}{\\text{perimeter of } PQR}",
        symbols: [{ symbol: "k", meaning: "the scale factor from triangle PQR to triangle ABC" }],
      },
      authoredExample: {
        prompt:
          "\\(\\triangle ABC \\sim \\triangle DEF\\), with AB = 10 cm, BC = 14 cm, CA = 16 cm and DE = 15 cm. Find EF and the perimeter of triangle DEF.",
        steps: [
          "DE matches AB, so \\(k = \\frac{15}{10} = 1.5\\).",
          "EF matches BC: \\(EF = 1.5 \\times 14 = 21\\) cm.",
          "Perimeter of ABC \\(= 40\\) cm, so the perimeter of DEF \\(= 1.5 \\times 40 = 60\\) cm. Check: FD \\(= 1.5 \\times 16 = 24\\), and \\(15 + 21 + 24 = 60\\).",
        ],
        answer: "EF = 21 cm, perimeter 60 cm",
      },
      selfCheckExample: {
        prompt:
          "In triangle ABC, D is a point on BC with BC = 25 cm and DC = 9 cm, and \\(\\angle ADC = \\angle BAC\\). Find AC.",
        steps: [
          "Triangles ADC and BAC share \\(\\angle C\\) and have \\(\\angle ADC = \\angle BAC\\), so they are similar.",
          "\\(\\frac{AC}{BC} = \\frac{DC}{AC}\\), so \\(AC^2 = 25 \\times 9 = 225\\) and \\(AC = 15\\) cm.",
        ],
        answer: "15 cm",
      },
      practiceSet: [
        {
          prompt: "The perimeters of two similar triangles are 30 cm and 45 cm. A side of the smaller one is 8 cm. Find the matching side of the larger one.",
          answer: "12 cm",
        },
        { prompt: "\\(\\triangle PQR \\sim \\triangle XYZ\\), PQ = 3 cm, XY = 7.5 cm and QR = 4 cm. Find YZ.", answer: "10 cm" },
        { prompt: "Two triangles have two pairs of equal angles. Are they similar?", answer: "Yes, by AA" },
        {
          prompt: "Two similar triangles have matching altitudes of 5 cm and 8 cm. The smaller has a perimeter of 20 cm. Find the perimeter of the larger.",
          answer: "32 cm",
        },
      ],
      pyqExampleId: "e3a8e701-21ad-4a96-a3c2-a7e900fc1346",
      traps: [
        {
          title: "Reading similar as equal",
          body: "Similar triangles have equal angles, not equal sides. Their sides are equal only when the scale factor is 1, and then they are congruent.",
        },
        {
          title: "SAS similarity with the wrong angle",
          body: "For SAS similarity the equal angle must lie between the two sides that are in proportion. An equal angle anywhere else proves nothing.",
        },
        {
          title: "Turning the ratio over halfway",
          body: "Decide which triangle goes on top and keep it there for every pair, or the scale factor flips from k to 1/k.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrsm-area",
      name: "Areas of similar triangles: the square of the scale factor",
      intuition:
        "Area is a length times a length. When both the base and the height are multiplied by k, the area is multiplied by k twice, which is k².",
      definition:
        "- **Ratio of areas \\(= k^2\\),** the square of the ratio of any pair of matching lengths: sides, perimeters, altitudes or medians.\n" +
        "- **Going back:** ratio of lengths \\(= \\sqrt{\\text{ratio of areas}}\\). Areas 49 : 64 give sides 7 : 8.\n" +
        "- The rule holds for any two similar figures, not only triangles: similar squares, hexagons, or a map and the land.\n" +
        "- **Two areas with a known total:** split the total in the ratio of the squares.\n" +
        "- **Fast route:** area ratios in these questions are almost always ratios of perfect squares, so the square roots are whole numbers.",
      formula: {
        label: "Areas of similar figures",
        latex: "\\frac{\\text{Area}_1}{\\text{Area}_2} = k^2 = \\left(\\frac{\\text{side}_1}{\\text{side}_2}\\right)^2",
      },
      authoredExample: {
        prompt: "Two similar triangles have matching sides of 6 cm and 9 cm. The area of the smaller is 28 cm². Find the area of the larger.",
        steps: [
          "\\(k = \\frac{6}{9} = \\frac{2}{3}\\), so the areas are in the ratio \\(4 : 9\\).",
          "Larger area \\(= 28 \\times \\frac{9}{4} = 63\\) cm².",
        ],
        answer: "63 cm²",
      },
      selfCheckExample: {
        prompt:
          "The areas of two similar triangles are 64 cm² and 121 cm². An altitude of the smaller is 16 cm. Find the matching altitude of the larger.",
        steps: [
          "Lengths are in the ratio \\(\\sqrt{64} : \\sqrt{121} = 8 : 11\\).",
          "Altitude \\(= 16 \\times \\frac{11}{8} = 22\\) cm.",
        ],
        answer: "22 cm",
      },
      practiceSet: [
        { prompt: "Two similar triangles have sides in the ratio 4 : 7. Find the ratio of their areas.", answer: "16 : 49" },
        { prompt: "The areas of two similar triangles are in the ratio 49 : 64. Find the ratio of their perimeters.", answer: "7 : 8" },
        { prompt: "Every side of a triangle is tripled. By what factor does its area grow?", answer: "9" },
        {
          prompt: "Two similar triangles have perimeters in the ratio 2 : 3, and their areas add to 52 cm². Find the smaller area.",
          answer: "16 cm²",
          method: "Areas are 4 : 9, so 13 parts make 52 and one part is 4.",
        },
      ],
      pyqExampleId: "5b56642d-00f6-472f-a867-916b484faff1",
      traps: [
        {
          title: "Using k for areas",
          body: "Sides in the ratio 2 : 3 give areas in the ratio 4 : 9. Leaving the ratio as 2 : 3 is the most common wrong option.",
        },
        {
          title: "Squaring on the way back",
          body: "From an area ratio to a side ratio, take the square root. Areas 36 : 49 mean sides 6 : 7, not 1296 : 2401.",
        },
        {
          title: "Squaring the perimeter ratio for perimeters",
          body: "Perimeters, altitudes and medians are lengths, so they scale by k. Only areas scale by k².",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctrsm-parallel",
      name: "A line parallel to one side: the areas it cuts off",
      intuition:
        "A line across a triangle parallel to its base cuts off a smaller copy at the top. The copy's area follows from the square rule, and the strip underneath is whatever is left.",
      definition:
        "- DE ∥ BC with D on AB and E on AC: \\(\\triangle ADE \\sim \\triangle ABC\\) with \\(k = \\frac{AD}{AB} = \\frac{AE}{AC} = \\frac{DE}{BC}\\).\n" +
        "- \\(\\frac{\\text{ar}(ADE)}{\\text{ar}(ABC)} = \\left(\\frac{AD}{AB}\\right)^2\\). The strip DECB (a trapezium) is ar(ABC) − ar(ADE).\n" +
        "- **Use the whole side AB**, not DB. If AD : DB = 2 : 3, then AD : AB = 2 : 5.\n" +
        "- **Working back from areas:** if ar(ADE) : ar(DECB) = \\(m : n\\), then ar(ADE) : ar(ABC) = \\(m : (m + n)\\); take the square root to get AD : AB, then subtract to get AD : DB.\n" +
        "- If DE cuts the area into two equal halves, \\(\\frac{AD}{AB} = \\frac{1}{\\sqrt{2}}\\).\n" +
        "- **The diagonals of the strip:** DC and BE meet at F. Then \\(\\triangle DEF \\sim \\triangle CBF\\) (alternate angles), with \\(k = \\frac{DE}{BC}\\).",
      formula: {
        label: "Area cut off by a parallel line",
        latex: "\\frac{\\text{ar}(ADE)}{\\text{ar}(ABC)} = \\left(\\frac{AD}{AB}\\right)^2 = \\left(\\frac{DE}{BC}\\right)^2",
      },
      authoredExample: {
        prompt:
          "In triangle ABC, DE ∥ BC with D on AB and E on AC, and AD : DB = 3 : 2. The area of triangle ABC is 75 cm². Find the area of triangle ADE and of the trapezium DECB.",
        steps: [
          "\\(\\frac{AD}{AB} = \\frac{3}{3 + 2} = \\frac{3}{5}\\).",
          "ar(ADE) \\(= \\frac{9}{25} \\times 75 = 27\\) cm².",
          "ar(DECB) \\(= 75 - 27 = 48\\) cm².",
        ],
        answer: "27 cm² and 48 cm²",
      },
      selfCheckExample: {
        prompt:
          "In triangle ABC, DE ∥ BC with D on AB and E on AC, and AD : DB = 2 : 3. The segments DC and BE meet at F. Find the ratio of the area of triangle DEF to the area of triangle CBF.",
        steps: [
          "\\(\\frac{DE}{BC} = \\frac{AD}{AB} = \\frac{2}{5}\\).",
          "Triangles DEF and CBF are similar with \\(k = \\frac{2}{5}\\), so their areas are in the ratio \\(4 : 25\\).",
        ],
        answer: "4 : 25",
      },
      practiceSet: [
        { prompt: "In triangle ABC, DE ∥ BC with D on AB and E on AC, DE = 6 cm and BC = 9 cm. Find ar(ADE) : ar(ABC).", answer: "4 : 9" },
        {
          prompt: "A line parallel to BC cuts triangle ABC at D on AB and E on AC, and triangle ADE has a quarter of the area of triangle ABC. Find AD : DB.",
          answer: "1 : 1",
        },
        {
          prompt:
            "In triangle PQR, ST ∥ QR with S on PQ and T on PR. Triangle PST has area 9 cm² and the trapezium STRQ has area 16 cm². Find PS : SQ.",
          answer: "3 : 2",
          method: "ar(PST) : ar(PQR) = 9 : 25, so PS : PQ = 3 : 5.",
        },
      ],
      pyqExampleId: "7fd69b43-9c13-4ac6-ae16-00ecf4c47fc9",
      traps: [
        {
          title: "Squaring AD : DB",
          body: "The similar triangles are ADE and ABC, so the ratio to square is AD : AB, the part over the whole side.",
        },
        {
          title: "Treating the strip as the whole triangle",
          body: "When the question gives the small triangle against the trapezium, add the two to get the whole triangle before taking a square root.",
        },
      ],
    },
  ],
};
