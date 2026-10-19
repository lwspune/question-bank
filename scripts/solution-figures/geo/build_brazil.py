"""Cut the small Brazil map file the `map` kind draws from (geo/brazil.json).

    python scripts/solution-figures/geo/build_brazil.py <natural-earth-geojson-dir>

Source: Natural Earth v5.1.2 (public domain), the GeoJSON in
github.com/nvkelso/natural-earth-vector/tree/v5.1.2/geojson:
ne_10m_admin_1_states_provinces, ne_50m_admin_0_countries,
ne_10m_rivers_lake_centerlines, ne_10m_geography_regions_polys,
ne_10m_populated_places_simple. Download them into their own folder and pass
it here; the 60 MB of inputs are not kept, only the ~1 MB this writes.

INDIA IS DELIBERATELY NOT BUILT HERE. Natural Earth's default India outline
differs from the Survey of India's in Jammu & Kashmir and Ladakh, and an SSC
answer must show the official one; the owner chose (2026-10-19) to hold the
India maps until an official outline is supplied.
"""
import json
import os
import sys

BBOX = (-82.0, -40.0, -28.0, 9.0)  # lon0, lat0, lon1, lat1: Brazil and its neighbours' edges
TOL = 0.02  # degrees, Douglas-Peucker: ~2 km, invisible at 350 px


def simplify(pts, tol=TOL):
    if len(pts) < 4:
        return pts
    if pts[0] == pts[-1]:
        # A closed ring's ends coincide, so the line between them has no length
        # and every point would measure zero from it: split at the point
        # farthest from the start and simplify the two halves.
        far = max(range(len(pts)), key=lambda i: (pts[i][0] - pts[0][0]) ** 2 + (pts[i][1] - pts[0][1]) ** 2)
        return simplify(pts[: far + 1], tol)[:-1] + simplify(pts[far:], tol)
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        (x1, y1), (x2, y2) = pts[a], pts[b]
        dx, dy = x2 - x1, y2 - y1
        norm = (dx * dx + dy * dy) ** 0.5 or 1e-12
        far, idx = 0.0, None
        for i in range(a + 1, b):
            d = abs(dy * (pts[i][0] - x1) - dx * (pts[i][1] - y1)) / norm
            if d > far:
                far, idx = d, i
        if idx is not None and far > tol:
            keep[idx] = True
            stack += [(a, idx), (idx, b)]
    return [[round(x, 3), round(y, 3)] for (x, y), k in zip(pts, keep) if k]


def rings(geom):
    t, c = geom["type"], geom["coordinates"]
    if t == "Polygon":
        return [c[0]]
    if t == "MultiPolygon":
        return [p[0] for p in c]
    return []


def lines(geom):
    t, c = geom["type"], geom["coordinates"]
    return [c] if t == "LineString" else c if t == "MultiLineString" else []


def touches(pts):
    return any(BBOX[0] < x < BBOX[2] and BBOX[1] < y < BBOX[3] for x, y in pts[::5])


def load(d, name):
    return json.load(open(os.path.join(d, name + ".geojson"), encoding="utf-8"))["features"]


def main(d):
    out = {"source": "Natural Earth v5.1.2 (public domain)", "states": {}, "countries": {}, "rivers": {}, "areas": {}, "places": {}}
    for f in load(d, "ne_10m_admin_1_states_provinces"):
        p = f["properties"]
        if p.get("adm0_a3") == "BRA":
            out["states"][p["name"]] = [simplify(r) for r in rings(f["geometry"]) if len(r) > 3]
    for f in load(d, "ne_50m_admin_0_countries"):
        rs = [simplify(r, 0.05) for r in rings(f["geometry"]) if touches(r)]
        if rs:
            out["countries"][f["properties"]["ADM0_A3"]] = rs

    rivers = {}
    for f in load(d, "ne_10m_rivers_lake_centerlines"):
        n = (f["properties"].get("name") or "").strip()
        for ln in lines(f["geometry"]):
            if touches(ln):
                rivers.setdefault(n, []).append(ln)
    # Natural Earth files the Paraguay under "Paraná": the line that rises in
    # Mato Grosso near 14 S and runs to the Plata is Paraguay as far as the
    # confluence with the upper Paraná (27.3 S, 58.6 W), Paraná below it.
    conf = (-58.60, -27.31)
    para = max(rivers["Paraná"], key=lambda ln: ln[0][1])  # the one rising furthest north
    cut = min(range(len(para)), key=lambda i: (para[i][0] - conf[0]) ** 2 + (para[i][1] - conf[1]) ** 2)
    rivers["Paraguay"] = [para[: cut + 1]]
    rivers["Paraná"] = [ln for ln in rivers["Paraná"] if ln is not para] + [para[cut:]]
    for name in ("Amazonas", "São  Francisco", "Paraná", "Paraguay", "Negro", "Tocantins", "Madeira", "Xingu", "Tapajós", "Uruguay"):
        out["rivers"][name.replace("  ", " ")] = [simplify(ln, 0.01) for ln in rivers.get(name, [])]

    for f in load(d, "ne_10m_geography_regions_polys"):
        n = f["properties"]["NAME"]
        if n in ("PANTANAL", "PAMPAS", "CAATINGAS", "Ilha de Marajó", "GUIANA HIGHLANDS", "BRAZILIAN HIGHLANDS", "AMAZON BASIN"):
            out["areas"][n] = [simplify(r) for r in rings(f["geometry"]) if len(r) > 3]

    for f in load(d, "ne_10m_populated_places_simple"):
        p = f["properties"]
        if p.get("adm0_a3") == "BRA" and p["name"] in ("Manaus", "Brasília", "Rio de Janeiro", "Rio Grande", "São Paulo", "Belém", "Salvador", "Recife"):
            out["places"][p["name"]] = [round(c, 3) for c in f["geometry"]["coordinates"]]

    dst = os.path.join(os.path.dirname(os.path.abspath(__file__)), "brazil.json")
    json.dump(out, open(dst, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    print(dst, os.path.getsize(dst) // 1024, "KB;", {k: len(v) for k, v in out.items() if isinstance(v, dict)})


if __name__ == "__main__":
    main(sys.argv[1])
