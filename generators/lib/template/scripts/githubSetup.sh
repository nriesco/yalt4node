#!/bin/bash
echo "Starting ..."
curl -u '[[YOUR_GITHUB_USERNAME_HERE]' https://api.github.com/user/repos -d '{"name":"lib-template-temp-name-must-replace"}'
git init
git add .
git commit -m "First commit"
git branch -M main
git remote add origin https://github.com/[[YOUR_GITHUB_USERNAME_HERE]]/lib-template-temp-name-must-replace.git
git push -u origin main
echo "Done!"
