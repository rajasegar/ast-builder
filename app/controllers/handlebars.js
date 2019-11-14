import Controller from '@ember/controller';

export default Controller.extend({
  darkMode: false,

  actions: {
    toggleDarkMode() {
      let _dm = this.get('darkMode');
      this.set('darkMode', !_dm);
    }
  }
});
