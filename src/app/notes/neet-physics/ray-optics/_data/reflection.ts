import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_RO_REFLECTION_NOTE: SubtopicNote = {
  subtopicName: "Reflection and Refraction",
  title: "Reflection and Refraction",
  oneLineDefinition:
    "Reflection at plane and spherical mirrors with the mirror formula, refraction and Snell's law with apparent depth, and the critical angle at which light is totally reflected.",
  whyItMatters:
    "Five NEET questions from 2022 to 2026, and none of them is a mirror calculation. Two are on total internal reflection (a critical angle from two speeds in 2022, and from distances and times in 2023). One asks the angle between the reflected and refracted rays (2022), one compares apparent depths seen from either side of a layer (Re-NEET 2026) and one checks two statements on image formation and colour (Re-NEET 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphro-mirrors",
      name: "Reflection and spherical mirrors",
      intuition:
        "Light bounces off a smooth surface at the same angle at which it arrives. A smooth surface keeps the rays in order, so they can meet again and form an image. A rough wall also reflects light, but scatters it in all directions, so it shows no image. A curved mirror is a small piece of a sphere: a concave mirror brings parallel rays together at its focus, a convex mirror spreads them out as if they came from a focus behind it.",
      definition:
        "- **Laws of reflection:** the angle of reflection equals the angle of incidence, and the incident ray, the reflected ray and the normal lie in one plane.\n" +
        "- Image formation needs regular reflection (from a smooth surface) or regular refraction. Diffuse reflection from a rough surface forms no image.\n" +
        "- The colour of an object comes from the colours present in the light falling on it: a red object sends back mainly red light, and in light with no red it looks dark.\n" +
        "- **Sign convention:** every distance is measured from the pole of the mirror. Distances along the incoming light are positive, against it negative. So a real object has negative u, and a concave mirror has a negative f.\n" +
        "- Focal length \\(f = \\dfrac{R}{2}\\). Mirror equation \\(\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}\\). Magnification \\(m = \\dfrac{h'}{h} = -\\dfrac{v}{u}\\): negative m means a real, inverted image.\n" +
        "- A convex mirror always gives a virtual, erect, smaller image of a real object. A plane mirror gives a virtual image as far behind it as the object is in front.",
      formula: {
        label: "Mirror formula",
        latex: "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}, \\qquad f = \\frac{R}{2}, \\qquad m = -\\frac{v}{u}",
        symbols: [
          { symbol: "\\(u\\)", meaning: "object distance from the pole" },
          { symbol: "\\(v\\)", meaning: "image distance from the pole" },
          { symbol: "\\(R\\)", meaning: "radius of curvature" },
        ],
      },
      authoredExample: {
        prompt:
          "An object stands 30 cm in front of a concave mirror of focal length 20 cm. Where is the image, and what is the magnification?",
        steps: [
          "Signs: \\(u = -30\\) cm and \\(f = -20\\) cm (concave mirror).",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{f} - \\dfrac{1}{u} = -\\dfrac{1}{20} + \\dfrac{1}{30} = -\\dfrac{1}{60}\\), so \\(v = -60\\) cm.",
          "\\(m = -\\dfrac{v}{u} = -\\dfrac{-60}{-30} = -2\\): the image is real, inverted and twice the size.",
        ],
        answer: "60 cm in front of the mirror, real and inverted, m = −2",
      },
      selfCheckExample: {
        prompt:
          "An object is 15 cm in front of a convex mirror of radius of curvature 30 cm. Where is the image, and how big is it compared with the object?",
        steps: [
          "\\(f = \\dfrac{R}{2} = +15\\) cm for a convex mirror, and \\(u = -15\\) cm.",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{15} + \\dfrac{1}{15} = \\dfrac{2}{15}\\), so \\(v = +7.5\\) cm, behind the mirror.",
          "\\(m = -\\dfrac{7.5}{-15} = +0.5\\).",
        ],
        answer: "7.5 cm behind the mirror, virtual, erect and half the size",
      },
      practiceSet: [
        { prompt: "A concave mirror has a radius of curvature of 40 cm. What is its focal length in the sign convention?", answer: "\\(f = -20\\) cm" },
        { prompt: "An object is 10 cm in front of a concave mirror of focal length 20 cm. Where is the image?", answer: "20 cm behind the mirror, virtual and erect, \\(m = 2\\)" },
        { prompt: "What kind of image does a convex mirror form of a real object?", answer: "Virtual, erect and smaller than the object" },
        { prompt: "A single mirror forms an image with magnification −3 of a real object. Is the image real or virtual?", answer: "Real (and inverted)" },
      ],
      pyqExampleId: "17fd806b-375d-4a2d-9305-74d2d77300e2",
      traps: [
        {
          title: "A concave mirror has a negative focal length",
          body: "With distances measured along the incoming light as positive, the focus of a concave mirror lies in front of it, so \\(f\\) is negative. Putting \\(f = +20\\) cm for a concave mirror puts the image on the wrong side.",
        },
        {
          title: "Mirror magnification has a minus sign",
          body: "For a mirror \\(m = -\\dfrac{v}{u}\\). Dropping the minus sign turns a real, inverted image into an erect one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphro-snell",
      name: "Refraction, Snell's law and apparent depth",
      intuition:
        "Light slows down in glass or water. When it crosses a boundary at a slant, the change of speed bends it: towards the normal going into a denser medium, away from the normal coming out. The refractive index n = c/v says how much slower light is. Because of this bending, a coin under water looks nearer the surface than it is.",
      definition:
        "- **Snell's law:** \\(n_1 \\sin i = n_2 \\sin r\\). Refractive index \\(n = \\dfrac{c}{v}\\), and \\(n_{21} = \\dfrac{n_2}{n_1} = \\dfrac{v_1}{v_2}\\).\n" +
        "- The frequency of light does not change on refraction. Speed and wavelength both fall by the factor n: \\(\\lambda_{\\text{medium}} = \\dfrac{\\lambda}{n}\\).\n" +
        "- If the reflected and refracted rays are at right angles, then \\(r = 90^{\\circ} - i\\) and Snell's law gives \\(\\tan i = n\\).\n" +
        "- **Apparent depth:** an object at depth h in a medium of index n, seen from air near the normal, appears at \\(h' = \\dfrac{h}{n}\\). It seems raised by \\(h\\left(1 - \\dfrac{1}{n}\\right)\\).\n" +
        "- Seen from a medium of index \\(n_2\\), an object in a medium of index \\(n_1\\) appears at \\(d' = d\\,\\dfrac{n_2}{n_1}\\).\n" +
        "- A ray through a parallel glass slab comes out parallel to the incoming ray, shifted sideways.",
      formula: {
        label: "Snell's law and apparent depth",
        latex: "n_1\\sin i = n_2\\sin r, \\qquad n = \\frac{c}{v}, \\qquad h' = \\frac{h}{n}",
        symbols: [
          { symbol: "\\(i\\)", meaning: "angle of incidence" },
          { symbol: "\\(r\\)", meaning: "angle of refraction" },
          { symbol: "\\(h'\\)", meaning: "apparent depth seen from air" },
        ],
      },
      authoredExample: {
        prompt:
          "A coin lies at the bottom of a tank of water 12 cm deep. The refractive index of water is 4/3. Looking down from just above, how deep does the coin appear, and by how much does it seem raised?",
        steps: [
          "\\(h' = \\dfrac{h}{n} = \\dfrac{12}{4/3} = 9\\) cm.",
          "It seems raised by \\(12 - 9 = 3\\) cm.",
        ],
        answer: "9 cm deep, raised by 3 cm",
      },
      selfCheckExample: {
        prompt:
          "Light of wavelength 600 nm in air enters glass of refractive index 1.5. Find its speed and wavelength in the glass.",
        steps: [
          "\\(v = \\dfrac{c}{n} = \\dfrac{3 \\times 10^{8}}{1.5} = 2 \\times 10^{8}\\) m/s.",
          "The frequency is unchanged, so \\(\\lambda = \\dfrac{600}{1.5} = 400\\) nm.",
        ],
        answer: "\\(2 \\times 10^{8}\\) m/s and 400 nm",
      },
      practiceSet: [
        { prompt: "A ray goes from air into glass of refractive index 1.5 at an angle of incidence of 30°. Find the sine of the angle of refraction.", answer: "\\(\\sin r = \\dfrac{1}{3}\\)" },
        { prompt: "What is the speed of light in a medium of refractive index 2?", answer: "\\(1.5 \\times 10^{8}\\) m/s" },
        { prompt: "When light passes from air into water, which stays the same: its speed, its wavelength or its frequency?", answer: "Its frequency" },
        { prompt: "A glass slab 6 cm thick, of refractive index 1.5, lies on a mark. Seen from above, by how much does the mark seem raised?", answer: "2 cm" },
      ],
      pyqExampleId: "e8913aa5-1e8e-4b18-a38e-b2f444c730ef",
      traps: [
        {
          title: "Frequency does not change",
          body: "Crossing into a denser medium, light's speed and wavelength both fall by the factor n. Its frequency, and so its colour, stays the same.",
        },
        {
          title: "Apparent depth depends on where you look from",
          body: "From air, an object under water looks nearer. From inside the denser medium, an object in the rarer one looks farther: \\(d' = d\\,\\dfrac{n_2}{n_1}\\) with \\(n_2\\) the observer's medium.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphro-tir",
      name: "Critical angle and total internal reflection",
      intuition:
        "Going from glass into air, light bends away from the normal. Tilt the ray more and more, and the refracted ray bends until it skims along the surface. That angle of incidence is the critical angle. Tilt any further and no light gets out at all: all of it is reflected back into the glass. This is total internal reflection.",
      definition:
        "- Two conditions: light must go from a denser to a rarer medium, and the angle of incidence must be greater than the critical angle C.\n" +
        "- At \\(i = C\\) the refracted ray grazes the surface (\\(r = 90^{\\circ}\\)), so \\(n_{\\text{denser}} \\sin C = n_{\\text{rarer}}\\).\n" +
        "- \\(\\sin C = \\dfrac{n_{\\text{rarer}}}{n_{\\text{denser}}} = \\dfrac{v_{\\text{denser}}}{v_{\\text{rarer}}}\\). With air outside, \\(\\sin C = \\dfrac{1}{n}\\).\n" +
        "- Uses: optical fibres carry light along a bent path by repeated total internal reflection; diamond sparkles because its critical angle is small (about 24°); right-angled prisms turn light through 90° or 180°; a mirage is total reflection in hot air near the ground.",
      formula: {
        label: "Critical angle",
        latex: "\\sin C = \\frac{n_{\\text{rarer}}}{n_{\\text{denser}}} = \\frac{v_{\\text{denser}}}{v_{\\text{rarer}}}, \\qquad \\sin C = \\frac{1}{n}\\ (\\text{in air})",
      },
      authoredExample: {
        prompt:
          "Light travels in glass (n = 1.5) towards a boundary with water (n = 4/3). What is the critical angle?",
        steps: [
          "Glass is denser, so total reflection is possible on the glass side.",
          "\\(\\sin C = \\dfrac{n_{\\text{water}}}{n_{\\text{glass}}} = \\dfrac{4/3}{1.5} = \\dfrac{8}{9}\\).",
        ],
        answer: "\\(C = \\sin^{-1}\\left(\\dfrac{8}{9}\\right)\\)",
      },
      selfCheckExample: {
        prompt:
          "Light inside glass of refractive index \\(\\sqrt{2}\\) meets the glass-air surface at an angle of incidence of 50°. Does it come out into the air?",
        steps: [
          "\\(\\sin C = \\dfrac{1}{\\sqrt{2}}\\), so \\(C = 45^{\\circ}\\).",
          "50° is more than 45°, so the light is totally reflected.",
        ],
        answer: "No, it is totally reflected",
      },
      practiceSet: [
        { prompt: "The critical angle of a medium in air is 30°. What is its refractive index?", answer: "2" },
        { prompt: "State the two conditions for total internal reflection.", answer: "Light goes from a denser to a rarer medium, and \\(i > C\\)" },
        { prompt: "Which device carries light along a bent path by repeated total internal reflection?", answer: "An optical fibre" },
        { prompt: "Find the critical angle in air for a medium of refractive index \\(2/\\sqrt{3}\\).", answer: "60°" },
      ],
      pyqExampleId: "155698e3-af16-4086-b233-5f3ccfb476bd",
      traps: [
        {
          title: "Only from denser to rarer",
          body: "Light going from air into glass can never be totally reflected, however large the angle of incidence. Total internal reflection needs the light to start in the denser medium.",
        },
        {
          title: "With speeds, the slower one goes on top",
          body: "Since \\(n = c/v\\), \\(\\sin C = \\dfrac{v_{\\text{denser}}}{v_{\\text{rarer}}}\\): the smaller speed is in the numerator. Writing the larger speed on top gives a sine above 1.",
        },
      ],
    },
  ],
};
