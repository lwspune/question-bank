import type { SubtopicNote } from "@/app/notes/_types";

export const COMPARE_DUAL_NOTE: SubtopicNote = {
  subtopicName: "Comparing de Broglie Wavelengths",
  title: "Comparing de Broglie Wavelengths",
  oneLineDefinition:
    "To compare two wavelengths, write λ = h/p and ask what is held fixed: at the same kinetic energy λ ∝ 1/√m, at the same voltage λ ∝ 1/√(mq), at the same speed λ ∝ 1/m, and the same wavelength means the same momentum.",
  whyItMatters:
    "Thirty-four PYQs, thirty-three of them multiple choice, and two from 2026, the largest page in the chapter. Sixteen compare particles at given kinetic energies or accelerating voltages, eight of each. Eleven compare through momentum: seven at equal or given wavelengths, two for the pieces of a nucleus that splits at rest, and two at given speeds. Seven compare a particle with a photon. Each one is a single ratio; the marks go to knowing what the question holds fixed.",
  concepts: [
    // C1 — given kinetic energies or voltages
    {
      kind: "formula" as const,
      slug: "jpdual-same-energy",
      name: "Comparing particles at given kinetic energies or voltages",
      intuition:
        "Write λ = h/√(2mK) for both particles and divide; h and 2 cancel. At the same kinetic energy, only the masses are left, so the heavier particle has the shorter wavelength. Through the same voltage, the energy is qV, so the charge enters too: an alpha particle gains twice a proton's energy.",
      definition:
        "- \\(\\dfrac{\\lambda_1}{\\lambda_2} = \\sqrt{\\dfrac{m_2K_2}{m_1K_1}}\\).\n" +
        "- Same kinetic energy: \\(\\lambda \\propto 1/\\sqrt{m}\\).\n" +
        "- Accelerated from rest through V: \\(K = qV\\), so \\(\\dfrac{\\lambda_1}{\\lambda_2} = \\sqrt{\\dfrac{m_2q_2V_2}{m_1q_1V_1}}\\). Same V: \\(\\lambda \\propto 1/\\sqrt{mq}\\).\n" +
        "- Momentum after acceleration: \\(p = \\sqrt{2mqV}\\).\n" +
        "- Masses and charges: proton \\(m_p\\), e; neutron \\(\\approx m_p\\), 0; deuteron \\(2m_p\\), e; alpha \\(4m_p\\), 2e; electron \\(\\approx m_p/1836\\), −e.",
      formula: {
        label: "Ratio of wavelengths",
        latex: "\\frac{\\lambda_1}{\\lambda_2} = \\sqrt{\\frac{m_2K_2}{m_1K_1}} = \\sqrt{\\frac{m_2q_2V_2}{m_1q_1V_1}}",
      },
      authoredExample: {
        prompt:
          "A deuteron is accelerated from rest through 50 V and an alpha particle through 25 V. Find the ratio of their de Broglie wavelengths, λ_d : λ_α.",
        steps: [
          "Deuteron: \\(m = 2m_p\\), \\(q = e\\), so \\(mqV = 2 \\times 1 \\times 50 = 100\\) (in units of \\(m_p e\\) volts).",
          "Alpha: \\(m = 4m_p\\), \\(q = 2e\\), so \\(mqV = 4 \\times 2 \\times 25 = 200\\).",
          "\\(\\dfrac{\\lambda_d}{\\lambda_\\alpha} = \\sqrt{\\dfrac{200}{100}} = \\sqrt{2}\\).",
        ],
        answer: "√2 : 1",
      },
      selfCheckExample: {
        prompt:
          "A neutron and an alpha particle have the same kinetic energy. Find the ratio of their de Broglie wavelengths, λ_n : λ_α. (Take the neutron's mass equal to the proton's.)",
        steps: [
          "Same K, so \\(\\lambda \\propto 1/\\sqrt{m}\\).",
          "\\(\\dfrac{\\lambda_n}{\\lambda_\\alpha} = \\sqrt{\\dfrac{m_\\alpha}{m_n}} = \\sqrt{\\dfrac{4m_p}{m_p}} = 2\\).",
        ],
        answer: "2 : 1",
      },
      practiceSet: [
        { prompt: "A proton and a neutron have the same kinetic energy. Ratio of their de Broglie wavelengths?", answer: "About 1 : 1" },
        { prompt: "A proton is accelerated through 200 V and a deuteron through 100 V. Ratio λ_p : λ_d?", answer: "1 : 1" },
        { prompt: "An alpha particle is accelerated through 50 V and a proton through 100 V. Ratio λ_α : λ_p?", answer: "1 : 2" },
        { prompt: "A proton has kinetic energy 3K and a carbon-12 nucleus has K. Ratio λ_p : λ_C?", answer: "2 : 1" },
      ],
      pyqExampleId: "24c3c615-768b-4557-a4fc-4771ff5249f2", // 2023: proton through 2 V, alpha through 4 V
      traps: [
        {
          title: "The same voltage is not the same energy",
          body: "Through the same V, a particle of charge q gains qV. An alpha particle, charge 2e, gains twice what a proton gains, so its mass AND its charge both enter the ratio.",
        },
        {
          title: "Read the ratio the right way round",
          body: "λ₁/λ₂ has the second particle's mass and energy on top. Inverting it gives the reciprocal, which is always one of the options.",
        },
        {
          title: "At the same kinetic energy, heavier means shorter",
          body: "λ ∝ 1/√m when K is fixed, so an alpha particle has the shortest wavelength and an electron the longest. A proton and a neutron come out nearly equal.",
        },
      ],
    },

    // C2 — same wavelength, same momentum
    {
      kind: "formula" as const,
      slug: "jpdual-same-momentum",
      name: "Same de Broglie wavelength means same momentum",
      intuition:
        "λ = h/p, so two particles with the same wavelength have the same momentum, whatever their masses. Their speeds and energies then differ: with p fixed, v = p/m and K = p²/2m both go as 1/m. The same idea settles a nucleus that splits from rest: the two pieces fly apart with equal and opposite momenta.",
      definition:
        "- Equal λ means equal p.\n" +
        "- At equal p: \\(v \\propto 1/m\\) and \\(K = \\dfrac{p^{2}}{2m} \\propto 1/m\\).\n" +
        "- In general \\(\\dfrac{\\lambda_1}{\\lambda_2} = \\dfrac{m_2v_2}{m_1v_1}\\); at the same speed, \\(\\lambda \\propto 1/m\\).\n" +
        "- A body at rest that splits in two: momentum is conserved, so the pieces have equal momenta and equal wavelengths, whatever their masses.",
      formula: {
        label: "Momentum from wavelength",
        latex: "p = \\frac{h}{\\lambda}, \\qquad K = \\frac{p^{2}}{2m} = \\frac{h^{2}}{2m\\lambda^{2}}",
      },
      authoredExample: {
        prompt:
          "A deuteron and an alpha particle have the same de Broglie wavelength. Find the ratio, deuteron to alpha, of their (a) momenta, (b) speeds and (c) kinetic energies.",
        steps: [
          "(a) Same λ, so the momenta are equal: 1 : 1.",
          "(b) \\(v = p/m\\): \\(\\dfrac{v_d}{v_\\alpha} = \\dfrac{m_\\alpha}{m_d} = \\dfrac{4}{2} = 2\\).",
          "(c) \\(K = p^{2}/2m\\): \\(\\dfrac{K_d}{K_\\alpha} = \\dfrac{m_\\alpha}{m_d} = 2\\).",
        ],
        answer: "(a) 1 : 1; (b) 2 : 1; (c) 2 : 1",
      },
      selfCheckExample: {
        prompt:
          "A particle of mass m moving at speed v has de Broglie wavelength λ. A second particle of mass 3m has de Broglie wavelength 2λ. Find its speed.",
        steps: [
          "\\(p_2 = \\dfrac{h}{2\\lambda} = \\dfrac{p_1}{2} = \\dfrac{mv}{2}\\).",
          "\\(v_2 = \\dfrac{p_2}{3m} = \\dfrac{mv}{6m} = \\dfrac{v}{6}\\).",
        ],
        answer: "v/6",
      },
      practiceSet: [
        { prompt: "A body at rest explodes into two pieces of 2 kg and 5 kg. Ratio of their de Broglie wavelengths?", answer: "1 : 1" },
        { prompt: "A proton and an alpha particle move at the same speed. Ratio λ_p : λ_α?", answer: "4 : 1" },
        { prompt: "An electron and a muon (mass 207 times the electron's) have the same de Broglie wavelength. Ratio of their kinetic energies, K_e : K_μ?", answer: "207 : 1" },
        { prompt: "A particle's de Broglie wavelength is halved at constant mass. By what factor do its momentum and its kinetic energy change?", answer: "Momentum × 2; kinetic energy × 4" },
      ],
      pyqExampleId: "137a124b-ec6d-43dd-bc3d-1dfee9e663ad", // 2024: proton at λ, alpha at 2λ, ratio of speeds
      traps: [
        {
          title: "Equal wavelengths do not mean equal energies",
          body: "The same λ means the same momentum. Kinetic energy is p²/2m, so the lighter particle carries more energy, in the inverse ratio of the masses.",
        },
        {
          title: "Pieces from rest share one wavelength",
          body: "A body at rest that splits sends its pieces off with equal and opposite momenta, so their wavelengths are equal. The masses do not enter.",
        },
        {
          title: "At the same speed, λ goes as 1/m, not 1/√m",
          body: "The square root belongs to the same-energy comparison. At equal speed, p = mv, so the wavelength ratio is the inverse mass ratio itself.",
        },
      ],
    },

    // C3 — particle against photon
    {
      kind: "formula" as const,
      slug: "jpdual-photon-vs-particle",
      name: "Comparing a particle with a photon",
      intuition:
        "Both obey λ = h/p, but their energies depend on momentum differently. A photon's energy is pc. A slow particle's kinetic energy is p²/2m. So write each energy from its own formula and never use p²/2m for light. At the same wavelength they share a momentum, and the particle carries far less energy; at the same energy, the photon has the far longer wavelength.",
      definition:
        "- Photon: \\(E = pc\\), so \\(\\lambda = \\dfrac{h}{p} = \\dfrac{hc}{E}\\).\n" +
        "- Particle at non-relativistic speed: \\(K = \\dfrac{p^{2}}{2m}\\), so \\(\\lambda = \\dfrac{h}{\\sqrt{2mK}}\\).\n" +
        "- Same wavelength: the momenta are equal. Write \\(K = p^{2}/2m\\) for the particle and \\(E = pc\\) for the photon, then divide.\n" +
        "- Same energy: write each wavelength from its own formula, then divide.",
      formula: {
        label: "Photon against particle",
        latex: "\\lambda_{\\text{photon}} = \\frac{hc}{E}, \\qquad \\lambda_{\\text{particle}} = \\frac{h}{\\sqrt{2mK}}",
      },
      authoredExample: {
        prompt:
          "An electron moves at \\(6 \\times 10^{6}\\) m/s. A photon has the same de Broglie wavelength. Find the ratio of the electron's kinetic energy to the photon's energy. (m = 9.1 × 10⁻³¹ kg, c = 3 × 10⁸ m/s)",
        steps: [
          "Electron: \\(p = mv = 9.1 \\times 10^{-31} \\times 6 \\times 10^{6} = 5.46 \\times 10^{-24}\\ \\text{kg m/s}\\).",
          "\\(K = \\tfrac{1}{2}mv^{2} = \\tfrac{1}{2} \\times 9.1 \\times 10^{-31} \\times 3.6 \\times 10^{13} = 1.64 \\times 10^{-17}\\) J.",
          "Same wavelength, same momentum, so the photon has \\(E = pc = 5.46 \\times 10^{-24} \\times 3 \\times 10^{8} = 1.64 \\times 10^{-15}\\) J.",
          "\\(K/E = 1.64 \\times 10^{-17}/1.64 \\times 10^{-15} = 0.01\\).",
        ],
        answer: "1 : 100",
      },
      selfCheckExample: {
        prompt:
          "An electron and a photon each have an energy of 100 eV. Find both wavelengths and their ratio. (hc = 1240 eV nm; electron through V volts: λ = 1.227/√V nm)",
        steps: [
          "Photon: \\(\\lambda = 1240/100 = 12.4\\) nm.",
          "Electron with 100 eV, as if accelerated through 100 V: \\(\\lambda = 1.227/\\sqrt{100} = 0.1227\\) nm.",
          "\\(\\lambda_e/\\lambda_{\\text{photon}} = 0.1227/12.4 \\approx 0.0099\\), about 1/101.",
        ],
        answer: "12.4 nm and 0.123 nm; the electron's is about 1/100 of the photon's",
      },
      practiceSet: [
        { prompt: "Wavelength of a photon of energy 2.48 keV? (hc = 1240 eV nm)", answer: "0.5 nm" },
        { prompt: "A photon and an electron have the same de Broglie wavelength. Which has more momentum?", answer: "Neither; their momenta are equal." },
        { prompt: "A photon has momentum \\(3.3 \\times 10^{-27}\\ \\text{kg m/s}\\). Its wavelength? (h = 6.6 × 10⁻³⁴ J s)", answer: "\\(2 \\times 10^{-7}\\) m, or 200 nm" },
        { prompt: "The energy of a slow electron is multiplied by 4, and so is the energy of a photon. By what factor does each wavelength change?", answer: "Electron: 1/2; photon: 1/4" },
      ],
      pyqExampleId: "d1257fd1-7b35-4b29-a489-24b73a071c74", // 2025: proton and photon of equal energy E, ratio of wavelengths
      traps: [
        {
          title: "A photon's energy is pc, not p²/2m",
          body: "Light has no rest mass, so p²/2m means nothing for it. Use E = pc, and λ = hc/E, for the photon; keep p²/2m for the particle.",
        },
        {
          title: "Same wavelength, same momentum, different energies",
          body: "When a particle and a photon share a wavelength, they share a momentum, but the slow particle's kinetic energy is much smaller than the photon's energy.",
        },
      ],
    },
  ],
};
