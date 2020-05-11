import React from 'react'
import {View, StyleSheet, Text, Image, Dimensions,} from 'react-native'


const {width, height} = Dimensions.get('window')

const CarouselItem = ({item}) => {
    return(
        <View style = {styles.cardView}>
            <Image style = {styles.image} source = {{uri: item.url}}/>
            <View style = {styles.textView}>
                <Text style = {styles.itemTitle}>{item.title}</Text>
                <Text style = {styles.itemDescription}>{item.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex:1,
        width: width - 20,
        height: height / 4,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5
    },

    textView: {
        position: 'absolute',
        bottom: 10,
        marginTop: 10,
        left: 5,

    },

    image: {
        width: width - 20,
        height: height /4,
        borderRadius: 10
    },

    itemTitle: {
        color: '#b75f5e',
        fontSize: 25,
        fontWeight: "bold",
        elevation: 5,
        textShadowColor: 'black',
 textShadowOffset: {width: 0, height: 0},
 textShadowRadius: 1

    },

    itemDescription: {
        color: 'black',
        fontSize: 20,
        fontWeight: "bold",
    }
})

export default CarouselItem
