import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_HB_DISEASES_NOTE: SubtopicNote = {
  subtopicName: "Diseases and Their Prevention",
  title: "Diseases and Their Prevention",
  oneLineDefinition:
    "Every infectious disease has a pathogen (virus, bacterium, protozoan, fungus or worm) and a way of spreading, and vaccines, health programmes and avoiding tobacco prevent many of them.",
  whyItMatters:
    "The busiest page of the chapter: fifteen questions, six EASY and nine MODERATE. Six match diseases to their pathogens, five ask how a disease spreads (water and food, contact, or a mosquito) or whether it is an epidemic, and four are about vaccines, the TB programme, tobacco and cancer. Learn the pathogen table and most of them fall.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9hbdi-pathogens",
      name: "Pathogens and the diseases they cause",
      intuition:
        "A pathogen is the germ behind a disease. Viruses are the smallest and live only inside our cells; bacteria are single cells; protozoa are single cells with a nucleus, like Plasmodium; fungi grow on skin and in damp places. Most questions just ask you to put each disease with the right kind of germ.",
      definition:
        "- **Viruses** cause influenza, swine flu (**H1N1**), bird flu (**H5N1**), Covid-19, AIDS, Ebola, SARS, measles, chicken pox, polio, rabies, dengue and hepatitis.\n" +
        "- **Bacteria** cause tuberculosis (\\(\\textit{Mycobacterium tuberculosis}\\)), leprosy (\\(\\textit{Mycobacterium leprae}\\)), cholera (\\(\\textit{Vibrio cholerae}\\)), typhoid, anthrax (\\(\\textit{Bacillus anthracis}\\)), diphtheria, tetanus and plague.\n" +
        "- **Protozoa** cause malaria (\\(\\textit{Plasmodium}\\)), amoebic dysentery, kala-azar and sleeping sickness (trypanosomiasis).\n" +
        "- **Fungi** cause ringworm, athlete's foot and aspergillosis.\n" +
        "- **Rabies** spreads by the bite of an infected dog. The virus attacks the nervous system and makes the throat muscles go into painful spasms, so swallowing, even water, becomes hard and frightening (hydrophobia).",
      table: {
        columns: ["Pathogen", "Diseases"],
        rows: [
          { cells: ["Virus", "Influenza, swine flu, bird flu, Covid-19, AIDS, Ebola, SARS, measles, chicken pox, polio, rabies, dengue, hepatitis"] },
          { cells: ["Bacterium", "Tuberculosis, leprosy, cholera, typhoid, anthrax, diphtheria, tetanus, plague"] },
          { cells: ["Protozoan", "Malaria, amoebic dysentery, kala-azar, sleeping sickness (trypanosomiasis)"] },
          { cells: ["Fungus", "Ringworm, athlete's foot, aspergillosis"], noteAmber: "Ringworm is not a worm." },
          { cells: ["Worm", "Filariasis (elephantiasis)"] },
        ],
        caption: "Tuberculosis and cholera are the two bacterial diseases most often passed off as viral.",
      },
      selfCheckExample: {
        prompt: "Sort these into viral and bacterial diseases: typhoid, measles, leprosy, polio.",
        steps: ["Measles and polio are caused by viruses.", "Typhoid and leprosy are caused by bacteria."],
        answer: "Viral: measles, polio. Bacterial: typhoid, leprosy.",
      },
      practiceSet: [
        { prompt: "What kind of pathogen causes malaria, and what is its name?", answer: "A protozoan, Plasmodium" },
        { prompt: "Which disease, spread by the bite of an infected dog, makes it hard for the patient to swallow water?", answer: "Rabies" },
        { prompt: "What kind of pathogen causes ringworm?", answer: "A fungus" },
        { prompt: "Which strain of virus causes swine flu?", answer: "H1N1" },
      ],
      pyqExampleId: "ac64926c-dd69-4abf-8c97-664b0717b51b",
      traps: [
        {
          title: "Calling tuberculosis or cholera viral",
          body: "Tuberculosis is caused by Mycobacterium tuberculosis and cholera by Vibrio cholerae. Both are bacteria.",
        },
        {
          title: "Thinking ringworm is caused by a worm",
          body: "Ringworm is a fungal infection of the skin. The name comes from its ring-shaped patch, not from a worm.",
        },
        {
          title: "Giving swine flu and bird flu the same strain",
          body: "Swine flu is caused by the H1N1 virus and bird flu by the H5N1 virus.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9hbdi-spread",
      name: "How diseases spread, and epidemic, endemic and pandemic",
      intuition:
        "A germ needs a road from one person to the next. Some ride in dirty water or food, some float in the droplets of a cough, some pass by touch, and some are carried by a mosquito bite. Know the road and you know how to block it: boil water, cover coughs, keep clean, stop mosquitoes breeding.",
      definition:
        "- A **communicable** disease passes from one person to another; a **non-communicable** one (such as diabetes or cancer) does not.\n" +
        "- A **contagious** disease passes by **touch or close contact**. Malaria and dengue are communicable but not contagious: they need a mosquito.\n" +
        "- **Endemic**: always present in an area. **Epidemic**: a sudden outbreak among many people in one place at one time. **Pandemic**: spread across many countries.\n" +
        "- **Female Anopheles** spreads malaria, **Aedes** spreads dengue, chikungunya and yellow fever, and **Culex** spreads filariasis.",
      table: {
        columns: ["Way it spreads", "Examples"],
        rows: [
          { cells: ["Contaminated water and food", "Cholera, typhoid, hepatitis A, amoebic dysentery, food poisoning"] },
          { cells: ["Air (droplets from coughs and sneezes)", "Tuberculosis, influenza, measles, chicken pox, Covid-19"] },
          { cells: ["Touch and close contact", "Scabies, ringworm, conjunctivitis"] },
          { cells: ["Aedes mosquito", "Dengue, chikungunya, yellow fever"] },
          { cells: ["Female Anopheles mosquito", "Malaria"] },
          { cells: ["Culex mosquito", "Filariasis"] },
          { cells: ["Sandfly", "Kala-azar"] },
          { cells: ["Rat flea", "Plague"] },
          { cells: ["Blood and body fluids", "AIDS, hepatitis B"] },
        ],
        caption: "Three mosquitoes, three diseases to remember: Anopheles, malaria; Aedes, dengue; Culex, filariasis.",
      },
      selfCheckExample: {
        prompt: "In 2020 Covid-19 spread to almost every country in the world. Was it endemic, epidemic or pandemic?",
        steps: ["An outbreak that crosses many countries is a pandemic."],
        answer: "Pandemic",
      },
      practiceSet: [
        { prompt: "Which mosquito spreads malaria?", answer: "The female Anopheles mosquito" },
        { prompt: "What is a disease that is always present in a particular area called?", answer: "Endemic" },
        { prompt: "Which mosquito spreads dengue?", answer: "The Aedes mosquito" },
        { prompt: "Which insect spreads kala-azar?", answer: "The sandfly" },
      ],
      pyqExampleId: "41d0f147-9cb4-4ee1-864a-44cdda735007",
      traps: [
        {
          title: "Mixing up epidemic and pandemic",
          body: "An epidemic is a sudden outbreak in one place, such as food poisoning at a wedding. A pandemic spreads across countries.",
        },
        {
          title: "Thinking every mosquito spreads malaria",
          body: "Only the female Anopheles spreads malaria. Aedes spreads dengue and Culex spreads filariasis.",
        },
        {
          title: "Calling every communicable disease contagious",
          body: "A contagious disease passes by contact. Dengue and malaria spread only through a mosquito bite, so they are not contagious.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9hbdi-prevention",
      name: "Vaccines, health programmes and tobacco",
      intuition:
        "A vaccine is a safe preview of a germ: it trains the body to fight the real disease before it comes. Each vaccine guards against particular diseases, so a question usually pairs a vaccine with the wrong disease. Tobacco works the other way: it harms the body slowly, in many places at once.",
      definition:
        "- **Edward Jenner** made the first vaccine, against **smallpox**.\n" +
        "- **RNTCP** (Revised National Tuberculosis Control Programme, renamed the National Tuberculosis Elimination Programme in 2020) fights **tuberculosis** with **DOTS** (directly observed treatment).\n" +
        "- **Nicotine** in tobacco narrows and hardens the arteries (**arteriosclerosis**) and raises the risk of heart disease.\n" +
        "- Heavy tobacco use and smoking can cause **cancer** of the mouth, throat and lungs, **trembling of the fingers**, **visual disorders**, and poor appetite and digestion.\n" +
        "- A cancer that shows almost no signs until it is far advanced, such as **liver cancer**, is called a **silent killer**.",
      table: {
        columns: ["Vaccine", "Prevents"],
        rows: [
          { cells: ["BCG", "Tuberculosis"] },
          { cells: ["Salk vaccine (injected) and oral polio drops", "Polio"] },
          { cells: ["Triple vaccine (DPT)", "Diphtheria, pertussis (whooping cough), tetanus"] },
          { cells: ["Double vaccine (DT)", "Diphtheria, tetanus"] },
          { cells: ["MMR", "Measles, mumps, rubella"] },
          { cells: ["Hepatitis B vaccine", "Hepatitis B"] },
        ],
        caption: "The letters tell you the diseases: D for diphtheria, P for pertussis, T for tetanus.",
      },
      selfCheckExample: {
        prompt: "Which national programme uses the DOTS method, and against which disease?",
        steps: ["DOTS is the treatment method of the Revised National Tuberculosis Control Programme."],
        answer: "RNTCP, against tuberculosis",
      },
      practiceSet: [
        { prompt: "Which three diseases does the MMR vaccine protect against?", answer: "Measles, mumps and rubella" },
        { prompt: "Who made the first vaccine, and against which disease?", answer: "Edward Jenner, against smallpox" },
        { prompt: "Which substance in tobacco narrows and hardens the arteries?", answer: "Nicotine" },
        { prompt: "Name two harmful effects of heavy smoking on the body.", answer: "Any two of lung cancer, hardened arteries and heart disease, trembling fingers, poor digestion" },
      ],
      pyqExampleId: "24adca7e-0416-4b3f-9d5b-733a3ccb9cea",
      traps: [
        {
          title: "Using the triple vaccine for measles",
          body: "The triple vaccine (DPT) guards against diphtheria, pertussis and tetanus. Measles is covered by the MMR vaccine.",
        },
        {
          title: "Pairing BCG with polio",
          body: "BCG prevents tuberculosis. Polio is prevented by the Salk vaccine and oral polio drops.",
        },
        {
          title: "Thinking smoking harms only the lungs",
          body: "Nicotine hardens the arteries, and tobacco also causes trembling fingers, poor digestion, eye trouble and cancers of the mouth and throat.",
        },
      ],
    },
  ],
};
