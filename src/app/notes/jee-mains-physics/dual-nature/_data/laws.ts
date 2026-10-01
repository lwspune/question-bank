import type { SubtopicNote } from "@/app/notes/_types";

export const LAWS_DUAL_NOTE: SubtopicNote = {
  subtopicName: "Photoelectric Laws and Graphs",
  title: "Photoelectric Laws and Graphs",
  oneLineDefinition:
    "Frequency decides whether electrons leave and how fast the fastest ones move; intensity decides only how many leave; every photoelectric graph is read from eV₀ = hν − φ.",
  whyItMatters:
    "Twenty-one PYQs, all multiple choice, and one from 2026. Fourteen test what the frequency and the intensity of the light each control, nine of them as assertion-reason or pick-the-true-statements questions. Seven read a graph: five a stopping-potential line against frequency, one a kinetic-energy line, and one photocurrent against voltage. There is almost no arithmetic; the marks go to knowing which quantity moves.",
  concepts: [
    // C1 — the photoelectric laws
    {
      kind: "reference" as const,
      slug: "jpdual-pe-laws",
      name: "What frequency and intensity each control in the photoelectric effect",
      intuition:
        "One photon frees at most one electron, and it does so at once. The energy of each photon is set by the frequency, so the frequency decides whether an electron can leave and how much energy the fastest one carries. The intensity only sets how many photons arrive, so it decides how many electrons leave, never how fast. A wave picture of light cannot explain any of this, which is why the effect is the evidence for photons.",
      definition:
        "- One photon, one electron, no delay.\n" +
        "- \\(K_{\\max} = h\\nu - \\phi\\), and the stopping potential is \\(V_0 = K_{\\max}/e\\).\n" +
        "- \\(V_0\\) depends on the frequency and on the metal. It does not depend on the intensity, the power of the source or its distance.\n" +
        "- The photocurrent and the saturation current grow in proportion to the intensity, above threshold.\n" +
        "- At a fixed intensity, a higher frequency means fewer photons per second, since \\(n = IA/h\\nu\\).\n" +
        "- To stop the electrons, the COLLECTOR is made negative with respect to the emitter.\n" +
        "- \\(v_{\\max}^{2}\\) is linear in ν, but \\(v_{\\max}\\) itself is not.",
      table: {
        columns: ["Quantity", "Raise the frequency (above threshold)", "Raise the intensity (same frequency)"],
        rows: [
          { cells: ["Maximum kinetic energy", "Rises linearly: hν − φ", "No change"] },
          { cells: ["Stopping potential", "Rises linearly: (hν − φ)/e", "No change"], noteAmber: "Moving the lamp farther away dims it; the stopping potential stays the same." },
          { cells: ["Saturation current", "Set by photons per second, not by their energy", "Rises in proportion"] },
          { cells: ["Whether emission happens", "Starts once ν passes ν₀", "Never below ν₀, however bright"] },
          { cells: ["Delay before emission", "None: emission is instant", "None: emission is instant"] },
          { cells: ["Photons per second at fixed intensity", "Falls, as n = IA/hν", "Rises in proportion"] },
        ],
        caption: "Frequency sets the energy of each electron; intensity sets the number of electrons.",
      },
      selfCheckExample: {
        prompt:
          "Light of frequency 2ν₀, where ν₀ is the threshold frequency, ejects electrons with stopping potential V. The frequency is raised to 4ν₀ and the intensity is kept the same. What is the new stopping potential?",
        steps: [
          "At 2ν₀: \\(eV = 2h\\nu_0 - h\\nu_0 = h\\nu_0\\).",
          "At 4ν₀: \\(eV' = 4h\\nu_0 - h\\nu_0 = 3h\\nu_0\\).",
          "So \\(V' = 3V\\). Doubling the frequency has tripled the stopping potential, because φ is subtracted first.",
        ],
        answer: "3V",
      },
      practiceSet: [
        { prompt: "The intensity of the light on a photocell is doubled and its frequency kept the same. What happens to the stopping potential?", answer: "It does not change." },
        { prompt: "Which property of the incident light decides the stopping potential: its intensity, its frequency or its phase?", answer: "Its frequency" },
        { prompt: "Light at 0.8 times the threshold frequency is made 100 times brighter. Photocurrent?", answer: "Zero" },
        { prompt: "The fastest photoelectrons leave a metal with 2 eV of kinetic energy. Stopping potential?", answer: "2 V" },
      ],
      pyqExampleId: "da5a633d-7733-4625-8065-b72f120aac3f", // 2024: 1.5ν₀ halved, intensity doubled, zero electrons
      traps: [
        {
          title: "Brighter light, same stopping potential",
          body: "Raising the intensity sends more photons of the same energy. More electrons leave, so the current rises, but the fastest of them is no faster, so the stopping potential is unchanged.",
        },
        {
          title: "Doubling the frequency more than doubles the kinetic energy",
          body: "K = hν − φ. At 2ν it becomes 2hν − φ = 2K + φ, which is more than 2K. The stopping potential likewise more than doubles.",
        },
        {
          title: "The collector is made negative, not the emitter",
          body: "Electrons are stopped by making the collecting plate negative with respect to the emitting surface. Making the emitter itself negative pushes electrons away from it and helps the current.",
        },
      ],
    },

    // C2 — photoelectric graphs
    {
      kind: "reference" as const,
      slug: "jpdual-pe-graphs",
      name: "Reading photoelectric graphs",
      intuition:
        "Rewrite Einstein's equation as V₀ = (h/e)ν − φ/e. That is a straight line in ν. Its slope is made only of constants of nature, so it is the same for every metal; the metal changes only where the line starts. The current-voltage curves follow from the laws: intensity raises the saturation current, frequency moves the cut-off voltage.",
      definition:
        "- \\(eV_0 = h\\nu - \\phi\\), so \\(V_0 = \\dfrac{h}{e}\\nu - \\dfrac{\\phi}{e}\\).\n" +
        "- The \\(V_0\\)–ν line has slope h/e and meets the ν-axis at \\(\\nu_0\\). Extended back, it meets the \\(V_0\\)-axis at \\(-\\phi/e\\).\n" +
        "- The \\(K_{\\max}\\)–ν line has slope h.\n" +
        "- Several metals on one plot give parallel lines. The line that starts at the lowest frequency has the smallest φ and gives the most energetic electrons for the same light.\n" +
        "- To read the work function off a graph, find \\(\\nu_0\\) and use \\(\\phi = h\\nu_0\\), or read the \\(V_0\\)-intercept.",
      table: {
        columns: ["Graph", "Shape", "Slope", "Intercepts, and what shifts the graph"],
        rows: [
          { cells: ["Stopping potential against frequency", "Straight line from ν₀ upward", "h/e, the same for every metal", "Meets the ν-axis at ν₀ and, extended, the V₀-axis at −φ/e; a larger φ shifts it right, parallel"] },
          { cells: ["Maximum kinetic energy against frequency", "Straight line from ν₀ upward", "h, the same for every metal", "Meets the ν-axis at ν₀ and, extended, the K-axis at −φ"] },
          { cells: ["Photocurrent against collector voltage, two intensities, one frequency", "Rises, then flattens at a saturation current", "Flat once saturated", "Both cut off at the same −V₀; the brighter light saturates higher"], noteAmber: "Same cut-off voltage means same frequency." },
          { cells: ["Photocurrent against collector voltage, two frequencies, one intensity", "Rises, then flattens at a saturation current", "Flat once saturated", "The higher frequency cuts off at the more negative voltage; the saturation level is the same"] },
          { cells: ["Photocurrent against intensity", "Straight line through the origin", "Constant for one metal and one frequency", "Stays at zero below threshold at any intensity"] },
          { cells: ["Stopping potential against intensity", "Horizontal line", "Zero", "Its height is set by the frequency"] },
        ],
        caption: "Every line here comes from eV₀ = hν − φ.",
      },
      selfCheckExample: {
        prompt:
          "On a graph of stopping potential against frequency, a metal's line cuts the frequency axis at \\(6 \\times 10^{14}\\) Hz. What is its work function in eV? (h = 6.6 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C)",
        steps: [
          "The frequency-axis cut is the threshold: \\(\\nu_0 = 6 \\times 10^{14}\\) Hz.",
          "\\(\\phi = h\\nu_0 = 6.6 \\times 10^{-34} \\times 6 \\times 10^{14} = 3.96 \\times 10^{-19}\\) J.",
          "In eV: \\(3.96 \\times 10^{-19}/1.6 \\times 10^{-19} \\approx 2.48\\) eV.",
        ],
        answer: "About 2.48 eV",
      },
      practiceSet: [
        { prompt: "What does the slope of a graph of maximum kinetic energy against frequency give?", answer: "Planck's constant h" },
        { prompt: "Two metals' stopping-potential lines cut the frequency axis at \\(5 \\times 10^{14}\\) Hz and \\(8 \\times 10^{14}\\) Hz. Which metal has the larger work function?", answer: "The one cutting at \\(8 \\times 10^{14}\\) Hz" },
        { prompt: "A stopping-potential line, extended back, meets the potential axis at −1.8 V. Work function?", answer: "1.8 eV" },
        { prompt: "Two photocurrent curves cut off at the same negative voltage but saturate at different currents. What differs between the two lights?", answer: "Only the intensity; the frequency is the same." },
      ],
      pyqExampleId: "170f151b-eb57-4cd1-95dd-de523cbdbc48", // 2023: ratio of V₀–ν slopes for gold and aluminium
      traps: [
        {
          title: "The slope is the same for every metal",
          body: "The slope of the stopping-potential line is h/e, built only from constants of nature. A larger work function moves the line to the right but does not tilt it.",
        },
        {
          title: "The potential-axis intercept is negative",
          body: "Extended back to ν = 0, the stopping-potential line meets the potential axis at −φ/e, below the origin. Its size gives the work function in eV.",
        },
        {
          title: "Lowest threshold, fastest electrons",
          body: "For the same light, the metal whose line starts at the lowest frequency has the smallest work function, so it gives out the most energetic electrons.",
        },
      ],
    },
  ],
};
