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

try {
  start-url -url $url1
  start-url -url $url2
}
catch {
  Write-Host "An error occurred in the script execution."
}
