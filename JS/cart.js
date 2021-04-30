let removeCartItemsButtons = document.getElementsByClassName("btn-danger")
console.log(removeCartItemsButtons)
for(let i = 0; i < removeCartItemsButtons.length; i++) {
    let button = removeCartItemsButtons[i]
    button.addEventListener("click", function(event) {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    })
}

/* function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName("cart-items")[0]
    let cartRows = cartItemContainer.getElementsByClassName("cart-row")
    for (let i = 0; i < cartRows.length; i++) {
        let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        let price = priceElement.innerText
    }
} */