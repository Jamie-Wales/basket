const products = document.querySelectorAll('#product-name');
const buttons = document.querySelectorAll('button');
const productsBasket = {
    'name': [],
    'quantity': []
};
const basket = document.querySelector('.basket-list')







buttons.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        addProduct(e, index);
        clearBasket();
        addToBasket(productsBasket, index);
     
    })
});


function addProduct(e, index){
    let productName = products[index].textContent;
    if (productsBasket.name.includes(productName)){
        productsBasket.quantity[index]++;
        return;
    }
    productsBasket.name.push(productName);
    productsBasket.quantity[index] = 1;
}

function clearBasket() {
    basket.innerHTML = '';
}

function addToBasket(productsBasket, index) {
    productsBasket.name.forEach((element, index) => {
        let list = document.createElement('li')
        list.appendChild(document.createTextNode(productsBasket.name[index]))
        list.appendChild(document.createTextNode(productsBasket.quantity[index]))
        basket.appendChild(list);
        
       
   });
 
}







