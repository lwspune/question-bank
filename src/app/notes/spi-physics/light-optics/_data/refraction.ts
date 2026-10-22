import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_LO_REFRACTION_NOTE: SubtopicNote = {
  subtopicName: "Refraction and Lenses",
  title: "Refraction and Lenses",
  oneLineDefinition:
    "Light bends when it passes from one medium into another because its speed changes; the refractive index n = c/v measures how much it slows, and a lens uses this bending to form images.",
  whyItMatters:
    "Four questions in the bank, all MODERATE: which pair of media changes light the most, how the pins are lined up in the glass slab experiment, what water does to a lens's power, and the point where a convex lens gives u = v. Each needs a reason, not a recalled word, so learn why light bends as well as which way.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spilorf-index",
      name: "Refractive index and the bending of light",
      intuition:
        "Light slows down in glass or water. When it enters at a slant, one side of the beam slows first, so the beam swings round, like a car whose left wheels hit sand before its right wheels. The more the speed changes, the more it bends.",
      definition:
        "- **Refractive index** \\(n = \\dfrac{c}{v}\\): the speed of light in a vacuum over its speed in the medium. A higher n means slower light.\n" +
        "- Going into a medium of higher n (optically denser), light bends **towards** the normal; going into a lower n, **away** from it.\n" +
        "- The bending is greatest where the two refractive indices differ the most.\n" +
        "- Through a **glass slab** the ray comes out **parallel** to the ray that went in, only shifted sideways.\n" +
        "- In the pin experiment the pins may lean, so you line up their **feet** (where they enter the paper), not their heads.\n" +
        "- A glass lens (n about 1.5) bends light because it differs from the air (n = 1). In water (n about 1.33) the difference is smaller, so the lens bends light less and its focal length becomes **longer**.",
      formula: {
        label: "Refractive index",
        latex: "n = \\frac{c}{v} \\qquad n_{21} = \\frac{n_2}{n_1} = \\frac{v_1}{v_2}",
        symbols: [
          { symbol: "c", meaning: "speed of light in a vacuum, 3 × 10⁸ m/s" },
          { symbol: "v", meaning: "speed of light in the medium" },
          { symbol: "n₂₁", meaning: "refractive index of medium 2 with respect to medium 1" },
        ],
      },
      authoredExample: {
        prompt: "The refractive index of a glass is 1.5. Find the speed of light in it.",
        steps: ["\\(v = \\frac{c}{n} = \\frac{3 \\times 10^8}{1.5}\\).", "\\(v = 2 \\times 10^8\\) m/s."],
        answer: "\\(2 \\times 10^8\\) m/s",
      },
      selfCheckExample: {
        prompt: "Light travels at \\(2.25 \\times 10^8\\) m/s in a liquid. Find the liquid's refractive index.",
        steps: ["\\(n = \\frac{c}{v} = \\frac{3 \\times 10^8}{2.25 \\times 10^8}\\).", "\\(n = \\frac{3}{2.25} = \\frac{4}{3} \\approx 1.33\\)."],
        answer: "about 1.33",
      },
      practiceSet: [
        { prompt: "A ray passes from air into glass at a slant. Does it bend towards or away from the normal?", answer: "Towards the normal" },
        { prompt: "A ray passes from glass into air at a slant. Does it bend towards or away from the normal?", answer: "Away from the normal" },
        { prompt: "How does the ray coming out of a glass slab compare with the ray that went in?", answer: "It is parallel to it, shifted sideways" },
        { prompt: "Diamond has n = 2.42 and glass n = 1.5. In which is light slower?", answer: "Diamond" },
      ],
      pyqExampleId: "b04ac38a-d897-4fb8-a022-78098285f212",
      traps: [
        {
          title: "Higher refractive index means faster light",
          body: "It is the reverse: \\(v = \\frac{c}{n}\\), so the medium with the larger n is the one where light is slower.",
        },
        {
          title: "Thinking water makes a lens stronger",
          body: "A glass lens bends light less in water than in air, because glass and water differ less in refractive index. Its focal length grows, so its power falls.",
        },
        {
          title: "Picking the pair with the largest indices",
          body: "The bending depends on how much the two indices DIFFER. Going between n = 2.6 and n = 2.7 changes light less than going between 1.3 and 2.0.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilorf-lens",
      name: "Convex and concave lenses, the lens formula and power",
      intuition:
        "A convex lens is thicker in the middle and brings parallel rays together at its focus; a concave lens is thinner in the middle and spreads them out. Where the image forms depends on how far the object is from the lens compared with the focal length.",
      definition:
        "- **Convex** lens: converging, positive focal length and power. **Concave** lens: diverging, negative.\n" +
        "- **Lens formula** (distances measured from the lens; distances against the light are negative, so a real object has u negative): \\(\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}\\).\n" +
        "- **Magnification** \\(m = \\dfrac{v}{u}\\); a negative m means the image is inverted.\n" +
        "- **Power** \\(P = \\dfrac{1}{f}\\) with f in **metres**; unit dioptre (D).\n" +
        "- Convex lens, object at **2F**: the image is at 2F on the other side, real, inverted and the **same size**. This is the only place where object and image are the same distance from the lens.\n" +
        "- Convex lens, object at F: the rays come out parallel and the image is at infinity.",
      formula: {
        label: "Lens formula, magnification and power",
        latex: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f} \\qquad m = \\frac{v}{u} \\qquad P = \\frac{1}{f\\,(\\text{m})}",
      },
      authoredExample: {
        prompt: "An object is placed 15 cm in front of a convex lens of focal length 10 cm. Find where the image forms and its magnification.",
        steps: [
          "\\(u = -15\\) cm, \\(f = +10\\) cm.",
          "\\(\\frac{1}{v} = \\frac{1}{f} + \\frac{1}{u} = \\frac{1}{10} - \\frac{1}{15} = \\frac{3 - 2}{30} = \\frac{1}{30}\\), so \\(v = +30\\) cm.",
          "\\(m = \\frac{v}{u} = \\frac{30}{-15} = -2\\): real, inverted, twice the size.",
        ],
        answer: "30 cm behind the lens; magnification \\(-2\\)",
      },
      selfCheckExample: {
        prompt: "Find the power of a convex lens of focal length 25 cm.",
        steps: ["\\(f = 0.25\\) m.", "\\(P = \\frac{1}{0.25} = +4\\) D."],
        answer: "+4 D",
      },
      practiceSet: [
        { prompt: "What is the power of a concave lens of focal length 50 cm?", answer: "\\(-2\\) D" },
        { prompt: "A lens has a power of +5 D. What is its focal length, and what kind of lens is it?", answer: "20 cm, convex" },
        { prompt: "A convex lens has focal length 12 cm. Where must an object be placed to get a real image of the same size?", answer: "24 cm from the lens (at 2F)" },
        { prompt: "Which lens is a converging lens?", answer: "Convex" },
      ],
      pyqExampleId: "4f7fa999-238e-46bc-97db-30ba1f59dba1",
      traps: [
        {
          title: "Using centimetres in the power formula",
          body: "Power needs the focal length in metres. A 20 cm lens has power \\(\\frac{1}{0.2} = 5\\) D, not \\(\\frac{1}{20}\\).",
        },
        {
          title: "Forgetting the sign of a concave lens",
          body: "A concave lens has a negative focal length, so its power is negative. A lens of power \\(-2.5\\) D is concave.",
        },
        {
          title: "Putting the same-size image at F",
          body: "An object at F sends its image to infinity. The same-size image comes from an object at 2F, with the image at 2F.",
        },
      ],
    },
  ],
};
