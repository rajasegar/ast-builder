import Component from '@ember/component';
import { parse, print, types } from 'recast';
import { buildAST } from 'ast-node-builder';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const j = types.builders; // eslint-disable-line

// Sample code to test
const _code = `
for (var i = 0; i < 10; i++) {
  if (i === 3) {
    continue;
  }
  text = text + i;
}
`;

export default Component.extend({

  customize: service(),
  code: _code,
  theme: computed.reads('customize.theme'),
  ast: computed('code', function() {
    let ast = parse(this.get('code'));
    console.log(ast.program.body); // eslint-disable-line
    return JSON.stringify(ast);
  }),

  pseudoAst: computed('code', function() {

    let ast = parse(this.get('code'));

    return buildAST(ast);

  }),

  nodeApi: computed('pseudoAst', function() {
        return this.get('pseudoAst').join('\n//-----------------------\n');
  }),

  output: computed('pseudoAst', function() {
    const sampleCode = '';
    const outputAst = parse(sampleCode);  

    // Check the manifested api is working fine
    this.get('pseudoAst').forEach(n => outputAst.program.body.push(eval(n)));

    const output = print(outputAst, { quote: 'single'}).code;

    return  output;
  }),

  init() {
    this._super(...arguments);
    this.set('jsonMode',{ name: "javascript", json: true });
  }

});
