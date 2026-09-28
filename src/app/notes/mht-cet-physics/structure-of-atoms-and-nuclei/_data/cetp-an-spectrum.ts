import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/structure-of-atoms-and-nuclei";

export const SPECTRUM_NOTE: SubtopicNote = {
  subtopicName: "Hydrogen Spectrum and Spectral Series",
  title: "The Hydrogen Spectrum and its Series",
  oneLineDefinition:
    "Every line of the hydrogen spectrum is a jump down to a fixed lower level, with 1/λ = RZ²(1/n_f² − 1/n_i²); the lower level names the series — Lyman, Balmer, Paschen, Brackett — and within a series the first line is the longest wavelength and the series limit the shortest.",
  whyItMatters:
    "28 PYQs, 7 of them HARD. Sixteen are about the series themselves: which one is visible, the frequency or wave number of a series limit, and relations between limits and first lines. " +
    "Twelve ask for the ratio of two named lines, sometimes in a hydrogen-like ion, or for the level a photon came from. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-an-series-limits",
      name: "The Series, Their First Lines and Their Limits",
      intuition:
        "Fix the lower level n_f and let the upper level run: n_f = 1 gives the Lyman series (ultraviolet), 2 the Balmer (visible), 3 the Paschen, 4 the Brackett and 5 the Pfund (all infrared). The first line comes from the nearest level, n_f + 1, and has the smallest energy, so the LONGEST wavelength. The series limit comes from n = ∞, 1/λ = R/n_f², and has the SHORTEST wavelength. Frequency is c/λ and wave number is 1/λ, so the Balmer limit has wave number R/4 and frequency Rc/4. Because limits and first lines are differences of the same terms, they combine: the Lyman limit minus the first Lyman line is the Balmer limit. A source moving away stretches every line by Δλ/λ = v/c.",
      definition:
        "- Lyman (n_f = 1, UV), **Balmer (2, visible)**, Paschen (3), Brackett (4), Pfund (5) — infrared.\n" +
        "- **First line** \\((n_f + 1 \\to n_f)\\): longest λ. **Series limit** \\((\\infty \\to n_f)\\): shortest λ, \\(\\dfrac{1}{\\lambda} = \\dfrac{R}{n_f^2}\\).\n" +
        "- Balmer limit: wave number \\(\\dfrac{R}{4}\\), frequency \\(\\dfrac{Rc}{4}\\). Lyman max/min λ = 4 : 3.\n" +
        "- Limits in a ratio: \\(\\dfrac{\\lambda_{\\text{Lyman}}}{\\lambda_{\\text{Balmer}}} = \\dfrac{1}{4}\\); Paschen/Balmer = 9/4.\n" +
        "- Combining terms: \\(\\dfrac{1}{\\lambda_{L,\\infty}} - \\dfrac{1}{\\lambda_{L,1}} = \\dfrac{1}{\\lambda_{B,\\infty}}\\); \\(\\nu_{B,\\infty} - \\nu_{B,1} = \\nu_{P,\\infty}\\).\n" +
        "- Photon from an energy gap: \\(\\lambda = \\dfrac{hc}{\\Delta E} = \\dfrac{1240}{\\Delta E\\,(\\text{eV})}\\) nm.\n" +
        "- Receding source: \\(\\dfrac{\\Delta\\lambda}{\\lambda} = \\dfrac{v}{c}\\).",
      formula: {
        label: "Series limit",
        latex: "\\frac{1}{\\lambda_\\infty} = \\frac{R}{n_f^2}, \\qquad \\nu_\\infty = \\frac{Rc}{n_f^2}",
      },
      authoredExample: {
        prompt: "With R = 1.097 × 10⁷ m⁻¹, what is the wavelength of the Balmer series limit?",
        steps: ["1/λ = R/4.", "λ = 4/(1.097 × 10⁷) = 3.65 × 10⁻⁷ m."],
        answer: "≈ 365 nm",
      },
      selfCheckExample: {
        prompt: "With R = 1.1 × 10⁷ m⁻¹, wave number of the Paschen series limit?",
        steps: ["R/9."],
        answer: "≈ 1.22 × 10⁶ m⁻¹",
      },
      practiceSet: [
        { prompt: "Which hydrogen series lies in the visible region?", answer: "Balmer" },
        { prompt: "The shortest Balmer wavelength equals the shortest Brackett wavelength of an ion of atomic number Z. Z?", answer: "2" },
      ],
      pyqExampleId: "beeb5e4c-a25c-4c83-8869-c502221ee763",
      traps: [
        {
          title: "Calling the series limit the longest wavelength",
          body:
            "The limit comes from n = ∞, the biggest jump into that level, so it has the most energy and the SHORTEST wavelength. The first line is the longest.",
        },
        {
          title: "Using n_f = 1 for every series",
          body:
            "Only Lyman ends on n = 1. The Balmer limit is R/4, not R; Paschen's is R/9. Set the lower level from the series name before substituting.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-an-line-ratios",
      name: "Ratios of Two Lines",
      intuition:
        "Write 1/λ = RZ²(1/n_f² − 1/n_i²) for each line and divide; R cancels, and so does Z if both lines are in one atom. The wavelength ratio is the INVERSE of the ratio of the brackets, and the frequency ratio is the ratio of the brackets itself. The same transition in two hydrogen-like ions gives λ ∝ 1/Z². To find the level a photon came from, solve the formula for n_i. The highest-frequency emission is the one with the biggest bracket, which is usually a jump into n = 1: 2 → 1 beats 5 → 3 and 6 → 2. A jump UP is absorption, not emission.",
      definition:
        "- \\(\\dfrac{1}{\\lambda} = RZ^2\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)\\); \\(\\dfrac{\\lambda_1}{\\lambda_2}\\) = inverse ratio of the brackets.\n" +
        "- Common brackets: \\(2\\to1: \\tfrac{3}{4}\\); \\(3\\to1: \\tfrac{8}{9}\\); \\(3\\to2: \\tfrac{5}{36}\\); \\(4\\to2: \\tfrac{3}{16}\\); \\(4\\to3: \\tfrac{7}{144}\\); \\(5\\to4: \\tfrac{9}{400}\\).\n" +
        "- First Paschen to first Lyman: \\(\\dfrac{\\lambda_P}{\\lambda_L} = \\dfrac{3/4}{7/144} = \\dfrac{108}{7}\\).\n" +
        "- Same transition, two ions: \\(\\lambda \\propto \\dfrac{1}{Z^2}\\) (He⁺⁺ : Li⁺⁺⁺ ⇒ 9 : 4).\n" +
        "- Level of origin, photon λ into n = 1: \\(n = \\sqrt{\\dfrac{\\lambda R}{\\lambda R - 1}}\\).",
      formula: {
        label: "Rydberg formula",
        latex: "\\frac{1}{\\lambda} = RZ^2\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)",
      },
      authoredExample: {
        prompt: "With R = 1.097 × 10⁷ m⁻¹, wavelength of the first Balmer line (3 → 2)?",
        steps: ["1/λ = R(1/4 − 1/9) = 5R/36.", "λ = 36/(5 × 1.097 × 10⁷) = 6.56 × 10⁻⁷ m."],
        answer: "≈ 656 nm",
      },
      selfCheckExample: {
        prompt: "Ratio of the wavelengths of the 3 → 1 and 3 → 2 lines in hydrogen?",
        steps: ["Brackets 8/9 and 5/36; invert their ratio."],
        answer: "5 : 32",
      },
      practiceSet: [
        { prompt: "Longest-wavelength lines of Lyman and Balmer: λ_L/λ_B?", answer: "5/27" },
        { prompt: "Which emits the highest frequency: 2 → 1, 5 → 3 or 6 → 2?", answer: "2 → 1" },
      ],
      pyqExampleId: "0c028811-3be3-4beb-ae88-8d9875506843",
      traps: [
        {
          title: "Dividing wavelengths the way the brackets divide",
          body:
            "The bracket is 1/λ. A larger bracket means a SHORTER wavelength, so the wavelength ratio is the brackets' ratio turned upside down.",
        },
        {
          title: "Counting an upward jump as emission",
          body:
            "n = 1 to n = 2 absorbs a photon. 'Which transition emits the highest frequency' excludes every jump upward, however large.",
        },
      ],
    },
  ],
  related: [
    { label: "Bohr Model — the energy levels behind the lines", href: `${BASE}/cetp-an-bohr` },
  ],
};
