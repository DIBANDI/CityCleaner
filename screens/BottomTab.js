/*import des components et dependences*/
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon  from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


/*import des pages*/
import HomeScreen from './HomeScreen';
import ProfilScreen from './MapScreen';
import PoubelleScreen from './PoubelleScreen';
import NotificationScreen from './NotificationScreen';
import ParametreScreen from './ParametreScreen';
import AddDetailScreen from './AddDetailScreen';
import AddPoubelleScreen from './AddPoubelleScreen';
import EditDetailScreen from './EditDetailScreen';
import PoubelleDetailScreen from './PoubelleDetailScreen'

/*import BlogDetails from './BlogDetails';*/


const HomeStack = createStackNavigator();
const ParametreStack = createStackNavigator();
const ProfilStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const PoubelleStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


export default function BottomTab() {

    return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#fff"
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Accueil',
              tabBarColor:"#095228",
              tabBarIcon: ({ color }) => (
                <Icon name="ios-home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Profil"
            component={ProfilStackScreen}
            options={{
              tabBarLabel: 'Profil',
              tabBarColor:"#666666",
              tabBarIcon: ({ color }) => (
                <Icon name="ios-person" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Poubelle"
            component={PoubelleStackScreen}
            options={{
              tabBarLabel: 'Poubelle',
              tabBarColor:"#095228",
              tabBarIcon: ({ color }) => (
                <Icon name="ios-trash" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Parametre"
            component={ParametreStackScreen}
            options={{
              tabBarLabel: 'Parametre',
              tabBarColor:"#03224c",
              tabBarIcon: ({ color }) => (
                <Icon name="ios-settings" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Notification"
            component={NotificationStackScreen}
            options={{
              tabBarLabel: 'Notification',
              tabBarColor:"#095228",
              tabBarIcon: ({ color }) => (
                <Icon name="ios-mail" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      );
}


const HomeStackScreen= ({navigation})=> (
    <HomeStack.Navigator initialRouteName="HomeScreen" screenOptions={{
        headerStyle:{
          backgroundColor:'#095228',
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            fontWeight:"bold"

        }
    }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen}
    options = {{
        title:'Accueil',
        headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#095228"
              onPress={()=>navigation.openDrawer()}
            ></Icon.Button>
          )
    }}/>

<HomeStack.Screen name="AddDetailScreen" component={AddDetailScreen}
    options = {{
        title:'Ajouter Les Details',
        headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#095228"
              onPress={()=>navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-arrow-forward"
              size={25}
              backgroundColor="#095228"
              onPress={()=>navigation.navigate('HomeScreen')}
            ></Icon.Button>
          )
    }}/>
    <HomeStack.Screen name="EditDetailScreen" component={EditDetailScreen}
    options = {{
        title:'Editer Les Details',
        headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#095228"
              onPress={()=>navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-arrow-forward"
              size={25}
              backgroundColor="#095228"
              onPress={()=>navigation.navigate('HomeScreen')}
            ></Icon.Button>
          )
    }}/>
</HomeStack.Navigator>
);

const ParametreStackScreen= ({navigation})=> (
    <ParametreStack.Navigator initialRouteName="Parametre" screenOptions={{
        headerStyle:{
          backgroundColor:'#03224c',
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            fontWeight:"bold"

        }
    }}>
    <ParametreStack.Screen name="Parametre" component={ParametreScreen}
    options = {{
        title:'Parametre',
        headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#03224c"
              onPress={()=>navigation.openDrawer()}
            ></Icon.Button>
          )
    }}/>
</ParametreStack.Navigator>
);

const ProfilStackScreen= ({navigation})=> (
    <ProfilStack.Navigator initialRouteName="Profil" screenOptions={{
        headerStyle:{
          backgroundColor:'#666666',
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            fontWeight:"bold"

        }
    }}>
    <ProfilStack.Screen name="Profil" component={ProfilScreen}
    options = {{
        title:'Profil',
        headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#666666"
              onPress={()=>navigation.openDrawer()}
            ></Icon.Button>
          )
    }}/>
</ProfilStack.Navigator>
);

const NotificationStackScreen= ({navigation})=> (
    <NotificationStack.Navigator initialRouteName="Notification" screenOptions={{
        headerStyle:{
          backgroundColor:'#095228',
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            fontWeight:"bold"

        }
    }}>
    <NotificationStack.Screen name="Notification" component={NotificationScreen}
    options = {{
        title:'Notification',
        headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#095228"
              onPress={()=>navigation.openDrawer()}
            ></Icon.Button>
          )
    }}/>
</NotificationStack.Navigator>
);

const PoubelleStackScreen= ({navigation})=> (
    <PoubelleStack.Navigator initialRouteName="PoubelleScreen" screenOptions={{
        headerStyle:{
          backgroundColor:'#095228',
        },
        headerTintColor:'#fff',
        headerTitleStyle:{
            fontWeight:"bold"

        }
    }}>
    <PoubelleStack.Screen name="PoubelleScreen" component={PoubelleScreen}
    options = {{
        title:'Poubelle',
        headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#095228"
              onPress={()=>navigation.openDrawer()}
            ></Icon.Button>
          )
    }}/>

<HomeStack.Screen name="AddPoubelleScreen" component={AddPoubelleScreen}
    options = {{
        title:'Ajouer Un Bac à Ordure',
        headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#095228"
              onPress={()=>navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-arrow-forward"
              size={25}
              backgroundColor="#095228"
              onPress={()=>navigation.navigate('PoubelleScreen')}
            ></Icon.Button>
          )
    }}/>
<HomeStack.Screen name="PoubelleDetailScreen" component={PoubelleDetailScreen}
    options = {{
        title:'Editer Un Bac à Ordure',
        headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#095228"
              onPress={()=>navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-arrow-forward"
              size={25}
              backgroundColor="#095228"
              onPress={()=>navigation.navigate('PoubelleScreen')}
            ></Icon.Button>
          )
    }}/>
</PoubelleStack.Navigator>
);