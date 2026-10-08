"""
Decode a paper whose text layer holds GLYPH NUMBERS instead of characters.

The 2021 copy embeds its fonts as Type0 with an identity mapping and no
character map, so the text layer is each glyph's number in the font. Its
TrueType fonts use the standard Macintosh glyph order, where glyph 3 is the
space and every printable ASCII character sits 29 below its code point
("$'0,66,21" is "ADMISSION"). Above ASCII the Mac order continues with
accented letters and symbols; glyphs past it are font-specific and were read
off the page images one by one.

A glyph this table does not know comes out as a visible marker, never as a
guess, so a reviewer cannot miss it.
"""

SHIFT = 29

# Mac standard order beyond ASCII, as observed in the 2021 copy (each checked
# against the rendered page), plus the font-specific glyphs it uses.
EXTRA = {
    0x7C: "ö",       # Odieresis-row: odieresis (Röntgen)
    0x83: "°",       # degree
    0x85: "£",       # sterling
    0x8B: "©",       # copyright
    0xB1: "–",       # endash (also the minus in Times New Roman maths)
    0xB2: "—",       # emdash
    0xB3: "“",       # quotedblleft
    0xB4: "”",       # quotedblright
    0xB5: "‘",       # quoteleft
    0xB6: "’",       # quoteright
    0xEE: "×",       # Times New Roman: multiply
    0x13A: "→",      # Arial and Times New Roman: arrow
    0xBD7: " ",      # thin space (50.0 mL)
    0xBD8: " ",      # thin space (mol L)
    0x4CCB: "⇌",     # MS UI Gothic: equilibrium harpoons
}

# Years whose text layer needs decoding.
ENCODED_YEARS = {2021}


def decode(s):
    out = []
    for c in s:
        o = ord(c)
        if c in "\n\r\t":
            out.append(c)
        elif 3 <= o < 3 + 95:
            out.append(chr(o + SHIFT))
        elif o in EXTRA:
            out.append(EXTRA[o])
        else:
            out.append(f"⟦{o:#x}⟧")
    return "".join(out)


def decoder_for(year):
    """The decoder for an encoded year, or None for a paper with a normal text layer."""
    return decode if int(year) in ENCODED_YEARS else None
