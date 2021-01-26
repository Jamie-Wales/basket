const products = document.querySelectorAll('#product-name');
const buttons = document.querySelectorAll('button');
const productsBasket = new Map();
const basket = document.querySelector('.basket-list');






buttons.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        addProduct(e, index);
        clearBasket();
        addToBasket(productsBasket, index);
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

function addToBasket(productsBasket, index) {
    for (let key of productsBasket.keys()) {
        let itemQuantity = productsBasket.get(key).quantity;
        let itemValue = productsBasket.get(key).value;
        let total = itemQuantity * itemValue;
        let basketItem = `Item: ${key} Quantity: ${itemQuantity} Total: £${total}`
         let list = document.createElement('li')
        list.appendChild(document.createTextNode(basketItem));
        basket.appendChild(list); 
        
        
        
    }    
       
    

 
};

