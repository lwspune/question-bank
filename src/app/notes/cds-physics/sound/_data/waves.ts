import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_SO_WAVES_NOTE: SubtopicNote = {
  subtopicName: "Waves and the Speed of Sound",
  title: "Waves and the Speed of Sound",
  oneLineDefinition:
    "Longitudinal and transverse waves, why sound needs a medium, the wave equation v = f × λ, and how fast sound travels in solids, liquids and gases.",
  whyItMatters:
    "Ten CDS questions from 2018 (I) to 2026 (I). Three ask about the two kinds of wave and why sound needs a medium, three are one-line sums on the wave equation, and four compare the speed of sound in different media or with the speed of light.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphso-wave-types",
      name: "Longitudinal and transverse waves",
      intuition:
        "A wave carries energy from place to place while the particles of the medium only shake about their own positions. If they shake back and forth along the direction the wave travels, the wave is longitudinal: think of pushing and pulling a slinky along its length. If they shake at right angles to that direction, the wave is transverse: think of flicking a rope up and down. Sound in air is longitudinal. Light is transverse, and it needs no material to travel through.",
      definition:
        "Two kinds of wave:\n" +
        "- **Longitudinal**: particles move **along** the direction of the wave. The wave is a train of **compressions and rarefactions**, which are changes in **density**. Sound in air is longitudinal, and longitudinal waves can travel in **solids, liquids and gases**.\n" +
        "- **Transverse**: particles move **perpendicular** to the direction of the wave, as **crests and troughs**. These need the medium to resist a change of **shape**, so mechanical transverse waves travel through solids (and along a liquid surface) but not through a gas.\n" +
        "- **Light** is an electromagnetic wave: its electric and magnetic fields vibrate across the direction of travel, so it is **transverse**, and it needs **no medium**.\n" +
        "- **Sound is a mechanical wave**: it needs a material medium and **cannot travel through a vacuum**.\n" +
        "- **Superposition**: where two waves meet, the displacement of each particle is the algebraic sum of the two displacements.",
      table: {
        columns: ["Wave", "Type and medium"],
        rows: [
          {
            cells: ["Sound in air", "Longitudinal: compressions and rarefactions; needs a medium"],
            noteAmber: "CDS 2023 (I): sound and light in air are longitudinal and transverse respectively.",
            pyqExampleId: "c27cb490-2375-4f9a-8b64-9477253f35ef",
          },
          { cells: ["Light", "Transverse electromagnetic wave; travels through a vacuum"] },
          { cells: ["Wave along a stretched string", "Transverse; needs the string"] },
          { cells: ["Ripples on water", "Transverse at the surface"] },
          {
            cells: ["Sound in a vacuum", "Cannot travel: there is no medium"],
            noteAmber: "CDS 2018 (I): sound cannot pass through a hollow pipe kept in a vacuum.",
            pyqExampleId: "17703d73-c722-41b2-875b-5739d788eea6",
          },
        ],
      },
      pyqExampleId: "3ab731ae-9d30-40f2-9a67-7a207063b335",
      selfCheckExample: {
        prompt: "An astronaut on the Moon drops a hammer onto a rock. A second astronaut standing beside her hears nothing through the empty space, but feels a faint tremor through her boots. Explain both.",
        steps: [
          "The Moon has no air, so there is no medium between the rock and the second astronaut's ears.",
          "Sound is a mechanical wave and cannot cross a vacuum, so nothing is heard through the space.",
          "The ground is a solid medium, so the vibration does travel through the rock and up through her boots.",
        ],
        answer: "Sound needs a material medium: it cannot cross the vacuum, but it does travel through the solid ground.",
      },
      practiceSet: [
        { prompt: "Is light a longitudinal or a transverse wave?", answer: "Transverse" },
        { prompt: "In a sound wave in air, what are the regions of high and low pressure called?", answer: "Compressions and rarefactions" },
        { prompt: "Can a mechanical transverse wave travel through a gas?", answer: "No: a gas cannot resist a change of shape" },
        { prompt: "Which needs a material medium to travel: sound or light?", answer: "Sound" },
      ],
      traps: [
        {
          title: "Sound and light are opposite kinds of wave",
          body: "In air, sound is **longitudinal** and light is **transverse**. An option calling them both longitudinal, both transverse, or swapping the order is the usual trap.",
        },
        {
          title: "A solid inside a vacuum still carries sound; a vacuum does not",
          body: "Sound travels through any solid, liquid or gas, including a copper wire or a glass prism. What stops it is **empty space**: the inside of a pipe in a vacuum has no medium at all.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphso-wave-equation",
      name: "The wave equation: speed, frequency and wavelength",
      intuition:
        "In one time period, a wave moves forward by exactly one wavelength. The frequency is how many waves pass each second. So in one second the wave moves forward by frequency × wavelength, and that is its speed. Every wave sum in CDS is this one line, sometimes with distance = speed × time added on.",
      definition:
        "The words and the one equation:\n" +
        "- **Frequency** \\(f\\): complete waves (oscillations) per second, in hertz (Hz). One crest plus one trough is one complete wave.\n" +
        "- **Time period** \\(T\\): time for one complete wave, \\(T = 1/f\\).\n" +
        "- **Wavelength** \\(\\lambda\\): length of one complete wave, crest to crest.\n" +
        "- **Speed**: \\(v = f\\lambda\\). The time to cover a distance \\(d\\) is \\(d/v\\).\n" +
        "- **N wavelengths** take **N periods**, so the time is \\(N/f\\) whatever the wavelength.",
      formula: {
        label: "Wave equation",
        latex: "v = f\\,\\lambda \\qquad T = \\frac{1}{f} \\qquad t = \\frac{d}{v}",
        symbols: [
          { symbol: "v", meaning: "speed of the wave, in m/s" },
          { symbol: "f", meaning: "frequency, in Hz" },
          { symbol: "\\(\\lambda\\)", meaning: "wavelength, in m" },
          { symbol: "T", meaning: "time period, in s" },
          { symbol: "t, d", meaning: "time taken and distance covered" },
        ],
      },
      authoredExample: {
        prompt: "A sound wave has a frequency of 500 Hz and a wavelength of 68 cm. Find its speed, and the time it takes to travel 1.7 km.",
        steps: [
          "Change the wavelength to metres: 68 cm = 0.68 m.",
          "Speed: \\(v = f\\lambda = 500 \\times 0.68 = 340\\) m/s.",
          "Distance in metres: 1.7 km = 1700 m.",
          "Time: \\(t = d/v = 1700/340 = 5\\) s.",
        ],
        answer: "340 m/s, and 5 s to travel 1.7 km.",
      },
      selfCheckExample: {
        prompt: "A sound of frequency 250 Hz travels a distance equal to 100 of its wavelengths. How long does this take?",
        steps: [
          "Each wavelength is covered in one time period, \\(T = 1/250\\) s.",
          "100 wavelengths take 100 periods: \\(100 \\times \\tfrac{1}{250} = 0.4\\) s.",
          "The wavelength itself is not needed.",
        ],
        answer: "0.4 s.",
      },
      pyqExampleId: "c6b2391e-f576-4fa5-87d4-041825496797",
      practiceSet: [
        { prompt: "What is the time period of a wave of frequency 50 Hz?", answer: "0.02 s", method: "\\(T = 1/f = 1/50\\)" },
        { prompt: "Sound travels at 330 m/s. What is the wavelength of a 660 Hz note?", answer: "0.5 m", method: "\\(\\lambda = v/f = 330/660\\)" },
        { prompt: "30 complete waves pass a point in 0.2 s. What is the frequency?", answer: "150 Hz", method: "\\(30/0.2\\)" },
        { prompt: "How long does sound at 300 m/s take to cover 1.5 km?", answer: "5 s", method: "\\(1500/300\\)" },
      ],
      traps: [
        {
          title: "A crest and a trough together make one wave",
          body: "Twenty crests with twenty troughs are **twenty** complete waves, not forty. Count pairs, then divide by the time to get the frequency.",
        },
        {
          title: "Convert to metres and seconds first",
          body: "A wavelength in centimetres or a distance in kilometres must be changed to metres before using \\(v = f\\lambda\\), and kilohertz to hertz. Most wrong options come from a missed factor of 100 or 1000.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphso-speed",
      name: "Speed of sound in different media",
      intuition:
        "Sound passes from particle to particle, so it goes fastest where the particles are held most tightly together and spring back hardest. That is why it is fastest in solids, slower in liquids and slowest in gases. Light is far faster still: about a million times faster than sound in air, which is why you see lightning before you hear its thunder.",
      definition:
        "What sets the speed of sound:\n" +
        "- **Solids > liquids > gases**. A stiffer medium carries sound faster: steel (about 5960 m/s) beats glass (about 3980 m/s for flint glass).\n" +
        "- In water, dissolved salt makes the medium stiffer: **sea water** (about 1531 m/s) is faster than **distilled water** (about 1498 m/s).\n" +
        "- In air, the speed **rises with temperature**: about 331 m/s at 0 °C and 346 m/s at 25 °C.\n" +
        "- **Light** in air travels at about \\(3 \\times 10^{8}\\) m/s, so a flash arrives almost at once and the sound arrives later: **thunder and lightning**.\n" +
        "- **Supersonic**: faster than sound. A source moving faster than sound leaves a cone-shaped **shock wave**, heard as a **sonic boom**.",
      table: {
        columns: ["Medium", "Speed of sound (m/s, NCERT values)"],
        rows: [
          { cells: ["Aluminium", "6420"] },
          {
            cells: ["Steel", "5960"],
            noteAmber: "CDS 2023 (II): of glass, stainless steel, water and oxygen, sound is fastest in steel.",
            pyqExampleId: "8a519f4b-078e-45af-856c-598df4160a60",
          },
          { cells: ["Glass (flint)", "3980"] },
          {
            cells: ["Sea water", "1531"],
            noteAmber: "CDS 2024 (II): sea water is faster than distilled water, drinking water or methanol.",
            pyqExampleId: "5882b7a2-12d4-413d-9bbb-f89c3909c64f",
          },
          { cells: ["Distilled water", "1498"] },
          { cells: ["Methanol", "1103"] },
          { cells: ["Air at 25 °C", "346"] },
          { cells: ["Oxygen", "316"] },
        ],
      },
      pyqExampleId: "8a519f4b-078e-45af-856c-598df4160a60",
      selfCheckExample: {
        prompt: "You see a flash of lightning and hear its thunder 3 s later. If sound travels at 340 m/s in air, about how far away was the lightning?",
        steps: [
          "Light reaches you almost at once, so the 3 s is the time the sound took.",
          "Distance = speed × time = \\(340 \\times 3 = 1020\\) m.",
        ],
        answer: "About 1 km (1020 m).",
      },
      practiceSet: [
        { prompt: "In which state of matter does sound travel slowest?", answer: "Gas" },
        { prompt: "Does the speed of sound in air rise or fall as the air gets warmer?", answer: "It rises" },
        { prompt: "What is a sonic boom?", answer: "The shock wave from a source moving faster than sound" },
        { prompt: "Why is lightning seen before its thunder is heard?", answer: "Light travels far faster than sound" },
      ],
      traps: [
        {
          title: "Denser is not the rule; stiffer is",
          body: "Sound is fastest in solids because they are **stiff** (hard to compress), not simply because they are heavy. That is why steel beats glass and sea water beats fresh water. Among gases, the lighter hydrogen carries sound faster than oxygen.",
        },
        {
          title: "A sonic boom needs a speed above the speed of sound, not light",
          body: "A sonic boom comes from a source moving **faster than sound**. Nothing with mass can move faster than light, so that option is always wrong; moving exactly at or below the speed of sound gives no boom.",
        },
      ],
    },
  ],
};
