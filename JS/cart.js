/// Récupération de l'URL API
let cart = JSON.parse(localStorage.getItem("shoppingCart"));
console.log(cart);

/// Position du produit
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
                    <span id="price" class="cart-price shop-price cart-column">${cart[i].price/100},00 €</span>
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
    }}

// Supprimer un article (une ligne)
let removeButton = document.querySelectorAll(".btn-danger");
console.log(removeButton);

for(let i = 0; i < removeButton.length; i++) {
    let button = removeButton[i]
    button.addEventListener("click", function(event){
    let buttonClicked = event.target;   
    cart.splice(button.dataset.id,1); // enlève produit du localStorage
    buttonClicked.parentElement.parentElement.parentElement.remove()
    // updateCartTotal()
    localStorage.setItem("shoppingCart", JSON.stringify(cart))
    window.location.reload()
})}        

// Chercher les prix dans le panier
let totalCalcs = []
for (let i = 0; i < cart.length; i++){
    itemsPrice = cart[i].price/100;
    totalCalcs.push(itemsPrice)
    console.log(totalCalcs);
}

// Additionner les prix
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let totalAmount = totalCalcs.reduce(reducer,0);
console.log(totalAmount);   

// Afficher le total
const cartElement2 = document.querySelector("#cardBody");
console.log(cartElement2);
let totalOrder = [];
totalOrder = `
<div class="col-lg-4 mt-5 mb-5">
<div id="cardBody" class="mb-4">
    <form id="box" class="card-body">
        <h5 class="mb-3">Vérification et validation</h5>
        <ul class="list-group list-group-flush">
            <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Sous-total
                <span>${totalAmount},00€</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                Livraison
                <span>Gratuit</span>
            </li>
            <li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                    <strong>Montant total</strong>
                </div>
                <span><strong>${totalAmount},00€</strong></span>
            </li>
        </ul>
        <button type="button" id="purchaseButton"
            class="btn btn-primary btn-block waves-effect waves-light">Acheter</button>
    </form>
</div>
</div>`;
cartElement2.innerHTML = totalOrder;  


/// Formulaires
const purchaseButton = document.getElementById("purchaseButton")
let products = [];
purchaseButton.addEventListener(click, function(){
    debugger;

    let contact = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("lastname").value,
        address: document.getElementById("address").value,
        postalCode: document.getElementById("cp").value,
        city: document.getElementById("city").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value
    }
    
    for  (let teddy of cart) {
        products.push(teddy._id);
    }
    let placeOrder = JSON.stringify({contact, products});

    

}
)







