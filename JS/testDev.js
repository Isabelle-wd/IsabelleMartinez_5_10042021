let cart = JSON.parse(localStorage.getItem("shoppingCart"));
console.log(cart);

const cartElement = document.querySelector("#cartItems");
console.log(cartElement);

let basket = [];

// afficher que le panier est vide
if(cart === null || cart.length === 0) {
const emptyCart = 
    `<div>Votre panier est vide</div>`
    ;
    cartElement.innerHTML = emptyCart;
}

// afficher article dans le panier
else{
    for (i = 0; i < cart.length; i++) {

        basket = basket + `
        <section class="container-cart content-section">   
            <div id="cartItems" class="cart-items">
                <div class="cart-row cart-row-items">
                    <div class="cart-item cart-column">
                        <img id="imageUrl" class="cart-item-image" src="${cart[i].image}" width="100"
                            height="100">
                        <div>
                            <span id="name" class="cart-item-title">${cart[i].name}</span><br>
                            <span id="colorOptions" class="cart-item-color mx-2">${cart[i].color}</span>
                        </div>    
                    </div>
                    <span id="price" class="cart-price cart-column">${cart[i].price/100}€ </span>
                    <div class="cart-quantity cart-column">
                        <input id="quantity" class="cart-quantity-input" min="1" type="number" value="${cart[i].quantity}">
                        <button class="btn btn-danger" type="button" data-id="${i}"><i class="fa fa-trash-o"></i></button>
                    </div>
                </div>
            </div>
        </section>
            `;
    }
        if(i == cart.length) {
            cartElement.innerHTML = basket; 
        }
}

// supprimer un article du panier    
const removeButtons = document.getElementsByClassName("btn-danger")
for (let i = 0; i < removeButtons.length; i++) {
    const button = removeButtons[i]
    button.addEventListener('click', function(event){
        const buttonClicked = event.target
        cart.splice(button.dataset.id,1) // enlève produit du localStorage
        buttonClicked.parentElement.parentElement.parentElement.remove()
        updateCartTotal()
        localStorage.setItem("shoppingCart", JSON.stringify(cart))
        window.location.reload()
})}

function updateCartTotal(){
    const cartRows = document.getElementsByClassName("cart-row-items")
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        console.log(priceElement, quantityElement)
        const price = parseFloat(priceElement.innerText.replace("€",""))
        const quantity = quantityElement.Value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100 // Evite les décimals à l'infini
    document.getElementsByClassName("cart-total-price")[0].innerText = total + "€"
}