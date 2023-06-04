#!/usr/bin/env sh
npm run build
set -e

cp -r ./app ../egg-game-live

git add -A
git commit -m 'deploy'

git push origin main

cd -