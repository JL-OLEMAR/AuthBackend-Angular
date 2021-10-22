# HUSKY

### Comando para añadir el archivo ```pre-commit```
`npx husky add .husky/pre-commit 'npm run lint' git add .husky/pre-commit`


### Comando para añadir el archivo ```commit-msg```
`npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`
