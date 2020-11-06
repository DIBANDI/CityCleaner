
import React, { Component } from 'react';
import { StyleSheet, View, Alert, ActivityIndicator, Image } from 'react-native';
import { Card, Input, Button } from "react-native-elements";
import firebase from '../database/firebaseDb';


export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Veillez Remplir Les Champs!')
    }
    else if (this.state.email === '' || this.state.password === '') {
      Alert.alert('Entrez votre Email et votre Mot de passe!')
    }
     else {
      this.setState({
        isLoading: true,
      })
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName
          })
          console.log('User registered successfully!')
          this.setState({
            isLoading: false,
            displayName: '',
            email: '',
            password: ''
          })
          this.props.navigation.navigate('HomeScreen')
        })
        .catch(error => this.setState({ errorMessage: error.message, isLoading: false }, Alert.alert('Erreur')))
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#095228" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Image
          style={{ resizeMode: 'stretch', height: 180, width:null, flex: 1, alignItems:'center', alignContent:'center'}}
          source={require('./image/Logo.png')}
        />  
        <Card.Divider/>  
        <Card title="S'ENREGISTRER">
          <Input placeholder="Nom ..." 
            value={this.state.displayName}
            onChangeText={(val) => this.updateInputVal(val, 'displayName')}/>

          <Input placeholder="Adresse Email..." 
            value={this.state.email}
            autoCapitalize={false}
            onChangeText={(val) => this.updateInputVal(val, 'email')}/>

          <Input secureTextEntry placeholder="Mot de Passe..." 
            onChangeText={(val) => this.updateInputVal(val, 'password')}
            maxLength={15}
            secureTextEntry={true}/>
          <Button
            buttonStyle={{
              marginTop: 2, borderRadius: 10,
              backgroundColor: "#095228"
            }}
            title="ENREGISTREMENT"
            onPress={() => this.registerUser()}
          />
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10 
  },

  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

