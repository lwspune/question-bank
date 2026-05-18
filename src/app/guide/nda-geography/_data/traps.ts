/**
 * Content for /guide/nda-geography/traps.
 *
 * NDA Geography distractor shapes — bucketed by the skill strand they affect
 * (Recall / Apply / Verify). Each trap: a mechanic (how it works), a fix
 * (the verification habit), and a worked-example UUID from the live bank
 * (where one is available).
 *
 * Different from Chemistry traps (identity-confusion across compound names),
 * Physics traps (formula misapplication), English traps (near-synonym
 * semantics), Biology traps (paired-fact swap). Geography distractors are a
 * MIX:
 *   - Paired-fact swap (state↔river, mineral↔state, peak↔range, crop↔season)
 *     dominates the Recall strand — same shape as Biology.
 *   - Mechanism direction flips (Coriolis direction, current temperature,
 *     plate-boundary outcome, wind direction) dominate the Apply strand —
 *     same shape as Physics formula-flip.
 *   - Multi-statement partial-credit + universal-claim traps dominate the
 *     Verify strand — same shape as Biology multi-statement.
 *
 * The lever is precise paired-fact recall + mechanism-direction awareness
 * + careful multi-statement judgement.
 */

export type TrapBucket = "recall" | "apply" | "verify";

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
  // ──────── Recall traps ────────
  {
    id: "mineral-state-swap",
    title: "Mineral ↔ leading-producer state swap",
    bucket: "recall",
    affects: ["indian-geography-economy"],
    mechanic:
      "Match-the-pair questions list minerals against producer states — distractor pairs them WRONG. Iron ore : Rajasthan (wrong — Odisha + Karnataka + Jharkhand + Chhattisgarh; Rajasthan has copper at Khetri). Copper : Karnataka (wrong — Karnataka has iron + gold; copper is Rajasthan + Jharkhand). Uranium : MP (wrong — Jharkhand Jaduguda; MP has diamond at Panna). The 2026 PYQ tests critical-mineral identification with similar pair-swap shape.",
    fix: "Memorise the leading-producer-state-per-mineral table cold, not generic 'rich in minerals' facts. Drill /reference-tables → 'Mineral & Crop Producer States' cluster. The 10 most-tested: iron ore (Odisha), coal (Jharkhand), bauxite (Odisha), copper (Rajasthan), uranium (Jharkhand), mica (Jharkhand), gold (Karnataka), manganese (Odisha), petroleum offshore (Mumbai High), diamond (MP Panna).",
    exampleQuestionId: "283104b6-728a-4649-af3a-33befcd9b807",
  },
  {
    id: "river-state-misalignment",
    title: "River ↔ state misalignment + tributary swap",
    bucket: "recall",
    affects: ["indian-geography-physical"],
    mechanic:
      "Distractor pairs rivers with wrong source/state or wrong tributary. Chambal is a tributary of YAMUNA (not Ganga directly). Indus + Brahmaputra both originate near Mansarovar (Tibet) — distractor swaps. Narmada + Tapi are WEST-flowing through rift valleys — distractor says they form deltas (they form estuaries, no deltas). Kaveri flows through Karnataka + Tamil Nadu — distractor adds Andhra (wrong) or omits TN.",
    fix: "Memorise river systems by source + flow direction + outflow. Himalayan: Indus + Ganga + Brahmaputra. Peninsular east-flowing (form deltas at Bay of Bengal): Mahanadi, Godavari, Krishna, Kaveri. Peninsular west-flowing (form estuaries at Arabian Sea, NO deltas): Narmada + Tapi (rift-valley rivers). Tributary mnemonic: Chambal-Betwa-Ken all join Yamuna; Ghaghara-Gandak-Kosi all join Ganga.",
  },
  {
    id: "peak-range-swap",
    title: "Peak/pass ↔ range swap (Himalayan + Eastern Ghats)",
    bucket: "recall",
    affects: ["indian-geography-physical"],
    mechanic:
      "Zoji La in Pir Panjal (wrong — Zanskar; Banihal is in Pir Panjal). Khardung La in Karakoram (wrong — Ladakh range). Rohtang in Greater Himalayas (wrong — Pir Panjal). Mahendragiri in Tamil Nadu (wrong — Odisha; TN has a separate same-named peak in W Ghats). Anamudi 'highest in India' (wrong — Anamudi is highest in PENINSULAR India / Western Ghats; Kanchenjunga is India's highest overall). The 2024 HARD PYQ tests Himalayan-pass ↔ range pairs.",
    fix: "Memorise the pass-range-state TRIPLE together, not separately. Zoji La / Zanskar / J&K. Banihal / Pir Panjal / J&K. Khardung La / Ladakh / Ladakh. Rohtang / Pir Panjal / HP. Nathu La / Dongkya / Sikkim. Bomdi La / Sela / Bumla / E Himalayas / Arunachal. For peaks: Kanchenjunga (Sikkim, India's highest), Nanda Devi (Uttarakhand, entirely-in-India highest), Anamudi (Kerala, peninsular highest), Mahendragiri (Odisha, Eastern Ghats highest), Guru Shikhar (Rajasthan, Aravalli highest).",
    exampleQuestionId: "3e1970b4-8534-4cb7-8aa2-616d58b4ee21",
  },
  {
    id: "crop-season-swap",
    title: "Crop ↔ kharif/rabi season swap",
    bucket: "recall",
    affects: ["indian-geography-economy"],
    mechanic:
      "Wheat is kharif (wrong — RABI; sown Oct, harvested Apr). Rice is rabi (wrong — KHARIF, monsoon-fed). Cotton is rabi (wrong — KHARIF, long cash crop). Distractor swaps season for headline crops. Sometimes phrased as 'consider the following kharif crops' with rabi crops mixed in.",
    fix: "Memorise: kharif = monsoon-fed (June–Oct sowing) — rice, cotton, sugarcane, maize, bajra, jowar, groundnut, soybean. Rabi = winter-irrigated (Oct–Apr) — wheat, barley, mustard, gram, peas, lentil. Zaid = short-summer (Mar–Jun) — watermelon, cucumber, fodder. Cotton + sugarcane span longer than one season but CLASSIFIED kharif (sowing month).",
  },
  {
    id: "world-river-canal-swap",
    title: "World river / canal identity swap",
    bucket: "recall",
    affects: ["world-and-human-geography"],
    mechanic:
      "Helmand flows to Arabian Sea (wrong — endorheic, flows to Hamoun wetlands at Iran-Afghanistan border; Afghanistan is landlocked). Suez has locks (wrong — sea-level, NO locks; Panama has locks). Caspian is connected to Black Sea (wrong — landlocked; technically world's largest lake). Volga flows to Black Sea (wrong — Caspian Sea). Nile flows S (wrong — flows N from Lake Victoria to Mediterranean). The 2023 HARD PYQ tests Helmand identification.",
    fix: "Memorise: longest river = Nile (Africa, 6650 km, N-flowing). Largest by discharge = Amazon (S America). Longest in Europe = Volga (Russia, flows to landlocked Caspian). Endorheic rivers (don't reach ocean): Helmand (Hamoun wetlands), Volga (Caspian), Luni (Rann of Kutch India), Jordan (Dead Sea). Suez = sea-level no locks; Panama = locked (Pacific is higher).",
    exampleQuestionId: "81af52a9-d67a-473e-a49a-14553de810cb",
  },
  {
    id: "scheme-purpose-overinclusion",
    title: "Government scheme — purpose over-inclusion trap",
    bucket: "recall",
    affects: ["indian-geography-economy"],
    mechanic:
      "Distractor adds an OUT-OF-SCOPE component to a real scheme. RAD (Rainfed Area Development) includes 'large-scale canal irrigation' (WRONG — RAD is specifically for RAINFED areas; canal irrigation would defeat the premise). PMFBY (crop insurance) includes 'income support' (wrong — that's PM-KISAN). PMKVY (skill development) covers 'health insurance' (wrong — that's Ayushman Bharat). The 2026 MOD PYQ tests RAD scope.",
    fix: "Pair each scheme with its CORE purpose: PMFBY = crop insurance (not income). PM-KISAN = ₹6000/yr income to farmers (not insurance). PMKVY = skill development (not health). PMAY = housing. PMJDY = bank accounts. Ayushman Bharat = health. RAD (under NMSA) = rainfed agriculture support via integrated farming + watershed + diversification (NOT large-scale irrigation).",
    exampleQuestionId: "2138b509-21e2-43a5-a91c-261ef2e08370",
  },

  // ──────── Apply traps ────────
  {
    id: "coriolis-direction-flip",
    title: "Coriolis force / wind / current direction flip",
    bucket: "apply",
    affects: ["climatology-atmosphere-weather", "oceanography"],
    mechanic:
      "Coriolis deflects winds + currents to the LEFT in N hemisphere (wrong — RIGHT in N, LEFT in S). Trade winds blow from equator toward 30° latitude (wrong — from 30° TOWARD equator). Tropical cyclones rotate CW in N (wrong — CCW in N, CW in S). Distractor flips Coriolis direction or wind-flow direction. Same shape as Physics's sign-flip trap.",
    fix: "Memorise the Coriolis rule: deflect RIGHT in N hemisphere (think 'NoRth = Right'), LEFT in S. Winds always flow HIGH→LOW pressure but Coriolis deflects them. Trade winds: 30° → 0° (high to low), deflected RIGHT in N hemisphere → become NE→SW (NE trade winds). Westerlies: 30° → 60°, deflected RIGHT in N hemisphere → become SW→NE (SW westerlies).",
  },
  {
    id: "warm-cold-current-swap",
    title: "Warm ↔ cold ocean current swap (Alaska, Labrador, NAD)",
    bucket: "apply",
    affects: ["oceanography"],
    mechanic:
      "Distractor labels warm currents as cold or vice versa. Alaska Current is COLD (wrong — it's WARM despite being near Alaska). North Atlantic Drift is COLD (wrong — it's WARM, the extension of Gulf Stream, keeps W Europe mild). Labrador Current is WARM (wrong — COLD, off NE Canada). The 2025 HARD PYQ tests cold-current identification.",
    fix: "Memorise warm and cold lists separately. WARM (equator → poles, east coasts in N): Gulf Stream, North Atlantic Drift, Kuroshio, Brazil, Agulhas, East Australian, Alaska Current. COLD (poles → equator, west coasts in N): California, Humboldt, Benguela, Labrador, Oyashio, Canary, West Wind Drift. Names can mislead — verify direction (toward pole = warm; toward equator = cold).",
    exampleQuestionId: "962c22e6-0ab0-4704-9d80-d0f2eb21c4c0",
  },
  {
    id: "plate-boundary-outcome-flip",
    title: "Plate-boundary type ↔ resulting feature flip",
    bucket: "apply",
    affects: ["earths-structure-landforms"],
    mechanic:
      "Convergent oceanic-oceanic forms mid-oceanic ridges (wrong — that's DIVERGENT; convergent o-o forms ISLAND ARCS + trenches like Japan, Aleutians). Divergent forms mountains (wrong — divergent forms ridges + rifts; convergent c-c forms folded mountains like Himalayas). Transform causes volcanoes (wrong — transform = strike-slip + shallow earthquakes; volcanoes are at convergent + divergent + hotspots).",
    fix: "Memorise boundary type → outcome: Convergent o-c (oceanic-continental) → SUBDUCTION + volcanic arc + trench (Andes, Cascades). Convergent c-c → MOUNTAIN FOLDING (Himalayas, Alps). Convergent o-o → ISLAND ARC + trench (Japan, Aleutians, Mariana). Divergent → MID-OCEANIC RIDGE + seafloor spreading (Mid-Atlantic Ridge). Transform → STRIKE-SLIP fault + shallow earthquakes (San Andreas).",
  },
  {
    id: "s-wave-through-liquid",
    title: "S-waves travel through liquid (they don't)",
    bucket: "apply",
    affects: ["earths-structure-landforms"],
    mechanic:
      "Distractor says S-waves travel through outer core or all Earth layers. P-waves travel through everything; S-waves CANNOT travel through liquid (transverse waves need shear strength, which liquids lack). The S-wave SHADOW ZONE (104°–140° from epicenter) is direct evidence that outer core is liquid. Common in multi-statement Earth-interior questions.",
    fix: "Mnemonic: P = Pass through everything (Primary, longitudinal); S = Stops at liquid (Secondary, shear). When evaluating a statement about seismic-wave behavior, ask: 'is this S-wave through liquid?' If yes, it's false — S-waves don't propagate through outer core or oceans. L-waves are surface only (slowest, most destructive).",
  },
  {
    id: "rock-classification-error",
    title: "Rock type ↔ formation process classification error",
    bucket: "apply",
    affects: ["earths-structure-landforms"],
    mechanic:
      "Marble is sedimentary (wrong — METAMORPHIC, from limestone). Limestone is metamorphic (wrong — SEDIMENTARY, organically formed from marine shells). Chert is mechanically formed sedimentary (wrong — CHEMICALLY formed). Granite is sedimentary (wrong — IGNEOUS intrusive). Basalt is metamorphic (wrong — IGNEOUS extrusive). The 2025 HARD PYQ tests sedimentary classification (chert + shale + etc.).",
    fix: "Memorise rock-cycle pairs: limestone (sedimentary, organic) → marble (metamorphic). Sandstone (sedimentary, mechanical) → quartzite (metamorphic). Shale (sedimentary, mechanical) → slate → schist → gneiss (metamorphic). Granite (igneous, intrusive) → gneiss (metamorphic). Basalt (igneous, extrusive) → schist. Chert + halite + gypsum = CHEMICAL sedimentary. Sandstone + shale + conglomerate = MECHANICAL sedimentary. Limestone + coal + chalk = ORGANIC sedimentary.",
    exampleQuestionId: "2604a840-a988-4bee-a47c-75d78baa9cd1",
  },
  {
    id: "temperature-inversion-misread",
    title: "Temperature inversion ↔ normal lapse rate flip",
    bucket: "apply",
    affects: ["climatology-atmosphere-weather"],
    mechanic:
      "Normal lapse rate = temperature DECREASES with altitude (~6.5°C/km in troposphere). INVERSION = temperature INCREASES with altitude (opposite). Distractor calls inversion the 'normal lapse rate' or claims it doesn't form on winter nights. The 2026 HARD PYQ tests inversion statements (winter-night formation, valley-pooling cold air).",
    fix: "Memorise: NORMAL lapse rate = warm at surface, cold above (heat-driven convection). INVERSION = cold at surface, warm above (radiation cooling at night, valley cold-air pooling, ahead of warm fronts). Inversions cause fog + smog + trapped pollutants. Common on still clear winter nights. The 'cold at the bottom' is the diagnostic.",
    exampleQuestionId: "524ed115-e3e5-467e-9944-29325caa20bc",
  },

  // ──────── Verify traps ────────
  {
    id: "multi-statement-partial-credit",
    title: "Multi-statement evaluation — partial-credit distractor",
    bucket: "verify",
    affects: ["earth-in-space-maps", "oceanography", "earths-structure-landforms"],
    mechanic:
      "'Consider the following statements... which are correct?' with options like 'Only I, II' / 'Only II, III' / 'All' / 'None'. The trap option lists 2 of 3 correct statements (when there are actually 3 correct) — partial-credit distractor. Or lists 3 of 3 correct + 1 wrong → 'All four' becomes wrong because 1 is false.",
    fix: "Judge each statement INDEPENDENTLY before reading the options. Write a small T/F next to each. Then match to the option that lists EXACTLY your set of T statements. NEVER pick on partial recognition. If you're uncertain about any statement, the whole question is uncertain — consider skipping (−1.33 penalty is harsh).",
    exampleQuestionId: "6a7b496a-77c1-49b3-bc04-6c4d251e1997",
  },
  {
    id: "terrestrial-jovian-trait-swap",
    title: "Terrestrial ↔ Jovian planet trait swap",
    bucket: "verify",
    affects: ["earth-in-space-maps"],
    mechanic:
      "Terrestrial planets have many moons (wrong — they have FEW; Mercury 0, Venus 0, Earth 1, Mars 2). Terrestrial planets have low density (wrong — HIGH density 3.9–5.5 g/cm³). Jovian planets are rocky (wrong — GASEOUS). Jovian planets are close to Sun (wrong — FAR from Sun, beyond asteroid belt). The 2026 HARD PYQ tests this multi-statement shape.",
    fix: "Memorise the 4-trait table: TERRESTRIAL = small + dense + rocky + few moons + close to Sun + thin atmosphere. JOVIAN = large + low density + gaseous + many moons + far from Sun + thick atmosphere + RINGS (all four have rings). Read each statement separately and tag it 'terrestrial trait' or 'Jovian trait' before judging the option.",
    exampleQuestionId: "5af85b80-4784-4c89-8024-b410ef61928e",
  },
  {
    id: "universal-claim-trap",
    title: "Universal-claim trap (all/every/always)",
    bucket: "verify",
    affects: ["earths-structure-landforms", "climatology-atmosphere-weather"],
    mechanic:
      "Distractor uses absolute quantifiers: 'all convergent boundaries form mountains' (wrong — oceanic-oceanic forms island arcs, not large mountain ranges). 'All west-flowing peninsular rivers form deltas' (wrong — Narmada + Tapi form estuaries). 'Every tropical cyclone has an eye' (wrong — small tropical depressions may not). 'All ocean currents are wind-driven' (wrong — also Coriolis + gravity + salinity + heating).",
    fix: "When you see 'all', 'every', 'always', 'no', 'none' in a statement, search for the EXCEPTION before judging it correct. Geography is rich in exceptions: most rivers form deltas BUT west-flowing peninsulars don't. Most convergent boundaries form mountains BUT oceanic-oceanic forms island arcs. Most ocean currents go warm-to-cold near coasts BUT NAD is warm at high latitude.",
  },
  {
    id: "spring-tide-season-confusion",
    title: "Spring tides happen in spring (they don't)",
    bucket: "verify",
    affects: ["oceanography"],
    mechanic:
      "Distractor says spring tides occur in the spring season. WRONG — 'spring' here is the VERB ('to spring up, leap'). Spring tides occur TWICE A MONTH (at full moon + new moon) when Sun-Moon-Earth are aligned, producing maximum tidal range. Neap tides occur twice a month at quarter moons (minimum range). Both happen year-round, every fortnight.",
    fix: "Mnemonic: SPRING tides = SPRING UP (leap to max range). They happen every fortnight (2 per month, every month). NEAP tides = lower range, also every fortnight. Tidal range cycle: spring → neap → spring → neap, alternating each week.",
  },
  {
    id: "mid-ocean-ridge-hawaii",
    title: "Hawaii is on a mid-oceanic ridge (it isn't)",
    bucket: "verify",
    affects: ["oceanography", "earths-structure-landforms"],
    mechanic:
      "Distractor lists Hawaii as ridge-associated. Hawaii is a HOTSPOT volcanic chain — the Pacific plate moves over a stationary mantle hotspot, creating a chain of islands (Big Island youngest, oldest islands eroded to NW). Iceland IS on the Mid-Atlantic Ridge. Galapagos is near a triple junction near East Pacific Rise. The 2025 MOD PYQ tests this distinction.",
    fix: "Memorise volcanic-island origin: HOTSPOT chains (NOT on plate boundaries) — Hawaii (Pacific), Réunion (Indian Ocean), Yellowstone (continental hotspot under N America). RIDGE-associated (on divergent boundaries) — Iceland (Mid-Atlantic Ridge), Azores. ISLAND-ARC (at convergent boundaries) — Japan, Aleutians, Mariana, Caribbean (Lesser Antilles), Indonesia. Verify the tectonic origin, not just 'volcanic island'.",
  },
];

/** Index by bucket — used by the /traps page sectioning. */
export const TRAPS_BY_BUCKET: Record<TrapBucket, TrapShape[]> = {
  recall: TRAP_SHAPES.filter((t) => t.bucket === "recall"),
  apply: TRAP_SHAPES.filter((t) => t.bucket === "apply"),
  verify: TRAP_SHAPES.filter((t) => t.bucket === "verify"),
};

export const TRAP_HEADLINE = {
  shapes: TRAP_SHAPES.length,
  topAffects: Math.max(...TRAP_SHAPES.map((t) => t.affects.length)),
};
