"use strict"
define("ast-builder/app",["exports","ast-builder/resolver","ember-load-initializers","ast-builder/config/environment"],function(e,t,n,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:t.default});(0,n.default)(r,a.default.modulePrefix)
var o=r
e.default=o}),define("ast-builder/components/ast-builder-hbs",["exports","ember-template-recast","ast-builder/utils/template-recast-builders"],function(_exports,_emberTemplateRecast,_templateRecastBuilders){Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0
var b=_emberTemplateRecast.builders,_code='<BsButton @onClick={{action "submit"}}>\nButton\n  </BsButton>\n\n<BsButtonGroup @value={{buttonGroupValue}} @type="checkbox" @onChange={{action (mut buttonGroupValue)}} as |bg|>\n          <bg.button @value={{1}}>1</bg.button>\n          <bg.button @value={{2}}>2</bg.button>\n          <bg.button @value={{3}}>3</bg.button>\n        </BsButtonGroup>\n <MyComponent @prop1={{true}} @prop2={{false}} />\n <XFoo @data-foo={{true}} />\n        <XFoo @data-test-selector={{true}} />\n        <XFoo @data-test-selector={{post.id}} />\n        <XFoo @label="hi" @data-test-selector={{true}} />\n  '
_code="\n{{#common/accordion-component data-test-accordion as |accordion|}}\n          block\n        {{/common/accordion-component}}\n"
var _default=Ember.Component.extend({customize:Ember.inject.service(),code:_code,theme:Ember.computed.reads("customize.theme"),ast:Ember.computed("code",function(){var e=(0,_emberTemplateRecast.parse)(this.get("code"))
return console.log(e.body),JSON.stringify(e)}),pseudoAst:Ember.computed("code",function(){var e=(0,_emberTemplateRecast.parse)(this.get("code"))
return _templateRecastBuilders.default.buildAST(e)}),nodeApi:Ember.computed("code",function(){var e=(0,_emberTemplateRecast.parse)(this.get("code"))
return _templateRecastBuilders.default.buildAST(e).join("\n//-----------------------\n")}),output:Ember.computed("code",function(){var sampleCode="",outputAst=(0,_emberTemplateRecast.parse)(sampleCode),ast=(0,_emberTemplateRecast.parse)(this.get("code"))
_templateRecastBuilders.default.buildAST(ast).forEach(function(n){outputAst.body.push(eval(n))})
var output=(0,_emberTemplateRecast.print)(outputAst,{quote:"single"})
return output}),init:function(){this._super.apply(this,arguments),this.set("jsonMode",{name:"javascript",json:!0}),this.set("hbsMode",{name:"handlebars",base:"text/html"}),this.set("gutters",["CodeMirror-linenumbers","CodeMirror-foldgutter"]),this.set("extraKeys",{"Ctrl-Q":function(e){e.foldCode(e.getCursor())}})}})
_exports.default=_default}),define("ast-builder/components/ast-maker",["exports","recast","ast-builder/utils/codeshift-api"],function(_exports,_recast,_codeshiftApi){Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0
var j=_recast.types.builders,_code1="let a = 1;\nlet b = 'hello';\nlet c = false;\nconst d = 2;\nvar e = true;\nimport { foo as bar } from 'lib';\nhello(1, 'world', true, a);\nthis.hello(1, 'world', true, a);\nhello.world(1, 'foo', true, a);\nfoo.bar.baz();\nfoo.bar.bax.baz(1, 'foo', true, a);\nif(a === 1) {\nconsole.log('true');\nfoo.bar();\n} else {\nconsole.log('false');\nfoo.baz();\n}\n\nlet a = {\nname: 'raja',\nage: 35,\naction: hello()\n};\n\nexport default class MyComponent extends ReactComponent {}\nclass MyComponent extends ReactComponent {\n  constructor(a,b) {\n    this.a = a;\n    this.b = b;\n  }\n\n  hello(x,y) {\n    console.log(x,y);\n  }\n}\n\nfunction init() {\nthis._super(...arguments);\n}\n\nmodule('Unit | Utility | codeshift-api', function() {\n\n  let a = 1;\n\n  test('it works', function(assert) {\n    let result = codeshiftApi();\n    assert.ok(result);\n  });\n});\n\nlet f = [1, \"hello\", true, 0, -1];\nlet a = () => { console.log('hello') }\nlet a = () => console.log('hello')\nlet a = () => log('hello')\nlet a = () => 2\n\nlet { name, age } = a; \nlet a = [1,2,3];\nlet [x,y,z] = a;\nthis.a = a;\nthis.b = 10;\n\nexport default class MyComponent extends ReactComponent {\n  constructor(a,b) {\n    this.a = a;\n    this.b = b;\n  }\n\n  hello(x,y) {\n    console.log(x,y);\n  }\n}\n",_code="\n expect(find(cfPage.fieldPositionOne).textContent.trim()).to.be.contains(fieldOrder[0]);\n",_default=Ember.Component.extend({customize:Ember.inject.service(),code:_code,theme:Ember.computed.reads("customize.theme"),ast:Ember.computed("code",function(){var e=(0,_recast.parse)(this.get("code"))
return console.log(e.program.body),JSON.stringify(e)}),pseudoAst:Ember.computed("code",function(){return(0,_recast.parse)(this.get("code")).program.body.map(function(e){switch(e.type){case"VariableDeclaration":return _codeshiftApi.default.variableDeclaration(e)
case"ImportDeclaration":return _codeshiftApi.default.importDeclaration(e)
case"ExpressionStatement":return _codeshiftApi.default.expressionStatement(e)
case"IfStatement":return _codeshiftApi.default.ifStatement(e)
case"ExportDefaultDeclaration":return _codeshiftApi.default.exportDefaultDeclaration(e)
case"ClassDeclaration":return _codeshiftApi.default.classDeclaration(e)
case"FunctionDeclaration":return _codeshiftApi.default.functionDeclaration(e)
case"ArrowFunctionExpression":return _codeshiftApi.default.arrowFunctionExpression(e)
default:return console.log("pseudoAst => ",e.type),""}})}),nodeApi:Ember.computed("pseudoAst",function(){return this.get("pseudoAst").join("\n//-----------------------\n")}),output:Ember.computed("pseudoAst",function(){var sampleCode="",outputAst=(0,_recast.parse)(sampleCode)
this.get("pseudoAst").forEach(function(n){return outputAst.program.body.push(eval(n))})
var output=(0,_recast.print)(outputAst,{quote:"single"}).code
return output}),init:function(){this._super.apply(this,arguments),this.set("jsonMode",{name:"javascript",json:!0})}})
_exports.default=_default}),define("ast-builder/components/ivy-codemirror",["exports","ivy-codemirror/components/ivy-codemirror"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-builder/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({customize:Ember.inject.service(),actions:{toggleDarkMode:function(){this.customize.toggleDarkMode()}}})
e.default=t}),define("ast-builder/controllers/handlebars",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({darkMode:!1,actions:{toggleDarkMode:function(){var e=this.get("darkMode")
this.set("darkMode",!e)}}})
e.default=t}),define("ast-builder/helpers/app-version",["exports","ast-builder/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){function a(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.default.APP.version,o=a.versionOnly||a.hideSha,i=a.shaOnly||a.hideVersion,s=null
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
n.map(function(){this.route("handlebars")})
var a=n
e.default=a}),define("ast-builder/routes/handlebars",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("ast-builder/routes/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("ast-builder/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-builder/services/code-mirror",["exports","ivy-codemirror/services/code-mirror"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-builder/services/customize",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Service.extend({darkMode:!1,theme:Ember.computed("darkMode",function(){return this.get("darkMode")?"solarized dark":"solarized light"}),toggleDarkMode:function(){var e=this.get("darkMode")
this.set("darkMode",!e)}})
e.default=t}),define("ast-builder/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"VWczcGFE",block:'{"symbols":[],"statements":[[7,"header"],[9],[0,"\\n  "],[7,"h1"],[9],[0,"ast-builder"],[10],[0,"\\n  "],[7,"nav"],[9],[0,"\\n    "],[7,"ul"],[9],[0,"\\n      "],[7,"li"],[9],[0,"\\n        "],[4,"link-to",null,[["route"],["index"]],{"statements":[[0,"Javascript"]],"parameters":[]},null],[0,"\\n      "],[10],[0,"\\n      "],[7,"li"],[9],[0,"\\n        "],[4,"link-to",null,[["route"],["handlebars"]],{"statements":[[0,"Handlebars"]],"parameters":[]},null],[0,"\\n      "],[10],[0,"\\n    "],[10],[0,"\\n  "],[10],[0,"\\n  "],[7,"div"],[11,"id","options"],[9],[0,"\\n    "],[7,"p"],[9],[0,"DarkMode: "],[5,"input",[],[["@type","@click"],["checkbox",[29,"action",[[24,0,[]],"toggleDarkMode"],null]]]],[10],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"],[7,"main"],[9],[0,"\\n  "],[1,[23,"outlet"],false],[0,"\\n"],[10],[0,"\\n"],[7,"footer"],[9],[0,"\\n  "],[7,"p"],[9],[0,"\\n    "],[7,"a"],[11,"href","https://github.com/rajasegar/ast-builder"],[9],[0,"Github"],[10],[0," |\\n    "],[7,"a"],[11,"href","https://github.com/rajasegar/ast-builder/issues"],[9],[0,"Report issues"],[10],[0," \\n  "],[10],[0,"\\n"],[10],[0,"\\n\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/application.hbs"}})
e.default=t}),define("ast-builder/templates/components/ast-builder-hbs",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"6bR+ImVj",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","grid-row"],[9],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options","valueUpdated"],[[25,["code"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,[25,["hbsMode"]],[25,["theme"]]]]],[29,"action",[[24,0,[]],[29,"mut",[[25,["code"]]],null]],null]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["ast"]],[29,"hash",null,[["mode","theme","foldGutter","lineWrapping","gutters","extraKeys"],[[25,["jsonMode"]],[25,["theme"]],true,true,[25,["gutters"]],[25,["extraKeys"]]]]]]]],false],[0,"\\n  "],[10],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["nodeApi"]],[29,"hash",null,[["lineNumbers","mode","theme","autoIndent"],[true,"javascript",[25,["theme"]],true]]]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["output"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,[25,["hbsMode"]],[25,["theme"]]]]]]]],false],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/components/ast-builder-hbs.hbs"}})
e.default=t}),define("ast-builder/templates/components/ast-maker",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"aSAsUY32",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","grid-row"],[9],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options","valueUpdated"],[[25,["code"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript",[25,["theme"]]]]],[29,"action",[[24,0,[]],[29,"mut",[[25,["code"]]],null]],null]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["ast"]],[29,"hash",null,[["mode","theme","foldGutter","readOnly"],[[25,["jsonMode"]],[25,["theme"]],true,true]]]]]],false],[0,"\\n  "],[10],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["nodeApi"]],[29,"hash",null,[["lineNumbers","mode","theme","autoIndent","readOnly"],[true,"javascript",[25,["theme"]],true,true]]]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["output"]],[29,"hash",null,[["lineNumbers","mode","theme","readOnly"],[true,"javascript",[25,["theme"]],true]]]]]],false],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/components/ast-maker.hbs"}})
e.default=t}),define("ast-builder/templates/handlebars",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"zIBo5CGy",block:'{"symbols":[],"statements":[[5,"ast-builder-hbs",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/handlebars.hbs"}})
e.default=t}),define("ast-builder/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"yiLOP4+C",block:'{"symbols":[],"statements":[[5,"ast-maker",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/index.hbs"}})
e.default=t}),define("ast-builder/utils/codeshift-api",["exports"],function(e){function t(e){var t=e.arguments,n=e.callee
return"MemberExpression"===n.type?"j.callExpression(\n          ".concat(d(n),",\n          [").concat(o(t),"]\n        )"):"j.callExpression(\n          ".concat(a(n),",\n          [").concat(o(t),"]\n        )")}function n(e){var t="string"==typeof e.value?"'".concat(e.value,"'"):e.value
return"j.literal(".concat(t,")")}function a(e){return"j.identifier('".concat(e.name,"')")}function r(e){var t=e.elements.map(function(e){switch(e.type){case"Literal":return n(e)
case"UnaryExpression":return a=(t=e).argument,r=t.operator,o=t.prefix,"j.unaryExpression('".concat(r,"', ").concat(n(a),", ").concat(o,")")}var t,a,r,o}).join(",")
return"j.arrayExpression([".concat(t,"])")}function o(e){return e.map(function(e){switch(e.type){case"Literal":return n(e)
case"Identifier":return"j.identifier('".concat(e.name,"')")
case"SpreadElement":return a=e.argument.name,"j.spreadElement(j.identifier('".concat(a,"'))")
case"FunctionExpression":return h(e)
case"CallExpression":return t(e)
case"MemberExpression":return d(e)
default:return console.log("buildArgs => ",e.type),""}var a}).join(",")}function i(e){switch(e.type){case"Literal":return n(e)
case"ObjectExpression":return function(e){var t=e.properties.map(function(e){var t=e.key,n=e.value
return'j.property("init", j.identifier(\''.concat(t.name,"'), ").concat(i(n),")")})
return"j.objectExpression([".concat(t.join(","),"])")}(e)
case"CallExpression":return t(e)
case"ArrayExpression":return r(e)
case"ArrowFunctionExpression":return y(e)
case"Identifier":return a(e)
default:return console.log("buildValue => ",e.type),""}}function s(e){return e.map(function(e){return n=(t=e).key,a=t.value,'j.property("init", j.identifier(\''.concat(n.name,"'), ").concat(i(a),")")
var t,n,a}).join(",")}function l(e){var t,n="",r=e.id,o=e.init
switch(r.type){case"Identifier":n="j.variableDeclarator(\n      j.identifier('".concat(r.name,"'),\n        ").concat(i(o),"\n          )")
break
case"ObjectPattern":n="j.variableDeclarator(\n      j.objectPattern([".concat(s(r.properties),"]),\n        ").concat(i(o),"\n          )")
break
case"ArrayPattern":n="j.variableDeclarator(\n      j.arrayPattern([".concat((t=r.elements,t.map(function(e){return a(e)}).join(",")),"]),\n        ").concat(i(o),"\n          )")}return n}function c(e){var t=e.kind,n=e.declarations
return"j.variableDeclaration(\n  '".concat(t,"',\n      [").concat(l(n[0]),"])")}function u(e){var t=e.source,n=e.specifiers[0],a=n.imported,r=n.local
return"j.importDeclaration(\n           [j.importSpecifier(j.identifier('".concat(a.name,"'),j.identifier('").concat(r.name,"'))],\n    j.literal('").concat(t.value,"')\n                  );")}function d(e){var r=e.object,o=e.property,i=e.computed,s=""
switch(r.type){case"ThisExpression":s="j.thisExpression()"
break
case"MemberExpression":s="".concat(d(r))
break
case"Identifier":s="j.identifier('".concat(r.name,"')")
break
case"CallExpression":s=t(r)
break
default:console.log("memberExpression => ",r.type)}var l=""
switch(o.type){case"Identifier":l=a(o)
break
case"Literal":l=n(o)
break
default:console.log("memberExpression.property => ",o.type)}return"j.memberExpression(\n ".concat(s,",\n ").concat(l,",\n ").concat(i,"\n  )")}function p(e){var n=e.expression,r=n.arguments,s=n.callee,l=n.extra,c=""
switch(n.type){case"MemberExpression":c="j.expressionStatement(\n      j.callExpression(\n      ".concat(d(s),",\n      [").concat(o(r),"]\n      ))")
break
case"CallExpression":c=l&&l.parenthesized?"j.expressionStatement(\n       j.parenthesizedExpression(\n      j.callExpression(\n          j.identifier('".concat(s.name,"'),\n          [").concat(o(r),"]\n        )))"):"j.expressionStatement(\n        ".concat(t(n),"\n        )")
break
case"AssignmentExpression":c="j.expressionStatement(".concat(function(e){var t="",n=e.operator,r=e.left,o=e.right
switch(r.type){case"Identifier":t="j.assignmentExpression(\n        '".concat(n,"',\n        ").concat(a(r),",\n        ").concat(i(o),"\n      )")
break
case"MemberExpression":t="j.assignmentExpression(\n        '".concat(n,"',\n        ").concat(d(r),",\n        ").concat(i(o),"\n      )")}return t}(n),")")}return c}function f(e){return e.map(function(e){switch(e.type){case"VariableDeclaration":return c(e)
case"ImportDeclaration":return u(e)
case"ExpressionStatement":return p(e)
case"IfStatement":return m(e)
case"FunctionDeclaration":return v(e)
default:return console.log("buildBlock => ",e.type),""}}).join(",")}function m(e){var t,n=e.test,a=e.consequent,r=e.alternate
if("BinaryExpression"===n.type){var o=n.operator,i=n.left,s=n.right
t="j.binaryExpression('".concat(o,"', j.identifier('").concat(i.name,"'), j.literal('").concat(s.value,"'))")}else"Identifier"===n.type&&(t="j.identifier(".concat(n.name,")"))
return r?"j.ifStatement(\n  ".concat(t,",\n  j.blockStatement([").concat(f(a.body),"]),\n  j.blockStatement([").concat(f(r.body),"])\n  )"):"j.ifStatement(\n  ".concat(t,",\n  j.blockStatement([").concat(f(a.body),"])\n  )")}function b(e){return e.map(function(e){switch(e.type){case"MethodDefinition":return"j.methodDefinition(\n          '".concat(e.kind,"',\n          ").concat(a(e.key),",\n          ").concat(h(e.value),",\n          ").concat(e.static,"\n        )")}}).join(",")}function v(e){var t=e.id,n=e.body,a=e.params
return"j.functionDeclaration(\n  j.identifier('".concat(t.name,"'),\n  [").concat(o(a),"],\n  j.blockStatement([").concat(f(n.body),"])\n  )")}function h(e){var t=e.id,n=e.body,a=e.params
return t?"j.functionExpression(\n  j.identifier('".concat(t.name,"'),\n  [").concat(o(a),"],\n  j.blockStatement([").concat(f(n.body),"])\n  )"):"j.functionExpression(\n  null,\n  [".concat(o(a),"],\n  j.blockStatement([").concat(f(n.body),"])\n  )")}function y(e){var a=e.params,r=e.body,i=""
switch(r.type){case"BlockStatement":i="j.arrowFunctionExpression(\n      [".concat(o(a),"],\n      j.blockStatement([").concat(f(r.body),"])\n      )")
break
case"Literal":i="j.arrowFunctionExpression(\n      [".concat(o(a),"],\n      ").concat(n(r),"\n      )")
break
case"CallExpression":i="j.arrowFunctionExpression(\n      [".concat(o(a),"],\n      ").concat(t(r),"\n      )")}return i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var x={arrowFunctionExpression:y,classDeclaration:function(e){var t=e.id,n=e.superClass,r=e.body,o=n?a(n):null
return"j.classDeclaration(\n    ".concat(a(t),",\n    j.classBody([").concat(b(r.body),"]),\n    ").concat(o,"\n  )")},exportDefaultDeclaration:function(e){var t=e.declaration,n=t.id,a=t.superClass,r=t.body
return"j.exportDefaultDeclaration(\n  j.classDeclaration(\n    j.identifier('".concat(n.name,"'),\n    j.classBody([").concat(b(r.body),"]),\n    j.identifier('").concat(a.name,"')\n  )\n  )")},expressionStatement:p,functionDeclaration:v,ifStatement:m,importDeclaration:u,variableDeclaration:c}
e.default=x}),define("ast-builder/utils/template-recast-builders",["exports"],function(e){function t(e){var t=e.chars.replace(/\n/g,"\\n")
return'b.text("'.concat(t,'")')}function n(e){return e.map(function(e){switch(e.type){case"SubExpression":return function e(t){var n=t.params.map(function(t){return"SubExpression"===t.type?e(t):"StringLiteral"===t.type?'"'.concat(t.original,'"'):t.original}),a=[]
t.hash.pairs.length>0&&(a=t.hash.pairs.map(function(t){if("SubExpression"===t.value.type){var n=e(t.value)
return"".concat(t.key,"=").concat(n)}return"StringLiteral"===t.value.type?"".concat(t.key,'="').concat(t.value.original,'"'):"".concat(t.key,"=").concat(t.value.original)}))
var r=n.concat(a)
return"(".concat(t.path.original," ").concat(r.join(" "),")")}(e)
case"StringLiteral":return'"'.concat(e.original,'"')
case"NullLiteral":return"null"
case"UndefinedLiteral":return"undefined"
default:return console.log("buildParams => ",e.type),e.original}}).join(" ")}function a(e){return e.params.length>0?"b.mustache(b.path('".concat(e.path.original," ").concat(n(e.params),"'))"):"b.mustache('".concat(e.path.original,"')")}function r(e){return e.map(function(e){switch(e.type){case"TextNode":return t(e)
case"ElementNode":return o(e)
case"MustacheStatement":return a(e)
default:return console.log("buildchildren => ",e.type),""}}).join(",")}function o(e){var n,o=e.selfClosing,i=e.tag,s=e.attributes,l=e.children
return"b.element({name: '".concat(i,"', selfClosing: ").concat(o,"},\n    {\n    attrs: [").concat((n=s,n.map(function(e){switch(e.value.type){case"TextNode":return"b.attr('".concat(e.name,"', ").concat(t(e.value),")")
case"MustacheStatement":return"b.attr('".concat(e.name,"', ").concat(a(e.value),")")
default:return console.log("buildAttributes => ",e.value.type),""}}).join(",")),"],\n    children: [").concat(r(l),"]\n    }\n  )")}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var i={textNode:t,elementNode:o,buildAST:function(e){return e.body.map(function(e){switch(e.type){case"TextNode":return t(e)
case"ElementNode":return o(e)
case"BlockStatement":return function(e){var t=e.path,n=e.program,a=e.params
return"b.program([\n      b.block(\n        b.path('".concat(t.original,"'),\n        [").concat(function(e){return e.map(function(e){return"b.path('".concat(e.original,"')")}).join(",")}(a),"],\n        b.hash([b.path('lskdf'),'laskjdf']),\n        b.blockItself([").concat(r(n.body),"])\n      ),\n    ])")}(e)
default:console.log("buildAST => ",e.type)}})}}
e.default=i}),define("ast-builder/config/environment",[],function(){try{var e="ast-builder/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(a){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("ast-builder/app").default.create({name:"ast-builder",version:"0.0.0+5bf94c61"})
