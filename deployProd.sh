#!/bin/bash
comment="$1"

git add .
git commit -m "$comment" 
git push -u origin master

#deploying to prod....
ng build --prod --output-path ~/workspace/deploy/public/

cd ~/workspace/deploy/
sh deploy.sh "Deploy to Heroku"
