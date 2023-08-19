$server = 'C:\atari-monk\Code\ball-game\server\build'
$port = '3000'
$url1 = 'http://127.0.0.1:' + $port + '/game/build/index.html?player=1'
$url2 = 'http://127.0.0.1:' + $port + '/game/build/index.html?player=2'
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"

function start-url {
  param(
    [Parameter(Mandatory = $true)]
    [string]$url
  )

  try {
    Start-Process -FilePath $chrome -ArgumentList $url -ErrorAction Stop
  }
  catch {
    Write-Host "An error occurred while trying to start Chrome with URL: $url"
  }
}

function set-folder($folder) {
  try {
    Set-Location -Path $folder -ErrorAction Stop
  }
  catch {
    Write-Host "An error occurred while setting the folder: $folder"
  }
}

function start-server {
  try {
    node game-server
  }
  catch {
    Write-Host "An error occurred while starting the server."
  }
}

try {
  start-url -url $url1
  start-url -url $url2
  set-folder ($server)
  start-server
}
catch {
  Write-Host "An error occurred in the script execution."
}
