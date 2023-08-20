$domain = 'https://kind-moss-0f787ca03.3.azurestaticapps.net/'
$url1 = $domain + '?player=1'
$url2 = $domain + '?player=2'
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
