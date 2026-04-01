document.addEventListener("DOMContentLoaded", function () {

    // Récupération du modal
    var modal = document.getElementById("myModal");

    // Bouton "Ajouter"
    var btn = document.getElementById("myBtn");

    // Bouton de fermeture (x)
    var span = document.getElementsByClassName("close")[0];

    // Vérification (éviter les erreurs si les éléments ne sont pas trouvés)
    if (btn) {
        // Lorsque l'utilisateur clique sur le bouton, ouvrir le modal
        btn.onclick = function () {
            modal.style.display = "block";
        };
    }

    if (span) {
        // Lorsque l'utilisateur clique sur (x), fermer le modal
        span.onclick = function () {
            modal.style.display = "none";
        };
    }

    // Lorsque l'utilisateur clique en dehors du modal, fermer le modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});