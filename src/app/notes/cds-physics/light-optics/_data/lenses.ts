import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_LI_LENSES_NOTE: SubtopicNote = {
  subtopicName: "Refraction and Lenses",
  title: "Refraction and Lenses",
  oneLineDefinition:
    "Why light bends between two media, the refractive index, total internal reflection, where a convex lens forms its image, and the lens formula and power.",
  whyItMatters:
    "Seventeen CDS questions from 2016 (II) to 2026 (II), the largest page in the chapter. Six are about refraction itself, one about total internal reflection, and ten about lenses: where the image forms, the lens formula and power in dioptres.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsphli-refraction",
      name: "Refraction and the refractive index",
      intuition:
        "Light travels at different speeds in different materials: fastest in vacuum, slower in water, slower still in glass. When a ray crosses from one material into another at a slant, the change of speed turns it, the way a car swerves when one front wheel runs onto sand first. The refractive index tells you how many times slower light is in a material than in vacuum.",
      definition:
        "Refraction rules:\n" +
        "- **Cause**: the **change in the speed** of light at the boundary.\n" +
        "- **Refractive index** \\(n = c/v\\), the speed in vacuum (or air) over the speed in the medium. It is greater than 1 for every material medium; water about 1.33, glass about 1.5, diamond about 2.42.\n" +
        "- **Rarer to denser** (air into glass): light **slows down** and bends **towards** the normal. Denser to rarer: speeds up and bends **away** from the normal.\n" +
        "- **Along the normal** (angle of incidence 0°): the ray goes straight through, angle of refraction 0°, though its speed still changes.\n" +
        "- **Snell's law**: \\(n_1 \\sin i = n_2 \\sin r\\).",
      formula: {
        label: "Refractive index and Snell's law",
        latex: "n = \\frac{c}{v} \\qquad n_1 \\sin i = n_2 \\sin r",
        symbols: [
          { symbol: "n", meaning: "refractive index of the medium" },
          { symbol: "c", meaning: "speed of light in vacuum, about \\(3 \\times 10^{8}\\) m/s" },
          { symbol: "v", meaning: "speed of light in the medium" },
          { symbol: "i, r", meaning: "angles of incidence and refraction, from the normal" },
        ],
      },
      authoredExample: {
        prompt: "The refractive index of water is 4/3 and of a glass is 1.6. In which does light travel faster, and how many times faster?",
        steps: [
          "From \\(n = c/v\\), \\(v = c/n\\): the larger the refractive index, the slower the light.",
          "\\(\\dfrac{v_{\\text{water}}}{v_{\\text{glass}}} = \\dfrac{c/n_{\\text{water}}}{c/n_{\\text{glass}}} = \\dfrac{n_{\\text{glass}}}{n_{\\text{water}}}\\).",
          "\\(\\dfrac{1.6}{4/3} = 1.6 \\times \\dfrac{3}{4} = 1.2\\).",
        ],
        answer: "In water, 1.2 times as fast as in the glass.",
      },
      selfCheckExample: {
        prompt: "Light travels at \\(1.25 \\times 10^{8}\\) m/s in diamond. Taking its speed in air as \\(3 \\times 10^{8}\\) m/s, find the refractive index of diamond.",
        steps: [
          "\\(n = c/v = (3 \\times 10^{8}) / (1.25 \\times 10^{8})\\).",
          "\\(n = 2.4\\).",
        ],
        answer: "2.4.",
      },
      pyqExampleId: "1454c25c-ee51-4e5c-9e77-07bf1ccd5294",
      practiceSet: [
        { prompt: "What causes a ray of light to bend when it passes from one transparent medium into another?", answer: "The change in the speed of light" },
        { prompt: "A ray passes from glass into air at a slant. Does it bend towards or away from the normal?", answer: "Away from the normal" },
        { prompt: "A ray enters glass along the normal. What is the angle of refraction?", answer: "0°: it goes straight through" },
        { prompt: "Can the refractive index of a material medium be less than 1?", answer: "No: light is always slower in a medium than in vacuum" },
      ],
      traps: [
        {
          title: "Refractive index is c over v, not v over c",
          body: "\\(n = c/v\\) is always **greater than 1**. Writing \\(v/c\\) gives a number below 1, which no material has. To find the speed in a medium, divide \\(c\\) by \\(n\\); never multiply.",
        },
        {
          title: "Slower means towards the normal",
          body: "Going into a denser medium, light **slows down and bends towards** the normal. The two halves always go together: an option pairing 'slows down' with 'away from the normal' is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphli-tir",
      name: "Total internal reflection",
      intuition:
        "When light goes from glass out into air, it bends away from the normal. Tilt the ray more and more, and at one angle, the critical angle, the outgoing ray skims along the surface. Tilt it further and no light gets out at all: every bit of it is reflected back inside. This is total internal reflection, and because nothing escapes, the reflected beam is as bright as the incoming one.",
      definition:
        "Conditions and uses:\n" +
        "- Light must go from a **denser** to a **rarer** medium (glass to air, water to air).\n" +
        "- The angle of incidence must be **greater than the critical angle** \\(C\\), where \\(\\sin C = 1/n\\).\n" +
        "- **All** the light is reflected, so there is **no loss of intensity**: better than any mirror.\n" +
        "- Critical angle: glass about 42°, water about 49°, diamond about 24°.\n" +
        "- **Uses and examples**: **optical fibres** (endoscopes, telecommunication), the **sparkle of a diamond**, totally reflecting prisms in binoculars, and the **mirage** on a hot road.",
      formula: {
        label: "Critical angle",
        latex: "\\sin C = \\frac{1}{n}",
        symbols: [
          { symbol: "C", meaning: "critical angle, inside the denser medium" },
          { symbol: "n", meaning: "refractive index of the denser medium relative to the rarer one" },
        ],
      },
      authoredExample: {
        prompt: "Find the critical angle for light going from glass of refractive index 1.5 into air.",
        steps: [
          "\\(\\sin C = 1/n = 1/1.5 = 0.667\\).",
          "The angle whose sine is 0.667 is about 41.8°.",
        ],
        answer: "About 42°.",
      },
      selfCheckExample: {
        prompt: "Diamond has a refractive index of about 2.42. Find its critical angle, and say why this makes a cut diamond sparkle.",
        steps: [
          "\\(\\sin C = 1/2.42 \\approx 0.41\\), so \\(C \\approx 24^\\circ\\).",
          "Such a small critical angle means most light striking the inside faces exceeds it.",
          "That light is totally reflected many times before it escapes from the top.",
        ],
        answer: "About 24°; light is trapped by repeated total internal reflection and leaves through a few faces, so the diamond sparkles.",
      },
      pyqExampleId: "0f775756-333f-42ee-8e89-15c6af370945",
      practiceSet: [
        { prompt: "Which device carries light along a bent glass thread by total internal reflection?", answer: "An optical fibre" },
        { prompt: "What must the angle of incidence exceed for total internal reflection?", answer: "The critical angle" },
        { prompt: "Name a medical instrument that uses optical fibres to see inside the body.", answer: "An endoscope" },
        { prompt: "Which material has the smaller critical angle: glass or diamond?", answer: "Diamond" },
      ],
      traps: [
        {
          title: "Higher refractive index, smaller critical angle",
          body: "From \\(\\sin C = 1/n\\), a larger \\(n\\) gives a smaller \\(C\\). Diamond (24°) traps light more easily than glass (42°), which is why it sparkles.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphli-lens-images",
      name: "Images formed by a convex lens",
      intuition:
        "A convex lens is thicker in the middle and bends parallel light together at a focus F on the far side. Where its image appears depends on how far the object is from the lens, measured in focal lengths. Far away, the image is small and near F. Bring the object closer and the image moves out and grows. At F the light comes out parallel and no image forms. Closer than F, the lens acts as a magnifying glass.",
      definition:
        "Convex lens, object at each position (F = focus, 2F = twice the focal length):\n" +
        "- **At infinity**: image at F, real, inverted, highly diminished.\n" +
        "- **Beyond 2F**: image between F and 2F, real, inverted, diminished.\n" +
        "- **At 2F**: image at 2F, real, inverted, **same size**. Object and image are then \\(4f\\) apart, the **least** separation for a real image.\n" +
        "- **Between F and 2F**: image beyond 2F, real, inverted, **enlarged**.\n" +
        "- **At F**: image at **infinity**.\n" +
        "- **Between F and the lens**: image on the same side, **virtual, erect, enlarged** (a magnifying glass).\n" +
        "- A **concave lens** always gives a virtual, erect, diminished image.\n" +
        "- The **aperture** is the diameter of the lens's circular outline. It does not depend on the radius of curvature.",
      table: {
        columns: ["Object position", "Image (convex lens)"],
        rows: [
          { cells: ["Beyond 2F", "Between F and 2F; real, inverted, smaller"] },
          { cells: ["At 2F", "At 2F; real, inverted, same size"] },
          {
            cells: ["Between F and 2F", "Beyond 2F; real, inverted, enlarged"],
            noteAmber: "CDS 2020 (II): an object 40 cm from a lens of focal length 25 cm gives an inverted, magnified image.",
            pyqExampleId: "9dc03b7b-e5a4-4a7f-a839-b3aa75bb0247",
          },
          {
            cells: ["At F", "At infinity"],
            noteAmber: "CDS 2022 (II): an object at the focus of a convex lens has its image at infinity.",
            pyqExampleId: "f28113ad-e829-42be-acdc-16291c471822",
          },
          { cells: ["Between F and the lens", "Same side; virtual, erect, enlarged"] },
        ],
      },
      pyqExampleId: "81500cca-e1ed-4b32-a455-8f3da3da9300",
      selfCheckExample: {
        prompt: "A convex lens has a focal length of 12 cm. An object is placed 6 cm from it. Describe the image without calculating.",
        steps: [
          "6 cm is less than the focal length, so the object is between F and the lens.",
          "In that position a convex lens acts as a magnifying glass.",
        ],
        answer: "Virtual, erect and enlarged, on the same side as the object.",
      },
      practiceSet: [
        { prompt: "A convex lens has a focal length of 20 cm. Where must an object be placed to get a real image of the same size?", answer: "40 cm from the lens, at 2F" },
        { prompt: "What kind of image does a concave lens always form?", answer: "Virtual, erect and diminished" },
        { prompt: "An object is very far from a convex lens. Where does its image form?", answer: "At the focus" },
        { prompt: "What is the least distance between an object and its real image for a convex lens of focal length \\(f\\)?", answer: "\\(4f\\)" },
      ],
      traps: [
        {
          title: "Enlarged and real needs F to 2F",
          body: "A convex lens gives a real, enlarged image only with the object **between F and 2F**. At 2F the image is the same size; beyond 2F it is smaller; inside F it is enlarged but virtual.",
        },
        {
          title: "Object at the focus: no image at a finite distance",
          body: "Light from the focus leaves the lens **parallel**, so the image is at infinity. It is not at the focus on the other side, which is where light from infinity goes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphli-lens-formula",
      name: "Lens formula, magnification and power",
      intuition:
        "The image table tells you roughly where an image is; the lens formula gives the exact distance. The magnification says how much bigger the image is, and its sign says whether it is upright or upside down. The power of a lens says how strongly it bends light: a lens with a short focal length bends light sharply and has a large power.",
      definition:
        "Lens rules (New Cartesian convention: distances measured from the optical centre, along the light are positive):\n" +
        "- **Lens formula**: \\(\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}\\). A convex lens has positive \\(f\\), a concave lens negative \\(f\\).\n" +
        "- **Magnification** \\(m = v/u\\). **Positive** \\(m\\): virtual and erect. **Negative** \\(m\\): real and inverted. \\(|m| > 1\\): enlarged.\n" +
        "- **Power** \\(P = 1/f\\), with \\(f\\) in **metres**; unit the **dioptre (D)**. Convex lens: positive power; concave: negative.\n" +
        "- The **bigger the size** of the power (ignoring the sign), the more sharply the lens bends light.\n" +
        "- Lenses in contact: powers add, \\(P = P_1 + P_2\\).",
      formula: {
        label: "Lens formula, magnification and power",
        latex: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f} \\qquad m = \\frac{v}{u} \\qquad P = \\frac{1}{f\\,(\\text{in m})}",
        symbols: [
          { symbol: "u, v", meaning: "object and image distances from the lens" },
          { symbol: "f", meaning: "focal length (positive for convex)" },
          { symbol: "m", meaning: "magnification" },
          { symbol: "P", meaning: "power, in dioptres" },
        ],
      },
      authoredExample: {
        prompt: "An object is 30 cm in front of a convex lens of focal length 20 cm. Find the image distance, the magnification and the power of the lens.",
        steps: [
          "\\(u = -30\\) cm, \\(f = +20\\) cm.",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{f} + \\dfrac{1}{u} = \\dfrac{1}{20} - \\dfrac{1}{30} = \\dfrac{3 - 2}{60} = \\dfrac{1}{60}\\), so \\(v = +60\\) cm.",
          "\\(m = v/u = 60/(-30) = -2\\): real, inverted, twice the size.",
          "Power: \\(f = 0.20\\) m, so \\(P = 1/0.20 = +5\\) D.",
        ],
        answer: "Image 60 cm behind the lens, magnification −2, power +5 D.",
      },
      selfCheckExample: {
        prompt: "An object is 10 cm in front of a convex lens of focal length 15 cm. Find the image distance and the magnification, and describe the image.",
        steps: [
          "\\(u = -10\\) cm, \\(f = +15\\) cm.",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{15} - \\dfrac{1}{10} = \\dfrac{2 - 3}{30} = -\\dfrac{1}{30}\\), so \\(v = -30\\) cm.",
          "\\(m = v/u = (-30)/(-10) = +3\\).",
        ],
        answer: "30 cm on the same side as the object; magnification +3, so virtual, erect and three times larger.",
      },
      pyqExampleId: "fe8802bf-fc23-460e-9728-d6dcea07e184",
      practiceSet: [
        { prompt: "A lens has a power of −2.5 D. Is it converging or diverging, and what is its focal length?", answer: "Diverging (concave); focal length −40 cm" },
        { prompt: "What does a magnification of −1 tell you about an image?", answer: "It is real, inverted and the same size" },
        { prompt: "Lenses of power +2 D and +3 D are placed in contact. What is the total power?", answer: "+5 D" },
        { prompt: "Which bends light more: a lens of power −3 D or one of +1 D?", answer: "The −3 D lens: its power is larger in size" },
      ],
      traps: [
        {
          title: "Focal length in metres before taking the reciprocal",
          body: "\\(P = 1/f\\) needs \\(f\\) in **metres**. A 25 cm lens has \\(P = 1/0.25 = 4\\) D, not 1/25 = 0.04 D. Most wrong options are off by a factor of 100.",
        },
        {
          title: "Bending power goes by size, not sign",
          body: "A +2.5 D lens bends light more than a −2.0 D lens, and a −3 D lens more than a +2 D lens. Compare the sizes of the powers; the sign only says converging or diverging.",
        },
        {
          title: "Positive magnification means virtual",
          body: "For a lens \\(m = v/u\\). A **positive** \\(m\\) means an erect, **virtual** image, and \\(|m| > 1\\) means it is enlarged. A real image from a single lens always has a negative \\(m\\).",
        },
      ],
    },
  ],
};
