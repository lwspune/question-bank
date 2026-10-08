"""
Draft a Cambridge-set IMAT paper (2011-2022) from its text layer, by LAYOUT.

    python scripts/imat/extract_cambridge.py <paper.pdf> <year> <out.json>

The ministry papers print "A) text"; Cambridge's print the question number in
the left margin, the letters A-E in a column, and each option's text beside
its letter, so the plain text stream loses which line belongs to which
option. This reads words with their positions instead:
- a question starts at a number in the left margin;
- the stem is every line above that question's first A-E label;
- option k is every line from label k down to label k+1, right of the label.
Lines in one text block are joined with spaces; blocks with a newline.

The answer comes from the printed key on the last page, not from here.
Tables and figures come out flattened or missing, and are re-done by a
person from the page image; every question that has a drawing or an image
on its page region is flagged for that.
"""
import json
import os
import re
import sys

import fitz  # PyMuPDF

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from extract import line_text  # noqa: E402  the ministry extractor's sub/superscript rule
from glyphs import decoder_for  # noqa: E402  2021's text layer holds glyph numbers

HEADINGS = (
    "General Knowledge and Logical Reasoning", "General Knowledge", "Logical Reasoning",
    "Thinking Skills", "Biology", "Chemistry", "Physics and Mathematics",
)
FOOTER = re.compile(r"^(©\s*UCLES.*|Page \d+ / \d+|\d{2}[A-Z]{2}\d{5}|IMAT \d{4}.*|[0-9A-Z]{9}|BLANK PAGE|©\s*Cambridge University Press.*|Page \d+/\d+|ADMISSION TEST FOR THE DEGREE COURSE.*|Academic Year \d{4}/\d{4})$")


# Years whose option letters sit on the MIDDLE line of a multi-line option
# rather than its first line.
CENTRED_LABEL_YEARS = {2011}


def page_lines(page, dec=None):
    """[(x0, y0, x1, y1, text, block_no)] for every text line on the page, in reading order."""
    out = []
    # An encoded page (glyphs.py) codes its own spaces as a glyph, and a space
    # PyMuPDF inserts between spans would decode as "=", so none is inserted.
    flags = None if dec is None else fitz.TEXTFLAGS_DICT | fitz.TEXT_INHIBIT_SPACES
    dec = dec or (lambda s: s)
    for b in page.get_text("dict", flags=flags)["blocks"]:
        for line in b.get("lines", []):
            # Invisible text (alpha 0) is a copy laid over 2021's watermark logo, not the paper.
            line["spans"] = [s for s in line["spans"] if s.get("alpha", 255) != 0]
            for span in line["spans"]:
                span["text"] = dec(span["text"])
            # Sub/superscripts kept as _{..}/^{..}; wrapped as LaTeX once the section is known.
            t = line_text(line).replace(" ", " ").strip()
            if t:
                x0, y0, x1, y1 = line["bbox"]
                out.append((x0, y0, x1, y1, t, b["number"]))
    out.sort(key=lambda r: (round(r[1], 0), r[0]))
    return out


def has_graphics(page, y0, y1):
    def inked(c):
        return c is not None and any(v < 0.9 for v in c[:3])
    for d in page.get_drawings():
        r = d["rect"]
        # Layout tools leave invisible boxes (white fill, white stroke) around
        # text frames, some larger than the page; only visible ink is a figure.
        if not (inked(d.get("fill")) or inked(d.get("color"))) or r.height > page.rect.height:
            continue
        if r.y1 > y0 and r.y0 < y1 and (r.width > 15 or r.height > 15):
            return True
    for img in page.get_images(full=True):
        for r in page.get_image_rects(img[0]):
            if r.y1 > y0 and r.y0 < y1 and r.height > 10:
                return True
    return False


def join(lines):
    """Join lines: same block -> space, new block -> newline."""
    parts, last_block = [], None
    for _, _, _, _, t, b in lines:
        if last_block is not None and b != last_block:
            parts.append("\n")
        elif parts:
            parts.append(" ")
        parts.append(t)
        last_block = b
    return re.sub(r"[ \t]+", " ", "".join(parts)).strip()


def main(pdf, year, out):
    doc = fitz.open(pdf)
    dec = decoder_for(year)
    centred = int(year) in CENTRED_LABEL_YEARS
    questions = []
    # The last page is the key (2022 has none, so its last page holds Q60). Page 1 is a cover in most years, but 2014 starts its
    # first question there; a cover simply has no margin numbers, so reading it is harmless.
    last = doc.page_count - 1
    has_key = re.search(r"answer key", (dec or (lambda s: s))(doc[last].get_text()), re.I) is not None
    for pno in range(0, last if has_key else doc.page_count):
        page = doc[pno]
        lines = [l for l in page_lines(page, dec) if not FOOTER.match(l[4]) and l[4] not in HEADINGS
                 # a bare page number in the footer zone (2011 prints no "Page N / M")
                 and not (l[1] > page.rect.y1 - 60 and re.fullmatch(r"\d{1,2}", l[4]))]
        # 2011 sets a two-digit question number on the same line as the stem's
        # first words ("10 Two security guards..."): split it off.
        split = []
        for l in lines:
            m = re.fullmatch(r"(\d{1,2}) +(\S.*)", l[4])
            if m and l[0] < 70:
                split += [(l[0], l[1], l[0] + 12, l[3], m.group(1), l[5]), (78, l[1], l[2], l[3], m.group(2), l[5])]
            else:
                split.append(l)
        lines = split
        starts = [l for l in lines if re.fullmatch(r"\d{1,2}", l[4]) and l[0] < 70]
        labels = [l for l in lines if re.fullmatch(r"[A-E]", l[4]) and 70 <= l[0] < 120]
        for i, s in enumerate(starts):
            top, bottom = s[1] - 1, starts[i + 1][1] - 1 if i + 1 < len(starts) else page.rect.y1
            mine = [l for l in lines if top <= l[1] < bottom and l is not s and l not in labels]
            labs = sorted((l for l in labels if top <= l[1] < bottom), key=lambda l: l[1])
            bounds = []
            for k, lab in enumerate(labs[:5]):
                if centred:
                    # The letter sits on the middle line of a multi-line option,
                    # so an option runs from half-way up to the previous letter.
                    gap = (labs[1][1] - lab[1]) if len(labs) > 1 else 4
                    lo = (labs[k - 1][1] + lab[1]) / 2 if k else lab[1] - gap / 2
                    hi = (lab[1] + labs[k + 1][1]) / 2 if k + 1 < len(labs) else bottom
                else:
                    lo = lab[1] - 2
                    hi = labs[k + 1][1] - 2 if k + 1 < len(labs) else bottom
                bounds.append((lo, hi, lab))
            first_label_y = bounds[0][0] + (0 if centred else 1) if labs else bottom
            stem = [l for l in mine if l[1] < first_label_y]
            opts = [join([l for l in mine if lo <= l[1] < hi and l[0] > lab[2] + 2]) for lo, hi, lab in bounds]
            flags = []
            if len(labs) != 5:
                flags.append(f"labels={''.join(l[4] for l in labs)}")
            if any(not o for o in opts):
                flags.append("empty-option")
            if has_graphics(page, top, bottom):
                flags.append("graphics")
            questions.append({
                "n": int(s[4]), "page": pno + 1, "section": None, "subject": None, "chapter": "",
                "text": join(stem), "options": opts, "flags": flags,
            })
    questions.sort(key=lambda q: q["n"])
    json.dump({"year": int(year), "draft": True, "questions": questions},
              open(out, "w", encoding="utf-8", newline="\n"), ensure_ascii=False, indent=1)
    nums = [q["n"] for q in questions]
    missing = sorted(set(range(1, max(nums) + 1)) - set(nums)) if nums else []
    print(f"{year}: {len(questions)} questions, missing {missing}, flagged {sum(1 for q in questions if q['flags'])}")


if __name__ == "__main__":
    main(*sys.argv[1:4])
