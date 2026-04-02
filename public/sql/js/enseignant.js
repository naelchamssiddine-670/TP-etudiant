// public/js/enseignant.js
// Gestion sûre du modal d'ajout d'enseignant
(function () {
  'use strict';
    // Récupération du modal, du bouton "Ajouter" et des boutons de fermeture
  document.addEventListener('DOMContentLoaded', function () {
    const addModal = document.getElementById('myModal');
    const addBtn  = document.getElementById('myBtn');
    const closeButtons = document.querySelectorAll('.close, .edit-close');
    // Ajout de la vérification pour addBtn et addModal avant d'ajouter les écouteurs d'événements
    if (addBtn && addModal) {
      addBtn.addEventListener('click', function () {
        console.log('événement: Bouton ajouter enseignant cliqué');
        addModal.style.display = 'block';
      });
    }
    // Ajout de la vérification pour closeButtons avant d'ajouter les écouteurs d'événements
    if (closeButtons && closeButtons.length && addModal) {
      closeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          addModal.style.display = 'none';
        });
      });
    }

    // Fermer le modal en cliquant en dehors du contenu
    window.addEventListener('click', function (e) {
      if (e.target === addModal) {
        addModal.style.display = 'none';
      }
    });

    // Optionnel: log lors de la soumission du formulaire
    const form = addModal ? addModal.querySelector('form') : null;
    if (form) {
      form.addEventListener('submit', function () {
        console.log('Soumission formulaire enseignant');
      });
    }
  });
})();