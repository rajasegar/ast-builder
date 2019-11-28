import Component from '@ember/component';
import recast from 'recast';
import etr from 'ember-template-recast';
import { buildAST } from 'ast-node-builder';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import hbsBuilder from '../utils/template-recast-builders';

const j = recast.types.builders; // eslint-disable-line
const b = etr.builders; // eslint-disable-line

export default Component.extend({

  customize: service(),
  //code: _code,
  theme: computed.reads('customize.theme'),
  ast: computed('code', 'mode', function() {
    let parse = this.get('mode') === 'javascript' ? recast.parse : etr.parse;
    let ast = parse(this.get('code'));
    return JSON.stringify(ast);
  }),

  pseudoAst: computed('code', function() {

    let parse = this.get('mode') === 'javascript' ? recast.parse : etr.parse;
    let ast = parse(this.get('code'));
    let astBuilder = this.get('mode') === 'javascript' ? buildAST : hbsBuilder.buildAST;

    return astBuilder(ast);

  }),

  nodeApi: computed('pseudoAst', function() {
        return this.get('pseudoAst').join('\n//-----------------------\n');
  }),

  output: computed('pseudoAst', function() {
    const sampleCode = '';
    let parse = this.get('mode') === 'javascript' ? recast.parse : etr.parse;
    let print = this.get('mode') === 'javascript' ? recast.print : etr.print;
    const outputAst = parse(sampleCode);  
    let output = '';

    if(this.get('mode') === 'javascript') {
    // Check the manifested api is working fine
    this.get('pseudoAst').forEach(n => outputAst.program.body.push(eval(n)));
    output = print(outputAst, { quote: 'single'}).code;
    } else {

    this.get('pseudoAst').forEach(n => outputAst.body.push(eval(n)));
    
    output = print(outputAst, { quote: 'single'});

    }

    return  output;
  }),

  init() {
    this._super(...arguments);
    this.set('jsonMode',{ name: "javascript", json: true });
  }

});
