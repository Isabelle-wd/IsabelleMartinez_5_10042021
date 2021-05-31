/// Récupération de l'URL API
let cart = JSON.parse(localStorage.getItem("shoppingCart"));

/// Position du produit
const cartElement = document.querySelector("#cartItems");

let basket = [];

/// Afficher que le panier est vide
if (cart === null || cart.length === 0) {
	const emptyCart =
		`<div>Votre panier est vide</div>`;
	cartElement.innerHTML = emptyCart;
}

/// Afficher article dans le panier
else {
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
                        <span id="quantity" class="cart-quantity-input" min="1" type="number">${cart[i].quantity}</span>
                        <button class="btn btn-danger" type="button" data-id="${i}"><i class="fa fa-trash-o"></i></button>
                    </div>
                </div>
            </div>
        </section>
            `;
	}

	cartElement.innerHTML = basket;

}

// Supprimer un article (une ligne)
let removeButton = document.querySelectorAll(".btn-danger");

for (let i = 0; i < removeButton.length; i++) {
	let button = removeButton[i]
	button.addEventListener("click", function (event) {
		let buttonClicked = event.target;
		cart.splice(button.dataset.id, 1); // enlève produit du localStorage
		buttonClicked.parentElement.parentElement.parentElement.remove()
		localStorage.setItem("shoppingCart", JSON.stringify(cart))
		window.location.reload()
	})
}

/// Chercher les prix dans le panier
let totalCalcs = []
for (let i = 0; i < cart.length; i++) {
	itemsPrice = cart[i].price / 100;
	totalCalcs.push(itemsPrice)
}

/// Additionner les prix
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let totalAmount = totalCalcs.reduce(reducer, 0);

/// Afficher le total
const cartElement2 = document.querySelector("#cardBody");
let totalOrder = [];
totalOrder = `
    <div id="cardBody" class="mb-4">
        <form id="box" class="card-body">
            <h5 class="mb-3">Vérification et validation</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
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
    </div>`;
cartElement2.innerHTML = totalOrder;

const confirmOrder = document.getElementById("purchaseButton");

confirmOrder.addEventListener('click', (event) => {
	event.preventDefault();

	/// -------------- Formulaire - Informations perso ------------------------------------///

	// Récupérer des données du formulaire
	const contactDetails = {
		lastName: document.getElementById("lastName").value,
		firstName: document.getElementById("firstName").value,
		address: document.getElementById("address").value,
		cp: document.getElementById("cp").value,
		city: document.getElementById("city").value,
		email: document.getElementById("email").value
	}

	// Paramètres du Formulaire --- Validité des données
	function regexString(value) { // le nom de famille, le prénom et la ville
		return /^[A-Za-z]{2,20}$/.test(value);
	}
	function checkLastName() {
		const lastNameValidity = contactDetails.lastName;
		if (regexString(lastNameValidity)) {
			return true;
		} else {
			alert("N'oubliez pas de renseigner votre nom de famille. Celui-ci ne doit comporter que des lettres.");
			return false;
		}
	}
	function checkFirstName() {
		const firstNameValidity = contactDetails.firstName;
		if (regexString(firstNameValidity)) {
			return true;
		} else {
			alert("N'oubliez pas de renseigner votre prénom. Celui-ci ne doit comporter que des lettres.");
			return false;
		}
	}
	function checkCity() {
		const cityValidity = contactDetails.city;
		if (regexString(cityValidity)) {
			return true;
		} else {
			alert("N'oubliez pas de renseigner votre ville. Celle-ci ne doit comporter que des lettres.");
			return false;
		}
	}

	function regexCp(value) { // le code postal
		return /^(?:[0-8]\d|9[0-8])\d{3}$/.test(value);
	}

	function checkCp() {
		const cpValidity = contactDetails.cp;
		if (regexCp(cpValidity)) {
			return true;
		} else {
			alert("N'oubliez pas de renseigner votre code postal. Celui-ci doit comporter 5 chiffres.");
			return false;
		}
	}

	function regexEmail(value) { // l'email
		return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
	}

	function checkEmail() {
		const emailValidity = contactDetails.email;
		if (regexEmail(emailValidity)) {
			return true;
		} else {
			alert("Votre adresse email n'est pas valide!");
			return false;
		}
	}
	if (checkLastName() && checkFirstName() && checkCp() && checkCity() && checkEmail()) {

		localStorage.setItem("contactDetails", JSON.stringify(contactDetails)); // Mettre les données du formulaire dans le localStorage

		delete contactDetails.cp;
		const sendOrder = {
			products: cart.map((product) => product._id),
			contact: contactDetails
		};
		sendDataOff(sendOrder);

	} else {
		alert("Veuillez vérifier les informations indiquées dans le formulaire");
		return false;
	};


});


// Envoyer les données avec une requête POST
function sendDataOff(sendOrder) {
	const promise = fetch("http://localhost:3000/api/teddies/order", {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(sendOrder),
		mode: "cors",

	});
	promise.then(async(response) => {
		try {
			const content = await response.json();

			if (response.ok) {
				console.log(`Résultat de response.ok : ${response.ok}`);
				console.log("OrderId");
				console.log(content.orderId); // récupération de l'id de commande
				localStorage.setItem("responseId", content.orderId); // mise de l'id dans le localStorage
				window.location = "conf.html";
			} else {
				console.log(`Réponse du serveur : ${response.status}`)
				alert(`Problème avec le serveur : erreur ${response.status}`)
			};
		} catch (e) {
			console.log(e);
		};
	})
}

// Remplir le formulaire automatiquement

const dataLocalStorage = localStorage.getItem("contactDetails"); //prendre la clé dans le localStorage
const dataLocalStorageObject = JSON.parse(dataLocalStorage); // convertir en objet JS

// Mettre les données du localStorage dans le formulaire
function addData(input) {
	document.querySelector(`#${input}`).value = dataLocalStorageObject[input];
};
addData("lastName");
addData("firstName");
addData("address");
addData("cp");
addData("city");
addData("email");






