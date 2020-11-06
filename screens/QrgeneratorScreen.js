import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, TextInput, TouchableOpacity, Text,Button } from 'react-native';
import QRCode from 'react-native-qrcode-generator';

class QrgeneratorScreen extends Component {
    constructor() {
        super();
        this.state = {
            Text_Input: '',
        valueForQRCode: '',
        };
    }

    getTextInputValue = () => {
            this.setState({ valueForQRCode: this.state.Text_Input});
    };

    render() {
        return ( 
        <View style={styles.Container}>
            <Text style= {styles.TextTitle}> URL DU QR CODE</Text>
            <TextInput
               style={styles.TextInput}
               onChangeText={(text)=> this.setState({ Text_Input: text })}
               underlineColorAndroid="transparent"
               placeholder="Entrez les Informations"
               value={this.state.Text_Input}
            />

            <TouchableOpacity onPress={this.getTextInputValue}  activeOpacity={0.7}  style={styles.button}>
                <Text style={styles.TextStyle}> Generer QR Code </Text>
            </TouchableOpacity> 
                <QRCode
                    value = {this.state.valueForQRCode}
                    size ={250}
                    bgColor='green'
                    fgColor='white'                
                />          
        </View>
        );
    }
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        margin:10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:20

    },

    TextInput: {
        height: 40,
        width:'100%',
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius:10,
        marginBottom:10,
        marginTop:10,
        padding: 5,
        textAlign:'center'
    },
    button:{
        width:'100%',
        paddingTop:8,
        paddingBottom:8,
        backgroundColor:'green',
        borderRadius:7,
        marginBottom:20
    },
    TextStyle :{
        color:'#fff',
        textAlign:'center',
        fontSize:18,
    },
    TextTitle :{
        color:'gray',
        textAlign:'center',
        fontSize:18,
    },
});

AppRegistry.registerComponent('QrgeneratorScreen', () => QrgeneratorScreen);

module.exports = QrgeneratorScreen;