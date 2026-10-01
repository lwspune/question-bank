import type { SubtopicNote } from "@/app/notes/_types";

export const SPRINGS_OSC_NOTE: SubtopicNote = {
  subtopicName: "Spring Systems and Restoring Forces",
  title: "Spring Systems and Restoring Forces",
  oneLineDefinition:
    "Any restoring force that grows in step with the displacement gives SHM with ω² = (force per unit displacement) ÷ mass; springs are the commonest case, alone, cut or combined.",
  whyItMatters:
    "Thirty PYQs, twenty-two of them multiple choice, and five from 2026. Eleven cut a spring or join springs to one block; eleven change the mass on a spring or put two masses on one spring; eight find ω for something that is not a spring: a floating block, a tunnel through the earth, a disc on a pivot, a dipole in a field. Every one ends with ω² = restoring force per unit displacement ÷ mass.",
  concepts: [
    // C1 — cut springs and combinations
    {
      kind: "formula" as const,
      slug: "jposc-spring-combos",
      name: "Cut springs and springs in series and in parallel",
      intuition:
        "A spring's constant is inversely proportional to its length: a shorter piece of the same spring is stiffer. Springs one after the other carry the same force and share the stretch, so they are softer together (series). Springs that stretch by the same amount share the force, so they are stiffer together (parallel).",
      definition:
        "- **Cutting**: \\(kl\\) is constant. A spring cut in the ratio 1 : 2 gives pieces of \\(3k\\) and \\(3k/2\\); cut in half, each half is \\(2k\\).\n" +
        "- **Series** (same force): \\(\\dfrac{1}{k} = \\dfrac{1}{k_1} + \\dfrac{1}{k_2}\\). Two equal springs give \\(k/2\\), so T grows by \\(\\sqrt{2}\\).\n" +
        "- **Parallel** (same stretch): \\(k = k_1 + k_2\\).\n" +
        "- **A block between two springs**, each fixed to a wall: displace it by x and one spring stretches by x while the other is compressed by x. Both push it back, so this is parallel, \\(k_1 + k_2\\).\n" +
        "- The same holds on an incline: \\(mg\\sin\\alpha\\) is constant, so it only moves the equilibrium point and does not change ω.\n" +
        "- **Networks**: reduce each chain of springs in series first, then add chains that join the same two points.\n" +
        "- Then \\(T = 2\\pi\\sqrt{m/k_{eq}}\\).",
      formula: {
        label: "Cut and combined springs",
        latex: "k \\propto \\frac{1}{l} \\qquad \\frac{1}{k_s} = \\frac{1}{k_1} + \\frac{1}{k_2} \\qquad k_p = k_1 + k_2",
      },
      authoredExample: {
        prompt:
          "A spring of constant 24 N/m is cut into two pieces whose lengths are in the ratio 1 : 2. Find the constant of each piece. A 0.75 kg block on a smooth floor is then fixed between the two pieces, whose other ends are fixed to walls. Find its period.",
        steps: [
          "The pieces have lengths \\(l/3\\) and \\(2l/3\\). With \\(kl\\) constant: \\(k_1 = 3 \\times 24 = 72\\) N/m and \\(k_2 = \\dfrac{3}{2} \\times 24 = 36\\) N/m.",
          "Between two walls the springs act in parallel: \\(k = 72 + 36 = 108\\) N/m.",
          "\\(T = 2\\pi\\sqrt{\\dfrac{0.75}{108}} = 2\\pi\\sqrt{\\dfrac{1}{144}} = \\dfrac{2\\pi}{12} = \\dfrac{\\pi}{6}\\) s.",
        ],
        answer: "72 N/m and 36 N/m; \\(T = \\pi/6 \\approx 0.52\\) s.",
      },
      selfCheckExample: {
        prompt:
          "Springs of 6 N/m and 3 N/m are joined in series and carry a 0.5 kg mass. Find the period. What is the period if the same two springs are put in parallel?",
        steps: [
          "Series: \\(k = \\dfrac{6 \\times 3}{6 + 3} = 2\\) N/m, so \\(T = 2\\pi\\sqrt{0.5/2} = 2\\pi \\times 0.5 = \\pi\\) s.",
          "Parallel: \\(k = 9\\) N/m, so \\(T = 2\\pi\\sqrt{0.5/9} = \\dfrac{\\sqrt{2}}{3}\\pi \\approx 1.48\\) s.",
        ],
        answer: "\\(\\pi\\) s in series; about 1.48 s in parallel.",
      },
      practiceSet: [
        { prompt: "A spring of constant k is cut into four equal pieces. What is the constant of each piece?", answer: "\\(4k\\)" },
        { prompt: "Two identical springs of constant k are joined in series. What is the combined constant?", answer: "\\(k/2\\)" },
        { prompt: "A 100 N/m spring is cut in half and the halves are put in parallel. What is the combined constant?", answer: "\\(400\\) N/m" },
        { prompt: "A 1 kg block sits between springs of 10 N/m and 30 N/m fixed to opposite walls. What is ω?", answer: "\\(\\sqrt{40} \\approx 6.3\\) rad/s" },
      ],
      pyqExampleId: "545933f7-5418-4f04-bd1f-b69676820976", // 2026: 15 N/m spring cut 1 : 3, constant of the smaller piece
      traps: [
        {
          title: "A block between two walls is parallel",
          body: "The springs sit on opposite sides of the block, so they look like a chain. But they stretch and compress by the same x and both push the block back: k = k₁ + k₂, not the series value.",
        },
        {
          title: "Cutting a spring makes it stiffer",
          body: "A shorter piece of the same spring has a larger constant. Cut in half, each half is 2k, not k/2.",
        },
        {
          title: "Gravity along an incline does not change ω",
          body: "For a block between springs on a smooth incline, mg sin α is a constant force. It shifts the equilibrium point but leaves the restoring force −(k₁ + k₂)x unchanged.",
        },
      ],
    },

    // C2 — the mass on a spring
    {
      kind: "formula" as const,
      slug: "jposc-spring-mass",
      name: "Mass on a spring, and two masses on one spring",
      intuition:
        "A heavier mass on the same spring swings more slowly: \\(T \\propto \\sqrt{m}\\). When nothing is fixed to a wall and two masses sit on the ends of one spring, both move about their centre of mass, and the right mass to use is the reduced mass.",
      definition:
        "- \\(T = 2\\pi\\sqrt{m/k}\\); \\(f \\propto 1/\\sqrt{m}\\) and \\(f \\propto \\sqrt{k}\\). Four times the mass doubles T.\n" +
        "- A vertical spring has the same T. Gravity only stretches it by \\(\\Delta = mg/k\\), so \\(T = 2\\pi\\sqrt{\\Delta/g}\\).\n" +
        "- Equal masses on springs \\(k_1\\) and \\(k_2\\): equal amplitudes give \\(v_{max}\\) in the ratio \\(\\sqrt{k_1/k_2}\\); equal \\(v_{max}\\) give amplitudes in the ratio \\(\\sqrt{k_2/k_1}\\).\n" +
        "- **Two free masses** on one spring: \\(\\omega = \\sqrt{k/\\mu}\\) with \\(\\mu = \\dfrac{m_1m_2}{m_1 + m_2}\\).\n" +
        "- **Two masses set moving**: momentum is conserved. At the largest stretch both move with the centre-of-mass velocity, and the spring holds \\(\\tfrac{1}{2}\\mu v_{rel}^{2} = \\tfrac{1}{2}kx_{max}^{2}\\).\n" +
        "- **Stacked blocks** moving together: \\(T = 2\\pi\\sqrt{(M + m)/k}\\). Friction on the top block is \\(m \\cdot \\dfrac{kx}{M + m}\\), so it does not slip while the amplitude is at most \\(\\mu g(M + m)/k\\).",
      formula: {
        label: "Spring–mass period and reduced mass",
        latex: "T = 2\\pi\\sqrt{\\frac{m}{k}} \\qquad \\omega = \\sqrt{\\frac{k}{\\mu}},\\ \\ \\mu = \\frac{m_1m_2}{m_1 + m_2}",
      },
      authoredExample: {
        prompt:
          "A mass m on a spring oscillates with period 2 s. When 5 kg is added, the period becomes 3 s. Find m.",
        steps: [
          "\\(T^{2} \\propto m\\), so \\(\\dfrac{m + 5}{m} = \\dfrac{3^{2}}{2^{2}} = \\dfrac{9}{4}\\).",
          "\\(4m + 20 = 9m\\), so \\(m = 4\\) kg.",
        ],
        answer: "\\(m = 4\\) kg",
      },
      selfCheckExample: {
        prompt:
          "Blocks of 2 kg and 3 kg are joined by a spring of constant 120 N/m on a smooth floor. They are pulled apart and released. Find the angular frequency of their oscillation.",
        steps: [
          "\\(\\mu = \\dfrac{2 \\times 3}{2 + 3} = 1.2\\) kg.",
          "\\(\\omega = \\sqrt{120/1.2} = \\sqrt{100} = 10\\) rad/s.",
        ],
        answer: "\\(10\\) rad/s",
      },
      practiceSet: [
        { prompt: "A mass m on a spring oscillates at frequency f. What is the frequency with 4m on the same spring?", answer: "\\(f/2\\)" },
        { prompt: "A mass stretches a vertical spring by 2.5 cm at rest. Period of its vertical oscillation (g = 10 m/s²)?", answer: "\\(0.1\\pi \\approx 0.31\\) s" },
        { prompt: "Equal masses on springs k and 4k oscillate with equal amplitudes. Ratio of their maximum speeds?", answer: "\\(1 : 2\\)" },
        { prompt: "Two 1 kg blocks are joined by a 50 N/m spring on a smooth floor. What is ω?", answer: "\\(10\\) rad/s" },
      ],
      pyqExampleId: "494c7a19-ee0d-4e99-abc0-bc8d4f19768d", // 2023: adding 3 kg turns a 1 s period into 2 s
      traps: [
        {
          title: "Two free masses use the reduced mass",
          body: "With no wall, a spring between m₁ and m₂ oscillates with ω = √(k/μ), μ = m₁m₂/(m₁ + m₂). Using one mass or the total mass gives the wrong ω.",
        },
        {
          title: "Gravity does not change a spring's period",
          body: "Hanging the spring vertically shifts the equilibrium down by mg/k, but T = 2π√(m/k) is unchanged.",
        },
        {
          title: "Equal amplitudes and equal top speeds give opposite ratios",
          body: "For equal masses, v_max = A√(k/m). Equal amplitudes give v_max in the ratio √(k₁/k₂); equal v_max give amplitudes in the ratio √(k₂/k₁).",
        },
      ],
    },

    // C3 — other restoring forces
    {
      kind: "formula" as const,
      slug: "jposc-restoring-force",
      name: "SHM from any restoring force or torque",
      intuition:
        "A spring is only one way to get SHM. Displace any system a little, write the force (or torque) that pulls it back, and if it is a constant times the displacement, the motion is SHM. The constant plays the part of k, and ω² is that constant divided by the mass (or by the moment of inertia).",
      definition:
        "- \\(F = -Cx\\) gives \\(\\omega = \\sqrt{C/m}\\); \\(\\tau = -\\kappa\\theta\\) gives \\(\\omega = \\sqrt{\\kappa/I}\\).\n" +
        "- **Floating body** of cross-section A in a liquid of density ρ: pushing it down by y adds buoyancy \\(\\rho gAy\\), so \\(C = \\rho gA\\) and \\(T = 2\\pi\\sqrt{M/(\\rho Ag)}\\). Since \\(M = \\rho Ah\\) (h = depth under the liquid), \\(T = 2\\pi\\sqrt{h/g}\\).\n" +
        "- **Tunnel through a uniform earth**, along a diameter or any chord: the force along the tunnel is \\(-(mg/R)x\\), so \\(T = 2\\pi\\sqrt{R/g} \\approx 84\\) minutes.\n" +
        "- **From a potential** \\(U(x)\\): C is \\(U''\\) at the minimum. For \\(U = U_0(1 - \\cos ax)\\), \\(C = U_0a^{2}\\).\n" +
        "- **Physical pendulum**: \\(T = 2\\pi\\sqrt{I/(mgd)}\\), I about the pivot, d from the pivot to the centre of mass.\n" +
        "- **Dipole** in a field E: \\(\\tau = -pE\\theta\\), so \\(T = 2\\pi\\sqrt{I/(pE)}\\).",
      formula: {
        label: "Angular frequency from a restoring force or torque",
        latex: "F = -Cx \\Rightarrow \\omega = \\sqrt{\\frac{C}{m}} \\qquad \\tau = -\\kappa\\theta \\Rightarrow \\omega = \\sqrt{\\frac{\\kappa}{I}}",
      },
      authoredExample: {
        prompt:
          "A wooden block of base area 50 cm² floats upright in water (density 1000 kg/m³) with 8 cm of it under water. It is pushed down a little and released. Find the period (g = 10 m/s²).",
        steps: [
          "Mass from floating: \\(M = \\rho Ah = 1000 \\times 0.005 \\times 0.08 = 0.4\\) kg.",
          "Restoring constant: \\(C = \\rho gA = 1000 \\times 10 \\times 0.005 = 50\\) N/m.",
          "\\(T = 2\\pi\\sqrt{M/C} = 2\\pi\\sqrt{0.4/50} = 2\\pi\\sqrt{0.008} \\approx 0.56\\) s. The same as \\(2\\pi\\sqrt{h/g}\\).",
        ],
        answer: "About 0.56 s",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg particle moves along x with potential energy \\(U = 2(1 - \\cos 3x)\\) J. Find the period of small oscillations about \\(x = 0\\).",
        steps: [
          "\\(U' = 6\\sin 3x\\) and \\(U'' = 18\\cos 3x\\), so \\(C = U''(0) = 18\\) N/m.",
          "\\(\\omega = \\sqrt{18/2} = 3\\) rad/s, so \\(T = \\dfrac{2\\pi}{3}\\) s.",
        ],
        answer: "\\(T = 2\\pi/3 \\approx 2.09\\) s",
      },
      practiceSet: [
        { prompt: "A 0.2 kg particle moves under \\(F = -20x\\) N. What is ω?", answer: "\\(10\\) rad/s" },
        { prompt: "How does the period in a tunnel along a chord compare with that along a diameter?", answer: "The same, \\(2\\pi\\sqrt{R/g}\\)" },
        { prompt: "A uniform rod of length L swings about one end. What is its period?", answer: "\\(2\\pi\\sqrt{\\dfrac{2L}{3g}}\\)" },
        { prompt: "A floating cylinder has 20 cm under water. Period of small vertical oscillations (g = 10 m/s²)?", answer: "About 0.89 s" },
      ],
      pyqExampleId: "2918d22b-afa6-4bbe-b430-cb379eac1a8e", // 2026: floating cylinder, T = 2π√(M/ρAg)
      traps: [
        {
          title: "A physical pendulum uses I about the pivot",
          body: "In T = 2π√(I/mgd), I is the moment of inertia about the pivot, found with the parallel-axis theorem. I about the centre of mass gives too short a period.",
        },
        {
          title: "The tunnel period does not depend on the chord",
          body: "The force along any chord through a uniform earth is −(mg/R)x, so every such tunnel gives T = 2π√(R/g), about 84 minutes.",
        },
        {
          title: "A floating body's period depends on its depth under the liquid",
          body: "T = 2π√(M/ρAg) equals 2π√(h/g), where h is the depth below the surface at rest. A denser liquid floats the block higher, so h is smaller and T is shorter.",
        },
      ],
    },
  ],
};
