import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CE_POWER_NOTE: SubtopicNote = {
  subtopicName: "Electrical Energy and Power",
  title: "Electrical Energy and Power",
  oneLineDefinition:
    "Electrical energy used is power multiplied by time; homes pay for it in units, where 1 unit is 1 kWh, or 3.6 million joules, and the supply in India is 220 V protected by a fuse that works on the heating effect of current.",
  whyItMatters:
    "Seven questions in the bank, six EASY and one MODERATE. Five turn power and time into units or joules (or back again): the household unit kWh, 0.5 kWh and 10 units in joules, a lamp's bill over a month, and a bulb's power from the units it used. One asks the principle of a fuse and one the voltage of the household supply.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9cepo-energy",
      name: "Power, kilowatt hours and units",
      intuition:
        "Power tells you how fast an appliance uses energy: a 100 W bulb uses 100 joules every second. Leave it on longer and it uses more energy. The joule is far too small for a household bill, so the electricity board counts in kilowatt hours: the energy a 1000 W appliance uses in one hour. One kilowatt hour is one unit on your bill.",
      definition:
        "- **Power** is the energy used each second: \\(P = \\frac{E}{t}\\). Unit: the **watt (W)**, 1 W = 1 J/s. 1 kW = 1000 W.\n" +
        "- Electrical power: \\(P = VI\\).\n" +
        "- **Energy used**: \\(E = P \\times t\\). With P in kW and t in hours, E comes out in **kWh**.\n" +
        "- **1 unit** of electricity = **1 kWh** = \\(1000 \\text{ W} \\times 3600 \\text{ s} = 3.6 \\times 10^6\\) J.\n" +
        "- For a monthly bill, count the **days** carefully: February has **29 days in a leap year** (2016, 2020, 2024) and 28 otherwise.",
      formula: {
        label: "Electrical energy and power",
        latex: "P = VI \\qquad E = Pt \\qquad 1\\ \\mathrm{kWh} = 3.6 \\times 10^6\\ \\mathrm{J}",
        symbols: [
          { symbol: "P", meaning: "power, in watts (W) or kilowatts (kW)" },
          { symbol: "V", meaning: "potential difference, in volts" },
          { symbol: "I", meaning: "current, in amperes" },
          { symbol: "E", meaning: "energy used, in joules or kWh" },
          { symbol: "t", meaning: "time, in seconds or hours" },
        ],
      },
      authoredExample: {
        prompt: "A 1500 W geyser runs for 40 minutes every day for 30 days. How many units of electricity does it use? What is the cost at Rs 8 a unit?",
        steps: [
          "Power: 1500 W = 1.5 kW. Time each day: 40 minutes = \\(\\frac{2}{3}\\) h.",
          "Hours in 30 days: \\(30 \\times \\frac{2}{3} = 20\\) h.",
          "Energy: \\(1.5 \\times 20 = 30\\) kWh = 30 units. Cost: \\(30 \\times 8 = 240\\).",
        ],
        answer: "30 units, costing Rs 240",
      },
      selfCheckExample: {
        prompt: "Change 2 kWh into joules.",
        steps: ["\\(2 \\times 3.6 \\times 10^6 = 7.2 \\times 10^6\\) J."],
        answer: "\\(7.2 \\times 10^6\\) J",
      },
      practiceSet: [
        { prompt: "A 60 W bulb glows for 50 hours. How many units of electricity does it use?", answer: "\\(0.06 \\times 50 = 3\\) kWh, that is 3 units" },
        { prompt: "A mixer draws a current of 2 A from a 220 V supply. What is its power?", answer: "\\(220 \\times 2 = 440\\) W" },
        { prompt: "How many joules make 1 kilowatt hour?", answer: "\\(3.6 \\times 10^6\\) J" },
        { prompt: "An appliance uses 3 units of electricity in 15 hours. What is its power?", answer: "\\(\\frac{3}{15} = 0.2\\) kW, that is 200 W" },
      ],
      pyqExampleId: "49e36e73-f670-4f34-9713-bc0fe6812007",
      traps: [
        {
          title: "Using watts and minutes in the kWh formula",
          body: "Change watts to kilowatts and minutes to hours before multiplying. A 500 W iron used for 30 minutes uses 0.5 × 0.5 = 0.25 kWh, not 15000.",
        },
        {
          title: "Taking 1 kWh as 1000 J",
          body: "1 kWh is 1000 W for 3600 s, which is \\(3.6 \\times 10^6\\) J. The 1000 is watts, not joules.",
        },
        {
          title: "Counting February as 28 days in a leap year",
          body: "February has 29 days in a leap year such as 2016, 2020 or 2024. A monthly bill must use the real number of days.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9cepo-household",
      name: "Heating effect, the fuse and the household supply",
      intuition:
        "When current flows through a wire, the electrons keep bumping into the atoms and the wire warms up. A heater uses this on purpose. A fuse uses it as a guard: it is a short piece of wire that melts as soon as too much current flows, and so cuts off the circuit before the house wiring can catch fire.",
      definition:
        "- **Heating effect of current**: a current I flowing through a resistance R for a time t produces heat \\(H = I^2Rt\\) (Joule's law).\n" +
        "- Heaters, irons, toasters and bulb filaments all work on the heating effect.\n" +
        "- A **fuse** works on the **heating effect** of current. It is a wire of an **alloy** (of tin and lead) with a **low melting point**, joined **in series** in the **live wire**. Too much current heats it, it **melts**, and the circuit is **broken**.\n" +
        "- The household supply in **India** is **220 V** between the live and neutral wires, at a frequency of **50 Hz** (alternating current).\n" +
        "- Three wires come into a house: **live**, **neutral** and **earth**. The earth wire carries any leaking current safely into the ground.",
      table: {
        columns: ["Item", "Fact to remember"],
        rows: [
          { cells: ["Household supply in India", "220 V, 50 Hz alternating current"] },
          { cells: ["Live wire", "Red insulation; carries the 220 V supply"] },
          { cells: ["Neutral wire", "Black insulation; completes the circuit"] },
          { cells: ["Earth wire", "Green insulation; takes leaking current safely to the ground"] },
          { cells: ["Fuse wire", "Alloy of low melting point, in series in the live wire; melts if the current is too large"] },
          { cells: ["Heating coil", "Nichrome: high resistivity and a high melting point"] },
          { cells: ["Bulb filament", "Tungsten: melts only at about 3400 °C, so it can glow white hot"] },
        ],
        caption: "These are the colours used in Indian school books; newer cables use brown for live and blue for neutral.",
      },
      selfCheckExample: {
        prompt: "Why is a fuse put in the live wire and not in the neutral wire?",
        steps: [
          "The live wire carries the high voltage.",
          "When the fuse melts, the appliance is cut off from the live wire, so it is no longer at a dangerous voltage.",
        ],
        answer: "So that when it melts, the appliance is disconnected from the high voltage of the live wire.",
      },
      practiceSet: [
        { prompt: "What is the frequency of the household AC supply in India?", answer: "50 Hz" },
        { prompt: "What is the colour of the insulation on the earth wire in Indian school books?", answer: "Green" },
        { prompt: "Why is tungsten used for the filament of an electric bulb?", answer: "It has a very high melting point, so it can glow white hot without melting" },
        { prompt: "What property must the material of a fuse wire have?", answer: "A low melting point" },
      ],
      pyqExampleId: "ae9fa05e-23fd-4f05-96eb-5696bb12e5bd",
      traps: [
        {
          title: "Connecting a fuse in parallel",
          body: "A fuse goes in series with the live wire, so all the current passes through it. In parallel it could not break the circuit.",
        },
        {
          title: "Thinking a fuse works on the magnetic effect",
          body: "A fuse works on the heating effect of current: too much current heats the alloy wire until it melts.",
        },
        {
          title: "Picking 110 V or 210 V for India",
          body: "The household supply in India is 220 V at 50 Hz. Other voltages in the options are there to catch a guess.",
        },
      ],
    },
  ],
};
