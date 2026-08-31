# -*- coding: utf-8 -*-
"""Build data/geo-trigonometry-10.questions.json.

Written as a Python builder rather than hand-written JSON so that every LaTeX
backslash is escaped by json.dump instead of by hand. All content is transcribed
from the rendered page images out/geo-trigonometry-10/p-133..148.png (printed
pp.124-139) — the text layer of this book is arithmetically lossy and was not
used.
"""
import io
import json
import os

Q = []
IDENT = "Trigonometric Ratios and Identities"
HEIGHTS = "Heights and Distances"


def add(ref, bucket, fmt, subtopic, difficulty, stem, **kw):
    row = {"ref": ref, "bucket": bucket, "format": fmt, "subtopic": subtopic,
           "difficulty": difficulty, "stem": stem}
    for k in ("context", "setLabel", "options", "answer", "solution", "note"):
        if k in kw and kw[k] is not None:
            row[k] = kw[k]
    Q.append(row)


def mcq(*texts):
    return [{"label": l, "text": t} for l, t in zip("ABCD", texts)]


# ════════════════════════════════════════════════════════════════════════
# Solved Examples run 1 — printed under the heading "Trigonometric identities"
# (printed pp.128-131). The chapter prints TWO "Solved Examples" banners and
# both restart at Ex. (1), so refs are scoped by their heading.
# ════════════════════════════════════════════════════════════════════════

add("Trigonometric identities SolvedEx.1", "solved", "subjective", IDENT, "EASY",
    r"""If \(\sin\theta = \dfrac{20}{29}\) then find \(\cos\theta\).""",
    solution=r"""**Method I**

1. We have \(\sin^2\theta + \cos^2\theta = 1\).
2. \(\left(\dfrac{20}{29}\right)^2 + \cos^2\theta = 1\)
3. \(\dfrac{400}{841} + \cos^2\theta = 1\)
4. \(\cos^2\theta = 1 - \dfrac{400}{841} = \dfrac{441}{841}\)
5. Taking square root of both sides, \(\cos\theta = \dfrac{21}{29}\).

**Method II**

1. \(\sin\theta = \dfrac{20}{29}\), and from the figure \(\sin\theta = \dfrac{AB}{AC}\).
2. \(\therefore AB = 20k\) and \(AC = 29k\). Let \(BC = x\).
3. According to Pythagoras' theorem, \(AB^2 + BC^2 = AC^2\)
4. \((20k)^2 + x^2 = (29k)^2\)
5. \(400k^2 + x^2 = 841k^2\)
6. \(x^2 = 841k^2 - 400k^2 = 441k^2\)
7. \(\therefore x = 21k\)
8. \(\therefore \cos\theta = \dfrac{BC}{AC} = \dfrac{21k}{29k} = \dfrac{21}{29}\)""")

add("Trigonometric identities SolvedEx.2", "solved", "subjective", IDENT, "EASY",
    r"""If \(\sec\theta = \dfrac{25}{7}\), find the value of \(\tan\theta\).""",
    solution=r"""**Method I**

1. We have \(1 + \tan^2\theta = \sec^2\theta\).
2. \(\therefore 1 + \tan^2\theta = \left(\dfrac{25}{7}\right)^2\)
3. \(\therefore \tan^2\theta = \dfrac{625}{49} - 1 = \dfrac{625 - 49}{49} = \dfrac{576}{49}\)
4. \(\therefore \tan\theta = \dfrac{24}{7}\)

**Method II**

1. From the figure, \(\sec\theta = \dfrac{PR}{PQ}\).
2. \(\therefore PQ = 7k,\ PR = 25k\).
3. According to Pythagoras' theorem, \(PQ^2 + QR^2 = PR^2\)
4. \(\therefore (7k)^2 + QR^2 = (25k)^2\)
5. \(\therefore QR^2 = 625k^2 - 49k^2 = 576k^2\)
6. \(\therefore QR = 24k\)
7. Now, \(\tan\theta = \dfrac{QR}{PQ} = \dfrac{24k}{7k} = \dfrac{24}{7}\)""")

add("Trigonometric identities SolvedEx.3", "solved", "subjective", IDENT, "MODERATE",
    r"""If \(5\sin\theta - 12\cos\theta = 0\), find the values of \(\sec\theta\) and \(\operatorname{cosec}\theta\).""",
    solution=r"""1. \(5\sin\theta - 12\cos\theta = 0\)
2. \(\therefore 5\sin\theta = 12\cos\theta\)
3. \(\therefore \dfrac{\sin\theta}{\cos\theta} = \dfrac{12}{5}\)
4. \(\therefore \tan\theta = \dfrac{12}{5}\)
5. We have \(1 + \tan^2\theta = \sec^2\theta\).
6. \(\therefore 1 + \left(\dfrac{12}{5}\right)^2 = \sec^2\theta\)
7. \(\therefore 1 + \dfrac{144}{25} = \sec^2\theta\)
8. \(\therefore \dfrac{25 + 144}{25} = \sec^2\theta\)
9. \(\therefore \sec^2\theta = \dfrac{169}{25}\)
10. \(\therefore \sec\theta = \dfrac{13}{5}\)
11. \(\therefore \cos\theta = \dfrac{5}{13}\)
12. Now, \(\sin^2\theta + \cos^2\theta = 1\)
13. \(\therefore \sin^2\theta = 1 - \cos^2\theta = 1 - \left(\dfrac{5}{13}\right)^2 = 1 - \dfrac{25}{169} = \dfrac{144}{169}\)
14. \(\therefore \sin\theta = \dfrac{12}{13}\)
15. \(\therefore \operatorname{cosec}\theta = \dfrac{13}{12}\)""")

add("Trigonometric identities SolvedEx.4", "solved", "subjective", IDENT, "MODERATE",
    r"""\(\cos\theta = \dfrac{\sqrt{3}}{2}\) then find the value of \(\dfrac{1 - \sec\theta}{1 + \operatorname{cosec}\theta}\).""",
    solution=r"""**Method I**

1. \(\cos\theta = \dfrac{\sqrt{3}}{2}\), \(\therefore \sec\theta = \dfrac{2}{\sqrt{3}}\)
2. \(\sin^2\theta + \cos^2\theta = 1\)
3. \(\therefore \sin^2\theta + \left(\dfrac{\sqrt{3}}{2}\right)^2 = 1\)
4. \(\therefore \sin^2\theta = 1 - \dfrac{3}{4} = \dfrac{1}{4}\)
5. \(\therefore \sin\theta = \dfrac{1}{2}\), \(\therefore \operatorname{cosec}\theta = 2\)
6. \(\therefore \dfrac{1 - \sec\theta}{1 + \operatorname{cosec}\theta} = \dfrac{1 - \dfrac{2}{\sqrt{3}}}{1 + 2} = \dfrac{\dfrac{\sqrt{3} - 2}{\sqrt{3}}}{3} = \dfrac{\sqrt{3} - 2}{3\sqrt{3}}\)

**Method II**

1. \(\cos\theta = \dfrac{\sqrt{3}}{2}\); we know that \(\cos 30^\circ = \dfrac{\sqrt{3}}{2}\).
2. \(\therefore \theta = 30^\circ\)
3. \(\therefore \sec\theta = \sec 30^\circ = \dfrac{2}{\sqrt{3}}\) and \(\operatorname{cosec}\theta = \operatorname{cosec} 30^\circ = 2\)
4. \(\therefore \dfrac{1 - \sec\theta}{1 + \operatorname{cosec}\theta} = \dfrac{1 - \dfrac{2}{\sqrt{3}}}{1 + 2} = \dfrac{\dfrac{\sqrt{3} - 2}{\sqrt{3}}}{3} = \dfrac{\sqrt{3} - 2}{3\sqrt{3}}\)""")

add("Trigonometric identities SolvedEx.5", "solved", "subjective", IDENT, "MODERATE",
    r"""Show that \(\sec x + \tan x = \sqrt{\dfrac{1 + \sin x}{1 - \sin x}}\).""",
    solution=r"""1. \(\sec x + \tan x = \dfrac{1}{\cos x} + \dfrac{\sin x}{\cos x}\)
2. \(= \dfrac{1 + \sin x}{\cos x}\)
3. \(= \sqrt{\dfrac{(1 + \sin x)^2}{\cos^2 x}}\)
4. \(= \sqrt{\dfrac{(1 + \sin x)(1 + \sin x)}{1 - \sin^2 x}}\)
5. \(= \sqrt{\dfrac{(1 + \sin x)(1 + \sin x)}{(1 - \sin x)(1 + \sin x)}}\)
6. \(= \sqrt{\dfrac{1 + \sin x}{1 - \sin x}}\)
7. \(\therefore \sec x + \tan x = \sqrt{\dfrac{1 + \sin x}{1 - \sin x}}\)""")

add("Trigonometric identities SolvedEx.6", "solved", "subjective", IDENT, "HARD",
    r"""Eliminate \(\theta\) from the given equations.

\(x = a\cot\theta - b\operatorname{cosec}\theta\)

\(y = a\cot\theta + b\operatorname{cosec}\theta\)""",
    note="The printed solution labels the second step 'Subtracting equation (II) from (I)' but then writes y - x = 2b cosec(theta), which is (II) - (I). The RESULT is correct; only the wording of the label is reversed.",
    solution=r"""[Textbook misprint: the book labels step 4 "Subtracting equation (II) from (I)" and then writes \(y - x = 2b\operatorname{cosec}\theta\), which is (II) minus (I). The printed result is correct; only the wording is reversed, and it is given correctly below.]

1. \(x = a\cot\theta - b\operatorname{cosec}\theta\) ..... (I)
2. \(y = a\cot\theta + b\operatorname{cosec}\theta\) ..... (II)
3. Adding equations (I) and (II): \(x + y = 2a\cot\theta\), \(\therefore \cot\theta = \dfrac{x + y}{2a}\) ..... (III)
4. Subtracting equation (I) from (II): \(y - x = 2b\operatorname{cosec}\theta\), \(\therefore \operatorname{cosec}\theta = \dfrac{y - x}{2b}\) ..... (IV)
5. Now, \(\operatorname{cosec}^2\theta - \cot^2\theta = 1\)
6. \(\therefore \left(\dfrac{y - x}{2b}\right)^2 - \left(\dfrac{y + x}{2a}\right)^2 = 1\)
7. \(\therefore \dfrac{(y - x)^2}{4b^2} - \dfrac{(y + x)^2}{4a^2} = 1\)
8. or \(\left(\dfrac{y - x}{b}\right)^2 - \left(\dfrac{y + x}{a}\right)^2 = 4\)""")

# ════════════════════════════════════════════════════════════════════════
# Practice set 6.1 (printed pp.131-132)
# ════════════════════════════════════════════════════════════════════════

add("Ex 6.1 Q.1", "exercise-subjective", "subjective", IDENT, "EASY",
    r"""If \(\sin\theta = \dfrac{7}{25}\), find the values of \(\cos\theta\) and \(\tan\theta\).""")

add("Ex 6.1 Q.2", "exercise-subjective", "subjective", IDENT, "EASY",
    r"""If \(\tan\theta = \dfrac{3}{4}\), find the values of \(\sec\theta\) and \(\cos\theta\).""")

add("Ex 6.1 Q.3", "exercise-subjective", "subjective", IDENT, "EASY",
    r"""If \(\cot\theta = \dfrac{40}{9}\), find the values of \(\operatorname{cosec}\theta\) and \(\sin\theta\).""")

add("Ex 6.1 Q.4", "exercise-subjective", "subjective", IDENT, "MODERATE",
    r"""If \(5\sec\theta - 12\operatorname{cosec}\theta = 0\), find the values of \(\sec\theta\), \(\cos\theta\) and \(\sin\theta\).""")

add("Ex 6.1 Q.5", "exercise-subjective", "subjective", IDENT, "MODERATE",
    r"""If \(\tan\theta = 1\) then, find the values of \(\dfrac{\sin\theta + \cos\theta}{\sec\theta + \operatorname{cosec}\theta}\).""")

PROVE_61 = "Prove that:"
_p61 = [
    ("(1)", r"""\(\dfrac{\sin^2\theta}{\cos\theta} + \cos\theta = \sec\theta\)""", "EASY"),
    ("(2)", r"""\(\cos^2\theta(1 + \tan^2\theta) = 1\)""", "EASY"),
    ("(3)", r"""\(\sqrt{\dfrac{1 - \sin\theta}{1 + \sin\theta}} = \sec\theta - \tan\theta\)""", "MODERATE"),
    ("(4)", r"""\((\sec\theta - \cos\theta)(\cot\theta + \tan\theta) = \tan\theta\,\sec\theta\)""", "MODERATE"),
    ("(5)", r"""\(\cot\theta + \tan\theta = \operatorname{cosec}\theta\,\sec\theta\)""", "EASY"),
    ("(6)", r"""\(\dfrac{1}{\sec\theta - \tan\theta} = \sec\theta + \tan\theta\)""", "MODERATE"),
    ("(7)", r"""\(\sin^4\theta - \cos^4\theta = 1 - 2\cos^2\theta\)""", "MODERATE"),
    ("(8)", r"""\(\sec\theta + \tan\theta = \dfrac{\cos\theta}{1 - \sin\theta}\)""", "MODERATE"),
    ("(9)", r"""If \(\tan\theta + \dfrac{1}{\tan\theta} = 2\), then show that \(\tan^2\theta + \dfrac{1}{\tan^2\theta} = 2\)""", "MODERATE"),
    ("(10)", r"""\(\dfrac{\tan A}{\left(1 + \tan^2 A\right)^2} + \dfrac{\cot A}{\left(1 + \cot^2 A\right)^2} = \sin A\cos A\)""", "HARD"),
    ("(11)", r"""\(\sec^4 A\,(1 - \sin^4 A) - 2\tan^2 A = 1\)""", "HARD"),
    ("(12)", r"""\(\dfrac{\tan\theta}{\sec\theta - 1} = \dfrac{\tan\theta + \sec\theta + 1}{\tan\theta + \sec\theta - 1}\)""", "HARD"),
]
for label, body, diff in _p61:
    add(f"Ex 6.1 Q.6 {label}", "exercise-subjective", "subjective", IDENT, diff,
        body, context=PROVE_61, setLabel="Practice set 6.1 Q.6")

# ════════════════════════════════════════════════════════════════════════
# Solved Examples run 2 — printed under the heading "Application of
# trigonometry" (printed pp.133-137).
# ════════════════════════════════════════════════════════════════════════

add("Application of trigonometry SolvedEx.1", "solved", "subjective", HEIGHTS, "EASY",
    r"""An observer at a distance of 10 m from a tree looks at the top of the tree, the angle of elevation is \(60^\circ\). What is the height of the tree? \((\sqrt{3} = 1.73)\)""",
    solution=r"""In figure 6.9, \(AB = h =\) height of the tree.

1. \(BC = 10\) m, distance of the observer from the tree.
2. Angle of elevation \((\theta) = \angle BCA = 60^\circ\)
3. From the figure, \(\tan\theta = \dfrac{AB}{BC}\) ..... (I)
4. \(\tan 60^\circ = \sqrt{3}\) ..... (II)
5. \(\therefore \dfrac{AB}{BC} = \sqrt{3}\) ..... from equations (I) and (II)
6. \(\therefore AB = BC\sqrt{3} = 10\sqrt{3}\)
7. \(\therefore AB = 10 \times 1.73 = 17.3\) m
8. \(\therefore\) the height of the tree is 17.3 m.""")

add("Application of trigonometry SolvedEx.2", "solved", "subjective", HEIGHTS, "EASY",
    r"""From the top of a building, an observer is looking at a scooter parked at some distance away, makes an angle of depression of \(30^\circ\). If the height of the building is 40 m, find how far the scooter is from the building. \((\sqrt{3} = 1.73)\)""",
    solution=r"""In figure 6.10, \(AB\) is the building. A scooter is at \(C\), which is '\(x\)' m away from the building. In the figure, 'A' is the position of the observer.

1. \(AM\) is the horizontal line and \(\angle MAC\) is the angle of depression.
2. \(\angle MAC\) and \(\angle ACB\) are alternate angles, so \(\angle ACB = 30^\circ\).
3. From the figure, \(\tan 30^\circ = \dfrac{AB}{BC}\)
4. \(\therefore \dfrac{1}{\sqrt{3}} = \dfrac{40}{x}\)
5. \(\therefore x = 40\sqrt{3} = 40 \times 1.73 = 69.20\) m
6. \(\therefore\) the scooter is 69.20 m away from the building.""")

add("Application of trigonometry SolvedEx.3", "solved", "subjective", HEIGHTS, "HARD",
    r"""To find the width of the river, a man observes the top of a tower on the opposite bank making an angle of elevation of \(61^\circ\). When he moves 50 m backword from bank and observes the same top of the tower, his line of vision makes an angle of elevation of \(35^\circ\). Find the height of the tower and width of the river. \((\tan 61^\circ = 1.8,\ \tan 35^\circ = 0.7)\)""",
    note="The stem prints 'backword'; the intended word is 'backward'. Transcribed as printed.",
    solution=r"""seg \(AB\) shows the tower on the opposite bank. 'A' is the top of the tower and seg \(BC\) shows the width of the river. Let '\(h\)' be the height of the tower and '\(x\)' be the width of the river.

1. From the figure, \(\tan 61^\circ = \dfrac{h}{x}\)
2. \(\therefore 1.8 = \dfrac{h}{x}\), \(\quad h = 1.8 \times x\)
3. \(\therefore 10h = 18x\) ..... (I) ..... multiplying by 10
4. In right angled \(\triangle ABD\), \(\tan 35^\circ = \dfrac{h}{x + 50}\)
5. \(\therefore 0.7 = \dfrac{h}{x + 50}\)
6. \(\therefore h = 0.7(x + 50)\)
7. \(\therefore 10h = 7(x + 50)\) ..... (II)
8. \(\therefore\) from equations (I) and (II), \(18x = 7(x + 50)\)
9. \(\therefore 18x = 7x + 350\)
10. \(\therefore 11x = 350\)
11. \(\therefore x = \dfrac{350}{11} = 31.82\)
12. Now, \(h = 1.8x = 1.8 \times 31.82 = 57.28\) m
13. \(\therefore\) width of the river \(= 31.82\) m and height of tower \(= 57.28\) m.""")

add("Application of trigonometry SolvedEx.4", "solved", "subjective", HEIGHTS, "HARD",
    r"""Roshani saw an eagle on the top of a tree at an angle of elevation of \(61^\circ\), while she was standing at the door of her house. She went on the terrace of the house so that she could see it clearly. The terrace was at a height of 4 m. While observing the eagle from there the angle of elevation was \(52^\circ\). At what height from the ground was the eagle? (Find the answer correct upto nearest integer)

\((\tan 61^\circ = 1.80,\ \tan 52^\circ = 1.28,\ \tan 29^\circ = 0.55,\ \tan 38^\circ = 0.78)\)""",
    solution=r"""In figure 6.12, \(PQ\) is the house and \(SR\) is the tree. The eagle is at \(R\). Draw seg \(QT \perp\) seg \(RS\). \(\therefore \square TSPQ\) is a rectangle. Let \(SP = x\) and \(TR = y\).

1. Now in \(\triangle RSP\), \(\angle PRS = 90^\circ - 61^\circ = 29^\circ\)
2. and in \(\triangle RTQ\), \(\angle QRT = 90^\circ - 52^\circ = 38^\circ\)
3. \(\therefore \tan\angle PRS = \tan 29^\circ = \dfrac{SP}{RS}\)
4. \(\therefore 0.55 = \dfrac{x}{y + 4}\)
5. \(\therefore x = 0.55(y + 4)\) ..... (I)
6. Similarly, \(\tan\angle QRT = \dfrac{TQ}{RT}\)
7. \(\therefore \tan 38^\circ = \dfrac{x}{y}\) ..... \([\because SP = TQ = x]\)
8. \(\therefore 0.78 = \dfrac{x}{y}\)
9. \(\therefore x = 0.78y\) ..... (II)
10. \(\therefore 0.78y = 0.55(y + 4)\) ..... from (I) and (II)
11. \(\therefore 78y = 55(y + 4)\)
12. \(\therefore 78y = 55y + 220\)
13. \(\therefore 23y = 220\)
14. \(\therefore y = 9.565 = 10\) (upto nearest integer)
15. \(\therefore RS = y + 4 = 10 + 4 = 14\)
16. \(\therefore\) the eagle was at a height of 14 metre from the ground.""")

add("Application of trigonometry SolvedEx.5", "solved", "subjective", HEIGHTS, "MODERATE",
    r"""A tree was broken due to storm. Its broken upper part was so inclined that its top touched the ground making an angle of \(30^\circ\) with the ground. The distance from the foot of the tree and the point where the top touched the ground was 10 metre. What was the height of the tree.""",
    solution=r"""[Textbook note: the printed solution jumps straight from \(x = \dfrac{10}{\sqrt{3}}\) to \(y = \dfrac{20}{\sqrt{3}}\) with no working. Step 4 below supplies the missing step; the printed value of \(y\) is correct.]

As shown in figure 6.13, suppose \(AB\) is the tree. It was broken at 'C' and its top touched at 'D'.

1. \(\angle CDB = 30^\circ\), \(BD = 10\) m, \(BC = x\) m, \(CA = CD = y\) m (the broken part \(CA\) fell over to become \(CD\), so these two are equal).
2. In right angled \(\triangle CDB\), \(\tan 30^\circ = \dfrac{BC}{BD}\)
3. \(\therefore \dfrac{1}{\sqrt{3}} = \dfrac{x}{10}\), \(\quad \therefore x = \dfrac{10}{\sqrt{3}}\)
4. Also \(\cos 30^\circ = \dfrac{BD}{CD}\), \(\therefore \dfrac{\sqrt{3}}{2} = \dfrac{10}{y}\), \(\quad \therefore y = \dfrac{20}{\sqrt{3}}\)
5. \(x + y = \dfrac{10}{\sqrt{3}} + \dfrac{20}{\sqrt{3}} = \dfrac{30}{\sqrt{3}}\)
6. \(\therefore x + y = 10\sqrt{3}\)
7. \(\therefore\) the height of the tree was \(10\sqrt{3}\) m.
""")

# ════════════════════════════════════════════════════════════════════════
# Practice set 6.2 (printed p.137)
# ════════════════════════════════════════════════════════════════════════

add("Ex 6.2 Q.1", "exercise-subjective", "subjective", HEIGHTS, "EASY",
    r"""A person is standing at a distance of 80 m from a church looking at its top. The angle of elevation is of \(45^\circ\). Find the height of the church.""")

add("Ex 6.2 Q.2", "exercise-subjective", "subjective", HEIGHTS, "EASY",
    r"""From the top of a lighthouse, an observer looking at a ship makes angle of depression of \(60^\circ\). If the height of the lighthouse is 90 metre, then find how far the ship is from the lighthouse. \((\sqrt{3} = 1.73)\)""")

add("Ex 6.2 Q.3", "exercise-subjective", "subjective", HEIGHTS, "MODERATE",
    r"""Two buildings are facing each other on a road of width 12 metre. From the top of the first building, which is 10 metre high, the angle of elevation of the top of the second is found to be \(60^\circ\). What is the height of the second building?""")

add("Ex 6.2 Q.4", "exercise-subjective", "subjective", HEIGHTS, "MODERATE",
    r"""Two poles of heights 18 metre and 7 metre are erected on a ground. The length of the wire fastened at their tops in 22 metre. Find the angle made by the wire with the horizontal.""",
    note="The stem prints 'fastened at their tops in 22 metre'; 'in' is a misprint for 'is'. Transcribed as printed.")

add("Ex 6.2 Q.5", "exercise-subjective", "subjective", HEIGHTS, "MODERATE",
    r"""A storm broke a tree and the treetop rested 20 m from the base of the tree, making an angle of \(60^\circ\) with the horizontal. Find the height of the tree.""")

add("Ex 6.2 Q.6", "exercise-subjective", "subjective", HEIGHTS, "EASY",
    r"""A kite is flying at a height of 60 m above the ground. The string attached to the kite is tied at the ground. It makes an angle of \(60^\circ\) with the ground. Assuming that the string is straight, find the length of the string. \((\sqrt{3} = 1.73)\)""")

# ════════════════════════════════════════════════════════════════════════
# Problem set 6 (printed pp.138-139)
# ════════════════════════════════════════════════════════════════════════

MCQ_CTX = "Choose the correct alternative answer for the following questions."
add("PS6 Q.1 (1)", "exercise-mcq", "mcq", IDENT, "EASY",
    r"""\(\sin\theta\,\operatorname{cosec}\theta = \) ?""",
    context=MCQ_CTX, setLabel="Problem set 6 Q.1",
    options=mcq(r"""\(1\)""", r"""\(0\)""", r"""\(\dfrac{1}{2}\)""", r"""\(\sqrt{2}\)"""),
    answer="A")

add("PS6 Q.1 (2)", "exercise-mcq", "mcq", IDENT, "EASY",
    r"""\(\operatorname{cosec} 45^\circ = \) ?""",
    context=MCQ_CTX, setLabel="Problem set 6 Q.1",
    options=mcq(r"""\(\dfrac{1}{\sqrt{2}}\)""", r"""\(\sqrt{2}\)""", r"""\(\dfrac{\sqrt{3}}{2}\)""", r"""\(\dfrac{2}{\sqrt{3}}\)"""),
    answer="B")

add("PS6 Q.1 (3)", "exercise-mcq", "mcq", IDENT, "EASY",
    r"""\(1 + \tan^2\theta = \) ?""",
    context=MCQ_CTX, setLabel="Problem set 6 Q.1",
    options=mcq(r"""\(\cot^2\theta\)""", r"""\(\operatorname{cosec}^2\theta\)""", r"""\(\sec^2\theta\)""", r"""\(\tan^2\theta\)"""),
    answer="C")

add("PS6 Q.1 (4)", "exercise-mcq", "mcq", HEIGHTS, "EASY",
    r"""When we see at a higher level, from the horizontal line, angle formed is .........""",
    context=MCQ_CTX, setLabel="Problem set 6 Q.1",
    options=mcq("angle of elevation.", "angle of depression.", r"""\(0\)""", "straight angle."),
    answer="A")

add("PS6 Q.2", "exercise-subjective", "subjective", IDENT, "EASY",
    r"""If \(\sin\theta = \dfrac{11}{61}\), find the values of \(\cos\theta\) using trigonometric identity.""")

add("PS6 Q.3", "exercise-subjective", "subjective", IDENT, "MODERATE",
    r"""If \(\tan\theta = 2\), find the values of other trigonometric ratios.""")

add("PS6 Q.4", "exercise-subjective", "subjective", IDENT, "MODERATE",
    r"""If \(\sec\theta = \dfrac{13}{12}\), find the values of other trigonometric ratios.""")

PROVE_PS6 = "Prove the following."
_ps6 = [
    ("(1)", r"""\(\sec\theta\,(1 - \sin\theta)(\sec\theta + \tan\theta) = 1\)""", "MODERATE"),
    ("(2)", r"""\((\sec\theta + \tan\theta)(1 - \sin\theta) = \cos\theta\)""", "EASY"),
    ("(3)", r"""\(\sec^2\theta + \operatorname{cosec}^2\theta = \sec^2\theta \times \operatorname{cosec}^2\theta\)""", "MODERATE"),
    ("(4)", r"""\(\cot^2\theta - \tan^2\theta = \operatorname{cosec}^2\theta - \sec^2\theta\)""", "EASY"),
    ("(5)", r"""\(\tan^4\theta + \tan^2\theta = \sec^4\theta - \sec^2\theta\)""", "MODERATE"),
    ("(6)", r"""\(\dfrac{1}{1 - \sin\theta} + \dfrac{1}{1 + \sin\theta} = 2\sec^2\theta\)""", "MODERATE"),
    ("(7)", r"""\(\sec^6 x - \tan^6 x = 1 + 3\sec^2 x \times \tan^2 x\)""", "HARD"),
    ("(8)", r"""\(\dfrac{\tan\theta}{\sec\theta + 1} = \dfrac{\sec\theta - 1}{\tan\theta}\)""", "MODERATE"),
    ("(9)", r"""\(\dfrac{\tan^3\theta - 1}{\tan\theta - 1} = \sec^2\theta + \tan\theta\)""", "HARD"),
    ("(10)", r"""\(\dfrac{\sin\theta - \cos\theta + 1}{\sin\theta + \cos\theta - 1} = \dfrac{1}{\sec\theta - \tan\theta}\)""", "HARD"),
]
for label, body, diff in _ps6:
    add(f"PS6 Q.5 {label}", "exercise-subjective", "subjective", IDENT, diff,
        body, context=PROVE_PS6, setLabel="Problem set 6 Q.5")

add("PS6 Q.6", "exercise-subjective", "subjective", HEIGHTS, "EASY",
    r"""A boy standing at a distance of 48 meters from a building observes the top of the building and makes an angle of elevation of \(30^\circ\). Find the height of the building.""")

add("PS6 Q.7", "exercise-subjective", "subjective", HEIGHTS, "EASY",
    r"""From the top of the light house, an observer looks at a ship and finds the angle of depression to be \(30^\circ\). If the height of the light-house is 100 meters, then find how far the ship is from the light-house.""")

add("PS6 Q.8", "exercise-subjective", "subjective", HEIGHTS, "MODERATE",
    r"""Two buildings are in front of each other on a road of width 15 meters. From the top of the first building, having a height of 12 meter, the angle of elevation of the top of the second building is \(30^\circ\). What is the height of the second building?""")

add("PS6 Q.9", "exercise-subjective", "subjective", HEIGHTS, "MODERATE",
    r"""A ladder on the platform of a fire brigade van can be elevated at an angle of \(70^\circ\) to the maximum. The length of the ladder can be extended upto 20 m. If the platform is 2 m above the ground, find the maximum height from the ground upto which the ladder can reach. \((\sin 70^\circ = 0.94)\)""")

add("PS6 Q.10", "exercise-subjective", "subjective", HEIGHTS, "HARD",
    r"""While landing at an airport, a pilot made an angle of depression of \(20^\circ\). Average speed of the plane was 200 km/hr. The plane reached the ground after 54 seconds. Find the height at which the plane was when it started landing. \((\sin 20^\circ = 0.342)\)

[Note: marked \(\star\) (challenging) in the textbook.]""")

# ── write ────────────────────────────────────────────────────────────────
here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = os.path.join(here, "data", "geo-trigonometry-10.questions.json")
with io.open(out, "w", encoding="utf-8") as f:
    json.dump(Q, f, ensure_ascii=False, indent=2)
    f.write("\n")

refs = [q["ref"] for q in Q]
assert len(refs) == len(set(refs)), "duplicate refs"
print(f"wrote {len(Q)} questions -> {out}")
from collections import Counter
print("buckets :", dict(Counter(q["bucket"] for q in Q)))
print("formats :", dict(Counter(q["format"] for q in Q)))
print("subtopic:", dict(Counter(q["subtopic"] for q in Q)))
print("first/last:", refs[0], "|", refs[-1])
