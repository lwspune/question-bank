import type { SubtopicNote } from "@/app/notes/_types";

export const PLANE_DISTANCE_3D_NOTE: SubtopicNote = {
  subtopicName: "Distance, Foot and Image in a Plane",
  title: "Distance, Foot and Image in a Plane",
  oneLineDefinition:
    "Measuring from a point to a plane: the perpendicular distance, the distance between parallel planes and which side a point lies on, the foot and the mirror image of a point, and projections onto a plane.",
  whyItMatters:
    "Twenty-seven PYQs, most of them the same computation: put the point into the plane's equation and divide by the normal's length. The image of a point in a plane is the most common single question. Three ideas cover the page.",
  concepts: [
    // C1 — distance from a plane
    {
      kind: "formula" as const,
      slug: "j3d-distance-point-plane",
      name: "Distance from a plane, parallel planes and sides of a plane",
      intuition:
        "Put a point into the left side of \\(ax+by+cz+d\\): the number you get, divided by \\(|\\vec n|\\), is its signed distance from the plane. Its size is the perpendicular distance and its sign tells which side the point is on. Parallel planes, once written with the same normal, are \\(\\frac{|d_1-d_2|}{|\\vec n|}\\) apart.",
      definition:
        "- **Distance:** \\(\\frac{|ax_1+by_1+cz_1+d|}{\\sqrt{a^2+b^2+c^2}}\\).\n" +
        "- **Parallel planes** \\(ax+by+cz+d_1=0\\) and \\(ax+by+cz+d_2=0\\): \\(\\frac{|d_1-d_2|}{\\sqrt{a^2+b^2+c^2}}\\) (same \\(a,b,c\\) first).\n" +
        "- **Same side:** the two values have the same sign; opposite signs mean opposite sides.\n" +
        "- **Bisector planes:** \\(\\frac{P_1}{|\\vec n_1|}=\\pm\\frac{P_2}{|\\vec n_2|}\\).",
      formula: {
        label: "Distance of a point from a plane",
        latex: "d=\\frac{|ax_1+by_1+cz_1+d|}{\\sqrt{a^2+b^2+c^2}}",
      },
      authoredExample: {
        prompt: "Find the distance of \\((1,2,3)\\) from \\(2x-y+2z=3\\).",
        steps: [
          "\\(2-2+6-3=3\\) and \\(|\\vec n|=3\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "Find the distance between \\(2x+y-2z=1\\) and \\(4x+2y-4z=11\\).",
        steps: [
          "Halve the second: \\(2x+y-2z=\\frac{11}{2}\\).",
          "\\(\\frac{|\\frac{11}{2}-1|}{3}\\).",
        ],
        answer: "\\(\\frac32\\).",
      },
      practiceSet: [
        { prompt: "Are \\((1,1,1)\\) and \\((-1,0,0)\\) on the same side of \\(x+y+z=1\\)?", answer: "No: values \\(2\\) and \\(-2\\)" },
        { prompt: "Planes parallel to \\(x-2y+2z=0\\) at unit distance from \\((1,1,1)\\)?", answer: "\\(x-2y+2z+2=0\\) and \\(x-2y+2z-4=0\\)" },
        { prompt: "Distance of the origin from \\(3x+4y+12z=26\\)?", answer: "\\(2\\)" },
        { prompt: "Distance between \\(z=1\\) and \\(z=-4\\)?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "ed729833-333b-4d10-942a-0e608afe5ca5", // 2021 — planes parallel to x - 2y + 2z - 3 = 0 at unit distance from (1,2,3)
      traps: [
        {
          title: "Match the normals before subtracting constants",
          body: "\\(2x+y-2z=1\\) and \\(4x+2y-4z=11\\) are parallel, but \\(|11-1|/3\\) is wrong: rescale one equation so both have the same \\(a,b,c\\) first.",
        },
      ],
    },

    // C2 — foot and image
    {
      kind: "formula" as const,
      slug: "j3d-foot-image-plane",
      name: "The foot and the image of a point in a plane",
      intuition:
        "From \\(P\\), walk along the normal until you hit the plane: that is the foot \\(F\\). Keep going the same distance again: that is the image \\(Q\\). Both are \\(P\\) minus a multiple of \\(\\vec n\\), and the multiple is the plane's value at \\(P\\) divided by \\(|\\vec n|^2\\), once for the foot and twice for the image.",
      definition:
        "- Let \\(k=\\frac{ax_1+by_1+cz_1+d}{a^2+b^2+c^2}\\).\n" +
        "- **Foot:** \\(F=P-k\\,\\vec n\\).\n" +
        "- **Image:** \\(Q=P-2k\\,\\vec n\\).\n" +
        "- \\(F\\) is the midpoint of \\(P\\) and \\(Q\\), and \\(\\vec{PQ}\\parallel\\vec n\\).\n" +
        "- With the image given and unknowns in the plane: \\(\\vec{PQ}\\parallel\\vec n\\) and the midpoint lies on the plane.",
      formula: {
        label: "Foot and image",
        latex: "F=P-k\\,\\vec n,\\quad Q=P-2k\\,\\vec n,\\quad k=\\frac{ax_1+by_1+cz_1+d}{a^2+b^2+c^2}",
      },
      authoredExample: {
        prompt: "Find the foot and the image of \\((1,2,3)\\) in \\(x+y+z=3\\).",
        steps: [
          "\\(k=\\frac{1+2+3-3}{3}=1\\).",
          "Foot \\((1,2,3)-(1,1,1)\\); image \\((1,2,3)-2(1,1,1)\\).",
        ],
        answer: "Foot \\((0,1,2)\\), image \\((-1,0,1)\\).",
      },
      selfCheckExample: {
        prompt: "Find the foot of the perpendicular from \\((2,1,0)\\) to \\(2x-y+2z=12\\).",
        steps: [
          "\\(k=\\frac{4-1+0-12}{9}=-1\\).",
          "\\(F=(2,1,0)+(2,-1,2)\\). Check: \\(8-0+4=12\\).",
        ],
        answer: "\\((4,0,2)\\).",
      },
      practiceSet: [
        { prompt: "Image of the origin in \\(x+y+z=3\\)?", answer: "\\((2,2,2)\\)" },
        { prompt: "Foot of the origin on \\(x+y+z=3\\)?", answer: "\\((1,1,1)\\)" },
        { prompt: "Image of \\((x,y,z)\\) in \\(z=0\\)?", answer: "\\((x,y,-z)\\)" },
        { prompt: "Image of a point already on the plane?", answer: "The point itself" },
      ],
      pyqExampleId: "899a4f57-2c4a-451b-9475-3c48307c22ac", // 2023 — image of P(2,3,5) in 2x + y - 3z = 6
      traps: [
        {
          title: "Keep the sign of the plane's value",
          body: "\\(k\\) can be negative, which moves the point along \\(+\\vec n\\). Taking \\(|k|\\) sends the foot and image to the wrong side.",
        },
      ],
    },

    // C3 — projections
    {
      kind: "formula" as const,
      slug: "j3d-projection-plane",
      name: "Projections onto a plane",
      intuition:
        "The projection of a segment onto a plane is what is left after removing its component along the normal. So its length is \\(\\sqrt{|\\vec v|^2-(\\vec v\\cdot\\hat n)^2}\\). When two points have equal values in the plane's equation, the segment joining them is parallel to the plane and projects to its own length.",
      definition:
        "- **Length of the projection of \\(\\vec v\\):** \\(\\sqrt{|\\vec v|^2-(\\vec v\\cdot\\hat n)^2}\\).\n" +
        "- **Projection of a segment \\(PQ\\):** the segment joining the two feet.\n" +
        "- Equal plane-values at \\(P\\) and \\(Q\\): \\(PQ\\) is parallel to the plane and the projection has length \\(PQ\\).\n" +
        "- The projection of a curve: take the foot of its general point, then remove the parameter.",
      formula: {
        label: "Length of a projection onto a plane",
        latex: "\\sqrt{|\\vec v|^2-(\\vec v\\cdot\\hat n)^2}",
      },
      authoredExample: {
        prompt: "Find the length of the projection of \\(\\vec v=(1,2,2)\\) on the plane \\(x+y+z=0\\).",
        steps: [
          "\\(\\vec v\\cdot\\hat n=\\frac{5}{\\sqrt3}\\), \\(|\\vec v|^2=9\\).",
          "\\(9-\\frac{25}{3}=\\frac23\\).",
        ],
        answer: "\\(\\sqrt{\\frac23}\\).",
      },
      selfCheckExample: {
        prompt: "Find the distance between the feet of \\((1,0,0)\\) and \\((0,1,0)\\) on the plane \\(z=5\\).",
        steps: [
          "The feet are \\((1,0,5)\\) and \\((0,1,5)\\).",
        ],
        answer: "\\(\\sqrt2\\).",
      },
      practiceSet: [
        { prompt: "Projection of \\((3,4,5)\\) on the plane \\(z=0\\)?", answer: "\\((3,4,0)\\), length \\(5\\)" },
        { prompt: "\\(P\\) and \\(Q\\) have equal plane-values. Projection of \\(PQ\\)?", answer: "Its own length" },
        { prompt: "Projection of \\(\\vec n\\) itself on the plane?", answer: "Zero" },
        { prompt: "\\(|\\vec v|=5\\), \\(\\vec v\\cdot\\hat n=3\\). Projection length?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "ac8c7739-3abc-4356-bebb-4dc0b5d89c09", // 2022 — distance between the feet of P and Q on -x + y + z = 1
      traps: [
        {
          title: "Subtract the normal component, not the whole vector",
          body: "The projection keeps the part of \\(\\vec v\\) that lies in the plane. Using \\(\\vec v\\cdot\\hat n\\) as the answer gives the part that was removed.",
        },
      ],
    },
  ],
};
