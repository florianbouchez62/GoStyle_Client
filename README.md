# GoStyle_Client

L'application cliente (iOS, Android) de l'API GoStyle !

### Requirements
- Node.js >= 12.16 (npm) : https://nodejs.org/en/
- Android Studio (pour développement android) : https://developer.android.com/studio
- XCode (pour développement iOS) : https://developer.apple.com/xcode/
- Expo CLI : `npm install -g expo-cli`
- React Native CLI : `npm install -g react-native-cli`

### Récupérer le projet
- `git clone https://github.com/florianbouchez62/GoStyle_Client`
- `cd GoStyle_Client\App_GoStyle\App`
- `npm install`

Pour le scan de QRCode, veillez à ce que votre téléphone soit sur le même réseau que votre ordinateur hébergeant le serveur Expo.

### Configuration du projet
- Copier le fichier `.env.example` et le renommer en `.env`
- Remplacer le contenu de la variable `API_URL` avec l'URL de l'API et `API_PORT` avec le port de l'API. 

Exemple, si l'URL de l'API est `192.168.1.1:8000`, écrire ceci :
````
# GoStyle_Client\App_GoStyle\App\.env
API_URL=192.168.1.1
API_PORT=8000
````
### Run on Android
- Dans `App` éxécuter la commande `expo start`
- Sur votre téléphone (requiert Expo sur votre téléphone) :
  - Scanner le QR Code sur la page web générée par Expo
  - Have fun !
- Sur Emulateur :
  - Ouvrir Android Studio (inutile de charger un projet)
  - Cliquer sur `Configure > AVD Manager`
  - Si vous n'avez pas installé d'émulateur : 
    - Cliquer sur `+ Create Virtual Device`
    - Sélectionner un téléphone avec le Play Store
    - Utiliser l'image système API 29 au minimum
    - Terminer l'installation de l'émulateur
  - Sélectionnez votre émulateur et cliquez sur Play
  - Sur la page web Expo, cliquez sur `Run on Android device/emulator`, l'application s'installera et se lancera sur l'émulateur.
  - Have fun !
  
### Run on iOS
- Sur votre téléphone (requiert Expo sur votre téléphone)
  - Dans `App` exécuter la commande `expo start`
  - Scanner le QR Code sur la page web générée par Expo
  - Have fun !
- Sur Emulateur :
  - Ouvrir XCode
  - Charger le fichier `GoStyle.xcworkspace` sous `App\ios'
  - Dans la barre du haut, sélectionner un émulateur (ou votre téléphone iOS si il est branché en USB) et cliquer sur Play.
  - L'émulateur se lance automatiquement.
  - Have fun !
