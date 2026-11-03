import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 14 Semiconductor Electronics: Materials, Devices and
 * Simple Circuits. Statements checked against the NCERT text (definitions are
 * the book's own wording); most-asked years from all 137 CBSE board
 * past-paper questions in the bank, 2022-2026. The 8 questions on the solar
 * cell, photodiode and LED (all 2022) are left out: the current book no longer
 * teaches these devices.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Semiconductor Electronics: Materials, Devices and Simple Circuits",
  chapterSlug: "semiconductor-electronics-materials-devices-and-simple-circuits",
  source: "NCERT Physics Part II (CBSE Class 12), Chapter 14",
  keyPoints: [
    {
      term: "Classification by resistivity",
      text: "Metals: very low resistivity, \\(\\rho \\sim 10^{-2}\\) to \\(10^{-8}\\ \\Omega\\) m. Semiconductors: intermediate, \\(10^{-5}\\) to \\(10^{6}\\ \\Omega\\) m. Insulators: high resistivity, \\(10^{11}\\) to \\(10^{19}\\ \\Omega\\) m. Semiconductors may be elemental (Si, Ge) or compound (GaAs, CdS).",
    },
    {
      term: "Energy bands",
      text: "The band of the valence electrons is the valence band; the band above it is the conduction band; the gap between them is the energy band gap \\(E_g\\). Metals: bands overlap or the conduction band is partly filled. Insulators: \\(E_g > 3\\) eV. Semiconductors: \\(E_g < 3\\) eV. C 5.4 eV, Si 1.1 eV, Ge 0.7 eV; Sn 0 eV, so it is a metal.",
    },
    {
      term: "Intrinsic semiconductor",
      text: "Pure Si or Ge. Thermal energy breaks a few covalent bonds, giving free electrons and an equal number of holes: \\(n_e = n_h = n_i\\). At 0 K it behaves like an insulator; its conductivity rises with temperature, but at room temperature it is very low.",
    },
    {
      term: "Hole",
      text: "The vacancy with the effective positive electronic charge is called a hole; it behaves as an apparent free particle. Under a field holes move towards negative potential: \\(I = I_e + I_h\\). Electrons and holes also recombine; at equilibrium the rate of generation equals the rate of recombination.",
    },
    {
      term: "Doping",
      text: "The deliberate addition of a desirable impurity (a few parts per million) is called doping, and the impurity atoms are called dopants. The dopant must not distort the lattice, so its size is nearly that of Si or Ge. Pentavalent: As, Sb, P. Trivalent: In, B, Al.",
    },
    {
      term: "n-type semiconductor",
      text: "A pentavalent atom bonds four electrons; the fifth is weakly bound (about 0.01 eV in Ge, 0.05 eV in Si, against 0.72 eV and 1.1 eV to cross the band gap), so it is free at room temperature. The dopant is a donor; electrons are majority carriers, holes minority: \\(n_e \\gg n_h\\).",
    },
    {
      term: "p-type semiconductor",
      text: "A trivalent atom forms only three bonds; the fourth has a vacancy, a hole. One acceptor atom gives one hole. Holes are the majority carriers and electrons the minority carriers: \\(n_h \\gg n_e\\).",
    },
    {
      term: "Charge neutrality and carrier balance",
      text: "The crystal maintains an overall charge neutrality: the extra carriers are balanced by the ionised cores. Majority carriers increase recombination, so doping reduces the minority carriers: \\(n_en_h = n_i^2\\).",
    },
    {
      term: "Energy levels of donors and acceptors",
      text: "Donor level \\(E_D\\) lies slightly below the bottom of the conduction band, so donor electrons move into it with very small energy. Acceptor level \\(E_A\\) lies slightly above the top of the valence band, so valence electrons fill it easily, leaving holes.",
    },
    {
      term: "Formation of a p-n junction",
      text: "Two important processes occur: diffusion and drift. Holes diffuse p to n and electrons n to p, leaving immobile ionised donors (+) on the n-side and acceptors (-) on the p-side: the depletion region, about 0.1 μm thick. Its field drives a drift current opposite to the diffusion current. Initially diffusion is large; at equilibrium they are equal, so there is no net current.",
    },
    {
      term: "Barrier potential",
      text: "The n-material has lost electrons and the p-material gained them, so n is positive relative to p. This potential tends to prevent the movement of electrons from n to p, so it is called a barrier potential. A junction cannot be made by pressing two slabs together: the roughness is far larger than the atomic spacing.",
    },
    {
      term: "Forward bias",
      text: "p-side to the positive terminal. The barrier height falls to \\(V_0 - V\\) and the depletion layer narrows. Electrons and holes cross and become minority carriers on the other side: minority carrier injection. Current (mA) rises sharply past the threshold voltage, about 0.7 V for Si and 0.2 V for Ge.",
    },
    {
      term: "Reverse bias",
      text: "n-side positive. The applied voltage mostly drops across the depletion region; the barrier rises to \\(V_0 + V\\) and the depletion region widens. Only minority carriers drift: a current of a few μA, almost independent of voltage (reverse saturation current) up to the breakdown voltage. Beyond the rated current the diode is destroyed by overheating.",
    },
    {
      term: "Rectifier",
      text: "The diode allows current only when forward biased: forward resistance low, reverse resistance high. So an ac voltage gives current only in part of the cycle: this property is used to rectify alternating voltages. A capacitor across the load filters the ripple and gives a steadier dc output.",
    },
  ],
  formulas: [
    { label: "Carrier concentrations", latex: "n_en_h = n_i^2 \\qquad \\text{intrinsic: } n_e = n_h = n_i" },
    { label: "Doped crystal", latex: "N_D = (\\text{fraction doped}) \\times N_{Si} \\qquad n_e \\approx N_D \\qquad n_h = \\frac{n_i^2}{N_D}" },
    { label: "Current in a semiconductor", latex: "I = I_e + I_h" },
    { label: "Barrier under bias", latex: "\\text{forward: } V_0 - V \\qquad \\text{reverse: } V_0 + V" },
    { label: "Dynamic resistance", latex: "r_d = \\frac{\\Delta V}{\\Delta I}" },
    { label: "Diode with a series resistor", latex: "V = V_{threshold} + IR" },
    { label: "Rectifier output frequency", latex: "\\text{half-wave: } f_{out} = f \\qquad \\text{full-wave: } f_{out} = 2f" },
    { label: "Energy values", latex: "E_g: \\ \\text{C } 5.4, \\ \\text{Si } 1.1, \\ \\text{Ge } 0.7\\text{ eV} \\qquad \\text{donor ionisation: Ge } 0.01, \\ \\text{Si } 0.05\\text{ eV}" },
  ],
  derivations: [
    {
      title: "Explain the formation of the depletion layer and the barrier potential in a p-n junction",
      steps: [
        "n-side has more electrons, p-side more holes: the concentration gradient makes holes diffuse p to n and electrons n to p (diffusion current).",
        "Each electron leaving n leaves an immobile ionised donor (+); each hole leaving p leaves an ionised acceptor (-). These space-charge layers form the depletion region.",
        "The field from + (n-side) to - (p-side) drifts minority carriers back: a drift current opposite to the diffusion current.",
        "Diffusion falls and drift grows until they are equal: no net current. The potential across the junction, n positive, opposes further flow: the barrier potential \\(V_0\\).",
      ],
    },
    {
      title: "Explain the working of a p-n junction diode as a full-wave rectifier, with circuit diagram and waveforms",
      steps: [
        "Two diodes D1 and D2: their p-sides go to the ends A and B of a centre-tap transformer's secondary; their n-sides are joined, and the load \\(R_L\\) is between this point and the centre tap.",
        "When A is positive with respect to the centre tap, B is negative: D1 is forward biased and conducts, D2 does not; current flows through \\(R_L\\).",
        "In the other half, B is positive: D2 conducts, D1 does not; current through \\(R_L\\) is in the same direction.",
        "Output is obtained in both halves, as half-sinusoid pulses at twice the input frequency; it is more efficient than the half-wave rectifier.",
      ],
    },
    {
      title: "Explain the working of a p-n junction diode as a half-wave rectifier",
      steps: [
        "A diode is in series with the load \\(R_L\\) across the secondary AB of a transformer.",
        "A positive: diode forward biased, it conducts, and the output appears across \\(R_L\\). A negative: diode reverse biased, no current (reverse saturation current is negligible).",
        "The output is in one direction, during alternate half-cycles only; its frequency equals the input frequency.",
      ],
    },
    {
      title: "Explain the effect of forward and reverse bias on the barrier potential, the depletion layer and the current",
      steps: [
        "Forward bias: applied voltage opposes \\(V_0\\), barrier falls to \\(V_0 - V\\), depletion layer narrows; majority carriers cross (minority carrier injection) and diffuse away: current in mA.",
        "Reverse bias: applied voltage adds to \\(V_0\\), barrier rises to \\(V_0 + V\\), depletion layer widens; diffusion current falls enormously.",
        "Only minority carriers near the junction are swept across: drift current of a few μA, limited by the minority carrier concentration, not by the voltage, up to breakdown.",
      ],
    },
    {
      title: "Find the electron and hole concentrations in a doped crystal (Si with 1 ppm of arsenic)",
      steps: [
        "\\(N_{Si} = 5 \\times 10^{28}\\text{ m}^{-3}\\); 1 ppm gives \\(N_D = 5 \\times 10^{28} \\times 10^{-6} = 5 \\times 10^{22}\\text{ m}^{-3}\\).",
        "Thermally generated electrons (\\(n_i \\sim 10^{16}\\)) are negligible, so \\(n_e \\approx 5 \\times 10^{22}\\text{ m}^{-3}\\).",
        "\\(n_h = \\frac{n_i^2}{n_e} = \\frac{(1.5 \\times 10^{16})^2}{5 \\times 10^{22}} = 4.5 \\times 10^{9}\\text{ m}^{-3}\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Energy bands of a metal, an insulator and a semiconductor",
      labels: ["valence band, conduction band", "overlapping bands for a metal", "Eg > 3 eV for an insulator", "Eg < 3 eV for a semiconductor"],
    },
    {
      title: "Energy bands of n-type and p-type semiconductors at T > 0 K",
      labels: ["EC and EV", "donor level ED just below EC (n-type)", "acceptor level EA just above EV (p-type)", "electrons in the CB, holes in the VB"],
    },
    {
      title: "p-n junction formation and barrier potential",
      labels: ["p-region and n-region, depletion region", "fixed - ions on p-side, + ions on n-side", "directions of diffusion and drift current", "potential step V0, n-side higher"],
    },
    {
      title: "Circuit for V-I characteristics of a p-n junction diode, forward and reverse bias",
      labels: ["battery through a potentiometer, voltmeter", "milliammeter (forward), microammeter (reverse)", "curve: threshold about 0.7 V for Si", "small reverse current, breakdown at Vbr"],
    },
    {
      title: "Half-wave rectifier circuit with input and output waveforms",
      labels: ["transformer secondary A and B", "one diode in series with RL", "output only in alternate half-cycles"],
    },
    {
      title: "Full-wave rectifier circuit with input and output waveforms",
      labels: ["centre-tap transformer, ends A and B", "diodes D1 and D2, n-sides joined", "load RL to the centre tap", "output in both half-cycles, same direction"],
    },
  ],
  mostAsked: [
    {
      topic: "Forward and reverse bias: barrier and depletion layer, minority carrier injection, V-I characteristics and circuit, threshold voltage, dynamic resistance",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Rectifier: working of a full-wave (or half-wave) rectifier with circuit and waveforms, output frequency, why a diode rectifies",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Intrinsic and extrinsic semiconductors: differences, n-type and p-type, dopants, majority and minority carriers, charge neutrality",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Formation of a p-n junction: diffusion and drift, depletion layer and barrier potential",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Energy bands of conductors, insulators and semiconductors; band gap; effect of temperature on conductivity",
      marks: 1,
      years: [2025, 2024, 2023, 2022],
    },
    {
      topic: "Carrier concentration numericals using ne nh = ni squared",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Energy band diagrams of n-type and p-type semiconductors: donor and acceptor levels, energy to free the extra electron",
      years: [2026, 2025, 2024, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Bias and the depletion layer",
      body: "Forward bias lowers the barrier and narrows the depletion layer; reverse bias raises the barrier and widens it. The forward current is mainly diffusion of majority carriers; the reverse current is drift of minority carriers.",
    },
    {
      title: "Which way charges diffuse",
      body: "Holes diffuse from p to n and electrons from n to p. This leaves a positive layer on the n-side and a negative layer on the p-side, not the other way round.",
    },
    {
      title: "Doped does not mean charged",
      body: "An n-type crystal is not negatively charged and a p-type is not positive: every extra carrier is matched by an ionised dopant core of opposite charge.",
    },
    {
      title: "Using the mass action law",
      body: "Find the minority carrier by division, \\(n_h = \\frac{n_i^2}{n_e}\\), not by subtraction. For \\(n_i = 1.5 \\times 10^{16}\\) and \\(n_e = 5 \\times 10^{22}\\): \\(n_h = 4.5 \\times 10^9\\text{ m}^{-3}\\).",
    },
    {
      title: "Rectifier frequency",
      body: "Read f from the input: \\(V = 0.5\\sin(100\\pi t)\\) means \\(\\omega = 100\\pi\\), so f = 50 Hz. Half-wave output is 50 Hz, full-wave output is 100 Hz. In a full-wave rectifier the diodes conduct in turn, never together.",
    },
    {
      title: "Temperature and resistance",
      body: "Heating a semiconductor raises its conductivity (more carriers); heating a metal such as copper lowers it. At 0 K an intrinsic semiconductor has infinite resistivity.",
    },
  ],
};

export default sheet;
