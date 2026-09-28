import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M2_CIRCLES_NOTE: SubtopicNote = {
  subtopicName: "Circumference, Wheels and Rings",
  title: "Circumference, Wheels & Rings",
  oneLineDefinition:
    "Circumference and area of a circle, revolutions of a wheel, how area scales with the radius, and the ring between two concentric circles.",
  whyItMatters:
    "The easiest page of the chapter and one of the most dependable: wheel-revolution questions have appeared in almost every paper. Nearly all of it runs on π = 22/7, with radii chosen as multiples of 7 so that the arithmetic comes out whole.",
  concepts: [
    // C1 — circumference and wheels
    {
      kind: "formula" as const,
      slug: "cdsm2-circumference-wheels",
      name: "Circumference and wheel revolutions",
      intuition:
        "One turn of a wheel rolls it forward by exactly one circumference. So revolutions are distance divided by circumference; convert both to the same unit first.",
      definition:
        "- Circumference \\(= 2\\pi r = \\pi d\\).\n" +
        "- Revolutions \\(= \\dfrac{\\text{distance}}{\\pi d}\\).\n" +
        "- Two wheels covering the same distance: revolutions are inversely proportional to the diameters, \\(n_1 d_1 = n_2 d_2\\).\n" +
        "- Semicircle perimeter \\(= \\pi r + 2r = \\dfrac{36r}{7}\\) with \\(\\pi = \\tfrac{22}{7}\\).\n" +
        "- \"Circumference exceeds diameter by \\(k\\)\": \\(\\pi d - d = k\\), so \\(d = \\dfrac{7k}{15}\\).\n" +
        "- On a circular track the inner wheel runs the smaller radius, so it turns fewer times.",
      formula: {
        label: "Wheel revolutions",
        latex: "n = \\frac{\\text{distance}}{2\\pi r}",
      },
      authoredExample: {
        prompt: "A wheel of radius \\(21\\) cm rolls \\(2.64\\) km. How many revolutions does it make? \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "Circumference \\(= 2\\times\\dfrac{22}{7}\\times 21 = 132\\) cm.",
          "Distance \\(= 2.64\\) km \\(= 264000\\) cm.",
          "\\(n = \\dfrac{264000}{132} = 2000\\).",
        ],
        answer: "\\(2000\\) revolutions.",
      },
      selfCheckExample: {
        prompt: "A car's wheels have diameter \\(70\\) cm. How many revolutions does each make in \\(5\\) minutes at \\(66\\) km/h? \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "In \\(5\\) minutes the car goes \\(66\\times\\dfrac{5}{60} = 5.5\\) km \\(= 550000\\) cm.",
          "Circumference \\(= \\dfrac{22}{7}\\times 70 = 220\\) cm.",
          "\\(n = \\dfrac{550000}{220} = 2500\\).",
        ],
        answer: "\\(2500\\).",
      },
      practiceSet: [
        { prompt: "Wheel of diameter \\(1.4\\) m: distance in \\(100\\) turns? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(440\\) m" },
        { prompt: "Wheels of diameters \\(40\\) and \\(60\\) cm: the smaller turns \\(90\\) times; the larger?", answer: "\\(60\\)" },
        { prompt: "Circumference exceeds diameter by \\(30\\): diameter? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(14\\)" },
        { prompt: "Semicircular park of radius \\(14\\): perimeter? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(72\\)" },
      ],
      pyqExampleId: "506d25e4-c1b9-492f-8413-65735cf1010e", // 2016 (II) — 80 cm wheels at 66 km/h for 10 minutes
      traps: [
        {
          title: "Radius or diameter?",
          body:
            "Stems switch between the two. Revolutions use the circumference \\(\\pi d = 2\\pi r\\); dividing by \\(\\pi r\\) doubles the answer and that doubled value is usually an option.",
        },
      ],
    },

    // C2 — area scales with r²
    {
      kind: "formula" as const,
      slug: "cdsm2-circle-area-scaling",
      name: "Area grows as the square of the radius",
      intuition:
        "Circumference is proportional to the radius and area to its square. A \\(10\\%\\) longer circumference is a \\(10\\%\\) larger radius and a \\(21\\%\\) larger area.",
      definition:
        "- Area \\(= \\pi r^2\\).\n" +
        "- Areas in ratio \\(p : q\\) means radii in ratio \\(\\sqrt p : \\sqrt q\\).\n" +
        "- Radius scaled by \\(k\\): circumference by \\(k\\), area by \\(k^2\\).\n" +
        "- A circle equal in area to two others: \\(R^2 = r_1^2 + r_2^2\\).\n" +
        "- Cutting holes from a plate of uniform thickness removes the same fraction of weight as of area.",
      formula: {
        label: "Circle",
        latex: "A = \\pi r^2, \\qquad \\frac{A_1}{A_2} = \\left(\\frac{r_1}{r_2}\\right)^2",
      },
      authoredExample: {
        prompt: "The radius of a circle is increased by \\(20\\%\\). By what percentage does its area increase?",
        steps: [
          "The area is multiplied by \\(1.2^2 = 1.44\\).",
          "The increase is \\(44\\%\\).",
        ],
        answer: "\\(44\\%\\).",
      },
      selfCheckExample: {
        prompt: "Two circles have radii \\(9\\) cm and \\(12\\) cm. Find the radius of a single circle whose area equals their combined area.",
        steps: [
          "\\(\\pi R^2 = \\pi(9^2 + 12^2) = 225\\pi\\).",
          "\\(R = 15\\) cm.",
        ],
        answer: "\\(15\\) cm.",
      },
      practiceSet: [
        { prompt: "Areas \\(9 : 25\\): radii in ratio?", answer: "\\(3 : 5\\)" },
        { prompt: "Radius doubled: area multiplied by?", answer: "\\(4\\)" },
        { prompt: "Area of a circle of diameter \\(14\\)? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(154\\)" },
        { prompt: "Circumference up \\(10\\%\\): area up by?", answer: "\\(21\\%\\)" },
      ],
      pyqExampleId: "27b6800e-4b68-4e56-a4e4-73b3f80bc40f", // 2017 (I) — circumference up 15%
      traps: [
        {
          title: "Equal-area rings get thinner outward",
          body:
            "Split a disc into rings of equal area and the radii go as \\(\\sqrt1, \\sqrt2, \\sqrt3, \\ldots\\). The ratio of neighbouring radii, \\(\\sqrt{1 + \\tfrac1m}\\), falls as you move out.",
        },
      ],
    },

    // C3 — rings
    {
      kind: "formula" as const,
      slug: "cdsm2-rings",
      name: "The ring between two circles",
      intuition:
        "The area between two concentric circles is \\(\\pi(R^2 - r^2)\\), and \\(R^2 - r^2\\) is often all you know. A chord of the outer circle that just touches the inner one gives it directly: half the chord squared.",
      definition:
        "- Ring (annulus) area \\(= \\pi(R^2 - r^2) = \\pi(R + r)(R - r)\\).\n" +
        "- A path of width \\(w\\) round a circular plot of radius \\(r\\): outer radius \\(r + w\\).\n" +
        "- A chord of length \\(2c\\) of the outer circle tangent to the inner circle: \\(R^2 - r^2 = c^2\\), so the ring's area is \\(\\pi c^2\\), whatever the two radii are.",
      formula: {
        label: "Ring from a tangent chord",
        latex: "\\text{Ring} = \\pi(R^2 - r^2) = \\pi\\left(\\tfrac{\\text{chord}}{2}\\right)^2",
      },
      authoredExample: {
        prompt: "A chord of length \\(28\\) cm of the outer of two concentric circles touches the inner circle. Find the area of the ring. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "The point of contact bisects the chord, so half the chord is \\(14\\).",
          "The inner radius, the outer radius and the half-chord form a right triangle: \\(R^2 - r^2 = 14^2 = 196\\).",
          "Ring \\(= \\dfrac{22}{7}\\times 196 = 616\\) cm\\(^2\\).",
        ],
        answer: "\\(616\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A circular pond of radius \\(7\\) m has a path \\(3.5\\) m wide around it. Find the area of the path. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "Outer radius \\(= 10.5\\) m.",
          "Path \\(= \\dfrac{22}{7}(10.5^2 - 7^2) = \\dfrac{22}{7}\\times 61.25 = 192.5\\) m\\(^2\\).",
        ],
        answer: "\\(192.5\\) m\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Radii \\(5\\) and \\(3\\): ring area?", answer: "\\(16\\pi\\)" },
        { prompt: "Tangent chord \\(10\\): ring area?", answer: "\\(25\\pi\\)" },
        { prompt: "Circumferences \\(44\\) and \\(88\\): ring area? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(462\\)" },
        { prompt: "Plot area \\(100\\pi\\), path \\(2\\) wide: total area?", answer: "\\(144\\pi\\)" },
      ],
      pyqExampleId: "36dc7d18-8355-4df0-9649-c6272d62ef47", // 2024 (I) — tangent chord of 14 cm
      traps: [
        {
          title: "\"Cannot be determined\" is the bait",
          body:
            "The ring's area needs only \\(R^2 - r^2\\), not \\(R\\) and \\(r\\) separately. When an option says the data are insufficient, the tangent-chord fact is usually what makes it wrong.",
        },
      ],
    },
  ],
};
