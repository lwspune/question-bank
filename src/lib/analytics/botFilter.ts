/**
 * Is this browser a bot? Used only to keep bots out of Vercel Web Analytics
 * (every event is billed, and bots inflated visitors 1.7-2x against Clarity).
 * It never refuses a page: AI search bots must keep reaching every page.
 *
 * Two signals:
 * - `navigator.webdriver`: true in automated browsers (headless Chrome,
 *   Puppeteer, Playwright, Selenium), whatever user agent they send.
 * - A crawler name in the user agent. Matched as `<name>bot/` (Googlebot/2.1,
 *   OAI-SearchBot/1.0) rather than a bare "bot", which would catch real phones
 *   such as the Cubot.
 *
 * A bot that runs a normal browser and hides both signals is still counted;
 * nothing client-side can tell it apart.
 */
const CRAWLER_UA =
  /bot\/|crawler|spider|headless|lightpanda|chatgpt-user|externalhit|externalagent|lighthouse|inspectiontool|slurp|python-requests|curl\/|wget\//i;

export function isLikelyBot(userAgent: string | null | undefined, webdriver: boolean | undefined): boolean {
  if (webdriver === true) return true;
  return CRAWLER_UA.test(userAgent ?? "");
}

/** Vercel's `beforeSend` contract: return the event to send it, null to drop it. */
export function dropBotEvent<E>(
  event: E,
  browser: { userAgent: string | null | undefined; webdriver: boolean | undefined }
): E | null {
  return isLikelyBot(browser.userAgent, browser.webdriver) ? null : event;
}
