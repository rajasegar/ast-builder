"use strict"
define("ast-builder/app",["exports","ast-builder/resolver","ember-load-initializers","ast-builder/config/environment"],function(e,t,n,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:t.default});(0,n.default)(r,a.default.modulePrefix)
var o=r
e.default=o}),define("ast-builder/components/ast-maker",["exports","recast","ast-builder/utils/codeshift-api"],function(_exports,_recast,_codeshiftApi){Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0
var j=_recast.types.builders,_code1="let a = 1;\nlet b = 'hello';\nlet c = false;\nconst d = 2;\nvar e = true;\nimport { foo as bar } from 'lib';\nhello(1, 'world', true, a);\nthis.hello(1, 'world', true, a);\nhello.world(1, 'foo', true, a);\nfoo.bar.baz();\nfoo.bar.bax.baz(1, 'foo', true, a);\nif(a === 1) {\nconsole.log('true');\nfoo.bar();\n} else {\nconsole.log('false');\nfoo.baz();\n}\n\nlet a = {\nname: 'raja',\nage: 35,\naction: hello()\n};\n\nexport default class MyComponent extends ReactComponent {}\nclass MyComponent extends ReactComponent {\n  constructor(a,b) {\n    this.a = a;\n    this.b = b;\n  }\n\n  hello(x,y) {\n    console.log(x,y);\n  }\n}\n\nfunction init() {\nthis._super(...arguments);\n}\n\nmodule('Unit | Utility | codeshift-api', function() {\n\n  let a = 1;\n\n  test('it works', function(assert) {\n    let result = codeshiftApi();\n    assert.ok(result);\n  });\n});\n\nlet f = [1, \"hello\", true, 0, -1];\nlet a = () => { console.log('hello') }\nlet a = () => console.log('hello')\nlet a = () => log('hello')\nlet a = () => 2\n\nlet { name, age } = a; \nlet a = [1,2,3];\nlet [x,y,z] = a;\nthis.a = a;\nthis.b = 10;\n",_code="\nexport default class MyComponent extends ReactComponent {\n  constructor(a,b) {\n    this.a = a;\n    this.b = b;\n  }\n\n  hello(x,y) {\n    console.log(x,y);\n  }\n}\n",_default=Ember.Component.extend({code:_code,ast:Ember.computed("code",function(){var e=(0,_recast.parse)(this.get("code"))
return console.log(e.program.body),JSON.stringify(e)}),pseudoAst:Ember.computed("code",function(){return(0,_recast.parse)(this.get("code")).program.body.map(function(e){switch(e.type){case"VariableDeclaration":return _codeshiftApi.default.variableDeclaration(e)
case"ImportDeclaration":return _codeshiftApi.default.importDeclaration(e)
case"ExpressionStatement":return _codeshiftApi.default.expressionStatement(e)
case"IfStatement":return _codeshiftApi.default.ifStatement(e)
case"ExportDefaultDeclaration":return _codeshiftApi.default.exportDefaultDeclaration(e)
case"ClassDeclaration":return _codeshiftApi.default.classDeclaration(e)
case"FunctionDeclaration":return _codeshiftApi.default.functionDeclaration(e)
case"ArrowFunctionExpression":return _codeshiftApi.default.arrowFunctionExpression(e)
default:return console.log(e.type),""}})}),nodeApi:Ember.computed("pseudoAst",function(){return this.get("pseudoAst").join("\n//-----------------------\n")}),output:Ember.computed("pseudoAst",function(){var sampleCode="",outputAst=(0,_recast.parse)(sampleCode)
this.get("pseudoAst").forEach(function(n){return outputAst.program.body.push(eval(n))})
var output=(0,_recast.print)(outputAst,{quote:"single"}).code
return output}),init:function(){this._super.apply(this,arguments),this.set("jsonMode",{name:"javascript",json:!0})}})
_exports.default=_default}),define("ast-builder/components/ivy-codemirror",["exports","ivy-codemirror/components/ivy-codemirror"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-builder/helpers/app-version",["exports","ast-builder/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){function a(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.default.APP.version,o=a.versionOnly||a.hideSha,i=a.shaOnly||a.hideVersion,s=null
return o&&(a.showExtended&&(s=r.match(n.versionExtendedRegExp)),s||(s=r.match(n.versionRegExp))),i&&(s=r.match(n.shaRegExp)),s?s[0]:r}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=a,e.default=void 0
var r=Ember.Helper.helper(a)
e.default=r}),define("ast-builder/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("ast-builder/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("ast-builder/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ast-builder/config/environment"],function(e,t,n){var a,r
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n.default.APP&&(a=n.default.APP.name,r=n.default.APP.version)
var o={name:"App Version",initialize:(0,t.default)(a,r)}
e.default=o}),define("ast-builder/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
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
var t=Ember.HTMLBars.template({id:"QuWNhaL8",block:'{"symbols":[],"statements":[[7,"header"],[9],[0,"\\n  "],[7,"h1"],[9],[0,"ast-builder"],[10],[0,"\\n"],[10],[0,"\\n"],[7,"main"],[9],[0,"\\n  "],[1,[23,"outlet"],false],[0,"\\n"],[10],[0,"\\n"],[7,"footer"],[9],[0,"\\n  "],[7,"p"],[9],[0,"\\n  "],[7,"a"],[11,"href","https://github.com/rajasegar/ast-builder"],[9],[0,"Github"],[10],[0," |\\n  "],[7,"a"],[11,"href","https://github.com/rajasegar/ast-builder/issues"],[9],[0,"Report issues"],[10],[0," \\n  "],[10],[0,"\\n"],[10],[0,"\\n\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/application.hbs"}})
e.default=t}),define("ast-builder/templates/components/ast-maker",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"1xVrDTwG",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","grid-row"],[9],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options","valueUpdated"],[[25,["code"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript","ambiance"]]],[29,"action",[[24,0,[]],[29,"mut",[[25,["code"]]],null]],null]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["ast"]],[29,"hash",null,[["mode","theme","foldGutter"],[[25,["jsonMode"]],"ambiance",true]]]]]],false],[0,"\\n  "],[10],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["nodeApi"]],[29,"hash",null,[["lineNumbers","mode","theme","autoIndent"],[true,"javascript","ambiance",true]]]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["output"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript","ambiance"]]]]]],false],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/components/ast-maker.hbs"}})
e.default=t}),define("ast-builder/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"yiLOP4+C",block:'{"symbols":[],"statements":[[5,"ast-maker",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/index.hbs"}})
e.default=t}),define("ast-builder/utils/codeshift-api",["exports"],function(e){function t(e){var t=e.arguments,n=e.callee
return"MemberExpression"===n.type?"j.callExpression(\n          ".concat(d(n),",\n          [").concat(o(t),"]\n        )"):"j.callExpression(\n          j.identifier('".concat(n.name,"'),\n          [").concat(o(t),"]\n        )")}function n(e){var t="string"==typeof e.value?"'".concat(e.value,"'"):e.value
return"j.literal(".concat(t,")")}function a(e){return"j.identifier('".concat(e.name,"')")}function r(e){var t=e.elements.map(function(e){switch(e.type){case"Literal":return n(e)
case"UnaryExpression":return a=(t=e).argument,r=t.operator,o=t.prefix,"j.unaryExpression('".concat(r,"', ").concat(n(a),", ").concat(o,")")}var t,a,r,o}).join(",")
return"j.arrayExpression([".concat(t,"])")}function o(e){return e.map(function(e){switch(e.type){case"Literal":return n(e)
case"Identifier":return"j.identifier('".concat(e.name,"')")
case"SpreadElement":return t=e.argument.name,"j.spreadElement(j.identifier('".concat(t,"'))")
case"FunctionExpression":return j(e)
default:return""}var t}).join(",")}function i(e){switch(e.type){case"Literal":return n(e)
case"ObjectExpression":return function(e){var t=e.properties.map(function(e){var t=e.key,n=e.value
return'j.property("init", j.identifier(\''.concat(t.name,"'), ").concat(i(n),")")})
return"j.objectExpression([".concat(t.join(","),"])")}(e)
case"CallExpression":return t(e)
case"ArrayExpression":return r(e)
case"ArrowFunctionExpression":return x(e)
case"Identifier":return a(e)
default:return console.log(e.type),""}}function s(e){return e.map(function(e){return n=(t=e).key,a=t.value,'j.property("init", j.identifier(\''.concat(n.name,"'), ").concat(i(a),")")
var t,n,a}).join(",")}function c(e){var t,n="",r=e.id,o=e.init
switch(r.type){case"Identifier":n="j.variableDeclarator(\n      j.identifier('".concat(r.name,"'),\n        ").concat(i(o),"\n          )")
break
case"ObjectPattern":n="j.variableDeclarator(\n      j.objectPattern([".concat(s(r.properties),"]),\n        ").concat(i(o),"\n          )")
break
case"ArrayPattern":n="j.variableDeclarator(\n      j.arrayPattern([".concat((t=r.elements,t.map(function(e){return a(e)}).join(",")),"]),\n        ").concat(i(o),"\n          )")}return n}function l(e){var t=e.kind,n=e.declarations
return"j.variableDeclaration(\n  '".concat(t,"',\n      [").concat(c(n[0]),"])")}function u(e){var t=e.source,n=e.specifiers[0],a=n.imported,r=n.local
return"j.importDeclaration(\n           [j.importSpecifier(j.identifier('".concat(a.name,"'),j.identifier('").concat(r.name,"'))],\n    j.literal('").concat(t.value,"')\n                  );")}function d(e){var t=e.object,n=e.property,a=""
return a="ThisExpression"===t.type?"j.thisExpression()":"MemberExpression"===t.type?"".concat(d(t)):"j.identifier('".concat(t.name,"')"),"j.memberExpression(\n ".concat(a,",\n j.identifier('").concat(n.name,"')\n  )")}function f(e){var n=e.expression,r=n.arguments,s=n.callee,c=n.extra,l=""
switch(n.type){case"MemberExpression":l="j.expressionStatement(\n      j.callExpression(\n      ".concat(d(s),",\n      [").concat(o(r),"]\n      ))")
break
case"CallExpression":l=c&&c.parenthesized?"j.expressionStatement(\n       j.parenthesizedExpression(\n      j.callExpression(\n          j.identifier('".concat(s.name,"'),\n          [").concat(o(r),"]\n        )))"):"j.expressionStatement(\n        ".concat(t(n),"\n        )")
break
case"AssignmentExpression":l="j.expressionStatement(".concat(function(e){var t="",n=e.operator,r=e.left,o=e.right
switch(r.type){case"Identifier":t="j.assignmentExpression(\n        '".concat(n,"',\n        ").concat(a(r),",\n        ").concat(i(o),"\n      )")
break
case"MemberExpression":t="j.assignmentExpression(\n        '".concat(n,"',\n        ").concat(d(r),",\n        ").concat(i(o),"\n      )")}return t}(n),")")}return l}function p(e){return e.map(function(e){switch(e.type){case"VariableDeclaration":return l(e)
case"ImportDeclaration":return u(e)
case"ExpressionStatement":return f(e)
case"IfStatement":return m(e)
case"FunctionDeclaration":return v(e)
default:return console.log(e.type),""}}).join(",")}function m(e){var t,n=e.test,a=e.consequent,r=e.alternate
if("BinaryExpression"===n.type){var o=n.operator,i=n.left,s=n.right
t="j.binaryExpression('".concat(o,"', j.identifier('").concat(i.name,"'), j.literal('").concat(s.value,"'))")}else"Identifier"===n.type&&(t="j.identifier(".concat(n.name,")"))
return r?"j.ifStatement(\n  ".concat(t,",\n  j.blockStatement([").concat(p(a.body),"]),\n  j.blockStatement([").concat(p(r.body),"])\n  )"):"j.ifStatement(\n  ".concat(t,",\n  j.blockStatement([").concat(p(a.body),"])\n  )")}function b(e){return e.map(function(e){switch(e.type){case"MethodDefinition":return"j.methodDefinition(\n          '".concat(e.kind,"',\n          ").concat(a(e.key),",\n          ").concat(j(e.value),",\n          ").concat(e.static,"\n        )")}}).join(",")}function v(e){var t=e.id,n=e.body,a=e.params
return"j.functionDeclaration(\n  j.identifier('".concat(t.name,"'),\n  [").concat(o(a),"],\n  j.blockStatement([").concat(p(n.body),"])\n  )")}function j(e){var t=e.id,n=e.body,a=e.params
return t?"j.functionExpression(\n  j.identifier('".concat(t.name,"'),\n  [").concat(o(a),"],\n  j.blockStatement([").concat(p(n.body),"])\n  )"):"j.functionExpression(\n  null,\n  [".concat(o(a),"],\n  j.blockStatement([").concat(p(n.body),"])\n  )")}function x(e){var a=e.params,r=e.body,i=""
switch(r.type){case"BlockStatement":i="j.arrowFunctionExpression(\n      [".concat(o(a),"],\n      j.blockStatement([").concat(p(r.body),"])\n      )")
break
case"Literal":i="j.arrowFunctionExpression(\n      [".concat(o(a),"],\n      ").concat(n(r),"\n      )")
break
case"CallExpression":i="j.arrowFunctionExpression(\n      [".concat(o(a),"],\n      ").concat(t(r),"\n      )")}return i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var y={arrowFunctionExpression:x,classDeclaration:function(e){var t=e.id,n=e.superClass,r=e.body,o=n?a(n):null
return"j.classDeclaration(\n    ".concat(a(t),",\n    j.classBody([").concat(b(r.body),"]),\n    ").concat(o,"\n  )")},exportDefaultDeclaration:function(e){var t=e.declaration,n=t.id,a=t.superClass,r=t.body
return"j.exportDefaultDeclaration(\n  j.classDeclaration(\n    j.identifier('".concat(n.name,"'),\n    j.classBody([").concat(b(r.body),"]),\n    j.identifier('").concat(a.name,"')\n  )\n  )")},expressionStatement:f,functionDeclaration:v,ifStatement:m,importDeclaration:u,variableDeclaration:l}
e.default=y}),define("ast-builder/config/environment",[],function(){try{var e="ast-builder/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(a){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("ast-builder/app").default.create({name:"ast-builder",version:"0.0.0+6d2e3c67"})
