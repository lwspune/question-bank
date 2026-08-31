# Authors the model solutions for Practice sets 2.1 - 2.4 of the Class-10 Algebra
# chapter "Quadratic Equations". Every numeric result was independently derived
# and checked in alg-quadratic-equations-10.verify.py BEFORE this file was
# written; the working below is the human-readable form of that derivation.
#
# Raw strings throughout (r"...") so a backslash reaches the JSON verbatim; lines
# are joined explicitly, never with a literal "\n" inside a raw string.
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ID = "alg-quadratic-equations-10"


def S(*lines):
    return "\n\n".join(lines)


T = r"\(\therefore\)"

SOL = {}

# ── Practice set 2.1 ────────────────────────────────────────────────────────
SOL["Ex 2.1 Q.1"] = S(
    r"Any equation of the form \(ax^2 + bx + c = 0\) with \(a \neq 0\) and one variable whose highest index is 2 will do. For example :",
    r"\(m^2 + 5m + 3 = 0\)",
    r"\(y^2 - 3 = 0\)",
    r"(Both have a single variable and maximum index 2, so both are quadratic equations. Any other such pair is equally correct.)",
)

_q2 = [
    ("(1)", r"\(x^2 + 5x - 2 = 0\)", True,
     r"\(x\) is the only variable and its maximum index is 2, so it is already in the form \(ax^2 + bx + c = 0\) with \(a = 1 \neq 0\)."),
    ("(2)", r"\(y^2 = 5y - 10\)", True,
     r"Rewriting, \(y^2 - 5y + 10 = 0\). \(y\) is the only variable and its maximum index is 2, with \(a = 1 \neq 0\)."),
    ("(3)", r"\(y^2 + \dfrac{1}{y} = 2\)", False,
     r"Multiplying throughout by \(y\) gives \(y^3 + 1 = 2y\), i.e. \(y^3 - 2y + 1 = 0\), in which the maximum index of the variable is 3, not 2."),
    ("(4)", r"\(x + \dfrac{1}{x} = -2\)", True,
     r"Multiplying throughout by \(x\) gives \(x^2 + 1 = -2x\), i.e. \(x^2 + 2x + 1 = 0\), in which \(x\) is the only variable and the maximum index is 2."),
    ("(5)", r"\((m + 2)(m - 5) = 0\)", True,
     r"Expanding, \(m^2 - 5m + 2m - 10 = 0\), i.e. \(m^2 - 3m - 10 = 0\); \(m\) is the only variable with maximum index 2."),
    ("(6)", r"\(m^3 + 3m^2 - 2 = 3m^3\)", False,
     r"Rearranging, \(3m^3 - m^3 - 3m^2 + 2 = 0\), i.e. \(2m^3 - 3m^2 + 2 = 0\), in which the maximum index of the variable is 3, not 2."),
]
for lab, eq, isq, why in _q2:
    SOL["Ex 2.1 Q.2 " + lab] = S(
        eq,
        why,
        T + (r" It is a quadratic equation." if isq else r" It is not a quadratic equation."),
    )

_q3 = [
    ("(1)", r"\(2y = 10 - y^2\)", r"\(y^2 + 2y - 10 = 0\)",
     [r"\(2y = 10 - y^2\)", r"\(y^2 + 2y - 10 = 0\)"], "1", "2", "-10", "y"),
    ("(2)", r"\((x - 1)^2 = 2x + 3\)", r"\(x^2 - 4x - 2 = 0\)",
     [r"\((x - 1)^2 = 2x + 3\)", r"\(x^2 - 2x + 1 = 2x + 3\)", r"\(x^2 - 2x - 2x + 1 - 3 = 0\)", r"\(x^2 - 4x - 2 = 0\)"], "1", "-4", "-2", "x"),
    ("(3)", r"\(x^2 + 5x = -(3 - x)\)", r"\(x^2 + 4x + 3 = 0\)",
     [r"\(x^2 + 5x = -(3 - x)\)", r"\(x^2 + 5x = -3 + x\)", r"\(x^2 + 5x - x + 3 = 0\)", r"\(x^2 + 4x + 3 = 0\)"], "1", "4", "3", "x"),
    ("(4)", r"\(3m^2 = 2m^2 - 9\)", r"\(m^2 + 0m + 9 = 0\)",
     [r"\(3m^2 = 2m^2 - 9\)", r"\(3m^2 - 2m^2 + 9 = 0\)", r"\(m^2 + 9 = 0\), that is \(m^2 + 0m + 9 = 0\)"], "1", "0", "9", "m"),
    ("(5)", r"\(P(3 + 6p) = -5\)", r"\(6p^2 + 3p + 5 = 0\)",
     [r"\(p(3 + 6p) = -5\)", r"\(3p + 6p^2 = -5\)", r"\(6p^2 + 3p + 5 = 0\)"], "6", "3", "5", "p"),
    ("(6)", r"\(x^2 - 9 = 13\)", r"\(x^2 + 0x - 22 = 0\)",
     [r"\(x^2 - 9 = 13\)", r"\(x^2 - 9 - 13 = 0\)", r"\(x^2 - 22 = 0\), that is \(x^2 + 0x - 22 = 0\)"], "1", "0", "-22", "x"),
]
for lab, _eq, _std, steps, A, B, C, var in _q3:
    SOL["Ex 2.1 Q.3 " + lab] = S(
        *steps,
        r"Comparing with \(ax^2 + bx + c = 0\),",
        r"\(a = %s\), \(b = %s\), \(c = %s\)" % (A, B, C),
    )
SOL["Ex 2.1 Q.3 (5)"] = SOL["Ex 2.1 Q.3 (5)"] + "\n\n" + (
    r"(The book prints the outer letter as a capital \(P\) and the one inside the bracket as a lowercase \(p\); "
    r"both stand for the same variable, which is what its own answer \(6p^2 + 3p + 5 = 0\) requires.)"
)

SOL["Ex 2.1 Q.4 (1)"] = S(
    r"Put \(x = 1\) in \(x^2 + 4x - 5\) :",
    r"\((1)^2 + 4(1) - 5 = 1 + 4 - 5 = 0\)",
    T + r" \(x = 1\) is a root of the equation.",
    r"Put \(x = -1\) in \(x^2 + 4x - 5\) :",
    r"\((-1)^2 + 4(-1) - 5 = 1 - 4 - 5 = -8 \neq 0\)",
    T + r" \(x = -1\) is not a root of the equation.",
    r"So 1 is a root and \(-1\) is not.",
)
SOL["Ex 2.1 Q.4 (2)"] = S(
    r"Put \(m = 2\) in \(2m^2 - 5m\) :",
    r"\(2(2)^2 - 5(2) = 8 - 10 = -2 \neq 0\)",
    T + r" \(m = 2\) is not a root of the equation.",
    r"Put \(m = \dfrac{5}{2}\) in \(2m^2 - 5m\) :",
    r"\(2\left(\dfrac{5}{2}\right)^2 - 5\left(\dfrac{5}{2}\right) = 2 \times \dfrac{25}{4} - \dfrac{25}{2} = \dfrac{25}{2} - \dfrac{25}{2} = 0\)",
    T + r" \(m = \dfrac{5}{2}\) is a root of the equation.",
    r"So \(\dfrac{5}{2}\) is a root and 2 is not.",
)
SOL["Ex 2.1 Q.5"] = S(
    r"\(x = 3\) is a root of \(kx^2 - 10x + 3 = 0\), so putting \(x = 3\) must satisfy the equation.",
    r"\(k(3)^2 - 10(3) + 3 = 0\)",
    T + r" \(9k - 30 + 3 = 0\)",
    T + r" \(9k - 27 = 0\)",
    T + r" \(9k = 27\)",
    T + r" \(k = 3\)",
)
SOL["Ex 2.1 Q.6"] = S(
    r"\(\dfrac{-7}{5}\) is a root of quadratic equation \(5m^2 + 2m + k = 0\)",
    T + r" Put \(m = \dfrac{-7}{5}\) in the equation.",
    r"\(5 \times \left(\dfrac{-7}{5}\right)^2 + 2 \times \left(\dfrac{-7}{5}\right) + k = 0\)",
    r"\(\dfrac{49}{5} + \left(\dfrac{-14}{5}\right) + k = 0\)",
    r"\(\dfrac{35}{5} + k = 0\), that is \(7 + k = 0\)",
    r"\(k = -7\)",
)

# ── Practice set 2.2 (factorisation) ────────────────────────────────────────
def fact(eq_lines, split, factors, roots_line, roots_text):
    return S(*(eq_lines + [split] + factors + [roots_line, T + r" " + roots_text]))


SOL["Ex 2.2 Q.1 (1)"] = fact(
    [r"\(x^2 - 15x + 54 = 0\)"],
    T + r" \(x^2 - 9x - 6x + 54 = 0\)   (since \(-9 \times -6 = 54\) and \(-9 - 6 = -15\))",
    [T + r" \(x(x - 9) - 6(x - 9) = 0\)", T + r" \((x - 9)(x - 6) = 0\)"],
    T + r" \(x - 9 = 0\) or \(x - 6 = 0\), so \(x = 9\) or \(x = 6\)",
    r"9 and 6 are the roots of the given quadratic equation.",
)
SOL["Ex 2.2 Q.1 (2)"] = fact(
    [r"\(x^2 + x - 20 = 0\)"],
    T + r" \(x^2 + 5x - 4x - 20 = 0\)   (since \(5 \times -4 = -20\) and \(5 - 4 = 1\))",
    [T + r" \(x(x + 5) - 4(x + 5) = 0\)", T + r" \((x + 5)(x - 4) = 0\)"],
    T + r" \(x + 5 = 0\) or \(x - 4 = 0\), so \(x = -5\) or \(x = 4\)",
    r"\(-5\) and 4 are the roots of the given quadratic equation.",
)
SOL["Ex 2.2 Q.1 (3)"] = fact(
    [r"\(2y^2 + 27y + 13 = 0\)"],
    T + r" \(2y^2 + 26y + y + 13 = 0\)   (since \(26 \times 1 = 26 = 2 \times 13\) and \(26 + 1 = 27\))",
    [T + r" \(2y(y + 13) + 1(y + 13) = 0\)", T + r" \((y + 13)(2y + 1) = 0\)"],
    T + r" \(y + 13 = 0\) or \(2y + 1 = 0\), so \(y = -13\) or \(y = -\dfrac{1}{2}\)",
    r"\(-13\) and \(-\dfrac{1}{2}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.2 Q.1 (4)"] = fact(
    [r"\(5m^2 = 22m + 15\)", T + r" \(5m^2 - 22m - 15 = 0\)"],
    T + r" \(5m^2 - 25m + 3m - 15 = 0\)   (since \(-25 \times 3 = -75 = 5 \times -15\) and \(-25 + 3 = -22\))",
    [T + r" \(5m(m - 5) + 3(m - 5) = 0\)", T + r" \((m - 5)(5m + 3) = 0\)"],
    T + r" \(m - 5 = 0\) or \(5m + 3 = 0\), so \(m = 5\) or \(m = -\dfrac{3}{5}\)",
    r"5 and \(-\dfrac{3}{5}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.2 Q.1 (5)"] = fact(
    [r"\(2x^2 - 2x + \dfrac{1}{2} = 0\)", r"Multiplying throughout by 2,", T + r" \(4x^2 - 4x + 1 = 0\)"],
    T + r" \(4x^2 - 2x - 2x + 1 = 0\)   (since \(-2 \times -2 = 4 = 4 \times 1\) and \(-2 - 2 = -4\))",
    [T + r" \(2x(2x - 1) - 1(2x - 1) = 0\)", T + r" \((2x - 1)(2x - 1) = 0\)"],
    T + r" \(2x - 1 = 0\) or \(2x - 1 = 0\), so \(x = \dfrac{1}{2}\) or \(x = \dfrac{1}{2}\)",
    r"\(\dfrac{1}{2}\) and \(\dfrac{1}{2}\) are the roots of the given quadratic equation; that is, the two roots are equal.",
)
SOL["Ex 2.2 Q.1 (6)"] = fact(
    [r"\(6x - \dfrac{2}{x} = 1\)", r"Multiplying throughout by \(x\) (note \(x \neq 0\)),",
     T + r" \(6x^2 - 2 = x\)", T + r" \(6x^2 - x - 2 = 0\)"],
    T + r" \(6x^2 - 4x + 3x - 2 = 0\)   (since \(-4 \times 3 = -12 = 6 \times -2\) and \(-4 + 3 = -1\))",
    [T + r" \(2x(3x - 2) + 1(3x - 2) = 0\)", T + r" \((3x - 2)(2x + 1) = 0\)"],
    T + r" \(3x - 2 = 0\) or \(2x + 1 = 0\), so \(x = \dfrac{2}{3}\) or \(x = -\dfrac{1}{2}\)",
    r"\(\dfrac{2}{3}\) and \(-\dfrac{1}{2}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.2 Q.1 (7)"] = S(
    r"\(\sqrt{2}\,x^2 + 7x + 5\sqrt{2} = 0\)",
    r"Here \(\sqrt{2} \times 5\sqrt{2} = 10\), and \(5 + 2 = 7\), so the middle term splits as \(5x + 2x\).",
    r"\(\sqrt{2}\,x^2 + 5x + 2x + 5\sqrt{2} = 0\)",
    r"\(x(\sqrt{2}\,x + 5) + \sqrt{2}(\sqrt{2}\,x + 5) = 0\)   (using \(2x = \sqrt{2} \times \sqrt{2}\,x\))",
    r"\((\sqrt{2}\,x + 5)(x + \sqrt{2}) = 0\)",
    r"\((\sqrt{2}\,x + 5) = 0\) or \((x + \sqrt{2}) = 0\)",
    T + r" \(x = -\dfrac{5}{\sqrt{2}}\) or \(x = -\sqrt{2}\)",
    T + r" \(-\dfrac{5}{\sqrt{2}}\) and \(-\sqrt{2}\) are roots of the equation.",
    r"(Filling the book's boxes : the split terms are \(5x\) and \(2x\), the common bracket is \((\sqrt{2}\,x + 5)\), and the remaining root is \(-\dfrac{5}{\sqrt{2}}\), which may also be written \(-\dfrac{5\sqrt{2}}{2}\).)",
)
SOL["Ex 2.2 Q.1 (8)"] = S(
    r"\(3x^2 - 2\sqrt{6}\,x + 2 = 0\)",
    r"Here \(3 \times 2 = 6 = \sqrt{6} \times \sqrt{6}\), and \(-\sqrt{6} - \sqrt{6} = -2\sqrt{6}\), so the middle term splits as \(-\sqrt{6}\,x - \sqrt{6}\,x\).",
    T + r" \(3x^2 - \sqrt{6}\,x - \sqrt{6}\,x + 2 = 0\)",
    T + r" \(\sqrt{3}\,x(\sqrt{3}\,x - \sqrt{2}) - \sqrt{2}(\sqrt{3}\,x - \sqrt{2}) = 0\)",
    T + r" \((\sqrt{3}\,x - \sqrt{2})(\sqrt{3}\,x - \sqrt{2}) = 0\)",
    T + r" \(\sqrt{3}\,x - \sqrt{2} = 0\)",
    T + r" \(x = \dfrac{\sqrt{2}}{\sqrt{3}}\)",
    T + r" \(\dfrac{\sqrt{2}}{\sqrt{3}}\) and \(\dfrac{\sqrt{2}}{\sqrt{3}}\) are the roots of the given quadratic equation; the two roots are equal. (\(\dfrac{\sqrt{2}}{\sqrt{3}}\) is the same number as \(\dfrac{\sqrt{6}}{3}\).)",
)
SOL["Ex 2.2 Q.1 (9)"] = fact(
    [r"\(2m(m - 24) = 50\)", T + r" \(2m^2 - 48m = 50\)", T + r" \(2m^2 - 48m - 50 = 0\)",
     r"Dividing throughout by 2,", T + r" \(m^2 - 24m - 25 = 0\)"],
    T + r" \(m^2 - 25m + m - 25 = 0\)   (since \(-25 \times 1 = -25\) and \(-25 + 1 = -24\))",
    [T + r" \(m(m - 25) + 1(m - 25) = 0\)", T + r" \((m - 25)(m + 1) = 0\)"],
    T + r" \(m - 25 = 0\) or \(m + 1 = 0\), so \(m = 25\) or \(m = -1\)",
    r"25 and \(-1\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.2 Q.1 (10)"] = S(
    r"\(25m^2 = 9\)",
    T + r" \(25m^2 - 9 = 0\)",
    T + r" \((5m)^2 - (3)^2 = 0\)",
    T + r" \((5m + 3)(5m - 3) = 0\)",
    T + r" \(5m + 3 = 0\) or \(5m - 3 = 0\)",
    T + r" \(m = -\dfrac{3}{5}\) or \(m = \dfrac{3}{5}\)",
    T + r" \(-\dfrac{3}{5}\) and \(\dfrac{3}{5}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.2 Q.1 (11)"] = S(
    r"\(7m^2 = 21m\)",
    T + r" \(7m^2 - 21m = 0\)",
    T + r" \(7m(m - 3) = 0\)",
    T + r" \(7m = 0\) or \(m - 3 = 0\)",
    T + r" \(m = 0\) or \(m = 3\)",
    T + r" 0 and 3 are the roots of the given quadratic equation.",
)
SOL["Ex 2.2 Q.1 (12)"] = S(
    r"\(m^2 - 11 = 0\)",
    T + r" \(m^2 - (\sqrt{11})^2 = 0\)",
    T + r" \((m + \sqrt{11})(m - \sqrt{11}) = 0\)",
    T + r" \(m + \sqrt{11} = 0\) or \(m - \sqrt{11} = 0\)",
    T + r" \(m = -\sqrt{11}\) or \(m = \sqrt{11}\)",
    T + r" \(-\sqrt{11}\) and \(\sqrt{11}\) are the roots of the given quadratic equation.",
)

# ── Practice set 2.3 (completing the square) ────────────────────────────────
SOL["Ex 2.3 (1)"] = S(
    r"\(x^2 + x - 20 = 0\)",
    r"Here \(b = 1\), so \(\left(\dfrac{b}{2}\right)^2 = \dfrac{1}{4}\).",
    T + r" \(x^2 + x + \dfrac{1}{4} - \dfrac{1}{4} - 20 = 0\)",
    T + r" \(\left(x + \dfrac{1}{2}\right)^2 - \dfrac{81}{4} = 0\)",
    T + r" \(\left(x + \dfrac{1}{2}\right)^2 = \dfrac{81}{4}\)",
    T + r" \(x + \dfrac{1}{2} = \dfrac{9}{2}\) or \(x + \dfrac{1}{2} = -\dfrac{9}{2}\)",
    T + r" \(x = 4\) or \(x = -5\)",
    T + r" 4 and \(-5\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.3 (2)"] = S(
    r"\(x^2 + 2x - 5 = 0\)",
    r"Here \(b = 2\), so \(\left(\dfrac{b}{2}\right)^2 = 1\).",
    T + r" \(x^2 + 2x + 1 - 1 - 5 = 0\)",
    T + r" \((x + 1)^2 - 6 = 0\)",
    T + r" \((x + 1)^2 = 6\)",
    T + r" \(x + 1 = \sqrt{6}\) or \(x + 1 = -\sqrt{6}\)",
    T + r" \(x = \sqrt{6} - 1\) or \(x = -\sqrt{6} - 1\)",
    T + r" \((\sqrt{6} - 1)\) and \((-\sqrt{6} - 1)\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.3 (3)"] = S(
    r"\(m^2 - 5m = -3\)",
    T + r" \(m^2 - 5m + 3 = 0\)",
    r"Here \(b = -5\), so \(\left(\dfrac{b}{2}\right)^2 = \dfrac{25}{4}\).",
    T + r" \(m^2 - 5m + \dfrac{25}{4} - \dfrac{25}{4} + 3 = 0\)",
    T + r" \(\left(m - \dfrac{5}{2}\right)^2 - \dfrac{13}{4} = 0\)",
    T + r" \(\left(m - \dfrac{5}{2}\right)^2 = \dfrac{13}{4}\)",
    T + r" \(m - \dfrac{5}{2} = \dfrac{\sqrt{13}}{2}\) or \(m - \dfrac{5}{2} = -\dfrac{\sqrt{13}}{2}\)",
    T + r" \(m = \dfrac{\sqrt{13} + 5}{2}\) or \(m = \dfrac{-\sqrt{13} + 5}{2}\)",
    T + r" \(\dfrac{\sqrt{13} + 5}{2}\) and \(\dfrac{-\sqrt{13} + 5}{2}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.3 (4)"] = S(
    r"\(9y^2 - 12y + 2 = 0\)",
    r"Dividing throughout by 9,",
    T + r" \(y^2 - \dfrac{4}{3}y + \dfrac{2}{9} = 0\)",
    r"Here \(b = -\dfrac{4}{3}\), so \(\left(\dfrac{b}{2}\right)^2 = \dfrac{4}{9}\).",
    T + r" \(y^2 - \dfrac{4}{3}y + \dfrac{4}{9} - \dfrac{4}{9} + \dfrac{2}{9} = 0\)",
    T + r" \(\left(y - \dfrac{2}{3}\right)^2 - \dfrac{2}{9} = 0\)",
    T + r" \(\left(y - \dfrac{2}{3}\right)^2 = \dfrac{2}{9}\)",
    T + r" \(y - \dfrac{2}{3} = \dfrac{\sqrt{2}}{3}\) or \(y - \dfrac{2}{3} = -\dfrac{\sqrt{2}}{3}\)",
    T + r" \(y = \dfrac{\sqrt{2} + 2}{3}\) or \(y = \dfrac{-\sqrt{2} + 2}{3}\)",
    T + r" \(\dfrac{\sqrt{2} + 2}{3}\) and \(\dfrac{-\sqrt{2} + 2}{3}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.3 (5)"] = S(
    r"\(2y^2 + 9y + 10 = 0\)",
    r"Dividing throughout by 2,",
    T + r" \(y^2 + \dfrac{9}{2}y + 5 = 0\)",
    r"Here \(b = \dfrac{9}{2}\), so \(\left(\dfrac{b}{2}\right)^2 = \dfrac{81}{16}\).",
    T + r" \(y^2 + \dfrac{9}{2}y + \dfrac{81}{16} - \dfrac{81}{16} + 5 = 0\)",
    T + r" \(\left(y + \dfrac{9}{4}\right)^2 - \dfrac{1}{16} = 0\)",
    T + r" \(\left(y + \dfrac{9}{4}\right)^2 = \dfrac{1}{16}\)",
    T + r" \(y + \dfrac{9}{4} = \dfrac{1}{4}\) or \(y + \dfrac{9}{4} = -\dfrac{1}{4}\)",
    T + r" \(y = -2\) or \(y = -\dfrac{5}{2}\)",
    T + r" \(-2\) and \(-\dfrac{5}{2}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.3 (6)"] = S(
    r"\(5x^2 = 4x + 7\)",
    T + r" \(5x^2 - 4x - 7 = 0\)",
    r"Dividing throughout by 5,",
    T + r" \(x^2 - \dfrac{4}{5}x - \dfrac{7}{5} = 0\)",
    r"Here \(b = -\dfrac{4}{5}\), so \(\left(\dfrac{b}{2}\right)^2 = \dfrac{4}{25}\).",
    T + r" \(x^2 - \dfrac{4}{5}x + \dfrac{4}{25} - \dfrac{4}{25} - \dfrac{7}{5} = 0\)",
    T + r" \(\left(x - \dfrac{2}{5}\right)^2 - \dfrac{39}{25} = 0\)",
    T + r" \(\left(x - \dfrac{2}{5}\right)^2 = \dfrac{39}{25}\)",
    T + r" \(x - \dfrac{2}{5} = \dfrac{\sqrt{39}}{5}\) or \(x - \dfrac{2}{5} = -\dfrac{\sqrt{39}}{5}\)",
    T + r" \(x = \dfrac{2 + \sqrt{39}}{5}\) or \(x = \dfrac{2 - \sqrt{39}}{5}\)",
    T + r" \(\dfrac{2 + \sqrt{39}}{5}\) and \(\dfrac{2 - \sqrt{39}}{5}\) are the roots of the given quadratic equation.",
)

# ── Practice set 2.4 ───────────────────────────────────────────────────────
_q41 = [
    ("(1)", [r"\(x^2 - 7x + 5 = 0\)", r"This is already in the general form \(ax^2 + bx + c = 0\)."], "1", "-7", "5"),
    ("(2)", [r"\(2m^2 = 5m - 5\)", T + r" \(2m^2 - 5m + 5 = 0\)"], "2", "-5", "5"),
    ("(3)", [r"\(y^2 = 7y\)", T + r" \(y^2 - 7y = 0\), that is \(y^2 - 7y + 0 = 0\)"], "1", "-7", "0"),
]
for lab, steps, A, B, C in _q41:
    SOL["Ex 2.4 Q.1 " + lab] = S(
        *steps,
        r"Comparing with \(ax^2 + bx + c = 0\),",
        r"\(a = %s\), \(b = %s\), \(c = %s\)" % (A, B, C),
    )


def formula(head, A, B, C, dsteps, dval, xline, final):
    return S(
        head,
        r"Comparing with \(ax^2 + bx + c = 0\), \(a = %s\), \(b = %s\), \(c = %s\)" % (A, B, C),
        r"\(b^2 - 4ac = %s\)" % dsteps,
        r"\(= %s\)" % dval,
        r"\(x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}\)",
        xline,
        final,
    )


SOL["Ex 2.4 Q.2 (1)"] = formula(
    r"\(x^2 + 6x + 5 = 0\)", "1", "6", "5",
    r"(6)^2 - 4 \times 1 \times 5 = 36 - 20", "16",
    r"\(= \dfrac{-6 \pm \sqrt{16}}{2 \times 1} = \dfrac{-6 \pm 4}{2}\)" + "\n\n"
    + T + r" \(x = \dfrac{-6 + 4}{2} = -1\) or \(x = \dfrac{-6 - 4}{2} = -5\)",
    T + r" \(-1\) and \(-5\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.4 Q.2 (2)"] = formula(
    r"\(x^2 - 3x - 2 = 0\)", "1", "-3", "-2",
    r"(-3)^2 - 4 \times 1 \times (-2) = 9 + 8", "17",
    r"\(= \dfrac{-(-3) \pm \sqrt{17}}{2 \times 1} = \dfrac{3 \pm \sqrt{17}}{2}\)",
    T + r" \(\dfrac{3 + \sqrt{17}}{2}\) and \(\dfrac{3 - \sqrt{17}}{2}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.4 Q.2 (3)"] = formula(
    r"\(3m^2 + 2m - 7 = 0\)", "3", "2", "-7",
    r"(2)^2 - 4 \times 3 \times (-7) = 4 + 84", "88",
    r"\(m = \dfrac{-2 \pm \sqrt{88}}{2 \times 3} = \dfrac{-2 \pm 2\sqrt{22}}{6} = \dfrac{-1 \pm \sqrt{22}}{3}\)",
    T + r" \(\dfrac{-1 + \sqrt{22}}{3}\) and \(\dfrac{-1 - \sqrt{22}}{3}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.4 Q.2 (4)"] = formula(
    r"\(5m^2 - 4m - 2 = 0\)", "5", "-4", "-2",
    r"(-4)^2 - 4 \times 5 \times (-2) = 16 + 40", "56",
    r"\(m = \dfrac{-(-4) \pm \sqrt{56}}{2 \times 5} = \dfrac{4 \pm 2\sqrt{14}}{10} = \dfrac{2 \pm \sqrt{14}}{5}\)",
    T + r" \(\dfrac{2 + \sqrt{14}}{5}\) and \(\dfrac{2 - \sqrt{14}}{5}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.4 Q.2 (5)"] = S(
    r"\(y^2 + \dfrac{1}{3}y = 2\)",
    r"Multiplying throughout by 3,",
    T + r" \(3y^2 + y - 6 = 0\)",
    r"Comparing with \(ay^2 + by + c = 0\), \(a = 3\), \(b = 1\), \(c = -6\)",
    r"\(b^2 - 4ac = (1)^2 - 4 \times 3 \times (-6) = 1 + 72\)",
    r"\(= 73\)",
    r"\(y = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} = \dfrac{-1 \pm \sqrt{73}}{2 \times 3} = \dfrac{-1 \pm \sqrt{73}}{6}\)",
    T + r" \(\dfrac{-1 + \sqrt{73}}{6}\) and \(\dfrac{-1 - \sqrt{73}}{6}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.4 Q.2 (6)"] = formula(
    r"\(5x^2 + 13x + 8 = 0\)", "5", "13", "8",
    r"(13)^2 - 4 \times 5 \times 8 = 169 - 160", "9",
    r"\(= \dfrac{-13 \pm \sqrt{9}}{2 \times 5} = \dfrac{-13 \pm 3}{10}\)" + "\n\n"
    + T + r" \(x = \dfrac{-13 + 3}{10} = -1\) or \(x = \dfrac{-13 - 3}{10} = -\dfrac{8}{5}\)",
    T + r" \(-1\) and \(-\dfrac{8}{5}\) are the roots of the given quadratic equation.",
)
SOL["Ex 2.4 Q.3"] = S(
    r"Following the flow chart :",
    r"Step 1 — compare \(x^2 + 2\sqrt{3}\,x + 3 = 0\) with \(ax^2 + bx + c = 0\) : \(a = 1\), \(b = 2\sqrt{3}\), \(c = 3\)",
    r"Step 2 — \(b^2 - 4ac = (2\sqrt{3})^2 - 4 \times 1 \times 3 = 12 - 12 = 0\)",
    r"Step 3 — the formula is \(x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}\)",
    r"Step 4 — substituting, \(x = \dfrac{-2\sqrt{3} \pm \sqrt{0}}{2 \times 1} = \dfrac{-2\sqrt{3}}{2} = -\sqrt{3}\)",
    T + r" \(-\sqrt{3}\) and \(-\sqrt{3}\) are the roots of the given quadratic equation; the two roots are equal, as \(b^2 - 4ac = 0\) predicts.",
)


def main():
    with open(os.path.join(HERE, ID + ".all.topaper.json"), encoding="utf-8") as f:
        rows = json.load(f)
    by_ref = {}
    for r in rows:
        if r["ref"] in by_ref:
            raise SystemExit("duplicate ref in dump: " + r["ref"])
        by_ref[r["ref"]] = r["id"]

    out = []
    for ref, sol in SOL.items():
        if ref not in by_ref:
            raise SystemExit("ref not in dump: " + ref)
        out.append({"id": by_ref[ref], "ref": ref, "solution": sol})

    # PAIRING gate: every emitted row's id must still pair with its OWN ref.
    for row in out:
        assert by_ref[row["ref"]] == row["id"], "id/ref pairing broken at " + row["ref"]
    ids = [r["id"] for r in out]
    assert len(set(ids)) == len(ids), "duplicate id emitted"

    path = os.path.join(HERE, ID + ".a.solutions.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("wrote %d solutions -> %s" % (len(out), os.path.basename(path)))
    covered = set(SOL)
    print("dump refs not covered by this part: %d" % len(set(by_ref) - covered))


if __name__ == "__main__":
    main()
