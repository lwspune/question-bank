import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology I, Ch. 6 Refraction of Light. Statements
 * checked against the Balbharati text; most-asked years from the board past
 * papers in the bank, 2016-2026 (the old-syllabus scattering question left out).
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology I",
  subjectRoute: "science-and-technology-i",
  chapterName: "Refraction of Light",
  chapterSlug: "refraction-of-light",
  source: "Balbharati Science and Technology Part 1 Std X (Maharashtra State Board), Chapter 6",
  keyPoints: [
    {
      term: "Refraction of light",
      text: "Light changes its direction when going from one transparent medium to another transparent medium. A pencil in water looks bent and thicker because of it.",
    },
    {
      term: "First law of refraction",
      text: "The incident ray and the refracted ray are on opposite sides of the normal at the point of incidence, and the incident ray, the refracted ray and the normal are in the same plane.",
    },
    {
      term: "Second law (Snell's law)",
      text: "For a given pair of media, the ratio of \\(\\sin i\\) to \\(\\sin r\\) is a constant, the refractive index of the second medium with respect to the first.",
    },
    {
      term: "Ray along the normal",
      text: "A ray incident along the normal (\\(i = 0°\\)) goes forward in the same direction (\\(r = 0°\\)), without bending.",
    },
    {
      term: "Refractive index",
      text: "Depends on the velocity of light in the medium, and differs for different colours. Its value with respect to vacuum is the **absolute** refractive index. It has no unit.",
    },
    {
      term: "Absolute refractive indices",
      text: "Air 1.0003, ice 1.31, water 1.33, alcohol 1.36, crown glass 1.52, rock salt 1.54, diamond 2.42.",
    },
    {
      term: "Glass slab",
      text: "Air to glass, the ray bends **towards** the normal; glass to air, **away** from it. The emergent ray is parallel to the incident ray: \\(i = e\\).",
    },
    {
      term: "Mirage",
      text: "Air near a hot road or desert is hotter and rarer than the air above. Light from a distant object bends and seems to come from its image inside the ground, like water.",
    },
    {
      term: "Stars look higher",
      text: "Air gets denser lower down, so starlight keeps bending towards the normal. The star appears higher in the sky than its actual position.",
    },
    {
      term: "Twinkling of stars",
      text: "Stars are point sources. Moving air keeps changing the refractive index, so a star's position and brightness keep changing: it twinkles. Planets are closer, a collection of point sources, so they do not twinkle.",
    },
    {
      term: "Sunrise and sunset",
      text: "When the Sun is a little below the horizon, its rays reach us along a curved path by refraction through the atmosphere, so we see it before sunrise and after sunset.",
    },
    {
      term: "Dispersion of light",
      text: "The process of separation of light into its component colours while passing through a medium. Each colour has a different refractive index. Red bends the least, violet the most (VIBGYOR).",
    },
    {
      term: "Total internal reflection",
      text: "From denser to rarer, the ray bends away from the normal. At the **critical angle** \\(r = 90°\\). For larger \\(i\\), all the light is reflected back into the denser medium.",
    },
    {
      term: "Rainbow",
      text: "The combined effect of dispersion, refraction and total internal reflection of light. Water droplets act as small prisms. Seen mainly after a rainfall.",
    },
  ],
  formulas: [
    { label: "Snell's law", latex: "\\frac{\\sin i}{\\sin r} = n" },
    { label: "Relative refractive index", latex: "{}_1n_2 = \\frac{v_1}{v_2} \\qquad {}_2n_1 = \\frac{1}{{}_1n_2}" },
    {
      label: "Absolute refractive index",
      latex: "n = \\frac{c}{v} \\qquad c = 3 \\times 10^8\\ \\text{m/s}",
      symbols: [{ symbol: "v", meaning: "velocity of light in the medium" }],
    },
    { label: "Light in water (n = 1.33)", latex: "v = \\frac{3 \\times 10^8}{1.33} \\approx 2.26 \\times 10^8\\ \\text{m/s}" },
    { label: "Medium where light travels at half its speed in vacuum", latex: "n = \\frac{3 \\times 10^8}{1.5 \\times 10^8} = 2" },
    { label: "Critical angle (denser 1 to rarer 2)", latex: "{}_1n_2 = \\frac{\\sin i_c}{\\sin 90^\\circ} = \\sin i_c" },
    { label: "Visible wavelengths", latex: "\\text{violet} \\approx 400\\ \\text{nm} \\qquad \\text{red} \\approx 700\\ \\text{nm} \\qquad 1\\ \\text{nm} = 10^{-9}\\ \\text{m}" },
    { label: "Angle of incidence from the surface", latex: "i = 90^\\circ - (\\text{angle with the surface})" },
  ],
  derivations: [
    {
      title: "Refractive index in terms of the velocity of light",
      steps: [
        "Light travels with velocity \\(v_1\\) in medium 1 and \\(v_2\\) in medium 2.",
        "Refractive index of medium 2 with respect to medium 1: \\({}_1n_2 = \\frac{v_1}{v_2}\\); similarly \\({}_2n_1 = \\frac{v_2}{v_1}\\).",
        "So \\({}_2n_1 = \\frac{1}{{}_1n_2}\\). If medium 1 is vacuum, \\(n = \\frac{c}{v}\\), the absolute refractive index.",
      ],
    },
    {
      title: "Prove that i = e for a glass slab",
      steps: [
        "At the first surface (air to glass): \\(\\frac{\\sin i}{\\sin r} = n\\).",
        "At the second surface (glass to air), the ray meets it at \\(r\\) and leaves at \\(e\\): \\(\\frac{\\sin r}{\\sin e} = \\frac{1}{n}\\).",
        "Multiply: \\(\\frac{\\sin i}{\\sin e} = 1\\), so \\(i = e\\). The emergent ray is parallel to the incident ray.",
      ],
    },
    {
      title: "A rainbow is the combined effect of refraction, dispersion and total internal reflection",
      steps: [
        "After rain, tiny water droplets in the air act as small prisms.",
        "Sunlight entering a droplet is **refracted** and **dispersed** into colours.",
        "Inside the droplet the light undergoes **internal reflection**.",
        "It is **refracted** again on coming out, and the colours spread out to form a rainbow.",
      ],
    },
    {
      title: "Critical angle and total internal reflection",
      steps: [
        "Going from denser to rarer, the ray bends away from the normal, so \\(r > i\\).",
        "Increase \\(i\\): at the critical angle \\(i_c\\), \\(r = 90°\\). So \\({}_1n_2 = \\sin i_c\\).",
        "For \\(i > i_c\\), no ray refracts: all light is reflected back into the denser medium (total internal reflection).",
      ],
    },
  ],
  diagrams: [
    { title: "Refraction of light through a glass slab", labels: ["incident ray AN", "normal at N", "refracted ray NM", "emergent ray MD", "angles i, r and e", "slab PQRS"] },
    { title: "Mirage", labels: ["distant object", "hot surface", "hot rarer air near the ground", "apparent image below the ground"] },
    { title: "Apparent position of a star", labels: ["real position", "apparent position (higher)", "atmospheric layers of increasing refractive index", "earth"] },
    { title: "Dispersion of light through a prism", labels: ["sunlight", "glass prism", "spectrum VIBGYOR", "red deviated least, violet most"] },
    { title: "Partial and total internal reflection", labels: ["denser medium (water) and rarer medium (air)", "normal", "critical angle ic with r = 90°", "ray reflected back for i > ic"] },
    { title: "Rainbow production", labels: ["sunlight ray", "water droplet", "refraction and dispersion on entering", "internal reflection", "refraction on leaving"] },
  ],
  mostAsked: [
    { topic: "Refraction of light: define it, state the laws, refraction through a glass slab (figure)", marks: 3, years: [2026, 2025, 2023, 2022, 2020, 2018, 2016] },
    { topic: "Dispersion: spectrum through a prism, least-deviated colour, wavelengths of red and violet", marks: 1, years: [2026, 2025, 2024, 2023, 2022, 2020, 2016] },
    { topic: "Atmospheric refraction: twinkling of stars, stars look higher, Sun seen below the horizon, mirage", marks: 1, years: [2026, 2025, 2024, 2020] },
    { topic: "Refractive index: values (water, air, diamond) and velocity numericals", marks: 1, years: [2026, 2024, 2023, 2022] },
    { topic: "Angle of incidence from the angle with the surface, or for a ray along the normal", marks: 1, years: [2026, 2024, 2023, 2019, 2016] },
    { topic: "Rainbow: combined effect of refraction, dispersion and total internal reflection (with diagram)", marks: 3, years: [2026, 2025, 2024] },
    { topic: "Critical angle and total internal reflection", marks: 5, years: [2019] },
  ],
  mistakes: [
    {
      title: "Taking the angle with the surface as the angle of incidence",
      body: "Angles are measured from the **normal**. A ray at 30° to the surface has \\(i = 60°\\).",
    },
    {
      title: "Bending the wrong way",
      body: "Rarer to denser: towards the normal. Denser to rarer: away from the normal. Along the normal: no bending at all.",
    },
    {
      title: "Saying planets twinkle",
      body: "Planets are close, so they act as a collection of point sources; their average position and brightness stay steady.",
    },
    {
      title: "Naming only one process for a rainbow",
      body: "Write all three: refraction, dispersion and total internal reflection, in the order they happen in the droplet.",
    },
    {
      title: "Swapping red and violet",
      body: "Red: longest wavelength (about 700 nm), deviated least. Violet: shortest (about 400 nm), deviated most.",
    },
  ],
};

export default sheet;
