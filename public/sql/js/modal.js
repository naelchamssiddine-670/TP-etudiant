document.addEventListener("DOMContentLoaded", function () {

    // Récupération du modal
    var modal = document.getElementById("myModal");

    // Bouton "Ajouter"
    var btn = document.getElementById("myBtn");

    // Bouton fermer
    var span = document.getElementsByClassName("close")[0];

    // Vérification (évite les erreurs)
    if (btn) {
        btn.onclick = function () {
            modal.style.display = "block";
        };
    }

    if (span) {
        span.onclick = function () {
            modal.style.display = "none";
        };
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});

document.getElementById("createAccountModal").querySelector("form").addEventListener("submit", function(e){
    e.preventDefault(); // empêche le rechargement

    // Récupérer les données du formulaire
    const formData = {
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
        mot_de_passe: document.getElementById("mot_de_passe").value
    };

    // Envoi avec fetch
    fetch("/api/accueil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        alert("✅ Compte créé !");
        document.getElementById("createAccountModal").style.display = "none";
        this.reset(); // vide le formulaire
    })
    .catch(err => {
        alert("❌ Erreur : " + err);
    });
});