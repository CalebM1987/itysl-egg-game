#!/usr/bin/env sh
npm run build
set -e

rm -rf ../egg-game-live/assets
cp -r ./app/ ../egg-game-live/
cd ../egg-game-live

git add -A
git commit -m 'deploy'

git push origin main

cd -