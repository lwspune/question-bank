"""
Download the IPMAT figures and convert them to PNG.

    python scripts/ipmat/fetch_figures.py            # download + convert
    python scripts/ipmat/fetch_figures.py --force    # refetch everything

Reads the figure URLs out of scripts/ipmat/data/build/*.json, writes PNGs plus a
manifest to scripts/ipmat/out/figures/ (gitignored via the top-level `out/` rule).

WHY PNG, NOT WEBP. 65 of the 81 source figures are WebP, and our storage layer
REFUSES WebP on purpose: `src/lib/storage/images.ts` says the docx library's
ImageRun cannot embed it, so a WebP figure would upload fine and then be missing
from every downloaded Word paper -- which is the teacher deliverable. Pillow is
already available and the project already uses Python for image work
(scripts/cds/crop.py, scripts/jee/compose_figures.py), so no new npm dependency.

WHY THE ORIGINALS ARE NOT USED. There are no original question papers available
for these three exams, so the source's own renderings are the only copies of
these figures that exist for us. They are downloaded once, converted, and served
from our own storage rather than hotlinked -- a hotlink would break silently
when the source reorganises, and would leak our users' requests to them.

MULTI-FIGURE STEMS are composed into one image by the existing
scripts/jee/compose_figures.py, because a question row carries a single
`image_url`; keeping only the first figure ships a question that cannot be
answered from what is on screen.
"""

import hashlib
import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
BUILD = HERE / "data" / "build"
OUT = HERE / "out" / "figures"
COMPOSE = HERE.parent / "jee" / "compose_figures.py"

# The storage layer's cap. A figure over this cannot be uploaded at all.
MAX_BYTES = 1024 * 1024
TIMEOUT = 40


def key_for(url: str) -> str:
    return hashlib.sha1(url.encode("utf-8")).hexdigest()[:16]


def collect():
    """{row_id: {"stem": [urls], "options": {label: url}}} plus the distinct URL set."""
    rows = {}
    urls = []
    seen = set()
    for path in sorted(BUILD.glob("*.json")):
        for r in json.loads(path.read_text(encoding="utf-8")):
            if r["reconstructed"] or r["dropped"] or r["problems"]:
                continue
            stem = [f["src"] for f in r["figures"] if f["src"]]
            opts = {o["label"]: o["imageUrl"] for o in r["options"] if o["imageUrl"]}
            # A figure that belongs to an option must not also count as a stem
            # figure, or a picture-option row gets an arbitrary option's image
            # stamped on the question as well.
            option_urls = set(opts.values())
            stem = [u for u in stem if u not in option_urls]
            if not stem and not opts:
                continue
            rows[r["sourceId"]] = {
                "exam": r["exam"],
                "year": r["year"],
                "section": r["section"],
                "questionNumber": r["questionNumber"],
                "stem": stem,
                "options": opts,
            }
            for u in stem + list(opts.values()):
                if u not in seen:
                    seen.add(u)
                    urls.append(u)
    return rows, urls


def download(url: str, dest: Path, force: bool) -> bytes:
    raw = dest.with_suffix(".src")
    if force or not raw.exists() or raw.stat().st_size == 0:
        req = urllib.request.Request(url, headers={"User-Agent": "pyqvault-ingest/1.0"})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            raw.write_bytes(resp.read())
    return raw.read_bytes()


def source_format(b: bytes) -> str:
    if b[:8] == b"\x89PNG\r\n\x1a\n":
        return "png"
    if b[:3] == b"\xff\xd8\xff":
        return "jpeg"
    if b[:4] == b"RIFF" and b[8:12] == b"WEBP":
        return "webp"
    return "unknown"


def main() -> int:
    force = "--force" in sys.argv
    OUT.mkdir(parents=True, exist_ok=True)
    rows, urls = collect()
    print(f"{len(urls)} distinct figures across {len(rows)} rows")

    manifest = {}
    failures = []
    formats = {}

    for i, url in enumerate(urls, 1):
        k = key_for(url)
        png = OUT / f"{k}.png"
        src = OUT / f"{k}.src"
        try:
            raw = download(url, OUT / k, force)
            fmt = source_format(raw)
            formats[fmt] = formats.get(fmt, 0) + 1
            if fmt == "unknown":
                failures.append(f"{url}: unrecognised image format")
                continue
            if force or not png.exists():
                # Flatten onto white: a transparent WebP becomes a black
                # rectangle in Word if the alpha channel is simply dropped.
                # Open the DOWNLOADED file, not the key path. These differed in
                # the first version and every conversion failed with ENOENT.
                with Image.open(src) as im:
                    im.load()
                    if im.mode in ("RGBA", "LA", "P"):
                        im = im.convert("RGBA")
                        bg = Image.new("RGB", im.size, (255, 255, 255))
                        bg.paste(im, mask=im.split()[-1])
                        im = bg
                    else:
                        im = im.convert("RGB")
                    im.save(png, "PNG", optimize=True)
            with Image.open(png) as out_im:
                w, h = out_im.size
            size = png.stat().st_size
            if size > MAX_BYTES:
                failures.append(f"{url}: {size} bytes as PNG, over the {MAX_BYTES} cap")
            manifest[url] = {
                "key": k,
                "file": png.name,
                "width": w,
                "height": h,
                "bytes": size,
                "sourceFormat": fmt,
            }
        except Exception as exc:  # noqa: BLE001 - report, never guess
            failures.append(f"{url}: {exc}")
        if i % 20 == 0:
            print(f"  … {i}/{len(urls)}")

    # ---- compose the multi-figure stems into one image each
    composites = {}
    for rid, info in rows.items():
        if len(info["stem"]) < 2:
            continue
        parts = [OUT / manifest[u]["file"] for u in info["stem"] if u in manifest]
        if len(parts) != len(info["stem"]):
            failures.append(f"{rid}: {len(info['stem'])} stem figures but only {len(parts)} downloaded")
            continue
        dest = OUT / f"composite-{rid}.png"
        if force or not dest.exists():
            res = subprocess.run(
                [sys.executable, str(COMPOSE), str(dest)] + [str(p) for p in parts],
                capture_output=True,
                text=True,
            )
            if res.returncode != 0:
                failures.append(f"{rid}: compose failed: {res.stderr.strip()[:160]}")
                continue
        size = dest.stat().st_size
        if size > MAX_BYTES:
            failures.append(f"{rid}: composite is {size} bytes, over the cap")
        composites[rid] = {"file": dest.name, "bytes": size, "panels": len(parts)}

    (OUT / "manifest.json").write_text(
        json.dumps({"figures": manifest, "composites": composites, "rows": rows}, indent=1),
        encoding="utf-8",
    )

    print()
    print("source formats:", formats)
    print(f"converted to PNG: {len(manifest)}")
    print(f"composites built: {len(composites)}  (multi-figure stems)")
    total = sum(m["bytes"] for m in manifest.values())
    print(f"total PNG bytes: {total/1048576:.2f} MB")
    print(f"manifest: {OUT / 'manifest.json'}")
    if failures:
        print(f"\nFAILURES ({len(failures)}):")
        for f in failures:
            print("  " + f)
        return 1
    print("\nFIGURES: OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
