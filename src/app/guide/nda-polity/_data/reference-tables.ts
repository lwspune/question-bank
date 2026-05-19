/**
 * Content for /guide/nda-polity/reference-tables.
 *
 * Polity-specific subject artefact — the analogue of nda-english's
 * /vocab-families, nda-physics's /formulas, nda-chemistry's /common-
 * compounds, nda-biology's + nda-geography's /reference-tables, and
 * nda-history's /timeline-and-pairs. A single-page index of the ~80
 * Article + Amendment + Body + Schedule entries NDA Polity actually tests.
 *
 * Structurally a MULTI-DOMAIN reference (rendered via the new
 * PolityReferenceTables component — parallel to Biology + Geography +
 * History reference renderers; each cluster carries its own column
 * headers because Polity's named facts span 4 distinct domains:
 *
 *   1. Key Articles ↔ Subject — ~32 article-pair entries
 *      (28 q reference article numbers; bank's #1 cross-chapter lever).
 *   2. Constitutional Amendments ↔ Year ↔ Theme — ~18 amendment entries
 *      (10 q in IC chapter, also drives FR/DPSP article-additions).
 *   3. Constitutional Bodies ↔ Function ↔ Article — ~19 body entries
 *      (Constitutional Bodies subtopic 21 q; densest CTA target).
 *   4. Parts ↔ Schedules ↔ Content — ~11 structural entries
 *      (Features+Parts+Schedules subtopic 4 q · 25% HARD; structural map).
 *
 * Why themed clusters (not alphabetical flat list): matches the bank's
 * subtopic structure, and active-recall is easier when related named
 * facts are co-located. Active-recall in 4 passes (cover middle + right
 * columns, read entity name, write paired fact + context) is the highest-
 * leverage drill for the 22 q of Articles-cited + 18 q of Amendment-tested
 * + 21 q of Bodies-tested questions.
 *
 * Each entry: the entity (Article/Amendment/Body/Part), the paired fact
 * (subject/year+theme/function+article/content), optionally the playbook
 * it most often appears in (so a reader can drill that chapter's bank q),
 * and an optional trap-note for the highest-leverage distractor.
 *
 * Curation rule: every entry has appeared in the 2017–2026 NDA Polity
 * bank at least once OR is a high-leverage NCERT-grade fact a candidate
 * needs cold. Editorial curation; not exhaustive.
 */

export type ReferenceEntry = {
  /** Stable kebab-case identifier. */
  id: string;
  /** The 'left column' value — the entity being asked about. */
  name: string;
  /** The 'middle column' value — the paired fact. */
  fact: string;
  /** One-line context / detail / note. */
  context: string;
  /** Optional playbook slug — links to deep-dive. */
  playbookSlug?: string;
  /** Optional note for traps / clarification. */
  notes?: string;
};

export type ReferenceCluster = {
  /** Cluster theme. */
  theme: string;
  /** Sub-eyebrow shown below theme. */
  blurb: string;
  /** Column headers for the 3-column table. */
  columns: { name: string; fact: string; context: string };
  entries: ReferenceEntry[];
};

export const REFERENCE_CLUSTERS: ReferenceCluster[] = [
  {
    theme: "Key Articles ↔ Subject",
    blurb:
      "~32 Article-pair anchors NDA Polity tests as cross-chapter recall. The bank's #1 lever — 28 q reference Article numbers across 3 chapters. Distractors swap Article-number ↔ subject; drill the pair table cold.",
    columns: {
      name: "Article",
      fact: "Subject",
      context: "Detail + Part",
    },
    entries: [
      {
        id: "art-12",
        name: "Article 12",
        fact: "Definition of 'State' for FR purposes",
        context: "Part III · scope of who can violate FRs (govt, local authorities, other authorities — includes BCCI per Zee Telefilms 2005?)",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "art-14",
        name: "Article 14",
        fact: "Equality before law + equal protection of laws",
        context: "Part III · available to ALL PERSONS (incl. foreigners) · foundation of reasonable classification doctrine",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "art-15",
        name: "Article 15",
        fact: "Prohibition of discrimination — religion/race/caste/sex/birthplace",
        context: "Part III · CITIZENS ONLY · 15(6) added by 103rd 2019 for EWS reservation",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "art-16",
        name: "Article 16",
        fact: "Equality of opportunity in public employment",
        context: "Part III · CITIZENS ONLY · 16(4) reservation for backward classes · 16(6) added 103rd 2019 EWS",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "art-19",
        name: "Article 19",
        fact: "Six freedoms (post 44th)",
        context: "Part III · CITIZENS ONLY · speech+expression / assembly / association+cooperatives / movement / residence / profession · 19(1)(f) right to property REMOVED by 44th 1978",
        playbookSlug: "fundamental-rights-dpsp-local",
        notes: "Right to property REMOVED from 19 by 44th 1978 — now only Article 300A legal right (NOT FR). Distractor still lists 7 freedoms.",
      },
      {
        id: "art-21",
        name: "Article 21",
        fact: "Right to life and personal liberty",
        context: "Part III · ALL PERSONS · broadly read incl. privacy (Puttaswamy 2017), dignity, livelihood, environment",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "art-21a",
        name: "Article 21A",
        fact: "Right to free + compulsory education (6–14 yrs)",
        context: "Part III · added by 86th Amendment 2002 · made FR · age 6–14 (NOT 6–18 — distractor trap)",
        playbookSlug: "fundamental-rights-dpsp-local",
        notes: "Age 6–14 (NOT 6–18). Distractor stretches the age range; 14+ post-school is Article 41 (DPSP, non-justiciable).",
      },
      {
        id: "art-32",
        name: "Article 32",
        fact: "Right to Constitutional Remedies (writs)",
        context: "Part III · 5 writs: habeas corpus / mandamus / prohibition / certiorari / quo warranto · Ambedkar's 'heart and soul of the Constitution'",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "art-44",
        name: "Article 44",
        fact: "Uniform Civil Code (UCC)",
        context: "Part IV · DPSP · state to endeavour to secure for citizens a UCC throughout India",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "art-46",
        name: "Article 46",
        fact: "Promotion of educational/economic interests of SC/ST and weaker sections",
        context: "Part IV · DPSP · the 2019 EASY PYQ tests this Article",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "art-51",
        name: "Article 51",
        fact: "Promotion of international peace and security",
        context: "Part IV · DPSP · last article of Part IV · 51(c) respect for international law",
        playbookSlug: "world-polity",
      },
      {
        id: "art-51a",
        name: "Article 51A",
        fact: "Fundamental Duties (11 duties)",
        context: "Part IV-A · added by 42nd Amendment 1976 (10 duties; Swaran Singh Committee) · 11th duty 51A(k) parents' responsibility for education added by 86th 2002",
        playbookSlug: "indian-constitution",
        notes: "Article 51A inserted by 42nd 1976, NOT in original Constitution. 11 duties post-86th 2002 (originally 10).",
      },
      {
        id: "art-76",
        name: "Article 76",
        fact: "Attorney-General of India",
        context: "Part V · first law officer of GoI · holds office during pleasure of President · right to speak in either House WITHOUT right to vote",
        playbookSlug: "government-structure",
      },
      {
        id: "art-79",
        name: "Article 79",
        fact: "Constitution of Parliament",
        context: "Part V · Parliament = President + Council of States (RS) + House of the People (LS) — President IS part of Parliament for constitutional purposes",
        playbookSlug: "government-structure",
        notes: "President IS part of Parliament under Article 79 — distractor claims Parliament is 'only LS + RS' but 2020 PYQ confirmed President IS included.",
      },
      {
        id: "art-85",
        name: "Article 85",
        fact: "Sessions of Parliament + prorogation + dissolution",
        context: "Part V · President SUMMONS each House · President PROROGUES · President DISSOLVES LS · gap between sessions max 6 months",
        playbookSlug: "government-structure",
        notes: "Summoning + prorogation = President's power (NOT Speaker's). Speaker only adjourns sittings. Common HARD distractor.",
      },
      {
        id: "art-110",
        name: "Article 110",
        fact: "Definition of Money Bill",
        context: "Part V · 6-item exclusive list (taxation, borrowing, consolidated fund, etc.) · LS-introduction only · RS recommend in 14 days · Speaker's certificate FINAL",
        playbookSlug: "government-structure",
      },
      {
        id: "art-117",
        name: "Article 117",
        fact: "Definition of Finance Bill",
        context: "Part V · broader than Money Bill (any tax/finance provision) · RS has EQUAL say · no Speaker certificate",
        playbookSlug: "government-structure",
      },
      {
        id: "art-124",
        name: "Article 124",
        fact: "Establishment + Constitution of Supreme Court",
        context: "Part V · CJI + max 33 puisne judges (currently 34 incl. CJI) · 124(4) removal grounds — proven misbehaviour/incapacity",
        playbookSlug: "government-structure",
      },
      {
        id: "art-148",
        name: "Article 148",
        fact: "Comptroller and Auditor-General of India (CAG)",
        context: "Part V · appointed by President · removable like SC judge · 6 yrs or 65 yrs · reports to President per 151 → PAC",
        playbookSlug: "government-structure",
      },
      {
        id: "art-243g",
        name: "Article 243G",
        fact: "Powers, authority and responsibilities of Panchayats",
        context: "Part IX · state legislature MAY endow Panchayats with such powers · NOT about taxation (243H) or constitution (243B)",
        playbookSlug: "fundamental-rights-dpsp-local",
        notes: "243G = FUNCTIONAL devolution (planning + 11th Schedule schemes). Taxation is 243H, a separate provision. 2022 HARD PYQ tests this.",
      },
      {
        id: "art-243zd",
        name: "Article 243ZD",
        fact: "District Planning Committee",
        context: "Part IX · constitution + composition + functions · the 2023 MOD PYQ tests this Article",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "art-280",
        name: "Article 280",
        fact: "Finance Commission",
        context: "Part XII · every 5 yrs · 1 Chair + 4 members · currently 16th FC under Dr Arvind Panagariya · recommends Centre-State revenue sharing",
        playbookSlug: "government-structure",
      },
      {
        id: "art-300a",
        name: "Article 300A",
        fact: "Right to Property (legal right)",
        context: "Part XII · added by 44th Amendment 1978 · NO PERSON shall be deprived of property save by authority of law · NOT a FR anymore",
        playbookSlug: "fundamental-rights-dpsp-local",
        notes: "Right to property is Article 300A LEGAL right (NOT FR Article 19 or 31 anymore — those were removed by 44th 1978).",
      },
      {
        id: "art-324",
        name: "Article 324",
        fact: "Election Commission of India",
        context: "Part XV · CEC + 2 ECs · removable like SC judge (CEC); other ECs on CEC's recommendation · superintendence of elections",
        playbookSlug: "government-structure",
      },
      {
        id: "art-352",
        name: "Article 352",
        fact: "National Emergency",
        context: "Part XVIII · grounds: war, external aggression, ARMED REBELLION (substituted from 'internal disturbance' by 44th 1978) · approved by both Houses in 1 month",
        playbookSlug: "indian-constitution",
      },
      {
        id: "art-356",
        name: "Article 356",
        fact: "President's Rule (failure of constitutional machinery in a State)",
        context: "Part XVIII · imposed on Governor's report or otherwise · approved by both Houses in 2 months · max 3 yrs total · S.R. Bommai 1994 judicial review",
        playbookSlug: "indian-constitution",
      },
      {
        id: "art-360",
        name: "Article 360",
        fact: "Financial Emergency",
        context: "Part XVIII · never declared so far · imposed if financial stability/credit threatened · approved by both Houses in 2 months",
        playbookSlug: "indian-constitution",
      },
      {
        id: "art-368",
        name: "Article 368",
        fact: "Power of Parliament to amend Constitution",
        context: "Part XX · simple majority for some / 2/3+majority of total membership for others / 2/3+majority+half states for federal · basic structure cannot be amended (Kesavananda 1973)",
        playbookSlug: "indian-constitution",
      },
      {
        id: "art-371a",
        name: "Article 371A",
        fact: "Special provisions for Nagaland",
        context: "Acts of Parliament on Naga customary law/social/religious practices, ownership of land+resources, civil/criminal procedure don't apply UNLESS Nagaland LA so resolves",
        playbookSlug: "indian-constitution",
        notes: "Article 371A applies specifically to Nagaland — 4 areas where Parliament Acts don't auto-apply. 2024 MOD PYQ tests this scope.",
      },
      {
        id: "art-279a",
        name: "Article 279A",
        fact: "GST Council",
        context: "Part XII · added by 101st Amendment 2017 · constitutional body · chair = Union Finance Minister · vote weighted (Centre 1/3, States 2/3)",
        playbookSlug: "government-structure",
      },
      {
        id: "art-243k",
        name: "Article 243K",
        fact: "State Election Commission",
        context: "Part IX · supervises PRI elections (separate from central ECI) · 1 SEC member · removable like HC judge",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "art-151",
        name: "Article 151",
        fact: "CAG reports to President",
        context: "Part V · CAG submits Union accounts reports to President; State accounts to Governor · who lays before Parliament/SLA · then PAC reviews",
        playbookSlug: "government-structure",
      },
    ],
  },
  {
    theme: "Constitutional Amendments ↔ Year ↔ Theme",
    blurb:
      "18 major amendments tested in the bank. Constitutional Amendments subtopic alone is 10 q · 20% HARD — chapter giant for Indian Constitution. Memorise the YEAR + THEME + PART affected triple cold.",
    columns: {
      name: "Amendment",
      fact: "Year",
      context: "Theme + key change",
    },
    entries: [
      {
        id: "am-1",
        name: "1st Amendment",
        fact: "1951",
        context: "Added 9th Schedule (land reforms acts immune from judicial review at the time) · restricted right to property · Article 31A inserted",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-7",
        name: "7th Amendment",
        fact: "1956",
        context: "States Reorganization Act 1956 implementation · linguistic states on Fazl Ali Commission's recommendations · UTs introduced",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-24",
        name: "24th Amendment",
        fact: "1971",
        context: "Parliament's amending power over FRs reaffirmed (post-Golak Nath 1967) · Article 368 modified · President must give assent to Constitutional Amendments",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-25",
        name: "25th Amendment",
        fact: "1971",
        context: "Right to property further weakened · Article 31C inserted (DPSP given precedence over Articles 14 + 19 in specified areas)",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-35",
        name: "35th Amendment",
        fact: "1974",
        context: "Sikkim ASSOCIATE state status (NOT full statehood — that was 36th 1975) · the 2021 MOD PYQ tests Sikkim attribution to 35th",
        playbookSlug: "indian-constitution",
        notes: "35th = Sikkim ASSOCIATE state (1974); 36th = Sikkim FULL state (1975). Distractor swaps these.",
      },
      {
        id: "am-36",
        name: "36th Amendment",
        fact: "1975",
        context: "Sikkim FULL statehood (22nd state) · merged into Indian Union",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-42",
        name: "42nd Amendment",
        fact: "1976",
        context: "'Mini-Constitution' under Indira's Emergency · added SOCIALIST + SECULAR + INTEGRITY to Preamble · FUNDAMENTAL DUTIES 51A Part IVA inserted (10 duties) · DPSP override FRs (Article 31C extended) · LS+SLA term extended to 6 yrs (reverted by 44th)",
        playbookSlug: "indian-constitution",
        notes: "Article 51A (Fundamental Duties) inserted by 42nd 1976 — most-tested attribution. NOT in original Constitution.",
      },
      {
        id: "am-44",
        name: "44th Amendment",
        fact: "1978",
        context: "Janata govt's UNDO of 42nd · restored judicial review · LS term reverted 6→5 yrs · REMOVED right to property from FRs (Articles 19(1)(f) and 31 deleted) · added Article 300A as legal right · 'armed rebellion' replaced 'internal disturbance' in Article 352",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-52",
        name: "52nd Amendment",
        fact: "1985",
        context: "ANTI-DEFECTION LAW · 10th Schedule added · disqualification grounds for legislators changing parties · Rajiv Gandhi era",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-61",
        name: "61st Amendment",
        fact: "1989",
        context: "Voting age REDUCED 21→18 · expanded electorate significantly",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "am-73",
        name: "73rd Amendment",
        fact: "1992",
        context: "PANCHAYATI RAJ constitutional · Part IX added (Articles 243–243O) · 11th SCHEDULE lists 29 subjects devolved to PRIs · 3-tier system (Village/Block/District)",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "am-74",
        name: "74th Amendment",
        fact: "1992",
        context: "URBAN LOCAL BODIES (Municipalities) constitutional · Part IX-A added (Articles 243P–243ZG) · 12th SCHEDULE lists 18 subjects · Nagar Panchayat / Municipal Council / Municipal Corporation tiers",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-86",
        name: "86th Amendment",
        fact: "2002",
        context: "RIGHT TO EDUCATION · Article 21A made FR for 6–14 yrs (free + compulsory education) · Article 51A(k) duty for parents added (11th FD) · Article 45 DPSP modified to early childhood care+education",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-95",
        name: "95th Amendment",
        fact: "2009",
        context: "Extended SC/ST + Anglo-Indian reservation in LS + State Legislative Assemblies by 10 years (till 2020)",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-97",
        name: "97th Amendment",
        fact: "2011",
        context: "Part IX-B inserted (Cooperative Societies — Articles 243ZH–243ZT) · added 'cooperatives' to Article 19(1)(c) freedom of association · constitutional status for cooperatives",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-101",
        name: "101st Amendment",
        fact: "2017",
        context: "GOODS AND SERVICES TAX (GST) · Article 246A inserted (concurrent power on GST) · Article 279A GST Council · subsumed Central + State indirect taxes",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-103",
        name: "103rd Amendment",
        fact: "2019",
        context: "10% EWS RESERVATION in education + public employment · Article 15(6) + 16(6) inserted · separate from SC/ST/OBC reservations · upheld by SC Janhit Abhiyan 2022",
        playbookSlug: "indian-constitution",
      },
      {
        id: "am-104",
        name: "104th Amendment",
        fact: "2020",
        context: "REMOVED Anglo-Indian nomination from LS + State Legislative Assemblies (was 2 in LS, 1 in each SLA from 1950) · extended SC/ST reservation 10 more years to 2030",
        playbookSlug: "indian-constitution",
      },
    ],
  },
  {
    theme: "Constitutional Bodies ↔ Function ↔ Article",
    blurb:
      "19 body entries — the densest CTA target on /reference-tables. Constitutional Bodies and Offices is the chapter giant (21 q · 10% HARD). Distractor swaps appointment authority / removal grounds / constitutional vs statutory status.",
    columns: {
      name: "Body / Office",
      fact: "Article",
      context: "Function + appointment + removal",
    },
    entries: [
      {
        id: "body-cag",
        name: "Comptroller and Auditor-General (CAG)",
        fact: "Article 148",
        context: "Audits Union + State accounts · appointed by President · removable like SC judge · 6 yrs or 65 yrs · CONSTITUTIONAL",
        playbookSlug: "government-structure",
      },
      {
        id: "body-eci",
        name: "Election Commission of India (ECI)",
        fact: "Article 324",
        context: "Superintendence of elections to Parliament + State Legislatures + President + VP · CEC + 2 ECs · CEC removable like SC judge · CONSTITUTIONAL",
        playbookSlug: "government-structure",
      },
      {
        id: "body-upsc",
        name: "Union Public Service Commission (UPSC)",
        fact: "Article 315",
        context: "Recommends appointments + promotions + disciplinary matters · 1 chair + members · 6 yrs or 65 yrs · CONSTITUTIONAL",
        playbookSlug: "government-structure",
      },
      {
        id: "body-fc",
        name: "Finance Commission",
        fact: "Article 280",
        context: "Recommends Centre-State revenue sharing · constituted every 5 yrs · currently 16th under Dr Arvind Panagariya (2025–2030) · CONSTITUTIONAL",
        playbookSlug: "government-structure",
        notes: "16th Finance Commission chaired by Dr Arvind Panagariya, constituted Dec 31 2023 per the 2024 MOD PYQ.",
      },
      {
        id: "body-ag",
        name: "Attorney-General of India",
        fact: "Article 76",
        context: "First law officer of GoI · appointed by President · holds office during pleasure · right to speak in either House WITHOUT vote · CONSTITUTIONAL",
        playbookSlug: "government-structure",
      },
      {
        id: "body-sg",
        name: "Solicitor-General of India",
        fact: "Statutory (not Constitutional)",
        context: "Assists Attorney-General · appointed by Appointments Committee of Cabinet · STATUTORY (NOT Constitutional)",
        playbookSlug: "government-structure",
        notes: "Solicitor-General is STATUTORY, NOT Constitutional (unlike Attorney-General Article 76). Distractor common.",
      },
      {
        id: "body-ag-state",
        name: "Advocate-General of State",
        fact: "Article 165",
        context: "First law officer of State · appointed by Governor · CONSTITUTIONAL · state counterpart of AG",
        playbookSlug: "government-structure",
      },
      {
        id: "body-cic",
        name: "Central Information Commission (CIC)",
        fact: "Statutory (RTI Act 2005)",
        context: "Hears RTI appeals · CIC + up to 10 ICs · STATUTORY (NOT Constitutional)",
        playbookSlug: "government-structure",
      },
      {
        id: "body-cvc",
        name: "Central Vigilance Commission (CVC)",
        fact: "Statutory (CVC Act 2003)",
        context: "Apex integrity institution · investigates govt corruption · STATUTORY · founded on K. Santhanam Committee 1962 recommendation",
        playbookSlug: "government-structure",
      },
      {
        id: "body-lokpal",
        name: "Lokpal",
        fact: "Statutory (Lokpal and Lokayuktas Act 2013)",
        context: "Investigates corruption complaints against public servants incl. PM (with safeguards) · STATUTORY (NOT Constitutional)",
        playbookSlug: "government-structure",
        notes: "Lokpal is STATUTORY (2013 Act), NOT Constitutional. Distractor claims constitutional status — wrong. First proposed by Administrative Reforms Commission 1966 — Morarji Desai Chair.",
      },
      {
        id: "body-nhrc",
        name: "National Human Rights Commission (NHRC)",
        fact: "Statutory (Protection of Human Rights Act 1993)",
        context: "Investigates HR violations · Chair = former CJI · STATUTORY (NOT Constitutional)",
        playbookSlug: "government-structure",
      },
      {
        id: "body-ncsc",
        name: "National Commission for Scheduled Castes",
        fact: "Article 338",
        context: "Investigates SC concerns · 89th Amendment 2003 separated NCSC from NCST · CONSTITUTIONAL",
        playbookSlug: "government-structure",
      },
      {
        id: "body-ncst",
        name: "National Commission for Scheduled Tribes",
        fact: "Article 338A",
        context: "Investigates ST concerns · separated from NCSC by 89th Amendment 2003 · CONSTITUTIONAL",
        playbookSlug: "government-structure",
      },
      {
        id: "body-ncbc",
        name: "National Commission for Backward Classes",
        fact: "Article 338B",
        context: "Constitutional status by 102nd Amendment 2018 (was statutory earlier under 1993 Act) · CONSTITUTIONAL",
        playbookSlug: "government-structure",
      },
      {
        id: "body-gstc",
        name: "GST Council",
        fact: "Article 279A",
        context: "Added by 101st Amendment 2017 · chair = Union Finance Minister · vote weighted Centre 1/3 + States 2/3 · CONSTITUTIONAL",
        playbookSlug: "government-structure",
      },
      {
        id: "body-nec",
        name: "North Eastern Council (NEC)",
        fact: "Statutory (NEC Act 1971)",
        context: "Apex regional planning body for NE states · Home Minister of India is EX OFFICIO CHAIRMAN · STATUTORY",
        playbookSlug: "government-structure",
        notes: "Home Minister of India = ex officio chair of NEC. 2018 MOD PYQ tests this directly.",
      },
      {
        id: "body-zonal",
        name: "Zonal Councils",
        fact: "Statutory (States Reorganization Act 1956)",
        context: "5 zonal councils (Northern, Central, Eastern, Western, Southern) + NEC for NE · advisory · STATUTORY",
        playbookSlug: "government-structure",
      },
      {
        id: "body-pmo",
        name: "Prime Minister's Office (PMO)",
        fact: "Executive structure (not Constitutional)",
        context: "Coordinates PM's work · headed by Principal Secretary · NEITHER Constitutional NOR Statutory · executive creation",
        playbookSlug: "government-structure",
      },
      {
        id: "body-vp",
        name: "Vice President",
        fact: "Article 63–73",
        context: "Ex officio Chairman of Rajya Sabha · elected by electoral college of both Houses MPs (NOT MLAs unlike President) · STV by proportional representation · 5-yr term",
        playbookSlug: "government-structure",
      },
    ],
  },
  {
    theme: "Parts ↔ Schedules ↔ Content",
    blurb:
      "11 structural entries. Features+Parts+Schedules subtopic is 4 q · 25% HARD (densest %HARD in IC chapter). Memorise the structural map cold — common HARD distractors swap Part-numbers and confuse Anti-Defection Schedule with Scheduled Areas Part.",
    columns: {
      name: "Part / Schedule",
      fact: "Content",
      context: "Notes + amendment",
    },
    entries: [
      {
        id: "part-iii",
        name: "Part III",
        fact: "Fundamental Rights (Articles 12–35)",
        context: "6 categories: equality / freedom / against exploitation / religion / cultural+educational / constitutional remedies · justiciable",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "part-iv",
        name: "Part IV",
        fact: "Directive Principles of State Policy (Articles 36–51)",
        context: "Non-justiciable · socialistic / Gandhian / liberal-intellectual classification · novel feature of Indian Constitution (per Granville Austin)",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "part-iv-a",
        name: "Part IV-A",
        fact: "Fundamental Duties (Article 51A)",
        context: "Added by 42nd Amendment 1976 (Swaran Singh Committee) · 10 duties originally · 11th duty 51A(k) parents' responsibility added by 86th 2002",
        playbookSlug: "indian-constitution",
      },
      {
        id: "part-ix",
        name: "Part IX",
        fact: "The Panchayats (Articles 243–243O)",
        context: "Added by 73rd Amendment 1992 · 3-tier system (Village / Block / District) · 11th Schedule lists 29 subjects",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "part-ix-a",
        name: "Part IX-A",
        fact: "The Municipalities (Articles 243P–243ZG)",
        context: "Added by 74th Amendment 1992 · Nagar Panchayat / Municipal Council / Municipal Corporation tiers · 12th Schedule 18 subjects",
        playbookSlug: "indian-constitution",
      },
      {
        id: "part-ix-b",
        name: "Part IX-B",
        fact: "The Cooperative Societies (Articles 243ZH–243ZT)",
        context: "Added by 97th Amendment 2011 · constitutional status to cooperatives · 'cooperatives' added to Article 19(1)(c) at same time",
        playbookSlug: "indian-constitution",
      },
      {
        id: "part-xi",
        name: "Part XI",
        fact: "Relations between the Union and the States (Articles 245–263)",
        context: "Legislative + administrative + financial relations · 7th Schedule lists (Union/State/Concurrent) belong to this Part's scope",
        playbookSlug: "indian-constitution",
        notes: "Centre-State Relations = Part XI (NOT Part X — common distractor; Part X is Scheduled and Tribal Areas).",
      },
      {
        id: "part-xii",
        name: "Part XII",
        fact: "Finance, Property, Contracts and Suits (Articles 264–300A)",
        context: "Includes Article 280 Finance Commission · Article 300A Right to Property (added by 44th 1978) · Article 279A GST Council (added by 101st 2017)",
        playbookSlug: "indian-constitution",
      },
      {
        id: "part-xviii",
        name: "Part XVIII",
        fact: "Emergency Provisions (Articles 352–360)",
        context: "352 National Emergency · 356 President's Rule · 360 Financial Emergency · 357 Parliament's power to legislate for State under PR",
        playbookSlug: "indian-constitution",
      },
      {
        id: "sch-7",
        name: "7th Schedule",
        fact: "Three Lists (Union / State / Concurrent)",
        context: "Union List ~98 items (defence, foreign affairs, currency) · State List ~59 items (police, public health, agriculture) · Concurrent ~52 items (criminal law, civil procedure, education)",
        playbookSlug: "indian-constitution",
      },
      {
        id: "sch-9",
        name: "9th Schedule",
        fact: "Acts immune from judicial review (at the time of addition)",
        context: "Added by 1st Amendment 1951 for land reforms · post-Kesavananda 1973 → I.R. Coelho 2007: items added after April 24 1973 ARE subject to judicial review for basic structure violation",
        playbookSlug: "indian-constitution",
      },
      {
        id: "sch-10",
        name: "10th Schedule",
        fact: "Anti-Defection Law",
        context: "Added by 52nd Amendment 1985 · disqualification grounds for legislators changing parties (defection without 1/3 split — raised to 2/3 by 91st 2003)",
        playbookSlug: "indian-constitution",
        notes: "10th SCHEDULE is Anti-Defection (1985). NOT Part X (Scheduled Areas). Distractor swaps Schedule with Part.",
      },
      {
        id: "sch-5",
        name: "5th Schedule",
        fact: "Administration of Scheduled Areas and Scheduled Tribes",
        context: "Applies to Chhattisgarh / Jharkhand / Odisha / MP / AP / Telangana / Gujarat / Rajasthan / Maharashtra / Himachal Pradesh · NOT to NE states (which have 6th Schedule)",
        playbookSlug: "fundamental-rights-dpsp-local",
        notes: "5th Schedule does NOT apply to NE states — they have SIXTH Schedule. The 2019 HARD PYQ tests applicability scope.",
      },
      {
        id: "sch-6",
        name: "6th Schedule",
        fact: "NE tribal areas administration",
        context: "Applies to Assam + Meghalaya + Tripura + Mizoram · Autonomous District Councils + Regional Councils · separate constitutional regime from 5th Schedule",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "sch-11",
        name: "11th Schedule",
        fact: "29 PRI subjects",
        context: "Added by 73rd Amendment 1992 · agriculture / land improvement / minor irrigation / poverty alleviation / education / health / etc. — state MAY devolve via Article 243G enabling legislation",
        playbookSlug: "fundamental-rights-dpsp-local",
      },
      {
        id: "sch-12",
        name: "12th Schedule",
        fact: "18 Municipality subjects",
        context: "Added by 74th Amendment 1992 · urban planning / water supply / fire services / urban poverty / public health / etc.",
        playbookSlug: "indian-constitution",
      },
    ],
  },
];

/** Quick stats for the reference-tables hero. */
export const REFERENCE_STATS = {
  facts: REFERENCE_CLUSTERS.reduce((s, c) => s + c.entries.length, 0),
  clusters: REFERENCE_CLUSTERS.length,
};
