'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: 'catalogData.json',
    cartUrl: 'getBasket.json',
    productsAll: [], // все объекты товаров (каталог)
    filteredProducts: [], // отфильтрованные товары
    cartList: [], // объекты товаров (корзина)
    isVisibleCart: false,
    imgCatalog: 'https://placehold.it/200x150', // заглушка картинки в каталоге
    imgCart: 'https://placehold.it/75x75', // заглушка картинки в корзине
    filterText: '', // текст для фильтра
  },
  methods: {
    getJSON(src) {
      return fetch(src)
        .then(response => response.json())
        .catch(error => console.log(error));
    },
    addProduct(product) {
      this.getJSON(`${API}addToBasket.json`)
        .then(result => {
          if (!!result) {
            const item = this.cartList.find(el => el.id_product === product.id_product);

            if (!!item) {
              item.quantity++;
            } else {
              this.cartList.push({
                id_product: product.id_product,
                product_name: product.product_name,
                price: product.price,
                quantity: 1,
              });
            }
          }
        });
    }, // добавляем продукт в корзину
    removeProduct(product) {
      this.getJSON(`${API}deleteFromBasket.json`)
        .then(result => {
          if (!!result) {
            const item = this.cartList.find(el => el.id_product === product.id_product);

            if (!!item) {
              item.quantity > 1 ? item.quantity-- : this.cartList.splice(this.cartList.indexOf(item), 1);
            }
          }
        });
    }, // удаляем единицу продукта
    getTotalPrice() {
      return this.cartList.reduce((sum, product) => sum + product.quantity * product.price, 0);
    }, // получаем общую сумму корзины
    filter() {
      const regexp = new RegExp(this.filterText, 'i');
      this.filteredProducts = this.productsAll.filter(product => regexp.test(product.product_name));
    },
  },

  mounted() {
    this.getJSON(`${API + this.catalogUrl}`)
      .then(data => {
        for (const obj of data) {
          this.productsAll.push(obj);
        }
      });
    this.getJSON('addProducts.json')
      .then(data => {
        for (const obj of data) {
          this.productsAll.push(obj);
        }
      });
    this.getJSON(`${API + this.cartUrl}`)
      .then(data => {
        for (const obj of data.contents) {
          this.cartList.push(obj);
        }
      });
  },
});