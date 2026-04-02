// public/js/enseignant.js
// Gestion sûre du modal d'ajout d'enseignant
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const addModal = document.getElementById('myModal');
    const addBtn = document.getElementById('myBtn');
    const closeButtons = document.querySelectorAll('.close, .edit-close');

    if (addBtn && addModal) {
      addBtn.addEventListener('click', function () {
        console.log('événement: Bouton ajouter enseignant cliqué');
        addModal.style.display = 'block';
      });
    }

    if (closeButtons && closeButtons.length && addModal) {
      closeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          addModal.style.display = 'none';
        });
      });
    }

    // Fermer le modal en cliquant hors du contenu
    window.addEventListener('click', function (e) {
      if (e.target === addModal) {
        addModal.style.display = 'none';
      }
    });

    // Optionnel: log lors de la soumission du formulaire
    var form = addModal ? addModal.querySelector('form') : null;
    if (form) {
      form.addEventListener('submit', function () {
        console.log('Soumission formulaire enseignant');
      });
    }
  });
})();
