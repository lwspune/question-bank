// Lets `tsx` import modules that pull in a stylesheet (KaTeX): a .css import
// becomes an empty module. Use: npx tsx --require ./scripts/notes/nocss.cjs <script>
require.extensions[".css"] = () => {};
