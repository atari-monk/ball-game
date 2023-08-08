$script = 'C:\atari-monk\Code\ball-game\game\script\'
$sln = 'C:\atari-monk\Code\ball-game\'
$lib = 'lib'
$client = 'client'
$server = 'server'
$game = 'game'

function build-proj($proj) {
  try {
    Set-Location ($sln + $proj)
    npm run build
  }
  catch {
    Write-Host "An error occurred while building project $proj"
    set-script-folder
  }
}

function set-script-folder() {
  Set-Location $script
}

try {
  build-proj $lib
  build-proj $client
  build-proj $server
  build-proj $game
}
catch {
  Write-Host "An unhandled error occurred."
}
finally {
  set-script-folder
}
