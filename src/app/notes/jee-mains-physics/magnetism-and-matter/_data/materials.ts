import type { SubtopicNote } from "@/app/notes/_types";

export const MATERIALS_MM_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Properties of Materials and Hysteresis",
  title: "Magnetic Properties of Materials and Hysteresis",
  oneLineDefinition:
    "A material placed in a field H becomes magnetised, M = χH, so the field inside rises to μ₀(H + M); the sign and size of χ sort materials into diamagnetic, paramagnetic and ferromagnetic, and a ferromagnet's hysteresis loop decides what it is used for.",
  whyItMatters:
    "Twenty-three PYQs, half the chapter, three of them asking for a number and two from 2026. Ten test the three classes of material statement by statement, nine use the relations between H, χ and μ, and four ask why soft iron suits an electromagnet or what current demagnetises a magnet. Most are settled by one exact fact, so learn the table rather than the gist.",
  concepts: [
    // C1 — H, M, chi, mu
    {
      kind: "formula" as const,
      slug: "jpmm-h-chi-mu",
      name: "Magnetic intensity, susceptibility and permeability",
      intuition:
        "The current in a solenoid sets the magnetic intensity H = ni, whatever fills the core. The core then magnetises itself, M = χH, and adds its own field, so B = μ₀(H + M). If χ is small the core changes B by the fraction χ; if it is large, as in iron, B grows hundreds of times. Permeability and susceptibility describe the same response and differ by one.",
      definition:
        "- Magnetic intensity H, unit \\(A\\,m^{-1}\\); in a solenoid or toroid \\(H = ni\\).\n" +
        "- Magnetisation \\(M = \\chi H\\) (moment per unit volume, \\(A\\,m^{-1}\\)); χ has no unit.\n" +
        "- \\(B = \\mu_0(H + M) = \\mu_0(1 + \\chi)H = \\mu H\\), with \\(\\mu = \\mu_0\\mu_r\\) and \\(\\mu_r = 1 + \\chi\\). So \\(\\chi = \\dfrac{\\mu}{\\mu_0} - 1\\).\n" +
        "- Filling a solenoid or toroid with a material raises B by the fraction \\(\\dfrac{B - B_0}{B_0} = \\chi\\); as a percentage, \\(100\\chi\\).\n" +
        "- The magnetic moment of a core of volume V: \\(m = MV = (\\mu_r - 1)\\,niV\\).\n" +
        "- Units: B in tesla or gauss (\\(1\\ G = 10^{-4}\\ T\\)); H in \\(A\\,m^{-1}\\); flux in weber; magnetic moment in \\(A\\,m^{2}\\).",
      formula: {
        label: "Magnetising a material",
        latex:
          "M = \\chi H \\qquad B = \\mu_0(H + M) = \\mu_0\\mu_r H \\qquad \\mu_r = 1 + \\chi \\qquad \\frac{\\Delta B}{B_0} = \\chi",
      },
      authoredExample: {
        prompt:
          "A long solenoid has 2000 turns per metre and carries 0.5 A. Its core has relative permeability 600. Find H, B and the magnetisation of the core. \\((\\mu_0 = 4\\pi \\times 10^{-7}\\ T\\,m\\,A^{-1})\\)",
        steps: [
          "\\(H = ni = 2000 \\times 0.5 = 1000\\ A\\,m^{-1}\\). The core does not change H.",
          "\\(B = \\mu_0\\mu_r H = 4\\pi \\times 10^{-7} \\times 600 \\times 1000 = 0.24\\pi \\approx 0.75\\ T\\).",
          "\\(\\chi = \\mu_r - 1 = 599\\), so \\(M = \\chi H = 5.99 \\times 10^{5}\\ A\\,m^{-1}\\).",
        ],
        answer: "\\(1000\\ A\\,m^{-1}\\); about 0.75 T; \\(5.99 \\times 10^{5}\\ A\\,m^{-1}\\)",
      },
      selfCheckExample: {
        prompt:
          "The permeability of a medium is \\(8\\pi \\times 10^{-5}\\ T\\,m\\,A^{-1}\\). Find its relative permeability and its susceptibility. \\((\\mu_0 = 4\\pi \\times 10^{-7}\\ T\\,m\\,A^{-1})\\)",
        steps: [
          "\\(\\mu_r = \\dfrac{\\mu}{\\mu_0} = \\dfrac{8\\pi \\times 10^{-5}}{4\\pi \\times 10^{-7}} = 200\\).",
          "\\(\\chi = \\mu_r - 1 = 199\\).",
        ],
        answer: "\\(\\mu_r = 200\\), \\(\\chi = 199\\)",
      },
      practiceSet: [
        { prompt: "A solenoid is filled with a material of susceptibility \\(3 \\times 10^{-4}\\). By what percentage does the field inside rise?", answer: "0.03%" },
        { prompt: "What is the SI unit of magnetic intensity H?", answer: "\\(A\\,m^{-1}\\)" },
        { prompt: "How many tesla is one gauss?", answer: "\\(10^{-4}\\ T\\)" },
        { prompt: "At the same current, a solenoid's core of relative permeability 101 is replaced by one of 201, same volume. Ratio of the new core moment to the old?", answer: "2", method: "\\(m \\propto \\mu_r - 1\\): 200/100." },
      ],
      pyqExampleId: "bb4070cd-fe0f-4872-a344-7399a0cfd9c0", // 11 Apr 2023: toroid filled with a material, percentage rise in B
      traps: [
        {
          title: "Fraction and percentage",
          body: "Filling a solenoid raises B by the fraction χ. The percentage rise is 100χ. Options often offer both, one of them a hundred times off.",
        },
        {
          title: "Relative permeability and susceptibility differ by one",
          body: "μᵣ = 1 + χ. For a strongly magnetic material the difference hardly matters, but for a susceptibility near zero, using χ in place of μᵣ throws the answer away.",
        },
      ],
    },

    // C2 — the three classes
    {
      kind: "reference" as const,
      slug: "jpmm-classes",
      name: "Diamagnetic, paramagnetic and ferromagnetic materials",
      intuition:
        "In a diamagnet the atoms have no moment of their own; the field changes the electrons' orbits and induces a small moment opposite to it, so the material is weakly pushed out of a strong field. A paramagnet's atoms carry moments that the field lines up a little against thermal jostling, so it is weakly pulled in, and less so when hot. In a ferromagnet the moments line up by themselves in regions called domains, so the pull is strong, until heating past the Curie temperature breaks the domains apart.",
      definition:
        "- **Diamagnetic**: \\(-1 \\leq \\chi < 0\\); \\(\\chi = -1\\) is a perfect diamagnet (a superconductor). The induced moment opposes the field. Independent of temperature. Moves from a strong to a weak field.\n" +
        "- **Paramagnetic**: χ small and positive. Curie's law \\(\\chi = C/T\\). Moves from a weak to a strong field; only weakly attracted.\n" +
        "- **Ferromagnetic**: χ very large. Each domain is magnetised to saturation; in an applied field, domains along the field grow and the others shrink and turn. Above the Curie temperature \\(T_C\\) it becomes paramagnetic, with \\(\\chi = C/(T - T_C)\\).\n" +
        "- Graphs: M against H is a straight line of negative slope for a diamagnet and of positive slope for a paramagnet. χ against T is a flat negative line for a diamagnet and a falling curve for a paramagnet.",
      table: {
        columns: ["Property", "Diamagnetic", "Paramagnetic", "Ferromagnetic"],
        rows: [
          { cells: ["Susceptibility χ", "Small, negative: −1 ≤ χ < 0", "Small, positive", "Very large, positive"] },
          { cells: ["Relative permeability μᵣ", "Slightly less than 1", "Slightly more than 1", "Much greater than 1"] },
          { cells: ["Atomic moments", "None; the field induces a moment opposite to itself", "Permanent, randomly oriented without a field", "Permanent, aligned within domains"] },
          { cells: ["In a non-uniform field", "Moves from strong to weak field", "Moves from weak to strong field, weakly attracted", "Strongly attracted"] },
          { cells: ["Effect of temperature", "χ does not depend on temperature", "χ = C/T (Curie's law)", "Paramagnetic above the Curie temperature"] },
          { cells: ["M against H", "Straight line, negative slope", "Straight line, small positive slope", "Curved, saturates, shows hysteresis"] },
          { cells: ["Examples", "Bismuth, copper, water, superconductors", "Aluminium, sodium, oxygen", "Iron, cobalt, nickel"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A material is weakly attracted by a magnet, and its susceptibility is \\(4 \\times 10^{-4}\\) at 300 K. Which class is it, and what is its susceptibility at 600 K?",
        steps: [
          "Weak attraction and a small positive χ: paramagnetic.",
          "Curie's law, \\(\\chi \\propto 1/T\\): doubling T halves χ.",
        ],
        answer: "Paramagnetic; \\(2 \\times 10^{-4}\\)",
      },
      practiceSet: [
        { prompt: "What is the susceptibility of a perfect diamagnet?", answer: "−1 (a superconductor)" },
        { prompt: "A ferromagnet is heated above its Curie temperature. What does it become?", answer: "Paramagnetic" },
        { prompt: "Below the Curie temperature, how strongly is a single domain of a ferromagnet magnetised?", answer: "To saturation" },
        { prompt: "A graph of M against H is a straight line through the origin with a negative slope. Which class of material?", answer: "Diamagnetic" },
      ],
      pyqExampleId: "00682d45-20b9-4dc9-87ce-e341a595c906", // 8 Apr 2024: which statements about paramagnets are true
      traps: [
        {
          title: "Calling a strongly attracted material paramagnetic",
          body: "Paramagnets are attracted only weakly. Strong attraction is the mark of a ferromagnet.",
        },
        {
          title: "Getting the direction of drift backwards",
          body: "A paramagnet moves from a weak field towards a strong one. A diamagnet moves the other way, from strong to weak.",
        },
        {
          title: "Letting diamagnetism depend on temperature",
          body: "Diamagnetism comes from moments induced in the electron orbits, not from aligning permanent moments, so heating does not change it. Only paramagnets and ferromagnets above the Curie point follow a temperature law.",
        },
      ],
    },

    // C3 — hysteresis and choice of material
    {
      kind: "reference" as const,
      slug: "jpmm-hysteresis",
      name: "Hysteresis and choosing a magnetic material",
      intuition:
        "Take a ferromagnet round a cycle of H and its B lags behind, tracing a loop. When H is brought back to zero some magnetism stays: that is the retentivity. A reverse H is needed to remove it: that is the coercivity. An electromagnet must switch on and off with its current, so it wants a material that keeps little and lets go easily. A permanent magnet wants the opposite.",
      definition:
        "- Retentivity (remanence): the B left when H returns to zero, where the loop cuts the B-axis.\n" +
        "- Coercivity: the reverse H needed to bring B to zero, where the loop cuts the H-axis.\n" +
        "- The area of the loop is the energy lost as heat in each cycle.\n" +
        "- Electromagnet and transformer cores: soft iron, with high permeability, low retentivity and low coercivity.\n" +
        "- Permanent magnets: steel or alnico, with high retentivity and high coercivity.\n" +
        "- To demagnetise a magnet inside a solenoid, the solenoid's H must reach the coercivity: \\(H = ni\\), with \\(n = N/L\\).",
      table: {
        columns: ["Use", "Material", "Retentivity", "Coercivity", "Hysteresis loop"],
        rows: [
          { cells: ["Electromagnet core", "Soft iron", "Low", "Low", "Narrow, small area"] },
          { cells: ["Transformer core", "Soft iron, laminated", "Low", "Low", "Narrow, so little energy is lost each cycle"] },
          { cells: ["Permanent magnet", "Steel, alnico, cobalt steel", "High", "High", "Wide, large area"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A magnet has a coercivity of \\(4.8 \\times 10^{3}\\ A\\,m^{-1}\\). It is placed inside a solenoid 20 cm long with 120 turns. What current must flow to demagnetise it?",
        steps: [
          "\\(n = \\dfrac{N}{L} = \\dfrac{120}{0.20} = 600\\ m^{-1}\\).",
          "\\(i = \\dfrac{H}{n} = \\dfrac{4.8 \\times 10^{3}}{600} = 8\\ A\\).",
        ],
        answer: "8 A",
      },
      practiceSet: [
        { prompt: "A solenoid with 1000 turns per metre must demagnetise a magnet of coercivity \\(2 \\times 10^{3}\\ A\\,m^{-1}\\). The current needed?", answer: "2 A" },
        { prompt: "Which two properties should a material for a permanent magnet have?", answer: "High retentivity and high coercivity" },
        { prompt: "Where does a hysteresis loop cut the H-axis, and what is that value called?", answer: "Where B = 0; it is the coercivity" },
        { prompt: "Why does a transformer core use a material with a narrow hysteresis loop?", answer: "The loop's area is the energy lost each cycle, so a narrow loop wastes little" },
      ],
      pyqExampleId: "d210de41-5f38-4753-aeb4-0d10439d11cb", // 8 Apr 2024: current in a solenoid to reach the coercivity
      traps: [
        {
          title: "Swapping retentivity and coercivity",
          body: "Retentivity is a value of B, read where the loop cuts the B-axis. Coercivity is a value of H, read where it cuts the H-axis.",
        },
        {
          title: "Wanting a large retentivity in an electromagnet",
          body: "An electromagnet must lose its magnetism when the current stops. Soft iron is chosen for its high permeability and its low retentivity and coercivity.",
        },
      ],
    },
  ],
};
