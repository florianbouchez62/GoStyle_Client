import React, { Component } from 'react';
import { Text, View, Linking, TouchableHighlight, PermissionsAndroid, Platform, StyleSheet} from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
//export const value = () => 'this.state.qrvalue'
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      //variable qui contient la valeur du qrcode
      data : '',
      qrvalue: '',
      opneScanner: false,
    };
  }
  onOpenlink() {
    //Fonction pour ouvrir l'URL si une URL est scanné
    Linking.openURL(this.state.qrvalue);
    //Linking used to open the URL in any browser that you have installed
  }

getAPIResult(link){

}

  onBarcodeScan(qrvalue) {
    //Si le scan est réussi
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
    fetch(qrvalue,{
      method: 'GET'
   })
   .then((response) => response.json())
   .then((responseJson) => {
      console.log(responseJson);
      let today = new Date();

      var dateDebut = new Date(responseJson.start_date);
      var dateFin = new Date(responseJson.end_date);
      let dateDebutFormat=dateDebut.getDate() + "/"+ parseInt(dateDebut.getMonth()+1) +"/"+dateDebut.getFullYear() + " " + dateDebut.getHours()+"h"+dateDebut.getMinutes();
      let dateFinFormat=dateFin.getDate() + "/"+ parseInt(dateFin.getMonth()+1) +"/"+dateFin.getFullYear() +" "+ dateFin.getHours()+"h"+dateFin.getMinutes();

      this.setState({dateDebut : dateDebutFormat})
      this.setState({dateFin : dateFinFormat})
      this.setState({
         data: responseJson
      })
   })
   .catch((error) => {
      console.error(error);
   });

  }
ajoutCode(value){

}
  onOpneScanner() {
    var that =this;
    //Pour lancer le scan
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'GoStyle App Camera Permission',
              'message': 'GoStyle App a besoin d/acceder a la camera'
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Si l'accé est autoriser
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("Permission refusée");
          }
        } catch (err) {
          alert("Erreur de permission",err);
          console.warn(err);
        }
      }
      //Appeller la fonction de la caméra
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }
  }
  render() {
    let displayModal;
    //Si le scanner n'es pas lancer
    if (!this.state.opneScanner) {


      return (
        <View style={styles.container}>
            <Text style={styles.heading}>Scanner un code</Text>
            <Text>{this.state.qrvalue ? ''+this.state.data.libelle : null}</Text>
            <Text>{this.state.qrvalue ? '-'+this.state.data.pourcentage+'%' : null}</Text>
            <Text>{this.state.qrvalue ? ''+this.state.data.description : null}</Text>
            <Text>{this.state.qrvalue ? 'Début : '+this.state.dateDebut : null}</Text>
            <Text>{this.state.qrvalue ? 'Fin : '+this.state.dateFin : null}</Text>

            {this.state.qrvalue ?

            <TouchableHighlight
              onPress={() => this.ajoutCode(this.state.qrvalue)}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Ajouter a la liste de code</Text>
            </TouchableHighlight>
          : <Text></Text>}


            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Lancer le scanner</Text>
            </TouchableHighlight>
        </View>

      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={false}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: {
    color: 'black',
    fontSize: 24,
    alignSelf: 'center',
    padding: 10,
    marginTop: 30
  },
  simpleText: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    padding: 10,
    marginTop: 16
  }
});
