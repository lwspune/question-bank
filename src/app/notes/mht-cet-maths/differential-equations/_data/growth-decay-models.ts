import type { SubtopicNote } from "@/app/notes/_types";

export const GROWTH_DECAY_MODELS_NOTE: SubtopicNote = {
  subtopicName: "Growth, Decay, and Continuous Models",
  title: "Growth, Decay, and Continuous Models",
  oneLineDefinition:
    "When a quantity changes at a rate proportional to itself, it grows or decays exponentially. Set up dP/dt = kP, solve to P = P0 e^{kt}, fix k from two data points, and answer — the recurring MHT-CET application of differential equations.",
  whyItMatters:
    "This is the single densest applied subtopic in the chapter: 33 PYQs sit here (10 HARD, 17 MODERATE, 6 EASY), and MHT-CET repeats the same handful of stories — bacteria/population growth, radioactive/half-life decay, continuous bank compounding, moisture loss, and the special square-root and surface-area rate models — almost verbatim across years. " +
    "Master one clean template (write the rate law, separate, integrate, fix the constant, fix k from a second data point) and you can answer every one. The traps are all in the setup: k is negative for decay, 'doubles' means P/P0 = 2 (not +2), and a percentage rate must become a decimal.",
  concepts: [
    // 1 — the modelling step (foundation, no PYQ)
    {
      kind: "formula" as const,
      slug: "cetde-modelling-rate",
      name: "The Modelling Step — Rate Proportional to Quantity",
      intuition:
        "Almost every word problem in this subtopic hides the same sentence: 'the rate of change is proportional to the amount present.' Translate that one phrase into an equation — rate means dP/dt, proportional to the amount means kP — and the differential equation writes itself. This first step is where the marks are won or lost.",
      definition:
        "The phrase **'rate of change of P is proportional to P'** translates directly to\n" +
        "\\[\\dfrac{dP}{dt} = kP.\\]\n" +
        "- \\(k > 0\\) gives **growth** (population, bacteria, invested principal).\n" +
        "- \\(k < 0\\) gives **decay** (radioactivity, moisture loss, cooling) — write it as \\(\\dfrac{dP}{dt} = -kP\\) with \\(k>0\\) to keep signs honest.\n" +
        "This is a separable, first-order, first-degree equation. Separate the variables and integrate: \\(\\displaystyle\\int\\dfrac{dP}{P} = \\int k\\,dt\\), giving \\(\\log P = kt + c\\).",
      formula: {
        label: "Rate proportional to quantity",
        latex: "\\dfrac{dP}{dt} = kP \\quad\\Longrightarrow\\quad \\log P = kt + c",
        symbols: [
          { symbol: "P", meaning: "the changing quantity (mass, population, amount)" },
          { symbol: "k", meaning: "proportionality constant — positive for growth, negative for decay" },
          { symbol: "t", meaning: "time" },
        ],
      },
      authoredExample: {
        prompt:
          "Translate into a differential equation: 'a colony grows at a rate proportional to its size P', and separate the variables ready to integrate.",
        steps: [
          "'Rate' is \\(\\dfrac{dP}{dt}\\); 'proportional to its size' is \\(kP\\). So \\(\\dfrac{dP}{dt} = kP\\).",
          "Separate: \\(\\dfrac{dP}{P} = k\\,dt\\).",
          "Integrate both sides: \\(\\displaystyle\\int\\dfrac{dP}{P} = \\int k\\,dt \\Rightarrow \\log P = kt + c\\).",
        ],
        answer: "\\(\\dfrac{dP}{dt} = kP\\), which integrates to \\(\\log P = kt + c\\).",
      },
      selfCheckExample: {
        prompt:
          "A substance loses mass at a rate proportional to the mass present. Write the differential equation and integrate it.",
        steps: [
          "Loss ⇒ decay, so \\(\\dfrac{dm}{dt} = -km\\) with \\(k>0\\).",
          "Separate and integrate: \\(\\displaystyle\\int\\dfrac{dm}{m} = -\\int k\\,dt \\Rightarrow \\log m = -kt + c\\).",
        ],
        answer: "\\(\\dfrac{dm}{dt} = -km \\Rightarrow \\log m = -kt + c\\).",
      },
      practiceSet: [
        { prompt: "Model: 'population grows proportional to itself'.", answer: "\\(\\dfrac{dP}{dt} = kP\\)", method: "rate \\(=\\) proportional \\(\\times\\) amount" },
        { prompt: "Model: 'radioactive mass decays proportional to mass'.", answer: "\\(\\dfrac{dm}{dt} = -km\\)", method: "decay ⇒ negative sign" },
        { prompt: "Separate \\(\\dfrac{dP}{dt}=kP\\).", answer: "\\(\\dfrac{dP}{P}=k\\,dt\\)", method: "divide by \\(P\\)" },
        { prompt: "Integrate \\(\\dfrac{dP}{P}=k\\,dt\\).", answer: "\\(\\log P = kt + c\\)", method: "standard integral of \\(1/P\\)" },
      ],
      traps: [
        {
          title: "Decay carries a negative sign",
          body:
            "'Rate of reduction / decay / loss' means \\(\\dfrac{dP}{dt} = -kP\\), not \\(+kP\\). Dropping the minus makes the quantity grow — the answer then heads the wrong way. Keep \\(k>0\\) and put the sign in front explicitly.",
        },
        {
          title: "'Proportional to' is not 'equal to'",
          body:
            "'Rate proportional to P' introduces a constant \\(k\\); it is \\(\\dfrac{dP}{dt}=kP\\), not \\(\\dfrac{dP}{dt}=P\\). You must determine \\(k\\) later from a data point — never assume \\(k=1\\).",
        },
      ],
    },

    // 2 — exponential growth/decay solution, find k from two points
    {
      kind: "formula" as const,
      slug: "cetde-exponential-solution",
      name: "The Exponential Solution P = P0 e^{kt} and Finding k",
      visualizationSlug: "defeq-growth-decay",
      intuition:
        "Once you have dP/dt = kP, the answer is always the same shape: P starts at P0 and multiplies by e^{kt}. To pin the curve down you need TWO facts — the starting value gives P0, and a second (time, value) pair gives k. Everything after that is substitution.",
      definition:
        "Solving \\(\\dfrac{dP}{dt} = kP\\) with \\(P(0)=P_0\\) gives the master formula:\n" +
        "\\[P = P_0\\,e^{kt}.\\]\n" +
        "**Recipe:**\n" +
        "- The initial value fixes \\(P_0\\).\n" +
        "- A second data point \\((t_1, P_1)\\) fixes \\(k\\): \\(\\dfrac{P_1}{P_0} = e^{kt_1} \\Rightarrow k = \\dfrac{1}{t_1}\\log\\dfrac{P_1}{P_0}\\).\n" +
        "- Often you never need \\(k\\) alone — dividing two instances of \\(P_0 e^{kt}\\) cancels \\(P_0\\), and the ratio form \\(\\dfrac{P_2}{P_1}=e^{k(t_2-t_1)}\\) does all the work.",
      formula: {
        label: "Exponential growth/decay solution",
        latex: "P = P_0\\,e^{kt}, \\qquad k = \\dfrac{1}{t_1}\\log\\!\\dfrac{P_1}{P_0}",
        symbols: [
          { symbol: "P_0", meaning: "value at \\(t=0\\)" },
          { symbol: "k", meaning: "rate constant, found from a second data point" },
        ],
      },
      authoredExample: {
        prompt:
          "A quantity follows \\(\\dfrac{dP}{dt}=kP\\). It is 500 at \\(t=0\\) and 1500 at \\(t=4\\). Find \\(P\\) at \\(t=8\\).",
        steps: [
          "General solution: \\(P = 500\\,e^{kt}\\).",
          "At \\(t=4\\): \\(1500 = 500\\,e^{4k} \\Rightarrow e^{4k} = 3\\).",
          "At \\(t=8\\): \\(P = 500\\,e^{8k} = 500\\,(e^{4k})^2 = 500\\cdot 3^2 = 4500\\).",
        ],
        answer: "\\(P(8) = 4500\\)",
      },
      selfCheckExample: {
        prompt:
          "The population of a town increases proportionally to itself, from 40,000 to 80,000 in 40 years. Find the population after another 40 years.",
        steps: [
          "\\(P = 40000\\,e^{kt}\\). At \\(t=40\\): \\(80000 = 40000\\,e^{40k} \\Rightarrow e^{40k}=2\\).",
          "Another 40 years means \\(t=80\\): \\(P = 40000\\,e^{80k} = 40000\\,(e^{40k})^2 = 40000\\cdot 4\\).",
          "So \\(P = 160000\\).",
        ],
        answer: "\\(160000\\)",
      },
      practiceSet: [
        { prompt: "\\(P = P_0 e^{kt}\\), \\(P_0=10\\), \\(e^{5k}=2\\). Find \\(P\\) at \\(t=15\\).", answer: "\\(80\\)", method: "\\(10\\cdot 2^3\\)" },
        { prompt: "\\(e^{2k}=\\tfrac32\\). Value of \\(e^{4k}\\)?", answer: "\\(\\tfrac94\\)", method: "\\((e^{2k})^2\\)" },
        { prompt: "\\(P_0=4\\) lakh grows to 6 lakh in 20 yr. \\(e^{20k}=\\)?", answer: "\\(\\tfrac32\\)", method: "ratio \\(6/4\\)" },
        { prompt: "Solve \\(\\dfrac{dy}{dx}=y\\), \\(y(0)=3\\). Find \\(y(\\log 2)\\).", answer: "\\(6\\)", method: "\\(y=3e^x\\), \\(e^{\\log 2}=2\\)" },
      ],
      pyqExampleId: "43b750b3-824f-4538-9394-4821862c168c",
      traps: [
        {
          title: "Cancel \\(P_0\\) by dividing — don't solve for k first",
          body:
            "For 'grows from A to B in time \\(T\\), find value after another \\(T\\)', you never need \\(k\\) or \\(P_0\\) numerically. \\(e^{kT} = B/A\\), and after \\(2T\\) the value is \\(A(B/A)^2\\). Chasing \\(k = \\tfrac1T\\log(B/A)\\) and re-exponentiating wastes time and invites arithmetic slips.",
        },
        {
          title: "The extra time is measured from the start",
          body:
            "'In ANOTHER 40 years' when the first stage was already 40 years means the total elapsed time is \\(t=80\\), so \\(P=P_0 e^{80k}\\). Reading it as \\(t=40\\) again halves the exponent and drops a doubling.",
        },
      ],
    },

    // 3 — population / bacteria doubling and percentage-increase
    {
      kind: "formula" as const,
      slug: "cetde-population-doubling",
      name: "Population and Bacteria — Doubling Time and Percentage Growth",
      intuition:
        "Bacteria and population problems are pure exponential growth with a story. If the quantity DOUBLES every fixed period, you can skip calculus and just count doublings; if it grows by a PERCENTAGE, convert the percent to a multiplying factor (1 + rate) first. Both reduce to P = P0 e^{kt}.",
      definition:
        "For growth \\(P = P_0 e^{kt}\\):\n" +
        "- **Doubling in period \\(T\\):** \\(e^{kT}=2\\). After \\(n\\) such periods \\((t=nT)\\), \\(P = P_0\\cdot 2^{n}\\). No logs needed when \\(t\\) is a whole multiple of \\(T\\).\n" +
        "- **Percentage increase:** 'increases by \\(p\\%\\) in time \\(T\\)' means \\(\\dfrac{P(T)}{P_0} = 1 + \\dfrac{p}{100}\\). A 20% rise is a factor \\(\\tfrac65\\); a 10% rise is \\(\\tfrac{11}{10}\\). Then \\(e^{kT} = 1+\\tfrac{p}{100}\\) fixes \\(k\\).\n" +
        "- **Finding the start \\(P_0\\):** given two later readings, divide to get \\(k\\), then back-substitute one reading to recover \\(P_0\\).",
      formula: {
        label: "Doubling growth",
        latex: "e^{kT} = 2 \\quad\\Longrightarrow\\quad P = P_0\\,2^{\\,t/T}",
        symbols: [
          { symbol: "T", meaning: "doubling time" },
          { symbol: "t/T", meaning: "number of doubling periods elapsed" },
        ],
      },
      authoredExample: {
        prompt:
          "Bacteria grow proportionally to their number and double every 8 hours. If the original number is \\(N\\), how many are present after 24 hours?",
        steps: [
          "Doubling time \\(T=8\\) h. In 24 hours there are \\(24/8 = 3\\) doubling periods.",
          "Each period multiplies by 2: \\(N \\cdot 2^3 = 8N\\).",
        ],
        answer: "\\(8N\\)",
      },
      selfCheckExample: {
        prompt:
          "A culture starts at 1000 bacteria and rises 20% in 2 hours. When does it reach 2000?",
        steps: [
          "\\(N = 1000\\,e^{kt}\\). A 20% rise gives \\(e^{2k} = \\tfrac{120}{100} = \\tfrac65\\), so \\(2k = \\log\\tfrac65\\).",
          "For \\(N = 2000\\): \\(e^{kt} = 2 \\Rightarrow kt = \\log 2\\).",
          "Divide: \\(t = \\dfrac{\\log 2}{k} = \\dfrac{2\\log 2}{\\log\\frac65}\\) hours.",
        ],
        answer: "\\(t = \\dfrac{2\\log 2}{\\log\\frac65}\\) hours.",
      },
      practiceSet: [
        { prompt: "Doubles every 5 h. Factor after 20 h?", answer: "\\(16\\)", method: "\\(2^{20/5}=2^4\\)" },
        { prompt: "Convert 'rises 25%' to a growth factor.", answer: "\\(\\tfrac54\\)", method: "\\(1+\\tfrac{25}{100}\\)" },
        { prompt: "\\(N=N_0 e^{kt}\\): \\(10^4\\) at \\(t=3\\), \\(4\\cdot10^4\\) at \\(t=5\\). Find \\(k\\).", answer: "\\(\\log 2\\)", method: "\\(e^{2k}=4\\)" },
        { prompt: "Same data: find \\(N_0\\).", answer: "\\(\\tfrac{10^4}{8}\\)", method: "\\(10^4 = N_0 e^{3\\log 2}=8N_0\\)" },
      ],
      pyqExampleId: "00a7dbd6-1cab-43a6-9de3-910b5b55dcf7",
      traps: [
        {
          title: "'Doubles' means the ratio is 2, not '+2'",
          body:
            "'The population doubles' sets \\(\\dfrac{P}{P_0}=2\\) (so \\(e^{kT}=2\\)) — it does not mean \\(P = P_0 + 2\\). Similarly 'triples' is a factor 3. Always translate the word into a multiplying ratio.",
        },
        {
          title: "Turn a percentage into a factor before touching k",
          body:
            "A '20% increase' is a factor of \\(\\tfrac65\\) (i.e. \\(1.2\\)), NOT \\(0.20\\). Write \\(e^{kT} = 1 + \\tfrac{p}{100}\\); using \\(0.20\\) instead of \\(1.20\\) corrupts \\(k\\) and every later value.",
        },
      ],
    },

    // 4 — radioactive decay & half-life
    {
      kind: "formula" as const,
      slug: "cetde-radioactive-halflife",
      name: "Radioactive Decay and Half-Life",
      intuition:
        "Radioactivity is exponential decay: mass falls at a rate proportional to itself. The half-life h is the time to lose half the mass, so it plays exactly the role a doubling time plays for growth — after n half-lives, only (1/2)^n of the mass survives. The rate constant is k = log 2 / h.",
      definition:
        "Decay model \\(\\dfrac{dm}{dt} = -km\\) with solution \\(m = m_0 e^{-kt}\\).\n" +
        "- **Half-life link:** at \\(t=h\\), \\(m = \\tfrac{m_0}{2}\\), so \\(e^{-kh}=\\tfrac12 \\Rightarrow k = \\dfrac{\\log 2}{h}\\).\n" +
        "- **After \\(n\\) half-lives** \\((t = nh)\\): \\(m = m_0\\left(\\tfrac12\\right)^{n}\\). Just count half-lives when \\(t\\) is a whole multiple of \\(h\\).\n" +
        "- **Initial decay rate:** \\(\\left.\\dfrac{dm}{dt}\\right|_{t=0} = -km_0 = -\\dfrac{m_0\\log 2}{h}\\) — negative because mass is falling.",
      formula: {
        label: "Half-life rate constant",
        latex: "k = \\dfrac{\\log 2}{h}, \\qquad m = m_0\\left(\\tfrac12\\right)^{t/h}",
        symbols: [
          { symbol: "h", meaning: "half-life — time to lose half the mass" },
          { symbol: "m_0", meaning: "initial mass at \\(t=0\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A radioactive sample has half-life 5 years and initial mass 64 g. How much is left after 15 years?",
        steps: [
          "Number of half-lives: \\(15/5 = 3\\).",
          "Each half-life halves the mass: \\(64 \\to 32 \\to 16 \\to 8\\) g.",
          "Equivalently \\(m = 64\\left(\\tfrac12\\right)^3 = 8\\) g.",
        ],
        answer: "\\(8\\) g",
      },
      selfCheckExample: {
        prompt:
          "A substance of half-life \\(h\\) days and initial mass \\(m_0\\) has what initial decay rate?",
        steps: [
          "Model: \\(\\dfrac{dm}{dt} = -km\\), and \\(k = \\dfrac{\\log 2}{h}\\).",
          "At \\(t=0\\), \\(m=m_0\\): \\(\\left.\\dfrac{dm}{dt}\\right|_{0} = -km_0 = -\\dfrac{m_0\\log 2}{h}\\).",
        ],
        answer: "\\(-\\dfrac{m_0}{h}\\log 2\\)",
      },
      practiceSet: [
        { prompt: "Half-life 1600 yr, start 60 g. Amount after 3200 yr?", answer: "\\(15\\) g", method: "2 half-lives: \\(60/4\\)" },
        { prompt: "Half-life 15 min. Fraction left after 30 min?", answer: "\\(\\tfrac14\\)", method: "\\((\\tfrac12)^2\\)" },
        { prompt: "Rate constant for half-life \\(h\\)?", answer: "\\(\\dfrac{\\log 2}{h}\\)", method: "\\(e^{-kh}=\\tfrac12\\)" },
        { prompt: "27 g decays to 8 g in 3 h. \\(m\\) after 1 more hour?", answer: "\\(\\tfrac{16}{3}\\) g", method: "\\(e^{-k}=\\tfrac23\\); \\(8\\cdot\\tfrac23\\)" },
      ],
      pyqExampleId: "eea54ba9-bbd9-4b45-a2e3-c2b3b52cf196",
      traps: [
        {
          title: "The initial decay rate is negative",
          body:
            "Because mass decreases, \\(\\dfrac{dm}{dt}=-km_0 = -\\dfrac{m_0\\log 2}{h}\\) carries a MINUS sign. The positive-looking distractor \\(\\dfrac{m_0}{h}\\log 2\\) is the classic trap — decay rates are negative.",
        },
        {
          title: "Count half-lives only when time is a whole multiple",
          body:
            "The shortcut \\(m = m_0(\\tfrac12)^{t/h}\\) is easiest when \\(t/h\\) is an integer (3 half-lives, etc.). If \\(t\\) is not a clean multiple (e.g. 27 g → 8 g in 3 h, then 1 more hour), fall back to \\(m = m_0 e^{-kt}\\) with \\(e^{-k}\\) found from the given step.",
        },
      ],
    },

    // 5 — continuous compounding
    {
      kind: "formula" as const,
      slug: "cetde-continuous-compounding",
      name: "Continuous Compounding of Money",
      intuition:
        "When a principal grows 'continuously' at rate r, it obeys the same growth law as a population — dA/dt = rA — so A = P e^{rt}. The only new wrinkle is that the rate is quoted as a percentage per year and must be written as a decimal (10% ⇒ r = 0.1).",
      definition:
        "Continuous growth of a principal:\n" +
        "\\[\\dfrac{dA}{dt} = rA \\quad\\Longrightarrow\\quad A = P\\,e^{rt},\\]\n" +
        "where \\(P\\) is the amount invested at \\(t=0\\) and \\(r\\) is the annual rate written as a **decimal**.\n" +
        "- 'Doubles in \\(T\\) years' gives \\(e^{rT}=2\\), so \\(rT = \\log 2\\) — used to find either \\(r\\) or a doubling-based amount.\n" +
        "- 'Rate \\(x\\%\\), doubles in \\(T\\)': \\(\\dfrac{x}{100}\\cdot T = \\log 2 \\Rightarrow x = \\dfrac{100\\log 2}{T}\\).",
      formula: {
        label: "Continuous compounding",
        latex: "A = P\\,e^{rt}, \\qquad e^{rT} = 2 \\text{ if the principal doubles in } T",
        symbols: [
          { symbol: "P", meaning: "principal invested at \\(t=0\\)" },
          { symbol: "r", meaning: "annual rate as a decimal (\\(x\\% \\to x/100\\))" },
        ],
      },
      authoredExample: {
        prompt:
          "₹2000 is invested at 10% per year compounded continuously. What is the amount after 5 years? (\\(e^{0.5}=1.648\\))",
        steps: [
          "\\(A = P e^{rt}\\) with \\(P=2000\\), \\(r = 0.10\\), \\(t=5\\).",
          "\\(rt = 0.10\\times 5 = 0.5\\), so \\(A = 2000\\,e^{0.5} = 2000\\times 1.648\\).",
          "\\(A = 3296\\).",
        ],
        answer: "₹3296",
      },
      selfCheckExample: {
        prompt:
          "The principal doubles in 10 years under continuous compounding. Find the rate \\(x\\%\\). (\\(\\log 2 = 0.6931\\))",
        steps: [
          "\\(A = P e^{rt}\\); doubling in 10 years: \\(e^{10r} = 2 \\Rightarrow 10r = \\log 2\\).",
          "With \\(r = x/100\\): \\(\\dfrac{x}{100}\\cdot 10 = 0.6931 \\Rightarrow \\dfrac{x}{10} = 0.6931\\).",
          "\\(x = 6.931 \\approx 6.93\\%\\).",
        ],
        answer: "\\(x \\approx 6.93\\%\\)",
      },
      practiceSet: [
        { prompt: "\\(P=200\\), doubles to 400 in 6 yr. \\(A\\) at 33 yr?", answer: "\\(6400\\sqrt 2\\)", method: "\\(200\\cdot 2^{33/6}=200\\cdot 2^{5.5}\\)" },
        { prompt: "Write 8% per year as \\(r\\).", answer: "\\(0.08\\)", method: "divide by 100" },
        { prompt: "Doubles in 20 yr. Rate \\(x\\%\\)? (\\(\\log 2=0.693\\))", answer: "\\(3.47\\%\\)", method: "\\(x = \\tfrac{100\\log 2}{20}\\)" },
        { prompt: "\\(A = P e^{rt}\\): \\(e^{6r}=2\\). \\(A/P\\) at \\(t=12\\)?", answer: "\\(4\\)", method: "\\((e^{6r})^2\\)" },
      ],
      pyqExampleId: "7796a96d-07ba-4d58-b329-d5e314612acd",
      traps: [
        {
          title: "Convert the % rate to a decimal",
          body:
            "10% per year is \\(r = 0.10\\), not \\(r = 10\\). Using 10 blows the exponent up by a factor of 100. Write \\(r = x/100\\) every time.",
        },
        {
          title: "Continuous compounding uses \\(e^{rt}\\), not \\((1+r)^t\\)",
          body:
            "The word 'continuously' means \\(A = Pe^{rt}\\). Reaching for the annual-compound formula \\(A = P(1+r)^t\\) or simple interest is the intended distractor — it gives a different (wrong) number.",
        },
      ],
    },

    // 6 — moisture loss / general exponential decay + dP/dt = 0.5P - 450 mixed model
    {
      kind: "formula" as const,
      slug: "cetde-general-decay-mixed",
      name: "Moisture Loss and General First-Order Rate Models",
      intuition:
        "Moisture-loss problems are ordinary exponential decay dressed as a story: 'loses half in the first hour' fixes the rate exactly like a half-life. A slightly harder cousin adds a constant term — dP/dt = kP − c — which is still separable but needs a substitution before you integrate.",
      definition:
        "**Pure proportional loss** (moisture, cooling of the simplest kind): \\(\\dfrac{dP}{dt} = -kP \\Rightarrow \\log\\dfrac{P}{N} = -kt\\). 'Loses half in the first hour' gives \\(k = \\log 2\\); then solve for the time to lose any fraction.\n" +
        "**Mixed model with a constant** \\(\\dfrac{dP}{dt} = kP - c\\): rewrite as \\(\\dfrac{dP}{kP - c} = dt\\) and integrate to \\(\\dfrac1k\\log|kP - c| = t + C\\). Fix \\(C\\) from \\(P(0)\\), then substitute the target \\(P\\). (For \\(\\dfrac{dP}{dt}=0.5P-450\\), \\(kP-c = 0.5(P-900)\\), so \\(2\\log|P-900| = t + C\\).)",
      formula: {
        label: "Fraction-lost time (pure decay)",
        latex: "\\log\\dfrac{P}{N} = -kt, \\qquad k = \\log 2 \\text{ if half is lost in unit time}",
        symbols: [
          { symbol: "N", meaning: "initial content at \\(t=0\\)" },
          { symbol: "P/N", meaning: "fraction remaining" },
        ],
      },
      authoredExample: {
        prompt:
          "A wet sheet loses half its moisture in the first hour, at a rate proportional to the moisture present. In how many hours is 99% lost?",
        steps: [
          "\\(\\dfrac{dP}{dt} = -kP \\Rightarrow \\log\\dfrac{P}{N} = -kt\\). Half lost in 1 hour: \\(\\log\\tfrac12 = -k \\Rightarrow k = \\log 2\\).",
          "99% lost means \\(P = 0.01N\\), i.e. \\(\\dfrac{P}{N} = \\tfrac{1}{100}\\).",
          "\\(\\log\\tfrac{1}{100} = -kt \\Rightarrow t = \\dfrac{\\log 100}{k} = \\dfrac{2\\log 10}{\\log 2}\\).",
        ],
        answer: "\\(t = \\dfrac{2\\log 10}{\\log 2}\\) hours.",
      },
      selfCheckExample: {
        prompt:
          "Solve \\(\\dfrac{dP}{dt} = 0.5P - 450\\) with \\(P(0) = 850\\), and find the time when \\(P = 0\\).",
        steps: [
          "Factor: \\(0.5P - 450 = 0.5(P - 900)\\). Separate: \\(\\dfrac{dP}{P-900} = 0.5\\,dt\\).",
          "Integrate: \\(\\log|P-900| = 0.5t + c_1\\), i.e. \\(2\\log|P-900| = t + C\\).",
          "At \\(t=0,\\ P=850\\): \\(C = 2\\log 50\\). Set \\(P=0\\): \\(2\\log 900 = t + 2\\log 50\\).",
          "\\(t = 2\\log\\dfrac{900}{50} = 2\\log 18\\).",
        ],
        answer: "\\(t = 2\\log 18\\)",
      },
      practiceSet: [
        { prompt: "Loses half in 1 h. Time to lose 90%?", answer: "\\(\\log_2 10\\) h", method: "\\(P/N=\\tfrac1{10}\\), \\(k=\\log 2\\)" },
        { prompt: "\\(k\\) if half is lost per hour.", answer: "\\(\\log 2\\)", method: "\\(\\log\\tfrac12 = -k\\)" },
        { prompt: "Factor \\(0.5P - 450\\).", answer: "\\(0.5(P-900)\\)", method: "take out \\(0.5\\)" },
        { prompt: "Integrate \\(\\dfrac{dP}{P-900}=0.5\\,dt\\).", answer: "\\(2\\log|P-900| = t + C\\)", method: "log integral" },
      ],
      pyqExampleId: "54262d7f-9e6c-46a8-b30a-d063ae5e5d77",
      traps: [
        {
          title: "'99% lost' means the fraction LEFT is 0.01",
          body:
            "Losing 99% leaves 1%: use \\(P/N = 0.01\\), giving \\(\\log 100\\) on top. Plugging in 0.99 (the fraction lost) instead of 0.01 (the fraction remaining) inverts the ratio and the answer.",
        },
        {
          title: "The constant term needs factoring before you separate",
          body:
            "\\(\\dfrac{dP}{dt}=0.5P-450\\) is NOT \\(\\dfrac{dP}{P}=0.5\\,dt\\). Factor to \\(0.5(P-900)\\) first, so the variable that integrates cleanly is \\(P-900\\), not \\(P\\).",
        },
      ],
    },

    // 7 — special-rate models: dx/dt = -k sqrt(x) and dr/dt = -k
    {
      kind: "formula" as const,
      slug: "cetde-special-rate-models",
      name: "Special-Rate Models — Square-Root and Surface-Area Decay",
      intuition:
        "Two recurring non-standard rate laws break the 'proportional to itself' mould. Assets/tanks that change at a rate proportional to the SQUARE ROOT of the amount give dx/dt = −k√x, which integrates to 2√x = −kt + c (a straight line in √x). A raindrop evaporating proportionally to its SURFACE AREA collapses, after using V and S, to the simple linear dr/dt = −k.",
      definition:
        "**Square-root rate** (assets shrinking, tank draining): \\(\\dfrac{dx}{dt} = -k\\sqrt{x}\\). Separate \\(\\dfrac{dx}{\\sqrt x} = -k\\,dt\\) and integrate:\n" +
        "\\[2\\sqrt{x} = -kt + c.\\]\n" +
        "Fix \\(c\\) from \\(x(0)\\), fix \\(k\\) from a second reading, then set \\(x=0\\) for 'empties / bankrupt'.\n" +
        "**Surface-area rate** (spherical raindrop evaporating): \\(\\dfrac{dV}{dt} = -kS\\). With \\(V = \\tfrac43\\pi r^3,\\ S = 4\\pi r^2\\), the \\(4\\pi r^2\\) cancels and it reduces to \\(\\dfrac{dr}{dt} = -k\\), so **the radius falls linearly**: \\(r = -kt + c\\).",
      formula: {
        label: "Square-root and surface-area models",
        latex: "\\dfrac{dx}{dt} = -k\\sqrt{x} \\Rightarrow 2\\sqrt{x} = -kt + c; \\qquad \\dfrac{dV}{dt} = -kS \\Rightarrow \\dfrac{dr}{dt} = -k",
        symbols: [
          { symbol: "2\\sqrt{x} = -kt+c", meaning: "the integrated square-root law — linear in \\(\\sqrt{x}\\)" },
          { symbol: "dr/dt = -k", meaning: "surface-area evaporation ⇒ radius shrinks at a constant rate" },
        ],
      },
      authoredExample: {
        prompt:
          "A person's assets fall at a rate proportional to \\(\\sqrt{\\text{assets}}\\). They drop from ₹25 lakh to ₹6.25 lakh in 2 years. When is he bankrupt?",
        steps: [
          "\\(\\dfrac{dx}{dt} = -k\\sqrt x \\Rightarrow 2\\sqrt x = -kt + c\\).",
          "At \\(t=0,\\ x=25\\): \\(2\\cdot 5 = c \\Rightarrow c = 10\\).",
          "At \\(t=2,\\ x=6.25\\): \\(2\\cdot 2.5 = -2k + 10 \\Rightarrow 5 = -2k+10 \\Rightarrow k = \\tfrac52\\).",
          "Bankrupt when \\(x=0\\): \\(0 = -\\tfrac52 T + 10 \\Rightarrow T = 4\\) years.",
        ],
        answer: "\\(T = 4\\) years",
      },
      selfCheckExample: {
        prompt:
          "Water drains from a tank at a rate proportional to \\(\\sqrt{\\text{depth}}\\). Depth is 16 m at \\(t=0\\) and 4 m at \\(t=2\\) h. Find the depth at \\(t=3.5\\) h.",
        steps: [
          "\\(-\\dfrac{dy}{dt} = k\\sqrt y \\Rightarrow -2\\sqrt y = kt + C\\).",
          "At \\(t=0,\\ y=16\\): \\(-2\\cdot 4 = C \\Rightarrow C = -8\\). At \\(t=2,\\ y=4\\): \\(-2\\cdot 2 = 2k - 8 \\Rightarrow k = 2\\).",
          "At \\(t=3.5\\): \\(-2\\sqrt y = 2(3.5) - 8 = -1 \\Rightarrow \\sqrt y = 0.5 \\Rightarrow y = 0.25\\) m.",
        ],
        answer: "\\(y = 0.25\\) m",
      },
      practiceSet: [
        { prompt: "Integrate \\(\\dfrac{dx}{dt}=-k\\sqrt x\\).", answer: "\\(2\\sqrt x = -kt + c\\)", method: "\\(\\int x^{-1/2}dx = 2\\sqrt x\\)" },
        { prompt: "Assets 10 lakh → 10000 in 3 yr (\\(\\sqrt{}\\) rate). Bankrupt when?", answer: "\\(\\tfrac{10}{3}\\) yr", method: "\\(c=2000,k=600,\\ T=2000/600\\)" },
        { prompt: "Raindrop, \\(dV/dt \\propto S\\). What law does \\(r\\) obey?", answer: "\\(\\dfrac{dr}{dt}=-k\\) (linear)", method: "\\(4\\pi r^2\\) cancels" },
        { prompt: "Raindrop \\(r=3\\) at \\(t=0\\), \\(r=2\\) at \\(t=1\\). \\(r(t)\\)?", answer: "\\(r = 3 - t\\)", method: "\\(r=-kt+c\\), \\(c=3,k=1\\)" },
      ],
      pyqExampleId: "59a5e1bd-a630-46ca-942a-88211f9178a6",
      traps: [
        {
          title: "\\(\\int \\dfrac{dx}{\\sqrt x} = 2\\sqrt x\\), not \\(\\log\\sqrt x\\)",
          body:
            "The square-root rate separates to \\(x^{-1/2}\\,dx\\), whose integral is \\(2\\sqrt x\\) — a power-rule integral, NOT a logarithm. Reflexively writing \\(\\log\\) (as for \\(dx/dt = -kx\\)) is the number-one error in these problems.",
        },
        {
          title: "Surface-area evaporation makes the RADIUS linear",
          body:
            "For a raindrop, 'proportional to surface area' plus \\(V=\\tfrac43\\pi r^3\\) forces \\(\\dfrac{dr}{dt}=-k\\), so \\(r = c - kt\\) is linear in \\(t\\). Trying to make the volume or radius exponential misses the cancellation of \\(4\\pi r^2\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Differential Equations — Variable-separable equations",
      href: "/notes/mht-cet-maths/differential-equations/variable-separable",
    },
    {
      label: "Differential Equations — Newton's law of cooling",
      href: "/notes/mht-cet-maths/differential-equations/newtons-law-cooling",
    },
  ],
};
