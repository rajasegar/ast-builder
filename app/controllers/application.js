import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ENV from 'ast-builder/config/environment';
import PARSERS from 'ast-builder/constants/parsers';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// Sample code to test
const jscode = `foo.bar('hello', 1)`;

const hbscode = `{{#common/accordion-component data-test-accordion as |accordion|}}
  block
{{/common/accordion-component}}`;

const modes = {
  Javascript: 'javascript',
  Handlebars: 'handlebars',
};

export default class ApplicationController extends Controller {
  @tracked language = 'Javascript';
  @tracked parser = 'babel';

  get parsers() {
    return Object.keys(PARSERS[this.language]);
  }

  get parserVersion() {
    let _lang = this.language;
    let _parsers = PARSERS[_lang];
    return _parsers[this.parser].version;
  }

  get emberVersion() {
    debugger;
    return ENV.pkg.devDependencies['ember-source'];
  }

  get nodeBuilderVersion() {
    return ENV.pkg.dependencies['ast-node-builder'];
  }

  get mode() {
    return modes[this.language];
  }

  get sampleCode() {
    if (this.language === 'Javascript') {
      return jscode;
    } else {
      return hbscode;
    }
  }

  constructor() {
    super(...arguments);
    this.languages = Object.keys(PARSERS);
  }

  @action updateLanguage(lang) {
    this.language = lang;
  }

  @action updateParser(parser) {
    this.parser = parser;
  }
}
