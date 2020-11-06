// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { Alert, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';
import { Card, Button } from "react-native-elements";

class EditDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      adresseAgent: '',
      communeAgent: '',
      disponibilite:'',
      mailAgent: '',
      nomAgent: '',
      prenomAgent: '',
      telAgent: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('agents').doc(this.props.navigation.getParam('userkey','NO-ID'))
    dbRef.get().then((res) => {
      if (res.exists) {
        const agents = res.data();
        this.setState({
          key: res.id,
          adresseAgent: agents.adresseAgent,
          communeAgent: agents.communeAgent,
          disponibilite:agents.disponibilite,
          mailAgent: agents.mailAgent,
          nomAgent: agents.nomAgent,
          prenomAgent: agents.prenomAgent,
          telAgent: agents.telAgent,
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

  updateAgents() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('agents').doc(this.state.key);
    updateDBRef.set({
          adresseAgent: this.state.adresseAgent,
          communeAgent: this.state.communeAgent,
          disponibilite:this.state.disponibilite,
          mailAgent: this.state.mailAgent,
          nomAgent: this.state.nomAgent,
          prenomAgent: this.state.prenomAgent,
          telAgent: this.state.telAgent,
    }).then((docRef) =>
    {
      this.setState({
        adresseAgent: '',
        communeAgent: '',
        disponibilite:'',
        mailAgent: '',
        nomAgent: '',
        prenomAgent: '',
        telAgent: '',
        isLoading: false,
      });
      this.props.navigation.navigate('HomeScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteAgents() {
    const dbRef = firebase.firestore().collection('agents').doc(this.props.navigation.getParam('userkey','NO-ID'))
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('HomeScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Agent',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteAgents()},
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
      <Card title="DETAIL AGENT">
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Adresse Agent'}
              value={this.state.adresseAgent}
              onChangeText={(val) => this.inputValueUpdate(val, 'adresseAgent')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Commune Agent'}
              value={this.state.communeAgent}
              onChangeText={(val) => this.inputValueUpdate(val, 'communeAgent')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Disponibilite Agent'}
              value={this.state.disponibilite}
              onChangeText={(val) => this.inputValueUpdate(val, 'disponibilite')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Mail Agent'}
              value={this.state.mailAgent}
              onChangeText={(val) => this.inputValueUpdate(val, 'mailAgent')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Nom Agent'}
              value={this.state.nomAgent}
              onChangeText={(val) => this.inputValueUpdate(val, 'nomAgent')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Prenom Agent'}
              value={this.state.prenomAgent}
              onChangeText={(val) => this.inputValueUpdate(val, 'prenomAgent')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Telephone Agent'}
              value={this.state.telAgent}
              onChangeText={(val) => this.inputValueUpdate(val, 'telAgent')}
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
            title='Mise à jour'
            onPress={() => this.updateAgents()} 
            color="#095228"
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
    padding: 6
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
export default EditDetailScreen;

