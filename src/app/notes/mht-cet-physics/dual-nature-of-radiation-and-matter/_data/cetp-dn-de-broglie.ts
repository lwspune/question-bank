import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/dual-nature-of-radiation-and-matter";

export const DE_BROGLIE_NOTE: SubtopicNote = {
  subtopicName: "de Broglie Wavelength and Matter Waves",
  title: "The de Broglie Wavelength",
  oneLineDefinition:
    "Every moving particle has a wavelength λ = h/p; for a particle of kinetic energy E this is h/√(2mE), and for an electron accelerated from rest through V volts it is h/√(2meV), about 12.27/√V ångström.",
  whyItMatters:
    "26 PYQs, 6 of them HARD. Thirteen use λ = h/p with energy — comparing a particle with a photon, changing the kinetic energy, a neutron's wavelength at two temperatures. " +
    "Nine are electrons accelerated through a potential difference, and four fit the electron's wave round a Bohr orbit. Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-dn-wavelength-and-energy",
      name: "Wavelength, Momentum and Kinetic Energy",
      intuition:
        "The wavelength depends only on momentum: λ = h/p. For a slow particle p = √(2mE), so λ ∝ 1/√E — doubling the kinetic energy divides λ by √2, and halving λ needs four times the energy, three times more added. A thermal neutron has E ∝ T, so λ ∝ 1/√T. A photon is different: its energy is E = pc, so λ = hc/E. Comparing the two at the same energy or the same wavelength is a common HARD question: for equal wavelengths the particle's kinetic energy is smaller than the photon's by the factor h/(2λmc).",
      definition:
        "- \\(\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv} = \\dfrac{h}{\\sqrt{2mE}}\\), so \\(\\lambda \\propto E^{-1/2}\\); impulse = change in p.\n" +
        "- Neutron at temperature T: \\(\\lambda \\propto \\dfrac{1}{\\sqrt{T}}\\) (27 °C → 927 °C halves λ).\n" +
        "- Photon: \\(\\lambda = \\dfrac{hc}{E}\\). Same energy: \\(\\dfrac{\\lambda_{\\text{photon}}}{\\lambda_{e}} = c\\sqrt{\\dfrac{2m}{E}}\\).\n" +
        "- Same wavelength: \\(\\dfrac{KE_e}{E_{\\text{photon}}} = \\dfrac{h}{2\\lambda mc}\\).\n" +
        "- Accelerated by a field E from rest: \\(\\lambda = \\dfrac{h}{eEt}\\), \\(\\dfrac{d\\lambda}{dt} = -\\dfrac{h}{eEt^2}\\).",
      formula: {
        label: "de Broglie wavelength",
        latex: "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mE}}",
      },
      authoredExample: {
        prompt: "An electron (m = 9.1 × 10⁻³¹ kg) has kinetic energy 100 eV. Its de Broglie wavelength?",
        steps: ["p = √(2 × 9.1 × 10⁻³¹ × 1.6 × 10⁻¹⁷) = 5.4 × 10⁻²⁴ kg m/s.", "λ = 6.63 × 10⁻³⁴ / 5.4 × 10⁻²⁴ = 1.23 × 10⁻¹⁰ m."],
        answer: "≈ 0.123 nm",
      },
      selfCheckExample: {
        prompt: "A particle's kinetic energy is made 9 times larger. Its de Broglie wavelength?",
        steps: ["λ ∝ 1/√E."],
        answer: "One third",
      },
      practiceSet: [
        { prompt: "Energy to add to halve an electron's wavelength, as a multiple of its initial energy?", answer: "3" },
        { prompt: "Kinetic energy 'increased by 2 times' (tripled). Factor on λ?", answer: "1/√3" },
      ],
      pyqExampleId: "37ad1eff-6701-44d8-9943-43d62e80313f",
      traps: [
        {
          title: "Writing λ ∝ 1/E",
          body:
            "Momentum goes as the square root of kinetic energy, so λ ∝ E^(−1/2). Doubling E divides λ by √2, not by 2.",
        },
        {
          title: "Using λ = h/√(2mE) for a photon",
          body:
            "A photon has no rest mass; its wavelength is hc/E. Comparing a photon and a particle means using a different formula for each.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-dn-accelerated-electron",
      name: "Electrons Accelerated Through a Potential Difference",
      intuition:
        "An electron that falls through V volts gains kinetic energy eV, so λ = h/√(2meV) ≈ 12.27/√V Å. Everything is a square root: four times the voltage halves the wavelength, and a 50% longer wavelength needs 4/9 of the voltage. For particles of the same charge but different mass, a graph of λ against 1/√V is a straight line of slope h/√(2mq), so the heaviest particle has the shallowest line.",
      definition:
        "- \\(\\lambda = \\dfrac{h}{\\sqrt{2meV}} \\approx \\dfrac{12.27}{\\sqrt{V}}\\) Å; \\(\\lambda \\propto \\dfrac{1}{\\sqrt{V}}\\).\n" +
        "- V → 4V halves λ; V doubled ⇒ λ decreased to \\(\\dfrac{1}{\\sqrt{2}}\\) times; λ up 50% ⇒ \\(\\dfrac{V_1}{V_2} = \\dfrac{9}{4}\\).\n" +
        "- From a speed: \\(V = \\dfrac{mv^2}{2e}\\) (\\(1.6\\times10^7\\) m/s ⇒ 720 V).\n" +
        "- λ–(1/√V) graph: slope \\(\\propto \\dfrac{1}{\\sqrt{m}}\\); shallowest line = largest mass.",
      formula: {
        label: "Accelerated electron",
        latex: "\\lambda = \\frac{h}{\\sqrt{2meV}} \\approx \\frac{12.27}{\\sqrt{V}}\\ \\text{Å}",
      },
      authoredExample: {
        prompt: "An electron is accelerated through 100 V. Its de Broglie wavelength?",
        steps: ["λ = 12.27/√100 Å."],
        answer: "1.227 Å",
      },
      selfCheckExample: {
        prompt: "The same electron is accelerated through 400 V instead. Its wavelength?",
        steps: ["Four times the voltage halves λ."],
        answer: "≈ 0.61 Å",
      },
      practiceSet: [
        { prompt: "Accelerating voltage raised from 16 kV to 64 kV. Wavelength?", answer: "Halves" },
      ],
      pyqExampleId: "248dffb1-68fa-4c06-ad8b-6341cc7a9cd2",
      traps: [
        {
          title: "Reading 'decreased to 1/√2 times' as 'increased'",
          body:
            "A larger voltage gives a larger momentum and a SHORTER wavelength. The options pair the right factor with the wrong direction.",
        },
        {
          title: "Picking the steepest line as the heaviest particle",
          body:
            "On λ against 1/√V, the slope is h/√(2mq): a heavier particle has a SMALLER slope.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-dn-bohr-orbit-waves",
      name: "The Electron's Wave Round a Bohr Orbit",
      intuition:
        "Bohr's condition mvr = nh/2π says the electron's de Broglie wave fits round its orbit a whole number of times: nλ = 2πr. So λ = 2πr/n, and with r ∝ n², λ ∝ n. If the first orbit has radius r, the nth has n²r and the wavelength there is 2πnr. Jumping to a higher orbit therefore lengthens the wavelength.",
      definition:
        "- \\(n\\lambda = 2\\pi r_n\\), so \\(\\lambda_n = \\dfrac{2\\pi r_n}{n}\\).\n" +
        "- With \\(r_n = n^2 r\\): \\(\\lambda_n = 2\\pi n r \\propto n\\) (4th orbit ⇒ 8πr).",
      formula: {
        label: "Standing wave on an orbit",
        latex: "n\\lambda = 2\\pi r_n, \\qquad \\lambda_n = 2\\pi n r_1",
      },
      authoredExample: {
        prompt: "The first Bohr radius is r. De Broglie wavelength of the electron in the second orbit?",
        steps: ["r₂ = 4r; λ = 2π(4r)/2."],
        answer: "4πr",
      },
      selfCheckExample: {
        prompt: "Same atom, third orbit?",
        steps: ["λ = 2π × 3 × r."],
        answer: "6πr",
      },
      practiceSet: [
        { prompt: "The electron jumps to a higher orbit. Its de Broglie wavelength?", answer: "Increases" },
      ],
      pyqExampleId: "9f41006b-8527-4747-acc4-9297498a75ea",
      traps: [
        {
          title: "Dividing the first-orbit circumference by n",
          body:
            "λ = 2πrₙ/n uses the radius of the nth orbit, n²r. With r₁ it gives 2πr/n, which shrinks with n; the correct λ = 2πnr grows.",
        },
      ],
    },
  ],
  related: [
    { label: "The Photoelectric Effect — light as particles", href: `${BASE}/cetp-dn-photoelectric` },
    { label: "Bohr's model — the orbits these waves fit", href: "/notes/mht-cet-physics/structure-of-atoms-and-nuclei/cetp-an-bohr" },
  ],
};
