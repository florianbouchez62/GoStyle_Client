import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground
} from "react-native";

class HorizontalList extends Component {
    render() {
        return (
            <View style={styles.card}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{height: '50%'}}>
                        <View style={{borderRadius: 50, width: 80, height: 80, marginLeft: 20, marginTop: 20}}>
                            <ImageBackground source={{uri: 'data:image/png;base64,' + this.props.imageUri}} style={styles.image} imageStyle={{ borderRadius: 25 }}/>
                        </View>
                    </View>
                    <View style={{height: '20%'}}>
                        <Text style={{marginLeft: 20, fontSize: 24, fontWeight: '700'}}>{this.props.name}</Text>
                    </View>
                    <View style={{height: '30%'}}>
                        <Text style={{marginLeft: 20, fontSize: 18, fontWeight: '700'}}>{this.props.percentage} %</Text>
                    </View>
                </View>
            </View>

        );
    }
}
export default HorizontalList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        width: 200,
        height: 250,
        marginLeft: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    }
})