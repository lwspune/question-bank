import type { SubtopicNote } from "@/app/notes/_types";

export const MIRRORS_RAY_NOTE: SubtopicNote = {
  subtopicName: "Plane and Spherical Mirrors",
  title: "Plane and Spherical Mirrors",
  oneLineDefinition:
    "A plane mirror forms an erect, same-size image as far behind it as the object is in front; a spherical mirror obeys 1/v + 1/u = 1/f with f = R/2 and m = −v/u, every distance measured from the pole.",
  whyItMatters:
    "Twenty-nine PYQs, twenty-one of them multiple choice, and four from 2026. Eight are about plane mirrors: the nature of the image, the deviation of a reflected ray, a mirror moved towards the object, images between two mirrors and the law of reflection in vector form. Sixteen use the mirror formula; five of those give the distance between object and image together with the magnification. Five follow a moving object, or a rod lying along the axis.",
  concepts: [
    // C1 — plane mirrors
    {
      kind: "formula" as const,
      slug: "jpray-plane-mirror",
      name: "Reflection at a plane mirror",
      intuition:
        "A plane mirror makes an image as far behind it as the object is in front, on the same normal. The image is virtual, erect and the same size, but left and right are swapped. Each reflected ray turns through 180° − 2i. Because the image sits at twice the mirror's distance from a fixed object, moving the mirror moves the image twice as far.",
      definition:
        "- Image: the same distance behind the mirror, the same size, virtual, erect and laterally inverted (\\(m = +1\\)).\n" +
        "- Deviation of a ray reflected at an angle of incidence \\(i\\): \\(\\delta = 180^{\\circ} - 2i\\).\n" +
        "- Object fixed, mirror moved by \\(d\\) along its normal: the image moves \\(2d\\) the same way. Mirror fixed, object moved by \\(d\\): the image moves \\(d\\). A mirror turned through \\(\\theta\\) turns the reflected ray through \\(2\\theta\\).\n" +
        "- Vector form: with unit incident direction \\(\\hat a\\) and unit normal \\(\\hat n\\), the reflected direction is \\(\\hat b = \\hat a - 2(\\hat a\\cdot\\hat n)\\hat n\\). The part along the mirror is kept; the part along the normal is reversed.\n" +
        "- Two mirrors at an angle \\(\\theta\\): \\(\\dfrac{360^{\\circ}}{\\theta} - 1\\) images when \\(360^{\\circ}/\\theta\\) is even (three at \\(90^{\\circ}\\)). A ray reflected once from each mirror turns through \\(360^{\\circ} - 2\\theta\\) in all.\n" +
        "- Parallel mirrors give an endless row of images. Build it in steps: every image formed in one mirror is an object for the other.\n" +
        "- To see an image in a mirror, the eye must lie on a line from the image through the mirror. Lines from the image through the two edges of the mirror bound the region where it can be seen.",
      formula: {
        label: "Reflection at a plane mirror",
        latex: "\\delta = 180^{\\circ} - 2i, \\qquad \\hat b = \\hat a - 2(\\hat a\\cdot\\hat n)\\hat n, \\qquad n = \\frac{360^{\\circ}}{\\theta} - 1",
      },
      authoredExample: {
        prompt:
          "An object stands 15 cm in front of a plane mirror. (a) The mirror is moved 5 cm farther from the object, parallel to itself. How far does the image move? (b) A ray meets the mirror at an angle of incidence of \\(25^{\\circ}\\). Through what angle is it deviated?",
        steps: [
          "Put the mirror at x = 0 and the object at x = −15 cm. The image is at x = +15 cm.",
          "The mirror moves to x = +5 cm. The object is now 20 cm in front of it, so the image is 20 cm behind it, at x = +25 cm.",
          "The image moved from +15 cm to +25 cm: 10 cm, away from the object. That is twice the mirror's 5 cm.",
          "(b) \\(\\delta = 180^{\\circ} - 2 \\times 25^{\\circ} = 130^{\\circ}\\).",
        ],
        answer: "(a) 10 cm, away from the object; (b) \\(130^{\\circ}\\).",
      },
      selfCheckExample: {
        prompt:
          "Two parallel plane mirrors A and B face each other 6 cm apart. A point object is 1 cm from A. How far behind A are the two images in A that lie nearest to it?",
        steps: [
          "Mirror A images the object directly: 1 cm behind A.",
          "Mirror B images the object 5 cm behind B, which is 6 + 5 = 11 cm from A. Mirror A images that point 11 cm behind A.",
          "The next candidate: A's first image is 1 + 6 = 7 cm from B, so B images it 7 cm behind B, 13 cm from A, and A images that 13 cm behind A. So 11 cm is the second nearest.",
        ],
        answer: "1 cm and 11 cm behind A.",
      },
      practiceSet: [
        { prompt: "A ray falls on a plane mirror at an angle of incidence of \\(40^{\\circ}\\). Through what angle is it deviated?", answer: "\\(100^{\\circ}\\)" },
        { prompt: "A plane mirror is turned through \\(10^{\\circ}\\) while the incident ray stays fixed. Through what angle does the reflected ray turn?", answer: "\\(20^{\\circ}\\)" },
        { prompt: "Two plane mirrors meet at \\(60^{\\circ}\\). How many images of an object placed between them are formed?", answer: "5" },
        { prompt: "A ray travels along \\(\\hat a = (\\hat i - \\hat k)/\\sqrt{2}\\) and meets a mirror whose unit normal is \\(\\hat k\\). Direction of the reflected ray?", answer: "\\((\\hat i + \\hat k)/\\sqrt{2}\\)" },
      ],
      pyqExampleId: "0d5f44e8-4a8b-49de-9074-9102037493b7", // 2023: mirror moved 4 cm towards an object 12 cm away, image shifts 8 cm
      traps: [
        {
          title: "Deviation is not the angle of reflection",
          body: "A ray reflected at 35° to the normal is turned through 180° − 70° = 110°, not 35° or 70°. Deviation is measured from the ray's original direction.",
        },
        {
          title: "Moving the mirror is not moving the object",
          body: "With the object fixed, a mirror moved by d shifts the image by 2d. With the mirror fixed, an object moved by d shifts the image by d. Read which one moves.",
        },
        {
          title: "A plane-mirror image is erect",
          body: "Lateral inversion swaps left and right; it does not turn the image upside down. The image is virtual, erect and the same size, so m = +1.",
        },
      ],
    },

    // C2 — the mirror formula
    {
      kind: "formula" as const,
      slug: "jpray-mirror-formula",
      name: "The mirror formula and magnification",
      intuition:
        "Every spherical-mirror question uses one equation, 1/v + 1/u = 1/f, and one sign convention. Measure every distance from the pole, positive in the direction the incident light travels and negative against it. A real object in front of the mirror then has u < 0; a concave mirror has f < 0 and a convex mirror f > 0. A real image forms in front (v < 0) and is inverted; a virtual image forms behind (v > 0) and is erect.",
      definition:
        "- **Sign convention** (Cartesian, used on every page of this chapter): distances from the pole or the optical centre; positive along the incident light; heights positive upward.\n" +
        "- \\(f = R/2\\). Concave: \\(f = -|R|/2\\). Convex: \\(f = +|R|/2\\). A mirror works by reflection only, so its focal length is the same in air and in a liquid.\n" +
        "- \\(\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}\\), \\(m = -\\dfrac{v}{u} = \\dfrac{f}{f - u}\\).\n" +
        "- Concave mirror, object beyond C: real, inverted, diminished. Between F and C: real, inverted, magnified, beyond C. Inside F: virtual, erect, magnified, behind the mirror. At F: image at infinity.\n" +
        "- Convex mirror: always virtual, erect and diminished, between the pole and F. A positive magnification below 1 with a real object means a convex mirror.\n" +
        "- Given m and the object-image distance: write \\(v = -mu\\), then set \\(|v - u|\\) equal to the given distance. A real image lies on the object's side; a virtual one lies behind the mirror, so the two distances add.\n" +
        "- The same size of image at two object positions: one image is real (\\(m = -k\\)), the other virtual (\\(m = +k\\)).\n" +
        "- Distances \\(x_1\\), \\(x_2\\) of object and image from the focus satisfy \\(x_1 x_2 = f^{2}\\) (Newton's form).\n" +
        "- To find f by parallax the image must be real, so the object goes anywhere beyond F.",
      formula: {
        label: "Mirror formula",
        latex: "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}, \\qquad f = \\frac{R}{2}, \\qquad m = -\\frac{v}{u} = \\frac{f}{f - u}",
      },
      authoredExample: {
        prompt:
          "A concave mirror forms a real image twice the size of the object, and the object and image are 18 cm apart. (a) Find the focal length. (b) Where must the object be placed to get an erect image of the same size?",
        steps: [
          "Real image: inverted, so \\(m = -2\\) and \\(v = -mu = 2u\\). Both lie in front of the mirror.",
          "With \\(u = -x\\), \\(v = -2x\\). The separation is \\(2x - x = x = 18\\) cm, so \\(u = -18\\) cm and \\(v = -36\\) cm.",
          "\\(\\dfrac{1}{f} = \\dfrac{1}{v} + \\dfrac{1}{u} = -\\dfrac{1}{36} - \\dfrac{2}{36} = -\\dfrac{1}{12}\\), so \\(f = -12\\) cm.",
          "(b) Erect means virtual: \\(m = +2 = \\dfrac{f}{f - u}\\). Then \\(2(-12 - u) = -12\\), so \\(u = -6\\) cm: inside the focus.",
        ],
        answer: "(a) \\(f = -12\\) cm, a concave mirror of focal length 12 cm; (b) 6 cm in front of the mirror.",
      },
      selfCheckExample: {
        prompt:
          "A convex mirror has a radius of curvature of 40 cm. An object is 60 cm in front of it. Find the position of the image and the magnification.",
        steps: [
          "\\(f = +R/2 = +20\\) cm and \\(u = -60\\) cm.",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{f} - \\dfrac{1}{u} = \\dfrac{1}{20} + \\dfrac{1}{60} = \\dfrac{4}{60}\\), so \\(v = +15\\) cm, behind the mirror.",
          "\\(m = -\\dfrac{v}{u} = -\\dfrac{15}{-60} = +\\dfrac{1}{4}\\): erect and diminished.",
        ],
        answer: "15 cm behind the mirror; \\(m = +1/4\\).",
      },
      practiceSet: [
        { prompt: "An object is 30 cm in front of a concave mirror of focal length 10 cm. Where is the image?", answer: "15 cm in front of the mirror (\\(v = -15\\) cm), real" },
        { prompt: "An object 2 cm tall is 8 cm in front of a concave mirror of focal length 12 cm. Height of the image?", answer: "6 cm, erect (virtual)" },
        { prompt: "A convex mirror of focal length 30 cm gives an image one-third the size of the object. How far is the object from the mirror?", answer: "60 cm" },
        { prompt: "A concave mirror of focal length 16 cm in air is placed in a liquid of refractive index 1.5. Its focal length in the liquid?", answer: "16 cm" },
      ],
      pyqExampleId: "3d12e828-40c3-4f8c-809b-6d09d4182dd3", // 2025: m = −3, object-image distance 20 cm, |R| = 15 cm
      traps: [
        {
          title: "m = −v/u for a mirror, v/u for a lens",
          body: "The mirror formula has a plus sign and its magnification a minus sign. Using the lens form m = v/u for a mirror makes every real image come out erect.",
        },
        {
          title: "An erect, smaller image means a convex mirror",
          body: "For a real object, a concave mirror never gives an erect diminished image. An erect image smaller than the object can come only from a convex mirror, with f > 0.",
        },
        {
          title: "A mirror's focal length does not depend on the medium",
          body: "f = R/2 contains no refractive index. Dipping a mirror in water changes nothing; dipping a lens in water does.",
        },
        {
          title: "Two positions, two kinds of image",
          body: "When the same image size appears at two object positions, one image is real and one virtual. Use m = −k for one and m = +k for the other, never the same sign twice.",
        },
      ],
    },

    // C3 — moving objects and long objects
    {
      kind: "formula" as const,
      slug: "jpray-mirror-motion",
      name: "Image speed for a moving object",
      intuition:
        "Differentiate the mirror formula with f fixed and the image's speed follows from the object's. Along the axis the image speed is m² times the object speed, where m is the magnification at that instant. Across the axis it is m times. A long rod lying along the axis is not a small object: image each end on its own.",
      definition:
        "- Differentiating \\(\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}\\) with f fixed: \\(\\dfrac{dv}{dt} = -\\dfrac{v^{2}}{u^{2}}\\dfrac{du}{dt} = -m^{2}\\dfrac{du}{dt}\\).\n" +
        "- So along the axis the image speed is \\(m^{2}\\) times the object speed, with \\(m = \\dfrac{f}{f - u}\\) at that instant. Across the axis, the image speed is m times the object speed.\n" +
        "- A rod lying along the axis: find the image of each end with the mirror formula and subtract. Only a SHORT rod has an image length of \\(m^{2}\\) times its own.\n" +
        "- An object moving at constant speed: find its new u at the given time, then use the mirror formula again.\n" +
        "- Acceleration of the image: write v as a function of u, then differentiate twice with respect to time.\n" +
        "- A mirror on a moving car: use the speed of the other car relative to the mirror as \\(du/dt\\).",
      formula: {
        label: "Image speed along the axis",
        latex: "\\frac{dv}{dt} = -m^{2}\\frac{du}{dt}, \\qquad m = \\frac{f}{f - u}",
      },
      authoredExample: {
        prompt:
          "A convex mirror of focal length 2 m is fixed on a parked bike. A car approaches from behind at 15 m/s. How fast does the car's image move when the car is 8 m from the mirror?",
        steps: [
          "Convex mirror: \\(f = +2\\) m. The car is the object, \\(u = -8\\) m.",
          "\\(m = \\dfrac{f}{f - u} = \\dfrac{2}{2 + 8} = \\dfrac{1}{5}\\).",
          "Image speed \\(= m^{2} \\times 15 = \\dfrac{15}{25} = 0.6\\) m/s, towards the mirror.",
        ],
        answer: "0.6 m/s",
      },
      selfCheckExample: {
        prompt:
          "A thin rod lies along the axis of a concave mirror of focal length 12 cm, with its ends 24 cm and 36 cm from the pole. Find the length of its image.",
        steps: [
          "Near end, \\(u = -24\\) cm \\(= 2f\\): it is at C, so its image is at \\(v = -24\\) cm.",
          "Far end, \\(u = -36\\) cm: \\(\\dfrac{1}{v} = -\\dfrac{1}{12} + \\dfrac{1}{36} = -\\dfrac{1}{18}\\), so \\(v = -18\\) cm.",
          "Image length \\(24 - 18 = 6\\) cm. The short-rod rule would give a wrong 5.3 cm here, because this rod is not short.",
        ],
        answer: "6 cm",
      },
      practiceSet: [
        { prompt: "An object moves towards a concave mirror of focal length 20 cm at 3 cm/s. Speed of its image when the object is 60 cm away?", answer: "0.75 cm/s" },
        { prompt: "An object 50 cm in front of a concave mirror of focal length 25 cm moves towards it at 1 cm/s. Where is the image after 10 s?", answer: "\\(200/3 \\approx 66.7\\) cm in front of the mirror" },
        { prompt: "An object 30 cm in front of a concave mirror of focal length 10 cm moves perpendicular to the axis at 2 cm/s. Speed of its image?", answer: "1 cm/s, in the opposite direction" },
        { prompt: "A short object lies along the axis of a mirror where the magnification is −3. The object is 1 mm long. Length of its image?", answer: "9 mm" },
      ],
      pyqExampleId: "512ad44b-a30d-4fb7-8f9d-6a21d55b7932", // 2021: car overtaking at 40 m/s, mirror f = 10 cm, 1.9 m away, image speed 0.1 m/s
      traps: [
        {
          title: "Along the axis, speed scales with m², not m",
          body: "Differentiating the mirror formula gives dv/dt = −m² du/dt. Using m alone gives an image speed that is too large for a diminishing convex mirror.",
        },
        {
          title: "A long rod is not a short object",
          body: "The rule that the image length is m² times the rod's length holds only when the rod is short compared with its distance from F. For a long rod, image each end.",
        },
        {
          title: "Use the speed relative to the mirror",
          body: "When the mirror rides on one car and the object is another car, du/dt is the rate at which the gap closes: their relative speed.",
        },
      ],
    },
  ],
};
