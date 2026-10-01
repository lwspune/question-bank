import type { SubtopicNote } from "@/app/notes/_types";

export const CIRCULAR_MAG_NOTE: SubtopicNote = {
  subtopicName: "Circular and Helical Paths of Charges",
  title: "Circular and Helical Paths of Charges",
  oneLineDefinition:
    "A charge moving across a uniform field goes round a circle of radius r = mv/qB with period 2πm/qB, the same at every speed; a velocity at an angle to B makes the circle a helix.",
  whyItMatters:
    "Twenty-six PYQs, nineteen of them multiple choice, and one from 2026. Thirteen compare the radii of two or three particles, protons, deuterons, alpha particles or ions, at equal speed, momentum, kinetic energy or accelerating voltage. Five find a radius, a mass, a distance or a graph outright. Eight use the period: three are helices, two ask for the period or the frequency of revolution and three are about the cyclotron.",
  concepts: [
    // C1 — comparing radii
    {
      kind: "formula" as const,
      slug: "jpmag-radius-ratios",
      name: "Radius of a charge's circular path and how it compares between particles",
      intuition:
        "The magnetic force qvB supplies the centripetal force mv²/r, so r = mv/qB: the radius is the momentum divided by qB. Every comparison question is about which quantity the particles share. Write r in terms of that shared quantity, and the ratio is read off from the masses and charges that are left.",
      definition:
        "- \\(qvB = \\dfrac{mv^{2}}{r}\\), so \\(r = \\dfrac{mv}{qB} = \\dfrac{p}{qB} = \\dfrac{\\sqrt{2mK}}{qB} = \\dfrac{1}{B}\\sqrt{\\dfrac{2mV}{q}}\\) (accelerated from rest through V).\n" +
        "- Same momentum: \\(r \\propto 1/q\\). Same speed: \\(r \\propto m/q\\). Same kinetic energy: \\(r \\propto \\sqrt{m}/q\\). Same accelerating voltage: \\(r \\propto \\sqrt{m/q}\\).\n" +
        "- Proton (m, e), deuteron (2m, e), alpha particle (4m, 2e). An alpha has the same m/q as a deuteron.\n" +
        "- Curvature is \\(1/r\\): a larger radius is a SMALLER curvature, and a particle with the smaller radius is deflected more.\n" +
        "- The magnetic force on each is \\(qvB\\); at equal momentum v is \\(p/m\\).",
      formula: {
        label: "Radius of the circle",
        latex: "r = \\frac{mv}{qB} = \\frac{p}{qB} = \\frac{\\sqrt{2mK}}{qB} = \\frac{1}{B}\\sqrt{\\frac{2mV}{q}}",
      },
      authoredExample: {
        prompt:
          "A proton, a deuteron and an alpha particle are each accelerated from rest through the same potential difference and enter the same uniform field at right angles. Find the ratio of the radii of their paths.",
        steps: [
          "Same accelerating voltage, so \\(r \\propto \\sqrt{m/q}\\).",
          "Proton: \\(\\sqrt{m/e} \\to 1\\). Deuteron: \\(\\sqrt{2m/e} \\to \\sqrt2\\). Alpha: \\(\\sqrt{4m/2e} \\to \\sqrt2\\).",
          "So \\(r_p : r_d : r_\\alpha = 1 : \\sqrt2 : \\sqrt2\\).",
        ],
        answer: "\\(1 : \\sqrt2 : \\sqrt2\\)",
      },
      selfCheckExample: {
        prompt:
          "An electron and a proton with the same kinetic energy move at right angles to the same uniform field. Find the ratio of the radius of the electron's path to that of the proton's. (\\(m_e = 9.1 \\times 10^{-31}\\) kg, \\(m_p = 1.67 \\times 10^{-27}\\) kg)",
        steps: [
          "Same K and the same size of charge, so \\(r \\propto \\sqrt{m}\\).",
          "\\(\\dfrac{r_e}{r_p} = \\sqrt{\\dfrac{9.1 \\times 10^{-31}}{1.67 \\times 10^{-27}}} = \\sqrt{5.45 \\times 10^{-4}} \\approx 0.0233\\).",
        ],
        answer: "About 1 : 43; the electron's circle is much smaller.",
      },
      practiceSet: [
        { prompt: "A deuteron and a proton enter the same field at right angles with the same speed. Ratio of radii, deuteron to proton?", answer: "2 : 1" },
        { prompt: "An alpha particle and a proton enter the same field at right angles with the same momentum. Ratio of radii, alpha to proton?", answer: "1 : 2" },
        { prompt: "The kinetic energy of a charge circling in a fixed field becomes nine times as large. By what factor does its radius change?", answer: "It triples" },
        { prompt: "Two paths have radii 2 cm and 5 cm. Which has the larger curvature?", answer: "The 2 cm path" },
      ],
      pyqExampleId: "86dd0bc1-8db4-4a48-890d-e53fb6dbdb32", // 14 Jun 2022: proton, deuteron, alpha at equal kinetic energy, 1 : √2 : 1
      traps: [
        {
          title: "Equal energy and equal voltage are different conditions",
          body: "At equal kinetic energy r goes as √m/q; after the same accelerating voltage r goes as √(m/q). For an alpha particle against a proton the two give different ratios, so read which one the question fixes.",
        },
        {
          title: "Curvature is not radius",
          body: "Curvature is 1/r. A particle with a larger radius has a smaller curvature and is deflected less. Reading 'smaller curvature' as 'smaller radius' flips the comparison.",
        },
        {
          title: "Radius goes as the square root of kinetic energy",
          body: "r = √(2mK)/qB, so doubling K multiplies r by √2, not 2. The radius is proportional to momentum, not to energy.",
        },
      ],
    },

    // C2 — finding a radius, mass or field
    {
      kind: "formula" as const,
      slug: "jpmag-radius-values",
      name: "Finding a radius, a mass or a field from r = mv/qB",
      intuition:
        "The same equation, r = mv/qB, works the other way round: give it the radius and it returns the mass, the speed or the field. The care is all in the units: charge in coulombs, mass in kilograms, energy in joules, and the radius rather than the diameter of a semicircle.",
      definition:
        "- \\(r = \\dfrac{mv}{qB}\\); rearranged, \\(m = \\dfrac{qBr}{v}\\) or, after acceleration through V, \\(m = \\dfrac{qB^{2}r^{2}}{2V}\\).\n" +
        "- Energy in eV: multiply by \\(1.6 \\times 10^{-19}\\) to get joules. Mass in u: multiply by \\(1.66 \\times 10^{-27}\\) kg.\n" +
        "- A charge that enters a field region and comes back out has gone round a semicircle; the distance between entry and exit is the diameter, 2r.\n" +
        "- r is proportional to p, so a graph of r against momentum is a straight line through the origin; against kinetic energy it grows as \\(\\sqrt K\\).\n" +
        "- Two regions with different fields: the charge goes round a semicircle of diameter \\(2mv/qB\\) in each; the shift per cycle is the difference of the two diameters.\n" +
        "- A quantised orbit in a magnetic field: set the angular momentum \\(mvr = nh/2\\pi\\) and use \\(mv = eBr\\) from the circle, then solve for r.",
      formula: {
        label: "Mass from a measured radius",
        latex: "m = \\frac{qBr}{v} = \\frac{qB^{2}r^{2}}{2V}",
      },
      authoredExample: {
        prompt:
          "An alpha particle (mass \\(6.4 \\times 10^{-27}\\) kg, charge \\(3.2 \\times 10^{-19}\\) C) moves at \\(2 \\times 10^{6}\\) m/s at right angles to a field of 0.5 T. Find the radius of its path.",
        steps: [
          "\\(r = \\dfrac{mv}{qB} = \\dfrac{6.4 \\times 10^{-27} \\times 2 \\times 10^{6}}{3.2 \\times 10^{-19} \\times 0.5}\\).",
          "Numerator \\(1.28 \\times 10^{-20}\\); denominator \\(1.6 \\times 10^{-19}\\).",
          "\\(r = 0.08\\) m.",
        ],
        answer: "8 cm",
      },
      selfCheckExample: {
        prompt:
          "A proton is accelerated from rest through 5 kV and enters a field of 0.1 T at right angles. Find the radius of its path. (proton mass \\(1.6 \\times 10^{-27}\\) kg, charge \\(1.6 \\times 10^{-19}\\) C)",
        steps: [
          "\\(r = \\dfrac{1}{B}\\sqrt{\\dfrac{2mV}{q}}\\), and \\(\\dfrac{m}{q} = 10^{-8}\\) kg/C.",
          "\\(\\dfrac{2mV}{q} = 2 \\times 10^{-8} \\times 5000 = 10^{-4}\\), whose square root is 0.01.",
          "\\(r = \\dfrac{0.01}{0.1} = 0.1\\) m.",
        ],
        answer: "10 cm",
      },
      practiceSet: [
        { prompt: "An electron moves at \\(10^{7}\\) m/s at right angles to a field of \\(10^{-3}\\) T. Radius of its path? (\\(m_e = 9.1 \\times 10^{-31}\\) kg)", answer: "About 5.7 cm" },
        { prompt: "What field makes an electron at \\(2 \\times 10^{6}\\) m/s go round a circle of radius 1 cm? (\\(m_e = 9.1 \\times 10^{-31}\\) kg)", answer: "About 1.14 mT" },
        { prompt: "How does the radius of a charge's circular path vary with its momentum, in a fixed field?", answer: "In direct proportion: a straight line through the origin" },
        { prompt: "A charge enters a field region and leaves it 6 cm from where it entered, after half a circle. What radius goes into r = mv/qB?", answer: "3 cm" },
      ],
      pyqExampleId: "2308e3bd-235c-4df9-9804-794a41d123ac", // 1 Feb 2023: 2 μC through 100 V, 4 mT, semicircle of radius 3 cm, mass 144 × 10⁻¹⁸ kg
      traps: [
        {
          title: "Energy in eV must be turned into joules",
          body: "Put kinetic energy into √(2mK) in joules: 1 eV = 1.6 × 10⁻¹⁹ J. A keV is a thousand of those.",
        },
        {
          title: "Radius, not diameter",
          body: "When a charge goes round half a circle and exits, the gap between entry and exit is 2r. Putting that gap into r = mv/qB doubles the mass or halves the field.",
        },
        {
          title: "Singly ionised means charge e",
          body: "A singly ionised atom has q = e whatever its mass number; the mass number gives only the mass, in u.",
        },
      ],
    },

    // C3 — period, helix, cyclotron
    {
      kind: "formula" as const,
      slug: "jpmag-period-helix",
      name: "Period of revolution, the helix and the cyclotron",
      intuition:
        "A faster charge goes round a bigger circle, and the two effects cancel exactly: the time for one turn, 2πm/qB, does not depend on the speed. That is what makes a cyclotron work, since an alternating voltage of fixed frequency stays in step as the particle speeds up. If the velocity has a part along B, that part is untouched, and the circle is drawn out into a helix.",
      definition:
        "- Period \\(T = \\dfrac{2\\pi m}{qB}\\), frequency \\(f = \\dfrac{qB}{2\\pi m}\\), angular frequency \\(\\omega = \\dfrac{qB}{m}\\): all independent of speed and radius.\n" +
        "- Velocity at angle \\(\\theta\\) to B: \\(v_\\perp = v\\sin\\theta\\) makes the circle, \\(r = \\dfrac{mv_\\perp}{qB}\\); \\(v_\\parallel = v\\cos\\theta\\) carries it along B.\n" +
        "- Pitch (distance along B per turn): \\(p = v_\\parallel T = \\dfrac{2\\pi m v\\cos\\theta}{qB}\\). In n turns it moves \\(n\\) pitches.\n" +
        "- v along B: a straight line. v at right angles to B: a circle. Anything in between: a helix with its axis along B.\n" +
        "- Cyclotron: the oscillator frequency equals \\(qB/2\\pi m\\). The largest kinetic energy, at the dee radius R, is \\(K_{\\max} = \\dfrac{q^{2}B^{2}R^{2}}{2m}\\).\n" +
        "- The particle crosses the gap twice per revolution, gaining qV each time, so the number of revolutions to reach K is \\(\\dfrac{K}{2qV}\\).",
      formula: {
        label: "Period, pitch and cyclotron energy",
        latex: "T = \\frac{2\\pi m}{qB} \\qquad p = v\\cos\\theta\\,T \\qquad K_{\\max} = \\frac{q^{2}B^{2}R^{2}}{2m}",
      },
      authoredExample: {
        prompt:
          "A particle of mass \\(10^{-6}\\) kg and charge \\(2 \\times 10^{-6}\\) C moves with \\(\\vec v = (4\\hat i + 3\\hat k)\\) m/s in a field \\(\\vec B = \\pi\\hat k\\) T. Find its period, the radius of its helix and its pitch.",
        steps: [
          "\\(T = \\dfrac{2\\pi m}{qB} = \\dfrac{2\\pi \\times 10^{-6}}{2 \\times 10^{-6} \\times \\pi} = 1\\) s.",
          "The part across B is \\(v_\\perp = 4\\) m/s: \\(r = \\dfrac{mv_\\perp}{qB} = \\dfrac{10^{-6} \\times 4}{2 \\times 10^{-6} \\times \\pi} = \\dfrac{2}{\\pi} \\approx 0.64\\) m.",
          "The part along B is \\(v_\\parallel = 3\\) m/s: pitch \\(= v_\\parallel T = 3\\) m.",
        ],
        answer: "Period 1 s; radius \\(2/\\pi \\approx 0.64\\) m; pitch 3 m.",
      },
      selfCheckExample: {
        prompt:
          "A cyclotron with a field of 0.5 T and dees of radius 0.4 m accelerates protons. Find the largest kinetic energy in MeV and the oscillator frequency. (proton mass \\(1.6 \\times 10^{-27}\\) kg, charge \\(1.6 \\times 10^{-19}\\) C)",
        steps: [
          "\\(K = \\dfrac{q^{2}B^{2}R^{2}}{2m} = \\dfrac{(1.6 \\times 10^{-19})^{2} \\times 0.25 \\times 0.16}{3.2 \\times 10^{-27}} = 3.2 \\times 10^{-13}\\) J.",
          "Divide by \\(1.6 \\times 10^{-13}\\) J per MeV: 2 MeV.",
          "\\(f = \\dfrac{qB}{2\\pi m} = \\dfrac{5 \\times 10^{7}}{2\\pi} \\approx 8 \\times 10^{6}\\) Hz.",
        ],
        answer: "2 MeV; about 8 MHz.",
      },
      practiceSet: [
        { prompt: "The speed of a charge circling in a uniform magnetic field is doubled. What happens to its period?", answer: "It stays the same" },
        { prompt: "Period of an electron circling in a field of \\(\\pi \\times 10^{-3}\\) T? (\\(m_e = 9.1 \\times 10^{-31}\\) kg, \\(e = 1.6 \\times 10^{-19}\\) C)", answer: "About 11.4 ns" },
        { prompt: "A proton reaches 4 MeV in a cyclotron whose gap voltage is 20 kV. How many revolutions does it make?", answer: "100" },
        { prompt: "What path does a charge follow when its velocity makes \\(45^{\\circ}\\) with a uniform magnetic field?", answer: "A helix with its axis along the field" },
      ],
      pyqExampleId: "bb2c4386-8597-4d3e-a177-ab74647b1027", // 8 Apr 2026 S2: 5 mg, 5π μC, v = (3, 0, 2) × 10⁻² m/s, B = 0.1 k̂, distance in 5 turns = 2 m
      traps: [
        {
          title: "Only the part of v along B makes the pitch",
          body: "Pitch is v cos θ times the period. Using the full speed, or the part across B, gives a wrong distance along the field.",
        },
        {
          title: "Two gains of energy per revolution in a cyclotron",
          body: "The particle crosses the gap between the dees twice in each turn, gaining qV each time. Revolutions = K/(2qV); dividing by qV alone doubles the count.",
        },
        {
          title: "The period does not depend on the speed",
          body: "T = 2πm/qB has no v and no r in it. A faster charge goes round a larger circle in the same time, which is why the cyclotron frequency can stay fixed.",
        },
      ],
    },
  ],
};
