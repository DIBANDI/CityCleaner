// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import {  Button } from "react-native-elements";
import firebase from '../database/firebaseDb';
import Icon  from 'react-native-vector-icons/Ionicons';
import { color } from 'react-native-reanimated';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            uid: ''
        }
    }

    SignOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('SignIn')
        })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        this.state = {
            displayName: firebase.auth().currentUser.displayName,
            uid: firebase.auth().currentUser.uid
        }
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    Deconnectez Vous Ici, {this.state.displayName}
                </Text>

                <Button
                    buttonStyle={{
                        marginTop: 20, borderRadius: 10,
                        backgroundColor: "white"
                        }}
                    icon={
                        <Icon
                        name="ios-power"
                        size={100}
                        color="#095228"
                        />
                    }
                    onPress={() => this.SignOut()}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
    textStyle: {
        fontSize: 20,
        marginBottom: 20,
        color:"green"
    }
});