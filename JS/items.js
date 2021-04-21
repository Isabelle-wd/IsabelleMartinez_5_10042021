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
        .then(function(articles) {
            return articles
        })
        .catch(function(error) {
            alert(error)
        })
}

function displayArticle(article) {
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("imageUrl").innerContent = article.imageUrl
    cloneElt.getElementById("name").textContent = article.name
    cloneElt.getElementById("description").textContent = article.description
    cloneElt.getElementById("price").textContent = article.price

    document.getElementById("main").appendChild(cloneElt)
}
