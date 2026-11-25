import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_WO_REFRACTION_NOTE: SubtopicNote = {
  subtopicName: "Refraction and Reflection of Plane Waves",
  title: "Refraction and Reflection of Plane Waves by Huygens' Construction",
  oneLineDefinition:
    "Huygens' construction for a plane wave refracted into a denser or a rarer medium and reflected from a plane surface, the proofs of Snell's law and the law of reflection, what happens to speed, wavelength and frequency, and the wavefronts from a lens and a mirror.",
  whyItMatters:
    "24 questions, twenty of them from board papers. The board asks you to verify Snell's law with Huygens' construction (2022, 2023, 2024, 2025, seven times in all, once for a wave entering a rarer medium), prove the law of reflection the same way (2022, 2023, 2025, 2026), find the wavelength, frequency and speed of reflected and refracted light (every year from 2022 to 2026), and draw the wavefront from a convex lens or a concave mirror (2023, 2025, 2026). The textbook adds the speed of light in glass and why violet light travels slower than red in a prism.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpwo-snell",
      name: "Refraction of a plane wave and Snell's law",
      intuition:
        "A plane wavefront meets the surface of glass at an angle, so one end of it enters the glass first. That end slows down while the other end is still moving fast in air. The slow end falls behind and the wavefront turns. How much it turns depends only on the ratio of the two speeds, and that is Snell's law.",
      definition:
        "- PP′ is the surface between medium 1 (speed \\(v_1\\)) and medium 2 (speed \\(v_2\\)). A plane wavefront AB is incident at an angle i; A is on the surface.\n" +
        "- Let \\(\\tau\\) be the time the wavefront takes to travel from B to C on the surface: \\(BC = v_1 \\tau\\).\n" +
        "- In the same time the wavelet from A spreads into medium 2. Draw a sphere of radius \\(AE = v_2 \\tau\\) about A.\n" +
        "- Draw the tangent plane CE from C to this sphere. CE is the **refracted wavefront**.\n" +
        "- In triangle ABC: \\(\\sin i = \\dfrac{BC}{AC} = \\dfrac{v_1 \\tau}{AC}\\). In triangle AEC: \\(\\sin r = \\dfrac{AE}{AC} = \\dfrac{v_2 \\tau}{AC}\\).\n" +
        "- Dividing: \\(\\dfrac{\\sin i}{\\sin r} = \\dfrac{v_1}{v_2}\\). With \\(n_1 = c/v_1\\) and \\(n_2 = c/v_2\\): \\(n_1 \\sin i = n_2 \\sin r\\), which is **Snell's law**.\n" +
        "- If the ray bends towards the normal (r < i), then \\(v_2 < v_1\\): light is slower in the denser medium. This is the opposite of what the corpuscular model predicted, and experiments agree with the wave theory.\n" +
        "- Into a rarer medium (\\(v_2 > v_1\\)) the same construction gives r > i. At the critical angle, \\(\\sin i_c = n_2/n_1\\), r becomes 90°; beyond it there is no refracted wave (total internal reflection).",
      formula: {
        label: "Snell's law from Huygens' construction",
        latex: "\\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2} = \\frac{n_2}{n_1}",
        symbols: [
          { symbol: "\\(v_1, v_2\\)", meaning: "speed of light in medium 1 and in medium 2" },
          { symbol: "\\(n_1, n_2\\)", meaning: "refractive indices of medium 1 and medium 2" },
        ],
      },
      authoredExample: {
        prompt:
          "A plane wave travelling in air at \\(3.0 \\times 10^{8}\\) m/s meets the flat surface of a glass block at an angle of incidence of 60°. In the glass it travels at \\(1.73 \\times 10^{8}\\) m/s. Find the angle of refraction and the refractive index of the glass.",
        steps: [
          "Given: \\(v_1 = 3.0 \\times 10^{8}\\) m/s, \\(v_2 = 1.73 \\times 10^{8}\\) m/s, \\(i = 60^{\\circ}\\).",
          "Formula: \\(\\dfrac{\\sin i}{\\sin r} = \\dfrac{v_1}{v_2}\\), so \\(\\sin r = \\sin i \\times \\dfrac{v_2}{v_1}\\).",
          "\\(\\sin r = 0.866 \\times \\dfrac{1.73}{3.0} = 0.50\\), so \\(r = 30^{\\circ}\\).",
          "Refractive index: \\(n = \\dfrac{c}{v_2} = \\dfrac{3.0 \\times 10^{8}}{1.73 \\times 10^{8}} = 1.73\\).",
        ],
        answer: "r = 30°, n = 1.73",
      },
      selfCheckExample: {
        prompt:
          "In Huygens' construction for refraction, the wavelet from A spreads 2 cm into the second medium while the other end of the wavefront travels 3 cm from B to C. Which medium is denser, and what is \\(n_2/n_1\\)?",
        steps: ["\\(AE = v_2 \\tau = 2\\) cm and \\(BC = v_1 \\tau = 3\\) cm, so \\(v_2 < v_1\\).", "\\(\\dfrac{n_2}{n_1} = \\dfrac{v_1}{v_2} = \\dfrac{3}{2}\\)."],
        answer: "The second medium is denser; n₂/n₁ = 1.5",
      },
      practiceSet: [
        { prompt: "Light enters a medium in which its speed is two thirds of its speed in air. For an angle of incidence of 30°, find \\(\\sin r\\).", answer: "\\(\\sin r = \\dfrac{1}{2} \\times \\dfrac{2}{3} = \\dfrac{1}{3}\\)" },
        { prompt: "In Huygens' construction for refraction, which line is the refracted wavefront?", answer: "The tangent plane CE drawn from C to the sphere of radius \\(v_2 \\tau\\) about A" },
        { prompt: "A plane wave goes from glass into air. Does it bend towards or away from the normal?", answer: "Away from the normal: r is greater than i" },
      ],
      pyqExampleId: "4d2dc4af-136c-4fea-8b23-62c7aec656d6",
      traps: [
        {
          title: "No labelled diagram",
          body: "Every 'using Huygens' principle' question gives marks for the figure. Draw the surface PP′, the normal, the incident wavefront AB, the sphere of radius \\(v_2 \\tau\\) about A, the refracted wavefront CE, and mark i and r.",
        },
        {
          title: "The wavelet in medium 2 drawn with radius v₁τ",
          body: "The wavelet from A travels in the second medium, so its radius is \\(v_2 \\tau\\). Only BC, which lies in the first medium, is \\(v_1 \\tau\\).",
        },
        {
          title: "Turning the ratio upside down",
          body: "\\(\\sin i / \\sin r = v_1 / v_2\\): the speeds go in the same order as the angles. In refractive indices the order flips: \\(\\sin i / \\sin r = n_2 / n_1\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpwo-reflection",
      name: "Reflection of a plane wave and the law of reflection",
      intuition:
        "For reflection the wavelet from A stays in the same medium, so it grows exactly as far as the other end of the wavefront travels. Two right-angled triangles then share a side and have one more side equal. They are congruent, and the two angles come out equal.",
      definition:
        "- A plane wavefront AB meets a reflecting surface MN at an angle of incidence i; A touches the surface first. The speed of the wave is v.\n" +
        "- Let \\(\\tau\\) be the time for the wavefront to travel from B to C on the surface: \\(BC = v \\tau\\).\n" +
        "- Draw a sphere of radius \\(v \\tau\\) about A. The tangent plane CE from C to this sphere is the **reflected wavefront**, so \\(AE = BC = v \\tau\\).\n" +
        "- Triangles EAC and BAC: each has a right angle (at E and at B, since a ray is perpendicular to its wavefront), \\(AE = BC\\), and AC is common. So they are congruent.\n" +
        "- Hence the angle of incidence equals the angle of reflection: \\(\\angle i = \\angle r\\). The incident ray, the reflected ray and the normal lie in one plane.",
      formula: {
        label: "Law of reflection",
        latex: "AE = BC = v\\tau \\;\\Rightarrow\\; \\angle i = \\angle r",
      },
      authoredExample: {
        prompt:
          "A plane wavefront in air meets a plane mirror at an angle of incidence of 40°. The end B of the wavefront is 1.5 m from the mirror along its ray. How long does B take to reach the mirror, what is the radius of the wavelet from A at that moment, and at what angle does the reflected wavefront leave?",
        steps: [
          "Given: \\(BC = 1.5\\) m, \\(v = 3 \\times 10^{8}\\) m/s, \\(i = 40^{\\circ}\\).",
          "Time: \\(\\tau = \\dfrac{BC}{v} = \\dfrac{1.5}{3 \\times 10^{8}} = 5 \\times 10^{-9}\\) s.",
          "Radius of the wavelet from A: \\(AE = v \\tau = 1.5\\) m, the same as BC.",
          "Triangles EAC and BAC are congruent, so \\(r = i = 40^{\\circ}\\).",
        ],
        answer: "5 ns; 1.5 m; 40°",
      },
      selfCheckExample: {
        prompt: "In Huygens' construction for reflection, why is AE equal to BC?",
        steps: ["Both are travelled in the same time \\(\\tau\\).", "Both are in the same medium, at the same speed v."],
        answer: "Both equal vτ: same time, same medium",
      },
      practiceSet: [
        { prompt: "In the proof of the law of reflection, which two triangles are shown to be congruent?", answer: "Triangles EAC and BAC: right-angled at E and B, with AE = BC and AC common" },
        { prompt: "A plane wave meets a mirror at an angle of incidence of 25°. At what angle does the reflected wavefront leave?", answer: "25°" },
        { prompt: "Does the wavelength of light change on reflection?", answer: "No: it stays in the same medium, so its speed and frequency, and so its wavelength, are unchanged" },
      ],
      pyqExampleId: "46a88afd-359a-494e-a3e9-3a7d903dbf5b",
      traps: [
        {
          title: "Comparing a triangle with itself",
          body: "Name the two triangles: EAC (with the reflected wavefront) and BAC (with the incident wavefront). Writing that a triangle is congruent to itself proves nothing.",
        },
        {
          title: "Leaving out the right angles",
          body: "The congruence needs the angles at E and at B to be 90°. Say why: a ray is perpendicular to its wavefront.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpwo-frequency",
      name: "Speed, wavelength and frequency in a new medium",
      intuition:
        "The atoms of a medium act like small oscillators. Light makes them vibrate at its own frequency, and they send out light at that same frequency. So frequency never changes at a boundary. In the slower medium each wave cycle covers less distance, so the wavelength shrinks in the same ratio as the speed.",
      definition:
        "- On reflection and refraction the **frequency does not change**: the atoms are forced to oscillate at the frequency of the incident light, and they re-emit light at that frequency.\n" +
        "- In a medium of refractive index n: speed \\(v = c/n\\) and wavelength \\(\\lambda' = \\lambda/n\\). The frequency \\(\\nu = v/\\lambda\\) stays the same.\n" +
        "- Reflected light stays in the first medium, so its wavelength, frequency and speed are all unchanged.\n" +
        "- The refractive index is the ratio of the wavelengths: \\(n = \\lambda_{\\text{air}} / \\lambda_{\\text{medium}}\\).\n" +
        "- A fall in speed does not mean a fall in energy. The energy a wave carries depends on its amplitude, not on its speed.\n" +
        "- The refractive index of glass depends on colour: it is larger for violet than for red, so violet light travels slower in a glass prism.",
      formula: {
        label: "Light entering a medium of refractive index n",
        latex: "\\nu' = \\nu, \\qquad v = \\frac{c}{n}, \\qquad \\lambda' = \\frac{\\lambda}{n}",
      },
      authoredExample: {
        prompt: "Light of wavelength 480 nm in air enters glass of refractive index 1.6. Find its frequency, its speed and its wavelength in the glass.",
        steps: [
          "Given: \\(\\lambda = 480\\) nm \\(= 4.8 \\times 10^{-7}\\) m, \\(n = 1.6\\), \\(c = 3 \\times 10^{8}\\) m/s.",
          "Frequency (same in both media): \\(\\nu = \\dfrac{c}{\\lambda} = \\dfrac{3 \\times 10^{8}}{4.8 \\times 10^{-7}} = 6.25 \\times 10^{14}\\) Hz.",
          "Speed in glass: \\(v = \\dfrac{c}{n} = \\dfrac{3 \\times 10^{8}}{1.6} = 1.875 \\times 10^{8}\\) m/s.",
          "Wavelength in glass: \\(\\lambda' = \\dfrac{\\lambda}{n} = \\dfrac{480}{1.6} = 300\\) nm.",
        ],
        answer: "6.25 × 10¹⁴ Hz; 1.875 × 10⁸ m/s; 300 nm",
      },
      selfCheckExample: {
        prompt: "Light travels at \\(2.4 \\times 10^{8}\\) m/s in a liquid. Its wavelength in air is 720 nm. Find its wavelength in the liquid.",
        steps: ["\\(n = \\dfrac{c}{v} = \\dfrac{3}{2.4} = 1.25\\).", "\\(\\lambda' = \\dfrac{720}{1.25} = 576\\) nm."],
        answer: "576 nm",
      },
      practiceSet: [
        { prompt: "Light of wavelength 640 nm in air has a wavelength of 480 nm in a liquid. Find the refractive index of the liquid.", answer: "\\(640/480 = 4/3\\), about 1.33" },
        { prompt: "What is the speed of light in a medium of refractive index 2.4? (Take \\(c = 3.0 \\times 10^{8}\\) m/s.)", answer: "\\(1.25 \\times 10^{8}\\) m/s" },
        { prompt: "Which travels slower in a glass prism, red light or violet light?", answer: "Violet, because glass has a larger refractive index for violet" },
      ],
      pyqExampleId: "d9ae2ea1-8645-4571-889a-1b77abd37bf7",
      traps: [
        {
          title: "Multiplying by n",
          body: "In a denser medium the wavelength gets shorter: \\(\\lambda' = \\lambda/n\\). If your answer is longer than the wavelength in air, you multiplied.",
        },
        {
          title: "Changing the frequency at the boundary",
          body: "Frequency is set by the source and is the same for incident, reflected and refracted light. Only the speed and the wavelength of the refracted light change.",
        },
        {
          title: "Linking slower light with less energy",
          body: "Light slows down in glass but does not lose energy for that reason. Energy depends on amplitude, not on speed.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpwo-lens-mirror",
      name: "Wavefronts from a prism, a lens and a mirror",
      intuition:
        "A lens or a mirror focuses light by delaying some parts of a wavefront more than others. Light is slower in glass, so the part of a wavefront that goes through the thickest glass falls furthest behind. Once the middle lags behind the edges, a flat wavefront has become curved, and a curved wavefront closes in on its centre: the focus.",
      definition:
        "- **Thin prism:** the part of the wavefront that passes through the thickest glass is delayed most, so the emerging wavefront is tilted.\n" +
        "- **Convex lens:** the central part of a plane wavefront passes through the thickest part of the lens and is delayed most. The emerging wavefront has a dip at the centre, so it is spherical and converges to the focus F.\n" +
        "- **Concave mirror:** a plane wave is reflected as a spherical wave converging to the focal point F, at a distance R/2 from the mirror.\n" +
        "- The time taken from a point on the object to the matching point on the image is the same along every ray.",
      table: {
        columns: ["A plane wave falls on", "Wavefront that comes out", "How to draw it"],
        rows: [
          { cells: ["A thin prism", "Plane, but tilted", "Straight lines turned towards the base, which lags behind"] },
          {
            cells: ["A convex lens", "Spherical, converging to the focus F", "Arcs beyond the lens with their centre at F, closing in on F"],
            noteAmber: "Board 2023 asked you to show the lens and the concave mirror together; 2025 and 2026 asked for the lens.",
          },
          { cells: ["A concave mirror", "Spherical, converging to the focus F", "Arcs on the reflecting side with their centre at F, a distance R/2 from the mirror"] },
          { cells: ["A concave lens", "Spherical, diverging", "Arcs that spread out, as if coming from the focus on the incoming side"] },
        ],
      },
      practiceSet: [
        { prompt: "A plane wave falls on a concave mirror of focal length 15 cm. On which point does the reflected wavefront converge?", answer: "On the focus, 15 cm from the mirror" },
        { prompt: "Why is the centre of a plane wavefront delayed most by a convex lens?", answer: "It passes through the thickest glass, where light travels slowest" },
      ],
      pyqExampleId: "f1909393-8764-478e-a826-93892bca4253",
      traps: [
        {
          title: "Drawing the lens wavefront bulging the wrong way",
          body: "After a convex lens the middle of the wavefront lags, so each arc curves back towards the lens and has its centre at F ahead of it. Mark F and draw the arcs getting smaller as they approach it.",
        },
      ],
    },
  ],
};
