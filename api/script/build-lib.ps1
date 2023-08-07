#this script should be run from npm run, if u want to run it from script/ add Set-Location ..
#build phase
npm i
npm run build
Set-Location build
npm pack
#paths
$proj = "C:\atari-monk\Code\ball-game\"
$pack = "atari-monk-ball-game-api-0.0.1.tgz"
$api = $proj + "api\build\" + $pack
#install in lib
$lib = $proj + "lib\"
Copy-Item $api $lib
Set-Location $lib
npm i (Get-Item $pack).Name
#install in client
$client = $proj + "client\"
Copy-Item $api $client
Set-Location $client
npm i (Get-Item $pack).Name
#install in server
$server = $proj + "server\"
Copy-Item $api $server
Set-Location $server
npm i (Get-Item $pack).Name
#install in ball
$game = $proj + "game\"
Copy-Item $api $game
Set-Location $game
npm i (Get-Item $pack).Name
#clean files
Remove-Item $api
Remove-Item ($lib + $pack)
Remove-Item ($client + $pack)
Remove-Item ($server + $pack)
#Remove-Item ($game + $pack)
