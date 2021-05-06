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

