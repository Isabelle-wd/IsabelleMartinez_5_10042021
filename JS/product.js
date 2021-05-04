(async function() {
const productId = getProductId()
const productData = await getProductData(productId)
cloneData(productData)
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

function cloneData(article) {
    document.querySelector("#imageUrl").src = article.imageUrl
    document.querySelector("#name").textContent = article.name
    document.querySelector("#description").textContent = article.description
    document.querySelector("#price").textContent = `${article.price/100},00€`
    document.querySelector("color-option")= `repeat(${article.colors.length})`
}