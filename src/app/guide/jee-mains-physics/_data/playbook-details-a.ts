/**
 * Deep-dives for nine /guide/jee-mains-physics playbooks: Units and Measurements, Motion in a
 * Straight Line, Motion in a Plane, Laws of Motion, Work, Energy and Power, Rotational Motion,
 * Gravitation, Mechanical Properties of Solids and Mechanical Properties of Fluids. Prose carries no
 * bank figures — the pages print counts and rates from the generated matrix.
 */
import type { PlaybookDetail } from "./types";

export const PLAYBOOK_DETAILS_A: Record<string, PlaybookDetail> = {
  "units-and-measurements": {
    slug: "units-and-measurements",
    trigger: "A quantity's dimensions, an unknown constant or power in an equation, a percentage error from measured values, or a vernier or screw-gauge reading.",
    story: [
      "Dimensions carry the larger part of the chapter. Build each quantity's dimensions from the equation that defines it, then use them to find a constant, find unknown powers or test an equation. Match lists pair quantities that differ by one power, such as viscosity and pressure or flux and inductance.",
      "The rest is errors and instruments, and the arithmetic there is short. The power rule gives the error of a product, absolute errors add in a sum or a difference, and a laboratory reading carries the least count of the instrument that took it.",
      "This is a cornerstone chapter, and it has grown in recent papers. Marks are lost on a sign or a factor: a zero error added instead of subtracted, a power left out of an error sum, or a timing error divided by one period instead of the whole run.",
    ],
    subSkills: [
      { name: "Significant figures and large distances", description: "Round a sum by decimal places and a product by significant figures; order the AU, the light year and the parsec, and use radians in d = θD." },
      { name: "Mechanical and thermal dimensions", description: "Write each quantity's dimensions in M, L, T and K from its defining equation, and tell apart pairs such as surface tension and surface energy." },
      { name: "Electric and magnetic dimensions", description: "Add current A as a base quantity; flux is ML²T⁻²A⁻¹, inductance ML²T⁻²A⁻², and ½ε₀E² is an energy per volume." },
      { name: "Homogeneity and unknown constants", description: "A constant added to a variable takes its dimensions, and the argument of a sine, an exponential or a log is a pure number." },
      { name: "Deriving relations and new base quantities", description: "Equate the powers of M, L and T to find unknown powers; to change the base quantities, solve for M, L and T in the new ones first." },
      { name: "Propagation of errors", description: "For a product of powers, add each relative error times the size of its power; in a sum or a difference, add the absolute errors." },
      { name: "Errors in laboratory experiments", description: "Each reading's error is its least count; a time read over many oscillations divides the watch's error by the whole run." },
      { name: "Vernier callipers and screw gauge", description: "Least count is one MSD minus one VSD, or the pitch over the circular divisions; the true reading is the observed reading minus the zero error, with its sign." },
    ],
    traps: [
      { name: "A positive zero error added", description: "A positive zero error means every reading is already too large. Subtract it; the added value is the commonest wrong option." },
      { name: "A power left out of the error", description: "In g = 4π²l/T² the period's relative error counts twice, and in an area a diameter's error counts twice. Dropping the factor gives a distractor." },
      { name: "The timing error over one period", description: "A watch read once over a run of many oscillations shares its error across the whole run. Divide by the total time, not by one period." },
      { name: "Dimensionally correct is not correct", description: "T = π√(l/g) passes the dimension test but is wrong by a factor 2. A dimension check can only rule an equation out." },
    ],
    relatedSlugs: ["mechanical-properties-of-solids", "oscillations"],
  },

  "motion-in-a-straight-line": {
    slug: "motion-in-a-straight-line",
    trigger: "A body moving along one line with a given speed, acceleration or graph, a stone thrown up or dropped, or a position written as a function of time.",
    story: [
      "The equations of constant acceleration carry most of the chapter, on level ground or under gravity. One habit wins those marks: choose a positive direction once and give every velocity, acceleration and displacement its sign.",
      "The rest reads a slope or an area off a graph, or differentiates a position that changes with time. When the acceleration is not constant, the three equations fail; differentiate, use a = v dv/dx, or integrate with the starting values.",
      "This is a long-tail chapter. Marks are lost on averaging two speeds over equal distances, on forgetting the velocity a stone keeps when it leaves a rising balloon, and on taking dv/dx for the acceleration.",
    ],
    subSkills: [
      { name: "Average speed and relative velocity", description: "Average speed is total distance over total time; speeds add for bodies moving towards each other and subtract for bodies moving the same way." },
      { name: "Equations of uniform acceleration", description: "v = u + at, s = ut + ½at², v² = u² + 2as; pick the one that leaves out the quantity you are neither given nor asked for." },
      { name: "Motion under gravity", description: "Take up as positive and a = −g for the whole flight, whether the body is dropped, thrown up or thrown down." },
      { name: "Slopes and areas of motion graphs", description: "Slope of x–t is velocity, slope of v–t is acceleration; area under v–t is displacement, area under a–t is the change in velocity." },
      { name: "Variable acceleration", description: "Differentiate a position for velocity and acceleration, use a = v dv/dx when v is given against x, and integrate with the starting values." },
    ],
    traps: [
      { name: "The plain mean of two speeds", description: "Over equal distances the average speed is 2v₁v₂/(v₁ + v₂). At 3 km/h and 5 km/h it is 3.75 km/h, not 4 km/h." },
      { name: "Dropped from a moving body", description: "A stone let go from a balloon rising at 8 m/s first rises at 8 m/s. Taking u = 0 gives a shorter fall and the wrong answer." },
      { name: "dv/dx taken as the acceleration", description: "dv/dx is in 1/s. The acceleration is v dv/dx, so a straight v–x line does not mean constant acceleration." },
      { name: "A turning point at a = 0", description: "The body reverses where v = 0. Where a = 0 the velocity is largest or smallest; and the distance across a turning point must be split there." },
    ],
    relatedSlugs: ["motion-in-a-plane", "laws-of-motion"],
  },

  "motion-in-a-plane": {
    slug: "motion-in-a-plane",
    trigger: "Two vectors to add or resolve, a projectile, a boat crossing a river, rain seen from a moving body, or a body going round a circle.",
    story: [
      "Almost every question splits a vector into two perpendicular parts: x and y for a projectile, across and along for a river, towards the centre and along the path for a circle. Once the split is right, each direction is a one-dimensional problem.",
      "Projectiles and circular motion carry most of the chapter. The circular questions lean on forces as much as on kinematics, because friction, a string, a spring or a wall has to supply mv²/r.",
      "The chapter is set less often than in the early papers. Marks are lost on sin 2θ written for sin²θ, on an angle quoted against the wrong axis, and on a speed taken as zero at the top of a path where it is not.",
    ],
    subSkills: [
      { name: "Vectors: resultant, components and products", description: "R² = A² + B² + 2AB cos θ; resolve along x and y; A·B = AB cos θ tests perpendicularity, and A × B is at right angles to both." },
      { name: "Velocity in a plane and relative velocity", description: "Differentiate the position one component at a time; the velocity of A seen from B is v_A − v_B, which settles rivers and rain." },
      { name: "Time of flight, height and range", description: "T = 2u sin θ/g, H = u² sin²θ/2g, R = u² sin 2θ/g; the range is greatest at 45°, and θ and 90° − θ give the same range." },
      { name: "Velocity, trajectory and launch from a height", description: "u cos θ never changes; y = x tan θ − gx²/(2u² cos²θ); a body thrown horizontally from h falls for √(2h/g)." },
      { name: "Uniform circular motion", description: "v = ωr and a = v²/r towards the centre even at constant speed; a tangential acceleration adds at right angles." },
      { name: "Roads, strings and vertical circles", description: "Name the force that supplies mv²/r: friction, banking, a string, a spring or a wall; in a vertical circle the speed changes from top to bottom." },
    ],
    traps: [
      { name: "sin 2θ and sin²θ swapped", description: "The range has sin 2θ and the height sin²θ. Check with 90°, where the range must be zero and the height u²/2g." },
      { name: "An angle against the wrong axis", description: "A velocity 4i − j m/s is at tan⁻¹(1/4) below the +x axis. Options give the right number against the wrong axis." },
      { name: "Zero speed at the top", description: "At the top of a projectile only the vertical velocity is zero; the speed is u cos θ. On a string, just completing a vertical circle needs √(gr) at the top." },
      { name: "Accelerations added directly", description: "Tangential and centripetal accelerations are at right angles, so the total is √(a_t² + a_c²), never a_t + a_c." },
    ],
    relatedSlugs: ["motion-in-a-straight-line", "laws-of-motion"],
  },

  "laws-of-motion": {
    slug: "laws-of-motion",
    trigger: "Forces on one or more bodies — strings, pulleys, friction, a lift or an accelerating frame — with an acceleration, a tension or a reaction to find.",
    story: [
      "Almost every question is solved the same way: draw each body on its own, mark every force on it, and write F = ma along the direction it can move. Connected bodies share one acceleration; then cut the string at one body to get the tension.",
      "Friction questions are mostly about the normal reaction, because a force at an angle or a tilted surface changes N and the friction with it. Check that a block moves at all before using kinetic friction.",
      "The chapter is set less often than in the early papers. Marks are lost on a sign or a direction: a pseudo force put along the acceleration instead of against it, or a rebound's momentum change taken as mv instead of 2mv.",
    ],
    subSkills: [
      { name: "Second law, impulse and variable mass", description: "Net force is the rate of change of momentum: ma for fixed mass, an impulse for a brief force, v dm/dt for rockets, belts and jets." },
      { name: "Equilibrium of forces", description: "At rest or at constant velocity the forces along any two perpendicular directions each add to zero." },
      { name: "Connected bodies and pulleys", description: "Treat the bodies as one system for the acceleration, then one body for each tension; a movable pulley halves the load's acceleration." },
      { name: "Static and kinetic friction", description: "Find N first; static friction takes any value up to μs N, kinetic friction is μk N, and on an incline N = mg cos θ." },
      { name: "Lifts, pseudo forces and circular motion", description: "In an accelerating frame add −ma₀ to every body; in circular motion the real forces supply mv²/r towards the centre." },
    ],
    traps: [
      { name: "The pseudo force along the acceleration", description: "A bob in a car speeding up forward swings back. The pseudo force points against the frame's acceleration, and it is used in that frame only." },
      { name: "A rebound taken as mv", description: "Bouncing back at the same speed, Δp = 2mv. Using mv halves the force, and that wrong answer is always an option." },
      { name: "Kinetic friction before checking", description: "If the driving force is below the largest static friction, a = 0. Static friction is only as large as it needs to be." },
      { name: "N taken as mg", description: "A push down at an angle adds F sin θ to N and a pull up takes it away; on an incline N = mg cos θ. Using mg gives one of the wrong options." },
    ],
    relatedSlugs: ["work-energy-and-power", "motion-in-a-plane", "rotational-motion"],
  },

  "work-energy-and-power": {
    slug: "work-energy-and-power",
    trigger: "A speed after a force has acted over a distance, a spring compressed, a collision or an explosion, or a rate of doing work.",
    story: [
      "Most questions are short: one energy balance or one momentum balance, then a line of arithmetic. The marks go to choosing the right balance.",
      "The work-energy theorem always holds, as long as every force's work is counted with its sign. Momentum survives every collision and explosion. Kinetic energy survives only an elastic collision, and mechanical energy only where no friction or impact takes any away.",
      "This is a long-tail chapter, and it is often set as a numeric-answer question. The bullet-and-pendulum shape is the standard test of the order: momentum through the impact, energy through the swing.",
    ],
    subSkills: [
      { name: "Work by constant and variable forces", description: "W = F·s for a constant force; the integral of F dx, or the signed area under an F–x graph, when it varies with position." },
      { name: "Work-energy theorem and K = p²/2m", description: "The total work of all forces is the change in kinetic energy; for one body, p multiplied by n makes K multiplied by n²." },
      { name: "Potential energy and mechanical energy", description: "F = −dU/dx; a spring stores ½kx²; where only conservative forces work, kinetic plus potential energy stays constant." },
      { name: "Power", description: "P = F·v at an instant; under constant power the force falls as the speed rises and x grows as t^(3/2)." },
      { name: "Impulse, explosions and sticking collisions", description: "Impulse is the change in momentum; momentum is conserved in an explosion, a recoil or a sticking collision, and kinetic energy is not." },
      { name: "Elastic collisions and restitution", description: "Elastic means momentum and kinetic energy both conserved; e compares separation speed with approach speed, and a bounce height goes as e²." },
    ],
    traps: [
      { name: "Energy conserved through an impact", description: "½mu² = (M + m)gh skips the impact. Use momentum for the impact, then energy for the swing." },
      { name: "Spring energy written as kx²", description: "The stored energy is ½kx², and between two stretches it is ½k(x₂² − x₁²), each measured from the natural length." },
      { name: "Height goes with e, not e²", description: "A ball leaving the floor at e times its arrival speed rises to e² times its starting height, and every bounce is travelled twice." },
      { name: "Constant power taken as constant force", description: "Using v = at and x = ½at² gives x ∝ t². Under constant power x ∝ t^(3/2)." },
    ],
    relatedSlugs: ["laws-of-motion", "rotational-motion"],
  },

  "rotational-motion": {
    slug: "rotational-motion",
    trigger: "A moment of inertia, a centre of mass, a torque about an axis, a spinning body changing shape, or a body rolling on a floor or a slope.",
    story: [
      "Building a moment of inertia carries a large part of the chapter: from the standard results, the two axis theorems, or by adding and removing parts. Torque, angular momentum and rolling then reuse those values.",
      "Most rolling questions turn on one number, k²/R², fixed by the body's shape. It sets the acceleration down a slope, the speed at the bottom and the split of kinetic energy. Many questions here ask for a number rather than an option.",
      "This is a cornerstone chapter, and it has grown in recent papers. The algebra is short. Marks are lost on the wrong axis, a forgotten piece of mass, or ½mv² written for a body that is also spinning.",
    ],
    subSkills: [
      { name: "Centre of mass and its motion", description: "Weight each position by its mass; the centre of mass moves as if all the mass and every external force acted there." },
      { name: "Rotational kinematics, torque and equilibrium", description: "Angular equations match straight-line ones with ω in rad/s; τ = r × F; equilibrium needs zero net force and zero net torque." },
      { name: "Moment of inertia and radius of gyration", description: "Standard results for rods, rings, discs and spheres; I = Mk², and a reshaped piece keeps its own mass." },
      { name: "Axis theorems and composite bodies", description: "I = I_cm + Md² from the centre-of-mass axis; I_z = I_x + I_y for flat bodies only; add or remove parts about one axis." },
      { name: "Torque, angular acceleration and rotational energy", description: "τ = Iα about a fixed axis; a spinning body stores ½Iω², which energy conservation trades with height and attached blocks." },
      { name: "Angular momentum and its conservation", description: "L = r × p for a particle, Iω for a body; with no external torque, I₁ω₁ = I₂ω₂." },
      { name: "Rolling: velocities and kinetic energy", description: "v = ωR; the contact point is at rest, the top moves at 2v, and K = ½mv²(1 + k²/R²)." },
      { name: "Rolling on inclines", description: "a = g sin θ/(1 + k²/R²) and v² = 2gh/(1 + k²/R²); static friction supplies the spin and does no work." },
    ],
    traps: [
      { name: "The parallel-axis theorem from the wrong axis", description: "I = I_cm + Md² holds only when one axis passes through the centre of mass. Between two other axes, go back to the centre-of-mass axis first." },
      { name: "The removed piece as a point", description: "Subtracting only m·d² for a hole leaves in its own moment of inertia about its centre. Both must go." },
      { name: "½mv² for a rolling body", description: "The spin adds ½Iω². Finding v from K = ½mv² overestimates the speed of every rolling body." },
      { name: "Kinetic energy kept when bodies stick", description: "A disc dropped on a spinning disc conserves angular momentum but loses kinetic energy. Equate L, not K." },
    ],
    relatedSlugs: ["laws-of-motion", "work-energy-and-power"],
  },

  gravitation: {
    slug: "gravitation",
    trigger: "g on another planet, at a height or a depth, an escape speed, a satellite's speed or energy, or a period compared through Kepler's law.",
    story: [
      "Most questions compare a quantity on one planet, at one height or in one orbit with the same quantity somewhere else. The constants cancel, so the work is in choosing the right formula and writing the ratio.",
      "Marks are lost on distances, not on algebra. Every formula wants r, the distance from the centre: a height of R means r = 2R. A separation of 2r gets written as r, and the constant-g equations get used over a distance comparable to the earth's radius, where only energy conservation with −GMm/r works.",
      "The chapter is set less often than in the early papers. The satellite energy relations, KE = GMm/2r and PE = −2KE, and Kepler's T² ∝ r³ answer many statement-type questions.",
    ],
    subSkills: [
      { name: "Newton's law, field and potential", description: "Add pulls as vectors; a sphere or shell acts as a point mass from outside; a system's potential energy is −Gm₁m₂/r summed over every pair." },
      { name: "g on the surface and at a height", description: "g = GM/R² = (4/3)πGρR on the surface; g/(1 + h/R)² at height h, close to g(1 − 2h/R) only when h is small." },
      { name: "g at a depth and the earth's spin", description: "g(1 − d/R) below the surface, falling to zero at the centre; rotation lowers g by ω²R cos²λ, most at the equator." },
      { name: "Escape velocity and energy conservation", description: "v_e = √(2GM/R) = √(2gR), independent of mass and direction; over large distances conserve KE − GMm/r." },
      { name: "Satellites and mutual orbits", description: "v = √(GM/r), T = 2π√(r³/GM), total energy −GMm/2r; in a binary the force uses the separation and each star its own radius." },
      { name: "Kepler's laws", description: "Elliptical orbits with the sun at a focus, equal areas in equal times, and T² ∝ r³/M for the central mass M." },
    ],
    traps: [
      { name: "A height used for r", description: "A body 2R from the surface is 3R from the centre, so g is g/9. Read whether the distance is from the surface or the centre." },
      { name: "Depth and height formulas swapped", description: "Below the surface g falls as d/R; above it, as 1/(1 + h/R)². Both directions lower g, which is largest at the surface." },
      { name: "Constant-g kinematics over a large distance", description: "A fall from height R gives v² = gR by energy conservation, not 2gR; mgh fails when h is comparable to R." },
      { name: "Potential energy as half the total", description: "In orbit U = 2E, not E/2. A higher orbit has more total energy but less kinetic energy." },
    ],
    relatedSlugs: ["motion-in-a-plane", "rotational-motion", "work-energy-and-power"],
  },

  "mechanical-properties-of-solids": {
    slug: "mechanical-properties-of-solids",
    trigger: "A wire stretched by a load, two wires compared, a breaking load, a body squeezed under pressure or sheared, or the energy stored in a stretched wire.",
    story: [
      "Most questions rest on one relation, ΔL = FL/(AY), and on its versions for volume and shape. The work is finding the tension a wire really carries and seeing which length, area or modulus the question has changed.",
      "Ratio questions dominate: a diameter ratio becomes an area ratio by squaring, and a wire drawn out at fixed volume changes its length and its area together. Many are set as numeric-answer questions.",
      "This is a long-tail chapter. Marks are lost on units (mm² and cm² against m²), on a diameter used as a radius, on giving a wire pulled from both ends twice its tension, and on testing only the upper wire of a stack for breaking.",
    ],
    subSkills: [
      { name: "Stress, strain and Young's modulus", description: "ΔL = FL/(AY) with A = πd²/4; Y belongs to the material, and on a strain–stress graph the slope is 1/Y." },
      { name: "Loaded wires and breaking stress", description: "Find each wire's tension first: equal in series, everything below it in a stack, from a force balance when the load accelerates or swings." },
      { name: "Bulk modulus, shear and Poisson's ratio", description: "B = ΔP/(ΔV/V), η = (F/A)/θ, and Y = 2η(1 + σ) = 3B(1 − 2σ) tie the moduli together." },
      { name: "Hooke's law and stored energy", description: "T = k(l − l₀) gives the natural length from two readings; a stretched wire stores ½FΔL, or ½ × stress × strain per unit volume." },
    ],
    traps: [
      { name: "Pulled from both ends taken as 2F", description: "Two people pulling the ends with F each give a tension F, the same as a wall at one end. Using 2F doubles the answer." },
      { name: "A diameter used as a radius", description: "A = πd²/4. Putting d into πr² makes the area four times too large and the extension four times too small." },
      { name: "Only the upper wire tested", description: "The upper wire carries more but is often thicker. Test every wire against its own breaking stress." },
      { name: "The load's work taken as the stored energy", description: "A load that stretches a wire by ΔL loses mgΔL, but the wire stores only ½mgΔL; the rest leaves as heat or oscillation." },
    ],
    relatedSlugs: ["laws-of-motion", "mechanical-properties-of-fluids", "units-and-measurements"],
  },

  "mechanical-properties-of-fluids": {
    slug: "mechanical-properties-of-fluids",
    trigger: "Pressure at a depth, a floating body, flow through a narrowing pipe, a jet from a tank, a sphere falling through a liquid, or a drop, bubble or capillary.",
    story: [
      "The chapter has two halves. Liquids at rest or in motion are nearly always a balance: of pressures at one level, of energy per unit volume along a pipe, or of weight against buoyancy and drag. Surface tension is the other half, where the energy or the extra pressure of a curved surface does the work.",
      "This is a core chapter, and it has grown in recent papers. The physics is short, and many questions ask for a number rather than an option.",
      "Marks are lost on a factor. A soap bubble has two surfaces and an air bubble in water has one, a stem gives a diameter where the formula wants a radius, and the atmosphere is added where it cancels or left out where the stem gives it.",
    ],
    subSkills: [
      { name: "Pressure, Pascal's law and buoyancy", description: "P = P₀ + ρgh; a pressure added to an enclosed liquid reaches every point; a floating body displaces its own weight of liquid." },
      { name: "Continuity, Bernoulli and efflux", description: "A₁v₁ = A₂v₂; P + ρgh + ½ρv² is constant, so pressure falls where the pipe narrows; a jet leaves a tank at √(2gh)." },
      { name: "Viscosity, Stokes' law and Reynolds number", description: "Viscous force is ηA times the velocity gradient; a slow sphere feels 6πηrv; ρvd/η says whether a flow stays smooth." },
      { name: "Terminal velocity", description: "Drag plus buoyancy equals weight at v = 2r²(ρ − σ)g/9η, so for one material v grows as r²." },
      { name: "Surface energy of drops and bubbles", description: "New surface costs T × ΔA: splitting a drop needs work, merging releases energy, and a soap bubble pays for two surfaces." },
      { name: "Excess pressure and capillary rise", description: "Excess pressure is 2T/r for one surface and 4T/r for a soap bubble; liquid rises in a narrow tube to h = 2T cos θ/ρgr." },
    ],
    traps: [
      { name: "Two surfaces for an air bubble", description: "Only a soap bubble in air has two faces. An air bubble under water has one, so its excess pressure is 2T/r, not 4T/r." },
      { name: "A diameter used as a radius", description: "Bores, drops and spheres are often given by diameter. Halve it before squaring, or the energy or terminal speed is four times too big." },
      { name: "The atmosphere where it cancels", description: "Air presses on the free surface and on the jet alike, so P₀ cancels in efflux and across a partition. Keep it only where the stem asks for an absolute pressure or gives P₀ for a force." },
      { name: "Buoyancy added to the drag", description: "At terminal speed the drag is the weight minus the buoyancy. Adding them gives a force bigger than the weight." },
    ],
    relatedSlugs: ["mechanical-properties-of-solids", "laws-of-motion", "work-energy-and-power"],
  },
};
