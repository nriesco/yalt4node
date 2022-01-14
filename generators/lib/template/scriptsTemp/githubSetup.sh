#!/bin/bash
echo "Starting ..."
git init
git add .
git commit -m "First commit"
git branch -M main
git remote add origin https://github.com/[[YOUR_GITHUB_USERNAME_HERE]]/lib-utils-rut.git
git push -u origin main
echo "Done!"
