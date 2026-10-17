/**
 * Where V's panel sits on a phone (2026-10-18). The panel is `fixed inset-0`,
 * which iOS sizes to the LAYOUT viewport; with the keyboard open only the
 * VISUAL viewport shrinks, so the typing box slid under the keyboard and the
 * page showed through. On a phone the panel follows the visual viewport; on a
 * wider screen (a floating panel) and without visualViewport, the stylesheet
 * decides. Spec: tests/chat-panel-box.test.ts.
 */
export type PanelBox = { top: number; height: number; bottom: "auto" };

export function panelBox(
  viewport: { offsetTop: number; height: number } | null,
  phone: boolean
): PanelBox | null {
  if (!viewport || !phone) return null;
  return { top: Math.round(viewport.offsetTop), height: Math.round(viewport.height), bottom: "auto" };
}
