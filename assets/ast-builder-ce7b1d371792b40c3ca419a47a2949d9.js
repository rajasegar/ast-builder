"use strict"
define("ast-builder/app",["exports","ast-builder/resolver","ember-load-initializers","ast-builder/config/environment"],(function(e,t,r,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:t.default});(0,r.default)(n,a.default.modulePrefix)
var o=n
e.default=o})),define("ast-builder/components/ast-builder-hbs",["exports","ember-template-recast","ast-builder/utils/template-recast-builders"],(function(_exports,_emberTemplateRecast,_templateRecastBuilders){Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0
var b=_emberTemplateRecast.builders,_code='<BsButton @onClick={{action "submit"}}>\nButton\n  </BsButton>\n\n<BsButtonGroup @value={{buttonGroupValue}} @type="checkbox" @onChange={{action (mut buttonGroupValue)}} as |bg|>\n          <bg.button @value={{1}}>1</bg.button>\n          <bg.button @value={{2}}>2</bg.button>\n          <bg.button @value={{3}}>3</bg.button>\n        </BsButtonGroup>\n <MyComponent @prop1={{true}} @prop2={{false}} />\n <XFoo @data-foo={{true}} />\n        <XFoo @data-test-selector={{true}} />\n        <XFoo @data-test-selector={{post.id}} />\n        <XFoo @label="hi" @data-test-selector={{true}} />\n  '
_code="\n{{#common/accordion-component data-test-accordion as |accordion|}}\n          block\n        {{/common/accordion-component}}\n"
var _default=Ember.Component.extend({customize:Ember.inject.service(),code:_code,theme:Ember.computed.reads("customize.theme"),ast:Ember.computed("code",(function(){var e=(0,_emberTemplateRecast.parse)(this.get("code"))
return console.log(e.body),JSON.stringify(e)})),pseudoAst:Ember.computed("code",(function(){var e=(0,_emberTemplateRecast.parse)(this.get("code"))
return _templateRecastBuilders.default.buildAST(e)})),nodeApi:Ember.computed("code",(function(){var e=(0,_emberTemplateRecast.parse)(this.get("code"))
return _templateRecastBuilders.default.buildAST(e).join("\n//-----------------------\n")})),output:Ember.computed("code",(function(){var sampleCode="",outputAst=(0,_emberTemplateRecast.parse)(sampleCode),ast=(0,_emberTemplateRecast.parse)(this.get("code"))
_templateRecastBuilders.default.buildAST(ast).forEach((function(n){outputAst.body.push(eval(n))}))
var output=(0,_emberTemplateRecast.print)(outputAst,{quote:"single"})
return output})),init:function(){this._super.apply(this,arguments),this.set("jsonMode",{name:"javascript",json:!0}),this.set("hbsMode",{name:"handlebars",base:"text/html"}),this.set("gutters",["CodeMirror-linenumbers","CodeMirror-foldgutter"]),this.set("extraKeys",{"Ctrl-Q":function(e){e.foldCode(e.getCursor())}})}})
_exports.default=_default})),define("ast-builder/components/ast-maker",["exports","recast","ast-node-builder"],(function(_exports,_recast,_astNodeBuilder){Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0
var j=_recast.types.builders,_code="\nfor (var i = 0; i < 10; i++) {\n  if (i === 3) {\n    continue;\n  }\n  text = text + i;\n}\n",_default=Ember.Component.extend({customize:Ember.inject.service(),code:_code,theme:Ember.computed.reads("customize.theme"),ast:Ember.computed("code",(function(){var e=(0,_recast.parse)(this.get("code"))
return console.log(e.program.body),JSON.stringify(e)})),pseudoAst:Ember.computed("code",(function(){var e=(0,_recast.parse)(this.get("code"))
return(0,_astNodeBuilder.buildAST)(e)})),nodeApi:Ember.computed("pseudoAst",(function(){return this.get("pseudoAst").join("\n//-----------------------\n")})),output:Ember.computed("pseudoAst",(function(){var sampleCode="",outputAst=(0,_recast.parse)(sampleCode)
this.get("pseudoAst").forEach((function(n){return outputAst.program.body.push(eval(n))}))
var output=(0,_recast.print)(outputAst,{quote:"single"}).code
return output})),init:function(){this._super.apply(this,arguments),this.set("jsonMode",{name:"javascript",json:!0})}})
_exports.default=_default})),define("ast-builder/components/ivy-codemirror",["exports","ivy-codemirror/components/ivy-codemirror"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-builder/controllers/application",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({customize:Ember.inject.service(),actions:{toggleDarkMode:function(){this.customize.toggleDarkMode()}}})
e.default=t})),define("ast-builder/controllers/handlebars",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({darkMode:!1,actions:{toggleDarkMode:function(){var e=this.get("darkMode")
this.set("darkMode",!e)}}})
e.default=t})),define("ast-builder/helpers/app-version",["exports","ast-builder/config/environment","ember-cli-app-version/utils/regexp"],(function(e,t,r){function a(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.default.APP.version,o=a.versionOnly||a.hideSha,i=a.shaOnly||a.hideVersion,u=null
return o&&(a.showExtended&&(u=n.match(r.versionExtendedRegExp)),u||(u=n.match(r.versionRegExp))),i&&(u=n.match(r.shaRegExp)),u?u[0]:n}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=a,e.default=void 0
var n=Ember.Helper.helper(a)
e.default=n})),define("ast-builder/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("ast-builder/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("ast-builder/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ast-builder/config/environment"],(function(e,t,r){var a,n
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,r.default.APP&&(a=r.default.APP.name,n=r.default.APP.version)
var o={name:"App Version",initialize:(0,t.default)(a,n)}
e.default=o})),define("ast-builder/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=r})),define("ast-builder/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],(function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a={name:"ember-data",initialize:t.default}
e.default=a})),define("ast-builder/initializers/export-application-global",["exports","ast-builder/config/environment"],(function(e,t){function r(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var r
if("undefined"!=typeof window)r=window
else if("undefined"!=typeof global)r=global
else{if("undefined"==typeof self)return
r=self}var a,n=t.default.exportApplicationGlobal
a="string"==typeof n?n:Ember.String.classify(t.default.modulePrefix),r[a]||(r[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete r[a]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=r,e.default=void 0
var a={name:"export-application-global",initialize:r}
e.default=a})),define("ast-builder/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"ember-data",initialize:t.default}
e.default=r})),define("ast-builder/resolver",["exports","ember-resolver"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("ast-builder/router",["exports","ast-builder/config/environment"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
r.map((function(){this.route("handlebars")}))
var a=r
e.default=a})),define("ast-builder/routes/handlebars",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t})),define("ast-builder/routes/index",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t})),define("ast-builder/services/ajax",["exports","ember-ajax/services/ajax"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-builder/services/code-mirror",["exports","ivy-codemirror/services/code-mirror"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("ast-builder/services/customize",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Service.extend({darkMode:!1,theme:Ember.computed("darkMode",(function(){return this.get("darkMode")?"solarized dark":"solarized light"})),toggleDarkMode:function(){var e=this.get("darkMode")
this.set("darkMode",!e)}})
e.default=t})),define("ast-builder/templates/application",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"PA09rwfN",block:'{"symbols":[],"statements":[[7,"header",true],[8],[0,"\\n  "],[7,"h1",true],[8],[0,"ast-builder"],[9],[0,"\\n  "],[7,"nav",true],[8],[0,"\\n    "],[7,"ul",true],[8],[0,"\\n      "],[7,"li",true],[8],[0,"\\n        "],[4,"link-to",null,[["route"],["index"]],{"statements":[[0,"Javascript"]],"parameters":[]},null],[0,"\\n      "],[9],[0,"\\n      "],[7,"li",true],[8],[0,"\\n        "],[4,"link-to",null,[["route"],["handlebars"]],{"statements":[[0,"Handlebars"]],"parameters":[]},null],[0,"\\n      "],[9],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n  "],[7,"div",true],[10,"id","options"],[8],[0,"\\n    "],[7,"p",true],[8],[0,"DarkMode: "],[5,"input",[],[["@type","@click"],["checkbox",[28,"action",[[23,0,[]],"toggleDarkMode"],null]]]],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"],[7,"main",true],[8],[0,"\\n  "],[1,[22,"outlet"],false],[0,"\\n"],[9],[0,"\\n"],[7,"footer",true],[8],[0,"\\n  "],[7,"p",true],[8],[0,"\\n    "],[7,"a",true],[10,"href","https://github.com/rajasegar/ast-builder"],[8],[0,"Github"],[9],[0," |\\n    "],[7,"a",true],[10,"href","https://github.com/rajasegar/ast-builder/issues"],[8],[0,"Report issues"],[9],[0," \\n  "],[9],[0,"\\n"],[9],[0,"\\n\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/application.hbs"}})
e.default=t})),define("ast-builder/templates/components/ast-builder-hbs",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"HmZoqV++",block:'{"symbols":[],"statements":[[7,"div",true],[10,"class","grid-row"],[8],[0,"\\n  "],[7,"div",true],[10,"class","grid-col"],[8],[0,"\\n    "],[1,[28,"ivy-codemirror",null,[["value","options","valueUpdated"],[[24,["code"]],[28,"hash",null,[["lineNumbers","mode","theme"],[true,[24,["hbsMode"]],[24,["theme"]]]]],[28,"action",[[23,0,[]],[28,"mut",[[24,["code"]]],null]],null]]]],false],[0,"\\n    "],[1,[28,"ivy-codemirror",null,[["value","options"],[[24,["ast"]],[28,"hash",null,[["mode","theme","foldGutter","lineWrapping","gutters","extraKeys"],[[24,["jsonMode"]],[24,["theme"]],true,true,[24,["gutters"]],[24,["extraKeys"]]]]]]]],false],[0,"\\n  "],[9],[0,"\\n  "],[7,"div",true],[10,"class","grid-col"],[8],[0,"\\n    "],[1,[28,"ivy-codemirror",null,[["value","options"],[[24,["nodeApi"]],[28,"hash",null,[["lineNumbers","mode","theme","autoIndent"],[true,"javascript",[24,["theme"]],true]]]]]],false],[0,"\\n    "],[1,[28,"ivy-codemirror",null,[["value","options"],[[24,["output"]],[28,"hash",null,[["lineNumbers","mode","theme"],[true,[24,["hbsMode"]],[24,["theme"]]]]]]]],false],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/components/ast-builder-hbs.hbs"}})
e.default=t})),define("ast-builder/templates/components/ast-maker",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"jcGL2Xcs",block:'{"symbols":[],"statements":[[7,"div",true],[10,"class","grid-row"],[8],[0,"\\n  "],[7,"div",true],[10,"class","grid-col"],[8],[0,"\\n    "],[1,[28,"ivy-codemirror",null,[["value","options","valueUpdated"],[[24,["code"]],[28,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript",[24,["theme"]]]]],[28,"action",[[23,0,[]],[28,"mut",[[24,["code"]]],null]],null]]]],false],[0,"\\n    "],[1,[28,"ivy-codemirror",null,[["value","options"],[[24,["ast"]],[28,"hash",null,[["mode","theme","foldGutter","readOnly"],[[24,["jsonMode"]],[24,["theme"]],true,true]]]]]],false],[0,"\\n  "],[9],[0,"\\n  "],[7,"div",true],[10,"class","grid-col"],[8],[0,"\\n    "],[1,[28,"ivy-codemirror",null,[["value","options"],[[24,["nodeApi"]],[28,"hash",null,[["lineNumbers","mode","theme","autoIndent"],[true,"javascript",[24,["theme"]],true]]]]]],false],[0,"\\n    "],[1,[28,"ivy-codemirror",null,[["value","options"],[[24,["output"]],[28,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript",[24,["theme"]]]]]]]],false],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/components/ast-maker.hbs"}})
e.default=t})),define("ast-builder/templates/handlebars",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"zIBo5CGy",block:'{"symbols":[],"statements":[[5,"ast-builder-hbs",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/handlebars.hbs"}})
e.default=t})),define("ast-builder/templates/index",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"yiLOP4+C",block:'{"symbols":[],"statements":[[5,"ast-maker",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/index.hbs"}})
e.default=t})),define("ast-builder/utils/template-recast-builders",["exports"],(function(e){function t(e){var t=e.chars.replace(/\n/g,"\\n")
return'b.text("'.concat(t,'")')}function r(e){return e.map((function(e){switch(e.type){case"SubExpression":return function e(t){var r=t.params.map((function(t){return"SubExpression"===t.type?e(t):"StringLiteral"===t.type?'"'.concat(t.original,'"'):t.original})),a=[]
t.hash.pairs.length>0&&(a=t.hash.pairs.map((function(t){if("SubExpression"===t.value.type){var r=e(t.value)
return"".concat(t.key,"=").concat(r)}return"StringLiteral"===t.value.type?"".concat(t.key,'="').concat(t.value.original,'"'):"".concat(t.key,"=").concat(t.value.original)})))
var n=r.concat(a)
return"(".concat(t.path.original," ").concat(n.join(" "),")")}(e)
case"StringLiteral":return'"'.concat(e.original,'"')
case"NullLiteral":return"null"
case"UndefinedLiteral":return"undefined"
default:return console.log("buildParams => ",e.type),e.original}})).join(" ")}function a(e){return e.params.length>0?"b.mustache(b.path('".concat(e.path.original," ").concat(r(e.params),"'))"):"b.mustache('".concat(e.path.original,"')")}function n(e){return e.map((function(e){switch(e.type){case"TextNode":return t(e)
case"ElementNode":return o(e)
case"MustacheStatement":return a(e)
default:return console.log("buildchildren => ",e.type),""}})).join(",")}function o(e){var r,o=e.selfClosing,i=e.tag,u=e.attributes,l=e.children
return"b.element({name: '".concat(i,"', selfClosing: ").concat(o,"},\n    {\n    attrs: [").concat((r=u,r.map((function(e){switch(e.value.type){case"TextNode":return"b.attr('".concat(e.name,"', ").concat(t(e.value),")")
case"MustacheStatement":return"b.attr('".concat(e.name,"', ").concat(a(e.value),")")
default:return console.log("buildAttributes => ",e.value.type),""}})).join(",")),"],\n    children: [").concat(n(l),"]\n    }\n  )")}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var i={textNode:t,elementNode:o,buildAST:function(e){return e.body.map((function(e){switch(e.type){case"TextNode":return t(e)
case"ElementNode":return o(e)
case"BlockStatement":return function(e){var t=e.path,r=e.program,a=e.params
return"b.program([\n      b.block(\n        b.path('".concat(t.original,"'),\n        [").concat(function(e){return e.map((function(e){return"b.path('".concat(e.original,"')")})).join(",")}(a),"],\n        b.hash([b.path('lskdf'),'laskjdf']),\n        b.blockItself([").concat(n(r.body),"])\n      ),\n    ])")}(e)
default:console.log("buildAST => ",e.type)}}))}}
e.default=i})),define("ast-builder/config/environment",[],(function(){try{var e="ast-builder/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),r={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(r,"__esModule",{value:!0}),r}catch(a){throw new Error('Could not read config from meta tag with name "'+e+'".')}})),runningTests||require("ast-builder/app").default.create({name:"ast-builder",version:"0.0.0+f79da50a"})
