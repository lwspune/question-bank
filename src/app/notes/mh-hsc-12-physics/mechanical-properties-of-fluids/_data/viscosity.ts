import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MF_VISCOSITY_NOTE: SubtopicNote = {
  subtopicName: "Viscosity, Critical Velocity and Reynolds Number",
  title: "Viscosity, Critical Velocity and Reynolds Number",
  oneLineDefinition:
    "Newton's law of viscosity and the coefficient of viscosity, its unit and dimensions, streamline and turbulent flow, and how Reynolds number decides the critical velocity.",
  whyItMatters:
    "6 questions, five of them from board papers: the formula for critical velocity (2022), define the coefficient of viscosity (2023), find it for glycerin under a moving plate (2024), derive it from Newton's law of viscosity (2025), and find a velocity gradient (2026). The textbook adds a plate moving on a layer of oil.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmf-viscosity-law",
      name: "Newton's law of viscosity",
      intuition:
        "A flowing liquid moves in layers. The layer touching the fixed surface stays at rest, and each layer above moves a little faster. Neighbouring layers rub against each other: the faster one drags the slower one forward and is dragged back in turn. This internal friction is viscosity. Honey has a lot of it, water a little.",
      definition:
        "- In streamline flow over a fixed surface, the layer in contact with the surface is at rest and layers further away move faster.\n" +
        "- Two layers a distance \\(dx\\) apart, moving with velocities \\(v\\) and \\(v + dv\\), have a **velocity gradient** \\(\\dfrac{dv}{dx}\\), measured at right angles to the flow (unit s⁻¹).\n" +
        "- Newton found that the viscous force between them is proportional to the area of contact, \\(F \\propto A\\), and to the velocity gradient, \\(F \\propto \\dfrac{dv}{dx}\\).\n" +
        "- So \\(F = -\\eta A \\dfrac{dv}{dx}\\). The minus sign shows that the force opposes the relative motion of the layers.\n" +
        "- \\(\\eta = \\dfrac{F}{A\\,(dv/dx)}\\): the **coefficient of viscosity** is the viscous force per unit area per unit velocity gradient.\n" +
        "- SI unit N s/m² (Pa s); C.G.S. unit poise; 1 N s/m² = 10 poise. Dimensions \\([L^{-1}M^{1}T^{-1}]\\).\n" +
        "- A plate moving with speed \\(v\\) on a thin layer of thickness \\(d\\): the gradient is uniform, \\(\\dfrac{dv}{dx} = \\dfrac{v}{d}\\), so \\(F = \\dfrac{\\eta A v}{d}\\).",
      formula: {
        label: "Newton's law of viscosity",
        latex: "F = -\\eta A \\frac{dv}{dx}, \\qquad \\eta = \\frac{F}{A\\,(dv/dx)}",
        symbols: [
          { symbol: "\\(\\eta\\)", meaning: "coefficient of viscosity" },
          { symbol: "\\(A\\)", meaning: "area of contact between the layers" },
          { symbol: "\\(\\dfrac{dv}{dx}\\)", meaning: "velocity gradient at right angles to the flow" },
        ],
      },
      authoredExample: {
        prompt:
          "A metal plate of area 0.02 m² slides at 4 cm/s over a 2 mm thick layer of oil of coefficient of viscosity 0.5 N s/m². Find the horizontal force needed to keep it moving.",
        steps: [
          "Given: \\(A = 0.02\\) m², \\(v = 4\\) cm/s \\(= 0.04\\) m/s, \\(d = 2\\) mm \\(= 2 \\times 10^{-3}\\) m, \\(\\eta = 0.5\\) N s/m².",
          "Velocity gradient: \\(\\dfrac{dv}{dx} = \\dfrac{v}{d} = \\dfrac{0.04}{2 \\times 10^{-3}} = 20\\) s⁻¹.",
          "Formula: \\(F = \\eta A \\dfrac{dv}{dx} = 0.5 \\times 0.02 \\times 20 = 0.2\\) N.",
        ],
        answer: "0.2 N",
      },
      selfCheckExample: {
        prompt: "Two layers of a liquid 2 mm apart move with a relative velocity of 0.6 cm/s. Find the velocity gradient.",
        steps: ["\\(\\dfrac{dv}{dx} = \\dfrac{0.6 \\times 10^{-2}}{2 \\times 10^{-3}} = 3\\) s⁻¹"],
        answer: "3 s⁻¹",
      },
      practiceSet: [
        { prompt: "Convert a coefficient of viscosity of 0.8 N s/m² into poise.", answer: "8 poise" },
        { prompt: "Write the dimensions of the coefficient of viscosity.", answer: "\\([L^{-1}M^{1}T^{-1}]\\)" },
        { prompt: "Why is there a minus sign in \\(F = -\\eta A\\,dv/dx\\)?", answer: "The viscous force opposes the relative motion of the layers" },
      ],
      pyqExampleId: "1113240f-627f-4704-8591-42e1606ca2ff",
      traps: [
        {
          title: "Velocity gradient along the flow",
          body: "The gradient is the change of velocity per unit distance at right angles to the flow, from one layer to the next, not along the direction of flow.",
        },
        {
          title: "Wrong SI unit",
          body: "The unit of \\(\\eta\\) is N s/m² (or Pa s). Writing N/m² s or N m/s loses the mark asked for in a 'state its SI unit' question.",
        },
        {
          title: "Thickness in mm with speed in m/s",
          body: "Put the layer thickness and the speed in the same length unit before dividing, or the gradient is off by a factor of 1000.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmf-reynolds",
      name: "Streamline flow, critical velocity and Reynolds number",
      intuition:
        "At low speed a liquid flows smoothly in layers that never mix. Speed it up past a certain value and the flow breaks into swirls and eddies. Reynolds number is one pure number that tells you which: it grows with speed, density and pipe size, and falls with viscosity.",
      definition:
        "- **Streamline flow:** every particle passing a given point follows the same path, with the same velocity at that point. Streamlines never cross.\n" +
        "- **Turbulent flow:** above a certain speed the motion becomes irregular, with eddies.\n" +
        "- **Critical velocity** \\(v_c\\): the speed up to which the flow stays streamline.\n" +
        "- **Reynolds number** \\(R_n = \\dfrac{\\rho v d}{\\eta}\\), a pure number with no unit (\\(d\\) is the diameter of the tube).\n" +
        "- \\(R_n < 1000\\): streamline. \\(R_n > 2000\\): turbulent. Between the two the flow is unsteady.\n" +
        "- Rearranged: \\(v_c = \\dfrac{R_n \\eta}{\\rho d}\\).",
      formula: {
        label: "Reynolds number and critical velocity",
        latex: "R_n = \\frac{\\rho v d}{\\eta}, \\qquad v_c = \\frac{R_n\\,\\eta}{\\rho d}",
        symbols: [
          { symbol: "\\(\\rho\\)", meaning: "density of the fluid" },
          { symbol: "\\(d\\)", meaning: "diameter of the tube" },
          { symbol: "\\(\\eta\\)", meaning: "coefficient of viscosity" },
        ],
      },
      authoredExample: {
        prompt:
          "Water (density 1000 kg/m³, coefficient of viscosity \\(1.0 \\times 10^{-3}\\) N s/m²) flows at 0.5 m/s through a pipe of diameter 2 cm. Find the Reynolds number and state the type of flow.",
        steps: [
          "Given: \\(\\rho = 1000\\) kg/m³, \\(v = 0.5\\) m/s, \\(d = 0.02\\) m, \\(\\eta = 10^{-3}\\) N s/m².",
          "Formula: \\(R_n = \\dfrac{\\rho v d}{\\eta}\\).",
          "Substitution: \\(R_n = \\dfrac{1000 \\times 0.5 \\times 0.02}{10^{-3}} = 10000\\).",
          "\\(R_n > 2000\\), so the flow is turbulent.",
        ],
        answer: "Reynolds number 10 000; the flow is turbulent",
      },
      selfCheckExample: {
        prompt:
          "Taking \\(R_n = 1000\\) as the limit of streamline flow, find the critical velocity of water in a tube of diameter 1 cm. (\\(\\rho = 1000\\) kg/m³, \\(\\eta = 10^{-3}\\) N s/m²)",
        steps: ["\\(v_c = \\dfrac{R_n \\eta}{\\rho d} = \\dfrac{1000 \\times 10^{-3}}{1000 \\times 0.01} = 0.1\\) m/s"],
        answer: "0.1 m/s",
      },
      practiceSet: [
        { prompt: "What is the unit of Reynolds number?", answer: "It has none; it is a pure number" },
        { prompt: "A flow has a Reynolds number of 3000. Is it streamline or turbulent?", answer: "Turbulent" },
        { prompt: "Can two streamlines cross each other?", answer: "No" },
      ],
      pyqExampleId: "ad62fd5d-9192-4dc1-965c-237d40d823ba",
      traps: [
        {
          title: "Radius in place of diameter",
          body: "Reynolds number uses the diameter \\(d\\) of the tube. Putting the radius halves the answer.",
        },
        {
          title: "Giving Reynolds number a unit",
          body: "All the units cancel. Writing a unit after \\(R_n\\) shows the formula was not understood.",
        },
      ],
    },
  ],
};
