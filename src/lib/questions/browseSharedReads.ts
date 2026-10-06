/**
 * Which viewers may be served /browse's remembered (signed-out) year list.
 *
 * `get_pyq_years` is security invoker, so its answer depends on who asks:
 * org members (staff) and the superadmin can also see private questions.
 * Everyone else (signed out, or a student with no org) sees PUBLIC only, which
 * is exactly what the remembered list was read as. Staff and the superadmin
 * keep a live read: the remembered list would hide years that exist only in a
 * private upload. The list itself is always read signed-out (see
 * getCachedPyqYears), so nothing private can ever be remembered.
 */
export function yearsSource(viewer: { isStaff: boolean; canEditContent: boolean }): "cached" | "live" {
  return viewer.isStaff || viewer.canEditContent ? "live" : "cached";
}
