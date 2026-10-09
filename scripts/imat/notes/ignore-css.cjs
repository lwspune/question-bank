// Preload for render-smoke.tsx: a required .css file (KaTeX's stylesheet)
// becomes an empty module, so components that import it can be
// server-rendered under tsx. Use with `--require ./scripts/imat/notes/ignore-css.cjs`.
require.extensions[".css"] = () => {};
