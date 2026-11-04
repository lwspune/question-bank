import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 12 Magnetic Effects of Electric Current.
 * Statements checked against the NCERT text (rules and definitions in the
 * book's own words). Most-asked years and marks from the CBSE board past-paper
 * questions in the bank, 2022-2026. Left out as old syllabus (the rationalised
 * book no longer teaches them, last set 2022-2023): electromagnetic induction,
 * the electric motor, and AC versus DC.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "Magnetic Effects of Electric Current",
  chapterSlug: "magnetic-effects-of-electric-current",
  source: "NCERT Science (CBSE Class 10), Chapter 12",
  keyPoints: [
    {
      term: "Oersted's observation",
      text: "A compass needle placed near a current-carrying wire is deflected; reversing the current reverses the deflection. Oersted showed that electricity and magnetism are related: a current produces a magnetic field.",
    },
    {
      term: "Magnetic field lines",
      text: "The region round a magnet in which its force can be detected is its magnetic field; it has both direction and magnitude. Field lines are traced with a compass. By convention they emerge from the north pole and merge at the south pole outside the magnet, and go from south to north inside it: they are **closed curves**.",
    },
    {
      term: "Properties of field lines",
      text: "No two field lines cross: if they did, the compass needle would point two ways at one point, which is impossible. The field is stronger where the lines are crowded (near the poles). The direction of the field at a point is the tangent to the line there. Parallel, equally spaced lines show a uniform field.",
    },
    {
      term: "Field of a straight conductor",
      text: "The field lines are **concentric circles** centred on the wire, in a plane perpendicular to it. The field is stronger for a larger current and weaker farther from the wire (it depends inversely on the distance). Reversing the current reverses the direction.",
    },
    {
      term: "Right-hand thumb rule",
      text: "Hold a current-carrying straight conductor in your right hand with the thumb pointing in the direction of current; the fingers wrapped around it show the direction of the magnetic field lines.",
    },
    {
      term: "Field of a circular loop",
      text: "Near the wire the lines are circles; at the centre of the loop they become nearly straight, and every part of the loop adds to the field in the same direction. For a coil of n turns the field is n times that of one turn. It is stronger for a larger current and more turns.",
    },
    {
      term: "Solenoid",
      text: "A coil of many circular turns of insulated copper wire wrapped closely in the shape of a cylinder. Its field pattern is like that of a bar magnet: one end acts as a north pole, the other as a south pole. Inside, the field lines are parallel straight lines: the field is **uniform**.",
    },
    {
      term: "Electromagnet",
      text: "The strong field inside a current-carrying solenoid magnetises a soft iron core placed in it: an electromagnet. It is stronger with more turns, a larger current and a soft iron core, and stops being a magnet when the current is switched off.",
    },
    {
      term: "Force on a current-carrying conductor",
      text: "A current-carrying rod in a magnetic field is pushed sideways: a force acts on it. The force is largest when the current is perpendicular to the field, and zero when parallel. Reversing the current, or the field, reverses the force. A moving charge feels the same force (an alpha particle is a positive charge, an electron negative).",
    },
    {
      term: "Fleming's left-hand rule",
      text: "Stretch the thumb, forefinger and middle finger of the left hand so they are mutually perpendicular. If the forefinger points in the direction of the magnetic field and the middle finger in the direction of current, the thumb points in the direction of motion or the force on the conductor.",
    },
    {
      term: "Domestic electric circuits",
      text: "Supply comes by the **live** wire (red insulation) and the **neutral** wire (black); in India the potential difference between them is 220 V. It passes through a main fuse and the electricity meter. Two circuits: 15 A for geysers and air coolers, 5 A for bulbs and fans. Appliances are joined in parallel, each with its own switch.",
    },
    {
      term: "Earth wire",
      text: "The earth wire (green insulation) is connected to a metal plate deep in the earth. The metallic body of an appliance (iron, toaster, refrigerator) is joined to it, giving a low-resistance path, so any leakage current keeps the body at earth's potential and the user does not get a severe shock.",
    },
    {
      term: "Fuse, short-circuiting and overloading",
      text: "**Short-circuiting:** the live and neutral wires come into direct contact (damaged insulation, a fault in an appliance), so the current rises sharply. **Overloading:** too many appliances on one socket, or an accidental hike in supply voltage. The fuse melts and stops the unduly high current, protecting the circuit and appliances.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Field lines around a bar magnet (Figure 12.4)",
      labels: ["N and S poles", "lines from N to S outside", "arrows on every line", "lines crowded near the poles, never crossing"],
    },
    {
      title: "Field lines around a straight conductor (Figure 12.6)",
      labels: ["wire through a cardboard", "concentric circles", "direction by right-hand thumb rule", "circles farther apart away from the wire"],
    },
    {
      title: "Field lines of a circular loop (Figure 12.8)",
      labels: ["current direction in the loop", "circles near each side of the wire", "nearly straight lines at the centre", "arrows in opposite senses at the two sides"],
    },
    {
      title: "Field lines of a solenoid (Figure 12.10)",
      labels: ["turns of the coil and current direction", "parallel lines inside (uniform field)", "N and S ends", "lines outside like a bar magnet"],
    },
    {
      title: "Fleming's left-hand rule (Figure 12.13)",
      labels: ["forefinger: magnetic field", "middle finger: current", "thumb: force (motion)", "all three mutually perpendicular"],
    },
    {
      title: "A domestic electric circuit (Figure 12.15)",
      labels: ["live, neutral and earth wires", "electricity meter and main fuse", "distribution box", "appliances in parallel, each with a switch"],
    },
  ],
  mostAsked: [
    {
      topic: "Force on a current-carrying conductor: activity with a rod in a magnet, Fleming's left-hand rule, when the force is largest, deflection of alpha particles",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Field of a straight wire and a circular loop: pattern of field lines, right-hand thumb rule, what the strength depends on",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Magnetic field lines: draw them for a bar magnet, properties, why two lines never cross, how closeness shows strength",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Solenoid and electromagnet: field pattern like a bar magnet, uniform field inside, factors for its strength",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Domestic circuits and safety: live, neutral and earth wires, earthing, fuse, short-circuiting and overloading, 5 A and 15 A circuits",
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Using the right hand for the force",
      body: "Right-hand **thumb** rule: direction of the magnetic field around a current. Fleming's **left**-hand rule: direction of the force on a current in a field.",
    },
    {
      title: "Field lines drawn wrong",
      body: "Every line needs an arrow: N to S outside a magnet, S to N inside. Lines never cross and never start or end in mid-air. For a straight wire draw circles, closer together near the wire.",
    },
    {
      title: "Wrong direction of current for a moving charge",
      body: "For an alpha particle or a positron, the current is in its direction of motion. For an electron, the current is **opposite** to its motion. Then apply Fleming's left-hand rule.",
    },
    {
      title: "Earth wire and fuse confused",
      body: "The earth wire protects the **user** from a shock through a metal body. The fuse protects the **circuit and appliances** from too large a current. A fuse goes in series in the live wire.",
    },
    {
      title: "What the solenoid's strength depends on",
      body: "It depends on the number of turns, the current and the core material (soft iron). It does not depend on the direction of the current, which only changes which end is N.",
    },
  ],
};

export default sheet;
