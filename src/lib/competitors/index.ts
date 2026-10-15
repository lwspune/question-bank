import type { Audience } from "./model";
import { MH_12_SCIENCE } from "./audiences/mh12Science";

/** Every audience analysed so far, most important first. A new one is a new file in audiences/. */
export const AUDIENCES: Audience[] = [MH_12_SCIENCE];
