/* ;(async () => {
  const articleId = getArticleId()
  const articleData = await getArticleData(articleId)
  hydratePage(articleData)
})()

function getArticleId() {
  return new URL(window.location.href).searchParams.get('id')
}

function getArticleData(articleId) {
  return fetch(`http://localhost:3000/api/teddies/${articleId}`)
    .catch((error) => {
      console.log(error)
    })
    .then((Response) => Response.json())
    .then((articleData) => articleData)
}

function hydratePage(article) {
  document.querySelector("#imageUrl").src = article.imageUrl
  document.querySelector("#name").textContent = article.name
  document.querySelector("#price").textContent = `${article.price/100},00€`
  document.querySelector("#description").textContent = article.description
} */