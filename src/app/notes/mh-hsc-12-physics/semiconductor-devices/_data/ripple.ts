import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SD_RIPPLE_NOTE: SubtopicNote = {
  subtopicName: "Ripple Factor and Filter Circuits",
  title: "Ripple Factor and Filter Circuits",
  oneLineDefinition:
    "What the ripple in a rectifier's output is, how the ripple factor measures it, how a capacitor filter smooths it, and the difference between an unregulated and a regulated power supply.",
  whyItMatters:
    "1 question, from the textbook: why a power supply needs filters. No board paper in this bank has set this section, but its definitions are short answers that link the rectifier to the Zener regulator on the next page.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpsd-ripple-filter",
      name: "Ripple factor and the capacitor filter",
      intuition:
        "A rectifier's output always flows one way, but it rises and falls with every pulse. Think of it as a steady DC level with a small AC wobble riding on top: that wobble is the ripple. A capacitor placed across the load fills up at each peak and empties slowly between peaks, so it fills in the dips and the output becomes nearly steady.",
      definition:
        "- **Ripple:** the small AC component present along with the DC in a rectifier's output. It makes the output fluctuate, and it is undesirable.\n" +
        "- **Ripple factor:** the ratio of the r.m.s. value of the AC component to the value of the DC component. A smaller ripple means a more effective rectifier. A full wave rectifier has less ripple than a half wave rectifier.\n" +
        "- **Filter circuit:** a circuit that removes the AC component (the ripple) from the rectifier output and allows only the DC component.\n" +
        "- **Capacitor filter:** the capacitor is joined across the load. In the first quarter cycle it charges to the peak voltage \\(V_p\\). As the rectifier voltage falls, it discharges slowly through the load, so the load voltage drops only a little before the next peak recharges it. It is cheap, small and light, suits small load currents, and is used in battery eliminators.\n" +
        "- **Unregulated supply:** its output changes when a load is connected. **Regulated supply:** its output stays steady even after a load is connected. The filtered output is still unregulated; a Zener regulator makes it steady.",
      formula: {
        label: "Ripple factor",
        latex: "\\text{Ripple factor} = \\frac{\\text{r.m.s. value of AC component}}{\\text{value of DC component}}",
      },
      authoredExample: {
        prompt:
          "The output of a rectifier has a DC component of 12 V and an AC component of r.m.s. value 0.6 V. Find the ripple factor. A filter then reduces the AC component to 0.06 V r.m.s. with the same DC component. Find the new ripple factor.",
        steps: [
          "Given: DC component 12 V; AC component 0.6 V r.m.s., then 0.06 V r.m.s.",
          "Formula: ripple factor \\(= \\dfrac{\\text{r.m.s. value of AC component}}{\\text{value of DC component}}\\).",
          "Before the filter: \\(\\dfrac{0.6}{12} = 0.05\\).",
          "After the filter: \\(\\dfrac{0.06}{12} = 0.005\\). The ripple factor has no unit, since it is a ratio of two voltages.",
        ],
        answer: "0.05 before the filter; 0.005 after it",
      },
      selfCheckExample: {
        prompt: "A rectifier output has a DC value of 20 V and a ripple factor of 0.04. Find the r.m.s. value of its AC component.",
        steps: ["r.m.s. value of AC component \\(=\\) ripple factor \\(\\times\\) DC value \\(= 0.04 \\times 20\\)."],
        answer: "0.8 V",
      },
      practiceSet: [
        { prompt: "What does a filter circuit remove from the output of a rectifier?", answer: "The AC component, that is, the ripple" },
        { prompt: "Which type of filter is commonly used in battery eliminators?", answer: "The capacitor filter" },
        { prompt: "What name is given to a power supply whose output voltage drops when a load is connected?", answer: "An unregulated power supply" },
      ],
      pyqExampleId: "4ba6de47-6017-432e-857f-4c7b1a835bc7",
      traps: [
        {
          title: "Turning the ripple factor upside down",
          body: "The ripple factor is the AC part divided by the DC part, so a good supply has a SMALL ripple factor. DC divided by AC gives a large number and the wrong answer.",
        },
        {
          title: "Thinking a filter regulates",
          body: "A capacitor filter smooths the pulses, but its output still drops when the load changes: it is unregulated. A regulator, such as a Zener diode, is needed to hold the voltage steady.",
        },
      ],
    },
  ],
};
