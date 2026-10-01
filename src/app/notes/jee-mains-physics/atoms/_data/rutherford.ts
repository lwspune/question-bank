import type { SubtopicNote } from "@/app/notes/_types";

export const RUTHERFORD_ATOM_NOTE: SubtopicNote = {
  subtopicName: "Rutherford Scattering and Bohr's Postulates",
  title: "Rutherford Scattering and Bohr's Postulates",
  oneLineDefinition:
    "Rutherford's alpha scattering showed a tiny, heavy, positive nucleus; Bohr then allowed only the orbits where the angular momentum is nh/2π and made light come out only in a jump between them.",
  whyItMatters:
    "Nineteen PYQs, sixteen of them multiple choice, and five from 2026. Seven are about Rutherford's experiment: three use the distance of closest approach, one the impact parameter, one asks why so few alphas bounce back, and two compare Thomson's model with Rutherford's. Twelve are about Bohr's postulates: three test the statements themselves, four apply L = nh/2π directly, four first find n from an energy or turn L into an energy, and one applies the quantisation rule to a different force.",
  concepts: [
    // C1 — Rutherford scattering
    {
      kind: "formula" as const,
      slug: "jpatom-scattering",
      name: "Rutherford scattering and the distance of closest approach",
      intuition:
        "An alpha particle fired straight at a nucleus slows down as it climbs the electric hill, and stops where all its kinetic energy has become potential energy. That turning point is the distance of closest approach. Most alphas never come near a nucleus, because the atom is almost all empty space, so they pass straight through. Only the few aimed almost dead at a nucleus are turned back.",
      definition:
        "- **Thomson's model:** the positive charge and the mass are spread through the whole atom, with electrons embedded in it. It cannot turn an alpha back.\n" +
        "- **Rutherford's model:** all the positive charge and nearly all the mass sit in a tiny nucleus, about \\(10^{-14}\\) m across, inside an atom about \\(10^{-10}\\) m across. Electrons move around it.\n" +
        "- Every alpha in the beam has the same energy. A few rebound only because the nucleus is tiny and only a few come nearly head-on.\n" +
        "- **Closest approach (head-on):** \\(K = \\dfrac{1}{4\\pi\\epsilon_0}\\dfrac{(2e)(Ze)}{r_0}\\), so \\(r_0 \\propto \\dfrac{Z}{K}\\). The nucleus must be smaller than \\(r_0\\), so \\(r_0\\) is an upper limit on its radius.\n" +
        "- A handy constant: \\(\\dfrac{e^2}{4\\pi\\epsilon_0} = 1.44\\ \\text{MeV fm}\\), with \\(1\\ \\text{fm} = 10^{-15}\\) m.\n" +
        "- **Impact parameter** b is the sideways miss distance of the alpha's line of approach: \\(b = \\dfrac{r_0}{2}\\cot\\dfrac{\\theta}{2}\\). b = 0 means θ = 180°, a straight bounce back.\n" +
        "- A classical Rutherford atom collapses: the orbiting electron accelerates, radiates energy and spirals into the nucleus. Bohr's postulates were written to stop this.",
      formula: {
        label: "Closest approach and impact parameter",
        latex: "r_0 = \\frac{1}{4\\pi\\epsilon_0}\\,\\frac{2Ze^2}{K}, \\qquad b = \\frac{r_0}{2}\\cot\\frac{\\theta}{2}",
      },
      authoredExample: {
        prompt:
          "An alpha particle of kinetic energy 4 MeV heads straight for a silver nucleus (Z = 47). Find (a) the distance of closest approach, (b) that distance if the energy were 8 MeV, and (c) the impact parameter for scattering through 90° at 4 MeV. Use \\(e^2/4\\pi\\epsilon_0 = 1.44\\) MeV fm.",
        steps: [
          "(a) \\(r_0 = \\dfrac{2Z(1.44\\ \\text{MeV fm})}{K} = \\dfrac{2 \\times 47 \\times 1.44}{4} = 33.8\\) fm, about \\(3.4 \\times 10^{-14}\\) m.",
          "(b) \\(r_0 \\propto 1/K\\). Doubling the energy halves it: about \\(1.7 \\times 10^{-14}\\) m.",
          "(c) \\(b = \\dfrac{r_0}{2}\\cot 45^{\\circ} = \\dfrac{33.8}{2} \\approx 16.9\\) fm, about \\(1.7 \\times 10^{-14}\\) m.",
        ],
        answer: "(a) about \\(3.4 \\times 10^{-14}\\) m; (b) about \\(1.7 \\times 10^{-14}\\) m; (c) about \\(1.7 \\times 10^{-14}\\) m.",
      },
      selfCheckExample: {
        prompt:
          "In a Rutherford experiment with a fixed beam and target, alphas scattered through 90° had impact parameter b. What impact parameter gives scattering through 120°?",
        steps: [
          "\\(b \\propto \\cot(\\theta/2)\\).",
          "\\(\\dfrac{b'}{b} = \\dfrac{\\cot 60^{\\circ}}{\\cot 45^{\\circ}} = \\dfrac{1}{\\sqrt{3}}\\).",
          "A larger angle needs a closer approach, so b′ is smaller.",
        ],
        answer: "\\(b/\\sqrt{3} \\approx 0.58\\,b\\)",
      },
      practiceSet: [
        { prompt: "Why do most alpha particles pass through a thin gold foil with almost no deflection?", answer: "Most of the atom is empty space; the nucleus is tiny." },
        { prompt: "The kinetic energy of the alphas is halved, on the same target. How does the distance of closest approach change?", answer: "It doubles." },
        { prompt: "Alphas of one energy hit a tin target (Z = 50) and then a target with Z = 25. How does the distance of closest approach change?", answer: "It halves." },
        { prompt: "What impact parameter sends an alpha straight back along its path?", answer: "Zero: a head-on approach." },
        { prompt: "Why is an atom built on Rutherford's model unstable in classical physics?", answer: "The orbiting electron accelerates, radiates energy and spirals into the nucleus." },
      ],
      pyqExampleId: "809dbd6e-ca8e-40af-9bd5-b8b01c8a5588", // 2026: 7.7 MeV alpha on gold, closest approach
      traps: [
        {
          title: "The alpha carries charge 2e",
          body: "The potential energy at closest approach is k(2e)(Ze)/r₀. Writing ke²Z/r₀ drops the factor 2 and halves the distance, and that halved value is usually an option.",
        },
        {
          title: "Convert MeV to joules before using k = 9 × 10⁹",
          body: "1 MeV = 1.6 × 10⁻¹³ J. Mixing MeV with SI constants gives an answer off by a power of ten. Working in MeV fm with e²/4πε₀ = 1.44 MeV fm avoids the conversion.",
        },
        {
          title: "Closest approach is an upper limit on the radius",
          body: "The alpha stops before touching the nucleus, so the nuclear radius is at most r₀. Read whether the question wants a radius or a diameter: the diameter is twice the radius.",
        },
        {
          title: "Rare rebounds are not caused by faster alphas",
          body: "All alphas in the beam have the same energy. A few bounce back because the nucleus is tiny, so only a few come in with an impact parameter near zero.",
        },
      ],
    },

    // C2 — Bohr's postulates
    {
      kind: "formula" as const,
      slug: "jpatom-postulates",
      name: "Bohr's postulates and quantised angular momentum",
      intuition:
        "Bohr kept Rutherford's nucleus and added rules. The electron may circle only in orbits where its angular momentum is a whole number of h/2π, and in those orbits it does not radiate. Light is given out or taken in only when the electron jumps between orbits, and the photon carries exactly the energy difference.",
      definition:
        "- **Postulate 1:** the electron moves in a circle, held by the Coulomb pull of the nucleus.\n" +
        "- **Postulate 2:** only orbits with \\(L = mvr = \\dfrac{nh}{2\\pi}\\), n = 1, 2, 3, …, are allowed. L is a whole multiple of \\(h/2\\pi\\), not of h. L does not depend on Z.\n" +
        "- **Postulate 3 (frequency condition):** in a jump, \\(h\\nu = E_{\\text{upper}} - E_{\\text{lower}}\\). Emission when the electron falls, absorption when it rises.\n" +
        "- h and L have the same dimensions, \\([ML^2T^{-1}]\\).\n" +
        "- The model works only for one-electron systems (H, He⁺, Li²⁺, …). It has no term for the repulsion between electrons.\n" +
        "- Linear momentum in orbit n: \\(p = mv = \\dfrac{L}{r}\\).\n" +
        "- With \\(\\dfrac{mv^2}{r} = \\dfrac{kZe^2}{r^2}\\): \\(L^2 = mkZe^2\\,r\\), so \\(L \\propto \\sqrt{r}\\).\n" +
        "- The rules give the energy of level n: \\(E_n = -13.6\\,\\dfrac{Z^2}{n^2}\\) eV (the next page works with it). So L fixes n, and n fixes the energy; or an energy fixes n, and n fixes L.\n" +
        "- **Another force:** keep \\(mvr = nh/2\\pi\\) and replace the Coulomb balance with that force's own balance, then solve for r.",
      formula: {
        label: "Bohr's quantisation and frequency condition",
        latex: "L = mvr = \\frac{nh}{2\\pi}, \\qquad h\\nu = E_{\\text{upper}} - E_{\\text{lower}}",
      },
      authoredExample: {
        prompt:
          "An electron in a hydrogen atom has angular momentum \\(\\dfrac{5h}{2\\pi}\\). Find (a) its orbit, (b) its energy, and (c) how much its angular momentum changes when it drops to n = 3. Use \\(h = 6.6 \\times 10^{-34}\\) J s.",
        steps: [
          "(a) \\(\\dfrac{nh}{2\\pi} = \\dfrac{5h}{2\\pi}\\), so n = 5.",
          "(b) \\(E_5 = -\\dfrac{13.6}{25} = -0.544\\) eV.",
          "(c) \\(\\Delta L = (5 - 3)\\dfrac{h}{2\\pi} = \\dfrac{h}{\\pi} = \\dfrac{6.6 \\times 10^{-34}}{3.14} \\approx 2.1 \\times 10^{-34}\\) J s.",
        ],
        answer: "(a) n = 5; (b) −0.544 eV; (c) it falls by h/π, about \\(2.1 \\times 10^{-34}\\) J s.",
      },
      selfCheckExample: {
        prompt:
          "A particle of mass m moves in a circle under a central force of constant size A, so its potential energy is U = Ar. Using Bohr's rule \\(mvr = nh/2\\pi\\), how does the orbit radius depend on n?",
        steps: [
          "Force balance: \\(\\dfrac{mv^2}{r} = A\\), so \\(mv^2 = Ar\\).",
          "Square the quantisation rule: \\(m^2v^2r^2 = \\dfrac{n^2h^2}{4\\pi^2}\\).",
          "Substitute \\(mv^2 = Ar\\): \\(m(Ar)r^2 = \\dfrac{n^2h^2}{4\\pi^2}\\), so \\(r^3 \\propto n^2\\).",
        ],
        answer: "\\(r \\propto n^{2/3}\\)",
      },
      practiceSet: [
        { prompt: "Angular momentum of the electron in the third Bohr orbit of He⁺, in terms of h?", answer: "\\(3h/2\\pi\\); Z does not enter." },
        { prompt: "Dimensions of Planck's constant?", answer: "\\([ML^2T^{-1}]\\), the same as angular momentum." },
        { prompt: "The orbit radius of an electron in hydrogen becomes 4 times as large. By what factor does its angular momentum change?", answer: "2 (L ∝ √r)" },
        { prompt: "An electron in hydrogen falls from the level at −0.85 eV to the level at −3.40 eV. Energy of the emitted photon?", answer: "2.55 eV" },
      ],
      pyqExampleId: "41d312f6-f006-4f1f-b73a-f5e482e597a4", // 2026: L = 3h/π, energy of the electron
      traps: [
        {
          title: "A multiple of h/2π, not of h",
          body: "Bohr's rule is L = nh/2π. A statement that says angular momentum is an integral multiple of h is false, even though h and L have the same dimensions.",
        },
        {
          title: "Read n off L before anything else",
          body: "If L = 5h/π, rewrite it as 10h/2π: the orbit is n = 10. Then use the energy or radius formula. Plugging L straight into an energy formula has no meaning.",
        },
        {
          title: "Higher orbit minus lower orbit",
          body: "Bohr's frequency condition is hν = E_upper − E_lower for both emission and absorption. Writing E_lower − E_upper gives a negative frequency.",
        },
        {
          title: "Bohr's model is for one electron only",
          body: "It works for H, He⁺, Li²⁺ and other hydrogen-like ions. It leaves out the repulsion between electrons, so it fails for neutral helium and heavier atoms.",
        },
      ],
    },
  ],
};
