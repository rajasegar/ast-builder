import Component from '@ember/component';
import { computed } from '@ember/object';
import { parse, print, builders } from 'ember-template-recast';
import { inject as service } from '@ember/service';
import etr from '../utils/template-recast-builders';
const b = builders; // eslint-disable-line

let _code = `<BsButton @onClick={{action "submit"}}>
Button
  </BsButton>

<BsButtonGroup @value={{buttonGroupValue}} @type="checkbox" @onChange={{action (mut buttonGroupValue)}} as |bg|>
          <bg.button @value={{1}}>1</bg.button>
          <bg.button @value={{2}}>2</bg.button>
          <bg.button @value={{3}}>3</bg.button>
        </BsButtonGroup>
 <MyComponent @prop1={{true}} @prop2={{false}} />
 <XFoo @data-foo={{true}} />
        <XFoo @data-test-selector={{true}} />
        <XFoo @data-test-selector={{post.id}} />
        <XFoo @label="hi" @data-test-selector={{true}} />
  `;

_code = `
{{#common/accordion-component data-test-accordion as |accordion|}}
          block
        {{/common/accordion-component}}
`;

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
    return etr.buildAST(ast);
  }),

  nodeApi: computed('code', function() {
    let ast = parse(this.get('code'));
        return etr.buildAST(ast).join('\n//-----------------------\n');
  }),

  output: computed('code', function() {
    const sampleCode = '';
    const outputAst = parse(sampleCode);  

    // Check the manifested api is working fine
    let ast = parse(this.get('code'));
    etr.buildAST(ast).forEach(n => { 
      outputAst.body.push(eval(n));
    });

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
