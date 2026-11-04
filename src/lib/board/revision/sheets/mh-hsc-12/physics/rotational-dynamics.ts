import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 1 Rotational Dynamics. Statements checked against the
 * Balbharati text (theorem wordings are the book's own); most-asked years from
 * the 56 board past-paper questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Rotational Dynamics",
  chapterSlug: "rotational-dynamics",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 1",
  keyPoints: [
    {
      term: "Uniform circular motion",
      text: "Circular motion at constant speed. Only the direction of velocity changes; velocity stays tangential and the acceleration \\(a = \\omega^2 r = \\frac{v^2}{r}\\) points to the centre (centripetal).",
    },
    {
      term: "Centripetal force",
      text: "The resultant of all the **real** forces on a body in circular motion, directed towards the centre, of magnitude \\(mr\\omega^2 = \\frac{mv^2}{r}\\).",
    },
    {
      term: "Centrifugal force",
      text: "A **pseudo** force, felt only in the rotating frame, equal and opposite to the centripetal force. It arises from the centripetal acceleration of the frame: non-real, but not imaginary.",
    },
    {
      term: "Banking of a road",
      text: "Tilting the surface of a curved road at an angle \\(\\theta\\) with the horizontal, so that the horizontal component \\(N\\sin\\theta\\) of the normal reaction provides the centripetal force.",
    },
    {
      term: "Conical pendulum",
      text: "A bob on a string that moves in a horizontal circle, the string sweeping the surface of a right circular cone with a vertical axis.",
    },
    {
      term: "Moment of inertia",
      text: "\\(I = \\sum m_i r_i^2\\): the rotational analogue of mass. It depends on the mass and on how the mass is distributed about the axis. SI unit kg m²; dimensions \\([L^2M^1T^0]\\).",
    },
    {
      term: "Radius of gyration",
      text: "The distance \\(K\\) from the axis at which the whole mass could be placed for the same moment of inertia: \\(I = MK^2\\). Larger \\(K\\), farther the mass from the axis. For the same \\(M\\) and \\(R\\), a ring has the largest \\(K\\).",
    },
    {
      term: "Theorem of parallel axes",
      text: "The moment of inertia of an object about any axis is the sum of its moment of inertia about a parallel axis through the centre of mass and \\(Mh^2\\), where \\(h\\) is the distance between the two axes.",
    },
    {
      term: "Theorem of perpendicular axes",
      text: "For a **laminar** object, the moment of inertia about an axis perpendicular to its plane equals the sum of its moments of inertia about two mutually perpendicular axes in its plane, all three axes being concurrent.",
    },
    {
      term: "Angular momentum",
      text: "The moment of linear momentum, \\(L = pr\\sin\\theta\\). For a rigid body, \\(L = I\\omega\\): \\(I\\) replaces mass in \\(p = mv\\), which is the physical significance of moment of inertia.",
    },
    {
      term: "Torque",
      text: "The rate of change of angular momentum, \\(\\vec{\\tau} = \\frac{d\\vec{L}}{dt}\\). For a rigid body, \\(\\tau = I\\alpha\\). SI unit N m; dimensions \\([L^2M^1T^{-2}]\\).",
    },
    {
      term: "Conservation of angular momentum",
      text: "If the resultant external torque on a system is zero, its angular momentum stays constant. Seen in ballet, ice skating, diving and circus acrobatics: pulling the arms in lowers \\(I\\) and raises \\(\\omega\\).",
    },
    {
      term: "Rolling motion",
      text: "Pure rolling is rotation and translation together. Static friction is essential: it prevents sliding.",
    },
  ],
  formulas: [
    { label: "Circular motion", latex: "v = \\omega r \\qquad a_r = \\omega^2 r = \\frac{v^2}{r} \\qquad \\omega = 2\\pi n = \\frac{2\\pi}{T}" },
    { label: "Unbanked road: maximum speed", latex: "v_{max} = \\sqrt{\\mu_s r g}" },
    { label: "Well of death: minimum speed", latex: "v_{min} = \\sqrt{\\frac{rg}{\\mu_s}}" },
    { label: "Banking angle and safest speed", latex: "\\tan\\theta = \\frac{v^2}{rg} \\qquad v_s = \\sqrt{rg\\tan\\theta}" },
    {
      label: "Banked road with friction: speed limits",
      latex:
        "v_{min} = \\sqrt{rg\\left(\\frac{\\tan\\theta - \\mu_s}{1 + \\mu_s\\tan\\theta}\\right)} \\qquad v_{max} = \\sqrt{rg\\left(\\frac{\\tan\\theta + \\mu_s}{1 - \\mu_s\\tan\\theta}\\right)}",
    },
    {
      label: "Conical pendulum",
      latex: "T = 2\\pi\\sqrt{\\frac{L\\cos\\theta}{g}} \\qquad \\tan\\theta = \\frac{r\\omega^2}{g}",
      symbols: [
        { symbol: "L", meaning: "length of the string" },
        { symbol: "θ", meaning: "semi-vertical angle" },
      ],
    },
    {
      label: "Vertical circle (string): minimum speeds",
      latex: "v_{top} = \\sqrt{rg} \\qquad v_{side} = \\sqrt{3rg} \\qquad v_{bottom} = \\sqrt{5rg}",
    },
    { label: "Vertical circle: tensions", latex: "T_{bottom} - T_{top} = 6mg \\qquad T_{side} - T_{top} = 3mg" },
    { label: "Moment of inertia", latex: "I = \\sum m_i r_i^2 = MK^2" },
    {
      label: "Standard moments of inertia",
      latex: "I_{ring} = MR^2 \\qquad I_{disc} = \\frac{1}{2}MR^2 \\qquad I_{solid\\ sphere} = \\frac{2}{5}MR^2",
    },
    { label: "Theorems of axes", latex: "I_O = I_C + Mh^2 \\qquad I_z = I_x + I_y" },
    { label: "Angular momentum and torque", latex: "L = I\\omega \\qquad \\tau = I\\alpha = \\frac{dL}{dt} \\qquad P = \\tau\\omega" },
    {
      label: "Rotational and rolling kinetic energy",
      latex: "E_{rot} = \\frac{1}{2}I\\omega^2 \\qquad E_{rolling} = \\frac{1}{2}Mv^2\\left(1 + \\frac{K^2}{R^2}\\right)",
    },
    { label: "Rolling down an incline (from rest, height h)", latex: "v = \\sqrt{\\frac{2gh}{1 + K^2/R^2}}" },
  ],
  derivations: [
    {
      title: "Maximum speed of a vehicle on a horizontal circular road",
      steps: [
        "Forces on the vehicle: weight \\(mg\\) down, normal reaction \\(N\\) up, static friction \\(f_s\\) towards the centre.",
        "Vertical balance: \\(N = mg\\). Friction is the centripetal force: \\(f_s = \\frac{mv^2}{r}\\).",
        "Friction has an upper limit \\(f_s \\le \\mu_s N = \\mu_s mg\\), so \\(\\frac{mv^2}{r} \\le \\mu_s mg\\).",
        "Hence \\(v_{max} = \\sqrt{\\mu_s r g}\\).",
      ],
    },
    {
      title: "Minimum speed in a well of death",
      steps: [
        "Forces: normal reaction \\(N\\) horizontal towards the centre, weight \\(mg\\) down, static friction \\(f_s\\) up the wall.",
        "\\(N = \\frac{mv^2}{r}\\) (centripetal) and \\(f_s = mg\\) (no slipping down).",
        "\\(f_s \\le \\mu_s N\\) gives \\(mg \\le \\mu_s \\frac{mv^2}{r}\\).",
        "Hence \\(v_{min} = \\sqrt{\\frac{rg}{\\mu_s}}\\).",
      ],
    },
    {
      title: "Angle of banking (friction ignored)",
      steps: [
        "Forces: weight \\(mg\\) and normal reaction \\(N\\), perpendicular to the road.",
        "Resolve \\(N\\): \\(N\\cos\\theta = mg\\) and \\(N\\sin\\theta = \\frac{mv^2}{r}\\).",
        "Divide: \\(\\tan\\theta = \\frac{v^2}{rg}\\), so the safest speed is \\(v_s = \\sqrt{rg\\tan\\theta}\\).",
      ],
    },
    {
      title: "Period of a conical pendulum",
      steps: [
        "Resolve the tension \\(T_0\\): \\(T_0\\cos\\theta = mg\\) and \\(T_0\\sin\\theta = mr\\omega^2\\).",
        "Divide: \\(\\tan\\theta = \\frac{r\\omega^2}{g}\\). With \\(r = L\\sin\\theta\\), \\(\\omega = \\sqrt{\\frac{g}{L\\cos\\theta}}\\).",
        "\\(T = \\frac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\frac{L\\cos\\theta}{g}}\\).",
      ],
    },
    {
      title: "Speeds in a vertical circle (string)",
      steps: [
        "At the top: \\(T_A + mg = \\frac{mv_A^2}{r}\\). The string must not slack (\\(T_A \\ge 0\\)), so \\(v_{A,min} = \\sqrt{rg}\\).",
        "Energy conservation from top to bottom: \\(\\frac{1}{2}mv_B^2 = \\frac{1}{2}mv_A^2 + mg(2r)\\), so \\(v_B^2 = v_A^2 + 4rg\\).",
        "Hence \\(v_{B,min} = \\sqrt{5rg}\\); similarly at the horizontal position \\(v_{min} = \\sqrt{3rg}\\).",
        "At the bottom \\(T_B - mg = \\frac{mv_B^2}{r}\\); subtracting gives \\(T_B - T_A = 6mg\\).",
      ],
    },
    {
      title: "State and prove the theorem of parallel axes",
      steps: [
        "Take an element \\(dm\\) at D; O is on the given axis, C on the parallel axis through the centre of mass, \\(h = CO\\).",
        "\\(I_O = \\int (DO)^2 dm\\); using the perpendicular DN, write \\((DO)^2 = (DC)^2 + 2(NC)h + h^2\\).",
        "So \\(I_O = \\int (DC)^2 dm + 2h\\int NC\\,dm + h^2\\int dm\\).",
        "\\(\\int NC\\,dm = 0\\) because C is the centre of mass, so \\(I_O = I_C + Mh^2\\).",
      ],
    },
    {
      title: "State and prove the theorem of perpendicular axes",
      steps: [
        "Take an element \\(dm\\) of a laminar object at \\((x, y)\\) in the x-y plane; the z-axis is perpendicular to the plane.",
        "Its distances from the x, y and z axes are \\(y\\), \\(x\\) and \\(\\sqrt{x^2 + y^2}\\).",
        "\\(I_x = \\int y^2 dm\\), \\(I_y = \\int x^2 dm\\), \\(I_z = \\int (x^2 + y^2) dm\\).",
        "Hence \\(I_z = I_x + I_y\\).",
      ],
    },
    {
      title: "Torque on a body rotating with constant angular acceleration",
      steps: [
        "For a particle at distance \\(r_i\\): \\(F_i = m_i a_i = m_i r_i\\alpha\\).",
        "Its torque is \\(\\tau_i = r_i F_i = m_i r_i^2\\alpha\\).",
        "Sum over all particles: \\(\\tau = \\left(\\sum m_i r_i^2\\right)\\alpha = I\\alpha\\).",
      ],
    },
    {
      title: "State and prove the principle of conservation of angular momentum",
      steps: [
        "\\(\\vec{L} = \\vec{r} \\times \\vec{p}\\). Differentiate: \\(\\frac{d\\vec{L}}{dt} = \\vec{v} \\times \\vec{p} + \\vec{r} \\times \\vec{F}\\).",
        "\\(\\vec{v} \\times m\\vec{v} = 0\\), so \\(\\frac{d\\vec{L}}{dt} = \\vec{r} \\times \\vec{F} = \\vec{\\tau}\\).",
        "If the external torque \\(\\vec{\\tau} = 0\\), then \\(\\frac{d\\vec{L}}{dt} = 0\\), so \\(\\vec{L}\\) is constant.",
      ],
    },
    {
      title: "Kinetic energy of a rotating body, and of a rolling body",
      steps: [
        "Rotating: particle \\(i\\) has speed \\(r_i\\omega\\); summing \\(\\frac{1}{2}m_i r_i^2\\omega^2\\) gives \\(E = \\frac{1}{2}I\\omega^2\\).",
        "Rolling: \\(E = \\frac{1}{2}Mv^2 + \\frac{1}{2}I\\omega^2\\), with \\(I = MK^2\\) and \\(\\omega = \\frac{v}{R}\\).",
        "So \\(E = \\frac{1}{2}Mv^2\\left(1 + \\frac{K^2}{R^2}\\right)\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Vehicle on a banked road", labels: ["weight mg", "normal reaction N", "N cos θ and N sin θ", "angle of banking θ", "towards the centre"] },
    { title: "Well of death", labels: ["normal reaction N towards the centre", "weight mg down", "static friction fs up"] },
    { title: "Conical pendulum", labels: ["rigid support", "string length L", "semi-vertical angle θ", "tension T₀ and its components", "weight mg", "radius r"] },
    { title: "Vertical circle", labels: ["top A and bottom B", "horizontal positions C and D", "tension and weight at A and B", "radius r"] },
    { title: "Theorem of parallel axes", labels: ["axis through the centre of mass C", "parallel axis through O", "distance h between them", "element dm at D"] },
    { title: "Theorem of perpendicular axes", labels: ["laminar object", "x and y axes in its plane", "z axis perpendicular", "all three concurrent"] },
  ],
  mostAsked: [
    { topic: "Vertical circle: speeds, energies or tensions at the lowest, horizontal and highest points", years: [2023, 2022, 2020, 2019, 2018] },
    { topic: "State and prove the theorem of parallel axes, or of perpendicular axes", years: [2026, 2020, 2016] },
    { topic: "Maximum safe speed of a vehicle on a horizontal circular road", years: [2026, 2024, 2018] },
    { topic: "Angle of banking: formula or a numerical", years: [2025, 2024, 2017] },
    { topic: "Kinetic energy of a rotating body, or of a rolling body", years: [2022, 2020, 2017, 2016] },
    { topic: "State and prove the principle of conservation of angular momentum", years: [2025, 2018] },
    { topic: "Torque on a body rotating with constant angular acceleration (\\(\\tau = I\\alpha\\))", years: [2025, 2024, 2017] },
    { topic: "Define moment of inertia, with its SI unit and dimensions", years: [2022, 2018] },
  ],
  mistakes: [
    {
      title: "Adding centrifugal force in the ground frame",
      body: "Centrifugal force exists only in the rotating frame. In an inertial frame, draw only real forces and let their resultant be the centripetal force.",
    },
    {
      title: "Calling \\(\\sqrt{rg\\tan\\theta}\\) the maximum speed",
      body: "It is the most safe speed on a banked road, at which friction is not needed. It is neither a minimum nor a maximum.",
    },
    {
      title: "Using the perpendicular axes theorem on a 3D body",
      body: "It holds only for a **laminar** object, with all three axes concurrent. The parallel axes theorem needs one of the two axes through the centre of mass.",
    },
    {
      title: "Leaving speed in rpm",
      body: "Convert first: \\(\\omega = 2\\pi n\\) with \\(n\\) in rev/s. 60 rpm is 1 rev/s, so \\(\\omega = 2\\pi\\) rad/s.",
    },
    {
      title: "Using the kinematical equations in a vertical circle",
      body: "When gravity alone controls the motion, the accelerations are not constant. Use energy conservation instead.",
    },
    {
      title: "Writing \\(f_s = \\mu_s N\\) at every speed in a well of death",
      body: "Friction always equals \\(mg\\). It equals \\(\\mu_s N\\) only at the minimum speed.",
    },
  ],
};

export default sheet;
