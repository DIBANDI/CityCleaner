import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from "react-native-elements";

export default function ParametreScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>ParametreScreen</Text>    
        <Button
             buttonStyle={{
              marginTop: 2,
              borderRadius: 10,
              backgroundColor: "#095228",
              borderColor:"gray",
              borderWidth:2,
            }}
            title="SCANNER LE QR CODE"
            onPress={() => navigation.navigate('QrcodeScreen')}
          />
          <Button
             buttonStyle={{
              marginTop: 2,
              borderRadius: 10,
              backgroundColor: "#095228",
              borderColor:"yellow",
              borderWidth:2,
            }}
            title="GENERER LE QR CODE"
            onPress={() => navigation.navigate('QrgeneratorScreen')}
          />
    </View>
    );
}
