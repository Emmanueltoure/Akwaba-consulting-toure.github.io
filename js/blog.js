document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des articles
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                // Récupérer la valeur du filtre
                const filterValue = this.getAttribute('data-filter');
                
                // Filtrer les articles
                blogCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Fonctionnalité de newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Ici, vous ajouterez le code pour traiter l'inscription
                alert('Merci pour votre inscription à notre newsletter !');
                emailInput.value = '';
            } else {
                alert('Veuillez entrer une adresse email valide.');
            }
        });
    }
    
    // Fonction de validation d'email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animation des articles au défilement
    const animateBlogCards = function() {
        const cards = document.querySelectorAll('.blog-card');
        
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialiser l'animation des articles
    // const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Déclencher l'animation au chargement et au défilement
    window.addEventListener('load', animateBlogCards);
    window.addEventListener('scroll', animateBlogCards);
    
    // Fonctionnalité de partage d'article
    const initShareButtons = function() {
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const platform = this.getAttribute('data-platform');
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                let shareUrl;
                
                switch(platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'email':
                        shareUrl = `mailto:?subject=${title}&body=Je vous recommande la lecture de cet article: ${url}`;
                        break;
                }
                
                window.open(shareUrl, '_blank', 'width=600,height=400');
            });
        });
    };
    
    // Table des matières automatique
    const generateTableOfContents = function() {
        const tocContainer = document.querySelector('.toc-container');
        if (!tocContainer) return;
        
        const headings = document.querySelectorAll('h2');
        if (headings.length === 0) return;
        
        let tocHTML = '<ul class="toc-list">';
        
        headings.forEach((heading, index) => {
            const id = `section-${index}`;
            heading.setAttribute('id', id);
            
            tocHTML += `
                <li>
                    <a href="#${id}">${heading.textContent}</a>
                </li>
            `;
        });
        
        tocHTML += '</ul>';
        tocContainer.innerHTML += tocHTML;
    };
    
    // Temps de lecture estimé
    const calculateReadingTime = function() {
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return;
        
        const text = articleContent.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 mots par minute
        
        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `⏱️ Temps de lecture estimé : ${readingTime} min`;
        readingTimeElement.style.marginBottom = '1.5rem';
        readingTimeElement.style.fontStyle = 'italic';
        readingTimeElement.style.color = 'var(--text-light)';
        
        const articleMeta = document.querySelector('.article-meta');
        if (articleMeta) {
            articleMeta.appendChild(readingTimeElement);
        }
    };
    
    // Appel des fonctions d'initialisation
    initShareButtons();
    generateTableOfContents();
    calculateReadingTime();
});