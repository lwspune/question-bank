import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/thermal-properties-of-matter";

export const RADIATION_NOTE: SubtopicNote = {
  subtopicName: "Radiation — Stefan, Wien, Newton's Law of Cooling, Black Body",
  title: "Radiation: Stefan, Wien and Newton's Law of Cooling",
  oneLineDefinition:
    "A hot body radiates power P = eσAT⁴ (Stefan's law), its spectrum peaks at λ_m = b/T (Wien's law), and a body a little warmer than its surroundings cools at a rate proportional to its excess temperature (Newton's law of cooling); a black body absorbs everything and has e = 1.",
  whyItMatters:
    "53 PYQs, 12 of them HARD — two thirds of the chapter. Ten split incident heat into absorbed, reflected and transmitted parts or ask about black bodies. Twenty-two use Stefan's law, eleven combine it with Wien's law to compare bodies whose spectra peak at different wavelengths, and ten are Newton's law of cooling. " +
    "Four cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetp-th-absorption-black-body",
      name: "Absorbed, Reflected, Transmitted, and the Black Body",
      intuition:
        "Radiation falling on a surface is absorbed, reflected or transmitted, and the three fractions add to one: a + r + t = 1. An opaque body transmits nothing, so a + r = 1. A perfectly black body absorbs everything, a = 1, and is also the best emitter, e = 1; a good absorber is a good emitter, so a black sphere cools faster than a red one and a red faster than a white. A black body does not emit every wavelength equally: its intensity rises to a peak and falls, and the area under the curve is the total power per unit area over all wavelengths.",
      definition:
        "- **a + r + t = 1**: 250 kcal with a = 0.77, r = 0.17 ⇒ 15 kcal transmitted.\n" +
        "- Opaque: t = 0, a + r = 1. Black body: a = e = 1.\n" +
        "- Good absorber = good emitter: black > red > white for rate of cooling.\n" +
        "- Black-body spectrum: intensity peaks and falls; **not** the same at all wavelengths. Area under the curve = total power per unit area.",
      table: {
        columns: ["Quantity", "Rule"],
        rows: [
          { cells: ["Incident heat", "absorbed + reflected + transmitted"] },
          { cells: ["Opaque body", "t = 0, a + r = 1"] },
          { cells: ["Perfect black body", "a = 1, emissivity e = 1"] },
          { cells: ["Rate of cooling by colour", "black > red > white"] },
          { cells: ["Area under the intensity–wavelength curve", "total power per unit area, all wavelengths"] },
        ],
      },
      selfCheckExample: {
        prompt: "200 J falls on a surface with a = 0.5 and t = 0.1. Heat reflected?",
        steps: ["r = 1 − 0.5 − 0.1 = 0.4."],
        answer: "80 J",
      },
      practiceSet: [
        { prompt: "x J is incident; y J is reflected plus transmitted. Coefficient of absorption?", answer: "(x − y)/x" },
        { prompt: "Which statement about black-body radiation is false: all wavelengths emitted, or intensity the same at all wavelengths?", answer: "Intensity the same at all wavelengths" },
      ],
      pyqExampleId: "f76717d1-ae7f-4be9-8d8f-692bcf8eb90f",
      traps: [
        {
          title: "Leaving out the transmitted part",
          body:
            "a + r + t = 1 holds for any surface; only an opaque one has t = 0. Given absorbed and transmitted heat, the reflected heat is what is left.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-th-stefan-law",
      name: "Stefan's Law: Power Grows as T⁴",
      intuition:
        "The power a body radiates is P = eσAT⁴, with T in kelvin. For a sphere A = 4πR², so comparisons come down to P ∝ eR²T⁴: doubling the temperature alone multiplies the power by 16. Two bodies that radiate the same power have R²T⁴ equal, so R₁/R₂ = (T₂/T₁)². A body in surroundings at T₀ also absorbs, so its NET loss goes as T⁴ − T₀⁴; compare two states of the same body with that difference, not with T⁴ alone. Equal volumes of different shapes lose heat in proportion to their areas: a sphere, having the least area, cools slowest, and a thin plate fastest.",
      definition:
        "- \\(P = e\\sigma AT^4\\), sphere \\(P \\propto eR^2T^4\\), T in **kelvin**.\n" +
        "- R → 2R, T → 2T ⇒ 64P; R → R/2, T → 3T ⇒ \\(\\dfrac{81}{4}P\\); T up 50% ⇒ about +400%.\n" +
        "- Same power: \\(\\dfrac{R_1}{R_2} = \\left(\\dfrac{T_2}{T_1}\\right)^2\\); same power per area: \\(e_1T_1^4 = e_2T_2^4\\).\n" +
        "- **Net loss** with surroundings \\(T_0\\): \\(\\propto T^4 - T_0^4\\) (900 K and 600 K with 300 K ⇒ 5.3).\n" +
        "- Equal volume: rate ∝ area — sphere : cube \\(= (\\pi/6)^{1/3}\\).",
      formula: {
        label: "Stefan's law",
        latex: "P = e\\sigma A T^4, \\qquad P_{\\text{net}} = e\\sigma A\\left(T^4 - T_0^4\\right)",
      },
      authoredExample: {
        prompt: "A black body at 27 °C radiates 10 W. What does it radiate at 327 °C?",
        steps: ["300 K → 600 K: temperature doubles.", "P × 2⁴ = 160 W."],
        answer: "160 W",
      },
      selfCheckExample: {
        prompt: "A black sphere radiates P. Its radius is doubled and its absolute temperature halved. New power?",
        steps: ["(2)² × (1/2)⁴ = 4/16."],
        answer: "P/4",
      },
      practiceSet: [
        { prompt: "Emissivity 0.2 at 3T against a black body at T, same area. Ratio of powers?", answer: "16.2" },
        { prompt: "Two black spheres radiate the same power. R₂/R₁?", answer: "(T₁/T₂)²" },
      ],
      pyqExampleId: "0a4ad228-a120-46e4-81b0-8c894ad85a68",
      traps: [
        {
          title: "Using degrees Celsius in T⁴",
          body:
            "127 °C to 527 °C is 400 K to 800 K, a factor of 2 — not 527/127. Convert to kelvin before taking any power.",
        },
        {
          title: "Ignoring the surroundings in a cooling rate",
          body:
            "A body in surroundings at T₀ loses heat at a rate ∝ T⁴ − T₀⁴. Comparing 900 K and 600 K in a 300 K room gives 5.3, not (900/600)⁴ = 5.1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-th-wien-law",
      name: "Wien's Law: the Peak Moves With Temperature",
      intuition:
        "A hotter body's spectrum peaks at a shorter wavelength: λ_mT = b, about 2.9 × 10⁻³ m K. So the frequency at the peak is proportional to T — a straight line through the origin on a ν_m–T graph. Many questions pair it with Stefan's law: if the peak wavelength falls to λ/3, the temperature has tripled and the emissive power has risen 81 times. For bodies of different sizes, combine the two as P ∝ R²/λ_m⁴.",
      definition:
        "- \\(\\lambda_m T = b \\approx 2.9\\times10^{-3}\\) m K; \\(\\nu_m \\propto T\\).\n" +
        "- Peak at λ/2 ⇒ T doubles ⇒ power × 16; peak at 2λ/3 ⇒ power × \\(\\dfrac{81}{16}\\).\n" +
        "- Different sizes: \\(P \\propto \\dfrac{R^2}{\\lambda_m^4}\\) (radii 2, 3, 6 m at 300, 400, 500 nm ⇒ the 6 m disc radiates most).\n" +
        "- Two bodies, \\(T_A = 3T_B\\), peaks 4 μm apart ⇒ \\(\\lambda_B = 6\\) μm.",
      formula: {
        label: "Wien's law",
        latex: "\\lambda_m T = b, \\qquad \\frac{P_2}{P_1} = \\left(\\frac{\\lambda_{m1}}{\\lambda_{m2}}\\right)^4",
      },
      authoredExample: {
        prompt: "A star's spectrum peaks at 500 nm. Its surface temperature? (b = 2.9 × 10⁻³ m K)",
        steps: ["T = b/λ_m = 2.9 × 10⁻³ / 5 × 10⁻⁷.", "T = 5800 K."],
        answer: "5800 K",
      },
      selfCheckExample: {
        prompt: "A body peaks at 966 nm at 3000 K. Where does it peak at 6000 K?",
        steps: ["λ_m ∝ 1/T."],
        answer: "483 nm",
      },
      practiceSet: [
        { prompt: "Peak wavelength falls from λ₀ to λ₀/4. Power radiated?", answer: "256 times" },
        { prompt: "How does ν_m vary with T?", answer: "A straight line through the origin" },
      ],
      pyqExampleId: "a3c2085b-b95c-466b-9096-9e79f6c2c938",
      traps: [
        {
          title: "Raising the wavelength ratio to the fourth power the wrong way",
          body:
            "Power goes as T⁴, and T as 1/λ_m. A SHORTER peak wavelength means a hotter body and MORE power: λ/2 gives 16 times, not one sixteenth.",
        },
        {
          title: "Forgetting the size when bodies differ",
          body:
            "Wien fixes T, but the power also goes as the area. Discs of radii 2, 3 and 6 m peaking at 300, 400 and 500 nm are not equal; compare R²/λ_m⁴.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-th-newton-cooling",
      name: "Newton's Law of Cooling",
      intuition:
        "For a small excess over the surroundings, the rate of cooling is proportional to that excess: dT/dt = −K(T − T₀). The papers use the averaged form: the fall in temperature divided by the time equals K times (the average temperature over the interval minus T₀). Write it for the first interval to find K, then for the second to find the time or the final temperature. Each equal drop takes longer than the last, because the excess keeps shrinking. Two rates at two temperatures fix T₀ by division. Two calorimeter fillings that cool through the same range give the water equivalent, since the heat lost per second is the same.",
      definition:
        "- \\(\\dfrac{T_1 - T_2}{t} = K\\left(\\dfrac{T_1 + T_2}{2} - T_0\\right)\\).\n" +
        "- 80 → 60 °C in 1 min, room 30 °C ⇒ 60 → 50 °C in 48 s.\n" +
        "- Two rates: \\(\\dfrac{R_1}{R_2} = \\dfrac{T_1 - T_0}{T_2 - T_0}\\) (4 and 1 °C/min at 90 and 30 °C ⇒ \\(T_0 = 10\\) °C).\n" +
        "- Equal drops take longer and longer: \\(t_1 < t_2 < t_3\\).\n" +
        "- Water equivalent W: \\(\\dfrac{m_1 + W}{t_1} = \\dfrac{m_2 + W}{t_2}\\) (10 g in 10 min, 20 g in 15 min ⇒ W = 10 g).",
      formula: {
        label: "Newton's law of cooling",
        latex: "\\frac{T_1 - T_2}{t} = K\\left(\\frac{T_1 + T_2}{2} - T_0\\right)",
      },
      authoredExample: {
        prompt: "A body cools from 80 °C to 50 °C in 5 min in a 20 °C room. How long to cool from 50 °C to 30 °C?",
        steps: ["30/5 = K(65 − 20) ⇒ K = 2/15 per min.", "20/t = (2/15)(40 − 20) ⇒ t = 7.5 min."],
        answer: "7.5 min",
      },
      selfCheckExample: {
        prompt: "A body cools from 70 °C to 60 °C in 5 min in a 20 °C room. Time to go from 60 °C to 50 °C?",
        steps: ["10/5 = K × 45; 10/t = K × 35."],
        answer: "≈ 6.4 min",
      },
      practiceSet: [
        { prompt: "A body cools from 4θ to 3θ in t in surroundings at θ. Temperature after another t?", answer: "7θ/3" },
      ],
      pyqExampleId: "5211b611-f90a-49b2-afa5-f7d9b9ca5f86",
      traps: [
        {
          title: "Using the starting temperature instead of the average",
          body:
            "The papers' form uses the AVERAGE temperature over the interval minus the surroundings: (T₁ + T₂)/2 − T₀. Using T₁ − T₀ gives a different K.",
        },
      ],
    },
  ],
  related: [
    { label: "Conduction — heat through a medium", href: `${BASE}/cetp-th-conduction` },
  ],
};
