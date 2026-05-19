/**
 * Content for /guide/nda-polity/traps.
 *
 * NDA Polity distractor shapes — bucketed by GENRE (paired-fact swap /
 * procedural-confusion / multi-statement verify), NOT by tier strand,
 * because the FIX maps to the genre (memorise pair tables / anchor on
 * institutional procedure / judge each statement independently)
 * regardless of which chapter the trap appears in.
 *
 * Distinguished from other NDA subjects:
 *   - Chemistry traps = compound identity confusion (acid-source swap,
 *     diamond-graphite property flip)
 *   - Physics traps = formula misapplication (sign flip, mass-cancels,
 *     CGS/SI mix)
 *   - English traps = near-synonym semantics (S-V error, idiom meaning)
 *   - Biology traps = paired-fact swap (disease↔pathogen, vitamin↔
 *     deficiency, hormone↔gland) — closest cousin to Polity Recall genre
 *   - Geography traps = MIXED (paired-fact + mechanism-direction + multi-
 *     statement)
 *   - History traps = paired-fact swap (king↔dynasty, scholar↔text,
 *     reformer↔movement) + chronology-sequence + multi-statement Verify
 *   - Polity traps = paired-fact swap (Article↔subject, body↔function,
 *     Amendment↔year) + PROCEDURAL CONFUSION (Money Bill vs Finance
 *     Bill, Speaker vs President, original vs appellate jurisdiction —
 *     Polity-specific institutional procedure distinctions, unique among
 *     NDA subjects) + multi-statement Verify
 *
 * The lever is named-pair table mastery + procedural-distinction recall
 * + disciplined statement-by-statement T/F evaluation.
 */

export type TrapBucket = "paired-fact" | "procedural" | "verify";

export type TrapShape = {
  id: string;
  /** Title shown in the page section. */
  title: string;
  bucket: TrapBucket;
  /** Which playbook(s) this trap most commonly appears in. */
  affects: string[]; // playbook slugs
  /** The mechanic — how the trap works. */
  mechanic: string;
  /** The fix — the verification habit that avoids it. */
  fix: string;
  /** Optional worked-example UUID — a real PYQ that demonstrates the trap. */
  exampleQuestionId?: string;
};

export const TRAP_SHAPES: TrapShape[] = [
  // ──────── Paired-fact swap traps (Recall genre) ────────
  {
    id: "article-subject-swap",
    title: "Article ↔ subject swap (Article 19 freedoms, Article 21A age, Article 243G scope)",
    bucket: "paired-fact",
    affects: [
      "fundamental-rights-dpsp-local",
      "indian-constitution",
      "government-structure",
    ],
    mechanic:
      "Distractor swaps Article-number ↔ subject pairs. Article 21A applies to age 6–18 (WRONG — 6–14 only; 14+ is Article 41 DPSP). Article 19(1) has 7 freedoms (WRONG — 6 after 44th 1978 removed right to property; now 6 freedoms only). Article 51A inserted by original Constitution (WRONG — added by 42nd Amendment 1976). Article 243G includes taxation power (WRONG — taxation is Article 243H; 243G is functional devolution). Article 280 Finance Commission constituted every 3 years (WRONG — every 5 years). Distractor consistency: gets the right Article but wrong scope, or right scope but wrong Article.",
    fix:
      "Drill /reference-tables → 'Key Articles ↔ Subject' cluster (32 entries) cold via 4-pass active recall. For each Article in a question, state both (a) the SUBJECT and (b) the PART of Constitution it's in. Common pairs to memorise tight: Article 12 (State definition) / 14 (equality) / 15 (no discrimination — citizens) / 19 (6 freedoms — citizens) / 21 (life+liberty) / 21A (RTE 6–14) / 32 (writs — Ambedkar's 'heart') / 44 (UCC) / 51A (FD — 42nd 1976) / 76 (Attorney-General) / 110 (Money Bill) / 124 (SC) / 148 (CAG) / 243G (Panchayat powers) / 280 (Finance Commission) / 324 (ECI) / 352 (National Emergency) / 356 (President's Rule) / 368 (Amendment).",
    exampleQuestionId: "092cf0ec-605c-4405-b9cd-f5287ae145c7",
  },
  {
    id: "amendment-year-swap",
    title: "Amendment ↔ year ↔ theme swap (42nd vs 44th, 73rd vs 74th, 86th vs 101st)",
    bucket: "paired-fact",
    affects: ["indian-constitution"],
    mechanic:
      "Distractor swaps Amendment-number ↔ year ↔ theme triple. 42nd 1976 added FRs override (WRONG — 42nd made DPSP override FRs via Article 31C extension; FRs override was Janata's 44th 1978 restoring judicial review). 73rd 1992 = Municipalities (WRONG — 73rd = PANCHAYATI RAJ; 74th = Municipalities). 86th 2002 = GST (WRONG — 86th = RTE Article 21A; 101st = GST). 52nd 1985 = voting age (WRONG — 52nd = Anti-Defection 10th Schedule; 61st 1989 = voting age 21→18). 103rd 2019 = removed Anglo-Indian nomination (WRONG — 103rd = EWS 10%; 104th 2020 = removed Anglo-Indian). 35th 1974 = Sikkim FULL statehood (WRONG — 35th = ASSOCIATE state; 36th 1975 = full statehood).",
    fix:
      "Memorise the amendment-year-theme triple via /reference-tables → 'Constitutional Amendments' cluster. Group by year: 1971 (24th, 25th — amending power + DPSP precedence); 1976 (42nd — mini-Constitution); 1978 (44th — Janata undo); 1985 (52nd — Anti-Defection); 1989 (61st — voting age); 1992 (73rd PRI + 74th Municipalities); 2002 (86th — RTE); 2003 (89th — separated NCSC+NCST); 2011 (97th — Cooperatives); 2017 (101st — GST); 2018 (102nd — NCBC constitutional); 2019 (103rd — EWS 10%); 2020 (104th — removed Anglo-Indian, extended SC/ST). Pair-check Amendment-year before picking.",
  },
  {
    id: "body-function-swap",
    title: "Body ↔ function ↔ Article swap (CAG vs ECI vs Attorney-General, Lokpal vs NHRC status)",
    bucket: "paired-fact",
    affects: ["government-structure"],
    mechanic:
      "Distractor swaps body ↔ function ↔ Article triple. CAG reports to Parliament directly (WRONG — CAG reports to PRESIDENT per Article 151; President lays before Parliament; PAC then reviews). Attorney-General appointed by Parliament (WRONG — by President under Article 76). ECI election authority extends to local body elections (WRONG — local body elections are conducted by STATE Election Commission under Article 243K, separate from central ECI). Lokpal is a constitutional body (WRONG — STATUTORY under Lokpal and Lokayuktas Act 2013). NHRC is constitutional (WRONG — STATUTORY under Protection of Human Rights Act 1993). NITI Aayog is statutory (WRONG — neither constitutional nor statutory; executive resolution 2015 replacing Planning Commission). North Eastern Council chair = PM of India (WRONG — Home Minister of India is ex officio chair).",
    fix:
      "Drill /reference-tables → 'Constitutional Bodies ↔ Function ↔ Article' cluster (19 entries) cold. For each body, state: (a) Article (if constitutional) OR statute (if statutory); (b) APPOINTMENT authority; (c) REMOVAL grounds; (d) REPORTING line. Status check: CONSTITUTIONAL bodies (UPSC, SPSC, JPSC, ECI, Finance Commission, CAG, Attorney-General, NCSC, NCST, NCBC post-102nd, GST Council, NEC?, Solicitor-General?). STATUTORY (not constitutional): Lokpal 2013, NHRC 1993, CIC 2005, CVC 2003, NITI Aayog 2015 (actually executive). Memorise the constitutional list — it's the smaller, more-tested set.",
  },
  {
    id: "hc-territorial-jurisdiction-swap",
    title: "High Court territorial-jurisdiction swap (Calcutta + A&N, Madras + Puducherry, Kerala + Lakshadweep)",
    bucket: "paired-fact",
    affects: ["government-structure"],
    mechanic:
      "Distractor swaps HC jurisdictions over UTs / states. Calcutta HC / Lakshadweep (WRONG — Calcutta covers Andaman & Nicobar; Lakshadweep is Kerala HC). Madras HC / Puducherry (CORRECT). Kerala HC / Andaman & Nicobar Islands (WRONG — A&N is Calcutta; Kerala has Lakshadweep). Gauhati HC / Manipur (WRONG — Manipur has its own HC since 2013; Gauhati covers Assam + Nagaland + Mizoram + Arunachal Pradesh). Bombay HC / Lakshadweep (WRONG — Bombay covers Maharashtra + Goa + Dadra & Nagar Haveli + Daman & Diu, NOT Lakshadweep). The 2026 HARD PYQ tests exactly this with 4 pairs and 'how many are correctly matched'.",
    fix:
      "Memorise common-HC mappings cold. CALCUTTA: WB + A&N. MADRAS: TN + Puducherry. BOMBAY: Maharashtra + Goa + Dadra+Nagar Haveli + Daman+Diu. PUNJAB & HARYANA: Punjab + Haryana + Chandigarh. GAUHATI: Assam + Nagaland + Mizoram + Arunachal (NOT Manipur — separate HC since 2013). KERALA: Kerala + Lakshadweep. Telangana / Tripura / Meghalaya / Manipur / Andhra Pradesh got their own HCs in recent years. NOTE the UT pattern: A&N → Calcutta; Lakshadweep → Kerala; Puducherry → Madras; Chandigarh → P&H; Dadra+Daman+Diu → Bombay; Delhi → Delhi HC; J&K+Ladakh → Common HC of J&K and Ladakh.",
    exampleQuestionId: "434963a7-d5bf-4f60-941f-23025c2cf290",
  },

  // ──────── Procedural confusion traps (Polity-specific) ────────
  {
    id: "money-vs-finance-bill",
    title: "Money Bill vs Finance Bill confusion",
    bucket: "procedural",
    affects: ["government-structure"],
    mechanic:
      "Distractor confuses Money Bill (Article 110) with Finance Bill (Article 117). 'Finance Bill requires Speaker's certificate' (WRONG — only MONEY BILL needs Speaker's certificate; Finance Bill doesn't). 'Money Bill can be introduced in Rajya Sabha' (WRONG — Money Bill = LS only, with President's recommendation). 'RS has equal powers on Money Bill' (WRONG — RS can only RECOMMEND amendments, must return in 14 days, LS not bound). 'Finance Bill provisions are exclusively Article 110 items' (WRONG — Money Bill is exclusively Article 110; Finance Bill is broader, covers any tax/finance provision). 'A bill that has any taxation clause is automatically a Money Bill' (WRONG — only bills with EXCLUSIVELY Article 110 items are Money Bills; bills with mixed tax + other provisions are Finance Bills).",
    fix:
      "Memorise the distinction. MONEY BILL (Article 110): definition = exclusively the 6/7 Article 110 items (taxation, borrowing, consolidated fund, contingency fund, customs/duties, audit). PROCESS: LS-introduction only with President's recommendation; RS can only RECOMMEND in 14 days; Speaker's CERTIFICATE FINAL. FINANCE BILL (Article 117): definition = broader (any tax/finance provision but not exclusively Article 110); PROCESS: either House (if money-provisions then LS with President's recommendation); RS has EQUAL say; no Speaker certificate. Speaker decides bill type — and the Speaker's decision IS final on Money Bill characterization.",
  },
  {
    id: "speaker-president-confusion",
    title: "Speaker vs President powers (summoning, prorogation, sine die)",
    bucket: "procedural",
    affects: ["government-structure"],
    mechanic:
      "Distractor swaps Speaker's powers with President's. 'The Speaker prorogues both Houses' (WRONG — prorogation is by PRESIDENT under Article 85; Speaker only adjourns sittings). 'On prorogation, only the Speaker can summon the Houses' (WRONG — both summoning and prorogation by President). 'Speaker dissolves Lok Sabha' (WRONG — President dissolves LS on PM's advice under Article 85). 'Speaker gives assent to bills' (WRONG — President under Article 111). 'Speaker addresses joint sittings' (PARTIALLY — Speaker presides over joint sittings; but addressing each House at first session of new term is President's role per Article 87). The 2026 HARD PYQ tests Statement I 'Speaker has power to adjourn both Houses sine die' (CORRECT) + Statement II 'On prorogation, it is only the Speaker who can summon the Houses' (WRONG).",
    fix:
      "Memorise the split cold. SPEAKER DOES: adjourn LS sine die (yes — Speaker can do this); preside over joint sittings; decide Money Bill characterization; cast vote when tied; exercise disciplinary powers; certify Money Bill. PRESIDENT DOES (NOT Speaker): summon each House (Article 85); prorogue the Houses (Article 85); dissolve LS (Article 85); promulgate ordinances (Article 123); give assent to bills (Article 111); address joint sittings at first session (Article 87); appoint constitutional functionaries. The 6-month-gap rule between sessions is enforced via the President's summoning.",
    exampleQuestionId: "71076603-92cd-4579-a42b-88241f441791",
  },
  {
    id: "original-vs-appellate-jurisdiction",
    title: "SC jurisdictions — original vs appellate vs advisory vs writ",
    bucket: "procedural",
    affects: ["government-structure"],
    mechanic:
      "Distractor confuses SC jurisdictions. 'Original jurisdiction includes appeals from HC' (WRONG — appeals = APPELLATE; original = Centre-State disputes under Article 131). 'Writ jurisdiction is appellate' (WRONG — writ under Article 32 is ORIGINAL + a FR itself; HC writ under Article 226 is also original but wider scope). 'Advisory jurisdiction is binding' (WRONG — Article 143 President seeks SC opinion but opinion is NOT binding). 'Review jurisdiction can be invoked by any party' (PARTIAL — Article 137 review is at SC's discretion, time-limited 30 days normally). 'Election dispute jurisdiction is original' (PARTIAL — election disputes go to HC first, appeals to SC). The 2022 MOD PYQ tests 'which one does NOT fall under SC's jurisdiction' — pick the option not covered by 131 + 132–134 + 136 + 137 + 143 + 32.",
    fix:
      "Memorise SC jurisdictions cold. ORIGINAL (Article 131): disputes between Centre and States, or between States. APPELLATE (Articles 132 constitutional cases / 133 civil / 134 criminal): appeals from HC. SPECIAL LEAVE (Article 136): SC's discretionary appellate power, can be invoked from any court/tribunal (NOT including military courts). WRIT (Article 32): for FR enforcement, ORIGINAL jurisdiction, FR itself. ADVISORY (Article 143): President seeks opinion on matter of law/public importance, non-binding. REVIEW (Article 137): SC can review its own judgments (limited circumstances). EPISTOLARY (PIL): SC accepts letters as petitions. Memorise the 6 jurisdictions and what each covers.",
  },
  {
    id: "constitutional-vs-statutory",
    title: "Constitutional vs Statutory body confusion (Lokpal, NHRC, NITI Aayog)",
    bucket: "procedural",
    affects: ["government-structure"],
    mechanic:
      "Distractor claims a statutory body is constitutional or vice versa. LOKPAL = STATUTORY (Lokpal and Lokayuktas Act 2013) — NOT constitutional. NHRC = STATUTORY (Protection of Human Rights Act 1993) — NOT constitutional. CIC = STATUTORY (RTI Act 2005). CVC = STATUTORY (CVC Act 2003). NITI Aayog = NEITHER constitutional NOR statutory (executive resolution 2015, replaced statutory Planning Commission). Constitutional Commissions (the 2022 MOD PYQ tests this): UPSC (315), SPSC (315), JPSC, ECI (324), Finance Commission (280), CAG (148), Attorney-General (76), NCSC (338), NCST (338A), NCBC post-102nd 2018 (338B), GST Council post-101st 2017 (279A). Distractor mixes these — e.g. claims Lokpal is in the constitutional list.",
    fix:
      "Memorise the CONSTITUTIONAL body list (it's smaller, more-tested). Constitutional bodies are CREATED BY THE CONSTITUTION ITSELF; statutory bodies are created by a PARLIAMENT ACT. If a body's enabling provision is an Article number (148 CAG, 280 FC, 315 UPSC, 324 ECI, 338 NCSC, 338A NCST, 338B NCBC, 279A GST Council, 76 AG, 165 AGS), it's constitutional. If a body was created by an Act (1993 NHRC, 2013 Lokpal, 2005 RTI for CIC, 2003 CVC), it's statutory. NITI Aayog is the odd one out — neither (executive creation 2015).",
  },

  // ──────── Multi-statement Verify traps ────────
  {
    id: "multi-statement-partial-credit",
    title: "Multi-statement evaluation — partial-credit distractor",
    bucket: "verify",
    affects: [
      "government-structure",
      "indian-constitution",
      "fundamental-rights-dpsp-local",
      "world-polity",
    ],
    mechanic:
      "'Consider the following statements about [X]... which are correct?' with options 'Only 1, 2' / 'Only 2, 3' / 'All' / 'None'. The trap option lists 2 of 3 correct statements (when 3 are correct) — partial-credit distractor. Or lists 'all 3' when 1 is wrong (universal distractor). 21 q of NDA Polity bank are multi-statement (33% HARD — multi-statement is HARDER than single-fact by ~14 pp); concentrated in Govt Structure (11 q · 30%), Indian Constitution (3 q · 15%), World Polity (6 q · 50%). World Polity especially — UN composition / declarations / democracy features all get multi-statement treatment.",
    fix:
      "Judge each statement INDEPENDENTLY before reading the options. Write T/F in the margin next to each. Then MATCH to the option that lists EXACTLY your T set. NEVER pick on 'this option has 2 of the 3 I marked T' — that's the partial-credit trap. If you're uncertain about ANY single statement, the whole question is uncertain → skip (−1.33 penalty is harsh for a 5-q section where you can't recover from many wrongs). World Polity multi-statement: confidence threshold 75%+ given 60% HARD on UN subtopic.",
    exampleQuestionId: "8eef6526-338e-486e-aba4-c2ef80c8ba64",
  },
  {
    id: "universal-claim-trap",
    title: "Universal-claim trap (all / every / no / always)",
    bucket: "verify",
    affects: [
      "indian-constitution",
      "fundamental-rights-dpsp-local",
      "government-structure",
      "world-polity",
    ],
    mechanic:
      "Distractor uses absolute quantifiers. 'ALL Fundamental Rights are available to citizens only' (WRONG — Articles 14, 20, 21, 22, 25–28 available to ALL PERSONS including foreigners; only 15, 16, 19, 29, 30 are citizens-only). 'EVERY Money Bill is also a Finance Bill' (WRONG — Money Bill is a subset of Finance Bill; the reverse direction is what's true: every Money Bill IS technically a Finance Bill in scope, but not vice versa). 'NO Indian was on the Drafting Committee' (WRONG — all 7 members were Indian; Ambedkar chaired). 'ALL pre-FYP plans were industrialist plans' (WRONG — Bombay Plan was industrialist, Peoples Plan was Marxist MN Roy, Sarvodaya was Gandhian, Gandhian Plan was Agrawal). 'EVERY constitutional amendment needs ratification by half the states' (WRONG — only federal-structure amendments under Article 368(2) proviso need state ratification; non-federal amendments need only Parliament's 2/3).",
    fix:
      "When you see 'all', 'every', 'always', 'no', 'none' in a statement, SEARCH for the EXCEPTION before judging it correct. Polity is rich in exceptions: which FRs available to foreigners; which Amendments need state ratification; which bodies are constitutional vs statutory; which subjects are state-list vs concurrent-list. Universal claims in Polity are almost ALWAYS false — distractor anchors on candidate's gut memory of partial truth.",
  },
  {
    id: "match-list-misalignment",
    title: "Match List I ↔ List II misalignment (Articles, Amendments, Bodies, Schedules)",
    bucket: "verify",
    affects: [
      "indian-constitution",
      "government-structure",
      "fundamental-rights-dpsp-local",
    ],
    mechanic:
      "Match-list questions pair 4 items (A, B, C, D) with 4 facts (1, 2, 3, 4) — the OPTION combinations make 3 of the 4 pairs correct + 1 wrong. The trap-option swaps two pairs. The 2017 MOD PYQ on Amendment-subject matching tests this: List I (Amendment Acts: 52nd 1985 / 61st 1989 / 73rd 1992 / etc.) ↔ List II (subjects: Anti-Defection / Voting age / Panchayati Raj / etc.). The 2026 HARD PYQ on High Court ↔ Territorial Jurisdiction also tests this with 4 pairs + 'how many are correctly matched'. Distractor offers e.g. 'A-1, B-2, C-3, D-4' as obvious + 'A-1, B-3, C-2, D-4' (two pairs swapped) as the trap.",
    fix:
      "BUILD your own A-B-C-D pairing from memory FIRST, then scan the option list for the EXACT match. Never start from an option — you'll anchor on 1 wrong pair and miss it. If unsure of any single pair, the whole match is risky → consider skipping (−1.33 penalty). Common Polity match-list domains: Amendment ↔ subject; HC ↔ jurisdiction; Body ↔ Article; FR ↔ Article; UN body ↔ region; Article ↔ Part of Constitution.",
  },
];

/** Index by bucket — used by the /traps page sectioning. */
export const TRAPS_BY_BUCKET: Record<TrapBucket, TrapShape[]> = {
  "paired-fact": TRAP_SHAPES.filter((t) => t.bucket === "paired-fact"),
  procedural: TRAP_SHAPES.filter((t) => t.bucket === "procedural"),
  verify: TRAP_SHAPES.filter((t) => t.bucket === "verify"),
};

export const TRAP_HEADLINE = {
  shapes: TRAP_SHAPES.length,
  topAffects: Math.max(...TRAP_SHAPES.map((t) => t.affects.length)),
};
