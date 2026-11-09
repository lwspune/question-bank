import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * .githooks/post-checkout warns when the SHARED checkout (the repo's main
 * working tree) leaves `main` (2026-11-09). Several sessions and their dev
 * servers use that one folder, so a branch switch there silently changes
 * their files. A linked worktree is anyone's own, so it never warns.
 *
 * Runs the real hook in a throwaway repo through real `git checkout`, so the
 * test covers what git passes the hook, not a copy of the hook's logic.
 */
const HOOKS = path.resolve(__dirname, "..", ".githooks");
const WARNING = "SHARED folder";

let root: string;
let repo: string;

function git(cwd: string, args: string[]) {
  const r = spawnSync("git", ["-c", "user.name=t", "-c", "user.email=t@test.local", ...args], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, CI: "" },
  });
  if (r.status !== 0) throw new Error(`git ${args.join(" ")} failed: ${r.stderr}`);
  return r.stderr;
}

beforeAll(() => {
  root = mkdtempSync(path.join(tmpdir(), "post-checkout-"));
  repo = path.join(root, "repo");
  execFileSync("git", ["init", "-q", "-b", "main", repo]);
  git(repo, ["config", "core.hooksPath", HOOKS]);
  writeFileSync(path.join(repo, "a.txt"), "a\n");
  git(repo, ["add", "a.txt"]);
  git(repo, ["commit", "-q", "-m", "init"]);
});

afterAll(() => {
  rmSync(root, { recursive: true, force: true });
});

describe("post-checkout hook", () => {
  it("warns when the shared folder switches to another branch", () => {
    const err = git(repo, ["checkout", "-q", "-b", "feat/x"]);
    expect(err).toContain(WARNING);
    expect(err).toContain("feat/x");
    expect(err).toContain("git worktree add");
  });

  it("is quiet when the shared folder goes back to main", () => {
    expect(git(repo, ["checkout", "-q", "main"])).not.toContain(WARNING);
  });

  it("warns on a detached HEAD in the shared folder", () => {
    expect(git(repo, ["checkout", "-q", "--detach"])).toContain(WARNING);
    git(repo, ["checkout", "-q", "main"]);
  });

  it("is quiet in a linked worktree, on any branch", () => {
    const wt = path.join(root, "wt");
    expect(git(repo, ["worktree", "add", "-q", wt, "-b", "feat/y"])).not.toContain(WARNING);
    expect(git(wt, ["checkout", "-q", "-b", "feat/z"])).not.toContain(WARNING);
  });

  it("is quiet for a file checkout", () => {
    expect(git(repo, ["checkout", "-q", "--", "a.txt"])).not.toContain(WARNING);
  });
});
