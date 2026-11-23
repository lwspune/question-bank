import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_WO_REFLECTION_NOTE: SubtopicNote = {
  subtopicName: "Reflection and Refraction on Huygens' Theory",
  title: "Reflection and Refraction by Huygens' Construction",
  oneLineDefinition:
    "Deriving the laws of reflection and of refraction from Huygens' principle, and how the speed and wavelength of light change in a medium while its frequency stays the same.",
  whyItMatters:
    "11 questions, seven of them from board papers. The board asks you to derive the laws of reflection with a diagram (2022, 2023), to explain refraction on the wave theory and prove its laws (2019), to find the speed of light in water and diamond (2018) and the change in wavelength from air to glass (2016), and which property of light does not change in a new medium (2022, 2023).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpwo-reflection-laws",
      name: "Laws of reflection from Huygens' principle",
      intuition:
        "A plane wavefront meets a mirror slantwise, so one end touches the mirror first. That end at once starts a wavelet back into the same medium, while the far end is still travelling. By the time the far end reaches the mirror, the first wavelet has grown by exactly the same distance, because both moved at the same speed for the same time. That equality makes two right-angled triangles congruent, and the equal angles are i and r.",
      definition:
        "- MN is the plane mirror; AB is the incident plane wavefront, both perpendicular to the paper. RA and QB show the direction of incidence, and AP is the normal at A.\n" +
        "- At \\(t = 0\\) end A touches MN. End B reaches the mirror at C at \\(t = T\\), so \\(\\text{BC} = vT\\).\n" +
        "- In the same time the wavelet from A grows to radius \\(\\text{AE} = vT\\) in the same medium. Wavelets from points between A and C have radii from \\(vT\\) down to zero.\n" +
        "- The tangent EC to these wavelets is the **reflected wavefront**; AE gives the reflected ray.\n" +
        "- In right-angled triangles ABC and AEC, the hypotenuse AC is common and \\(\\text{AE} = \\text{BC}\\), so the triangles are **congruent** and \\(\\angle \\text{BAC} = \\angle \\text{ECA}\\), that is \\(i = r\\).\n" +
        "- The incident ray, the reflected ray and the normal all lie in the plane of the paper: the second law.",
      formula: {
        label: "Reflection by Huygens' construction",
        latex: "\\text{AE} = \\text{BC} = vT \\;\\Rightarrow\\; \\sin i = \\frac{\\text{BC}}{\\text{AC}} = \\frac{\\text{AE}}{\\text{AC}} = \\sin r \\;\\Rightarrow\\; i = r",
      },
      authoredExample: {
        prompt:
          "A plane wavefront in air falls on a plane mirror with an angle of incidence of 30°. The strip AC of the mirror that it covers is 10 cm long. Taking the speed of light as \\(3 \\times 10^{8}\\) m/s, find the time T for the far end B to reach the mirror, the radius AE of the wavelet from A at that time, and the angle of reflection.",
        steps: [
          "Given: \\(i = 30^\\circ\\), AC = 10 cm = 0.1 m, \\(v = 3 \\times 10^{8}\\) m/s.",
          "From triangle ABC: \\(\\text{BC} = \\text{AC} \\sin i = 0.1 \\times 0.5 = 0.05\\) m.",
          "\\(T = \\dfrac{\\text{BC}}{v} = \\dfrac{0.05}{3 \\times 10^{8}} = 1.67 \\times 10^{-10}\\) s.",
          "\\(\\text{AE} = vT = 0.05\\) m = 5 cm.",
          "From triangle AEC: \\(\\sin r = \\dfrac{\\text{AE}}{\\text{AC}} = \\dfrac{0.05}{0.1} = 0.5\\), so \\(r = 30^\\circ\\).",
        ],
        answer: "T = 1.67 × 10⁻¹⁰ s; AE = 5 cm; r = 30°, equal to i",
      },
      selfCheckExample: {
        prompt:
          "In Huygens' construction for reflection, the incident plane wavefront makes an angle of 40° with the mirror. What angle does the reflected wavefront make with the mirror?",
        steps: ["The angle between the incident wavefront and the mirror is i, and that between the reflected wavefront and the mirror is r.", "Since \\(i = r\\), the reflected wavefront also makes 40° with the mirror."],
        answer: "40°",
      },
      practiceSet: [
        { prompt: "In deriving the laws of reflection, why is AE equal to BC?", answer: "Both are covered in the same time T at the same speed v, since the reflected wave stays in the same medium" },
        { prompt: "Which two triangles are proved congruent in the derivation, and on what grounds?", answer: "ABC and AEC: both right-angled, with common hypotenuse AC and AE = BC" },
        { prompt: "State the second law of reflection.", answer: "The incident ray, the reflected ray and the normal at the point of incidence lie in the same plane" },
      ],
      pyqExampleId: "1af287d2-9672-4568-87be-cb6b65f0ddc2",
      traps: [
        {
          title: "A derivation with no diagram",
          body: "Every step refers to points A, B, C and E. Without the labelled figure (mirror MN, wavefront AB, wavelet of radius AE, reflected wavefront EC, normal AP) the steps cannot be followed and the diagram marks are lost.",
        },
        {
          title: "Proving only i = r",
          body: "There are two laws. End with the second one: the incident ray, the reflected ray and the normal lie in one plane.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpwo-refraction-laws",
      name: "Laws of refraction from Huygens' principle",
      intuition:
        "Refraction is the same construction with one change: the wavelet from A now grows in the second medium, at a different speed. If the second medium is denser, the wavelet grows less in the time the far end takes to arrive, so the new wavefront is tilted and the ray bends towards the normal. The ratio of the two speeds is the whole of Snell's law.",
      definition:
        "- MN separates medium 1 (speed \\(v_1\\), refractive index \\(n_1\\)) from medium 2 (speed \\(v_2\\), refractive index \\(n_2\\)). AB is the incident plane wavefront.\n" +
        "- End B travels \\(\\text{BC} = v_1 T\\) in medium 1 while the wavelet from A grows to \\(\\text{AE} = v_2 T\\) in medium 2. The tangent CE is the **refracted wavefront**.\n" +
        "- From triangle ABC, \\(\\sin i = \\dfrac{v_1 T}{\\text{AC}}\\). From triangle AEC, \\(\\sin r = \\dfrac{v_2 T}{\\text{AC}}\\).\n" +
        "- Dividing: \\(\\dfrac{\\sin i}{\\sin r} = \\dfrac{v_1}{v_2} = \\dfrac{n_2}{n_1}\\), so \\(n_1 \\sin i = n_2 \\sin r\\) (Snell's law).\n" +
        "- The incident ray, the refracted ray and the normal lie in one plane.\n" +
        "- If \\(v_1 > v_2\\) (\\(n_1 < n_2\\)), then \\(i > r\\): going into a denser medium the ray bends **towards** the normal; going into a rarer medium it bends **away** from the normal.",
      formula: {
        label: "Snell's law",
        latex: "\\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2} = \\frac{n_2}{n_1}, \\qquad n_1 \\sin i = n_2 \\sin r",
      },
      authoredExample: {
        prompt:
          "Light passes from air, where its speed is \\(3 \\times 10^{8}\\) m/s, into water, where its speed is \\(2.25 \\times 10^{8}\\) m/s. The angle of incidence is 45°. Find the angle of refraction.",
        steps: [
          "Given: \\(v_1 = 3 \\times 10^{8}\\) m/s, \\(v_2 = 2.25 \\times 10^{8}\\) m/s, \\(i = 45^\\circ\\).",
          "Formula: \\(\\dfrac{\\sin i}{\\sin r} = \\dfrac{v_1}{v_2}\\), so \\(\\sin r = \\sin i \\times \\dfrac{v_2}{v_1}\\).",
          "Substitution: \\(\\sin r = 0.7071 \\times \\dfrac{2.25}{3} = 0.7071 \\times 0.75 = 0.5303\\).",
          "\\(r = \\sin^{-1}(0.5303) = 32.0^\\circ\\). It is less than 45°, so the ray bends towards the normal.",
        ],
        answer: "r = 32.0°",
      },
      selfCheckExample: {
        prompt:
          "In Huygens' construction for refraction from air into glass, the far end of the wavefront covers BC = 6 cm in air while the wavelet from A grows to AE = 4 cm in the glass. Find the refractive index of the glass.",
        steps: ["\\(n = \\dfrac{v_1}{v_2} = \\dfrac{\\text{BC}}{\\text{AE}}\\), since both distances take the same time T.", "\\(n = \\dfrac{6}{4} = 1.5\\)."],
        answer: "1.5",
      },
      practiceSet: [
        { prompt: "Light goes from glass into air. Does the refracted ray bend towards or away from the normal?", answer: "Away from the normal" },
        { prompt: "Write Snell's law in terms of the absolute refractive indices of the two media.", answer: "\\(n_1 \\sin i = n_2 \\sin r\\)" },
        { prompt: "In Huygens' construction the wavelet in medium 2 grows more slowly than the wavefront moves in medium 1. Is i larger or smaller than r?", answer: "Larger: \\(i > r\\)" },
      ],
      pyqExampleId: "d4c14796-0310-4590-94a7-a696bedd4ab4",
      traps: [
        {
          title: "Turning the speed ratio upside down",
          body: "\\(\\sin i/\\sin r = v_1/v_2\\): the speed in the FIRST medium goes on top. In terms of refractive index the order flips: \\(n_2/n_1\\).",
        },
        {
          title: "Using one speed for both media",
          body: "In refraction AE = \\(v_2 T\\) but BC = \\(v_1 T\\). Writing AE = BC is the reflection argument and gives \\(i = r\\), which is wrong here.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpwo-wavelength-medium",
      name: "Speed, wavelength and frequency in a medium",
      intuition:
        "The source decides how many waves leave it each second, and no boundary can change that count, so the frequency stays the same. In a denser medium the wave slows down, so each wave is packed into a shorter length: the wavelength shrinks by the same factor as the speed.",
      definition:
        "- Speed in a medium of refractive index n: \\(v = c/n\\).\n" +
        "- Wavelength in the medium: \\(\\lambda = \\lambda_0 / n\\), where \\(\\lambda_0\\) is the wavelength in vacuum.\n" +
        "- Between two media: \\(\\lambda_2 = \\lambda_1 \\dfrac{v_2}{v_1} = \\lambda_1 \\dfrac{n_1}{n_2}\\).\n" +
        "- The **frequency does not change** from one medium to another. Speed and wavelength change, in inverse proportion to the refractive index.\n" +
        "- In each medium \\(v = \\nu\\lambda\\).",
      formula: {
        label: "Light in a medium",
        latex: "v = \\frac{c}{n}, \\qquad \\lambda = \\frac{\\lambda_0}{n}, \\qquad \\nu \\text{ unchanged}",
        symbols: [
          { symbol: "\\(\\lambda_0\\)", meaning: "wavelength in vacuum (air)" },
          { symbol: "\\(\\nu\\)", meaning: "frequency, the same in every medium" },
        ],
      },
      authoredExample: {
        prompt:
          "Light of wavelength 6000 Å in air enters glass of refractive index 1.5. Find its speed, wavelength and frequency in the glass. (\\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Given: \\(\\lambda_0 = 6000\\) Å \\(= 6 \\times 10^{-7}\\) m, \\(n = 1.5\\).",
          "Speed: \\(v = \\dfrac{c}{n} = \\dfrac{3 \\times 10^{8}}{1.5} = 2 \\times 10^{8}\\) m/s.",
          "Wavelength: \\(\\lambda = \\dfrac{\\lambda_0}{n} = \\dfrac{6000}{1.5} = 4000\\) Å.",
          "Frequency: \\(\\nu = \\dfrac{c}{\\lambda_0} = \\dfrac{3 \\times 10^{8}}{6 \\times 10^{-7}} = 5 \\times 10^{14}\\) Hz, the same in glass (check: \\(2 \\times 10^{8}/4 \\times 10^{-7} = 5 \\times 10^{14}\\) Hz).",
        ],
        answer: "2 × 10⁸ m/s; 4000 Å; 5 × 10¹⁴ Hz",
      },
      selfCheckExample: {
        prompt: "Yellow light has a wavelength of 5890 Å in air and 4430 Å in water. Find the refractive index of water.",
        steps: ["\\(n = \\dfrac{\\lambda_0}{\\lambda} = \\dfrac{5890}{4430}\\).", "\\(n = 1.33\\)."],
        answer: "1.33",
      },
      practiceSet: [
        { prompt: "Red light of wavelength 7000 Å in air enters glass of refractive index 1.4. What is its wavelength in the glass?", answer: "5000 Å" },
        { prompt: "Light of frequency \\(6 \\times 10^{14}\\) Hz travels in glass of refractive index 1.5. Find its wavelength in the glass. (c = 3 × 10⁸ m/s)", answer: "\\(3.33 \\times 10^{-7}\\) m (3333 Å)" },
        { prompt: "When light passes from air into glass, which of speed, wavelength and frequency stays the same?", answer: "Frequency" },
      ],
      pyqExampleId: "579dcfa4-ac85-4f9e-a1c2-e4620e193785",
      traps: [
        {
          title: "Changing the frequency in the new medium",
          body: "Only the speed and the wavelength change. Dividing the frequency by n as well is the commonest slip in these sums.",
        },
        {
          title: "Multiplying the wavelength by n",
          body: "A denser medium has the SHORTER wavelength: \\(\\lambda = \\lambda_0/n\\). If your wavelength in glass came out longer than in air, you multiplied.",
        },
      ],
    },
  ],
};
