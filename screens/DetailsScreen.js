import * as React from 'react';
import { View, Text,Button} from 'react-native';

export default function DetailsScreen({ navigation }) {
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details</Text>
        <Button
        onPress={() => navigation.navigate('Login')}
        title="Afficher la page Login"
        />
    </View>
    );
}
