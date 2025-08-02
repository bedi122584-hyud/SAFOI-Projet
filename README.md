# 🎯 SAFOI 2025 - Site Web Officiel

**Salon Africain des Orateurs d'Impact**  
*Jeunesse, Leadership et Impact : l'Art Oratoire comme moteur de transformation*

## 📅 Informations de l'Événement

- **Date :** Samedi 23 Août 2025
- **Horaires :** 08h00 - 16h00
- **Lieu :** Amphithéâtre A du District, Université Félix Houphouët-Boigny, Cocody, Abidjan
- **Participants attendus :** 1000+

## 🚀 Déploiement Rapide

### Option 1: Netlify (Recommandé)
1. Allez sur [netlify.com](https://netlify.com)
2. Créez un compte gratuit
3. Glissez-déposez le fichier `index.html` sur Netlify
4. Votre site sera en ligne en quelques secondes !

### Option 2: Vercel
1. Créez un compte sur [vercel.com](https://vercel.com)
2. Importez le projet depuis GitHub ou uploadez directement
3. Déploiement automatique

### Option 3: GitHub Pages
1. Créez un repository GitHub
2. Uploadez tous les fichiers
3. Activez GitHub Pages dans les paramètres du repository

## ⚙️ Configuration Requise

### EmailJS (Pour l'envoi automatique d'emails)
1. Créez un compte sur [emailjs.com](https://emailjs.com)
2. Configurez votre service email (Gmail, Outlook, etc.)
3. Créez un template d'email
4. Remplacez dans `index.html` :
   ```javascript
   emailjs.init("VOTRE_USER_ID");
   emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', emailParams)
   ```

### Variables à Personnaliser
```javascript
// Dans index.html, remplacez :
whatsapp_link: 'https://chat.whatsapp.com/VOTRE_LIEN_GROUPE'
tel:+VOTRE_NUMERO_PRINCIPAL
href="mailto:safoi.ed2025@gmail.com"
```

## 📧 Template d'Email Suggéré

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .header { background: linear-gradient(135deg, #4CAF50, #FF9800); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { background: #f8f9fa; padding: 15px; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Bienvenue au SAFOI 2025 !</h1>
    </div>
    <div class="content">
        <p>Bonjour <strong>{{to_name}}</strong>,</p>
        <p>Merci pour votre inscription au Salon Africain des Orateurs d'Impact !</p>
        
        <h3>📅 Détails de l'Événement :</h3>
        <ul>
            <li><strong>Date :</strong> {{event_date}}</li>
            <li><strong>Lieu :</strong> {{event_location}}</li>
            <li><strong>Votre ID :</strong> {{participant_id}}</li>
        </ul>

        <h3>🕐 Programme :</h3>
        <pre>{{programme}}</pre>

        <h3>📱 Rejoignez notre communauté :</h3>
        <p><a href="{{whatsapp_link}}" style="background: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Groupe WhatsApp SAFOI</a></p>
    </div>
    <div class="footer">
        <p>🌍 SAFOI - Salon Africain des Orateurs d'Impact</p>
        <p>Email: safoi.ed2025@gmail.com</p>
    </div>
</body>
</html>
```

## 🎨 Personnalisation

### Modifier les Couleurs
```css
:root {
    --primary-green: #4CAF50;    /* Vert principal */
    --primary-orange: #FF9800;   /* Orange principal */
    --primary-red: #F44336;      /* Rouge principal */
    --dark-text: #333;           /* Texte sombre */
    --light-bg: #f8f9fa;         /* Arrière-plan clair */
}
```

### Ajouter Votre Logo
1. Placez votre logo dans le dossier `assets/images/`
2. Remplacez dans le header :
```html
<div class="logo">
    <img src="assets/images/safoi-logo.png" alt="SAFOI" height="80">
    <!-- Ou gardez le logo textuel existant -->
</div>
```

## 📊 Fonctionnalités Incluses

✅ **Inscription en ligne** avec validation  
✅ **Génération de QR codes** automatique  
✅ **Envoi d'emails** de confirmation  
✅ **Section critiques** post-événement  
✅ **Design responsive** (mobile, tablette, desktop)  
✅ **Animations** et effets modernes  
✅ **Navigation fluide** avec ancres  
✅ **Système de notation** par étoiles  
✅ **Stockage local** des feedbacks  
✅ **Liens sociaux** intégrés  

## 🔧 Support Technique

### Problèmes Courants

**1. Les emails ne s'envoient pas**
- Vérifiez votre configuration EmailJS
- Assurez-vous que les IDs sont corrects
- Testez d'abord avec un template simple

**2. Le site ne s'affiche pas correctement sur mobile**
- Vérifiez que la meta viewport est présente
- Testez sur plusieurs navigateurs

**3. Les formulaires ne fonctionnent pas**
- Vérifiez la console développeur (F12)
- Assurez-vous que JavaScript est activé

### Contact Support
- **Email :** safoi.ed2025@gmail.com
- **Téléphone :** +225 07 59 178 676

## 📈 Statistiques et Suivi

Le site inclut un système de suivi local des inscriptions et feedbacks. Pour un suivi plus avancé, vous pouvez intégrer :

- **Google Analytics** pour le trafic
- **Google Sheets API** pour les inscriptions
- **Airtable** pour la gestion des données

## 🎯 Roadmap

### Version 1.0 (Actuelle)
- [x] Site vitrine complet
- [x] Formulaire d'inscription
- [x] Système de feedback
- [x] Design responsive

### Version 1.1 (À venir)
- [ ] Intégration paiement en ligne
- [ ] Dashboard administrateur
- [ ] Notifications push
- [ ] Chat en temps réel

## 📄 Licence

Ce projet est développé spécifiquement pour le SAFOI 2025.  
Tous droits réservés © 2025 SAFOI.

## 🤝 Contribution

Pour contribuer au projet :
1. Contactez l'équipe SAFOI
2. Proposez vos améliorations
3. Respectez les guidelines de design

---

**Développé avec ❤️ pour l'émergence d'une jeunesse africaine éloquente et confiante.**