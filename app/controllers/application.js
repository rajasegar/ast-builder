import Controller from "@ember/controller";
import { computed } from "@ember/object";
import ENV from "ast-builder/config/environment";
import PARSERS from 'ast-builder/constants/parsers';

// Sample code to test
const jscode = `foo.bar('hello', 1)`;

const hbscode = `{{#common/accordion-component data-test-accordion as |accordion|}}
  block
{{/common/accordion-component}}`;

const modes = {
  Javascript: "javascript",
  Handlebars: "handlebars"
};

export default Controller.extend({
  language: "Javascript",
  parser: "babel",
  //parser: computed("language", function() {
    //return Object.keys(PARSERS[this.get("language")])[0];
  //}),
  parsers: computed("language", function() {
    return Object.keys(PARSERS[this.get("language")]);
  }),
  parserVersion: computed("parser", function() {
    let _lang = this.get('language');
    let _parsers = PARSERS[_lang];
    return _parsers[this.get("parser")].version;
  }),
  emberVersion: computed(function() {
    return ENV.pkg.devDependencies["ember-source"];
  }),
  nodeBuilderVersion: computed(function() {
    return ENV.pkg.dependencies["ast-node-builder"];
  }),
  mode: computed("language", function() {
    return modes[this.get("language")];
  }),
  sampleCode: computed("language", function() {
    if (this.get("language") === "Javascript") {
      return jscode;
    } else {
      return hbscode;
    }
  }),
  init() {
    this._super(...arguments);
    this.set("languages", Object.keys(PARSERS));
  },
});
