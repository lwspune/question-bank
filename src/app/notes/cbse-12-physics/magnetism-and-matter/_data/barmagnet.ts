import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_MM_BARMAGNET_NOTE: SubtopicNote = {
  subtopicName: "The Bar Magnet",
  title: "The Bar Magnet",
  oneLineDefinition:
    "A bar magnet as a magnetic dipole: its poles and field lines, why it behaves like a current-carrying solenoid, its field on the axis and on the equatorial line, and the torque and potential energy of a magnet in a uniform field.",
  whyItMatters:
    "15 questions. Six were set in board papers: the potential energy and equilibrium of two magnetised needles (2023), the force and torque on an iron needle near a bar magnet and the work and torque in turning a magnet in a field (2024), and the axial field of a small dipole, the angle a magnet turns through as its torque halves, and the potential energy and the work to turn a magnet through 180° (2025). The textbook adds the magnetic moment of a solenoid, the torque on a magnet or a solenoid at an angle to a field, stable and unstable positions, and the field of a short magnet at a given distance.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpmm-poles",
      name: "Poles, field lines and the equivalent solenoid",
      intuition:
        "Iron filings round a bar magnet line up just like those round a current-carrying solenoid, so a bar magnet is best pictured as a huge number of tiny circulating currents. That one picture explains its poles, its field lines and why its two poles can never be separated.",
      definition:
        "- A freely suspended bar magnet points roughly north and south. The end pointing to geographic north is the **north pole**, the other the **south pole**.\n" +
        "- Like poles repel and unlike poles attract.\n" +
        "- **Isolated poles (magnetic monopoles) do not exist.** Breaking a magnet gives two smaller magnets with weaker properties.\n" +
        "- The field lines of a magnet are **continuous closed loops**: outside the magnet they run from N to S, inside from S to N.\n" +
        "- The tangent to a field line gives the direction of the field there, and the number of lines crossing a unit area shows its strength.\n" +
        "- A bar magnet and a finite current-carrying solenoid give the same pattern of field lines and the same far field. The magnetic moment of a bar magnet is that of the solenoid which gives the same field.",
      table: {
        columns: ["Fact", "Reason"],
        rows: [
          {
            cells: ["Cutting a bar magnet, across or along its length, gives two magnets, each with a north and a south pole", "Isolated magnetic poles do not exist; cutting a magnet is like cutting a solenoid into two shorter solenoids"],
          },
          {
            cells: ["Field lines form closed loops and do not stop at the poles", "There is no monopole for a line to start or end on"],
          },
          {
            cells: ["Two field lines never cross", "At a crossing the field would have two directions at one point"],
          },
          {
            cells: ["The field is strongest near the ends and weakest at the middle of the magnet", "The lines crowd together near the poles"],
          },
          {
            cells: ["A current-carrying solenoid behaves like a bar magnet", "A bar magnet acts like many circulating currents, so the two give the same far field"],
          },
          {
            cells: ["A toroid has no north pole and no south pole", "Poles appear only when the source has a net magnetic moment; a toroid's field stays inside its windings"],
          },
        ],
      },
      practiceSet: [
        { prompt: "Inside a bar magnet, in which direction do its field lines run?", answer: "From the south pole to the north pole" },
        { prompt: "Name the current-carrying arrangement whose field lines outside look like those of a bar magnet.", answer: "A finite solenoid" },
        { prompt: "Why can two magnetic field lines never cross?", answer: "The field at the crossing point would have two directions, which is impossible" },
      ],
      pyqExampleId: "c96dfdad-47f9-4274-8fff-0a6ef85682f8",
      traps: [
        {
          title: "Saying field lines start at N and end at S",
          body: "Outside the magnet the lines go from N to S, but they carry on inside it from S to N. Magnetic field lines have no start and no end.",
        },
        {
          title: "Thinking a broken magnet gives separate poles",
          body: "Each piece is a complete magnet with both poles, whichever way you cut it. Write that monopoles do not exist as the reason.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmm-dipole-field",
      name: "Field of a short bar magnet on its axis and equatorial line",
      intuition:
        "Far from a bar magnet its field looks exactly like the electric field far from an electric dipole. Swap E for B, p for m and 1/ε₀ for μ₀, and the formulas you learnt in electrostatics give the magnetic ones. The field falls as the cube of the distance, so it dies away fast.",
      definition:
        "- For a short magnet (distance \\(r\\) much larger than its length \\(l\\)), the field at distance \\(r\\) from its centre:\n" +
        "- **On the axis (end-on):** \\(B_A = \\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{r^3}\\), along the magnetic moment (from S to N of the magnet).\n" +
        "- **On the equatorial line (normal bisector):** \\(B_E = -\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{r^3}\\). The minus sign means it points opposite to \\(\\vec{m}\\).\n" +
        "- At the same distance the axial field is **twice** the equatorial field.\n" +
        "- **Electrostatic analog:** replace \\(\\vec{E} \\to \\vec{B}\\), \\(\\vec{p} \\to \\vec{m}\\) and \\(\\dfrac{1}{4\\pi\\varepsilon_0} \\to \\dfrac{\\mu_0}{4\\pi}\\).\n" +
        "- A closely wound solenoid of \\(N\\) turns, area \\(A\\) and current \\(I\\) has magnetic moment \\(m = NIA\\), along its axis.\n" +
        "- Units: \\(m\\) in \\(\\text{J T}^{-1}\\) (the same as \\(\\text{A m}^2\\)); \\(\\dfrac{\\mu_0}{4\\pi} = 10^{-7}\\ \\text{T m A}^{-1}\\).",
      formula: {
        label: "Field of a short bar magnet",
        latex: "B_A = \\frac{\\mu_0}{4\\pi}\\frac{2m}{r^3}, \\qquad B_E = -\\frac{\\mu_0}{4\\pi}\\frac{m}{r^3}, \\qquad m = NIA",
      },
      authoredExample: {
        prompt:
          "A short bar magnet has a magnetic moment of \\(1.2\\ \\text{J T}^{-1}\\). Find the magnitude and direction of its field at a distance of 20 cm from its centre (a) on its axis, (b) on its equatorial line.",
        steps: [
          "Given: \\(m = 1.2\\ \\text{J T}^{-1}\\), \\(r = 20\\ \\text{cm} = 0.20\\ \\text{m}\\), so \\(r^3 = 8 \\times 10^{-3}\\ \\text{m}^3\\); \\(\\dfrac{\\mu_0}{4\\pi} = 10^{-7}\\ \\text{T m A}^{-1}\\).",
          "(a) Formula: \\(B_A = \\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{r^3}\\).",
          "\\(B_A = 10^{-7} \\times \\dfrac{2 \\times 1.2}{8 \\times 10^{-3}} = 3 \\times 10^{-5}\\ \\text{T}\\), along the axis in the direction of the magnetic moment (S to N).",
          "(b) Formula: \\(B_E = \\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{r^3}\\) in size.",
          "\\(B_E = 10^{-7} \\times \\dfrac{1.2}{8 \\times 10^{-3}} = 1.5 \\times 10^{-5}\\ \\text{T}\\), parallel to the magnet's axis but opposite to the magnetic moment (N to S).",
        ],
        answer: "(a) \\(3 \\times 10^{-5}\\) T along the moment; (b) \\(1.5 \\times 10^{-5}\\) T opposite to the moment",
      },
      selfCheckExample: {
        prompt:
          "A closely wound solenoid of 500 turns has an area of cross-section of \\(2 \\times 10^{-4}\\ \\text{m}^2\\) and carries a current of 2 A. Find its magnetic moment.",
        steps: ["\\(m = NIA = 500 \\times 2 \\times 2 \\times 10^{-4}\\).", "\\(m = 0.2\\ \\text{J T}^{-1}\\), along the axis of the solenoid."],
        answer: "\\(0.2\\ \\text{J T}^{-1}\\) (0.2 A m²)",
      },
      practiceSet: [
        { prompt: "The axial field of a short magnet at a distance r is B. What is its equatorial field at the same distance?", answer: "\\(B/2\\), pointing opposite to the magnetic moment" },
        { prompt: "The distance from a short magnet along its axis is doubled. By what factor does its field change?", answer: "It becomes one-eighth" },
        { prompt: "Give two equivalent SI units of magnetic moment.", answer: "\\(\\text{J T}^{-1}\\) and \\(\\text{A m}^2\\)" },
        { prompt: "In the electrostatic analog, what replaces \\(\\dfrac{1}{4\\pi\\varepsilon_0}\\) in the magnetic formulas?", answer: "\\(\\dfrac{\\mu_0}{4\\pi}\\)" },
      ],
      pyqExampleId: "40d7928f-44dc-418a-8613-bc47b2c78f4a",
      traps: [
        {
          title: "Using r squared",
          body: "A dipole's field falls as \\(1/r^3\\). An expression with \\(r^2\\) is the field of a single pole, and single poles do not exist.",
        },
        {
          title: "Leaving the distance in centimetres",
          body: "Convert \\(r\\) to metres before cubing it. A distance of 10 cm is 0.1 m, so \\(r^3 = 10^{-3}\\ \\text{m}^3\\), not 1000.",
        },
        {
          title: "Giving the size but not the direction",
          body: "The board asks for direction too. On the axis the field is along \\(\\vec{m}\\); on the equatorial line it is opposite to \\(\\vec{m}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmm-torque",
      name: "Torque on a magnet in a uniform field",
      intuition:
        "A uniform field pulls the north pole of a magnet one way and the south pole the other way with equal forces. Equal and opposite forces cancel, so the magnet is not pulled anywhere, but they turn it until it lines up with the field, just as a compass needle swings round.",
      definition:
        "- Torque on a magnet of moment \\(\\vec{m}\\) in a uniform field \\(\\vec{B}\\): \\(\\vec{\\tau} = \\vec{m} \\times \\vec{B}\\); in size \\(\\tau = mB\\sin\\theta\\), where \\(\\theta\\) is the angle between \\(\\vec{m}\\) and \\(\\vec{B}\\).\n" +
        "- The torque is largest, \\(mB\\), at \\(\\theta = 90^\\circ\\) and zero at \\(\\theta = 0^\\circ\\) and \\(180^\\circ\\). It is a restoring torque that turns \\(\\vec{m}\\) towards \\(\\vec{B}\\).\n" +
        "- In a **uniform** field the **net force is zero**. A magnet or a current-carrying solenoid only turns.\n" +
        "- In a **non-uniform** field there is a net force as well. An iron nail near a bar magnet gets an induced moment, so it feels both a torque and a force of attraction: its induced unlike pole is nearer the magnet's pole than its like pole.\n" +
        "- The unit of torque is the newton-metre (N m).",
      formula: {
        label: "Torque on a magnetic dipole",
        latex: "\\vec{\\tau} = \\vec{m} \\times \\vec{B}, \\qquad \\tau = mB\\sin\\theta",
      },
      authoredExample: {
        prompt:
          "A bar magnet of magnetic moment \\(0.5\\ \\text{J T}^{-1}\\) is held with its moment at \\(120^\\circ\\) to a uniform magnetic field of 0.4 T. Find the torque on it and the net force on it.",
        steps: [
          "Given: \\(m = 0.5\\ \\text{J T}^{-1}\\), \\(B = 0.4\\ \\text{T}\\), \\(\\theta = 120^\\circ\\).",
          "Formula: \\(\\tau = mB\\sin\\theta\\).",
          "\\(\\tau = 0.5 \\times 0.4 \\times \\sin 120^\\circ = 0.2 \\times 0.866 = 0.173\\ \\text{N m}\\).",
          "The field is uniform, so the forces on the two poles are equal and opposite: net force = 0.",
        ],
        answer: "Torque 0.173 N m, tending to turn the moment towards the field; net force zero",
      },
      selfCheckExample: {
        prompt:
          "A magnet whose moment makes \\(150^\\circ\\) with a uniform field of 0.3 T feels a torque of 0.06 N m. Find its magnetic moment.",
        steps: ["\\(m = \\dfrac{\\tau}{B\\sin\\theta}\\), with \\(\\sin 150^\\circ = 0.5\\).", "\\(m = \\dfrac{0.06}{0.3 \\times 0.5} = 0.4\\ \\text{J T}^{-1}\\)."],
        answer: "\\(0.4\\ \\text{J T}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "At what angle between the magnetic moment and a uniform field is the torque on a magnet largest?", answer: "\\(90^\\circ\\)" },
        { prompt: "What is the net force on a bar magnet placed in a uniform magnetic field?", answer: "Zero" },
        { prompt: "What is the torque on a magnet whose magnetic moment is parallel to the field?", answer: "Zero" },
        { prompt: "Why does an iron nail near a bar magnet feel a force as well as a torque?", answer: "The magnet's field is non-uniform and induces a magnetic moment in the nail" },
      ],
      pyqExampleId: "611a8629-1f21-433c-8829-05690ef1e7e4",
      traps: [
        {
          title: "Angle reached or angle turned through",
          body: "If a question asks the angle THROUGH which a magnet is rotated, subtract the final angle from the starting angle. Stopping at the angle from \\(\\sin\\theta\\) answers a different question.",
        },
        {
          title: "Writing a force in a uniform field",
          body: "A uniform field gives a torque only. A net force needs a non-uniform field, like the field near the pole of a bar magnet.",
        },
        {
          title: "Giving torque in joules",
          body: "\\(mB\\) has the unit of energy, but a torque is written in N m. Use J only for work and potential energy.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmm-energy",
      name: "Potential energy of a magnet and the work to turn it",
      intuition:
        "A magnet lined up with a field is like a ball at the bottom of a valley: that is its lowest energy, and a push brings it back. Pointing against the field, it is balanced on a hilltop: the torque is zero there too, but the smallest push sends it swinging round. Turning a magnet against the field takes work, and that work is stored as potential energy.",
      definition:
        "- Potential energy of a magnet in a uniform field: \\(U = -\\vec{m} \\cdot \\vec{B} = -mB\\cos\\theta\\). The zero of \\(U\\) is taken at \\(\\theta = 90^\\circ\\).\n" +
        "- Outline of the result: \\(U = \\int \\tau\\, d\\theta = \\int mB\\sin\\theta\\, d\\theta = -mB\\cos\\theta\\), taking the constant of integration as zero.\n" +
        "- \\(\\theta = 0^\\circ\\): \\(U = -mB\\), the minimum: **stable equilibrium**.\n" +
        "- \\(\\theta = 180^\\circ\\): \\(U = +mB\\), the maximum: **unstable equilibrium**.\n" +
        "- Work done by an external torque to turn the magnet from \\(\\theta_1\\) to \\(\\theta_2\\): \\(W = U_2 - U_1 = mB(\\cos\\theta_1 - \\cos\\theta_2)\\).\n" +
        "- **Two magnetised needles:** find the field of one at the other (axis: along its moment; equatorial line: opposite to its moment). The second needle is in stable equilibrium when its moment is parallel to that field, unstable when antiparallel, and not in equilibrium at all when at an angle to it.",
      formula: {
        label: "Potential energy and work",
        latex: "U = -mB\\cos\\theta, \\qquad W = mB(\\cos\\theta_1 - \\cos\\theta_2)",
      },
      authoredExample: {
        prompt:
          "A bar magnet of magnetic moment \\(0.6\\ \\text{J T}^{-1}\\) lies along a uniform field of 0.5 T. (a) Find its potential energy in this position. (b) Find the work needed to turn it until its moment makes \\(60^\\circ\\) with the field.",
        steps: [
          "Given: \\(m = 0.6\\ \\text{J T}^{-1}\\), \\(B = 0.5\\ \\text{T}\\), so \\(mB = 0.3\\ \\text{J}\\).",
          "(a) \\(\\theta = 0^\\circ\\): \\(U = -mB\\cos 0^\\circ = -0.3\\ \\text{J}\\). This is the stable position.",
          "(b) Formula: \\(W = mB(\\cos\\theta_1 - \\cos\\theta_2)\\), with \\(\\theta_1 = 0^\\circ\\), \\(\\theta_2 = 60^\\circ\\).",
          "\\(W = 0.3\\,(1 - 0.5) = 0.15\\ \\text{J}\\).",
        ],
        answer: "(a) \\(-0.3\\) J; (b) 0.15 J",
      },
      selfCheckExample: {
        prompt:
          "A magnet of magnetic moment \\(4\\ \\text{J T}^{-1}\\) is held with its moment opposite to a uniform field of 0.05 T. Find its potential energy and say whether this position is stable or unstable.",
        steps: ["\\(\\theta = 180^\\circ\\): \\(U = -mB\\cos 180^\\circ = +mB = 4 \\times 0.05 = 0.2\\ \\text{J}\\).", "This is the maximum of \\(U\\), so the equilibrium is unstable."],
        answer: "+0.2 J; unstable equilibrium",
      },
      practiceSet: [
        { prompt: "What is the potential energy of a magnet whose moment is at right angles to a uniform field?", answer: "Zero, by the choice of the zero of energy" },
        { prompt: "At which orientation is a magnet in a uniform field in stable equilibrium?", answer: "With its magnetic moment along the field, \\(\\theta = 0^\\circ\\)" },
        { prompt: "Write the work needed to turn a magnet from \\(90^\\circ\\) to \\(180^\\circ\\) in terms of m and B.", answer: "\\(mB\\)" },
        { prompt: "A magnetised needle Q lies on the axis of needle P with its moment along P's moment. Is Q in equilibrium, and of which kind?", answer: "Yes, stable: Q's moment is parallel to P's field there" },
      ],
      pyqExampleId: "d78802f1-bf93-43e0-8706-43351ef0927e",
      traps: [
        {
          title: "Zero torque does not mean stable",
          body: "The torque is zero both along the field and against it. Only \\(\\theta = 0^\\circ\\) is stable; \\(\\theta = 180^\\circ\\) is unstable. Say which, with the reason (minimum or maximum of \\(U\\)).",
        },
        {
          title: "Forgetting that the start is below zero",
          body: "A magnet along the field starts at \\(U = -mB\\), not zero. Turning it to face the other way costs \\(2mB\\), and to face across the field costs \\(mB\\).",
        },
        {
          title: "Dropping the minus sign of U",
          body: "\\(U = -mB\\cos\\theta\\). Writing \\(+mB\\) for the aligned position swaps the stable and the unstable answers.",
        },
      ],
    },
  ],
};
