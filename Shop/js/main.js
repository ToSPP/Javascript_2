'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master';

class ProductsList {
  constructor() {
    this.goodsData = [];
    this.products = [];
    this.init();
  }

  init() {
    this._getGoodsData()
      .then(() => {
        this.render()
      });

  }

  _getGoodsData() {
    return fetch(`${API}/responses/catalogData.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.goodsData = [...data];
      })
      .catch((error) => console.log(error))
  }

  /**
   * Метод считает общую стоимость товаров каталога
   * @returns {int} Стоимость товаров
   */
  countProductsTotalPrice() {
    return this.products.reduce((acc, cur) => acc + cur.price, 0);
  }

  render() {
    const block = document.querySelector('.products');
    this.goodsData.forEach(product => {
      const prod = new Product(product);
      block.insertAdjacentHTML('beforeend', prod.render());
    });
  }
}

class Product {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.id_product = product.id_product;
    this.product_name = product.product_name;
    this.price = +product.price;
    this.img = img;
  }

  render() {
    return `<div class="product-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="product-item__desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} руб.</p>
                        <button class="product-item__btn-buy" data-id="${this.id_product}">Купить</button>
                    </div>
                </div>`;
  }
}

class CartItem {
  constructor(product, img = 'https://placehold.it/75x75') {
    this.id_product = product.id_product;
    this.product_name = product.product_name;
    this.price = +product.price;
    this.img = img;
    this.quantity = +product.quantity;
  }

  render() {
    return `<div class="cart-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="cart-item__desc">
                        <h3>${this.product_name}</h3>
                        <p>Цена: ${this.price} руб.</p>
                        <div class="cart-item__total">
                          <span class="cart-item__qty">${this.quantity}</span> шт. / 
                          <span class="cart-item__sum">${this.quantity * this.price}</span> руб.
                        </div>
                        <button class="cart-item__btn btn-cancel" data-id="${this.id_product}">&#10006;</button>
                    </div>
                </div>`;
  }
}

class Cart {
  constructor() {
    this.cartData = {};
    this.contents = [];
    this.amount = 0;
    this.countGoods = 0;
    this.init();
  }

  init() {
    this._getCartData()
      .then(() => {
        this.render();
      });
  }

  _getCartData() {
    return fetch(`${API}/responses/getBasket.json`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.cartData = data;
        this.amount = +this.cartData.amount;
        this.countGoods = +this.cartData.countGoods;
        this.contents = [...this.cartData.contents];
      })
      .catch(error => console.log(error));
  }

  static toggleDisplayOfCart(action = 'toggle') {
    switch (action) {
      case 'show':
        document.querySelector('.cart').classList.add('cart_active');
        break;
      case 'hide':
        document.querySelector('.cart').classList.remove('cart_active');
        break;
      case 'toggle':
        document.querySelector('.cart').classList.toggle('cart_active');
        break;
    }
  }

  addProduct(product) {
    // если уже добавлен изменить количество и общую стоимость
    // если нет - отрисовать
  }

  removeProduct(product) {
    // если в корзине больше, чем один продукт - изменить количество и общую ст-ть
    // если 1 продукт - удалить элемент
  }

  _countTotalAmount() {
    return this.contents.reduce((acc, cur) => acc + cur.price, 0);
  }

  setTotalAmount() {
    if (this.countGoods > 0) {
      document.querySelector('.cart-total_value').textContent = this._countTotalAmount();
    }
  }

  render() {
    const block = document.querySelector('.cart');

    this.contents.forEach(product => {
      const prod = new CartItem(product);
      block.insertAdjacentHTML('beforeend', prod.render());
    });

    if (this.countGoods > 0) {
      const totalElem
        = `<div class="cart-total">
           Итого: <span class="cart-total_value">${this.amount}</span> руб.
         </div>`;
      block.insertAdjacentHTML('beforeend', totalElem);
    }

    block.insertAdjacentHTML('beforeend', '<button class="btn-goToCart">Перейти в корзину</button>');
  }
}

let products = new ProductsList();
let cart = new Cart();