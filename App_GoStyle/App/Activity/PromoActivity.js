import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image } from 'react-native';

export default class App extends Component {

    state = {
        data: ''
     }
     

     componentDidMount = () => {
        fetch('http://192.168.43.245:8000/promotions/',{
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);
           this.setState({
              data: responseJson
           })
        })
        .catch((error) => {
           console.error(error);
        });
     }
     
       renderSeparator = () => {  
           return (  
               <View  
                   style={{  
                       height: 1,  
                       width: "100%",  
                       backgroundColor: "#000",  
                   }}  
               />  
           );  
       };  
       //handling onPress action  
       getListViewItem = (item) => {  
           Alert.alert(item.name, item.description);  
       }  
    
       
       render() {

           return (  

               <View style={styles.container}> 
                     <Text style={styles.titre}>Promotions :</Text>
                     <Text style={styles.info}>(cliquer sur une promotion pour plus de détails){'\n'}</Text>
                   <FlatList  
                       data={this.state.data}
                        keyExtractor={item => item.id}
                       renderItem={
                        ({item}) =>  
                        <Text style = {styles.item} onPress={this.getListViewItem.bind(this, item)}>

                        <Text style = {styles.nameItem}>{item.name}</Text>{'\n'}
                        <Image style = {styles.img} source = {{uri: 'data:image/png;base64,' + item.base64_image}}/>{'\n'}{'\n'}{'\n'}
                        <Text style = {styles.titreh4}>Date de début : </Text><Text style = {styles.libelle}>{item.start_date}</Text>{'\n'}
                        <Text style = {styles.titreh4}>Date de fin : </Text><Text style = {styles.libelle}>{item.end_date}</Text>{'\n'}
                        <Text style = {styles.titreh4}>Remise : </Text><Text style = {styles.libelle}>{item.percentage} %</Text>

                        </Text>
                        }
                       ItemSeparatorComponent={this.renderSeparator}  
                   />  
               </View>  
           );  
       } 
    }
     
   const styles = StyleSheet.create({  
       container: {  
           flex: 1,  
           marginTop: 50,
           alignItems: 'center',
       },  
       item: {  
           paddingTop: 20,
           textAlign: "center", 
           height: 200,  
           width: 300,
       },  
       titre: {
         marginTop: 10,
         fontSize: 36,
         fontWeight: 'bold',
       },
       info: {
        fontSize: 12,
        fontStyle: 'italic',
       },
       libelle: {
         color: 'black'
      },
       img: {
         width: 70, 
         height: 70,
      },
      titreh4: {
        fontWeight: 'bold'
      },
      nameItem: {
        fontWeight: 'bold',
        fontSize: 14
      }
   })
