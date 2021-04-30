main()

async function main() {
   const articles = await getArticles()

   for (article of articles) {
       displayArticle(article)
   }   
}

function getArticles() {
    return fetch("http://localhost:3000/api/teddies")
        .then(function(response) {
            return response.json()
        })
        
        .catch(function(error) {
            alert(error)
        })
}

function displayArticle(article) {
    const templateElt = document.getElementById("item")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("imageUrl").src = article.imageUrl
    cloneElt.getElementById("name").textContent = article.name
    cloneElt.getElementById("description").textContent = article.description
    cloneElt.getElementById("price").textContent = `${article.price/100},00€`
    cloneElt.getElementById("link").href = `product.html?id=${article._id}`

    document.getElementById("main").appendChild(cloneElt)
}
