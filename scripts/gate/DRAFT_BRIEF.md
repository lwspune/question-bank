# Drafting one GATE CS paper (brief for a helper)

You draft ONE GATE Computer Science (CS) paper for a question bank: a clean transcription of
every question, your own BLIND answer, a classification and a worked solution. The main session
then compares your answers with the organising IIT's final key, settles every disagreement and
writes to the bank. You never write to the bank or touch git.

## Read ONLY these (`<paper>` is given in your task, e.g. `2026-cs1`)

- `C:/tmp/PYQPs/GATE/CS/work/<paper>/pages/p<NN>.png`: every page rendered. This is the
  question as printed; read it.
- `C:/tmp/PYQPs/GATE/CS/work/<paper>/text/p<NN>.txt`: the same page's text layer. Copy exact
  strings from it (code, numbers, long expressions), but check them against the page: the
  text layer loses superscripts, subscripts, fraction bars and symbols.
- `C:/tmp/PYQPs/GATE/CS/work/<paper>/anchors.json`: `{"<n>": [pageIndex, y]}`, where each
  question starts (pageIndex 0 = p01.png).
- `C:/tmp/PYQPs/GATE/CS/work/<paper>/cand/Q<nn>_<k>.png` and `figures.json`: the pictures
  embedded in the paper, each filed under the question it sits in (a draft; it can be wrong).

**Never open** `C:/tmp/PYQPs/GATE/CS/src/`, `C:/tmp/PYQPs/GATE/CS/work/keys/`, any file with
"key" in its name, anything under `scripts/gate/data/`, another paper's folders, or the web.
The answer key must stay unseen: your blind answers are how errors get caught.

## The paper

65 questions. Q1-10 are General Aptitude (GA), Q11-65 Computer Science. Your task lists which
numbers are MCQ (exactly one of A-D), MSQ (one OR MORE of A-D) and NAT (a number).

## Transcribe

- The stem as printed, without the "Q.12" label, page headers, footers, the organising
  institute's banner, or "Q.11 – Q.35 Carry ONE mark Each" section lines.
- Options: always four, labels A-D, text only (no "(A)").
- **Maths** in LaTeX inside `\( ... \)` (inline) or `\[ ... \]` (display): `\(O(n \log n)\)`,
  `\(2^{32}\)`, `\(\overline{A}B + C\)`. Plain words stay plain. Never unicode maths symbols
  (write `\(\leq\)`, not ≤).
- **Code, pseudocode and SQL** in a fenced block with the language: a line ```` ```c ````
  (or `sql`, or `text` for pseudocode), the code exactly as printed with its indentation in
  SPACES, then a line ```` ``` ````. Nothing inside a fence is LaTeX or markdown: `int *p;`
  stays as it is. Never single backticks for code inside a sentence (the bank already uses
  backticks as quote marks): write identifiers and calls as plain text, fork(), x++, malloc.
- **Tables** (a relation, a page table, a schedule) as a GFM pipe table with a `|---|---|`
  separator row. A table is text, never a figure.
- A passage or data shared by several questions: in each question's `context`.
- Keep the paper's wording and its own punctuation.

## Figures

Set `"figure": true` only when the question needs a picture that cannot be written as text or a
table: a circuit, an automaton, a tree or graph drawing, a timing diagram, a spatial puzzle.
- If the right picture is among `cand/`, name it in `figureFiles` (in reading order).
- If the picture is DRAWN on the page (vector lines, no file in `cand/`), give its place in
  `figureBox`: `{"page": <pageIndex>, "top": <0-1>, "bottom": <0-1>}` as fractions of the page
  height, a little generous; the main session cuts it.
- Options that are pictures: write each option's text as `[figure]` and include the option
  pictures in `figureFiles`.
- A candidate filed under the wrong question: say so in `notes`.

## Solve, blind

Every question, from the printed page alone. Work it fully; recheck any arithmetic. For an MSQ,
test EVERY option on its own. For a NAT, give the value to the precision the question asks.
Mark `confidence` honestly: low means you could not be sure.

## Write

`C:/tmp/PYQPs/GATE/CS/blind/<paper>/derived.json`, rewritten every ~10 questions so partial
work survives:

```json
{"paper": "2026-cs1", "questions": [
  {"n": 12, "type": "MSQ", "text": "...", "context": null,
   "options": [{"label": "A", "text": "..."}, {"label": "B", "text": "..."},
               {"label": "C", "text": "..."}, {"label": "D", "text": "..."}],
   "figure": false, "figureFiles": [], "figureBox": null,
   "answer": "A, C", "confidence": "high", "difficulty": "Moderate",
   "subject": "Operating System", "chapter": "Deadlock", "subtopic": "Banker's algorithm",
   "solution": "...", "notes": null}
]}
```

- `answer`: MCQ one letter; MSQ letters like "A, C"; NAT a plain number.
- `difficulty`: Easy | Moderate | Hard, for a GATE CS candidate.
- `subject` and `chapter`: ONE pair from this list, exactly as written.
  - [General Aptitude] Verbal Aptitude · Quantitative Aptitude · Analytical Aptitude · Spatial Aptitude
  - [Engineering Mathematics] Mathematical Logic · Sets, Relations, Functions and Groups ·
    Graph Theory · Combinatorics · Linear Algebra · Calculus · Probability and Statistics
  - [Digital Logic] Boolean Algebra and Minimization · Combinational Circuits · Sequential
    Circuits · Number Representations and Computer Arithmetic
  - [Computer Organization and Architecture] Machine Instructions and Addressing Modes · ALU,
    Data Path and Control Unit · Instruction Pipelining · Memory Hierarchy and Cache · I/O
    Interface, Interrupts and DMA
  - [Programming and Data Structures] Programming in C · Recursion · Arrays, Stacks, Queues and
    Linked Lists · Trees, Binary Search Trees and Heaps · Graphs
  - [Algorithms] Searching, Sorting and Hashing · Asymptotic Complexity · Greedy Algorithms ·
    Dynamic Programming · Divide and Conquer · Graph Traversals, Spanning Trees and Shortest Paths
  - [Theory of Computation] Regular Expressions and Finite Automata · Context-free Grammars and
    Pushdown Automata · Regular and Context-free Languages · Turing Machines and Undecidability
  - [Compiler Design] Lexical Analysis · Parsing · Syntax-directed Translation · Runtime
    Environments · Intermediate Code Generation · Code Optimisation and Data Flow Analysis
  - [Operating System] System Calls, Processes and Threads · Concurrency and Synchronization ·
    Deadlock · CPU and I/O Scheduling · Memory Management and Virtual Memory · File Systems
  - [Databases] ER Model · Relational Algebra, Tuple Calculus and SQL · Integrity Constraints and
    Normal Forms · File Organization and Indexing · Transactions and Concurrency Control
  - [Computer Networks] Layering, OSI and TCP/IP · Switching · Data Link Layer and MAC · Routing ·
    IP Addressing, Fragmentation and Support Protocols · Transport Layer, TCP and UDP ·
    Application Layer Protocols
- `subtopic`: a short standard name for the technique, 1-4 words ("Cache mapping", "Pipeline
  hazards", "Minimum spanning tree", "Syllogism").
- `solution`: the working a student needs to get there, in short steps, from the question's own
  numbers. Say WHY each MSQ option is right or wrong. Maths in `\( \)`, code in fences. **No em dashes or spaced dashes** (use full stops, commas, colons). Never mention a
  key, a source, or how the answer was found: only the working.
- `notes`: anything the main session must know (a defect as printed, an ambiguous figure, a
  candidate on the wrong question), else null.

Keep tool output small: never print whole files back; open page images one at a time.

**Your scratch files** go ONLY under `C:/tmp/PYQPs/GATE/CS/blind/<paper>/tmp/`. Several helpers
run at once: never read, write or run anything under another paper's folders.
When done, reply with ONLY: how many questions, the low-confidence numbers, and any `notes`.
