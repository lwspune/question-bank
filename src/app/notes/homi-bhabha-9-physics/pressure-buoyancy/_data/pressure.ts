import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_PB_PRESSURE_NOTE: SubtopicNote = {
  subtopicName: "Pressure in Solids, Liquids and Air",
  title: "Pressure in Solids, Liquids and Air",
  oneLineDefinition:
    "Pressure is force on each unit of area, P = F/A, measured in pascals; in a liquid it grows with depth as p = hρg, and the air above us presses in all directions with about 101400 N/m² at sea level.",
  whyItMatters:
    "Seven questions in the bank, one EASY, four MODERATE and two HARD. Four use P = F/A: two sums that change cm² into m², the body position that gives the least pressure, and pressure written as ma/A. Two are about pressure in water (plates whose lower ends are at the same depth, a bubble that grows as it rises) and one picks the true facts about air pressure.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9pbpr-area",
      name: "Pressure as force on each unit area",
      intuition:
        "Push your palm on a lump of clay and it hardly dents; push with one finger and it sinks in. The force is the same, but the finger spreads it over a much smaller area. Pressure tells you how much force falls on each square metre, so a small area means a large pressure.",
      definition:
        "- **Thrust** is a force acting at right angles to a surface. **Pressure** is the thrust on each unit area: \\(P = \\frac{F}{A}\\).\n" +
        "- The SI unit of pressure is the **pascal (Pa)**: 1 Pa = 1 N/m².\n" +
        "- For the same force, a **smaller area** gives a **larger pressure**. A sharp knife, a pin and a nail cut or pierce because their tips are tiny. A wide strap, a camel's broad feet and a person lying flat spread the force and give a small pressure.\n" +
        "- Since force is mass times acceleration, \\(F = ma\\), pressure can also be written \\(P = \\frac{ma}{A}\\).\n" +
        "- **Change the area to m² first**: 1 cm² = \\(10^{-4}\\) m², because 1 cm = \\(10^{-2}\\) m and the area squares it.",
      formula: {
        label: "Pressure",
        latex: "P = \\frac{F}{A} \\qquad F = P \\times A \\qquad P = \\frac{ma}{A} \\qquad 1\\ \\mathrm{cm^2} = 10^{-4}\\ \\mathrm{m^2}",
        symbols: [
          { symbol: "P", meaning: "pressure, in pascals (N/m²)" },
          { symbol: "F", meaning: "force (thrust) at right angles to the surface, in newtons" },
          { symbol: "A", meaning: "area on which the force acts, in m²" },
          { symbol: "m", meaning: "mass, in kg" },
          { symbol: "a", meaning: "acceleration, in m/s²" },
        ],
      },
      authoredExample: {
        prompt: "A brick of weight 60 N can rest on a face 20 cm by 10 cm or on a face 10 cm by 5 cm. Find the pressure it puts on the ground in each case.",
        steps: [
          "Large face: \\(20 \\times 10 = 200\\) cm² \\(= 200 \\times 10^{-4} = 0.02\\) m². \\(P = \\frac{60}{0.02} = 3000\\) Pa.",
          "Small face: \\(10 \\times 5 = 50\\) cm² \\(= 0.005\\) m². \\(P = \\frac{60}{0.005} = 12000\\) Pa.",
        ],
        answer: "3000 Pa on the large face and 12000 Pa on the small face: a quarter of the area gives four times the pressure.",
      },
      selfCheckExample: {
        prompt: "A girl of weight 450 N stands on a floor. The soles of her two feet touch the floor over 0.03 m² in all. What pressure does she put on the floor?",
        steps: ["\\(P = \\frac{F}{A} = \\frac{450}{0.03} = 15000\\) Pa."],
        answer: "15000 Pa",
      },
      practiceSet: [
        { prompt: "What is the SI unit of pressure?", answer: "The pascal (Pa), which is 1 N/m²" },
        { prompt: "Why is the edge of a knife made sharp?", answer: "A sharp edge has a tiny area, so the same push gives a much larger pressure" },
        { prompt: "A force of 30 N acts on an area of 15 cm². What is the pressure in pascals?", answer: "15 cm² = 0.0015 m², so \\(P = \\frac{30}{0.0015} = 20000\\) Pa" },
        { prompt: "Write pressure in terms of the mass m of a body, its acceleration a and the area A it presses on.", answer: "\\(P = \\frac{ma}{A}\\)" },
      ],
      pyqExampleId: "9a169f5c-4112-4a8c-ad3c-2ed097bd07bb",
      traps: [
        {
          title: "Changing cm² to m² by dividing by 100",
          body: "A centimetre is \\(10^{-2}\\) m, so a square centimetre is \\(10^{-4}\\) m². 25 cm² is 0.0025 m², not 0.25 m².",
        },
        {
          title: "Thinking a heavier pose gives more pressure",
          body: "A person's weight is the same standing, sitting or lying. Only the area changes, and the largest area (lying flat) gives the least pressure.",
        },
        {
          title: "Mixing up force and pressure",
          body: "Force is measured in newtons and pressure in pascals (N/m²). To get the force from a pressure, multiply by the area.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9pbpr-liquid",
      name: "Pressure in a liquid and the rising bubble",
      intuition:
        "Dive to the bottom of a pool and your ears hurt: the water above you is pressing down. The deeper you go, the taller the column of water above you, so the pressure grows. A bubble rising from the bottom feels less and less of this squeeze, so the gas inside it spreads out and the bubble gets bigger.",
      definition:
        "- The pressure of a liquid at depth h is \\(p = h\\rho g\\): it grows with **depth** and with the **density** of the liquid.\n" +
        "- It does **not** depend on the shape of the vessel, the amount of liquid or the size of the object placed in it. Points at the **same depth** in the same liquid have the **same pressure**.\n" +
        "- At a point, a liquid presses **equally in all directions**: down, up and sideways.\n" +
        "- \\(h\\rho g\\) is the pressure of the liquid alone. The air above the surface adds atmospheric pressure on top of it.\n" +
        "- **Boyle's law**: for a fixed amount of gas at constant temperature, pressure times volume stays the same. Less pressure, bigger volume. That is why a bubble grows as it rises.",
      formula: {
        label: "Liquid pressure and Boyle's law",
        latex: "p = h\\rho g \\qquad P_1V_1 = P_2V_2",
        symbols: [
          { symbol: "p", meaning: "pressure due to the liquid, in pascals" },
          { symbol: "h", meaning: "depth below the surface, in metres" },
          { symbol: "ρ", meaning: "density of the liquid, in kg/m³" },
          { symbol: "g", meaning: "acceleration due to gravity, in m/s²" },
          { symbol: "P₁, V₁ and P₂, V₂", meaning: "pressure and volume of the same gas before and after, at the same temperature" },
        ],
      },
      authoredExample: {
        prompt: "Find the pressure due to water at a depth of 5 m in a lake, and at a depth of 10 m. Take the density of water as 1000 kg/m³ and g as 10 m/s².",
        steps: [
          "At 5 m: \\(p = h\\rho g = 5 \\times 1000 \\times 10 = 50000\\) Pa.",
          "At 10 m the depth is doubled, so the pressure doubles: \\(10 \\times 1000 \\times 10 = 100000\\) Pa.",
        ],
        answer: "50000 Pa at 5 m and 100000 Pa at 10 m",
      },
      selfCheckExample: {
        prompt: "Why is the wall of a dam made much thicker at the bottom than at the top?",
        steps: ["Water pressure grows with depth.", "The bottom of the wall has the greatest pressure on it, so it must be strongest there."],
        answer: "Because the water pressure is greatest at the bottom, where the water is deepest",
      },
      practiceSet: [
        { prompt: "Find the pressure due to water at a depth of 2 m. Take the density of water as 1000 kg/m³ and g as 10 m/s².", answer: "\\(2 \\times 1000 \\times 10 = 20000\\) Pa" },
        { prompt: "At the same depth, is the pressure greater in sea water or in fresh water?", answer: "In sea water, because it is denser" },
        { prompt: "A gas bubble has a volume of 2 cm³ where the pressure is 3 atmospheres. What is its volume where the pressure is 1 atmosphere, at the same temperature?", answer: "\\(3 \\times 2 = 1 \\times V\\), so V = 6 cm³" },
        { prompt: "A tall narrow jar and a wide bowl are filled with water to the same height. How do the water pressures at their bottoms compare?", answer: "They are equal, because the depth is the same" },
      ],
      pyqExampleId: "9cea2b3d-1835-4399-a16d-149a2403199a",
      traps: [
        {
          title: "Thinking a bigger plate feels more liquid pressure",
          body: "Liquid pressure depends only on the depth and the density of the liquid. Two plates whose lower ends are at the same depth feel the same pressure there, whatever their length or breadth.",
        },
        {
          title: "Saying a rising bubble grows because the water gets thinner",
          body: "The density of water hardly changes with depth. The bubble grows because less water is above it, so the pressure on it falls and the gas expands (Boyle's law).",
        },
        {
          title: "Thinking a liquid presses only downwards",
          body: "At any point a liquid presses equally in all directions. That is why water spurts sideways out of a hole in the side of a bottle.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9pbpr-air",
      name: "Atmospheric pressure",
      intuition:
        "We live at the bottom of an ocean of air many kilometres deep. The weight of all that air presses on us from every side, but we do not feel it because the air inside our body pushes back just as hard. Climb a mountain and there is less air above you, so the pressure falls.",
      definition:
        "- The pressure of the air around us is **atmospheric pressure**. At sea level it is about **101400 N/m²** (about \\(1 \\times 10^5\\) Pa), the same as the pressure of a 76 cm column of mercury.\n" +
        "- At a place it acts **equally in all directions**.\n" +
        "- It is **not the same everywhere**: it **falls with height** and changes with the weather.\n" +
        "- **Fast-moving air has a lower pressure** than still air.\n" +
        "- It is measured with a **barometer**.",
      table: {
        columns: ["Situation", "Air pressure", "What it explains"],
        rows: [
          { cells: ["Sea level, normal day", "About 101400 N/m²", "The standard value of atmospheric pressure"] },
          { cells: ["Top of a high mountain", "Lower than at sea level", "Less air above; water boils below 100 °C there"] },
          { cells: ["Fast wind over a roof", "Lower above the roof", "The still air under the roof pushes it up, so a storm can lift it"] },
          { cells: ["Drinking through a straw", "Lowered inside the straw", "The outside air pushes the drink up the straw"] },
          { cells: ["Rubber sucker on a smooth wall", "Air pushed out from under it", "The outside air presses the sucker onto the wall"] },
        ],
        caption: "Air pressure presses equally in all directions at one place, but differs from place to place.",
      },
      selfCheckExample: {
        prompt: "When you sip a drink through a straw, what actually pushes the drink up into your mouth?",
        steps: ["Sucking removes air from the straw, so the pressure inside it falls.", "The air outside still presses on the surface of the drink with full atmospheric pressure."],
        answer: "The atmospheric pressure on the surface of the drink",
      },
      practiceSet: [
        { prompt: "Which instrument measures atmospheric pressure?", answer: "A barometer" },
        { prompt: "Is the air pressure on a mountain top more or less than at sea level?", answer: "Less, because there is less air above" },
        { prompt: "At one place, does the air press harder from above than from the sides?", answer: "No: it presses equally in all directions" },
        { prompt: "Why can a strong storm wind lift the roof off a house?", answer: "The fast wind lowers the air pressure above the roof, and the still air under it pushes the roof up" },
      ],
      pyqExampleId: "48f34c90-1702-4fc6-b98a-7704797c9f23",
      traps: [
        {
          title: "Thinking air pressure is the same everywhere",
          body: "Air pressure falls as you go higher and changes with the weather. Only at one place does it act equally in every direction.",
        },
        {
          title: "Saying faster air has a higher pressure",
          body: "It is the other way round: when air moves faster its pressure falls. That is how a strong wind lifts a roof.",
        },
        {
          title: "Thinking air presses only downwards",
          body: "Atmospheric pressure acts in all directions at a point, up and sideways as much as down.",
        },
      ],
    },
  ],
};
