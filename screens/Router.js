/*import des components et dependences*/
import React, { useEffect } from 'react';
import { Alert, StyleSheet, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../components/context'
import firebase from '../database/firebaseDb';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';


/*import des pages*/
import Home from './BottomTab';
import UserStackScreen from './Users';
const Stack = createStackNavigator
const Drawer = createDrawerNavigator();

const AppTabStackScreen = ({navigation})=> (
            <Drawer.Navigator initialRouteName="Home">        
                <Drawer.Screen name="Home" component={ Home } />
           </Drawer.Navigator>
          );

          export default createAppContainer(
            createAnimatedSwitchNavigator(
              {
                AuthLoading: UserStackScreen,
                App: AppTabStackScreen,
              },
              {
                // The previous screen will slide to the bottom while the next screen will fade in
                transition: (
                  <Transition.Together>
                    <Transition.Out
                      type="slide-bottom"
                      durationMs={400}
                      interpolation="easeIn"
                    />
                    <Transition.In type="fade" durationMs={500} />
                  </Transition.Together>
                ),
              },
              {
                initialRouteName: "AuthLoading",
              }
            )
          );
