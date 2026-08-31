# -*- coding: utf-8 -*-
"""Build data/geo-trigonometry-10.solutions.json.

Authored strictly from the chapter's own toolkit (printed pp.124-139):
  - the reciprocal relations sin x cosec = 1, cos x sec = 1, tan x cot = 1
  - tan = sin/cos, cot = cos/sin
  - the three identities: sin^2+cos^2 = 1, 1+cot^2 = cosec^2, 1+tan^2 = sec^2
  - the 0/30/45/60/90 ratio table on printed p.127
  - angle of elevation / angle of depression, and Pythagoras' theorem
Nothing outside that list is used.

Solutions are joined to live ids ON ref from the topaper dump, and the emitted
ref->id pairing is asserted row by row against the dump's own pairing: a dropped
row that shifts the tail is a PERMUTATION, which every count/set check passes.
"""
import io
import json
import os

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(HERE, "data")

with io.open(os.path.join(DATA, "geo-trigonometry-10.all.topaper.json"), encoding="utf-8") as f:
    DUMP = json.load(f)
BY_REF = {r["ref"]: r["id"] for r in DUMP}
assert len(BY_REF) == len(DUMP), "duplicate ref in the dump"

SOL = {}


def s(ref, text):
    assert ref not in SOL, f"duplicate solution for {ref}"
    SOL[ref] = text.strip()


# ══════════════════════════════════════════════════════════════════════════
# Practice set 6.1 — Q.1 to Q.5 (numeric, all keyed)
# ══════════════════════════════════════════════════════════════════════════

s("Ex 6.1 Q.1", r"""
1. \(\sin\theta = \dfrac{7}{25}\)
2. We have \(\sin^2\theta + \cos^2\theta = 1\).
3. \(\therefore \cos^2\theta = 1 - \left(\dfrac{7}{25}\right)^2 = 1 - \dfrac{49}{625} = \dfrac{576}{625}\)
4. \(\therefore \cos\theta = \dfrac{24}{25}\)
5. \(\tan\theta = \dfrac{\sin\theta}{\cos\theta} = \dfrac{7/25}{24/25} = \dfrac{7}{24}\)
6. \(\therefore \cos\theta = \dfrac{24}{25}\) and \(\tan\theta = \dfrac{7}{24}\).
""")

s("Ex 6.1 Q.2", r"""
1. \(\tan\theta = \dfrac{3}{4}\)
2. We have \(1 + \tan^2\theta = \sec^2\theta\).
3. \(\therefore \sec^2\theta = 1 + \left(\dfrac{3}{4}\right)^2 = 1 + \dfrac{9}{16} = \dfrac{25}{16}\)
4. \(\therefore \sec\theta = \dfrac{5}{4}\)
5. \(\cos\theta = \dfrac{1}{\sec\theta} = \dfrac{4}{5}\)
6. \(\therefore \sec\theta = \dfrac{5}{4}\) and \(\cos\theta = \dfrac{4}{5}\).
""")

s("Ex 6.1 Q.3", r"""
1. \(\cot\theta = \dfrac{40}{9}\)
2. We have \(1 + \cot^2\theta = \operatorname{cosec}^2\theta\).
3. \(\therefore \operatorname{cosec}^2\theta = 1 + \left(\dfrac{40}{9}\right)^2 = 1 + \dfrac{1600}{81} = \dfrac{1681}{81}\)
4. \(\therefore \operatorname{cosec}\theta = \dfrac{41}{9}\)
5. \(\sin\theta = \dfrac{1}{\operatorname{cosec}\theta} = \dfrac{9}{41}\)
6. \(\therefore \operatorname{cosec}\theta = \dfrac{41}{9}\) and \(\sin\theta = \dfrac{9}{41}\).
""")

s("Ex 6.1 Q.4", r"""
1. \(5\sec\theta - 12\operatorname{cosec}\theta = 0\)
2. \(\therefore 5\sec\theta = 12\operatorname{cosec}\theta\), that is \(\dfrac{5}{\cos\theta} = \dfrac{12}{\sin\theta}\)
3. \(\therefore 5\sin\theta = 12\cos\theta\), \(\quad \therefore \dfrac{\sin\theta}{\cos\theta} = \dfrac{12}{5}\), \(\quad \therefore \tan\theta = \dfrac{12}{5}\)
4. We have \(1 + \tan^2\theta = \sec^2\theta\).
5. \(\therefore \sec^2\theta = 1 + \dfrac{144}{25} = \dfrac{169}{25}\), \(\quad \therefore \sec\theta = \dfrac{13}{5}\)
6. \(\cos\theta = \dfrac{1}{\sec\theta} = \dfrac{5}{13}\)
7. \(\sin\theta = \tan\theta \times \cos\theta = \dfrac{12}{5} \times \dfrac{5}{13} = \dfrac{12}{13}\)
8. \(\therefore \sec\theta = \dfrac{13}{5},\ \cos\theta = \dfrac{5}{13},\ \sin\theta = \dfrac{12}{13}\).
""")

s("Ex 6.1 Q.5", r"""
1. \(\tan\theta = 1\), and from the table of ratios \(\tan 45^\circ = 1\), so \(\theta = 45^\circ\).
2. \(\therefore \sin\theta = \dfrac{1}{\sqrt{2}},\ \cos\theta = \dfrac{1}{\sqrt{2}},\ \sec\theta = \sqrt{2},\ \operatorname{cosec}\theta = \sqrt{2}\)
3. \(\sin\theta + \cos\theta = \dfrac{1}{\sqrt{2}} + \dfrac{1}{\sqrt{2}} = \dfrac{2}{\sqrt{2}} = \sqrt{2}\)
4. \(\sec\theta + \operatorname{cosec}\theta = \sqrt{2} + \sqrt{2} = 2\sqrt{2}\)
5. \(\therefore \dfrac{\sin\theta + \cos\theta}{\sec\theta + \operatorname{cosec}\theta} = \dfrac{\sqrt{2}}{2\sqrt{2}} = \dfrac{1}{2}\)
""")

# ══════════════════════════════════════════════════════════════════════════
# Practice set 6.1 Q.6 — twelve proofs (no printed key)
# ══════════════════════════════════════════════════════════════════════════

s("Ex 6.1 Q.6 (1)", r"""
1. LHS \(= \dfrac{\sin^2\theta}{\cos\theta} + \cos\theta\)
2. \(= \dfrac{\sin^2\theta + \cos^2\theta}{\cos\theta}\)  ..... taking \(\cos\theta\) as the common denominator
3. \(= \dfrac{1}{\cos\theta}\)  ..... since \(\sin^2\theta + \cos^2\theta = 1\)
4. \(= \sec\theta = \) RHS
5. \(\therefore \dfrac{\sin^2\theta}{\cos\theta} + \cos\theta = \sec\theta\)
""")

s("Ex 6.1 Q.6 (2)", r"""
1. LHS \(= \cos^2\theta(1 + \tan^2\theta)\)
2. \(= \cos^2\theta \times \sec^2\theta\)  ..... since \(1 + \tan^2\theta = \sec^2\theta\)
3. \(= (\cos\theta \times \sec\theta)^2\)
4. \(= 1^2 = 1 = \) RHS  ..... since \(\cos\theta \times \sec\theta = 1\)
5. \(\therefore \cos^2\theta(1 + \tan^2\theta) = 1\)
""")

s("Ex 6.1 Q.6 (3)", r"""
1. LHS \(= \sqrt{\dfrac{1 - \sin\theta}{1 + \sin\theta}}\)
2. Multiplying the numerator and the denominator by \((1 - \sin\theta)\),
3. \(= \sqrt{\dfrac{(1 - \sin\theta)(1 - \sin\theta)}{(1 + \sin\theta)(1 - \sin\theta)}} = \sqrt{\dfrac{(1 - \sin\theta)^2}{1 - \sin^2\theta}}\)
4. \(= \sqrt{\dfrac{(1 - \sin\theta)^2}{\cos^2\theta}}\)  ..... since \(\sin^2\theta + \cos^2\theta = 1\), so \(1 - \sin^2\theta = \cos^2\theta\)
5. \(= \dfrac{1 - \sin\theta}{\cos\theta}\)
6. \(= \dfrac{1}{\cos\theta} - \dfrac{\sin\theta}{\cos\theta} = \sec\theta - \tan\theta = \) RHS
7. \(\therefore \sqrt{\dfrac{1 - \sin\theta}{1 + \sin\theta}} = \sec\theta - \tan\theta\)
""")

s("Ex 6.1 Q.6 (4)", r"""
1. \(\sec\theta - \cos\theta = \dfrac{1}{\cos\theta} - \cos\theta = \dfrac{1 - \cos^2\theta}{\cos\theta} = \dfrac{\sin^2\theta}{\cos\theta}\)
2. \(\cot\theta + \tan\theta = \dfrac{\cos\theta}{\sin\theta} + \dfrac{\sin\theta}{\cos\theta} = \dfrac{\cos^2\theta + \sin^2\theta}{\sin\theta\cos\theta} = \dfrac{1}{\sin\theta\cos\theta}\)
3. \(\therefore\) LHS \(= \dfrac{\sin^2\theta}{\cos\theta} \times \dfrac{1}{\sin\theta\cos\theta} = \dfrac{\sin\theta}{\cos^2\theta}\)
4. \(= \dfrac{\sin\theta}{\cos\theta} \times \dfrac{1}{\cos\theta} = \tan\theta\,\sec\theta = \) RHS
5. \(\therefore (\sec\theta - \cos\theta)(\cot\theta + \tan\theta) = \tan\theta\,\sec\theta\)
""")

s("Ex 6.1 Q.6 (5)", r"""
1. LHS \(= \cot\theta + \tan\theta = \dfrac{\cos\theta}{\sin\theta} + \dfrac{\sin\theta}{\cos\theta}\)
2. \(= \dfrac{\cos^2\theta + \sin^2\theta}{\sin\theta\cos\theta}\)
3. \(= \dfrac{1}{\sin\theta\cos\theta}\)  ..... since \(\sin^2\theta + \cos^2\theta = 1\)
4. \(= \dfrac{1}{\sin\theta} \times \dfrac{1}{\cos\theta} = \operatorname{cosec}\theta\,\sec\theta = \) RHS
5. \(\therefore \cot\theta + \tan\theta = \operatorname{cosec}\theta\,\sec\theta\)
""")

s("Ex 6.1 Q.6 (6)", r"""
1. We have \(1 + \tan^2\theta = \sec^2\theta\), \(\therefore \sec^2\theta - \tan^2\theta = 1\).
2. \(\therefore (\sec\theta - \tan\theta)(\sec\theta + \tan\theta) = 1\)
3. Dividing both sides by \((\sec\theta - \tan\theta)\),
4. \(\therefore \sec\theta + \tan\theta = \dfrac{1}{\sec\theta - \tan\theta}\)
5. \(\therefore \dfrac{1}{\sec\theta - \tan\theta} = \sec\theta + \tan\theta\)
""")

s("Ex 6.1 Q.6 (7)", r"""
1. LHS \(= \sin^4\theta - \cos^4\theta = (\sin^2\theta)^2 - (\cos^2\theta)^2\)
2. \(= (\sin^2\theta + \cos^2\theta)(\sin^2\theta - \cos^2\theta)\)  ..... \(a^2 - b^2 = (a+b)(a-b)\)
3. \(= 1 \times (\sin^2\theta - \cos^2\theta)\)  ..... since \(\sin^2\theta + \cos^2\theta = 1\)
4. \(= (1 - \cos^2\theta) - \cos^2\theta\)  ..... since \(\sin^2\theta = 1 - \cos^2\theta\)
5. \(= 1 - 2\cos^2\theta = \) RHS
6. \(\therefore \sin^4\theta - \cos^4\theta = 1 - 2\cos^2\theta\)
""")

s("Ex 6.1 Q.6 (8)", r"""
1. LHS \(= \sec\theta + \tan\theta = \dfrac{1}{\cos\theta} + \dfrac{\sin\theta}{\cos\theta} = \dfrac{1 + \sin\theta}{\cos\theta}\)
2. Multiplying the numerator and the denominator by \((1 - \sin\theta)\),
3. \(= \dfrac{(1 + \sin\theta)(1 - \sin\theta)}{\cos\theta(1 - \sin\theta)} = \dfrac{1 - \sin^2\theta}{\cos\theta(1 - \sin\theta)}\)
4. \(= \dfrac{\cos^2\theta}{\cos\theta(1 - \sin\theta)}\)  ..... since \(1 - \sin^2\theta = \cos^2\theta\)
5. \(= \dfrac{\cos\theta}{1 - \sin\theta} = \) RHS
6. \(\therefore \sec\theta + \tan\theta = \dfrac{\cos\theta}{1 - \sin\theta}\)
""")

s("Ex 6.1 Q.6 (9)", r"""
1. Given: \(\tan\theta + \dfrac{1}{\tan\theta} = 2\).
2. Squaring both sides,
3. \(\left(\tan\theta + \dfrac{1}{\tan\theta}\right)^2 = 2^2\)
4. \(\therefore \tan^2\theta + 2 \times \tan\theta \times \dfrac{1}{\tan\theta} + \dfrac{1}{\tan^2\theta} = 4\)  ..... \((a+b)^2 = a^2 + 2ab + b^2\)
5. \(\therefore \tan^2\theta + 2 + \dfrac{1}{\tan^2\theta} = 4\)
6. \(\therefore \tan^2\theta + \dfrac{1}{\tan^2\theta} = 4 - 2 = 2\)
""")

s("Ex 6.1 Q.6 (10)", r"""
1. \(1 + \tan^2 A = \sec^2 A\) and \(1 + \cot^2 A = \operatorname{cosec}^2 A\).
2. \(\therefore\) LHS \(= \dfrac{\tan A}{(\sec^2 A)^2} + \dfrac{\cot A}{(\operatorname{cosec}^2 A)^2} = \dfrac{\tan A}{\sec^4 A} + \dfrac{\cot A}{\operatorname{cosec}^4 A}\)
3. \(= \tan A \times \cos^4 A + \cot A \times \sin^4 A\)  ..... since \(\dfrac{1}{\sec A} = \cos A\) and \(\dfrac{1}{\operatorname{cosec} A} = \sin A\)
4. \(= \dfrac{\sin A}{\cos A} \times \cos^4 A + \dfrac{\cos A}{\sin A} \times \sin^4 A\)
5. \(= \sin A\cos^3 A + \cos A\sin^3 A\)
6. \(= \sin A\cos A\,(\cos^2 A + \sin^2 A)\)  ..... taking \(\sin A\cos A\) common
7. \(= \sin A\cos A \times 1 = \sin A\cos A = \) RHS
8. \(\therefore \dfrac{\tan A}{\left(1 + \tan^2 A\right)^2} + \dfrac{\cot A}{\left(1 + \cot^2 A\right)^2} = \sin A\cos A\)
""")

s("Ex 6.1 Q.6 (11)", r"""
1. \(1 - \sin^4 A = (1 - \sin^2 A)(1 + \sin^2 A) = \cos^2 A\,(1 + \sin^2 A)\)  ..... since \(1 - \sin^2 A = \cos^2 A\)
2. \(\therefore \sec^4 A\,(1 - \sin^4 A) = \dfrac{1}{\cos^4 A} \times \cos^2 A\,(1 + \sin^2 A) = \dfrac{1 + \sin^2 A}{\cos^2 A}\)
3. \(\therefore\) LHS \(= \dfrac{1 + \sin^2 A}{\cos^2 A} - 2\tan^2 A = \dfrac{1 + \sin^2 A}{\cos^2 A} - \dfrac{2\sin^2 A}{\cos^2 A}\)
4. \(= \dfrac{1 + \sin^2 A - 2\sin^2 A}{\cos^2 A} = \dfrac{1 - \sin^2 A}{\cos^2 A}\)
5. \(= \dfrac{\cos^2 A}{\cos^2 A} = 1 = \) RHS
6. \(\therefore \sec^4 A\,(1 - \sin^4 A) - 2\tan^2 A = 1\)
""")

s("Ex 6.1 Q.6 (12)", r"""
1. Take RHS \(= \dfrac{\tan\theta + \sec\theta + 1}{\tan\theta + \sec\theta - 1}\).
2. Since \(\sec^2\theta - \tan^2\theta = 1\), replace the \(1\) in the numerator by \(\sec^2\theta - \tan^2\theta\).
3. Numerator \(= \tan\theta + \sec\theta + \sec^2\theta - \tan^2\theta = (\sec\theta + \tan\theta) + (\sec\theta + \tan\theta)(\sec\theta - \tan\theta)\)
4. \(= (\sec\theta + \tan\theta)\,[\,1 + \sec\theta - \tan\theta\,]\)  ..... taking \((\sec\theta + \tan\theta)\) common
5. Denominator \(= \tan\theta + \sec\theta - 1\).
6. \(\therefore\) RHS \(= \dfrac{(\sec\theta + \tan\theta)(\sec\theta - \tan\theta + 1)}{\sec\theta + \tan\theta - 1}\)
7. Now multiply the numerator and the denominator of LHS \(= \dfrac{\tan\theta}{\sec\theta - 1}\) by \((\sec\theta + 1)\):
8. LHS \(= \dfrac{\tan\theta(\sec\theta + 1)}{(\sec\theta - 1)(\sec\theta + 1)} = \dfrac{\tan\theta(\sec\theta + 1)}{\sec^2\theta - 1} = \dfrac{\tan\theta(\sec\theta + 1)}{\tan^2\theta} = \dfrac{\sec\theta + 1}{\tan\theta}\)
9. So it is enough to show \(\dfrac{\sec\theta + 1}{\tan\theta} = \dfrac{\tan\theta + \sec\theta + 1}{\tan\theta + \sec\theta - 1}\), that is, by cross multiplication,
10. \((\sec\theta + 1)(\tan\theta + \sec\theta - 1) = \tan\theta(\tan\theta + \sec\theta + 1)\)
11. LHS of (10) \(= \sec\theta\tan\theta + \sec^2\theta - \sec\theta + \tan\theta + \sec\theta - 1 = \sec\theta\tan\theta + \sec^2\theta - 1 + \tan\theta\)
12. \(= \sec\theta\tan\theta + \tan^2\theta + \tan\theta\)  ..... since \(\sec^2\theta - 1 = \tan^2\theta\)
13. \(= \tan\theta(\sec\theta + \tan\theta + 1) = \) RHS of (10).
14. \(\therefore \dfrac{\tan\theta}{\sec\theta - 1} = \dfrac{\tan\theta + \sec\theta + 1}{\tan\theta + \sec\theta - 1}\)
""")

# ══════════════════════════════════════════════════════════════════════════
# Practice set 6.2 — six word problems (all keyed)
# ══════════════════════════════════════════════════════════════════════════

s("Ex 6.2 Q.1", r"""
1. Let \(AB\) be the church of height \(h\) and \(C\) the position of the person, with \(BC = 80\) m and \(\angle ACB = 45^\circ\) the angle of elevation.
2. In right angled \(\triangle ABC\), \(\tan 45^\circ = \dfrac{AB}{BC}\)
3. \(\therefore 1 = \dfrac{h}{80}\)  ..... since \(\tan 45^\circ = 1\)
4. \(\therefore h = 80\)
5. \(\therefore\) the height of the church is 80 metre.
""")

s("Ex 6.2 Q.2", r"""
1. Let \(AB\) be the lighthouse with \(AB = 90\) m, and let the ship be at \(C\) with \(BC = x\) m.
2. \(AM\) is the horizontal line through the top \(A\) and \(\angle MAC = 60^\circ\) is the angle of depression. \(\angle MAC\) and \(\angle ACB\) are alternate angles, so \(\angle ACB = 60^\circ\).
3. In right angled \(\triangle ABC\), \(\tan 60^\circ = \dfrac{AB}{BC}\)
4. \(\therefore \sqrt{3} = \dfrac{90}{x}\)
5. \(\therefore x = \dfrac{90}{\sqrt{3}} = \dfrac{90}{\sqrt{3}} \times \dfrac{\sqrt{3}}{\sqrt{3}} = 30\sqrt{3}\)
6. \(\therefore x = 30 \times 1.73 = 51.90\)
7. \(\therefore\) the ship is 51.90 metre away from the lighthouse.
""")

s("Ex 6.2 Q.3", r"""
1. Let \(AB\) be the first building with \(AB = 10\) m and \(CD\) the second building, standing on opposite sides of a road \(BD = 12\) m wide.
2. Draw seg \(AE \perp\) seg \(CD\). Then \(\square ABDE\) is a rectangle, so \(AE = BD = 12\) m and \(ED = AB = 10\) m.
3. The angle of elevation of \(C\) from \(A\) is \(\angle CAE = 60^\circ\).
4. In right angled \(\triangle AEC\), \(\tan 60^\circ = \dfrac{CE}{AE}\)
5. \(\therefore \sqrt{3} = \dfrac{CE}{12}\), \(\quad \therefore CE = 12\sqrt{3}\)
6. \(\therefore CD = CE + ED = 12\sqrt{3} + 10\)
7. \(\therefore\) the height of the second building is \((10 + 12\sqrt{3})\) metre.
""")

s("Ex 6.2 Q.4", r"""
1. Let \(AB\) be the taller pole (18 m) and \(CD\) the shorter one (7 m), with the wire \(AC = 22\) m joining their tops.
2. Draw seg \(CE \perp\) seg \(AB\). Then \(\square CDBE\) is a rectangle, so \(BE = CD = 7\) m.
3. \(\therefore AE = AB - BE = 18 - 7 = 11\) m, and \(CE\) is horizontal.
4. Let \(\theta\) be the angle the wire makes with the horizontal, that is \(\angle ACE = \theta\).
5. In right angled \(\triangle AEC\), \(\sin\theta = \dfrac{AE}{AC} = \dfrac{11}{22} = \dfrac{1}{2}\)
6. From the table of ratios, \(\sin 30^\circ = \dfrac{1}{2}\), \(\quad \therefore \theta = 30^\circ\)
7. \(\therefore\) the wire makes an angle of \(30^\circ\) with the horizontal.
""")

s("Ex 6.2 Q.5", r"""
1. Let \(AB\) be the tree, broken at \(C\), whose top came to rest at \(D\) on the ground with \(BD = 20\) m and \(\angle CDB = 60^\circ\).
2. The broken piece \(CA\) fell over to become \(CD\), so \(CD = CA\); the height of the tree is \(BC + CA = BC + CD\).
3. In right angled \(\triangle CBD\), \(\tan 60^\circ = \dfrac{BC}{BD}\)
4. \(\therefore \sqrt{3} = \dfrac{BC}{20}\), \(\quad \therefore BC = 20\sqrt{3}\)
5. Also \(\cos 60^\circ = \dfrac{BD}{CD}\), \(\quad \therefore \dfrac{1}{2} = \dfrac{20}{CD}\), \(\quad \therefore CD = 40\)
6. \(\therefore\) height of the tree \(= BC + CD = 20\sqrt{3} + 40\)
7. \(\therefore\) the height of the tree is \((40 + 20\sqrt{3})\) metre.
""")

s("Ex 6.2 Q.6", r"""
1. Let \(A\) be the kite, \(AB = 60\) m its height above the ground, and \(C\) the point on the ground where the string is tied, with \(\angle ACB = 60^\circ\).
2. The string is \(AC\); let \(AC = l\).
3. In right angled \(\triangle ABC\), \(\sin 60^\circ = \dfrac{AB}{AC}\)
4. \(\therefore \dfrac{\sqrt{3}}{2} = \dfrac{60}{l}\)
5. \(\therefore l = \dfrac{120}{\sqrt{3}} = \dfrac{120}{\sqrt{3}} \times \dfrac{\sqrt{3}}{\sqrt{3}} = 40\sqrt{3}\)
6. \(\therefore l = 40 \times 1.73 = 69.20\)
7. \(\therefore\) the length of the string is 69.20 metre.
""")

# ══════════════════════════════════════════════════════════════════════════
# Problem set 6 — Q.2, Q.3, Q.4 (keyed)
# ══════════════════════════════════════════════════════════════════════════

s("PS6 Q.2", r"""
1. \(\sin\theta = \dfrac{11}{61}\)
2. We have \(\sin^2\theta + \cos^2\theta = 1\).
3. \(\therefore \cos^2\theta = 1 - \left(\dfrac{11}{61}\right)^2 = 1 - \dfrac{121}{3721} = \dfrac{3600}{3721}\)
4. \(\therefore \cos\theta = \dfrac{60}{61}\)
""")

s("PS6 Q.3", r"""
1. \(\tan\theta = 2\)
2. \(\cot\theta = \dfrac{1}{\tan\theta} = \dfrac{1}{2}\)
3. We have \(1 + \tan^2\theta = \sec^2\theta\), \(\therefore \sec^2\theta = 1 + 4 = 5\), \(\quad \therefore \sec\theta = \sqrt{5}\)
4. \(\cos\theta = \dfrac{1}{\sec\theta} = \dfrac{1}{\sqrt{5}}\)
5. \(\sin\theta = \tan\theta \times \cos\theta = 2 \times \dfrac{1}{\sqrt{5}} = \dfrac{2}{\sqrt{5}}\)
6. \(\operatorname{cosec}\theta = \dfrac{1}{\sin\theta} = \dfrac{\sqrt{5}}{2}\)
7. \(\therefore \sin\theta = \dfrac{2}{\sqrt{5}},\ \cos\theta = \dfrac{1}{\sqrt{5}},\ \operatorname{cosec}\theta = \dfrac{\sqrt{5}}{2},\ \sec\theta = \sqrt{5},\ \cot\theta = \dfrac{1}{2}\).
""")

s("PS6 Q.4", r"""
1. \(\sec\theta = \dfrac{13}{12}\)
2. \(\cos\theta = \dfrac{1}{\sec\theta} = \dfrac{12}{13}\)
3. We have \(\sin^2\theta + \cos^2\theta = 1\).
4. \(\therefore \sin^2\theta = 1 - \left(\dfrac{12}{13}\right)^2 = 1 - \dfrac{144}{169} = \dfrac{25}{169}\), \(\quad \therefore \sin\theta = \dfrac{5}{13}\)
5. \(\operatorname{cosec}\theta = \dfrac{1}{\sin\theta} = \dfrac{13}{5}\)
6. \(\tan\theta = \dfrac{\sin\theta}{\cos\theta} = \dfrac{5/13}{12/13} = \dfrac{5}{12}\)
7. \(\cot\theta = \dfrac{1}{\tan\theta} = \dfrac{12}{5}\)
8. \(\therefore \sin\theta = \dfrac{5}{13},\ \cos\theta = \dfrac{12}{13},\ \operatorname{cosec}\theta = \dfrac{13}{5},\ \tan\theta = \dfrac{5}{12},\ \cot\theta = \dfrac{12}{5}\).
""")

# ══════════════════════════════════════════════════════════════════════════
# Problem set 6 Q.5 — ten proofs (no printed key)
# ══════════════════════════════════════════════════════════════════════════

s("PS6 Q.5 (1)", r"""
1. LHS \(= \sec\theta\,(1 - \sin\theta)(\sec\theta + \tan\theta)\)
2. \(= \dfrac{1}{\cos\theta}(1 - \sin\theta)\left(\dfrac{1}{\cos\theta} + \dfrac{\sin\theta}{\cos\theta}\right)\)
3. \(= \dfrac{1}{\cos\theta}(1 - \sin\theta) \times \dfrac{1 + \sin\theta}{\cos\theta}\)
4. \(= \dfrac{(1 - \sin\theta)(1 + \sin\theta)}{\cos^2\theta} = \dfrac{1 - \sin^2\theta}{\cos^2\theta}\)
5. \(= \dfrac{\cos^2\theta}{\cos^2\theta} = 1 = \) RHS  ..... since \(1 - \sin^2\theta = \cos^2\theta\)
6. \(\therefore \sec\theta\,(1 - \sin\theta)(\sec\theta + \tan\theta) = 1\)
""")

s("PS6 Q.5 (2)", r"""
1. LHS \(= (\sec\theta + \tan\theta)(1 - \sin\theta) = \left(\dfrac{1}{\cos\theta} + \dfrac{\sin\theta}{\cos\theta}\right)(1 - \sin\theta)\)
2. \(= \dfrac{(1 + \sin\theta)(1 - \sin\theta)}{\cos\theta} = \dfrac{1 - \sin^2\theta}{\cos\theta}\)
3. \(= \dfrac{\cos^2\theta}{\cos\theta}\)  ..... since \(1 - \sin^2\theta = \cos^2\theta\)
4. \(= \cos\theta = \) RHS
5. \(\therefore (\sec\theta + \tan\theta)(1 - \sin\theta) = \cos\theta\)
""")

s("PS6 Q.5 (3)", r"""
1. LHS \(= \sec^2\theta + \operatorname{cosec}^2\theta = \dfrac{1}{\cos^2\theta} + \dfrac{1}{\sin^2\theta}\)
2. \(= \dfrac{\sin^2\theta + \cos^2\theta}{\sin^2\theta\cos^2\theta}\)
3. \(= \dfrac{1}{\sin^2\theta\cos^2\theta}\)  ..... since \(\sin^2\theta + \cos^2\theta = 1\)
4. \(= \dfrac{1}{\cos^2\theta} \times \dfrac{1}{\sin^2\theta} = \sec^2\theta \times \operatorname{cosec}^2\theta = \) RHS
5. \(\therefore \sec^2\theta + \operatorname{cosec}^2\theta = \sec^2\theta \times \operatorname{cosec}^2\theta\)
""")

s("PS6 Q.5 (4)", r"""
1. We have \(1 + \cot^2\theta = \operatorname{cosec}^2\theta\), \(\therefore \cot^2\theta = \operatorname{cosec}^2\theta - 1\).
2. We have \(1 + \tan^2\theta = \sec^2\theta\), \(\therefore \tan^2\theta = \sec^2\theta - 1\).
3. \(\therefore\) LHS \(= \cot^2\theta - \tan^2\theta = (\operatorname{cosec}^2\theta - 1) - (\sec^2\theta - 1)\)
4. \(= \operatorname{cosec}^2\theta - 1 - \sec^2\theta + 1 = \operatorname{cosec}^2\theta - \sec^2\theta = \) RHS
5. \(\therefore \cot^2\theta - \tan^2\theta = \operatorname{cosec}^2\theta - \sec^2\theta\)
""")

s("PS6 Q.5 (5)", r"""
1. LHS \(= \tan^4\theta + \tan^2\theta = \tan^2\theta\,(\tan^2\theta + 1)\)  ..... taking \(\tan^2\theta\) common
2. \(= \tan^2\theta \times \sec^2\theta\)  ..... since \(1 + \tan^2\theta = \sec^2\theta\)
3. \(= (\sec^2\theta - 1)\sec^2\theta\)  ..... since \(\tan^2\theta = \sec^2\theta - 1\)
4. \(= \sec^4\theta - \sec^2\theta = \) RHS
5. \(\therefore \tan^4\theta + \tan^2\theta = \sec^4\theta - \sec^2\theta\)
""")

s("PS6 Q.5 (6)", r"""
1. LHS \(= \dfrac{1}{1 - \sin\theta} + \dfrac{1}{1 + \sin\theta}\)
2. \(= \dfrac{(1 + \sin\theta) + (1 - \sin\theta)}{(1 - \sin\theta)(1 + \sin\theta)}\)
3. \(= \dfrac{2}{1 - \sin^2\theta}\)
4. \(= \dfrac{2}{\cos^2\theta}\)  ..... since \(1 - \sin^2\theta = \cos^2\theta\)
5. \(= 2\sec^2\theta = \) RHS
6. \(\therefore \dfrac{1}{1 - \sin\theta} + \dfrac{1}{1 + \sin\theta} = 2\sec^2\theta\)
""")

s("PS6 Q.5 (7)", r"""
1. We have \(1 + \tan^2 x = \sec^2 x\), \(\therefore \sec^2 x - \tan^2 x = 1\).
2. LHS \(= \sec^6 x - \tan^6 x = (\sec^2 x)^3 - (\tan^2 x)^3\)
3. Put \(a = \sec^2 x\) and \(b = \tan^2 x\), so that \(a - b = 1\). Then \(a^3 - b^3 = (a - b)(a^2 + ab + b^2) = a^2 + ab + b^2\).
4. Also \((a - b)^2 = a^2 - 2ab + b^2 = 1\), \(\quad \therefore a^2 + b^2 = 1 + 2ab\).
5. \(\therefore a^3 - b^3 = (a^2 + b^2) + ab = 1 + 2ab + ab = 1 + 3ab\)
6. \(= 1 + 3\sec^2 x \times \tan^2 x = \) RHS
7. \(\therefore \sec^6 x - \tan^6 x = 1 + 3\sec^2 x \times \tan^2 x\)
""")

s("PS6 Q.5 (8)", r"""
1. We have \(1 + \tan^2\theta = \sec^2\theta\), \(\therefore \tan^2\theta = \sec^2\theta - 1\).
2. \(\therefore \tan^2\theta = (\sec\theta - 1)(\sec\theta + 1)\)  ..... \(a^2 - b^2 = (a-b)(a+b)\)
3. Dividing both sides by \(\tan\theta\,(\sec\theta + 1)\),
4. \(\therefore \dfrac{\tan^2\theta}{\tan\theta(\sec\theta + 1)} = \dfrac{(\sec\theta - 1)(\sec\theta + 1)}{\tan\theta(\sec\theta + 1)}\)
5. \(\therefore \dfrac{\tan\theta}{\sec\theta + 1} = \dfrac{\sec\theta - 1}{\tan\theta}\)
""")

s("PS6 Q.5 (9)", r"""
1. LHS \(= \dfrac{\tan^3\theta - 1}{\tan\theta - 1}\)
2. \(= \dfrac{(\tan\theta - 1)(\tan^2\theta + \tan\theta + 1)}{\tan\theta - 1}\)  ..... \(a^3 - b^3 = (a-b)(a^2+ab+b^2)\) with \(b = 1\)
3. \(= \tan^2\theta + \tan\theta + 1\)
4. \(= (\tan^2\theta + 1) + \tan\theta\)
5. \(= \sec^2\theta + \tan\theta = \) RHS  ..... since \(1 + \tan^2\theta = \sec^2\theta\)
6. \(\therefore \dfrac{\tan^3\theta - 1}{\tan\theta - 1} = \sec^2\theta + \tan\theta\)
""")

s("PS6 Q.5 (10)", r"""
1. RHS \(= \dfrac{1}{\sec\theta - \tan\theta}\). Since \(\sec^2\theta - \tan^2\theta = 1\), that is \((\sec\theta - \tan\theta)(\sec\theta + \tan\theta) = 1\), we get RHS \(= \sec\theta + \tan\theta = \dfrac{1 + \sin\theta}{\cos\theta}\).
2. Now take LHS \(= \dfrac{\sin\theta - \cos\theta + 1}{\sin\theta + \cos\theta - 1}\) and divide the numerator and the denominator by \(\cos\theta\):
3. LHS \(= \dfrac{\tan\theta - 1 + \sec\theta}{\tan\theta + 1 - \sec\theta}\)
4. In the denominator, replace \(1\) by \(\sec^2\theta - \tan^2\theta\):
5. Denominator \(= \tan\theta + \sec^2\theta - \tan^2\theta - \sec\theta = (\tan\theta - \sec\theta) - (\tan^2\theta - \sec^2\theta)\)
6. \(= (\tan\theta - \sec\theta) - (\tan\theta - \sec\theta)(\tan\theta + \sec\theta) = (\tan\theta - \sec\theta)\,[\,1 - (\tan\theta + \sec\theta)\,]\)
7. Numerator \(= (\tan\theta + \sec\theta) - 1 = -\,[\,1 - (\tan\theta + \sec\theta)\,]\)
8. \(\therefore\) LHS \(= \dfrac{-\,[\,1 - (\tan\theta + \sec\theta)\,]}{(\tan\theta - \sec\theta)\,[\,1 - (\tan\theta + \sec\theta)\,]} = \dfrac{-1}{\tan\theta - \sec\theta} = \dfrac{1}{\sec\theta - \tan\theta}\)
9. \(\therefore \dfrac{\sin\theta - \cos\theta + 1}{\sin\theta + \cos\theta - 1} = \dfrac{1}{\sec\theta - \tan\theta}\)
""")

# ══════════════════════════════════════════════════════════════════════════
# Problem set 6 — Q.6 to Q.10 (keyed)
# ══════════════════════════════════════════════════════════════════════════

s("PS6 Q.6", r"""
1. Let \(AB\) be the building of height \(h\) and \(C\) the position of the boy, with \(BC = 48\) m and the angle of elevation \(\angle ACB = 30^\circ\).
2. In right angled \(\triangle ABC\), \(\tan 30^\circ = \dfrac{AB}{BC}\)
3. \(\therefore \dfrac{1}{\sqrt{3}} = \dfrac{h}{48}\)
4. \(\therefore h = \dfrac{48}{\sqrt{3}} = \dfrac{48}{\sqrt{3}} \times \dfrac{\sqrt{3}}{\sqrt{3}} = \dfrac{48\sqrt{3}}{3} = 16\sqrt{3}\)
5. \(\therefore\) the height of the building is \(16\sqrt{3}\) metre.
""")

s("PS6 Q.7", r"""
1. Let \(AB\) be the light-house with \(AB = 100\) m, and let the ship be at \(C\) with \(BC = x\) m.
2. \(AM\) is the horizontal line through the top \(A\) and \(\angle MAC = 30^\circ\) is the angle of depression. \(\angle MAC\) and \(\angle ACB\) are alternate angles, so \(\angle ACB = 30^\circ\).
3. In right angled \(\triangle ABC\), \(\tan 30^\circ = \dfrac{AB}{BC}\)
4. \(\therefore \dfrac{1}{\sqrt{3}} = \dfrac{100}{x}\)
5. \(\therefore x = 100\sqrt{3}\)
6. \(\therefore\) the ship is \(100\sqrt{3}\) metre away from the light-house.
""")

s("PS6 Q.8", r"""
[Textbook answer-key error: the printed answer key gives \((12 + 15\sqrt{3})\) metre, which is wrong. That value is \(12 + 15\tan 60^\circ\), whereas this question states an angle of elevation of \(30^\circ\). It is self-refuting against its own stem: a rise of \(15\sqrt{3}\) m over a horizontal distance of 15 m would make \(\tan\theta = \sqrt{3}\), i.e. \(\theta = 60^\circ\). The correct answer is \((12 + 5\sqrt{3})\) metre, derived below.]

1. Let \(AB\) be the first building with \(AB = 12\) m and \(CD\) the second building, on opposite sides of a road \(BD = 15\) m wide.
2. Draw seg \(AE \perp\) seg \(CD\). Then \(\square ABDE\) is a rectangle, so \(AE = BD = 15\) m and \(ED = AB = 12\) m.
3. The angle of elevation of \(C\) from \(A\) is \(\angle CAE = 30^\circ\).
4. In right angled \(\triangle AEC\), \(\tan 30^\circ = \dfrac{CE}{AE}\)
5. \(\therefore \dfrac{1}{\sqrt{3}} = \dfrac{CE}{15}\), \(\quad \therefore CE = \dfrac{15}{\sqrt{3}} = \dfrac{15\sqrt{3}}{3} = 5\sqrt{3}\)
6. \(\therefore CD = CE + ED = 5\sqrt{3} + 12\)
7. \(\therefore\) the height of the second building is \((12 + 5\sqrt{3})\) metre, that is about 20.66 metre.
""")

s("PS6 Q.9", r"""
1. Let \(PQ\) be the platform with \(PQ = 2\) m above the ground, and let \(QR\) be the ladder with \(QR = 20\) m raised at \(\angle RQM = 70^\circ\) to the horizontal \(QM\) through \(Q\).
2. Draw seg \(RM \perp\) seg \(QM\). Then \(RM\) is the height the ladder rises ABOVE the platform.
3. In right angled \(\triangle QMR\), \(\sin 70^\circ = \dfrac{RM}{QR}\)
4. \(\therefore 0.94 = \dfrac{RM}{20}\), \(\quad \therefore RM = 20 \times 0.94 = 18.8\) m
5. \(\therefore\) height above the ground \(= PQ + RM = 2 + 18.8 = 20.8\) m
6. \(\therefore\) the maximum height the ladder can reach is 20.80 metre.
""")

s("PS6 Q.10", r"""
1. The plane flies down its line of vision at 200 km/hr for 54 seconds, so first find that distance.
2. \(200\) km/hr \(= \dfrac{200 \times 1000}{3600} = \dfrac{500}{9}\) m/s
3. Distance travelled \(= \dfrac{500}{9} \times 54 = 500 \times 6 = 3000\) m. Let this be \(AC\), with \(A\) the starting position and \(C\) the point on the ground.
4. Let \(AB\) be the height at which the plane started landing, so \(\angle ACB = 20^\circ\) (the angle of depression at \(A\) and \(\angle ACB\) are alternate angles).
5. In right angled \(\triangle ABC\), \(\sin 20^\circ = \dfrac{AB}{AC}\)
6. \(\therefore 0.342 = \dfrac{AB}{3000}\)
7. \(\therefore AB = 3000 \times 0.342 = 1026\)
8. \(\therefore\) the plane was 1026 metre high when it started landing.
""")

# ── emit, joining on ref, asserting the ref -> id PAIRING ─────────────────
rows = []
for r in DUMP:                       # iterate the DUMP, not SOL, so order + pairing come from it
    ref = r["ref"]
    assert ref in SOL, f"no solution authored for {ref}"
    assert BY_REF[ref] == r["id"], f"ref->id pairing broken for {ref}"
    rows.append({"id": r["id"], "ref": ref, "solution": SOL[ref]})

assert len(rows) == len(DUMP) == len(SOL), (len(rows), len(DUMP), len(SOL))
assert {x["id"] for x in rows} == {r["id"] for r in DUMP}
for a, b in zip(rows, DUMP):
    assert a["id"] == b["id"] and a["ref"] == b["ref"], "PERMUTATION detected"

out = os.path.join(DATA, "geo-trigonometry-10.solutions.json")
with io.open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(f"wrote {len(rows)} solutions -> {out}")
print("ref->id pairing asserted row by row against the dump: OK")
