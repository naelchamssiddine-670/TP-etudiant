document.addEventListener('DOMContentLoaded', () => {// Attente que le DOM soit complètement chargé avant d'exécuter le code
    const modal = document.getElementById('teacher-modal');// Récupération de l'élément du modal dans le DOM
    const openButton = document.getElementById('open-teacher-modal');// Récupération du bouton qui ouvre le modal dans le DOM
    const closeButton = document.getElementById('close-teacher-modal');// Récupération du bouton qui ferme le modal dans le DOM

    if (!modal || !openButton || !closeButton) {// Vérification que les éléments nécessaires sont présents dans le DOM
        return;
    }

    const ouvrirFormulaire = () => {// Fonction pour ouvrir le formulaire en ajoutant la classe 'is-open' au modal
        modal.classList.add('is-open');// Ajout de la classe 'is-open' pour afficher le modal
    };

    const fermerFormulaire = () => {// Fonction pour fermer le formulaire en supprimant la classe 'is-open' du modal
        modal.classList.remove('is-open');// Suppression de la classe 'is-open' pour masquer le modal
    };

    openButton.addEventListener('click', ouvrirFormulaire);// Ajout d'un écouteur d'événement pour ouvrir le modal lorsque le bouton est cliqué
    closeButton.addEventListener('click', fermerFormulaire);// Ajout d'un écouteur d'événement pour fermer le modal lorsque le bouton de fermeture est cliqué

    modal.addEventListener('click', (event) => {// Ajout d'un écouteur d'événement pour fermer le modal lorsque l'utilisateur clique en dehors du contenu du modal
        if (event.target === modal) {// Vérification que le clic a eu lieu sur le modal lui-même et pas sur un élément à l'intérieur du modal
            fermerFormulaire();// Fermeture du modal si le clic a eu lieu en dehors du contenu
        }
    });

    document.addEventListener('keydown', (event) => {// Ajout d'un écouteur d'événement pour fermer le modal lorsque l'utilisateur appuie sur la touche "Escape"
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {// Vérification que la touche "Escape" a été pressée et que le modal est actuellement ouvert
            fermerFormulaire();// Fermeture du modal si les conditions sont remplies
        }
    });

    const deleteForms = document.querySelectorAll('.delete-form');// Récupération de tous les formulaires de suppression d'enseignant dans le DOM

    deleteForms.forEach((form) => {// Parcours de chaque formulaire de suppression
        form.addEventListener('submit', (event) => {// Ajout d'un écouteur d'événement pour chaque formulaire de suppression
            const confirmed = window.confirm('Voulez-vous vraiment supprimer cet enseignant ?');// Affichage d'une boîte de confirmation pour demander à l'utilisateur s'il est sûr de vouloir supprimer l'enseignant

            if (!confirmed) {// Si l'utilisateur ne confirme pas la suppression
                event.preventDefault();// Empêche l'envoi du formulaire pour éviter la suppression de l'enseignant
            }
        });
    });
});
