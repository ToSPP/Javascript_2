const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const app = new Vue({
  el: '#app',
  methods: {
    getJSON(src) {
      return fetch(src)
        .then(response => response.json())
        .catch(() => this.$root.$refs.errorComp.setError());
    },
  },
});