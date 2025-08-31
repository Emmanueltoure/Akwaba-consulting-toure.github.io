document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation basique
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    highlightError(field);
                } else {
                    removeHighlight(field);
                    
                    // Validation spécifique pour email
                    if (field.type === 'email' && !isValidEmail(field.value)) {
                        isValid = false;
                        highlightError(field, 'Veuillez entrer une adresse email valide');
                    }
                }
            });
            
            if (isValid) {
                // Ici, vous ajouterez le code pour envoyer le formulaire
                alert('Merci pour votre message! Nous vous répondrons bientôt.');
                contactForm.reset();
            }
        });
        
        // Enlever le surlignage d'erreur quand l'utilisateur commence à taper
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                removeHighlight(this);
            });
        });
    }
    
    function highlightError(field, message = 'Ce champ est requis') {
        field.style.borderColor = '#e74c3c';
        
        // Afficher un message d'erreur
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = '#e74c3c';
            errorElement.style.fontSize = '0.9rem';
            errorElement.style.marginTop = '0.3rem';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        errorElement.textContent = message;
    }
    
    function removeHighlight(field) {
        field.style.borderColor = '';
        
        // Supprimer le message d'erreur
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});