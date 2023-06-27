source ./.env

echo "//npm.pkg.github.com/:_authToken=$NPM_GITHUB_TOKEN" > .npmrc

npm run prepare
     
npm publish