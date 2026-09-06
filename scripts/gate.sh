#!/bin/sh
# Run a gate (default: the full prepush chain) and print an UNAMBIGUOUS final
# result line. The exit code of a piped command is the LAST stage's, so
# `npm run prepush | tail` reports tail's 0 even when the gate failed (and the
# background-task notification then says "exit 0" for a failure). This wrapper
# prints a `GATE_RESULT:` sentinel as its last output line, so the truth
# survives `| tail` / `| grep` even when the exit code does not.
#
#   sh scripts/gate.sh           # runs `npm run prepush`
#   sh scripts/gate.sh test      # runs `npm run test`
#   sh scripts/gate.sh | tail    # still shows GATE_RESULT on the last line
#
# See the memory "gate-exit-code-masked-by-tail".
#
# DISK PREFLIGHT. A `next build` writes ~1.2 GB into .next, and when the volume
# is full it dies with ENOSPC *minutes in*, after typecheck/lint/test have all
# passed. The chain then reports FAIL with a stack trace that looks like a code
# defect and is not one — that happened on 2026-09-06 and cost a full run. The
# check is cheap, runs BEFORE any work, and names the real problem.
#
# Only the BUILD needs the headroom, so the floor is per-target: a build-bearing
# target needs FLOOR_BUILD, anything else only FLOOR_MIN. Set GATE_SKIP_DISK=1 to
# bypass (the check is a convenience, never a security boundary).
target="${1:-prepush}"

FLOOR_BUILD=2000   # MB — .next peaked at ~1.2 GB; leave room for the cache too
FLOOR_MIN=300      # MB — typecheck/lint/test still write caches and temp files

case "$target" in
  *quick*) floor="$FLOOR_MIN" ;;   # prepush:quick deliberately skips the build
  prepush|build|"") floor="$FLOOR_BUILD" ;;
  *) floor="$FLOOR_MIN" ;;
esac

if [ -z "$GATE_SKIP_DISK" ]; then
  # POSIX `df -Pm .` reports 1 MB blocks; field 4 is available. If df is missing
  # or unparseable, PROCEED rather than blocking — a broken probe must not stop a
  # gate that would otherwise pass.
  avail=$(df -Pm . 2>/dev/null | awk 'NR==2 {print $4}')
  case "$avail" in
    ''|*[!0-9]*) avail="" ;;
  esac
  if [ -n "$avail" ] && [ "$avail" -lt "$floor" ]; then
    echo "disk: ${avail} MB free, ${floor} MB needed for '$target'" >&2
    echo "" >&2
    echo "Free space before re-running, or the build will die with ENOSPC after" >&2
    echo "typecheck/lint/test have already passed. Regenerable candidates:" >&2
    echo "  rm -rf .next                    # ~300 MB, rebuilt by the next build" >&2
    echo "  rm -rf scripts/*/out            # ingestion page renders, re-rendered on demand" >&2
    echo "  npm run needs-build <base> <head>   # this changeset may not need a build at all" >&2
    echo ""
    echo "GATE_RESULT: FAIL ($target, disk: ${avail} MB free < ${floor} MB)"
    exit 1
  fi
  [ -n "$avail" ] && echo "disk: ${avail} MB free (floor ${floor} MB for '$target')"
fi

npm run "$target"
code=$?
echo ""
if [ "$code" -eq 0 ]; then
  echo "GATE_RESULT: PASS ($target)"
else
  echo "GATE_RESULT: FAIL ($target, exit $code)"
fi
exit "$code"
