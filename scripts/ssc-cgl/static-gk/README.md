# Static GK (SSC exams)

**What:** a "Static GK" subject in SSC CGL Tier I and Tier II, SSC CHSL and SSC CPO, holding the
settled facts SSC's General Awareness asks. Until 2026-11-19 they sat under **Current Affairs**,
because the SSC lane copied CDS's eight GK subjects and the drafting brief sent "static culture,
sports, awards, books" there. Asked for by a paying CGL student on 2026-11-18 ("Add static gk
section ... it's missing"). The questions were in the bank all along, just hidden under Current
Affairs. That also kept them out of the SSC notes, the daily homework and the General Awareness
ebook, which leave Current Affairs out because its facts go stale.

**Move (2026-11-19):** every SSC Current Affairs row (1,711) was read by hand; **932 moved**, 779
stayed. CGL Tier I 582, CPO 196, CHSL 143, CGL Tier II 11. By chapter: Art and Culture 330,
Sports and Games 247, Festivals, Fairs and Important Days 153, Books and Authors 66, Awards and
Honours 51, Firsts, Symbols and Institutions 48, Science, Space and Environment Facts 37.

## Files

- `taxonomy.ts`: the chapters and subtopics, each subtopic with a short code.
- `decisions.json`: question-id prefix (8 characters) to code. A Current Affairs row no key names
  stays where it is.
- `lib.ts`: pure core (tests: `tests/ssc-static-gk.test.ts`).
- `move.ts`: moves the bank (one transaction), the committed transcripts and the catalog together,
  so a re-commit of a shift cannot undo it. Dry run by default (every write, then ROLLBACK).
  Re-running after `--apply` is a no-op. Run it from the folder with the production `.env.local`,
  after `npm run db:backup`.

## The rule: static or Current Affairs?

A question is **static** when its answer does not depend on news: a student who learnt it from a
book five years ago still gets it right.

| Static GK | Stays in Current Affairs |
|---|---|
| Dance and its state, instrument and its maestro, gharana, temple architecture | "X, Padma Shri 2022, is known for which dance?" (you need the news to know X) |
| A famous award fact: Bharat Ratna recipients, "youngest to get the Padma Bhushan", an award's origin | "Who got award Y in 2023?" for a lesser-known person |
| A recent award where the answer is a fixed fact ("Baiga dance is from which state?") | Which award went to whom this year |
| Books published before about 2018 and their authors | Books from about 2018 on, recent Booker and Pulitzer winners |
| Festivals, fairs, the days India and the UN observe (date and person) | "Who was the Republic Day chief guest in 2025?", "the 76th Independence Day" |
| Sports rules, terms, equipment, trophies, venues and firsts; famous players and their sport | Recent winners, tournaments, records "as of" a date, recent appointments |
| International bodies: headquarters, founding year, membership, who publishes an index | An index's latest ranking, summit venues, recent agreements |
| National parks and sanctuaries, Project Tiger year, older space missions (PSLV, Mangalyaan) | New Ramsar sites, recent missions (Chandrayaan-3, Aditya-L1, NISAR, Gaganyaan) |

Government schemes, appointments, defence exercises, foreign relations and government events
stay in Current Affairs even when the scheme is old: they change, and SSC asks them as news.

## Later (not done in this move)

- Static GK notes for SSC CGL (they do not go stale, unlike Current Affairs).
- A Static GK daily homework plan, and its chapters in the SSC General Awareness ebook
  (`src/lib/ebooks/paperBooks.ts` builds from homework plans).
## NDA, CDS and RRB NTPC (2026-11-19, the same day)

The same rule carried to the three other exams that file GK the CDS way: all 1,117 of their
Current Affairs rows read by hand, **157 moved** (NDA 46, CDS 85, RRB NTPC 26), 960 stayed. Their
Current Affairs is far more news than SSC's (14% static against SSC's 54%). Decisions:
`decisions-gk-exams.json`; mover: `move-gk-exams.ts`, which moves the bank in one transaction and
each pipeline's source with it (RRB transcripts, CDS `questions.json`, NDA practice-paper records;
27 NDA rows came from Excel uploads and live only in the bank). Two additions for the defence
exams:

- a topic **Armed Forces: Organisation, Ranks and Institutions** (code FI-D) under Firsts, Symbols
  and Institutions: Army commands, rank order, mottos, where the training schools are. Defence
  operations, deals, exercises and weapons stay in Current Affairs.
- four settled facts stay in Current Affairs on purpose (`keep`): they belong to the authored
  Current Affairs pool for a sitting (`Current Affairs_Sep26.docx`), whose audit counts its
  evergreen share.

Not done there: V's practice tests for NDA and CDS (`src/lib/practiceTests/config.ts` `GK`) leave
Static GK out for now, since NDA has only about 23 past-paper Static GK questions.
