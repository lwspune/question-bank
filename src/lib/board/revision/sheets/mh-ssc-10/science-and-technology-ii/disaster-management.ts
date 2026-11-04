import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology II, Ch. 10 Disaster Management.
 * Statements checked against the Balbharati text; most-asked years from the
 * board past papers in the bank. The selfie-on-road item (2023) is taught in
 * Ch. 9 and left out here.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology II",
  subjectRoute: "science-and-technology-ii",
  chapterName: "Disaster Management",
  chapterSlug: "disaster-management",
  source: "Balbharati Science and Technology Part 2 Std X (Maharashtra State Board), Chapter 10",
  keyPoints: [
    {
      term: "Disaster",
      text: "United Nations: **the sudden event that leads to the huge loss of life and property**. 'Sudden' and 'huge' are the key words. Disasters may be natural (floods, famine, cyclones, earthquakes, volcanoes) or man-made.",
    },
    {
      term: "Types of disasters",
      text: "**Geological**: earthquake, volcano, tsunami, landslides. **Atmospheric**: cyclones, hail storm, drought, flood. **Biological**: epidemics like cholera, malaria. **Man-made**: war, fire, bomb blast, terrorism, leakage of poisonous gases, atomic tests.",
    },
    {
      term: "Effects of disaster",
      text: "Physical: collapse of buildings and bridges, contaminated water. Social and administrative: stress on workers, collapse of transport. Economic: sudden expenditure, less productivity. Health: injuries, mental stress, epidemics, deaths.",
    },
    {
      term: "Nature and scope of disaster",
      text: "Facts to think over: **pre-disaster**, **warning**, **emergency**, **rehabilitation**, **recovery** and **reconstruction** phases.",
    },
    {
      term: "Three phases for citizens",
      text: "**Emergency phase**: quick action saves the most lives (search, rescue, first aid). **Transitional phase**: rehabilitation, clearing debris, restoring water and roads. **Reconstruction phase**: rebuilding; takes a long time.",
    },
    {
      term: "Disaster management",
      text: "Improving the ability to face disasters through scientific observation and analysis of data: preventing disasters, or preparing to face them. It needs public participation and must suit the place, time and nature of the disaster.",
    },
    {
      term: "Objectives of disaster management",
      text: "Save human life and release people; supply essential commodities; restore normal life; rehabilitate victims; take protective measures so future disasters are less intense.",
    },
    {
      term: "Pre-disaster management",
      text: "Identify disaster-prone areas; collect information through predictive intensity maps and hazard maps; get special training; increase public awareness through training programmes and mass media.",
    },
    {
      term: "Post-disaster management",
      text: "Give all necessary help to victims; involve local people; quickly set up help centres; sort and deliver help material and review it; always be prepared for rescue.",
    },
    {
      term: "Disaster management authorities",
      text: "Disaster Management Act **2005**. National authority: **Prime Minister**. State: **Chief Minister**. District: **Collector** (plans and runs rehabilitation). Taluka: **Tahsildar**.",
    },
    {
      term: "National Disaster Response Force",
      text: "Set up under the Disaster Management Act 2005; **12 divisions**, headquarters in **Delhi**; in Maharashtra it works through the State Reserve Police Force. Helps in cyclones, landslides, building collapse.",
    },
    {
      term: "First aid",
      text: "Primary help to victims before actual medical treatment. Patients are moved by the cradle method, carrying on back or carrying on two hands, as their condition needs.",
    },
    {
      term: "Mock drill",
      text: "A practice to check preparedness for a disaster, using a created situation. Objectives: evaluate the response, improve coordination, find own abilities, improve quick response, find errors and risks.",
    },
    {
      term: "Helplines",
      text: "Police **100**, fire fighting **101**, ambulance **102**, disaster control unit **108**.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "What is meant by disaster? Give two examples each of natural and man-made disasters",
      steps: [
        "A sudden event that leads to huge loss of life and property (United Nations).",
        "Natural: earthquake, flood, cyclone, volcano, drought.",
        "Man-made: war, bomb blast, terrorism, leakage of toxic gases, fire.",
      ],
    },
    {
      title: "Write the objectives of disaster management",
      steps: [
        "Saving of human life during the calamity and release of the people.",
        "Supply of essential commodities to reduce the effect of disaster.",
        "Restoring human life in the region and rehabilitating victims.",
        "Protective measures so that future disasters are less intense.",
      ],
    },
    {
      title: "Explain the role of the district disaster control unit after a disaster",
      steps: [
        "It is set up immediately after the disaster or on news of it, and reviews its various aspects.",
        "It keeps contact with army, air force, navy, telecommunication department and paramilitary forces for help.",
        "It coordinates the help of voluntary organizations.",
      ],
    },
    {
      title: "Write the reasons, effects and remedial measures for one disaster (flood)",
      steps: [
        "Reasons: very heavy rainfall, rivers overflowing their banks.",
        "Effects: bridges collapse, coastal villages flood, food runs short, water is contaminated, epidemics spread.",
        "Remedies: move people to safety, give first aid and essential supplies, set up help centres, restore water and roads, rehabilitate victims.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Disaster management cycle",
      labels: ["preparation", "preparedness", "disaster strike", "response", "restoration, resurgence", "redemption"],
    },
    {
      title: "Disaster management authority (flow chart)",
      labels: ["National: Prime Minister", "State: Chief Minister", "District: Collector", "Taluka: Tahsildar"],
    },
  ],
  mostAsked: [
    { topic: "Types of disasters: define disaster, natural and man-made examples, volcano is geological, odd one out", marks: 1, years: [2025, 2022, 2019] },
    { topic: "Objectives of disaster management", marks: 2, years: [2025, 2024, 2023, 2019] },
    { topic: "Authorities and NDRF: District Collector, chairman of the national authority, Disaster Management Act 2005", marks: 1, years: [2026, 2025, 2023] },
    { topic: "Effects of a disaster from a picture; reasons, effects and remedies of one disaster", marks: 2, years: [2025, 2020] },
    { topic: "Precautions and pre and post-disaster management for given disasters (earthquake, fire, snake bite, gas leak, flood)", marks: 2, years: [2026, 2024] },
    { topic: "Six materials in a first aid box", marks: 3, years: [2026, 2024] },
    { topic: "Nature and scope of disaster: phases (emergency, transitional, reconstruction), facts to think over", years: [2026, 2024] },
  ],
  mistakes: [
    {
      title: "Wrong chairman at each level",
      body: "National: Prime Minister. State: Chief Minister. District: Collector. Taluka: Tahsildar. A Sarpanch is not the chairman of the national authority.",
    },
    {
      title: "Natural or man-made",
      body: "War, terrorism, bomb blast and leakage of toxic gases are man-made. Earthquake, flood, tsunami and volcano are natural (volcano is geological).",
    },
    {
      title: "Listing medicines only in the first aid box",
      body: "Name materials: bandage strips, wound gauze, triangular bandage, medicated cotton, hand gloves, antiseptic (Dettol/Savlon), safety pins, scissor, thermometer, band aid, torch.",
    },
    {
      title: "Mixing pre and post-disaster steps",
      body: "Pre-disaster: identify risky areas, hazard maps, training, awareness. Post-disaster: help victims, help centres, deliver and review help material.",
    },
  ],
};

export default sheet;
