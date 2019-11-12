"use strict"
define("ast-builder/app",["exports","ast-builder/resolver","ember-load-initializers","ast-builder/config/environment"],function(e,t,n,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:t.default});(0,n.default)(r,a.default.modulePrefix)
var i=r
e.default=i}),define("ast-builder/components/ast-maker",["exports","recast","ast-builder/utils/codeshift-api"],function(_exports,_recast,_codeshiftApi){Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0
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
_exports.default=_default}),define("ast-builder/components/ivy-codemirror",["exports","ivy-codemirror/components/ivy-codemirror"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-builder/helpers/app-version",["exports","ast-builder/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){function a(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.default.APP.version,i=a.versionOnly||a.hideSha,o=a.shaOnly||a.hideVersion,l=null
return i&&(a.showExtended&&(l=r.match(n.versionExtendedRegExp)),l||(l=r.match(n.versionRegExp))),o&&(l=r.match(n.shaRegExp)),l?l[0]:r}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=a,e.default=void 0
var r=Ember.Helper.helper(a)
e.default=r}),define("ast-builder/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("ast-builder/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("ast-builder/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ast-builder/config/environment"],function(e,t,n){var a,r
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n.default.APP&&(a=n.default.APP.name,r=n.default.APP.version)
var i={name:"App Version",initialize:(0,t.default)(a,r)}
e.default=i}),define("ast-builder/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=n}),define("ast-builder/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a={name:"ember-data",initialize:t.default}
e.default=a}),define("ast-builder/initializers/export-application-global",["exports","ast-builder/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var a,r=t.default.exportApplicationGlobal
a="string"==typeof r?r:Ember.String.classify(t.default.modulePrefix),n[a]||(n[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[a]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default=void 0
var a={name:"export-application-global",initialize:n}
e.default=a}),define("ast-builder/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:t.default}
e.default=n}),define("ast-builder/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("ast-builder/router",["exports","ast-builder/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){})
var a=n
e.default=a}),define("ast-builder/routes/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("ast-builder/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-builder/services/code-mirror",["exports","ivy-codemirror/services/code-mirror"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-builder/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"zTsQpm5w",block:'{"symbols":[],"statements":[[7,"h1"],[9],[0,"ast-builder: Build your ASTs directly from code"],[10],[0,"\\n"],[1,[23,"outlet"],false],[0,"\\n\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/application.hbs"}})
e.default=t}),define("ast-builder/templates/components/ast-maker",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"1xVrDTwG",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","grid-row"],[9],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options","valueUpdated"],[[25,["code"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript","ambiance"]]],[29,"action",[[24,0,[]],[29,"mut",[[25,["code"]]],null]],null]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["ast"]],[29,"hash",null,[["mode","theme","foldGutter"],[[25,["jsonMode"]],"ambiance",true]]]]]],false],[0,"\\n  "],[10],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["nodeApi"]],[29,"hash",null,[["lineNumbers","mode","theme","autoIndent"],[true,"javascript","ambiance",true]]]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["output"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript","ambiance"]]]]]],false],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/components/ast-maker.hbs"}})
e.default=t}),define("ast-builder/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"yiLOP4+C",block:'{"symbols":[],"statements":[[5,"ast-maker",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/index.hbs"}})
e.default=t}),define("ast-builder/utils/codeshift-api",["exports"],function(e){function t(e){switch(e.type){case"Literal":return function(e){var t="string"==typeof e.value?"'".concat(e.value,"'"):e.value
return"j.literal(".concat(t,")")}(e)
case"ObjectExpression":return function(e){var n=e.properties.map(function(e){var n=e.key,a=e.value
return'j.property("init", j.identifier(\''.concat(n.name,"'), ").concat(t(a),")")})
return"j.objectExpression([".concat(n.join(","),"])")}(e)
case"CallExpression":return a=(n=e).arguments,i=n.callee,"j.callExpression(\n        j.identifier('".concat(i.name,"'),\n        [").concat(r(a),"]\n      )")
default:return console.log(e.type),""}var n,a,i}function n(e){var n=e.kind,a=e.declarations[0],r=a.id,i=t(a.init)
return"j.variableDeclaration(\n  '".concat(n,"',\n      [j.variableDeclarator(\n      j.identifier('").concat(r.name,"'),\n        ").concat(i,"\n          )]);")}function a(e){var t=e.source,n=e.specifiers[0],a=n.imported,r=n.local
return"j.importDeclaration(\n           [j.importSpecifier(j.identifier('".concat(a.name,"'),j.identifier('").concat(r.name,"'))],\n    j.literal('").concat(t.value,"')\n                  );")}function r(e){return e.map(function(e){switch(e.type){case"Literal":return"j.literal(".concat(e.raw,")")
case"Identifier":return"j.identifier('".concat(e.name,"')")
default:return""}}).join(",")}function i(e){var t=e.expression,n=t.arguments,a=t.callee,i=t.extra
return"MemberExpression"===a.type?"j.expressionStatement(\n    j.callExpression(\n    ".concat(function e(t){var n=t.object,a=t.property,r=""
return r="ThisExpression"===n.type?"j.thisExpression()":"MemberExpression"===n.type?"".concat(e(n)):"j.identifier('".concat(n.name,"')"),"j.memberExpression(\n ".concat(r,",\n j.identifier('").concat(a.name,"')\n  )")}(a),",\n    [").concat(r(n),"]\n    ))"):i&&i.parenthesized?"j.expressionStatement(\n     j.parenthesizedExpression(\n    j.callExpression(\n        j.identifier('".concat(a.name,"'),\n        [").concat(r(n),"]\n      )))"):"j.expressionStatement(\n    j.callExpression(\n        j.identifier('".concat(a.name,"'),\n        [").concat(r(n),"]\n      ))")}function o(e){return e.map(function(e){switch(e.type){case"VariableDeclaration":return n(e)
case"ImportDeclaration":return a(e)
case"ExpressionStatement":return i(e)
case"IfStatement":return l(e)
default:return console.log(e.type),""}}).join(",")}function l(e){var t,n=e.test,a=e.consequent,r=e.alternate
if("BinaryExpression"===n.type){var i=n.operator,l=n.left,s=n.right
t="j.binaryExpression('".concat(i,"', j.identifier('").concat(l.name,"'), j.literal('").concat(s.value,"'))")}else"Identifier"===n.type&&(t="j.identifier(".concat(n.name,")"))
return r?"j.ifStatement(\n  ".concat(t,",\n  j.blockStatement([").concat(o(a.body),"]),\n  j.blockStatement([").concat(o(r.body),"])\n  )"):"j.ifStatement(\n  ".concat(t,",\n  j.blockStatement([").concat(o(a.body),"])\n  )")}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var s={classDeclaration:function(e){var t=e.id,n=e.superClass
return e.body,"j.classDeclaration(\n    j.identifier('".concat(t.name,"'),\n    j.classBody([]),\n    j.identifier('").concat(n.name,"')\n  )")},exportDefaultDeclaration:function(e){var t=e.declaration,n=t.id,a=t.superClass
return t.body,"j.exportDefaultDeclaration(\n  j.classDeclaration(\n    j.identifier('".concat(n.name,"'),\n    j.classBody([]),\n    j.identifier('").concat(a.name,"')\n  )\n  )")},expressionStatement:i,ifStatement:l,importDeclaration:a,variableDeclaration:n}
e.default=s}),define("ast-builder/config/environment",[],function(){try{var e="ast-builder/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(a){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("ast-builder/app").default.create({name:"ast-builder",version:"0.0.0+96f3c00e"})
