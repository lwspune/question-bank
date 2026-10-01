import type { SubtopicNote } from "@/app/notes/_types";

export const PLANE_REFRACTION_RAY_NOTE: SubtopicNote = {
  subtopicName: "Refraction at Plane Surfaces and Apparent Depth",
  title: "Refraction at Plane Surfaces and Apparent Depth",
  oneLineDefinition:
    "At a flat boundary n₁ sin i = n₂ sin r; a parallel slab shifts a ray sideways without turning it, and an object under a liquid of index μ looks only d/μ deep.",
  whyItMatters:
    "Twenty-one PYQs, eleven of them multiple choice and ten asking for a number, and one from 2026. Twelve apply Snell's law at one flat surface or through a parallel slab: an angle given from the surface instead of the normal, a ray along a vector, the sideways shift through a slab, the time spent in a slab, a shadow under water. Nine are about apparent depth: layered liquids, a bubble seen from two sides, a microscope refocused, a bird seen by a fish.",
  concepts: [
    // C1 — Snell's law and slabs
    {
      kind: "formula" as const,
      slug: "jpray-snell-slab",
      name: "Snell's law and the parallel slab",
      intuition:
        "Light slows down in an optically denser medium, n = c/v, and bends towards the normal. Snell's law links the angles measured from the normal on the two sides. A parallel-sided slab bends the ray in and bends it back out by the same amount, so the ray leaves parallel to its original direction, shifted sideways.",
      definition:
        "- \\(n = c/v\\). Snell's law: \\(n_1\\sin i = n_2\\sin r\\), with both angles measured from the normal. Deviation at one surface: \\(i - r\\).\n" +
        "- An angle given 'with the surface' is \\(90^{\\circ}\\) minus the angle of incidence.\n" +
        "- A ray along a vector \\(\\vec A\\), boundary normal \\(\\hat n\\): \\(\\cos i = \\dfrac{|\\vec A\\cdot\\hat n|}{|\\vec A|}\\). Equivalently, \\(\\sin i\\) is the size of the part of \\(\\vec A\\) along the surface over \\(|\\vec A|\\).\n" +
        "- Parallel slab of thickness t: the emergent ray is parallel to the incident one, with lateral shift \\(d = \\dfrac{t\\sin(i - r)}{\\cos r}\\).\n" +
        "- Path inside the slab \\(t/\\cos r\\); time \\(\\dfrac{n t}{c\\cos r}\\), which is \\(nt/c\\) at normal incidence.\n" +
        "- Refractive index measures optical density, how much light slows down. It is not proportional to mass density.",
      formula: {
        label: "Snell's law and lateral shift",
        latex: "n_1\\sin i = n_2\\sin r, \\qquad n = \\frac{c}{v}, \\qquad d = \\frac{t\\sin(i - r)}{\\cos r}",
      },
      authoredExample: {
        prompt:
          "A ray in air meets a glass slab of refractive index \\(\\sqrt{3}\\) and thickness \\(3\\sqrt{3}\\) cm at an angle of incidence of \\(60^{\\circ}\\). Find the angle of refraction and the lateral shift of the emergent ray.",
        steps: [
          "\\(\\sin r = \\dfrac{\\sin 60^{\\circ}}{\\sqrt{3}} = \\dfrac{\\sqrt{3}/2}{\\sqrt{3}} = \\dfrac{1}{2}\\), so \\(r = 30^{\\circ}\\).",
          "\\(d = \\dfrac{t\\sin(i - r)}{\\cos r} = \\dfrac{3\\sqrt{3} \\times \\sin 30^{\\circ}}{\\cos 30^{\\circ}} = \\dfrac{3\\sqrt{3} \\times 1/2}{\\sqrt{3}/2} = 3\\) cm.",
          "The ray leaves parallel to the incident ray, 3 cm to one side of it.",
        ],
        answer: "\\(r = 30^{\\circ}\\); lateral shift 3 cm.",
      },
      selfCheckExample: {
        prompt:
          "A ray in air travels along \\(\\vec A = 3\\hat i + 4\\hat j - 5\\hat k\\) and strikes the plane z = 0, below which is glass of refractive index \\(\\sqrt{2}\\). Find the angles of incidence and refraction.",
        steps: [
          "The normal is the z-axis. \\(|\\vec A| = \\sqrt{9 + 16 + 25} = 5\\sqrt{2}\\).",
          "\\(\\cos i = \\dfrac{5}{5\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}}\\), so \\(i = 45^{\\circ}\\).",
          "\\(\\sin r = \\dfrac{\\sin 45^{\\circ}}{\\sqrt{2}} = \\dfrac{1}{2}\\), so \\(r = 30^{\\circ}\\).",
        ],
        answer: "\\(i = 45^{\\circ}\\), \\(r = 30^{\\circ}\\).",
      },
      practiceSet: [
        { prompt: "Light makes \\(60^{\\circ}\\) with the surface of water as it enters. What is the angle of incidence?", answer: "\\(30^{\\circ}\\)" },
        { prompt: "Speed of light in glass of refractive index 1.5? (\\(c = 3 \\times 10^{8}\\) m/s)", answer: "\\(2 \\times 10^{8}\\) m/s" },
        { prompt: "A ray in air enters a medium at an angle of incidence of \\(60^{\\circ}\\) and is deviated by \\(15^{\\circ}\\). Refractive index of the medium?", answer: "\\(\\sqrt{3/2} \\approx 1.22\\)" },
        { prompt: "Light crosses a 3 cm glass plate of refractive index 1.5 at normal incidence. How long does it take? (\\(c = 3 \\times 10^{8}\\) m/s)", answer: "\\(1.5 \\times 10^{-10}\\) s" },
      ],
      pyqExampleId: "aabd78a3-c824-4494-9ebb-39e384ae0a0a", // 2022: ray along a vector from √2 into √3 medium, i − r = 15°
      traps: [
        {
          title: "Angles are measured from the normal",
          body: "A ray 'at 30° with the surface' has an angle of incidence of 60°. Putting 30° into Snell's law gives a wrong index, and that wrong value is usually one of the options.",
        },
        {
          title: "A slab shifts a ray but does not turn it",
          body: "The emergent ray is parallel to the incident one; only a sideways shift remains. The bending i − r at the first face is undone at the second.",
        },
        {
          title: "Refractive index is not mass density",
          body: "Refractive index measures how much light slows down, n = c/v. A medium with a larger mass density does not, for that reason, have a proportionally larger refractive index.",
        },
      ],
    },

    // C2 — apparent depth
    {
      kind: "formula" as const,
      slug: "jpray-apparent-depth",
      name: "Apparent depth and the normal shift",
      intuition:
        "Seen from straight above, an object under a liquid looks raised. Rays leaving the surface bend away from the normal, and the eye traces them back to a point higher up. For near-normal viewing the depth shrinks by the factor μ. Each layer of a stack shrinks by its own μ, and the apparent depths add.",
      definition:
        "- Viewed from a rarer medium, near the normal: apparent depth \\(= \\dfrac{d}{\\mu}\\); the object appears raised by \\(d\\left(1 - \\dfrac{1}{\\mu}\\right)\\).\n" +
        "- Layers: \\(d_{\\text{app}} = \\sum \\dfrac{d_i}{\\mu_i}\\); total shift \\(= \\sum d_i\\left(1 - \\dfrac{1}{\\mu_i}\\right)\\).\n" +
        "- Looking from the denser medium at an object in the rarer one (a fish looking up at a bird): the object appears \\(\\mu\\) times farther, \\(d_{\\text{app}} = \\mu d\\).\n" +
        "- Moving objects: apparent distances scale the same way, so apparent speeds do too.\n" +
        "- A bubble in a block seen from opposite faces: \\(x/\\mu\\) from one and \\((t - x)/\\mu\\) from the other, so the two apparent distances add to \\(t/\\mu\\).\n" +
        "- A microscope focused on the bottom of a vessel must be raised by the shift \\(d(1 - 1/\\mu)\\) when liquid is poured in.\n" +
        "- A glass plate of thickness t placed in a converging beam moves the image away from the lens by \\(t\\left(1 - \\dfrac{1}{\\mu}\\right)\\).",
      formula: {
        label: "Apparent depth",
        latex: "d_{\\text{app}} = \\frac{d}{\\mu}, \\qquad \\text{shift} = d\\left(1 - \\frac{1}{\\mu}\\right), \\qquad d_{\\text{app}} = \\sum \\frac{d_i}{\\mu_i}",
      },
      authoredExample: {
        prompt:
          "A glass block 6 cm thick (\\(\\mu = 1.5\\)) lies on the bottom of a tank, under 8 cm of water (\\(\\mu = 4/3\\)). A mark on the underside of the block is viewed from straight above. Find its apparent depth below the water surface and how much it appears raised.",
        steps: [
          "Water layer: \\(\\dfrac{8}{4/3} = 6\\) cm. Glass layer: \\(\\dfrac{6}{1.5} = 4\\) cm.",
          "Apparent depth \\(= 6 + 4 = 10\\) cm.",
          "Real depth \\(= 8 + 6 = 14\\) cm, so the mark appears raised by \\(14 - 10 = 4\\) cm.",
        ],
        answer: "Apparent depth 10 cm; raised by 4 cm.",
      },
      selfCheckExample: {
        prompt:
          "A microscope is focused on a scratch at the bottom of an empty beaker. A liquid of refractive index 1.25 is poured in to a depth of 20 cm. By how much must the microscope be raised to focus on the scratch again?",
        steps: [
          "The scratch appears raised by \\(d\\left(1 - \\dfrac{1}{\\mu}\\right)\\).",
          "\\(20\\left(1 - \\dfrac{1}{1.25}\\right) = 20 \\times 0.2 = 4\\) cm.",
        ],
        answer: "4 cm",
      },
      practiceSet: [
        { prompt: "A coin lies under 12 cm of water of refractive index 4/3. What is its apparent depth seen from above?", answer: "9 cm" },
        { prompt: "A bird is 6 m above water of refractive index 4/3. How high does it appear to a fish just below the surface?", answer: "8 m" },
        { prompt: "A glass plate 1.5 cm thick (\\(\\mu = 1.5\\)) is put in the converging beam behind a lens. How far does the image move?", answer: "0.5 cm, away from the lens" },
        { prompt: "A bubble in a glass cube of side 20 cm appears 6 cm deep from one face and 10 cm deep from the opposite face. Refractive index of the glass?", answer: "1.25" },
      ],
      pyqExampleId: "39e9c471-b377-4f20-a14b-a9bf35e79e3f", // 2021: tumbler 17.5 cm deep looks half full, water actually 10 cm
      traps: [
        {
          title: "The shift is not the apparent depth",
          body: "A question may give the shift d(1 − 1/μ) or the apparent depth d/μ. With μ = 4/3 they are d/4 and 3d/4. Read which one is stated before solving.",
        },
        {
          title: "Never average the indices of a stack",
          body: "For layered liquids, divide each layer's own thickness by its own μ and add the results. A single averaged μ gives the wrong apparent depth.",
        },
        {
          title: "Looking up multiplies, looking down divides",
          body: "An object in water seen from air appears at d/μ. An object in air seen from under water appears at μd, farther away than it is.",
        },
      ],
    },
  ],
};
