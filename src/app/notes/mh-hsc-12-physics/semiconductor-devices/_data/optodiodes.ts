import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SD_OPTODIODES_NOTE: SubtopicNote = {
  subtopicName: "Photodiode, Solar Cell and LED",
  title: "Photodiode, Solar Cell and LED",
  oneLineDefinition:
    "Three junction diodes that work with light: the photodiode that senses it in reverse bias, the solar cell that turns it into electrical power, and the LED that gives it out in forward bias.",
  whyItMatters:
    "15 questions, the most of any page. Seven were set in board papers: the multiple-choice question on when an LED emits light (2023, 2024), what an LED is with its circuit symbol (2024), four advantages of an LED (2025), what the dark current of a photodiode depends on (2025), the advantages and disadvantages of a photodiode (2026) and which device converts solar energy into electrical energy (2026). The textbook adds the working of each device, the construction of a solar cell and why a photodiode is reverse biased.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpsd-photodiode",
      name: "The photodiode",
      intuition:
        "A photodiode is a reverse biased diode with a window over its junction. In the dark only a tiny current of minority carriers flows. When light falls on the junction it makes electron-hole pairs there, the field of the depletion region pulls them apart, and the reverse current grows with the brightness of the light. So the current tells you how much light there is.",
      definition:
        "- **Photodiode:** a special p-n junction diode that converts light energy into electrical energy; also called a photodetector or photosensor. It is operated in **reverse bias**. The junction sits in glass so that only it is exposed to light; the rest is painted opaque or covered.\n" +
        "- **Dark current:** the reverse saturation current that flows even when no light falls on the diode. It is carried by minority carriers and depends only on the **concentration of the minority carriers**, not on the applied voltage.\n" +
        "- **Working:** photons with energy greater than the band gap create electron-hole pairs in the depletion region. The intrinsic field there separates them, more carriers become available, and the reverse current increases. The reverse current depends on the intensity of the light, linearly; at high intensity it becomes constant (the saturation current).\n" +
        "- Total current \\(=\\) photocurrent \\(+\\) dark current. A smaller dark current makes the device more sensitive.\n" +
        "- **Advantages (textbook):** quick response, linear response, high speed, light weight and compact size, wide spectral response (a silicon photodiode responds from 190 nm to 1100 nm), relatively low cost. **Disadvantages:** its properties depend on temperature; the reverse current is low at low light levels.\n" +
        "- **Uses:** counters and switches, burglar alarms, fibre optic communication, optocouplers, light meters, fire and smoke detectors.",
      formula: {
        label: "Dark resistance",
        latex: "R_d = \\frac{\\text{maximum reverse voltage}}{\\text{dark current}}",
      },
      authoredExample: {
        prompt:
          "A photodiode has a dark current of 2 μA when the maximum reverse voltage of 10 V is applied to it. Find its dark resistance.",
        steps: [
          "Given: maximum reverse voltage 10 V, dark current \\(2\\ \\mu\\text{A} = 2 \\times 10^{-6}\\) A.",
          "Formula: \\(R_d = \\dfrac{\\text{maximum reverse voltage}}{\\text{dark current}}\\).",
          "Substitution: \\(R_d = \\dfrac{10}{2 \\times 10^{-6}} = 5 \\times 10^{6}\\ \\Omega\\).",
        ],
        answer: "5 × 10⁶ Ω (5 MΩ)",
      },
      selfCheckExample: {
        prompt: "A reverse biased photodiode carries a total current of 25 μA when light falls on it. Its dark current is 1 μA. Find the photocurrent.",
        steps: ["Total current \\(=\\) photocurrent \\(+\\) dark current, so photocurrent \\(= 25 - 1\\)."],
        answer: "24 μA",
      },
      practiceSet: [
        { prompt: "What name is given to the current through a reverse biased photodiode when no light falls on it?", answer: "The dark current" },
        { prompt: "How does the reverse current of a photodiode change as the intensity of light increases?", answer: "It increases linearly, and becomes constant (saturates) at high intensity" },
        { prompt: "State two disadvantages of a photodiode.", answer: "Its properties depend on temperature, and its reverse current is low at low light levels" },
      ],
      pyqExampleId: "85705f79-16d4-4761-bace-69cb45a5db14",
      traps: [
        {
          title: "Forward biasing a photodiode",
          body: "A photodiode works in reverse bias. In forward bias a large current flows whether or not light falls on it, and the small change caused by light cannot be detected.",
        },
        {
          title: "Thinking the dark current comes from light",
          body: "The dark current flows with no light at all. It depends on the concentration of minority carriers, not on the applied voltage and not on the light.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsd-solar-cell",
      name: "The solar cell",
      intuition:
        "A solar cell is a large p-n junction left in the sun with no battery. Light makes electron-hole pairs near the junction, and the junction's own field sweeps the electrons to the n-side and the holes to the p-side before they can recombine. Charge piles up on the two sides, which gives a voltage, and that voltage drives a current through any load joined across the cell.",
      definition:
        "- **Principle:** photovoltaic action. A solar (photovoltaic) cell converts solar energy directly into electrical energy and works as a source of DC power.\n" +
        "- **Construction:** a p-n junction. The **thin n-side faces the light** (so the light reaches the depletion region) and the thicker p-side is at the back. Both sides are coated with a conducting material: the **front contact** on the n-side and the **back (rear) contact** on the p-side. The n-side has an **antireflection coating** that lets visible light in and reflects infrared (heat), protecting the cell from heating.\n" +
        "- **Working:** 1) electron-hole pairs are generated in the depletion region; 2) they are separated and collected at the cathode and the anode; 3) the charges accumulate and give a voltage across the cell; 4) the power is used in the load.\n" +
        "- A pair is produced only if the photon's energy is greater than the band gap: \\(E = \\dfrac{hc}{\\lambda} > E_g\\).\n" +
        "- **I-V characteristic:** drawn in the fourth quadrant, because the cell supplies current to the load. It cuts the current axis at the short-circuit current \\(I_{sc}\\) and the voltage axis at the open-circuit voltage \\(V_{oc}\\); the power is zero at both and maximum at one point between.\n" +
        "- **Choice of material:** band gap between 1.0 eV and 1.8 eV, high optical absorption, good electrical conductivity, easily available. Si (1.1 eV) is most used; also GaAs (1.43 eV), CdTe (1.45 eV), CuInSe (1.04 eV).\n" +
        "- **Uses:** charging batteries by day for use at night, power at remote places, calculators, satellites and space stations, traffic signals, communication stations, and the Lux meter.",
      formula: {
        label: "Condition for a pair to be produced",
        latex: "E = \\frac{hc}{\\lambda} > E_g, \\qquad \\lambda_{\\max} = \\frac{hc}{E_g}",
        symbols: [
          { symbol: "\\(E_g\\)", meaning: "band gap of the semiconductor" },
          { symbol: "\\(hc\\)", meaning: "Planck's constant times the speed of light, 1240 eV nm" },
        ],
      },
      authoredExample: {
        prompt:
          "Can light of wavelength 1000 nm produce electron-hole pairs in a silicon solar cell (band gap 1.1 eV)? Take \\(hc = 1240\\) eV nm.",
        steps: [
          "Given: \\(\\lambda = 1000\\) nm, \\(E_g = 1.1\\) eV, \\(hc = 1240\\) eV nm.",
          "Formula: photon energy \\(E = \\dfrac{hc}{\\lambda}\\).",
          "Substitution: \\(E = \\dfrac{1240}{1000} = 1.24\\) eV.",
          "Since \\(1.24\\) eV \\(> 1.1\\) eV, each photon can create an electron-hole pair.",
        ],
        answer: "Yes: each photon carries 1.24 eV, more than the 1.1 eV band gap",
      },
      selfCheckExample: {
        prompt: "Find the longest wavelength of light that can produce electron-hole pairs in a GaAs solar cell (band gap 1.43 eV). Take \\(hc = 1240\\) eV nm.",
        steps: ["\\(\\lambda_{\\max} = \\dfrac{hc}{E_g} = \\dfrac{1240}{1.43}\\)."],
        answer: "About 867 nm",
      },
      practiceSet: [
        { prompt: "In which quadrant is the I-V characteristic of a solar cell drawn, and why?", answer: "The fourth quadrant, because the cell supplies current to the load" },
        { prompt: "Why is the n-side of a solar cell made thin?", answer: "So that the light reaches the depletion region, where the electron-hole pairs are generated" },
        { prompt: "What does the antireflection coating on a solar cell do?", answer: "It lets visible light in and reflects infrared (heat), protecting the cell from heating" },
      ],
      pyqExampleId: "75d0b8a8-1fe4-428f-a68f-7441268f0e6c",
      traps: [
        {
          title: "Recombination as the principle",
          body: "A solar cell works by photovoltaic action. Recombination is what the cell PREVENTS: the junction field separates the carriers so that they do not recombine.",
        },
        {
          title: "Maximum power at short circuit",
          body: "The power delivered is zero both at short circuit and at open circuit. It is largest at one point between them on the I-V curve.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsd-led",
      name: "The light emitting diode",
      intuition:
        "An LED does the opposite of a photodiode: it turns electrical energy into light. Forward bias pushes electrons and holes into the junction region, where they recombine. Each electron falls from the conduction band to the valence band and gives out the energy as a photon, about equal to the band gap. Choose the band gap and you choose the colour.",
      definition:
        "- **LED:** a p-n junction diode that emits light when a large **forward** current passes through it.\n" +
        "- **Construction:** the n-region is more heavily doped than the p-region. The junction is in a dome-shaped transparent case, so the light comes out evenly and internal reflection is small. The longer leg is the anode (positive).\n" +
        "- **Working:** in forward bias, electrons from the conduction band recombine with holes from the valence band and the energy is released as photons. The light is monochromatic (one colour). The light output is directly proportional to the forward current.\n" +
        "- **Colour:** set by the band gap, so by the material and the proportions of its elements: AlGaAs infrared, GaAsP red or yellow, AlGaP red or green, ZnSe blue.\n" +
        "- **I-V characteristic:** like the forward characteristic of an ordinary diode; it conducts after its cut-in voltage. Its forward voltage drop is about 1.5 V to 3.5 V, and its current rating is only a few tens of milliamperes, so a resistance is always joined in series with it.\n" +
        "- **Circuit symbol:** the diode symbol (triangle for the anode, bar for the cathode) with **two arrows pointing away** from it, for the light going out.",
      formula: {
        label: "Wavelength of the light emitted",
        latex: "E_g = h\\nu = \\frac{hc}{\\lambda} \\quad \\Rightarrow \\quad \\lambda = \\frac{hc}{E_g}",
      },
      authoredExample: {
        prompt:
          "An LED is made from a semiconductor of band gap 1.9 eV. Find the wavelength of the light it emits and say whether the light is visible. Take \\(hc = 1240\\) eV nm.",
        steps: [
          "Given: \\(E_g = 1.9\\) eV, \\(hc = 1240\\) eV nm.",
          "Formula: \\(\\lambda = \\dfrac{hc}{E_g}\\).",
          "Substitution: \\(\\lambda = \\dfrac{1240}{1.9} = 653\\) nm.",
          "653 nm lies in the visible range (red light).",
        ],
        answer: "About 653 nm: visible red light",
      },
      selfCheckExample: {
        prompt: "An LED gives out light of wavelength 620 nm. Find the band gap of its material. Take \\(hc = 1240\\) eV nm.",
        steps: ["\\(E_g = \\dfrac{hc}{\\lambda} = \\dfrac{1240}{620}\\)."],
        answer: "2.0 eV",
      },
      practiceSet: [
        { prompt: "Why must a resistance be joined in series with an LED?", answer: "Its current rating is only a few tens of milliamperes, so the current must be limited" },
        { prompt: "Name the material used to make an LED that gives blue light.", answer: "Zinc selenide (ZnSe)" },
        { prompt: "How does the light output of an LED depend on the forward current?", answer: "It is directly proportional to it" },
        { prompt: "On what does the wavelength of the light from an LED depend?", answer: "On the band gap of its material, that is, on the material and the proportions of its elements" },
      ],
      pyqExampleId: "643200f5-a6e4-4e9e-945a-f811cda0b0d8",
      traps: [
        {
          title: "Arrows the wrong way on the symbol",
          body: "In the LED symbol the two arrows point AWAY from the diode, because light leaves it. Arrows pointing towards the diode are the photodiode's symbol.",
        },
        {
          title: "Reverse bias or heat as the cause of light",
          body: "An LED gives light only in forward bias, when electrons and holes recombine. Reverse bias just widens the depletion region, and heat is a loss, not the source of the light.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpsd-led-advantages",
      name: "Advantages and uses of LEDs",
      intuition:
        "An LED has no filament to heat and nothing to break. That one fact explains most of its advantages: it wastes little power, lasts very long, survives knocks and lights up at once.",
      definition:
        "- For 'state any four advantages', give four rows of the table, each with its reason.\n" +
        "- **Disadvantages (textbook):** hazardous blue light, dependence on temperature, sensitivity to voltage, high initial cost.\n" +
        "- **Uses:** burglar alarms, counters, optical communication, indicator lamps, mobile phone display screens, LED television, vehicle head lamps, home and street lighting, seven segment displays in calculators and watches.",
      table: {
        columns: ["Advantage", "What it means"],
        rows: [
          {
            cells: ["Energy efficient", "More light for less electrical power: about 135 lumens per watt"],
            pyqExampleId: "a1a1bc72-6df8-4ba2-9d65-145608bb4cbd",
            noteAmber: "Board 2025 asked for any four advantages of an LED.",
          },
          { cells: ["Long lifetime", "50,000 hours or more if properly made"] },
          { cells: ["Rugged", "A solid state light: no filament, tube or bulb to break"] },
          { cells: ["Almost no warm-up period", "Starts emitting light within nanoseconds"] },
          { cells: ["Excellent colour rendering", "Its colours do not fade, so it suits displays"] },
          { cells: ["Environment friendly", "Contains no mercury or other hazardous substances"] },
          { cells: ["Controllable", "Its brightness and colour can be controlled"] },
        ],
      },
      practiceSet: [
        { prompt: "State two disadvantages of an LED.", answer: "Any two: hazardous blue light, dependence on temperature, sensitivity to voltage, high initial cost" },
        { prompt: "Name two uses of LEDs.", answer: "Any two: indicator lamps, displays, street lighting, vehicle head lamps, optical communication" },
      ],
      traps: [
        {
          title: "Writing uses when advantages are asked",
          body: "'Street lighting' is a use, not an advantage. An advantage says what makes the LED better: efficient, long-lived, rugged, instant.",
        },
      ],
    },
  ],
};
