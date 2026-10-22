import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_EM_CIRCUITS_NOTE: SubtopicNote = {
  subtopicName: "Resistance and Circuits",
  title: "Resistance and Circuits",
  oneLineDefinition:
    "Ohm's law, how a wire's resistance depends on its length and thickness, resistivity as a property of the material, and resistors joined in series and in parallel.",
  whyItMatters:
    "Twelve CDS questions from 2017 (II) to 2026 (II), eleven of them MODERATE. Six are about resistivity (its unit, what changes it, which material has more), four join resistors in series or parallel, and two scale a wire's resistance with its length or diameter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsphem-ohm",
      name: "Ohm's law and the resistance of a wire",
      intuition:
        "At a steady temperature, the current through a metal wire grows in step with the voltage across it: double the voltage, double the current. The ratio is the resistance. A longer wire is a longer road for the charge, so it resists more. A thicker wire is a wider road, so it resists less. Thickness counts through the area, which goes with the square of the diameter.",
      definition:
        "The rules:\n" +
        "- **Ohm's law**: \\(V = IR\\). One **ohm** is one volt per ampere.\n" +
        "- \\(R = \\rho\\dfrac{l}{A}\\): resistance goes **up with length** and **down with area**.\n" +
        "- Area \\(A = \\pi r^{2} = \\dfrac{\\pi d^{2}}{4}\\), so **doubling the diameter makes the area 4 times** and the resistance one quarter.\n" +
        "- **Stretching** a wire to \\(n\\) times its length keeps its volume, so its area becomes \\(1/n\\) times and its resistance \\(n^{2}\\) times.\n" +
        "- With the same cell, \\(I = V/R\\): halve the resistance and the current doubles.",
      formula: {
        label: "Ohm's law and resistance of a wire",
        latex: "V = IR \\qquad R = \\rho\\dfrac{l}{A} \\qquad A = \\pi r^{2} = \\dfrac{\\pi d^{2}}{4}",
        symbols: [
          { symbol: "ρ", meaning: "resistivity of the material" },
          { symbol: "l", meaning: "length of the wire" },
          { symbol: "A", meaning: "area of cross-section" },
          { symbol: "r, d", meaning: "radius and diameter of the wire" },
        ],
      },
      authoredExample: {
        prompt:
          "A copper wire has a resistance of 6 Ω. A second copper wire is 3 times as long and has 3 times the diameter. Find its resistance, and the current each wire draws from a 12 V cell.",
        steps: [
          "Length 3 times: resistance 3 times.",
          "Diameter 3 times: area \\(3^{2} = 9\\) times, so resistance \\(\\tfrac{1}{9}\\) times.",
          "New resistance \\(= 6 \\times \\dfrac{3}{9} = 2\\) Ω.",
          "Currents: \\(12 \\div 6 = 2\\) A for the first wire and \\(12 \\div 2 = 6\\) A for the second.",
        ],
        answer: "2 Ω; the currents are 2 A and 6 A.",
      },
      selfCheckExample: {
        prompt: "A wire of resistance 5 Ω is stretched to twice its length, its volume staying the same. What is its new resistance?",
        steps: [
          "Length doubles, so the area halves to keep the volume the same.",
          "\\(R\\) goes as \\(l/A\\): \\(2 \\div \\tfrac{1}{2} = 4\\) times.",
          "\\(4 \\times 5 = 20\\) Ω.",
        ],
        answer: "20 Ω",
      },
      pyqExampleId: "f3035cee-7ed0-493e-b8dc-335e8c906eef",
      practiceSet: [
        { prompt: "A 3 V cell drives a current of 0.5 A through a resistor. What is the resistance?", answer: "6 Ω", method: "\\(R = V/I\\)" },
        { prompt: "A wire of resistance 10 Ω is cut into two equal halves. What is the resistance of each half?", answer: "5 Ω" },
        { prompt: "Write the ohm in terms of the volt and the ampere.", answer: "1 ohm = 1 volt per ampere" },
        { prompt: "A 6 V battery sends 2 A through a wire. With the same battery, the wire is replaced by one of three times the resistance. What is the new current?", answer: "\\(\\tfrac{2}{3}\\) A" },
      ],
      traps: [
        {
          title: "Thickness counts through the square of the diameter",
          body: "Resistance depends on the **area**, and area goes as \\(d^{2}\\). Doubling the diameter divides the resistance by **4**, not by 2.",
        },
        {
          title: "Stretching changes both length and area",
          body: "Pull a wire to \\(n\\) times its length and it also gets thinner. Its resistance becomes \\(n^{2}\\) times, not \\(n\\) times.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphem-resistivity",
      name: "Resistivity: a property of the material",
      intuition:
        "Resistance belongs to one particular wire. Resistivity belongs to the material it is made of. A long thin copper wire and a short thick one have different resistances, but the same resistivity, because both are copper. Only the material and its temperature change resistivity.",
      definition:
        "What to know:\n" +
        "- \\(\\rho = \\dfrac{RA}{l}\\). Its unit is the **ohm metre** (Ω m), or the ohm centimetre.\n" +
        "- It depends on the **material** and the **temperature** only, never on the length or area of the wire.\n" +
        "- Metals: about \\(10^{-8}\\) Ω m. Insulators such as glass and rubber: \\(10^{10}\\) Ω m and more.\n" +
        "- For a metal, resistivity **rises** as it gets hotter.\n" +
        "- **Alloys** (nichrome, manganin, constantan) have a much higher resistivity than pure metals and do not oxidise easily when hot, so they are used in heaters, irons and toasters.\n" +
        "- Same size wires, same current: the one of higher resistivity has more resistance and so gives out more heat (\\(I^{2}R\\)).",
      table: {
        columns: ["Material", "Resistivity at 20 °C (Ω m)", "Where it is used"],
        rows: [
          { cells: ["Silver", "1.60 × 10⁻⁸", "The best conductor; too costly for wiring"] },
          { cells: ["Copper", "1.62 × 10⁻⁸", "House wiring"] },
          {
            cells: ["Aluminium", "2.63 × 10⁻⁸", "Overhead power lines (light and cheap)"],
            noteAmber: "CDS 2017 (II) and 2018 (I): an aluminium wire of the same size as a copper wire has more resistance, so it gives out more heat for the same current.",
            pyqExampleId: "2b0eed0a-ac9e-4c1a-b371-6776856afdc6",
          },
          { cells: ["Tungsten", "5.20 × 10⁻⁸", "Bulb filaments"] },
          { cells: ["Nichrome (alloy)", "About 1.1 × 10⁻⁶", "Heater coils"] },
          {
            cells: ["Glass", "10¹⁰ to 10¹⁴", "An insulator"],
            noteAmber: "CDS 2022 (I): silver, nichrome and glass in increasing order of resistivity.",
            pyqExampleId: "10641ed8-424a-4cfb-9a54-fd806281f3ad",
          },
          { cells: ["Rubber", "10¹³ to 10¹⁶", "Covering on wires"] },
        ],
      },
      pyqExampleId: "98da1d67-8ca2-488c-a810-b9b3f1cbca3a",
      selfCheckExample: {
        prompt: "A wire 2 m long with an area of cross-section of 1 mm² has a resistance of 0.034 Ω. Find the resistivity of its material.",
        steps: [
          "Area: \\(1\\ \\text{mm}^{2} = 10^{-6}\\ \\text{m}^{2}\\).",
          "\\(\\rho = \\dfrac{RA}{l} = \\dfrac{0.034 \\times 10^{-6}}{2} = 1.7 \\times 10^{-8}\\) Ω m.",
        ],
        answer: "\\(1.7 \\times 10^{-8}\\) Ω m (close to copper's value).",
      },
      practiceSet: [
        { prompt: "Why is nichrome, not copper, used for the coil of an electric heater?", answer: "Nichrome has a much higher resistivity and does not oxidise easily when red hot" },
        { prompt: "Arrange aluminium, copper and silver in increasing order of resistivity.", answer: "Silver < copper < aluminium" },
        { prompt: "What happens to the resistivity of a copper wire when it is heated?", answer: "It increases" },
        { prompt: "Which metal is used for bulb filaments, and why?", answer: "Tungsten, because of its very high melting point (about 3400 °C)" },
      ],
      traps: [
        {
          title: "Resistivity is not resistance",
          body: "Changing the **length** or **area** of a wire changes its **resistance**, never its **resistivity**. Resistivity changes only with the material and the temperature.",
        },
        {
          title: "The unit is ohm metre, not ohm per metre",
          body: "From \\(\\rho = RA/l\\): ohm × m² ÷ m = **ohm metre** (or ohm centimetre). Ohm per metre and ohm per square metre are wrong.",
        },
        {
          title: "Aluminium resists more than copper",
          body: "Copper's resistivity is lower than aluminium's. So for wires of the **same size**, the **aluminium** one has the larger resistance and gives out more heat for the same current.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphem-combination",
      name: "Resistors in series and in parallel",
      intuition:
        "In series the current has one path, so it must push through every resistor in turn and the resistances add. In parallel the current has several paths side by side, so it gets through more easily and the total is less than the smallest one. Across a fixed battery, less resistance means more current and so more heat every second.",
      definition:
        "The rules:\n" +
        "- **Series**: \\(R = R_1 + R_2 + R_3\\). The same current flows through each; the voltages add. The total is **more than the largest**.\n" +
        "- **Parallel**: \\(\\dfrac{1}{R} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3}\\). The same voltage is across each; the currents add. The total is **less than the smallest**.\n" +
        "- \\(n\\) equal resistors \\(R\\): series \\(nR\\), parallel \\(R/n\\). Two in parallel: \\(\\dfrac{R_1R_2}{R_1 + R_2}\\).\n" +
        "- Heat per second across a fixed voltage is \\(V^{2}/R\\), so the **all-parallel** joining gives the most heat and the all-series the least.\n" +
        "- Home appliances are joined in **parallel**: each gets the full mains voltage and can be switched on its own.\n" +
        "- In a steady DC circuit a charged **capacitor** passes no current, so its branch carries none.",
      formula: {
        label: "Series and parallel",
        latex: "R_s = R_1 + R_2 + R_3 \\qquad \\dfrac{1}{R_p} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} + \\dfrac{1}{R_3}",
        symbols: [
          { symbol: "Rₛ", meaning: "total resistance in series" },
          { symbol: "Rₚ", meaning: "total resistance in parallel" },
        ],
      },
      authoredExample: {
        prompt:
          "Resistors of 4 Ω, 6 Ω and 12 Ω are joined to a 12 V battery, first all in parallel and then all in series. Find the total resistance, the current from the battery and the heat produced each second in each case.",
        steps: [
          "Parallel: \\(\\dfrac{1}{R} = \\dfrac{1}{4} + \\dfrac{1}{6} + \\dfrac{1}{12} = \\dfrac{3 + 2 + 1}{12} = \\dfrac{1}{2}\\), so \\(R = 2\\) Ω.",
          "Current \\(= 12 \\div 2 = 6\\) A; heat per second \\(= V^{2}/R = 144 \\div 2 = 72\\) W.",
          "Series: \\(R = 4 + 6 + 12 = 22\\) Ω; current \\(= 12 \\div 22 \\approx 0.55\\) A.",
          "Heat per second \\(= 144 \\div 22 \\approx 6.5\\) W.",
        ],
        answer: "Parallel: 2 Ω, 6 A, 72 W. Series: 22 Ω, about 0.55 A, about 6.5 W.",
      },
      selfCheckExample: {
        prompt:
          "Resistors of 3 Ω and 6 Ω are joined in parallel, and this pair is joined in series with a 4 Ω resistor across a 12 V battery. Find the current from the battery.",
        steps: [
          "Parallel pair: \\(\\dfrac{3 \\times 6}{3 + 6} = 2\\) Ω.",
          "Total: \\(2 + 4 = 6\\) Ω.",
          "Current \\(= 12 \\div 6 = 2\\) A.",
        ],
        answer: "2 A",
      },
      pyqExampleId: "b568ce12-fe9c-4fed-a479-4130dd754208",
      practiceSet: [
        { prompt: "Five 10 Ω resistors are joined in series. What is the total resistance?", answer: "50 Ω" },
        { prompt: "Why are the lights and fans of a house joined in parallel rather than in series?", answer: "Each gets the full mains voltage and can be switched on or off by itself" },
        { prompt: "Two equal resistors give 20 Ω when joined in series. What do they give when joined in parallel?", answer: "5 Ω", method: "Each is 10 Ω; parallel gives 10 ÷ 2" },
        { prompt: "A charged capacitor sits in one branch of a steady DC circuit. How much current flows in that branch?", answer: "None" },
      ],
      traps: [
        {
          title: "The parallel total is smaller than the smallest resistor",
          body: "Adding a resistor **in parallel** always **lowers** the total, because it opens another path. If your parallel answer is bigger than the smallest resistor, the working has gone wrong.",
        },
        {
          title: "Most heat from a battery comes from the smallest total resistance",
          body: "Across a fixed voltage the heat per second is \\(V^{2}/R\\). The smallest \\(R\\), the **all-parallel** joining, gives the most heat. The rule \\(I^{2}R\\) (bigger \\(R\\), more heat) holds only when the **current** is fixed.",
        },
      ],
    },
  ],
};
