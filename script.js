//basket functionality

const products = document.querySelectorAll('#product-name');
const buttons = document.querySelectorAll('button');
let productsBasket = new Map();
const basket = document.querySelector('.basket-list');
const map = localStorage.getItem('myMap');
const images = document.querySelectorAll('.product img');
const add = document.querySelectorAll('add');
const remove = document.querySelectorAll('remove');

if (map) {
    productsBasket = new Map(JSON.parse(localStorage.myMap));    
}


buttons.forEach((element, index) => {
    element.addEventListener('click', (e) => {
    
        addProduct(e, index);
        clearBasket();
        addToBasket(productsBasket);
        save();
        
        
     
    })
});


function addProduct(e, index) {
    console.log(index);
    let productName = products[index].textContent;
    if (!productsBasket.has(productName)) {
        productsBasket.set(productName, { 'quantity': 1, 'value': e.target.value, 'index': index });
        
    } else if (productsBasket.has(productName)) {
        let temp = productsBasket.get(productName);
        let count = temp.quantity
        count++;
        productsBasket.set(productName, { 'quantity': count, 'value': e.target.value, 'index': index});
        
        
    }
}


function clearBasket() {
    basket.innerHTML = '';
}

function addToBasket(productsBasket) {
    let runningTotal = 0;
    let basketQuantity = 0
    for (let key of productsBasket.keys()) {
        let itemQuantity = productsBasket.get(key).quantity;
        let itemValue = productsBasket.get(key).value;
        const index = productsBasket.get(key).index; 
        const image = images[index];
        let imagesrc = image.getAttributeNode('src').nodeValue;
        
    
        
        let total = itemQuantity * itemValue;
        let basketItem = `<div class="product__element">
        <img src ="${imagesrc}">
        <div class="product__text">
            <h2 id = "product-name">${key}</h2>
            <h3><i id="add" class="fas fa-plus"></i>Quantity: ${itemQuantity}<i id="remove" class="fas fa-minus"></i></h3>
            <p class="price">£${itemValue * itemQuantity}</p>
        </div>`
         let list = document.createElement('li')
        list.innerHTML = basketItem;
        basket.appendChild(list); 
        runningTotal += total;
        basketQuantity += itemQuantity;

        
    }    
       
    document.querySelector('.total').innerText = `Total: £${runningTotal}`;
    document.querySelector('h2').textContent = `${basketQuantity}`;
    

};



function save() {
    localStorage.myMap = JSON.stringify(Array.from(productsBasket.entries()));
}

addToBasket(productsBasket);


// show hide basket functionality
const icon = document.querySelector('.header__icon');
const basketHTML = document.querySelector('.basket');

icon.addEventListener('click', () => {

    basketHTML.classList.toggle('show')

})



