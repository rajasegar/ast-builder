import Component from "@ember/component";
import recast from "recast";
import etr from "ember-template-recast";
import { buildAST } from "ast-node-builder";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import hbsBuilder from "../utils/template-recast-builders";
import recastBabel from "recastBabel";
import recastBabylon from "recastBabylon";

const j = recast.types.builders; // eslint-disable-line
const b = etr.builders; // eslint-disable-line

export default Component.extend({
  customize: service(),
  //code: _code,
  theme: computed.reads("customize.theme"),
  parse: computed("parser", function() {
    let parse = recast.parse;
    let _parser = this.get("parser");
    switch (_parser) {
      case "babylon":
        parse = recastBabylon.parse;
        break;
      case "babel":
        parse = recastBabel.parse;
        break;

      case "ember-template-recast":
        parse = etr.parse;
        break;
    }
    return parse;
  }),
  ast: computed("code", "mode", "parser", function() {
    let parse = this.get("parse");
    let ast;
    try {
      ast = parse(this.get("code"));
    } catch (error) {
      console.error(error); // eslint-disable-line
      ast = {};
    }
    return JSON.stringify(ast, null, 2);
  }),

  astBuilder: computed("ast", "mode", function() {
    let _builder = buildAST;
    let _mode = this.get("mode");
    switch (_mode) {
      case "handlebars":
        _builder = hbsBuilder.buildAST;
        break;
    }
    return _builder;
  }),
  pseudoAst: computed("ast", "parser", function() {
    let ast = JSON.parse(this.get("ast"));
    let _astBuilder = this.get("astBuilder");
    let _pseudo = [];
    try {
      _pseudo = _astBuilder(ast);
    } catch (err) {
      console.error(err); // eslint-disable-line
      _pseudo = [];
    }
    return _pseudo;
  }),

  nodeApi: computed("pseudoAst", function() {
    let str = this.get("pseudoAst").join("\n//-----------------------\n");
    return recast.prettyPrint(recast.parse(str), { tabWidth: 2 }).code || "";
  }),

  print: computed('pseudoAst', 'mode', function() {
    let _print = recast.print;
    let _mode = this.get('mode');
    switch(_mode) {
      case 'handlebars':
	_print = etr.print;
	break;
    }
    return _print;
  }),

  output: computed("pseudoAst", function() {
    const sampleCode = "";
    let parse = this.get("parse");
    let print = this.get("print");
    const outputAst = parse(sampleCode);
    let output = "";

    if (this.get("mode") === "javascript") {
      // Check the manifested api is working fine
      this.get("pseudoAst").forEach(n => outputAst.program.body.push(eval(n)));
      output = print(outputAst, { quote: "single" }).code;
    } else {
      this.get("pseudoAst").forEach(n => outputAst.body.push(eval(n)));

      output = print(outputAst, { quote: "single" });
    }

    return output;
  }),

  init() {
    this._super(...arguments);
    this.set("jsonMode", { name: "javascript", json: true });
    this.set("gutters", ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
  }
});
