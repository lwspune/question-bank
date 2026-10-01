/**
 * Content for /guide/jee-mains-physics/traps — the mistakes that cost marks on JEE Mains Physics,
 * bucketed by the strategy tier whose marks they cost.
 *
 * WHAT MAKES THIS LIST DIFFERENT FROM THE MATHS ONE. Physics traps are rarely about algebra. They are
 * a unit left unconverted, a vector added as a number, a sign convention dropped, or a formula used
 * outside the condition it was derived under. The same shapes come back in chapter after chapter, so
 * each entry below names every playbook it recurs in. The paper-wide entries are the same as Maths in
 * substance: +4 and −1 on both formats, one three-hour clock shared with Maths and Chemistry.
 *
 * `affects` holds playbook slugs. EMPTY means the trap is paper-wide. Prose carries no bank figures.
 */

import type { TrapShape } from "./types";

export const TRAP_SHAPES: TrapShape[] = [
  // -------- Paper-wide --------
  {
    id: "blank-mcq",
    title: "The blank MCQ — expected marks left on the table",
    bucket: "paper",
    affects: [],
    mechanic:
      "A right answer earns 4 and a wrong one costs 1. A blind pick among four options is worth 1/4 × 4 − 3/4 × 1 = +0.25 on average, and with one option ruled out it is worth about +0.67.",
    fix:
      "Answer every MCQ before time runs out. Rule out what you can on sight — wrong dimensions, a value that grows when it should shrink, a limiting case that fails — and pick from what is left.",
  },
  {
    id: "numeric-guess",
    title: "The guessed numeric answer — close to a sure −1",
    bucket: "paper",
    affects: [],
    mechanic:
      "A numeric answer has no options to pick from, so a guess is almost never right. It still costs 1 mark when wrong, so its expected value is close to −1.",
    fix:
      "Type a numeric answer only when you have worked it out. If you have not, leave it blank. The MCQ habit does not carry over.",
  },
  {
    id: "numeric-entry",
    title: "The right physics, the wrong number typed",
    bucket: "paper",
    affects: [],
    mechanic:
      "Numeric stems often ask for x in a stated form, such as x × 10⁻² or √x, or for the change rather than the new value. Typing the full quantity, the new value or an unrounded figure scores −1, the same as a wrong method.",
    fix:
      "Before typing, reread the last line of the stem: what is x, in which unit, and is it the change or the final value. If your x is far from a whole number, recheck the last two steps for a slip.",
  },
  {
    id: "shared-clock",
    title: "The stuck Physics question on a shared clock",
    bucket: "paper",
    affects: [],
    mechanic:
      "Physics, Chemistry and Maths share one three-hour clock, and every question pays the same 4 marks. Ten minutes on one long circuit or optics setup can cost several quick marks elsewhere.",
    fix:
      "Work in two passes. Take what opens up quickly first and mark the rest. If a question has not opened up in about three minutes, mark it, move on, and come back after every subject has had its first pass.",
  },

  // -------- Cornerstone --------
  {
    id: "vector-added-as-number",
    title: "Vectors and phasors added as plain numbers",
    bucket: "cornerstone",
    affects: [
      "electrostatics",
      "motion-in-a-plane",
      "work-energy-and-power",
      "moving-charges-and-magnetism",
      "oscillations",
      "alternating-current",
      "wave-optics",
    ],
    mechanic:
      "Fields, forces, momenta, SHM amplitudes, a.c. voltages and coherent wave amplitudes all combine as arrows. Adding their sizes gives the largest possible value, and that value is usually among the options.",
    fix:
      "Draw the arrows and add by components, or use √(A² + B² + 2AB cos θ). In a series LCR circuit, V = √(V_R² + (V_L − V_C)²). Add sizes directly only when the arrows point the same way.",
  },
  {
    id: "diameter-as-radius",
    title: "A diameter put in as a radius",
    bucket: "cornerstone",
    affects: [
      "units-and-measurements",
      "rotational-motion",
      "gravitation",
      "mechanical-properties-of-solids",
      "mechanical-properties-of-fluids",
      "current-electricity",
      "moving-charges-and-magnetism",
      "waves",
    ],
    mechanic:
      "Wires, bores, discs and planets are often given by diameter. Using d where r belongs makes an area four times too big and an r³ term eight times too big, and those wrong values sit among the options.",
    fix:
      "Circle every diameter in the stem and halve it before it touches a formula. For areas use πd²/4 directly. Remember the end correction of a pipe is 0.3 times the diameter, not the radius.",
  },
  {
    id: "unconverted-units",
    title: "A unit left unconverted",
    bucket: "cornerstone",
    affects: [
      "units-and-measurements",
      "laws-of-motion",
      "rotational-motion",
      "mechanical-properties-of-fluids",
      "thermal-properties-of-matter",
      "thermodynamics",
      "kinetic-theory",
      "current-electricity",
      "electromagnetic-induction",
      "dual-nature",
      "atoms",
      "nuclei",
      "semiconductor-electronics",
    ],
    mechanic:
      "Stems mix km/h, rpm, grams, mm², gauss, poise, eV and degrees Celsius with SI constants. One skipped conversion moves the answer by a fixed factor, and the option built from that factor is waiting.",
    fix:
      "Convert everything to SI before substituting: km/h to m/s before squaring, rpm to rad/s, mm² as 10⁻⁶ m², eV to joules unless you use hc = 1240 eV nm, and Celsius to kelvin in any ratio, gas law or Stefan's law.",
  },
  {
    id: "errors-that-add",
    title: "Errors subtracted, or counted once when they count twice",
    bucket: "cornerstone",
    affects: ["units-and-measurements", "mechanical-properties-of-solids", "oscillations"],
    mechanic:
      "For Q = aᵐbⁿ/cᵖ the fractional errors add as mΔa/a + nΔb/b + pΔc/c, even for a quantity in the denominator. A distractor subtracts the denominator's error, or drops the power, so a diameter in Young's modulus or a period in g = 4π²L/T² is counted once.",
    fix:
      "Write the formula as a product of powers, then add every term with its power as a multiplier. Signs never cancel. For a sum or difference, add the absolute errors instead.",
  },
  {
    id: "optics-sign-convention",
    title: "A sign dropped in the mirror or lens formula",
    bucket: "cornerstone",
    affects: ["ray-optics"],
    mechanic:
      "The mirror formula is 1/v + 1/u = 1/f and the lens formula 1/v − 1/u = 1/f, with m = −v/u for a mirror and v/u for a lens. One dropped sign turns a virtual image real, an erect image inverted, or a concave mirror convex.",
    fix:
      "Fix the convention before any number goes in: distances from the pole or centre, positive along the incident light. A real object has u negative; a virtual object has u positive. Check the result's nature against a quick ray sketch.",
  },
  {
    id: "angle-from-wrong-line",
    title: "The angle measured from the wrong line",
    bucket: "cornerstone",
    affects: [
      "electrostatics",
      "electromagnetic-induction",
      "moving-charges-and-magnetism",
      "magnetism-and-matter",
      "ray-optics",
      "motion-in-a-plane",
      "laws-of-motion",
    ],
    mechanic:
      "Flux, torque on a coil and refraction all use the angle with the normal, while stems often give the angle with the plane or surface. Using that angle swaps sine and cosine, and the swapped value is an option.",
    fix:
      "Before writing cos θ or sin θ, name the line θ is measured from: the normal, the axis, the vertical or the magnetic meridian. If the stem gives the angle with the plane, use its complement.",
  },
  {
    id: "forgotten-half",
    title: "The missing ½ — rolling bodies and stored energy",
    bucket: "cornerstone",
    affects: [
      "rotational-motion",
      "work-energy-and-power",
      "electrostatics",
      "electromagnetic-induction",
      "electromagnetic-waves",
      "mechanical-properties-of-solids",
    ],
    mechanic:
      "A rolling body has ½mv² + ½Iω², so it reaches the bottom of a slope slower than a sliding one and accelerates at less than g sin θ. Stored energy carries a ½ too: ½CV², ½LI², ½kx², and ½ × load × extension in a wire.",
    fix:
      "For any rolling body write KE = ½mv²(1 + k²/R²) first. For stored energy, remember the battery or load does twice the work that gets stored; the other half goes as heat or into the source.",
  },
  {
    id: "axis-of-inertia",
    title: "The moment of inertia about the wrong axis",
    bucket: "cornerstone",
    affects: ["rotational-motion", "oscillations"],
    mechanic:
      "The parallel-axis theorem starts from an axis through the centre of mass, and the perpendicular-axis theorem holds only for flat bodies. A physical pendulum needs I about its pivot, and a disc about a diameter has MR²/4, not MR²/2.",
    fix:
      "Name the axis first, then the body's standard I about its centre of mass, then shift it with Md². For a removed piece, subtract its I about the same axis, using the piece's own mass.",
  },
  {
    id: "energy-not-conserved",
    title: "Kinetic energy conserved where only momentum is",
    bucket: "cornerstone",
    affects: ["work-energy-and-power", "rotational-motion", "laws-of-motion", "electrostatics"],
    mechanic:
      "When bodies stick, a mass lands on a moving belt or a child walks on a turntable, momentum or angular momentum is conserved but kinetic energy is not. In the same way, joining two charged capacitors or spheres keeps the charge and loses energy.",
    fix:
      "Ask which quantity has no outside push or torque, and conserve only that. Work out the energy afterwards from the new state; the difference is the loss, never zero.",
  },
  {
    id: "what-is-held-fixed",
    title: "Not asking what stays fixed",
    bucket: "cornerstone",
    affects: ["electrostatics", "current-electricity", "thermodynamics", "kinetic-theory"],
    mechanic:
      "A capacitor still on the battery keeps V; one taken off keeps Q, so a dielectric raises the energy in one case and lowers it in the other. A bulb at fixed voltage follows V²/R, one carrying a fixed current follows I²R, and a gas heated in a sealed vessel uses Cv, not Cp.",
    fix:
      "Before using any formula, write down what the setup holds constant: V or Q, voltage or current, pressure or volume. Pick the formula that keeps that quantity in it.",
  },
  {
    id: "inside-outside",
    title: "The outside formula used inside",
    bucket: "cornerstone",
    affects: ["electrostatics", "gravitation", "moving-charges-and-magnetism"],
    mechanic:
      "Outside a sphere or wire the field falls with distance, but inside a solid one it grows linearly with r, and inside a hollow shell it is zero while the potential is not. Gravity below the surface falls as g(1 − d/R), not as an inverse square.",
    fix:
      "Mark where the point sits: inside the body, on it or outside. Inside, use only the charge, mass or current enclosed. Inside a shell, the potential equals its surface value.",
  },

  // -------- Core --------
  {
    id: "internal-resistance",
    title: "Internal resistance, meter resistance or diode drop left out",
    bucket: "core",
    affects: ["current-electricity", "moving-charges-and-magnetism", "semiconductor-electronics"],
    mechanic:
      "A real cell's terminal voltage is E − Ir on discharge and E + Ir on charge, and maximum power comes at R = r. A galvanometer has its own resistance, and a conducting diode adds its forward resistance and its cut-in drop.",
    fix:
      "Put r, the meter's resistance or the diode's drop into the loop before anything else. For a voltmeter range, subtract the galvanometer's own resistance from the total.",
  },
  {
    id: "ratio-inverted",
    title: "A ratio turned upside down",
    bucket: "core",
    affects: [
      "ray-optics",
      "wave-optics",
      "mechanical-properties-of-fluids",
      "alternating-current",
      "atoms",
      "dual-nature",
      "motion-in-a-straight-line",
    ],
    mechanic:
      "Telescope magnification is fₒ/fₑ, a transformer's currents go as the inverse of its turns, Rydberg's formula gives 1/λ, and a floating body sinks by the fraction ρ_body/ρ_liquid. The flipped ratio is usually one of the options.",
    fix:
      "Read the asked ratio aloud in the stem's order, A to B, and write it as A/B before working. Then check one limiting case: a longer focal length eyepiece must lower the magnification.",
  },
  {
    id: "work-sign",
    title: "Work with the wrong sign",
    bucket: "core",
    affects: ["thermodynamics", "work-energy-and-power", "electrostatics"],
    mechanic:
      "Work by the gas and work on the gas differ in sign, as do work by a field and work by an agent. A compression, a leg running to the left on a P–V graph, or an area below the axis gives negative work.",
    fix:
      "State whose work you are finding and in which direction the system moves. In thermodynamics write ΔU = Q − W with W done by the gas, and check that a compression gives W below zero.",
  },
  {
    id: "direction-reversed",
    title: "A direction reversed by a charge or a cross product",
    bucket: "core",
    affects: [
      "moving-charges-and-magnetism",
      "electromagnetic-induction",
      "electromagnetic-waves",
      "current-electricity",
      "dual-nature",
      "electrostatics",
    ],
    mechanic:
      "An electron feels a force opposite to E and drifts against the field. F = qv × B and the travel direction E × B depend on the order of the product, and Lenz's law opposes the change in flux, not the flux.",
    fix:
      "Put the sign of the charge in at the start. Apply the right-hand rule in the order the formula prints. For Lenz, ask first whether the flux is rising or falling.",
  },
  {
    id: "series-parallel",
    title: "Series and parallel swapped",
    bucket: "core",
    affects: [
      "current-electricity",
      "electrostatics",
      "oscillations",
      "thermal-properties-of-matter",
      "moving-charges-and-magnetism",
      "mechanical-properties-of-solids",
    ],
    mechanic:
      "Slabs stacked across a capacitor gap are in series; slabs side by side are in parallel. A block between two springs on opposite walls sees them in parallel, slabs in a heat path add thermal resistances, not conductivities, and a shunt sits in parallel.",
    fix:
      "Ask what the parts share. The same charge, current, heat flow or tension means series. The same voltage, stretch or temperature difference means parallel.",
  },
  {
    id: "rule-outside-condition",
    title: "A result used outside the condition it was derived for",
    bucket: "core",
    affects: [
      "ray-optics",
      "wave-optics",
      "gravitation",
      "oscillations",
      "atoms",
      "laws-of-motion",
      "motion-in-a-plane",
      "current-electricity",
      "moving-charges-and-magnetism",
    ],
    mechanic:
      "δ = (μ − 1)A is for thin prisms, y = nλD/d for a far screen and small angles, g(1 − 2h/R) for small heights, and T = 2π√(l/g) for small swings. Bohr's formulas hold for one-electron atoms, and maximum range at 45° only on level ground.",
    fix:
      "When a stem gives a large angle, a height comparable to R, a near screen or a slope, the shortcut does not apply. Go back to the full form: sin θ, GM/r², or the full projectile equations.",
  },

  // -------- Long tail --------
  {
    id: "wrong-power",
    title: "The wrong power in a scaling law",
    bucket: "longtail",
    affects: [
      "atoms",
      "nuclei",
      "gravitation",
      "mechanical-properties-of-fluids",
      "dual-nature",
      "kinetic-theory",
    ],
    mechanic:
      "Bohr radius goes as n²/Z and energy as Z²/n², nuclear radius as A^(1/3), orbital period as r^(3/2), terminal velocity as r², matter wavelength as 1/√K, and rms speed as √T. A distractor uses the first power, or squares where it should take a root.",
    fix:
      "Write each answer as a proportionality with its power before any number goes in, then take the ratio. Check one direction: a higher orbit must have a smaller speed and a longer period.",
  },
  {
    id: "peak-rms-omega",
    title: "Peak for rms, ω for f",
    bucket: "longtail",
    affects: [
      "alternating-current",
      "electromagnetic-waves",
      "electromagnetic-induction",
      "oscillations",
      "waves",
    ],
    mechanic:
      "Meters read rms, I_rms = I₀/√2, and average power is ½V₀I₀ cos φ. The coefficient of t in sin ωt is ω, not f, so f = ω/2π; resonance is ω₀ = 1/√(LC), and f₀ carries an extra 1/2π.",
    fix:
      "Label every a.c. value as peak or rms and every frequency as ω or f the moment you read it. Convert once, at the start, and keep the labels on through the working.",
  },
  {
    id: "velocity-for-acceleration",
    title: "Zero velocity read as zero acceleration",
    bucket: "longtail",
    affects: ["motion-in-a-straight-line", "motion-in-a-plane", "oscillations", "laws-of-motion"],
    mechanic:
      "At a turning point, the top of a throw and the extreme of an SHM the velocity is zero but the acceleration is not; at an SHM extreme it is the largest. A lift moving at steady velocity changes no reading, because only acceleration does.",
    fix:
      "Find acceleration from the force or the slope of v against t, never from the velocity's value. For distance, add the areas on both sides of a turning point as positive numbers.",
  },
];
