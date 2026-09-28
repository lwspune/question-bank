/**
 * Deep-dive content for the 6 CORNERSTONE + 6 QUICK-WIN playbooks of
 * /guide/mht-cet-physics/playbooks/{slug}.
 *
 * Every statistic comes from the bank measurement of 2026-09-28: 2,098 PUBLIC
 * PYQs across 42 papers, 2021-2025. Chapter figures (q, q/paper, %HARD) match
 * playbooks.ts; subtopic figures are the per-subtopic q and %HARD from the
 * same measurement. Physics statements are the textbook laws the notes teach.
 *
 * exampleQuestionIds is deliberately empty — inventing UUIDs ships dead links.
 */

import type { PlaybookDetail } from "./types";

export const CORE_PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  // CORNERSTONE

  electrostatics: {
    slug: "electrostatics",
    trigger:
      "Charges, a field or a potential, a capacitor with or without a slab between its plates, or a closed surface and the flux through it.",
    story: [
      "166 q at 3.83 a paper makes this the heaviest chapter on the Physics paper — close to four marks every sitting. It is 22% HARD, but the HARD is not everywhere. Gauss's Law and Electric Flux (20 q) and the Electric Dipole page (9 q) have never produced a HARD question between them. Dielectrics in Capacitors (23 q, 39%) and Coulomb's Law and Electric Field (27 q, 30%) carry most of it.",
      "The biggest page is Electric Potential and Potential Energy, 43 questions at 21%. Potential is a scalar, which is the whole reason it is easier than field: add the potentials of several charges as plain numbers, with their signs. Field questions need vector addition, and that is where the Coulomb page gets expensive.",
      "The capacitor half of the chapter (67 questions over three pages) turns on one question each time: what is held constant? A capacitor still connected to the battery keeps its V; one disconnected keeps its Q. Every change in C — a slab inserted, plates moved apart — then moves Q, V and the energy in opposite directions in the two cases.",
    ],
    subSkills: [
      {
        name: "Flux and Gauss's law",
        description:
          "Flux through a closed surface is q_enclosed/ε₀, whatever its shape; a charge at the centre of a cube sends a sixth of that through each face. 20 questions and no HARD one.",
      },
      {
        name: "Potential and potential energy",
        description:
          "V = kq/r, added as scalars with signs. Work to move a charge = q(V_B − V_A); on an equipotential surface it is zero.",
      },
      {
        name: "Capacitors in combination",
        description:
          "Parallel add; series add as reciprocals. C = ε₀A/d, and a dielectric of constant K multiplies it by K.",
      },
      {
        name: "Energy and the constant-Q / constant-V split",
        description:
          "U = ½CV² = Q²/2C. Battery connected: V fixed, so a slab raises Q and U. Battery removed: Q fixed, so a slab lowers V and U.",
      },
      {
        name: "Field of charges and the dipole",
        description:
          "E = kq/r² as a vector; on the dipole axis E = 2kp/r³, on the equator kp/r³, and torque = pE sin θ.",
      },
    ],
    traps: [
      {
        name: "Forgetting what is held constant",
        description:
          "Inserting a slab into a charged, ISOLATED capacitor lowers its energy; into one still on the battery, it raises it. Both answers are printed. Decide Q-fixed or V-fixed before writing a formula.",
      },
      {
        name: "Adding fields as scalars",
        description:
          "Fields from two charges add as vectors — at the midpoint of two equal like charges they cancel. Potentials add as numbers and do not. Mixing the two rules gives an option every time.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["current-electricity", "magnetic-fields-due-to-electric-current"],
  },

  "rotational-dynamics": {
    slug: "rotational-dynamics",
    trigger:
      "A moment of inertia, a body rolling down a slope, a spinning body changing shape, or anything moving in a circle — banked roads, conical pendulums, vertical circles.",
    story: [
      "128 q at 3.13 a paper, and rising: 2.89 a paper across 2023-24, then 3.38 across 2025. It is 21% HARD, and nearly half of that HARD sits on one page — Parallel and Perpendicular Axis Theorems, 25 questions at 48%.",
      "The cheap pages are the conservation laws. Angular Momentum, Torque, and Conservation is 22 questions at 5% HARD: a skater pulls in her arms, I falls, ω rises so that Iω stays fixed. Rotational Kinetic Energy and Rolling Motion is 24 questions at 8%, and one ratio — K²/R² — decides which body reaches the bottom of a slope first.",
      "Two circular-motion pages sit here too (34 questions together, 18% HARD each): the kinematics of angular speed and the dynamics of banking, the conical pendulum and the vertical circle. They share one idea with Laws of Motion — a free-body diagram with the centripetal force as the net inward force.",
    ],
    subSkills: [
      {
        name: "Conservation of angular momentum",
        description: "I₁ω₁ = I₂ω₂ when no external torque acts. Kinetic energy is NOT conserved when a body changes shape.",
      },
      {
        name: "Rolling without slipping",
        description:
          "Total KE = ½mv²(1 + K²/R²). Down a slope, the body with the smallest K²/R² arrives first: sphere (2/5), then disc (1/2), then ring (1).",
      },
      {
        name: "Moment of inertia and radius of gyration",
        description: "Learn the standard list — ring MR², disc ½MR², solid sphere ⅖MR², rod about centre ML²/12 — and I = MK².",
      },
      {
        name: "Axis theorems",
        description:
          "Parallel: I = I_cm + Md². Perpendicular (flat bodies only): I_z = I_x + I_y. The HARD questions stack two shifts or combine several bodies.",
      },
      {
        name: "Circular motion dynamics",
        description:
          "Banking: tan θ = v²/rg. Vertical circle: the minimum speed at the top is √(gr), at the bottom √(5gr).",
      },
    ],
    traps: [
      {
        name: "Using the perpendicular-axis theorem on a 3-D body",
        description:
          "I_z = I_x + I_y holds only for flat (planar) bodies. Applied to a sphere or a cylinder it gives a plausible, wrong option.",
      },
      {
        name: "Conserving energy when a body changes shape",
        description:
          "When a skater pulls in her arms, Iω is conserved and the kinetic energy RISES (she does work). Keeping KE constant instead gives a wrong ω.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["laws-of-motion", "motion-in-a-plane", "oscillations"],
  },

  "superposition-of-waves": {
    slug: "superposition-of-waves",
    trigger:
      "A wave equation y = A sin(ωt − kx), a string fixed at both ends, a pipe open or closed, two sources a few hertz apart, or a sonometer wire.",
    story: [
      "123 q at 3.00 a paper, 20% HARD. The cheapest page is reading a wave equation: Progressive Wave, Wave Equation, and Velocity is 34 questions at 9% HARD, and every one comes down to picking ω and k out of the equation and using v = ω/k.",
      "Stationary Waves and Vibrating Strings is the biggest page (36 q, 19%): nodes, antinodes, and the harmonics of a string, fₙ = nv/2L with v = √(T/μ). Pipes follow the same logic with one twist — a closed pipe has only odd harmonics.",
      "The expensive page is Beats and Sonometer, 22 questions at 41% HARD: a tuning fork and a wire or a pipe a few hertz apart, and the question is which way the beat frequency moves when the wire is loaded or the fork waxed. Sound repeats pipes, beats and Doppler almost exactly, so prepare the two chapters together.",
    ],
    subSkills: [
      {
        name: "Reading the wave equation",
        description: "y = A sin(ωt − kx): v = ω/k, λ = 2π/k, f = ω/2π. The sign between the terms gives the direction of travel.",
      },
      {
        name: "Strings",
        description: "fₙ = (n/2L)√(T/μ). All harmonics present; μ is mass per unit LENGTH, not the string's mass.",
      },
      {
        name: "Pipes and end correction",
        description: "Open: fₙ = nv/2L, all harmonics. Closed: fₙ = nv/4L, odd n only. End correction adds 0.6r per open end.",
      },
      {
        name: "Beats",
        description:
          "Beat frequency = |f₁ − f₂|. Loading a fork lowers its frequency; decide the sign from whether the beats rise or fall.",
      },
    ],
    traps: [
      {
        name: "Giving a closed pipe even harmonics",
        description:
          "A pipe closed at one end has only odd harmonics, so its first overtone is the THIRD harmonic. Treating it as the second gives an option.",
      },
      {
        name: "Using the string's mass for μ",
        description: "v = √(T/μ) needs mass per unit length. A 10 g string of 0.5 m has μ = 0.02 kg/m, not 0.01 kg.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["sound", "oscillations", "wave-optics"],
  },

  "mechanical-properties-of-fluids": {
    slug: "mechanical-properties-of-fluids",
    trigger:
      "A drop or a bubble, a liquid in a capillary tube, a sphere falling through oil, or water flowing through a pipe of changing width.",
    story: [
      "124 q at 2.96 a paper, 19% HARD — and two thirds of the chapter is surface tension. Surface Tension and Surface Energy (42 q, 29%) and Excess Pressure and Capillary Rise (38 q, 0%) together are 80 questions.",
      "The capillary page has never produced a HARD question. It is two formulas: h = 2T cos θ / rρg, and excess pressure 2T/r in a drop or 4T/r in a soap bubble (two surfaces). The surface-energy page is where the HARD sits — work to blow a bubble, energy released when drops merge — and the bubble's two surfaces are the usual slip.",
      "The flow pages are smaller: viscosity and terminal velocity (21 q, 19%) and Bernoulli with continuity (17 q, 18%). Pressure, Buoyancy, and Archimedes is 6 questions at 83% HARD and 0.13 a paper — last in the prep queue.",
    ],
    subSkills: [
      {
        name: "Capillary rise and excess pressure",
        description: "h = 2T cos θ / rρg, so h ∝ 1/r. Drop: ΔP = 2T/r. Soap bubble: ΔP = 4T/r.",
      },
      {
        name: "Surface energy",
        description:
          "Work = T × (increase in area). A soap bubble has two surfaces, so blowing one of radius r takes 8πr²T.",
      },
      {
        name: "Viscosity and terminal velocity",
        description: "Stokes: F = 6πηrv. Terminal velocity ∝ r², so a drop of double radius falls four times as fast.",
      },
      {
        name: "Continuity and Bernoulli",
        description: "A₁v₁ = A₂v₂; P + ½ρv² + ρgh is constant along a streamline. Torricelli: v = √(2gh).",
      },
    ],
    traps: [
      {
        name: "Counting one surface on a soap bubble",
        description: "A soap film has two surfaces. Excess pressure is 4T/r and surface energy doubles. A drop has one.",
      },
      {
        name: "Merging drops conserve volume, not area",
        description:
          "n drops merging into one: R = n^(1/3) r. The area falls, so energy is RELEASED. Conserving area instead gives a wrong radius.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["thermal-properties-of-matter", "kinetic-theory-of-gases"],
  },

  "wave-optics": {
    slug: "wave-optics",
    trigger:
      "Two slits and a fringe pattern, a single slit and its central maximum, two sources of stated intensities, or light through a polariser.",
    story: [
      "117 q at 2.96 a paper, 19% HARD — and the HARD is spread evenly. Young's Double Slit (39 q), Single Slit Diffraction and Resolving Power (34 q) and Interference Intensity (29 q) are each 21% HARD. This is the one cornerstone that does not cherry-pick: own all three pages, or plan to lose three marks a paper.",
      "Young's double slit is fringe width β = λD/d and what moves it: β ∝ λ and D, ∝ 1/d, and immersing the apparatus in a liquid divides it by μ. A thin film over one slit shifts the whole pattern by (μ − 1)tD/d without changing β.",
      "Intensity questions use I = I₁ + I₂ + 2√(I₁I₂) cos φ. With two equal sources the maximum is 4I and the minimum 0; with unequal ones, the ratio I_max/I_min = ((√I₁ + √I₂)/(√I₁ − √I₂))². Polarisation (10 q, 10% HARD) is the quick page: Malus I = I₀ cos²θ and Brewster tan θ = μ.",
    ],
    subSkills: [
      { name: "Fringe width and its levers", description: "β = λD/d. In a liquid, β becomes β/μ. A film shifts the pattern by (μ − 1)tD/d." },
      {
        name: "Interference intensity",
        description: "I = I₁ + I₂ + 2√(I₁I₂) cos φ. Amplitudes add, intensities do not; take square roots first.",
      },
      {
        name: "Single-slit diffraction",
        description: "Minima at a sin θ = nλ; the central maximum is twice as wide as the others, 2λD/a.",
      },
      { name: "Polarisation", description: "Malus: I = I₀ cos²θ; unpolarised light through one polariser loses half. Brewster: tan θ_B = μ." },
    ],
    traps: [
      {
        name: "Adding intensities instead of amplitudes",
        description: "Two sources of I and 4I give a maximum of 9I, not 5I: (√I + √4I)² = 9I.",
      },
      {
        name: "Mixing up the double-slit and single-slit conditions",
        description:
          "In Young's experiment d sin θ = nλ gives a BRIGHT fringe; in a single slit a sin θ = nλ gives a DARK one. Same equation, opposite meaning.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["superposition-of-waves", "ray-optics"],
  },

  oscillations: {
    slug: "oscillations",
    trigger:
      "x = A sin(ωt + φ), a mass on a spring or springs, a pendulum (in a lift, on the Moon, or with a changed length), or energy shared between KE and PE.",
    story: [
      "110 q at 2.63 a paper, 19% HARD. SHM Kinematics is the biggest page (44 q, 16%): v = ω√(A² − x²), a = −ω²x, and reading phase from the equation. SHM Energy is the cheapest (17 q, 12%): KE and PE trade places, and at x = A/√2 they are equal.",
      "The HARD sits on Spring-Mass and Other SHM Systems (25 q, 28%): springs in series and parallel, a spring cut into pieces, a block between two springs. Stiffness adds in parallel and adds as reciprocals in series — the opposite of resistors — and a spring cut to 1/n of its length is n times stiffer.",
      "The simple pendulum page (24 q, 21%) is T = 2π√(l/g) with an effective g: in a lift accelerating up, g + a; in free fall, zero, so the pendulum does not oscillate at all.",
    ],
    subSkills: [
      { name: "SHM kinematics", description: "v = ω√(A² − x²), a_max = ω²A, v_max = ωA. Read ω and φ straight from the equation." },
      { name: "SHM energy", description: "E = ½kA². KE = PE at x = A/√2. At x = A/2, KE is three quarters of E." },
      {
        name: "Spring combinations",
        description: "Parallel: k = k₁ + k₂. Series: 1/k = 1/k₁ + 1/k₂. T = 2π√(m/k). A spring's k ∝ 1/length.",
      },
      { name: "Pendulum with an effective g", description: "T = 2π√(l/g_eff). Lift up: g + a; down: g − a; free fall: T infinite." },
    ],
    traps: [
      {
        name: "Treating springs like resistors",
        description:
          "Springs in PARALLEL add their constants directly (stiffer); in series they add as reciprocals. It is the reverse of resistors.",
      },
      {
        name: "Halving the energy at half the amplitude",
        description:
          "PE ∝ x², so at x = A/2 the PE is a QUARTER of the total and the KE three quarters. Linear thinking gives half-and-half.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["superposition-of-waves", "rotational-dynamics", "laws-of-motion"],
  },

  // QUICK-WIN

  "semiconductor-devices": {
    slug: "semiconductor-devices",
    trigger:
      "A logic-gate circuit or truth table, a diode or rectifier arrangement, a transistor's α, β or gain, doping, or a Zener, LED or photodiode.",
    story: [
      "129 q at 3.08 a paper and 3% HARD — the best return on the whole Physics paper. Four of its six pages (band theory, p-n junction, special diodes, transistors) have never produced a HARD question. Most of it is recall and reading, not computation: only about a quarter of its answers are numbers, the lowest share of any Physics chapter.",
      "Logic Gates and Boolean Algebra is the biggest page, 36 questions at 8%. Many are a figure: two or three gates chained, and the question asks for the output or for which single gate the chain is equivalent to. Trace it: write the truth table for every input combination, gate by gate. A NAND with both inputs tied together is a NOT, so a NAND followed by that NOT is an AND.",
      "Transistors (29 q, 0% HARD) are α = I_C/I_E, β = I_C/I_B, β = α/(1 − α), and voltage gain = β × R_out/R_in. Diodes are forward bias (p to +) and reverse bias; a Zener works in reverse breakdown, a photodiode in reverse bias, an LED in forward bias.",
    ],
    subSkills: [
      { name: "Doping and band theory", description: "Pentavalent doping gives n-type (electron majority), trivalent gives p-type. Band gap separates conductor, semiconductor, insulator." },
      { name: "Junction and biasing", description: "Forward bias narrows the depletion layer; reverse bias widens it. Zener and photodiode run reverse-biased, LED forward." },
      {
        name: "Transistor relations",
        description: "I_E = I_B + I_C, β = α/(1 − α), voltage gain = β R_out/R_in, power gain = β × voltage gain.",
      },
      {
        name: "Gate circuits",
        description: "Write the truth table for the whole circuit, one gate at a time. Learn the NAND and NOR universal forms.",
      },
    ],
    traps: [
      {
        name: "Assuming a gate circuit instead of tracing it",
        description:
          "A chain of gates often looks like one familiar gate and is another — an OR and a NAND into an AND is XOR. Trace all four input rows; do not guess from the shapes.",
      },
      {
        name: "Biasing the special diodes wrongly",
        description: "A photodiode and a Zener work in REVERSE bias; an LED in forward. The forward-bias option is always printed for the photodiode.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["current-electricity", "ac-circuits"],
  },

  "ac-circuits": {
    slug: "ac-circuits",
    trigger:
      "An alternating voltage with an R, L or C, a series LCR circuit and its impedance, resonance, the power factor, or a transformer.",
    story: [
      "129 q at 3.00 a paper, 12% HARD. The cheap half is single elements: Reactance (23 q, 0% HARD) is X_L = ωL and X_C = 1/ωC, and Power in AC Circuit (25 q, 4%) is P = V_rms I_rms cos φ with cos φ = R/Z.",
      "Series LCR — Impedance, Phase and Phasors (33 q) and Resonance (32 q) are each about 15% HARD, and one right-angled triangle does both: Z = √(R² + (X_L − X_C)²), tan φ = (X_L − X_C)/R. At resonance X_L = X_C, so Z = R, the current is largest, and ω₀ = 1/√(LC).",
      "LC Oscillations, Transformer, and AC Generator is small (9 q) and 33% HARD. Transformer questions are the ratio V_s/V_p = N_s/N_p = I_p/I_s.",
    ],
    subSkills: [
      { name: "RMS and peak", description: "V_rms = V₀/√2 for a sine wave. Meters read RMS." },
      { name: "Reactance", description: "X_L = ωL rises with frequency; X_C = 1/ωC falls with it. Current leads in a capacitor, lags in an inductor." },
      { name: "Impedance triangle", description: "Z = √(R² + (X_L − X_C)²), cos φ = R/Z. Voltages across L and C are 180° apart." },
      { name: "Resonance and quality factor", description: "ω₀ = 1/√(LC), Z = R at resonance, Q = ω₀L/R." },
      { name: "Power", description: "P = V_rms I_rms cos φ. A pure L or C draws wattless current: cos φ = 0." },
    ],
    traps: [
      {
        name: "Adding voltages across R, L and C directly",
        description:
          "In a series LCR circuit the voltages are out of phase: V = √(V_R² + (V_L − V_C)²). Adding them as numbers gives a voltage larger than the source.",
      },
      {
        name: "Using peak values in the power formula",
        description: "P = V_rms I_rms cos φ. With peak values it is ½V₀I₀ cos φ — missing the half doubles the power.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["electromagnetic-induction", "semiconductor-devices"],
  },

  "electromagnetic-induction": {
    slug: "electromagnetic-induction",
    trigger:
      "A changing flux through a coil, a rod moving across a field, a rotating coil or rod, self or mutual inductance, or energy stored in an inductor.",
    story: [
      "119 q at 2.92 a paper, 9% HARD — the second-best return on the paper after Semiconductor Devices. Faraday's and Lenz's Laws (22 q) have never produced a HARD question: e = −N dΦ/dt, and the charge that flows is ΔΦ/R, independent of how fast the flux changed.",
      "The biggest page is Self-Inductance, Energy Stored, and LR Circuit (43 q, 9%): e = −L dI/dt, U = ½LI², and the LR growth curve I = I₀(1 − e^(−t/τ)) with τ = L/R. Mutual inductance and the transformer (35 q, 9%) is the same law between two coils.",
      "Motional EMF and Rotating Conductors (19 q, 21%) is the one expensive page: e = Blv for a sliding rod, e = ½Bωl² for a rod rotating about one end, and e₀ = NBAω for a rotating coil. Using the rotating-coil formula for a coil that only translates is the classic slip.",
    ],
    subSkills: [
      { name: "Faraday and Lenz", description: "e = −N dΦ/dt. Charge through the circuit = NΔΦ/R. The induced current opposes the change." },
      { name: "Self-inductance and energy", description: "e = −L dI/dt, U = ½LI², τ = L/R." },
      { name: "Mutual inductance", description: "e₂ = −M dI₁/dt. For coaxial solenoids M = μ₀n₁n₂Al." },
      { name: "Motional EMF", description: "Sliding rod e = Blv; rod rotating about an end e = ½Bωl²; coil e₀ = NBAω." },
    ],
    traps: [
      {
        name: "Using the rotating-coil formula for a moving coil",
        description: "e₀ = NBAω is for a coil ROTATING in a field. A coil pulled across a field edge has e = Blv. Pick by what the coil does.",
      },
      {
        name: "Letting the speed of change set the charge",
        description: "Charge through a circuit is ΔΦ/R, whatever the time taken. A faster change gives more current for a shorter time, the same charge.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["ac-circuits", "magnetic-fields-due-to-electric-current"],
  },

  "kinetic-theory-of-gases": {
    slug: "kinetic-theory-of-gases",
    trigger:
      "The RMS speed of gas molecules at a temperature, the average KE, degrees of freedom and specific heats, or an ideal-gas law.",
    story: [
      "80 q at 1.96 a paper, 14% HARD. Gas Laws and Ideal Gas Equation (19 q) has never produced a HARD question. Average KE, Equipartition, and Specific Heats (25 q, 12%) is degrees of freedom: 3 for a monatomic gas, 5 for a diatomic, giving γ = 5/3 and 7/5.",
      "Kinetic Theory — Pressure, RMS Speed, and Temperature is the biggest page (36 q, 22%), and nearly every question is one proportionality: v_rms = √(3RT/M), so v_rms ∝ √(T/M). Double the absolute temperature and the speed rises by √2; compare hydrogen with oxygen at the same temperature and the ratio is √16 = 4. These are ratio questions, answered by setting up the proportion rather than by computing either speed.",
    ],
    subSkills: [
      { name: "Ideal-gas law", description: "PV = nRT. Keep T in kelvin." },
      { name: "RMS, mean and most-probable speed", description: "v_rms = √(3RT/M), v_mean = √(8RT/πM), v_mp = √(2RT/M). All ∝ √(T/M)." },
      { name: "Equipartition and γ", description: "Energy ½kT per degree of freedom; C_v = (f/2)R, γ = 1 + 2/f." },
    ],
    traps: [
      {
        name: "Using Celsius in the ratio",
        description: "v_rms ∝ √T with T in KELVIN. Raising 27 °C to 927 °C is 300 K to 1200 K — the speed doubles, it does not rise √(927/27) times.",
      },
      {
        name: "Doubling the speed with the temperature",
        description: "v_rms ∝ √T, so doubling T multiplies the speed by √2. To double the speed, T must be quadrupled.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["thermodynamics", "thermal-properties-of-matter"],
  },

  "motion-in-a-plane": {
    slug: "motion-in-a-plane",
    trigger:
      "Equations of motion, free fall, a velocity-time graph, two bodies moving towards each other, a projectile, or uniform circular motion.",
    story: [
      "53 q at 1.33 a paper, 6% HARD — and rising: 1.00 a paper across 2023-24, 1.54 across 2025. Kinematics, relative motion and uniform circular motion (37 questions together) have never produced a HARD question.",
      "The kinematics page (19 q) is the three equations of motion and reading graphs: the slope of an x–t graph is velocity, the slope of v–t is acceleration, and the area under v–t is displacement. Relative motion is subtracting velocities. Circular motion is a = v²/r = ω²r.",
      "Projectiles are only 6 questions but the most likely to be HARD: range R = u² sin 2θ / g is the same for θ and 90° − θ, and the maximum height is u² sin²θ / 2g. Read whether an angle is measured above or below the horizontal before starting.",
    ],
    subSkills: [
      { name: "Equations of motion", description: "v = u + at, s = ut + ½at², v² = u² + 2as. Distance in the nth second = u + a(n − ½)." },
      { name: "Reading motion graphs", description: "Slope of x–t = velocity; slope of v–t = acceleration; area under v–t = displacement." },
      { name: "Relative motion", description: "Velocity of A relative to B = v_A − v_B. Two bodies meet when their relative displacement closes." },
      { name: "Projectiles and circular motion", description: "R = u² sin 2θ/g, H = u² sin²θ/2g, T = 2u sin θ/g. Centripetal a = v²/r." },
    ],
    traps: [
      {
        name: "Taking an angle as above the horizontal when it is below",
        description:
          "A ball thrown 'at 30° with the horizontal' from a tower can be thrown downward. The two cases land at very different distances, and both appear in the options.",
      },
      {
        name: "Distance vs displacement on a graph",
        description: "The area under a v–t graph gives displacement; areas below the axis subtract. For distance, add them as positives.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["laws-of-motion", "rotational-dynamics"],
  },

  "laws-of-motion": {
    slug: "laws-of-motion",
    trigger: "Blocks connected by strings, a lift accelerating, a force on a body for a short time, or two bodies colliding.",
    story: [
      "47 q at 1.04 a paper, 11% HARD. Impulse, Momentum, and Collisions is the cheap page (17 q, 6%): impulse = change of momentum, momentum is conserved in every collision, and kinetic energy only in an elastic one.",
      "Newton's Laws — Force, Tension, Lift, and Connected Blocks (25 q, 12%) is one method: draw each body alone, mark every force on it, write F = ma for each, and solve together. A person in a lift accelerating upward reads m(g + a) on a scale.",
      "The same method runs through Rotational Dynamics (banked roads, the vertical circle) and Oscillations (a block on springs), so the hours here pay in two cornerstone chapters.",
    ],
    subSkills: [
      { name: "Free-body diagrams", description: "One diagram per body, every force marked, F_net = ma for each; connected blocks share the acceleration." },
      { name: "Apparent weight", description: "In a lift: up-accelerating m(g + a), down-accelerating m(g − a), free fall zero." },
      {
        name: "Impulse and collisions",
        description: "Impulse = Δp = F Δt. Momentum conserved always; KE only if elastic. Coefficient of restitution e = separation speed / approach speed.",
      },
    ],
    traps: [
      {
        name: "Conserving kinetic energy in every collision",
        description: "Only elastic collisions conserve KE. Bodies that stick together lose some; momentum alone gives the common speed.",
      },
      {
        name: "Applying e to the height",
        description: "e scales the speed. A ball dropped from h rebounds to e²h, not eh.",
      },
    ],
    exampleQuestionIds: [],
    relatedSlugs: ["rotational-dynamics", "motion-in-a-plane"],
  },
};
