
import React, { Component } from "react";
import { Card, Button } from "react-native-elements";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import firebase from "../database/firebaseDb";

class HomeScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection("agents");
    this.state = {
      isLoading: true,
      agentArr: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const agentArr = [];
    querySnapshot.forEach((res) => {
      const { adresseAgent, communeAgent,disponibilite, etat, nomAgent, prenomAgent, telAgent } = res.data();
      agentArr.push({
        key: res.id,
        res,
        adresseAgent,
        communeAgent,
        disponibilite,
        etat,
        nomAgent,
        prenomAgent,
        telAgent,
      });
    });
    this.setState({
      agentArr,
      isLoading: false,
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.agentArr }
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) => (  
            
            <Card>
              <Card.Title style={{fontSize:20, font:'bold', color:"green"}}>{ item.nomAgent }  { item.prenomAgent }</Card.Title>
              <Card.FeaturedSubtitle style={{fontSize:20, font:"bold", color:"green", textAlign:"center", color:"red"}}>{ item.disponibilite }</Card.FeaturedSubtitle>
            <Card.Divider/>
            <Card.Image source={{uri: 'https://www.mairie-lentilly.fr/wp-content/uploads/2019/05/Site-internet-collecte-des-d%C3%A9chets-1024x624.jpg'}} 
             style={{  resizeMode: 'contain', height: 200, width: null, flex: 1 }}/>     
             <Card.Divider/>   
             <Text style={{marginBottom: 8, color:"green"}}>
               { item.adresseAgent }
             </Text>     
            <Button
                buttonStyle={{
                  marginTop: 2,
                  borderRadius: 10,
                  backgroundColor: "#095228",
                }}
                title="VOIR LES DETAILS"
                onPress={() => {
                  this.props.navigation.navigate("EditDetailScreen", {
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
              this.props.navigation.navigate("AddDetailScreen");
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
    backgroundColor: "#F5F5F5",
  },
  main_container: {
    height: 190,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "gray",
    marginBottom: 7,
    borderRadius: 10,
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
    },
  },
});

export default HomeScreen;