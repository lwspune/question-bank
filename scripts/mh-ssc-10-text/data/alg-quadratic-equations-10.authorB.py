# Authors the model solutions for Practice set 2.5, Practice set 2.6 and the
# subjective half of Problem set 2. Companion to authorA.py; same conventions.
# Every numeric result was independently derived in
# alg-quadratic-equations-10.verify.py BEFORE this file was written.
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ID = "alg-quadratic-equations-10"


def S(*lines):
    return "\n\n".join(lines)


T = r"\(\therefore\)"
SOL = {}

# ── Practice set 2.5 ───────────────────────────────────────────────────────
SOL["Ex 2.5 Q.1 (1)"] = S(
    r"The nature of the roots of \(ax^2 + bx + c = 0\) is decided by the sign of the discriminant \(b^2 - 4ac\).",
    r"When \(b^2 - 4ac = 5\) : \(5 > 0\), so the roots are real and unequal (distinct and real).",
    r"When \(b^2 - 4ac = -5\) : \(-5 < 0\), so the roots are not real.",
)
SOL["Ex 2.5 Q.1 (2)"] = S(
    r"If the sum of the roots is \(\alpha + \beta\) and their product is \(\alpha\beta\), the equation is",
    r"\(x^2 - (\alpha + \beta)x + \alpha\beta = 0\)",
    r"Here \(\alpha + \beta = -7\) and \(\alpha\beta = 5\).",
    T + r" \(x^2 - (-7)x + 5 = 0\)",
    T + r" \(x^2 + 7x + 5 = 0\)",
)
SOL["Ex 2.5 Q.1 (3)"] = S(
    r"Comparing \(2x^2 - 4x - 3 = 0\) with \(ax^2 + bx + c = 0\), \(a = 2\), \(b = -4\), \(c = -3\).",
    r"\(\alpha + \beta = -\dfrac{b}{a} = -\dfrac{-4}{2} = 2\)",
    r"\(\alpha \times \beta = \dfrac{c}{a} = \dfrac{-3}{2}\)",
)


def discsol(head, A, B, C, expr, val, extra=None):
    lines = [
        head,
        r"Comparing with \(ax^2 + bx + c = 0\), \(a = %s\), \(b = %s\), \(c = %s\)" % (A, B, C),
        r"\(\Delta = b^2 - 4ac = %s\)" % expr,
        r"\(\Delta = %s\)" % val,
    ]
    if extra:
        lines.append(extra)
    return S(*lines)


SOL["Ex 2.5 Q.2 (1)"] = discsol(
    r"\(x^2 + 7x - 1 = 0\)", "1", "7", "-1",
    r"(7)^2 - 4 \times 1 \times (-1) = 49 + 4", "53")
SOL["Ex 2.5 Q.2 (2)"] = discsol(
    r"\(2y^2 - 5y + 10 = 0\)", "2", "-5", "10",
    r"(-5)^2 - 4 \times 2 \times 10 = 25 - 80", "-55")
SOL["Ex 2.5 Q.2 (3)"] = discsol(
    r"\(\sqrt{2}\,x^2 + 4x + 2\sqrt{2} = 0\)", r"\sqrt{2}", "4", r"2\sqrt{2}",
    r"(4)^2 - 4 \times \sqrt{2} \times 2\sqrt{2} = 16 - 8 \times 2 = 16 - 16", "0")

SOL["Ex 2.5 Q.3 (1)"] = discsol(
    r"\(x^2 - 4x + 4 = 0\)", "1", "-4", "4",
    r"(-4)^2 - 4 \times 1 \times 4 = 16 - 16", "0",
    T + r" \(\Delta = 0\), so the roots of the equation are real and equal.")
SOL["Ex 2.5 Q.3 (2)"] = discsol(
    r"\(2y^2 - 7y + 2 = 0\)", "2", "-7", "2",
    r"(-7)^2 - 4 \times 2 \times 2 = 49 - 16", "33",
    T + r" \(\Delta > 0\), so the roots of the equation are real and unequal.")
SOL["Ex 2.5 Q.3 (3)"] = discsol(
    r"\(m^2 + 2m + 9 = 0\)", "1", "2", "9",
    r"(2)^2 - 4 \times 1 \times 9 = 4 - 36", "-32",
    T + r" \(\Delta < 0\), so the roots of the equation are not real.")


def form_eq(r1, r2, sumline, prodline, final):
    return S(
        r"The quadratic equation whose roots are \(\alpha\) and \(\beta\) is \(x^2 - (\alpha + \beta)x + \alpha\beta = 0\).",
        r"Let \(\alpha = %s\) and \(\beta = %s\)." % (r1, r2),
        sumline,
        prodline,
        final,
    )


SOL["Ex 2.5 Q.4 (1)"] = form_eq(
    "0", "4",
    r"\(\alpha + \beta = 0 + 4 = 4\)",
    r"\(\alpha\beta = 0 \times 4 = 0\)",
    T + r" the equation is \(x^2 - 4x + 0 = 0\), that is \(x^2 - 4x = 0\).")
SOL["Ex 2.5 Q.4 (2)"] = form_eq(
    "3", "-10",
    r"\(\alpha + \beta = 3 + (-10) = -7\)",
    r"\(\alpha\beta = 3 \times (-10) = -30\)",
    T + r" the equation is \(x^2 - (-7)x + (-30) = 0\), that is \(x^2 + 7x - 30 = 0\).")
SOL["Ex 2.5 Q.4 (3)"] = form_eq(
    r"\dfrac{1}{2}", r"-\dfrac{1}{2}",
    r"\(\alpha + \beta = \dfrac{1}{2} + \left(-\dfrac{1}{2}\right) = 0\)",
    r"\(\alpha\beta = \dfrac{1}{2} \times \left(-\dfrac{1}{2}\right) = -\dfrac{1}{4}\)",
    T + r" the equation is \(x^2 - 0 \cdot x - \dfrac{1}{4} = 0\), that is \(x^2 - \dfrac{1}{4} = 0\).")
SOL["Ex 2.5 Q.4 (4)"] = form_eq(
    r"2 - \sqrt{5}", r"2 + \sqrt{5}",
    r"\(\alpha + \beta = (2 - \sqrt{5}) + (2 + \sqrt{5}) = 4\)",
    r"\(\alpha\beta = (2 - \sqrt{5})(2 + \sqrt{5}) = 2^2 - (\sqrt{5})^2 = 4 - 5 = -1\)",
    T + r" the equation is \(x^2 - 4x + (-1) = 0\), that is \(x^2 - 4x - 1 = 0\).")

SOL["Ex 2.5 Q.5"] = S(
    r"Comparing \(x^2 - 4kx + k + 3 = 0\) with \(ax^2 + bx + c = 0\), \(a = 1\), \(b = -4k\), \(c = k + 3\).",
    r"\(\alpha + \beta = -\dfrac{b}{a} = 4k\)  and  \(\alpha\beta = \dfrac{c}{a} = k + 3\)",
    r"Given : sum of the roots is double their product.",
    T + r" \(4k = 2(k + 3)\)",
    T + r" \(4k = 2k + 6\)",
    T + r" \(2k = 6\)",
    T + r" \(k = 3\)",
)
SOL["Ex 2.5 Q.6 (1)"] = S(
    r"Comparing \(y^2 - 2y - 7 = 0\) with \(ay^2 + by + c = 0\), \(a = 1\), \(b = -2\), \(c = -7\).",
    r"\(\alpha + \beta = -\dfrac{b}{a} = 2\)  and  \(\alpha\beta = \dfrac{c}{a} = -7\)",
    r"\(\alpha^2 + \beta^2 = (\alpha + \beta)^2 - 2\alpha\beta\)",
    r"\(= (2)^2 - 2 \times (-7)\)",
    r"\(= 4 + 14\)",
    r"\(\alpha^2 + \beta^2 = 18\)",
)
SOL["Ex 2.5 Q.6 (2)"] = S(
    r"Comparing \(y^2 - 2y - 7 = 0\) with \(ay^2 + by + c = 0\), \(a = 1\), \(b = -2\), \(c = -7\).",
    r"\(\alpha + \beta = 2\)  and  \(\alpha\beta = -7\)",
    r"\(\alpha^3 + \beta^3 = (\alpha + \beta)^3 - 3\alpha\beta(\alpha + \beta)\)",
    r"\(= (2)^3 - 3 \times (-7) \times 2\)",
    r"\(= 8 + 42\)",
    r"\(\alpha^3 + \beta^3 = 50\)",
)
SOL["Ex 2.5 Q.7 (1)"] = S(
    r"Comparing \(3y^2 + ky + 12 = 0\) with \(ay^2 + by + c = 0\), \(a = 3\), \(b = k\), \(c = 12\).",
    r"The roots are real and equal, so \(b^2 - 4ac = 0\).",
    T + r" \(k^2 - 4 \times 3 \times 12 = 0\)",
    T + r" \(k^2 - 144 = 0\)",
    T + r" \(k^2 = 144\)",
    T + r" \(k = 12\) or \(k = -12\)",
)
SOL["Ex 2.5 Q.7 (2)"] = S(
    r"\(kx(x - 2) + 6 = 0\)",
    T + r" \(kx^2 - 2kx + 6 = 0\)",
    r"Comparing with \(ax^2 + bx + c = 0\), \(a = k\), \(b = -2k\), \(c = 6\).",
    r"The roots are real and equal, so \(b^2 - 4ac = 0\).",
    T + r" \((-2k)^2 - 4 \times k \times 6 = 0\)",
    T + r" \(4k^2 - 24k = 0\)",
    T + r" \(4k(k - 6) = 0\)",
    T + r" \(k = 0\) or \(k = 6\)",
    r"But if \(k = 0\) the equation becomes \(6 = 0\), which is not a quadratic equation at all (the coefficient \(a\) must be non-zero).",
    T + r" \(k = 6\)",
)

# ── Practice set 2.6 (word problems) ───────────────────────────────────────
SOL["Ex 2.6 Q.1"] = S(
    r"Let Pragati's present age be \(x\) years.",
    T + r" her age 2 years ago was \((x - 2)\) years and her age 3 years hence will be \((x + 3)\) years.",
    r"From the given condition,",
    r"\((x - 2)(x + 3) = 84\)",
    T + r" \(x^2 + 3x - 2x - 6 = 84\)",
    T + r" \(x^2 + x - 90 = 0\)",
    T + r" \(x^2 + 10x - 9x - 90 = 0\)",
    T + r" \(x(x + 10) - 9(x + 10) = 0\)",
    T + r" \((x + 10)(x - 9) = 0\)",
    T + r" \(x = -10\) or \(x = 9\)",
    r"But age is never negative, so \(x \neq -10\).",
    T + r" Pragati's present age is 9 years.",
)
SOL["Ex 2.6 Q.2"] = S(
    r"Let the two consecutive natural even numbers be \(x\) and \(x + 2\).",
    r"From the given condition,",
    r"\(x^2 + (x + 2)^2 = 244\)",
    T + r" \(x^2 + x^2 + 4x + 4 = 244\)",
    T + r" \(2x^2 + 4x - 240 = 0\)",
    T + r" \(x^2 + 2x - 120 = 0\)   (dividing throughout by 2)",
    T + r" \(x^2 + 12x - 10x - 120 = 0\)",
    T + r" \(x(x + 12) - 10(x + 12) = 0\)",
    T + r" \((x + 12)(x - 10) = 0\)",
    T + r" \(x = -12\) or \(x = 10\)",
    r"But the numbers are natural numbers, so \(x \neq -12\).",
    T + r" \(x = 10\) and \(x + 2 = 12\).",
    T + r" the numbers are 10 and 12.",
)
SOL["Ex 2.6 Q.3"] = S(
    r"Following the flow chart :",
    r"Let the number of trees in a column be \(x\).",
    T + r" the number of trees in a row \(= x + 5\).",
    r"Total number of trees \(= x(x + 5)\).",
    r"From the given condition,",
    r"\(x(x + 5) = 150\)",
    T + r" \(x^2 + 5x - 150 = 0\)",
    T + r" \(x^2 + 15x - 10x - 150 = 0\)",
    T + r" \(x(x + 15) - 10(x + 15) = 0\)",
    T + r" \((x + 15)(x - 10) = 0\)",
    T + r" \(x = -15\) or \(x = 10\)",
    r"But the number of trees is never negative, so \(x \neq -15\).",
    T + r" \(x = 10\).",
    T + r" there are 10 trees in each column and \(10 + 5 = 15\) trees in each row.",
)
SOL["Ex 2.6 Q.4"] = S(
    r"Let Kishor's present age be \(x\) years.",
    T + r" Vivek's present age is \((x + 5)\) years.",
    r"From the given condition,",
    r"\(\dfrac{1}{x} + \dfrac{1}{x + 5} = \dfrac{1}{6}\)",
    T + r" \(\dfrac{(x + 5) + x}{x(x + 5)} = \dfrac{1}{6}\)",
    T + r" \(6(2x + 5) = x^2 + 5x\)",
    T + r" \(12x + 30 = x^2 + 5x\)",
    T + r" \(x^2 - 7x - 30 = 0\)",
    T + r" \(x^2 - 10x + 3x - 30 = 0\)",
    T + r" \(x(x - 10) + 3(x - 10) = 0\)",
    T + r" \((x - 10)(x + 3) = 0\)",
    T + r" \(x = 10\) or \(x = -3\)",
    r"But age is never negative, so \(x \neq -3\).",
    T + r" Kishor's present age is 10 years and Vivek's present age is \(10 + 5 = 15\) years.",
)
SOL["Ex 2.6 Q.5"] = S(
    r"Let Suyash's score in the first test be \(x\) marks.",
    T + r" his score in the second test is \((x + 10)\) marks.",
    r"From the given condition, 5 times the second score equals the square of the first score.",
    r"\(5(x + 10) = x^2\)",
    T + r" \(5x + 50 = x^2\)",
    T + r" \(x^2 - 5x - 50 = 0\)",
    T + r" \(x^2 - 10x + 5x - 50 = 0\)",
    T + r" \(x(x - 10) + 5(x - 10) = 0\)",
    T + r" \((x - 10)(x + 5) = 0\)",
    T + r" \(x = 10\) or \(x = -5\)",
    r"But a score is never negative, so \(x \neq -5\).",
    T + r" his score in the first test is 10 marks.",
)
SOL["Ex 2.6 Q.6"] = S(
    r"Let the number of pots made in one day be \(x\).",
    T + r" the production cost of each pot is \((10x + 40)\) rupees.",
    r"Total production cost per day \(= x(10x + 40)\).",
    r"From the given condition,",
    r"\(x(10x + 40) = 600\)",
    T + r" \(10x^2 + 40x - 600 = 0\)",
    T + r" \(x^2 + 4x - 60 = 0\)   (dividing throughout by 10)",
    T + r" \(x^2 + 10x - 6x - 60 = 0\)",
    T + r" \(x(x + 10) - 6(x + 10) = 0\)",
    T + r" \((x + 10)(x - 6) = 0\)",
    T + r" \(x = -10\) or \(x = 6\)",
    r"But the number of pots is never negative, so \(x \neq -10\).",
    T + r" \(x = 6\), and the cost of each pot \(= 10(6) + 40 = 100\).",
    T + r" he makes 6 pots per day and the production cost of one pot is ₹ 100.",
)
SOL["Ex 2.6 Q.7"] = S(
    r"Let the speed of the water current be \(x\) km/hr.",
    r"Speed of the boat in still water is 12 km/hr.",
    T + r" downstream speed \(= (12 + x)\) km/hr and upstream speed \(= (12 - x)\) km/hr.",
    r"From the given condition, the total time for 36 km each way is 8 hours.",
    r"\(\dfrac{36}{12 + x} + \dfrac{36}{12 - x} = 8\)",
    T + r" \(36\left[\dfrac{(12 - x) + (12 + x)}{(12 + x)(12 - x)}\right] = 8\)",
    T + r" \(36 \times \dfrac{24}{144 - x^2} = 8\)",
    T + r" \(864 = 8(144 - x^2)\)",
    T + r" \(108 = 144 - x^2\)",
    T + r" \(x^2 = 36\)",
    T + r" \(x = 6\) or \(x = -6\)",
    r"But speed is never negative, so \(x \neq -6\).",
    T + r" the speed of the water current is 6 km/hr.",
)
SOL["Ex 2.6 Q.8"] = S(
    r"Let Nishu alone take \(x\) days to complete the work.",
    T + r" Pintu alone takes \((x + 6)\) days.",
    r"In one day Nishu does \(\dfrac{1}{x}\) of the work and Pintu does \(\dfrac{1}{x + 6}\) of it.",
    r"Working together they finish in 4 days, so in one day they do \(\dfrac{1}{4}\) of the work.",
    r"\(\dfrac{1}{x} + \dfrac{1}{x + 6} = \dfrac{1}{4}\)",
    T + r" \(\dfrac{(x + 6) + x}{x(x + 6)} = \dfrac{1}{4}\)",
    T + r" \(4(2x + 6) = x^2 + 6x\)",
    T + r" \(8x + 24 = x^2 + 6x\)",
    T + r" \(x^2 - 2x - 24 = 0\)",
    T + r" \(x^2 - 6x + 4x - 24 = 0\)",
    T + r" \(x(x - 6) + 4(x - 6) = 0\)",
    T + r" \((x - 6)(x + 4) = 0\)",
    T + r" \(x = 6\) or \(x = -4\)",
    r"But the number of days is never negative, so \(x \neq -4\).",
    T + r" Nishu alone takes 6 days and Pintu alone takes \(6 + 6 = 12\) days.",
)
SOL["Ex 2.6 Q.9"] = S(
    r"Let the divisor be \(x\) (a natural number).",
    T + r" the quotient is \((5x + 6)\), and the remainder is 1.",
    r"By the division algorithm, dividend \(=\) divisor \(\times\) quotient \(+\) remainder.",
    r"\(460 = x(5x + 6) + 1\)",
    T + r" \(5x^2 + 6x + 1 - 460 = 0\)",
    T + r" \(5x^2 + 6x - 459 = 0\)",
    T + r" \(5x^2 + 51x - 45x - 459 = 0\)   (since \(51 \times (-45) = -2295 = 5 \times (-459)\) and \(51 - 45 = 6\))",
    T + r" \(x(5x + 51) - 9(5x + 51) = 0\)",
    T + r" \((5x + 51)(x - 9) = 0\)",
    T + r" \(x = -\dfrac{51}{5}\) or \(x = 9\)",
    r"But the divisor is a natural number, so \(x \neq -\dfrac{51}{5}\).",
    T + r" the divisor is 9 and the quotient is \(5(9) + 6 = 51\).",
    r"(Check : \(9 \times 51 + 1 = 459 + 1 = 460\).)",
)
SOL["Ex 2.6 Q.10"] = S(
    r"From the figure, AB \(= x\), DC \(= 2x + 1\) and the height AM \(= x - 4\).",
    r"\(A(\square ABCD) = \dfrac{1}{2}(AB + CD) \times AM\)",
    r"\(33 = \dfrac{1}{2}(x + 2x + 1) \times (x - 4)\)",
    T + r" \(66 = (3x + 1)(x - 4)\)",
    T + r" \(66 = 3x^2 - 12x + x - 4\)",
    T + r" \(3x^2 - 11x - 70 = 0\)",
    T + r" \(3x^2 - 21x + 10x - 70 = 0\)   (since \(-21 \times 10 = -210 = 3 \times (-70)\) and \(-21 + 10 = -11\))",
    T + r" \(3x(x - 7) + 10(x - 7) = 0\)",
    T + r" \((3x + 10)(x - 7) = 0\)",
    T + r" \((3x + 10) = 0\) or \((x - 7) = 0\)",
    T + r" \(x = -\dfrac{10}{3}\) or \(x = 7\)",
    r"But length is never negative.",
    T + r" \(x \neq -\dfrac{10}{3}\)   " + T + r" \(x = 7\)",
    r"AB \(= x = 7\) cm, CD \(= 2x + 1 = 15\) cm, BC \(= x - 2 = 5\) cm, and AD \(=\) BC \(= 5\) cm (the figure marks AD and BC as equal).",
    r"(Check : the height is \(x - 4 = 3\) cm and the horizontal offset at each end is \(\dfrac{15 - 7}{2} = 4\) cm, so AD \(= \sqrt{4^2 + 3^2} = 5\) cm, which agrees.)",
)

# ── Problem set 2 (subjective) ─────────────────────────────────────────────
SOL["PS2 Q.2 (1)"] = S(
    r"\(x^2 + 2x + 11 = 0\)",
    r"\(x\) is the only variable and its maximum index is 2, with \(a = 1 \neq 0\).",
    T + r" it is a quadratic equation.",
)
SOL["PS2 Q.2 (2)"] = S(
    r"\(x^2 - 2x + 5 = x^2\)",
    T + r" \(x^2 - x^2 - 2x + 5 = 0\)",
    T + r" \(-2x + 5 = 0\)",
    r"The \(x^2\) terms cancel, so the maximum index of the variable is 1.",
    T + r" it is not a quadratic equation.",
)
SOL["PS2 Q.2 (3)"] = S(
    r"\((x + 2)^2 = 2x^2\)",
    T + r" \(x^2 + 4x + 4 = 2x^2\)",
    T + r" \(x^2 - 4x - 4 = 0\)",
    r"\(x\) is the only variable and its maximum index is 2, with \(a = 1 \neq 0\).",
    T + r" it is a quadratic equation.",
)


def disc2(head, A, B, C, expr, val):
    return S(
        head,
        r"Comparing with \(ax^2 + bx + c = 0\), \(a = %s\), \(b = %s\), \(c = %s\)" % (A, B, C),
        r"\(\Delta = b^2 - 4ac = %s\)" % expr,
        r"\(\Delta = %s\)" % val,
    )


SOL["PS2 Q.3 (1)"] = disc2(
    r"\(2y^2 - y + 2 = 0\)", "2", "-1", "2",
    r"(-1)^2 - 4 \times 2 \times 2 = 1 - 16", "-15")
SOL["PS2 Q.3 (2)"] = disc2(
    r"\(5m^2 - m = 0\)", "5", "-1", "0",
    r"(-1)^2 - 4 \times 5 \times 0 = 1 - 0", "1")
SOL["PS2 Q.3 (3)"] = disc2(
    r"\(\sqrt{5}\,x^2 - x - \sqrt{5} = 0\)", r"\sqrt{5}", "-1", r"-\sqrt{5}",
    r"(-1)^2 - 4 \times \sqrt{5} \times (-\sqrt{5}) = 1 + 4 \times 5 = 1 + 20", "21")

SOL["PS2 Q.4"] = S(
    r"\(-2\) is a root of \(2x^2 + kx - 2 = 0\), so putting \(x = -2\) must satisfy the equation.",
    r"\(2(-2)^2 + k(-2) - 2 = 0\)",
    T + r" \(8 - 2k - 2 = 0\)",
    T + r" \(6 - 2k = 0\)",
    T + r" \(2k = 6\)",
    T + r" \(k = 3\)",
)
SOL["PS2 Q.5 (1)"] = S(
    r"The equation whose roots are \(\alpha\) and \(\beta\) is \(x^2 - (\alpha + \beta)x + \alpha\beta = 0\).",
    r"Let \(\alpha = 10\) and \(\beta = -10\).",
    r"\(\alpha + \beta = 10 + (-10) = 0\)",
    r"\(\alpha\beta = 10 \times (-10) = -100\)",
    T + r" the equation is \(x^2 - 0 \cdot x - 100 = 0\), that is \(x^2 - 100 = 0\).",
)
SOL["PS2 Q.5 (2)"] = S(
    r"The equation whose roots are \(\alpha\) and \(\beta\) is \(x^2 - (\alpha + \beta)x + \alpha\beta = 0\).",
    r"Let \(\alpha = 1 - 3\sqrt{5}\) and \(\beta = 1 + 3\sqrt{5}\).",
    r"\(\alpha + \beta = (1 - 3\sqrt{5}) + (1 + 3\sqrt{5}) = 2\)",
    r"\(\alpha\beta = (1)^2 - (3\sqrt{5})^2 = 1 - 45 = -44\)",
    T + r" the equation is \(x^2 - 2x - 44 = 0\).",
)
SOL["PS2 Q.5 (3)"] = S(
    r"The equation whose roots are \(\alpha\) and \(\beta\) is \(x^2 - (\alpha + \beta)x + \alpha\beta = 0\).",
    r"Let \(\alpha = 0\) and \(\beta = 7\).",
    r"\(\alpha + \beta = 0 + 7 = 7\)",
    r"\(\alpha\beta = 0 \times 7 = 0\)",
    T + r" the equation is \(x^2 - 7x + 0 = 0\), that is \(x^2 - 7x = 0\).",
)
SOL["PS2 Q.6 (1)"] = disc2(
    r"\(3x^2 - 5x + 7 = 0\)", "3", "-5", "7",
    r"(-5)^2 - 4 \times 3 \times 7 = 25 - 84", "-59") + "\n\n" + (
    T + r" \(\Delta < 0\), so the roots of the equation are not real.")
SOL["PS2 Q.6 (2)"] = disc2(
    r"\(\sqrt{3}\,x^2 + \sqrt{2}\,x - 2\sqrt{3} = 0\)", r"\sqrt{3}", r"\sqrt{2}", r"-2\sqrt{3}",
    r"(\sqrt{2})^2 - 4 \times \sqrt{3} \times (-2\sqrt{3}) = 2 + 8 \times 3 = 2 + 24", "26") + "\n\n" + (
    T + r" \(\Delta > 0\), so the roots of the equation are real and unequal.")
SOL["PS2 Q.6 (3)"] = disc2(
    r"\(m^2 - 2m + 1 = 0\)", "1", "-2", "1",
    r"(-2)^2 - 4 \times 1 \times 1 = 4 - 4", "0") + "\n\n" + (
    T + r" \(\Delta = 0\), so the roots of the equation are real and equal.")

SOL["PS2 Q.7 (1)"] = S(
    r"\(\dfrac{1}{x + 5} = \dfrac{1}{x^2}\)",
    r"Cross-multiplying (note \(x \neq 0\) and \(x \neq -5\)),",
    T + r" \(x^2 = x + 5\)",
    T + r" \(x^2 - x - 5 = 0\)",
    r"Comparing with \(ax^2 + bx + c = 0\), \(a = 1\), \(b = -1\), \(c = -5\)",
    r"\(b^2 - 4ac = (-1)^2 - 4 \times 1 \times (-5) = 1 + 20 = 21\)",
    r"\(x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} = \dfrac{1 \pm \sqrt{21}}{2}\)",
    T + r" \(\dfrac{1 + \sqrt{21}}{2}\) and \(\dfrac{1 - \sqrt{21}}{2}\) are the roots of the given quadratic equation.",
)
SOL["PS2 Q.7 (2)"] = S(
    r"\(x^2 - \dfrac{3x}{10} - \dfrac{1}{10} = 0\)",
    r"Multiplying throughout by 10,",
    T + r" \(10x^2 - 3x - 1 = 0\)",
    T + r" \(10x^2 - 5x + 2x - 1 = 0\)   (since \(-5 \times 2 = -10 = 10 \times (-1)\) and \(-5 + 2 = -3\))",
    T + r" \(5x(2x - 1) + 1(2x - 1) = 0\)",
    T + r" \((2x - 1)(5x + 1) = 0\)",
    T + r" \(x = \dfrac{1}{2}\) or \(x = -\dfrac{1}{5}\)",
    T + r" \(\dfrac{1}{2}\) and \(-\dfrac{1}{5}\) are the roots of the given quadratic equation.",
)
SOL["PS2 Q.7 (3)"] = S(
    r"\((2x + 3)^2 = 25\)",
    T + r" \(2x + 3 = 5\) or \(2x + 3 = -5\)",
    T + r" \(2x = 2\) or \(2x = -8\)",
    T + r" \(x = 1\) or \(x = -4\)",
    T + r" 1 and \(-4\) are the roots of the given quadratic equation.",
)
SOL["PS2 Q.7 (4)"] = S(
    r"\(m^2 + 5m + 5 = 0\)",
    r"Comparing with \(am^2 + bm + c = 0\), \(a = 1\), \(b = 5\), \(c = 5\)",
    r"\(b^2 - 4ac = (5)^2 - 4 \times 1 \times 5 = 25 - 20 = 5\)",
    r"\(m = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} = \dfrac{-5 \pm \sqrt{5}}{2}\)",
    T + r" \(\dfrac{-5 + \sqrt{5}}{2}\) and \(\dfrac{-5 - \sqrt{5}}{2}\) are the roots of the given quadratic equation.",
)
SOL["PS2 Q.7 (5)"] = S(
    r"\(5m^2 + 2m + 1 = 0\)",
    r"Comparing with \(am^2 + bm + c = 0\), \(a = 5\), \(b = 2\), \(c = 1\)",
    r"\(b^2 - 4ac = (2)^2 - 4 \times 5 \times 1 = 4 - 20 = -16\)",
    r"\(m = \dfrac{-2 \pm \sqrt{-16}}{2 \times 5}\)",
    r"But \(\sqrt{-16}\) is not a real number.",
    T + r" the roots of the equation are not real.",
)
SOL["PS2 Q.7 (6)"] = S(
    r"\(x^2 - 4x - 3 = 0\)",
    r"Comparing with \(ax^2 + bx + c = 0\), \(a = 1\), \(b = -4\), \(c = -3\)",
    r"\(b^2 - 4ac = (-4)^2 - 4 \times 1 \times (-3) = 16 + 12 = 28\)",
    r"\(x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} = \dfrac{4 \pm \sqrt{28}}{2} = \dfrac{4 \pm 2\sqrt{7}}{2} = 2 \pm \sqrt{7}\)",
    T + r" \((2 + \sqrt{7})\) and \((2 - \sqrt{7})\) are the roots of the given quadratic equation.",
)
SOL["PS2 Q.8"] = S(
    r"\((m - 12)x^2 + 2(m - 12)x + 2 = 0\)",
    r"Comparing with \(ax^2 + bx + c = 0\), \(a = m - 12\), \(b = 2(m - 12)\), \(c = 2\).",
    r"The roots are real and equal, so \(b^2 - 4ac = 0\).",
    T + r" \([2(m - 12)]^2 - 4(m - 12)(2) = 0\)",
    T + r" \(4(m - 12)^2 - 8(m - 12) = 0\)",
    T + r" \(4(m - 12)[(m - 12) - 2] = 0\)",
    T + r" \(4(m - 12)(m - 14) = 0\)",
    T + r" \(m = 12\) or \(m = 14\)",
    r"But if \(m = 12\) then \(a = 0\) and the equation becomes \(2 = 0\), which is not a quadratic equation at all.",
    T + r" \(m = 14\)",
)
SOL["PS2 Q.9"] = S(
    r"Let \(\alpha\) and \(\beta\) be the two roots.",
    r"Given : \(\alpha + \beta = 5\) and \(\alpha^3 + \beta^3 = 35\).",
    r"\(\alpha^3 + \beta^3 = (\alpha + \beta)^3 - 3\alpha\beta(\alpha + \beta)\)",
    T + r" \(35 = (5)^3 - 3\alpha\beta(5)\)",
    T + r" \(35 = 125 - 15\alpha\beta\)",
    T + r" \(15\alpha\beta = 90\)",
    T + r" \(\alpha\beta = 6\)",
    r"The equation is \(x^2 - (\alpha + \beta)x + \alpha\beta = 0\)",
    T + r" \(x^2 - 5x + 6 = 0\)",
)
SOL["PS2 Q.10"] = S(
    r"Let \(\alpha\) and \(\beta\) be the roots of \(2x^2 + 2(p + q)x + p^2 + q^2 = 0\).",
    r"\(\alpha + \beta = -\dfrac{2(p + q)}{2} = -(p + q)\)  and  \(\alpha\beta = \dfrac{p^2 + q^2}{2}\)",
    r"The required roots are \((\alpha + \beta)^2\) and \((\alpha - \beta)^2\).",
    r"\((\alpha + \beta)^2 = (p + q)^2\)",
    r"\((\alpha - \beta)^2 = (\alpha + \beta)^2 - 4\alpha\beta = (p + q)^2 - 2(p^2 + q^2)\)",
    r"\(= p^2 + 2pq + q^2 - 2p^2 - 2q^2 = -(p - q)^2\)",
    r"Sum of the required roots \(= (p + q)^2 - (p - q)^2 = 4pq\)",
    r"Product of the required roots \(= (p + q)^2 \times \left[-(p - q)^2\right] = -\left[(p + q)(p - q)\right]^2 = -(p^2 - q^2)^2\)",
    T + r" the required equation is \(x^2 - 4pqx - (p^2 - q^2)^2 = 0\).",
)
SOL["PS2 Q.11"] = S(
    r"Let the amount Sagar possesses be ₹ \(x\).",
    T + r" Mukund possesses ₹ \((x + 50)\).",
    r"From the given condition,",
    r"\(x(x + 50) = 15000\)",
    T + r" \(x^2 + 50x - 15000 = 0\)",
    T + r" \(x^2 + 150x - 100x - 15000 = 0\)",
    T + r" \(x(x + 150) - 100(x + 150) = 0\)",
    T + r" \((x + 150)(x - 100) = 0\)",
    T + r" \(x = -150\) or \(x = 100\)",
    r"But an amount possessed is never negative, so \(x \neq -150\).",
    T + r" Sagar has ₹ 100 and Mukund has ₹ 150.",
)
SOL["PS2 Q.12"] = S(
    r"Let the greater number be \(x\) and the smaller number be \(y\).",
    r"From the given conditions,",
    r"\(x^2 - y^2 = 120\) ... (I)  and  \(y^2 = 2x\) ... (II)",
    r"Substituting (II) in (I),",
    T + r" \(x^2 - 2x = 120\)",
    T + r" \(x^2 - 2x - 120 = 0\)",
    T + r" \(x^2 - 12x + 10x - 120 = 0\)",
    T + r" \(x(x - 12) + 10(x - 12) = 0\)",
    T + r" \((x - 12)(x + 10) = 0\)",
    T + r" \(x = 12\) or \(x = -10\)",
    r"If \(x = -10\) then \(y^2 = 2(-10) = -20\), which has no real solution, so that value is rejected.",
    T + r" \(x = 12\) and \(y^2 = 24\), so \(y = \sqrt{24}\) or \(y = -\sqrt{24}\).",
    T + r" the numbers are 12 and \(\sqrt{24}\), or 12 and \(-\sqrt{24}\).",
)
SOL["PS2 Q.13"] = S(
    r"Let the number of students be \(x\).",
    r"Each student then gets \(\dfrac{540}{x}\) oranges; with 30 more students each would get \(\dfrac{540}{x + 30}\) oranges.",
    r"From the given condition,",
    r"\(\dfrac{540}{x} - \dfrac{540}{x + 30} = 3\)",
    T + r" \(540\left[\dfrac{(x + 30) - x}{x(x + 30)}\right] = 3\)",
    T + r" \(540 \times 30 = 3x(x + 30)\)",
    T + r" \(16200 = 3x^2 + 90x\)",
    T + r" \(x^2 + 30x - 5400 = 0\)",
    T + r" \(x^2 + 90x - 60x - 5400 = 0\)",
    T + r" \(x(x + 90) - 60(x + 90) = 0\)",
    T + r" \((x + 90)(x - 60) = 0\)",
    T + r" \(x = -90\) or \(x = 60\)",
    r"But the number of students is never negative, so \(x \neq -90\).",
    T + r" the number of students is 60.",
)
SOL["PS2 Q.14"] = S(
    r"Let the breadth of the farm be \(x\) metre.",
    T + r" the length of the farm is \((2x + 10)\) metre and the side of the pond is \(\dfrac{x}{3}\) metre.",
    r"Area of the farm \(= x(2x + 10)\); area of the pond \(= \left(\dfrac{x}{3}\right)^2 = \dfrac{x^2}{9}\).",
    r"From the given condition, the area of the farm is 20 times the area of the pond.",
    r"\(x(2x + 10) = 20 \times \dfrac{x^2}{9}\)",
    T + r" \(9x(2x + 10) = 20x^2\)",
    T + r" \(18x^2 + 90x = 20x^2\)",
    T + r" \(2x^2 - 90x = 0\)",
    T + r" \(2x(x - 45) = 0\)",
    T + r" \(x = 0\) or \(x = 45\)",
    r"But a breadth of 0 is impossible, so \(x \neq 0\).",
    T + r" breadth of the farm is 45 m, length is \(2(45) + 10 = 100\) m, and the side of the pond is \(\dfrac{45}{3} = 15\) m.",
)
SOL["PS2 Q.15"] = S(
    r"Let the larger tap alone take \(x\) hours to fill the tank.",
    T + r" the smaller tap alone takes \((x + 3)\) hours.",
    r"In one hour the larger tap fills \(\dfrac{1}{x}\) of the tank and the smaller fills \(\dfrac{1}{x + 3}\) of it.",
    r"Both together fill the tank in 2 hours, so in one hour they fill \(\dfrac{1}{2}\) of it.",
    r"\(\dfrac{1}{x} + \dfrac{1}{x + 3} = \dfrac{1}{2}\)",
    T + r" \(\dfrac{(x + 3) + x}{x(x + 3)} = \dfrac{1}{2}\)",
    T + r" \(2(2x + 3) = x^2 + 3x\)",
    T + r" \(4x + 6 = x^2 + 3x\)",
    T + r" \(x^2 - x - 6 = 0\)",
    T + r" \(x^2 - 3x + 2x - 6 = 0\)",
    T + r" \(x(x - 3) + 2(x - 3) = 0\)",
    T + r" \((x - 3)(x + 2) = 0\)",
    T + r" \(x = 3\) or \(x = -2\)",
    r"But time is never negative, so \(x \neq -2\).",
    T + r" the larger tap takes 3 hours and the smaller tap takes \(3 + 3 = 6\) hours to fill the tank.",
)


def main():
    with open(os.path.join(HERE, ID + ".all.topaper.json"), encoding="utf-8") as f:
        rows = json.load(f)
    by_ref = {r["ref"]: r["id"] for r in rows}

    out = []
    for ref, sol in SOL.items():
        if ref not in by_ref:
            raise SystemExit("ref not in dump: " + ref)
        out.append({"id": by_ref[ref], "ref": ref, "solution": sol})

    for row in out:
        assert by_ref[row["ref"]] == row["id"], "id/ref pairing broken at " + row["ref"]
    ids = [r["id"] for r in out]
    assert len(set(ids)) == len(ids), "duplicate id emitted"

    path = os.path.join(HERE, ID + ".b.solutions.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("wrote %d solutions -> %s" % (len(out), os.path.basename(path)))

    # coverage of the whole dump, counting part A as well
    apath = os.path.join(HERE, ID + ".a.solutions.json")
    covered = set(SOL)
    if os.path.exists(apath):
        with open(apath, encoding="utf-8") as f:
            covered |= {r["ref"] for r in json.load(f)}
    missing = sorted(set(by_ref) - covered)
    print("dump rows: %d   covered: %d   MISSING: %d" % (len(by_ref), len(covered & set(by_ref)), len(missing)))
    for m in missing:
        print("   MISSING", m)


if __name__ == "__main__":
    main()
