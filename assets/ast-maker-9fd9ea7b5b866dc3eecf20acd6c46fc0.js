"use strict"
define("ast-maker/app",["exports","ast-maker/resolver","ember-load-initializers","ast-maker/config/environment"],function(e,t,a,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:t.default});(0,a.default)(r,n.default.modulePrefix)
var o=r
e.default=o}),define("ast-maker/components/ast-maker",["exports","recast","ast-maker/utils/codeshift-api"],function(_exports,_recast,_codeshiftApi){Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0
var j=_recast.types.builders,_code="let a = 1;\nlet b = 'hello';\nlet c = false;\nconst d = 2;\nvar e = true;\nimport { foo as bar } from 'lib';\nhello(1, 'world', true, a);\nthis.hello(1, 'world', true, a);\nhello.world(1, 'foo', true, a);\nfoo.bar.baz();\nfoo.bar.bax.baz(1, 'foo', true, a);\nif(a === 1) {\nconsole.log('true');\nfoo.bar();\n} else {\nconsole.log('false');\nfoo.baz();\n}\n\nlet a = {\nname: 'raja',\naction: hello()\n};\n\nexport default class MyComponent extends ReactComponent {}\nclass MyComponent extends ReactComponent {}\n",_default=Ember.Component.extend({code:_code,ast:Ember.computed("code",function(){var e=(0,_recast.parse)(this.get("code"))
return console.log(e.program.body),JSON.stringify(e)}),pseudoAst:Ember.computed("code",function(){return(0,_recast.parse)(this.get("code")).program.body.map(function(e){switch(e.type){case"VariableDeclaration":return _codeshiftApi.default.variableDeclaration(e)
case"ImportDeclaration":return _codeshiftApi.default.importDeclaration(e)
case"ExpressionStatement":return _codeshiftApi.default.expressionStatement(e)
case"IfStatement":return _codeshiftApi.default.ifStatement(e)
case"ExportDefaultDeclaration":return _codeshiftApi.default.exportDefaultDeclaration(e)
case"ClassDeclaration":return _codeshiftApi.default.classDeclaration(e)
default:return console.log(e.type),""}})}),nodeApi:Ember.computed("pseudoAst",function(){return this.get("pseudoAst").join("\n//-----------------------\n")}),output:Ember.computed("pseudoAst",function(){var sampleCode="",outputAst=(0,_recast.parse)(sampleCode)
this.get("pseudoAst").forEach(function(n){return outputAst.program.body.push(eval(n))})
var output=(0,_recast.print)(outputAst,{quote:"single"}).code
return output}),init:function(){this._super.apply(this,arguments),this.set("jsonMode",{name:"javascript",json:!0})}})
_exports.default=_default}),define("ast-maker/components/ivy-codemirror",["exports","ivy-codemirror/components/ivy-codemirror"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-maker/helpers/app-version",["exports","ast-maker/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,a){function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.default.APP.version,o=n.versionOnly||n.hideSha,i=n.shaOnly||n.hideVersion,l=null
return o&&(n.showExtended&&(l=r.match(a.versionExtendedRegExp)),l||(l=r.match(a.versionRegExp))),i&&(l=r.match(a.shaRegExp)),l?l[0]:r}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n,e.default=void 0
var r=Ember.Helper.helper(n)
e.default=r}),define("ast-maker/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("ast-maker/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("ast-maker/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ast-maker/config/environment"],function(e,t,a){var n,r
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a.default.APP&&(n=a.default.APP.name,r=a.default.APP.version)
var o={name:"App Version",initialize:(0,t.default)(n,r)}
e.default=o}),define("ast-maker/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=a}),define("ast-maker/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:t.default}
e.default=n}),define("ast-maker/initializers/export-application-global",["exports","ast-maker/config/environment"],function(e,t){function a(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var a
if("undefined"!=typeof window)a=window
else if("undefined"!=typeof global)a=global
else{if("undefined"==typeof self)return
a=self}var n,r=t.default.exportApplicationGlobal
n="string"==typeof r?r:Ember.String.classify(t.default.modulePrefix),a[n]||(a[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete a[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=a,e.default=void 0
var n={name:"export-application-global",initialize:a}
e.default=n}),define("ast-maker/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a={name:"ember-data",initialize:t.default}
e.default=a}),define("ast-maker/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("ast-maker/router",["exports","ast-maker/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
a.map(function(){})
var n=a
e.default=n}),define("ast-maker/routes/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("ast-maker/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-maker/services/code-mirror",["exports","ivy-codemirror/services/code-mirror"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-maker/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"p00D5AvL",block:'{"symbols":[],"statements":[[7,"h1"],[9],[0,"ast-builder: Build your ASTs directly from code"],[10],[0,"\\n"],[1,[23,"outlet"],false],[0,"\\n\\n"]],"hasEval":false}',meta:{moduleName:"ast-maker/templates/application.hbs"}})
e.default=t}),define("ast-maker/templates/components/ast-maker",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"Y9NeMHTY",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","grid-row"],[9],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options","valueUpdated"],[[25,["code"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript","ambiance"]]],[29,"action",[[24,0,[]],[29,"mut",[[25,["code"]]],null]],null]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["ast"]],[29,"hash",null,[["mode","theme","foldGutter"],[[25,["jsonMode"]],"ambiance",true]]]]]],false],[0,"\\n  "],[10],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["nodeApi"]],[29,"hash",null,[["lineNumbers","mode","theme","autoIndent"],[true,"javascript","ambiance",true]]]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["output"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript","ambiance"]]]]]],false],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-maker/templates/components/ast-maker.hbs"}})
e.default=t}),define("ast-maker/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"06+3ClRY",block:'{"symbols":[],"statements":[[5,"ast-maker",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-maker/templates/index.hbs"}})
e.default=t}),define("ast-maker/utils/codeshift-api",["exports"],function(e){function t(e){switch(e.type){case"Literal":return function(e){var t="string"==typeof e.value?"'".concat(e.value,"'"):e.value
return"j.literal(".concat(t,")")}(e)
case"ObjectExpression":return function(e){var a=e.properties.map(function(e){var a=e.key,n=e.value
return'j.property("init", j.identifier(\''.concat(a.name,"'), ").concat(t(n),")")})
return"j.objectExpression([".concat(a.join(","),"])")}(e)
case"CallExpression":return n=(a=e).arguments,o=a.callee,"j.callExpression(\n        j.identifier('".concat(o.name,"'),\n        [").concat(r(n),"]\n      )")
default:return console.log(e.type),""}var a,n,o}function a(e){var a=e.kind,n=e.declarations[0],r=n.id,o=t(n.init)
return"j.variableDeclaration(\n  '".concat(a,"',\n      [j.variableDeclarator(\n      j.identifier('").concat(r.name,"'),\n        ").concat(o,"\n          )]);")}function n(e){var t=e.source,a=e.specifiers[0],n=a.imported,r=a.local
return"j.importDeclaration(\n           [j.importSpecifier(j.identifier('".concat(n.name,"'),j.identifier('").concat(r.name,"'))],\n    j.literal('").concat(t.value,"')\n                  );")}function r(e){return e.map(function(e){switch(e.type){case"Literal":return"j.literal(".concat(e.raw,")")
case"Identifier":return"j.identifier('".concat(e.name,"')")
default:return""}}).join(",")}function o(e){var t=e.expression,a=t.arguments,n=t.callee,o=t.extra
return"MemberExpression"===n.type?"j.expressionStatement(\n    j.callExpression(\n    ".concat(function e(t){var a=t.object,n=t.property,r=""
return r="ThisExpression"===a.type?"j.thisExpression()":"MemberExpression"===a.type?"".concat(e(a)):"j.identifier('".concat(a.name,"')"),"j.memberExpression(\n ".concat(r,",\n j.identifier('").concat(n.name,"')\n  )")}(n),",\n    [").concat(r(a),"]\n    ))"):o&&o.parenthesized?"j.expressionStatement(\n     j.parenthesizedExpression(\n    j.callExpression(\n        j.identifier('".concat(n.name,"'),\n        [").concat(r(a),"]\n      )))"):"j.expressionStatement(\n    j.callExpression(\n        j.identifier('".concat(n.name,"'),\n        [").concat(r(a),"]\n      ))")}function i(e){return e.map(function(e){switch(e.type){case"VariableDeclaration":return a(e)
case"ImportDeclaration":return n(e)
case"ExpressionStatement":return o(e)
case"IfStatement":return l(e)
default:return console.log(e.type),""}}).join(",")}function l(e){var t,a=e.test,n=e.consequent,r=e.alternate
if("BinaryExpression"===a.type){var o=a.operator,l=a.left,s=a.right
t="j.binaryExpression('".concat(o,"', j.identifier('").concat(l.name,"'), j.literal('").concat(s.value,"'))")}else"Identifier"===a.type&&(t="j.identifier(".concat(a.name,")"))
return r?"j.ifStatement(\n  ".concat(t,",\n  j.blockStatement([").concat(i(n.body),"]),\n  j.blockStatement([").concat(i(r.body),"])\n  )"):"j.ifStatement(\n  ".concat(t,",\n  j.blockStatement([").concat(i(n.body),"])\n  )")}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var s={classDeclaration:function(e){var t=e.id,a=e.superClass
return e.body,"j.classDeclaration(\n    j.identifier('".concat(t.name,"'),\n    j.classBody([]),\n    j.identifier('").concat(a.name,"')\n  )")},exportDefaultDeclaration:function(e){var t=e.declaration,a=t.id,n=t.superClass
return t.body,"j.exportDefaultDeclaration(\n  j.classDeclaration(\n    j.identifier('".concat(a.name,"'),\n    j.classBody([]),\n    j.identifier('").concat(n.name,"')\n  )\n  )")},expressionStatement:o,ifStatement:l,importDeclaration:n,variableDeclaration:a}
e.default=s}),define("ast-maker/config/environment",[],function(){try{var e="ast-maker/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),a={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(a,"__esModule",{value:!0}),a}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("ast-maker/app").default.create({name:"ast-maker",version:"0.0.0+84542bce"})
