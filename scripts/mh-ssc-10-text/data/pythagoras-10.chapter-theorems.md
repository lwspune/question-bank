# Chapter 2 — Pythagoras Theorem: theorem reference

**Source:** Balbharati Class-10 Geometry (Maharashtra State Board), Chapter 2 *Pythagoras Theorem*, printed pp. 30–46 (PDF page indices 39–55 in `out/pythagoras-10/p-NN.png`).

**Transcribed from the rendered page images, not the text layer.** The text layer of this book drops radical signs and flattens stacked fractions, so it states falsehoods (e.g. it renders the 45-45-90 factor \\(\frac{1}{\sqrt{2}}\\) as "1/2"). Everything below was read off the images.

**Purpose:** this is the exhaustive inventory of the tools Chapter 2 puts on the table. An authored proof for one of the chapter's "prove that" questions must be grounded in an item on this list (or in a result the chapter itself explicitly recalls from an earlier class and names). Anything not here is outside knowledge.

---

## 0. What the chapter announces (printed p.30, "Let's study")

The chapter's own contents list, in printed order:

- Pythagorean triplet
- Similarity and right angled triangles
- Theorem of geometric mean
- Pythagoras theorem
- Application of Pythagoras theorem
- Apollonius theorem

---

## 1. Named results, in the book's own order

### 1.1 Pythagoras theorem — RECALLED (printed p.30, "Let's recall")

> **Pythagoras theorem :**
> In a right angled triangle, the square of the hypotenuse is equal to the sum of the squares of remaning two sides.

**Status here:** *recalled*, not proved, on p.30. (It is stated again and **proved** later on p.34 — see §1.6.)

**As printed with the figure (Fig. 2.1):**

> In \\( \triangle PQR \\), \\( \angle PQR = 90^\circ \\)
> \\( l(PR)^2 = l(PQ)^2 + l(QR)^2 \\)
> We will write this as,
> \\( PR^2 = PQ^2 + QR^2 \\)

**Lower-case convention introduced on the same page:**

> The lengths PQ, QR and PR of \\( \triangle PQR \\) can also be shown by letters r, p and q. With this convention, refering to figure 2.1, Pythagoras theorem can also be stated as \\( q^2 = p^2 + r^2 \\).

**Usable form:** for \\( \angle B = 90^\circ \\) in \\( \triangle ABC \\), \\( AC^2 = AB^2 + BC^2 \\).

---

### 1.2 Pythagorean Triplet — DEFINITION (printed p.30)

> **Pythagorean Triplet :**
> In a triplet of natural numbers, if the square of the largest number is equal to the sum of the squares of the remaining two numbers then the triplet is called Pythagorean triplet.

**Status:** definition, stated.

Worked instance printed: \\( (11, 60, 61) \\) since \\( 11^2 = 121 \\), \\( 60^2 = 3600 \\), \\( 61^2 = 3721 \\) and \\( 121 + 3600 = 3721 \\).

Triplets the book asks the student to verify: \\( (3,4,5) \\), \\( (5,12,13) \\), \\( (8,15,17) \\), \\( (24,25,7) \\).

Closing remark, printed:

> Numbers in Pythagorean triplet can be written in any order.

**Usable form:** natural numbers \\( a, b, c \\) with \\( c \\) largest form a Pythagorean triplet iff \\( c^2 = a^2 + b^2 \\); order in which they are listed is irrelevant.

---

### 1.3 Formula for Pythagorean triplet — "For more information" box (printed p.31)

This sits in a boxed **"For more information"** panel. Enrichment material, but it *is* proved on the page.

> **Formula for Pythagorean triplet:**
> If \\( a \\), \\( b \\), \\( c \\) are natural numbers and \\( a > b \\), then \\( [(a^2 + b^2), (a^2 - b^2), (2ab)] \\) is Pythagorean triplet.

Printed derivation:

> \\( \because (a^2 + b^2)^2 = a^4 + 2a^2b^2 + b^4 \\) ………. (I)
> \\( (a^2 - b^2) = a^4 - 2a^2b^2 + b^4 \\) ………. (II)   ← **see the misprint report, §4.1**
> \\( (2ab)^2 = 4a^2b^2 \\) ………. (III)
> \\( \therefore \\) by (I), (II) and (III), \\( (a^2 + b^2)^2 = (a^2 - b^2)^2 + (2ab)^2 \\)
> \\( \therefore [(a^2 + b^2), (a^2 - b^2), (2ab)] \\) is Pythagorean Triplet.

Printed example: \\( a = 5, b = 3 \\) gives \\( a^2 + b^2 = 34 \\), \\( a^2 - b^2 = 16 \\), \\( 2ab = 30 \\), and the reader is asked to check that \\( (34, 16, 30) \\) is a Pythagorean triplet.

**Status:** stated **and** proved (algebraically) in the box.

**Usable form:** \\( (a^2+b^2)^2 = (a^2-b^2)^2 + (2ab)^2 \\) for all \\( a > b \\).

**Caution for authors:** the "For more information" panel is enrichment. Grounding a required proof in it is defensible (it is on the page and it is proved there), but it is not part of the core spine and does not appear in the "Remember this!" summary.

---

### 1.4 Property of the 30°–60°–90° triangle — RECALLED from Class 9 (printed p.31)

Printed as **"(I) Property of 30°−60°−90° triangle"**, and explicitly introduced as revision:

> Last year we have studied the properties of right angled triangle with the angles \\( 30^\circ - 60^\circ - 90^\circ \\) and \\( 45^\circ - 45^\circ - 90^\circ \\).

> **(I) Property of \\( 30^\circ-60^\circ-90^\circ \\) triangle.**
> If acute angles of a right angled triangle are \\( 30^\circ \\) and \\( 60^\circ \\), then the side opposite \\( 30^\circ \\) angle is half of the hypotenuse and the side opposite to \\( 60^\circ \\) angle is \\( \frac{\sqrt{3}}{2} \\) times the hypotenuse.

**Status:** stated only — explicitly recalled from Class 9, **not proved here**.

Worked application printed with Fig. 2.2 (\\( \triangle LMN \\), \\( \angle L = 30^\circ \\), \\( \angle N = 60^\circ \\), \\( \angle M = 90^\circ \\)):

> \\( \therefore \\) side opposite \\( 30^\circ \\) angle \\( = MN = \frac{1}{2} \times LN \\)
> side opposite \\( 60^\circ \\) angle \\( = LM = \frac{\sqrt{3}}{2} \times LN \\)

with the numeric case \\( LN = 6 \\) cm giving \\( MN = 3 \\) cm and \\( LM = 3\sqrt{3} \\) cm.

**Usable form:** hypotenuse \\( h \\) \\( \Rightarrow \\) shorter leg \\( = \frac{1}{2}h \\), longer leg \\( = \frac{\sqrt{3}}{2}h \\).

**Naming note:** p.31 calls this a *Property*; the solved examples on p.36 invoke the identical result as "**by \\( 30^\circ-60^\circ-90^\circ \\) theorem**", and "Remember this!" item (4) calls it "\\( 30^\circ-60^\circ-90^\circ \\) theorem". All three names denote this one result. An authored proof may cite it by any of them.

---

### 1.5 Property of the 45°–45°–90° triangle — RECALLED from Class 9 (printed p.32)

> **(II) Property of \\( 45^\circ-45^\circ-90^\circ \\)**
> If the acute angles of a right angled triangle are \\( 45^\circ \\) and \\( 45^\circ \\), then each of the perpendicular sides is \\( \frac{1}{\sqrt{2}} \\) times the hypotenuse.

**Status:** stated only — recalled from Class 9, **not proved here**.

Worked application printed with Fig. 2.3 (\\( \triangle XYZ \\), right angle at X, \\( \angle Z = \angle Y = 45^\circ \\)):

> \\( XY = \frac{1}{\sqrt{2}} \times ZY \\)
> \\( XZ = \frac{1}{\sqrt{2}} \times ZY \\)
> \\( \therefore XY = XZ = \frac{1}{\sqrt{2}} \times ZY \\)

with the numeric case \\( ZY = 3\sqrt{2} \\) cm giving \\( XY = XZ = 3 \\) cm.

**Usable form:** hypotenuse \\( h \\) \\( \Rightarrow \\) each leg \\( = \frac{1}{\sqrt{2}}h = \frac{h}{\sqrt{2}} \\).

**This is the statement the text layer corrupts.** It prints \\( \frac{1}{\sqrt{2}} \\); the extracted text reads "1/2". Every occurrence in this chapter is \\( \frac{1}{\sqrt{2}} \\).

---

### 1.5a Activity — alternative area proof of Pythagoras (printed p.32)

Not a theorem; a construction the student is asked to carry out. Recorded because it names a formula the chapter thereby makes available.

> In \\( 7^{th} \\) standard we have studied theorem of Pythagoras using areas of four right angled triangles and a square. We can prove the theorem by an alternative method.

> **Activity:**
> Take two congruent right angled triangles. Take another isosceles right angled triangle whose congruent sides are equal to the hypotenuse of the two congruent right angled triangles. Join these triangles to form a trapezium
> Area of the trapezium \\( = \frac{1}{2} \times \\) (sum of the lengths of parallel sides) \\( \times \\) height
> Using this formula, equating the area of trapezium with the sum of areas of the three right angled triangles we can prove the theorem of Pythagoras.

(Fig. 2.4 shows the trapezium dissection labelled \\( x, y, z \\).)

**Status:** the trapezium **area formula** \\( A = \frac{1}{2}(\text{sum of parallel sides}) \times \text{height} \\) is *given* on this page. The Pythagoras proof itself is left to the student as an activity.

---

### 1.6 Similarity and right angled triangle — THEOREM, PROVED (printed p.33)

Section heading printed in a rounded box: **"Similarity and right angled triangle"**.

> **Theorem : In a right angled triangle, if the altitude is drawn to the hypotenuse, then the two triangles formed are similar to the original triangle and to each other.**

> **Given :** In \\( \triangle ABC \\), \\( \angle ABC = 90^\circ \\), seg BD \\( \perp \\) seg AC, A−D−C
> **To prove :** \\( \triangle ADB \sim \triangle ABC \\); \\( \triangle BDC \sim \triangle ABC \\); \\( \triangle ADB \sim \triangle BDC \\)

Printed proof (two columns + conclusion):

> **Proof :** In \\( \triangle ADB \\) and \\( \triangle ABC \\)
> \\( \angle DAB \cong \angle BAC \\) …(common angle)
> \\( \angle ADB \cong \angle ABC \\) … (each \\( 90^\circ \\))
> \\( \triangle ADB \sim \triangle ABC \\) … (AA test)… (I)
>
> In \\( \triangle BDC \\) and \\( \triangle ABC \\)
> \\( \angle BCD \cong \angle ACB \\) …..(common angle)
> \\( \angle BDC \cong \angle ABC \\) ….. (each \\( 90^\circ \\))
> \\( \triangle BDC \sim \triangle ABC \\) ….. (AA test) … (II)
>
> \\( \therefore \triangle ADB \sim \triangle BDC \\) from (I) and (II) ……..(III)
> \\( \therefore \\) from (I), (II) and (III), \\( \triangle ADB \sim \triangle BDC \sim \triangle ABC \\) ….(transitivity)

**Status:** **PROVED here** (Fig. 2.5).

**Prerequisites the proof leans on without restating:** the **AA test** for similarity and **transitivity** of similarity — both from Chapter 1 / earlier work, used here by name only.

**Usable form:** in a right triangle, the altitude to the hypotenuse produces three mutually similar right triangles; the chapter cites this as "(similarity of right angled triangles)" / "(similarity of right triangles)" when using it later.

---

### 1.7 Theorem of geometric mean — PROVED (printed p.33)

Section heading printed in a rounded box: **"Theorem of geometric mean"**.

> **In a right angled triangle, the perpendicular segment to the hypotenuse from the opposite vertex, is the geometric mean of the segments into which the hypotenuse is divided.**

Printed proof (Fig. 2.6, right angle at Q, seg QS \\( \perp \\) hypotenuse PR):

> **Proof :** In right angled triangle PQR, seg QS \\( \perp \\) hypotenuse PR
> \\( \triangle QSR \sim \triangle PSQ \\) ………. ( similarity of right triangles )
> \\( \frac{QS}{PS} = \frac{SR}{SQ} \\)
> \\( \frac{QS}{PS} = \frac{SR}{QS} \\)
> \\( QS^2 = PS \times SR \\)
> \\( \therefore \\) seg QS is the 'geometric mean' of seg PS and SR.

**Status:** **PROVED here**, on top of §1.6.

**Usable form:** altitude \\( h \\) to the hypotenuse dividing it into \\( p \\) and \\( q \\) satisfies \\( h^2 = pq \\), i.e. \\( h = \sqrt{pq} \\).

---

### 1.8 Pythagoras Theorem — STATED AND PROVED (printed p.34)

Section heading printed in a rounded box: **"Pythagoras Theorem"**.

> **In a right angled triangle, the square of the hypotenuse is equal to the sum of the squares of remaining two sides.**

> **Given :** In \\( \triangle ABC \\), \\( \angle ABC = 90^\circ \\)
> **To prove :** \\( AC^2 = AB^2 + BC^2 \\)
> **Construction :** Draw perpendicular seg BD on side AC. A−D−C.

Printed proof (Fig. 2.7), via the similarity theorem of §1.6:

> **Proof :** In right angled \\( \triangle ABC \\), seg BD \\( \perp \\) hypotenuse AC ….. (construction)
> \\( \therefore \triangle ABC \sim \triangle ADB \sim \triangle BDC \\) ….. (similarity of right angled triangles)
>
> \\( \triangle ABC \sim \triangle ADB \\)
> \\( \frac{AB}{AD} = \frac{BC}{DB} = \frac{AC}{AB} \\) − corresponding sides
> \\( \frac{AB}{AD} = \frac{AC}{AB} \\)
> \\( AB^2 = AD \times AC \\) ………. (I)
>
> Similarly, \\( \triangle ABC \sim \triangle BDC \\)
> \\( \frac{AB}{BD} = \frac{BC}{DC} = \frac{AC}{BC} \\) − corresponding sides
> \\( \frac{BC}{DC} = \frac{AC}{BC} \\)
> \\( BC^2 = DC \times AC \\) ………. (II)
>
> Adding (I) and (II)
> \\( AB^2 + BC^2 = AD \times AC + DC \times AC \\)
> \\( = AC (AD + DC) \\)
> \\( = AC \times AC \\) ………. (A−D−C)
> \\( \therefore AB^2 + BC^2 = AC^2 \\)
> \\( \therefore AC^2 = AB^2 + BC^2 \\)

**Status:** **PROVED here** (this is the chapter's own similarity-based proof; the Class-7 area proof is only referred to, and the trapezium proof is left as the p.32 Activity).

**Two by-products worth having explicitly** — they are printed lines of this proof, so they are available to an authored proof by citation:
- \\( AB^2 = AD \times AC \\)  (leg² = adjacent hypotenuse segment × hypotenuse)
- \\( BC^2 = DC \times AC \\)

---

### 1.9 Converse of Pythagoras theorem — STATED AND PROVED (printed pp.34–35)

Section heading printed in a rounded box: **"Converse of Pythagoras theorem"**.

> **In a triangle if the square of one side is equal to the sum of the squares of the remaining two sides, then the triangle is a right angled triangle.**

> **Given :** In \\( \triangle ABC \\), \\( AC^2 = AB^2 + BC^2 \\)
> **To prove :** \\( \angle ABC = 90^\circ \\)
> **Construction :** Draw \\( \triangle PQR \\) such that, AB = PQ, BC = QR, \\( \angle PQR = 90^\circ \\).

Printed proof (Figs. 2.8, 2.9; continues onto p.35):

> **Proof :** In \\( \triangle PQR \\), \\( \angle Q = 90^\circ \\)
> \\( PR^2 = PQ^2 + QR^2 \\) ………. (Pythagoras theorem)
> \\( = AB^2 + BC^2 \\) ………. (construction) ……(I)
> \\( = AC^2 \\) ………. (given) ……(II)
> \\( \therefore PR^2 = AC^2 \\)
> \\( \therefore PR = AC \\) ………. (III)
> \\( \therefore \triangle ABC \cong \triangle PQR \\) ………. (SSS test)
> \\( \therefore \angle ABC = \angle PQR = 90^\circ \\)

**Status:** **PROVED here.**

**Prerequisite leaned on by name only:** the **SSS test** for congruence (Class 9).

**Usable form:** if \\( c^2 = a^2 + b^2 \\) then the angle opposite \\( c \\) is \\( 90^\circ \\). This is what the chapter uses to answer "is this triangle right angled?" questions (see solved Ex. 6, p.38).

---

### 1.10 Application of Pythagoras theorem — the acute-angle relation (printed p.40)

Section heading printed in a rounded box: **"Application of Pythagoras theorem"**, opening the second **"Let's learn."** block. Introductory prose:

> In Pythagoras theorem, the relation between hypotenuse and sides making right angle i.e. the relation between side opposite to right angle and the remaining two sides is given.
> In a triangle, relation between the side opposite to acute angle and remaining two sides and relation of the side opposite to obtuse angle with remaining two sides can be determined with the help of Pythagoras theorem. Study these relations from the following examples.

> **Ex. (1)** In \\( \triangle ABC \\), \\( \angle C \\) is an acute angle, seg AD \\( \perp \\) seg BC. Prove that:
> \\( AB^2 = BC^2 + AC^2 - 2BC \times DC \\)

Printed derivation (Fig. 2.23; \\( AB = c \\), \\( AC = b \\), \\( AD = p \\), \\( BC = a \\), \\( DC = x \\), so \\( BD = a - x \\)) — note that **the book prints this derivation with fill-in-the-blank boxes**:

> \\( \therefore BD = a - x \\)
> In \\( \triangle ADB \\), by Pythagoras theorem
> \\( c^2 = (a-x)^2 + \boxed{\phantom{p^2}} \\)
> \\( c^2 = a^2 - 2ax + x^2 + \boxed{\phantom{p^2}} \\) ………. (I)
> In \\( \triangle ADC \\), by Pythagoras theorem
> \\( b^2 = p^2 + \boxed{\phantom{x^2}} \\)
> \\( p^2 = b^2 - \boxed{\phantom{x^2}} \\) ………. (II)
> Substituting value of \\( p^2 \\) from (II) in (I),
> \\( c^2 = a^2 - 2ax + x^2 + b^2 - x^2 \\)
> \\( \therefore c^2 = a^2 + b^2 - 2ax \\)
> \\( \therefore AB^2 = BC^2 + AC^2 - 2BC \times DC \\)

**Status:** presented as a **solved example**, not as a boxed named theorem — but its final line is completed on the page and the chapter then cites it explicitly ("From examples (1) and (2) above") to prove Apollonius. It is therefore an established tool of this chapter.

**Usable form:** with \\( \angle C \\) acute and D the foot of the altitude from A onto BC,
\\( AB^2 = BC^2 + AC^2 - 2 \cdot BC \cdot DC \\).

---

### 1.11 Application of Pythagoras theorem — the obtuse-angle relation (printed pp.40–41)

> **Ex. (2)** In \\( \triangle ABC \\), \\( \angle ACB \\) is obtuse angle, seg AD \\( \perp \\) seg BC. Prove that:
> \\( AB^2 = BC^2 + AC^2 + 2BC \times CD \\)

Printed derivation (Fig. 2.24; \\( AD = p \\), \\( AC = b \\), \\( AB = c \\), \\( BC = a \\), \\( DC = x \\), so \\( DB = a + x \\)):

> In \\( \triangle ADB \\), by Pythagoras theorem,
> \\( c^2 = (a + x)^2 + p^2 \\)
> \\( c^2 = a^2 + 2ax + x^2 + p^2 \\) ………. (I)
> Similarly, in \\( \triangle ADC \\)
> \\( b^2 = x^2 + p^2 \\)
> \\( \therefore p^2 = b^2 - x^2 \\) ………. (II)
> \\( \therefore \\) substituting the value of \\( p^2 \\) from (II) in (I)
> \\( \therefore c^2 = a^2 + 2ax + b^2 \\)
> \\( \therefore AB^2 = BC^2 + AC^2 + 2BC \times CD \\)

**Status:** solved example, fully derived on the page (no blanks in this one).

**Usable form:** with \\( \angle ACB \\) obtuse and D the foot of the altitude from A onto line BC (D outside seg BC, on the C-side),
\\( AB^2 = BC^2 + AC^2 + 2 \cdot BC \cdot CD \\).

---

### 1.12 Apollonius theorem — STATED AND PROVED (printed p.41)

Section heading printed in a rounded box: **"Apollonius theorem"**.

> In \\( \triangle ABC \\), if M is the midpoint of side BC, then \\( AB^2 + AC^2 = 2AM^2 + 2BM^2 \\)

> **Given :** In \\( \triangle ABC \\), M is the midpoint of side BC.
> **To prove :** \\( AB^2 + AC^2 = 2AM^2 + 2BM^2 \\)
> **Construction :** Draw seg AD \\( \perp \\) seg BC

Printed proof (Fig. 2.25):

> **Proof :** If seg AM is not perpendicular to seg BC then out of \\( \angle AMB \\) and \\( \angle AMC \\) one is obtuse angle and the other is acute angle
> In the figure, \\( \angle AMB \\) is obtuse angle and \\( \angle AMC \\) is acute angle.
> From examples (1) and (2) above,
> \\( AB^2 = AM^2 + MB^2 + 2BM \times MD \\) ….. (I)
> and \\( AC^2 = AM^2 + MC^2 - 2MC \times MD \\)
> \\( \therefore AC^2 = AM^2 + MB^2 - 2BM \times MD \\) ( \\( \because \\) BM = MC ) ……….(II)
> \\( \therefore \\) adding (I) and (II)
> \\( AB^2 + AC^2 = 2AM^2 + 2BM^2 \\)
> Write the proof yourself if seg AM \\( \perp \\) seg BC.
> From this example we can see the relation among the sides and medians of a triangle.
> This is known as Apollonius theorem.

**Status:** **PROVED here**, resting directly on §1.10 and §1.11. The degenerate case (AM \\( \perp \\) BC, i.e. AB = AC) is explicitly left to the student — worth knowing if an authored proof needs the isosceles case.

**Usable form:** M the midpoint of BC \\( \Rightarrow \\)
\\( AB^2 + AC^2 = 2AM^2 + 2BM^2 \\), equivalently \\( AB^2 + AC^2 = 2AM^2 + \frac{1}{2}BC^2 \\) (since \\( BM = \frac{1}{2}BC \\)).

The second form is **not printed** — the book always writes \\( 2BM^2 \\). An author using \\( \frac{1}{2}BC^2 \\) should show the one-line substitution rather than cite it as the theorem.

**Chapter-internal usage precedent (Solved Ex. 1, p.41–42):** the chapter itself applies Apollonius to a **median**, silently using "M is the midpoint of seg QR" as the bridge from "seg PM is a median" to the theorem's hypothesis, and \\( QM = MR = \frac{1}{2}QR \\).

---

### 1.13 Result used but taken from Class 9 — diagonals of a rhombus (printed p.42)

In Solved Ex. (2) (proving the rhombus diagonal-sum result) the printed proof opens:

> **Proof :** Diagonals of a rhombus bisect each other .
> \\( \therefore \\) by Apollonius' theorem, …

**Status:** quadrilateral property **recalled by name only**, not proved and not stated as a numbered result of this chapter. It is nevertheless demonstrably available to an authored proof, because the book uses it exactly this way.

The same example closes with a remark that widens the toolbox:

> (The above proof can be written using Pythagoras theorem also.)

---

## 2. "Remember this !" box — printed p.35, verbatim

This is the book's own consolidated list. Transcribed complete.

> **(1)  (a) Similarity and right angled triangle**
>
> In \\( \triangle PQR \\) \\( \angle Q = 90^\circ \\), seg QS \\( \perp \\) seg PR, \\( \triangle PQR \sim \triangle PSQ \sim \triangle QSR \\). Thus all the right angled triangles in the figure are similar to one another.
>
> *(Fig. 2.10)*
>
> **(b) Theorem of geometric mean**
>
> In the above figure, \\( \triangle PSQ \sim \triangle QSR \\)
> \\( \therefore QS^2 = PS \times SR \\)
> \\( \therefore \\) seg QS is the geometric mean of seg PS and seg SR
>
> **(2) Pythagoras Theorem:**
>
> In a right angled triangle, the square of the hypotenuse is equal to the sum of the squares of remaining two sides.
>
> **(3) Converse of Pythagoras Theorem:**
>
> In a triangle, if the square of one side is equal to the sum of the squares of the remaining two sides, then the triangle is a right angled triangle
>
> **(4) Let us remember one more very useful property.**
>
> In a right angled triangle, if one side is half of the hypotenuse then the angle opposite to that side is \\( 30^\circ \\).
> This property is the converse of \\( 30^\circ-60^\circ-90^\circ \\) theorem.

**Note for authors:** item (4) is the *only* place in the chapter where a converse of the 30-60-90 property appears, and it covers **one direction only** — the half-hypotenuse ⇒ 30° implication. See §3.

**Note on scope:** the summary box appears on p.35, i.e. **before** the Application and Apollonius sections (pp.40–41). It therefore does **not** list the acute/obtuse relations or Apollonius. Its silence on them is a matter of page order, not of availability.

---

## 3. What this chapter does NOT give you

Based only on printed pp.30–46.

**3.1 Trigonometry is NOT available.** No trigonometric ratio (sine, cosine, tangent, sin/cos/tan notation) appears anywhere on pp.30–46. Every angle-to-side relation in the chapter is delivered by the 30-60-90 and 45-45-90 properties, never by a ratio. An authored proof must not reach for \\( \sin \\), \\( \cos \\), \\( \tan \\), the sine rule or the cosine rule — even though §1.10/§1.11 are the cosine rule in disguise, the chapter never names it or generalises it to an arbitrary angle.

**3.2 The converse of the 30-60-90 property is stated only in the half-hypotenuse direction.** "Remember this!" item (4) gives: one side is half the hypotenuse \\( \Rightarrow \\) the angle opposite it is \\( 30^\circ \\). The chapter states **no** converse for the \\( \frac{\sqrt{3}}{2} \\) / 60° leg, and **no** converse for the 45-45-90 property at all. An argument of the form "the leg is \\( \frac{\sqrt{3}}{2} \\) of the hypotenuse, therefore the angle is 60°" is not directly licensed; route it through item (4) plus the angle sum instead.

**3.3 The only median result in the chapter is Apollonius.** There is no midpoint theorem, no midpoint/section formula, and — notably — **no statement that the median to the hypotenuse of a right triangle equals half the hypotenuse**. If an authored proof wants that, it must derive it (Apollonius plus Pythagoras does it) rather than cite it.

**3.4 Centroid properties are not stated here.** The 2:1 centroid division does not appear anywhere on these pages. **Uncertainty flagged:** Problem set 2 Q14 (p.45) asks for "the distance between the vertex opposite the base and the centroid", which presupposes a centroid fact the student must be getting from elsewhere in the course (Chapter 1 / Class 9). I can only report that Chapter 2 does not state it; I cannot say from these pages whether an earlier chapter does.

**3.5 Similarity and congruence machinery is used but not restated.** The chapter cites, by name and without proof: the **AA test** for similarity, **transitivity** of similarity, the **SSS test** for congruence, corresponding sides of similar triangles being proportional, and "diagonals of a rhombus bisect each other". These are legitimate to cite in an authored proof, because the chapter itself cites them exactly this way. Nothing beyond that list is demonstrably in scope.

**3.6 No general angle-classification converse.** The chapter proves the equality converse (§1.9) only. It does **not** state the inequality forms ("if \\( c^2 > a^2 + b^2 \\) the angle is obtuse", etc.), even though §1.10/§1.11 are exactly the ingredients for them.

**3.7 Not present at all on these pages:** circles, tangents, coordinate geometry, areas of triangles by Heron's formula, ratios of areas of similar triangles. (Area of a **trapezium** *is* given, once, in the p.32 Activity — §1.5a.)

---

## 4. Printed errors and misprints — reported, NOT corrected

### 4.1 Missing square in the Pythagorean-triplet derivation (printed p.31)

Quoted exactly as printed:

> \\( (a^2 - b^2) = a^4 - 2a^2b^2 + b^4 \\) ………. (II)

The left-hand side is missing its exponent. Line (I) directly above prints \\( (a^2 + b^2)^2 \\) with the square, and the conclusion two lines below uses \\( (a^2 - b^2)^2 \\) with the square. As printed, (II) asserts a degree-2 expression equals a degree-4 expression, which is false. **Flagged, not corrected.**

### 4.2 Spelling / typographic slips

- p.30 (recall statement) and p.35 ("Remember this!" item 2): "the sum of the squares of **remaning** two sides" — the p.34 statement of the same theorem spells it "remaining". The inconsistency is in the book.
- p.30: "With this convention, **refering** to figure 2.1" — for "referring".
- p.31 ("For more information" box): "Assign different values to a and b and obtain **5 Pythagorean triplet**" — should read "triplets".
- p.35 ("Remember this!" item 3): the sentence ends without a full stop — "…then the triangle is a right angled triangle" .

### 4.3 Naming inconsistency (not an error, but a trap)

p.31 heads the 30-60-90 and 45-45-90 results as "**Property**"; p.36's solved examples cite them as "by \\( 30^\circ-60^\circ-90^\circ \\) **theorem**" and "by \\( 45^\circ-45^\circ-90^\circ \\) **theorem**"; "Remember this!" item (4) says "\\( 30^\circ-60^\circ-90^\circ \\) theorem". Same results, three labels.

### 4.4 Algebra check of the 30-60-90 and 45-45-90 statements — NO error found

Both statements on printed pp.31–32 were checked against their own worked figures and are **self-consistent**:

- **30-60-90 (p.31):** the statement gives side-opposite-30° \\( = \frac{1}{2}h \\) and side-opposite-60° \\( = \frac{\sqrt{3}}{2}h \\). In Fig. 2.2 (\\( \angle L = 30^\circ \\), \\( \angle N = 60^\circ \\), \\( \angle M = 90^\circ \\), hypotenuse LN), the page assigns \\( MN = \frac{1}{2} \times LN \\) (MN is opposite \\( \angle L = 30^\circ \\) ✓) and \\( LM = \frac{\sqrt{3}}{2} \times LN \\) (LM is opposite \\( \angle N = 60^\circ \\) ✓). Numerically \\( LN = 6 \Rightarrow MN = 3 \\), \\( LM = 3\sqrt{3} \\), and \\( 3^2 + (3\sqrt{3})^2 = 9 + 27 = 36 = 6^2 \\) ✓.
- **45-45-90 (p.32):** legs \\( = \frac{1}{\sqrt{2}}h \\); with \\( ZY = 3\sqrt{2} \\) the page gets \\( XY = XZ = 3 \\), and \\( 3^2 + 3^2 = 18 = (3\sqrt{2})^2 \\) ✓.

The only thing wrong with these two statements is what the **text layer** does to them: it renders \\( \frac{1}{\sqrt{2}} \\) as "1/2" and \\( \frac{\sqrt{3}}{2} \\) as "3/2" or "3". The printed page is correct.

### 4.5 Apollonius proof — checked, NO error found

The two cited lines were verified against §1.10/§1.11 with the correspondence the figure implies:
- \\( AB^2 = AM^2 + MB^2 + 2BM \times MD \\) is §1.11 (obtuse \\( \angle AMB \\)) applied to \\( \triangle ABM \\) ✓
- \\( AC^2 = AM^2 + MC^2 - 2MC \times MD \\) is §1.10 (acute \\( \angle AMC \\)) applied to \\( \triangle ACM \\) ✓

Adding, with \\( BM = MC \\), gives \\( 2AM^2 + 2BM^2 \\) ✓. Consistent as printed.

---

## 5. Section numbering — the specific answer requested

**This chapter prints NO section numbers.** Verified by reading every one of printed pp.30–46.

- The topic headings are set in rounded pink boxes with **no number at all**: "Similarity and right angled triangle" (p.33), "Theorem of geometric mean" (p.33), "Pythagoras Theorem" (p.34), "Converse of Pythagoras theorem" (p.34), **"Application of Pythagoras theorem" (p.40)**, **"Apollonius theorem" (p.41)**.
- The only Roman-numbered items in the chapter are the two Class-9 revision properties on pp.31–32, printed as "**(I) Property of 30°−60°−90° triangle.**" and "**(II ) Property of 45°−45°−90°**". These number the two *properties*, not chapter sections.
- The only "2.x" numbers anywhere in the chapter are **figure** numbers (Fig. 2.1 through Fig. 2.35) and **exercise-block** numbers.

**So, explicitly, for the other agent's scoping:**

| Section | Printed number | Printed page |
|---|---|---|
| Application of Pythagoras theorem | **none — the heading is unnumbered** | p.40 |
| Apollonius theorem | **none — the heading is unnumbered** | p.41 |

**Exercise-block labels available for reference instead** (these *are* numbered, and are the only stable "2.x" handles in the chapter):

| Block | Printed label | Printed pages |
|---|---|---|
| First exercise | **Practice set 2.1** | pp.38–39 |
| Second exercise | **Practice set 2.2** | p.43 |
| End-of-chapter | **Problem set 2** | pp.43–46 |

The chapter also contains two **"Solved Examples"** banners — the first on p.36 (Ex. 1–7, running to p.38, immediately before Practice set 2.1) and the second on p.41 (Ex. 1–2, running to p.42, immediately before Practice set 2.2). Neither banner carries a number.

Chapter structure in printed order, for scoping:

1. p.30 — Let's study; Let's recall (Pythagoras theorem; Pythagorean Triplet)
2. p.31 — "For more information" box (triplet formula); (I) Property of 30°−60°−90°
3. p.32 — (II) Property of 45°−45°−90°; Activity (trapezium proof)
4. p.33 — Let's learn: Similarity and right angled triangle; Theorem of geometric mean
5. p.34 — Pythagoras Theorem; Converse of Pythagoras theorem
6. p.35 — (converse proof concludes); **Remember this !** box
7. pp.36–38 — Solved Examples (1)–(7)
8. pp.38–39 — Practice set 2.1
9. pp.40–41 — Let's learn: Application of Pythagoras theorem (Ex. 1 acute, Ex. 2 obtuse)
10. p.41 — Apollonius theorem
11. pp.41–42 — Solved Examples (1)–(2)
12. p.43 — Practice set 2.2
13. pp.43–46 — Problem set 2
14. p.46 — ICT Tools or Links
