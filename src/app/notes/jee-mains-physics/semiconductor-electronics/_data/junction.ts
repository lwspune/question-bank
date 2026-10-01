import type { SubtopicNote } from "@/app/notes/_types";

export const JUNCTION_SEMI_NOTE: SubtopicNote = {
  subtopicName: "Semiconductors and the p-n Junction",
  title: "Semiconductors and the p-n Junction",
  oneLineDefinition:
    "Doping decides which carrier is in the majority; joining p-type to n-type builds a barrier, and the bias across it decides whether the junction conducts.",
  whyItMatters:
    "Thirty-one PYQs, twenty-eight of them multiple choice, and two from 2026. Eight are about carriers and doping: which dopant gives which type, where the Fermi level sits and what heat does to resistance. Thirteen are about the junction itself: the barrier and its field, forward and reverse bias, the I-V curve and Zener breakdown. Ten are about LEDs, photodiodes and solar cells. Most are statements to judge, so the facts below are worth learning exactly.",
  concepts: [
    // C1 — carriers and doping
    {
      kind: "reference" as const,
      slug: "jpsemi-carriers",
      name: "Intrinsic, n-type and p-type semiconductors",
      intuition:
        "Pure silicon has very few free carriers, and every electron freed leaves a hole behind, so the two are equal. Doping adds atoms with one electron too many (pentavalent) or one too few (trivalent). The extra electrons, or the extra holes, then far outnumber the other kind. The crystal stays neutral, because each dopant ion carries the charge its carrier took away.",
      definition:
        "- **Intrinsic:** pure Si or Ge, \\(n_e = n_h = n_i\\).\n" +
        "- **n-type:** a pentavalent donor (P, As, Sb). Electrons are the majority carriers, holes the minority.\n" +
        "- **p-type:** a trivalent acceptor (B, Al, Ga, In). Holes are the majority carriers, electrons the minority.\n" +
        "- **Mass action:** in equilibrium \\(n_e n_h = n_i^{2}\\), doped or not. More of one carrier means fewer of the other.\n" +
        "- A doped crystal is electrically **neutral**: the donor or acceptor ions balance the free carriers.\n" +
        "- Heating frees more carriers, so \\(n_e\\) rises steeply and resistivity falls. A semiconductor has a negative temperature coefficient of resistance; its resistivity curve falls towards zero but never reaches it.",
      table: {
        columns: ["Type", "Dopant", "Majority carriers", "Fermi level", "Net charge"],
        rows: [
          { cells: ["Intrinsic (pure Si, Ge)", "none", "none: \\(n_e = n_h = n_i\\)", "near the middle of the band gap", "neutral"] },
          { cells: ["n-type", "pentavalent donor: P, As, Sb", "electrons", "near the conduction band; rises with more doping", "neutral"] },
          { cells: ["p-type", "trivalent acceptor: B, Al, Ga, In", "holes", "near the valence band; falls with more doping", "neutral"] },
          { cells: ["Metal", "not doped", "free electrons", "inside the conduction band", "neutral"] },
        ],
        caption: "Whatever the dopant, the crystal stays neutral and the product of the two carrier densities stays fixed.",
      },
      selfCheckExample: {
        prompt:
          "Silicon has \\(n_i = 1.5 \\times 10^{16}\\ \\text{m}^{-3}\\). After doping, its electron density is \\(4.5 \\times 10^{22}\\ \\text{m}^{-3}\\). Find the hole density, and say which type the crystal is.",
        steps: [
          "Mass action: \\(n_h = \\dfrac{n_i^{2}}{n_e} = \\dfrac{2.25 \\times 10^{32}}{4.5 \\times 10^{22}}\\).",
          "\\(n_h = 5 \\times 10^{9}\\ \\text{m}^{-3}\\), far fewer than the electrons.",
          "Electrons are the majority, so the crystal is n-type.",
        ],
        answer: "\\(5 \\times 10^{9}\\ \\text{m}^{-3}\\); n-type.",
      },
      practiceSet: [
        { prompt: "Arsenic is added to germanium. Which carriers are in the majority?", answer: "Electrons (arsenic is pentavalent)" },
        { prompt: "A semiconductor has \\(n_i = 10^{16}\\ \\text{m}^{-3}\\) and a hole density of \\(10^{20}\\ \\text{m}^{-3}\\). Its electron density?", answer: "\\(10^{12}\\ \\text{m}^{-3}\\)" },
        { prompt: "Is an n-type crystal negatively charged?", answer: "No, it is neutral" },
        { prompt: "Gallium is added to silicon. Where does the Fermi level move?", answer: "Towards the valence band (p-type)" },
      ],
      pyqExampleId: "98eedcd9-b054-4f8f-945d-efd1ee8ef4d5", // 2023: B and As doping; no current at an unbiased junction
      traps: [
        {
          title: "Extra electrons do not make a negative crystal",
          body: "An n-type crystal has more free electrons than holes, but every donor atom that gave an electron is left as a positive ion. The crystal as a whole is neutral. 'n-type has net negative charge' is false.",
        },
        {
          title: "The product stays fixed, not the sum",
          body: "Doping raises one carrier density and lowers the other so that n_e n_h = n_i² still holds. The minority density falls below n_i; it does not stay at n_i.",
        },
        {
          title: "Resistivity falls with heat, but never to zero",
          body: "A graph of a semiconductor's resistivity against temperature is a falling curve that flattens out. A straight line, a rising curve or one that touches zero is wrong.",
        },
      ],
    },

    // C2 — the junction: barrier, bias, I-V
    {
      kind: "formula" as const,
      slug: "jpsemi-junction",
      name: "The p-n junction: barrier, bias and dynamic resistance",
      intuition:
        "When p-type meets n-type, electrons and holes diffuse across and cancel near the joint. That leaves a thin depletion layer of fixed ions and a barrier potential across it, which stops further flow. With no battery the diffusion and drift currents balance and no net current flows. Forward bias lowers the barrier and current rises steeply; reverse bias raises it, and only a tiny minority-carrier current flows.",
      definition:
        "- The barrier is about 0.7 V for silicon and 0.3 V for germanium. With no external battery the net current is **zero**.\n" +
        "- The field in the depletion layer is about \\(E = V_b/d\\) for a barrier \\(V_b\\) across a width \\(d\\).\n" +
        "- Charge balance: \\(N_A x_p = N_D x_n\\). The **lightly doped** side holds the wider part of the depletion layer.\n" +
        "- An electron crossing from n to p climbs the barrier and loses kinetic energy \\(eV_b\\).\n" +
        "- **Forward bias:** the p-side is at the higher potential. Compare the two potentials, not their signs: p at −5 V and n at −8 V is forward bias. The barrier and the depletion layer shrink; the diffusion (majority) current dominates.\n" +
        "- **Reverse bias:** the n-side is higher. The depletion layer widens, and a small drift current of minority carriers flows, nearly independent of the voltage until breakdown.\n" +
        "- **Dynamic resistance** \\(r = \\Delta V/\\Delta I\\), read from the I-V curve. It is smaller at higher forward currents, where the curve is steeper.\n" +
        "- **Zener breakdown** needs both sides heavily doped: the depletion layer is thin and its field is strong. A Zener diode works in reverse bias; forward biased, it is an ordinary diode.\n" +
        "- A multimeter shows a low resistance one way round and a high resistance the other way round for a good diode.",
      formula: {
        label: "Barrier field, energy loss and dynamic resistance",
        latex: "E = \\frac{V_b}{d}, \\qquad \\tfrac{1}{2}mv^{2} = \\tfrac{1}{2}mu^{2} - eV_b, \\qquad r = \\frac{\\Delta V}{\\Delta I}",
      },
      authoredExample: {
        prompt:
          "An electron with kinetic energy 1.25 eV reaches a junction from the n-side. The barrier is 0.45 V. What kinetic energy does it have on the p-side, and by what factor has its speed changed?",
        steps: [
          "Crossing from n to p, the electron climbs the barrier and loses \\(eV_b = 0.45\\) eV.",
          "Kinetic energy on the p-side: \\(1.25 - 0.45 = 0.80\\) eV.",
          "Speed goes as the square root of kinetic energy: \\(\\dfrac{v}{u} = \\sqrt{\\dfrac{0.80}{1.25}} = \\sqrt{0.64} = 0.8\\).",
        ],
        answer: "0.80 eV; the speed falls to 0.8 of its value.",
      },
      selfCheckExample: {
        prompt:
          "The barrier across a junction is 0.5 V and the depletion layer is 2 μm wide. Find the electric field in the depletion layer.",
        steps: [
          "\\(E = \\dfrac{V_b}{d} = \\dfrac{0.5}{2 \\times 10^{-6}}\\).",
          "\\(E = 2.5 \\times 10^{5}\\ \\text{V/m}\\).",
        ],
        answer: "\\(2.5 \\times 10^{5}\\ \\text{V/m}\\)",
      },
      practiceSet: [
        { prompt: "A diode has its p-side at 2 V and its n-side at 6 V. Forward or reverse biased?", answer: "Reverse (the n-side is 4 V higher)" },
        { prompt: "On a diode's I-V curve, the voltage rises from 0.72 V to 0.74 V while the current rises from 10 mA to 30 mA. Dynamic resistance?", answer: "1 Ω" },
        { prompt: "A junction has \\(N_A = 10^{16}\\ \\text{cm}^{-3}\\) and \\(N_D = 10^{17}\\ \\text{cm}^{-3}\\). Which side holds the wider part of the depletion layer, and by what factor?", answer: "The p-side, 10 times wider" },
        { prompt: "Which carriers carry the small current through a reverse-biased junction?", answer: "Minority carriers, by drift" },
      ],
      pyqExampleId: "a8623501-133a-4026-943c-5d129dcd68d0", // 2022: electron crosses a 0.4 V barrier, x = 14
      traps: [
        {
          title: "Compare potentials, not signs",
          body: "A diode is forward biased when its p-side is at the higher potential. p at −4 V and n at −9 V is forward biased even though both are negative; p at −4 V and n at 0 V is reverse biased.",
        },
        {
          title: "No battery, no current",
          body: "Joining p-type to n-type does not make a current flow round an external ammeter. Diffusion builds the barrier until the diffusion and drift currents cancel, and the ammeter reads zero.",
        },
        {
          title: "The wider layer is on the lightly doped side",
          body: "The charge uncovered on each side must be equal, so the side with fewer dopant atoms per volume must uncover a longer stretch. The heavily doped side has the thinner part of the depletion layer.",
        },
        {
          title: "Subtract energy, then take the root",
          body: "An electron crossing the barrier loses eV_b of kinetic energy, not a fixed amount of speed. Subtract in energy, then convert back to speed with a square root.",
        },
      ],
    },

    // C3 — special-purpose diodes
    {
      kind: "reference" as const,
      slug: "jpsemi-opto",
      name: "Special-purpose diodes and the bias each one uses",
      intuition:
        "A photon of energy equal to the band gap is what an electron gives out when it drops across the gap, and what it needs to jump across it. An LED uses the first: forward bias pushes electrons and holes together and they give out light. A photodiode and a solar cell use the second: light makes electron-hole pairs at the junction. Which bias each device needs follows from what it is for.",
      definition:
        "- Photon energy and wavelength: \\(\\lambda\\,(\\text{nm}) = \\dfrac{1240}{E\\,(\\text{eV})}\\), from \\(hc \\approx 1240\\ \\text{eV nm}\\).\n" +
        "- **LED:** heavily doped, forward biased; emits light of photon energy close to \\(E_g\\). Its light grows with current only up to a point. Visible light (400 to 700 nm) needs \\(E_g\\) between about 1.8 eV and 3.1 eV.\n" +
        "- **Photodiode:** reverse biased. The reverse current is tiny, so the extra carriers made by light change it by a large fraction, which makes it easy to detect. Only light with \\(\\lambda < 1240/E_g\\) nm is detected.\n" +
        "- **Solar cell:** no external bias. A large junction area collects more light; it drives current through a load and works in the fourth quadrant of the I-V graph.\n" +
        "- **Zener diode:** reverse biased at breakdown, holding the voltage across it constant.",
      table: {
        columns: ["Device", "Bias in use", "Doping and junction", "What it does"],
        rows: [
          { cells: ["Rectifier diode", "forward to conduct, reverse to block", "moderate doping", "lets current through one way only"] },
          { cells: ["Zener diode", "reverse, at breakdown", "both sides heavily doped; thin depletion layer", "holds the voltage across it constant"] },
          { cells: ["LED", "forward", "heavily doped", "electrons and holes recombine and give out light of photon energy about \\(E_g\\)"] },
          { cells: ["Photodiode", "reverse", "junction close to the surface so light reaches it", "light makes electron-hole pairs and raises the reverse current"] },
          { cells: ["Solar cell", "no external bias", "large junction area, thin top layer", "light produces an emf; works in the fourth quadrant of the I-V graph"] },
        ],
        caption: "The LED is the only one forward biased in use; the photodiode and Zener work in reverse, and the solar cell needs no battery at all.",
      },
      selfCheckExample: {
        prompt: "A green LED gives out light of wavelength 500 nm. What is the band gap of its material?",
        steps: [
          "\\(E_g = \\dfrac{1240}{\\lambda\\,(\\text{nm})} = \\dfrac{1240}{500}\\).",
          "\\(E_g = 2.48\\) eV.",
        ],
        answer: "2.48 eV",
      },
      practiceSet: [
        { prompt: "A photodiode's band gap is 2.0 eV. Longest wavelength it can detect?", answer: "620 nm" },
        { prompt: "Which of these works with no external bias: LED, photodiode, solar cell?", answer: "Solar cell" },
        { prompt: "An LED's band gap is 2.07 eV. Wavelength of its light?", answer: "About 600 nm (orange)" },
        { prompt: "Why is a photodiode used in reverse bias?", answer: "The small reverse current changes by a large fraction when light falls on it" },
      ],
      pyqExampleId: "1c4b32ec-56aa-470c-acc2-6078bb0eb544", // 2024: GaAs LED, 1.42 eV, 875 nm
      traps: [
        {
          title: "A photodiode is reverse biased",
          body: "Forward biased, a photodiode carries a large majority current that light hardly changes. It is used in reverse bias, where light changes the small minority current by a large fraction.",
        },
        {
          title: "Use eV with 1240, or joules with hc",
          body: "λ in nm = 1240 ÷ E in eV. Dividing 1240 by an energy in joules, or hc in joule metres by an energy in eV, gives an answer off by a factor of about 10¹⁹.",
        },
        {
          title: "A solar cell needs a large area",
          body: "A solar cell's junction area is made large to collect as much light as possible, and it has no battery. A photodiode has the small junction and the reverse bias.",
        },
      ],
    },
  ],
};
