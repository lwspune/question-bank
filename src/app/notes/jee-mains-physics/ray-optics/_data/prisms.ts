import type { SubtopicNote } from "@/app/notes/_types";

export const PRISMS_RAY_NOTE: SubtopicNote = {
  subtopicName: "Prisms: Minimum Deviation, Grazing Emergence and Dispersion",
  title: "Prisms: Minimum Deviation, Grazing Emergence and Dispersion",
  oneLineDefinition:
    "Inside a prism r₁ + r₂ = A and the deviation is i + e − A; at minimum deviation the ray passes symmetrically and μ = sin((A + δm)/2)/sin(A/2), while a thin prism deviates by (μ − 1)A.",
  whyItMatters:
    "Twenty-nine PYQs, twenty-three of them multiple choice, and nine from 2026. Fifteen are about minimum deviation: the formula, what is true at the minimum, the shape of the deviation graph, and prisms whose index is given as a speed or as a trig function of the prism angle. Five have the ray graze out of the second face, sometimes a coated one. Nine are thin prisms and colour: deviation without dispersion, dispersion without deviation, and the colours of a prism, a rainbow and a lens.",
  concepts: [
    // C1 — minimum deviation
    {
      kind: "formula" as const,
      slug: "jpray-min-deviation",
      name: "Prism and minimum deviation",
      intuition:
        "A ray through a prism bends at both faces. The two refraction angles inside always add up to the prism angle A, and the total deviation is i + e − A. As i grows, the deviation first falls and then rises. At the bottom of that curve the ray passes symmetrically: i = e, and inside an isosceles prism it runs parallel to the base. That symmetric ray gives the formula that measures μ.",
      definition:
        "- \\(r_1 + r_2 = A\\), \\(\\delta = i + e - A\\).\n" +
        "- At minimum deviation: \\(i = e\\), \\(r_1 = r_2 = A/2\\), \\(\\delta_m = 2i - A\\), so \\(i = \\dfrac{A + \\delta_m}{2}\\).\n" +
        "- \\(\\mu = \\dfrac{\\sin\\frac{A + \\delta_m}{2}}{\\sin\\frac{A}{2}}\\). A liquid in a hollow prism is the prism: use the liquid's μ.\n" +
        "- Deviation against i: one minimum. Every larger deviation is reached at two values of i, which swap roles as i and e.\n" +
        "- μ given as a speed: \\(\\mu = c/v\\). μ given as a trig function of A: write \\(\\sin\\frac{A + \\delta_m}{2} = \\mu\\sin\\frac{A}{2}\\) and compare the two sides.\n" +
        "- For the same A, a larger μ gives a larger \\(\\delta_m\\).",
      formula: {
        label: "Prism and minimum deviation",
        latex: "r_1 + r_2 = A, \\qquad \\delta = i + e - A, \\qquad \\mu = \\frac{\\sin\\frac{A + \\delta_m}{2}}{\\sin\\frac{A}{2}}",
      },
      authoredExample: {
        prompt:
          "A prism of angle \\(60^{\\circ}\\) gives a minimum deviation of \\(40^{\\circ}\\). Find the angle of incidence at minimum deviation, the angle of refraction inside, and the refractive index. (\\(\\sin 50^{\\circ} = 0.766\\))",
        steps: [
          "At minimum deviation \\(r_1 = r_2 = A/2 = 30^{\\circ}\\).",
          "\\(\\delta_m = 2i - A\\): \\(40^{\\circ} = 2i - 60^{\\circ}\\), so \\(i = 50^{\\circ}\\).",
          "\\(\\mu = \\dfrac{\\sin 50^{\\circ}}{\\sin 30^{\\circ}} = \\dfrac{0.766}{0.5} \\approx 1.53\\).",
        ],
        answer: "\\(i = 50^{\\circ}\\), \\(r = 30^{\\circ}\\), \\(\\mu \\approx 1.53\\).",
      },
      selfCheckExample: {
        prompt:
          "An equilateral hollow prism is filled with a liquid of refractive index 1.2. Find the angle of minimum deviation. (\\(\\sin^{-1} 0.6 = 36.9^{\\circ}\\))",
        steps: [
          "\\(\\sin\\dfrac{A + \\delta_m}{2} = \\mu\\sin\\dfrac{A}{2} = 1.2 \\times 0.5 = 0.6\\).",
          "\\(\\dfrac{60^{\\circ} + \\delta_m}{2} = 36.9^{\\circ}\\), so \\(\\delta_m \\approx 13.7^{\\circ}\\).",
        ],
        answer: "About \\(13.7^{\\circ}\\)",
      },
      practiceSet: [
        { prompt: "A prism of angle \\(60^{\\circ}\\) gives a minimum deviation of \\(36^{\\circ}\\). Angle of incidence at minimum deviation?", answer: "\\(48^{\\circ}\\)" },
        { prompt: "At minimum deviation in a prism of angle \\(50^{\\circ}\\), what is the angle of refraction at the first face?", answer: "\\(25^{\\circ}\\)" },
        { prompt: "A prism of angle \\(40^{\\circ}\\) deviates a ray by \\(30^{\\circ}\\) when the angle of incidence is \\(45^{\\circ}\\). Angle of emergence?", answer: "\\(25^{\\circ}\\)" },
        { prompt: "Light travels at \\(2 \\times 10^{8}\\) m/s inside an equilateral prism. Refractive index of the prism? (\\(c = 3 \\times 10^{8}\\) m/s)", answer: "1.5" },
      ],
      pyqExampleId: "c24bb1ab-e61a-43f7-831a-b616093fdf83", // 2026: speed 2.12 × 10⁸ m/s in an equilateral prism, δm = 30°
      traps: [
        {
          title: "Use A/2 inside, not A",
          body: "At minimum deviation each internal angle is A/2. Putting A into Snell's law at the first face doubles the refraction angle.",
        },
        {
          title: "Through a prism the deviation is i + e − A",
          body: "i − r is the bending at one face only. A prism bends the ray at both faces, and i + e − A adds the two.",
        },
        {
          title: "Two angles of incidence give the same deviation",
          body: "Except at the minimum, each deviation occurs for a pair of values of i, the ray and its reverse. The graph of deviation against i is a curve with one minimum, not a straight line.",
        },
      ],
    },

    // C2 — grazing emergence
    {
      kind: "formula" as const,
      slug: "jpray-prism-grazing",
      name: "Grazing emergence from a prism",
      intuition:
        "Make a ray meet the second face more and more steeply, and at some point it can no longer get out: it would need to emerge at 90°. That grazing ray marks the limit. At the second face the angle inside is then the critical angle, and r₁ = A − r₂ fixes the first face. Coat the second face and the critical angle there changes.",
      definition:
        "- Grazing emergence (\\(e = 90^{\\circ}\\)): \\(\\sin r_2 = 1/\\mu\\), so \\(r_2 = C\\).\n" +
        "- Then \\(r_1 = A - C\\) and \\(\\sin i = \\mu\\sin(A - C)\\). This is the smallest i for which light gets out of the second face.\n" +
        "- Grazing incidence (\\(i = 90^{\\circ}\\)) at the first face gives \\(r_1 = C\\). If \\(A > 2C\\), no ray gets out of the second face at all.\n" +
        "- Exit face coated with a film of index \\(n_2\\): the critical angle there is \\(\\sin C' = n_2/\\mu\\). Total reflection at that face needs \\(r_2 > C'\\), that is \\(r_1 < A - C'\\).\n" +
        "- A ray parallel to the base meets the first face at an angle set by the prism's shape. Find i from the geometry first.",
      formula: {
        label: "Grazing emergence",
        latex: "\\sin r_2 = \\frac{1}{\\mu}\\ (e = 90^{\\circ}), \\qquad r_1 = A - r_2, \\qquad \\sin i = \\mu\\sin r_1",
      },
      authoredExample: {
        prompt:
          "A prism of angle \\(60^{\\circ}\\) is made of glass of refractive index 1.5. Find the smallest angle of incidence for which light can come out of the second face. (\\(\\sin^{-1}(2/3) = 41.8^{\\circ}\\), \\(\\sin 18.2^{\\circ} = 0.312\\))",
        steps: [
          "The limiting ray grazes out of the second face: \\(\\sin r_2 = \\dfrac{1}{1.5} = \\dfrac{2}{3}\\), so \\(r_2 = 41.8^{\\circ}\\).",
          "\\(r_1 = A - r_2 = 60^{\\circ} - 41.8^{\\circ} = 18.2^{\\circ}\\).",
          "\\(\\sin i = 1.5 \\times 0.312 = 0.468\\), so \\(i \\approx 27.9^{\\circ}\\).",
          "For a smaller i, \\(r_1\\) is smaller and \\(r_2\\) is larger than the critical angle: the ray is totally reflected at the second face.",
        ],
        answer: "About \\(28^{\\circ}\\)",
      },
      selfCheckExample: {
        prompt:
          "The exit face of a prism of angle \\(60^{\\circ}\\) and refractive index 1.6 is coated with a film of refractive index 1.2. When the prism is set for minimum deviation, is the ray totally reflected at the coated face?",
        steps: [
          "At minimum deviation \\(r_2 = A/2 = 30^{\\circ}\\).",
          "At the coated face \\(\\sin C' = \\dfrac{1.2}{1.6} = 0.75\\), so \\(C' \\approx 48.6^{\\circ}\\).",
          "\\(30^{\\circ} < 48.6^{\\circ}\\), so the ray gets out.",
        ],
        answer: "No: it meets the face at 30°, below the 48.6° critical angle.",
      },
      practiceSet: [
        { prompt: "A prism of angle \\(90^{\\circ}\\) is made of glass of refractive index 1.6. Can any ray come out of the second face?", answer: "No: A = 90° is more than twice the critical angle of 38.7°" },
        { prompt: "The critical angle of a prism's glass is \\(40^{\\circ}\\) and its angle is \\(65^{\\circ}\\). For a ray that grazes out of the second face, angle of refraction at the first face?", answer: "\\(25^{\\circ}\\)" },
        { prompt: "A ray grazes out of the second face of a prism of refractive index 2. What angle does it make with the normal inside, at that face?", answer: "\\(30^{\\circ}\\)" },
        { prompt: "Inside a prism of refractive index 1.5, a ray meets the second face at \\(45^{\\circ}\\) to the normal. Does it emerge into air?", answer: "No: the critical angle is 41.8°, so it is totally reflected" },
      ],
      pyqExampleId: "49a91cbd-7d4f-400e-b0cc-1b3959273225", // 2026: equilateral prism of index √2, grazing emergence, r₁ ≈ 15°
      traps: [
        {
          title: "Grazing emergence fixes r₂, not i",
          body: "e = 90° sets the angle inside the second face to the critical angle. The first-face angles then follow from r₁ = A − r₂ and Snell's law.",
        },
        {
          title: "A coating changes the critical angle at that face only",
          body: "A film of index n₂ on the exit face makes sin C' = n₂/μ there. The entry face still has the air critical angle.",
        },
      ],
    },

    // C3 — thin prisms and dispersion
    {
      kind: "formula" as const,
      slug: "jpray-thin-prism-dispersion",
      name: "Thin prisms and dispersion",
      intuition:
        "For a prism of small angle the deviation hardly depends on the angle of incidence: δ = (μ − 1)A. Because μ depends on colour, so does δ: violet is bent most, red least. Two thin prisms placed opposite ways can cancel the mean deviation and keep the colours spread, or cancel the spread and keep a deviation.",
      definition:
        "- Thin prism, small angle of incidence: \\(\\delta = (\\mu - 1)A\\).\n" +
        "- Angular dispersion \\(\\delta_v - \\delta_r = (\\mu_v - \\mu_r)A\\); dispersive power \\(\\omega = \\dfrac{\\mu_v - \\mu_r}{\\mu_y - 1}\\), with \\(\\mu_y\\) the mean (yellow) index.\n" +
        "- Dispersion without deviation, prisms placed opposite ways: \\((\\mu_1 - 1)A_1 = (\\mu_2 - 1)A_2\\), with the mean indices.\n" +
        "- Deviation without dispersion: \\((\\mu_{v1} - \\mu_{r1})A_1 = (\\mu_{v2} - \\mu_{r2})A_2\\); the net deviation is then \\((\\mu_1 - 1)A_1 - (\\mu_2 - 1)A_2\\).\n" +
        "- Two glasses in contact do not bend a colour at their common face when their indices for that colour are equal.\n" +
        "- Red has the longest wavelength and the smallest μ, so it is deviated least. A lens has a slightly different focus for each colour: **chromatic aberration**.\n" +
        "- Primary rainbow: one internal reflection in each drop, red on the outside (top), violet inside. The secondary bow has two reflections, reversed colours, and is fainter.",
      formula: {
        label: "Thin prism and dispersion",
        latex: "\\delta = (\\mu - 1)A, \\qquad (\\mu_1 - 1)A_1 = (\\mu_2 - 1)A_2, \\qquad \\omega = \\frac{\\mu_v - \\mu_r}{\\mu_y - 1}",
      },
      authoredExample: {
        prompt:
          "A thin prism of angle \\(8^{\\circ}\\) and mean refractive index 1.5 is combined with a thin prism of mean refractive index 1.8, placed the opposite way, to give dispersion without deviation. Find the deviation produced by the first prism alone and the angle of the second.",
        steps: [
          "First prism: \\(\\delta_1 = (1.5 - 1) \\times 8^{\\circ} = 4^{\\circ}\\).",
          "No net deviation: \\((1.8 - 1)A_2 = 4^{\\circ}\\), so \\(A_2 = 5^{\\circ}\\).",
          "The colours are still spread, because the two glasses spread them by different amounts.",
        ],
        answer: "\\(4^{\\circ}\\); \\(5^{\\circ}\\)",
      },
      selfCheckExample: {
        prompt:
          "A thin prism of angle \\(5^{\\circ}\\) has refractive index 1.64 for violet and 1.60 for red, and a mean index of 1.62. Find the angular dispersion and the dispersive power.",
        steps: [
          "\\(\\delta_v - \\delta_r = (1.64 - 1.60) \\times 5^{\\circ} = 0.2^{\\circ}\\).",
          "\\(\\omega = \\dfrac{0.04}{1.62 - 1} = \\dfrac{0.04}{0.62} \\approx 0.065\\).",
        ],
        answer: "\\(0.2^{\\circ}\\); about 0.065",
      },
      practiceSet: [
        { prompt: "Deviation produced by a thin prism of angle \\(4^{\\circ}\\) and refractive index 1.6?", answer: "\\(2.4^{\\circ}\\)" },
        { prompt: "Which colour of white light is deviated least by a glass prism?", answer: "Red" },
        { prompt: "How many internal reflections inside each drop form the primary rainbow?", answer: "One" },
        { prompt: "Two thin prisms placed opposite ways give no net deviation. One has angle \\(3^{\\circ}\\) and refractive index 1.6; the other has refractive index 1.9. Angle of the second?", answer: "\\(2^{\\circ}\\)" },
      ],
      pyqExampleId: "f9958f52-3c85-4c24-bedf-526b66723956", // 2025: 4° prism of 1.54 with a 1.72 prism, dispersion without deviation, 3°
      traps: [
        {
          title: "The prisms face opposite ways",
          body: "Dispersion without deviation needs the two prisms placed opposite ways. The condition equates the sizes of their mean deviations, (μ₁ − 1)A₁ = (μ₂ − 1)A₂.",
        },
        {
          title: "δ = (μ − 1)A is for thin prisms only",
          body: "It holds for small prism angles and small angles of incidence. For a 60° prism use the minimum-deviation formula instead.",
        },
        {
          title: "Red bends least",
          body: "Red has the longest wavelength and the smallest refractive index in glass. It is deviated least, focuses farthest from a lens, and sits on top of the primary rainbow.",
        },
      ],
    },
  ],
};
