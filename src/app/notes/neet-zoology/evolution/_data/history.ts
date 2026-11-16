import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_EV_HISTORY_NOTE: SubtopicNote = {
  subtopicName: "Geological History and Human Evolution",
  title: "Geological History and Human Evolution",
  oneLineDefinition:
    "NCERT's time line of life in millions of years, the geological eras and their periods, and the human line from Dryopithecus to Homo sapiens with brain sizes and dates.",
  whyItMatters:
    "Six NEET questions, all from 2024 to 2026. Three set the order of human forms or where and when Homo sapiens arose; three match life forms to dates or eras, or put the Paleozoic periods in order. Every one turns on an exact NCERT number or sequence.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoev-time-line",
      name: "NCERT's time line of life",
      intuition:
        "Read the story of life as a time line counted backwards in millions of years ago (mya). Single cells first, then invertebrates in the sea, then fish, then plants and animals on land, then the age of reptiles, and finally mammals once the dinosaurs vanished. NEET gives a date and asks what happened then, so learn each date with its event.",
      definition:
        "A brief account of evolution, in NCERT:\n" +
        "- About **2000 mya** the first **cellular forms** of life appeared. Slowly, single-celled organisms became multicellular.\n" +
        "- By about **500 mya**, **invertebrates** were formed and active.\n" +
        "- **Jawless fish** probably evolved around **350 mya**. **Sea weeds and a few plants** existed around **320 mya**. The **first organisms to invade land were plants**.\n" +
        "- Fish with **stout and strong fins** could move on land and go back to water, about **350 mya**. In **1938** a fish caught in **South Africa** was a **coelacanth**, thought to be extinct. These **lobefins** evolved into the **first amphibians**, the ancestors of modern frogs and salamanders.\n" +
        "- Amphibians evolved into **reptiles**, which lay **thick-shelled eggs** that do not dry up in the sun. Reptiles of many shapes and sizes then dominated the earth for about **200 million years**. Giant ferns (pteridophytes) of that time fell to form **coal** deposits.\n" +
        "- Some land reptiles went back into water to become **fish-like reptiles** (*Ichthyosaurs*), probably about **200 mya**. The land reptiles were the **dinosaurs**; the biggest, *Tyrannosaurus rex*, was about **20 feet** tall with huge dagger-like teeth.\n" +
        "- About **65 mya**, the dinosaurs **suddenly disappeared**. The true reason is not known.\n" +
        "- The **first mammals were like shrews**. Mammals were viviparous and protected the unborn young inside the mother.\n" +
        "- Through **continental drift**, when South America joined North America, South America's mammals (resembling horse, hippopotamus, bear, rabbit) were overridden by North American fauna.",
      table: {
        columns: ["About when", "What happened"],
        rows: [
          { cells: ["4.5 billion years ago", "The earth formed"] },
          { cells: ["2000 mya", "The first cellular forms of life appeared"] },
          { cells: ["500 mya", "Invertebrates were formed and active"] },
          { cells: ["350 mya", "Jawless fish probably evolved; lobefins moved between land and water"] },
          { cells: ["320 mya", "Sea weeds and a few plants existed"] },
          { cells: ["200 mya", "Some land reptiles went back to water as fish-like reptiles (Ichthyosaurs)"] },
          { cells: ["65 mya", "The dinosaurs suddenly disappeared"] },
        ],
      },
      pyqExampleId: "17945ecd-cdee-44ce-afff-23be3eede27c",
      selfCheckExample: {
        prompt: "About when did some land reptiles go back into water to become fish-like reptiles, and what is NCERT's example?",
        steps: [
          "NCERT dates the fish-like reptiles to probably about 200 mya.",
          "Its example is Ichthyosaurs.",
        ],
        answer: "About 200 mya; Ichthyosaurs.",
      },
      practiceSet: [
        { prompt: "About how many million years ago did the first cellular forms of life appear?", answer: "About 2000 mya" },
        { prompt: "Which were the first organisms to invade land?", answer: "Plants" },
        { prompt: "In which year was a coelacanth, thought extinct, caught off South Africa?", answer: "1938" },
        { prompt: "Which group did the lobefins evolve into?", answer: "The first amphibians" },
        { prompt: "What were the first mammals like?", answer: "Shrews" },
      ],
      traps: [
        {
          title: "Jawless fish and lobefins share one date",
          body: "**Jawless fish** probably evolved around **350 mya**, and fish with stout fins moved onto land about **350 mya** too. **320 mya** is the date for **sea weeds and a few plants**.",
        },
        {
          title: "Plants reached land before animals",
          body: "NCERT says the **first organisms to invade land were plants**; they were widespread on land when animals invaded it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoev-eras",
      name: "Geological eras and periods",
      intuition:
        "Geologists split the earth's history into eras, and each era into periods, much as a book splits into chapters and pages. Each era is remembered by the animals that ruled it: fishes and amphibians, then reptiles and birds, then mammals.",
      definition:
        "NCERT's figure of the evolutionary history of vertebrates through geological periods runs, oldest first:\n" +
        "- **Paleozoic era:** Cambrian, Ordovician, **Silurian, Devonian, Carboniferous, Permian**. The era of **fishes and amphibians**.\n" +
        "- **Mesozoic era:** Triassic, Jurassic, Cretaceous. The era of **reptiles** (the dinosaurs) and of the first **birds**.\n" +
        "- **Cenozoic era:** Tertiary, Quaternary. The era of **mammals**.\n\n" +
        "Before the Paleozoic lies the **Proterozoic** era, which NEET 2024 matched to **lower invertebrates**.",
      table: {
        columns: ["Era", "Periods, oldest first", "Life matched to it"],
        rows: [
          { cells: ["Proterozoic", "Before the Paleozoic", "Lower invertebrates"] },
          {
            cells: ["Paleozoic", "Cambrian, Ordovician, Silurian, Devonian, Carboniferous, Permian", "Fishes and amphibians"],
            noteAmber: "Re-NEET 2024: the Paleozoic periods, old to recent, were Silurian, Devonian, Carboniferous, Permian.",
            pyqExampleId: "d197ed53-b34a-4628-b5eb-7bbf53ff33fc",
          },
          { cells: ["Mesozoic", "Triassic, Jurassic, Cretaceous", "Reptiles and birds"] },
          { cells: ["Cenozoic", "Tertiary, Quaternary", "Mammals"] },
        ],
      },
      pyqExampleId: "bf9dfc2e-e50d-4953-a8d2-a9a777d1b60d",
      selfCheckExample: {
        prompt: "Put the three periods of the Mesozoic era in order, oldest first, and name the animals that dominated it.",
        steps: [
          "The Mesozoic runs Triassic, then Jurassic, then Cretaceous.",
          "It was the era of the reptiles, the dinosaurs, and saw the first birds.",
        ],
        answer: "Triassic, Jurassic, Cretaceous; reptiles (and birds).",
      },
      practiceSet: [
        { prompt: "Which era comes after the Mesozoic?", answer: "The Cenozoic" },
        { prompt: "Which period comes first in the Paleozoic era?", answer: "The Cambrian" },
        { prompt: "Name the two periods of the Cenozoic era.", answer: "Tertiary and Quaternary" },
        { prompt: "In which era did the dinosaurs live?", answer: "The Mesozoic" },
      ],
      traps: [
        {
          title: "Carboniferous comes before Permian",
          body: "The Paleozoic ends **Devonian, Carboniferous, Permian**. **Permian is the last** Paleozoic period, so any order that puts it before the Carboniferous is wrong.",
        },
        {
          title: "Mammals belong to the Cenozoic",
          body: "The **Mesozoic** is the era of **reptiles and birds**; **mammals** dominate the **Cenozoic**. Fishes and amphibians mark the **Paleozoic**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoev-human",
      name: "Human evolution",
      intuition:
        "The human story is a line of forms with steadily bigger brains. Ape-like primates came first, then upright Australopithecines in Africa, then the first true human-like being, then forms that spread out of Africa, used fire and tools, and buried their dead. Learn each form with three things: when, where, and how big its brain was.",
      definition:
        "Origin and evolution of man, in NCERT:\n" +
        "- About **15 mya**, primates called *Dryopithecus* and *Ramapithecus* existed. They were hairy and walked like gorillas and chimpanzees. *Ramapithecus* was **more man-like**; *Dryopithecus* was **more ape-like**.\n" +
        "- About **2 mya**, **Australopithecines** probably lived in the **East African grasslands**. They hunted with stone weapons but essentially ate fruit.\n" +
        "- *Homo habilis* was the **first human-like being**, the **hominid**. Brain capacity **650-800 cc**. They probably **did not eat meat**.\n" +
        "- Fossils found in **Java in 1891** revealed *Homo erectus*, about **1.5 mya**, with a large brain of about **900 cc**. *Homo erectus* probably **ate meat**.\n" +
        "- The **Neanderthal man**, brain about **1400 cc**, lived in the **near east and central Asia** between **1,00,000 and 40,000 years** back. They used hides to protect the body and **buried their dead**.\n" +
        "- *Homo sapiens* **arose in Africa** and moved across continents. During the **ice age, between 75,000 and 10,000 years ago**, modern *Homo sapiens* arose.\n" +
        "- Pre-historic **cave art** developed about **18,000 years** ago. **Agriculture** came around **10,000 years** back, and human settlements started.",
      table: {
        columns: ["Form", "When and where", "Brain and habits"],
        rows: [
          { cells: ["Dryopithecus", "About 15 mya", "Hairy; more ape-like"] },
          { cells: ["Ramapithecus", "About 15 mya", "Hairy; more man-like"] },
          { cells: ["Australopithecines", "About 2 mya, East African grasslands", "Hunted with stone weapons, essentially ate fruit"] },
          {
            cells: ["Homo habilis", "After the Australopithecines", "650-800 cc; the first hominid; probably did not eat meat"],
            noteAmber: "NEET 2024: past to recent, the order was Homo habilis, Homo erectus, Homo neanderthalensis, Homo sapiens.",
            pyqExampleId: "0d5baeb9-6e94-43ff-afcb-c73fa922e6d2",
          },
          { cells: ["Homo erectus", "About 1.5 mya; fossils found in Java in 1891", "About 900 cc; probably ate meat"] },
          { cells: ["Neanderthal man", "1,00,000 to 40,000 years back; near east and central Asia", "About 1400 cc; used hides, buried the dead"] },
          {
            cells: ["Homo sapiens", "Arose in Africa; modern form during the ice age, 75,000 to 10,000 years ago", "Cave art about 18,000 years ago; agriculture about 10,000 years ago"],
            noteAmber: "Re-NEET 2026: a statement that modern Homo sapiens arose in Australia was false; the one dating it to 75,000 to 10,000 years ago was true.",
            pyqExampleId: "9c0fc6cd-e23b-4597-9a03-9f16edf7e44c",
          },
        ],
      },
      pyqExampleId: "bf5b0dd4-30da-49f6-8ee3-1c24e0b12064",
      selfCheckExample: {
        prompt: "Which human form had a brain of about 900 cc, and where were its fossils found?",
        steps: [
          "Homo habilis had 650-800 cc and the Neanderthal man about 1400 cc.",
          "About 900 cc belongs to Homo erectus, found in Java in 1891.",
        ],
        answer: "Homo erectus; Java.",
      },
      practiceSet: [
        { prompt: "What was the brain capacity of Homo habilis?", answer: "650-800 cc" },
        { prompt: "What was the brain capacity of the Neanderthal man?", answer: "About 1400 cc" },
        { prompt: "Of Dryopithecus and Ramapithecus, which was more man-like?", answer: "Ramapithecus" },
        { prompt: "Which human form probably did not eat meat: Homo habilis or Homo erectus?", answer: "Homo habilis" },
        { prompt: "About how many years ago did pre-historic cave art develop?", answer: "About 18,000 years ago" },
      ],
      traps: [
        {
          title: "Homo sapiens arose in Africa",
          body: "*Homo sapiens* **arose in Africa** and moved across continents. Australia, Asia or Europe as its birthplace is false.",
        },
        {
          title: "Ramapithecus is man-like, Dryopithecus ape-like",
          body: "Both lived about 15 mya, but *Ramapithecus* was **more man-like** and *Dryopithecus* **more ape-like**. Swapping them is a classic false statement.",
        },
        {
          title: "Homo erectus ate meat, Homo habilis probably did not",
          body: "*Homo habilis* (650-800 cc) probably **did not eat meat**; *Homo erectus* (about 900 cc) probably **ate meat**.",
        },
      ],
    },
  ],
};
