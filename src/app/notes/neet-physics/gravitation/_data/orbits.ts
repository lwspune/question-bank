import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_GR_ORBITS_NOTE: SubtopicNote = {
  subtopicName: "Kepler's Laws and Satellites",
  title: "Kepler's Laws and Satellites",
  oneLineDefinition:
    "Kepler's three laws of planetary motion, and the orbital speed, period and energy of a satellite held in a circular orbit by gravity.",
  whyItMatters:
    "Four NEET questions from 2023 to 2026. Two use Kepler's third law: a year on Mercury worked out from Mars's year (2025), and how a planet's period depends on its orbit radius (Re-NEET 2026). Two are about satellites: the period of a satellite just above the surface in terms of the earth's density (2023), and the least energy to launch a satellite into an orbit at a height of 2R (2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphgr-kepler",
      name: "Kepler's laws of planetary motion",
      visualizationSlug: "grav-kepler-orbit",
      intuition:
        "Kepler found three rules by studying how the planets move. Orbits are ellipses, not perfect circles. A planet speeds up as it swings close to the sun and slows down far away. And planets farther out take much longer to go round, more than the extra distance alone would suggest.",
      definition:
        "- **Law of orbits:** each planet moves in an ellipse with the sun at one focus.\n" +
        "- **Law of areas:** the line from the sun to the planet sweeps out equal areas in equal times. This follows from conservation of angular momentum, since gravity pulls along that line and gives no torque. So the planet moves fastest when nearest the sun (perihelion) and slowest when farthest (aphelion): \\(v_pr_p = v_ar_a\\).\n" +
        "- **Law of periods:** \\(T^{2} \\propto a^{3}\\), where a is the semi-major axis (the radius, for a circular orbit). So \\(T \\propto a^{3/2}\\).\n" +
        "- For two planets: \\(\\left(\\dfrac{T_1}{T_2}\\right)^{2} = \\left(\\dfrac{a_1}{a_2}\\right)^{3}\\).\n" +
        "- Along the orbit the speed, kinetic energy and potential energy all change, but the angular momentum and the total energy stay the same.",
      formula: {
        label: "Law of periods",
        latex: "T^{2} \\propto a^{3}, \\qquad \\left(\\frac{T_1}{T_2}\\right)^{2} = \\left(\\frac{a_1}{a_2}\\right)^{3}, \\qquad v_pr_p = v_ar_a",
        symbols: [
          { symbol: "\\(T\\)", meaning: "time for one revolution" },
          { symbol: "\\(a\\)", meaning: "semi-major axis of the orbit" },
          { symbol: "\\(r_p, r_a\\)", meaning: "nearest and farthest distances from the sun" },
        ],
      },
      authoredExample: {
        prompt:
          "A comet is \\(1 \\times 10^{11}\\) m from the sun at its nearest point and \\(4 \\times 10^{11}\\) m at its farthest. Its speed at the nearest point is 60 km/s. What is its speed at the farthest point?",
        steps: [
          "Angular momentum is conserved: \\(v_pr_p = v_ar_a\\).",
          "\\(v_a = \\dfrac{60 \\times 1 \\times 10^{11}}{4 \\times 10^{11}} = 15\\ \\text{km/s}\\).",
        ],
        answer: "15 km/s",
      },
      selfCheckExample: {
        prompt:
          "A planet moves round the sun in an elliptical orbit. Of its speed, its kinetic energy, its angular momentum and its total energy, which stay constant?",
        steps: [
          "Gravity gives no torque about the sun, so angular momentum stays constant.",
          "Gravity is the only force and it is conservative, so the total energy stays constant.",
          "The distance from the sun changes, so the potential energy, the speed and the kinetic energy all change.",
        ],
        answer: "Angular momentum and total energy",
      },
      practiceSet: [
        { prompt: "State Kepler's law of orbits.", answer: "Each planet moves in an ellipse with the sun at one focus" },
        { prompt: "At which point of its orbit does a planet move fastest?", answer: "Nearest the sun (perihelion)" },
        { prompt: "Kepler's law of areas follows from the conservation of which quantity?", answer: "Angular momentum" },
        { prompt: "Write Kepler's law of periods for an orbit of semi-major axis a and period T.", answer: "\\(T^{2} \\propto a^{3}\\)" },
      ],
      pyqExampleId: "04c5bd75-434f-49c9-9e7d-8e213d402e8a",
      traps: [
        {
          title: "Cube the radius, then take the square root",
          body: "\\(T \\propto a^{3/2}\\). An orbit with nine times the radius has a period 27 times as long, not 9 times or 729 times.",
        },
        {
          title: "Equal areas, not equal distances",
          body: "In equal times the planet sweeps equal areas, so near the sun it covers a longer stretch of its orbit. Its speed is not constant.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphgr-orbit-speed",
      name: "Orbital speed and period of a satellite",
      intuition:
        "A satellite is always falling towards the earth, but it moves sideways fast enough that the ground curves away beneath it. Gravity supplies exactly the centripetal force a circle needs. A higher orbit has a weaker pull, so the satellite moves more slowly and has farther to go, and its period grows.",
      definition:
        "- The orbit radius is measured from the earth's centre: \\(r = R + h\\).\n" +
        "- Gravity gives the centripetal force: \\(\\dfrac{mv_0^{2}}{r} = \\dfrac{GMm}{r^{2}}\\), so \\(v_0 = \\sqrt{\\dfrac{GM}{r}}\\). It does not depend on the satellite's mass.\n" +
        "- Period: \\(T = \\dfrac{2\\pi r}{v_0} = 2\\pi\\sqrt{\\dfrac{r^{3}}{GM}}\\). This is Kepler's third law for a circular orbit.\n" +
        "- Just above the surface (r = R): \\(v_0 = \\sqrt{gR} \\approx 7.9\\ \\text{km/s}\\) and \\(T = 2\\pi\\sqrt{\\dfrac{R}{g}} \\approx 85\\) minutes. Putting \\(M = \\dfrac{4}{3}\\pi R^{3}\\rho\\) gives \\(T^{2} = \\dfrac{3\\pi}{G\\rho}\\), which depends only on the density.\n" +
        "- At the surface the escape speed is \\(\\sqrt{2}\\) times this orbital speed.",
      formula: {
        label: "Orbital speed and period",
        latex: "v_0 = \\sqrt{\\frac{GM}{r}}, \\qquad T = 2\\pi\\sqrt{\\frac{r^{3}}{GM}}, \\qquad r = R + h",
        symbols: [
          { symbol: "\\(v_0\\)", meaning: "orbital speed" },
          { symbol: "\\(r\\)", meaning: "orbit radius from the earth's centre" },
          { symbol: "\\(h\\)", meaning: "height of the orbit above the surface" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the orbital speed of a satellite just above the earth's surface. Take g = 9.8 m/s² and R = \\(6.4 \\times 10^{6}\\) m.",
        steps: [
          "Just above the surface, \\(v_0 = \\sqrt{\\dfrac{GM}{R}} = \\sqrt{gR}\\).",
          "\\(v_0 = \\sqrt{9.8 \\times 6.4 \\times 10^{6}} = \\sqrt{6.27 \\times 10^{7}} \\approx 7.9 \\times 10^{3}\\ \\text{m/s}\\).",
        ],
        answer: "About 7.9 km/s",
      },
      selfCheckExample: {
        prompt:
          "One satellite orbits just above the earth's surface with speed v. Another orbits at a height equal to the earth's radius. What is the second satellite's speed?",
        steps: [
          "The second orbit radius is \\(R + R = 2R\\).",
          "\\(v_0 \\propto \\dfrac{1}{\\sqrt{r}}\\), so doubling r divides the speed by \\(\\sqrt{2}\\).",
        ],
        answer: "\\(v/\\sqrt{2}\\)",
      },
      practiceSet: [
        { prompt: "Does the orbital speed of a satellite depend on the satellite's mass?", answer: "No" },
        { prompt: "Just above the earth's surface, what is the ratio of the escape speed to the orbital speed?", answer: "\\(\\sqrt{2}\\)" },
        { prompt: "Satellite A orbits at radius r and satellite B at radius 4r. Ratio of their orbital speeds, A to B?", answer: "2 : 1" },
        { prompt: "Write the period of a satellite in a circular orbit of radius r about a planet of mass M.", answer: "\\(T = 2\\pi\\sqrt{r^{3}/GM}\\)" },
      ],
      pyqExampleId: "7c611c0e-1923-49b9-81f8-1445031ae1be",
      traps: [
        {
          title: "Use R + h, not h",
          body: "The orbit radius in \\(v_0 = \\sqrt{GM/r}\\) is measured from the earth's centre. A satellite 600 km up has \\(r = R + 600\\ \\text{km}\\).",
        },
        {
          title: "Higher orbit, slower speed, longer period",
          body: "Moving a satellite to a higher orbit lowers its speed, as \\(1/\\sqrt{r}\\), and lengthens its period, as \\(r^{3/2}\\). Both change, in opposite directions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphgr-orbit-energy",
      name: "Energy of an orbiting satellite",
      intuition:
        "A satellite in orbit has kinetic energy from its motion and negative potential energy from the earth's pull. The kinetic energy is always exactly half the size of the potential energy, so the total is negative. A negative total means the satellite is bound: it cannot leave unless it is given more energy.",
      definition:
        "- In a circular orbit of radius r: \\(K = \\dfrac{GMm}{2r}\\), \\(U = -\\dfrac{GMm}{r}\\), total \\(E = K + U = -\\dfrac{GMm}{2r}\\).\n" +
        "- So \\(K = -E\\) and \\(U = 2E\\).\n" +
        "- Energy to put a satellite into orbit from rest on the surface: the change in total energy, \\(E_{\\text{orbit}} - U_{\\text{surface}} = -\\dfrac{GMm}{2r} + \\dfrac{GMm}{R}\\).\n" +
        "- Energy to move it from orbit \\(r_1\\) to a higher orbit \\(r_2\\): \\(\\dfrac{GMm}{2}\\left(\\dfrac{1}{r_1} - \\dfrac{1}{r_2}\\right)\\).\n" +
        "- Energy to free it from orbit altogether: \\(\\dfrac{GMm}{2r}\\).",
      formula: {
        label: "Energy in a circular orbit",
        latex: "K = \\frac{GMm}{2r}, \\qquad U = -\\frac{GMm}{r}, \\qquad E = -\\frac{GMm}{2r}",
        symbols: [
          { symbol: "\\(K\\)", meaning: "kinetic energy of the satellite" },
          { symbol: "\\(E\\)", meaning: "total energy of the satellite" },
        ],
      },
      authoredExample: {
        prompt:
          "How much energy is needed to move a satellite of mass m from a circular orbit of radius 2R to one of radius 4R around the earth (mass M, radius R)?",
        steps: [
          "\\(\\Delta E = \\dfrac{GMm}{2}\\left(\\dfrac{1}{2R} - \\dfrac{1}{4R}\\right)\\).",
          "\\(\\Delta E = \\dfrac{GMm}{2} \\times \\dfrac{1}{4R} = \\dfrac{GMm}{8R}\\).",
        ],
        answer: "\\(\\dfrac{GMm}{8R}\\)",
      },
      selfCheckExample: {
        prompt: "A satellite in a circular orbit has a total energy of −E (E is positive). What are its kinetic and potential energies?",
        steps: [
          "\\(K = -(\\text{total}) = E\\).",
          "\\(U = 2 \\times (\\text{total}) = -2E\\). Check: \\(E + (-2E) = -E\\).",
        ],
        answer: "Kinetic energy E, potential energy −2E",
      },
      practiceSet: [
        { prompt: "Write the total energy of a satellite of mass m in a circular orbit of radius r about a planet of mass M.", answer: "\\(E = -\\dfrac{GMm}{2r}\\)" },
        { prompt: "Why is the total energy of an orbiting satellite negative?", answer: "It is bound to the earth" },
        { prompt: "What least energy frees a satellite of mass m from a circular orbit of radius r about a planet of mass M?", answer: "\\(\\dfrac{GMm}{2r}\\)" },
        { prompt: "For a satellite in a circular orbit, how does the size of its kinetic energy compare with the size of its potential energy?", answer: "It is half as large" },
      ],
      pyqExampleId: "9a21e21e-f4e2-4556-898b-5100bda6cb62",
      traps: [
        {
          title: "Height above the surface is not the orbit radius",
          body: "An orbit at a height R above the surface has a radius of 2R. Put 2R, not R, into \\(-GMm/2r\\).",
        },
        {
          title: "Launching needs kinetic energy too",
          body: "The energy to put a satellite in orbit is the change in TOTAL energy. Counting only the rise in potential energy leaves out the orbital kinetic energy \\(GMm/2r\\).",
        },
        {
          title: "Kinetic energy is half the size of potential energy",
          body: "In a circular orbit \\(K = GMm/2r\\) while \\(U = -GMm/r\\), so the total is \\(-GMm/2r\\), not zero and not \\(-GMm/r\\).",
        },
      ],
    },
  ],
};
