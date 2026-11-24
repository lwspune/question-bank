/**
 * Where a signed-out student's half-built practice test waits through sign-in
 * (sessionStorage). Its own module so V's small launcher can see that one
 * waits without loading the builder (PAGE_WEIGHT_SPEC.md item 2).
 */
export const PENDING_BUILD_KEY = "v-practice-builder";
