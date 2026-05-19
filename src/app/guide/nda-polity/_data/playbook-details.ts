/**
 * Per-playbook deep-dive content for /guide/nda-polity/playbooks/{slug}.
 *
 * Each entry mirrors history/geography/biology/chemistry/physics/english
 * shape: trigger (one-line "when to reach for this"), story (2–3
 * paragraph teacherly explanation), sub-skills (the rules / patterns
 * inside), traps (chapter-specific distractor shapes), worked example
 * UUIDs (2 per playbook, resolved via loadWorkedExamples at request time),
 * and relatedSlugs (cross-links to other playbooks).
 *
 * UUIDs SQL-picked 2026-05-19 against the live 90-q NDA Polity PUBLIC
 * bank — most-recent year first, HARD picked when the chapter has a HARD
 * pool. All 4 chapters have details.
 */

export type PlaybookDetail = {
  /** One-line "when to use" cue. */
  trigger: string;
  /** 2–3 paragraph teacherly explanation. */
  story: string[];
  /** The rules / sub-skills inside this playbook. */
  subSkills: { name: string; description: string }[];
  /** Distractor patterns specific to this playbook. */
  traps: { name: string; description: string }[];
  /** Ordered worked-example UUIDs from the bank. */
  exampleQuestionIds: string[];
  /** Cross-link to 2–3 related playbook slugs. */
  relatedSlugs: string[];
};

export const PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  // ───────────────────────────── CORNERSTONE ─────────────────────────────
  "government-structure": {
    trigger:
      "A Constitutional Body question (CAG / ECI / UPSC / Attorney-General / Lokpal / Finance Commission — appointment, removal, eligibility, reporting line), a Parliament procedure question (Money Bill vs Finance Bill, Speaker's powers, committee composition, Table of Precedence), a High Court territorial-jurisdiction question (Calcutta = WB + A&N, Madras = TN + Puducherry), or a government scheme / ministry question (GST Council, Bharatmala, Ayushman Bharat).",
    story: [
      "36 q in 10 years — NDA Polity's largest chapter AND carrier of the most absolute HARDs (6 of 17 bank-wide, 17% rate). Constitutional Bodies and Offices is the chapter giant (21 q · 10% HARD — 58% of chapter's content). The HARD pool concentrates in Parliament — Composition, Procedures and Powers (10 q · 30% HARD — densest %HARD subtopic in chapter) and Judiciary — Supreme Court and High Courts (2 q · 50% HARD — small but HARD-dense). The strategy is 'drill all 4 subtopics, target HARDs in Parliament + Judiciary' — Government Departments and Schemes (3 q · 0% HARD) is a guaranteed marks pocket that doesn't need extra drill time.",
      "Constitutional Bodies questions anchor on APPOINTMENT + REMOVAL + ELIGIBILITY + REPORTING LINE. CAG (Article 148): appointed by President; removable like SC judge (Article 124(4) — proven misbehaviour/incapacity, 2/3 vote of each House present and voting + majority of total membership); tenure 6 yrs or until 65; reports to President per Article 151, who lays before Parliament — Public Accounts Committee then takes up. NOT eligible for further GoI office after ceasing. ECI (Article 324): CEC + 2 ECs; removable like SC judge; superintendence/direction/control of elections to Parliament + state legislatures + offices of President + Vice President. UPSC (Article 315–323): constitutional, advises President on appointments + promotions + disciplinary matters. Finance Commission (Article 280): every 5 yrs, recommends Centre-State revenue sharing — currently 16th under Dr. Arvind Panagariya. Attorney-General (Article 76): first law officer of GoI; appointed by President; holds office during pleasure; right to speak in either House WITHOUT right to vote; right to participate in joint sittings; not a govt servant strictly (private practice allowed). Common HARD distractor swaps CONSTITUTIONAL vs STATUTORY status — Lokpal (2013 Act) and NHRC (1993 Act) are STATUTORY, not constitutional; UPSC and Finance Commission ARE constitutional. North Eastern Council (NEC): Home Minister of India is ex-officio Chairman.",
      "Parliament — Composition, Procedures and Powers (10 q · 30% HARD) tests procedural distinctions that NDA distractor-swaps relentlessly. MONEY BILL (Article 110) vs FINANCE BILL (Article 117): Money Bill = exclusively matters in Article 110 list (taxation, borrowing, consolidated fund, contingency fund, etc.), introduced in LS only with President's recommendation, RS can only RECOMMEND amendments and must return within 14 days, Speaker's certificate is FINAL. Finance Bill = broader (any provision dealing with tax/finance but not exclusively Article 110), can be introduced in either house but if money provisions then needs LS-introduction with President's recommendation, RS has EQUAL say. Speaker's powers: adjourns the House SINE DIE (yes — Speaker can do this); presides over joint sittings; decides whether a Bill is Money Bill or not; casting vote when tied. PROROGATION is by PRESIDENT under Article 85 (NOT Speaker — common HARD trap). Summoning the Houses is also by President. COMMITTEES: Public Accounts Committee 22 members (15 LS + 7 RS — RS members ARE included); Estimates Committee 30 members (ALL Lok Sabha — RS NOT included, common HARD distractor); Committee on Public Undertakings 22 members (15 LS + 7 RS). TABLE OF PRECEDENCE: Rank 1 President / 2 Vice President / 3 PM / 3 Governors within their state / 4 former Presidents + Deputy PM / 6 CJI + Speaker LS / 7 Cabinet Ministers + Union Ministers + Vice Chairman Planning Commission + CMs / etc. So order in 2026 PYQ: VP (2) > Governors within state (3) > PM (3) > Speaker LS (6).",
    ],
    subSkills: [
      {
        name: "Constitutional Body ↔ appointment + removal + eligibility triple",
        description:
          "Memorise the triple cold. CAG (Article 148, President appoints, removable like SC judge, 6 yr or 65); ECI (Article 324, CEC + 2 ECs, removable like SC judge, 6 yr or 65); UPSC (Article 315, President appoints, 6 yr or 65); Finance Commission (Article 280, every 5 yr); Attorney-General (Article 76, President appoints, holds office during pleasure). Constitutional vs Statutory: Lokpal (2013) and NHRC (1993) are STATUTORY — common HARD distractor.",
      },
      {
        name: "Money Bill vs Finance Bill — procedural distinctions",
        description:
          "Money Bill (Article 110): exclusively the items in Article 110 list (taxation, borrowing, consolidated fund); LS-introduction only with President's recommendation; RS can only RECOMMEND in 14 days; Speaker's certificate FINAL. Finance Bill (Article 117): broader — any tax/finance provision but not exclusively Article 110; RS has EQUAL say; no Speaker certificate. Speaker decides which it is.",
      },
      {
        name: "Speaker's powers vs President's powers (Parliament)",
        description:
          "Speaker DOES: adjourn House sine die, preside over joint sittings, decide Money Bill status, cast vote when tied, exercise disciplinary powers. President DOES (NOT Speaker): summon and PROROGUE the Houses (Article 85), dissolve Lok Sabha (Article 85), promulgate ordinances (Article 123), give assent to Bills, address joint sittings of both Houses. Common HARD trap: claims Speaker can summon or prorogue the Houses — WRONG.",
      },
      {
        name: "Parliamentary committee composition",
        description:
          "PUBLIC ACCOUNTS COMMITTEE: 22 members (15 LS + 7 RS — RS members ARE included). ESTIMATES COMMITTEE: 30 members (ALL Lok Sabha — RS NOT included; common HARD distractor swaps these). COMMITTEE ON PUBLIC UNDERTAKINGS: 22 members (15 LS + 7 RS). Tenure 1 year. Chairman of PAC is from Opposition (since 1967 convention). All members elected via Single Transferable Vote (proportional representation).",
      },
      {
        name: "High Court territorial jurisdictions (common HCs)",
        description:
          "CALCUTTA HC: West Bengal + Andaman & Nicobar Islands (NOT Lakshadweep — that's Kerala). MADRAS HC: Tamil Nadu + Puducherry. BOMBAY HC: Maharashtra + Goa + Dadra & Nagar Haveli + Daman & Diu. PUNJAB & HARYANA HC: Punjab + Haryana + Chandigarh. GAUHATI HC: Assam + Nagaland + Mizoram + Arunachal Pradesh (NOT Manipur — Manipur HC since 2013; common distractor). KERALA HC: Kerala + Lakshadweep. Telangana, Tripura, Meghalaya, Manipur, Andhra Pradesh got their own HCs in recent years.",
      },
    ],
    traps: [
      {
        name: "Constitutional vs Statutory body confusion",
        description:
          "Distractor claims Lokpal is constitutional (WRONG — Lokpal and Lokayuktas Act 2013, statutory). Or NHRC is constitutional (WRONG — Protection of Human Rights Act 1993, statutory). Or NITI Aayog is constitutional (WRONG — executive resolution 2015, replaced statutory Planning Commission, also statutory). CONSTITUTIONAL bodies (created by the Constitution itself): UPSC, SPSC, JPSC, ECI, Finance Commission, CAG, AG, Solicitor-General-no-Solicitor's-statutory, NCSC, NCST, NCBC (constitutional after 102nd 2018), GST Council (added by 101st 2017). Memorise the constitutional list cold.",
      },
      {
        name: "Speaker summoning/proroguing Parliament",
        description:
          "Distractor states 'On prorogation, it is only the Speaker who can summon the Houses' (WRONG — both summoning and prorogation are by PRESIDENT under Article 85; Speaker only adjourns sittings). The 2026 HARD multi-statement PYQ tests this directly — Statement II 'On prorogation, it is only the Speaker who can summon the Houses' is FALSE. Speaker DOES adjourn sine die (Statement I is CORRECT). Memorise the split: Speaker adjourns + decides bill type + presides; President summons + prorogues + dissolves + gives assent.",
      },
      {
        name: "Money Bill vs Finance Bill scope confusion",
        description:
          "Distractor claims RS has equal powers on Money Bills (WRONG — RS can only RECOMMEND, must return in 14 days, LS not bound to accept). Or claims Money Bill can be introduced in RS (WRONG — LS only, with President's recommendation). Or claims Finance Bill needs Speaker's certificate (WRONG — only Money Bill needs Speaker's certificate; Finance Bill doesn't). Memorise: Article 110 = Money Bill, Article 117 = Finance Bill, both about taxation but Money Bill is exclusively-110-items while Finance Bill is broader.",
      },
      {
        name: "HC territorial jurisdiction swap",
        description:
          "Distractor swaps HC territorial jurisdictions. Calcutta HC / Lakshadweep (WRONG — Calcutta covers A&N, NOT Lakshadweep; Lakshadweep is Kerala HC). Madras HC / Puducherry (CORRECT). Gauhati HC / Manipur (WRONG — Manipur has its own HC since 2013; Gauhati covers Assam + Nagaland + Mizoram + Arunachal). Kerala HC / Andaman & Nicobar Islands (WRONG — A&N is Calcutta; Kerala has Lakshadweep). The 2026 HARD PYQ tests exactly this with 4 wrong pairs and 'how many are correctly matched'. Memorise the common-HC mappings cold.",
      },
    ],
    exampleQuestionIds: [
      "71076603-92cd-4579-a42b-88241f441791", // HARD 2026-1 — Speaker sine die + prorogation multi-statement
      "434963a7-d5bf-4f60-941f-23025c2cf290", // HARD 2026-1 — HC territorial jurisdictions match-list
    ],
    relatedSlugs: [
      "indian-constitution",
      "fundamental-rights-dpsp-local",
      "world-polity",
    ],
  },

  // ─────────────────────────── FOUNDATION RECALL ───────────────────────────
  "indian-constitution": {
    trigger:
      "A Constitutional Amendment question (42nd 1976 'mini-Constitution', 73rd/74th PRI, 86th RTE, 101st GST, 103rd EWS), a Parts/Schedules question (10th Anti-Defection, 11th PRI subjects, Part IX-A Municipalities, Part XII Finance), a Making of Constitution question (Drafting Committee, Objective Resolution 13 Dec 1946 by Nehru, BN Rau + SN Mukherjee assistants), or a Federal Structure question (28+8 states/UTs, Article 371A Nagaland, Finance Commission).",
    story: [
      "20 q in 10 years, 15% HARD. The chapter is constitutional-content recall — Articles, Amendments, Parts/Schedules, sources of borrowed features, drafting history. Constitutional Amendments (10 q · 20% HARD — chapter giant, 50% of content) is the highest-leverage subtopic; Features, Parts and Schedules of Constitution (4 q · 25% HARD) is densest %HARD; Making of Constitution + Federal Structure are easy marks pockets (0% HARD each).",
      "Constitutional Amendments anchor on YEAR + THEME + PART affected. 1st 1951 (added 9th Schedule for land reforms protection; restricted right to property), 7th 1956 (states reorganization on linguistic lines under Fazl Ali Commission's recommendations — Andhra Pradesh first, etc.), 24th 1971 (Parliament's amending power over FRs, post-Golak Nath 1967), 25th 1971 (right to property weakened, Article 31C inserted to give DPSP precedence over Articles 14 + 19), 35th 1974 (Sikkim ASSOCIATE state status — the 2021 MOD PYQ tests this; full statehood was 36th 1975), 42nd 1976 ('mini-Constitution' under Indira's Emergency — added 'socialist', 'secular', 'integrity' to Preamble; FUNDAMENTAL DUTIES Article 51A Part IVA inserted with 10 duties; DPSP overrides FRs via Article 31C extension; expanded Concurrent List; established Administrative Tribunals; extended LS+SLA term to 6 yrs — REVERSED by 44th), 44th 1978 (Janata govt undid much of 42nd — restored judicial review, reverted LS term to 5 yrs, REMOVED right to property from FRs converted to legal right under new Article 300A), 52nd 1985 (Anti-Defection Law — 10th Schedule, Rajiv Gandhi era), 61st 1989 (voting age 21 → 18), 73rd 1992 (Panchayati Raj constitutional — Part IX, 243-243O, 11th Schedule lists 29 subjects), 74th 1992 (Municipalities — Part IX-A, 243P-243ZG, 12th Schedule lists 18 subjects), 86th 2002 (RTE — Article 21A made FR for 6–14 yrs free + compulsory education; added Article 51A(k) duty for parents; modified DPSP 45 from primary to early childhood), 95th 2009 (extended SC/ST + Anglo-Indian reservation in LS+SLA), 101st 2017 (GST — Article 246A, GST Council Article 279A), 103rd 2019 (10% EWS reservation in education + public employment — Articles 15(6), 16(6)), 104th 2020 (removed Anglo-Indian nomination from LS+SLA; extended SC/ST reservation 10 more years to 2030). Article 51A FD inserted by 42nd 1976 — common MOD PYQ.",
      "Features, Parts and Schedules of Constitution (4 q · 25% HARD) tests the structural map cold. PARTS: I Union & Territory (1–4); II Citizenship (5–11); III Fundamental Rights (12–35); IV DPSP (36–51); IV-A Fundamental Duties (51A — added by 42nd 1976); V Union (52–151); VI States (152–237); VII Original — Part B states (REPEALED by 7th 1956); VIII UTs (239–242); IX Panchayats (243–243O — added by 73rd 1992); IX-A Municipalities (243P–243ZG — added by 74th 1992); IX-B Cooperative Societies (243ZH–243ZT — added by 97th 2011); X Scheduled and Tribal Areas (244); XI Centre-State Relations (245–263); XII Finance, Property, Contracts and Suits (264–300A); XIII Trade Commerce (301–307); XIV Services (308–323); XIV-A Tribunals (323A–323B); XV Elections (324–329); XVI SC/ST/Anglo-Indian (330–342); XVII Official Language (343–351); XVIII Emergency (352–360); XIX Misc (361–367); XX Amendment (368); XXI Temporary (369–392); XXII Short Title (393–395). SCHEDULES: 1 States+UTs list; 2 Salary+Allowances of constitutional offices; 3 Forms of oaths; 4 Allocation of RS seats; 5 Scheduled Areas administration (excl. NE — 6th Schedule covers Assam+Meghalaya+Tripura+Mizoram); 6 NE tribal areas; 7 Union/State/Concurrent Lists; 8 22 languages (post-2003 92nd Amendment); 9 Land reforms acts (judicial review immune); 10 Anti-Defection 1985; 11 PRI 29 subjects 1992; 12 Municipalities 18 subjects 1992. Borrowed features: parliamentary govt + rule of law + writs (UK); FRs + judicial review + impeachment + removal of judges (USA); DPSP (Ireland); concurrent list + amendments (Australia); cooperative federalism + emergency provisions (Germany Weimar); FD + 5-yr plans (USSR).",
    ],
    subSkills: [
      {
        name: "Constitutional Amendment ↔ year ↔ theme triple",
        description:
          "Anchor the BIG amendments cold: 1st 1951 (9th Schedule), 7th 1956 (states reorganization), 24th 1971 (amending FRs), 35th 1974 (Sikkim associate), 36th 1975 (Sikkim full state), 42nd 1976 (mini-Constitution, added FD Article 51A + socialist+secular+integrity to Preamble), 44th 1978 (Janata undo of 42nd, removed right to property from FRs), 52nd 1985 (Anti-Defection 10th Schedule), 61st 1989 (voting age 21→18), 73rd 1992 (PRI Part IX), 74th 1992 (Municipalities Part IX-A), 86th 2002 (RTE Article 21A), 95th 2009 (SC/ST reservation extended), 101st 2017 (GST), 103rd 2019 (EWS 10%), 104th 2020 (removed Anglo-Indian).",
      },
      {
        name: "Parts of Constitution structural map",
        description:
          "Part I Union (1–4) / II Citizenship (5–11) / III FRs (12–35) / IV DPSP (36–51) / IV-A Fundamental Duties (51A by 42nd 1976) / V Union Govt (52–151) / VI States (152–237) / IX Panchayats (243–243O by 73rd 1992) / IX-A Municipalities (243P–243ZG by 74th 1992) / IX-B Cooperative Societies (243ZH+ by 97th 2011) / X Scheduled Areas (244) / XII Finance (264–300A) / XV Elections (324–329) / XVIII Emergency (352–360) / XX Amendment (368).",
      },
      {
        name: "Schedules of Constitution + Anti-Defection",
        description:
          "1st Schedule: States + UTs list. 4th Schedule: RS seat allocation. 5th Schedule: Scheduled Areas administration (Chhattisgarh / Jharkhand / Odisha / Madhya Pradesh / Andhra Pradesh / Telangana / Gujarat / Rajasthan / Maharashtra / Himachal Pradesh — applicable; NOT to NE states). 6th Schedule: NE tribal areas (Assam + Meghalaya + Tripura + Mizoram). 7th Schedule: Union + State + Concurrent Lists. 8th Schedule: 22 official languages (post-92nd Amendment 2003 added Bodo + Dogri + Maithili + Santhali). 9th Schedule: Acts immune from judicial review (post-1973 Kesavananda's basic structure doctrine — added items still reviewable). 10th Schedule: ANTI-DEFECTION LAW (52nd Amendment 1985 — disqualification grounds for legislators changing parties). 11th + 12th: PRI + Municipalities subjects.",
      },
      {
        name: "Drafting of Constitution + Objective Resolution",
        description:
          "Constituent Assembly first met Dec 9 1946; elected Dr Rajendra Prasad as President (Dec 11 1946). OBJECTIVE RESOLUTION moved by Jawaharlal Nehru Dec 13 1946 — formed basis of the PREAMBLE. Drafting Committee (Aug 1947): Chair Dr B R AMBEDKAR; members N Gopalaswami Ayyangar, Alladi Krishnaswami Ayyar, K M Munshi, Mohd Saadulla, B L Mitter (replaced by N Madhava Rao), D P Khaitan (replaced by T T Krishnamachari). CIVIL SERVANT assistants: BN RAU (Constitutional Adviser) + SN MUKHERJEE (Chief Draftsman) — the 2018 HARD PYQ tests this. Constitution adopted Nov 26 1949 (Constitution Day); enforced Jan 26 1950 (Republic Day). Some provisions (citizenship, elections, provisional Parliament, transitional, emergency) enforced from Nov 26 1949 itself — the 2018 HARD PYQ tests this.",
      },
      {
        name: "Federal Structure — States, UTs, Article 371",
        description:
          "Current count: 28 STATES + 8 UTs (after Jammu & Kashmir Reorganisation Act 2019 split J&K into J&K UT + Ladakh UT effective Oct 31 2019; Dadra+Nagar Haveli AND Daman+Diu merged into single UT effective Jan 26 2020). UTs: Delhi (NCT), Puducherry, J&K, Ladakh, Andaman+Nicobar, Lakshadweep, Chandigarh, Dadra-Nagar-Haveli+Daman-Diu. ARTICLE 371: special provisions for various states — 371A Nagaland (Acts of Parliament on customary law, ownership of land+resources, civil/criminal procedure don't apply unless Nagaland LA so resolves); 371B Assam tribal areas; 371C Manipur; 371D Andhra Pradesh; 371F Sikkim; 371G Mizoram; 371H Arunachal Pradesh; 371-I Goa; 371J Hyderabad-Karnataka region. FINANCE COMMISSION (Article 280): every 5 yrs, recommends division of net taxes between Centre + States; currently 16th under Dr Arvind Panagariya.",
      },
    ],
    traps: [
      {
        name: "Article 51A insertion confusion",
        description:
          "Distractor claims Article 51A (Fundamental Duties) was in the original Constitution (WRONG — inserted by 42nd Amendment 1976 on Swaran Singh Committee's recommendation; original Constitution didn't have FDs). Or claims it was inserted by 44th Amendment (WRONG — 44th 1978 was Janata govt's UNDO of 42nd; FDs remained). Or claims there are 10 duties (WRONG — 11 duties after 86th 2002 added 51A(k) about parents' responsibility for children's education).",
      },
      {
        name: "Constitution Day vs Republic Day",
        description:
          "Distractor confuses Nov 26 1949 (CONSTITUTION DAY — date of adoption by Constituent Assembly) with Jan 26 1950 (REPUBLIC DAY — date of enforcement). Some provisions WERE enforced from Nov 26 1949: Citizenship, Elections, Provisional Parliament, Transitional Provisions, Short Title (Articles 5, 6, 7, 8, 9, 60, 324, 366, 367, 379, 380, 388, 391, 392, 393). The 2018 HARD PYQ tests which provisions came into effect Nov 26 1949 — Citizenship (CORRECT), Elections (CORRECT), Emergency Provisions (WRONG — only from Jan 26 1950), Appointment of Judges (WRONG — from Jan 26 1950).",
      },
      {
        name: "Drafting Committee chair vs assistant",
        description:
          "Distractor confuses who chaired Drafting Committee (Dr BR AMBEDKAR) with constitutional advisers (BN RAU was Constitutional Adviser to Constituent Assembly, NOT chair of Drafting Committee; SN MUKHERJEE was Chief Draftsman). The 2018 HARD PYQ on 'two CIVIL SERVANTS who assisted the Constituent Assembly' tests BN Rau + SN Mukherjee — both civil servants. Ambedkar (politician/lawyer/scholar, not civil servant) chaired Drafting Committee. Don't conflate.",
      },
      {
        name: "Parts vs Schedules confusion",
        description:
          "Distractor mixes Parts (numbered I–XXII) with Schedules (numbered 1–12). 'Anti-Defection in Part 10' (WRONG — Anti-Defection is 10th SCHEDULE; Part X is Scheduled and Tribal Areas — Article 244). 'PRI in Schedule 9' (WRONG — PRI is Part IX; Schedule 9 is land reforms acts immune from judicial review). The 2026 HARD PYQ tests pairs like 'Part IX-A : The Municipalities' (CORRECT), 'Part IX-B : The Cooperative Societies' (CORRECT — added by 97th 2011), 'Part X : Relations between Union and States' (WRONG — Part XI is Centre-State Relations; Part X is Scheduled Areas), 'Part XII : Finance, Property, Contracts and Suits' (CORRECT). Memorise the Parts map cold.",
      },
    ],
    exampleQuestionIds: [
      "5f21943d-0df8-4b34-aabd-84be8cd02381", // HARD 2026-1 — Parts of Constitution pairs
      "73000aea-22b6-4943-acc8-bdcec6e3fbc9", // HARD 2018 — Provisions effective 26 Nov 1949
    ],
    relatedSlugs: [
      "fundamental-rights-dpsp-local",
      "government-structure",
      "world-polity",
    ],
  },

  "fundamental-rights-dpsp-local": {
    trigger:
      "A Fundamental Rights question (Articles 12–35 — equality, freedoms, against exploitation, religious, cultural-educational, constitutional remedies; FR available only to citizens vs all persons), a DPSP question (Part IV, Articles 36–51 — non-justiciable, novel feature, social-democratic vs Gandhian vs liberal-intellectual classification), a Fundamental Duties question (Article 51A, Part IV-A, 11 duties, inserted by 42nd 1976, parents-education duty added by 86th 2002), a Local Self-Government question (Article 243G powers, 73rd Amendment, Ripon 1882 Magna Carta, Mehta/Ashok Mehta committees), or an Electoral Systems question (political party recognition criteria, EVM/VVPAT, FPTP vs STV).",
    story: [
      "22 q in 10 years, 14% HARD. Constitutional-content recall heavy. Three subtopics: Electoral Systems (9 q · 22% HARD — densest %HARD), Fundamental Rights/DPSP/Duties (8 q · 0% HARD — guaranteed marks pocket), Local Self-Government and Panchayati Raj (5 q · 20% HARD). The lever is Article-number recall + Amendment attribution. Don't OVER-prep low-HARD subtopics; the gain is in drilling reference-tables.",
      "Fundamental Rights (Article 12–35, Part III) tests the 6 categories cold: (1) Right to Equality 14–18 (equality before law / non-discrimination / equal opportunity in public employment / abolition of untouchability / abolition of titles except military and academic); (2) Right to Freedom 19–22 (six freedoms under 19 — speech/expression, assembly, association, movement, residence, profession; right to property REMOVED from FRs by 44th 1978 — now only legal right under Article 300A; 20 ex-post-facto + double jeopardy + self-incrimination protection; 21 life and personal liberty — broadly interpreted to include privacy via Puttaswamy 2017, dignity, livelihood; 21A RTE for 6–14 added by 86th 2002; 22 preventive detention safeguards); (3) Right Against Exploitation 23–24 (no human trafficking / forced labour / child labour under 14 in hazardous work); (4) Right to Freedom of Religion 25–28 (freedom of conscience and free profession/practice/propagation; freedom to manage religious affairs; freedom from taxation for religion; freedom from religious instruction in state-aided institutions); (5) Cultural and Educational Rights 29–30 (right of any section to conserve language/script/culture; right of minorities to establish and administer educational institutions); (6) Right to Constitutional Remedies 32 (writs — Ambedkar's 'heart and soul of the Constitution'). Some FRs are available ONLY to CITIZENS (Articles 15, 16, 19, 29, 30) — others (14, 20, 21, 22, 23, 24, 25, 26, 27, 28) are available to ALL PERSONS including foreigners. DPSP (Part IV, Articles 36–51) — non-justiciable, classified into SOCIALISTIC (Articles 38, 39, 39A, 41, 42, 43, 43A, 47), GANDHIAN (Articles 40, 43, 46, 47, 48), and LIBERAL-INTELLECTUAL (Articles 44, 45, 48, 48A, 49, 50, 51). Article 44 = UCC; 45 = early childhood care (modified from primary education by 86th 2002); 48A = environment protection (added by 42nd 1976); 51 = international peace.",
      "Electoral Systems (9 q · 22% HARD — densest %HARD subtopic) anchors on POLITICAL PARTY RECOGNITION criteria. NATIONAL PARTY recognition under Election Commission Symbols Order 1968 (rules amended over time) — any ONE of: (a) the party secures at least 6% of the valid votes polled in any 4 or more states at a general election to LS or State Legislative Assembly + 4 seats in LS from any state(s); (b) the party wins 2% of LS seats (= 11 seats) from at least 3 different states; (c) the party is recognised as a State Party in 4 or more states. STATE PARTY recognition: 6% valid votes in general election to LS or SLA + 2 SLA seats (or 1 LS seat from that state); OR 3% SLA seats or 3 seats (whichever more) in SLA; OR 1 LS seat for every 25 LS seats from that state; OR 8% valid votes in general election to LS or SLA. INDIAN ELECTORAL SYSTEM: First-Past-The-Post (FPTP) for direct elections to LS and State Legislative Assemblies. SINGLE TRANSFERABLE VOTE (STV) used for indirect elections — President, Vice President, RS, Legislative Council. President election: weighted votes by both MPs and MLAs, proportional representation by single transferable vote, secret ballot under Article 55. EVM (Electronic Voting Machine) introduced in by-elections 1982 (Paravur Kerala), full-fledged 1998. VVPAT (Voter Verifiable Paper Audit Trail) introduced 2013, mandatory all polling stations 2019. ECI Commissioners removed: CEC removable only like SC judge (Article 324(5) — proven misbehaviour/incapacity, 2/3 vote of each House present and voting + majority of total membership); other ECs removable on CEC's recommendation. FIFTH SCHEDULE applies to Scheduled Areas in Chhattisgarh, Jharkhand, Odisha, Madhya Pradesh, Andhra Pradesh, Telangana, Gujarat, Rajasthan, Maharashtra, Himachal Pradesh — NOT applicable to NE states (Assam + Meghalaya + Tripura + Mizoram have SIXTH Schedule instead). 11TH SCHEDULE lists 29 subjects devolved to PRIs.",
    ],
    subSkills: [
      {
        name: "Fundamental Rights citizens-only vs all-persons",
        description:
          "ONLY CITIZENS: Article 15 (non-discrimination by religion/race/caste/sex/birthplace), 16 (equality of opportunity in public employment), 19 (six freedoms), 29 (right to conserve language/script/culture of any section), 30 (right of minorities to establish/administer educational institutions). ALL PERSONS (including foreigners): 14 (equality before law), 20 (protection in respect of conviction), 21 (life and personal liberty), 21A (RTE for 6–14 of any child residing in India), 22 (preventive detention safeguards), 23 (against trafficking + forced labour), 24 (no child labour <14 in hazardous), 25–28 (religious freedoms), 32 (writs).",
      },
      {
        name: "DPSP classification (Socialist / Gandhian / Liberal-Intellectual)",
        description:
          "SOCIALIST: 38 (welfare state), 39 (livelihood), 39A (equal justice + free legal aid), 41 (right to work + public assistance), 42 (just + humane working conditions), 43 (living wage), 43A (workers' participation — added by 42nd), 47 (nutrition + standard of living). GANDHIAN: 40 (panchayats), 43 (cottage industries), 46 (educational interests of SC/ST/weaker sections), 47 (prohibition on intoxicating drinks), 48 (organisation of agriculture + animal husbandry, prohibits cow slaughter). LIBERAL-INTELLECTUAL: 44 (UCC), 45 (early childhood care + education for under-6), 48 (modern + scientific agriculture), 48A (environment — added by 42nd), 49 (monument protection), 50 (separation of judiciary from executive), 51 (international peace).",
      },
      {
        name: "Article 19 six freedoms (post 44th)",
        description:
          "ARTICLE 19(1) provides 6 freedoms (after 44th Amendment 1978 removed (f) right to property): (a) freedom of speech and expression; (b) assemble peaceably and without arms; (c) form associations or unions or cooperatives (cooperatives added by 97th 2011); (d) move freely throughout territory of India; (e) reside and settle in any part of India; (g) practise any profession or carry on any occupation/trade/business. NOTE: (f) RIGHT TO PROPERTY REMOVED by 44th 1978 — now only Article 300A legal right (NOT FR). Reasonable restrictions can be imposed (Article 19(2)–(6)) on each freedom; these are listed for each clause — sovereignty/integrity/security/public order/decency/morality/contempt of court/defamation/incitement to offence.",
      },
      {
        name: "Political Party recognition (National vs State)",
        description:
          "NATIONAL PARTY (any one of): 6%+ votes in 4+ states' LS/SLA elections + 4 LS seats from any state(s); OR 2% LS seats (= 11) from 3+ states; OR recognised as State Party in 4+ states. STATE PARTY (any one of): 6%+ votes in LS/SLA election from that state + 2 SLA seats; OR 3% SLA seats or 3 SLA seats (whichever higher); OR 1 LS seat per 25 LS seats allotted to state; OR 8%+ votes in LS/SLA. The 2017 HARD PYQ tests National Party criteria — verify each option against the trio above.",
      },
      {
        name: "Article 243G Panchayat powers + 11th Schedule",
        description:
          "ARTICLE 243G: Powers, authority and responsibilities of Panchayats. The State Legislature MAY (not must) endow Panchayats with such powers and authority as necessary to function as institutions of self-government. Powers may include: (a) preparation of plans for economic development and social justice; (b) implementation of schemes as may be entrusted, including those in the 11TH SCHEDULE. 11th Schedule lists 29 subjects: agriculture + land improvement + minor irrigation + animal husbandry + fisheries + social forestry + minor forest produce + small-scale industries + khadi+village+cottage industries + rural housing + drinking water + fuel and fodder + roads/culverts/bridges/waterways + rural electrification + non-conventional energy + poverty alleviation programs + education (primary + secondary) + technical training + adult education + libraries + cultural activities + markets and fairs + health and sanitation + family welfare + women and child development + social welfare + welfare of weaker sections (SC/ST) + public distribution system + maintenance of community assets. 2022 HARD PYQ tests 'NOT a power of Panchayats under 243G' — distractor lists a power NOT in the 11th Schedule or claims a state-power (like 'levying taxes' — taxation power comes from Article 243H, NOT 243G).",
      },
    ],
    traps: [
      {
        name: "FR-vs-DPSP confusion (justiciable vs non-justiciable)",
        description:
          "Distractor claims a DPSP is a FR. The 2025 MOD PYQ tests 'Right to work / Right to privacy / Right to free and compulsory education in age bracket 6–18'. Of these: Right to PRIVACY became a FR via Puttaswamy 2017 (read into Article 21 — life and liberty). Right to FREE AND COMPULSORY EDUCATION for 6–14 (NOT 6–18) is FR under Article 21A. Right to WORK is DPSP under Article 41 — NOT a FR (non-justiciable). So only Right to privacy is FR; right to compulsory education is FR for 6–14 (NOT 6–18 — distractor stretches the age range). Memorise the FR list (Article 12–35) vs DPSP list (Article 36–51).",
      },
      {
        name: "Right to Property still a FR",
        description:
          "Distractor claims right to property is still a FR. WRONG — 44th Amendment 1978 (Janata govt under Morarji Desai) REMOVED right to property from Article 19(1)(f) and Article 31; converted to Article 300A as a legal right (constitutional protection but NOT a FR). Now only state can compulsorily acquire property by law — no FR claim to property. Many old textbooks still list 7 freedoms under 19 — the (f) right to property is GONE since 1978. Six freedoms remain after 44th: speech, assembly, association, movement, residence, profession.",
      },
      {
        name: "Article 243G power scope confusion",
        description:
          "Distractor claims a non-243G power is a 243G power. 243G is about FUNCTIONAL devolution (planning + implementation of schemes in 11th Schedule). It is NOT about: (a) Taxation power — that's Article 243H (a separate provision allowing state to authorise Panchayats to levy/collect/appropriate taxes/fees/duties/tolls); (b) Constitution of Panchayats — Article 243B; (c) Composition — Article 243C; (d) Elections — Article 243K (State Election Commission); (e) Audit of accounts — Article 243J. 2022 HARD PYQ tests this — distractor lists 'levying taxes' or 'constituting Panchayats' as 243G powers — WRONG. Memorise 243A–243O Article-by-Article.",
      },
      {
        name: "Magna Carta of Local Self-Government attribution",
        description:
          "Distractor claims Mahatma Gandhi or Mayo or Ripon's 1870 introduced LSG (WRONG — RIPON's resolution of 1882 is called the Magna Carta of Local Self-Government in India; introduced elected local boards). 1870 was Mayo's Resolution on Financial Decentralisation (different — about Centre-Province financial division). Common committees on PRI post-independence: BALWANTRAI MEHTA Committee 1957 (recommended 3-tier system — Village Panchayat / Block Panchayat / Zilla Parishad; first implemented Rajasthan Oct 2 1959 at Nagaur); ASHOK MEHTA Committee 1977–78 (recommended 2-tier — Mandal at base + ZP); LM Singhvi Committee 1986 (recommended constitutional status for PRIs — adopted as 73rd Amendment 1992). The 2025 EASY PYQ tests 'committee NOT associated with PRI decentralization' — Sarkaria Commission (1983) was about Centre-State relations, NOT PRI specifically.",
      },
    ],
    exampleQuestionIds: [
      "092cf0ec-605c-4405-b9cd-f5287ae145c7", // HARD 2022 — Power not under Article 243G
      "ec4bc87c-d967-4648-8857-adec60cb1bef", // HARD 2019 — Fifth Schedule applicability
    ],
    relatedSlugs: [
      "indian-constitution",
      "government-structure",
      "world-polity",
    ],
  },

  // ──────────────────────────── SPECIALIST WILDCARD ────────────────────────────
  "world-polity": {
    trigger:
      "A UN Peacekeeping Operations question (UNMOGIP India-Pakistan, UNFICYP Cyprus, UNMIK Kosovo, UNTSO Israel-Palestine), a UN Security Council question (5 permanent + 10 non-permanent, 2-year terms, regional distribution), a UN Declarations/Covenants chronology question (UDHR 1948, ICCPR/ICESCR 1966, CEDAW 1979, CRC 1989), an SDG question (17 goals adopted 2015 — Goal 1 poverty, Goal 4 education, Goal 5 gender), a Democracy theory question (universal adult franchise chronology, democracy features, Lincoln's quote), or a Panchsheel question (5 principles signed 1954 India-China).",
    story: [
      "12 q in 10 years, 42% HARD — the SMALLEST chapter in NDA Polity but the HARDEST. UN subtopic alone (5 q · 60% HARD) is the DENSEST %HARD subtopic in the entire Polity bank. The chapter is multi-statement-dominant (50% of questions arrive as 'consider the following statements'). INVERTS History's Quick-Win pattern — Polity's smallest chapter is high-stakes, not easy. The skill is twofold: (1) UN-acronym ↔ region recall (UNMOGIP / UNFICYP / UNMIK / UNTSO / UNDOF / MONUSCO); (2) statement-by-statement T/F discipline for multi-statement evaluation.",
      "United Nations and Global Institutions (5 q · 60% HARD — densest %HARD subtopic in entire Polity bank) anchors on UN architecture cold. UNSC: 15 total — 5 PERMANENT (US, UK, France, Russia, China — all with VETO power on substantive matters; procedural matters need 9/15 affirmative votes); 10 NON-PERMANENT (elected by General Assembly for 2-year terms, 5 elected each year on staggered cycle, distributed by regional quota: 5 from Africa+Asia, 1 Eastern Europe, 2 Latin America+Caribbean, 2 Western Europe+Others). India has served 8 terms as non-permanent member; current term ended 2022. Election requires 2/3 majority of GA members present and voting. UN PEACEKEEPING OPERATIONS active today (memorise the major ones): UNMOGIP (UN Military Observer Group in India and Pakistan — since Jan 1949, monitors Kashmir LoC); UNFICYP (UN Peacekeeping Force in Cyprus — since 1964, buffer zone Green Line); UNMIK (UN Interim Administration Mission in Kosovo — since 1999 post-Kosovo war); UNTSO (UN Truce Supervision Organization — since 1948 in Israel-Palestine, UN's OLDEST active peacekeeping mission); UNDOF (UN Disengagement Observer Force — since 1974, Golan Heights between Israel and Syria); MONUSCO (Democratic Republic of Congo); MINUSMA (Mali, ended 2023); MINURSO (Western Sahara). UN DECLARATIONS chronology: UDHR (Universal Declaration of Human Rights) 1948; ICCPR + ICESCR (International Covenants on Civil and Political Rights + Economic, Social and Cultural Rights) 1966 (entered force 1976); CEDAW (Convention on Elimination of All Forms of Discrimination Against Women) 1979; CRC (Convention on Rights of the Child) 1989; CRPD (Convention on Rights of Persons with Disabilities) 2006. SUSTAINABLE DEVELOPMENT GOALS (SDG): 17 goals adopted Sept 2015 by UN General Assembly (Agenda 2030, replaced Millennium Development Goals 2000–15). Goal 1 = No Poverty (end poverty in all forms everywhere); Goal 2 = Zero Hunger; Goal 3 = Good Health and Well-being; Goal 4 = Quality Education; Goal 5 = Gender Equality; Goal 6 = Clean Water; Goal 7 = Affordable+Clean Energy; etc. Distractor swaps Goal 2 (Zero Hunger) with Goal 3 (Good Health) — the 2026 MOD PYQ tests this.",
      "Democracy and Political Theory (5 q · 40% HARD) tests universal adult franchise chronology + democracy features. UNIVERSAL ADULT FRANCHISE chronology cold (2025 HARD PYQ): USA gave full UNIVERSAL adult franchise in 1965 (Voting Rights Act ended Jim Crow disenfranchisement for African Americans — full universal); however, all-races+all-sexes formal franchise was 1920 (19th Amendment for women) but Jim Crow disenfranchised Black voters until 1965; for NDA purposes the conventional answer is USA 1920 (women's suffrage Constitutional). Sri Lanka 1931 (Donoughmore Constitution under British rule — Sri Lanka was ahead of India). Japan 1947 (post-WWII Constitution under MacArthur's reforms — women included). India 1950 (Constitution from Jan 26, voting age 21 — reduced to 18 by 61st Amendment 1989). The 2025 chronological order: USA 1920 → Sri Lanka 1931 → Japan 1947 → India 1950. DEMOCRACY FEATURES (Robert Dahl's polyarchy criteria + theorists' standard list): (1) consent of the governed; (2) political equality (one person, one vote, equal weight); (3) accountability of the RULER to the ruled (NOT 'ruled to the ruler' — common distractor reverses); (4) free and fair elections; (5) civil liberties (speech, association, assembly); (6) rule of law; (7) independent judiciary. Lincoln's Gettysburg Address Nov 19 1863: 'government of the people, by the people, for the people' — the 2022 EASY PYQ. AMERICAN DECLARATION OF INDEPENDENCE 1776 unalienable rights: LIFE, LIBERTY, PURSUIT OF HAPPINESS (Jefferson; Locke's 'life, liberty, property' modified to add 'pursuit of happiness'). FRATERNITY is the third item of the French Revolution's LIBERTY-EQUALITY-FRATERNITY motto (NOT the American Declaration — common distractor). PANCHSHEEL (Five Principles of Peaceful Coexistence) signed April 29 1954 between India + China in agreement on Tibet (Nehru–Zhou Enlai): (1) Mutual respect for each other's TERRITORIAL INTEGRITY and SOVEREIGNTY; (2) Mutual NON-AGGRESSION; (3) Mutual NON-INTERFERENCE in each other's internal affairs; (4) EQUALITY and mutual benefit; (5) PEACEFUL COEXISTENCE. Common distractors add 'collective security' / 'economic cooperation' / 'cultural exchange' — NOT Panchsheel principles.",
    ],
    subSkills: [
      {
        name: "UN Peacekeeping Operation ↔ region",
        description:
          "UNMOGIP (India-Pakistan, Kashmir, 1949 — UN's 2nd oldest). UNFICYP (Cyprus, 1964). UNMIK (Kosovo, 1999). UNTSO (Israel-Palestine truce supervision, 1948 — UN's OLDEST). UNDOF (Golan Heights Israel-Syria, 1974). MONUSCO (DR Congo). MINURSO (Western Sahara). UNFIL (Lebanon). UNAMID ended 2020 (Darfur Sudan was AU-UN hybrid). The 2026 HARD PYQ tests 'how many pairs are correctly matched' — UNTSO with HAITI is WRONG (Haiti was UNMIH/MINUSTAH, both ended); UNTSO is Israel-Palestine. Memorise the active list cold.",
      },
      {
        name: "UNSC composition + voting + elections",
        description:
          "15 total = 5 PERMANENT (US + UK + France + Russia + China — P5, all veto on substantive matters) + 10 NON-PERMANENT (2-year terms, staggered — 5 elected each year). Regional distribution of 10 non-permanent: 5 from Africa+Asia; 1 Eastern Europe; 2 Latin America+Caribbean; 2 Western Europe+Others. Procedural matters: 9 affirmative votes (no veto). Substantive matters: 9 votes INCLUDING concurring votes of all P5 (P5 abstention = not veto, but P5 NO = veto). Non-permanent member election: 2/3 majority of GA members present and voting (need 129 of 193 if all vote). India served 8 terms (most recent 2021–22, before that 2011–12).",
      },
      {
        name: "UN Declarations/Covenants chronology",
        description:
          "UDHR (1948 — Universal Declaration of Human Rights, non-binding) → ICCPR + ICESCR (1966 — International Covenants, binding on ratifying states, entered force 1976) → CERD 1965 (race discrimination) → CEDAW 1979 (women) → CAT 1984 (against torture) → CRC 1989 (children) → CRPD 2006 (disabilities). 2024 HARD PYQ tests UDHR (1948) → CEDAW (1979) → ICESCR (1966) → CRC (1989) — chronological order is UDHR → ICESCR → CEDAW → CRC. SDG (Sustainable Development Goals): 17 goals adopted Sept 2015 by UNGA Agenda 2030, replaced MDGs 2000–15. Memorise first 6: 1 No Poverty / 2 Zero Hunger / 3 Good Health and Well-being / 4 Quality Education / 5 Gender Equality / 6 Clean Water and Sanitation.",
      },
      {
        name: "Universal Adult Franchise chronology",
        description:
          "USA 1920 (19th Amendment — women's suffrage; race-based full universal Voting Rights Act 1965 in practice). Sri Lanka 1931 (Donoughmore Constitution under British rule — early adopter, ahead of India). Japan 1947 (post-WWII MacArthur Constitution — women included). India 1950 (Constitution from Jan 26, voting age 21 — reduced to 18 by 61st Amendment 1989). 2025 HARD PYQ chronological order: USA 1920 → Sri Lanka 1931 → Japan 1947 → India 1950.",
      },
      {
        name: "Democracy features + Lincoln + American Declaration",
        description:
          "DEMOCRACY FEATURES (standard polyarchy criteria): consent of the governed + political equality + accountability of RULER to RULED (NOT ruled to ruler — distractor reverses) + free and fair elections + civil liberties + rule of law + independent judiciary. LINCOLN's Gettysburg Address Nov 19 1863: 'government of the people, by the people, for the people' — that government 'shall not perish from the earth'. AMERICAN DECLARATION OF INDEPENDENCE 1776 unalienable rights: LIFE + LIBERTY + PURSUIT OF HAPPINESS (Jefferson). Note: FRATERNITY is French Revolution's motto (liberty-equality-fraternity), NOT American Declaration.",
      },
      {
        name: "Panchsheel five principles + 1954 context",
        description:
          "PANCHSHEEL (5 Principles of Peaceful Coexistence) signed April 29 1954 between India + China in Agreement on Tibet (Nehru–Zhou Enlai). The 5 principles: (1) Mutual respect for TERRITORIAL INTEGRITY and SOVEREIGNTY; (2) Mutual NON-AGGRESSION; (3) Mutual NON-INTERFERENCE in each other's internal affairs; (4) EQUALITY and mutual benefit; (5) PEACEFUL COEXISTENCE. NOT Panchsheel: collective security / economic cooperation / cultural exchange / nuclear non-proliferation — these are distractor over-additions. NAM (Non-Aligned Movement) 1961 Belgrade conference built ON Panchsheel philosophy; founders Nehru + Tito + Nasser + Sukarno + Nkrumah.",
      },
    ],
    traps: [
      {
        name: "UN Peacekeeping pairs swap",
        description:
          "The 2026 HARD PYQ tests UN Peacekeeping ↔ country pairs with distractors. UNMOGIP / India and Pakistan (CORRECT). UNFICYP / Cyprus (CORRECT). UNMIK / Kosovo (CORRECT). UNTSO / Haiti (WRONG — UNTSO is Israel-Palestine, since 1948 UN's oldest). UNDOF / Golan Heights between Israel-Syria (often correct in distractors). Distractor mixes UNTSO with UNMIH (Haiti, ended) or MINUSTAH (Haiti, ended). Memorise active list: UNTSO Israel-Palestine 1948 / UNMOGIP India-Pakistan 1949 / UNFICYP Cyprus 1964 / UNDOF Golan Heights 1974 / UNIFIL Lebanon 1978 / MINURSO Western Sahara 1991 / UNMIK Kosovo 1999 / MONUSCO DR Congo / UNFICYP Cyprus.",
      },
      {
        name: "Multi-statement partial-credit trap (UNSC, UN Bodies)",
        description:
          "'Consider the following statements about UNSC non-permanent member elections... which are correct?' with options 'Only 1, 2' / 'Only 2, 3' / 'All' / 'None'. The trap option lists 2 of 3 correct statements (when 3 are correct) — partial-credit distractor. Or lists 'all 4' when 1 is wrong (universal distractor). Statements about UNSC: 'Total non-permanent number is now 10, originally only 6' (CORRECT — expanded from 6 to 10 in 1965 via Article 23 amendment); 'They are elected for a term of two years' (CORRECT); '5 from Africa+Asia, 1 Eastern Europe, 2 Latin America, 2 Western Europe' (CORRECT — regional distribution). Judge each statement INDEPENDENTLY before reading options.",
      },
      {
        name: "Panchsheel over-inclusion distractor",
        description:
          "Distractor adds 'collective security' / 'economic cooperation' / 'cultural exchange' / 'nuclear non-proliferation' / 'mutual military assistance' to the Panchsheel principles. NONE of these are Panchsheel. The 5 principles are: territorial integrity+sovereignty / non-aggression / non-interference / equality+mutual benefit / peaceful coexistence. Memorise the EXACT 5 — distractor over-includes neighbours from NAM principles or Bandung 1955 conference (which adopted 10 principles BASED on but expanded from Panchsheel).",
      },
      {
        name: "American Declaration rights vs French Revolution motto",
        description:
          "Distractor includes FRATERNITY in the American Declaration of Independence 1776 unalienable rights — WRONG. American Declaration (Jefferson): LIFE, LIBERTY, PURSUIT OF HAPPINESS. Fraternity is the French Revolution 1789 motto: LIBERTÉ, ÉGALITÉ, FRATERNITÉ. The 2022 EASY PYQ tests American Declaration rights — Life (CORRECT), Liberty (CORRECT), Pursuit of Happiness (CORRECT), Fraternity (WRONG — French motto). Common distractor that catches candidates conflating the two revolutions' formative documents.",
      },
      {
        name: "SDG goal-number misalignment",
        description:
          "Distractor swaps SDG goal numbers. Goal 1 = End Poverty (CORRECT). Goal 2 = Zero Hunger (NOT 'Healthy Lives' — that's Goal 3 Good Health and Well-being). Goal 3 = Good Health and Well-being (NOT 'Quality Education' — that's Goal 4). Goal 4 = Quality Education (NOT 'Gender Equality' — that's Goal 5). Goal 5 = Gender Equality. Goal 6 = Clean Water. The 2026 MOD PYQ tests pairs like 'Goal 1: End poverty (CORRECT) / Goal 2: Ensure healthy lives (WRONG) / Goal 3: Ensure quality education (WRONG) / Goal 4: Achieve gender equality (WRONG)' — none of the latter three pairs are correct. Memorise the SDG numbering cold.",
      },
    ],
    exampleQuestionIds: [
      "600333b5-1440-4c0d-992e-23e2c815d43e", // HARD 2026-1 — UN Peacekeeping pairs
      "8eef6526-338e-486e-aba4-c2ef80c8ba64", // HARD 2025 — Universal adult franchise chronology
    ],
    relatedSlugs: [
      "government-structure",
      "indian-constitution",
      "fundamental-rights-dpsp-local",
    ],
  },
};

export const PLAYBOOK_DETAIL_SLUGS = Object.keys(PLAYBOOK_DETAILS);
