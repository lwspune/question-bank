import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_RO_INSTRUMENTS_NOTE: SubtopicNote = {
  subtopicName: "Optical Instruments",
  title: "Optical Instruments",
  oneLineDefinition:
    "The simple microscope, the compound microscope and the telescope: what each lens does and the formula for each one's magnifying power.",
  whyItMatters:
    "Two NEET questions, both EASY: a telescope's magnifying power from its two focal lengths (2024) and a compound microscope's magnification from its focal lengths and tube length (2025). Each is one formula and one line of arithmetic, so the formulas are worth knowing exactly.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphro-microscope",
      name: "Simple and compound microscopes",
      intuition:
        "A small object looks bigger when you bring it closer, but the eye cannot focus nearer than about 25 cm. A convex lens held close to the eye lets you bring the object much nearer and still see it clearly: that is a simple microscope. A compound microscope does this in two stages. The objective makes a real, enlarged image, and the eyepiece then magnifies that image again like a simple microscope.",
      definition:
        "- **Simple microscope** (a convex lens, object inside its focal length): \\(m = 1 + \\dfrac{D}{f}\\) with the image at the near point, \\(m = \\dfrac{D}{f}\\) with the image at infinity (relaxed eye). D = 25 cm is the least distance of distinct vision.\n" +
        "- **Compound microscope:** the objective, of short focal length \\(f_o\\), forms a real, inverted, enlarged image. The eyepiece, of focal length \\(f_e\\), acts on it as a simple microscope.\n" +
        "- With the final image at infinity: \\(m = \\dfrac{L}{f_o} \\times \\dfrac{D}{f_e}\\). The tube length L is the distance between the second focal point of the objective and the first focal point of the eyepiece.\n" +
        "- In a microscope the objective has the shorter focal length of the two lenses.",
      formula: {
        label: "Microscopes",
        latex: "m_{\\text{simple}} = 1 + \\frac{D}{f}, \\qquad m = \\frac{L}{f_o} \\times \\frac{D}{f_e}",
        symbols: [
          { symbol: "\\(D\\)", meaning: "least distance of distinct vision, 25 cm" },
          { symbol: "\\(L\\)", meaning: "tube length" },
          { symbol: "\\(f_o\\)", meaning: "focal length of the objective" },
          { symbol: "\\(f_e\\)", meaning: "focal length of the eyepiece" },
        ],
      },
      authoredExample: {
        prompt:
          "A convex lens of focal length 5 cm is used as a simple microscope. Find its magnifying power when the image is at the near point (25 cm), and when it is at infinity.",
        steps: [
          "Image at the near point: \\(m = 1 + \\dfrac{25}{5} = 6\\).",
          "Image at infinity: \\(m = \\dfrac{25}{5} = 5\\).",
        ],
        answer: "6 at the near point, 5 at infinity",
      },
      selfCheckExample: {
        prompt:
          "In a compound microscope the objective forms an image 5 times the size of the object. The eyepiece has a focal length of 5 cm and the final image is at infinity (D = 25 cm). What is the total magnifying power?",
        steps: [
          "Eyepiece with the image at infinity: \\(m_e = \\dfrac{D}{f_e} = \\dfrac{25}{5} = 5\\).",
          "\\(m = m_o \\times m_e = 5 \\times 5 = 25\\).",
        ],
        answer: "25",
      },
      practiceSet: [
        { prompt: "A convex lens of focal length 10 cm is used as a magnifier with the image at 25 cm. What is its magnifying power?", answer: "3.5" },
        { prompt: "In a compound microscope, which lens has the shorter focal length?", answer: "The objective" },
        { prompt: "Is the image formed by the objective of a compound microscope real or virtual?", answer: "Real (inverted and enlarged)" },
        { prompt: "A simple microscope of focal length 2.5 cm is used with a relaxed eye (image at infinity, D = 25 cm). What is its magnifying power?", answer: "10" },
      ],
      pyqExampleId: "d5c4fa4e-dfe6-4ac9-a965-58f14173f25d",
      traps: [
        {
          title: "Near point or infinity changes the answer",
          body: "A simple microscope gives \\(1 + \\dfrac{D}{f}\\) with the image at the near point but \\(\\dfrac{D}{f}\\) with the image at infinity. Read which one the question asks.",
        },
        {
          title: "The objective is the shorter lens in a microscope",
          body: "In a compound microscope the objective has the shorter focal length; in a telescope the objective has the longer one. Swapping them puts the wrong focal length in the formula.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphro-telescope",
      name: "Telescopes",
      intuition:
        "A telescope looks at objects so far away that their light arrives as parallel rays. A large objective of long focal length collects that light and forms a small real image at its focus. A short eyepiece then magnifies that image. The magnifying power is the ratio of the two focal lengths, so a long objective and a short eyepiece give a strong telescope.",
      definition:
        "- **Refracting (astronomical) telescope:** objective of long focal length \\(f_o\\) and large aperture, eyepiece of short focal length \\(f_e\\). The final image is inverted.\n" +
        "- **Normal adjustment** (final image at infinity): \\(m = \\dfrac{f_o}{f_e}\\), and the length of the tube is \\(f_o + f_e\\).\n" +
        "- Final image at the near point: \\(m = \\dfrac{f_o}{f_e}\\left(1 + \\dfrac{f_e}{D}\\right)\\).\n" +
        "- **Reflecting telescope:** a concave mirror is the objective. It has no chromatic aberration, and a mirror is lighter and easier to support than a lens of the same size.",
      formula: {
        label: "Telescope",
        latex: "m = \\frac{f_o}{f_e}, \\qquad L = f_o + f_e, \\qquad m_{\\text{near point}} = \\frac{f_o}{f_e}\\left(1 + \\frac{f_e}{D}\\right)",
      },
      authoredExample: {
        prompt:
          "A telescope has an objective of focal length 100 cm and an eyepiece of focal length 5 cm. Find its magnifying power when the final image is at the near point (D = 25 cm).",
        steps: [
          "\\(\\dfrac{f_o}{f_e} = \\dfrac{100}{5} = 20\\).",
          "\\(m = 20 \\times \\left(1 + \\dfrac{5}{25}\\right) = 20 \\times 1.2 = 24\\).",
        ],
        answer: "24",
      },
      selfCheckExample: {
        prompt:
          "A telescope in normal adjustment is 105 cm long and has a magnifying power of 20. Find the focal lengths of its objective and eyepiece.",
        steps: [
          "\\(f_o + f_e = 105\\) and \\(f_o = 20 f_e\\).",
          "\\(21 f_e = 105\\), so \\(f_e = 5\\) cm and \\(f_o = 100\\) cm.",
        ],
        answer: "Objective 100 cm, eyepiece 5 cm",
      },
      practiceSet: [
        { prompt: "In normal adjustment, how far apart are the objective and the eyepiece of a telescope?", answer: "\\(f_o + f_e\\)" },
        { prompt: "Which lens of an astronomical telescope has the larger focal length?", answer: "The objective" },
        { prompt: "Give one advantage of a reflecting telescope over a refracting one.", answer: "No chromatic aberration (or: a mirror is lighter and easier to support)" },
        { prompt: "A telescope's lenses have focal lengths 50 cm and 2 cm. How long is it in normal adjustment?", answer: "52 cm" },
      ],
      pyqExampleId: "d22f8863-9688-4f95-adc9-fe1658b0f394",
      traps: [
        {
          title: "Telescope magnification is a ratio, not a sum",
          body: "In normal adjustment \\(m = \\dfrac{f_o}{f_e}\\), while the tube length is \\(f_o + f_e\\). Do not mix the two up.",
        },
        {
          title: "The near-point setting magnifies a little more",
          body: "With the final image at the near point, \\(m = \\dfrac{f_o}{f_e}\\left(1 + \\dfrac{f_e}{D}\\right)\\), which is larger than \\(\\dfrac{f_o}{f_e}\\).",
        },
      ],
    },
  ],
};
