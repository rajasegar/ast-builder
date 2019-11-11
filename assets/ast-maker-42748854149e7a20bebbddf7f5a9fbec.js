"use strict"
define("ast-maker/app",["exports","ast-maker/resolver","ember-load-initializers","ast-maker/config/environment"],function(e,t,a,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var i=Ember.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:t.default});(0,a.default)(i,r.default.modulePrefix)
var n=i
e.default=n}),define("ast-maker/components/ast-maker",["exports","recast","ast-maker/utils/codeshift-api","ast-maker/utils/recast-builders"],function(e,t,a,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var i=Ember.Component.extend({code:"let a = 1;\nimport { foo as bar } from 'lib';\n",jsonMode:{name:"javascript",json:!0},actions:{convert:function(){var e=(0,t.parse)(this.get("code"))
this.set("ast",JSON.stringify(e))
var i=(0,t.parse)("")
console.log((0,t.parse)(this.get("code")))
var n=e.program.body.map(function(e){switch(e.type){case"VariableDeclaration":return(0,a.createVariableDeclaration)(e)
case"ImportDeclaration":return(0,a.createImportDeclaration)(e)
default:return console.log(e.type),""}})
this.set("nodeApi",n.join("\n")),e.program.body.map(function(e){switch(e.type){case"VariableDeclaration":return r.default.buildVariableDeclaration(e)
case"ImportDeclaration":return r.default.buildImportDeclaration(e)}}).forEach(function(e){return i.program.body.push(e)})
var o=(0,t.print)(i,{quote:"single"}).code
this.set("output",o)}}})
e.default=i}),define("ast-maker/components/ivy-codemirror",["exports","ivy-codemirror/components/ivy-codemirror"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-maker/helpers/app-version",["exports","ast-maker/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,a){function r(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.default.APP.version,n=r.versionOnly||r.hideSha,o=r.shaOnly||r.hideVersion,l=null
return n&&(r.showExtended&&(l=i.match(a.versionExtendedRegExp)),l||(l=i.match(a.versionRegExp))),o&&(l=i.match(a.shaRegExp)),l?l[0]:i}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=r,e.default=void 0
var i=Ember.Helper.helper(r)
e.default=i}),define("ast-maker/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("ast-maker/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("ast-maker/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","ast-maker/config/environment"],function(e,t,a){var r,i
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a.default.APP&&(r=a.default.APP.name,i=a.default.APP.version)
var n={name:"App Version",initialize:(0,t.default)(r,i)}
e.default=n}),define("ast-maker/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=a}),define("ast-maker/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"ember-data",initialize:t.default}
e.default=r}),define("ast-maker/initializers/export-application-global",["exports","ast-maker/config/environment"],function(e,t){function a(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var a
if("undefined"!=typeof window)a=window
else if("undefined"!=typeof global)a=global
else{if("undefined"==typeof self)return
a=self}var r,i=t.default.exportApplicationGlobal
r="string"==typeof i?i:Ember.String.classify(t.default.modulePrefix),a[r]||(a[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete a[r]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=a,e.default=void 0
var r={name:"export-application-global",initialize:a}
e.default=r}),define("ast-maker/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a={name:"ember-data",initialize:t.default}
e.default=a}),define("ast-maker/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.default
e.default=a}),define("ast-maker/router",["exports","ast-maker/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
a.map(function(){})
var r=a
e.default=r}),define("ast-maker/routes/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({})
e.default=t}),define("ast-maker/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-maker/services/code-mirror",["exports","ivy-codemirror/services/code-mirror"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("ast-maker/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"VOC9EI3p",block:'{"symbols":[],"statements":[[7,"h1"],[9],[0,"ast-maker"],[10],[0,"\\n"],[1,[23,"outlet"],false],[0,"\\n\\n"]],"hasEval":false}',meta:{moduleName:"ast-maker/templates/application.hbs"}})
e.default=t}),define("ast-maker/templates/components/ast-maker",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"wjDP7VN8",block:'{"symbols":[],"statements":[[7,"button"],[11,"class","btn btn-primary"],[11,"type","button"],[9],[0,"Convert"],[3,"action",[[24,0,[]],"convert"]],[10],[0," \\n"],[7,"div"],[11,"class","grid-row"],[9],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options","valueUpdated"],[[25,["code"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript","ambiance"]]],[29,"action",[[24,0,[]],[29,"mut",[[25,["code"]]],null]],null]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["ast"]],[29,"hash",null,[["mode","theme","foldGutter"],[[25,["jsonMode"]],"ambiance",true]]]]]],false],[0,"\\n  "],[10],[0,"\\n  "],[7,"div"],[11,"class","grid-col"],[9],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["nodeApi"]],[29,"hash",null,[["lineNumbers","mode","theme","autoIndent"],[true,"javascript","ambiance",true]]]]]],false],[0,"\\n    "],[1,[29,"ivy-codemirror",null,[["value","options"],[[25,["output"]],[29,"hash",null,[["lineNumbers","mode","theme"],[true,"javascript","ambiance"]]]]]],false],[0,"\\n  "],[10],[0,"\\n"],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-maker/templates/components/ast-maker.hbs"}})
e.default=t}),define("ast-maker/templates/index",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"06+3ClRY",block:'{"symbols":[],"statements":[[5,"ast-maker",[],[[],[]],{"statements":[],"parameters":[]}],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"ast-maker/templates/index.hbs"}})
e.default=t}),define("ast-maker/utils/codeshift-api",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.createVariableDeclaration=function(e){var t=e.kind,a=e.declarations[0],r=a.id,i=a.init
return"\n          j.variableDeclaration(\n          '".concat(t,"',\n              [j.variableDeclarator(\n              j.identifier('").concat(r.name,"'),\n                j.").concat(i.type,"(").concat(i.value,")\n                  )]);")},e.createImportDeclaration=function(e){var t=e.source,a=e.specifiers[0],r=a.imported,i=a.local
return"\n          j.importDeclaration(\n           [j.importSpecifier(j.identifier('".concat(r.name,"'),j.identifier('").concat(i.name,"'))],\n    j.literal('").concat(t.value,"')\n                  );")},e.default=function(){return!0}}),define("ast-maker/utils/recast-builders",["exports","recast"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var a=t.types.builders
var r={buildVariableDeclaration:function(e){var t=e.kind,r=e.declarations[0],i=r.id,n=r.init
return a.variableDeclaration(t,[a.variableDeclarator(a.identifier(i.name),a.literal(n.value))])},buildImportDeclaration:function(e){var t=e.source,r=e.specifiers[0],i=r.imported,n=r.local
return a.importDeclaration([a.importSpecifier(a.identifier(i.name),a.identifier(n.name))],a.literal(t.value))}}
e.default=r}),define("ast-maker/config/environment",[],function(){try{var e="ast-maker/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),a={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(a,"__esModule",{value:!0}),a}catch(r){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("ast-maker/app").default.create({name:"ast-maker",version:"0.0.0+12ae676f"})
