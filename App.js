import 'react-native-gesture-handler';
import React from 'react';
import Routers from './screens/Routers'

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (    
        <Routers/>
        
    )
  }
}