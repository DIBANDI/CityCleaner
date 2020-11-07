import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import firebase from '../database/firebaseDb';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 43.696795;
const LONGITUDE = 7.276599;
const LATITUDE_DELTA = 0.8922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

class MapScreen extends React.Component {
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
      const { adresse, description, etat, type, latitude, longitude } = res.data();
      bacArr.push({
        key: res.id,
        res,
        adresse,
        description,
        etat,
        type,
        latitude,
        longitude,
      });
    });
    this.setState({
      bacArr,
      isLoading: false,
   });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
         provider={PROVIDER_GOOGLE}
         zoomEnabled={true}
         zoomControlEnabled={true}
         pitchEnabled={true}
         showsUserLocation={true}
         followsUserLocation={true}
         showsCompass={true}
         showsBuildings={true}
         showsTraffic={true}
         showsIndoors={true}
         mapType="hybrid"
          ref={ref => {
            this.map = ref;
          }}
          onMapReady={() => {this.map.fitToCoordinates([{latitude: this.state.latitude, longitude: this.state.longitude}], {
            edgePadding: { top: 50, right: 50, bottom: 120, left: 50 },
            animated: true
          })}}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
     {this.state.bacArr.map((marker, index) => (
        <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude, }}
            title={ marker.adresse }
            description={ marker.description } 
            onPress={() => {
              this.props.navigation.navigate("DirectionScreen", {
                userkey: marker.key,
              });
            }}
            />
        
         ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
