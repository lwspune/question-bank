/**
 * NDA Maths · Statistics · approve the needs_review practice/selfCheck atoms.
 * 3 distractors each (common errors); identity/concept questions tagged
 * theme:"property". Run: npm run quiz:verify nda-maths__statistics
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── central-tendency ──
  { atomKey: "weighted-vs-unweighted-counting:practiceSet:0", distractors: [f("7"), f("4"), f("\\dfrac{4}{3}")] }, // 4×3 = 12
  { atomKey: "special-case-means:practiceSet:0", distractors: [f("4.5"), f("45"), f("9")] }, // mean 1..9 = 5
  { atomKey: "combined-mean-weighted:practiceSet:0", distractors: [f("55"), f("110"), f("52")] }, // (1200+1500)/50 = 54
  { atomKey: "geometric-mean:practiceSet:0", distractors: [f("5"), f("16"), f("3.2")] }, // √16 = 4
  { atomKey: "frequency-and-tabulation:practiceSet:0", distractors: [f("2"), f("4"), f("6")] }, // f(8)=3
  { atomKey: "mean-replacement-correction:practiceSet:0", distractors: [f("5"), f("7"), f("5.5")] }, // (50+10)/10 = 6
  { atomKey: "mean-linear-transformation:practiceSet:0", distractors: [f("12"), f("10"), f("40")] }, // 10×2 = 20
  { atomKey: "sum-of-deviations-empirical:practiceSet:0", distractors: [f("1"), "the mean", f("n")], theme: "property" }, // Σ(x-x̄)=0
  { atomKey: "mode:practiceSet:0", distractors: [f("2"), f("5"), f("3.25")] }, // mode 2,3,3,5 = 3
  { atomKey: "arithmetic-mean-raw:practiceSet:0", distractors: [f("15"), f("6"), f("4")] }, // (3+5+7)/3 = 5
  { atomKey: "class-marks-and-class-width:practiceSet:0", distractors: [f("10"), f("50"), f("5")] }, // mark 20-30 = 25
  { atomKey: "arithmetic-mean-grouped:practiceSet:0", distractors: [f("3"), f("14"), f("4")] }, // 14/4 = 3.5
  { atomKey: "median:practiceSet:0", distractors: [f("3"), f("1"), f("2.5")] }, // median 1,2,3 = 2
  { atomKey: "harmonic-mean:practiceSet:0", distractors: [f("4"), f("2\\sqrt{3}"), f("6")] }, // 24/8 = 3
  { atomKey: "summation-notation:practiceSet:0", distractors: [f("3"), f("7"), f("4")] }, // Σ 3 (4 terms) = 12
  { atomKey: "harmonic-mean:practiceSet:1", distractors: [f("4.5"), f("\\sqrt{18}"), f("9")] }, // 36/9 = 4
  { atomKey: "median:practiceSet:1", distractors: [f("6"), f("4"), f("20")] }, // (4+6)/2 = 5
  { atomKey: "combined-mean-weighted:practiceSet:1", distractors: [f("100"), f("20"), f("52")] }, // equal groups → 50
  { atomKey: "class-marks-and-class-width:practiceSet:1", distractors: [f("47.5"), f("95"), f("7.5")] }, // width 40-55 = 15
  { atomKey: "summation-notation:practiceSet:1", distractors: [f("22"), f("20"), f("10")] }, // Σ2x = 40
  { atomKey: "frequency-and-tabulation:practiceSet:1", distractors: [f("4"), f("5"), f("13")] }, // N = 2+3+5+4 = 14
  { atomKey: "arithmetic-mean-raw:practiceSet:1", distractors: [f("100"), f("30"), f("20")] }, // mean = 25
  { atomKey: "geometric-mean:practiceSet:1", distractors: [f("7.5"), f("36"), f("4.8")] }, // √36 = 6
  { atomKey: "special-case-means:practiceSet:1", distractors: [f("5"), f("30"), f("10")] }, // 30/5 = 6
  { atomKey: "mean-replacement-correction:practiceSet:1", distractors: [f("20"), f("25"), f("19")] }, // (100+5)/5 = 21
  { atomKey: "weighted-vs-unweighted-counting:practiceSet:1", distractors: [f("7"), f("10"), f("5")] }, // 6+10 = 16
  { atomKey: "mean-linear-transformation:practiceSet:1", distractors: [f("8"), f("40"), f("3")] }, // 8+5 = 13
  { atomKey: "arithmetic-mean-grouped:practiceSet:1", distractors: [f("6"), f("3"), f("1.5")] }, // 12/6 = 2
  { atomKey: "sum-of-deviations-empirical:practiceSet:1", distractors: [f("24"), f("33"), f("28.5")] }, // mode = 3·27-2·30 = 21
  { atomKey: "mode:practiceSet:1", distractors: [f("8"), f("9"), f("7.6")] }, // mode = 7
  { atomKey: "combined-mean-weighted:practiceSet:2", distractors: [f("7.5"), f("15"), f("8")] }, // (50+400)/50 = 9
  { atomKey: "special-case-means:practiceSet:2", distractors: [f("14.5"), f("15.5"), f("30")] }, // mean 10..20 = 15
  { atomKey: "mode:practiceSet:2", distractors: [f("2"), f("2.33"), f("2.5")] }, // mode = 3
  { atomKey: "geometric-mean:practiceSet:2", distractors: [f("4.33"), f("27"), f("\\dfrac{13}{3}")] }, // (27)^{1/3} = 3
  { atomKey: "harmonic-mean:practiceSet:2", distractors: [f("8"), f("2"), f("16")] }, // HM 4,4 = 4
  { atomKey: "summation-notation:practiceSet:2", distractors: [f("17"), f("15"), f("20")] }, // 15+10 = 25
  { atomKey: "sum-of-deviations-empirical:practiceSet:2", distractors: [f("28"), f("4"), f("7")], theme: "property" }, // Σ(x-x̄)=0
  { atomKey: "mean-linear-transformation:practiceSet:2", distractors: [f("18"), f("16"), f("5")] }, // 3·6-1 = 17
  { atomKey: "median:practiceSet:2", distractors: [f("9"), f("5"), f("35")] }, // median = 7
  { atomKey: "mean-replacement-correction:practiceSet:2", distractors: [f("8"), f("9"), f("7.5")] }, // (160-20)/20 = 7
  { atomKey: "weighted-vs-unweighted-counting:practiceSet:2", distractors: [f("15"), f("2"), f("10")] }, // 10×5 = 50
  { atomKey: "frequency-and-tabulation:practiceSet:2", distractors: [f("2"), f("5"), f("9")] }, // f(6) = 3
  { atomKey: "class-marks-and-class-width:practiceSet:2", distractors: [f("10"), f("0"), f("2.5")] }, // mark 0-10 = 5
  { atomKey: "arithmetic-mean-raw:practiceSet:2", distractors: [f("4"), f("6"), f("25")] }, // 25/5 = 5
  { atomKey: "arithmetic-mean-grouped:practiceSet:2", distractors: [f("7.5"), f("25"), f("5")] }, // 25/4 = 6.25
  { atomKey: "special-case-means:practiceSet:3", distractors: [f("20"), f("8"), f("12")] }, // (4+16)/2 = 10
  { atomKey: "arithmetic-mean-grouped:practiceSet:3", distractors: [f("10"), f("0"), f("2.5")] }, // (0+10)/2 = 5
  { atomKey: "class-marks-and-class-width:practiceSet:3", distractors: [f("110"), f("10"), f("220")] }, // width 100-120 = 20
  { atomKey: "combined-mean-weighted:practiceSet:3", distractors: [f("6"), f("12"), f("5")] }, // (24+4)/4 = 7
  { atomKey: "mean-linear-transformation:practiceSet:3", distractors: [f("12"), f("24"), f("3")] }, // 12/2 = 6
  { atomKey: "median:practiceSet:3", distractors: [f("30"), f("20"), f("100")] }, // (20+30)/2 = 25
  { atomKey: "harmonic-mean:practiceSet:3", distractors: ["GM", "HM", "all are equal"], theme: "property" }, // AM ≥ GM ≥ HM
  { atomKey: "arithmetic-mean-raw:practiceSet:3", distractors: [f("28"), f("0"), f("14")] }, // mean 7,7,7,7 = 7
  { atomKey: "geometric-mean:practiceSet:3", distractors: [f("10"), f("25"), f("0")] }, // GM 5,5 = 5
  { atomKey: "sum-of-deviations-empirical:practiceSet:3", distractors: [f("15"), f("17"), f("14")] }, // median = (12+2·18)/3 = 16
  { atomKey: "mode:practiceSet:3", distractors: [f("5"), f("6"), "no mode"], theme: "property" }, // bimodal 5 and 6
  { atomKey: "weighted-vs-unweighted-counting:practiceSet:3", distractors: [f("6"), f("7"), f("9")] }, // 4+2+6 = 12
  { atomKey: "mean-replacement-correction:practiceSet:3", distractors: [f("9"), f("11"), f("9.5")] }, // (36+4)/4 = 10
  { atomKey: "frequency-and-tabulation:practiceSet:3", distractors: [f("12"), f("3"), f("10")] }, // N = 30
  { atomKey: "summation-notation:practiceSet:3", distractors: [f("3"), f("9"), f("1")] }, // 1+2+3 = 6
  { atomKey: "geometric-mean:selfCheck:0", distractors: [f("\\text{GM} = 6.33"), f("\\text{GM} = 7.5"), f("\\text{GM} = 5")] }, // (216)^{1/3} = 6
  { atomKey: "mode:selfCheck:0", distractors: [f("M_0 = 5"), f("M_0 = 4"), f("M_0 = 3, 5")] }, // 3 appears 4× → mode 3
  { atomKey: "arithmetic-mean-grouped:selfCheck:0", distractors: [f("\\bar{x} = 25"), f("\\bar{x} = 100"), f("\\bar{x} = 28")] }, // 300/10 = 30
  { atomKey: "mean-linear-transformation:selfCheck:0", distractors: [f("\\bar{y} = 25"), f("\\bar{y} = 5"), f("\\bar{y} = 20")] }, // 2·10-5 = 15
  { atomKey: "arithmetic-mean-raw:selfCheck:0", distractors: [f("\\bar{x} = 9"), f("\\bar{x} = 63"), f("\\bar{x} = 12")] }, // 63/6 = 10.5
  { atomKey: "mean-replacement-correction:selfCheck:0", distractors: [f("M_{\\text{new}} = 30"), f("M_{\\text{new}} = 32"), f("M_{\\text{new}} = 29")] }, // (750+25)/25 = 31
  { atomKey: "special-case-means:selfCheck:0", distractors: ["Mean \\(= 5\\)", "Mean \\(= 55\\)", "Mean \\(= 6\\)"] }, // first 10 naturals → 5.5
  { atomKey: "combined-mean-weighted:selfCheck:0", distractors: [f("M_{12} = 69"), f("M_{12} = 68"), f("M_{12} = 70")] }, // 4110/60 = 68.5
  { atomKey: "median:selfCheck:0", distractors: [f("M = 6"), f("M = 9"), f("M = 7.71")] }, // middle of 7 sorted = 7
  { atomKey: "harmonic-mean:selfCheck:0", distractors: [f("\\text{HM} = 4"), f("\\text{HM} = 5"), f("\\text{HM} = 3.6")] }, // 32/10 = 3.2
  { atomKey: "sum-of-deviations-empirical:selfCheck:0", distractors: [f("\\text{Mode} \\approx 26"), f("\\text{Mode} \\approx 29"), f("\\text{Mode} \\approx 32")] }, // 3·28-2·30 = 24

  // ── dispersion ──
  { atomKey: "mean-deviation:practiceSet:0", distractors: [f("2"), f("4"), f("\\dfrac{8}{3}")] }, // (2+0+2)/3 = 4/3
  { atomKey: "standard-deviation:practiceSet:0", distractors: [f("256"), f("8"), f("16")] }, // √16 = 4
  { atomKey: "variance:practiceSet:0", distractors: [f("1"), f("2"), f("\\sqrt{\\tfrac{2}{3}}")] }, // (1+0+1)/3 = 2/3
  { atomKey: "coefficient-of-variation:practiceSet:0", distractors: [f("5\\%"), f("100\\%"), f("2\\%")] }, // 5/50·100 = 10%
  { atomKey: "computational-identity:practiceSet:0", distractors: [f("25"), f("30"), f("55")] }, // 30-25 = 5
  { atomKey: "linear-transformation:practiceSet:0", distractors: [f("5"), f("25"), f("20")] }, // SD(2X) = 10
  { atomKey: "special-case-variance:practiceSet:0", distractors: [f("\\sqrt{2}"), f("5"), f("2.5")] }, // (25-1)/12 = 2
  { atomKey: "coefficient-of-variation:practiceSet:1", distractors: [f("5\\%"), f("80\\%"), f("25\\%")] }, // 4/20·100 = 20%
  { atomKey: "mean-deviation:practiceSet:1", distractors: [f("1"), f("2"), f("\\dfrac{1}{3}")] }, // 2/3
  { atomKey: "variance:practiceSet:1", distractors: [f("2"), f("4"), f("\\dfrac{16}{3}")] }, // (4+0+4)/3 = 8/3
  { atomKey: "standard-deviation:practiceSet:1", distractors: [f("2401"), f("24.5"), f("49")] }, // √49 = 7
  { atomKey: "special-case-variance:practiceSet:1", distractors: [f("13"), f("12"), f("7")] }, // (169-1)/12 = 14
  { atomKey: "linear-transformation:practiceSet:1", distractors: [f("104"), f("400"), f("100")] }, // shift → SD unchanged = 4
  { atomKey: "computational-identity:practiceSet:1", distractors: [f("84"), f("20"), f("16")] }, // 100/5 - 16 = 4
  { atomKey: "computational-identity:practiceSet:2", distractors: [f("13"), f("9"), f("5")] }, // 9 + 16 = 25
  { atomKey: "standard-deviation:practiceSet:2", distractors: [f("4"), f("1"), f("2")] }, // √2
  { atomKey: "mean-deviation:practiceSet:2", distractors: [f("10"), f("15"), f("2.5")] }, // (5+5)/2 = 5
  { atomKey: "coefficient-of-variation:practiceSet:2", distractors: [f("4\\%"), f("75\\%"), f("125\\%")] }, // 25/100·100 = 25%
  { atomKey: "special-case-variance:practiceSet:2", distractors: [f("24.75"), f("99"), f("8.25")] }, // 9·99/12 = 74.25
  { atomKey: "variance:practiceSet:2", distractors: [f("5"), f("25"), f("15")] }, // all equal → 0
  { atomKey: "linear-transformation:practiceSet:2", distractors: [f("27"), f("9"), f("18")] }, // Var(3X) = 9·9 = 81
  { atomKey: "special-case-variance:practiceSet:3", distractors: [f("2"), f("\\sqrt{5}"), f("1.5")] }, // SD = √2
  { atomKey: "coefficient-of-variation:practiceSet:3", distractors: [f("40\\%"), f("100\\%"), "undefined"] }, // SD 0 → CV 0%
  { atomKey: "mean-deviation:practiceSet:3", distractors: [f("5"), f("15"), f("1")] }, // all equal → 0
  { atomKey: "standard-deviation:practiceSet:3", distractors: [f("3"), f("9"), f("1")] }, // all equal → 0
  { atomKey: "linear-transformation:practiceSet:3", distractors: [f("-6"), f("36"), f("0")] }, // SD(-X) = 6
  { atomKey: "computational-identity:practiceSet:3", distractors: [f("99"), f("50"), f("7")] }, // 50-49 = 1
  { atomKey: "variance:practiceSet:3", distractors: [f("50"), f("5"), f("12.5")] }, // (25+25)/2 = 25
  { atomKey: "linear-transformation:selfCheck:0", distractors: [f("\\sigma_Y = 6"), f("\\sigma_Y = -12"), f("\\sigma_Y = 2")] }, // |−2|·6 = 12
  { atomKey: "mean-deviation:selfCheck:0", distractors: [f("\\text{MD} = 4.5"), f("\\text{MD} = 12"), f("\\text{MD} = 2.5")] }, // 12/4 = 3
  { atomKey: "standard-deviation:selfCheck:0", distractors: [f("\\sigma = 2"), f("\\sigma = \\sqrt{3} \\approx 1.73"), f("\\sigma = 1")] }, // √2 ≈ 1.41
  { atomKey: "variance:selfCheck:0", distractors: [f("\\sigma^2 = 44"), f("\\sigma^2 = 6"), f("\\sigma^2 = 4")] }, // 44 - 36 = 8
  { atomKey: "special-case-variance:selfCheck:0", distractors: ["Variance \\(= 8.25\\)", "Variance \\(= 99\\)", "Variance \\(= 11\\)"] }, // 4·99/12 = 33
  { atomKey: "computational-identity:selfCheck:0", distractors: [f("\\sum x_i^2 = 100"), f("\\sum x_i^2 = 104"), f("\\sum x_i^2 = 29")] }, // 4(4+25) = 116

  // ── frequency-distributions ──
  { atomKey: "reading-frequency-tables:practiceSet:0", distractors: [f("5"), f("12"), f("3")] }, // 3+5 = 8
  { atomKey: "histograms-polygons-ogives:practiceSet:0", distractors: [f("100"), f("25"), f("15")] }, // 20/5 = 4
  { atomKey: "pie-charts:practiceSet:0", distractors: [f("45^\\circ"), f("120^\\circ"), f("25^\\circ")] }, // 360/4 = 90°
  { atomKey: "histograms-polygons-ogives:practiceSet:1", distractors: [f("300"), f("40"), f("20")] }, // 30/10 = 3
  { atomKey: "pie-charts:practiceSet:1", distractors: [f("50^\\circ"), f("180^\\circ"), f("25^\\circ")] }, // 50/200·360 = 90°
  { atomKey: "histograms-polygons-ogives:practiceSet:2", distractors: ["the width-\\(10\\) bar", "both are equal", "cannot be determined"], theme: "property" }, // density ∝ 1/width
  { atomKey: "pie-charts:practiceSet:2", distractors: [f("180^\\circ"), f("100^\\circ"), f("720^\\circ")], theme: "property" }, // sum = 360°
  { atomKey: "reading-frequency-tables:practiceSet:2", distractors: [f("20"), f("11"), f("5")], theme: "property" }, // median at n/2 = 10
  { atomKey: "reading-frequency-tables:practiceSet:3", distractors: [f("6"), f("2"), f("4")] }, // 2+4+6 = 12
  { atomKey: "histograms-polygons-ogives:practiceSet:3", distractors: [f("1"), f("8"), f("\\dfrac{1}{7}")] }, // 7/1 = 7
  { atomKey: "pie-charts:practiceSet:3", distractors: [f("60^\\circ"), f("90^\\circ"), f("30^\\circ")] }, // 360/3 = 120°

  // ── regression-correlation ──
  { atomKey: "identifying-regression-line:practiceSet:0", distractors: ["Yes", "Only if both are positive", "Only if r > 0"], theme: "property" }, // b_yx·b_xy = r² ≤ 1
  { atomKey: "lines-of-regression:practiceSet:0", distractors: [f("(0, 0)"), f("(1, 1)"), "the median point"], theme: "property" }, // both pass through (x̄, ȳ)
  { atomKey: "angle-between-regression-lines:practiceSet:0", distractors: ["\\(90^\\circ\\) (perpendicular)", f("45^\\circ"), f("180^\\circ")], theme: "property" }, // r = ±1 → coincide
  { atomKey: "regression-coefficients-and-r:practiceSet:0", distractors: [f("0.6"), f("0.13"), f("1.3")] }, // 0.4·0.9 = 0.36
  { atomKey: "correlation-coefficient-properties:practiceSet:0", distractors: [f("4.2"), f("0.117"), f("1")], theme: "property" }, // scale-invariant → 0.7
  { atomKey: "regression-coefficients-and-r:practiceSet:1", distractors: [f("0.36"), f("0.65"), f("1.3")] }, // √0.36 = 0.6
  // Stem rewritten to be self-contained (was "Pairing A product 0.8…", which
  // back-referenced the notes' running context — flagged by quiz:lint).
  {
    atomKey: "identifying-regression-line:practiceSet:1",
    stem: "A valid pair of regression coefficients must satisfy \\(b_{yx}\\cdot b_{xy} \\leq 1\\). Pairing A gives a product of \\(0.8\\); pairing B gives \\(1.25\\). Which pairing is valid?",
    distractors: ["B", "Both", "Neither"],
    theme: "property",
  }, // product ≤ 1 → A
  { atomKey: "correlation-coefficient-properties:practiceSet:1", distractors: [f("0.5"), f("-0.25"), f("0")], theme: "property" }, // sign flips → -0.5
  { atomKey: "lines-of-regression:practiceSet:1", distractors: [f("(3, 2)"), f("(2.5, 2.5)"), f("(0, 0)")], theme: "property" }, // (x̄, ȳ) = (2, 3)
  { atomKey: "angle-between-regression-lines:practiceSet:1", distractors: [f("0^\\circ"), f("45^\\circ"), f("180^\\circ")], theme: "property" }, // r = 0 → 90°
  { atomKey: "lines-of-regression:practiceSet:2", distractors: [f("2"), f("4"), f("0.5")] }, // 1·2/2 = 1
  { atomKey: "regression-coefficients-and-r:practiceSet:2", distractors: [f("1"), f("-0.5"), f("-2")] }, // -√(2·0.5) = -1
  { atomKey: "angle-between-regression-lines:practiceSet:2", distractors: [f("5"), f("\\dfrac{1}{5}"), f("6")] }, // |2-3|/(1+6) = 1/7
  { atomKey: "identifying-regression-line:practiceSet:2", distractors: [f("r"), f("1"), f("2r")], theme: "property" }, // product = r²
  { atomKey: "correlation-coefficient-properties:practiceSet:2", distractors: [f("0.8"), f("-0.6"), f("0")], theme: "property" }, // shift-invariant → -0.8
  { atomKey: "lines-of-regression:practiceSet:3", distractors: [f("0.5"), f("4"), f("1")] }, // (6-2)/(3-1) = 2
  { atomKey: "angle-between-regression-lines:practiceSet:3", distractors: ["parallel", "coincident", "at \\(45^\\circ\\)"], theme: "property" }, // m₁m₂ = -1 → perpendicular
  { atomKey: "correlation-coefficient-properties:practiceSet:3", distractors: ["Yes", "Only for large n", "Yes, if positive"], theme: "property" }, // |r| ≤ 1 → No
  { atomKey: "regression-coefficients-and-r:practiceSet:3", distractors: ["Yes", "Only if r = 1", "Only if both positive"], theme: "property" }, // product 1.6 > 1 → No
  { atomKey: "regression-coefficients-and-r:selfCheck:0", distractors: [f("r = 0.6"), f("r = -0.36"), f("r = -0.75")] }, // -√0.36 = -0.6
  { atomKey: "identifying-regression-line:selfCheck:0", distractors: [f("b_{yx} = -\\dfrac{2}{5},\\ b_{xy} = -4"), f("b_{yx} = -4,\\ b_{xy} = -\\dfrac{2}{5}"), f("b_{yx} = -\\dfrac{1}{4},\\ b_{xy} = -\\dfrac{2}{5}")] },
  { atomKey: "lines-of-regression:selfCheck:0", distractors: [f("y = 2x + 1"), f("y = \\dfrac{x}{2} - 1"), f("y = x + 1")] }, // slope ½, intercept 1
  { atomKey: "correlation-coefficient-properties:selfCheck:0", distractors: [f("r_{UV} = -0.4"), f("r_{UV} = -0.8"), f("r_{UV} = 0.2")], theme: "property" }, // one sign flip → +0.4
];
