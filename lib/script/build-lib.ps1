#this script should be run from npm run, if u want to run it from script/ add Set-Location ..
#build phase
npm i
npm run build
Set-Location build
npm pack
#paths
$proj = "C:\atari-monk\Code\ball-game\"
$version = "0.0.2"
$pack = "atari-monk-ball-game-lib-" + $version + ".tgz"
$lib = $proj + "lib\build\" + $pack
#install in game
$game = $proj + "game\"
Copy-Item $lib $game
Set-Location $game
npm i (Get-Item $pack).Name
#clean files
Remove-Item $lib
#Remove-Item ($game + $pack)
