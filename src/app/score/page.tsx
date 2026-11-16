/** pyqvault.com/score: the short link on share cards and reels, to the calculators list. */
import { permanentRedirect } from "next/navigation";

export default function ScoreShortLink() {
  permanentRedirect("/score-calculator");
}
