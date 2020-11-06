
import React, { Component } from 'react';
import { StyleSheet, View, Alert, ActivityIndicator, Image } from 'react-native';
import { Card, Input, Button } from "react-native-elements";
import firebase from '../database/firebaseDb';
import { AuthContext } from '../components/context';
export default class SignIn extends Component {
  

  constructor() {
    super();
    this.state = {
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

  userLogin = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Entrez les vos Identifiants!')
    }
    else if (this.state.email === '' || this.state.password === ''){
      Alert.alert('Entrez votre Email et votre Mot de passe!')
    }
    else {
      this.setState({
        isLoading: true,
      })
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {    
          console.log(res)
          console.log('Connexion avec Succes!')
          this.setState({
            isLoading: false,
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
        <Card title="Connexion">
          
          <Input placeholder="Email address..."
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')} />

          <Input  placeholder="Mot de Passe..."
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
            maxLength={15}
            secureTextEntry={true} />

          <Button
            buttonStyle={{
              marginTop: 20, borderRadius: 10,
              backgroundColor: "#095228"
            }}
            title="CONNEXION"
            onPress={() => this.userLogin()}
          />
          <Button
            buttonStyle={{
              marginTop: 20, borderRadius: 10,
              backgroundColor: "#095228"
            }}
            textStyle={{ color: "#095228" }}
            title="ENREGISTREMENT"
            onPress={() => this.props.navigation.navigate('SignUp')}
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
  },

});