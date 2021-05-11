const url = 'http://localhost:3000/api/teddies/';
let teddyId = "";

async function getData() {
    let response = await fetch(url + teddyId);

    if (response.status === 200) {
        return data = await response.json();
    }
}

teddyId = location.search.substring(4);

// Cloner les données du produit
async function productPage() {
  teddy = await getData();

  let image = document.querySelector("#imageUrl");
  let name = document.querySelector("#name");
  let description = document.querySelector("#description");
  let price = document.querySelector("#price");
  let quantity = document.querySelector("#quantity"); 
  let select = document.querySelector("#colorOptions");
  let button = document.querySelector("#addToCart");
  let colors = teddy.colors;

  name.textContent = teddy.name;
  description.textContent = teddy.description;
  price.textContent = (Math.round(teddy.price) / 100).toFixed(2) + "€";
  image.src = teddy.imageUrl;

  for (let i = 0; i < colors.length; i++) {
    let option = document.createElement("option");
    option.value = colors[i];
    option.innerHTML = colors[i];
    select.appendChild(option);
  }   
  
  let cart = [];

  button.addEventListener("click", function (event) {
    event.preventDefault()
  if (quantity.checkValidity() === true) {
    let product = {
      _id: teddy._id,
      image: teddy.imageUrl,
      name: teddy.name,
      price: teddy.price * parseInt(quantity.value),
      quantity: parseInt(quantity.value),
      color: select.value,
    };

    let other = true;
    if (localStorage.getItem("shoppingCart") === null) {
      cart.push(product);
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
      alert(
        `Vous avez ajouté ${product.quantity} "${product.name}" à votre panier`
      );
    } else {
      cart = JSON.parse(localStorage.getItem("shoppingCart"));
      for (let item of cart) {
        if (item._id === product._id && item.color === product.color) {
          item.quantity = product.quantity;
          autreProduit = false;
        }
      }
      if (other) cart.push(product);
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
      alert(
        `Vous avez ajouté ${product.quantity} "${product.name}" à votre panier`
      );
    }
  }
}
);
}

productPage();





