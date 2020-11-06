
import React, { Component } from 'react';
import { StyleSheet, ScrollView, 
  ActivityIndicator, View,TouchableHighlight,
  Text, SafeAreaView, FlatList } from 'react-native';
import firebase from '../database/firebaseDb';
import { Card, Button, Image, ListItem  } from "react-native-elements";

class PoubelleScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('bac').where('etat', '!=', 'vide');
    this.state = {
      isLoading: true,
      bacArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const bacArr = [];
    querySnapshot.forEach((res) => {
      const { adresse, description, etat, type } = res.data();
      bacArr.push({
        key: res.id,
        res,
        adresse,
        description,
        etat,
        type,
      });
    });
    this.setState({
      bacArr,
      isLoading: false,
   });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <SafeAreaView style={styles.container}>
         <TouchableHighlight
            style={styles.floatingHistorique}
            underlayColor="#9ccc9c"
            onPress={() => {
              this.props.navigation.navigate("HistoriquePoubelleScreen");
            }}          
           >
          <Text style={{ fontSize: 25, color: "#095228" }}>Voir L'Historique des Bacs </Text>
        </TouchableHighlight>
         <FlatList
          data={this.state.bacArr }
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) => (         
            <Card>
            <Card.Title style={{fontSize:20, font:'bold', color:"green"}}>{ item.etat }</Card.Title>
            <Card.Divider/>
            <Card.Image source={{uri: 'https://roussillon.ca/wp-content/uploads/2019/05/BAC-Bleu_Plan-de-travail-1-1-e1580417663281.jpg'}} 
             style={{  resizeMode: 'contain', height: 200, width: null, flex: 1 }}/>        
             <Text style={{marginBottom: 8, color:"green"}}>
               { item.description }   {console.log("Voici la clé"+ item.key)}
             </Text>     
            <Button
                buttonStyle={{
                  marginTop: 2,
                  borderRadius: 10,
                  backgroundColor: "#095228",
                }}
                title="VOIR LES DETAILS"
                onPress={() => {
                  this.props.navigation.navigate("PoubelleDetailScreen", {
                    userkey: item.key,
                  });
                }}
              />
          </Card>
          )}
        />
     
      <TouchableHighlight
            style={styles.floatingButton}
            underlayColor="#9ccc9c"
            onPress={() => {
              this.props.navigation.navigate("AddPoubelleScreen");
            }}          
           >
          <Text style={{ fontSize: 25, color: "#095228" }}>+</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
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
  floatingButton: {
    backgroundColor: "#ffffff",
    borderColor: "#095228",
    borderWidth:3,
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom:15,
    left:150,
    shadowColor: "#095228",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
      marginTop: 50,
    }
  },
  floatingHistorique: {
    backgroundColor: "#ffffff",
    borderColor: "#095228",
    borderWidth:3,
    height: 40,
    width: 330,
    borderRadius: 60 / 4,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top:15,
    marginBottom:20,
    left:15,
    shadowColor: "#095228",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
      marginTop: 50,
    }
  }
})

export default PoubelleScreen;