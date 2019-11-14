import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  customize: service(),
  actions: {
    toggleDarkMode() {
      this.customize.toggleDarkMode();
    }
  }
});
