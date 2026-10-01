import type { SubtopicNote } from "@/app/notes/_types";

export const WET_WEP_NOTE: SubtopicNote = {
  subtopicName: "Work-Energy Theorem and Kinetic Energy",
  title: "Work-Energy Theorem and Kinetic Energy",
  oneLineDefinition:
    "The total work done by all the forces on a body equals its change in kinetic energy, and kinetic energy and momentum are linked by K = p²/2m.",
  whyItMatters:
    "Twenty-eight PYQs, twenty of them multiple choice, and four from 2026, the largest page in the chapter. Ten find an unknown work or force from the theorem: air resistance on a falling body, sand stopping a ball, an engine at constant speed; five give the velocity or position as a formula and ask for the work; thirteen link kinetic energy and momentum, as ratios or percentage changes. None needs the acceleration; all of them need every force's work counted with its sign.",
  concepts: [
    // C1 — the theorem with several forces
    {
      kind: "formula" as const,
      slug: "jpwep-net-work",
      name: "Work-energy theorem with several forces",
      intuition:
        "Add up the work of every force on the body: gravity, friction, air resistance, an engine, the ground pushing back. The total equals the change in kinetic energy. So if every work but one is known, the last one follows, and an average force follows from its work divided by the distance.",
      definition:
        "- \\(W_g + W_{\\text{other}} = K_f - K_i\\), with each work carrying its own sign.\n" +
        "- Falling h from rest and landing at speed v: \\(W_{\\text{air}} = \\tfrac12 mv^{2} - mgh\\) (negative).\n" +
        "- Falling h and then sinking a depth d before stopping: gravity works through \\(h + d\\), so \\(mg(h + d) = F_{\\text{avg}}\\,d\\).\n" +
        "- Constant speed means \\(\\Delta K = 0\\): lowering a load through h, the hand does \\(-mgh\\); an engine moving a vehicle a distance d against friction does \\(\\mu mgd\\).\n" +
        "- Braking with a fixed force F: stopping distance \\(s = K/F\\). Equal kinetic energies and equal forces give equal distances, whatever the masses.\n" +
        "- Energy to speed up from u to 2u is three times the energy from rest to u.",
      formula: {
        label: "Work-energy theorem",
        latex: "W_{\\text{net}} = \\sum W_i = K_f - K_i",
      },
      authoredExample: {
        prompt:
          "A 0.5 kg stone is dropped from rest and falls 20 m. It lands at 18 m/s. Find the work done by air resistance. (\\(g = 10\\) m/s²)",
        steps: [
          "Gravity: \\(W_g = mgh = 0.5 \\times 10 \\times 20 = 100\\) J.",
          "Change in kinetic energy: \\(\\tfrac12 (0.5)(18)^{2} - 0 = 81\\) J.",
          "\\(W_{\\text{air}} = 81 - 100\\).",
        ],
        answer: "\\(-19\\) J",
      },
      selfCheckExample: {
        prompt:
          "A crane lowers a 200 kg crate through 5 m at constant speed. Find the work done on the crate by gravity and by the crane's cable. (\\(g = 10\\) m/s²)",
        steps: [
          "Gravity acts down and the crate moves down: \\(W_g = +200 \\times 10 \\times 5 = +10\\,000\\) J.",
          "The speed is constant, so \\(\\Delta K = 0\\) and \\(W_g + W_{\\text{cable}} = 0\\).",
        ],
        answer: "Gravity \\(+10\\) kJ; cable \\(-10\\) kJ.",
      },
      practiceSet: [
        { prompt: "A 1 kg body falls from rest through 10 m and lands at 12 m/s. Find the work done by air resistance. (\\(g = 10\\) m/s²)", answer: "\\(-28\\) J" },
        { prompt: "A 0.2 kg ball falls 1.8 m onto sand and sinks 2 cm before stopping. Find the average force from the sand. (\\(g = 10\\) m/s²)", answer: "\\(182\\) N" },
        { prompt: "A 1000 kg car moves 100 m at constant speed on a road with μ = 0.05. Find the work done by its engine. (\\(g = 10\\) m/s²)", answer: "\\(50\\) kJ" },
        { prompt: "Energy E takes a body from rest to speed v. How much more energy takes it from v to 3v?", answer: "\\(8E\\)" },
      ],
      pyqExampleId: "4b8d54f5-27ae-41b3-b18f-c32bc499817a", // 2 Apr 2026 S2: ball falls, penetrates sand, average force
      traps: [
        {
          title: "Gravity also works through the depth of penetration",
          body: "A ball that falls h and then sinks d into sand is pulled down by gravity through h + d. Writing mgh = F·d leaves out mgd, and the options usually include both answers.",
        },
        {
          title: "Constant speed does not mean every force does zero work",
          body: "At constant speed the NET work is zero. The engine of a bus still does positive work, and friction does an equal negative work. The engine's work is μmgd, not zero.",
        },
      ],
    },

    // C2 — work from a velocity law
    {
      kind: "formula" as const,
      slug: "jpwep-velocity-law",
      name: "Work from a given velocity or position law",
      intuition:
        "If the speed at the start and at the end is known, the work done by the net force is the change in kinetic energy. There is no need to find the force. A velocity given as a function of x is put in at the two positions; a position given as a function of t is differentiated first.",
      definition:
        "- Given \\(v(x)\\): find \\(v_1\\) and \\(v_2\\) at the two positions, then \\(W = \\tfrac12 m(v_2^{2} - v_1^{2})\\).\n" +
        "- Given \\(x(t)\\): \\(v = dx/dt\\), put in the two times, then the same formula.\n" +
        "- If \\(x(t)\\) is quadratic in t, the acceleration and the force are constant, so \\(W = F\\,\\Delta x\\) gives the same answer: a quick check.\n" +
        "- Check the starting speed: \\(v = \\alpha\\sqrt{x}\\) is zero at the origin, but \\(v = 3x^{2} + 4\\) is 4 m/s there.\n" +
        "- The theorem gives the work done ON the body. The work done BY the body on its surroundings has the opposite sign.",
      formula: {
        label: "Work from two speeds",
        latex: "W_{\\text{net}} = \\tfrac12 m\\left(v_2^{2} - v_1^{2}\\right), \\quad v = \\frac{dx}{dt}",
      },
      authoredExample: {
        prompt:
          "A 3 kg body moves along the x-axis with \\(x(t) = 2t^{2} + 3t\\) (x in m, t in s). Find the work done on it between \\(t = 1\\) s and \\(t = 2\\) s.",
        steps: [
          "\\(v = \\dfrac{dx}{dt} = 4t + 3\\): \\(v(1) = 7\\) m/s and \\(v(2) = 11\\) m/s.",
          "\\(W = \\tfrac12 (3)(121 - 49) = 1.5 \\times 72 = 108\\) J.",
          "Check: \\(a = 4\\) m/s², \\(F = 12\\) N, \\(\\Delta x = 14 - 5 = 9\\) m, \\(F\\Delta x = 108\\) J.",
        ],
        answer: "\\(108\\) J",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg particle moves along a straight line with \\(v = 2\\sqrt{x}\\) (v in m/s, x in m). Find the total work done on it as it moves from \\(x = 1\\) m to \\(x = 4\\) m.",
        steps: [
          "\\(v^{2} = 4x\\): \\(v_1^{2} = 4\\) and \\(v_2^{2} = 16\\).",
          "\\(W = \\tfrac12 (2)(16 - 4)\\).",
        ],
        answer: "\\(12\\) J",
      },
      practiceSet: [
        { prompt: "A 1 kg body moves with \\(v = 3x\\). Find the work done on it from \\(x = 0\\) to \\(x = 2\\) m.", answer: "\\(18\\) J" },
        { prompt: "A 4 kg body moves with \\(x = t^{3}\\) m. Find the work done on it from \\(t = 0\\) to \\(t = 1\\) s.", answer: "\\(18\\) J" },
        { prompt: "A 0.5 kg body moves with \\(v = x^{2} + 1\\). Find the work done on it from \\(x = 0\\) to \\(x = 1\\) m.", answer: "\\(0.75\\) J" },
        { prompt: "A body of mass m moves with \\(v = kx\\). Find the work done on it from \\(x = 0\\) to \\(x = L\\).", answer: "\\(\\tfrac12 mk^{2}L^{2}\\)" },
      ],
      pyqExampleId: "8f07ab50-54da-4835-84cd-1a7d0e326a96", // 21 Jan 2026 S2: x(t) quadratic, work between two times
      traps: [
        {
          title: "Do not assume the body starts from rest",
          body: "Put the starting position into the velocity law. For v = 3x² + 4 the speed at x = 0 is 4 m/s, so the starting kinetic energy is not zero. Dropping it makes the work too large.",
        },
        {
          title: "Work done on the body, not by it",
          body: "W = ΔK is the work done on the body by the forces acting on it. A question about the work done by the body on its surroundings wants the same size with the opposite sign.",
        },
      ],
    },

    // C3 — kinetic energy and momentum
    {
      kind: "formula" as const,
      slug: "jpwep-ke-momentum",
      name: "Kinetic energy and momentum, K = p²/2m",
      intuition:
        "Kinetic energy and momentum are tied by K = p²/2m. For two bodies with the same kinetic energy, the heavier one has more momentum. For two bodies with the same momentum, the lighter one has more kinetic energy. For one body, the kinetic energy goes as the square of the momentum, and as the square of the speed.",
      definition:
        "- \\(K = \\dfrac{p^{2}}{2m}\\) and \\(p = \\sqrt{2mK}\\).\n" +
        "- Same K: \\(\\dfrac{p_1}{p_2} = \\sqrt{\\dfrac{m_1}{m_2}}\\).\n" +
        "- Same p: \\(\\dfrac{K_1}{K_2} = \\dfrac{m_2}{m_1}\\).\n" +
        "- Same body: p multiplied by n makes K multiplied by \\(n^{2}\\); K multiplied by n makes p multiplied by \\(\\sqrt n\\).\n" +
        "- Percentage change: new over old, minus 1. Momentum up 20% means K multiplied by 1.44, up 44%.\n" +
        "- Speed falling from 50 to 30 m/s keeps \\((30/50)^{2} = 36\\%\\) of the kinetic energy, a loss of 64%.\n" +
        "- A force F acting for time t changes p by Ft; then \\(\\Delta K = \\dfrac{p_f^{2} - p_i^{2}}{2m}\\).",
      formula: {
        label: "Kinetic energy and momentum",
        latex: "K = \\frac{p^{2}}{2m} \\qquad p = \\sqrt{2mK}",
      },
      authoredExample: {
        prompt:
          "(a) The momentum of a body is doubled. By what percentage does its kinetic energy increase? (b) The kinetic energy of a body is made 25 times larger. By what percentage does its momentum increase?",
        steps: [
          "(a) \\(K \\propto p^{2}\\): K becomes \\(2^{2} = 4\\) times, an increase of \\(4 - 1 = 3\\), or 300%.",
          "(b) \\(p \\propto \\sqrt K\\): p becomes \\(\\sqrt{25} = 5\\) times, an increase of \\(5 - 1 = 4\\), or 400%.",
        ],
        answer: "(a) 300%; (b) 400%.",
      },
      selfCheckExample: {
        prompt:
          "Two bodies of masses 9 kg and 4 kg have equal kinetic energies. Find the ratio of their momenta. If instead they had equal momenta, what would be the ratio of their kinetic energies?",
        steps: [
          "Equal K: \\(p \\propto \\sqrt m\\), so \\(p_9 : p_4 = 3 : 2\\).",
          "Equal p: \\(K \\propto 1/m\\), so \\(K_9 : K_4 = 4 : 9\\).",
        ],
        answer: "Momenta 3 : 2; kinetic energies 4 : 9.",
      },
      practiceSet: [
        { prompt: "The momentum of a body rises by 10%. By what percentage does its kinetic energy rise?", answer: "21%" },
        { prompt: "A 2 kg body has 25 J of kinetic energy. Find its momentum.", answer: "\\(10\\) kg m/s" },
        { prompt: "A 1 kg ball moving at 10 m/s keeps 16% of its kinetic energy after a bounce. Find its new speed.", answer: "\\(4\\) m/s" },
        { prompt: "Bodies of mass m and 4m have the same momentum. Find the ratio of their kinetic energies, lighter to heavier.", answer: "\\(4 : 1\\)" },
      ],
      pyqExampleId: "197b0d22-50cd-469d-85f4-7d94d62583cb", // 6 Apr 2024: KE multiplied, percentage rise in momentum
      traps: [
        {
          title: "Square the factor, not the percentage",
          body: "Momentum up by 50% means p is multiplied by 1.5, so K is multiplied by 2.25: a rise of 125%. Doubling the 50% to get 100% is wrong.",
        },
        {
          title: "A percentage increase subtracts the starting value",
          body: "If K becomes 25 times larger, p becomes 5 times larger. That is an increase of 400%, not 500%: the new value is 500% of the old one, and the increase is 100% less.",
        },
      ],
    },
  ],
};
