# ⚙️ GUIDE DE CONFIGURATION - SAFOI 2025

## 🚀 CONFIGURATION RAPIDE (10 minutes)

### 1. 📧 Configuration EmailJS

#### Étape 1 : Créer un compte
- Allez sur [emailjs.com](https://emailjs.com)
- Créez un compte gratuit
- Confirmez votre email

#### Étape 2 : Ajouter un service email
- Cliquez sur "Email Services"
- Ajoutez "Gmail" (recommandé)
- Connectez votre compte Gmail
- Notez votre `Service ID`

#### Étape 3 : Créer un template
- Cliquez sur "Email Templates"
- Créez un nouveau template
- Copiez le contenu de `docs/email-template.html`
- Utilisez ces variables :
  - `{{to_name}}` - Nom du participant
  - `{{to_email}}` - Email du participant
  - `{{participant_id}}` - ID unique
  - `{{event_date}}` - Date de l'événement
  - `{{event_location}}` - Lieu
  - `{{whatsapp_link}}` - Lien du groupe
- Notez votre `Template ID`

#### Étape 4 : Récupérer les clés
- Allez dans "Account" > "General"
- Notez votre `User ID`

#### Étape 5 : Mettre à jour le site
Remplacez dans `index.html` :
```javascript
// Ligne ~670 environ
emailjs.init("YOUR_EMAILJS_USER_ID");
// Remplacez par :
emailjs.init("VOTRE_VRAI_USER_ID");

// Ligne ~710 environ
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
// Remplacez par :
emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', emailParams)
```

### 2. 📱 Configuration WhatsApp

#### Créer le groupe principal
1. Créez un groupe WhatsApp "SAFOI 2025 - Participants"
2. Ajoutez une description : "Groupe officiel des participants du SAFOI 2025"
3. Générez un lien d'invitation

#### Mettre à jour les liens
Remplacez dans `index.html` :
```javascript
// Ligne ~695 environ
whatsapp_link: 'https://chat.whatsapp.com/YOUR_GROUP_LINK'
// Remplacez par :
whatsapp_link: 'https://chat.whatsapp.com/VOTRE_VRAI_LIEN'

// Ligne ~85 environ  
onclick="window.open('https://wa.me/22507591786', '_blank')"
// Remplacez par :
onclick="window.open('https://wa.me/VOTRE_NUMERO', '_blank')"
```

### 3. 📞 Configuration des Contacts

#### Mettre à jour les numéros
Remplacez dans `index.html` :
```html
<!-- Lignes ~80-90 -->
<div class="contact-icon phone" onclick="window.location.href='tel:+22507591786'">
<!-- Remplacez par : -->
<div class="contact-icon phone" onclick="window.location.href='tel:+VOTRE_NUMERO'">

<!-- Ligne ~75 -->
<div class="contact-icon email" onclick="window.location.href='mailto:safoi.ed2025@gmail.com'">
<!-- Remplacez par : -->
<div class="contact-icon email" onclick="window.location.href='mailto:VOTRE_EMAIL@gmail.com'">
```

#### Section contact complète
Remplacez dans la section contact (lignes ~500-550) :
```html
<p>+225 07 59 178 676</p>
<p>+225 05 06 88 8312</p>
<p>+225 07 79 522 800</p>
<!-- Remplacez par vos vrais numéros -->
```

### 4. 🌐 Configuration des Réseaux Sociaux

Remplacez les liens (lignes ~550-600) :
```html
<a href="#" class="social-link facebook">
<!-- Remplacez par : -->
<a href="https://facebook.com/safoi2025" class="social-link facebook">

<a href="#" class="social-link tiktok">
<!-- Remplacez par : -->
<a href="https://tiktok.com/@safoi2025" class="social-link tiktok">

<a href="#" class="social-link instagram">
<!-- Remplacez par : -->
<a href="https://instagram.com/safoi2025" class="social-link instagram">
```

## 🎨 PERSONNALISATION AVANCÉE

### 1. Changer les Couleurs
Dans `index.html` (lignes ~15-25) ou `assets/css/style.css` :
```css
:root {
    --primary-green: #4CAF50;    /* Changez ici */
    --primary-orange: #FF9800;   /* Changez ici */
    --primary-red: #F44336;      /* Changez ici */
    --dark-text: #333;
    --light-bg: #f8f9fa;
}
```

### 2. Ajouter Votre Logo
```html
<!-- Remplacez la section logo (ligne ~85) -->
<div class="logo">
    <img src="assets/images/logo-safoi.png" alt="SAFOI" height="80">
    <!-- Ou gardez le logo textuel -->
</div>
```

### 3. Modifier les Textes
Tous les textes sont dans `index.html` - recherchez et remplacez :
- Titres des sections
- Descriptions de l'événement
- Informations de contact
- Messages d'erreur/succès

## 🔧 VARIABLES DE CONFIGURATION

### Variables Principales à Changer
```javascript
// Dans index.html, recherchez et remplacez :

CONFIG = {
    emailjs: {
        userId: 'VOTRE_USER_ID',
        serviceId: 'VOTRE_SERVICE_ID', 
        templateId: 'VOTRE_TEMPLATE_ID'
    },
    whatsApp: {
        groupLink: 'https://chat.whatsapp.com/VOTRE_LIEN',
        contactNumber: '+VOTRE_NUMERO'
    },
    contact: {
        email: 'VOTRE_EMAIL@gmail.com',
        phones: ['+NUMERO1', '+NUMERO2', '+NUMERO3']
    }
};
```

## 📊 SUIVI ET ANALYTICS

### Google Analytics (Optionnel)
Ajoutez avant `</head>` dans `index.html` :
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'REMPLACEZ_PAR_VOTRE_ID');
</script>
```

### Facebook Pixel (Optionnel)
```html
<!-- Facebook Pixel -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'VOTRE_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

## ✅ CHECKLIST FINALE

### Avant Déploiement
- [ ] EmailJS configuré et testé
- [ ] Groupe WhatsApp créé et lien ajouté
- [ ] Numéros de téléphone mis à jour
- [ ] Email de contact changé
- [ ] Réseaux sociaux ajoutés
- [ ] Couleurs personnalisées (optionnel)
- [ ] Logo ajouté (optionnel)
- [ ] Site testé en local
- [ ] Formulaire d'inscription fonctionne
- [ ] QR codes se génèrent
- [ ] Navigation fluide

### Après Déploiement
- [ ] Site accessible via l'URL
- [ ] Formulaire testé en production
- [ ] Emails reçus correctement
- [ ] Liens WhatsApp fonctionnels
- [ ] Mobile responsive
- [ ] Performance correcte

## 🆘 DÉPANNAGE RAPIDE

### EmailJS ne fonctionne pas
1. Vérifiez les IDs (User, Service, Template)
2. Testez le template dans l'interface EmailJS
3. Vérifiez les quotas (100 emails/mois gratuit)
4. Regardez la console développeur (F12)

### Formulaire ne fonctionne pas
1. Ouvrez la console (F12)
2. Vérifiez les erreurs JavaScript
3. Testez avec un autre navigateur
4. Vérifiez que tous les champs requis sont remplis

### Site ne s'affiche pas
1. Vérifiez l'URL de déploiement
2. Videz le cache (Ctrl+F5)
3. Testez en navigation privée
4. Vérifiez les erreurs de console

## 🔐 SÉCURITÉ

### Bonnes Pratiques
- Ne partagez jamais vos clés EmailJS publiquement
- Utilisez des environnements de test pour les tests
- Limitez les domaines autorisés dans EmailJS
- Surveillez vos quotas d'utilisation

### Variables d'Environnement
Pour plus de sécurité, utilisez les variables d'environnement de Netlify/Vercel :
```javascript
// Au lieu de coder en dur
emailjs.init(process.env.EMAILJS_USER_ID);
```

## 📱 FONCTIONNALITÉS AVANCÉES

### PWA (Progressive Web App)
Le site inclut `manifest.json` pour transformer le site en app :
- Installation sur mobile
- Mode hors ligne (si service worker ajouté)
- Icônes d'app personnalisées

### Service Worker (Optionnel)
Créez un fichier `sw.js` pour le cache hors ligne :
```javascript
const CACHE_NAME = 'safoi-v1';
const urlsToCache = [
  '/',
  '/assets/css/style.css',
  '/assets/js/script.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

## 🎯 OPTIMISATION

### Performance
- Compresser les images (PNG -> WebP)
- Minifier CSS/JS pour production
- Utiliser un CDN pour les ressources
- Optimiser les fonts

### SEO
```html
<!-- Méta tags dans <head> -->
<meta name="description" content="SAFOI 2025 - Salon Africain des Orateurs d'Impact. Événement dédié au leadership et à l'art oratoire des jeunes africains.">
<meta name="keywords" content="SAFOI, orateurs, Afrique, leadership, jeunesse, éloquence">
<meta property="og:title" content="SAFOI 2025 - Salon Africain des Orateurs d'Impact">
<meta property="og:description" content="Rejoignez-nous le 23 août 2025 pour l'événement de l'art oratoire en Afrique">
<meta property="og:image" content="https://votre-site.com/assets/images/safoi-og.jpg">
```

---

**💡 Besoin d'aide ? Contactez : safoi.ed2025@gmail.com**