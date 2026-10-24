import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_EM_POWER_NOTE: SubtopicNote = {
  subtopicName: "Electric Power and Home Wiring",
  title: "Electric Power and Home Wiring",
  oneLineDefinition:
    "Electric power and the heating effect, the kilowatt-hour on the electricity bill, fuses, short circuits and the three wires of a house, and what a bulb does with energy.",
  whyItMatters:
    "Twelve CDS questions from 2018 (I) to 2025 (I), seven of them EASY. Five are short sums (power, units of energy, how many bulbs a fuse allows), four ask about fuses, short circuits and the wires of the mains, and three ask who found the heating effect, why a bulb holds argon, and which device does not turn electricity into light. The units sum for a 100 W bulb burning 10 hours a day has come twice.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsphem-power",
      name: "Electric power and the heating effect",
      intuition:
        "Power is the energy used each second. For an electric device it is the voltage times the current. Put Ohm's law into that and you get two more forms: one for when you know the current, one for when you know the voltage. A bulb's filament keeps (nearly) the same resistance, so if the voltage falls, the power falls with the square of the voltage. The heat a current makes in a wire was measured by James Prescott Joule.",
      definition:
        "The rules:\n" +
        "- \\(P = VI = I^{2}R = \\dfrac{V^{2}}{R}\\). One **watt** is one joule per second.\n" +
        "- A rating such as \"60 W, 220 V\" fixes the resistance: \\(R = \\dfrac{V^{2}}{P}\\).\n" +
        "- On another voltage \\(V'\\), with \\(R\\) fixed: \\(P' = P\\left(\\dfrac{V'}{V}\\right)^{2}\\). Half the voltage gives a **quarter** of the power.\n" +
        "- **Joule's law of heating**: \\(H = I^{2}Rt\\).\n" +
        "- Same **current** (series): the bigger resistance heats more. Same **voltage** (parallel): the smaller resistance heats more.\n" +
        "- A higher-wattage bulb on the same voltage has a **lower** resistance (a thicker filament).",
      formula: {
        label: "Electric power and Joule heating",
        latex: "P = VI = I^{2}R = \\dfrac{V^{2}}{R} \\qquad H = I^{2}Rt \\qquad P' = P\\left(\\dfrac{V'}{V}\\right)^{2}",
        symbols: [
          { symbol: "P", meaning: "power in watts" },
          { symbol: "H", meaning: "heat produced in time t, in joules" },
          { symbol: "P′, V′", meaning: "power at a voltage other than the rated one" },
        ],
      },
      authoredExample: {
        prompt:
          "An electric iron is rated 1000 W, 250 V. Find its resistance and the current it draws at the rated voltage. What power does it give on a 200 V supply?",
        steps: [
          "\\(R = \\dfrac{V^{2}}{P} = \\dfrac{250^{2}}{1000} = \\dfrac{62500}{1000} = 62.5\\) Ω.",
          "\\(I = \\dfrac{P}{V} = \\dfrac{1000}{250} = 4\\) A.",
          "On 200 V: \\(P' = \\dfrac{200^{2}}{62.5} = \\dfrac{40000}{62.5} = 640\\) W.",
          "Check: \\(1000 \\times (200/250)^{2} = 1000 \\times 0.64 = 640\\) W.",
        ],
        answer: "62.5 Ω and 4 A; 640 W on 200 V.",
      },
      selfCheckExample: {
        prompt: "A current of 2 A flows through a 10 Ω resistor for 1 minute. How much heat is produced?",
        steps: ["\\(H = I^{2}Rt = 2^{2} \\times 10 \\times 60 = 2400\\) J."],
        answer: "2400 J",
      },
      pyqExampleId: "8d49e60b-1bc1-4a58-8518-bb983123c1be",
      practiceSet: [
        { prompt: "A heater draws 4 A from a 220 V supply. What is its power?", answer: "880 W", method: "\\(P = VI\\)" },
        { prompt: "The current through a resistor is doubled. By what factor does the heat produced each second change?", answer: "It becomes 4 times", method: "\\(H \\propto I^{2}\\)" },
        { prompt: "Two bulbs are rated 100 W, 220 V and 25 W, 220 V. Which has the lower resistance?", answer: "The 100 W bulb", method: "\\(R = V^{2}/P\\)" },
        { prompt: "Which scientist's name is given to the law \\(H = I^{2}Rt\\)?", answer: "James Prescott Joule" },
      ],
      traps: [
        {
          title: "The resistance stays fixed, not the power",
          body: "A bulb's rating tells you its **resistance**. On a lower voltage, work out \\(V^{2}/R\\) again. At half the voltage the power is **one quarter**, not one half.",
        },
        {
          title: "More watts means less resistance",
          body: "On the same voltage, \\(R = V^{2}/P\\). So a **100 W** bulb has a **smaller** resistance than a 25 W bulb. Students often guess the opposite.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphem-energy",
      name: "Electrical energy and the unit on the bill",
      intuition:
        "Energy is power multiplied by time. The joule is far too small for a household, so the electricity board counts in kilowatt-hours, which the bill calls units. One unit is what a 1000 W device uses in one hour.",
      definition:
        "The rules:\n" +
        "- \\(E = Pt\\).\n" +
        "- **1 unit = 1 kilowatt-hour (kWh)** \\(= 1000\\ \\text{W} \\times 3600\\ \\text{s} = 3.6 \\times 10^{6}\\) J.\n" +
        "- Units used = power in **kilowatts** × time in **hours**. Change watts to kilowatts first (divide by 1000).\n" +
        "- For several days, find one day's units and multiply by the number of days.\n" +
        "- Bill = units × rate per unit.",
      formula: {
        label: "Electrical energy",
        latex: "E = Pt \\qquad 1\\ \\text{kWh} = 1000\\ \\text{W} \\times 3600\\ \\text{s} = 3.6 \\times 10^{6}\\ \\text{J}",
        symbols: [
          { symbol: "E", meaning: "energy used" },
          { symbol: "P", meaning: "power (in kW for units)" },
          { symbol: "t", meaning: "time (in hours for units)" },
        ],
      },
      authoredExample: {
        prompt:
          "A house runs a 1.5 kW geyser for 2 hours a day and four 40 W tube lights for 5 hours a day. How many units does it use in 30 days, and what is the bill at ₹6 per unit?",
        steps: [
          "Geyser: \\(1.5 \\times 2 = 3\\) kWh a day.",
          "Tube lights: \\(4 \\times 40 = 160\\) W = 0.16 kW; \\(0.16 \\times 5 = 0.8\\) kWh a day.",
          "One day: \\(3 + 0.8 = 3.8\\) units. Thirty days: \\(3.8 \\times 30 = 114\\) units.",
          "Bill: \\(114 \\times 6 = 684\\), so ₹684.",
        ],
        answer: "114 units; ₹684.",
      },
      selfCheckExample: {
        prompt: "How many joules are there in 2 kWh?",
        steps: ["\\(2 \\times 3.6 \\times 10^{6} = 7.2 \\times 10^{6}\\) J."],
        answer: "\\(7.2 \\times 10^{6}\\) J",
      },
      pyqExampleId: "98a35b80-987f-4a92-a02d-e4dedbd59e6a",
      practiceSet: [
        { prompt: "A 2 kW heater runs for 30 minutes. How many units does it use?", answer: "1 unit", method: "\\(2 \\times 0.5\\)" },
        { prompt: "What does one unit on an electricity bill stand for?", answer: "One kilowatt-hour of energy" },
        { prompt: "A fan uses 0.5 unit in 5 hours. What is its power?", answer: "100 W", method: "0.5 kWh ÷ 5 h = 0.1 kW" },
        { prompt: "At ₹5 per unit, what do 40 units cost?", answer: "₹200" },
      ],
      traps: [
        {
          title: "Kilowatts times hours, not watts times hours",
          body: "A unit is a **kilowatt**-hour. Divide the watts by 1000 before you multiply by the hours, or the answer comes out 1000 times too big.",
        },
        {
          title: "A unit is energy, not power",
          body: "The kWh measures **energy** (power × time). The kW measures **power**. A bill charges for energy, so it counts kWh.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphem-domestic",
      name: "Fuses, short circuits and house wiring",
      intuition:
        "Indian homes get alternating current at 220 V. Three wires come in: the live wire carries the supply, the neutral wire completes the path, and the earth wire is a safety path to the ground. A fuse is a short piece of thin wire that melts and breaks the circuit when the current gets too big. That happens in a short circuit, when the live and neutral wires touch and the resistance drops almost to zero, or when too many devices run from one line.",
      definition:
        "What to know:\n" +
        "- Supply: **AC, 220 V (r.m.s.), 50 Hz**. The peak voltage is \\(220\\sqrt{2} \\approx 311\\) V.\n" +
        "- **Fuse**: a wire of low melting point (an alloy of tin and lead) placed in the **live** wire. It melts by the **heating effect** when the current goes above its rating.\n" +
        "- Largest safe power on a fuse \\(= V \\times\\) its rating. Number of equal devices in parallel = that power ÷ the power of one device (round down).\n" +
        "- **Short circuit**: live touches neutral, resistance falls nearly to zero, current shoots up. **Overloading**: too many devices on one line.\n" +
        "- **Earthing**: the metal body of an appliance is joined to the earth wire, so a leak sends current into the ground, not through the person touching it.\n" +
        "- An **MCB** (miniature circuit breaker) switches off by itself on too much current and is reset instead of replaced.",
      table: {
        columns: ["Wire or part", "Fact"],
        rows: [
          {
            cells: ["Live and neutral", "220 V r.m.s. between them"],
            noteAmber: "CDS 2023 (I): the r.m.s. voltage between live and neutral in Indian homes is 220 V.",
            pyqExampleId: "df41fedf-6e9e-43bf-a4c6-fbc397e569e3",
          },
          { cells: ["Live wire", "Red insulation (the code in NCERT); the fuse and switch go in it"] },
          { cells: ["Neutral wire", "Black insulation (the code in NCERT)"] },
          {
            cells: ["Earth wire", "Green insulation; joined to the metal body of an appliance"],
            noteAmber: "CDS 2022 (I): a green wire is the earth wire, not the live wire.",
            pyqExampleId: "b6043468-d50c-41b8-8c25-4df7abc76624",
          },
          {
            cells: ["Fuse", "Low melting point wire in the live line; melts when the current is too big"],
            noteAmber: "CDS 2018 (II): a 5 A fuse at 220 V allows 1100 W, so eleven 100 W bulbs.",
            pyqExampleId: "4c12abb2-18ac-427e-8869-57685db56bff",
          },
          { cells: ["Short circuit", "Live meets neutral; the current rises sharply and the fuse blows"] },
        ],
      },
      pyqExampleId: "df486baa-31e3-4edb-8ae4-f9130b1e536e",
      selfCheckExample: {
        prompt:
          "A 15 A line at 220 V already runs a 2 kW heater. How many 100 W bulbs can be added before the fuse blows?",
        steps: [
          "Largest safe power: \\(220 \\times 15 = 3300\\) W.",
          "Left after the heater: \\(3300 - 2000 = 1300\\) W.",
          "Bulbs: \\(1300 \\div 100 = 13\\).",
        ],
        answer: "13 bulbs",
      },
      practiceSet: [
        { prompt: "What is the frequency of the AC mains supply in India?", answer: "50 Hz" },
        { prompt: "In which wire is a fuse placed: live, neutral or earth?", answer: "The live wire" },
        { prompt: "Why is the metal body of an electric iron joined to the earth wire?", answer: "If the live wire touches the body, the current flows into the earth instead of through the person" },
        { prompt: "Why must a fuse wire have a low melting point?", answer: "So that it melts quickly once the current goes above its rating" },
      ],
      traps: [
        {
          title: "Green is the earth wire",
          body: "In the colour code NCERT uses, **red** is live, **black** is neutral and **green** is earth. Never take the green wire for the live one.",
        },
        {
          title: "The fuse goes in the live wire",
          body: "A fuse in the neutral wire would blow but leave the appliance still joined to the live supply, which is dangerous. The fuse and the switch always go in the **live** wire.",
        },
        {
          title: "220 V is the r.m.s. value",
          body: "The **220 V** of the mains is its r.m.s. value. The voltage swings up to a peak of about **311 V** (\\(220\\sqrt{2}\\)).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphem-bulbs",
      name: "Bulbs and energy changes",
      intuition:
        "Every electric device turns electrical energy into some other form: light, heat, motion or sound. A filament bulb makes light by heating a thin tungsten wire until it glows, so most of its energy comes out as heat. The bulb is filled with an inert gas so the hot tungsten does not burn away quickly.",
      definition:
        "What to know:\n" +
        "- A filament bulb uses **tungsten** (melting point about 3400 °C).\n" +
        "- It is filled with an **inert gas** (argon, sometimes nitrogen) that stops the hot filament from oxidising and slows its evaporation, so the bulb **lasts longer**.\n" +
        "- An **LED** gives light with very little heat, so it wastes far less energy.\n" +
        "- A **candle** turns **chemical** energy into heat and light; no electricity is involved.",
      table: {
        columns: ["Device", "Energy change"],
        rows: [
          { cells: ["Filament bulb", "Electrical to light, and much more heat"] },
          { cells: ["LED", "Electrical to light, very little heat"] },
          { cells: ["Laser", "Electrical to a narrow beam of light of one colour"] },
          { cells: ["Television set", "Electrical to light and sound"] },
          { cells: ["Electric heater or iron", "Electrical to heat"] },
          { cells: ["Electric motor or fan", "Electrical to mechanical"] },
          {
            cells: ["Candle", "Chemical to heat and light"],
            noteAmber: "CDS 2018 (II): the candle is the one that does not turn electrical energy into light.",
            pyqExampleId: "471c4b08-13ac-4f31-b4b0-31fda81538e4",
          },
        ],
      },
      pyqExampleId: "62eace83-6417-455e-8d93-070e2c1ff058",
      selfCheckExample: {
        prompt: "A filament bulb and an LED give the same amount of light. Why does the filament bulb use much more power?",
        steps: [
          "The filament bulb makes light by heating a wire until it glows.",
          "Most of the energy it takes comes out as heat, not light.",
          "The LED makes light directly, with very little heat.",
        ],
        answer: "Most of the filament bulb's energy is wasted as heat.",
      },
      practiceSet: [
        { prompt: "What energy change takes place in an electric fan?", answer: "Electrical to mechanical (kinetic)" },
        { prompt: "Why is tungsten used for the filament of a bulb?", answer: "Its melting point is very high (about 3400 °C)" },
        { prompt: "Which turns chemical energy into electrical energy: a dry cell or a dynamo?", answer: "A dry cell" },
        { prompt: "Which device gives light with very little heat: a filament bulb or an LED?", answer: "An LED" },
      ],
      traps: [
        {
          title: "The gas in a bulb is for a longer life",
          body: "Argon is inert. It keeps the hot tungsten from **oxidising** and slows its **evaporation**, so the bulb **lasts longer**. It does not cut the power used or colour the light.",
        },
      ],
    },
  ],
};
