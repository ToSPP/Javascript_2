Vue.component('error-comp', {
  data() {
    return {
      isError: false,
      error: '',
    }
  },
  template: `
    <transition name="fade">
      <div v-if="isError" class="error-msg">
        Не удалось подключиться к серверу.<br>{{ error }}
      </div>
    </transition>`,
  methods: {
    hideBlock() {
      setTimeout(() => this.isError = false, 3000);
    },
  },
  updated() {
    this.hideBlock();
  },
});