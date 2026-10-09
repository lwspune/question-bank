import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_ELE_POWER_NOTE: SubtopicNote = {
  subtopicName: "Electrical Power and Energy",
  title: "Electrical Power, Energy and the Effects of a Current",
  oneLineDefinition:
    "Electrical power is the energy transferred each second, P = VI; over time it adds up to energy, often counted in kilowatt-hours.",
  whyItMatters:
    "The 2017 paper asked for the power in a resistor from its resistance and current, and the 2024 ministry paper ran the same formula backwards to find a resistance. The 2012 paper asked which effects of a current remain in a superconductor.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-ele-power-formulas",
      name: "Electrical power: P = VI = I²R = V²/R",
      intuition:
        "Each coulomb crossing a p.d. \\(V\\) hands over \\(V\\) joules, and \\(I\\) coulombs cross every second. So the energy per second is \\(V\\) times \\(I\\). Ohm's law then lets you swap \\(V\\) or \\(I\\) for whatever the question gives you.",
      definition:
        "**Power** is the rate of energy transfer, in **watts** (\\(1\\ \\text{W} = 1\\ \\text{J/s}\\)).\n" +
        "- For any component: \\(P = VI\\).\n" +
        "- For a resistor, using \\(V = IR\\): \\(P = I^2 R = V^2/R\\).\n" +
        "- Choose the form that uses what you are given: \\(I^2 R\\) when the current is known, \\(V^2/R\\) when the voltage is known.\n" +
        "- In a resistor all of this power becomes heat (**Joule heating**).",
      formula: {
        label: "Electrical power",
        latex: "P = VI = I^2 R = \\frac{V^2}{R}",
        symbols: [
          { symbol: "\\(P\\)", meaning: "power, in W" },
          { symbol: "\\(V\\)", meaning: "p.d. across the component, in V" },
          { symbol: "\\(I\\)", meaning: "current through it, in A" },
          { symbol: "\\(R\\)", meaning: "resistance, in Ω" },
        ],
      },
      authoredExample: {
        prompt: "A kettle rated 2.3 kW runs on a 230 V supply. Find the current it draws and its resistance.",
        steps: [
          "\\(I = P/V = 2300 / 230 = 10\\ \\text{A}\\).",
          "\\(R = V/I = 230 / 10 = 23\\ \\Omega\\).",
          "Check with \\(V^2/R\\): \\(230^2 / 23 = 52900/23 = 2300\\ \\text{W}\\).",
        ],
        answer: "10 A; 23 Ω",
      },
      selfCheckExample: {
        prompt: "A lamp is rated 60 W when connected to 240 V. What is its resistance when lit?",
        options: [
          "4.0 Ω",
          "0.25 Ω",
          "960 Ω",
          "\\(1.4 \\times 10^4\\ \\Omega\\)",
          "\\(1.0 \\times 10^{-3}\\ \\Omega\\)",
        ],
        steps: [
          "\\(R = V^2/P = 240^2 / 60 = 57600 / 60 = 960\\ \\Omega\\).",
          "A divides \\(V\\) by \\(P\\) and B divides \\(P\\) by \\(V\\): neither is a resistance. D multiplies \\(V\\) by \\(P\\). E is \\(P/V^2\\), the formula upside down.",
        ],
        answer: "(C) 960 Ω",
      },
      practiceSet: [
        { prompt: "A 10 Ω resistor carries 3.0 A. What power does it dissipate?", answer: "90 W", method: "\\(I^2 R = 9.0 \\times 10\\)" },
        { prompt: "The current through a fixed resistor doubles. By what factor does the power change?", answer: "4", method: "\\(P \\propto I^2\\)" },
        { prompt: "A 4.0 Ω resistor is connected across 12 V. What power does it dissipate?", answer: "36 W", method: "\\(V^2/R = 144/4.0\\)" },
      ],
      traps: [
        {
          title: "Doubling the current quadruples the power",
          body: "In a fixed resistor \\(P = I^2 R\\), so the power goes with the square of the current. Doubling the current multiplies the heating by 4, not 2. The options often include the result of forgetting the square.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ele-energy-kwh",
      name: "Electrical energy and the kilowatt-hour",
      intuition:
        "Power tells you how fast energy is used; leave the appliance on longer and the energy adds up. Joules are tiny for household use, so electricity bills count energy in kilowatt-hours: one kilowatt running for one hour.",
      definition:
        "- Energy transferred: \\(E = Pt = VIt\\). Since \\(Q = It\\), this is also \\(E = QV\\).\n" +
        "- The **kilowatt-hour** (kWh) is a unit of **energy**: \\(1\\ \\text{kWh} = 1000\\ \\text{W} \\times 3600\\ \\text{s} = 3.6 \\times 10^6\\ \\text{J}\\).\n" +
        "- To use kWh, put the power in **kilowatts** and the time in **hours**.\n" +
        "- Cost = energy in kWh × price per kWh.",
      formula: {
        label: "Electrical energy",
        latex: "E = P t = V I t \\qquad 1\\ \\text{kWh} = 3.6 \\times 10^6\\ \\text{J}",
        symbols: [
          { symbol: "\\(E\\)", meaning: "energy, in J (or kWh)" },
          { symbol: "\\(P\\)", meaning: "power, in W (or kW)" },
          { symbol: "\\(t\\)", meaning: "time, in s (or h)" },
        ],
      },
      authoredExample: {
        prompt:
          "A 2.0 kW heater runs for 3.0 hours. Find the energy used in kWh and in joules, and the cost at €0.25 per kWh.",
        steps: [
          "\\(E = Pt = 2.0\\ \\text{kW} \\times 3.0\\ \\text{h} = 6.0\\ \\text{kWh}\\).",
          "In joules: \\(6.0 \\times 3.6 \\times 10^6 = 2.16 \\times 10^7\\ \\text{J}\\).",
          "Cost: \\(6.0 \\times 0.25 = 1.50\\), so €1.50.",
        ],
        answer: "6.0 kWh \\(\\approx 2.2 \\times 10^7\\ \\text{J}\\); €1.50",
      },
      selfCheckExample: {
        prompt:
          "A 1500 W hair dryer is used for 20 minutes every day for 30 days. How much energy does it use in that time?",
        options: [
          "15 kWh",
          "900 kWh",
          "\\(1.5 \\times 10^4\\ \\text{kWh}\\)",
          "0.50 kWh",
          "\\(5.4 \\times 10^7\\ \\text{kWh}\\)",
        ],
        steps: [
          "Power in kW: 1.5 kW. Time in hours: \\(20\\ \\text{min} \\times 30 = 600\\ \\text{min} = 10\\ \\text{h}\\).",
          "\\(E = 1.5 \\times 10 = 15\\ \\text{kWh}\\).",
          "B leaves the time in minutes, C leaves the power in watts, D is one day only, and E is the value in joules wrongly labelled kWh.",
        ],
        answer: "(A) 15 kWh",
      },
      practiceSet: [
        { prompt: "How many joules are in 1 kWh?", answer: "\\(3.6 \\times 10^6\\ \\text{J}\\)", method: "\\(1000 \\times 3600\\)" },
        { prompt: "How long must a 100 W lamp be on to use 1 kWh?", answer: "10 hours", method: "\\(1\\ \\text{kWh} / 0.1\\ \\text{kW}\\)" },
        { prompt: "How much energy is transferred when 5.0 C of charge passes through a p.d. of 12 V?", answer: "60 J", method: "\\(E = QV\\)" },
      ],
      traps: [
        {
          title: "The kilowatt-hour is energy, not power",
          body: "A kWh is a kilowatt multiplied by an hour, so it measures energy, like the joule. Mixing watts with hours, or kilowatts with seconds, gives answers off by factors of 1000 or 3600.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ele-effects",
      name: "The three effects of an electric current",
      intuition:
        "A current can heat the conductor, make a magnetic field around it, and, in a liquid with ions, cause chemical change. These effects have different causes, so they do not always come together. The magnetic effect is the one that never goes away, because every moving charge makes a magnetic field.",
      definition:
        "- **Heating (thermal) effect**: moving charges collide with the ions of the conductor and give them energy. It needs resistance, so it vanishes in a superconductor.\n" +
        "- **Magnetic effect**: every current produces a magnetic field around it, whatever the conductor. It is present even with zero resistance; strong magnets (such as those in MRI scanners) use superconducting coils.\n" +
        "- **Chemical effect**: in an electrolyte the moving ions are discharged at the electrodes (electrolysis). A solid metal carries current by electrons only, so no chemical change happens in it.",
      table: {
        columns: ["Effect", "Cause", "Uses", "In a superconducting wire?"],
        rows: [
          { cells: ["Heating", "Charges colliding with the conductor's ions", "Kettles, toasters, fuses, filament lamps", "Absent (zero resistance)"] },
          { cells: ["Magnetic", "Any moving charge", "Electromagnets, motors, relays, MRI scanners", "Present"] },
          { cells: ["Chemical", "Ions discharged at electrodes", "Electrolysis, electroplating, charging batteries", "Absent (no ions move in a solid metal)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which effect is produced by every electric current, whatever it flows through?",
        options: [
          "A rise in temperature",
          "A chemical change at the electrodes",
          "Emission of light",
          "A fall in the resistance of the conductor",
          "A magnetic field around the current",
        ],
        steps: [
          "Any moving charge makes a magnetic field, so this is true in every case.",
          "Heating (A) needs resistance and disappears in a superconductor. Chemical change (B) needs an electrolyte. Light (C) needs a hot filament or a special device. D is not an effect of a current at all.",
        ],
        answer: "(E) A magnetic field around the current",
      },
      practiceSet: [
        { prompt: "Which effect of a current makes a fuse melt?", answer: "The heating effect", method: "Too much current heats the fuse wire past its melting point" },
        { prompt: "Which effect is used to coat a spoon with silver?", answer: "The chemical effect", method: "Electroplating is electrolysis" },
        { prompt: "A current flows in a superconducting coil. Does the coil get warm?", answer: "No", method: "Zero resistance means \\(I^2 R = 0\\)" },
      ],
      traps: [
        {
          title: "Zero resistance does not remove the magnetic effect",
          body: "A superconductor has no resistance, so it produces no heat. It still produces a magnetic field, because the field comes from the moving charge, not from the resistance. That is exactly why superconducting coils make the strongest electromagnets.",
        },
      ],
    },
  ],
};
