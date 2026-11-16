import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_DN_DEBROGLIE_NOTE: SubtopicNote = {
  subtopicName: "de Broglie Waves",
  title: "de Broglie Waves",
  oneLineDefinition:
    "The wave of a moving particle: the de Broglie wavelength λ = h/p, its value for a particle of given kinetic energy or accelerating voltage, and how a photon and a particle of the same energy compare.",
  whyItMatters:
    "Seven NEET questions from 2021 to 2026. Two read graphs (λ against p in 2022, 1/λ² against kinetic energy in 2024), one finds the wavelength of an electron in the second Bohr orbit (2025), one compares an electron and an alpha particle accelerated through the same voltage (Re-NEET 2024), and three compare a photon with an electron: the ratio of their wavelengths at equal energy (2025), the ratio of their momenta at 20 eV (Re-NEET 2026) and a photoelectron from a surface of negligible work function (2021).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphdn-debroglie",
      name: "The de Broglie wavelength",
      intuition:
        "If light, a wave, can behave like particles, de Broglie asked whether particles could behave like waves. They can. Every moving particle, charged or not, has a wave whose wavelength is Planck's constant divided by its momentum. The more momentum it has, the shorter its wave. For a cricket ball the wavelength is far too small to ever notice; for an electron it is about the size of an atom.",
      definition:
        "- de Broglie wavelength: \\(\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}\\). It belongs to any moving particle, charged or uncharged.\n" +
        "- \\(\\lambda \\propto \\dfrac{1}{p}\\): a graph of \\(\\lambda\\) against p is a rectangular hyperbola, and a graph of \\(\\lambda\\) against \\(1/p\\) is a straight line through the origin with slope h.\n" +
        "- Two particles with the same momentum have the same wavelength, whatever their masses.\n" +
        "- In a hydrogen atom the nth Bohr orbit holds exactly n wavelengths: \\(2\\pi r_n = n\\lambda\\), so \\(\\lambda = \\dfrac{2\\pi r_n}{n}\\). This is the same as Bohr's rule \\(mvr = \\dfrac{nh}{2\\pi}\\). The orbit radius is \\(r_n = n^{2}a_0\\), with \\(a_0 \\approx 0.053\\) nm.",
      formula: {
        label: "de Broglie wavelength",
        latex: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}, \\qquad 2\\pi r_n = n\\lambda",
        symbols: [
          { symbol: "\\(p\\)", meaning: "momentum of the particle" },
          { symbol: "\\(r_n\\)", meaning: "radius of the nth Bohr orbit" },
        ],
      },
      authoredExample: {
        prompt:
          "A ball of mass 0.1 kg moves at 6.6 m/s. Find its de Broglie wavelength. (\\(h = 6.6 \\times 10^{-34}\\) J s)",
        steps: [
          "\\(p = mv = 0.1 \\times 6.6 = 0.66\\ \\text{kg m/s}\\).",
          "\\(\\lambda = \\dfrac{h}{p} = \\dfrac{6.6 \\times 10^{-34}}{0.66} = 10^{-33}\\) m.",
          "This is far smaller than any atom, which is why a ball shows no wave behaviour.",
        ],
        answer: "\\(10^{-33}\\) m",
      },
      selfCheckExample: {
        prompt: "The momentum of a particle is made three times as large. What happens to its de Broglie wavelength?",
        steps: [
          "\\(\\lambda = \\dfrac{h}{p}\\), so \\(\\lambda \\propto \\dfrac{1}{p}\\).",
          "Three times the momentum gives one third of the wavelength.",
        ],
        answer: "It becomes one third",
      },
      practiceSet: [
        { prompt: "An electron has momentum \\(6.6 \\times 10^{-24}\\) kg m/s. What is its de Broglie wavelength? (\\(h = 6.6 \\times 10^{-34}\\) J s)", answer: "\\(10^{-10}\\) m (0.1 nm)" },
        { prompt: "What graph do you get when the de Broglie wavelength is plotted against \\(1/p\\)?", answer: "A straight line through the origin, of slope h" },
        { prompt: "Does an uncharged particle such as a neutron have a de Broglie wavelength when it moves?", answer: "Yes; every moving particle has one" },
        { prompt: "Two particles move at the same speed; one has four times the mass of the other. What is the ratio of their wavelengths, heavier to lighter?", answer: "1 : 4" },
      ],
      pyqExampleId: "dc21b8dd-079d-4e1e-bbbe-6e831c20c6fc",
      traps: [
        {
          title: "Equal momentum, equal wavelength",
          body: "\\(\\lambda\\) depends on momentum alone. An electron and a proton with the same momentum have the same de Broglie wavelength, even though their masses are very different.",
        },
        {
          title: "Divide the orbit by n",
          body: "In the nth Bohr orbit, n wavelengths fit around the circle, so \\(\\lambda = 2\\pi r_n/n\\), not \\(2\\pi r_n\\). Also take \\(r_n = n^{2}a_0\\), not \\(a_0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphdn-accelerated",
      name: "Wavelength from kinetic energy and voltage",
      intuition:
        "Questions rarely give the momentum. They give a kinetic energy, or a voltage that a charge has been accelerated through from rest. Kinetic energy turns into momentum through \\(p = \\sqrt{2mK}\\), and a charge q falling through a voltage V gains energy \\(qV\\). Put these into \\(\\lambda = h/p\\) and the wavelength follows. Because of the square root, four times the voltage only halves the wavelength.",
      definition:
        "- Momentum from kinetic energy: \\(p = \\sqrt{2mK}\\), so \\(\\lambda = \\dfrac{h}{\\sqrt{2mK}}\\).\n" +
        "- A charge q accelerated from rest through a voltage V gains \\(K = qV\\), so \\(\\lambda = \\dfrac{h}{\\sqrt{2mqV}}\\), that is \\(\\lambda \\propto \\dfrac{1}{\\sqrt{mqV}}\\).\n" +
        "- For an electron: \\(\\lambda = \\dfrac{1.227}{\\sqrt{V}}\\) nm, with V in volts.\n" +
        "- Squaring, \\(\\dfrac{1}{\\lambda^{2}} = \\dfrac{2mK}{h^{2}}\\): a graph of \\(1/\\lambda^{2}\\) against K is a straight line through the origin.",
      formula: {
        label: "Wavelength from energy",
        latex: "\\lambda = \\frac{h}{\\sqrt{2mK}} = \\frac{h}{\\sqrt{2mqV}}, \\qquad \\lambda_{e} = \\frac{1.227}{\\sqrt{V}}\\ \\text{nm}",
        symbols: [
          { symbol: "\\(K\\)", meaning: "kinetic energy of the particle" },
          { symbol: "\\(q\\)", meaning: "charge of the particle" },
          { symbol: "\\(V\\)", meaning: "accelerating voltage" },
        ],
      },
      authoredExample: {
        prompt: "An electron is accelerated from rest through 100 V. Find its de Broglie wavelength.",
        steps: [
          "For an electron, \\(\\lambda = \\dfrac{1.227}{\\sqrt{V}}\\) nm.",
          "\\(\\lambda = \\dfrac{1.227}{\\sqrt{100}} = \\dfrac{1.227}{10} = 0.1227\\) nm.",
        ],
        answer: "0.1227 nm",
      },
      selfCheckExample: {
        prompt:
          "A proton and an alpha particle (four times the proton's mass) have the same kinetic energy. What is the ratio of their de Broglie wavelengths, proton to alpha?",
        steps: [
          "At equal K, \\(\\lambda = \\dfrac{h}{\\sqrt{2mK}} \\propto \\dfrac{1}{\\sqrt{m}}\\).",
          "\\(\\dfrac{\\lambda_p}{\\lambda_\\alpha} = \\sqrt{\\dfrac{m_\\alpha}{m_p}} = \\sqrt{4} = 2\\).",
        ],
        answer: "2 : 1",
      },
      practiceSet: [
        { prompt: "The voltage accelerating an electron is made four times as large. What happens to its de Broglie wavelength?", answer: "It halves" },
        { prompt: "The kinetic energy of a particle becomes nine times as large. What happens to its de Broglie wavelength?", answer: "It becomes one third" },
        { prompt: "Write the momentum of a particle of mass m and kinetic energy K.", answer: "\\(p = \\sqrt{2mK}\\)" },
        { prompt: "Through what voltage must an electron be accelerated from rest to have a de Broglie wavelength of 0.01227 nm?", answer: "\\(10^{4}\\) V" },
      ],
      pyqExampleId: "8d6190ef-fbd8-46da-bea7-d29c289d1d32",
      traps: [
        {
          title: "The charge counts too",
          body: "Through the same voltage a particle gains energy \\(qV\\), so an alpha particle (charge 2e) gains twice a proton's energy. For equal voltage, \\(\\lambda \\propto 1/\\sqrt{mq}\\), not \\(1/\\sqrt{m}\\).",
        },
        {
          title: "A square root, not a straight ratio",
          body: "\\(\\lambda \\propto 1/\\sqrt{V}\\): four times the voltage halves the wavelength, it does not cut it to a quarter.",
        },
        {
          title: "The 1.227 nm shortcut is for electrons only",
          body: "The shortcut \\(\\lambda = 1.227/\\sqrt{V}\\) nm uses the electron's mass and charge. For a proton or an alpha particle, use \\(\\lambda = h/\\sqrt{2mqV}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphdn-photon-vs-particle",
      name: "A photon and a particle compared",
      intuition:
        "A photon and an electron can have the same energy, but they hold it differently. A photon's energy and momentum are tied by \\(E = pc\\). A slow electron's kinetic energy is \\(p^{2}/2m\\), which needs far more momentum for the same energy. So at equal energy the electron has much more momentum and a much shorter wavelength than the photon.",
      definition:
        "- Photon: \\(E = pc\\), so \\(p = \\dfrac{E}{c}\\) and \\(\\lambda = \\dfrac{hc}{E}\\). Its de Broglie wavelength is just the wavelength of the light.\n" +
        "- Particle of mass m (moving much slower than light): \\(E = \\dfrac{p^{2}}{2m}\\), so \\(p = \\sqrt{2mE}\\) and \\(\\lambda = \\dfrac{h}{\\sqrt{2mE}}\\).\n" +
        "- **Same energy:** \\(\\dfrac{\\lambda_{\\text{photon}}}{\\lambda_{\\text{particle}}} = \\dfrac{p_{\\text{particle}}}{p_{\\text{photon}}} = c\\sqrt{\\dfrac{2m}{E}}\\), a large number.\n" +
        "- **Same wavelength:** the momenta are equal. Then the photon's energy \\(pc\\) is \\(\\dfrac{2c}{v}\\) times the particle's \\(\\dfrac{1}{2}pv\\).\n" +
        "- A photoelectron's energy comes from Einstein's equation, \\(K_{\\max} = h\\nu - \\phi_0\\); its wavelength is then \\(h/\\sqrt{2mK_{\\max}}\\).",
      formula: {
        label: "Photon and particle at the same energy",
        latex: "\\lambda_{\\text{photon}} = \\frac{hc}{E}, \\qquad \\lambda_{\\text{particle}} = \\frac{h}{\\sqrt{2mE}}, \\qquad \\frac{p_{\\text{particle}}}{p_{\\text{photon}}} = c\\sqrt{\\frac{2m}{E}}",
      },
      authoredExample: {
        prompt:
          "A photon and an electron have the same de Broglie wavelength. The electron moves at \\(3 \\times 10^{6}\\) m/s. Find the ratio of the photon's energy to the electron's kinetic energy.",
        steps: [
          "Same wavelength means the same momentum p.",
          "Photon: \\(E = pc\\). Electron: \\(K = \\dfrac{1}{2}mv^{2} = \\dfrac{1}{2}pv\\).",
          "\\(\\dfrac{E}{K} = \\dfrac{2c}{v} = \\dfrac{2 \\times 3 \\times 10^{8}}{3 \\times 10^{6}} = 200\\).",
        ],
        answer: "200",
      },
      selfCheckExample: {
        prompt:
          "Photons of 4 eV fall on a metal of work function 2.5 eV. Find the de Broglie wavelength of the fastest photoelectrons. (\\(m = 9 \\times 10^{-31}\\) kg, \\(h = 6.6 \\times 10^{-34}\\) J s)",
        steps: [
          "\\(K_{\\max} = 4 - 2.5 = 1.5\\) eV \\(= 2.4 \\times 10^{-19}\\) J.",
          "\\(p = \\sqrt{2mK} = \\sqrt{2 \\times 9 \\times 10^{-31} \\times 2.4 \\times 10^{-19}} \\approx 6.6 \\times 10^{-25}\\ \\text{kg m/s}\\).",
          "\\(\\lambda = \\dfrac{h}{p} \\approx \\dfrac{6.6 \\times 10^{-34}}{6.6 \\times 10^{-25}} = 10^{-9}\\) m.",
        ],
        answer: "About 1 nm",
      },
      practiceSet: [
        { prompt: "Write the momentum of a photon of energy E.", answer: "\\(p = E/c\\)" },
        { prompt: "A photon and an electron have equal de Broglie wavelengths. Are their momenta equal?", answer: "Yes; \\(\\lambda = h/p\\) for both" },
        { prompt: "Photons of 3 eV fall on a metal of work function 2 eV. What kinetic energy do the fastest photoelectrons have?", answer: "1 eV" },
        { prompt: "Is a photon's de Broglie wavelength different from the wavelength of its light?", answer: "No; \\(h/p = hc/E\\) is the light's own wavelength" },
      ],
      pyqExampleId: "4d5ace62-b8f0-46ce-bf96-cf6a10fc015a",
      traps: [
        {
          title: "\\(E = pc\\) is for photons only",
          body: "For an electron moving much slower than light, \\(K = p^{2}/2m\\). Using \\(E = pc\\) for the electron gives a momentum that is far too small.",
        },
        {
          title: "Same energy is not same momentum",
          body: "At equal energy a particle's momentum is \\(c\\sqrt{2m/E}\\) times a photon's, so its wavelength is shorter by the same factor. Equal momentum, not equal energy, gives equal wavelengths.",
        },
      ],
    },
  ],
};
