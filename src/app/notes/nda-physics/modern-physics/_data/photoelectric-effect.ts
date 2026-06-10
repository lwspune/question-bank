import type { SubtopicNote } from "@/app/notes/_types";

export const PHOTOELECTRIC_EFFECT_NOTE: SubtopicNote = {
  subtopicName: "Photoelectric Effect",
  title: "Photoelectric Effect: Light as Particles",
  oneLineDefinition:
    "When light of high enough frequency strikes a metal surface, it ejects electrons instantly; the energy of each ejected electron depends on the light's frequency (colour), not its brightness.",
  whyItMatters:
    "This is the gateway to all of modern physics: it is the experiment that forced light to be treated as particles (photons), each carrying energy E = hf. " +
    "The NDA tests it three ways — the name of the phenomenon, who explained it (Einstein, who won the Nobel for exactly this), and one-step plug-ins using E = hf or the X-ray cutoff wavelength. " +
    "Four PYQs, all EASY or MODERATE.",
  concepts: [
    // Concept 1 — FOUNDATION: photon and dual nature
    {
      kind: "formula" as const,
      slug: "photon-and-energy",
      name: "The photon — light carries energy in discrete packets E = hf",
      intuition:
        "Before modern physics, light was purely a wave. The photoelectric effect showed light also behaves as a stream of particles called photons. " +
        "Each photon carries a fixed packet of energy that depends only on the light's frequency: high-frequency light (violet, ultraviolet, X-rays) has high-energy photons; low-frequency light (red, infrared) has low-energy photons. " +
        "Brightness just means MORE photons, not more energetic ones.",
      definition:
        "Light is made of **photons**, each carrying energy:\n" +
        "- Energy per photon: \\(E = hf = \\dfrac{hc}{\\lambda}\\), where \\(f\\) is frequency, \\(\\lambda\\) is wavelength, \\(c\\) is the speed of light.\n" +
        "- **Planck's constant** \\(h \\approx 6.63 \\times 10^{-34}\\) J·s — the dimensions of \\(h\\) are those of **angular momentum** (J·s = energy x time).\n" +
        "- Higher frequency = shorter wavelength = **more energy per photon**. So among radio, light, and X-rays, **X-rays carry the most energy per photon**.\n" +
        "- This particle picture of light is its **dual nature** — light is both wave and particle.",
      formula: {
        label: "Energy of a photon",
        latex: "E = hf = \\dfrac{hc}{\\lambda}",
        symbols: [
          { symbol: "E", meaning: "energy of one photon (J)" },
          { symbol: "h", meaning: "Planck's constant, 6.63 x 10⁻³⁴ J·s" },
          { symbol: "f", meaning: "frequency of the light (Hz)" },
          { symbol: "c", meaning: "speed of light, 3 x 10⁸ m/s" },
          { symbol: "λ", meaning: "wavelength of the light (m)" },
        ],
      },
      visualizationSlug: "mp-photoelectric-setup",
      authoredExample: {
        prompt:
          "Among radio waves, visible light, and X-rays, which carries the maximum energy per photon?",
        steps: [
          "Energy per photon is \\(E = hf\\) — it grows with frequency.",
          "Order by frequency: radio waves (lowest) < visible light < X-rays (highest).",
          "Therefore X-rays, having the highest frequency, carry the most energy per photon.",
        ],
        answer: "X-rays carry the maximum energy per photon.",
      },
      selfCheckExample: {
        prompt:
          "Photon A has twice the frequency of photon B. How do their energies compare?",
        steps: [
          "Energy is \\(E = hf\\), directly proportional to frequency.",
          "Doubling the frequency doubles the energy.",
        ],
        answer: "Photon A has twice the energy of photon B.",
      },
      practiceSet: [
        { prompt: "What is the energy of a single photon equal to?", answer: "\\(E = hf\\)", method: "Planck's relation; h is Planck's constant, f is frequency" },
        { prompt: "Which has the most energy per photon: infrared, visible light, or ultraviolet?", answer: "Ultraviolet", method: "highest frequency among the three" },
        { prompt: "The dimensions of Planck's constant h are the same as which quantity?", answer: "Angular momentum", method: "[h] = J·s = energy x time = angular momentum" },
        { prompt: "If wavelength increases, does photon energy increase or decrease?", answer: "Decreases", method: "\\(E = hc/\\lambda\\), inversely proportional to wavelength" },
      ],
      pyqExampleId: "5f711290-1913-4a72-b39f-6b1a393ca1b7", // 2017 — X-rays max energy per photon
      traps: [
        {
          title: "Brightness does NOT change photon energy",
          body:
            "Making light brighter sends MORE photons per second, but each photon still carries the same energy \\(E = hf\\). " +
            "To raise the energy per photon you must raise the frequency (shift toward blue/UV/X-ray), not turn up the intensity.",
        },
        {
          title: "Energy grows with frequency, falls with wavelength",
          body:
            "\\(E = hf = hc/\\lambda\\). Since \\(f\\) and \\(\\lambda\\) are inversely related, an option saying \"longer wavelength = more energy\" is always wrong. Long wavelength (red, radio) = low energy.",
        },
      ],
    },

    // Concept 2 — photoelectric emission basics
    {
      kind: "formula" as const,
      slug: "photoelectric-emission",
      name: "Photoelectric emission — light ejecting electrons from a metal",
      intuition:
        "Shine light on a clean metal surface and, if the light's frequency is high enough, electrons are knocked out of the metal almost instantly. " +
        "These ejected electrons are called photoelectrons, and the whole phenomenon is photoelectric emission. " +
        "There is a minimum frequency (the threshold) below which NO electrons come out, however bright the light.",
      definition:
        "**Photoelectric emission** is the ejection of electrons from a metal surface when light of a sufficiently high frequency falls on it.\n" +
        "- The emitted electrons are called **photoelectrons**.\n" +
        "- There is a **threshold frequency** for each metal — below it, no emission occurs no matter how intense the light.\n" +
        "- Above threshold, emission is **instantaneous** and the number of photoelectrons rises with the light's intensity (brightness).",
      authoredExample: {
        prompt:
          "What is the emission of electrons from a metallic surface by the application of light called?",
        steps: [
          "Light supplies photons to the metal surface.",
          "When a photon's energy exceeds the metal's threshold, an electron is ejected.",
          "This process — electron ejection by light — is named photoelectric emission.",
        ],
        answer: "Photoelectric emission (or the photoelectric effect).",
      },
      selfCheckExample: {
        prompt:
          "A metal does not emit electrons under bright red light but emits them under dim violet light. Why?",
        steps: [
          "Red light has low frequency; its photons fall below the metal's threshold frequency, so no emission — brightness cannot help.",
          "Violet light has high frequency; each photon clears the threshold, so electrons are ejected even when the light is dim.",
        ],
        answer:
          "Emission depends on frequency, not brightness. Violet clears the threshold frequency; red does not.",
      },
      practiceSet: [
        { prompt: "What are the electrons ejected by light called?", answer: "Photoelectrons" },
        { prompt: "Does increasing the brightness of below-threshold light cause emission?", answer: "No", method: "below threshold frequency, no emission at any intensity" },
        { prompt: "Emission of electrons from a metal by light is called what?", answer: "Photoelectric emission" },
        { prompt: "Above the threshold, what does raising intensity increase?", answer: "The number of photoelectrons", method: "more photons per second = more electrons per second" },
      ],
      pyqExampleId: "cd63e113-3c83-4c88-93ba-5692512d9beb", // 2017 — photoelectric emission name
      traps: [
        {
          title: "Threshold is about FREQUENCY, not intensity",
          body:
            "A bright low-frequency beam ejects zero electrons; a faint high-frequency beam ejects them at once. The deciding factor is whether each photon clears the threshold frequency — never the brightness.",
        },
      ],
    },

    // Concept 3 — Einstein's explanation
    {
      kind: "reference" as const,
      slug: "einstein-photoelectric-explanation",
      name: "Who explained the photoelectric effect — Einstein and the Nobel Prize",
      intuition:
        "The experiment was a puzzle for classical physics, which predicted brighter light should always eject electrons. " +
        "Albert Einstein explained it in 1905 using the photon idea: one photon gives all its energy to one electron, so frequency (photon energy), not brightness, decides emission. " +
        "He won the 1921 Nobel Prize in Physics for this — not for relativity. This is a favourite recall question.",
      definition:
        "**Albert Einstein** explained the photoelectric effect (1905) by treating light as photons, each delivering energy \\(hf\\) to a single electron. He received the **1921 Nobel Prize in Physics** for this explanation.",
      table: {
        columns: ["Person / idea", "Contribution"],
        rows: [
          {
            cells: ["**Albert Einstein**", "Explained the photoelectric effect using the photon/quantum idea (1905)"],
            noteAmber: "NDA 2019 — the photoelectric effect was explained by Albert Einstein (not Bohr, Planck, or Rutherford).",
          },
          { cells: ["**Max Planck**", "Introduced energy quanta \\(E = hf\\) (Planck's constant); the quantum seed Einstein used"] },
          { cells: ["**Heinrich Hertz**", "First OBSERVED the photoelectric effect experimentally (but did not explain it)"] },
        ],
        caption:
          "Distinguish the OBSERVER (Hertz) from the EXPLAINER (Einstein). The exam asks who explained it — that is Einstein.",
      },
      selfCheckExample: {
        prompt:
          "Who among Bohr, Einstein, Rutherford, and Newton explained the photoelectric effect, and what award did it earn?",
        steps: [
          "The photoelectric effect was explained by Albert Einstein using the photon picture in 1905.",
          "It earned him the 1921 Nobel Prize in Physics.",
        ],
        answer: "Albert Einstein; the 1921 Nobel Prize in Physics.",
      },
      practiceSet: [
        { prompt: "Who explained the phenomenon of the photoelectric effect?", answer: "Albert Einstein" },
        { prompt: "For which work did Einstein receive his Nobel Prize?", answer: "Explaining the photoelectric effect" },
        { prompt: "Who first experimentally observed the photoelectric effect?", answer: "Heinrich Hertz", method: "observed it; Einstein explained it" },
        { prompt: "Whose energy-quantum idea (E = hf) did Einstein build on?", answer: "Max Planck" },
      ],
      pyqExampleId: "6dd3e5b6-4084-4fb8-bef1-91f70845bd28", // 2019 — Einstein explained photoelectric effect
      traps: [
        {
          title: "Einstein's Nobel was for the photoelectric effect, NOT relativity",
          body:
            "A classic distractor pairs Einstein's Nobel Prize with relativity. The 1921 Nobel Prize was awarded specifically for his explanation of the photoelectric effect.",
        },
        {
          title: "Observed vs explained",
          body:
            "Hertz observed the effect; Einstein explained it. The exam wording \"explained the phenomenon\" points to Einstein.",
        },
      ],
    },

    // Concept 4 — cutoff wavelength / E = hf plug-ins
    {
      kind: "formula" as const,
      slug: "cutoff-wavelength",
      name: "Cutoff wavelength and the energy-voltage link",
      intuition:
        "In an X-ray tube, electrons are accelerated through a voltage V, gaining energy eV, and then smash into a target to make X-rays. " +
        "The most energetic X-ray photon possible carries all of that energy, which fixes the SHORTEST wavelength produced — the cutoff wavelength. " +
        "Because energy and wavelength are inversely related, raising the voltage shortens the cutoff wavelength.",
      definition:
        "The **cutoff (minimum) wavelength** of X-rays from a tube run at accelerating voltage \\(V\\) is set by equating the electron's energy to the maximum photon energy:\n" +
        "- \\(eV = \\dfrac{hc}{\\lambda_{min}}\\), so \\(\\lambda_{min} = \\dfrac{hc}{eV}\\).\n" +
        "- \\(\\lambda_{min}\\) is **inversely proportional to V** — double the voltage and the cutoff wavelength is **halved**.",
      formula: {
        label: "Cutoff wavelength of X-rays",
        latex: "\\lambda_{min} = \\dfrac{hc}{eV}",
        symbols: [
          { symbol: "λ_min", meaning: "shortest (cutoff) wavelength produced" },
          { symbol: "h", meaning: "Planck's constant" },
          { symbol: "c", meaning: "speed of light" },
          { symbol: "e", meaning: "electron charge" },
          { symbol: "V", meaning: "accelerating voltage of the tube" },
        ],
      },
      authoredExample: {
        prompt:
          "The voltage applied to an X-ray tube is doubled, with the filament-target separation unchanged. What happens to the cutoff wavelength?",
        steps: [
          "Cutoff wavelength is \\(\\lambda_{min} = \\dfrac{hc}{eV}\\) — inversely proportional to \\(V\\).",
          "Doubling \\(V\\) multiplies the denominator by 2.",
          "So \\(\\lambda_{min}\\) becomes half of its original value.",
        ],
        answer: "The cutoff wavelength is halved.",
      },
      selfCheckExample: {
        prompt:
          "If the X-ray tube voltage is reduced to one-third, what happens to the cutoff wavelength?",
        steps: [
          "\\(\\lambda_{min} \\propto 1/V\\).",
          "Reducing \\(V\\) to \\(V/3\\) multiplies \\(\\lambda_{min}\\) by 3.",
        ],
        answer: "The cutoff wavelength becomes three times larger.",
      },
      practiceSet: [
        { prompt: "Cutoff wavelength is proportional to what power of the tube voltage?", answer: "\\(1/V\\) (inversely proportional)" },
        { prompt: "Double the tube voltage: cutoff wavelength becomes?", answer: "Halved" },
        { prompt: "Halve the tube voltage: cutoff wavelength becomes?", answer: "Doubled" },
        { prompt: "What energy does an electron gain crossing a voltage V?", answer: "\\(eV\\)", method: "charge times potential difference" },
      ],
      pyqExampleId: "630781b0-948d-46ea-9654-b602ce4f11bc", // 2017 MOD — X-ray cutoff wavelength doubled voltage
      traps: [
        {
          title: "Cutoff wavelength is inversely related to voltage",
          body:
            "Double V does NOT double the wavelength — it halves it. The energy goes up, and higher energy means shorter wavelength. Distractors offering \"doubled\" or \"four times\" reverse the relationship.",
        },
      ],
    },
  ],
};
