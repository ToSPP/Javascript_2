const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const app = new Vue({
  el: '#app',
  methods: {
    getJSON(src) {
      return fetch(src)
        .then(response => response.json())
        .catch(() => this.$refs.errorComp.setError());
    },
    postJSON(url, data) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .catch(() => this.$refs.errorComp.setError());
    },
    putJSON(url, data) {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .catch(() => this.$refs.errorComp.setError());
    },
  },
});