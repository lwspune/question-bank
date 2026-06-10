import type { SubtopicNote } from "@/app/notes/_types";

export const OSCILLATIONS_SHM_AND_WAVES_NOTE: SubtopicNote = {
  subtopicName: "Simple Harmonic Motion and General Waves",
  title: "Simple Harmonic Motion and General Waves",
  oneLineDefinition:
    "Simple harmonic motion is the to-and-fro motion produced when the restoring force is proportional to the displacement and points back toward the mean position; a wave is a disturbance that carries energy — and every wave reflects, carries energy and exerts pressure, but only light needs no medium.",
  whyItMatters:
    "Six PYQs and the conceptual spine of the whole chapter. The bank leans on two HARD ideas — that two instants of a simple-harmonic motion are in the same phase only when they are a whole number of periods apart, and that sound and water waves (unlike light) cannot cross a vacuum. " +
    "The easier marks test the defining property of SHM (force ∝ −displacement) and the basic relations ω = 2πf and 'motion repeats after every nT'. " +
    "Get the definition of SHM and the shared-versus-unique wave properties watertight and the pendulum subtopic that follows is just one formula on top.",
  concepts: [
    // 1 — FOUNDATION: what is SHM
    {
      kind: "formula" as const,
      slug: "osc-shm-foundation",
      name: "What makes a motion simple-harmonic",
      intuition:
        "Pull a mass on a spring aside and let go: the further you pull it, the harder it is pulled back, and the pull is always toward the rest point. That single rule — a restoring force that grows in proportion to how far you are displaced and always points home — is what makes a motion simple-harmonic. The result is a smooth, endlessly repeating swing.",
      definition:
        "A particle is in **simple harmonic motion (SHM)** when its restoring force (and hence its acceleration) is **directly proportional to the displacement from the mean position and directed opposite to it** — back toward the mean position.\n" +
        "- Restoring force: \\(F = -kx\\) (the minus sign means 'toward the mean position').\n" +
        "- Acceleration: \\(a = -\\omega^2 x\\), so acceleration is largest at the extremes and zero at the mean position.\n" +
        "- The motion is **periodic** (it repeats in equal time intervals) and oscillates between \\(+A\\) and \\(-A\\), the amplitude.",
      formula: {
        label: "Defining condition of SHM",
        latex: "F = -kx \\qquad a = -\\omega^2 x",
        symbols: [
          { symbol: "F", meaning: "restoring force" },
          { symbol: "x", meaning: "displacement from the mean position" },
          { symbol: "k", meaning: "force constant (positive)" },
          { symbol: "\\omega", meaning: "angular frequency" },
        ],
      },
      authoredExample: {
        prompt:
          "A block on a spring feels a restoring force \\(F = -40x\\) newtons when displaced \\(x\\) metres from rest. What is the force when the block is 0.2 m to the right of the mean position, and which way does it point?",
        steps: [
          "The defining SHM rule: force is proportional to displacement and opposite in direction.",
          "Substitute \\(x = +0.2\\): \\(F = -40(0.2) = -8\\) N.",
          "The minus sign means the force points in the \\(-x\\) direction — back toward the mean position (to the left).",
        ],
        answer: "8 N directed toward the mean position (to the left).",
      },
      selfCheckExample: {
        prompt:
          "For a simple-harmonic oscillator, at which point of the swing is the acceleration greatest, and at which point is it zero?",
        steps: [
          "Acceleration in SHM is \\(a = -\\omega^2 x\\), so its magnitude grows with displacement.",
          "It is largest where \\(|x|\\) is largest — at the extreme positions (\\(\\pm A\\)).",
          "It is zero where \\(x = 0\\) — at the mean position.",
        ],
        answer: "Greatest at the extremes (\\(x = \\pm A\\)); zero at the mean position.",
      },
      practiceSet: [
        { prompt: "In SHM the restoring force is proportional to what?", answer: "Displacement from the mean position" },
        { prompt: "In which direction does the SHM restoring force act?", answer: "Toward the mean position (opposite to displacement)" },
        { prompt: "Where in an SHM is the acceleration zero?", answer: "At the mean position (x = 0)" },
        { prompt: "Is the acceleration of an SHM oscillator constant?", answer: "No — it varies as −ω²x" },
      ],
      pyqExampleId: "6ae972dd-d4a2-4198-abd1-52dab61f4324", // 2021 — force ∝ displacement, opposite direction
      traps: [
        {
          title: "Acceleration in SHM is NOT constant",
          body:
            "A distractor claims the oscillator's acceleration is constant. It is not — \\(a = -\\omega^2 x\\) changes continuously, peaking at the extremes and vanishing at the mean position. Only the angular frequency \\(\\omega\\) is constant.",
        },
        {
          title: "The restoring force opposes the displacement",
          body:
            "The force is proportional to displacement and in the OPPOSITE direction (toward the mean position). An option saying 'force in the same direction as displacement' describes an unstable push-away, not SHM.",
        },
      ],
    },

    // 2 — period, frequency, phase
    {
      kind: "formula" as const,
      slug: "osc-period-frequency-phase",
      name: "Period, frequency, and phase",
      intuition:
        "The period T is the time for one complete swing; the frequency f is how many swings happen per second, so the two are reciprocals. The phase tells you where in the cycle the particle is. Because the motion repeats exactly every period, two instants look identical — same position and same direction of travel — only when they are a whole number of periods apart.",
      definition:
        "- **Period** \\(T\\): the least time after which the motion repeats. The motion also repeats after \\(2T, 3T, \\dots\\) — i.e. after every \\(nT\\) for positive integer \\(n\\).\n" +
        "- **Frequency** \\(f = 1/T\\): cycles per second (hertz).\n" +
        "- **Angular frequency** \\(\\omega = 2\\pi f = 2\\pi/T\\).\n" +
        "- **Phase**: the stage of the cycle. Two instants \\(t_1\\) and \\(t_2\\) are in the **same phase** (identical displacement AND direction of motion) iff \\(t_2 - t_1 = nT\\).",
      formula: {
        label: "Period, frequency, angular frequency",
        latex: "f = \\dfrac{1}{T} \\qquad \\omega = 2\\pi f = \\dfrac{2\\pi}{T}",
        symbols: [
          { symbol: "T", meaning: "period (s)" },
          { symbol: "f", meaning: "frequency (Hz)" },
          { symbol: "\\omega", meaning: "angular frequency (rad/s)" },
        ],
      },
      visualizationSlug: "osc-shm-displacement-time",
      authoredExample: {
        prompt:
          "A particle in SHM has a period of 5 s. (a) What is its frequency? (b) At t = 2 s it is at a crest moving downward. List two later instants when it is again at a crest moving downward.",
        steps: [
          "(a) \\(f = 1/T = 1/5 = 0.2\\) Hz.",
          "(b) The same phase recurs every period, i.e. after \\(nT = 5n\\) seconds.",
          "Add \\(T\\) and \\(2T\\) to \\(t = 2\\): \\(2 + 5 = 7\\) s and \\(2 + 10 = 12\\) s.",
        ],
        answer: "(a) 0.2 Hz. (b) at t = 7 s and t = 12 s (and every 5 s thereafter).",
      },
      selfCheckExample: {
        prompt:
          "A simple-harmonic motion has period T = 4 s. Are the instants t = 1 s and t = 5 s in the same phase? What about t = 1 s and t = 4 s?",
        steps: [
          "Same phase iff the gap is a whole number of periods: \\(\\Delta t = nT = 4n\\).",
          "t = 1 to t = 5: \\(\\Delta t = 4 = T\\) — yes, same phase.",
          "t = 1 to t = 4: \\(\\Delta t = 3\\), not a multiple of 4 — no, different phase.",
        ],
        answer: "t = 1 s and t = 5 s: same phase. t = 1 s and t = 4 s: different phase.",
      },
      practiceSet: [
        { prompt: "If T = 0.5 s, what is the frequency?", answer: "2 Hz", method: "f = 1/T" },
        { prompt: "Write ω in terms of f.", answer: "ω = 2πf" },
        { prompt: "Period T = 3 s. Smallest non-zero gap for the same phase?", answer: "3 s", method: "Δt = T" },
        { prompt: "Does the motion repeat after 2T?", answer: "Yes — it repeats after every nT" },
      ],
      pyqExampleId: "6e8881e3-d1a9-4d54-a640-0bbc80662861", // 2017 — ω = 2πf
      traps: [
        {
          title: "Motion repeats after EVERY nT, not 'only once' after T",
          body:
            "A favourite NDA distractor states 'the motion repeats after time T only once'. False — T is the LEAST repeat time, but the motion also repeats after 2T, 3T, … i.e. after every nT. The 'only once' wording is the wrong statement to pick when asked which is NOT correct.",
        },
        {
          title: "Same phase needs Δt = nT — count whole periods",
          body:
            "Reading a displacement-time graph, two instants are in phase only if their separation is an integer multiple of the period. Δt = T/2 gives equal displacement but OPPOSITE direction of motion — that is anti-phase, not the same phase.",
        },
      ],
    },

    // 3 — general wave properties
    {
      kind: "formula" as const,
      slug: "osc-general-wave-properties",
      name: "Shared and unique properties of waves",
      intuition:
        "Sound, ripples on water and light look very different, but as waves they share a common toolkit: each one reflects, each one carries energy from place to place, and each one exerts a pressure on what it hits. The one property that splits them apart is the need for a medium — sound and water waves must travel through matter, while light (an electromagnetic wave) sails happily through empty space.",
      definition:
        "All waves — electromagnetic, sound, and water — share three properties:\n" +
        "- **Reflection**: every wave bounces off a boundary.\n" +
        "- **Energy transport**: every wave carries energy without carrying the medium along with it.\n" +
        "- **Pressure**: every wave exerts a pressure (radiation pressure for light; wave/sound pressure for mechanical waves).\n" +
        "The dividing property: **only electromagnetic waves travel through a vacuum.** Sound and water waves are **mechanical** — they need a material medium and cannot cross empty space.",
      visualizationSlug: "osc-wave-types",
      authoredExample: {
        prompt:
          "An astronaut on the airless Moon claps two stones together a few metres from a companion. Will the companion hear the clap? Will the companion see the stones meet? Explain.",
        steps: [
          "Sound is a mechanical wave and needs a medium (air) to propagate.",
          "The Moon has no atmosphere — no medium — so the sound wave cannot travel: the companion hears nothing.",
          "Light is an electromagnetic wave and travels through vacuum, so the companion still sees the stones meet.",
        ],
        answer: "The clap is not heard (no medium for sound) but the meeting is seen (light needs no medium).",
      },
      selfCheckExample: {
        prompt:
          "Which of these is true of sound waves but NOT of light waves: (i) they reflect, (ii) they carry energy, (iii) they require a material medium?",
        steps: [
          "Reflection and energy transport are shared by all waves, including light.",
          "Requiring a material medium is the distinguishing mechanical-wave property.",
          "Light (electromagnetic) needs no medium, so (iii) is true of sound but not of light.",
        ],
        answer: "(iii) — sound requires a material medium; light does not.",
      },
      practiceSet: [
        { prompt: "Can sound travel through a vacuum?", answer: "No — it needs a material medium" },
        { prompt: "Can light travel through a vacuum?", answer: "Yes — it is an electromagnetic wave" },
        { prompt: "Do water waves carry energy?", answer: "Yes — all waves carry energy" },
        { prompt: "Which is faster, light or sound?", answer: "Light (~3×10⁸ m/s vs ~343 m/s)" },
      ],
      pyqExampleId: "73896312-e625-4e88-bd60-4836fbdb178d", // 2018 HARD — reflection/energy/pressure yes, vacuum no
      traps: [
        {
          title: "Sound and water waves cannot cross a vacuum — only light can",
          body:
            "The statement 'they can travel in vacuum' is true for electromagnetic waves but FALSE for sound and water waves. When a question groups all three wave types, the vacuum-travel option must be excluded — it is the trap that turns '1, 2, 3 and 4' into the wrong answer.",
        },
        {
          title: "Lightning before thunder = light is faster, not 'sound is slower than expected'",
          body:
            "Seeing a flash before hearing the thunder shows light (~3×10⁸ m/s) outruns sound (~343 m/s) over the same distance. The conclusion is about the SPEED difference, not about the brightness or the intensity of the flash.",
        },
      ],
    },
  ],
};
