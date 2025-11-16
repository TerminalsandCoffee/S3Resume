param(
  [string]$Message = "WIP: late-night changes",
  [switch]$Force
)

# ───── CONFIG ─────
$ProtectedBranches = @("main", "master", "develop") # add more if needed
$Remote            = "origin"
$GitHubUser        = "TerminalsandCoffee"          # ← change if different
$MainBranch        = $ProtectedBranches[0]         # default PR target

$FG   = "DarkCyan"
$ERR  = "Red"
$OK   = "Green"
$WARN = "Yellow"

function Write-Status {
  param(
    [string]$Msg,
    [string]$Color = $FG
  )

  Write-Host $Msg -ForegroundColor $Color
}

# ───── 1. CURRENT STATE ─────
$curBranch = (git rev-parse --abbrev-ref HEAD).Trim()
$dirty     = git status --porcelain

if (-not $dirty -and -not $Force) {
  Write-Status "Nothing to commit – exiting." $WARN
  exit 0
}

# ───── 2. ENSURE WORK HAPPENS ON FEATURE BRANCH ─────
if ($ProtectedBranches -contains $curBranch) {
  Write-Status "`nYou are on '$curBranch' – creating a feature branch so we don't commit to a protected branch." $WARN

  # If clean, refresh from remote before branching
  if (-not $dirty) {
    Write-Status "Working tree clean. Pulling latest from '$Remote/$curBranch'..." $FG
    git pull $Remote $curBranch
  }

  # Create feature branch: feat/yyyyMMdd-HHmm-<sanitized-message>
  $ts        = Get-Date -Format "yyyyMMdd-HHmm"
  $sanitized = $Message -replace '[^\w-]+', '-' -replace '-+$', ''
  $newBranch = "feat/$ts-$($sanitized.ToLower())"

  git checkout -b $newBranch
  Write-Status "Switched to new branch: $newBranch" $OK
}
else {
  $newBranch = $curBranch
  Write-Status "Using existing branch '$newBranch'." $FG
}

# ───── 3. STAGE & COMMIT ─────
git add .

if (git diff --cached --quiet) {
  Write-Status "No staged changes to commit on '$newBranch'. Aborting." $WARN
  exit 0
}

git commit -m "$Message"

# ───── 4. PUSH & SET UPSTREAM ─────
git push -u $Remote $newBranch

# ───── 5. OPEN GITHUB PR (compare view) ─────
$Repo  = (git rev-parse --show-toplevel | Split-Path -Leaf)
$prUrl = "https://github.com/$GitHubUser/$Repo/compare/$MainBranch...$newBranch?expand=1"
Start-Process $prUrl

Write-Status "`nBranch : $newBranch" $OK
Write-Status "PR     : $prUrl`n" $OK
Write-Status "Night-mode complete – go dark. ☾" "DarkGray"

<#
USAGE
-----

From the repository root in PowerShell:

  pwsh ./scripts/git-night.ps1 -Message "Short, descriptive commit message"

Optional parameters:
  -Force   # ignore 'nothing to commit' guard

What this script does:
  1. Checks if there are changes to commit; exits early if clean (unless -Force).
  2. If you are on a protected branch (main/master/develop):
       - Optionally pulls latest from remote when clean.
       - Creates a feature branch:
           feat/yyyyMMdd-HHmm-<sanitized-message>
       - Carries your current work onto that branch.
     If you are already on a non-protected branch:
       - Uses the current branch as-is.
  3. Stages all changes and commits them with the provided -Message.
  4. Pushes the branch to origin (setting/updating upstream).
  5. Opens a GitHub compare (PR) view from MainBranch → feature branch.

Goal: enforce "never commit directly to main" and always work via
feature-branch → PR → protected branch.
#>

