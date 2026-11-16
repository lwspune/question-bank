import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_DN_PHOTOELECTRIC_NOTE: SubtopicNote = {
  subtopicName: "Photoelectric Effect",
  title: "Photoelectric Effect",
  oneLineDefinition:
    "Electrons knocked out of a metal by light: how the photocurrent and the stopping potential respond to intensity and frequency, the work function and threshold, and Einstein's equation Kmax = hν − φ₀.",
  whyItMatters:
    "Seven NEET questions from 2022 to 2026. Two read the experiment (current against intensity in 2025, current and stopping potential as the lamp dims in Re-NEET 2026), two use the threshold (which metals emit in 2023, which wavelength fails in 2026) and three use Einstein's equation: a threshold frequency from two stopping potentials (2022), a maximum kinetic energy (Re-NEET 2024) and three cells compared (Re-NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nphdn-photo-laws",
      name: "What intensity and frequency change",
      intuition:
        "Shine light on a clean metal plate inside an evacuated tube and electrons fly out to a collector plate, making a photocurrent. Make the collector more positive and the current rises to a steady saturation value. Make it negative and fewer electrons reach it, until at the stopping potential even the fastest ones are turned back. Two things can be changed about the light, and they do different jobs: intensity sets how many electrons come out, frequency sets how fast the fastest ones are.",
      definition:
        "- Electrons leave a metal only when given at least a minimum energy, the **work function**. Heat (thermionic emission), a strong field (field emission) or light (photoelectric emission) can supply it.\n" +
        "- Zinc, cadmium and magnesium give photoelectrons only with ultraviolet light; alkali metals such as sodium and caesium give them with visible light too.\n" +
        "- **Photocurrent** is directly proportional to the intensity of the light, at a fixed frequency.\n" +
        "- **Stopping potential** \\(V_0\\) is the negative collector potential that just makes the photocurrent zero: \\(eV_0 = K_{\\max}\\). It does not depend on the intensity; it rises with the frequency.\n" +
        "- Below a **threshold frequency** \\(\\nu_0\\) there is no emission, however intense the light. Above it, emission starts at once, with a delay of \\(10^{-9}\\) s or less.",
      table: {
        columns: ["What you change", "Photocurrent", "Stopping potential and maximum KE"],
        rows: [
          { cells: ["Intensity up, frequency fixed", "rises in proportion", "no change"] },
          { cells: ["Frequency up, above threshold", "still flows", "both rise"] },
          { cells: ["Frequency below threshold", "zero, however bright the light", "no electrons come out"] },
          { cells: ["Source moved farther away", "falls, since the intensity falls", "no change"] },
          { cells: ["Collector made more negative", "falls, and is zero at \\(-V_0\\)", "\\(V_0\\) is fixed by the frequency and the metal"] },
        ],
        caption: "Intensity controls how many electrons come out; frequency controls how much energy the fastest one has.",
      },
      selfCheckExample: {
        prompt:
          "Blue light ejects electrons from a metal but yellow light does not. Will a very bright yellow lamp eject electrons?",
        steps: [
          "Whether an electron comes out depends on the energy of one photon, \\(h\\nu\\), not on how many photons arrive.",
          "Yellow light is below this metal's threshold frequency, so making it brighter only adds more photons that are each too weak.",
        ],
        answer: "No; intensity cannot make up for a frequency below the threshold",
      },
      practiceSet: [
        { prompt: "What is meant by the stopping potential in a photoelectric experiment?", answer: "The negative collector potential at which the photocurrent just becomes zero" },
        { prompt: "Name two metals that give photoelectrons with visible light.", answer: "Any two alkali metals, such as sodium and caesium" },
        { prompt: "How soon after light falls on the metal do photoelectrons come out?", answer: "At once; the delay is \\(10^{-9}\\) s or less" },
        { prompt: "At a fixed frequency above threshold, how does the photocurrent depend on the intensity of the light?", answer: "It is directly proportional to it" },
      ],
      pyqExampleId: "6f6f8c64-0d79-47ee-be2e-95ffe9f57cae",
      traps: [
        {
          title: "Intensity never moves the stopping potential",
          body: "Brighter light gives more photoelectrons and a larger current, but the same maximum kinetic energy and the same stopping potential.",
        },
        {
          title: "No emission below the threshold",
          body: "Below the threshold frequency no electron comes out, however intense the light or however long it shines. Waiting longer does not help.",
        },
        {
          title: "Distance only changes the intensity",
          body: "Moving a lamp farther from the cell lowers the intensity at the cell. The current falls; the stopping potential stays the same.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphdn-threshold",
      name: "Work function and threshold",
      intuition:
        "An electron is held inside a metal, and the work function is the smallest energy that can pull one out through the surface. One photon gives its energy to one electron. If that photon's energy is less than the work function, nothing happens, however many photons arrive. The threshold frequency and threshold wavelength mark exactly where the photon energy equals the work function.",
      definition:
        "- **Work function** \\(\\phi_0\\): the least energy needed to free an electron from the metal surface. It depends on the metal and on the state of its surface.\n" +
        "- Threshold frequency: \\(\\nu_0 = \\dfrac{\\phi_0}{h}\\). Threshold wavelength: \\(\\lambda_0 = \\dfrac{hc}{\\phi_0}\\).\n" +
        "- Emission happens only if \\(\\nu \\ge \\nu_0\\), that is, \\(\\lambda \\le \\lambda_0\\).\n" +
        "- Quick rule: \\(\\lambda_0\\,(\\text{nm}) = \\dfrac{1240}{\\phi_0\\,(\\text{eV})}\\).\n" +
        "- Some work functions: caesium 2.14 eV, potassium 2.30 eV, sodium 2.75 eV. Caesium has the smallest of the common metals.",
      formula: {
        label: "Threshold",
        latex: "\\phi_0 = h\\nu_0 = \\frac{hc}{\\lambda_0}, \\qquad \\lambda_0\\,(\\text{nm}) = \\frac{1240}{\\phi_0\\,(\\text{eV})}",
        symbols: [
          { symbol: "\\(\\phi_0\\)", meaning: "work function of the metal" },
          { symbol: "\\(\\nu_0\\)", meaning: "threshold frequency" },
          { symbol: "\\(\\lambda_0\\)", meaning: "threshold wavelength" },
        ],
      },
      authoredExample: {
        prompt:
          "The threshold frequency of a metal is \\(5 \\times 10^{14}\\) Hz. Find its work function in eV. (\\(h = 6.6 \\times 10^{-34}\\) J s)",
        steps: [
          "\\(\\phi_0 = h\\nu_0 = 6.6 \\times 10^{-34} \\times 5 \\times 10^{14} = 3.3 \\times 10^{-19}\\) J.",
          "In eV: \\(\\dfrac{3.3 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 2.06\\) eV.",
        ],
        answer: "About 2.06 eV",
      },
      selfCheckExample: {
        prompt: "The threshold wavelength of a metal is 310 nm. What is its work function in eV?",
        steps: [
          "\\(\\phi_0\\,(\\text{eV}) = \\dfrac{1240}{\\lambda_0\\,(\\text{nm})} = \\dfrac{1240}{310}\\).",
          "\\(\\phi_0 = 4.0\\) eV.",
        ],
        answer: "4.0 eV",
      },
      practiceSet: [
        { prompt: "What is the work function of a metal?", answer: "The least energy needed to free an electron from its surface" },
        { prompt: "Two metals have work functions 2 eV and 4 eV. What is the ratio of their threshold wavelengths, first to second?", answer: "2 : 1" },
        { prompt: "Convert a work function of \\(4.8 \\times 10^{-19}\\) J into eV.", answer: "3 eV" },
        { prompt: "Caesium's work function is 2.14 eV and sodium's is 2.75 eV. Which metal has the longer threshold wavelength?", answer: "Caesium" },
      ],
      pyqExampleId: "3fa260a2-c078-451f-9b9e-dc253fff9c86",
      traps: [
        {
          title: "Shorter wavelength, more energy",
          body: "Light ejects electrons only if its wavelength is shorter than the threshold wavelength \\(\\lambda_0\\). A wavelength longer than \\(\\lambda_0\\) fails however bright the light.",
        },
        {
          title: "A smaller work function means a longer threshold wavelength",
          body: "\\(\\lambda_0 = hc/\\phi_0\\), so the metal that frees electrons most easily is the one that still works with the longest, reddest light.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphdn-einstein",
      name: "Einstein's photoelectric equation",
      intuition:
        "One photon gives all its energy \\(h\\nu\\) to one electron. Part of it, at least the work function, is spent getting out of the metal. Whatever is left is kinetic energy. The electrons nearest the surface lose the least, so they come out fastest, with the maximum kinetic energy. The stopping potential is just the voltage that can turn back these fastest electrons.",
      definition:
        "- \\(K_{\\max} = h\\nu - \\phi_0 = h(\\nu - \\nu_0)\\).\n" +
        "- \\(K_{\\max} = eV_0\\), so \\(V_0 = \\dfrac{h}{e}\\nu - \\dfrac{\\phi_0}{e}\\). In eV and volts: \\(V_0\\) in volts equals \\(h\\nu - \\phi_0\\) in eV.\n" +
        "- Graph of \\(V_0\\) against \\(\\nu\\): a straight line of slope \\(\\dfrac{h}{e}\\), the same for every metal, cutting the frequency axis at \\(\\nu_0\\).\n" +
        "- Graph of \\(K_{\\max}\\) against \\(\\nu\\): a straight line of slope h, again cutting the frequency axis at \\(\\nu_0\\).\n" +
        "- Electrons come out with every energy from zero up to \\(K_{\\max}\\).",
      formula: {
        label: "Einstein's equation",
        latex: "K_{\\max} = h\\nu - \\phi_0 = eV_0, \\qquad V_0 = \\frac{h}{e}\\,\\nu - \\frac{\\phi_0}{e}",
        symbols: [
          { symbol: "\\(K_{\\max}\\)", meaning: "largest kinetic energy of the photoelectrons" },
          { symbol: "\\(V_0\\)", meaning: "stopping potential" },
          { symbol: "\\(\\phi_0\\)", meaning: "work function" },
        ],
      },
      authoredExample: {
        prompt:
          "Light of wavelength 310 nm falls on a metal of work function 2.5 eV. Find the maximum kinetic energy of the photoelectrons and the stopping potential.",
        steps: [
          "Photon energy: \\(\\dfrac{1240}{310} = 4.0\\) eV.",
          "\\(K_{\\max} = 4.0 - 2.5 = 1.5\\) eV.",
          "\\(eV_0 = 1.5\\) eV, so \\(V_0 = 1.5\\) V.",
        ],
        answer: "1.5 eV and 1.5 V",
      },
      selfCheckExample: {
        prompt:
          "Light of frequency \\(\\nu\\) gives photoelectrons of maximum kinetic energy \\(K\\) from a metal. Light of frequency \\(2\\nu\\) gives \\(3K\\). Find the threshold frequency.",
        steps: [
          "\\(K = h\\nu - h\\nu_0\\) and \\(3K = 2h\\nu - h\\nu_0\\).",
          "Three times the first: \\(3h\\nu - 3h\\nu_0 = 2h\\nu - h\\nu_0\\), so \\(h\\nu = 2h\\nu_0\\).",
          "\\(\\nu_0 = \\dfrac{\\nu}{2}\\).",
        ],
        answer: "\\(\\nu_0 = \\nu/2\\)",
      },
      practiceSet: [
        { prompt: "Photons of 5 eV fall on a metal of work function 3 eV. What is the stopping potential?", answer: "2 V" },
        { prompt: "What is the slope of the graph of stopping potential against frequency?", answer: "\\(h/e\\)" },
        { prompt: "Light above the threshold has its frequency doubled. Does the maximum kinetic energy of the photoelectrons double?", answer: "No; it becomes \\(2K_{\\max} + \\phi_0\\), more than double" },
        { prompt: "A metal's threshold frequency is \\(4 \\times 10^{14}\\) Hz and light of \\(6 \\times 10^{14}\\) Hz falls on it. Find the maximum kinetic energy. (\\(h = 6.6 \\times 10^{-34}\\) J s)", answer: "\\(1.32 \\times 10^{-19}\\) J" },
      ],
      pyqExampleId: "6e3e6953-fc26-4c63-ac19-8a0fe9290b1d",
      traps: [
        {
          title: "Maximum, not every electron's energy",
          body: "\\(h\\nu - \\phi_0\\) is the largest kinetic energy. Electrons from deeper inside lose more on the way out and come out slower, down to zero.",
        },
        {
          title: "eV and volts match one for one",
          body: "A maximum kinetic energy of 1.5 eV means a stopping potential of 1.5 V. Converting to joules and back is not needed.",
        },
        {
          title: "Every metal gives the same slope",
          body: "The lines of \\(V_0\\) against \\(\\nu\\) for different metals are parallel, all with slope \\(h/e\\). Only where they cut the frequency axis, \\(\\nu_0\\), changes.",
        },
      ],
    },
  ],
};
