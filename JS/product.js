(async function() {
const productId = getProductId()
const productData = await getProductData(productId)
hydratePage(productData)
})()

function getProductId() {
return new URL(window.location.href).searchParams.get('id')
}

function getProductData(productId) {
    return fetch(`http://localhost:3000/api/teddies/${productId}`)
      .catch((error) => {
        console.log(error)
      })
      .then((Response) => Response.json())
      .then((productData) => productData)
  }

function hydratePage(article) {
    document.getElementById("imageUrl").src = article.imageUrl
    document.getElementById("name").textContent = article.name
    document.getElementById("description").textContent = article.description
    document.getElementById("price").textContent = `${article.price/100},00€`
    /* document.getElementById("color-option")
        .style.gridTemplateColumns = `repeat(${article.colors.length}, 1fr)` */
    
      // Add event listeners on button
      document.querySelector(".add-cart").onclick = (event) => {
        event.preventDefault()
        Cart.addProduct(product)
        redirectToShoppingCart(product.name)
      }
    
      // Get parent element
      const colorsElt = document.getElementById('productColors')
    
      // Display all colors
      product.colors.forEach((color) => {
        // Get & clone template for one color
        const templateElt = document.getElementById('productColor')
        const cloneElt = document.importNode(templateElt.content, true)
    
        // Hydrate color clone
        cloneElt.querySelector('div').style.backgroundColor = color
    
        // Display a new color
        colorsElt.appendChild(cloneElt)
      })
    }
    
    function redirectToShoppingCart(productName) {
      window.location.href = `${window.location.origin}/cart.html?lastAddedProductName=${productName}`
    }