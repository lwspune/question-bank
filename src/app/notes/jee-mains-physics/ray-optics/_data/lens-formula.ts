import type { SubtopicNote } from "@/app/notes/_types";

export const LENS_FORMULA_RAY_NOTE: SubtopicNote = {
  subtopicName: "Thin Lens Formula and Lens Combinations",
  title: "Thin Lens Formula and Lens Combinations",
  oneLineDefinition:
    "A thin lens images by 1/v − 1/u = 1/f with m = v/u; lenses in contact add their powers, and lenses apart are solved one after another, each image becoming the next lens's object.",
  whyItMatters:
    "Twenty-six PYQs, fourteen of them multiple choice and twelve asking for a number, and five from 2026. Twelve use one lens: the distance between object and image with the magnification given, equal image sizes at two positions, a change in power, and readings or graphs from a focal-length experiment. Fourteen combine lenses: in contact, with a gap between them, as a pair that turns a parallel beam into a parallel beam, or with a mirror behind the lens.",
  concepts: [
    // C1 — one thin lens
    {
      kind: "formula" as const,
      slug: "jpray-thin-lens",
      name: "Thin lens formula and magnification",
      intuition:
        "The lens formula has a minus sign, 1/v − 1/u = 1/f, and the magnification has none, m = v/u. A convex lens has f > 0. With a real object it gives a real, inverted image when the object is beyond F, and a virtual, erect, magnified image when the object is inside F. A concave lens (f < 0) always gives a virtual, erect, diminished image.",
      definition:
        "- \\(\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}\\), \\(m = \\dfrac{v}{u} = \\dfrac{f}{f + u}\\), \\(P = \\dfrac{1}{f}\\) (f in metres, P in dioptres).\n" +
        "- Convex lens: object beyond 2F gives a real, inverted, diminished image between F and 2F; object between F and 2F gives a real, inverted, magnified image beyond 2F; object inside F gives a virtual, erect, magnified image on the object's side.\n" +
        "- Concave lens: the image of a real object is always virtual, erect and diminished, between the lens and F.\n" +
        "- Given m and the object-image distance: write \\(v = mu\\). A real image is on the far side, so the two distances add; a virtual image is on the object's side, so they subtract.\n" +
        "- Equal image sizes at two object positions: one image is real, one virtual. Solve \\(\\dfrac{f}{f + u_1} = -\\dfrac{f}{f + u_2}\\).\n" +
        "- Distances \\(x_1\\), \\(x_2\\) of object and image from the two foci: \\(x_1 x_2 = f^{2}\\) (Newton's form).\n" +
        "- A plot of \\(1/|v|\\) against \\(1/|u|\\) for real images is a straight line that cuts both axes at \\(1/f\\).\n" +
        "- A small change in power: \\(\\dfrac{\\Delta f}{f} = -\\dfrac{\\Delta P}{P}\\).",
      formula: {
        label: "Thin lens formula",
        latex: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\qquad m = \\frac{v}{u} = \\frac{f}{f + u}, \\qquad P = \\frac{1}{f}",
      },
      authoredExample: {
        prompt:
          "A convex lens throws a real image, four times the size of the object, on a screen 75 cm from the object. (a) Find the focal length. (b) Where must the object be placed for an erect image four times as tall?",
        steps: [
          "Real image from a convex lens: inverted, \\(m = -4\\), so \\(v = mu = -4u\\).",
          "With \\(u = -x\\), \\(v = +4x\\) on the far side. Object to image: \\(x + 4x = 75\\), so \\(x = 15\\) cm: \\(u = -15\\) cm, \\(v = +60\\) cm.",
          "\\(\\dfrac{1}{f} = \\dfrac{1}{60} - \\dfrac{1}{-15} = \\dfrac{1 + 4}{60} = \\dfrac{1}{12}\\), so \\(f = 12\\) cm.",
          "(b) Virtual and erect: \\(m = +4 = \\dfrac{f}{f + u} = \\dfrac{12}{12 + u}\\), so \\(12 + u = 3\\) and \\(u = -9\\) cm.",
        ],
        answer: "(a) 12 cm; (b) 9 cm from the lens, inside F.",
      },
      selfCheckExample: {
        prompt:
          "Measured from the two foci of a convex lens, an object and its real image are 4 cm and 25 cm away. Find the focal length.",
        steps: [
          "\\(x_1 x_2 = f^{2}\\): \\(f^{2} = 4 \\times 25 = 100\\), so \\(f = 10\\) cm.",
          "Check: \\(u = -14\\) cm, \\(v = +35\\) cm, and \\(\\dfrac{1}{35} + \\dfrac{1}{14} = \\dfrac{2 + 5}{70} = \\dfrac{1}{10}\\).",
        ],
        answer: "10 cm",
      },
      practiceSet: [
        { prompt: "An object is 40 cm in front of a concave lens of focal length 20 cm. Image distance and magnification?", answer: "13.3 cm on the object's side; \\(m = 1/3\\)" },
        { prompt: "The power of a lens rises from 4.0 D to 4.2 D. By roughly what fraction does its focal length change?", answer: "It falls by about 5%" },
        { prompt: "An object is 50 cm from a convex lens of power +4 D. Where is the image?", answer: "50 cm on the far side; inverted and the same size" },
        { prompt: "A plot of \\(1/|v|\\) against \\(1/|u|\\) for a convex lens cuts each axis at 0.05 cm⁻¹. Focal length?", answer: "20 cm" },
      ],
      pyqExampleId: "4f19ce77-26a0-4f6f-83c9-993b23f8594b", // 2024: virtual image 3 times magnified, 20 cm from object, f = 15 cm
      traps: [
        {
          title: "The lens formula has a minus sign",
          body: "A lens uses 1/v − 1/u = 1/f and a mirror 1/v + 1/u = 1/f. Swapping them gives the wrong sign, or a wrong size altogether.",
        },
        {
          title: "A concave lens never forms a real image of a real object",
          body: "With f < 0 and u < 0, 1/v = 1/f + 1/u is negative: the image is always virtual, erect and inside F. A statement placing it at a real point on the far side is false.",
        },
        {
          title: "A long or slanted object needs two magnifications",
          body: "Heights across the axis scale by m; lengths along it scale by about m² only when the object is short. For anything longer, find the image of each end.",
        },
      ],
    },

    // C2 — combinations
    {
      kind: "formula" as const,
      slug: "jpray-lens-combination",
      name: "Combinations of lenses",
      intuition:
        "Lenses in contact act as one lens: their powers add. Lenses apart are solved one at a time. The image formed by the first lens is the object for the second, measured from the second lens. If that image lies beyond the second lens, the light is still converging when it arrives: it is a virtual object, with u > 0.",
      definition:
        "- In contact: \\(P = P_1 + P_2 + \\dots\\), that is \\(\\dfrac{1}{F} = \\dfrac{1}{f_1} + \\dfrac{1}{f_2}\\). A convex and a concave lens in contact converge only if the convex one is the more powerful (shorter focal length).\n" +
        "- Separated by d, as one equivalent lens: \\(P = P_1 + P_2 - dP_1P_2\\).\n" +
        "- Step by step: image through lens 1, subtract the separation to get u for lens 2, image again. Total magnification \\(m = m_1 m_2\\).\n" +
        "- Parallel beam in, parallel beam out (a telescope or a beam expander): two converging lenses are \\(f_1 + f_2\\) apart, and the beam's width is multiplied by \\(f_2/f_1\\).\n" +
        "- A lens followed by a curved mirror: the final image falls back on the object when the lens's image sits at the mirror's centre of curvature. Rays aimed at the centre meet the mirror normally and retrace their path.\n" +
        "- A plane mirror behind a lens forms an image of the lens's image, as far behind the mirror as that image is in front of it.",
      formula: {
        label: "Lenses in combination",
        latex: "P = P_1 + P_2 - dP_1P_2, \\qquad m = m_1 m_2",
      },
      authoredExample: {
        prompt:
          "Two convex lenses of focal lengths 10 cm and 15 cm are 20 cm apart. An object is 15 cm in front of the first lens. (a) Find the final image and the total magnification. (b) What would the focal length be if the lenses were in contact?",
        steps: [
          "Lens 1: \\(u = -15\\) cm, \\(f = 10\\) cm: \\(\\dfrac{1}{v} = \\dfrac{1}{10} - \\dfrac{1}{15} = \\dfrac{1}{30}\\), \\(v_1 = 30\\) cm, \\(m_1 = \\dfrac{30}{-15} = -2\\).",
          "This image is \\(30 - 20 = 10\\) cm beyond lens 2. The light is still converging when it reaches lens 2: a virtual object, \\(u_2 = +10\\) cm.",
          "Lens 2: \\(\\dfrac{1}{v} = \\dfrac{1}{15} + \\dfrac{1}{10} = \\dfrac{1}{6}\\), \\(v_2 = 6\\) cm, \\(m_2 = \\dfrac{6}{10} = 0.6\\).",
          "Total \\(m = m_1 m_2 = -1.2\\): a real, inverted image 6 cm beyond lens 2.",
          "(b) In contact: \\(\\dfrac{1}{F} = \\dfrac{1}{10} + \\dfrac{1}{15} = \\dfrac{1}{6}\\), so F = 6 cm.",
        ],
        answer: "(a) 6 cm beyond the second lens, \\(m = -1.2\\); (b) 6 cm.",
      },
      selfCheckExample: {
        prompt:
          "Two convex lenses of focal lengths 20 cm and 40 cm are placed 10 cm apart on the same axis. Find the power of the combination.",
        steps: [
          "\\(P_1 = \\dfrac{1}{0.2} = 5\\) D, \\(P_2 = \\dfrac{1}{0.4} = 2.5\\) D, \\(d = 0.1\\) m.",
          "\\(P = 5 + 2.5 - 0.1 \\times 5 \\times 2.5 = 6.25\\) D.",
        ],
        answer: "6.25 D (an equivalent focal length of 16 cm)",
      },
      practiceSet: [
        { prompt: "Four identical convex lenses in contact have a total power of 10 D. Focal length of each?", answer: "40 cm" },
        { prompt: "A convex lens of focal length 20 cm touches a concave lens of focal length 30 cm. Nature and focal length of the pair?", answer: "Converging, 60 cm" },
        { prompt: "Two convex lenses turn a parallel beam 3 mm wide into a parallel beam 12 mm wide. The first has a focal length of 25 mm. Focal length of the second, and the separation?", answer: "100 mm; 125 mm" },
        { prompt: "A convex lens of focal length 20 cm stands 15 cm in front of a convex mirror of radius 30 cm. How far in front of the lens must an object be for its final image to fall on itself?", answer: "36 cm" },
      ],
      pyqExampleId: "fcb28d4a-98fd-41fe-86c5-c8e68116a6a9", // 2026: f = 5 cm and −4 cm, in contact then 1 cm apart, |m₁/m₂| = 5/6
      traps: [
        {
          title: "A virtual object has u > 0",
          body: "When the first lens's image lies beyond the second lens, the object for the second lens is on its outgoing side. Taking u as negative there puts the final image on the wrong side.",
        },
        {
          title: "Measure from the next lens",
          body: "Before using the second lens, subtract the separation. The first image's distance from lens 1 is not its distance from lens 2.",
        },
        {
          title: "Powers add only in contact",
          body: "For lenses a distance d apart, P = P₁ + P₂ − dP₁P₂. Adding the powers alone ignores the gap.",
        },
      ],
    },
  ],
};
