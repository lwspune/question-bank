import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_DN_EINSTEIN_NOTE: SubtopicNote = {
  subtopicName: "Einstein's Photoelectric Equation",
  title: "Photons and Einstein's Photoelectric Equation",
  oneLineDefinition:
    "Light as photons of energy hν, Einstein's photoelectric equation KEmax = hν − φ₀, the test for whether a metal will emit, and the stopping potential with its straight-line graph against frequency.",
  whyItMatters:
    "19 questions, ten of them from board papers from 2016 to 2026. The board asks the energy of a photon (2016), the ratio of the wavelengths of photons of 5 eV and 2.5 eV (2026), whether a metal will emit for given light by finding the threshold and incident frequencies (2016, 2017, 2018, 2020), the stopping potential and maximum kinetic energy (2023, 2024), what doubling the frequency does (2024), and to state Einstein's equation with the meaning of each term (2025). The textbook adds finding Planck's constant from a graph or two readings, a work function from a stopping potential, and photoelectrons in a magnetic field.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpdn-photon-energy",
      name: "Energy of a photon",
      intuition:
        "Einstein took Planck's idea further: light is absorbed and given out in bundles, called photons, and the energy of one photon depends only on its frequency. High frequency, or short wavelength, means a more energetic photon. Photons are not coloured; colour is only how our eyes sense a range of frequencies.",
      definition:
        "- Energy of a photon (Einstein's relation): \\(E = h\\nu\\), where \\(h = 6.63 \\times 10^{-34}\\) J s is Planck's constant.\n" +
        "- Since \\(\\nu = c/\\lambda\\): \\(E = \\dfrac{hc}{\\lambda}\\). Energy is directly proportional to frequency and inversely proportional to wavelength.\n" +
        "- To change joule into electronvolt, divide by \\(1.6 \\times 10^{-19}\\).\n" +
        "- A beam of n photons carries \\(nh\\nu\\). A source of power P sends out \\(N = \\dfrac{P}{h\\nu}\\) photons each second.",
      formula: {
        label: "Photon energy",
        latex: "E = h\\nu = \\frac{hc}{\\lambda}",
        symbols: [
          { symbol: "\\(h\\)", meaning: "Planck's constant, 6.63 × 10⁻³⁴ J s" },
          { symbol: "\\(\\nu\\)", meaning: "frequency of the radiation" },
          { symbol: "\\(\\lambda\\)", meaning: "wavelength of the radiation" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the energy of a photon of green light of wavelength 5500 Å in joule and in electronvolt. How many such photons does a 2 mW source emit each second? (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Given: \\(\\lambda = 5500\\) Å \\(= 5.5 \\times 10^{-7}\\) m, \\(P = 2\\) mW \\(= 2 \\times 10^{-3}\\) W.",
          "Formula: \\(E = \\dfrac{hc}{\\lambda}\\), \\(N = \\dfrac{P}{E}\\).",
          "\\(E = \\dfrac{6.63 \\times 10^{-34} \\times 3 \\times 10^{8}}{5.5 \\times 10^{-7}} = 3.616 \\times 10^{-19}\\) J.",
          "In electronvolt: \\(\\dfrac{3.616 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 2.26\\) eV.",
          "\\(N = \\dfrac{2 \\times 10^{-3}}{3.616 \\times 10^{-19}} = 5.53 \\times 10^{15}\\) photons per second.",
        ],
        answer: "\\(3.616 \\times 10^{-19}\\) J = 2.26 eV; \\(5.53 \\times 10^{15}\\) photons per second",
      },
      selfCheckExample: {
        prompt: "Find the energy, in eV, of a photon of frequency \\(1.5 \\times 10^{15}\\) Hz.",
        steps: [
          "\\(E = h\\nu = 6.63 \\times 10^{-34} \\times 1.5 \\times 10^{15} = 9.945 \\times 10^{-19}\\) J.",
          "\\(\\dfrac{9.945 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 6.22\\) eV.",
        ],
        answer: "6.22 eV",
      },
      practiceSet: [
        { prompt: "The wavelength of a photon is doubled. What happens to its energy?", answer: "It is halved" },
        { prompt: "Express \\(3.2 \\times 10^{-19}\\) J in electronvolt.", answer: "2 eV" },
        { prompt: "Which carries more energy: a photon of red light or a photon of violet light?", answer: "Violet (shorter wavelength, higher frequency)" },
      ],
      pyqExampleId: "a9178e55-2212-4661-b207-f214ba7ba517",
      traps: [
        {
          title: "Leaving the wavelength in ångström",
          body: "1 Å \\(= 10^{-10}\\) m. Put \\(\\lambda\\) in metre before using \\(E = hc/\\lambda\\), or the energy comes out \\(10^{10}\\) times too small.",
        },
        {
          title: "Mixing joule and electronvolt",
          body: "\\(hc/\\lambda\\) with SI values gives joule. Divide by \\(1.6 \\times 10^{-19}\\) before comparing with a work function given in eV.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpdn-einstein-equation",
      name: "Einstein's photoelectric equation",
      intuition:
        "A photon hits an electron and hands over all of its energy hν, and the photon no longer exists. The electron spends part of it, the work function, just to get out. Whatever is left is its kinetic energy. Electrons from deeper inside lose a little more on the way, so the formula gives the MAXIMUM kinetic energy, that of the fastest electrons.",
      definition:
        "Board answer, one step a line:\n" +
        "- A photon of energy \\(h\\nu\\) falls on the metal and gives ALL its energy to one electron.\n" +
        "- The electron uses energy \\(\\phi_0\\) (the work function) to escape from the surface.\n" +
        "- The rest of the photon's energy becomes the kinetic energy of the electron. For the most energetic electrons: \\(h\\nu = \\phi_0 + KE_{max}\\).\n" +
        "- So \\(KE_{max} = \\dfrac{1}{2}mv_{max}^{2} = h\\nu - \\phi_0\\) (Einstein's photoelectric equation).\n" +
        "- **Meaning of each term:** \\(h\\nu\\) = energy of one incident photon; \\(\\phi_0 = h\\nu_0\\) = work function of the metal; \\(KE_{max}\\) = maximum kinetic energy of the emitted photoelectrons.\n" +
        "- Electrons have different kinetic energies because they come from different depths, have different energies inside the metal and lose energy in collisions.\n" +
        "- \\(KE_{max}\\) depends on the metal and varies linearly with \\(\\nu\\); it does not depend on the intensity.",
      formula: {
        label: "Einstein's photoelectric equation",
        latex: "KE_{max} = \\frac{1}{2}mv_{max}^{2} = h\\nu - \\phi_0",
        symbols: [
          { symbol: "\\(h\\nu\\)", meaning: "energy of one incident photon" },
          { symbol: "\\(\\phi_0\\)", meaning: "work function of the metal, equal to hν₀" },
          { symbol: "\\(KE_{max}\\)", meaning: "maximum kinetic energy of the photoelectrons" },
        ],
      },
      authoredExample: {
        prompt:
          "Light of frequency \\(8 \\times 10^{14}\\) Hz falls on a metal of work function 2.0 eV. Find the maximum kinetic energy of the photoelectrons in eV and in joule, and their maximum speed. (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(m = 9.1 \\times 10^{-31}\\) kg)",
        steps: [
          "Given: \\(\\nu = 8 \\times 10^{14}\\) Hz, \\(\\phi_0 = 2.0\\) eV, \\(m = 9.1 \\times 10^{-31}\\) kg.",
          "Formula: \\(KE_{max} = h\\nu - \\phi_0\\).",
          "\\(h\\nu = 6.63 \\times 10^{-34} \\times 8 \\times 10^{14} = 5.304 \\times 10^{-19}\\) J \\(= 3.315\\) eV.",
          "\\(KE_{max} = 3.315 - 2.0 = 1.315\\) eV \\(= 1.315 \\times 1.6 \\times 10^{-19} = 2.104 \\times 10^{-19}\\) J.",
          "\\(v_{max} = \\sqrt{\\dfrac{2KE_{max}}{m}} = \\sqrt{\\dfrac{2 \\times 2.104 \\times 10^{-19}}{9.1 \\times 10^{-31}}} = 6.8 \\times 10^{5}\\) m/s.",
        ],
        answer: "\\(KE_{max} = 1.315\\) eV \\(= 2.104 \\times 10^{-19}\\) J; \\(v_{max} = 6.8 \\times 10^{5}\\) m/s",
      },
      selfCheckExample: {
        prompt: "Photons of energy 3.5 eV fall on a metal and the fastest photoelectrons have 1.2 eV of kinetic energy. Find the work function of the metal.",
        steps: ["\\(\\phi_0 = h\\nu - KE_{max} = 3.5 - 1.2\\)."],
        answer: "2.3 eV",
      },
      practiceSet: [
        { prompt: "Light of photon energy 3 eV gives photoelectrons of maximum kinetic energy 1 eV from a metal. What is the maximum kinetic energy for photons of 4 eV on the same metal?", answer: "2 eV" },
        { prompt: "Which term of Einstein's equation depends only on the metal?", answer: "The work function \\(\\phi_0\\)" },
        { prompt: "What does \\(KE_{max} = 0\\) tell you about the incident light?", answer: "Its frequency equals the threshold frequency" },
        { prompt: "Does the intensity of light appear in Einstein's equation?", answer: "No. \\(KE_{max}\\) does not depend on intensity" },
      ],
      pyqExampleId: "357465ce-43bc-44b4-ae72-5c21dd853525",
      traps: [
        {
          title: "Thinking double frequency means double kinetic energy",
          body: "\\(KE_{max} = h\\nu - \\phi_0\\) is a straight line that does not pass through zero. Doubling \\(\\nu\\) gives \\(2h\\nu - \\phi_0\\), which is MORE than twice the old value.",
        },
        {
          title: "Calling it the kinetic energy of every electron",
          body: "The equation gives the MAXIMUM kinetic energy. Electrons from below the surface lose some energy on the way out and come out slower.",
        },
        {
          title: "Stating the equation without the terms",
          body: "'State and mention the significance of each term' carries marks for the meaning of \\(h\\nu\\), \\(\\phi_0\\) and \\(KE_{max}\\). Write one line for each.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpdn-emission-check",
      name: "Will there be emission? Threshold and incident frequency",
      intuition:
        "Every 'will photoelectrons be emitted' question is one comparison: the energy of one incident photon against the work function. You can compare frequencies (ν with ν₀), energies (hν with φ₀) or wavelengths (λ with λ₀). Find both numbers, compare, and say clearly yes or no.",
      definition:
        "- Threshold frequency: \\(\\nu_0 = \\dfrac{\\phi_0}{h}\\) (put \\(\\phi_0\\) in joule).\n" +
        "- Incident frequency: \\(\\nu = \\dfrac{c}{\\lambda}\\).\n" +
        "- If \\(\\nu > \\nu_0\\): emission, with \\(KE_{max} = h(\\nu - \\nu_0)\\). If \\(\\nu < \\nu_0\\): no emission.\n" +
        "- Threshold wavelength: \\(\\lambda_0 = \\dfrac{hc}{\\phi_0}\\). Emission only if \\(\\lambda < \\lambda_0\\).",
      formula: {
        label: "Threshold frequency and wavelength",
        latex: "\\nu_0 = \\frac{\\phi_0}{h}, \\qquad \\lambda_0 = \\frac{hc}{\\phi_0}",
      },
      authoredExample: {
        prompt:
          "The threshold wavelength of a metal is 5600 Å. Find its work function in eV. Will light of frequency \\(6 \\times 10^{14}\\) Hz eject electrons from it? If so, find their maximum kinetic energy. (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Given: \\(\\lambda_0 = 5600\\) Å \\(= 5.6 \\times 10^{-7}\\) m, \\(\\nu = 6 \\times 10^{14}\\) Hz.",
          "\\(\\phi_0 = \\dfrac{hc}{\\lambda_0} = \\dfrac{6.63 \\times 10^{-34} \\times 3 \\times 10^{8}}{5.6 \\times 10^{-7}} = 3.552 \\times 10^{-19}\\) J \\(= 2.22\\) eV.",
          "Photon energy: \\(h\\nu = 6.63 \\times 10^{-34} \\times 6 \\times 10^{14} = 3.978 \\times 10^{-19}\\) J \\(= 2.49\\) eV.",
          "\\(2.49 > 2.22\\) eV, so electrons are emitted.",
          "\\(KE_{max} = 2.49 - 2.22 = 0.27\\) eV.",
        ],
        answer: "Work function 2.22 eV; yes, electrons are emitted with \\(KE_{max} = 0.27\\) eV",
      },
      selfCheckExample: {
        prompt: "The work function of a metal is 3.0 eV. Find its threshold wavelength.",
        steps: [
          "\\(\\phi_0 = 3.0 \\times 1.6 \\times 10^{-19} = 4.8 \\times 10^{-19}\\) J.",
          "\\(\\lambda_0 = \\dfrac{hc}{\\phi_0} = \\dfrac{1.989 \\times 10^{-25}}{4.8 \\times 10^{-19}} = 4.144 \\times 10^{-7}\\) m.",
        ],
        answer: "\\(4.14 \\times 10^{-7}\\) m, about 4144 Å",
      },
      practiceSet: [
        { prompt: "Two metals have work functions 2.25 eV and 2.14 eV. Which has the longer threshold wavelength?", answer: "The metal with 2.14 eV" },
        { prompt: "The threshold wavelength of a metal is 5000 Å. Find its work function in eV.", answer: "2.49 eV" },
        { prompt: "For a metal, \\(\\nu_0 = 6 \\times 10^{14}\\) Hz. Light of \\(9 \\times 10^{14}\\) Hz falls on it. Find \\(KE_{max}\\) in joule.", answer: "\\(h(\\nu - \\nu_0) = 1.989 \\times 10^{-19}\\) J" },
      ],
      pyqExampleId: "d4fd8f06-b945-42ae-9f2b-4f0f8c599e73",
      traps: [
        {
          title: "Dividing eV by h",
          body: "\\(\\nu_0 = \\phi_0/h\\) needs \\(\\phi_0\\) in joule. Multiply the eV value by \\(1.6 \\times 10^{-19}\\) first.",
        },
        {
          title: "Ending without a clear yes or no",
          body: "After finding both frequencies, compare them in words ('\\(\\nu < \\nu_0\\), so no photoelectrons are emitted'). The conclusion carries its own mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpdn-stopping-potential",
      name: "Stopping potential and the V₀ against ν graph",
      intuition:
        "The stopping potential measures the fastest electron's kinetic energy directly: a retarding potential V₀ takes away eV₀ of energy, so the current stops exactly when eV₀ equals KEmax. Put that into Einstein's equation and you get a straight line of V₀ against ν. Its slope, h/e, is the same for every metal, which is how Millikan measured h.",
      definition:
        "- At the stopping potential: \\(eV_0 = KE_{max}\\). In numbers, a \\(KE_{max}\\) of x eV means \\(V_0 = x\\) V.\n" +
        "- Putting this into Einstein's equation: \\(eV_0 = h\\nu - \\phi_0\\), so \\(V_0 = \\left(\\dfrac{h}{e}\\right)\\nu - \\dfrac{\\phi_0}{e}\\).\n" +
        "- The graph of \\(V_0\\) against \\(\\nu\\) is a straight line. Its **slope \\(h/e\\)** is the same for all metals; its intercept on the frequency axis is \\(\\nu_0\\) and differs from metal to metal.\n" +
        "- With \\(\\nu = c/\\lambda\\): \\(V_0 = \\dfrac{hc}{e}\\cdot\\dfrac{1}{\\lambda} - \\dfrac{\\phi_0}{e}\\), a straight line in \\(1/\\lambda\\) (the inverse linear dependence on wavelength).\n" +
        "- \\(V_0\\) depends on the frequency and the metal, not on the intensity. With light of many frequencies, the shortest wavelength decides \\(V_0\\).\n" +
        "- Two readings \\((\\nu_1, V_1)\\) and \\((\\nu_2, V_2)\\) on one metal give \\(h = \\dfrac{e(V_2 - V_1)}{\\nu_2 - \\nu_1}\\).",
      formula: {
        label: "Stopping potential",
        latex: "eV_0 = h\\nu - \\phi_0, \\qquad V_0 = \\frac{h}{e}\\nu - \\frac{\\phi_0}{e}",
      },
      authoredExample: {
        prompt:
          "For a metal, light of frequency \\(1.0 \\times 10^{15}\\) Hz gives a stopping potential of 2.0 V, and light of frequency \\(1.5 \\times 10^{15}\\) Hz gives 4.1 V. Find Planck's constant and the work function of the metal. (\\(e = 1.6 \\times 10^{-19}\\) C)",
        steps: [
          "Given: \\(\\nu_1 = 1.0 \\times 10^{15}\\) Hz, \\(V_1 = 2.0\\) V; \\(\\nu_2 = 1.5 \\times 10^{15}\\) Hz, \\(V_2 = 4.1\\) V.",
          "Formula: \\(eV_0 = h\\nu - \\phi_0\\). Subtracting the two equations removes \\(\\phi_0\\): \\(h = \\dfrac{e(V_2 - V_1)}{\\nu_2 - \\nu_1}\\).",
          "\\(h = \\dfrac{1.6 \\times 10^{-19} \\times 2.1}{0.5 \\times 10^{15}} = 6.72 \\times 10^{-34}\\) J s.",
          "\\(\\phi_0 = h\\nu_1 - eV_1 = 6.72 \\times 10^{-19} - 3.2 \\times 10^{-19} = 3.52 \\times 10^{-19}\\) J.",
          "In electronvolt: \\(\\dfrac{3.52 \\times 10^{-19}}{1.6 \\times 10^{-19}} = 2.2\\) eV.",
        ],
        answer: "\\(h = 6.72 \\times 10^{-34}\\) J s; \\(\\phi_0 = 3.52 \\times 10^{-19}\\) J = 2.2 eV",
      },
      selfCheckExample: {
        prompt: "The slope of a graph of stopping potential against frequency is \\(4.14 \\times 10^{-15}\\) V s. Find Planck's constant. (\\(e = 1.6 \\times 10^{-19}\\) C)",
        steps: ["Slope \\(= h/e\\), so \\(h = 4.14 \\times 10^{-15} \\times 1.6 \\times 10^{-19}\\)."],
        answer: "\\(6.62 \\times 10^{-34}\\) J s",
      },
      practiceSet: [
        { prompt: "The intensity of light is doubled at the same frequency. What happens to the stopping potential?", answer: "It does not change" },
        { prompt: "Does the slope of the stopping potential against frequency graph depend on the metal?", answer: "No. It is \\(h/e\\) for every metal" },
        { prompt: "Light containing many wavelengths falls on a metal. Which wavelength decides the stopping potential?", answer: "The shortest wavelength" },
        { prompt: "Where does the stopping potential against frequency line meet the frequency axis?", answer: "At the threshold frequency \\(\\nu_0\\)" },
      ],
      pyqExampleId: "0ee066d9-8b03-41b6-b748-bc1f28072014",
      traps: [
        {
          title: "Writing the stopping potential in eV",
          body: "Kinetic energy is in eV (or J); the stopping potential is in volt. They are numerically equal, but the units differ.",
        },
        {
          title: "Using hc/e as the slope against frequency",
          body: "Against \\(\\nu\\) the slope is \\(h/e\\). Only against \\(1/\\lambda\\) is the slope \\(hc/e\\).",
        },
        {
          title: "Thinking brighter light raises the stopping potential",
          body: "Intensity changes the saturation current only. \\(V_0\\) is set by the frequency and the metal.",
        },
      ],
    },
  ],
};
