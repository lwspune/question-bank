import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_LI_PLANE_NOTE: SubtopicNote = {
  subtopicName: "Reflection and Plane Mirrors",
  title: "Reflection and Plane Mirrors",
  oneLineDefinition:
    "Light reflects with the angle of reflection equal to the angle of incidence, both measured from the normal; a plane mirror gives an erect, same-size, laterally inverted virtual image as far behind it as the object is in front, and two mirrors at an angle θ give 360/θ − 1 images.",
  whyItMatters:
    "Eight questions in the bank, one EASY, four MODERATE and three HARD. Four test the laws of reflection: an angle of reflection, true statements about diffused reflection, the laws for every kind of mirror, and the image of a word in a tilted mirror. The other four put two or three mirrors together: the formula for the number of images, the triangle formed by an object and its two images (asked twice, with mirrors at 90° and at 120°), and a closed triangle of mirrors.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9lipm-laws",
      name: "Laws of reflection and the image in a plane mirror",
      intuition:
        "A ball thrown at a wall bounces off at the same slant it came in with. Light does the same at a mirror. The slant is always measured from the normal, the line standing straight up from the mirror at that point. A rough wall sends parallel light off in all directions, but only because each tiny bit of the wall faces a different way: at every point the law still holds.",
      definition:
        "- **First law**: the incident ray, the reflected ray and the **normal** at the point of incidence lie in the **same plane**, with the two rays on **opposite sides** of the normal.\n" +
        "- **Second law**: the **angle of incidence equals the angle of reflection**, \\(\\angle i = \\angle r\\). Both are measured from the **normal**, not from the mirror.\n" +
        "- If a ray makes an angle θ with the **mirror surface**, the angle of incidence is \\(90^\\circ-\\theta\\).\n" +
        "- The laws hold for **every** mirror: plane, concave and convex.\n" +
        "- **Regular reflection** happens at a smooth surface: parallel rays stay parallel. **Diffused (irregular) reflection** happens at a rough surface: parallel rays meet normals that point different ways, so the angle of incidence differs from point to point and the rays scatter. The laws are still obeyed at **each point**.\n" +
        "- **Image in a plane mirror**: virtual, erect, the same size, as far **behind** the mirror as the object is in **front**, and **laterally inverted** (left and right swapped).",
      formula: {
        label: "Laws of reflection",
        latex: "\\angle i = \\angle r \\qquad \\angle i = 90^\\circ-\\theta",
        symbols: [
          { symbol: "i", meaning: "angle of incidence, measured from the normal" },
          { symbol: "r", meaning: "angle of reflection, measured from the normal" },
          { symbol: "θ", meaning: "angle between the incident ray and the mirror surface" },
        ],
      },
      authoredExample: {
        prompt: "A ray of light strikes a plane mirror making an angle of 20° with the mirror surface. Find the angle of incidence, the angle of reflection and the angle between the incident and reflected rays.",
        steps: [
          "Angle of incidence: \\(90^\\circ-20^\\circ = 70^\\circ\\).",
          "Angle of reflection = angle of incidence = \\(70^\\circ\\).",
          "Angle between the two rays: \\(70^\\circ + 70^\\circ = 140^\\circ\\).",
        ],
        answer: "70°, 70° and 140°",
      },
      selfCheckExample: {
        prompt: "A ray of light falls on a plane mirror along the normal. What is the angle of reflection, and which way does the ray go?",
        steps: ["Along the normal the angle of incidence is 0°.", "So the angle of reflection is also 0°."],
        answer: "0°: the ray goes straight back along its own path.",
      },
      practiceSet: [
        { prompt: "The angle of incidence of a ray on a plane mirror is 35°. What is the angle between the incident ray and the reflected ray?", answer: "\\(35^\\circ + 35^\\circ = 70^\\circ\\)" },
        { prompt: "A ray makes an angle of 50° with the surface of a plane mirror. What is the angle of reflection?", answer: "\\(90^\\circ-50^\\circ = 40^\\circ\\)" },
        { prompt: "Are the laws of reflection obeyed when light falls on a rough surface?", answer: "Yes: they are obeyed at every point; the rays scatter only because the normals point different ways" },
        { prompt: "A girl stands 2 m in front of a plane mirror. How far is she from her image?", answer: "4 m: the image is 2 m behind the mirror" },
      ],
      pyqExampleId: "ab03032e-0a84-43ed-ae43-e3b48141a89c",
      traps: [
        {
          title: "Measuring the angle from the mirror",
          body: "The angles of incidence and reflection are measured from the normal. A ray at 30° to the mirror surface has an angle of incidence of 60°.",
        },
        {
          title: "Thinking diffused reflection breaks the laws",
          body: "On a rough surface the laws of reflection still hold at every point. The rays scatter because the surface tilts differently from point to point.",
        },
        {
          title: "Calling lateral inversion an upside-down image",
          body: "A plane mirror swaps left and right but keeps the image erect. Your raised right hand appears as the image's left hand, not upside down.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9lipm-multiple",
      name: "Two or more plane mirrors at an angle",
      intuition:
        "Stand between two mirrors joined at an edge and you see several copies of yourself: each mirror reflects you, and also reflects the other mirror's image. The smaller the angle between the mirrors, the more copies. Each image made by one reflection sits exactly opposite the object, as far behind that mirror as the object is in front.",
      definition:
        "- Number of images for two mirrors at an angle θ: \\(n = \\frac{360^\\circ}{\\theta}-1\\), which is the same as \\(\\frac{360^\\circ-\\theta}{\\theta}\\). This holds when \\(\\frac{360^\\circ}{\\theta}\\) is even, and for an object on the bisector.\n" +
        "- At 90° there are 3 images; at 60°, 5; at 45°, 7. Two **parallel** mirrors facing each other give **infinitely many** images.\n" +
        "- The image in each mirror lies on the **perpendicular** from the object to that mirror, at the **same distance** behind it. So an object d from a mirror is **2d** from its image.\n" +
        "- Every image is the **same distance from the meeting point** of the mirrors as the object is: object and images lie on one circle about that point.\n" +
        "- To find a triangle of the object and its two images, place the mirrors on axes (for 90°) or use the circle and the angles between the points.",
      formula: {
        label: "Number of images",
        latex: "n = \\frac{360^\\circ}{\\theta}-1 = \\frac{360^\\circ-\\theta}{\\theta}",
        symbols: [
          { symbol: "n", meaning: "number of images formed" },
          { symbol: "θ", meaning: "angle between the two mirrors" },
        ],
      },
      authoredExample: {
        prompt: "Two plane mirrors are joined at right angles. An object is 3 cm from one mirror and 4 cm from the other. How many images are formed, and how far apart are the two images formed by a single reflection each?",
        steps: [
          "Number of images: \\(\\frac{360^\\circ}{90^\\circ}-1 = 3\\).",
          "Put the mirrors along the axes, so the object is at (3, 4). Its images in the two mirrors are at (−3, 4) and (3, −4).",
          "Distance between them: \\(\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10\\) cm.",
        ],
        answer: "3 images; the two single-reflection images are 10 cm apart",
      },
      selfCheckExample: {
        prompt: "How many images are formed by two plane mirrors placed at 45° to each other?",
        steps: ["\\(n = \\frac{360^\\circ}{45^\\circ}-1 = 8-1 = 7\\)."],
        answer: "7",
      },
      practiceSet: [
        { prompt: "How many images are formed by two plane mirrors at 30° to each other?", answer: "\\(\\frac{360}{30}-1 = 11\\)" },
        { prompt: "How many images are formed by two parallel plane mirrors facing each other?", answer: "Infinitely many" },
        { prompt: "At what angle must two plane mirrors be placed to form 5 images of an object?", answer: "60°, since \\(\\frac{360}{60}-1 = 5\\)" },
        { prompt: "Two plane mirrors are at right angles and an object is 2 cm from each. How far is the object from each of its two single-reflection images?", answer: "4 cm from each, twice its distance from each mirror" },
      ],
      pyqExampleId: "3fbd4085-dabc-4809-9cc0-29f4446bcacf",
      traps: [
        {
          title: "Forgetting to subtract 1",
          body: "Two mirrors at 90° give \\(\\frac{360}{90}-1 = 3\\) images, not 4. The object itself takes up one of the places.",
        },
        {
          title: "Using the object's distance from the mirror as its distance from the image",
          body: "The image is as far behind the mirror as the object is in front, so the object is twice that distance from its image.",
        },
      ],
    },
  ],
};
