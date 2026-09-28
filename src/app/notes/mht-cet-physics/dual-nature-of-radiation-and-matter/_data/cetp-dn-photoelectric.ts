import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/dual-nature-of-radiation-and-matter";

export const PHOTOELECTRIC_NOTE: SubtopicNote = {
  subtopicName: "Photoelectric Effect — Stopping Potential, Threshold, and Work Function",
  title: "The Photoelectric Effect",
  oneLineDefinition:
    "Light ejects electrons from a metal one photon at a time: each photon of energy hν gives one electron at most hν − φ of kinetic energy, so the frequency decides whether emission happens and how fast the electrons leave, while the intensity only decides how many leave.",
  whyItMatters:
    "56 PYQs, 20 of them HARD. Fifteen test what intensity and frequency each control. Eighteen apply Einstein's equation to one situation — a speed, a stopping potential, a threshold wavelength. " +
    "Fifteen, most of the HARD ones, give two readings at two wavelengths or frequencies and ask for the work function or the threshold; eight read a photocurrent or stopping-potential graph. " +
    "Four cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-dn-photoelectric-laws",
      name: "What Intensity and Frequency Each Control",
      intuition:
        "Each photon carries energy hν, and one photon frees at most one electron. So FREQUENCY sets the energy per electron: below the threshold ν₀ = φ/h nothing is emitted however bright the light, and above it the maximum kinetic energy rises linearly with ν. INTENSITY sets the number of photons: it changes the photocurrent and the saturation current, never the stopping potential. Moving a source farther away dims it but leaves the stopping potential alone. Doubling the frequency more than doubles the kinetic energy, because KE = hν − φ has the work function subtracted. Photons also carry momentum h/λ, so light absorbed on a surface pushes with force P/c, and light reflected with 2P/c. Diffraction shows light's wave nature and the photoelectric effect its particle nature.",
      definition:
        "- **Frequency** decides emission (\\(\\nu \\ge \\nu_0\\), or \\(\\lambda \\le \\lambda_0\\)) and \\(KE_{\\max}\\), which is linear in ν.\n" +
        "- **Intensity** decides the number of electrons: photocurrent and saturation current ∝ intensity.\n" +
        "- Stopping potential is independent of intensity; frequency below threshold gives **zero** current.\n" +
        "- Doubling ν: \\(KE' = 2KE + \\phi > 2KE\\); \\(KE' = KE + h\\nu\\).\n" +
        "- Radiation force: absorbed \\(\\dfrac{P}{c}\\), reflected \\(\\dfrac{2P}{c}\\) (90 W, half each ⇒ \\(4.5\\times10^{-7}\\) N).",
      formula: {
        label: "Threshold",
        latex: "h\\nu_0 = \\phi = \\frac{hc}{\\lambda_0}",
      },
      authoredExample: {
        prompt: "Light of frequency 3ν₀ falls on a metal. Its intensity is doubled and its frequency halved. What happens to the current and the stopping potential?",
        steps: ["1.5ν₀ is still above threshold, so emission continues.", "Current doubles with intensity; stopping potential falls because hν − φ falls from 2hν₀ to 0.5hν₀."],
        answer: "Current doubles; stopping potential falls to a quarter",
      },
      selfCheckExample: {
        prompt: "Light at 3 times the threshold frequency is changed to a quarter of that frequency and three times the intensity. Photocurrent?",
        steps: ["0.75ν₀ is below threshold."],
        answer: "Zero",
      },
      practiceSet: [
        { prompt: "The number of photoelectrons emitted per second is proportional to?", answer: "Intensity" },
        { prompt: "A point source is moved farther from the metal. Stopping potential?", answer: "Unchanged" },
      ],
      pyqExampleId: "680957dd-c206-440c-af1c-71d9de23de46",
      traps: [
        {
          title: "Letting intensity change the stopping potential",
          body:
            "Brighter light means more photons of the SAME energy. The number of electrons goes up; their maximum energy, and so the stopping potential, does not.",
        },
        {
          title: "Saying doubled frequency doubles the kinetic energy",
          body:
            "KE = hν − φ. At 2ν it is 2hν − φ = 2KE + φ — more than double. The stopping potential likewise becomes more than double.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-dn-einstein-equation",
      name: "Einstein's Equation in One Situation",
      intuition:
        "Einstein's equation balances the photon's energy against the work function and the electron's kinetic energy: hν = φ + ½mv²ₘₐₓ, and the stopping potential is that kinetic energy in electron-volts, eV₀ = ½mv²ₘₐₓ. When the photon energy is given as a multiple of φ, the kinetic energy is that multiple minus one, and speeds go as the square root: photons of 2φ and 3φ give speeds in the ratio 1 : √2. With hc = 1240 eV nm, a wavelength in nanometres converts to photon energy in eV at once.",
      definition:
        "- \\(h\\nu = \\phi + \\tfrac{1}{2}mv_{\\max}^2\\); \\(eV_0 = \\tfrac{1}{2}mv_{\\max}^2\\).\n" +
        "- \\(E_{\\text{photon}}(\\text{eV}) = \\dfrac{1240}{\\lambda\\,(\\text{nm})}\\): 310 nm on φ = 1.13 eV ⇒ \\(V_0 = 2.87\\) V.\n" +
        "- Photons of kφ: \\(KE = (k - 1)\\phi\\), \\(v \\propto \\sqrt{k - 1}\\) (2φ and 5φ ⇒ 1 : 2).\n" +
        "- Threshold ν, incident 4ν: \\(v = \\sqrt{\\dfrac{6h\\nu}{m}}\\).\n" +
        "- From \\(v\\) and \\(e/m\\): \\(V_0 = \\dfrac{v^2}{2(e/m)}\\).\n" +
        "- Two frequencies on one surface: \\(v_1^2 - v_2^2 = \\dfrac{2h}{m}(n_1 - n_2)\\).",
      formula: {
        label: "Einstein's equation",
        latex: "h\\nu = \\phi + \\tfrac{1}{2}mv_{\\max}^2 = \\phi + eV_0",
      },
      authoredExample: {
        prompt: "Light of 248 nm falls on a metal of work function 2.0 eV. Stopping potential?",
        steps: ["Photon energy = 1240/248 = 5.0 eV.", "eV₀ = 5.0 − 2.0 = 3.0 eV."],
        answer: "3.0 V",
      },
      selfCheckExample: {
        prompt: "Photons of 3φ and 9φ fall on the same metal. Ratio of maximum speeds?",
        steps: ["KE = 2φ and 8φ; speed ∝ √KE."],
        answer: "1 : 2",
      },
      practiceSet: [
        { prompt: "Stopping potential 10 V. Maximum kinetic energy in joules?", answer: "1.6 × 10⁻¹⁸ J" },
        { prompt: "Work functions 2.3 eV and 4.5 eV. Ratio of threshold wavelengths?", answer: "About 2 : 1" },
      ],
      pyqExampleId: "741d2e89-9cbe-4118-a6e8-836dccc526a4",
      traps: [
        {
          title: "Taking the speed ratio from the photon energies",
          body:
            "Speed goes with the kinetic energy, and KE is the photon energy MINUS φ. Photons of 2φ and 3φ give KE φ and 2φ, speeds 1 : √2 — not √2 : √3.",
        },
        {
          title: "Scaling the work function with the frequency",
          body:
            "φ belongs to the metal. Two metals with φ in the ratio 1 : 2 lit by f and 2f give KE hf − φ and 2hf − 2φ, a ratio of 1 : 2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-dn-two-readings",
      name: "Threshold From Two Readings",
      intuition:
        "One reading has two unknowns, the photon energy scale and φ. Two readings at two wavelengths fix both. Write eV₁ = hc/λ₁ − φ and eV₂ = hc/λ₂ − φ, then eliminate: subtracting removes φ, and a ratio of stopping potentials lets you multiply one equation to match the other. Once φ is known as a fraction of hc/λ, the threshold wavelength is hc/φ. The same method works with frequencies or with a ratio of kinetic energies.",
      definition:
        "- \\(eV_1 = \\dfrac{hc}{\\lambda_1} - \\phi\\), \\(eV_2 = \\dfrac{hc}{\\lambda_2} - \\phi\\); eliminate, then \\(\\lambda_0 = \\dfrac{hc}{\\phi}\\).\n" +
        "- 4.8 V at λ, 1.6 V at 2λ ⇒ \\(\\lambda_0 = 4\\lambda\\). V at λ, V/6 at 3λ ⇒ \\(5\\lambda\\). 4V₀ at λ, V₀ at 3λ ⇒ \\(9\\lambda\\).\n" +
        "- Frequencies: V₀ at ν, V₀/4 at ν/2 ⇒ \\(\\nu_0 = \\dfrac{\\nu}{3}\\).\n" +
        "- KE ratio 1 : k at \\(\\nu_1, \\nu_2\\): \\(\\nu_0 = \\dfrac{k\\nu_1 - \\nu_2}{k - 1}\\).\n" +
        "- Speeds V and 2V: \\(\\phi = \\dfrac{hc}{3}\\left[\\dfrac{4}{\\lambda_1} - \\dfrac{1}{\\lambda_2}\\right]\\).",
      formula: {
        label: "Two readings",
        latex: "e(V_1 - V_2) = hc\\left(\\frac{1}{\\lambda_1} - \\frac{1}{\\lambda_2}\\right), \\qquad \\lambda_0 = \\frac{hc}{\\phi}",
      },
      authoredExample: {
        prompt: "Light of wavelength λ gives a stopping potential of 3 V; light of 2λ gives 1 V. Threshold wavelength?",
        steps: ["Subtract: 2 = hc/λ − hc/2λ = hc/2λ, so hc/λ = 4 eV.", "φ = 4 − 3 = 1 eV = (hc/λ)/4, so λ₀ = 4λ."],
        answer: "4λ",
      },
      selfCheckExample: {
        prompt: "Stopping potential 2 V at wavelength λ and 0.5 V at 2λ. Threshold wavelength?",
        steps: ["hc/2λ = 1.5 eV, so hc/λ = 3 eV and φ = 1 eV."],
        answer: "3λ",
      },
      practiceSet: [
        { prompt: "KE at λ is E and at λ/3 is 4E. Work function?", answer: "hc/(3λ)" },
        { prompt: "KE at λ is a quarter of the KE at λ/2. Work function?", answer: "2hc/(3λ)" },
      ],
      pyqExampleId: "9862fa23-ab4a-4a8d-bebd-dbd247e1431f",
      traps: [
        {
          title: "Dividing the two equations directly",
          body:
            "V₁/V₂ is not (hc/λ₁)/(hc/λ₂): φ sits in both. Multiply one equation so the stopping potentials match, then subtract.",
        },
        {
          title: "Swapping λ₁ and λ₂ in the answer",
          body:
            "The longer wavelength gives the SLOWER electron. With speeds V at λ₁ and 2V at λ₂, the 4 goes with 1/λ₁: φ = (hc/3)(4/λ₁ − 1/λ₂).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-dn-photoelectric-graphs",
      name: "Reading the Photoelectric Graphs",
      intuition:
        "Photocurrent against anode potential: the current is zero at the stopping potential (on the negative side) and levels off at the saturation current (on the positive side). Where a curve meets the axis tells you the FREQUENCY — a more negative cut-off means a higher frequency — and how high it levels off tells you the INTENSITY. Stopping potential against frequency is a straight line of slope h/e for every metal; it cuts the axis at the threshold frequency, so the line further right belongs to the metal with the larger work function. Kinetic energy against frequency is the same line scaled by e, starting from the threshold.",
      definition:
        "- \\(I\\)–\\(V\\): cut-off ⇒ **frequency** (more negative = higher ν); saturation level ⇒ **intensity**.\n" +
        "- \\(V_0\\)–\\(\\nu\\): slope \\(\\dfrac{h}{e}\\) for every metal (slope × e = h); x-intercept \\(\\nu_0\\); intercept further right ⇒ larger φ.\n" +
        "- \\(KE\\)–\\(\\nu\\): straight line starting at \\(\\nu_0\\), slope h.",
      formula: {
        label: "Stopping-potential line",
        latex: "V_0 = \\frac{h}{e}\\nu - \\frac{\\phi}{e}",
      },
      authoredExample: {
        prompt: "Two curves on an I–V graph share the same saturation current, but one cuts off at −2 V and the other at −1 V. Compare them.",
        steps: ["Same saturation: same intensity.", "Cut-off at −2 V: larger stopping potential, higher frequency."],
        answer: "Same intensity; the −2 V curve has the higher frequency",
      },
      selfCheckExample: {
        prompt: "What is the slope of a stopping-potential against frequency line? (h = 6.6 × 10⁻³⁴ J s)",
        steps: ["Slope = h/e."],
        answer: "≈ 4.1 × 10⁻¹⁵ V s",
      },
      practiceSet: [
        { prompt: "Two metals with work functions φ and 2φ: ratio of slopes of their V₀–ν lines?", answer: "1 : 1" },
      ],
      pyqExampleId: "81bc5dee-35d9-49f5-b657-4efa56c6023f",
      traps: [
        {
          title: "Reading intensity from the cut-off",
          body:
            "The cut-off on the potential axis is set by frequency; the saturation height is set by intensity. Curves that meet at one stopping potential share a frequency, whatever their heights.",
        },
      ],
    },
  ],
  related: [
    { label: "de Broglie — the wave nature of matter", href: `${BASE}/cetp-dn-de-broglie` },
    { label: "Atoms — photons emitted between energy levels", href: "/notes/mht-cet-physics/structure-of-atoms-and-nuclei/cetp-an-spectrum" },
  ],
};
