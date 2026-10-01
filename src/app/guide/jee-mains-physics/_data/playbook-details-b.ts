/**
 * Deep-dives for nine /guide/jee-mains-physics playbooks: Thermal Properties of Matter,
 * Thermodynamics, Kinetic Theory, Oscillations, Waves, Electrostatics, Current Electricity, Moving
 * Charges and Magnetism, and Magnetism and Matter. Prose carries no bank figures — the pages print
 * counts and rates from generated data.
 */
import type { PlaybookDetail } from "./types";

export const PLAYBOOK_DETAILS_B: Record<string, PlaybookDetail> = {
  "thermal-properties-of-matter": {
    slug: "thermal-properties-of-matter",
    trigger:
      "A reading on another temperature scale, a length or volume that grows when heated, hot and cold bodies mixed, heat flowing through a rod, or a body cooling or radiating.",
    story: [
      "Thermal Properties of Matter sits in the long tail, and almost every question is a line or two of arithmetic once the right relation is chosen. The relations are few: a reading is a fraction of the way between two fixed points, a length grows by LαΔT, heat lost equals heat gained, and a heat current behaves like an electric current.",
      "Expansion and calorimetry carry most of the work. In expansion, choose α, 2α or 3α by what grows. In a mixture with ice, test first whether all the ice can melt; if the water's heat falls short, the final temperature is 0 °C. Conduction is circuit work: thermal resistances L/(KA) add in series and conductances add in parallel, the same rules as Current Electricity.",
      "Marks are lost on small slips, not hard physics: α used for an area, conductivities added for rods in series, and a Celsius temperature put into Stefan's law. Many answers are numbers rather than options, so the units have to be right at the end.",
    ],
    subSkills: [
      { name: "Temperature scales and expansion", description: "Convert a reading by its fraction between the ice and steam points; ΔL = LαΔT, with 2α for an area and 3α for a volume; a clamped rod carries a stress YαΔT instead of growing." },
      { name: "Calorimetry and latent heat", description: "Q = msΔT changes a temperature, Q = mL changes a phase at a fixed temperature; in a mixture, heat lost equals heat gained once you know how much ice melts." },
      { name: "Heat conduction", description: "H = KAΔT/L; each slab is a thermal resistance L/(KA), resistances add in series, conductances add in parallel, and the heat into a junction equals the heat out." },
      { name: "Radiation and cooling", description: "P = eσAT⁴ with T in kelvin, λₘT = b for the peak of the spectrum, and for a small excess a cooling rate proportional to the excess over the surroundings." },
    ],
    traps: [
      { name: "α for an area or a volume", description: "An area grows by 2αΔT and a volume by 3αΔT. Using α alone gives an answer two or three times too small, and that value is usually an option." },
      { name: "Assuming all the ice melts", description: "Solving the balance without the test can give a final temperature below 0 °C with water present. Compare the heats first; if the water's is smaller, the answer is 0 °C." },
      { name: "Conductivities added in series", description: "In series it is the resistances L/(KA) that add. Adding or averaging the conductivities gives a heat current that is too large." },
      { name: "Celsius in Stefan's law", description: "P = eσAT⁴ needs kelvin. A body at 127 °C against one at 27 °C radiates (400/300)⁴ times as much, not (127/27)⁴." },
    ],
    relatedSlugs: ["thermodynamics", "kinetic-theory", "current-electricity"],
  },

  thermodynamics: {
    slug: "thermodynamics",
    trigger:
      "A gas taking in heat or doing work: a named process, a path on a P–V graph, a cycle, an adiabatic change, or an engine between two temperatures.",
    story: [
      "Thermodynamics is a core chapter, set about once a paper. One law carries it: the heat given to a gas goes into its internal energy and into the work it does, Q = ΔU + W, with work done by the gas counted positive. The process decides how that heat splits, and adiabatic processes alone take a large share of the questions.",
      "Many questions come with a P–V graph. Work is the area under the path, and its sign comes from the direction: a leg towards smaller volume is negative work, and a clockwise cycle does positive net work. Read each axis on its own scale before using πab for an elliptical cycle.",
      "ΔU = nCvΔT in every process, so the usual slips are Cp used for ΔU, γ − 1 replaced by γ, and a Celsius temperature put into an efficiency. The degrees of freedom behind Cv come from Kinetic Theory, and the Carnot page closes the chapter with T₂/T₁ in kelvin.",
    ],
    subSkills: [
      { name: "First law", description: "ΔQ = ΔU + W with work by the gas positive; for a liquid that boils, ΔU is the latent heat minus PΔV." },
      { name: "Internal energy and heat capacities", description: "ΔU = nCvΔT in every process; Cv = fR/2 and Cp = Cv + R; for PVˣ = constant, C = Cv + R/(1 − x), which can be negative." },
      { name: "Processes and P–V work", description: "Each standard process zeroes one term of the first law; work is the signed area under the path; for PVˣ = constant, W = nR(T₁ − T₂)/(x − 1), with nRT ln(V₂/V₁) when x = 1." },
      { name: "Adiabatic processes", description: "PV^γ, TV^(γ−1) and P^(1−γ)T^γ stay constant; W = −ΔU = nR(T₁ − T₂)/(γ − 1); the adiabat is steeper than the isotherm by the factor γ." },
      { name: "Cyclic processes", description: "ΔU = 0 round a cycle, so net heat equals net work, the enclosed area, positive when clockwise; work each leg after finding its corner pressures." },
      { name: "Engines and refrigerators", description: "η = W/Q₁ and, for Carnot, 1 − T₂/T₁ in kelvin; a refrigerator's COP = Q₂/W = T₂/(T₁ − T₂); engines in series give η₁ + η₂ − η₁η₂." },
    ],
    traps: [
      { name: "Cp used for ΔU", description: "The heat at constant pressure is nCpΔT, but the rise in internal energy is still nCvΔT." },
      { name: "An isothermal answer to a sudden change", description: "A sudden change leaves no time for heat to flow, so it is adiabatic. The PV = constant answer is always among the options." },
      { name: "Dividing by γ", description: "Adiabatic work is nR(T₁ − T₂)/(γ − 1). Dividing by γ gives a much smaller value that is often an option." },
      { name: "Celsius in an efficiency", description: "Between 327 °C and 27 °C, η = 1 − 300/600, not 1 − 27/327. Only a temperature difference may stay in °C." },
    ],
    relatedSlugs: ["kinetic-theory", "thermal-properties-of-matter"],
  },

  "kinetic-theory": {
    slug: "kinetic-theory",
    trigger:
      "The molecules of a gas: pressure or kinetic energy from a temperature, an rms or average speed, a mean free path, degrees of freedom, or γ of a mixture.",
    story: [
      "Kinetic Theory sits in the long tail and has shrunk on the recent papers. Most questions are short: change every temperature to kelvin, then apply one proportion, such as pressure with temperature, kinetic energy with temperature, or the rms speed with √(T/M).",
      "The second half counts degrees of freedom. Each one holds ½kT, so f fixes Cv = fR/2, Cp = Cv + R and γ = 1 + 2/f, and a vibrational mode adds two, not one. The longer questions track moles through joined vessels, or replace a mixture by one equivalent gas whose f or Cv is a mole-weighted average, with γ found last.",
      "The chapter feeds Thermodynamics directly: the same Cv gives ΔU there, and the same γ sets the adiabat.",
    ],
    subSkills: [
      { name: "Ideal gas laws", description: "PV = nRT = NkT with T in kelvin; P₁V₁/T₁ = P₂V₂/T₂ for a fixed amount; when vessels are joined, add the moles, not the pressures." },
      { name: "Pressure and kinetic energy", description: "P = ⅓ρv²rms, so PV is two-thirds of the translational energy; the mean energy per molecule, (3/2)kT, depends on T alone." },
      { name: "Molecular speeds and mean free path", description: "Speeds go as √(T/M): rms √(3RT/M), average √(8RT/πM), most probable √(2RT/M); the mean free path is 1/(√2 π d² n)." },
      { name: "Degrees of freedom", description: "Count translations, rotations by the molecule's shape, and two for each vibrational mode; then Cv = fR/2, Cp = Cv + R and γ = 1 + 2/f." },
      { name: "Internal energy and mixtures", description: "U = n(f/2)RT; a mixture's f and Cv are mole-weighted averages, and gases mixed at different temperatures share their total energy, weighted by nf." },
    ],
    traps: [
      { name: "Celsius in a ratio", description: "Going from 27 °C to 54 °C is 300 K to 327 K, not a doubling. Convert to kelvin before every ratio." },
      { name: "A vibrational mode counted once", description: "A vibration stores kinetic and potential energy, so one mode adds 2 to f. Counting it as 1 gives the wrong Cv and γ." },
      { name: "Averaging γ directly", description: "For a mixture, average f or Cv by moles first, then find γ. The mean of the two γ values is close to the right answer but not equal to it." },
      { name: "Rms speed for average speed", description: "The average speed is √(8RT/πM) and the rms speed √(3RT/M). They are close, and both appear among the options." },
    ],
    relatedSlugs: ["thermodynamics", "thermal-properties-of-matter"],
  },

  oscillations: {
    slug: "oscillations",
    trigger:
      "A body moving to and fro about a mean position: an SHM equation, the period of a spring or pendulum, the energy at a displacement, or a new amplitude after a push.",
    story: [
      "Oscillations sits in the long tail and has shrunk on the recent papers, but many of its questions ask for a number. Nearly all of it is simple harmonic motion, and almost every question comes down to two numbers, ω and the amplitude, from which a phase, a time, a speed or an energy follows in a line or two.",
      "The harder step is finding ω for a new set-up: a cut spring, a block between two springs, two free masses, a physical pendulum, a lift, a height above the earth. Write the restoring force per unit displacement, divide by the mass, and the rest is the standard SHM page.",
      "Marks are lost on a factor: springs read as series when they act in parallel, half the amplitude taken as half the time, or a height R taken as a distance R from the centre. The effective-g ideas come from Gravitation, the physical pendulum from Rotational Motion, and the same sine equation returns in Waves.",
    ],
    subSkills: [
      { name: "The SHM equation", description: "Read the phase in x = A sin(ωt + φ), choose the initial phase by the starting direction, and use v = ω√(A² − x²) and a = −ω²x." },
      { name: "Timing and combining SHMs", description: "The time between two positions is the phase covered divided by ω; two SHMs of one frequency on a line add as vectors; two different frequencies never make SHM." },
      { name: "Springs and restoring forces", description: "ω² = force per unit displacement ÷ mass: a cut spring is stiffer, a block between walls is parallel, two free masses use the reduced mass, a physical pendulum uses I about the pivot." },
      { name: "Simple pendulum and effective g", description: "T = 2π√(L/g) whatever the bob's mass; a height, a planet, a lift or a liquid changes only the g in that formula." },
      { name: "Energy, amplitude changes and damping", description: "Total energy ½kA²; kinetic equals potential at A/√2; a mass added at the mean shares momentum and lowers the amplitude; damped energy decays twice as fast as amplitude." },
    ],
    traps: [
      { name: "A block between two walls read as series", description: "Springs on opposite sides of a block look like a chain, but both stretch by the same x and both push back, so k = k₁ + k₂." },
      { name: "Equal distances in equal times", description: "Mean to A/2 takes T/12, but A/2 to the extreme takes T/6, because the particle slows down near the extreme." },
      { name: "A height R read as a distance R", description: "At a height equal to the earth's radius the distance from the centre is 2R, so g falls to a quarter and the period doubles." },
      { name: "Equal energies at half the amplitude", description: "At A/2 the potential energy is only a quarter of the total. Kinetic and potential energy are equal at A/√2." },
    ],
    relatedSlugs: ["waves", "gravitation", "rotational-motion"],
  },

  waves: {
    slug: "waves",
    trigger:
      "A wave equation in x and t, a string or pipe at resonance, the speed of sound or of a wave on a string, beats, or a moving source or listener.",
    story: [
      "Waves sits in the long tail, and many of its questions ask for a number. Most are short: read ω and k off an equation, pick the right harmonic formula, or write one Doppler ratio, and the answer follows in two or three lines.",
      "The work is in the bookkeeping. Expand any common factor before reading ω and k, and keep k in m⁻¹ when the speed is asked in m/s. On strings and pipes, keep harmonics and overtones apart: a closed pipe has only odd harmonics, so its first overtone is the third harmonic. Speeds need T in kelvin and μ in kilograms per metre.",
      "The Doppler page rewards a rule over a memorised sign pattern: motion towards raises the frequency, and an echo from a wall is shifted twice. The sine equation is the one from Oscillations, and superposition returns in Wave Optics.",
    ],
    subSkills: [
      { name: "The wave equation", description: "In y = A sin(ωt − kx), f = ω/2π, λ = 2π/k and v = ω/k; same signs on t and x mean travel along −x; the largest particle speed is Aω." },
      { name: "Wave speed", description: "√(T/μ) on a string, √(Y/ρ) in a rod, √(γRT/M) in a gas; at a fixed temperature, pressure alone does not change the speed of sound." },
      { name: "Superposition and strings", description: "Resultant amplitude by the cosine rule; a string fixed at both ends has every harmonic nv/2L, and its frequency goes as √T." },
      { name: "Organ pipes and the resonance tube", description: "Open pipe nv/2L, closed pipe only (2n − 1)v/4L; the end correction is 0.3d, and v = 2f(l₂ − l₁) needs no end correction." },
      { name: "Beats and the Doppler effect", description: "Beat frequency |f₁ − f₂|; heard frequency f(v ± vₒ)/(v ∓ vₛ), with each sign set so that approach raises it; an echo is shifted twice." },
    ],
    traps: [
      { name: "k left in cm⁻¹", description: "When x is in cm, ω/k comes out in cm/s, a hundred times larger than the value in m/s. Convert k to m⁻¹ first." },
      { name: "Overtone read as harmonic", description: "The first overtone of a closed pipe is the third harmonic, because the second harmonic does not exist there." },
      { name: "Beats in a time", description: "Ten beats in two seconds is a beat frequency of five hertz, not ten. Divide by the time before using the difference." },
      { name: "An echo shifted once", description: "A driver moving towards a wall hears the echo at f(v + u)/(v − u). Applying the formula once, for the source only, misses the second shift." },
    ],
    relatedSlugs: ["oscillations", "wave-optics"],
  },

  electrostatics: {
    slug: "electrostatics",
    trigger:
      "Charges at rest: a force, field or potential from point charges, rods, rings or sheets, flux through a surface, a dipole in a field, or capacitors with slabs and batteries.",
    story: [
      "Electrostatics is the largest chapter on the recent papers, and many of its questions ask for a number. Capacitors are its biggest single part: reducing networks, placing dielectric slabs and sharing charge between two capacitors. The rest moves from force to field, flux and potential.",
      "Most field and potential questions are solved with one idea used carefully: add the effect of each charge, or let a symmetry cancel what it can. Fields add as vectors, potentials as signed numbers. Gauss's law gives flux by counting the enclosed charge and, for symmetric charge, the field itself.",
      "In capacitor questions, decide series or parallel by the nodes, not by the drawing, and decide what stays fixed, V with the battery connected or Q once it is removed, before any energy step. The capacitor circuits lead into Current Electricity, and the dipole and orbit pages return in Moving Charges and Magnetism.",
    ],
    subSkills: [
      { name: "Coulomb's law and equilibrium", description: "F = kq₁q₂/r² added as vectors; charge shared by contact, signs first; hanging charged balls with tan θ = F/mg." },
      { name: "Electric field", description: "Add kq/r² as vectors and find null points; arcs and rings after symmetry cancels; a single sheet gives σ/2ε₀ at any distance." },
      { name: "Flux and Gauss's law", description: "Flux = E·A through each face; the net flux through a closed surface is q_enc/ε₀; fields of spheres, shells and cylinders by symmetry." },
      { name: "Potential and work", description: "Potentials add as signed numbers; joined spheres share potential, with charge in proportion to radius; E is minus the slope of V; work = q times the potential difference." },
      { name: "Dipoles", description: "p = q × separation, from − to +; the axial field is twice the equatorial; torque p × E and energy −p·E in a uniform field." },
      { name: "Charges moving in fields", description: "Acceleration qE/m gives a projectile path between plates; qE balances mg for a drop at rest; every orbit round a line charge has the same speed." },
      { name: "Capacitance and networks", description: "C = Q/V from geometry and medium alone; series and parallel decided by the nodes; in steady state a capacitor branch carries no current." },
      { name: "Dielectric slabs", description: "A slab across the gap acts in series, one side by side in parallel; a slab of thickness t shortens the gap by t(1 − 1/K), a metal sheet by t." },
      { name: "Energy and charge sharing", description: "½CV² with the battery connected, Q²/2C once it is removed; joined capacitors keep their charge, reach a common potential and lose energy." },
    ],
    traps: [
      { name: "Field sizes added as numbers", description: "Fields from charges in different places point in different directions. Draw each arrow, then add them as vectors." },
      { name: "Axial for equatorial", description: "At the same distance a dipole's axial field is twice its equatorial field, and the equatorial field points opposite to p." },
      { name: "Series for side by side", description: "Dielectrics that each span the whole gap share one voltage and add as capacitances. Adding reciprocals treats them as layers." },
      { name: "Energy before asking what is fixed", description: "Battery connected keeps V fixed; battery removed keeps Q fixed. Using the other form gives the change in the wrong direction." },
    ],
    relatedSlugs: ["current-electricity", "moving-charges-and-magnetism", "gravitation"],
  },

  "current-electricity": {
    slug: "current-electricity",
    trigger:
      "A circuit of resistors and cells, a wire stretched or heated, a meter bridge or potentiometer at balance, or a capacitor or inductor in a DC circuit.",
    story: [
      "Current Electricity is a core chapter, set about once a paper; it once carried cornerstone weight and has shrunk since. Many of its questions ask for a number and come with a circuit, so the first skill is redrawing: name the junctions, merge points joined by plain wire, and look for symmetry or a balanced bridge before writing any equation.",
      "After that, most questions need one of three tools: Ohm's law with the series and parallel rules, Kirchhoff's two laws, or a ratio at balance in a meter bridge or potentiometer. Power questions pick the form of I²R or V²/R that holds fixed what the circuit holds fixed.",
      "Marks are lost on small things: a cell's internal resistance left out, a stretched wire's resistance scaled by n instead of n², a real voltmeter read as if it were ideal, or current sent through a capacitor branch in steady state. The steady-state pages lean on Electrostatics, and the LR circuits meet Electromagnetic Induction.",
    ],
    subSkills: [
      { name: "Current and drift velocity", description: "I = dq/dt, with charge as the area under an I–t graph; I = neAv, the electrons drifting slowly against the field." },
      { name: "Resistance and temperature", description: "R = ρl/A with ρ set by the material and its temperature; a wire stretched to n times its length has n² times the resistance." },
      { name: "Equivalent resistance", description: "Series resistances add, parallel ones add as reciprocals; redraw a network by merging shorted points and using symmetry about where the current enters and leaves." },
      { name: "Kirchhoff's laws and the bridge", description: "Junction and loop laws, current and voltage dividers, and the balanced Wheatstone bridge with P/Q = R/S." },
      { name: "Cells", description: "I = ε/(R + r) and terminal voltage ε − Ir, or ε + Ir for a cell being charged; cells in parallel weight their emfs by 1/r." },
      { name: "Meters, meter bridge and potentiometer", description: "A real voltmeter reads low; the meter bridge and the potentiometer measure at balance, when the galvanometer carries no current." },
      { name: "Power and heating", description: "P = VI = I²R = V²/R; off its rated supply a device keeps its resistance, not its wattage; in series the lower rating glows more." },
      { name: "Capacitors and inductors in DC circuits", description: "Just after switching a capacitor acts as a wire and an inductor as a gap, long after the reverse; in between both change with time constant RC or L/R." },
    ],
    traps: [
      { name: "Internal resistance left out", description: "The current is ε/(R + r). Dividing ε by R alone forgets the cell's own resistance." },
      { name: "A stretched wire scaled by n", description: "Stretching to n times the length also thins the wire n times in area, so R grows as n². Scaling by n alone is the commonest wrong option." },
      { name: "A real voltmeter read as ideal", description: "A real voltmeter lowers the resistance it sits across, so it reads below the ideal divider value." },
      { name: "Current in a capacitor branch", description: "In steady state a capacitor branch carries no current, and a resistor in that branch drops no voltage. Remove the branch before finding the currents." },
    ],
    relatedSlugs: ["electrostatics", "moving-charges-and-magnetism", "electromagnetic-induction"],
  },

  "moving-charges-and-magnetism": {
    slug: "moving-charges-and-magnetism",
    trigger:
      "A current making a field at a point, a charge moving through B or through crossed E and B, a wire or coil in a field, or a galvanometer turned into a meter.",
    story: [
      "Moving Charges and Magnetism is a core chapter, set about once a paper. Its largest part finds the field a current makes; most of the rest finds the force a field puts on a moving charge or on a wire, and the last part turns the torque on a coil into a meter.",
      "Every field question is a sum of a few standard pieces: (μ₀I/4πd)(sin α₁ + sin α₂) for a straight piece, μ₀Iθ/4πR for an arc, μ₀NI/2R at the centre of a coil, μ₀nI inside a solenoid. Knowing these by heart saves the most time. Decide the direction of each piece, into or out of the page, before adding.",
      "Marks are lost on a direction or a factor: μ₀I/2πd used for a wire that ends at the point, an angle measured from the plane of a coil instead of its axis, an electron's force left with a proton's sign, or turns per centimetre never turned into turns per metre. The meter pages connect to Current Electricity, and the moment and torque of a coil return in Magnetism and Matter.",
    ],
    subSkills: [
      { name: "Straight wires and arcs", description: "(μ₀I/4πd)(sin α₁ + sin α₂) for a straight piece, μ₀I/2πd for a long wire, μ₀Iθ/4πR at the centre of an arc; radial pieces give nothing." },
      { name: "Circular loops and coils", description: "μ₀NI/2R at the centre; on the axis the field falls as R³/(R² + x²)^(3/2), so most questions are a ratio to the centre value." },
      { name: "Ampère's law", description: "The line integral of B equals μ₀ times the enclosed current: B grows with r inside a solid wire, is zero outside a coaxial cable, and is μ₀nI inside a solenoid." },
      { name: "Lorentz force and crossed fields", description: "F = q(E + v × B); the magnetic part never changes the speed; a velocity selector passes v = E/B whatever the charge or mass." },
      { name: "Circular and helical paths", description: "r = mv/qB and T = 2πm/qB, the same at every speed; the pitch uses the part of v along B; a cyclotron particle gains energy twice a turn." },
      { name: "Forces and torques on wires", description: "F = IL × B, a bent wire acting like its chord; parallel currents μ₀I₁I₂/2πd per metre, like currents attracting; torque NIAB sin θ with θ from the axis." },
      { name: "Galvanometer and meters", description: "Deflection proportional to current; a shunt S = IgG/(I − Ig) in parallel makes an ammeter; a series resistance V/Ig − G makes a voltmeter." },
    ],
    traps: [
      { name: "The long-wire value for a wire that ends", description: "At a point level with the end of a semi-infinite wire the field is μ₀I/4πd, half the long-wire value μ₀I/2πd." },
      { name: "Angle from the plane", description: "In τ = NIAB sin θ, θ is between the coil's normal and B. When the angle with the plane is given, use its complement." },
      { name: "An electron with a proton's sign", description: "For an electron the force is along −(v × B). Stopping at the direction of v × B reverses every electron answer." },
      { name: "Turns per centimetre", description: "In B = μ₀nI, n is turns per metre. Leaving it per centimetre makes B a hundred times too small." },
    ],
    relatedSlugs: ["current-electricity", "magnetism-and-matter", "electromagnetic-induction"],
  },

  "magnetism-and-matter": {
    slug: "magnetism-and-matter",
    trigger:
      "A bar magnet or coil turned in a uniform field, the earth's field and the angle of dip, or a statement about a magnetic material, its susceptibility or its hysteresis loop.",
    story: [
      "Magnetism and Matter is a small chapter in the long tail. About half of it is magnetic materials, and those are mostly statements to judge, each settled by one exact fact about susceptibility, temperature or the hysteresis loop.",
      "The largest group of calculations turns a magnet or a coil in a uniform field and needs only the torque MB sin θ and the energy −MB cos θ, read with the right angle. The earth's field and the angle of dip have not appeared on the recent papers, so they come last in the order of study.",
      "Marks are lost on the sign of the energy, on reading a coil's plane as its moment, and on calling a strongly attracted material paramagnetic. The dipole page is the magnetic twin of the electric dipole in Electrostatics, and a coil's moment NIA comes from Moving Charges and Magnetism.",
    ],
    subSkills: [
      { name: "Bar magnets and dipoles", description: "A moment M whose field falls as 1/r³, the axial value twice the equatorial; in a uniform field a torque MB sin θ and an energy −MB cos θ." },
      { name: "The earth's field", description: "Horizontal part B cos δ and vertical part B sin δ; the horizontal part cancels a magnet's field at a neutral point and sets the period of a magnet swinging horizontally." },
      { name: "Magnetic materials and hysteresis", description: "M = χH and μᵣ = 1 + χ; the sign and size of χ sort diamagnets, paramagnets and ferromagnets; soft iron for an electromagnet has high permeability and low retentivity and coercivity." },
    ],
    traps: [
      { name: "A positive energy", description: "U = −MB cos θ is negative at angles below 90°. An option with the right size and a positive sign is a deliberate trap." },
      { name: "A coil's plane read as its moment", description: "A coil's moment is along the normal to its plane. A plane perpendicular to B puts the moment along B, the stable position with no torque." },
      { name: "Strong attraction called paramagnetic", description: "Paramagnets are attracted only weakly; strong attraction marks a ferromagnet. A paramagnet moves towards a stronger field, a diamagnet away from it." },
      { name: "Retentivity and coercivity swapped", description: "Retentivity is a value of B, read where the loop cuts the B-axis. Coercivity is a value of H, read where it cuts the H-axis." },
    ],
    relatedSlugs: ["moving-charges-and-magnetism", "electrostatics"],
  },
};
