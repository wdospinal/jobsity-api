# Jobsity API SERVERLESS
Jobsity API project to recruit test

## Tools used along this project
* [NodeJS](https://nodejs.org) as backend server.
* [ES6](http://es6-features.org) as main language.
* [Mocha](https://mochajs.org) as testing framework.
* [Jest](https://github.com/facebook/jest) as TDD assertion library.
* [ESLint](http://eslint.org) as JavaScript linter.
* [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) as plugin for helping to follow the code style guide


## Workflow and code style guide
We use [airbnb-javascript](https://github.com/airbnb/javascript) as JavaScript style guide.

**Guidelines:**

* If your code will perform asynchronous operations it must use promises
* Every bug should be registered as an issue
* Your code should be almost entirely written in english
* Your code should follow the [airbnb-javascript](https://github.com/airbnb/javascript) style guide
* Your commits should be written in english, they must be descriptive and minimalist
* You should try to use testing in your code, but this is not required

**Note:** _Your code could be rejected by breaking the above rules._



## Contributing to the project
If you want to contribute to this project, you must follow the [**Workflow**](#workflow-and-code-style-guide) and have in mind the next points:
* The project is configured with ESLint, so we highly recommend you to install globally ESLint: ```npm install -g eslint```
* If you use Visual Studio Code, you should disable the javascript validation putting ```"javascript.validate.enable": false``` inside your workspace settings.


## Running the project

### Setup FIREBASE environment

***install nodejs [OBVIOUSLY]***
#### MAC AND LINUX
https://github.com/creationix/nvm#install-script

#### WINDOWS
https://github.com/coreybutler/nvm-windows
### Setup FIREBASE environment

***install dependecies global***

`npm install -g firebase-tools`

`npm install firebase-functions@latest --save`

***install dependecies***

`npm install`

`cd functions && npm install`

***login firebase***

`firebase login`

with project account letsgoallinc@gmail.com

### Test
`npm run test`

### Run
`npm run serve`
