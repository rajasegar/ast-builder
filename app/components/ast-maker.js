import Component from '@ember/component';
import { parse, print, types } from 'recast';
import jsc from '../utils/codeshift-api';

const j = types.builders; // eslint-disable-line

// Sample code to test
const _code = `let a = 1;
import { foo as bar } from 'lib';
hello(1, 'world', true, a);
this.hello(1, 'world', true, a);
hello.world(1, 'foo', true, a);
foo.bar.baz();
foo.bar.bax.baz(1, 'foo', true, a);
`;

export default Component.extend({

  code: _code,
  init() {
    this._super(...arguments);
    this.set('jsonMode',{ name: "javascript", json: true });
  },
  actions: {
    convert() {
      let ast = parse(this.get('code'));
      this.set('ast', JSON.stringify(ast));
      const sampleCode = '';
      const outputAst = parse(sampleCode);  
      console.log(ast.program.body);

      // Build the jscodeshift api 
      let _ast = ast.program.body.map(node => {

        switch(node.type) {
          case 'VariableDeclaration':
            return jsc.createVariableDeclaration(node);

          case 'ImportDeclaration':
            return jsc.createImportDeclaration(node);

          case 'ExpressionStatement':
            return jsc.createExpressionStatement(node);

          default:
            console.log(node.type); // eslint-disable-line
            return '';
        }

      });

      this.set('nodeApi', _ast.join('\n//-----------------------\n'));

      // Check the manifested api is working fine
      _ast.forEach(n => outputAst.program.body.push(eval(n)));

      const output = print(outputAst, { quote: 'single'}).code;

      this.set('output', output);

    }
  }

});
