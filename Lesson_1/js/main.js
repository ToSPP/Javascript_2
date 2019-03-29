const products = [
    {title: 'Notebook', price: 2000},
    {title: 'Mouse', price: 20},
    {title: 'Keyboard', price: 48},
    {title: 'Gamepad', price: 63},
    {title: 'Chair', price: 200},
];


const renderProduct = (title = 'Product', price = 100) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
            </div>`
};

const renderPage = list => {
    // const productList = list.map(item => renderProduct(item.title, item.price));

    // Метод map() возвращает новый массив. Однако свойство элемента innerHTML должно принимать строку, а не массив,
    // таким образом новый массив будет приведен к строке методом Object.prototype.toString(),
    // который возвращает строку, содержащую каждый элемент массива, разделённый запятыми,
    // отсюда и появление артефактов в коде HTML в виде "запятых".
    // Используя метод join() мы переопределяем поведение приведения массива к строке.
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
};

renderPage(products);