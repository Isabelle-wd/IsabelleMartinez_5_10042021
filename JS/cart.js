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
                <div class="cart-row">
                    <div class="cart-item cart-column">
                        <img id="imageUrl" class="cart-item-image" src="${cart[i].image}" width="100"
                            height="100">
                        <div>
                            <span id="name" class="cart-item-title">${cart[i].name}</span><br>
                            <span id="colorOptions" class="cart-item-color mx-2">${cart[i].color}</span>
                        </div>
                    </div>
                    <span class="cart-price cart-column">${cart[i].price/100}€ </span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" min="1" type="number" value="${cart[i].quantity}">
                        <button class="btn btn-danger" type="button" data-id="${i}"><i class="fa fa-trash-o"></i></button>
                    </div>
                </div>
            </div>
        </section>
            `;
    }
        if(i == cart.length) {
            cartElement.innerHTML = basket; 
    }}

// supprimer un article du panier    
const removeCartItemButtons = document.getElementsByClassName("btn-danger")
for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i]
    button.addEventListener("click", function(event){
        const buttonClicked = event.target
        cart.splice(button.dataset.id,1) // enlève produit du localStorage
        buttonClicked.parentElement.parentElement.parentElement.remove()
        updateCartTotal()
        localStorage.setItem("shoppingCart", JSON.stringify(cart))
        window.location.reload()
    })}

    

// Chercher les prix dans le panier
let totalCalcs = []

for (let i = 0; i < cart.length; i++){
    itemsPrice = cart[i].price/100
    totalCalcs.push(itemsPrice)
    console.log(totalCalcs)
}

// Additionner les prix
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let totalAmount = totalCalcs.reduce(reducer,0);
console.log(totalAmount);

function totalPerItem(){
    const itemQuantity = document.querySelector(".cart-quantity-input")
    let itemPrice = document.querySelector(".cart-price")
    let itemTotalPrice = itemQuantity * itemPrice
    
}


////// RIEN NE MARCHE
// mise à jour du Total
/* async function updateCartTotal(){
    const cartItemContainer = document.getElementsByClassName("container-cart")
    const cartRows = cartItemContainer.getElementsByClassName("cart-row")
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i]
        const priceElement = cartRow.getElementsByClassName("cart-price")
        const quantityElement = cartRow.getElementsByClassName("cart-quantity-input")
        const price = parseFloat(priceElement.innerText.replace("€",""))
        const quantity = quantityElement.nodeValue
        total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price").innerText = total + `€`
} */


