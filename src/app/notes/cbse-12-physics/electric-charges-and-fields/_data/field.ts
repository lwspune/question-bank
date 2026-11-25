import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EF_FIELD_NOTE: SubtopicNote = {
  subtopicName: "Electric Field and Field Lines",
  title: "Electric Field and Field Lines",
  oneLineDefinition:
    "The electric field of a point charge and of a group of charges, the properties of electric field lines, and how a charged particle moves in a uniform field.",
  whyItMatters:
    "28 questions, twenty-three of them from board papers. The board asks you to find the field of a point charge at a new distance (2023), add the fields of charges at the corners of a triangle or on two axes (2024 to 2026), say which statement about field lines is correct (2025), and work out the time, the deflection and the path of an electron between charged plates, which came as a case study in 2023 and in 2026. The textbook adds the field at points near two charges and the tracks of charged particles between plates.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpef-field-point",
      name: "Electric field of a point charge",
      intuition:
        "A charge changes the space around it. Put a small test charge anywhere nearby and it feels a force; the force on each coulomb of test charge is the electric field there. The field points away from a positive charge and towards a negative one, and it falls off as the square of the distance.",
      definition:
        "- **Electric field** at a point: the force on a small positive test charge \\(q_0\\) placed there, divided by \\(q_0\\): \\(\\vec{E} = \\dfrac{\\vec{F}}{q_0}\\). It is a vector. SI unit: N/C.\n" +
        "- Field of a point charge \\(Q\\) at distance \\(r\\): \\(E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{|Q|}{r^2}\\), pointing radially outward for \\(Q > 0\\) and inward for \\(Q < 0\\).\n" +
        "- The field depends only on the source charge and the point, not on the test charge used to measure it.\n" +
        "- A charge \\(q\\) placed in a field feels \\(\\vec{F} = q\\vec{E}\\). A positive charge is pushed along \\(\\vec{E}\\); an electron is pushed opposite to it.",
      formula: {
        label: "Field of a point charge",
        latex: "\\vec{E} = \\frac{\\vec{F}}{q_0}, \\qquad E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{|Q|}{r^{2}}",
      },
      authoredExample: {
        prompt:
          "Find the electric field 20 cm from a point charge of \\(-8\\) nC, and the force it exerts on a proton placed there.",
        steps: [
          "Given: \\(Q = -8 \\times 10^{-9}\\) C, \\(r = 0.20\\) m, proton charge \\(1.6 \\times 10^{-19}\\) C.",
          "Formula: \\(E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{|Q|}{r^2}\\).",
          "\\(E = \\dfrac{9 \\times 10^9 \\times 8 \\times 10^{-9}}{(0.20)^2} = \\dfrac{72}{0.04} = 1800\\) N/C, pointing towards the charge, since it is negative.",
          "Force on the proton: \\(F = qE = 1.6 \\times 10^{-19} \\times 1800 = 2.88 \\times 10^{-16}\\) N, towards the charge.",
        ],
        answer: "1800 N/C towards the charge; \\(2.88 \\times 10^{-16}\\) N on the proton, towards the charge",
      },
      selfCheckExample: {
        prompt: "An electron feels a force of \\((3.2 \\times 10^{-15}\\ \\text{N})\\,\\hat{i}\\). Find the electric field at its position.",
        steps: [
          "\\(\\vec{E} = \\dfrac{\\vec{F}}{q}\\) with \\(q = -1.6 \\times 10^{-19}\\) C.",
          "\\(\\vec{E} = \\dfrac{3.2 \\times 10^{-15}\\,\\hat{i}}{-1.6 \\times 10^{-19}} = -2 \\times 10^{4}\\,\\hat{i}\\) N/C.",
        ],
        answer: "\\(-2 \\times 10^{4}\\,\\hat{i}\\) N/C, along \\(-x\\)",
      },
      practiceSet: [
        { prompt: "Is the electric field a scalar or a vector?", answer: "A vector; it points along the force on a positive test charge" },
        { prompt: "What is the SI unit of electric field?", answer: "N/C (newton per coulomb)" },
        { prompt: "Does the field at a point depend on the test charge placed there to measure it?", answer: "No. It depends only on the source charge and the position of the point" },
      ],
      pyqExampleId: "6adafef2-a891-4e6e-adc4-1376af953920",
      traps: [
        {
          title: "Field direction for a negative charge",
          body: "The field of a negative charge points towards it, because a positive test charge would be pulled in. Draw the arrow inwards.",
        },
        {
          title: "Leaving out the electron's minus sign",
          body: "\\(\\vec{F} = q\\vec{E}\\) with \\(q = -e\\). An electron is pushed opposite to the field; dropping the sign reverses the answer.",
        },
        {
          title: "Square root slip",
          body: "The field goes as \\(1/r^2\\). To make it smaller by some factor, increase the distance by the square root of that factor, not by the factor itself.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-field-system",
      name: "Field of a group of charges",
      intuition:
        "Each charge sets up its own field as if it were alone, and the total field is the vector sum of all of them. Look for symmetry before doing any arithmetic: at the centre of a uniformly charged ring, or at the centre of equal charges spread evenly round a point, the fields cancel.",
      definition:
        "- **Superposition:** \\(\\vec{E} = \\vec{E}_1 + \\vec{E}_2 + \\dots + \\vec{E}_n = \\dfrac{1}{4\\pi\\varepsilon_0}\\displaystyle\\sum \\dfrac{q_i}{r_{iP}^2}\\hat{r}_{iP}\\), where \\(\\hat{r}_{iP}\\) points from the charge \\(q_i\\) to the point P.\n" +
        "- Equal charges at the corners of an equilateral triangle give zero field at its centroid. A uniformly charged ring gives zero field at its centre.\n" +
        "- Two equal fields at an angle add along the line that bisects the angle between them.\n" +
        "- At a point between equal and OPPOSITE charges, both fields point towards the negative charge, so they add.\n" +
        "- For charge spread out, use the charge per unit length λ, per unit area σ or per unit volume ρ, and add the fields of small pieces.",
      formula: {
        label: "Field of a system of charges",
        latex: "\\vec{E} = \\frac{1}{4\\pi\\varepsilon_0}\\sum_{i} \\frac{q_i}{r_{iP}^{2}}\\,\\hat{r}_{iP}",
      },
      authoredExample: {
        prompt:
          "Two charges of \\(+3\\) nC each are at A and B, 0.8 m apart. Find the electric field at a point P on the perpendicular bisector of AB, 0.3 m from its midpoint M.",
        steps: [
          "Given: \\(q = 3 \\times 10^{-9}\\) C at A and at B; AM = MB = 0.4 m; MP = 0.3 m.",
          "Distance of P from each charge: \\(\\sqrt{0.4^2 + 0.3^2} = 0.5\\) m.",
          "Field of each: \\(E_1 = E_2 = \\dfrac{9 \\times 10^9 \\times 3 \\times 10^{-9}}{(0.5)^2} = 108\\) N/C, each pointing away from its charge.",
          "The parts along AB cancel. The parts along MP add: \\(E = 2 \\times 108 \\times \\dfrac{0.3}{0.5} = 129.6\\) N/C.",
        ],
        answer: "About 130 N/C, along MP, away from AB",
      },
      selfCheckExample: {
        prompt: "Charges of \\(+2\\ \\mu\\text{C}\\) and \\(-2\\ \\mu\\text{C}\\) are 0.6 m apart. Find the electric field at the midpoint of the line joining them.",
        steps: [
          "Each charge is 0.3 m from the midpoint: \\(E = \\dfrac{9 \\times 10^9 \\times 2 \\times 10^{-6}}{(0.3)^2} = 2 \\times 10^5\\) N/C.",
          "Both fields point towards the negative charge, so they add: \\(4 \\times 10^5\\) N/C.",
        ],
        answer: "\\(4 \\times 10^5\\) N/C, towards the negative charge",
      },
      practiceSet: [
        { prompt: "Three equal charges sit at the corners of an equilateral triangle. What is the field at its centroid?", answer: "Zero" },
        {
          prompt: "A ring has positive charge spread over one half and an equal negative charge over the other half. Is the field at its centre zero?",
          answer: "No. It points from the positive half towards the negative half",
        },
        { prompt: "Two fields of 50 N/C each act at a point at 60° to each other. Find the size of the net field.", answer: "\\(2 \\times 50 \\cos 30^\\circ = 86.6\\) N/C" },
      ],
      pyqExampleId: "73732aaf-7ac4-42f9-963e-e959f0b7db63",
      traps: [
        {
          title: "Cancelling fields that add",
          body: "Between equal and OPPOSITE charges the two fields point the same way and add. Draw both arrows before deciding they cancel.",
        },
        {
          title: "Zero field means zero potential",
          body: "Field is a vector and can cancel; potential is a scalar and only adds. At the centre of a uniformly charged ring the field is zero but the potential is not.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpef-field-lines",
      name: "Electric field lines and their properties",
      intuition:
        "A field line is a curve drawn so that its direction at every point is the direction of the field there. Where the lines crowd together the field is strong; where they spread out it is weak. They give a picture of the field with no calculation at all.",
      definition:
        "- A **field line** is a curve whose tangent at each point is along the electric field at that point; an arrow shows the direction.\n" +
        "- The number of lines crossing a unit area held at right angles to them shows the strength of the field.\n" +
        "- The board asks for these properties and the reason behind each, often in an assertion-reason item.",
      table: {
        columns: ["Property", "Reason"],
        rows: [
          {
            cells: ["Start on positive charges and end on negative charges; with a single charge they start or end at infinity", "The field points away from positive charge and towards negative charge"],
          },
          {
            cells: ["Continuous curves with no breaks in a region with no charge", "The field has one definite value and direction at every point there"],
          },
          {
            cells: ["Two field lines never cross", "At a crossing the field would have two directions at one point, which is impossible"],
            pyqExampleId: "b33ef8aa-be52-49cb-bb3a-5a192a49a94c",
          },
          {
            cells: ["Do not form closed loops", "The electrostatic field is conservative"],
            noteAmber: "Board 2025 asked which statement is correct: the field of static charges is conservative and its lines do not form closed loops.",
          },
          {
            cells: ["Close together where the field is strong, far apart where it is weak", "The number of lines per unit area shows the field strength"],
          },
          {
            cells: ["Parallel and equally spaced in a uniform field", "The field has the same size and direction everywhere"],
          },
        ],
      },
      practiceSet: [
        { prompt: "Why can two electric field lines never cross?", answer: "The field at the crossing point would have two directions, which is impossible" },
        { prompt: "Can an electrostatic field line form a closed loop?", answer: "No, because the electrostatic field is conservative" },
        { prompt: "What do parallel, equally spaced field lines show?", answer: "A uniform field" },
      ],
      pyqExampleId: "4245888e-5e64-44f2-9765-b94c8b90ad0f",
      traps: [
        {
          title: "A property with no reason",
          body: "In 'why do field lines never cross', the mark is for the reason: the field would have two directions at one point. The property alone earns half.",
        },
        {
          title: "Mixing up electric and magnetic lines",
          body: "Magnetic field lines form closed loops. Electrostatic field lines do not: they start on positive charges and end on negative ones.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpef-field-motion",
      name: "A charged particle in a uniform field",
      intuition:
        "In a uniform field a charge feels the same force everywhere, so it has a constant acceleration qE/m. Started from rest, it moves in a straight line along the force. Sent in at right angles to the field, it moves like a ball thrown sideways: steady speed across, steady acceleration along the force, so its path is a parabola.",
      definition:
        "- Acceleration: \\(\\vec{a} = \\dfrac{q\\vec{E}}{m}\\), constant in size and direction. Between parallel plates a distance d apart with a potential difference V, \\(E = V/d\\).\n" +
        "- From rest through a distance \\(s\\) along the force: \\(t = \\sqrt{\\dfrac{2sm}{qE}}\\), and the kinetic energy gained is \\(K = qEs\\).\n" +
        "- Entering with speed \\(v_x\\) at right angles to the field: \\(x = v_x t\\) and \\(y = \\dfrac{1}{2}at^2\\), so \\(y = \\dfrac{qE}{2mv_x^2}x^2\\), a **parabola**. Time between plates of length L: \\(t = L/v_x\\).\n" +
        "- An electron is pushed opposite to the field, towards the positive plate. For an electron or a proton, gravity is tiny beside the electric force.\n" +
        "- For the same entry speed, a larger charge-to-mass ratio q/m gives a larger deflection.",
      formula: {
        label: "Charge in a uniform field",
        latex: "a = \\frac{qE}{m}, \\qquad x = v_x t, \\qquad y = \\frac{1}{2}\\,\\frac{qE}{m}\\,t^{2}",
      },
      authoredExample: {
        prompt:
          "An electron enters the space between two parallel plates with a speed of \\(4 \\times 10^7\\) m/s, moving parallel to them. The plates are 5 cm long and the field between them is \\(1.6 \\times 10^4\\) N/C. Find the time it spends between the plates and its sideways deflection when it leaves. The plates are far enough apart that it does not hit one.",
        steps: [
          "Given: \\(v_x = 4 \\times 10^7\\) m/s, \\(L = 0.05\\) m, \\(E = 1.6 \\times 10^4\\) N/C, \\(e = 1.6 \\times 10^{-19}\\) C, \\(m = 9.1 \\times 10^{-31}\\) kg.",
          "No force acts along the plates, so \\(t = \\dfrac{L}{v_x} = \\dfrac{0.05}{4 \\times 10^7} = 1.25 \\times 10^{-9}\\) s.",
          "Acceleration across the plates: \\(a = \\dfrac{eE}{m} = \\dfrac{1.6 \\times 10^{-19} \\times 1.6 \\times 10^4}{9.1 \\times 10^{-31}} = 2.81 \\times 10^{15}\\) m/s², towards the positive plate.",
          "Deflection: \\(y = \\dfrac{1}{2}at^2 = \\dfrac{1}{2} \\times 2.81 \\times 10^{15} \\times (1.25 \\times 10^{-9})^2 = 2.2 \\times 10^{-3}\\) m.",
        ],
        answer: "\\(1.25 \\times 10^{-9}\\) s; a deflection of 2.2 mm towards the positive plate",
      },
      selfCheckExample: {
        prompt: "A proton starts from rest in a uniform field of \\(5 \\times 10^3\\) N/C. Find its kinetic energy after it has moved 4 cm along the field.",
        steps: ["\\(K = qEs\\), the work done by the field.", "\\(K = 1.6 \\times 10^{-19} \\times 5 \\times 10^3 \\times 0.04 = 3.2 \\times 10^{-17}\\) J."],
        answer: "\\(3.2 \\times 10^{-17}\\) J",
      },
      practiceSet: [
        { prompt: "An electron enters a uniform field at right angles to it. What is the shape of its path in the field?", answer: "A parabola" },
        {
          prompt: "Two particles with equal charge but masses m and 4m start from rest in the same uniform field. Compare the times they take to cover the same distance.",
          answer: "The lighter one takes half the time, since \\(t \\propto \\sqrt{m}\\)",
        },
        { prompt: "Between two charged plates, which way is an electron deflected?", answer: "Towards the positive plate, opposite to the field" },
      ],
      pyqExampleId: "81ce64c2-bd27-4ccb-83ac-a9e146dfd7d4",
      traps: [
        {
          title: "Using the whole gap",
          body: "An electron that enters midway between the plates and just reaches the edge of one falls through HALF the separation. Using the whole gap doubles the answer.",
        },
        {
          title: "Thinking the speed along the plates changes",
          body: "The field acts across the plates only. The speed along the plates stays the same, so the time inside is the plate length divided by the entry speed.",
        },
        {
          title: "No sketch of the path",
          body: "When asked for the path, sketch the plates, the field direction and the path curving towards the positive plate. The labelled sketch carries marks.",
        },
      ],
    },
  ],
};
