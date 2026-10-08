import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_MAG_FIELDS_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Fields and Forces",
  title: "Magnets, Magnetic Fields and the Force on Currents and Charges",
  oneLineDefinition:
    "Magnets and currents make magnetic fields; a field pushes sideways on a current or a moving charge, which can bend a charged particle into a circle.",
  whyItMatters:
    "The 2014 paper asked what kind of bar a magnet could repel. The 2024 ministry paper asked about the circular path of an electron that enters a magnetic field at right angles, asking which statement about it is false.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-mag-magnets",
      name: "Magnets, poles, field lines and the Earth's field",
      intuition:
        "Every magnet has a north pole and a south pole, and you can never get one without the other: cut a magnet in half and you get two smaller magnets. Like poles push apart and unlike poles pull together. Iron, nickel and cobalt are pulled by any magnet because the magnet turns them into temporary magnets, with the nearer end opposite to the pole that is close.",
      definition:
        "- **Poles**: like poles repel, unlike poles attract. Poles always come in N and S pairs.\n" +
        "- **Field lines** outside a magnet run from **N to S**. They never cross; where they are closer together the field is stronger. A compass needle lines up along them.\n" +
        "- **Ferromagnetic** materials (iron, nickel, cobalt and alloys such as steel) are attracted to either pole. **Soft iron** magnetises and demagnetises easily (electromagnet cores); **steel** keeps its magnetism (permanent magnets).\n" +
        "- **Repulsion is the only proof** that an object is a magnet: an unmagnetised piece of iron is attracted by both poles, but never repelled.\n" +
        "- The **Earth** behaves like a giant bar magnet with field about \\(5 \\times 10^{-5}\\ \\text{T}\\). A compass's N pole points to geographic north, so the Earth's magnetic pole there is a **south** pole.\n" +
        "- Magnetic field strength \\(B\\) is measured in **tesla** (T).",
      table: {
        columns: ["Object near a bar magnet", "Force it feels", "Reason"],
        rows: [
          { cells: ["Unmagnetised iron, nickel or cobalt", "Attraction to either pole, never repulsion", "The magnet induces an opposite pole in the near end"] },
          { cells: ["Another magnet (e.g. magnetised steel)", "Attraction or repulsion, depending on which poles face", "Like poles repel, unlike poles attract"] },
          { cells: ["Copper, aluminium, wood, plastic", "Practically none", "Not ferromagnetic"] },
          { cells: ["An electrically charged object at rest", "No magnetic force", "A magnetic field acts only on moving charges"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which observation proves that a metal bar is itself a magnet?",
        options: [
          "It is attracted by the N pole of a magnet",
          "It is attracted by both poles of a magnet",
          "One of its ends is repelled by one pole of a known magnet",
          "It conducts electricity",
          "It is made of iron",
        ],
        steps: [
          "Only a magnet can be repelled by a magnet, because repulsion needs two like poles facing each other.",
          "A and B happen to any unmagnetised iron, nickel or cobalt bar as well. D is true of every metal. E describes a material, not a magnet.",
        ],
        answer: "(C) One of its ends is repelled by one pole of a known magnet",
      },
      practiceSet: [
        { prompt: "Outside a bar magnet, in which direction do the field lines run?", answer: "From the N pole to the S pole", method: "The direction a compass N pole points" },
        { prompt: "What kind of magnetic pole is near the Earth's geographic North Pole?", answer: "A magnetic south pole", method: "It attracts the N pole of a compass" },
        { prompt: "Which is better for the core of an electromagnet: soft iron or steel?", answer: "Soft iron", method: "It loses its magnetism as soon as the current stops" },
      ],
      traps: [
        {
          title: "Attraction does not prove an object is a magnet",
          body: "Any piece of iron, nickel or cobalt is attracted by a magnet, magnetised or not. Only repulsion shows the object is a magnet. A charged but non-magnetic object at rest feels no magnetic force at all.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mag-wire-field",
      name: "The magnetic field of a straight wire and of a solenoid",
      intuition:
        "A current makes a magnetic field that wraps round the wire in circles. The field is stronger near the wire and with more current. Wind the wire into a long coil (a solenoid) and the circles from all the turns add up inside it, giving a strong, nearly uniform field like that of a bar magnet.",
      definition:
        "- **Straight wire**: the field lines are circles centred on the wire. The **right-hand grip rule**: thumb along the current, curled fingers give the field direction. \\(B = \\mu_0 I/(2\\pi r)\\), so \\(B \\propto I\\) and \\(B \\propto 1/r\\).\n" +
        "- **Solenoid**: inside, the field is uniform and along the axis, \\(B = \\mu_0 n I\\), where \\(n = N/L\\) is the number of turns per metre. Outside it looks like the field of a bar magnet. Grip the coil with the fingers along the current: the thumb points to the N end.\n" +
        "- \\(\\mu_0 = 4\\pi \\times 10^{-7}\\ \\text{T m/A}\\). An iron core makes the field much stronger (an **electromagnet**).\n" +
        "- Reversing the current reverses the field.",
      formula: {
        label: "Field of a long straight wire and of a solenoid",
        latex: "B_{\\text{wire}} = \\frac{\\mu_0 I}{2\\pi r} \\qquad B_{\\text{solenoid}} = \\mu_0 \\frac{N}{L} I",
        symbols: [
          { symbol: "\\(B\\)", meaning: "magnetic field strength, in T" },
          { symbol: "\\(I\\)", meaning: "current, in A" },
          { symbol: "\\(r\\)", meaning: "distance from the wire, in m" },
          { symbol: "\\(N/L\\)", meaning: "turns per metre of the solenoid" },
          { symbol: "\\(\\mu_0\\)", meaning: "\\(4\\pi \\times 10^{-7}\\ \\text{T m/A}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A long straight wire carries 10 A. Find the magnetic field 5.0 cm from it and compare it with the Earth's field of about \\(5 \\times 10^{-5}\\ \\text{T}\\).",
        steps: [
          "\\(B = \\dfrac{\\mu_0 I}{2\\pi r} = \\dfrac{4\\pi \\times 10^{-7} \\times 10}{2\\pi \\times 0.050}\\).",
          "The \\(\\pi\\) cancels: \\(B = \\dfrac{2 \\times 10^{-7} \\times 10}{0.050} = 4.0 \\times 10^{-5}\\ \\text{T}\\).",
          "That is close to the Earth's field, which is why a wire carrying a few amperes visibly deflects a nearby compass.",
        ],
        answer: "\\(4.0 \\times 10^{-5}\\ \\text{T}\\), about the size of the Earth's field",
      },
      selfCheckExample: {
        prompt:
          "At a certain distance from a long straight wire the magnetic field is \\(B\\). The current is doubled and the point is moved three times as far from the wire. What is the field now?",
        options: [
          "\\(\\dfrac{2B}{9}\\)",
          "\\(6B\\)",
          "\\(\\dfrac{3B}{2}\\)",
          "\\(\\dfrac{2B}{3}\\)",
          "\\(2B\\)",
        ],
        steps: [
          "\\(B \\propto I/r\\): the current doubles (\\(\\times 2\\)) and the distance triples (\\(\\div 3\\)).",
          "New field \\(= 2B/3\\).",
          "A uses an inverse square law, which is right for a point charge but not for a wire. B multiplies by the distance; C inverts the ratio; E ignores the distance.",
        ],
        answer: "(D) \\(\\dfrac{2B}{3}\\)",
      },
      practiceSet: [
        { prompt: "A solenoid 0.50 m long has 1000 turns and carries 2.0 A. What is the field inside it?", answer: "About \\(5.0 \\times 10^{-3}\\ \\text{T}\\)", method: "\\(4\\pi \\times 10^{-7} \\times 2000 \\times 2.0\\)" },
        { prompt: "The number of turns per metre of a solenoid is doubled, with the same current. What happens to the field inside?", answer: "It doubles", method: "\\(B \\propto n\\)" },
        { prompt: "What is the shape of the field lines around a long straight current-carrying wire?", answer: "Circles centred on the wire", method: "Right-hand grip rule" },
      ],
      traps: [
        {
          title: "A wire's field falls as 1/r, not 1/r²",
          body: "The field of a long straight wire is proportional to \\(1/r\\): twice as far, half the field. The inverse square law belongs to point charges and point masses. Using it for a wire gives the wrong option every time.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mag-force-wire",
      name: "The force on a current-carrying wire in a magnetic field",
      intuition:
        "A current in a magnetic field feels a push at right angles to both the current and the field. This is the motor effect: it is what turns an electric motor. The push is largest when the wire crosses the field at right angles and disappears when the wire runs along the field.",
      definition:
        "- The force on a straight wire of length \\(L\\) carrying current \\(I\\) at angle \\(\\theta\\) to a field \\(B\\) is \\(F = BIL\\sin\\theta\\).\n" +
        "- **Maximum** when the wire is perpendicular to the field (\\(\\sin 90^\\circ = 1\\)); **zero** when it is parallel (\\(\\sin 0^\\circ = 0\\)).\n" +
        "- Direction: **Fleming's left-hand rule**. First finger along the Field, seCond finger along the Current, thuMb gives the Motion (force). The force is perpendicular to both \\(B\\) and \\(I\\).\n" +
        "- Two parallel wires with currents in the **same** direction **attract**; opposite directions **repel**.\n" +
        "- This also defines the tesla: \\(1\\ \\text{T} = 1\\ \\text{N}/(\\text{A m})\\).",
      formula: {
        label: "Force on a wire",
        latex: "F = B I L \\sin\\theta",
        symbols: [
          { symbol: "\\(F\\)", meaning: "force, in N" },
          { symbol: "\\(B\\)", meaning: "magnetic field, in T" },
          { symbol: "\\(I\\)", meaning: "current, in A" },
          { symbol: "\\(L\\)", meaning: "length of wire in the field, in m" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the wire and the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A 0.25 m length of wire carries 4.0 A in a uniform field of 0.30 T. Find the force on it when it is at right angles to the field, and when it makes 30° with the field.",
        steps: [
          "At 90°: \\(F = BIL = 0.30 \\times 4.0 \\times 0.25 = 0.30\\ \\text{N}\\).",
          "At 30°: \\(F = 0.30 \\times \\sin 30^\\circ = 0.30 \\times 0.50 = 0.15\\ \\text{N}\\).",
          "In both cases the force is at right angles to the plane holding the wire and the field.",
        ],
        answer: "0.30 N; 0.15 N",
      },
      selfCheckExample: {
        prompt:
          "A straight wire 0.50 m long carries a current of 3.0 A. It lies parallel to a uniform magnetic field of 0.20 T. What force does the field exert on the wire?",
        options: ["0 N", "0.30 N", "0.15 N", "0.60 N", "7.5 N"],
        steps: [
          "The wire is parallel to the field, so \\(\\theta = 0^\\circ\\) and \\(\\sin\\theta = 0\\). The force is zero.",
          "B is the force if the wire were at right angles. C uses \\(\\sin 30^\\circ\\). D leaves out the length; E divides by the field.",
        ],
        answer: "(A) 0 N",
      },
      practiceSet: [
        { prompt: "A 1.0 m wire carrying 2.0 A is at right angles to a 0.050 T field. Force?", answer: "0.10 N", method: "\\(0.050 \\times 2.0 \\times 1.0\\)" },
        { prompt: "A 0.40 m wire carrying 3.0 A at right angles to a field feels 0.60 N. What is the field?", answer: "0.50 T", method: "\\(B = F/(IL)\\)" },
        { prompt: "Two long parallel wires carry currents in the same direction. Do they attract or repel?", answer: "Attract", method: "Each wire sits in the other's field" },
      ],
      traps: [
        {
          title: "No force when the current runs along the field",
          body: "The force depends on \\(\\sin\\theta\\). A wire lying parallel to the field feels no force at all, however large the current or the field. The force is never along the field lines; it is always at right angles to them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mag-force-charge",
      name: "The force on a moving charge: F = qvB sinθ",
      intuition:
        "A current is just moving charges, so each moving charge in a field feels its own sideways push. Because the push is always at right angles to the motion, it can turn the particle but can never speed it up or slow it down. A charge at rest, or one moving along the field, feels nothing.",
      definition:
        "- A charge \\(q\\) moving at speed \\(v\\) at angle \\(\\theta\\) to a field \\(B\\) feels \\(F = qvB\\sin\\theta\\).\n" +
        "- The force is **perpendicular to the velocity** (and to the field). So it does **no work**: the speed and kinetic energy stay constant; only the direction changes.\n" +
        "- A charge **at rest**, or moving **parallel** to the field, feels **no** magnetic force. A neutral particle (neutron) feels none either.\n" +
        "- Direction: use Fleming's left-hand rule with the second finger along the direction of conventional current. For an electron, the current is opposite to its motion, so the force is reversed.",
      formula: {
        label: "Force on a moving charge",
        latex: "F = q v B \\sin\\theta",
        symbols: [
          { symbol: "\\(q\\)", meaning: "charge, in C" },
          { symbol: "\\(v\\)", meaning: "speed, in m/s" },
          { symbol: "\\(B\\)", meaning: "magnetic field, in T" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the velocity and the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A proton moves at \\(2.0 \\times 10^6\\ \\text{m/s}\\) at right angles to a magnetic field of 0.50 T. Find the force on it. What would the force be on an electron moving the same way at the same speed?",
        steps: [
          "\\(F = qvB = 1.6 \\times 10^{-19} \\times 2.0 \\times 10^6 \\times 0.50 = 1.6 \\times 10^{-13}\\ \\text{N}\\).",
          "An electron has a charge of the same size, so the force has the same size, \\(1.6 \\times 10^{-13}\\ \\text{N}\\).",
          "Its charge is negative, so the force points the opposite way.",
        ],
        answer: "\\(1.6 \\times 10^{-13}\\ \\text{N}\\) on each, in opposite directions",
      },
      selfCheckExample: {
        prompt:
          "A charged particle moves through a uniform magnetic field at right angles to the field lines. Which statement about the magnetic force on it is correct?",
        options: [
          "It increases the particle's speed",
          "It acts along the particle's velocity",
          "It is largest when the velocity is parallel to the field",
          "It would still act if the particle stopped moving",
          "It changes the direction of motion but not the speed",
        ],
        steps: [
          "The force is always perpendicular to the velocity, so it does no work and the speed stays constant: E.",
          "A and B would need a force component along the motion. C is backwards: parallel motion gives zero force. D is wrong because a charge at rest feels no magnetic force.",
        ],
        answer: "(E) It changes the direction of motion but not the speed",
      },
      practiceSet: [
        { prompt: "An alpha particle (charge \\(3.2 \\times 10^{-19}\\ \\text{C}\\)) moves at \\(1.0 \\times 10^5\\ \\text{m/s}\\) at right angles to a 0.20 T field. Force?", answer: "\\(6.4 \\times 10^{-15}\\ \\text{N}\\)", method: "\\(qvB\\)" },
        { prompt: "A neutron passes through a strong magnetic field. Is it deflected?", answer: "No", method: "It has no charge" },
        { prompt: "How much work does a magnetic field do on a charge moving through it?", answer: "None", method: "The force is always perpendicular to the motion" },
      ],
      traps: [
        {
          title: "A magnetic field cannot change a particle's speed",
          body: "The magnetic force is always at right angles to the velocity, so it does no work. The kinetic energy and speed stay the same; only the direction turns. To speed a charge up you need an electric field.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mag-circular",
      name: "Circular motion of a charged particle in a magnetic field",
      intuition:
        "A force that always pushes at right angles to the motion, with a constant size, is exactly what keeps something going round a circle. So a charge fired at right angles into a uniform field moves in a circle at constant speed. A faster particle swings round a wider circle, but it also travels faster, so the time for one lap stays the same.",
      definition:
        "For a charge entering a uniform field **at right angles**:\n" +
        "- The magnetic force provides the centripetal force: \\(qvB = mv^2/r\\), so \\(r = mv/(qB)\\).\n" +
        "- The motion is **uniform circular motion**: constant speed, but the **velocity changes** all the time because its direction changes.\n" +
        "- The period \\(T = 2\\pi r/v = 2\\pi m/(qB)\\) and the frequency \\(f = qB/(2\\pi m)\\) do **not** depend on the speed.\n" +
        "- Heavier or faster particles, weaker fields and smaller charges give wider circles.",
      formula: {
        label: "Radius and period of the circle",
        latex: "r = \\frac{m v}{q B} \\qquad T = \\frac{2\\pi m}{q B}",
        symbols: [
          { symbol: "\\(r\\)", meaning: "radius of the circle, in m" },
          { symbol: "\\(m\\)", meaning: "mass of the particle, in kg" },
          { symbol: "\\(v\\)", meaning: "speed, in m/s" },
          { symbol: "\\(T\\)", meaning: "time for one revolution, in s" },
        ],
      },
      authoredExample: {
        prompt:
          "A proton (\\(m = 1.67 \\times 10^{-27}\\ \\text{kg}\\), \\(q = 1.6 \\times 10^{-19}\\ \\text{C}\\)) enters a 0.20 T field at right angles with a speed of \\(3.0 \\times 10^6\\ \\text{m/s}\\). Find the radius of its path and the time for one revolution.",
        steps: [
          "\\(r = \\dfrac{mv}{qB} = \\dfrac{1.67 \\times 10^{-27} \\times 3.0 \\times 10^6}{1.6 \\times 10^{-19} \\times 0.20} = \\dfrac{5.01 \\times 10^{-21}}{3.2 \\times 10^{-20}} \\approx 0.16\\ \\text{m}\\).",
          "\\(T = \\dfrac{2\\pi m}{qB} = \\dfrac{2\\pi \\times 1.67 \\times 10^{-27}}{3.2 \\times 10^{-20}} \\approx 3.3 \\times 10^{-7}\\ \\text{s}\\).",
          "Check: \\(2\\pi r / v = 2\\pi \\times 0.157 / 3.0 \\times 10^6 \\approx 3.3 \\times 10^{-7}\\ \\text{s}\\).",
        ],
        answer: "About 0.16 m; about \\(3.3 \\times 10^{-7}\\ \\text{s}\\)",
      },
      selfCheckExample: {
        prompt:
          "A charged particle moves in a circle at right angles to a uniform magnetic field. Its speed is doubled while the field stays the same. What happens to the radius of its circle and to its period?",
        options: [
          "The radius doubles and the period doubles",
          "The radius doubles and the period is unchanged",
          "The radius halves and the period is unchanged",
          "The radius is unchanged and the period halves",
          "The radius quadruples and the period doubles",
        ],
        steps: [
          "\\(r = mv/(qB)\\), so doubling \\(v\\) doubles \\(r\\).",
          "\\(T = 2\\pi m/(qB)\\) has no \\(v\\) in it: the circle is twice as long, but the particle goes twice as fast, so the period is unchanged.",
          "A forgets the faster speed. E uses \\(r \\propto v^2\\), mixing the radius up with kinetic energy.",
        ],
        answer: "(B) The radius doubles and the period is unchanged",
      },
      practiceSet: [
        { prompt: "The field is doubled for the same particle and speed. What happens to the radius?", answer: "It halves", method: "\\(r \\propto 1/B\\)" },
        { prompt: "An electron and a proton enter the same field at the same speed. Which moves on the smaller circle?", answer: "The electron", method: "Same charge size, much smaller mass, so smaller \\(mv/(qB)\\)" },
        { prompt: "Is the velocity of a charge moving in a magnetic circle constant?", answer: "No; only its speed is constant", method: "The direction keeps changing" },
      ],
      traps: [
        {
          title: "Constant speed is not constant velocity",
          body: "In a magnetic field the speed stays fixed but the direction turns all the time, so the velocity (a vector) is always changing. Any statement that the particle keeps the same velocity after entering the field at right angles is false.",
        },
      ],
    },
  ],
};
