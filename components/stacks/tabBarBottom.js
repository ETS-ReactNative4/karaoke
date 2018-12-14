import React from 'react';
import { createStackNavigator, createBottomTabNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Inicio from '../views/inicio/inicio';
import Karaoke from '../views/canta/karaoke/karaoke';
import Login from '../views/login/login';
import Canta from '../views/canta/canta';
import Festival from '../views/festival/festival';
import Agenda from '../views/agenda/agenda';
import Musica from '../views/musica/musica';
import Player from '../views/musica/Player';
import Lista from '../views/musica/lista';
import Galeria from '../views/canta/galeria';
import VideoKar from '../views/canta/video';

const MusicaStack = createStackNavigator({
  Musica: {screen: Musica},
  Lista: {screen: Lista},
  Player: {screen: Player}
},{
  headerMode: 'none'
});

const GaleriaStack = createStackNavigator({
  Galeria: {screen: Galeria},
  VideoKar: {screen: VideoKar}
},
{
  headerMode: 'none'
});

const CantaStack = createStackNavigator({
  Canta: {screen: Canta},
  Karaoke: {screen: Karaoke},
},{
  headerMode: 'none'
});

const tabBarBottom = createBottomTabNavigator(
  {
    Inicio: Inicio,
    Musica: MusicaStack,      
    Canta: {screen: CantaStack,
              navigationOptions: () => ({
                tabBarLabel: 'Karaoke'
              }),
            },
    Galeria: GaleriaStack,
    Grilla: Agenda,
    Festival: Festival
  },
  {
    initialRouteName: 'Inicio',
    navigationOptions: ({ navigation }) => ({
      tabBarBottomOnPress: ({ previousScene, scene, jumpToIndex }) => {
        const { route, focused, index } = scene;
        if (focused) {
          if (route.index > 0) {
            const tabRoute = route.routeName;
            const { routeName, key } = route.routes[0];
            navigation.dispatch(
              NavigationActions.navigate({ routeName: tabRoute })
            );
            navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                key,
                actions: [NavigationActions.navigate({ routeName })]
              })
            );
          } else {
            jumpToIndex(index);
          }
        } else {
          jumpToIndex(index);
        }
      },
      tabBarIcon: () => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Inicio') {
          iconName = 'home';
        } else if (routeName === 'Musica') {
          iconName = 'library-music';
        } else if (routeName === 'Grilla') {
          iconName = 'event-note';
        } else if (routeName === 'Canta') {
          iconName = 'videocam';
        } else if (routeName === 'Galeria') {
          iconName = 'videocam';
        } else if (routeName === 'Festival') {
          iconName = 'book';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={'white'}/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      activeBackgroundColor: '#8CA853',
      style: {
        backgroundColor: '#133101',
        borderTopColor: '#8CA853', 
      }
    }
  }
);

const LoginStack = createStackNavigator({ 
  Login: {screen: Login},
  tabBarBottom: {screen: tabBarBottom}
},{
  headerMode: 'none'
});

export default LoginStack;