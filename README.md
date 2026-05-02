# P3 Story Generator - PWA

Application web installable sur iPhone et Android.

## Fichiers à uploader sur GitHub

1. `index.html` - L'application principale
2. `manifest.webmanifest` - Métadonnées PWA
3. `service-worker.js` - Mode offline et cache
4. `icon-192.png` - Icône Android
5. `icon-512.png` - Icône Android haute résolution
6. `apple-touch-icon.png` - Icône iPhone

## Installation sur iPhone (Safari)

1. Ouvre `https://74pqm49924-ai.github.io/p3-story-gen/`
2. Une bannière dorée apparaîtra automatiquement après 3 secondes
3. Suis les instructions : appuie sur **Partager** ⬆️ puis **"Sur l'écran d'accueil"**
4. L'app apparaît avec l'icône P3 dorée
5. Ouvre-la depuis l'écran d'accueil : plein écran, sans barre Safari, comme une vraie app

## Installation sur Android (Chrome)

1. Ouvre la même URL
2. Chrome propose automatiquement "Ajouter à l'écran d'accueil"
3. Confirme

## Mise à jour

Quand on fait une nouvelle version, change le numéro `CACHE_VERSION` dans `service-worker.js` (par exemple `p3-story-v9-2`). Les utilisateurs récupèreront la nouvelle version automatiquement.
