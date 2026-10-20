"""Cut the world map file the `map` kind draws regional maps from (geo/world.json).

    python scripts/solution-figures/geo/build_world.py <natural-earth-geojson-dir>

Source: Natural Earth v5.1.2 (public domain), GeoJSON from
github.com/nvkelso/natural-earth-vector/tree/v5.1.2/geojson:
ne_50m_admin_0_countries, ne_50m_lakes, ne_10m_populated_places_simple.

INDIA IS NEVER DRAWN FROM THIS FILE. Natural Earth's outline of India differs
from the Survey of India's, and the owner chose (2026-10-19) to wait for an
official one. draw.py's `extent_shows_india` refuses any frame that would show
it, so the countries can stay complete here without risk.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_brazil import simplify  # noqa: E402

LAKES = ("Lake Superior", "Lake Michigan", "Lake Huron", "Lake Erie", "Lake Ontario")
PLACES = ("Tokyo", "Yokohama", "Osaka", "Kobe", "Kyoto", "Nagoya", "Kitakyushu", "Sydney", "Melbourne", "Adelaide", "Perth",
          "Johannesburg", "Pretoria", "Kimberley", "Essen", "Dortmund", "Duisburg", "Chicago", "Detroit", "Cleveland", "Toronto",
          "Pittsburgh", "Buffalo")


def rings(geom):
    t, c = geom["type"], geom["coordinates"]
    if t == "Polygon":
        return [c[0]]
    if t == "MultiPolygon":
        return [p[0] for p in c]
    return []


def load(d, name):
    return json.load(open(os.path.join(d, name + ".geojson"), encoding="utf-8"))["features"]


def main(d):
    out = {"source": "Natural Earth v5.1.2 (public domain)", "countries": {}, "lakes": {}, "places": {}}
    for f in load(d, "ne_50m_admin_0_countries"):
        rs = [simplify(r, 0.03) for r in rings(f["geometry"]) if len(r) > 3]
        out["countries"].setdefault(f["properties"]["ADM0_A3"], []).extend(r for r in rs if len(r) > 2)
    for f in load(d, "ne_50m_lakes"):
        n = f["properties"].get("name")
        if n in LAKES:
            out["lakes"][n] = [simplify(r, 0.02) for r in rings(f["geometry"])]
    best = {}
    for f in load(d, "ne_10m_populated_places_simple"):
        p = f["properties"]
        n = p.get("nameascii") or p["name"]  # "Ōsaka" is filed with nameascii "Osaka"
        if n in PLACES and p.get("pop_max", 0) > best.get(n, (-1,))[0]:
            best[n] = (p.get("pop_max", 0), [round(c, 3) for c in f["geometry"]["coordinates"]])
    out["places"] = {n: v[1] for n, v in best.items()}
    missing = set(PLACES) - set(out["places"]) | set(LAKES) - set(out["lakes"])
    if missing:
        raise SystemExit(f"not found in Natural Earth: {sorted(missing)}")
    dst = os.path.join(os.path.dirname(os.path.abspath(__file__)), "world.json")
    json.dump(out, open(dst, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print(dst, os.path.getsize(dst) // 1024, "KB;", {k: len(v) for k, v in out.items() if isinstance(v, dict)})


if __name__ == "__main__":
    main(sys.argv[1])
