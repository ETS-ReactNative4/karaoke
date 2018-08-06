import React from 'react';
import { createStackNavigator } from 'react-navigation';

import DrawerScreen from './drawerScreen';
import Karaoke from '../views/canta/karaoke/karaoke';
import Login from '../views/login/login';
import Canta from '../views/canta/canta';
import Festival from '../views/festival/festival';
import Agenda from '../views/agenda/agenda';
import Musica from '../views/musica/musica';

const AuthStack = createStackNavigator({ 
  Login: {screen: Login}
  },
  {
    headerMode: 'none'
  });

const drawer = createStackNavigator({
  DrawerScreen: {screen: DrawerScreen}
},{
  headerMode: 'none'
});

const DrawerStack = createStackNavigator({
  AuthStack: {screen: AuthStack},
  DrawerScreen: {screen: DrawerScreen},
  Karaoke: {screen: Karaoke}
},
{
  headerMode: 'none',
  //initialRouteName: 'Karaoke' //Solo habilitado en dev
})

export default DrawerStack;