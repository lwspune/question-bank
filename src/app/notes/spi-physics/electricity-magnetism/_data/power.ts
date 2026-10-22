import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_EM_POWER_NOTE: SubtopicNote = {
  subtopicName: "Electric Power and House Wiring",
  title: "Electric Power and House Wiring",
  oneLineDefinition:
    "Electric power is the energy used each second, P = VI; energy is power times time, billed in kilowatt hours; and a house circuit is kept safe by a fuse, a main switch and an earth wire.",
  whyItMatters:
    "Eight questions in the bank, seven EASY and one MODERATE. Five are about power and energy (P = VI, a halved voltage, a bulb's energy in a minute, the kWh unit, why LEDs are preferred) and three are house wiring: the fuse, what a fuse wire must be, and what the main switch cuts. Units cost most of the marks: milliamperes, minutes and watt hours.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiempw-power",
      name: "Electric power: P = VI",
      intuition:
        "Power is how fast an appliance uses energy. A 1000 W heater uses energy ten times as fast as a 100 W bulb. Multiply the voltage by the current and you get the power.",
      definition:
        "- \\(P = VI\\). Unit: watt (W); \\(1\\text{ kW} = 1000\\text{ W}\\).\n" +
        "- With Ohm's law it also reads \\(P = I^2R\\) and \\(P = \\dfrac{V^2}{R}\\).\n" +
        "- For a **fixed resistor**, power goes as the **square** of the voltage (or of the current): halve V and P becomes one fourth; double I and P becomes four times.\n" +
        "- A rating like '100 W, 220 V' gives the resistance: \\(R = \\dfrac{V^2}{P} = \\dfrac{220^2}{100} = 484\\,\\Omega\\).\n" +
        "- An **LED** turns much more of its energy into light and much less into heat than a filament bulb, so it gives the same light for far less power.",
      formula: {
        label: "Electric power",
        latex: "P = VI = I^2R = \\frac{V^2}{R}",
      },
      authoredExample: {
        prompt: "A heater draws a current of 4 A from a 230 V supply. Find its power.",
        steps: ["\\(P = VI = 230 \\times 4 = 920\\) W."],
        answer: "920 W",
      },
      selfCheckExample: {
        prompt: "A current of 2 A flows through a 10 \\(\\Omega\\) resistor. Find the power used in it.",
        steps: ["\\(P = I^2R = 2^2 \\times 10 = 40\\) W."],
        answer: "40 W",
      },
      practiceSet: [
        { prompt: "A bulb is rated 60 W, 240 V. What current does it draw?", answer: "\\(\\frac{60}{240} = 0.25\\) A" },
        { prompt: "A heater is rated 1000 W, 200 V. What is its resistance?", answer: "\\(\\frac{200^2}{1000} = 40\\,\\Omega\\)" },
        { prompt: "The current through a fixed resistor is doubled. How many times does the power become?", answer: "Four times" },
        { prompt: "Why does an LED bulb use less power than a filament bulb for the same light?", answer: "It wastes much less energy as heat" },
      ],
      pyqExampleId: "eb67121b-c179-4feb-b8b0-1cf57fc048fc",
      traps: [
        {
          title: "Halving the voltage halves the power",
          body: "For a fixed resistor \\(P = \\frac{V^2}{R}\\), so halving V gives one fourth of the power, not half.",
        },
        {
          title: "Using milliamperes as amperes",
          body: "Change mA to A before multiplying: 300 mA is 0.3 A, so at 220 V the power is 66 W, not 66000 W.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiempw-energy",
      name: "Electrical energy and the kilowatt hour",
      intuition:
        "Energy is power kept up for a time. A bulb's power tells you how fast it uses energy; leave it on longer and it uses more. The electricity bill counts energy in large units called kilowatt hours.",
      definition:
        "- \\(E = Pt\\). With P in watts and t in **seconds**, E is in joules.\n" +
        "- With P in **kilowatts** and t in **hours**, E is in kilowatt hours (kWh). One kWh is **one unit** on the bill.\n" +
        "- With P in watts and t in hours: \\(E = \\dfrac{Pt}{1000}\\) kWh.\n" +
        "- \\(1\\text{ kWh} = 1000\\text{ W} \\times 3600\\text{ s} = 3.6 \\times 10^6\\text{ J}\\).\n" +
        "- The kWh is a unit of **energy**, not of power.",
      formula: {
        label: "Electrical energy",
        latex: "E = Pt \\qquad E\\,(\\text{kWh}) = \\frac{P\\,(\\text{W}) \\times t\\,(\\text{h})}{1000} \\qquad 1\\text{ kWh} = 3.6 \\times 10^6\\text{ J}",
      },
      authoredExample: {
        prompt: "A 1500 W heater runs for 2 hours. How many units of electricity does it use?",
        steps: ["\\(E = \\frac{1500 \\times 2}{1000} = 3\\) kWh.", "One unit is one kWh."],
        answer: "3 units",
      },
      selfCheckExample: {
        prompt: "A 40 W fan runs for 5 minutes. How much energy does it use, in joules?",
        steps: ["5 minutes \\(= 300\\) s.", "\\(E = 40 \\times 300 = 12000\\) J."],
        answer: "12000 J",
      },
      practiceSet: [
        { prompt: "How many joules are there in 1 kWh?", answer: "\\(3.6 \\times 10^6\\) J" },
        { prompt: "A 200 W television runs for 5 hours. How many units does it use?", answer: "1 unit" },
        { prompt: "Four 25 W bulbs glow for 10 hours. How many units do they use?", answer: "1 unit (100 W for 10 h)" },
        { prompt: "Electricity costs Rs 6 a unit. What does it cost to run a 2 kW geyser for 3 hours?", answer: "6 units, Rs 36" },
      ],
      pyqExampleId: "e8461560-7706-4ed3-a07d-5a23220cce28",
      traps: [
        {
          title: "Leaving time in minutes",
          body: "In joules the time must be in seconds. A 50 W lamp for 3 minutes uses \\(50 \\times 180 = 9000\\) J, not 150 J.",
        },
        {
          title: "Calling the kWh a unit of power",
          body: "Kilowatt is power; kilowatt HOUR is energy. The bill counts kWh because it charges for energy used.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiempw-wiring",
      name: "House wiring and safety devices",
      intuition:
        "Mains electricity in India comes into a house on two wires at 220 V, 50 Hz, with a third wire for safety. Each safety device guards against one danger, and the questions ask which device does which job.",
      definition:
        "Three rules settle most questions:\n" +
        "- The **fuse** and every switch go in the **live** wire, in series with the appliance.\n" +
        "- The **fuse** protects the circuit and appliances from **overloading and short circuits**; **earthing** protects **people** from shocks.\n" +
        "- A **fuse wire** must melt quickly: it is thin, short, of low melting point and of higher resistance than the rest of the wiring.",
      table: {
        columns: ["Part", "What it is or does"],
        rows: [
          { cells: ["Live wire", "Red insulation, at 220 V"] },
          { cells: ["Neutral wire", "Black insulation, at zero potential"] },
          { cells: ["Earth wire", "Green insulation, joined to the metal body of an appliance and to a plate buried in the ground"] },
          { cells: ["Fuse", "A wire that melts and breaks the circuit when too much current flows"] },
          { cells: ["MCB (miniature circuit breaker)", "A switch that trips by itself on too much current, and can be reset"] },
          {
            cells: ["Main switch", "A double pole switch that cuts both the live and the neutral wire"],
            noteAmber: "The earth wire is never switched off.",
          },
          { cells: ["Short circuit", "Live and neutral touch, so the resistance drops and a huge current flows"] },
          { cells: ["Overloading", "Too many appliances on one socket draw more current than the wiring is meant for"] },
        ],
        caption: "Indian mains: 220 V AC at 50 Hz. Appliances are joined in parallel.",
      },
      selfCheckExample: {
        prompt: "In which wire is the fuse placed, and how is it connected to the appliance?",
        steps: ["The fuse goes in the live wire.", "It is in series, so all the appliance's current passes through it."],
        answer: "In the live wire, in series",
      },
      practiceSet: [
        { prompt: "What colour is the insulation of the earth wire?", answer: "Green" },
        { prompt: "Whom does earthing protect, and from what?", answer: "People, from electric shock through a leaking metal body" },
        { prompt: "What happens to the current in a short circuit?", answer: "It becomes very large, because the resistance drops" },
        { prompt: "What is the frequency of the AC mains supply in India?", answer: "50 Hz" },
      ],
      pyqExampleId: "52e826f2-fb9b-40ca-8121-d3114440a6dd",
      traps: [
        {
          title: "A thick fuse wire",
          body: "A thick wire has low resistance and does not melt easily, so it fails to break the circuit. A fuse wire is thin.",
        },
        {
          title: "Earthing as protection against overload",
          body: "Earthing carries a leaking current away from a metal body to save the user. Overload and short circuit are the fuse's job.",
        },
      ],
    },
  ],
};
