const responseId = localStorage.getItem("responseId");
console.log(`responseId : ${responseId}`);

const confElement = document.querySelector("#confElement");
const confStructure = `
    <h1 class="display-3">Merci pour votre achat!</h1>
    <p class="lead mt-3">Un email de confirmation vous a été envoyé!</p>
    <p>Le numéro de votre commande est : ${responseId}</p>
    <hr>
    <p>Vous avez des questions? <a id="contact" href="mailto:contact@orinoco.fr">Contactez-nous</a></p>       
    <p class="lead"><a class="btn btn-info btn-md mt-5" href="/html/index.html" role="button">Retour à la page d'accueil</a></p>`;

confElement.innerHTML = confStructure;

function emptyConfPage(key) {
    localStorage.removeItem(key);
};
emptyConfPage("responseId");
emptyConfPage("shoppingCart");


