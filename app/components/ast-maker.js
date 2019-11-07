import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  code: computed(function() {
    return 'let a=1;'
  }),

  ast: computed('code', function() {
    return this.code.capitalize();
  })

});
