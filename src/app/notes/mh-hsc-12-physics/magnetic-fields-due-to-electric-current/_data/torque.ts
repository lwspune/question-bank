import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MG_TORQUE_NOTE: SubtopicNote = {
  subtopicName: "Torque on a Current Loop and the Moving Coil Galvanometer",
  title: "Torque on a Current Loop and the Moving Coil Galvanometer",
  oneLineDefinition:
    "The torque τ = NIAB sin θ on a current-carrying coil in a magnetic field, and the moving coil galvanometer that measures a current by balancing this torque against a spring.",
  whyItMatters:
    "6 questions. Four were set in board papers: the sensitivity of a galvanometer from its coil, field and twist constant (2017), the deflection of a galvanometer with its advantages and disadvantages (2020), a labelled diagram of a suspended coil galvanometer (2022), and the torque on a coil in vector form (2024). The textbook adds the current for a given deflection and why a radial field is used.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmg-loop-torque",
      name: "Torque on a current-carrying coil",
      intuition:
        "Put a rectangular loop in a field. The two sides along the field direction feel equal and opposite forces along one line, and they cancel. The other two sides feel equal and opposite forces along different lines, which form a couple and turn the loop. The loop turns until its plane is perpendicular to the field, where the couple vanishes.",
      definition:
        "- For a rectangular loop of sides \\(l_1\\) and \\(l_2\\), the forces on the two sides perpendicular to \\(\\vec{B}\\) form a couple: \\(\\tau = IBl_1l_2\\sin\\theta = IAB\\sin\\theta\\), with \\(A = l_1l_2\\).\n" +
        "- For a flat coil of \\(N\\) turns: \\(\\tau = NIAB\\sin\\theta\\), where \\(\\theta\\) is the angle between the **normal** to the coil and \\(\\vec{B}\\). This holds for a flat coil of any shape.\n" +
        "- In vector form, with magnetic moment \\(\\vec{\\mu} = NI\\vec{A}\\): \\(\\vec{\\tau} = \\vec{\\mu} \\times \\vec{B}\\). Compare \\(\\vec{\\tau} = \\vec{p} \\times \\vec{E}\\) for an electric dipole.\n" +
        "- The torque is greatest (\\(NIAB\\)) when the plane of the coil is parallel to \\(\\vec{B}\\), and zero when the plane is perpendicular to \\(\\vec{B}\\).",
      formula: {
        label: "Torque on a coil",
        latex: "\\tau = NIAB\\sin\\theta, \\qquad \\vec{\\tau} = \\vec{\\mu} \\times \\vec{B}",
        symbols: [
          { symbol: "\\(N\\)", meaning: "number of turns" },
          { symbol: "\\(A\\)", meaning: "area enclosed by each turn" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the normal to the coil and the field" },
          { symbol: "\\(\\vec{\\mu}\\)", meaning: "magnetic dipole moment of the coil, NIA" },
        ],
      },
      authoredExample: {
        prompt:
          "A rectangular coil of 50 turns, 4 cm × 5 cm, carries a current of 2 A in a uniform magnetic field of 0.3 T. The normal to the coil makes an angle of 30° with the field. Find the torque on the coil.",
        steps: [
          "Given: \\(N = 50\\), \\(A = 0.04 \\times 0.05 = 2 \\times 10^{-3}\\) m², \\(I = 2\\) A, \\(B = 0.3\\) T, \\(\\theta = 30^\\circ\\).",
          "Formula: \\(\\tau = NIAB\\sin\\theta\\).",
          "Substitution: \\(\\tau = 50 \\times 2 \\times 2 \\times 10^{-3} \\times 0.3 \\times 0.5\\).",
          "\\(\\tau = 0.03\\) N m.",
        ],
        answer: "0.03 N m",
      },
      selfCheckExample: {
        prompt:
          "A coil of 100 turns, each of area 10 cm², carries a current of 0.5 A in a uniform field of 0.4 T. Find the largest torque it can experience.",
        steps: ["Largest torque when \\(\\sin\\theta = 1\\).", "\\(\\tau = NIAB = 100 \\times 0.5 \\times 10^{-3} \\times 0.4 = 0.02\\) N m."],
        answer: "0.02 N m",
      },
      practiceSet: [
        { prompt: "In which position is the torque on a current-carrying coil in a uniform field zero?", answer: "When the plane of the coil is perpendicular to the field (the normal is along the field)" },
        { prompt: "Does \\(\\tau = NIAB\\sin\\theta\\) hold for a circular coil?", answer: "Yes. It holds for a flat coil of any shape" },
      ],
      pyqExampleId: "2c48d0df-d067-434f-9f9d-c7177a91a12b",
      traps: [
        {
          title: "Measuring the angle from the plane of the coil",
          body: "\\(\\theta\\) is the angle between the normal to the coil and the field. If a question gives the angle between the plane and the field, use its complement, or write \\(\\cos\\) of that angle.",
        },
        {
          title: "Writing the cross product the wrong way round",
          body: "The vector form is \\(\\vec{\\tau} = \\vec{\\mu} \\times \\vec{B}\\), not \\(\\vec{B} \\times \\vec{\\mu}\\). Swapping the order reverses the direction of the torque.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmg-mcg",
      name: "Deflection of a moving coil galvanometer",
      intuition:
        "A current in the galvanometer coil makes a torque that turns the coil. A spring twists as the coil turns and pushes back harder the more it is twisted. The coil stops where the two torques balance. In a radial field the turning torque is the same at every angle, so the stopping angle is simply proportional to the current.",
      definition:
        "- In a radial field the plane of the coil is always parallel to \\(\\vec{B}\\), so \\(\\sin\\theta = 1\\) and the deflecting torque is \\(NIAB\\) at every deflection.\n" +
        "- The spring gives a restoring torque \\(K\\phi\\), where \\(\\phi\\) is the deflection and \\(K\\) the torsional constant.\n" +
        "- At balance: \\(K\\phi = NIAB\\), so \\(\\phi = \\left(\\dfrac{NAB}{K}\\right)I\\). The deflection is **proportional to the current**, so the scale is uniform.\n" +
        "- The deflection per unit current, \\(\\dfrac{\\phi}{I} = \\dfrac{NAB}{K}\\), is its current sensitivity. More turns, a larger area, a stronger field or a smaller \\(K\\) make it more sensitive.\n" +
        "- If \\(K\\) is given per degree, \\(\\phi\\) comes out in degrees.",
      formula: {
        label: "Moving coil galvanometer",
        latex: "K\\phi = NIAB, \\qquad \\phi = \\left(\\frac{NAB}{K}\\right) I",
        symbols: [
          { symbol: "\\(\\phi\\)", meaning: "deflection of the coil" },
          { symbol: "\\(K\\)", meaning: "torsional constant of the spring or suspension" },
        ],
      },
      authoredExample: {
        prompt:
          "A galvanometer coil of 200 turns, each of area 2 cm², hangs in a radial field of 0.1 T. The torsional constant is \\(2 \\times 10^{-8}\\) N m per degree. Find the deflection for a current of 50 μA.",
        steps: [
          "Given: \\(N = 200\\), \\(A = 2 \\times 10^{-4}\\) m², \\(B = 0.1\\) T, \\(K = 2 \\times 10^{-8}\\) N m/degree, \\(I = 50 \\times 10^{-6}\\) A.",
          "Formula: \\(\\phi = \\dfrac{NIAB}{K}\\).",
          "Substitution: \\(\\phi = \\dfrac{200 \\times 50 \\times 10^{-6} \\times 2 \\times 10^{-4} \\times 0.1}{2 \\times 10^{-8}} = \\dfrac{2 \\times 10^{-7}}{2 \\times 10^{-8}}\\).",
          "\\(\\phi = 10^\\circ\\).",
        ],
        answer: "10°",
      },
      selfCheckExample: {
        prompt: "A moving coil galvanometer deflects by 20° for a current of 40 μA. What current gives a deflection of 35°?",
        steps: ["The deflection is proportional to the current: \\(\\dfrac{I_2}{I_1} = \\dfrac{\\phi_2}{\\phi_1}\\).", "\\(I_2 = 40 \\times \\dfrac{35}{20} = 70\\) μA."],
        answer: "70 μA",
      },
      practiceSet: [
        { prompt: "Name two ways of making a moving coil galvanometer more sensitive.", answer: "Any two: more turns, larger coil area, stronger field, a spring with a smaller torsional constant" },
        { prompt: "The torsional constant of a galvanometer is given in N m per degree. In what unit does the deflection come out?", answer: "In degrees, with no conversion to radian" },
      ],
      pyqExampleId: "f55ca2ee-0c3c-4139-8880-1df3a766dcce",
      traps: [
        {
          title: "Putting sin θ into a radial field",
          body: "In a radial field the plane of the coil is always parallel to \\(\\vec{B}\\), so the torque is \\(NIAB\\) with no \\(\\sin\\theta\\). The deflection \\(\\phi\\) is not that angle.",
        },
        {
          title: "Area in cm²",
          body: "Convert the coil area to m² before substituting (1 cm² \\(= 10^{-4}\\) m²), and work out length × breadth for a rectangular coil.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpmg-mcg-parts",
      name: "Parts of a moving coil galvanometer",
      intuition:
        "Each part of a galvanometer has one job: the coil carries the current, the magnet and soft iron core give a strong radial field, and the spring measures the torque by how far it twists. Learn the job with the name, because the board marks the labels on the diagram.",
      definition:
        "- The board asks for a neat labelled diagram. Label every part below and mark the radial field lines.\n" +
        "- A **radial field** has its lines along radii, like the spokes of a wheel. It keeps the plane of the coil along the field at every deflection, so the deflection is proportional to the current.",
      table: {
        columns: ["Part", "What it does"],
        rows: [
          {
            cells: ["Coil of several turns", "Carries the current; it is suspended or pivoted so it can turn freely about a fixed axis"],
            pyqExampleId: "3705af21-801b-48a9-ae72-8f7a3dbc491a",
            noteAmber: "Board 2022 asked for a neat labelled diagram of a suspended coil galvanometer.",
          },
          { cells: ["Magnet poles N and S", "Give the magnetic field in which the coil turns"] },
          { cells: ["Soft iron cylindrical core", "Fixed inside the coil; makes the field radial and strong"] },
          { cells: ["Spring or suspension", "Twists as the coil turns and gives the restoring torque \\(K\\phi\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "What two jobs does the soft iron cylinder inside a galvanometer coil do?",
        steps: ["It makes the field radial.", "It makes the field strong."],
        answer: "It makes the magnetic field radial and strong",
      },
      practiceSet: [
        { prompt: "In a radial field, what is the angle between the plane of the coil and the field at every deflection?", answer: "Zero: the plane of the coil is always parallel to the field" },
        { prompt: "Which part of a moving coil galvanometer gives the restoring torque?", answer: "The spring (or suspension fibre)" },
      ],
      traps: [
        {
          title: "Calling the field uniform",
          body: "The field in a moving coil galvanometer is radial. A merely uniform field would make the torque change with the deflection, and the scale would not be uniform.",
        },
        {
          title: "A diagram with no labels",
          body: "An unlabelled drawing earns little. Label the coil, the magnet poles, the soft iron core, the spring or suspension and the direction of the current.",
        },
      ],
    },
  ],
};
