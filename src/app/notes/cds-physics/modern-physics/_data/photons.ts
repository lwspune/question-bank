import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_MO_PHOTONS_NOTE: SubtopicNote = {
  subtopicName: "Photons and X-rays",
  title: "Photons and X-rays",
  oneLineDefinition:
    "Light as photons with energy and momentum, atoms that absorb and give out exact frequencies (the atomic clock), and what X-rays are, what they do and what they are used for.",
  whyItMatters:
    "Seven CDS questions from 2016 (II) to 2026 (II), five of them MODERATE. Five are about X-rays, and three of those ask the same thing: whether an electric or a magnetic field can bend an X-ray beam (2020 (I), 2025 (II) and 2026 (I)). The other two ask for a photon's energy from its momentum and how an atomic clock works.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsphmo-photon",
      name: "Photons: energy, momentum and atomic energy levels",
      intuition:
        "Light comes in small packets called photons. A photon has no rest mass, but it carries energy and momentum. The higher its frequency (the shorter its wavelength), the more energy it carries, so a blue photon has more energy than a red one. An atom can only sit at certain energy levels, so it takes in or gives out photons of exact frequencies only. An atomic clock counts the waves of one such frequency.",
      definition:
        "The rules:\n" +
        "- Photon energy \\(E = h\\nu = \\dfrac{hc}{\\lambda}\\), with \\(h = 6.63 \\times 10^{-34}\\) J s. A handy form: \\(E\\,(\\text{eV}) = \\dfrac{1240}{\\lambda\\,(\\text{nm})}\\).\n" +
        "- A photon has **zero rest mass** and momentum \\(p = \\dfrac{E}{c} = \\dfrac{h}{\\lambda}\\). So a photon of momentum \\(x\\) MeV/\\(c\\) has energy \\(x\\) MeV.\n" +
        "- **Shorter wavelength, higher frequency, more energy**: radio < visible < X-rays < gamma rays.\n" +
        "- An atom jumping between two energy levels gives out or takes in a photon with \\(h\\nu\\) equal to the gap.\n" +
        "- **Atomic clock**: counts the exact resonant frequency of an atom, usually **caesium-133** (or rubidium). Since 1967 the second has been defined as 9,192,631,770 cycles of the caesium-133 radiation.",
      formula: {
        label: "Photon energy and momentum",
        latex: "E = h\\nu = \\dfrac{hc}{\\lambda} \\qquad p = \\dfrac{E}{c} = \\dfrac{h}{\\lambda} \\qquad E\\,(\\text{eV}) = \\dfrac{1240}{\\lambda\\,(\\text{nm})}",
        symbols: [
          { symbol: "h", meaning: "Planck's constant, 6.63 × 10⁻³⁴ J s" },
          { symbol: "ν", meaning: "frequency of the light" },
          { symbol: "λ", meaning: "wavelength" },
          { symbol: "p", meaning: "momentum of the photon" },
        ],
      },
      authoredExample: {
        prompt:
          "Green light has a wavelength of 500 nm. Find the energy of one photon in electron-volts and in joules, and its momentum in eV/c.",
        steps: [
          "\\(E = \\dfrac{1240}{500} = 2.48\\) eV.",
          "In joules: \\(2.48 \\times 1.6 \\times 10^{-19} \\approx 3.97 \\times 10^{-19}\\) J.",
          "Momentum: \\(p = E/c = 2.48\\) eV/\\(c\\).",
        ],
        answer: "2.48 eV (about \\(4 \\times 10^{-19}\\) J); momentum 2.48 eV/c.",
      },
      selfCheckExample: {
        prompt: "What is the wavelength of a photon of energy 3.1 eV, and what colour of light is it near?",
        steps: [
          "\\(\\lambda = \\dfrac{1240}{3.1} = 400\\) nm.",
          "400 nm is at the violet end of visible light.",
        ],
        answer: "400 nm, violet.",
      },
      pyqExampleId: "52ef6752-d507-4122-8239-c26539b49979",
      practiceSet: [
        { prompt: "What is the rest mass of a photon?", answer: "Zero" },
        { prompt: "Which photon carries more energy: one of red light or one of blue light?", answer: "Blue light, because its wavelength is shorter" },
        { prompt: "The wavelength of a photon is halved. What happens to its energy?", answer: "It doubles", method: "\\(E \\propto 1/\\lambda\\)" },
        { prompt: "Which atom is used in most atomic clocks?", answer: "Caesium-133 (rubidium in some)" },
      ],
      traps: [
        {
          title: "For a photon, energy is momentum times c",
          body: "A photon has **no rest mass**, so \\(\\tfrac{1}{2}mv^{2}\\) does not apply. Use \\(E = pc\\): a momentum in MeV/\\(c\\) gives the same number in MeV.",
        },
        {
          title: "Shorter wavelength means more energy",
          body: "\\(E = hc/\\lambda\\): halving the wavelength **doubles** the energy. X-rays and gamma rays carry far more energy per photon than visible light.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphmo-xrays",
      name: "X-rays: what they are and what they do",
      intuition:
        "X-rays are light of a very short wavelength, made when fast electrons slam into a metal target. They carry no charge, so electric and magnetic fields cannot bend them. They pass through flesh but are stopped by bone and metal, which is why a bone shows up on an X-ray picture and why metal objects spoil it.",
      definition:
        "What to know:\n" +
        "- Found by **Wilhelm Röntgen in 1895**. Made when fast electrons strike a heavy metal target.\n" +
        "- **Electromagnetic waves** of wavelength about 0.01 to 10 nm, far shorter than visible light (400 to 700 nm).\n" +
        "- **No charge**, so **neither an electric nor a magnetic field** deflects them.\n" +
        "- Pass through soft tissue; **bone and metal** (dense, heavy atoms) absorb them strongly.\n" +
        "- Uses: medical pictures and CT scans, checking **welds and castings** for hidden cracks, finding the **arrangement of atoms in crystals** (X-ray diffraction, since their wavelength is close to the gap between atoms), airport baggage checks.\n" +
        "- They are **ionising** and can harm cells, so staff stand behind **lead** screens.",
      table: {
        columns: ["Property or use", "Fact"],
        rows: [
          { cells: ["Nature", "Electromagnetic waves with no charge"] },
          {
            cells: ["Electric and magnetic fields", "Do not deflect X-rays"],
            noteAmber: "Asked in 2020 (I), 2025 (II) and 2026 (I): neither an electric nor a magnetic field bends X-rays.",
            pyqExampleId: "b55bc98f-3f2c-4503-82c9-069ef6236a30",
          },
          { cells: ["Wavelength", "About 0.01 to 10 nm, much shorter than visible light"] },
          { cells: ["Penetration", "Pass through flesh; stopped by bone and metal"] },
          {
            cells: ["Metal objects during a scan", "Block or reflect the beam, leaving a bright or dark patch that hides the body part"],
            noteAmber: "CDS 2026 (II): metal is removed because it spoils the image.",
            pyqExampleId: "314e821d-7abc-445a-85d3-207015d7c728",
          },
          {
            cells: ["Welds, castings and crystals", "Show hidden cracks; reveal how atoms are arranged"],
            noteAmber: "CDS 2024 (II): checking welded joints and studying crystals are both uses.",
            pyqExampleId: "78a261c7-e3b3-4f06-bbc1-ac244556c7a6",
          },
        ],
      },
      pyqExampleId: "d6ffe944-5370-4865-a634-ab7b6a1d5ae2",
      selfCheckExample: {
        prompt: "On an X-ray film, why does a bone look white while the flesh around it looks dark?",
        steps: [
          "Bone absorbs X-rays strongly, so few reach the film behind it and that part stays light.",
          "Flesh lets most X-rays through, so the film behind it is darkened.",
        ],
        answer: "Bone stops the X-rays; flesh lets them through to darken the film.",
      },
      practiceSet: [
        { prompt: "Who discovered X-rays, and in which year?", answer: "Wilhelm Röntgen, in 1895" },
        { prompt: "Why can X-rays reveal how the atoms in a crystal are arranged?", answer: "Their wavelength is close to the gap between the atoms, so the crystal diffracts them" },
        { prompt: "Why does an X-ray technician stand behind a lead screen?", answer: "X-rays are ionising and harmful, and lead absorbs them" },
        { prompt: "Which has the shorter wavelength: X-rays or visible light?", answer: "X-rays" },
      ],
      traps: [
        {
          title: "No charge, no bending",
          body: "X-rays are **electromagnetic waves**, not charged particles. A field bends a beam of electrons, but **neither an electric nor a magnetic field** bends X-rays.",
        },
        {
          title: "Metal is removed to save the picture",
          body: "Metal **blocks** X-rays and leaves a patch on the image that hides the body part. It does not melt, spark or get changed by the X-rays.",
        },
      ],
    },
  ],
};
