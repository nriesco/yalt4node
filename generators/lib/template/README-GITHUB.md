# Setup Github

## Script

Just run `./scripts/githubSetup.sh`

## From command line

```sh
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/[[YOUR_GITHUB_USERNAME_HERE]]/lib-template-temp-name-must-replace.git
git push -u origin main
```

## Create the project in Github first

Create your repository `lib-template-temp-name-must-replace` [https://github.com/new](https://github.com/new)

... and then:

```sh
git remote add origin https://github.com/[[YOUR_GITHUB_USERNAME_HERE]]/lib-template-temp-name-must-replace.git
git branch -M main
git push -u origin main
```
