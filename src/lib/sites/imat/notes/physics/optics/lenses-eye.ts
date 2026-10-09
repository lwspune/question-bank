import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_OPT_LENSES_NOTE: SubtopicNote = {
  subtopicName: "Lenses and the Eye",
  title: "Lenses, Power and Vision Defects",
  oneLineDefinition:
    "A converging lens brings light to a focus and a diverging lens spreads it; the thin lens equation places the image, and lens power in dioptres sets the glasses that correct the eye.",
  whyItMatters:
    "No past question has been set on lenses or the eye yet. They are core syllabus and an obvious place for a medicine-themed question, such as the power of the lens that corrects short sight.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-opt-thin-lens",
      name: "Converging and diverging lenses and the thin lens equation",
      intuition:
        "A converging (convex) lens is thicker in the middle; it bends parallel rays together to a real focus. A diverging (concave) lens is thinner in the middle; it spreads them out as if they came from a focus in front of it. One equation links the object distance, the image distance and the focal length, and the signs tell you whether the image is real or virtual.",
      definition:
        "- **Converging** lens: focal length \\(f > 0\\). Object beyond \\(F\\): **real, inverted** image on the far side. Object inside \\(F\\): **virtual, upright, magnified** image on the same side (a magnifying glass).\n" +
        "- **Diverging** lens: \\(f < 0\\). It always gives a **virtual, upright, smaller** image.\n" +
        "- Sign rule used here: \\(d_o\\) positive for a real object; \\(d_i\\) **positive** for a real image (far side), **negative** for a virtual image (same side as the object).\n" +
        "- **Magnification** \\(m = -d_i/d_o\\) is the ratio of image height to object height. Negative \\(m\\) means inverted; \\(|m| > 1\\) means enlarged.\n" +
        "- An object exactly at \\(F\\) of a converging lens gives parallel rays: the image is at infinity.",
      formula: {
        label: "Thin lens equation and magnification",
        latex: "\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i} \\qquad m = -\\frac{d_i}{d_o} = \\frac{h_i}{h_o}",
        symbols: [
          { symbol: "\\(f\\)", meaning: "focal length: positive for converging, negative for diverging" },
          { symbol: "\\(d_o\\)", meaning: "distance of the object from the lens" },
          { symbol: "\\(d_i\\)", meaning: "distance of the image: positive real, negative virtual" },
          { symbol: "\\(h_o,\\ h_i\\)", meaning: "heights of object and image" },
        ],
      },
      authoredExample: {
        prompt:
          "An object stands 30 cm from a converging lens of focal length 20 cm. Find the position and nature of the image, and its magnification.",
        steps: [
          "\\(\\dfrac{1}{d_i} = \\dfrac{1}{20} - \\dfrac{1}{30} = \\dfrac{3 - 2}{60} = \\dfrac{1}{60}\\), so \\(d_i = +60\\ \\text{cm}\\).",
          "Positive, so the image is real, 60 cm on the far side of the lens.",
          "\\(m = -60/30 = -2\\): inverted and twice the size of the object.",
        ],
        answer: "Real, inverted, 60 cm behind the lens, twice the size",
      },
      selfCheckExample: {
        prompt: "An object is placed 10 cm from a converging lens of focal length 15 cm. Where is the image?",
        options: [
          "6.0 cm on the far side of the lens, real",
          "30 cm on the far side of the lens, real",
          "30 cm on the same side as the object, virtual",
          "6.0 cm on the same side as the object, virtual",
          "25 cm on the far side of the lens, real",
        ],
        steps: [
          "\\(\\dfrac{1}{d_i} = \\dfrac{1}{15} - \\dfrac{1}{10} = \\dfrac{2 - 3}{30} = -\\dfrac{1}{30}\\), so \\(d_i = -30\\ \\text{cm}\\).",
          "Negative means virtual, on the same side as the object; \\(m = +3\\), upright and three times larger: a magnifying glass.",
          "Options A and D add the reciprocals instead of subtracting; B misses the minus sign; E simply adds the two distances.",
        ],
        answer: "(C) 30 cm on the same side as the object, virtual",
      },
      practiceSet: [
        { prompt: "An object is 40 cm from a converging lens with \\(f = 20\\ \\text{cm}\\). Where is the image, and how big?", answer: "40 cm on the far side, same size, inverted", method: "\\(1/d_i = 1/20 - 1/40\\)" },
        { prompt: "An object is 10 cm from a diverging lens with \\(f = -10\\ \\text{cm}\\). Where is the image?", answer: "5.0 cm on the same side, virtual, half size", method: "\\(1/d_i = -1/10 - 1/10\\)" },
        { prompt: "Which type of lens can project a real image onto a screen?", answer: "A converging lens" },
      ],
      traps: [
        {
          title: "A converging lens does not always give a real image",
          body: "With the object closer to a converging lens than its focal point, the image is virtual, upright and magnified, on the same side as the object. That is how a magnifying glass works.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-opt-power",
      name: "Lens power in dioptres",
      intuition:
        "A strongly curved lens bends light sharply and has a short focal length. Power is just the reciprocal of the focal length, so a stronger lens has a bigger number. Opticians use it because the powers of thin lenses placed together simply add.",
      definition:
        "- The **power** of a lens is \\(P = 1/f\\), with \\(f\\) **in metres**. The unit is the **dioptre** (D), equal to \\(\\text{m}^{-1}\\).\n" +
        "- Converging lenses have **positive** power, diverging lenses **negative** power.\n" +
        "- For thin lenses in contact, the powers add: \\(P = P_1 + P_2\\).",
      formula: {
        label: "Power of a lens",
        latex: "P = \\frac{1}{f} \\qquad P_{\\text{total}} = P_1 + P_2",
        symbols: [
          { symbol: "\\(P\\)", meaning: "power, in dioptres (D)" },
          { symbol: "\\(f\\)", meaning: "focal length, in metres" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the power of a converging lens with \\(f = 25\\ \\text{cm}\\) and of a diverging lens with \\(f = -50\\ \\text{cm}\\). What is the focal length of the two placed together?",
        steps: [
          "\\(P_1 = 1/0.25 = +4.0\\ \\text{D}\\).",
          "\\(P_2 = 1/(-0.50) = -2.0\\ \\text{D}\\).",
          "Together: \\(+4.0 - 2.0 = +2.0\\ \\text{D}\\), so \\(f = 1/2.0 = 0.50\\ \\text{m}\\), a converging combination.",
        ],
        answer: "+4.0 D and −2.0 D; together 50 cm",
      },
      selfCheckExample: {
        prompt: "An optician prescribes a lens of power −2.5 D. What kind of lens is it?",
        options: [
          "Converging, focal length 2.5 m",
          "Converging, focal length 40 cm",
          "Diverging, focal length 2.5 m",
          "Diverging, focal length 4.0 cm",
          "Diverging, focal length 40 cm",
        ],
        steps: [
          "Negative power means a diverging lens.",
          "\\(f = 1/P = 1/(-2.5) = -0.40\\ \\text{m}\\), a focal length of 40 cm.",
          "Option C forgets to take the reciprocal; D slips a power of ten converting to centimetres.",
        ],
        answer: "(E) Diverging, focal length 40 cm",
      },
      practiceSet: [
        { prompt: "What is the power of a lens with \\(f = 10\\ \\text{cm}\\)?", answer: "+10 D", method: "\\(1/0.10\\)" },
        { prompt: "A lens has power +5.0 D. What is its focal length?", answer: "20 cm" },
        { prompt: "Lenses of +3.0 D and +1.0 D are placed together. What is the focal length of the pair?", answer: "25 cm", method: "Total +4.0 D" },
      ],
      traps: [
        {
          title: "Power needs the focal length in metres",
          body: "A lens with \\(f = 20\\ \\text{cm}\\) has \\(P = 1/0.20 = 5\\ \\text{D}\\). Using 20 instead of 0.20 gives 0.05 D, a hundred times too small, and that slip is a favourite wrong option.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-opt-eye",
      name: "The human eye, short sight and long sight",
      intuition:
        "The eye is a converging lens system that throws a real, inverted image onto the retina. Most of the bending happens at the cornea; the lens fine-tunes it by changing shape. If the eyeball is too long or too short for its lenses, the image lands in front of or behind the retina, and glasses shift it back.",
      definition:
        "- The **cornea** does most of the focusing; the **lens** adjusts it (**accommodation**): the ciliary muscles let the lens become fatter and more powerful for near objects.\n" +
        "- A normal eye sees clearly from the **near point** (about 25 cm) to the **far point** (infinity).\n" +
        "- **Myopia** (short sight): distant objects are blurred; the image forms **in front of** the retina. Corrected by a **diverging** lens, whose focal length equals minus the far point distance.\n" +
        "- **Hypermetropia** (long sight): near objects are blurred; the image would form **behind** the retina. Corrected by a **converging** lens.",
      table: {
        columns: ["Part or defect", "What it does or what goes wrong", "Note or correction"],
        rows: [
          { cells: ["Cornea", "Does most of the focusing, at the curved air to cornea surface", "Its power is fixed"] },
          { cells: ["Lens and ciliary muscles", "Fine focusing: the muscles change the lens's shape (accommodation)", "The lens becomes fatter for near objects"] },
          { cells: ["Iris and pupil", "The iris changes the size of the pupil to control how much light enters", "The pupil narrows in bright light"] },
          { cells: ["Retina", "Light-sensitive layer where a real, inverted image forms", "The brain interprets the image upright"] },
          { cells: ["Myopia (short sight)", "Eyeball too long or lens too strong: image in front of the retina", "Diverging lens, negative power"] },
          { cells: ["Hypermetropia (long sight)", "Eyeball too short or lens too weak: image behind the retina", "Converging lens, positive power"] },
          { cells: ["Presbyopia", "With age the lens stiffens and cannot accommodate for near objects", "Converging reading glasses"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A short-sighted student sees distant objects clearly only up to 50 cm away. Which lens corrects her distance vision?",
        options: [
          "Converging, +2.0 D",
          "Diverging, −0.50 D",
          "Diverging, −2.0 D",
          "Converging, +0.50 D",
          "Diverging, −50 D",
        ],
        steps: [
          "Short sight needs a diverging lens with focal length equal to minus the far point: \\(f = -0.50\\ \\text{m}\\).",
          "\\(P = 1/(-0.50) = -2.0\\ \\text{D}\\).",
          "Options A and D are converging lenses, for long sight; B uses the far point as the power; E leaves the distance in centimetres.",
        ],
        answer: "(C) Diverging, −2.0 D",
      },
      practiceSet: [
        { prompt: "In an uncorrected short-sighted eye, where does the image of a distant object form?", answer: "In front of the retina" },
        { prompt: "Which type of lens corrects long sight?", answer: "A converging lens" },
        { prompt: "Which part of the eye changes shape to focus on near objects?", answer: "The lens" },
        { prompt: "A short-sighted person's far point is 4.0 m. What lens power corrects it?", answer: "−0.25 D", method: "\\(P = 1/(-4.0)\\)" },
      ],
      traps: [
        {
          title: "Short sight needs a diverging lens",
          body: "A myopic eye focuses too strongly, so the correction must weaken it: a diverging lens with negative power. Long sight is the opposite and needs a converging lens. Swapping the two is the usual wrong option.",
        },
        {
          title: "The cornea, not the lens, does most of the focusing",
          body: "The biggest change of refractive index is between air and the cornea, so most of the bending happens there. The lens only fine-tunes the focus by changing shape.",
        },
      ],
    },
  ],
};
