import type { SubtopicNote } from "@/app/notes/_types";

export const EARTHQUAKES_SEISMIC_NOTE: SubtopicNote = {
  subtopicName: "Earthquakes and Seismic Waves",
  title: "Earthquakes and Seismic Waves",
  oneLineDefinition:
    "Sudden slip along a fault releases energy as seismic waves; P-waves race ahead through everything, S-waves lag and refuse to cross liquid, and the gaps they leave (shadow zones) reveal the liquid outer core.",
  whyItMatters:
    "9 PYQs, many of them HARD, but they cluster on a small set of ideas: focus vs epicentre, the order and nature of P/S/L waves, and the shadow zones. The single most powerful fact — S-waves cannot pass through liquid — is how we know the outer core is liquid, and it is tested again and again.",
  concepts: [
    // 1. focus & epicentre (formula + diagram)
    {
      kind: "formula" as const,
      slug: "focus-epicentre",
      name: "Focus, hypocentre and epicentre",
      intuition:
        "An earthquake starts at a point underground where rock finally slips — that point is the FOCUS (also called the hypocentre). The spot on the surface directly above it is the EPICENTRE, where shaking is usually strongest. Shallow quakes do more surface damage than deep ones because the energy has less distance to spread before reaching us.",
      definition:
        "- **Focus (hypocentre)** — the point INSIDE the Earth where the rupture begins and energy is released. It can be many kilometres deep.\n" +
        "- **Epicentre** — the point on the SURFACE directly above the focus.\n" +
        "- Both **P-waves and S-waves** radiate outward from the focus.\n" +
        "- **Shallow-focus** quakes are more damaging at the surface than deep-focus ones (energy reaches the surface less weakened).",
      visualizationSlug: "esl-earthquake-focus-epicentre",
      authoredExample: {
        prompt:
          "An earthquake ruptures 30 km below the ground. What do we call that rupture point, and what do we call the point on the surface right above it?",
        steps: [
          "The rupture point underground, where energy is released, is the focus (hypocentre).",
          "The surface point straight above it is the epicentre.",
        ],
        answer: "The underground point is the focus/hypocentre; the surface point above it is the epicentre.",
      },
      selfCheckExample: {
        prompt:
          "Statement: 'Deep-focus earthquakes cause more surface damage than shallow-focus ones.' True or false?",
        steps: [
          "Energy weakens as it travels from the focus to the surface.",
          "A deep focus is farther from the surface, so its energy arrives more spread out.",
          "Therefore shallow-focus quakes are MORE damaging at the surface.",
        ],
        answer: "False — shallow-focus quakes are more damaging.",
      },
      practiceSet: [
        { prompt: "The point where an earthquake's energy is first released is the?", answer: "Focus (hypocentre)" },
        { prompt: "The surface point above the focus is the?", answer: "Epicentre" },
        { prompt: "Shallow or deep focus — which is more damaging at the surface?", answer: "Shallow" },
      ],
      pyqExampleId: "85a810a7-017b-4279-a8b0-ae5a677fddc4", // hypocentre = focus, energy released, km deep
      traps: [
        {
          title: "Hypocentre is NOT on the surface",
          body:
            "A trap defines the hypocentre as 'the point on the surface nearest the focus'. Wrong — the hypocentre IS the focus, underground. The SURFACE point is the epicentre.",
        },
      ],
    },

    // 2. seismic wave types (reference + diagram)
    {
      kind: "reference" as const,
      slug: "seismic-wave-types",
      name: "P, S and L waves",
      intuition:
        "Three wave families leave the focus. P-waves (primary) are push-pull waves — fastest, first to arrive, and they travel through anything. S-waves (secondary) shake side-to-side — slower, and they cannot pass through liquids. L-waves (surface) crawl along the surface — slowest, but the most destructive. Body waves (P and S) travel through the interior; when they reach the surface they generate the surface (L) waves. All seismic waves speed up in denser material.",
      definition:
        "- **P-wave (Primary)** — longitudinal (particles vibrate along the direction of travel). FASTEST, recorded FIRST. Travels through solid, liquid AND gas.\n" +
        "- **S-wave (Secondary)** — transverse (particles vibrate at right angles to travel). Slower; CANNOT travel through liquid.\n" +
        "- **L-wave / surface wave** — travels along the surface, slowest, MOST destructive; follows the Earth's circumference; moves at a roughly constant rate.\n" +
        "- **Body waves** = P + S (travel through the interior); **surface waves** = L (generated when body waves reach surface rocks).\n" +
        "- Wave speed is HIGHER in denser materials.",
      visualizationSlug: "esl-seismic-wave-types",
      table: {
        columns: ["Wave", "Motion", "Speed / arrival", "Travels through"],
        rows: [
          {
            cells: ["**P (Primary)**", "Longitudinal (push-pull)", "Fastest · arrives first", "Solid, liquid, gas"],
            noteAmber: "NDA 2026 — P arrives before S; P is longitudinal, S is transverse.",
          },
          { cells: ["**S (Secondary)**", "Transverse (side-to-side)", "Slower · arrives second", "Solid only — NOT liquid"] },
          {
            cells: ["**L (surface)**", "Along the surface", "Slowest · most destructive", "Surface rocks only"],
            noteAmber: "NDA 2025 — L-waves follow Earth's circumference (but NOT at exactly constant speed).",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Two statements: (i) P-waves are recorded before S-waves; (ii) P-waves vibrate along the direction of travel while S-waves vibrate at right angles. Which are correct?",
        steps: [
          "P-waves are fastest, so they reach the seismograph first — (i) correct.",
          "P is longitudinal (along travel); S is transverse (perpendicular) — (ii) correct.",
        ],
        answer: "Both statements are correct.",
      },
      practiceSet: [
        { prompt: "Which seismic wave is fastest and arrives first?", answer: "P-wave" },
        { prompt: "Which body wave cannot travel through liquid?", answer: "S-wave" },
        { prompt: "Which wave is the most destructive?", answer: "L (surface) wave" },
        { prompt: "Do seismic waves travel faster in denser or lighter rock?", answer: "Denser" },
      ],
      pyqExampleId: "f45babd1-93da-4405-89e0-22c432d2c144", // P before S; P long, S transverse
      traps: [
        {
          title: "Fastest ≠ most destructive",
          body:
            "P-waves are the fastest but the LEAST destructive. The slow **L (surface) waves** do the most damage. Don't conflate speed with destructiveness.",
        },
        {
          title: "L-waves: circumference yes, constant speed no",
          body:
            "L-waves do follow the Earth's circumference, but they do NOT travel at a strictly constant rate. A 'both correct' option on those two claims is the trap — only the circumference claim holds.",
        },
      ],
    },

    // 3. shadow zones (formula + diagram)
    {
      kind: "formula" as const,
      slug: "shadow-zones",
      name: "Shadow zones and the liquid outer core",
      intuition:
        "After a quake, there are belts of the Earth's surface where certain waves never arrive — the shadow zones. They exist because the liquid outer core BLOCKS S-waves entirely and BENDS (refracts) P-waves. The pattern of who is missing where is direct proof that the outer core is liquid: S-waves vanish beyond a certain angle and never come back.",
      definition:
        "- The **liquid outer core stops S-waves** completely (a liquid cannot carry a transverse wave) and **refracts P-waves**, deflecting them.\n" +
        "- **P-wave shadow zone**: roughly **105°–145°** from the epicentre. Beyond 145°, refracted P-waves reappear.\n" +
        "- **S-wave shadow zone**: everything BEYOND ~105° (S-waves are absent over a much larger area than P-waves).\n" +
        "- So the S-wave shadow zone is **larger** than the P-wave shadow zone — and the very existence of the S-shadow proves the outer core is **liquid**.",
      visualizationSlug: "esl-seismic-shadow-zones",
      authoredExample: {
        prompt:
          "Why does the existence of an S-wave shadow zone tell us the outer core is liquid?",
        steps: [
          "S-waves are transverse and cannot travel through a liquid.",
          "If the outer core were solid, S-waves would pass straight through and reach the far side.",
          "Instead they disappear beyond ~105° — they are being blocked.",
          "The only material that blocks S-waves like this is a liquid, so the outer core must be liquid.",
        ],
        answer: "Because S-waves cannot cross a liquid, their disappearance proves the outer core is liquid.",
      },
      selfCheckExample: {
        prompt:
          "Two claims about shadow zones: (i) the 105°–145° belt is the shadow zone for BOTH P and S waves; (ii) the P-wave shadow zone is much larger than the S-wave one. Which are correct?",
        steps: [
          "The 105°–145° belt is specifically the P-wave shadow zone, not a shared one — (i) wrong.",
          "S-waves are missing everywhere beyond ~105°, a far larger area, so the S shadow is the LARGER one — (ii) wrong.",
        ],
        answer: "Neither statement is correct.",
      },
      practiceSet: [
        { prompt: "Which wave is blocked entirely by the outer core?", answer: "S-wave" },
        { prompt: "The P-wave shadow zone lies between which angles?", answer: "About 105° and 145°" },
        { prompt: "Which shadow zone is larger, P or S?", answer: "S-wave shadow zone" },
      ],
      pyqExampleId: "62199b79-2faa-415b-85d9-ac6ce91d5f6d", // shadow zone statements (neither correct)
      traps: [
        {
          title: "The S-shadow is the BIGGER one",
          body:
            "It feels natural to say the P-wave shadow is larger, but it is the reverse: S-waves are absent over a much wider belt (everything past ~105°), so the **S-wave shadow zone is larger**.",
        },
      ],
    },
  ],
};
