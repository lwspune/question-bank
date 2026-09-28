import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M3_DIAGONALS_NOTE: SubtopicNote = {
  subtopicName: "Diagonals and Cuboid Identities",
  title: "Diagonals & Cuboid Identities",
  oneLineDefinition:
    "The space diagonal of a cuboid, the longest rod in a room, and the algebraic identities that link the sum of the edges, the diagonal, the surface area and the volume.",
  whyItMatters:
    "These questions look as if they need the three edges, and almost never do. One identity — the square of the sum of the edges — turns a diagonal and a surface area into the sum of the edges and back again.",
  concepts: [
    // C1 — the space diagonal
    {
      kind: "formula" as const,
      slug: "cdsm3-space-diagonal",
      name: "The space diagonal",
      intuition:
        "The longest straight line inside a cuboid runs from one corner to the opposite one. It is Pythagoras used twice: first across the floor, then up.",
      definition:
        "- Space diagonal \\(= \\sqrt{l^2 + b^2 + h^2}\\); floor diagonal \\(= \\sqrt{l^2 + b^2}\\).\n" +
        "- Cube of edge \\(a\\): face diagonal \\(a\\sqrt2\\), space diagonal \\(a\\sqrt3\\), so surface \\(= 6a^2 = 2d^2\\).\n" +
        "- Longest rod in a room \\(=\\) the space diagonal; longest rod on the floor \\(=\\) the floor diagonal. Their squares differ by \\(h^2\\).\n" +
        "- The angle between the space diagonal and the floor diagonal: \\(\\cos\\alpha = \\dfrac{\\text{floor diagonal}}{\\text{space diagonal}}\\).",
      formula: {
        label: "Space diagonal",
        latex: "d = \\sqrt{l^2 + b^2 + h^2}",
      },
      authoredExample: {
        prompt: "The longest rod that fits in a room is \\(13\\) m and the longest rod that lies on its floor is \\(12\\) m. Find the room's height.",
        steps: [
          "\\(l^2 + b^2 + h^2 = 169\\) and \\(l^2 + b^2 = 144\\).",
          "Subtracting, \\(h^2 = 25\\), so \\(h = 5\\) m.",
        ],
        answer: "\\(5\\) m.",
      },
      selfCheckExample: {
        prompt: "The space diagonal of a cube is \\(6\\sqrt3\\) cm. Find its volume and surface area.",
        steps: [
          "\\(a\\sqrt3 = 6\\sqrt3\\), so \\(a = 6\\).",
          "Volume \\(216\\) cm\\(^3\\); surface \\(6\\times 36 = 216\\) cm\\(^2\\).",
        ],
        answer: "\\(216\\) cm\\(^3\\) and \\(216\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Cuboid \\(2\\times 3\\times 6\\): space diagonal?", answer: "\\(7\\)" },
        { prompt: "Cube with space diagonal \\(l\\): surface area?", answer: "\\(2l^2\\)" },
        { prompt: "Room \\(12\\times 4\\times 3\\): longest rod?", answer: "\\(13\\)" },
        { prompt: "Cube of edge \\(1\\): face diagonal + space diagonal?", answer: "\\(\\sqrt2 + \\sqrt3\\)" },
      ],
      pyqExampleId: "1a719971-e394-4b27-a08c-857c7dedbafd", // 2021 (II) — room 21 × 16, longest rod 29
      traps: [
        {
          title: "The largest slice is not a face",
          body:
            "A plane through two opposite edges of a cube cuts a rectangle \\(a\\times a\\sqrt2\\), larger than a face (\\(a^2\\)) and larger than the hexagonal section through the centre.",
        },
      ],
    },

    // C2 — sum, surface, diagonal
    {
      kind: "formula" as const,
      slug: "cdsm3-sum-surface-diagonal",
      name: "Sum of edges, surface area and diagonal",
      intuition:
        "Squaring \\(l + b + h\\) gives the diagonal squared plus the surface area. Any two of the three quantities give the third, and the edges themselves are never needed.",
      definition:
        "- \\((l + b + h)^2 = (l^2 + b^2 + h^2) + 2(lb + bh + hl)\\), i.e. \\(\\text{sum}^2 = d^2 + \\text{surface}\\).\n" +
        "- The cube identity: \\(l^3 + b^3 + h^3 - 3lbh = (l + b + h)\\left[(l^2 + b^2 + h^2) - (lb + bh + hl)\\right]\\).",
      formula: {
        label: "The square of the sum",
        latex: "(l + b + h)^2 = d^2 + S",
      },
      authoredExample: {
        prompt: "A cuboid's edges add to \\(19\\) cm and its diagonal is \\(13\\) cm. Find its total surface area.",
        steps: [
          "\\(19^2 = 13^2 + S\\).",
          "\\(S = 361 - 169 = 192\\) cm\\(^2\\).",
        ],
        answer: "\\(192\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "For the same cuboid, find \\(l^3 + b^3 + h^3 - 3lbh\\).",
        steps: [
          "\\(l^2 + b^2 + h^2 = 169\\) and \\(lb + bh + hl = \\dfrac{192}{2} = 96\\).",
          "The identity gives \\(19\\times(169 - 96) = 19\\times 73 = 1387\\).",
        ],
        answer: "\\(1387\\).",
      },
      practiceSet: [
        { prompt: "Sum \\(12\\), diagonal \\(\\sqrt{50}\\): surface?", answer: "\\(94\\)" },
        { prompt: "Diagonal \\(7\\), surface \\(72\\): sum of edges?", answer: "\\(11\\)" },
        { prompt: "Sum \\(10\\), surface \\(64\\): diagonal?", answer: "\\(6\\)" },
        { prompt: "Name the identity that links sum, diagonal and surface.", answer: "\\((l+b+h)^2 = d^2 + S\\)" },
      ],
      pyqExampleId: "0d1ca03a-2e52-4178-9b23-b7bd16a848cf", // 2023 (I) — diagonal 11, surface 240
    },

    // C3 — face areas and reciprocals
    {
      kind: "formula" as const,
      slug: "cdsm3-face-areas",
      name: "Face areas, volume and reciprocals",
      intuition:
        "The three faces meeting at a corner have areas \\(lb\\), \\(bh\\) and \\(hl\\). Multiply them and every edge appears twice: the product is the square of the volume.",
      definition:
        "- Adjacent faces \\(x, y, z\\): \\(xyz = (lbh)^2 = V^2\\).\n" +
        "- \\(\\dfrac1l + \\dfrac1b + \\dfrac1h = \\dfrac{lb + bh + hl}{lbh} = \\dfrac{S}{2V}\\).",
      formula: {
        label: "Adjacent faces",
        latex: "xyz = V^2, \\qquad \\frac1l + \\frac1b + \\frac1h = \\frac{S}{2V}",
      },
      authoredExample: {
        prompt: "Three faces of a cuboid meeting at a corner have areas \\(12\\), \\(15\\) and \\(20\\) cm\\(^2\\). Find its volume.",
        steps: [
          "\\(V^2 = 12\\times 15\\times 20 = 3600\\).",
          "\\(V = 60\\) cm\\(^3\\).",
        ],
        answer: "\\(60\\) cm\\(^3\\).",
      },
      selfCheckExample: {
        prompt: "A cuboid has volume \\(120\\) cm\\(^3\\) and surface area \\(148\\) cm\\(^2\\). Find \\(\\dfrac1l + \\dfrac1b + \\dfrac1h\\).",
        steps: [
          "\\(\\dfrac{S}{2V} = \\dfrac{148}{240} = \\dfrac{37}{60}\\).",
        ],
        answer: "\\(\\dfrac{37}{60}\\).",
      },
      practiceSet: [
        { prompt: "Faces \\(6, 8, 12\\): volume?", answer: "\\(24\\)" },
        { prompt: "Volume \\(30\\), two faces \\(5\\) and \\(6\\): third face?", answer: "\\(30\\)" },
        { prompt: "\\(V = 8\\), \\(S = 24\\): sum of reciprocals of the edges?", answer: "\\(\\dfrac32\\)" },
        { prompt: "\\(xyz\\) in terms of \\(V\\)?", answer: "\\(V^2\\)" },
      ],
      pyqExampleId: "764e2857-09dc-4da4-9901-790a3f702c80", // 2023 (I) — volume 3600, two faces 225 and 144
    },
  ],
};
