Vue.component('cart', {
  data() {
    return {
      cartUrl: 'getBasket.json',
      cartList: [],
      isVisibleCart: false,
      imgCart: 'https://placehold.it/75x75',
    }
  },
  template: `
    <div>
      <button class="header__btn btn-cart" type="button"
              @click="isVisibleCart = !isVisibleCart">Корзина</button>
      <transition name="fade">
        <div v-show="isVisibleCart" class="cart">
          <div class="cart__items">
            <cart-item v-for="product in cartList" 
                       :key="product.id_product"
                       :product="product"
                       :img="imgCart"
                       @remove="removeProduct"
            >
            </cart-item>
          </div>
          <div class="cart-total" v-if="cartList.length">
            Итого: <span class="cart-total_value">{{ getTotalPrice() }}</span> руб.
          </div>
          <div class="cart-empty" v-else>Корзина пуста</div>
        </div>
      </transition>
    </div>`,
  methods: {
    addProduct(product) {
      this.$parent.getJSON(`${API}addToBasket.json`)
        .then(data => {
          if (data.result) {
            const item = this.cartList.find(el => el.id_product === product.id_product);

            if (!!item) {
              item.quantity++;
            } else {
              const newProd = Object.assign({quantity: 1}, product);
              this.cartList.push(newProd);
            }
          }
        })
        .catch(error => console.log(error));
    },
    removeProduct(product) {
      this.$parent.getJSON(`${API}deleteFromBasket.json`)
        .then(data => {
          if (data.result) {
            product.quantity > 1 ? product.quantity-- : this.cartList.splice(this.cartList.indexOf(product), 1);
          }
        })
        .catch(error => console.log(error));;
    },
    getTotalPrice() {
      return this.cartList.reduce((sum, product) => sum + product.quantity * product.price, 0);
    },
  },
  mounted() {
    this.$parent.getJSON(`${API + this.cartUrl}`)
      .then(data => {
        for (const obj of data.contents) {
          this.cartList.push(obj);
        }
      })
      .catch(() => this.$root.$refs.errorComp.setError('cart'));
  },
});

Vue.component('cart-item', {
  props: ['product', 'img'],
  template: `
    <div class="cart-item">
      <img :src="img" alt="Some img">
      <div class="cart-item__desc">
        <h3>{{ product.product_name }}</h3>
        <p>Цена: {{ product.price }} руб.</p>
        <div class="cart-item__total">
          <span class="cart-item__qty">{{ product.quantity }}</span> шт. /
          <span class="cart-item__sum">{{ product.quantity * product.price }}</span> руб.
        </div>
        <button class="cart-item__btn btn-cancel" @click="$emit('remove', product)">&#10006;</button>
      </div>
    </div>
  `,
});