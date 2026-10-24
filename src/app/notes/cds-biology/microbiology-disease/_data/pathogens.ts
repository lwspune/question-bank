import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_MI_PATHOGENS_NOTE: SubtopicNote = {
  subtopicName: "Pathogens and Their Spread",
  title: "Pathogens and Their Spread",
  oneLineDefinition:
    "Which diseases are caused by bacteria, viruses, fungi, protozoa and worms, what makes viruses different, how diseases spread from one person to another, and what endemic, epidemic and pandemic mean.",
  whyItMatters:
    "Twelve CDS questions from 2016 (II) to 2026 (II). Sleeping sickness (Trypanosoma), tuberculosis and dengue have each come up twice. Most ask which germ causes a disease or how a disease spreads.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbimi-kinds",
      name: "Diseases by kind of pathogen",
      intuition:
        "A germ that causes disease is a pathogen. Pathogens come in five kinds: bacteria, viruses, fungi, protozoa (single-celled animals) and worms. Knowing which kind causes a disease tells you how to treat it: antibiotics work on bacteria but not on viruses. So learn a few diseases under each kind.",
      definition:
        "Disease-causing organisms (NCERT Class 9, Why Do We Fall Ill?, and Class 12, Human Health and Disease):\n" +
        "- **Bacteria**: tuberculosis, cholera, typhoid, whooping cough, anthrax, and **peptic ulcers**, which are caused by **Helicobacter pylori** (found by Marshall and Warren).\n" +
        "- **Viruses**: common cold, influenza, **dengue**, polio, measles, chickenpox, AIDS.\n" +
        "- **Fungi**: many skin infections, such as **ringworm** and **athlete's foot**.\n" +
        "- **Protozoa**: **malaria** (Plasmodium), **kala-azar** (Leishmania), **sleeping sickness** (**Trypanosoma**, spread by the tsetse fly), amoebic dysentery (Entamoeba).\n" +
        "- **Worms**: **elephantiasis** or filariasis (Wuchereria), ascariasis (Ascaris).",
      table: {
        columns: ["Disease", "Pathogen", "Kind"],
        rows: [
          { cells: ["Tuberculosis", "Mycobacterium tuberculosis", "Bacterium"] },
          {
            cells: ["Peptic ulcer", "Helicobacter pylori", "Bacterium"],
            noteAmber: "CDS 2020 (II): besides excess acid, peptic ulcers are caused by Helicobacter pylori.",
            pyqExampleId: "ba14a798-83db-4c99-9a92-ee3290fcdb83",
          },
          { cells: ["Typhoid", "Salmonella typhi", "Bacterium"] },
          { cells: ["Dengue", "Dengue virus", "Virus"] },
          { cells: ["Athlete's foot, ringworm", "Fungi", "Fungus"] },
          { cells: ["Malaria", "Plasmodium", "Protozoan"] },
          {
            cells: ["Sleeping sickness", "Trypanosoma", "Protozoan"],
            noteAmber: "Asked twice: CDS 2019 (II) and 2021 (I). Leishmania causes kala-azar, not sleeping sickness.",
            pyqExampleId: "a40599cb-1a3c-42a0-9e63-b1a89c89d827",
          },
          { cells: ["Kala-azar", "Leishmania", "Protozoan"] },
          { cells: ["Elephantiasis", "Wuchereria", "Worm"] },
        ],
      },
      pyqExampleId: "57082554-b9dd-4ce8-9d7c-6ce149300ede",
      selfCheckExample: {
        prompt: "Sort these diseases by the kind of pathogen: typhoid, measles, kala-azar, cholera, chickenpox, ringworm.",
        steps: [
          "Typhoid and cholera are caused by bacteria.",
          "Measles and chickenpox are caused by viruses.",
          "Kala-azar is caused by the protozoan Leishmania, and ringworm by a fungus.",
        ],
        answer: "Bacteria: typhoid, cholera. Viruses: measles, chickenpox. Protozoan: kala-azar. Fungus: ringworm.",
      },
      practiceSet: [
        { prompt: "Which protozoan causes kala-azar?", answer: "Leishmania" },
        { prompt: "Which worm causes elephantiasis?", answer: "Wuchereria (the filarial worm)" },
        { prompt: "What kind of organism causes ringworm?", answer: "A fungus" },
        { prompt: "Which insect spreads sleeping sickness?", answer: "The tsetse fly" },
      ],
      traps: [
        {
          title: "Trypanosoma and Leishmania",
          body: "Both are protozoa spread by flies, which is why they are paired in options. **Trypanosoma** causes **sleeping sickness** (tsetse fly); **Leishmania** causes **kala-azar** (sandfly).",
        },
        {
          title: "Ulcers are not only from acid",
          body: "A peptic ulcer is not caused by acid alone. The bacterium **Helicobacter pylori** is a major cause, so antibiotics are part of the cure. E. coli and Salmonella are other bacteria.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbimi-viruses",
      name: "Viruses",
      intuition:
        "A virus is not a cell. It is a little genetic material, DNA or RNA, packed in a protein coat, and it can multiply only inside a living cell, using that cell's machinery. RNA is less stable than DNA and is copied with more mistakes, so RNA viruses change fast, which is why the flu vaccine must be updated so often.",
      definition:
        "Facts about viruses:\n" +
        "- A virus multiplies **only inside a living host cell**; outside it, it shows no life activity.\n" +
        "- Its genetic material is **either DNA or RNA**, never both. **RNA viruses** include **HIV**, influenza, polio, measles and **dengue**; **DNA viruses** include hepatitis B, adenovirus and vaccinia (the pox virus).\n" +
        "- RNA is **less stable** than DNA and is copied without proofreading, so RNA viruses **mutate faster** and evolve quickly.\n" +
        "- **HIV** causes AIDS. It destroys the **helper T lymphocytes** (a kind of white blood cell), so the body's immunity falls and ordinary infections become dangerous.\n" +
        "- **Dengue** virus is a **flavivirus**, an RNA virus spread by the **Aedes** mosquito.",
      table: {
        columns: ["Virus", "Genetic material", "Fact to remember"],
        rows: [
          { cells: ["HIV", "RNA", "Destroys helper T lymphocytes; causes AIDS"] },
          {
            cells: ["Dengue virus", "RNA", "A flavivirus spread by the Aedes mosquito"],
            noteAmber: "CDS 2024 (I): dengue virus is a flavivirus, an RNA virus; the right option was printed as 'Flavi-ribo virus'.",
            pyqExampleId: "22e84f83-4fb1-4a9d-ba37-62e5260ec462",
          },
          { cells: ["Influenza virus", "RNA", "Changes fast, so the vaccine is updated"] },
          { cells: ["Polio virus", "RNA", "Prevented by oral and injected vaccines"] },
          { cells: ["Hepatitis B virus", "DNA", "Spread through blood"] },
          { cells: ["Adenovirus", "DNA", "Causes colds and eye infections"] },
        ],
      },
      pyqExampleId: "9f1ab75b-20bb-4683-9e21-603b1ef1b51e",
      selfCheckExample: {
        prompt: "Bacteria can be grown on a dish of nutrient jelly in a laboratory, but viruses cannot. Why not?",
        steps: [
          "A bacterium is a living cell with its own machinery to make proteins and copy its DNA.",
          "A virus has only genetic material in a protein coat and no machinery of its own.",
          "It can multiply only by using the machinery of a living host cell, which a jelly does not have.",
        ],
        answer: "A virus multiplies only inside living cells; nutrient jelly has no host cells.",
      },
      practiceSet: [
        { prompt: "Is the genetic material of HIV DNA or RNA?", answer: "RNA" },
        { prompt: "Which mosquito carries the dengue virus?", answer: "Aedes" },
        { prompt: "Can a virus multiply outside a living cell?", answer: "No" },
        { prompt: "Is hepatitis B caused by a DNA virus or an RNA virus?", answer: "A DNA virus" },
      ],
      traps: [
        {
          title: "HIV attacks lymphocytes, not red cells or platelets",
          body: "HIV destroys **helper T lymphocytes**, the white blood cells that organise the immune response. Red blood cells (erythrocytes), platelets and mast cells are not its target.",
        },
        {
          title: "Why RNA viruses change fast",
          body: "The reason is **chemical**: RNA is **less stable** than DNA and its copies are not checked. 'Viruses live only inside cells' is true of every virus, so it cannot explain why RNA viruses mutate faster.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbimi-spread",
      name: "How diseases spread",
      intuition:
        "A germ must travel from a sick person to a healthy one. Some ride on the tiny droplets from a cough or sneeze, so they spread fastest where people crowd together. Some travel in dirty water or food. Some are carried by an animal, usually an insect, that bites one person and then another; that animal is called a vector.",
      definition:
        "Routes of spread (NCERT Class 9):\n" +
        "- **Air (droplets)** from coughs and sneezes: **tuberculosis**, common cold, influenza, pneumonia. Crowded, poorly aired places raise the risk.\n" +
        "- **Water and food**: cholera, typhoid, hepatitis A.\n" +
        "- **Vectors** (animals that carry the germ): the **female Anopheles** mosquito (malaria), **Aedes** (dengue, chikungunya), **Culex** (filariasis), the **tsetse fly** (sleeping sickness), the **sandfly** (kala-azar).\n" +
        "- **Sexual contact and blood**: AIDS, syphilis, hepatitis B.\n" +
        "- **Mother to baby**: HIV, and malaria, since **Plasmodium can cross the placenta** (congenital malaria).\n" +
        "- Only **female** mosquitoes bite: they need a blood meal to mature their eggs. Males feed on plant juices.",
      table: {
        columns: ["Route", "Examples"],
        rows: [
          {
            cells: ["Air (droplets from coughs and sneezes)", "Tuberculosis, common cold, influenza"],
            noteAmber: "CDS 2018 (I): crowded places raise the risk of tuberculosis because its bacteria spread in droplets; Statement II explains Statement I.",
            pyqExampleId: "75f21f9f-d0d9-4a95-a755-c0d16b0ff889",
          },
          { cells: ["Water and food", "Cholera, typhoid, hepatitis A"] },
          {
            cells: ["Female Anopheles mosquito", "Malaria"],
            noteAmber: "CDS 2026 (II): only female Anopheles take human blood, and Plasmodium can cross the placenta; both statements are correct.",
            pyqExampleId: "7c9d789e-3b21-4b76-8a21-c4146d998f1a",
          },
          { cells: ["Aedes mosquito", "Dengue, chikungunya"] },
          { cells: ["Culex mosquito", "Filariasis (elephantiasis)"] },
          { cells: ["Tsetse fly", "Sleeping sickness"] },
          { cells: ["Sexual contact and blood", "AIDS, hepatitis B, syphilis"] },
        ],
      },
      pyqExampleId: "4ec911b1-b0b7-4411-8df0-a76d40a29564",
      selfCheckExample: {
        prompt: "Why do only female Anopheles mosquitoes spread malaria, and never the males?",
        steps: [
          "The malaria parasite passes from person to person only through a mosquito bite that takes blood.",
          "Female mosquitoes need a blood meal to mature their eggs, so they bite people.",
          "Males feed only on plant juices and never take blood, so they cannot pick up or pass on the parasite.",
        ],
        answer: "Only females take blood, which they need for their eggs; males feed on plant juices.",
      },
      practiceSet: [
        { prompt: "What is an animal that carries a pathogen from one person to another called?", answer: "A vector" },
        { prompt: "Which mosquito spreads filariasis?", answer: "Culex" },
        { prompt: "Which insect spreads kala-azar?", answer: "The sandfly" },
        { prompt: "Name a disease that can pass through sexual contact and infected blood.", answer: "AIDS (or hepatitis B)" },
      ],
      traps: [
        {
          title: "Three mosquitoes, three diseases",
          body: "**Anopheles** carries **malaria**, **Aedes** carries **dengue**, and **Culex** carries **filariasis**. Malaria and dengue are mosquito-borne, not airborne; cholera is waterborne.",
        },
        {
          title: "Visiting crowds is a risk, not a cause",
          body: "Crowded places do not cause tuberculosis by themselves. They raise the risk because the **TB bacteria travel in droplets** from coughs and sneezes, so the droplet route **explains** why crowds matter.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbimi-outbreaks",
      name: "Endemic, epidemic and pandemic",
      intuition:
        "These words describe how many people catch a disease, and where. If a disease is always present in a place at about the same level, it is endemic there. If cases suddenly shoot up far above that level, it is an epidemic. If that rise spreads across countries and continents, it is a pandemic.",
      definition:
        "Words for how a disease occurs:\n" +
        "- **Endemic**: always present in a place at a steady, expected level, kept up **without input from outside**; for example malaria and filariasis in parts of India.\n" +
        "- **Epidemic**: a sudden rise in cases, well **above the usual level**, in a region; cholera, malaria and smallpox have all caused epidemics.\n" +
        "- **Pandemic**: an epidemic that spreads across **many countries and continents**; for example the 1918 influenza and COVID-19 (declared in 2020).\n" +
        "- **Outbreak**: an epidemic in a small, limited area.\n" +
        "- **Sporadic**: scattered cases now and then, with no pattern.\n" +
        "- **Elephantiasis** builds up slowly over years in the places where it is found; it does not break out suddenly, so it is a chronic, endemic disease, not an epidemic one.",
      table: {
        columns: ["Term", "Meaning", "Example"],
        rows: [
          { cells: ["Endemic", "Steady level in one area", "Malaria in parts of India"] },
          { cells: ["Epidemic", "Sudden rise above the usual level", "A cholera outbreak after a flood"] },
          { cells: ["Pandemic", "Epidemic across continents", "COVID-19"] },
          { cells: ["Sporadic", "Scattered, occasional cases", "A few tetanus cases"] },
          {
            cells: ["Chronic, endemic disease", "Slow, long-lasting, no sudden outbreaks", "Elephantiasis"],
            noteAmber: "CDS 2020 (I): of cholera, malaria, smallpox and elephantiasis, elephantiasis is not an epidemic disease.",
            pyqExampleId: "43716e05-9130-4409-b7e4-3c9b089ad5e1",
          },
        ],
      },
      pyqExampleId: "65d944c3-8a40-4f73-81d9-bd970ef10010",
      selfCheckExample: {
        prompt: "A town usually sees about two cholera cases a month. After a flood, it sees two hundred in one week. Which word describes this, and why?",
        steps: [
          "Two cases a month is the town's usual level.",
          "Two hundred in a week is a sudden rise far above that level, in one region.",
          "The disease has not spread across countries, so it is not a pandemic.",
        ],
        answer: "An epidemic: a sudden rise well above the usual level in one region.",
      },
      practiceSet: [
        { prompt: "What is an epidemic that spreads across many continents called?", answer: "A pandemic" },
        { prompt: "What are scattered, occasional cases of a disease with no pattern called?", answer: "Sporadic" },
        { prompt: "What is a small epidemic in a limited area called?", answer: "An outbreak" },
        { prompt: "Name a pandemic of the twenty-first century.", answer: "COVID-19" },
      ],
      traps: [
        {
          title: "Endemic is steady, epidemic is a spike",
          body: "**Endemic** means a disease is always there at about the same level. **Epidemic** means a sudden spike. A disease can be endemic in a place and still have epidemics there.",
        },
      ],
    },
  ],
};
