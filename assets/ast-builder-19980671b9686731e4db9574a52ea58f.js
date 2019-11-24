"use strict"
define("ast-builder/app",["exports","ast-builder/resolver","ember-load-initializers","ast-builder/config/environment"],function(e,t,a,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:t.default});(0,a.default)(n,r.default.modulePrefix)
var o=n
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
_exports.default=_default}),define("ast-builder/components/ast-maker",["exports","recast","ast-node-builder"],function(_exports,_recast,_astNodeBuilder){Object.defineProperty(_exports,"__esModule",{value:!0}),_exports.default=void 0
var j=_recast.types.builders,_code="\nfor (var i = 0; i < 10; i++) {\n  if (i === 3) {\n    continue;\n  }\n  text = text + i;\n}\n",_default=Ember.Component.extend({customize:Ember.inject.service(),code:_code,theme:Ember.computed.reads("customize.theme"),ast:Ember.computed("code",function(){var e=(0,_recast.parse)(this.get("code"))
return console.log(e.program.body),JSON.stringify(e)}),pseudoAst:Ember.computed("code",function(){var e=(0,_recast.parse)(this.get("code"))
return(0,_astNodeBuilder.buildAST)(e)}),nodeApi:Ember.computed("pseudoAst",function(){return this.get("pseudoAst").join("\n//-----------------------\n")}),output:Ember.computed("pseudoAst",function(){var sampleCode="",outputAst=(0,_recast.parse)(sampleCode)
this.get("pseudoAst").forEach(function(n){return outputAst.program.body.push(eval(n))})
var output=(0,_recast.print)(outputAst,{quote:"single"}).code
return output}),init:function(){this._super.apply(this,arguments),this.set("jsonMode",{name:"javascript",json:!0})}})
_exports.default=_default}),define("ast-builder/components/ivy-codemirror",["exports","ivy-codemirror/components/ivy-codemirror"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-builder/controllers/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({customize:Ember.inject.service(),actions:{toggleDarkMode:function(){this.customize.toggleDarkMode()}}})
e.default=t}),define("ast-builder/controllers/handlebars",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({darkMode:!1,actions:{toggleDarkMode:function(){var e=this.get("darkMode")
this.set("darkMode",!e)}}})
e.default=t}),define("ast-builder/helpers/app-version",["exports","ast-builder/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,a){function r(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.default.APP.version,o=r.versionOnly||r.hideSha,i=r.shaOnly||r.hideVersion,l=null
return o&&(r.showExtended&&(l=n.match(a.versionExtendedRegExp)),l||(l=n.match(a.versionRegExp))),i&&(l=n.match(a.shaRegExp)),l?l[0]:n}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=r,e.default=void 0
var n=Ember.Helper.helper(r)
e.default=n}),define("ast-builder/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("ast-builder/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("ast-builder/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ast-builder/config/environment"],function(e,t,a){var r,n
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a.default.APP&&(r=a.default.APP.name,n=a.default.APP.version)
var o={name:"App Version",initialize:(0,t.default)(r,n)}
e.default=o}),define("ast-builder/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=a}),define("ast-builder/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"ember-data",initialize:t.default}
e.default=r}),define("ast-builder/initializers/export-application-global",["exports","ast-builder/config/environment"],function(e,t){function a(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var a
if("undefined"!=typeof window)a=window
else if("undefined"!=typeof global)a=global
else{if("undefined"==typeof self)return
a=self}var r,n=t.default.exportApplicationGlobal
r="string"==typeof n?n:Ember.String.classify(t.default.modulePrefix),a[r]||(a[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete a[r]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=a,e.default=void 0
var r={name:"export-application-global",initialize:a}
e.default=r}),define("ast-builder/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a={name:"ember-data",initialize:t.default}
e.default=a}),define("ast-builder/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("ast-builder/router",["exports","ast-builder/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
a.map(function(){this.route("handlebars")})
var r=a
e.default=r}),define("ast-builder/routes/handlebars",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
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
var t=Ember.HTMLBars.template({id:"F17Tn6EN",block:'{"symbols":[],"statements":[[7,"div"],[11,"class","grid-row"],[9],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options","valueUpdated"],[[25,["code"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript",[25,["theme"]]]]],[29,"action",[[24,0,[]],[29,"mut",[[25,["code"]]],null]],null]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["ast"]],[29,"hash",null,[["mode","theme","foldGutter","readOnly"],[[25,["jsonMode"]],[25,["theme"]],true,true]]]]]],false],[0,"\\n  "],[10],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["nodeApi"]],[29,"hash",null,[["lineNumbers","mode","theme","autoIndent"],[true,"javascript",[25,["theme"]],true]]]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["output"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript",[25,["theme"]]]]]]]],false],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/components/ast-maker.hbs"}})
e.default=t}),define("ast-builder/templates/handlebars",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"zIBo5CGy",block:'{"symbols":[],"statements":[[5,"ast-builder-hbs",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/handlebars.hbs"}})
e.default=t}),define("ast-builder/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"yiLOP4+C",block:'{"symbols":[],"statements":[[5,"ast-maker",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-builder/templates/index.hbs"}})
e.default=t}),define("ast-builder/utils/template-recast-builders",["exports"],function(e){function t(e){var t=e.chars.replace(/\n/g,"\\n")
return'b.text("'.concat(t,'")')}function a(e){return e.map(function(e){switch(e.type){case"SubExpression":return function e(t){var a=t.params.map(function(t){return"SubExpression"===t.type?e(t):"StringLiteral"===t.type?'"'.concat(t.original,'"'):t.original}),r=[]
t.hash.pairs.length>0&&(r=t.hash.pairs.map(function(t){if("SubExpression"===t.value.type){var a=e(t.value)
return"".concat(t.key,"=").concat(a)}return"StringLiteral"===t.value.type?"".concat(t.key,'="').concat(t.value.original,'"'):"".concat(t.key,"=").concat(t.value.original)}))
var n=a.concat(r)
return"(".concat(t.path.original," ").concat(n.join(" "),")")}(e)
case"StringLiteral":return'"'.concat(e.original,'"')
case"NullLiteral":return"null"
case"UndefinedLiteral":return"undefined"
default:return console.log("buildParams => ",e.type),e.original}}).join(" ")}function r(e){return e.params.length>0?"b.mustache(b.path('".concat(e.path.original," ").concat(a(e.params),"'))"):"b.mustache('".concat(e.path.original,"')")}function n(e){return e.map(function(e){switch(e.type){case"TextNode":return t(e)
case"ElementNode":return o(e)
case"MustacheStatement":return r(e)
default:return console.log("buildchildren => ",e.type),""}}).join(",")}function o(e){var a,o=e.selfClosing,i=e.tag,l=e.attributes,u=e.children
return"b.element({name: '".concat(i,"', selfClosing: ").concat(o,"},\n    {\n    attrs: [").concat((a=l,a.map(function(e){switch(e.value.type){case"TextNode":return"b.attr('".concat(e.name,"', ").concat(t(e.value),")")
case"MustacheStatement":return"b.attr('".concat(e.name,"', ").concat(r(e.value),")")
default:return console.log("buildAttributes => ",e.value.type),""}}).join(",")),"],\n    children: [").concat(n(u),"]\n    }\n  )")}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var i={textNode:t,elementNode:o,buildAST:function(e){return e.body.map(function(e){switch(e.type){case"TextNode":return t(e)
case"ElementNode":return o(e)
case"BlockStatement":return function(e){var t=e.path,a=e.program,r=e.params
return"b.program([\n      b.block(\n        b.path('".concat(t.original,"'),\n        [").concat(function(e){return e.map(function(e){return"b.path('".concat(e.original,"')")}).join(",")}(r),"],\n        b.hash([b.path('lskdf'),'laskjdf']),\n        b.blockItself([").concat(n(a.body),"])\n      ),\n    ])")}(e)
default:console.log("buildAST => ",e.type)}})}}
e.default=i}),define("ast-builder/config/environment",[],function(){try{var e="ast-builder/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),a={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(a,"__esModule",{value:!0}),a}catch(r){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("ast-builder/app").default.create({name:"ast-builder",version:"0.0.0+28093bce"})
