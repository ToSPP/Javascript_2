Vue.component('products', {
  data() {
    return {
      catalogUrl: 'catalogData.json',
      productsAll: [],
      filteredProducts: [],
      imgCatalog: 'https://placehold.it/200x150',
    }
  },
  methods: {
    filter(str) {
      const regexp = new RegExp(str, 'i');
      this.filteredProducts = this.productsAll.filter(product => regexp.test(product.product_name));
    },
  },
  template: `
    <div class="products">
      <product v-for="product in filteredProducts.length ? filteredProducts : productsAll"
               :key="product.id_product" 
               :product="product" 
               :img="imgCatalog"
      ></product>
    </div>`,
  mounted() {
    this.$parent.getJSON(`${API + this.catalogUrl}`)
      .then(data => {
        for (const obj of data) {
          this.productsAll.push(obj);
        }
      })
      .catch(() => this.$root.$refs.errorComp.setError('catalog'));
    this.$parent.getJSON('addProducts.json')
      .then(data => {
        for (const obj of data) {
          this.productsAll.push(obj);
        }
      })
      .catch(() => this.$root.$refs.errorComp.setError('catalog'));
  },
});

Vue.component('product', {
  props: ['product', 'img'],
  template: `
      <div class="product-item">
        <img :src="img" alt="Some img">
        <div class="product-item__desc">
          <h3>{{ product.product_name }}</h3>
          <p>{{ product.price }} руб.</p>
          <button class="product-item__btn-buy" @click="$root.$refs.cart.addProduct(product)">Купить</button>
        </div>
      </div>`,
});