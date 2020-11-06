
import React, { Component } from 'react';
import { StyleSheet, ScrollView, 
  ActivityIndicator, View,TouchableHighlight,
  Text, SafeAreaView, FlatList } from 'react-native';
import firebase from '../database/firebaseDb';
import { Card, Button, Image, ListItem  } from "react-native-elements";

class HistoriquePoubelleScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('bac').where('etat', '==', 'vide');
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
         <FlatList
          data={this.state.bacArr }
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) => (         
            <Card>
            <Card.Title style={{fontSize:20, font:'bold', color:"green"}}>{ item.etat }</Card.Title>
            <Card.Divider/>
            <Card.Image source={{uri: 'https://www.mairie-elbeuf.fr/wp-content/uploads/2020/03/visuel-collecte-dechets-01-1200x480.jpg'}} 
             style={{  resizeMode: 'contain', height: 150, width: null, flex: 1 }}/>        
             <Text style={{marginBottom: 8, color:"green"}}>
               { item.description }   {console.log("Voici la clé"+ item.key)}
             </Text>     
          </Card>
          )}
        />
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
})

export default HistoriquePoubelleScreen;