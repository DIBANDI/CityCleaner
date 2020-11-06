import * as React from 'react';
import { View, Text,Button} from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>LoginScreen</Text>
        <Button
            onPress={() => navigation.navigate('Home')}
            title="Afficher la page de Home"
        />
    </View>
    );
}
