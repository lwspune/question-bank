import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_MC_PARALLEL_NOTE: SubtopicNote = {
  subtopicName: "Force Between Parallel Currents",
  title: "Force Between Parallel Currents and the Ampere",
  oneLineDefinition:
    "The force between two long parallel conductors carrying currents, why like currents attract, the definition of the ampere, and the net field and force when several wires or a loop are close together.",
  whyItMatters:
    "17 questions, fifteen of them from board papers. The board asks you to derive the force between two long parallel conductors (2024, 2025, 2026), define the ampere from it (2024, 2025), say whether two currents attract or repel (2023, 2024) and find the net field or the net force with three wires, or with a loop beside a long wire (every year from 2023 to 2026). The textbook adds the force on a section of wire and the force of the earth's field on a wire.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpmc-parallel-force",
      name: "Force between two long parallel conductors and the ampere",
      intuition:
        "Each wire makes a magnetic field, and the other wire's current sits in that field and feels a force. Currents flowing the same way pull the wires together; currents flowing opposite ways push them apart. This is the opposite of what charges do.",
      definition:
        "- **Step 1:** two long parallel conductors a and b are a distance d apart and carry currents \\(I_a\\) and \\(I_b\\). Conductor a makes at b the field \\(B_a = \\dfrac{\\mu_0 I_a}{2\\pi d}\\), at right angles to b.\n" +
        "- **Step 2:** a length L of b feels \\(F_{ba} = I_b L B_a = \\dfrac{\\mu_0 I_a I_b L}{2\\pi d}\\). For currents in the same direction it points towards a.\n" +
        "- **Step 3:** in the same way, a feels a force of the same size towards b: \\(\\vec{F}_{ba} = -\\vec{F}_{ab}\\), as Newton's third law requires.\n" +
        "- **Force per unit length:** \\(f = \\dfrac{\\mu_0 I_a I_b}{2\\pi d}\\).\n" +
        "- **Parallel currents attract; antiparallel currents repel.** Like charges repel, but like currents attract.\n" +
        "- **The ampere:** the steady current which, when maintained in each of two very long, straight, parallel conductors of negligible cross-section, placed one metre apart in vacuum, would produce on each a force of \\(2 \\times 10^{-7}\\) newton per metre of length.\n" +
        "- Two beams of charges are currents too: a beam of electrons and a beam of protons moving the same way are opposite currents, so they repel.",
      formula: {
        label: "Force per unit length between parallel currents",
        latex: "f = \\frac{F}{L} = \\frac{\\mu_0 I_a I_b}{2\\pi d}",
      },
      authoredExample: {
        prompt:
          "Two long parallel wires 5 cm apart carry currents of 4 A and 6 A in the same direction. Find the force on a 50 cm length of either wire and say whether it attracts or repels.",
        steps: [
          "Given: \\(I_a = 4\\) A, \\(I_b = 6\\) A, d = 0.05 m, L = 0.5 m.",
          "Formula: \\(f = \\dfrac{\\mu_0 I_a I_b}{2\\pi d}\\).",
          "\\(f = \\dfrac{2 \\times 10^{-7} \\times 4 \\times 6}{0.05} = 9.6 \\times 10^{-5}\\) N/m.",
          "\\(F = fL = 9.6 \\times 10^{-5} \\times 0.5 = 4.8 \\times 10^{-5}\\) N.",
          "The currents are in the same direction, so the force is attractive.",
        ],
        answer: "\\(4.8 \\times 10^{-5}\\) N, attractive",
      },
      selfCheckExample: {
        prompt:
          "Two long parallel wires 1 m apart in vacuum carry equal currents, and the force on each is \\(8 \\times 10^{-7}\\) N per metre. Find the current.",
        steps: ["\\(f = \\dfrac{\\mu_0 I^2}{2\\pi d} = 2 \\times 10^{-7} I^2\\) with d = 1 m.", "\\(I^2 = \\dfrac{8 \\times 10^{-7}}{2 \\times 10^{-7}} = 4\\), so I = 2 A."],
        answer: "2 A",
      },
      practiceSet: [
        { prompt: "Two long parallel wires carry currents in opposite directions. Do they attract or repel?", answer: "They repel" },
        { prompt: "The distance between two long parallel currents is halved. What happens to the force per unit length?", answer: "It doubles" },
        { prompt: "Both currents in two long parallel wires are doubled. What happens to the force per unit length?", answer: "It becomes four times as large" },
      ],
      pyqExampleId: "bb138950-4474-436b-a19b-5ea55b440972",
      traps: [
        {
          title: "Saying like currents repel",
          body: "Currents in the same direction attract and opposite currents repel. Thinking of like charges gets this backwards.",
        },
        {
          title: "A definition of the ampere with parts missing",
          body: "The definition needs every condition: very long, straight, parallel, negligible cross-section, one metre apart, in vacuum, and a force of \\(2 \\times 10^{-7}\\) N per metre of length.",
        },
        {
          title: "No figure for the direction of the force",
          body: "Draw the two wires with their current arrows, mark the field of one at the other, and show the force. The direction of the force is often a separate mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-parallel-net",
      name: "Net field and net force with several wires, or a loop beside a wire",
      intuition:
        "With more than two wires, work out each wire's effect on its own, give it its direction, and then add. A loop beside a long wire is pulled by its near side more strongly than it is pushed by its far side.",
      definition:
        "- **Field between two wires:** for currents in the same direction the two fields are opposite in the space between the wires and subtract; for opposite currents they point the same way there and add.\n" +
        "- **Force on one of three wires:** find the force from each of the other two with \\(f = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}\\), using its own distance, decide attract or repel for each, and add them as vectors.\n" +
        "- **A rectangular loop in the same plane as a long wire:** the forces on the two sides at right angles to the wire are equal and opposite and cancel. The side parallel to the wire at distance \\(d_1\\) and the far side at \\(d_2\\) carry opposite currents, so the net force is \\(F = \\dfrac{\\mu_0 I_1 I_2 l}{2\\pi}\\left(\\dfrac{1}{d_1} - \\dfrac{1}{d_2}\\right)\\), where l is the length of those sides. It is towards the wire when the near side's current is in the same direction as the wire's.\n" +
        "- The torque on such a loop is zero: the wire's field is at right angles to the plane of the loop, so it is along the loop's magnetic moment.",
      formula: {
        label: "Net force on a loop beside a long wire",
        latex: "F = \\frac{\\mu_0 I_1 I_2 l}{2\\pi}\\left(\\frac{1}{d_1} - \\frac{1}{d_2}\\right)",
      },
      authoredExample: {
        prompt:
          "Three long parallel wires A, B and C lie in one plane with B midway, AB = BC = 4 cm. A carries 1 A upwards, B carries 5 A upwards and C carries 3 A downwards. Find the net force per unit length on B.",
        steps: [
          "A on B: same direction, so attraction, towards A. \\(f_A = \\dfrac{2 \\times 10^{-7} \\times 1 \\times 5}{0.04} = 2.5 \\times 10^{-5}\\) N/m.",
          "C on B: opposite directions, so repulsion, pushing B away from C, that is towards A. \\(f_C = \\dfrac{2 \\times 10^{-7} \\times 3 \\times 5}{0.04} = 7.5 \\times 10^{-5}\\) N/m.",
          "Both act towards A, so they add: \\(f = 2.5 \\times 10^{-5} + 7.5 \\times 10^{-5} = 1.0 \\times 10^{-4}\\) N/m.",
        ],
        answer: "\\(1.0 \\times 10^{-4}\\) N/m, towards A",
      },
      selfCheckExample: {
        prompt: "Two long parallel wires 9 cm apart carry 5 A and 4 A in the same direction. Where between them is the magnetic field zero?",
        steps: [
          "Between the wires the two fields are opposite. Let the point be x from the 5 A wire.",
          "\\(\\dfrac{5}{x} = \\dfrac{4}{9 - x}\\), so 45 − 5x = 4x and x = 5 cm.",
        ],
        answer: "5 cm from the 5 A wire (4 cm from the 4 A wire)",
      },
      practiceSet: [
        { prompt: "A rectangular loop lies in the same plane as a long straight current-carrying wire. What is the torque on the loop?", answer: "Zero" },
        {
          prompt: "Two long wires carry currents in the same direction. Is the field midway between them stronger or weaker than the field of either wire alone?",
          answer: "Weaker; the two fields are opposite there",
        },
        {
          prompt: "Is the net force on a current loop beside a long straight wire zero?",
          answer: "No; the near side is closer to the wire, so its force is larger than the far side's",
        },
      ],
      pyqExampleId: "5cf30228-88e9-4a58-bd66-e943342fa4e4",
      traps: [
        {
          title: "Mixing the two distances",
          body: "The field at the midpoint uses half the separation; the force between the wires uses the whole separation. Write each distance down before you substitute.",
        },
        {
          title: "Adding the fields when they oppose",
          body: "Find the direction of each wire's field at the point first, with the right-hand thumb rule. Between two wires with currents in the same direction, the fields subtract.",
        },
      ],
    },
  ],
};
