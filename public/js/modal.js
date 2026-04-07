document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('register-modal');
    const openButton = document.getElementById('open-register-modal');
    const closeButton = document.getElementById('close-register-modal');

    if (!modal || !openButton || !closeButton) {
        return;
    }

    const ouvrirFormulaire = () => {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
    };

    const fermerFormulaire = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
    };

    openButton.addEventListener('click', ouvrirFormulaire);
    closeButton.addEventListener('click', fermerFormulaire);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            fermerFormulaire();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            fermerFormulaire();
        }
    });
});
