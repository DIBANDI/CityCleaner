import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text,View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoding';
import firebase from '../database/firebaseDb';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 43.704643;
const LONGITUDE = 7.261933;
const LATITUDE_DELTA = 0.8922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBuLNPAbeiI9DkgLrN0nj2Bexv7f1Ns3WE';


class Example extends Component {
  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [
        {
          latitude: 0,
          longitude: 0,
        },
        {
          latitude: 0,
          longitude: 0,
        },
      ],
    };
    this.mapView = null;
  }

  componentDidMount() {
      const dbRef = firebase.firestore().collection('bac').doc(this.props.navigation.getParam('userkey','NO-ID'))
      dbRef.get().then((res) => {
        if (res.exists) {
          const bac = res.data();
          this.setState({
            key: res.id,
            lati: bac.latitude,
            longt: bac.longitude,
            isLoading: false
          });
        } else {
          console.log("Document does not exist!");
        }
      });

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
              adresse : response.results[0].formatted_address,
              coordinates: [
                {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
                {
                  latitude: this.state.lati,
                  longitude: this.state.longt,
                },
              ],

          });
        });
      }
    );
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

  render() {
    console.log("ce sont vos new" + this.state.longt);
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
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={StyleSheet.absoluteFill}
        ref={c => this.mapView = c}
        onPress={this.onMapPress}
      >
        {this.state.coordinates.map((coordinate, index) =>
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
        )}
        {(this.state.coordinates.length >= 2) && (
          <MapViewDirections
            origin={this.state.coordinates[0]}
             
            destination={this.state.coordinates[this.state.coordinates.length-1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="#4682B4"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
          
            onReady={result => {
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              this.duration = result.duration;
              this.distance = result.distance;
              this.forceUpdate()
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: (width / 20),
                  bottom: (height / 20),
                  left: (width / 20),
                  top: (height / 20),
                }
              });
            }}
            onError={(errorMessage) => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
      <Text style={{ marginBottom:30, fontSize:18, fontWeight:"bold", textAlign:"center", color:"white"}}>
             Distance : {parseFloat(this.distance).toFixed(2)} km.
      </Text>
      <Text style={{ marginBottom:30, fontSize:18, fontWeight:"bold", textAlign:"center" , color:"white"}}>
             Temps : {parseFloat(this.duration).toFixed(2)} min
      </Text>
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
})
export default Example;


