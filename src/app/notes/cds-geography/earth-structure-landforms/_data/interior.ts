import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EA_INTERIOR_NOTE: SubtopicNote = {
  subtopicName: "Interior, Plates and Earthquakes",
  title: "Interior, Plates and Earthquakes",
  oneLineDefinition:
    "The layers of the Earth and what the crust is made of, the plates that carry the continents, and the earthquake waves that let us see inside.",
  whyItMatters:
    "Eleven questions, and five of them come from the papers of 2025 and 2026. Most test one clean fact: which wave cannot cross the outer core, what the Richter scale measures, which plate an island sits on.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeea-layers",
      name: "Layers of the Earth and the elements of the crust",
      intuition:
        "Nobody has drilled through the crust, so the inside of the Earth is known mostly from how earthquake waves travel through it. " +
        "The picture is three shells: a thin rocky crust, a thick mantle and a metal core. The crust itself is mostly oxygen and silicon locked together in rock.",
      definition:
        "The layers, from the outside in:\n" +
        "- **Crust**: the thin outer shell. About **5 km** thick under the oceans and about **30 km** under the continents, more under big mountains.\n" +
        "- **Mantle**: from the base of the crust down to about **2,900 km**. Its upper part, the **asthenosphere**, is soft and slowly flowing. The crust and the uppermost mantle together make the rigid **lithosphere**.\n" +
        "- **Outer core**: **liquid**, mostly iron and nickel.\n" +
        "- **Inner core**: **solid**, also iron and nickel, at the centre about **6,370 km** down.\n" +
        "- By weight the crust is about **46.6% oxygen**, **27.7% silicon**, **8.1% aluminium**, **5.0% iron** and **3.6% calcium**, then sodium, potassium and magnesium.",
      table: {
        columns: ["Element in the crust", "Share by weight", "Rank"],
        rows: [
          { cells: ["Oxygen", "About 46.6%", "1st"] },
          { cells: ["Silicon", "About 27.7%", "2nd"] },
          { cells: ["Aluminium", "About 8.1%", "3rd"] },
          { cells: ["Iron", "About 5.0%", "4th"] },
          {
            cells: ["Calcium", "About 3.6%", "5th"],
            noteAmber: "CDS 2025 (II): in ascending order the four ran calcium, aluminium, silicon, oxygen.",
          },
          { cells: ["Sodium, potassium, magnesium", "About 2 to 3% each", "6th to 8th"] },
        ],
      },
      pyqExampleId: "0caa8fb7-2b3e-41b5-9f9f-29588220ecd0",
      selfCheckExample: {
        prompt: "Is the Earth's outer core solid or liquid, and is the inner core solid or liquid?",
        steps: [
          "The outer core lies between about 2,900 km and 5,100 km down. S-waves cannot pass through it, so it must be liquid.",
          "The inner core is under so much pressure that its iron stays solid even though it is very hot.",
        ],
        answer: "The outer core is liquid; the inner core is solid.",
      },
      practiceSet: [
        { prompt: "Roughly how thick is the Earth's crust under the oceans?", answer: "About 5 km" },
        { prompt: "Which metal, with nickel, makes up most of the Earth's core?", answer: "Iron" },
        { prompt: "What is the soft, slowly flowing upper part of the mantle called?", answer: "The asthenosphere" },
        { prompt: "Which two layers together make up the lithosphere?", answer: "The crust and the uppermost mantle" },
      ],
      traps: [
        {
          title: "Aluminium, not iron, is the commonest metal in the crust",
          body: "After oxygen and silicon comes **aluminium** (about 8%), then iron (about 5%). Iron is the main metal of the **core**, not of the crust.",
        },
        {
          title: "The lithosphere is more than the crust",
          body: "The rigid **lithosphere** is the crust **plus** the uppermost mantle. The soft layer below it is the asthenosphere.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-plates",
      name: "Plates and the theories behind them",
      intuition:
        "The lithosphere is broken into large plates that move a few centimetres a year over the soft asthenosphere. " +
        "Every island and country rides on one plate, so a question that names an island is really asking which plate is under it.",
      definition:
        "The plates and the ideas that led to them:\n" +
        "- NCERT lists **seven major plates**: the **Antarctic** (with the ocean around it), **North American**, **South American**, **Pacific**, **India-Australia-New Zealand**, **African** and **Eurasian** plates.\n" +
        "- **Minor plates** include the **Cocos**, **Nazca**, **Arabian** (mostly the Saudi Arabian landmass), **Philippine**, **Caroline** and **Fuji** plates.\n" +
        "- **Alfred Wegener** proposed **continental drift** in 1912. **Harry Hess** proposed **sea-floor spreading** in the 1960s, and **plate tectonics** followed in 1967.\n" +
        "- Older theories CDS asks about: **Chamberlin** (with Moulton), the **planetesimal hypothesis** of the Earth's origin; **Harold Jeffreys**, the **thermal contraction** theory of mountains; **Leopold Kober**, the **geosynclinal** theory of mountains; **Reginald Daly**, the **sliding continents** hypothesis.",
      table: {
        columns: ["Plate", "Major or minor", "Land on it"],
        rows: [
          { cells: ["Pacific", "Major", "Most of the Pacific Ocean floor, Hawaii"] },
          {
            cells: ["North American", "Major", "North America, Greenland, Baffin Island"],
            noteAmber: "CDS 2025 (II): Baffin Island is on the North American Plate.",
          },
          { cells: ["South American", "Major", "South America"] },
          { cells: ["Eurasian", "Major", "Europe, most of Asia, the Andaman Islands"] },
          { cells: ["African", "Major", "Africa, Madagascar, Comoros"] },
          { cells: ["India-Australia-New Zealand", "Major", "India, Sri Lanka, Australia, New Zealand"] },
          { cells: ["Antarctic", "Major", "Antarctica and the ocean around it"] },
          {
            cells: ["Arabian", "Minor", "Mostly the Saudi Arabian landmass"],
            noteAmber: "CDS 2020 (II): the Saudi Arabian plate was the one that is not a major plate.",
            pyqExampleId: "1aba7eeb-8650-44ac-8998-65cb29671b48",
          },
          { cells: ["Nazca and Cocos", "Minor", "Pacific floor off South and Central America"] },
          {
            cells: ["Theories", "Not a plate", "Planetesimal: Chamberlin. Thermal contraction: Jeffreys. Geosyncline: Kober. Sliding continents: Daly"],
            pyqExampleId: "0b4c8969-7cbd-4394-b282-fc8c5b7a9ef6",
          },
        ],
      },
      pyqExampleId: "1c50e68d-2557-4dae-bb67-55c36c0fc17b",
      selfCheckExample: {
        prompt: "Name the seven major plates in NCERT's list.",
        steps: [
          "Start with the two that carry the Americas: North American and South American.",
          "Add the plates of the Old World: Eurasian, African and India-Australia-New Zealand.",
          "Finish with the two ocean-centred ones: Pacific, and Antarctic with the ocean around it.",
        ],
        answer: "North American, South American, Eurasian, African, India-Australia-New Zealand, Pacific and Antarctic.",
      },
      practiceSet: [
        { prompt: "On which plate does Madagascar lie?", answer: "The African Plate" },
        { prompt: "Name two minor plates off the Pacific coast of the Americas.", answer: "The Nazca and Cocos plates" },
        { prompt: "Who proposed the theory of continental drift?", answer: "Alfred Wegener, in 1912" },
        { prompt: "Who gave the idea of sea-floor spreading?", answer: "Harry Hess" },
      ],
      traps: [
        {
          title: "The Arabian plate is minor",
          body: "The seven major plates are the Antarctic, North American, South American, Pacific, India-Australia-New Zealand, African and Eurasian plates. The **Arabian** plate is a **minor** one.",
        },
        {
          title: "Sri Lanka and the Andamans are on different plates",
          body: "Sri Lanka rides the **India-Australia** plate. The Andaman Islands sit on the **Eurasian** side, where the Indian plate sinks beneath it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-seismic-waves",
      name: "P-waves, S-waves and surface waves",
      intuition:
        "An earthquake sends out two kinds of body wave. P-waves push and pull like sound, so they pass through anything. " +
        "S-waves shake the rock sideways, and a liquid cannot pass on a sideways shake. That one difference told scientists the outer core is liquid.",
      definition:
        "The three kinds of wave:\n" +
        "- **P-waves** (primary): **longitudinal**, like sound waves. The **fastest**, so they **arrive first**. They travel through **solids, liquids and gases**.\n" +
        "- **S-waves** (secondary): **transverse**. The rock vibrates **at right angles** to the direction of travel, **in the vertical plane**, so they make **crests and troughs**. **Slower** than P-waves, and they travel **only through solids**.\n" +
        "- Because S-waves do not cross the **outer core**, scientists concluded that the outer core is **liquid**. The area where no S-waves arrive is the **shadow zone**.\n" +
        "- **Surface waves** arrive **last** and do the **most damage**. S-waves do more damage than P-waves.",
      table: {
        columns: ["Wave", "Kind of motion", "Travels through", "Arrives"],
        rows: [
          {
            cells: ["P-wave", "Longitudinal, like sound", "Solids, liquids and gases", "First"],
            pyqExampleId: "2f09384f-b8df-4bfe-90a4-4574b11253d0",
          },
          {
            cells: ["S-wave", "Transverse, at right angles, makes crests and troughs", "Solids only", "Second"],
            noteAmber: "CDS 2024 (II): 'S-waves are less destructive to buildings' was the false statement.",
            pyqExampleId: "b67613a7-d51b-4493-b784-8a1585a0f119",
          },
          { cells: ["Surface wave", "Rolls along the surface", "The crust near the surface", "Last, most damaging"] },
        ],
      },
      pyqExampleId: "1d892ab6-1523-401a-b92e-f0f0b1308183",
      selfCheckExample: {
        prompt: "A seismograph on the far side of the Earth records P-waves but no S-waves. What does that tell us about the core?",
        steps: [
          "S-waves travel only through solids.",
          "If they do not reach the far side, something in the middle has stopped them.",
          "P-waves still arrive, so the layer passes waves that can cross a liquid.",
        ],
        answer: "The outer core is liquid.",
      },
      practiceSet: [
        { prompt: "Which earthquake wave reaches a seismograph first?", answer: "The P-wave" },
        { prompt: "Which earthquake waves cause the most damage?", answer: "Surface waves" },
        { prompt: "Which common wave are P-waves most like?", answer: "Sound waves" },
        { prompt: "What name is given to the area where no S-waves are recorded?", answer: "The shadow zone" },
      ],
      traps: [
        {
          title: "P-waves cross liquids too",
          body: "P-waves pass through **solids, liquids and gases**. It is the **S-wave** that travels only through solids.",
        },
        {
          title: "S-waves are slower but more damaging than P-waves",
          body: "S-waves arrive after P-waves, but their sideways shaking does **more** damage to buildings and bridges, not less.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-earthquakes",
      name: "Focus, epicentre and measuring earthquakes",
      intuition:
        "An earthquake starts at one point under the ground and its shaking spreads out from there. " +
        "Two numbers describe it: how much energy it let out (magnitude) and how hard it shook a given place (intensity).",
      definition:
        "Key terms:\n" +
        "- The **focus** or **hypocentre** is the point **inside** the Earth where the rock breaks and energy is released.\n" +
        "- The **epicentre** is the point on the **surface** directly above the focus. It can lie under the sea as easily as on land.\n" +
        "- **Magnitude** is the **energy released**, on the **Richter scale** (0 to 10, each step about 30 times more energy).\n" +
        "- **Intensity** is the **shaking and damage at a place**, on the **Mercalli scale** (1 to 12). It falls as you move away from the epicentre.\n" +
        "- Most earthquakes are **tectonic**, along plate boundaries, above all **converging** ones. **Collapse** earthquakes (roofs of mines and caves falling in) are small and rare.\n" +
        "- A **tsunami** is a sea wave set off by an undersea earthquake. It is not an earthquake itself.",
      table: {
        columns: ["Term", "What it means"],
        rows: [
          {
            cells: ["Focus or hypocentre", "Point inside the Earth where the quake starts"],
            pyqExampleId: "ea07d98c-04aa-41db-bca1-e3bcbe6351d9",
          },
          { cells: ["Epicentre", "Point on the surface right above the focus"] },
          {
            cells: ["Richter scale", "Magnitude: the energy released"],
            noteAmber: "CDS 2025 (II): 'Richter is the intensity scale' was the false statement.",
            pyqExampleId: "97e2d3ee-3369-4566-a3de-33e721d84ac1",
          },
          { cells: ["Mercalli scale", "Intensity: the shaking and damage felt at a place"] },
          { cells: ["Collapse earthquake", "Small, rare quake when an underground roof falls in"] },
          {
            cells: ["Where quakes cluster", "Plate boundaries, mostly converging ones"],
            pyqExampleId: "b6aa11ae-bd0a-457f-a551-de9666d1d70a",
          },
        ],
      },
      pyqExampleId: "d53650cd-fab2-4991-87e8-008875a52bec",
      selfCheckExample: {
        prompt: "One earthquake is felt strongly in a town near the epicentre and only faintly in a city 300 km away. Did its magnitude or its intensity change?",
        steps: [
          "Magnitude is the energy let out at the focus. One earthquake has one magnitude.",
          "Intensity is how hard the ground shakes at a place, and it falls with distance.",
        ],
        answer: "Only the intensity changed. The magnitude is the same for both places.",
      },
      practiceSet: [
        { prompt: "What is the point on the surface directly above an earthquake's focus called?", answer: "The epicentre" },
        { prompt: "Which scale measures how strongly an earthquake is felt at a place?", answer: "The Mercalli scale" },
        { prompt: "Which scale measures the energy an earthquake releases?", answer: "The Richter scale" },
        { prompt: "Along which kind of plate boundary do most earthquakes occur?", answer: "Converging boundaries" },
      ],
      traps: [
        {
          title: "Richter is magnitude, not intensity",
          body: "The **Richter** scale measures the **energy released**. The intensity of shaking at a place is measured on the **Mercalli** scale.",
        },
        {
          title: "The epicentre is not always on land",
          body: "The epicentre is simply the surface point above the focus. Many lie under the **ocean**, which is how undersea quakes raise tsunamis.",
        },
      ],
    },
  ],
};
