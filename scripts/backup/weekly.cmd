@echo off
REM ---------------------------------------------------------------------------
REM Weekly backup wrapper, run by the "PYQ Vault DB backup" scheduled task.
REM
REM WHY A WRAPPER AND NOT `npm run db:backup` DIRECTLY. A scheduled task's
REM console output goes nowhere, so a failed run leaves you an exit code and no
REM reason. This appends everything to backups\last-run.log instead. The
REM retention logic ignores filenames it cannot parse, so a log living in that
REM directory is never deleted by a prune.
REM
REM Also resolves paths itself rather than trusting the task's environment:
REM %~dp0 is scripts\backup\, so ..\.. is the repo root regardless of where the
REM task thinks its working directory is.
REM
REM Safe to double-click for a manual test.
REM ---------------------------------------------------------------------------

cd /d "%~dp0..\.."
if not exist "backups" mkdir "backups"

REM Absolute path first (a scheduled task's PATH is not your shell's), falling
REM back to PATH if Node ever moves.
set "NPM=C:\Program Files\nodejs\npm.cmd"
if not exist "%NPM%" set "NPM=npm"

echo.>> "backups\last-run.log"
echo ===== run started %DATE% %TIME% =====>> "backups\last-run.log"
call "%NPM%" run db:backup >> "backups\last-run.log" 2>&1
set "RC=%ERRORLEVEL%"
echo ===== run finished %DATE% %TIME% (exit %RC%) =====>> "backups\last-run.log"

exit /b %RC%
