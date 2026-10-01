import type { SubtopicNote } from "@/app/notes/_types";

export const TRANSITIONS_ATOM_NOTE: SubtopicNote = {
  subtopicName: "Transition Energies, Excitation and X-rays",
  title: "Transition Energies, Excitation and X-rays",
  oneLineDefinition:
    "A jump between levels gives a photon carrying the energy gap; a photon is absorbed only if it matches a gap, a sample in level n gives n(n − 1)/2 lines, and the photon's momentum makes the atom recoil.",
  whyItMatters:
    "Twenty-seven PYQs, seventeen of them multiple choice, and one from 2026. Nine turn a jump into a photon's energy, wavelength or frequency, two of them read off an energy-level diagram. Twelve are about excitation: six count the spectral lines a sample emits, and six find a level, an energy or an atomic number from the energy taken in or given out. Six are about photon momentum: three find the recoil of the emitting atom, and three are about X-rays.",
  concepts: [
    // C1 — photon energy and wavelength of a jump
    {
      kind: "formula" as const,
      slug: "jpatom-photon-energy",
      name: "Photon energy and wavelength of a transition",
      intuition:
        "When the electron falls from one level to another, the photon carries away exactly the gap between them. Work out the gap in electron-volts, then turn it into a wavelength with hc = 1240 eV nm. The gaps shrink as you go up the ladder, so the biggest photon energies, and the highest frequencies, come from jumps that end on the ground state.",
      definition:
        "- **Gap:** \\(\\Delta E = 13.6\\,Z^2\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)\\) eV.\n" +
        "- **Wavelength:** \\(\\lambda\\,(\\text{nm}) = \\dfrac{1240}{\\Delta E\\,(\\text{eV})}\\). If a question gives its own h or hc (1242, 1245, or \\(h = 4 \\times 10^{-15}\\) eV s, which with \\(c = 3 \\times 10^{8}\\) m/s makes hc = 1200 eV nm), use that value.\n" +
        "- **Frequency:** \\(\\nu = \\dfrac{\\Delta E}{h}\\).\n" +
        "- Hydrogen's gaps shrink upward: 2 → 1 is 10.2 eV, 3 → 2 is 1.89 eV, 4 → 3 is 0.66 eV. Among single jumps, the one nearest the ground state has the largest frequency.\n" +
        "- **Which level did a photon come from?** Set \\(\\dfrac{1}{\\lambda} = RZ^2\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)\\) and solve for \\(n_i\\).\n" +
        "- **Ratio of orbit radii given:** \\(r \\propto n^2\\), so take square roots to find the two n values before working out the gap.",
      formula: {
        label: "Energy and wavelength of a transition",
        latex: "\\Delta E = 13.6\\,Z^2\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)\\ \\text{eV}, \\qquad \\lambda\\,(\\text{nm}) = \\frac{1240}{\\Delta E\\,(\\text{eV})}",
      },
      authoredExample: {
        prompt:
          "The electron in He⁺ falls from n = 3 to n = 2. Find the photon's energy, wavelength and frequency. (hc = 1240 eV nm, \\(h = 4.14 \\times 10^{-15}\\) eV s)",
        steps: [
          "\\(\\Delta E = 13.6 \\times 4 \\times \\left(\\dfrac{1}{4} - \\dfrac{1}{9}\\right) = 54.4 \\times \\dfrac{5}{36} \\approx 7.56\\) eV.",
          "\\(\\lambda = \\dfrac{1240}{7.56} \\approx 164\\) nm.",
          "\\(\\nu = \\dfrac{7.56}{4.14 \\times 10^{-15}} \\approx 1.83 \\times 10^{15}\\) Hz.",
        ],
        answer: "About 7.56 eV, 164 nm and \\(1.83 \\times 10^{15}\\) Hz.",
      },
      selfCheckExample: {
        prompt:
          "A hydrogen atom returns to its ground state by emitting a single photon of wavelength 102.6 nm. From which level did it fall? (hc = 1240 eV nm)",
        steps: [
          "\\(\\Delta E = \\dfrac{1240}{102.6} \\approx 12.09\\) eV.",
          "\\(13.6\\left(1 - \\dfrac{1}{n^2}\\right) = 12.09\\), so \\(\\dfrac{1}{n^2} \\approx 0.111\\) and \\(n^2 \\approx 9\\).",
        ],
        answer: "n = 3",
      },
      practiceSet: [
        { prompt: "Energy of the photon when the electron in Li²⁺ falls from n = 2 to n = 1?", answer: "91.8 eV" },
        { prompt: "In hydrogen, which jump gives the longest wavelength: 2 → 1, 4 → 2 or 5 → 4?", answer: "5 → 4 (the smallest gap)" },
        { prompt: "A hydrogen atom emits a 1.89 eV photon. Which jump was it?", answer: "3 → 2" },
        { prompt: "Wavelength of a 3.0 eV photon, and the region it lies in? (hc = 1240 eV nm)", answer: "About 413 nm; visible (violet)" },
      ],
      pyqExampleId: "c5e2948e-d188-426d-ba32-563062f3862e", // 2023: 4 → 1 in hydrogen with h = 4 × 10⁻¹⁵ eV s
      traps: [
        {
          title: "Use the constants the question gives",
          body: "hc = 1240 eV nm is the default, but a question that states h = 4 × 10⁻¹⁵ eV s means hc = 1200 eV nm, and its answer is built on that. Options are often 2–3% apart.",
        },
        {
          title: "The gap scales as Z²",
          body: "The same jump in He⁺ releases 4 times the energy it does in hydrogen, and in Li²⁺ 9 times. Leaving Z out treats every ion as hydrogen.",
        },
        {
          title: "Big frequency means a jump near the ground state",
          body: "The 2 → 1 gap is larger than any jump between higher levels, such as 5 → 4. The higher the levels, the closer they sit, the smaller the photon.",
        },
      ],
    },

    // C2 — excitation and counting lines
    {
      kind: "formula" as const,
      slug: "jpatom-excitation",
      name: "Excitation, absorption and the number of spectral lines",
      intuition:
        "A photon is all or nothing: it is absorbed only if its energy matches a gap exactly. An electron hitting the atom can hand over just part of its energy, so it lifts the atom to the highest level it can afford. Once a sample of atoms is excited to level n, different atoms fall by different routes, and every pair of levels gives its own line.",
      definition:
        "- **Lines from a sample** excited to level n: \\(N = \\dfrac{n(n - 1)}{2}\\). A single atom gives at most n − 1 photons on its way down.\n" +
        "- **Hydrogen's gaps from the ground state:** n = 2: 10.2 eV; n = 3: 12.09 eV; n = 4: 12.75 eV; n = 5: 13.06 eV; ionisation: 13.6 eV.\n" +
        "- **Photon:** absorbed only if hν equals one of these gaps exactly, or exceeds 13.6 eV (then it ionises).\n" +
        "- **Electron of energy K:** lifts the atom to the highest level whose gap is at most K.\n" +
        "- **To see any Balmer line,** an atom must first reach n = 3 or higher, because a Balmer line ends on n = 2.\n" +
        "- **Franck–Hertz:** the current dips when the accelerating voltage reaches the first excitation energy, and the excited atoms then emit the 2 → 1 line.\n" +
        "- **Capture:** a free electron of kinetic energy K caught into level n gives a photon of \\(K + |E_n|\\).\n" +
        "- **Atomic number from a gap:** set \\(13.6\\,Z^2\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)\\) equal to the given gap and solve for Z.",
      formula: {
        label: "Lines from level n and the gap from the ground state",
        latex: "N = \\frac{n(n-1)}{2}, \\qquad E_n - E_1 = 13.6\\,Z^2\\left(1 - \\frac{1}{n^2}\\right)\\ \\text{eV}",
      },
      authoredExample: {
        prompt:
          "Hydrogen gas in its ground state is bombarded with electrons of energy 13.0 eV. Which is the highest level reached, and how many spectral lines are emitted? What changes if photons of 13.0 eV are used instead?",
        steps: [
          "Gaps from the ground state: 12.75 eV to n = 4 and 13.06 eV to n = 5.",
          "An electron can give part of its energy: 12.75 ≤ 13.0 < 13.06, so the atoms reach n = 4.",
          "Lines: \\(N = \\dfrac{4 \\times 3}{2} = 6\\).",
          "A photon must match a gap. No gap equals 13.0 eV, and 13.0 eV is below 13.6 eV, so the photons are not absorbed and no lines appear.",
        ],
        answer: "Electrons: up to n = 4, 6 lines. Photons: not absorbed, no lines.",
      },
      selfCheckExample: {
        prompt:
          "A free electron with 1.4 eV of kinetic energy is captured by a proton into the n = 3 level of hydrogen. Find the energy and wavelength of the photon given out. (hc = 1240 eV nm)",
        steps: [
          "\\(|E_3| = \\dfrac{13.6}{9} \\approx 1.51\\) eV.",
          "Photon energy \\(= 1.4 + 1.51 = 2.91\\) eV.",
          "\\(\\lambda = \\dfrac{1240}{2.91} \\approx 426\\) nm.",
        ],
        answer: "About 2.91 eV and 426 nm",
      },
      practiceSet: [
        { prompt: "How many spectral lines can a sample of hydrogen excited to n = 5 emit?", answer: "10" },
        { prompt: "At most how many photons can one hydrogen atom in n = 5 emit on its way to the ground state?", answer: "4" },
        { prompt: "In a hydrogen-like ion the 2 → 1 gap is 163.2 eV. Its atomic number?", answer: "Z = 4" },
        { prompt: "Is an 11 eV photon absorbed by hydrogen in its ground state?", answer: "No: no gap equals 11 eV." },
      ],
      pyqExampleId: "cbca125c-e72d-4524-b094-30ee9b6af325", // 2023: 12.5 eV electron beam on hydrogen, number of lines
      traps: [
        {
          title: "A photon must match; an electron need not",
          body: "A 12.5 eV photon passes through ground-state hydrogen untouched, because no gap equals 12.5 eV. A 12.5 eV electron excites it to n = 3 and keeps the rest of its energy.",
        },
        {
          title: "A sample and a single atom count differently",
          body: "A sample excited to level n shows n(n − 1)/2 lines, because different atoms fall by different routes. One atom falling step by step gives at most n − 1 photons.",
        },
        {
          title: "Balmer lines need n = 3 first",
          body: "Lifting the atom to n = 2 is not enough: from there it can only fall to n = 1, a Lyman line. The least energy for any Balmer line is the gap to n = 3.",
        },
      ],
    },

    // C3 — photon momentum: recoil and X-rays
    {
      kind: "formula" as const,
      slug: "jpatom-recoil-xray",
      name: "Recoil of the emitting atom and X-ray photons",
      intuition:
        "A photon of energy E carries momentum E/c. When an atom emits one, the atom is pushed back with the same momentum, but because the atom is heavy its recoil speed is only a few metres per second. X-rays are the same physics at thousands of electron-volts: an electron accelerated through V can give at most eV to one photon, which fixes the shortest wavelength, and a vacancy in an inner shell gives the target's own lines.",
      definition:
        "- **Photon momentum:** \\(p = \\dfrac{E}{c} = \\dfrac{h}{\\lambda}\\).\n" +
        "- **Recoil speed:** \\(v = \\dfrac{E}{Mc}\\), where M is the mass of the whole atom, not of the electron.\n" +
        "- The recoil takes a tiny share of the gap: the photon's fractional loss of energy, and so its fractional increase of wavelength, is about \\(\\dfrac{E}{2Mc^2}\\).\n" +
        "- **X-ray cut-off:** an electron accelerated through V gives at most eV to one photon, so \\(\\lambda_{\\min} = \\dfrac{hc}{eV}\\), or \\(\\lambda_{\\min}\\,(\\text{nm}) = \\dfrac{1240}{V\\,(\\text{volts})}\\). It depends only on V, not on the target.\n" +
        "- **Electrons given by their de Broglie wavelength:** find their kinetic energy from \\(\\lambda = \\dfrac{h}{\\sqrt{2mK}}\\), then \\(\\lambda_{\\min} = \\dfrac{hc}{K}\\).\n" +
        "- **Characteristic Kα line:** an L electron fills a hole in the K shell. Photon energy = energy of the atom with a K hole − energy with an L hole.",
      formula: {
        label: "Photon momentum, recoil and the X-ray cut-off",
        latex: "p = \\frac{E}{c} = \\frac{h}{\\lambda}, \\qquad v_{\\text{recoil}} = \\frac{E}{Mc}, \\qquad \\lambda_{\\min} = \\frac{hc}{eV}",
      },
      authoredExample: {
        prompt:
          "A hydrogen atom of mass \\(1.67 \\times 10^{-27}\\) kg emits the photon of the 4 → 1 jump (12.75 eV). Find the photon's momentum and the atom's recoil speed. (\\(1\\ \\text{eV} = 1.6 \\times 10^{-19}\\) J, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "\\(E = 12.75 \\times 1.6 \\times 10^{-19} = 2.04 \\times 10^{-18}\\) J.",
          "\\(p = \\dfrac{E}{c} = \\dfrac{2.04 \\times 10^{-18}}{3 \\times 10^{8}} = 6.8 \\times 10^{-27}\\) kg m/s.",
          "\\(v = \\dfrac{p}{M} = \\dfrac{6.8 \\times 10^{-27}}{1.67 \\times 10^{-27}} \\approx 4.07\\) m/s.",
        ],
        answer: "\\(6.8 \\times 10^{-27}\\) kg m/s; about 4.07 m/s.",
      },
      selfCheckExample: {
        prompt: "An X-ray tube runs at 25 kV. What is the shortest wavelength in the X-rays it produces? (hc = 1240 eV nm)",
        steps: [
          "Each electron arrives with 25 000 eV, the most one photon can take.",
          "\\(\\lambda_{\\min} = \\dfrac{1240}{25\\,000} \\approx 0.0496\\) nm.",
        ],
        answer: "About 0.05 nm",
      },
      practiceSet: [
        { prompt: "Momentum of a 1.89 eV photon? (1 eV = 1.6 × 10⁻¹⁹ J, c = 3 × 10⁸ m/s)", answer: "About \\(1.0 \\times 10^{-27}\\) kg m/s" },
        { prompt: "Shortest X-ray wavelength from a tube run at 50 kV? (hc = 1240 eV nm)", answer: "About 0.0248 nm" },
        { prompt: "The voltage across an X-ray tube is doubled. What happens to the cut-off wavelength?", answer: "It halves." },
        { prompt: "An atom with a K-shell hole has energy 25 keV; with an L-shell hole, 4 keV. Energy of its Kα photon?", answer: "21 keV" },
      ],
      pyqExampleId: "ab30ed6f-f44a-4d36-8181-c2a26e8fc09a", // 2024: recoil speed of hydrogen after the 2 → 1 photon
      traps: [
        {
          title: "Recoil uses the atom's mass",
          body: "The whole atom recoils, so divide the photon's momentum by the atom's mass, about 1.67 × 10⁻²⁷ kg for hydrogen. Dividing by the electron's mass gives a speed nearly 2000 times too large.",
        },
        {
          title: "The cut-off wavelength ignores the target",
          body: "λ_min = hc/eV depends only on the tube voltage. The target metal sets the characteristic lines such as Kα, not the cut-off.",
        },
        {
          title: "Kα energy is a difference of two hole energies",
          body: "The photon carries the energy of the K-hole state minus the energy of the L-hole state. Taking the K-hole energy alone as the photon energy is the usual slip.",
        },
      ],
    },
  ],
};
