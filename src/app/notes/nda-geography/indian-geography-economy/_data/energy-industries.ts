import type { SubtopicNote } from "@/app/notes/_types";

export const ENERGY_INDUSTRIES_NOTE: SubtopicNote = {
  subtopicName: "Energy and Industries — Power, Petroleum, Iron and Steel",
  title: "Energy and Industries — Power, Petroleum, Iron and Steel",
  oneLineDefinition:
    "Where India's steel plants, oil fields, refineries, thermal and hydel power stations sit, and the industry-to-place pairs the NDA loves to match.",
  whyItMatters:
    "About 14 PYQs, leaning MODERATE-to-HARD because of the dense match-the-list grids (dam→state, plant→state, industry→place). The richest vein is the SAIL steel plants and their raw-material logistics — Rourkela, Bokaro, Bhilai, Durgapur each have a signature supply story. Add the oil-and-gas geography and the industry-to-city pairs and you cover the subtopic.",
  concepts: [
    // 1. FOUNDATION — locating an industry / power station (formula, reasoning)
    {
      kind: "formula" as const,
      slug: "industrial-location-logic",
      name: "Why an industry locates where it does",
      intuition:
        "Heavy industry settles where its inputs are cheapest to assemble. A THERMAL power station needs fossil fuel, lots of water (river/lake/sea), and good transport — proximity to an urban centre is helpful but not essential. An IRON-AND-STEEL plant needs coal, iron ore, water and power within reach, which is why they cluster on the Chhota Nagpur plateau near the Damodar coal and the Odisha iron ore. Reading the location clues — which coalfield, which river, which ore source — is how you identify a plant from a description.",
      definition:
        "- **Thermal power station** essentials: availability of **fossil fuel**, proximity to **water** (river/lake/sea), and a **good transport network**. Closeness to an urban centre is NOT essential.\n" +
        "- **Iron-and-steel** plants need coal + iron ore + water + power together — hence the Chhota Nagpur cluster (Damodar coal, Odisha ore).\n" +
        "- A plant is identified from its **raw-material logistics**: which coalfield feeds it, which river supplies water, which mines supply ore.",
      authoredExample: {
        prompt:
          "Which are essential prerequisites for a thermal power station: (1) fossil fuels, (2) proximity to water, (3) good transport, (4) proximity to an urban centre?",
        steps: [
          "Fossil fuel is the energy source — essential.",
          "Cooling water from a river/lake/sea — essential.",
          "A transport network to bring coal in — essential.",
          "Nearness to a city is convenient but not a prerequisite.",
        ],
        answer: "1, 2 and 3.",
      },
      selfCheckExample: {
        prompt:
          "A steel plant draws coal from Jharia, iron-ore from Sundargarh/Kendujhar, power from Hirakud and water from the Koel and Sankh rivers. Name it.",
        steps: [
          "Coal from Jharia plus ore from the Odisha belt points to an Odisha plant.",
          "Hirakud power and the Koel-Sankh rivers fix it on the Brahmani/Koel system.",
          "That logistics profile is the Rourkela Steel Plant.",
        ],
        answer: "Rourkela Steel Plant.",
      },
      practiceSet: [
        { prompt: "Name one essential prerequisite for a thermal power station.", answer: "Fossil fuel (also water, transport)" },
        { prompt: "Is proximity to an urban centre essential for a thermal plant?", answer: "No" },
        { prompt: "Which plateau hosts India's iron-and-steel cluster?", answer: "Chhota Nagpur plateau" },
      ],
      pyqExampleId: "71b784cf-549f-4842-90f4-aac6fd1e1163", // steel-plant location statements (Jamshedpur, Salem)
    },

    // 2. SAIL steel plants (REFERENCE)
    {
      kind: "reference" as const,
      slug: "steel-plants",
      name: "The SAIL steel plants and their logistics",
      intuition:
        "Each major steel plant has a fingerprint you can identify it by. ROURKELA (Odisha) — German collaboration, Hirakud power, Koel-Sankh water. BOKARO (Jharkhand) — 1964, Russian collaboration, Rourkela ore, Damodar Valley Corporation power/water. BHILAI (Chhattisgarh) — Russian, Tandula reservoir water. JAMSHEDPUR (TISCO) — on the Subarnarekha/Kharkai, NOT the Damodar-Barakar confluence. SALEM is the stainless-steel plant in Tamil Nadu, on the Cauvery. Renukoot is an ALUMINIUM (Hindalco) town, not iron-and-steel.",
      definition:
        "- **Rourkela (Odisha)** — German collaboration; Hirakud power; Koel + Sankh rivers.\n" +
        "- **Bokaro (Jharkhand)** — set up **1964 with Russian collaboration**; iron ore from Rourkela region; water + hydel power from the **Damodar Valley Corporation**.\n" +
        "- **Bhilai (Chhattisgarh)** — Russian collaboration; water from **Tandula** reservoir.\n" +
        "- **Jamshedpur (TISCO)** — on the Subarnarekha–Kharkai, NOT 'confluence of Damodar and Barakar' (that is the impostor statement).\n" +
        "- **Renukoot → ALUMINIUM** (Hindalco), NOT iron-and-steel. Steel centres include Bhadravati, Salem, Visakhapatnam.",
      table: {
        columns: ["Steel plant", "Signature facts"],
        rows: [
          {
            cells: ["**Rourkela**", "German; Hirakud power; Koel + Sankh"],
            noteAmber: "NDA 2024 — identified by Jharia coal + Odisha ore + Hirakud power.",
          },
          {
            cells: ["**Bokaro**", "1964, Russian; ore from Rourkela; DVC power/water"],
            noteAmber: "NDA 2025 — 1964 + Russian + DVC = Bokaro.",
          },
          { cells: ["Bhilai", "Russian; Tandula reservoir water"] },
          {
            cells: ["**Renukoot**", "Aluminium (NOT iron and steel)"],
            noteAmber: "NDA 2018 — Renukoot is the impostor in an iron-and-steel list.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "A steel plant set up in 1964 with Russian collaboration, fed iron ore from the Rourkela region, with water and hydel power from the Damodar Valley Corporation. Which plant?",
        steps: [
          "1964 + Russian collaboration narrows it to Bhilai or Bokaro.",
          "DVC power/water and Rourkela-region ore fix it as Bokaro.",
        ],
        answer: "Bokaro Steel Plant.",
      },
      practiceSet: [
        { prompt: "Which steel plant uses Tandula reservoir water?", answer: "Bhilai" },
        { prompt: "Renukoot is known for which industry?", answer: "Aluminium" },
        { prompt: "Which plant had German collaboration and Hirakud power?", answer: "Rourkela" },
      ],
      pyqExampleId: "95e2b7fe-c8c8-460f-93e8-55980864094b", // Rourkela ID
      traps: [
        {
          title: "Jamshedpur is on the Subarnarekha, not the Damodar-Barakar",
          body:
            "A common wrong statement places Jamshedpur (TISCO) 'at the confluence of Damodar and Barakar'. That confluence is near Maithon; Jamshedpur sits on the **Subarnarekha and Kharkai** rivers.",
        },
      ],
    },

    // 3. oil and gas geography (REFERENCE)
    {
      kind: "reference" as const,
      slug: "oil-gas-geography",
      name: "Oil fields and refineries",
      intuition:
        "Petroleum geography is a clean recall set. Gujarat's onshore oil fields are Ankleshwar, Kosamba, Mehsana, Kalol — Moran is in ASSAM (the trap). Assam's refineries are Digboi, Numaligarh, Bongaigaon, Guwahati — Tatipaka is in ANDHRA PRADESH (the impostor in an 'Assam refinery' list). Learn the Gujarat-vs-Assam split and the field/refinery questions answer themselves.",
      definition:
        "- **Gujarat oil fields** — **Ankleshwar, Kosamba, Mehsana, Kalol**. **Moran** is in **Assam**, not Gujarat.\n" +
        "- **Assam refineries** — **Digboi (oldest), Numaligarh, Bongaigaon, Guwahati**. **Tatipaka** is in **Andhra Pradesh**, not Assam.\n" +
        "- Lakwa (Assam) is a petroleum field; the north-east is India's oldest oil province.",
      table: {
        columns: ["Item", "Belongs to", "Impostor"],
        rows: [
          {
            cells: ["Oil fields", "Gujarat: Ankleshwar, Kosamba, Mehsana", "**Moran** (Assam)"],
            noteAmber: "NDA 2025 — Moran is the field NOT in Gujarat.",
          },
          {
            cells: ["Refineries", "Assam: Digboi, Numaligarh, Bongaigaon", "**Tatipaka** (Andhra)"],
            noteAmber: "NDA 2021 — Tatipaka is the refinery NOT in Assam.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Name India's oldest oil refinery, and the state it is in.",
        steps: [
          "The north-east is India's oldest oil province.",
          "The Digboi refinery in Assam, commissioned in 1901, is the country's oldest.",
        ],
        answer: "Digboi refinery, in Assam.",
      },
      practiceSet: [
        { prompt: "Which oil refinery is NOT in Assam: Digboi, Numaligarh, Tatipaka?", answer: "Tatipaka (Andhra Pradesh)" },
        { prompt: "Name India's oldest oil refinery.", answer: "Digboi" },
        { prompt: "Is Moran an oil field in Gujarat?", answer: "No — it is in Assam" },
      ],
      pyqExampleId: "ea3447ee-11a8-4cb0-8513-6c08ebbab0ba", // oil field not Gujarat = Moran
    },

    // 4. power plants — thermal, hydel, dams (REFERENCE)
    {
      kind: "reference" as const,
      slug: "power-plants-dams",
      name: "Thermal plants, hydel plants and dams",
      intuition:
        "Power geography comes as match-lists. THERMAL plants: Panki (UP), Parli (Maharashtra), Vijayawada (Andhra Pradesh), Vanakbori (Gujarat). HYDEL plants of the north-east: Doyang (Nagaland), Gumti (Tripura), Kapili (Assam), Ranganadi (Arunachal Pradesh). DAMS: Hirakud (Odisha), Panchet (Jharkhand), Kosi (Bihar), Ukai (Gujarat). The Vindhyachal NTPC plant serves UP, MP, Maharashtra, Gujarat — Goa is the non-beneficiary trap.",
      definition:
        "- **Thermal**: Panki → **UP**, Parli → **Maharashtra**, Vijayawada → **Andhra Pradesh**, Vanakbori → **Gujarat**.\n" +
        "- **Hydel (NE)**: Doyang → **Nagaland**, Gumti → **Tripura**, Kapili → **Assam**, Ranganadi → **Arunachal Pradesh**.\n" +
        "- **Dams**: Hirakud → **Odisha**, Panchet → **Jharkhand**, Kosi → **Bihar**, Ukai → **Gujarat**.\n" +
        "- **Vindhyachal (NTPC)** beneficiaries: UP, MP, Maharashtra, Gujarat — **Goa is NOT** a beneficiary.",
      table: {
        columns: ["Plant / dam", "State"],
        rows: [
          { cells: ["Doyang hydel", "Nagaland"] },
          { cells: ["Ranganadi hydel", "Arunachal Pradesh"] },
          { cells: ["Hirakud dam", "Odisha"] },
          { cells: ["Ukai dam", "Gujarat"] },
          {
            cells: ["Vindhyachal NTPC", "Serves UP/MP/Maharashtra/Gujarat (NOT Goa)"],
            noteAmber: "NDA 2025 (Sep) — Goa is the non-beneficiary state.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which state is NOT a beneficiary of the Vindhyachal Power Plant (NTPC): Gujarat, Goa, Maharashtra, Uttar Pradesh?",
        steps: [
          "Vindhyachal in MP serves the western and northern grid — UP, MP, Maharashtra, Gujarat.",
          "Goa, on the west coast far south, is not on its beneficiary list.",
        ],
        answer: "Goa.",
      },
      practiceSet: [
        { prompt: "Doyang hydel plant is in which state?", answer: "Nagaland" },
        { prompt: "Hirakud dam is on which state's Mahanadi?", answer: "Odisha" },
        { prompt: "Ukai dam state?", answer: "Gujarat" },
      ],
      pyqExampleId: "b4b3ccbf-fa2c-4be3-897c-01f5f2558b64", // Vindhyachal not Goa
    },

    // 5. other industries -- textiles, industry-place pairs (REFERENCE)
    {
      kind: "reference" as const,
      slug: "industry-place-pairs",
      name: "Industry-to-place pairs and textiles",
      intuition:
        "The remaining industry questions are place-pairing. COTTON TEXTILE regions: Mumbai-Pune, Madurai-Coimbatore, Indore-Ujjain — Dhanbad-Jamshedpur is the coal-steel belt, NOT textiles. Other anchors: petrochemicals at Bongaigaon, aircraft at Bengaluru, machine tools at Pinjore, paper at Saharanpur, carpets at Bhadohi, cotton at Chanderi. Raniganj is a COAL town, not iron-and-steel.",
      definition:
        "- **Cotton textile regions**: Mumbai-Pune, Madurai-Coimbatore, Indore-Ujjain. **Dhanbad-Jamshedpur is NOT** a textile region (it is coal-steel).\n" +
        "- **Industry → place**: Petrochemical → Bongaigaon; Aircraft → Bengaluru; Machine tools → Pinjore; Cotton textiles → Coimbatore.\n" +
        "- **City → industry**: Saharanpur → paper, Chanderi → cotton textile, Bhadohi → carpet. **Raniganj → coal** (NOT iron and steel).",
      table: {
        columns: ["Place", "Industry"],
        rows: [
          {
            cells: ["Dhanbad-Jamshedpur", "Coal & steel (NOT cotton textile)"],
            noteAmber: "NDA 2017 — the non-textile region in the list.",
          },
          { cells: ["Bengaluru", "Aircraft (HAL)"] },
          { cells: ["Bhadohi", "Carpet"] },
          {
            cells: ["**Raniganj**", "Coal (NOT iron and steel)"],
            noteAmber: "NDA 2023 (Sep) — 'Raniganj : Iron and steel' is the wrong pair.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which pair is NOT correctly matched: Saharanpur:Paper, Chanderi:Cotton textile, Bhadohi:Carpet, Raniganj:Iron and steel?",
        steps: [
          "Saharanpur paper, Chanderi cotton, Bhadohi carpet — all correct.",
          "Raniganj is a famous coal town, not an iron-and-steel centre.",
        ],
        answer: "Raniganj : Iron and steel.",
      },
      practiceSet: [
        { prompt: "Which region is NOT known for cotton textiles: Mumbai-Pune, Dhanbad-Jamshedpur, Indore-Ujjain?", answer: "Dhanbad-Jamshedpur" },
        { prompt: "Bhadohi is famous for which industry?", answer: "Carpet" },
        { prompt: "Raniganj is associated with which mineral/industry?", answer: "Coal" },
      ],
      pyqExampleId: "711e0d2e-e293-4c37-a4ba-5fedf06346d5", // Raniganj:iron&steel wrong pair
    },
  ],
};
