param(
  [Parameter(Mandatory = $true)]
  [string]$Message,

  [string]$Prefix = "feat",

  [switch]$Force
)

$MainBranch = "main"
$Remote = "origin"
$GitHubUser = "TerminalsandCoffee" # update if you ever rename your GitHub user
$Repo = (git rev-parse --show-toplevel | Split-Path -Leaf)

$FG = "DarkCyan"
$ERR = "Red"
$OK = "Green"

function Write-Status {
  param(
    [string]$Msg,
    [string]$Color = $FG
  )

  Write-Host $Msg -ForegroundColor $Color
}

# 1. Warn on dirty working tree (unless -Force), but do not block
$status = git status --porcelain
if ($status -and -not $Force) {
  Write-Status "Uncommitted changes detected. Proceeding and committing them on the new branch." $ERR
}

# 2. Update local main
git checkout $MainBranch 2>$null
git pull $Remote $MainBranch

# 3. Create feature branch: <prefix>/yyyyMMdd-hhmm-<sanitized-message>
$timestamp = Get-Date -Format "yyyyMMdd-HHmm"
$sanitized = $Message -replace '[^\w-]+', '-' -replace '-+$', ''
$branch = "$Prefix/$timestamp-$($sanitized.ToLower())"

git checkout -b $branch

# 4. Stage and commit if there are changes
git add .

if (git diff --cached --quiet) {
  Write-Status "No staged changes to commit on $branch. Aborting." $ERR
  exit 1
}

git commit -m "$Message"

# 5. Push & set upstream
git push -u $Remote $branch

# 6. Open GitHub PR in browser
$prUrl = "https://github.com/$GitHubUser/$Repo/compare/$MainBranch...$branch?expand=1"
Start-Process $prUrl

Write-Status "`nBranch: $branch" $OK
Write-Status "PR opened: $prUrl`n" $OK
Write-Status "Night mode activated." "DarkGray"

<#
USAGE
-----

From the repository root in PowerShell:

  pwsh ./scripts/git-night.ps1 -Message "Short, descriptive commit message"

Optional parameters:
  -Prefix feat|chore|fix   # defaults to 'feat'
  -Force                   # ignore uncommitted changes check (not recommended)

What this script does:
  1. Verifies you have a clean working tree (unless -Force is supplied).
  2. Checks out and pulls the latest 'main' from 'origin'.
  3. Creates a feature branch named:
       <prefix>/yyyyMMdd-HHmm-<sanitized-message>
  4. Stages all changes and commits them with the provided -Message.
  5. Pushes the branch to origin and sets the upstream.
  6. Opens a GitHub compare view (PR) in your default browser.

This is intended for solo/portfolio work to enforce a clean
feature-branch → PR → main workflow instead of committing directly to main.
#>



