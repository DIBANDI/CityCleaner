import React from 'react'

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { createBottomTabNavigator } from "react-navigation-tabs";
 
import { createStackNavigator } from "react-navigation-stack";
import { FontAwesome } from "react-native-vector-icons";
import Icon  from 'react-native-vector-icons/Ionicons';
import { Image } from "react-native"
import { Button } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";

//Importation des vues
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import PoubelleScreen from './PoubelleScreen';
import NotificationScreen from './NotificationScreen';
import ParametreScreen from './ParametreScreen';
import AddDetailScreen from './AddDetailScreen';
import AddPoubelleScreen from './AddPoubelleScreen';
import EditDetailScreen from './EditDetailScreen';
import PoubelleDetailScreen from './PoubelleDetailScreen';
import HistoriquePoubelleScreen from './HistoriquePoubelleScreen';
import SignUp from "./SignUp";
import SignOut from "./SignOut";
import SignIn from "./SignIn";
import QrcodeScreen from "./QrcodeScreen";
import QrgeneratorScreen from "./QrgeneratorScreen";
import DirectionScreen from "./DirectionScreen";


/*----------------CETTE PARTIE CONCERNE LA TOP TAB BAR----------------------------*/

const AuthentificationStack = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "S'AUTHENTIFIER",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      }
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "S'ENREGISTRER",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
  SignOut: {
    screen: SignOut,
    navigationOptions: {
      title: "SE DECONNECTER",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
});

const NotificationScreenStack = createStackNavigator({
    NotificationScreen: {
    screen: NotificationScreen,
    navigationOptions: {
      title: "Notification",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
});

const ParametreScreenStack = createStackNavigator({
    ParametreScreen: {
    screen: ParametreScreen,
    navigationOptions: {
      title: "Parametre",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
  QrcodeScreen: {
    screen: QrcodeScreen,
    navigationOptions: {
      title: "SCANNER LE QR CODE",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
  QrgeneratorScreen: {
    screen: QrgeneratorScreen,
    navigationOptions: {
      title: "GENERER LE QR CODE",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
});

const MapScreenStack = createStackNavigator({
    MapScreen: {
    screen: MapScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Map",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
     /* headerLeft: () => (
        <FontAwesome
          name="bars"
          size={20}
          style={{ padding: 10, color: "#FFFFFF" }}
          onPress={() => navigation.toggleDrawer()}
        />
      ),*/
    }),
  },
  DirectionScreen: {
    screen: DirectionScreen,
    navigationOptions: {
      title: "DIRECTION ",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
});

    const PoubelleScreenStack  = createStackNavigator({
        PoubelleScreen: {
          screen: PoubelleScreen,
          navigationOptions:{
            title: "LISTE DES BACS",
            headerStyle: {
              backgroundColor: "#095228",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          },
        },
         HistoriquePoubelleScreen: {
          screen: HistoriquePoubelleScreen,
          navigationOptions: {
            title: "VOIR HISTORIQUE BAC ",
            headerStyle: {
              backgroundColor: "#095228",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          },
        },
        PoubelleDetailScreen: {
          screen: PoubelleDetailScreen,
          navigationOptions: {
            title: "VOIR DETAILS BAC ",
            headerStyle: {
              backgroundColor: "#095228",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          },
        },
        AddPoubelleScreen: {
          screen: AddPoubelleScreen,
          navigationOptions: {
            title: "AJOUTER UN BAC ",
            headerStyle: {
              backgroundColor: "#095228",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          },
        },
      });

const HomeScreenStack = createStackNavigator({
    HomeScreen: {
    screen: HomeScreen,
    navigationOptions:{
      title: "ACCUEIL ",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
  EditDetailScreen: {
    screen: EditDetailScreen,
    navigationOptions: {
      title: "VOIR DETAILS ",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
  AddDetailScreen: {
    screen: AddDetailScreen,
    navigationOptions: {
      title: "AJOUTER UN AGENT ",
      headerStyle: {
        backgroundColor: "#095228",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    },
  },
});

const SignOutScreenStack = createStackNavigator({
  MapScreen: {
  screen: SignOut,
  navigationOptions: ({ navigation }) => ({
    title: "Deconnexion",
    headerStyle: {
      backgroundColor: "#095228",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  }),
},
});

/*----------------------------------------------------------------------------------*/

/*-----------------------------CETTE PARTIE CONCERNE LA BOTTOM TAB BAR----------------------------*/

const BarDeNavigationpremier = createBottomTabNavigator(
  {
    Accueil: {
      screen: HomeScreenStack,
      navigationOptions:{
        tabBarLabel: 'Accueil',
        tabBarColor:"#095228",
        tabBarIcon: ({ tintColor  }) => (
          <Icon name="ios-home" color={tintColor } size={26} />
        ),
      }
    },
    Poubelle: {
      screen: PoubelleScreenStack,
      navigationOptions: {
        tabBarLabel: 'Poubelle',
        tabBarColor:"#095228",
        tabBarIcon: ({ tintColor  }) => (
            <Icon name="ios-trash" color={tintColor } size={26} />
        ),
      },
    },
   
    Map: {
      screen: MapScreenStack,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarColor:"#666666",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-pin" color={tintColor } size={26} />
        ),
      },
    },
    Parametre: {
      screen: ParametreScreenStack,
      navigationOptions: {
        tabBarLabel: 'Parametre',
        tabBarColor:"#03224c",
        tabBarIcon: ({ tintColor  }) => (
         <Icon name="ios-settings" color={tintColor } size={26} />
        ),
      },
    },
    SignOut: {
      screen: SignOutScreenStack,
      navigationOptions: {
        tabBarLabel: 'Deconnexion',
        tabBarColor:"#095228",
        tabBarIcon: ({ tintColor  }) => (
          <Icon name="ios-power" color={tintColor } size={26} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: true,
      showIcon: true,
      activeBackgroundColor: "#095228",
      inactiveBackgroundColor: "#095228",
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "gray",
    },
  }
);
 

/*---------------------------------------------------------------------------------*/

/*----------------CETTE PARTIE CONCERNE L'APPEL DES FONCTION----------------------------*/

export default createAppContainer(
    
  createAnimatedSwitchNavigator(
    {
      AuthLoading: AuthentificationStack,
      App: BarDeNavigationpremier,
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