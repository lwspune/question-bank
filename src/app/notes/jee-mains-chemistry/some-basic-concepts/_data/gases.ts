import type { SubtopicNote } from "@/app/notes/_types";

export const GASES_SBC_NOTE: SubtopicNote = {
  subtopicName: "Gas Laws and Gas Volumes",
  title: "Gas Laws and Gas Volumes",
  oneLineDefinition:
    "PV = nRT and its special cases, gas volumes in reactions, and Dalton's law of partial pressures.",
  whyItMatters:
    "Thirty PYQs, twenty-one of them numerical and two from 2026. Sixteen use the ideal gas equation or one of its special cases, a few of them on real gases and molecular speeds. Seven turn a reaction into a volume of gas, and seven split a total pressure into partial pressures. Units decide most of the wrong answers here.",
  concepts: [
    // C1 — ideal gas equation
    {
      kind: "formula" as const,
      slug: "jcsbc-gas-equation",
      name: "The ideal gas equation and its special cases",
      intuition:
        "\\(PV=nRT\\) contains every gas law. Hold two of \\(P\\), \\(V\\), \\(T\\) and \\(n\\) fixed and the other two are in direct or inverse proportion. Put \\(n=\\frac{m}{M}\\) and it gives the molar mass from a mass or a density.",
      definition:
        "- \\(PV=nRT\\), with \\(R=0.0821\\) L atm K\\(^{-1}\\) mol\\(^{-1}\\) \\(=0.083\\) L bar K\\(^{-1}\\) mol\\(^{-1}\\) \\(=8.314\\) J K\\(^{-1}\\) mol\\(^{-1}\\).\n" +
        "- Units: \\(T\\) in kelvin; 1 atm \\(=760\\) torr \\(=760\\) mmHg; 1 bar \\(=10^{5}\\) Pa; 1 dm\\(^3=1\\) L.\n" +
        "- Boyle: \\(P_1V_1=P_2V_2\\). Charles: \\(\\frac{V_1}{T_1}=\\frac{V_2}{T_2}\\). A rigid tank: \\(\\frac{P_1}{T_1}=\\frac{P_2}{T_2}\\).\n" +
        "- \\(M=\\frac{dRT}{P}\\). At fixed \\(T\\), a plot of \\(P\\) against \\(d\\) is a straight line through the origin, and \\(PV\\) against \\(P\\) is flat.\n" +
        "- Real gas: \\(Z=\\frac{PV}{nRT}\\); at high pressure \\(Z=1+\\frac{Pb}{RT}\\). Units: \\(a\\) in atm dm\\(^6\\) mol\\(^{-2}\\), \\(b\\) in dm\\(^3\\) mol\\(^{-1}\\).\n" +
        "- Speeds: \\(u_{rms}=\\sqrt{\\frac{3RT}{M}}\\), \\(u_{mp}=\\sqrt{\\frac{2RT}{M}}\\), \\(u_{avg}=\\sqrt{\\frac{8RT}{\\pi M}}\\).",
      formula: {
        label: "Ideal gas equation",
        latex: "PV=nRT=\\frac{m}{M}RT\\quad\\Rightarrow\\quad M=\\frac{dRT}{P}",
      },
      authoredExample: {
        prompt: "\\(1.6\\) g of a gas fills a \\(1.0\\) L flask at \\(1.23\\) atm and 300 K. Find its molar mass (\\(R=0.082\\) L atm K\\(^{-1}\\) mol\\(^{-1}\\)).",
        steps: [
          "\\(n=\\frac{PV}{RT}=\\frac{1.23\\times1.0}{0.082\\times300}=\\frac{1.23}{24.6}=0.05\\) mol.",
          "\\(M=\\frac{1.6}{0.05}=32\\) g mol\\(^{-1}\\).",
        ],
        answer: "\\(32\\) g mol\\(^{-1}\\) (it could be \\(\\mathrm{O_2}\\)).",
      },
      selfCheckExample: {
        prompt: "A gas at 750 mmHg is compressed at constant temperature until its volume falls by \\(25\\%\\). Find the new pressure.",
        steps: [
          "\\(V_2=0.75\\,V_1\\).",
          "\\(P_2=\\frac{P_1V_1}{V_2}=\\frac{750}{0.75}=1000\\) mmHg.",
        ],
        answer: "\\(1000\\) mmHg.",
      },
      practiceSet: [
        { prompt: "A rigid tank at 2 atm and 300 K is heated to 450 K. Pressure?", answer: "3 atm" },
        { prompt: "27 °C in kelvin?", answer: "300 K" },
        { prompt: "\\(u_{rms}:u_{mp}\\) for any gas?", answer: "\\(\\sqrt3:\\sqrt2\\approx1.22:1\\)" },
        { prompt: "Unit of \\(b\\) in the van der Waals equation?", answer: "dm\\(^3\\) mol\\(^{-1}\\)" },
      ],
      pyqExampleId: "fecfce5b-df0d-417e-85bb-161ae2292bba", // 26 June 2022 — molar mass of a gas weighed in a calibrated vessel
      traps: [
        {
          title: "Celsius in the gas equation",
          body: "Every \\(T\\) in \\(PV=nRT\\) and in the gas laws is in kelvin. Using 27 for 27 °C instead of 300 changes the answer by a factor of about eleven.",
        },
        {
          title: "Match R to the units",
          body: "0.082 goes with atm and litres, 0.083 with bar and litres, 8.314 with pascals and cubic metres. Mixing them is off by a factor of 1000 or more.",
        },
      ],
    },

    // C2 — gas volumes in reactions
    {
      kind: "formula" as const,
      slug: "jcsbc-gas-reactions",
      name: "Gas volumes in reactions",
      intuition:
        "At one temperature and pressure, equal volumes hold equal moles. So the coefficients of a gas reaction are also its volume ratios, and the moles of a metal turn straight into litres of hydrogen.",
      definition:
        "- Gay-Lussac: gases react in volumes in the ratio of their coefficients, measured at the same \\(T\\) and \\(P\\).\n" +
        "- \\(\\mathrm{Mg+2HCl\\rightarrow MgCl_2+H_2}\\): 1 mol of \\(\\mathrm{H_2}\\) per mol of Mg. \\(\\mathrm{2Al+6HCl\\rightarrow2AlCl_3+3H_2}\\): \\(1.5\\) mol of \\(\\mathrm{H_2}\\) per mol of Al.\n" +
        "- \\(V=n\\times V_m\\), with \\(V_m\\) as the stem states: 22.4 or 22.7 L.\n" +
        "- Fixed volume and temperature: pressures follow the moles. For \\(\\mathrm{A(g)\\rightarrow2B(g)+\\tfrac12C(g)}\\), a fraction \\(\\alpha\\) reacted gives \\(P=P_0\\left(1+\\tfrac32\\alpha\\right)\\).",
      formula: {
        label: "Volume from moles",
        latex: "V_{\\text{gas}}=n\\,V_m,\\qquad\\frac{V_A}{V_B}=\\frac{\\nu_A}{\\nu_B}",
      },
      authoredExample: {
        prompt: "What volume of \\(\\mathrm{H_2}\\) at STP (22.4 L mol\\(^{-1}\\)) forms when \\(5.4\\) g of Al reacts with excess HCl?",
        steps: [
          "Al: \\(\\frac{5.4}{27}=0.2\\) mol.",
          "\\(\\mathrm{H_2}=0.2\\times\\frac{3}{2}=0.3\\) mol.",
          "\\(V=0.3\\times22.4=6.72\\) L.",
        ],
        answer: "\\(6.72\\) L.",
      },
      selfCheckExample: {
        prompt: "30 L of \\(\\mathrm{H_2}\\) and 20 L of \\(\\mathrm{N_2}\\) are mixed, and 12 L of \\(\\mathrm{NH_3}\\) forms (all at one \\(T\\) and \\(P\\)). What volumes of \\(\\mathrm{N_2}\\) and \\(\\mathrm{H_2}\\) are left?",
        steps: [
          "\\(\\mathrm{N_2+3H_2\\rightarrow2NH_3}\\): 12 L of \\(\\mathrm{NH_3}\\) uses 6 L of \\(\\mathrm{N_2}\\) and 18 L of \\(\\mathrm{H_2}\\).",
          "Left: \\(\\mathrm{N_2}=20-6=14\\) L; \\(\\mathrm{H_2}=30-18=12\\) L.",
        ],
        answer: "14 L of \\(\\mathrm{N_2}\\) and 12 L of \\(\\mathrm{H_2}\\).",
      },
      practiceSet: [
        { prompt: "Litres of \\(\\mathrm{H_2}\\) (22.4 L mol\\(^{-1}\\)) from \\(0.5\\) mol of Zn?", answer: "\\(11.2\\) L" },
        { prompt: "Volume of \\(\\mathrm{O_2}\\) to burn 10 mL of \\(\\mathrm{CH_4}\\)?", answer: "20 mL" },
        { prompt: "Volume of \\(\\mathrm{NH_3}\\) from 3 L of \\(\\mathrm{H_2}\\), with excess \\(\\mathrm{N_2}\\)?", answer: "2 L" },
        { prompt: "Moles of \\(\\mathrm{H_2}\\) from 1 mol of Al and excess acid?", answer: "\\(1.5\\)" },
      ],
      pyqExampleId: "772d33da-1d43-4311-b065-736f0b8fd0e6", // 31 Jan 2023 — hydrogen from zinc at 22.7 L per mole
      traps: [
        {
          title: "Only gases count",
          body: "Coefficients are volume ratios only for gases at one temperature and pressure. A solid, or water that has condensed, adds no gas volume.",
        },
      ],
    },

    // C3 — Dalton's law
    {
      kind: "formula" as const,
      slug: "jcsbc-dalton",
      name: "Partial pressures and gas mixtures",
      intuition:
        "Each gas in a mixture pushes as if it were alone in the vessel. Its share of the total pressure is its share of the moles, so change masses to moles before you split the pressure.",
      definition:
        "- \\(p_i=x_iP\\), with \\(x_i=\\frac{n_i}{\\sum n}\\); and \\(P=\\sum p_i\\).\n" +
        "- From a mass percentage: take 100 g, convert each gas to moles, then find \\(x\\).\n" +
        "- Bulbs joined at one temperature: \\(P=\\frac{\\sum P_iV_i}{\\sum V_i}\\).\n" +
        "- Moist gas: only the dry gas obeys Boyle's law. While liquid water remains, the water vapour pressure stays the same.",
      formula: {
        label: "Dalton's law",
        latex: "p_i=x_iP=\\frac{n_i}{n_{\\text{total}}}\\,P",
      },
      authoredExample: {
        prompt: "A mixture of \\(16\\) g of \\(\\mathrm{O_2}\\) and \\(7\\) g of \\(\\mathrm{N_2}\\) has a total pressure of \\(1.5\\) atm. Find the partial pressure of \\(\\mathrm{O_2}\\).",
        steps: [
          "\\(\\mathrm{O_2}\\): \\(\\frac{16}{32}=0.5\\) mol. \\(\\mathrm{N_2}\\): \\(\\frac{7}{28}=0.25\\) mol.",
          "\\(x(\\mathrm{O_2})=\\frac{0.5}{0.75}=\\frac{2}{3}\\).",
          "\\(p(\\mathrm{O_2})=\\frac{2}{3}\\times1.5=1.0\\) atm.",
        ],
        answer: "\\(1.0\\) atm.",
      },
      selfCheckExample: {
        prompt: "A gas over water is at \\(2.0\\) atm and 300 K; the vapour pressure of water is \\(0.05\\) atm. The volume is tripled at the same temperature, with liquid water still present. Find the new pressure.",
        steps: [
          "Dry gas: \\(2.0-0.05=1.95\\) atm, which falls to \\(\\frac{1.95}{3}=0.65\\) atm.",
          "Add the unchanged vapour pressure: \\(0.65+0.05=0.70\\) atm.",
        ],
        answer: "\\(0.70\\) atm.",
      },
      practiceSet: [
        { prompt: "Mole fraction \\(0.2\\), total 5 bar. Partial pressure?", answer: "1 bar" },
        { prompt: "A 1 L bulb at 2 atm opened into an empty 1 L bulb. Final pressure?", answer: "1 atm" },
        { prompt: "4 g of He and 4 g of \\(\\mathrm{H_2}\\). Mole fraction of He?", answer: "\\(\\frac13\\)" },
        { prompt: "Sum of all the mole fractions in a mixture?", answer: "1" },
      ],
      pyqExampleId: "793f4bc7-5e26-48a0-9dff-48394364ce69", // 31 Jan 2023 — partial pressure of X from the masses of two gases
      traps: [
        {
          title: "Mass fraction is not mole fraction",
          body: "A mixture that is \\(40\\%\\) hydrogen by mass is over \\(90\\%\\) hydrogen by moles, because \\(\\mathrm{H_2}\\) is so light. Convert to moles first.",
        },
        {
          title: "Moist gas: only the dry part changes",
          body: "When the volume changes, the water vapour pressure stays fixed as long as liquid remains. Apply Boyle's law to the dry gas, then add the vapour pressure back.",
        },
      ],
    },
  ],
};
