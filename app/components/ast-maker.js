import Component from '@ember/component';
import { parse, print } from 'recast';

const _code = `let a = 1;`;
const _code1 = `/**
 ** Paste or drop some JavaScript here and explore
 ** the syntax tree created by chosen parser.
 ** You can use all the cool new features from ES6
 ** and even more. Enjoy!
 **/

let tips = [
  "Click on any AST node with a '+' to expand it",

  "Hovering over a node highlights the \
  corresponding part in the source code",

  "Shift click on an AST node expands the whole substree"
];

function printTips() {
   tips.forEach((tip, i) => console.log(tip));
}`;

export default Component.extend({

 code: _code,
  actions: {
    convert() {
    let ast = parse(this.get('code'));
    console.log(parse(this.get('code')));
      let _ast = '';
      ast.program.body.forEach(node => {
        if(node.type === 'VariableDeclaration') {
          let str = `
          j.variableDeclaration(
          "${node.kind}",
              [j.variableDeclarator(
              j.identifier(${node.declarations[0].id.name}),
                  j.bindExpression(null,j.memberExpression(j.thisExpression(),j.identifier('foo'),false))
                  )]);`;
          _ast += str;
        }

      });

      this.set('ast', _ast);

      this.set('output', print(ast).code);


    }
  }


});
