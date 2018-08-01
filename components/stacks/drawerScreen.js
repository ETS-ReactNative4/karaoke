import { createDrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';

import Inicio from '../views/inicio/inicio';
import Canta from '../views/canta/canta';
import Festival from '../views/festival/festival';
import Agenda from '../views/agenda/agenda';
import Musica from '../views/musica/musica';

const DrawerScreen = createDrawerNavigator({
  Inicio: {screen: Inicio,
    navigationOptions: () => ({
      title: 'Inicio'
    })},
  Canta: {screen: Canta,
    navigationOptions: () => ({
      title: 'Karaoke'
    })},
  Musica: {screen: Musica,
    navigationOptions: () => ({
      title: 'Música'
    })},
  Agenda: {screen: Agenda,
    navigationOptions: () => ({
      title: 'Agenda Cultural'
    })},
  Festival: {screen: Festival,
    navigationOptions: () => ({
      title: 'Fiesta del Chamamé'
    })}
},{
  headerMode: 'none',
  drawerWidth: Dimensions.get('window').width - 50,
  initialRouteName: 'Inicio',
  drawerBackgroundColor: '#6ABB3A',
  fontSize: 50,
    fontWeight: 100,
  contentOptions: {
    activeTintColor: 'white',
    activeBackgroundColor: '#333333',
    inactiveTintColor: '#333333',
    labelStyle: {
      fontSize: 25,
      fontFamily: 'notoserif',
    
    },
    itemsContainerStyle: {
      marginVertical: 0,
    },
  },    
})

export default DrawerScreen;