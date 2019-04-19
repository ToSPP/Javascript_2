Vue.component('error-comp', {
  data() {
    return {
      isError: false,
      errors: {
        cart: 'Данные корзины не получены.',
        catalog: 'Данные каталога не получены.',
      },
      error_msg: '',
    }
  },
  template: `
    <transition name="fade">
      <div v-if="isError" class="error-msg">
        Не удалось подключиться к серверу.<br>{{ error_msg }}
      </div>
    </transition>`,
  methods: {
    setError(comp) {
      this.isError = true;
      if (this.errors[comp]) {
        this.error_msg = this.errors[comp];
      }
    },
    hideBlock() {
      setTimeout(() => this.isError = false, 3000);
    },
  },
  updated() {
    this.hideBlock();
  },
});