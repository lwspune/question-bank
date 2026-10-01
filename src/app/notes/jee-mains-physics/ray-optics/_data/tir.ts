import type { SubtopicNote } from "@/app/notes/_types";

export const TIR_RAY_NOTE: SubtopicNote = {
  subtopicName: "Critical Angle and Total Internal Reflection",
  title: "Critical Angle and Total Internal Reflection",
  oneLineDefinition:
    "Light going from a denser to a rarer medium is totally reflected when its angle of incidence exceeds the critical angle C, where sin C = n(rarer)/n(denser).",
  whyItMatters:
    "Thirteen PYQs, eleven of them multiple choice, and two from 2026. Seven find the critical angle from refractive indices, from the speeds of light in two media or from a dielectric constant, and the options often write it as a tan or a cos instead of a sin. Six use it in a shape: the bright circle above a lamp under water, a coin seen over the rim of a bowl, a ray trapped in a block, or a prism face that is painted, dipped in a liquid or reached by three colours at once.",
  concepts: [
    // C1 — the critical angle
    {
      kind: "formula" as const,
      slug: "jpray-critical-angle",
      name: "Critical angle",
      intuition:
        "Going from a denser to a rarer medium, a ray bends away from the normal. As the angle of incidence grows, the refracted ray swings towards the surface. At the critical angle it grazes along the surface; beyond it no light gets out and all of it is reflected. Light going from rarer to denser always gets through, so total internal reflection never happens that way.",
      definition:
        "- Two conditions: the light is in the denser medium, and \\(i > C\\).\n" +
        "- \\(\\sin C = \\dfrac{n_{\\text{rarer}}}{n_{\\text{denser}}} = \\dfrac{v_{\\text{denser}}}{v_{\\text{rarer}}}\\). Into air: \\(\\sin C = 1/\\mu\\).\n" +
        "- The medium in which light is slower is the denser one, since \\(n = c/v\\).\n" +
        "- From \\(\\sin C = p/q\\), draw a right triangle: \\(\\cos C = \\dfrac{\\sqrt{q^{2} - p^{2}}}{q}\\), \\(\\tan C = \\dfrac{p}{\\sqrt{q^{2} - p^{2}}}\\). Options often give C as a tan or a cos.\n" +
        "- For an electromagnetic wave in a medium, \\(n = \\sqrt{\\mu_r\\varepsilon_r}\\).\n" +
        "- At \\(i = C\\) the ray grazes the surface; total reflection needs \\(i\\) strictly larger.",
      formula: {
        label: "Critical angle",
        latex: "\\sin C = \\frac{n_{\\text{rarer}}}{n_{\\text{denser}}} = \\frac{v_{\\text{denser}}}{v_{\\text{rarer}}}, \\qquad n = \\sqrt{\\mu_r\\varepsilon_r}",
      },
      authoredExample: {
        prompt:
          "Light travels at \\(2.25 \\times 10^{8}\\) m/s in water and at \\(1.8 \\times 10^{8}\\) m/s in a plastic. In which medium must the light start for total internal reflection at their boundary? Write the critical angle as a sin, a cos and a tan.",
        steps: [
          "Light is slower in the plastic, so the plastic is the denser medium: the light must start there.",
          "\\(\\sin C = \\dfrac{v_{\\text{denser}}}{v_{\\text{rarer}}} = \\dfrac{1.8}{2.25} = \\dfrac{4}{5}\\).",
          "A right triangle with sides 4, 3 and 5 gives \\(\\cos C = \\dfrac{3}{5}\\) and \\(\\tan C = \\dfrac{4}{3}\\).",
        ],
        answer:
          "Start in the plastic; \\(C = \\sin^{-1}(4/5) = \\cos^{-1}(3/5) = \\tan^{-1}(4/3) \\approx 53^{\\circ}\\).",
      },
      selfCheckExample: {
        prompt:
          "A non-magnetic medium (\\(\\mu_r = 1\\)) has relative permittivity 3. Find the critical angle for light going from it into air.",
        steps: [
          "\\(n = \\sqrt{\\mu_r\\varepsilon_r} = \\sqrt{3}\\).",
          "\\(\\sin C = \\dfrac{1}{\\sqrt{3}} \\approx 0.577\\), so \\(C \\approx 35^{\\circ}\\).",
        ],
        answer: "\\(C = \\sin^{-1}(1/\\sqrt{3}) \\approx 35^{\\circ}\\)",
      },
      practiceSet: [
        { prompt: "Critical angle for light going from glass of refractive index 1.5 into air?", answer: "\\(\\sin^{-1}(2/3) \\approx 41.8^{\\circ}\\)" },
        { prompt: "Water (\\(\\mu = 4/3\\)) meets an oil (\\(\\mu = 1.6\\)). Critical angle at the boundary, and in which medium must the light start?", answer: "\\(\\sin^{-1}(5/6)\\); the light must start in the oil" },
        { prompt: "The critical angle from a medium into air is \\(30^{\\circ}\\). Refractive index of the medium?", answer: "2" },
        { prompt: "The critical angle C satisfies \\(\\sin C = 5/13\\). Write C as an inverse tangent.", answer: "\\(\\tan^{-1}(5/12)\\)" },
      ],
      pyqExampleId: "c0b500dc-f4bd-45bb-b167-116a28dfd6d8", // 2022: speeds 1.5 and 2.0 × 10⁸ m/s, C = tan⁻¹(3/√7)
      traps: [
        {
          title: "No total reflection from rarer to denser",
          body: "Light entering a denser medium bends towards the normal and always gets through. Total internal reflection needs the light to start in the denser medium.",
        },
        {
          title: "The slower medium is the denser one",
          body: "Given speeds, the medium where light is slower has the larger refractive index. The critical angle has the slower speed on top: sin C = v(slow)/v(fast).",
        },
        {
          title: "At i = C the light is not yet trapped",
          body: "At exactly the critical angle the ray grazes along the surface. Total internal reflection needs an angle of incidence greater than C, so the condition is a strict inequality.",
        },
      ],
    },

    // C2 — total internal reflection in a shape
    {
      kind: "formula" as const,
      slug: "jpray-tir-geometry",
      name: "Total internal reflection in tanks, blocks and prisms",
      intuition:
        "A critical-angle question with a shape is solved in two steps. First find, from the geometry, the angle at which the ray meets the surface in question. Then compare it with the critical angle for the two media on either side of that surface. A coating or a liquid outside a face changes the critical angle at that face.",
      definition:
        "- A lamp at depth h under a liquid of index μ: light escapes only through a circle of radius \\(r = h\\tan C = \\dfrac{h}{\\sqrt{\\mu^{2} - 1}}\\). Rays meeting the surface farther out are reflected back.\n" +
        "- A ray entering one face of a rectangular block at angle θ meets the adjacent face at \\(90^{\\circ} - r\\), where \\(\\sin\\theta = \\mu\\sin r\\). Total reflection there needs \\(\\sin(90^{\\circ} - r) = \\cos r > \\sin C\\).\n" +
        "- A face coated with, or dipped in, a medium of index \\(n_2 < n\\): \\(\\sin C = n_2/n\\). A larger \\(n_2\\) makes total reflection harder, so the boundary value of \\(n_2\\) is the largest that still allows it.\n" +
        "- A ray entering a prism face normally goes straight on and meets the next face at an angle set by the prism's shape: \\(60^{\\circ}\\) in an equilateral prism, \\(45^{\\circ}\\) on the long face of a right-angled isosceles prism.\n" +
        "- Different colours have different μ and so different critical angles: violet, with the largest μ, is the first to be trapped; red is the last.",
      formula: {
        label: "Circle of light and a coated face",
        latex: "r = h\\tan C = \\frac{h}{\\sqrt{\\mu^{2} - 1}}, \\qquad \\sin C = \\frac{n_2}{n}\\ (\\text{coated face})",
      },
      authoredExample: {
        prompt:
          "A small lamp lies 3 m deep in a liquid of refractive index 1.25. What is the area of the liquid surface through which its light escapes?",
        steps: [
          "\\(\\sin C = \\dfrac{1}{1.25} = \\dfrac{4}{5}\\), so \\(\\tan C = \\dfrac{4}{3}\\).",
          "The edge of the bright circle is where a ray meets the surface at exactly C. Rays meeting it farther out are reflected back.",
          "\\(r = h\\tan C = 3 \\times \\dfrac{4}{3} = 4\\) m; area \\(\\pi r^{2} = 16\\pi \\approx 50\\ \\text{m}^{2}\\).",
        ],
        answer: "\\(16\\pi \\approx 50\\ \\text{m}^{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "A ray enters a short face of a right-angled isosceles glass prism (\\(n = 1.8\\)) normally and meets the long face. The long face is in contact with a liquid of index \\(n_2\\). Find the largest \\(n_2\\) for which the ray is totally reflected.",
        steps: [
          "Normal entry: no bending, so the ray meets the long face at \\(45^{\\circ}\\) to its normal.",
          "Total reflection needs \\(45^{\\circ} > C\\), that is \\(\\sin C = \\dfrac{n_2}{1.8} < \\sin 45^{\\circ}\\).",
          "\\(n_2 < \\dfrac{1.8}{\\sqrt{2}} \\approx 1.27\\).",
        ],
        answer: "About 1.27; any liquid of smaller index keeps the reflection total.",
      },
      practiceSet: [
        { prompt: "A fish 4 m below the surface of water (\\(\\mu = 4/3\\)) looks up. Radius of the circle through which it sees the sky?", answer: "\\(12/\\sqrt{7} \\approx 4.5\\) m" },
        { prompt: "The bright circle above a lamp in a liquid has a radius equal to the lamp's depth. Refractive index of the liquid?", answer: "\\(\\sqrt{2}\\)" },
        { prompt: "A glass face (\\(n = 1.5\\)) is in contact with water (\\(n = 1.33\\)). Critical angle at that face?", answer: "\\(\\sin^{-1}(0.89) \\approx 62^{\\circ}\\)" },
        { prompt: "A ray inside glass of refractive index 1.6 meets the glass-air surface at \\(40^{\\circ}\\). Does it get out?", answer: "No: C ≈ 38.7°, so it is totally reflected" },
      ],
      pyqExampleId: "1d305c8c-0306-4065-a8dd-afc4c5c5e7ae", // 2022: bulb √7 m deep in water, area of escape 9π m²
      traps: [
        {
          title: "The circle's radius uses tan C",
          body: "The edge ray leaves the lamp at C to the vertical, so it travels h tan C sideways before reaching the surface. Using sin C gives a circle that is too small.",
        },
        {
          title: "A coating raises the critical angle",
          body: "With a film of index n₂ on a face, sin C = n₂/n, which is larger than 1/n. A ray that was totally reflected in air may escape through the coated face.",
        },
        {
          title: "A 'minimum index for total reflection' may be a maximum",
          body: "Total reflection at a coated face gets harder as n₂ rises. The boundary value is the largest n₂ that still works; check the direction of the inequality before choosing.",
        },
      ],
    },
  ],
};
