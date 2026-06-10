import type { SubtopicNote } from "@/app/notes/_types";

export const GRAVITATION_ORBITS_KEPLER_ESCAPE_NOTE: SubtopicNote = {
  subtopicName: "Orbits, Kepler and Escape",
  title: "Orbits, Kepler and Escape",
  oneLineDefinition:
    "A planet's orbital period and size obey Kepler's third law T² ∝ a³; a satellite stays up on the gravitational force alone (needing no fuel), and escaping a planet's pull requires a launch speed v_e = √(2GM/R) = √(2gR).",
  whyItMatters:
    "Four PYQs, two of which are the bread-and-butter Kepler-ratio calculations (period ratio from orbit radii, and semi-major axis from a long planetary year). " +
    "One item asks what actually keeps a satellite in orbit (gravity, no fuel), and a HARD escape-speed item tests how v_e scales when a planet's radius and density change together. " +
    "Hold T² ∝ a³ and the escape-speed formula and these are reliable marks.",
  concepts: [
    // 1 — Kepler's third law (PYQs: fc86772d 8×year→a=4, 214f2065 R/4R → 1/8)
    {
      kind: "formula" as const,
      slug: "grav-keplers-third-law",
      name: "Kepler's third law — T² ∝ a³",
      intuition:
        "The farther a planet orbits, the longer its year — but not in proportion. Kepler found the square of the orbital period grows as the cube of the orbit size. So a planet four times farther out takes 4^(3/2) = 8 times as long to go round.",
      definition:
        "**Kepler's third law:** for bodies orbiting the same central mass, the square of the orbital period is proportional to the cube of the orbit's semi-major axis (for a circular orbit, its radius):\n" +
        "\\[ T^2 \\propto a^3, \\qquad \\dfrac{T_1^2}{T_2^2} = \\left(\\dfrac{a_1}{a_2}\\right)^3. \\]\n" +
        "Equivalently \\(T \\propto a^{3/2}\\). Take ratios — the constant of proportionality cancels and you never need its numerical value.",
      formula: {
        label: "Kepler's third law",
        latex: "T^2 \\propto a^3 \\qquad\\Longleftrightarrow\\qquad \\dfrac{T_1}{T_2} = \\left(\\dfrac{a_1}{a_2}\\right)^{3/2}",
        symbols: [
          { symbol: "T", meaning: "orbital period (the 'year')" },
          { symbol: "a", meaning: "semi-major axis (orbit radius for a circle)" },
        ],
      },
      visualizationSlug: "grav-kepler-orbit",
      authoredExample: {
        prompt:
          "A planet orbits the Sun at four times the Earth's orbital radius. How many Earth-years long is its year?",
        steps: [
          "Kepler: \\(T \\propto a^{3/2}\\), so \\(\\dfrac{T_p}{T_E} = \\left(\\dfrac{4}{1}\\right)^{3/2}\\).",
          "\\(4^{3/2} = (4^{1/2})^3 = 2^3 = 8\\).",
          "So the planet's year is 8 Earth-years.",
        ],
        answer: "8 Earth-years.",
      },
      selfCheckExample: {
        prompt:
          "One year on a planet is 8 times as long as one Earth-year. How does its orbital semi-major axis compare with Earth's?",
        steps: [
          "Kepler: \\(T^2 \\propto a^3\\), so \\(\\dfrac{a_p^3}{a_E^3} = \\dfrac{T_p^2}{T_E^2} = 8^2 = 64\\).",
          "Take the cube root: \\(\\dfrac{a_p}{a_E} = \\sqrt[3]{64} = 4\\).",
        ],
        answer: "The planet's semi-major axis is four times that of the Earth.",
      },
      practiceSet: [
        { prompt: "Two orbits with radii R and 4R. Ratio of periods T₁/T₂?", answer: "1/8", method: "(1/4)^(3/2)" },
        { prompt: "Orbit radius made 9 times larger. Period grows by?", answer: "27 times", method: "9^(3/2)" },
        { prompt: "Kepler's third law relates which two quantities?", answer: "T² and a³" },
        { prompt: "If period quadruples, the orbit radius grows by?", answer: "4^(2/3) ≈ 2.52 times", method: "a ∝ T^(2/3)" },
      ],
      pyqExampleId: "214f2065-97d1-4b61-bb00-8a340be70d8e", // 2020 — R/4R → 1/8
      traps: [
        {
          title: "It's T² ∝ a³, not T ∝ a",
          body:
            "Don't read Kepler's law as 'period proportional to radius'. The square of the period goes as the cube of the radius. A 4× larger orbit gives an 8× longer period (4^(3/2)), not a 4× one.",
        },
      ],
    },

    // 2 — orbital velocity (FOUNDATION-ish formula, no PYQ)
    {
      kind: "formula" as const,
      slug: "grav-orbital-velocity",
      name: "Orbital velocity — v_o = √(GM/R)",
      intuition:
        "For a satellite in a circular orbit, gravity supplies exactly the centripetal force needed to bend its path into a circle. Setting the gravitational pull equal to mv²/R and solving for the speed gives the one orbital speed that keeps the satellite at that radius — independent of the satellite's own mass.",
      definition:
        "For a circular orbit of radius \\(R\\) around a mass \\(M\\), equating gravity to the centripetal requirement, \\(\\dfrac{GMm}{R^2} = \\dfrac{mv_o^2}{R}\\), gives the **orbital velocity**\n" +
        "\\[ v_o = \\sqrt{\\dfrac{GM}{R}} = \\sqrt{gR}\\ (\\text{at the surface}). \\]\n" +
        "It does not depend on the satellite's mass. A lower orbit (smaller \\(R\\)) requires a faster orbital speed.",
      formula: {
        label: "Orbital velocity",
        latex: "v_o = \\sqrt{\\dfrac{GM}{R}}",
        symbols: [
          { symbol: "v_o", meaning: "circular orbital speed at radius R" },
          { symbol: "M", meaning: "mass of the central body" },
          { symbol: "R", meaning: "orbit radius (from the centre)" },
        ],
      },
      authoredExample: {
        prompt:
          "Show that the orbital speed of a satellite just above a planet's surface can be written as √(gR), where g is the surface gravity and R the planet's radius.",
        steps: [
          "Orbital speed: \\(v_o = \\sqrt{\\dfrac{GM}{R}}\\).",
          "Surface gravity gives \\(g = \\dfrac{GM}{R^2}\\), so \\(GM = gR^2\\).",
          "Substitute: \\(v_o = \\sqrt{\\dfrac{gR^2}{R}} = \\sqrt{gR}\\).",
        ],
        answer: "\\(v_o = \\sqrt{gR}\\).",
      },
      practiceSet: [
        { prompt: "Does the orbital speed depend on the satellite's mass?", answer: "No" },
        { prompt: "A lower orbit needs a faster or slower orbital speed?", answer: "Faster", method: "v_o ∝ 1/√R" },
        { prompt: "Orbital speed at the surface in terms of g and R?", answer: "√(gR)" },
        { prompt: "Orbital velocity formula?", answer: "√(GM/R)" },
      ],
      traps: [
        {
          title: "Orbital speed is set by the orbit, not the satellite",
          body:
            "The satellite's own mass cancels out of v_o = √(GM/R). A heavy and a light satellite at the same radius orbit at exactly the same speed; only the radius (and the planet's mass) sets it.",
        },
      ],
    },

    // 3 — escape velocity + its scaling (teach CORRECT v_e ∝ R√ρ; drill the wrong-keyed 95e70f86)
    {
      kind: "formula" as const,
      slug: "grav-escape-velocity",
      name: "Escape velocity — v_e = √(2GM/R) and how it scales",
      intuition:
        "Escape velocity is the minimum launch speed that lets a projectile leave a planet for good, never to fall back. It is √2 times the orbital speed: v_e = √(2GM/R) = √(2gR). When a problem changes a planet's radius and density together, rewrite v_e in terms of density to see how it scales — the powers can cancel in surprising ways.",
      definition:
        "The **escape velocity** from the surface of a planet of mass \\(M\\) and radius \\(R\\) is\n" +
        "\\[ v_e = \\sqrt{\\dfrac{2GM}{R}} = \\sqrt{2gR}. \\]\n" +
        "Writing \\(M = \\rho \\cdot \\tfrac{4}{3}\\pi R^3\\) gives \\(v_e = R\\sqrt{\\tfrac{8}{3}\\pi G \\rho}\\), i.e. **\\(v_e \\propto R\\sqrt{\\rho}\\)**. " +
        "So the escape speed scales with the radius times the square root of the density.",
      formula: {
        label: "Escape velocity and its density scaling",
        latex: "v_e = \\sqrt{\\dfrac{2GM}{R}} = \\sqrt{2gR}; \\qquad v_e \\propto R\\sqrt{\\rho}",
        symbols: [
          { symbol: "v_e", meaning: "escape velocity from the surface" },
          { symbol: "M, R", meaning: "planet's mass and radius" },
          { symbol: "\\rho", meaning: "planet's mean density" },
        ],
      },
      authoredExample: {
        prompt:
          "Earth's escape speed is about 11.2 km/s. A planet has twice Earth's radius and the same density. Find its escape speed.",
        steps: [
          "Use the density form \\(v_e \\propto R\\sqrt{\\rho}\\).",
          "Density unchanged (factor 1); radius doubled (factor 2). So \\(v_e\\) scales by \\(2 \\times \\sqrt{1} = 2\\).",
          "New escape speed \\(= 2 \\times 11.2 = 22.4\\) km/s.",
        ],
        answer: "About 22.4 km/s.",
      },
      selfCheckExample: {
        prompt:
          "Earth's escape speed is about 11.2 km/s. Another planet has HALF Earth's radius and FOUR times Earth's density. Find its escape speed.",
        steps: [
          "Use \\(v_e \\propto R\\sqrt{\\rho}\\).",
          "Radius factor \\(= \\tfrac{1}{2}\\); density factor \\(= 4\\), so \\(\\sqrt{\\rho}\\) factor \\(= \\sqrt{4} = 2\\).",
          "Overall \\(v_e\\) scales by \\(\\tfrac{1}{2} \\times 2 = 1\\) — unchanged.",
          "So the escape speed is the same as Earth's, about 11.2 km/s.",
        ],
        answer: "About 11.2 km/s — unchanged (the R and √ρ factors cancel).",
      },
      practiceSet: [
        { prompt: "Escape velocity is how many times the orbital speed?", answer: "√2 times", method: "v_e = √2 · v_o" },
        { prompt: "Same density, radius doubled. Escape speed?", answer: "2× (doubles)", method: "v_e ∝ R√ρ" },
        { prompt: "Escape speed in terms of g and R?", answer: "√(2gR)" },
        { prompt: "Same radius, density quadrupled. Escape speed?", answer: "2× (doubles)", method: "v_e ∝ √ρ" },
      ],
      pyqExampleId: undefined,
      traps: [
        {
          title: "Halving R while quadrupling ρ leaves v_e UNCHANGED",
          body:
            "With v_e ∝ R√ρ, a radius factor of ½ and a density factor of 4 give ½ × √4 = ½ × 2 = 1. The escape speed does not change — it stays about 11.2 km/s. The frequent slip is to combine the factors as √(½ × 2) = √1 incorrectly, or to forget that radius enters linearly while density enters as a square root.",
        },
        {
          title: "Escape velocity is independent of the projectile's mass and launch angle",
          body:
            "v_e = √(2GM/R) contains no reference to the escaping body's mass or the direction of launch — it is the same minimum speed for a pebble or a rocket, fired in any direction (ignoring air and obstacles).",
        },
      ],
    },

    // 4 — satellite facts (PYQ: 0a22e116 no energy needed)
    {
      kind: "formula" as const,
      slug: "grav-satellite-facts",
      name: "What keeps a satellite up — no fuel required",
      intuition:
        "A satellite in a stable orbit is in continuous free fall: gravity bends its straight-line motion into a closed curve, and because there is no air to slow it (in space), it needs no engine, no fuel and no remote control to keep going. It simply falls around the Earth forever.",
      definition:
        "A satellite in a **stable orbit needs no energy input** to stay there. " +
        "Gravity supplies the centripetal force, and with negligible atmospheric drag there is nothing to dissipate its energy — so it coasts indefinitely without rockets, solar power or ground control to maintain the orbit. " +
        "Engines are needed only to reach orbit, change orbit, or fight residual drag — not to remain in a given orbit.",
      formula: {
        label: "Orbit is sustained by gravity alone",
        latex: "F_{\\text{gravity}} = \\dfrac{GMm}{R^2} = \\dfrac{mv_o^2}{R} \\;\\Rightarrow\\; \\text{no propulsion needed}",
        symbols: [
          { symbol: "F_{\\text{gravity}}", meaning: "gravitational pull = the centripetal force" },
          { symbol: "v_o", meaning: "orbital speed" },
        ],
      },
      authoredExample: {
        prompt:
          "A communications satellite has been in a stable orbit for years without firing its engines. What provides the force that keeps it on its circular path?",
        steps: [
          "On a circular orbit the satellite needs a centripetal force directed toward Earth.",
          "Earth's gravity supplies exactly this force.",
          "With no atmosphere to slow it, no additional energy or propulsion is required to maintain the orbit.",
        ],
        answer: "Earth's gravity alone — the satellite needs no energy to stay in orbit.",
      },
      selfCheckExample: {
        prompt:
          "Which statement about a satellite orbiting the Earth is correct: (a) it is held up by remote control, (b) retro-rockets keep it moving, (c) it needs solar panels and fuel to orbit, or (d) it requires no energy for orbiting?",
        steps: [
          "Gravity provides the centripetal force, so no external steering or thrust is needed to maintain the orbit.",
          "In the near-vacuum of space there is no drag to dissipate energy.",
          "Therefore the satellite requires no energy to keep orbiting.",
        ],
        answer: "(d) The satellite does not require any energy for orbiting.",
      },
      practiceSet: [
        { prompt: "What force keeps a satellite in its circular orbit?", answer: "Earth's gravity (centripetal)" },
        { prompt: "Does a satellite need fuel to STAY in a stable orbit?", answer: "No" },
        { prompt: "Why can a satellite orbit indefinitely without engines?", answer: "No drag in space; gravity alone bends its path" },
        { prompt: "When does a satellite need its engines?", answer: "To reach or change orbit, or fight drag — not to remain in one" },
      ],
      pyqExampleId: "0a22e116-8427-4866-8375-e43fdbfff9c5", // 2017 — no energy needed
      traps: [
        {
          title: "Orbiting needs no fuel — gravity does the work",
          body:
            "A satellite is not 'held up' by rockets, remote control or solar power. It is in free fall, and gravity supplies the centripetal force. With no atmosphere to slow it, it coasts without any energy input.",
        },
      ],
    },
  ],
};
