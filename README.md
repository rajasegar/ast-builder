# ast-builder

**WARNING:**
This repository is moved here https://github.com/rajasegar/ast-tooling/tree/master/apps/ast-builder

Build your Abstract Syntax Trees (AST) directly by writing code.
Simply type in your code and get the right [jscodeshift](https://github.com/facebook/jscodeshift) api to build your AST.

Read the [introductory blog post](http://hangaroundtheweb.com/2019/12/ast-builder-building-ast-nodes-from-code/) to know more about the tool.

This application is built in [Ember.js](https://emberjs.com/)


## How to use it?
* TOP LEFT PANE => Source code
* TOP RIGHT PANE => AST
* BOTTOM LEFT PANE => Builder API
* BOTTOM RIGHT PANE => Verified Output (Source code)

![screenshot](https://github.com/rajasegar/ast-builder/blob/master/public/screenshot.png)


## Motivation
The reason this project is created is because, I am simply frustrated for looking up reference for writing codemods and the jscodeshift api is not very well documented.

This is an interactive version of [jscodeshift-docs](https://github.com/rajasegar/jscodeshift-docs)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd ast-builder`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `yarn lint`
* `yarn lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
