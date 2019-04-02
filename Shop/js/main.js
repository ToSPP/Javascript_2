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
    render() {
        const block = document.querySelector('.products');
        this.products.forEach(product => {
            const prod = new Product(product);
            block.insertAdjacentHTML('beforeend', prod.render())
        })
    }
}

class Product {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.title;
        this.price = product.price;
        this.img = img
    }
    render(){
        return `<div class="product-item">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button class="btn-buy">Купить</button>
                    </div>
                </div>`
    }
}


let products = new ProductsList();