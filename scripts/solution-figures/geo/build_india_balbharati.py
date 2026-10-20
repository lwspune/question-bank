"""Georeference Balbharati's India political map so answers can be marked on it.

    python scripts/solution-figures/geo/build_india_balbharati.py <natural-earth-geojson-dir>

WHY THE BOOK'S MAP. India's outline must be the official one (Survey of
India); Natural Earth's is not. The owner chose (2026-10-19) Balbharati's own
India map, the one an SSC student marks in the exam, printed with SoI
permission. Nothing of India's outline is drawn here: the book's page is the
base, and only the answer (a place, a river, a range) is drawn on top.

HOW. The page is rendered exactly as run.ts crops it. Its printed graticule
(grey dotted meridians and parallels every 2 degrees) is found by pixel,
seeded from places the book itself prints (CONTROLS), and a quadratic maps
(lon, lat) to pixels. The fit and a leave-one-out check against CONTROLS are
written into the output so draw.py's selftest can hold it to account.

Natural Earth v5.1.2 (public domain) supplies INTERIOR features only: the
Narmada, the Aravalli range, the Western Ghats, the Laccadive Islands.
"""
import json
import os
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "..", "lib", "figures"))
from crop_answer_figs import render  # noqa: E402  the same render run.ts crops with

PDF = "C:/Vilas/LWS_Pune/NDA_Subjects_Content/Subjects/State-Board/02. 10th/10th_Geog_SB.pdf"
PAGE, BBOX = 20, [0.104, 0.2405, 0.897, 0.908]  # Fig. 2.1 India: Political, as cropped in wave 3
# Places the book prints, read off a zoomed 10 px grid of the render: (lon, lat, x, y).
CONTROLS = {
    "Diu": (70.98, 20.71, 160.0, 791.5),
    "New Delhi": (77.21, 28.61, 427.3, 428.3),
    "Puducherry": (79.83, 11.93, 537.5, 1194.0),
    "Kanyakumari": (77.54, 8.08, 431.0, 1377.5),
    "Yanam": (82.21, 16.73, 644.0, 976.7),
    "Indira Point": (93.84, 6.75, 1202.5, 1400.0),
    # Printed graticule crossings, read off a zoomed 10 px grid: they anchor the
    # north-east and north-west, which no printed place covers. Without them the
    # fit put 88 E some 57 px east and drew Sikkim's ring on Bhutan (2026-10-20).
    "88E 28N": (88.0, 28.0, 866.0, 448.0),
    "92E 28N": (92.0, 28.0, 1018.0, 434.0),
    "92E 24N": (92.0, 24.0, 1040.0, 611.0),
    "96E 24N": (96.0, 24.0, 1210.0, 602.0),
    "72E 32N": (72.0, 32.0, 236.0, 271.0),
}
PLACES = {"Chennai": (80.27, 13.08), "Visakhapatnam": (83.30, 17.69), "Digboi": (95.62, 27.39), "Gangtok": (88.61, 27.33),
          "Shimla": (77.17, 31.10), "Thiruvananthapuram": (76.94, 8.52), "Amarkantak": (81.75, 22.67)}


def F(lon, lat):
    lon = np.atleast_1d(np.asarray(lon, float))
    lat = np.atleast_1d(np.asarray(lat, float))
    return np.stack([np.ones_like(lon), lon, lat, lon * lon, lon * lat, lat * lat], -1)


def fit(points):
    P = np.asarray(points, float)
    return (np.linalg.lstsq(F(P[:, 0], P[:, 1]), P[:, 2], rcond=None)[0],
            np.linalg.lstsq(F(P[:, 0], P[:, 1]), P[:, 3], rcond=None)[0])


def grey_mask(img):
    a = np.asarray(img).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    return (abs(r - g) < 22) & (abs(g - b) < 28) & (r > 95) & (r < 205)


def line_samples(grey, cx, cy, win):
    """Samples along the printed grid lines. A meridian fixes x at a known lon
    (any lat on it), a parallel fixes y at a known lat: walk each predicted line
    and take the grey dotted line nearest to it, perpendicular to the line."""
    H, W = grey.shape
    xs, ys = [], []
    for lon in range(68, 101, 2):
        for lat in np.arange(4, 37, 0.5):
            x, y = (float((F(lon, lat) @ c)[0]) for c in (cx, cy))
            xi, yi = int(round(x)), int(round(y))
            if not (win + 3 < xi < W - win - 3 and 6 < yi < H - 6):
                continue
            col = [grey[yi - 5:yi + 6, xi + d].sum() for d in range(-win, win + 1)]
            k = int(np.argmax(col))
            if col[k] >= 3:
                xs.append((lon, lat, xi - win + k))
    for lat in range(4, 37, 2):
        for lon in np.arange(68, 101, 0.5):
            x, y = (float((F(lon, lat) @ c)[0]) for c in (cx, cy))
            xi, yi = int(round(x)), int(round(y))
            if not (6 < xi < W - 6 and win + 3 < yi < H - win - 3):
                continue
            row = [grey[yi + d, xi - 5:xi + 6].sum() for d in range(-win, win + 1)]
            k = int(np.argmax(row))
            if row[k] >= 3:
                ys.append((lon, lat, yi - win + k))
    return np.array(xs, float), np.array(ys, float)


def robust(samples, controls_col, C, tol):
    """One axis: least squares over the grid samples and the controls, dropping outliers."""
    S = np.vstack([samples, np.c_[C[:, 0], C[:, 1], C[:, controls_col]]])
    keep = np.ones(len(S), bool)
    for _ in range(10):
        c = np.linalg.lstsq(F(S[keep, 0], S[keep, 1]), S[keep, 2], rcond=None)[0]
        res = np.abs(F(S[:, 0], S[:, 1]) @ c - S[:, 2])
        keep = res < tol
        keep[-len(C):] = True  # the book's own marks always count
    return c, S[keep], res[keep]


def lines(geom):
    t, c = geom["type"], geom["coordinates"]
    return [c] if t == "LineString" else c


def rings(geom):
    t, c = geom["type"], geom["coordinates"]
    return [c[0]] if t == "Polygon" else [p[0] for p in c]


def main(ne):
    img = render(PDF, PAGE, BBOX)
    C = np.array(list(CONTROLS.values()))
    # seed: affine from the controls, then the graticule, tightening
    A = np.stack([np.ones(len(C)), C[:, 0], C[:, 1]], -1)
    ax, ay = (np.linalg.lstsq(A, C[:, i], rcond=None)[0] for i in (2, 3))
    cx, cy = np.array([ax[0], ax[1], ax[2], 0, 0, 0]), np.array([ay[0], ay[1], ay[2], 0, 0, 0])
    grey = grey_mask(img)
    for win, tol in ((20, 8), (10, 4), (6, 3), (6, 3)):
        xs, ys = line_samples(grey, cx, cy, win)
        cx, kx, rx = robust(xs, 2, C, tol)
        cy, ky, ry = robust(ys, 3, C, tol)
    rms = float(np.sqrt(np.mean(np.r_[rx, ry] ** 2)))
    # The fit must rest on samples in every quarter of the map, or a corner
    # (the north-east, where Sikkim and Digboi lie) is extrapolated, not fitted.
    for name, K in (("meridian", kx), ("parallel", ky)):
        quarters = {(lo >= 84, la >= 20) for lo, la in K[:, :2]}
        if len(quarters) < 4 or (K[:, 0] >= 88).sum() < 20:
            raise SystemExit(f"{name} samples too thin: {len(K)}, quarters {sorted(quarters)}")
    keep = np.ones(len(kx) + len(ky), bool)
    loo = {}
    for n in CONTROLS:
        Co = np.array([v for k, v in CONTROLS.items() if k != n])
        ox, _, _ = robust(xs, 2, Co, 3)
        oy, _, _ = robust(ys, 3, Co, 3)
        lo, la, x, y = CONTROLS[n]
        loo[n] = round(float(np.hypot((F(lo, la) @ ox)[0] - x, (F(lo, la) @ oy)[0] - y)), 1)

    feats = {}
    for f in json.load(open(os.path.join(ne, "ne_10m_rivers_lake_centerlines.geojson"), encoding="utf-8"))["features"]:
        if f["properties"].get("name") == "Narmada":
            feats["Narmada"] = {"type": "line", "coords": lines(f["geometry"])}
    for f in json.load(open(os.path.join(ne, "ne_10m_geography_regions_polys.geojson"), encoding="utf-8"))["features"]:
        n = f["properties"]["NAME"]
        if n in ("Arvalli Ra.", "WESTERN GHATS", "Laccadive Islands"):
            feats[n] = {"type": "area", "coords": rings(f["geometry"])}
    out = {"source": f"{os.path.basename(PDF)} page {PAGE} (Balbharati SSC 10 Geography, Fig. 2.1 India: Political); "
                     "interior features: Natural Earth v5.1.2 (public domain)",
           "pdf": PDF, "page": PAGE, "bbox": BBOX, "size": list(img.size), "cx": cx.tolist(), "cy": cy.tolist(),
           "rms_px": round(rms, 2), "grid_points": int(len(kx) + len(ky)), "leave_one_out_px": loo,
           "controls": {k: list(v) for k, v in CONTROLS.items()}, "places": {k: list(v) for k, v in PLACES.items()}, "features": feats}
    dst = os.path.join(HERE, "india_balbharati.json")
    json.dump(out, open(dst, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    print(dst, f"rms {rms:.2f}px over {len(kx)} meridian + {len(ky)} parallel samples; leave-one-out {loo}; features {sorted(feats)}")


if __name__ == "__main__":
    main(sys.argv[1])
