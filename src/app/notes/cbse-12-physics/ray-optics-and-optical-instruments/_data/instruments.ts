import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_RO_INSTRUMENTS_NOTE: SubtopicNote = {
  subtopicName: "Optical Instruments",
  title: "Microscopes and Telescopes",
  oneLineDefinition:
    "The simple microscope and angular magnification, the compound microscope, the astronomical refracting telescope in normal adjustment, and the reflecting (Cassegrain) telescope and its advantages.",
  whyItMatters:
    "58 questions, forty-one of them from board papers from 2022 to 2026. The board asks for the labelled ray diagram and magnifying power of a compound microscope (every year from 2022 to 2026) and of an astronomical telescope in normal adjustment (2022, 2023, 2025, 2026), numericals on focal lengths, tube length and magnification (every year), the advantages of a reflecting telescope and the Cassegrain diagram (2022, 2023, 2025, 2026), and why a simple microscope magnifies at all (2024). The textbook adds a magnifier over a card of squares, where to hold the eye at a microscope, and a Cassegrain telescope with two mirrors.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpro-simple-microscope",
      name: "Simple microscope and angular magnification",
      intuition:
        "Without help, you cannot see a small object sharply closer than about 25 cm, and at that distance it looks tiny. A convex lens of short focal length lets you bring the object much closer, within its focal length, and still see it sharply, because the lens throws a virtual, erect, enlarged image out to a comfortable distance. The gain is in the angle the object can be made to cover at your eye.",
      definition:
        "- A **simple microscope** is a converging lens of small focal length, held close to the eye, with the object at or just inside its focal length.\n" +
        "- **D = 25 cm** is the least distance of distinct vision (near point) of a normal eye.\n" +
        "- **Image at the near point:** put \\(v = -D\\) in \\(m = \\dfrac{v}{u} = 1 - \\dfrac{v}{f}\\) to get \\(m = 1 + \\dfrac{D}{f}\\).\n" +
        "- **Image at infinity** (object at the focus, eye relaxed): the angular magnification is \\(m = \\dfrac{D}{f}\\), one less than at the near point but more comfortable to view.\n" +
        "- **Angular magnification:** the angle the image subtends at the eye compared with the angle the object would subtend if placed at D without the lens. The image and the object subtend the same angle at the lens, yet there is magnification, because the lens lets the object be held much closer than 25 cm.\n" +
        "- For realistic focal lengths a simple microscope gives at most about 9; larger magnification needs two lenses.",
      formula: {
        label: "Magnifying power of a simple microscope",
        latex: "m = 1 + \\frac{D}{f} \\ (\\text{image at } D), \\qquad m = \\frac{D}{f} \\ (\\text{image at infinity})",
      },
      authoredExample: {
        prompt:
          "A magnifying glass of focal length 5 cm forms the final image at the near point, 25 cm from the eye. Find the distance of the object from the lens and the magnifying power. What is the magnifying power if the image is at infinity instead?",
        steps: [
          "Given: \\(f = +5\\) cm, \\(v = -25\\) cm, D = 25 cm.",
          "Lens formula: \\(\\dfrac{1}{u} = \\dfrac{1}{v} - \\dfrac{1}{f} = -\\dfrac{1}{25} - \\dfrac{1}{5} = -\\dfrac{6}{25}\\), so \\(u = -4.17\\) cm.",
          "Magnifying power at the near point: \\(m = 1 + \\dfrac{D}{f} = 1 + \\dfrac{25}{5} = 6\\).",
          "Image at infinity: \\(m = \\dfrac{D}{f} = 5\\).",
        ],
        answer: "Object 4.17 cm from the lens; magnifying power 6 (5 with the image at infinity)",
      },
      selfCheckExample: {
        prompt: "A simple microscope gives a magnifying power of 11 with the image at the near point. Find its focal length.",
        steps: ["\\(1 + \\dfrac{25}{f} = 11\\), so \\(\\dfrac{25}{f} = 10\\)."],
        answer: "2.5 cm",
      },
      practiceSet: [
        { prompt: "What is the least distance of distinct vision of a normal eye?", answer: "25 cm" },
        { prompt: "Is the magnifying power of a simple microscope larger with the image at the near point or at infinity?", answer: "At the near point, by exactly 1" },
        { prompt: "Name the kind of image a simple microscope forms.", answer: "Virtual, erect and enlarged" },
      ],
      pyqExampleId: "1fdf3b9e-c312-4b57-b4ca-71b0232d918c",
      traps: [
        {
          title: "Mixing up linear magnification and magnifying power",
          body: "Linear magnification is image size over object size, v/u. Magnifying power is a ratio of ANGLES. They are equal only when the image is at the near point; answer whichever the question names.",
        },
        {
          title: "Putting v = +25 cm",
          body: "The image of a magnifier is virtual and on the object's side of the lens, so \\(v = -25\\) cm in the lens formula. A positive v would mean a real image.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpro-compound-microscope",
      name: "Compound microscope",
      intuition:
        "One lens can only magnify about nine times. A compound microscope uses two in a row. The objective, a lens of very short focal length close to the object, makes a real, inverted, enlarged image inside the tube. The eyepiece then acts as a simple microscope on that image. The two magnifications multiply, so a few times ten gives a few hundred.",
      definition:
        "- **Construction:** two converging lenses on one axis in a tube: an **objective** of very short focal length \\(f_o\\) near the object, and an **eyepiece** of short focal length \\(f_e\\) (larger than \\(f_o\\)) near the eye.\n" +
        "- **Ray diagram (described):** object AB just beyond the focus of the objective. Two rays from its top (one parallel to the axis, refracted through the focus; one through the optical centre, undeviated) meet to form the real, inverted, enlarged image \\(A'B'\\) inside the tube. \\(A'B'\\) falls at or just within the focus of the eyepiece, which forms the final virtual image \\(A''B''\\) at the near point (or at infinity), still inverted with respect to the object.\n" +
        "- **Objective:** \\(m_o = \\dfrac{h'}{h} = \\dfrac{L}{f_o}\\) (from similar triangles), where the **tube length** L is the distance between the second focal point of the objective and the first focal point of the eyepiece.\n" +
        "- **Eyepiece:** \\(m_e = 1 + \\dfrac{D}{f_e}\\) with the final image at the near point; \\(m_e = \\dfrac{D}{f_e}\\) with it at infinity.\n" +
        "- **Total:** \\(m = m_o m_e\\). With the image at infinity, \\(m = \\dfrac{L}{f_o} \\times \\dfrac{D}{f_e}\\).\n" +
        "- So both focal lengths must be small. The objective forms a real image and the eyepiece a virtual one.\n" +
        "- In a numerical where the object distance is given, use the lens formula for the objective: \\(m_o = v_o/|u_o|\\), and the lens separation is \\(v_o + |u_e|\\).",
      formula: {
        label: "Magnifying power of a compound microscope",
        latex: "m = m_o m_e, \\qquad m_o = \\frac{L}{f_o}, \\qquad m_e = 1 + \\frac{D}{f_e} \\ \\text{or} \\ \\frac{D}{f_e}",
      },
      authoredExample: {
        prompt:
          "A compound microscope has an objective of focal length 1.0 cm and an eyepiece of focal length 5 cm. An object is placed 1.2 cm from the objective, and the final image is formed at infinity. Find the magnifying power and the distance between the lenses.",
        steps: [
          "Objective: \\(u_o = -1.2\\) cm, \\(f_o = +1.0\\) cm. \\(\\dfrac{1}{v_o} = \\dfrac{1}{1.0} - \\dfrac{1}{1.2} = \\dfrac{1}{6}\\), so \\(v_o = 6\\) cm.",
          "\\(m_o = \\dfrac{v_o}{|u_o|} = \\dfrac{6}{1.2} = 5\\).",
          "Final image at infinity, so the first image is at the focus of the eyepiece: \\(m_e = \\dfrac{D}{f_e} = \\dfrac{25}{5} = 5\\).",
          "Magnifying power: \\(m = m_o m_e = 5 \\times 5 = 25\\).",
          "Distance between the lenses: \\(v_o + f_e = 6 + 5 = 11\\) cm.",
        ],
        answer: "Magnifying power 25; lenses 11 cm apart",
      },
      selfCheckExample: {
        prompt:
          "A compound microscope has a tube length of 16 cm, an objective of focal length 0.5 cm and an eyepiece of focal length 2 cm. Find its magnifying power with the final image at infinity.",
        steps: ["\\(m = \\dfrac{L}{f_o} \\times \\dfrac{D}{f_e} = \\dfrac{16}{0.5} \\times \\dfrac{25}{2} = 32 \\times 12.5\\)."],
        answer: "400",
      },
      practiceSet: [
        { prompt: "Are the images formed by the objective and the eyepiece of a compound microscope real or virtual?", answer: "Objective: real. Eyepiece: virtual" },
        { prompt: "Why must both lenses of a compound microscope have short focal lengths?", answer: "Both focal lengths are in the denominator of \\(m = (L/f_o)(D/f_e)\\)" },
        { prompt: "Is the final image of a compound microscope erect or inverted with respect to the object?", answer: "Inverted" },
        { prompt: "An objective magnifies 10 times and an eyepiece 20 times. What is the total magnification?", answer: "200, the product, not the sum" },
      ],
      pyqExampleId: "3a2a36e9-39d9-416d-a0d0-b7e84e01759f",
      traps: [
        {
          title: "No arrows on the rays",
          body: "The labelled ray diagram is worth marks on its own, and arrows showing which way the light goes are part of it. Label the objective, the eyepiece, \\(A'B'\\), \\(A''B''\\), \\(f_o\\), \\(f_e\\) and D.",
        },
        {
          title: "Adding the two magnifications",
          body: "The eyepiece magnifies the image the objective has already enlarged, so the magnifications multiply: \\(m = m_o \\times m_e\\).",
        },
        {
          title: "Using L without saying what it is",
          body: "In NCERT's formula L is the distance between the second focal point of the objective and the first focal point of the eyepiece. If you use the lens separation instead (when the focal lengths are small), say so in one line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpro-telescope",
      name: "Astronomical refracting telescope",
      intuition:
        "A star is far away, so its light arrives as parallel rays at a tiny angle. The objective, a lens of long focal length and large aperture, brings that light to a small real image at its focus. The eyepiece, a short-focus lens, then views that image from close up. The angle at the eye is far bigger than the angle the star makes without the telescope, by the ratio of the two focal lengths.",
      definition:
        "- **Objective:** large focal length \\(f_o\\) and large aperture. **Eyepiece:** small focal length \\(f_e\\).\n" +
        "- **Ray diagram (normal adjustment, described):** parallel rays from a distant object at a small angle α to the axis pass through the objective and form a real, inverted image \\(A'B'\\) of height h at its second focal point. This point is also the first focal point of the eyepiece, so the rays leave the eyepiece parallel, at a larger angle β, and the final image is at infinity, inverted.\n" +
        "- **Magnifying power:** \\(m = \\dfrac{\\beta}{\\alpha} \\approx \\dfrac{\\tan\\beta}{\\tan\\alpha} = \\dfrac{h/f_e}{h/f_o} = \\dfrac{f_o}{f_e}\\).\n" +
        "- **Tube length** in normal adjustment: \\(L = f_o + f_e\\).\n" +
        "- If the final image is brought to the near point instead, the eyepiece works as a simple microscope and the magnifying power rises to \\(\\dfrac{f_o}{f_e}\\left(1 + \\dfrac{f_e}{D}\\right)\\).\n" +
        "- A large objective aperture gathers more light, so fainter objects are seen, and gives a higher resolving power. The magnifying power does not depend on the apertures.\n" +
        "- Viewing the final image at infinity is preferred because the eye is then relaxed.",
      formula: {
        label: "Telescope in normal adjustment",
        latex: "m = \\frac{\\beta}{\\alpha} = \\frac{f_o}{f_e}, \\qquad L = f_o + f_e",
      },
      authoredExample: {
        prompt:
          "An astronomical telescope has an objective of focal length 120 cm and an eyepiece of focal length 4 cm. Find its magnifying power and the length of the tube in normal adjustment.",
        steps: [
          "Given: \\(f_o = 120\\) cm, \\(f_e = 4\\) cm.",
          "Magnifying power: \\(m = \\dfrac{f_o}{f_e} = \\dfrac{120}{4} = 30\\).",
          "Tube length: \\(L = f_o + f_e = 120 + 4 = 124\\) cm.",
        ],
        answer: "Magnifying power 30; tube length 124 cm",
      },
      selfCheckExample: {
        prompt: "A telescope in normal adjustment has a magnifying power of 15 and an objective of focal length 90 cm. Find the focal length of the eyepiece and the length of the tube.",
        steps: ["\\(f_e = \\dfrac{f_o}{m} = \\dfrac{90}{15} = 6\\) cm.", "\\(L = 90 + 6 = 96\\) cm."],
        answer: "Eyepiece 6 cm; tube 96 cm",
      },
      practiceSet: [
        { prompt: "Which lens of an astronomical telescope has the larger aperture?", answer: "The objective" },
        { prompt: "Why is the final image of a telescope usually formed at infinity?", answer: "The eye views it relaxed, without strain" },
        { prompt: "The objective and eyepiece of a telescope are interchanged. What happens to its magnifying power?", answer: "It becomes \\(f_e/f_o\\), less than 1: distant objects look smaller" },
      ],
      pyqExampleId: "151613e0-006d-49cb-a45e-6476e0fc5182",
      traps: [
        {
          title: "Tube length taken as the difference of focal lengths",
          body: "In normal adjustment the two focal points coincide, so the lenses are \\(f_o + f_e\\) apart. The difference has no meaning here.",
        },
        {
          title: "Writing m upside down",
          body: "A telescope wants a long objective and a short eyepiece: \\(m = f_o/f_e\\), greater than 1. If your answer is less than 1, you have inverted it.",
        },
        {
          title: "Converging rays out of the eyepiece in normal adjustment",
          body: "In normal adjustment the rays leave the eyepiece PARALLEL, because the final image is at infinity. Drawing them meeting at a point shows a different setting and loses the diagram mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpro-reflecting-telescope",
      name: "Reflecting telescope (Cassegrain)",
      intuition:
        "Big telescopes need a big objective to collect light from faint stars. A big lens is heavy, sags because it can be held only at its edge, and gives coloured fringes because glass bends each colour differently. A curved mirror does the same job of focusing without any of these problems, so modern telescopes use a concave mirror as the objective.",
      definition:
        "- **Cassegrain telescope (diagram described):** a large **concave primary mirror** at the back of the tube, with a hole in its centre. Parallel light from a distant object is reflected towards the primary's focus, but before reaching it the light meets a small **convex secondary mirror**, which reflects it back down the tube through the hole. The image forms just behind the primary, where the eyepiece and the observer are.\n" +
        "- This solves the one obvious problem of a mirror objective: it focuses light inside the tube, where the observer cannot be.\n" +
        "- The board asks for two advantages with reasons, or to 'distinguish': give matching points for both telescopes.",
      table: {
        columns: ["Point", "Refracting telescope", "Reflecting telescope"],
        rows: [
          { cells: ["Objective", "A large converging lens", "A large concave mirror"] },
          {
            cells: ["Chromatic aberration", "Present: a lens bends each colour differently", "None: a mirror reflects all colours alike"],
            pyqExampleId: "681b45fe-4e53-459b-b2b9-794bf4101163",
            noteAmber: "Board 2025 asked this as an assertion and reason item.",
          },
          { cells: ["Weight and support", "Heavy, and held only at its rim, so a big lens is hard to support", "Much lighter, and supported over its whole back"] },
          { cells: ["Size of objective", "Large lenses free from aberration are hard and costly to make (the largest is about 1 m)", "Much larger mirrors can be made, so more light is gathered and the resolving power is higher"] },
          { cells: ["Where the image forms", "Behind the objective, at the eyepiece end of the tube", "Inside the tube; the convex secondary sends the light out through a hole in the primary"] },
        ],
      },
      pyqExampleId: "6cca144e-442a-4fa3-80d1-7a369fc4c776",
      selfCheckExample: {
        prompt: "Why does a telescope objective have a much larger aperture than its eyepiece?",
        steps: [
          "A larger area collects more light, so fainter objects can be seen.",
          "The resolving power also depends on the diameter of the objective.",
        ],
        answer: "To gather more light and to resolve objects that are very close together in the sky",
      },
      practiceSet: [
        { prompt: "In a Cassegrain telescope, what kind of mirror is the secondary mirror?", answer: "Convex" },
        { prompt: "Why is there no chromatic aberration in the image formed by a mirror?", answer: "Reflection turns all colours through the same angle; there is no refraction" },
        { prompt: "Give one reason why a large mirror is easier to mount than a large lens.", answer: "It is lighter and can be supported over its whole back" },
      ],
      traps: [
        {
          title: "Advantages without reasons",
          body: "'No chromatic aberration' is half a point. Add why: a mirror works by reflection, which treats all colours alike, while a lens refracts each colour differently.",
        },
        {
          title: "A plane or concave secondary mirror",
          body: "In the Cassegrain design the small secondary mirror is CONVEX. Label the primary concave and the secondary convex, and show the light leaving through the hole in the primary.",
        },
      ],
    },
  ],
};
