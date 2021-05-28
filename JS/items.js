main()

/// Chargement de la page
async function main() {
	const articles = await getArticles()

	for (article of articles) {
		displayArticle(article)
	}
}
/// Récupère les articles
function getArticles() {
	return fetch("http://localhost:3000/api/teddies")
		.then(function (response) {
			return response.json()
		})

		.catch(function (error) {
			alert(error)
		})
}
/// Affiche les articles
function displayArticle(article) {
	const templateElt = document.getElementById("item")
	const cloneElt = document.importNode(templateElt.content, true) // Clone l'élément html

	cloneElt.querySelector("#imageUrl").src = article.imageUrl
	cloneElt.querySelector("#name").textContent = article.name
	cloneElt.querySelector("#description").textContent = article.description
	cloneElt.querySelector("#price").textContent = `${article.price/100},00 €`
	cloneElt.querySelector("#link").href = `product.html?id=${article._id}`

	document.getElementById("main").appendChild(cloneElt)
}
