import Component from '@ember/component';
import { computed } from '@ember/object';
import { parse, print, builders } from 'ember-template-recast';
import { inject as service } from '@ember/service';
import glimmer from '../utils/template-recast-builders';
const b = builders; // eslint-disable-line

const _code = `hello
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>`;
export default Component.extend({
  customize: service(),
  code: _code,

  theme: computed.reads('customize.theme'),
  ast: computed('code', function() {
    let ast = parse(this.get('code'));
    console.log(ast.body); // eslint-disable-line
    return JSON.stringify(ast);
  }),

  pseudoAst: computed('code', function() {

    let ast = parse(this.get('code'));
    return glimmer.buildAST(ast);

  }),

  nodeApi: computed('pseudoAst', function() {
        return this.get('pseudoAst').join('\n//-----------------------\n');
  }),

  output: computed('pseudoAst', function() {
    const sampleCode = '';
    const outputAst = parse(sampleCode);  

    // Check the manifested api is working fine
    this.get('pseudoAst').forEach(n => outputAst.body.push(eval(n)));

    const output = print(outputAst, { quote: 'single'});

    return  output;
  }),

  init() {
    this._super(...arguments);
    this.set('jsonMode',{ name: "javascript", json: true });
    this.set('hbsMode',{ name: "handlebars", base: "text/html" });
    this.set('gutters', ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
    this.set('extraKeys',   {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }});
  }

});
