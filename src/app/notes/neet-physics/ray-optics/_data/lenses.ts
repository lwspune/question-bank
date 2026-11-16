import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_RO_LENSES_NOTE: SubtopicNote = {
  subtopicName: "Lenses",
  title: "Lenses",
  oneLineDefinition:
    "Refraction at a curved surface, the thin lens formula and the ray rules, the lens maker's formula and power in dioptres, and lenses used together, in contact or apart.",
  whyItMatters:
    "Nine NEET questions from 2021 to 2026, more than any other page. Four combine lenses: two put lenses in contact (two lenses in 2023, four in 2025), one uses a gap that keeps a beam parallel (2021) and one a gap that forms an image (Re-NEET 2026). Two use the lens maker's formula (a biconvex lens's power in 2022, three thin layers cemented together in 2023). One sends light back through a lens from a plane mirror (2021), one asks where a concave lens sends a ray parallel to the axis (2026) and one asks which experiment needs an index correction (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphro-lens-formula",
      name: "Thin lens formula and ray rules",
      intuition:
        "A lens is two curved refracting surfaces close together. A convex lens is thicker in the middle and brings parallel rays together at its focus. A concave lens is thinner in the middle and spreads them out, as if they came from a focus on the near side. The thin lens formula links where the object is, where the image is and the focal length, with the same sign rule as mirrors.",
      definition:
        "- Refraction at one curved surface, from index \\(n_1\\) into \\(n_2\\): \\(\\dfrac{n_2}{v} - \\dfrac{n_1}{u} = \\dfrac{n_2 - n_1}{R}\\).\n" +
        "- **Thin lens formula:** \\(\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}\\), with distances from the optical centre, positive along the incoming light. Magnification \\(m = \\dfrac{v}{u}\\). A convex lens has positive f, a concave lens negative f.\n" +
        "- **Ray rules:** a ray parallel to the axis passes through the second principal focus after a convex lens, or appears to diverge from the first principal focus after a concave lens. A ray through the optical centre goes on undeviated. A ray through (or heading for) the first focus comes out parallel to the axis.\n" +
        "- A concave lens always gives a virtual, erect, smaller image of a real object.\n" +
        "- A lens with a plane mirror behind it: the light crosses the lens, is reflected, and crosses the lens again. Each image is the object for the next step.\n" +
        "- On an optical bench, u and v are read off the bench scale. The index correction, found with a rod of known length, is applied to these readings when finding a lens's focal length.",
      formula: {
        label: "Thin lens formula",
        latex: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\qquad m = \\frac{v}{u}, \\qquad \\frac{n_2}{v} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R}",
        symbols: [
          { symbol: "\\(u\\)", meaning: "object distance from the optical centre" },
          { symbol: "\\(v\\)", meaning: "image distance from the optical centre" },
          { symbol: "\\(f\\)", meaning: "focal length, positive for a convex lens" },
        ],
      },
      authoredExample: {
        prompt:
          "An object is 15 cm from a convex lens of focal length 10 cm. Where is the image, and what is the magnification?",
        steps: [
          "\\(u = -15\\) cm, \\(f = +10\\) cm.",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{f} + \\dfrac{1}{u} = \\dfrac{1}{10} - \\dfrac{1}{15} = \\dfrac{1}{30}\\), so \\(v = +30\\) cm.",
          "\\(m = \\dfrac{v}{u} = \\dfrac{30}{-15} = -2\\): real, inverted and twice the size.",
        ],
        answer: "30 cm beyond the lens, real and inverted, m = −2",
      },
      selfCheckExample: {
        prompt:
          "An object is 20 cm from a concave lens of focal length 20 cm. Where is the image, and how big is it?",
        steps: [
          "\\(u = -20\\) cm, \\(f = -20\\) cm.",
          "\\(\\dfrac{1}{v} = -\\dfrac{1}{20} - \\dfrac{1}{20} = -\\dfrac{1}{10}\\), so \\(v = -10\\) cm, on the same side as the object.",
          "\\(m = \\dfrac{-10}{-20} = +0.5\\).",
        ],
        answer: "10 cm from the lens on the object's side, virtual, erect and half the size",
      },
      practiceSet: [
        { prompt: "An object is placed 20 cm from a convex lens of focal length 20 cm. Where is the image formed?", answer: "At infinity" },
        { prompt: "A convex lens forms a real image the same size as the object, 40 cm from the lens. What is its focal length?", answer: "20 cm" },
        { prompt: "Through which point of a thin lens does a ray pass without bending?", answer: "The optical centre" },
        { prompt: "Is the focal length of a concave lens positive or negative in the sign convention?", answer: "Negative" },
      ],
      pyqExampleId: "fc57d7e5-5f5d-4dd8-8e5c-2c8fa4bb3efe",
      traps: [
        {
          title: "A concave lens has a negative focal length",
          body: "Using \\(f = +20\\) cm for a concave lens gives a real image where the lens actually forms a virtual one. Put the sign in before solving.",
        },
        {
          title: "Lens and mirror formulas differ in sign",
          body: "For a lens \\(\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}\\) and \\(m = \\dfrac{v}{u}\\). For a mirror \\(\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}\\) and \\(m = -\\dfrac{v}{u}\\).",
        },
        {
          title: "Light reflected back crosses the lens again",
          body: "With a plane mirror behind a lens, the image made by the mirror becomes a new object for the lens, with the light now travelling the other way. The final image comes from this second pass.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphro-lens-maker",
      name: "Lens maker's formula and power",
      intuition:
        "How strongly a lens bends light depends on two things: how curved its faces are and how much its glass differs from the medium around it. The lens maker's formula puts both together. Power is the reverse of focal length: a strong lens has a short focal length and a large power.",
      definition:
        "- **Lens maker's formula:** \\(\\dfrac{1}{f} = (n_{21} - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)\\), where \\(n_{21}\\) is the lens's index relative to the medium around it, \\(R_1\\) is the first face the light meets and \\(R_2\\) the second.\n" +
        "- Radii follow the sign rule: for a biconvex lens \\(R_1\\) is positive and \\(R_2\\) negative, so the bracket adds up. A plane face has \\(R = \\infty\\).\n" +
        "- An equiconvex lens of radius R and n = 1.5 has \\(f = R\\).\n" +
        "- **Power** \\(P = \\dfrac{1}{f}\\) with f in metres; the unit is the dioptre (D). A convex lens has positive power, a concave lens negative.\n" +
        "- In a liquid, use \\(n_{21} = \\dfrac{n_{\\text{lens}}}{n_{\\text{liquid}}}\\). The focal length grows; in a liquid of the same index the lens has no effect; in a denser liquid a convex lens spreads light out.\n" +
        "- Thin layers cemented together act as thin lenses in contact: find each layer's power and add.",
      formula: {
        label: "Lens maker's formula",
        latex: "\\frac{1}{f} = (n_{21} - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\qquad P = \\frac{1}{f\\,(\\text{m})}",
        symbols: [
          { symbol: "\\(n_{21}\\)", meaning: "index of the lens relative to the surrounding medium" },
          { symbol: "\\(R_1\\)", meaning: "radius of the first face met by the light" },
          { symbol: "\\(R_2\\)", meaning: "radius of the second face" },
        ],
      },
      authoredExample: {
        prompt:
          "A plano-convex lens has a curved face of radius 30 cm and is made of glass of refractive index 1.5. Find its focal length and power.",
        steps: [
          "With the curved face first, \\(R_1 = +30\\) cm and \\(R_2 = \\infty\\).",
          "\\(\\dfrac{1}{f} = (1.5 - 1)\\left(\\dfrac{1}{30} - 0\\right) = \\dfrac{1}{60}\\), so \\(f = 60\\) cm.",
          "\\(P = \\dfrac{1}{0.6} \\approx +1.67\\) D.",
        ],
        answer: "60 cm and about +1.67 D",
      },
      selfCheckExample: {
        prompt:
          "A glass lens (n = 1.5) has a focal length of 20 cm in air. What is its focal length in water of refractive index 4/3?",
        steps: [
          "In air, \\(\\dfrac{1}{20} = (1.5 - 1) \\times K\\), where K is the bracket of radii.",
          "In water, \\(\\dfrac{1}{f_w} = \\left(\\dfrac{1.5}{4/3} - 1\\right)K = 0.125\\,K\\).",
          "\\(\\dfrac{f_w}{20} = \\dfrac{0.5}{0.125} = 4\\), so \\(f_w = 80\\) cm.",
        ],
        answer: "80 cm",
      },
      practiceSet: [
        { prompt: "A concave lens has a focal length of 25 cm. What is its power?", answer: "−4 D" },
        { prompt: "A glass convex lens of refractive index 1.5 is dipped in a liquid of refractive index 1.5. What is its focal length now?", answer: "Infinite: it acts like a flat sheet of glass" },
        { prompt: "A plano-concave lens of refractive index 1.5 has a curved face of radius 20 cm. What is its focal length?", answer: "−40 cm" },
        { prompt: "A convex glass lens (n = 1.5) is placed in a liquid of refractive index 1.6. Does it bring light together or spread it out?", answer: "It spreads light out (acts as a diverging lens)" },
      ],
      pyqExampleId: "319328c6-8068-4861-be8c-3e09756cec1a",
      traps: [
        {
          title: "Power needs the focal length in metres",
          body: "\\(P = \\dfrac{1}{f}\\) with f in metres. A lens of focal length 20 cm has power \\(\\dfrac{1}{0.2} = 5\\) D, not 0.05 D.",
        },
        {
          title: "Keep the signs of the radii",
          body: "For a biconvex lens \\(R_2\\) is negative, so \\(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\) becomes a sum. Dropping that sign makes an equiconvex lens look as if it had no power.",
        },
        {
          title: "In a liquid, use the relative index",
          body: "In water or oil, the lens maker's formula takes \\(\\dfrac{n_{\\text{lens}}}{n_{\\text{liquid}}}\\), not the lens's own index. That is why a lens is weaker in water.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphro-combination",
      name: "Combinations of lenses",
      intuition:
        "Thin lenses placed in contact act like one lens whose power is the sum of their powers. If the lenses are apart, work step by step: let the first lens form its image, and use that image as the object for the next lens. The total magnification is the product of the separate magnifications.",
      definition:
        "- Thin lenses in contact: \\(\\dfrac{1}{F} = \\dfrac{1}{f_1} + \\dfrac{1}{f_2} + \\dots\\), so \\(P = P_1 + P_2 + \\dots\\)\n" +
        "- Magnification of a combination: \\(m = m_1 m_2 m_3 \\dots\\)\n" +
        "- Lenses apart: apply the lens formula lens by lens. If the rays from the first lens are still converging when they reach the second, the first image is a virtual object for the second, with positive u.\n" +
        "- A parallel beam that comes out parallel: two convex lenses must be \\(f_1 + f_2\\) apart; a convex lens followed by a concave lens, \\(f_1 - |f_2|\\) apart.",
      formula: {
        label: "Lenses in contact",
        latex: "\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} + \\dots, \\qquad P = P_1 + P_2 + \\dots, \\qquad m = m_1 m_2 \\dots",
      },
      authoredExample: {
        prompt:
          "An object is 30 cm in front of a convex lens of focal length 20 cm. A second convex lens of focal length 20 cm is 40 cm behind the first. Where is the final image, and what is the total magnification?",
        steps: [
          "First lens: \\(\\dfrac{1}{v_1} = \\dfrac{1}{20} - \\dfrac{1}{30} = \\dfrac{1}{60}\\), so \\(v_1 = 60\\) cm and \\(m_1 = \\dfrac{60}{-30} = -2\\).",
          "That image would form 20 cm beyond the second lens, so for the second lens it is a virtual object: \\(u_2 = +20\\) cm.",
          "\\(\\dfrac{1}{v_2} = \\dfrac{1}{20} + \\dfrac{1}{20} = \\dfrac{1}{10}\\), so \\(v_2 = 10\\) cm and \\(m_2 = \\dfrac{10}{20} = 0.5\\).",
          "\\(m = m_1 m_2 = -2 \\times 0.5 = -1\\).",
        ],
        answer: "10 cm behind the second lens, inverted and the same size (m = −1)",
      },
      selfCheckExample: {
        prompt:
          "Three thin lenses of power +2 D, +3 D and −1 D are placed in contact. What is the focal length of the combination?",
        steps: [
          "\\(P = 2 + 3 - 1 = 4\\) D.",
          "\\(F = \\dfrac{1}{4}\\) m = 25 cm, a converging combination.",
        ],
        answer: "25 cm (converging)",
      },
      practiceSet: [
        { prompt: "Two convex lenses of focal lengths 20 cm and 30 cm are in contact. What is the focal length of the pair?", answer: "12 cm" },
        { prompt: "In a two-lens system the first lens gives a magnification of −2 and the second −3. What is the total magnification?", answer: "+6" },
        { prompt: "A parallel beam falls on a convex lens of focal length 30 cm and leaves a second convex lens of focal length 10 cm still parallel. How far apart are the lenses?", answer: "40 cm" },
        { prompt: "A lens of power +4 D is put in contact with a second lens so that the pair has power +1 D. What is the second lens?", answer: "A concave lens of power −3 D (focal length about 33 cm)" },
      ],
      pyqExampleId: "86d9ff55-9140-4649-88c0-ebb26eaca10b",
      traps: [
        {
          title: "Add powers, not focal lengths",
          body: "Lenses of 20 cm and 30 cm in contact give \\(\\dfrac{1}{F} = \\dfrac{1}{20} + \\dfrac{1}{30}\\), so F = 12 cm, not 50 cm.",
        },
        {
          title: "Lenses apart need the lens formula twice",
          body: "The rule \\(P = P_1 + P_2\\) is only for thin lenses in contact. With a gap, trace the image through each lens in turn; an image beyond the second lens is a virtual object with positive u.",
        },
        {
          title: "Magnifications multiply",
          body: "The magnification of a lens combination is \\(m_1 m_2\\), not \\(m_1 + m_2\\), even though the powers of lenses in contact add.",
        },
      ],
    },
  ],
};
