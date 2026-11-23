import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_DN_DEBROGLIE_NOTE: SubtopicNote = {
  subtopicName: "De Broglie Hypothesis",
  title: "De Broglie Hypothesis and Matter Waves",
  oneLineDefinition:
    "De Broglie's idea that moving matter has a wave, the de Broglie wavelength λ = h/p = h/mv, its form for an electron accelerated through a potential difference, and how the wavelengths of different particles compare.",
  whyItMatters:
    "19 questions, eight of them from board papers from 2018 to 2026. The board asks you to explain the de Broglie wavelength and obtain its expression (2022), derive it for an electron accelerated through V volt (2026), calculate it for an electron at one fifth of the speed of light (2018) or accelerated through 100 V (2023), compare 150 eV and 0.6 keV electrons (2019), pick the particle with the longest wavelength at equal kinetic energy (2024, 2025), and find the ratios of momenta and kinetic energies at equal wavelength (2025). The textbook adds protons, neutrons, a running student and a car, and electron and proton ratios at equal speed, energy and momentum.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpdn-de-broglie-relation",
      name: "De Broglie wavelength of a moving particle",
      intuition:
        "Light, which we think of as a wave, also behaves like particles. In 1924 de Broglie asked the reverse question: since nature likes symmetry, might matter, which we think of as particles, also behave like a wave? He gave a moving particle the same wavelength formula as a photon, λ = h/p. The heavier or faster the particle, the shorter its wave. For an electron the wave is about the size of an atom; for a running student it is far too small ever to notice.",
      definition:
        "Board derivation, one step a line:\n" +
        "- For a photon, the special theory of relativity gives \\(p = \\dfrac{E}{c}\\).\n" +
        "- With Einstein's relation \\(E = h\\nu\\): \\(p = \\dfrac{h\\nu}{c} = \\dfrac{h}{\\lambda}\\).\n" +
        "- De Broglie proposed, from the symmetry in nature, that a moving material particle has a wave associated with it, described by the same relation.\n" +
        "- So for a particle of mass m moving with velocity v: \\(\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}\\) (the de Broglie relation).\n" +
        "- These waves are called **matter waves**, and \\(\\lambda\\) is the **de Broglie wavelength**. Greater momentum means a shorter wavelength.\n" +
        "- A particle at rest has \\(p = 0\\), so it has no de Broglie wavelength.\n" +
        "- For everyday bodies \\(\\lambda\\) is far smaller than the body and its surroundings, so their wave nature is never noticed.",
      formula: {
        label: "De Broglie relation",
        latex: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}",
        symbols: [
          { symbol: "\\(\\lambda\\)", meaning: "de Broglie wavelength" },
          { symbol: "\\(p\\)", meaning: "momentum of the particle" },
          { symbol: "\\(m, v\\)", meaning: "mass and velocity of the particle" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the de Broglie wavelength of (a) a cricket ball of mass 0.15 kg moving at 20 m/s, and (b) an electron moving at \\(2 \\times 10^{6}\\) m/s. (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(m_e = 9.1 \\times 10^{-31}\\) kg)",
        steps: [
          "Formula: \\(\\lambda = \\dfrac{h}{mv}\\).",
          "(a) \\(p = 0.15 \\times 20 = 3\\) kg m/s; \\(\\lambda = \\dfrac{6.63 \\times 10^{-34}}{3} = 2.21 \\times 10^{-34}\\) m.",
          "(b) \\(p = 9.1 \\times 10^{-31} \\times 2 \\times 10^{6} = 1.82 \\times 10^{-24}\\) kg m/s; \\(\\lambda = \\dfrac{6.63 \\times 10^{-34}}{1.82 \\times 10^{-24}} = 3.64 \\times 10^{-10}\\) m.",
          "The ball's wavelength is far too small to observe; the electron's, 3.64 Å, is about the size of an atom.",
        ],
        answer: "(a) \\(2.21 \\times 10^{-34}\\) m; (b) \\(3.64 \\times 10^{-10}\\) m = 3.64 Å",
      },
      selfCheckExample: {
        prompt: "Find the de Broglie wavelength of a proton (mass \\(1.67 \\times 10^{-27}\\) kg) moving at \\(3 \\times 10^{5}\\) m/s.",
        steps: [
          "\\(p = 1.67 \\times 10^{-27} \\times 3 \\times 10^{5} = 5.01 \\times 10^{-22}\\) kg m/s.",
          "\\(\\lambda = \\dfrac{6.63 \\times 10^{-34}}{5.01 \\times 10^{-22}} = 1.32 \\times 10^{-12}\\) m.",
        ],
        answer: "\\(1.32 \\times 10^{-12}\\) m",
      },
      practiceSet: [
        { prompt: "The momentum of a particle is doubled. What happens to its de Broglie wavelength?", answer: "It is halved" },
        { prompt: "What name did de Broglie give to the waves associated with moving particles?", answer: "Matter waves" },
        { prompt: "Why do we never notice the wave nature of a moving car?", answer: "Its de Broglie wavelength is far smaller than the car and the road, too small to measure" },
      ],
      pyqExampleId: "e7db9b93-99a0-457e-acf4-aef2ba5d66a2",
      traps: [
        {
          title: "Giving a particle at rest a wavelength",
          body: "With \\(v = 0\\) the momentum is zero and \\(h/p\\) has no finite value. A particle at rest has no de Broglie wavelength.",
        },
        {
          title: "Using p = E/c for a material particle",
          body: "\\(p = E/c\\) is for a photon only. For a material particle use \\(p = mv\\).",
        },
        {
          title: "Mass in gram",
          body: "Put the mass in kilogram and the speed in metre per second, or \\(\\lambda\\) will not come out in metre.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpdn-accelerated-electron",
      name: "Wavelength from kinetic energy and accelerating voltage",
      intuition:
        "Most questions give the kinetic energy, or the voltage an electron has been accelerated through, rather than its speed. Kinetic energy and momentum are tied by K = p²/2m, so you can go straight from energy to wavelength. Four times the voltage gives twice the momentum and half the wavelength.",
      definition:
        "Board derivation for an electron accelerated from rest through V volt, one step a line:\n" +
        "- The work done by the field becomes kinetic energy: \\(\\dfrac{1}{2}mv^{2} = eV\\).\n" +
        "- So \\(v = \\sqrt{\\dfrac{2eV}{m}}\\) and \\(p = mv = \\sqrt{2meV}\\).\n" +
        "- De Broglie relation: \\(\\lambda = \\dfrac{h}{p} = \\dfrac{h}{\\sqrt{2meV}}\\).\n" +
        "- Putting in \\(h\\), \\(m\\) and \\(e\\) for an electron: \\(\\lambda = \\dfrac{1.228 \\times 10^{-9}}{\\sqrt{V}}\\) m, that is \\(\\lambda = \\dfrac{1.228}{\\sqrt{V}}\\) nm.\n" +
        "- For any particle of kinetic energy \\(E_K\\): \\(\\lambda = \\dfrac{h}{\\sqrt{2mE_K}}\\); for a charge q through V: \\(\\lambda = \\dfrac{h}{\\sqrt{2mqV}}\\).\n" +
        "- These hold only when V is not so large (say in kV) that the speed approaches the speed of light.",
      formula: {
        label: "Wavelength from energy",
        latex: "\\lambda = \\frac{h}{\\sqrt{2mE_K}} = \\frac{h}{\\sqrt{2meV}} = \\frac{1.228}{\\sqrt{V}}\\ \\text{nm}",
      },
      authoredExample: {
        prompt:
          "An electron is accelerated from rest through 400 V. Find its de Broglie wavelength, first with the full formula and then with the short form. (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(m = 9.11 \\times 10^{-31}\\) kg, \\(e = 1.6 \\times 10^{-19}\\) C)",
        steps: [
          "Given: \\(V = 400\\) V.",
          "Formula: \\(\\lambda = \\dfrac{h}{\\sqrt{2meV}}\\).",
          "\\(\\sqrt{2meV} = \\sqrt{2 \\times 9.11 \\times 10^{-31} \\times 1.6 \\times 10^{-19} \\times 400} = 1.08 \\times 10^{-23}\\) kg m/s.",
          "\\(\\lambda = \\dfrac{6.63 \\times 10^{-34}}{1.08 \\times 10^{-23}} = 6.14 \\times 10^{-11}\\) m.",
          "Short form: \\(\\lambda = \\dfrac{1.228}{\\sqrt{400}} = \\dfrac{1.228}{20} = 0.0614\\) nm, the same.",
        ],
        answer: "\\(6.14 \\times 10^{-11}\\) m = 0.0614 nm",
      },
      selfCheckExample: {
        prompt: "An electron has a kinetic energy of 25 eV. Find its de Broglie wavelength in nm.",
        steps: ["An electron of 25 eV has the energy it would gain through 25 V.", "\\(\\lambda = \\dfrac{1.228}{\\sqrt{25}} = \\dfrac{1.228}{5}\\) nm."],
        answer: "0.2456 nm",
      },
      practiceSet: [
        { prompt: "The accelerating voltage of an electron is made 9 times larger. What happens to its de Broglie wavelength?", answer: "It becomes one third" },
        { prompt: "Find the de Broglie wavelength of an electron accelerated through 9 V, in nm.", answer: "About 0.409 nm" },
        { prompt: "A proton and an electron are accelerated through the same voltage. Which has the longer de Broglie wavelength?", answer: "The electron (smaller mass)" },
      ],
      pyqExampleId: "474ff751-e28f-48e3-9f4d-eb28a7ef7bbe",
      traps: [
        {
          title: "Reading the short form in ångström",
          body: "\\(\\lambda = 1.228/\\sqrt{V}\\) gives nanometre, not ångström. Multiply by 10 for Å.",
        },
        {
          title: "Using the energy in eV inside the square root",
          body: "In \\(h/\\sqrt{2mE_K}\\), the energy must be in joule. Multiply eV by \\(1.6 \\times 10^{-19}\\) first.",
        },
        {
          title: "Using the short form for other particles",
          body: "The 1.228 constant is worked out for an electron. For a proton or a neutron, use \\(h/\\sqrt{2mE_K}\\) with that particle's mass.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpdn-de-broglie-compare",
      name: "Comparing the wavelengths of two particles",
      intuition:
        "Comparison questions all start from λ = h/p and ask what is held the same. Same momentum: same wavelength, whatever the masses. Same speed: the lighter particle has the longer wave, in proportion to the masses. Same kinetic energy: the lighter particle still wins, but only by the square root of the mass ratio.",
      definition:
        "- **Same momentum:** \\(\\lambda_1 = \\lambda_2\\).\n" +
        "- **Same speed:** \\(\\lambda \\propto \\dfrac{1}{m}\\), so \\(\\dfrac{\\lambda_1}{\\lambda_2} = \\dfrac{m_2}{m_1}\\).\n" +
        "- **Same kinetic energy:** \\(\\lambda \\propto \\dfrac{1}{\\sqrt{m}}\\), so \\(\\dfrac{\\lambda_1}{\\lambda_2} = \\sqrt{\\dfrac{m_2}{m_1}}\\).\n" +
        "- **Same wavelength:** equal momenta, and \\(K = \\dfrac{p^{2}}{2m}\\) gives \\(\\dfrac{K_1}{K_2} = \\dfrac{m_2}{m_1}\\).\n" +
        "- The proton is about 1836 times heavier than the electron; an \\(\\alpha\\)-particle is about 4 times the proton's mass.",
      formula: {
        label: "Ratios at equal speed and equal energy",
        latex: "\\text{same } v: \\ \\frac{\\lambda_1}{\\lambda_2} = \\frac{m_2}{m_1}, \\qquad \\text{same } K: \\ \\frac{\\lambda_1}{\\lambda_2} = \\sqrt{\\frac{m_2}{m_1}}",
      },
      authoredExample: {
        prompt:
          "A proton and an \\(\\alpha\\)-particle (mass 4 times the proton's) are moving. Find the ratio of their de Broglie wavelengths, \\(\\lambda_p : \\lambda_\\alpha\\), when they have (a) the same kinetic energy, (b) the same speed.",
        steps: [
          "Given: \\(m_\\alpha = 4m_p\\).",
          "(a) Same kinetic energy: \\(\\dfrac{\\lambda_p}{\\lambda_\\alpha} = \\sqrt{\\dfrac{m_\\alpha}{m_p}} = \\sqrt{4} = 2\\).",
          "(b) Same speed: \\(\\dfrac{\\lambda_p}{\\lambda_\\alpha} = \\dfrac{m_\\alpha}{m_p} = 4\\).",
        ],
        answer: "(a) 2 : 1; (b) 4 : 1",
      },
      selfCheckExample: {
        prompt: "A proton and a deuteron (twice the proton's mass) have the same momentum. Find the ratio of their de Broglie wavelengths.",
        steps: ["\\(\\lambda = h/p\\) and the momenta are equal."],
        answer: "1 : 1",
      },
      practiceSet: [
        { prompt: "Two particles of masses m and 2m move at the same speed. Find the ratio of their de Broglie wavelengths.", answer: "2 : 1 (the lighter one has the longer wavelength)" },
        { prompt: "An electron and a proton have the same speed. Which has the longer de Broglie wavelength?", answer: "The electron" },
        { prompt: "Two particles have the same kinetic energy and masses in the ratio 1 : 9. Find the ratio of their de Broglie wavelengths.", answer: "3 : 1" },
      ],
      pyqExampleId: "af03208e-b5de-44cc-89db-4e64890db59e",
      traps: [
        {
          title: "Using 1/m at equal kinetic energy",
          body: "At the same kinetic energy, \\(\\lambda \\propto 1/\\sqrt{m}\\), not \\(1/m\\). The \\(1/m\\) rule is for the same speed.",
        },
        {
          title: "Equal wavelength means equal energy",
          body: "Equal de Broglie wavelengths mean equal MOMENTA. The kinetic energies differ, in the inverse ratio of the masses.",
        },
        {
          title: "Taking the hydrogen atom as lighter than the proton",
          body: "A hydrogen atom is a proton plus an electron, so it is slightly heavier than a proton and has a slightly shorter wavelength at the same energy.",
        },
      ],
    },
  ],
};
