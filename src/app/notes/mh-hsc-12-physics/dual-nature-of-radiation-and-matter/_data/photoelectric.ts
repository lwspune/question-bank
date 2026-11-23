import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_DN_PHOTOELECTRIC_NOTE: SubtopicNote = {
  subtopicName: "Photoelectric Effect",
  title: "The Photoelectric Effect and Its Experiment",
  oneLineDefinition:
    "What the photoelectric effect is, the terms the board asks you to define (threshold frequency, work function, stopping potential), the experimental set-up, and why the wave theory failed to explain what was seen.",
  whyItMatters:
    "15 questions, nine of them from board papers from 2019 to 2026, two in 2026 alone. The board asks you to define the effect, the stopping potential, the threshold frequency and the work function (2019, 2020, 2026), to describe the experimental set-up with a neat labelled diagram (2023, and twice in 2024), whether red light is needed (2022), which metal works with visible light (2025), and what happens to the photocurrent when the frequency is raised (2026). The textbook adds microwaves, red light, the metal of Table 14.1 that needs the highest frequency, where extra intensity goes, and the wave theory's estimate of the delay.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpdn-pe-definitions",
      name: "Photoelectric effect, threshold frequency, work function and stopping potential",
      intuition:
        "A metal is full of free electrons, but they cannot leave through the surface unless they are given enough energy to cross the barrier that holds them in. Light can supply that energy. Whether it can free an electron depends on the frequency of the light, not on how bright it is. Four words carry the whole topic, and the board asks you to define each of them exactly.",
      definition:
        "- **Photoelectric effect:** the emission of electrons from a metal surface when radiation of appropriate frequency is incident on it. The surface is called a **photosensitive surface** and the emitted electrons are called **photoelectrons** (they are ordinary electrons).\n" +
        "- **Threshold frequency \\(\\nu_0\\):** the minimum frequency of the incident radiation below which no photoelectrons are emitted from a given metal, however intense the radiation. It is the same for a given metal and different for different metals.\n" +
        "- **Photoelectric work function \\(\\phi_0\\):** the minimum energy that must be supplied to an electron to pull it out of the metal from its surface. It depends on the metal and the nature of its surface, and is usually expressed in electronvolt (1 eV \\(= 1.6 \\times 10^{-19}\\) J).\n" +
        "- The two are linked: \\(\\phi_0 = h\\nu_0 = \\dfrac{hc}{\\lambda_0}\\), where \\(\\lambda_0\\) is the threshold wavelength.\n" +
        "- **Stopping potential \\(V_0\\):** the value of the negative (retarding) potential of the collector at which the photocurrent becomes zero. Then the fastest electron just fails to reach the collector, so \\(eV_0 = KE_{max}\\).\n" +
        "- The effect was discovered by Heinrich Hertz in 1887.",
      formula: {
        label: "Work function, threshold and stopping potential",
        latex: "\\phi_0 = h\\nu_0 = \\frac{hc}{\\lambda_0}, \\qquad eV_0 = KE_{max}",
        symbols: [
          { symbol: "\\(\\phi_0\\)", meaning: "photoelectric work function of the metal" },
          { symbol: "\\(\\nu_0\\)", meaning: "threshold frequency" },
          { symbol: "\\(\\lambda_0\\)", meaning: "threshold wavelength" },
          { symbol: "\\(V_0\\)", meaning: "stopping potential" },
        ],
      },
      authoredExample: {
        prompt:
          "The threshold frequency of a metal is \\(5.8 \\times 10^{14}\\) Hz. Find its photoelectric work function in joule and in electronvolt, and its threshold wavelength. (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Given: \\(\\nu_0 = 5.8 \\times 10^{14}\\) Hz, \\(h = 6.63 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^{8}\\) m/s.",
          "Formula: \\(\\phi_0 = h\\nu_0\\) and \\(\\lambda_0 = \\dfrac{c}{\\nu_0}\\).",
          "\\(\\phi_0 = 6.63 \\times 10^{-34} \\times 5.8 \\times 10^{14} = 3.845 \\times 10^{-19}\\) J.",
          "In electronvolt: \\(\\phi_0 = \\dfrac{3.845 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 2.40\\) eV.",
          "\\(\\lambda_0 = \\dfrac{3 \\times 10^{8}}{5.8 \\times 10^{14}} = 5.172 \\times 10^{-7}\\) m \\(= 5172\\) Å.",
        ],
        answer: "Work function \\(3.845 \\times 10^{-19}\\) J = 2.40 eV; threshold wavelength 5172 Å",
      },
      selfCheckExample: {
        prompt: "The work function of calcium is 2.9 eV. Find its threshold frequency. (\\(h = 6.63 \\times 10^{-34}\\) J s)",
        steps: [
          "\\(\\phi_0 = 2.9 \\times 1.6 \\times 10^{-19} = 4.64 \\times 10^{-19}\\) J.",
          "\\(\\nu_0 = \\dfrac{\\phi_0}{h} = \\dfrac{4.64 \\times 10^{-19}}{6.63 \\times 10^{-34}} = 7.0 \\times 10^{14}\\) Hz.",
        ],
        answer: "\\(7.0 \\times 10^{14}\\) Hz",
      },
      practiceSet: [
        { prompt: "What name is given to the electrons emitted in the photoelectric effect?", answer: "Photoelectrons (they are ordinary electrons)" },
        { prompt: "The threshold wavelength of a metal is 5000 Å. Find its threshold frequency.", answer: "\\(6 \\times 10^{14}\\) Hz" },
        { prompt: "In which unit is the work function of a metal usually expressed?", answer: "Electronvolt (eV)" },
        { prompt: "At the stopping potential, which electrons just fail to reach the collector?", answer: "The fastest ones, those with the maximum kinetic energy" },
      ],
      pyqExampleId: "ea9fb2a2-02fc-4033-8e3b-2085433767ea",
      traps: [
        {
          title: "Leaving out the word minimum",
          body: "The work function is the MINIMUM energy needed to pull an electron out of the surface, and the threshold frequency is the MINIMUM frequency for emission. Without 'minimum' the definition loses its mark.",
        },
        {
          title: "Stopping potential without its sign",
          body: "The stopping potential is a retarding (negative) potential of the collector with respect to the emitter. Write that the current becomes zero at this value, and add \\(eV_0 = KE_{max}\\).",
        },
        {
          title: "Calling threshold frequency a property of the light",
          body: "The threshold frequency belongs to the METAL. Different metals have different threshold frequencies; the light only has to reach it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpdn-pe-threshold",
      name: "When emission happens: the threshold condition",
      intuition:
        "One photon gives its whole energy to one electron, and an electron cannot save up energy from several photons. So emission happens only if one photon carries at least the work function. A brighter lamp sends more photons, but each one is no stronger, so brightness cannot make up for too low a frequency. A longer wavelength means a smaller frequency and a weaker photon.",
      definition:
        "- Emission takes place only if \\(h\\nu \\geq \\phi_0\\), that is \\(\\nu \\geq \\nu_0\\), or \\(\\lambda \\leq \\lambda_0\\).\n" +
        "- If \\(\\nu < \\nu_0\\), no electron is emitted however intense the radiation is. If \\(\\nu > \\nu_0\\), electrons are emitted however feeble the radiation is.\n" +
        "- For metals like zinc, cadmium and magnesium, ultraviolet radiation is necessary; for alkali metals even visible radiation is sufficient.\n" +
        "- Table 14.1 of the textbook gives work functions (eV): potassium 2.3, sodium 2.4, calcium 2.9, zinc 3.6, silver 4.3, aluminium 4.3, tungsten 4.5, copper 4.7, nickel 5.0, gold 5.1.\n" +
        "- The larger the work function, the higher the threshold frequency and the shorter the threshold wavelength.",
      formula: {
        label: "Condition for emission",
        latex: "h\\nu \\geq \\phi_0, \\quad \\text{that is} \\quad \\nu \\geq \\nu_0 \\quad \\text{or} \\quad \\lambda \\leq \\lambda_0 = \\frac{hc}{\\phi_0}",
      },
      authoredExample: {
        prompt:
          "Light of wavelength 4800 Å falls on a zinc plate (work function 3.6 eV) and on a sodium plate (work function 2.4 eV). Which plate emits photoelectrons? (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Given: \\(\\lambda = 4800\\) Å \\(= 4.8 \\times 10^{-7}\\) m; \\(\\phi_{Zn} = 3.6\\) eV, \\(\\phi_{Na} = 2.4\\) eV.",
          "Formula: energy of one photon \\(E = \\dfrac{hc}{\\lambda}\\).",
          "\\(E = \\dfrac{6.63 \\times 10^{-34} \\times 3 \\times 10^{8}}{4.8 \\times 10^{-7}} = 4.144 \\times 10^{-19}\\) J \\(= \\dfrac{4.144 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 2.59\\) eV.",
          "Sodium: \\(2.59 > 2.4\\) eV, so electrons are emitted.",
          "Zinc: \\(2.59 < 3.6\\) eV, so no electron is emitted, however bright the light.",
        ],
        answer: "Only the sodium plate emits photoelectrons",
      },
      selfCheckExample: {
        prompt: "The threshold frequency of a metal is \\(8 \\times 10^{14}\\) Hz. Very faint light of frequency \\(1.0 \\times 10^{15}\\) Hz falls on it. Are electrons emitted?",
        steps: ["\\(\\nu = 1.0 \\times 10^{15}\\) Hz is more than \\(\\nu_0 = 8 \\times 10^{14}\\) Hz, so each photon carries more than the work function.", "Faint light only means fewer photons, so fewer electrons, but some are emitted at once."],
        answer: "Yes, at once, though the current is small",
      },
      practiceSet: [
        { prompt: "Which needs the higher frequency of light to emit electrons: copper (4.7 eV) or calcium (2.9 eV)?", answer: "Copper" },
        { prompt: "Photons of energy 6 eV and 3 eV fall on a metal. Find the ratio of their wavelengths.", answer: "1 : 2" },
        { prompt: "Why does a zinc plate need ultraviolet radiation to emit electrons?", answer: "Its work function (3.6 eV) is more than the energy of a photon of visible light" },
      ],
      pyqExampleId: "e7cb817e-7b9f-45ec-9698-ec03a0327070",
      traps: [
        {
          title: "Thinking brighter light will do",
          body: "Below the threshold frequency, raising the intensity only sends more photons, each still too weak. No electron is emitted at all.",
        },
        {
          title: "Reading wavelength the wrong way round",
          body: "Emission needs \\(\\lambda \\leq \\lambda_0\\): a SHORTER wavelength than the threshold. A longer wavelength means a smaller frequency and a weaker photon.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpdn-pe-setup",
      name: "Experimental set-up of the photoelectric effect",
      intuition:
        "The experiment shines light on a metal plate inside a vacuum tube and measures the current of the electrons that reach a second plate. By changing the potential of the second plate, the brightness of the light and its frequency one at a time, every feature of the effect shows up. Draw the diagram first, label every part, then describe.",
      definition:
        "- **Working:** monochromatic light falls on the emitter E and photoelectrons are emitted. With C positive, they are drawn to C and the microammeter shows a current.\n" +
        "- Raising the accelerating potential increases the current until it becomes constant: the **saturation current**, when every emitted electron reaches C.\n" +
        "- Making C negative (retarding) reduces the current, and it becomes zero at the **stopping potential** \\(-V_0\\).\n" +
        "- Increasing the intensity at a fixed frequency increases the saturation current in proportion, but \\(V_0\\) stays the same.\n" +
        "- Increasing the frequency at a fixed intensity leaves the saturation current the same but increases \\(V_0\\); \\(V_0\\) varies linearly with frequency.\n" +
        "- The board asks this for 3 or 4 marks: a neat labelled diagram is half the marks.",
      table: {
        columns: ["Part", "What it is and what it does"],
        rows: [
          {
            cells: ["Evacuated glass tube with a quartz window", "Holds the two plates; light enters through the quartz window; the vacuum lets electrons travel without hitting air molecules"],
            pyqExampleId: "9a2dd2fc-e654-446e-b4e0-0624a4401bbf",
            noteAmber: "Board 2023 and 2024 asked for this set-up with a neat circuit diagram, three times in all.",
          },
          { cells: ["Emitter E (cathode)", "A plate of photosensitive metal on which the light falls"] },
          { cells: ["Collector C (anode)", "A metal plate that collects the photoelectrons; normally positive with respect to E"] },
          { cells: ["Variable voltage source", "Makes C positive (accelerating potential) or negative (retarding potential) with respect to E"] },
          { cells: ["Voltmeter", "Measures the potential difference V between E and C"] },
          { cells: ["Microammeter", "Measures the photocurrent, which is very small"] },
          { cells: ["Source S", "Monochromatic light of sufficiently high frequency (short wavelength)"] },
        ],
      },
      practiceSet: [
        { prompt: "Why is the glass tube of the photoelectric set-up evacuated?", answer: "So that the photoelectrons do not collide with air molecules on the way to the collector" },
        { prompt: "What is the saturation current?", answer: "The constant current reached when every emitted electron reaches the collector" },
        { prompt: "At a fixed frequency the intensity is doubled. What happens to the saturation current and to the stopping potential?", answer: "The saturation current doubles; the stopping potential is unchanged" },
      ],
      traps: [
        {
          title: "No diagram, or an unlabelled one",
          body: "The question says 'with a neat labelled diagram'. Label E, C, the quartz window, the voltmeter, the microammeter and the source, or the diagram earns little.",
        },
        {
          title: "Forgetting the retarding side",
          body: "The collector can be made negative too. Without that you cannot explain the stopping potential, which is one of the characteristics asked for.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpdn-pe-observations",
      name: "Observations, and why the wave theory failed",
      intuition:
        "The wave picture says light pours its energy over the whole surface, so electrons should soak it up slowly, a brighter light should throw them out faster, and any colour should work if you wait long enough. The experiments showed none of this. The textbook's Example 14.1 shows that, on the wave picture, faint light on potassium would need about \\(4.4 \\times 10^{4}\\) s, roughly half a day, before any current, yet the current starts at once.",
      definition:
        "- Emission is **instantaneous**: the current starts within \\(10^{-9}\\) s and stops as soon as the light is stopped.\n" +
        "- Below the threshold frequency \\(\\nu_0\\) there is no emission, however intense the light.\n" +
        "- The photocurrent increases **linearly with intensity**.\n" +
        "- \\(KE_{max}\\) depends on the frequency and the metal, **not on the intensity**.\n" +
        "- The number of electrons, and so the photocurrent, depends on the intensity but **not on the frequency**, as long as \\(\\nu > \\nu_0\\).\n" +
        "- Einstein's photon picture explains every one of these (Table 14.2 of the textbook).",
      table: {
        columns: ["Observation", "The wave theory expected", "The photon picture explains"],
        rows: [
          {
            cells: ["Photocurrent at a fixed intensity when the frequency is raised above the threshold", "Frequency has no role; only the energy poured in by the light matters", "The current stays the same: the number of electrons is set by the number of photons; frequency changes only their energy"],
            pyqExampleId: "4b235405-8536-448b-bb8b-92b59043bf44",
            noteAmber: "Board 2026 asked this as a multiple choice: the current remains the same.",
          },
          { cells: ["Emission starts at once, even in faint light", "Faint light needs a long time to build up energy", "One photon gives all its energy to one electron in a single collision"] },
          { cells: ["No emission below a threshold frequency", "Any frequency works if the light is intense enough", "A low frequency photon has less energy than the work function"] },
          { cells: ["Higher intensity gives a larger photocurrent", "Higher intensity gives more energy, so more electrons", "Higher intensity means more photons each second, so more electrons"] },
          { cells: ["Intensity does not change the maximum kinetic energy", "More intense light should give faster electrons", "The energy of each photon does not depend on intensity"] },
          { cells: ["Higher frequency gives a larger maximum kinetic energy", "Frequency should not affect the kinetic energy", "A higher frequency photon carries more energy, so more is left after the work function"] },
        ],
      },
      practiceSet: [
        { prompt: "How soon after the light falls does the photocurrent start?", answer: "At once, within \\(10^{-9}\\) s" },
        { prompt: "On the photon picture, what does the intensity of light at a given frequency decide?", answer: "The number of photons falling each second, and so the number of electrons emitted" },
        { prompt: "Which observation goes against the wave theory most plainly?", answer: "The instant emission even in faint light (also accept: the threshold frequency)" },
      ],
      traps: [
        {
          title: "Saying intensity raises the kinetic energy",
          body: "Intensity changes only how MANY electrons come out. The maximum kinetic energy depends on frequency and the metal.",
        },
        {
          title: "Explaining one side only",
          body: "When asked why the wave theory failed, state what the wave theory expected AND what was observed. One side alone earns half the mark.",
        },
      ],
    },
  ],
};
