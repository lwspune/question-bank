import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MM_CLASSES_NOTE: SubtopicNote = {
  subtopicName: "Diamagnetism, Paramagnetism and Ferromagnetism",
  title: "Diamagnetic, Paramagnetic and Ferromagnetic Materials",
  oneLineDefinition:
    "The three kinds of magnetic material, how to tell them apart, Curie's law for paramagnetic materials, domain theory of ferromagnetism and the Curie temperature.",
  whyItMatters:
    "16 questions. Ten were set in board papers: distinguish paramagnetic from ferromagnetic substances (2016) and diamagnetic from paramagnetic (2024 and 2025), explain ferromagnetism by domain theory (2025), define the Curie temperature (2024) and say what happens above it (2019 and 2025), three Curie's law sums (2016, 2019 and 2026), and an MCQ on water placed between two magnet poles (2017). The textbook adds Curie's law, a paramagnetic gas that cannot reach saturation, and the atoms and moment of one iron domain.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpmm-three-classes",
      name: "The three classes compared",
      intuition:
        "Every material answers a magnetic field in one of three ways. A diamagnetic material has no atomic magnets of its own, and the field makes it push back a little. A paramagnetic material has atomic magnets pointing every which way, and the field lines a few of them up. A ferromagnetic material has atomic magnets already locked together in domains, so a field lines up huge blocks of them at once.",
      definition:
        "- **Diamagnetic:** atoms with all electrons paired have no net moment. A field induces currents in the paired orbits (Lenz's law) that give a small moment opposite to the field. A diamagnetic liquid in a U tube is pushed into the arm away from the field; a freely hung rod sets perpendicular to the field. Diamagnetism is present in all materials but is masked in others. A superconductor (\\(\\chi = -1\\)) expels the field completely: the **Meissner effect**.\n" +
        "- **Paramagnetic:** atoms with unpaired electrons have permanent moments, randomly oriented by thermal agitation. A strong field at low temperature aligns most of them. A paramagnetic liquid rises in the arm of a U tube near the magnet.\n" +
        "- **Ferromagnetic:** atoms with permanent moments locked parallel in domains. They are strongly attracted and can become permanent magnets.\n" +
        "- The board asks 'distinguish between' for two or three marks: give matching points from both sides.",
      table: {
        columns: ["Point", "Diamagnetic", "Paramagnetic", "Ferromagnetic"],
        rows: [
          {
            cells: ["Moment of each atom", "None of its own; induced opposite to the field", "Permanent, but randomly oriented", "Permanent, locked parallel inside domains"],
          },
          {
            cells: ["Near a magnet", "Feebly repelled", "Feebly attracted", "Strongly attracted"],
            pyqExampleId: "9c80a83d-bf51-464b-ae8d-36cf9b29a494",
            noteAmber: "Board 2025 and 2024 asked you to distinguish diamagnetic from paramagnetic substances.",
          },
          {
            cells: ["In a non-uniform field", "Moves from the stronger to the weaker part", "Moves from the weaker to the stronger part", "Moves from the weaker to the stronger part"],
            pyqExampleId: "1ba6669f-3009-4389-b600-ed2b24209ea9",
            noteAmber: "Board 2017 MCQ: water in a watch glass on two unlike poles is pushed out of the strong field at the middle, so it shows a depression in the middle.",
          },
          {
            cells: ["Susceptibility χ", "Small and negative, about −10⁻⁵ to −10⁻³", "Small and positive, up to about 10⁻³", "Large and positive, about 10² to 10³ (over 1000 for soft iron)"],
            pyqExampleId: "a82aa3da-4802-4e94-8168-ad414af9aea8",
            noteAmber: "Board 2016 asked you to distinguish paramagnetic from ferromagnetic substances.",
          },
          { cells: ["Relative permeability μr", "Slightly less than 1", "Slightly more than 1", "Very much more than 1"] },
          { cells: ["Field lines inside", "Pushed out; the field inside is reduced", "Drawn in; the lines come closer", "Crowd in strongly"] },
          { cells: ["Effect of temperature", "χ does not depend on temperature", "χ falls as temperature rises (Curie's law)", "Becomes paramagnetic above the Curie temperature"] },
          { cells: ["Examples", "Copper, gold, bismuth, lead, water, glass", "Aluminium, magnesium, lithium, platinum, oxygen", "Iron, cobalt, nickel, gadolinium"] },
        ],
      },
      selfCheckExample: {
        prompt: "Three materials have relative permeabilities 0.99998, 1.0003 and 800. Name the class of each.",
        steps: [
          "\\(\\chi = \\mu_r - 1\\): \\(-2 \\times 10^{-5}\\), \\(3 \\times 10^{-4}\\) and 799.",
          "Small negative: diamagnetic. Small positive: paramagnetic. Large positive: ferromagnetic.",
        ],
        answer: "Diamagnetic, paramagnetic, ferromagnetic",
      },
      practiceSet: [
        { prompt: "A substance has susceptibility \\(-2 \\times 10^{-5}\\). What kind of material is it?", answer: "Diamagnetic" },
        { prompt: "A paramagnetic liquid fills a U tube and a magnet is brought near one arm. What happens?", answer: "The liquid rises in the arm near the magnet" },
        { prompt: "How does a freely suspended rod of a diamagnetic material set itself in a uniform field?", answer: "Perpendicular to the field" },
        { prompt: "What is the Meissner effect?", answer: "The complete expulsion of field lines from a superconductor, which is a perfect diamagnet with \\(\\chi = -1\\)" },
      ],
      traps: [
        {
          title: "Distinguishing with one side only",
          body: "Each point must name both materials: 'diamagnetic: repelled; paramagnetic: attracted'. A point written for one side earns nothing.",
        },
        {
          title: "Calling a paramagnetic material strongly attracted",
          body: "Paramagnetic materials are only feebly attracted. Strong attraction belongs to ferromagnetic materials.",
        },
        {
          title: "Giving χ as zero for a diamagnetic material",
          body: "Diamagnetic χ is small but negative, so \\(\\mu_r\\) is just below 1. Only a superconductor reaches \\(\\chi = -1\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmm-curie-law",
      name: "Curie's law for paramagnetic materials",
      intuition:
        "Two things fight over the atomic magnets of a paramagnetic material. The field tries to line them up; heat tries to jumble them. A stronger field wins more of the fight, and a hotter material wins less. So magnetization grows with the field and falls as the absolute temperature rises.",
      definition:
        "- **Curie's law** (Pierre Curie, 1895): the magnetization of a paramagnetic material is directly proportional to the applied field B and inversely proportional to its absolute temperature T: \\(M = C\\dfrac{B}{T}\\), where C is the Curie constant.\n" +
        "- With \\(B = \\mu_0 H\\) and \\(\\chi = M/H\\): \\(\\chi = \\mu_r - 1 = C\\dfrac{\\mu_0}{T}\\), so \\(\\chi \\propto \\dfrac{1}{T}\\).\n" +
        "- For one material at two temperatures: \\(\\chi_1 T_1 = \\chi_2 T_2\\). T is in kelvin.\n" +
        "- **Saturation** means every atomic moment is aligned: \\(M_{max} = n \\times m\\) (atoms per m³ times the moment of each). It is reached only when the magnetic energy \\(mB\\) is not swamped by the thermal energy \\(\\tfrac{3}{2}k_BT\\).",
      formula: {
        label: "Curie's law",
        latex: "M = C\\frac{B}{T}, \\qquad \\chi = C\\frac{\\mu_0}{T}, \\qquad \\chi_1 T_1 = \\chi_2 T_2",
        symbols: [
          { symbol: "\\(C\\)", meaning: "Curie constant of the material" },
          { symbol: "\\(T\\)", meaning: "absolute temperature, in kelvin" },
        ],
      },
      authoredExample: {
        prompt:
          "The susceptibility of platinum is \\(2.9 \\times 10^{-4}\\) at 27 °C. Find its susceptibility at 327 °C.",
        steps: [
          "Given: \\(\\chi_1 = 2.9 \\times 10^{-4}\\), \\(T_1 = 27 + 273 = 300\\) K, \\(T_2 = 327 + 273 = 600\\) K.",
          "Formula (Curie's law): \\(\\chi_1 T_1 = \\chi_2 T_2\\).",
          "Substitution: \\(\\chi_2 = \\chi_1 \\dfrac{T_1}{T_2} = 2.9 \\times 10^{-4} \\times \\dfrac{300}{600}\\).",
          "\\(\\chi_2 = 1.45 \\times 10^{-4}\\), with no unit.",
        ],
        answer: "\\(1.45 \\times 10^{-4}\\)",
      },
      selfCheckExample: {
        prompt: "A paramagnetic salt is at 400 K. To what temperature must it be cooled for its susceptibility to double?",
        steps: ["\\(\\chi \\propto 1/T\\), so doubling \\(\\chi\\) halves T.", "\\(T_2 = 400/2 = 200\\) K, that is \\(-73\\) °C."],
        answer: "200 K (−73 °C)",
      },
      practiceSet: [
        { prompt: "To which class of materials does Curie's law apply?", answer: "Paramagnetic materials" },
        { prompt: "Name two changes that increase the magnetization of a paramagnetic sample.", answer: "A stronger applied field and a lower temperature" },
        { prompt: "Why must the temperature be changed to kelvin before using Curie's law?", answer: "Susceptibility is inversely proportional to the ABSOLUTE temperature" },
        { prompt: "A gas has \\(10^{26}\\) atoms per m³, each of moment \\(2 \\times 10^{-23}\\) A m². What is its largest possible magnetization?", answer: "\\(2 \\times 10^{3}\\) A m⁻¹" },
      ],
      pyqExampleId: "72919edc-07b7-4c52-875e-988043b048e7",
      traps: [
        {
          title: "Using degrees Celsius",
          body: "Curie's law uses absolute temperature. Change °C to K before substituting, and change back only if the question asks for °C.",
        },
        {
          title: "Getting the direction wrong",
          body: "Heating lowers the susceptibility and cooling raises it. Check that your answer moves the right way before you write it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmm-domains",
      name: "Ferromagnetism and domain theory",
      intuition:
        "In iron, each atom's magnet is held parallel to its neighbours by a strong force called exchange coupling. Small regions form in which every atom points the same way: domains. An unmagnetised bar is a patchwork of domains pointing in all directions. A field swings them into line, and they do not all swing back when the field is removed.",
      definition:
        "Board answer on domain theory, one step a line:\n" +
        "- Atoms of a ferromagnetic material have permanent moments. A strong **exchange coupling** (exchange interaction) acts between neighbouring moments.\n" +
        "- It forms small regions in which all moments point the same way. Such a region is a **domain**; its common direction is the **domain axis**; the boundary between domains is a **domain wall**.\n" +
        "- A domain is \\(10^{-6}\\) to \\(10^{-4}\\) m across and holds about \\(10^{10}\\) to \\(10^{17}\\) atoms.\n" +
        "- Unmagnetised: domain axes point at random, so the net moment is zero though each domain is magnetised (draw Fig. 11.9 (a)).\n" +
        "- In a field: domains turn towards the field (flipping or domain rotation); more align as the field grows. A strong field makes all domains coalesce into one giant domain (Fig. 11.9 (b)).\n" +
        "- Field removed: the domain boundaries do not go back, so magnetization is retained. Such materials make permanent magnets.\n" +
        "- Largest moment of a domain of N atoms each of moment m: \\(m_{max} = Nm\\); its magnetization is \\(m_{max}/V\\).",
      formula: {
        label: "Largest magnetization of a domain",
        latex: "m_{max} = N\\,m, \\qquad M = \\frac{m_{max}}{V}",
        symbols: [
          { symbol: "\\(N\\)", meaning: "number of atoms in the domain" },
          { symbol: "\\(m\\)", meaning: "magnetic moment of one atom" },
          { symbol: "\\(V\\)", meaning: "volume of the domain" },
        ],
      },
      authoredExample: {
        prompt:
          "A cubic domain of side 2 µm contains \\(8.5 \\times 10^{28}\\) atoms per m³, each of moment \\(9.27 \\times 10^{-24}\\) A m². Find the number of atoms, the largest possible moment and the magnetization of the domain.",
        steps: [
          "Given: side \\(2 \\times 10^{-6}\\) m, so \\(V = (2 \\times 10^{-6})^3 = 8 \\times 10^{-18}\\) m³.",
          "\\(N = 8.5 \\times 10^{28} \\times 8 \\times 10^{-18} = 6.8 \\times 10^{11}\\) atoms.",
          "\\(m_{max} = Nm = 6.8 \\times 10^{11} \\times 9.27 \\times 10^{-24} = 6.30 \\times 10^{-12}\\) A m².",
          "\\(M = \\dfrac{m_{max}}{V} = \\dfrac{6.30 \\times 10^{-12}}{8 \\times 10^{-18}} = 7.88 \\times 10^{5}\\) A m⁻¹.",
        ],
        answer: "\\(6.8 \\times 10^{11}\\) atoms; \\(6.30 \\times 10^{-12}\\) A m²; \\(7.88 \\times 10^{5}\\) A m⁻¹",
      },
      selfCheckExample: {
        prompt: "Each domain of an unmagnetised iron bar is fully magnetised. Why does the bar as a whole show no magnetic moment?",
        steps: ["The domain axes point in random directions.", "Their moments cancel on adding, so the net moment of the bar is zero."],
        answer: "The randomly oriented domain moments cancel",
      },
      practiceSet: [
        { prompt: "Name the interaction that holds the atomic moments of a domain parallel.", answer: "Exchange coupling (exchange interaction)" },
        { prompt: "What is a domain wall?", answer: "The boundary between neighbouring domains whose moments point in different directions" },
        { prompt: "Give the range of size of a domain.", answer: "\\(10^{-6}\\) m to \\(10^{-4}\\) m" },
      ],
      pyqExampleId: "bcb7dd6a-ffd8-4996-b015-9edc3b7dd36e",
      traps: [
        {
          title: "No diagram in a domain answer",
          body: "Domain theory is explained with the two sketches: random domains before, aligned domains in the field. An answer without them is incomplete.",
        },
        {
          title: "Saying an unmagnetised bar has no magnetised regions",
          body: "Every domain is magnetised. The bar shows no net moment only because the domains point in random directions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmm-curie-temperature",
      name: "Effect of temperature: the Curie temperature",
      intuition:
        "Heat shakes the atoms and loosens the exchange coupling that holds a domain together. At one definite temperature the domains fall apart altogether, and the material is left with atomic magnets that point at random: it has become paramagnetic.",
      definition:
        "- As a ferromagnetic material is heated, the exchange coupling weakens and the domain structure distorts.\n" +
        "- At a definite temperature the domain structure collapses and the material behaves as a **paramagnetic** material.\n" +
        "- **Curie temperature** \\(T_C\\): the temperature at which a ferromagnetic material changes into a paramagnetic one.\n" +
        "- Above \\(T_C\\): \\(\\chi = \\dfrac{C}{T - T_C}\\) for \\(T > T_C\\), so \\(\\chi\\) falls as T rises further.\n" +
        "- Curie temperatures (textbook Table 11.1): cobalt 1394 K, iron 1043 K, Fe₂O₃ 893 K, nickel 631 K, gadolinium 317 K.",
      formula: {
        label: "Above the Curie temperature",
        latex: "\\chi = \\frac{C}{T - T_C} \\quad (T > T_C)",
        symbols: [{ symbol: "\\(T_C\\)", meaning: "Curie temperature of the material, in kelvin" }],
      },
      authoredExample: {
        prompt:
          "Nickel has a Curie temperature of 631 K. Above it, its susceptibility is \\(\\chi_1\\) at 731 K. At what temperature is its susceptibility \\(\\chi_1/2\\)?",
        steps: [
          "Given: \\(T_C = 631\\) K, \\(T_1 = 731\\) K, \\(\\chi_2 = \\chi_1/2\\).",
          "Formula: \\(\\chi = \\dfrac{C}{T - T_C}\\), so \\(\\chi(T - T_C)\\) is constant.",
          "\\(\\chi_1(731 - 631) = \\dfrac{\\chi_1}{2}(T_2 - 631)\\), so \\(T_2 - 631 = 200\\).",
          "\\(T_2 = 831\\) K.",
        ],
        answer: "831 K",
      },
      selfCheckExample: {
        prompt: "Gadolinium has a Curie temperature of 317 K. Is it ferromagnetic at 300 K? What is it at 330 K?",
        steps: ["300 K is below 317 K, so the domains survive: ferromagnetic.", "330 K is above 317 K, so the domains have collapsed: paramagnetic."],
        answer: "Ferromagnetic at 300 K; paramagnetic at 330 K",
      },
      practiceSet: [
        { prompt: "What is the Curie temperature of iron?", answer: "1043 K" },
        { prompt: "Which material in the textbook's table has the highest Curie temperature?", answer: "Cobalt, 1394 K" },
        { prompt: "Define the Curie temperature.", answer: "The temperature at which a ferromagnetic material changes into a paramagnetic material" },
      ],
      pyqExampleId: "3ca160de-6737-45ec-9081-804df924e91f",
      traps: [
        {
          title: "Saying it stops being magnetic at all",
          body: "Above the Curie temperature a ferromagnetic material becomes PARAMAGNETIC, not non-magnetic. Name the class it turns into.",
        },
        {
          title: "Using Curie's law above the Curie temperature",
          body: "Above \\(T_C\\) the relation is \\(\\chi = C/(T - T_C)\\), not \\(C/T\\). Subtract the Curie temperature first.",
        },
      ],
    },
  ],
};
