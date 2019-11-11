import Component from '@ember/component';
import { parse, print } from 'recast';
import { 
  createVariableDeclaration,
  createImportDeclaration
} from '../utils/codeshift-api';

import builders from '../utils/recast-builders';

const _code = `let a = 1;
import { foo as bar } from 'lib';
`;

export default Component.extend({

  code: _code,
  jsonMode: { name: "javascript", json: true },
  actions: {
    convert() {
      let ast = parse(this.get('code'));
      this.set('ast', JSON.stringify(ast));
      const sampleCode = '';
      const outputAst = parse(sampleCode);  
      console.log(parse(this.get('code')));
      let _ast = ast.program.body.map(node => {

        switch(node.type) {
          case 'VariableDeclaration':
            return createVariableDeclaration(node);

          case 'ImportDeclaration':
            return createImportDeclaration(node);

          default:
            console.log(node.type); // eslint-disable-line
            return '';
        }

      });

      this.set('nodeApi', _ast.join('\n'));
      let _outputNodes = ast.program.body.map(node => {
        switch(node.type) {
          case 'VariableDeclaration':
            return builders.buildVariableDeclaration(node);

          case 'ImportDeclaration':
            return builders.buildImportDeclaration(node);
        }
      });

      _outputNodes.forEach(n => outputAst.program.body.push(n));

      const output = print(outputAst, { quote: 'single'}).code;

      this.set('output', output);

    }
  }

});
