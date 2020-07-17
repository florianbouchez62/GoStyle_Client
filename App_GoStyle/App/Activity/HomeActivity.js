import React, {Component} from 'react'
import { 
      StyleSheet,
      Text,
      View,
      Image,
      ScrollView,
      Button,
      TouchableOpacity,
      ActivityIndicator
    } from 'react-native'
import {
      withNavigation
    } from 'react-navigation'
import {API_URL, API_PORT, APP_TOKEN} from 'react-native-dotenv';
import HorizontalList from '../Component/HorizontalList'


class HomeActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      TopPromotions: []
    }
    this.refreshTopPromotions();
  }

  componentDidMount() {
    const {addListener} = this.props.navigation;
    this.listeners = [
      addListener('didfocus', () => {
        this.refreshTopPromotions();
      })
    ]
  }

  refreshTopPromotions = () => {
    const requestUrl = "http://" + API_URL + ":" + API_PORT + "/top3-promotions/"
    const request = async() => {
      const reqHeaders = new Headers();
      reqHeaders.append("Authorization", ("token " + APP_TOKEN));
      const head = {method: 'GET',
                    headers: reqHeaders,
                    mode: 'cors',
                    cache: 'default'};
      const response = await fetch(requestUrl, head);
      if(response.status >= 200 && response.status < 300){
          const json = await response.json();
          promotions = []
          json.forEach(element => {
            promotions.push({'desc': element.description, 'percentage': element.percentage, 'imageUri': element.base64_image});
          });
          this.setState({
            loading: false,
            TopPromotions: promotions
          })
      } else {
          alert('Impossible de récupérer les promotion');
      }
    };
    request().then();
  }

  render() {
    if(this.state.loading){
      return( 
        <View style={styles.loader}> 
          <ActivityIndicator size="large" color="#ecf0f1"/>
        </View>
    )}
    return (
      <ScrollView
        scrollEventThrottle={16}
        style={styles.scrollview}
      >
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/mspr_logo.png')} 
              style={styles.logo}
            />
          </View>
          <View style={styles.card}>
            <Text style={styles.card_title}>Une liste de vos promotions</Text>
            <Text style={styles.card_subtitle}>Récuperez une promotion</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Promo')} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Ma liste</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Top promotions</Text>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {
                this.state.TopPromotions.map((item, index) => (
                  <HorizontalList
                    imageUri={item.imageUri}
                    name={item.name}
                    percentage={item.percentage}
                    key={item}
                  />
                ))
              }
            </ScrollView>
          </View>
        </View>
      </ScrollView>
  );
  }
}

export default withNavigation(HomeActivity);

const styles = StyleSheet.create({
  scrollview:{
    backgroundColor: '#ecf0f1'
  },
  loader: {
    marginTop: 50
  }, 
  container:{
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 20
  },
  logo:{
    width: 200,
    height: 150
  },
  card:{
    height: 150, 
    backgroundColor: '#b74a4a',
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  card_title:{
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginLeft: 20,
    marginTop: 20
  },
  card_subtitle:{
    fontSize: 15,
    fontWeight: '400',
    color: 'white',
    marginLeft: 20,
    marginTop: 5
  },
  appButtonContainer:{
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 10,
    width: 100,
    marginLeft: 20,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText:{
    fontSize: 17,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
  },
  button:{
    borderRadius: 50,
    width: 120,
    height: 50,
    marginLeft: 20,
    marginTop: 20,
    backgroundColor: 'white'
  },
  title:{
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 30
  }
});
