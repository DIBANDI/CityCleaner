// App.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './SignIn';
import SignUp from './SignUp';
import SignOut from './SignOut';

const UserStack = createStackNavigator();

const UserStackScreen = ({navigation})=>(
        <UserStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#095228",
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <UserStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ title: 'SignIn' }}
            />
            <UserStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: 'SignUp' }}
            />
            <UserStack.Screen
                name="SignOut"
                component={SignOut}
                options={{ title: 'SignOut' }}
            />
        </UserStack.Navigator>
    );

    export default UserStackScreen;