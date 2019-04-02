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
            {title: 'Notebook', price: 2000, img: 'https://placehold.it/200x150'},
            {title: 'Mouse', price: 20, img: 'https://placehold.it/200x150'},
            {title: 'Keyboard', price: 48, img: 'https://placehold.it/200x150'},
            {title: 'Gamepad', price: 63, img: 'https://placehold.it/200x150'},
            {title: 'Chair', price: 200, img: 'https://placehold.it/200x150'},
        ];
    }

    /**
     * Метод считает общую стоимость товаров каталога
     * @returns {int} Стоимость товаров
     */
    countProductsTotalCost() {
        return this.products.reduce((acc, cur) => {
            return acc + cur.price;
        }, 0);
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
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.img = product.img;
        this._classes();
    }
    _classes() {
        this.classes = {
            itemClass: 'product-item',
            descClass: 'product-item__desc',
            btnClass: 'product-item__btn-buy',
            btnTitle: 'Купить',
        };
    }

    render() {
        return `<div class="${this.classes.itemClass}">
                    <img src="${this.img}" alt="Some img">
                    <div class="${this.classes.descClass}">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button class="${this.classes.btnClass}">${this.classes.btnTitle}</button>
                    </div>
                </div>`;
    }
}

class CartItem extends Product {
    _classes() {
        this.classes = {
            itemClass: 'cart-item',
            descClass: 'cart-item__desc',
            btnClass: 'cart-item__btn btn-cancel',
            btnTitle: '&#10006;',
        };
    }
}

class Cart extends ProductsList {
    fetchProducts() {
        this.products = [
            {title: 'Notebook', price: 2000, img: 'https://placehold.it/75x75'},
            {title: 'Chair', price: 200, img: 'https://placehold.it/75x75'},
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