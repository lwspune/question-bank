import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_EM_CHARGE_NOTE: SubtopicNote = {
  subtopicName: "Charge and Current",
  title: "Charge and Current",
  oneLineDefinition:
    "Static charge and what conducts it, the energy a charge gains across a potential difference, and how a cell drives a current that an ammeter measures.",
  whyItMatters:
    "Seven CDS questions from 2017 (II) to 2026 (I), five of them MODERATE. Two send an electron and a proton through the same voltage, two are about static charge on an aircraft and in a Van de Graaff generator, and three ask what conducts, what an ammeter measures and what emf means.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphem-static",
      name: "Static charge, conductors and insulators",
      intuition:
        "Rub two different materials together and electrons move from one to the other, so one ends up negative and the other positive. In a conductor the charge can flow away; in an insulator it stays where it was put. That is why a rubbed plastic comb picks up bits of paper, and why a body that collects charge needs a conducting path to the earth to lose it.",
      definition:
        "What to know:\n" +
        "- **Conductors** let charge flow: metals, the human body, tap water, the earth. **Insulators** hold it: plastic, rubber, glass, dry wood.\n" +
        "- **Distilled water** conducts very poorly because it has almost no dissolved ions. Salts dissolved in tap water or sweat make it conduct.\n" +
        "- Rubbing (friction) is what charges a body: a comb on hair, an aircraft against the air in flight.\n" +
        "- **Earthing** gives charge a path to the ground. An aircraft's slightly conducting tyres let its charge flow away when it lands; a lightning conductor does the same for a building.\n" +
        "- A **Van de Graaff generator** carries charge on a moving belt to a hollow metal dome and builds up a very high voltage (millions of volts) while giving only a tiny current.",
      table: {
        columns: ["Material or device", "What to remember"],
        rows: [
          { cells: ["Silver, copper, aluminium", "Good conductors: free electrons carry the charge"] },
          {
            cells: ["Human body", "A conductor: the body's fluids carry dissolved ions"],
            noteAmber: "CDS 2021 (I): the human body is the conductor among a plastic sheet, distilled water and a thin wooden sheet.",
            pyqExampleId: "0c5ec59f-5556-4d8c-a77c-0679ab896a84",
          },
          { cells: ["Distilled water", "A very poor conductor: almost no ions"] },
          { cells: ["Plastic, rubber, glass, dry wood", "Insulators"] },
          {
            cells: ["Aircraft tyres", "Made slightly conducting, so charge picked up by rubbing against the air flows to earth on landing"],
            noteAmber: "CDS 2024 (II): conducting tyres remove the charge gathered by friction with the air.",
            pyqExampleId: "0a105b99-0cb8-4863-9d2f-83e77d1bbfc1",
          },
          { cells: ["Van de Graaff generator", "Builds a very high voltage with a very small current"] },
          { cells: ["Lightning conductor", "A pointed metal rod joined to a plate in the earth; carries the charge of a strike safely to the ground"] },
        ],
      },
      pyqExampleId: "0c5ec59f-5556-4d8c-a77c-0679ab896a84",
      selfCheckExample: {
        prompt:
          "A plastic comb rubbed on dry hair picks up small bits of paper. A steel spoon held in the hand and rubbed in the same way does not. Why?",
        steps: [
          "Rubbing moves charge onto both the comb and the spoon.",
          "Plastic is an insulator, so the charge stays on the comb and attracts the paper.",
          "Steel is a conductor, so its charge flows through the hand and the body to the earth and nothing is left on the spoon.",
        ],
        answer: "The comb keeps its charge because plastic is an insulator; the spoon loses its charge through the body to the earth.",
      },
      practiceSet: [
        { prompt: "Which conducts electricity better: tap water or distilled water?", answer: "Tap water, because of the salts (ions) dissolved in it" },
        { prompt: "Pick the insulators from this list: copper, rubber, aluminium, glass.", answer: "Rubber and glass" },
        { prompt: "What does a Van de Graaff generator build up?", answer: "A very high voltage, of the order of millions of volts" },
        { prompt: "Why is a lightning conductor joined to a metal plate buried in the ground?", answer: "So that the charge of a lightning strike flows safely into the earth" },
      ],
      traps: [
        {
          title: "Pure water is a poor conductor",
          body: "**Distilled water** has almost no ions, so it hardly conducts. Tap water, sea water and sweat conduct because of the **dissolved salts**. Do not pick distilled water as the conductor.",
        },
        {
          title: "An aircraft's charge comes from rubbing against the air",
          body: "A flying aircraft is charged by **friction with the air and dust**, just as a comb is charged by hair. Its slightly conducting tyres let that charge flow to the **earth** when it lands.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphem-potential",
      name: "Potential difference and the energy a charge gains",
      intuition:
        "Potential difference is the energy given to each coulomb of charge that moves between two points. So a charge q pushed through a voltage V gains energy qV. An electron and a proton carry the same size of charge, so the same voltage gives them the same energy. The electron is about 1836 times lighter, so it ends up far faster.",
      definition:
        "The rules:\n" +
        "- **Potential difference** \\(V = \\dfrac{W}{q}\\). Its unit, the **volt**, is one **joule per coulomb**.\n" +
        "- A charge \\(q\\) that starts from rest and moves through \\(V\\) gains kinetic energy \\(K = qV\\).\n" +
        "- Electron and proton: charge of the same size, \\(1.6 \\times 10^{-19}\\) C, so the **same energy** through the same voltage.\n" +
        "- Speed from \\(K = \\tfrac{1}{2}mv^{2}\\): \\(v = \\sqrt{\\dfrac{2qV}{m}}\\). The lighter particle is the faster one.\n" +
        "- **1 electron-volt (eV)** is the energy one electron gains through 1 V: \\(1.6 \\times 10^{-19}\\) J.",
      formula: {
        label: "Potential difference and energy gained",
        latex: "V = \\dfrac{W}{q} \\qquad K = qV \\qquad v = \\sqrt{\\dfrac{2qV}{m}}",
        symbols: [
          { symbol: "W", meaning: "work done (energy) in joules" },
          { symbol: "q", meaning: "charge in coulombs" },
          { symbol: "K", meaning: "kinetic energy gained from rest" },
          { symbol: "m", meaning: "mass of the particle" },
        ],
      },
      authoredExample: {
        prompt:
          "An alpha particle (charge 2e, mass about 4 times a proton's) and a proton (charge e) start from rest and are accelerated through the same 500 V. Compare their kinetic energies and their speeds.",
        steps: [
          "Energy: \\(K = qV\\). Alpha particle: \\(2e \\times 500 = 1000\\) eV. Proton: \\(e \\times 500 = 500\\) eV. Ratio 2 : 1.",
          "Speed: \\(v = \\sqrt{2qV/m}\\), so \\(v\\) goes as \\(\\sqrt{q/m}\\).",
          "Alpha particle: \\(q/m = 2/4 = \\tfrac{1}{2}\\) (in proton units). Proton: \\(q/m = 1\\).",
          "\\(\\dfrac{v_\\alpha}{v_p} = \\sqrt{\\tfrac{1}{2}} = \\dfrac{1}{\\sqrt{2}}\\).",
        ],
        answer: "The alpha particle has twice the kinetic energy, but the proton is \\(\\sqrt{2}\\) times faster.",
      },
      selfCheckExample: {
        prompt: "How much energy does a charge of 3 C gain when it moves through a potential difference of 12 V?",
        steps: ["\\(W = qV = 3 \\times 12 = 36\\) J."],
        answer: "36 J",
      },
      pyqExampleId: "dbca8fcc-e7cc-4646-8615-89d0e4f495a2",
      practiceSet: [
        { prompt: "Write the volt in terms of the joule and the coulomb.", answer: "1 volt = 1 joule per coulomb" },
        { prompt: "Moving a charge of 2 C between two points takes 10 J of work. What is the potential difference between the points?", answer: "5 V", method: "\\(V = W/q\\)" },
        { prompt: "An electron is accelerated from rest through 250 V. How much energy does it gain, in electron-volts?", answer: "250 eV" },
        { prompt: "How many joules make one electron-volt?", answer: "\\(1.6 \\times 10^{-19}\\) J" },
      ],
      traps: [
        {
          title: "Same voltage gives the same energy, not the same speed",
          body: "Equal charges through the same voltage gain **equal energy** \\(qV\\). The speed then depends on the **mass**: \\(v = \\sqrt{2qV/m}\\), so the lighter particle is faster.",
        },
        {
          title: "A volt is a joule per coulomb, not a joule",
          body: "The volt measures energy **per unit charge**. The energy itself is \\(qV\\), in joules (or in electron-volts for one electronic charge).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphem-current",
      name: "Current, cells and emf",
      intuition:
        "Current is the amount of charge that flows past a point each second. A cell drives it: the emf of a cell is the energy it gives to each coulomb that passes through it. Some cells are used once and thrown away; others can be charged again. An ammeter sits in the path of the current to measure it; a voltmeter sits across a part to measure the voltage there.",
      definition:
        "The rules:\n" +
        "- **Current** \\(I = \\dfrac{Q}{t}\\). One **ampere** is one coulomb per second. Conventional current flows from the **positive** terminal to the **negative** outside the cell; electrons drift the other way.\n" +
        "- **emf** \\(\\varepsilon = \\dfrac{W}{Q}\\), the energy given per coulomb. Since power \\(P = \\varepsilon I\\), the emf is also the **power per unit current**. Its unit is the **volt**.\n" +
        "- **Primary cell**: used once, cannot be recharged (dry cell, Leclanché cell).\n" +
        "- **Secondary cell**: can be recharged (lead-acid car battery, lithium-ion phone battery).\n" +
        "- **Ammeter**: measures current, joined in **series**, very low resistance. **Voltmeter**: measures potential difference, joined in **parallel**, very high resistance. A **galvanometer** detects a small current.",
      formula: {
        label: "Current and emf",
        latex: "I = \\dfrac{Q}{t} \\qquad \\varepsilon = \\dfrac{W}{Q} = \\dfrac{P}{I}",
        symbols: [
          { symbol: "Q", meaning: "charge passing in time t" },
          { symbol: "ε", meaning: "emf of the cell, in volts" },
          { symbol: "P", meaning: "power the cell delivers" },
        ],
      },
      authoredExample: {
        prompt:
          "A charge of 900 C passes through a lamp in 5 minutes. The lamp is run by a 12 V battery. Find the current and the power the battery delivers.",
        steps: [
          "Change the time to seconds: 5 minutes = 300 s.",
          "\\(I = Q/t = 900 \\div 300 = 3\\) A.",
          "\\(P = \\varepsilon I = 12 \\times 3 = 36\\) W.",
        ],
        answer: "3 A, and 36 W.",
      },
      selfCheckExample: {
        prompt: "A current of 1.6 A flows in a wire. How many electrons pass a point in the wire each second? (Charge of an electron \\(= 1.6 \\times 10^{-19}\\) C.)",
        steps: [
          "Charge per second = 1.6 C.",
          "Number of electrons \\(= \\dfrac{1.6}{1.6 \\times 10^{-19}} = 10^{19}\\).",
        ],
        answer: "\\(10^{19}\\) electrons each second.",
      },
      pyqExampleId: "ff2380e4-cffe-4d47-805a-ace8140f5958",
      practiceSet: [
        { prompt: "Which instrument measures the potential difference across a bulb, and how is it joined to the bulb?", answer: "A voltmeter, joined in parallel" },
        { prompt: "Is a lead-acid car battery a primary or a secondary cell?", answer: "Secondary: it can be recharged" },
        { prompt: "A current of 2 A flows for 1 minute. How much charge passes?", answer: "120 C", method: "\\(Q = It = 2 \\times 60\\)" },
        { prompt: "Outside a cell, in which direction does conventional current flow?", answer: "From the positive terminal to the negative terminal" },
      ],
      traps: [
        {
          title: "Ammeter in series, voltmeter in parallel",
          body: "The **ammeter** must carry the same current as the circuit, so it goes **in series** and has very low resistance. The **voltmeter** goes **in parallel** across the part whose voltage you want, and has very high resistance.",
        },
        {
          title: "Primary cells cannot be recharged",
          body: "A **primary** cell is used once (a torch cell). A **secondary** cell is the rechargeable one (a car or phone battery). The names do not mean first and second in quality.",
        },
      ],
    },
  ],
};
