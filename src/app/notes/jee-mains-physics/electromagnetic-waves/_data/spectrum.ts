import type { SubtopicNote } from "@/app/notes/_types";

export const SPECTRUM_EMW_NOTE: SubtopicNote = {
  subtopicName: "Electromagnetic Spectrum: Order, Sources and Uses",
  title: "Electromagnetic Spectrum: Order, Sources and Uses",
  oneLineDefinition:
    "Electromagnetic waves run from γ-rays to radio waves in order of increasing wavelength, and each band has its own way of being produced and its own uses.",
  whyItMatters:
    "Sixteen PYQs, all multiple choice, and two from 2026. Nine ask for the order of the bands or their wavelength ranges, sometimes after a short calculation that turns a frequency or a photon rate into a wavelength. Seven match a band to how it is produced or what it is used for. These are recall marks: the two tables on this page cover every one of them.",
  concepts: [
    // C1 — order and ranges
    {
      kind: "reference" as const,
      slug: "jpemw-spectrum-order",
      name: "Order and wavelength ranges of the electromagnetic spectrum",
      intuition:
        "Every band is the same kind of wave, travelling at c in vacuum; only the wavelength differs. Line them up from shortest to longest and the frequency and the photon energy fall in the same order. Learn the seven names in order and the rough edge of each band.",
      definition:
        "- Increasing wavelength: γ-rays, X-rays, ultraviolet, visible, infrared, microwaves, radio waves. Increasing frequency is the reverse order.\n" +
        "- Visible light runs from violet (about 400 nm) to red (about 700 nm). Colours differ in both frequency and wavelength.\n" +
        "- From a frequency to a band: \\(\\lambda = c/f\\).\n" +
        "- Photon energy \\(E = hf = hc/\\lambda\\), about \\(1240/\\lambda\\) eV with \\(\\lambda\\) in nm. From a source of power P emitting N photons per second, \\(\\lambda = hcN/P\\).\n" +
        "- The edges are rough and neighbouring bands overlap; X-rays and γ-rays overlap most, and are told apart by their source.",
      table: {
        columns: ["Band", "Wavelength range", "Frequency range", "Photon energy"],
        rows: [
          { cells: ["γ-rays", "shorter than 10⁻³ nm", "above 3 × 10²⁰ Hz", "above 1.24 MeV"] },
          { cells: ["X-rays", "1 nm to 10⁻³ nm", "3 × 10¹⁷ to 3 × 10²⁰ Hz", "1.24 keV to 1.24 MeV"], noteAmber: "Shorter than ultraviolet, longer than γ-rays." },
          { cells: ["Ultraviolet", "400 nm to 1 nm", "7.5 × 10¹⁴ to 3 × 10¹⁷ Hz", "3.1 eV to 1.24 keV"] },
          { cells: ["Visible", "700 nm to 400 nm", "4.3 × 10¹⁴ to 7.5 × 10¹⁴ Hz", "1.8 eV to 3.1 eV"] },
          { cells: ["Infrared", "1 mm to 700 nm", "3 × 10¹¹ to 4.3 × 10¹⁴ Hz", "1.24 meV to 1.8 eV"] },
          { cells: ["Microwaves", "0.1 m to 1 mm", "3 × 10⁹ to 3 × 10¹¹ Hz", "12.4 µeV to 1.24 meV"] },
          { cells: ["Radio waves", "longer than 0.1 m", "below 3 × 10⁹ Hz", "below 12.4 µeV"] },
        ],
        caption: "Wavelength rises down the table; frequency and photon energy fall.",
      },
      selfCheckExample: {
        prompt:
          "A monochromatic source of power 20 W emits \\(5 \\times 10^{19}\\) photons per second. To which band does its radiation belong? (\\(h = 6.6 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Each photon carries \\(P/N\\), and \\(hc/\\lambda = P/N\\), so \\(\\lambda = \\dfrac{hcN}{P}\\).",
          "\\(\\lambda = \\dfrac{6.6 \\times 10^{-34} \\times 3 \\times 10^{8} \\times 5 \\times 10^{19}}{20} = 4.95 \\times 10^{-7}\\) m, about 495 nm.",
          "That lies between 400 nm and 700 nm.",
        ],
        answer: "Visible light.",
      },
      practiceSet: [
        { prompt: "Find the wavelength of a 10 GHz wave and name its band.", answer: "3 cm; microwaves" },
        { prompt: "Which has the higher frequency, infrared or ultraviolet?", answer: "Ultraviolet" },
        { prompt: "Arrange radio waves, visible light and X-rays in increasing order of frequency.", answer: "Radio waves, visible light, X-rays" },
        { prompt: "A photon has an energy of 50 keV. Name its band.", answer: "X-rays", method: "\\(\\lambda \\approx 1240/50000\\) nm \\(\\approx 0.025\\) nm." },
      ],
      pyqExampleId: "8fd1ac42-d37f-4ba0-ba89-d2ef15f64ffa", // 2024: γ, X, infrared, microwaves in ascending wavelength
      traps: [
        {
          title: "γ-rays are shorter than X-rays",
          body: "In an order question γ-rays come first, with the shortest wavelength. Swapping γ-rays and X-rays is the commonest wrong option.",
        },
        {
          title: "More energetic means shorter wavelength",
          body: "A higher photon energy means a higher frequency and a shorter wavelength. Infrared is more energetic than microwaves, so light used in optical fibres has a shorter wavelength than radar microwaves.",
        },
        {
          title: "Convert each end of a band separately",
          body: "Wavelength goes as 1/f, so a range of frequencies does not turn into a range of wavelengths by converting the difference. Find λ = c/f at each end, then subtract.",
        },
      ],
    },

    // C2 — sources and uses
    {
      kind: "reference" as const,
      slug: "jpemw-spectrum-uses",
      name: "Sources, detectors and uses of each band",
      intuition:
        "Each band comes from a process whose energy matches its photons. Slow, large-scale charge motion in aerials gives radio waves; vibrating molecules give infrared; electrons jumping between outer levels give light; electrons falling into deep inner shells give X-rays; and the nucleus itself gives γ-rays. Learn the source with the band, and most uses follow from the energy.",
      definition:
        "- Radio waves: rapid acceleration and deceleration of electrons in aerials.\n" +
        "- Microwaves: special valves, the klystron, the magnetron and the Gunn diode.\n" +
        "- Infrared: vibrations of atoms and molecules; every hot body.\n" +
        "- Visible and ultraviolet: electrons in atoms dropping from a higher energy level to a lower one; ultraviolet also from very hot bodies such as the sun.\n" +
        "- X-rays: inner-shell electrons moving to a lower level, as when fast electrons strike a metal target in an X-ray tube.\n" +
        "- γ-rays: radioactive decay of nuclei.",
      table: {
        columns: ["Band", "Produced by", "Detected by", "Main uses"],
        rows: [
          { cells: ["Radio waves", "Rapid acceleration and deceleration of electrons in aerials", "Receiving aerials", "Radio and television broadcasting, mobile communication"] },
          { cells: ["Microwaves", "Klystron valve, magnetron valve, Gunn diode", "Point-contact diodes", "Radar, aircraft navigation, microwave ovens"], noteAmber: "Klystron and magnetron both mean microwaves." },
          { cells: ["Infrared", "Vibrations of atoms and molecules; hot bodies", "Thermopiles, bolometers, infrared photographic film", "Physiotherapy heat lamps, greenhouse effect, remote controls, seeing through fog"] },
          { cells: ["Visible light", "Electrons in atoms dropping between outer energy levels", "The eye, photocells, photographic film", "Vision, photography, optical communication"] },
          { cells: ["Ultraviolet", "Electron transitions in atoms; the sun and arc lamps", "Photocells, photographic film", "Sterilising surgical instruments, purifying water, Lasik eye surgery"] },
          { cells: ["X-rays", "Inner-shell electron transitions; fast electrons striking a metal target", "Photographic film, Geiger tubes, ionisation chambers", "Medical diagnosis, cancer treatment, study of crystal structure"], noteAmber: "A metal target hit by fast electrons gives X-rays, not γ-rays." },
          { cells: ["γ-rays", "Radioactive decay of nuclei", "Photographic film, Geiger tubes, ionisation chambers", "Destroying cancer cells, sterilising medical equipment"] },
        ],
        caption: "The source sets the band: the deeper inside the atom, the shorter the wavelength.",
      },
      selfCheckExample: {
        prompt:
          "Name the band, and how it is produced, that you would use to (a) locate an aircraft by its echo, (b) disinfect drinking water, and (c) photograph a broken bone.",
        steps: [
          "(a) Radar uses microwaves, produced by a klystron or magnetron valve.",
          "(b) Ultraviolet kills germs; it comes from electron transitions in atoms, for example in an arc lamp.",
          "(c) X-rays pass through soft tissue; they come from fast electrons striking a metal target.",
        ],
        answer: "(a) Microwaves; (b) ultraviolet; (c) X-rays.",
      },
      practiceSet: [
        { prompt: "Which band is produced by the vibrations of atoms and molecules?", answer: "Infrared" },
        { prompt: "A klystron valve produces radiation in which band?", answer: "Microwaves" },
        { prompt: "Which band do physiotherapy heat lamps use?", answer: "Infrared" },
        { prompt: "Which band comes from the radioactive decay of nuclei?", answer: "γ-rays" },
      ],
      pyqExampleId: "d810d871-87bb-40fb-946d-38db467b5635", // 2026: match radio, microwave, infrared, X-ray to their sources
      traps: [
        {
          title: "Inner shells give X-rays, the nucleus gives γ-rays",
          body: "Both bands are very short, but X-rays come from electrons falling into inner shells of an atom, and γ-rays come from the decay of a nucleus. A match list pairs each with the other's source.",
        },
        {
          title: "Radar uses microwaves",
          body: "Radar and aircraft navigation work with microwaves, not radio waves. The short wavelength gives a sharp beam and a clear echo.",
        },
        {
          title: "The greenhouse effect is infrared",
          body: "The earth radiates infrared, and the atmosphere traps part of it. The greenhouse effect belongs with infrared, not ultraviolet.",
        },
        {
          title: "Ultraviolet sterilises, X-rays image",
          body: "Ultraviolet kills germs on instruments and in water but does not pass through the body. X-rays pass through soft tissue, so they are the band for medical images.",
        },
      ],
    },
  ],
};
