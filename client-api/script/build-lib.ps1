#this script should be run from npm run, if u want to run it from script/ add Set-Location ..
#build phase
npm i
npm run build
Set-Location build
npm pack
#paths
$proj = 'C:\atari-monk\Code\ball-game\'
$version = '0.0.1'
$subproj = 'client-api\'
$pack = 'atari-monk-ball-game-client-api-' + $version + '.tgz'
$build = 'build\'
$lib = $proj + $subproj + $build + $pack
#install in client
$client = $proj + "client\"
Copy-Item $lib $client
Set-Location $client
npm i (Get-Item $pack).Name
#install in game
$game = $proj + "game\"
Copy-Item $lib $game
Set-Location $game
npm i (Get-Item $pack).Name
#clean files
Remove-Item $lib
Remove-Item ($client + $pack)
