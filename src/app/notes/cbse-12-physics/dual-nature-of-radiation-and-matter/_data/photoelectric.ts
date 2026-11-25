import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_DN_PHOTOELECTRIC_NOTE: SubtopicNote = {
  subtopicName: "Photoelectric Effect and its Experimental Study",
  title: "Photoelectric Effect and its Experimental Study",
  oneLineDefinition:
    "Light of high enough frequency knocks electrons out of a metal; the experiment with an emitter and a collector shows how the photocurrent depends on the intensity, the frequency and the collector potential, and why the wave theory of light cannot explain it.",
  whyItMatters:
    "25 questions, twenty-four of them from board papers. The board asks you to name the factors photoelectric emission depends on and define threshold frequency (2022), say how the stopping potential and the saturation current change with frequency and intensity (2023, 2025, 2026), draw photocurrent against collector potential for different intensities or frequencies (2022, 2023), read four beams off such a graph in a case study (2023), give three results the wave theory cannot explain (2025), and decide eight assertion-reason items (2023 to 2026). The textbook adds the maximum kinetic energy from a cut-off voltage.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpdn-pe-effect",
      name: "The photoelectric effect and what it depends on",
      intuition:
        "Light falling on a metal can knock electrons out of it. Whether any come out depends on the frequency of the light and on the metal. How many come out each second depends on the intensity. Hertz first noticed the effect in 1887, and Hallwachs and Lenard studied it in detail.",
      definition:
        "- **Photoelectric effect:** the emission of electrons from a metal surface when light of suitable frequency falls on it. The emitted electrons are called **photoelectrons**.\n" +
        "- **Threshold frequency** \\(\\nu_0\\): the minimum frequency of the incident light below which no photoelectrons are emitted, however intense the light. It is different for different metals.\n" +
        "- Hallwachs found that a negatively charged zinc plate lost its charge, and a neutral plate became positive, when ultraviolet light fell on it: negative particles were leaving the plate.\n" +
        "- Zinc, cadmium and magnesium respond only to ultraviolet light; alkali metals such as sodium, potassium and caesium respond even to visible light.\n" +
        "- The emission is **instantaneous**: it starts within about \\(10^{-9}\\) s, even when the light is very dim.",
      table: {
        columns: ["Quantity", "Depends on", "Does not depend on"],
        rows: [
          {
            cells: [
              "Whether emission happens at all",
              "The frequency of the light (it must be above \\(\\nu_0\\)) and the metal",
              "The intensity: below \\(\\nu_0\\) there is no emission however bright the light",
            ],
            noteAmber: "Board 2023 asked which metal does not emit electrons with visible light: cadmium.",
            pyqExampleId: "fa431c13-5339-4f2f-accc-bf73cb1c9a7e",
          },
          {
            cells: [
              "Photocurrent (the number of photoelectrons per second)",
              "The intensity of the light (directly proportional, above \\(\\nu_0\\)), the potential between the plates, the emitter material",
              "The frequency, when the intensity is kept the same: the saturation current stays the same",
            ],
            noteAmber:
              "Board 2025 asked what happens to the saturation current when the frequency is raised at the same intensity: it remains the same.",
          },
          {
            cells: [
              "Maximum kinetic energy and stopping potential",
              "The frequency of the light and the emitter material",
              "The intensity of the light",
            ],
          },
          {
            cells: [
              "Time before emission starts",
              "Nothing: it is \\(10^{-9}\\) s or less",
              "The intensity: even very dim light gives emission at once",
            ],
          },
        ],
        caption: "Frequency decides whether electrons come out and how fast the fastest move; intensity decides how many.",
      },
      selfCheckExample: {
        prompt:
          "Light of a fixed frequency above the threshold falls on a photosensitive surface, and its intensity is made three times as large. What happens to (a) the number of photoelectrons emitted per second, (b) their maximum kinetic energy?",
        steps: [
          "The number of photoelectrons per second is directly proportional to the intensity, so it becomes three times as large.",
          "The maximum kinetic energy depends on the frequency and the metal, not on the intensity, so it does not change.",
        ],
        answer: "(a) Three times as many. (b) No change.",
      },
      practiceSet: [
        { prompt: "Light below the threshold frequency is made very intense. Are photoelectrons emitted?", answer: "No, not however intense it is" },
        { prompt: "Who first observed the photoelectric effect, and in which year?", answer: "Heinrich Hertz, in 1887" },
        { prompt: "Name one metal that gives photoelectric emission only with ultraviolet light.", answer: "Zinc (cadmium or magnesium are also right)" },
      ],
      pyqExampleId: "095a2ddd-d1de-4221-aeae-eb79cbcebe72",
      traps: [
        {
          title: "Bright light below threshold",
          body: "Below the threshold frequency no electron leaves the metal, however bright the light or however long it shines. Writing that more intensity will start the emission loses the mark.",
        },
        {
          title: "A threshold frequency with no condition",
          body: "Define it as the MINIMUM frequency BELOW which no photoelectrons are emitted, whatever the intensity, and add that it depends on the metal. 'The frequency at which emission happens' does not earn the mark.",
        },
        {
          title: "More intensity, faster electrons",
          body: "More intense light gives MORE photoelectrons each second, not faster ones. The maximum kinetic energy changes only with the frequency or the metal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpdn-pe-stopping",
      name: "Saturation current and stopping potential",
      intuition:
        "With the collector positive, the emitted electrons are pulled across and the current rises until every emitted electron is collected. Making the collector negative pushes the electrons back, so only the faster ones get across. At one negative potential even the fastest is turned back and the current stops. That potential measures the largest kinetic energy an electron has.",
      definition:
        "- **Saturation current:** the largest photocurrent, reached when all the photoelectrons emitted by the emitter reach the collector. Raising the accelerating potential further does not raise it. It is proportional to the intensity of the light.\n" +
        "- **Stopping (cut-off) potential** \\(V_0\\): the minimum negative (retarding) potential given to the collector, with respect to the emitter, for which the photocurrent becomes zero.\n" +
        "- The photoelectrons do not all have the same energy. The stopping potential turns back even the most energetic, so \\(K_{\\max} = eV_0\\).\n" +
        "- For a given frequency, \\(V_0\\) does not depend on the intensity. A higher frequency gives a larger \\(V_0\\).\n" +
        "- In electron volts the numbers match: a stopping potential of 2 V means \\(K_{\\max} = 2\\) eV.",
      formula: {
        label: "Stopping potential and maximum kinetic energy",
        latex: "K_{\\max} = \\tfrac{1}{2} m v_{\\max}^{2} = eV_0",
        symbols: [
          { symbol: "\\(K_{\\max}\\)", meaning: "maximum kinetic energy of the photoelectrons" },
          { symbol: "\\(v_{\\max}\\)", meaning: "speed of the fastest photoelectrons" },
          { symbol: "\\(m\\)", meaning: "mass of an electron, 9.1 × 10⁻³¹ kg" },
          { symbol: "\\(e\\)", meaning: "charge of an electron, 1.6 × 10⁻¹⁹ C" },
          { symbol: "\\(V_0\\)", meaning: "stopping potential, in volts" },
        ],
      },
      authoredExample: {
        prompt:
          "The photocurrent from a surface falls to zero when the collector is at \\(-2.2\\) V with respect to the emitter. Find the maximum kinetic energy of the photoelectrons in eV and in joules, and their maximum speed.",
        steps: [
          "Given: \\(V_0 = 2.2\\) V, \\(e = 1.6 \\times 10^{-19}\\) C, \\(m = 9.1 \\times 10^{-31}\\) kg.",
          "Formula: \\(K_{\\max} = eV_0\\) and \\(v_{\\max} = \\sqrt{\\dfrac{2K_{\\max}}{m}}\\).",
          "\\(K_{\\max} = 2.2\\) eV \\(= 2.2 \\times 1.6 \\times 10^{-19} = 3.52 \\times 10^{-19}\\) J.",
          "\\(v_{\\max} = \\sqrt{\\dfrac{2 \\times 3.52 \\times 10^{-19}}{9.1 \\times 10^{-31}}} = \\sqrt{7.74 \\times 10^{11}} = 8.8 \\times 10^{5}\\) m/s.",
        ],
        answer: "\\(K_{\\max} = 2.2\\) eV \\(= 3.52 \\times 10^{-19}\\) J; \\(v_{\\max} = 8.8 \\times 10^{5}\\) m/s",
      },
      selfCheckExample: {
        prompt: "The fastest photoelectrons from a surface move at \\(5.0 \\times 10^{5}\\) m/s. Find the stopping potential.",
        steps: [
          "\\(K_{\\max} = \\tfrac{1}{2} m v_{\\max}^{2} = \\tfrac{1}{2} \\times 9.1 \\times 10^{-31} \\times (5.0 \\times 10^{5})^{2} = 1.14 \\times 10^{-19}\\) J.",
          "\\(V_0 = \\dfrac{K_{\\max}}{e} = \\dfrac{1.14 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 0.71\\) V.",
        ],
        answer: "About 0.71 V",
      },
      practiceSet: [
        { prompt: "The stopping potential in an experiment is 3.0 V. What is the maximum kinetic energy of the photoelectrons in eV?", answer: "3.0 eV" },
        {
          prompt: "Why does the photocurrent stop rising when the accelerating potential of the collector is raised beyond a certain value?",
          answer: "Every emitted photoelectron already reaches the collector, so there are no more electrons to collect: the current has saturated",
        },
        {
          prompt: "To stop the photoelectrons, must the collector be made positive or negative with respect to the emitter?",
          answer: "Negative",
        },
      ],
      pyqExampleId: "a1067bec-0f17-41da-be22-22aa500f3c8d",
      traps: [
        {
          title: "Changing the intensity and changing the stopping potential",
          body: "Halving or doubling the intensity changes the saturation current in the same ratio, but the stopping potential stays exactly the same. Only the frequency or the metal moves it.",
        },
        {
          title: "Making the emitter negative",
          body: "The electrons are stopped by making the COLLECTOR negative with respect to the emitter. A negative emitter pushes electrons towards the collector and helps the current.",
        },
        {
          title: "Saying every photoelectron has the energy eV₀",
          body: "\\(eV_0\\) is the MAXIMUM kinetic energy. Electrons from deeper in the metal come out slower, so the energies run from nearly zero up to \\(eV_0\\).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpdn-pe-graphs",
      name: "The photocurrent graphs",
      intuition:
        "The board asks you to draw these graphs and to read them. They come from one experiment: change the intensity, the frequency or the collector potential, and watch the current. Each graph shows one rule, so learn the rule with the shape.",
      definition:
        "- The graphs cannot be drawn here, so learn them in words: the axes, where each curve starts and where it flattens.\n" +
        "- In the potential graphs, photocurrent is on the vertical axis and collector plate potential on the horizontal axis, with retarding (negative) potential to the left of the origin and accelerating potential to the right.\n" +
        "- Each such curve starts from zero at the stopping potential \\(-V_0\\), rises through the origin region, and flattens into a horizontal line at the saturation current.\n" +
        "- Label both axes, the stopping potential, the saturation current and each curve (\\(I_1, I_2\\) or \\(\\nu_1, \\nu_2\\)).",
      table: {
        columns: ["Graph", "What you draw", "What it shows"],
        rows: [
          {
            cells: [
              "Photocurrent against intensity, at fixed frequency and potential",
              "A straight line through the origin",
              "The photocurrent, and so the number of photoelectrons per second, is directly proportional to the intensity",
            ],
            noteAmber: "Board 2025 asked which graph shows this: the straight line through the origin.",
            pyqExampleId: "add60fd1-84f4-4ce8-b9bd-2e77914342fd",
          },
          {
            cells: [
              "Photocurrent against collector potential, one frequency, intensities \\(I_1 < I_2 < I_3\\)",
              "Three curves that meet the potential axis at the SAME point \\(-V_0\\) and flatten at higher saturation currents for higher intensity",
              "The stopping potential does not depend on intensity; the saturation current is proportional to it",
            ],
          },
          {
            cells: [
              "Photocurrent against collector potential, one intensity, frequencies \\(\\nu_1 < \\nu_2 < \\nu_3\\)",
              "Three curves with the SAME saturation current that meet the potential axis farther to the left for higher frequency",
              "A higher frequency needs a larger stopping potential: \\(V_{03} > V_{02} > V_{01}\\)",
            ],
            noteAmber:
              "Board 2023 gave four such curves in a case study and asked which beam has the highest frequency: the one that needs the largest retarding potential. The longest wavelength goes with the smallest.",
          },
          {
            cells: [
              "Stopping potential against frequency (or frequency against stopping potential)",
              "A straight line that cuts the frequency axis at \\(\\nu_0\\); extended, it cuts the \\(V_0\\) axis at \\(-\\phi_0/e\\)",
              "The threshold frequency and the work function of the metal; Einstein's equation page explains the slope",
            ],
            noteAmber: "Board 2025 asked for this plot and what the intercept on the stopping potential axis gives: the work function, as \\(\\phi_0 = e \\times\\) the size of the intercept.",
          },
        ],
        caption: "Intensity moves the saturation current; frequency moves the stopping potential.",
      },
      selfCheckExample: {
        prompt:
          "Two curves of photocurrent against collector potential meet the potential axis at \\(-1.2\\) V and \\(-1.8\\) V and flatten at the same saturation current. What was kept the same for the two lights, what was changed, and which light had the higher frequency?",
        steps: [
          "The same saturation current means the same intensity.",
          "Different stopping potentials mean different frequencies.",
          "A larger stopping potential means a larger maximum kinetic energy, so a higher frequency.",
        ],
        answer: "Intensity kept the same, frequency changed; the light with the 1.8 V stopping potential had the higher frequency",
      },
      practiceSet: [
        { prompt: "On a graph of photocurrent against collector potential, what is the current called where the curve becomes flat?", answer: "The saturation current" },
        { prompt: "Does a graph of photocurrent against intensity pass through the origin? Why?", answer: "Yes. No light means no photons and so no photoelectrons" },
        { prompt: "Where is the stopping potential marked on a graph of photocurrent against collector potential?", answer: "On the negative side of the potential axis, where the curve meets it" },
      ],
      pyqExampleId: "6dd6d4ac-5386-4f22-8a7c-1eb0a13f443b",
      traps: [
        {
          title: "A graph with no labels",
          body: "The marks are for labelled axes, the saturation current, the stopping potential and the name of each curve. An unlabelled sketch of the right shape loses most of them.",
        },
        {
          title: "Different intensities, different stopping potentials",
          body: "Curves for the same frequency and different intensities all meet the potential axis at the same \\(-V_0\\). Drawing them meeting at different points is the commonest wrong graph.",
        },
        {
          title: "Different frequencies, different saturation currents",
          body: "At the same intensity the book's curves for different frequencies share one saturation current and differ only in where they meet the potential axis.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpdn-pe-wave",
      name: "Why the wave theory fails, and the assertion-reason items",
      intuition:
        "In the wave picture, light spreads its energy evenly over the wavefront and the electrons soak it up slowly and continuously. That picture predicts three things the experiment does not show. Each failure is a point in a 'features the wave theory cannot explain' answer, and most assertion-reason items in this chapter are built from them.",
      definition:
        "- In the wave picture, greater intensity means larger amplitude, so each electron should absorb more energy and \\(K_{\\max}\\) should rise with intensity.\n" +
        "- In the wave picture, light of any frequency, if intense enough and given time, should free electrons, so there should be no threshold frequency.\n" +
        "- In the wave picture, the energy absorbed per electron per unit time is small, so a single electron could take hours or more to escape.\n" +
        "- **Assertion-reason codes** in CBSE's 2023 to 2026 papers: (A) both A and R are true and R explains A; (B) both are true but R does not explain A; (C) A is true and R is false; (D) both A and R are false.\n" +
        "- Judge A on its own, then R on its own, and only then ask whether R is the reason for A.",
      table: {
        columns: ["Observation", "Wave theory predicts", "What is found"],
        rows: [
          {
            cells: ["Maximum kinetic energy and intensity", "It rises with intensity", "It does not depend on intensity"],
          },
          {
            cells: ["Threshold frequency", "None: any frequency works if the light is intense enough", "It exists: no emission below \\(\\nu_0\\)"],
          },
          {
            cells: ["Time before emission", "Hours or more in dim light", "Instantaneous, about \\(10^{-9}\\) s or less"],
            noteAmber:
              "Board 2026 paired 'the photoelectric effect is instantaneous' with the wave theory's delay of hours: both are true, but R does not explain A, so the code is (B).",
            pyqExampleId: "c441aa4c-93c8-4761-99d0-e55ae37760e8",
          },
        ],
        caption: "The stopping potential's independence of intensity and dependence on frequency is the clearest test between the two pictures.",
      },
      selfCheckExample: {
        prompt:
          "Assertion (A): The maximum kinetic energy of photoelectrons does not change when the intensity of the light is doubled. Reason (R): Intensity decides only the number of photons arriving per second, not the energy of each photon. Choose the code.",
        steps: [
          "A is true: \\(K_{\\max}\\) depends on frequency and the metal only.",
          "R is true: intensity is the number of photons per unit area per unit time.",
          "R is the reason for A: each electron still gets one photon of the same energy.",
        ],
        answer: "(A) Both are true and R is the correct explanation of A",
      },
      practiceSet: [
        {
          prompt: "According to the wave theory, about how long could one electron take to gather enough energy to leave a metal in dim light?",
          answer: "Hours or more",
        },
        {
          prompt: "Assertion (A): Below the threshold frequency no photoelectrons are emitted. Reason (R): Photocurrent is proportional to the intensity of the light. Choose the code.",
          answer: "(B) Both are true, but R does not explain A",
        },
        {
          prompt: "Which observation does the book call the crucial test between the wave picture and the photon picture?",
          answer: "The stopping potential: it does not depend on the intensity but does depend on the frequency",
        },
      ],
      pyqExampleId: "ba118ffd-2c5a-46d2-8345-d9626ba3354d",
      traps: [
        {
          title: "A true reason that is not the explanation",
          body: "'Photocurrent is proportional to intensity' is true, but it is not what proves light is made of photons. The proof is the threshold frequency, \\(K_{\\max}\\) not depending on intensity, and the absence of a delay. A true R with no link to A is code (B).",
        },
        {
          title: "Looking for a code that is not printed",
          body: "These papers print no 'A false, R true' code. If you find A false and R true, read both statements again before you choose.",
        },
        {
          title: "Listing an observation without the prediction",
          body: "In 'features the wave theory cannot explain', each mark needs the observation AND what the wave theory expects instead. Three observations with no predictions earn about half.",
        },
      ],
    },
  ],
};
