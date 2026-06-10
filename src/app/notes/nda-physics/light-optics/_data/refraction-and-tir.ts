import type { SubtopicNote } from "@/app/notes/_types";

export const REFRACTION_AND_TIR_NOTE: SubtopicNote = {
  subtopicName: "Refraction, Speed of Light and TIR",
  title: "Refraction, Speed of Light, and Total Internal Reflection",
  oneLineDefinition:
    "Light bends when it changes medium because its speed changes — toward the normal entering a denser medium, away from it entering a rarer one. Refractive index n = c/v measures the slow-down. Past a critical angle, light going denser-to-rarer is reflected back entirely (TIR), which powers the mirage and optical fibre.",
  whyItMatters:
    "Seventeen PYQs and a rich vein of EASY recall plus clean numerics. The recurring tests are: which way light bends, the constant-frequency fact, n = c/v (so higher n means lower speed), speed ratios between media, and the everyday effects — raised pool bottom, twinkling stars, the early sunrise, the mirage, and the optical fibre. The single HARD question here is a TIR retrace-the-path geometry problem.",
  concepts: [
    // 1 — refraction + Snell's law + frequency unchanged
    {
      kind: "formula" as const,
      slug: "refraction-and-snells-law",
      name: "Refraction and Snell's law",
      intuition:
        "When light crosses into a new medium its speed changes, and that forces the ray to change direction — unless it hits the surface dead-on. Going into a denser medium (slower) it bends TOWARD the normal; coming out into a rarer medium (faster) it bends AWAY. One thing never changes across the boundary: the frequency.",
      definition:
        "**Snell's law:** \\(n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\) — relates the angles to the refractive indices on each side.\n" +
        "- Rarer → denser: ray bends **toward** the normal.\n" +
        "- Denser → rarer: ray bends **away** from the normal.\n" +
        "- **Normal incidence** (angle 0°): the ray goes **straight through**, unbent, even though its speed still changes.\n" +
        "Across the boundary the **frequency stays the same** (it is set by the source); the **speed and wavelength change** together, and the colour (which tracks frequency) is preserved.",
      formula: {
        label: "Snell's law of refraction",
        latex: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2",
        symbols: [
          { symbol: "n_1, n_2", meaning: "refractive indices of the two media" },
          { symbol: "\\theta_1", meaning: "angle of incidence (from the normal)" },
          { symbol: "\\theta_2", meaning: "angle of refraction (from the normal)" },
        ],
      },
      authoredExample: {
        prompt:
          "A ray of light passes from air into water at an angle of incidence of 0° (straight down onto the surface). What happens to its direction and frequency?",
        steps: [
          "At 0° incidence the ray travels along the normal, so \\(\\sin\\theta_1 = 0\\) forces \\(\\sin\\theta_2 = 0\\) — no bending.",
          "The ray goes straight through, though it slows down in the water.",
          "Frequency is set by the source and is unchanged across the boundary.",
        ],
        answer: "It goes straight (undeviated); its frequency is unchanged (speed and wavelength decrease).",
      },
      selfCheckExample: {
        prompt:
          "Light passes from air into glass. Which one of these is the SAME for the incident and refracted wave: speed, direction, wavelength, or frequency?",
        steps: [
          "Crossing into glass, the speed drops, the wavelength shortens, and the direction bends — all change.",
          "Only the frequency is fixed by the source and carries through unchanged.",
        ],
        answer: "Frequency.",
      },
      practiceSet: [
        { prompt: "Light going from air into water bends toward or away from the normal?", answer: "Toward the normal" },
        { prompt: "Which quantity is unchanged when light refracts: speed, frequency, or wavelength?", answer: "Frequency" },
        { prompt: "At 0° angle of incidence, does the ray bend?", answer: "No, it goes straight" },
        { prompt: "Denser-to-rarer: bends toward or away from normal?", answer: "Away from the normal" },
      ],
      pyqExampleId: "3afd1b89-fa86-49d8-a482-066acd76555f", // 2021 — frequency unchanged on refraction
      traps: [
        {
          title: "Frequency is the invariant — not speed or wavelength",
          body:
            "When asked what stays the same across a refraction boundary, the answer is always frequency. Speed and wavelength both change (in proportion); direction changes unless incidence is 0°.",
        },
        {
          title: "Normal incidence still slows the light",
          body:
            "At 0° incidence the ray does not bend, but it does change speed (and wavelength). 'No bending' is not the same as 'no change'.",
        },
      ],
    },

    // 2 — refractive index n = c/v
    {
      kind: "formula" as const,
      slug: "refractive-index-and-speed",
      name: "Refractive index — n = c/v",
      intuition:
        "Refractive index just measures how much a medium slows light down. The bigger the n, the slower light moves through it (and the more it bends). Since light is fastest in vacuum, n is always greater than 1 for any real material — and a denser medium has the bigger n and the smaller speed.",
      definition:
        "The (absolute) **refractive index** is \\(n = c/v\\), the ratio of the speed of light in vacuum to its speed in the medium.\n" +
        "- \\(n > 1\\) for every material medium (light is slowest in matter, fastest in vacuum).\n" +
        "- Higher \\(n\\) ⟹ **lower speed** \\(v\\) (inverse relationship): \\(v = c/n\\).\n" +
        "- Comparing two media, \\(\\dfrac{v_1}{v_2} = \\dfrac{n_2}{n_1}\\) — the speed ratio is the INVERSE of the index ratio.",
      formula: {
        label: "Refractive index and speed",
        latex: "n = \\dfrac{c}{v} \\quad\\Rightarrow\\quad v = \\dfrac{c}{n}, \\qquad \\dfrac{v_1}{v_2} = \\dfrac{n_2}{n_1}",
        symbols: [
          { symbol: "n", meaning: "refractive index of the medium" },
          { symbol: "c", meaning: "speed of light in vacuum (≈ 3 × 10⁸ m/s)" },
          { symbol: "v", meaning: "speed of light in the medium" },
        ],
      },
      authoredExample: {
        prompt:
          "The refractive index of a glass is 1.5. If the speed of light in vacuum is c, what is the speed of light in this glass?",
        steps: [
          "Use \\(v = c/n\\).",
          "\\(v = c / 1.5 = 2c/3\\).",
          "So light travels at two-thirds of its vacuum speed in this glass.",
        ],
        answer: "\\(v = (2/3)c\\).",
      },
      selfCheckExample: {
        prompt:
          "Two media have refractive indices 4/3 (water) and 3/2 (glass). What is the ratio of the speed of light in glass to that in water?",
        steps: [
          "Speed ratio is the inverse of index ratio: \\(\\dfrac{v_\\text{glass}}{v_\\text{water}} = \\dfrac{n_\\text{water}}{n_\\text{glass}}\\).",
          "\\(= \\dfrac{4/3}{3/2} = \\dfrac{4}{3} \\times \\dfrac{2}{3} = \\dfrac{8}{9}\\).",
          "Glass has the higher index, so light is slower in it — ratio less than 1, as expected.",
        ],
        answer: "\\(v_\\text{glass} : v_\\text{water} = 8 : 9\\).",
      },
      practiceSet: [
        { prompt: "If n = 2, the speed of light in the medium is what fraction of c?", answer: "c/2", method: "v = c/n" },
        { prompt: "Higher refractive index means higher or lower light speed?", answer: "Lower speed" },
        { prompt: "Refractive index of any real medium (vs air) is always…", answer: "Greater than 1" },
        { prompt: "Medium A has n = 1.4, medium B has n = 1.8. Which has faster light?", answer: "A (lower n)" },
      ],
      pyqExampleId: "ecbd184b-e12a-42c0-ba16-8f6889bd6d3a", // 2022 — n = 3/2 → v = 2c/3
      traps: [
        {
          title: "Speed is the INVERSE of refractive index",
          body:
            "Higher n means slower light, not faster. When comparing two media, flip the ratio: v₁/v₂ = n₂/n₁. The most-missed step is keeping the index ratio instead of inverting it.",
        },
      ],
    },

    // 3 — everyday refraction effects
    {
      kind: "formula" as const,
      slug: "everyday-refraction-effects",
      name: "Everyday refraction effects",
      intuition:
        "Refraction explains a whole cluster of familiar sights: a pool looks shallower than it is, a coin or lemon in water looks raised and bigger, stars twinkle, and the Sun is visible a little before it actually rises. All of these are the same idea — light bending as it passes through media (or air layers) of different density.",
      definition:
        "Refraction at work in everyday life:\n" +
        "- **Apparent depth:** the bottom of a water tank looks **raised** (apparent depth = real depth / n). A lemon or coin in water looks shallower and larger.\n" +
        "- **Twinkling of stars:** starlight passes through air layers of varying density and refracts continually, so the star's apparent position and brightness flicker. (Planets twinkle far less.)\n" +
        "- **Early sunrise / late sunset:** atmospheric refraction bends sunlight over the horizon, so we see the Sun a couple of minutes **before** it actually rises and **after** it sets.\n" +
        "These are refraction effects — distinct from scattering (which colours the sky).",
      authoredExample: {
        prompt:
          "A coin lies at the bottom of a 1.6 m deep tank of water (n = 4/3). At what depth does it appear to be when viewed from straight above?",
        steps: [
          "Apparent depth = real depth / n.",
          "\\(= 1.6 / (4/3) = 1.6 \\times 3/4 = 1.2\\) m.",
          "So the bottom appears raised — at 1.2 m instead of 1.6 m.",
        ],
        answer: "1.2 m (the bottom looks raised by 0.4 m).",
      },
      selfCheckExample: {
        prompt:
          "Why does the Sun appear to rise a few minutes before it has geometrically risen above the horizon?",
        steps: [
          "Earth's atmosphere is denser near the surface, so sunlight bends as it passes through layers of varying density.",
          "This atmospheric refraction lifts the Sun's apparent position above its true position.",
          "We therefore see it slightly before sunrise (and after sunset).",
        ],
        answer: "Atmospheric refraction bends the light over the horizon.",
      },
      practiceSet: [
        { prompt: "Why does a tank bottom appear raised?", answer: "Refraction of light" },
        { prompt: "Twinkling of stars is due to atmospheric…", answer: "Refraction" },
        { prompt: "Apparent depth of an object 2 m deep in water (n = 4/3)?", answer: "1.5 m", method: "real depth / n" },
        { prompt: "A lemon in water looks larger because of…", answer: "Refraction of light" },
      ],
      pyqExampleId: "dfbe684a-ff58-4108-87cc-7b357c797179", // 2025 — raised tank bottom
      traps: [
        {
          title: "Twinkling = refraction; blue sky / red sunset = scattering",
          body:
            "Twinkling of stars and the early sunrise are REFRACTION effects. The blue colour of the sky and the red of sunset are SCATTERING (covered in Light Phenomena). Don't mix the two up — NDA tests both in the same paper.",
        },
      ],
    },

    // 4 — TIR + critical angle
    {
      kind: "formula" as const,
      slug: "total-internal-reflection",
      name: "Total internal reflection and the critical angle",
      intuition:
        "When light tries to leave a denser medium for a rarer one, it bends away from the normal — and as you increase the incidence angle, the refracted ray tilts further until, at the critical angle, it grazes the surface. Push past that angle and the light cannot escape at all: it is reflected entirely back inside. That all-or-nothing reflection is total internal reflection.",
      definition:
        "**Total internal reflection (TIR)** occurs when light travels from a **denser to a rarer** medium AND the angle of incidence exceeds the **critical angle** \\(\\theta_c\\).\n" +
        "- At the critical angle the refracted ray grazes along the surface (angle of refraction = 90°).\n" +
        "- **Critical angle:** \\(\\sin\\theta_c = \\dfrac{n_2}{n_1} = \\dfrac{1}{n}\\) (for a medium of index n against air).\n" +
        "- Two conditions are BOTH required: denser → rarer, and incidence > critical angle.\n" +
        "Higher refractive index ⟹ smaller critical angle (light is trapped more easily).",
      visualizationSlug: "opt-refraction-tir",
      formula: {
        label: "Critical angle",
        latex: "\\sin\\theta_c = \\dfrac{1}{n}",
        symbols: [
          { symbol: "\\theta_c", meaning: "critical angle (denser→rarer)" },
          { symbol: "n", meaning: "refractive index of the denser medium (vs air)" },
        ],
      },
      authoredExample: {
        prompt:
          "A medium has refractive index 2. Find its critical angle for light going from the medium into air.",
        steps: [
          "Use \\(\\sin\\theta_c = 1/n\\).",
          "\\(\\sin\\theta_c = 1/2\\), so \\(\\theta_c = 30°\\).",
          "Any ray hitting the surface at more than 30° is totally internally reflected.",
        ],
        answer: "\\(\\theta_c = 30°\\).",
      },
      selfCheckExample: {
        prompt:
          "Light is travelling inside a glass block toward its surface with air outside. State the two conditions needed for total internal reflection to occur.",
        steps: [
          "TIR needs the light to be going from the denser medium (glass) to the rarer medium (air) — it cannot happen going the other way.",
          "And the angle of incidence inside the glass must exceed the critical angle.",
          "Both conditions must hold together.",
        ],
        answer: "Denser → rarer medium, AND angle of incidence greater than the critical angle.",
      },
      practiceSet: [
        { prompt: "TIR happens going from which medium to which?", answer: "Denser to rarer" },
        { prompt: "Critical angle of a medium with n = √2?", answer: "45°", method: "sin θc = 1/√2" },
        { prompt: "At the critical angle, the angle of refraction is…", answer: "90° (grazes the surface)" },
        { prompt: "Higher refractive index gives a larger or smaller critical angle?", answer: "Smaller" },
      ],
      pyqExampleId: "6bb79606-238f-474e-aeb0-e7833627adf9", // mirage — TIR illustration (non-imaged; cf479505 stays a drill)
      traps: [
        {
          title: "TIR only goes denser → rarer",
          body:
            "Total internal reflection cannot occur when light enters a denser medium. The light must be in the denser medium trying to escape into the rarer one. Miss this and the whole setup is wrong.",
        },
        {
          title: "Both conditions, not just a big angle",
          body:
            "A large angle of incidence alone is not enough — it must EXCEED the critical angle, and the direction must be denser-to-rarer. At exactly the critical angle you get grazing refraction, not TIR.",
        },
      ],
    },

    // 5 — TIR applications: mirage, optical fibre
    {
      kind: "formula" as const,
      slug: "tir-applications",
      name: "Mirage and the optical fibre",
      intuition:
        "Total internal reflection is not just a lab curiosity — it makes the shimmering 'water' on a hot road and carries your internet down a glass thread. On a hot day, layers of air near the ground act like media of decreasing density, so light from the sky bends and finally reflects, fooling you into seeing a pool. An optical fibre traps light by bouncing it off its walls again and again, never letting it leak out.",
      definition:
        "Applications of TIR:\n" +
        "- **Mirage** (desert / hot road): hot air near the ground is rarer than the cooler air above; light from the sky refracts through these layers and undergoes **total internal reflection**, so the ground looks like a reflecting water surface. (It involves BOTH progressive refraction AND total internal reflection.)\n" +
        "- **Optical fibre:** light entering one end strikes the walls beyond the critical angle and is totally internally reflected over and over, travelling a zig-zag path with almost no loss — even around bends.\n" +
        "- Also: sparkle of diamonds (small critical angle ≈ 24°), prism periscopes, and endoscopes.",
      authoredExample: {
        prompt:
          "Explain why light can travel along a long, curved optical fibre without escaping through its sides.",
        steps: [
          "The fibre core is optically denser than its surrounding cladding.",
          "Light entering the core strikes the core-cladding boundary at an angle greater than the critical angle.",
          "So it is totally internally reflected at every bounce, repeating all the way along — even round bends — losing almost no energy.",
        ],
        answer: "Repeated total internal reflection traps the light inside the core.",
      },
      selfCheckExample: {
        prompt:
          "A mirage seen on a hot desert road is an example of which optical phenomena?",
        steps: [
          "Hot air near the ground is rarer; cooler air above is denser.",
          "Light from the sky refracts gradually through these layers (refraction).",
          "It eventually exceeds the critical angle and is totally internally reflected, appearing as a water-like surface.",
        ],
        answer: "Both refraction and total internal reflection of light.",
      },
      practiceSet: [
        { prompt: "An optical fibre carries light by repeated…", answer: "Total internal reflection" },
        { prompt: "A desert mirage is based on which phenomenon?", answer: "Total internal reflection (with refraction)" },
        { prompt: "The brilliance/sparkle of a diamond is due to…", answer: "Total internal reflection (small critical angle)" },
        { prompt: "Can an optical fibre guide light around a bend?", answer: "Yes, by TIR at each bounce" },
      ],
      pyqExampleId: "4223dc14-ba31-4398-aa75-ab38df2d86be", // 2019 — optical fibre TIR
      traps: [
        {
          title: "Mirage is TIR, not simple reflection or dispersion",
          body:
            "A mirage is often miscalled 'reflection' or 'dispersion'. It is total internal reflection (preceded by gradual refraction through hot-air layers). The desert/hot-road illusion is the standard NDA cue for TIR.",
        },
      ],
    },
  ],
};
