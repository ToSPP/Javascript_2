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
                        <button class="product-item__btn-buy" data-id="${this.id_product}" 
                                data-name="${this.product_name}" data-price="${this.price}">Купить</button>
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
    return `<div class="cart-item" data-id="${this.id_product}">
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
    // Найдем индекс продукта, если он уже присутствует в корзине
    const idx = this.contents.findIndex(el => el.id_product === product.id_product);

    if (!!~idx) {
      // Если такой продукт уже есть в корзине

      // Увеличиваем количество
      const qty = ++this.contents[idx].quantity;
      // Увеличиваем общую сумму корзины
      this.amount += this.contents[idx].price;
      // Находим нужный элемент
      const element = document.querySelector(`.cart__items [data-id='${product.id_product}']`);
      // Присвоим новое количество
      element.querySelector('.cart-item__qty').textContent = qty;
      // Присвоим новую сумму
      element.querySelector('.cart-item__sum').textContent = qty * this.contents[idx].price;
    } else {
      // Иначе - создаем новый элемент корзины и добавляем его
      const prod = new CartItem(product);
      this.contents.push(prod);
      this.amount += prod.price;
      // Если корзина была пуста, то добавим "Итого"
      if (0 >= this.countGoods++) {
        this._renderCartTotal();
      }
      // Добавим элемент в DOM
      document.querySelector('.cart__items').insertAdjacentHTML('beforeend', prod.render());
    }
    // Отобразим общую сумму
    this.setTotalAmount();
  }

  removeProduct(product) {
    // Найдем индекс продукта в массиве
    const idx = this.contents.findIndex(el => el.id_product === product.id_product);

    if (!!~idx) {
      // Находим нужный элемент
      const element = document.querySelector(`.cart__items [data-id='${product.id_product}']`);

      if (this.contents[idx].quantity > 1) {
        // Если в корзине количество продукта больше, чем 1

        // Уменьшаем количество
        const qty = --this.contents[idx].quantity;
        // Уменьшаем общую сумму корзины
        this.amount -= this.contents[idx].price;
        // Присвоим новое количество
        element.querySelector('.cart-item__qty').textContent = qty;
        // Присвоим новую сумму
        element.querySelector('.cart-item__sum').textContent = qty * this.contents[idx].price;
      } else {
        // Иначе - уменьшаем количество продуктов в корзине
        this.countGoods--;
        // Уменьшаем общую сумму корзины
        this.amount -= this.contents[idx].price;
        // Удаляем элемент из DOM
        element.remove();
        // Удаляем продукт из общего массива
        this.contents.splice(idx, 1);
      }
    }

    if (0 >= this.countGoods) {
      // Если в корзине нет продуктов - удалим общую сумму
      document.querySelector('.cart-total').remove();
    } else {
      // Отобразим общую сумму
      this.setTotalAmount();
    }
  }

  setTotalAmount() {
    if (this.countGoods > 0) {
      document.querySelector('.cart-total_value').textContent = this.amount;
    }
  }

  render() {
    const cart = document.querySelector('.cart');
    const cartItemsElem = document.querySelector('.cart__items');

    this.contents.forEach(product => {
      const prod = new CartItem(product);
      cartItemsElem.insertAdjacentHTML('beforeend', prod.render());
    });

    cart.insertAdjacentHTML('beforeend', '<button class="btn-goToCart">Перейти в корзину</button>');
    this._renderCartTotal();
  }

  _renderCartTotal() {
    const btn = document.querySelector('.btn-goToCart');
    if (this.countGoods > 0) {
      const totalElem
        = `<div class="cart-total">
           Итого: <span class="cart-total_value">${this.amount}</span> руб.
         </div>`;
      // Вставляем перед кнопкой "Перейти в корзину"
      btn.insertAdjacentHTML('beforebegin', totalElem);
    }
  }
}

let products = new ProductsList();
let cart = new Cart();