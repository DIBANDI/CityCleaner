// screens/AddUserScreen.js

import React, { Component} from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View, Image 
} from "react-native";
import { Card, Button } from "react-native-elements";
import firebase from "../database/firebaseDb";

class AddDetailScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("agents");
    this.state = {
      adresseAgent: '',
      communeAgent: '',
      disponibilite:'',
      mailAgent: '',
      nomAgent: '',
      prenomAgent: '',
      telAgent: '',
      isLoading: false,
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeAgent() {
    if (this.state.nomAgent === "") {
      alert("Remplissez les champs!");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
          adresseAgent: this.state.adresseAgent,
          communeAgent: this.state.communeAgent,
          disponibilite:'disponible',
          mailAgent: this.state.mailAgent,
          nomAgent: this.state.nomAgent,
          prenomAgent: this.state.prenomAgent,
          telAgent: this.state.telAgent,
        })
        .then((res) => {
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
          this.props.navigation.navigate("HomeScreen");
        })
        .catch((err) => {
          console.error("Erreur: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#095228" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <Card>
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
              }}
              title="AJOUTER AGENT"
              onPress={() => this.storeAgent()}
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
    padding: 6,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddDetailScreen;
