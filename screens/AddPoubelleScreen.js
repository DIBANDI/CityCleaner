
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
import Geocoder from 'react-native-geocoding';
const google_api_key = 'AIzaSyBuLNPAbeiI9DkgLrN0nj2Bexv7f1Ns3WE';

Geocoder.init(google_api_key);
console.disableYellowBox = true;



class AddPoubelleScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("bac");
    this.state = {
      adresse: null,
      description: "",
      etat: "",
      type: "",
      latitude : 0,
      longitude : 0,
      isLoading: false,
      error: null,
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => { 
          position.coords.latitude, 
          position.coords.longitude, 
          position.coords.accuracy,
 
        Geocoder.from({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        .then((response) => {
      
          this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              adresse : response.results[0].formatted_address
          });
        });
      }
    );
    
        }
    
    
  storeBac() {
    if (this.state.etat === "") {
      alert("Remplissez les champs!");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
          adresse: this.state.adresse,
          description: this.state.description,
          etat: this.state.etat,
          type: this.state.type,
          latitude : this.state.latitude,
          longitude : this.state.longitude,
        })
        .then((res) => {
          this.setState({
            adresse: null,
            description: "",
            etat: "",
            type: "",
            longitude:0,
            latitude :0,
            isLoading: false,
          });
          this.props.navigation.navigate("PoubelleScreen");
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
    console.log(this.state.longitude);
    return (
      <ScrollView style={styles.container}>
        <Card>
          <View style={styles.inputGroup}>
            <TextInput
              placeholder={"DESCRIPTION"}
              value={this.state.description}
              onChangeText={(val) => this.inputValueUpdate(val, "description")}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              placeholder={"ETAT"}
              value={this.state.etat}
              onChangeText={(val) => this.inputValueUpdate(val, "etat")}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              placeholder={"TYPE"}
              value={this.state.type}
              onChangeText={(val) => this.inputValueUpdate(val, "type")}
            />
          </View>
          <View style={styles.button}>
            <Button
              buttonStyle={{
                marginTop: 2,
                borderRadius: 10,
                backgroundColor: "#095228",
              }}
              title="CREER BAC"
              onPress={() => this.storeBac()}
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

export default AddPoubelleScreen;
