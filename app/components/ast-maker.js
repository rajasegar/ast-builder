import Component from "@ember/component";
import recast from "recast";
import etr from "ember-template-recast";
import { buildAST } from "ast-node-builder";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import hbsBuilder from "../utils/template-recast-builders";
import recastBabel from "recastBabel";

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
      case "babylon7":
        parse = recastBabel.parse;
        break;

      case "handlebars":
      case "glimmer":
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
      console.error(error);
      ast = {};
    }
    return JSON.stringify(ast);
  }),
  pseudoAst: computed("ast", "parser", function() {
    let ast = JSON.parse(this.get("ast"));
    let astBuilder =
      this.get("mode") === "javascript" ? buildAST : hbsBuilder.buildAST;

    return ast && ast.program ? astBuilder(ast) : [];
  }),

  nodeApi: computed("pseudoAst", function() {
    let str = this.get("pseudoAst").join("\n//-----------------------\n");
    return recast.prettyPrint(recast.parse(str)).code || "";
  }),

  output: computed("pseudoAst", function() {
    const sampleCode = "";
    let parse = this.get("mode") === "javascript" ? recast.parse : etr.parse;
    let print = this.get("mode") === "javascript" ? recast.print : etr.print;
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
  }
});
