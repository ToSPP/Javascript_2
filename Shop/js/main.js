class ProductsList {
    constructor() {
        this.products = [];
        this.init();
    }

    init() {
        this.fetchProducts();
        this.render();
    }

    fetchProducts() {
        this.products = [
            {title: 'Notebook', price: 2000},
            {title: 'Mouse', price: 20},
            {title: 'Keyboard', price: 48},
            {title: 'Gamepad', price: 63},
            {title: 'Chair', price: 200},
        ];
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
        this.products.forEach(product => {
            const prod = new Product(product);
            block.insertAdjacentHTML('beforeend', prod.render());
        });
    }
}

class Product {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="product-item__desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} руб.</p>
                        <button class="product-item__btn-buy">Купить</button>
                    </div>
                </div>`;
    }
}

class CartItem {
    constructor(product, img = 'https://placehold.it/75x75') {
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="cart-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="cart-item__desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} руб.</p>
                        <button class="cart-item__btn btn-cancel">&#10006;</button>
                    </div>
                </div>`;
    }
}

class Cart {
    constructor() {
        this.products = [];
        this.init();
    }

    init() {
        this.fetchProducts();
        this.render();
    }

    static toggleCart() {
        document.querySelector('.cart').classList.toggle('cart_active');
    }

    static hideCart() {
        document.querySelector('.cart').classList.remove('cart_active');
    }

    addProduct(product) {
        // если уже добавлен изменить количество и общую стоимость
        // если нет - отрисовать
    }

    removeProduct(product) {
        // если в корзине больше, чем один продукт - изменить количество и общую ст-ть
        // если 1 продукт - удалить элемент
    }

    countTotalAmount() {
        // считает общую сумму корзины
        return this.products.reduce((acc, cur) => acc + cur.price, 0);
    }

    fetchProducts() {
        this.products = [
            {title: 'Notebook', price: 2000},
            {title: 'Chair', price: 200},
        ];
    }

    render() {
        const block = document.querySelector('.cart');
        const btnGoToCart = `<button class="btn-goToCart">Go To Cart</button>`;
        this.products.forEach(product => {
            const prod = new CartItem(product);
            block.insertAdjacentHTML('beforeend', prod.render());
        });
        block.insertAdjacentHTML('beforeend', btnGoToCart);
    }
}

let products = new ProductsList();
let cart = new Cart();