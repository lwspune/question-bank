import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 3 Current Electricity. Statements checked against the
 * NCERT text (law wordings are the book's own); most-asked years from the
 * CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Current Electricity",
  chapterSlug: "current-electricity",
  source: "NCERT Physics Part I (CBSE Class 12), Chapter 3",
  keyPoints: [
    {
      term: "Electric current",
      text: "The net charge passing per unit time through an area: \\(I = \\frac{dq}{dt}\\). Current is a **scalar** although we draw it with an arrow: currents do not obey vector addition, and \\(I = \\vec{j}\\cdot\\Delta\\vec{S}\\) is a scalar product.",
    },
    {
      term: "Ohm's law",
      text: "The current I flowing through a substance is proportional to the voltage V across its ends: \\(V = RI\\). It is obeyed by many substances but is **not a fundamental law of nature**. Unit of resistance: 1 Ω = 1 V A\\(^{-1}\\).",
    },
    {
      term: "Resistivity",
      text: "\\(R = \\frac{\\rho l}{A}\\): \\(\\rho\\) is a property of the material and depends on temperature and pressure, not on its size. Conductivity \\(\\sigma = \\frac{1}{\\rho}\\), unit S m\\(^{-1}\\).",
    },
    {
      term: "Current density",
      text: "The charge flowing per second per unit area normal to the flow. A **vector**, along \\(\\vec{E}\\); SI unit A m\\(^{-2}\\). Vector form of Ohm's law: \\(\\vec{j} = \\sigma\\vec{E}\\) or \\(\\vec{E} = \\rho\\vec{j}\\).",
    },
    {
      term: "Drift velocity",
      text: "The average velocity the free electrons acquire in a field, superposed on their large random velocities; opposite to \\(\\vec{E}\\). Only a few mm/s, yet current starts at once because the field is set up through the circuit almost instantly (at the speed of light).",
    },
    {
      term: "Relaxation time",
      text: "\\(\\tau\\): the average time between successive collisions of an electron with the ions of the metal. Between collisions the electron accelerates; collisions randomise its velocity, so it gains a steady drift, not an acceleration.",
    },
    {
      term: "Mobility",
      text: "The magnitude of the drift velocity per unit electric field: \\(\\mu = \\frac{|v_d|}{E} = \\frac{e\\tau}{m}\\). Positive; SI unit m\\(^2\\) V\\(^{-1}\\) s\\(^{-1}\\). It does not change with the applied voltage.",
    },
    {
      term: "Limitations of Ohm's law",
      text: "It fails when (a) V depends on I non-linearly, (b) the relation depends on the sign of V (a diode), or (c) the relation is not unique: GaAs, where more than one V gives the same I.",
    },
    {
      term: "Resistivity and temperature",
      text: "Metals: \\(\\rho\\) **increases** with temperature, because \\(\\tau\\) decreases (more frequent collisions). Semiconductors and insulators: \\(\\rho\\) **decreases**, because n increases. Manganin and constantan change very little, so they are used for standard resistors.",
    },
    {
      term: "Emf and terminal voltage",
      text: "Emf \\(\\varepsilon\\) is the potential difference between the electrodes in **open circuit** (no current). With current I drawn, the terminal voltage \\(V = \\varepsilon - Ir\\) is less than \\(\\varepsilon\\). Emf is not a force.",
    },
    {
      term: "Cells in series and parallel",
      text: "Series: emfs add, internal resistances add. Parallel: \\(\\frac{\\varepsilon_{eq}}{r_{eq}} = \\frac{\\varepsilon_1}{r_1} + \\frac{\\varepsilon_2}{r_2}\\) and \\(\\frac{1}{r_{eq}} = \\frac{1}{r_1} + \\frac{1}{r_2}\\). For high currents from a low-voltage supply, the internal resistance must be very low.",
    },
    {
      term: "Kirchhoff's rules",
      text: "**Junction rule:** at any junction, the sum of currents entering equals the sum leaving (conservation of **charge**). **Loop rule:** the algebraic sum of changes in potential around any closed loop is zero (conservation of **energy**).",
    },
    {
      term: "Wheatstone bridge",
      text: "Four resistors \\(R_1, R_2, R_3, R_4\\), a source across AC and a galvanometer across BD. Balanced when \\(I_g = 0\\): \\(\\frac{R_2}{R_1} = \\frac{R_4}{R_3}\\). Knowing three, the fourth is found. Swapping the cell and galvanometer does not change the balance.",
    },
    {
      term: "Electrical power",
      text: "Energy dissipated per unit time in a resistor: \\(P = VI = I^2R = \\frac{V^2}{R}\\), appearing as heat (ohmic loss). Power is carried at high voltage so that the loss \\(\\frac{P^2 R_c}{V^2}\\) in the cables is small.",
    },
  ],
  formulas: [
    { label: "Current and charge", latex: "I = \\frac{dq}{dt} \\qquad q = ne" },
    { label: "Ohm's law and resistance", latex: "V = IR \\qquad R = \\frac{\\rho l}{A} \\qquad \\sigma = \\frac{1}{\\rho}" },
    { label: "Stretching a wire (volume fixed)", latex: "R' = n^2 R \\ \\text{ when } l \\to nl \\qquad \\frac{\\Delta R}{R} = 2\\,\\frac{\\Delta l}{l} \\ (\\text{small change})" },
    { label: "Drift velocity", latex: "\\vec{v}_d = -\\frac{e\\vec{E}}{m}\\,\\tau \\qquad E = \\frac{V}{l}" },
    { label: "Current and drift velocity", latex: "I = neAv_d \\qquad j = \\frac{I}{A} = nev_d" },
    { label: "Conductivity and resistivity", latex: "\\vec{j} = \\sigma\\vec{E}, \\qquad \\sigma = \\frac{ne^2\\tau}{m}, \\qquad \\rho = \\frac{m}{ne^2\\tau}, \\qquad R = \\frac{ml}{ne^2\\tau A}" },
    { label: "Mobility", latex: "\\mu = \\frac{|v_d|}{E} = \\frac{e\\tau}{m}" },
    {
      label: "Temperature dependence",
      latex: "\\rho_T = \\rho_0[1 + \\alpha(T - T_0)] \\qquad R_T = R_0[1 + \\alpha(T - T_0)]",
      symbols: [{ symbol: "α", meaning: "temperature coefficient: fractional increase in resistivity per unit rise in temperature" }],
    },
    { label: "Series and parallel resistors", latex: "R_s = R_1 + R_2 + \\dots \\qquad \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots" },
    { label: "Power", latex: "P = VI = I^2R = \\frac{V^2}{R} \\qquad H = I^2Rt" },
    { label: "Cell with internal resistance", latex: "I = \\frac{\\varepsilon}{R + r} \\qquad V = \\varepsilon - Ir = \\frac{\\varepsilon R}{R + r}" },
    { label: "Cells in series", latex: "\\varepsilon_{eq} = \\varepsilon_1 + \\varepsilon_2 \\qquad r_{eq} = r_1 + r_2" },
    {
      label: "Cells in parallel",
      latex: "\\varepsilon_{eq} = \\frac{\\varepsilon_1 r_2 + \\varepsilon_2 r_1}{r_1 + r_2} \\qquad r_{eq} = \\frac{r_1 r_2}{r_1 + r_2}",
    },
    { label: "Kirchhoff's rules", latex: "\\sum I_{\\text{in}} = \\sum I_{\\text{out}} \\qquad \\sum \\Delta V = 0 \\ (\\text{closed loop})" },
    { label: "Wheatstone bridge: balance", latex: "\\frac{R_2}{R_1} = \\frac{R_4}{R_3}" },
  ],
  derivations: [
    {
      title: "Obtain the relation between current and drift velocity of electrons",
      steps: [
        "Conductor of cross section A with n free electrons per unit volume, each of charge \\(-e\\), drifting with speed \\(v_d\\).",
        "In time \\(\\Delta t\\) the electrons within a length \\(v_d\\,\\Delta t\\) cross the area: number \\(= nAv_d\\,\\Delta t\\).",
        "Charge crossing \\(= neAv_d\\,\\Delta t\\), so \\(I = neAv_d\\) and \\(j = nev_d\\).",
      ],
    },
    {
      title: "Derive drift velocity, and hence the expressions for conductivity and resistivity (Ohm's law)",
      steps: [
        "In a field E each electron has acceleration \\(\\vec{a} = -\\frac{e\\vec{E}}{m}\\); after a collision its velocity is random.",
        "Velocity of electron i: \\(\\vec{v}_i = \\vec{v}_{0i} - \\frac{e\\vec{E}}{m}t_i\\). Averaging, \\(\\overline{\\vec{v}_{0i}} = 0\\) and \\(\\overline{t_i} = \\tau\\): \\(\\vec{v}_d = -\\frac{e\\vec{E}}{m}\\tau\\).",
        "\\(I = neAv_d = \\frac{e^2 A \\tau n}{m}E\\). So \\(j = \\frac{ne^2\\tau}{m}E = \\sigma E\\), which is Ohm's law.",
        "Hence \\(\\sigma = \\frac{ne^2\\tau}{m}\\), \\(\\rho = \\frac{m}{ne^2\\tau}\\) and, with \\(E = \\frac{V}{l}\\), \\(R = \\frac{ml}{ne^2\\tau A}\\).",
      ],
    },
    {
      title: "Obtain the terminal voltage of a cell and the current it gives in a circuit",
      steps: [
        "Cell of emf \\(\\varepsilon\\) and internal resistance r joined to an external resistance R.",
        "Current: \\(I = \\frac{\\varepsilon}{R + r}\\).",
        "Terminal voltage \\(V = IR = \\varepsilon - Ir\\), so V is less than \\(\\varepsilon\\) and equals it only when I = 0 (open circuit).",
        "Maximum current (short circuit, R = 0) is \\(\\frac{\\varepsilon}{r}\\).",
      ],
    },
    {
      title: "Find the equivalent emf and internal resistance of two cells in series and in parallel",
      steps: [
        "Series: \\(V_{AC} = (\\varepsilon_1 - Ir_1) + (\\varepsilon_2 - Ir_2)\\), so \\(\\varepsilon_{eq} = \\varepsilon_1 + \\varepsilon_2\\), \\(r_{eq} = r_1 + r_2\\). A cell reversed subtracts its emf.",
        "Parallel: \\(I = I_1 + I_2\\) with \\(I_1 = \\frac{\\varepsilon_1 - V}{r_1}\\), \\(I_2 = \\frac{\\varepsilon_2 - V}{r_2}\\).",
        "So \\(V = \\frac{\\varepsilon_1 r_2 + \\varepsilon_2 r_1}{r_1 + r_2} - I\\,\\frac{r_1 r_2}{r_1 + r_2}\\), which compares with \\(V = \\varepsilon_{eq} - Ir_{eq}\\).",
      ],
    },
    {
      title: "Using Kirchhoff's rules, obtain the balance condition of a Wheatstone bridge",
      steps: [
        "\\(R_1\\) (AD), \\(R_2\\) (AB), \\(R_3\\) (DC), \\(R_4\\) (BC); source across AC, galvanometer across BD.",
        "Balanced: \\(I_g = 0\\). Junction rule at D and B: \\(I_1 = I_3\\), \\(I_2 = I_4\\).",
        "Loop ADBA: \\(-I_1R_1 + I_2R_2 = 0\\). Loop CBDC: \\(I_2R_4 - I_1R_3 = 0\\).",
        "Dividing: \\(\\frac{R_2}{R_1} = \\frac{R_4}{R_3}\\). An unknown \\(R_4\\) is found from the other three.",
      ],
    },
    {
      title: "Obtain the power dissipated in a resistor",
      steps: [
        "Charge \\(\\Delta Q = I\\,\\Delta t\\) moves from A to B through a potential drop V and loses energy \\(\\Delta Q\\,V\\).",
        "This energy appears as heat (collisions with ions): \\(\\Delta W = IV\\,\\Delta t\\).",
        "Power \\(P = IV = I^2R = \\frac{V^2}{R}\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Drift of electrons in a conductor", labels: ["conductor of area A", "field E", "drift velocity opposite to E", "length vd Δt", "current I along E"] },
    { title: "Resistivity against temperature", labels: ["copper: rises with T, nearly linear", "nichrome: rises slowly", "semiconductor: falls with T", "axes ρ and T"] },
    { title: "V against I for GaAs (limit of Ohm's law)", labels: ["non-linear curve", "region of negative resistance", "same I for more than one V"] },
    { title: "Cell with internal resistance in a circuit", labels: ["emf ε and internal resistance r", "external resistance R", "current I", "terminal voltage V"] },
    { title: "Kirchhoff's rules: junction and loop", labels: ["currents into and out of a junction", "a closed loop", "sign of IR and of each emf"] },
    { title: "Wheatstone bridge", labels: ["R1, R2, R3, R4", "battery arm AC", "galvanometer arm BD", "currents I1, I2 and Ig"] },
  ],
  mostAsked: [
    {
      topic: "Cells: emf, terminal voltage and internal resistance (with graphs against R), and cells in series or parallel",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Drift velocity: relation with current, and how drift velocity, E and j change with V, length or area",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Kirchhoff's rules and resistor networks: statements, branch currents, equivalent resistance",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Resistance of a wire: R = ρl/A, stretched wires, and wires of different length or radius",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Resistivity and conductivity in terms of n and τ, mobility, and Ohm's law in vector form",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Temperature dependence of resistance: coefficient, graphs, a numerical",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Electrical power and heating: heaters and bulbs in series, power against R, I or V",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Wheatstone bridge: balance condition by Kirchhoff's rules",
      marks: 3,
      years: [2026, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Taking drift velocity as electron speed",
      body: "Drift speed is a few mm/s; the random speeds are far larger. The bulb glows at once because the **field** spreads through the circuit almost at the speed of light, not because electrons race from the switch.",
    },
    {
      title: "Getting what stays fixed wrong",
      body: "In series, the **current** is the same in every part, so where the area is smaller, j and \\(v_d\\) are larger. Doubling V doubles E, \\(v_d\\) and j; mobility and \\(\\tau\\) do not change.",
    },
    {
      title: "Forgetting the area when a wire is stretched",
      body: "Volume stays the same: length n times means area \\(\\frac{1}{n}\\) times, so \\(R' = n^2R\\). Doubling the length makes R four times (a 300% increase), not twice.",
    },
    {
      title: "Calling emf a voltage across a working cell",
      body: "Emf is measured with **no current**. With current, \\(V = \\varepsilon - Ir\\). An ideal voltmeter on a cell in open circuit reads \\(\\varepsilon\\).",
    },
    {
      title: "Signs in the loop rule",
      body: "Going along the current through a resistor, the change is \\(-IR\\); against it, \\(+IR\\). Crossing a cell from \\(-\\) to \\(+\\) adds \\(+\\varepsilon\\). Keep one direction round each loop.",
    },
    {
      title: "Mixing up which law conserves what",
      body: "The junction rule conserves **charge**; the loop rule conserves **energy**. Metals have a positive temperature coefficient, semiconductors a negative one.",
    },
  ],
};

export default sheet;
