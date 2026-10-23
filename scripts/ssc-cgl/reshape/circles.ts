/**
 * Reshape plan: SSC CGL Tier I "Circles" (164 q), for scripts/ssc-cgl/reshape.ts.
 *
 * Read all 164 stems and solutions and the 15 figures (2026-10-23). The ingest's seven subtopics were
 * close to the teaching cut; the changes move rows to the page whose method solves them. A chord's
 * length from the angle it subtends (526e6c10, d0217dc0) needs the angle at the centre, so it joins
 * Angles; the common chord of two equal circles (4ad24591) joins the common-chord rows. The three
 * Circumcircle and Locus rows are angle-in-a-semicircle and three-point facts, so they fold into
 * Angles. Every alternate-segment row (09e9734d from Angles, 96a14053 from Common Tangents) sits on
 * the Tangents page, which teaches that theorem after the angle rules. Touching circles get their own
 * page after the general common-tangent formulas: the nine "touch externally" tangent rows, the
 * right angle at the point of contact and the chain of touching circles. Never featured: d339a7b5
 * and c5388c52 (their solutions open with a Note), 2a167686 (no Note, but the chord it computes is
 * longer than the diameter) and 86540165 (the stem's "respectively" swaps the radii the figure shows).
 */
import type { ReshapePlan } from "../reshape";

const T = {
  chords: "Chords and Perpendiculars",
  angles: "Angles in a Circle",
  tangents: "Tangents from an External Point",
  power: "Intersecting Chords and Power of a Point",
  common: "Common Tangents and Common Chords",
  touching: "Touching Circles",
} as const;

const plan: ReshapePlan = {
  chapter: "Circles",
  order: [T.chords, T.angles, T.tangents, T.power, T.common, T.touching],
  byPrefix: {
    [T.chords]: [
      // facts: terms, longest chord, equal chords and arcs
      "d23bd54f", "fadc6667", "f5bcca4e", "ccd8b47c", "e6df4dc5", "71fa6a0a", "9f12128c", "1864cf31",
      // half-chord, distance and radius
      "4089a51a", "0026a436", "649840a5", "66e124a6", "459b0e8f", "31ffe181", "6fe19a57", "a90ad876",
      "b0824d69", "5b9e5b05", "6b6ad97a", "5fe4113c", "b4feca5e", "2483d623", "0fa679dc", "e9b6e12e",
      "dafbed25", "a974a83f", "326b805f", "aa7c577c", "12bf744b", "bd94eeec",
      // concentric circles
      "cdc45c6e", "39b66d47", "67f25f94", "3472f736", "d89a8d0f",
      // two chords
      "fa91639e", "76f62ea0", "44067a86", "ff2225eb", "c5388c52",
    ],
    [T.angles]: [
      // angle at the centre, same segment, arcs
      "1db8ec9f", "d325bd41", "29056c05", "14ba9676", "0caadd7d", "52f1d75d", "7a692228", "1080ad4c",
      "2175f185", "7c354581", "2075270a", "9930e2c2", "88b39f00", "75fb3e9c", "4baae161", "19cdd4ef",
      "ce3e0c01",
      // semicircle and the circle through three points
      "b33a62bc", "186f4971", "17178943", "54531ba1", "a3e3a22d", "17dc11a5",
      // cyclic quadrilateral
      "2f4fb5aa", "32ab7c39", "709db769", "b0d8d943", "f400537a",
      // chord from its angle
      "526e6c10", "d0217dc0", "6697b566", "a803b3ed",
    ],
    [T.tangents]: [
      // tangent and radius, tangent length
      "05f5aa0d", "36f0966d", "0acc1d0f", "1047670c", "6d3c3115", "690bf9e7", "4d177246", "e56a8b2a",
      "ca2d5773", "dd17e6ee", "42d22217", "15c008ad", "f15b12d7", "42d47d49", "3d0dfff6",
      // two tangents from one point
      "1c756bfa", "115b0a38", "b1e88797", "4fe2b50a", "a44c932c", "9e99829d", "16c8e43d", "3c1b29b0",
      "f5c11a78", "030f754d",
      // circle inside a triangle
      "d138d6fd", "5624ca34", "f3662f22",
      // alternate segment
      "09e9734d", "18eb0c9f", "7f5193f1", "96a14053",
    ],
    [T.power]: [
      // chords crossing inside
      "32af41f1", "e94a4230", "43b2f769", "5aff4aaf", "186ab5c4",
      // secants and a tangent from an outside point
      "76009c63", "ed573147", "5884e892", "071abd5a", "247c8513", "89681fae", "e04d30df", "2a167686",
      "66c241a2", "860c8e76", "d63807fe",
      // power from the distance to the centre
      "7591d9e2", "d339a7b5",
    ],
    [T.common]: [
      // positions and the number of common tangents
      "e34d761c", "34317ce9", "4de0afc4", "76f7018a", "7b179299",
      // direct common tangent
      "23aaaa24", "1a73a62e", "a5e1362a", "bedb3924", "29936af3", "f8acdcb3", "fef2baa3", "94b7763b",
      "b6f8dc16", "fbb8c24d", "755f1230",
      // transverse tangent, and both together
      "067998e3", "dc242888", "98bd46fe", "951f8d96", "86540165", "edb7c79d", "383a766b", "ef33566c",
      "e0c7c63a",
      // common chord
      "4ad24591", "9f0360fb", "fb031c01", "1f7a9827", "883dbe6b",
    ],
    [T.touching]: [
      // direct tangent of touching circles
      "cd6af693", "d431d645", "0de2bfea", "8c95b95c", "f0685392", "6e286916", "07190394", "0c0df2c6",
      "79c67aaa",
      // centres, the point of contact and chains
      "55a45afe", "25e64a7c", "1bd83874",
    ],
  },
  expected: {
    [T.chords]: 40,
    [T.angles]: 32,
    [T.tangents]: 32,
    [T.power]: 18,
    [T.common]: 30,
    [T.touching]: 12,
  },
  total: 164,
};

export default plan;
