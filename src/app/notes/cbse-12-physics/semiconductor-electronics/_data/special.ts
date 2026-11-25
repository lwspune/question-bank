import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_SE_SPECIAL_NOTE: SubtopicNote = {
  subtopicName: "Special Purpose p-n Junction Diodes",
  title: "Special Purpose p-n Junction Diodes",
  oneLineDefinition:
    "Three p-n junctions built for light: the LED, which gives out light in forward bias; the photodiode, which detects light in reverse bias; and the solar cell, which makes an emf from light with no bias at all. The present NCERT book does not cover them.",
  whyItMatters:
    "8 questions, all from the 2022 board papers; none came from 2023 to 2026, and the present NCERT book does not teach these devices. Three asked about the LED (its working, uses, advantages and disadvantages), two about the photodiode (why it is used in reverse bias, its uses, its circuit and how it measures light intensity) and three about the solar cell (the three processes that make its emf, its I-V graph and its circuit). Learn the short version here and give this page less time than the rest of the chapter.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpse-led",
      name: "Light emitting diode (LED)",
      intuition:
        "An LED runs a p-n junction backwards from a solar cell. Forward bias pushes electrons and holes towards each other across the junction. When an electron drops into a hole it gives up its energy as a photon of light. The photon's energy is about the band gap, so the material sets the colour.",
      definition:
        "- **Board 2022 only:** the board asked the LED three times in 2022. The present NCERT book does not cover the LED, so learn this briefly.\n" +
        "- **What it is:** a heavily doped p-n junction that gives out light when forward biased, sealed in a transparent cover.\n" +
        "- **Working:** in forward bias, electrons move from n to p and holes from p to n, so near the junction the minority carriers increase. They recombine with majority carriers, and the energy released comes out as photons with energy equal to or slightly less than the band gap.\n" +
        "- **Photon energy and wavelength:** \\(E = \\dfrac{hc}{\\lambda}\\), which in handy units is \\(\\lambda\\) (in nm) \\(\\approx \\dfrac{1240}{E\\ (\\text{in eV})}\\).\n" +
        "- **Colour:** for visible light the band gap must be about 1.8 eV to 3 eV. GaAsP is used for red light, and GaAs (band gap about 1.4 eV) for infrared.\n" +
        "- The light grows with the forward current up to a maximum and then falls. The reverse breakdown voltage is very low (about 5 V), so a high reverse voltage must not appear across it.",
      table: {
        columns: ["Point", "LED"],
        rows: [
          { cells: ["Bias in use", "Forward bias"] },
          { cells: ["How light is made", "Electrons and holes recombine near the junction and give out photons of energy about \\(E_g\\)"] },
          {
            cells: ["Advantages over a filament bulb", "Low operating voltage and low power; fast action with no warm-up time; nearly one colour of light; long life and ruggedness; fast on-off switching"],
            pyqExampleId: "5495eb7e-054b-4517-ba3e-50e9144c7a74",
            noteAmber: "Board 2022 asked the device that turns electrical energy into light, and three of its advantages.",
          },
          {
            cells: ["Limits", "Gives only a narrow band of colours, so one LED cannot give white light directly; damaged by too much current or by a reverse voltage above about 5 V"],
            pyqExampleId: "d8aa8ba4-72e2-463b-92b7-9ddfd35082af",
            noteAmber: "Board 2022 asked the working principle with two advantages and two disadvantages.",
          },
          { cells: ["Uses", "Indicator lamps, displays, remote controls, burglar alarms, optical communication"] },
        ],
      },
      selfCheckExample: {
        prompt: "The semiconductor in an LED has a band gap of 2.0 eV. Will it give visible light? (Use \\(\\lambda\\) in nm \\(\\approx 1240 / E\\) in eV.)",
        steps: ["\\(\\lambda \\approx \\dfrac{1240}{2.0} = 620\\) nm.", "Visible light is about 400 nm to 700 nm, so 620 nm (red-orange) is visible."],
        answer: "Yes: about 620 nm, red-orange light",
      },
      practiceSet: [
        { prompt: "In which bias is an LED used?", answer: "Forward bias" },
        { prompt: "What decides the colour of the light from an LED?", answer: "The band gap of its semiconductor" },
        { prompt: "Why must an LED be protected from a reverse voltage?", answer: "Its reverse breakdown voltage is very low, about 5 V" },
      ],
      pyqExampleId: "af331684-f862-460d-bdaa-89731cc64c00",
      traps: [
        {
          title: "Putting an LED in reverse bias",
          body: "The LED is the one device here used in FORWARD bias. Light comes from recombination, which needs carriers pushed across the junction.",
        },
        {
          title: "Uses written as one word",
          body: "'Uses: lighting' earns little. Name two clear uses, such as indicator lamps and remote controls.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpse-photodiode",
      name: "Photodiode",
      intuition:
        "A photodiode is a junction with a window. Light of enough energy makes electron-hole pairs at the junction, and the junction's field pulls them apart into a current. In reverse bias the dark current is tiny, so the extra current from light changes it by a large fraction, which is easy to measure. In forward bias the same extra current would be lost in a large current.",
      definition:
        "- **Board 2022 only:** asked twice in 2022. The present NCERT book does not cover the photodiode, so learn this briefly.\n" +
        "- **What it is:** a p-n junction with a transparent window so that light can fall on the junction. It is used in **reverse bias**.\n" +
        "- **Working:** light of photon energy \\(h\\nu > E_g\\) makes electron-hole pairs in or near the depletion region. The junction field separates them before they recombine: electrons go to the n-side, holes to the p-side. This adds to the reverse current, and the photocurrent grows with the intensity of the light.\n" +
        "- **Why reverse bias:** light makes equal numbers of extra electrons and holes. On the n-side these extra holes are a large FRACTION of the few minority holes, but a tiny fraction of the many majority electrons. The reverse current is carried by minority carriers, so light changes it by a large fraction, which is easy to detect. The forward current is carried by majority carriers, so light hardly changes it.\n" +
        "- **I-V graph in words:** drawn in the third quadrant: reverse voltage to the left, reverse current downward in μA. One flat curve for each light intensity; the brighter the light, the larger the reverse current.\n" +
        "- **Measuring light intensity:** keep the reverse bias fixed; the reverse current read on a microammeter rises in step with the intensity.",
      table: {
        columns: ["Point", "Photodiode"],
        rows: [
          { cells: ["Bias in use", "Reverse bias"] },
          { cells: ["What light does", "Makes electron-hole pairs near the junction, raising the reverse current"] },
          {
            cells: ["Circuit", "Photodiode in reverse bias with a battery and a microammeter in series, light falling on the junction"],
            pyqExampleId: "98acfd5d-0b4e-4caa-aab6-922d4dc81011",
            noteAmber: "Board 2022 asked the circuit, the I-V graph and how a photodiode measures light intensity.",
          },
          { cells: ["Uses", "Detecting optical signals (optical communication), measuring light intensity, light-operated switches"] },
        ],
      },
      selfCheckExample: {
        prompt: "Light falls on a reverse-biased photodiode and is then made brighter. What happens to the reverse current, and why?",
        steps: ["Brighter light makes more electron-hole pairs at the junction.", "More carriers are swept across, so the reverse current rises."],
        answer: "It increases, because more electron-hole pairs are made at the junction",
      },
      practiceSet: [
        { prompt: "In which quadrant is the I-V graph of a photodiode drawn?", answer: "The third quadrant" },
        { prompt: "What is the least photon energy that a photodiode can detect?", answer: "Energy equal to the band gap: \\(h\\nu\\) must be more than \\(E_g\\)" },
        { prompt: "Name two uses of a photodiode.", answer: "Detecting optical signals, and measuring light intensity" },
      ],
      pyqExampleId: "a7668196-ea24-44fb-89cc-a8964799de6b",
      traps: [
        {
          title: "Saying 'reverse bias because the current is small'",
          body: "The reason is the FRACTIONAL change. Light changes the small minority-carrier reverse current by a large fraction, which is easy to detect. Say that, not just 'the current is small'.",
        },
        {
          title: "Forward-biasing a photodiode in the circuit",
          body: "In the circuit diagram the p-side goes to the negative terminal. A forward-biased photodiode in the diagram loses the mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpse-solar-cell",
      name: "Solar cell",
      intuition:
        "A solar cell is a photodiode with no battery and a large window. Light makes electron-hole pairs at the junction, the junction's own field pushes electrons to the n-side and holes to the p-side, and the two sides become charged. That charge separation is an emf, and it can drive current through a load.",
      definition:
        "- **Board 2022 only:** asked three times in 2022. The present NCERT book does not cover the solar cell, so learn this briefly.\n" +
        "- **What it is:** a p-n junction that makes an emf when sunlight falls on it. It works like a photodiode, but with **no external bias** and a much **larger junction area**, with a thin top layer so light reaches the junction.\n" +
        "- The emf comes from three processes, one after another.\n" +
        "- **Generation:** light with \\(h\\nu > E_g\\) makes electron-hole pairs close to the junction.\n" +
        "- **Separation:** the field of the depletion region sweeps electrons to the n-side and holes to the p-side.\n" +
        "- **Collection:** electrons reaching the n-side are collected by the front contact and holes reaching the p-side by the back contact. The p-side becomes positive and the n-side negative, giving the photovoltage.\n" +
        "- **I-V graph in words:** drawn in the fourth quadrant, because the cell supplies current to a load rather than drawing it. The curve meets the voltage axis at the open-circuit voltage \\(V_{OC}\\) (no current) and the current axis at the short-circuit current \\(I_{SC}\\) (no voltage).\n" +
        "- **Materials:** a band gap of about 1.0 to 1.8 eV suits sunlight; Si, GaAs and CdTe are used.",
      table: {
        columns: ["Point", "Solar cell"],
        rows: [
          { cells: ["Bias in use", "None: the light itself makes the emf"] },
          { cells: ["Junction", "Large area, thin top layer"] },
          {
            cells: ["I-V graph", "Fourth quadrant; meets the axes at \\(V_{OC}\\) and \\(I_{SC}\\)"],
            pyqExampleId: "9a240370-f506-4635-8281-44428db8efac",
            noteAmber: "Board 2022 asked how the emf is made and the I-V characteristic, for five marks.",
          },
          { cells: ["Circuit", "The cell connected straight across a load resistance, with light falling on its junction"] },
          { cells: ["Uses", "Power for satellites and space vehicles, calculators"] },
        ],
      },
      selfCheckExample: {
        prompt: "In a working solar cell, which side becomes positive, and which carriers move there?",
        steps: ["The depletion field sweeps holes to the p-side and electrons to the n-side.", "Holes collect on the p-side."],
        answer: "The p-side becomes positive, because the holes are swept there",
      },
      practiceSet: [
        { prompt: "Why is the junction area of a solar cell made large?", answer: "So that more sunlight falls on it and more electron-hole pairs are made" },
        { prompt: "What does the point where a solar cell's I-V curve meets the voltage axis represent?", answer: "The open-circuit voltage: the emf of the cell when no current is drawn" },
        { prompt: "Name the three processes that produce the emf of a solar cell.", answer: "Generation, separation and collection" },
      ],
      pyqExampleId: "0213c968-b066-4669-a465-fa622ed5a429",
      traps: [
        {
          title: "Giving a solar cell a battery",
          body: "A solar cell has NO external bias. A battery in your diagram, or the word 'reverse biased', confuses it with a photodiode.",
        },
        {
          title: "Naming the processes without the field",
          body: "Separation is the step that makes the emf. Say that the depletion region's field pushes electrons to the n-side and holes to the p-side.",
        },
      ],
    },
  ],
};
