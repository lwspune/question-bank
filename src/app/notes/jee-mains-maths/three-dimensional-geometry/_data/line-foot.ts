import type { SubtopicNote } from "@/app/notes/_types";

export const LINE_FOOT_3D_NOTE: SubtopicNote = {
  subtopicName: "Foot, Image and Distance from a Line",
  title: "Foot, Image and Distance from a Line",
  oneLineDefinition:
    "Dropping a perpendicular from a point to a line in space: where it lands (the foot), the mirror image of the point in the line, how far the point is from the line, and triangles that have one side on the line.",
  whyItMatters:
    "Fifty-seven PYQs, the second-largest page in the chapter, and almost all of them start the same way: write the line's general point, then force it to be perpendicular. Four ideas cover the page.",
  concepts: [
    // C1 — foot of the perpendicular
    {
      kind: "formula" as const,
      slug: "j3d-foot-on-line",
      name: "The foot of the perpendicular on a line",
      intuition:
        "Every point of the line is \\(A+t\\vec d\\) for one number \\(t\\). The foot \\(M\\) of the perpendicular from \\(P\\) is the one for which \\(\\vec{PM}\\) is perpendicular to \\(\\vec d\\). That single dot-product equation is linear in \\(t\\), so the foot always comes out in one step.",
      definition:
        "- General point of the line: \\(M=A+t\\vec d\\).\n" +
        "- Condition: \\((M-P)\\cdot\\vec d=0\\).\n" +
        "- Solving: \\(t=\\frac{(P-A)\\cdot\\vec d}{|\\vec d|^2}\\).\n" +
        "- The same equation, read backwards, finds an unknown in \\(P\\) when the foot is given.",
      formula: {
        label: "Parameter of the foot",
        latex: "t=\\frac{(P-A)\\cdot\\vec d}{|\\vec d|^2},\\qquad M=A+t\\vec d",
      },
      authoredExample: {
        prompt: "Find the foot of the perpendicular from \\(P(1,2,3)\\) to \\(\\frac{x-1}{2}=\\frac{y+1}{1}=\\frac{z}{2}\\).",
        steps: [
          "\\(A=(1,-1,0)\\), \\(\\vec d=(2,1,2)\\), \\(P-A=(0,3,3)\\).",
          "\\(t=\\frac{0+3+6}{9}=1\\), so \\(M=(3,0,2)\\).",
          "Check: \\(M-P=(2,-2,-1)\\) and \\((2,-2,-1)\\cdot(2,1,2)=0\\).",
        ],
        answer: "\\((3,0,2)\\).",
      },
      selfCheckExample: {
        prompt: "Find the foot of the perpendicular from the origin to the line through \\((1,1,1)\\) with direction \\((1,-1,1)\\).",
        steps: [
          "\\(P-A=(-1,-1,-1)\\); \\(t=\\frac{-1+1-1}{3}=-\\frac13\\).",
          "\\(M=(1,1,1)-\\frac13(1,-1,1)\\).",
        ],
        answer: "\\(\\left(\\frac23,\\frac43,\\frac23\\right)\\).",
      },
      practiceSet: [
        { prompt: "Foot of \\((3,4,5)\\) on the \\(z\\)-axis?", answer: "\\((0,0,5)\\)" },
        { prompt: "Foot of \\((1,2,3)\\) on \\(x=y=z\\)?", answer: "\\((2,2,2)\\)", method: "\\(t=\\frac{6}{3}\\)" },
        { prompt: "Denominator in the formula for \\(t\\)?", answer: "\\(|\\vec d|^2\\)" },
        { prompt: "Foot of \\((2,5,0)\\) on the \\(x\\)-axis?", answer: "\\((2,0,0)\\)" },
      ],
      pyqExampleId: "15a04320-8487-4340-bd37-f52c7cf17918", // 2024 — foot from (1,2,3) on (x+3)/5 = (y-1)/2 = (z+4)/3
      traps: [
        {
          title: "Divide by \\(|\\vec d|^2\\), not \\(|\\vec d|\\)",
          body: "\\(t\\) multiplies \\(\\vec d\\) itself, so the projection must be divided by the SQUARED length. Using \\(|\\vec d|\\) gives a point that is off the perpendicular.",
        },
      ],
    },

    // C2 — image in a line
    {
      kind: "formula" as const,
      slug: "j3d-image-in-line",
      name: "The image of a point in a line",
      intuition:
        "The image \\(Q\\) of \\(P\\) in a line is as far beyond the line as \\(P\\) is in front of it, along the same perpendicular. So the foot \\(M\\) is the midpoint of \\(PQ\\), and \\(Q=2M-P\\). Find the foot, then double it.",
      definition:
        "- \\(M\\) = foot from \\(P\\); image \\(Q=2M-P\\).\n" +
        "- \\(PQ\\) is perpendicular to the line and its midpoint lies on the line.\n" +
        "- When the image is given with unknowns, use both facts: the midpoint is on the line, and \\(\\vec{PQ}\\cdot\\vec d=0\\).\n" +
        "- A point on the line is its own image.",
      formula: {
        label: "Image from the foot",
        latex: "Q=2M-P",
      },
      authoredExample: {
        prompt: "Find the image of \\(P(1,2,3)\\) in \\(\\frac{x-1}{2}=\\frac{y+1}{1}=\\frac{z}{2}\\).",
        steps: [
          "The foot is \\(M=(3,0,2)\\) (found from \\(t=1\\)).",
          "\\(Q=2(3,0,2)-(1,2,3)\\).",
        ],
        answer: "\\((5,-2,1)\\).",
      },
      selfCheckExample: {
        prompt: "Find the image of \\((1,2,3)\\) in the line \\(x=y=z\\).",
        steps: [
          "Foot \\(M=(2,2,2)\\).",
          "\\(Q=2M-P\\).",
        ],
        answer: "\\((3,2,1)\\).",
      },
      practiceSet: [
        { prompt: "Image of \\((3,4,5)\\) in the \\(z\\)-axis?", answer: "\\((-3,-4,5)\\)" },
        { prompt: "Image of \\((2,0,0)\\) in the \\(x\\)-axis?", answer: "\\((2,0,0)\\) itself" },
        { prompt: "Foot \\((1,1,1)\\), \\(P=(0,2,3)\\). Image?", answer: "\\((2,0,-1)\\)" },
        { prompt: "Where is the midpoint of a point and its image?", answer: "On the line" },
      ],
      pyqExampleId: "711422e0-53c3-476c-bd67-31cba2fb2d51", // 2025 — image of (4,4,3) in (x-1)/2 = (y-2)/1 = (z-1)/3
      traps: [
        {
          title: "\\(2M-P\\), not \\(M+P\\)",
          body: "The foot is the MIDPOINT of \\(P\\) and its image, so \\(Q=2M-P\\). Adding \\(M\\) and \\(P\\) gives a point nowhere near the line.",
        },
      ],
    },

    // C3 — distance from a line
    {
      kind: "formula" as const,
      slug: "j3d-distance-point-line",
      name: "Distance of a point from a line",
      intuition:
        "The distance is the length \\(PM\\) to the foot. A faster route skips the foot: the parallelogram on \\(\\vec{AP}\\) and \\(\\vec d\\) has area \\(|\\vec{AP}\\times\\vec d|\\), and dividing by the base \\(|\\vec d|\\) leaves its height, which is the distance. When the line is given as two planes, its direction is the cross product of their normals.",
      definition:
        "- \\(d=\\frac{|\\vec{AP}\\times\\vec d|}{|\\vec d|}\\), with \\(A\\) any point of the line.\n" +
        "- Or \\(d^2=|\\vec{AP}|^2-\\frac{(\\vec{AP}\\cdot\\vec d)^2}{|\\vec d|^2}\\).\n" +
        "- Line given as two planes: direction \\(\\vec n_1\\times\\vec n_2\\); find one common point by setting one coordinate to \\(0\\).\n" +
        "- From the axes: distance of \\((x,y,z)\\) from the \\(x\\)-axis is \\(\\sqrt{y^2+z^2}\\).",
      formula: {
        label: "Distance from a line",
        latex: "d=\\frac{|\\vec{AP}\\times\\vec d|}{|\\vec d|}",
      },
      authoredExample: {
        prompt: "Find the distance of \\((1,2,3)\\) from the line \\(x=y=z\\).",
        steps: [
          "\\(A=O\\), \\(\\vec{AP}=(1,2,3)\\), \\(\\vec d=(1,1,1)\\).",
          "\\(\\vec{AP}\\times\\vec d=(-1,2,-1)\\), of length \\(\\sqrt6\\).",
          "\\(d=\\frac{\\sqrt6}{\\sqrt3}\\). Check with the foot \\((2,2,2)\\): \\(\\sqrt{1+0+1}\\).",
        ],
        answer: "\\(\\sqrt2\\).",
      },
      selfCheckExample: {
        prompt: "Find the distance of the origin from the line through \\((1,0,0)\\) with direction \\((0,1,1)\\).",
        steps: [
          "\\(\\vec{AP}=(-1,0,0)\\); \\(\\vec{AP}\\times\\vec d=(0,1,-1)\\), length \\(\\sqrt2\\).",
          "Divide by \\(|\\vec d|=\\sqrt2\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "Distance of \\((3,4,5)\\) from the \\(z\\)-axis?", answer: "\\(5\\)" },
        { prompt: "Distance of \\((3,4,5)\\) from the \\(x\\)-axis?", answer: "\\(\\sqrt{41}\\)" },
        { prompt: "Direction of the line given by the planes \\(x+y=0\\) and \\(z=1\\)?", answer: "\\((1,-1,0)\\)", method: "\\((1,1,0)\\times(0,0,1)\\)" },
        { prompt: "\\(|\\vec{AP}\\times\\vec d|=6\\), \\(|\\vec d|=3\\). Distance?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "ca8e4d56-90da-4fbf-9d6d-e761469f9419", // 2026 — square of the distance of P(5,6,7) from a line
      traps: [
        {
          title: "Divide by \\(|\\vec d|\\)",
          body: "\\(|\\vec{AP}\\times\\vec d|\\) is a parallelogram's AREA. Only after dividing by the base length \\(|\\vec d|\\) is it a distance.",
        },
      ],
    },

    // C4 — triangles with a side on the line
    {
      kind: "formula" as const,
      slug: "j3d-triangle-on-line",
      name: "Triangles with a side on the line",
      intuition:
        "When two vertices of a triangle lie on a line and the third, \\(P\\), is off it, the height of the triangle is the distance \\(PM\\) to the foot. Points on the line at a given distance \\(k\\) from \\(P\\) sit symmetrically about \\(M\\), at \\(\\sqrt{k^2-PM^2}\\) either side. That symmetry also puts their midpoint at \\(M\\), which makes centroids easy.",
      definition:
        "- Height = \\(PM\\); area \\(=\\frac12\\cdot\\) base \\(\\cdot PM\\).\n" +
        "- Points on the line at distance \\(k\\) from \\(P\\): \\(M\\pm\\sqrt{k^2-PM^2}\\,\\hat d\\).\n" +
        "- Those two points have midpoint \\(M\\), so the centroid with \\(P\\) is \\(\\frac{2M+P}{3}\\).\n" +
        "- A right angle at the foot: \\(PM^2+MQ^2=PQ^2\\).",
      formula: {
        label: "Half-chord and area",
        latex: "MQ=\\sqrt{k^2-PM^2},\\qquad [PQR]=\\tfrac12\\,QR\\cdot PM",
      },
      authoredExample: {
        prompt: "\\(Q\\) and \\(R\\) are the points on the \\(z\\)-axis at distance \\(13\\) from \\(P(3,4,0)\\). Find the area of \\(\\triangle PQR\\).",
        steps: [
          "The foot of \\(P\\) on the \\(z\\)-axis is \\(M=O\\), with \\(PM=5\\).",
          "\\(MQ=\\sqrt{169-25}=12\\): \\(Q,R=(0,0,\\pm12)\\), so \\(QR=24\\).",
          "Area \\(=\\frac12\\cdot24\\cdot5\\).",
        ],
        answer: "\\(60\\).",
      },
      selfCheckExample: {
        prompt: "Find the centroid of that triangle.",
        steps: [
          "\\(Q+R=2M=(0,0,0)\\), so the centroid is \\(\\frac{P}{3}\\).",
        ],
        answer: "\\(\\left(1,\\frac43,0\\right)\\).",
      },
      practiceSet: [
        { prompt: "Base \\(10\\) on the line, \\(PM=4\\). Area?", answer: "\\(20\\)" },
        { prompt: "\\(PM=3\\), \\(k=5\\). Half-chord?", answer: "\\(4\\)" },
        { prompt: "\\(M=(1,2,3)\\), \\(P=(4,2,3)\\). Centroid of \\(P\\) and the two symmetric points?", answer: "\\((2,2,3)\\)" },
        { prompt: "\\(PM=6\\), \\(k=6\\). How many such points?", answer: "One: the foot itself" },
      ],
      pyqExampleId: "8fcbce21-d936-4398-91ab-5d004e68b871", // 2025 — AC = 6 on a line, B off it; area of ABC
      traps: [
        {
          title: "The height is \\(PM\\), not \\(PQ\\)",
          body: "The height of the triangle is the perpendicular distance to the line. \\(PQ\\) is a slanted side; using it overstates the area.",
        },
      ],
    },
  ],
};
