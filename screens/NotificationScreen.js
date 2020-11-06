import * as React from 'react';
import { View, Text,Button} from 'react-native';

export default function NotificationScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>NotificationScreen</Text>
            <Button
                title="Afficher la page de Notification"
                onPress={() => alert('Buton cliqué')}     
                />
    </View>
    );
 }
