/**
 * SAFOI 2025 - Script Principal
 * Salon Africain des Orateurs d'Impact
 */

// Configuration
const CONFIG = {
    emailjs: {
        userId: 'YOUR_EMAILJS_USER_ID',
        serviceId: 'YOUR_SERVICE_ID',
        templateId: 'YOUR_TEMPLATE_ID'
    },
    whatsApp: {
        groupLink: 'https://chat.whatsapp.com/YOUR_GROUP_LINK',
        contactNumber: '+22507591786'
    },
    contact: {
        email: 'safoi.ed2025@gmail.com',
        phones: ['+22507591786', '+22505068312', '+22507795280']
    }
};

// État global de l'application
const AppState = {
    isLoading: false,
    participants: [],
    feedbacks: []
};

// Utilitaires
const Utils = {
    // Générer un ID unique
    generateId: () => Date.now().toString(36) + Math.random().toString(36).substr(2),
    
    // Valider une adresse email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Valider un numéro de téléphone
    validatePhone: (phone) => {
        const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return re.test(phone);
    },
    
    // Formater une date
    formatDate: (date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    },
    
    // Afficher une notification
    showNotification: (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Styles inline pour la notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#F44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 9999;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            font-family: Arial, sans-serif;
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Suppression automatique
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    },
    
    // Smooth scroll vers une section
    smoothScrollTo: (target) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

// Gestionnaire d'animations
const AnimationManager = {
    init: () => {
        // Observer pour les animations au scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Ajouter l'observer aux éléments animés
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    },
    
    // Animation de typing pour le hero
    typeWriter: (element, text, speed = 50) => {
        let i = 0;
        element.innerHTML = '';
        
        const typing = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        };
        
        typing();
    }
};

// Gestionnaire de formulaires
const FormManager = {
    // Valider un formulaire
    validateForm: (form) => {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        const errors = [];

        requiredFields.forEach(field => {
            const value = field.value.trim();
            
            // Réinitialiser le style
            field.style.borderColor = '';
            
            if (!value) {
                field.style.borderColor = '#F44336';
                errors.push(`Le champ "${field.previousElementSibling.textContent}" est requis`);
                isValid = false;
            } else {
                // Validations spécifiques
                if (field.type === 'email' && !Utils.validateEmail(value)) {
                    field.style.borderColor = '#F44336';
                    errors.push('Format d\'email invalide');
                    isValid = false;
                } else if (field.type === 'tel' && !Utils.validatePhone(value)) {
                    field.style.borderColor = '#F44336';
                    errors.push('Format de téléphone invalide');
                    isValid = false;
                } else {
                    field.style.borderColor = '#4CAF50';
                }
            }
        });

        if (!isValid) {
            Utils.showNotification(errors[0], 'error');
        }

        return isValid;
    },
    
    // Gestionnaire d'inscription
    handleRegistration: (formData) => {
        return new Promise((resolve, reject) => {
            // Créer l'objet participant
            const participant = {
                id: Utils.generateId(),
                nom: formData.get('nom'),
                prenoms: formData.get('prenoms'),
                email: formData.get('email'),
                telephone: formData.get('telephone'),
                age: formData.get('age'),
                profession: formData.get('profession'),
                entreprise: formData.get('entreprise'),
                pays: formData.get('pays'),
                lieu: formData.get('lieu'),
                attentes: formData.get('attentes'),
                dateInscription: new Date(),
                status: 'inscrit'
            };
            
            // Stocker localement
            const participants = JSON.parse(localStorage.getItem('safoi_participants') || '[]');
            participants.push(participant);
            localStorage.setItem('safoi_participants', JSON.stringify(participants));
            
            // Simuler l'envoi d'email
            setTimeout(() => {
                resolve(participant);
            }, 2000);
        });
    },
    
    // Gestionnaire de feedback
    handleFeedback: (formData, rating) => {
        const feedback = {
            id: Utils.generateId(),
            name: formData.get('feedbackName') || 'Anonyme',
            rating: rating,
            comments: formData.get('feedbackText'),
            date: new Date()
        };
        
        // Stocker localement
        const feedbacks = JSON.parse(localStorage.getItem('safoi_feedbacks') || '[]');
        feedbacks.push(feedback);
        localStorage.setItem('safoi_feedbacks', JSON.stringify(feedbacks));
        
        return feedback;
    }
};

// Gestionnaire d'emails
const EmailManager = {
    init: () => {
        // Initialiser EmailJS si les clés sont configurées
        if (typeof emailjs !== 'undefined' && CONFIG.emailjs.userId !== 'YOUR_EMAILJS_USER_ID') {
            emailjs.init(CONFIG.emailjs.userId);
        }
    },
    
    sendConfirmationEmail: (participant) => {
        const emailParams = {
            to_email: participant.email,
            to_name: `${participant.prenoms} ${participant.nom}`,
            participant_id: participant.id,
            event_date: '23 Août 2025',
            event_location: 'Amphithéâtre A, Université Félix Houphouët-Boigny, Cocody',
            whatsapp_link: CONFIG.whatsApp.groupLink,
            programme: `
08h00-09h00: Accueil et installation
09h00-09h30: Discours d'ouverture
09h30-10h20: Panel 1 - L'Art Oratoire comme levier de leadership chez les jeunes africains
10h20-11h20: Panel 2 - Compétences oratoires et insertion professionnelle
11h30-12h30: Masterclass
12h30-13h30: Pause déjeuner / Déjeuner VIP
14h00-15h30: Concours d'éloquence
15h30-15h45: Délibération, Annonce des résultats
16h00: Clôture et Remerciement – Cocktail de fin - Photos de famille
            `
        };
        
        // Envoyer l'email si EmailJS est configuré
        if (typeof emailjs !== 'undefined' && CONFIG.emailjs.serviceId !== 'YOUR_SERVICE_ID') {
            return emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, emailParams);
        } else {
            console.log('EmailJS non configuré. Email à envoyer:', emailParams);
            return Promise.resolve({ status: 200, text: 'OK (simulation)' });
        }
    }
};

// Gestionnaire de QR Codes
const QRManager = {
    generate: (data, container) => {
        if (typeof QRCode !== 'undefined') {
            container.innerHTML = '';
            QRCode.toCanvas(container, data, {
                width: 200,
                margin: 2,
                color: {
                    dark: '#333333',
                    light: '#FFFFFF'
                }
            }, (error) => {
                if (error) console.error('Erreur QR Code:', error);
            });
        } else {
            console.warn('Bibliothèque QR Code non disponible');
            // Fallback : afficher l'ID en texte
            container.innerHTML = `<div style="padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; font-family: monospace; background: #f8f9fa;"><strong>ID Participant:</strong><br>${data}</div>`;
        }
    }
};

// Gestionnaire de navigation
const NavigationManager = {
    init: () => {
        // Smooth scroll pour tous les liens internes
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = anchor.getAttribute('href');
                Utils.smoothScrollTo(target);
            });
        });
        
        // Bouton retour en haut
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            });
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
};

// Gestionnaire de système d'étoiles
const StarRatingManager = {
    init: () => {
        const stars = document.querySelectorAll('.star');
        let currentRating = 0;
        
        stars.forEach((star, index) => {
            star.addEventListener('mouseover', () => {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.style.color = '#FF9800';
                    } else {
                        s.style.color = '#ddd';
                    }
                });
            });
            
            star.addEventListener('mouseout', () => {
                stars.forEach((s, i) => {
                    if (i < currentRating) {
                        s.style.color = '#FF9800';
                        s.classList.add('active');
                    } else {
                        s.style.color = '#ddd';
                        s.classList.remove('active');
                    }
                });
            });
            
            star.addEventListener('click', () => {
                currentRating = index + 1;
                stars.forEach((s, i) => {
                    if (i < currentRating) {
                        s.classList.add('active');
                        s.style.color = '#FF9800';
                    } else {
                        s.classList.remove('active');
                        s.style.color = '#ddd';
                    }
                });
            });
        });
    },
    
    getRating: () => {
        return document.querySelectorAll('.star.active').length;
    },
    
    reset: () => {
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('active');
            star.style.color = '#ddd';
        });
    }
};

// Gestionnaire modal
const ModalManager = {
    show: (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },
    
    hide: (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },
    
    init: () => {
        // Fermer modal avec X
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });
        
        // Fermer modal en cliquant en dehors
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        });
    }
};

// Gestionnaire de localStorage
const StorageManager = {
    // Sauvegarder les participants
    saveParticipant: (participant) => {
        const participants = JSON.parse(localStorage.getItem('safoi_participants') || '[]');
        participants.push(participant);
        localStorage.setItem('safoi_participants', JSON.stringify(participants));
    },
    
    // Récupérer tous les participants
    getParticipants: () => {
        return JSON.parse(localStorage.getItem('safoi_participants') || '[]');
    },
    
    // Sauvegarder un feedback
    saveFeedback: (feedback) => {
        const feedbacks = JSON.parse(localStorage.getItem('safoi_feedbacks') || '[]');
        feedbacks.push(feedback);
        localStorage.setItem('safoi_feedbacks', JSON.stringify(feedbacks));
    },
    
    // Récupérer tous les feedbacks
    getFeedbacks: () => {
        return JSON.parse(localStorage.getItem('safoi_feedbacks') || '[]');
    },
    
    // Exporter les données (pour admin)
    exportData: () => {
        const data = {
            participants: StorageManager.getParticipants(),
            feedbacks: StorageManager.getFeedbacks(),
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `safoi-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};

// Initialisation principale
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Initialisation du site SAFOI 2025...');
    
    // Initialiser les gestionnaires
    AnimationManager.init();
    NavigationManager.init();
    StarRatingManager.init();
    ModalManager.init();
    EmailManager.init();
    
    // Ajouter les classes d'animation
    document.querySelectorAll('.section, .value-card, .timeline-item, .contact-card').forEach(el => {
        el.classList.add('scroll-animate');
    });
    
    // Gestionnaire du formulaire d'inscription
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!FormManager.validateForm(registrationForm)) {
                return;
            }
            
            const submitBtn = registrationForm.querySelector('.submit-btn');
            const submitText = document.getElementById('submitText');
            const submitLoader = document.getElementById('submitLoader');
            
            // État de chargement
            AppState.isLoading = true;
            submitText.style.display = 'none';
            submitLoader.style.display = 'block';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(registrationForm);
                const participant = await FormManager.handleRegistration(formData);
                
                // Générer le QR Code
                const qrData = `SAFOI 2025 - ${participant.prenoms} ${participant.nom} - ID: ${participant.id}`;
                const qrContainer = document.getElementById('qrcode');
                if (qrContainer) {
                    QRManager.generate(qrData, qrContainer);
                }
                
                // Envoyer l'email de confirmation
                try {
                    await EmailManager.sendConfirmationEmail(participant);
                    console.log('Email envoyé avec succès');
                } catch (emailError) {
                    console.warn('Erreur envoi email:', emailError);
                }
                
                // Réinitialiser le formulaire
                registrationForm.reset();
                
                // Afficher le modal de succès
                ModalManager.show('successModal');
                
                // Notification de succès
                Utils.showNotification('Inscription réussie ! Consultez votre email.', 'success');
                
            } catch (error) {
                console.error('Erreur inscription:', error);
                Utils.showNotification('Erreur lors de l\'inscription. Veuillez réessayer.', 'error');
            } finally {
                // Réinitialiser l'état de chargement
                AppState.isLoading = false;
                submitText.style.display = 'block';
                submitLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }
    
    // Gestionnaire du formulaire de feedback
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(feedbackForm);
            const rating = StarRatingManager.getRating();
            
            if (rating === 0) {
                Utils.showNotification('Veuillez donner une note avec les étoiles', 'error');
                return;
            }
            
            const feedback = FormManager.handleFeedback(formData, rating);
            
            // Réinitialiser le formulaire
            feedbackForm.reset();
            StarRatingManager.reset();
            
            Utils.showNotification('Merci pour votre feedback ! 🙏', 'success');
            
            console.log('Feedback enregistré:', feedback);
        });
    }
    
    // Animation du CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> &nbsp; Redirection...';
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1000);
        });
    }
    
    // Effets hover sur les icônes de contact
    document.querySelectorAll('.contact-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1) rotateZ(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateZ(0deg)';
        });
    });
    
    // Stats en temps réel (optionnel)
    updateStats();
    
    console.log('✅ Site SAFOI 2025 initialisé avec succès !');
});

// Fonction pour mettre à jour les statistiques
function updateStats() {
    const participants = StorageManager.getParticipants();
    const participantCount = participants.length;
    
    // Mettre à jour le compteur de participants si l'élément existe
    const statsElements = document.querySelectorAll('.stat-number');
    if (statsElements.length > 0 && participantCount > 0) {
        // Supposons que le premier élément stat est le nombre de participants
        statsElements[0].textContent = `${participantCount}+`;
    }
}

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
    Utils.showNotification('Une erreur inattendue s\'est produite', 'error');
});

// Gestion des erreurs de promesses non capturées
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promesse rejetée:', e.reason);
    Utils.showNotification('Erreur de connexion. Vérifiez votre réseau.', 'error');
});

// Service Worker (optionnel pour PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW enregistré:', registration);
            })
            .catch(registrationError => {
                console.log('SW échoué:', registrationError);
            });
    });
}

// API publique pour usage externe
window.SAFOI = {
    Utils,
    FormManager,
    EmailManager,
    QRManager,
    ModalManager,
    StorageManager,
    CONFIG,
    // Fonctions utilitaires
    exportData: StorageManager.exportData,
    getStats: () => ({
        participants: StorageManager.getParticipants().length,
        feedbacks: StorageManager.getFeedbacks().length,
        lastUpdate: new Date().toISOString()
    })
};

// Console Easter Egg
console.log(`
🎯 SAFOI 2025 - Console Développeur
====================================
Site: Salon Africain des Orateurs d'Impact
Version: 1.0.0
Développé avec ❤️ pour la jeunesse africaine

📊 Commandes disponibles:
- SAFOI.getStats() - Statistiques
- SAFOI.exportData() - Exporter les données
- SAFOI.StorageManager.getParticipants() - Liste des participants

🌟 Rejoignez-nous le 23 Août 2025 !
`);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`⚡ Performance: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }, 0);
    });
}