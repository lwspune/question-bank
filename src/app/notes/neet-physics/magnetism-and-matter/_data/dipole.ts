import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_MM_DIPOLE_NOTE: SubtopicNote = {
  subtopicName: "The Bar Magnet as a Dipole",
  title: "The Bar Magnet as a Dipole",
  oneLineDefinition:
    "A bar magnet as a magnetic dipole of moment m = q(2l), what bending does to that moment, the torque, energy and oscillations of a magnet in a uniform field, and Gauss's law for magnetism.",
  whyItMatters:
    "Six NEET questions, one from 2023 and five from 2024; none since. Two ask for the moment of a bent magnet (bent at its middle into a V, NEET 2024, and bent into a 60° arc, Re-NEET 2024). Three put a magnet in a uniform field: its potential energy at right angles to the field (Re-NEET 2024) and two needles oscillating in a field, one finding the field and one the moment. One asks the net magnetic flux through a closed surface (2023).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphmm-bar-magnet",
      name: "The bar magnet and its magnetic moment",
      intuition:
        "A bar magnet behaves like two poles of equal strength, north and south, a short distance apart. Its magnetic moment is the pole strength times the distance between the poles, and it points from the south pole to the north pole. Far from the magnet its field is like that of a current loop, and it weakens fast, as 1/r³. If the magnet is bent, the pole strength does not change, but the poles come closer together, so the moment falls.",
      definition:
        "- Magnetic moment: \\(m = q_m(2l)\\), where \\(q_m\\) is the pole strength and 2l the distance between the poles. It points from S to N. Unit: A m².\n" +
        "- Far from a short magnet, on its axis: \\(B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{r^{3}}\\), along m.\n" +
        "- At the same distance on its equator (the perpendicular bisector): \\(B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{r^{3}}\\), opposite to m. The axial field is twice the equatorial field.\n" +
        "- **Bending a magnet:** the pole strength stays the same, so the new moment is \\(q_m\\) times the straight-line distance between the two ends.\n" +
        "- A straight magnet of length L bent into an arc of a circle that subtends \\(\\theta\\) at the centre: radius \\(R = \\dfrac{L}{\\theta}\\) (\\(\\theta\\) in radians), and the ends are \\(2R\\sin\\dfrac{\\theta}{2}\\) apart. A semicircle gives \\(m' = \\dfrac{2m}{\\pi}\\).",
      formula: {
        label: "Moment and field of a bar magnet",
        latex:
          "m = q_m(2l), \\qquad B_{axis} = \\frac{\\mu_0}{4\\pi}\\frac{2m}{r^{3}}, \\qquad B_{equator} = \\frac{\\mu_0}{4\\pi}\\frac{m}{r^{3}}",
        symbols: [
          { symbol: "\\(q_m\\)", meaning: "pole strength" },
          { symbol: "\\(2l\\)", meaning: "distance between the two poles" },
          { symbol: "\\(r\\)", meaning: "distance from the centre of the magnet, much larger than l" },
        ],
      },
      authoredExample: {
        prompt:
          "A short bar magnet has a magnetic moment of 0.5 A m². Find the field it makes 10 cm from its centre, first on its axis and then on its equator. (\\(\\mu_0/4\\pi = 10^{-7}\\) T m/A)",
        steps: [
          "On the axis: \\(B = 10^{-7} \\times \\dfrac{2 \\times 0.5}{(0.1)^{3}} = 10^{-7} \\times \\dfrac{1}{10^{-3}} = 10^{-4}\\) T, along m.",
          "On the equator the field is half as large: \\(B = 5 \\times 10^{-5}\\) T, opposite to m.",
        ],
        answer: "\\(10^{-4}\\) T on the axis, \\(5 \\times 10^{-5}\\) T on the equator",
      },
      selfCheckExample: {
        prompt: "A thin straight magnet of moment m is bent into a semicircle. What is its new magnetic moment?",
        steps: [
          "The pole strength stays the same. The length L of the magnet becomes half a circle: \\(L = \\pi R\\), so \\(R = \\dfrac{L}{\\pi}\\).",
          "The ends are now a diameter apart: \\(2R = \\dfrac{2L}{\\pi}\\).",
          "\\(m' = q_m \\times \\dfrac{2L}{\\pi} = \\dfrac{2m}{\\pi}\\).",
        ],
        answer: "\\(\\dfrac{2m}{\\pi}\\)",
      },
      practiceSet: [
        { prompt: "A bar magnet has pole strength 5 A m and its poles are 10 cm apart. What is its magnetic moment?", answer: "0.5 A m²" },
        { prompt: "At the same large distance from a short magnet, what is the ratio of the field on its axis to the field on its equator?", answer: "2 : 1" },
        { prompt: "The field of a short magnet at a point 20 cm away on its axis is B. What is the field 40 cm away on the axis?", answer: "B/8" },
        { prompt: "In which direction does the magnetic moment of a bar magnet point?", answer: "From its south pole to its north pole" },
      ],
      pyqExampleId: "d9d284e1-0c99-4478-a890-ac5786ddcc3b",
      traps: [
        {
          title: "Bending keeps the pole strength, not the moment",
          body: "A bent magnet has the same pole strength, but its ends are closer together, so its moment is smaller. Multiply the pole strength by the straight-line distance between the ends, not by the length of the bar.",
        },
        {
          title: "The arc's angle is in radians",
          body: "For a magnet of length L bent into an arc that subtends \\(\\theta\\) at the centre, \\(R = L/\\theta\\) needs \\(\\theta\\) in radians: 60° is \\(\\pi/3\\), so \\(R = 3L/\\pi\\).",
        },
        {
          title: "A dipole's field falls as the cube of distance",
          body: "Doubling the distance from a short magnet cuts its field to one eighth, not one quarter. The inverse square belongs to a single charge.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphmm-uniform-field",
      name: "A magnet in a uniform field: torque, energy and oscillation",
      intuition:
        "In a uniform field the two poles of a magnet feel equal and opposite forces, so the net force is zero. The two forces still make a torque, \\(\\tau = mB\\sin\\theta\\), the same torque met for a current loop in Moving Charges and Magnetism, and it turns the magnet to line up with the field. Lined up, the magnet has its lowest energy; turned the other way, its highest. Pushed a little away from the field and let go, it swings to and fro like a pendulum, faster in a stronger field.",
      definition:
        "- Torque: \\(\\vec{\\tau} = \\vec{m} \\times \\vec{B}\\), of size \\(mB\\sin\\theta\\), where \\(\\theta\\) is the angle between m and B. Net force in a uniform field: zero.\n" +
        "- Potential energy: \\(U = -\\vec{m}\\cdot\\vec{B} = -mB\\cos\\theta\\). It is \\(-mB\\) along the field (stable), zero at 90° and \\(+mB\\) against the field (unstable).\n" +
        "- Work to turn the magnet from \\(\\theta_1\\) to \\(\\theta_2\\): \\(W = U_2 - U_1 = mB(\\cos\\theta_1 - \\cos\\theta_2)\\).\n" +
        "- Small oscillations about the field: \\(T = 2\\pi\\sqrt{\\dfrac{I}{mB}}\\), where I is the moment of inertia of the magnet. So \\(B = \\dfrac{4\\pi^{2}I}{mT^{2}}\\) and \\(m = \\dfrac{4\\pi^{2}I}{BT^{2}}\\).\n" +
        "- The period is the time for one oscillation: n oscillations in a time t give \\(T = \\dfrac{t}{n}\\).",
      formula: {
        label: "Magnet in a uniform field",
        latex:
          "\\tau = mB\\sin\\theta, \\qquad U = -mB\\cos\\theta, \\qquad T = 2\\pi\\sqrt{\\frac{I}{mB}}",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the magnetic moment and the field" },
          { symbol: "\\(I\\)", meaning: "moment of inertia of the magnet about its axis of rotation" },
        ],
      },
      authoredExample: {
        prompt:
          "A magnet of moment 2 A m² lies along a uniform field of 0.15 T. How much work is needed to turn it until it points exactly against the field?",
        steps: [
          "\\(W = mB(\\cos\\theta_1 - \\cos\\theta_2) = 2 \\times 0.15 \\times (\\cos 0^{\\circ} - \\cos 180^{\\circ})\\).",
          "\\(W = 0.3 \\times (1 - (-1)) = 0.6\\) J.",
        ],
        answer: "0.6 J",
      },
      selfCheckExample: {
        prompt:
          "A magnetic needle of moment 0.2 A m² and moment of inertia \\(8 \\times 10^{-6}\\) kg m² swings in a uniform field of 0.1 T. Find its period of small oscillations.",
        steps: [
          "\\(\\dfrac{I}{mB} = \\dfrac{8 \\times 10^{-6}}{0.2 \\times 0.1} = 4 \\times 10^{-4}\\ \\text{s}^{2}\\), so the square root is 0.02 s.",
          "\\(T = 2\\pi \\times 0.02 = 0.04\\pi \\approx 0.126\\) s.",
        ],
        answer: "\\(0.04\\pi \\approx 0.126\\) s",
      },
      practiceSet: [
        { prompt: "A magnet of moment 0.5 A m² points along a field of 0.2 T. What is its potential energy?", answer: "−0.1 J" },
        { prompt: "A magnet of moment 2 A m² makes 30° with a uniform field of 0.1 T. What torque acts on it?", answer: "0.1 N m" },
        { prompt: "A needle oscillates in a uniform field with period T. The field is made four times as strong. What is the new period?", answer: "T/2" },
        { prompt: "What is the net force on a bar magnet in a uniform magnetic field?", answer: "Zero" },
      ],
      pyqExampleId: "e25990d8-9145-488f-aa73-84966c74fbb0",
      traps: [
        {
          title: "Zero energy is not zero torque",
          body: "At 90° to the field the potential energy \\(-mB\\cos\\theta\\) is zero, but the torque \\(mB\\sin\\theta\\) is at its largest. The two follow different functions of the angle.",
        },
        {
          title: "The lowest energy is negative",
          body: "A magnet along the field has \\(U = -mB\\), the lowest value, and is stable. A magnet against the field has \\(U = +mB\\) and is unstable, even though no torque acts in either position.",
        },
        {
          title: "Period is time divided by oscillations",
          body: "20 oscillations in 5 s give \\(T = 5/20 = 0.25\\) s, not 4 s. Square T correctly when solving \\(T = 2\\pi\\sqrt{I/mB}\\) for B or m.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphmm-gauss",
      name: "Gauss's law for magnetism",
      intuition:
        "Break a bar magnet in two and each piece has its own north and south pole: no one has ever found a pole on its own. So magnetic field lines never start or stop anywhere. They leave the north pole, go round outside, and come back through the inside of the magnet from south to north, closing on themselves. Every line that enters a closed surface must also leave it, so the net magnetic flux out of any closed surface is zero.",
      definition:
        "- Gauss's law for magnetism: \\(\\oint \\vec{B}\\cdot d\\vec{A} = 0\\) for every closed surface.\n" +
        "- It says there are no magnetic monopoles: poles always come in north and south pairs.\n" +
        "- Field lines are closed loops. Outside a magnet they run from N to S; inside, from S to N.\n" +
        "- Field lines never cross, because the field at a point has only one direction.\n" +
        "- Compare the electric case: \\(\\oint \\vec{E}\\cdot d\\vec{A} = \\dfrac{q}{\\varepsilon_0}\\), which is not zero when the surface encloses a charge.",
      formula: {
        label: "Gauss's law for magnetism",
        latex: "\\oint \\vec{B}\\cdot d\\vec{A} = 0",
      },
      authoredExample: {
        prompt:
          "Through one face of a closed box, \\(5 \\times 10^{-4}\\) Wb of magnetic flux enters the box. How much magnetic flux leaves through the rest of the box's surface?",
        steps: [
          "The net magnetic flux out of any closed surface is zero.",
          "So the flux leaving must equal the flux entering: \\(5 \\times 10^{-4}\\) Wb.",
        ],
        answer: "\\(5 \\times 10^{-4}\\) Wb",
      },
      selfCheckExample: {
        prompt:
          "Electric field lines start on positive charges and end on negative ones. How do the field lines of a bar magnet run inside the magnet, and why?",
        steps: [
          "There are no single magnetic poles for the lines to start or end on.",
          "So each line that leaves the north pole outside comes back through the magnet, running from S to N inside, and closes on itself.",
        ],
        answer: "From S to N, so that every line is a closed loop",
      },
      practiceSet: [
        { prompt: "Can two magnetic field lines cross each other?", answer: "No: the field at a point has only one direction" },
        { prompt: "Outside a bar magnet, in which direction do its field lines run?", answer: "From the north pole to the south pole" },
        { prompt: "A bar magnet is broken into two pieces. How many poles does each piece have?", answer: "Two: a north pole and a south pole" },
        { prompt: "What does Gauss's law for magnetism tell us about magnetic monopoles?", answer: "They do not exist: poles always come in pairs" },
      ],
      pyqExampleId: "76b0b9ad-11ba-452e-ab2a-2432ad952d98",
      traps: [
        {
          title: "Zero net flux is not zero field",
          body: "The field on a closed surface around a magnet is not zero. Lines go out through one part and come back in through another, so only the total flux adds up to zero.",
        },
        {
          title: "Inside a magnet the lines run S to N",
          body: "Field lines leave the north pole outside the magnet, but inside it they go from the south pole back to the north pole, closing the loop.",
        },
      ],
    },
  ],
};
