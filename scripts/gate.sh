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
target="${1:-prepush}"
npm run "$target"
code=$?
echo ""
if [ "$code" -eq 0 ]; then
  echo "GATE_RESULT: PASS ($target)"
else
  echo "GATE_RESULT: FAIL ($target, exit $code)"
fi
exit "$code"
