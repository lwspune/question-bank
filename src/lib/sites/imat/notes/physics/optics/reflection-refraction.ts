import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_OPT_REFLECTION_NOTE: SubtopicNote = {
  subtopicName: "Reflection and Refraction",
  title: "Mirrors, Refraction and Total Internal Reflection",
  oneLineDefinition:
    "Light bounces off a mirror at the angle it arrived, bends towards the normal when it slows down, and is trapped inside a dense material beyond the critical angle.",
  whyItMatters:
    "The only past question in this chapter, from 2020, asked which statements about rays and images in a concave mirror are always true. Refraction, Snell's law and total internal reflection have not been asked yet, but they are core syllabus with medical uses such as the endoscope.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-opt-plane-mirror",
      name: "The laws of reflection and the plane mirror image",
      intuition:
        "Light hits a mirror and leaves at the same angle it arrived, like a ball bouncing without spin. Your eye traces the reflected rays straight back, so they seem to come from a point behind the glass. Nothing is really there, which is why a plane mirror image is called virtual.",
      definition:
        "- **Laws of reflection**: the incident ray, the reflected ray and the **normal** (the line at right angles to the surface) lie in one plane, and the **angle of incidence equals the angle of reflection**.\n" +
        "- Both angles are measured **from the normal**, not from the surface.\n" +
        "- A **virtual** image is one the light only appears to come from; it cannot be caught on a screen. A **real** image is where light actually meets, and can be.",
      table: {
        columns: ["Property", "Plane mirror image"],
        rows: [
          { cells: ["Position", "As far behind the mirror as the object is in front"] },
          { cells: ["Size", "Same size as the object"] },
          { cells: ["Orientation", "Upright, but left and right are swapped (laterally inverted)"] },
          { cells: ["Type", "Virtual: it cannot be projected on a screen"] },
          { cells: ["Full-length mirror", "Needs to be only half your height"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A ray of light strikes a plane mirror making an angle of 30° with the mirror's surface. What is the angle between the incident ray and the reflected ray?",
        options: ["30°", "60°", "90°", "120°", "150°"],
        steps: [
          "Measured from the normal, the angle of incidence is \\(90^\\circ - 30^\\circ = 60^\\circ\\).",
          "The angle of reflection is also \\(60^\\circ\\), so the two rays are \\(60^\\circ + 60^\\circ = 120^\\circ\\) apart.",
          "Option B doubles the angle to the surface, which is the angle measured the wrong way.",
        ],
        answer: "(D) 120°",
      },
      practiceSet: [
        { prompt: "You stand 2.0 m in front of a plane mirror. How far are you from your image?", answer: "4.0 m" },
        { prompt: "You walk towards a mirror at 1.0 m/s. How fast does your image approach you?", answer: "2.0 m/s" },
        { prompt: "Can the image in a plane mirror be caught on a screen?", answer: "No: it is virtual" },
        { prompt: "What is the shortest plane mirror in which a 1.70 m person can see their whole body?", answer: "0.85 m", method: "Half their height" },
      ],
      traps: [
        {
          title: "Angles in optics are measured from the normal",
          body: "The angle of incidence is between the ray and the normal, not the surface. A ray at 30° to a mirror has an angle of incidence of 60°. The same rule applies in refraction.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-opt-curved-mirrors",
      name: "Concave and convex mirrors: rays and images",
      intuition:
        "A concave mirror curves inwards like the inside of a spoon, and it gathers rays together. A convex mirror bulges outwards and spreads rays apart, so it shows a wide view. Where the image lands, and what it looks like, depends on where the object is compared with the focal point.",
      definition:
        "- The **principal axis** runs through the centre of the mirror. The **focal point** \\(F\\) is where rays parallel to the axis meet after reflection (concave) or appear to come from (convex). The **focal length** is \\(f = R/2\\), where \\(R\\) is the radius of curvature and \\(C\\) the centre of curvature.\n" +
        "- Concave mirror ray rules: a ray **parallel to the axis** reflects **through \\(F\\)**; a ray **through \\(F\\)** reflects **parallel to the axis**; a ray through \\(C\\) comes straight back. (Exact for a parabolic mirror, close for a spherical one near the axis.)\n" +
        "- A **concave** mirror gives a **real, inverted** image when the object is beyond \\(F\\), and a **virtual, upright, magnified** image when the object is between \\(F\\) and the mirror.\n" +
        "- A **convex** mirror always gives a **virtual, upright, smaller** image.",
      table: {
        columns: ["Mirror and object position", "Image", "Use"],
        rows: [
          { cells: ["Concave, object beyond \\(C\\)", "Real, inverted, smaller, between \\(F\\) and \\(C\\)", "Telescope mirrors collecting light from far away"] },
          { cells: ["Concave, object at \\(C\\)", "Real, inverted, same size, at \\(C\\)", "Checking the radius of curvature in a lab"] },
          { cells: ["Concave, object between \\(C\\) and \\(F\\)", "Real, inverted, larger, beyond \\(C\\)", "Projecting an enlarged image onto a screen"] },
          { cells: ["Concave, object at \\(F\\)", "No image: the reflected rays are parallel", "Torch and headlamp reflectors, with the bulb at \\(F\\)"] },
          { cells: ["Concave, object between \\(F\\) and the mirror", "Virtual, upright, larger, behind the mirror", "Make-up and dentists' mirrors"] },
          { cells: ["Convex, any position", "Virtual, upright, smaller, behind the mirror", "Car wing mirrors and shop security mirrors"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A dentist holds a small concave mirror close to a tooth, so the tooth is nearer to the mirror than the focal point is. What image does the dentist see?",
        options: [
          "Real, inverted and larger",
          "Virtual, upright and larger",
          "Virtual, upright and smaller",
          "Real, inverted and smaller",
          "No image, because the reflected rays are parallel",
        ],
        steps: [
          "With the object inside \\(F\\), the reflected rays spread out and only appear to come from a point behind the mirror: the image is virtual and upright.",
          "It is also magnified, which is why dentists use these mirrors.",
          "Option C describes a convex mirror; A and D need the object beyond \\(F\\); E happens only with the object exactly at \\(F\\).",
        ],
        answer: "(B) Virtual, upright and larger",
      },
      practiceSet: [
        { prompt: "A concave mirror has a radius of curvature of 40 cm. What is its focal length?", answer: "20 cm", method: "\\(f = R/2\\)" },
        { prompt: "Why are car wing mirrors convex?", answer: "They give a wide field of view, and the image is always upright" },
        { prompt: "Where is the bulb placed in a torch reflector?", answer: "At the focal point, so the beam leaves parallel" },
        { prompt: "Which kind of mirror can form a real image on a screen?", answer: "Only a concave mirror (with the object beyond \\(F\\))" },
      ],
      traps: [
        {
          title: "A concave mirror does not always give a real, inverted image",
          body: "With the object between the focal point and the mirror, a concave mirror gives a virtual, upright, magnified image. Its image is also not always larger: an object far beyond \\(C\\) gives a smaller one. Statements with \"always\" about concave images are usually false.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-opt-snell",
      name: "Refraction, refractive index and Snell's law",
      intuition:
        "Light slows down in glass and water. If it hits the surface at an angle, one side of the beam slows first and the beam swings round, like a car whose wheel on one side runs onto sand. Going into a slower medium it bends towards the normal; coming out into a faster one it bends away.",
      definition:
        "- The **refractive index** of a medium is \\(n = c/v\\): how many times slower light travels in it than in a vacuum. It is always at least 1 (air about 1.00, water 1.33, glass about 1.5).\n" +
        "- **Snell's law**: \\(n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\), with the angles measured from the normal.\n" +
        "- Into a **higher** \\(n\\) (slower): the ray bends **towards** the normal. Into a lower \\(n\\): **away** from it. Along the normal: no bending.\n" +
        "- The frequency, and so the colour, stays the same; the wavelength becomes \\(\\lambda/n\\).\n" +
        "- \\(n\\) is slightly different for each colour, so a prism splits white light into a spectrum (**dispersion**): violet bends most, red least.",
      formula: {
        label: "Refractive index and Snell's law",
        latex: "n = \\frac{c}{v} \\qquad n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2",
        symbols: [
          { symbol: "\\(n\\)", meaning: "refractive index (no unit)" },
          { symbol: "\\(c\\)", meaning: "speed of light in a vacuum, \\(3.00 \\times 10^8\\) m/s" },
          { symbol: "\\(v\\)", meaning: "speed of light in the medium" },
          { symbol: "\\(\\theta_1,\\ \\theta_2\\)", meaning: "angles of incidence and refraction, from the normal" },
        ],
      },
      authoredExample: {
        prompt:
          "Light in air strikes a glass block of refractive index 1.50 at an angle of incidence of 45°. Find the angle of refraction and the speed of light in the glass.",
        steps: [
          "\\(1.00 \\times \\sin 45^\\circ = 1.50 \\sin\\theta_2\\), so \\(\\sin\\theta_2 = 0.707/1.50 = 0.471\\).",
          "\\(\\theta_2 \\approx 28^\\circ\\): smaller than 45°, so the ray has bent towards the normal.",
          "\\(v = c/n = 3.00 \\times 10^8 / 1.50 = 2.00 \\times 10^8\\ \\text{m/s}\\).",
        ],
        answer: "About 28°; \\(2.00 \\times 10^8\\ \\text{m/s}\\)",
      },
      selfCheckExample: {
        prompt:
          "A ray of light passes from air into a clear liquid. The angle of incidence is 60° and the angle of refraction is 30°. What is the refractive index of the liquid?",
        options: ["0.50", "0.58", "1.15", "2.00", "1.73"],
        steps: [
          "\\(n = \\sin 60^\\circ / \\sin 30^\\circ = 0.866 / 0.500 \\approx 1.73\\).",
          "Option D divides the angles themselves instead of their sines; B is the ratio upside down; C is \\(1/\\sin 60^\\circ\\).",
        ],
        answer: "(E) 1.73",
      },
      practiceSet: [
        { prompt: "What is the speed of light in glass of refractive index 1.5?", answer: "\\(2.0 \\times 10^8\\ \\text{m/s}\\)", method: "\\(c/n\\)" },
        { prompt: "A ray meets a glass surface along the normal. By how much is it bent?", answer: "Not at all" },
        { prompt: "Light of wavelength 600 nm in air enters glass with \\(n = 1.5\\). What is its wavelength in the glass?", answer: "400 nm", method: "\\(\\lambda/n\\)" },
        { prompt: "Light passes from water into air at an angle. Does it bend towards or away from the normal?", answer: "Away from the normal" },
      ],
      traps: [
        {
          title: "Refraction changes the wavelength, not the frequency",
          body: "In glass, light slows down and its wavelength shrinks by the factor \\(n\\), but its frequency, and so its colour, is unchanged. Options claiming the colour or frequency changes inside the glass are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-opt-tir",
      name: "Total internal reflection and the critical angle",
      intuition:
        "Light leaving glass for air bends away from the normal. Tilt the ray more and more, and the refracted ray swings down until it skims along the surface. That angle is the critical angle. Any steeper, and no light gets out at all: it is all reflected back inside. Optical fibres use this to trap light along a bent glass thread.",
      definition:
        "Total internal reflection (TIR) needs **both**:\n" +
        "- light travelling from a **higher** to a **lower** refractive index (glass to air, water to air), and\n" +
        "- an angle of incidence **greater than the critical angle** \\(C\\).\n" +
        "- At exactly \\(C\\) the refracted ray runs along the surface (angle of refraction 90°). From a medium of index \\(n\\) into air, \\(\\sin C = 1/n\\).\n" +
        "- Uses: **optical fibres** for communication; the **endoscope**, where one bundle of fibres carries light into the body and another carries the image out; the sparkle of diamond (very small \\(C\\)).",
      formula: {
        label: "Critical angle",
        latex: "\\sin C = \\frac{n_2}{n_1} \\qquad \\sin C = \\frac{1}{n} \\ \\text{(into air)}",
        symbols: [
          { symbol: "\\(C\\)", meaning: "critical angle, measured from the normal" },
          { symbol: "\\(n_1\\)", meaning: "refractive index of the denser medium the light starts in" },
          { symbol: "\\(n_2\\)", meaning: "refractive index of the less dense medium" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the critical angle for glass of refractive index 1.50 with air outside, and with water (1.33) outside. Is a ray inside the glass meeting the surface at 45° totally reflected in each case?",
        steps: [
          "Glass to air: \\(\\sin C = 1/1.50 = 0.667\\), so \\(C \\approx 42^\\circ\\). Since 45° is more than 42°, the ray is totally reflected.",
          "Glass to water: \\(\\sin C = 1.33/1.50 = 0.887\\), so \\(C \\approx 62^\\circ\\). Since 45° is less than 62°, most of the ray passes out into the water.",
          "Surrounding glass with a denser medium raises the critical angle and makes TIR harder.",
        ],
        answer: "About 42° (reflected) and about 62° (not reflected)",
      },
      selfCheckExample: {
        prompt: "The critical angle for a transparent plastic in air is 30°. What is the refractive index of the plastic?",
        options: ["2.0", "0.50", "1.15", "1.5", "3.0"],
        steps: [
          "\\(n = 1/\\sin C = 1/\\sin 30^\\circ = 1/0.50 = 2.0\\).",
          "Option B is \\(\\sin 30^\\circ\\) itself; C is \\(1/\\cos 30^\\circ\\), using the angle to the surface.",
        ],
        answer: "(A) 2.0",
      },
      practiceSet: [
        { prompt: "A material has \\(n = \\sqrt{2} \\approx 1.41\\). What is its critical angle in air?", answer: "45°", method: "\\(\\sin C = 1/\\sqrt{2}\\)" },
        { prompt: "Can total internal reflection happen when light goes from air into glass?", answer: "No: it needs light going from the denser to the less dense medium" },
        { prompt: "Diamond has \\(n = 2.42\\). What is its critical angle in air?", answer: "About 24°", method: "\\(\\sin C = 1/2.42\\)" },
        { prompt: "What keeps the light inside the fibres of an endoscope?", answer: "Total internal reflection at the walls of each fibre" },
      ],
      traps: [
        {
          title: "Total internal reflection only happens going into a less dense medium",
          body: "TIR needs light travelling from a higher refractive index to a lower one, at more than the critical angle. Light entering glass from air always gets in (some is partly reflected), whatever the angle.",
        },
      ],
    },
  ],
};
