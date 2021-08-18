import Component from '@ember/component';
import recast from 'recast';
import etr from 'ember-template-recast';
import { buildAST, es6, glimmer as hbsBuilder } from 'ast-node-builder';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import recastBabel from 'recastBabel';
import recastBabylon from 'recastBabylon';

const j = recast.types.builders; // eslint-disable-line
const b = etr.builders; // eslint-disable-line

function filterAstNodes(key, value) {
  return ['loc', 'tokens'].includes(key) ? undefined : value;
}

export default Component.extend({
  customize: service(),
  theme: computed.reads('customize.theme'),
  parse: computed('parser', function () {
    let parse = recast.parse;
    let _parser = this.parser;
    switch (_parser) {
      case 'babylon':
        parse = recastBabylon.parse;
        break;
      case 'babel':
        parse = recastBabel.parse;
        break;

      case 'ember-template-recast':
        parse = etr.parse;
        break;
    }
    return parse;
  }),
  ast: computed('code', 'mode', 'parse', 'parser', function () {
    let parse = this.parse;
    let ast;
    try {
      ast = parse(this.code);
    } catch (error) {
      console.error(error); // eslint-disable-line
      ast = {};
    }
    return JSON.stringify(ast, filterAstNodes, 2);
  }),

  astBuilder: computed('ast', 'parser', function () {
    let _builder = buildAST;
    let _parser = this.parser;
    switch (_parser) {
      case 'babel':
        _builder = es6.buildAST;
        break;
      case 'ember-template-recast':
        _builder = hbsBuilder.buildAST;
        break;
    }
    return _builder;
  }),
  pseudoAst: computed('ast', 'astBuilder', 'parser', function () {
    let ast = JSON.parse(this.ast);
    let _astBuilder = this.astBuilder;
    let _pseudo = [];
    try {
      _pseudo = _astBuilder(ast);
    } catch (err) {
      console.error(err); // eslint-disable-line
      _pseudo = [];
    }
    return _pseudo;
  }),

  nodeApi: computed('pseudoAst', function () {
    let str = this.pseudoAst.join('\n//-----------------------\n');
    return recast.prettyPrint(recast.parse(str), { tabWidth: 2 }).code || '';
  }),

  print: computed('pseudoAst', 'mode', function () {
    let _print = recast.print;
    let _mode = this.mode;
    switch (_mode) {
      case 'handlebars':
        _print = etr.print;
        break;
    }
    return _print;
  }),

  output: computed('mode', 'parse', 'print', 'pseudoAst', function () {
    const sampleCode = '';
    let parse = this.parse;
    let print = this.print;
    const outputAst = parse(sampleCode);
    let output = '';

    if (this.mode === 'javascript') {
      // Check the manifested api is working fine
      this.pseudoAst.forEach((n) => outputAst.program.body.push(eval(n)));
      output = print(outputAst, { quote: 'single' }).code;
    } else {
      this.pseudoAst.forEach((n) => outputAst.body.push(eval(n)));

      output = print(outputAst, { quote: 'single' });
    }

    return output;
  }),

  init() {
    this._super(...arguments);
    this.set('jsonMode', { name: 'javascript', json: true });
    this.set('gutters', ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']);
  },
});
