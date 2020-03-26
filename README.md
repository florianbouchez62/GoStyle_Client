<h1 align="center">
  <br>
  <img src="https://www.apollo-formation.com/wp-content/uploads/react-native-logo-1-216x250.png" alt="GoStyle" width="200">
  <br>
  GoStyle Client
  <br>
</h1>

<h4 align="center">Client for Gostyle application.</h4>

<p align="center">
  <a href="#requirements">Requirements</a> •
  <a href="#get-the-project">Get the project</a> •
  <a href="#project-configuration">Project configuration</a> •
  <a href="#run-on-android">Run on Android</a> •
  <a href="#run-on-ios">Run on iOS</a>
</p>

### Requirements
- Node.js >= 12.16 (npm) : https://nodejs.org/en/
- Android Studio (for android development) : https://developer.android.com/studio
- XCode (for iOS development) : https://developer.apple.com/xcode/
- Expo CLI : `npm install -g expo-cli`
- React Native CLI : `npm install -g react-native-cli`

### Get the project
- `git clone https://github.com/florianbouchez62/GoStyle_Client`
- `cd GoStyle_Client\App_GoStyle\App`
- `npm install`


For the QRCode scan, make sure that your phone is on the same network as your computer hosting the Expo server.
### Configuration du projet
- Copy the file `.env.example` and rename it to `.env`
- Replace the value of `API_URL` with the API URL and `API_PORT` with the API port. 

Example with API hosted at `192.168.1.1:8000` :
````
# GoStyle_Client\App_GoStyle\App\.env
API_URL=192.168.1.1
API_PORT=8000
````
### Run on Android
- In `App` folder execute  `expo start`
- On your phone (require Expo installed on it) :
  - Scan the QR Code on the web page generated by Expo
  - Have fun !
- On virtual device :
  - Open Android Studio (don't open a project)
  - Click on `Configure > AVD Manager`
  - If you haven't an virtual device installed : 
    - Click on `+ Create Virtual Device`
    - Select a device with Play Store
    - Use at least the API 29 image system
    - Finish the install of your virtual device
  - Select your virtual device and click Play
  - On Expo Web Page, click on `Run on Android device/emulator`, the app will install and launch itself on the virtual device.
  - Have fun !
  
### Run on iOS
- On your phone (require Expo installed on it) :
  - In `App` folder execute  `expo start`
  - Scan the QR Code on the web page generated by Expo
  - Have fun !
- On virtual device :
  - Launch XCode
  - Load the file `GoStyle.xcworkspace` on `App\ios`
  - On the top bar, select a virtual device (or your iPhone if it's plugged on USB) and click the Play Button.
  - The virtual device launches itself.
  - Have fun !
  
## License

> [@florianbouchez62](https://github.com/florianbouchez62) &nbsp;&middot;&nbsp;
> [@lucaslemaire](https://github.com/lucaslemaire) &nbsp;&middot;&nbsp;
> [@Maximus40](https://github.com/Maximus40) &nbsp;&middot;&nbsp;
> [@Azelaek](https://github.com/Azelaek) &nbsp;&middot;&nbsp;
> [@fkiecken](https://github.com/fkiecken) &nbsp;&middot;&nbsp;
