import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology I, Ch. 4 Effects of Electric Current.
 * Statements checked against the Balbharati text; most-asked years from the
 * board past papers in the bank, 2016-2026 (old-syllabus series-resistor,
 * potential-difference and electroplating questions left out).
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology I",
  subjectRoute: "science-and-technology-i",
  chapterName: "Effects of Electric Current",
  chapterSlug: "effects-of-electric-current",
  source: "Balbharati Science and Technology Part 1 Std X (Maharashtra State Board), Chapter 4",
  keyPoints: [
    {
      term: "Heating effect and Joule's law",
      text: "When a resistor is connected in a circuit, heat is produced in it due to the current. \\(H = I^2Rt\\) is called Joule's law of heating.",
    },
    {
      term: "Electric power",
      text: "Electrical energy used per unit time, \\(P = VI\\). SI unit watt: 1 W = 1 J/s. In practice energy is measured in kWh (1 unit): 1 kWh = \\(3.6 \\times 10^6\\) J.",
    },
    {
      term: "Nichrome and tungsten",
      text: "Heating devices use conductors of higher resistivity. Heaters and irons use a **nichrome** coil (an alloy). A bulb uses a solenoid-type **tungsten** coil, which glows at about 3400 °C.",
    },
    {
      term: "Short circuit, overloading and fuse",
      text: "Short circuit: the live and neutral wires (220 V apart) touch and a large current flows, which can cause a fire. Overloading: too much current is drawn. A fuse wire melts and breaks the circuit; homes now use MCBs.",
    },
    {
      term: "Field around a straight conductor",
      text: "Magnetic lines of force are concentric circles around the wire. The field is stronger for a larger current and weaker farther from the wire.",
    },
    {
      term: "Right hand thumb rule",
      text: "Hold the conductor in your right hand with the thumb along the current. The direction in which the fingers curl is the direction of the magnetic lines of force. Also called Maxwell's cork-screw rule.",
    },
    {
      term: "Solenoid",
      text: "A copper wire with a resistive coating wound in a chain of loops like a spring. With a current its field is like a bar magnet's: one end acts as N, the other as S. Inside, the lines are parallel, so the field is uniform.",
    },
    {
      term: "Fleming's left hand rule",
      text: "Stretch the left hand thumb, index finger and middle finger perpendicular to each other. Index finger: magnetic field. Middle finger: current. Thumb: force on the conductor.",
    },
    {
      term: "Electric motor",
      text: "A device changing electrical energy into mechanical energy. Works on the force on a current-carrying conductor in a magnetic field. Used in fans, refrigerators, mixers, washing machines, pumps.",
    },
    {
      term: "Galvanometer",
      text: "A sensitive device that works on the same principle as an electric motor. It detects small currents; its pointer deflects on both sides of zero. Ammeters and voltmeters work on the same principle.",
    },
    {
      term: "Electromagnetic induction",
      text: "Whenever the number of magnetic lines of force passing through a coil changes, a current is induced in it (Faraday, 1831). A moving magnet, a moving coil or a changing current can do this.",
    },
    {
      term: "Fleming's right hand rule",
      text: "Stretch the right hand thumb, index finger and middle finger perpendicular to each other. Thumb: motion of the conductor. Index finger: magnetic field. Middle finger: induced current.",
    },
    {
      term: "AC and DC",
      text: "DC flows in one direction. AC reverses direction at regular intervals. In India AC has a frequency of **50 Hz**. AC is used for transmission because power loss is least. Home supply is AC.",
    },
    {
      term: "Electric generator",
      text: "Changes mechanical energy into electrical energy by electromagnetic induction. An AC generator uses two conducting (slip) rings; a DC generator uses a split ring, like a motor.",
    },
  ],
  formulas: [
    { label: "Electric power", latex: "P = VI = I^2R = \\frac{V^2}{R}" },
    { label: "Joule's law of heating", latex: "H = VIt = I^2Rt = \\frac{V^2t}{R}" },
    { label: "Ohm's law", latex: "V = IR" },
    {
      label: "Electrical energy in units",
      latex: "E\\,(\\text{kWh}) = P\\,(\\text{kW}) \\times t\\,(\\text{h}) \\qquad 1\\ \\text{kWh} = 3.6 \\times 10^6\\ \\text{J}",
    },
    { label: "Bulb on mains: worked values", latex: "P = 220 \\times 0.45 = 99\\ \\text{W} \\qquad 99\\ \\text{W} \\times 10\\ \\text{h} = 0.99\\ \\text{kWh}" },
    { label: "Bulbs in parallel on 220 V", latex: "I = I_1 + I_2 = \\frac{P_1}{V} + \\frac{P_2}{V}" },
  ],
  derivations: [
    {
      title: "Joule's law of heating",
      steps: [
        "The cell gives energy \\(VQ\\) in time \\(t\\), so power \\(P = \\frac{VQ}{t} = VI\\) because \\(\\frac{Q}{t} = I\\).",
        "Heat in time \\(t\\): \\(H = Pt = VIt\\).",
        "Ohm's law \\(V = IR\\) gives \\(H = I^2Rt\\), or \\(H = \\frac{V^2t}{R}\\).",
      ],
    },
    {
      title: "Electric motor: principle, construction and working",
      steps: [
        "Principle: a current-carrying conductor in a magnetic field experiences a force (Fleming's left hand rule).",
        "Construction: rectangular coil ABCD between the poles of a magnet; its ends go to split ring halves X and Y, touching carbon brushes E and F.",
        "Current flows A to B: the force pushes AB down and CD up, so the coil turns anticlockwise.",
        "After half a rotation the split rings swap brushes, the current in the coil reverses, and the coil keeps turning the same way.",
      ],
    },
    {
      title: "AC generator: principle and working",
      steps: [
        "Principle: electromagnetic induction. Mechanical energy rotates a coil in a magnetic field.",
        "Coil ABCD between the pole pieces; its ends go to conducting rings R1 and R2 with brushes B1 and B2 and a galvanometer.",
        "As AB goes up and CD down, current flows ABCD (Fleming's right hand rule).",
        "After half a rotation it flows DCBA, so the current in the external circuit reverses every half turn: AC. A split ring instead gives DC.",
      ],
    },
  ],
  diagrams: [
    { title: "Electric motor", labels: ["coil ABCD", "magnet N and S poles", "split ring halves X and Y", "carbon brushes E and F", "axle", "battery"] },
    { title: "Electric generator (AC)", labels: ["coil ABCD", "magnetic field", "conducting rings R1 and R2", "carbon brushes B1 and B2", "axle", "galvanometer"] },
    { title: "Magnetic lines of force of a solenoid", labels: ["solenoid coil", "N and S ends", "parallel lines inside", "current direction"] },
    { title: "Fleming's left hand rule", labels: ["thumb: force on the conductor", "index finger: magnetic field", "middle finger: current"] },
    { title: "Fleming's right hand rule", labels: ["thumb: motion of the conductor", "index finger: magnetic field", "middle finger: induced current"] },
    { title: "Right hand thumb rule", labels: ["thumb: electric current", "curled fingers: magnetic field", "right hand"] },
  ],
  mostAsked: [
    { topic: "Electric motor (or generator) from a diagram: identify it, principle, construction, working and uses", marks: 5, years: [2026, 2024, 2022, 2018, 2016] },
    { topic: "Odd one out among devices (motor, loudspeaker, microphone, galvanometer, generator)", marks: 1, years: [2026, 2025, 2024, 2023, 2020, 2016] },
    { topic: "Power and energy: power of a bulb, units consumed, heat produced, current in parallel bulbs", years: [2026, 2024, 2019, 2016] },
    { topic: "Identify the figures and explain their use", marks: 3, years: [2025, 2024, 2023] },
    { topic: "State or label the right hand thumb rule, Fleming's left hand rule, Fleming's right hand rule", marks: 2, years: [2026, 2022, 2020, 2018] },
    { topic: "Generator and AC: device that produces electricity, frequency of AC in India (50 Hz)", marks: 1, years: [2026, 2025, 2023, 2020] },
    { topic: "Heating devices and safety: tungsten, nichrome, short circuit and fuse", years: [2025, 2020, 2019] },
    { topic: "What is a solenoid? Draw and label it", marks: 3, years: [2024] },
  ],
  mistakes: [
    {
      title: "Swapping the motor and the generator",
      body: "Motor: electrical to mechanical, left hand rule. Generator: mechanical to electrical, right hand rule. A motor does not convert mechanical energy into electrical energy.",
    },
    {
      title: "Mixing up the finger meanings",
      body: "In both Fleming's rules the index finger is the field. The middle finger is the current, and the thumb is the force (left) or the motion (right).",
    },
    {
      title: "Using W and kW, h and s together",
      body: "For units of electricity, use kW and hours: 99 W for 10 h is 990 Wh = 0.99 kWh. Use joules only with watts and seconds.",
    },
    {
      title: "Split ring or slip rings",
      body: "A motor and a DC generator use a **split ring**. An AC generator uses two full **conducting rings**.",
    },
    {
      title: "Saying a heater coil is pure metal",
      body: "Heating coils are the alloy nichrome, which has a high resistivity. Copper or aluminium is used for transmission wires.",
    },
  ],
};

export default sheet;
