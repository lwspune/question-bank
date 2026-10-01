import type { SubtopicNote } from "@/app/notes/_types";

export const SATELLITES_GRAV_NOTE: SubtopicNote = {
  subtopicName: "Satellites: Orbital Speed, Energy and Mutual Orbits",
  title: "Satellites: Orbital Speed, Energy and Mutual Orbits",
  oneLineDefinition:
    "Gravity supplies the centripetal force, so v = √(GM/r) and T = 2π√(r³/GM); in orbit KE = GMm/2r, PE = −2KE and the total energy is −GMm/2r.",
  whyItMatters:
    "Twenty-eight PYQs, twenty-four of them multiple choice, and two from 2026. Thirteen ask for an orbit's speed, period, height or angular momentum; eight for its energy or the energy to change orbit; seven for bodies that orbit each other. The four numeric-answer questions all sit in the first two groups, and every one of the twenty-eight starts from the same line: gravity equals mv²/r.",
  concepts: [
    // C1 — orbital speed, period and angular momentum
    {
      kind: "formula" as const,
      slug: "jpgrav-orbital-speed",
      name: "Orbital speed, period and angular momentum",
      intuition:
        "In a circular orbit, gravity is the only force, and it supplies exactly the centripetal force. Setting \\(GMm/r^{2} = mv^{2}/r\\) cancels the satellite's mass, so every satellite at the same radius moves at the same speed. Period and angular momentum follow from v and r.",
      definition:
        "- \\(v_o = \\sqrt{\\dfrac{GM}{r}} = \\sqrt{\\dfrac{gR^{2}}{R + h}}\\), with \\(r = R + h\\). It is independent of the satellite's mass and falls as \\(1/\\sqrt{r}\\).\n" +
        "- Grazing orbit: \\(v_o = \\sqrt{gR} \\approx 7.9\\) km/s (8 km/s with g = 10).\n" +
        "- \\(T = \\dfrac{2\\pi r}{v_o} = 2\\pi\\sqrt{\\dfrac{r^{3}}{GM}}\\). Grazing orbit: \\(T = 2\\pi\\sqrt{R/g} = \\sqrt{\\dfrac{3\\pi}{G\\rho}}\\), about 84 min, set by density alone.\n" +
        "- Height from the period: \\(h = \\left(\\dfrac{gR^{2}T^{2}}{4\\pi^{2}}\\right)^{1/3} - R\\).\n" +
        "- \\(L = mv_or = m\\sqrt{GMr}\\), so \\(L \\propto m\\sqrt{r}\\).\n" +
        "- For a central potential \\(U = -C/r\\), the same balance gives \\(r \\propto 1/v^{2}\\).",
      formula: {
        label: "Circular orbit of radius r",
        latex: "v_o = \\sqrt{\\frac{GM}{r}} \\qquad T = 2\\pi\\sqrt{\\frac{r^{3}}{GM}} \\qquad L = m\\sqrt{GMr}",
      },
      authoredExample: {
        prompt:
          "A satellite orbits at a height equal to the earth's radius. Find its speed and period. Take \\(g = 10\\ \\text{m/s}^{2}\\) and \\(R = 6.4 \\times 10^{6}\\) m.",
        steps: [
          "\\(r = 2R\\), and \\(GM = gR^{2}\\).",
          "\\(v_o = \\sqrt{\\dfrac{gR^{2}}{2R}} = \\sqrt{\\dfrac{gR}{2}} = \\sqrt{3.2 \\times 10^{7}} = 5.66 \\times 10^{3}\\) m/s.",
          "\\(T = \\dfrac{2\\pi r}{v_o} = \\dfrac{2\\pi \\times 1.28 \\times 10^{7}}{5.66 \\times 10^{3}} = 1.42 \\times 10^{4}\\) s.",
          "\\(1.42 \\times 10^{4}\\) s is about 3.95 hours.",
        ],
        answer: "\\(v_o \\approx 5.7\\) km/s, \\(T \\approx 3.95\\) h",
      },
      selfCheckExample: {
        prompt:
          "Two satellites circle a planet at radii 9R and R. Find the ratio of their speeds.",
        steps: [
          "\\(v_o \\propto \\dfrac{1}{\\sqrt{r}}\\).",
          "\\(\\dfrac{v_{9R}}{v_R} = \\sqrt{\\dfrac{R}{9R}} = \\dfrac{1}{3}\\).",
        ],
        answer: "\\(1 : 3\\)",
      },
      practiceSet: [
        { prompt: "Speed of a grazing orbit with \\(g = 10\\ \\text{m/s}^{2}\\) and \\(R = 6.4 \\times 10^{6}\\) m?", answer: "8 km/s" },
        { prompt: "The orbit radius of a satellite is doubled. Factor by which its angular momentum changes?", answer: "\\(\\sqrt{2}\\)" },
        { prompt: "Period of a grazing orbit in terms of the planet's density?", answer: "\\(\\sqrt{3\\pi/(G\\rho)}\\)" },
        { prompt: "Two satellites of masses m and 4m share an orbit. Ratio of their speeds?", answer: "\\(1 : 1\\)" },
      ],
      pyqExampleId: "c39fcd36-60fa-4278-b445-e0bffe42895a", // 23 Jan 2025: mass M/2 at height R/3, L = M√(GMR/x) → x = 3
      traps: [
        {
          title: "r is R + h",
          body: "Orbit formulas use the distance from the centre. A satellite 'at a height R' has r = 2R. Putting h in place of r is the commonest error on this page.",
        },
        {
          title: "Speed does not depend on the satellite's mass; L does",
          body: "Two satellites in the same orbit have equal speed and period whatever their masses. Their angular momentum and energy scale with mass.",
        },
      ],
    },

    // C2 — orbital energy
    {
      kind: "formula" as const,
      slug: "jpgrav-orbit-energy",
      name: "Energy of a satellite and the energy to change orbit",
      intuition:
        "In a circular orbit the kinetic energy is exactly half the size of the potential energy. The total is negative, so the satellite is bound. Moving to a higher orbit makes the total less negative, which costs energy, even though the satellite ends up moving more slowly.",
      definition:
        "- \\(KE = \\dfrac{GMm}{2r}\\), \\(U = -\\dfrac{GMm}{r}\\), \\(E = -\\dfrac{GMm}{2r}\\).\n" +
        "- So \\(U = -2KE\\), \\(E = -KE\\) and \\(U = 2E\\).\n" +
        "- Binding energy (energy to free it from orbit) \\(= +\\dfrac{GMm}{2r}\\).\n" +
        "- From radius \\(r_1\\) to \\(r_2\\): \\(\\Delta E = \\dfrac{GMm}{2}\\left(\\dfrac{1}{r_1} - \\dfrac{1}{r_2}\\right)\\).\n" +
        "- From the surface (at rest, ignoring the spin) into orbit at r: \\(\\Delta E = GMm\\left(\\dfrac{1}{R} - \\dfrac{1}{2r}\\right)\\).\n" +
        "- Energies scale with the satellite's mass: \\(\\dfrac{E_A}{E_B} = \\dfrac{m_A}{m_B} \\cdot \\dfrac{r_B}{r_A}\\).",
      formula: {
        label: "Energies in a circular orbit",
        latex: "KE = \\frac{GMm}{2r} \\quad U = -\\frac{GMm}{r} \\quad E = -\\frac{GMm}{2r} \\qquad \\Delta E = \\frac{GMm}{2}\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)",
      },
      authoredExample: {
        prompt:
          "A 200 kg satellite is moved from a circular orbit of radius 2R to one of radius 4R. How much energy is needed? Take \\(g = 10\\ \\text{m/s}^{2}\\) and \\(R = 6.4 \\times 10^{6}\\) m.",
        steps: [
          "\\(\\Delta E = \\dfrac{GMm}{2}\\left(\\dfrac{1}{2R} - \\dfrac{1}{4R}\\right) = \\dfrac{GMm}{8R}\\).",
          "With \\(GM = gR^{2}\\): \\(\\Delta E = \\dfrac{mgR}{8}\\).",
          "\\(\\dfrac{200 \\times 10 \\times 6.4 \\times 10^{6}}{8} = 1.6 \\times 10^{9}\\) J.",
        ],
        answer: "\\(1.6 \\times 10^{9}\\) J",
      },
      selfCheckExample: {
        prompt:
          "A 500 kg satellite circles a planet at \\(r = 8 \\times 10^{6}\\) m, where \\(GM = 4 \\times 10^{14}\\ \\text{m}^{3}/\\text{s}^{2}\\). Find its kinetic, potential and total energy.",
        steps: [
          "\\(KE = \\dfrac{GMm}{2r} = \\dfrac{4 \\times 10^{14} \\times 500}{1.6 \\times 10^{7}} = 1.25 \\times 10^{10}\\) J.",
          "\\(U = -2KE = -2.5 \\times 10^{10}\\) J.",
          "\\(E = -KE = -1.25 \\times 10^{10}\\) J.",
        ],
        answer: "\\(KE = 1.25 \\times 10^{10}\\) J, \\(U = -2.5 \\times 10^{10}\\) J, \\(E = -1.25 \\times 10^{10}\\) J",
      },
      practiceSet: [
        { prompt: "Total energy E of a satellite. Its potential energy in terms of E?", answer: "\\(2E\\)" },
        { prompt: "Energy to put m from rest on the surface into an orbit of radius 2R?", answer: "\\(\\dfrac{3GMm}{4R}\\)" },
        { prompt: "Two satellites share an orbit; one has twice the other's mass. Which quantities are equal?", answer: "Speed and period" },
        { prompt: "Masses in ratio 2 : 1, orbit radii r and 2r. Ratio of total energies?", answer: "\\(4 : 1\\)" },
      ],
      pyqExampleId: "c169d508-fc0d-4fa2-8b11-5d8726395f3a", // 21 Jan 2026 S1: 100 kg from 1.5R to 3R → α = 1000
      traps: [
        {
          title: "PE is 2E, not E/2",
          body: "Since E = −GMm/2r and U = −GMm/r, U = 2E. A statement that says PE is half the total energy is false.",
        },
        {
          title: "Higher orbit: more energy, less speed",
          body: "Raising a satellite needs energy, yet its kinetic energy falls. The extra energy, and more, goes into potential energy.",
        },
        {
          title: "Launching is not the same as changing orbits",
          body: "From the ground at rest, the start energy is −GMm/R with no kinetic energy, so ΔE = GMm(1/R − 1/2r). The orbit-to-orbit formula uses −GMm/2r at both ends.",
        },
      ],
    },

    // C3 — mutual orbits: two-body, four-body, binary stars
    {
      kind: "formula" as const,
      slug: "jpgrav-mutual-orbits",
      name: "Bodies orbiting each other",
      intuition:
        "When bodies circle under their own attraction, each goes round the common centre of mass. The force uses the distance BETWEEN the bodies; the centripetal term uses each body's own radius about the centre of mass. Keeping these two distances apart is the whole problem.",
      definition:
        "- Two equal masses m on a circle of radius r: separation \\(2r\\), so \\(\\dfrac{Gm^{2}}{(2r)^{2}} = \\dfrac{mv^{2}}{r}\\), giving \\(v = \\sqrt{\\dfrac{Gm}{4r}}\\) and \\(\\omega = \\sqrt{\\dfrac{Gm}{4r^{3}}}\\).\n" +
        "- Binary stars \\(m_1, m_2\\) a distance d apart: radii \\(r_1 = \\dfrac{m_2d}{m_1 + m_2}\\), \\(r_2 = \\dfrac{m_1d}{m_1 + m_2}\\), so \\(m_1r_1 = m_2r_2\\).\n" +
        "- Both share one period: \\(T = 2\\pi\\sqrt{\\dfrac{d^{3}}{G(m_1 + m_2)}}\\).\n" +
        "- Four equal masses M on a circle of radius R: net inward pull \\(\\dfrac{GM^{2}}{R^{2}}\\left(\\dfrac{1}{4} + \\dfrac{1}{\\sqrt{2}}\\right)\\), so \\(v = \\dfrac{1}{2}\\sqrt{\\dfrac{GM(1 + 2\\sqrt{2})}{R}}\\).",
      formula: {
        label: "Binary system",
        latex: "\\frac{Gm_1m_2}{d^{2}} = m_1\\omega^{2}r_1 = m_2\\omega^{2}r_2 \\qquad T = 2\\pi\\sqrt{\\frac{d^{3}}{G(m_1 + m_2)}}",
      },
      authoredExample: {
        prompt:
          "Two stars of masses 3m and m, a distance d apart, circle their common centre of mass. Find the period.",
        steps: [
          "The lighter star is at \\(r = \\dfrac{3m \\cdot d}{4m} = \\dfrac{3d}{4}\\) from the centre of mass.",
          "For it: \\(\\dfrac{G(3m)(m)}{d^{2}} = m\\omega^{2} \\cdot \\dfrac{3d}{4}\\), so \\(\\omega^{2} = \\dfrac{4Gm}{d^{3}}\\).",
          "\\(T = \\dfrac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\dfrac{d^{3}}{4Gm}} = \\pi\\sqrt{\\dfrac{d^{3}}{Gm}}\\).",
          "Check with the general formula: total mass 4m gives the same result.",
        ],
        answer: "\\(\\pi\\sqrt{\\dfrac{d^{3}}{Gm}}\\)",
      },
      selfCheckExample: {
        prompt:
          "Two particles of 2 kg each go round a circle of radius 1 m under their mutual attraction alone. Find their speed.",
        steps: [
          "They sit at opposite ends of a diameter, 2 m apart.",
          "\\(\\dfrac{G \\times 2 \\times 2}{2^{2}} = \\dfrac{2v^{2}}{1}\\), so \\(v^{2} = \\dfrac{G}{2} = 3.34 \\times 10^{-11}\\).",
        ],
        answer: "\\(v = \\sqrt{G/2} \\approx 5.8 \\times 10^{-6}\\) m/s",
      },
      practiceSet: [
        { prompt: "Binary stars \\(m_1\\) and \\(m_2\\): ratio of their orbit radii \\(r_1/r_2\\)?", answer: "\\(m_2/m_1\\)" },
        { prompt: "Two equal masses m on a circle of radius a. Angular speed?", answer: "\\(\\sqrt{\\dfrac{Gm}{4a^{3}}}\\)" },
        { prompt: "Period of a binary of total mass M and separation d?", answer: "\\(2\\pi\\sqrt{\\dfrac{d^{3}}{GM}}\\)" },
        { prompt: "Four equal masses M on a circle of radius R. Their speed?", answer: "\\(\\dfrac{1}{2}\\sqrt{\\dfrac{GM(1 + 2\\sqrt{2})}{R}}\\)" },
      ],
      pyqExampleId: "1b5739fd-4e24-4381-a5a4-d0c22a88ed90", // 2021: stars m and 2m a distance d apart → 2π√(d³/3Gm)
      traps: [
        {
          title: "The separation is 2r, not r",
          body: "Two equal masses on a circle of radius r are 2r apart. Using r in Gm²/r² makes the speed twice too large.",
        },
        {
          title: "Two different distances in one equation",
          body: "In a binary, the force uses the separation d; the centripetal term uses the star's own radius about the centre of mass. Each star's radius is the OTHER star's share of the total mass times d.",
        },
      ],
    },
  ],
};
