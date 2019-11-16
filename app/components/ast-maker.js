import Component from '@ember/component';
import { parse, print, types } from 'recast';
import jsc from '../utils/codeshift-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const j = types.builders; // eslint-disable-line

// Sample code to test
const _code1 = `let a = 1;
let b = 'hello';
let c = false;
const d = 2;
var e = true;
import { foo as bar } from 'lib';
hello(1, 'world', true, a);
this.hello(1, 'world', true, a);
hello.world(1, 'foo', true, a);
foo.bar.baz();
foo.bar.bax.baz(1, 'foo', true, a);
if(a === 1) {
console.log('true');
foo.bar();
} else {
console.log('false');
foo.baz();
}

let a = {
name: 'raja',
age: 35,
action: hello()
};

export default class MyComponent extends ReactComponent {}
class MyComponent extends ReactComponent {
  constructor(a,b) {
    this.a = a;
    this.b = b;
  }

  hello(x,y) {
    console.log(x,y);
  }
}

function init() {
this._super(...arguments);
}

module('Unit | Utility | codeshift-api', function() {

  let a = 1;

  test('it works', function(assert) {
    let result = codeshiftApi();
    assert.ok(result);
  });
});

let f = [1, "hello", true, 0, -1];
let a = () => { console.log('hello') }
let a = () => console.log('hello')
let a = () => log('hello')
let a = () => 2

let { name, age } = a; 
let a = [1,2,3];
let [x,y,z] = a;
this.a = a;
this.b = 10;

export default class MyComponent extends ReactComponent {
  constructor(a,b) {
    this.a = a;
    this.b = b;
  }

  hello(x,y) {
    console.log(x,y);
  }
}

expect(find(cfPage.fieldPositionOne).textContent.trim()).to.be.contains(fieldOrder[0]);
`;

const _code = `
switch(a) {
  case "hello":
    console.log("hello");
    break;
  default:
    break;
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

    return jsc.buildAST(ast);

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
