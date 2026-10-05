/**
 * The free saved-question limit (migration 0134). The trigger on
 * question_bookmarks refuses the next save with SQLSTATE PT402; the route
 * answers 402 with this code, and the provider throws `SaveLimitReached` so
 * the button can say why rather than "Couldn't save. Try again."
 */
export const FREE_SAVE_LIMIT_CODE = "FREE_SAVE_LIMIT";

export class SaveLimitReached extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SaveLimitReached";
  }
}
