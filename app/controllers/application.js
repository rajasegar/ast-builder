import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ENV from 'ast-builder/config/environment';

const PARSERS = {
  'Javascript': ['recast', 'babylon7'],
  'Handlebars': ['handlebars', 'glimmer', 'ember-template-recast']
};

// Sample code to test
const jscode = `
for (var i = 0; i < 10; i++) {
  if (i === 3) {
    continue;
  }
  text = text + i;
}
`;

const hbscode = `
{{#common/accordion-component data-test-accordion as |accordion|}}
          block
        {{/common/accordion-component}}
`;

const modes = {
  "Javascript": "javascript",
  "Handlebars": "handlebars",
};

export default Controller.extend({
  customize: service(),
  language: 'Javascript',
  parser: computed('language', function() {
    return PARSERS[this.get('language')][0];
  }),
  parsers: computed('language', function() {
    return PARSERS[this.get('language')];
  }),
  parserInfo: computed('parser', function() {
    return ENV.pkg.dependencies[this.get('parser')];
  }),
  emberVersion: computed(function() {
    return ENV.pkg.devDependencies['ember-source'];
  }),
  nodeBuilderVersion: computed(function() {
    return ENV.pkg.dependencies['ast-node-builder'];
  }),
  mode: computed('language', function() {
   return modes[this.get('language')]; 
  }),
  sampleCode: computed('language', function() {
    if(this.get('language') === 'Javascript') {
      return jscode; 
    } else {
      return hbscode;
    }
  }),
  init() {
    this._super(...arguments);
    this.set('languages', Object.keys(PARSERS));
  },

  actions: {
    toggleDarkMode() {
      this.customize.toggleDarkMode();
    }
  }
});
