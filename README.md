# Controle de Notas

Utilizamos React Native CLI porque combina as melhores partes do desenvolvimento nativo com o React, a melhor biblioteca JavaScript da categoria para construir interfaces de usuário.

- Desenvolvimento Nativo (Native Development For Everyone)
- Plataform cruzada perfeita (Seamless Cross-Platform)
- Atualização rápida (Fast Refresh)

## Tecnologias (bibliotecas)

- [react-native-picker-select] - Componentes do tipo "Dropdown"
- [@react-navigation/bottom-tabs] - Para configuracao das tabs da home
- [yup] - Para validação dos formularios
- [@unform/mobile] - Para integrar com yup no submit dos dados do form
- [react-native-flash-message] - Alertas e feedback aos usuários
- [react-native-svg] - Manipulações de imagens no formato SVG
- [react-native-svg-charts] - Criação dos gráficos
- [react-native-uuid] - Gerar autimaticamento o ID nas tabelas da base local
- [realm] - Storage utilizado localmente para manipulacao dos registros
- [react-native-autocomplete-dropdown] - Input do tipo autocomplete
- [moment] - Formatações e manipulações de data
- [styled-components] - Estilizar os compoentes
- [typescript] - Tipagem no react-native
- [eslint] - Impor padronização no códigfo escrito pelo desenvolvedor

## Arquitetura

| Camada     | Descrição                                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| src        | Pasta source principal do app                                                                                     |
| assets     | Contem as imagens e icones especificos                                                                            |
| components | Componentes comum de maior reutilização no projeto                                                                |
| config     | Configurações basicas, como realmDB (Storage Local) e variaveis de ambiente                                       |
| constants  | Contem as variaveis de ambiente apos o build prontas para utilizacao                                              |
| contexts   | Contextos configurados para serem utilizados por toda a aplicacao                                                 |
| navigation | Configuracao da navegacao do app                                                                                  |
| schemas    | Arquivos que representam as tabelas no realmDB                                                                    |
| screens    | Telas do app                                                                                                      |
| services   | Camada que realiza as operacoes no realmDB                                                                        |
| styles     | Inicializa o thema padrão do app e disponibiliza para utilizacao                                                  |
| utils      | Helper que facilita alguns tratamentos basicos, como mascara, tratamento de erros, validacao de informacoes e etc |

## Installation

For develop environments ios...

```sh
yarn start:dev:ios
exeuta o app no modo desenvolvimento, setando as variaveis de ambiente para dev
```

For qa environments ios...

```sh
yarn start:qa:ios
exeuta o app no modo qa, setando as variaveis de ambiente para dev
```

For production ios...

```sh
yarn start:release:ios
exeuta o app no modo production, setando as variaveis de ambiente para dev
```

For develop environments android...

```sh
yarn start:dev:android
exeuta o app no modo desenvolvimento, setando as variaveis de ambiente para dev
```

For qa environments android...

```sh
yarn start:qa:android
exeuta o app no modo qa, setando as variaveis de ambiente para dev
```

For production android...

```sh
yarn start:release:android
exeuta o app no modo production, setando as variaveis de ambiente para dev
```

## Pré-requisitos

| Bibliotecas                 | Links                                          |
| --------------------------- | ---------------------------------------------- |
| Nodejs                      | https://nodejs.org/en/                         |
| Yarn                        | https://yarnpkg.com/                           |
| Java                        | https://www.java.com/pt-BR/download/manual.jsp |
| CocoaPods para IOS          | https://cocoapods.org/                         |
| brew para IOS               | https://brew.sh/index_pt-br/                   |
| Xcode para Mac              | https://xcodereleases.com/                     |
| Android Studio para Android | https://developer.android.com/studio           |

## Repositório

```sh
git@git.vibbra.com.br:marco-1649790199/controle-nf.git
```
