import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DrawerScreen from './drawerScreen';
import Inicio from '../views/inicio/inicio';
import Karaoke from '../views/canta/karaoke/karaoke';
import Login from '../views/login/login';
import Canta from '../views/canta/canta';
import Festival from '../views/festival/festival';
import Agenda from '../views/agenda/agenda';
import Musica from '../views/musica/musica';
import Player from '../views/musica/Player';
import Lista from '../views/musica/lista';



const MusicaStack = createStackNavigator({
  Musica: {screen: Musica},
  Lista: {screen: Lista},
  Player: {screen: Player}
},{
  headerMode: 'none'
});

const VideoStack = createStackNavigator({
  Canta: {screen: Canta},
  Karaoke: {screen: Karaoke}
},{
  headerMode: 'none'
});

const tabBarBottom = createBottomTabNavigator(
  {
    Inicio: Inicio,
    Musica: MusicaStack,      
    Canta: {screen: VideoStack,
            navigationOptions: () => ({
              tabBarLabel: 'Karaoke'
            })},
    Agenda: Agenda,
    Festival: Festival
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({}) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Inicio') {
          iconName = 'home';
        } else if (routeName === 'Musica') {
          iconName = 'library-music';
        } else if (routeName === 'Agenda') {
          iconName = 'event-note';
        } else if (routeName === 'Canta') {
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
      activeBackgroundColor: '#6ABB3A',
      style: {
        backgroundColor: '#133101',
        borderTopColor: '#6ABB3A', 
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