import type { SubtopicNote } from "@/app/notes/_types";

export const CALORIMETRY_TH_NOTE: SubtopicNote = {
  subtopicName: "Calorimetry and Latent Heat",
  title: "Calorimetry and Latent Heat",
  oneLineDefinition:
    "Heat changes a body's temperature by Q = msΔT, or changes its phase at a fixed temperature by Q = mL; in a mixture with no losses, the heat lost by the hot parts equals the heat gained by the cold ones.",
  whyItMatters:
    "Nineteen PYQs, five of them asking for a number, and four from 2026. Seven turn electrical, mechanical or chemical energy into heat, eight follow a substance through a change of phase or read a heating curve, and four mix ice and water or two liquids. Write every stage as its own term, and check whether all the ice melts before assuming it does.",
  concepts: [
    // C1 — energy into heat
    {
      kind: "formula" as const,
      slug: "jpthermal-heat-sources",
      name: "Heat from a heater, a fuel or lost kinetic energy",
      intuition:
        "Heat is energy, so any energy that disappears as work, motion or fuel can reappear as heat. Find how much energy goes into the body, multiply by the fraction that actually heats it, and set that equal to msΔT, plus mL if the body also melts. When the energy comes from the body's own motion or fall, its mass is on both sides and cancels.",
      definition:
        "- \\(Q = ms\\Delta T\\); heat capacity \\(ms\\) is in J/K, specific heat s in J kg⁻¹ K⁻¹.\n" +
        "- Heater: useful power \\(= \\eta P\\), so \\(\\eta Pt = ms\\Delta T\\).\n" +
        "- Flowing water (geyser): heat per second \\(= \\dot{m}s\\Delta T\\); fuel burnt per second \\(= \\dot{m}s\\Delta T \\div\\) heat of combustion.\n" +
        "- Falling water: \\(mgh = ms\\Delta T\\), so \\(\\Delta T = gh/s\\), the same for any mass.\n" +
        "- A moving body stopped: a fraction f of \\(\\tfrac{1}{2}mv^{2}\\) heats it; a bullet that melts needs \\(f \\cdot \\tfrac{1}{2}v^{2} = s\\Delta T + L\\) per kilogram.\n" +
        "- 1 cal = 4.2 J; water has \\(s = 1\\ \\text{cal g}^{-1}\\ ^{\\circ}C^{-1} = 4200\\ \\text{J kg}^{-1}\\ \\text{K}^{-1}\\).",
      formula: {
        label: "Energy into heat",
        latex: "Q = ms\\Delta T \\qquad \\eta Pt = ms\\Delta T \\qquad f\\cdot\\tfrac{1}{2}mv^{2} = ms\\Delta T + mL",
      },
      authoredExample: {
        prompt:
          "An electric kettle of power 1500 W is 80% efficient. How long does it take to heat 1.5 kg of water from \\(20^{\\circ}C\\) to \\(100^{\\circ}C\\)? (\\(s = 4200\\ \\text{J kg}^{-1}\\ \\text{K}^{-1}\\))",
        steps: [
          "Heat needed: \\(Q = 1.5 \\times 4200 \\times 80 = 504\\,000\\ \\text{J}\\).",
          "Useful power: \\(0.8 \\times 1500 = 1200\\ \\text{W}\\).",
          "\\(t = \\dfrac{504\\,000}{1200} = 420\\ \\text{s} = 7\\ \\text{min}\\).",
        ],
        answer: "420 s (7 minutes)",
      },
      selfCheckExample: {
        prompt:
          "A lead ball falls 64 m and stops on hitting the ground. If all its kinetic energy heats the ball, how much does its temperature rise? (\\(s_{lead} = 128\\ \\text{J kg}^{-1}\\ \\text{K}^{-1}\\), \\(g = 10\\ \\text{m s}^{-2}\\))",
        steps: [
          "\\(mgh = ms\\Delta T\\), and the mass cancels.",
          "\\(\\Delta T = \\dfrac{gh}{s} = \\dfrac{10 \\times 64}{128} = 5\\ \\text{K}\\).",
        ],
        answer: "5 K",
      },
      practiceSet: [
        { prompt: "A geyser heats 3 kg of water per minute through 40 K. The gas gives \\(4 \\times 10^{4}\\) J per gram burnt. Gas used per minute? (\\(s = 4200\\ \\text{J kg}^{-1}\\ \\text{K}^{-1}\\))", answer: "12.6 g", method: "\\(3 \\times 4200 \\times 40 = 504\\,000\\) J per minute." },
        { prompt: "A lead bullet at 400 m/s stops in a block, and half its kinetic energy heats it. Temperature rise? (\\(s = 125\\ \\text{J kg}^{-1}\\ \\text{K}^{-1}\\))", answer: "320 K", method: "\\(0.5 \\times \\tfrac{1}{2}(400)^{2} = 40\\,000\\) J per kg." },
        { prompt: "What is the SI unit of heat capacity?", answer: "J/K" },
        { prompt: "Water falls 42 m and all its potential energy heats it. Temperature rise? (\\(g = 10\\), \\(s = 4200\\))", answer: "0.1 K" },
      ],
      pyqExampleId: "c7e9ea26-76e8-468b-b349-75bcd0e7797d", // 23 Jan 2025: lead bullet heated to its melting point and melted
      traps: [
        {
          title: "Grams and kilograms in one equation",
          body: "Specific heats are given per gram or per kilogram, and heats of combustion per gram. Put every quantity in one system before dividing, or the answer is off by a thousand.",
        },
        {
          title: "Stopping at the melting point",
          body: "A body that heats up AND melts needs msΔT to reach its melting point and then mL more. Leaving out either term gives a mass or speed that is wrong by a large factor.",
        },
        {
          title: "Which g the options use",
          body: "Answers built on g = 9.8 and g = 10 differ by 2%, and both may appear as options. Use the value the question gives. If it gives none, work with 9.8 and check which option the result matches.",
        },
      ],
    },

    // C2 — change of phase and heating curves
    {
      kind: "formula" as const,
      slug: "jpthermal-phase-change",
      name: "Latent heat and the heating curve",
      intuition:
        "While ice melts or water boils, the heat goes into breaking the bonds between molecules, not into raising the temperature. So a graph of temperature against heat supplied rises, goes flat at 0°C while the ice melts, rises again, and goes flat at 100°C while the water boils. The flat for boiling is much longer than the flat for melting, because water's latent heat of vaporisation is nearly seven times its latent heat of fusion.",
      definition:
        "- Change of phase at constant temperature: \\(Q = mL\\). Latent heat L is in J/kg.\n" +
        "- Ice at \\(-T_1\\) to steam at \\(T_2 > 100^{\\circ}C\\): five terms, \\(ms_{ice}T_1 + mL_f + ms_w(100) + mL_v + ms_{steam}(T_2 - 100)\\).\n" +
        "- On a heating curve the slope of a rising part is \\(\\dfrac{dT}{dQ} = \\dfrac{1}{ms}\\): a smaller specific heat gives a steeper line.\n" +
        "- With a constant heater, flat lengths are in the ratio of the latent heats: \\(L_v/L_f = 2256/336 \\approx 6.7\\).\n" +
        "- A curve stops where the process stops: ice heated to steam at 100°C ends on the boiling flat.\n" +
        "- Two samples of equal mass on the same heater: the one whose temperature rises more slowly has the larger specific heat.\n" +
        "- Units: heat capacity J/K, specific heat J kg⁻¹ K⁻¹, latent heat J/kg, thermal conductivity W m⁻¹ K⁻¹.",
      formula: {
        label: "Latent heat and heating-curve slope",
        latex: "Q = mL \\qquad \\frac{dT}{dQ} = \\frac{1}{ms}",
      },
      authoredExample: {
        prompt:
          "How much heat turns 0.5 kg of ice at \\(-20^{\\circ}C\\) into water at \\(40^{\\circ}C\\)? (\\(s_{ice} = 2100\\), \\(s_{water} = 4200\\ \\text{J kg}^{-1}\\ \\text{K}^{-1}\\), \\(L_f = 3.36 \\times 10^{5}\\ \\text{J kg}^{-1}\\))",
        steps: [
          "Warm the ice to \\(0^{\\circ}C\\): \\(0.5 \\times 2100 \\times 20 = 21\\,000\\ \\text{J}\\).",
          "Melt it: \\(0.5 \\times 3.36 \\times 10^{5} = 168\\,000\\ \\text{J}\\).",
          "Warm the water to \\(40^{\\circ}C\\): \\(0.5 \\times 4200 \\times 40 = 84\\,000\\ \\text{J}\\).",
          "Total: \\(21\\,000 + 168\\,000 + 84\\,000 = 273\\,000\\ \\text{J}\\).",
        ],
        answer: "\\(2.73 \\times 10^{5}\\ \\text{J}\\)",
      },
      selfCheckExample: {
        prompt:
          "A heater gives heat at a steady rate to 1 kg of ice at \\(0^{\\circ}C\\). The ice takes 80 s to melt. How long does the water then take to warm from \\(0^{\\circ}C\\) to \\(100^{\\circ}C\\)? (\\(L_f = 336\\ \\text{kJ kg}^{-1}\\), \\(s_{water} = 4200\\ \\text{J kg}^{-1}\\ \\text{K}^{-1}\\))",
        steps: [
          "Heater power: \\(\\dfrac{336\\,000}{80} = 4200\\ \\text{W}\\).",
          "Heat to warm the water: \\(1 \\times 4200 \\times 100 = 420\\,000\\ \\text{J}\\).",
          "Time: \\(\\dfrac{420\\,000}{4200} = 100\\ \\text{s}\\).",
        ],
        answer: "100 s",
      },
      practiceSet: [
        { prompt: "How much heat is given out when 20 g of steam at \\(100^{\\circ}C\\) condenses and cools to water at \\(40^{\\circ}C\\)? (\\(L_v = 540\\ \\text{cal g}^{-1}\\), \\(s_w = 1\\ \\text{cal g}^{-1}\\ ^{\\circ}C^{-1}\\))", answer: "12 000 cal", method: "\\(20 \\times 540 + 20 \\times 60\\)." },
        { prompt: "On a heating curve for water, which flat is longer: melting or boiling?", answer: "Boiling, about 6.7 times longer" },
        { prompt: "What is the SI unit of latent heat?", answer: "J/kg" },
        { prompt: "Two equal masses on the same heater: A warms 20 K per minute, B warms 40 K per minute. Ratio of specific heats \\(s_A : s_B\\)?", answer: "2 : 1" },
      ],
      pyqExampleId: "a82d8bfb-f542-4f2c-8219-6f43934ce98a", // 25 Jun 2022: hot copper block melting ice
      traps: [
        {
          title: "Temperature does not rise during melting",
          body: "Heat supplied while ice melts goes into the change of phase. A graph that keeps rising through 0°C, or an answer that adds a temperature rise there, is wrong.",
        },
        {
          title: "Forgetting to warm the ice to 0°C first",
          body: "Ice below 0°C must reach 0°C before it can melt. That term, ms_ice times the degrees below zero, is small but changes the answer between close options.",
        },
        {
          title: "Latent heat in kJ",
          body: "Latent heats are often given in kJ/kg or cal/g while specific heats are in J kg⁻¹ K⁻¹. Convert to one unit before adding the stages.",
        },
      ],
    },

    // C3 — mixtures
    {
      kind: "formula" as const,
      slug: "jpthermal-mixing",
      name: "Mixing ice and water: heat lost equals heat gained",
      intuition:
        "In an insulated mixture, every joule the hot part loses is gained by the cold part. With ice there is a catch: you do not know in advance whether all of it melts. So test first. Compare the heat the water can give out by cooling to 0°C with the heat the ice needs to reach 0°C and melt. Which one is smaller decides what the final state is.",
      definition:
        "- Heat lost by hot parts \\(=\\) heat gained by cold parts (no losses).\n" +
        "- Test first: \\(Q_{water} = m_ws_w(T_w - 0)\\) against \\(Q_{ice} = m_is_i(0 - T_i) + m_iL\\).\n" +
        "- If \\(Q_{water} < Q_{ice}\\): the final temperature is \\(0^{\\circ}C\\) and only part of the ice melts; melted mass \\(= (Q_{water} - m_is_i|T_i|)/L\\).\n" +
        "- If \\(Q_{water} > Q_{ice}\\): all the ice melts; then solve \\(m_ws_w(T_w - T) = Q_{ice} + m_is_wT\\) for T.\n" +
        "- Equal masses of two liquids: \\(s_1(T - T_1) = s_2(T_2 - T)\\), so the mass cancels and pairs of mixtures give ratios of specific heats.",
      formula: {
        label: "Heat balance",
        latex: "m_ws_w(T_w - T) = m_is_i(0 - T_i) + m_iL + m_is_w(T - 0)",
      },
      authoredExample: {
        prompt:
          "50 g of ice at \\(0^{\\circ}C\\) is dropped into 200 g of water at \\(30^{\\circ}C\\). Find the final temperature. (\\(s_w = 4.2\\ \\text{J g}^{-1}\\ \\text{K}^{-1}\\), \\(L = 336\\ \\text{J g}^{-1}\\))",
        steps: [
          "Test: the water can give \\(200 \\times 4.2 \\times 30 = 25\\,200\\ \\text{J}\\) cooling to \\(0^{\\circ}C\\); melting all the ice needs \\(50 \\times 336 = 16\\,800\\ \\text{J}\\). So all the ice melts.",
          "Balance: \\(200 \\times 4.2(30 - T) = 16\\,800 + 50 \\times 4.2\\,T\\).",
          "\\(25\\,200 - 840T = 16\\,800 + 210T\\), so \\(1050T = 8400\\) and \\(T = 8^{\\circ}C\\).",
        ],
        answer: "\\(8^{\\circ}C\\)",
      },
      selfCheckExample: {
        prompt:
          "100 g of ice at \\(0^{\\circ}C\\) is put into 150 g of water at \\(40^{\\circ}C\\). What is the final state? (\\(s_w = 4.2\\ \\text{J g}^{-1}\\ \\text{K}^{-1}\\), \\(L = 336\\ \\text{J g}^{-1}\\))",
        steps: [
          "The water can give \\(150 \\times 4.2 \\times 40 = 25\\,200\\ \\text{J}\\); melting all the ice needs \\(100 \\times 336 = 33\\,600\\ \\text{J}\\).",
          "Not enough, so the mixture ends at \\(0^{\\circ}C\\).",
          "Ice melted: \\(\\dfrac{25\\,200}{336} = 75\\ \\text{g}\\), leaving 25 g of ice in 225 g of water.",
        ],
        answer: "\\(0^{\\circ}C\\), with 25 g of ice and 225 g of water",
      },
      practiceSet: [
        { prompt: "Equal masses of water at \\(20^{\\circ}C\\) and \\(80^{\\circ}C\\) are mixed. Final temperature?", answer: "\\(50^{\\circ}C\\)" },
        { prompt: "Equal masses of two liquids at \\(20^{\\circ}C\\) (cold) and \\(60^{\\circ}C\\) (hot) are mixed and reach \\(30^{\\circ}C\\). Ratio \\(s_{hot} : s_{cold}\\)?", answer: "1 : 3", method: "Hot loses 30 degrees, cold gains 10." },
        { prompt: "Ice at \\(0^{\\circ}C\\) is added to water until some ice is left over. What is the final temperature?", answer: "\\(0^{\\circ}C\\)" },
        { prompt: "How much heat melts 30 g of ice at \\(0^{\\circ}C\\)? (\\(L = 336\\ \\text{J g}^{-1}\\))", answer: "10 080 J" },
      ],
      pyqExampleId: "9d506d84-1b35-41f0-a273-c40ec9dbd4b3", // 28 Jan 2026 Shift 1: ice at −10°C added to warm water
      traps: [
        {
          title: "Assuming all the ice melts",
          body: "Solving the balance without the test can give a final temperature below 0°C, which is impossible with water present. Compare the two heats first; if the water's is smaller, the answer is 0°C.",
        },
        {
          title: "Forgetting that melted ice also warms",
          body: "Once the ice has melted it is water at 0°C, and it must be warmed to the final temperature too. Leave out m_i s_w T and the final temperature comes out too high.",
        },
      ],
    },
  ],
};
