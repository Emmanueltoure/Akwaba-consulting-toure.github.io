// Configuration FormSubmit - VOTRE EMAIL EST CONFIGURÉ
const FORM_SUBMIT_EMAIL = 'emmanueltoure27@gmail.com'; // Votre email

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const submitButton = document.getElementById('submitButton');
    const buttonText = submitButton.querySelector('.button-text');
    const loadingSpinner = submitButton.querySelector('.loading-spinner');

    // Masquer les messages au chargement
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Configurer FormSubmit avec votre email
    if (contactForm) {
        contactForm.setAttribute('action', `https://formsubmit.co/${FORM_SUBMIT_EMAIL}`);
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Valider le formulaire
            if (validateForm()) {
                // Afficher l'animation de chargement
                buttonText.style.display = 'none';
                loadingSpinner.style.display = 'inline';
                submitButton.disabled = true;
                
                // Masquer les messages précédents
                successMessage.style.display = 'none';
                errorMessage.style.display = 'none';
                
                // Envoyer le formulaire via FormSubmit
                fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        // Afficher le message de succès
                        successMessage.style.display = 'block';
                        contactForm.reset();
                        
                        // Rediriger vers la page de remerciement après 2 secondes
                        setTimeout(() => {
                            window.location.href = 'merci.html';
                        }, 2000);
                    } else {
                        throw new Error('Erreur lors de l\'envoi du formulaire');
                    }
                })
                .catch(error => {
                    // Afficher le message d'erreur
                    errorMessage.style.display = 'block';
                    console.error('Error:', error);
                })
                .finally(() => {
                    // Restaurer le bouton
                    buttonText.style.display = 'inline';
                    loadingSpinner.style.display = 'none';
                    submitButton.disabled = false;
                });
            }
        });
    }
    
    // Validation du formulaire
    function validateForm() {
        let isValid = true;
        
        // Valider le nom
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (!name.value.trim()) {
            showError(name, nameError, 'Le nom est requis');
            isValid = false;
        } else {
            clearError(name, nameError);
        }
        
        // Valider l'email
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        if (!email.value.trim()) {
            showError(email, emailError, 'L\'email est requis');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, emailError, 'Veuillez entrer un email valide');
            isValid = false;
        } else {
            clearError(email, emailError);
        }
        
        // Valider le message
        const message = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (!message.value.trim()) {
            showError(message, messageError, 'Le message est requis');
            isValid = false;
        } else {
            clearError(message, messageError);
        }
        
        return isValid;
    }
    
    function showError(field, errorElement, message) {
        field.style.borderColor = '#e74c3c';
        errorElement.textContent = message;
    }
    
    function clearError(field, errorElement) {
        field.style.borderColor = '';
        errorElement.textContent = '';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animation des éléments au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.info-item, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialiser les éléments animés
    const animatedElements = document.querySelectorAll('.info-item, .faq-item');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Déclencher l'animation au chargement et au défilement
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Validation en temps réel
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            const nameError = document.getElementById('nameError');
            if (!this.value.trim()) {
                showError(this, nameError, 'Le nom est requis');
            } else {
                clearError(this, nameError);
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailError = document.getElementById('emailError');
            if (!this.value.trim()) {
                showError(this, emailError, 'L\'email est requis');
            } else if (!isValidEmail(this.value)) {
                showError(this, emailError, 'Veuillez entrer un email valide');
            } else {
                clearError(this, emailError);
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            const messageError = document.getElementById('messageError');
            if (!this.value.trim()) {
                showError(this, messageError, 'Le message est requis');
            } else {
                clearError(this, messageError);
            }
        });
    }
});