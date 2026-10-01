/**
 * Deep-dives for nine /guide/jee-mains-physics playbooks: Electromagnetic Induction, Alternating
 * Current, Electromagnetic Waves, Ray Optics, Wave Optics, Dual Nature of Radiation and Matter,
 * Atoms, Nuclei and Semiconductor Electronics. Sub-skills follow each chapter's /notes page order.
 * Prose carries no bank figures — the pages print counts and rates from generated data.
 */
import type { PlaybookDetail } from "./types";

export const PLAYBOOK_DETAILS_C: Record<string, PlaybookDetail> = {
  "electromagnetic-induction": {
    slug: "electromagnetic-induction",
    trigger: "A flux that changes through a field, an area or an angle, or a conductor moving or turning across a field, and the emf, current or charge that follows.",
    story: [
      "Almost every question here comes down to one law: the emf is the rate at which the flux changes. The work is in seeing what changes — the field, the area, the angle, or a conductor cutting across the field — and writing that change down before reaching for a formula.",
      "The pages run from a loop in a changing field, to rods on rails and loops crossing the edge of a field, to coils, rods and discs that rotate, and end with self and mutual inductance and LR circuits. The arithmetic is short. Marks are lost on factors: an angle taken from the plane instead of the normal, the wrong component of the earth's field, the half in ½Bωl², rpm left unconverted, or a current change that crosses zero.",
      "Many questions want a typed number, so a lost factor has no option to expose it. The force on a current in a field comes from Moving Charges and Magnetism, and a coil turning at a steady rate is the source behind Alternating Current.",
    ],
    subSkills: [
      { name: "Flux, Faraday's law and Lenz's law", description: "Write Φ = NBA cos θ with θ from the normal, differentiate in time, and let the current oppose the change; the charge that flows is NΔΦ/R and does not depend on the time taken." },
      { name: "Motional emf on rods, rails and loops", description: "A rod cutting a field gives Blv with the field component it cuts; on rails the drag B²l²v/R sets a terminal speed; a loop has an emf only while an edge crosses a field boundary." },
      { name: "Rotating coils, rods and discs", description: "A coil spinning at ω gives NBAω sin ωt, largest when its plane lies along the field; a rod turning about one end gives ½Bωl², and a disc the same between axle and rim." },
      { name: "Inductance and LR circuits", description: "Back emf −L dI/dt, mutual emf −M dI/dt, stored energy ½LI², and a current that grows or decays with time constant L/R." },
    ],
    traps: [
      { name: "Plane or normal", description: "Flux takes the cosine of the angle from the normal. An angle given from the plane of the loop needs its sine instead." },
      { name: "The wrong component of the earth's field", description: "The dip is measured from the horizontal. Wings and a horizontal fan cut only the vertical component B sin δ; a falling horizontal wire cuts only the horizontal one, B cos δ." },
      { name: "Forgetting the half", description: "A rod turning about one end gives ½Bωl², because its pieces move at speeds from zero to ωl. A fan's emf is that of one blade, however many blades it has." },
      { name: "A change that crosses zero", description: "A current going from −2 A to +2 A changes by 4 A. A field that reverses changes the flux by 2NBA, not by zero." },
    ],
    relatedSlugs: ["moving-charges-and-magnetism", "alternating-current", "magnetism-and-matter"],
  },

  "alternating-current": {
    slug: "alternating-current",
    trigger: "A sinusoidal source, an rms meter reading, or a circuit of R, L and C where reactance, phase or resonance decides the answer.",
    story: [
      "Much of this chapter is the series LCR circuit and its resonance. It rests on three facts: meters and ratings give rms values, an inductor's reactance rises with frequency while a capacitor's falls, and voltages and reactances in series combine at right angles rather than by plain addition.",
      "The pages build that in order: rms values and timing on a sine wave, the reactance of each part, impedance with phase and power, resonance with its quality factor and bandwidth, and last LC oscillations and transformers. The arithmetic is short once the facts are in place.",
      "The chapter is asked less often than in the early papers, so it sits in the long tail. Marks are lost on mixing peak and rms values, on using f where ω belongs, and on a transformer ratio turned upside down. The emf comes from a coil turning in a field, as in Electromagnetic Induction, and LC oscillations follow the same equation as a mass on a spring in Oscillations.",
    ],
    subSkills: [
      { name: "RMS values and timing", description: "The rms value is the steady current that heats a resistor at the same rate: I₀/√2 for a sine wave; for a constant plus a sinusoid the squares add." },
      { name: "Reactance of L and C", description: "X_L = ωL rises with frequency and X_C = 1/ωC falls; in an inductor the voltage leads the current by a quarter cycle, in a capacitor the current leads." },
      { name: "Impedance, phase and power", description: "Z = √(R² + (X_L − X_C)²), power factor cos φ = R/Z, and only the resistance takes power: P = I_rms²R." },
      { name: "Resonance, Q and bandwidth", description: "At ω₀ = 1/√(LC) the reactances cancel, Z = R and the current is largest; Q = ω₀L/R sets how sharp the peak is, and the band edges are the half-power points." },
      { name: "LC oscillations and transformers", description: "Energy swaps between capacitor and inductor at ω = 1/√(LC); a transformer changes voltage in the ratio of its turns while the power, less its losses, carries through." },
    ],
    traps: [
      { name: "Peak or rms", description: "A meter reading or a rating like 220 V is rms. E₀ sin ωt gives the peak current; divide by √2 for the meter." },
      { name: "f where ω belongs", description: "In sin(200πt) the coefficient is already ω. Multiplying by 2π again, or using f₀ in Q = ω₀L/R, is off by 2π." },
      { name: "Adding the voltages", description: "V_R + V_L + V_C is not the supply voltage. The parts are out of phase, so V² = V_R² + (V_L − V_C)²." },
      { name: "The turns ratio upside down", description: "Voltage follows the turns, current goes the other way. Write V_s/V_p = N_s/N_p before putting numbers in." },
    ],
    relatedSlugs: ["electromagnetic-induction", "oscillations", "current-electricity"],
  },

  "electromagnetic-waves": {
    slug: "electromagnetic-waves",
    trigger: "A wave's E or B field written out, an intensity or radiation pressure, displacement current, Maxwell's equations, or a band of the spectrum.",
    story: [
      "A short chapter. Most questions need a single relation, such as E₀ = cB₀, I = ½cε₀E₀² or v = c/√(μᵣεᵣ), and then a careful cross product for a direction. The largest group is about the two fields of the wave themselves.",
      "The pages start from displacement current and Maxwell's equations, which give the wave and its speed, then the fields, then the energy, intensity and pressure the wave carries, and end with the spectrum. The spectrum questions are pure recall of order, sources and uses.",
      "Marks are lost on factors and directions: B written as cE instead of E/c, the average energy split wrongly between the two fields, a mirror given I/c instead of 2I/c, or the cross product taken in the wrong order. The pressure of light is the photon momentum of Dual Nature seen in bulk.",
    ],
    subSkills: [
      { name: "Displacement current and wave speed", description: "Between capacitor plates the displacement current equals the conduction current; v = 1/√(με), so n = √(μᵣεᵣ), and the frequency stays fixed in a medium." },
      { name: "E and B of a plane wave", description: "E and B are perpendicular to each other and to the direction of travel, in phase, with B₀ = E₀/c and B along k × E." },
      { name: "Energy, intensity and pressure", description: "Average energy density ½ε₀E₀², shared equally by the two fields; intensity ½cε₀E₀², or P/4πr² for a point source; pressure I/c on an absorber and 2I/c on a mirror." },
      { name: "The spectrum", description: "The order from γ-rays to radio waves by increasing wavelength, and how each band is produced and used." },
    ],
    traps: [
      { name: "B is E/c, not cE", description: "In SI units B₀ is tiny. An option that gives B the same number as E, or c times E, has skipped or inverted the division." },
      { name: "The cross product order", description: "B points along k × E, not E × k, and a wave travelling along −x puts −î in the product. The options usually offer both signs." },
      { name: "Counting the energy twice", description: "½ε₀E₀² already holds both fields; the electric share alone is ¼ε₀E₀². Adding B₀²/2μ₀ on top doubles the answer." },
      { name: "Absorber or mirror", description: "Reflected light reverses its momentum, so a mirror feels 2I/c. Using I/c halves the answer." },
    ],
    relatedSlugs: ["dual-nature", "wave-optics", "electromagnetic-induction"],
  },

  "ray-optics": {
    slug: "ray-optics",
    trigger: "A mirror, a lens, a slab, a prism or a curved glass surface, and the question asks where the image forms, how big it is, or how a ray bends.",
    story: [
      "This is a cornerstone chapter, and it has grown a great deal since the early papers. Nearly every question is solved with the mirror formula, the lens formula or Snell's law, applied with one sign convention throughout: Cartesian, with distances measured from the pole or the optical centre and taken positive in the direction the light travels.",
      "Lenses are the biggest single part: the lens formula, combinations, a lens in a liquid, cut lenses and silvered lenses. Mirrors, refraction at flat and curved surfaces, total internal reflection and prisms make up most of the rest, and optical instruments close the chapter.",
      "Marks are lost on a sign rather than on the physics: a concave mirror's focal length taken as positive, a virtual object given a negative distance, or a curved face's radius written with the wrong sign. Draw the light's direction before writing any distance. Resolving power is shared with Wave Optics.",
    ],
    subSkills: [
      { name: "Plane and spherical mirrors", description: "1/v + 1/u = 1/f with f = R/2 and m = −v/u; a plane mirror gives an erect, same-size image, and along the axis the image speed scales with m²." },
      { name: "Refraction at flat surfaces", description: "n₁ sin i = n₂ sin r with angles from the normal; a slab shifts a ray sideways without turning it, and an object under a liquid looks d/μ deep." },
      { name: "Critical angle and total internal reflection", description: "sin C = n(rarer)/n(denser); total reflection needs light starting in the denser medium at more than C, and the bright circle above a lamp has radius h tan C." },
      { name: "One curved surface and the lens-maker's formula", description: "μ₂/v − μ₁/u = (μ₂ − μ₁)/R, with the sign of R set by where the centre is; two such surfaces give 1/f = (μ − 1)(1/R₁ − 1/R₂)." },
      { name: "Thin lenses and combinations", description: "1/v − 1/u = 1/f with m = v/u; powers add in contact, and separated lenses are solved one after another, each image becoming the next object." },
      { name: "Lenses in a liquid, cut and silvered", description: "Power scales with μ(lens)/μ(medium) − 1; a cut along the axis keeps the focal length, a cut across it doubles it; a silvered lens is a mirror of power 2P(lens) plus that of the silvered face." },
      { name: "Prisms", description: "r₁ + r₂ = A and deviation i + e − A; at minimum deviation μ = sin((A + δm)/2)/sin(A/2); a thin prism deviates by (μ − 1)A, and red bends least." },
      { name: "Optical instruments and the eye", description: "Microscope (L/fₒ)(D/fₑ) and telescope fₒ/fₑ in normal adjustment; resolving power grows with the aperture and falls with the wavelength; each defect of vision has its own lens." },
    ],
    traps: [
      { name: "Mirror and lens formulas swapped", description: "A mirror uses 1/v + 1/u = 1/f with m = −v/u; a lens uses 1/v − 1/u = 1/f with m = v/u. Mixing them flips a sign or the nature of the image." },
      { name: "The sign of a radius", description: "A concave face met from outside has its centre on the incoming side, so R is negative, and R₂ of a biconvex lens is negative. Writing every radius as positive makes the focal length far too long." },
      { name: "A virtual object has u > 0", description: "When the first image lies beyond the second lens, the object for that lens is on its outgoing side. Measure from the second lens, not the first." },
      { name: "Angle from the surface", description: "A ray at 30° with the surface has an angle of incidence of 60°. Snell's law and the critical angle both take angles from the normal." },
    ],
    relatedSlugs: ["wave-optics", "electromagnetic-waves"],
  },

  "wave-optics": {
    slug: "wave-optics",
    trigger: "Two coherent sources, a slit, a polaroid or light in a medium, and the question asks where fringes fall, how bright a point is, or how much light passes.",
    story: [
      "This is a core chapter, set about once a paper, and it has grown. The largest group is Young's double slit: where the fringes fall, how bright the screen is at a point, and how far a thin sheet over one slit moves the pattern. The rest are single-slit diffraction, polarisation, the brightness of two overlapping beams, and what happens to light inside a medium.",
      "Almost every question rests on one short relation, so the arithmetic is brief. Marks are lost on a factor: an intensity ratio used where the amplitude ratio is needed, the double slit's fringe width used for a single slit's central maximum, which is twice as wide, or the half lost at the first polaroid forgotten.",
      "Many answers are typed numbers, so a factor slip has no option to expose it. Two waves adding as amplitudes is the idea from Waves, and the resolving-power results feed the instruments at the end of Ray Optics.",
    ],
    subSkills: [
      { name: "Wavefronts and light in a medium", description: "Rays are normal to the wavefront; entering a medium keeps the frequency and divides the speed and the wavelength by μ." },
      { name: "Coherent sources and resultant intensity", description: "Coherent beams add as amplitudes, I = I₁ + I₂ + 2√(I₁I₂) cos φ; incoherent beams add intensities; a plate in one path adds (μ − 1)t." },
      { name: "Fringe width and positions", description: "β = λD/d; bright fringes at whole multiples of β, dark ones halfway between; in a liquid divide λ by μ; two wavelengths first coincide where n₁λ₁ = n₂λ₂ in lowest terms." },
      { name: "Double slit intensity and sheet shifts", description: "Path difference from yd/D or from Pythagoras, then I = I_max cos²(φ/2); a sheet over one slit adds (μ − 1)t and slides the pattern towards the covered slit." },
      { name: "Single slit and resolving power", description: "Dark fringes at a sin θ = nλ, a central maximum 2λD/a wide, and a round aperture that resolves down to 1.22λ/D." },
      { name: "Polarisation", description: "The first polaroid halves unpolarised light, each later one passes cos²θ of what reaches it; reflected light is fully polarised when tan i_B = μ." },
    ],
    traps: [
      { name: "Intensity ratio used as amplitude ratio", description: "An intensity ratio of 1 : 9 is an amplitude ratio of 1 : 3. Take the square root before finding the brightest and darkest fringes." },
      { name: "Single slit and double slit swapped", description: "For one slit a sin θ = nλ is dark, and the central maximum is 2λD/a, set by the slit width a. λD/d belongs to the double slit's gap." },
      { name: "The half at the first polaroid", description: "Only the first sheet halves unpolarised light; light already polarised goes straight to I cos²θ. Each cos² uses the angle from the sheet just before." },
      { name: "Half the phase, and μ − 1", description: "I = I_max cos²(φ/2), not cos²φ, and a path of λ/3 is a phase of 2π/3. A sheet adds (μ − 1)t of path, not μt." },
    ],
    relatedSlugs: ["ray-optics", "waves", "electromagnetic-waves"],
  },

  "dual-nature": {
    slug: "dual-nature",
    trigger: "Photons and their energy or momentum, the photoelectric effect and stopping potential, or the de Broglie wavelength of a particle.",
    story: [
      "The chapter splits between light and matter. On the light side the questions ask what one photon carries and read the photoelectric effect through Einstein's equation. On the matter side most questions compare two particles' wavelengths.",
      "The arithmetic is short if energies stay in electron-volts and hc is taken as 1240 eV nm. Few questions want a typed number; most are options and statements, and the statements about frequency, intensity and graphs repeat.",
      "Marks are lost on what a ratio holds fixed: the same kinetic energy, the same voltage and the same wavelength give three different answers. Brighter light never changes the stopping potential. Photon energies carry straight into the transitions of Atoms, and the momentum of light is the radiation pressure of Electromagnetic Waves.",
    ],
    subSkills: [
      { name: "Photon energy, momentum and threshold", description: "E = hc/λ and p = h/λ; photons per second = P/E, so at equal power a longer wavelength sends more; a photon frees an electron only above the threshold frequency." },
      { name: "Photoelectric laws and graphs", description: "Frequency decides whether electrons leave and how fast the fastest move, intensity only how many; the V₀–ν line has slope h/e for every metal." },
      { name: "Einstein's equation", description: "hν = φ + eV₀; with two wavelengths on one metal, subtract the equations to remove φ; speeds go as the square root of the leftover energy." },
      { name: "de Broglie wavelength", description: "λ = h/p = h/√(2mK) = h/√(2mqV); an electric field changes λ, a magnetic field never does; electron diffraction shows the wave nature of matter." },
      { name: "Comparing wavelengths", description: "Same kinetic energy: λ ∝ 1/√m. Same voltage: λ ∝ 1/√(mq). Same speed: λ ∝ 1/m. The same wavelength means the same momentum, and a photon uses E = pc." },
    ],
    traps: [
      { name: "Brighter light", description: "More intensity sends more photons of the same energy. The current rises, but the stopping potential stays the same and the threshold does not fall." },
      { name: "Doubling the frequency", description: "K = hν − φ, so at 2ν the energy is 2K + φ, more than twice K. The stopping potential likewise more than doubles." },
      { name: "What the ratio holds fixed", description: "Same energy, same voltage and same speed give 1/√m, 1/√(mq) and 1/m. An alpha through the same voltage gains twice a proton's energy." },
      { name: "ω for ν", description: "A wave written as sin(ωt) gives the angular frequency; the photon energy is hω/2π. Using hω makes it 2π times too large." },
    ],
    relatedSlugs: ["atoms", "electromagnetic-waves", "nuclei"],
  },

  atoms: {
    slug: "atoms",
    trigger: "A hydrogen-like ion's orbit, energy level, spectral line or transition, or alpha scattering and the distance of closest approach.",
    story: [
      "Most questions rest on three results of Bohr's model: the radius goes as n²/Z, the speed as Z/n, and the energy as −13.6 Z²/n² eV. So many are ratios that the constants cancel and the working is short.",
      "The pages go from Rutherford's experiment and Bohr's postulates, to the orbits, to the spectral series, to transitions and X-rays. Rutherford's scattering and X-rays are asked only now and then; the orbits, the series and the transitions carry the chapter.",
      "Marks are lost on reading the question: the second excited state taken as n = 2, the series limit taken as the longest line, or a photon treated like an electron that can hand over part of its energy. Photon energies in eV come from Dual Nature, and closest approach is an energy balance from Electrostatics.",
    ],
    subSkills: [
      { name: "Rutherford scattering and Bohr's postulates", description: "Closest approach from K = k(2e)(Ze)/r₀; Bohr allows only orbits with L = nh/2π, and light comes out only in a jump between them." },
      { name: "Bohr orbits", description: "r ∝ n²/Z, v ∝ Z/n, E = −13.6 Z²/n² eV with K = −E; frequency, current and magnetic moment are built from r and v." },
      { name: "Spectral series and line ratios", description: "1/λ = RZ²(1/n_f² − 1/n_i²); each series ends on one lower level; the first member is the longest line and the limit the shortest; a ratio needs only the brackets." },
      { name: "Transitions, excitation and X-rays", description: "A photon carries the energy gap and is absorbed only if it matches one; a sample at level n gives n(n − 1)/2 lines; the X-ray cut-off is hc/eV and ignores the target." },
    ],
    traps: [
      { name: "Excited states are one behind n", description: "The first excited state is n = 2 and the second is n = 3. Reading the second excited state as n = 2 is wrong every time." },
      { name: "Series limit and first line", description: "The limit is the shortest wavelength of a series and the first member the longest. The Balmer limit is 4/R, not 1/R." },
      { name: "Photon or electron", description: "A photon is absorbed only if its energy matches a gap. An electron can hand over part of its energy and keep the rest." },
      { name: "Z or Z²", description: "The radius has Z to the first power and the energy has Z². The same jump in He⁺ releases four times the energy it does in hydrogen." },
    ],
    relatedSlugs: ["dual-nature", "nuclei", "electrostatics"],
  },

  nuclei: {
    slug: "nuclei",
    trigger: "A nuclear radius, a mass defect or binding energy, the energy a reaction releases, or a decay and its half-life.",
    story: [
      "The questions the recent papers set are on three ideas: the nuclear radius, binding energy from a mass defect, and the energy a reaction releases. Every nucleus has the same density, and a reaction releases the gain in binding energy.",
      "Radioactivity was cut from the syllabus, and it has almost stopped appearing: decay modes, half-lives and decay constants are rare in the recent papers. Those pages serve the older papers more than the next one.",
      "Marks are lost on bookkeeping: a binding energy per nucleon not multiplied by A, the alpha's recoil share forgotten, or the fraction decayed read as the fraction left. Energies in MeV and mass-energy conversion are shared with Atoms and Dual Nature.",
    ],
    subSkills: [
      { name: "Nuclear size and binding energy", description: "R = R₀A^(1/3), so every nucleus has the same density; the mass defect times c² is the binding energy, and stability is judged per nucleon, which peaks near iron." },
      { name: "Q-value, fission and fusion", description: "Q is the gain in total binding energy, or the mass lost times c²; in alpha decay the alpha takes Q(A − 4)/A; a sample's energy is Q times the number of reactions." },
      { name: "Decay modes and half-lives", description: "Alpha takes 4 from A and 2 from Z, beta-minus adds 1 to Z, beta-plus takes 1 away; each half-life halves what is left." },
      { name: "Decay constant and activity", description: "N = N₀e^(−λt), half-life ln 2/λ, mean life 1/λ, activity λN; two decay routes add their λ's." },
    ],
    traps: [
      { name: "Per nucleon not multiplied by A", description: "Binding energies per nucleon cannot be subtracted directly. Multiply each by its own A, then subtract the totals." },
      { name: "The sign of Q", description: "With binding energies Q = after − before; with masses Q = before − after. Mixing the two flips the sign." },
      { name: "The alpha's share", description: "Momentum is shared equally and oppositely, so the alpha gets Q(A − 4)/A, not all of Q." },
      { name: "Decayed read as left", description: "If 15/16 has decayed, 1/16 is left and four half-lives have passed. Taking the decayed fraction as the fraction left gives a time far too short." },
    ],
    relatedSlugs: ["atoms", "dual-nature"],
  },

  "semiconductor-electronics": {
    slug: "semiconductor-electronics",
    trigger: "A diode or Zener circuit, a doped semiconductor or p-n junction, or a network of logic gates with a truth table or waveform.",
    story: [
      "This is a core chapter, set about once a paper. Logic gates are the largest group, and almost all of them are a drawn circuit: write each gate's output, simplify, then read off a gate, a truth table or a waveform.",
      "Diodes, from the junction itself to the Zener regulator, take much of the rest, and they hold most of the numerical answers. Transistors have not been asked in the recent papers; that page is kept for revising the older ones.",
      "Marks are lost on a direction: a battery read the wrong way round, a diode's bias judged by the sign of a voltage instead of which side is higher, or a Zener assumed to break down without checking. Once each diode is a wire or a break, the network is an ordinary circuit from Current Electricity.",
    ],
    subSkills: [
      { name: "Semiconductors and the p-n junction", description: "Doping sets the majority carrier while n_e n_h = n_i² stays fixed; a junction is forward biased when its p-side is at the higher potential; LEDs, photodiodes and solar cells each use their own bias." },
      { name: "Diode circuits and rectifiers", description: "Decide each diode's bias, then treat it as a wire, a fixed drop or a break; a full-wave rectifier gives two pulses per input cycle." },
      { name: "Zener regulator", description: "Check breakdown first; then the load sits at V_Z, the series resistor takes the rest of the supply, and the Zener carries the series current less the load current." },
      { name: "Transistors and the CE amplifier", description: "I_E = I_B + I_C, α just under 1 and β large; voltage gain β R_L/r_i, and power gain β times that." },
      { name: "Reducing a gate network", description: "NAND and NOR are universal and a tied-input NAND is a NOT; use De Morgan's laws to reduce a network to one gate, or a constant." },
      { name: "Truth tables, waveforms and inputs", description: "Evaluate the reduced expression row by row, interval by interval, or backwards for the inputs that give a required output." },
    ],
    traps: [
      { name: "Bias judged by sign", description: "p at −4 V and n at −9 V is forward biased. Compare the two potentials, not their signs." },
      { name: "The battery the wrong way round", description: "The long plate is positive. Reversing it flips every diode at once, and the flipped answer is usually an option." },
      { name: "Breakdown assumed", description: "If the divider voltage across the load is below V_Z, the Zener is off and the load voltage is not V_Z. Check before using it." },
      { name: "Tied inputs and bubbles", description: "A NAND with joined inputs is a NOT, and a bubble on an input inverts it first. Missing either makes the whole chain come out wrong." },
    ],
    relatedSlugs: ["current-electricity", "dual-nature"],
  },
};
