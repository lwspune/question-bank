/**
 * Content for /guide/nda-polity/strategy.
 *
 * NDA Polity strategy = TIER-STYLE strand split (second use after History;
 * but with the THIRD tier INVERTED — smallest chapter is also HARDEST, not
 * easiest). Chosen because Polity is the SMALLEST GAT section (avg 5 q/
 * paper) with only 4 chapters; strategic-priority labels are more
 * actionable than skill-bucket labels at this scale.
 *
 * Strand split (90 q):
 *   - Cornerstone        ( 36 q · 1 chapter · 40% of bank): Government
 *     Structure. Drill all 4 subtopics; target HARDs in Parliament +
 *     Judiciary. Cannot be cherry-picked — Constitutional Bodies (21 q)
 *     is 58% of the chapter.
 *   - Foundation Recall  ( 42 q · 2 chapters · 47% of bank): Indian
 *     Constitution + Fundamental Rights/DPSP/Local Governance.
 *     Constitutional-content recall (Articles, Amendments, FRs, DPSP,
 *     Parts/Schedules). Drill /reference-tables → Key Articles cluster +
 *     Amendments cluster cold.
 *   - Specialist Wildcard ( 12 q · 1 chapter · 13% of bank): World Polity.
 *     HIGHEST %HARD chapter (42%) — multi-statement-dominant (50%)
 *     abstract theory + UN reference. Small chapter but high-stakes — the
 *     UN subtopic alone is 60% HARD (densest %HARD subtopic in entire
 *     Polity bank).
 *
 * GAT PART A Polity is ~5 q per single paper (range 2–10 across 18 papers
 * in the bank; avg 5.0). Marks per correct = 4, penalty −1.33 per wrong.
 * Per-paper max ≈ 20 marks. (Note: NDA Polity sits in GAT PART A alongside
 * Geography (~19 q), History (~14 q), Economics (~1–2 q), Current Affairs
 * (~10 q), plus English in its own PART. Each section contributes
 * independently to the GAT 600-mark total.)
 */

import type { Difficulty } from "@/lib/questions/filters";

export type StrandChapter = {
  chapter: string;
  qCount: number;
  pctHard: number;
  /** Subtopics to drill (each becomes a "Drill →" CTA). */
  mustDrill: string[];
  /** Realistic marks ceiling per paper from this chapter. */
  expectedYieldPerPaper: string;
  studyHours: number;
  /** 1-2 sentence pitch shown at the top of the card. */
  summary: string;
};

export type StrategyStrand = {
  id: "cornerstone" | "foundation" | "specialist";
  label: string;
  qCount: number;
  pctOfBank: number;
  /** One-paragraph "what this strand is" pitch. */
  pitch: string;
  /** The prep approach — what makes this strand distinct. */
  approach: string[];
  chapters: StrandChapter[];
};

/** Headline numbers shown in the strategy hero. PART A Polity is ~5 q per
 *  single paper on the GAT (range 2–10 across 18 papers in the bank; avg
 *  5.0). Max marks per paper ≈ 20 (5 × 4), penalty −1.33 per wrong.
 *  Target: 14 marks (~4 correct of 5, 1 wrong, net = 16 − 1.33 ≈ 14.7). */
export const STRATEGY_HEADLINE = {
  paperQ: 5,
  totalMarks: 20,
  marksPerCorrect: 4,
  penaltyPerWrong: 1.33,
  targetMarks: 14,
  targetAttempts: 5,
  targetAccuracyPct: 80,
};

export const CORNERSTONE_STRAND: StrategyStrand = {
  id: "cornerstone",
  label: "Cornerstone — Government Structure (36 q · 40%)",
  qCount: 36,
  pctOfBank: 40,
  pitch:
    "Government Structure is the bank's largest chapter AND carries the most absolute HARDs (6 of 17 bank-wide). Constitutional Bodies and Offices (21 q · 10% HARD) is the chapter giant — 58% of the chapter is named-fact recall about who heads what, who appoints whom, removal grounds, Articles. Parliament — Composition, Procedures and Powers (10 q · 30% HARD) is the densest %HARD subtopic in the chapter — Money Bill vs Finance Bill distinction, Speaker's powers (sine-die adjournment, prorogation), Committee composition (Public Accounts / Estimates / Public Undertakings), Table of Precedence. Judiciary — Supreme Court and High Courts (2 q · 50% HARD) is tiny but HARD-dense (HC territorial jurisdictions like Calcutta → also covers Andaman, Madras → Puducherry). Drill all 4 subtopics; you'll see 2–3 questions from this chapter per paper.",
  approach: [
    "Read /reference-tables → 'Constitutional Bodies ↔ Function ↔ Article' cluster end-to-end first. It carries ~18 body-pair anchors that map directly onto Constitutional Bodies (21 q). Without it, every CAG/ECI/UPSC/Attorney-General/Lokpal question is a guess.",
    "Constitutional Bodies and Offices (21 q · 10% HARD) is the chapter giant. Anchor each body's APPOINTMENT + REMOVAL + ELIGIBILITY cold: CAG (President appoints, removable like SC judge under Article 124(4) — proven misbehaviour/incapacity by 2/3 of each House, 6-yr term or 65 yrs; submits reports to President per Article 151 → Public Accounts Committee); ECI (CEC + 2 ECs, removable like SC judge, 6 yrs or 65 yrs; superintendence of elections under Article 324); UPSC (constitutional under Article 315, 6 yrs or 65 yrs; advises President); Finance Commission (Article 280, every 5 yrs, currently 16th under Arvind Panagariya); Attorney-General (Article 76, holds office during pleasure of President, right to speak in either House WITHOUT right to vote, first law officer of GoI); Lokpal (statutory 2013 Act, NOT a constitutional body — important distinction); NHRC (statutory 1993 Act, NOT constitutional); North Eastern Council (Home Minister ex-officio Chairman). Distractor swaps removal grounds, appointment authority, or constitutional vs statutory status.",
    "Parliament — Composition, Procedures and Powers (10 q · 30% HARD — densest %HARD in chapter) tests procedural distinctions cold. Lok Sabha (max 552 incl. 2 nominated Anglo-Indians since 95th Amendment 2009 — but Anglo-Indian provision LAPSED with 104th Amendment 2020; now max 550); Rajya Sabha (max 250, of which 238 elected indirectly + 12 nominated by President for art/literature/science/social service). MONEY BILL (Article 110 — definition; LS-introduced only with President's recommendation; RS can only recommend, must return in 14 days; Speaker's certificate FINAL) vs FINANCE BILL (Article 117 — wider scope incl. taxation but not exclusively; RS has equal say; no Speaker certificate). Speaker: adjourns House sine die (BUT prorogation is by President under Article 85, NOT Speaker — common HARD trap); Lok Sabha summoning is by President. Committees: Public Accounts Committee 22 members (15 LS + 7 RS); Estimates Committee 30 members (ALL Lok Sabha — RS not included); Public Undertakings 22 members (15 LS + 7 RS). Table of Precedence: PM (7) > Speaker LS = CJI (6) > Cabinet Ministers (7) > Governors WITHIN their state (3 — high in their state) > Vice President (2) — distractor mixes within-state vs national ranking.",
    "Judiciary — Supreme Court and High Courts (2 q · 50% HARD) is small but HARD-loaded. Memorise COMMON High Court territorial jurisdictions cold: Calcutta HC (West Bengal + Andaman & Nicobar Islands); Madras HC (Tamil Nadu + Puducherry); Bombay HC (Maharashtra + Goa + Dadra & Nagar Haveli + Daman & Diu); Punjab & Haryana HC (Punjab + Haryana + Chandigarh); Gauhati HC (Assam + Nagaland + Mizoram + Arunachal Pradesh — NOT Manipur which has its own HC since 2013); Kerala HC (Kerala + Lakshadweep). SC jurisdictions: ORIGINAL (Article 131 — disputes between Centre and States or between States); APPELLATE (Article 132–134); ADVISORY (Article 143 — President seeks opinion); WRIT (Article 32 — Fundamental Right itself); REVIEW (Article 137); EPISTOLARY (PIL).",
    "Government Departments and Schemes (3 q · 0% HARD) is a guaranteed marks pocket. Read once cold: GST Council chair = Union Finance Minister (Article 279A); ministries under Home Affairs (J&K affairs DEPARTMENT moved to MHA, NOT Department of Border Management); flagship schemes (PM-KISAN, Ayushman Bharat, Bharatmala Pariyojana — coastal roads + border connectivity + Logistics Park). Low %HARD — don't overthink.",
  ],
  chapters: [
    {
      chapter:
        "Government Structure — Parliament, Judiciary and Constitutional Bodies",
      qCount: 36,
      pctHard: 17,
      mustDrill: [
        "Constitutional Bodies and Offices",
        "Parliament — Composition, Procedures and Powers",
        "Government Departments and Schemes",
        "Judiciary — Supreme Court and High Courts",
      ],
      expectedYieldPerPaper: "~6 marks",
      studyHours: 5,
      summary:
        "36 q · 17% HARD — bank's largest chapter (40%) AND highest absolute HARDs. Constitutional Bodies (21 q · 10% HARD) is the chapter giant; Parliament (10 q · 30% HARD) carries the densest %HARD. Drill all 4 subtopics; the Bodies + Articles reference table compounds directly here.",
    },
  ],
};

export const FOUNDATION_STRAND: StrategyStrand = {
  id: "foundation",
  label:
    "Foundation Recall — Indian Constitution + FR/DPSP/Local Governance (42 q · 47%)",
  qCount: 42,
  pctOfBank: 47,
  pitch:
    "Indian Constitution + Fundamental Rights/DPSP/Local Governance are the constitutional-content recall chapters — Articles, Amendments, Parts/Schedules, FRs and DPSP. 42 q across 7 subtopics at ~14% HARD avg. The lever is Article-number ↔ subject mastery: Article 14 (equality before law), 19 (six freedoms), 21 (life and liberty), 21A (RTE inserted by 86th 2002), 32 (writs — Constitutional Remedies, Ambedkar's 'heart and soul'), 226 (HC writs — wider scope than 32), 243G (Panchayat powers), 280 (Finance Commission), 324 (ECI), 352 (Emergency), 356 (President's Rule on State). The /reference-tables page does most of the work — drill 'Key Articles ↔ Subject' + 'Amendments ↔ Year ↔ Theme' clusters in active-recall mode.",
  approach: [
    "Read /reference-tables → 'Key Articles ↔ Subject' + 'Constitutional Amendments ↔ Year ↔ Theme' clusters first. These two clusters carry ~50 named-fact anchors that map directly onto FR/DPSP + Amendments recall. Without them, every Article-number or Amendment-year question is a guess.",
    "Constitutional Amendments (10 q · 20% HARD) is the chapter giant. Anchor key amendments cold: 1st 1951 (added 9th Schedule, restricted right to property to protect land reforms); 7th 1956 (states reorganization on linguistic lines); 24th 1971 (Parliament's amending power over FRs, post-Golak Nath); 25th 1971 (right to property weakened); 35th 1974 (Sikkim associate status); 36th 1975 (Sikkim full statehood); 42nd 1976 ('mini-Constitution' under Indira's Emergency — added 'socialist', 'secular', 'integrity' to Preamble, FUNDAMENTAL DUTIES Article 51A Part IVA, made DPSP override FRs); 44th 1978 (Janata govt undid much of 42nd — restored judicial review, removed right to property from FRs); 52nd 1985 (Anti-Defection — 10th Schedule); 61st 1989 (voting age 21→18); 73rd 1992 (Panchayati Raj — Part IX, 243-243O, 11th Schedule); 74th 1992 (Municipalities — Part IX-A, 243P-243ZG, 12th Schedule); 86th 2002 (RTE — Article 21A made FR for 6–14 yrs); 95th 2009 (extended SC/ST reservation in legislatures); 101st 2017 (GST); 103rd 2019 (10% EWS reservation); 104th 2020 (removed Anglo-Indian nomination, extended SC/ST reservation 10 more years).",
    "Fundamental Rights, DPSP and Duties (8 q · 0% HARD) is a guaranteed marks pocket. FRs: Article 14 (equality before law), 15 (no discrimination by religion/race/caste/sex/place of birth), 16 (equal opportunity in public employment), 17 (untouchability abolished), 18 (titles abolished except military/academic), 19 (six freedoms — speech/expression, assembly, association, movement, residence, profession; right to property REMOVED from 19 by 44th 1978), 20 (protection in respect of conviction — no ex post facto, no double jeopardy, no self-incrimination), 21 (life and liberty), 21A (RTE), 22 (preventive detention safeguards), 23 (no human trafficking/forced labour), 24 (no child labour under 14 in factories/hazardous work), 25–28 (religious freedoms), 29–30 (cultural and educational rights of minorities), 32 (constitutional remedies — Ambedkar's 'heart and soul'). DPSP (Part IV, Articles 36–51): non-justiciable (cannot be enforced by courts); Article 38 (welfare state), 39 (livelihood), 39A (equal justice), 40 (panchayats), 41 (work right), 42 (just working conditions), 43 (living wage), 43A (workers' participation in management — added by 42nd), 44 (UCC), 45 (early childhood care — modified by 86th from primary education), 48 (organisation of agriculture and animal husbandry), 48A (environment — added by 42nd), 51 (international peace). FUNDAMENTAL DUTIES (Article 51A Part IVA, 11 duties, inserted by 42nd 1976 — last duty about parents' responsibility for children's education added by 86th 2002). Common HARD distractor: claims a 'right to property' is a FR (WRONG — removed from FRs by 44th 1978; now only a legal right under Article 300A).",
    "Electoral Systems (9 q · 22% HARD) tests political party recognition + electoral process. NATIONAL PARTY recognition (any ONE of): (a) 6% valid votes in 4+ states in general elections to LS/State Assembly + 4 LS seats from any state(s); (b) 2% LS seats (= 11 seats) from at least 3 states; (c) recognised as State party in 4+ states. STATE PARTY: similar 6%+2 seats or 3%+3% conditions. India's electoral system: First-Past-the-Post (FPTP) for direct elections to LS and State Legislative Assemblies; Single Transferable Vote (STV) for indirect election of President, Vice President, RS, and Legislative Council; Proportional Representation by SINGLE TRANSFERABLE VOTE for President (only the Members of elected legislatures vote, with weighted votes). EVMs used since late 1990s, VVPAT introduced 2013. Election Commissioners removed by motion needing 2/3 majority of EACH House on grounds of proven misbehaviour or incapacity — same as SC Judges (Article 324).",
    "Local Self-Government and Panchayati Raj (5 q · 20% HARD) tests committee chronology + Article numbers. Lord RIPON's 1882 resolution = MAGNA CARTA of Local Self-Government in India (introduced elected local boards). Post-independence committees: Balwantrai Mehta Committee 1957 (recommended 3-tier system — VP, BP, ZP — adopted by Rajasthan first, October 1959 Nagaur); Ashok Mehta Committee 1977–78 (recommended 2-tier — Mandal at base, ZP); GVK Rao Committee 1985; LM Singhvi Committee 1986 (recommended constitutional status for PRIs); Sarkaria Commission 1983 (Centre-State relations, not PRI but cited together). 73rd Amendment 1992 (Part IX, Articles 243–243O, 11th Schedule lists 29 subjects). Article 243G = Panchayat powers and responsibilities (a state legislature MAY endow Panchayats with such powers; not a fixed list). Article 243ZD = District Planning Committee. NOT a power under 243G: levying taxes (that's under Article 243H — a separate provision); managing markets/fairs (that's a 11th Schedule subject the state MAY devolve, but the power itself comes from 243G enabling legislation). Distractor mixes Article 243G with 243H, or claims PRIs are constitutional from 1947 (they're constitutional only since 73rd 1992).",
  ],
  chapters: [
    {
      chapter: "Indian Constitution — Making, Foundation and Amendments",
      qCount: 20,
      pctHard: 15,
      mustDrill: [
        "Constitutional Amendments",
        "Features, Parts and Schedules of Constitution",
        "Making of Constitution and Constitutional History",
        "Federal Structure — States, UTs and Finance",
      ],
      expectedYieldPerPaper: "~3 marks",
      studyHours: 3,
      summary:
        "20 q · 15% HARD. Constitutional Amendments (10 q · 20% HARD) is the chapter giant — drill the major amendments (1st, 7th, 42nd, 44th, 73rd/74th, 86th, 101st, 103rd, 104th). Parts/Schedules cluster on /reference-tables compounds directly. Easy marks pocket on Making of Constitution + Federal Structure.",
    },
    {
      chapter: "Fundamental Rights, DPSP and Local Governance",
      qCount: 22,
      pctHard: 14,
      mustDrill: [
        "Electoral Systems",
        "Fundamental Rights, DPSP and Duties",
        "Local Self-Government and Panchayati Raj",
      ],
      expectedYieldPerPaper: "~3 marks",
      studyHours: 3,
      summary:
        "22 q · 14% HARD. FR/DPSP/FD (8 q · 0% HARD) is a guaranteed marks pocket — read FR articles 12–35 + DPSP 36–51 + FD 51A cold. Electoral Systems (9 q · 22% HARD) is densest %HARD — drill political party recognition + Fifth Schedule + 11th Schedule. Local Self-Government tests Article 243G powers + committees chronology.",
    },
  ],
};

export const SPECIALIST_STRAND: StrategyStrand = {
  id: "specialist",
  label: "Specialist Wildcard — World Polity (12 q · 13%)",
  qCount: 12,
  pctOfBank: 13,
  pitch:
    "World Polity is the SMALLEST chapter (12 q · 13% of bank) BUT the HARDEST — 42% HARD, 50% multi-statement. This INVERTS History's Quick-Win pattern (small AND easy) — Polity's smallest chapter is its highest-stakes. The chapter is abstract theory + UN reference content; questions usually arrive as 'consider the following statements about UNSC composition' or 'pair UN Peacekeeping operations with countries' (UNMOGIP India-Pakistan, UNFICYP Cyprus, UNMIK Kosovo, UNTSO Israel-Palestine, UNDOF Golan Heights). The skill is statement-by-statement T/F evaluation + UN-acronym ↔ region recall. A candidate who covers this chapter cold gets +4 marks per paper that others skip; one who ignores it loses 2–3 marks to confident-but-wrong picks.",
  approach: [
    "United Nations and Global Institutions (5 q · 60% HARD — DENSEST %HARD subtopic in entire Polity bank). UNSC composition: 15 total — 5 permanent (P5: US + UK + France + Russia + China; ALL have veto) + 10 non-permanent (elected for 2-yr terms by General Assembly, 5 elected each year, distributed: 5 from Africa+Asia, 1 Eastern Europe, 2 Latin America+Caribbean, 2 Western Europe+Others). Non-permanent member elections need 2/3 majority. India is currently a non-permanent member (2021–22 term ended). UN PEACEKEEPING OPERATIONS cold: UNMOGIP (UN Military Observer Group in India and Pakistan, since 1949, monitors Kashmir LoC); UNFICYP (UN Peacekeeping Force in Cyprus, since 1964); UNMIK (UN Mission in Kosovo, since 1999); UNTSO (UN Truce Supervision Org, since 1948, Israel-Palestine — UN's OLDEST peacekeeping mission); UNDOF (UN Disengagement Observer Force, Golan Heights between Israel-Syria, since 1974); MONUSCO (DR Congo). UN DECLARATIONS/COVENANTS chronology: UDHR 1948 → ICCPR 1966 → ICESCR 1966 → CEDAW 1979 → CRC 1989 (Convention on Rights of Child) → CRPD 2006 (Disabilities). SDG: 17 goals adopted 2015 — Goal 1 End poverty, Goal 2 Zero hunger (NOT 'healthy lives' — that's Goal 3 Good health and well-being), Goal 4 Quality education, Goal 5 Gender equality (NOT Goal 4). Distractor misaligns SDG goal numbers; verify each pair.",
    "Democracy and Political Theory (5 q · 40% HARD). UNIVERSAL ADULT FRANCHISE chronology cold: USA gave full franchise to men 1870 (15th Amendment, race) + women 1920 (19th Amendment) — so universal 1920; Sri Lanka 1931 (under British Donoughmore Constitution — granted earlier than India); India 1950 (Constitution from day one); Japan 1947 (post-WWII Constitution, women included). 2025 HARD chronological PYQ: USA 1920 → Sri Lanka 1931 → Japan 1947 → India 1950. Democracy FEATURES (Robert Dahl + later theorists): consent of the governed, political equality, accountability of the RULER to the ruled (NOT ruled to ruler — common distractor), free and fair elections, civil liberties, rule of law. Lincoln's Gettysburg Address 1863 ('government of the people, by the people, for the people'). AMERICAN DECLARATION OF INDEPENDENCE 1776 rights: Life + Liberty + Pursuit of Happiness (NOT 'Fraternity' — that's French Revolution's liberty-equality-fraternity).",
    "India's Foreign Policy — Panchsheel (2 q · 0% HARD) is an easy marks pocket but read cold. PANCHSHEEL (5 principles) signed April 29 1954 between India + China in agreement on Tibet (Nehru–Zhou Enlai): (1) Mutual respect for each other's territorial integrity and sovereignty; (2) Mutual NON-AGGRESSION; (3) Mutual NON-INTERFERENCE in each other's internal affairs; (4) EQUALITY and mutual benefit; (5) PEACEFUL COEXISTENCE. Distractor adds 'collective security' or 'economic cooperation' or 'cultural exchange' — these are NOT Panchsheel principles. Don't get fooled by closely-related but non-Panchsheel concepts.",
    "TEST-DAY HEURISTIC for World Polity: it's 1–3 questions per paper. Spend 2-3 min on this chapter LAST. If you've drilled the UN cluster + Panchsheel + democracy features cold, the questions fall fast. If you HAVEN'T drilled, the 42% HARD means guessing is negative-EV (−1.33 per wrong, and 3 of 5 distractors are designed to feel right). Skip rather than guess for this chapter — confidence threshold ~75% (vs ~55% for recall-heavy chapters).",
  ],
  chapters: [
    {
      chapter: "World Polity, Democracy and International Relations",
      qCount: 12,
      pctHard: 42,
      mustDrill: [
        "Democracy and Political Theory",
        "United Nations and Global Institutions",
        "India's Foreign Policy — Panchsheel",
      ],
      expectedYieldPerPaper: "~3 marks",
      studyHours: 2,
      summary:
        "12 q · 42% HARD — smallest chapter, HARDEST %HARD. UN subtopic alone (5 q · 60% HARD) is the densest %HARD subtopic in the entire Polity bank. 50% multi-statement — drill statement-by-statement T/F discipline. Specialist Wildcard: skip rather than guess if not drilled cold.",
    },
  ],
};

export const STRATEGY_STRANDS = [
  CORNERSTONE_STRAND,
  FOUNDATION_STRAND,
  SPECIALIST_STRAND,
];

export type TestDayPhase = {
  durationMin: number;
  label: string;
  detail: string;
};

/** Test-day attempt order — Cornerstone first (largest stake), then
 *  Foundation Recall (recall-heavy, fast), Specialist last (multi-statement
 *  — if not confident in T/F of each statement, skip). Slot budget is ~4
 *  min total (PART A Polity's share of the 150-min GAT is roughly
 *  proportional to its q-count: ~5 q × ~50 sec ≈ 4 min). */
export const TEST_DAY_PLAN: TestDayPhase[] = [
  {
    durationMin: 2,
    label: "Sweep Cornerstone (Government Structure)",
    detail:
      "Government Structure contributes ~2–3 q to a typical paper (40% of bank). Hit Constitutional Bodies + Parliament first — body-power and procedural questions fire fast for a candidate who's drilled the Bodies cluster. Money Bill vs Finance Bill, Speaker's powers, HC territorial jurisdictions — answer fires in <15 sec or skip. Target: 2 correct in 2 min.",
  },
  {
    durationMin: 1.5,
    label: "Sweep Foundation Recall (IC + FR/DPSP/Local Gov)",
    detail:
      "Indian Constitution + FR/DPSP/Local Governance contribute ~2 q to a typical paper. Article-number ↔ subject pairings + Amendment ↔ year + Schedule contents — drill the /reference-tables clusters and these fire in 10 sec each. Common HARD: Article 51A FD insertion (42nd Amendment 1976) vs RTE (86th 2002). Target: 1–2 correct.",
  },
  {
    durationMin: 0.5,
    label: "Specialist Wildcard last (World Polity)",
    detail:
      "World Polity contributes ~1 q to a typical paper (highest %HARD chapter). If you've drilled UN acronyms + Panchsheel cold, the answer fires fast — multi-statement evaluation: each statement T/F independently. If you HAVEN'T drilled cold and the question is multi-statement, the −1.33 penalty makes guessing negative-EV. Confidence threshold 75%+. Target: 1 correct or skip.",
  },
];

export type TimeBudgetRow = {
  label: string;
  hours: number;
  outcome: string;
};

export const TIME_BUDGET: TimeBudgetRow[] = [
  { label: "Cornerstone — Government Structure", hours: 5, outcome: "~6 marks/paper" },
  { label: "Foundation Recall — IC + FR/DPSP/Local Governance", hours: 6, outcome: "~6 marks/paper" },
  { label: "Specialist Wildcard — World Polity", hours: 2, outcome: "~3 marks/paper" },
  { label: "Reference tables — active recall (the /reference-tables page)", hours: 2, outcome: "Compounding gains across all strands" },
  { label: "Past papers, timed (last 3 years)", hours: 1, outcome: "Calibration + speed" },
];

export const DIFFICULTIES_EASY_MOD: Difficulty[] = ["EASY", "MODERATE"];
