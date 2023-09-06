PROJETO BACK-END
=================

# Para iniciar o projeto
`npx @aka-demy/create-express-app`
* _Install package...?_: y
* Give a name for the app:  back-end
* Choose a language:  JavaScript
* Choose a template engine:  None
* Choose a package manager:  npm

## Mudando para a pasta projeto
`cd back-end`

## Atualizando pacotes vulneráveis com atualizações de segurança
`npm audit -fix --force`

## Instalando o prisma como dependência de deselvolvimento
`npm install prisma --sav-dev`

## Inicializando o Prisma com conector para MongoDB
`npx prisma init --datasource-provider mongodb`
* Instale a extensão Prisma no Visual Studio Code

## Gerando o cliente do Prisma
`npx prisma generate`
* Precisa ser executado **toda vez** que o arquivo `schema.prisma` for alterado
