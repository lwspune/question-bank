import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_WD_BORROWED_NOTE: SubtopicNote = {
  subtopicName: "Word Meaning: Borrowed Words and Word Families",
  title: "Borrowed words and look-alike word families",
  oneLineDefinition:
    "French and Latin phrases used in English, and match lists built on words that share an opening or a root. Learn the phrases; read past the opening letters; let the root carry the meaning.",
  whyItMatters:
    "Borrowed French and Latin phrases come up in match lists, often with a theme such as law or diplomacy. " +
    "The newest match lists put four words with the same start side by side (fortuitous, formidable, forlorn) or four words from one root (polyglot, polymath). The shared letters are there to confuse you; the rest of each word tells them apart.",
  concepts: [
    // C1 — borrowed words and phrases
    {
      kind: "reference" as const,
      slug: "cdsenwd-borrowed",
      name: "Borrowed words and phrases (French and Latin)",
      intuition:
        "English has kept many words and phrases from French and Latin unchanged. French gave words of food, fashion, building and diplomacy (aperitif, beret, façade, attaché). Latin gave words of law and logic (alibi, locus standi, non sequitur). " +
        "Their spelling often looks foreign, which makes them easy to spot and to learn as a list.",
      definition:
        "How to learn them:\n" +
        "- Group them by field: diplomacy, food and dress, buildings, law, logic.\n" +
        "- Learn the literal meaning where it helps: **cul-de-sac** = bottom of the bag (a dead end); **faux pas** = false step (a social mistake); **sui generis** = of its own kind (unique).\n" +
        "- Greek-built words for kinds of rule end in **-archy** or **-cracy**: the first part names who rules (ochlos = mob, hoplites = soldiers).",
      table: {
        columns: ["Word", "Meaning", "Origin", "Sitting"],
        rows: [
          { cells: ["Attaché", "A member of an embassy's staff with a special duty", "French", "2024 (I)"] },
          { cells: ["Aperitif", "A drink taken just before a meal", "French", "2024 (I)"] },
          { cells: ["Avant-garde", "New and experimental, ahead of its time", "French: the vanguard", "2024 (I)"] },
          { cells: ["Alibi", "Proof of being elsewhere when a crime took place", "Latin: elsewhere", "2024 (I)"] },
          { cells: ["Sui generis", "Unique, nothing else like it", "Latin: of its own kind", "2024 (I)"] },
          { cells: ["Facta non verba", "Deeds, not words", "Latin", "2024 (I)"] },
          { cells: ["Mutatis mutandis", "With the necessary changes made; the rest stays the same", "Latin", "2024 (I)"] },
          { cells: ["Non sequitur", "A conclusion that does not follow from what was said", "Latin: it does not follow", "2024 (I)"] },
          { cells: ["Connoisseur", "An expert judge in matters of taste (food, wine, art)", "French: one who knows", "2024 (I)"] },
          { cells: ["Cul-de-sac", "A street closed at one end", "French: bottom of the bag", "2024 (I)"] },
          { cells: ["Dossier", "A collection of documents about a person or a matter", "French", "2024 (I)"] },
          { cells: ["Debris", "Scattered remains of something broken", "French", "2024 (I)"] },
          { cells: ["Déjà vu", "The feeling of having lived the present moment before", "French: already seen", "2024 (I)"] },
          { cells: ["Faux pas", "A tactless remark or an embarrassing social mistake", "French: false step", "2024 (I), 2025 (II)"] },
          { cells: ["En route", "On the way, during a journey", "French", "2024 (I)"] },
          { cells: ["Laissez-faire", "A policy of minimal government interference", "French: let do", "2024 (I)"] },
          { cells: ["Façade", "The principal front of a building", "French", "2024 (I)"] },
          {
            cells: ["Liaison", "A link or contact between two groups; a person who keeps that link", "French", "2024 (I)"],
            noteAmber: "In the 2024 (I) list it was matched with 'diplomatic support staff', the role of a liaison officer between two offices.",
          },
          { cells: ["Maisonette", "A set of rooms with its own separate entrance in a larger building", "French: little house", "2024 (I)"] },
          { cells: ["Beret", "A round, flattish soft cap", "French", "2024 (I)"] },
          { cells: ["Ex gratia", "Done as a favour, without legal obligation (an ex gratia payment)", "Latin: out of grace", "2025 (I)"] },
          { cells: ["Suo motu (often written suo moto)", "On its own motion, without being asked (a court acting suo motu)", "Latin", "2025 (I)"] },
          { cells: ["Arraignment", "Stating the charges against an accused in court", "Old French, through legal English", "2025 (I)"] },
          { cells: ["Locus standi", "The right to bring an action before a court", "Latin: place to stand", "2025 (I)"] },
          { cells: ["Fait accompli", "Something already decided, which others cannot deny or undo", "French: accomplished fact", "2025 (I)"] },
          { cells: ["Hedonism", "The pursuit of pleasure as the main aim of life", "Greek: hedone = pleasure", "2025 (I)"] },
          { cells: ["Hoplarchy", "Government by the military", "Greek: hoplites (soldiers) + -archy (rule)", "2025 (I)"] },
          { cells: ["Ochlocracy", "Government by the mob", "Greek: ochlos (mob) + -cracy (rule)", "2025 (I)"] },
        ],
        caption: "The 2024 (I) paper set its borrowed words as a run of match lists; the 2025 (I) lists leaned to law and kinds of rule.",
      },
      pyqExampleId: "951cbd4e-90ba-400c-a5d7-10e6ee742289",
      selfCheckExample: {
        prompt:
          "After the regiment won the trophy, every soldier felt pride in the unit and loyalty to each other. Which French phrase names this feeling: esprit de corps, carte blanche or bon voyage?",
        steps: [
          "Carte blanche (white card) is full freedom to act as you wish.",
          "Bon voyage (good journey) is said to someone setting off.",
          "Esprit de corps (spirit of the body) is the pride and loyalty shared by members of a group.",
        ],
        answer: "Esprit de corps.",
      },
      practiceSet: [
        { prompt: "Bona fide means (a) genuine, in good faith (b) a good ending?", answer: "(a) genuine, in good faith", method: "Latin: in good faith" },
        { prompt: "Rendezvous means (a) a meeting at an agreed place (b) a return journey?", answer: "(a) a meeting at an agreed place" },
        { prompt: "Per se means (a) by itself, in itself (b) for each person?", answer: "(a) by itself, in itself" },
        { prompt: "Spot the wrong row: 'Avant-garde = old-fashioned and traditional'.", answer: "Wrong. Avant-garde = new and experimental." },
      ],
      traps: [
        {
          title: "Attaché and liaison sit close",
          body:
            "An **attaché** is a member of an embassy's staff. A **liaison** is a link between two groups, or the person who keeps it. If a set uses both, match the one you are surer of first and let the code decide the other.",
        },
        {
          title: "Suo motu is not 'on request'",
          body:
            "**Suo motu** means a court acts on its own, without anyone filing a case. **Locus standi** is the opposite idea: whether a person has the right to bring a case at all.",
        },
        {
          title: "Déjà vu is not a memory",
          body:
            "**Déjà vu** is the strange feeling that the present has happened before, not a real memory of a past event. The option 'feeling of having experienced the present' is the one to look for.",
        },
      ],
    },

    // C2 — look-alike openings
    {
      kind: "formula" as const,
      slug: "cdsenwd-look-alikes",
      name: "Same opening letters, different roots: read past the start",
      intuition:
        "In these lists all four words start the same way: Fort-, Pr-, Inc-, Disc-, Em-, De-. The shared **prefix**, or just shared letters, makes them feel related, but they come from different roots. " +
        "Cover the first few letters with your thumb and read what is left. That part decides the meaning.",
      definition:
        "The method:\n" +
        "- Cover the shared opening and read the rest of each word.\n" +
        "- Link that rest to a word you know: fortuit- to fortune (chance), -cendi- to candle and fire, -cauti- to caution.\n" +
        "- Fix the two words you are surest of and strike codes, as in any match list.\n" +
        "- Expect one pair that differs by a single letter (discreet / discrete). Those you must simply know.\n" +
        "Sets tested this way:\n" +
        "- 2026 (I): fortuitous (by chance), fortitudinous (very brave), formidable (daunting), forlorn (sad and alone).\n" +
        "- 2026 (I): pragmatist (practical person), promethean (daringly original), promontory (headland jutting into the sea), prolix (using too many words).\n" +
        "- 2026 (I): incensed (enraged), incendiary (designed to cause fires), incautious (careless of risk), incandescent (giving out light when heated).\n" +
        "- 2026 (II): discreet (tactful), discrete (separate), desecrate (defile), decrepit (decaying).\n" +
        "- 2026 (II): inflation (expansion), indentation (a notch, a depression), infiltration (permeation), inflection (change in a word's form).\n" +
        "- 2026 (II): tabernacle (place of worship), tenuous (flimsy), tempestuous (stormy), tendentious (biased).\n" +
        "- 2026 (II): emanated (originated), emancipated (liberated), empathised (felt for), emaciated (starved, very thin).\n" +
        "- 2025 (II): feat (a brave achievement), fate (events beyond our control), fathom (a unit for the depth of water), faux pas (an embarrassing mistake).\n" +
        "- 2025 (II): Semitic (a language family that includes Hebrew), seminary (training college for priests), send-off (a farewell), semblance (outward likeness).\n" +
        "- 2025 (II): extirpate (destroy completely), extol (praise highly), extremity (farthest point), expunge (remove completely).\n" +
        "- 2025 (II): devious (skilled in underhand tricks), devolution (transfer of power to a lower level), detriment (harm), detract (make seem less valuable).",
      authoredExample: {
        prompt:
          "Match List I with List II. List I: A. Verbatim B. Verdant C. Veracious D. Vertigo. List II: 1. Green with grass 2. Dizziness 3. Truthful 4. Word for word. Codes: (a) A-4, B-1, C-3, D-2 (b) A-4, B-3, C-1, D-2 (c) A-2, B-1, C-3, D-4 (d) A-2, B-3, C-1, D-4",
        steps: [
          "Cover 'Ver' and read the rest.",
          "Verbatim comes from verbum = word: word for word. A-4 strikes (c) and (d).",
          "(a) and (b) differ on B and C. Verdant links to French vert = green: green with grass. B-1.",
          "Only (a) has B-1. Confirm: veracious links to verity (truth), C-3; vertigo is dizziness, D-2.",
        ],
        answer: "(a) A-4, B-1, C-3, D-2.",
      },
      selfCheckExample: {
        prompt:
          "Match List I with List II. List I: A. Obdurate B. Obsolete C. Oblivious D. Obstreperous. List II: 1. No longer in use 2. Not aware 3. Stubborn, refusing to change 4. Noisy and hard to control. Codes: (a) A-3, B-1, C-2, D-4 (b) A-3, B-2, C-1, D-4 (c) A-1, B-3, C-2, D-4 (d) A-1, B-2, C-3, D-4",
        steps: [
          "All four start with ob-, so cover it.",
          "Obsolete (-solete): an obsolete machine is no longer used. B-1. Only (a) has B-1.",
          "Confirm: obdurate = stubborn (A-3), oblivious = not aware (C-2), obstreperous = noisy (D-4).",
        ],
        answer: "(a) A-3, B-1, C-2, D-4.",
      },
      practiceSet: [
        { prompt: "Discreet or discrete: which means separate?", answer: "Discrete", method: "the e's are separated by the t" },
        { prompt: "Forlorn means (a) daunting (b) sad and alone?", answer: "(b) sad and alone" },
        { prompt: "Prolix means (a) using too many words (b) daringly original?", answer: "(a) using too many words" },
        { prompt: "Emaciated means (a) set free (b) very thin from hunger?", answer: "(b) very thin from hunger", method: "set free is emancipated" },
      ],
      pyqExampleId: "5e586edb-c110-4ac7-872f-e4454a33a200",
      traps: [
        {
          title: "Shared letters are not a shared root",
          body:
            "**Fortuitous** (by chance) has nothing to do with **fortitude** (courage). **Formidable** is not related to either. Matching by the opening letters is exactly what the list is built to punish.",
        },
        {
          title: "Discreet and discrete",
          body:
            "**Discreet** = careful, tactful (a discreet enquiry). **Discrete** = separate, distinct (discrete parts). Memory hook: in discrete, the two e's are kept separate by the t.",
        },
        {
          title: "Emancipated and emaciated",
          body:
            "One extra syllable separates them. **Emancipated** = set free; **emaciated** = very thin from hunger. Say each word slowly before matching it.",
        },
      ],
    },

    // C3 — root families
    {
      kind: "formula" as const,
      slug: "cdsenwd-root-families",
      name: "One root, many words: let the root carry the meaning",
      intuition:
        "Here all four words share one real root: poly- (many), phil- (love), sacr- (holy), -scribe (write), trans- (across). The root gives the common meaning; the rest of the word tells you which kind. " +
        "So learn the root once, and learn what the other part adds.",
      definition:
        "Common parts in these lists:\n" +
        "- **-ology** = the study of; **-ological** = related to that study (epidemiological = related to the study of diseases).\n" +
        "- **-ist** = a person who does or studies (philatelist, philologist).\n" +
        "- **-ism** = a belief or attitude (triumphalism).\n" +
        "- **epi-** = upon or over (epitaph = written upon a tomb).\n" +
        "The method:\n" +
        "- Give the shared root its meaning once.\n" +
        "- Read the second part of each word and join it to the root.\n" +
        "- Fix two sure pairs and strike codes.\n" +
        "Sets tested this way:\n" +
        "- 2026 (I): tautological (repetitious), ontological (related to existence), epistemological (related to knowledge), epidemiological (related to diseases).\n" +
        "- 2026 (I): epitaph (words about a dead person), epistle (a formal letter), epithet (a word for a quality or character), epigram (a short, clever saying).\n" +
        "- 2026 (I): implication (meaning that is inferred), complication (a complex situation), supplication (praying humbly), application (a formal request).\n" +
        "- 2026 (I): ascribe (attribute to an author or owner), prescribe (lay down a rule), proscribe (officially forbid), inscribe (carve or etch).\n" +
        "- 2026 (II): polyglot (knows many languages), polymorphous (having many forms), polysemy (a word having many meanings), polymath (a person of wide learning).\n" +
        "- 2026 (II): philatelist (stamp collector), philanthropist (one who helps the needy), philologist (one who studies language), philistine (one who does not value art).\n" +
        "- 2026 (II): sacred (consecrated), desecration (defilement), sacrosanct (inviolable), sacrifice (an offering).\n" +
        "- 2026 (II): triumph (a notable success), triumphant (proud after victory), triumphal (celebrating a victory), triumphalism (smug superiority).\n" +
        "- 2026 (II): revel (make merry), revelry (wild merriment), reveal (disclose), reveller (a person making merry).\n" +
        "- 2026 (II): transmit (send a signal), transmute (change into something else), transpire (happen), transient (lasting a short time).",
      authoredExample: {
        prompt:
          "Match List I with List II. List I: A. Homicide B. Genocide C. Pesticide D. Regicide. List II: 1. Killing of a king 2. A chemical that kills pests 3. Killing of a person 4. Killing of a whole people. Codes: (a) A-3, B-4, C-2, D-1 (b) A-3, B-2, C-4, D-1 (c) A-4, B-3, C-2, D-1 (d) A-4, B-2, C-3, D-1",
        steps: [
          "Shared root: -cide = killing.",
          "Read the first part: homo = man, genos = race or people, pest, rex/regis = king.",
          "Pesticide is a chemical that kills pests: C-2. This strikes (b) and (d).",
          "(a) and (c) differ on A and B. Homo = man, so homicide is killing a person: A-3. Only (a) is left.",
        ],
        answer: "(a) A-3, B-4, C-2, D-1.",
      },
      selfCheckExample: {
        prompt:
          "Match List I with List II. List I: A. Benediction B. Dictum C. Contradict D. Diction. List II: 1. A formal statement of a principle 2. A blessing 3. The choice and use of words 4. To say the opposite. Codes: (a) A-2, B-1, C-4, D-3 (b) A-2, B-3, C-4, D-1 (c) A-1, B-2, C-3, D-4 (d) A-4, B-1, C-2, D-3",
        steps: [
          "Shared root: dict = say.",
          "bene (well) + diction = saying good things: a blessing. A-2 leaves (a) and (b).",
          "They differ on B and D. Diction is how words are chosen and spoken: D-3.",
          "Only (a) has D-3. Confirm: contra (against) + dict = say the opposite, C-4.",
        ],
        answer: "(a) A-2, B-1, C-4, D-3.",
      },
      practiceSet: [
        { prompt: "Biblio = book, phile = lover. A bibliophile is?", answer: "A lover of books" },
        { prompt: "Circum = around, spect = look. A circumspect person is?", answer: "Cautious, one who looks around before acting" },
        { prompt: "Chronos = time. A chronicle is?", answer: "A record of events in the order of time" },
        { prompt: "Proscribe or prescribe: which means to forbid?", answer: "Proscribe", method: "a doctor prescribes medicine; a government proscribes a banned group" },
      ],
      pyqExampleId: "62552138-d8e6-4278-93be-ca917de57801",
      traps: [
        {
          title: "Prescribe and proscribe are near opposites",
          body:
            "**Prescribe** = lay down what must be done. **Proscribe** = officially forbid. One vowel separates a rule from a ban.",
        },
        {
          title: "Philistine has no love in it",
          body:
            "Most phil- words mean a lover of something, but a **philistine** is a person who does not value art or culture. The name comes from an ancient people, not from phil- = love.",
        },
        {
          title: "Triumphant and triumphal",
          body:
            "**Triumphant** describes a person who feels proud after winning (a triumphant team). **Triumphal** describes something made to celebrate a victory (a triumphal arch). **Triumphalism** is smug, boastful superiority.",
        },
      ],
    },
  ],
};
