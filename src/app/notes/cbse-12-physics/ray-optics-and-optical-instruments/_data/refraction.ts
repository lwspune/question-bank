import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_RO_REFRACTION_NOTE: SubtopicNote = {
  subtopicName: "Refraction and Total Internal Reflection",
  title: "Refraction, Critical Angle and Total Internal Reflection",
  oneLineDefinition:
    "Snell's law and the refractive index, apparent depth and the shift through a slab, the critical angle and the two conditions for total internal reflection, light escaping from a source under a liquid, and the uses of total internal reflection.",
  whyItMatters:
    "52 questions, forty-seven of them from board papers from 2022 to 2026. The board asks you to define the critical angle and relate it to the refractive index (2023, 2026), state the conditions for total internal reflection (2022, 2023, 2026), find the area through which light from a bulb in a tank escapes (2022, 2025, 2026), use apparent depth to find a refractive index or the speed of light (2022, 2025, 2026), derive the lateral shift through a slab (2025), explain an optical fibre (2022, 2025), and trace a ray through glass blocks and prisms where it may be totally reflected. The textbook adds a light pipe and a microscope refocused on a needle under a liquid.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpro-snell",
      name: "Snell's law, refractive index and apparent depth",
      intuition:
        "Light slows down in glass or water, and a ray that enters at an angle bends because of it. Going into a denser medium it bends towards the normal; coming out it bends away. The same bending makes the bottom of a pool look raised: rays from the bottom bend away from the normal as they leave the water, so they seem to come from a point nearer the surface.",
      definition:
        "- **Laws of refraction:** the incident ray, the refracted ray and the normal lie in one plane; and \\(\\dfrac{\\sin i}{\\sin r} = n_{21}\\), a constant, the refractive index of medium 2 with respect to medium 1.\n" +
        "- \\(n_{21} = \\dfrac{n_2}{n_1} = \\dfrac{v_1}{v_2}\\) and \\(n_{12} = \\dfrac{1}{n_{21}}\\). The absolute refractive index is \\(n = c/v\\), always greater than 1.\n" +
        "- If \\(n_{21} > 1\\) the ray bends towards the normal (medium 2 is optically denser); if \\(n_{21} < 1\\) it bends away.\n" +
        "- On refraction the **frequency does not change**; the speed and the wavelength both fall by the factor n: \\(\\lambda_{\\text{medium}} = \\lambda/n\\).\n" +
        "- **Rectangular slab:** the emergent ray is parallel to the incident ray but shifted sideways (lateral shift). Board 2025 asked for its expression, \\(d = \\dfrac{t\\sin(i - r)}{\\cos r}\\) for a slab of thickness t: the ray travels \\(t/\\cos r\\) inside, and the shift is that path times \\(\\sin(i - r)\\). The present NCERT book shows the shift in a figure but does not derive it, so give it less time.\n" +
        "- **Apparent depth**, viewed near the normal: \\(\\text{apparent depth} = \\dfrac{\\text{real depth}}{n}\\). An object seen through a slab of thickness t appears raised by \\(t\\left(1 - \\dfrac{1}{n}\\right)\\).",
      formula: {
        label: "Snell's law and apparent depth",
        latex: "n_{21} = \\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2}, \\qquad n = \\frac{c}{v}, \\qquad h_{\\text{apparent}} = \\frac{h_{\\text{real}}}{n}",
      },
      authoredExample: {
        prompt:
          "A coin lies at the bottom of a tank filled with a liquid to a depth of 20 cm. Seen from directly above, it appears to be 16 cm below the surface. Find the refractive index of the liquid and the speed of light in it.",
        steps: [
          "Given: real depth = 20 cm, apparent depth = 16 cm, \\(c = 3 \\times 10^8\\) m/s.",
          "Formula: \\(n = \\dfrac{\\text{real depth}}{\\text{apparent depth}}\\).",
          "Substitution: \\(n = \\dfrac{20}{16} = 1.25\\).",
          "Speed: \\(v = \\dfrac{c}{n} = \\dfrac{3 \\times 10^8}{1.25} = 2.4 \\times 10^8\\) m/s.",
        ],
        answer: "n = 1.25; speed of light 2.4 × 10⁸ m/s",
      },
      selfCheckExample: {
        prompt:
          "Light of wavelength 480 nm in air enters glass of refractive index 1.6. Find its wavelength in the glass and its frequency.",
        steps: [
          "Wavelength: \\(\\lambda_g = \\dfrac{480}{1.6} = 300\\) nm.",
          "Frequency is the same in both media: \\(\\nu = \\dfrac{c}{\\lambda} = \\dfrac{3 \\times 10^8}{480 \\times 10^{-9}} = 6.25 \\times 10^{14}\\) Hz.",
        ],
        answer: "300 nm; 6.25 × 10¹⁴ Hz in both media",
      },
      practiceSet: [
        { prompt: "A glass slab 8 cm thick, of refractive index 1.6, lies on a printed page. By how much do the letters appear raised?", answer: "3 cm" },
        { prompt: "Which of speed, wavelength and frequency stays the same when light passes from air into water?", answer: "Frequency" },
        { prompt: "The refractive index of glass with respect to water is 9/8. What is the refractive index of water with respect to glass?", answer: "8/9" },
        { prompt: "Does the bottom of a tank of water look deeper or shallower than it really is when seen from above?", answer: "Shallower: it appears raised" },
      ],
      pyqExampleId: "cabebead-f1db-40ea-a17a-1ccf98998dc3",
      traps: [
        {
          title: "Taking the angle with the surface",
          body: "i and r are measured from the NORMAL. If a question gives the angle a ray makes with the surface, use 90° minus that angle in Snell's law.",
        },
        {
          title: "Dividing the wrong way",
          body: "A refractive index is never less than 1 for a material against vacuum. If \\(c/v\\) or real depth over apparent depth gives you less than 1, you have inverted the ratio.",
        },
        {
          title: "Lateral shift without the diagram",
          body: "Draw the slab, the normals at both faces, the incident and emergent rays with arrows, and mark the shift as the perpendicular distance between the two parallel rays. The diagram is where the first marks are.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpro-critical-angle",
      name: "Critical angle and total internal reflection",
      intuition:
        "When light goes from glass into air it bends away from the normal. Tilt the ray more and more, and the refracted ray swings towards the surface until it just grazes along it. That angle of incidence is the critical angle. Tilt it further and no light can get out at all: all of it is reflected back inside. This is total internal reflection, and it can only happen on the way out of the denser medium.",
      definition:
        "- **Critical angle \\(i_c\\):** the angle of incidence in the denser medium for which the angle of refraction in the rarer medium is 90°.\n" +
        "- **Total internal reflection:** when the angle of incidence in the denser medium is greater than the critical angle, no light is refracted; all of it is reflected back into the denser medium.\n" +
        "- **Two conditions, both needed:** (i) light travels from an optically denser medium to a rarer one; (ii) the angle of incidence is greater than the critical angle.\n" +
        "- **Relation with refractive index:** Snell's law at the boundary with \\(r = 90^\\circ\\): \\(n_{\\text{denser}}\\sin i_c = n_{\\text{rarer}}\\sin 90^\\circ\\), so \\(\\sin i_c = \\dfrac{n_{\\text{rarer}}}{n_{\\text{denser}}}\\). Against air, \\(\\sin i_c = \\dfrac{1}{n}\\).\n" +
        "- The larger n, the smaller \\(i_c\\): water 1.33 gives 48.75°, crown glass 1.52 gives 41.14°, dense flint glass 1.62 gives 37.31°, diamond 2.42 gives 24.41°.\n" +
        "- **Colour:** n is largest for violet and smallest for red, so the critical angle is smallest for violet, and violet is totally reflected first. The present NCERT chapter only states that n depends on wavelength and has no dispersion section, yet the board asked about colour in 2022, 2023, 2024 and 2026.\n" +
        "- **Tracing a ray in a block or prism:** find the angle of incidence at the face from the geometry, then compare it with \\(i_c\\). Less than \\(i_c\\): it refracts out, bending away from the normal. Equal: it grazes along the face. Greater: it is totally reflected.",
      formula: {
        label: "Critical angle",
        latex: "\\sin i_c = \\frac{n_{\\text{rarer}}}{n_{\\text{denser}}}, \\qquad \\sin i_c = \\frac{1}{n} \\ (\\text{against air})",
      },
      authoredExample: {
        prompt:
          "A glass block of refractive index 1.6 has water (refractive index 4/3) in contact with one face. Find the critical angle for the glass-water boundary, and say what happens to a ray in the glass that meets this face at 60°.",
        steps: [
          "Given: \\(n_{\\text{denser}} = 1.6\\) (glass), \\(n_{\\text{rarer}} = 4/3\\) (water).",
          "Formula: \\(\\sin i_c = \\dfrac{n_{\\text{rarer}}}{n_{\\text{denser}}}\\).",
          "Substitution: \\(\\sin i_c = \\dfrac{4/3}{1.6} = 0.833\\), so \\(i_c = 56.4^\\circ\\).",
          "The ray goes from glass (denser) to water (rarer) at \\(60^\\circ > 56.4^\\circ\\), so both conditions hold.",
        ],
        answer: "Critical angle 56.4°; the ray at 60° is totally internally reflected",
      },
      selfCheckExample: {
        prompt:
          "The critical angle of a medium with respect to air is 37°. Taking sin 37° = 0.6, find the refractive index of the medium and the speed of light in it.",
        steps: [
          "\\(n = \\dfrac{1}{\\sin i_c} = \\dfrac{1}{0.6} = 1.67\\).",
          "\\(v = \\dfrac{c}{n} = 3 \\times 10^8 \\times 0.6 = 1.8 \\times 10^8\\) m/s.",
        ],
        answer: "n = 1.67; v = 1.8 × 10⁸ m/s",
      },
      practiceSet: [
        { prompt: "For which colour is the critical angle of glass smallest, red or violet?", answer: "Violet" },
        { prompt: "Can light going from air into glass be totally internally reflected?", answer: "No. It must travel from the denser medium to the rarer one" },
        { prompt: "Why does a well-cut diamond sparkle?", answer: "Its critical angle is small (about 24°), so light inside is totally reflected many times before it gets out" },
        { prompt: "A ray inside a glass block meets the glass-air face exactly at the critical angle. Along which direction does it leave?", answer: "Along the face, grazing the surface (angle of refraction 90°)" },
      ],
      pyqExampleId: "46ab1d75-536f-4b34-8016-8643664755ef",
      traps: [
        {
          title: "A definition without the denser medium",
          body: "Say where the angle is measured: the angle of incidence IN THE DENSER MEDIUM for which the angle of refraction is 90°. Leaving out 'denser to rarer' costs the mark.",
        },
        {
          title: "Writing sin ic = n",
          body: "A sine cannot be more than 1. Against air, \\(\\sin i_c = 1/n\\); between two media it is the smaller index over the larger one.",
        },
        {
          title: "Giving only one condition",
          body: "The board asks for two conditions. Write both: denser to rarer, AND angle of incidence greater than the critical angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpro-light-circle",
      name: "Light escaping from a source under a liquid",
      intuition:
        "A bulb at the bottom of a tank sends rays up in every direction. Only those that meet the surface at less than the critical angle get out; the steeper ones are totally reflected back down. So the light comes out through a bright circle right above the bulb, whose edge is set by rays at exactly the critical angle. The same circle, seen from below, is the window through which a diver sees the whole sky.",
      definition:
        "- Rays meeting the surface at angles greater than \\(i_c\\) are totally reflected, so light escapes only through a cone of half-angle \\(i_c\\) with its tip at the source.\n" +
        "- The cone cuts the surface in a circle of radius \\(r = h\\tan i_c\\), where h is the depth of the source.\n" +
        "- With \\(\\sin i_c = \\dfrac{1}{n}\\): \\(\\cos i_c = \\dfrac{\\sqrt{n^2 - 1}}{n}\\), so \\(\\tan i_c = \\dfrac{1}{\\sqrt{n^2 - 1}}\\) and \\(r = \\dfrac{h}{\\sqrt{n^2 - 1}}\\).\n" +
        "- Area of the circle: \\(A = \\pi r^2 = \\dfrac{\\pi h^2}{n^2 - 1}\\).\n" +
        "- An opaque disc that cuts off all the light must have diameter 2r.",
      formula: {
        label: "Radius and area of the circle of light",
        latex: "r = h\\tan i_c = \\frac{h}{\\sqrt{n^2 - 1}}, \\qquad A = \\pi r^2 = \\frac{\\pi h^2}{n^2 - 1}",
      },
      authoredExample: {
        prompt:
          "A small bulb lies 60 cm below the surface of a liquid of refractive index 5/4. Find the area of the surface through which light from the bulb comes out.",
        steps: [
          "Given: \\(h = 60\\) cm \\(= 0.6\\) m, \\(n = 5/4\\).",
          "Critical angle: \\(\\sin i_c = \\dfrac{1}{n} = 0.8\\), so \\(\\cos i_c = 0.6\\) and \\(\\tan i_c = \\dfrac{4}{3}\\).",
          "Radius: \\(r = h\\tan i_c = 0.6 \\times \\dfrac{4}{3} = 0.8\\) m.",
          "Area: \\(A = \\pi r^2 = 3.14 \\times 0.64 = 2.01\\) m².",
        ],
        answer: "About 2.01 m²",
      },
      selfCheckExample: {
        prompt:
          "A diver 2 m below the surface of a liquid of refractive index 5/3 sees the world outside through a circle on the surface. Find the radius of the circle.",
        steps: [
          "\\(\\sin i_c = \\dfrac{3}{5}\\), so \\(\\tan i_c = \\dfrac{3}{4}\\).",
          "\\(r = 2 \\times \\dfrac{3}{4} = 1.5\\) m.",
        ],
        answer: "1.5 m",
      },
      practiceSet: [
        { prompt: "A bulb at depth h in a liquid lights up a circle on the surface. What happens to the area of the circle if the bulb is lowered to depth 2h?", answer: "It becomes four times as large" },
        { prompt: "Why does light from a bulb in a tank come out through a circle and not through the whole surface?", answer: "Rays meeting the surface beyond the critical angle are totally reflected back" },
        { prompt: "A bulb lies 40 cm deep in a liquid whose critical angle is 45°. What is the radius of the circle of light?", answer: "40 cm" },
      ],
      pyqExampleId: "c470e806-0d7e-49e5-9f4e-19f1472dd04a",
      traps: [
        {
          title: "Using sin ic for the radius",
          body: "The radius comes from the right triangle with the depth as one side: \\(r = h\\tan i_c\\). Writing \\(r = h\\sin i_c\\) gives a circle that is too small.",
        },
        {
          title: "Area left in square centimetres",
          body: "If the depth is in centimetres, either convert it to metres first or say the area is in cm². A depth of 60 cm gives an area near 2 m², which is 20 000 cm².",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpro-tir-uses",
      name: "Uses of total internal reflection",
      intuition:
        "Total internal reflection sends back all the light, while even a good mirror loses a little at each reflection. So wherever light must be bent or carried without loss, total internal reflection is used: in prisms that turn light through 90° or 180°, in the optical fibre, and in the sparkle of a diamond.",
      definition:
        "- **Optical fibre (diagram described):** a long thin glass or quartz fibre, a **core** of higher refractive index inside a **cladding** of lower refractive index. Light enters one end at a suitable angle, strikes the core-cladding boundary at more than the critical angle, and is totally reflected again and again, zig-zagging along the fibre even when it bends, with no appreciable loss.\n" +
        "- **Uses of optical fibres:** carrying audio and video signals over long distances; as a light pipe for viewing internal organs such as the oesophagus, stomach and intestines; decorative lamps.\n" +
        "- **Totally reflecting prism:** a right-angled isosceles (45°) prism. A ray entering one short face normally meets the long face at 45°; if the critical angle of the glass is less than 45° (true for crown and dense flint glass) it is totally reflected. Such prisms turn light through 90° or 180°, or invert an image without changing its size.",
      table: {
        columns: ["Where", "How total internal reflection is used"],
        rows: [
          {
            cells: ["Optical fibre", "Light is totally reflected at the core-cladding boundary again and again, so it travels along the fibre, even round bends, with little loss"],
            pyqExampleId: "85c82d5c-92de-4bf7-bac7-0519e747416b",
            noteAmber: "Board 2022 asked you to explain the optical fibre with a diagram and give two uses.",
          },
          { cells: ["Totally reflecting prism", "Light meets the long face at 45°, more than the critical angle of the glass, and turns through 90° or 180°"] },
          { cells: ["Diamond", "Critical angle about 24.4°, so light inside is reflected many times before it escapes, and the stone sparkles"] },
          {
            cells: ["Twinkling of stars", "Not total internal reflection: it is caused by refraction in the layers of the atmosphere"],
            pyqExampleId: "79f60bbc-4b08-44df-bda2-a4bbe08b3299",
            noteAmber: "Board 2026 asked which of four effects does not use total internal reflection.",
          },
        ],
      },
      pyqExampleId: "85c82d5c-92de-4bf7-bac7-0519e747416b",
      selfCheckExample: {
        prompt: "The core of an optical fibre has refractive index 1.5 and its cladding 1.4. Find the critical angle at the core-cladding boundary.",
        steps: ["\\(\\sin i_c = \\dfrac{1.4}{1.5} = 0.933\\).", "\\(i_c = 69.0^\\circ\\)."],
        answer: "About 69°",
      },
      practiceSet: [
        { prompt: "In an optical fibre, which has the higher refractive index, the core or the cladding?", answer: "The core" },
        { prompt: "Why must the critical angle of the glass of a totally reflecting prism be less than 45°?", answer: "The ray meets the long face at 45°, which must be more than the critical angle" },
        { prompt: "Give one medical use of optical fibres.", answer: "A light pipe to view internal organs such as the stomach or intestines" },
      ],
      traps: [
        {
          title: "A fibre explained as a mirror inside a tube",
          body: "There is no silvering. Light stays in the core only because the cladding has a LOWER refractive index and the angle of incidence is above the critical angle. Draw the ray zig-zagging inside the core with arrows; the labelled diagram carries marks.",
        },
        {
          title: "Two uses that are really one",
          body: "'Telephone' and 'internet' are both signal transmission. Give two different uses, such as carrying signals and viewing inside the body.",
        },
      ],
    },
  ],
};
