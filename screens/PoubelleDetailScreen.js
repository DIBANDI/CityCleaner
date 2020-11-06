// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';
import { Card, Button } from "react-native-elements";

class PoubelleDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      adresse: '',
      description: '',
      etat: '',
      type: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('bac').doc(this.props.navigation.getParam('userkey','NO-ID'))
    dbRef.get().then((res) => {
      if (res.exists) {
        const bac = res.data();
        this.setState({
          key: res.id,
          adresse: bac.adresse,
          description: bac.description,
          etat: bac.etat,
          type: bac.type,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateBac() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('bac').doc(this.props.navigation.getParam('userkey','NO-ID'));
    updateDBRef.set({
      adresse: this.state.adresse,
      description: this.state.description,
      etat: this.state.etat,
      type: this.state.type,
    }).then((docRef) => {
      this.setState({
        key: '',
        adresse: '',
        description: '',
        etat: '',
        type: '',
        isLoading: false,
      });
      this.props.navigation.navigate('PoubelleScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }


  viderBac() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('bac').doc(this.props.navigation.getParam('userkey','NO-ID'));
    updateDBRef.set({
      adresse: this.state.adresse,
      description: 'Bac à ordure Vidé',
      etat: 'vide',
      type: this.state.type,
    }).then((docRef) => {
      this.setState({
        key: '',
        adresse: '',
        description: '',
        etat: '',
        type: '',
        isLoading: false,
      });
      this.props.navigation.navigate('PoubelleScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteBac() {
    const dbRef = firebase.firestore().collection('bac').doc(this.props.navigation.getParam('userkey','NO-ID'))
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('PoubelleScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Bac',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteBac()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }


  confirmervidageAlert=()=>{
    Alert.alert(
      'Vider ce Bac',
      'Confirmez vous vider ce Bac?',
      [
        {text: 'Yes', onPress: () => this.viderBac()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#095228"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Card title="DETAIL BAC">
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Adresse'}
              value={this.state.adresse}
              onChangeText={(val) => this.inputValueUpdate(val, 'adresse')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Description'}
              value={this.state.description}
              onChangeText={(val) => this.inputValueUpdate(val, 'description')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Etat'}
              value={this.state.etat}
              onChangeText={(val) => this.inputValueUpdate(val, 'etat')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Type'}
              value={this.state.type}
              onChangeText={(val) => this.inputValueUpdate(val, 'type')}
          />
        </View>
        <View style={styles.button}>
          <Button
             buttonStyle={{
              marginTop: 2,
              borderRadius: 10,
              backgroundColor: "#095228",
              borderColor:"yellow",
              borderWidth:2,
            }}
            title='Mise à Jour'
            onPress={() => this.updateBac()} 
          />
          </View>
          <View style={styles.button}>
          <Button
           buttonStyle={{
            marginTop: 2,
            borderRadius: 10,
            backgroundColor: "#095228",
            borderColor:"blue",
            borderWidth:2,
          }}
            title='Vider Bac'
            onPress={this.confirmervidageAlert} 
          />
          </View>
         <View>
          <Button
           buttonStyle={{
            marginTop: 2,
            borderRadius: 10,
            backgroundColor: "#095228",
            borderColor:"red",
            borderWidth:2,
          }}
            title='Suppression'
            borderBottomColor='green'
            onPress={this.openTwoButtonAlert}
            color="#850606"
          />
        </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#095228',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  }
})

export default PoubelleDetailScreen;