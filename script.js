const products = document.querySelectorAll('#product-name');
const buttons = document.querySelectorAll('button');
let productsBasket = new Map();
const basket = document.querySelector('.basket-list');
const map = localStorage.getItem('myMap');
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
    let productName = products[index].textContent;
    if (!productsBasket.has(productName)) {
        productsBasket.set(productName, { 'quantity': 1, 'value': e.target.value });
        
    } else if (productsBasket.has(productName)) {
        let temp = productsBasket.get(productName);
        let count = temp.quantity
        count++;
        productsBasket.set(productName, { 'quantity': count, 'value': e.target.value });
        
        
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
        let total = itemQuantity * itemValue;
        let basketItem = `Item: ${key} Quantity: ${itemQuantity} Total: £${total}`
         let list = document.createElement('li')
        list.appendChild(document.createTextNode(basketItem));
        basket.appendChild(list); 
        runningTotal += total;
        basketQuantity += itemQuantity;

        
    }    
       
    document.querySelector('.total').innerText = `Total: £${runningTotal}`;
    document.querySelector('.basket h2').textContent = `${basketQuantity} items in Basket`;
    

};



function save() {
    localStorage.myMap = JSON.stringify(Array.from(productsBasket.entries()));
}

addToBasket(productsBasket);
