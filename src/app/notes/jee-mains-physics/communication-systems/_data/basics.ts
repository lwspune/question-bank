import type { SubtopicNote } from "@/app/notes/_types";

export const BASICS_COMM_NOTE: SubtopicNote = {
  subtopicName: "Communication Systems, Bands and Antenna Size",
  title: "Communication Systems, Bands and Antenna Size",
  oneLineDefinition:
    "A message travels from transmitter to receiver through a channel; each service has its own frequency band and way of travelling, and an antenna must be at least a quarter of a wavelength long.",
  whyItMatters:
    "Twenty PYQs, nineteen of them multiple choice: four from 2021, seven from 2022 and nine from 2023. Five are about the parts of a system and the bandwidths of signals and media, six match frequency bands or atmosphere layers to NCERT's tables, and nine are about antenna size. Most are recall, so the marks go to knowing the tables exactly.",
  concepts: [
    // C1 — elements of a system, signal and medium bandwidths, channel count
    {
      kind: "formula" as const,
      slug: "jpcomm-system",
      name: "Elements of a communication system and the number of channels",
      intuition:
        "Every system has three parts: a transmitter, a channel and a receiver. The message gets weaker and picks up noise on the way, so it is amplified, and over long distances it is received and sent on again. Each message needs a band of frequencies, and a medium offers a band too. Dividing the medium's band by one message's band tells you how many messages it can carry at once.",
      definition:
        "- **Transducer**: converts one form of energy into another (a microphone turns sound into an electrical signal).\n" +
        "- **Attenuation**: loss of strength of a signal as it travels through the medium. **Amplification**: raising its strength with an amplifier.\n" +
        "- **Modulation**: putting the message onto a high-frequency carrier. **Demodulation**: taking the message back off the carrier at the receiver.\n" +
        "- **Repeater**: a receiver and a transmitter together; it picks up the signal, amplifies it and sends it on.\n" +
        "- **Noise**: unwanted signals that disturb the message. **Range**: the largest distance over which the signal is received well enough.\n" +
        "- **Analog** signals vary continuously; a **digital** signal takes only two levels, so it is a rectangular wave. **Facsimile (fax)** sends a static image of a document.\n" +
        "- Bandwidth of signals (NCERT): speech about 2.8 kHz (300 Hz to 3100 Hz), high-quality music about 20 kHz, a TV signal (picture and sound) about 6 MHz.\n" +
        "- Bandwidth of media: twisted pair a few MHz, coaxial cable up to about 750 MHz, optical fibre 1 THz to 1000 THz. A **guided medium** is a wire, a cable or an optical fibre.",
      formula: {
        label: "Number of channels",
        latex: "N = \\frac{\\text{available bandwidth}}{\\text{bandwidth of one channel}}, \\qquad f = \\frac{c}{\\lambda}",
      },
      authoredExample: {
        prompt:
          "An optical link works at a wavelength of 600 nm, and 1% of its frequency is available as bandwidth. How many channels of 5 kHz each can it carry?",
        steps: [
          "Frequency of the source: \\(f = \\dfrac{c}{\\lambda} = \\dfrac{3 \\times 10^{8}}{6 \\times 10^{-7}} = 5 \\times 10^{14}\\) Hz.",
          "Available bandwidth: \\(1\\%\\) of this is \\(5 \\times 10^{12}\\) Hz.",
          "Channels: \\(N = \\dfrac{5 \\times 10^{12}}{5 \\times 10^{3}} = 10^{9}\\).",
        ],
        answer: "\\(10^{9}\\) channels",
      },
      selfCheckExample: {
        prompt:
          "A coaxial cable offers a 400 MHz band for TV. Each TV signal needs 6 MHz. How many TV channels can the cable carry at once?",
        steps: [
          "\\(N = \\dfrac{400}{6} = 66.7\\).",
          "A channel cannot be split, so round down.",
        ],
        answer: "66 channels",
      },
      practiceSet: [
        { prompt: "Which element of a communication system converts sound into an electrical signal?", answer: "A transducer (the microphone)" },
        { prompt: "About what bandwidth does high-quality music need?", answer: "About 20 kHz" },
        { prompt: "A 500 MHz signal must be sent by cable. Twisted pair or coaxial cable?", answer: "Coaxial cable, which works up to about 750 MHz" },
        { prompt: "How many 3 kHz speech channels fit in a 1 MHz band?", answer: "333" },
      ],
      pyqExampleId: "86a00657-b051-4f67-a0e4-ead0f0b2bcd7", // 2022: 1000 nm source, 2% usable, 8 kHz audio channels
      traps: [
        {
          title: "Find the frequency before taking the percentage",
          body: "When a source is given by its wavelength, first find \\(f = c/\\lambda\\). The percentage is a share of that frequency, not of the wavelength.",
        },
        {
          title: "A repeater is a receiver and a transmitter",
          body: "A repeater does not only amplify. It receives the signal, amplifies it and transmits it again, so it combines both ends of the link.",
        },
        {
          title: "Attenuation and demodulation are easy to swap",
          body: "Attenuation is the loss of strength in the medium. Demodulation is taking the message back off the carrier at the receiver. Match lists put the two side by side.",
        },
      ],
    },

    // C2 — frequency bands, propagation modes, atmosphere layers
    {
      kind: "reference" as const,
      slug: "jpcomm-bands-layers",
      name: "Frequency bands, propagation modes and atmosphere layers",
      intuition:
        "How a radio wave travels depends on its frequency. Low frequencies hug the ground. Frequencies of a few MHz up to about 30 MHz bounce off the ionosphere and come back far away. Higher frequencies pass straight through the ionosphere, so they must travel in a straight line from one antenna to the other, or up to a satellite.",
      definition:
        "- **Ground wave**: travels along the earth's surface. The ground absorbs it more as the frequency rises, so it is used only up to a few MHz.\n" +
        "- **Sky wave**: reflected back to earth by the ionosphere. It works from a few MHz up to about 30 to 40 MHz; above that the wave passes through.\n" +
        "- **Space wave**: travels in a straight line (line of sight), used above about 40 MHz: FM, TV, mobile phones, microwave links and satellites.\n" +
        "- Atmosphere layers, by NCERT's table: troposphere up to about 10 km; D layer (part of the stratosphere) 65 to 75 km; E layer (part of the stratosphere) about 100 km; F1 layer (part of the mesosphere) 170 to 190 km; F2 layer (part of the thermosphere) about 300 km at night and 250 to 400 km by day.\n" +
        "- The D layer reflects low frequencies and absorbs some medium and high ones; the F2 layer reflects high-frequency waves best, especially at night.\n" +
        "- Satellite links use the higher band for the uplink (earth to satellite) and the lower band for the downlink.",
      table: {
        columns: ["Service", "Frequency band", "Mode", "How the wave travels"],
        rows: [
          { cells: ["AM broadcast", "540 to 1600 kHz", "Ground wave", "Along the earth's surface, for frequencies up to a few MHz"] },
          { cells: ["Short-wave radio", "A few MHz to about 30 MHz", "Sky wave", "Reflected back to earth by the ionosphere"] },
          { cells: ["FM broadcast", "88 to 108 MHz", "Space wave", "In a straight line from the transmitting antenna to the receiving one"] },
          {
            cells: ["Television", "54 to 890 MHz", "Space wave", "In a straight line; the antenna height sets the range"],
            noteAmber: "TV is split into sub-bands (54 to 72, 76 to 88, 174 to 216 and 420 to 890 MHz). A frequency like 64 MHz is TV, not FM.",
          },
          {
            cells: ["Satellite uplink", "5.925 to 6.425 GHz", "Space wave", "Straight up through the ionosphere to the satellite"],
            noteAmber: "The uplink is the higher band. The downlink comes back on the lower one.",
          },
          { cells: ["Satellite downlink", "3.7 to 4.2 GHz", "Space wave", "From the satellite straight down to the earth station"] },
        ],
        caption: "Bands as in NCERT's table. Everything above about 40 MHz travels as a space wave.",
      },
      selfCheckExample: {
        prompt:
          "Put these in order of height above the earth, with NCERT's heights: the F2 layer, the troposphere, the E layer, the D layer and the F1 layer.",
        steps: [
          "Troposphere: up to about 10 km.",
          "D layer: 65 to 75 km. E layer: about 100 km.",
          "F1 layer: 170 to 190 km. F2 layer: about 300 km at night, 250 to 400 km by day.",
        ],
        answer: "Troposphere, D, E, F1, F2",
      },
      practiceSet: [
        { prompt: "Which band does a satellite use for its downlink?", answer: "3.7 to 4.2 GHz" },
        { prompt: "Above about what frequency does the ionosphere stop reflecting radio waves back?", answer: "About 30 to 40 MHz" },
        { prompt: "By which mode does an FM broadcast reach a home receiver?", answer: "Space wave (line of sight)" },
        { prompt: "Which ionosphere layer reflects high-frequency waves best, especially at night?", answer: "The F2 layer" },
      ],
      pyqExampleId: "99615f09-5420-4cb8-9fce-a8019ad1feaf", // 2023: match AM, FM, TV and satellite to their bands
      traps: [
        {
          title: "kHz for AM, MHz for FM",
          body: "AM broadcast is 540 to 1600 kHz; FM broadcast is 88 to 108 MHz. An option that gives AM in MHz or FM in kHz is wrong even if the numbers look right.",
        },
        {
          title: "Uplink is the higher frequency",
          body: "In satellite links the uplink uses 5.925 to 6.425 GHz and the downlink 3.7 to 4.2 GHz. The two bands are always offered together, so check which one is asked.",
        },
        {
          title: "Use NCERT's layer labels",
          body: "NCERT calls the D and E layers part of the stratosphere, F1 part of the mesosphere and F2 part of the thermosphere. Match-list questions follow these labels, so answer by the table.",
        },
      ],
    },

    // C3 — antenna size and why a carrier is needed
    {
      kind: "formula" as const,
      slug: "jpcomm-antenna-size",
      name: "Antenna length and why a high-frequency carrier is needed",
      intuition:
        "An antenna radiates well only when its length is comparable to the wavelength, at least a quarter of it. An audio signal has a wavelength of kilometres, so its antenna would be kilometres long, and it would radiate very little power. So the message is carried on a high-frequency wave, whose wavelength is short. The antenna is then sized for the carrier.",
      definition:
        "- Minimum antenna length: \\(l = \\dfrac{\\lambda}{4}\\), with \\(\\lambda = \\dfrac{c}{f}\\).\n" +
        "- In a medium the wave is slower: \\(v = \\dfrac{c}{\\sqrt{\\varepsilon_r \\mu_r}}\\) and \\(\\lambda = \\dfrac{v}{f}\\).\n" +
        "- Power radiated by a linear antenna of length l: \\(P \\propto \\left(\\dfrac{l}{\\lambda}\\right)^{2}\\). A long wavelength means low power.\n" +
        "- Three reasons a low-frequency (baseband) signal is not sent directly: the antenna would be far too long, the radiated power would be low, and the signals of different transmitters would mix.\n" +
        "- An AM wave contains \\(f_c\\) and \\(f_c \\pm f_m\\), all close to \\(f_c\\). So the wavelength radiated is \\(\\lambda = c/f_c\\), and the antenna is sized by the carrier.\n" +
        "- A largest antenna size gives a largest wavelength, \\(\\lambda = 4l\\), and so a lowest frequency.",
      formula: {
        label: "Antenna length and radiated power",
        latex: "l_{\\min} = \\frac{\\lambda}{4} = \\frac{c}{4f}, \\qquad P \\propto \\left(\\frac{l}{\\lambda}\\right)^{2}",
      },
      authoredExample: {
        prompt:
          "A 15 kHz audio signal is carried on a 1.5 GHz carrier. Find the minimum antenna length needed, and the length that would be needed to send the audio signal directly.",
        steps: [
          "The antenna is sized for the carrier: \\(\\lambda = \\dfrac{3 \\times 10^{8}}{1.5 \\times 10^{9}} = 0.2\\) m.",
          "\\(l = \\dfrac{\\lambda}{4} = 0.05\\) m \\(= 5\\) cm.",
          "Sent directly: \\(\\lambda = \\dfrac{3 \\times 10^{8}}{1.5 \\times 10^{4}} = 2 \\times 10^{4}\\) m, so \\(l = 5000\\) m \\(= 5\\) km.",
        ],
        answer: "5 cm with the carrier; 5 km without it.",
      },
      selfCheckExample: {
        prompt:
          "An antenna 10 cm long sits in a medium of dielectric constant 4, with \\(\\mu_r = 1\\). What is the lowest frequency it can radiate efficiently?",
        steps: [
          "Speed in the medium: \\(v = \\dfrac{3 \\times 10^{8}}{\\sqrt{4}} = 1.5 \\times 10^{8}\\) m/s.",
          "Largest wavelength: \\(\\lambda = 4l = 0.4\\) m.",
          "Lowest frequency: \\(f = \\dfrac{v}{\\lambda} = \\dfrac{1.5 \\times 10^{8}}{0.4} = 3.75 \\times 10^{8}\\) Hz.",
        ],
        answer: "375 MHz",
      },
      practiceSet: [
        { prompt: "Minimum antenna length for a 300 MHz signal in air?", answer: "25 cm" },
        { prompt: "An antenna is made twice as long while the wavelength stays the same. How does the radiated power change?", answer: "It becomes 4 times as large" },
        { prompt: "A 50 m antenna is a quarter-wave antenna. What wavelength does it radiate?", answer: "200 m" },
        { prompt: "A 6 kHz message is amplitude modulated on a 1.2 MHz carrier. What wavelength does the antenna radiate?", answer: "250 m, the carrier's wavelength" },
      ],
      pyqExampleId: "321eddd9-296b-4d5a-898c-01a448877d07", // 2022: 3.5 MHz message on a 3.5 GHz carrier, minimum antenna
      traps: [
        {
          title: "A quarter, not a half",
          body: "The minimum antenna length is \\(\\lambda/4\\). Using \\(\\lambda/2\\) doubles the answer, and that value is always among the options.",
        },
        {
          title: "Size the antenna for the carrier",
          body: "The radiated wave is the carrier with its side bands, all near \\(f_c\\). Using the message frequency \\(f_m\\) gives an antenna far too long.",
        },
        {
          title: "Divide c by the refractive index in a medium",
          body: "In a dielectric the wave travels at \\(c/\\sqrt{\\varepsilon_r \\mu_r}\\), so the wavelength is shorter for the same frequency. Using c gives a frequency that is too high.",
        },
        {
          title: "Largest antenna, lowest frequency",
          body: "The largest wavelength an antenna can radiate is \\(4l\\), and the largest wavelength is the lowest frequency. Reading it the other way round inverts the answer.",
        },
      ],
    },
  ],
};
