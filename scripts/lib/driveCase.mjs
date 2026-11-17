// Windows drive letters are case-insensitive, but Vitest compares module paths
// as strings: started from c:\..., test files import vitest by a lowercase path
// while its runner loaded from C:\..., so it loads twice and every test file
// crashes ("reading 'config'"). See tests/vitest-drive-case.test.ts.

/**
 * Uppercase a Windows drive letter at the start of a path; return any other
 * path (uppercase drive, POSIX) unchanged.
 * @param {string} p
 * @returns {string}
 */
export function upperDriveLetter(p) {
  return p.replace(/^[a-z](?=:)/, (d) => d.toUpperCase());
}
