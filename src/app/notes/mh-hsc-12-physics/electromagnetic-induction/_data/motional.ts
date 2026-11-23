import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_EM_MOTIONAL_NOTE: SubtopicNote = {
  subtopicName: "Motional Electromotive Force",
  title: "Motional e.m.f.: Sliding and Rotating Conductors",
  oneLineDefinition:
    "The e.m.f. induced in a conductor that moves through a magnetic field: Blv for a sliding rod, the Earth's field acting on wings, axles and falling wires, and half Bωl² for a rod or disc that rotates.",
  whyItMatters:
    "12 questions. Six were set in board papers: derive the e.m.f. of a conductor sliding in a uniform field (2022), derive the e.m.f. of a rod rotating about one end (asked twice in 2025, and as an MCQ in 2026), the e.m.f. across the wing tips of an aircraft (2024) and across a falling wire (2023). The textbook adds a railway axle, a falling wire, the Faraday disc and a spinning metal disc.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpem-sliding-rod",
      name: "Motional e.m.f. of a sliding conductor",
      intuition:
        "A rod moving through a field carries its free electrons with it, and a moving charge in a magnetic field feels a force. That force pushes the electrons along the rod until one end is charged negative and the other positive. The rod has become a cell, and its e.m.f. is Blv.",
      definition:
        "- **Derivation (textbook labelling):** a C-shaped frame ABCD lies in a uniform field \\(B\\) normal to its plane. A wire BC of length \\(l\\) slides on the frame with velocity \\(v\\), at distance \\(x\\) from AD.\n" +
        "- Step 1: the area of the loop is \\(lx\\), so the flux is \\(\\phi = Blx\\).\n" +
        "- Step 2: only \\(x\\) changes, so \\(\\dfrac{d\\phi}{dt} = Bl\\dfrac{dx}{dt} = Blv\\).\n" +
        "- Step 3: by Faraday's law, \\(|e| = \\dfrac{d\\phi}{dt} = Blv\\).\n" +
        "- **Check by force:** a charge \\(q\\) in BC feels the Lorentz force \\(F = qvB\\sin\\theta\\) along the wire. The work done over length \\(l\\) is \\(W = qvBl\\sin\\theta\\), so \\(e = W/q = Blv\\sin\\theta\\). It is greatest, \\(e_{max} = Blv\\), when \\(v\\) is perpendicular to \\(B\\).\n" +
        "- A rod moving parallel to the field has no e.m.f. The direction of the induced current comes from Lenz's law.",
      formula: {
        label: "Motional e.m.f.",
        latex: "e = Blv\\sin\\theta, \\qquad e_{max} = Blv",
        symbols: [
          { symbol: "\\(l\\)", meaning: "length of the conductor, in metre" },
          { symbol: "\\(v\\)", meaning: "speed of the conductor, in metre per second" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the velocity and the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A rod 40 cm long slides at 5 m/s along a pair of rails, perpendicular to a uniform magnetic field of 0.3 T. The rails are joined by a 2 Ω resistor, and all other resistance is negligible. Find the e.m.f. induced in the rod and the current in the resistor.",
        steps: [
          "Given: \\(l = 0.40\\) m, \\(v = 5\\) m/s, \\(B = 0.3\\) T, \\(R = 2\\ \\Omega\\).",
          "Formula: \\(e = Blv\\).",
          "Substitution: \\(e = 0.3 \\times 0.40 \\times 5 = 0.6\\) V.",
          "Current: \\(I = \\dfrac{e}{R} = \\dfrac{0.6}{2} = 0.3\\) A.",
        ],
        answer: "e.m.f. 0.6 V; current 0.3 A",
      },
      selfCheckExample: {
        prompt:
          "A straight wire 2 m long moves at 3 m/s in a field of 0.5 T. The wire is perpendicular to both the field and its velocity, and the velocity makes 30° with the field. Find the e.m.f.",
        steps: [
          "\\(e = Blv\\sin\\theta = 0.5 \\times 2 \\times 3 \\times \\sin 30^\\circ\\).",
          "\\(e = 3 \\times 0.5 = 1.5\\) V.",
        ],
        answer: "1.5 V",
      },
      practiceSet: [
        { prompt: "A rod moves along the direction of a uniform magnetic field. What e.m.f. is induced in it?", answer: "Zero, since \\(\\sin 0^\\circ = 0\\)" },
        { prompt: "A rod 25 cm long moves at 8 m/s perpendicular to a field of 0.4 T. Find the e.m.f. between its ends.", answer: "\\(0.4 \\times 0.25 \\times 8 = 0.8\\) V" },
        { prompt: "In the motional e.m.f. of a moving rod, what does the work done per unit charge by the magnetic force equal?", answer: "The induced e.m.f., \\(Blv\\)" },
      ],
      pyqExampleId: "29a5b491-dd6e-4835-93c4-c41ebd8e26d9",
      traps: [
        {
          title: "A derivation with no diagram",
          body: "Draw the frame with the field direction, the sliding wire, its length \\(l\\), its velocity \\(v\\) and the distance \\(x\\). The examiner reads \\(\\phi = Blx\\) off your diagram.",
        },
        {
          title: "Using Blv when the motion is slanted",
          body: "Blv holds only when the rod, its velocity and the field are all at right angles. Otherwise multiply by \\(\\sin\\theta\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpem-earth-field",
      name: "Rods moving in the Earth's magnetic field",
      intuition:
        "An aircraft's wings, a train's axle and a falling wire are all rods moving through the Earth's field. The question is which part of that field they actually cut. Only the part of B perpendicular to both the rod and its velocity counts, which is why these questions name a vertical or a horizontal component.",
      definition:
        "- Use \\(e = B_\\perp l v\\), where \\(B_\\perp\\) is the part of the field perpendicular to both the rod and its velocity. This is the \\(\\sin\\theta\\) of \\(e = Blv\\sin\\theta\\) at work.\n" +
        "- A horizontal rod moving horizontally (wing tips of a level aircraft, a railway axle): use the **vertical** component.\n" +
        "- A horizontal rod lying east to west and falling vertically: use the **horizontal** component.\n" +
        "- An e.m.f. exists between the ends even when no current flows; current needs a closed circuit.\n" +
        "- Change km/h to m/s by multiplying by \\(\\dfrac{5}{18}\\).\n" +
        "- For a body falling freely from rest, the speed after falling a height h is \\(v = \\sqrt{2gh}\\), and after a time t is \\(v = gt\\).",
      formula: {
        label: "E.m.f. in the Earth's field",
        latex: "e = B_\\perp\\, l\\, v",
      },
      authoredExample: {
        prompt:
          "A metal rod 1.5 m long is held horizontal along the east-west line and released from rest. The horizontal component of the Earth's field is \\(3 \\times 10^{-5}\\) T. Find the e.m.f. across the rod 2 s after it is released (g = 10 m/s²).",
        steps: [
          "Given: \\(l = 1.5\\) m, \\(B_H = 3 \\times 10^{-5}\\) T, \\(t = 2\\) s, \\(g = 10\\) m/s².",
          "Speed after 2 s: \\(v = gt = 10 \\times 2 = 20\\) m/s.",
          "The rod falls vertically and lies east-west, so the horizontal component is the one it cuts: \\(e = B_H l v\\).",
          "Substitution: \\(e = 3 \\times 10^{-5} \\times 1.5 \\times 20 = 9 \\times 10^{-4}\\) V.",
        ],
        answer: "\\(9 \\times 10^{-4}\\) V (0.9 mV)",
      },
      selfCheckExample: {
        prompt:
          "The steel axle of a car is 1.8 m long. The car moves on a level road at 90 km/h where the vertical component of the Earth's field is \\(5 \\times 10^{-5}\\) T. Find the e.m.f. between the ends of the axle.",
        steps: [
          "\\(v = 90 \\times \\dfrac{5}{18} = 25\\) m/s.",
          "\\(e = B_V l v = 5 \\times 10^{-5} \\times 1.8 \\times 25 = 2.25 \\times 10^{-3}\\) V.",
        ],
        answer: "2.25 mV",
      },
      practiceSet: [
        { prompt: "Convert 54 km/h into m/s.", answer: "15 m/s" },
        { prompt: "An e.m.f. exists between the wing tips of a flying aircraft. Why does no current flow through the wings?", answer: "There is no closed circuit for the charge to flow round" },
        { prompt: "A horizontal rod 10 m long lying east to west falls at 5 m/s. The horizontal component of the Earth's field is \\(4 \\times 10^{-5}\\) T. Find the e.m.f.", answer: "\\(4 \\times 10^{-5} \\times 10 \\times 5 = 2 \\times 10^{-3}\\) V" },
      ],
      pyqExampleId: "249ccd51-275a-445e-9742-35b75642f179",
      traps: [
        {
          title: "Speed left in km/h",
          body: "A speed in km/h must be changed to m/s before it goes into Blv. Forgetting makes the answer 3.6 times too large.",
        },
        {
          title: "Picking the wrong component",
          body: "A rod moving horizontally cuts only the vertical component; a rod falling vertically cuts only the horizontal one. Check which component is perpendicular to both the rod and its velocity.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpem-rotating-rod",
      name: "E.m.f. of a rotating rod and a rotating disc",
      intuition:
        "A rod turning about one end is not one rod moving at one speed. The end at the pivot does not move at all, and the free end moves fastest. So you cut the rod into tiny pieces, each a little sliding rod, and add their e.m.f.s. The average speed is half the tip speed, and that is where the half comes from.",
      definition:
        "- **Derivation (textbook labelling):** a rod of length \\(l\\) turns about one end with angular velocity \\(\\omega\\) in a uniform field \\(B\\) perpendicular to its plane of rotation.\n" +
        "- Step 1: take a small segment \\(dr\\) at distance \\(r\\) from the pivot. Its speed is \\(v = \\omega r\\).\n" +
        "- Step 2: the segment acts like a sliding bar, so \\(de = Bv\\,dr = B\\omega r\\,dr\\).\n" +
        "- Step 3: the segments are in series, so their e.m.f.s add: \\(e = \\int_0^l B\\omega r\\,dr = B\\omega\\left[\\dfrac{r^2}{2}\\right]_0^l\\).\n" +
        "- Step 4: \\(e = \\dfrac{1}{2}B\\omega l^2\\). With \\(\\omega = 2\\pi f\\), \\(e = \\pi B f l^2\\).\n" +
        "- **Metal disc (Faraday disc):** every radius is such a rod, so the e.m.f. between the centre and the rim of a disc of radius R is \\(\\dfrac{1}{2}B\\omega R^2\\). It equals B times the area swept per second, and it is steady, not alternating.",
      formula: {
        label: "Rotating rod",
        latex: "e = \\frac{1}{2}B\\omega l^2",
      },
      authoredExample: {
        prompt:
          "A metal rod 0.5 m long rotates about one end at 10 revolutions per second, in a plane perpendicular to a uniform magnetic field of 0.4 T. Find the e.m.f. induced between its ends.",
        steps: [
          "Given: \\(l = 0.5\\) m, \\(f = 10\\) rev/s, \\(B = 0.4\\) T.",
          "\\(\\omega = 2\\pi f = 2\\pi \\times 10 = 62.83\\) rad/s.",
          "Formula: \\(e = \\dfrac{1}{2}B\\omega l^2\\).",
          "Substitution: \\(e = \\dfrac{1}{2} \\times 0.4 \\times 62.83 \\times (0.5)^2 = 3.14\\) V.",
        ],
        answer: "3.14 V",
      },
      selfCheckExample: {
        prompt:
          "A rod 1 m long rotates about one end with an angular velocity of 20 rad/s in a field of 0.1 T perpendicular to its plane of rotation. Find the e.m.f.",
        steps: [
          "\\(e = \\dfrac{1}{2}B\\omega l^2 = \\dfrac{1}{2} \\times 0.1 \\times 20 \\times 1^2\\).",
          "\\(e = 1\\) V.",
        ],
        answer: "1 V",
      },
      practiceSet: [
        { prompt: "Why does the e.m.f. of a rod rotating about one end carry a factor of one half that Blv for a sliding rod does not?", answer: "The speed grows from zero at the pivot to \\(\\omega l\\) at the tip, so the average speed is \\(\\omega l/2\\)" },
        { prompt: "A metal disc of radius 20 cm spins at 50 rad/s about its axis in a field of 0.5 T along the axis. Find the e.m.f. between its centre and rim.", answer: "\\(\\dfrac{1}{2} \\times 0.5 \\times 50 \\times 0.2^2 = 0.5\\) V" },
        { prompt: "Is the e.m.f. of a Faraday disc dynamo steady or alternating?", answer: "Steady, because the disc sweeps out area at a constant rate" },
      ],
      pyqExampleId: "783d9a70-6604-4700-9bd8-87644da1975b",
      traps: [
        {
          title: "Using the tip speed for the whole rod",
          body: "Writing \\(e = Bl(\\omega l)\\) treats every point as moving as fast as the tip and gives twice the right answer. Integrate, or use the average speed \\(\\omega l/2\\).",
        },
        {
          title: "Revolutions per second used as ω",
          body: "\\(\\omega\\) is in radian per second. A speed given in revolutions per second or per minute must be multiplied by \\(2\\pi\\) (and divided by 60 for rpm).",
        },
      ],
    },
  ],
};
